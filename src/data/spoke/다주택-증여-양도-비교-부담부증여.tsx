import type { SpokeData } from './types'
import {
  SpokeCompareCards,
  SpokeRateBars,
  FormulaBox,
  SpokeTable,
  SpokeFlow,
  SpokeChecklist,
  SpokeTimeline,
  TipBox,
  SpokeLinks,
} from '@/components/spoke/SpokeBlocks'
import ZungyeoYangdoChecker from '@/components/checkers/ZungyeoYangdoChecker'

const data: SpokeData = {
  slug: '다주택-증여-양도-비교-부담부증여',

  meta: {
    title: '다주택 증여 양도 비교 부담부증여 | 증여세 양도세 절세 전략',
    description: '다주택자가 자녀에게 집을 넘길 때 증여와 양도 중 뭐가 유리한지 아시나요? 부담부증여 활용법부터 증여세 양도세 비교까지 절세 전략을 정리해드려요.',
    keywords: ['다주택 증여 양도 비교', '부담부증여 절세 방법', '증여세 양도세 차이 비교', '다주택 증여 전략 절세'],
    ogTitle: '다주택 증여 양도 비교 부담부증여 | 머니위키',
    ogDescription: '다주택자 증여 vs 양도 비교, 부담부증여 절세 전략을 정리했어요.',
  },

  hub: {
    url: '/w/다주택양도세-중과유예-세율-절세-전략',
    name: '다주택양도세 중과유예 세율 절세 전략',
  },

  breadcrumb: ['세금', '양도소득세', '증여 양도 비교'],

  summary3: [
    <>양도차익이 크면 유예 기간 <strong>양도</strong>가, 시가 대비 차익이 작으면 <strong>증여</strong>가 유리해요</>,
    <>부담부증여는 대출 부분을 양도로, 나머지를 증여로 처리해서 <strong>증여세를 줄이는 방법</strong>이에요</>,
    <>부모 양도세 + 자녀 증여세 <strong>합산 비교</strong>를 해야 진짜 절세를 찾을 수 있어요</>,
  ],

  sourceBar: {
    badge: '출처',
    name: '상속세및증여세법 제47조 + 소득세법 제104조 세율',
    date: '2026.02',
  },

  prevNext: {
    prev: { title: '다주택 매도 순서 절세 전략', href: '/w/다주택-매도-순서-전략-절세' },
    next: { title: '중과 유예 종료 부동산 시장 전망', href: '/w/중과-유예-종료-부동산-시장-전망' },
  },

  stickyBar: {
    topLabel: '증여 양도 비교',
    value: '절세 전략',
    buttonText: '증여 양도 비교 →',
    scrollTo: '#checker',
  },

  hero: {
    badge: '2026년 기준',
    h1: (
      <>
        다주택 증여 양도 비교 <span className="text-[#1E3A5F]">부담부증여</span> | 증여세 양도세 절세 전략
      </>
    ),
    intro: (
      <p className="text-base text-neutral-500 leading-relaxed">
        다주택자가 자녀에게 부동산을 넘기려면 양도(매매)와 증여 중 하나를 골라야 해요.
        같은 주택이라도 넘기는 방식에 따라 세금이 수천만원에서 수억원까지 달라지죠.
        여기에 부담부증여라는 방법도 있어서, 대출이 있는 주택이라면 세금을 나눠서 줄일 수도 있어요.
        <a href="/w/다주택양도세-중과유예-세율-절세-전략" className="text-[#4A7AB5] underline">다주택 양도세 전체 전략</a>과 함께 증여와 양도의 핵심 차이를 정리해 볼게요.
      </p>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '다주택 양도세 중과유예 세율 절세 전략 전체 보기',
    },
    quickAnswer: {
      title: '증여 양도 비교 핵심은?',
      body: '양도차익이 크고 유예 기간 내라면 양도가, 시가 대비 양도차익이 작고 자녀가 장기 보유할 계획이면 증여가 유리해요. 대출이 있으면 부담부증여로 세금을 나눌 수 있어요.',
      hook: '내 상황에 맞는 결과를 아래 체커에서 바로 확인해 보세요.',
    },
  },

  toc: [
    { id: 'checker', label: '증여 양도 비교 체커' },
    { id: 'sec-compare', label: '다주택 증여 양도 비교에서 뭐가 유리한가요?' },
    { id: 'sec-burden', label: '부담부증여 절세 방법은 어떻게 되나요?' },
    { id: 'sec-tax-diff', label: '증여세 양도세 차이는 얼마나 나나요?' },
    { id: 'sec-strategy', label: '다주택 증여 전략은 어떻게 세우나요?' },
    { id: 'sec-faq', label: '자주 묻는 질문' },
  ],

  sections: [
    /* ===== CHECK: 증여 양도 비교 체커 ===== */
    {
      id: 'checker',
      number: 'CHECK',
      heading: '증여와 양도, 내 상황에선 뭐가 유리한지 먼저 확인해요',
      subtitle: '시가와 취득가를 선택하면 증여세와 양도세를 바로 비교해 드려요',
      content: <ZungyeoYangdoChecker />,
    },

    /* ===== SECTION 02: 증여 vs 양도 비교 =====
     * 시각: SpokeCompareCards + SpokeRateBars
     * 전환: A 독자 대변형
     */
    {
      id: 'sec-compare',
      number: 'SECTION 02',
      heading: '다주택 증여 양도 비교에서 뭐가 유리한가요?',
      subtitle: '세금 부담 주체, 과세 기준, 향후 양도 계획에 따라 달라요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            다주택자가 자녀에게 부동산을 넘기는 방법은 크게 두 가지예요. 양도(매매)하거나 증여하는 거죠. 양도는 부모가 <a href="https://law.go.kr/법령/소득세법/제104조" target="_blank" rel="noopener noreferrer" className="text-[#4A7AB5] underline">소득세법 제104조</a>에 따라 양도소득세를 내고, 증여는 자녀가 <a href="https://law.go.kr/법령/상속세및증여세법/제47조" target="_blank" rel="noopener noreferrer" className="text-[#4A7AB5] underline">상속세및증여세법</a>에 따라 증여세를 내요. 세금을 내는 주체부터 다른 거예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            양도가 유리한 상황은 중과유예 기간(~2026.5.9)을 활용할 수 있을 때예요. 기본세율(6~45%)로 양도할 수 있고, <a href="/w/다주택-양도세-중과-전후-세액-비교" className="text-[#4A7AB5] underline">장기보유특별공제</a>(최대 30%)도 받을 수 있어서 세금을 크게 줄일 수 있어요. 반대로 유예 종료 후에는 중과세율(2주택 +20%p, 3주택 +30%p)이 적용되고 장특공제도 배제되니까 세금이 두 배 가까이 뛸 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            증여가 유리한 상황은 자녀가 증여재산공제(자녀 5천만원, 배우자 6억)를 충분히 활용할 수 있고, 장기간 보유 후 1주택 비과세를 노릴 수 있을 때예요. 다만 증여를 받으면 부모의 취득가액이 그대로 승계되기 때문에, 자녀가 나중에 팔 때 양도차익이 커질 수 있다는 점을 미리 알고 있어야 해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            결국 당장의 세금만 비교하면 안 되고, 자녀가 그 주택을 얼마나 보유할 건지, 나중에 팔 때의 세금까지 합산해서 봐야 해요.
          </p>

          <SpokeCompareCards cards={[
            { title: '양도 (매매)', subtitle: '부모가 세금 부담', items: ['양도차익 기준 과세', '유예 중 기본세율 6~45%', '장특공제 최대 30%', '자녀는 시가로 취득(차익↓)'] },
            { title: '증여', subtitle: '자녀가 세금 부담', items: ['증여재산 전체 기준 과세', '증여세율 10~50%', '증여재산공제 자녀 5천만원', '부모 취득가액 승계(차익↑)'] },
          ]} />

          <SpokeRateBars bars={[
            { label: '1억원 이하', rate: '증여세 10%', width: '20%' },
            { label: '5억원 이하', rate: '증여세 20%', width: '40%' },
            { label: '10억원 이하', rate: '증여세 30%', width: '60%' },
            { label: '30억원 이하', rate: '증여세 40%', width: '80%' },
            { label: '30억원 초과', rate: '증여세 50%', width: '100%' },
          ]} />

          <SpokeLinks
            title="증여 양도 기본 개념"
            items={[
              { num: '01', heading: '양도세 중과 뜻 기본세율 비교', desc: '기본세율과 중과세율 차이를 한눈에 비교', href: '/w/양도세-중과-뜻-기본세율-중과세율-비교' },
              { num: '02', heading: '다주택 양도세 중과 전후 세액 비교', desc: '유예 vs 중과 실제 세금 차이 확인', href: '/w/다주택-양도세-중과-전후-세액-비교' },
            ]}
          />
        </>
      ),
      pasBridge: {
        href: '/w/다주택-매도-순서-전략-절세',
        question: '그렇다면 대출이 있는 주택은 어떻게 처리하는 게 유리할까요?',
        answer: <>대출 부분은 양도로, 나머지는 증여로 처리하는 <strong>부담부증여</strong>라는 방법이 있어요</>,
        buttonText: '부담부증여 확인 →',
      },
    },

    /* ===== SECTION 03: 부담부증여 =====
     * 시각: FormulaBox + SpokeTable
     * 전환: B 호기심형
     */
    {
      id: 'sec-burden',
      number: 'SECTION 03',
      heading: '부담부증여 절세 방법은 어떻게 되나요?',
      subtitle: '자녀가 대출을 인수하고 나머지만 증여받는 방식이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            부담부증여란 부동산을 증여하면서 거기 담긴 채무(대출, 전세보증금)를 자녀가 함께 인수하는 거예요. <a href="https://law.go.kr/법령/상속세및증여세법/제47조" target="_blank" rel="noopener noreferrer" className="text-[#4A7AB5] underline">상속세및증여세법 제47조</a>에 따르면, 채무 인수 부분은 '양도'로 보고 나머지만 증여로 처리해요. 시가 10억원 주택에 대출 5억원이 있다면, 대출 5억은 양도, 나머지 5억은 증여가 되는 구조예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            부모는 대출 인수 부분에 대해 양도세를 내야 해요. 취득가액이 3억이고 대출이 5억이면, 취득가액 중 대출 비율만큼(3억 x 5/10 = 1.5억)을 빼서 양도차익 3.5억에 양도세가 붙어요. 자녀는 나머지 5억(시가 10억 - 대출 5억)에서 증여재산공제 5천만원을 빼고 증여세를 내요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            순수증여보다 증여세 과세표준이 줄어들어서 세금을 아낄 수 있어요. 다만 부모가 다주택자라면 대출 인수 부분에도 중과세율이 적용될 수 있어요. 유예 종료 후에는 중과세율(+20~30%p)과 장특공제 배제로 세금이 크게 늘어날 수 있으니 시기를 잘 따져야 해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            또 자녀가 대출을 실제로 갚아야 하니까 상환 능력도 충분히 고려해야 해요. 상환 능력이 없는데 대출만 인수하면 국세청이 '편법 증여'로 볼 수 있어요.
          </p>

          <FormulaBox lines={[
            { text: '양도 부분(부모 세금) = 채무인수금액 (대출+전세보증금)', numbered: true },
            { text: '양도차익 = 채무인수금액 - (취득가액 x 채무/시가 비율)', numbered: true },
            { text: '증여 부분(자녀 세금) = 시가 - 채무인수금액', numbered: true },
            { text: '증여세 과세표준 = 증여재산가액 - 증여재산공제(자녀 5천만원)', numbered: true },
          ]} />

          <SpokeTable id="burden-example" title="부담부증여 vs 순수증여 세금 비교 (예시)" subtitle="시가 10억, 취득가액 3억, 대출 5억 가정" headers={['구분', '부담부증여', '순수증여']} rows={[
            ['양도 부분(부모)', '5억(대출)', '없음'],
            ['양도차익', '3.5억(5억 - 1.5억)', '없음'],
            ['증여 부분(자녀)', '5억(10억 - 5억)', '10억'],
            ['증여세 과세표준', '4.5억(5억 - 0.5억 공제)', '9.5억(10억 - 0.5억 공제)'],
            ['증여세(개산)', '약 8,000만원', '약 2.8억원'],
          ]} />
        </>
      ),
      pasBridge: {
        href: '/w/양도세-중과-뜻-기본세율-중과세율-비교',
        question: '부담부증여가 항상 유리한 건 아니에요 — 증여세와 양도세의 세율 구조가 어떻게 다른지 비교해 볼게요',
        answer: <>증여세는 증여재산 전체, 양도세는 양도차익만 과세해서 <strong>세율 적용 방식이 완전히 달라요</strong></>,
        buttonText: '세율 비교 확인 →',
      },
    },

    /* ===== SECTION 04: 증여세 양도세 차이 =====
     * 시각: SpokeFlow + SpokeChecklist
     * 전환: C 간결 연결형
     */
    {
      id: 'sec-tax-diff',
      number: 'SECTION 04',
      heading: '증여세 양도세 차이는 얼마나 나나요?',
      subtitle: '과세 대상, 세율 구조, 공제 항목이 완전히 달라요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            증여세는 증여받은 재산 가치 전체를 기준으로 과세해요. 증여재산공제(자녀 5천만원, 배우자 6억)를 빼고 나면 증여세율 10~50%가 적용돼요. 구간은 5단계(1억, 5억, 10억, 30억 기준)로 양도세보다 단순하지만, 과세 대상이 재산 전체라서 금액이 커질 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            양도세는 양도차익(양도가액 - 취득가액 - 필요경비)만 과세해요. 기본세율 6~45%이고, <a href="/w/양도세-중과-뜻-기본세율-중과세율-비교" className="text-[#4A7AB5] underline">다주택자 중과</a>가 되면 2주택 +20%p, 3주택 +30%p가 추가돼요. 장기보유특별공제(최대 30%)를 받을 수 있는데, 중과 시에는 이 공제가 전부 배제돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            가장 큰 차이는 자녀의 미래 세금이에요. 증여받은 자녀는 부모의 취득가액을 그대로 승계받으니까, 나중에 팔 때 양도차익이 커져요. 반면 양도(매매)로 넘기면 자녀가 시가로 취득한 것이 되어서 나중에 양도차익이 작아져요. 당장의 세금과 미래의 세금을 합산해서 비교해야 진짜 유불리를 알 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            아래 흐름도를 보면 증여와 양도가 어떤 경로로 세금이 붙는지 한눈에 파악할 수 있어요.
          </p>

          <SpokeFlow steps={[
            { icon: '1', label: '증여', sub: '자녀 증여세 부담' },
            { icon: '2', label: '양도', sub: '부모 양도세 부담' },
            { icon: '3', label: '자녀 재양도 시', sub: '증여: 차익↑ / 양도: 차익↓' },
            { icon: '4', label: '전체 세금', sub: '합산 비교 필수' },
          ]} />

          <SpokeChecklist items={[
            { text: '중과유예 기간(~2026.5.9) 내 양도 가능한가?', done: false, note: '가능하면 양도 유리' },
            { text: '자녀가 증여재산공제를 충분히 활용하는가?', done: false, note: '자녀 5천만원, 배우자 6억' },
            { text: '자녀가 장기 보유 후 1주택 비과세를 받을 수 있는가?', done: false, note: '2년 보유+거주' },
            { text: '부담부증여 시 자녀가 대출을 갚을 수 있는가?', done: false, note: '상환 능력 필수' },
            { text: '부모 양도세 + 자녀 재양도세까지 합산 비교했는가?', done: false, note: '전체 세금 비교' },
          ]} />

          <SpokeLinks
            title="세율 비교 관련 글"
            items={[
              { num: '01', heading: '양도세 잔금일 기준 계약일 판단', desc: '잔금일 하루 차이로 세금이 갈리는 이유', href: '/w/양도세-잔금일-기준-계약일-판단' },
              { num: '02', heading: '3주택자 양도세 중과세율 계산', desc: '3주택자 세금 계산 방법과 비과세 조건', href: '/w/3주택자-양도세-중과세율-계산-비과세' },
            ]}
          />
        </>
      ),
      pasBridge: {
        href: '/w/중과-유예-연혁-종료일-확정',
        question: '세율 차이를 알았으니, 내 상황에서 어떤 전략을 세우면 좋을지 정리해 볼게요',
        answer: <>중과유예 종료 시점과 자녀 미래 계획을 <strong>함께 고려한 전략</strong>이 필요해요</>,
        buttonText: '전략 세우기 →',
      },
    },

    /* ===== SECTION 05: 증여 전략 =====
     * 시각: TipBox + SpokeTable
     * 전환: 없음 (마지막 → bridgeCTA)
     */
    {
      id: 'sec-strategy',
      number: 'SECTION 05',
      heading: '다주택 증여 전략은 어떻게 세우나요?',
      subtitle: '중과유예 종료 시점과 자녀 미래 계획을 함께 고려해야 해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            증여 전략을 세울 때는 크게 세 가지를 고려해요. 첫째, <a href="/w/중과-유예-연혁-종료일-확정" className="text-[#4A7AB5] underline">중과유예 종료 시점</a>(2026.5.10)이에요. 유예 기간 내에 양도하면 기본세율로 양도할 수 있고 장특공제도 받을 수 있어서 세금이 훨씬 적어요. 유예 종료 후에는 중과세율이 적용되니까 그때부터는 증여 쪽이 더 유리해질 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            둘째, 자녀의 미래 계획이에요. 자녀가 그 주택에 오래 거주하고 나중에 1주택 비과세(보유 2년 + 거주 2년)를 받을 수 있다면 증여가 유리해요. 반대로 자녀가 곧 팔 계획이라면 증여받은 취득가액이 낮아서 양도차익이 크게 나오기 때문에 부모가 양도하고 자녀가 시가로 사는 게 나을 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            셋째, 부담부증여 활용 가능성이에요. 대출이 있다면 자녀가 대출을 인수하고 나머지만 증여받으면 증여세를 줄일 수 있어요. 다만 부모가 대출 인수 부분에 양도세를 내야 하고, 자녀가 대출을 실제로 갚아야 해요. 국세청은 자녀의 상환 능력을 꼼꼼히 봐요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            어떤 방법이든 세무사 상담은 필수예요. 부모와 자녀의 세금을 합산해서 시뮬레이션을 돌려봐야 정확한 답이 나와요.
          </p>

          <TipBox title="세무사 상담이 필수인 이유">
            <ul className="list-disc pl-5 space-y-1">
              <li>증여 시 취득세(12% 중과 가능)까지 합산해야 정확한 비교가 돼요</li>
              <li>부담부증여의 편법 증여 판정 리스크를 전문가가 검토해야 해요</li>
              <li>자녀 재양도 시점까지 포함한 장기 시뮬레이션이 필요해요</li>
              <li>매도 금액이 수억원이면 상담 비용(20~50만원)은 절세 효과에 비해 매우 작아요</li>
            </ul>
          </TipBox>

          <SpokeTimeline events={[
            { month: '~2026.5.9', title: '유예 기간 내 양도 검토', desc: '양도차익 큰 주택은 기본세율 + 장특공제 활용', status: 'current' as const, tag: '양도' },
            { month: '2026.5.10~', title: '중과 재개 후 증여 검토', desc: '중과세율보다 증여세가 유리한 구간 확인', status: 'normal' as const, tag: '증여' },
            { month: '증여 후 2년+', title: '자녀 1주택 비과세 달성', desc: '2년 보유+거주 후 12억까지 비과세 가능', status: 'normal' as const, tag: '비과세' },
            { month: '증여 후 10년', title: '재증여 과세 합산 초기화', desc: '10년 단위 증여재산공제 재적용 가능', status: 'normal' as const, tag: '재증여' },
          ]} />

          <SpokeLinks
            title="절세 전략 관련 글"
            items={[
              { num: '01', heading: '다주택 매도 순서 전략 절세', desc: '어떤 집부터 팔아야 절세가 되는지', href: '/w/다주택-매도-순서-전략-절세' },
              { num: '02', heading: '중과 유예 종료 부동산 시장 전망', desc: '유예 종료 후 시장 변화와 대응', href: '/w/중과-유예-종료-부동산-시장-전망' },
            ]}
          />
        </>
      ),
      bridgeCTA: {
        href: '/w/다주택양도세-중과유예-세율-절세-전략',
        badge: '전체 가이드',
        title: '다주택 양도세 절세 전략 전체가 궁금하다면?',
        desc: '유예 기간 활용법과 매도 순서 전략까지 확인하기',
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
      question: '다주택 증여 양도 비교에서 부담부증여 시 대출 인수 부분도 중과세율이 적용되나요?',
      answer: '부모가 다주택자이고 조정대상지역 내 주택이라면 대출 인수 부분에도 중과세율이 적용돼요. 중과유예 기간(~2026.5.9)에는 기본세율만 적용되지만, 유예 종료 후에는 <strong>2주택 +20%p, 3주택 +30%p</strong>가 붙어요. 장특공제도 배제되니까 유예 기간 내에 진행하는 게 유리해요.',
    },
    {
      question: '다주택 증여 양도 비교에서 증여받은 주택을 나중에 팔면 1주택 비과세를 받을 수 있나요?',
      answer: '자녀가 증여받은 주택을 <strong>2년 이상 보유하고 2년 이상 거주</strong>하면 1주택 비과세(12억 이하)를 받을 수 있어요. 다만 취득가액이 부모의 취득가액으로 승계되어서, 부모가 오래전에 산 주택이면 양도차익이 12억을 초과할 수 있어요.',
    },
  ],

  relatedSpokes: [
    { badge: '전략', title: '다주택 매도 순서 절세 전략', desc: '어떤 집부터 팔아야 절세가 되는지 정리', href: '/w/다주택-매도-순서-전략-절세' },
    { badge: '계산', title: '다주택 양도세 중과 전후 세액 비교', desc: '실제 사례로 세금 차이 확인', href: '/w/다주택-양도세-중과-전후-세액-비교' },
    { badge: '개념', title: '양도세 중과 뜻 기본세율 중과세율 비교', desc: '기본세율과 중과세율 차이를 자세히 비교', href: '/w/양도세-중과-뜻-기본세율-중과세율-비교' },
    { badge: '전망', title: '중과 유예 종료 부동산 시장 전망', desc: '유예 종료 후 시장 영향과 대응 전략', href: '/w/중과-유예-종료-부동산-시장-전망' },
  ],

  sources: [
    { name: '소득세법 제104조(세율)', url: 'https://law.go.kr/법령/소득세법/제104조', org: '국가법령정보센터' },
    { name: '상속세및증여세법 제47조(세율)', url: 'https://law.go.kr/법령/상속세및증여세법/제47조', org: '국가법령정보센터' },
    { name: '양도소득세 기본정보 세율', url: 'https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2312&cntntsId=7711', org: '국세청' },
    { name: '증여세 과세표준 및 세율', url: 'https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2296&cntntsId=7664', org: '국세청' },
  ],
}

export default data
