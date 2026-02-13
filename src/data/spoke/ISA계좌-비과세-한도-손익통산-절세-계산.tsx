/**
 * ISA계좌 비과세 한도 손익통산 절세 계산 — 스포크 1
 * 체커 포함 (Type B 계산형)
 */

import type { SpokeData } from '@/data/spoke/types'
import type { CheckerConfig, CheckerResult } from '@/data/checker-types'
import {
  SpokeTable, TipBox, FormulaBox, WarnBox,
  Chips, SpokeCompareCards,
} from '@/components/spoke/SpokeBlocks'

/* ── 체커: ISA 절세 계산기 (Type B 계산형) ── */
export const checkerConfig: CheckerConfig = {
  title: 'ISA 절세 계산기',
  subtitle: '2가지만 선택하면 일반 계좌 대비 절세액을 알려드려요',
  intro: (
    <p>ISA 유형과 연간 배당·이자 수익을 선택하세요. 3년 누적 기준으로 일반 계좌보다 얼마나 절세되는지 바로 계산해요.</p>
  ),
  groups: [
    {
      key: 'type',
      label: 'ISA 유형',
      options: [
        { value: 'seomin', text: '서민형 (비과세 400만원)' },
        { value: 'general', text: '일반형 (비과세 200만원)' },
      ],
    },
    {
      key: 'income',
      label: '연간 배당·이자 수익',
      options: [
        { value: '500000', text: '약 50만원' },
        { value: '1000000', text: '약 100만원' },
        { value: '2000000', text: '약 200만원' },
        { value: '3000000', text: '약 300만원' },
      ],
    },
  ],
  evaluate: (sel): CheckerResult => {
    const exemptLimit = sel.type === 'seomin' ? 4_000_000 : 2_000_000
    const annual = Number(sel.income)
    const total3y = annual * 3
    const normalTax = Math.round(total3y * 0.154)
    const isaTaxable = Math.max(0, total3y - exemptLimit)
    const isaTax = Math.round(isaTaxable * 0.099)
    const savings = normalTax - isaTax
    const typeName = sel.type === 'seomin' ? '서민형' : '일반형'
    const fmtW = (n: number) => `${(n / 10000).toFixed(1)}만원`

    return {
      pass: true,
      headline: `일반 계좌보다 ${fmtW(savings)} 절세돼요`,
      detail: (
        <>
          <p>
            연간 배당·이자 {fmtW(annual)}이면 3년 누적 {fmtW(total3y)}이에요.
            일반 계좌는 15.4% 세금으로 {fmtW(normalTax)}을 내지만,
            ISA {typeName}은 비과세 {fmtW(exemptLimit)} 적용 후 {fmtW(isaTax)}만 내면 돼요.
          </p>
        </>
      ),
      amount: {
        value: `약 ${fmtW(savings)}`,
        unit: '3년 절세액',
        formula: `일반 계좌 세금 ${fmtW(normalTax)} − ISA 세금 ${fmtW(isaTax)}`,
      },
      badges: [typeName, `비과세 ${fmtW(exemptLimit)}`, '초과분 9.9%'],
      links: [
        { icon: '📋', title: 'ISA 유형별 차이 확인', desc: '중개형·서민형·일반형 상세 비교', href: '/w/ISA계좌-중개형-서민형-일반형-유형-선택-기준' },
        { icon: '📝', title: 'ISA 개설하러 가기', desc: '5분 비대면 개설 절차', href: '/w/ISA계좌-가입-조건-개설-방법-필요-서류' },
      ],
    }
  },
}

