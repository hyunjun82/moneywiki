const fs = require('fs');
const path = require('path');
const dir = 'data/forms';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
const noHwp = [];
files.forEach(f => {
  const d = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
  if (!(d.downloads && d.downloads.hwp)) {
    noHwp.push({ slug: d.slug, cat: d.category, title: d.shortTitle || d.slug });
  }
});
const g = {};
noHwp.forEach(i => {
  if (!g[i.cat]) g[i.cat] = [];
  g[i.cat].push(i.title);
});
console.log('HWP 없는 양식: ' + noHwp.length + '개\n');
Object.keys(g).sort().forEach(c => {
  console.log('[' + c + '] (' + g[c].length + '개)');
  g[c].forEach(t => console.log('  ' + t));
  console.log();
});
