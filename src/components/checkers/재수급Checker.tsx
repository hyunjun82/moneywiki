'use client'

import GenericChecker from '@/components/GenericChecker'
import type { CheckerConfig, CheckerResult } from '@/data/checker-types'

const config: CheckerConfig = {
  title: '실업급여 재수급 자격 간편 체크',
  subtitle: '4가지만 선택하면 재수급 가능성을 바로 확인할 수 있어요',
  intro: (
    <p>
      실업급여를 다시 받으려면 <strong>잔여일수 여부</strong>와
      <strong>새 직장 피보험기간 180일</strong>이 핵심이에요.
      아래에서 내 상황을 선택해 보세요.
    </p>
  ),
  groups: [
    {
      key: 'type',
      label: '현재 상황',
      options: [
        { value: 'remain', text: '수급기간(12개월) 내 재퇴직 + 잔여일수 있음' },
        { value: 'expired', text: '수급기간 12개월 지남 / 잔여일수 없음' },
        { value: 'completed', text: '이전 실업급여 수급 완료 후 재취업했다가 퇴직' },
      ],
    },
    {
      key: 'period',
      label: '새 직장 피보험기간 (고용보험 가입일수)',
      options: [
        { value: 'under180', text: '180일 미만' },
        { value: '180to365', text: '180일~1년' },
        { value: '1to3', text: '1~3년' },
        { value: '3to5', text: '3~5년' },
        { value: 'over5', text: '5년 이상' },
      ],
    },
    {
      key: 'reason',
      label: '퇴직 사유',
      options: [
        { value: 'involuntary', text: '권고사직·해고·계약만료' },
        { value: 'justified', text: '정당한 사유 자진퇴사 (임금체불 등)' },
        { value: 'voluntary', text: '개인 사유 자진퇴사' },
      ],
    },
    {
      key: 'repeat',
      label: '최근 5년 내 실업급여 수급 횟수',
      options: [
        { value: '1', text: '1회 (처음 재신청)' },
        { value: '2', text: '2회' },
        { value: '3', text: '3회 이상' },
        { value: '4', text: '4회 이상' },
        { value: '5', text: '5회 이상' },
      ],
    },
  ],
  evaluate: (sel): CheckerResult => {
    const isRemain = sel.type === 'remain'
    const periodOk = sel.period !== 'under180'
    const reasonOk = sel.reason !== 'voluntary'
    const repeatCount = parseInt(sel.repeat)

    /* 감액률 */
    const penaltyMap: Record<number, number> = { 3: 10, 4: 25, 5: 50 }
    const penalty = repeatCount >= 5 ? 50 : repeatCount >= 4 ? 25 : repeatCount >= 3 ? 10 : 0

    if (isRemain) {
      return {
        pass: true,
        headline: '재실업 신고로 잔여일수를 이어받을 수 있어요',
        detail: (
          <>수급기간(12개월) 내에 잔여일수가 남아 있으면 퇴직 사유와 관계없이 남은 일수만큼 받을 수 있어요.
          퇴직 후 <strong>7일 이내</strong>에 고용센터에 재실업 신고를 해야 해요.
          {penalty > 0 && ` 다만 반복수급(${repeatCount}회)으로 ${penalty}% 감액이 적용돼요.`}</>
        ),
        badges: ['재실업 가능', '잔여일수 수급'],
        links: [
          { icon: '📋', title: '재실업 신고 절차', desc: '고용센터 방문 신고 방법', href: '#s3' },
          { icon: '🔄', title: '반복수급 감액 기준', desc: '5년 3회 이상 감액률 확인', href: '/w/실업급여-반복수급-감액-대기기간-2026-개정' },
        ],
      }
    }

    const newClaim = periodOk && reasonOk
    if (newClaim) {
      const daysMap: Record<string, string> = {
        '180to365': '120일', '1to3': '150일', '3to5': '180일', 'over5': '210~270일',
      }
      const days = daysMap[sel.period] || '120일'

      return {
        pass: true,
        headline: '재수급(새 신청) 가능성이 높아요',
        detail: (
          <>새 직장 피보험기간이 180일 이상이고 비자발적 퇴직이면 재수급 조건을 충족해요.
          소정급여일수는 새 피보험기간과 연령으로 다시 산정돼요.
          {penalty > 0 && ` 반복수급(${repeatCount}회) 감액 ${penalty}%가 적용될 수 있어요.`}</>
        ),
        amount: { value: `최대 ${days}`, unit: '소정급여일수' },
        badges: ['재수급 가능', `${days}`],
        links: [
          { icon: '📋', title: '재수급 신청 절차', desc: '이직확인서 발급부터 시작', href: '#s3' },
          { icon: '📊', title: '소정급여일수 기준표', desc: '피보험기간·연령별 120~270일', href: '/w/실업급여-수급기간-소정급여일수-기준' },
        ],
      }
    }

    const reasons: string[] = []
    if (!periodOk) reasons.push('새 직장 피보험기간 180일 미만')
    if (!reasonOk) reasons.push('개인 사유 자진퇴사')

    return {
      pass: false,
      headline: '현재 조건으로는 재수급이 어려워요',
      detail: (
        <>해당 사유: {reasons.join(', ')}.
        {!periodOk && ' 피보험기간을 더 채우거나, '}
        {!reasonOk && ' 정당한 이직사유(임금체불·괴롭힘 등)에 해당하는지 확인해 보세요.'}</>
      ),
      badges: [],
      links: [
        { icon: '🔍', title: '정당한 이직사유 7가지', desc: '자진퇴사도 수급 가능한 경우', href: '/w/자진퇴사-자발적-퇴사-실업급여-예외-조건' },
        { icon: '📅', title: '피보험기간 180일 계산법', desc: '합산 방법과 주의사항', href: '/w/실업급여-피보험기간-180일-계산-합산-방법' },
      ],
    }
  },
}

export default function 재수급Checker() {
  return <GenericChecker config={config} />
}
