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

const srcDir = path.join(__dirname, 'src');
const files = walk(srcDir);
let count = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  if (!content.includes("'emerald'") && !content.includes('"emerald"')) continue;

  // Replace 'emerald' (as prop value) with 'navy'
  content = content.split("'emerald'").join("'navy'");
  content = content.split('"emerald"').join('"navy"');

  fs.writeFileSync(file, content, 'utf8');
  count++;
  console.log('Updated:', path.relative(__dirname, file));
}

console.log(`\nDone! Updated ${count} files.`);
