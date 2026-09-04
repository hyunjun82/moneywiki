#!/usr/bin/env node
/**
 * 누락 검사 — 글이 인용한 조문 안에서, 글이 빠뜨린 항·호를 찾는다.
 *
 * 왜 따로 두나 — 다른 검사기는 전부 "쓴 것이 맞나"를 본다. "써야 했는데 안 썼나"는 아무도 안 봤다.
 * 그래서 2026-09-04 에 조문이 통째로 빠진 글 7편이 게이트를 전부 통과한 채 배포됐다
 * (제24조② 해고회피 노력, 제62조② 추가징수 2배·5배, 제60조 정당한 사유 3개).
 * 뜻 검사에 규칙을 하나 더 넣어 봤지만 8개 규칙을 9만 자에 한 번에 물으면 산만해서 심어 둔 누락을 놓쳤다.
 *
 * 그래서 좁힌다. 글이 quote.law 로 인용한 조문마다,
 *   그 조문 전문(증거 raws) + 글 전문 → "이 조문의 항·호 중 글이 다루지 않은 것"
 * 을 한 조문씩 따로 묻는다. 범위가 작아 판정이 안정적이고, 어느 조문의 무엇이 빠졌는지 바로 나온다.
 *
 * 사용: npx tsx scripts/verify-omission.ts <slug> [<slug>...]
 *   MEANING_MODEL 로 판정 모델을 바꿀 수 있다(기본 claude-sonnet-5).
 */
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { getArticle } from "../src/lib/articles";

const ROOT = process.cwd();
const EVID = path.join(ROOT, "scripts", "evidence");
const MODEL = process.env.MEANING_MODEL || "claude-sonnet-5";
const PASSES = Math.max(1, Number(process.env.OMISSION_PASSES || 2));
const slugs = process.argv.slice(2).filter((a) => !a.startsWith("--"));

if (!slugs.length) {
  console.error("사용법: npx tsx scripts/verify-omission.ts <slug> [<slug>...]");
  process.exit(1);
}

