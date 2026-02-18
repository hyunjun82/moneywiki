'use client'

import GenericChecker from '@/components/GenericChecker'
import type { CheckerConfig, CheckerResult } from '@/data/checker-types'

const config: CheckerConfig = {
  title: '내 실업급여 기초일액 바로 확인하기',
  subtitle: '퇴직 전 월급 구간을 선택하면 예상 기초일액을 알려드려요',
  intro: (
    <p>
      <a href="/w/실업급여-기초일액" className="text-emerald-700 underline">기초일액</a>은
      퇴직 전 3개월 평균임금을 기준으로 계산해요.
      2026년 기준 1일 최대 68,100원, 최소 66,048원이에요.
      월급에 따라{' '}
      <a href="/w/실업급여-2026-개정-상한액-하한액-인상-변경" className="text-emerald-700 underline">상한액·하한액</a> 중 하나가 적용될 가능성이 높아요.
    </p>
  ),
  groups: [
    {
      key: 'salary',
      label: '퇴직 전 3개월 평균 월급 (세전 기준)',
      options: [
        { value: 'low', text: '330만원 미만' },
        { value: 'mid', text: '330만원 이상 ~ 342만원 미만' },
        { value: 'high', text: '342만원 이상' },
      ],
    },
  ],
  evaluate: (sel): CheckerResult => {
    const salary = sel.salary

    if (salary === 'high') {
      return {
        pass: true,
        headline: '상한액 1일 68,100원이 적용돼요',
        detail: (
          <>
            월급 342만원 이상이면 평균임금 × 60% 계산 결과가 상한액보다 높아서{' '}
            <strong>1일 68,100원(상한액)</strong>으로 고정돼요.
            월급이 400만원이든 500만원이든 상한액을 초과할 수 없어요.
          </>
        ),
        badges: ['상한액 적용', '1일 68,100원'],
        links: [
          {
            icon: '💰',
            title: '실업급여 상한·하한액 변경 내용',
            desc: '2026년 상한액 인상 배경과 적용 기준',
            href: '/w/실업급여-2026-개정-상한액-하한액-인상-변경',
          },
          {
            icon: '📋',
            title: '실업급여 기초일액 계산 방법',
            desc: '평균임금 60% 공식과 상·하한 적용 사례',
            href: '/w/실업급여-기초일액',
          },
        ],
      }
    }

    if (salary === 'mid') {
      return {
        pass: true,
        headline: '계산 결과에 따라 66,048~68,100원이에요',
        detail: (
          <>
            330~342만원 구간은 실제 계산 결과가 66,048원(하한액)과 68,100원(상한액) 사이에 있어요.
            정확한 금액은 <strong>월급 ÷ 30 × 60%</strong>로 계산하면 돼요.
            대부분 이 구간에서도 하한액이나 상한액에 근접하게 나와요.
          </>
        ),
        badges: ['상·하한 경계 구간', '직접 계산 필요'],
        links: [
          {
            icon: '💰',
            title: '실업급여 기초일액 계산 방법',
            desc: '평균임금 60% 공식과 상·하한 적용 사례',
            href: '/w/실업급여-기초일액',
          },
          {
            icon: '📋',
            title: '실업급여 금액 계산 연봉별 수령액',
            desc: '연봉별 실업급여 예상 수령액 정리',
            href: '/w/실업급여-금액-계산-연봉별-수령액',
          },
        ],
      }
    }

    // low: 330만원 미만
    return {
      pass: true,
      headline: '하한액 1일 66,048원이 적용돼요',
      detail: (
        <>
          월급 330만원 미만이면 평균임금 × 60% 계산 결과가 하한액보다 낮아서{' '}
          <strong>1일 66,048원(하한액)</strong>으로 고정돼요.
          월급이 200만원이든 300만원이든 최소 하한액은 보장받아요.
        </>
      ),
      badges: ['하한액 적용', '1일 66,048원'],
      links: [
        {
          icon: '💰',
          title: '실업급여 상한·하한액 변경 내용',
          desc: '2026년 하한액 기준과 최저임금 연동 방식',
          href: '/w/실업급여-2026-개정-상한액-하한액-인상-변경',
        },
        {
          icon: '📋',
          title: '실업급여 기초일액 계산 방법',
          desc: '평균임금 60% 공식과 상·하한 적용 사례',
          href: '/w/실업급여-기초일액',
        },
      ],
    }
  },
}

export default function 기초일액Checker() {
  return <GenericChecker config={config} />
}
