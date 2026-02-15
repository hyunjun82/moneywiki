import type { HubData } from './types'
import { HubCompareCards, HubTimeline, HubStepCards, HubTipBox, HubTable } from '@/components/hub/HubBlocks'
import { CalcLink } from '@/components/spoke/SpokeBlocks'

const data: HubData = {
  slug: '퇴직연금-국채-투자-DC형-IRP-연금형',

  meta: {
    title: '퇴직연금 국채 투자 2026 | DC형 IRP 연금형 국채',
    description: '퇴직연금으로도 국채에 직접 투자할 수 있는 길이 열렸다는 거 아시나요? 2026년 9월부터 DC형·IRP 계좌로 국채를 살 수 있는 방법과 참여 금융기관 9곳을 알려드려요.',
    keywords: ['퇴직연금 국채 투자', 'DC형 IRP 국채', '연금형 개인투자용 국채', '퇴직연금 국채 2026'],
    ogTitle: '퇴직연금 국채 투자 2026 | 머니위키',
    ogDescription: 'DC형·IRP로 국채 직접 투자, 참여기관 9곳 전격 공개',
  },

  category: '퇴직연금/투자',

  hero: {
    badge: '2026년 9월 시행 · 금융위원회',
    tags: ['퇴직연금', '국채 투자'],
    h1: (<>2026 <em>퇴직연금 국채 투자</em> 완전 가이드</>),
    subtitle: 'DC형·IRP 계좌로 개인투자용 국채에 직접 투자하는 방법',
  },

  toc: [
    { id: 'sec-intro', text: '퇴직연금 국채 투자 제도' },
    { id: 'sec-how', text: 'DC형 IRP 국채 투자 방법' },
    { id: 'sec-institutions', text: '참여 금융기관' },
    { id: 'sec-schedule', text: '2026년 시행 일정' },
  ],

  sections: [
    {
      id: 'sec-intro',
      tag: '01 제도',
      heading: '퇴직연금 국채 투자는 어떤 제도인가요?',
      subtitle: '일반 국민이 퇴직연금으로 국채에 직접 투자할 수 있는 첫 번째 제도',
      content: (
        <>
          <p>2026년 9월부터 개인이 보유한 <strong>DC형 퇴직연금</strong>과 <strong>개인형 IRP</strong> 계좌로 <a href="/w/연금형-개인투자용-국채-신청-방법-10년물-20년물">개인투자용 국채 10년물·20년물</a>에 직접 투자할 수 있어요. 퇴직연금으로 국채를 살 수 있게 되는 건 이번이 처음이에요.</p>

          <p>기존에는 퇴직연금 계좌 내에서 국공채 펀드나 ETF를 통해서만 간접 투자가 가능했는데, 앞으로는 정부가 발행하는 개인투자용 국채를 <strong>직접 매수</strong>할 수 있어요. <a href="/w/개인투자용-국채-수익률-세금-혜택-복리-비과세">국채는 만기까지 보유하면 원금과 이자가 보장</a>되기 때문에 노후 자산을 안정적으로 굴리고 싶은 분들에게 적합해요.</p>

          <HubCompareCards
            cards={[
              {
                title: '기존 퇴직연금 투자',
                subtitle: '간접 투자 방식',
                items: [
                  '국공채 펀드 가입',
                  '국채 ETF 매수',
                  '채권형 TDF 가입',
                  '운용보수 발생',
                ],
              },
              {
                title: '2026년 9월 이후',
                subtitle: '직접 투자 가능',
                items: [
                  '개인투자용 국채 10년물 직접 매수',
                  '개인투자용 국채 20년물 직접 매수',
                  '만기까지 원금+이자 보장',
                  '별도 운용보수 없음',
                ],
                recommended: true,
                recLabel: '신규 가능',
              },
            ]}
          />

          <HubTipBox title="국채 투자가 좋은 이유">
            <p>개인투자용 국채는 표면금리에 <strong>가산금리 1.0~1.25%p</strong>가 복리로 붙어요. 게다가 만기까지 보유하면 원금 손실 위험이 전혀 없기 때문에 변동성이 큰 주식·펀드보다 안정적이에요.</p>
          </HubTipBox>
        </>
      ),
      sectionSpoke: [
        { icon: '📋', title: '연금형 개인투자용 국채 신청 방법', desc: '10년물 vs 20년물 비교', href: '/w/연금형-개인투자용-국채-신청-방법-10년물-20년물' },
        { icon: '💰', title: '개인투자용 국채 수익률 세금 혜택', desc: '복리 가산금리, 비과세 조건', href: '/w/개인투자용-국채-수익률-세금-혜택-복리-비과세' },
      ],
    },

    {
      id: 'sec-how',
      tag: '02 방법',
      heading: '퇴직연금 DC형 IRP로 국채 투자 어떻게 하나요?',
      subtitle: 'DC형 또는 IRP 계좌만 있으면 간단하게 신청 가능',
      content: (
        <>
          <p>퇴직연금으로 국채를 사려면 <strong>DC형 퇴직연금</strong> 또는 <strong>개인형 IRP</strong> 계좌가 있어야 해요. <a href="/w/퇴직연금-DC형-IRP-국채-투자-조건-금융기관">기존에 이 계좌를 보유하고 있다면</a> 추가 가입 절차 없이 바로 신청할 수 있어요.</p>

          <HubStepCards
            steps={[
              {
                title: 'DC형 또는 IRP 계좌 확인',
                desc: '본인이 가입한 퇴직연금 유형을 확인하세요. DB형은 이번 제도에 해당하지 않아요.',
                tip: 'DB형은 회사가 운용하므로 개인이 투자 선택을 못 해요.',
              },
              {
                title: '참여 금융기관 선택',
                desc: '증권사 7곳, 은행 2곳 총 9개 기관 중 한 곳에 퇴직연금 계좌가 있어야 해요.',
                tip: '아래 참여기관 목록 참고',
              },
              {
                title: '국채 청약 신청',
                desc: '금융기관 앱이나 웹사이트에서 개인투자용 국채 10년물·20년물 중 선택해서 청약하세요.',
                tip: '한국예탁결제원 시스템을 통해 자동 처리됨',
              },
              {
                title: '배정 및 보유',
                desc: '청약 후 배정된 국채는 퇴직연금 계좌에 편입되고, 만기까지 이자가 복리로 쌓여요.',
              },
            ]}
          />

          <HubTable
            id="dc-irp-diff"
            title="DC형 vs IRP 국채 투자 조건 비교"
            headers={['구분', 'DC형 퇴직연금', '개인형 IRP']}
            rows={[
              ['가입 대상', '직장에서 가입', '개인이 직접 가입'],
              ['국채 투자 가능 여부', '가능 (2026.9~)', '가능 (2026.9~)'],
              ['세액공제', '불가', '연 900만원 한도 내 16.5% (5,500만원 이하)'],
              ['중도 인출', '불가 (퇴직 시)', '일부 가능 (사유 제한)'],
            ]}
          />
        </>
      ),
      sectionSpoke: [
        { icon: '✅', title: '퇴직연금 DC형 IRP 국채 투자 조건', desc: '참여 금융기관 9곳 전체 목록', href: '/w/퇴직연금-DC형-IRP-국채-투자-조건-금융기관' },
      ],
      bridgeCTA: {
        href: '#sec-institutions',
        badge: '참여기관',
        title: '어느 금융기관에서 신청할 수 있나요?',
        desc: '증권사 7곳, 은행 2곳 전체 목록',
      },
    },

    {
      id: 'sec-institutions',
      tag: '03 기관',
      heading: '연금형 개인투자용 국채 참여 금융기관은 어디인가요?',
      subtitle: '증권사 7곳 + 은행 2곳 총 9개 기관',
      content: (
        <>
          <p>2026년 9월 제도 시행과 동시에 참여하는 금융기관은 <strong>총 9곳</strong>이에요. 증권사 7곳과 은행 2곳이 한국예탁결제원과 함께 청약·배정·상환 거래 시스템을 공동 구축했어요.</p>

          <HubTable
            id="participating-institutions"
            title="참여 금융기관 전체 목록 (2026년 9월 기준)"
            headers={['유형', '기관명', '비고']}
            rows={[
              ['증권사', 'KB증권', '2026.9 첫 참여'],
              ['증권사', 'NH투자증권', '2026.9 첫 참여'],
              ['증권사', '미래에셋증권', '2026.9 첫 참여'],
              ['증권사', '삼성증권', '2026.9 첫 참여'],
              ['증권사', '신영증권', '2026.9 첫 참여'],
              ['증권사', '키움증권', '2026.9 첫 참여'],
              ['증권사', '한국투자증권', '2026.9 첫 참여'],
              ['은행', 'NH농협은행', '2026.9 첫 참여'],
              ['은행', '신한은행', '2026.9 첫 참여'],
            ]}
            highlightCol={0}
          />

          <HubTipBox title="참여 기관이 더 늘어날 예정이에요">
            <p>정부는 앞으로 더 많은 금융기관이 참여할 수 있도록 유도할 계획이에요. 제도가 안정화되면 다른 증권사와 은행도 추가될 가능성이 높아요.</p>
          </HubTipBox>
        </>
      ),
      sectionSpoke: [
        { icon: '🏦', title: '퇴직연금 DC형 IRP 국채 투자 조건', desc: '금융기관별 가입 조건', href: '/w/퇴직연금-DC형-IRP-국채-투자-조건-금융기관' },
      ],
    },

    {
      id: 'sec-schedule',
      tag: '04 일정',
      heading: '퇴직연금 국채 투자 2026년 시행 일정은 어떻게 되나요?',
      subtitle: '2026년 9월부터 정식 시행',
      content: (
        <>
          <p>이번 제도는 <strong>2026년 9월</strong>부터 본격 시행돼요. 그 전까지 한국예탁결제원과 참여 금융기관들이 청약·배정·상환 시스템을 구축하고 테스트하는 기간을 거쳐요.</p>

          <HubTimeline
            events={[
              {
                month: '2026.02',
                title: '제도 발표',
                desc: '금융위원회가 퇴직연금 국채 투자 제도 공식 발표',
                status: 'normal',
                tag: '발표',
              },
              {
                month: '2026.03~08',
                title: '시스템 구축',
                desc: '한국예탁결제원 + 참여기관 청약·배정 시스템 공동 개발',
                status: 'current',
                tag: '준비',
              },
              {
                month: '2026.09',
                title: '정식 시행',
                desc: 'DC형·IRP 계좌로 개인투자용 국채 10년물·20년물 청약 시작',
                status: 'warning',
                tag: '시행',
              },
              {
                month: '2026.10 이후',
                title: '참여 확대',
                desc: '더 많은 금융기관 참여 유도, 접근성 확대',
                status: 'warning',
                tag: '확대',
              },
            ]}
          />

          <HubTipBox title="9월 첫 청약에 참여하려면?">
            <p>9월 시행과 동시에 청약하려면 미리 <strong>DC형 또는 IRP 계좌</strong>를 개설해 두고, 참여 금융기관 9곳 중 한 곳에 계좌가 있어야 해요. 아직 퇴직연금 계좌가 없다면 지금 바로 개설하는 게 좋아요.</p>
          </HubTipBox>
        </>
      ),
      sectionSpoke: [
        { icon: '⚖️', title: '퇴직연금 국채 vs ETF 비교', desc: '안정성·수익률 어느 쪽이 유리한지', href: '/w/퇴직연금-국채-vs-ETF-비교-안정성-수익률' },
      ],
    },
  ],

  faq: [
    {
      question: '퇴직연금 국채 투자는 DB형도 가능한가요?',
      answer: 'DB형은 회사가 자금을 운용하기 때문에 개인이 투자 상품을 직접 선택할 수 없어요. DC형이나 개인형 IRP 계좌만 국채 직접 투자가 가능해요.',
    },
    {
      question: '퇴직연금으로 산 국채는 언제 돈을 받나요?',
      answer: '개인투자용 국채 10년물은 10년 후, 20년물은 20년 후 만기 시 원금과 이자를 한번에 받아요. 중간에 현금이 필요하면 중도 매도도 가능하지만, 시장 금리에 따라 손실이 발생할 수 있어요.',
    },
    {
      question: '퇴직연금 국채와 일반 국채는 똑같은 건가요?',
      answer: '개인투자용 국채는 일반인이 직접 살 수 있는 국채예요. 퇴직연금 계좌로 사든, 일반 증권계좌로 사든 상품 자체는 동일하고, 시중금리보다 연 1~2%p 높은 가산금리가 붙어요.',
    },
    {
      question: '퇴직연금 국채 투자는 세금이 어떻게 되나요?',
      answer: 'IRP 계좌로 투자하면 연 900만원 한도 내에서 16.5% 세액공제를 받을 수 있어요. 국채 이자 소득은 만기 시 일반 이자소득세(15.4%)가 부과되지만, 비과세 조건을 충족하면 세금 없이 받을 수 있어요.',
    },
  ],

  spokeGroups: [
    {
      title: '신청 방법 및 조건',
      spokes: [
        {
          slug: '연금형-개인투자용-국채-신청-방법-10년물-20년물',
          title: '연금형 개인투자용 국채 신청 방법',
          desc: '10년물 vs 20년물 차이, 청약 절차',
          badge: '신청',
        },
        {
          slug: '퇴직연금-DC형-IRP-국채-투자-조건-금융기관',
          title: '퇴직연금 DC형 IRP 국채 투자 조건',
          desc: '참여 금융기관 9곳, 가입 요건',
          badge: '조건',
        },
      ],
    },
    {
      title: '수익률 및 세금',
      spokes: [
        {
          slug: '개인투자용-국채-수익률-세금-혜택-복리-비과세',
          title: '개인투자용 국채 수익률 세금 혜택',
          desc: '복리 가산금리, 비과세 조건',
          badge: '수익',
        },
        {
          slug: '퇴직연금-국채-vs-ETF-비교-안정성-수익률',
          title: '퇴직연금 국채 vs ETF 비교',
          desc: '안정성·수익률 어느 쪽이 유리한지',
          badge: '비교',
        },
      ],
    },
  ],

  sources: [
    {
      name: '퇴직연금 계좌로 개인투자용 국채 직접 투자 가능',
      url: 'https://www.korea.kr/news/policyNewsView.do?newsId=148959500',
      org: '대한민국 정책브리핑',
    },
    {
      name: '퇴직연금제도 운용 가이드라인',
      url: 'https://www.fsc.go.kr',
      org: '금융위원회',
    },
  ],

  summary: [
    <>2026년 9월부터 <strong>DC형·IRP 계좌</strong>로 개인투자용 국채 10년물·20년물 직접 투자 가능</>,
    <>참여 금융기관 총 <strong>9곳</strong> (증권사 7곳, 은행 2곳), 한국예탁결제원 시스템 구축</>,
    <>만기까지 원금+이자 보장, <strong>가산금리 1.0~1.25%p</strong> 복리 적용</>,
  ],

  source: {
    name: '금융위원회 정책 발표',
    date: '2026.02',
  },

  chips: [
    { icon: '📋', label: '신청 방법', value: '10년물·20년물', href: '/w/연금형-개인투자용-국채-신청-방법-10년물-20년물' },
    { icon: '✅', label: 'DC형 IRP 조건', value: '참여기관 9곳', href: '/w/퇴직연금-DC형-IRP-국채-투자-조건-금융기관' },
    { icon: '💰', label: '수익률 세금', value: '복리 비과세', href: '/w/개인투자용-국채-수익률-세금-혜택-복리-비과세' },
    { icon: '⚖️', label: '국채 vs ETF', value: '안정성 비교', href: '/w/퇴직연금-국채-vs-ETF-비교-안정성-수익률' },
  ],

  heroCTA: {
    href: '#sec-intro',
    question: '퇴직연금으로 국채를 직접 살 수 있나요?',
    answer: <>2026년 9월부터 DC형·IRP 계좌로 개인투자용 국채 10년물·20년물을 <strong>직접 매수</strong>할 수 있어요.</>,
    buttonText: '제도 알아보기 →',
  },

  sticky: {
    label: '2026.9 시행',
    value: 'DC형·IRP 국채 투자',
    ctaText: '참여기관 확인 →',
    ctaTarget: '#sec-institutions',
  },

  prevNext: {
    prev: { title: 'IRP 계좌 세액공제 한도', href: '/w/IRP-계좌-세액공제-한도-900만원-16-5' },
    next: { title: '연금형 개인투자용 국채 신청 방법', href: '/w/연금형-개인투자용-국채-신청-방법-10년물-20년물' },
  },
}

export default data