const strip = (s: unknown) => String(s || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

/** 글 전체를 한 덩어리 텍스트로 — 본문·위젯·표·FAQ·요약까지. 어디에 있든 다뤘으면 다룬 것이다. */
function articleText(a: any): string {
  const out: string[] = [a.meta?.title, a.meta?.description, a.searchIntent?.directAnswer];
  for (const k of a.keyFacts ?? []) out.push(`${k.label}: ${k.value}`);
  for (const st of a.heroStats ?? []) out.push(`${st.label} ${st.value}${st.unit ?? ""} ${st.note ?? ""}`);
  const sec = (s: any) => {
    out.push(s.heading, s.answer, s.body);
    const t = s.compareTable;
    if (t) {
      out.push(t.caption, t.footnote);
      for (const row of t.rows ?? []) out.push((row as any[]).map((c) => (typeof c === "string" ? c : [c.tag, c.text, c.doc].filter(Boolean).join(" "))).join(" | "));
    }
    for (const w of s.widgets ?? []) {
      if (w.items) for (const it of w.items) out.push(typeof it === "string" ? it : [it.q, it.sub, it.next, it.d, it.t, it.m].filter(Boolean).join(" "));
      if (w.steps) for (const x of w.steps) out.push([x.cap, x.val, x.sub, x.tab, x.title, x.body].filter(Boolean).join(" "));
      if (w.okText) out.push(w.okText);
      if (w.persona) out.push(`${w.persona} ${w.result} ${w.note ?? ""}`);
      if (w.label && w.note) out.push(`${w.label} ${w.note}`);
    }
    if (s.quote) out.push(`${s.quote.law} ${s.quote.text}`);
    for (const u of s.subsections ?? []) sec(u);
  };
  for (const s of a.mainSections ?? []) sec(s);
  for (const f of a.context?.faqList ?? []) out.push(f.question, f.answer);
  for (const x of a.summary ?? []) out.push(x);
  return strip(out.filter(Boolean).join("\n"));
}

/** 글이 인용한 조문 — quote.law 에서 "OO법 제N조" 를 뽑는다 */
function citedArticles(a: any): { law: string; no: string }[] {
  const found = new Map<string, { law: string; no: string }>();
  const scan = (s: any) => {
    const law = String(s?.quote?.law || "");
    // "고용보험법 시행령 제68조 제1항 · 제46조" 처럼 여러 조가 한 줄에 올 수 있다
    const lawName = (law.match(/^([가-힣\s]+?(?:법|령|규칙|고시))/) || [])[1]?.trim();
    for (const m of law.matchAll(/제(\d+)조(?:의(\d+))?/g)) {
      const no = m[2] ? `${m[1]}의${m[2]}` : m[1];
      if (lawName) found.set(`${lawName} 제${no}조`, { law: lawName, no });
    }
    for (const u of s?.subsections ?? []) scan(u);
  };
  for (const s of a.mainSections ?? []) scan(s);
  return [...found.values()];
}

/** 증거 raws 에서 그 조문 전문을 찾는다 — org 가 "법제처 (고용보험법 제44조)" 꼴 */
function statuteText(raws: any[], law: string, no: string): string | null {
  const key = `제${no}조`;
  const short = law.replace(/\s+/g, "");
  const hit = (raws || []).find((r) => {
    const org = String(r.org || "").replace(/\s+/g, "");
    return org.includes(key + ")") && org.includes(short.slice(0, 5));
  });
  return hit ? strip(hit.text) : null;
}

function runClaude(input: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const child = spawn("claude", ["-p", "--model", MODEL, "--output-format", "text"], { shell: process.platform === "win32" });
    let out = "", err = "";
    const timer = setTimeout(() => child.kill(), 6 * 60 * 1000);
    child.stdout.on("data", (d) => (out += d));
    child.stderr.on("data", (d) => (err += d));
    child.on("error", reject);
    child.on("close", (code) => { clearTimeout(timer); code === 0 ? resolve(out) : reject(new Error(err || `exit ${code}`)); });
    child.stdin.end(input);
  });
}

const PROMPT = `너는 조문과 글을 대조하는 심사자다. 한 조문만 본다.

아래에 (1) 법 조문 전문과 (2) 그 조문을 인용한 글의 전문이 온다.

먼저 조문을 항(①②③…)·호(1. 2. 3.)·목(가. 나. 다.)·단서(다만…) 단위로 전부 쪼개 나열하라. 하나도 빼지 마라.
그리고 각 단위마다 두 가지를 표시하라.
  covered — 글이 그 뜻을 어디에서든 전달하는가. 문장이 같아야 하는 것이 아니다. 뜻이 있으면 true.
  matters — 알았다면 독자의 판단이나 행동이 달라지는가. 요건·예외·기한·금액·배수·제재·절차상 의무·판단 주체면 true.
            정의 조항, 위임 문구("대통령령으로 정한다"), 다른 법 준용, 이 글 주제(제목·대제목 기준)와 무관한 항이면 false.

출력은 JSON 하나뿐. 설명·코드펜스 금지.
{"items":[{"where":"제N항 제M호 처럼 위치","text":"그 단위의 조문 문장(짧게)","covered":true|false,"matters":true|false,"why":"covered 가 false 이고 matters 가 true 일 때만: 독자에게 왜 중요한지 한 문장","severity":"ERROR"|"WARN"}]}
severity 는 covered=false·matters=true 인 것에만 붙인다. 독자가 돈·자격·기한을 잃을 수 있으면 ERROR, 그 밖은 WARN.`;

