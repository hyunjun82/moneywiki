#!/usr/bin/env node
/**
 * 주장 검사기 — 본문이 근거보다 앞서 나가지 않았는지 본다.
 *
 * verify-evidence 는 "숫자가 증거에 있는가"만 본다. 그런데 오해는 숫자가 아니라
 * 말투에서 난다. "금융위원회는 ~라고 밝혔습니다" 라고 써 놓고 정작 그 내용이
 * 증거 원문에 없거나, "무조건·반드시·전액" 같은 단정으로 넘겨짚는 경우다.
 * 실제로 자손·자상 글을 쓸 때 "자상은 과실 100%여도 전액 보상"이라는
 * 근거 없는 통설을 쓸 뻔했다. 그런 걸 여기서 막는다.
 *
 * 검사 3종:
 *   1. 과장·확정 표현 — 애드센스 위험이자 독자 오해의 원인 (ERROR)
 *   2. 출처를 붙인 문장이 증거 원문과 겹치는가 (WARN)
 *   3. 사람이 눈으로 봐야 하는 캡처 목록 안내 — 표·이미지는 텍스트 추출로 안 잡힌다
 *
 * 사용: npx tsx scripts/verify-claims.ts [slug ...]
 */
import fs from "node:fs";
import path from "node:path";
import { 보험 } from "@/data/articles/보험";
import { 퇴직금 } from "@/data/articles/퇴직금";
import { 금융 } from "@/data/articles/금융";
import type { ArticleData } from "@/data/articles/types";

const only = process.argv.slice(2);
const all: ArticleData[] = [...보험.articles, ...퇴직금.articles, ...금융.articles];
const articles = only.length ? all.filter((a) => only.includes(a.slug)) : all;

type Level = "ERROR" | "WARN";
const found: { level: Level; rule: string; msg: string }[] = [];
const push = (rule: string, level: Level, msg: string) => found.push({ level, rule, msg });

/** 넘겨짚는 말. 정책상 위험하거나 독자가 "나는 무조건 된다"고 읽게 만든다 */
const OVERCLAIM: { re: RegExp; why: string }[] = [
  { re: /무조건/, why: "예외 없는 단정" },
  { re: /반드시 (받|지급|가능)/, why: "수급을 단정" },
  { re: /100% (보장|지급|보상|가능)/, why: "전부 보장으로 읽힘" },
  { re: /확정 ?지급/, why: "확정으로 읽힘" },
  { re: /축하(합니다|해요|드립니다)/, why: "대상 확정처럼 들림" },
  { re: /누구나 (받|가능|됩니다)/, why: "자격 조건을 지움" },
  { re: /전액 (보상|지급)(됩니다|해요|받)/, why: "한도·공제를 지움" },
  { re: /걱정 없이/, why: "위험을 지움" },
  { re: /절대 (안|없)/, why: "예외 없는 단정" },
];

/** 출처를 붙인 문장인가 */
const CITED = /(밝혔습니다|설명합니다|설명했습니다|정하고 있습니다|정합니다|규정합니다|안내합니다|자료에 따르면|에 따르면)/;

/** 증거 원문 뭉치 */
function evidenceOf(slug: string): { text: string; shots: string[]; ok: boolean } {
  const p = path.join("scripts", "evidence", `${slug}.json`);
  if (!fs.existsSync(p)) return { text: "", shots: [], ok: false };
  const j = JSON.parse(fs.readFileSync(p, "utf8"));
  // facts 는 숫자가 든 문장만 남는다. raws(페이지 원문)까지 합쳐야
  // "출처를 붙인 문장이 원문에 실제로 있는가"를 제대로 볼 수 있다.
  const text = [
    ...(j.facts ?? []).map((f: any) => String(f.quote ?? "")),
    ...(j.raws ?? []).map((r: any) => String(r.text ?? "")),
  ].join("\n");
  const shots = [...new Set((j.facts ?? []).map((f: any) => f.screenshot).filter(Boolean))] as string[];
  return { text, shots, ok: true };
}

/** 문장에서 뜻을 지는 낱말만 남긴다 (조사·흔한 말 제외) */
const STOP = /^(있습니다|없습니다|합니다|입니다|그리고|하지만|다만|따라서|경우|때문|대해|대한|위해|통해|이때|이것|그것)$/;
function keywords(s: string): string[] {
  return [...new Set(s.match(/[가-힣]{3,}/g) ?? [])].filter((w) => !STOP.test(w)).slice(0, 6);
}

const bodies = (a: ArticleData) => {
  const out: string[] = [];
  const eat = (t?: string) => {
    if (!t) return;
    for (const p of t.split(/\n\n+/))
      for (const s of p.split(/(?<=[.?!])\s+/)) {
        const v = s.replace(/\s+/g, " ").trim();
        if (v.length >= 12) out.push(v);
      }
  };
  eat(a.heroHook);
  for (const s of a.mainSections) eat(s.body);
  for (const f of a.context?.faqList ?? []) eat(f.answer);
  for (const l of a.summary ?? []) eat(l);
  return out;
};

const shotIndex: Record<string, string[]> = {};

for (const a of articles) {
  const ev = evidenceOf(a.slug);
  if (!ev.ok) {
    push("evidence-missing", "ERROR", `[${a.slug}] 증거 JSON이 없습니다`);
    continue;
  }
  if (ev.shots.length) shotIndex[a.slug] = ev.shots;

  for (const sent of bodies(a)) {
    // 1. 과장·확정
    // "무조건 ~는 아닙니다" 처럼 부정으로 받는 문장은 단정이 아니다
    const negated = /(아닙니다|않습니다|없습니다|아니에요|어렵습니다)/.test(sent);
    for (const o of OVERCLAIM) {
      if (o.re.test(sent) && !negated) {
        push(
          "overclaim",
          "ERROR",
          `[${a.slug}] ${o.why} — "${sent.slice(0, 52)}…"`
        );
        break;
      }
    }

    // 2. 출처를 붙였는데 증거에 그 말이 없는 경우
    if (CITED.test(sent)) {
      const kws = keywords(sent);
      if (kws.length >= 3) {
        const hit = kws.filter((w) => ev.text.includes(w)).length;
        if (hit / kws.length < 0.4) {
          push(
            "citation-thin",
            "WARN",
            `[${a.slug}] 출처를 붙였는데 증거 원문과 겹치는 말이 ${hit}/${kws.length} — "${sent.slice(0, 48)}…"`
          );
        }
      }
    }
  }
}

// 3. 사람이 봐야 하는 캡처
console.log(`[verify-claims] 글 ${articles.length}편 검사\n`);
const errors = found.filter((f) => f.level === "ERROR");
const warns = found.filter((f) => f.level === "WARN");
for (const f of [...errors, ...warns].slice(0, 30))
  console.log(`${f.level === "ERROR" ? "✗" : "!"} [${f.level}] ${f.rule}\n    ${f.msg}`);
if (found.length > 30) console.log(`  … 그 외 ${found.length - 30}건`);

const shotCount = Object.values(shotIndex).flat().length;
if (shotCount) {
  console.log(`\n── 눈으로 확인할 캡처 ${shotCount}장 ──`);
  console.log("  표·이미지 안의 값은 텍스트 추출로 안 잡힙니다. 글 쓰기 전에 Read 로 열어 보세요.");
  for (const [slug, shots] of Object.entries(shotIndex).slice(0, 6))
    console.log(`  ${slug}: scripts/evidence/${slug}/${shots.slice(0, 3).join(", ")}`);
}

console.log(`\n[verify-claims] 완료 — ERROR ${errors.length}, WARN ${warns.length}`);
if (errors.length) process.exit(1);
