#!/usr/bin/env node
/**
 * 골격 생성기 — 글의 구조를 손이 아니라 명령어가 만든다.
 *
 * 지금까지 구조를 매번 내가 손으로 짰다. 타이틀 보고 섹션 수를 정하고, 소제목을 짓고,
 * 핵심콕콕 행수를 세고, 버튼을 붙이고, 출처를 매핑했다. 그 판단을 글마다 다시 하니
 * 글마다 다르게 나왔고, 검사기에 걸리고 나서야 하나씩 고쳤다.
 *
 * 이 명령어는 그 판단을 없앤다. 메인키워드와 항목을 주면
 *   · 타이틀을 항목에서 조립한다 (그래서 타이틀과 소제목이 어긋날 수가 없다)
 *   · 항목 수만큼 섹션을 만든다 (8개를 채울 방법이 없다)
 *   · 소제목에 메인키워드를 박는다
 *   · 버튼은 브리프가 실접속으로 확인한 '행동 화면'에서만 고른다
 *   · 출처·수치 매핑을 증거 JSON에서 채운다
 * 남는 빈칸은 문장뿐이다. TODO 로 표시되며, 남아 있으면 verify-articles 가 막는다.
 *
 * 사용:
 *   node scripts/scaffold.mjs <slug> \
 *     --main "국민성장펀드 2차" \
 *     --items "출시일,가입 방법,종목,서민 우선배정" \
 *     --hook "1차와 달라지는 것" \
 *     --category 금융
 *
 * 산출물: scripts/scaffolds/<slug>.ts  — 붙여 넣을 ArticleData 조각
 */
import fs from "node:fs";
import path from "node:path";

const argv = process.argv.slice(2);
const slug = argv[0];
if (!slug || slug.startsWith("--")) {
  console.error('사용법: node scripts/scaffold.mjs <slug> --main "메인키워드" --items "항목,항목,항목" [--hook "후킹"] [--category 금융]');
  process.exit(1);
}
const opt = {};
for (let i = 1; i < argv.length; i++) {
  if (argv[i].startsWith("--")) opt[argv[i].slice(2)] = argv[++i];
}
const main = opt.main;
const items = String(opt.items || "").split(",").map((s) => s.trim()).filter(Boolean);
const hook = opt.hook || "";
const category = opt.category || "금융";
if (!main || items.length < 2) {
  console.error("--main 과 --items(2개 이상)가 필요합니다.");
  process.exit(1);
}

const ROOT = process.cwd();
const evPath = path.join(ROOT, "scripts", "evidence", `${slug}.json`);
const bfPath = path.join(ROOT, "scripts", "briefs", `${slug}.md`);
if (!fs.existsSync(evPath)) {
  console.error(`증거 파일이 없습니다: ${evPath}\n먼저 npm run brief 를 돌리세요.`);
  process.exit(1);
}
const ev = JSON.parse(fs.readFileSync(evPath, "utf8"));
const brief = fs.existsSync(bfPath) ? fs.readFileSync(bfPath, "utf8") : "";

/** 브리프에서 '행동 화면' 으로 판정된 주소만 뽑는다 — 설명 페이지는 버튼이 될 수 없다 */
function actionScreens() {
  const out = [];
  const re = /- \*\*행동 화면\*\* · (.+)\n\s+- (https?:\/\/\S+)/g;
  let m;
  while ((m = re.exec(brief))) out.push({ title: m[1].trim(), url: m[2].trim() });
  return out;
}
const screens = actionScreens();

const sources = (ev.sources ?? []).map((s) => ({
  title: s.org ? `${s.org} 자료` : "출처",
  url: s.url,
  org: s.org ?? "",
}));

/** 증거에 있는 수치를 전부 매핑해 둔다 — 본문에서 쓰는 값은 반드시 이 안에 있다 */
const claims = [];
{
  const seen = new Set();
  for (const f of ev.facts ?? []) {
    const idx = sources.findIndex((s) => s.url === f.url);
    for (const v of String(f.value || "").split(" / ")) {
      const t = v.trim();
      if (!t || seen.has(t) || /^제\d+조/.test(t)) continue;
      seen.add(t);
      claims.push({ value: t, sourceIndex: idx < 0 ? 0 : idx });
    }
  }
}

const title = `${main} ${items.join("·")}${hook ? `, ${hook}` : ""}`;
const kw = [main, items[0], items[1]].filter(Boolean);
const q = (s) => JSON.stringify(s);
const ind = "      ";

