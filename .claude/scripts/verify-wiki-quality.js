#!/usr/bin/env node
/**
 * 머니위키 전체 품질 검증 스크립트
 * Claude Code Hook으로 Write/Edit 전에 자동 실행
 *
 * 검증 항목:
 * 1. 타이틀: 4-5개 키워드 포함, 32자 이내, 콜론 사용, 명사형
 * 2. 소제목: PAA 자연스러움 ("~란 무엇인가요?" 금지)
 * 3. 내부링크: 3개 이상
 * 4. CTA 버튼: 행동 유도 (action-keywords.md 기준)
 * 5. 수치 오차: critical-facts.json
 */

const fs = require('fs');
const path = require('path');

// stdin에서 데이터 읽기
let inputData = '';

process.stdin.setEncoding('utf8');
process.stdin.on('data', (chunk) => {
  inputData += chunk;
});

process.stdin.on('end', () => {
  try {
    const toolInput = JSON.parse(inputData);
    const filePath = toolInput.file_path || toolInput.filePath || '';
    const content = toolInput.content || '';

    // wiki 파일만 검증
    const normalizedPath = filePath.replace(/\\/g, '/');
    if (!normalizedPath.includes('content/wiki/') || !normalizedPath.endsWith('.md')) {
      process.exit(0);
    }

    const errors = [];
    const warnings = [];

    // Frontmatter 파싱
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (!frontmatterMatch) {
      console.error('⚠️ Frontmatter not found, skipping validation');
      process.exit(0);
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

      // 🔥 콜론 앞 단어 수 검증 (3-4개)
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

    // 🔥 Keywords 개수 검증 (정확히 4개)
    const keywordsMatch = frontmatter.match(/keywords:\s*\n([\s\S]*?)(?=\n[a-z]|\n---|\Z)/);
    if (keywordsMatch) {
      const keywords = keywordsMatch[1]
        .split('\n')
        .filter(line => line.trim().startsWith('-'))
        .map(line => line.trim().replace(/^-\s*["']?/, '').replace(/["']$/, ''));

      if (keywords.length !== 4) {
        errors.push(`Keywords 개수 오류: ${keywords.length}개 (정확히 4개 필요)`);
      }
    } else {
      errors.push('Keywords 필드 없음 (frontmatter에 keywords 필수)');
    }

    // 2. 소제목 검증 (PAA 자연스러움)
    const h2Matches = bodyContent.match(/^## (.+)$/gm);
    if (h2Matches) {
      h2Matches.forEach(h2 => {
        const h2Text = h2.replace(/^## /, '');

        // "~란 무엇인가요?" 패턴 금지
        if (h2Text.match(/란\s*무엇인가요/)) {
          errors.push(`소제목 부자연스러움: "${h2Text}" → "~가 뭔가요?" 또는 "~는 뭔가요?" 사용`);
        }

        // 베이스 키워드 포함 확인 (keywords[0])
        const keywordsMatch = frontmatter.match(/keywords:\s*\n([\s\S]*?)(?=\n[a-z]|\n---|\Z)/);
        if (keywordsMatch) {
          const keywords = keywordsMatch[1]
            .split('\n')
            .filter(line => line.trim().startsWith('-'))
            .map(line => line.trim().replace(/^-\s*["']?/, '').replace(/["']$/, ''));

          if (keywords.length > 0) {
            const baseKeyword = keywords[0];
            if (!h2Text.includes(baseKeyword)) {
              warnings.push(`소제목 "${h2Text}"에 베이스 키워드 "${baseKeyword}" 없음`);
            }
          }
        }
      });
    }

    // 3. 내부링크 검증 (3개 이상)
    const internalLinks = bodyContent.match(/\[([^\]]+)\]\((\/w\/[^\)]+|\/calculators\/[^\)]+)\)/g);
    const internalLinkCount = internalLinks ? internalLinks.length : 0;
    if (internalLinkCount < 3) {
      errors.push(`내부링크 부족: ${internalLinkCount}개 (최소 3개 필요)`);
    }

    // 4. CTA 버튼 검증 (행동 유도)
    const ctaMatch = bodyContent.match(/<span class="ext-btn-cta">(.+?)<\/span>/);
    if (ctaMatch) {
      const ctaText = ctaMatch[1];

      // "바로가기" 단독 사용 금지
      if (ctaText.trim() === '바로가기 →' || ctaText.trim() === '확인하기 →') {
        // OK - 이건 허용
      } else if (ctaText.includes('바로가기') && !ctaText.includes('조회') && !ctaText.includes('신청') && !ctaText.includes('확인')) {
        warnings.push(`CTA 버튼: "${ctaText}" → "조회하기 →", "신청하기 →", "확인하기 →" 등 행동 유도 추천`);
      }
    } else {
      // CTA 버튼 없음
      const hasExtBtn = bodyContent.includes('class="ext-btn');
      if (!hasExtBtn) {
        warnings.push('CTA 버튼 없음 (행동 유도 권장)');
      }
    }

    // 5. 수치 오차 검증 (critical-facts.json)
    const scriptDir = __dirname;
    const factsPath = path.join(scriptDir, '..', 'references', 'critical-facts.json');

    if (fs.existsSync(factsPath)) {
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
              if (hasException) {
                continue;
              }
            }

            errors.push({
              severity: wp.severity || 'warning',
              wrong: wp.wrong,
              correct: wp.correct,
              found: matches[0]
            });
          }
        } catch (regexError) {
          console.error(`⚠️ Regex error for pattern: ${wp.pattern}`);
        }
      }
    }

    // 결과 출력
    const criticalErrors = errors.filter(e => typeof e === 'object' && e.severity === 'critical');
    const structuralErrors = errors.filter(e => typeof e === 'string');

    if (criticalErrors.length > 0 || structuralErrors.length > 0 || warnings.length > 0) {
      console.error('\n');
      console.error('╔══════════════════════════════════════════════════════════╗');
      console.error('║          🚨 머니위키 품질 검증 실패                      ║');
      console.error('╚══════════════════════════════════════════════════════════╝');
      console.error('');

      if (criticalErrors.length > 0) {
        console.error('❌ [수치 오차] 반드시 수정 필요:');
        console.error('');
        for (const err of criticalErrors) {
          console.error(`   틀린 표현: "${err.wrong}"`);
          console.error(`   → 정답: "${err.correct}"`);
          console.error('');
        }
      }

      if (structuralErrors.length > 0) {
        console.error('❌ [구조 오류] 반드시 수정 필요:');
        console.error('');
        for (const err of structuralErrors) {
          console.error(`   ${err}`);
        }
        console.error('');
      }

      if (warnings.length > 0) {
        console.error('⚠️  [경고] 확인 권장:');
        console.error('');
        for (const warn of warnings) {
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

      // critical 오류나 구조 오류가 있으면 차단
      if (criticalErrors.length > 0 || structuralErrors.length > 0) {
        process.exit(1);
      }
    }

    // 성공
    console.log('✅ 머니위키 품질 검증 통과');
    process.exit(0);

  } catch (parseError) {
    console.error('⚠️ Hook input parsing failed, allowing write');
    process.exit(0);
  }
});

// 타임아웃 (5초)
setTimeout(() => {
  console.error('⚠️ Hook timeout, allowing write');
  process.exit(0);
}, 5000);
