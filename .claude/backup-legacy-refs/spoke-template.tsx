/**
 * ══════════════════════════════════════════════════════════════════
 * SPOKE TEMPLATE v3 — 2-Layer Architecture (2026-02-19)
 * ══════════════════════════════════════════════════════════════════
 *
 * Layer 1: FIXED SKELETON (모든 글 동일, 훅이 강제 검증)
 * Layer 2: COMPOSITION (글마다 완전히 다른 시각화)
 *
 * ──────────────────────────────────────────────────────────────────
 * 사용법:
 *   1. 이 파일을 src/data/spoke/[슬러그].tsx 로 복사
 *   2. TODO 검색 → 전부 채우기
 *   3. [FIXED] 표시 = 형식 절대 변경 금지 (훅이 차단)
 *   4. [COMP] 표시 = 주제에 맞게 자유 구성 (글마다 다르게!)
 *
 * 참고:
 *   골든 예시 → .claude/references/spoke-golden-example.tsx
 *   타입 정의 → src/data/spoke/types.ts
 *   컴포넌트 → src/components/spoke/SpokeBlocks.tsx
 *   체커 패턴 → .claude/references/checker-patterns.md
 * ──────────────────────────────────────────────────────────────────
 *
 *
 * ═══════════════════════════════════════════
 * LAYER 1 — FIXED SKELETON (위반 시 훅 차단)
 * ═══════════════════════════════════════════
 *
 * ── 1. title [FIXED] ──────────────────────
 *   형식: "[롱테일 실제 검색어] | [연관 롱테일 실제 검색어]"
 *   규칙:
 *   - 60자 이내
 *   - 구분자 | (파이프) 사용. 콜론(:), 긴대시(—) 금지
 *   - "총정리", "완벽정리", "가이드" 금지
 *   - 앞뒤 모두 포털에서 실제로 검색되는 자연어
 *   - 질문형 금지 (질문은 H2에서)
 *
 *   GOOD: "2026 기초생활수급자 1인가구 생계급여 조건 | 소득인정액 계산 방법"
 *   BAD:  "기초생활수급자 총정리: 2026년 완벽 가이드"
 *
 * ── 2. description [FIXED] ────────────────
 *   형식: 구어체 2문장, 100~150자, keywords 3개+ 자연 포함
 *   패턴 (허브 내 중복 금지, A→B→C 순환):
 *     A. 놀라움형: "[사실]~라는 거 아시나요? [키워드] 알려드려요"
 *     B. 문제해결형: "[고민] 고민이시죠? [키워드] 방법을 알려드려요"
 *     C. 숫자형: "[숫자]~라는 사실, 알고 계셨나요? [키워드] 정리해드려요"
 *   금지: "~알아봅니다", "~확인하세요", 키워드 나열, "총정리"
 *
 * ── 3. h1 [FIXED] ─────────────────────────
 *   = meta.title 그대로 (| 포함). 질문형 금지.
 *   <span className="text-[#1E3A5F]">핵심 키워드</span> 강조 가능
 *
 * ── 4. TOC [FIXED] ────────────────────────
 *   첫 번째 = 체커 (checker)
 *   이후 = H2 질문형 4개 (sec-xxx)
 *   마지막 = FAQ (sec-faq)
 *   H3 시각화 제목 = sub: true 로 TOC에 포함
 *
 *   예시:
 *   toc: [
 *     { id: 'checker', label: '30초 자격 체크' },
 *     { id: 'sec-1', label: '2026년 선정기준은 얼마인가요?' },
 *       { id: 'tbl-standard', label: '급여별 선정기준 금액표', sub: true },
 *     { id: 'sec-2', label: '소득인정액은 어떻게 계산하나요?' },
 *     { id: 'sec-3', label: '부양의무자 기준은 폐지됐나요?' },
 *     { id: 'sec-4', label: '실수령액은 얼마인가요?' },
 *     { id: 'sec-faq', label: '자주 묻는 질문' },
 *   ]
 *
 * ── 5. H2 제목 [FIXED] ───────────────────
 *   형식: PAA 질문형 (~나요?, ~하나요?, ~인가요?)
 *   규칙: 베이스 키워드 반드시 포함, keywords 4개와 1:1 매칭
 *   BAD:  "면책 비용은 얼마인가요?"
 *   GOOD: "개인파산 면책까지 하면 추가 비용 있나요?"
 *
 * ── 6. pasBridge [FIXED 형식, COMP 내용] ──
 *   위치: 체커~마지막 직전 섹션 (보통 checker, sec-1 ~ sec-3)
 *   역할: 독자를 허브/형제 스포크/체커로 유도하는 큰 PAS 카드
 *
 *   구조:
 *   pasBridge: {
 *     href: '/w/형제-스포크-슬러그',     // 반드시 /w/ 내부링크
 *     question: '~아셨나요? / ~부담되시나요? / ~될 수 있을까요?',
 *     answer: <>1~2문장 해결 힌트</>,
 *     buttonText: '구체적 행동 + → (예: 자동차 재산 기준 확인 →)',
 *   }
 *
 *   question 3가지 패턴 (같은 글 내 반복 금지):
 *     놀라움: "~아셨나요?" / "~라는 거 아시나요?"
 *     공감:   "~부담되시나요?" / "~걱정이시죠?" / "~막막하시죠?"
 *     궁금증: "~될 수 있을까요?" / "~얼마를 받을 수 있을까?"
 *
 *   buttonText 규칙:
 *   - 구체적인 내용 + → (예: "자동차 재산 기준 확인 →")
 *   - 금지: "자세히 보기 →", "가이드 →", "바로가기 →"
 *
 *   href 대상:
 *   - 같은 허브 내 형제 스포크 (/w/슬러그)
 *   - 부모 허브 (/w/허브-슬러그)
 *   - 같은 글 체커 (#checker)
 *   - 외부 URL 금지, 앵커(#sec-xxx) 금지 (#checker만 예외)
 *
 * ── 7. bridgeCTA [FIXED] ──────────────────
 *   위치: 마지막 본문 섹션에만 (보통 sec-4 또는 sec-apply)
 *   역할: 작은 링크 카드 (pasBridge보다 간결)
 *
 *   구조:
 *   bridgeCTA: {
 *     href: '/w/관련-스포크-슬러그',
 *     badge: '2~3글자 카테고리',
 *     title: '독자 궁금증 유발 질문 (20자 이내)',
 *     desc: '1줄 설명 (40자 이내)',
 *     icon: 'check' | 'calc' | 'clock' | 'info' | 'grid',
 *   }
 *
 * ── 8. hubCTA [FIXED] ─────────────────────
 *   위치: hero.hubCTA (intro 바로 아래)
 *   역할: 부모 허브로 돌아가는 카드
 *
 *   구조:
 *   hubCTA: {
 *     badge: '2~3글자 (예: 전체 가이드)',
 *     desc: '허브 내용 요약 1줄',  // "확인하세요", "총정리" 금지!
 *   }
 *   title은 자동으로 hub.name 사용 (직접 지정 안 함)
 *
 * ── 9. intro [FIXED] ──────────────────────
 *   3줄 필수 + 4줄째 선택 (동행 톤)
 *   5유형 순환: A.상황공감 → B.숫자충격 → C.오해교정 → D.비교선택 → E.스토리
 *   같은 허브 내 형제끼리 같은 유형 금지
 *   금지: "확인해 보세요", "하고 계신가요?", "이 글 하나로 정리했어요"
 *
 * ── 10. 문체 [FIXED] ─────────────────────
 *   - 구어체 필수: ~이에요, ~해요, ~거든요, ~잖아요
 *   - ~습니다/~됩니다 금지 (관공서체)
 *   - 같은 문장 구조 3회 반복 금지
 *   - 같은 시작어 3회 반복 금지
 *   - 섹션당 4문장 이상
 *
 * ── 11. SpokeLinks [FIXED 형식] ───────────
 *   위치: 본문 4개 중 최소 2개 섹션에 배치
 *   대상: 같은 허브 형제 스포크 > 부모 허브 > 관련 허브 스포크
 *   금지: 실존하지 않는 슬러그, 자기 자신
 *
 * ── 12. sections 순서 [FIXED] ─────────────
 *   checker → sec-1 → sec-2 → sec-3 → sec-4 → [sec-apply] → sec-faq
 *   checker가 반드시 첫 번째! 중간/하단 배치 절대 금지.
 *
 *
 * ═══════════════════════════════════════════
 * LAYER 2 — COMPOSITION (글마다 완전히 다르게)
 * ═══════════════════════════════════════════
 *
 * 15개 컴포넌트 팔레트:
 *   SpokeTable     — 데이터 테이블 (subtitle 필수, 글당 2개 이하)
 *   FormulaBox     — 계산 공식 { lines: [{ text, comment?, numbered? }] }
 *   TipBox         — 팁/조언 (title + children JSX)
 *   WarnBox        — 경고 (children JSX만)
 *   SpokeWarnBox   — 제목 있는 경고 (title + children)
 *   DetailBox      — 번호 + 제목 + 설명 리스트
 *   Chips          — 4칩 클릭 가능 그리드
 *   SpokeLinks     — 관련 글 카드 리스트
 *   Steps          — 순서 절차 표시
 *   SpokeTimeline  — 타임라인 (month 필드, status 필드)
 *   SpokeStepCards — 카드형 절차 (steps prop, step 필드 없음)
 *   SpokeCompareCards — 비교 카드 (cards prop, subtitle 필수)
 *   SpokeRateBars  — 비율 바
 *   SpokeFlow      — 플로우 차트 (sub 필드)
 *   SpokeChecklist — 체크리스트
 *
 * 조합 규칙:
 *   - 4종류 이상 사용 (훅 검증)
 *   - 같은 컴포넌트 연속 배치 금지
 *   - SpokeTable 2개 이하
 *   - 주제에 따라 완전히 다른 조합 선택
 *
 * 조합 예시 (같은 패턴 반복 금지!):
 *   기초수급자 → SpokeTable + FormulaBox + Chips + DetailBox + Steps
 *   원천세     → SpokeTimeline + SpokeRateBars + FormulaBox + SpokeStepCards
 *   전세 vs 월세 → SpokeCompareCards + SpokeRateBars + TipBox + SpokeFlow
 *   실업급여   → SpokeChecklist + SpokeStepCards + SpokeTable + WarnBox
 *
 *
 * ═══════════════════════════════════════════
 * 빈출 오류 QUICK REFERENCE
 * ═══════════════════════════════════════════
 *
 * | 오류 | 수정 |
 * |------|------|
 * | SpokeTimeline `date` | → `month` |
 * | SpokeTimeline `highlight: true` | → `status: 'warning'` |
 * | SpokeFlow `desc` | → `sub` |
 * | TipBox `items` prop | → `children` JSX |
 * | RateCards `icon` | → icon 없음. `lines: string[]` 필수 |
 * | RateCards `highlightColor: 'neutral'` | → `'orange'` 또는 `'navy'` |
 * | Chips `icon`에 영어 | → 이모지만 (`'✅'`, `'📋'`) |
 * | h1 질문형 | → 타이틀형만 (질문은 H2에서) |
 * | SpokeTable `subtitle` 누락 | → 빌드 에러. 반드시 포함 |
 * | pasBridge.buttonText "자세히 보기" | → 구체적 내용 + → |
 * | hubCTA.desc "확인하세요" | → "정리돼요" / "볼 수 있어요" |
 * | SpokeCompareCards `items` | → `cards` prop. `subtitle` 필수 |
 * | SpokeStepCards `items` | → `steps` prop. `step` 필드 없음 |
 */

