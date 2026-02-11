const fs = require('fs');
const path = require('path');

function walk(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) files.push(full);
  }
  return files;
}

const replacements = [
  ['emerald-800', '[#132A42]'],
  ['emerald-700', '[#162F4F]'],
  ['emerald-600', '[#1E3A5F]'],
  ['emerald-500', '[#2B5280]'],
  ['emerald-400', '[#4A7AB5]'],
  ['emerald-300', '[#4A7AB5]'],
  ['emerald-200', '[#B8D0E8]'],
  ['emerald-100', '[#EDF2F8]'],
  ['emerald-50', '[#F5F8FB]'],
];

const srcDir = path.join(__dirname, 'src');
const files = walk(srcDir);
let count = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  if (!content.includes('emerald')) continue;

  for (const [from, to] of replacements) {
    content = content.split(from).join(to);
  }

  fs.writeFileSync(file, content, 'utf8');
  count++;
  console.log('Updated:', path.relative(__dirname, file));
}

console.log(`\nDone! Updated ${count} files.`);
