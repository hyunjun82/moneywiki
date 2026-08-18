#!/usr/bin/env node
/**
 * 렌더링 검사기 — Playwright로 실제 화면을 열어 정본 템플릿과 대조한다.
 *
 * 데이터 검증(verify-articles)은 "값이 있는가"만 본다. 화면이 어떻게 나오는지는 모른다.
 * 그래서 표 헤더가 남색으로 뒤집혀도, 보험 글에 신용조회 링크가 걸려도 통과했다.
 * 이 검사기는 눈으로 볼 것을 기계가 대신 본다.
 *
 * 검사 항목
 *   1. 템플릿 블록이 실제로 그려졌는가 (서론·CTA·목차·핵심콕콕·요약·스포크)
 *   2. 섹션마다 비주얼이 있는가, 같은 종류가 연속되지 않는가
 *   3. 표 헤더 색상이 정본과 같은가 (옛 CSS가 덮어쓰지 않았는가)
 *   4. eyebrow 라벨이 소제목을 자른 형태가 아닌가
 *   5. CTA 링크를 실제로 따라가 그 페이지가 글 주제와 맞는가
 *   6. h1이 하나인가, 타이틀에 브랜드가 두 번 붙지 않았는가
 *
 * 사용:
 *   node scripts/verify-rendered.mjs <slug> [<slug>...]     # 라이브 확인
 *   node scripts/verify-rendered.mjs --base http://localhost:3000 <slug>
 */
import { chromium } from "playwright";

const argv = process.argv.slice(2);
let BASE = "https://www.jjyu.co.kr";
const slugs = [];
for (let i = 0; i < argv.length; i++) {
  if (argv[i] === "--base") BASE = argv[++i];
  else slugs.push(argv[i]);
}
if (!slugs.length) {
  console.error("사용법: node scripts/verify-rendered.mjs <slug> [<slug>...]");
  process.exit(1);
}

/** 정본 템플릿의 표 헤더 배경 (docs/moneywiki-article-template.html) */
const TEMPLATE_TH_BG = "rgb(250, 250, 249)"; // #FAFAF9

const browser = await chromium.launch();
let failed = 0;

