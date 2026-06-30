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
    // Inline assets smaller than 4KB as base64 to reduce HTTP requests
    assetsInlineLimit: 4096,
    // Enable CSS code splitting for better caching
    cssCodeSplit: true,
    // Minify JS and CSS with Vite 8 defaults (rolldown built-in)
    cssMinify: true,
    minify: true,
    rollupOptions: {
      input: inputEntries,
      output: {
        // Deterministic chunk names for long-term caching
        chunkFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
  },
});
