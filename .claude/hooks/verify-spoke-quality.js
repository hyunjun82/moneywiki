#!/usr/bin/env node
/**
 * verify-spoke-quality.js
 * Spoke TSX 파일의 컴포넌트 API 불일치를 자동 검출
 *
 * 사용법:
 *   node verify-spoke-quality.js <파일 또는 디렉토리>
 *   node verify-spoke-quality.js ./src/data/spoke/
 *   node verify-spoke-quality.js ./src/data/spoke/실업급여-수급-조건.tsx
 *
 * 버전: 1.1 (2026-02-09)
 *   - 파일 필터: src/data/spoke/ 내 모든 .tsx (types.ts, registry.ts, index.ts 제외)
 */

const fs = require('fs');
const path = require('path');

// ─── 제외할 파일 목록 ───
const EXCLUDE_FILES = ['types.ts', 'registry.ts', 'index.ts', 'index.tsx'];

// ─── 검출 규칙 정의 ───

const RULES = [
  // ── SpokeTimeline 규칙 (오류 최다) ──
  {
    id: 'TIMELINE-001',
    severity: 'ERROR',
    component: 'SpokeTimeline',
    description: 'SpokeTimeline에서 "date" prop 사용 (→ "month"로 변경)',
    test: (content) => {
      const matches = [];
      // import문 제외, 실제 events 배열 내부의 { date: } 패턴만 검출
      const regex = /\{\s*date\s*:\s*['"][^'"]*['"]/g;
      let match;
      while ((match = regex.exec(content)) !== null) {
        const before = content.substring(0, match.index);
        // import 라인이면 무시
        const lastNewline = before.lastIndexOf('\n');
        const currentLine = before.substring(lastNewline + 1);
        if (currentLine.includes('import')) continue;
        matches.push({
          line: before.split('\n').length,
          text: match[0].trim().substring(0, 80),
        });
      }
      return matches;
    },
    fix: 'date → month',
  },
  {
    id: 'TIMELINE-002',
    severity: 'ERROR',
    component: 'SpokeTimeline',
    description: 'SpokeTimeline에서 "sub" prop 사용 (→ "desc"로 변경)',
    test: (content) => {
      const matches = [];
      // events 배열 내부의 { ...sub: } 패턴 (SpokeFlow의 sub는 별도 규칙)
      // SpokeTimeline 컨텍스트 내의 sub만 검출
      const blockRegex = /<SpokeTimeline[\s\S]*?\/>/g;
      let blockMatch;
      while ((blockMatch = blockRegex.exec(content)) !== null) {
        const block = blockMatch[0];
        if (/\bsub\s*:/.test(block)) {
          const lineNum = content.substring(0, blockMatch.index).split('\n').length;
          matches.push({
            line: lineNum,
            text: block.substring(0, 80).replace(/\n/g, ' '),
          });
        }
      }
      return matches;
    },
    fix: 'sub → desc',
  },
  {
    id: 'TIMELINE-003',
    severity: 'ERROR',
    component: 'SpokeTimeline',
    description: 'SpokeTimeline에서 "highlight" prop 사용 (→ status: "warning" 등으로 변경)',
    test: (content) => {
      const matches = [];
      const blockRegex = /<SpokeTimeline[\s\S]*?\/>/g;
      let blockMatch;
      while ((blockMatch = blockRegex.exec(content)) !== null) {
        const block = blockMatch[0];
        if (/\bhighlight\s*:/.test(block)) {
          const lineNum = content.substring(0, blockMatch.index).split('\n').length;
          matches.push({
            line: lineNum,
            text: block.substring(0, 80).replace(/\n/g, ' '),
          });
        }
      }
      return matches;
    },
    fix: 'highlight: true → status: "warning"',
  },
  {
    id: 'TIMELINE-004',
    severity: 'ERROR',
    component: 'SpokeTimeline',
    description: 'SpokeTimeline events에 title prop 누락',
    test: (content) => {
      const matches = [];
      // SpokeTimeline 블록 추출 (멀티라인 대응)
      const blockRegex = /<SpokeTimeline\s+events=\{\[[\s\S]*?\]\}\s*\/>/g;
      let blockMatch;
      while ((blockMatch = blockRegex.exec(content)) !== null) {
        const block = blockMatch[0];
        const blockStart = blockMatch.index;
        // 블록 내 각 이벤트 객체 추출
        const objRegex = /\{([^{}]+)\}/g;
        let objMatch;
        while ((objMatch = objRegex.exec(block)) !== null) {
          const obj = objMatch[1];
          // month가 있지만 title이 없는 경우
          if (/\bmonth\s*:/.test(obj) && !/\btitle\s*:/.test(obj)) {
            const lineNum = content.substring(0, blockStart + objMatch.index).split('\n').length;
            matches.push({
              line: lineNum,
              text: objMatch[0].trim().substring(0, 80),
            });
          }
        }
      }
      return matches;
    },
    fix: 'title: "이벤트 제목" 추가',
  },

  // ── TipBox / SpokeWarnBox 규칙 ──
  {
    id: 'TIPBOX-001',
    severity: 'ERROR',
    component: 'TipBox',
    description: 'TipBox에서 "items" prop 사용 (→ children JSX로 변경)',
    pattern: /<TipBox[^>]*\bitems\s*=\s*\{/g,
    fix: '<TipBox title="..."><ul><li>...</li></ul></TipBox>',
  },
  {
    id: 'WARNBOX-001',
    severity: 'ERROR',
    component: 'SpokeWarnBox',
    description: 'SpokeWarnBox에서 "items" prop 사용 (→ children JSX로 변경)',
    pattern: /<SpokeWarnBox[^>]*\bitems\s*=\s*\{/g,
    fix: '<SpokeWarnBox title="..."><p>...</p></SpokeWarnBox>',
  },

  // ── RateCards 규칙 ──
  {
    id: 'RATECARDS-001',
    severity: 'ERROR',
    component: 'RateCards',
    description: 'RateCards에서 highlightColor: "neutral" 사용 (허용: orange | emerald | undefined)',
    pattern: /highlightColor\s*:\s*['"]neutral['"]/g,
    fix: '제거하거나 "orange" 또는 "emerald"로 변경',
  },
  {
    id: 'RATECARDS-002',
    severity: 'WARNING',
    component: 'RateCards',
    description: 'RateCards에서 허용되지 않는 highlightColor 값 사용',
    pattern: /highlightColor\s*:\s*['"](?!orange|emerald)[a-z]+['"]/g,
    fix: '"orange" 또는 "emerald"만 허용',
  },

  // ── SpokeFlow 규칙 ──
  {
    id: 'FLOW-001',
    severity: 'ERROR',
    component: 'SpokeFlow',
    description: 'SpokeFlow에서 "desc" prop 사용 (→ "sub"로 변경)',
    test: (content) => {
      const matches = [];
      const blockRegex = /<SpokeFlow[\s\S]*?\/>/g;
      let blockMatch;
      while ((blockMatch = blockRegex.exec(content)) !== null) {
        const block = blockMatch[0];
        if (/\bdesc\s*:/.test(block)) {
          const lineNum = content.substring(0, blockMatch.index).split('\n').length;
          matches.push({
            line: lineNum,
            text: block.substring(0, 80).replace(/\n/g, ' '),
          });
        }
      }
      return matches;
    },
    fix: 'desc → sub',
  },

  // ── SpokeTable 규칙 ──
  {
    id: 'TABLE-001',
    severity: 'WARNING',
    component: 'SpokeTable',
    description: 'SpokeTable에서 id prop 누락',
    test: (content) => {
      const matches = [];
      const regex = /<SpokeTable\s+(?![^>]*\bid\s*=)[^>]*>/g;
      let match;
      while ((match = regex.exec(content)) !== null) {
        matches.push({
          line: content.substring(0, match.index).split('\n').length,
          text: match[0].substring(0, 60),
        });
      }
      return matches;
    },
    fix: 'id="unique-table-id" 추가',
  },

  // ── RSC 직렬화 규칙 (500 에러 방지) ──
  {
    id: 'RSC-001',
    severity: 'ERROR',
    component: 'RSC',
    description: 'checkerConfig에 evaluate 함수 포함 (RSC 직렬화 불가 → 500 에러)',
    test: (content) => {
      const matches = [];
      // export const checkerConfig 패턴 검출
      if (/export\s+const\s+checkerConfig/.test(content)) {
        const line = content.substring(0, content.indexOf('export const checkerConfig')).split('\n').length;
        matches.push({
          line,
          text: 'export const checkerConfig — evaluate 함수가 RSC 경계를 넘으면 500 에러',
        });
      }
      return matches;
    },
    fix: 'checkerConfig 제거 → src/components/checkers/에 "use client" 전용 컴포넌트 생성',
  },
  {
    id: 'RSC-002',
    severity: 'ERROR',
    component: 'RSC',
    description: 'GenericChecker를 데이터 파일에서 직접 import (함수 prop 직렬화 불가)',
    pattern: /import\s+GenericChecker\s+from/g,
    fix: 'GenericChecker 대신 src/components/checkers/ 전용 "use client" 래퍼 사용',
  },
  {
    id: 'RSC-003',
    severity: 'ERROR',
    component: 'RSC',
    description: 'CheckerConfig 타입 import (evaluate 함수 포함 → RSC 직렬화 불가)',
    pattern: /import\s+.*CheckerConfig.*from\s+['"]@\/data\/checker-types['"]/g,
    fix: 'CheckerConfig/evaluate 로직을 src/components/checkers/ "use client" 컴포넌트로 이동',
  },

  // ── 구조 규칙 ──
  {
    id: 'STRUCT-001',
    severity: 'WARNING',
    component: '구조',
    description: '스포크 섹션(heading) 개수가 4개가 아님 (FAQ 제외)',
    test: (content, filePath) => {
      // 스포크 파일에만 적용 (허브는 섹션 수 제한 없음)
      if (filePath && !filePath.includes('spoke')) return [];
      // TSX 데이터 파일은 sections[].heading으로 H2 정의
      // FAQ 섹션, 체커 섹션 제외하고 카운트
      const headingMatches = content.match(/heading\s*:\s*['"`](?!자주 묻는 질문)[^'"`]+['"`]/g) || [];
      // 체커 섹션 heading도 제외 (id: 'checker' 근처의 heading)
      const checkerHeading = (content.match(/id\s*:\s*['"]checker['"]/g) || []).length;
      const count = headingMatches.length - checkerHeading;
      if (count !== 4) {
        return [{ line: 0, text: `섹션 heading ${count}개 발견 (4개 필요, FAQ/체커 제외)` }];
      }
      return [];
    },
    fix: '본문 섹션을 정확히 4개로 조정 (+ FAQ 1개)',
  },

  // ── 문체 규칙 (WARNING) ──
  {
    id: 'STYLE-001',
    severity: 'WARNING',
    component: '문체',
    description: '~습니다/~합니다 문체 사용 (→ ~이에요/~해요)',
    test: (content) => {
      const matches = [];
      const lines = content.split('\n');
      for (let i = 0; i < lines.length; i++) {
        const trimmed = lines[i].trim();
        // 코드/메타/URL 라인 제외
        if (/^(import |export (type|interface|default|const)|\/\/|\*|})/.test(trimmed)) continue;
        if (/\b(url|href)\s*:/.test(trimmed)) continue;
        // meta description은 ~습니다 허용 (정리했습니다 패턴)
        if (/\b(description|ogDescription)\s*:/.test(trimmed)) continue;

        if (/[습합]니다/.test(trimmed)) {
          matches.push({
            line: i + 1,
            text: trimmed.substring(0, 80),
          });
        }
      }
      return matches;
    },
    fix: '~습니다 → ~이에요, ~합니다 → ~해요',
  },
  {
    id: 'STYLE-002',
    severity: 'WARNING',
    component: '문체',
    description: '관공서체/딱딱한 표현 사용',
    pattern: /(확인해 보시기 바랍니다|참고하시기 바랍니다|문의하시기 바랍니다|하시기 바랍니다|되오니|바라오며|드리오니)/g,
    fix: '~바랍니다 → ~해 보세요 / ~하세요',
  },
  {
    id: 'STYLE-003',
    severity: 'WARNING',
    component: '문체',
    description: '의미 없는 수식어/금지어 사용',
    test: (content) => {
      const matches = [];
      const lines = content.split('\n');
      const BAD = [/다양한/g, /다양하게/g, /등등/g, /매우 중요/g, /반드시 확인/g, /총정리/g, /완벽 ?정리/g, /완벽 ?가이드/g];
      for (let i = 0; i < lines.length; i++) {
        const trimmed = lines[i].trim();
        if (/^(import |export |\/\/|\*)/.test(trimmed)) continue;
        // 구조적 참조 필드 제외 (기존 페이지 slug/URL/제목 참조)
        if (/\b(slug|href|url)\s*:/.test(trimmed)) continue;
        if (/^\s*keywords\s*:/.test(trimmed)) continue;
        if (/^\s*(prev|next)\s*:/.test(trimmed)) continue;
        if (/^\s*name\s*:\s*'/.test(trimmed)) continue;
        for (const p of BAD) {
          p.lastIndex = 0;
          if (p.test(trimmed)) {
            matches.push({ line: i + 1, text: trimmed.substring(0, 80) });
            break;
          }
        }
      }
      return matches;
    },
    fix: '구체적 표현으로 교체 (다양한 → 구체 예시 나열)',
  },
  {
    id: 'STYLE-004',
    severity: 'WARNING',
    component: '문체',
    description: '동일 시작어 3회 연속 반복 (<p> 태그)',
    test: (content) => {
      const matches = [];
      const pRegex = /<p[^>]*>\s*([가-힣]{1,4})/g;
      const starts = [];
      let m;
      while ((m = pRegex.exec(content)) !== null) {
        starts.push({
          word: m[1],
          line: content.substring(0, m.index).split('\n').length,
        });
      }
      for (let i = 0; i < starts.length - 2; i++) {
        if (starts[i].word === starts[i + 1].word && starts[i + 1].word === starts[i + 2].word) {
          matches.push({
            line: starts[i].line,
            text: `"${starts[i].word}..." 로 시작하는 문장 3회 연속`,
          });
        }
      }
      return matches;
    },
    fix: '문장 시작어 다양화',
  },
];

// ─── 검출 엔진 ───

function analyzeFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const fileName = path.basename(filePath);
  const results = [];

  for (const rule of RULES) {
    if (rule.pattern) {
      // regex 기반 검출
      let match;
      const regex = new RegExp(rule.pattern.source, rule.pattern.flags);
      while ((match = regex.exec(content)) !== null) {
        const line = content.substring(0, match.index).split('\n').length;
        results.push({
          file: fileName,
          filePath,
          rule: rule.id,
          severity: rule.severity,
          component: rule.component,
          description: rule.description,
          line,
          text: match[0].trim().substring(0, 80),
          fix: rule.fix,
        });
      }
    } else if (rule.test) {
      // 커스텀 테스트 함수 기반 검출 (filePath 전달)
      const matches = rule.test(content, filePath);
      for (const m of matches) {
        results.push({
          file: fileName,
          filePath,
          rule: rule.id,
          severity: rule.severity,
          component: rule.component,
          description: rule.description,
          line: m.line,
          text: m.text || '',
          fix: rule.fix,
        });
      }
    }
  }

  return results;
}

function getFiles(target) {
  const stat = fs.statSync(target);
  if (stat.isFile()) {
    return [target];
  }
  if (stat.isDirectory()) {
    const files = [];
    function walk(dir) {
      for (const entry of fs.readdirSync(dir)) {
        const full = path.join(dir, entry);
        if (fs.statSync(full).isDirectory()) {
          walk(full);
        } else if (
          (full.endsWith('.tsx') || full.endsWith('.ts')) &&
          !EXCLUDE_FILES.includes(path.basename(full))
        ) {
          files.push(full);
        }
      }
    }
    walk(target);
    return files.sort();
  }
  return [];
}

// ─── 출력 ───

function printResults(allResults) {
  const errors = allResults.filter(r => r.severity === 'ERROR');
  const warnings = allResults.filter(r => r.severity === 'WARNING');

  console.log('\n' + '═'.repeat(70));
  console.log('  SPOKE QUALITY VERIFICATION REPORT');
  console.log('═'.repeat(70));

  if (allResults.length === 0) {
    console.log('\n  ✅ 모든 파일이 API 스펙을 준수합니다!\n');
    return 0;
  }

  // 파일별 그룹핑
  const byFile = {};
  for (const r of allResults) {
    if (!byFile[r.file]) byFile[r.file] = [];
    byFile[r.file].push(r);
  }

  for (const [file, results] of Object.entries(byFile)) {
    console.log(`\n─── ${file} ───`);
    for (const r of results) {
      const icon = r.severity === 'ERROR' ? '🔴' : '🟡';
      console.log(`  ${icon} [${r.rule}] L${r.line}: ${r.description}`);
      if (r.text) console.log(`     발견: ${r.text}`);
      console.log(`     수정: ${r.fix}`);
    }
  }

  // 요약
  console.log('\n' + '─'.repeat(70));
  console.log(`  요약: 🔴 ERROR ${errors.length}개 | 🟡 WARNING ${warnings.length}개 | 총 ${allResults.length}개`);

  // 규칙별 통계
  const byRule = {};
  for (const r of allResults) {
    if (!byRule[r.rule]) byRule[r.rule] = { count: 0, desc: r.description, severity: r.severity };
    byRule[r.rule].count++;
  }

  console.log('\n  규칙별 발생 횟수:');
  for (const [rule, info] of Object.entries(byRule).sort((a, b) => b[1].count - a[1].count)) {
    const icon = info.severity === 'ERROR' ? '🔴' : '🟡';
    console.log(`    ${icon} ${rule}: ${info.count}회 — ${info.desc}`);
  }

  // 파일별 통계
  console.log('\n  파일별 오류 수:');
  for (const [file, results] of Object.entries(byFile).sort((a, b) => b[1].length - a[1].length)) {
    const errCount = results.filter(r => r.severity === 'ERROR').length;
    const warnCount = results.filter(r => r.severity === 'WARNING').length;
    console.log(`    ${file}: 🔴${errCount} 🟡${warnCount}`);
  }

  console.log('');
  return errors.length > 0 ? 1 : 0;
}

// ─── 메인 ───

const target = process.argv[2];

if (!target) {
  console.log('사용법: node verify-spoke-quality.js <파일 또는 디렉토리>');
  console.log('  예시: node verify-spoke-quality.js ./src/data/spoke/');
  console.log('  예시: node verify-spoke-quality.js ./src/data/spoke/실업급여-수급-조건.tsx');
  process.exit(1);
}

if (!fs.existsSync(target)) {
  console.error(`오류: "${target}" 경로를 찾을 수 없습니다.`);
  process.exit(1);
}

const files = getFiles(target);

if (files.length === 0) {
  console.log(`"${target}"에서 .tsx 파일을 찾을 수 없습니다.`);
  process.exit(0);
}

console.log(`\n검사 대상: ${files.length}개 파일`);
for (const f of files) {
  console.log(`  · ${path.basename(f)}`);
}

const allResults = [];
for (const f of files) {
  allResults.push(...analyzeFile(f));
}

const exitCode = printResults(allResults);
process.exit(exitCode);
