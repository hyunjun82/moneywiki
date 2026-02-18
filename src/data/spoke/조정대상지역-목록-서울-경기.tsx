import type { SpokeData } from './types'
import {
  SpokeTable,
  SpokeCompareCards,
  SpokeTimeline,
  TipBox,
  WarnBox,
  RateCards,
  Chips,
  SpokeLinks,
  SpokeChecklist,
} from '@/components/spoke/SpokeBlocks'
import JojeongdaesangChecker from '@/components/checkers/JojeongdaesangChecker'

const data: SpokeData = {
  slug: '조정대상지역-목록-서울-경기',

  meta: {
    title: '2026 조정대상지역 서울 경기 목록 | 조정대상지역 해제 지역 양도세 기준',
    description: '내 주택이 조정대상지역인지 모르면 수천만원 절세 기회를 놓칠 수 있어요. 2026년 서울 25개 자치구 전역과 경기 12곳 지정 목록, 해제 지역의 양도세 기본세율 적용 기준까지 정리해드려요.',
    keywords: ['2026 조정대상지역 목록', '서울 조정대상지역', '경기 조정대상지역', '조정대상지역 해제 지역'],
    ogTitle: '2026 조정대상지역 서울 경기 목록 | 머니위키',
    ogDescription: '서울 25개 자치구 전역 + 경기 12곳 조정대상지역 목록과 해제 지역 양도세 기준을 확인하세요.',
  },

  hub: {
    url: '/w/다주택양도세-중과유예-세율-절세-전략',
    name: '다주택양도세 중과유예 세율 절세 전략',
  },

  breadcrumb: ['세금', '부동산 세금', '조정대상지역 목록'],

  summary3: [
    <>서울 <strong>25개 자치구 전역</strong>이 2025.10.16부터 조정대상지역이에요</>,
    <>경기 <strong>12곳</strong>(과천·광명·성남 3구·수원 3구·안양 동안·용인 수지·의왕·하남) 지정</>,
    <>해제 지역 주택은 다주택자도 <strong>기본세율(6~45%)</strong>만 적용돼요</>,
  ],

  sourceBar: {
    badge: '출처',
    name: '국토교통부 주택시장 안정화 대책(2025.10.15) · 주택법 제63조의2',
    date: '2025.10',
  },

  prevNext: {
    prev: { title: '양도세 잔금일 기준 계약일 차이', href: '/w/양도세-잔금일-기준-계약일-판단' },
    next: { title: '중과 전후 세액 비교', href: '/w/다주택-양도세-중과-전후-세액-비교' },
  },

  stickyBar: {
    topLabel: '조정대상지역',
    value: '서울 전역 + 경기 12곳',
    buttonText: '내 주택 확인 →',
    scrollTo: '#checker',
  },

  hero: {
    badge: '2026년 2월 기준 · 국토교통부 고시',
    h1: (
      <>2026 조정대상지역 <span className="text-[#1E3A5F]">서울 경기 목록</span> | 조정대상지역 해제 지역 양도세 기준</>
    ),
    intro: (
      <p className="text-base text-neutral-500 leading-relaxed">
        2025년 10월, 서울 전체 25개 자치구가 한꺼번에 조정대상지역으로 재지정됐어요. 2022~2023년 대규모 해제 이후 불과 2년 만의 일이에요. 경기도도 과천·광명·성남·수원·안양·용인·의왕·하남 12곳이 함께 지정됐고요. 다주택자라면 내 주택이 조정대상지역에 속하는지 아닌지에 따라 양도세 부담이 완전히 달라지기 때문에, 정확한 목록을 파악하는 게 절세의 시작이에요.
      </p>
    ),
    quickAnswer: {
      title: '2026 조정대상지역 어디인가요?',
      body: '서울 25개 자치구 전역과 경기 12곳(과천·광명·성남 수정·중원·분당구, 수원 영통·장안·팔달구, 안양 동안구, 용인 수지구, 의왕, 하남)이 지정돼 있어요. 그 외 지방 대부분과 경기 나머지 지역은 해제 상태예요.',
      hook: '내 주택이 조정대상지역인지 아래에서 바로 확인할 수 있어요.',
    },
    hubCTA: {
      badge: '전체 가이드',
      desc: '다주택양도세 중과유예 세율 절세 전략 전체 보기',
    },
  },

  toc: [
    { id: 'checker', label: '내 주택 조정대상지역 확인' },
    { id: 'sec-list', label: '2026 조정대상지역 목록은 어떻게 확인하나요?' },
    { id: 'sec-seoul', label: '서울 조정대상지역은 어디가 해당하나요?' },
    { id: 'sec-gyeonggi', label: '경기 조정대상지역은 어디가 해당하나요?' },
    { id: 'sec-release', label: '조정대상지역 해제 지역은 양도세에 어떤 영향인가요?' },
    { id: 'sec-faq', label: '자주 묻는 질문' },
  ],

  sections: [
    /* ───────── CHECK ───────── */
    {
      id: 'checker',
      number: 'CHECK',
      heading: '내 주택이 조정대상지역에 해당하나요?',
      subtitle: '주택 소재지를 선택하면 지정 여부를 바로 알 수 있어요',
      content: <JojeongdaesangChecker />,
    },

    /* ───────── SECTION 02: 목록 확인 + 규제 개요 ───────── */
    {
      id: 'sec-list',
      number: 'SECTION 02',
      heading: '2026 조정대상지역 목록은 어떻게 확인하나요?',
      subtitle: '국토교통부 고시 기준 — 서울 전역 + 경기 12곳 지정 중',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            조정대상지역 목록은 <a href="https://www.law.go.kr/법령/주택법" target="_blank" rel="noopener noreferrer" className="text-[#4A7AB5] underline">주택법 제63조의2</a>에 따라 국토교통부 장관이 고시하는 형태로 관리돼요. 주택 가격 상승률이 물가 상승률의 1.3배를 넘기거나 청약 경쟁률이 급등하는 지역을 주거정책심의위원회 심의를 거쳐 지정해요. 고시 다음 날부터 즉시 효력이 생기기 때문에 항상 최신 목록을 확인해야 해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            2026년 2월 현재 조정대상지역은 서울 25개 자치구 전역과 경기도 12곳이에요. 2025년 10월 15일 주택시장 안정화 대책으로 서울 나머지 21개 구가 일괄 추가 지정됐고, 경기도도 수원·성남 일부 구가 새로 지정됐어요. 지방 대부분과 경기 나머지 지역은 2022~2023년에 해제된 상태 그대로예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            조정대상지역으로 지정되면 양도세 중과, 장기보유특별공제 배제, 취득세 중과, 대출 규제라는 4가지 규제가 동시에 적용돼요. 양도세 관점에서 가장 중요한 건, 조정대상지역에 있는 주택을 보유한 다주택자만 중과 대상이라는 점이에요. 비조정지역 주택은 몇 채를 갖고 있어도 <a href="/w/양도세-중과-뜻-기본세율-중과세율-비교" className="text-[#4A7AB5] underline">기본세율</a>이 적용되거든요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            지금은 <a href="/w/중과-유예-연혁-종료일-확정" className="text-[#4A7AB5] underline">중과유예</a>가 2026년 5월 9일까지 적용되고 있어서, 유예 기간 안에 양도하면 조정대상지역 주택도 기본세율로 처리돼요. 다만 취득세 중과와 대출 규제는 유예 없이 바로 적용되니까 신규 취득 시에는 주의가 필요해요.
          </p>

          <RateCards cards={[
            { value: '+20%p', label: '2주택 중과', lines: ['조정대상지역 기준', '기본세율에 추가'], highlight: '현재 유예 중', highlightColor: 'orange' },
            { value: '+30%p', label: '3주택 이상 중과', lines: ['조정대상지역 기준', '기본세율에 추가'], highlight: '2026.5.9 종료', highlightColor: 'orange' },
            { value: '8%', label: '2주택 취득세', lines: ['조정대상지역 기준', '일반 1~3%'], active: true },
            { value: '12%', label: '3주택 이상 취득세', lines: ['조정대상지역 기준', '법인도 동일'] },
          ]} />

          <SpokeLinks
            title="조정대상지역 규제 더 알아보기"
            items={[
              { num: '01', heading: '양도세 중과 뜻 기본세율 비교', desc: '기본세율과 중과세율 차이 한눈에 비교', href: '/w/양도세-중과-뜻-기본세율-중과세율-비교' },
              { num: '02', heading: '중과 유예 연혁 종료일 확정', desc: '유예 제도 시작부터 2026.5.9 종료까지', href: '/w/중과-유예-연혁-종료일-확정' },
            ]}
          />
        </>
      ),
      pasBridge: {
        href: '/w/양도세-중과-뜻-기본세율-중과세율-비교',
        question: '서울은 전부 해당된다고 하는데, 정확히 어디어디인가요?',
        answer: <>2025년 10월 16일부터 서울 <strong>25개 자치구 전부</strong>가 조정대상지역이에요. 강남만이 아니라 노원·은평까지 전부 포함돼요.</>,
        buttonText: '서울 전체 목록 확인 →',
      },
    },

    /* ───────── SECTION 03: 서울 목록 ───────── */
    {
      id: 'sec-seoul',
      number: 'SECTION 03',
      heading: '서울 조정대상지역은 어디가 해당하나요?',
      subtitle: '2025년 10월 16일부터 25개 자치구 전부가 지정돼 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            서울은 2025년 10월 16일부터 25개 자치구 전부가 조정대상지역이에요. 이전에는 강남·서초·송파·용산 4개 구만 지정돼 있었는데, 2025년 10월 15일 주택시장 안정화 대책으로 나머지 21개 자치구가 일괄 추가 지정됐어요. 서울 전역이 한꺼번에 조정대상지역이 된 건 2020년 이후 처음이에요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            집값 상승이 강남권에서 강북, 서울 외곽까지 확산되면서 정부가 전면 지정을 결정한 거예요. 이제 서울 내 어디에 주택이 있든 다주택자라면 중과 규제 대상이에요. 강남이든 노원이든 서울 소재 주택은 모두 같은 중과 규제를 받아요. 세금 차이는 양도차익 규모와 보유 기간에 따라서만 달라지고, 구별 차이는 없어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            다만 현재 중과유예 중이라 2026년 5월 9일 이전에 <a href="/w/양도세-잔금일-기준-계약일-판단" className="text-[#4A7AB5] underline">잔금을 치르면</a> 기본세율이 적용돼요. 유예가 종료되면 2주택자는 기본세율에 20%p, 3주택 이상은 30%p가 추가되니까 매도 계획이 있다면 유예 기간 안에 결정하는 게 중요해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            아래 표에서 서울 25개 자치구를 권역별로 정리했으니, 내 주택이 어느 권역에 속하는지 확인해 보세요.
          </p>

          <SpokeTable
            id="seoul-list"
            title="서울 조정대상지역 25개 자치구 (2025.10.16~)"
            subtitle="국토교통부 고시 기준, 전 자치구 해당"
            headers={['권역', '자치구']}
            rows={[
              ['강남권 (4개)', '강남구, 서초구, 송파구, 강동구'],
              ['도심권 (5개)', '용산구, 종로구, 중구, 성동구, 광진구'],
              ['서남권 (8개)', '마포구, 영등포구, 동작구, 관악구, 양천구, 강서구, 구로구, 금천구'],
              ['동북권 (6개)', '성북구, 노원구, 도봉구, 강북구, 동대문구, 중랑구'],
              ['서북권 (2개)', '서대문구, 은평구'],
            ]}
          />

          <Chips items={[
            { icon: 'map', label: '서울', value: '25구 전부 지정' },
            { icon: 'calendar', label: '시행일', value: '2025.10.16' },
            { icon: 'check', label: '유예 중', value: '기본세율 적용' },
            { icon: 'alert', label: '유예 후', value: '중과세율 적용' },
          ]} />

          <SpokeLinks
            title="서울 조정대상지역 관련 글"
            items={[
              { num: '01', heading: '중과 전후 세액 비교', desc: '실제 사례로 기본세율·중과세율 세금 차이 계산', href: '/w/다주택-양도세-중과-전후-세액-비교' },
              { num: '02', heading: '다주택 매도 순서 전략', desc: '어떤 집부터 팔아야 절세가 되는지 정리', href: '/w/다주택-매도-순서-전략-절세' },
            ]}
          />
        </>
      ),
      pasBridge: {
        href: '/w/중과-유예-연혁-종료일-확정',
        question: '경기도는 서울처럼 전부 해당되는 건 아니라고 하던데, 어디가 해당하나요?',
        answer: <>경기도는 서울 인접 <strong>12곳</strong>만 지정돼 있어요. 같은 시 안에서도 구별로 지정·해제가 다르니까 정확한 주소로 확인해야 해요.</>,
        buttonText: '경기 목록 확인 →',
      },
    },

    /* ───────── SECTION 04: 경기 목록 ───────── */
    {
      id: 'sec-gyeonggi',
      number: 'SECTION 04',
      heading: '경기 조정대상지역은 어디가 해당하나요?',
      subtitle: '서울 인접 12곳이 지정 — 같은 시라도 구별로 다를 수 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            경기도는 서울과 달리 전체가 아니라 서울 인접 또는 집값 상승이 두드러진 12곳만 지정돼 있어요. 과천시와 광명시는 시 전역이 해당되고, 성남·수원·안양·용인은 특정 구만 지정돼 있어요. 같은 수원 안에서도 영통·장안·팔달구는 조정대상지역이지만 권선구는 해제 상태예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            성남도 분당·수정·중원구 3개 구 전부 지정돼 있고, 용인은 수지구만 해당돼요. 처인구와 기흥구는 해제 상태라 같은 용인시 주택이라도 세금 구조가 완전히 달라져요. 안양은 동안구만 지정이고 만안구는 해제예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            고양·김포·파주·남양주·화성 등 경기 외곽 지역은 대부분 2022~2023년에 해제된 상태 그대로예요. 그래서 경기도에 주택을 여러 채 보유하고 있다면, 각 주택의 소재지를 시·구 단위까지 정확히 파악하는 게 중요해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            경기도에서 주택을 새로 매수할 계획이 있다면, 취득 시점의 지정 여부도 확인해야 해요. 취득세 중과는 유예 없이 바로 적용되기 때문에, 조정대상지역 내 2주택 취득 시 8%의 취득세가 부과되거든요.
          </p>

          <SpokeChecklist items={[
            { text: '과천시 (전역)', done: true, note: '서울 남쪽 접경' },
            { text: '광명시 (전역)', done: true, note: '서울 서남쪽 접경' },
            { text: '성남시 분당구', done: true, note: '판교·정자 포함' },
            { text: '성남시 수정구', done: true, note: '2025.10 신규 지정' },
            { text: '성남시 중원구', done: true, note: '2025.10 신규 지정' },
            { text: '수원시 영통구', done: true, note: '광교신도시 포함' },
            { text: '수원시 장안구', done: true, note: '2025.10 신규 지정' },
            { text: '수원시 팔달구', done: true, note: '2025.10 신규 지정' },
            { text: '안양시 동안구', done: true, note: '평촌신도시 포함' },
            { text: '용인시 수지구', done: true, note: '수지·죽전 포함' },
            { text: '의왕시 (전역)', done: true, note: '서울 서쪽 접경' },
            { text: '하남시 (전역)', done: true, note: '미사·위례 포함' },
          ]} />

          <WarnBox>
            <p className="mb-0 leading-relaxed">
              수원시 <strong>권선구</strong>, 용인시 <strong>처인구·기흥구</strong>, 안양시 <strong>만안구</strong>는 조정대상지역에서 해제돼 있어요. 같은 시 안에서도 구별로 다르니까, 정확한 구 주소로 확인해야 해요.
            </p>
          </WarnBox>
        </>
      ),
      pasBridge: {
        href: '/w/양도세-잔금일-기준-계약일-판단',
        question: '해제 지역 주택은 다주택자라도 중과가 안 된다면, 유예와 상관없이 기본세율인 건가요?',
        answer: <>맞아요. 해제 지역 주택은 중과유예와 <strong>관계없이 항상 기본세율</strong>(6~45%)이 적용돼요. 장기보유특별공제도 받을 수 있어요.</>,
        buttonText: '해제 지역 양도세 효과 확인 →',
      },
    },

    /* ───────── SECTION 05: 해제 지역 양도세 영향 ───────── */
    {
      id: 'sec-release',
      number: 'SECTION 05',
      heading: '조정대상지역 해제 지역은 양도세에 어떤 영향인가요?',
      subtitle: '지방 대부분과 경기 나머지 지역은 해제 상태 — 기본세율 적용돼요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            2022~2023년 사이에 전국 대부분의 조정대상지역이 해제됐어요. 세종, 대전, 대구, 부산, 광주, 청주, 경기 외곽 등 광범위한 지역이 해제된 거예요. 2025년 10월에 서울 전역과 경기 일부가 재지정됐지만, 그 외 지방과 경기 나머지 지역은 여전히 해제 상태예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            해제 지역에 있는 주택은 다주택자가 팔아도 양도세 중과가 적용되지 않아요. 기본세율(6~45%)로 양도할 수 있고, 장기보유특별공제도 최대 30%(10년 이상 보유)까지 받을 수 있어요. 중과유예와 별개로 항상 기본세율이 적용되는 거라, 해제 지역 주택은 유예 기간에 상관없이 언제 팔아도 세금 부담이 훨씬 적어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            그래서 다주택자라면 조정대상지역 주택을 유예 기간(2026년 5월 9일) 내에 먼저 처분하고, 해제 지역 주택은 나중에 양도하는 게 절세에 유리해요. 해제 지역은 급하게 팔 이유가 없지만, 조정대상지역은 유예 종료 후 세금이 급격히 늘어나기 때문이에요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            조정대상지역 주택과 해제 지역 주택을 동시에 보유하고 있다면, <a href="/w/다주택-매도-순서-전략-절세" className="text-[#4A7AB5] underline">어떤 집부터 파는 게 유리한지</a> 순서를 미리 정해 두는 게 좋아요.
          </p>

          <SpokeCompareCards cards={[
            {
              title: '조정대상지역 주택',
              subtitle: '유예 중 → 5/9 이후 중과',
              items: [
                '2주택: 유예 중 기본세율, 이후 +20%p',
                '3주택: 유예 중 기본세율, 이후 +30%p',
                '장특공: 유예 중 최대 30%, 이후 배제',
                '취득세: 2주택 8%, 3주택 이상 12%',
              ],
            },
            {
              title: '해제 지역 주택',
              subtitle: '주택 수 관계없이 기본세율',
              items: [
                '주택 수 관계없이 기본세율(6~45%)',
                '장기보유특별공제 최대 30% 적용',
                '취득세 1~3% (일반 세율)',
                '대출 규제 없음 (LTV 완화)',
              ],
              recommended: true,
              recLabel: '절세 유리',
            },
          ]} />

          <SpokeTimeline events={[
            { month: '2022.9', title: '세종 전역 해제', desc: '지방 최초 대규모 해제', status: 'normal' },
            { month: '2022.11', title: '대전·충북 청주 해제', desc: '충청권 전체 해제', status: 'normal' },
            { month: '2023.1', title: '경기 외곽·영남권 해제', desc: '고양·남양주·화성·김포, 대구·부산 일부', status: 'normal' },
            { month: '2025.10', title: '서울 전역·경기 12곳 재지정', desc: '서울 21개 구 추가, 경기 수원·성남 일부', status: 'warning' },
          ]} />

          <TipBox title="해제 지역 주택 처분 우선순위">
            <p className="mb-0 leading-relaxed">
              조정대상지역 주택은 유예 기간 내에 먼저 처분하고, 해제 지역 주택은 나중에 양도하는 순서가 세금을 가장 많이 줄이는 방법이에요. 해제 지역은 어차피 기본세율이니까 시간적 압박이 없거든요.
            </p>
          </TipBox>

          <SpokeLinks
            title="해제 지역 절세 전략 더 알아보기"
            items={[
              { num: '01', heading: '다주택 매도 순서 전략', desc: '어떤 집부터 팔아야 절세가 되는지 정리', href: '/w/다주택-매도-순서-전략-절세' },
              { num: '02', heading: '중과 유예 종료 부동산 시장 전망', desc: '유예 종료 후 시장 변화와 대응 전략', href: '/w/중과-유예-종료-부동산-시장-전망' },
            ]}
          />
        </>
      ),
      bridgeCTA: {
        href: '/w/다주택양도세-중과유예-세율-절세-전략',
        badge: '전체 전략',
        title: '조정대상지역 주택부터 해제 지역까지, 매도 전략이 궁금하다면?',
        desc: '다주택자 매도 순서·시기별 절세 전략 전체 확인',
        icon: 'grid',
      },
    },

    /* ───────── FAQ ───────── */
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
      question: '조정대상지역 지정과 해제는 자주 바뀌나요?',
      answer: '정해진 주기는 없어요. 국토교통부 장관이 주거정책심의위원회 심의를 거쳐 시장 상황에 따라 수시로 지정·해제를 결정해요. 가장 최근 변화는 2023년 1월 대규모 해제, 2025년 10월 서울 전역·경기 12곳 재지정이에요. 지정 현황은 <strong>국토교통부 홈페이지</strong>에서 상시 확인할 수 있어요.',
    },
    {
      question: '취득 당시 조정대상지역이었다가 해제된 주택은 어떻게 되나요?',
      answer: '양도세 중과 여부는 <strong>양도 시점의 지정 상태</strong>를 기준으로 판단해요. 취득 당시 조정대상지역이었더라도 양도 시점에 해제돼 있으면 중과 대상이 아니에요. 단, 1주택 비과세의 2년 거주 요건은 취득 당시 조정대상지역이었다면 반드시 충족해야 해요.',
    },
  ],

  relatedSpokes: [
    { badge: '개념', title: '양도세 중과 뜻 기본세율 중과세율 비교', desc: '기본세율과 중과세율 차이 비교', href: '/w/양도세-중과-뜻-기본세율-중과세율-비교' },
    { badge: '연혁', title: '중과 유예 연혁 종료일 확정', desc: '유예 제도 시작부터 2026.5.9 종료까지', href: '/w/중과-유예-연혁-종료일-확정' },
    { badge: '시기', title: '양도세 잔금일 기준 계약일 차이', desc: '잔금일과 계약일 중 기준 날짜 정리', href: '/w/양도세-잔금일-기준-계약일-판단' },
    { badge: '전략', title: '다주택 매도 순서 전략 절세', desc: '어떤 집부터 팔아야 절세가 되는지', href: '/w/다주택-매도-순서-전략-절세' },
  ],

  sources: [
    { name: '주택법 제63조의2(조정대상지역의 지정)', url: 'https://www.law.go.kr/법령/주택법', org: '국가법령정보센터' },
    { name: '주택시장 안정화 대책(2025.10.15)', url: 'https://www.korea.kr/briefing/policyBriefingView.do?newsId=156722073', org: '대한민국 정책브리핑' },
    { name: '양도소득세 세율 안내', url: 'https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2312&cntntsId=7711', org: '국세청' },
  ],
}

export default data
