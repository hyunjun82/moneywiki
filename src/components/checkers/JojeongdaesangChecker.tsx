'use client'

import GenericChecker from '@/components/GenericChecker'
import type { CheckerConfig, CheckerResult } from '@/data/checker-types'

/* ── 2026년 현재 조정대상지역 목록 (2025.10.16~ 적용) ── */
const DESIGNATED: Record<string, string> = {
  'seoul': '서울 전역 (25개 자치구)',
  'gwacheon': '경기 과천시',
  'gwangmyeong': '경기 광명시',
  'seongnam-bundang': '경기 성남시 분당구',
  'seongnam-sujeong': '경기 성남시 수정구',
  'seongnam-jungwon': '경기 성남시 중원구',
  'suwon-yeongtong': '경기 수원시 영통구',
  'suwon-jangan': '경기 수원시 장안구',
  'suwon-paldal': '경기 수원시 팔달구',
  'anyang-dongan': '경기 안양시 동안구',
  'yongin-suji': '경기 용인시 수지구',
  'uiwang': '경기 의왕시',
  'hanam': '경기 하남시',
}

const config: CheckerConfig = {
  title: '내 주택 조정대상지역 확인',
  subtitle: '주택 소재지를 선택하면 조정대상지역 해당 여부를 알려드려요',
  intro: (
    <p>
      조정대상지역 주택은 양도세 중과, 취득세 중과 등 규제가 적용돼요.
      내 주택이 해당되는지 바로 확인해 보세요.
    </p>
  ),
  groups: [
    {
      key: 'region',
      label: '주택 소재지를 선택하세요',
      options: [
        { value: 'seoul', text: '서울 (25개 자치구 전역)' },
        { value: 'gwacheon', text: '경기 과천시' },
        { value: 'gwangmyeong', text: '경기 광명시' },
        { value: 'seongnam-bundang', text: '경기 성남시 분당구' },
        { value: 'seongnam-sujeong', text: '경기 성남시 수정구' },
        { value: 'seongnam-jungwon', text: '경기 성남시 중원구' },
        { value: 'suwon-yeongtong', text: '경기 수원시 영통구' },
        { value: 'suwon-jangan', text: '경기 수원시 장안구' },
        { value: 'suwon-paldal', text: '경기 수원시 팔달구' },
        { value: 'anyang-dongan', text: '경기 안양시 동안구' },
        { value: 'yongin-suji', text: '경기 용인시 수지구' },
        { value: 'uiwang', text: '경기 의왕시' },
        { value: 'hanam', text: '경기 하남시' },
        { value: 'gyeonggi-other', text: '경기 기타 (위 외 지역)' },
        { value: 'other', text: '기타 지방 (서울·경기 외)' },
      ],
    },
  ],
  evaluate: (sel): CheckerResult => {
    const region = sel.region
    const isDesignated = region in DESIGNATED

    if (isDesignated) {
      const areaName = DESIGNATED[region]
      return {
        pass: true,
        headline: `${areaName}은 조정대상지역이에요`,
        detail: (
          <>
            해당 지역은 2026년 현재 조정대상지역으로 지정돼 있어요.
            다주택자가 이 지역 주택을 양도하면 중과세율이 적용될 수 있어요.
            다만 현재 <strong>2026년 5월 9일까지 중과가 유예</strong>되고 있어서,
            유예 기간 내 양도하면 기본세율(6~45%)이 적용돼요.
          </>
        ),
        badges: [
          '조정대상지역',
          '양도세 중과 대상',
          '유예 중 (~2026.5.9)',
        ],
        links: [
          { icon: '📊', title: '양도세 중과 세율 비교', desc: '기본세율과 중과세율 차이 확인', href: '/w/양도세-중과-뜻-기본세율-중과세율-비교' },
          { icon: '📅', title: '중과 유예 종료일 확인', desc: '유예 연혁과 종료 시점 확인', href: '/w/중과-유예-연혁-종료일-확정' },
        ],
      }
    } else {
      return {
        pass: false,
        headline: '조정대상지역이 아니에요',
        detail: (
          <>
            해당 지역은 현재 조정대상지역에서 해제된 상태예요.
            다주택자라도 이 지역 주택을 양도하면 <strong>기본세율(6~45%)</strong>이 적용돼요.
            장기보유특별공제도 받을 수 있어요.
          </>
        ),
        badges: [
          '비조정지역',
          '기본세율 적용 (6~45%)',
        ],
        links: [
          { icon: '📋', title: '다주택 매도 순서 전략', desc: '어떤 집부터 팔아야 절세가 되는지', href: '/w/다주택-매도-순서-전략-절세' },
          { icon: '📊', title: '양도세 기본세율 확인', desc: '기본세율과 중과세율 비교', href: '/w/양도세-중과-뜻-기본세율-중과세율-비교' },
        ],
      }
    }
  },
}

export default function JojeongdaesangChecker() {
  return <GenericChecker config={config} />
}
