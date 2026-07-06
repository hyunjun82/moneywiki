// Cloudflare Pages 20,000 파일 제한 대응 — RSC .txt 페이로드 삭제
// robots.txt, ads.txt, 인증파일은 보존 (pharm-jjyu와 동일 전략)
const fs = require("fs");
const path = require("path");
const OUT = path.join(__dirname, "..", "out");
const KEEP = new Set(["robots.txt", "ads.txt", "cf14d2ece5b0438e848760be86604782.txt"]);
let removed = 0;
function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith(".txt") && !(dir === OUT && KEEP.has(e.name))) {
      fs.unlinkSync(p); removed++;
    }
  }
}
if (fs.existsSync(OUT)) { walk(OUT); console.log(`clean-out-txt: ${removed}개 .txt 삭제`); }
else console.log("out/ 없음 — 건너뜀");
