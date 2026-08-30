// public/favicons 안의 파일 목록을 JSON으로 굳힌다.
// 정적 내보내기(output: export) 라 요청 시점에 파일시스템을 볼 수 없다 —
// 빌드 시점에 한 번 읽어서 컴포넌트가 import 할 수 있게 만든다.
import fs from "node:fs";
import path from "node:path";

const DIR = path.join(process.cwd(), "public", "favicons");
const OUT = path.join(process.cwd(), "src", "data", "download", "favicon-manifest.json");

const map = {};
if (fs.existsSync(DIR)) {
  for (const f of fs.readdirSync(DIR)) {
    const m = /^(.+)\.(png|ico|svg|jpg)$/.exec(f);
    if (!m) continue;
    map[m[1]] = `/favicons/${f}`;
  }
}
fs.writeFileSync(OUT, JSON.stringify(map, null, 1) + "\n");
console.log(`favicon-manifest.json — ${Object.keys(map).length}개`);