async function main() {
let totalErr = 0, totalWarn = 0, failed = 0;

for (const slug of slugs) {
  const a = getArticle(slug) as any;
  if (!a) { console.error(`❌ ${slug} — 글 없음`); failed++; continue; }
  const evp = path.join(EVID, `${slug}.json`);
  if (!fs.existsSync(evp)) { console.error(`❌ ${slug} — 증거 없음`); failed++; continue; }
  const ev = JSON.parse(fs.readFileSync(evp, "utf8"));
  const cited = citedArticles(a);
  const text = articleText(a);
  const findings: any[] = [];
  let checked = 0, noText = 0, enumerated = 0;

  for (const c of cited) {
    const st = statuteText(ev.raws, c.law, c.no);
    if (!st) { noText++; continue; }
    checked++;
    const input = `${PROMPT}\n\n── (1) 조문: ${c.law} 제${c.no}조 ──\n${st}\n\n── (2) 글 전문 (제목: ${a.meta?.title}) ──\n${text}`;
    try {
      // 두 번 물어 합의한 것만 ERROR — 판정이 매번 달라 한 번으로는 게이트가 흔들린다
      const passes: any[][] = [];
      for (let k = 0; k < PASSES; k++) {
        const raw = await runClaude(input);
        const m = raw.match(/\{[\s\S]*\}/);
        const j = m ? JSON.parse(m[0]) : { items: [] };
        passes.push((j.items || []).filter((x: any) => x.covered === false && x.matters === true));
        if (k === 0) enumerated += (j.items || []).length;
      }
      // 같은 항을 '1문'과 '전단'처럼 다르게 부르면 합의로 안 잡힌다. 항·호 번호로만 맞춘다.
      // 같은 항 안의 문(文)이 합쳐지지만, 그러면 차단 쪽으로 기울어 안전하다.
      const norm = (w: string) => {
        const t = String(w || "");
        const hang = (t.match(/(\d+)\s*항/) || [])[1] || "";
        const ho = (t.match(/(\d+)\s*호/) || [])[1] || "";
        const mok = (t.match(/([가-하])\s*목/) || [])[1] || "";
        const dan = /단서/.test(t) ? "단서" : "";
        return hang || ho || mok || dan ? `${hang}항${ho}호${mok}목${dan}` : t.replace(/\s+/g, "");
      };
      const seen = new Map<string, { hits: number; item: any }>();
      for (const list of passes) for (const x of list) {
        const key = norm(x.where);
        const cur = seen.get(key);
        if (cur) { cur.hits++; if (x.severity === "ERROR") cur.item.severity = "ERROR"; }
        else seen.set(key, { hits: 1, item: { ...x } });
      }
      for (const { hits, item } of seen.values()) {
        const agreed = hits >= PASSES;
        findings.push({ law: `${c.law} 제${c.no}조`, ...item, severity: agreed ? item.severity : "WARN", agreed });
      }
    } catch (e: any) {
      console.error(`   ⚠ ${c.law} 제${c.no}조 판정 실패: ${String(e.message).slice(0, 120)}`);
      failed++;
    }
  }

  const errs = findings.filter((f) => f.severity === "ERROR");
  const warns = findings.filter((f) => f.severity !== "ERROR");
  totalErr += errs.length; totalWarn += warns.length;

  const head = `${errs.length ? "❌" : warns.length ? "⚠️" : "✅"} ${slug} — 인용 조문 ${cited.length}개 중 ${checked}개 대조, 항·호 ${enumerated}개 확인${noText ? ` (원문 없는 조문 ${noText}개)` : ""}`;
  console.log(head);
  for (const f of findings) {
    console.log(`   ${f.severity === "ERROR" ? "🔴" : "🟡"} [${f.law} ${f.where}]${f.agreed === false ? " (두 번 중 한 번만 지적 — 사람이 확인)" : ""}`);
    console.log(`      "${String(f.text).slice(0, 140)}"`);
    console.log(`      ${f.why}`);
  }
  if (noText && !checked) console.log("   원문이 증거에 없어요 — 조문 전문은 2026-09-04 이후 수집분부터 raws 에 남습니다. npm run evidence 로 다시 수집하세요.");
}

console.log(`\n  누락 검사 — 글 ${slugs.length}편 / ERROR ${totalErr} · WARN ${totalWarn}${failed ? ` · 판정 실패 ${failed}` : ""}`);
process.exit(totalErr || failed ? 1 : 0);
}

main().catch((e) => { console.error(e); process.exit(1); });
