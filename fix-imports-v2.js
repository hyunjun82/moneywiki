const fs = require('fs');
const path = require('path');

const wDir = path.join(__dirname, 'src', 'app', 'w');
if (!fs.existsSync(wDir)) {
  console.log('src/app/w 폴더를 찾을 수 없습니다. moneywiki 루트에서 실행하세요.');
  process.exit(1);
}

const dirs = fs.readdirSync(wDir);
let fixedBB = 0, fixedDV = 0, removedBB = 0, removedDV = 0;

for (const d of dirs) {
  const pg = path.join(wDir, d, 'page.tsx');
  if (!fs.existsSync(pg)) continue;
  let code = fs.readFileSync(pg, 'utf8');
  let changed = false;

  // 1단계: 이전 스크립트가 추가한 개별 import 라인 제거
  const bbLine = 'import { BorderBox } from "@/components/article-ui/BorderBox";\n';
  const dvLine = 'import { Divider } from "@/components/article-ui/Divider";\n';
  if (code.includes(bbLine)) {
    code = code.replace(bbLine, '');
    changed = true;
    removedBB++;
  }
  if (code.includes(dvLine)) {
    code = code.replace(dvLine, '');
    changed = true;
    removedDV++;
  }

  // 2단계: import 영역 추출 (파일 시작부터 첫 const/let/var/function/export default 전까지)
  const importSection = code.split(/\n(?=(?:const |let |var |function |export default|\/\/ ─))/)[0];

  // 3단계: BorderBox가 import 영역에 있는지 확인 (barrel import 포함, 여러줄도 감지)
  const hasBBInImports = importSection.includes('BorderBox');
  const hasLocalBB = /function BorderBox/.test(code);
  const usesBB = code.includes('<BorderBox');

  if (!hasBBInImports && !hasLocalBB && usesBB) {
    code = code.replace(
      '"use client";',
      '"use client";\nimport { BorderBox } from "@/components/article-ui/BorderBox";'
    );
    changed = true;
    fixedBB++;
  }

  // 4단계: Divider도 같은 로직
  const importSection2 = code.split(/\n(?=(?:const |let |var |function |export default|\/\/ ─))/)[0];
  const hasDVInImports = importSection2.includes('Divider');
  const hasLocalDV = /function Divider|const Divider/.test(code);
  const usesDV = code.includes('<Divider');

  if (!hasDVInImports && !hasLocalDV && usesDV) {
    code = code.replace(
      '"use client";',
      '"use client";\nimport { Divider } from "@/components/article-ui/Divider";'
    );
    changed = true;
    fixedDV++;
  }

  if (changed) fs.writeFileSync(pg, code, 'utf8');
}

console.log('--- 제거 ---');
console.log('BorderBox 중복 import 제거: ' + removedBB + '개');
console.log('Divider 중복 import 제거: ' + removedDV + '개');
console.log('--- 추가 ---');
console.log('BorderBox import 추가: ' + fixedBB + '개');
console.log('Divider import 추가: ' + fixedDV + '개');
console.log('완료!');
