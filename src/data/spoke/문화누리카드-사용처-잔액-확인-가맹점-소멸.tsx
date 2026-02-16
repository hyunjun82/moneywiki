import type { SpokeData } from '@/data/spoke/types'
import { SpokeTable, SpokeCompareCards, SpokeFlow, DetailBox, TipBox, WarnBox, FormulaBox, SpokeLinks } from '@/components/spoke/SpokeBlocks'
import 문화누리잔액Checker from '@/components/checkers/문화누리잔액Checker'

const data: SpokeData = {
  slug: '문화누리카드-사용처-잔액-확인-가맹점-소멸',

  meta: {
    title: '문화누리카드 사용처, 잔액 확인 방법 | 가맹점 소멸 기한은 언제?',
    description: '문화누리카드 어디서 쓸 수 있는지 모르겠다면 고민 끝이에요. 영화관 공연장 여행 체육 가맹점 사용처, 앱 ARS 잔액 확인 방법부터 12월 31일 소멸 기한까지 정리해서 알려드려요.',
    keywords: ['문화누리카드 사용처 영화관 공연장 여행 체육', '문화누리카드 잔액 확인 방법 앱 누리집 ARS', '문화누리카드 가맹점 등록 조회 온라인 오프라인', '문화누리카드 잔액 소멸 기한 12월 31일 이월 불가'],
    ogTitle: '문화누리카드 사용처 잔액 확인 가맹점 소멸 기한 | 머니위키',
    ogDescription: '문화누리카드 사용처와 잔액 확인 방법을 바로 확인해 보세요.',
  },

  hub: {
    url: '/w/2026-문화누리카드-신청-대상-사용처-금액',
    name: '2026 문화누리카드 신청 대상 사용처 금액',
  },

  breadcrumb: ['복지', '문화누리카드', '사용처 잔액 확인'],

  summary3: [
    <>사용처: 영화, 공연, 도서, 여행, 숙박, 프로스포츠 등 <strong>문화/관광/체육</strong> 가맹점</>,
    <>잔액 확인: www.mnuri.kr, 모바일 앱, ARS <strong>1544-3412</strong></>,
    <>소멸: <strong>12월 31일</strong>까지 미사용분 전액 소멸, 이월 불가</>,
  ],

  sourceBar: {
    badge: '출처',
    name: '대한민국 정책브리핑 - 1인당 최대 16만 원 카드 한 장으로 영화 공연 여행까지',
    date: '2026.02',
  },

  prevNext: {
    prev: { title: '문화누리카드 신청 방법 자격 조건 자동재충전', href: '/w/문화누리카드-신청-방법-자격-조건-자동재충전' },
  },

  stickyBar: {
    topLabel: '소멸 기한',
    value: '12월 31일까지',
    buttonText: '잔액 활용법 확인 →',
    scrollTo: '#checker',
  },

  hero: {
    badge: '2026년 최신',
    h1: (<>문화누리카드 <span className="text-[#1E3A5F]">사용처</span> 잔액 확인 가맹점 소멸 기한</>),
    intro: (
      <p className="text-base text-neutral-500 leading-relaxed">
        카드를 받았는데 정작 어디서 쓸 수 있는지 헷갈리는 분들이 많아요.
        편의점이나 마트에서는 사용할 수 없고, 영화관이나 공연장 같은 문화 가맹점에서만 결제가 돼요.
        전국 2만 7천여 곳의 온오프라인 가맹점 목록과 잔액 확인 방법을 정리했어요.
        연말까지 안 쓰면 소멸되니까, 아래에서 남은 잔액으로 뭘 할 수 있는지 확인해 보세요.
      </p>
    ),
    hubCTA: { badge: '전체 가이드', desc: '문화누리카드 대상, 금액, 신청까지 한눈에 보기' },
    quickAnswer: {
      title: '문화누리카드 사용처',
      body: '문화누리카드는 영화관, 공연장, 박물관, 도서, 국내 여행 숙박, 프로스포츠 관람 등 문화/관광/체육 가맹점에서 사용할 수 있어요. 편의점이나 마트 같은 일반 매장에서는 사용할 수 없고, 잔액은 12월 31일에 소멸돼요.',
      hook: '문화누리카드 사용처와 잔액 소멸 규정이 궁금하다면',
    },
  },

  toc: [
    { id: 'checker', label: '남은 잔액 활용법 확인' },
    { id: 'sec-where', label: '문화누리카드 사용처는 어디인가요?' },
    { id: 'sec-balance', label: '문화누리카드 잔액 확인 방법은?' },
    { id: 'sec-merchant', label: '문화누리카드 가맹점 조회는 어떻게 하나요?' },
    { id: 'sec-expire', label: '문화누리카드 잔액 소멸 기한은 언제인가요?' },
    { id: 'sec-faq', label: '자주 묻는 질문' },
  ],

  sections: [
    {
      id: 'checker',
      number: 'CHECK',
      heading: '남은 잔액으로 뭘 할 수 있을까?',
      subtitle: '잔액과 관심 분야를 선택하면 추천 사용처를 알려드려요',
      content: (<문화누리잔액Checker />),
    },

    {
      id: 'sec-where',
      number: 'SECTION 02',
      heading: '문화누리카드 사용처 영화관 공연장 여행 체육 어디서 쓸 수 있나요?',
      subtitle: '문화, 관광, 체육 3가지 분야 가맹점에서만 사용할 수 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            사용처는 크게 <strong>문화, 관광, 체육</strong> 3가지 분야로 나뉘어요. 영화관에서 영화를 보거나 서점에서 책을 사고, 공연장에서 뮤지컬을 관람하는 것까지 모두 가능해요.
            관광 분야에서는 KTX, SRT, 시외버스 같은 교통수단과 호텔, 리조트, 펜션 같은 숙박 시설도 결제할 수 있어요.
            프로야구나 축구 같은 <a href="/w/2026-문화누리카드-신청-대상-사용처-금액" className="text-[#4A7AB5] underline">프로스포츠</a> 경기 입장권도 되고, 헬스장이나 수영장 같은 체육시설 이용료도 결제 가능해요.
            반면에 편의점, 마트, 음식점, 학원비, 의류 같은 일상 소비에는 사용할 수 없으니 이 점은 꼭 기억해 두세요.
          </p>
          <SpokeCompareCards cards={[
            {
              title: '사용 가능',
              subtitle: '문화/관광/체육 가맹점',
              items: [
                '영화관 (CGV, 롯데시네마 등)',
                '공연장, 박물관, 미술관',
                '도서, 음반, 음원 스트리밍',
                'KTX, SRT, 시외/고속버스',
                '호텔, 리조트, 펜션, 게스트하우스',
                '프로스포츠 관람, 헬스장, 수영장',
              ],
              recommended: true,
              recLabel: '가능',
            },
            {
              title: '사용 불가',
              subtitle: '일반 생활 매장',
              items: [
                '편의점, 마트, 슈퍼마켓',
                '음식점, 카페, 배달앱',
                '의류, 화장품, 생활용품',
                '학원, 교습소, 교육비',
                '병원, 약국, 의료기구',
                '상품권, 담배, 국외 거래',
              ],
            },
          ]} />
          <DetailBox
            title="분야별 주요 사용처 상세"
            items={[
              { heading: '문화 분야', desc: '영화, OTT 서비스, 공연, 전시, 도서(서점/전자책), 음반/음원, 사진관, 공방/문화체험, 케이블TV/위성방송' },
              { heading: '관광 분야', desc: '철도(KTX/SRT), 시외/고속버스, 국내 항공, 여객선, 국내 여행사, 호텔/리조트/펜션, 놀이공원/워터파크, 아쿠아리움' },
              { heading: '체육 분야', desc: '프로스포츠/e스포츠 입장권, 헬스/수영/볼링/요가/스키/태권도, 체육용품점, 자전거/낚시용품' },
            ]}
          />

          <SpokeLinks
            title="문화누리카드 더 알아보기"
            items={[
              { num: '01', heading: '문화누리카드 신청 방법과 자격 조건', desc: '온라인·오프라인 신청 절차와 자동재충전 조건', href: '/w/문화누리카드-신청-방법-자격-조건-자동재충전' },
              { num: '02', heading: '2026 문화누리카드 전체 가이드', desc: '대상, 금액, 사용처를 한눈에 확인', href: '/w/2026-문화누리카드-신청-대상-사용처-금액' },
            ]}
          />
        </>
      ),
      pasBridge: {
        href: '/w/문화누리카드-신청-방법-자격-조건-자동재충전',
        question: '사용처는 알겠는데, 잔액이 얼마나 남았는지 어떻게 확인하나요?',
        answer: <>누리집, 앱, ARS <strong>3가지 방법</strong>으로 실시간 잔액을 확인할 수 있어요.</>,
        buttonText: '잔액 확인 방법 보기 →',
      },
    },

    {
      id: 'sec-balance',
      number: 'SECTION 03',
      heading: '문화누리카드 잔액 확인 방법 앱 누리집 ARS 어떻게 하나요?',
      subtitle: '3가지 방법 중 편한 걸 골라서 확인하면 돼요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            잔액은 언제든 확인할 수 있어요. 가장 빠른 방법은 <strong>전용 앱</strong>을 설치해서 로그인하는 거예요. 앱에서 잔액뿐 아니라 사용 내역도 한눈에 볼 수 있어요.
            PC를 쓰신다면 누리집(www.mnuri.kr)에 접속해서 마이페이지에 들어가면 동일하게 조회할 수 있어요.
            스마트폰이나 PC가 어려우신 분은 <strong>ARS 1544-3412</strong>로 전화하면 음성 안내로 잔액을 알려줘요.
            카드 뒷면 고객센터 번호와 동일하니까 카드를 보면서 바로 전화하면 편해요.
          </p>
          <SpokeFlow steps={[
            { icon: '📱', label: '앱 설치', sub: '문화누리카드 앱 다운로드' },
            { icon: '🔑', label: '로그인', sub: '본인 인증 후 접속' },
            { icon: '💳', label: '잔액 조회', sub: '마이페이지에서 확인' },
            { icon: '📊', label: '사용 내역', sub: '날짜별 결제 내역 확인' },
          ]} />
          <SpokeTable
            id="balance-check-table"
            title="잔액 확인 방법 비교"
            subtitle="3가지 채널 중 편한 것을 이용하세요"
            headers={['확인 방법', '접속 경로', '특징']}
            rows={[
              ['모바일 앱', '앱스토어/구글플레이에서 설치', '실시간 잔액 + 사용 내역 + 가맹점 검색'],
              ['누리집(PC)', 'www.mnuri.kr 접속', '마이페이지에서 잔액/내역 조회'],
              ['ARS 전화', '1544-3412', '음성 안내, 스마트폰 없어도 가능'],
            ]}
          />
        </>
      ),
      pasBridge: {
        href: '/w/문화누리카드-신청-방법-자격-조건-자동재충전',
        question: '잔액은 확인했는데, 내 근처에 가맹점이 있는지 어떻게 찾나요?',
        answer: <>앱이나 누리집에서 <strong>가맹점 찾기</strong> 기능을 이용하면 주변 가맹점을 바로 검색할 수 있어요.</>,
        buttonText: '가맹점 조회 방법 보기 →',
      },
    },

    {
      id: 'sec-merchant',
      number: 'SECTION 04',
      heading: '문화누리카드 가맹점 등록 조회 온라인 오프라인 어떻게 찾나요?',
      subtitle: '전국 2만 7천여 곳, 앱이나 누리집에서 바로 검색할 수 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            전국에 약 <strong>2만 7천여 곳</strong>의 가맹점이 있어요. 오프라인은 가까운 영화관, 서점, 체육시설 등이고, 온라인 가맹점으로는 예스24, 인터파크(도서), 멜론, 지니뮤직 같은 곳이 있어요.
            가맹점을 찾으려면 앱이나 누리집에서 <strong>가맹점 찾기</strong>를 눌러 지역과 분야를 선택하면 돼요. 지도 기반으로 내 위치 근처 가맹점을 바로 확인할 수 있어서 편리해요.
            온라인 가맹점은 누리집 내 온라인 가맹점 목록 페이지에서 확인 가능해요.
            만약 자주 가는 매장이 가맹점인지 모르겠다면, ARS 1544-3412로 문의하거나 결제 시 문화누리카드로 결제 가능한지 직접 여쭤보는 것도 방법이에요.
          </p>
          <FormulaBox lines={[
            { text: '가맹점 찾기 방법', numbered: false },
            { text: '앱/누리집 접속 → 가맹점 찾기 메뉴 선택', numbered: true },
            { text: '지역(시/도/구) + 분야(문화/관광/체육) 선택', numbered: true },
            { text: '지도에서 근처 가맹점 확인 또는 목록 검색', numbered: true },
            { text: '온라인 가맹점은 별도 목록에서 확인', numbered: true },
          ]} />
          <TipBox title="온라인 가맹점 활용 꿀팁">
            <ul className="list-disc pl-5 space-y-1 text-sm text-neutral-600">
              <li>예스24, 인터파크에서 도서 구매 시 문화누리카드 결제 선택 가능해요</li>
              <li>멜론, 지니뮤직 등 음원 스트리밍 월정액도 결제할 수 있어요</li>
              <li>OTT 서비스(넷플릭스, 유튜브 프리미엄 등)도 일부 가맹점으로 등록돼 있어요</li>
              <li>온라인 결제 시 카드번호를 직접 입력하는 방식으로 결제해요</li>
            </ul>
          </TipBox>

          <SpokeLinks
            title="가맹점 활용 더 알아보기"
            items={[
              { num: '01', heading: '문화누리카드 신청과 자동재충전', desc: '3만원 이상 사용 시 자동으로 다음 해 충전', href: '/w/문화누리카드-신청-방법-자격-조건-자동재충전' },
            ]}
          />
        </>
      ),
      pasBridge: {
        href: '/w/2026-문화누리카드-신청-대상-사용처-금액',
        question: '가맹점에서 잘 쓰고 있는데, 남은 잔액은 언제까지 써야 하나요?',
        answer: <>충전된 금액은 해당 연도 <strong>12월 31일</strong>에 전액 소멸돼요. 이월이 안 되니까 반드시 연내에 사용해야 해요.</>,
        buttonText: '소멸 기한 확인하기 →',
      },
    },

    {
      id: 'sec-expire',
      number: 'SECTION 05',
      heading: '문화누리카드 잔액 소멸 기한 12월 31일 이월 불가 어떻게 되나요?',
      subtitle: '연말까지 안 쓰면 남은 금액이 전부 사라져요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            충전된 금액은 해당 연도 <strong>12월 31일</strong>까지만 사용할 수 있어요. 이 기한이 지나면 남은 잔액은 전부 소멸되고, 다음 해로 이월되지 않아요.
            예를 들어 15만원 중 8만원만 쓰고 7만원이 남아 있다면, 12월 31일이 지나는 순간 그 7만원은 사라져요. 돌려받을 수도 없어요.
            그래서 잔액이 남아 있다면 연말 전에 영화를 보거나, 도서를 구매하거나, 숙박 예약에 활용하는 게 좋아요.
            참고로 전년도 사용액이 3만원 이상이면 다음 해 <a href="/w/문화누리카드-신청-방법-자격-조건-자동재충전" className="text-[#4A7AB5] underline">자동재충전</a> 대상이 되니까, 최소 3만원은 꼭 쓰는 게 유리해요.
          </p>
          <WarnBox>
            <p className="text-sm text-neutral-700 font-medium mb-2">잔액 소멸 주의사항</p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-neutral-600">
              <li><strong>12월 31일</strong> 자정 기준으로 미사용분 전액 소멸돼요</li>
              <li>이월 불가 — 남은 금액을 다음 해로 넘길 수 없어요</li>
              <li>환불/현금화 불가 — 잔액을 돈으로 돌려받을 수 없어요</li>
              <li>자동재충전 기준: 전년도 <strong>3만원 이상</strong> 사용 필수</li>
            </ul>
          </WarnBox>
          <SpokeTable
            id="expire-compare-table"
            title="사용액별 차이 비교"
            subtitle="얼마를 쓰느냐에 따라 다음 해 혜택이 달라져요"
            headers={['전년도 사용액', '잔액 소멸', '다음 해 자동재충전']}
            rows={[
              ['15만원 전액 사용', '소멸 잔액 0원', '자동재충전 대상'],
              ['10만원 사용', '5만원 소멸', '자동재충전 대상'],
              ['3만원 사용', '12만원 소멸', '자동재충전 대상 (기준 충족)'],
              ['3만원 미만 사용', '대부분 소멸', '자동재충전 불가, 재신청 필요'],
            ]}
            highlightCol={2}
          />
        </>
      ),
      bridgeCTA: {
        href: '/w/2026-문화누리카드-신청-대상-사용처-금액',
        badge: '전체 안내',
        title: '문화누리카드 대상, 금액, 사용처를 한번에 확인하려면?',
        desc: '2026 문화누리카드 전체 가이드 보기',
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
      question: '문화누리카드로 넷플릭스 OTT 서비스 결제할 수 있나요?',
      answer: '네, OTT 서비스가 문화 분야 가맹점으로 등록돼 있으면 결제할 수 있어요. 넷플릭스, 유튜브 프리미엄, 디즈니플러스 등이 포함돼요. 다만 가맹점 등록 여부는 수시로 바뀔 수 있으니 결제 전에 <strong>앱이나 누리집에서 확인</strong>하는 게 안전해요.',
    },
    {
      question: '문화누리카드 잔액으로 다른 사람이 대신 결제할 수 있나요?',
      answer: '문화누리카드는 <strong>본인만 사용</strong>할 수 있어요. 카드 명의자 본인이 직접 결제해야 하고, 다른 사람에게 빌려주거나 양도하면 부정 사용으로 카드가 정지될 수 있어요.',
    },
  ],

  relatedSpokes: [
    { badge: '신청', title: '문화누리카드 신청 방법 자격 조건 자동재충전', desc: '대상 자격, 신청 절차, 자동재충전 조건 확인', href: '/w/문화누리카드-신청-방법-자격-조건-자동재충전' },
    { badge: '수급자', title: '기초생활수급자 1인가구 생계급여 조건', desc: '소득인정액 기준과 급여별 선정 기준 확인', href: '/w/기초생활수급자-1인가구-생계급여-조건-소득인정액' },
  ],

  sources: [
    { name: '1인당 최대 16만 원 카드 한 장으로 영화 공연 여행까지', url: 'https://www.korea.kr/news/policyNewsView.do?newsId=148959255', org: '대한민국 정책브리핑' },
    { name: '문화누리카드 사용 안내', url: 'https://www.mnuri.kr/useOfCard/useInfo.do', org: '한국문화예술위원회' },
  ],
}

export default data
