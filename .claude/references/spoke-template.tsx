/**
 * 스포크 템플릿 — 복사 후 TODO 채우기
 *
 * 사용법:
 *   cp .claude/references/spoke-template.tsx src/data/spoke/[새슬러그].tsx
 *   → TODO 검색 → 전부 채우기 → TODO 0개 되면 완성
 *
 * 참고:
 *   골든 예시: .claude/references/spoke-golden-example.tsx
 *   타입 정의: src/data/spoke/types.ts
 *   스포크 컴포넌트: src/components/spoke/SpokeBlocks.tsx
 *
 * ⚠️ 절대 규칙:
 * - SpokeTable, TipBox, FormulaBox 등 Spoke용 컴포넌트 사용 (Hub용 X)
 * - toc: label 사용 (hub는 text)
 * - FormulaBox: { lines: [{ text, comment?, numbered? }] }
 * - sources: { name, url, org }
 * - relatedSpokes: { badge, title, desc, href }
 *
 * ⚠️ 컴포넌트 팔레트 (다양하게 사용!):
 * - SpokeTable: 데이터 테이블
 * - FormulaBox: 계산 공식
 * - TipBox: 팁/조언 (title + children)
 * - WarnBox: 경고/주의 (children만)
 * - DetailBox: 번호 + 제목 + 설명 리스트
 * - Chips: 4칩 클릭 가능 그리드
 * - SpokeLinks: 관련 글 카드 리스트
 * - Steps: 순서 절차 표시
 * - SpokeTimeline: 타임라인
 * - SpokeStepCards: 카드형 절차
 * - SpokeCompareCards: 비교 카드
 * - SpokeRateBars: 비율 바
 * - SpokeFlow: 플로우 차트
 * - SpokeChecklist: 체크리스트
 * - SpokeWarnBox: 제목 있는 경고 (title + children)
 */

import type { SpokeData } from '@/data/spoke/types'
// ═══ 체커 담당 스포크: 자체 포함 'use client' 래퍼 사용 ═══
// ⚠️ GenericChecker + checkerConfig 직접 사용 금지! (RSC 직렬화 500 에러)
// import XXXChecker from '@/components/checkers/XXXChecker'
// → content 안에서: <XXXChecker />
// → 래퍼 생성법: src/components/checkers/기초수급Checker.tsx 참고
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

// ═══ 체커 (설계도에 has_checker: true인 스포크만) ═══
// 참조: .claude/references/checker-patterns.md (5가지 유형)
// 유형 A: 자격판정 | B: 계산 | C: 비교 | D: 세금/공제 | E: 구간판정
//
// ⚠️ 체커는 별도 래퍼 파일에 작성! (이 파일이 아님)
// → src/components/checkers/XXXChecker.tsx 에 작성
// → 이 spoke에서는 import 후 content 안에서 <XXXChecker /> 사용

const data: SpokeData = {
  slug: '', // TODO: 키워드 결과의 slug

  meta: {
    title: '', // TODO: 키워드 결과의 title
    description: '', // TODO: ~해요 패턴
    keywords: [
      '', // TODO: keyword 1
      '', // TODO: keyword 2
      '', // TODO: keyword 3
      '', // TODO: keyword 4
    ],
    ogTitle: '', // TODO: title + ' | 머니위키'
    ogDescription: '', // TODO: 1줄 요약
  },

  hub: {
    url: '', // TODO: 허브 URL (예: '/w/허브-슬러그')
    name: '', // TODO: 허브 이름
  },

  breadcrumb: [
    '', // TODO: 카테고리 (예: '세금')
    '', // TODO: 중간 (예: '연말정산')
    '', // TODO: 현재 글 제목 (짧게)
  ],

  hero: {
    badge: '2026년 기준', // TODO: 연도 또는 기준 표시
    h1: (
      <>
        {/* TODO: h1 — <span className="text-[#1E3A5F]">강조</span> 가능 */}
      </>
    ),
    intro: (
      <p className="text-base text-neutral-500 leading-relaxed">
        {/* TODO: 1~2줄 소개 (~해요체) */}
      </p>
    ),
    hubCTA: {
      badge: '', // TODO: 2~3글자
      desc: '', // TODO: 허브 CTA 설명
    },
  },

  toc: [
    // TODO: 섹션별 목차 (label 사용!)
    // { id: 's1', label: 'H2-1 질문형 제목' },
    // { id: 's2', label: 'H2-2 질문형 제목' },
    // { id: 's3', label: 'H2-3 질문형 제목' },
    // { id: 's4', label: 'H2-4 질문형 제목' },
    // { id: 's5', label: '자주 묻는 질문' },
  ],

  sections: [
    // TODO: 각 섹션 추가
    // {
    //   id: 's1',
    //   number: 'SECTION 01',     // 또는 'STEP 01'
    //   heading: 'H2 질문형 제목',
    //   subtitle: '1줄 부제',
    //   content: (<>...</>),
    //   // content 안에서 <XXXChecker /> 사용 (체커 래퍼는 src/components/checkers/ 에 별도 생성)
    //   // pasBridge: { href, question, answer, buttonText },  // 큰 PAS 카드
    //   // bridgeCTA: { href, badge, title, desc, icon },      // 작은 링크 카드
    // },
    //
    // 마지막 FAQ 섹션:
    // { id: 's-faq', number: '06', heading: '자주 묻는 질문', subtitle: '', content: null },
  ],

  faq: [
    // TODO: 4~6개, H2와 겹치지 않는 질문
    // { question: '질문?', answer: 'HTML 허용 (<strong>, <a>)' },
  ],

  relatedSpokes: [
    // TODO: 관련 스포크 3~5개
    // { badge: '2~3글자', title: '제목', desc: '설명', href: '/w/slug' },
  ],

  sources: [
    // TODO: 최소 2개, 정부/법령 사이트 우선
    // { name: '출처명', url: 'https://...', org: '기관명' },
  ],

  // ═══ 선택 필드 (모두 옵셔널) ═══
  // summary3: [<>요약 1</>, <>요약 2</>, <>요약 3</>],
  // sourceBar: { badge: '출처', name: '기관명 + 근거', date: '2026.01' },
  // prevNext: { prev: { title: '이전 글', href: '/w/...' }, next: { title: '다음 글', href: '/w/...' } },
  // stickyBar: { topLabel: '라벨', value: '값', buttonText: '버튼', scrollTo: '#id' },
}

export default data
