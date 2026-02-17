import type { SpokeData } from './types'
import {
  SpokeTable,
  SpokeStepCards,
  Chips,
  SpokeChecklist,
  SpokeFlow,
  TipBox,
  WarnBox,
  SpokeLinks,
} from '@/components/spoke/SpokeBlocks'
import JojeongdaesangChecker from '@/components/checkers/JojeongdaesangChecker'

const data: SpokeData = {
  slug: '조정대상지역-목록-서울-경기',

  meta: {
    title: '2026 조정대상지역 서울 경기 지정 목록 | 해제 지역 양도세 중과 적용 여부',
    description: '서울 25개 자치구 전부와 경기 12곳이 2026년 현재 조정대상지역으로 지정돼 있다는 거 아시나요? 지역별 지정 목록과 해제 지역의 양도세 중과 적용 여부까지 한눈에 확인해 보세요.',
    keywords: ['2026 조정대상지역 목록', '서울 조정대상지역', '경기 조정대상지역', '조정대상지역 해제 지역'],
    ogTitle: '2026 조정대상지역 서울 경기 지정 목록 | 머니위키',
    ogDescription: '서울 25개구 전역과 경기 12곳 조정대상지역 목록, 해제 지역 양도세 중과 적용 여부까지 확인하세요.',
  },

  hub: {
    url: '/w/다주택양도세-중과유예-세율-절세-전략',
    name: '다주택 양도세 중과유예 세율 절세 전략',
  },

  breadcrumb: ['세금', '부동산', '조정대상지역 목록'],

  summary3: [
    <>서울 <strong>25개 자치구 전역</strong> + 경기 12곳 지정 (2025.10.16~)</>,
    <>해제 지역 주택은 다주택자라도 <strong>기본세율(6~45%)</strong> 적용</>,
    <>중과 유예 <strong>2026년 5월 9일</strong> 종료 → 잔금일 기준 확인 필수</>,
  ],

  sourceBar: {
    badge: '출처',
    name: '국토교통부 조정대상지역 지정 고시 · 주택법 제63조의2',
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
    h1: (<>2026 조정대상지역 <span className="text-[#1E3A5F]">서울 경기</span> 지정 목록</>),
    intro: (
      <p className="text-base text-neutral-500 leading-relaxed">
        많은 분이 다주택이면 무조건 양도세 중과를 받는다고 생각하는데, 사실은 <strong>조정대상지역</strong> 내 주택에만 적용돼요. 2025년 10월 15일 부동산 대책으로 서울 25개 자치구 전역과 경기 12곳이 지정됐어요. 반면 지방 대부분과 경기 나머지 지역은 해제 상태라서 다주택자라도 기본세율이 적용되고 있어요. 내 주택이 어디에 해당하는지 정확히 파악하는 게 절세의 첫 단계예요.
      </p>
    ),
    quickAnswer: {
      title: '조정대상지역 어디가 해당되나요?',
      body: '2026년 현재 서울 25개 자치구 전역과 경기 12곳(과천·광명·성남 3구·수원 3구·안양 동안·용인 수지·의왕·하남)이 지정돼 있어요. 그 외 지역은 해제 상태예요.',
      hook: '내 주택이 해당되는지 아래 체커에서 확인해 보세요 →',
    },
    hubCTA: {
      badge: '전체 가이드',
      desc: '다주택 양도세 중과유예 세율 절세 전략 전체 보기',
    },
  },

  toc: [
    { id: 'checker', label: '내 주택 조정대상지역 확인' },
    { id: 'sec-designation', label: '조정대상지역 지정 기준과 규제 영향은 무엇인가요?' },
    { id: 'sec-seoul', label: '서울 조정대상지역 목록은 어디인가요?' },
    { id: 'sec-gyeonggi', label: '경기 조정대상지역 목록은 어디인가요?' },
    { id: 'sec-release', label: '조정대상지역 해제 지역은 양도세에 어떤 영향이 있나요?' },
    { id: 'sec-faq', label: '자주 묻는 질문' },
  ],

  sections: [
    // ===== CHECK: 조정대상지역 확인 체커 =====
    {
      id: 'checker',
      number: 'CHECK',
      heading: '내 주택이 조정대상지역에 해당하나요?',
      subtitle: '주택 소재지를 선택하면 조정대상지역 여부를 바로 알 수 있어요',
      content: (<JojeongdaesangChecker />),
    },

    // ===== SECTION 02: 지정 기준과 규제 =====
    {
      id: 'sec-designation',
      number: 'SECTION 02',
      heading: '조정대상지역 지정 기준과 규제 영향은 무엇인가요?',
      subtitle: '주택 가격이 급등하거나 과열된 지역을 정부가 지정하는 제도예요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            조정대상지역은 주택 가격 상승률이 높거나 청약 과열 등이 나타나는 지역을 국토교통부 장관이 지정하는 제도예요. <a href="https://law.go.kr/법령/주택법/제63조의2" target="_blank" rel="noopener noreferrer" className="text-[#4A7AB5] underline">주택법 제63조의2</a>에 근거하고 있고, 주거정책심의위원회 심의를 거쳐 지정·해제가 결정돼요. 지정 즉시 효력이 발생하고, 관보에 고시되는 방식이에요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            조정대상지역으로 지정되면 양도세 중과, 취득세 중과, 대출 규제, 전매제한 등 4가지 핵심 규제가 동시에 적용돼요. 양도세 관점에서 보면, 조정대상지역 내 주택을 보유한 다주택자만 중과 대상이에요. 비조정지역 주택은 몇 채를 보유하든 기본세율이 적용되니까, 본인 주택이 조정대상지역에 있는지 여부가 세금의 핵심이에요.
          </p>

          <SpokeStepCards steps={[
            { title: '양도세 중과', desc: '2주택 +20%p, 3주택 이상 +30%p 추가 (현재 유예 중)', tip: '유예 종료: 2026.5.9' },
            { title: '장기보유특별공제 배제', desc: '중과 대상 주택은 장특공제를 받을 수 없어요', tip: '유예 중에는 최대 30% 가능' },
            { title: '취득세 중과', desc: '2주택 8%, 3주택 이상 12% 적용', tip: '법인은 주택 수 관계없이 12%' },
            { title: '대출·전매 규제', desc: 'LTV 제한 강화, 분양권 전매제한 적용', tip: '무주택 50%, 1주택 30%' },
          ]} />

          <Chips items={[
            { icon: '🏠', label: '2주택 중과', value: '+20%p' },
            { icon: '🏢', label: '3주택 중과', value: '+30%p' },
            { icon: '📋', label: '취득세 2주택', value: '8%' },
            { icon: '🏦', label: '취득세 3주택', value: '12%' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            이렇게 규제가 많기 때문에 내 주택이 조정대상지역에 있는지 확인하는 게 첫 번째예요. 특히 <a href="/w/양도세-중과-뜻-기본세율-중과세율-비교" className="text-[#4A7AB5] underline">양도세 중과세율</a>은 기본세율 대비 최대 30%p까지 높아지기 때문에, 같은 주택을 팔더라도 세금이 수천만 원 차이가 날 수 있어요.
          </p>

          <SpokeLinks
            title="조정대상지역 규제 더 알아보기"
            items={[
              { num: '01', heading: '양도세 중과 뜻 기본세율 비교', desc: '기본세율과 중과세율 차이 한눈에 비교', href: '/w/양도세-중과-뜻-기본세율-중과세율-비교' },
              { num: '02', heading: '중과 유예 연혁 종료일 확정', desc: '유예 제도 시작부터 종료일까지', href: '/w/중과-유예-연혁-종료일-확정' },
            ]}
          />
        </>
      ),
      pasBridge: {
        href: '/w/양도세-중과-뜻-기본세율-중과세율-비교',
        question: '기본세율과 중과세율 차이가 궁금하신가요?',
        answer: (<>조정대상지역 주택은 중과 적용 시 기본세율 대비 <strong>20~30%p</strong> 높아져요</>),
        buttonText: '세율 차이 확인 →',
      },
    },

    // ===== SECTION 03: 서울 조정대상지역 =====
    {
      id: 'sec-seoul',
      number: 'SECTION 03',
      heading: '서울 조정대상지역 목록은 어디인가요?',
      subtitle: '2025년 10월부터 서울 25개 자치구 전부가 지정돼 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            서울은 2025년 10월 16일부터 <strong>25개 자치구 전부</strong>가 조정대상지역이에요. 원래 강남4구(강남·서초·송파·용산)만 지정돼 있었는데, 2025년 10월 15일 부동산 대책으로 나머지 21개 자치구도 추가 지정됐어요. 서울 전역이 한꺼번에 지정된 건 2020년 이후 처음이에요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            집값 상승세가 강남에서 강북, 외곽까지 확산되면서 정부가 전면 지정을 결정한 거예요. 서울 내 주택을 보유한 다주택자라면 어디에 있든 중과 대상이에요. 다만 현재 <a href="/w/중과-유예-연혁-종료일-확정" className="text-[#4A7AB5] underline">중과 유예</a>가 2026년 5월 9일까지 적용되고 있어서, 유예 기간 안에 양도하면 기본세율이 적용돼요.
          </p>

          <SpokeTable
            id="seoul-list"
            title="서울 조정대상지역 25개 자치구"
            subtitle="2025.10.16~ 적용, 국토교통부 고시"
            headers={['구분', '자치구']}
            rows={[
              ['강남권', '강남구, 서초구, 송파구, 강동구'],
              ['도심권', '용산구, 종로구, 중구, 성동구, 광진구'],
              ['서남권', '마포구, 영등포구, 동작구, 관악구, 양천구, 강서구, 구로구, 금천구'],
              ['동북권', '성북구, 노원구, 도봉구, 강북구, 동대문구, 중랑구'],
              ['서북권', '서대문구, 은평구'],
            ]}
          />

          <TipBox title="서울 전역 지정의 의미">
            <p className="mb-0 leading-relaxed">
              서울 어디에 주택이 있든 다주택자라면 동일한 중과 규제를 받아요. 강남이든 노원이든 세금 구조가 같다는 뜻이에요. 차이가 나는 건 양도차익 규모와 보유 기간에 따른 세액뿐이에요.
            </p>
          </TipBox>

          <SpokeLinks
            title="서울 조정대상지역 관련 글"
            items={[
              { num: '01', heading: '중과 전후 세액 비교', desc: '실제 사례로 기본세율과 중과세율 세금 차이를 계산', href: '/w/다주택-양도세-중과-전후-세액-비교' },
              { num: '02', heading: '다주택 매도 순서 전략', desc: '어떤 집부터 팔아야 절세가 되는지 정리', href: '/w/다주택-매도-순서-전략-절세' },
            ]}
          />
        </>
      ),
      pasBridge: {
        href: '/w/중과-유예-연혁-종료일-확정',
        question: '중과 유예는 언제 끝나나요?',
        answer: (<>중과 유예는 <strong>2026년 5월 9일</strong>에 종료 확정돼 있어요</>),
        buttonText: '유예 종료일 확인 →',
      },
    },

    // ===== SECTION 04: 경기 조정대상지역 =====
    {
      id: 'sec-gyeonggi',
      number: 'SECTION 04',
      heading: '경기 조정대상지역 목록은 어디인가요?',
      subtitle: '과천, 광명, 성남 등 12곳이 지정돼 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            경기도는 12개 지역이 조정대상지역으로 지정돼 있어요. 서울 인접 지역이나 집값 상승이 뚜렷한 지역 위주예요. 수원은 영통구·장안구·팔달구 3개 구가 지정됐고, 성남은 분당구·수정구·중원구 전부가 해당돼요. 같은 시라도 구에 따라 지정 여부가 다르니까 정확한 주소를 기준으로 확인해야 해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            경기도 나머지 지역(용인 처인구·기흥구, 수원 권선구, 고양, 김포, 파주, 남양주 등)은 조정대상지역에서 해제된 상태예요. 해제된 지역의 주택은 다주택자라도 양도세 중과 대상이 아니에요. 그래서 같은 경기도라도 지역에 따라 세금 구조가 완전히 달라요.
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
            { icon: '1', label: '정확한 주소 확인', sub: '시·구 단위까지' },
            { icon: '2', label: '지정 여부 대조', sub: '위 12곳 목록' },
            { icon: '3', label: '지정 시점 확인', sub: '취득일과 비교' },
            { icon: '4', label: '세금 영향 판단', sub: '양도세·취득세' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            경기도 주택을 보유하고 있다면 정확한 구·시 단위로 조정대상지역 여부를 확인하는 게 중요해요. 특히 수원·성남·용인처럼 같은 시 안에서도 구별로 지정 여부가 다른 경우가 있으니까, <a href="/w/양도세-잔금일-기준-계약일-판단" className="text-[#4A7AB5] underline">양도 시기 판단</a>과 함께 꼼꼼히 따져야 해요.
          </p>
        </>
      ),
      pasBridge: {
        href: '/w/양도세-잔금일-기준-계약일-판단',
        question: '유예 기간 안에 팔려면 잔금일이 중요한가요?',
        answer: (<>양도 시기는 계약일이 아니라 <strong>잔금일 기준</strong>이에요</>),
        buttonText: '잔금일 기준 확인 →',
      },
    },

    // ===== STEP 05: 해제 지역과 양도세 영향 =====
    {
      id: 'sec-release',
      number: 'STEP 05',
      heading: '조정대상지역 해제 지역은 양도세에 어떤 영향이 있나요?',
      subtitle: '지방 대부분과 경기 일부가 해제돼서 중과 대상이 아니에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            2022~2023년에 걸쳐 전국 대부분의 조정대상지역이 해제됐어요. 문재인 정부 시절에는 세종, 대전, 대구, 부산, 수원 전역 등 광범위하게 지정돼 있었는데, 부동산 시장 침체로 단계적으로 해제된 거예요. 2025년 10월에 서울 전역과 경기 일부가 다시 지정됐지만, 지방은 여전히 대부분 해제 상태예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            해제된 지역의 주택은 다주택자가 팔더라도 양도세 중과가 적용되지 않아요. 기본세율(6~45%)로 양도할 수 있고, 장기보유특별공제도 받을 수 있어요. 중과 유예와 관계없이 항상 기본세율이 적용되는 거예요. 그래서 해제 지역 주택을 보유한 다주택자는 상대적으로 세금 부담이 적어요.
          </p>

          <SpokeTable
            id="release-list"
            title="주요 조정대상지역 해제 현황"
            subtitle="2022~2023년 단계적 해제, 국토교통부"
            headers={['해제 시기', '해제 지역', '비고']}
            rows={[
              ['2022.9', '세종특별자치시 전역', '지방 첫 해제'],
              ['2022.11', '대전 전역, 충북 청주시', '충청권 해제'],
              ['2023.1', '대구 수성구, 부산 해운대구 등', '영남권 해제'],
              ['2023.1', '고양, 남양주, 화성, 김포 등', '경기 외곽 해제'],
            ]}
          />

          <WarnBox>
            <p className="mb-0 leading-relaxed">
              해제 지역이라도 <strong>취득 당시</strong>에 조정대상지역이었다면 일부 규제가 남아 있을 수 있어요. 예를 들어 취득 시 조정지역이었던 주택을 2년 이상 거주하지 않고 팔면 1주택 비과세 요건을 충족하지 못할 수 있어요. 취득 시점의 지역 지정 여부도 함께 확인하세요.
            </p>
          </WarnBox>

          <TipBox title="해제 지역 주택 처분 전략">
            <p className="mb-0 leading-relaxed">
              해제 지역 주택은 중과 걱정이 없으니까 급하게 팔 필요가 없어요. 오히려 조정대상지역 주택을 유예 기간 내에 먼저 처분하고, 해제 지역 주택은 나중에 양도하는 게 절세에 유리해요. 구체적인 매도 순서는 <a href="/w/다주택-매도-순서-전략-절세" className="text-[#4A7AB5] underline">다주택 매도 순서 전략</a>에서 확인할 수 있어요.
            </p>
          </TipBox>

          <SpokeLinks
            title="해제 지역 관련 글"
            items={[
              { num: '01', heading: '증여 vs 양도 비교', desc: '부담부증여까지 포함한 세금 비교', href: '/w/다주택-증여-양도-비교-부담부증여' },
              { num: '02', heading: '중과 유예 종료 후 전망', desc: '유예 종료 후 시장 영향과 대응 전략', href: '/w/중과-유예-종료-부동산-시장-전망' },
            ]}
          />
        </>
      ),
      bridgeCTA: {
        href: '/w/다주택-매도-순서-전략-절세',
        badge: '전략',
        title: '어떤 집부터 팔아야 절세가 될까?',
        desc: '다주택 매도 순서와 절세 전략 확인하기',
        icon: 'calc',
      },
    },

    // ===== FAQ =====
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
      question: '조정대상지역 지정과 해제는 얼마나 자주 바뀌나요?',
      answer: '정해진 주기는 없어요. 국토교통부 장관이 주거정책심의위원회 심의를 거쳐 수시로 지정·해제를 결정해요. 부동산 시장 과열 시 지정하고, 시장이 안정되면 해제하는 방식이에요. 최근에는 2023년 1월 대규모 해제 후 2025년 10월에 서울·경기를 다시 지정했어요.',
    },
    {
      question: '취득 시 조정대상지역이었다가 해제된 주택은 어떻게 되나요?',
      answer: '양도세 중과 여부는 양도 시점의 지정 상태를 기준으로 판단해요. 취득 당시 조정지역이었더라도 양도 시점에 해제돼 있으면 중과 대상이 아니에요. 다만 1주택 비과세의 2년 거주 요건은 취득 시점을 기준으로 하기 때문에, 취득 당시 조정지역이었다면 거주 요건을 확인해야 해요.',
    },
  ],

  relatedSpokes: [
    { badge: '개념', title: '양도세 중과 뜻 기본세율 중과세율 비교', desc: '기본세율과 중과세율 차이 한눈에 비교', href: '/w/양도세-중과-뜻-기본세율-중과세율-비교' },
    { badge: '연혁', title: '양도세 중과 유예 연혁 종료일 확정', desc: '유예 제도 시작부터 종료일까지', href: '/w/중과-유예-연혁-종료일-확정' },
    { badge: '시기', title: '양도세 잔금일 기준 계약일 차이', desc: '잔금일과 계약일의 관계 정리', href: '/w/양도세-잔금일-기준-계약일-판단' },
    { badge: '전략', title: '다주택 매도 순서 전략 절세', desc: '어떤 집부터 팔아야 절세가 되는지', href: '/w/다주택-매도-순서-전략-절세' },
  ],

  sources: [
    { name: '주택법 제63조의2(조정대상지역의 지정)', url: 'https://law.go.kr/법령/주택법/제63조의2', org: '국가법령정보센터' },
    { name: '주택시장 안정화 대책(2025.10.15)', url: 'https://www.molit.go.kr/USR/NEWS/m_71/dtl.jsp?id=95090282', org: '국토교통부' },
    { name: '양도소득세 기본정보 세율', url: 'https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2312&cntntsId=7711', org: '국세청' },
  ],
}

export default data
