'use client'

import GenericChecker from '@/components/GenericChecker'
import type { CheckerConfig, CheckerResult } from '@/data/checker-types'

const config: CheckerConfig = {
  title: '실업급여 받으면서 알바 해도 되나요?',
  subtitle: '3가지만 선택하면 알바 가능 여부를 확인할 수 있어요',
  intro: (
    <p>
      실업급여 받는 중에도 <strong>월 60시간 미만</strong> 알바는 가능해요.
      다만 소득이 발생하면 <strong>신고 필수</strong>이고, 구직급여일액 이상 벌면
      해당일의 실업급여가 감액돼요. 아래에서 내 상황을 확인해 보세요.
    </p>
  ),
  groups: [
    {
      key: 'hours',
      label: '한 달 알바 근로시간',
      options: [
        { value: 'under60', text: '월 60시간 미만 (주 15시간 미만)' },
        { value: 'over60', text: '월 60시간 이상 (주 15시간 이상)' },
        { value: '3month', text: '월 60시간 미만이지만 3개월 이상 지속' },
      ],
    },
    {
      key: 'income',
      label: '하루 소득 (구직급여일액 기준)',
      options: [
        { value: 'under', text: '구직급여일액 미만' },
        { value: 'over', text: '구직급여일액 이상' },
        { value: 'unknown', text: '모르겠음 (평균 5만원 이하)' },
      ],
    },
    {
      key: 'report',
      label: '고용센터 신고 여부',
      options: [
        { value: 'yes', text: '신고함' },
        { value: 'no', text: '미신고' },
        { value: 'plan', text: '신고 예정' },
      ],
    },
  ],
  evaluate: (sel): CheckerResult => {
    const hoursOk = sel.hours === 'under60'
    const continuous = sel.hours === '3month'
    const over60 = sel.hours === 'over60'
    const reportOk = sel.report === 'yes' || sel.report === 'plan'
    const incomeHigh = sel.income === 'over'

    /* 케이스 1: 월 60시간 이상 → 즉시 실업급여 중단 */
    if (over60) {
      return {
        pass: false,
        headline: '월 60시간 이상 근로는 취업으로 간주돼요',
        detail: (
          <>
            주 15시간 이상(월 60시간 이상) 근로 계약을 맺으면 <strong>실업급여가 즉시 중단</strong>돼요.
            실업 상태가 아닌 것으로 보기 때문이에요. 다만 중단 후 다시 퇴직하면 잔여일수를 받을 수 있어요.
          </>
        ),
        badges: ['취업 간주', '수급 중단'],
        links: [
          { icon: '🔄', title: '실업급여 재신청 조건', desc: '재취업 후 재퇴직 시 잔여일수 수급', href: '/w/실업급여-재신청-재취업-재퇴직-수급-조건' },
          { icon: '💰', title: '조기재취업수당 신청', desc: '잔여일수 50% 이상 남았을 때', href: '/w/조기재취업수당-신청-조건-금액-잔여일수-계산' },
        ],
      }
    }

    /* 케이스 2: 월 60시간 미만이지만 3개월 이상 → 취업 간주 */
    if (continuous) {
      return {
        pass: false,
        headline: '3개월 이상 지속 시 취업으로 간주될 수 있어요',
        detail: (
          <>
            월 60시간 미만이어도 <strong>생업 목적으로 3개월 이상</strong> 계속 근로하면
            취업으로 보고 실업급여가 중단될 수 있어요. 고용센터에 미리 상담하세요.
          </>
        ),
        badges: ['취업 간주 가능', '상담 필요'],
        links: [
          { icon: '📞', title: '고용센터 찾기', desc: '거주지 관할 센터 상담', href: '/w/실업급여-고용센터-찾기-고용24-사용법' },
          { icon: '⚠️', title: '실업급여 중단 사유', desc: '수급정지 6가지 유형', href: '/w/실업급여-중단-거부-수급정지-사유-대처' },
        ],
      }
    }

    /* 케이스 3: 미신고 + 소득 있음 → 부정수급 위험 */
    if (!reportOk && (incomeHigh || sel.income === 'under')) {
      return {
        pass: false,
        headline: '알바 소득 미신고는 부정수급이에요',
        detail: (
          <>
            실업급여 받는 중 발생한 소득은 <strong>반드시 신고</strong>해야 해요.
            미신고 적발 시 <strong>전액 반환 + 최대 5배 추가징수 + 3년 이하 징역</strong> 처벌을 받을 수 있어요.
            {sel.report === 'plan' && ' 지금이라도 빨리 신고하세요!'}
          </>
        ),
        badges: ['부정수급 위험', '신고 필수'],
        links: [
          { icon: '⚠️', title: '실업급여 부정수급 유형과 처벌', desc: '전액 반환 + 5배 추가징수', href: '/w/실업급여-부정수급-유형-제재-벌금-추징' },
          { icon: '📋', title: '실업인정 신고 방법', desc: '소득 발생 시 신고 절차', href: '/w/실업급여-실업인정-구직활동-방법' },
        ],
      }
    }

    /* 케이스 4: 신고 + 소득 높음 → 감액 예상 */
    if (reportOk && incomeHigh) {
      return {
        pass: true,
        headline: '알바는 가능하지만 해당일 실업급여가 감액돼요',
        detail: (
          <>
            월 60시간 미만 알바는 가능해요. 다만 <strong>하루 소득이 구직급여일액 이상</strong>이면
            그 날의 실업급여는 <strong>미지급</strong>돼요. 소득 발생일을 실업인정일에 신고하면
            자동으로 계산돼요.
          </>
        ),
        amount: { value: '해당일 미지급', unit: '감액 방식' },
        badges: ['알바 가능', '감액 있음'],
        links: [
          { icon: '🧮', title: '실업급여 감액 계산 방법', desc: '소득별 감액 예시', href: '/w/실업급여-수급중-알바-취업-신고-기준' },
          { icon: '📋', title: '실업인정 신고 방법', desc: '소득 신고 절차 안내', href: '/w/실업급여-실업인정-구직활동-방법' },
        ],
      }
    }

    /* 케이스 5: 신고 + 소득 낮음 → 완전 가능 */
    return {
      pass: true,
      headline: '알바 가능해요. 감액도 없을 확률이 높아요',
      detail: (
        <>
          월 60시간 미만이고 하루 소득이 <strong>구직급여일액 미만</strong>이면
          실업급여는 <strong>전액 지급</strong>돼요. 다만 소득이 발생했다면
          실업인정일에 반드시 신고하세요.
        </>
      ),
      amount: { value: '전액 지급', unit: '예상 수령' },
      badges: ['알바 가능', '전액 지급'],
      links: [
        { icon: '💰', title: '실업급여 금액 계산', desc: '구직급여일액 확인', href: '/w/실업급여-금액-계산-연봉별-수령액' },
        { icon: '📋', title: '실업인정 신고 방법', desc: '소득 신고 절차', href: '/w/실업급여-실업인정-구직활동-방법' },
      ],
    }
  },
}

export default function 수급중알바Checker() {
  return <GenericChecker config={config} />
}
