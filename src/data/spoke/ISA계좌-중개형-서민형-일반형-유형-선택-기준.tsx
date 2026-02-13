/**
 * ISA계좌 중개형 서민형 일반형 유형 선택 기준 — 스포크 2
 */

import type { SpokeData } from '@/data/spoke/types'
import {
  SpokeTable, TipBox, WarnBox,
  SpokeCompareCards, SpokeChecklist,
} from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: 'ISA계좌-중개형-서민형-일반형-유형-선택-기준',

  meta: {
    title: 'ISA계좌 중개형 서민형 일반형 유형 선택 기준',
    description: 'ISA계좌 중개형은 주식 직접거래, 신탁형은 은행 맡기기예요. 서민형은 비과세 400만원, 일반형은 200만원이에요. 잘못 고르면 해지 후 재개설해야 해요.',
    keywords: [
      'ISA계좌 중개형',
      'ISA계좌 서민형',
      'ISA계좌 일반형',
      'ISA계좌 유형 선택',
    ],
    ogTitle: 'ISA계좌 중개형 서민형 일반형 유형 선택 기준 | 머니위키',
    ogDescription: '중개형·신탁형·일임형 차이, 서민형·일반형 비과세 한도, 최적 조합까지.',
  },

  hub: {
    url: '/w/ISA계좌-세금혜택-비과세-한도-중개형-서민형-비교',
    name: 'ISA계좌 세금혜택 비과세 한도 중개형 서민형 비교',
  },

  breadcrumb: ['금융/투자', 'ISA계좌', '유형 선택'],

  summary3: [
    <>중개형은 <strong>주식·ETF 직접 매매</strong>, 신탁형은 은행이 펀드 운용, 일임형은 증권사 위탁</>,
    <>서민형(총급여 5,000만원 이하)은 비과세 <strong>400만원</strong>, 일반형은 <strong>200만원</strong></>,
    <>가장 인기 있는 조합은 <strong>중개형 + 서민형</strong> — 수수료 낮고 비과세 한도 큼</>,
  ],

  sourceBar: {
    badge: '출처',
    name: '금융위원회 ISA 유형별 안내',
    date: '2026.01',
  },

  prevNext: {
    prev: { title: 'ISA계좌 비과세 한도 손익통산 절세 계산', href: '/w/ISA계좌-비과세-한도-손익통산-절세-계산' },
    next: { title: 'ISA계좌 가입 조건 개설 방법 필요 서류', href: '/w/ISA계좌-가입-조건-개설-방법-필요-서류' },
  },

  stickyBar: {
    topLabel: '추천 조합',
    value: '중개형 + 서민형',
    buttonText: '허브에서 전체 보기 →',
    scrollTo: '#s1',
  },

  hero: {
    badge: '2026년 기준',
    h1: (
      <>
        ISA계좌 <span className="text-[#1E3A5F]">중개형 서민형 일반형</span> 유형 선택 기준
      </>
    ),
    intro: (
      <p className="text-base text-neutral-500 leading-relaxed">
        운용 방식(중개형·신탁형·일임형) + 소득 기준(서민형·일반형)을 조합해서 선택해요. 한 번 정하면 바꾸기 어려우니 처음에 제대로 고르세요.
      </p>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: 'ISA계좌 세금혜택, 유형 비교, 개설, 투자 전략 총정리',
    },
  },

  toc: [
    { id: 's1', label: 'ISA계좌 중개형은 뭐가 다른가요?' },
    { id: 's2', label: 'ISA계좌 서민형 조건은 어떻게 되나요?' },
    { id: 's3', label: 'ISA계좌 일반형은 누가 신청하나요?' },
    { id: 's4', label: 'ISA계좌 유형 선택은 어떻게 하나요?' },
    { id: 's-faq', label: '자주 묻는 질문' },
  ],

  sections: [
    {
      id: 's1',
      number: 'SECTION 01',
      heading: 'ISA계좌 중개형은 뭐가 다른가요?',
      subtitle: '내가 직접 주식·ETF를 사고팔 수 있는 유형',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            ISA는 <strong>운용 방식</strong>에 따라 중개형·신탁형·일임형 3가지로 나뉘어요. 중개형은 내가 원하는 주식과 ETF를 자유롭게 사고팔 수 있어요. 삼성전자, KODEX 200, TIGER 미국S&P500 같은 종목을 직접 골라서 투자해요. 수수료도 연 0.1~0.3%로 가장 저렴해요.
          </p>

          <SpokeCompareCards cards={[
            { title: '중개형', subtitle: '본인 직접 투자', items: ['운용 주체: 본인 직접', '투자 대상: 주식·ETF·펀드', '연 수수료: 0.1~0.3%', '추천 대상: 투자 경험 있는 사람'], recommended: true, recLabel: '추천' },
            { title: '신탁형', subtitle: '은행 위탁 운용', items: ['운용 주체: 은행', '투자 대상: 펀드·예금', '연 수수료: 0.3~0.5%', '추천 대상: 주식 모르는 사람'] },
            { title: '일임형', subtitle: '전문가 맡기기', items: ['운용 주체: 증권사 전문가', '투자 대상: 전문가 추천', '연 수수료: 0.5~1.0%', '추천 대상: 바쁜 사람'] },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            신탁형은 은행이 운용하는 펀드 위주예요. 주식을 직접 사고팔 수 없고, 은행이 추천하는 펀드만 선택할 수 있어요. 안전하지만 수익률이 낮은 편이에요. 일임형은 증권사 전문가가 알아서 운용해주는데, 수수료가 연 0.5~1.0%라 비싸요. 3,000만원 투자 기준으로 중개형과 일임형의 수수료 차이가 3년에 최대 6만원 정도 나요.
          </p>

          <TipBox title="주식 몰라도 중개형 OK">
            중개형으로 개설해서 KODEX 200이나 TIGER 미국S&P500 같은 안전한 ETF만 매달 사도 돼요. 수수료도 낮고 수익률도 괜찮아요.
          </TipBox>
        </>
      ),
      pasBridge: {
        href: '#s2',
        question: '운용 방식은 정했는데, 서민형 조건이 되는지 궁금하시죠?',
        answer: <>작년 총급여가 5,000만원 이하면 서민형이에요. 비과세 한도가 <strong>2배(400만원)</strong>로 늘어나요.</>,
        buttonText: '서민형 조건 확인 →',
      },
    },

    {
      id: 's2',
      number: 'SECTION 02',
      heading: 'ISA계좌 서민형 조건은 어떻게 되나요?',
      subtitle: '총급여 5,000만원 이하면 비과세 한도 400만원',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            서민형은 <strong>작년 총급여 5,000만원 이하</strong>(종합소득 3,800만원 이하) 근로·사업소득자가 신청할 수 있어요. 비과세 한도가 일반형의 2배인 400만원이라 절세 효과가 훨씬 커요. 조건이 되면 무조건 서민형으로 신청하세요.
          </p>

          <SpokeTable
            id="tbl-seomin"
            title="서민형 vs 일반형 세금 차이 (배당 500만원 기준)"
            subtitle="3년 누적 기준"
            headers={['구분', '서민형', '일반형', '차이']}
            rows={[
              ['비과세 한도', '400만원', '200만원', '+200만원'],
              ['과세 대상', '100만원', '300만원', '−200만원'],
              ['세금 (9.9%)', '9.9만원', '29.7만원', '−19.8만원'],
              ['실수령', '490.1만원', '470.3만원', '+19.8만원'],
            ]}
            highlightCol={1}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            서민형이면 같은 수익을 올려도 <strong>19.8만원 더 받아요</strong>. 소득 기준은 올해가 아니라 <strong>작년 소득</strong>이에요. 홈택스에서 소득금액증명원을 발급받으면 바로 확인할 수 있어요. 농업·어업하는 분은 농어민형(사업소득 3,800만원 이하)으로 신청하면 서민형과 같은 비과세 400만원을 받아요.
          </p>

          <WarnBox>
            <strong>소득이 올라서 조건 초과하면:</strong> 자동 전환이 안 돼요. 직접 일반형으로 전환 신청해야 해요. 소득 기준은 매년 재확인하니까 작년 소득이 바뀌면 체크하세요.
          </WarnBox>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '일반형',
        title: '서민형 조건이 안 되면 일반형밖에 없나요?',
        desc: '일반형도 200만원 비과세 + 9.9% 분리과세라서 일반 계좌보다 훨씬 유리해요.',
        icon: 'info',
      },
    },

    {
      id: 's3',
      number: 'SECTION 03',
      heading: 'ISA계좌 일반형은 누가 신청하나요?',
      subtitle: '소득 무관 누구나 가입 가능, 비과세 200만원',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            일반형은 만 19세 이상이면 <strong>소득·직업 관계없이 누구나</strong> 가입할 수 있어요. 총급여 5,000만원 초과 직장인, 프리랜서, 학생, 무직자 모두 OK예요. 비과세 한도는 200만원으로 서민형보다 작지만, 초과분에 9.9% 분리과세가 적용되니까 일반 계좌(15.4%)보다는 항상 이득이에요.
          </p>

          <SpokeTable
            id="tbl-general-savings"
            title="일반형 절세 효과 (배당 수익별)"
            subtitle="3년 누적 기준 · 일반 계좌 대비"
            headers={['3년 배당', '일반 계좌 세금', 'ISA 일반형 세금', '절세액']}
            rows={[
              ['100만원', '15.4만원', '0원', '15.4만원'],
              ['200만원', '30.8만원', '0원', '30.8만원'],
              ['400만원', '61.6만원', '19.8만원', '41.8만원'],
              ['600만원', '92.4만원', '39.6만원', '52.8만원'],
            ]}
            highlightCol={3}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            배당 200만원까지는 세금이 완전히 0원이고, 600만원이면 52.8만원을 아껴요. 서민형 조건이 안 되더라도 ISA를 안 하는 것보다는 일반형이라도 만드는 게 훨씬 나아요. 고소득자일수록 투자 금액이 크니까 절세 효과도 그만큼 커져요.
          </p>

          <TipBox title="일반형에서 서민형으로 전환 가능할까요?">
            소득이 줄어서 서민형 조건을 충족하게 되면 전환할 수 있어요. 하지만 해지 후 재개설 방식이라 3년 의무기간이 리셋돼요. 처음부터 서민형 조건 확인하고 개설하는 게 중요해요.
          </TipBox>
        </>
      ),
      pasBridge: {
        href: '#s4',
        question: '그래서 나한테 맞는 조합이 뭘까요?',
        answer: <>운용 방식(중개형/신탁형) + 소득 기준(서민형/일반형) 조합별 추천을 정리했어요.</>,
        buttonText: '최적 조합 찾기 →',
      },
    },

    {
      id: 's4',
      number: 'SECTION 04',
      heading: 'ISA계좌 유형 선택은 어떻게 하나요?',
      subtitle: '운용 방식 + 소득 기준 조합으로 선택',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            ISA 유형은 운용 방식(중개형/신탁형/일임형)과 소득 기준(일반형/서민형)을 동시에 선택해요. 가장 인기 있는 조합은 <strong>중개형 + 서민형</strong>이에요. 주식·ETF를 직접 거래하면서 400만원 비과세를 받을 수 있으니까요.
          </p>

          <SpokeChecklist items={[
              { text: '주식 경험 있음 + 소득 5,000만원 이하', done: true, note: '→ 중개형 + 서민형 (최적)' },
              { text: '주식 경험 있음 + 소득 5,000만원 초과', done: true, note: '→ 중개형 + 일반형' },
              { text: '주식 잘 모름 + 안전하게 하고 싶음', note: '→ 신탁형 + 서민형/일반형' },
              { text: '바쁘고 전문가에게 맡기고 싶음', note: '→ 일임형 (수수료 높음 주의)' },
            ]}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            한 번 선택하면 <strong>바꾸기가 까다로워요</strong>. 중개형에서 신탁형으로 바꾸려면 해지하고 재개설해야 하는데, 3년 의무기간이 리셋돼요. 서민형에서 일반형 전환은 소득 초과 시 가능하지만, 일반형에서 서민형으로는 재개설만 가능해요. 처음에 제대로 선택하는 게 중요해요.
          </p>

          <WarnBox>
            <strong>1인 1계좌 규정:</strong> ISA는 한 사람이 1개만 만들 수 있어요. 다른 증권사·은행에 추가 개설 불가예요. 계좌를 이동하려면 해지 후 다른 곳에서 재개설해야 해요.
          </WarnBox>
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
    { question: 'ISA 중개형과 신탁형 둘 다 만들 수 있나요?', answer: '<strong>안 돼요.</strong> 1인 1계좌라서 중개형이든 신탁형이든 하나만 선택해야 해요. 두 개 동시 보유는 불가능해요.' },
    { question: 'ISA 서민형 신청했는데 소득이 초과하면 어떻게 되나요?', answer: '자동 전환이 안 돼요. <strong>직접 일반형 전환 신청</strong>을 해야 해요. 전환하면 비과세 한도만 200만원으로 줄고 기존 유지 기간은 유효해요.' },
    { question: '신탁형에서 중개형으로 바꿀 수 있나요?', answer: '<strong>해지 후 재개설</strong>해야 해요. 기존 계좌를 해지하고 중개형으로 새로 만들어야 하는데, 3년 의무기간이 리셋되니까 신중하게 결정하세요.' },
    { question: '일임형은 수익률이 높나요?', answer: '전문가가 운용하지만 <strong>수익률이 반드시 높지는 않아요</strong>. 수수료가 연 0.5~1.0%로 비싸서 실 수익률은 오히려 낮을 수 있어요. 중개형 ETF 투자가 보통 더 효율적이에요.' },
  ],

  relatedSpokes: [
    { badge: '절세', title: 'ISA계좌 비과세 한도 손익통산 절세 계산', desc: '수익 구간별 절세액 + 계산기', href: '/w/ISA계좌-비과세-한도-손익통산-절세-계산' },
    { badge: '가입', title: 'ISA계좌 가입 조건 개설 방법 필요 서류', desc: '비대면 5분 개설 + 증권사 비교', href: '/w/ISA계좌-가입-조건-개설-방법-필요-서류' },
    { badge: '한도', title: 'ISA계좌 납입한도 연간 2000만원 이월 규정', desc: '이월 계산법 + 한도 활용 전략', href: '/w/ISA계좌-납입한도-연간-2000만원-이월-규정' },
    { badge: '만기', title: 'ISA계좌 만기 해지 중도인출 연금전환 방법', desc: '만기 절차 + 연금전환 세액공제', href: '/w/ISA계좌-만기-해지-중도인출-연금전환-방법' },
  ],

  sources: [
    { name: 'ISA 계좌 유형별 안내', url: 'https://www.fsc.go.kr', org: '금융위원회' },
    { name: 'ISA 계좌 비교', url: 'https://www.fss.or.kr', org: '금융감독원' },
  ],
}

export default data