const data: SpokeData = {
  slug: 'ISA계좌-비과세-한도-손익통산-절세-계산',

  meta: {
    title: 'ISA계좌 비과세 한도 손익통산 절세 계산',
    description: 'ISA계좌 비과세 한도는 서민형 400만원, 일반형 200만원이에요. 손익통산으로 손실 상계도 되고, 초과분은 9.9%만 내요. 안 하면 15.4% 세금 다 내요.',
    keywords: [
      'ISA계좌 비과세 한도',
      'ISA계좌 손익통산',
      'ISA계좌 절세',
      'ISA계좌 세금 계산',
    ],
    ogTitle: 'ISA계좌 비과세 한도 손익통산 절세 계산 | 머니위키',
    ogDescription: 'ISA 비과세 한도, 손익통산 적용법, 수익 구간별 절세액, 세금 계산까지.',
  },

  hub: {
    url: '/w/ISA계좌-세금혜택-비과세-한도-중개형-서민형-비교',
    name: 'ISA계좌 세금혜택 비과세 한도 중개형 서민형 비교',
  },

  breadcrumb: ['금융/투자', 'ISA계좌', '비과세 한도와 절세'],

  summary3: [
    <>비과세 한도: 서민형 <strong>400만원</strong>, 일반형 <strong>200만원</strong> (3년 누적)</>,
    <>비과세 초과분은 <strong>9.9% 분리과세</strong> — 일반 계좌(15.4%)보다 35% 절세</>,
    <>손익통산 적용: A주식 −100만원 + B주식 +200만원 = 순이익 <strong>100만원에만 과세</strong></>,
  ],

  sourceBar: {
    badge: '출처',
    name: '금융위원회 ISA 세제혜택 기준',
    date: '2026.01',
  },

  prevNext: {
    prev: { title: 'ISA계좌 세금혜택 비과세 한도 중개형 서민형 비교', href: '/w/ISA계좌-세금혜택-비과세-한도-중개형-서민형-비교' },
    next: { title: 'ISA계좌 중개형 서민형 일반형 유형 선택 기준', href: '/w/ISA계좌-중개형-서민형-일반형-유형-선택-기준' },
  },

  stickyBar: {
    topLabel: '서민형 비과세 한도',
    value: '400만원',
    buttonText: '절세 계산기 →',
    scrollTo: '#checker',
  },

  hero: {
    badge: '2026년 기준',
    h1: (
      <>
        ISA계좌 <span className="text-[#1E3A5F]">비과세 한도</span>와 손익통산 절세 계산
      </>
    ),
    intro: (
      <p className="text-base text-neutral-500 leading-relaxed">
        서민형 <strong>400만원</strong>, 일반형 <strong>200만원</strong>까지 배당·이자 세금 0원. 손익통산과 9.9% 분리과세까지, ISA 절세의 모든 것을 정리했어요.
      </p>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: 'ISA계좌 세금혜택, 유형 비교, 개설, 투자 전략 총정리',
    },
  },

  toc: [
    { id: 's1', label: 'ISA계좌 비과세 한도는 얼마인가요?' },
    { id: 's2', label: 'ISA계좌 손익통산은 어떻게 적용되나요?' },
    { id: 'checker', label: 'ISA 절세 계산기' },
    { id: 's3', label: 'ISA계좌 절세 효과는 얼마나 되나요?' },
    { id: 's4', label: 'ISA계좌 세금 계산은 어떻게 하나요?' },
    { id: 's-faq', label: '자주 묻는 질문' },
  ],

  sections: [
    {
      id: 's1',
      number: 'SECTION 01',
      heading: 'ISA계좌 비과세 한도는 얼마인가요?',
      subtitle: '서민형 400만원, 일반형 200만원까지 배당·이자 세금 0원',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            ISA 비과세 한도는 <strong>가입 기간 전체를 합산한 누적 금액</strong>이에요. 매년 400만원이 아니라 3년 동안 받은 배당·이자를 전부 더해서, 서민형은 400만원, 일반형은 200만원까지 세금이 0원이에요. 비과세 대상은 배당금, ETF 분배금, 펀드 수익, 예금·적금 이자예요. 주식을 팔아서 번 매매차익은 원래 비과세이므로 ISA와 무관해요.
          </p>

          <Chips
            items={[
              { icon: '💰', label: '서민형 비과세', value: '400만원', href: '#checker' },
              { icon: '📊', label: '일반형 비과세', value: '200만원', href: '#checker' },
              { icon: '📉', label: '초과분 세율', value: '9.9%' },
              { icon: '⚠️', label: '일반 계좌', value: '15.4%' },
            ]}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            비과세 한도를 넘어도 ISA가 유리해요. 초과분에는 <strong>9.9% 분리과세</strong>만 적용되는데, 일반 계좌의 15.4%보다 5.5%p 낮아요. 배당 600만원 받았다면 일반 계좌는 92.4만원 세금인데, ISA 서민형은 19.8만원만 내면 돼요.
          </p>

          <TipBox title="비과세 한도는 연장하면 추가로 받아요">
            3년 만기 후 5년 연장하면 서민형은 추가 400만원(총 800만원), 일반형은 추가 200만원(총 400만원)까지 비과세예요.
          </TipBox>
        </>
      ),
      pasBridge: {
        href: '#s2',
        question: '주식에서 손해 본 건 세금에 반영이 안 될까요?',
        answer: <>ISA만의 특별한 장점이 있어요. 손실과 수익을 상계하는 <strong>손익통산</strong>이 적용돼요.</>,
        buttonText: '손익통산 알아보기 →',
      },
    },

    {
      id: 's2',
      number: 'SECTION 02',
      heading: 'ISA계좌 손익통산은 어떻게 적용되나요?',
      subtitle: '이익과 손실을 합산해서 순이익에만 과세',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            손익통산은 ISA에서만 적용되는 큰 장점이에요. A주식에서 100만원 손해보고 B주식에서 200만원 벌었다면, 일반 계좌에서는 B주식 수익 200만원 전체에 세금을 매겨요. 하지만 ISA에서는 순이익 <strong>100만원(200만원 - 100만원)에만 과세</strong>해요.
          </p>

          <SpokeCompareCards cards={[
            { title: '일반 계좌', subtitle: '손익통산 미적용', items: ['A주식 손실: 반영 안 됨', 'B주식 수익: 200만원', '과세 대상: 200만원 전체', '세금 (15.4%): 30.8만원'] },
            { title: 'ISA 계좌', subtitle: '손익통산 적용', items: ['A주식 손실: −100만원', 'B주식 수익: +200만원', '과세 대상 (통산): 100만원', '세금 (비과세 적용): 0원'], recommended: true, recLabel: '유리' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            위 예시에서 ISA 서민형이면 순이익 100만원이 비과세 한도(400만원) 안이라 세금이 0원이에요. 일반 계좌면 30.8만원을 냈을 거예요. 손익통산은 배당·이자뿐 아니라 <strong>매매차익과 매매손실도 상계</strong>해줘요. 여러 종목에 분산 투자할수록 손익통산 효과가 커져요.
          </p>

          <TipBox title="손익통산은 해지 시 한 번에 정산돼요">
            중간에 매도할 때 실시간으로 계산하는 게 아니라, 만기 또는 해지 시 전체 수익과 손실을 합산해서 세금을 매겨요. 매매할 때마다 세금을 걱정할 필요 없어요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '#checker',
        badge: '계산기',
        title: '내 ISA 절세액이 궁금하다면?',
        desc: '유형과 연간 수익만 선택하면 3년 절세액을 바로 계산해 드려요.',
        icon: 'calc',
      },
    },

    {
      id: 'checker',
      number: 'CHECK',
      heading: 'ISA 절세 얼마나 되나요?',
      subtitle: '2가지만 선택하면 바로 계산해요',
      checkerConfig,
      content: null,
    },

    {
      id: 's3',
      number: 'SECTION 03',
      heading: 'ISA계좌 절세 효과는 얼마나 되나요?',
      subtitle: '투자 금액·배당률별 3년 절세액 비교',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            절세 효과는 배당을 많이 받을수록 커져요. 배당이 비과세 한도 안에 들어오면 세금 자체가 0원이고, 한도를 넘어도 9.9%만 내니까 일반 계좌보다 항상 유리해요. 아래 표에서 투자 금액과 배당률에 따른 3년 절세액을 확인하세요.
          </p>

          <SpokeTable
            id="tbl-savings"
            title="투자 금액별 3년 절세액 (서민형 기준)"
            subtitle="배당률 4% 기준 · 비과세 한도 400만원"
            headers={['투자금', '3년 배당', '일반 계좌 세금', 'ISA 세금', '절세액']}
            rows={[
              ['500만원', '60만원', '9.2만원', '0원', '9.2만원'],
              ['1,000만원', '120만원', '18.5만원', '0원', '18.5만원'],
              ['2,000만원', '240만원', '37.0만원', '0원', '37.0만원'],
              ['3,000만원', '360만원', '55.4만원', '0원', '55.4만원'],
              ['5,000만원', '600만원', '92.4만원', '19.8만원', '72.6만원'],
            ]}
            highlightCol={4}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            3,000만원을 배당률 4% 고배당 ETF에 넣으면 3년 동안 55.4만원을 절세해요. 5,000만원이면 72.6만원이에요. 배당률이 높을수록, 투자 금액이 클수록 절세액이 커지는 구조예요. 배당이 적은 성장주는 ISA에 넣어도 절세 효과가 거의 없으니까 고배당 ETF 위주로 담는 게 핵심이에요.
          </p>

          <WarnBox>
            <strong>배당 0원이면 절세 0원:</strong> 매매차익은 원래 비과세라서 ISA 효과가 없어요. KODEX 레버리지처럼 배당 없는 ETF만 사면 ISA를 안 하는 것과 같아요.
          </WarnBox>
        </>
      ),
      pasBridge: {
        href: '#s4',
        question: '실제로 세금이 어떻게 계산되는지 궁금하시죠?',
        answer: <>만기 해지 시 배당·이자를 합산하고 비과세 한도를 빼는 방식이에요. 자동으로 계산되니까 복잡하지 않아요.</>,
        buttonText: '세금 계산 방법 →',
      },
    },

    {
      id: 's4',
      number: 'SECTION 04',
      heading: 'ISA계좌 세금 계산은 어떻게 하나요?',
      subtitle: '해지 시 자동 정산 — 비과세 한도 차감 후 9.9% 적용',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            ISA 세금은 매년 내는 게 아니라 <strong>해지할 때 한 번에 정산</strong>돼요. 만기 또는 중도해지 시 3년치 배당·이자를 전부 합산하고, 비과세 한도를 빼고, 남은 금액에 세율을 적용해요. 증권사·은행이 자동으로 계산해서 세금을 떼고 입금해주니까 직접 계산할 필요 없어요.
          </p>

          <FormulaBox
            lines={[
              { text: 'ISA 세금 계산 공식', comment: true },
              { text: '① 과세 대상 = 배당·이자 합계 − 비과세 한도' },
              { text: '② 세금 = 과세 대상 × 9.9% (3년 유지 시)' },
              { text: '③ 실수령 = 원금 + 수익 − 세금' },
            ]}
          />

          <SpokeTable
            id="tbl-calc-example"
            title="세금 계산 예시 (서민형, 3년 유지)"
            subtitle="배당 500만원 + 매매차익 300만원"
            headers={['항목', '금액', '비고']}
            rows={[
              ['원금', '1,800만원', '내가 넣은 돈'],
              ['배당·이자', '500만원', '과세 대상'],
              ['매매차익', '300만원', '원래 비과세 (ISA 무관)'],
              ['비과세 차감', '−400만원', '서민형 한도'],
              ['과세 대상', '100만원', '500만 − 400만'],
              ['세금', '9.9만원', '100만 × 9.9%'],
              ['실수령', '2,590.1만원', '원금 + 수익 − 세금'],
            ]}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            같은 조건에서 일반 계좌였다면 배당 500만원에 15.4% = 77만원 세금이에요. ISA 덕분에 <strong>67.1만원을 아끼는</strong> 셈이에요. 중도해지하면 비과세 한도가 적용 안 돼서 15.4% 전액 과세예요. 3년은 꼭 채우세요.
          </p>

          <TipBox title="ISA 만기 후 연금전환하면 추가 세액공제">
            ISA 만기 자금을 연금저축·IRP로 전환하면 전환 금액의 10%(최대 300만원)를 <strong>세액공제</strong> 받을 수 있어요. 연금저축 세액공제 한도(600만원)와 별도로 적용돼요.
          </TipBox>
        </>
      ),
    },

    {
      id: 's-faq',
      number: '05',
      heading: '자주 묻는 질문',
      subtitle: '',
      content: null,
    },
  ],

  faq: [
    { question: 'ISA 비과세 한도 400만원은 매년인가요?', answer: '<strong>아니요, 3년 누적이에요.</strong> 가입 기간 전체의 배당·이자를 합산해서 서민형 400만원, 일반형 200만원까지 비과세예요. 매년 리셋되는 게 아니에요.' },
    { question: 'ISA 손익통산은 매매차익에도 적용되나요?', answer: '<strong>네.</strong> 배당·이자뿐 아니라 주식·ETF 매매차익과 매매손실도 상계해요. A종목 -100만원, B종목 +300만원이면 순이익 200만원에만 과세해요.' },
    { question: '중도해지하면 세금이 얼마나 늘어나요?', answer: '비과세 한도가 통째로 사라지고 <strong>15.4%</strong> 전액 과세돼요. 배당 500만원 기준으로 3년 유지 시 세금 9.9만원 vs 중도해지 시 77만원이에요. 67만원 차이예요.' },
    { question: 'ISA 만기 후 연금전환하면 뭐가 좋아요?', answer: 'ISA 만기 자금을 연금저축·IRP로 전환하면 전환금액의 10%(최대 300만원)를 <strong>추가 세액공제</strong> 받아요. 연금저축 기본 한도(600만원)와 별도예요.' },
  ],

  relatedSpokes: [
    { badge: '유형', title: 'ISA계좌 중개형 서민형 일반형 유형 선택 기준', desc: '운용방식별 장단점 + 최적 조합', href: '/w/ISA계좌-중개형-서민형-일반형-유형-선택-기준' },
    { badge: '가입', title: 'ISA계좌 가입 조건 개설 방법 필요 서류', desc: '비대면 5분 개설 + 증권사 비교', href: '/w/ISA계좌-가입-조건-개설-방법-필요-서류' },
    { badge: '한도', title: 'ISA계좌 납입한도 연간 2000만원 이월 규정', desc: '이월 계산법 + 한도 활용 전략', href: '/w/ISA계좌-납입한도-연간-2000만원-이월-규정' },
    { badge: '만기', title: 'ISA계좌 만기 해지 중도인출 연금전환 방법', desc: '만기 절차 + 연금전환 세액공제', href: '/w/ISA계좌-만기-해지-중도인출-연금전환-방법' },
  ],

  sources: [
    { name: 'ISA 세제혜택 안내', url: 'https://www.fsc.go.kr', org: '금융위원회' },
    { name: 'ISA 세금 계산', url: 'https://www.nts.go.kr', org: '국세청' },
  ],
}

export default data
