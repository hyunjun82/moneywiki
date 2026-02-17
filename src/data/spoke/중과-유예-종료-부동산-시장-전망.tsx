import type { SpokeData } from './types'
import {
  SpokeTimeline,
  SpokeTable,
  SpokeRateBars,
  SpokeCompareCards,
  SpokeWarnBox,
  SpokeFlow,
  SpokeChecklist,
  SpokeStepCards,
  SpokeLinks,
} from '@/components/spoke/SpokeBlocks'
import JungkwaYuyeChecker from '@/components/checkers/JungkwaYuyeChecker'

const data: SpokeData = {
  slug: '중과-유예-종료-부동산-시장-전망',

  meta: {
    title: '중과 유예 종료 부동산 시장 전망 | 양도세 중과 재개 대응 전략',
    description: '2026년 5월 양도세 중과 유예가 끝나면 부동산 시장에 어떤 변화가 올까요? 매물 전망부터 지역별 가격 변화, 다주택자 대응 전략까지 정리해드려요.',
    keywords: ['중과유예 종료 부동산 전망', '양도세 중과 재개 영향', '중과유예 종료 시장 변화', '다주택 중과 재개 대응'],
    ogTitle: '중과 유예 종료 부동산 시장 전망 | 머니위키',
    ogDescription: '중과 유예 종료 후 부동산 시장 영향, 매물 증감, 가격 변화 전망과 대응 전략이에요.',
  },

  hub: {
    url: '/w/다주택양도세-중과유예-세율-절세-전략',
    name: '다주택양도세 중과유예 세율 절세 전략',
  },

  breadcrumb: ['세금', '양도소득세', '시장 전망'],

  summary3: [
    <>유예 종료 직전 <strong>단기 매물 출회</strong>, 종료 후 <strong>거래 절벽</strong>이 예상돼요</>,
    <>서울 핵심 지역은 매물 감소로 <strong>가격 하방 경직</strong>, 외곽/지방은 하락 압력이 있어요</>,
    <>유예 기간 내 매도, 증여 전환, <strong>중과 예외 확인</strong>이 3대 대응 전략이에요</>,
  ],

  sourceBar: {
    badge: '출처',
    name: '소득세법 시행령 제167조의3 + 국세청 양도소득세 안내',
    date: '2026.02',
  },

  prevNext: {
    prev: { title: '다주택 증여 양도 비교 부담부증여', href: '/w/다주택-증여-양도-비교-부담부증여' },
  },

  stickyBar: {
    topLabel: '시장 전망',
    value: '중과 유예 종료',
    buttonText: '유예 적용 체크 →',
    scrollTo: '#checker',
  },

  hero: {
    badge: '2026년 2월 기준',
    h1: (
      <>
        중과 유예 종료 <span className="text-[#1E3A5F]">부동산 시장 전망</span> | 양도세 중과 재개 대응 전략
      </>
    ),
    intro: (
      <p className="text-base text-neutral-500 leading-relaxed">
        다주택자 양도세 중과 유예가 2026년 5월 9일에 종료되면, 부동산 시장에 상당한 변화가 예상돼요.
        유예 종료 전 매물 쏟아짐, 종료 후 거래 절벽, 지역별 가격 양극화 등 다양한 시나리오가 논의되고 있어요.
        어떤 시나리오에도 대비할 수 있도록 전망과 대응 전략을 정리했어요.
        <a href="/w/다주택양도세-중과유예-세율-절세-전략" className="text-[#4A7AB5] underline">다주택 양도세 전체 전략</a>과 함께 보면 도움이 돼요.
      </p>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '다주택 양도세 중과유예 세율 절세 전략 전체 보기',
    },
    quickAnswer: {
      title: '중과 유예 종료 후 시장 핵심은?',
      body: '유예 종료 직전 매물이 쏟아지고, 종료 후에는 중과 부담으로 다주택자가 매도를 꺼리는 거래 절벽이 올 수 있어요. 서울 핵심지역은 매물 감소로 가격이 버티고, 외곽/지방은 하락 압력이 예상돼요.',
      hook: '내 상황에서 유예가 적용되는지 아래 체커로 확인해 보세요.',
    },
  },

  toc: [
    { id: 'checker', label: '중과 유예 적용 여부 체크' },
    { id: 'sec-change', label: '중과유예 종료 부동산 시장에 어떤 변화가 오나요?' },
    { id: 'sec-impact', label: '양도세 중과 재개가 지역별 가격에 미치는 영향은요?' },
    { id: 'sec-response', label: '중과유예 종료 시장 변화에 어떻게 대응하나요?' },
    { id: 'sec-outlook', label: '다주택 중과 재개 후 전문가 전망은 어떤가요?' },
    { id: 'sec-faq', label: '자주 묻는 질문' },
  ],

  sections: [
    /* ===== CHECK: 유예 적용 여부 체크 ===== */
    {
      id: 'checker',
      number: 'CHECK',
      heading: '내 상황에서 중과 유예가 적용되는지 먼저 확인해요',
      subtitle: '잔금일, 주택 수, 조정대상지역 여부로 확인할 수 있어요',
      content: <JungkwaYuyeChecker />,
    },

    /* ===== SECTION 02: 유예 종료 후 변화 =====
     * 시각: SpokeTimeline + SpokeTable
     * 전환: A 독자 대변형
     */
    {
      id: 'sec-change',
      number: 'SECTION 02',
      heading: '중과유예 종료 부동산 시장에 어떤 변화가 오나요?',
      subtitle: '2026년 5월 10일부터 조정대상지역 다주택자에게 중과세율이 적용돼요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            중과 유예가 종료되면 2026년 5월 10일부터 조정대상지역 내 다주택자에게 양도세 중과가 재개돼요. 2주택자는 기본세율에 20%p, 3주택 이상은 30%p가 추가되고 장기보유특별공제도 배제돼요. 유예 기간에 기본세율로 양도할 수 있었던 혜택이 전부 사라지는 거예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            이 변화는 단순히 세금만의 문제가 아니에요. 다주택자의 매도, 보유, 증여 의사결정에 직접 영향을 미치고, 이것이 부동산 시장의 매물량, 거래량, 가격에 연쇄적으로 작용해요. <a href="/w/다주택-양도세-중과-전후-세액-비교" className="text-[#4A7AB5] underline">중과 전후 세액 비교</a>를 보면 양도차익 5억 기준 세금이 1억에서 3.2억으로 뛰는 걸 확인할 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            과거 2018~2020년 중과 시행기에도 비슷한 패턴이 나타났어요. 중과 발표 직전 매물 출회, 시행 후 거래 절벽, 이후 서울 핵심지 가격 상승이라는 흐름이 반복됐죠. 이번에도 유사한 패턴이 예상되지만, 금리 환경과 가계부채 규제 등 변수가 달라서 단순 비교는 어려워요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            아래 타임라인으로 유예 종료 전후의 시장 변화 흐름을 한눈에 확인해 보세요.
          </p>

          <SpokeTimeline events={[
            { month: '2026.2~3', title: '매물 증가 시작', desc: '유예 종료를 앞두고 다주택자 매물 출회', status: 'current' as const, tag: '매물' },
            { month: '2026.4', title: '거래량 급증', desc: '잔금일 5.9 맞추려는 급매 증가, 매수 우위 시장', status: 'normal' as const, tag: '거래' },
            { month: '2026.5.9', title: '유예 종료', desc: '마지막 기본세율 양도 기한, 잔금 마감', status: 'normal' as const, tag: '종료' },
            { month: '2026.5.10~', title: '거래 절벽 예상', desc: '중과 부담으로 매도 의사 감소, 잠김 효과', status: 'normal' as const, tag: '절벽' },
            { month: '2026 하반기', title: '시장 재조정', desc: '매도·보유 양극화, 증여 수요 증가 가능', status: 'normal' as const, tag: '조정' },
          ]} />

          <SpokeTable id="change-detail" title="유예 종료 전후 주요 변화 비교" subtitle="2026년 5월 10일 기준" headers={['항목', '유예 중', '유예 종료 후']} rows={[
            ['세율', '기본세율 6~45%', '기본 + 20~30%p 중과'],
            ['장기보유특별공제', '최대 30% 적용', '배제(0%)'],
            ['양도차익 5억 3주택 세금', '약 1.05억원', '약 3.22억원'],
            ['다주택자 매도 의향', '적극 매도', '매도 꺼림(잠김)'],
            ['시장 매물량', '증가', '급감 가능'],
          ]} />

          <SpokeLinks
            title="유예 종료 기본 개념"
            items={[
              { num: '01', heading: '중과 유예 연혁 종료일 확정', desc: '2022년부터 매년 연장된 유예 제도 전체 흐름', href: '/w/중과-유예-연혁-종료일-확정' },
              { num: '02', heading: '양도세 중과 뜻 기본세율 중과세율 비교', desc: '기본세율과 중과세율 차이를 한눈에', href: '/w/양도세-중과-뜻-기본세율-중과세율-비교' },
            ]}
          />
        </>
      ),
      pasBridge: {
        href: '/w/조정대상지역-목록-서울-경기',
        question: '세금이 이렇게 달라지면 시장 참여자들의 행동도 바뀔 수밖에 없잖아요. 지역별로 어떤 영향이 있을까요?',
        answer: <>서울 핵심지와 외곽/지방은 <strong>정반대 흐름</strong>이 예상돼요</>,
        buttonText: '지역별 영향 확인 →',
      },
    },

    /* ===== SECTION 03: 지역별 영향 =====
     * 시각: SpokeRateBars + SpokeCompareCards
     * 전환: B 호기심형
     */
    {
      id: 'sec-impact',
      number: 'SECTION 03',
      heading: '양도세 중과 재개가 지역별 가격에 미치는 영향은요?',
      subtitle: '서울 핵심지는 가격 버팀, 외곽/지방은 하락 압력이 예상돼요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            유예 종료 직전에는 다주택자들이 중과를 피하려고 매물을 쏟아낼 가능성이 높아요. 이 시기에 매물이 늘면 매수자 입장에서는 선택지가 넓어지고, 급매 물건이 나올 수도 있어요. 단기적으로 매수 우위 시장이 될 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            반면 유예 종료 후에는 '잠김 효과(lock-in effect)'가 나타날 수 있어요. 중과세율이 너무 높아서 다주택자들이 매도를 포기하고 보유를 선택하는 거예요. 매물이 줄면 거래량이 급감하고, 수요가 있는 인기 지역은 오히려 가격이 오를 수도 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            <a href="/w/조정대상지역-목록-서울-경기" className="text-[#4A7AB5] underline">조정대상지역</a>인 서울 25개구와 경기 12곳은 중과가 적용되지만, 비조정대상지역은 다주택자라도 기본세율이에요. 그래서 비조정지역 주택은 유예 종료 영향이 크지 않고, 조정지역 주택에 영향이 집중돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            서울 강남·서초·용산 같은 핵심지역은 수요가 탄탄해서 매물 감소 시 가격이 오히려 버티거나 오를 수 있다는 분석이 많아요. 반면 서울 외곽이나 경기 일부, 지방은 수요가 약해서 유예 종료 전 매물 폭탄으로 가격 하락 압력이 생길 수 있어요.
          </p>

          <SpokeRateBars bars={[
            { label: '유예 전 단기 매물 출회', rate: '가능성 높음', width: '85%' },
            { label: '유예 후 거래 절벽', rate: '가능성 높음', width: '80%' },
            { label: '서울 핵심지 가격 상승', rate: '가능성 중간', width: '55%' },
            { label: '서울 외곽 가격 하락', rate: '가능성 중간', width: '50%' },
            { label: '증여 수요 증가', rate: '가능성 높음', width: '75%' },
          ]} />

          <SpokeCompareCards cards={[
            { title: '서울 핵심지 (강남·서초·용산)', subtitle: '수요 탄탄', items: ['잠김 효과로 매물 감소', '희소성 프리미엄 가능', '가격 하방 경직 예상', '2018~2020년에도 가격 상승'] },
            { title: '외곽/지방', subtitle: '수요 약함', items: ['유예 전 매물 폭탄 가능', '수요 부족으로 가격 하락 압력', '비조정지역은 영향 제한적', '지역별 차이 클 것으로 예상'] },
          ]} />
        </>
      ),
      pasBridge: {
        href: '/w/다주택-매도-순서-전략-절세',
        question: '시장 전망을 알았으니 — 이런 변화에 어떻게 대비해야 할까요?',
        answer: <>유예 기간 내 매도, 증여 전환, 중과 예외 확인 <strong>3대 대응 전략</strong>이 있어요</>,
        buttonText: '대응 전략 확인 →',
      },
    },

    /* ===== SECTION 04: 대응 전략 =====
     * 시각: SpokeStepCards + SpokeWarnBox
     * 전환: C 간결 연결형
     */
    {
      id: 'sec-response',
      number: 'SECTION 04',
      heading: '중과유예 종료 시장 변화에 어떻게 대응하나요?',
      subtitle: '유예 기간 내 매도, 증여 전환, 중과 예외 확인 세 가지예요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            대응 전략은 크게 세 가지로 나뉘어요. 첫째, <strong>유예 기간 내 매도</strong>예요. 양도차익이 큰 주택을 5월 9일까지 잔금을 받으면 기본세율이 적용돼요. 절세 효과가 가장 크고 확실한 방법이에요. <a href="/w/다주택-매도-순서-전략-절세" className="text-[#4A7AB5] underline">매도 순서 전략</a>을 참고해서 어떤 집부터 팔지 우선순위를 정하세요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            둘째, <strong>증여 전환</strong>이에요. 유예 종료 후 중과세율로 매도하는 것보다 증여나 부담부증여가 총 세금이 적을 수 있어요. 특히 전세보증금이 큰 주택은 <a href="/w/다주택-증여-양도-비교-부담부증여" className="text-[#4A7AB5] underline">부담부증여</a>를 검토해 볼 만해요. 다만 증여 시 취득세(다주택 12% 중과)도 합산해서 비교해야 정확해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            셋째, <strong>중과 예외 사유 확인</strong>이에요. 상속주택(5년 이내), 일시적 2주택(3년 이내), 장기임대등록 주택 등은 중과 유예와 관계없이 기본세율이 적용돼요. <a href="/w/다주택자-양도세-중과-배제-대상-주택-신고" className="text-[#4A7AB5] underline">중과 배제 대상</a>에 해당하면 유예 종료가 큰 영향을 미치지 않아요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            세 가지 전략을 동시에 검토하고, 본인 상황에 맞는 조합을 세무사와 함께 설계하는 게 가장 안전해요.
          </p>

          <SpokeStepCards steps={[
            { title: '1단계: 유예 기간 내 매도', desc: '양도차익 큰 주택을 5.9까지 잔금 완료. 기본세율 + 장특공제 최대 활용', tip: '가장 큰 절세 효과' },
            { title: '2단계: 증여 전환 검토', desc: '중과세율보다 증여세가 유리한 구간 확인. 부담부증여도 검토', tip: '취득세 합산 비교 필수' },
            { title: '3단계: 중과 예외 확인', desc: '상속·일시적 2주택·장기임대 등 예외 사유 확인', tip: '해당 시 유예 무관' },
          ]} />

          <SpokeWarnBox title="주의사항">
            <p className="mb-2 leading-relaxed">
              <strong>연장을 기대하고 기다리지 마세요.</strong> 2026년 2월 현재 정부는 추가 연장 불가 입장이에요. 연장이 안 되면 잔금일이 5월 10일을 넘기는 순간 중과가 적용돼요. <strong>급하게 저가 매도도 주의하세요.</strong> 중과가 무서워서 시세보다 크게 낮춰 파는 건 오히려 손해일 수 있어요. 세금을 정확히 계산한 후 판단하세요.
            </p>
          </SpokeWarnBox>

          <SpokeLinks
            title="대응 전략 관련 글"
            items={[
              { num: '01', heading: '다주택 매도 순서 전략 절세', desc: '어떤 집부터 팔아야 절세가 되는지 정리', href: '/w/다주택-매도-순서-전략-절세' },
              { num: '02', heading: '다주택 증여 양도 비교 부담부증여', desc: '증여와 양도 중 뭐가 유리한지 비교', href: '/w/다주택-증여-양도-비교-부담부증여' },
            ]}
          />
        </>
      ),
      pasBridge: {
        href: '/w/중과-유예-연혁-종료일-확정',
        question: '대응 전략을 세웠으면 전문가들의 전망도 참고해 볼게요',
        answer: <>단기 매물 출회 → 거래 절벽 → 서울 강세가 <strong>다수 의견</strong>이에요</>,
        buttonText: '전문가 전망 보기 →',
      },
    },

    /* ===== SECTION 05: 전문가 전망 =====
     * 시각: SpokeFlow + SpokeChecklist
     * 전환: 없음 (마지막 → bridgeCTA)
     */
    {
      id: 'sec-outlook',
      number: 'SECTION 05',
      heading: '다주택 중과 재개 후 전문가 전망은 어떤가요?',
      subtitle: '단기 매물 출회 후 거래 절벽, 서울 강세 지속이 다수 의견이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            부동산 전문가들의 대체적인 전망은 '유예 종료 직전 단기 매물 출회 후, 중과 재개 이후 거래 절벽이 올 것'이라는 거예요. 2018~2020년 중과 시행기에도 비슷한 패턴이 나타났기 때문에, 이번에도 유사한 흐름이 예상돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            서울 핵심 지역(강남, 서초, 용산 등)은 수요가 탄탄해서 중과가 재개돼도 가격이 크게 하락하기 어려울 거라는 의견이 많아요. 오히려 매물 감소로 인한 희소성 프리미엄이 붙을 수 있다는 분석도 있어요. 반면 서울 외곽이나 경기 일부, 지방은 수요가 약한 지역에서 가격 하락 압력이 생길 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            다만 이번에는 2018~2020년과 다른 변수도 있어요. 기준금리가 높은 상태에서 중과가 재개되면 보유 비용(이자)과 세금 부담이 동시에 커져서, 보유를 포기하고 매도로 전환하는 다주택자가 과거보다 많을 수 있어요. 가계부채 규제(DSR)로 매수자의 구매력도 제한되어 있어서, 매물이 나와도 거래가 안 될 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            어떤 전망이든 확실한 건, 유예 기간이 끝나면 다주택자의 세금 부담이 크게 늘어난다는 거예요. 지금이 대응 전략을 실행할 수 있는 마지막 기회예요.
          </p>

          <SpokeFlow steps={[
            { icon: '1', label: '매물 출회', sub: '4~5월 집중' },
            { icon: '2', label: '거래 절벽', sub: '5월 이후' },
            { icon: '3', label: '잠김 효과', sub: '보유 선택' },
            { icon: '4', label: '양극화', sub: '서울 vs 지방' },
          ]} />

          <SpokeChecklist items={[
            { text: '양도차익 큰 주택의 유예 기간 내 매도 여부 결정', done: false, note: '최우선 과제' },
            { text: '잔금일이 5월 9일 이전이 되도록 매매 일정 확보', done: false, note: '핵심 일정' },
            { text: '유예 종료 후 남을 주택의 증여 전환 검토', done: false, note: '세무사 상담' },
            { text: '중과 예외 사유(상속·일시적 2주택 등) 해당 여부 확인', done: false, note: '예외 확인' },
            { text: '최종 1주택 비과세 달성을 위한 장기 계획 수립', done: false, note: '2년 보유+거주' },
            { text: '세무사 상담으로 정확한 세액 계산 완료', done: false, note: '전문가 필수' },
          ]} />

          <SpokeLinks
            title="전망 관련 글"
            items={[
              { num: '01', heading: '양도세 잔금일 기준 계약일 판단', desc: '잔금일 하루 차이로 세금이 갈리는 이유', href: '/w/양도세-잔금일-기준-계약일-판단' },
              { num: '02', heading: '조정대상지역 목록 서울 경기', desc: '서울·경기 조정대상지역과 해제 지역 확인', href: '/w/조정대상지역-목록-서울-경기' },
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
      question: '중과유예 종료 부동산 시장에서 전세 시장에도 영향이 있나요?',
      answer: '중과 부담으로 다주택자가 매도 대신 보유를 선택하면, 전세 매물이 유지되거나 늘어날 수 있어요. 하지만 증여나 매도로 주택 수를 줄이면 전세 매물이 감소할 수도 있어요. 지역과 상황에 따라 다르게 나타날 수 있어요.',
    },
    {
      question: '양도세 중과 재개 후에도 기본세율이 적용되는 경우가 있나요?',
      answer: '네, 있어요. <strong>비조정대상지역</strong> 주택은 다주택자라도 기본세율이 적용돼요. 또한 상속주택(5년 이내), 일시적 2주택, 장기임대등록 주택 등 <strong>중과 예외 사유</strong>에 해당하면 조정지역이라도 기본세율로 양도할 수 있어요.',
    },
  ],

  relatedSpokes: [
    { badge: '전략', title: '다주택 매도 순서 절세 전략', desc: '어떤 집부터 팔아야 절세가 되는지 정리', href: '/w/다주택-매도-순서-전략-절세' },
    { badge: '증여', title: '다주택 증여 양도 비교 부담부증여', desc: '증여와 양도 중 뭐가 유리한지 비교', href: '/w/다주택-증여-양도-비교-부담부증여' },
    { badge: '연혁', title: '양도세 중과 유예 연혁 종료일 확정', desc: '유예 종료일과 연장 가능성 확인', href: '/w/중과-유예-연혁-종료일-확정' },
    { badge: '지역', title: '2026 조정대상지역 서울 경기 지정 목록', desc: '서울·경기 조정대상지역과 해제 지역', href: '/w/조정대상지역-목록-서울-경기' },
  ],

  sources: [
    { name: '소득세법 제104조(세율)', url: 'https://law.go.kr/법령/소득세법/제104조', org: '국가법령정보센터' },
    { name: '소득세법 시행령 제167조의3(중과 유예)', url: 'https://law.go.kr/법령/소득세법시행령/제167조의3', org: '국가법령정보센터' },
    { name: '양도소득세 기본정보', url: 'https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2312&cntntsId=7711', org: '국세청' },
  ],
}

export default data
