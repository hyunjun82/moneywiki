#!/usr/bin/env node
/**
 * verify-search-intent.js
 * PostToolUse Hook — 타이틀 키워드와 본문 H2의 검색의도 일치 검증
 *
 * 체크 항목:
 * 1. 타이틀 핵심 키워드가 H2에 반영됐는지
 * 2. 첫 H2가 타이틀 질문에 직접 답하는 구조인지
 * 3. 불필요한 filler 문장 비율
 * 4. 접속사 다양성 (같은 접속사 연속 사용 감지)
 */

const fs = require("fs");
const path = require("path");

// PostToolUse에서 전달되는 stdin JSON
let input = "";
process.stdin.on("data", (d) => (input += d));
process.stdin.on("end", () => {
  try {
    const data = JSON.parse(input);
    const filePath = data?.tool_input?.file_path || data?.tool_input?.path || "";

    // src/app/w/ 경로만 검증
    if (!filePath.includes("src/app/w/") || !filePath.endsWith("page.tsx")) {
      process.exit(0);
    }

    // [slug]/page.tsx에서 slug 추출
    const slugMatch = filePath.match(/src\/app\/w\/([^/]+)\/page\.tsx/);
    if (!slugMatch) process.exit(0);

    const fullPath = path.resolve(filePath);
    if (!fs.existsSync(fullPath)) process.exit(0);

    const content = fs.readFileSync(fullPath, "utf-8");
    const errors = [];
    const warnings = [];

    // === 1. 타이틀 키워드 → H2 반영 체크 ===
    const titleMatch = content.match(
      /style=\{?\{[^}]*fontSize:\s*2[4-8][^}]*\}?\}[^>]*>([^<]+)</
    ) || content.match(/<h1[^>]*>([^<]+)/);

    const h2Matches = [...content.matchAll(/<H2>([^<]+)<\/H2>/g)].map((m) => m[1]);

    if (titleMatch && h2Matches.length > 0) {
      const title = titleMatch[1].trim();
      // 타이틀에서 핵심 키워드 추출 (2글자 이상 단어)
      const titleKeywords = title
        .replace(/[?,!·\-—]/g, " ")
        .split(/\s+/)
        .filter((w) => w.length >= 2)
        .filter((w) => !["에서", "부터", "까지", "그리고", "하는", "받을", "있는", "없는", "어떻게", "얼마나"].includes(w));

      const h2Text = h2Matches.join(" ");
      const matchedKeywords = titleKeywords.filter((kw) => h2Text.includes(kw));
      const matchRate = titleKeywords.length > 0 ? matchedKeywords.length / titleKeywords.length : 1;

      if (matchRate < 0.3 && titleKeywords.length >= 3) {
        warnings.push(
          `[검색의도] 타이틀 키워드 H2 반영률 ${Math.round(matchRate * 100)}% — 타이틀: "${title}" / 미반영: ${titleKeywords.filter((k) => !h2Text.includes(k)).join(", ")}`
        );
      }
    }

    // === 2. 첫 H2가 타이틀 질문에 답하는 구조인지 ===
    if (h2Matches.length > 0 && titleMatch) {
      const title = titleMatch[1].trim();
      const firstH2 = h2Matches[0];

      // 타이틀이 질문형인데 첫 H2가 "~이란", "~개념", "~정의"면 경고
      const isQuestionTitle = /[?？]|얼마|어떻게|방법|조건|가능|할 수/.test(title);
      const isConceptH2 = /이란|개념|정의|의미|역사|배경/.test(firstH2);

      if (isQuestionTitle && isConceptH2) {
        warnings.push(
          `[검색의도] 타이틀이 질문형("${title}")인데 첫 H2가 개념 설명("${firstH2}")이에요. 답을 먼저 주세요.`
        );
      }
    }

    // === 3. filler 문장 비율 체크 ===
    const fillerPatterns = [
      /에 대해 알아/,
      /자세히 살펴/,
      /정리해 ?드릴/,
      /알아보겠/,
      /살펴보겠/,
      /이 글에서는/,
      /이렇게 하면 도움이/,
      /이 점을 꼭 기억/,
      /전문가와 상담하세요/,
      /정확한 금액은 개인마다/,
      /도움이 됐으면/,
      /유용한 정보/,
    ];

    const paragraphs = content.match(/<p[^>]*>([^<]+)<\/p>/g) || [];
    const fillerCount = paragraphs.filter((p) =>
      fillerPatterns.some((pat) => pat.test(p))
    ).length;

    if (paragraphs.length > 0 && fillerCount >= 3) {
      errors.push(
        `[filler] 불필요한 문장 ${fillerCount}개 감지. 정보가 없는 filler 문장 제거 필요.`
      );
    } else if (fillerCount >= 2) {
      warnings.push(
        `[filler] filler 문장 ${fillerCount}개. 줄이면 좋겠어요.`
      );
    }

    // === 4. 접속사 다양성 체크 ===
    const aiSmellConnectors = ["또한", "아울러", "한편", "나아가"];
    const allText = paragraphs.map(p => p.replace(/<[^>]+>/g, "")).join("\n");

    for (const conn of aiSmellConnectors) {
      const regex = new RegExp(conn, "g");
      const matches = allText.match(regex);
      if (matches && matches.length >= 2) {
        warnings.push(
          `[접속사] "${conn}" ${matches.length}회 사용 — AI 냄새 접속사. 다른 표현으로 대체하세요.`
        );
      }
    }

    // 같은 접속사 연속 사용 감지
    const connectorList = ["그런데", "그래서", "따라서", "그러면", "왜냐하면", "다만", "반면", "예를 들어", "특히", "심지어", "물론"];
    const sentences = allText.split(/[.!?]\s*/);
    for (let i = 0; i < sentences.length - 1; i++) {
      for (const conn of connectorList) {
        if (sentences[i].startsWith(conn) && sentences[i + 1] && sentences[i + 1].startsWith(conn)) {
          warnings.push(
            `[접속사] "${conn}" 연속 사용 감지. 다른 접속사로 바꾸세요.`
          );
          break;
        }
      }
    }

    // === 결과 출력 ===
    if (errors.length === 0 && warnings.length === 0) {
      console.log(`✅ 검색의도 PASS — ${slugMatch[1]}`);
      process.exit(0);
    }

    if (errors.length > 0) {
      console.log(`❌ 검색의도 FAIL — ${slugMatch[1]}`);
      errors.forEach((e) => console.log(`  ERROR: ${e}`));
    }
    if (warnings.length > 0) {
      warnings.forEach((w) => console.log(`  ⚠️  ${w}`));
    }

    process.exit(errors.length > 0 ? 1 : 0);
  } catch (e) {
    // stdin 파싱 실패 시 무시
    process.exit(0);
  }
});
