/**
 * 옛 카테고리 주소를 지금 카테고리로 보내는 규칙을 public/_redirects 에 만든다.
 *
 * 왜 필요한가 —
 * /category/[name] 은 categories.ts 의 12개 slug 만 안다. 그런데 글 본문과 페이지에는
 * 옛 이름이 그대로 남아 있어(/category/고용 235곳, /category/연말정산 92곳 …)
 * 44종 중 35종이 404 였다. 이미 색인된 주소도 있으니 링크를 고치는 것만으로는 부족하다.
 * 그래서 옛 이름은 301 로 지금 카테고리로 넘긴다.
 *
 * 대상은 CATEGORY_MIGRATION_MAP 에서 가져온다 — 그 파일이 단일 진실 원천이고,
 * 여기서는 규칙만 찍어낸다. 손으로 두 곳을 맞추지 않는다.
 *
 * 실행: node scripts/build-category-redirects.mjs [--write]
 */
import fs from "node:fs";

const SRC = "src/data/categories.ts";
const OUT = "public/_redirects";
const BEGIN = "# --- 카테고리 옛 주소 (scripts/build-category-redirects.mjs 가 생성) ---";
const END = "# --- 카테고리 옛 주소 끝 ---";

const src = fs.readFileSync(SRC, "utf8");
const valid = new Set([...src.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]));
// 주석 안에도 "옛이름": "새이름" 꼴이 나온다. 줄 주석을 떼고 읽는다.
const block = src
  .slice(src.indexOf("CATEGORY_MIGRATION_MAP"))
  .split(/\r?\n/)
  .map((l) => l.replace(/\/\/.*$/, ""))
  .join("\n");
const seen = new Set();
const pairs = [];
for (const m of block.matchAll(/"([^"]+)":\s*"([^"]+)"/g)) {
  if (seen.has(m[1])) { console.error("맵에 같은 키가 두 번 있습니다:", m[1]); process.exit(1); }
  seen.add(m[1]);
  pairs.push([m[1], m[2]]);
}

const rules = [];
for (const [from, to] of pairs) {
  if (valid.has(from)) continue;          // 이미 존재하는 주소는 건드리지 않는다
  if (!valid.has(to)) {                    // 보낼 곳이 실제 카테고리가 아니면 규칙을 만들지 않는다
    console.error("보낼 곳이 카테고리가 아님:", from, "→", to);
    process.exit(1);
  }
  rules.push(`/category/${from} /category/${to} 301`);
}
rules.sort();

console.log("카테고리:", valid.size, "| 매핑:", pairs.length, "| 만들 규칙:", rules.length);

let text = fs.readFileSync(OUT, "utf8");
const eol = text.includes("\r\n") ? "\r\n" : "\n";
const body = [BEGIN, ...rules, END].join(eol);

const b = text.indexOf(BEGIN);
if (b !== -1) {
  const e = text.indexOf(END);
  if (e === -1) { console.error("시작 표시는 있는데 끝 표시가 없습니다."); process.exit(1); }
  text = text.slice(0, b) + body + text.slice(e + END.length);
} else {
  if (!text.endsWith(eol)) text += eol;
  text += eol + body + eol;
}

if (process.argv.includes("--write")) {
  fs.writeFileSync(OUT, text, "utf8");
  console.log("기록:", OUT);
} else {
  console.log("\n(시뮬레이션)\n" + rules.slice(0, 12).join("\n") + `\n… 외 ${Math.max(0, rules.length - 12)}개`);
}
