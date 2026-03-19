/**
 * 허브 템플릿 — 복사 후 TODO 채우기
 *
 * 사용법:
 *   cp .claude/references/hub-template.tsx src/data/hub/[새슬러그].tsx
 *   → TODO 검색 → 전부 채우기 → TODO 0개 되면 완성
 *
 * 참고:
 *   골든 예시: .claude/references/hub-golden-example.tsx
 *   타입 정의: src/data/hub/types.ts
 *   허브 컴포넌트: src/components/hub/HubBlocks.tsx
 *
 * ⚠️ 절대 규칙:
 * - HubTable, HubTipBox, HubFormula, HubWarnBox 사용 (Spoke용 X)
 * - CSS 비표준 색상 → inline style 필수 (Tailwind JIT 미생성)
 * - sections[].tag 형식: "01 개요", "02 기준" 등
 * - spokeGroups: { title, spokes: [{ slug, title, desc, badge }] }
 * - sources: { name, url, org }
 */

import type { HubData } from './types'
import { HubTable, HubTipBox, HubFormula, HubWarnBox } from '@/components/hub/HubBlocks'
import { CalcLink } from '@/components/spoke/SpokeBlocks'
// ═══ 체커 사용 시: 자체 포함 'use client' 래퍼 컴포넌트 사용 ═══
// ⚠️ GenericChecker + checkerConfig 직접 사용 금지! (RSC 직렬화 500 에러)
// import XXXChecker from '@/components/checkers/XXXChecker'
// → sections 내 content: (<><XXXChecker /></>)
// → 래퍼 생성법: src/components/checkers/기초수급Checker.tsx 참고

const data: HubData = {
  slug: '', // TODO: 키워드 결과의 slug

  meta: {
    title: '', // TODO: 키워드 결과의 title
    description: '', // TODO: 키워드 결과의 description
    keywords: [
      '', // TODO: keyword 1
      '', // TODO: keyword 2
      '', // TODO: keyword 3
      '', // TODO: keyword 4
    ],
    ogTitle: '', // TODO: title + ' | 머니위키'
    ogDescription: '', // TODO: 1줄 요약
  },

  category: '', // TODO: '복지/기초생활보장', '세금', '부동산' 등

  hero: {
    badge: '2026년 최신', // TODO: 연도 또는 기준 표시
    tags: ['', ''], // TODO: 2~3개 태그
    h1: (
      <>
        {/* TODO: 제목. <em>강조</em> 가능 */}
      </>
    ),
    subtitle: '', // TODO: 1줄 부제 (~이에요/~해요)
    // intro, stats는 옵셔널
  },

  toc: [
    // TODO: H2 목록 + H3(sub: true) 포함
    // { id: 'sec-xxx', text: 'H2 제목' },
    // { id: 'sub-xxx', text: 'H3 제목', sub: true },
  ],

  sections: [
    // TODO: 각 섹션 추가
    // {
    //   id: 'sec-xxx',
    //   tag: '01 개요',
    //   heading: 'H2 질문형 제목',
    //   subtitle: '1줄 부제',
    //   content: (<>...</>),
    //   sectionSpoke: [
    //     { icon: '💰', title: '관련 스포크 제목', desc: '설명', href: '/w/slug' },
    //   ],
    //   bridgeCTA: {
    //     href: '#next-section',
    //     badge: '2~3글자',
    //     title: '독자가 궁금해할 질문',
    //     desc: '1줄 설명',
    //   },
    // },
  ],

  faq: [
    // TODO: 3~6개, H2와 겹치지 않는 질문
    // { question: '질문?', answer: 'HTML 허용 (<strong>, <a>)' },
  ],

  spokeGroups: [
    // TODO: 그룹별 스포크 목록
    // {
    //   title: '💰 그룹명',
    //   spokes: [
    //     { slug: 'slug', title: '제목', desc: '설명', badge: '2~3글자' },
    //   ],
    // },
  ],

  sources: [
    // TODO: 최소 3개, 정부/법령 사이트 우선
    // { name: '출처명', url: 'https://...', org: '기관명' },
  ],

  // ═══ 선택 필드 (모두 옵셔널) ═══
  // summary: [<>요약 1</>, <>요약 2</>, <>요약 3</>],
  // source: { name: '기관명', date: '2026.01' },
  // chips: [{ icon: '💰', label: '라벨', value: '값', href: '#id' }],
  // heroCTA: { href: '#id', question: '질문?', answer: <>답변</>, buttonText: '버튼 텍스트' },
  // sticky: { label: '라벨', value: '값', ctaText: '버튼', ctaTarget: '#id' },
  // prevNext: { prev: { title: '이전 글', href: '/w/...' }, next: { title: '다음 글', href: '/w/...' } },
}

export default data
