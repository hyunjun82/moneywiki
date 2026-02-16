import type { SpokeData } from './types'
import {
  SpokeTable,
  FormulaBox,
  TipBox,
  SpokeWarnBox,
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
    title: '양도세 중과 뜻 기본세율 중과세율 비교 | 2026 중과 유예 종료 후 세율 차이',
    description: '양도세 중과가 적용되면 세율이 최대 75%까지 올라간다는 사실, 알고 계셨나요? 기본세율에 최대 30%p 추가에 장특공제 배제까지, 과세표준 구간별 세율 비교와 유예 종료 후 세금 변화를 정리해드려요.',
    keywords: ['양도세 중과 뜻', '양도세 기본세율 중과세율', '양도세 중과 대상', '중과 유예 종료 세금'],
    ogTitle: '양도세 중과 뜻 기본세율 중과세율 비교 | 머니위키',
    ogDescription: '기본세율 vs 중과세율 세금 차이를 바로 비교해 보세요.',
  },

  hub: {
    url: '/w/다주택양도세-중과유예-세율-절세-전략',
    name: '다주택양도세 중과유예 세율 절세 전략',
  },

  breadcrumb: ['세금', '양도소득세', '양도세 중과 뜻'],

  summary3: [
    <>양도세 중과는 기본세율에 <strong>2주택 +20%p, 3주택 +30%p</strong>를 추가하는 제도예요</>,
    <>장기보유특별공제가 <strong>배제</strong>돼서 실질 세금이 두 배 가까이 늘어요</>,
    <>중과 유예는 <strong>2026년 5월 9일</strong> 예정대로 종료, 잔금 기한 보완책 시행</>,
  ],

  sourceBar: {
    badge: '출처',
    name: '정책브리핑 다주택 중과 유예 종료 보완방안',
    date: '2026.02',
  },

  prevNext: {
    prev: { title: '중과 유예 연혁과 종료일', href: '/w/중과-유예-연혁-종료일-확정' },
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
        양도세 <span className="text-[#1E3A5F]">중과 뜻</span>과 기본세율 중과세율 비교
      </>
    ),
    intro: (
      <p className="text-base text-neutral-500 leading-relaxed">
        양도세 중과가 되면 세율이 최대 75%까지 올라가는데, 이게 정확히 어떤 의미인지 감이 안 잡히시죠?
        기본세율 6~45%에 2주택이면 20%p, 3주택이면 30%p가 추가로 붙어요. 거기에 장기보유특별공제까지
        배제되니까 실질 세금은 두 배 가까이 뛰어요. 2026년 2월 12일 정부 발표로 중과 유예 종료가 확정됐는데,
        기본세율과 중과세율이 얼마나 차이 나는지 아래에서 바로 비교해 보세요.
      </p>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '다주택 양도세 중과유예 세율 절세 전략 한눈에 보기',
    },
    quickAnswer: {
      title: '양도세 중과란?',
      body: '양도세 중과는 다주택자가 조정대상지역 내 주택을 팔 때 기본세율(6~45%)에 추가 세율(2주택 +20%p, 3주택 +30%p)을 더해 부과하는 제도예요. 장기보유특별공제도 배제돼요.',
      hook: '기본세율과 중과세율 세금 차이를 지금 바로 비교할 수 있어요.',
    },
  },

  toc: [
    { id: 'checker', label: '기본세율 vs 중과세율 비교' },
    { id: 'sec-meaning', label: '양도세 중과란 정확히 어떤 뜻인가요?' },
    { id: 'sec-rate-compare', label: '양도세 기본세율과 중과세율은 얼마나 차이 나나요?' },
    { id: 'sec-target', label: '양도세 중과 대상은 누구이고 예외는 뭔가요?' },
    { id: 'sec-after-end', label: '양도세 중과 유예 종료 후 세금이 얼마나 늘어나나요?' },
    { id: 'sec-faq', label: '자주 묻는 질문' },
  ],

  sections: [
    /* ===== CHECK: 기본세율 vs 중과세율 비교 체커 ===== */
    {
      id: 'checker',
      number: 'CHECK',
      heading: '양도세 기본세율 vs 중과세율, 내 세금 차이는?',
      subtitle: '주택 수와 양도차익을 선택하면 세금 차이를 바로 확인할 수 있어요',
      content: <YangdoseJungkwaChecker />,
    },

    /* ===== S1: 양도세 중과 뜻 =====
     * 시각: Chips + DetailBox
     * 전환: A 독자 대변형
     */
    {
      id: 'sec-meaning',
      number: 'SECTION 02',
      heading: '양도세 중과란 정확히 어떤 뜻인가요?',
      subtitle: '기본세율 위에 추가 세율을 더해서 부과하는 제도예요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            양도세 중과는 다주택자가 <a href="/w/조정대상지역-목록-서울-경기" className="text-[#4A7AB5] underline">조정대상지역</a> 안에 있는 주택을 팔 때 기본세율(6~45%)에 추가 세율을 얹어서 세금을 부과하는 제도예요. <a href="https://law.go.kr/법령/소득세법/제104조" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">소득세법 제104조</a>에 따라 2주택자는 기본세율에 20%포인트를, 3주택 이상은 30%포인트를 더해요. 정부가 다주택 투기를 억제하려고 도입한 제도예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            세율만 올라가는 게 아니에요. 중과가 적용되면 장기보유특별공제(다주택자 최대 30%)가 아예 배제돼요. 10년을 보유해서 30%를 공제받을 수 있었던 사람도, 중과가 되면 공제 0%로 바뀌어요. 양도차익 5억원 기준으로 장특공제 30%면 과세표준이 1.5억원이나 줄어드는데, 이것만 사라져도 수천만원의 세금 차이가 나요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            현재 중과유예 조치가 적용 중이라 다주택자도 기본세율로 양도할 수 있어요. 하지만 2026년 2월 12일 정부 발표에 따르면 유예는 <strong>2026년 5월 9일 예정대로 종료</strong>돼요. 유예 기간에는 주택 수와 관계없이 기본세율만 적용되고, 장기보유특별공제도 받을 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            중과가 걸리면 세율과 공제 두 가지가 동시에 불리해지는 거예요. 구체적인 차이를 숫자로 정리해 볼게요.
          </p>

          <Chips items={[
            { icon: '📊', label: '2주택 추가세율', value: '+20%p' },
            { icon: '📊', label: '3주택 추가세율', value: '+30%p' },
            { icon: '🚫', label: '장특공제', value: '배제' },
            { icon: '📅', label: '유예 종료', value: '2026.5.9' },
          ]} />

          <DetailBox
            title="양도세 중과 핵심 요약"
            items={[
              { heading: '추가세율 부과', desc: '기본세율(6~45%)에 2주택은 20%p, 3주택 이상은 30%p를 더해요' },
              { heading: '장특공제 배제', desc: '보유기간이 아무리 길어도 장기보유특별공제를 받을 수 없어요' },
              { heading: '적용 조건', desc: '조정대상지역 내 주택을 양도하는 1세대 2주택 이상 보유자에게만 적용돼요' },
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
        question: '그래서 기본세율과 중과세율이 실제로 얼마나 차이가 나는 건가요?',
        answer: <>과세표준 구간별로 세율 차이를 비교하면 <strong>최대 30%포인트</strong>까지 벌어져요</>,
        buttonText: '세율 비교 보기 →',
      },
    },

    /* ===== S2: 기본세율 vs 중과세율 비교 =====
     * 시각: SpokeTable + SpokeRateBars
     * 전환: D 화제 전환형
     */
    {
      id: 'sec-rate-compare',
      number: 'SECTION 03',
      heading: '양도세 기본세율과 중과세율은 얼마나 차이 나나요?',
      subtitle: '과세표준 구간별로 기본세율과 중과세율을 나란히 비교해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            양도소득세 기본세율은 종합소득세와 동일한 8단계 누진세 구조예요. 과세표준(양도차익에서 공제를 뺀 금액)이 커질수록 세율이 올라가요. 가장 낮은 구간은 1,400만원 이하로 6%, 가장 높은 구간은 10억원 초과로 45%가 적용돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            누진세라서 구간별로 세율이 따로 적용되는 게 핵심이에요. 과세표준이 6,000만원이라면 1,400만원까지는 6%, 5,000만원까지는 15%, 나머지 1,000만원에는 24%가 적용돼요. 전체에 24%를 곱하는 게 아니에요. 이걸 쉽게 계산하기 위해 '누진공제'를 쓰는 거예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            중과가 되면 이 기본세율 위에 2주택은 20%p, 3주택은 30%p가 추가로 얹혀요. 과세표준 3억원이라면 기본세율 38%에 3주택 중과 30%p가 더해져서 68%가 되는 거예요. 여기에 장기보유특별공제 배제까지 겹치면 과세표준 자체가 커지니까 세금 차이는 더 벌어져요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            아래 표에서 구간별로 기본세율과 중과세율을 나란히 비교해 보세요. <a href="/w/양도세-잔금일-기준-계약일-판단" className="text-[#4A7AB5] underline">잔금일 기준</a>으로 유예 종료 전에 양도하면 기본세율만 적용돼요.
          </p>

          <SpokeTable
            id="rate-compare"
            title="기본세율 vs 중과세율 비교표"
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

          <FormulaBox lines={[
            { text: '기본 산출세액 = 과세표준 x 기본세율 - 누진공제', numbered: true },
            { text: '중과 산출세액 = 과세표준 x (기본세율 + 추가세율) - 누진공제', numbered: true },
            { text: '// 2주택: +20%p / 3주택+: +30%p / 장특공제 배제로 과세표준 자체도 커짐', comment: true },
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
        question: '세율 차이는 알겠는데, 정확히 누가 중과 대상인지 궁금하시죠?',
        answer: <>조정대상지역 + 2주택 이상이면 대상이지만 <strong>예외도 꽤 많아요</strong></>,
        buttonText: '중과 대상 확인 →',
      },
    },

    /* ===== S3: 중과 대상과 예외 =====
     * 시각: SpokeCompareCards + SpokeWarnBox
     * 전환: B 자연 호기심형
     */
    {
      id: 'sec-target',
      number: 'SECTION 04',
      heading: '양도세 중과 대상은 누구이고 예외는 뭔가요?',
      subtitle: '조정대상지역 내 2주택 이상이 기본이지만 예외가 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            양도세 중과 대상은 1세대가 조정대상지역 내에서 2주택 이상을 보유한 상태에서 주택을 양도하는 경우예요. 여기서 '1세대'란 배우자와 같은 주소에서 생계를 같이하는 가족이에요. 부부가 각각 1채씩 가지고 있으면 1세대 2주택이에요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            특히 주의할 점은 2021년 1월 1일 이후 취득한 분양권과 입주권도 주택 수에 포함된다는 거예요. 오피스텔도 주거용으로 사용하면 주택 수에 들어가요. 단순히 등기부상 주택 수만 세는 게 아니라 실질적인 주거용 부동산 전체를 따지는 거예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            다만 중과에서 제외되는 예외도 상당히 많아요. 상속받은 주택(5년 이내), 이사를 위한 일시적 2주택(3년 이내 처분), 장기임대등록 주택, 농어촌 주택, 혼인 합산 2주택(5년 이내) 등이에요. 본인이 중과 대상인지 판단하려면 주택 수, 지역, 보유 기간, 취득 사유를 종합적으로 봐야 해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            중과 대상과 비대상의 핵심 차이를 비교해 볼게요. <a href="/w/다주택자-양도세-중과-배제-대상-주택-신고" className="text-[#4A7AB5] underline">중과 배제 대상</a>에 해당하는지 꼭 확인하세요.
          </p>

          <SpokeCompareCards cards={[
            {
              title: '중과 대상',
              subtitle: '추가세율 적용',
              items: [
                '조정대상지역 내 주택 양도',
                '1세대 2주택 이상 보유',
                '분양권/입주권도 주택 수 포함',
                '주거용 오피스텔도 포함',
              ],
            },
            {
              title: '중과 배제(예외)',
              subtitle: '기본세율 적용',
              items: [
                '상속주택 (5년 이내)',
                '일시적 2주택 (3년 이내 처분)',
                '장기임대등록 주택',
                '농어촌 주택 / 혼인 합산 5년',
              ],
              recommended: true,
              recLabel: '해당 시 확인',
            },
          ]} />

          <SpokeWarnBox title="분양권/오피스텔 주의">
            <p className="mb-0 leading-relaxed">
              2021년 1월 1일 이후 취득한 분양권은 주택 수에 포함돼요. 기존 1주택에 분양권 1개를 보유하면
              2주택으로 간주될 수 있어요. 오피스텔도 실제 주거 목적이면 주택으로 봐요.
            </p>
          </SpokeWarnBox>
        </>
      ),
      pasBridge: {
        href: '/w/중과-유예-연혁-종료일-확정',
        question: '중과 대상이면 유예가 끝난 뒤 세금이 얼마나 늘어나는지 궁금하시죠?',
        answer: <>2026년 5월 9일 유예 종료 후 <strong>보완 방안</strong>까지 함께 확인하세요</>,
        buttonText: '유예 종료 일정 보기 →',
      },
    },

    /* ===== S4: 유예 종료 후 세금 영향 =====
     * 시각: SpokeTimeline + TipBox
     * 전환: 없음 (마지막 → bridgeCTA)
     */
    {
      id: 'sec-after-end',
      number: 'SECTION 05',
      heading: '양도세 중과 유예 종료 후 세금이 얼마나 늘어나나요?',
      subtitle: '2026년 5월 9일 이후 중과 복원, 잔금 기한 보완책 시행',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            2026년 2월 12일 정부 발표에 따르면, 다주택자 양도세 중과 유예는 2026년 5월 9일 예정대로 종료돼요. 유예가 끝나면 조정대상지역 내 다주택자에게 추가세율(2주택 +20%p, 3주택 +30%p)이 다시 적용되고, 장기보유특별공제도 배제돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            다만 정부가 보완 방안을 함께 마련했어요. 기존 조정대상지역(강남/서초/송파/용산)은 5월 9일 전 매매계약을 완료하고 계약일로부터 <strong>4개월 내 잔금</strong>을 치르면 중과가 적용되지 않아요. 2025년 10월 16일 이후 신규 지정된 조정대상지역은 <strong>6개월 내 잔금</strong>으로 2개월 추가 여유를 줬어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            양도차익 5억원인 3주택자를 예로 들면, 유예 기간에는 장특공제를 적용받아 과세표준 약 3.5억원에 기본세율 38%로 약 1.1억원의 세금이 나와요. 중과가 적용되면 공제 없이 약 5억원에 70%가 적용돼서 약 3.2억원이 나와요. <strong>약 2.1억원</strong>이나 차이 나는 거예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            <a href="/w/다주택-매도-순서-전략-절세" className="text-[#4A7AB5] underline">매도 순서</a>를 어떻게 잡느냐에 따라 절세 효과가 크게 달라져요. 유예 종료 전까지의 일정을 시간순으로 정리해 봤어요.
          </p>

          <SpokeTimeline events={[
            { month: '2026.02', title: '정부 보완 방안 발표', desc: '중과 유예 종료 확정, 잔금 기한 보완책 마련', status: 'current' as const },
            { month: '2026.02', title: '소득세법 시행령 입법예고', desc: '2월 13일부터 입법예고, 2월 내 공포 시행 목표', status: 'normal' as const },
            { month: '2026.05.09', title: '중과 유예 종료', desc: '이 날까지 양도(잔금) 완료해야 기본세율 적용', status: 'warning' as const },
            { month: '2026.09', title: '기존 조정지역 잔금 기한', desc: '5월 9일 전 계약 + 계약일로부터 4개월 내 잔금', status: 'normal' as const },
            { month: '2026.11', title: '신규 조정지역 잔금 기한', desc: '5월 9일 전 계약 + 계약일로부터 6개월 내 잔금', status: 'normal' as const },
          ]} />

          <TipBox title="잔금 기한 보완책 핵심">
            <ul className="list-disc pl-5 space-y-1">
              <li>기존 조정지역(강남/서초/송파/용산): 5월 9일 전 계약 + <strong>4개월 내 잔금</strong></li>
              <li>신규 조정지역(위 4구 외): 5월 9일 전 계약 + <strong>6개월 내 잔금</strong></li>
              <li>토지거래허가 실거주 의무도 같은 기간으로 유예돼요</li>
            </ul>
          </TipBox>
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
      answer: '양도 시점은 <strong>잔금일 기준</strong>이에요. 5월 9일까지 잔금을 완료해야 유예가 적용돼요. 다만 기존 조정지역은 5월 9일 전 계약 + 4개월 내 잔금, 신규 조정지역은 6개월 내 잔금으로 보완책이 마련됐어요.',
    },
  ],

  relatedSpokes: [
    { badge: '연혁', title: '중과 유예 연혁과 종료일 확정', desc: '2022년부터 매년 연장된 유예 제도 전체 흐름', href: '/w/중과-유예-연혁-종료일-확정' },
    { badge: '계산', title: '다주택 양도세 중과 전후 세액 비교', desc: '실제 사례로 기본세율과 중과세율 세금 차이 계산', href: '/w/다주택-양도세-중과-전후-세액-비교' },
    { badge: '지역', title: '조정대상지역 목록 서울 경기', desc: '서울 경기 조정대상지역과 해제 지역 정리', href: '/w/조정대상지역-목록-서울-경기' },
    { badge: '전략', title: '다주택 매도 순서 전략 절세', desc: '어떤 집부터 팔아야 절세가 되는지 순서 정리', href: '/w/다주택-매도-순서-전략-절세' },
  ],

  sources: [
    { name: '소득세법 제104조(세율)', url: 'https://law.go.kr/법령/소득세법/제104조', org: '국가법령정보센터' },
    { name: '양도소득세 기본정보 세율', url: 'https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2312&cntntsId=7711', org: '국세청' },
    { name: '다주택 중과 유예 종료 보완방안', url: 'https://www.korea.kr/news/policyNewsView.do?newsId=148959488', org: '정책브리핑' },
  ],
}

export default data
