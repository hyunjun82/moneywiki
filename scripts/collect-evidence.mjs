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
const NUM = /(\d[\d,.]*\s*(?:천만원|백만원|억원|만원|천원|억|원|%|퍼센트|일|개월|년|주|회|세|시간|분)|제\d+조|\d+월\s*\d+일)/;
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

/** 동시 실행 상한. 정부 사이트에 과한 동시 요청을 보내면 차단당하므로 낮게 잡는다. */
const CONCURRENCY = 3;

/** 추출 성공으로 인정할 최소 본문 길이. 이보다 짧으면 로딩 실패·이미지 본문으로 본다. 조문은 짧을 수 있어 낮게 잡는다. */
const MIN_TEXT = 200;

/** 실패 시 재시도 횟수 */
const RETRIES = 2;

/** 같은 도메인에는 한 번에 하나만 붙는다 (law.go.kr 동시 접속 차단 회피) */
const hostLocks = new Map();
async function withHostLock(url, fn) {
  const host = new URL(url).hostname;
  const prev = hostLocks.get(host) ?? Promise.resolve();
  let release;
  const mine = new Promise((r) => (release = r));
  hostLocks.set(host, prev.then(() => mine));
  await prev;
  try {
    return await fn();
  } finally {
    release();
  }
}

/** 수집 실패 기록 — 조용히 넘어가지 않고 마지막에 모아 보고한다 */
const failures = [];

/** 작업 목록을 상한만큼씩 동시에 처리한다 (각 작업은 자기 탭을 쓴다) */
async function runPool(tasks) {
  const queue = [...tasks];
  const workers = Array.from({ length: Math.min(CONCURRENCY, queue.length) }, async () => {
    while (queue.length) {
      const { label, url, run } = queue.shift();
      let ok = false;
      for (let attempt = 1; attempt <= RETRIES + 1 && !ok; attempt++) {
        const page = await browser.newPage({ viewport: { width: 1100, height: 800 } });
        page.on("dialog", (d) => d.accept().catch(() => {}));
        try {
          await withHostLock(url, () => run(page));
          ok = true;
        } catch (e) {
          const msg = e.message.split("\n")[0];
          if (attempt <= RETRIES) console.log(`  ↻ ${label} 재시도 ${attempt}/${RETRIES} — ${msg}`);
          else failures.push(`${label} — ${msg}`);
        } finally {
          await page.close().catch(() => {});
        }
      }
    }
  });
  await Promise.all(workers);
}

const facts = [];
/** 페이지 원문 — 주장 대조용 */
const raws = [];
let shot = 0;

async function capture(page, label) {
  const file = `evidence-${slug}-${++shot}.png`;
  await page.screenshot({ path: path.join(OUT_DIR, file) });
  console.log(`  캡처 ${file} (${label})`);
  return file;
}

/** 법제처: 본문이 iframe 안에 있고 조문 단위로 추출 */
async function collectLawArticle(page, lawName, no) {
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
  // 짧으면 iframe이 덜 찼거나 본문이 이미지다. 성공으로 넘기지 않는다.
  if (text.length < MIN_TEXT) {
    throw new Error(`제${no}조 본문 ${text.length}자 — 최소 ${MIN_TEXT}자 필요 (로딩 실패 또는 이미지 본문)`);
  }
  const file = await capture(page, `${lawName} 제${no}조`);
  const org = `법제처 (${lawName} 제${no}조)`;
  // 조문 전문을 raws 에도 남긴다. factsFromText 는 숫자나 조문번호가 있는 문장만 남기므로
  // '해고를 피하기 위한 노력을 다하여야 하며…' 같은 숫자 없는 요건 문장이 통째로 사라진다.
  // 그 누락이 실제로 글 7편에서 조문을 빠뜨리게 했다(2026-09-04).
  raws.push({ url, org, screenshot: file, text: text.slice(0, 60000) });
  facts.push(...factsFromText(text, { url, org, screenshot: file }));
}

