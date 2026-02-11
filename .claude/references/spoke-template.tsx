/**
 * 스포크 템플릿 — 복사 후 TODO 채우기
 *
 * 사용법:
 *   cp .claude/references/spoke-template.tsx src/data/spoke/[새슬러그].tsx
 *   → TODO 검색 → 전부 채우기 → TODO 0개 되면 완성
 *
 * 참고:
 *   골든 예시: .claude/references/spoke-golden-example.tsx
 *   컴포넌트 API: .claude/references/spoke-api.md
 */

import Link from 'next/link'
import type { SpokeData } from './types'
import {
  SpokeTable, TipBox, FormulaBox, RateCards,
  SpokeStepCards, SpokeCompareCards, SpokeRateBars,
  SpokeWarnBox, SpokeTimeline, SpokeFlow, SpokeChecklist,
} from '@/components/spoke/SpokeBlocks'

// --- 대용량 테이블 데이터는 여기에 분리 ---
// TODO: 테이블 데이터 (필요 시)

const data: SpokeData = {
  slug: '', // TODO: 키워드 결과의 slug

  meta: {
    title: '', // TODO: 키워드 결과의 title (변경 금지)
    description: '', // TODO: 키워드 결과의 description (변경 금지)
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
    '', // TODO: 현재 글 제목 (짧게)
  ],

  hero: {
    badge: '2026년 기준', // TODO: 연도 또는 기준 표시
    h1: (
      <>
        {/* TODO: h1 — 키워드 결과의 title 기반, <span className="text-emerald-600">강조</span> 포함 */}
      </>
    ),
    intro: (
      <>
        {/*
         * TODO: 4줄 공식
         * 1줄: 독자의 실제 상황 묘사 ("~싶었다면 잘 오셨어요")
         * 2줄: 이 글로 해결된다는 약속 ("~하나면 바로 알 수 있어요")
         * 3줄: 구체 숫자/범위 + 허브 연결 Link
         * 4줄: 동행 톤으로 첫 섹션 안내 ("먼저 ~부터 볼게요")
         *
         * ❌ 금지: "아래에서 확인해 보세요", "이 글 하나로 정리했어요"
         */}
        <p className="text-base text-neutral-500 leading-relaxed">
          {/* TODO: 1~2줄 */}
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          {/* TODO: 3~4줄 + <Link href="허브URL">허브명</Link> */}
        </p>
      </>
    ),
    hubCTA: {
      badge: '', // TODO: 2~3글자
      desc: '', // TODO: 허브 CTA 설명
    },
  },

  toc: [
    { id: 's1', text: '' }, // TODO: H2-1 (keyword 1 질문형)
    { id: 's2', text: '' }, // TODO: H2-2 (keyword 2 질문형)
    { id: 's3', text: '' }, // TODO: H2-3 (keyword 3 질문형)
    { id: 's4', text: '' }, // TODO: H2-4 (keyword 4 질문형)
    { id: 's5', text: '자주 묻는 질문' },
  ],

  sections: [
    /**
     * ===== S1 =====
     * 전환 스타일: A. 독자 대변형 ("~싶잖아요")
     * 시각 요소: TODO — 키워드 프리셋 S1 배치 사용
     */
    {
      id: 's1',
      number: '01',
      heading: '', // TODO: H2-1 (키워드 결과 그대로)
      subtitle: '', // TODO: 1줄 부제
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            {/* TODO: 도입 단락 — 개념 설명 + 출처 링크 */}
          </p>

          {/* TODO: 시각 컴포넌트 1 (프리셋 S1 첫째) */}
          {/* TODO: 시각 컴포넌트 2 (프리셋 S1 둘째) */}

          {/* 전환 문장 — A. 독자 대변형 */}
          <p className="text-neutral-600 mb-4 leading-relaxed">
            {/* TODO: "~싶잖아요" 스타일 전환 */}
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '', // TODO: 2~3글자
        title: '', // TODO: 독자가 궁금해할 질문
        desc: '', // TODO: 1줄 설명
        icon: 'calc', // TODO: check | calc | clock | info | grid
      },
    },

    /**
     * ===== S2 =====
     * 전환 스타일: B. 자연 호기심형 ("~궁금한 게 생기죠")
     * 시각 요소: TODO — 키워드 프리셋 S2 배치 사용
     */
    {
      id: 's2',
      number: '02',
      heading: '', // TODO: H2-2
      subtitle: '', // TODO
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            {/* TODO: 도입 단락 */}
          </p>

          {/* TODO: 시각 컴포넌트 1 (프리셋 S2 첫째) */}
          {/* TODO: 시각 컴포넌트 2 (프리셋 S2 둘째) */}

          {/* 전환 문장 — B. 자연 호기심형 */}
          <p className="text-neutral-600 mb-4 leading-relaxed">
            {/* TODO: "~궁금한 게 생기죠" 스타일 전환 */}
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '', // TODO
        title: '', // TODO
        desc: '', // TODO
        icon: 'info', // TODO
      },
    },

    /**
     * ===== S3 =====
     * 전환 스타일: E. 실용 연결형 ("~정리했어요")
     * 시각 요소: TODO — 키워드 프리셋 S3 배치 사용
     */
    {
      id: 's3',
      number: '03',
      heading: '', // TODO: H2-3
      subtitle: '', // TODO
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            {/* TODO: 도입 단락 */}
          </p>

          {/* TODO: 시각 컴포넌트 1 (프리셋 S3 첫째) */}
          {/* TODO: 시각 컴포넌트 2 (프리셋 S3 둘째) */}

          {/* 전환 문장 — E. 실용 연결형 */}
          <p className="text-neutral-600 mb-4 leading-relaxed">
            {/* TODO: "~정리했어요" 스타일 전환 */}
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '', // TODO
        title: '', // TODO
        desc: '', // TODO
        icon: 'info', // TODO
      },
    },

    /**
     * ===== S4 =====
     * 전환 스타일: 없음 (마지막 — primary CTA로 마무리)
     * 시각 요소: TODO — 키워드 프리셋 S4 배치 사용
     */
    {
      id: 's4',
      number: '04',
      heading: '', // TODO: H2-4
      subtitle: '', // TODO
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            {/* TODO: 도입 단락 */}
          </p>

          {/* TODO: 시각 컴포넌트 1 (프리셋 S4 첫째) */}
          {/* TODO: 시각 컴포넌트 2 (프리셋 S4 둘째) */}

          {/* S4는 전환 문장 없음 */}
        </>
      ),
      bridgeCTA: {
        href: '', // TODO: 허브 URL
        badge: '', // TODO
        title: '', // TODO
        desc: '', // TODO
        icon: 'calc', // TODO
        primary: true, // 마지막 섹션은 항상 primary
      },
    },

    /**
     * ===== S5: FAQ =====
     */
    {
      id: 's5',
      number: '05',
      heading: '자주 묻는 질문',
      subtitle: '자주 나오는 질문만 모았어요',
      content: null,
    },
  ],

  faq: [
    {
      question: '', // TODO: H2와 겹치지 않는 실무 질문 1
      answer: '', // TODO: HTML 허용 (<strong>, <a>)
    },
    {
      question: '', // TODO: H2와 겹치지 않는 실무 질문 2
      answer: '', // TODO
    },
  ],

  relatedSpokes: [
    // TODO: 관련 스포크 2~3개
    { badge: '', title: '', desc: '', href: '' },
    { badge: '', title: '', desc: '', href: '' },
  ],

  sources: [
    // TODO: 최소 3개, 정부/법령 사이트 우선
    { name: '', url: '', org: '' },
    { name: '', url: '', org: '' },
    { name: '', url: '', org: '' },
  ],
}

export default data
