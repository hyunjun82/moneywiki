#!/usr/bin/env node
/**
 * 머니위키 수치 검증 스크립트
 * Claude Code Hook으로 Write/Edit 전에 자동 실행
 *
 * 작동 방식:
 * 1. stdin으로 tool input 받음 (file_path, content)
 * 2. wiki 파일인지 확인
 * 3. critical-facts.json의 오류 패턴과 대조
 * 4. 오류 발견 → exit(1) → Write 차단
 * 5. 오류 없음 → exit(0) → Write 허용
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
    // Tool input 파싱
    const toolInput = JSON.parse(inputData);
    const filePath = toolInput.file_path || toolInput.filePath || '';
    const content = toolInput.content || '';

    // wiki 파일만 검증 (content/wiki/*.md)
    const normalizedPath = filePath.replace(/\\/g, '/');
    if (!normalizedPath.includes('content/wiki/') || !normalizedPath.endsWith('.md')) {
      // wiki 파일 아니면 그냥 통과
      process.exit(0);
    }

    // critical-facts.json 로드
    const scriptDir = __dirname;
    const factsPath = path.join(scriptDir, '..', 'references', 'critical-facts.json');

    if (!fs.existsSync(factsPath)) {
      console.error('⚠️ critical-facts.json not found, skipping verification');
      process.exit(0);
    }

    const facts = JSON.parse(fs.readFileSync(factsPath, 'utf8'));
    const errors = [];

    // 각 오류 패턴 검사
    for (const wp of facts.wrongPatterns) {
      try {
        const regex = new RegExp(wp.pattern, 'gi');
        const matches = content.match(regex);

        if (matches && matches.length > 0) {
          // 예외 조건 확인 (exception 키워드가 같은 문장에 있으면 OK)
          if (wp.exception) {
            // 매치된 부분 주변에 exception 키워드가 있는지 확인
            let hasException = false;
            for (const match of matches) {
              const matchIndex = content.indexOf(match);
              // 매치 전후 100자 범위에서 exception 키워드 확인
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
              continue; // 예외 적용, 이 패턴은 OK
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
        // 정규식 오류는 무시하고 계속
        console.error(`⚠️ Regex error for pattern: ${wp.pattern}`);
      }
    }

    // 결과 출력
    if (errors.length > 0) {
      const criticalErrors = errors.filter(e => e.severity === 'critical');
      const warnings = errors.filter(e => e.severity === 'warning');

      console.error('\n');
      console.error('╔══════════════════════════════════════════════════════════╗');
      console.error('║          🚨 수치 검증 실패 - Write 차단됨                ║');
      console.error('╚══════════════════════════════════════════════════════════╝');
      console.error('');

      if (criticalErrors.length > 0) {
        console.error('❌ [심각한 오류] 반드시 수정 필요:');
        console.error('');
        for (const err of criticalErrors) {
          console.error(`   틀린 표현: "${err.wrong}"`);
          console.error(`   → 정답: "${err.correct}"`);
          console.error('');
        }
      }

      if (warnings.length > 0) {
        console.error('⚠️ [경고] 확인 필요:');
        console.error('');
        for (const err of warnings) {
          console.error(`   의심 표현: "${err.wrong}"`);
          console.error(`   → 확인: "${err.correct}"`);
          console.error('');
        }
      }

      console.error('────────────────────────────────────────────────────────────');
      console.error('📌 위 오류를 수정한 후 다시 시도하세요.');
      console.error('📌 참고: .claude/references/critical-facts.json');
      console.error('────────────────────────────────────────────────────────────');
      console.error('');

      // critical 오류가 있으면 차단
      if (criticalErrors.length > 0) {
        process.exit(1);
      }
    }

    // 성공
    console.log('✅ 수치 검증 통과');
    process.exit(0);

  } catch (parseError) {
    // JSON 파싱 실패 등은 그냥 통과 (안전하게)
    console.error('⚠️ Hook input parsing failed, allowing write');
    process.exit(0);
  }
});

// 타임아웃 (5초)
setTimeout(() => {
  console.error('⚠️ Hook timeout, allowing write');
  process.exit(0);
}, 5000);
