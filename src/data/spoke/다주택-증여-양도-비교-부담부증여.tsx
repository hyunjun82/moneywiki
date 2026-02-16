import Link from 'next/link'
import type { SpokeData } from './types'
import { SpokeCompareCards, SpokeRateBars, FormulaBox, SpokeTable, SpokeFlow, SpokeChecklist, RateCards, SpokeTimeline } from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '다주택-증여-양도-비교-부담부증여',

  meta: {
    title: '다주택 증여 양도 비교 부담부증여 절세 전략까지 총정리',
    description: '다주택자가 자녀에게 집을 넘길 때 증여와 양도 중 어느 게 유리한지 알고 계신가요? 부담부증여와 일반 증여, 양도세까지 비교해 드려요',
    keywords: ['다주택 증여 양도 비교', '부담부증여', '증여세 양도세 비교', '다주택 증여 전략'],
    ogTitle: '다주택 증여 양도 비교 부담부증여 전략 | 머니위키',
    ogDescription: '다주택자 증여 vs 양도 비교, 부담부증여 개념과 활용법, 증여세와 양도세 차이까지 총정리했어요.',
  },

  hub: {
    url: '/w/다주택양도세-중과유예-세율-절세-전략',
    name: '다주택양도세 중과유예 세율 절세 전략',
  },

  breadcrumb: ['세금', '다주택 증여 양도'],

  hero: {
    badge: '2026년 기준',
    h1: <>다주택 증여 양도 비교 — <span className="text-[#1E3A5F]">부담부증여와 절세 전략</span></>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          다주택자가 자녀에게 부동산을 넘길 때 고민이 많아요. 그냥 파는 게 나을까, 증여하는 게 나을까? <strong>다주택 증여 양도 비교</strong>는 세금 부담, 취득 시기, 향후 양도 계획을 종합적으로 따져봐야 해요. 양도는 부모가 양도세를 내고, 증여는 자녀가 증여세를 내는 구조라서 누가 세금을 부담하느냐부터 달라요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          여기에 부담부증여라는 방법도 있어요. 자녀가 주택 대출을 물려받고 나머지만 증여받는 형태인데, <a href="https://law.go.kr/법령/상속세및증여세법/제47조" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">상속세및증여세법 제47조</a>에 따라 대출 부분은 양도로, 나머지는 증여로 처리돼요. 다주택 양도세 중과가 궁금하다면 <Link href="/w/다주택양도세-중과유예-세율-절세-전략" className="text-blue-600 hover:underline">다주택양도세 중과유예 세율 절세 전략</Link>을 먼저 보면 도움이 돼요. 증여와 양도의 핵심 차이부터 정리할게요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '다주택 양도세 중과유예 세율 절세 전략 전체 보기',
    },
  },

  toc: [
    { id: 's1', text: '다주택자는 증여와 양도 중 뭐가 유리한가요?' },
    { id: 's2', text: '부담부증여란 무엇인가요?' },
    { id: 's3', text: '증여세와 양도세 차이는 뭔가요?' },
    { id: 's4', text: '증여 전략은 어떻게 세우나요?' },
    { id: 's5', text: '자주 묻는 질문' },
  ],

  sections: [
    /**
     * ===== S1: 증여 vs 양도 비교 =====
     * 시각 요소: SpokeCompareCards + SpokeRateBars
     * 전환 스타일: A. 독자 대변형
     */
    {
      id: 's1',
      number: '01',
      heading: '다주택자는 증여와 양도 중 뭐가 유리한가요?',
      subtitle: '세금 부담, 취득 시기, 향후 양도 계획에 따라 달라요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            다주택자가 자녀에게 부동산을 넘기는 방법은 크게 두 가지예요. 양도(매매)하거나 증여하는 거죠. 양도는 부모가 <a href="https://law.go.kr/법령/소득세법/제104조" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">소득세법 제104조</a>에 따라 양도소득세를 내고, 증여는 자녀가 <a href="https://law.go.kr/법령/상속세및증여세법/제47조" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">상속세및증여세법 제47조</a>에 따라 증여세를 내요. 양도는 양도차익에 세금이 붙고, 증여는 증여받은 재산 가치 전체에 세율을 곱해서 세금을 계산해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            양도가 유리한 경우는 중과유예 기간(~2026.5.9)을 활용할 수 있을 때예요. 기본세율(6~45%)로 양도할 수 있고, 장기보유특별공제(최대 30%)도 받을 수 있어서 세금을 크게 줄일 수 있어요. 반면 유예 종료 후에는 다주택 중과세율(2주택 +20%p, 3주택 +30%p)이 적용되고 장특공제도 배제돼서 세금이 두 배 가까이 올라가요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            증여가 유리한 경우는 자녀가 증여재산공제(자녀 5천만원, 배우자 6억)를 충분히 활용할 수 있고, 장기간 보유해서 자녀가 나중에 양도할 때 1주택자 비과세나 장특공제를 받을 수 있을 때예요. 단 증여는 취득가액이 부모의 취득가액으로 승계돼서, 자녀가 나중에 팔면 양도차익이 커질 수 있어요.
          </p>

          <SpokeCompareCards
            cards={[
              { title: '양도 (매매)', subtitle: '', items: ['부모가 양도소득세 부담', '양도차익 기준 과세', '중과유예 중 기본세율(6~45%)', '자녀는 시가로 취득'] },
              { title: '증여', subtitle: '', items: ['자녀가 증여세 부담', '증여재산 전체 기준 과세', '증여세율 10~50%', '자녀는 부모 취득가액 승계'] }
            ]}
          />

          <SpokeRateBars bars={[
            { label: '1억원 이하', rate: '10%', width: '20%' },
            { label: '5억원 이하', rate: '20%', width: '40%' },
            { label: '10억원 이하', rate: '30%', width: '60%' },
            { label: '30억원 이하', rate: '40%', width: '80%' },
            { label: '30억원 초과', rate: '50%', width: '100%' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            세금을 줄이는 방법 중 하나가 부담부증여예요. 대출을 자녀가 물려받으면 그 부분은 양도로 처리되고 나머지만 증여로 처리돼서, 증여세 부담을 줄일 수 있어요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '부담부증여',
        title: '부담부증여는 어떻게 활용할까?',
        desc: '대출을 활용한 증여세 절세 방법 확인하기',
        icon: 'calc',
      },
    },

    /**
     * ===== S2: 부담부증여 =====
     * 시각 요소: FormulaBox + SpokeTable
     * 전환 스타일: D. 화제 전환형
     */
    {
      id: 's2',
      number: '02',
      heading: '부담부증여란 무엇인가요?',
      subtitle: '자녀가 대출을 인수하고 나머지만 증여받는 방식이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            부담부증여란 부동산을 증여하면서 거기 담긴 채무(대출)를 자녀가 함께 인수하는 거예요. <a href="https://law.go.kr/법령/상속세및증여세법/제47조" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">상속세및증여세법 제47조</a>에 따르면, 채무 인수 부분은 '양도'로 보고 나머지만 증여로 처리해요. 예를 들어 시가 10억원 주택에 대출 5억원이 있다면, 대출 5억은 양도, 나머지 5억은 증여가 되는 거예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            부모는 대출 인수 부분에 대해 양도세를 내야 해요. 취득가액이 3억이고 대출이 5억이면 양도차익 2억에 양도세가 붙어요. 자녀는 나머지 5억(시가 10억 - 대출 5억)에서 증여재산공제 5천만원을 빼고 증여세를 내요. 순수증여보다 증여세 과세표준이 줄어들어서 세금을 아낄 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            다만 부담부증여는 신중해야 해요. 부모가 다주택자라면 대출 인수 부분에 중과세율이 적용될 수 있어요. 유예 종료 후에는 중과세율(+20~30%p)과 장특공제 배제로 세금이 크게 늘어날 수 있어요. 또 자녀가 대출을 실제로 갚아야 하니까 상환 능력도 충분히 고려해야 해요.
          </p>

          <FormulaBox lines={[
            { text: '양도 부분(부모) = 채무인수금액', numbered: true },
            { text: '양도차익 = 채무인수금액 - (취득가액 x 채무/시가 비율)', numbered: true },
            { text: '증여 부분(자녀) = 시가 - 채무인수금액', numbered: true },
            { text: '증여세 과세표준 = 증여재산가액 - 증여재산공제', numbered: true },
          ]} />

          <SpokeTable id="burden-example" title="부담부증여 vs 순수증여 세금 비교 (예시)" subtitle="시가 10억, 취득가액 3억, 대출 5억 가정" headers={['구분', '부담부증여', '순수증여']} rows={[
            ['양도 부분(부모)', '5억(대출)', '없음'],
            ['양도차익', '3.5억(5억 - 1.5억)', '없음'],
            ['증여 부분(자녀)', '5억(10억 - 5억)', '10억'],
            ['증여세 과세표준', '4.5억(5억 - 0.5억 공제)', '9.5억(10억 - 0.5억 공제)'],
            ['증여세(개산)', '약 1.1억', '약 3.3억'],
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            부담부증여는 증여세를 줄일 수 있지만 부모 양도세 부담도 생겨요. 양도세와 증여세를 합산한 전체 세금을 따져봐야 실제로 절세가 되는지 알 수 있어요.
          </p>

          <p className="text-neutral-600 mb-4 leading-relaxed">
            이제 증여세와 양도세의 세율 차이를 정확히 비교해 볼게요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '세율 비교',
        title: '증여세와 양도세는 세율이 어떻게 다를까?',
        desc: '증여세율과 양도세율 구조 차이 확인하기',
        icon: 'calc',
      },
    },

    /**
     * ===== S3: 증여세 vs 양도세 차이 =====
     * 시각 요소: SpokeFlow + SpokeChecklist
     * 전환 스타일: C. 간결 연결형
     */
    {
      id: 's3',
      number: '03',
      heading: '증여세와 양도세 차이는 뭔가요?',
      subtitle: '과세 대상, 세율 구조, 공제 항목이 완전히 달라요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            증여세는 증여받은 재산 가치 전체를 기준으로 과세해요. 증여재산공제(자녀 5천만원, 배우자 6억)를 빼고 나면 증여세율 10~50%가 적용돼요. 증여세는 누진세지만 구간이 5단계(1억·5억·10억·30억 기준)로 양도세보다 단순해요. <a href="https://law.go.kr/법령/상속세및증여세법/제47조" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">상속세및증여세법 제47조</a>에서 세율과 공제를 정하고 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            양도세는 양도차익(양도가액 - 취득가액 - 필요경비)만 과세해요. 양도세율은 기본 6~45%이고, 다주택자가 조정대상지역 내 주택을 양도하면 중과세율(2주택 +20%p, 3주택 +30%p)이 추가돼요. 장기보유특별공제(최대 30%)를 받을 수 있는데, 중과 시에는 이 공제가 배제돼요. <a href="https://law.go.kr/법령/소득세법/제104조" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">소득세법 제104조</a>에서 세율을 정하고 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            증여는 자녀가 세금을 내고, 양도는 부모가 세금을 내요. 증여받은 자녀는 나중에 그 주택을 팔 때 취득가액이 부모의 취득가액으로 승계되니까, 양도차익이 커져서 양도세 부담이 클 수 있어요. 반면 양도는 자녀가 시가로 취득하니까 나중에 양도차익이 작아져요.
          </p>

          <SpokeFlow steps={[
            { icon: '1', label: '증여', sub: '자녀 증여세 부담' },
            { icon: '2', label: '양도', sub: '부모 양도세 부담' },
            { icon: '3', label: '자녀 재양도', sub: '증여 시 차익↑' },
            { icon: '4', label: '전체 세금', sub: '합산 비교 필수' },
          ]} />

          <SpokeChecklist items={[
            { text: '중과유예 기간 내 양도 가능한가?', done: false, note: '~2026.5.9 기본세율' },
            { text: '자녀가 증여재산공제를 충분히 활용하는가?', done: false, note: '자녀 5천만원' },
            { text: '자녀가 장기 보유 후 1주택 비과세를 받을 수 있는가?', done: false, note: '2년 보유+거주' },
            { text: '부담부증여 시 자녀가 대출을 갚을 수 있는가?', done: false, note: '상환 능력 필수' },
            { text: '부모 양도세와 자녀 재양도세까지 합산했는가?', done: false, note: '전체 세금 비교' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            증여와 양도 중 어느 쪽이 유리한지 판단하려면 단순히 당장의 세금만 볼 게 아니라, 자녀가 나중에 그 주택을 팔 때까지 고려한 전체 세금을 비교해야 해요.
          </p>

          <p className="text-neutral-600 mb-4 leading-relaxed">
            이제 상황별로 어떤 전략을 세우면 좋을지 정리해 볼게요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '전략',
        title: '어떤 상황에서 증여가 유리할까?',
        desc: '증여와 양도 전략 수립 가이드 확인하기',
        icon: 'check',
      },
    },

    /**
     * ===== S4: 증여 전략 =====
     * 시각 요소: RateCards + SpokeTimeline
     * 전환 스타일: 없음 (마지막 섹션)
     */
    {
      id: 's4',
      number: '04',
      heading: '증여 전략은 어떻게 세우나요?',
      subtitle: '중과유예 종료 시점과 자녀 미래 계획을 함께 고려해야 해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            증여 전략을 세울 때는 크게 세 가지를 고려해요. 첫째, 중과유예 종료 시점(2026.5.10)이에요. 유예 기간 내 양도하면 기본세율로 양도할 수 있고 장특공제도 받을 수 있어서 세금이 훨씬 적어요. 유예 종료 후에는 중과세율이 적용되고 공제가 배제되니까 세금이 두 배 가까이 늘어날 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            둘째, 자녀의 미래 계획이에요. 자녀가 그 주택에 오래 거주하고 나중에 1주택 비과세(보유 2년 + 거주 2년)를 받을 수 있다면 증여가 유리해요. 반대로 자녀가 곧 팔 계획이라면 증여받은 취득가액이 낮아서 양도차익이 크게 나와서 세금 부담이 클 수 있어요. 이 경우 부모가 양도하고 자녀가 시가로 사는 게 나을 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            셋째, 부담부증여 활용 가능성이에요. 대출이 있다면 자녀가 대출을 인수하고 나머지만 증여받으면 증여세를 줄일 수 있어요. 다만 부모가 대출 인수 부분에 양도세를 내야 하고, 자녀가 대출을 실제로 갚아야 하니까 상환 능력을 따져봐야 해요.
          </p>

          <RateCards cards={[
            { value: '양도', label: '중과유예 중(~2026.5.9)', lines: ['기본세율 6~45%', '장특공제 가능(최대 30%)', '자녀가 시가로 취득'], highlightColor: 'navy' },
            { value: '증여', label: '자녀 장기보유 계획', lines: ['증여세 10~50%', '자녀 1주택 비과세 가능', '부모 취득가액 승계'],},
            { value: '부담부증여', label: '대출 활용', lines: ['증여세 과표 축소', '부모 일부 양도세 발생', '자녀 대출 상환 부담'],},
          ]} />

          <SpokeTimeline events={[
            { month: '~2026.5.9', title: '중과유예 기간', desc: '양도 시 기본세율 + 장특공제 가능, 다주택자에게 유리' },
            { month: '2026.5.10~', title: '중과 재개', desc: '다주택 양도 시 중과세율(+20~30%p) + 공제 배제, 증여 고려' },
            { month: '증여 후 2년+', title: '자녀 1주택 요건', desc: '자녀가 2년 보유+거주 후 비과세(12억 이하) 가능' },
            { month: '증여 후 10년', title: '재증여 가능', desc: '증여세 과세표준 합산 10년 단위로 초기화' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            증여와 양도 중 어느 쪽이 유리한지는 정답이 없어요. 부모와 자녀의 세금을 합산해서 비교하고, 자녀의 미래 계획까지 고려해야 해요. 세무사와 상담해서 구체적인 시뮬레이션을 해보는 게 안전해요. 다주택 양도세 전체 흐름이 궁금하다면 <Link href="/w/다주택양도세-중과유예-세율-절세-전략" className="text-blue-600 hover:underline">다주택양도세 중과유예 세율 절세 전략</Link>을 참고하세요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '/w/다주택양도세-중과유예-세율-절세-전략',
        badge: '전체 가이드',
        title: '다주택 양도세 중과유예 절세 전략은?',
        desc: '유예 기간 활용 전략과 매도 순서까지 확인하기',
        icon: 'grid',
        primary: true,
      },
    },

    {
      id: 's5',
      number: '05',
      heading: '자주 묻는 질문',
      subtitle: '자주 묻는 질문이에요',
      content: null,
    },
  ],

  faq: [
    {
      question: '부담부증여 시 대출 인수 부분도 중과세율이 적용되나요?',
      answer: '부모가 다주택자이고 조정대상지역 내 주택이라면 중과세율이 적용돼요. 중과유예 기간(~2026.5.9)에는 기본세율만 적용되지만, 유예 종료 후에는 대출 인수 부분에도 <strong>2주택 +20%p, 3주택 +30%p</strong>가 붙어요. 장특공제도 배제되니까 세금이 크게 늘 수 있어요.',
    },
    {
      question: '증여받은 주택을 나중에 팔 때 1주택 비과세를 받을 수 있나요?',
      answer: '자녀가 증여받은 주택을 <strong>2년 이상 보유하고 2년 이상 거주</strong>하면 1주택 비과세(12억 이하)를 받을 수 있어요. 다만 취득가액이 부모의 취득가액으로 승계되니까, 부모가 오래전에 산 주택이면 양도차익이 커서 12억을 초과할 수 있어요. 비과세 요건을 충족하는지 미리 확인하세요.',
    },
  ],

  relatedSpokes: [
    { badge: '중과', title: '양도세 중과 뜻 기본세율 중과세율 비교', desc: '양도세 중과 개념과 기본세율, 중과세율 차이 정리', href: '/w/양도세-중과-뜻-기본세율-중과세율-비교' },
    { badge: '전략', title: '다주택 매도 순서 전략 절세', desc: '어떤 집부터 팔아야 절세가 되는지 정리', href: '/w/다주택-매도-순서-전략-절세' },
    { badge: '계산', title: '다주택 양도세 중과 전후 세액 비교', desc: '실제 사례로 기본세율과 중과세율 세금 차이 계산', href: '/w/다주택-양도세-중과-전후-세액-비교' },
    { badge: '공제', title: '다주택자 장기보유특별공제 적용 조건', desc: '보유 기간별 공제율과 중과 시 배제 규정 정리', href: '/w/다주택자-장기보유특별공제-적용-조건-공제율-계산' },
  ],

  sources: [
    { name: '소득세법 제104조(세율)', url: 'https://law.go.kr/법령/소득세법/제104조', org: '국가법령정보센터' },
    { name: '상속세및증여세법 제47조(세율)', url: 'https://law.go.kr/법령/상속세및증여세법/제47조', org: '국가법령정보센터' },
    { name: '양도소득세 기본정보 세율', url: 'https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2312&cntntsId=7711', org: '국세청' },
    { name: '증여세 과세표준 및 세율', url: 'https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2296&cntntsId=7664', org: '국세청' },
  ],
}

export default data
