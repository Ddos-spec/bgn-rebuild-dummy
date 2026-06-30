import fs from 'node:fs/promises';
import path from 'node:path';

const dist = path.resolve('dist');
const base = process.env.GH_PAGES_BASE || '/bgn-rebuild-dummy/';
const exts = new Set(['.html', '.css', '.js']);

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(full));
    else if (exts.has(path.extname(entry.name).toLowerCase())) files.push(full);
  }
  return files;
}

function prefixAbsolutePaths(input) {
  let out = input;
  // HTML attrs: href="/x", src="/x", action="/x" -> /repo/x
  out = out.replace(/\b(href|src|action)=(['"])\/(?!\/|bgn-rebuild-dummy\/|https?:|mailto:|tel:|#)/g, `$1=$2${base}`);
  // srcset entries starting with /x
  out = out.replace(/(srcset=(['"])[^'"]*)\/(?!\/|bgn-rebuild-dummy\/)/g, `$1${base}`);
  // CSS url(/x) -> url(/repo/x)
  out = out.replace(/url\((['"]?)\/(?!\/|bgn-rebuild-dummy\/|data:|https?:)/g, `url($1${base}`);
  // Inline JS fetch('/x') and string literal paths for local APIs/assets.
  out = out.replace(/(['"])\/(api\/|_astro\/|icon\/|decoration\/|logo_instansi\/|background\/|bgn_logo\/|BGN_LOGO\.png|logo-bgn\.png|favicon\.ico)/g, `$1${base}$2`);
  return out;
}

const files = await walk(dist);
let changed = 0;
for (const file of files) {
  const before = await fs.readFile(file, 'utf8');
  const after = prefixAbsolutePaths(before);
  if (after !== before) {
    await fs.writeFile(file, after, 'utf8');
    changed++;
  }
}
console.log(`GitHub Pages base rewrite complete: ${changed}/${files.length} files updated with base ${base}`);
