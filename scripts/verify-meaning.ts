#!/usr/bin/env npx tsx
/**
 * 의미 검사기 — 형태가 아니라 뜻을 본다.
 *
 * 기존 검사기 5종은 전부 정규식·DOM이다. "낱말이 있는가", "행수가 맞는가"만 본다.
 * 그래서 훅에 '소득확인증명서'만 박아 넣으면 통과했고, 개설 안내 글에 증명서 발급
 * 버튼이 붙어도 아무도 못 막았다. 아프게 지적받은 건 전부 여기, 의미 쪽이었다.
 *
 * 이 검사기는 글(ArticleData) + 증거 JSON + 검색어 JSON을 한자리에 놓고
 * 판정자(claude -p, headless)에게 다섯 가지를 묻는다.
 *
 *   hook-cta        훅이 약속한 행동과 버튼이 실제로 데려가는 곳이 같은 일인가
 *   heading-answer  소제목이 던진 질문을 그 섹션 첫 문장이 실제로 답하는가
 *   overclaim       증거 quote/value를 넘어선 단언·오해의 소지가 있는 문장인가
 *   keyfacts-fit    핵심콕콕이 타이틀이 약속한 항목을 담고 있는가
 *   intent-coverage 수집된 검색어가 드러낸 궁금증 중 글이 안 답한 것이 있는가
 *   self-contradiction 훅·요약·핵심콕콕·본문이 서로 어긋나는가
 *   unnatural-korean  뜻이 안 통하거나 번역체·양산형 문구인가
 *
 * 판정 결과는 글 내용 해시로 캐시한다 — 글이 안 바뀌면 다시 묻지 않는다.
 *
 * 사용:
 *   npx tsx scripts/verify-meaning.ts <slug> [<slug>...]
 *   npx tsx scripts/verify-meaning.ts --all
 *   npx tsx scripts/verify-meaning.ts --changed        # push 범위에서 slug 추출
 *   옵션: --images (증거 캡처 PNG까지 판정자가 열어 본다) --fresh (캐시 무시)
 */
