import { defineConfig } from 'vite';
import { resolve, join, relative } from 'node:path';
import fs from 'node:fs';

// Helper to recursively find all HTML files
function getHtmlEntries(dir, entries = {}) {
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    const fullPath = join(dir, item.name);
    if (item.isDirectory()) {
      if (item.name === 'node_modules' || item.name === 'dist' || item.name === 'public') {
        continue;
      }
      getHtmlEntries(fullPath, entries);
    } else if (item.isFile() && item.name.endsWith('.html')) {
      const relPath = relative(resolve('.'), fullPath);
      // Key can be the relative path without extension, e.g., 'news/siaran-pers/index'
      const key = relPath.replace(/\.html$/, '').replace(/\\/g, '/');
      entries[key] = resolve(relPath);
    }
  }
  return entries;
}

const inputEntries = getHtmlEntries(resolve('.'));
console.log('Detected HTML entry points for Build:', Object.keys(inputEntries).length);

export default defineConfig({
  build: {
    rollupOptions: {
      input: inputEntries,
    },
  },
});
