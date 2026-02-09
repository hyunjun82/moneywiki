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

  // ── 구조 규칙 ──
  {
    id: 'STRUCT-001',
    severity: 'WARNING',
    component: '구조',
    description: 'H2 태그가 4개가 아님',
    test: (content) => {
      const h2Count = (content.match(/<h2[^>]*>/g) || []).length;
      if (h2Count !== 4) {
        return [{ line: 0, text: `H2 ${h2Count}개 발견 (4개 필요)` }];
      }
      return [];
    },
    fix: '섹션을 정확히 4개로 조정',
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
      // 커스텀 테스트 함수 기반 검출
      const matches = rule.test(content);
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
