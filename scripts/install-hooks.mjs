#!/usr/bin/env node
/** scripts/git-hooks/* 를 .git/hooks/ 로 복사한다. 복사하지 않으면 게이트는 아무것도 막지 않는다. */
import fs from "node:fs";
import path from "node:path";
const src = path.join("scripts", "git-hooks");
const dst = path.join(".git", "hooks");
if (!fs.existsSync(dst)) { console.error("❌ .git/hooks 가 없습니다 — git 저장소 루트에서 실행하세요"); process.exit(1); }
let n = 0;
for (const f of fs.readdirSync(src)) {
  if (f.includes(".")) continue; // README 같은 문서는 훅이 아니다
  const s = fs.readFileSync(path.join(src, f));
  const d = path.join(dst, f);
  const same = fs.existsSync(d) && fs.readFileSync(d).equals(s);
  if (!same) { fs.writeFileSync(d, s); try { fs.chmodSync(d, 0o755); } catch {} n++; console.log(`  설치: ${f}`); }
}
console.log(n ? `✅ 훅 ${n}개 설치` : "✅ 훅 전부 최신");
