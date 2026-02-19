import type { SpokeData } from '@/data/spoke/types'
import {
  SpokeTable, TipBox, DetailBox, SpokeLinks,
  SpokeStepCards, SpokeCompareCards, SpokeWarnBox,
} from '@/components/spoke/SpokeBlocks'
import 퇴직연금국채Checker from '@/components/checkers/퇴직연금국채Checker'

const data: SpokeData = {
  slug: '퇴직연금-DC형-IRP-국채-투자-조건-금융기관',

  meta: {
    title: '퇴직연금 DC형 IRP 국채 투자 조건 | 참여 금융기관 목록',
    description: 'DC형이나 IRP 계좌로 국채 투자를 하고 싶은데 가입 조건이 뭔지 헷갈리시죠? 2026년 9월부터 참여 금융기관 9곳에서 10년물·20년물 국채를 전용계좌 없이 기존 퇴직연금으로 바로 청약할 수 있는 조건을 알려드려요.',
    keywords: ['퇴직연금 DC형 국채 조건', 'IRP 국채 투자 조건', '국채 참여 금융기관', '퇴직연금 국채 가입'],
    ogTitle: '퇴직연금 DC형 IRP 국채 투자 조건 | 머니위키',
    ogDescription: 'DC형·IRP 국채 투자 조건과 참여 금융기관 9곳을 한눈에 정리했어요.',
  },

  hub: {
    url: '/w/퇴직연금-국채-투자-DC형-IRP-연금형',
    name: '퇴직연금 국채 투자 | DC형 IRP 계좌 연금형 국채',
  },

  breadcrumb: ['퇴직연금', '국채 투자', 'DC형 IRP 국채 투자 조건'],

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
    buttonText: '금융기관 목록 →',
    scrollTo: '#sec-where',
  },

  hero: {
    badge: '2026년 9월 시행',
    h1: (
      <>
        퇴직연금 <span className="text-[#1E3A5F]">DC형 IRP</span> 국채 투자 조건 | 참여 금융기관 목록
      </>
    ),
    intro: (
      <p className="text-base text-neutral-500 leading-relaxed">
        퇴직연금이 쌓여가는데 주식은 무섭고 예금은 아쉬우셨죠. 2026년 9월부터 DC형이나 IRP 계좌로 국채를 직접 살 수 있어요. 국가가 보증하는 안정성에 만기 보유 시 연 5~7%대 수익률까지 가능하거든요. 참여 금융기관 9곳과 투자 조건을 차례대로 정리해 볼게요.
      </p>
    ),
    hubCTA: { badge: '전체 가이드', desc: '퇴직연금 국채 투자 제도부터 수익률까지 한눈에 볼 수 있어요' },
  },

  toc: [
    { id: 'checker', label: '30초 투자 자격 체크' },
    { id: 'sec-what', label: '퇴직연금 DC형으로 국채 투자 조건은 무엇인가요?' },
    { id: 'sec-irp', label: 'IRP 국채 투자 조건과 전용계좌 차이는 무엇인가요?' },
    { id: 'sec-where', label: '국채 참여 금융기관은 어디인가요?' },
      { id: 'tbl-firms', label: '참여 금융기관 9곳 목록', sub: true },
    { id: 'sec-how', label: '퇴직연금 국채 가입 절차는 어떻게 되나요?' },
    { id: 'sec-faq', label: '자주 묻는 질문' },
  ],

  sections: [
    // ═══ STEP 01: CHECKER — 반드시 첫 번째 ═══
    {
      id: 'checker',
      number: 'STEP 01',
      heading: '퇴직연금 국채 투자 자격 확인하기',
      subtitle: '3가지만 선택하면 바로 알 수 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            DC형이나 IRP 계좌가 있으면 국채 투자가 가능한데, 금융기관 조건도 충족해야 해요. 아래에서 내 상황을 선택해 보세요.
          </p>
          <퇴직연금국채Checker />
        </>
      ),
      pasBridge: {
        href: '/w/개인투자용-국채-수익률-세금-혜택-복리-비과세',
        question: '퇴직연금 국채 수익률이 최대 7%대라는 거 아셨나요?',
        answer: (
          <>
            만기까지 보유하면 표면금리에 가산금리 1.0~1.25%p가 <strong>복리로</strong> 붙어요. 20년물 기준 실질 수익률이 연 5~7%대까지 올라가요.
          </>
        ),
        buttonText: '국채 수익률 계산해 보기 →',
      },
    },

    // ═══ SECTION 02: DC형 조건 ═══
    {
      id: 'sec-what',
      number: 'SECTION 02',
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
            전용계좌 개설 없이 기존 DC형 계좌에서 바로 청약하는 거라 절차가 간단해요. 1인 1계좌 제한도 없어서 전용계좌와 동시에 쓸 수 있어요.
          </p>

          <DetailBox
            title="DC형 계좌 투자 가능 조건"
            items={[
              { heading: '계좌 유형', desc: 'DC형(확정기여형) 퇴직연금 계좌 보유' },
              { heading: '투자 상품', desc: '10년물·20년물 국채만 가능 (3·5년물은 전용계좌)' },
              { heading: '금융기관', desc: '투자중개업 인가 보유 9곳 중 1곳' },
              { heading: '시행 시기', desc: '2026년 9월부터 청약 개시' },
            ]}
          />

          <TipBox title="DB형은 안 되나요?">
            <p className="text-neutral-600 leading-relaxed">
              DB형(확정급여형)은 회사가 운용 책임을 지는 방식이라 개인이 직접 상품을 고르지 못해요. DC형이나 IRP만 가능해요. 만약 DB형만 있다면 <strong>IRP 계좌를 추가로 개설</strong>하면 국채 투자가 가능해요.
            </p>
          </TipBox>

          <SpokeLinks
            title="관련 글 더보기"
            items={[
              { num: '01', heading: '연금형 국채 신청 방법', desc: '10년물·20년물 청약 절차와 배정 방식', href: '/w/연금형-개인투자용-국채-신청-방법-10년물-20년물' },
              { num: '02', heading: '개인투자용 국채 수익률', desc: '복리 가산금리와 분리과세 조건 정리', href: '/w/개인투자용-국채-수익률-세금-혜택-복리-비과세' },
            ]}
          />
        </>
      ),
      pasBridge: {
        href: '/w/연금형-개인투자용-국채-신청-방법-10년물-20년물',
        question: 'IRP 계좌로도 국채를 살 수 있을까요?',
        answer: (
          <>
            네, DC형과 동일하게 가능해요. IRP는 <strong>개인형 퇴직연금</strong>이라서 회사를 옮기거나 자영업자도 활용할 수 있어요.
          </>
        ),
        buttonText: 'IRP 투자 조건 비교 →',
      },
    },

    // ═══ SECTION 03: IRP 조건 + 전용계좌 차이 ═══
    {
      id: 'sec-irp',
      number: 'SECTION 03',
      heading: 'IRP 국채 투자 조건과 전용계좌 차이는 무엇인가요?',
      subtitle: 'IRP면 즉시 가능, 전용계좌와 병행도 OK',
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

          <SpokeCompareCards
            cards={[
              {
                title: 'IRP 계좌',
                subtitle: '개인형 퇴직연금',
                items: [
                  '10년물·20년물 투자 가능',
                  '세액공제 혜택 있음 (최대 900만원)',
                  '여러 금융기관 동시 개설 가능',
                  '퇴직금·추가납입 모두 활용',
                ],
              },
              {
                title: '전용계좌',
                subtitle: '개인투자용 국채 전용',
                items: [
                  '3·5·10·20년물 전부 투자 가능',
                  '분리과세 (14% 단일세율)',
                  '1인 1계좌 제한',
                  '추가납입 전용 (퇴직금 불가)',
                ],
              },
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
        href: '/w/퇴직연금-국채-vs-ETF-비교-안정성-수익률',
        question: '내 증권사가 9곳에 포함 안 되면 어쩌나 걱정되시죠?',
        answer: (
          <>
            KB증권, 미래에셋증권, 삼성증권 등 <strong>주요 증권사 7곳</strong>이 모두 포함돼 있어요. 은행은 NH농협과 신한은행이에요.
          </>
        ),
        buttonText: '금융기관 9곳 전체 목록 →',
      },
    },

    // ═══ SECTION 04: 참여 금융기관 ═══
    {
      id: 'sec-where',
      number: 'SECTION 04',
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
            id="tbl-firms"
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

          <SpokeLinks
            title="함께 읽으면 좋은 글"
            items={[
              { num: '01', heading: '퇴직연금 국채 vs ETF 비교', desc: '안정성과 수익률, 어느 쪽이 유리한지 분석', href: '/w/퇴직연금-국채-vs-ETF-비교-안정성-수익률' },
            ]}
          />
        </>
      ),
      pasBridge: {
        href: '/w/퇴직연금-국채-투자-DC형-IRP-연금형',
        question: '기존 계좌에서 별도 서류 없이 바로 된다는 거 아시나요?',
        answer: (
          <>
            DC형·IRP 계좌가 있다면 <strong>청약 기간에 모바일로 만기와 금액만 입력</strong>하면 끝이에요. 300만원까지 우선 배정돼요.
          </>
        ),
        buttonText: '청약 절차 7단계 보기 →',
      },
    },

    // ═══ SECTION 05: 가입 절차 — bridgeCTA 사용 (마지막 본문) ═══
    {
      id: 'sec-how',
      number: 'SECTION 05',
      heading: '퇴직연금 국채 가입 절차는 어떻게 되나요?',
      subtitle: '기존 계좌로 바로 청약',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            가입 절차가 아주 간단해요. 참여 금융기관에 DC형이나 IRP 계좌가 있다면 전용계좌 개설 없이 <strong>기존 계좌에서 바로 청약</strong>하면 돼요. 별도 서류도 필요 없어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            청약은 매월 발행 기간에 맞춰 모바일 앱이나 웹에서 신청해요. 만기(10년물 또는 20년물)와 금액을 입력하면 끝이에요. 발행 일정은 기획재정부가 매년 초 발표하는 국채 발행계획에서 볼 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            배정 방식은 기존 전용계좌와 동일해요. 청약 총액이 발행 한도보다 많으면 <strong>300만원까지 우선 배정</strong>하고, 나머지는 비례 배정해요. 소액 투자자에게 유리한 구조예요.
          </p>
          <p className="text-neutral-600 mb-6 leading-relaxed">
            만기까지 보유하면 원금에 가산금리(10년물 1.0%p, 20년물 1.25%p)가 복리로 붙은 금액을 받아요. 중도 환매하면 가산금리가 빠지고 표면금리만 적용되니 주의하세요.
          </p>

          <SpokeStepCards
            steps={[
              { title: '계좌 확인', desc: '참여 금융기관 9곳 중 DC형 또는 IRP 계좌 보유 여부 확인' },
              { title: '청약 기간 확인', desc: '기획재정부 국채 발행계획에서 매월 청약일 확인' },
              { title: '만기 선택', desc: '10년물 또는 20년물 중 투자 목표에 맞게 선택' },
              { title: '청약 금액 입력', desc: '모바일 앱이나 웹에서 금액 입력 후 청약 신청' },
              { title: '배정 결과 확인', desc: '청약일 다음 날 배정 결과 확인 (300만원 우선 배정)' },
              { title: '만기 보유', desc: '만기까지 보유 시 원금 + 가산금리(복리) 수령' },
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
        title: '국채 투자하면 실제 수익은 얼마일까요?',
        desc: '가산금리 1~1.25%p 복리 효과까지 계산해 볼 수 있어요',
        icon: 'calc',
      },
    },

    // ═══ FAQ ═══
    {
      id: 'sec-faq',
      number: '06',
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
    {
      question: 'DB형 퇴직연금만 있으면 국채 투자가 불가능한가요?',
      answer:
        'DB형 계좌로는 직접 투자가 안 돼요. 하지만 <strong>IRP 계좌를 따로 개설</strong>하면 국채 투자가 가능해요. IRP는 직장인, 자영업자 모두 개설할 수 있어요.',
    },
    {
      question: '전용계좌와 퇴직연금 계좌를 동시에 사용할 수 있나요?',
      answer:
        '네, 동시 사용 가능해요. 전용계좌는 1인 1계좌 제한이 있지만, DC형이나 IRP 계좌와는 별개예요. 전용계좌로 3년물, IRP로 20년물 이런 식으로 <strong>분산 투자</strong>할 수 있어요.',
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
