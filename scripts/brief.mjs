#!/usr/bin/env node
/**
 * 글 브리프 — 쓰기 전에 재료를 다 모아 놓는다.
 *
 * 지금까지의 순서는 거꾸로였다. 40편을 먼저 쓰고 나중에 검사했다.
 * 그래서 규칙 하나가 바뀔 때마다 40편을 다시 만졌고, 근거가 얕은 자리는
 * 검사기가 "근거 없음"으로 잡을 때까지 몰랐다.
 *
 * 브리프는 그 순서를 뒤집는다. 검색어·근거·CTA 후보를 먼저 전부 모아
 * "이 글에서 쓸 수 있는 문장·숫자·주소"를 목록으로 만든다.
 * 글은 그 목록 밖으로 나가지 않는다 — overclaim 은 검사로 잡을 게 아니라
 * 애초에 재료가 없어서 못 쓰게 만드는 것이다.
 *
 * 사용:
 *   node scripts/brief.mjs <slug> --q "검색어" [--q ...] [--url 공식URL ...] [--law 법령명:조,조]
 *   옵션: --refresh (검색어·근거를 캐시 무시하고 다시 수집)
 *
 * 산출물:
 *   scripts/briefs/<slug>.md   ← 이것만 보고 글을 쓴다
 */
import { spawnSync } from "node:child_process";
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const argv = process.argv.slice(2);
const slug = argv[0];
if (!slug || slug.startsWith("--")) {
  console.error('사용법: node scripts/brief.mjs <slug> --q "검색어" [--url URL] [--law 법령명:조,조]');
  process.exit(1);
}
const queries = [];
const urls = [];
const laws = [];
let refresh = false;
for (let i = 1; i < argv.length; i++) {
  if (argv[i] === "--q") queries.push(argv[++i]);
  else if (argv[i] === "--url") urls.push(argv[++i]);
  else if (argv[i] === "--law") laws.push(argv[++i]);
  else if (argv[i] === "--refresh") refresh = true;
}

const ROOT = process.cwd();
const KW = path.join(ROOT, "scripts", "keywords", `${slug}.json`);
const EV = path.join(ROOT, "scripts", "evidence", `${slug}.json`);
const OUT_DIR = path.join(ROOT, "scripts", "briefs");
fs.mkdirSync(OUT_DIR, { recursive: true });

function run(script, args) {
  const r = spawnSync("node", [script, ...args], { stdio: "inherit" });
  if (r.status !== 0) throw new Error(`${script} 실패 (exit ${r.status})`);
}

// ── 1. 검색어 (네이버 자동완성 + 연관검색어) ──────────────────────────
if (refresh || !fs.existsSync(KW)) {
  if (!queries.length) {
    console.error(`검색어 파일이 없습니다. --q "메인키워드" 를 최소 1개 주세요.`);
    process.exit(1);
  }
  console.log("▶ 검색어 수집");
  run("scripts/collect-keywords.mjs", [slug, ...queries.flatMap((q) => ["--q", q])]);
} else {
  console.log("▶ 검색어 — 기존 파일 사용 (--refresh 로 다시 수집)");
}

// ── 2. 근거 (Playwright 원문 + 캡처) ──────────────────────────────────
if (refresh || !fs.existsSync(EV)) {
  if (!urls.length && !laws.length) {
    console.error(`근거 파일이 없습니다. --url 공식주소 또는 --law 법령명:조 를 주세요.`);
    process.exit(1);
  }
  console.log("▶ 근거 수집");
  run("scripts/collect-evidence.mjs", [
    slug,
    ...laws.flatMap((l) => ["--law", l]),
    ...urls.flatMap((u) => ["--url", u]),
  ]);
} else {
  console.log("▶ 근거 — 기존 파일 사용 (--refresh 로 다시 수집)");
}

const kw = JSON.parse(fs.readFileSync(KW, "utf8"));
const ev = JSON.parse(fs.readFileSync(EV, "utf8"));

// ── 3. 템플릿 프로필 ─────────────────────────────────────────────────
const profRaw = spawnSync("node", ["scripts/template-profile.mjs"], { encoding: "utf8" }).stdout;
const prof = JSON.parse(profRaw.slice(profRaw.indexOf("{")));

// ── 4. CTA 후보 — 실제로 열어 "행동 화면"인지 본다 ────────────────────
// 금감원 bnacJoin/list.do 는 제목이 "가입(목록)"이지만 열어 보면 안내 텍스트다.
// 열어 보기 전에는 알 수 없어서 그동안 "신청하기" 라벨이 조회 페이지로 나갔다.
const ACT = /신청|조회|검색|로그인|인증|발급|비교|계산|이체|해지|인출|가입|수령/;
const candidates = [...new Set([...urls, ...(ev.sources ?? []).map((s) => s.url)])];
console.log(`▶ CTA 후보 ${candidates.length}개 실접속 판정`);

