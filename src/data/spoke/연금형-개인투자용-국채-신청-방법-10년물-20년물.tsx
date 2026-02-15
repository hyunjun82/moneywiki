import type { SpokeData } from '@/data/spoke/types'
import { Steps, SpokeCompareCards, TipBox, DetailBox } from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '연금형-개인투자용-국채-신청-방법-10년물-20년물',

  meta: {
    title: '연금형 개인투자용 국채 신청 방법 | 10년물 20년물 차이',
    description: '연금형 개인투자용 국채에 가산금리 1.0~1.25%p가 복리로 붙는다는 거 아시나요? 10년물은 연 5.4%, 20년물은 연 7.3% 수익률로, DC형·IRP 계좌로 신청하는 방법까지 알려드려요.',
    keywords: ['연금형 개인투자용 국채 신청', '개인투자용 국채 10년물', '개인투자용 국채 20년물', '국채 신청 방법'],
    ogTitle: '연금형 개인투자용 국채 신청 방법 | 머니위키',
    ogDescription: '10년물 vs 20년물 비교부터 신청 절차까지 확인해 보세요.',
  },

  hub: {
    url: '/w/퇴직연금-국채-투자-DC형-IRP-연금형',
    name: '퇴직연금 국채 투자 | DC형 IRP 계좌 연금형 국채',
  },

  breadcrumb: ['퇴직연금', '국채 투자', '연금형 개인투자용 국채 신청 방법'],

  summary3: [
    <>2026년 9월부터 <strong>DC형·IRP 계좌</strong>로 국채 직접 투자 가능</>,
    <>10년물 연평균 <strong>5.4%</strong>, 20년물 연평균 <strong>7.3%</strong> 세전 수익률</>,
    <>전용계좌 개설 후 모바일로 청약, 300만원까지 우선 배정</>,
  ],

  sourceBar: {
    badge: '정책 출처',
    name: '정부 정책브리핑 + 기획재정부 발행계획',
    date: '2026.02',
  },

  prevNext: {
    prev: { title: '퇴직연금 DC형 IRP 국채 투자 조건', href: '/w/퇴직연금-DC형-IRP-국채-투자-조건-금융기관' },
    next: { title: '개인투자용 국채 수익률 세금 혜택', href: '/w/개인투자용-국채-수익률-세금-혜택-복리-비과세' },
  },

  stickyBar: {
    topLabel: '신청 방법',
    value: '전용계좌 개설 → 청약',
    buttonText: '신청 절차 보기 →',
    scrollTo: '#sec-apply',
  },

  hero: {
    badge: '2026년 9월 시행',
    h1: (
      <>
        연금형 개인투자용 국채 신청 방법, <span className="text-[#1E3A5F]">10년물과 20년물</span> 어떻게 고를까요?
      </>
    ),
    intro: (
      <p className="text-base text-neutral-500 leading-relaxed">
        퇴직연금으로 국채 투자가 가능해졌어요. 10년물은 연평균 5.4%, 20년물은 7.3% 수익률이에요. 만기가 길수록 가산금리가 높지만 환금성 제약이 있거든요. 어느 쪽이 나한테 유리한지, 신청은 어떻게 하는지 차례대로 정리할게요.
      </p>
    ),
    hubCTA: { badge: '전체 가이드', desc: '퇴직연금 국채 투자 조건부터 수익률까지 한눈에' },
  },

  toc: [
    { id: 'sec-how', label: '연금형 개인투자용 국채 신청 방법은 어떻게 되나요?' },
    { id: 'sec-diff', label: '개인투자용 국채 10년물 20년물 차이는 무엇인가요?' },
    { id: 'sec-docs', label: '개인투자용 국채 신청 시 필요한 서류는 무엇인가요?' },
    { id: 'sec-apply', label: '연금형 국채 신청 후 배정 절차는 어떻게 진행되나요?' },
    { id: 'sec-faq', label: '자주 묻는 질문' },
  ],

  sections: [
    // SECTION 01: 신청 방법
    {
      id: 'sec-how',
      number: 'SECTION 01',
      heading: '연금형 개인투자용 국채 신청 방법은 어떻게 되나요?',
      subtitle: '전용계좌 개설부터 청약까지 순서대로',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            2026년 9월부터 DC형·IRP 계좌로 <a href="/w/퇴직연금-DC형-IRP-국채-투자-조건-금융기관" className="text-[#4A7AB5] underline">개인투자용 국채</a>를 직접 살 수 있어요. 기존에는 전용계좌만 가능했는데 퇴직연금 계좌도 열린 거예요. 신청은 모바일로 간단하게 할 수 있고요.
          </p>
          <p className="text-neutral-600 mb-6 leading-relaxed">
            먼저 전용계좌를 열고, 청약 기간에 원하는 만기(10년물 또는 20년물)와 금액을 입력하면 돼요. 청약 총액이 발행 한도보다 많으면 300만원까지 우선 배정하고 나머지는 비례 배정해요.
          </p>

          <Steps
            items={[
              {
                title: '전용계좌 개설',
                desc: '참여 금융기관(KB증권, NH투자증권, 미래에셋증권, 삼성증권, 신영증권, 키움증권, 한국투자증권, NH농협은행, 신한은행) 중 1곳에 1인 1계좌 개설. 모바일 앱(M-STOCK) 또는 모바일웹에서 가능해요.',
              },
              {
                title: '청약 신청',
                desc: '매월 발행 기간에 맞춰 전용계좌에서 청약. 만기(10년물/20년물)와 금액을 선택해요. DC형·IRP 계좌는 10년물과 20년물만 청약 가능해요.',
              },
              {
                title: '배정 확인',
                desc: '청약 총액이 발행 한도 이내면 전액 배정. 초과 시 기준금액(300만원)까지 우선 배정 후 잔여는 비례 배정. 배정 결과는 청약일 다음 날 확인 가능해요.',
              },
              {
                title: '만기 보유 또는 매도',
                desc: '만기까지 보유하면 원금+이자 전액 수령. 중도 매도도 가능하지만 시장금리 변동에 따라 손실이 날 수 있어요.',
              },
            ]}
          />

          <TipBox title="퇴직연금 계좌 청약 시 주의사항">
            <p className="text-neutral-600 leading-relaxed">
              DC형·IRP 계좌로는 <strong>10년물과 20년물만</strong> 청약할 수 있어요. 3년물과 5년물은 전용계좌에서만 가능해요. 또한 퇴직연금사업자가 투자중개업 인가를 보유해야 하니 미리 확인하세요.
            </p>
          </TipBox>
        </>
      ),
      pasBridge: {
        href: '#sec-diff',
        question: '10년물과 20년물 중 뭘 골라야 할까요?',
        answer: (
          <>
            만기가 길수록 <strong>가산금리</strong>가 높아서 수익률이 좋아요. 하지만 20년은 환금성 제약이 크니 여유자금과 투자기간을 따져봐야 해요.
          </>
        ),
        buttonText: '만기별 차이 보기 →',
      },
    },

    // SECTION 02: 10년물 vs 20년물
    {
      id: 'sec-diff',
      number: 'SECTION 02',
      heading: '개인투자용 국채 10년물 20년물 차이는 무엇인가요?',
      subtitle: '수익률과 환금성 비교',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            가장 큰 차이는 <strong>가산금리</strong>예요. 10년물은 표면금리에 1.0%p, 20년물은 1.25%p를 더해줘요. 만기 보유 시 세전 수익률은 10년물 54%(연평균 5.4%), 20년물 147%(연평균 7.3%)예요.
          </p>
          <p className="text-neutral-600 mb-6 leading-relaxed">
            숫자만 보면 20년물이 훨씬 좋아 보여요. 하지만 20년 동안 돈이 묶인다는 게 부담이에요. 중도 매도는 가능하지만 금리가 오르면 채권 가격이 내려가서 손해 볼 수 있어요.
          </p>

          <SpokeCompareCards
            cards={[
              {
                title: '10년물',
                subtitle: '중장기 투자자',
                items: [
                  '가산금리 1.0%p',
                  '만기 보유 시 54% 수익 (세전)',
                  '연평균 수익률 5.4%',
                  '10년 후 원금+이자 수령',
                ],
              },
              {
                title: '20년물',
                subtitle: '장기 안정형',
                items: [
                  '가산금리 1.25%p',
                  '만기 보유 시 147% 수익 (세전)',
                  '연평균 수익률 7.3%',
                  '20년 후 원금+이자 수령',
                ],
                recommended: true,
                recLabel: '수익률 우선',
              },
            ]}
          />

          <TipBox title="중도 매도 시 손실 위험">
            <p className="text-neutral-600 leading-relaxed">
              만기 전에 팔면 시장금리에 따라 가격이 달라져요. 금리가 오르면 채권 가격이 떨어져서 원금 손실이 날 수 있어요. <a href="/w/개인투자용-국채-수익률-세금-혜택-복리-비과세" className="text-[#4A7AB5] underline">만기까지 보유할 여유자금</a>인지 먼저 확인하세요.
            </p>
          </TipBox>
        </>
      ),
      pasBridge: {
        href: '#sec-docs',
        question: '신청할 때 서류는 뭐가 필요한가요?',
        answer: (
          <>
            전용계좌 개설 시 신분증과 계좌정보만 있으면 돼요. <strong>모바일로 비대면 개설</strong>이 가능해서 간편해요.
          </>
        ),
        buttonText: '필요 서류 확인 →',
      },
    },

    // SECTION 03: 필요 서류
    {
      id: 'sec-docs',
      number: 'SECTION 03',
      heading: '개인투자용 국채 신청 시 필요한 서류는 무엇인가요?',
      subtitle: '비대면 개설에 필요한 것들',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            전용계좌는 모바일로 개설할 수 있어서 복잡한 서류는 없어요. 신분증과 입출금 계좌 정보만 준비하면 돼요. 1인 1계좌 원칙이라 다른 금융기관에 이미 전용계좌가 있으면 새로 못 만들어요.
          </p>
          <p className="text-neutral-600 mb-6 leading-relaxed">
            퇴직연금(DC형·IRP) 계좌로 청약하려면 별도 전용계좌 개설 없이 기존 계좌에서 바로 청약해요. 단, 해당 퇴직연금사업자가 투자중개업 인가를 보유해야 해요.
          </p>

          <DetailBox
            title="계좌 개설 준비물"
            items={[
              {
                heading: '신분증',
                desc: '주민등록증, 운전면허증, 여권 중 1개. 비대면 개설 시 모바일 앱에서 촬영 인증해요.',
              },
              {
                heading: '입출금 계좌',
                desc: '청약 대금 출금 및 이자 입금 계좌. 본인 명의 계좌여야 해요.',
              },
              {
                heading: '연락처 및 이메일',
                desc: '배정 결과 및 만기 안내를 받을 연락처와 이메일 주소.',
              },
            ]}
          />

          <TipBox title="퇴직연금 계좌 청약은 더 간편해요">
            <p className="text-neutral-600 leading-relaxed">
              이미 DC형이나 IRP 계좌가 있다면 전용계좌 개설 없이 바로 청약할 수 있어요. 참여 금융기관(KB증권, NH투자증권, 미래에셋증권, 삼성증권, 신영증권, 키움증권, 한국투자증권, NH농협은행, 신한은행) 중 계좌가 있는지 확인하세요.
            </p>
          </TipBox>
        </>
      ),
      pasBridge: {
        href: '#sec-apply',
        question: '청약 후 배정은 어떻게 되나요?',
        answer: (
          <>
            청약 총액이 발행 한도보다 적으면 <strong>전액 배정</strong>이에요. 많으면 300만원까지 우선 배정하고 나머지는 청약액에 비례해서 나눠줘요.
          </>
        ),
        buttonText: '배정 절차 보기 →',
      },
    },

    // SECTION 04: 배정 절차
    {
      id: 'sec-apply',
      number: 'SECTION 04',
      heading: '연금형 국채 신청 후 배정 절차는 어떻게 진행되나요?',
      subtitle: '청약부터 배정까지 흐름',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            청약을 넣으면 다음 날 배정 결과가 나와요. 청약 총액이 월간 발행 한도보다 적으면 신청한 금액 전부 배정받아요. 초과하면 기준금액(300만원)까지 우선 배정하고, 남은 물량은 청약액에 비례해서 나눠줘요.
          </p>
          <p className="text-neutral-600 mb-6 leading-relaxed">
            배정받으면 청약 대금이 자동 출금되고, 만기까지 이자가 복리로 붙어요. 중도 매도하려면 채권 시장에서 팔 수 있지만 금리 변동에 따라 손실이 날 수 있어요.
          </p>

          <DetailBox
            title="배정 방식"
            items={[
              {
                heading: '청약 총액 ≤ 발행 한도',
                desc: '신청한 금액 전액 배정. 예: 발행 한도 5,000억 원, 청약 총액 4,000억 원 → 전원 100% 배정',
              },
              {
                heading: '청약 총액 > 발행 한도',
                desc: '기준금액(300만원)까지 우선 배정 후 잔여 물량은 청약액에 비례 배정. 예: 500만원 청약 시 300만원 우선 배정 + 나머지 200만원은 비례 배정',
              },
              {
                heading: '배정 결과 확인',
                desc: '청약일 다음 날 전용계좌 또는 퇴직연금 계좌에서 확인. 모바일 앱 또는 웹에서 조회 가능',
              },
            ]}
          />

          <TipBox title="만기 보유 vs 중도 매도">
            <p className="text-neutral-600 leading-relaxed">
              만기까지 보유하면 원금과 이자를 전액 받아요. 중도 매도는 가능하지만 시장금리가 오르면 채권 가격이 떨어져서 손실이 날 수 있어요. 10년·20년물은 <strong>만기 보유가 원칙</strong>이라고 생각하는 게 안전해요.
            </p>
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '/w/개인투자용-국채-수익률-세금-혜택-복리-비과세',
        badge: '수익률 계산',
        title: '내 투자금으로 수익률은 얼마나 될까?',
        desc: '복리 가산금리까지 반영한 실수령액 확인',
        icon: 'calc',
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
      question: '연금형 개인투자용 국채 청약은 매월 가능한가요?',
      answer:
        '네, 매월 발행 기간에 청약할 수 있어요. 2026년 1월부터 월 단위로 발행되고, 청약 기간은 보통 <strong>매월 셋째 주</strong>예요. 구체적인 일정은 기획재정부 국채 발행계획을 확인하세요.',
    },
    {
      question: '개인투자용 국채 10년물과 20년물 둘 다 청약 가능한가요?',
      answer:
        '네, 둘 다 청약할 수 있어요. 한 사람이 10년물 300만원, 20년물 500만원 이렇게 나눠서 신청해도 돼요. 단, <strong>총 배정 한도</strong>는 월간 발행 한도 내에서 비례 배정되니 참고하세요.',
    },
  ],

  relatedSpokes: [
    {
      badge: '조건',
      title: '퇴직연금 DC형 IRP 국채 투자 조건',
      desc: 'DC형·IRP 계좌로 국채 투자 조건과 참여 금융기관 9곳',
      href: '/w/퇴직연금-DC형-IRP-국채-투자-조건-금융기관',
    },
    {
      badge: '수익률',
      title: '개인투자용 국채 수익률 세금 혜택',
      desc: '복리 가산금리 1~1.25%p와 비과세 혜택 정리',
      href: '/w/개인투자용-국채-수익률-세금-혜택-복리-비과세',
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
      name: '내년 개인투자용 국채 2조원 발행…3년물도 도입',
      url: 'https://www.korea.kr/news/policyNewsView.do?newsId=148959500',
      org: '정부 정책브리핑',
    },
    {
      name: '2026년 개인투자용국채 연간·1월 발행계획 및 투자 활성화 방안',
      url: 'https://biz.heraldcorp.com/article/10645875',
      org: '기획재정부',
    },
  ],
}

export default data
