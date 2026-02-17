import type { SpokeData } from '@/data/spoke/types'
import {
  SpokeTable,
  WarnBox,
  FormulaBox,
  SpokeCompareCards,
  SpokeRateBars,
  SpokeChecklist,
  SpokeTimeline,
  RateCards,
  SpokeLinks,
} from '@/components/spoke/SpokeBlocks'
import 조정지역다주택비과세Checker from '@/components/checkers/조정지역다주택비과세Checker'

// --- 테이블 데이터 ---
const SURCHARGE_ROWS = [
  ['2주택자', '기본세율 + 20%p', '최대 65%', '최대 71.5% (지방소득세 포함)'],
  ['3주택 이상', '기본세율 + 30%p', '최대 75%', '최대 82.5% (지방소득세 포함)'],
  ['1년 미만 보유', '70% (단기 양도)', '70%', '77% (지방소득세 포함)'],
  ['1~2년 보유', '60% (단기 양도)', '60%', '66% (지방소득세 포함)'],
]

const data: SpokeData = {
  slug: '조정대상지역-다주택자-양도세-중과세율-비과세',

  meta: {
    // 황금 규칙: [롱테일 키워드] | [연관 롱테일 키워드] — 양쪽 모두 키워드
    title: '조정대상지역 다주택자 양도세 중과세율 | 비과세 2년 거주 요건',
    description: '조정대상지역 다주택자가 팔면 기본세율에 20~30%p가 추가된다는 거 아시나요? 중과세율 구조와 비과세 2년 거주 요건, 유예 종료 전 매도 전략까지 알려드려요.',
    keywords: ['조정대상지역 다주택자 양도세', '조정대상지역 양도세 중과세율', '조정대상지역 양도세 비과세', '다주택자 2년 거주 요건'],
    ogTitle: '조정대상지역 다주택자 양도세 중과세율 | 비과세 2년 거주 요건 | 머니위키',
    ogDescription: '중과세율 구조, 비과세 요건, 유예 종료 전 전략을 확인하세요.',
  },

  hub: {
    url: '/w/다주택양도세-중과유예-세율-절세-전략',
    name: '다주택 양도세 중과유예 세율 절세 전략',
  },

  breadcrumb: ['세금', '부동산 세금', '조정대상지역 다주택자 양도세'],

  summary3: [
    <>조정대상지역 다주택자는 기본세율에 <strong>2주택 +20%p, 3주택 +30%p</strong> 중과가 적용돼요</>,
    <>비과세를 받으려면 <strong>2년 보유 + 2년 실거주</strong>가 모두 필요해요 (비조정지역은 거주 불필요)</>,
    <>중과 유예는 <strong>2026년 5월 9일</strong>까지 — 이후엔 장기보유특별공제도 배제돼요</>,
  ],

  sourceBar: {
    badge: '출처',
    name: '소득세법 제104조 · 국세청 양도소득세 중과배제 안내',
    date: '2026.02',
  },

  prevNext: {
    prev: { title: '조정대상지역 서울 경기 목록', href: '/w/조정대상지역-목록-서울-경기' },
    next: { title: '다주택 양도세 중과 전후 세액 비교', href: '/w/다주택-양도세-중과-전후-세액-비교' },
  },

  stickyBar: {
    topLabel: '비과세 요건 충족 여부',
    value: '2년 보유 + 2년 거주',
    buttonText: '내 요건 확인 →',
    scrollTo: '#checker',
  },

  hero: {
    badge: '2026년 기준 · 소득세법 출처',
    h1: (<>조정대상지역 다주택자 <span className="text-[#1E3A5F]">양도세 중과세율</span> | 비과세 2년 거주 요건</>),
    intro: (
      <p className="text-base text-neutral-500 leading-relaxed">
        조정대상지역에서 다주택자가 집을 팔면 기본세율에 20~30%p가 얹혀요. 지방소득세까지 합치면 3주택자 실질 세율이 82.5%에 달하기도 해요. 그런데 비과세는 또 가능한지, 어떤 조건을 갖춰야 하는지는 잘 모르시는 분들이 많아요. 중과세율 구조와 비과세 2년 거주 요건, 유예 종료 전 매도 전략까지 한 곳에 정리했어요.
      </p>
    ),
    quickAnswer: {
      title: '조정대상지역 다주택자 양도세 얼마인가요?',
      body: '조정대상지역 2주택자는 기본세율(6~45%)에 +20%p, 3주택 이상은 +30%p가 추가돼요. 지방소득세 포함 시 3주택자 최대 82.5%까지 올라가요. 단, 2026년 5월 9일까지는 중과가 유예되어 기본세율만 적용돼요.',
      hook: '비과세 요건을 아래에서 바로 확인해 보세요 →',
    },
    hubCTA: {
      badge: '전체 가이드',
      desc: '다주택 양도세 중과유예 세율 절세 전략 전체 보기',
    },
  },

  toc: [
    { id: 'checker', label: '조정대상지역 1주택 비과세 요건 확인' },
    { id: 'sec-surcharge', label: '조정대상지역 다주택자 양도세 중과세율은 얼마인가요?' },
    { id: 'sec-exemption', label: '조정대상지역 양도세 비과세 2년 거주 요건이 필요한가요?' },
    { id: 'sec-strategy', label: '조정대상지역 다주택자 절세 방법은 어떻게 되나요?' },
    { id: 'sec-timeline', label: '조정대상지역 양도세 중과 유예 종료 일정은 어떻게 되나요?' },
    { id: 'sec-faq', label: '자주 묻는 질문' },
  ],

  sections: [
    // ── Checker ──
    {
      id: 'checker',
      number: 'CHECK',
      heading: '조정대상지역 1주택 비과세 요건 확인',
      subtitle: '2년 보유·거주 여부와 주택 수를 입력하면 바로 알려드려요',
      content: (<조정지역다주택비과세Checker />),
    },

    // ── S1: WarnBox + SpokeTable ──
    {
      id: 'sec-surcharge',
      number: 'SECTION 02',
      heading: '조정대상지역 다주택자 양도세 중과세율은 얼마인가요?',
      subtitle: '2주택 +20%p, 3주택 +30%p — 지방소득세 포함 시 최대 82.5%',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            <a href="/w/양도세-중과-뜻-기본세율-중과세율-비교" className="text-[#4A7AB5] underline">양도세 중과</a>란 기본세율(6~45%)에 추가 세율을 더하는 방식이에요.
            조정대상지역에서 2주택 이상을 보유한 사람이 주택을 팔면, 보유 주택 수에 따라 세율이 달라져요.
            2주택자는 기본세율에 20%p가 더해져 최대 65%, 3주택 이상은 30%p가 더해져 최대 75%까지 올라가요.
            여기에 지방소득세(양도세의 10%)까지 합치면 실질 세 부담은 훨씬 커져요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            단기 보유와 중과세율이 겹치는 경우엔 더 높은 쪽을 적용해요.
            예를 들어 1년 미만 보유 주택(70%)과 2주택 중과(최대 65%) 중 70%가 더 높으니 70%가 적용돼요.
            중과 적용 시에는 <a href="/w/다주택-장특공-배제-조건-예외" className="text-[#4A7AB5] underline">장기보유특별공제가 완전히 배제</a>돼서 실제 세금이 2~3배 차이 날 수 있어요.
            지금은 유예 중이지만 2026년 5월 9일 이후에는 이 세율이 다시 살아나요.
          </p>

          <WarnBox>
            <p className="leading-relaxed">
              <strong>2026년 5월 9일 이후</strong> 중과가 재개되면 장기보유특별공제(최대 30%)도 함께 배제돼요.
              유예 기간 내 팔면 공제를 받을 수 있지만, 재개 후엔 0%예요.
              잔금일 하루 차이가 수천만 원 세금 차이를 만들 수 있어요.
            </p>
          </WarnBox>

          <SpokeTable
            id="tbl-surcharge"
            title="조정대상지역 다주택자 중과세율"
            subtitle="유예 종료(2026.5.10) 이후 기준 · 소득세법 제104조"
            headers={['구분', '중과세율', '최대 세율', '지방소득세 포함']}
            rows={SURCHARGE_ROWS}
            highlightCol={3}
          />

          <SpokeLinks
            title="양도세 세율 더 알아보기"
            items={[
              { num: '01', heading: '양도세 중과 뜻과 기본세율 비교', desc: '중과세율이 기본세율보다 얼마나 높은지', href: '/w/양도세-중과-뜻-기본세율-중과세율-비교' },
              { num: '02', heading: '다주택 양도세 중과 전후 세액 비교', desc: '양도차익별 세금 차이를 직접 비교', href: '/w/다주택-양도세-중과-전후-세액-비교' },
            ]}
          />
        </>
      ),
      pasBridge: {
        href: '/w/조정대상지역-목록-서울-경기',
        question: '내 주택이 조정대상지역인지 어떻게 알 수 있나요?',
        answer: <>서울 25개 자치구 전역과 경기 12곳이 지정돼 있어요. <strong>지역 목록을 직접 확인</strong>하고 내 주택 소재지가 포함되는지 체크하세요.</>,
        buttonText: '조정대상지역 목록 확인 →',
      },
    },

    // ── S2: SpokeCompareCards + FormulaBox ──
    {
      id: 'sec-exemption',
      number: 'SECTION 03',
      heading: '조정대상지역 양도세 비과세 2년 거주 요건이 필요한가요?',
      subtitle: '비조정지역은 보유 2년, 조정지역은 보유 + 거주 2년 모두 필요해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            1세대 1주택 비과세는 조정대상지역이라도 받을 수 있어요.
            다만 비조정지역은 보유 2년만 충족하면 되는 반면, 조정대상지역은 <strong>보유 2년 + 실거주 2년</strong>이 모두 필요해요.
            거주 기간은 전입신고일 기준으로 계산하고, 보유 기간 중 아무 시점에나 2년을 채우면 돼요.
            양도가액이 12억원 이하면 전액 비과세이고, 초과분만 과세돼요.
          </p>

          <SpokeCompareCards
            cards={[
              {
                title: '비조정지역',
                subtitle: '요건이 상대적으로 단순해요',
                items: [
                  '보유기간 2년 이상',
                  '거주 요건 없음',
                  '12억 이하 전액 비과세',
                  '장기보유특별공제 적용 가능',
                ],
              },
              {
                title: '조정대상지역',
                subtitle: '거주 요건이 추가돼요',
                items: [
                  '보유기간 2년 이상',
                  '실거주기간 2년 이상 (필수)',
                  '12억 이하 전액 비과세',
                  '취득 시 지정 여부 기준 적용',
                ],
                recommended: true,
                recLabel: '요건 강화',
              },
            ]}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            주택을 취득한 후 조정대상지역으로 지정된 경우, 지정 전 취득분은 기존(거주 불필요) 요건이 적용돼요.
            반대로 취득 후 조정대상지역이 해제되면 거주 요건이 풀려요.
            취득 시점과 지정/해제 시점의 관계가 매우 중요해요.
          </p>

          <FormulaBox lines={[
            { text: '// 조정대상지역 1세대 1주택 비과세 요건', comment: true },
            { text: '① 1세대 1주택 (양도일 기준)', numbered: false },
            { text: '② 보유기간 2년 이상', numbered: false },
            { text: '③ 거주기간 2년 이상 (전입신고 기준, 조정지역 취득 시 필수)', numbered: false },
            { text: '④ 양도가액 12억원 이하 (초과분은 과세)', numbered: false },
            { text: '', numbered: false },
            { text: '// 일시적 2주택 특례 (추가 요건)', comment: true },
            { text: '⑤ 신규주택 취득 후 3년 이내 종전주택 양도', numbered: false },
          ]} />

          <SpokeLinks
            title="비과세 요건 더 알아보기"
            items={[
              { num: '01', heading: '일시적 2주택 양도세 비과세 기간', desc: '3년 처분 기한과 전세 낀 경우 특례', href: '/w/일시적-2주택-양도세-비과세-기간-처분' },
              { num: '02', heading: '2주택자 양도세 비과세 조건', desc: '2주택 상태에서 비과세 받는 방법', href: '/w/2주택자-양도세-비과세-조건-세율-계산' },
            ]}
          />
        </>
      ),
      pasBridge: {
        href: '/w/다주택-장특공-배제-조건-예외',
        question: '중과 적용 시 장기보유특별공제는 정말 하나도 못 받나요?',
        answer: <>중과 시에는 <strong>장기보유특별공제 0%</strong>예요. 유예 기간 중엔 최대 30%까지 받을 수 있어서, 유예 종료 전 매도가 절세에 매우 유리해요.</>,
        buttonText: '장특공 배제 조건 확인 →',
      },
    },

    // ── S3: SpokeRateBars + SpokeChecklist ──
    {
      id: 'sec-strategy',
      number: 'SECTION 04',
      heading: '조정대상지역 다주택자 절세 방법은 어떻게 되나요?',
      subtitle: '유예 기간 활용, 중과 배제 주택 활용, 매도 순서 전략',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            조정대상지역 다주택자가 세금을 줄이는 방법은 크게 세 가지예요.
            첫째, <strong>유예 기간(~2026.5.9) 내에 매도</strong>하면 기본세율과 장기보유특별공제를 모두 받아요.
            둘째, <a href="/w/다주택자-양도세-중과-배제-대상-주택-신고" className="text-[#4A7AB5] underline">중과 배제 대상 주택</a>(상속, 지방 3억 이하 등)을 활용해 주택 수에서 제외할 수 있어요.
            셋째, <a href="/w/다주택-매도-순서-전략-절세" className="text-[#4A7AB5] underline">매도 순서 전략</a>으로 양도차익이 큰 주택을 1주택 상태에서 팔아 비과세를 노릴 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            유예 종료 후 전략은 달라져요.
            중과가 재개되면 증여로 전환하거나 장기임대주택 등록을 검토하는 방법도 있어요.
            단, 세금 절감 효과는 보유 기간, 취득가액, 양도차익에 따라 크게 달라지기 때문에 반드시 세무사와 상담하세요.
          </p>

          <SpokeRateBars bars={[
            { label: '유예 기간 내 매도 (기본세율 + 장특공)', rate: '절세 효과 최대', width: '92%' },
            { label: '중과 배제 주택 활용 (기본세율 적용)', rate: '효과 높음', width: '75%' },
            { label: '매도 순서 조정 (차익 큰 주택 1주택으로)', rate: '효과 보통', width: '68%' },
            { label: '유예 종료 후 증여 전환', rate: '상황별 검토', width: '40%' },
          ]} />

          <SpokeChecklist items={[
            { text: '2026년 5월 9일 이전 잔금일로 매도 계획 수립', done: false },
            { text: '보유 주택 중 중과 배제 대상(상속주택, 지방 3억 이하) 확인', done: false },
            { text: '비과세 요건(2년 보유·거주) 충족 주택 파악', done: false },
            { text: '양도차익 큰 주택 → 최후에 1주택 상태로 매도 순서 설계', done: false },
            { text: '세무사 상담 후 최종 매도 일정 확정', done: false },
          ]} />
        </>
      ),
      pasBridge: {
        href: '/w/다주택-매도-순서-전략-절세',
        question: '어떤 집부터 팔아야 세금이 가장 줄어드나요?',
        answer: <>일반적으로 양도차익이 작은 주택부터 팔아 <strong>1주택 비과세 요건</strong>을 갖추는 게 유리해요. 구체적인 순서는 각 주택의 차익과 보유 기간을 따져야 해요.</>,
        buttonText: '매도 순서 전략 자세히 보기 →',
      },
    },

    // ── S4: SpokeTimeline + RateCards ──
    {
      id: 'sec-timeline',
      number: 'SECTION 05',
      heading: '조정대상지역 양도세 중과 유예 종료 일정은 어떻게 되나요?',
      subtitle: '2022년부터 매년 연장 — 2026년 5월 9일이 현재 종료일이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            조정대상지역 다주택자 양도세 중과 유예는 2022년 5월 10일 시작됐어요.
            정부는 부동산 시장 상황을 보며 매년 1년씩 연장해 왔고, 현재 종료일은 <strong>2026년 5월 9일</strong>이에요.
            추가 연장 여부는 아직 확정되지 않았어요.
            유예 종료 후에는 중과세율과 장기보유특별공제 배제가 동시에 적용돼요.
          </p>

          <SpokeTimeline events={[
            { month: '2022.05', title: '다주택자 양도세 중과 유예 시작', desc: '소득세법 시행령 개정 — 조정지역 다주택자 기본세율 적용 시작', status: 'normal' },
            { month: '2023.05', title: '유예 1차 연장', desc: '2024년 5월 9일까지 연장', status: 'normal' },
            { month: '2024.05', title: '유예 2차 연장', desc: '2025년 5월 9일까지 연장', status: 'normal' },
            { month: '2025.05', title: '유예 3차 연장', desc: '2026년 5월 9일까지 연장', status: 'current' },
            { month: '2026.05', title: '유예 종료 예정일', desc: '추가 연장 없으면 2026.5.10부터 중과 재개 — 장특공 배제 동시 적용', status: 'warning', tag: '종료 예정' },
          ]} />

          <RateCards cards={[
            { value: '6~45%', label: '유예 기간 세율', lines: ['기본세율', '장특공 최대 30% 적용'], highlight: '현재', highlightColor: 'navy' as const },
            { value: '최대 75%', label: '중과 재개 후 세율', lines: ['3주택 기본세율 +30%p', '장특공 0% 배제'], highlight: '주의', highlightColor: 'orange' as const },
          ]} />

          <SpokeLinks
            title="중과 유예 관련 더 알아보기"
            items={[
              { num: '01', heading: '중과 유예 연혁과 종료일 확정', desc: '연장 히스토리와 종료 후 변화', href: '/w/중과-유예-연혁-종료일-확정' },
              { num: '02', heading: '중과 유예 종료 후 부동산 시장 전망', desc: '종료 이후 시장 변화 예측', href: '/w/중과-유예-종료-부동산-시장-전망' },
            ]}
          />
        </>
      ),
      bridgeCTA: {
        href: '/w/다주택양도세-중과유예-세율-절세-전략',
        badge: '절세 가이드',
        title: '다주택자 양도세 전체 절세 전략 보기',
        desc: '중과 유예·배제·매도 순서·증여 전환 전략 총망라',
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
      question: '조정대상지역 해제 후 재지정되면 양도세 비과세 요건이 어떻게 되나요?',
      answer: '주택을 취득할 때 조정대상지역이었으면 2년 거주 요건이 적용돼요. 취득 후 해제되었다가 재지정된 경우, 취득 시 지정 여부를 기준으로 판단해요. 취득 시 비조정지역이었다면 재지정 후에도 거주 요건은 없어요.',
    },
    {
      question: '조정대상지역 다주택자인데 주거용 오피스텔도 주택 수에 포함되나요?',
      answer: '실제 주거용으로 사용하거나 주택임대사업자로 등록한 오피스텔은 주택 수에 포함될 수 있어요. 업무용으로 사용 중이면 포함되지 않아요. 오피스텔 용도가 불분명하면 과세 당국의 판단이 달라질 수 있어서 세무사 확인이 필요해요.',
    },
    {
      question: '중과 유예 기간에 팔지 못하고 2026년 5월 9일을 넘기면 어떻게 되나요?',
      answer: '잔금일이 2026년 5월 10일 이후면 중과세율(+20~30%p)이 적용되고 장기보유특별공제도 받을 수 없어요. 잔금일 기준이므로 계약일이 아닌 실제 잔금 납부일을 기준으로 계획을 세워야 해요.',
    },
  ],

  relatedSpokes: [
    { badge: '세금', title: '조정대상지역 서울 경기 목록', desc: '2026년 현재 지정 지역 전체 목록', href: '/w/조정대상지역-목록-서울-경기' },
    { badge: '세금', title: '다주택 양도세 중과 전후 세액 비교', desc: '유예 시 vs 중과 시 세금 차이 계산', href: '/w/다주택-양도세-중과-전후-세액-비교' },
    { badge: '세금', title: '다주택자 양도세 중과 배제 대상 주택', desc: '중과에서 빠지는 주택 종류와 신고 방법', href: '/w/다주택자-양도세-중과-배제-대상-주택-신고' },
    { badge: '세금', title: '일시적 2주택 양도세 비과세 기간', desc: '3년 처분 기한과 비과세 조건', href: '/w/일시적-2주택-양도세-비과세-기간-처분' },
  ],

  sources: [
    { name: '양도소득세 중과 및 한시배제 안내', url: 'https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7707&mi=2308', org: '국세청' },
    { name: '소득세법 제104조 (세율)', url: 'https://www.law.go.kr/법령/소득세법/(20260101,20764,20251224)/제104조', org: '법제처' },
    { name: '주택법 제63조의2 조정대상지역 지정', url: 'https://www.law.go.kr/법령/주택법/제63조의2', org: '법제처' },
  ],
}

export default data