/** 기관명 — 페이지 제목은 "상세화면" 같은 값이 나와 출처가 뭉개진다. 도메인으로 잡는다. */
const ORG_BY_HOST = {
  "law.go.kr": "법제처",
  "fsc.go.kr": "금융위원회",
  "fss.or.kr": "금융감독원",
  "fine.fss.or.kr": "금융감독원 파인",
  "moel.go.kr": "고용노동부",
  "nts.go.kr": "국세청",
  "mofe.go.kr": "재정경제부",
  "moef.go.kr": "기획재정부",
  "nhis.or.kr": "국민건강보험공단",
  "nps.or.kr": "국민연금공단",
  "molit.go.kr": "국토교통부",
  "bokjiro.go.kr": "복지로",
  "gov.kr": "정부24",
  "work24.go.kr": "고용24",
};
function orgOf(url, title) {
  const host = new URL(url).hostname.replace(/^www\./, "");
  if (ORG_BY_HOST[host]) return ORG_BY_HOST[host];
  const base = Object.keys(ORG_BY_HOST).find((h) => host.endsWith(h));
  if (base) return ORG_BY_HOST[base];
  const t = (title || "").split(/[-|]/)[0].trim();
  return t && !/상세|화면|보기/.test(t) ? t : host;
}

async function collectUrl(page, url) {
  console.log(`페이지 ${url} …`);
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForTimeout(2500);
  // 문서뷰어(재정경제부 synap 등)는 iframe 안에 또 iframe 을 늦게 그린다.
  // 2.5초로는 목차만 읽히고 본문이 통째로 비었다. 프레임이 있으면 더 기다린다.
  if (page.frames().length > 1) {
    await page.waitForTimeout(6000);
    for (const f of page.frames()) {
      try { await f.waitForLoadState("domcontentloaded", { timeout: 8000 }); } catch {}
    }
    await page.waitForTimeout(2000);
  }
  let { text, title, tables } = await page.evaluate(() => {
    // 첫 번째로 걸린 후보를 그대로 쓰면 껍데기만 읽는다.
    // 자동차보험 표준약관은 main 이 목차뿐이고 본문은 다른 곳에 있어
    // 본문 60자로 읽히고 "수치 없음"으로 버려졌다. 가장 긴 후보를 고른다.
    const cands = [
      ...document.querySelectorAll(".article_body, #article_body, .view_cont, article, main"),
      document.body,
    ].filter(Boolean);
    let el = document.body;
    for (const c of cands) {
      if ((c.innerText || "").length > (el.innerText || "").length) el = c;
    }
    // 자르는 길이를 늘려 왔다. 8,000자 → 16,000자 → 40,000자.
    // 8,000자로 자르면 긴 보도자료의 뒷부분이 통째로 날아간다.
    // 금융위 5세대 실손 보도자료(11,699자)에서 도수치료·재가입 주기·중복보상
    // 문장이 8,000자 뒤에 있어 근거가 없는 것처럼 보였다.
    // 16,000자도 모자랐다 — 자동차보험 표준약관(38,168자)은 자기신체사고 장이
    // 그 뒤에 있어 조문을 통째로 놓쳤다.
    // 표는 따로 뽑는다. innerText 로는 칸 구분이 뭉개져 "1억원 2,000만원" 처럼
    // 붙어 나오고, 어느 항목의 값인지 사라진다. 정작 필요한 값이 표에 있는 경우가 많다.
    const tables = [...document.querySelectorAll("table")]
      .map((t) =>
        [...t.querySelectorAll("tr")]
          .map((r) =>
            [...r.querySelectorAll("th,td")]
              .map((c) => (c.innerText || "").replace(/\s+/g, " ").trim())
              .filter(Boolean)
              .join(" | ")
          )
          .filter((r) => r.length > 4)
          .join("\n")
      )
      .filter((t) => t.length > 20)
      .slice(0, 30);
    return { text: el.innerText.slice(0, 40000), title: document.title, tables };
  });

  // 본문이 iframe 안에 실린 사이트가 있다. 법령 수집 경로는 프레임을 훑는데
  // URL 경로에는 그게 없어 자동차보험 표준약관(carinfo.knia.or.kr)을 못 읽었다.
  // "짧을 때만" 훑으면 안 된다 — 이 사이트는 메인 문서에 머리말·푸터만 335자가 있어
  // 200자 문턱을 넘어버리고, 정작 약관 본문이 든 프레임은 열어 보지도 않았다.
  // 가장 긴 프레임 하나만 고르면 안 된다. 재정경제부 문서뷰어는 본문이
  // 부모 프레임(표지·목차)과 자식 프레임(본문)에 나뉘어 실려, 하나만 고르면
  // "'28년 시행" 같은 결론이 통째로 빠진다. 프레임을 전부 이어 붙인다.
  const framePieces = [];
  for (const frame of page.frames()) {
    if (frame === page.mainFrame()) continue;
    try {
      const t = await frame.evaluate(() => document.body?.innerText || "");
      if (t.trim().length >= 50) framePieces.push(t.trim());
    } catch {
      // 교차 출처 프레임은 읽을 수 없다 — 건너뛴다
    }
  }
  if (framePieces.length) {
    const joined = [...new Set(framePieces)].join("\n");
    if (joined.length > text.length) text = joined.slice(0, 60000);
  }
  // 이미지 alt 도 긁는다. 수식은 그림으로 실린다 — innerText 로는 통째로 사라진다.
  // 조특법 제91조의18 연간 납입한도 계산식이 LaTeX 이미지라 "계산식에 따른 금액일 것"
  // 뒤가 빈칸으로 읽혔고, 정작 필요한 2천만원이 근거에서 빠졌다.
  const alts = [];
  for (const frame of page.frames()) {
    try {
      const got = await frame.evaluate(() =>
        [...document.querySelectorAll("img[alt]")].map((i) => i.alt || "")
      );
      alts.push(...got);
    } catch {
      // 교차 출처 프레임은 읽을 수 없다 — 건너뛴다
    }
  }
  const formulas = [...new Set(alts)]
    .map((a) =>
      a
        .replace(/@@\/?LATEX@@/g, "")
        .replace(/\\times/g, "×")
        .replace(/\\left|\\right/g, "")
        .replace(/[{}]/g, "")
        .replace(/\s+/g, " ")
        .trim()
    )
    .filter((a) => a.length >= 15);
  if (formulas.length) text += "\n\n[수식·이미지]\n" + formulas.join("\n");

  // 표 텍스트를 본문 뒤에 붙여 fact 추출 대상에 포함시킨다.
  if (tables?.length) text += "\n\n[표]\n" + tables.join("\n---\n");
  const org = orgOf(url, title);

  // 본문이 너무 짧으면 로딩 실패이거나 내용이 이미지다. 재시도 대상.
  if (text.length < MIN_TEXT) {
    throw new Error(`${org}: 본문 ${text.length}자 — 최소 ${MIN_TEXT}자 필요 (로딩 실패 또는 이미지 본문)`);
  }

  const file = await capture(page, org);
  // 원문도 남긴다. facts 는 숫자가 든 문장만 추리므로 그것만으로는
  // "출처를 붙인 문장이 원문에 실제로 있는가"를 대조할 수 없다.
  // 20,000자에서 잘랐더니 자동차보험 표준약관 제33조가 통째로 잘려 나갔다.
  // 근거로 쓸 조문이 뒤쪽에 있는 문서가 많다 — 넉넉히 남긴다.
  raws.push({ url, org, screenshot: file, text: text.slice(0, 60000) });
  const got = factsFromText(text, { url, org, screenshot: file });

  // 수치가 하나도 안 잡히면 조용히 빠뜨리지 않고 알린다.
  // 목록 페이지·로그인 페이지를 잘못 지정했을 때 여기서 드러난다.
  if (got.length === 0) {
    console.log(`  ⚠ ${org}: 본문은 받았으나 수치가 있는 문장이 없음 — 근거로 쓸 수 없습니다`);
    failures.push(`${org} (${url}) — 수치 없음`);
    return;
  }
  console.log(`  ${org}: fact ${got.length}개`);
  facts.push(...got);
}

