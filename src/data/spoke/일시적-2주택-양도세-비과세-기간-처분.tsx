import type { SpokeData } from '@/data/spoke/types'
import {
  FormulaBox,
  SpokeTable,
  SpokeRateBars,
  SpokeCompareCards,
  SpokeStepCards,
  TipBox,
  SpokeFlow,
  SpokeChecklist,
  SpokeLinks,
} from '@/components/spoke/SpokeBlocks'
import 일시적2주택Checker from '@/components/checkers/일시적2주택Checker'

// --- 테이블 데이터 ---
const PERIOD_HISTORY_ROWS = [
  ['2018.9.14 ~ 2019.12.16', '조정→조정 2년, 그 외 3년'],
  ['2019.12.17 ~ 2022.5.9', '조정→조정 1년 (강화)'],
  ['2022.5.10 ~ 2022.12.31', '조정→조정 2년 (완화)'],
  ['2023.1.12 ~ 현재', '지역 구분 없이 3년 (통일)'],
]

const data: SpokeData = {
  slug: '일시적-2주택-양도세-비과세-기간-처분',

  meta: {
    // ── title 3대 원칙: ①롱테일|연관롱테일 일관성 ②매끄러운 흐름 ③포털 실제 검색어 ──
    // GOOD: '일시적 2주택 양도세 비과세 기간 처분 조건 | 신규주택 취득 후 3년 이내 종전주택 매도'
    title: '일시적 2주택 양도세 비과세 기간 처분 조건 | 신규주택 취득 후 3년 이내 종전주택 매도',
    description: '이사 때문에 집이 두 채가 됐는데 양도세가 걱정이시죠? 일시적 2주택 비과세 처분 기한 3년과 보유·거주 요건을 정리했어요.',
    keywords: ['일시적 2주택 양도세 비과세', '일시적 2주택 처분 조건', '일시적 2주택 비과세 기간', '일시적 2주택 양도세'],
    ogTitle: '일시적 2주택 양도세 비과세 기간 처분 조건 | 신규주택 취득 후 3년 이내 종전주택 매도 | 머니위키',
    ogDescription: '처분 기한 3년, 보유·거주 요건, 비과세 체크리스트를 정리했어요',
  },

  hub: {
    url: '/w/다주택양도세-중과유예-세율-절세-전략',
    name: '다주택 양도세 중과유예 세율 절세 전략',
  },

  breadcrumb: ['세금', '양도세', '일시적 2주택 비과세'],

  summary3: [
    <>일시적 2주택 비과세는 <strong>신규주택 취득 후 3년 이내</strong> 종전주택을 팔아야 해요</>,
    <>종전주택 <strong>1년 이상 보유 후</strong> 신규주택을 취득해야 특례가 적용돼요</>,
    <>12억원 이하 양도가액은 <strong>양도세 0원</strong>, 초과분만 과세돼요</>,
  ],

  sourceBar: {
    badge: '법령 출처',
    name: '소득세법 시행령 제155조 · 국세청 양도소득세',
    date: '2026.02',
  },

  prevNext: {
    prev: { title: '다주택자 양도세 중과 배제 대상 주택 | 신고 방법', href: '/w/다주택자-양도세-중과-배제-대상-주택-신고' },
    next: { title: '다주택 매도 순서 전략 절세 방법 | 양도세 중과 피하는 매도 타이밍', href: '/w/다주택-매도-순서-전략-절세' },
  },

  stickyBar: {
    topLabel: '일시적 2주택',
    value: '처분 기한 3년',
    buttonText: '비과세 요건 확인 →',
    scrollTo: '#checker',
  },

  hero: {
    badge: '2026년 최신',
    h1: (<>일시적 2주택 양도세 비과세 기간 처분 조건 | <span className="text-[#1E3A5F]">신규주택 취득 후 3년 이내</span> 종전주택 매도</>),
    intro: (
      <p className="text-base text-neutral-500 leading-relaxed">
        이사 때문에 두 채가 됐는데, 종전 집을 팔 때 양도세를 내야 할지 걱정이시죠?
        <strong className="text-neutral-800"> 일시적 2주택 특례를 쓰면 양도세 0원(12억 이하)</strong>이 가능해요.
        신규주택 취득일부터 3년 이내에 종전주택을 팔면 되는데, 보유·거주 요건까지 함께 맞춰야 해요.
        내 상황이 비과세 요건에 해당하는지 아래 체커에서 바로 확인해 보세요.
      </p>
    ),
    quickAnswer: {
      title: '일시적 2주택 처분 기한이 얼마나 되나요?',
      body: '2023년 1월 12일부터 지역 구분 없이 신규주택 취득일로부터 3년 이내에요. 종전주택 1년 이상 보유 후 신규주택을 취득하고, 3년 내 잔금을 받으면 12억원 이하는 양도세 0원이에요.',
      hook: '자세한 비과세 요건과 체크리스트를 아래에서 확인하세요 →',
    },
    hubCTA: { badge: '전체 가이드', desc: '다주택자 양도세 중과 유예·배제·절세 전략 전체 보기' },
  },

  toc: [
    { id: 'checker', label: '일시적 2주택 비과세 요건 체커' },
    { id: 'sec-concept', label: '일시적 2주택 양도세 비과세는 어떤 제도인가요?' },
    { id: 'sec-period', label: '일시적 2주택 비과세 기간은 얼마나 되나요?' },
    { id: 'sec-condition', label: '일시적 2주택 처분 조건은 뭔가요?' },
    { id: 'sec-tax', label: '일시적 2주택 양도세는 얼마인가요?' },
    { id: 'sec-faq', label: '자주 묻는 질문' },
  ],

  sections: [
    // ===== CHECKER =====
    {
      id: 'checker',
      number: 'CHECK',
      heading: '일시적 2주택 비과세 요건 체커',
      subtitle: '내 상황이 비과세 요건을 충족하는지 바로 확인하세요',
      content: (<일시적2주택Checker />),
    },

    // ===== S1: 개념 — FormulaBox + SpokeTable =====
    {
      id: 'sec-concept',
      number: 'SECTION 02',
      heading: '일시적 2주택 양도세 비과세는 어떤 제도인가요?',
      subtitle: '이사 과정에서 잠깐 2주택이 된 경우 양도세를 면제해 주는 특례예요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            일시적 2주택 비과세란, 1주택자가 이사 등의 이유로 새 집을 먼저 사서 일시적으로 2주택이 된 경우에
            <strong> 종전 주택을 팔 때 양도세를 면제</strong>해 주는 제도예요.
            핵심은 '이사 과정에서 잠깐 겹치는 상황'을 인정해 준다는 거예요.
            법적 근거는 <a href="https://www.law.go.kr/법령/소득세법시행령" target="_blank" rel="noopener noreferrer" className="text-[#4A7AB5] underline">소득세법 시행령 제155조</a>예요.
            이 특례를 받으면 양도차익이 아무리 커도 양도세가 0원이에요(12억원 이하 기준).
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            1세대 1주택 비과세 요건(2년 보유, 조정지역은 2년 거주)을 충족한 상태에서 신규주택을 취득하고,
            정해진 기간 내에 종전주택을 팔면 돼요.
            비과세와 과세 시 세금 차이가 얼마나 큰지 아래에서 한눈에 볼 수 있어요.
            <a href="/w/다주택양도세-중과유예-세율-절세-전략" className="text-[#4A7AB5] underline">다주택자 양도세 전략</a>과 함께 보면 전체 그림이 잡혀요.
          </p>

          <FormulaBox lines={[
            { text: '// 일시적 2주택 비과세 핵심 공식', comment: true },
            { text: '종전주택 1년+ 보유 → 신규주택 취득 → 3년 이내 종전 매도', numbered: false },
            { text: '+ 종전주택 2년 보유 (조정지역: +2년 거주) + 12억 이하 = 양도세 0원', numbered: false },
          ]} />

          <SpokeTable
            id="tbl-period-history"
            title="일시적 2주택 처분 기한 변천"
            subtitle="2023년 1월부터 지역 구분 없이 3년으로 통일"
            headers={['적용 시기', '처분 기한']}
            rows={PERIOD_HISTORY_ROWS}
            highlightCol={1}
          />

          <SpokeLinks
            title="일시적 2주택 관련 더 알아보기"
            items={[
              { num: '01', heading: '2주택자 양도세 비과세 조건 세율 계산', desc: '일시적 2주택 외 2주택 전체 가이드', href: '/w/2주택자-양도세-비과세-조건-세율-계산' },
              { num: '02', heading: '다주택자 양도세 중과 배제 대상 주택', desc: '비수도권·임대·상속 등 중과 빠지는 주택', href: '/w/다주택자-양도세-중과-배제-대상-주택-신고' },
            ]}
          />
        </>
      ),
      pasBridge: {
        href: '/w/2주택자-양도세-비과세-조건-세율-계산',
        question: '비과세 요건을 충족하면 세금이 정확히 얼마나 되나요?',
        answer: <>12억원 이하 종전주택은 <strong>양도세 0원</strong>이에요. 12억원 초과분만 과세 대상이에요.</>,
        buttonText: '2주택자 양도세 세율 확인 →',
      },
    },

    // ===== S2: 처분 기간 — SpokeRateBars + SpokeCompareCards =====
    {
      id: 'sec-period',
      number: 'SECTION 03',
      heading: '일시적 2주택 비과세 기간은 얼마나 되나요?',
      subtitle: '2023년 1월부터 지역 구분 없이 3년으로 통일됐어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            2023년 1월 12일부터 일시적 2주택 처분 기한이 <strong>지역 구분 없이 3년</strong>으로 통일됐어요.
            이전에는 조정대상지역은 1~2년, 비조정지역은 3년으로 달랐는데, 이제는 모두 같아요.
            기준일은 <strong>신규주택 취득일(잔금일 또는 등기이전일 중 빠른 날)</strong>이에요.
            취득세·종부세도 3년으로 맞춰져서, 세목별 혼란이 없어졌어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            3년 기한은 '양도일(잔금일)' 기준이에요. 매매계약을 3년 안에 체결해도 잔금을 3년째 되는 날 이후에 받으면 비과세를 받을 수 없어요.
            잔금일이 하루라도 넘으면 기한 초과예요. 기한이 촉박하면 잔금일을 앞당기는 협의를 미리 해두는 게 좋아요.
            <a href="/w/양도세-잔금일-기준-계약일-판단" className="text-[#4A7AB5] underline">양도세 잔금일 기준</a>을 정확히 알아야 실수를 피할 수 있어요.
          </p>

          <SpokeRateBars bars={[
            { label: '2019.12.17~2022.5.9 (조정→조정)', rate: 33, width: 33 },
            { label: '2018.9.14~2019.12.16 (조정→조정)', rate: 66, width: 66 },
            { label: '2022.5.10 이후 (모든 지역)', rate: 100, width: 100 },
          ]} />

          <SpokeCompareCards cards={[
            {
              title: '3년 이내 처분',
              subtitle: '비과세 적용',
              items: ['신규주택 취득일부터 3년', '잔금일(양도일) 기준', '12억 이하 양도세 0원', '장특공 + 비과세 중복 없음'],
              recommended: true,
              recLabel: '비과세',
            },
            {
              title: '3년 초과 처분',
              subtitle: '일반 양도세 과세',
              items: ['기본세율 6~45% 적용', '장기보유특별공제 가능', '유예 기간 내 매도 시 중과 없음', '수천만~수억원 세금 발생'],
            },
          ]} />

          <SpokeLinks
            title="처분 기한 관련 더 알아보기"
            items={[
              { num: '01', heading: '양도세 잔금일 기준 계약일 차이', desc: '잔금일 vs 등기이전일 양도 시기 판단', href: '/w/양도세-잔금일-기준-계약일-판단' },
              { num: '02', heading: '조정대상지역 목록 서울 경기', desc: '현재 조정대상지역 현황 확인', href: '/w/조정대상지역-목록-서울-경기' },
            ]}
          />
        </>
      ),
      pasBridge: {
        href: '/w/조정대상지역-목록-서울-경기',
        question: '내 집이 조정대상지역에 해당하는지 어떻게 확인하나요?',
        answer: <>현재 조정대상지역은 <strong>서울 전역, 경기 일부</strong>예요. 지역에 따라 거주 요건이 달라져요.</>,
        buttonText: '조정대상지역 목록 확인 →',
      },
    },

    // ===== S3: 처분 조건 — SpokeStepCards + TipBox =====
    {
      id: 'sec-condition',
      number: 'SECTION 04',
      heading: '일시적 2주택 처분 조건은 뭔가요?',
      subtitle: '기간 외에도 5가지 요건을 모두 갖춰야 해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            일시적 2주택 비과세는 처분 기한(3년)만 지키면 되는 게 아니에요.
            <strong> 5가지 핵심 요건을 모두 충족</strong>해야 특례가 적용돼요.
            특히 '종전주택을 1년 이상 보유한 상태에서 신규주택을 취득'해야 하는 요건은 많이 놓치는 부분이에요.
            세대원 전체를 1세대로 보기 때문에, 자녀가 별도 세대로 인정되지 않으면 주택 수 합산 문제가 생길 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            조정대상지역 주택은 2년 보유 + 2년 거주가 모두 필요해요. 비조정지역은 2년 보유만으로 충분해요.
            '거주'는 주민등록 전입일 기준이 아니라 실제 거주 기간으로 판단해요.
            아래 단계별로 요건을 순서대로 확인해 보세요.
          </p>

          <SpokeStepCards steps={[
            { title: '종전주택 1년 이상 보유', desc: '신규주택 취득 전 종전주택 보유기간이 1년 이상이어야 해요', tip: '취득일부터 잔금일까지 계산' },
            { title: '종전주택 보유·거주 요건', desc: '조정지역: 2년 보유 + 2년 거주 / 비조정지역: 2년 보유', tip: '거주 = 실제 거주 기간' },
            { title: '신규주택 취득 후 3년 내 처분', desc: '신규주택 취득일(잔금일)부터 3년 이내 종전주택 잔금 수령', tip: '잔금일이 양도일' },
            { title: '양도가액 12억원 이하', desc: '12억원 이하면 전액 비과세, 초과분만 과세', tip: '고가주택은 초과분 과세' },
            { title: '1세대 요건', desc: '동일 세대원 포함해서 1세대가 2주택인 경우에만 특례 적용', tip: '배우자·미성년 자녀는 동일 세대' },
          ]} />

          <TipBox title="분양권도 주택 수에 포함돼요">
            <p className="mb-0 leading-relaxed">
              2021년 1월 1일 이후 취득한 분양권은 주택 수에 포함돼요.<br />
              분양권을 취득해서 2주택이 된 경우에도 일시적 2주택 특례를 검토할 수 있지만,<br />
              취득 시점과 완공 시점에 따라 요건이 달라지니 세무사에게 확인하세요.
            </p>
          </TipBox>
        </>
      ),
      pasBridge: {
        href: '/w/다주택-매도-순서-전략-절세',
        question: '3년 기한을 놓쳤다면 절세 방법이 있을까요?',
        answer: <>기한을 넘기더라도 <strong>장기보유특별공제</strong>로 세금을 줄일 수 있어요. 유예 기간 내 매도가 핵심이에요.</>,
        buttonText: '다주택 매도 전략 확인 →',
      },
    },

    // ===== S4: 세금 — SpokeFlow + SpokeChecklist =====
    {
      id: 'sec-tax',
      number: 'SECTION 05',
      heading: '일시적 2주택 양도세는 얼마인가요?',
      subtitle: '비과세 성공 시 0원, 실패 시 기본세율 6~45%가 적용돼요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            일시적 2주택 비과세 요건을 충족하면 <strong>양도세 0원(12억 이하)</strong>이에요.
            요건을 하나라도 놓치면 기본세율(6~45%)이 적용돼요.
            현재 다주택자 중과 유예 기간(~2026.5.9)이라 2주택이라도 기본세율만 적용되고 있어요.
            유예가 종료되면 조정대상지역 주택은 기본세율 + 20%p 중과가 적용될 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            3년 기한을 놓쳤더라도 <strong>장기보유특별공제</strong>를 최대한 활용하면 세금을 줄일 수 있어요.
            1세대 1주택 요건을 충족하면 보유 + 거주 기간에 따라 최대 80%까지 공제받을 수 있어요.
            양도 시기를 조절해서 과세표준 구간을 낮추는 전략도 효과적이에요.
          </p>

          <SpokeFlow steps={[
            { icon: '1️⃣', label: '비과세 요건 충족 확인', sub: '5가지 요건 모두 체크' },
            { icon: '2️⃣', label: '기한 내 잔금 수령', sub: '3년 이내 양도일 확정' },
            { icon: '3️⃣', label: '양도세 신고', sub: '잔금일 포함 달의 말일+2개월' },
            { icon: '4️⃣', label: '비과세 확정', sub: '12억 이하 세금 0원' },
          ]} />

          <SpokeChecklist items={[
            { text: '종전주택 1년 이상 보유 후 신규주택 취득했는지 확인' },
            { text: '조정지역: 2년 보유 + 2년 거주 요건 충족 확인' },
            { text: '비조정지역: 2년 보유 요건 충족 확인' },
            { text: '신규주택 취득일(잔금일) 정확히 확인' },
            { text: '종전주택 매도 잔금일 3년 이내인지 확인' },
            { text: '양도가액 12억원 초과 여부 확인 (초과분 과세)' },
            { text: '양도세 예정신고 기한 확인 (잔금일+2개월 이내)' },
          ]} />
        </>
      ),
      bridgeCTA: {
        href: '/w/다주택양도세-중과유예-세율-절세-전략',
        badge: '절세 가이드',
        title: '다주택자 절세 전략 전체 보기',
        desc: '중과 유예·배제·장특공 절세 방법을 모두 정리했어요',
        icon: 'grid',
        primary: true,
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
      question: '일시적 2주택 비과세는 분양권이나 입주권에도 적용되나요?',
      answer: '2021년 1월 1일부터 분양권도 주택 수에 포함돼요. 분양권을 취득해서 2주택이 된 경우에도 일시적 2주택 특례가 적용될 수 있지만, 취득 시점과 완공 시점에 따라 요건이 달라지니 세무사에게 확인하세요.',
    },
    {
      question: '부부가 각각 1주택씩 보유하면 일시적 2주택인가요?',
      answer: '부부는 같은 세대로 봐요. 부부가 각각 1주택씩 가지고 있으면 1세대 2주택이에요. 혼인 합가로 2주택이 된 경우에는 혼인일부터 5년 이내에 먼저 양도하는 주택에 대해 비과세 특례가 따로 적용돼요.',
    },
    {
      question: '신규주택을 취득하기 전에 종전주택을 팔아도 되나요?',
      answer: '종전주택을 먼저 팔면 일시적 2주택 상황이 아니에요. 1세대 1주택 비과세 요건(2년 보유, 조정지역 2년 거주)을 충족하면 일반 1주택 비과세가 적용될 수 있어요. 일시적 2주택 특례는 신규주택을 먼저 취득한 경우에만 해당해요.',
    },
  ],

  relatedSpokes: [
    { badge: '세금', title: '2주택자 양도세 비과세 조건 세율 계산', desc: '2주택 전체 양도세 가이드', href: '/w/2주택자-양도세-비과세-조건-세율-계산' },
    { badge: '세금', title: '다주택자 양도세 중과 배제 대상 주택 종류', desc: '중과에서 빠지는 주택 6가지', href: '/w/다주택자-양도세-중과-배제-대상-주택-신고' },
    { badge: '세금', title: '조정대상지역 목록 서울 경기', desc: '현재 조정대상지역 현황', href: '/w/조정대상지역-목록-서울-경기' },
    { badge: '세금', title: '다주택 매도 순서 전략 절세 방법', desc: '어떤 집부터 팔아야 세금을 줄일까', href: '/w/다주택-매도-순서-전략-절세' },
  ],

  sources: [
    { name: '소득세법 시행령 제155조', url: 'https://www.law.go.kr/법령/소득세법시행령', org: '법제처' },
    { name: '양도소득세 개요', url: 'https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7707&mi=2308', org: '국세청' },
  ],
}

export default data
