#!/usr/bin/env node
/**
 * 정본 템플릿 프로필 추출기
 *
 * docs/moneywiki-article-template.html 을 파싱해 "글이 지켜야 할 기준"을 산출한다.
 * 검증 기준을 사람이 옮겨 적지 않고 템플릿에서 직접 뽑아내는 것이 목적이다.
 * 템플릿을 고치면 기준이 자동으로 따라오므로 정본이 하나로 유지된다.
 *
 * 사용: node scripts/template-profile.mjs         # 프로필 출력
 *      import { profile } from './template-profile.mjs'
 */
import fs from "node:fs";
import path from "node:path";

const TEMPLATE = path.join("docs", "moneywiki-article-template.html");

/** 태그 안의 텍스트만 (태그 제거) */
const strip = (s) => s.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();

export function extractProfile(html) {
  // ── 본문 섹션(section.q) 단위로 자른다. FAQ 섹션은 성격이 달라 분리.
  const secRe = /<section class="q" id="(q\d+|faq)">([\s\S]*?)<\/section>/g;
  const sections = [];
  let m;
  while ((m = secRe.exec(html)) !== null) {
    sections.push({ id: m[1], html: m[2] });
  }
  const qSections = sections.filter((s) => s.id !== "faq");

  // ── 섹션별 비주얼 종류
  const VIZ = {
    checklist: /class="check/,
    stats: /class="stats/,
    table: /class="tbl/,
    steps: /class="steps/,
    ctaBox: /class="cta-box/,
    caution: /class="caution/,
  };
  const vizPerSection = qSections.map((s) =>
    Object.entries(VIZ).filter(([, re]) => re.test(s.html)).map(([k]) => k)
  );

  // ── eyebrow 라벨 길이
  const ebRe = /<div class="eyebrow"><i>[^<]*<\/i><span>([^<]+)<\/span><\/div>/g;
  const eyebrows = [];
  while ((m = ebRe.exec(html)) !== null) eyebrows.push(m[1].trim());
  const ebLens = eyebrows.map((e) => e.length);

  // ── 섹션당 본문 문단 수
  const paraCounts = qSections.map(
    (s) => (s.html.match(/<p class="body"/g) || []).length
  );

  // ── 핵심콕콕 행 수
  const kfBlock = (html.match(/<section class="kf">[\s\S]*?<\/section>/) || [""])[0];
  const kfRows = (kfBlock.match(/<dt>/g) || []).length;

  // ── 3줄 요약
  const sumBlock = (html.match(/<section class="sum">[\s\S]*?<\/section>/) || [""])[0];
  const sumLines = (sumBlock.match(/<li>/g) || []).length;

  // ── FAQ 항목 수
  const faqBlock = (html.match(/<div class="faq"[\s\S]*?<\/section>/) || [""])[0];
  const faqItems = (faqBlock.match(/class="item"/g) || []).length;

  // ── 스포크 링크 수
  const spokeBlock = (html.match(/<nav class="spoke">[\s\S]*?<\/nav>/) || [""])[0];
  const spokeLinks = (spokeBlock.match(/<li>/g) || []).length;

  // ── 목차 항목 수
  const tocItems = (html.match(/<li><a href="#q\d+">/g) || []).length;

  const usedVizKinds = new Set(vizPerSection.flat());

  return {
    sections: {
      count: qSections.length,
      // 모든 섹션이 비주얼을 갖는가 (템플릿의 "비주얼 먼저" 원칙)
      allHaveVisual: vizPerSection.every((v) => v.length > 0),
      visualKindsUsed: [...usedVizKinds],
      minVisualKinds: usedVizKinds.size,
      // 같은 종류가 연속으로 오는 구간이 템플릿에 있는가
      maxSameKindRun: (() => {
        let run = 1, best = 1;
        for (let i = 1; i < vizPerSection.length; i++) {
          const a = vizPerSection[i - 1].join(","), b = vizPerSection[i].join(",");
          run = a && a === b ? run + 1 : 1;
          best = Math.max(best, run);
        }
        return best;
      })(),
      paragraphs: { min: Math.min(...paraCounts), max: Math.max(...paraCounts) },
    },
    eyebrow: {
      required: eyebrows.length >= qSections.length,
      len: { min: Math.min(...ebLens), max: Math.max(...ebLens) },
      samples: eyebrows.slice(0, 8),
    },
    keyFacts: { rows: kfRows },
    summary: { lines: sumLines },
    faq: { items: faqItems },
    spoke: { links: spokeLinks },
    toc: { items: tocItems },
  };
}

export const profile = extractProfile(fs.readFileSync(TEMPLATE, "utf8"));

const invokedDirectly =
  process.argv[1] && import.meta.url.endsWith(path.basename(process.argv[1]));
if (invokedDirectly) {
  console.log(JSON.stringify(profile, null, 2));
}