// 조문 하나하나와 URL 하나하나가 개별 작업 — 각자 탭을 열어 동시에 처리한다.
const tasks = [];
for (const spec of laws) {
  const [lawName, articleList] = spec.split(":");
  for (const no of (articleList || "").split(",").filter(Boolean)) {
    tasks.push({
      label: `${lawName} 제${no}조`,
      url: `https://www.law.go.kr/`,
      run: (page) => collectLawArticle(page, lawName, no),
    });
  }
}
for (const u of urls) {
  tasks.push({ label: u, url: u, run: (page) => collectUrl(page, u) });
}

console.log(`수집 대상 ${tasks.length}건 · 동시 실행 ${Math.min(CONCURRENCY, tasks.length)}개 (같은 도메인은 1개씩)\n`);
const t0 = Date.now();
await runPool(tasks);
console.log(`\n소요 ${((Date.now() - t0) / 1000).toFixed(1)}초`);
await browser.close();

if (failures.length) {
  console.error(`\n⚠ 수집 실패 ${failures.length}건 — 이 출처는 근거로 쓸 수 없습니다`);
  failures.forEach((f) => console.error(`   · ${f}`));
}

const out = {
  slug,
  verifiedAt: new Date().toISOString().slice(0, 10),
  collectedBy: "scripts/collect-evidence.mjs (playwright)",
  sources: [...new Set(facts.map((f) => JSON.stringify({ url: f.url, org: f.org })))].map(JSON.parse),
  facts,
  raws,
};
// ── 다시 수집해도 사람이 넣은 기록은 살린다 ──
// capturesReviewed(눈으로 읽은 기록) · 파생값 선언 · 캡처를 읽고 손으로 넣은 fact 는
// 수집기가 만들 수 없다. 덮어쓰면 다시 수집할 때마다 사람이 한 일을 처음부터 해야 하고,
// 그러면 그 규칙은 결국 꺼진다. 실제로 재수집 한 번에 5장치 검토 기록이 날아갔다.
const OUT_JSON = path.join("scripts", "evidence", `${slug}.json`);
try {
  if (fs.existsSync(OUT_JSON)) {
    const prev = JSON.parse(fs.readFileSync(OUT_JSON, "utf8"));
    const shots = new Set(fs.existsSync(OUT_DIR) ? fs.readdirSync(OUT_DIR) : []);
    if (prev.capturesReviewed) {
      const kept = {};
      for (const [k, v] of Object.entries(prev.capturesReviewed)) if (shots.has(k)) kept[k] = v;
      if (Object.keys(kept).length) out.capturesReviewed = kept;
    }
    if (prev.exampleValues?.length) out.exampleValues = prev.exampleValues;
    if (prev.exampleNote) out.exampleNote = prev.exampleNote;
    const have = new Set(out.facts.map((f) => f.quote));
    let back = 0;
    for (const f of prev.facts || []) if (f.from && !have.has(f.quote)) { out.facts.push(f); back++; }
    const kn = Object.keys(out.capturesReviewed || {}).length;
    if (kn || back) console.log(`  이전 기록 보존 — 캡처 확인 ${kn}장, 사람이 넣은 fact ${back}개`);
  }
} catch (e) {
  console.warn("  ⚠ 이전 기록을 살리지 못했습니다:", e.message);
}
fs.writeFileSync(path.join("scripts", "evidence", `${slug}.json`), JSON.stringify(out, null, 2));
console.log(`\n✅ ${facts.length}개 fact / ${shot}장 캡처 → scripts/evidence/${slug}.json`);
if (facts.length === 0) { console.error("❌ 추출된 fact 0개 — 사이트 구조 확인 필요"); process.exit(1); }
