'use client'

import GenericChecker from '@/components/GenericChecker'
import type { CheckerConfig, CheckerResult } from '@/data/checker-types'

const config: CheckerConfig = {
  title: '내 실업인정 차수에 구직활동 몇 번 해야 하나요?',
  subtitle: '차수를 선택하면 필요한 재취업 활동 횟수를 바로 확인할 수 있어요',
  intro: (
    <p>
      실업급여 수급 중{' '}
      <a href="/w/실업급여-실업인정-구직활동-방법" className="text-emerald-700 underline">구직활동 요건</a>은{' '}
      <strong>차수마다 달라요</strong>.
      1차는 온라인 교육만, 2~4차는 1회, 5차 이후는 2회(구직활동 1회 필수)예요.
      자세한 증빙 방법과{' '}
      <a href="/w/실업급여-신청-방법-절차-준비서류" className="text-emerald-700 underline">신청 절차</a>도 함께 확인해 보세요.
    </p>
  ),
  groups: [
    {
      key: 'round',
      label: '현재 실업인정 차수',
      options: [
        { value: '1st', text: '1차 실업인정 (첫 번째)' },
        { value: '2to4', text: '2~4차 실업인정' },
        { value: '5plus', text: '5차 이후 실업인정' },
      ],
    },
  ],
  evaluate: (sel): CheckerResult => {
    if (sel.round === '1st') {
      return {
        pass: true,
        headline: '1차는 온라인 교육 이수만 하면 돼요',
        detail: (
          <>
            1차 실업인정은 구직활동 없이{' '}
            <strong>수급자격자 온라인 교육 1시간 이수</strong>로 대체돼요.
            고용24 앱·웹사이트에서 수강하면 자동으로 1차 실적이 처리돼요.
          </>
        ),
        badges: ['온라인 교육', '구직활동 불필요'],
        links: [
          {
            icon: '📋',
            title: '실업급여 신청 방법 절차',
            desc: '수급자격 신청부터 1차 실업인정까지',
            href: '/w/실업급여-신청-방법-절차-준비서류',
          },
          {
            icon: '🔍',
            title: '실업인정 방법 온라인 출석',
            desc: '실업인정일 전 미리 확인하는 방법',
            href: '/w/실업급여-실업인정-구직활동-방법',
          },
        ],
      }
    }

    if (sel.round === '2to4') {
      return {
        pass: true,
        headline: '2~4차는 재취업 활동 1회 이상이면 돼요',
        detail: (
          <>
            구직활동(입사지원·면접)이나 구직외활동(취업특강·직업훈련) 중{' '}
            <strong>1가지만 해도 인정</strong>돼요. 워크넷에서 입사지원하면 자동으로
            기록되니 가장 쉬운 방법이에요.
          </>
        ),
        badges: ['재취업 활동 1회', '구직/구직외 선택 가능'],
        links: [
          {
            icon: '✅',
            title: '워크넷 입사지원으로 인정받기',
            desc: '고용24 자동 연동으로 편리하게',
            href: '/w/실업급여-구직활동',
          },
          {
            icon: '📋',
            title: '실업인정 구직활동 방법',
            desc: '온라인 실업인정 신청 절차',
            href: '/w/실업급여-실업인정-구직활동-방법',
          },
        ],
      }
    }

    // 5차 이후
    return {
      pass: true,
      headline: '5차 이후는 재취업 활동 2회, 구직활동 1회는 필수예요',
      detail: (
        <>
          <strong>구직활동(입사지원·면접) 1회 포함</strong>해서 총 2회 이상이 필요해요.
          1일 1회만 인정되니 이틀에 나눠서 활동해야 해요.
          반복수급자·장기수급자는 주기가 더 짧아질 수 있어요.
        </>
      ),
      badges: ['재취업 활동 2회', '구직활동 1회 필수'],
      links: [
        {
          icon: '✅',
          title: '구직활동 인정 기준 확인',
          desc: '인정되는 활동 유형과 증빙 방법',
          href: '/w/실업급여-구직활동',
        },
        {
          icon: '⚠️',
          title: '반복수급 감액 대기기간',
          desc: '5차 이후 요건이 엄격해지는 이유',
          href: '/w/실업급여-반복수급-감액-대기기간-2026-개정',
        },
      ],
    }
  },
}

export default function 구직활동차수Checker() {
  return <GenericChecker config={config} />
}
