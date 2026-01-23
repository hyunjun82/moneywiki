/**
 * 위키 글 검증 스크립트
 *
 * 검증 항목:
 * 1. Keywords 4개가 모두 H2에 포함되어 있는가?
 * 2. H2가 "뭐예요?" 패턴이 아닌가? (문제 해결형인가?)
 * 3. 액션 버튼이 홈페이지가 아닌 실제 행동 페이지인가?
 * 4. 내부링크 3개 이상인가?
 * 5. 각 섹션 4문장 이상인가?
 *
 * 사용법:
 * npx ts-node scripts/validate-wiki-article.ts content/wiki/퇴직금-미지급-신고-지연이자-받는법.md
 */

import * as fs from 'fs';
import * as path from 'path';

interface ValidationResult {
  passed: boolean;
  errors: string[];
  warnings: string[];
  score: number;
}

interface FrontmatterData {
  title?: string;
  keywords?: string[];
  description?: string;
  faq?: Array<{ question: string; answer: string }>;
  summary?: string[];
  author?: string;
}

// 금지 H2 패턴 (개념 설명형)
const FORBIDDEN_H2_PATTERNS = [
  /뭐예요\??$/,
  /뭔가요\??$/,
  /무엇인가요\??$/,
  /정확히 뭐예요\??$/,
  /이란\??$/,
  /이란 무엇/,
  /란\?$/,
  /정의$/,
  /개념$/,
];

// 홈페이지 URL 패턴 (실제 행동 페이지가 아님)
const HOMEPAGE_PATTERNS = [
  /^https?:\/\/www\.moel\.go\.kr\/?$/,
  /^https?:\/\/www\.nts\.go\.kr\/?$/,
  /^https?:\/\/www\.comwel\.or\.kr\/?$/,
  /^https?:\/\/www\.nps\.or\.kr\/?$/,
  /^https?:\/\/www\.hometax\.go\.kr\/?$/,
];

// 권장 액션 페이지 패턴
const ACTION_PAGE_PATTERNS = [
  /minwon\.moel\.go\.kr/,
  /\/calculators\//,
  /\/form\.do/,
  /\/apply/,
  /\/download/,
];

/**
 * Frontmatter 파싱
 */
function parseFrontmatter(content: string): FrontmatterData {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};

  const yaml = match[1];
  const data: FrontmatterData = {};

  // 간단한 YAML 파싱
  const titleMatch = yaml.match(/title:\s*"([^"]+)"/);
  if (titleMatch) data.title = titleMatch[1];

  const descMatch = yaml.match(/description:\s*"([^"]+)"/);
  if (descMatch) data.description = descMatch[1];

  const authorMatch = yaml.match(/author:\s*"([^"]+)"/);
  if (authorMatch) data.author = authorMatch[1];

  // Keywords 배열 파싱
  const keywordsMatch = yaml.match(/keywords:\s*\n((?:\s+-\s+.+\n?)+)/);
  if (keywordsMatch) {
    data.keywords = keywordsMatch[1]
      .split('\n')
      .filter(line => line.trim().startsWith('-'))
      .map(line => line.replace(/^\s*-\s*/, '').trim());
  }

  // Summary 배열 파싱
  const summaryMatch = yaml.match(/summary:\s*\n((?:\s+-\s+"[^"]+"\n?)+)/);
  if (summaryMatch) {
    data.summary = summaryMatch[1]
      .split('\n')
      .filter(line => line.trim().startsWith('-'))
      .map(line => line.replace(/^\s*-\s*"/, '').replace(/"$/, '').trim());
  }

  // FAQ 파싱 (간단 버전)
  const faqSection = yaml.match(/faq:\s*\n([\s\S]*?)(?=\n\w|$)/);
  if (faqSection) {
    const questions = faqSection[1].match(/question:\s*"([^"]+)"/g) || [];
    const answers = faqSection[1].match(/answer:\s*"([^"]+)"/g) || [];
    data.faq = questions.map((q, i) => ({
      question: q.replace(/question:\s*"/, '').replace(/"$/, ''),
      answer: answers[i]?.replace(/answer:\s*"/, '').replace(/"$/, '') || ''
    }));
  }

  return data;
}

/**
 * H2 헤딩 추출
 */
function extractH2Headings(content: string): string[] {
  const bodyMatch = content.match(/---\n[\s\S]*?\n---\n([\s\S]*)/);
  if (!bodyMatch) return [];

  const body = bodyMatch[1];
  const h2Matches = body.match(/^## .+$/gm) || [];
  return h2Matches.map(h => h.replace(/^## /, ''));
}

/**
 * 외부 링크 추출
 */
function extractExternalLinks(content: string): string[] {
  const linkMatches = content.match(/\]\(https?:\/\/[^)]+\)/g) || [];
  return linkMatches.map(l => l.replace(/^\]\(/, '').replace(/\)$/, ''));
}

