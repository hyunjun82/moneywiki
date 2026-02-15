import type { SpokeData } from '@/data/spoke/types'
import { FormulaBox, RateCards, SpokeTable, TipBox, DetailBox, SpokeTimeline } from '@/components/spoke/SpokeBlocks'

// --- Table Data ---
const TAX_COMPARISON_ROWS = [
  ['이자소득 2,000만원 이하', '15.4%', '15.4%', '동일'],
  ['이자소득 2,000만원 초과', '종합과세 6~45%', '15.4% 분리과세', '국채 유리'],
  ['이자소득 5,000만원', '약 24~35%', '15.4%', '최대 20%p 절감'],
  ['이자소득 1억원', '약 35~38%', '15.4%', '최대 23%p 절감'],
]

// --- Spoke Data ---
const data: SpokeData = {
  slug: '개인투자용-국채-수익률-세금-혜택-복리-비과세',

  meta: {
    title: '개인투자용 국채 수익률 세금 혜택 | 복리 비과세',
    description: '국채 수익률은 높은데 세금이 걱정이라면, 분리과세 15.4% 비과세 혜택을 받을 수 있다는 거 아시나요? 복리 가산금리로 10년물 54%, 20년물 147% 수익까지 가능해요. 절세 계산법을 알려드려요.',
    keywords: [
      '개인투자용 국채 수익률',
      '국채 세금 혜택',
      '국채 복리 가산금리',
      '국채 비과세',
    ],
    ogTitle: '개인투자용 국채 수익률 세금 혜택 | 머니위키',
    ogDescription: '복리 + 분리과세 15.4% 절세 효과를 직접 계산해 보세요.',
  },

  hub: {
    url: '/w/퇴직연금-국채-투자-DC형-IRP-연금형',
    name: '퇴직연금 국채 투자 | DC형 IRP 계좌 연금형 국채',
  },

  breadcrumb: ['퇴직연금', '국채 투자', '개인투자용 국채 수익률 세금 혜택'],

  summary3: [
    <>
      10년물 가산금리 <strong>1.0%p</strong>, 20년물 <strong>1.25%p</strong> 연복리 적용
    </>,
    <>
      만기 보유 시 이자소득 <strong>분리과세 15.4%</strong>로 종합과세 회피
    </>,
    <>
      매입한도 <strong>연간 2억원</strong>, 2027년 12월 31일까지 세제혜택 적용
    </>,
  ],

  sourceBar: {
    badge: '정책 출처',
    name: '기획재정부 2026년 국채 발행 계획 + KDI 경제교육센터',
    date: '2026.02',
  },

  prevNext: {
    prev: {
      title: '연금형 개인투자용 국채 신청 방법',
      href: '/w/연금형-개인투자용-국채-신청-방법-10년물-20년물',
    },
    next: {
      title: '퇴직연금 국채 vs ETF 비교',
      href: '/w/퇴직연금-국채-vs-ETF-비교-안정성-수익률',
    },
  },

  stickyBar: {
    topLabel: '20년물 만기수익률',
    value: '147%',
    buttonText: '수익률 계산 보기 →',
    scrollTo: '#sec-yield',
  },

  hero: {
    badge: '2026년 최신',
    h1: (
      <>
        개인투자용 국채 <span className="text-[#1E3A5F]">수익률과 세금 혜택</span>, 실제로 얼마나 남을까요?
      </>
    ),
    intro: (
      <p className="text-base text-neutral-500 leading-relaxed">
        은행 예금 이자에 종합과세까지 내면 실수령이 확 줄잖아요. 개인투자용 국채는 만기까지 보유하면 가산금리 1.0~1.25%p가 복리로 쌓이고, 이자소득에 분리과세 15.4%만 내면 끝이에요. 1억원을 10년물에 넣으면 세후 약 4,568만원 이자를 받아요. 수익률 계산부터 절세 효과까지 차례대로 볼게요.
      </p>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '퇴직연금 국채 투자 조건부터 신청까지 한눈에',
    },
  },

  toc: [
    { id: 'sec-yield', label: '개인투자용 국채 수익률은 얼마나 되나요?' },
    { id: 'sec-tax', label: '국채 세금 혜택은 어떻게 적용되나요?' },
    { id: 'sec-compound', label: '국채 복리 가산금리는 실제로 얼마나 차이나나요?' },
    { id: 'sec-exempt', label: '국채 비과세 조건과 한도는 어떻게 되나요?' },
    { id: 'sec-faq', label: '자주 묻는 질문' },
  ],

  sections: [
    // SECTION 01: 수익률
    {
      id: 'sec-yield',
      number: 'SECTION 01',
      heading: '개인투자용 국채 수익률은 얼마나 되나요?',
      subtitle: '만기별 가산금리와 세전 수익률 비교',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            개인투자용 국채는 일반 국고채 표면금리에 <strong>가산금리</strong>를 더해서 이자를 줘요. 2026년 1월 기준 10년물은 표면금리 3.41%에 가산금리 1.0%p, 20년물은 표면금리 3.365%에 가산금리 1.25%p가 붙어요. 이 금리가 매년 복리로 쌓이기 때문에 만기 보유 시 수익률이 상당히 높아요.
          </p>
          <p className="text-neutral-600 mb-6 leading-relaxed">
            5년물도 있지만 가산금리가 0.3%p로 낮아요. 2026년 4월부터는 3년물도 새로 나오는데, 3년물은 분리과세 혜택이 적용되지 않아서 세금 면에서는 10년물이나 20년물이 훨씬 유리해요. <a href="/w/퇴직연금-국채-vs-ETF-비교-안정성-수익률" className="text-[#4A7AB5] underline">채권형 ETF</a>와 비교해도 확정 수익률이라는 점이 큰 장점이에요.
          </p>

          <RateCards
            cards={[
              {
                value: '54%',
                label: '10년물 세전 수익률',
                lines: ['가산금리 1.0%p', '연평균 약 5.4%', '만기 보유 시 확정'],
                highlightColor: 'navy',
              },
              {
                value: '147%',
                label: '20년물 세전 수익률',
                lines: ['가산금리 1.25%p', '연평균 약 7.3%', '만기 보유 시 확정'],
                highlightColor: 'orange',
                highlight: '최고 수익',
              },
            ]}
          />

          <DetailBox
            title="만기별 핵심 차이점"
            items={[
              {
                heading: '5년물 (가산금리 0.3%p)',
                desc: '세전 수익률 약 19%, 연평균 3.8%. 만기가 짧아 부담이 적지만 복리 효과가 작아요.',
              },
              {
                heading: '10년물 (가산금리 1.0%p)',
                desc: '세전 수익률 약 54%, 연평균 5.4%. 수익률과 유동성의 균형이 좋아서 가장 인기 있어요.',
              },
              {
                heading: '20년물 (가산금리 1.25%p)',
                desc: '세전 수익률 약 147%, 연평균 7.3%. 복리 기간이 길어 최종 수익이 압도적이지만 자금이 오래 묶여요.',
              },
            ]}
          />
        </>
      ),
      pasBridge: {
        href: '/w/퇴직연금-DC형-IRP-국채-투자-조건-금융기관',
        question: '이 수익률에 세금은 얼마나 빠지나요?',
        answer: (
          <>
            만기 보유하면 이자소득에 <strong>분리과세 15.4%</strong>만 내면 돼요. 금융소득종합과세 대상이 아니라서 다른 소득과 합산되지 않아요.
          </>
        ),
        buttonText: '세금 혜택 확인하기 →',
      },
    },

    // SECTION 02: 세금 혜택
    {
      id: 'sec-tax',
      number: 'SECTION 02',
      heading: '국채 세금 혜택은 어떻게 적용되나요?',
      subtitle: '분리과세 15.4%와 종합과세의 차이',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            개인투자용 국채의 가장 큰 장점은 <strong>분리과세 15.4%</strong>예요. 일반적으로 금융소득(이자+배당)이 연 2,000만원을 넘으면 다른 소득과 합산해서 최고 45%까지 세금을 내야 해요. 하지만 개인투자용 국채는 이자가 아무리 많아도 15.4%만 떼고 끝이에요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            예를 들어 1억원을 10년물에 넣으면 만기 이자가 약 5,400만원이에요. 종합과세라면 다른 소득과 합쳐서 세율이 35~38%까지 올라갈 수 있어요. 하지만 분리과세로 5,400만원 x 15.4% = 약 832만원만 내면 돼요. 실수령 이자가 약 4,568만원이나 되는 거예요.
          </p>
          <p className="text-neutral-600 mb-6 leading-relaxed">
            금융소득이 많은 분일수록 절세 효과가 커져요. <a href="/w/연금형-개인투자용-국채-신청-방법-10년물-20년물" className="text-[#4A7AB5] underline">연금형 국채</a>를 활용하면 은퇴 후 안정적인 이자수입까지 기대할 수 있어요.
          </p>

          <FormulaBox
            lines={[
              { text: '분리과세 세금 = 이자소득 x 15.4%', numbered: true },
              { text: '예시: 5,400만원 x 15.4% = 약 832만원', numbered: true },
              { text: '실수령 이자 = 5,400만원 - 832만원 = 약 4,568만원', numbered: true },
            ]}
          />

          <SpokeTable
            id="tax-comparison"
            title="종합과세 vs 분리과세 세금 비교"
            subtitle="금융소득 규모별 실질 세율 차이"
            headers={['금융소득 규모', '종합과세 세율', '국채 분리과세', '절세 효과']}
            rows={TAX_COMPARISON_ROWS}
            highlightCol={3}
          />
        </>
      ),
      pasBridge: {
        href: '/w/퇴직연금-DC형-IRP-국채-투자-조건-금융기관',
        question: '복리는 구체적으로 어떻게 쌓이나요?',
        answer: (
          <>
            이자에 이자가 붙는 연복리 방식이에요. 10년물은 매년 약 <strong>5.4%</strong>씩 원금이 불어나서 단리보다 수익이 훨씬 커요.
          </>
        ),
        buttonText: '복리 계산 확인하기 →',
      },
    },

    // SECTION 03: 복리 가산금리
    {
      id: 'sec-compound',
      number: 'SECTION 03',
      heading: '국채 복리 가산금리는 실제로 얼마나 차이나나요?',
      subtitle: '단리 vs 복리, 10년 후 수령액 비교',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            개인투자용 국채는 <strong>연복리</strong>로 이자가 쌓여요. 1년차에 받은 이자가 2년차 원금에 더해지고, 그 늘어난 원금에 다시 이자가 붙는 방식이에요. 단리(원금에만 이자)와 비교하면 만기 수령액 차이가 꽤 커요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            1,000만원을 10년물에 넣는다고 해볼게요. 연이율 약 5.4%로 복리 적용하면 10년 뒤 약 1,690만원을 받아요. 같은 조건에서 단리라면 약 1,540만원이에요. 복리가 약 150만원 더 많죠. 20년물은 이 차이가 훨씬 벌어져요.
          </p>
          <p className="text-neutral-600 mb-6 leading-relaxed">
            2026년부터 이표채로 전환되면서 매년 표면금리 수준의 이자를 중간에 받을 수 있게 됐어요. 다만 가산금리 부분의 복리 효과는 만기에 한꺼번에 정산되니 만기 보유가 핵심이에요.
          </p>

          <FormulaBox
            lines={[
              { text: '복리 만기 수령액 = 원금 x (1 + 연이율)^연수', numbered: true },
              { text: '10년물: 1,000만원 x (1.054)^10 = 약 1,690만원', numbered: true },
              { text: '단리 만기 수령액 = 원금 + (원금 x 연이율 x 연수)', numbered: true },
              { text: '10년물 단리: 1,000만원 + (1,000 x 5.4% x 10) = 약 1,540만원', numbered: true },
            ]}
          />

          <SpokeTimeline
            events={[
              { month: '1년차', title: '원금 1,000만원', desc: '첫 해 이자 약 54만원 발생', status: 'normal' as const },
              { month: '3년차', title: '원금 약 1,170만원', desc: '복리로 원금이 17% 증가', status: 'normal' as const },
              { month: '5년차', title: '원금 약 1,300만원', desc: '단리 대비 약 30만원 차이 시작', status: 'normal' as const },
              { month: '7년차', title: '원금 약 1,449만원', desc: '복리 효과가 눈에 띄게 커짐', status: 'current' as const },
              { month: '10년차', title: '최종 약 1,690만원', desc: '단리 대비 약 150만원 더 수령', status: 'warning' as const, tag: '만기' },
            ]}
          />

          <TipBox title="복리 효과를 극대화하려면 만기 보유가 필수">
            <p className="text-neutral-600 leading-relaxed">
              중도 매도하면 가산금리, 복리, 분리과세 혜택이 <strong>전부 사라져요</strong>. 시장금리가 오르면 채권 가격도 떨어지니 원금 손실까지 날 수 있어요. 10년, 20년 동안 묶여도 괜찮은 여유자금으로만 투자하는 게 중요해요.
            </p>
          </TipBox>
        </>
      ),
      pasBridge: {
        href: '/w/연금형-개인투자용-국채-신청-방법-10년물-20년물',
        question: '분리과세 혜택을 받으려면 어떤 조건이 필요한가요?',
        answer: (
          <>
            2027년 12월 31일까지 매입한 금액 중 <strong>1인당 2억원까지</strong> 분리과세가 적용돼요. 만기까지 보유해야 하는 게 핵심 조건이에요.
          </>
        ),
        buttonText: '비과세 조건 확인하기 →',
      },
    },

    // SECTION 04: 비과세 혜택 조건
    {
      id: 'sec-exempt',
      number: 'SECTION 04',
      heading: '국채 비과세 조건과 한도는 어떻게 되나요?',
      subtitle: '분리과세 적용 기간과 매입한도',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            개인투자용 국채는 완전 비과세는 아니에요. <strong>조세특례제한법</strong>에 따라 분리과세 15.4%로 세금을 줄여주는 방식이에요. 이 혜택을 받으려면 세 가지 조건을 모두 충족해야 해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            첫째, 2027년 12월 31일까지 매입해야 해요. 둘째, 1인당 매입금액 2억원까지만 적용돼요. 셋째, 만기까지 보유해야 해요. 이 세 가지 중 하나라도 빠지면 일반 이자소득으로 종합과세 대상이 될 수 있어요.
          </p>
          <p className="text-neutral-600 mb-6 leading-relaxed">
            2억원을 초과한 매입분은 어떻게 될까요? 초과분의 이자소득은 금융소득종합과세에 포함돼요. 예를 들어 3억원을 매입했다면 2억원까지는 분리과세, 나머지 1억원 이자는 종합과세 대상이에요. <a href="/w/퇴직연금-DC형-IRP-국채-투자-조건-금융기관" className="text-[#4A7AB5] underline">DC형이나 IRP 계좌</a>를 활용하면 퇴직연금 세제혜택까지 추가로 받을 수 있어요.
          </p>

          <DetailBox
            title="분리과세 적용 3가지 필수 조건"
            items={[
              {
                heading: '매입 시기: 2027년 12월 31일까지',
                desc: '조세특례제한법 적용 기한이에요. 이후 매입분은 세법 개정에 따라 달라질 수 있어요.',
              },
              {
                heading: '매입 한도: 1인당 연간 2억원',
                desc: '부부 각각 2억원씩 가능해요. 한도 초과분은 종합과세 대상이에요.',
              },
              {
                heading: '보유 조건: 만기까지 보유',
                desc: '중도 매도 시 가산금리, 복리, 분리과세 혜택이 전부 소멸해요.',
              },
            ]}
          />
        </>
      ),
      bridgeCTA: {
        href: '/w/퇴직연금-국채-vs-ETF-비교-안정성-수익률',
        badge: '상품 비교',
        title: '국채와 ETF, 내 퇴직연금엔 뭐가 유리할까?',
        desc: '안정성과 수익률을 나란히 비교해서 선택하기',
        icon: 'grid',
      },
    },

    // FAQ 섹션 (content: null)
    {
      id: 'sec-faq',
      number: '05',
      heading: '자주 묻는 질문',
      subtitle: '',
      content: null,
    },
  ],

  faq: [
    {
      question: '개인투자용 국채 수익률은 확정인가요?',
      answer:
        '만기까지 보유하면 <strong>확정 수익률</strong>이에요. 표면금리 + 가산금리가 매입 시점에 정해지고, 복리로 적용돼서 만기일에 원금과 이자를 모두 받아요. 중도 매도하면 시장금리에 따라 손실이 날 수 있으니 주의하세요.',
    },
    {
      question: '국채 비과세 혜택이 퇴직연금 계좌에서도 되나요?',
      answer:
        '네, 2026년 하반기부터 DC형이나 IRP 계좌로 10년물과 20년물을 매입할 수 있어요. 만기 보유하면 분리과세 15.4% 혜택이 동일하게 적용돼요.',
    },
  ],

  relatedSpokes: [
    {
      badge: '신청',
      title: '연금형 개인투자용 국채 신청 방법',
      desc: '10년물과 20년물 청약 절차와 배정 방식',
      href: '/w/연금형-개인투자용-국채-신청-방법-10년물-20년물',
    },
    {
      badge: '조건',
      title: '퇴직연금 DC형 IRP 국채 투자 조건',
      desc: 'DC형과 IRP 계좌로 국채 투자하는 조건과 참여 금융기관',
      href: '/w/퇴직연금-DC형-IRP-국채-투자-조건-금융기관',
    },
    {
      badge: '비교',
      title: '퇴직연금 국채 vs ETF 비교',
      desc: '안정성과 수익률, 어느 쪽이 유리한지 비교',
      href: '/w/퇴직연금-국채-vs-ETF-비교-안정성-수익률',
    },
  ],

  sources: [
    {
      name: '2026년 개인투자용 국채 발행 계획',
      url: 'https://www.korea.kr/news/policyNewsView.do?newsId=148957316',
      org: '기획재정부(정책브리핑)',
    },
    {
      name: '개인만 살 수 있는 국채, 개인투자용 국채',
      url: 'https://eiec.kdi.re.kr/material/pageoneView.do?idx=1846',
      org: 'KDI 경제교육센터',
    },
    {
      name: '금융소득종합과세 대상자 과세방식과 절세 전략',
      url: 'https://www.pwc.com/kr/ko/insights/issue-brief/one-point-tax-11.html',
      org: '삼일PwC',
    },
  ],
}

export default data
