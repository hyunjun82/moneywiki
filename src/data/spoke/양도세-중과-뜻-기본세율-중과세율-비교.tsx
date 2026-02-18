import type { SpokeData } from './types'
import {
  SpokeTable,
  FormulaBox,
  TipBox,
  DetailBox,
  SpokeCompareCards,
  SpokeRateBars,
  SpokeTimeline,
  Chips,
  SpokeLinks,
} from '@/components/spoke/SpokeBlocks'
import YangdoseJungkwaChecker from '@/components/checkers/YangdoseJungkwaChecker'

const data: SpokeData = {
  slug: '양도세-중과-뜻-기본세율-중과세율-비교',

  meta: {
    title: '양도세 중과 뜻 기본세율 중과세율 차이 | 2주택 3주택 추가세율 세율표',
    description: '양도세 중과가 뭔지, 기본세율이랑 중과세율이 얼마나 차이 나는지 궁금하시죠? 2주택 +20%p, 3주택 +30%p 추가세율에 장특공제 배제까지 — 과세표준 구간별 세율표와 계산 방법을 정리해드려요.',
    keywords: ['양도세 중과 뜻', '기본세율 중과세율 차이', '2주택 3주택 추가세율', '양도세 중과 세율표'],
    ogTitle: '양도세 중과 뜻 기본세율 중과세율 차이 | 머니위키',
    ogDescription: '기본세율 vs 중과세율 세금 차이를 세율표로 바로 비교해 보세요.',
  },

  hub: {
    url: '/w/다주택양도세-중과유예-세율-절세-전략',
    name: '다주택양도세 중과유예 세율 절세 전략',
  },

  breadcrumb: ['세금', '양도소득세', '양도세 중과 뜻'],

  summary3: [
    <>양도세 중과는 기본세율에 <strong>2주택 +20%p, 3주택 +30%p</strong>를 추가하는 제도예요</>,
    <>장기보유특별공제가 <strong>배제</strong>돼서 실질 세금이 두 배 이상 늘어요</>,
    <>중과 유예는 <strong>2026년 5월 9일</strong> 종료 확정, 잔금일 기준 판단</>,
  ],

  sourceBar: {
    badge: '출처',
    name: '소득세법 제104조 + 정책브리핑 중과유예 종료 보완방안',
    date: '2026.02',
  },

  prevNext: {
    prev: { title: '중과 유예 연혁 종료일 확정', href: '/w/중과-유예-연혁-종료일-확정' },
    next: { title: '다주택 중과 전후 세액 비교', href: '/w/다주택-양도세-중과-전후-세액-비교' },
  },

  stickyBar: {
    topLabel: '기본 vs 중과',
    value: '최대 +30%p',
    buttonText: '세금 비교하기 →',
    scrollTo: '#checker',
  },

  hero: {
    badge: '2026년 2월 기준',
    h1: (
      <>
        양도세 중과 뜻 <span className="text-[#1E3A5F]">기본세율 중과세율 차이</span> | 2주택 3주택 추가세율 세율표
      </>
    ),
    intro: (
      <p className="text-base text-neutral-500 leading-relaxed">
        양도세 중과가 적용되면 세율이 최대 75%까지 올라가는데, 과세표준 3억원 기준으로 기본세율 38%와 3주택 중과세율 68% 사이에 약 1.5억원 차이가 나요.
        세율만 높아지는 게 아니라 장기보유특별공제까지 배제되니까 실제 세금 차이는 더 벌어져요.
        2026년 5월 9일 유예 종료 전에 기본세율과 중과세율이 정확히 얼마나 차이 나는지 세율표로 정리했어요.
      </p>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '다주택 양도세 중과유예 세율 절세 전략 한눈에 보기',
    },
    quickAnswer: {
      title: '양도세 중과란?',
      body: '양도세 중과는 다주택자가 조정대상지역 내 주택을 팔 때 기본세율(6~45%)에 추가 세율(2주택 +20%p, 3주택 +30%p)을 더해 부과하는 제도예요. 장기보유특별공제도 배제돼요.',
      hook: '기본세율과 중과세율 세금 차이를 세율표에서 바로 비교할 수 있어요.',
    },
  },

  toc: [
    { id: 'checker', label: '기본세율 vs 중과세율 비교' },
    { id: 'sec-meaning', label: '양도세 중과 뜻은 정확히 무엇인가요?' },
    { id: 'sec-rate-diff', label: '양도세 기본세율 중과세율 차이는 얼마나 되나요?' },
    { id: 'sec-addition', label: '2주택 3주택 양도세 추가세율은 각각 얼마인가요?' },
    { id: 'sec-table', label: '양도세 중과 세율표에서 내 구간은 어떻게 확인하나요?' },
    { id: 'sec-faq', label: '자주 묻는 질문' },
  ],

  sections: [
    /* ===== CHECK ===== */
    {
      id: 'checker',
      number: 'CHECK',
      heading: '양도세 기본세율 vs 중과세율, 내 세금 차이는?',
      subtitle: '주택 수와 양도차익을 선택하면 세금 차이를 바로 확인할 수 있어요',
      content: <YangdoseJungkwaChecker />,
    },

    /* ===== SECTION 02: 양도세 중과 뜻 =====
     * 시각: Chips + DetailBox
     * 전환: A 독자 대변형
     */
    {
      id: 'sec-meaning',
      number: 'SECTION 02',
      heading: '양도세 중과 뜻은 정확히 무엇인가요?',
      subtitle: '기본세율 위에 추가 세율을 더해서 부과하는 제도예요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            양도세 중과는 다주택자가 <a href="/w/조정대상지역-목록-서울-경기" className="text-[#4A7AB5] underline">조정대상지역</a> 안에 있는 주택을 팔 때 기본세율(6~45%)에 추가 세율을 얹어서 세금을 부과하는 제도예요. <a href="https://law.go.kr/법령/소득세법/제104조" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">소득세법 제104조</a>에 따라 2주택자는 기본세율에 20%포인트를, 3주택 이상은 30%포인트를 더해요. 투기 수요를 억제하기 위해 정부가 도입한 제도예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            세율만 올라가는 게 아니에요. 중과 대상이 되면 장기보유특별공제(다주택자 최대 30%)가 아예 적용되지 않아요. 양도차익 5억원에 10년 보유했다면 1.5억원을 공제받을 수 있었는데, 중과가 되면 이 공제가 전부 사라져요. 세율 인상과 공제 배제가 동시에 적용되니까, 실질 세금은 2배를 넘는 경우가 많아요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            현재 중과유예 조치가 적용 중이라 다주택자도 기본세율로 양도할 수 있어요. 하지만 2026년 2월 12일 정부 발표에 따르면 유예는 <strong>2026년 5월 9일 예정대로 종료</strong>돼요. 유예가 끝나면 조정대상지역 내 다주택자에게 추가세율이 다시 적용돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            중과가 걸리면 세율과 공제 두 가지가 동시에 불리해지는 거예요. 기본세율과 중과세율이 구체적으로 얼마나 차이 나는지 확인해 보고 싶잖아요.
          </p>

          <Chips items={[
            { icon: '📊', label: '2주택 추가세율', value: '+20%p' },
            { icon: '📊', label: '3주택 추가세율', value: '+30%p' },
            { icon: '🚫', label: '장특공제', value: '배제' },
            { icon: '📅', label: '유예 종료', value: '2026.5.9' },
          ]} />

          <DetailBox
            title="양도세 중과 핵심 3가지"
            items={[
              { heading: '추가세율 부과', desc: '기본세율(6~45%)에 2주택 20%p, 3주택 이상 30%p를 더해요' },
              { heading: '장특공제 배제', desc: '보유기간이 아무리 길어도 장기보유특별공제를 받을 수 없어요' },
              { heading: '적용 조건', desc: '조정대상지역 내 주택을 양도하는 1세대 2주택 이상 보유자에게 적용돼요' },
            ]}
          />

          <SpokeLinks
            title="양도세 중과 더 알아보기"
            items={[
              { num: '01', heading: '중과 유예 연혁과 종료일 확정', desc: '2022년부터 매년 연장된 유예 제도 전체 흐름', href: '/w/중과-유예-연혁-종료일-확정' },
              { num: '02', heading: '중과 배제 대상 주택과 신고', desc: '상속주택, 임대등록 주택 등 중과에서 빠지는 경우', href: '/w/다주택자-양도세-중과-배제-대상-주택-신고' },
            ]}
          />
        </>
      ),
      pasBridge: {
        href: '/w/다주택-양도세-중과-전후-세액-비교',
        question: '중과가 적용되면 세금이 구체적으로 얼마나 더 나오나요?',
        answer: <>과세표준 구간별로 기본세율과 중과세율이 <strong>최대 30%포인트</strong>까지 차이 나요</>,
        buttonText: '세율 차이 확인 →',
      },
    },

    /* ===== SECTION 03: 기본세율 중과세율 차이 =====
     * 시각: SpokeTable + SpokeRateBars
     * 전환: D 화제 전환형
     */
    {
      id: 'sec-rate-diff',
      number: 'SECTION 03',
      heading: '양도세 기본세율 중과세율 차이는 얼마나 되나요?',
      subtitle: '과세표준 구간별로 기본세율과 중과세율을 나란히 비교해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            양도소득세 기본세율은 종합소득세와 동일한 8단계 누진세 구조예요. 과세표준이 커질수록 세율이 올라가고, 가장 낮은 구간은 1,400만원 이하 6%, 가장 높은 구간은 10억원 초과 45%예요. 여기에 중과가 적용되면 각 구간마다 2주택은 20%p, 3주택은 30%p가 추가로 얹혀요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            누진세이기 때문에 전체에 하나의 세율을 곱하는 게 아니에요. 과세표준 6,000만원이라면 1,400만원까지는 6%, 5,000만원까지는 15%, 나머지 1,000만원에는 24%가 적용돼요. 이걸 쉽게 계산하기 위해 '누진공제'를 사용하는 거예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            과세표준 3억원이라면 기본세율은 38%이고, 3주택 중과세율은 38%+30%p=68%예요. 여기에 장기보유특별공제 배제까지 겹치면 과세표준 자체가 커지니까 세금 차이는 더 벌어져요. 아래 세율표에서 구간별 차이를 확인해 보세요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            그런데 한 가지 주의할 게 있어요. <a href="/w/양도세-잔금일-기준-계약일-판단" className="text-[#4A7AB5] underline">잔금일 기준</a>으로 유예 종료 전에 양도하면 중과세율이 아닌 기본세율만 적용돼요.
          </p>

          <SpokeTable
            id="rate-compare"
            title="기본세율 vs 중과세율 비교 세율표"
            subtitle="2026년 기준, 소득세법 제104조"
            headers={['과세표준', '기본세율', '2주택 중과', '3주택+ 중과', '누진공제']}
            rows={[
              ['1,400만원 이하', '6%', '26%', '36%', '-'],
              ['5,000만원 이하', '15%', '35%', '45%', '126만원'],
              ['8,800만원 이하', '24%', '44%', '54%', '576만원'],
              ['1.5억원 이하', '35%', '55%', '65%', '1,544만원'],
              ['3억원 이하', '38%', '58%', '68%', '1,994만원'],
              ['5억원 이하', '40%', '60%', '70%', '2,594만원'],
              ['10억원 이하', '42%', '62%', '72%', '3,594만원'],
              ['10억원 초과', '45%', '65%', '75%', '6,594만원'],
            ]}
            highlightCol={3}
          />

          <SpokeRateBars bars={[
            { label: '1주택/유예 중 최고세율', rate: '45%', width: '60%' },
            { label: '2주택 중과 최고세율', rate: '65%', width: '87%' },
            { label: '3주택 중과 최고세율', rate: '75%', width: '100%' },
          ]} />

          <SpokeLinks
            title="세율 관련 더 알아보기"
            items={[
              { num: '01', heading: '2주택자 양도세 비과세 조건', desc: '일시적 2주택 등 비과세 받는 방법', href: '/w/2주택자-양도세-비과세-조건-세율-계산' },
              { num: '02', heading: '3주택자 양도세 중과세율 계산', desc: '3주택 이상일 때 세금 계산 방법', href: '/w/3주택자-양도세-중과세율-계산-비과세' },
            ]}
          />
        </>
      ),
      pasBridge: {
        href: '/w/조정대상지역-다주택자-양도세-중과세율-비과세',
        question: '2주택이랑 3주택 추가세율이 구체적으로 어떻게 적용되나요?',
        answer: <>2주택은 모든 구간에 <strong>+20%p</strong>, 3주택은 <strong>+30%p</strong>가 일률 추가돼요</>,
        buttonText: '추가세율 상세 보기 →',
      },
    },

    /* ===== SECTION 04: 2주택 3주택 추가세율 =====
     * 시각: SpokeCompareCards + FormulaBox
     * 전환: B 호기심형
     */
    {
      id: 'sec-addition',
      number: 'SECTION 04',
      heading: '2주택 3주택 양도세 추가세율은 각각 얼마인가요?',
      subtitle: '주택 수에 따라 추가세율이 다르고, 장특공제 배제도 함께 적용돼요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            2주택자는 기본세율에 20%포인트를 더해요. 과세표준 3억원이면 기본세율 38%에 20%p가 추가돼서 58%가 적용돼요. 산출세액은 약 1억 5,400만원이에요. 같은 과세표준으로 기본세율만 적용하면 약 9,400만원이니까, 2주택 추가세율만으로도 약 6,000만원 차이가 나요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            3주택 이상은 30%포인트가 추가돼요. 같은 과세표준 3억원이면 68%가 적용돼서 산출세액이 약 1.84억원이에요. 기본세율 대비 약 9,000만원, 2주택 중과 대비로도 약 3,000만원이 더 나와요. 주택 수가 1채 더 많다는 이유로 세금이 이렇게 벌어져요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            여기에 장기보유특별공제 배제 효과가 겹쳐요. 유예 기간에는 10년 보유 시 양도차익의 30%를 공제받을 수 있었는데, 중과가 되면 0%예요. 양도차익 5억원이면 공제 1.5억원이 통째로 사라지는 거예요. 추가세율 + 공제 배제가 합쳐지면 세금이 <a href="/w/다주택-양도세-중과-전후-세액-비교" className="text-[#4A7AB5] underline">두 배 이상</a> 늘어나는 구조예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            다만 <a href="/w/다주택자-양도세-중과-배제-대상-주택-신고" className="text-[#4A7AB5] underline">중과 배제 대상</a>에 해당하면 다주택이라도 기본세율이 적용될 수 있어요. 상속주택(5년 이내), 일시적 2주택(3년 이내 처분), 장기임대등록 주택 등이 대표적이에요.
          </p>

          <SpokeCompareCards cards={[
            {
              title: '2주택 중과',
              subtitle: '기본세율 +20%p',
              items: [
                '최저 26% ~ 최고 65%',
                '과세표준 3억 기준 약 1.54억',
                '기본세율 대비 약 6,000만 추가',
                '장기보유특별공제 배제',
              ],
            },
            {
              title: '3주택 이상 중과',
              subtitle: '기본세율 +30%p',
              items: [
                '최저 36% ~ 최고 75%',
                '과세표준 3억 기준 약 1.84억',
                '기본세율 대비 약 9,000만 추가',
                '장기보유특별공제 배제',
              ],
              recommended: true,
              recLabel: '세금 부담 최대',
            },
          ]} />

          <FormulaBox lines={[
            { text: '기본 산출세액 = 과세표준 x 기본세율 - 누진공제', numbered: true },
            { text: '중과 산출세액 = 과세표준 x (기본세율 + 추가세율) - 누진공제', numbered: true },
            { text: '// 2주택: +20%p / 3주택+: +30%p / 장특공제 배제로 과세표준도 커짐', comment: true },
          ]} />

          <SpokeLinks
            title="추가세율 관련 더 알아보기"
            items={[
              { num: '01', heading: '2주택자 양도세 비과세 조건', desc: '일시적 2주택 등 비과세 받는 방법', href: '/w/2주택자-양도세-비과세-조건-세율-계산' },
              { num: '02', heading: '3주택자 양도세 중과세율 계산', desc: '3주택 이상일 때 세금 계산 방법', href: '/w/3주택자-양도세-중과세율-계산-비과세' },
            ]}
          />
        </>
      ),
      pasBridge: {
        href: '/w/양도세-잔금일-기준-계약일-판단',
        question: '여기까지 보면 한 가지 궁금한 게 생기죠 — 세율표에서 내 구간은 어떻게 찾을까요?',
        answer: <>과세표준을 먼저 계산한 뒤 세율표에서 해당 구간을 찾으면 돼요</>,
        buttonText: '내 구간 확인 방법 →',
      },
    },

    /* ===== SECTION 05: 양도세 중과 세율표 확인 =====
     * 시각: SpokeTimeline + TipBox
     * 전환: 없음 (마지막 → bridgeCTA)
     */
    {
      id: 'sec-table',
      number: 'SECTION 05',
      heading: '양도세 중과 세율표에서 내 구간은 어떻게 확인하나요?',
      subtitle: '양도차익에서 공제를 뺀 과세표준으로 세율표 구간을 찾아요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            세율표에서 내 구간을 찾으려면 먼저 과세표준을 계산해야 해요. 과세표준은 양도차익(매도가 - 취득가 - 필요경비)에서 장기보유특별공제와 기본공제(250만원)를 뺀 금액이에요. 유예 기간이라면 장특공제가 적용되고, 중과 시에는 0원이에요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            양도차익 5억원, 10년 보유인 3주택자를 예로 들어 볼게요. 유예 기간이라면 과세표준은 5억 - 1.5억(장특 30%) - 250만 = 약 3.475억원이에요. 세율표에서 3억~5억 구간(기본세율 40%)에 해당해요. 산출세액은 3.475억 x 40% - 2,594만 = 약 1.13억원이에요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            같은 조건에서 중과가 적용되면 과세표준이 5억 - 0원 - 250만 = 약 4.975억원이에요. 세율표에서 같은 구간이지만 중과세율 70%가 적용돼요. 산출세액은 4.975억 x 70% - 2,594만 = 약 3.22억원이에요. 유예 시 대비 약 <strong>2.1억원 차이</strong>가 나요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            실제 납부할 때는 산출세액에 지방소득세 10%가 추가돼요. <a href="/w/다주택-매도-순서-전략-절세" className="text-[#4A7AB5] underline">매도 순서</a>를 어떻게 잡느냐에 따라 절세 효과가 크게 달라지니까 함께 확인해 보세요.
          </p>

          <SpokeTimeline events={[
            { month: '1단계', title: '양도차익 계산', desc: '매도가 - 취득가 - 필요경비(취득세, 중개수수료 등)', status: 'normal' as const },
            { month: '2단계', title: '과세표준 계산', desc: '양도차익 - 장특공제(유예 시) - 기본공제 250만원', status: 'normal' as const },
            { month: '3단계', title: '세율표 구간 확인', desc: '과세표준으로 8단계 누진세율표에서 해당 구간 찾기', status: 'current' as const },
            { month: '4단계', title: '산출세액 + 지방소득세', desc: '과세표준 x 세율 - 누진공제 + 지방소득세 10%', status: 'normal' as const },
          ]} />

          <TipBox title="세율표 활용 핵심 포인트">
            <ul className="list-disc pl-5 space-y-1">
              <li>유예 기간(~5.9): 장특공제 적용 → 과세표준 작아짐 → 기본세율 적용</li>
              <li>중과 적용 후: 장특공제 0원 → 과세표준 커짐 → 중과세율(+20~30%p) 적용</li>
              <li>두 가지가 동시에 작용해서 세금 차이가 2~3배까지 벌어져요</li>
            </ul>
          </TipBox>

          <SpokeLinks
            title="세금 계산 관련 더 알아보기"
            items={[
              { num: '01', heading: '중과 전후 세액 비교', desc: '양도차익별 유예 vs 중과 세금 시뮬레이션', href: '/w/다주택-양도세-중과-전후-세액-비교' },
              { num: '02', heading: '매도 순서 전략 절세', desc: '어떤 집부터 팔아야 세금을 아끼는지', href: '/w/다주택-매도-순서-전략-절세' },
            ]}
          />
        </>
      ),
      bridgeCTA: {
        href: '/w/다주택양도세-중과유예-세율-절세-전략',
        badge: '전체 전략',
        title: '다주택 양도세 절세 전략이 궁금하다면?',
        desc: '유예 기간 활용 전략부터 매도 순서까지 한 번에 확인하기',
        icon: 'grid',
        primary: true,
      },
    },

    /* ===== FAQ ===== */
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
      question: '양도세 중과와 종합부동산세 중과는 같은 건가요?',
      answer: '완전히 다른 세금이에요. 양도세 중과는 주택을 <strong>팔 때</strong> 세율이 올라가는 거고, 종부세 중과는 주택을 <strong>보유하는 동안</strong> 매년 부과되는 세금이에요. 다주택자는 두 가지 모두 영향을 받을 수 있어요.',
    },
    {
      question: '양도세 중과 유예 기간에 매매계약만 하면 되나요, 잔금까지 쳐야 하나요?',
      answer: '양도 시점은 <strong>잔금일 기준</strong>이에요. 5월 9일까지 잔금을 완료해야 유예가 적용돼요. 다만 기존 조정지역은 5월 9일 전 계약 + 4개월 내 잔금, 신규 조정지역은 6개월 내 잔금으로 경과규정이 마련됐어요.',
    },
  ],

  relatedSpokes: [
    { badge: '연혁', title: '양도세 중과 유예 연혁 종료일 확정', desc: '2022년부터 매년 연장된 유예 제도 전체 흐름', href: '/w/중과-유예-연혁-종료일-확정' },
    { badge: '계산', title: '다주택 양도세 중과 전후 세액 비교', desc: '양도차익별 유예 vs 중과 세금 차이 계산', href: '/w/다주택-양도세-중과-전후-세액-비교' },
    { badge: '지역', title: '조정대상지역 서울 경기 목록', desc: '서울 경기 조정대상지역과 해제 지역 정리', href: '/w/조정대상지역-목록-서울-경기' },
    { badge: '전략', title: '다주택 매도 순서 전략 절세', desc: '어떤 집부터 팔아야 절세가 되는지 정리', href: '/w/다주택-매도-순서-전략-절세' },
  ],

  sources: [
    { name: '소득세법 제104조(세율)', url: 'https://law.go.kr/법령/소득세법/제104조', org: '국가법령정보센터' },
    { name: '양도소득세 기본정보 세율', url: 'https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2312&cntntsId=7711', org: '국세청' },
    { name: '다주택 중과 유예 종료 보완방안', url: 'https://www.korea.kr/news/policyNewsView.do?newsId=148959488', org: '정책브리핑' },
  ],
}

export default data
