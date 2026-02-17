import type { SpokeData } from '@/data/spoke/types'
import {
  SpokeTable,
  FormulaBox,
  SpokeWarnBox,
  RateCards,
  SpokeCompareCards,
  SpokeRateBars,
  SpokeFlow,
  SpokeChecklist,
  SpokeLinks,
} from '@/components/spoke/SpokeBlocks'
import SanjutaekYangdoseChecker from '@/components/checkers/SanjutaekYangdoseChecker'

// --- Table data ---
const SURCHARGE_RATE_ROWS = [
  ['1,400만원 이하', '6%', '36%'],
  ['1,400만~5,000만원', '15%', '45%'],
  ['5,000만~8,800만원', '24%', '54%'],
  ['8,800만~1.5억원', '35%', '65%'],
  ['1.5억~3억원', '38%', '68%'],
  ['3억~5억원', '40%', '70%'],
  ['5억~10억원', '42%', '72%'],
  ['10억원 초과', '45%', '75%'],
]

const data: SpokeData = {
  slug: '3주택자-양도세-중과세율-계산-비과세',

  meta: {
    // title 3대 원칙: ①롱테일|연관롱테일 일관성 ②매끄러운 흐름 ③포털 실제 검색어
    title: '3주택자 양도세 중과세율 계산 방법 | 비과세 조건 주택 수 제외',
    description: '3주택자라서 비과세는 포기했다고 하시나요? 상속·임대·지방 저가 주택은 주택 수에서 빠져서 비과세 경로가 열릴 수 있어요. 3주택자 양도세 중과세율 계산법과 주택 수 제외 조건을 알려드려요.',
    keywords: ['3주택자 양도세 중과세율', '3주택자 양도세 계산', '3주택자 양도세 비과세', '3주택자 주택 수 제외 조건'],
    ogTitle: '3주택자 양도세 중과세율 계산 방법 | 비과세 조건 주택 수 제외 | 머니위키',
    ogDescription: '3주택 중과 +30%p, 계산법과 비과세 조건을 확인하세요.',
  },

  hub: {
    url: '/w/다주택양도세-중과유예-세율-절세-전략',
    name: '다주택 양도세 중과유예 세율 절세 전략',
  },

  breadcrumb: ['세금', '양도소득세', '3주택자 양도세'],

  summary3: [
    <>3주택자 조정대상지역 주택 매도 시 <strong>기본세율 +30%p</strong> 중과 적용</>,
    <><strong>2026년 5월 9일까지</strong> 중과 유예, 기본세율로 장특공제까지 가능</>,
    <>상속·임대·지방 저가 주택은 주택 수 제외 → <strong>비과세 경로</strong> 열려요</>,
  ],

  sourceBar: {
    badge: '법령 출처',
    name: '소득세법 제104조 · 시행령 제167조의3',
    date: '2026.02',
  },

  prevNext: {
    prev: { title: '2주택자 양도세 비과세 조건 세율과 계산 방법', href: '/w/2주택자-양도세-비과세-조건-세율-계산' },
    next: { title: '다주택자 양도세 중과 배제 대상 주택과 신고 방법', href: '/w/다주택자-양도세-중과-배제-대상-주택-신고' },
  },

  stickyBar: {
    topLabel: '3주택자 중과세율',
    value: '최대 75%',
    buttonText: '내 세금 계산하기 →',
    scrollTo: '#checker',
  },

  hero: {
    badge: '2026년 기준',
    h1: (<>3주택자 양도세 <span className="text-[#1E3A5F]">중과세율</span> 계산 방법 | 비과세 조건 주택 수 제외</>),
    intro: (
      <p className="text-base text-neutral-500 leading-relaxed">
        "3주택이면 무조건 중과라서 비과세는 불가능하다"고 알고 계시죠? 꼭 그렇진 않아요.
        상속주택이나 지방 저가 주택은 주택 수에서 빠져서 세법상 주택 수가 줄어들 수 있어요.
        중과세율 +30%p가 실제로 얼마인지, 비과세 경로는 있는지 순서대로 정리했어요.
      </p>
    ),
    quickAnswer: {
      title: '3주택자 양도세 중과세율은 얼마인가요?',
      body: '조정대상지역 3주택 이상 보유자가 주택을 팔면 기본세율(6~45%)에 30%p가 추가돼요. 최대 75%까지 올라가고, 장기보유특별공제도 배제돼요. 2026년 5월 9일까지는 중과 유예 중이라 기본세율만 적용돼요.',
      hook: '아래에서 내 상황에 맞는 세금을 바로 계산해 보세요 →',
    },
    hubCTA: { badge: '전체 가이드', desc: '다주택자 양도세 중과·유예·절세 전략 모두 보기' },
  },

  toc: [
    { id: 'checker', label: '3주택자 양도세 직접 계산해 보기' },
    { id: 'sec-rate', label: '3주택자 중과세율은 2주택자와 얼마나 다른가요?' },
    { id: 'sec-table', label: '3주택자 양도세 계산 순서는 어떻게 되나요?' },
    { id: 'sec-calc', label: '3주택자 양도세 비과세 조건이 있나요?' },
    { id: 'sec-strategy', label: '3주택자 절세 전략은 어떻게 세우나요?' },
    { id: 'sec-faq', label: '자주 묻는 질문' },
  ],

  sections: [
    // ── Checker ──
    {
      id: 'checker',
      number: 'CHECK',
      heading: '3주택자 양도세 직접 계산해 보기',
      subtitle: '양도차익과 보유기간을 선택하면 유예 기간 vs 중과 적용 세금을 바로 비교해요',
      content: (<SanjutaekYangdoseChecker />),
    },

    // ── S1: CompareCards + RateBars ──
    {
      id: 'sec-rate',
      number: 'SECTION 02',
      heading: '3주택자 중과세율은 2주택자와 얼마나 다른가요?',
      subtitle: '10%p 차이가 실제 세금에선 수천만원 차이로 벌어져요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            2주택자는 기본세율에 20%p가 추가되고, 3주택 이상은 30%p가 추가돼요.
            10%p 차이처럼 보이지만 양도차익이 3억원이라면 세금으로 3,000만원 차이가 날 수 있어요.
            유예 기간(~2026.5.9) 중에는 두 경우 모두 기본세율만 적용되고 장기보유특별공제도 받을 수 있어요.
            유예가 끝나면 장특공제까지 배제되니까 실질 세 부담은 세율 차이보다 훨씬 커지는 구조예요.
          </p>

          <SpokeCompareCards
            cards={[
              {
                title: '2주택자',
                subtitle: '기본세율 +20%p',
                items: [
                  '최대 세율 65% (45%+20%p)',
                  '장기보유특별공제 배제',
                  '유예 기간: 기본세율 적용',
                  '조정대상지역 한정 적용',
                ],
              },
              {
                title: '3주택 이상',
                subtitle: '기본세율 +30%p',
                items: [
                  '최대 세율 75% (45%+30%p)',
                  '장기보유특별공제 배제',
                  '유예 기간: 기본세율 적용',
                  '조정대상지역 한정 적용',
                ],
                recommended: true,
                recLabel: '이 글 대상',
              },
            ]}
          />

          <p className="text-neutral-600 mt-4 mb-3 leading-relaxed">
            과세표준 구간별로 기본세율 대비 중과세율이 얼마나 높아지는지 비율로 보면 체감이 더 쉬워요.
          </p>

          <SpokeRateBars
            bars={[
              { label: '1,400만원 이하 (기본6% → 중과36%)', rate: 36, width: 36 },
              { label: '1.5억 이하 (기본35% → 중과65%)', rate: 65, width: 65 },
              { label: '3억 이하 (기본38% → 중과68%)', rate: 68, width: 68 },
              { label: '10억 초과 (기본45% → 중과75%)', rate: 75, width: 75 },
            ]}
          />

          <SpokeLinks
            title="다주택 양도세 더 알아보기"
            items={[
              { num: '01', heading: '2주택자 양도세 비과세 조건', desc: '2주택자 비과세 요건과 세율 정리', href: '/w/2주택자-양도세-비과세-조건-세율-계산' },
              { num: '02', heading: '양도세 중과 뜻 기본세율 비교', desc: '중과세율 구조를 처음부터 이해하기', href: '/w/양도세-중과-뜻-기본세율-중과세율-비교' },
            ]}
          />
        </>
      ),
      pasBridge: {
        href: '/w/다주택-양도세-중과-전후-세액-비교',
        question: '세율 차이는 알겠는데, 실제 세금으로는 얼마나 차이 날까요?',
        answer: <>양도차익 3억 기준으로 유예 시 약 9,000만원, 중과 적용 시 약 1억 6,000만원이에요. <strong>7,000만원 차이</strong>가 나요.</>,
        buttonText: '중과 전후 세액 비교 보기 →',
      },
    },

    // ── S2: Table + TipBox ──
    {
      id: 'sec-table',
      number: 'SECTION 03',
      heading: '3주택자 양도세 계산 순서는 어떻게 되나요?',
      subtitle: '유예 기간과 중과 적용 시 계산 순서가 달라져요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            3주택자 양도세 계산의 핵심은 유예 기간인지 여부예요.
            유예 기간(2026.5.9 이전 잔금)이면 기본세율에 장기보유특별공제까지 받을 수 있어요.
            유예가 끝나면 장특공제가 0이 되고 기본세율에 30%p가 더해지니까 이중으로 부담이 커져요.
            양도 시기는 잔금일 기준이고, 등기 이전이 먼저면 <a href="/w/양도세-잔금일-기준-계약일-판단" className="text-[#4A7AB5] underline">등기접수일</a>이 기준이에요.
          </p>

          <SpokeTable
            id="tbl-surcharge"
            title="3주택자 양도세 과세표준 구간별 세율"
            subtitle="조정대상지역 기준, 소득세법 제104조"
            headers={['과세표준', '기본세율', '중과세율(+30%p)']}
            rows={SURCHARGE_RATE_ROWS}
            highlightCol={2}
          />

          <SpokeWarnBox title="장기보유특별공제 배제가 더 크게 작용해요">
            <p className="leading-relaxed">
              중과 시 세 부담이 커지는 이유는 세율 +30%p만이 아니에요.
              유예 기간에는 10년 보유 주택에 최대 20%(일반 공제율) 장특공제를 받지만,
              중과 적용 시에는 장특공제가 완전히 0이 돼요.
              양도차익이 클수록 공제 배제의 타격이 훨씬 크게 느껴져요.
            </p>
          </SpokeWarnBox>

          <SpokeLinks
            title="양도 시기 관련 더 보기"
            items={[
              { num: '01', heading: '양도세 잔금일 기준 계약일 판단', desc: '잔금일과 등기접수일 중 기준일 결정법', href: '/w/양도세-잔금일-기준-계약일-판단' },
              { num: '02', heading: '중과 유예 연혁과 종료일', desc: '2022년부터 이어진 유예 제도 전체 흐름', href: '/w/중과-유예-연혁-종료일-확정' },
            ]}
          />
        </>
      ),
      pasBridge: {
        href: '/w/다주택자-양도세-중과-배제-대상-주택-신고',
        question: '3주택자도 비과세를 받을 수 있는 방법이 있을까요?',
        answer: <>있어요. 상속주택처럼 주택 수에서 빠지는 주택이 있으면 세법상 <strong>주택 수가 줄어들어</strong> 비과세 경로가 열려요.</>,
        buttonText: '주택 수 제외 조건 확인 →',
      },
    },

    // ── S3: FormulaBox + SpokeFlow ──
    {
      id: 'sec-calc',
      number: 'SECTION 04',
      heading: '3주택자 양도세 비과세 조건이 있나요?',
      subtitle: '직접 비과세보다는 주택 수 제외를 활용하는 방식이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            3주택자가 직접 1세대 1주택 비과세를 받기는 어려워요.
            하지만 세법상 주택 수 산정에서 제외되는 주택이 있으면 가능해요.
            상속주택(5년 이내 1채), 수도권 밖 기준시가 3억원 이하 주택, 장기임대 등록 주택 등은
            주택 수에서 빠져요.
            예를 들어 3채 중 1채가 상속주택이면 세법상 2주택자가 되고, 일시적 2주택 비과세도 검토할 수 있어요.
          </p>

          <FormulaBox lines={[
            { text: '// 3주택자 → 비과세 경로', comment: true },
            { text: '1. 주택 수 제외 대상 확인', numbered: true },
            { text: '   상속주택(5년 이내 1채) / 수도권 밖 3억 이하 / 장기임대 등록', numbered: false },
            { text: '2. 제외 후 세법상 주택 수 = 2택 이하면', numbered: true },
            { text: '   일시적 2주택 비과세 또는 1주택 비과세 검토 가능', numbered: false },
            { text: '3. 남은 주택 2년 보유(조정지역 2년 거주) 충족 시', numbered: true },
            { text: '   12억 이하: 비과세, 12억 초과: 고가주택 과세', numbered: false },
          ]} />

          <p className="text-neutral-600 mt-4 mb-4 leading-relaxed">
            주택 수 제외 외에 <a href="/w/다주택자-양도세-중과-배제-대상-주택-신고" className="text-[#4A7AB5] underline">중과 배제 대상 주택</a>을 먼저 처분하는 전략도 있어요.
            수도권 밖 기준시가 3억원 이하 주택이나 장기일반민간임대주택은 중과 배제 대상이에요.
            이 주택을 먼저 팔아서 주택 수를 줄인 뒤 나머지를 양도하면 전체 세 부담이 줄어들어요.
            어떤 주택을 먼저 팔지는 양도차익과 보유기간을 비교해서 결정해야 해요.
          </p>

          <SpokeFlow
            steps={[
              { icon: '1', label: '주택 수 제외 대상 파악', sub: '상속·임대·지방 저가' },
              { icon: '2', label: '중과 배제 주택 먼저 매도', sub: '기본세율 적용 가능' },
              { icon: '3', label: '주택 수 2채 이하로 축소', sub: '비과세 검토 시작' },
              { icon: '4', label: '최종 1주택 비과세 완성', sub: '2년 보유+거주 필요' },
            ]}
          />
        </>
      ),
      pasBridge: {
        href: '/w/다주택-매도-순서-전략-절세',
        question: '어떤 집부터 팔아야 세금을 가장 많이 아낄 수 있을까요?',
        answer: <>중과 배제 대상 → 저가 주택 → 고가 주택 순서가 기본이에요. <strong>양도차익과 보유기간</strong>을 함께 따져야 해요.</>,
        buttonText: '다주택 매도 순서 전략 보기 →',
      },
    },

    // ── S4: SpokeChecklist + RateCards ──
    {
      id: 'sec-strategy',
      number: 'SECTION 05',
      heading: '3주택자 절세 전략은 어떻게 세우나요?',
      subtitle: '유예 기간 활용 여부가 핵심이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            3주택자 절세의 출발점은 2026년 5월 9일이에요.
            이 날까지 잔금을 치르면 기본세율과 장기보유특별공제 혜택을 모두 받을 수 있어요.
            유예가 끝난 뒤에는 세 부담이 크게 늘어나니까, 지금 매도를 검토하고 있다면 잔금일 역산이 먼저예요.
            아래 체크리스트로 내 상황을 점검해 보세요.
          </p>

          <SpokeChecklist
            items={[
              { text: '조정대상지역 주택 여부 확인 (서울 전역, 경기 12곳)', done: false },
              { text: '주택 수 제외 대상 있는지 확인 (상속·임대·지방 저가)', done: false },
              { text: '잔금일이 2026년 5월 9일 이전인지 확인', done: false, note: '계약일 아닌 잔금일 기준' },
              { text: '장기보유특별공제율 확인 (보유기간 3년 이상부터 적용)', done: false },
              { text: '중과 배제 대상 주택 먼저 처분할지 검토', done: false },
              { text: '증여 vs 양도 세금 비교 (부담부증여 포함)', done: false },
            ]}
          />

          <p className="text-neutral-600 mt-5 mb-4 leading-relaxed">
            유예 기간 활용, 중과 배제, 주택 수 제외 세 가지를 조합하면 세 부담을 크게 줄일 수 있어요.
          </p>

          <RateCards
            cards={[
              { value: '기본세율', label: '유예 기간 내 매도', lines: ['~2026.5.9 잔금', '장특공제 최대 20% 적용'], highlight: '추천', highlightColor: 'navy' as const },
              { value: '+30%p', label: '유예 종료 후 매도', lines: ['2026.5.10 잔금~', '장특공제 0%, 최대 75%'], highlight: '주의', highlightColor: 'orange' as const },
            ]}
          />

          <SpokeLinks
            title="절세 전략 더 알아보기"
            items={[
              { num: '01', heading: '다주택 매도 순서 전략과 절세', desc: '어떤 집부터 팔면 세금이 줄어드는지', href: '/w/다주택-매도-순서-전략-절세' },
              { num: '02', heading: '다주택 증여 vs 양도 비교 부담부증여', desc: '부담부증여 세금 구조와 유리한 경우', href: '/w/다주택-증여-양도-비교-부담부증여' },
            ]}
          />
        </>
      ),
      bridgeCTA: {
        href: '/w/다주택양도세-중과유예-세율-절세-전략',
        badge: '절세 가이드',
        title: '다주택자 절세 전략 전체 보기',
        desc: '중과 유예·배제·공제 활용법 모두 정리했어요',
        icon: 'grid',
        primary: true,
      },
    },

    // ── FAQ ──
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
      question: '3주택자 양도세 지방소득세는 얼마인가요?',
      answer: '양도소득세의 <strong>10%</strong>를 지방소득세로 추가 납부해야 해요. 예를 들어 양도세가 1억원이면 지방소득세 1,000만원이 더 나와서 실제 납부액은 1억 1,000만원이에요.',
    },
    {
      question: '3주택자 양도세 비조정대상지역 주택도 중과되나요?',
      answer: '비조정대상지역의 주택은 3주택 이상이어도 중과 대상이 아니에요. 기본세율(6~45%)이 적용되고, 장기보유특별공제도 정상 적용돼요. 다만 종합부동산세에서는 불이익이 있을 수 있어요.',
    },
    {
      question: '3주택자도 유예 기간 중에 장기보유특별공제를 받을 수 있나요?',
      answer: '네, 2026년 5월 9일까지 잔금을 치르면 장기보유특별공제를 받을 수 있어요. 보유기간 3년 이상부터 연 2%씩, 최대 20%까지 공제돼요. 유예 종료 후 중과 적용 시에는 공제가 완전히 배제돼요.',
    },
  ],

  relatedSpokes: [
    { badge: '계산', title: '다주택 양도세 중과 전후 세액 비교', desc: '유예 기간과 중과 적용 시 실제 세금 차이', href: '/w/다주택-양도세-중과-전후-세액-비교' },
    { badge: '전략', title: '다주택 매도 순서 전략과 절세', desc: '어떤 집부터 팔아야 세금을 아낄 수 있는지', href: '/w/다주택-매도-순서-전략-절세' },
    { badge: '배제', title: '다주택자 양도세 중과 배제 대상 주택', desc: '중과에서 빠지는 주택 종류와 신고 방법', href: '/w/다주택자-양도세-중과-배제-대상-주택-신고' },
  ],

  sources: [
    { name: '소득세법 제104조(세율)', url: 'https://law.go.kr/법령/소득세법/제104조', org: '국가법령정보센터' },
    { name: '소득세법 시행령 제167조의3(다주택자 중과 한시 배제)', url: 'https://law.go.kr/법령/소득세법시행령/제167조의3', org: '국가법령정보센터' },
    { name: '양도소득세 세율 안내', url: 'https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2312&cntntsId=7711', org: '국세청' },
  ],
}

export default data
