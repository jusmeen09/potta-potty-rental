import { copyFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');

/**
 * Cloudflare Pages serves this repository's root directly — there is no Vite
 * build step in the deployment, so anything living only in public/ 404s in
 * production. Vite's build still needs public/, so these files exist in both
 * places and this script keeps them identical. The sitemap generator already
 * writes to both locations for the same reason.
 */
const files = [
  'favicon.ico',
  'favicon.svg',
  'favicon-96x96.png',
  'apple-touch-icon.png',
  'site.webmanifest',
  'llms.txt',
  'robots.txt',
];

const nested = ['icons/icon-192.png', 'icons/icon-512.png'];

mkdirSync(resolve(root, 'icons'), { recursive: true });

for (const file of [...files, ...nested]) {
  copyFileSync(resolve(root, 'public', file), resolve(root, file));
}

console.log(`Synced ${files.length + nested.length} static files from public/ to the served root.`);
