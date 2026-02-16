'use client'

import GenericChecker from '@/components/GenericChecker'
import type { CheckerConfig, CheckerResult } from '@/data/checker-types'

const config: CheckerConfig = {
  title: '실업급여 수급정지 사유 확인',
  subtitle: '3가지만 선택하면 수급정지 여부를 바로 알 수 있어요',
  intro: (
    <p>
      실업급여가 갑자기 끊겼다면 <strong>수급정지 사유</strong>부터 확인해야 해요.
      직업소개 거부, 훈련 거부, 실업인정 불참 등 상황을 선택해 보세요.
    </p>
  ),
  groups: [
    {
      key: 'situation',
      label: '현재 상황',
      options: [
        { value: 'job_refuse', text: '직업소개를 거부했어요' },
        { value: 'train_refuse', text: '직업훈련 지시를 거부했어요' },
        { value: 'guide_refuse', text: '직업지도를 거부했어요' },
        { value: 'absent', text: '실업인정일에 불참했어요' },
        { value: 'expired', text: '12개월 수급기한이 지났어요' },
        { value: 'unknown', text: '이유를 잘 모르겠어요' },
      ],
    },
    {
      key: 'reason',
      label: '거부 또는 불참 사유',
      options: [
        { value: 'skill_mismatch', text: '소개 직종이 내 능력에 안 맞아요' },
        { value: 'wage_low', text: '임금이 통상의 80% 미만이에요' },
        { value: 'move_hard', text: '이사가 필요한데 곤란해요' },
        { value: 'sick', text: '질병/부상으로 출석이 어려웠어요' },
        { value: 'interview', text: '면접/훈련이 겹쳤어요' },
        { value: 'none', text: '특별한 사유가 없어요' },
      ],
    },
    {
      key: 'months',
      label: '퇴직 후 경과 기간',
      options: [
        { value: 'under6', text: '6개월 미만' },
        { value: '6to9', text: '6~9개월' },
        { value: '9to12', text: '9~12개월' },
        { value: 'over12', text: '12개월 초과' },
      ],
    },
  ],
  evaluate: (sel): CheckerResult => {
    const situation = sel.situation
    const reason = sel.reason
    const months = sel.months

    /* 12개월 초과 = 수급기한 만료 */
    if (months === 'over12' || situation === 'expired') {
      return {
        pass: false,
        headline: '수급기한(12개월)이 만료됐어요',
        detail: (
          <>이직일 다음 날부터 12개월이 지나면 소정급여일수가 남아 있어도 수급이 종료돼요.
          새 직장에서 180일 이상 근무 후 비자발적 퇴직하면 재신청이 가능해요.</>
        ),
        badges: ['수급기한 만료'],
        links: [
          { icon: '🔄', title: '실업급여 재신청 조건', desc: '재취업 후 재퇴직 시 재수급 방법', href: '/w/실업급여-재신청-재취업-재퇴직-수급-조건' },
          { icon: '📋', title: '연장급여 특례 확인', desc: '훈련연장·개별연장·특별연장급여', href: '/w/연장급여-훈련연장-개별연장-특별연장-조건-비교' },
        ],
      }
    }

    /* 정당한 사유 = 수급정지 면제 */
    const validReasons = ['skill_mismatch', 'wage_low', 'move_hard', 'sick', 'interview']
    const hasValidReason = validReasons.includes(reason)

    if (hasValidReason && situation !== 'unknown') {
      return {
        pass: true,
        headline: '정당한 사유로 수급정지 면제 가능성이 높아요',
        detail: (
          <>고용보험법 제60조에 따라 능력 불일치, 임금 수준 미달, 주거이전 곤란 등은 정당한 사유로 인정돼요.
          증빙서류를 준비해서 고용센터에 소명하면 수급정지를 피할 수 있어요.</>
        ),
        badges: ['정당한 사유 인정'],
        links: [
          { icon: '📝', title: '실업인정 구직활동 방법', desc: '출석일 변경과 온라인 인정 절차', href: '/w/실업급여-실업인정-구직활동-방법' },
          { icon: '🔍', title: '이의신청 심사청구 절차', desc: '90일 이내 불복 절차', href: '/w/실업급여-이의신청-심사청구-재심사-불복-절차' },
        ],
      }
    }

    /* 정당한 사유 없이 거부/불참 = 수급정지 */
    let period = ''
    let detail = ''

    if (situation === 'job_refuse' || situation === 'guide_refuse') {
      period = '2주'
      detail = '직업소개 또는 직업지도를 정당한 사유 없이 거부하면 거부일부터 2주간 급여가 정지돼요.'
    } else if (situation === 'train_refuse') {
      period = '4주'
      detail = '직업능력개발훈련 지시를 정당한 사유 없이 거부하면 거부일부터 4주간 급여가 정지돼요.'
    } else if (situation === 'absent') {
      period = '해당 인정기간'
      detail = '실업인정일에 정당한 사유 없이 불참하면 해당 인정기간의 실업인정이 되지 않아 급여를 못 받아요.'
    } else {
      period = '확인 필요'
      detail = '정확한 사유를 고용센터(고용24)에서 확인해 보세요. 수급정지 통보서에 사유와 기간이 기재돼 있어요.'
    }

    return {
      pass: false,
      headline: `수급정지 ${period} 처분 가능성이 있어요`,
      detail: (
        <>{detail} 정지 기간이 끝나면 자동으로 재개되지만, 12개월 수급기한은 계속 흘러가니 빠르게 대응하세요.</>
      ),
      amount: { value: period, unit: '정지 기간' },
      badges: ['수급정지', period],
      links: [
        { icon: '🔍', title: '이의신청 심사청구 절차', desc: '90일 이내 불복 신청 방법', href: '/w/실업급여-이의신청-심사청구-재심사-불복-절차' },
        { icon: '📋', title: '수급 중 알바 신고 기준', desc: '월 60시간 미만 기준과 감액 계산', href: '/w/실업급여-수급중-알바-취업-신고-기준' },
      ],
    }
  },
}

export default function 수급정지사유Checker() {
  return <GenericChecker config={config} />
}
