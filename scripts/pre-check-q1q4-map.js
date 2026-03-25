#!/usr/bin/env node
/**
 * PreToolUse 훅: Write 전 템플릿 규칙 강제 검증
 * src/app/w/{slug}/page.tsx 파일만 대상
 *
 * ★ 이 훅이 통과 못하면 파일 저장 자체가 안 됨 (exit 2 = 차단)
 *
 * 검증 항목:
 * 1. "use client" 최상단 존재 (없으면 빌드 에러)
 * 2. article-ui import 절대 차단 (빌드 실패 10회+ 원인)
 * 3. Q1-Q4 주석 존재 (품질 필수)
 * 4. useState import 존재 (템플릿 필수 구조)
 * 5. 핵심 자체 정의 컴포넌트 존재 (H2, GreenBox 등)
 * 6. 필수 섹션 존재 (FAQ, References, Sidebar, CTA)
 */
const path = require("path");
const CALC_SLUGS = require(path.join(__dirname, "calc-protected-slugs.json"));

let input = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => { input += chunk; });
process.stdin.on("end", () => {
  try {
    const data = JSON.parse(input);
    const toolInput = data.tool_input || {};
    const filePath = toolInput.file_path || toolInput.path || "";

    // page.tsx 파일만 대상
    if (!filePath.includes("src/app/w/") || !filePath.endsWith("page.tsx")) {
      process.exit(0);
    }

    // 계산기 페이지 제외
    if (CALC_SLUGS.some(s => filePath.includes(`/w/${s}/`))) {
      process.exit(0);
    }

    // Edit(부분 수정)은 전체 구조 체크 불필요 — 단, article-ui import만 체크
    if (toolInput.old_string && toolInput.new_string) {
      const newStr = toolInput.new_string || "";
      if (/from\s+["']@\/components\/article-ui/.test(newStr)) {
        process.stderr.write(`\n🚫 article-ui import 차단!\n`);
        process.stderr.write(`article-ui에서 컴포넌트를 가져오면 props 불일치로 빌드가 터져요.\n`);
        process.stderr.write(`TEMPLATE.tsx처럼 파일 안에서 자체 정의해야 해요.\n`);
        process.exit(2);
      }
      process.exit(0);
    }

    // Write(전체 파일 쓰기) 검증
    const content = toolInput.content || "";
    if (!content) {
      process.exit(0);
    }

    const errors = [];
    const slug = filePath.match(/src\/app\/w\/([^/]+)\/page\.tsx/)?.[1] || filePath;

    // ─── 1. "use client" 최상단 확인 ────────────────────
    if (!/^["']use client["'];?\s*\n/.test(content)) {
      errors.push(`"use client" 없음 → 빌드 에러 (useState 사용 불가)`);
    }

    // ─── 2. article-ui import 절대 차단 ─────────────────
    const articleUiImports = content.match(/import\s+\{[^}]+\}\s+from\s+["']@\/components\/article-ui[^"']*["']/g);
    if (articleUiImports) {
      errors.push(`article-ui에서 import 감지 → 빌드 에러 원인!\n    발견: ${articleUiImports[0]}\n    → TEMPLATE.tsx처럼 파일 안에서 자체 정의해야 해요`);
    }

    // ─── 3. Q1-Q4 주석 존재 ─────────────────────────────
    if (!/\/\/\s*Q1[.:]?\s*.{10,}/.test(content)) errors.push("Q1 주석 없거나 너무 짧음 (10자 이상 필수)");
    if (!/\/\/\s*Q2[.:]?\s*.{10,}/.test(content)) errors.push("Q2 주석 없거나 너무 짧음 (10자 이상 필수)");
    if (!/\/\/\s*Q3[.:]?\s*.{10,}/.test(content)) errors.push("Q3 주석 없거나 너무 짧음 (10자 이상 필수)");
    if (!/\/\/\s*Q4[.:]?\s*.{10,}/.test(content)) errors.push("Q4 주석 없거나 너무 짧음 (10자 이상 필수)");

    // ─── 4. useState import 확인 ────────────────────────
    if (!/import\s*\{\s*useState\s*\}\s*from\s*["']react["']/.test(content)) {
      errors.push("useState import 없음 → 템플릿 필수 구조");
    }

    // ─── 5. 핵심 자체 정의 컴포넌트 확인 ────────────────
    const requiredComponents = ["H2", "GreenBox", "FAQ", "Divider"];
    const missingComponents = requiredComponents.filter(c => {
      // "function ComponentName" 패턴으로 자체 정의 확인
      return !new RegExp(`function\\s+${c}\\s*\\(`).test(content);
    });
    if (missingComponents.length > 0) {
      errors.push(`자체 정의 컴포넌트 누락: ${missingComponents.join(", ")} → TEMPLATE.tsx 참고해서 파일 안에 정의해야 해요`);
    }

    // ─── 6. 필수 섹션 확인 ──────────────────────────────
    if (!/function\s+FAQ\s*\(/.test(content) && !/<FAQ/.test(content)) {
      errors.push("FAQ 섹션 없음 (필수)");
    }
    if (!/function\s+References\s*\(/.test(content) && !/<References/.test(content)) {
      errors.push("References(출처) 섹션 없음 (필수)");
    }
    if (!/function\s+Sidebar\s*\(/.test(content)) {
      errors.push("Sidebar 자체 정의 없음 → TEMPLATE.tsx처럼 파일 안에 Sidebar 컴포넌트 정의 필요");
    }
    if (!/export\s+default\s+function/.test(content)) {
      errors.push("export default function 없음 → 메인 페이지 컴포넌트 필수");
    }

    // ─── 7. H2 최소 개수 확인 ───────────────────────────
    const h2Count = (content.match(/<H2>/g) || []).length;
    if (h2Count < 4) {
      errors.push(`H2 ${h2Count}개 → 최소 4개 필요 (TEMPLATE.tsx는 6개)`);
    }

    // ─── 결과 ───────────────────────────────────────────
    if (errors.length > 0) {
      process.stderr.write(`\n🚫 [${slug}] Write 차단 — 템플릿 규칙 위반!\n`);
      process.stderr.write(`${"─".repeat(50)}\n`);
      errors.forEach((e, i) => process.stderr.write(`  ${i + 1}. ${e}\n`));
      process.stderr.write(`${"─".repeat(50)}\n`);
      process.stderr.write(`\n📋 해결 방법:\n`);
      process.stderr.write(`  1. TEMPLATE.tsx를 먼저 Read로 읽는다\n`);
      process.stderr.write(`  2. 그 구조를 100% 따라서 파일을 만든다\n`);
      process.stderr.write(`  3. article-ui에서 아무것도 import하지 않는다\n`);
      process.stderr.write(`  경로: .claude/skills/article-writing/TEMPLATE.tsx\n\n`);
      process.exit(2);
    }

    process.exit(0);
  } catch {
    process.exit(0);
  }
});
