import type { SpokeData } from '@/data/spoke/types'
import { SpokeCompareCards, SpokeRateBars, TipBox, FormulaBox, Chips } from '@/components/spoke/SpokeBlocks'
import 국채ETF비교Checker from '@/components/checkers/국채ETF비교Checker'

const data: SpokeData = {
  slug: '퇴직연금-국채-vs-ETF-비교-안정성-수익률',

  meta: {
    title: '퇴직연금 국채 vs ETF 비교 | 안정성 수익률 차이',
    description: '국채 20년물 연평균 수익률이 7.3%인데, 채권형 ETF는 5~6%에 그친다는 사실 아시나요? 퇴직연금 국채 ETF 비교 시 안정성과 수익률, 투자 비교 포인트까지 한번에 정리해드려요.',
    keywords: ['퇴직연금 국채 ETF 비교', '국채 안정성', '국채 수익률 ETF', '퇴직연금 투자 비교'],
    ogTitle: '퇴직연금 국채 vs ETF 비교 | 머니위키',
    ogDescription: '안정성과 수익률, 세금 기준으로 직접 비교해 보세요.',
  },

  hub: {
    url: '/w/퇴직연금-국채-투자-DC형-IRP-연금형',
    name: '퇴직연금 국채 투자 | DC형 IRP 계좌 연금형 국채',
  },

  breadcrumb: ['퇴직연금', '국채 투자', '퇴직연금 국채 vs ETF 비교'],

  summary3: [
    <>국채 20년물 연평균 수익률 <strong>7.3%</strong>, 채권형 ETF는 <strong>5~6%</strong> 수준</>,
    <>국채는 <strong>정부 원금보장</strong>, ETF는 시장 가격 변동에 따라 원금 손실 가능</>,
    <>국채 분리과세 <strong>15.4%</strong>, ETF 매매차익 250만 원까지 비과세</>,
  ],

  sourceBar: {
    badge: '정책 출처',
    name: '기획재정부 2026년 개인투자용국채 발행계획 및 투자 활성화 방안',
    date: '2026.01',
  },

  prevNext: {
    prev: { title: '개인투자용 국채 수익률 세금 혜택', href: '/w/개인투자용-국채-수익률-세금-혜택-복리-비과세' },
    next: { title: '연금형 개인투자용 국채 신청 방법', href: '/w/연금형-개인투자용-국채-신청-방법-10년물-20년물' },
  },

  stickyBar: {
    topLabel: '핵심 비교',
    value: '국채 7.3% vs ETF 5~6%',
    buttonText: '비교표 확인 →',
    scrollTo: '#sec-compare',
  },

  hero: {
    badge: '2026년 최신 비교',
    h1: (
      <>
        퇴직연금 국채 vs ETF, <span className="text-[#1E3A5F]">안정성과 수익률</span> 어디에 무게를 둘까요?
      </>
    ),
    intro: (
      <p className="text-base text-neutral-500 leading-relaxed">
        퇴직연금에서 국채를 살까, 채권형 ETF를 살까 고민되시죠? 2026년 9월부터 DC형과 IRP 계좌로 국채 직접 투자가 열렸어요. 국채 20년물은 복리 가산금리 1.25%p 덕분에 연평균 7.3% 수익률을 내고, 채권형 ETF는 시장 금리를 따라가며 5~6% 수준이에요. 안정성과 수익률, 세금까지 세 가지 기준으로 비교해 볼게요.
      </p>
    ),
    hubCTA: { badge: '전체 가이드', desc: '퇴직연금 국채 투자 조건부터 신청까지 한눈에' },
  },

  toc: [
    { id: 'sec-compare', label: '퇴직연금 국채와 ETF 비교하면 어떤 차이가 있나요?' },
    { id: 'sec-stability', label: '국채 안정성은 ETF보다 얼마나 높은가요?' },
    { id: 'sec-return', label: '국채 수익률과 ETF 수익률은 어떻게 다른가요?' },
    { id: 'sec-when', label: '퇴직연금 투자 비교 시 국채가 유리한 경우는 언제인가요?' },
    { id: 'sec-faq', label: '자주 묻는 질문' },
  ],

  sections: [
    // CHECKER: 국채 vs ETF 비교
    {
      id: 'checker',
      number: 'CHECK',
      heading: '국채와 ETF 중 내게 맞는 걸 확인해 보세요',
      subtitle: '투자 성향 3가지만 선택하면 알려드려요',
      content: <국채ETF비교Checker />,
    },
    // SECTION 01: 핵심 비교 개요
    {
      id: 'sec-compare',
      number: 'SECTION 01',
      heading: '퇴직연금 국채와 ETF 비교하면 어떤 차이가 있나요?',
      subtitle: '원금보장 여부와 수익 구조가 핵심',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            가장 큰 차이는 <strong>원금 보장</strong>이에요. 개인투자용 국채는 정부가 원금과 이자를 전액 보장해요. 은행 예금처럼 5,000만 원 한도도 없이 투자한 만큼 전부 돌려받아요. 반면 채권형 ETF는 국고채에 투자하지만, 시장 가격이 움직이면서 원금 손실이 생길 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            수익이 쌓이는 방식도 달라요. 국채는 만기까지 보유하면 <a href="/w/개인투자용-국채-수익률-세금-혜택-복리-비과세" className="text-[#4A7AB5] underline">복리 가산금리</a>가 연복리로 눈덩이처럼 불어나요. 20년물 기준 세전 147% 수익, 연평균 7.3%예요. ETF는 시장 금리를 따라가는데, 운용보수(0.03~0.15%)가 매일 빠지니까 순수익은 5~6% 사이에 머물러요.
          </p>
          <p className="text-neutral-600 mb-6 leading-relaxed">
            2026년 9월부터 <a href="/w/퇴직연금-DC형-IRP-국채-투자-조건-금융기관" className="text-[#4A7AB5] underline">DC형과 IRP 계좌</a>로 국채 직접 매입이 가능해졌어요. 안전자산 30% 의무 비중을 국채로 채울지, ETF로 채울지, 아니면 섞을지 선택할 수 있어요. 유동성을 포기할 수 있다면 국채, 중간에 팔 일이 있다면 ETF가 유리해요.
          </p>

          <Chips
            items={[
              { icon: 'check', label: '원금보장', value: '국채 전액' },
              { icon: 'percent', label: '국채 수익률', value: '연 7.3%' },
              { icon: 'clock', label: '유동성', value: 'ETF 우위' },
              { icon: 'grid', label: '안전자산', value: '둘 다 인정' },
            ]}
          />

          <TipBox title="안전자산 30% 비중, 어떻게 채울까요?">
            <p className="text-neutral-600 leading-relaxed">
              퇴직연금 DC형은 위험자산에 <strong>70%</strong>까지만 투자할 수 있어요. 나머지 30%는 안전자산으로 채워야 하는데, 국채와 채권형 ETF 모두 안전자산으로 인정돼요. 국채 15%에 ETF 15%를 섞으면 안정성과 유동성을 동시에 확보할 수 있어요.
            </p>
          </TipBox>
        </>
      ),
      pasBridge: {
        href: '/w/퇴직연금-DC형-IRP-국채-투자-조건-금융기관',
        question: '국채의 안정성은 구체적으로 어느 정도인가요?',
        answer: (
          <>
            국채는 정부 발행 채권이라 <strong>신용등급 AAA</strong>예요. 원금을 못 돌려받을 가능성이 사실상 0%에 가까워요.
          </>
        ),
        buttonText: '안정성 비교 자세히 →',
      },
    },

    // SECTION 02: 안정성 비교
    {
      id: 'sec-stability',
      number: 'SECTION 02',
      heading: '국채 안정성은 ETF보다 얼마나 높은가요?',
      subtitle: '원금손실 가능성을 수치로 비교',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            국채와 ETF의 안정성 차이는 <strong>원금 보장 여부</strong>에서 갈려요. 개인투자용 국채는 만기까지 들고 있으면 약속된 원금과 이자를 정부가 100% 돌려줘요. 예금자보호 한도인 5,000만 원도 적용 안 돼요. 금액에 상관없이 전액 보장이에요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            채권형 ETF도 국고채에 투자하니까 신용 리스크 자체는 낮아요. 하지만 <strong>금리 변동 리스크</strong>가 있어요. 금리가 1%p 오르면 10년물 채권 가격은 약 7~9% 떨어져요. 장기채일수록 변동 폭이 더 커요. 2025년처럼 금리가 급하게 움직이는 시기에는 하루 만에 1~2% 손실이 나기도 했어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            다만 국채도 중도 매도하면 ETF처럼 시장 가격에 팔아야 해요. 만기까지 보유해야 원금보장 혜택을 온전히 받을 수 있어요. ETF는 시장에서 아무 때나 팔 수 있는 대신, 항상 가격 변동을 감수해야 하고요.
          </p>
          <p className="text-neutral-600 mb-6 leading-relaxed">
            결론적으로 만기 보유가 확실하면 국채가 압도적으로 안전하고, 중간에 현금화가 필요할 수 있으면 ETF의 유동성이 장점이에요.
          </p>

          <SpokeRateBars
            bars={[
              { label: '국채 만기 보유 (원금보장)', rate: '100%', width: '100%' },
              { label: '국채 중도 매도 (시장가)', rate: '85~95%', width: '90%' },
              { label: '채권형 ETF 장기 보유', rate: '70~90%', width: '80%' },
              { label: '주식형 ETF (참고)', rate: '30~70%', width: '50%' },
            ]}
          />

          <FormulaBox
            lines={[
              { text: '금리 1%p 상승 시 채권 가격 하락폭' },
              { text: '10년물 국고채 ETF: 약 -7~9%', numbered: true },
              { text: '20년물 국고채 ETF: 약 -14~18%', numbered: true },
              { text: '국채 만기 보유: 변동 없음 (0%) — 원금보장', numbered: true, comment: true },
            ]}
          />
        </>
      ),
      pasBridge: {
        href: '/w/개인투자용-국채-수익률-세금-혜택-복리-비과세',
        question: '안전한 건 알겠는데, 수익률은 어떤 차이가 나나요?',
        answer: (
          <>
            국채 20년물은 연평균 <strong>7.3%</strong>, 채권형 ETF는 <strong>5~6%</strong>예요. 복리 가산금리가 핵심 차이예요.
          </>
        ),
        buttonText: '수익률 비교 보기 →',
      },
    },

    // SECTION 03: 수익률 비교
    {
      id: 'sec-return',
      number: 'SECTION 03',
      heading: '국채 수익률과 ETF 수익률은 어떻게 다른가요?',
      subtitle: '복리 가산금리와 시장수익률의 차이',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            국채의 수익률 비밀은 <strong>복리 가산금리</strong>예요. 표면금리에 10년물은 1.0%p, 20년물은 1.25%p를 더해줘요. 2026년 1월 발행 기준으로 20년물 표면금리가 3.365%니까, 가산금리 합산 시 4.615%가 복리로 쌓여요. 만기 보유하면 세전 수익률이 무려 147%, 연평균 7.3%예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            채권형 ETF는 시장 금리를 그대로 따라가요. KODEX 국고채10년, ACE 국고채10년 같은 대표 상품의 최근 5년 평균 수익률은 5~6%예요. 여기에 운용보수(연 0.03~0.15%)가 매일 자동으로 빠지니까 실제 순수익은 조금 더 낮아져요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            세금 구조도 차이가 커요. 국채 이자소득은 <strong>분리과세 15.4%</strong>가 적용돼요. 종합소득세에 합산되지 않으니까 고소득자에게 유리해요. ETF 매매차익은 250만 원까지 비과세이고 초과분에 22% 과세돼요.
          </p>
          <p className="text-neutral-600 mb-6 leading-relaxed">
            퇴직연금 계좌 안에서 투자하면 운용 기간 동안 과세 이연 혜택도 받아요. 55세 이후 연금으로 수령하면 연금소득세 3.3~5.5%만 내면 돼요. 국채든 ETF든 퇴직연금 계좌 활용이 절세에 핵심이에요.
          </p>

          <SpokeCompareCards
            cards={[
              {
                title: '국채 20년물',
                subtitle: '복리 가산금리 1.25%p',
                items: [
                  '만기 보유 시 세전 147% 수익',
                  '연평균 수익률 7.3%',
                  '이자소득 분리과세 15.4%',
                  '만기까지 환금 제약',
                ],
                recommended: true,
                recLabel: '장기 수익',
              },
              {
                title: '채권형 ETF',
                subtitle: '시장금리 추종',
                items: [
                  '최근 5년 연평균 5~6%',
                  '운용보수 0.03~0.15% 차감',
                  '매매차익 250만 원까지 비과세',
                  '언제든 환금 가능',
                ],
              },
            ]}
          />

          <TipBox title="고소득자라면 세금 차이가 더 벌어져요">
            <p className="text-neutral-600 leading-relaxed">
              종합소득세율이 38%인 분이라면 국채 분리과세 15.4%로 <strong>22.6%p 절세</strong>돼요. ETF 매매차익에 붙는 22% 과세보다도 낮아요. 연간 이자소득이 2,000만 원을 넘는 금융소득종합과세 대상자에게 국채가 특히 유리해요.
            </p>
          </TipBox>
        </>
      ),
      pasBridge: {
        href: '/w/연금형-개인투자용-국채-신청-방법-10년물-20년물',
        question: '그럼 결국 어떤 상황에서 국채를 골라야 할까요?',
        answer: (
          <>
            <strong>10년 이상 장기 투자 여력</strong>이 있고, 원금 손실을 절대 원하지 않는 분이라면 국채가 확실히 유리해요.
          </>
        ),
        buttonText: '선택 기준 확인 →',
      },
    },

    // SECTION 04: 선택 기준
    {
      id: 'sec-when',
      number: 'SECTION 04',
      heading: '퇴직연금 투자 비교 시 국채가 유리한 경우는 언제인가요?',
      subtitle: '투자 성향별 선택 기준',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            국채가 딱 맞는 경우는 세 가지예요. 첫째, 퇴직까지 <strong>10년 이상 남은 직장인</strong>이에요. 20년물을 만기까지 들고 가면 복리 효과가 극대화돼요. 연평균 7.3%면 일반 은행 예금(3%대)의 두 배가 넘는 수준이에요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            둘째, <strong>원금 손실을 참을 수 없는 분</strong>이에요. 주식이나 ETF로 -10% 손실을 보면 밤잠을 설치는 성향이라면 국채가 마음 편해요. 정부가 원금을 보장하니까 시장이 아무리 흔들려도 만기에 약속된 금액을 정확히 받아요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            셋째, <strong>고소득자</strong>예요. 종합소득세율이 38% 이상이면 분리과세 15.4%의 절세 효과가 커져요. 금융소득종합과세 걱정 없이 안정적으로 이자를 받을 수 있어요.
          </p>
          <p className="text-neutral-600 mb-6 leading-relaxed">
            반대로 ETF가 나은 경우도 있어요. 금리 하락기에는 채권 가격이 올라서 ETF 수익률이 국채를 앞설 수 있어요. 급하게 현금이 필요한 상황이 올 수 있다면 ETF의 유동성이 큰 장점이에요. 두 상품을 반반 섞어서 안전자산 30%를 구성하는 것도 좋은 방법이에요.
          </p>

          <SpokeRateBars
            bars={[
              { label: '장기 투자 (만기 보유)', rate: '국채 유리', width: '95%' },
              { label: '절세 효과 (고소득자)', rate: '국채 유리', width: '85%' },
              { label: '유동성 (중도 매도)', rate: 'ETF 유리', width: '35%' },
              { label: '금리 하락기 수익', rate: 'ETF 유리', width: '40%' },
            ]}
          />

          <Chips
            items={[
              { icon: 'check', label: '국채 적합', value: '만기 보유 가능' },
              { icon: 'won', label: '국채 적합', value: '고소득 절세' },
              { icon: 'clock', label: 'ETF 적합', value: '유동성 중시' },
              { icon: 'calc', label: 'ETF 적합', value: '금리 하락 기대' },
            ]}
          />
        </>
      ),
      bridgeCTA: {
        href: '/w/연금형-개인투자용-국채-신청-방법-10년물-20년물',
        badge: '신청 방법',
        title: '국채 투자를 결정했다면 어떻게 신청하나요?',
        desc: '전용계좌 개설부터 청약 절차까지 확인',
        icon: 'check',
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
      question: '퇴직연금 국채와 ETF를 동시에 투자할 수 있나요?',
      answer:
        '네, 가능해요. DC형이나 IRP 계좌에서 국채와 채권형 ETF를 <strong>동시에 보유</strong>할 수 있어요. 안전자산 30% 비중을 국채 15%, ETF 15%로 나눠서 안정성과 유동성을 함께 잡는 전략도 괜찮아요.',
    },
    {
      question: '퇴직연금 국채 ETF 비교 시 운용보수 차이는 얼마나 되나요?',
      answer:
        '국채는 운용보수가 <strong>0원</strong>이에요. 정부에서 직접 발행하는 상품이라 별도 수수료가 없어요. 채권형 ETF는 연 0.03~0.15%의 운용보수가 매일 자동으로 빠져요. 20년 장기 투자 시 이 차이가 상당히 커질 수 있어요.',
    },
  ],

  relatedSpokes: [
    {
      badge: '수익률',
      title: '개인투자용 국채 수익률 세금 혜택',
      desc: '복리 가산금리 1.25%p와 분리과세 15.4% 상세 분석',
      href: '/w/개인투자용-국채-수익률-세금-혜택-복리-비과세',
    },
    {
      badge: '신청',
      title: '연금형 개인투자용 국채 신청 방법',
      desc: '10년물과 20년물 청약 절차와 배정 방식',
      href: '/w/연금형-개인투자용-국채-신청-방법-10년물-20년물',
    },
    {
      badge: '조건',
      title: '퇴직연금 DC형 IRP 국채 투자 조건',
      desc: 'DC형과 IRP 계좌로 국채 투자하는 조건과 금융기관',
      href: '/w/퇴직연금-DC형-IRP-국채-투자-조건-금융기관',
    },
  ],

  sources: [
    {
      name: '2026년 개인투자용국채 연간 발행계획 및 투자 활성화 방안',
      url: 'https://www.etoday.co.kr/news/view/2540759',
      org: '기획재정부',
    },
    {
      name: '내년 개인투자용 국채 2조원 발행, 3년물 도입',
      url: 'https://www.korea.kr/news/policyNewsView.do?newsId=148957316',
      org: '정부 정책브리핑',
    },
    {
      name: '퇴직연금 계좌로 개인투자용 국채 투자 가능',
      url: 'https://www.korea.kr/news/policyNewsView.do?newsId=148959500',
      org: '정부 정책브리핑',
    },
  ],
}

export default data
