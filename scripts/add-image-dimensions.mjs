import { readFileSync, writeFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';

const root = resolve(import.meta.dirname, '..');

/**
 * Stamps intrinsic width/height onto every <img> that points at a local asset.
 * Browsers use the ratio to reserve space before the image loads, which is what
 * keeps layout shift (CLS) out of Core Web Vitals. Runs after the generators so
 * it covers static and generated pages with one implementation.
 */

const readUInt32BE = (buffer, offset) => buffer.readUInt32BE(offset);

const pngSize = (buffer) => {
  if (buffer.length < 24 || buffer.toString('ascii', 12, 16) !== 'IHDR') return null;
  return { width: readUInt32BE(buffer, 16), height: readUInt32BE(buffer, 20) };
};

const webpSize = (buffer) => {
  if (buffer.toString('ascii', 0, 4) !== 'RIFF' || buffer.toString('ascii', 8, 12) !== 'WEBP') return null;
  const format = buffer.toString('ascii', 12, 16);
  if (format === 'VP8X') {
    return { width: 1 + buffer.readUIntLE(24, 3), height: 1 + buffer.readUIntLE(27, 3) };
  }
  if (format === 'VP8L') {
    const bits = buffer.readUInt32LE(21);
    return { width: 1 + (bits & 0x3fff), height: 1 + ((bits >> 14) & 0x3fff) };
  }
  if (format === 'VP8 ') {
    return { width: buffer.readUInt16LE(26) & 0x3fff, height: buffer.readUInt16LE(28) & 0x3fff };
  }
  return null;
};

const jpegSize = (buffer) => {
  let offset = 2;
  while (offset < buffer.length) {
    if (buffer[offset] !== 0xff) return null;
    const marker = buffer[offset + 1];
    const length = buffer.readUInt16BE(offset + 2);
    if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
      return { height: buffer.readUInt16BE(offset + 5), width: buffer.readUInt16BE(offset + 7) };
    }
    offset += 2 + length;
  }
  return null;
};

const sizeCache = new Map();
const imageSize = (file) => {
  if (sizeCache.has(file)) return sizeCache.get(file);
  let result = null;
  try {
    const buffer = readFileSync(file);
    if (file.endsWith('.png')) result = pngSize(buffer);
    else if (file.endsWith('.webp')) result = webpSize(buffer);
    else if (/\.jpe?g$/.test(file)) result = jpegSize(buffer);
  } catch { result = null; }
  sizeCache.set(file, result);
  return result;
};

const htmlFiles = [];
const walk = (directory) => {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (entry.name.startsWith('._') || entry.name === 'node_modules' || entry.name === 'dist' || entry.name === '.git') continue;
    const full = join(directory, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith('.html')) htmlFiles.push(full);
  }
};
walk(root);

let stamped = 0;
let skipped = 0;
for (const file of htmlFiles) {
  const original = readFileSync(file, 'utf8');
  const updated = original.replace(/<img\b[^>]*>/g, (tag) => {
    if (/\bwidth=/.test(tag) || /\bheight=/.test(tag)) return tag;
    const src = tag.match(/\bsrc="([^"]+)"/)?.[1];
    if (!src || /^(https?:|data:)/.test(src)) { skipped++; return tag; }
    const target = src.startsWith('/') ? resolve(root, src.slice(1)) : resolve(dirname(file), src);
    if (!existsSync(target) || !statSync(target).isFile()) { skipped++; return tag; }
    const size = imageSize(target);
    if (!size || !size.width || !size.height) { skipped++; return tag; }
    stamped++;
    return tag.replace(/\s*\/?>$/, ` width="${size.width}" height="${size.height}" />`);
  });
  if (updated !== original) writeFileSync(file, updated);
}

console.log(`Stamped dimensions on ${stamped} images (${skipped} skipped).`);