/** 소제목 — 메인키워드를 반드시 얹는다. 어미는 쓰면서 다듬되 항목 낱말은 남긴다. */
const sections = items.map((item, i) => {
  const cta = screens[i % Math.max(1, screens.length)];
  return `        {
          eyebrow: "TODO 4~8자",
          heading: ${q(`${main} ${item}은 어떻게 되나요`)},
          widgets: [
            {
              type: "checklist",
              items: [
                "TODO — 항목 1",
                "TODO — 항목 2",
                "TODO — 항목 3",
              ],
            },
          ],${
            cta
              ? `
          cta: {
            label: "TODO 행동 그대로 (…하기)",
            url: ${q(cta.url)},
            org: "TODO 기관명",
            note: "TODO 보조 안내",
          },`
              : ""
          }
          body:
            "TODO — 첫 문장이 소제목을 곧바로 답한다. 이어서 근거 문장, 마지막에 단서.",
        },`;
});

const src0 = sources[0];
const out = `    {
      slug: ${q(slug)},
      category: ${q(category)},
      primaryKeywords: [${kw.map(q).join(", ")}],

      meta: {
        title:
          ${q(title)},
        description:
          "TODO — ${main} ${items.slice(0, 2).join("·")}를 한 문장으로. 메인키워드가 들어가야 한다.",
        author: { name: "머니위키 편집팀" },
        publishedAt: ${q(new Date().toISOString().slice(0, 10))},
      },

      searchIntent: {
        userQuestion: "TODO — 검색자가 실제로 던지는 질문",
        directAnswer: "TODO — 50자 이내 결론",
        why: ${q(`${src0?.org ?? "공식"} 보도자료 「TODO」가 그렇게 정하기 때문입니다.`)},
      },

      heroHook:
        "TODO — 결론부터 한 문단.\\n\\nTODO — 왜 미루면 손해인지. 마지막 문장은 아래 버튼을 누를 이유.",

${
  screens[0]
    ? `      heroCta: {
        label: "TODO 행동 그대로 (…하기)",
        url: ${q(screens[0].url)},
        org: "TODO 기관명",
      },`
    : `      // 브리프에 '행동 화면'이 없습니다. --url 을 더해 다시 수집하세요.`
}

      keyFacts: [
${items.map((it) => `        { label: ${q(it)}, value: "TODO — ${it}을 답하는 한 줄" },`).join("\n")}
${Array.from({ length: Math.max(0, 7 - items.length) }, (_, i) => `        { label: "TODO 라벨${i + 1}", value: "TODO — 값" },`).join("\n")}
      ],

      summary: [
        "TODO — 요약 1",
        "TODO — 요약 2",
        "TODO — 요약 3",
      ],

      mainSections: [
${sections.join("\n")}
      ],

      resolution: {
        steps: [
${items.map((it) => `          { title: ${q(`${it} 확인하기`)}, body: "TODO — 한 문장" },`).join("\n")}
        ],
      },

      context: {
        faqList: [
${Array.from({ length: 5 }, (_, i) => `          { question: "TODO 질문 ${i + 1}", answer: "TODO 답" },`).join("\n")}
        ],
        disclaimer: "TODO — 이 글의 한계",
      },

      sources: [
${sources.map((s) => `        { title: ${q(s.title)}, url: ${q(s.url)}, org: ${q(s.org)} },`).join("\n")}
      ],
      lastVerified: ${q(ev.verifiedAt ?? new Date().toISOString().slice(0, 10))},

      numericClaims: [
${claims.map((c) => `        { value: ${q(c.value)}, sourceIndex: ${c.sourceIndex} },`).join("\n")}
      ],

      relatedQuestions: [
        { question: "TODO 관련 질문", slug: "TODO-슬러그" },
      ],
    },
`;

const outDir = path.join(ROOT, "scripts", "scaffolds");
fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, `${slug}.ts`);
fs.writeFileSync(outPath, out);

console.log(`✅ 골격 → ${path.relative(ROOT, outPath)}`);
console.log(`   타이틀: ${title}`);
console.log(`   항목 ${items.length}개 → 소제목 ${items.length}개 (개수가 어긋날 수 없습니다)`);
console.log(`   행동 화면 ${screens.length}개 · 출처 ${sources.length}곳 · 수치 매핑 ${claims.length}개`);
console.log(`   TODO 를 문장으로 채우세요. 남아 있으면 verify-articles 가 막습니다.`);
