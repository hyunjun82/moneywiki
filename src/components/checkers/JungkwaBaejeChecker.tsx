'use client'

import GenericChecker from '@/components/GenericChecker'
import type { CheckerConfig, CheckerResult } from '@/data/checker-types'

const config: CheckerConfig = {
  title: '내 주택 중과 배제 해당 여부 체크',
  subtitle: '주택 유형과 조건을 선택하면 중과 배제 적용 가능 여부를 확인할 수 있어요',
  intro: (
    <p>
      다주택자라도 <strong>특정 유형의 주택</strong>은 중과세율 대신 기본세율이 적용돼요.
      내가 팔려는 주택이 중과 배제 대상인지 아래에서 확인해 보세요.
    </p>
  ),
  groups: [
    {
      key: 'type',
      label: '양도할 주택 유형',
      options: [
        { value: 'rural3', text: '비수도권 기준시가 3억 이하 주택' },
        { value: 'rental8', text: '장기일반민간임대주택 (8년+)' },
        { value: 'inherit', text: '상속주택' },
        { value: 'agri', text: '이농·귀농주택' },
        { value: 'culture', text: '문화재 주택' },
        { value: 'other', text: '해당 없음 (일반 다주택)' },
      ],
    },
    {
      key: 'cond',
      label: '세부 조건 충족 여부',
      options: [
        { value: 'yes', text: '조건 충족 (기준시가·임대기간·상속기간 등)' },
        { value: 'no', text: '조건 미충족 또는 확인 필요' },
      ],
    },
  ],
  evaluate: (sel): CheckerResult => {
    const type = sel.type
    const cond = sel.cond

    if (type === 'other') {
      return {
        pass: false,
        headline: '중과 배제 대상이 아니에요',
        detail: (
          <>
            일반 다주택자 주택은 2026년 5월 9일까지 중과 <strong>유예</strong>가 적용돼요.
            유예 기간 내 매도하면 기본세율(6~45%)을 적용받을 수 있어요.
          </>
        ),
        badges: ['중과 유예 적용 중', '2026.5.9 종료'],
        links: [
          { icon: '📋', title: '중과 유예 종료 후 달라지는 것', desc: '유예 종료 후 세금 변화 확인', href: '/w/중과-유예-종료-부동산-시장-전망' },
          { icon: '🧮', title: '중과 전후 세액 비교', desc: '기본세율 vs 중과세율 세금 차이', href: '/w/다주택-양도세-중과-전후-세액-비교' },
        ],
      }
    }

    if (cond === 'no') {
      const typeLabel: Record<string, string> = {
        rural3: '비수도권 3억 이하',
        rental8: '장기임대',
        inherit: '상속주택',
        agri: '이농·귀농',
        culture: '문화재',
      }
      return {
        pass: false,
        headline: `${typeLabel[type] ?? ''} 주택 — 조건 확인이 필요해요`,
        detail: (
          <>
            유형은 해당하지만 세부 조건을 충족하지 못하면 중과 배제를 받을 수 없어요.
            세무사 상담을 통해 <strong>요건 충족 여부</strong>를 먼저 확인하세요.
          </>
        ),
        badges: ['조건 미충족', '세무사 확인 권장'],
        links: [
          { icon: '📋', title: '중과 배제 6가지 유형 상세', desc: '유형별 세부 조건 정리', href: '/w/다주택자-양도세-중과-배제-대상-주택-신고' },
        ],
      }
    }

    // 유형별 pass 결과
    const results: Record<string, { headline: string; detail: React.ReactNode; badges: string[] }> = {
      rural3: {
        headline: '중과 배제 적용 가능해요 — 기본세율로 신고하세요',
        detail: (
          <>
            비수도권 기준시가 3억원 이하 주택은 <strong>소득세법 시행령 제167조의3</strong>에 따라 중과 배제돼요.
            신고 시 기준시가 확인서를 첨부해야 해요.
          </>
        ),
        badges: ['중과 배제 대상', '기본세율 6~45%', '장기공제 가능'],
      },
      rental8: {
        headline: '중과 배제 적용 가능해요 — 임대사업자 등록증 필수',
        detail: (
          <>
            8년 이상 임대 등록 + 임대료 증액 5% 이내 유지 시 중과 배제돼요.
            신고 시 <strong>임대사업자 등록증</strong>과 임대계약서를 첨부하세요.
          </>
        ),
        badges: ['중과 배제 대상', '기본세율 6~45%', '서류 준비 필수'],
      },
      inherit: {
        headline: '중과 배제 적용 가능해요 — 상속 5년 이내인지 확인',
        detail: (
          <>
            피상속인 사망일부터 <strong>5년 이내</strong>에 양도하면 중과 배제돼요.
            신고 시 가족관계증명서와 상속 관련 서류를 첨부하세요.
          </>
        ),
        badges: ['중과 배제 대상', '5년 이내 조건', '기본세율 적용'],
      },
      agri: {
        headline: '중과 배제 적용 가능해요 — 대지 660㎡ 이하 조건 확인',
        detail: (
          <>
            농어촌 소재 + 대지 660㎡ 이하 조건을 충족하는 이농·귀농주택은 중과 배제돼요.
            해당 <strong>읍·면 소재</strong>인지 반드시 확인하세요.
          </>
        ),
        badges: ['중과 배제 대상', '농어촌 소재 확인', '기본세율 적용'],
      },
      culture: {
        headline: '중과 배제 적용 가능해요 — 문화재 지정 서류 준비',
        detail: (
          <>
            문화재보호법에 따라 지정된 주택은 중과 배제돼요.
            신고 시 <strong>문화재 지정 확인서</strong>를 첨부하세요.
          </>
        ),
        badges: ['중과 배제 대상', '문화재 지정 필수', '기본세율 적용'],
      },
    }

    const res = results[type]
    if (!res) {
      return {
        pass: false,
        headline: '선택 항목을 다시 확인해 주세요',
        detail: <>유형과 조건을 모두 선택해 주세요.</>,
        badges: [],
        links: [],
      }
    }

    return {
      pass: true,
      headline: res.headline,
      detail: res.detail,
      badges: res.badges,
      links: [
        { icon: '📋', title: '중과 배제 신고 방법', desc: '신고 기한과 필요 서류 확인', href: '/w/다주택자-양도세-중과-배제-대상-주택-신고' },
        { icon: '🧮', title: '다주택자 양도세 절세 전략', desc: '중과 배제 활용 절세 가이드', href: '/w/다주택양도세-중과유예-세율-절세-전략' },
      ],
    }
  },
}

export default function JungkwaBaejeChecker() {
  return <GenericChecker config={config} />
}