import type { SpokeData } from '@/data/spoke/types'
// ═══ 체커: 'use client' 래퍼 import (RSC 직렬화 안전) ═══
// ⚠️ GenericChecker + checkerConfig 직접 사용 금지! (500 에러)
// import XXXChecker from '@/components/checkers/XXXChecker'
// 래퍼 생성법: src/components/checkers/기초수급Checker.tsx 참고
//
// 체커 래퍼 파일 구조 (src/components/checkers/XXXChecker.tsx):
//   'use client'
//   import GenericChecker from '@/components/GenericChecker'
//   import type { CheckerConfig } from '@/data/checker-types'
//   const config: CheckerConfig = { title, subtitle, intro, groups, evaluate }
//   export default function XXXChecker() { return <GenericChecker config={config} /> }
import {
  SpokeTable, TipBox, FormulaBox, WarnBox,
  Chips, DetailBox, SpokeLinks, Steps,
  SpokeTimeline, SpokeStepCards, SpokeCompareCards,
  SpokeRateBars, SpokeFlow, SpokeChecklist, SpokeWarnBox,
} from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '', // TODO

  // ── [FIXED] title 형식: [롱테일] | [연관 롱테일], 60자 이내 ──
  meta: {
    title: '', // TODO: "2026 기초생활수급자 1인가구 생계급여 조건 | 소득인정액 계산 방법"
    description: '', // TODO: 구어체 2문장 100~150자, keywords 3개+ 포함
    keywords: [
      '', // TODO: keyword 1 — title 핵심 단어 조합
      '', // TODO: keyword 2
      '', // TODO: keyword 3
      '', // TODO: keyword 4
    ],
    ogTitle: '', // TODO: title + ' | 머니위키'
    ogDescription: '', // TODO: 1줄 요약 ("확인하세요" 금지)
  },

  hub: {
    url: '', // TODO: 허브 URL (/w/허브-슬러그)
    name: '', // TODO: 허브 이름
  },

  breadcrumb: [
    '', // TODO: 카테고리 (예: '복지')
    '', // TODO: 중간 (예: '기초생활보장')
    '', // TODO: 현재 글 (짧게, 예: '1인가구 생계급여')
  ],

  hero: {
    badge: '2026년 기준', // TODO: 연도 또는 기준
    // ── [FIXED] h1 = meta.title 그대로. 질문형 금지 ──
    h1: (
      <>
        {/* TODO: <span className="text-[#1E3A5F]">핵심</span> 강조 */}
      </>
    ),
    // ── [FIXED] intro: 3줄 필수, 5유형 순환 (A~E), "확인해 보세요" 금지 ──
    intro: (
      <p className="text-base text-neutral-500 leading-relaxed">
        {/* TODO: 구어체 3줄. 4줄째 선택 (동행 톤) */}
      </p>
    ),
    // ── [FIXED] hubCTA: 부모 허브 복귀 카드. title은 hub.name 자동 ──
    hubCTA: {
      badge: '', // TODO: '전체 가이드' 등 2~3글자
      desc: '', // TODO: 허브 요약 1줄 ("확인하세요"/"총정리" 금지)
    },
  },

  // ── [FIXED] TOC: checker → H2 4개 → FAQ. H3 시각화는 sub: true ──
  toc: [
    // TODO: 아래 형식대로 채우기
    // { id: 'checker', label: '30초 자격 체크' },
    // { id: 'sec-1', label: 'H2 질문형 제목' },
    //   { id: 'tbl-xxx', label: '테이블/시각화 제목', sub: true },
    // { id: 'sec-2', label: 'H2 질문형 제목' },
    // { id: 'sec-3', label: 'H2 질문형 제목' },
    // { id: 'sec-4', label: 'H2 질문형 제목' },
    // { id: 'sec-faq', label: '자주 묻는 질문' },
  ],

  // ── [FIXED] sections 순서: checker 반드시 첫 번째 ──
  sections: [

    // ═══════════════════════════════════════
    // CHECKER (첫 번째, 절대 이동 금지)
    // ═══════════════════════════════════════
    {
      id: 'checker',
      number: 'STEP 01',
      heading: '', // TODO: '내가 ○○ 대상인지 확인하기'
      subtitle: '', // TODO: '4가지만 선택하면 바로 알 수 있어요'
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            {/* TODO: 체커 설명 1~2문장 */}
          </p>
          {/* TODO: <XXXChecker /> — src/components/checkers/ 에 래퍼 생성 */}
        </>
      ),
      // ── [FIXED] pasBridge: 큰 PAS 카드 ──
      // question 패턴 3가지 중 선택 (같은 글 내 중복 금지):
      //   놀라움: "~아셨나요?"
      //   공감:   "~부담되시나요?" / "~걱정이시죠?"
      //   궁금증: "~될 수 있을까요?"
      pasBridge: {
        href: '', // TODO: /w/형제-스포크 (외부URL 금지, #sec-xxx 금지)
        question: '', // TODO: 놀라움/공감/궁금증 패턴
        answer: <>{/* TODO: 해결 힌트 1~2문장 */}</>,
        buttonText: '', // TODO: 구체적 내용 + → ("자세히 보기" 금지)
      },
    },

    // ═══════════════════════════════════════
    // SECTION 02 — [COMP] 시각화 자유 구성
    // ═══════════════════════════════════════
    {
      id: 'sec-1', // TODO
      number: 'SECTION 02',
      // ── [FIXED] H2: PAA 질문형, 베이스 키워드 포함 ──
      heading: '', // TODO: '베이스키워드 + 질문?' (예: "2026년 기초생활수급자 선정기준은 얼마인가요?")
      subtitle: '', // TODO: 1줄 부제
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            {/* TODO: 도입 텍스트 (텍스트가 주인공, 테이블 전에 설명) */}
          </p>

          {/* ═══ [COMP] 여기서부터 시각화 조합 — 주제에 맞게 자유 구성 ═══ */}
          {/*
           * 15개 팔레트에서 선택. 예시:
           *
           * <SpokeTable id="tbl-xxx" title="H3 제목" subtitle="부제" headers={[...]} rows={[...]} />
           * <FormulaBox lines={[{ text: '공식', comment: true }, { text: '값 = A + B' }]} />
           * <TipBox title="제목">children JSX</TipBox>
           * <WarnBox>children JSX</WarnBox>
           * <DetailBox title="제목" items={[{ heading: '항목', desc: '설명' }]} />
           * <Chips items={[{ icon: '✅', label: '항목', value: '값', href: '#id' }]} />
           * <Steps items={[{ title: '단계', desc: '설명' }]} />
           * <SpokeTimeline items={[{ month: '3월', title: '제목', desc: '설명' }]} />
           * <SpokeStepCards steps={[{ title: '제목', desc: '설명', tip: '선택 팁' }]} />
           * <SpokeCompareCards cards={[{ title: 'A', subtitle: '부제', items: ['특징1'] }, { title: 'B', subtitle: '부제', items: ['특징1'] }]} />
           * <SpokeRateBars items={[{ label: '항목', rate: 70, desc: '설명' }]} />
           * <SpokeFlow items={[{ title: '단계', sub: '설명' }]} />
           * <SpokeChecklist items={[{ text: '항목', checked: true }]} />
           * <SpokeWarnBox title="제목">children JSX</SpokeWarnBox>
           */}

          {/* ═══ SpokeLinks: 본문 중간 내부링크 (4섹션 중 2개 이상에 배치) ═══ */}
          {/*
           * <SpokeLinks
           *   title="더 알아보기"
           *   items={[
           *     { num: '01', heading: '형제 스포크 제목', desc: '설명', href: '/w/슬러그' },
           *   ]}
           * />
           */}
        </>
      ),
      // ── [FIXED] pasBridge: checker 것과 다른 question 패턴 사용 ──
      pasBridge: {
        href: '', // TODO: /w/형제-스포크
        question: '', // TODO: 다른 패턴 (놀라움/공감/궁금증)
        answer: <>{/* TODO */}</>,
        buttonText: '', // TODO: 구체적 내용 + →
      },
    },

    // ═══════════════════════════════════════
    // SECTION 03 — [COMP]
    // ═══════════════════════════════════════
    {
      id: 'sec-2', // TODO
      number: 'SECTION 03',
      heading: '', // TODO: [FIXED] PAA 질문형
      subtitle: '', // TODO
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            {/* TODO: 텍스트 먼저, 시각화는 뒤에 */}
          </p>
          {/* [COMP] 시각화 자유 구성 — sec-1과 다른 조합 */}
        </>
      ),
      pasBridge: {
        href: '', // TODO
        question: '', // TODO: 앞 섹션과 다른 패턴
        answer: <>{/* TODO */}</>,
        buttonText: '', // TODO
      },
    },

    // ═══════════════════════════════════════
    // SECTION 04 — [COMP]
    // ═══════════════════════════════════════
    {
      id: 'sec-3', // TODO
      number: 'SECTION 04',
      heading: '', // TODO: [FIXED] PAA 질문형
      subtitle: '', // TODO
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            {/* TODO */}
          </p>
          {/* [COMP] 시각화 자유 구성 */}
        </>
      ),
      pasBridge: {
        href: '', // TODO
        question: '', // TODO
        answer: <>{/* TODO */}</>,
        buttonText: '', // TODO
      },
    },

    // ═══════════════════════════════════════
    // SECTION 05 — 마지막 본문 → bridgeCTA 사용
    // ═══════════════════════════════════════
    {
      id: 'sec-4', // TODO
      number: 'SECTION 05',
      heading: '', // TODO: [FIXED] PAA 질문형
      subtitle: '', // TODO
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            {/* TODO */}
          </p>
          {/* [COMP] 시각화 자유 구성 */}
        </>
      ),
      // ── [FIXED] bridgeCTA: 마지막 섹션에만. pasBridge 대신 사용 ──
      bridgeCTA: {
        href: '', // TODO: /w/관련-스포크
        badge: '', // TODO: '2~3글자'
        title: '', // TODO: 독자 궁금증 유발 질문 (20자 이내)
        desc: '', // TODO: 1줄 설명 (40자 이내)
        icon: 'info', // 'check' | 'calc' | 'clock' | 'info' | 'grid'
      },
    },

    // ═══════════════════════════════════════
    // FAQ (마지막, content: null)
    // ═══════════════════════════════════════
    {
      id: 'sec-faq',
      number: '06',
      heading: '자주 묻는 질문',
      subtitle: '',
      content: null,
    },
  ],

  faq: [
    // TODO: 4~6개, H2 소제목과 겹치지 않는 질문
    // { question: '베이스키워드 + 질문?', answer: 'HTML 허용 (<strong>, <a>)' },
  ],

  relatedSpokes: [
    // TODO: 3~5개, 같은 허브 형제 스포크 우선
    // { badge: '2~3글자', title: '제목', desc: '설명', href: '/w/슬러그' },
  ],

  sources: [
    // TODO: 최소 2개, 정부/법령 사이트 우선
    // { name: '출처명', url: 'https://딥링크', org: '기관명' },
  ],

  // ═══ 선택 필드 (모두 옵셔널) ═══
  // summary3: [<>요약 1</>, <>요약 2</>, <>요약 3</>],
  // sourceBar: { badge: '출처', name: '기관명 + 근거', date: '2026.01' },
  // prevNext: { prev: { title: '이전 글', href: '/w/...' }, next: { title: '다음 글', href: '/w/...' } },
  // ── stickyBar (하단 고정 바) ──
  // ✅ href (다른 페이지 이동) — 대부분 이걸 사용!
  // stickyBar: { topLabel: '라벨', value: '핵심 수치', buttonText: '자연스러운 CTA →', href: '/w/관련-스포크-슬러그' },
  // ⚠️ scrollTo (같은 페이지 앵커) — 체커/계산기 등 같은 페이지 내 이동이 반드시 필요할 때만
  // stickyBar: { topLabel: '라벨', value: '값', buttonText: '바로 계산 →', scrollTo: '#checker' },
  // ※ 기본값은 href! scrollTo는 예외적으로만 사용. 같은 페이지 섹션은 TOC가 이미 처리함.
}

export default data
