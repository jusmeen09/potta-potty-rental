import { readFileSync, writeFileSync, readdirSync, existsSync, unlinkSync } from 'node:fs';
import { resolve, relative, dirname } from 'node:path';
import { createHash } from 'node:crypto';
import { transform } from 'esbuild';

const root = resolve(import.meta.dirname, '..');
const manifest = JSON.parse(readFileSync(resolve(root, 'scripts/lib/image-manifest.json'), 'utf8'));
const sourceFor = new Map(Object.entries(manifest).flatMap(([source, variants]) => variants.map(v => [v.src, source])));
const hash = content => createHash('sha256').update(content).digest('hex').slice(0, 12);
let css = readFileSync(resolve(root, 'styles.css'), 'utf8');
const mobileBackgrounds = [];
for (const selector of ['hero', 'location-hero', 'about-hero', 'blog-hero', 'contact-hero']) {
  const background = css.match(new RegExp(`\\.${selector}\\s*\\{[^}]*?background-image:\\s*([^;]+);`))?.[1];
  if (!background) throw new Error(`Missing hero background: ${selector}`);
  mobileBackgrounds.push(`.${selector}{background-image:${background.replace(/url\(['"]?\/?(assets\/[^)'"\s]+)['"]?\)/, (_, src) => {
    const variants = manifest['/' + src];
    return `image-set(url('${variants[0].src}') 1x,url('${variants[1].src}') 2x)`;
  })}}`);
}
// CSS assets resolve relative to the versioned stylesheet's /assets/ directory.
css = css.replace(/url\(['"]?(?:\/)?assets\/([^)'"\s]+)['"]?\)/g, "url('/assets/$1')");
// image-set chooses a size for each screen density; media queries select mobile widths.
css = css.replace(/url\(['"]?(\/assets\/[^)'"\s]+\.webp)['"]?\)/g, (full, src) => {
  const variants = manifest[src];
  if (!variants) return full;
  return `image-set(url('${variants.at(-2)?.src || variants[0].src}') 1x, url('${variants.at(-1).src}') 2x)`;
});
css += `\n@media(max-width:600px){${mobileBackgrounds.join('')}}`;
const minified = (await transform(css, { loader: 'css', minify: true })).code;
const stylePath = `/assets/site-${hash(minified)}.css`;
writeFileSync(resolve(root, stylePath.slice(1)), minified);
const js = (await transform(readFileSync(resolve(root, 'script.js'), 'utf8'), { loader: 'js', minify: true, target: 'es2020' })).code;
const scriptPath = `/assets/site-${hash(js)}.js`;
writeFileSync(resolve(root, scriptPath.slice(1)), js);