const browser = await chromium.launch();
const ctas = [];
for (const url of candidates) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
    await page.waitForTimeout(3500);
    const r = await page.evaluate(() => {
      const m = document.querySelector("#contents,#content,.contents,main,#container") || document.body;
      return {
        title: document.title.replace(/\s+/g, " ").trim(),
        acts: [
          ...new Set(
            [...m.querySelectorAll("a,button,input[type=submit],input[type=button]")]
              .map((e) => (e.value || e.textContent || "").replace(/\s+/g, " ").trim())
              .filter((t) => t && t.length < 22)
          ),
        ],
        inputs: m.querySelectorAll("input,select,textarea").length,
        rows: m.querySelectorAll("table tr").length,
      };
    });
    const acts = r.acts.filter((t) => ACT.test(t)).slice(0, 6);
    const guide = /^(안내|공지|점검|오류|error|404|페이지를 찾을 수 없)/i.test(r.title);
    // 입력 요소나 표가 있으면 실제로 무언가를 하는 화면이다. 둘 다 없으면 설명 페이지다.
    const doing = !guide && (r.inputs >= 5 || r.rows >= 5);
    ctas.push({ url, title: r.title, acts, inputs: r.inputs, rows: r.rows, doing });
  } catch (e) {
    ctas.push({ url, title: `열기 실패 — ${e.message.split("\n")[0].slice(0, 60)}`, acts: [], doing: false });
  }
  await page.close().catch(() => {});
}
await browser.close();

// ── 5. 브리프 작성 ───────────────────────────────────────────────────
const allKeywords = (kw.queries ?? []).flatMap((q) => [...(q.autocomplete ?? []), ...(q.related ?? [])]);
const freq = new Map();
for (const k of allKeywords) freq.set(k, (freq.get(k) ?? 0) + 1);
const ranked = [...freq.entries()].sort((a, b) => b[1] - a[1]).map(([k]) => k);

/** 행동을 담은 검색어 — 타이틀의 세부 키워드 자리에 들어갈 것들 */
const ACTION_KW = /(방법|신청|조건|자격|기준|한도|나이|서류|절차|기간|얼마|금액|계산|비교|해지|발급|조회|추천|차이|단점)/;
// 브랜드 검색어는 타이틀·소제목에서 뺀다. 넣으면 특정 회사 추천 글이 되고 AdSense 위험이 있다.
// "국민"만으로 거르면 국민성장펀드·국민연금 같은 제도 이름이 통째로 브랜드가 된다.
// 회사 이름으로 읽히는 형태만 건다.
const BRAND = /(토스|삼성증권|삼성자산|키움|신한|KB국민|국민은행|kb증권|kb자산|농협은행|우리은행|하나은행|하나증권|미래에셋|한국투자|NH투자|씨티|카카오뱅크|카카오페이|케이뱅크|증권사?\s*추천)/i;
const brandKw = ranked.filter((k) => BRAND.test(k));
const clean = ranked.filter((k) => !BRAND.test(k));
const actionKw = clean.filter((k) => ACTION_KW.test(k)).slice(0, 20);

const facts = ev.facts ?? [];
const byOrg = new Map();
for (const f of facts) {
  if (!byOrg.has(f.org)) byOrg.set(f.org, []);
  byOrg.get(f.org).push(f);
}
const rawVals = [...new Set(facts.flatMap((f) => String(f.value || "").split(" / ")))].filter(Boolean);
// 조문 번호와 실제 수량은 쓰임이 다르다 — 섞어 두면 "제91조"를 금액처럼 쓰는 사고가 난다.
const lawNos = rawVals.filter((v) => /^제\d+조/.test(v));
const numbers = rawVals.filter((v) => !/^제\d+조/.test(v) && /\d/.test(v) && v.length >= 2);

const L = [];
L.push(`# 브리프 — ${slug}`);
L.push("");
L.push(`검색어 수집 ${kw.collectedAt ?? "?"} · 근거 수집 ${ev.verifiedAt ?? "?"} · 근거 ${facts.length}개 / 출처 ${(ev.sources ?? []).length}곳`);
L.push("");
L.push("> **이 문서 밖의 숫자·인용·주소는 글에 쓰지 않는다.**");
L.push("> 여기 없는 내용이 필요하면 먼저 `--url` 을 더해 다시 수집한다.");
L.push("");

L.push("## 1. 타이틀 재료");
L.push("");
L.push(`메인키워드 후보: ${clean.slice(0, 3).join(" · ") || "(없음)"}`);
L.push("");
L.push("세부(행동) 키워드 — 타이틀에 2~3개를 중점(·)으로 묶는다:");
actionKw.slice(0, 12).forEach((k) => L.push(`- ${k}`));
if (brandKw.length) {
  L.push("");
  L.push(`※ 브랜드 검색어(${brandKw.length}개)는 타이틀에 넣지 않는다 — 특정 회사 추천이 된다.`);
}
L.push("");
L.push("공식: `메인키워드 + 세부(행동)키워드 2~3개 나열 + 후킹` · 중점(·)으로 묶음 · 대시(—) 금지 · \"요\" 어미 금지");
L.push("");

L.push("## 2. 소제목 후보 (검색어가 드러낸 질문)");
L.push("");
L.push("q1은 반드시 행동 섹션. 타이틀이 나열한 항목은 소제목이 답한다.");
L.push("");
actionKw.slice(0, 10).forEach((k) => L.push(`- ${k}`));
L.push("");

