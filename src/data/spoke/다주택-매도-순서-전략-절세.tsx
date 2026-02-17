import type { SpokeData } from './types'
import {
  SpokeStepCards,
  FormulaBox,
  SpokeTimeline,
  SpokeRateBars,
  SpokeTable,
  SpokeCompareCards,
  SpokeChecklist,
  TipBox,
  SpokeLinks,
} from '@/components/spoke/SpokeBlocks'
import MaedoSunseChecker from '@/components/checkers/MaedoSunseChecker'

const data: SpokeData = {
  slug: '다주택-매도-순서-전략-절세',

  meta: {
    title: '다주택 매도 순서 절세 전략 | 양도세 중과 유예 매도 타이밍',
    description: '다주택자가 어떤 집부터 팔아야 세금을 줄일 수 있는지 아시나요? 양도차익 큰 주택 먼저, 유예 기간 내 잔금까지 — 매도 순서와 타이밍별 절세 전략을 정리해드려요.',
    keywords: ['다주택 매도 순서 전략', '다주택 양도세 절세 방법', '양도세 중과 매도 타이밍', '다주택 처분 순서 절세'],
    ogTitle: '다주택 매도 순서 절세 전략 | 머니위키',
    ogDescription: '다주택자 매도 순서별 절세 전략과 유예 기간 매도 타이밍을 정리했어요.',
  },

  hub: {
    url: '/w/다주택양도세-중과유예-세율-절세-전략',
    name: '다주택양도세 중과유예 세율 절세 전략',
  },

  breadcrumb: ['세금', '양도소득세', '매도 순서 절세'],

  summary3: [
    <>양도차익이 큰 주택을 <strong>유예 기간 내에 먼저</strong> 파는 게 핵심이에요</>,
    <>3주택 → 2주택 → 1주택 순서로 줄이면 <strong>세율과 공제가 동시에 유리</strong>해져요</>,
    <>최종 1주택 달성 후 <strong>2년 보유+거주로 12억 비과세</strong>가 절세의 완성이에요</>,
  ],

  sourceBar: {
    badge: '출처',
    name: '소득세법 제104조 세율 + 국세청 양도소득세 안내',
    date: '2026.02',
  },

  prevNext: {
    prev: { title: '다주택 양도세 중과 전후 세액 비교', href: '/w/다주택-양도세-중과-전후-세액-비교' },
    next: { title: '다주택 증여 양도 비교 부담부증여', href: '/w/다주택-증여-양도-비교-부담부증여' },
  },

  stickyBar: {
    topLabel: '매도 순서 절세',
    value: '유예 종료 D-day',
    buttonText: '절세 전략 확인 →',
    scrollTo: '#checker',
  },

  hero: {
    badge: '2026년 2월 기준',
    h1: (
      <>
        다주택 매도 순서 <span className="text-[#1E3A5F]">절세 전략</span> | 양도세 중과 유예 매도 타이밍
      </>
    ),
    intro: (
      <p className="text-base text-neutral-500 leading-relaxed">
        다주택자가 세금을 줄이려면 어떤 집을 먼저 파느냐가 핵심이에요.
        같은 집이라도 파는 순서와 시기에 따라 세금이 수천만원에서 수억원까지 달라져요.
        중과 유예가 2026년 5월 9일에 종료될 예정이라, 지금이 매도 전략을 세울 마지막 시점이에요.
        양도차익별 우선순위부터 시기별 전략까지 차례대로 정리해 볼게요.
      </p>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '다주택 양도세 중과유예 세율 절세 전략 전체 보기',
    },
    quickAnswer: {
      title: '다주택 매도 순서 핵심은?',
      body: '양도차익이 큰 주택을 유예 기간(2026.5.9까지) 안에 먼저 파는 게 절세의 핵심이에요. 3주택자라면 1채를 팔아 2주택이 되면 중과세율이 30%p에서 20%p로 줄어들고, 최종 1주택이 되면 12억까지 비과세를 노릴 수 있어요.',
      hook: '내 상황에 맞는 매도 우선순위를 아래에서 확인해 보세요.',
    },
  },

  toc: [
    { id: 'checker', label: '매도 순서 절세 핵심 요약' },
    { id: 'sec-why', label: '다주택 매도 순서 전략은 왜 중요한가요?' },
    { id: 'sec-priority', label: '다주택 양도세 절세를 위해 어떤 순서로 팔아야 하나요?' },
    { id: 'sec-timing', label: '양도세 중과 매도 타이밍은 어떻게 잡나요?' },
    { id: 'sec-checklist', label: '다주택 처분 순서 절세 체크리스트는 뭔가요?' },
    { id: 'sec-faq', label: '자주 묻는 질문' },
  ],

  sections: [
    /* ===== CHECK: 매도 순서 절세 핵심 ===== */
    {
      id: 'checker',
      number: 'CHECK',
      heading: '다주택 매도 순서 절세, 핵심만 먼저 볼게요',
      subtitle: '유예 기간 내 매도 시 양도차익별 절세 효과를 한눈에 비교해요',
      content: <MaedoSunseChecker />,
    },

    /* ===== SECTION 02: 매도 순서 중요성 =====
     * 시각: SpokeStepCards + FormulaBox
     * 전환: A 독자 대변형
     */
    {
      id: 'sec-why',
      number: 'SECTION 02',
      heading: '다주택 매도 순서 전략은 왜 중요한가요?',
      subtitle: '순서에 따라 주택 수, 세율, 공제가 모두 달라져요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            다주택자가 주택을 처분할 때 순서가 중요한 이유는 크게 세 가지예요. 첫째, 주택을 하나 팔 때마다 보유 주택 수가 줄어들어서 나머지 주택의 세율이 달라져요. 3주택에서 2주택이 되면 <a href="/w/양도세-중과-뜻-기본세율-중과세율-비교" className="text-[#4A7AB5] underline">중과 추가세율</a>이 30%p에서 20%p로 줄어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            둘째, 양도차익이 큰 주택을 중과 유예 기간에 팔면 절세 효과가 극대화돼요. 양도차익이 작은 집을 먼저 팔면 유예 기간을 효율적으로 활용하지 못해요. 양도차익 8억짜리를 유예 기간에 파느냐 마느냐로 3.5억원 이상 차이가 나니까, 매도 순서가 곧 돈이에요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            셋째, 최종적으로 1주택이 되면 2년 보유(조정대상지역 2년 거주) 후 12억원까지 비과세를 받을 수 있어요. 마지막에 남길 주택을 미리 정하고 역순으로 매도 계획을 세우는 게 절세의 출발점이에요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            결국 매도 순서는 '지금 당장의 세금'과 '향후 비과세 달성'을 동시에 고려해야 하는 전략적 판단이에요.
          </p>

          <SpokeStepCards steps={[
            { title: '3주택 → 2주택', desc: '첫 번째 매도로 주택 수 줄이기. 중과 유예 중이면 기본세율 적용', tip: '양도차익 큰 주택 먼저' },
            { title: '2주택 → 1주택', desc: '두 번째 매도. 1주택 비과세 길이 열림', tip: '보유 기간 긴 주택 우선' },
            { title: '1주택 비과세', desc: '2년 보유(+2년 거주) 후 12억까지 비과세', tip: '최종 목표' },
          ]} />

          <FormulaBox lines={[
            { text: '절세 효과 = 양도차익 x (중과세율 - 기본세율) + 장특공제 복원분', numbered: true },
            { text: '// 핵심: 양도차익이 클수록 유예 기간 내 매도의 절세 효과가 큼', comment: true },
            { text: '최종 1주택 비과세(12억) 달성이 가장 큰 절세', numbered: true },
          ]} />

          <SpokeLinks
            title="매도 순서 기본 개념"
            items={[
              { num: '01', heading: '양도세 중과 뜻 기본세율 비교', desc: '기본세율과 중과세율 차이를 한눈에 비교', href: '/w/양도세-중과-뜻-기본세율-중과세율-비교' },
              { num: '02', heading: '다주택 양도세 중과 전후 세액 비교', desc: '양도차익별 유예 vs 중과 세금 차이', href: '/w/다주택-양도세-중과-전후-세액-비교' },
            ]}
          />
        </>
      ),
      pasBridge: {
        href: '/w/다주택-양도세-중과-전후-세액-비교',
        question: '순서가 중요한 건 알겠는데, 구체적으로 어떤 기준으로 정해야 하나요?',
        answer: <>양도차익, 보유 기간, 최종 1주택 전략 — 이 <strong>세 가지 기준</strong>으로 우선순위를 정하면 돼요</>,
        buttonText: '매도 우선순위 확인 →',
      },
    },

    /* ===== SECTION 03: 매도 우선순위 =====
     * 시각: SpokeTimeline + SpokeRateBars
     * 전환: B 호기심형
     */
    {
      id: 'sec-priority',
      number: 'SECTION 03',
      heading: '다주택 양도세 절세를 위해 어떤 순서로 팔아야 하나요?',
      subtitle: '양도차익 큰 주택, 보유 기간 긴 주택을 먼저 팔아요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            매도 우선순위의 첫 번째 기준은 <strong>양도차익</strong>이에요. 양도차익이 큰 주택일수록 중과 시 세금 증가폭이 크기 때문에, 유예 기간 안에 먼저 파는 게 유리해요. 양도차익이 2억인 집과 8억인 집이 있다면, 8억짜리를 먼저 파는 게 절세 효과가 훨씬 커요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            두 번째 기준은 <strong>보유 기간</strong>이에요. 유예 기간에는 3년 이상 보유한 주택에 장기보유특별공제(연 2%, 최대 30%)가 적용돼요. 10년 보유하면 30%를 공제받을 수 있으니까, 오래 보유한 주택을 유예 기간에 파는 게 유리해요. 중과가 되면 이 공제가 전부 날아가거든요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            세 번째 기준은 <strong>최종 1주택 전략</strong>이에요. 마지막에 남길 주택은 2년 보유(+2년 거주) 후 12억원까지 비과세를 받을 수 있는 주택으로 정하는 게 좋아요. 비과세 요건을 충족할 가능성이 높은 실거주 주택을 마지막까지 보유하세요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            아래 예시를 보면 양도차익 규모에 따라 절세 효과가 얼마나 달라지는지 체감할 수 있어요.
          </p>

          <SpokeTimeline events={[
            { month: '1순위', title: '양도차익 가장 큰 주택', desc: '양도차익 8억, 보유 12년 → 유예 기간 내 매도', status: 'current' as const, tag: '먼저' },
            { month: '2순위', title: '양도차익 중간 주택', desc: '양도차익 3억, 보유 7년 → 유예 기간 내 매도', status: 'normal' as const, tag: '다음' },
            { month: '보유', title: '최종 1주택(실거주)', desc: '2년 거주 요건 충족 후 12억 비과세 목표', status: 'normal' as const, tag: '보유' },
          ]} />

          <SpokeRateBars bars={[
            { label: '양도차익 2억: 유예 vs 중과 차이', rate: '약 5,600만원', width: '28%' },
            { label: '양도차익 5억: 유예 vs 중과 차이', rate: '약 2.17억원', width: '54%' },
            { label: '양도차익 8억: 유예 vs 중과 차이', rate: '약 3.56억원', width: '89%' },
            { label: '양도차익 10억: 유예 vs 중과 차이', rate: '약 4.02억원', width: '100%' },
          ]} />

          <SpokeLinks
            title="매도 우선순위 관련 글"
            items={[
              { num: '01', heading: '양도세 잔금일 기준 계약일 차이', desc: '잔금일 하루 차이로 세금이 갈리는 이유', href: '/w/양도세-잔금일-기준-계약일-판단' },
              { num: '02', heading: '3주택자 양도세 중과세율 계산', desc: '3주택자 세금 계산 방법과 비과세 조건', href: '/w/3주택자-양도세-중과세율-계산-비과세' },
            ]}
          />
        </>
      ),
      pasBridge: {
        href: '/w/양도세-잔금일-기준-계약일-판단',
        question: '여기까지 보면 한 가지 궁금한 게 생기죠 — 정확히 언제까지 팔아야 유예를 받을 수 있나요?',
        answer: <>2026년 5월 9일까지 <strong>잔금을 치러야</strong> 유예가 적용돼요. 시기별로 전략이 달라요.</>,
        buttonText: '매도 타이밍 확인 →',
      },
    },

    /* ===== SECTION 04: 시기별 전략 =====
     * 시각: SpokeTable + SpokeCompareCards
     * 전환: C 간결 연결형
     */
    {
      id: 'sec-timing',
      number: 'SECTION 04',
      heading: '양도세 중과 매도 타이밍은 어떻게 잡나요?',
      subtitle: '유예 종료 전, 직전, 종료 후 세 단계로 나눠서 대비해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            매도 전략은 시기에 따라 달라져요. 유예 종료 3개월 전(~2월), 종료 직전(3~5월), 종료 후(5월 10일~) 세 구간으로 나누면 각각 다른 접근이 필요해요. 지금(2026년 2월)은 아직 여유가 있지만, 매수자 찾기와 <a href="/w/양도세-잔금일-기준-계약일-판단" className="text-[#4A7AB5] underline">잔금 일정</a>을 고려하면 지금부터 움직여야 해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            유예 종료 후에도 보완조치가 있어요. 기존 조정대상지역(강남, 서초, 송파, 용산)은 5월 9일 전 계약 시 <strong>4개월 내 잔금</strong>까지 유예가 적용돼요. 신규 조정대상지역은 <strong>6개월 내 잔금</strong>이 기한이에요. 이 경과규정을 활용하면 5월 9일이 지나도 기본세율을 받을 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            비조정대상지역 주택은 유예 종료와 상관없이 항상 기본세율이에요. 조정대상지역 주택을 먼저 처분하고, <a href="/w/조정대상지역-목록-서울-경기" className="text-[#4A7AB5] underline">비조정대상지역</a> 주택은 나중에 양도하는 것도 전략이에요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            3주택자라면 1채를 먼저 팔아서 2주택이 되면, 남은 주택에 대한 중과세율이 30%p에서 20%p로 줄어요. 양도차익 5억 기준으로 이것만으로도 약 5,000만원 차이가 나요.
          </p>

          <SpokeTable id="timing-strategy" title="매도 시기별 전략" subtitle="2026년 기준" headers={['시기', '상황', '전략']} rows={[
            ['~2026.2', '유예 종료 3개월+ 전', '양도차익 큰 주택 매물 등록, 매수자 탐색'],
            ['2026.3~4', '유예 종료 직전', '잔금일 5월 초 이전 확정, 계약 체결'],
            ['2026.5.1~5.9', '유예 마지막 주', '잔금 수령 완료, 등기 이전 확인'],
            ['2026.5.10~', '유예 종료 후', '경과규정 활용, 증여 전환 검토'],
          ]} />

          <SpokeCompareCards cards={[
            {
              title: '유예 종료 전(~5.9)',
              subtitle: '기본세율 적용',
              items: [
                '양도차익 큰 주택 우선 매도',
                '기본세율 6~45% 적용',
                '장특공제 최대 30% 적용',
                '잔금일 반드시 5.9 이전',
              ],
              recommended: true,
              recLabel: '절세 극대화',
            },
            {
              title: '유예 종료 후(5.10~)',
              subtitle: '중과세율 적용',
              items: [
                '비조정지역 주택은 기본세율',
                '조정지역은 증여 전환 검토',
                '부담부증여도 중과 적용 주의',
                '1주택 비과세 요건 달성 우선',
              ],
            },
          ]} />
        </>
      ),
      pasBridge: {
        href: '/w/다주택-증여-양도-비교-부담부증여',
        question: '전략을 세웠으면 빠뜨리는 게 없도록 체크리스트로 확인해 봐야겠죠?',
        answer: <>매도 전 반드시 확인할 <strong>8가지 항목</strong>을 정리했어요</>,
        buttonText: '절세 체크리스트 보기 →',
      },
    },

    /* ===== SECTION 05: 체크리스트 =====
     * 시각: SpokeChecklist + TipBox
     * 전환: 없음 (마지막 → bridgeCTA)
     */
    {
      id: 'sec-checklist',
      number: 'SECTION 05',
      heading: '다주택 처분 순서 절세 체크리스트는 뭔가요?',
      subtitle: '매도 전에 반드시 확인해야 할 항목을 정리했어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            매도 순서와 시기를 정했다면, 실행 전에 체크해야 할 항목이 있어요. 세무사 상담, 잔금일 관리, 비과세 요건 확인, 대체주택 특례 등을 빠뜨리면 계획한 절세 효과를 못 받을 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            특히 <a href="/w/일시적-2주택-양도세-비과세-기간-처분" className="text-[#4A7AB5] underline">일시적 2주택 특례</a>(이사 목적 3년 이내 처분), 상속주택 특례(상속 후 5년 이내), 혼인합가 특례(혼인일부터 5년 이내) 등 <a href="/w/다주택자-양도세-중과-배제-대상-주택-신고" className="text-[#4A7AB5] underline">중과 예외 사유</a>에 해당하는지도 꼭 확인하세요. 해당하면 중과 유예와 관계없이 기본세율이 적용될 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            양도세 신고는 양도일이 속하는 달의 말일부터 2개월 이내예요. 5월 매도분은 7월 말까지 신고해야 해요. 기한을 넘기면 무신고가산세(20%) + 납부불성실가산세가 부과되니 주의하세요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            아래 체크리스트를 하나씩 확인하면서 빠뜨리는 항목이 없는지 점검해 보세요.
          </p>

          <SpokeChecklist items={[
            { text: '보유 주택별 양도차익 추정 완료', done: false, note: '매도 우선순위 결정' },
            { text: '각 주택의 조정대상지역 여부 확인', done: false, note: '중과 대상 판단' },
            { text: '장기보유특별공제 적용 가능 여부 확인', done: false, note: '보유 기간 3년+' },
            { text: '일시적 2주택/상속주택 등 중과 예외 해당 여부', done: false, note: '예외 시 유예 무관' },
            { text: '잔금일 2026.5.9 이전으로 계약서 작성', done: false, note: '핵심!' },
            { text: '매수자 대출 실행일 확인(잔금일 지연 방지)', done: false, note: '대출 승인 소요 시간' },
            { text: '최종 1주택 비과세 요건(2년 보유+거주) 확인', done: false, note: '장기 전략' },
            { text: '세무사 상담으로 예상 세액 계산 완료', done: false, note: '전문가 검증' },
          ]} />

          <TipBox title="세무사 상담이 필수인 이유">
            <ul className="list-disc pl-5 space-y-1">
              <li>주택 수 계산(분양권/입주권/오피스텔 포함)이 복잡해요</li>
              <li>중과 예외 사유 적용 여부는 전문가 판단이 필요해요</li>
              <li>장특공제 계산, 필요경비 인정 범위도 개인이 판단하기 어려워요</li>
              <li>매도 금액이 수억원이면 상담 비용(20~50만원)은 절세 효과에 비하면 매우 작아요</li>
            </ul>
          </TipBox>

          <SpokeLinks
            title="절세 전략 관련 글"
            items={[
              { num: '01', heading: '다주택 증여 양도 비교 부담부증여', desc: '증여와 양도 중 뭐가 유리한지 비교', href: '/w/다주택-증여-양도-비교-부담부증여' },
              { num: '02', heading: '중과 유예 종료 부동산 시장 전망', desc: '유예 종료 후 시장 변화와 대응 전략', href: '/w/중과-유예-종료-부동산-시장-전망' },
            ]}
          />
        </>
      ),
      bridgeCTA: {
        href: '/w/다주택양도세-중과유예-세율-절세-전략',
        badge: '전체 가이드',
        title: '다주택 양도세 절세 전략 전체가 궁금하다면?',
        desc: '유예 기간 활용법과 전체 전략 확인하기',
        icon: 'grid' as const,
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
      question: '다주택 매도 순서에서 1주택이 되면 바로 비과세를 받을 수 있나요?',
      answer: '아니에요. 1주택이 된 후에도 <strong>2년 이상 보유</strong>(조정대상지역 취득 시 2년 거주 추가)해야 비과세 요건이 충족돼요. 비과세 한도는 양도가액 12억원이고, 초과분에 대해서는 세금이 부과돼요.',
    },
    {
      question: '다주택 매도 순서에서 양도차익이 비슷한 주택이 여러 채면 어떤 걸 먼저 파나요?',
      answer: '양도차익이 비슷하면 <strong>보유 기간이 긴 주택</strong>을 먼저 파는 게 유리해요. 장기보유특별공제를 더 많이 받을 수 있기 때문이에요. 보유 기간도 비슷하면 조정대상지역 주택을 먼저 파서 중과 리스크를 줄이세요.',
    },
  ],

  relatedSpokes: [
    { badge: '계산', title: '다주택 양도세 중과 전후 세액 비교', desc: '실제 사례로 세금 차이 확인', href: '/w/다주택-양도세-중과-전후-세액-비교' },
    { badge: '시기', title: '양도세 잔금일 기준 계약일 판단', desc: '잔금일과 계약일 중 뭐가 기준인지 확인', href: '/w/양도세-잔금일-기준-계약일-판단' },
    { badge: '증여', title: '다주택 증여 양도 비교 부담부증여', desc: '증여와 양도 중 뭐가 유리한지 비교', href: '/w/다주택-증여-양도-비교-부담부증여' },
    { badge: '전망', title: '중과 유예 종료 부동산 시장 전망', desc: '유예 종료 후 시장 영향과 대응 전략', href: '/w/중과-유예-종료-부동산-시장-전망' },
  ],

  sources: [
    { name: '소득세법 제104조(세율)', url: 'https://law.go.kr/법령/소득세법/제104조', org: '국가법령정보센터' },
    { name: '소득세법 시행령 제167조의3(중과 유예)', url: 'https://law.go.kr/법령/소득세법시행령/제167조의3', org: '국가법령정보센터' },
    { name: '양도소득세 기본정보', url: 'https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2312&cntntsId=7711', org: '국세청' },
  ],
}

export default data
