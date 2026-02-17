import type { SpokeData } from '@/data/spoke/types'
import {
  FormulaBox,
  SpokeRateBars,
  SpokeWarnBox,
  SpokeCompareCards,
  SpokeTable,
  SpokeFlow,
  SpokeChecklist,
  SpokeTimeline,
  TipBox,
  SpokeLinks,
} from '@/components/spoke/SpokeBlocks'
import 이주택자비과세Checker from '@/components/checkers/이주택자비과세Checker'

// ── 양도세 기본세율표 ──
const RATE_TABLE_ROWS = [
  ['1,400만원 이하', '6%', '-'],
  ['1,400만~5,000만원', '15%', '126만원'],
  ['5,000만~8,800만원', '24%', '576만원'],
  ['8,800만~1.5억원', '35%', '1,544만원'],
  ['1.5억~3억원', '38%', '1,994만원'],
  ['3억~5억원', '40%', '2,594만원'],
  ['5억~10억원', '42%', '3,594만원'],
  ['10억원 초과', '45%', '6,594만원'],
]

const data: SpokeData = {
  slug: '2주택자-양도세-비과세-조건-세율-계산',

  meta: {
    title: '2주택자 양도세 비과세 조건 세율 | 일시적 2주택 비과세 요건 계산',
    description: '2주택자도 조건만 맞으면 양도세 0원이 된다는 거 아시나요? 일시적 2주택 비과세 요건부터 세율 구간, 계산 방법까지 알려드려요.',
    keywords: ['2주택자 양도세 비과세', '일시적 2주택 비과세 요건', '2주택자 양도세 세율', '2주택자 양도세 계산'],
    ogTitle: '2주택자 양도세 비과세 조건 세율 | 일시적 2주택 비과세 요건 계산 | 머니위키',
    ogDescription: '일시적 2주택 비과세 3년 요건, 세율 구간, 계산 방법까지 한 번에',
  },

  hub: {
    url: '/w/다주택양도세-중과유예-세율-절세-전략',
    name: '다주택양도세 중과유예 세율 절세 전략',
  },

  breadcrumb: ['세금', '양도소득세', '2주택자 양도세'],

  summary3: [
    <><strong>일시적 2주택 특례</strong>: 3년 내 종전주택 처분 시 비과세 (12억원 이하)</>,
    <>비과세 미충족 시 기본세율 <strong>6~45%</strong>, 2026.5.10부터 +20%p 중과</>,
    <>양도세 = (양도가액 - 취득가액 - 필요경비 - 장특공제 - 250만원) × 세율</>,
  ],

  sourceBar: {
    badge: '법령 출처',
    name: '소득세법 제104조 · 국세청 양도소득세',
    date: '2026.02',
  },

  prevNext: {
    prev: { title: '양도세 중과 뜻 기본세율 중과세율 비교', href: '/w/양도세-중과-뜻-기본세율-중과세율-비교' },
    next: { title: '일시적 2주택 양도세 비과세 기간 처분 조건', href: '/w/일시적-2주택-양도세-비과세-기간-처분' },
  },

  stickyBar: {
    topLabel: '비과세 3년 기한',
    value: '신규주택 취득일 기준',
    buttonText: '비과세 요건 바로 체크 →',
    scrollTo: '#checker',
  },

  hero: {
    badge: '2026년 기준',
    h1: (<>2주택자 양도세 <span className="text-[#1E3A5F]">비과세 조건 세율</span> | 일시적 2주택 비과세 요건 계산</>),
    intro: (
      <p className="text-base text-neutral-500 leading-relaxed">
        집을 갈아타려다 2주택이 됐는데 양도세 폭탄이 걱정되죠?
        <strong className="text-neutral-800"> 신규주택 취득 후 3년 안에 종전주택을 팔면 양도세가 0원이에요.</strong>
        비과세 3가지 요건과 미충족 시 적용되는 세율, 실제 계산 방법까지 순서대로 정리했어요.
      </p>
    ),
    quickAnswer: {
      title: '2주택자도 양도세 비과세를 받을 수 있나요?',
      body: '일시적 2주택 특례로 받을 수 있어요. 종전주택을 1년 이상 보유한 뒤 신규주택을 취득하고, 3년 이내에 종전주택을 팔면 양도가액 12억원까지 비과세예요. 조정대상지역은 2년 거주 요건도 충족해야 해요.',
      hook: '아래 체커에서 내 상황이 비과세 요건에 해당하는지 바로 확인해 보세요 →',
    },
    hubCTA: { badge: '전체 전략', desc: '다주택 양도세 중과 유예·세율·절세 전략 전체 보기' },
  },

  toc: [
    { id: 'checker', label: '2주택자 비과세 요건 바로 체크' },
    { id: 'sec-condition', label: '2주택자 양도세 비과세 조건은 뭔가요?' },
    { id: 'sec-rate', label: '2주택자 양도세 세율은 얼마인가요?' },
    { id: 'sec-calc', label: '2주택자 양도세 계산 방법은 뭔가요?' },
    { id: 'sec-timing', label: '비과세 못 받을 때 절세 방법은 뭔가요?' },
    { id: 'sec-faq', label: '자주 묻는 질문' },
  ],

  sections: [
    // ── CHECK: 비과세 체커 ──
    {
      id: 'checker',
      number: 'CHECK',
      heading: '2주택자 비과세 요건 바로 체크',
      subtitle: '종전주택 보유·거주·처분 기한 3가지를 선택하면 비과세 여부를 알려드려요',
      content: (<이주택자비과세Checker />),
    },

    // ── S1: 비과세 조건 ──
    // 시각: FormulaBox + SpokeRateBars
    // 전환: B. 호기심형
    {
      id: 'sec-condition',
      number: 'SECTION 02',
      heading: '2주택자 양도세 비과세 조건은 뭔가요?',
      subtitle: '일시적 2주택 특례 3가지 요건을 모두 충족해야 해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            2주택자가 <a href="/w/일시적-2주택-양도세-비과세-기간-처분" className="text-[#4A7AB5] underline">일시적 2주택 비과세</a>를 받으려면 세 가지 요건을 동시에 충족해야 해요.
            첫째, 종전주택을 1년 이상 보유한 상태에서 신규주택을 취득해야 해요.
            1년 미만 보유 후 신규주택을 사면 특례 자체가 적용되지 않아요.
            2018년 9월 이전에는 1년 요건이 없었지만, 지금은 필수 조건이에요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            둘째, <a href="/w/조정대상지역-목록-서울-경기" className="text-[#4A7AB5] underline">조정대상지역</a> 내 종전주택은 2년 보유 + 2년 거주를 모두 채워야 해요.
            비조정대상지역은 2년 보유만으로 충분해요.
            셋째, 신규주택 취득일부터 3년 이내에 종전주택의 잔금을 수령해야 비과세가 확정돼요.
            이 세 가지 중 하나라도 놓치면 비과세가 적용되지 않아요.
          </p>

          <FormulaBox lines={[
            { text: '// 일시적 2주택 비과세 3요건 공식', comment: true },
            { text: '1. 종전주택 1년+ 보유 → 신규주택 취득', numbered: true },
            { text: '2. 종전주택 2년 보유 + (조정지역: 2년 거주 추가)', numbered: true },
            { text: '3. 신규주택 취득일 + 3년 이내 종전주택 잔금 수령', numbered: true },
            { text: '⇒ 3요건 모두 충족 + 양도가액 12억 이하 = 비과세 0원', comment: true },
          ]} />

          <SpokeRateBars bars={[
            { label: '12억 이하: 비과세', rate: '0원', width: '0%' },
            { label: '15억(12억 초과 3억): 과세 비율', rate: '약 20%', width: '20%' },
            { label: '20억(12억 초과 8억): 과세 비율', rate: '약 40%', width: '40%' },
            { label: '30억(12억 초과 18억): 과세 비율', rate: '약 60%', width: '60%' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            양도가액이 12억원을 초과하면 초과분에 대해서만 과세돼요. 예를 들어 15억원에 팔면 12억 초과분 3억원에 대해서만 세금이 부과되는 구조예요.
          </p>

          <SpokeLinks
            title="2주택자 비과세 더 알아보기"
            items={[
              { num: '01', heading: '일시적 2주택 비과세 기간·처분 조건', desc: '3년 처분 기한과 거주 요건 상세 정리', href: '/w/일시적-2주택-양도세-비과세-기간-처분' },
              { num: '02', heading: '조정대상지역 서울·경기 목록', desc: '2026년 조정대상지역 현황 확인', href: '/w/조정대상지역-목록-서울-경기' },
            ]}
          />
        </>
      ),
      pasBridge: {
        href: '/w/다주택양도세-중과유예-세율-절세-전략',
        question: '비과세 요건을 못 맞추면 세율이 얼마나 될까요?',
        answer: <>기본세율 6~45%가 적용되고, 2026년 5월 10일부터는 <strong>+20%p 중과</strong>가 재개돼요.</>,
        buttonText: '세율 구간 확인 →',
      },
    },

    // ── S2: 세율 ──
    // 시각: SpokeWarnBox + SpokeCompareCards
    // 전환: D. 화제 전환형
    {
      id: 'sec-rate',
      number: 'SECTION 03',
      heading: '2주택자 양도세 세율은 얼마인가요?',
      subtitle: '유예 기간이냐 아니냐에 따라 세율 차이가 최대 20%p예요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            비과세 요건에 해당하지 않으면 양도차익에 대해 세금을 내야 해요.
            현재는 2026년 5월 9일까지 다주택자 중과가 유예 중이라, 2주택자도 기본세율(6~45%)만 적용돼요.
            2026년 5월 10일부터는 조정대상지역 주택을 팔 때 기본세율에 20%p가 추가되어 최대 65%까지 올라가요.
            반면 비조정대상지역 주택은 다주택자라도 중과 대상이 아니에요.
          </p>

          <SpokeWarnBox title="2026.5.10부터 중과 재개 — 잔금일 확인 필수!">
            <p className="mb-0 leading-relaxed">
              양도 시기는 잔금일(대금 청산일) 기준이에요.
              계약일이 5월 9일 이전이더라도 잔금일이 5월 10일 이후면 중과세율이 적용돼요.
              매도 계획이 있다면 잔금일을 5월 9일 이전으로 확정해야 유예 혜택을 받을 수 있어요.
            </p>
          </SpokeWarnBox>

          <SpokeCompareCards
            cards={[
              {
                title: '유예 기간 중 (~2026.5.9)',
                subtitle: '기본세율 6~45%',
                items: [
                  '조정·비조정 모두 기본세율',
                  '장기보유특별공제 최대 30%',
                  '양도차익 2억 → 세금 약 5,956만원',
                  '잔금일이 5.9 이전이어야 적용',
                ],
              },
              {
                title: '유예 종료 후 (2026.5.10~)',
                subtitle: '조정지역 기본세율 +20%p',
                items: [
                  '조정지역: 최대 65%까지 적용',
                  '장기보유특별공제 배제',
                  '같은 조건 양도차익 2억 → 약 1.1억',
                  '비조정지역은 기본세율 유지',
                ],
              },
            ]}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            그런데 보유기간이 1년 미만이면 70%, 1~2년이면 60%의 단기 양도세율이 별도로 적용돼요.
            중과세율과 비교해서 더 높은 쪽이 적용되니 주의하세요.
          </p>

          <SpokeLinks
            title="세율 자세히 보기"
            items={[
              { num: '01', heading: '다주택 양도세 중과 전후 세액 비교', desc: '기본세율 vs 중과세율 실제 세금 차이 계산', href: '/w/다주택-양도세-중과-전후-세액-비교' },
              { num: '02', heading: '다주택 매도 순서 전략 절세', desc: '어떤 집부터 팔아야 세금이 줄어드는지 확인', href: '/w/다주택-매도-순서-전략-절세' },
            ]}
          />
        </>
      ),
      pasBridge: {
        href: '/w/다주택-양도세-중과-전후-세액-비교',
        question: '세율을 알겠는데, 실제로 얼마를 내는지 계산해 볼 수 있나요?',
        answer: <>양도가액에서 취득가액·공제·기본공제를 빼고 세율을 곱하면 돼요. <strong>공식과 예시</strong>는 아래에 정리했어요.</>,
        buttonText: '계산 방법 확인 →',
      },
    },

    // ── S3: 계산 방법 ──
    // 시각: SpokeTable + SpokeFlow
    // 전환: A. 독자 대변형
    {
      id: 'sec-calc',
      number: 'SECTION 04',
      heading: '2주택자 양도세 계산 방법은 뭔가요?',
      subtitle: '양도차익에서 장특공제·기본공제 빼고 세율 곱하면 나와요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            양도세 계산은 단계가 있지만 순서를 알면 어렵지 않아요.
            핵심은 양도가액에서 취득가액과 필요경비(취득세·중개보수 등)를 빼서 양도차익을 구하는 거예요.
            거기서 장기보유특별공제와 기본공제(연 250만원)를 더 빼면 과세표준이 나오고, 세율을 곱하면 최종 세액이 나와요.
            2주택자는 유예 기간 중 보유 3년 이상이면 연 2%씩 최대 30%까지 장특공제를 받을 수 있어요.
          </p>

          <SpokeFlow steps={[
            { icon: '1', label: '양도차익 계산', sub: '양도가액 - 취득가액 - 필요경비' },
            { icon: '2', label: '장특공제 차감', sub: '3년 이상 보유 시 연 2%, 최대 30%' },
            { icon: '3', label: '기본공제 차감', sub: '연 1회 250만원' },
            { icon: '4', label: '세율 적용', sub: '과세표준 × 세율 - 누진공제' },
            { icon: '5', label: '산출세액 확정', sub: '지방세(10%) 별도 납부' },
          ]} />

          <SpokeTable
            id="tbl-basic-rate"
            title="2주택자 양도소득세 기본세율표"
            subtitle="2026년 기준, 소득세법 제104조"
            headers={['과세표준', '세율', '누진공제']}
            rows={RATE_TABLE_ROWS}
            highlightCol={1}
          />

          <TipBox title="계산 예시: 8억 매도, 5억 취득, 10년 보유">
            <p className="mb-2 leading-relaxed">
              양도차익: 8억 - 5억 - 2,000만 = 2억 8,000만원
            </p>
            <p className="mb-2 leading-relaxed">
              장특공제: 2억 8,000만 × 20%(10년 × 2%) = 5,600만원
            </p>
            <p className="mb-2 leading-relaxed">
              과세표준: 2억 8,000만 - 5,600만 - 250만 = 2억 2,150만원
            </p>
            <p className="mb-0 leading-relaxed">
              산출세액: 2억 2,150만 × 38% - 1,994만 = 약 <strong>6,423만원</strong> (지방세 별도)
            </p>
          </TipBox>

          <p className="text-neutral-600 mb-4 leading-relaxed">
            실제 계산에는 필요경비 인정 범위, 분양권·입주권 주택 수 포함 여부 등 변수가 많아서 홈택스 양도세 자동계산기나 세무사 상담을 활용하는 게 정확해요.
          </p>
        </>
      ),
      pasBridge: {
        href: '/w/다주택-매도-순서-전략-절세',
        question: '비과세를 못 받는다면 절세 방법이 있을까요?',
        answer: <>유예 기간 안에 처분하거나 장특공제를 최대화하는 방법이 있어요. <strong>체크리스트</strong>로 정리했어요.</>,
        buttonText: '절세 방법 확인 →',
      },
    },

    // ── S4: 절세 방법 ──
    // 시각: SpokeChecklist + SpokeTimeline
    // 전환: 마지막 → bridgeCTA
    {
      id: 'sec-timing',
      number: 'SECTION 05',
      heading: '비과세 못 받을 때 절세 방법은 뭔가요?',
      subtitle: '유예 기간 활용 + 장특공제 + 잔금일 관리가 핵심이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            일시적 2주택 비과세를 받지 못하는 상황이라면 세금을 최소화하는 방법이 세 가지예요.
            첫 번째는 2026년 5월 9일 이전에 잔금을 수령해서 기본세율을 적용받는 거예요.
            같은 주택이라도 잔금일이 5월 9일 이전이냐 이후냐에 따라 세금이 수천만원에서 수억원까지 달라질 수 있어요.
            두 번째는 보유 기간을 늘려서 장기보유특별공제를 최대화하는 방법이에요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            세 번째는 <a href="/w/다주택-매도-순서-전략-절세" className="text-[#4A7AB5] underline">매도 순서 전략</a>으로 양도차익이 큰 주택을 먼저 파는 거예요.
            중과 유예 종료 전에 양도차익이 큰 주택부터 처분하면 절세 효과가 가장 커요.
            비과세 외에 <a href="/w/다주택양도세-중과유예-세율-절세-전략" className="text-[#4A7AB5] underline">다주택자 절세 전략</a> 전체 그림을 보는 것도 도움이 돼요.
          </p>

          <SpokeChecklist items={[
            { text: '잔금일 2026.5.9 이전으로 계약 확정', done: false, note: '핵심! 유예 혜택 확보' },
            { text: '일시적 2주택 3요건 충족 여부 재확인', done: false, note: '보유·거주·처분기한' },
            { text: '보유 기간 3년 이상 여부 확인', done: false, note: '장특공제 적용 시작' },
            { text: '조정대상지역 여부 확인', done: false, note: '중과 대상 판단' },
            { text: '양도차익 추정 계산 완료', done: false, note: '필요경비 꼼꼼히 챙기기' },
            { text: '홈택스 양도세 자동계산 확인', done: false, note: '세무사 상담 전 사전 파악' },
            { text: '양도 후 2개월 이내 예정신고', done: false, note: '기한 초과 시 가산세 발생' },
          ]} />

          <SpokeTimeline events={[
            { month: '계약 체결', title: '매매계약서 작성', desc: '잔금일 2026.5.9 이전으로 특약 명시', status: 'current', tag: '시작' },
            { month: '~2026.5.9', title: '잔금 수령 완료', desc: '이날까지 잔금을 수령해야 기본세율 적용', status: 'warning', tag: '기한' },
            { month: '잔금 후 2개월', title: '예정신고', desc: '양도소득세 예정신고 기한. 기한 초과 시 무신고가산세 20%', status: 'normal', tag: '신고' },
            { month: '다음 해 5월', title: '확정신고', desc: '다른 양도 건이 있으면 합산 확정신고 필요', status: 'normal', tag: '확정' },
          ]} />
        </>
      ),
      bridgeCTA: {
        href: '/w/다주택양도세-중과유예-세율-절세-전략',
        badge: '절세 전략',
        title: '다주택자 절세 전략 전체 보기',
        desc: '중과 유예·배제·공제 전략 한 번에 확인',
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
      question: '2주택자 양도세 신고 기한은 언제인가요?',
      answer: '잔금일(또는 등기접수일 중 빠른 날)이 속하는 달의 말일부터 <strong>2개월 이내</strong>에 예정신고를 해야 해요. 기한을 넘기면 무신고가산세(20%)와 납부불성실가산세가 붙어요.',
    },
    {
      question: '2주택자도 장기보유특별공제를 받을 수 있나요?',
      answer: '2026년 5월 9일까지 중과 유예 중에 양도하면 받을 수 있어요. 3년 이상 보유 시 연 2%씩, 최대 30%까지 공제돼요. 유예 종료 후 중과 대상이 되면 장특공제가 배제되니 유예 기간 내 매도가 유리해요.',
    },
    {
      question: '상속으로 2주택이 된 경우도 양도세를 내나요?',
      answer: '상속으로 받은 주택은 주택 수에서 제외돼요. 기존 1주택을 팔 때 1주택 비과세 요건(2년 보유·거주)을 충족하면 비과세가 적용돼요. 단 증여로 받은 주택은 주택 수에 포함되니 구분이 필요해요.',
    },
  ],

  relatedSpokes: [
    { badge: '처분', title: '일시적 2주택 양도세 비과세 기간 처분 조건', desc: '3년 처분 기한과 거주 요건 상세 정리', href: '/w/일시적-2주택-양도세-비과세-기간-처분' },
    { badge: '세액', title: '다주택 양도세 중과 전후 세액 비교', desc: '기본세율 vs 중과세율 실제 세금 차이 계산', href: '/w/다주택-양도세-중과-전후-세액-비교' },
    { badge: '전략', title: '다주택 매도 순서 전략 절세 방법', desc: '어떤 집부터 팔아야 세금이 줄어드는지 정리', href: '/w/다주택-매도-순서-전략-절세' },
    { badge: '지역', title: '2026 조정대상지역 서울 경기 목록', desc: '현재 조정대상지역과 중과 적용 여부 확인', href: '/w/조정대상지역-목록-서울-경기' },
  ],

  sources: [
    { name: '소득세법 제104조(양도소득세율)', url: 'https://law.go.kr/법령/소득세법/제104조', org: '국가법령정보센터' },
    { name: '소득세법 시행령 제167조의3(중과 한시 배제)', url: 'https://law.go.kr/법령/소득세법시행령/제167조의3', org: '국가법령정보센터' },
    { name: '양도소득세 기본정보 세율', url: 'https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2312&cntntsId=7711', org: '국세청' },
    { name: '1세대1주택 비과세', url: 'https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7707&mi=2308', org: '국세청' },
  ],
}

export default data
