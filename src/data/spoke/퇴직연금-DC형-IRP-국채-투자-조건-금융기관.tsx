import type { SpokeData } from '@/data/spoke/types'
import { SpokeTable, Chips, SpokeChecklist, TipBox, SpokeWarnBox } from '@/components/spoke/SpokeBlocks'
import 퇴직연금국채Checker from '@/components/checkers/퇴직연금국채Checker'

const data: SpokeData = {
  slug: '퇴직연금-DC형-IRP-국채-투자-조건-금융기관',

  meta: {
    title: '퇴직연금 DC형 IRP 국채 투자 조건 | 참여 금융기관 목록',
    description: 'DC형이나 IRP로 국채 투자하고 싶은데 조건이 뭔지 모르시겠다고요? 2026년 9월부터 참여 금융기관 9곳에서 10년물·20년물 국채 청약이 가능해진다는 거 아시나요? 퇴직연금 국채 가입 조건과 절차를 알려드려요.',
    keywords: ['퇴직연금 DC형 국채 조건', 'IRP 국채 투자 조건', '국채 참여 금융기관', '퇴직연금 국채 가입'],
    ogTitle: '퇴직연금 DC형 IRP 국채 투자 조건 | 머니위키',
    ogDescription: 'DC형·IRP 국채 투자 조건과 참여 금융기관 9곳 확인하세요.',
  },

  hub: {
    url: '/w/퇴직연금-국채-투자-DC형-IRP-연금형',
    name: '퇴직연금 국채 투자 | DC형 IRP 계좌 연금형 국채',
  },

  breadcrumb: ['퇴직연금', '국채 투자', '퇴직연금 DC형 IRP 국채 투자 조건'],

  summary3: [
    <>2026년 9월부터 <strong>DC형·IRP</strong> 계좌로 10년물·20년물 국채 투자 가능</>,
    <>참여 금융기관 <strong>증권 7곳 + 은행 2곳</strong>, 투자중개업 인가 필수</>,
    <>기존 퇴직연금 계좌에서 전용계좌 개설 없이 바로 청약 가능</>,
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
        퇴직연금이 쌓여가는데 주식은 무섭고 예금은 아쉬우셨죠. 2026년 9월부터 DC형이나 IRP 계좌로 국채를 직접 살 수 있어요. 국가가 보증하는 안정성에 만기 보유 시 연 5~7%대 수익률까지 가능해요. 참여 금융기관 9곳과 투자 조건을 차례대로 정리해 볼게요.
      </p>
    ),
    hubCTA: { badge: '전체 가이드', desc: '퇴직연금 국채 투자 제도부터 수익률까지 한눈에' },
  },

  toc: [
    { id: 'sec-what', label: '퇴직연금 DC형으로 국채 투자 조건은 무엇인가요?' },
    { id: 'sec-irp', label: 'IRP 국채 투자 조건과 전용계좌 차이는 무엇인가요?' },
    { id: 'sec-where', label: '국채 참여 금융기관은 어디인가요?' },
    { id: 'sec-how', label: '퇴직연금 국채 가입 절차는 어떻게 되나요?' },
    { id: 'sec-faq', label: '자주 묻는 질문' },
  ],

  sections: [
    // CHECKER: 퇴직연금 국채 투자 자격 확인
    {
      id: 'checker',
      number: 'CHECK',
      heading: '퇴직연금으로 국채 투자할 수 있는지 확인해 보세요',
      subtitle: '3가지만 선택하면 바로 알 수 있어요',
      content: <퇴직연금국채Checker />,
    },
    // SECTION 01: DC형 조건
    {
      id: 'sec-what',
      number: 'SECTION 01',
      heading: '퇴직연금 DC형으로 국채 투자 조건은 무엇인가요?',
      subtitle: 'DC형 계좌만 있으면 바로 가능',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            가장 중요한 조건은 <strong>DC형 퇴직연금 계좌</strong>가 있어야 한다는 거예요. DC형은 확정기여형이라고 불러요. 회사가 매년 정해진 금액을 내주면 근로자가 직접 운용 상품을 고르는 방식이에요. 여기서 국채를 골라 담을 수 있는 거예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            DC형 계좌가 있다면 2026년 9월부터 <a href="/w/연금형-개인투자용-국채-신청-방법-10년물-20년물" className="text-[#4A7AB5] underline">10년물과 20년물 국채</a>를 직접 청약할 수 있어요. 3년물과 5년물은 퇴직연금 계좌로는 못 사요. 별도의 전용계좌에서만 가능해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            한 가지 더 확인할 게 있어요. 내 퇴직연금을 관리하는 금융기관이 <strong>투자중개업 인가</strong>를 보유해야 해요. 현재 인가를 받은 곳은 증권사 7곳, 은행 2곳으로 총 9곳이에요.
          </p>
          <p className="text-neutral-600 mb-6 leading-relaxed">
            전용계좌 개설 없이 기존 DC형 계좌에서 바로 청약하는 거라 별도 절차가 간단해요. 1인 1계좌 제한도 없어서 전용계좌와 동시에 쓸 수 있어요.
          </p>

          <Chips
            items={[
              { icon: 'check', label: '계좌 유형', value: 'DC형(확정기여형)' },
              { icon: 'info', label: '투자 상품', value: '10년물·20년물 국채' },
              { icon: 'star', label: '금융기관', value: '인가 보유 9곳' },
              { icon: 'clock', label: '시행 시기', value: '2026년 9월' },
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
        href: '/w/개인투자용-국채-수익률-세금-혜택-복리-비과세',
        question: 'IRP 계좌로도 국채를 살 수 있나요?',
        answer: (
          <>
            네, DC형과 동일하게 가능해요. IRP는 <strong>개인형 퇴직연금</strong>이라서 회사를 옮기거나 자영업자도 활용할 수 있어요.
          </>
        ),
        buttonText: 'IRP 조건 확인 →',
      },
    },

    // SECTION 02: IRP 조건 + 전용계좌 차이
    {
      id: 'sec-irp',
      number: 'SECTION 02',
      heading: 'IRP 국채 투자 조건과 전용계좌 차이는 무엇인가요?',
      subtitle: 'IRP 계좌면 즉시 가능, 전용계좌와 병행도 OK',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            IRP는 개인형 퇴직연금이에요. 퇴직금을 받아서 넣거나, 회사에 퇴직연금이 없을 때 개인이 직접 가입하는 계좌예요. 이 계좌가 있으면 DC형과 동일하게 10년물·20년물 국채를 청약할 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            참여 금융기관 중 1곳에 IRP가 개설돼 있으면 별도 절차 없이 9월부터 바로 청약이 가능해요. 기존에 IRP를 쓰고 있었다면 추가 개설이 필요 없어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            전용계좌와의 가장 큰 차이는 투자 가능 만기예요. 전용계좌는 3년·5년·10년·20년물을 전부 살 수 있지만, IRP는 10년물·20년물만 가능해요. 대신 IRP는 <a href="/w/개인투자용-국채-수익률-세금-혜택-복리-비과세" className="text-[#4A7AB5] underline">세액공제 혜택</a>이 별도로 있어서 절세 효과가 더 클 수 있어요.
          </p>
          <p className="text-neutral-600 mb-6 leading-relaxed">
            두 계좌를 동시에 쓰는 것도 가능해요. 단기 목돈은 전용계좌로 3년물, 퇴직연금은 IRP로 20년물 이렇게 나눠서 운용하면 효율적이에요.
          </p>

          <Chips
            items={[
              { icon: 'doc', label: '계좌 유형', value: 'IRP (개인형 퇴직연금)' },
              { icon: 'clock', label: '투자 가능 상품', value: '10년물·20년물 국채' },
              { icon: 'check', label: '추가 개설', value: '기존 IRP 그대로 사용' },
              { icon: 'calc', label: '전용계좌 병행', value: '동시 사용 가능' },
            ]}
          />

          <SpokeWarnBox title="전용계좌는 1인 1계좌 제한">
            <p className="text-neutral-600 leading-relaxed">
              전용계좌(3·5·10·20년물 모두 가능)는 <strong>1인 1계좌</strong> 제한이 있어요. 이미 다른 금융기관에 전용계좌가 있으면 새로 못 만들어요. 반면 IRP는 여러 금융기관에 동시 개설이 가능해요.
            </p>
          </SpokeWarnBox>
        </>
      ),
      pasBridge: {
        href: '/w/연금형-개인투자용-국채-신청-방법-10년물-20년물',
        question: '그럼 참여 금융기관은 어디인가요?',
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
      heading: '국채 참여 금융기관은 어디인가요?',
      subtitle: '증권 7곳 + 은행 2곳 총 9곳',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            정부가 발표한 참여 금융기관은 <strong>증권사 7곳, 은행 2곳</strong>이에요. 모두 투자중개업 인가를 보유한 퇴직연금사업자들이에요. 2026년 9월부터 DC형·IRP 계좌로 국채 청약을 받아요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            이미 이 금융기관에 퇴직연금 계좌가 있다면 별도 개설 없이 기존 계좌로 바로 신청하면 돼요. 한국예탁결제원과 공동으로 청약·배정·상환 시스템을 구축했기 때문에 온라인으로 편하게 처리돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            아직 이 9곳에 계좌가 없다면 9월 전에 미리 열어두는 게 좋아요. <a href="/w/퇴직연금-국채-vs-ETF-비교-안정성-수익률" className="text-[#4A7AB5] underline">국채와 ETF를 비교</a>해서 어떤 상품이 내 상황에 맞는지도 같이 따져보세요.
          </p>
          <p className="text-neutral-600 mb-6 leading-relaxed">
            정부는 하반기에 추가 금융기관을 더 늘릴 계획이에요. 지금은 9곳이지만 앞으로 더 많아질 수 있어요.
          </p>

          <SpokeTable
            id="participating-firms"
            title="퇴직연금 국채 투자 참여 금융기관"
            subtitle="2026년 9월 시행 기준 9곳"
            headers={['구분', '금융기관명', '청약 방식']}
            rows={[
              ['증권사', 'KB증권', '온라인·모바일 청약'],
              ['증권사', 'NH투자증권', '온라인·모바일 청약'],
              ['증권사', '미래에셋증권', '온라인·모바일 청약'],
              ['증권사', '삼성증권', '온라인·모바일 청약'],
              ['증권사', '신영증권', '온라인·모바일 청약'],
              ['증권사', '키움증권', '온라인·모바일 청약'],
              ['증권사', '한국투자증권', '온라인·모바일 청약'],
              ['은행', 'NH농협은행', '모바일뱅킹 청약'],
              ['은행', '신한은행', '모바일뱅킹 청약'],
            ]}
            highlightCol={1}
          />

          <TipBox title="내 퇴직연금 금융기관이 안 보인다면?">
            <p className="text-neutral-600 leading-relaxed">
              현재 퇴직연금이 위 9곳이 아닌 금융기관에 있다면 두 가지 방법이 있어요. 하나는 9곳 중 한 곳에 <strong>IRP를 새로 개설</strong>하는 거예요. 다른 하나는 기존 퇴직연금을 9곳 중 한 곳으로 이전하는 방법이에요.
            </p>
          </TipBox>
        </>
      ),
      pasBridge: {
        href: '/w/퇴직연금-국채-vs-ETF-비교-안정성-수익률',
        question: '실제로 청약은 어떻게 하나요?',
        answer: (
          <>
            기존 DC형·IRP 계좌가 있다면 <strong>청약 기간에 모바일로 만기와 금액만 입력</strong>하면 끝이에요. 300만원까지 우선 배정돼요.
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
            가입 절차가 아주 간단해요. 참여 금융기관에 DC형이나 IRP 계좌가 있다면 전용계좌 개설 없이 <strong>기존 계좌에서 바로 청약</strong>하면 돼요. 별도 서류도 필요 없어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            청약은 매월 발행 기간에 맞춰 모바일 앱이나 웹에서 신청해요. 만기(10년물 또는 20년물)와 금액을 입력하면 끝이에요. 발행 일정은 기획재정부가 매년 초 발표하는 국채 발행계획에서 확인할 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            배정 방식은 기존 전용계좌와 동일해요. 청약 총액이 발행 한도보다 많으면 <strong>300만원까지 우선 배정</strong>하고, 나머지는 비례 배정해요. 소액 투자자에게 유리한 구조예요.
          </p>
          <p className="text-neutral-600 mb-6 leading-relaxed">
            만기까지 보유하면 원금에 가산금리(10년물 1.0%p, 20년물 1.25%p)가 복리로 붙은 금액을 받아요. 다만 중도 환매하면 가산금리가 빠지고 표면금리만 적용되니 주의하세요.
          </p>

          <SpokeChecklist
            items={[
              { text: '참여 금융기관 9곳 중 DC형 또는 IRP 계좌 확인', done: true },
              { text: '해당 금융기관의 투자중개업 인가 여부 확인 (9곳 모두 보유)', done: true },
              { text: '2026년 9월 첫 청약 기간 확인', note: '기획재정부 국채 발행계획 참고' },
              { text: '모바일 앱 또는 웹에서 만기(10년/20년) 선택', note: '3년·5년물은 전용계좌만 가능' },
              { text: '청약 금액 입력 후 신청 (300만원까지 우선 배정)', done: false },
              { text: '청약일 다음 날 배정 결과 확인', done: false },
              { text: '만기까지 보유 시 원금 + 복리 가산금리 수령', note: '중도 환매 시 가산금리 미적용' },
            ]}
          />

          <SpokeWarnBox title="중도 환매하면 가산금리가 빠져요">
            <p className="text-neutral-600 leading-relaxed">
              국채를 만기 전에 되파는 경우 가산금리 1.0~1.25%p가 적용되지 않아요. 표면금리(입찰 시 확정)만 받게 되니, <strong>만기까지 보유할 계획</strong>이 있을 때 투자하는 게 유리해요.
            </p>
          </SpokeWarnBox>
        </>
      ),
      bridgeCTA: {
        href: '/w/개인투자용-국채-수익률-세금-혜택-복리-비과세',
        badge: '수익률',
        title: '국채 투자하면 수익률은 얼마나 될까요?',
        desc: '가산금리 1~1.25%p와 복리 효과까지 계산해 보세요',
        icon: 'calc',
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
        '아니요, DC형과 IRP 계좌로는 <strong>10년물과 20년물만</strong> 청약할 수 있어요. 3년물과 5년물은 전용계좌에서만 가능해요. 단기 투자는 전용계좌, 장기 퇴직연금은 DC형·IRP 이렇게 나눠서 활용하면 좋아요.',
    },
    {
      question: 'IRP 국채 투자 시 세액공제도 받을 수 있나요?',
      answer:
        'IRP 계좌에 추가 납입한 금액에 대해서는 연간 최대 900만원까지 <strong>세액공제 13.2~16.5%</strong>를 받을 수 있어요. 다만 퇴직금으로 입금된 금액은 세액공제 대상이 아니에요. 추가 납입분만 해당돼요.',
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
      desc: '복리 가산금리 1~1.25%p와 분리과세 조건',
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
