'use client'

import GenericChecker from '@/components/GenericChecker'
import type { CheckerConfig, CheckerResult } from '@/data/checker-types'

const config: CheckerConfig = {
  title: '공무원·교사 실업급여 수급 가능 여부 체크',
  subtitle: '직종과 고용보험 가입 상태만 선택하면 돼요',
  intro: (
    <p>
      공무원이라도 유형에 따라 <strong>고용보험 가입이 가능</strong>하고,
      가입했다면 실업급여를 받을 수 있어요. 아래에서 확인해 보세요.
    </p>
  ),
  groups: [
    {
      key: 'type',
      label: '직종 유형',
      options: [
        { value: 'regular', text: '정규직 공무원 (일반직·특정직)' },
        { value: 'special', text: '별정직·임기제 공무원' },
        { value: 'public_teacher', text: '국공립학교 정규 교사' },
        { value: 'private_pension', text: '사립학교 교원 (사학연금 가입)' },
        { value: 'private_no_pension', text: '사립 기간제 교사 (사학연금 미가입)' },
        { value: 'academy', text: '학원 강사·시간강사' },
        { value: 'military', text: '군인' },
      ],
    },
    {
      key: 'insurance',
      label: '고용보험 가입 여부',
      options: [
        { value: 'yes', text: '가입되어 있음' },
        { value: 'no', text: '가입 안 됨 / 모름' },
        { value: 'voluntary', text: '임의가입 신청 예정' },
      ],
    },
    {
      key: 'period',
      label: '고용보험 가입기간',
      options: [
        { value: 'none', text: '미가입' },
        { value: 'under6', text: '6개월 미만' },
        { value: 'over6', text: '6개월 이상' },
      ],
    },
  ],
  evaluate: (sel): CheckerResult => {
    const t = sel.type
    const ins = sel.insurance
    const period = sel.period

    /* 정규직 공무원, 국공립 교사, 사학연금 가입 교원, 군인 → 적용 제외 */
    const excluded = ['regular', 'public_teacher', 'private_pension', 'military']
    if (excluded.includes(t)) {
      const altMap: Record<string, string> = {
        regular: '공무원연금에서 퇴직연금·퇴직수당을 받아요',
        public_teacher: '공무원연금에서 퇴직급여를 받아요',
        private_pension: '사학연금에서 퇴직급여를 받아요',
        military: '군인연금에서 퇴역연금·퇴직일시금을 받아요',
      }
      return {
        pass: false,
        headline: '고용보험 적용 제외 대상이에요',
        detail: (
          <>
            해당 직종은 고용보험법 제10조에 따라 고용보험 적용이 제외돼요.
            대신 {altMap[t]}. 민간 회사 재취업 후 고용보험에 가입하면
            이후 퇴직 시 실업급여 수급이 가능해요.
          </>
        ),
        badges: ['적용 제외'],
        links: [
          { icon: '🏛️', title: '공무원 퇴직급여 vs 실업급여', desc: '두 제도의 차이를 비교해 보세요', href: '/w/공무원-교사-실업급여-퇴직급여-차이-비교' },
          { icon: '📋', title: '실업급여 수급 조건', desc: '민간 재취업 후 수급 방법', href: '/w/실업급여-수급-조건-자격-요건-완벽정리' },
        ],
      }
    }

    /* 별정직·임기제: 임의가입 가능 */
    if (t === 'special') {
      if (ins === 'yes' && period === 'over6') {
        return {
          pass: true,
          headline: '실업급여 수급 가능성이 높아요',
          detail: (
            <>
              별정직·임기제 공무원으로 고용보험에 가입하고 피보험기간
              180일 이상을 충족했어요. 비자발적 퇴직 시 실업급여를 받을 수 있어요.
            </>
          ),
          badges: ['수급 가능', '별정직·임기제'],
          links: [
            { icon: '💰', title: '실업급여 금액 계산', desc: '예상 수급액을 확인하세요', href: '/w/실업급여-금액-계산-연봉별-수령액' },
            { icon: '📝', title: '실업급여 신청 방법', desc: '고용센터 신청 절차 안내', href: '/w/실업급여-신청-방법-절차-준비서류' },
          ],
        }
      }
      return {
        pass: false,
        headline: '가입 후 180일 이상 유지가 필요해요',
        detail: (
          <>
            별정직·임기제 공무원은 본인 의사에 따라 고용보험에 임의가입할 수 있어요.
            임용일로부터 3개월 이내에 가입을 신청하고, 피보험기간 180일 이상을
            채우면 실업급여 수급이 가능해요.
          </>
        ),
        badges: ['임의가입 가능'],
        links: [
          { icon: '📋', title: '고용보험 가입 신청', desc: '고용24에서 가입 여부 확인', href: 'https://www.work24.go.kr' },
          { icon: '📖', title: '실업급여 수급 조건', desc: '기본 자격 요건 확인', href: '/w/실업급여-수급-조건-자격-요건-완벽정리' },
        ],
      }
    }

    /* 사립 기간제 교사 (사학연금 미가입), 학원 강사 → 일반 근로자 */
    if (ins === 'yes' && period === 'over6') {
      return {
        pass: true,
        headline: '실업급여 수급 가능성이 높아요',
        detail: (
          <>
            고용보험에 가입되어 있고 피보험기간 180일 이상이에요.
            계약만료·권고사직 등 비자발적 퇴직 시 실업급여를 받을 수 있어요.
            {t === 'private_no_pension' && ' 사학연금 미가입 기간제 교사는 일반 근로자와 동일한 기준이 적용돼요.'}
          </>
        ),
        badges: ['수급 가능'],
        links: [
          { icon: '💰', title: '실업급여 금액 계산', desc: '예상 수급액을 확인하세요', href: '/w/실업급여-금액-계산-연봉별-수령액' },
          { icon: '📝', title: '실업급여 신청 방법', desc: '고용센터 신청 절차 안내', href: '/w/실업급여-신청-방법-절차-준비서류' },
        ],
      }
    }

    return {
      pass: false,
      headline: '현재 조건으로는 수급이 어려워요',
      detail: (
        <>
          고용보험에 가입되어 있지 않거나 피보험기간 180일 미만이에요.
          고용보험에 가입하고 180일 이상 유지한 뒤 비자발적으로 퇴직하면
          실업급여를 받을 수 있어요.
        </>
      ),
      badges: ['가입 필요'],
      links: [
        { icon: '📋', title: '고용보험 가입 확인', desc: '고용24에서 피보험자격 조회', href: 'https://www.work24.go.kr' },
        { icon: '📖', title: '실업급여 수급 조건', desc: '기본 자격 요건 확인', href: '/w/실업급여-수급-조건-자격-요건-완벽정리' },
      ],
    }
  },
}

export default function 공무원수급Checker() {
  return <GenericChecker config={config} />
}