/**
 * 내부 링크 추출
 */
function extractInternalLinks(content: string): string[] {
  const linkMatches = content.match(/\]\(\/[^)]+\)/g) || [];
  return linkMatches.map(l => l.replace(/^\]\(/, '').replace(/\)$/, ''));
}

/**
 * 섹션별 문장 수 계산
 */
function countSentencesPerSection(content: string): Record<string, number> {
  const bodyMatch = content.match(/---\n[\s\S]*?\n---\n([\s\S]*)/);
  if (!bodyMatch) return {};

  const body = bodyMatch[1];
  const sections = body.split(/^## /gm).slice(1);

  const result: Record<string, number> = {};
  sections.forEach(section => {
    const lines = section.split('\n');
    const title = lines[0].trim();
    const text = lines.slice(1).join('\n');
    // 문장 수 계산 (마침표, 물음표, 느낌표 기준)
    const sentences = text.split(/[.?!]\s+/).filter(s => s.trim().length > 10);
    result[title] = sentences.length;
  });

  return result;
}

/**
 * 메인 검증 함수
 */
export function validateWikiArticle(filePath: string): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!fs.existsSync(filePath)) {
    return { passed: false, errors: ['파일을 찾을 수 없습니다.'], warnings: [], score: 0 };
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const frontmatter = parseFrontmatter(content);
  const h2Headings = extractH2Headings(content);
  const externalLinks = extractExternalLinks(content);
  const internalLinks = extractInternalLinks(content);
  const sentenceCounts = countSentencesPerSection(content);

  // 1. Keywords 검증 (4개)
  if (!frontmatter.keywords || frontmatter.keywords.length === 0) {
    errors.push('❌ keywords가 없습니다.');
  } else if (frontmatter.keywords.length < 4) {
    errors.push(`❌ keywords ${frontmatter.keywords.length}개 (최소 4개 필요)`);
  } else if (frontmatter.keywords.length > 5) {
    warnings.push(`⚠️ keywords ${frontmatter.keywords.length}개 (4-5개 권장)`);
  }

  // 2. Keywords ↔ H2 매칭 검증
  if (frontmatter.keywords && frontmatter.keywords.length > 0) {
    const keywordBase = frontmatter.keywords[0]; // 베이스 키워드
    const h2Text = h2Headings.join(' ');

    let keywordInH2Count = 0;
    frontmatter.keywords.forEach(keyword => {
      // 키워드의 핵심 단어가 H2에 포함되어 있는지 확인
      const keywordParts = keyword.split(' ');
      const hasMatch = keywordParts.some(part =>
        part.length > 1 && h2Text.includes(part)
      );
      if (hasMatch) keywordInH2Count++;
    });

    if (keywordInH2Count < 2) {
      errors.push(`❌ Keywords가 H2에 충분히 반영되지 않음 (${keywordInH2Count}/${frontmatter.keywords.length})`);
    } else if (keywordInH2Count < frontmatter.keywords.length) {
      warnings.push(`⚠️ Keywords 일부만 H2에 반영됨 (${keywordInH2Count}/${frontmatter.keywords.length})`);
    }
  }

  // 3. H2 패턴 검증 (개념 설명형 금지)
  h2Headings.forEach(h2 => {
    FORBIDDEN_H2_PATTERNS.forEach(pattern => {
      if (pattern.test(h2)) {
        errors.push(`❌ H2 개념 설명형 패턴 발견: "${h2}"`);
      }
    });
  });

  // 4. 외부 링크 검증 (홈페이지 금지)
  externalLinks.forEach(link => {
    HOMEPAGE_PATTERNS.forEach(pattern => {
      if (pattern.test(link)) {
        errors.push(`❌ 홈페이지 링크 발견 (실제 행동 페이지 필요): ${link}`);
      }
    });
  });

  // 액션 페이지 확인
  const hasActionPage = externalLinks.some(link =>
    ACTION_PAGE_PATTERNS.some(pattern => pattern.test(link))
  );
  if (!hasActionPage && externalLinks.length > 0) {
    warnings.push('⚠️ 실제 행동 페이지(신청, 다운로드 등)가 없습니다.');
  }

  // 5. 내부 링크 검증 (3개 이상)
  if (internalLinks.length < 3) {
    errors.push(`❌ 내부링크 ${internalLinks.length}개 (최소 3개 필요)`);
  }

  // 6. 섹션 문장 수 검증 (4문장 이상)
  Object.entries(sentenceCounts).forEach(([section, count]) => {
    if (count < 4 && !section.includes('출처') && !section.includes('관련')) {
      warnings.push(`⚠️ 섹션 "${section}" 문장 부족 (${count}문장, 4문장 이상 권장)`);
    }
  });

  // 7. Frontmatter 필수 필드 검증
  if (!frontmatter.author) {
    errors.push('❌ author 필드 누락');
  } else if (frontmatter.author !== '머니위키 에디터') {
    warnings.push(`⚠️ author가 "머니위키 에디터"가 아님: "${frontmatter.author}"`);
  }

  if (!frontmatter.description) {
    errors.push('❌ description 필드 누락');
  } else if (frontmatter.description.includes('알아봅니다')) {
    errors.push('❌ description에 "알아봅니다" 사용 금지');
  }

  if (!frontmatter.summary || frontmatter.summary.length < 3) {
    warnings.push('⚠️ summary 3줄 미만');
  }

  if (!frontmatter.faq || frontmatter.faq.length < 3) {
    warnings.push('⚠️ FAQ 3개 미만');
  }

  // 점수 계산
  const totalChecks = 10;
  const errorWeight = 10;
  const warningWeight = 2;
  const deduction = (errors.length * errorWeight) + (warnings.length * warningWeight);
  const score = Math.max(0, 100 - deduction);

  return {
    passed: errors.length === 0,
    errors,
    warnings,
    score
  };
}

