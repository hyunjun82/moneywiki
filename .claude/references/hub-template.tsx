/**
 * 허브 템플릿 — 복사 후 TODO 채우기
 *
 * 사용법:
 *   cp .claude/references/hub-template.tsx src/data/hub/[새슬러그].tsx
 *   → TODO 검색 → 전부 채우기 → TODO 0개 되면 완성
 *
 * 참고:
 *   골든 예시: .claude/references/hub-golden-example.tsx
 *   컴포넌트 API: .claude/references/spoke-api.md
 */

import { HubData } from './types'
import {
  SpokeTable, TipBox, SpokeTimeline, SpokeCompareCards,
  FormulaBox, SpokeRateBars, SpokeStepCards, SpokeWarnBox,
} from '@/components/spoke/SpokeBlocks'

export const TODO_변수명: HubData = {
  // TODO: export 변수명을 한글 슬러그 카멜케이스로 변경 (예: 개인파산신청자격조건)

  meta: {
    slug: '', // TODO: 키워드 결과의 slug
    title: '', // TODO: 키워드 결과의 title (변경 금지)
    description: '', // TODO: 키워드 결과의 description (변경 금지)
    keywords: [
      '', // TODO: keyword 1
      '', // TODO: keyword 2
      '', // TODO: keyword 3
      '', // TODO: keyword 4
    ],
    category: '', // TODO: '금융/채무', '세금', '부동산' 등
    datePublished: '', // TODO: YYYY-MM-DD
    dateModified: '', // TODO: YYYY-MM-DD
  },

  hero: {
    badge: '2026년 기준', // TODO: 연도 또는 기준 표시
    h1: (
      <>
        {/* TODO: 메인 타이틀 */}
        <br />
        <strong>{/* TODO: 서브 타이틀 */}</strong>
      </>
    ),
    intro: (
      <>
        <p>
          {/* TODO: 1~2문장 — 이 제도/주제가 뭔지 핵심 설명 (~예요체) */}
        </p>
        <p>
          {/* TODO: 1~2문장 — 이 글에서 다루는 범위 요약 + 동행 톤 */}
        </p>
      </>
    ),
    quickAnswer: {
      title: '핵심 요약',
      body: '', // TODO: 3~4줄 핵심 요약 (구체 숫자 포함)
      hook: '', // TODO: 스크롤 유도 문장
    },
  },

  /**
   * spokeGrid — 허브의 핵심 역할
   *
   * 규칙:
   * - 키워드 결과의 스포크를 전부 포함
   * - badge: 2~3글자 카테고리
   * - 순서: 사용자 여정 순 (자격 → 절차 → 서류 → 비용 → 지원)
   * - desc: 1줄 ~예요체
   */
  spokeGrid: [
    // TODO: 스포크 전체 목록 — 키워드 결과의 스포크 수만큼 추가
    { badge: '', title: '', desc: '', href: '/w/' },
    { badge: '', title: '', desc: '', href: '/w/' },
    { badge: '', title: '', desc: '', href: '/w/' },
    { badge: '', title: '', desc: '', href: '/w/' },
    { badge: '', title: '', desc: '', href: '/w/' },
    { badge: '', title: '', desc: '', href: '/w/' },
    { badge: '', title: '', desc: '', href: '/w/' },
    { badge: '', title: '', desc: '', href: '/w/' },
  ],

  /**
   * sections — H2 본문
   *
   * 규칙:
   * - H2 텍스트 = 키워드 결과의 H2 원문 그대로
   * - 단락 2~3개로 요약 (스포크보다 짧게)
   * - 매 H2 끝에 관련 스포크 링크 1~2개
   * - 시각 컴포넌트 0~1개 (전체 2~4개 제한)
   * - 마지막 { heading: null } → FAQ 자동 삽입
   */
  sections: [
    {
      heading: '', // TODO: H2-1 (키워드 결과 그대로)
      content: (
        <>
          <p>
            {/* TODO: 2~3문장 요약 */}
          </p>

          {/* TODO: 시각 컴포넌트 0~1개 (전체 2~4개 제한) */}

          <p>
            {/* TODO: 관련 스포크 링크 */}
            {/* 예:
            <a href="/w/스포크-슬러그" className="text-emerald-600 font-semibold hover:underline">
              스포크 제목
            </a>
            */}
          </p>
        </>
      ),
    },
    {
      heading: '', // TODO: H2-2
      content: (
        <>
          <p>
            {/* TODO: 2~3문장 요약 */}
          </p>

          {/* TODO: 시각 컴포넌트 0~1개 */}

          <p>
            {/* TODO: 관련 스포크 링크 */}
          </p>
        </>
      ),
    },
    {
      heading: '', // TODO: H2-3
      content: (
        <>
          <p>
            {/* TODO: 2~3문장 요약 */}
          </p>
          <p>
            {/* TODO: 관련 스포크 링크 */}
          </p>
        </>
      ),
    },
    {
      heading: '', // TODO: H2-4
      content: (
        <>
          <p>
            {/* TODO: 2~3문장 요약 */}
          </p>
          <p>
            {/* TODO: 관련 스포크 링크 */}
          </p>
        </>
      ),
    },
    {
      heading: null, // → FAQ 자동 삽입 위치 (이 항목 삭제 금지)
      content: null,
    },
  ],

  faq: [
    // TODO: 3~4개, H2와 겹치지 않는 일반 질문
    {
      question: '', // TODO
      answer: '', // TODO: HTML 허용 (<strong>, <a>)
    },
    {
      question: '', // TODO
      answer: '', // TODO
    },
    {
      question: '', // TODO
      answer: '', // TODO
    },
  ],

  sources: [
    // TODO: 최소 3개, 정부/법령 사이트 우선
    { label: '', url: '' },
    { label: '', url: '' },
    { label: '', url: '' },
  ],
}
