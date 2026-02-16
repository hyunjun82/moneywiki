'use client'

import GenericChecker from '@/components/GenericChecker'
import type { CheckerConfig, CheckerResult } from '@/data/checker-types'

const config: CheckerConfig = {
  title: '문화누리카드 받을 수 있을까?',
  subtitle: '3가지만 선택하면 신청 가능 여부와 자동재충전 대상인지 확인할 수 있어요',
  intro: (
    <p>
      문화누리카드는 <strong>6세 이상 기초생활수급자와 차상위계층</strong>이 대상이에요.
      아래에서 내 조건을 선택해 보세요.
    </p>
  ),
  groups: [
    {
      key: 'age',
      label: '나이',
      options: [
        { value: 'under6', text: '6세 미만 (2021년 이후 출생)' },
        { value: '6to12', text: '6~12세' },
        { value: '13to18', text: '13~18세 (청소년)' },
        { value: '19to59', text: '19~59세' },
        { value: '60to64', text: '60~64세 (준고령층)' },
        { value: 'over65', text: '65세 이상' },
      ],
    },
    {
      key: 'type',
      label: '수급 유형',
      options: [
        { value: 'livelihood', text: '생계급여 수급자' },
        { value: 'medical', text: '의료급여 수급자' },
        { value: 'housing', text: '주거급여 수급자' },
        { value: 'education', text: '교육급여 수급자' },
        { value: 'secondary', text: '차상위계층' },
        { value: 'none', text: '해당 없음' },
      ],
    },
    {
      key: 'existing',
      label: '기존 카드 보유 여부',
      options: [
        { value: 'used3', text: '있음 (작년 3만원 이상 사용)' },
        { value: 'usedLess', text: '있음 (작년 3만원 미만 사용)' },
        { value: 'none', text: '없음 (신규 신청)' },
      ],
    },
  ],
  evaluate: (sel): CheckerResult => {
    const ageOk = sel.age !== 'under6'
    const typeOk = sel.type !== 'none'
    const pass = ageOk && typeOk

    /* 추가 지원금 판정 */
    const isYouth = sel.age === '13to18'
    const isSemiElder = sel.age === '60to64'
    const extraAmount = (isYouth || isSemiElder) ? 1 : 0
    const totalAmount = 15 + extraAmount

    /* 자동재충전 판정 */
    const autoRecharge = sel.existing === 'used3' && pass

    if (pass) {
      const extraLabel = extraAmount > 0
        ? (isYouth ? '청소년 추가 1만원 포함' : '준고령층 추가 1만원 포함')
        : ''

      return {
        pass: true,
        headline: `문화누리카드 신청 가능해요`,
        detail: (
          <>
            {sel.type === 'secondary' ? '차상위계층' : '기초생활수급자'}으로 연 {totalAmount}만원을 지원받을 수 있어요.
            {extraLabel && ` ${extraLabel}이에요.`}
            {autoRecharge
              ? ' 작년에 3만원 이상 사용했기 때문에 별도 신청 없이 자동재충전돼요.'
              : sel.existing === 'usedLess'
                ? ' 작년 사용액이 3만원 미만이라 자동재충전은 안 되고, 새로 신청해야 해요.'
                : ' 신규 신청은 문화누리카드 누리집, 앱, 주민센터에서 할 수 있어요.'
            }
          </>
        ),
        amount: {
          value: `연 ${totalAmount}만원`,
          unit: '지원 금액',
        },
        badges: autoRecharge
          ? ['신청 가능', '자동재충전 대상']
          : ['신청 가능', `연 ${totalAmount}만원`],
        links: [
          { icon: '🎬', title: '문화누리카드 사용처 확인', desc: '영화, 공연, 여행 가맹점 검색', href: '/w/문화누리카드-사용처-잔액-확인-가맹점-소멸' },
          { icon: '📋', title: '문화누리카드 전체 안내', desc: '2026년 대상, 금액, 사용처 한눈에', href: '/w/2026-문화누리카드-신청-대상-사용처-금액' },
        ],
      }
    }

    /* fail: 미충족 사유 */
    const reasons: string[] = []
    if (!ageOk) reasons.push('6세 미만은 신청 대상이 아니에요')
    if (!typeOk) reasons.push('기초생활수급자 또는 차상위계층만 대상이에요')

    return {
      pass: false,
      headline: '현재 조건으로는 신청이 어려워요',
      detail: (
        <>
          {reasons.join('. ')}.
          {!typeOk && ' 수급자격이 새로 생기면 해당 연도에 신청할 수 있어요.'}
        </>
      ),
      badges: [],
      links: [
        { icon: '🔍', title: '기초생활수급자 자격 확인', desc: '소득인정액 기준 확인하기', href: '/w/기초생활수급자-1인가구-생계급여-조건-소득인정액' },
        { icon: '📞', title: '문화누리카드 문의', desc: 'ARS 1544-3412로 확인', href: '/w/2026-문화누리카드-신청-대상-사용처-금액' },
      ],
    }
  },
}

export default function 문화누리카드Checker() {
  return <GenericChecker config={config} />
}
