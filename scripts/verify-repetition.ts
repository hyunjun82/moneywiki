#!/usr/bin/env node
/**
 * 반복 검사기 — 글이 "찍어낸 것처럼" 보이는 원인을 잡는다.
 *
 * 기존 verify-articles 는 "형식이 템플릿과 같은가"를 본다. 그래서 통과해도
 * 글마다 같은 문장, 같은 끝맺음, 같은 비주얼 배치가 나올 수 있다.
 * 실제로 글 19편을 재보니 유도문장 47개 중 31개(66%)가
 * "~보시는 게 좋겠습니다"로 끝나고 있었다. 그 반대편을 이 검사기가 맡는다.
 *
 * 검사 4종:
 *   1. 유도문장 끝맺음 쏠림 — 한 어미가 전체의 30%를 넘으면 ERROR
 *   2. 문장 통째 중복 — 같은 문장이 3회 이상이면 ERROR (2회는 WARN)
 *   3. 비주얼 배치 판박이 — 두 글의 위젯 순서가 완전히 같으면 WARN
 *   4. 한 글 안 버튼 문구 중복 — 같은 label 두 번이면 WARN
 *
 * 사용: npx tsx scripts/verify-repetition.ts
 */
import { 보험 } from "@/data/articles/보험";
import { 퇴직금 } from "@/data/articles/퇴직금";
import { 금융 } from "@/data/articles/금융";
import type { ArticleData } from "@/data/articles/types";

const articles: ArticleData[] = [...보험.articles, ...퇴직금.articles, ...금융.articles];

type Level = "ERROR" | "WARN";
const found: { level: Level; rule: string; msg: string }[] = [];
const push = (rule: string, level: Level, msg: string) => found.push({ level, rule, msg });

/** 어미 판정용 — 문장 끝 12자. 조사·숫자가 달라도 상투구는 여기서 겹친다 */
const ending = (s: string) => s.replace(/\s+/g, " ").trim().slice(-12);
const norm = (s: string) => s.replace(/\s+/g, " ").trim();

/** 본문·서론을 문장 단위로 쪼갠다 */
function sentencesOf(a: ArticleData): string[] {
  const out: string[] = [];
  const eat = (t?: string) => {
    if (!t) return;
    for (const p of t.split(/\n\n+/))
      for (const s of p.split(/(?<=[.?!])\s+/)) {
        const v = norm(s);
        if (v.length >= 12) out.push(v);
      }
  };
  eat(a.heroHook);
  for (const s of a.mainSections) eat(s.body);
  return out;
}

// ── 1. 유도문장 끝맺음 쏠림 ──────────────────────────────
{
  const bridges: string[] = [];
  for (const a of articles)
    for (const s of a.mainSections) if (s.link?.bridge) bridges.push(norm(s.link.bridge));

  const byEnding = new Map<string, number>();
  for (const b of bridges) byEnding.set(ending(b), (byEnding.get(ending(b)) ?? 0) + 1);

  const total = bridges.length;
  for (const [end, n] of [...byEnding.entries()].sort((x, y) => y[1] - x[1])) {
    const share = total ? n / total : 0;
    if (share > 0.3 && n >= 3) {
      push(
        "bridge-monotony",
        "ERROR",
        `유도문장 ${total}개 중 ${n}개(${Math.round(share * 100)}%)가 "…${end}"로 끝납니다 — 어미를 바꾸세요`
      );
    } else if (share > 0.15 && n >= 3) {
      push(
        "bridge-monotony",
        "WARN",
        `유도문장 ${n}개가 "…${end}"로 끝납니다 (${Math.round(share * 100)}%)`
      );
    }
  }
}

// ── 2. 문장 통째 중복 ────────────────────────────────────
{
  const where = new Map<string, string[]>();
  for (const a of articles)
    for (const s of sentencesOf(a)) {
      const list = where.get(s) ?? [];
      list.push(a.slug);
      where.set(s, list);
    }

  for (const [sent, slugs] of where) {
    if (slugs.length < 2) continue;
    const uniq = [...new Set(slugs)];
    const level: Level = slugs.length >= 3 ? "ERROR" : "WARN";
    push(
      "sentence-duplicate",
      level,
      `같은 문장 ${slugs.length}회 (${uniq.slice(0, 3).join(", ")}${uniq.length > 3 ? " 외" : ""}) — "${sent.slice(0, 46)}…"`
    );
  }
}

// ── 3. 비주얼 배치 판박이 ────────────────────────────────
{
  const kindOf = (s: any): string =>
    s.compareTable ? "table" : s.widgets?.length ? s.widgets[0].type : "-";
  const shape = new Map<string, string[]>();
  for (const a of articles) {
    const key = a.mainSections.map(kindOf).join(">");
    const list = shape.get(key) ?? [];
    list.push(a.slug);
    shape.set(key, list);
  }
  for (const [key, slugs] of shape) {
    if (slugs.length >= 2) {
      // 강제(전 섹션 비주얼 필수)를 풀었으니 이쪽을 조인다.
      // 배치가 통째로 같다는 건 주제를 보고 고른 게 아니라 틀을 복사했다는 뜻이다.
      push(
        "visual-shape-clone",
        "ERROR",
        `비주얼 배치가 똑같은 글 ${slugs.length}편 (${slugs.slice(0, 3).join(", ")}) — ${key}`
      );
    }
  }
}

// ── 4. 한 글 안 버튼 문구 중복 ───────────────────────────
{
  for (const a of articles) {
    const labels: string[] = [];
    if (a.heroCta) labels.push(a.heroCta.label);
    for (const s of a.mainSections) if (s.cta) labels.push(s.cta.label);
    for (const st of a.resolution.steps) if (st.action) labels.push(st.action.label);
    const dup = labels.filter((l, i) => labels.indexOf(l) !== i);
    for (const d of [...new Set(dup)])
      push("cta-label-duplicate", "WARN", `[${a.slug}] 버튼 문구 "${d}"가 두 번 이상 쓰였습니다`);
  }
}

// ── 결과 ────────────────────────────────────────────────
console.log(`[verify-repetition] 글 ${articles.length}편 검사\n`);
const errors = found.filter((f) => f.level === "ERROR");
const warns = found.filter((f) => f.level === "WARN");
for (const f of [...errors, ...warns].slice(0, 40)) {
  console.log(`${f.level === "ERROR" ? "✗" : "!"} [${f.level}] ${f.rule}\n    ${f.msg}`);
}
if (found.length > 40) console.log(`  … 그 외 ${found.length - 40}건`);
console.log(`\n[verify-repetition] 완료 — ERROR ${errors.length}, WARN ${warns.length}`);
if (errors.length) process.exit(1);
