const fs = require('fs');
const path = require('path');

const wDir = path.join(__dirname, 'src', 'app', 'w');
if (!fs.existsSync(wDir)) { process.exit(0); }

const dirs = fs.readdirSync(wDir);
let fixed = 0;

for (const d of dirs) {
  const pg = path.join(wDir, d, 'page.tsx');
  if (!fs.existsSync(pg)) continue;
  let code = fs.readFileSync(pg, 'utf8');
  let changed = false;

  // 1) 개별 import 라인 제거 (\r\n, \n 모두 처리)
  const bbRe = /import\s*\{\s*BorderBox\s*\}\s*from\s*["']@\/components\/article-ui\/BorderBox["'];?\s*\r?\n/g;
  const dvRe = /import\s*\{\s*Divider\s*\}\s*from\s*["']@\/components\/article-ui\/Divider["'];?\s*\r?\n/g;
  if (bbRe.test(code)) { code = code.replace(bbRe, ''); changed = true; }
  if (dvRe.test(code)) { code = code.replace(dvRe, ''); changed = true; }

  // 2) import 영역에 컴포넌트가 있는지 확인 (여러줄 barrel import 포함)
  const importEnd = code.search(/\n(?:const |let |var |function |export default|\/\/ ─)/);
  const importSection = importEnd > 0 ? code.slice(0, importEnd) : code.slice(0, 500);

  // 3) BorderBox 필요한데 없으면 추가
  if (code.includes('<BorderBox') && !importSection.includes('BorderBox') && !/function BorderBox/.test(code)) {
    code = code.replace('"use client";', '"use client";\nimport { BorderBox } from "@/components/article-ui/BorderBox";');
    changed = true; fixed++;
  }

  // 4) Divider 필요한데 없으면 추가
  const importEnd2 = code.search(/\n(?:const |let |var |function |export default|\/\/ ─)/);
  const importSection2 = importEnd2 > 0 ? code.slice(0, importEnd2) : code.slice(0, 500);
  if (code.includes('<Divider') && !importSection2.includes('Divider') && !/function Divider|const Divider/.test(code)) {
    code = code.replace('"use client";', '"use client";\nimport { Divider } from "@/components/article-ui/Divider";');
    changed = true; fixed++;
  }

  if (changed) fs.writeFileSync(pg, code, 'utf8');
}
console.log('fix-imports-v2: ' + fixed + ' files fixed');
