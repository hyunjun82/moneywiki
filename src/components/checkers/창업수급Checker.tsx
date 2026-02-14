'use client'

import GenericChecker from '@/components/GenericChecker'
import type { CheckerConfig, CheckerResult } from '@/data/checker-types'

const config: CheckerConfig = {
  title: '창업 시 실업급여 수급 유지 체크',
  subtitle: '3가지만 선택하면 창업 후 수급 가능 여부를 확인할 수 있어요',
  intro: (
    <p>
      실업급여 수급 중 <strong>사업자등록</strong>을 하면 취업으로 간주돼요.
      다만 조건에 따라 <strong>조기재취업수당</strong>으로 전환할 수 있어요.
    </p>
  ),
  groups: [
    {
      key: 'status',
      label: '현재 창업 단계',
      options: [
        { value: 'plan', text: '창업 준비 중 (사업자등록 전)' },
        { value: 'registered', text: '사업자등록 완료 (매출 없음)' },
        { value: 'operating', text: '사업자등록 + 매출 발생' },
        { value: 'freelance', text: '프리랜서 활동 (등록 없음)' },
      ],
    },
    {
      key: 'remaining',
      label: '소정급여일수 잔여 비율',
      options: [
        { value: 'over50', text: '절반(1/2) 이상 남음' },
        { value: 'under50', text: '절반(1/2) 미만 남음' },
        { value: 'unknown', text: '잘 모르겠어요' },
      ],
    },
    {
      key: 'hours',
      label: '프리랜서/알바 월 근로시간',
      options: [
        { value: 'none', text: '근로 없음' },
        { value: 'under60', text: '월 60시간 미만' },
        { value: 'over60', text: '월 60시간 이상' },
      ],
    },
  ],
  evaluate: (sel): CheckerResult => {
    const { status, remaining, hours } = sel

    /* 사업자등록 완료 → 수급 중단, 조기재취업수당 가능 여부 판단 */
    if (status === 'registered' || status === 'operating') {
      const earlyOk = remaining === 'over50'
      if (earlyOk) {
        return {
          pass: true,
          headline: '구직급여는 중단되지만 조기재취업수당 전환이 가능해요',
          detail: (
            <>사업자등록 시 취업으로 간주돼 구직급여는 중단돼요. 하지만 소정급여일수의
            절반 이상이 남아 있으므로, 12개월 이상 사업을 유지하면 <strong>잔여 급여의 50%</strong>를
            조기재취업수당으로 받을 수 있어요.</>
          ),
          badges: ['조기재취업수당 가능', '12개월 영업 필요'],
          links: [
            { icon: '💰', title: '조기재취업수당 신청 조건', desc: '잔여일수별 수당 금액 계산', href: '/w/조기재취업수당-신청-조건-금액-잔여일수-계산' },
            { icon: '📋', title: '실업급여 수급 중 알바 신고', desc: '월 60시간 미만 허용 기준', href: '/w/실업급여-수급중-알바-취업-신고-기준' },
          ],
        }
      }
      return {
        pass: false,
        headline: '구직급여 중단 + 조기재취업수당도 받기 어려워요',
        detail: (
          <>사업자등록으로 구직급여가 중단되고, 소정급여일수의 절반 이상이 남아 있지 않아
          조기재취업수당 요건도 충족하지 못해요. 가능하면 사업자등록 시점을 조절하는 게 유리해요.</>
        ),
        badges: ['수급 중단'],
        links: [
          { icon: '🔄', title: '실업급여 재신청 조건', desc: '재취업 후 재퇴직 시 재수급 방법', href: '/w/실업급여-재신청-재취업-재퇴직-수급-조건' },
          { icon: '📋', title: '실업급여 중단 사유와 재개', desc: '수급정지 6가지 사유 확인', href: '/w/실업급여-중단-거부-수급정지-사유-대처' },
        ],
      }
    }

    /* 프리랜서 활동 */
    if (status === 'freelance') {
      const hoursOk = hours === 'none' || hours === 'under60'
      if (hoursOk) {
        return {
          pass: true,
          headline: '월 60시간 미만이면 수급을 유지할 수 있어요',
          detail: (
            <>사업자등록 없이 월 60시간 미만 프리랜서 활동은 취업으로 간주되지 않아요.
            다만 소득이 발생하면 반드시 고용센터에 신고해야 하고, 구직급여일액 이상 소득 시
            <strong>감액 지급</strong>될 수 있어요.</>
          ),
          badges: ['수급 유지', '소득 신고 필수'],
          links: [
            { icon: '📋', title: '실업급여 수급 중 알바 신고', desc: '소득 신고와 감액 기준', href: '/w/실업급여-수급중-알바-취업-신고-기준' },
            { icon: '⚠️', title: '부정수급 유형과 처벌', desc: '미신고 시 최대 5배 추징', href: '/w/실업급여-부정수급-유형-제재-벌금-추징' },
          ],
        }
      }
      return {
        pass: false,
        headline: '월 60시간 이상이면 취업으로 간주돼요',
        detail: (
          <>프리랜서라도 월 60시간 이상 근로하면 취업 상태로 판단돼 구직급여가 중단돼요.
          근로시간을 줄이거나, 조기재취업수당 전환을 검토해 보세요.</>
        ),
        badges: ['수급 중단 가능'],
        links: [
          { icon: '💰', title: '조기재취업수당 전환', desc: '잔여일수 절반 이상이면 수당 가능', href: '/w/조기재취업수당-신청-조건-금액-잔여일수-계산' },
          { icon: '📋', title: '실업급여 중단 사유', desc: '수급정지 사유와 재개 방법', href: '/w/실업급여-중단-거부-수급정지-사유-대처' },
        ],
      }
    }

    /* 창업 준비 중 (사업자등록 전) */
    return {
      pass: true,
      headline: '창업 준비 단계에서는 수급을 유지할 수 있어요',
      detail: (
        <>사업자등록 전 창업 준비(시장조사, 교육 수강, 사업계획서 작성)는 재취업활동으로
        인정받을 수 있어요. 고용센터에 <strong>창업 의향을 미리 신고</strong>하고
        자영업활동계획서를 제출하면 돼요.</>
      ),
      badges: ['수급 유지', '고용센터 신고 필수'],
      links: [
        { icon: '💰', title: '조기재취업수당 조건', desc: '절반 이상 남기고 창업 시 수당 가능', href: '/w/조기재취업수당-신청-조건-금액-잔여일수-계산' },
        { icon: '📋', title: '실업인정 구직활동 방법', desc: '창업 교육도 구직활동으로 인정', href: '/w/실업급여-실업인정-구직활동-방법' },
      ],
    }
  },
}

export default function 창업수급Checker() {
  return <GenericChecker config={config} />
}