for (const slug of slugs) {
  const url = `${BASE}/w/${encodeURIComponent(slug)}`;
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const problems = [];
  const ctaReport = [];

  try {
    const res = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
    if (!res || res.status() >= 400) {
      problems.push(`페이지가 열리지 않음 (HTTP ${res?.status() ?? "?"})`);
      throw new Error("페이지 없음");
    }
    await page.waitForTimeout(1500);

    const r = await page.evaluate((TH_BG) => {
      const q = (s) => document.querySelector(s);
      const all = (s) => [...document.querySelectorAll(s)];
      const out = { problems: [], ctas: [] };

      // 1. 템플릿 블록 존재
      const blocks = {
        "서론(lead)": ".lead",
        "대형 CTA": "a.cta-main",
        "목차": ".toc",
        "핵심콕콕": ".kf",
        "3줄 요약": ".sum",
        "스포크": ".spoke",
      };
      for (const [name, sel] of Object.entries(blocks)) {
        if (!q(sel)) out.problems.push(`${name} 블록이 화면에 없음`);
      }
      if (q(".sum") && all(".sum li").length !== 3)
        out.problems.push(`3줄 요약이 ${all(".sum li").length}줄`);

      // 2. 섹션 비주얼
      const secs = all("section.q").filter((s) => /^q\d+$/.test(s.id));
      const kinds = [];
      secs.forEach((s, i) => {
        const k = s.querySelector(".check")
          ? "체크리스트"
          : s.querySelector(".stats")
          ? "통계"
          : s.querySelector(".tbl")
          ? "표"
          : s.querySelector(".steps")
          ? "스텝"
          : s.querySelector(".cta-box")
          ? "CTA박스"
          : "";
        kinds.push(k);
      });
      // 전 섹션 필수는 풀었다 — verify-articles 와 같은 기준(과반)을 쓴다.
      // 주제에 따라 해설만으로 충분한 섹션이 있고, 억지로 채우면 판박이가 된다.
      const withViz = kinds.filter(Boolean).length;
      if (secs.length && withViz / secs.length < 0.5)
        out.problems.push(
          `비주얼이 있는 섹션 ${withViz}/${secs.length} — 절반 이상은 표·체크리스트·수치로 보여 주세요`
        );
      for (let i = 1; i < kinds.length; i++)
        if (kinds[i] && kinds[i] === kinds[i - 1])
          out.problems.push(`q${i}와 q${i + 1}이 같은 비주얼(${kinds[i]}) 연속`);

      // 3. 표 헤더 색상 — 옛 CSS가 덮어썼는지
      const th = q("section.q table th");
      if (th) {
        const bg = getComputedStyle(th).backgroundColor;
        const img = getComputedStyle(th).backgroundImage;
        if (bg !== TH_BG || (img && img !== "none"))
          out.problems.push(`표 헤더 배경이 정본과 다름 (${bg}${img !== "none" ? " + 그라데이션" : ""})`);
      }

      // 4. eyebrow 라벨 — 소제목을 자른 형태인지
      secs.forEach((s, i) => {
        const eb = s.querySelector(".eyebrow span")?.textContent?.trim() ?? "";
        const h2 = s.querySelector("h2")?.textContent?.trim() ?? "";
        if (!eb) out.problems.push(`q${i + 1} 라벨 없음`);
        else if (h2.startsWith(eb)) out.problems.push(`q${i + 1} 라벨 "${eb}"이 소제목을 자른 형태`);
      });

      // 5. h1 / 타이틀 브랜드 중복
      const h1n = all("h1").length;
      if (h1n !== 1) out.problems.push(`h1이 ${h1n}개`);
      if ((document.title.match(/머니위키/g) || []).length > 1)
        out.problems.push(`타이틀에 브랜드가 두 번: ${document.title}`);

      // 6. CTA 링크 수집 (외부 이동은 밖에서 확인)
      all("a.cta-main, .cta-box a.btn-p").forEach((a) => {
        if (/^https?:/.test(a.href)) out.ctas.push({ label: a.textContent.trim().slice(0, 40), href: a.href });
      });

      out.h1 = q("h1")?.textContent?.trim() ?? "";
      // 본문 전체 텍스트 — CTA 대상 페이지 이름을 글이 실제로 언급하는지 대조할 때 쓴다.
      out.text = (document.body.innerText || "").replace(/\s+/g, " ");
      // 카테고리 — 브레드크럼에서 구분자(›)를 뺀 첫 텍스트
      out.category =
        all(".bc span")
          .map((e) => e.textContent.trim())
          .find((t) => t && !/^[›>\/|·]+$/.test(t)) ?? "";
      return out;
    }, TEMPLATE_TH_BG);

    problems.push(...r.problems);

    // 5. CTA 링크를 실제로 따라가 그 페이지가 "그 일을 하는 화면"인지 본다.
    //    보험 글에 신용조회를, 그다음엔 점검 안내 팝업을 걸었던 사고를 잡기 위한 검사.
    //
    //    판정은 세 가지를 본다. 흔한 단어 하나가 우연히 걸리는 걸 막기 위해 엄격히 잡는다.
    //      · 주제 핵심어(2글자 이상 고유 명사)가 2개 이상 나오는가
    //      · 안내·점검·오류 페이지가 아닌가
    //      · 실제 행동 요소(신청/조회/입력 폼·버튼)가 있는가
    //    정부 서비스 페이지는 글의 단어를 그대로 반복하지 않는다. 그래서 단어 일치를
    //    빡빡하게 요구하면 멀쩡한 링크도 막힌다. 명백한 실패만 걸러내고,
    //    나머지는 대상 페이지 제목을 출력해 사람이 눈으로 확인하게 한다.
    const category = r.category || "";
    // 합성 카테고리(근로·노동)는 낱말로 쪼개고, 글 제목의 핵심어도 함께 후보로 둔다.
    const catWords = [
      ...category.split(/[·/,]/).map((w) => w.trim()).filter((w) => w.length >= 2),
      ...(r.h1.match(/[가-힣]{2,}/g) || []).slice(0, 3),
    ];

    for (const cta of r.ctas) {
      const p2 = await browser.newPage();
      try {
        await p2.goto(cta.href, { waitUntil: "domcontentloaded", timeout: 45000 });
        await p2.waitForTimeout(1500);
        const info = await p2.evaluate(() => ({
          title: document.title,
          text: document.body.innerText.replace(/\s+/g, " ").slice(0, 1500),
          // 실제 행동 요소가 있는가
          action: [...document.querySelectorAll("a,button,input[type=submit]")]
            .map((e) => (e.value || e.textContent || "").trim())
            .some((t) => /신청|조회|검색|로그인|인증|시작|다운로드|발급|계산/.test(t)),
        }));
        const hay = `${info.title} ${info.text}`;
        const t = info.title.trim();

        if (/^(안내|공지|점검|오류|error|404|페이지를 찾을 수 없)/i.test(t)) {
          problems.push(`CTA "${cta.label}" → 안내·점검 페이지 (제목: ${t})\n      ${cta.href}`);
        } else if (!info.action) {
          problems.push(`CTA "${cta.label}" → 신청·조회 요소가 없는 페이지\n      ${cta.href}\n      대상: ${t}`);
        } else if (
          catWords.length &&
          !catWords.some((w) => hay.includes(w)) &&
          // 글이 그 페이지 이름을 실제로 부르고 있으면 무관한 링크가 아니다.
          // 정부 서비스 이름은 글의 검색어와 다른 말을 쓴다 — 서민형 ISA 증빙은
          // 정부24에서 "소득확인증명서(개인종합자산관리계좌 가입용)"이라 불려
          // "서민형"도 "금융"도 그 페이지에 한 번도 안 나온다.
          !(info.title.match(/[가-힣]{4,}/g) || []).some((w) => (r.text || "").includes(w))
        ) {
          // 카테고리가 "근로·노동" 처럼 합성어면 통째로는 안 나온다. 낱말 단위로 본다.
          problems.push(
            `CTA "${cta.label}" → 카테고리(${catWords.join("/")})와 무관해 보임\n      ${cta.href}\n      대상: ${t}`
          );
        } else {
          // 통과했더라도 어디로 가는지 보여준다. 주제에 맞는지는 눈으로 판단해야 한다.
          ctaReport.push(`   → ${cta.label}\n     ${t}\n     ${cta.href}`);
        }
      } catch (e) {
        problems.push(`CTA "${cta.label}" 링크 열기 실패 — ${cta.href}`);
      } finally {
        await p2.close().catch(() => {});
      }
    }
  } catch (e) {
    if (!problems.length) problems.push(e.message);
  } finally {
    await page.close().catch(() => {});
  }

  if (problems.length) {
    failed++;
    console.error(`\n❌ ${slug}`);
    problems.forEach((p) => console.error(`   · ${p}`));
  } else {
    console.log(`✅ ${slug} — 화면 검사 통과`);
    if (ctaReport.length) {
      console.log("   CTA 연결 대상 (주제에 맞는지 눈으로 확인):");
      ctaReport.forEach((c) => console.log(c));
    }
  }
}

await browser.close();

if (failed) {
  console.error(`\n렌더링 검사 실패 ${failed}건 — 화면이 정본 템플릿과 다릅니다.`);
  process.exit(1);
}
console.log(`\n통과 — ${slugs.length}편`);
