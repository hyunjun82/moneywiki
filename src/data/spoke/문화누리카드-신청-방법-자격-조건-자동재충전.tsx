import type { SpokeData } from '@/data/spoke/types'
import { Steps, Chips, TipBox, SpokeChecklist, SpokeTimeline, SpokeTable, SpokeWarnBox, RateCards } from '@/components/spoke/SpokeBlocks'
import 문화누리카드Checker from '@/components/checkers/문화누리카드Checker'

const data: SpokeData = {
  slug: '문화누리카드-신청-방법-자격-조건-자동재충전',

  meta: {
    title: '문화누리카드 신청 방법 자격 조건 | 자동재충전 발급 기간 2026',
    description: '문화누리카드가 전년도 3만원 이상 쓰면 자동재충전된다는 거 아시나요? 기초생활수급자 차상위계층 온라인 오프라인 신청 방법부터 발급 기간 2월~11월, 자격 조건까지 한 번에 알려드려요.',
    keywords: ['문화누리카드 신청 방법 온라인 오프라인', '문화누리카드 자격 조건 기초생활수급자 차상위', '문화누리카드 자동재충전 조건 3만원 이상', '문화누리카드 발급 기간 2월 11월 카드 수령'],
    ogTitle: '문화누리카드 신청 방법 자격 조건 자동재충전 | 머니위키',
    ogDescription: '문화누리카드 자격 조건과 신청 방법을 확인해 보세요.',
  },

  hub: {
    url: '/w/2026-문화누리카드-신청-대상-사용처-금액',
    name: '2026 문화누리카드 신청 대상 사용처 금액',
  },

  breadcrumb: ['복지', '문화누리카드', '신청 방법 자격 조건'],

  summary3: [
    <>대상: 6세 이상 기초생활수급자 + 차상위계층, 연 <strong>15만원</strong> (청소년/준고령층 16만원)</>,
    <>신청: 누리집, 앱, ARS 1544-3412, 주민센터 (2월 2일~11월 30일)</>,
    <>자동재충전: 전년도 <strong>3만원 이상</strong> 사용 + 수급자격 유지 시 별도 신청 불필요</>,
  ],

  sourceBar: {
    badge: '출처',
    name: '대한민국 정책브리핑 - 1인당 최대 16만 원 카드 한 장으로 영화 공연 여행까지',
    date: '2026.02',
  },

  prevNext: {
    next: { title: '문화누리카드 사용처 잔액 확인 가맹점 소멸', href: '/w/문화누리카드-사용처-잔액-확인-가맹점-소멸' },
  },

  stickyBar: {
    topLabel: '지원 금액',
    value: '연 15~16만원',
    buttonText: '내 자격 확인 →',
    scrollTo: '#checker',
  },

  hero: {
    badge: '2026년 최신',
    h1: (<>문화누리카드 <span className="text-[#1E3A5F]">신청 방법</span> 자격 조건 자동재충전</>),
    intro: (
      <p className="text-base text-neutral-500 leading-relaxed">
        영화 한 편 보고 싶은데 문화비가 부담스러운 분들 많으시죠.
        문화누리카드는 기초생활수급자와 차상위계층에게 연 15만원을 지원하는 카드예요.
        청소년과 60~64세 준고령층은 1만원이 추가돼서 최대 16만원까지 받을 수 있어요.
        아래에서 내가 받을 수 있는지 바로 확인해 보세요.
      </p>
    ),
    hubCTA: { badge: '전체 가이드', desc: '문화누리카드 대상, 금액, 사용처 한눈에 보기' },
    quickAnswer: {
      title: '문화누리카드 신청 방법',
      body: '문화누리카드는 6세 이상 기초생활수급자와 차상위계층이 www.mnuri.kr, 모바일 앱, ARS 1544-3412, 주민센터에서 2월 2일~11월 30일 사이에 신청할 수 있어요. 전년도 3만원 이상 사용했다면 자동재충전돼요.',
      hook: '문화누리카드 신청 자격과 방법이 궁금하다면',
    },
  },

  toc: [
    { id: 'checker', label: '내 자격 확인하기' },
    { id: 'sec-eligibility', label: '문화누리카드 자격 조건은?' },
    { id: 'sec-apply', label: '문화누리카드 신청 방법은?' },
    { id: 'sec-auto-recharge', label: '자동재충전 조건은?' },
    { id: 'sec-period', label: '발급 기간과 카드 수령은?' },
    { id: 'sec-faq', label: '자주 묻는 질문' },
  ],

  sections: [
    {
      id: 'checker',
      number: 'CHECK',
      heading: '문화누리카드 받을 수 있을까?',
      subtitle: '나이, 수급 유형, 기존 카드 여부만 선택하면 돼요',
      content: (<문화누리카드Checker />),
    },

    {
      id: 'sec-eligibility',
      number: 'SECTION 02',
      heading: '문화누리카드 자격 조건 기초생활수급자 차상위 누가 받나요?',
      subtitle: '6세 이상이면서 수급자 또는 차상위계층이면 돼요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            문화누리카드는 <strong>6세 이상</strong>(2020년 12월 31일 이전 출생)이면서 기초생활수급자 또는 차상위계층이면 신청할 수 있어요.
            생계급여, 의료급여, 주거급여, 교육급여 수급자 모두 해당되고, 차상위 장애인이나 한부모가족, 자활근로자도 포함돼요.
            <a href="/w/기초생활수급자-1인가구-생계급여-조건-소득인정액" className="text-[#4A7AB5] underline">기초생활수급자 조건</a>을 갖추고 있다면 별도 소득 심사 없이 바로 신청 가능해요.
            다만 5세 이하 영유아는 대상에서 제외되니 이 점만 주의하세요.
          </p>
          <RateCards cards={[
            { value: '15만원', label: '기본 지원금', lines: ['6세 이상 수급자/차상위', '연 1회 충전'], highlightColor: 'navy' },
            { value: '+1만원', label: '청소년 추가', lines: ['13~18세 대상', '합계 16만원'], highlight: '청소년' },
            { value: '+1만원', label: '준고령층 추가', lines: ['60~64세 대상', '합계 16만원'], highlight: '준고령' },
          ]} />
          <SpokeTable
            id="eligibility-table"
            title="대상별 자격 요건"
            subtitle="2026년 기준"
            headers={['구분', '자격 요건', '지원 금액']}
            rows={[
              ['생계/의료/주거/교육급여 수급자', '6세 이상 (2020.12.31 이전 출생)', '연 15만원'],
              ['차상위계층 (장애인/한부모 등)', '6세 이상 + 차상위 확인서 발급 대상', '연 15만원'],
              ['청소년 (13~18세)', '위 대상 중 해당 연령', '연 16만원'],
              ['준고령층 (60~64세)', '위 대상 중 해당 연령', '연 16만원'],
            ]}
          />
        </>
      ),
      pasBridge: {
        href: '/w/문화누리카드-사용처-잔액-확인-가맹점-소멸',
        question: '자격이 된다면, 어디서 사용할 수 있을까요?',
        answer: <>영화관, 공연장, 박물관부터 국내 여행 숙박까지 <strong>문화, 관광, 체육</strong> 가맹점에서 사용할 수 있어요.</>,
        buttonText: '사용처 확인하기 →',
      },
    },

    {
      id: 'sec-apply',
      number: 'SECTION 03',
      heading: '문화누리카드 신청 방법 온라인 오프라인 어떻게 하나요?',
      subtitle: '누리집, 앱, 전화, 주민센터 4가지 방법이 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            문화누리카드 신청은 크게 4가지 방법이 있어요. 가장 빠른 건 누리집(www.mnuri.kr)에서 직접 신청하는 거예요.
            본인 인증만 하면 5분 안에 끝나요. 스마트폰에 익숙하다면 문화누리카드 앱에서도 동일하게 신청할 수 있어요.
            전화가 편하시면 ARS 1544-3412로 간단히 접수하고, 인터넷이 어려우시면 가까운 주민센터에 신분증 하나만 들고 방문하면 돼요.
            어떤 방법을 선택하든 <a href="/w/2026-문화누리카드-신청-대상-사용처-금액" className="text-[#4A7AB5] underline">문화누리카드</a> 신청 결과는 동일해요.
          </p>
          <Steps items={[
            { title: '자격 확인', desc: '기초생활수급자 또는 차상위계층 자격 유지 중인지 확인해요. 수급자격이 올해 새로 생겼다면 신규 신청이 필요해요.' },
            { title: '신청 접수', desc: '누리집(www.mnuri.kr), 앱, ARS(1544-3412), 주민센터 중 편한 방법을 선택해요. 본인 확인용 신분증이 필요해요.' },
            { title: '카드 수령', desc: '신청 후 약 2~3주 이내 등기우편으로 카드가 배달돼요. 주민센터 신청 시 현장 수령도 가능해요.' },
            { title: '충전 확인 후 사용', desc: '카드를 받으면 잔액을 확인하고 문화, 관광, 체육 가맹점에서 사용하면 돼요.' },
          ]} />
          <SpokeChecklist items={[
            { text: '신분증 (주민등록증, 운전면허증 등)', done: false, note: '본인 확인용 필수' },
            { text: '휴대전화 (온라인 신청 시 본인 인증)', done: false, note: '누리집/앱 신청 시' },
            { text: '수급자격 확인 (별도 서류 불필요)', done: false, note: '자격은 시스템 자동 확인' },
          ]} />
        </>
      ),
      pasBridge: {
        href: '/w/문화누리카드-사용처-잔액-확인-가맹점-소멸',
        question: '카드를 받은 뒤 잔액은 어떻게 확인하나요?',
        answer: <>앱이나 누리집에서 <strong>실시간 잔액 조회</strong>가 가능하고, ARS로도 확인할 수 있어요.</>,
        buttonText: '잔액 확인 방법 보기 →',
      },
    },

    {
      id: 'sec-auto-recharge',
      number: 'SECTION 04',
      heading: '문화누리카드 자동재충전 조건 3만원 이상 사용하면 되나요?',
      subtitle: '전년도 사용액과 수급자격 유지 두 가지가 핵심이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            매년 다시 신청하는 게 번거로울 수 있는데, 자동재충전 제도가 있어서 편해요.
            전년도에 문화누리카드를 <strong>3만원 이상</strong> 사용했고, 올해도 수급자격이 유지되고 있다면 별도 신청 없이 자동으로 충전돼요.
            충전 시기가 되면 안내 문자가 발송되니까 카드만 그대로 쓰면 돼요.
            다만 작년에 3만원 미만으로 사용했거나 수급자격이 변동됐다면 자동재충전 대상에서 빠지게 돼요. 이 경우엔 새로 신청해야 해요.
          </p>
          <Chips items={[
            { icon: '💳', label: '전년도 사용액', value: '3만원 이상' },
            { icon: '📌', label: '수급자격', value: '유지 중' },
            { icon: '📱', label: '안내 방법', value: '문자 발송' },
            { icon: '🔄', label: '충전 방식', value: '자동 충전' },
          ]} />
          <SpokeWarnBox title="자동재충전 안 되는 경우">
            <ul className="list-disc pl-5 space-y-1 text-sm text-neutral-600">
              <li>전년도 사용 금액이 3만원 미만인 경우</li>
              <li>수급자격이 변동되거나 상실된 경우</li>
              <li>카드를 분실하고 재발급받지 않은 경우</li>
              <li>본인이 자동재충전 거부 의사를 표시한 경우</li>
            </ul>
          </SpokeWarnBox>
        </>
      ),
      pasBridge: {
        href: '/w/문화누리카드-사용처-잔액-확인-가맹점-소멸',
        question: '충전은 됐는데 사용 기한은 언제까지인가요?',
        answer: <>충전된 금액은 해당 연도 <strong>12월 31일까지</strong> 써야 해요. 미사용분은 소멸돼요.</>,
        buttonText: '소멸 규정 확인 →',
      },
    },

    {
      id: 'sec-period',
      number: 'SECTION 05',
      heading: '문화누리카드 발급 기간 2월 11월 카드 수령까지 얼마나 걸리나요?',
      subtitle: '2월 초부터 11월 말까지, 카드 배송은 2~3주 정도 걸려요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            2026년 문화누리카드 발급 기간은 <strong>2월 2일부터 11월 30일</strong>까지예요. 이 기간 안에 신청해야 올해 혜택을 받을 수 있어요.
            신청 후 카드가 집으로 오기까지는 보통 2~3주가 걸리고, 등기우편으로 배송돼요.
            주민센터에서 신청하면 일부 지역에서는 현장 수령이 가능하기도 해요.
            12월부터는 신규 발급이 중단되고, 충전된 금액도 12월 31일에 소멸되니까 가능하면 상반기에 신청하는 게 좋아요.
          </p>
          <SpokeTimeline events={[
            { month: '2월 2일', title: '발급 접수 시작', desc: '누리집, 앱, ARS, 주민센터 신청 가능', status: 'current' },
            { month: '2~3주 후', title: '카드 수령', desc: '등기우편 배달 또는 주민센터 현장 수령' },
            { month: '11월 30일', title: '발급 접수 마감', desc: '이후 신규 발급 불가, 연내 사용만 가능' },
            { month: '12월 31일', title: '미사용 잔액 소멸', desc: '남은 금액 이월 불가, 전액 소멸', status: 'warning' },
          ]} />
          <TipBox title="상반기 신청이 유리한 이유">
            <ul className="list-disc pl-5 space-y-1 text-sm text-neutral-600">
              <li>카드 배송까지 2~3주 걸리므로 빨리 신청할수록 사용 기간이 길어져요</li>
              <li>11월 신청 시 실제 사용 가능 기간이 한 달도 안 돼요</li>
              <li>자동재충전 대상은 2월 중 자동으로 충전되니 바로 사용하면 돼요</li>
            </ul>
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '/w/2026-문화누리카드-신청-대상-사용처-금액',
        badge: '전체 안내',
        title: '문화누리카드로 어디서 뭘 할 수 있을까?',
        desc: '영화, 공연, 여행, 스포츠 관람까지 사용처 확인하기',
        icon: 'info',
      },
    },

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
      question: '문화누리카드 가족이 대신 신청할 수 있나요?',
      answer: '네, 대리 신청이 가능해요. 주민센터 방문 시 대상자 신분증과 대리인 신분증을 함께 가져가면 돼요. 온라인(누리집, 앱)에서는 본인 인증이 필요해서 <strong>대리 신청이 어려워요</strong>.',
    },
    {
      question: '문화누리카드 잔액이 남으면 다음 해로 이월되나요?',
      answer: '아니요, <strong>이월되지 않아요</strong>. 12월 31일까지 사용하지 않은 금액은 전액 소멸돼요. 그래서 연내에 다 쓰는 게 좋고, 잔액은 앱이나 누리집에서 수시로 확인할 수 있어요.',
    },
  ],

  relatedSpokes: [
    { badge: '사용처', title: '문화누리카드 사용처 잔액 확인 가맹점 소멸', desc: '영화, 공연, 여행 가맹점과 잔액 조회 방법', href: '/w/문화누리카드-사용처-잔액-확인-가맹점-소멸' },
    { badge: '수급자', title: '기초생활수급자 1인가구 생계급여 조건', desc: '소득인정액 기준과 급여별 선정 기준 확인', href: '/w/기초생활수급자-1인가구-생계급여-조건-소득인정액' },
  ],

  sources: [
    { name: '1인당 최대 16만 원 카드 한 장으로 영화·공연·여행까지', url: 'https://www.korea.kr/news/policyNewsView.do?newsId=148959255', org: '대한민국 정책브리핑' },
    { name: '문화누리카드 공식 누리집', url: 'https://www.mnuri.kr', org: '한국문화예술위원회' },
  ],
}

export default data
