'use client'

import GenericChecker from '@/components/GenericChecker'
import type { CheckerConfig, CheckerResult } from '@/data/checker-types'

const config: CheckerConfig = {
  title: '해외체류 수급정지 간편 체크',
  subtitle: '출국 목적과 기간을 선택하면 수급 가능 여부를 알 수 있어요',
  intro: (
    <p>
      실업급여 수급 중 해외에 나가면 실업인정이 안 돼서 수급이 정지돼요.
      다만 <strong>해외취업 목적</strong>이면 예외적으로 해외 실업인정이 가능해요.
    </p>
  ),
  groups: [
    {
      key: 'purpose',
      label: '출국 목적',
      options: [
        { value: 'travel', text: '해외여행 (관광)' },
        { value: 'family', text: '가족 방문·동거' },
        { value: 'study', text: '어학연수·자원봉사' },
        { value: 'job', text: '해외취업 구직 (면접·박람회)' },
        { value: 'working', text: '워킹홀리데이' },
      ],
    },
    {
      key: 'duration',
      label: '해외 체류 예정 기간',
      options: [
        { value: 'short', text: '1~2주 (실업인정일 전 귀국)' },
        { value: 'mid', text: '3~4주 (실업인정일 1회 포함)' },
        { value: 'long', text: '5주 이상 (실업인정일 2회 이상)' },
      ],
    },
    {
      key: 'report',
      label: '고용센터 사전 신고 여부',
      options: [
        { value: 'yes', text: '출국 전 신고할 예정' },
        { value: 'no', text: '아직 신고하지 않음' },
      ],
    },
  ],
  evaluate: (sel): CheckerResult => {
    const isJob = sel.purpose === 'job'
    const isShort = sel.duration === 'short'
    const reported = sel.report === 'yes'

    if (isJob && reported) {
      return {
        pass: true,
        headline: '해외취업 특례로 수급 유지가 가능해요',
        detail: (
          <>해외취업 목적으로 출국하고 사전에 재취업활동계획서를 제출하면,
          해외에서도 인터넷 실업인정 신청이 가능해요.
          면접 증빙, 채용공고 등 서류를 미리 준비하세요.</>
        ),
        badges: ['해외취업 특례', '수급 유지'],
        links: [
          { icon: '📋', title: '실업급여 실업인정 구직활동 방법', desc: '온라인 실업인정 신청 절차', href: '/w/실업급여-실업인정-구직활동-방법' },
          { icon: '🌐', title: '실업급여 해외체류 수급정지 규정', desc: '해외취업 특례 상세 조건', href: '/w/실업급여-해외체류-해외취업-수급정지-규정' },
        ],
      }
    }

    if (isShort && reported) {
      return {
        pass: true,
        headline: '실업인정일 전에 귀국하면 수급에 영향 없어요',
        detail: (
          <>실업인정일에 국내에 있으면 정상 수급돼요. 출국 전 고용센터에 일정을 알려두면 더 안전해요.
          다만 1차·4차 실업인정은 반드시 고용센터에 방문해야 해요.</>
        ),
        badges: ['정상 수급', '단기 체류'],
        links: [
          { icon: '📅', title: '실업급여 실업인정 구직활동 방법', desc: '실업인정일 일정 확인', href: '/w/실업급여-실업인정-구직활동-방법' },
          { icon: '🏢', title: '실업급여 고용센터 찾기', desc: '관할 고용센터 위치 확인', href: '/w/실업급여-고용센터-찾기-고용24-사용법' },
        ],
      }
    }

    const reasons: string[] = []
    if (!isJob) reasons.push('개인 사유 출국은 해외 실업인정 불가')
    if (!isShort) reasons.push('실업인정일을 놓치면 해당 회차 급여 미지급')
    if (!reported) reasons.push('사전 미신고 시 실업인정일 변경 불가')

    return {
      pass: false,
      headline: '해외체류 기간 동안 수급이 정지돼요',
      detail: (
        <>해당 사유: {reasons.join(', ')}.
        {!reported && ' 출국 전 반드시 고용센터(1350)에 신고하세요. 실업인정일 변경은 수급기간 중 1회만 가능해요.'}
        {sel.duration === 'long' && ' 장기 체류 시 12개월 수급기한도 함께 흘러가니 남은 소정급여일수를 다 못 받을 수 있어요.'}</>
      ),
      badges: ['수급 정지'],
      links: [
        { icon: '📞', title: '실업급여 고용센터 찾기', desc: '관할 고용센터 연락처 확인', href: '/w/실업급여-고용센터-찾기-고용24-사용법' },
        { icon: '⏳', title: '실업급여 수급기간 소정급여일수', desc: '남은 수급일수 확인', href: '/w/실업급여-수급기간-소정급여일수-기준' },
      ],
    }
  },
}

export default function 해외체류수급Checker() {
  return <GenericChecker config={config} />
}