import { spawn, spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { getArticle, getAllArticleSlugs } from "../src/lib/articles";

const ROOT = process.cwd();
const EVID = path.join(ROOT, "scripts", "evidence");
const KEYW = path.join(ROOT, "scripts", "keywords");
const CACHE = path.join(ROOT, "scripts", "meaning-cache");

const argv = process.argv.slice(2);
const useImages = argv.includes("--images");
const fresh = argv.includes("--fresh");
let slugs = argv.filter((a) => !a.startsWith("--"));

if (argv.includes("--all")) slugs = getAllArticleSlugs();
if (argv.includes("--changed")) {
  const upstream =
    spawnSync("git", ["rev-parse", "--abbrev-ref", "--symbolic-full-name", "@{u}"], {
      encoding: "utf8",
    }).stdout.trim() || "origin/main";
  const diff = spawnSync("git", ["diff", "-U0", `${upstream}..HEAD`, "--", "src/data/articles"], {
    encoding: "utf8",
  }).stdout;
  const known = new Set(getAllArticleSlugs());
  const found = new Set<string>();
  for (const m of diff.matchAll(/^\+.*\bslug:\s*["'`]([^"'`]+)["'`]/gm)) {
    if (known.has(m[1])) found.add(m[1]);
  }
  slugs = [...found];
}

if (!slugs.length) {
  console.log("검사할 글 없음 — 통과");
  process.exit(0);
}

const RUBRIC = `너는 머니위키 글의 "의미"를 보는 심사자다. 맞춤법·형식은 다른 검사기가 본다. 너는 뜻만 본다.

입력은 아래 "── 입력 JSON ──" 뒤에 오는 JSON: { article, evidence, keywords }
 · article.heroHook / heroCta   글 상단의 훅 문장과 대형 버튼
 · article.sections[]           소제목(heading) + 본문 첫 문장(firstSentence) + 섹션 버튼(cta)
 · evidence.facts[]             Playwright로 공식 페이지에서 뜯어온 원문(quote)과 값(value)
 · evidence.sourceText[]        같은 페이지의 본문 전문. facts 에 없어도 여기 있으면 근거가 있는 것이다
 · keywords                     네이버 자동완성·연관검색어로 잡은 실제 검색어

다섯 가지만 판정한다.

1. hook-cta — 훅이 약속한 행동과 버튼이 데려가는 화면이 "같은 일"인가.
   낱말이 겹치는 건 근거가 아니다. 개설 안내 글에 증명서 발급 버튼을 달면 ERROR다.
   버튼 문구가 열람형("보기/확인하기/펼쳐 보기/요약표")이면 ERROR다.
2. heading-answer — 소제목이 던진 질문을 그 섹션 첫 문장이 곧바로 답하는가.
   첫 문장이 배경 설명·용어 정의로 시작하면 ERROR다.
3. overclaim — 본문 문장이 evidence 가 말하지 않는 것을 단언하는가.
   반드시 facts 와 sourceText 를 모두 뒤진 뒤에 판정한다. sourceText 에 그 문장이 있으면 근거 있음이다.
   숫자가 맞아도 조건을 빼먹어 "받을 수 있습니다"로 읽히면 오해의 소지 → ERROR다.
   "대부분/사실상/보통" 같은 말로 근거 없이 일반화하면 WARN이다.
4. keyfacts-fit — 핵심콕콕 각 행이 타이틀이 나열한 항목을 답하는가.
   타이틀에 없는 곁가지로 채웠으면 WARN, 타이틀 항목이 통째로 빠졌으면 ERROR다.
5. intent-coverage — keywords가 드러낸 궁금증 중 글이 한 번도 안 답한 게 있는가. WARN.
6. self-contradiction — 글 안에서 문장끼리 어긋나는가.
   훅·요약·핵심콕콕·본문·FAQ 가 같은 사실을 다르게 말하면 ERROR다.
   특히 훅이 조건을 빼고 단정했는데 본문이 조건을 다는 경우를 잡아라.
   (실제 사고: 훅은 "서류 없이 청구한다", 본문은 "미참여 병원은 서류를 떼야 한다")
7. unnatural-korean — 뜻이 통하지 않거나 한국어로 어색한 문장이 있는가. ERROR.
   · 뜻이 안 통하는 표현 — 무엇을 하라는 건지 알 수 없는 문장
     (실제 사고: "서류 없이 바로 넣을 수 있으니 먼저 청구부터 걸어 두시죠")
   · 번역체 — "~에 대해서", "~를 통해", "~할 수 있습니다"의 남발, 주어 없는 수동형
   · AI 양산형 문구 — "중요한 것은", "핵심은", "결론적으로", 뜻 없이 반복되는 대구
   · 책임 주체가 흐린 문장 — 누가 하는 일인지 사라진 문장
   문장이 그럴듯해 보여도 뜻이 안 통하면 잡아라. 이 항목은 문법 교정이 아니라 뜻 검사다.

출력은 JSON 하나뿐. 설명·머리말·코드펜스 금지.
{"findings":[{"severity":"ERROR"|"WARN","rule":"hook-cta"|"heading-answer"|"overclaim"|"keyfacts-fit"|"intent-coverage"|"self-contradiction"|"unnatural-korean","where":"heroHook | q3 | keyFacts[4] 처럼 위치","quote":"문제가 된 문장 그대로","why":"무엇이 왜 어긋났는지 한 문장","fix":"어떻게 고칠지 한 문장"}]}
근거가 확실한 것만 적는다. 트집을 잡으려고 억지로 채우지 않는다. 문제가 없으면 {"findings":[]}.
고쳐 쓴 문장을 돌려주지 마라. 어디가 왜 잘못됐는지만 적는다 — 수정은 사람이 확인한 뒤 따로 한다.`;

function stripTags(s: unknown): string {
  return String(s || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function firstSentence(body: unknown): string {
  const plain = stripTags(body);
  const m = plain.match(/^.*?(습니다|합니다|입니다)[.!?]/);
  return (m ? m[0] : plain.slice(0, 200)).trim();
}

/** 페이지 원문 — 판정자에게 넘길 만큼만 자른다. 출처마다 균등하게 배분한다. */
function trimRaws(raws: any[]): { org: string; url: string; text: string }[] {
  if (!raws.length) return [];
  const TOTAL = 90_000;
  const per = Math.max(4_000, Math.floor(TOTAL / raws.length));
  return raws.map((r: any) => ({
    org: r.org,
    url: r.url,
    text: String(r.text || "").replace(/\s+/g, " ").slice(0, per),
  }));
}

function payloadFor(slug: string) {
  const a = getArticle(slug) as any;
  if (!a) return null;
  const evidPath = path.join(EVID, `${slug}.json`);
  const keywPath = path.join(KEYW, `${slug}.json`);
  const evidence = fs.existsSync(evidPath) ? JSON.parse(fs.readFileSync(evidPath, "utf8")) : null;
  const keywords = fs.existsSync(keywPath) ? JSON.parse(fs.readFileSync(keywPath, "utf8")) : null;

  return {
    article: {
      slug: a.slug,
      title: a.meta?.title ?? "",
      lead: a.searchIntent?.directAnswer ?? "",
      heroHook: a.heroHook ?? "",
      heroCta: a.heroCta
        ? { label: a.heroCta.label, url: a.heroCta.url, org: a.heroCta.org }
        : null,
      keyFacts: a.keyFacts ?? [],
      sections: (a.mainSections ?? []).map((s: any, i: number) => ({
        id: `q${i + 1}`,
        heading: s.heading,
        firstSentence: firstSentence(s.body),
        body: stripTags(s.body).slice(0, 1200),
        cta: s.cta ? { label: s.cta.label, url: s.cta.url } : null,
      })),
      faq: (a.context?.faqList ?? []).map((f: any) => ({
        q: f.question ?? f.q,
        a: stripTags(f.answer ?? f.a).slice(0, 400),
      })),
      summary: a.summary ?? [],
    },
    evidence: evidence
      ? {
          verifiedAt: evidence.verifiedAt,
          facts: (evidence.facts ?? []).map((f: any) => ({
            value: f.value,
            quote: String(f.quote || "").slice(0, 600),
            org: f.org,
          })),
          // facts 는 숫자가 든 문장만 추린 것이다. 조문 열거·정의 문장은 전부 빠진다.
          // 그래서 "1명당 1개의 계좌만 보유할 것"이 원문에 있는데도 근거 없음으로 몰렸다.
          // 페이지 원문(raws)을 함께 넘겨 판정자가 실제 문장을 찾아보게 한다.
          sourceText: trimRaws(evidence.raws ?? []),
        }
      : null,
    keywords,
  };
}

function runClaude(args: string[], input: string): Promise<string> {
  return new Promise((resolve, reject) => {
    // claude 는 Windows 에서 .cmd 라 shell 없이는 ENOENT 가 난다.
    const child = spawn("claude", args, { shell: process.platform === "win32" });
    let out = "";
    let err = "";
    const timer = setTimeout(() => child.kill(), 10 * 60 * 1000);
    child.stdout.on("data", (d) => (out += d));
    child.stderr.on("data", (d) => (err += d));
    child.on("error", reject);
    child.on("close", (code) => {
      clearTimeout(timer);
      if (code !== 0 && !out.trim()) reject(new Error(err.trim().slice(0, 300) || `종료 코드 ${code}`));
      else resolve(out);
    });
    child.stdin.end(input);
  });
}

async function judge(payload: unknown, slug: string) {
  let instructions = RUBRIC;
  if (useImages) {
    const dir = path.join(EVID, slug);
    if (fs.existsSync(dir)) {
      const shots = fs
        .readdirSync(dir)
        .filter((f) => f.endsWith(".png"))
        .slice(0, 6)
        .map((f) => path.join(dir, f));
      if (shots.length) {
        instructions +=
          "\n\n증거 캡처 이미지도 Read 로 열어 본문 수치와 대조하라. 표·수식은 이미지로만 실린다:\n" +
          shots.join("\n");
      }
    }
  }
  // 프롬프트를 argv 로 넘기면 Windows cmd.exe 의 따옴표 처리에서 깨진다.
  // 지시문과 입력 JSON 을 통째로 stdin 에 넣고, argv 는 플래그만 둔다.
  const args = ["-p", "--output-format", "text"];
  if (useImages) args.push("--allowedTools", "Read");
  const raw = (
    await runClaude(args, `${instructions}\n\n── 입력 JSON ──\n${JSON.stringify(payload)}`)
  ).trim();
  const m = raw.match(/\{[\s\S]*\}/);
  if (!m) throw new Error(`판정자 응답을 JSON으로 읽지 못함: ${raw.slice(0, 300)}`);
  return JSON.parse(m[0]);
}

fs.mkdirSync(CACHE, { recursive: true });

/** 판정 한 편. 캐시가 살아 있으면 묻지 않는다. */
async function inspect(slug: string) {
  const payload = payloadFor(slug);
  if (!payload) return { slug, fatal: "articles 에 없는 slug", findings: [] as any[] };

  const hash = createHash("sha1").update(JSON.stringify(payload)).digest("hex").slice(0, 16);
  const cachePath = path.join(CACHE, `${slug}.json`);

  if (!fresh && fs.existsSync(cachePath)) {
    const cached = JSON.parse(fs.readFileSync(cachePath, "utf8"));
    if (cached.hash === hash) return { slug, fatal: null, findings: cached.verdict.findings ?? [] };
  }
  try {
    const verdict = await judge(payload, slug);
    fs.writeFileSync(
      cachePath,
      JSON.stringify({ hash, verdict, at: new Date().toISOString() }, null, 2)
    );
    return { slug, fatal: null, findings: (verdict.findings ?? []) as any[] };
  } catch (e: any) {
    return { slug, fatal: `판정 실패: ${e.message}`, findings: [] as any[] };
  }
}

async function main() {
  // 판정자는 글마다 독립이다. 한 편씩 세우면 30편에 20분이 넘어 아무도 안 돌린다.
  const POOL = 4;
  const results: any[] = new Array(slugs.length);
  let cursor = 0;
  let done = 0;
  await Promise.all(
    Array.from({ length: Math.min(POOL, slugs.length) }, async () => {
      while (cursor < slugs.length) {
        const i = cursor++;
        results[i] = await inspect(slugs[i]);
        done++;
        process.stderr.write(`… ${done}/${slugs.length} 판정 완료\n`);
      }
    })
  );

  let errorCount = 0;
  let warnCount = 0;

  for (const r of results) {
    if (r.fatal) {
      console.error(`❌ ${r.slug} — ${r.fatal}`);
      errorCount++;
      continue;
    }
    const errs = r.findings.filter((f: any) => f.severity === "ERROR");
    errorCount += errs.length;
    warnCount += r.findings.length - errs.length;

    if (!r.findings.length) {
      console.log(`✅ ${r.slug} — 의미 검사 통과`);
      continue;
    }
    console.log(`
  ${errs.length ? "❌" : "⚠️"} ${r.slug}`);
    for (const f of r.findings) {
      console.log(`   ${f.severity === "ERROR" ? "🔴" : "🟡"} [${f.rule}] ${f.where}`);
      if (f.quote) console.log(`      "${String(f.quote).slice(0, 120)}"`);
      console.log(`      ${f.why}`);
      console.log(`      → ${f.fix}`);
    }
  }

  console.log(`
  의미 검사 — 글 ${slugs.length}편 / ERROR ${errorCount} · WARN ${warnCount}`);
  if (errorCount) {
    console.error("의미 검사 실패 — 형태는 맞지만 뜻이 어긋난 자리가 있습니다.");
    process.exit(1);
  }
}

main();
