#!/usr/bin/env node
/**
 * articles 로 쓴 글이 옛 TSX 페이지에 가려지는지 검사한다.
 *
 * Next.js 는 src/app/w/<slug>/page.tsx 를 src/app/w/[slug]/page.tsx 보다 먼저 고른다.
 * 그래서 새 글을 articles 에 써도 같은 slug 의 TSX 폴더가 남아 있으면
 * 화면에는 옛 글이 그대로 나온다. 눈으로는 알 수 없고, 배포한 뒤에야 드러난다.
 * 2026-09-03 에 이 이유로 5편 중 4편을 다시 손봤다. 그 일이 반복되지 않게 막는다.
 */
import fs from "node:fs";
import path from "node:path";

const ART_DIR = path.join("src", "data", "articles");
const W_DIR = path.join("src", "app", "w");

const slugs = [];
for (const f of fs.readdirSync(ART_DIR)) {
  if (!f.endsWith(".ts") || f === "types.ts") continue;
  const src = fs.readFileSync(path.join(ART_DIR, f), "utf8");
  for (const m of src.matchAll(/^ {6}slug: "([^"]+)",$/gm)) slugs.push({ slug: m[1], file: f });
}

const shadowed = slugs.filter((s) => fs.existsSync(path.join(W_DIR, s.slug)));

if (shadowed.length) {
  console.error(`❌ 옛 TSX 페이지가 새 글을 가리고 있습니다 (${shadowed.length}개)`);
  for (const s of shadowed) console.error(`   · ${s.slug}  (${s.file}) → src/app/w/${s.slug}/ 를 지우세요`);
  console.error("\n이대로 배포하면 화면에는 옛 글이 나옵니다.");
  process.exit(1);
}

console.log(`✅ 가려진 글 없음 — articles ${slugs.length}편`);
