import type { SpokeData } from '@/data/spoke/types'
import { SpokeTable, Chips, SpokeChecklist, TipBox } from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '퇴직연금-DC형-IRP-국채-투자-조건-금융기관',

  meta: {
    title: '퇴직연금 DC형 IRP 국채 투자 조건 | 참여 금융기관 목록',
    description: '2026년 9월부터 퇴직연금으로도 국채 투자가 가능해진다는 거 아시나요? DC형과 IRP 계좌 가입 조건부터 참여 금융기관 9곳까지 한번에 알려드려요.',
    keywords: ['퇴직연금 DC형 국채 조건', 'IRP 국채 투자 조건', '국채 참여 금융기관', '퇴직연금 국채 가입'],
    ogTitle: '퇴직연금 DC형 IRP 국채 투자 조건 | 머니위키',
    ogDescription: 'DC형·IRP로 국채 투자 조건과 참여 금융기관 9곳 확인',
  },

  hub: {
    url: '/w/퇴직연금-국채-투자-DC형-IRP-연금형',
    name: '퇴직연금 국채 투자 | DC형 IRP 계좌 연금형 국채',
  },

  breadcrumb: ['퇴직연금', '국채 투자', '퇴직연금 DC형 IRP 국채 투자 조건'],

  summary3: [
    <>2026년 9월부터 <strong>DC형·IRP</strong> 계좌로 10년물·20년물 국채 투자</>,
    <>참여 금융기관 <strong>증권 7곳 + 은행 2곳</strong>, 투자중개업 인가 필수</>,
    <>1인 1계좌 제한 없이 기존 퇴직연금 계좌에서 바로 청약 가능</>,
  ],

  sourceBar: {
    badge: '정책 출처',
    name: '정부 정책브리핑 + 기획재정부 공식 발표',
    date: '2026.02',
  },

  prevNext: {
    prev: { title: '연금형 개인투자용 국채 신청 방법', href: '/w/연금형-개인투자용-국채-신청-방법-10년물-20년물' },
    next: { title: '개인투자용 국채 수익률 세금 혜택', href: '/w/개인투자용-국채-수익률-세금-혜택-복리-비과세' },
  },

  stickyBar: {
    topLabel: '참여 금융기관',
    value: '증권 7곳 + 은행 2곳',
    buttonText: '금융기관 확인 →',
    scrollTo: '#sec-where',
  },

  hero: {
    badge: '2026년 9월 시행',
    h1: (
      <>
        퇴직연금 DC형 IRP로 국채 투자, <span className="text-[#1E3A5F]">어떤 조건</span>이 필요한가요?
      </>
    ),
    intro: (
      <p className="text-base text-neutral-500 leading-relaxed">
        퇴직연금이 쌓여가는데 주식은 무섭고 예금은 아쉬우셨죠. 2026년 9월부터 DC형이나 IRP 계좌로 국채를 직접 살 수 있어요. 국가가 보증하는 안정성에 연 5~7%대 수익률이에요. 참여 금융기관 9곳과 투자 조건을 차례대로 볼게요.
      </p>
    ),
    hubCTA: { badge: '전체 가이드', desc: '퇴직연금 국채 투자 제도부터 수익률까지 한눈에' },
  },

  toc: [
    { id: 'sec-what', label: '퇴직연금 DC형으로 국채 투자 조건은 무엇인가요?' },
    { id: 'sec-irp', label: 'IRP 계좌로 국채 투자하려면 어떤 조건이 필요한가요?' },
    { id: 'sec-where', label: '국채 투자 참여 금융기관은 어디인가요?' },
    { id: 'sec-how', label: '퇴직연금 국채 가입 절차는 어떻게 되나요?' },
    { id: 'sec-faq', label: '자주 묻는 질문' },
  ],

  sections: [
    // SECTION 01: DC형 조건
    {
      id: 'sec-what',
      number: 'SECTION 01',
      heading: '퇴직연금 DC형으로 국채 투자 조건은 무엇인가요?',
      subtitle: 'DC형 계좌만 있으면 바로 가능',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            가장 중요한 조건은 <strong>DC형 퇴직연금 계좌</strong>가 있어야 한다는 거예요. DC형은 확정기여형이라고 불러요. 회사가 매년 정해진 금액을 내주면 근로자가 직접 운용하는 방식이에요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            DC형 계좌가 있다면 2026년 9월부터 <a href="/w/연금형-개인투자용-국채-신청-방법-10년물-20년물" className="text-[#4A7AB5] underline">10년물과 20년물 국채</a>를 직접 살 수 있어요. 3년물과 5년물은 퇴직연금 계좌로는 못 사고 전용계좌에서만 가능해요.
          </p>
          <p className="text-neutral-600 mb-6 leading-relaxed">
            핵심은 퇴직연금사업자가 <strong>투자중개업 인가</strong>를 보유해야 한다는 점이에요. 아래 참여 금융기관 9곳이 인가를 받았고, 9월부터 청약을 받아요.
          </p>

          <SpokeTable
            id="dc-conditions"
            title="DC형 국채 투자 조건"
            subtitle="필수 요건 3가지"
            headers={['조건', '세부 내용']}
            rows={[
              ['계좌 유형', 'DC형(확정기여형) 퇴직연금 계좌'],
              ['투자 가능 상품', '개인투자용 국채 10년물, 20년물 (3년물·5년물 제외)'],
              ['금융기관 요건', '투자중개업 인가를 보유한 퇴직연금사업자 9곳'],
              ['개설 제한', '기존 전용계좌와 별도. 1인 1계좌 제한 없음'],
              ['청약 시작일', '2026년 9월부터'],
            ]}
          />

          <TipBox title="DB형은 안 되나요?">
            <p className="text-neutral-600 leading-relaxed">
              DB형(확정급여형)은 회사가 운용 책임을 지는 방식이라 개인이 직접 상품을 고르지 못해요. DC형이나 IRP만 가능해요. 만약 DB형만 있다면 <strong>IRP 계좌를 추가로 개설</strong>하면 국채 투자가 가능해요.
            </p>
          </TipBox>
        </>
      ),
      pasBridge: {
        href: '#sec-irp',
        question: 'IRP 계좌로도 국채를 살 수 있나요?',
        answer: (
          <>
            네, DC형과 똑같이 가능해요. IRP는 <strong>개인형 퇴직연금</strong>이라서 회사를 옮기거나 자영업자도 쓸 수 있어요.
          </>
        ),
        buttonText: 'IRP 조건 확인 →',
      },
    },

    // SECTION 02: IRP 조건
    {
      id: 'sec-irp',
      number: 'SECTION 02',
      heading: 'IRP 계좌로 국채 투자하려면 어떤 조건이 필요한가요?',
      subtitle: 'IRP 계좌만 있으면 즉시 가능',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            IRP는 개인형 퇴직연금이에요. 퇴직금을 받아서 넣거나, 회사에 퇴직연금이 없을 때 개인이 직접 가입하는 계좌예요. 이 계좌가 있으면 DC형과 똑같이 국채를 살 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            IRP 계좌는 참여 금융기관 중 1곳에 있으면 돼요. 계좌를 이미 쓰고 있었다면 별도 개설 없이 9월부터 바로 청약할 수 있어요.
          </p>
          <p className="text-neutral-600 mb-6 leading-relaxed">
            다만 해당 금융기관이 <strong>투자중개업 인가</strong>를 받아야 해요. 아래 9곳이 정부와 협의를 마쳤고, 추가로 더 늘어날 계획이에요. <a href="/w/개인투자용-국채-수익률-세금-혜택-복리-비과세" className="text-[#4A7AB5] underline">국채 수익률과 세금 혜택</a>도 미리 확인하세요.
          </p>

          <Chips
            items={[
              { icon: 'check', label: '계좌 유형', value: 'IRP (개인형 퇴직연금)' },
              { icon: 'check', label: '투자 가능 상품', value: '10년물·20년물 국채' },
              { icon: 'check', label: '개설 조건', value: '기존 IRP 계좌 그대로 사용' },
              { icon: 'check', label: '청약 시작일', value: '2026년 9월부터' },
            ]}
          />

          <TipBox title="IRP와 전용계좌 중복 가능">
            <p className="text-neutral-600 leading-relaxed">
              전용계좌(3·5·10·20년물 모두 가능)와 IRP 계좌(10·20년물만)를 둘 다 쓸 수 있어요. 단기 목돈은 전용계좌로 3년물, 퇴직연금은 IRP로 20년물 이렇게 나눠도 돼요.
            </p>
          </TipBox>
        </>
      ),
      pasBridge: {
        href: '#sec-where',
        question: '참여 금융기관은 어디인가요?',
        answer: (
          <>
            증권사 7곳과 은행 2곳이 참여해요. <strong>KB증권, NH투자증권, 미래에셋증권</strong> 등 주요 증권사가 모두 포함됐어요.
          </>
        ),
        buttonText: '금융기관 목록 보기 →',
      },
    },

    // SECTION 03: 참여 금융기관
    {
      id: 'sec-where',
      number: 'SECTION 03',
      heading: '국채 투자 참여 금융기관은 어디인가요?',
      subtitle: '증권 7곳 + 은행 2곳 총 9곳',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            정부가 발표한 참여 금융기관은 <strong>증권사 7곳, 은행 2곳</strong>이에요. 투자중개업 인가를 보유한 곳들이라 9월부터 DC형·IRP 계좌로 바로 청약할 수 있어요.
          </p>
          <p className="text-neutral-600 mb-6 leading-relaxed">
            이미 이 금융기관에 DC형이나 IRP 계좌가 있다면 별도 개설 없이 기존 계좌로 신청하면 돼요. 없으면 9월 전에 미리 계좌를 열어두는 게 좋아요.
          </p>

          <SpokeTable
            id="participating-firms"
            title="퇴직연금 국채 투자 참여 금융기관"
            subtitle="2026년 9월 시행 기준 9곳"
            headers={['구분', '금융기관명', '비고']}
            rows={[
              ['증권사', 'KB증권', '온라인 청약 지원'],
              ['증권사', 'NH투자증권', '온라인 청약 지원'],
              ['증권사', '미래에셋증권', '온라인 청약 지원'],
              ['증권사', '삼성증권', '온라인 청약 지원'],
              ['증권사', '신영증권', '온라인 청약 지원'],
              ['증권사', '키움증권', '온라인 청약 지원'],
              ['증권사', '한국투자증권', '온라인 청약 지원'],
              ['은행', 'NH농협은행', '모바일뱅킹 청약'],
              ['은행', '신한은행', '모바일뱅킹 청약'],
            ]}
            highlightCol={1}
          />

          <TipBox title="추가 금융기관 확대 예정">
            <p className="text-neutral-600 leading-relaxed">
              정부는 향후 더 많은 금융기관이 참여할 수 있도록 유도할 계획이에요. 지금은 9곳이지만 2026년 하반기에 추가 금융기관이 발표될 수 있어요.
            </p>
          </TipBox>
        </>
      ),
      pasBridge: {
        href: '#sec-how',
        question: '실제로 어떻게 신청하나요?',
        answer: (
          <>
            기존 DC형·IRP 계좌가 있다면 <strong>청약 기간에 모바일로 신청</strong>하면 끝이에요. 전용계좌 개설도 필요 없어요.
          </>
        ),
        buttonText: '신청 절차 확인 →',
      },
    },

    // SECTION 04: 가입 절차
    {
      id: 'sec-how',
      number: 'SECTION 04',
      heading: '퇴직연금 국채 가입 절차는 어떻게 되나요?',
      subtitle: '기존 계좌로 바로 청약',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            가입 절차가 아주 간단해요. 참여 금융기관에 DC형이나 IRP 계좌가 있다면 전용계좌 개설 없이 <strong>기존 계좌에서 바로 청약</strong>하면 돼요.
          </p>
          <p className="text-neutral-600 mb-6 leading-relaxed">
            청약은 매월 발행 기간에 맞춰 모바일 앱이나 웹에서 신청해요. 만기(10년물 또는 20년물)와 금액을 입력하면 끝이에요. 청약 총액이 발행 한도보다 많으면 300만원까지 우선 배정하고 나머지는 비례 배정해요.
          </p>

          <SpokeChecklist
            items={[
              { text: '참여 금융기관 중 1곳에 DC형 또는 IRP 계좌 개설', done: true },
              { text: '투자중개업 인가 보유 확인 (위 9곳은 모두 보유)', done: true },
              { text: '2026년 9월 청약 기간 확인 (보통 매월 셋째 주)', note: '기획재정부 국채 발행계획 참고' },
              { text: '모바일 앱 또는 웹에서 만기(10년/20년) 선택', note: '3년·5년물은 전용계좌만 가능' },
              { text: '청약 금액 입력 후 신청 (300만원까지 우선 배정)', done: false },
              { text: '청약일 다음 날 배정 결과 확인', done: false },
              { text: '만기까지 보유 시 원금+이자 수령', note: '중도 매도 시 손실 가능' },
            ]}
          />

          <TipBox title="계좌가 없다면 미리 개설하세요">
            <p className="text-neutral-600 leading-relaxed">
              참여 금융기관 중 DC형이나 IRP 계좌가 없다면 9월 전에 미리 열어두세요. 계좌 개설은 모바일로 비대면 가능해요. 신청 방법은 별도 글에서 자세히 확인할 수 있어요.
            </p>
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '/w/개인투자용-국채-수익률-세금-혜택-복리-비과세',
        badge: '수익률',
        title: '국채 투자하면 수익률은 얼마나 될까요?',
        desc: '가산금리 1~1.25%p와 복리 효과까지 계산',
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
      question: '퇴직연금 DC형 계좌로 3년물 국채도 살 수 있나요?',
      answer:
        '아니요, DC형과 IRP 계좌로는 <strong>10년물과 20년물만</strong> 청약할 수 있어요. 3년물과 5년물은 전용계좌에서만 가능해요. 단기 투자는 전용계좌, 장기 퇴직연금은 DC형·IRP 이렇게 나눠서 쓰세요.',
    },
    {
      question: 'IRP 계좌 없이 전용계좌만으로 국채 투자 가능한가요?',
      answer:
        '네, 전용계좌로도 국채 투자가 가능해요. 전용계좌는 3년·5년·10년·20년물 모두 청약할 수 있어요. 다만 <strong>1인 1계좌</strong> 제한이 있어서 다른 금융기관에 이미 전용계좌가 있으면 새로 못 만들어요.',
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
      desc: '복리 가산금리 1~1.25%p와 비과세 조건',
      href: '/w/개인투자용-국채-수익률-세금-혜택-복리-비과세',
    },
    {
      badge: '비교',
      title: '퇴직연금 국채 vs ETF 비교',
      desc: '안정성과 수익률, 어느 쪽이 유리한지 분석',
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
      url: 'https://www.moef.go.kr/nw/nes/detailNesDtaView.do?menuNo=4010100&searchNttId1=MOSF_000000000072123',
      org: '기획재정부',
    },
  ],
}

export default data
