const fs = require('fs');
const path = require('path');

const wDir = path.join(__dirname, 'src', 'app', 'w');
if (!fs.existsSync(wDir)) {
  console.log('src/app/w 폴더를 찾을 수 없습니다. moneywiki 루트에서 실행하세요.');
  process.exit(1);
}

const dirs = fs.readdirSync(wDir);
let fixedBB = 0, fixedDV = 0;

for (const d of dirs) {
  const pg = path.join(wDir, d, 'page.tsx');
  if (!fs.existsSync(pg)) continue;
  let code = fs.readFileSync(pg, 'utf8');
  let changed = false;

  const hasImportBB = /import\s.*BorderBox/.test(code);
  const hasLocalBB = /function BorderBox/.test(code);
  if (!hasImportBB && !hasLocalBB && code.includes('<BorderBox')) {
    code = code.replace(
      '"use client";',
      '"use client";\nimport { BorderBox } from "@/components/article-ui/BorderBox";'
    );
    changed = true;
    fixedBB++;
  }

  const hasImportDV = /import\s.*Divider/.test(code);
  const hasLocalDV = /function Divider|const Divider/.test(code);
  if (!hasImportDV && !hasLocalDV && code.includes('<Divider')) {
    code = code.replace(
      '"use client";',
      '"use client";\nimport { Divider } from "@/components/article-ui/Divider";'
    );
    changed = true;
    fixedDV++;
  }

  if (changed) fs.writeFileSync(pg, code, 'utf8');
}

console.log('BorderBox import 추가: ' + fixedBB + '개');
console.log('Divider import 추가: ' + fixedDV + '개');
console.log('완료! 이제 git add -A && git commit -m "fix: import" && git push 하세요.');
