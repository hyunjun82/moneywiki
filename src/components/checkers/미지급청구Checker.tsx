'use client'

import GenericChecker from '@/components/GenericChecker'
import type { CheckerConfig, CheckerResult } from '@/data/checker-types'

const config: CheckerConfig = {
  title: '미지급 실업급여 청구 자격 확인',
  subtitle: '3가지만 선택하면 청구 가능 여부를 알 수 있어요',
  intro: (
    <p>
      실업급여 수급자가 사망하면 유족이 미지급분을 청구할 수 있어요.
      <strong>가족 관계</strong>, <strong>생계 공동 여부</strong>,
      <strong>사망 후 경과 기간</strong>을 확인해 보세요.
    </p>
  ),
  groups: [
    {
      key: 'relation',
      label: '사망한 수급자와의 관계',
      options: [
        { value: 'spouse', text: '배우자 (사실혼 포함)' },
        { value: 'child', text: '자녀' },
        { value: 'parent', text: '부모' },
        { value: 'grandchild', text: '손자녀' },
        { value: 'grandparent', text: '조부모' },
        { value: 'sibling', text: '형제자매' },
        { value: 'other', text: '그 외 (친척, 지인 등)' },
      ],
    },
    {
      key: 'cohabitation',
      label: '사망 당시 생계를 같이 했나요?',
      options: [
        { value: 'same', text: '같은 집에 거주 (주민등록등본 동일)' },
        { value: 'support', text: '따로 살지만 생활비 송금' },
        { value: 'none', text: '생계 공유 사실 없음' },
      ],
    },
    {
      key: 'elapsed',
      label: '수급자 사망 후 경과 기간',
      options: [
        { value: 'under6m', text: '6개월 이내' },
        { value: '6mto1y', text: '6개월~1년' },
        { value: '1yto3y', text: '1~3년' },
        { value: 'over3y', text: '3년 초과' },
      ],
    },
  ],
  evaluate: (sel): CheckerResult => {
    const relationOk = sel.relation !== 'other'
    const cohabOk = sel.cohabitation !== 'none'
    const timeOk = sel.elapsed !== 'over3y'

    const priorityMap: Record<string, string> = {
      spouse: '1순위 (배우자)',
      child: '2순위 (자녀)',
      parent: '3순위 (부모)',
      grandchild: '4순위 (손자녀)',
      grandparent: '5순위 (조부모)',
      sibling: '6순위 (형제자매)',
    }
    const priority = priorityMap[sel.relation] || '해당 없음'

    const pass = relationOk && cohabOk && timeOk

    if (pass) {
      return {
        pass: true,
        headline: '미지급 실업급여 청구가 가능해요',
        detail: (
          <>
            {priority}에 해당하고 생계를 같이 한 유족이에요.
            소멸시효 3년 이내이므로 관할 고용센터에 청구하면 돼요.
            사망진단서, 주민등록등본, 가족관계증명서를 준비하세요.
          </>
        ),
        badges: [priority, '청구 가능'],
        links: [
          { icon: '📋', title: '미지급 청구 절차 보기', desc: '고용센터 방문부터 지급까지', href: '#s3' },
          { icon: '📄', title: '실업급여 신청 방법', desc: '일반 실업급여 신청 절차 안내', href: '/w/실업급여-신청-방법-절차-준비서류' },
        ],
      }
    }

    const reasons: string[] = []
    if (!relationOk) reasons.push('법정 가족 범위(배우자~형제자매)에 해당하지 않아요')
    if (!cohabOk) reasons.push('생계를 같이 한 사실이 없으면 청구할 수 없어요')
    if (!timeOk) reasons.push('사망일로부터 3년이 지나 소멸시효가 완성됐어요')

    return {
      pass: false,
      headline: '현재 조건으로는 청구가 어려워요',
      detail: (
        <>
          {reasons.join('. ')}.
          {!cohabOk && sel.relation !== 'other' && ' 다만 생활비 송금 내역 등으로 생계 공유를 입증하면 청구 가능할 수 있어요.'}
          {!timeOk && ' 소멸시효 3년은 연장이 되지 않으니 기한 내 청구가 중요해요.'}
        </>
      ),
      badges: [],
      links: [
        { icon: '🔍', title: '수급권 보호 제도', desc: '실업급여 압류 금지와 전용계좌', href: '/w/실업급여-압류금지-수급권-보호-계좌' },
        { icon: '📞', title: '고용센터 찾기', desc: '관할 고용센터 위치와 연락처', href: '/w/실업급여-고용센터-찾기-고용24' },
      ],
    }
  },
}

export default function 미지급청구Checker() {
  return <GenericChecker config={config} />
}
