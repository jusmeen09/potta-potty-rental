import { readdirSync } from 'node:fs';
import { basename, dirname, relative, resolve, sep } from 'node:path';
import { defineConfig } from 'vite';

const projectRoot = import.meta.dirname;

const collectHtmlFiles = (directory) => readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
  const entryPath = resolve(directory, entry.name);
  if (entry.isDirectory()) return collectHtmlFiles(entryPath);
  return entry.isFile() && entry.name === 'index.html' ? [entryPath] : [];
});

const locationInputs = Object.fromEntries(
  collectHtmlFiles(resolve(projectRoot, 'location')).map((file) => {
    const relativePath = relative(projectRoot, dirname(file)).split(sep).join('-');
    return [`location-${relativePath || basename(dirname(file))}`, file];
  }),
);

const serviceInputs = Object.fromEntries(
  collectHtmlFiles(resolve(projectRoot, 'service')).map((file) => {
    const relativePath = relative(projectRoot, dirname(file)).split(sep).join('-');
    return [`service-${relativePath || basename(dirname(file))}`, file];
  }),
);

const blogInputs = Object.fromEntries(
  collectHtmlFiles(resolve(projectRoot, 'blog')).map((file) => {
    const relativePath = relative(projectRoot, dirname(file)).split(sep).join('-');
    return [`blog-${relativePath || basename(dirname(file))}`, file];
  }),
);

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        home: resolve(projectRoot, 'index.html'),
        about: resolve(projectRoot, 'about.html'),
        blog: resolve(projectRoot, 'blog.html'),
        contact: resolve(projectRoot, 'contact.html'),
        notFound: resolve(projectRoot, '404.html'),
        ...serviceInputs,
        ...blogInputs,
        ...locationInputs,
      },
    },
  },
});
