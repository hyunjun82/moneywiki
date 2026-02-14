'use client'

import GenericChecker from '@/components/GenericChecker'
import type { CheckerConfig, CheckerResult } from '@/data/checker-types'

const config: CheckerConfig = {
  title: '실업급여 압류 보호 확인',
  subtitle: '지금 내 실업급여가 안전하게 보호되고 있는지 확인해 보세요',
  intro: (
    <p>
      실업급여 수급권은 <strong>전액 압류 금지</strong>예요.
      하지만 받는 방법에 따라 보호 범위가 달라질 수 있어요.
    </p>
  ),
  groups: [
    {
      key: 'account',
      label: '실업급여를 받는 계좌는?',
      options: [
        { value: 'dedicated', text: '실업급여 전용계좌 (수급계좌)' },
        { value: 'general', text: '일반 통장 (급여·저축 계좌)' },
        { value: 'none', text: '아직 계좌를 등록 안 했어요' },
      ],
    },
    {
      key: 'debt',
      label: '현재 채무(빚) 상황은?',
      options: [
        { value: 'none', text: '채무 없음' },
        { value: 'exist', text: '채무 있지만 압류 안 당함' },
        { value: 'seized', text: '계좌가 이미 압류 중' },
      ],
    },
    {
      key: 'transfer',
      label: '실업급여 입금 후 처리는?',
      options: [
        { value: 'keep', text: '전용계좌에 그대로 둠' },
        { value: 'withdraw', text: '바로 인출하거나 이체함' },
        { value: 'mixed', text: '일부는 두고 일부는 이체' },
      ],
    },
  ],
  evaluate: (sel): CheckerResult => {
    const isDedicated = sel.account === 'dedicated'
    const isSeized = sel.debt === 'seized'
    const keepInAccount = sel.transfer === 'keep'

    if (isDedicated && !isSeized) {
      return {
        pass: true,
        headline: '실업급여가 전액 보호되고 있어요',
        detail: (
          <>전용 수급계좌에 입금된 실업급여는 고용보험법 제38조에 따라 <strong>전액 압류 금지</strong>예요.
          {!keepInAccount && ' 다만 인출하거나 다른 계좌로 이체한 금액은 더 이상 보호 대상이 아니에요. 필요한 만큼만 인출하는 게 안전해요.'}</>
        ),
        badges: ['전액 보호', '압류 금지'],
        links: [
          { icon: '🛡️', title: '수급권 보호 상세 규정', desc: '양도·담보 금지 법적 근거', href: '#s2' },
          { icon: '📋', title: '실업급여 수급 중 관리', desc: '알바·취업 신고 기준', href: '/w/실업급여-수급중-알바-취업-신고-기준' },
        ],
      }
    }

    if (sel.account === 'general' || sel.account === 'none') {
      return {
        pass: false,
        headline: '지금은 보호받지 못할 수 있어요',
        detail: (
          <>일반 통장에 입금된 실업급여는 다른 예금과 섞여서 <strong>구분이 어려워요</strong>.
          채권자가 통장 잔액 전체를 압류할 수 있어요.
          지금이라도 <strong>실업급여 전용계좌를 개설</strong>하면 전액 보호받을 수 있어요.</>
        ),
        badges: ['전용계좌 필요'],
        links: [
          { icon: '🏦', title: '전용계좌 개설 방법', desc: '수급자격증 + 신분증으로 은행 방문', href: '#s3' },
          { icon: '📞', title: '고용센터 찾기', desc: '가까운 고용센터 위치 확인', href: '/w/실업급여-고용센터-찾기-고용24-사용법' },
        ],
      }
    }

    if (isSeized) {
      return {
        pass: false,
        headline: '전용계좌라도 기존 압류는 즉시 해제되지 않아요',
        detail: (
          <>이미 압류된 계좌라면 <strong>압류해제 신청</strong>을 별도로 해야 해요.
          실업급여수급계좌임을 증명하는 서류를 법원에 제출하면 압류에서 제외할 수 있어요.
          고용센터에서 수급사실확인서를 발급받아 법원에 제출하세요.</>
        ),
        badges: ['압류해제 신청 필요'],
        links: [
          { icon: '⚖️', title: '압류해제 신청 방법', desc: '법원에 수급사실확인서 제출', href: '#s4' },
          { icon: '🆘', title: '이의신청 방법', desc: '실업급여 관련 구제 절차', href: '/w/실업급여-이의신청-심사청구-재심사-절차' },
        ],
      }
    }

    return {
      pass: true,
      headline: '실업급여 수급권은 법으로 보호돼요',
      detail: (
        <>고용보험법 제38조에 따라 실업급여 수급권은 <strong>양도·압류·담보 제공이 전면 금지</strong>돼요.
        전용계좌에 있는 동안은 전액 보호되니 안심하세요.</>
      ),
      badges: ['수급권 보호'],
      links: [
        { icon: '🛡️', title: '보호 범위 확인', desc: '어떤 급여까지 보호되는지', href: '#s1' },
      ],
    }
  },
}

export default function 수급권보호Checker() {
  return <GenericChecker config={config} />
}