L.push("## 3. 쓸 수 있는 숫자 (이 밖의 수치는 금지)");
L.push("");
numbers.slice(0, 60).forEach((n) => L.push(`- ${n}`));
if (lawNos.length) {
  L.push("");
  L.push(`인용 가능한 조문: ${lawNos.join(" · ")}`);
}
L.push("");

L.push("## 4. 쓸 수 있는 문장 (원문 그대로만 인용)");
L.push("");
for (const [org, list] of byOrg) {
  L.push(`### ${org}`);
  L.push("");
  list.slice(0, 25).forEach((f) => L.push(`- ${f.quote}`));
  L.push("");
}

L.push("## 5. CTA 후보 (Playwright로 열어 본 결과)");
L.push("");
L.push("`행동 화면` 만 버튼으로 쓴다. 라벨은 사용자가 할 행동 그대로 —");
L.push("`가입 자격 확인하기` `소득확인증명서 발급하기` `수수료 비교하기`. 열람형(보기/펼쳐 보기) 금지.");
L.push("");
for (const c of ctas.sort((a, b) => Number(b.doing) - Number(a.doing))) {
  L.push(`- ${c.doing ? "**행동 화면**" : "설명 페이지 — 버튼 금지"} · ${c.title}`);
  L.push(`  - ${c.url}`);
  L.push(`  - 입력 ${c.inputs ?? 0}개 · 표 ${c.rows ?? 0}행${c.acts.length ? ` · 버튼: ${c.acts.join(" / ")}` : ""}`);
}
L.push("");

L.push("## 6. 템플릿 프로필");
L.push("");
L.push("```json");
L.push(JSON.stringify(prof, null, 2));
L.push("```");
L.push("");

L.push("## 7. 검사기가 막는 형식 규칙 (쓰기 전에 맞춰 둔다)");
L.push("");
L.push("verify-articles 가 ERROR 로 잡는 것들이다. 쓰고 나서 고치면 하나 고칠 때마다");
L.push("다음 규칙이 튀어나와 왕복이 늘어난다. 처음부터 맞춰서 쓴다.");
L.push("");
[
  "타이틀에 행동 키워드가 있는가 — 신청·조회·발급·비교·계산·개설·가입·해지 중 하나",
  "meta.description 에 메인키워드가 최소 1개 들어갔는가",
  "각 소제목(heading)에 메인키워드가 최소 1개 들어갔는가",
  "소제목이 얹은 낱말을 그 섹션 본문이 실제로 쓰는가 (heading-body-match)",
  "searchIntent.why 에 조문(제N조) 또는 보도자료·고시·공고 표기가 있는가",
  "q1 이 신청·절차를 다루는 행동 섹션인가 (hero 버튼이 받는 자리)",
  "본문 내부 링크(link)가 2개 이상인가",
  "핵심콕콕이 7~9행인가 · 3줄 요약이 정확히 3줄인가",
  "버튼 문구가 열람형(보기·펼쳐 보기·요약표)이 아닌가",
  "같은 주소를 쓰는 버튼이 3개 이상은 아닌가",
].forEach((c) => L.push(`- [ ] ${c}`));
L.push("");

L.push("## 8. 쓰기 전 체크 (뜻)");
L.push("");
[
  "타이틀이 나열한 항목마다 그것을 답하는 소제목이 있는가",
  "소제목이 타이틀 항목 수보다 크게 많지 않은가 — 타이틀에 없는 곁가지 섹션은 뺀다",
  "훅의 마지막 문장이 퀴즈 어투(맞춰 보시죠)가 아니라 행동 유도인가",
  "타이틀이 나열한 항목마다 그것을 답하는 핵심콕콕 행이 있는가",
  "훅의 마지막 문장이 부르는 행동과 heroCta 라벨이 같은 일인가",
  "각 섹션 첫 문장이 소제목 질문을 곧바로 답하는가 (배경·정의로 시작 금지)",
  "본문의 모든 숫자가 3번 목록 안에 있는가",
  "인용문이 4번 목록에 그대로 있는가 (조건·단서를 빼먹지 않았는가)",
  "버튼 주소가 5번의 `행동 화면` 인가",
].forEach((c) => L.push(`- [ ] ${c}`));
L.push("");

const outPath = path.join(OUT_DIR, `${slug}.md`);
fs.writeFileSync(outPath, L.join("\n"));

const doing = ctas.filter((c) => c.doing).length;
console.log(`\n✅ 브리프 → ${path.relative(ROOT, outPath)}`);
console.log(`   검색어 ${allKeywords.length}개 (행동형 ${actionKw.length}) · 숫자 ${numbers.length}개 · 문장 ${facts.length}개`);
console.log(`   CTA 후보 ${ctas.length}개 중 행동 화면 ${doing}개`);
if (!doing) console.log("   ⚠ 행동 화면이 하나도 없습니다 — 신청·조회를 실제로 하는 .go.kr/.or.kr 주소를 --url 로 더하세요.");
