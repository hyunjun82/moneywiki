#!/usr/bin/env node
/**
 * 증거 수집기 — Playwright로 공식 사이트를 열어 원문 텍스트 추출 + 스크린샷 + 증거 JSON 생성.
 * 웹검색 없음. 학습데이터 없음. 페이지에 실제로 있는 문장만 남는다.
 *
 * 사용법:
 *   node scripts/collect-evidence.mjs <slug> --law 지방세법:75,78,79 --url https://... [--url ...]
 *   node scripts/collect-evidence.mjs 주민세 --law 지방세법:75,78,79 --url https://www.wetax.go.kr
 *
 * 산출물:
 *   scripts/evidence/<slug>.json         ← 추출 원문(quote) + 출처 + 스크린샷 파일명
 *   scripts/evidence/<slug>/*.png        ← 캡처 증거
 */
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const argv = process.argv.slice(2);
const slug = argv[0];
if (!slug || slug.startsWith("--")) {
  console.error("사용법: node scripts/collect-evidence.mjs <slug> [--law 법령명:조,조] [--url URL]...");
  process.exit(1);
}
const laws = [];
const urls = [];
for (let i = 1; i < argv.length; i++) {
  if (argv[i] === "--law") laws.push(argv[++i]);
  else if (argv[i] === "--url") urls.push(argv[++i]);
}

const OUT_DIR = path.join("scripts", "evidence", slug);
fs.mkdirSync(OUT_DIR, { recursive: true });

/** 숫자·기한·금액·비율을 문장 단위로 뽑는다 (글에 쓸 수 있는 후보) */
const NUM = /(\d[\d,.]*\s*(?:원|만원|천원|억|%|퍼센트|일|개월|년|주|회|세|시간|분)|제\d+조|\d+월\s*\d+일)/;
function factsFromText(text, meta) {
  const seen = new Set();
  return text
    .split(/(?<=[.。」』])\s+|\n+/)
    .map((s) => s.replace(/\s+/g, " ").trim())
    .filter((s) => s.length >= 15 && s.length <= 400 && NUM.test(s))
    .filter((s) => (seen.has(s) ? false : seen.add(s)))
    .map((s) => ({
      value: (s.match(new RegExp(NUM, "g")) || []).join(" / "),
      quote: s,
      ...meta,
    }));
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
page.on("dialog", (d) => d.accept().catch(() => {}));

const facts = [];
let shot = 0;

async function capture(label) {
  shot++;
  const file = `evidence-${slug}-${shot}.png`;
  await page.screenshot({ path: path.join(OUT_DIR, file) });
  console.log(`  캡처 ${file} (${label})`);
  return file;
}

/** 법제처: 본문이 iframe 안에 있고 조문 단위로 추출 */
async function collectLaw(spec) {
  const [lawName, articleList] = spec.split(":");
  for (const no of (articleList || "").split(",").filter(Boolean)) {
    const url = `https://www.law.go.kr/법령/${encodeURIComponent(lawName)}/제${no}조`;
    console.log(`법제처 ${lawName} 제${no}조 …`);
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
    // 법제처는 본문을 iframe에 늦게 채운다 — 조문이 나타날 때까지 폴링
    let text = "";
    for (let tries = 0; tries < 15 && !text; tries++) {
      await page.waitForTimeout(1000);
      for (const frame of page.frames()) {
        try {
          const t = await frame.evaluate(() => document.body?.innerText || "");
          const i = t.indexOf(`제${no}조`);
          if (i >= 0 && t.length > 200) { text = t.slice(i, i + 2500); break; }
        } catch {}
      }
    }
    if (!text) { console.log(`  ⚠ 조문 추출 실패`); continue; }
    const file = await capture(`${lawName} 제${no}조`);
    facts.push(...factsFromText(text, {
      url, org: `법제처 (${lawName} 제${no}조)`, screenshot: file,
    }));
  }
}

async function collectUrl(url) {
  console.log(`페이지 ${url} …`);
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForTimeout(2500);
  const { text, org } = await page.evaluate(() => {
    const el = document.querySelector(".article_body, #article_body, .view_cont, article, main") || document.body;
    return { text: el.innerText.slice(0, 8000), org: document.title.split(/[-|]/)[0].trim() };
  });
  const file = await capture(org);
  facts.push(...factsFromText(text, { url, org, screenshot: file }));
}

for (const l of laws) await collectLaw(l);
for (const u of urls) await collectUrl(u);
await browser.close();

const out = {
  slug,
  verifiedAt: new Date().toISOString().slice(0, 10),
  collectedBy: "scripts/collect-evidence.mjs (playwright)",
  sources: [...new Set(facts.map((f) => JSON.stringify({ url: f.url, org: f.org })))].map(JSON.parse),
  facts,
};
fs.writeFileSync(path.join("scripts", "evidence", `${slug}.json`), JSON.stringify(out, null, 2));
console.log(`\n✅ ${facts.length}개 fact / ${shot}장 캡처 → scripts/evidence/${slug}.json`);
if (facts.length === 0) { console.error("❌ 추출된 fact 0개 — 사이트 구조 확인 필요"); process.exit(1); }