/**
 * 결과 출력
 */
function printResult(result: ValidationResult, filePath: string): void {
  const filename = path.basename(filePath);

  console.log('\n' + '='.repeat(60));
  console.log(`📄 검증 결과: ${filename}`);
  console.log('='.repeat(60));

  if (result.passed) {
    console.log('\n✅ 검증 통과! (점수: ' + result.score + '/100)\n');
  } else {
    console.log('\n❌ 검증 실패 (점수: ' + result.score + '/100)\n');
  }

  if (result.errors.length > 0) {
    console.log('🚨 오류:');
    result.errors.forEach(e => console.log('  ' + e));
    console.log('');
  }

  if (result.warnings.length > 0) {
    console.log('⚠️ 경고:');
    result.warnings.forEach(w => console.log('  ' + w));
    console.log('');
  }

  // 수정 가이드
  if (!result.passed) {
    console.log('📝 수정 가이드:');
    if (result.errors.some(e => e.includes('H2 개념 설명형'))) {
      console.log('  - H2를 문제 해결형으로 변경: "~뭐예요?" → "~방법 노동청"');
    }
    if (result.errors.some(e => e.includes('홈페이지 링크'))) {
      console.log('  - 홈페이지 대신 실제 행동 페이지 링크 사용');
    }
    if (result.errors.some(e => e.includes('Keywords'))) {
      console.log('  - Keywords 4개 작성 (베이스 반복 패턴)');
    }
    if (result.errors.some(e => e.includes('내부링크'))) {
      console.log('  - 관련 위키 문서 내부링크 3개 이상 추가');
    }
    console.log('');
  }

  console.log('='.repeat(60));
}

// CLI 실행
if (process.argv[1]?.includes('validate-wiki-article')) {
  const args = process.argv.slice(2);

  if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
    console.log(`
위키 글 검증 스크립트

사용법:
  npx ts-node scripts/validate-wiki-article.ts <파일경로>
  npx ts-node scripts/validate-wiki-article.ts content/wiki/*.md  (여러 파일)

예시:
  npx ts-node scripts/validate-wiki-article.ts content/wiki/퇴직금-미지급-신고-지연이자-받는법.md

검증 항목:
  1. Keywords 4개 이상
  2. Keywords ↔ H2 매칭
  3. H2 개념 설명형 패턴 금지
  4. 홈페이지 링크 금지 (실제 행동 페이지 필요)
  5. 내부링크 3개 이상
  6. 섹션당 4문장 이상
  7. Frontmatter 필수 필드
`);
    process.exit(0);
  }

  // 파일 검증
  args.forEach(filePath => {
    const absolutePath = path.isAbsolute(filePath)
      ? filePath
      : path.join(process.cwd(), filePath);

    if (fs.existsSync(absolutePath)) {
      const result = validateWikiArticle(absolutePath);
      printResult(result, absolutePath);
    } else {
      console.log(`\n❌ 파일을 찾을 수 없습니다: ${filePath}`);
    }
  });
}
