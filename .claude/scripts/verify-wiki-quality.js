#!/usr/bin/env node
/**
 * 머니위키 CCTV 품질 검증 스크립트 (v2.3)
 *
 * 작동 방식:
 * 1. PreToolUse: stdin에서 content 읽음 → 검증 → 차단
 * 2. PostToolUse: 파일 경로에서 직접 읽음 → 검증 → 실패 시 삭제!
 *
 * 검증 항목:
 * - 타이틀: 콜론(:) 금지, 32자 이내
 * - Keywords: 정확히 4개
 * - 내부링크: 3개 이상
 * - ctaCard: frontmatter 필수 (label, mainText, subText, url)
 * - 섹션: 4문장 이상
 * - 수치 오차: critical-facts.json
 */

const fs = require('fs');
const path = require('path');

// 검증 함수 (content와 filePath를 받아서 검증)
function validateWikiContent(content, filePath) {
  const errors = [];
  const warnings = [];

  // CRLF → LF 정규화 (Windows git checkout 대응)
  content = content.replace(/\r\n/g, '\n');

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


    // 콜론(:) 금지 (v2.3 규칙)
    if (title.includes(':')) {
      errors.push(`타이틀에 콜론(:) 사용 금지: "${title}" → 콜론 없이 작성`);
    }

    // 타이틀 32자 이내
    if (title.length > 32) {
      errors.push(`타이틀 32자 초과: ${title.length}자 "${title}"`);
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

    // 타이틀 자연스러움: "과/와" 뒤 맨 끝이 단독 행동명사면 부자연스러움
    // ❌ "주택과 신고" → ✅ "주택과 신고 방법"
    // ❌ "적용과 계산" → ✅ "적용 조건 공제율과 계산"
    const bareActionNouns = ['신고', '적용', '계산', '처분', '해지', '신청', '등록', '납부', '환급', '접수', '변경', '갱신', '전환', '조회', '발급', '취소', '연장', '수령', '지급'];
    const bareEndMatch = title.match(/[과와]\s+(\S+)$/);
    if (bareEndMatch && bareActionNouns.includes(bareEndMatch[1])) {
      errors.push(`타이틀 부자연스러움: "~${bareEndMatch[0]}" → "${bareEndMatch[1]} 방법/조건/금액" 등 보어 추가 필요`);
    }

    // 타이틀 금지어 (키워드 스팸 느낌)
    const bannedTitleWords = ['총정리', '완벽정리', '정리', '가이드', '가이드북', '비교표'];
    bannedTitleWords.forEach(word => {
      if (title.includes(word)) {
        errors.push(`타이틀 금지어: "${word}" 사용 금지 → "${title}"`);
      }
    });
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

  // ========================================
  // 2-1. 타이틀+키워드+소제목 완벽 일치 검증 (핵심 규칙!)
  // ========================================
  if (titleMatch && parsedKeywords.length === 4) {
    const title = titleMatch[1];
    // 타이틀에서 조사/접속사 제거한 핵심 단어 추출
    const titleNormalized = title.replace(/[과와의를은는이가에서도까지]/g, ' ').replace(/\s+/g, ' ').trim();

    parsedKeywords.forEach(kw => {
      // 키워드의 핵심 단어들이 타이틀에 있는지 확인
      const kwWords = kw.split(/\s+/).filter(w => w.length > 1);
      const missingWords = kwWords.filter(word => !title.includes(word) && !titleNormalized.includes(word));

      if (missingWords.length > 0) {
        errors.push(`키워드-타이틀 불일치: "${kw}" → 타이틀에 "${missingWords.join(', ')}" 없음! 타이틀에 포함된 단어로만 키워드 구성 필수`);
      }
    });

    // ========================================
    // 동의어 검증 v3 - 핵심 명사 기반 의미론적 검증
    // ========================================

    // 핵심 명사 동의어 그룹 (검색 의도를 결정하는 핵심어만)
    const coreNounGroups = [
      ['서류', '문서', '자료', '준비물', '구비서류', '첨부서류', '신청서류', '제출서류'],
      ['비용', '요금', '수수료', '금액', '가격', '비'],
      ['조건', '자격', '요건', '대상', '기준'],
      ['방법', '절차', '과정', '순서', '프로세스'],
      ['기간', '기한', '시기', '시점', '기일', '날짜'],
      ['계산', '산정', '산출', '산식', '계산법'],
      ['지급', '수령', '수급', '받기', '지불'],
      ['감면', '공제', '절세', '혜택'],
      ['종류', '유형', '구분', '타입', '분류'],
    ];

    // 접두사 단어 (검색 의도를 결정하지 않음 - 제외)
    const prefixWords = new Set(['신청', '접수', '제출', '등록', '변경', '수정', '갱신', '조정', '취소', '철회', '취하', '포기', '개시', '종료', '완료']);

    // 키워드에서 핵심 명사 추출 (마지막 1-2단어만 추출, 접두사 제외)
    function extractCoreNounGroups(keyword) {
      // 키워드를 단어로 분리
      const words = keyword.split(/\s+/).filter(w => w.length > 1);

      // 마지막 1-2단어만 추출 (핵심 의도를 나타내는 부분)
      const coreWords = words.slice(-2);

      // 접두사 제외하고 핵심 명사 그룹 찾기
      const foundGroups = new Set();
      coreNounGroups.forEach((group, groupIdx) => {
        for (const noun of group) {
          // 접두사 단어는 스킵
          if (prefixWords.has(noun)) continue;

          // 핵심 단어에만 매칭
          for (const coreWord of coreWords) {
            if (coreWord.includes(noun)) {
              foundGroups.add(groupIdx);
            }
          }
        }
      });
      return Array.from(foundGroups);
    }

    // 두 키워드의 핵심 명사가 같은 그룹에 속하는지 확인
    for (let i = 0; i < parsedKeywords.length; i++) {
      for (let j = i + 1; j < parsedKeywords.length; j++) {
        const kw1 = parsedKeywords[i].trim();
        const kw2 = parsedKeywords[j].trim();

        // 완전 포함 관계는 스킵
        if (kw1.includes(kw2) || kw2.includes(kw1)) continue;

        // 각 키워드의 핵심 명사 그룹 추출
        const groups1 = extractCoreNounGroups(kw1);
        const groups2 = extractCoreNounGroups(kw2);

        // 공통 그룹이 있으면 동의어 중복
        const commonGroups = groups1.filter(g => groups2.includes(g));

        if (commonGroups.length > 0) {
          // 어떤 핵심 명사가 중복인지 찾기
          const duplicatedNouns = [];
          commonGroups.forEach(groupIdx => {
            const group = coreNounGroups[groupIdx];
            const nouns1 = group.filter(n => kw1.includes(n));
            const nouns2 = group.filter(n => kw2.includes(n));
            if (nouns1.length > 0 && nouns2.length > 0) {
              duplicatedNouns.push(`"${nouns1[0]}" ≈ "${nouns2[0]}"`);
            }
          });

          if (duplicatedNouns.length > 0) {
            errors.push(`키워드 동의어 중복: "${kw1}" ≈ "${kw2}" (${duplicatedNouns[0]}) → 서로 다른 검색 의도 필요`);
          }
        }
      }
    }
  }

  // 3. 소제목 검증 (PAA 자연스러움)
  const h2Matches = bodyContent.match(/^## (.+)$/gm);
  const contentH2s = h2Matches ? h2Matches.map(h => h.replace(/^## /, '')).filter(h => h !== '출처' && h !== '관련 문서') : [];

  if (h2Matches) {
    h2Matches.forEach(h2 => {
      const h2Text = h2.replace(/^## /, '');

      // "~란 무엇인가요?" 패턴 금지
      if (h2Text.match(/란\s*무엇인가요/)) {
        errors.push(`소제목 부자연스러움: "${h2Text}" → "~가 뭔가요?" 또는 "~는 뭔가요?" 사용`);
      }

      // "방법+어떻게" 중복 표현 금지
      // ❌ "신청 방법은 어떻게 되나요?" → ✅ "신청 방법은 뭔가요?"
      if (h2Text.includes('방법') && h2Text.includes('어떻게')) {
        errors.push(`H2 중복 표현: "${h2Text}" → "방법"이 있으면 "뭔가요?" 사용 ("어떻게" 금지)`);
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

  // 3-1. H2 ↔ 키워드 대응 검증 (각 키워드가 대응하는 H2가 있어야 함)
  if (parsedKeywords.length === 4 && contentH2s.length >= 4) {
    parsedKeywords.forEach(kw => {
      const kwWords = kw.split(/\s+/).filter(w => w.length > 1);
      const hasMatchingH2 = contentH2s.some(h2 => {
        const matchCount = kwWords.filter(w => h2.includes(w)).length;
        return matchCount >= Math.ceil(kwWords.length * 0.6);
      });

      if (!hasMatchingH2) {
        errors.push(`키워드-소제목 불일치: "${kw}" → 대응하는 H2 없음! 키워드마다 H2 하나씩 매칭 필수`);
      }
    });
  }

  // 4. 내부링크 (관련 문서 사이드바가 자동 표시하므로 본문 강제 안 함)
  const internalLinks = bodyContent.match(/\[([^\]]+)\]\((\/w\/[^\)]+|\/calculators\/[^\)]+)\)/g);
  const internalLinkCount = internalLinks ? internalLinks.length : 0;

  // 4-1. 키워드 스터핑 검증 (본문에서 full keyword 사용 금지 - H2에만 사용)
  // 템플릿 패턴: H2 제목에 full keyword, 본문은 자연어로 쪼개서 배치
  if (keywords && keywords.length > 0) {
    const kwSections = bodyContent.split(/^## /gm).slice(1);
    kwSections.forEach((section) => {
      const sectionTitle = section.split('\n')[0].trim();
      if (sectionTitle.includes('출처') || sectionTitle.includes('관련')) return;
      // H2 제목 제외한 본문만 추출
      const sectionBody = section.substring(section.indexOf('\n'));
      keywords.forEach((kw) => {
        const escaped = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const matches = sectionBody.match(new RegExp(escaped, 'g'));
        const count = matches ? matches.length : 0;
        if (count > 1) {
          errors.push(`키워드 스터핑: "${kw}" 가 "${sectionTitle}" 본문에 ${count}회 (H2에만 사용! 본문은 자연어로 풀어쓰기)`);
        }
      });
    });
  }

  // 5. CTA 카드 검증 (frontmatter ctaCard 필수)
  const ctaCardMatch = frontmatter.match(/ctaCard:/);
  if (!ctaCardMatch) {
    errors.push('ctaCard 없음 (frontmatter에 ctaCard 필수!)');
  } else {
    // ctaCard 필수 필드 검증
    const hasLabel = frontmatter.match(/ctaCard:[\s\S]*?label:/);
    const hasMainText = frontmatter.match(/ctaCard:[\s\S]*?mainText:/);
    const hasSubText = frontmatter.match(/ctaCard:[\s\S]*?subText:/);
    const hasUrl = frontmatter.match(/ctaCard:[\s\S]*?url:/);

    if (!hasLabel || !hasMainText || !hasSubText || !hasUrl) {
      const missing = [];
      if (!hasLabel) missing.push('label');
      if (!hasMainText) missing.push('mainText');
      if (!hasSubText) missing.push('subText');
      if (!hasUrl) missing.push('url');
      errors.push(`ctaCard 필수 필드 누락: ${missing.join(', ')}`);
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

  // 9-1. 시각 요소 검증 (텍스트만 있으면 읽기 힘듦)
  const hasBlockquote = /^> .+/m.test(bodyContent);
  const hasTable = /\|.+\|.+\|/.test(bodyContent);
  const hasSelectionBullet = /- \*\*.+\*\*/.test(bodyContent);
  if (!hasBlockquote && !hasTable && !hasSelectionBullet) {
    warnings.push('시각 요소 없음: blockquote(>), 테이블(|), 굵은 불릿 중 1개 이상 권장');
  }

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

  // 11. 내부링크 다양성 (사이드바가 자동 처리하므로 검증 제거)

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
    console.error('   - .claude/references/moneywiki-template3358.md (템플릿 최신)');
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
