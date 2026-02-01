#!/usr/bin/env node
/**
 * 머니위키 CCTV 품질 검증 스크립트
 *
 * 작동 방식:
 * 1. PreToolUse: stdin에서 content 읽음 → 검증 → 차단
 * 2. PostToolUse: 파일 경로에서 직접 읽음 → 검증 → 실패 시 삭제!
 *
 * 검증 항목:
 * - 타이틀: 3-4개 단어 + 콜론 필수
 * - Keywords: 정확히 4개
 * - 내부링크: 3개 이상
 * - CTA 버튼: 행동 유도
 * - 수치 오차: critical-facts.json
 */

const fs = require('fs');
const path = require('path');

// 검증 함수 (content와 filePath를 받아서 검증)
function validateWikiContent(content, filePath) {
  const errors = [];
  const warnings = [];

  // wiki 파일만 검증
  const normalizedPath = filePath.replace(/\\/g, '/');
  if (!normalizedPath.includes('content/wiki/') || !normalizedPath.endsWith('.md')) {
    return { valid: true, errors: [], warnings: [], skip: true };
  }

  // Frontmatter 파싱
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) {
    return { valid: true, errors: [], warnings: [], skip: true, reason: 'No frontmatter' };
  }

  const frontmatter = frontmatterMatch[1];
  const bodyContent = content.substring(frontmatterMatch[0].length);

  // 1. 타이틀 검증
  const titleMatch = frontmatter.match(/^title:\s*["'](.+)["']/m);
  if (titleMatch) {
    const title = titleMatch[1];

    // 32자 이내
    if (title.length > 32) {
      warnings.push(`타이틀 길이: ${title.length}자 (32자 이내 권장)`);
    }

    // 콜론(:) 사용 여부
    if (!title.includes(':')) {
      errors.push(`타이틀에 콜론(:) 없음: "${title}"`);
    }

    // 콜론 앞 단어 수 검증 (3-4개)
    if (title.includes(':')) {
      const beforeColon = title.split(':')[0].trim();
      const wordCount = beforeColon.split(/\s+/).length;

      if (wordCount < 3 || wordCount > 4) {
        errors.push(
          `타이틀 콜론 앞 단어 수 오류: "${beforeColon}" (${wordCount}개)\n` +
          `   → 3-4개 단어 필요 (예: "퇴직금 세금 공제", "실업급여 지급 기간")`
        );
      }
    }

    // "~란 무엇인가요?", "3단계", "및" 금지 패턴
    if (title.match(/란\s*무엇인가요/)) {
      errors.push(`타이틀에 "~란 무엇인가요?" 패턴 사용 금지: "${title}"`);
    }
    if (title.match(/\d+단계/)) {
      errors.push(`타이틀에 숫자 단계 사용 금지: "${title}"`);
    }
    if (title.includes(' 및 ')) {
      warnings.push(`타이틀에 "및" 사용 (자연스럽지 않을 수 있음): "${title}"`);
    }
  }

  // 2. Keywords 개수 검증 (정확히 4개)
  // YAML 배열 형식: keywords:\n  - A\n  - B
  // JSON 배열 형식: keywords: ["A", "B", "C", "D"]
  let keywords = [];

  // 1) JSON 배열 형식 먼저 시도
  const jsonKeywordsMatch = frontmatter.match(/keywords:\s*\[([^\]]+)\]/);
  if (jsonKeywordsMatch) {
    keywords = jsonKeywordsMatch[1]
      .split(',')
      .map(k => k.trim().replace(/^["']|["']$/g, ''))
      .filter(k => k.length > 0);
  } else {
    // 2) YAML 배열 형식 시도
    const yamlKeywordsMatch = frontmatter.match(/keywords:\s*\n((?:\s*-\s*.+\n?)+)/);
    if (yamlKeywordsMatch) {
      keywords = yamlKeywordsMatch[1]
        .split('\n')
        .filter(line => line.trim().startsWith('-'))
        .map(line => line.trim().replace(/^-\s*["']?/, '').replace(/["']$/g, '').trim())
        .filter(k => k.length > 0);
    }
  }

  if (keywords.length > 0) {
    if (keywords.length !== 4) {
      errors.push(`Keywords 개수 오류: ${keywords.length}개 (정확히 4개 필요)`);
    }
  } else {
    errors.push('Keywords 필드 없음 (frontmatter에 keywords 필수)');
  }

  // keywords를 외부에서도 사용 가능하게 저장
  const parsedKeywords = keywords;

  // 3. 소제목 검증 (PAA 자연스러움)
  const h2Matches = bodyContent.match(/^## (.+)$/gm);
  if (h2Matches) {
    h2Matches.forEach(h2 => {
      const h2Text = h2.replace(/^## /, '');

      // "~란 무엇인가요?" 패턴 금지
      if (h2Text.match(/란\s*무엇인가요/)) {
        errors.push(`소제목 부자연스러움: "${h2Text}" → "~가 뭔가요?" 또는 "~는 뭔가요?" 사용`);
      }

      // 베이스 키워드 포함 확인 (parsedKeywords 사용)
      if (parsedKeywords.length > 0 && h2Text !== '출처' && h2Text !== '관련 문서') {
        const baseKeyword = parsedKeywords[0];
        if (!h2Text.includes(baseKeyword)) {
          warnings.push(`소제목 "${h2Text}"에 베이스 키워드 "${baseKeyword}" 없음`);
        }
      }
    });
  }

  // 4. 내부링크 검증 (3개 이상)
  const internalLinks = bodyContent.match(/\[([^\]]+)\]\((\/w\/[^\)]+|\/calculators\/[^\)]+)\)/g);
  const internalLinkCount = internalLinks ? internalLinks.length : 0;
  if (internalLinkCount < 3) {
    errors.push(`내부링크 부족: ${internalLinkCount}개 (최소 3개 필요)`);
  }

  // 5. CTA 버튼 검증
  const ctaMatch = bodyContent.match(/<span class="ext-btn-cta">(.+?)<\/span>/);
  if (!ctaMatch) {
    const hasExtBtn = bodyContent.includes('class="ext-btn');
    if (!hasExtBtn) {
      errors.push('CTA 버튼 없음 (행동 유도 필수!)');
    }
  }

  // 6. 서론 160자 제한 검증
  const introMatch = bodyContent.match(/^[\s\n]*([^\n]+)/);
  if (introMatch) {
    const intro = introMatch[1].trim();
    if (intro.length > 160) {
      errors.push(`서론 길이 초과: ${intro.length}자 (160자 이내 필수)\n   → "${intro.substring(0, 50)}..."`);
    }
  }

  // 7. 행동 유도 표현 검증 (자연스럽게 녹아있는지)
  const actionPatterns = [
    /해\s*보세요/,
    /하세요/,
    /할\s*수\s*있어요/,
    /하면\s*돼요/,
    /확인.*가능해요/,
    /신청.*가능해요/,
    /조회.*가능해요/,
    /챙겨두/,
    /준비하/,
    /바로\s*(조회|확인|신청)/
  ];
  const hasActionPhrase = actionPatterns.some(p => p.test(bodyContent));
  if (!hasActionPhrase) {
    warnings.push('행동 유도 표현 부족 ("~해보세요", "~할 수 있어요" 등 자연스럽게 추가 권장)');
  }

  // 8. 문제 해결 구체성 검증 (단순 정보 → 실행 가능 정보)
  const solutionPatterns = [
    /방법은?\s*(이래요|이에요|다음과)/,
    /절차는?\s*(이래요|이에요|다음과)/,
    /하면\s*(돼요|됩니다)/,
    /하세요/,
    /준비하세요/,
    /제출하세요/,
    /신청하세요/
  ];
  const hasSolutionContent = solutionPatterns.some(p => p.test(bodyContent));
  if (!hasSolutionContent) {
    warnings.push('실행 가능한 정보 부족 ("~하면 돼요", "~하세요" 등 구체적 해결책 추가 권장)');
  }

  // 9. 각 섹션 충실도 검증 (4문장 이상) - ERROR로 강화
  const sections = bodyContent.split(/^## /gm).slice(1);
  sections.forEach((section) => {
    const sectionTitle = section.split('\n')[0];
    const sectionBody = section.substring(sectionTitle.length);
    const sentences = sectionBody.match(/[^.!?]*[.!?]/g) || [];
    if (sentences.length < 4 && !sectionTitle.includes('출처') && !sectionTitle.includes('관련')) {
      errors.push(`섹션 "${sectionTitle}" 내용 부족: ${sentences.length}문장 (최소 4문장 필수!)`);
    }
  });

  // 10. 이탈 방지 - 완전성 검증 (대형사이트 대비)
  const completenessChecks = {
    hasHowTo: /어떻게|방법|절차|순서/i.test(bodyContent),
    hasCondition: /조건|자격|대상|요건/i.test(bodyContent),
    hasAmount: /금액|얼마|비용|수수료|\d+원|\d+만원/i.test(bodyContent),
    hasDeadline: /기한|언제|기간|마감/i.test(bodyContent),
    hasSource: /출처|참고|근거|법령/i.test(bodyContent)
  };

  const missingInfo = [];
  if (!completenessChecks.hasHowTo) missingInfo.push('"방법/절차"');
  if (!completenessChecks.hasCondition) missingInfo.push('"조건/자격"');
  if (!completenessChecks.hasAmount) missingInfo.push('"금액/비용"');
  if (!completenessChecks.hasDeadline) missingInfo.push('"기한/기간"');

  if (missingInfo.length >= 2) {
    warnings.push(`완전성 부족: ${missingInfo.join(', ')} 정보 없음 (이탈 방지 필요)`);
  }

  // 11. 내부링크 다양성 검증 (관련 글 연결 = 이탈 방지)
  if (internalLinkCount >= 3) {
    const uniqueLinks = new Set(internalLinks.map(l => l.match(/\(([^)]+)\)/)[1]));
    if (uniqueLinks.size < 3) {
      warnings.push('내부링크 다양성 부족: 서로 다른 글 3개 이상 연결 권장');
    }
  }

  // 6. 수치 오차 검증 (critical-facts.json)
  const scriptDir = __dirname;
  const factsPath = path.join(scriptDir, '..', 'references', 'critical-facts.json');

  if (fs.existsSync(factsPath)) {
    try {
      const facts = JSON.parse(fs.readFileSync(factsPath, 'utf8'));

      for (const wp of facts.wrongPatterns) {
        try {
          const regex = new RegExp(wp.pattern, 'gi');
          const matches = content.match(regex);

          if (matches && matches.length > 0) {
            // 예외 조건 확인
            if (wp.exception) {
              let hasException = false;
              for (const match of matches) {
                const matchIndex = content.indexOf(match);
                const surroundingText = content.substring(
                  Math.max(0, matchIndex - 100),
                  Math.min(content.length, matchIndex + match.length + 100)
                );
                if (surroundingText.includes(wp.exception)) {
                  hasException = true;
                  break;
                }
              }
              if (hasException) continue;
            }

            errors.push({
              severity: wp.severity || 'warning',
              wrong: wp.wrong,
              correct: wp.correct,
              found: matches[0]
            });
          }
        } catch (regexError) {
          // Skip invalid regex
        }
      }
    } catch (e) {
      // Skip if facts file is invalid
    }
  }

  const criticalErrors = errors.filter(e => typeof e === 'object' && e.severity === 'critical');
  const structuralErrors = errors.filter(e => typeof e === 'string');

  return {
    valid: criticalErrors.length === 0 && structuralErrors.length === 0,
    criticalErrors,
    structuralErrors,
    warnings
  };
}

// 결과 출력 함수
function printResults(result, filePath) {
  if (result.skip) {
    console.log('✅ 검증 스킵 (wiki 파일 아님)');
    return;
  }

  if (!result.valid || result.warnings.length > 0) {
    console.error('\n');
    console.error('╔══════════════════════════════════════════════════════════╗');
    console.error('║          🚨 머니위키 CCTV 품질 검증                       ║');
    console.error('╚══════════════════════════════════════════════════════════╝');
    console.error(`📁 파일: ${filePath}`);
    console.error('');

    if (result.criticalErrors && result.criticalErrors.length > 0) {
      console.error('❌ [수치 오차] 반드시 수정 필요:');
      console.error('');
      for (const err of result.criticalErrors) {
        console.error(`   틀린 표현: "${err.wrong}"`);
        console.error(`   → 정답: "${err.correct}"`);
        console.error('');
      }
    }

    if (result.structuralErrors && result.structuralErrors.length > 0) {
      console.error('❌ [구조 오류] 반드시 수정 필요:');
      console.error('');
      for (const err of result.structuralErrors) {
        console.error(`   ${err}`);
      }
      console.error('');
    }

    if (result.warnings && result.warnings.length > 0) {
      console.error('⚠️  [경고] 확인 권장:');
      console.error('');
      for (const warn of result.warnings) {
        console.error(`   ${warn}`);
      }
      console.error('');
    }

    console.error('────────────────────────────────────────────────────────────');
    console.error('📌 참고:');
    console.error('   - .claude/references/keyword-skill.md (타이틀 규칙)');
    console.error('   - .claude/references/action-keywords.md (CTA 버튼)');
    console.error('   - .claude/references/critical-facts.json (수치 정확성)');
    console.error('────────────────────────────────────────────────────────────');
    console.error('');
  }

  if (result.valid) {
    console.log('✅ 머니위키 품질 검증 통과');
  }
}

// ============================================
// 메인 로직: stdin 또는 파일에서 읽기
// ============================================

let inputData = '';
let stdinTimeout = null;

// stdin 읽기 시도 (PreToolUse용)
process.stdin.setEncoding('utf8');
process.stdin.on('data', (chunk) => {
  inputData += chunk;
  // 데이터가 들어오면 타임아웃 취소
  if (stdinTimeout) clearTimeout(stdinTimeout);
});

process.stdin.on('end', () => {
  if (stdinTimeout) clearTimeout(stdinTimeout);

  if (inputData.trim()) {
    // stdin에서 데이터를 받음 (PreToolUse)
    try {
      const toolInput = JSON.parse(inputData);
      const filePath = toolInput.file_path || toolInput.filePath || '';
      const content = toolInput.content || '';

      const result = validateWikiContent(content, filePath);
      printResults(result, filePath);

      if (!result.valid) {
        process.exit(1); // 차단
      }
      process.exit(0);
    } catch (parseError) {
      console.error('⚠️ stdin JSON 파싱 실패');
      process.exit(0);
    }
  } else {
    // stdin이 비어있음 - 명령줄 인자 확인 (PostToolUse)
    handlePostToolUse();
  }
});

// 500ms 후에도 stdin 데이터가 없으면 PostToolUse로 처리
stdinTimeout = setTimeout(() => {
  if (!inputData.trim()) {
    process.stdin.destroy();
    handlePostToolUse();
  }
}, 500);

// PostToolUse 처리: 환경변수 또는 파일 직접 읽기
function handlePostToolUse() {
  // Claude Code PostToolUse는 환경변수로 정보 전달
  const filePath = process.env.CLAUDE_FILE_PATH || process.argv[2];

  if (!filePath) {
    console.log('✅ 검증 스킵 (파일 경로 없음)');
    process.exit(0);
  }

  // 파일 직접 읽기
  const absolutePath = path.resolve(filePath);

  if (!fs.existsSync(absolutePath)) {
    console.log('✅ 검증 스킵 (파일 없음)');
    process.exit(0);
  }

  try {
    const content = fs.readFileSync(absolutePath, 'utf8');
    const result = validateWikiContent(content, absolutePath);
    printResults(result, absolutePath);

    if (!result.valid) {
      // 🚨 CCTV 작동: 유효하지 않은 파일 삭제!
      console.error('');
      console.error('🚨 CCTV 작동: 검증 실패한 파일 삭제됨!');
      console.error(`   삭제된 파일: ${absolutePath}`);
      console.error('   → 오류 수정 후 다시 작성하세요.');
      console.error('');

      fs.unlinkSync(absolutePath);
      process.exit(1);
    }

    process.exit(0);
  } catch (readError) {
    console.error(`⚠️ 파일 읽기 실패: ${readError.message}`);
    process.exit(0);
  }
}

// 전체 타임아웃 (10초)
setTimeout(() => {
  console.error('⚠️ 검증 타임아웃');
  process.exit(0);
}, 10000);
