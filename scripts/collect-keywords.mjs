#!/usr/bin/env node
/**
 * 키워드 수집기 — Playwright로 네이버를 실제로 열어 검색어 수요를 뽑는다.
 *
 * 글을 쓰기 전에 돌린다. 타이틀·소제목은 여기서 나온 검색어와 겹쳐야 하고,
 * verify-articles 가 그 겹침을 검사한다. 파일이 없으면 검증이 실패하므로
 * "조사 없이 감으로 제목 짓기"가 구조적으로 막힌다.
 *
 * 소스 2개:
 *   1. 자동완성 API (ac.search.naver.com) — 항상 응답한다. 1차 소스.
 *   2. 검색결과 페이지의 연관검색어 블록 — 검색어에 따라 없을 수 있다. 덤.
 *
 * 사용:
 *   node scripts/collect-keywords.mjs <slug> --q "실손보험" [--q "5세대 실손보험"]...
 *
 * 산출물:
 *   scripts/keywords/<slug>.json
 */
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const argv = process.argv.slice(2);
const slug = argv[0];
if (!slug || slug.startsWith("--")) {
  console.error('사용법: node scripts/collect-keywords.mjs <slug> --q "검색어" [--q ...]');
  process.exit(1);
}
const queries = [];
for (let i = 1; i < argv.length; i++) {
  if (argv[i] === "--q") queries.push(argv[++i]);
}
if (queries.length === 0) {
  console.error("--q 검색어가 최소 1개 필요합니다");
  process.exit(1);
}

const OUT_DIR = path.join("scripts", "keywords");
fs.mkdirSync(OUT_DIR, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage();

const result = { slug, collectedAt: new Date().toISOString().slice(0, 10), queries: [] };

for (const q of queries) {
  const entry = { q, autocomplete: [], related: [] };

  // 1. 자동완성 — JSON 응답을 페이지로 연다
  try {
    await page.goto(
      `https://ac.search.naver.com/nx/ac?q=${encodeURIComponent(q)}&st=100&r_format=json&frm=nv`,
      { timeout: 30000 }
    );
    const raw = await page.evaluate(() => document.body.innerText);
    const json = JSON.parse(raw);
    entry.autocomplete = (json.items?.[0] ?? []).map((x) => x[0]).filter(Boolean);
  } catch (e) {
    console.log(`  ⚠ 자동완성 실패(${q}): ${e.message.split("\n")[0]}`);
  }

  // 2. 검색결과의 연관검색어 — 없는 검색어도 있다
  try {
    await page.goto(`https://search.naver.com/search.naver?query=${encodeURIComponent(q)}`, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    // "함께 많이 찾는" 블록은 스크롤해야 붙는 경우가 있다. 기다리기만 하면 빈손으로 끝난다.
    await page.waitForTimeout(1500);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
    await page.waitForTimeout(1500);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);
    entry.related = await page.evaluate(() => {
      const found = new Set();
      const add = (el) => {
        const t = (el.innerText ?? el.textContent ?? "").replace(/\s+/g, " ").trim();
        if (t && t.length <= 30) found.add(t);
      };

      // 옛 레이아웃 셀렉터. 네이버가 되돌릴 수 있으니 남겨 둔다.
      const sels = [
        ".related_srch .keyword",
        ".lst_related_srch a",
        '[class*="fds-refine-query"] a',
        '[class*="related"] a[href*="query="]',
      ];
      for (const sel of sels) document.querySelectorAll(sel).forEach(add);

      // 지금 레이아웃(2026-08 확인) — "연관검색어"가 "함께 많이 찾는" 블록으로 바뀌었다.
      // 클래스명이 해시라 셀렉터로 못 잡는다. 머리말 텍스트로 블록을 찾고 그 안의 링크를 긁는다.
      // 이 검사를 붙이기 전까지 연관검색어가 모든 글에서 0개로 나왔고, 자동완성만으로
      // 타이틀을 지어 왔다. "ISA 계좌 개편·개정·출금" 같은 수요가 통째로 빠져 있었다.
      const HEAD = /^(함께 많이 찾는|연관검색어|이런 검색어도)/;
      const box = [...document.querySelectorAll("div,section")]
        .filter((e) => {
          const t = (e.innerText || "").trim();
          return HEAD.test(t) && t.length > 30 && t.length < 600;
        })
        .sort((a, b) => a.innerText.length - b.innerText.length)[0];
      if (box) box.querySelectorAll("a").forEach(add);

      return [...found].filter((t) => !/^\d+$/.test(t) && t !== "...").slice(0, 20);
    });
  } catch (e) {
    console.log(`  ⚠ 연관검색어 실패(${q}): ${e.message.split("\n")[0]}`);
  }

  console.log(
    `  "${q}" → 자동완성 ${entry.autocomplete.length}개 · 연관 ${entry.related.length}개`
  );
  result.queries.push(entry);
}

await browser.close();

const all = result.queries.flatMap((e) => [...e.autocomplete, ...e.related]);
if (all.length === 0) {
  console.error("❌ 수집된 검색어가 0개 — 검색어를 바꾸거나 네트워크를 확인하세요");
  process.exit(1);
}

const file = path.join(OUT_DIR, `${slug}.json`);
fs.writeFileSync(file, JSON.stringify(result, null, 2));
console.log(`✅ 검색어 ${all.length}개 → ${file}`);
