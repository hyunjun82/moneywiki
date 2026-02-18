'use client'

import GenericChecker from '@/components/GenericChecker'
import type { CheckerConfig, CheckerResult } from '@/data/checker-types'

const config: CheckerConfig = {
  title: '실업급여 기준기간 180일 충족 여부 확인하기',
  subtitle: '퇴직 전 18개월 내 근무일을 선택하면 수급 가능 여부를 알려드려요',
  intro: (
    <p>
      실업급여를 받으려면{' '}
      <a href="/w/실업급여-기준기간" className="text-emerald-700 underline">기준기간</a>(이직일 이전 18개월) 내에
      피보험단위기간이 <strong>180일 이상</strong>이어야 해요.
      질병·출산·육아 사유가 있다면{' '}
      <a href="/w/실업급여-피보험기간-180일-계산-합산-방법" className="text-emerald-700 underline">피보험기간 계산 방법</a>을 먼저 확인해 보세요.
    </p>
  ),
  groups: [
    {
      key: 'days',
      label: '퇴직 전 18개월 내 실제 근무일 수',
      options: [
        { value: 'under150', text: '150일 미만' },
        { value: '150to179', text: '150~179일' },
        { value: '180plus', text: '180일 이상' },
      ],
    },
    {
      key: 'extended',
      label: '기준기간 연장 사유 있어요?',
      options: [
        { value: 'none', text: '없음 (일반)' },
        { value: 'some', text: '질병·출산·육아 등 있음' },
      ],
    },
  ],
  evaluate: (sel): CheckerResult => {
    const days = sel.days
    const extended = sel.extended

    if (days === '180plus') {
      return {
        pass: true,
        headline: '수급 요건을 충족해요',
        detail: (
          <>
            퇴직 전 18개월 내 180일 이상 근무해서 <strong>기준기간 요건을 충족</strong>해요.
            비자발적 이직 등 다른 수급자격 조건도 함께 확인하세요.
          </>
        ),
        badges: ['180일 충족', '기준기간 요건 통과'],
        links: [
          {
            icon: '✅',
            title: '실업급여 수급 조건 전체 확인',
            desc: '비자발적 이직 등 나머지 요건 안내',
            href: '/w/실업급여-수급-조건-자격-요건-완벽정리',
          },
          {
            icon: '📋',
            title: '실업급여 신청 방법 절차',
            desc: '수급자격 신청부터 1차 실업인정까지',
            href: '/w/실업급여-신청-방법-절차-준비서류',
          },
        ],
      }
    }

    if (days === '150to179') {
      if (extended === 'some') {
        return {
          pass: true,
          headline: '기준기간 연장 신청하면 충족 가능해요',
          detail: (
            <>
              150~179일이지만 질병·출산·육아 등 연장 사유가 있다면 <strong>기준기간이 늘어나</strong> 180일 조건을 채울 가능성이 있어요.
              고용센터에서 연장 여부를 반드시 확인받아야 해요.
            </>
          ),
          badges: ['연장 신청 필요', '고용센터 확인 필수'],
          links: [
            {
              icon: '📋',
              title: '기준기간 연장 사유 확인',
              desc: '질병·출산·육아로 연장 가능한 경우',
              href: '/w/실업급여-기준기간',
            },
            {
              icon: '✅',
              title: '피보험기간 180일 계산 방법',
              desc: '여러 직장 합산 방법과 기준',
              href: '/w/실업급여-피보험기간-180일-계산-합산-방법',
            },
          ],
        }
      }
      return {
        pass: false,
        headline: '아직 180일 미달이에요',
        detail: (
          <>
            150~179일이면 아직 <strong>180일 기준에 미달</strong>해요.
            연장 사유(질병·출산·육아 등)가 없다면 현재 요건을 충족하지 못해요.
            이전 직장 근무기간도 기준기간 내라면 합산할 수 있으니 고용센터에 문의하세요.
          </>
        ),
        badges: ['미달', '합산 가능 여부 확인 필요'],
        links: [
          {
            icon: '📋',
            title: '피보험기간 180일 계산 방법',
            desc: '여러 직장 합산 방법과 기준',
            href: '/w/실업급여-피보험기간-180일-계산-합산-방법',
          },
          {
            icon: '✅',
            title: '실업급여 기준기간 안내',
            desc: '18개월 역산 기준과 연장 사유',
            href: '/w/실업급여-기준기간',
          },
        ],
      }
    }

    // under150
    return {
      pass: false,
      headline: '180일 기준에 많이 미달해요',
      detail: (
        <>
          150일 미만이면 기준기간(이직일 이전 18개월) 내 180일 요건을 충족하지 못해요.
          직장을 계속 다니거나 이전 직장 기간을 합산할 수 있는지{' '}
          <strong>고용센터에서 상담</strong>을 받아보세요.
        </>
      ),
      badges: ['요건 미충족', '상담 필요'],
      links: [
        {
          icon: '📋',
          title: '실업급여 기준기간 안내',
          desc: '18개월 역산 기준과 연장 사유',
          href: '/w/실업급여-기준기간',
        },
        {
          icon: '✅',
          title: '피보험기간 180일 계산 방법',
          desc: '여러 직장 합산 방법과 기준',
          href: '/w/실업급여-피보험기간-180일-계산-합산-방법',
        },
      ],
    }
  },
}

export default function 기준기간Checker() {
  return <GenericChecker config={config} />
}
