'use client'

import GenericChecker from '@/components/GenericChecker'
import type { CheckerConfig, CheckerResult } from '@/data/checker-types'

const config: CheckerConfig = {
  title: 'ISA 가입 자격 체크',
  subtitle: '3가지만 확인하면 가입 가능 여부를 바로 알 수 있어요',
  intro: (
    <p>나이, 기존 ISA 보유 여부, 소득 수준을 선택하세요. 가입 가능 여부와 추천 유형을 안내해요.</p>
  ),
  groups: [
    {
      key: 'age',
      label: '나이',
      options: [
        { value: 'under19', text: '만 19세 미만' },
        { value: '19to34', text: '만 19~34세' },
        { value: 'over34', text: '만 35세 이상' },
      ],
    },
    {
      key: 'existing',
      label: '기존 ISA 계좌',
      options: [
        { value: 'none', text: '없음 (첫 개설)' },
        { value: 'have', text: '있음 (다른 곳에 보유 중)' },
      ],
    },
    {
      key: 'income',
      label: '작년 총급여',
      options: [
        { value: 'under5000', text: '5,000만원 이하' },
        { value: 'over5000', text: '5,000만원 초과' },
        { value: 'none', text: '소득 없음 (학생·무직)' },
      ],
    },
  ],
  evaluate: (sel): CheckerResult => {
    const ageOk = sel.age !== 'under19'
    const accountOk = sel.existing === 'none'
    const pass = ageOk && accountOk

    if (!pass) {
      const reasons: string[] = []
      if (!ageOk) reasons.push('만 19세 미만은 가입 불가')
      if (!accountOk) reasons.push('기존 ISA 해지 후 재개설 필요 (1인 1계좌)')

      return {
        pass: false,
        headline: '현재 조건으로는 바로 개설이 어려워요',
        detail: (
          <>{reasons.join('. ')}. {!accountOk && '기존 계좌를 해지하면 바로 새로 만들 수 있지만, 3년 의무기간이 리셋돼요.'}</>
        ),
        badges: [],
        links: [
          { icon: '📊', title: 'ISA 유형별 차이 확인', desc: '중개형·서민형 비교', href: '/w/ISA계좌-중개형-서민형-일반형-유형-선택-기준' },
          { icon: '💰', title: 'ISA 비과세 혜택 확인', desc: '가입 전에 혜택 먼저 파악', href: '/w/ISA계좌-비과세-한도-손익통산-절세-계산' },
        ],
      }
    }

    const recType = sel.income === 'over5000' ? '일반형' : '서민형'
    const exemptLimit = sel.income === 'over5000' ? 200 : 400

    return {
      pass: true,
      headline: 'ISA 가입이 가능해요',
      detail: (
        <>
          <p>
            만 19세 이상이고 기존 ISA가 없으니 바로 개설할 수 있어요.
            {sel.income === 'none' && ' 소득이 없어도 일반형으로 가입 가능해요. 비과세 200만원 혜택을 받아요.'}
            {sel.income === 'under5000' && ` 서민형 자격이 되니까 비과세 한도 ${exemptLimit}만원을 받을 수 있어요.`}
            {sel.income === 'over5000' && ' 일반형으로 개설하세요. 비과세 200만원 + 초과분 9.9% 분리과세 혜택이에요.'}
          </p>
        </>
      ),
      badges: [`${recType} 추천`, `비과세 ${exemptLimit}만원`, '비대면 5분'],
      links: [
        { icon: '📊', title: 'ISA 유형 선택 도우미', desc: '중개형·서민형 최적 조합 찾기', href: '/w/ISA계좌-중개형-서민형-일반형-유형-선택-기준' },
        { icon: '💰', title: 'ISA 절세 계산기', desc: '내 투자 금액 기준 절세액', href: '/w/ISA계좌-비과세-한도-손익통산-절세-계산' },
      ],
    }
  },
}

export default function ISA가입Checker() {
  return <GenericChecker config={config} />
}
