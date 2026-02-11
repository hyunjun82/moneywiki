import Link from 'next/link'
import type { SpokeData } from './types'
import { SpokeTimeline, SpokeRateBars, SpokeTable, SpokeCompareCards, FormulaBox, SpokeChecklist, SpokeWarnBox, TipBox } from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '중과-유예-연혁-종료일-확정',

  meta: {
    title: '양도세 중과 유예 연혁 종료일 연장 여부 총정리',
    description: '다주택자 양도세 중과 유예가 매년 연장되다가 2026년 5월 9일에 종료된다는 거 아시나요? 연혁부터 종료일까지 정리했어요',
    keywords: ['양도세 중과 유예', '중과유예 종료일', '중과유예 연혁', '중과유예 연장'],
    ogTitle: '양도세 중과 유예 연혁 종료일 연장 여부 | 머니위키',
    ogDescription: '중과유예 연혁, 종료일 2026년 5월 9일, 추가 연장 가능성까지 총정리했어요.',
  },

  hub: {
    url: '/w/다주택양도세-중과유예-세율-절세-전략',
    name: '다주택양도세 중과유예 세율 절세 전략',
  },

  breadcrumb: ['세금', '다주택양도세 중과유예 연혁'],

  hero: {
    badge: '2026년 2월 기준',
    h1: <>양도세 중과 유예 — <span className="text-[#1E3A5F]">연혁과 종료일</span> 총정리</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          다주택자 양도세 중과 유예는 2022년 5월 10일에 처음 시작돼서 매년 1년씩 연장되어 왔어요. 현재 기준으로 <strong>2026년 5월 9일</strong>이 종료일이에요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          정부가 매년 연장해 왔기 때문에 '이번에도 연장하겠지'라고 생각하기 쉽지만, 2026년 2월 현재 추가 연장은 확정되지 않았어요. <Link href="/w/다주택양도세-중과유예-세율-절세-전략" className="text-blue-600 hover:underline">다주택양도세 중과유예 세율 절세 전략</Link>과 함께 보면 전체 흐름이 더 잘 잡혀요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '다주택 양도세 중과유예 세율 절세 전략 전체 보기',
    },
  },

  toc: [
    { id: 's1', text: '양도세 중과 유예란 무엇인가요?' },
    { id: 's2', text: '중과유예 종료일은 언제인가요?' },
    { id: 's3', text: '유예 제도의 연혁은 어떻게 되나요?' },
    { id: 's4', text: '중과유예가 또 연장되나요?' },
    { id: 's5', text: '자주 묻는 질문' },
  ],

  sections: [
    /**
     * ===== S1: 중과 유예란 =====
     * 시각 요소: SpokeTimeline + SpokeRateBars
     * 전환 스타일: A. 독자 대변형
     */
    {
      id: 's1',
      number: '01',
      heading: '양도세 중과 유예란 무엇인가요?',
      subtitle: '다주택자에게 기본세율만 적용하는 한시적 조치예요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            양도세 중과 유예란 조정대상지역 내 다주택자가 주택을 팔 때 중과세율(기본세율 +20~30%p) 대신 기본세율(6~45%)만 적용하는 한시적 조치예요. <a href="https://law.go.kr/법령/소득세법시행령/제167조의3" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">소득세법 시행령 제167조의3</a>에 근거하고 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            유예 기간 중에는 2주택이든 3주택이든 기본세율로 양도할 수 있어요. 장기보유특별공제(최대 30%)도 적용받을 수 있어요. 중과가 재개되면 이 두 가지 혜택이 모두 사라지기 때문에, 유예 기간 활용이 절세의 핵심이에요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            윤석열 정부 출범 직후인 2022년 5월 10일에 처음 시행됐고, 이후 매년 1년씩 연장되어 현재 2026년 5월 9일까지 적용되고 있어요. 연장 과정을 타임라인으로 정리하면 다음과 같아요.
          </p>

          <SpokeTimeline events={[
            { month: '2022.5.10', title: '최초 유예 시행', desc: '소득세법 시행령 개정으로 1년간 중과 배제 시작', status: 'normal', tag: '1차' },
            { month: '2023.5.9', title: '1차 연장', desc: '2024년 5월 9일까지 1년 추가 연장', status: 'normal', tag: '2차' },
            { month: '2024.5.9', title: '2차 연장', desc: '2025년 5월 9일까지 1년 추가 연장', status: 'normal', tag: '3차' },
            { month: '2025.5.9', title: '3차 연장', desc: '2026년 5월 9일까지 1년 추가 연장', status: 'normal', tag: '4차' },
            { month: '2026.5.9', title: '유예 종료 예정', desc: '추가 연장 미확정, 중과 재개 가능', status: 'current', tag: '종료?' },
          ]} />

          <SpokeRateBars bars={[
            { label: '유예 중(기본세율)', rate: '40%', width: '53%' },
            { label: '2주택 중과', rate: '60%', width: '80%' },
            { label: '3주택 중과', rate: '70%', width: '93%' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            이렇게 보면 중과 유예가 절세에 얼마나 큰 의미인지 감이 오잖아요. 그러면 정확한 종료일과 기준이 뭔지 확인해 볼게요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '종료일',
        title: '종료일이 정확히 언제일까?',
        desc: '중과유예 종료일과 잔금일 기준 확인',
        icon: 'clock',
      },
    },

    /**
     * ===== S2: 종료일 =====
     * 시각 요소: SpokeTable + SpokeCompareCards
     * 전환 스타일: B. 실생활 질문형
     */
    {
      id: 's2',
      number: '02',
      heading: '중과유예 종료일은 언제인가요?',
      subtitle: '2026년 5월 9일이 마지막 날이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            현행 소득세법 시행령 기준으로 중과 유예 종료일은 <strong>2026년 5월 9일</strong>이에요. 2026년 5월 9일까지 양도(잔금일 기준)하면 기본세율이 적용되고, 5월 10일부터는 중과세율이 재개돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            여기서 중요한 게 '양도 시기' 기준이에요. 양도세법상 양도 시기는 계약일이 아니라 <strong>잔금 수령일(대금청산일)</strong>이에요. 계약을 3월에 하더라도 잔금을 6월에 받으면 중과가 적용될 수 있어요. 반대로 4월에 계약해서 5월 8일에 잔금을 받으면 유예 혜택을 받아요.
          </p>

          <SpokeTable id="deadline-detail" title="중과유예 기준일 정리" subtitle="소득세법 시행령 제167조의3" headers={['구분', '기준', '중과 적용']} rows={[
            ['잔금일 2026.5.9 이전', '대금청산일 기준', '기본세율(유예)'],
            ['잔금일 2026.5.10 이후', '대금청산일 기준', '중과세율 적용'],
            ['등기 먼저 + 잔금 후', '등기접수일 기준', '등기접수일로 판단'],
            ['잔금 불분명', '등기접수일 기준', '등기접수일로 판단'],
          ]} />

          <SpokeCompareCards cards={[
            { title: '~2026.5.9(유예 중)', subtitle: '', items: ['기본세율 6~45%', '장기보유특별공제 가능', '2년 이상 보유 시 적용', '주택 수 무관'] },
            { title: '2026.5.10~(중과 재개)', subtitle: '', items: ['기본세율 + 20~30%p', '장기보유특별공제 배제', '조정대상지역 내 주택', '2주택 이상 대상'] }
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            5월 9일에 맞춰서 매도하려면 최소 2~3개월 전에 매물을 내놓아야 해요. 매수자 찾기, 계약, 잔금 일정까지 고려하면 지금부터 움직여야 할 시기예요.
          </p>

          <p className="text-neutral-600 mb-4 leading-relaxed">
            그런데 이 유예 제도가 원래 어떻게 시작됐고, 왜 매년 연장됐는지 궁금하지 않으세요?
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '연혁',
        title: '유예 제도는 어떻게 시작됐을까?',
        desc: '2022년부터 시작된 유예 제도 연혁 확인',
        icon: 'clock',
      },
    },

    /**
     * ===== S3: 연혁 =====
     * 시각 요소: FormulaBox + SpokeChecklist
     * 전환 스타일: D. 화제 전환형
     */
    {
      id: 's3',
      number: '03',
      heading: '유예 제도의 연혁은 어떻게 되나요?',
      subtitle: '2022년 정권교체 후 시작돼서 매년 1년씩 연장됐어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            다주택자 양도세 중과는 원래 문재인 정부 시절인 2018년 4월부터 본격 시행됐어요. 당시 조정대상지역 내 2주택자에게 10%p, 3주택 이상에게 20%p를 추가했고, 2021년 6월부터는 2주택자 20%p, 3주택자 30%p로 강화됐어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            2022년 5월 윤석열 정부가 출범하면서 부동산 시장 안정화를 위해 중과 유예를 시작했어요. 소득세법 시행령 제167조의3을 신설해서, 2년 이상 보유한 조정대상지역 내 주택을 양도할 때 중과세율과 장특공제 배제를 한시적으로 유예했어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            이후 부동산 시장 상황을 이유로 매년 1년씩 연장했어요. 연장 근거는 '부동산 거래 절벽 해소'와 '시장 연착륙'이었어요. 시행령 개정만으로 가능하기 때문에 국회 동의 없이 정부가 단독으로 결정할 수 있었어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            각 연장 시점의 주요 배경을 정리하면 아래와 같아요.
          </p>

          <FormulaBox lines={[
            { text: '// 최초 유예: 소득세법 시행령 제167조의3 (2022.5.31 신설)', numbered: true, comment: true },
            { text: '// 1차 연장: 같은 조 개정 (2023.2.28)', numbered: true, comment: true },
            { text: '// 2차 연장: 같은 조 개정 (2024.2.29)', numbered: true, comment: true },
            { text: '// 3차 연장: 같은 조 개정 (2025.2)', numbered: true, comment: true },
          ]} />

          <SpokeChecklist items={[
            { text: '2022.5: 정권교체 직후, 부동산 규제 완화 기조 전환', done: true, note: '최초 시행' },
            { text: '2023.2: 금리 인상으로 거래량 급감, 시장 침체 우려', done: true, note: '1차 연장' },
            { text: '2024.2: 건설경기 침체, 미분양 증가, 연착륙 필요', done: true, note: '2차 연장' },
            { text: '2025.1: 서울 집값 상승에도 지방 침체 지속, 부분 완화 유지', done: true, note: '3차 연장' },
            { text: '2026.5.9: 종료 예정, 추가 연장 미확정', done: false, note: '향후 결정' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            그런데 한 가지 중요한 질문이 남아 있어요. 이번에도 연장될 가능성이 있는지, 없는지가 다주택자에게는 가장 급한 문제예요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '연장 가능성',
        title: '이번에도 연장될까?',
        desc: '추가 연장 가능성과 대비 전략 확인',
        icon: 'info',
      },
    },

    /**
     * ===== S4: 연장 가능성 =====
     * 시각 요소: SpokeWarnBox + TipBox
     * 전환 스타일: 없음 (마지막)
     */
    {
      id: 's4',
      number: '04',
      heading: '중과유예가 또 연장되나요?',
      subtitle: '2026년 2월 현재 추가 연장은 확정되지 않았어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            2026년 2월 현재 정부는 '중과 유예 추가 연장은 없다'는 입장을 밝히고 있어요. 그동안 매년 연장해 온 패턴과 달리, 이번에는 서울 집값 상승과 투기 우려 때문에 중과를 재개해야 한다는 목소리가 커지고 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            다만 정치 상황이나 부동산 시장 변화에 따라 입장이 바뀔 수 있어요. 시행령 개정은 정부 단독으로 결정할 수 있기 때문에, 종료일 직전에 갑자기 연장이 발표될 가능성도 완전히 배제할 수는 없어요. 하지만 그 가능성에 기대서 매도 시기를 늦추는 건 위험해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            전문가들은 '연장을 전제로 계획을 세우지 말라'고 조언해요. 연장이 안 되면 중과세율이 즉시 적용되기 때문에, 유예 기간 내에 양도를 완료하는 게 안전한 전략이에요. 특히 양도차익이 큰 주택일수록 중과 전후 세금 차이가 크기 때문에 서둘러야 해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            연장 여부와 관계없이 대비할 수 있는 방법을 정리했어요.
          </p>

          <SpokeWarnBox title="주의사항">
            <p className="mb-2 leading-relaxed">
              매년 연장됐으니 이번에도 될 거라는 생각은 위험해요. 연장이 확정되기 전에 잔금일이 5월 10일을 넘기면 중과세율이 적용돼요. 3주택자가 양도차익 5억원인 주택을 파는 경우, 유예 중이면 약 1.6억원인 세금이 중과되면 약 3.2억원으로 두 배 가까이 늘어요.
            </p>
          </SpokeWarnBox>

          <TipBox title="유예 종료 대비 체크리스트">
            <p className="mb-0 leading-relaxed">
              <strong>1.</strong> 양도차익이 큰 주택 목록을 먼저 정리하세요. <strong>2.</strong> 잔금일이 5월 9일 이전이 되도록 역산해서 매물 시점을 정하세요. <strong>3.</strong> 매수자 찾기에 2~3개월이 걸릴 수 있으니 지금 바로 움직이세요. <strong>4.</strong> 양도보다 증여가 유리한 주택이 있는지도 함께 검토하세요. 구체적인 매도 전략은 <Link href="/w/다주택-매도-순서-전략-절세" className="text-blue-600 hover:underline">다주택 매도 순서 전략</Link>에서 확인할 수 있어요.
            </p>
          </TipBox>

          <p className="text-neutral-600 mb-4 leading-relaxed">
            중과 유예 종료 후 시장이 어떻게 변할지, 어떤 대응 전략이 있는지 더 알고 싶다면 <Link href="/w/중과-유예-종료-부동산-시장-전망" className="text-blue-600 hover:underline">중과 유예 종료 부동산 시장 전망</Link>을 참고하세요. 유예 기간이 얼마 남지 않은 만큼, 지금이 가장 중요한 시점이에요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '/w/다주택양도세-중과유예-세율-절세-전략',
        badge: '전체 가이드',
        title: '중과유예 절세 전략 전체 보기',
        desc: '유예 기간 활용 전략부터 매도 순서까지 확인하기',
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
      question: '중과 유예가 끝나면 바로 다음 날부터 중과가 적용되나요?',
      answer: '네, 현행 규정상 2026년 5월 10일 양도분부터 중과세율이 적용돼요. 잔금일이 5월 9일이면 기본세율, 5월 10일이면 중과세율이에요. 하루 차이로 세금이 크게 달라질 수 있으니 잔금일 관리가 중요해요.',
    },
    {
      question: '시행령 개정은 국회 동의가 필요 없나요?',
      answer: '소득세법 시행령은 대통령령이라서 국회 동의 없이 정부가 단독으로 개정할 수 있어요. 그래서 종료일 직전에 연장이 결정될 수도 있지만, 그 가능성에 기대서 매도를 미루는 건 권하지 않아요.',
    },
  ],

  relatedSpokes: [
    { badge: '개념', title: '양도세 중과 뜻 기본세율 중과세율 비교', desc: '기본세율과 중과세율의 차이를 자세히 비교', href: '/w/양도세-중과-뜻-기본세율-중과세율-비교' },
    { badge: '시기', title: '양도세 잔금일 기준 계약일 판단', desc: '잔금일과 계약일 중 뭐가 기준인지 확인', href: '/w/양도세-잔금일-기준-계약일-판단' },
    { badge: '전략', title: '다주택 매도 순서 전략 절세', desc: '어떤 집부터 팔아야 절세가 되는지 정리', href: '/w/다주택-매도-순서-전략-절세' },
    { badge: '전망', title: '중과 유예 종료 부동산 시장 전망', desc: '유예 종료 후 시장 영향과 대응 전략', href: '/w/중과-유예-종료-부동산-시장-전망' },
  ],

  sources: [
    { name: '소득세법 시행령 제167조의3', url: 'https://law.go.kr/법령/소득세법시행령/제167조의3', org: '국가법령정보센터' },
    { name: '2026년 경제정책방향', url: 'https://www.moef.go.kr', org: '기획재정부' },
    { name: '양도소득세 기본정보', url: 'https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2312&cntntsId=7711', org: '국세청' },
    { name: '소득세법 제104조(세율)', url: 'https://law.go.kr/법령/소득세법/제104조', org: '국가법령정보센터' },
  ],
}

export default data
