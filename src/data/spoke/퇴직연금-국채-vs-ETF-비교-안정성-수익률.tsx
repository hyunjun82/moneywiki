import type { SpokeData } from '@/data/spoke/types'
import { SpokeCompareCards, SpokeRateBars, TipBox, WarnBox } from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '퇴직연금-국채-vs-ETF-비교-안정성-수익률',

  meta: {
    title: '퇴직연금 국채 vs ETF 비교 | 안정성 수익률 차이',
    description: '퇴직연금으로 국채와 ETF 중 뭘 골라야 할지 고민이시죠? 수익률만 보면 ETF가 높아 보이지만, 안정성과 세금 혜택까지 따져보면 결과가 완전히 달라져요. 비교 기준을 알려드려요.',
    keywords: ['퇴직연금 국채 ETF 비교', '국채 안정성', '국채 수익률 ETF', '퇴직연금 투자 비교'],
    ogTitle: '퇴직연금 국채 vs ETF 비교 | 머니위키',
    ogDescription: '안정성·수익률·세금 세 가지 기준으로 비교해 보세요.',
  },

  hub: {
    url: '/w/퇴직연금-국채-투자-DC형-IRP-연금형',
    name: '퇴직연금 국채 투자 | DC형 IRP 계좌 연금형 국채',
  },

  breadcrumb: ['퇴직연금', '국채 투자', '퇴직연금 국채 vs ETF 비교'],

  summary3: [
    <>국채는 <strong>원금 보장</strong>, ETF는 시장수익률 추종하지만 <strong>원금 손실 가능</strong></>,
    <>국채 20년물 연평균 <strong>7.3%</strong> vs ETF 국고채10년 <strong>5~6%</strong> 변동</>,
    <>국채는 복리 가산금리 1.25%p, ETF는 운용보수 차감 필요</>,
  ],

  sourceBar: {
    badge: '정책 출처',
    name: '기획재정부 개인투자용 국채 발행계획',
    date: '2026.02',
  },

  prevNext: {
    prev: { title: '개인투자용 국채 수익률 세금 혜택', href: '/w/개인투자용-국채-수익률-세금-혜택-복리-비과세' },
    next: { title: '연금형 개인투자용 국채 신청 방법', href: '/w/연금형-개인투자용-국채-신청-방법-10년물-20년물' },
  },

  stickyBar: {
    topLabel: '안정성 비교',
    value: '국채 원금보장 vs ETF 시장변동',
    buttonText: '비교표 보기 →',
    scrollTo: '#sec-compare',
  },

  hero: {
    badge: '2026년 최신 비교',
    h1: (
      <>
        퇴직연금 국채 vs ETF, <span className="text-[#1E3A5F]">안정성과 수익률</span> 둘 다 잡을 순 없을까요?
      </>
    ),
    intro: (
      <p className="text-base text-neutral-500 leading-relaxed">
        많은 분들이 "국채는 안전하지만 수익률이 낮고, ETF는 수익률이 높지만 위험하다"고 알고 계시죠? 꼭 그렇진 않아요. 2026년 9월부터 개인투자용 국채는 복리 가산금리 1.25%p가 붙어서 20년물 기준 연평균 7.3% 수익률이에요. 채권형 ETF와 비교하면 어떨까요? 안정성·수익률·세금 세 가지 기준으로 비교해 볼게요.
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
    // SECTION 01: 국채 vs ETF 비교
    {
      id: 'sec-compare',
      number: 'SECTION 01',
      heading: '퇴직연금 국채와 ETF 비교하면 어떤 차이가 있나요?',
      subtitle: '원금보장 여부와 수익률 구조',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            가장 큰 차이는 <strong>원금 보장</strong>이에요. 개인투자용 국채는 정부가 원금과 이자를 100% 보장하지만, ETF는 시장 가격 변동에 따라 원금 손실이 날 수 있어요. 채권형 ETF라도 금리가 오르면 채권 가격이 떨어져서 손해 볼 수 있거든요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            수익률 구조도 달라요. 국채는 만기까지 보유하면 <a href="/w/개인투자용-국채-수익률-세금-혜택-복리-비과세" className="text-[#4A7AB5] underline">복리 가산금리</a>가 연복리로 쌓여요. 20년물 기준 147% 수익(연평균 7.3%)이에요. ETF는 채권 시장 금리를 따라가는데, 운용보수를 빼야 해서 순수익은 보통 5~6% 사이예요.
          </p>
          <p className="text-neutral-600 mb-6 leading-relaxed">
            퇴직연금 계좌에서는 둘 다 투자 가능해요. 2026년 9월부터 DC형·IRP 계좌로 국채 직접 투자가 열리면서 선택지가 넓어졌어요. 안전자산 30% 의무 비중을 국채로 채울지 ETF로 채울지 고민이 생긴 거죠.
          </p>

          <SpokeCompareCards
            cards={[
              {
                title: '개인투자용 국채',
                subtitle: '정부 원금보장',
                items: [
                  '원금·이자 100% 정부 보장',
                  '복리 가산금리 1.25%p (20년물)',
                  '만기 보유 시 147% 수익 (세전)',
                  '중도 매도 시 금리 변동 리스크',
                ],
                recommended: true,
                recLabel: '안정성 우선',
              },
              {
                title: '채권형 ETF',
                subtitle: '시장수익률 추종',
                items: [
                  '시장 가격 변동에 따라 원금 손실 가능',
                  '국고채10년 ETF 연평균 5~6%',
                  '운용보수 0.03~0.15% 차감',
                  '언제든 매도 가능 (유동성 높음)',
                ],
              },
            ]}
          />

          <TipBox title="안전자산 30% 비중 채우기">
            <p className="text-neutral-600 leading-relaxed">
              퇴직연금 DC형은 위험자산(주식형 ETF 등)에 70%까지만 투자 가능해요. 나머지 30%는 <strong>안전자산</strong>으로 채워야 하는데, 국채와 채권형 ETF 둘 다 안전자산으로 인정돼요. 안정성을 더 중시한다면 국채, 유동성을 중시한다면 ETF가 나아요.
            </p>
          </TipBox>
        </>
      ),
      pasBridge: {
        href: '#sec-stability',
        question: '국채의 안정성은 구체적으로 어떤가요?',
        answer: (
          <>
            국채는 정부가 발행하는 채권이라 <strong>신용등급 AAA</strong>예요. 원금과 이자를 못 받을 리스크가 사실상 0%예요.
          </>
        ),
        buttonText: '안정성 비교 보기 →',
      },
    },

    // SECTION 02: 안정성 비교
    {
      id: 'sec-stability',
      number: 'SECTION 02',
      heading: '국채 안정성은 ETF보다 얼마나 높은가요?',
      subtitle: '원금손실 리스크 차이',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            국채는 <strong>정부가 원금과 이자를 100% 보장</strong>해요. 은행 예금은 1인당 5,000만 원까지만 보장되지만, 국채는 금액 제한 없이 전액 보장이에요. 만기까지 보유하면 약속된 금액을 정확히 받아요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            채권형 ETF는 국고채에 투자하는 상품이라 신용 리스크는 낮지만, <strong>시장 가격 변동 리스크</strong>는 있어요. 금리가 오르면 채권 가격이 떨어져서 매도 시 손실이 날 수 있어요. 예를 들어 금리가 1%p 오르면 10년물 채권 가격은 약 7~9% 하락해요.
          </p>
          <p className="text-neutral-600 mb-6 leading-relaxed">
            만기 보유 vs 중도 매도의 차이도 커요. 국채는 만기 보유 시 원금 보장이지만 중도 매도하면 ETF처럼 시장 가격 변동 영향을 받아요. ETF는 언제든 팔 수 있지만 그만큼 가격 변동 리스크가 일상화되어 있고요.
          </p>

          <SpokeRateBars
            bars={[
              { label: '국채 만기 보유', rate: '100%', width: '100%' },
              { label: '국채 중도 매도', rate: '85%', width: '85%' },
              { label: '채권형 ETF 1년 보유', rate: '75%', width: '75%' },
              { label: '주식형 ETF 1년 보유', rate: '40%', width: '40%' },
            ]}
          />

          <WarnBox>
            <p className="text-neutral-600 leading-relaxed">
              <strong>중도 매도 시 주의:</strong> 국채든 ETF든 만기 전에 팔면 금리 변동 영향을 받아요. 2026년 금리가 지금보다 오를 가능성이 있다면, 장기 국채(20년물)보다 중단기 국채(10년물)나 단기 채권 ETF가 안전할 수 있어요.
            </p>
          </WarnBox>
        </>
      ),
      pasBridge: {
        href: '#sec-return',
        question: '안전하다는 건 알겠는데, 수익률은 어떨까요?',
        answer: (
          <>
            국채 20년물은 연평균 <strong>7.3%</strong>, 채권형 ETF는 보통 <strong>5~6%</strong>예요. 장기 보유 시 국채가 더 유리해요.
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
      subtitle: '복리 가산금리 vs 시장수익률',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            국채 수익률은 <strong>복리 가산금리</strong>가 핵심이에요. 10년물은 표면금리에 1.0%p, 20년물은 1.25%p를 더해줘요. 만기 보유 시 세전 수익률은 10년물 54%(연평균 5.4%), 20년물 147%(연평균 7.3%)예요. 이자는 연복리로 붙어서 시간이 갈수록 복리 효과가 커져요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            채권형 ETF는 시장 금리를 추종해요. KODEX 국고채10년, ACE 국고채10년 같은 상품은 최근 5년 연평균 수익률이 5~6% 사이예요. 운용보수(0.03~0.15%)를 빼면 순수익은 조금 낮아지고요. 금리가 내려가면 채권 가격이 올라서 수익률이 높아지지만, 금리가 오르면 반대가 돼요.
          </p>
          <p className="text-neutral-600 mb-6 leading-relaxed">
            장기 투자 기준으로 보면 국채 20년물이 유리해요. 7.3%는 현재 채권형 ETF 평균 수익률보다 1~2%p 높거든요. 단, 20년 동안 돈이 묶인다는 게 부담이라면 ETF가 더 나을 수 있어요. 언제든 팔 수 있으니까요.
          </p>

          <SpokeCompareCards
            cards={[
              {
                title: '국채 20년물',
                subtitle: '복리 가산금리 1.25%p',
                items: [
                  '만기 보유 시 147% 수익 (세전)',
                  '연평균 수익률 7.3%',
                  '이자소득 분리과세 15.4%',
                  '만기까지 환금 제약',
                ],
                recommended: true,
                recLabel: '장기 투자',
              },
              {
                title: '채권형 ETF',
                subtitle: '시장금리 추종',
                items: [
                  '최근 5년 연평균 5~6%',
                  '운용보수 0.03~0.15% 차감',
                  '매매차익 비과세 (250만원 초과 시 과세)',
                  '언제든 환금 가능',
                ],
              },
            ]}
          />

          <TipBox title="세금 차이도 확인하세요">
            <p className="text-neutral-600 leading-relaxed">
              국채는 이자소득에 <strong>분리과세 15.4%</strong>가 적용돼요. ETF는 매매차익에 대해 250만원까지 비과세, 초과 시 22%예요. 고소득자라면 국채가 세금 면에서 유리할 수 있어요.
            </p>
          </TipBox>
        </>
      ),
      pasBridge: {
        href: '#sec-when',
        question: '그럼 언제 국채를 선택해야 하나요?',
        answer: (
          <>
            <strong>만기까지 보유할 여유자금</strong>이 있고, 안정성을 최우선으로 두는 투자자라면 국채가 나아요.
          </>
        ),
        buttonText: '선택 기준 보기 →',
      },
    },

    // SECTION 04: 선택 기준
    {
      id: 'sec-when',
      number: 'SECTION 04',
      heading: '퇴직연금 투자 비교 시 국채가 유리한 경우는 언제인가요?',
      subtitle: '투자자 유형별 선택 기준',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            <strong>국채가 유리한 경우</strong>는 크게 세 가지예요. 첫째, 만기까지 보유할 여유자금이 있을 때. 10년·20년 동안 돈이 묶여도 괜찮다면 복리 효과를 최대한 누릴 수 있어요. 둘째, 원금 손실을 절대 못 받아들이는 투자자. 정부가 100% 보장하니까 안심하고 묻어둘 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            셋째, 고소득자. 이자소득 분리과세 15.4%는 종합소득세율이 높은 사람에게 절세 효과가 커요. 예를 들어 종합소득세율이 38%라면 국채 이자는 15.4%만 떼이니까 22.6%p 절세되는 거예요.
          </p>
          <p className="text-neutral-600 mb-6 leading-relaxed">
            반대로 <strong>ETF가 유리한 경우</strong>는 유동성이 중요할 때예요. 갑자기 돈이 필요하면 바로 팔 수 있거든요. 또 금리 하락기에는 채권 가격이 올라서 ETF 수익률이 국채보다 높을 수 있어요. 단기적으로 시장 타이밍을 잡고 싶다면 ETF가 나아요.
          </p>

          <SpokeRateBars
            bars={[
              { label: '안정성 중시 (만기 보유 가능)', rate: '100%', width: '100%' },
              { label: '복리 장기수익 우선 (10년+)', rate: '90%', width: '90%' },
              { label: '유동성 중시 (중도 매도 가능)', rate: '30%', width: '30%' },
              { label: '단기 시장 타이밍 (1~3년)', rate: '20%', width: '20%' },
            ]}
          />

          <WarnBox>
            <p className="text-neutral-600 leading-relaxed">
              <strong>분산 투자도 고려하세요:</strong> 국채와 ETF를 반반씩 나눠서 안전자산 30%를 채우는 것도 방법이에요. 국채로 안정성 확보하고, ETF로 유동성 확보하는 거죠. <a href="/w/퇴직연금-DC형-IRP-국채-투자-조건-금융기관" className="text-[#4A7AB5] underline">참여 금융기관</a>에서 두 상품 모두 투자 가능해요.
            </p>
          </WarnBox>
        </>
      ),
      bridgeCTA: {
        href: '/w/연금형-개인투자용-국채-신청-방법-10년물-20년물',
        badge: '신청 방법',
        title: '국채 투자 결정했다면 어떻게 신청하나요?',
        desc: '전용계좌 개설부터 청약까지 절차 확인',
        icon: 'check',
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
      question: '퇴직연금 국채와 ETF를 둘 다 투자할 수 있나요?',
      answer:
        '네, 가능해요. DC형·IRP 계좌에서 국채와 채권형 ETF를 <strong>동시에 보유</strong>할 수 있어요. 안전자산 30% 비중을 둘로 나눠서 국채 15%, ETF 15% 이렇게 구성하는 것도 좋은 전략이에요.',
    },
    {
      question: '퇴직연금 국채 ETF 비교 시 세금은 어떻게 다른가요?',
      answer:
        '국채는 이자소득에 <strong>분리과세 15.4%</strong>가 적용돼요. ETF는 매매차익에 대해 250만원까지 비과세, 초과 시 22%예요. 고소득자(종합소득세율 38%)라면 국채가 절세 효과가 커요.',
    },
  ],

  relatedSpokes: [
    {
      badge: '신청',
      title: '연금형 개인투자용 국채 신청 방법',
      desc: '10년물·20년물 청약 절차와 배정 방식',
      href: '/w/연금형-개인투자용-국채-신청-방법-10년물-20년물',
    },
    {
      badge: '수익률',
      title: '개인투자용 국채 수익률 세금 혜택',
      desc: '복리 가산금리 1.25%p와 분리과세 15.4%',
      href: '/w/개인투자용-국채-수익률-세금-혜택-복리-비과세',
    },
    {
      badge: '조건',
      title: '퇴직연금 DC형 IRP 국채 투자 조건',
      desc: 'DC형·IRP 계좌로 국채 투자 조건과 참여 금융기관',
      href: '/w/퇴직연금-DC형-IRP-국채-투자-조건-금융기관',
    },
  ],

  sources: [
    {
      name: '내년 개인투자용 국채 2조원 발행…3년물도 도입',
      url: 'https://www.korea.kr/news/policyNewsView.do?newsId=148959500',
      org: '정부 정책브리핑',
    },
    {
      name: '2026년 개인투자용국채 연간·1월 발행계획 및 투자 활성화 방안',
      url: 'https://www.etoday.co.kr/news/view/2540759',
      org: '기획재정부',
    },
    {
      name: '개인투자용 국채에 복리 적용 검토',
      url: 'https://www.sedaily.com/NewsView/22RDW2C7VA',
      org: '서울경제',
    },
  ],
}

export default data