const htmlFiles = [];
function walk(folder) {
  for (const item of readdirSync(folder, { withFileTypes: true })) {
    if (item.name.startsWith('.') || ['node_modules', 'dist', 'output', 'assets', 'public', 'scripts'].includes(item.name)) continue;
    const path = resolve(folder, item.name);
    if (item.isDirectory()) walk(path);
    else if (item.name.endsWith('.html')) htmlFiles.push(path);
  }
}
walk(root);
for (const file of htmlFiles) {
  let html = readFileSync(file, 'utf8');
  const pagePath = relative(root, file).replaceAll('\\', '/');
  const backgroundSource = pagePath === 'index.html' || pagePath.startsWith('location/') ? '/assets/homepage/cover.webp'
    : ({'about/index.html':'/assets/about/hero.webp','blog/index.html':'/assets/blog/hero.webp','contact/index.html':'/assets/contact/hero.webp'})[pagePath];
  if (backgroundSource) html = html.replace(/<link\b[^>]*rel="preload"[^>]*as="image"[^>]*>\s*/g, '');
  html = html.replace(/<link[^>]+href="https:\/\/fonts\.(?:googleapis|gstatic)\.com[^>]*>\s*/g, '');
  html = html.replace(/href="(?:\/?styles\.css|\/assets\/site-[a-f0-9]+\.css)"/g, `href="${stylePath}"`);
  html = html.replace(/src="(?:\/?script\.js|\/assets\/site-[a-f0-9]+\.js)"/g, `src="${scriptPath}"`);
  html = html.replace(/url\(['"]?(\/assets\/[^)'"\s]+\.webp)['"]?\)/g, (full, src) => {
    const variants = manifest[src];
    if (!variants) return full;
    return `image-set(url('${variants.at(-2)?.src || variants[0].src}') 1x, url('${variants.at(-1).src}') 2x)`;
  });
  html = html.replace(/<img\b[^>]*>/g, tag => {
    const src = tag.match(/\bsrc="([^"]+)"/)?.[1];
    if (!src || /^(https?:|data:)/.test(src)) return tag;
    const path = '/' + relative(root, resolve(src.startsWith('/') ? root : dirname(file), src.replace(/^\//, ''))).replaceAll('\\', '/');
    const variants = manifest[sourceFor.get(path) || path];
    if (!variants) return tag;
    const fallback = variants.at(-1);
    if (!existsSync(resolve(root, fallback.src.slice(1)))) throw new Error(`Missing optimized image: ${fallback.src}`);
    const sizes = tag.match(/\bsizes="([^"]+)"/)?.[1] || '(max-width: 600px) calc(100vw - 32px), (max-width: 1000px) 90vw, 620px';
    return tag.replace(/\s(?:src|srcset|sizes|width|height|decoding)="[^"]*"/g, '').replace(/\s*\/?>$/, ` src="${fallback.src}" srcset="${variants.map(v => `${v.src} ${v.width}w`).join(', ')}" sizes="${sizes}" width="${fallback.width}" height="${fallback.height}" decoding="async" />`);
  });
  // Keep responsive hero preloads consistent with the displayed image/background.
  html = html.replace(/<link\b[^>]*rel="preload"[^>]*as="image"[^>]*>/g, tag => {
    const src = tag.match(/href="([^"]+)"/)?.[1];
    const path = src?.startsWith('/') ? src : '/' + src;
    const variants = manifest[sourceFor.get(path) || path];
    if (!variants) return tag;
    const backgroundHero = file === resolve(root, 'index.html') || file.includes('/location/');
    if (backgroundHero) return tag.replace(/\s(?:href|imagesrcset|imagesizes)="[^"]*"/g, '').replace(/\s*\/?>$/, ` href="${variants.at(-2)?.src || variants[0].src}" imagesrcset="${variants.at(-2)?.src || variants[0].src} 1x, ${variants.at(-1).src} 2x" />`);
    const hero = html.match(/<figure class="post-figure">[\s\S]*?(<img\b[^>]*>)/)?.[1];
    const imageSizes = hero?.match(/\bsizes="([^"]+)"/)?.[1] || '(max-width: 1240px) calc(100vw - 32px), 1240px';
    return tag.replace(/\s(?:href|imagesrcset|imagesizes)="[^"]*"/g, '').replace(/\s*\/?>$/, ` href="${variants.at(-1).src}" imagesrcset="${variants.map(v => `${v.src} ${v.width}w`).join(', ')}" imagesizes="${imageSizes}" />`);
  });
  if (backgroundSource) {
    const variants = manifest[backgroundSource];
    const preload = (first, second, media) => `<link rel="preload" as="image" href="${first.src}" imagesrcset="${first.src} 1x, ${second.src} 2x" media="${media}" fetchpriority="high" />`;
    html = html.replace('</head>', `${preload(variants[0], variants[1], '(max-width: 600px)')}\n${preload(variants.at(-2), variants.at(-1), '(min-width: 601px)')}\n</head>`);
  }
  html = html.replace(/\saria-label="Call Star Portable Restrooms at \+1 \(833\) 920-1299"/g, '');
  html = html.replace(/<span class="site-version">[\s\S]*?<\/span><\/span>/g, '');
  html = html.replace(/[ \t]+$/gm, '');
  html = html.replace(/\n{3,}/g, '\n\n');
  writeFileSync(file, html);
}
console.log(`Prepared responsive images and versioned CSS/JS on ${htmlFiles.length} HTML pages.`);

// These names belong exclusively to this generator. Remove obsolete versions.
for (const file of readdirSync(resolve(root, 'assets'))) {
  if (/^site-[a-f0-9]+\.(css|js)$/.test(file) && ![stylePath, scriptPath].includes('/assets/' + file)) unlinkSync(resolve(root, 'assets', file));
}
