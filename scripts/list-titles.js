const fs = require('fs');
const files = fs.readdirSync('src/data/spoke');
const results = [];

for (const file of files) {
  const content = fs.readFileSync('src/data/spoke/' + file, 'utf8');
  const titleMatch = content.match(/title:\s*'([^']+)'/);
  const slugMatch = content.match(/slug:\s*'([^']+)'/);
  const breadMatch = content.match(/breadcrumb:\s*\[([^\]]+)\]/);
  const cat = breadMatch
    ? breadMatch[1].split(',')[0].replace(/['" ]/g, '')
    : '미분류';
  if (titleMatch && slugMatch) {
    results.push({ cat, slug: slugMatch[1], title: titleMatch[1] });
  }
}

results.sort((a, b) => a.cat.localeCompare(b.cat, 'ko'));

let currentCat = '';
for (const r of results) {
  if (r.cat !== currentCat) {
    console.log('\n## ' + r.cat);
    currentCat = r.cat;
  }
  console.log('- ' + r.title);
}
console.log('\n총: ' + results.length + '개');
