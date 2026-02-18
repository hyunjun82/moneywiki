'use client'

import GenericChecker from '@/components/GenericChecker'
import type { CheckerConfig, CheckerResult } from '@/data/checker-types'

const config: CheckerConfig = {
  title: '신생아 특례대출 자격 확인',
  subtitle: '3가지 조건을 선택하면 신청 가능 여부를 바로 알려드려요',
  intro: (
    <p>신생아 특례대출은 출산 가구에 주택 구입·전세 자금을 시중 금리보다 낮게 지원하는 정책 대출이에요. 핵심 조건 3가지를 먼저 확인해 보세요.</p>
  ),
  groups: [
    {
      key: 'birth',
      label: '출산 시기',
      options: [
        { value: 'eligible', text: '2023년 1월 1일 이후 출생아 있음 (대출 접수일 기준 2년 이내)' },
        { value: 'old', text: '2022년 12월 31일 이전 출생아만 있음' },
        { value: 'none', text: '자녀 없음' },
      ],
    },
    {
      key: 'house',
      label: '주택 보유 현황',
      options: [
        { value: 'none', text: '무주택 세대주' },
        { value: 'one', text: '1주택 (기존 대출 대환 목적)' },
        { value: 'multi', text: '2주택 이상 보유' },
      ],
    },
    {
      key: 'income',
      label: '부부합산 연소득',
      options: [
        { value: 'low', text: '1억 3천만원 이하' },
        { value: 'mid', text: '1억 3천만원 초과 ~ 2억원 이하 (맞벌이)' },
        { value: 'high', text: '2억원 초과' },
      ],
    },
  ],
  evaluate: (sel): CheckerResult => {
    const { birth, house, income } = sel

    if (birth !== 'eligible') {
      return {
        pass: false,
        headline: '출산 조건이 맞지 않아요',
        detail: (
          <p>
            신생아 특례대출은 2023년 1월 1일 이후 출생아가 있고, 대출 접수일 기준 2년 이내 출산이어야 해요.
            2022년 이전 출생아는 해당되지 않아요. 일반 디딤돌대출이나 버팀목전세대출을 알아보세요.
          </p>
        ),
        badges: ['출산 조건 미충족'],
        links: [
          {
            icon: '📋',
            title: '주택도시기금 대출 상품 확인',
            desc: '일반 디딤돌·버팀목 대출 보기',
            href: 'https://nhuf.molit.go.kr',
          },
        ],
      }
    }

    if (house === 'multi') {
      return {
        pass: false,
        headline: '2주택 이상이면 신청이 어려워요',
        detail: (
          <p>
            신생아 특례대출은 무주택 세대주가 대상이에요. 1주택자는 기존 주택담보대출을 신생아 특례 조건으로
            바꾸는 대환대출만 가능해요. 2주택 이상은 대상이 아니에요.
          </p>
        ),
        badges: ['주택 조건 미충족'],
        links: [],
      }
    }

    if (income === 'high') {
      return {
        pass: false,
        headline: '소득이 기준을 초과해요',
        detail: (
          <p>
            맞벌이 가구도 부부합산 연소득 2억원 이하여야 신청 가능해요.
            소득이 2억원을 초과하면 일반 주택담보대출을 알아봐야 해요.
          </p>
        ),
        badges: ['소득 기준 초과'],
        links: [],
      }
    }

    const isMaekbyeol = income === 'mid'
    const rateNote = isMaekbyeol
      ? '소득 구간에 따라 약 3.50%~4.50% 금리가 적용돼요'
      : '소득 구간에 따라 최저 1.80% 금리가 적용될 수 있어요'

    return {
      pass: true,
      headline: '신생아 특례대출 신청 가능해요',
      detail: (
        <p>
          출산·주택·소득 3가지 조건을 충족했어요. {rateNote}.
          순자산 기준(구입자금 5.11억원 이하, 전세자금 3.45억원 이하)도 확인한 뒤 수탁은행이나 기금e든든으로 신청하면 돼요.
        </p>
      ),
      badges: ['출산 조건 충족', '주택 조건 충족', '소득 조건 충족'],
      links: [
        {
          icon: '📋',
          title: '신청 자격 상세 확인',
          desc: '소득·자산·출산 기준 자세히 보기',
          href: '/w/신생아-특례대출-신청-조건',
        },
        {
          icon: '📝',
          title: '신청 방법과 서류 확인',
          desc: '온라인·은행 신청 절차 보기',
          href: '/w/신생아-특례대출-신청-방법-서류',
        },
      ],
    }
  },
}

export default function ShinSaengaTeukreyeChecker() {
  return <GenericChecker config={config} />
}
