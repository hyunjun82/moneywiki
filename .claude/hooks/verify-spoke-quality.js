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
 * 버전: 2.0 (2026-02-14)
 *   - 파일 필터: src/data/spoke/ + hub/ 내 모든 .tsx (types.ts, registry.ts, index.ts 제외)
 *   - 신규 규칙 7개: TITLE-001/002, DESC-001, KEYWORD-001, BADGE-001, PAA-001, VARIETY-001
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
    description: 'RateCards에서 highlightColor: "neutral" 사용 (허용: orange | navy | undefined)',
    pattern: /highlightColor\s*:\s*['"]neutral['"]/g,
    fix: '제거하거나 "orange" 또는 "navy"로 변경',
  },
  {
    id: 'RATECARDS-003',
    severity: 'ERROR',
    component: 'RateCards',
    description: 'RateCards에서 highlight: true/false 사용 (highlight는 문자열이어야 함, 예: "추천")',
    pattern: /highlight\s*:\s*(true|false)/g,
    fix: 'highlight: true → highlight: "추천" 또는 highlight 줄 자체를 삭제',
  },
  {
    id: 'RATECARDS-002',
    severity: 'WARNING',
    component: 'RateCards',
    description: 'RateCards에서 허용되지 않는 highlightColor 값 사용',
    pattern: /highlightColor\s*:\s*['"](?!orange|navy)[a-z]+['"]/g,
    fix: '"orange" 또는 "navy"만 허용',
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
    test: (content, filePath) => {
      // src/components/checkers/ 는 "use client" 컴포넌트 — GenericChecker import 정상
      if (filePath && filePath.replace(/\\/g, '/').includes('src/components/checkers/')) return [];
      const regex = /import\s+GenericChecker\s+from/g;
      const matches = [];
      let m;
      while ((m = regex.exec(content)) !== null) {
        const line = content.substring(0, m.index).split('\n').length;
        matches.push({ line, text: m[0].trim().substring(0, 80) });
      }
      return matches;
    },
    fix: 'GenericChecker 대신 src/components/checkers/ 전용 "use client" 래퍼 사용',
  },
  {
    id: 'RSC-003',
    severity: 'ERROR',
    component: 'RSC',
    description: 'CheckerConfig 타입 import (evaluate 함수 포함 → RSC 직렬화 불가)',
    test: (content, filePath) => {
      // src/components/checkers/ 는 "use client" 컴포넌트 — CheckerConfig import 정상
      if (filePath && filePath.replace(/\\/g, '/').includes('src/components/checkers/')) return [];
      const regex = /import\s+.*CheckerConfig.*from\s+['"]@\/data\/checker-types['"]/g;
      const matches = [];
      let m;
      while ((m = regex.exec(content)) !== null) {
        const line = content.substring(0, m.index).split('\n').length;
        matches.push({ line, text: m[0].trim().substring(0, 80) });
      }
      return matches;
    },
    fix: 'CheckerConfig/evaluate 로직을 src/components/checkers/ "use client" 컴포넌트로 이동',
  },

  // ── 인라인 내부링크 규칙 (나무위키 방식) ──
  {
    id: 'LINK-001',
    severity: 'ERROR',
    component: '인라인링크',
    description: '본문 인라인 내부링크 2개 미만 (최소 2개 필수)',
    test: (content) => {
      const matches = content.match(/<a\s+href="\/w\/[^"]+"/g) || [];
      if (matches.length < 2) {
        return [{ line: 0, text: `인라인 내부링크 ${matches.length}개 발견 (최소 2개 필요)` }];
      }
      return [];
    },
    fix: '본문 <p> 안에서 형제 스포크/허브 키워드에 <a href="/w/슬러그">키워드</a> 추가 (최소 2개)',
  },
  {
    id: 'LINK-002',
    severity: 'WARNING',
    component: '인라인링크',
    description: '동일 슬러그 중복 인라인 링크 (첫 등장에만 링크)',
    test: (content) => {
      const matches = [];
      const regex = /<a\s+href="\/w\/([^"]+)"/g;
      const seen = {};
      let m;
      while ((m = regex.exec(content)) !== null) {
        const slug = m[1];
        if (seen[slug]) {
          const line = content.substring(0, m.index).split('\n').length;
          matches.push({
            line,
            text: `"/w/${slug}" 중복 링크 (첫 등장: L${seen[slug]})`,
          });
        } else {
          seen[slug] = content.substring(0, m.index).split('\n').length;
        }
      }
      return matches;
    },
    fix: '동일 슬러그는 첫 등장에만 <a> 링크, 이후는 일반 텍스트로',
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
      // sections 배열 내 최상위 heading만 카운트 (SpokeLinks/DetailBox 내부 heading 제외)
      // 패턴: sections 배열의 직접 자식 객체 { id: '...', ... heading: '...' } 추출
      const sectionIdMatches = content.match(/\{\s*\n?\s*id\s*:\s*['"][^'"]+['"]/g) || [];
      // sections 배열 내 id-heading 쌍만 카운트
      const sectionHeadingRegex = /\{\s*\n?\s*id\s*:\s*['"]([^'"]+)['"]\s*,\s*\n?\s*number\s*:\s*['"][^'"]+['"]\s*,\s*\n?\s*heading\s*:\s*['"`]([^'"`]+)['"`]/g;
      let m;
      let count = 0;
      while ((m = sectionHeadingRegex.exec(content)) !== null) {
        const id = m[1];
        const heading = m[2];
        // checker, faq 제외
        if (id === 'checker' || id === 'sec-faq') continue;
        if (heading === '자주 묻는 질문') continue;
        count++;
      }
      if (count !== 4 && count !== 5) {
        return [{ line: 0, text: `섹션 heading ${count}개 발견 (4~5개 필요, FAQ/체커 제외)` }];
      }
      return [];
    },
    fix: '본문 섹션을 4~5개로 조정 (+ FAQ 1개)',
  },

  // ── SEO/메타 규칙 ──
  {
    id: 'TITLE-001',
    severity: 'ERROR',
    component: 'SEO',
    description: 'meta.title에 — 또는 : 구분자 사용 (→ | 으로 변경)',
    test: (content) => {
      const metaIdx = content.indexOf('meta:');
      if (metaIdx === -1) return [];
      const afterMeta = content.substring(metaIdx, metaIdx + 500);
      const titleMatch = afterMeta.match(/title\s*:\s*['"`]([^'"`]+)['"`]/);
      if (!titleMatch) return [];
      const title = titleMatch[1];
      if (title.includes('\u2014') || title.includes(':')) {
        const line = content.substring(0, metaIdx + titleMatch.index).split('\n').length;
        return [{ line, text: `"${title.substring(0, 60)}" \u2014 \uAE08\uC9C0 \uAD6C\uBD84\uC790(\u2014/:) \uC0AC\uC6A9` }];
      }
      return [];
    },
    fix: 'meta.title\uC5D0\uC11C \u2014 \uB610\uB294 : \u2192 | (\uD30C\uC774\uD504) \uAD6C\uBD84\uC790\uB85C \uBCC0\uACBD',
  },
  {
    id: 'TITLE-002',
    severity: 'ERROR',
    component: 'SEO',
    description: 'meta.title 60자 초과',
    test: (content) => {
      const metaIdx = content.indexOf('meta:');
      if (metaIdx === -1) return [];
      const afterMeta = content.substring(metaIdx, metaIdx + 500);
      const titleMatch = afterMeta.match(/title\s*:\s*['"`]([^'"`]+)['"`]/);
      if (!titleMatch) return [];
      const title = titleMatch[1];
      if (title.length > 60) {
        const line = content.substring(0, metaIdx + titleMatch.index).split('\n').length;
        return [{ line, text: `title ${title.length}\uC790 (60\uC790 \uC774\uB0B4 \uD544\uC694): "${title.substring(0, 40)}..."` }];
      }
      return [];
    },
    fix: 'meta.title\uC744 60\uC790 \uC774\uB0B4\uB85C \uC904\uC774\uAE30',
  },
  {
    id: 'TITLE-003',
    severity: 'ERROR',
    component: 'SEO',
    description: 'meta.title에 | 구분자 없음 (필수: [핵심 키워드] | [보조 키워드/질문])',
    test: (content) => {
      const metaIdx = content.indexOf('meta:');
      if (metaIdx === -1) return [];
      const afterMeta = content.substring(metaIdx, metaIdx + 500);
      const titleMatch = afterMeta.match(/title\s*:\s*['"`]([^'"`]+)['"`]/);
      if (!titleMatch) return [];
      const title = titleMatch[1];
      if (!title.includes('|')) {
        const line = content.substring(0, metaIdx + titleMatch.index).split('\n').length;
        return [{ line, text: `"${title.substring(0, 50)}" — | 구분자 없음` }];
      }
      return [];
    },
    fix: 'meta.title을 "[핵심 키워드] | [보조 키워드/질문]" 구조로 변경',
  },
  {
    id: 'TITLE-004',
    severity: 'ERROR',
    component: 'SEO',
    description: 'meta.title에 금지어 사용 (총정리/완벽정리/가이드/완벽 가이드)',
    test: (content) => {
      const metaIdx = content.indexOf('meta:');
      if (metaIdx === -1) return [];
      const afterMeta = content.substring(metaIdx, metaIdx + 500);
      const titleMatch = afterMeta.match(/title\s*:\s*['"`]([^'"`]+)['"`]/);
      if (!titleMatch) return [];
      const title = titleMatch[1];
      const forbidden = ['총정리', '완벽정리', '완벽 정리', '가이드', '완벽 가이드'];
      for (const word of forbidden) {
        if (title.includes(word)) {
          const line = content.substring(0, metaIdx + titleMatch.index).split('\n').length;
          return [{ line, text: `"${title.substring(0, 50)}" — 금지어 "${word}" 포함` }];
        }
      }
      return [];
    },
    fix: 'meta.title에서 총정리/완벽정리/가이드 제거, 구체적 내용으로 교체',
  },
  {
    id: 'TITLE-005',
    severity: 'WARNING',
    component: 'SEO',
    description: 'meta.title에 - (하이픈) 구분자 사용 (→ | 으로 변경)',
    test: (content) => {
      const metaIdx = content.indexOf('meta:');
      if (metaIdx === -1) return [];
      const afterMeta = content.substring(metaIdx, metaIdx + 500);
      const titleMatch = afterMeta.match(/title\s*:\s*['"`]([^'"`]+)['"`]/);
      if (!titleMatch) return [];
      const title = titleMatch[1];
      // 하이픈이 구분자로 쓰인 경우만 검출 (공백-공백 패턴)
      if (/\s-\s/.test(title) || /\s–\s/.test(title)) {
        const line = content.substring(0, metaIdx + titleMatch.index).split('\n').length;
        return [{ line, text: `"${title.substring(0, 50)}" — 하이픈(-)을 구분자로 사용` }];
      }
      return [];
    },
    fix: 'meta.title에서 - 또는 – → | (파이프) 구분자로 변경',
  },
  {
    id: 'TITLE-006',
    severity: 'ERROR',
    component: 'SEO',
    description: 'meta.title | 오른쪽이 질문형/설명문 (양쪽 다 키워드여야 함)',
    test: (content) => {
      const metaIdx = content.indexOf('meta:');
      if (metaIdx === -1) return [];
      const afterMeta = content.substring(metaIdx, metaIdx + 500);
      const titleMatch = afterMeta.match(/title\s*:\s*['"`]([^'"`]+)['"`]/);
      if (!titleMatch) return [];
      const title = titleMatch[1];
      if (!title.includes('|')) return [];
      const rightSide = title.split('|')[1]?.trim();
      if (!rightSide) return [];
      // 질문형 패턴: ~인가요? ~될까요? ~있나요? ~하나요? ~인가? ~일까? 등
      const questionPattern = /[?？]$|인가요|될까요|있나요|하나요|인가$|일까$|일까요|할까요|어떻게|어떤가요|무엇인가요|뭔가요|건가요/;
      // 설명문 패턴: ~해요 ~이에요 ~돼요 ~있어요 ~에요 등
      const sentencePattern = /해요$|이에요$|돼요$|있어요$|에요$|드려요$|보세요$|하세요$|거예요$|이죠$/;
      if (questionPattern.test(rightSide)) {
        const line = content.substring(0, metaIdx + titleMatch.index).split('\n').length;
        return [{ line, text: `| 오른쪽 질문형: "...| ${rightSide}"` }];
      }
      if (sentencePattern.test(rightSide)) {
        const line = content.substring(0, metaIdx + titleMatch.index).split('\n').length;
        return [{ line, text: `| 오른쪽 설명문: "...| ${rightSide}"` }];
      }
      return [];
    },
    fix: 'meta.title | 오른쪽도 키워드 형태로 변경 (질문형/설명문 → 키워드)',
  },
  {
    id: 'DESC-001',
    severity: 'WARNING',
    component: 'SEO',
    description: 'meta.description 길이 부적절 (100~150자 필요)',
    test: (content) => {
      const metaIdx = content.indexOf('meta:');
      if (metaIdx === -1) return [];
      const afterMeta = content.substring(metaIdx, metaIdx + 1000);
      const descMatch = afterMeta.match(/description\s*:\s*['"`]([^'"`]+)['"`]/);
      if (!descMatch) return [{ line: 0, text: 'meta.description 누락' }];
      const desc = descMatch[1];
      const line = content.substring(0, metaIdx + descMatch.index).split('\n').length;
      if (desc.length < 100 || desc.length > 150) {
        return [{ line, text: `description ${desc.length}자 (100~150자 필요): "${desc.substring(0, 40)}..."` }];
      }
      return [];
    },
    fix: 'meta.description을 100~150자 구어체 2문장으로 작성 (호기심 유발 + 해결 제시)',
  },
  {
    id: 'DESC-002',
    severity: 'WARNING',
    component: 'SEO',
    description: 'description 마무리가 행동유도가 아님 (CTR 저하)',
    test: (content) => {
      const metaIdx = content.indexOf('meta:');
      if (metaIdx === -1) return [];
      const afterMeta = content.substring(metaIdx, metaIdx + 1000);
      const descMatch = afterMeta.match(/description\s*:\s*['"`]([^'"`]+)['"`]/);
      if (!descMatch) return [];
      const desc = descMatch[1];
      const line = content.substring(0, metaIdx + descMatch.index).split('\n').length;
      // 행동유도 마무리 패턴: ~해 보세요/확인하세요/알려드려요/풀어서/드려요/체크하세요
      const goodEndings = /(보세요|확인하세요|알려드려요|드려요|체크하세요|풀어서|풀었어요|정리해드려요)[.!]?\s*$/;
      // 나쁜 마무리: ~정리했어요/~했어요 (수동적)
      const badEndings = /(정리했어요|했어요|있어요|됐어요)[.!]?\s*$/;
      if (badEndings.test(desc) && !goodEndings.test(desc)) {
        return [{ line, text: `마무리가 수동적: "${desc.slice(-30)}" → 행동유도로 변경` }];
      }
      return [];
    },
    fix: 'description 마무리를 "~확인해 보세요/~알려드려요/~체크하세요" 등 행동유도로 변경',
  },
  {
    id: 'DESC-003',
    severity: 'WARNING',
    component: 'SEO',
    description: 'description에 궁금증 유발 패턴 없음 (CTR 저하)',
    test: (content) => {
      const metaIdx = content.indexOf('meta:');
      if (metaIdx === -1) return [];
      const afterMeta = content.substring(metaIdx, metaIdx + 1000);
      const descMatch = afterMeta.match(/description\s*:\s*['"`]([^'"`]+)['"`]/);
      if (!descMatch) return [];
      const desc = descMatch[1];
      const line = content.substring(0, metaIdx + descMatch.index).split('\n').length;
      // 궁금증 유발 패턴
      const curiosity = /(아시나요|아셨나요|모르겠다면|달라졌|바뀌었|받을 수 있다는|된다는 거|몰랐다면|놓치고 있다면|손해|이득)/;
      if (!curiosity.test(desc)) {
        return [{ line, text: `궁금증 유발 패턴 없음: "${desc.substring(0, 40)}..."` }];
      }
      return [];
    },
    fix: 'description 첫 문장에 "~아시나요?/~바뀌었어요/~받을 수 있다는 거" 등 궁금증 유발 표현 추가',
  },
  {
    id: 'DESC-004',
    severity: 'ERROR',
    component: 'SEO',
    description: 'description에 금지 패턴 사용',
    test: (content) => {
      const metaIdx = content.indexOf('meta:');
      if (metaIdx === -1) return [];
      const afterMeta = content.substring(metaIdx, metaIdx + 1000);
      const descMatch = afterMeta.match(/description\s*:\s*['"`]([^'"`]+)['"`]/);
      if (!descMatch) return [];
      const desc = descMatch[1];
      const line = content.substring(0, metaIdx + descMatch.index).split('\n').length;
      const forbidden = [
        { pattern: /알아봅니다/, label: '알아봅니다' },
        { pattern: /살펴보겠/, label: '살펴보겠' },
        { pattern: /총정리/, label: '총정리' },
        { pattern: /완벽.?정리/, label: '완벽정리' },
        { pattern: /한눈에 보는/, label: '한눈에 보는' },
      ];
      for (const f of forbidden) {
        if (f.pattern.test(desc)) {
          return [{ line, text: `금지 표현 "${f.label}" 사용: "${desc.substring(0, 40)}..."` }];
        }
      }
      return [];
    },
    fix: 'description에서 "알아봅니다/총정리/완벽정리/한눈에 보는" 등 금지 표현 제거',
  },
  {
    id: 'KEYWORD-001',
    severity: 'ERROR',
    component: 'SEO',
    description: 'meta.keywords 4개가 아님',
    test: (content) => {
      const metaIdx = content.indexOf('meta:');
      if (metaIdx === -1) return [];
      const afterMeta = content.substring(metaIdx, metaIdx + 1000);
      const kwMatch = afterMeta.match(/keywords\s*:\s*\[([\s\S]*?)\]/);
      if (!kwMatch) return [{ line: 0, text: 'keywords \uD544\uB4DC \uB204\uB77D' }];
      const items = kwMatch[1].match(/['"`][^'"`]+['"`]/g) || [];
      if (items.length !== 4) {
        const line = content.substring(0, metaIdx + kwMatch.index).split('\n').length;
        return [{ line, text: `keywords ${items.length}\uAC1C (4\uAC1C \uD544\uC694)` }];
      }
      return [];
    },
    fix: 'meta.keywords\uB97C \uC815\uD655\uD788 4\uAC1C\uB85C \uC124\uC815',
  },

  // ── 배지/구조 규칙 ──
  {
    id: 'BADGE-001',
    severity: 'WARNING',
    component: '구조',
    description: 'badge에 개발자 용어 사용 (허브/스포크/HUB/SPOKE)',
    pattern: /badge\s*:\s*['"](?:허브|스포크|HUB|SPOKE)['"]/g,
    fix: 'badge\uB97C \uC0AC\uC6A9\uC790 \uCE5C\uD654\uC801 \uC6A9\uC5B4\uB85C \uBCC0\uACBD (\uC608: \uD575\uC2EC, \uAE30\uBCF8, \uC808\uCC28, \uACC4\uC0B0, \uC870\uAC74 \uB4F1)',
  },
  {
    id: 'PAA-001',
    severity: 'WARNING',
    component: 'SEO',
    description: '섹션 heading이 질문형(?)이 아님',
    test: (content, filePath) => {
      // 스포크에만 적용 (허브는 질문형 필수 아님)
      if (filePath && !filePath.includes('spoke')) return [];
      const matches = [];
      // sections 배열의 최상위 heading만 검사 (SpokeLinks/DetailBox 내부 heading 제외)
      // 패턴: id: '...' + number: '...' + heading: '...' (sections 직접 자식만 매칭)
      const sectionHeadingRegex = /\{\s*\n?\s*id\s*:\s*['"]([^'"]+)['"]\s*,\s*\n?\s*number\s*:\s*['"][^'"]+['"]\s*,\s*\n?\s*heading\s*:\s*['"`]([^'"`]+)['"`]/g;
      let m;
      while ((m = sectionHeadingRegex.exec(content)) !== null) {
        const id = m[1];
        const heading = m[2];
        if (heading === '\uC790\uC8FC \uBB3B\uB294 \uC9C8\uBB38') continue;
        // checker 섹션은 질문형 필수 아님
        if (id === 'checker') continue;
        if (!heading.includes('?')) {
          matches.push({
            line: content.substring(0, m.index).split('\n').length,
            text: `"${heading}" \u2014 \uC9C8\uBB38\uD615(?)\uC774 \uC544\uB2D8`,
          });
        }
      }
      return matches;
    },
    fix: 'heading\uC744 \uC9C8\uBB38\uD615\uC73C\uB85C \uBCC0\uACBD (\uC608: "\uC2E4\uC5C5\uAE09\uC5EC \uC218\uAE09 \uC870\uAC74\uC740 \uC5B4\uB5BB\uAC8C \uB418\uB098\uC694?")',
  },

  // ── 다양성 규칙 ──
  {
    id: 'VARIETY-001',
    severity: 'WARNING',
    component: '구조',
    description: '컴포넌트 종류 부족 (스포크 4종+, 허브 2종+ 필요)',
    test: (content, filePath) => {
      const SPOKE_COMPONENTS = [
        'SpokeTable', 'FormulaBox', 'TipBox', 'WarnBox', 'SpokeWarnBox',
        'DetailBox', 'Chips', 'SpokeLinks', 'Steps', 'SpokeTimeline',
        'SpokeStepCards', 'SpokeCompareCards', 'SpokeRateBars',
        'SpokeFlow', 'SpokeChecklist',
      ];
      const HUB_COMPONENTS = ['HubTable', 'HubTipBox', 'HubWarnBox', 'HubFormula'];

      const isHub = filePath && filePath.includes('hub');
      const components = isHub ? HUB_COMPONENTS : SPOKE_COMPONENTS;
      const minVariety = isHub ? 2 : 4;

      const used = components.filter(c => content.includes(`<${c}`));
      if (used.length < minVariety) {
        return [{
          line: 0,
          text: `\uCEF4\uD3EC\uB10C\uD2B8 ${used.length}\uC885\uB958 \uC0AC\uC6A9 (${used.join(', ')}) \u2014 \uCD5C\uC18C ${minVariety}\uC885\uB958 \uD544\uC694`,
        }];
      }
      return [];
    },
    fix: '\uB2E4\uC591\uD55C \uCEF4\uD3EC\uB10C\uD2B8 \uD65C\uC6A9 (\uC608: SpokeTable + FormulaBox + TipBox + Steps)',
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
  // ── [신규] hero.h1 금지어 규칙 ──
  {
    id: 'H1-001',
    severity: 'ERROR',
    component: 'SEO',
    description: 'hero.h1에 금지어 사용 (총정리/완벽정리/가이드/완벽 가이드/완전 가이드)',
    test: (content) => {
      const matches = [];
      // h1: (<>...</>)  패턴에서 텍스트 추출
      const h1Regex = /h1\s*:\s*\(\s*<>([\s\S]*?)<\/>\s*\)/g;
      let m;
      while ((m = h1Regex.exec(content)) !== null) {
        const h1Text = m[1].replace(/<[^>]*>/g, '').trim();
        const forbidden = ['총정리', '완벽정리', '완벽 정리', '가이드', '완벽 가이드', '완전 가이드'];
        for (const word of forbidden) {
          if (h1Text.includes(word)) {
            const line = content.substring(0, m.index).split('\n').length;
            matches.push({
              line,
              text: `h1에 금지어 "${word}" 포함: "${h1Text.substring(0, 50)}"`,
            });
          }
        }
      }
      return matches;
    },
    fix: 'hero.h1에서 총정리/완벽정리/가이드 제거, 구체적 표현으로 교체',
  },

  // ── hero.h1 질문형 금지 ──
  {
    id: 'H1-002',
    severity: 'ERROR',
    component: 'SEO',
    description: 'hero.h1이 질문형 — h1은 타이틀형만 허용!',
    test: (content) => {
      const matches = [];
      const h1Regex = /h1\s*:\s*\(\s*<>([\s\S]*?)<\/>\s*\)/g;
      let m;
      while ((m = h1Regex.exec(content)) !== null) {
        const h1Text = m[1].replace(/<[^>]*>/g, '').replace(/\{[^}]*\}/g, '').trim();
        // 질문형 패턴: ~인가요? ~될까요? ~있나요? ~하나요? ~남을까요? 등
        if (/[?？]/.test(h1Text) || /(?:인가요|될까요|있나요|하나요|남을까요|둘까요|필요한가요|되나요|할까요)\s*[?？]?\s*$/.test(h1Text)) {
          const line = content.substring(0, m.index).split('\n').length;
          matches.push({
            line,
            text: `h1이 질문형: "${h1Text.substring(0, 60)}" → 타이틀형으로 변경`,
          });
        }
      }
      return matches;
    },
    fix: 'h1을 타이틀형으로 변경. 질문형(~인가요?/~될까요?)은 H2에만 사용',
  },

  // ── hero.h1에 | 구분자 필수 ──
  {
    id: 'H1-003',
    severity: 'ERROR',
    component: 'SEO',
    description: 'hero.h1에 | 구분자 없음 — h1 = meta.title 전체 (롱테일 | 연관 롱테일)',
    test: (content) => {
      const matches = [];
      const h1Regex = /h1\s*:\s*\(\s*<>([\s\S]*?)<\/>\s*\)/g;
      let m;
      while ((m = h1Regex.exec(content)) !== null) {
        const h1Text = m[1].replace(/<[^>]*>/g, '').replace(/\{[^}]*\}/g, '').trim();
        if (!h1Text.includes('|')) {
          const line = content.substring(0, m.index).split('\n').length;
          matches.push({
            line,
            text: `h1에 | 없음: "${h1Text.substring(0, 60)}" → meta.title 전체를 h1에 사용`,
          });
        }
      }
      return matches;
    },
    fix: 'h1 = meta.title 전체 (| 포함). 왼쪽만 쓰면 FAIL',
  },

  // ── [신규] pasBridge/bridgeCTA href 앵커(#) 금지 ──
  {
    id: 'HREF-001',
    severity: 'ERROR',
    component: '구조',
    description: 'pasBridge/bridgeCTA href에 앵커(#) 사용 (→ /w/슬러그로 변경)',
    test: (content) => {
      const matches = [];
      // pasBridge 또는 bridgeCTA 블록 내 href: '#...' 패턴
      const regex = /(pasBridge|bridgeCTA)\s*:\s*\{[\s\S]*?href\s*:\s*['"]#([^'"]+)['"]/g;
      let m;
      while ((m = regex.exec(content)) !== null) {
        const line = content.substring(0, m.index).split('\n').length;
        matches.push({
          line,
          text: `${m[1]}.href = "#${m[2]}" — 앵커(#) 금지, /w/슬러그로 변경 필요`,
        });
      }
      return matches;
    },
    fix: 'pasBridge/bridgeCTA의 href를 "/w/관련-스포크-슬러그" 형식으로 변경 (앵커 # 금지)',
  },

  // ── Checker 필수 (모든 스포크) ──
  {
    id: 'CHECKER-001',
    severity: 'ERROR',
    component: '구조',
    description: 'Checker import 없음 — 모든 스포크에 Checker 1개 필수!',
    test: (content, filePath) => {
      // 스포크에만 적용
      if (filePath && !filePath.includes('spoke')) return [];
      // Checker import가 있으면 OK (한글 import명도 매칭)
      if (/import\s+.+Checker/.test(content)) return [];
      return [{
        line: 1,
        text: 'Checker import 없음. 모든 스포크에 체커 1개 필수 (checker-patterns.md 참조)',
      }];
    },
    fix: 'checker-patterns.md 5유형 중 선택 → src/components/checkers/에 생성 → import + sections 첫 번째에 배치',
  },

  // ── Chips icon 이모지 필수 (영어 금지) ──
  {
    id: 'CHIPS-001',
    severity: 'ERROR',
    component: 'Chips',
    description: 'Chips icon에 영어 텍스트 사용 — 이모지만 허용!',
    test: (content) => {
      const matches = [];
      // Chips items 내 icon 값 추출
      const chipsRegex = /<Chips\s+items=\{\[([\s\S]*?)\]\}\s*\/>/g;
      let chipsMatch;
      while ((chipsMatch = chipsRegex.exec(content)) !== null) {
        const block = chipsMatch[1];
        const iconRegex = /icon\s*:\s*['"]([^'"]+)['"]/g;
        let iconMatch;
        while ((iconMatch = iconRegex.exec(block)) !== null) {
          const icon = iconMatch[1];
          // 영어 알파벳으로만 이루어진 값이면 ERROR (이모지/숫자는 OK)
          if (/^[a-zA-Z_-]+$/.test(icon)) {
            const line = content.substring(0, chipsMatch.index + iconMatch.index).split('\n').length;
            matches.push({
              line,
              text: `Chips icon="${icon}" — 영어 금지! 이모지 사용 (✅/📋/🏦/💰 등)`,
            });
          }
        }
      }
      return matches;
    },
    fix: 'Chips icon을 이모지로 변경: ✅, 📋, 🏦, 💰, 📅, ⚠️ 등',
  },

  // ── [신규] hub chips/sectionSpoke href가 /w/로 시작하는지 ──
  {
    id: 'HUBHREF-001',
    severity: 'ERROR',
    component: '구조',
    description: 'hub의 chips/sectionSpoke href가 /w/로 시작하지 않음',
    test: (content, filePath) => {
      // 허브에만 적용
      if (filePath && !filePath.includes('hub')) return [];
      const matches = [];
      // chips 또는 sectionSpoke 배열 내 href 검사
      const hrefRegex = /href\s*:\s*['"]([^'"]+)['"]/g;
      let m;
      while ((m = hrefRegex.exec(content)) !== null) {
        const href = m[1];
        // scrollTo, heroCTA의 #checker 등 페이지 내 앵커는 허용
        const before = content.substring(Math.max(0, m.index - 100), m.index);
        if (/scrollTo|heroCTA|stickyBar|sticky/.test(before)) continue;
        // 외부 URL은 허용
        if (href.startsWith('http')) continue;
        // /w/로 시작하지 않고 #으로 시작하면 ERROR
        if (href.startsWith('#') && !/(scrollTo|heroCTA|stickyBar|sticky)/.test(before)) {
          // bridgeCTA/pasBridge의 #은 HREF-001에서 잡으므로 여기서는 chips/sectionSpoke만
          if (/chips|sectionSpoke/.test(before)) {
            const line = content.substring(0, m.index).split('\n').length;
            matches.push({
              line,
              text: `href="${href}" — /w/슬러그로 변경 필요 (앵커 금지)`,
            });
          }
        }
      }
      return matches;
    },
    fix: 'chips/sectionSpoke의 href를 "/w/스포크-슬러그" 형식으로 변경',
  },

  // ── [신규] 내부링크 슬러그 실존 검증 ──
  {
    id: 'LINK-003',
    severity: 'ERROR',
    component: '인라인링크',
    description: '존재하지 않는 슬러그로 내부링크 — 404 발생!',
    test: (content) => {
      const matches = [];
      // 실존 슬러그 목록 빌드
      const existingSlugs = new Set();
      const dirs = ['src/data/spoke', 'src/data/hub', 'content/wiki'];
      const excludeFiles = ['types.ts', 'registry.ts', 'index.ts', 'index.tsx'];
      for (const d of dirs) {
        if (!fs.existsSync(d)) continue;
        for (const f of fs.readdirSync(d)) {
          if (excludeFiles.includes(f)) continue;
          if (f.endsWith('.tsx')) existingSlugs.add(f.replace('.tsx', ''));
          if (f.endsWith('.md')) existingSlugs.add(f.replace('.md', ''));
        }
      }
      // 파일 내 모든 /w/슬러그 href 검출
      const hrefRegex = /href:\s*['"]\/w\/([^'"]+)['"]/g;
      let m;
      while ((m = hrefRegex.exec(content)) !== null) {
        const slug = m[1];
        if (!existingSlugs.has(slug)) {
          const line = content.substring(0, m.index).split('\n').length;
          matches.push({
            line,
            text: `"/w/${slug}" — 해당 슬러그 파일이 존재하지 않음 (404)`,
          });
        }
      }
      // <a href="/w/..." 패턴도 검출
      const aRegex = /href="\/w\/([^"]+)"/g;
      while ((m = aRegex.exec(content)) !== null) {
        const slug = m[1];
        if (!existingSlugs.has(slug)) {
          const line = content.substring(0, m.index).split('\n').length;
          // 중복 방지: 같은 라인+슬러그가 이미 있으면 스킵
          if (!matches.some(x => x.line === line && x.text.includes(slug))) {
            matches.push({
              line,
              text: `"/w/${slug}" — 해당 슬러그 파일이 존재하지 않음 (404)`,
            });
          }
        }
      }
      // <Link href="/w/..." 패턴도 검출
      const linkRegex = /<Link\s+href="\/w\/([^"]+)"/g;
      while ((m = linkRegex.exec(content)) !== null) {
        const slug = m[1];
        if (!existingSlugs.has(slug)) {
          const line = content.substring(0, m.index).split('\n').length;
          if (!matches.some(x => x.line === line && x.text.includes(slug))) {
            matches.push({
              line,
              text: `"/w/${slug}" — 해당 슬러그 파일이 존재하지 않음 (404)`,
            });
          }
        }
      }
      return matches;
    },
    fix: '실존하는 슬러그로 교체하거나 해당 링크 제거. 존재하지 않는 페이지 링크는 404를 유발하여 SEO를 손상시킴',
  },

  // ── [신규] 체커 파일 내 앵커(#) 링크 금지 ──
  {
    id: 'CHECKER-HREF-001',
    severity: 'ERROR',
    component: 'Checker',
    description: '체커 링크에 앵커(#) 사용 — /w/슬러그 또는 외부 URL만 허용!',
    test: (content, filePath) => {
      // 체커 파일에만 적용
      if (!filePath || !filePath.includes('checkers')) return [];
      const matches = [];
      const hrefRegex = /href:\s*['"]#([^'"]+)['"]/g;
      let m;
      while ((m = hrefRegex.exec(content)) !== null) {
        const anchor = m[1];
        // tel: 같은 특수 프로토콜은 허용
        if (anchor.startsWith('tel:')) continue;
        const line = content.substring(0, m.index).split('\n').length;
        matches.push({
          line,
          text: `href="#${anchor}" — 체커 링크는 /w/슬러그 또는 외부 URL만 허용`,
        });
      }
      return matches;
    },
    fix: '체커의 href를 "/w/관련-스포크-슬러그" 형식으로 변경. 체커는 독립 컴포넌트이므로 같은 페이지 앵커(#)가 작동하지 않을 수 있음',
  },

  // ── [신규] 스포크 본문에 SpokeLinks 최소 2개 필수 ──
  {
    id: 'SPOKELINKS-001',
    severity: 'ERROR',
    component: 'SpokeLinks',
    description: '스포크 본문에 SpokeLinks가 2개 미만 — 최소 2개 섹션에 배치 필수!',
    test: (content, filePath) => {
      // 스포크 파일에만 적용 (허브/체커 제외)
      if (!filePath || !filePath.includes('spoke')) return [];
      if (filePath.includes('checkers') || filePath.includes('hub')) return [];
      // registry.ts, types.ts 등 제외
      const basename = path.basename(filePath);
      if (EXCLUDE_FILES.includes(basename)) return [];

      const spokeLinksCount = (content.match(/<SpokeLinks/g) || []).length;
      if (spokeLinksCount < 2) {
        return [{
          line: 1,
          text: `<SpokeLinks> ${spokeLinksCount}개 발견 (최소 2개 필수) — 본문 섹션 중 2개 이상에 SpokeLinks 배치`,
        }];
      }
      return [];
    },
    fix: '본문 4개 섹션 중 최소 2개에 <SpokeLinks title="[주제] 더 알아보기" items={[...]} /> 배치. 같은 허브 내 형제 스포크/허브로 연결',
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

// ─── 형제 스포크 간 컴포넌트 겹침 검사 ───

const SPOKE_VISUAL_COMPONENTS = [
  'SpokeTable', 'FormulaBox', 'TipBox', 'WarnBox', 'SpokeWarnBox',
  'DetailBox', 'Chips', 'SpokeLinks', 'Steps', 'SpokeTimeline',
  'SpokeStepCards', 'SpokeCompareCards', 'SpokeRateBars',
  'SpokeFlow', 'SpokeChecklist', 'RateCards', 'CalcLink',
];

function analyzeSiblings(files) {
  const results = [];
  // 스포크 파일만 필터
  const spokeFiles = files.filter(f => f.includes('spoke') && !f.includes('hub'));
  if (spokeFiles.length < 2) return results;

  // 각 파일의 hub URL과 사용 컴포넌트 추출
  const spokeData = [];
  for (const f of spokeFiles) {
    const content = fs.readFileSync(f, 'utf-8');
    const fileName = path.basename(f);

    // hub URL 추출
    const hubMatch = content.match(/hub\s*:\s*\{[\s\S]*?url\s*:\s*['"]([^'"]+)['"]/);
    const hubUrl = hubMatch ? hubMatch[1] : '';

    // 사용 컴포넌트 추출 (TipBox, WarnBox 같은 범용은 제외하고 비교)
    const genericComponents = ['TipBox', 'WarnBox', 'SpokeWarnBox'];
    const usedAll = SPOKE_VISUAL_COMPONENTS.filter(c => content.includes(`<${c}`));
    const usedUnique = usedAll.filter(c => !genericComponents.includes(c));

    // description 패턴 추출 (A/B/C 유형)
    const descMatch = content.match(/description\s*:\s*['"]([^'"]+)['"]/);
    const desc = descMatch ? descMatch[1] : '';
    let descPattern = '';
    // 패턴 판별 순서: 더 구체적인 것 먼저 (B→C→A)
    if (/고민|걱정|모르시겠|어렵|힘들/.test(desc)) descPattern = 'B-문제해결';
    else if (/^\d|사실.*아시|수익률.*\d|연평균.*\d|\d+%/.test(desc)) descPattern = 'C-숫자';
    else if (/아시나요|아셨나요|된다는 거|열렸다는/.test(desc)) descPattern = 'A-놀라움';

    spokeData.push({ file: f, fileName, hubUrl, usedAll, usedUnique, descPattern });
  }

  // 같은 허브에 속한 형제끼리 비교
  for (let i = 0; i < spokeData.length; i++) {
    for (let j = i + 1; j < spokeData.length; j++) {
      const a = spokeData[i];
      const b = spokeData[j];

      // 같은 허브가 아니면 스킵
      if (!a.hubUrl || a.hubUrl !== b.hubUrl) continue;

      // 고유 컴포넌트(TipBox/WarnBox 제외) 조합이 동일하면 ERROR
      const aSet = a.usedUnique.sort().join(',');
      const bSet = b.usedUnique.sort().join(',');
      if (aSet === bSet && aSet.length > 0) {
        results.push({
          file: a.fileName,
          filePath: a.file,
          rule: 'SIBLING-001',
          severity: 'ERROR',
          component: '고유성',
          description: `형제 스포크와 시각 컴포넌트 조합 동일: ${b.fileName}`,
          line: 0,
          text: `두 파일 모두 [${aSet}] 사용 — 최소 2종류 달라야 함`,
          fix: '형제 스포크와 최소 2종류 다른 컴포넌트 사용',
        });
      }

      // 고유 컴포넌트 차이가 2개 미만이면 WARNING
      if (aSet !== bSet) {
        const aArr = a.usedUnique;
        const bArr = b.usedUnique;
        const onlyInA = aArr.filter(c => !bArr.includes(c));
        const onlyInB = bArr.filter(c => !aArr.includes(c));
        const diff = Math.max(onlyInA.length, onlyInB.length);
        if (diff < 2) {
          results.push({
            file: a.fileName,
            filePath: a.file,
            rule: 'SIBLING-002',
            severity: 'WARNING',
            component: '고유성',
            description: `형제 스포크와 시각 컴포넌트 차이 ${diff}종류 (최소 2종류 필요): ${b.fileName}`,
            line: 0,
            text: `${a.fileName}: [${aSet}] vs ${b.fileName}: [${bSet}]`,
            fix: '형제 스포크와 최소 2종류 다른 컴포넌트 사용',
          });
        }
      }

      // description 패턴 같으면 WARNING
      if (a.descPattern && b.descPattern && a.descPattern === b.descPattern) {
        results.push({
          file: a.fileName,
          filePath: a.file,
          rule: 'SIBLING-003',
          severity: 'WARNING',
          component: '고유성',
          description: `형제 스포크와 description 패턴 동일 (${a.descPattern}): ${b.fileName}`,
          line: 0,
          text: `같은 허브 내 description 패턴 중복 — A/B/C 순환 필요`,
          fix: 'description을 다른 패턴(A-놀라움/B-문제해결/C-숫자)으로 변경',
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

// ─── stdin JSON 읽기 (PostToolUse 훅에서 호출 시) ───

function readStdin() {
  return new Promise((resolve) => {
    // 타임아웃 100ms — stdin이 없으면(CLI 직접 호출) 빈 문자열 반환
    const timeout = setTimeout(() => {
      process.stdin.destroy();
      resolve('');
    }, 100);

    let data = '';
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (chunk) => { data += chunk; });
    process.stdin.on('end', () => {
      clearTimeout(timeout);
      resolve(data);
    });
    process.stdin.on('error', () => {
      clearTimeout(timeout);
      resolve('');
    });

    // non-TTY일 때만 resume (TTY = 직접 실행)
    if (!process.stdin.isTTY) {
      process.stdin.resume();
    } else {
      clearTimeout(timeout);
      resolve('');
    }
  });
}

function extractFilePathFromHookInput(stdinData) {
  if (!stdinData || !stdinData.trim()) return null;
  try {
    const json = JSON.parse(stdinData);
    // PostToolUse: { tool_name: "Write", tool_input: { file_path: "..." } }
    if (json.tool_input && json.tool_input.file_path) {
      return json.tool_input.file_path;
    }
    // TaskCompleted: 전체 스포크/허브 디렉토리 검사
    if (json.hook_event_name === 'TaskCompleted') {
      return null; // 전체 디렉토리 검사 모드
    }
    return null;
  } catch (e) {
    return null;
  }
}

function isRelevantFile(filePath) {
  if (!filePath) return false;
  const normalized = filePath.replace(/\\/g, '/');
  // src/data/spoke/ 또는 src/data/hub/ 또는 src/components/checkers/ 내 .tsx 파일만 검사
  if (!normalized.includes('src/data/spoke/') && !normalized.includes('src/data/hub/') && !normalized.includes('src/components/checkers/')) return false;
  if (!normalized.endsWith('.tsx')) return false;
  if (EXCLUDE_FILES.includes(path.basename(filePath))) return false;
  return true;
}

// ─── 메인 ───

async function main() {
  // 1) CLI 인자 확인
  let target = process.argv[2];

  // 2) CLI 인자 없으면 stdin에서 읽기 (훅 모드)
  if (!target) {
    const stdinData = await readStdin();
    const hookFilePath = extractFilePathFromHookInput(stdinData);

    if (hookFilePath) {
      // PostToolUse 훅: 해당 파일만 검사
      if (!isRelevantFile(hookFilePath)) {
        // spoke/hub TSX 아닌 파일이면 스킵 (exit 0)
        process.exit(0);
      }
      // 절대경로로 변환
      target = path.isAbsolute(hookFilePath) ? hookFilePath : path.resolve(hookFilePath);
    } else if (stdinData && stdinData.trim()) {
      // TaskCompleted 등: 전체 디렉토리 검사
      target = './src/data/spoke/';
    } else {
      console.log('사용법: node verify-spoke-quality.js <파일 또는 디렉토리>');
      console.log('  예시: node verify-spoke-quality.js ./src/data/spoke/');
      console.log('  예시: node verify-spoke-quality.js ./src/data/spoke/실업급여-수급-조건.tsx');
      console.log('  (PostToolUse/TaskCompleted 훅에서는 stdin JSON으로 파일 경로 전달)');
      process.exit(1);
    }
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

  // 형제 스포크 간 겹침 검사 (디렉토리 검사 시 또는 파일 검사 시 같은 허브 형제도 검사)
  if (files.length >= 2) {
    allResults.push(...analyzeSiblings(files));
  } else if (files.length === 1 && files[0].includes('spoke')) {
    // 단일 파일이라도 같은 허브의 형제를 찾아서 비교
    const content = fs.readFileSync(files[0], 'utf-8');
    const hubMatch = content.match(/hub\s*:\s*\{[\s\S]*?url\s*:\s*['"]\/w\/([^'"]+)['"]/);
    if (hubMatch) {
      const hubSlug = hubMatch[1];
      const spokeDir = path.join(path.dirname(files[0]));
      const allSpokeFiles = getFiles(spokeDir);
      // 같은 허브에 속한 형제만 필터
      const siblings = allSpokeFiles.filter(f => {
        if (f === files[0]) return true; // 현재 파일 포함
        const c = fs.readFileSync(f, 'utf-8');
        return c.includes(`'/w/${hubSlug}'`) || c.includes(`"/w/${hubSlug}"`);
      });
      if (siblings.length >= 2) {
        const siblingResults = analyzeSiblings(siblings);
        // 단일 파일 모드: 타겟 파일이 관련된 에러만 반영 (다른 형제 간 에러는 보고만)
        const targetFileName = path.basename(files[0]);
        for (const r of siblingResults) {
          if (r.file === targetFileName || r.description.includes(targetFileName)) {
            allResults.push(r);
          } else {
            // 다른 형제 간 에러 → WARNING으로 보고만 (exit code 미반영)
            allResults.push({ ...r, severity: 'WARNING', description: `[참고] ${r.description}` });
          }
        }
      }
    }
  }

  const exitCode = printResults(allResults);

  // 훅 모드에서 ERROR 있으면 exit 2 (재작성 강제)
  if (exitCode > 0 && !process.argv[2]) {
    const errors = allResults.filter(r => r.severity === 'ERROR');
    const errorSummary = errors.map(e => `[${e.rule}] ${e.description}`).join('\n');
    process.stderr.write(`검증 실패: ERROR ${errors.length}개 발견\n${errorSummary}\n`);
    process.exit(2);  // exit 2 = 훅에서 blocking error (재작성 강제)
  }

  process.exit(exitCode);
}

main();
