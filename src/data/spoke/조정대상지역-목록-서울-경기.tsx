import Link from 'next/link'
import type { SpokeData } from './types'
import { SpokeTable, SpokeRateBars, SpokeCompareCards, FormulaBox, SpokeChecklist, SpokeFlow, SpokeTimeline, TipBox } from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '조정대상지역-목록-서울-경기',

  meta: {
    title: '조정대상지역 목록 서울 경기 해제 지역 총정리',
    description: '2026년 기준 서울 25개 자치구 전부와 경기 12곳이 조정대상지역이라는 거 아시나요? 해제 지역까지 정리했어요',
    keywords: ['조정대상지역 목록', '서울 조정대상지역', '경기 조정대상지역', '조정지역 해제'],
    ogTitle: '조정대상지역 목록 서울 경기 해제 지역 총정리 | 머니위키',
    ogDescription: '서울 전역과 경기 12곳 조정대상지역 목록, 해제 지역, 지정 영향까지 총정리했어요.',
  },

  hub: {
    url: '/w/다주택양도세-중과유예-세율-절세-전략',
    name: '다주택양도세 중과유예 세율 절세 전략',
  },

  breadcrumb: ['세금', '다주택양도세 조정대상지역'],

  hero: {
    badge: '2026년 2월 기준',
    h1: <>조정대상지역 목록 — <span className="text-emerald-600">서울 경기</span> 해제 지역까지</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          다주택자 양도세 중과는 <strong>조정대상지역</strong> 내 주택에만 적용돼요. 2025년 10월 15일 부동산 대책으로 서울 전역과 경기 12곳이 지정됐어요. 조정대상지역이 아니면 다주택자라도 중과 걱정이 없어요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          어떤 지역이 지정돼 있고, 어디가 해제됐는지 정확히 파악하는 게 절세의 첫 단계예요. <Link href="/w/다주택양도세-중과유예-세율-절세-전략" className="text-blue-600 hover:underline">다주택양도세 중과유예 세율 절세 전략</Link>과 함께 보면 전체 구조가 잡혀요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '다주택 양도세 중과유예 세율 절세 전략 전체 보기',
    },
  },

  toc: [
    { id: 's1', text: '조정대상지역이란 무엇인가요?' },
    { id: 's2', text: '서울 조정대상지역 목록은 어떻게 되나요?' },
    { id: 's3', text: '경기도 조정대상지역은 어디인가요?' },
    { id: 's4', text: '조정지역 해제 지역은 어디인가요?' },
    { id: 's5', text: '자주 묻는 질문' },
  ],

  sections: [
    /**
     * ===== S1: 조정대상지역 개념 =====
     * 시각 요소: SpokeTable + SpokeRateBars
     * 전환 스타일: A. 독자 대변형
     */
    {
      id: 's1',
      number: '01',
      heading: '조정대상지역이란 무엇인가요?',
      subtitle: '주택 가격이 급등하거나 과열된 지역을 정부가 지정하는 제도예요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            조정대상지역은 주택 가격 상승률이 높거나 청약 과열 등이 나타나는 지역을 국토교통부 장관이 지정하는 제도예요. <a href="https://law.go.kr/법령/주택법/제63조의2" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">주택법 제63조의2</a>에 근거하고 있어요. 지정되면 양도세 중과, 취득세 중과, 대출 규제, 전매제한 등 다양한 규제가 적용돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            양도세 중과 관점에서 보면, 조정대상지역 내 주택을 보유한 다주택자만 중과 대상이에요. 조정대상지역이 아닌 곳의 주택은 몇 채를 보유하든 기본세율이 적용돼요. 그래서 본인 주택이 조정대상지역에 있는지 여부가 세금의 핵심이에요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            조정대상지역에 지정되면 받는 주요 규제를 정리하면 아래와 같아요.
          </p>

          <SpokeTable id="regulations" title="조정대상지역 지정 시 주요 규제" subtitle="주택법, 소득세법, 지방세법" headers={['구분', '규제 내용', '비고']} rows={[
            ['양도세 중과', '2주택 +20%p, 3주택 +30%p', '유예 중(~2026.5.9)'],
            ['장특공제 배제', '중과 대상 시 장특공제 불가', '유예 중에는 가능'],
            ['취득세 중과', '2주택 8%, 3주택 12%', '법인 12% 고정'],
            ['LTV 제한', '무주택 50%, 1주택 30%', '은행별 차이 있음'],
            ['전매제한', '분양권 전매 제한 강화', '지역별 기간 상이'],
          ]} />

          <SpokeRateBars bars={[
            { label: '1주택', rate: '1~3%', width: '20%' },
            { label: '2주택', rate: '8%', width: '53%' },
            { label: '3주택 이상', rate: '12%', width: '80%' },
            { label: '법인', rate: '12%', width: '80%' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            규제가 이렇게 많으니, 내 주택이 조정대상지역에 있는지 확인하는 게 첫 번째겠죠.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '서울',
        title: '서울 조정대상지역은 어디일까?',
        desc: '서울 25개 자치구 전체 지정 현황 확인',
        icon: 'grid',
      },
    },

    /**
     * ===== S2: 서울 목록 =====
     * 시각 요소: SpokeCompareCards + FormulaBox
     * 전환 스타일: B. 실생활 질문형
     */
    {
      id: 's2',
      number: '02',
      heading: '서울 조정대상지역 목록은 어떻게 되나요?',
      subtitle: '2025년 10월부터 서울 25개 자치구 전부가 지정돼 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            서울은 2025년 10월 16일부터 <strong>25개 자치구 전부</strong>가 조정대상지역이에요. 원래 강남4구(강남·서초·송파·용산)만 지정돼 있었는데, 2025년 10월 15일 부동산 대책으로 나머지 21개 자치구도 추가 지정됐어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            서울 전역이 지정된 건 문재인 정부 이후 처음이에요. 집값 상승세가 강남에서 강북, 외곽까지 확산되면서 정부가 전면 지정을 결정한 거예요. 서울 내 주택을 보유한 다주택자라면 어디에 있든 중과 대상이에요(유예 기간 제외).
          </p>

          <SpokeCompareCards
            cards={[
              { title: '~2025.10.15', subtitle: '', items: ['강남구', '서초구', '송파구', '용산구 (4개 구만 지정)'] },
              { title: '2025.10.16~', subtitle: '', items: ['서울 전역 25개 자치구', '강남4구 포함', '강북·마포·성동 등 전부', '외곽 노원·도봉 등도 포함'] }
            ]}
          />

          <FormulaBox lines={[
            { text: '강남구, 강동구, 강북구, 강서구, 관악구', numbered: false },
            { text: '광진구, 구로구, 금천구, 노원구, 도봉구', numbered: false },
            { text: '동대문구, 동작구, 마포구, 서대문구, 서초구', numbered: false },
            { text: '성동구, 성북구, 송파구, 양천구, 영등포구', numbered: false },
            { text: '용산구, 은평구, 종로구, 중구, 중랑구', numbered: false },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            서울에서 집을 팔 계획이라면 예외 없이 조정대상지역 규제가 적용돼요. 그렇다면 경기도는 어디가 해당되는지도 확인해야겠죠?
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '경기',
        title: '경기도 조정대상지역은 어디일까?',
        desc: '경기 12곳 조정대상지역 확인',
        icon: 'grid',
      },
    },

    /**
     * ===== S3: 경기 목록 =====
     * 시각 요소: SpokeChecklist + SpokeFlow
     * 전환 스타일: D. 화제 전환형
     */
    {
      id: 's3',
      number: '03',
      heading: '경기도 조정대상지역은 어디인가요?',
      subtitle: '과천, 광명, 성남 등 12곳이 지정돼 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            경기도는 12개 지역이 조정대상지역으로 지정돼 있어요. 서울 인접 지역이나 집값 상승이 뚜렷한 지역 위주예요. 수원은 영통구·장안구·팔달구 3개 구가 지정됐고, 성남은 분당구·수정구·중원구 전부가 해당돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            경기도 나머지 지역(용인 처인구·기흥구, 수원 권선구, 고양, 김포, 파주, 남양주 등)은 조정대상지역에서 해제된 상태예요. 해제된 지역의 주택은 다주택자라도 양도세 중과 대상이 아니에요.
          </p>

          <SpokeChecklist items={[
            { text: '과천시 (전역)', done: true, note: '서울 접경' },
            { text: '광명시 (전역)', done: true, note: '서울 접경' },
            { text: '성남시 분당구', done: true, note: '판교·정자 포함' },
            { text: '성남시 수정구', done: true, note: '2025.10 추가' },
            { text: '성남시 중원구', done: true, note: '2025.10 추가' },
            { text: '수원시 영통구', done: true, note: '광교 포함' },
            { text: '수원시 장안구', done: true, note: '2025.10 추가' },
            { text: '수원시 팔달구', done: true, note: '2025.10 추가' },
            { text: '안양시 동안구', done: true, note: '평촌 포함' },
            { text: '용인시 수지구', done: true, note: '수지·죽전 포함' },
            { text: '의왕시 (전역)', done: true, note: '서울 접경' },
            { text: '하남시 (전역)', done: true, note: '미사·위례 포함' },
          ]} />

          <SpokeFlow steps={[
            { icon: '1', label: '주소 확인', sub: '정확한 구·시' },
            { icon: '2', label: '지정 여부 확인', sub: '국토교통부 고시' },
            { icon: '3', label: '지정 시점 확인', sub: '취득일 기준' },
            { icon: '4', label: '세금 영향 확인', sub: '양도세·취득세' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            그런데 반대로, 예전에 조정대상지역이었다가 해제된 곳은 어디인지 궁금한 분도 많을 거예요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '해제',
        title: '해제된 지역은 어디일까?',
        desc: '조정대상지역 해제 현황 확인',
        icon: 'info',
      },
    },

    /**
     * ===== S4: 해제 지역 =====
     * 시각 요소: SpokeTimeline + TipBox
     * 전환 스타일: 없음 (마지막)
     */
    {
      id: 's4',
      number: '04',
      heading: '조정지역 해제 지역은 어디인가요?',
      subtitle: '지방 대부분과 경기 일부가 해제돼서 중과 대상이 아니에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            2022~2023년에 걸쳐 전국 대부분의 조정대상지역이 해제됐어요. 문재인 정부 시절에는 세종, 대전, 대구, 부산, 수원 전역 등 광범위하게 지정돼 있었는데, 부동산 시장 침체로 단계적으로 해제된 거예요. 2025년 10월에 서울 전역과 경기 일부가 다시 지정됐지만, 지방은 여전히 대부분 해제 상태예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            해제된 지역의 주택은 다주택자가 팔더라도 양도세 중과가 적용되지 않아요. 기본세율(6~45%)로 양도할 수 있고, 장기보유특별공제도 받을 수 있어요. 중과 유예와 관계없이 항상 기본세율이 적용되는 거예요.
          </p>

          <SpokeTimeline events={[
            { month: '2022.9', title: '세종 해제', desc: '세종특별자치시 전역 해제', status: 'normal', tag: '해제' },
            { month: '2022.11', title: '대전·청주 등 해제', desc: '대전 전역, 충북 청주시 해제', status: 'normal', tag: '해제' },
            { month: '2023.1', title: '대구·부산 해제', desc: '대구 수성구, 부산 해운대구 등 해제', status: 'normal', tag: '해제' },
            { month: '2023.1', title: '경기 일부 해제', desc: '고양, 남양주, 화성, 김포 등 해제', status: 'normal', tag: '해제' },
            { month: '2025.10', title: '서울·경기 재지정', desc: '서울 전역 + 경기 12곳 추가 지정', status: 'current', tag: '지정' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            주요 해제 지역으로는 대전, 대구, 부산, 세종, 수원 권선구, 고양, 남양주, 화성, 김포, 파주 등이 있어요. 이 지역에 주택을 보유한 다주택자는 중과 걱정 없이 기본세율로 양도할 수 있어요.
          </p>

          <TipBox title="해제 지역이라도 주의할 점">
            <p className="mb-0 leading-relaxed">
              해제 지역이라도 <strong>취득 당시</strong>에 조정대상지역이었다면 일부 규제가 남아 있을 수 있어요. 예를 들어 취득 시 조정지역이었던 주택을 2년 이상 거주하지 않고 팔면 1주택 비과세 요건을 충족하지 못할 수 있어요. 취득 시점의 지역 지정 여부도 함께 확인하세요. 구체적인 절세 전략은 <Link href="/w/다주택-매도-순서-전략-절세" className="text-blue-600 hover:underline">다주택 매도 순서 전략</Link>에서 확인할 수 있어요.
            </p>
          </TipBox>

          <p className="text-neutral-600 mb-4 leading-relaxed">
            내 주택이 조정대상지역에 있는지 확인했다면, 다음 단계는 중과 유예 기간 내 매도 전략을 세우는 거예요. <Link href="/w/다주택양도세-중과유예-세율-절세-전략" className="text-blue-600 hover:underline">다주택양도세 중과유예 세율 절세 전략</Link>에서 전체 흐름을 확인하세요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '/w/다주택양도세-중과유예-세율-절세-전략',
        badge: '전체 가이드',
        title: '다주택 양도세 절세 전략 전체 보기',
        desc: '유예 기간 활용법과 매도 전략까지 확인하기',
        icon: 'grid',
        primary: true,
      },
    },

    {
      id: 's5',
      number: '05',
      heading: '자주 묻는 질문',
      subtitle: '자주 묻는 질문이에요',
      content: null,
    },
  ],

  faq: [
    {
      question: '조정대상지역은 누가 정하나요?',
      answer: '국토교통부 장관이 주거정책심의위원회 심의를 거쳐 지정해요. 주택 가격 상승률, 청약 경쟁률, 전매거래량 등을 종합 판단해서 지정·해제를 결정해요. 지정 즉시 효력이 발생하고, 관보에 고시돼요.',
    },
    {
      question: '오피스텔도 조정대상지역 규제를 받나요?',
      answer: '주거용 오피스텔은 실질적으로 주택으로 사용하면 주택 수에 포함될 수 있어요. 다만 건축법상 "업무시설"로 분류된 오피스텔 자체가 조정대상지역 규제를 직접 받는 건 아니에요. 주택 수 산정과 양도세 과세는 실제 사용 용도를 기준으로 판단해요.',
    },
  ],

  relatedSpokes: [
    { badge: '개념', title: '양도세 중과 뜻 기본세율 중과세율 비교', desc: '기본세율과 중과세율 차이 한눈에 비교', href: '/w/양도세-중과-뜻-기본세율-중과세율-비교' },
    { badge: '연혁', title: '중과 유예 연혁 종료일 확정', desc: '유예 제도 시작부터 종료일까지', href: '/w/중과-유예-연혁-종료일-확정' },
    { badge: '전략', title: '다주택 매도 순서 전략 절세', desc: '어떤 집부터 팔아야 절세가 되는지 정리', href: '/w/다주택-매도-순서-전략-절세' },
    { badge: '전망', title: '중과 유예 종료 부동산 시장 전망', desc: '유예 종료 후 시장 영향과 대응 전략', href: '/w/중과-유예-종료-부동산-시장-전망' },
  ],

  sources: [
    { name: '주택법 제63조의2(조정대상지역의 지정)', url: 'https://law.go.kr/법령/주택법/제63조의2', org: '국가법령정보센터' },
    { name: '주택시장 안정화 대책(2025.10.15)', url: 'https://www.molit.go.kr', org: '국토교통부' },
    { name: '조정대상지역 지정해제 현황', url: 'https://www.molit.go.kr/policy/stable/sta_b_03.jsp', org: '국토교통부' },
    { name: '양도소득세 기본정보', url: 'https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2312&cntntsId=7711', org: '국세청' },
  ],
}

export default data
