import type { SpokeData } from '@/data/spoke/types'
import { FormulaBox, RateCards, SpokeTable, TipBox, SpokeStepCards } from '@/components/spoke/SpokeBlocks'

// --- Table Data ---
const YIELD_TABLE_ROWS = [
  ['10년물', '1.0%p', '약 54%', '연 5.4%', '15.4% 분리과세'],
  ['20년물', '1.25%p', '약 147%', '연 7.3%', '15.4% 분리과세'],
]

// --- Spoke Data ---
const data: SpokeData = {
  slug: '개인투자용-국채-수익률-세금-혜택-복리-비과세',

  meta: {
    title: '개인투자용 국채 수익률 세금 혜택 | 복리 비과세',
    description: '개인투자용 국채 수익률이 은행 예금보다 높다는 거 아시나요? 가산금리 1.0~1.25%p가 복리로 붙고, 10년물은 세전 54%, 20년물은 147% 수익률에 분리과세 15.4% 혜택까지 정리해드려요.',
    keywords: [
      '개인투자용 국채 수익률',
      '국채 세금 혜택',
      '국채 복리 가산금리',
      '국채 비과세',
    ],
    ogTitle: '개인투자용 국채 수익률 세금 혜택 | 머니위키',
    ogDescription: '복리 + 분리과세 혜택까지 한눈에 확인해 보세요.',
  },

  hub: {
    url: '/w/퇴직연금-국채-투자-DC형-IRP-연금형',
    name: '퇴직연금 국채 투자 | DC형 IRP 계좌 연금형 국채',
  },

  breadcrumb: ['퇴직연금', '국채 투자', '개인투자용 국채 수익률 세금 혜택'],

  summary3: [
    <>
      10년물 가산금리 <strong>1.0%p</strong>, 20년물 <strong>1.25%p</strong> 복리 적용
    </>,
    <>
      만기 보유 시 이자소득 <strong>분리과세 15.4%</strong> (종합과세 회피)
    </>,
    <>
      1인 매입한도 <strong>연간 2억원</strong>, 중도매도 시 혜택 소멸
    </>,
  ],

  sourceBar: {
    badge: '금융상품 출처',
    name: '미래에셋증권 개인투자용 국채 안내 + KDI 경제교육센터',
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
    topLabel: '세금 혜택',
    value: '분리과세 15.4%',
    buttonText: '수익률 계산 보기 →',
    scrollTo: '#sec-yield',
  },

  hero: {
    badge: '2026년 최신',
    h1: (
      <>
        개인투자용 국채 수익률, <span className="text-[#1E3A5F]">복리 가산금리</span>와 세금 혜택은 얼마나 될까요?
      </>
    ),
    intro: (
      <p className="text-base text-neutral-500 leading-relaxed">
        개인투자용 국채 1,000만원을 10년물로 넣으면 약 540만원 이자가 붙어요. 가산금리 0.35%p가 복리로 쌓이고, 이자소득은 15.4% 분리과세로 종합과세를 피할 수 있거든요. 20년물은 가산금리가 0.5%p로 더 높지만 환금성 제약이 있어요. 수익률 계산부터 세금 혜택까지 차례대로 정리할게요.
      </p>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '퇴직연금 국채 투자 조건부터 신청 방법까지 한눈에',
    },
  },

  toc: [
    {
      id: 'sec-yield',
      label: '개인투자용 국채 수익률은 얼마나 되나요?',
    },
    { id: 'sec-tax', label: '국채 투자 세금 혜택은 어떤 것이 있나요?' },
    { id: 'sec-compound', label: '국채 복리 가산금리는 어떻게 적용되나요?' },
    { id: 'sec-exempt', label: '국채 비과세 혜택의 조건은 무엇인가요?' },
    { id: 'sec-faq', label: '자주 묻는 질문' },
  ],

  sections: [
    // SECTION 01: 수익률
    {
      id: 'sec-yield',
      number: 'SECTION 01',
      heading: '개인투자용 국채 수익률은 얼마나 되나요?',
      subtitle: '10년물 vs 20년물 세전 수익률',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            개인투자용 국채는 표면금리에 가산금리를 더해서 이자를 줘요. 10년물은 가산금리 1.0%p, 20년물은 1.25%p가 붙어요. 만기까지 보유하면 세전 기준 10년물은 약 54% (연평균 5.4%), 20년물은 약 147% (연평균 7.3%) 수익률이에요.
          </p>
          <p className="text-neutral-600 mb-6 leading-relaxed">
            숫자만 보면 20년물이 압도적으로 좋아 보여요. 하지만 20년 동안 묶여 있는 돈이라 유동성이 떨어지고, 중도 매도 시 시장금리 변동에 따라 원금 손실이 날 수 있어요.
          </p>

          <RateCards
            cards={[
              {
                value: '54%',
                label: '10년물 수익률',
                lines: ['가산금리 1.0%p', '연평균 약 5.4%', '만기 보유 시'],
                highlightColor: 'navy',
              },
              {
                value: '147%',
                label: '20년물 수익률',
                lines: ['가산금리 1.25%p', '연평균 약 7.3%', '만기 보유 시'],
                highlightColor: 'orange',
                highlight: '추천',
              },
            ]}
          />

          <SpokeTable
            id="yield-comparison"
            title="만기별 수익률 비교"
            subtitle="세전 기준, 복리 적용"
            headers={['만기', '가산금리', '만기 보유 수익률', '연평균 수익률', '세금']}
            rows={YIELD_TABLE_ROWS}
          />

          <TipBox title="중도 매도 시 가산금리 혜택 사라짐">
            <p className="text-neutral-600 leading-relaxed">
              만기 전에 팔면 가산금리, 복리, 분리과세 혜택이 <strong>모두 사라져요</strong>. 시장금리가 오르면 채권 가격이 떨어져서 원금 손실도 날 수 있어요. 만기까지 보유할 여유자금인지 먼저 확인하세요.
            </p>
          </TipBox>
        </>
      ),
      pasBridge: {
        href: '#sec-tax',
        question: '세금은 얼마나 내나요?',
        answer: (
          <>
            만기 보유하면 이자소득에 <strong>분리과세 15.4%</strong>만 내요. 종합과세 대상이 아니라서 다른 소득과 합산되지 않아요.
          </>
        ),
        buttonText: '세금 혜택 보기 →',
      },
    },

    // SECTION 02: 세금 혜택
    {
      id: 'sec-tax',
      number: 'SECTION 02',
      heading: '국채 투자 세금 혜택은 어떤 것이 있나요?',
      subtitle: '분리과세 15.4%로 종합과세 회피',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            가장 큰 혜택은 <strong>분리과세 15.4%</strong>예요. 이자소득이 연 2,000만원을 넘으면 보통 종합과세 대상이 되는데, 개인투자용 국채는 만기까지 보유하면 분리과세로 끝나요. 다른 소득과 합산되지 않아서 세율이 높아지지 않아요.
          </p>
          <p className="text-neutral-600 mb-6 leading-relaxed">
            예를 들어 1억원을 10년물에 넣으면 만기 이자가 약 5,400만원이에요. 분리과세로 약 832만원만 세금으로 내고 나머지는 받아요. 만약 종합과세 대상이면 세율이 38~45%까지 올라갈 수 있어요.
          </p>

          <FormulaBox
            lines={[
              { text: '분리과세 = 이자소득 × 15.4%', numbered: true },
              {
                text: '예시: 5,400만원 × 15.4% = 약 832만원',
                numbered: true,
                comment: true,
              },
              { text: '실수령액 = 5,400만원 - 832만원 = 약 4,568만원', numbered: true },
            ]}
          />

          <TipBox title="종합과세 vs 분리과세 차이">
            <p className="text-neutral-600 leading-relaxed">
              금융소득(이자+배당)이 연 2,000만원을 넘으면 종합과세 대상이에요. 이때 다른 소득(근로소득, 사업소득)과 합산되어 최고 45%까지 세율이 올라가요. 하지만 <a href="https://eiec.kdi.re.kr/material/pageoneView.do?idx=1846" target="_blank" rel="noopener noreferrer" className="text-[#4A7AB5] underline">개인투자용 국채</a>는 만기 보유 시 분리과세로 끝나서 세금 부담이 훨씬 적어요.
            </p>
          </TipBox>
        </>
      ),
      pasBridge: {
        href: '#sec-compound',
        question: '복리는 어떻게 적용되나요?',
        answer: (
          <>
            이자에 이자가 붙는 복리 방식이에요. 10년물은 10년간, 20년물은 20년간 <strong>연복리</strong>로 계속 쌓여요.
          </>
        ),
        buttonText: '복리 계산 보기 →',
      },
    },

    // SECTION 03: 복리 가산금리
    {
      id: 'sec-compound',
      number: 'SECTION 03',
      heading: '국채 복리 가산금리는 어떻게 적용되나요?',
      subtitle: '이자에 이자가 붙는 연복리',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            개인투자용 국채는 <strong>연복리</strong>로 이자가 쌓여요. 1년차 이자가 2년차 원금에 더해지고, 2년차 이자가 3년차 원금에 더해지는 방식이에요. 단리(이자가 따로)보다 만기 수령액이 훨씬 커요.
          </p>
          <p className="text-neutral-600 mb-6 leading-relaxed">
            예를 들어 1,000만원을 <a href="/w/연금형-개인투자용-국채-신청-방법-10년물-20년물" className="text-[#4A7AB5] underline">10년물</a>에 넣으면 표면금리 + 가산금리 1.0%p가 연복리로 적용돼요. 10년 뒤 원금 1,000만원 + 이자 약 540만원 = 총 1,540만원을 받아요. 단리라면 이자가 약 350만원 정도밖에 안 돼요.
          </p>

          <FormulaBox
            lines={[
              {
                text: '복리 만기 수령액 = 원금 × (1 + 연이율)^연수',
                numbered: true,
              },
              {
                text: '예시: 1,000만원 × (1.054)^10 = 약 1,540만원',
                numbered: true,
                comment: true,
              },
              {
                text: '단리 만기 수령액 = 원금 + (원금 × 연이율 × 연수)',
                numbered: true,
              },
            ]}
          />

          <SpokeStepCards
            steps={[
              {
                title: '1차년도: 원금 1,000만원',
                desc: '표면금리 3% + 가산금리 1.0% = 4%',
                tip: '이자: 40만원',
              },
              {
                title: '2차년도: 원금 1,040만원',
                desc: '전년도 이자가 원금에 더해짐',
                tip: '이자: 41.6만원',
              },
              {
                title: '10차년도: 원금 약 1,423만원',
                desc: '복리로 원금이 계속 늘어남',
                tip: '최종 수령: 약 1,540만원',
              },
            ]}
          />

          <TipBox title="복리 효과는 장기일수록 커져요">
            <p className="text-neutral-600 leading-relaxed">
              20년물은 복리 기간이 길어서 최종 수령액이 10년물보다 훨씬 많아요. 하지만 20년 동안 묶여 있다는 게 부담이에요. 중도 매도하면 복리 혜택이 <strong>전부 사라지니</strong> 만기 보유가 원칙이라고 생각하세요.
            </p>
          </TipBox>
        </>
      ),
      pasBridge: {
        href: '#sec-exempt',
        question: '비과세 혜택도 있나요?',
        answer: (
          <>
            2027년 12월 31일까지 매입한 국채는 <strong>1인당 2억원까지</strong> 분리과세 혜택이 있어요. 비과세는 아니지만 종합과세 회피 효과가 있어요.
          </>
        ),
        buttonText: '비과세 조건 확인 →',
      },
    },

    // SECTION 04: 비과세 혜택
    {
      id: 'sec-exempt',
      number: 'SECTION 04',
      heading: '국채 비과세 혜택의 조건은 무엇인가요?',
      subtitle: '분리과세 한도와 적용 기간',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            개인투자용 국채는 완전 비과세는 아니에요. 대신 <strong>조세특례제한법</strong>에 따라 2027년 12월 31일까지 매입한 금액에 한해 1인당 <strong>매입금액 2억원까지</strong> 분리과세 (15.4%) 혜택이 적용돼요.
          </p>
          <p className="text-neutral-600 mb-6 leading-relaxed">
            예를 들어 2억원을 10년물로 매입하면 만기 이자가 약 1억 800만원인데, 이 중 2억원에 해당하는 이자에만 분리과세가 적용돼요. 2억원을 초과한 부분은 일반 이자소득으로 종합과세 대상이 될 수 있어요.
          </p>

          <TipBox title="2027년 이후 매입분은 세법 개정 확인 필요">
            <p className="text-neutral-600 leading-relaxed">
              조세특례는 2027년 12월 31일까지 매입분에만 적용돼요. 이후에는 세법 개정에 따라 혜택이 <strong>달라질 수 있으니</strong> <a href="https://www.pwc.com/kr/ko/insights/issue-brief/one-point-tax-11.html" target="_blank" rel="noopener noreferrer" className="text-[#4A7AB5] underline">금융소득종합과세</a> 관련 최신 정보를 확인하세요.
            </p>
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '/w/퇴직연금-국채-vs-ETF-비교-안정성-수익률',
        badge: '상품 비교',
        title: '국채 vs ETF, 어느 쪽이 나한테 유리할까?',
        desc: '안정성과 수익률 비교해서 선택하기',
        icon: 'grid',
        primary: true,
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
      question: '개인투자용 국채 수익률이 확정인가요?',
      answer:
        '만기까지 보유하면 <strong>확정 수익률</strong>이에요. 표면금리 + 가산금리가 복리로 적용되고, 만기일에 원금과 이자를 모두 받아요. 중도 매도하면 시장금리 변동에 따라 손실이 날 수 있어요.',
    },
    {
      question: '국채 투자 세금 혜택은 퇴직연금 계좌에도 적용되나요?',
      answer:
        '네, 2026년 9월부터 <a href="/w/퇴직연금-DC형-IRP-국채-투자-조건-금융기관" className="text-[#4A7AB5] underline">DC형·IRP 계좌</a>로 국채를 매입해도 만기 보유 시 분리과세 15.4% 혜택이 적용돼요. 단, 중도 매도 시에는 혜택이 사라져요.',
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
      desc: 'DC형·IRP 계좌로 국채 투자 조건과 참여 금융기관',
      href: '/w/퇴직연금-DC형-IRP-국채-투자-조건-금융기관',
    },
    {
      badge: '비교',
      title: '퇴직연금 국채 vs ETF 비교',
      desc: '안정성과 수익률, 어느 쪽이 나한테 유리한지 비교',
      href: '/w/퇴직연금-국채-vs-ETF-비교-안정성-수익률',
    },
  ],

  sources: [
    {
      name: '개인투자용국채 안내',
      url: 'https://securities.miraeasset.com/hks/hks4046/n01.do',
      org: '미래에셋증권',
    },
    {
      name: '개인만 살 수 있는 국채, 개인투자용 국채',
      url: 'https://eiec.kdi.re.kr/material/pageoneView.do?idx=1846',
      org: 'KDI 경제교육센터',
    },
    {
      name: '금융소득종합과세 대상자가 알아야 할 금융상품별 과세방식과 절세 전략',
      url: 'https://www.pwc.com/kr/ko/insights/issue-brief/one-point-tax-11.html',
      org: '삼일PwC',
    },
  ],
}

export default data
