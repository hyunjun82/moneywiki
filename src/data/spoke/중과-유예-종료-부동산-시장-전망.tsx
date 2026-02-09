import Link from 'next/link'
import type { SpokeData } from './types'
import { SpokeTimeline, SpokeTable, SpokeRateBars, FormulaBox, SpokeCompareCards, SpokeWarnBox, SpokeFlow, SpokeChecklist } from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '중과-유예-종료-부동산-시장-전망',

  meta: {
    title: '중과 유예 종료 부동산 시장 전망과 대응 전략',
    description: '2026년 5월 양도세 중과 유예가 끝나면 부동산 시장에 어떤 변화가 올까요? 전문가 전망과 대응 전략을 정리했어요',
    keywords: ['중과유예 종료 전망', '부동산 시장 전망', '양도세 중과 재개', '중과유예 대응'],
    ogTitle: '중과 유예 종료 부동산 시장 전망과 대응 전략 | 머니위키',
    ogDescription: '중과 유예 종료 후 부동산 시장 영향, 매물 증감, 가격 변화 전망과 대응 전략이에요.',
  },

  hub: {
    url: '/w/다주택양도세-중과유예-세율-절세-전략',
    name: '다주택양도세 중과유예 세율 절세 전략',
  },

  breadcrumb: ['세금', '다주택양도세 시장 전망'],

  hero: {
    badge: '2026년 2월 기준',
    h1: <>중과 유예 종료 — <span className="text-emerald-600">부동산 시장 전망</span>과 대응 전략</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          다주택자 양도세 중과 유예가 2026년 5월 9일에 종료되면, 부동산 시장에 상당한 변화가 예상돼요. 유예 종료 전 매물 증가, 종료 후 거래 절벽, 가격 변동 등 다양한 시나리오가 논의되고 있어요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          어떤 시나리오에도 대비할 수 있도록, 전문가 전망과 실행 가능한 대응 전략을 정리했어요. <Link href="/w/다주택양도세-중과유예-세율-절세-전략" className="text-blue-600 hover:underline">다주택양도세 중과유예 세율 절세 전략</Link>과 함께 보세요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '다주택 양도세 중과유예 세율 절세 전략 전체 보기',
    },
  },

  toc: [
    { id: 's1', text: '중과 유예가 종료되면 어떻게 되나요?' },
    { id: 's2', text: '부동산 시장에 어떤 영향이 있나요?' },
    { id: 's3', text: '양도세 중과 재개에 대비하려면 뭘 해야 하나요?' },
    { id: 's4', text: '전문가들은 어떻게 전망하나요?' },
    { id: 's5', text: '자주 묻는 질문' },
  ],

  sections: [
    /**
     * ===== S1: 유예 종료 후 변화 =====
     * 시각 요소: SpokeTimeline + SpokeTable
     * 전환 스타일: A. 독자 대변형
     */
    {
      id: 's1',
      number: '01',
      heading: '중과 유예가 종료되면 어떻게 되나요?',
      subtitle: '2026년 5월 10일부터 조정대상지역 다주택자에게 중과세율이 적용돼요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            중과 유예가 종료되면 2026년 5월 10일부터 조정대상지역 내 다주택자에게 양도세 중과가 재개돼요. 2주택자는 기본세율에 20%p, 3주택 이상은 30%p가 추가되고, 장기보유특별공제도 배제돼요. 유예 기간에 기본세율로 양도할 수 있었던 혜택이 전부 사라지는 거예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            이 변화는 단순히 세금만의 문제가 아니에요. 다주택자의 매도·보유·증여 의사결정에 직접적인 영향을 미치고, 이것이 부동산 시장의 매물량, 거래량, 가격에 연쇄적으로 작용해요.
          </p>

          <SpokeTimeline events={[
            { month: '2026.2~3', title: '매물 증가 시작', desc: '유예 종료를 앞두고 다주택자 매물 출회', status: 'current', tag: '매물' },
            { month: '2026.4', title: '거래량 급증', desc: '잔금일 5.9 맞추려는 급매 증가, 매수 우위 시장', status: 'normal', tag: '거래' },
            { month: '2026.5.9', title: '유예 종료', desc: '마지막 기본세율 양도 기한, 잔금 마감', status: 'normal', tag: '종료' },
            { month: '2026.5.10~', title: '거래 절벽 가능', desc: '중과 부담으로 매도 의사 감소, 잠김 효과 발생', status: 'normal', tag: '절벽' },
            { month: '2026.하반기', title: '시장 재조정', desc: '매도·보유 양극화, 증여 수요 증가 가능', status: 'normal', tag: '조정' },
          ]} />

          <SpokeTable id="change-detail" title="유예 종료 후 주요 변화" subtitle="2026년 5월 10일~" headers={['항목', '유예 중', '유예 종료 후']} rows={[
            ['세율', '기본세율 6~45%', '기본 + 20~30%p'],
            ['장기보유특별공제', '최대 30% 적용', '배제(0%)'],
            ['양도차익 5억 3주택 세금', '약 1.05억원', '약 3.22억원'],
            ['다주택자 매도 의향', '적극 매도', '매도 꺼림(잠김)'],
            ['시장 매물량', '증가', '급감 가능'],
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            세금이 이렇게 달라지면 시장 참여자들의 행동도 바뀔 수밖에 없잖아요. 구체적으로 시장에 어떤 영향이 있는지 살펴볼게요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '시장 영향',
        title: '부동산 시장은 어떻게 변할까?',
        desc: '매물량, 거래량, 가격 변화 전망 확인',
        icon: 'info',
      },
    },

    /**
     * ===== S2: 시장 영향 =====
     * 시각 요소: SpokeRateBars + FormulaBox
     * 전환 스타일: B. 실생활 질문형
     */
    {
      id: 's2',
      number: '02',
      heading: '부동산 시장에 어떤 영향이 있나요?',
      subtitle: '단기 매물 출회, 이후 거래 절벽과 가격 양극화가 예상돼요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            유예 종료 직전에는 다주택자들이 중과를 피하려고 매물을 쏟아낼 가능성이 높아요. 이 시기에 매물이 늘면 매수자 입장에서는 선택지가 넓어지고, 급매 물건이 나올 수도 있어요. 단기적으로 매수 우위 시장이 될 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            반면 유예 종료 후에는 '잠김 효과(lock-in effect)'가 나타날 수 있어요. 중과세율이 너무 높아서 다주택자들이 매도를 포기하고 보유를 선택하는 거예요. 매물이 줄면 거래량이 급감하고, 수요가 있는 인기 지역은 오히려 가격이 오를 수도 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            과거 2018~2020년 중과 시행기에도 비슷한 패턴이 나타났어요. 중과 부담으로 다주택자가 매도를 꺼리면서 서울 인기 지역은 오히려 가격이 올랐어요. 이번에도 유사한 패턴이 반복될 수 있다는 게 전문가들의 분석이에요.
          </p>

          <SpokeRateBars bars={[
            { label: '단기 매물 출회', rate: '가능성 높음', width: '85%' },
            { label: '유예 후 거래 절벽', rate: '가능성 높음', width: '80%' },
            { label: '서울 인기지역 가격 상승', rate: '가능성 중간', width: '55%' },
            { label: '지방 가격 하락', rate: '가능성 중간', width: '50%' },
            { label: '증여 수요 증가', rate: '가능성 높음', width: '75%' },
          ]} />

          <FormulaBox lines={[
            { text: '중과세율이 너무 높아서 매도하면 손해가 큰 상황', numbered: false },
            { text: '→ 다주택자가 매도 대신 보유를 선택', numbered: true },
            { text: '→ 시장 매물 감소 → 거래량 급감', numbered: true },
            { text: '// 역효과: → 수요 있는 지역은 희소성으로 가격 상승 가능', numbered: true, comment: true },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            그러면 이런 변화에 어떻게 대비해야 할까요? 실행할 수 있는 구체적인 대응 방법을 알아볼게요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '대비',
        title: '어떻게 대비해야 할까?',
        desc: '실행 가능한 대응 전략 확인',
        icon: 'check',
      },
    },

    /**
     * ===== S3: 대응 전략 =====
     * 시각 요소: SpokeCompareCards + SpokeWarnBox
     * 전환 스타일: C. 간결 연결형
     */
    {
      id: 's3',
      number: '03',
      heading: '양도세 중과 재개에 대비하려면 뭘 해야 하나요?',
      subtitle: '유예 기간 내 매도, 증여 전환, 중과 예외 확인 세 가지예요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            대응 전략은 크게 세 가지로 나뉘어요. 첫째, <strong>유예 기간 내 매도</strong>예요. 양도차익이 큰 주택을 5월 9일까지 잔금을 받으면 기본세율이 적용돼요. 절세 효과가 가장 크고 확실한 방법이에요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            둘째, <strong>증여 전환</strong>이에요. 유예 종료 후 중과세율로 매도하는 것보다 증여나 부담부증여가 총 세금이 적을 수 있어요. 특히 전세보증금이 큰 주택은 부담부증여를 검토해 볼 만해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            셋째, <strong>중과 예외 사유 확인</strong>이에요. 상속주택(5년 이내), 일시적 2주택(3년 이내), 장기임대등록 주택 등은 중과 유예와 관계없이 기본세율이 적용돼요. 본인이 예외에 해당하면 유예 종료가 큰 영향을 미치지 않아요.
          </p>

          <SpokeCompareCards cards={[
            { title: '매도 전략', subtitle: '', items: ['유예 기간 내 잔금 완료', '양도차익 큰 주택 우선', '장특공제 최대 활용', '1주택 비과세 달성 목표'] },
            { title: '보유·증여 전략', subtitle: '', items: ['비조정지역 주택은 보유 유지', '조정지역은 증여 전환 검토', '부담부증여로 세금 분산', '배우자 증여(6억 공제) 활용'] }
          ]} />

          <SpokeWarnBox title="주의사항">
            <p className="mb-2 leading-relaxed">
              <strong>연장을 기대하고 기다리지 마세요.</strong> 2026년 2월 현재 정부는 추가 연장 불가 입장이에요. 연장이 안 되면 잔금일이 5월 10일을 넘기는 순간 중과가 적용돼요. <strong>급하게 저가 매도하지 마세요.</strong> 중과가 무서워서 시세보다 크게 낮춰 파는 건 오히려 손해일 수 있어요. 세금을 정확히 계산한 후 판단하세요.
            </p>
          </SpokeWarnBox>

          <p className="text-neutral-600 mb-4 leading-relaxed">
            대응 전략을 세웠으면, 전문가들의 시장 전망도 참고해서 최종 판단을 내려 볼게요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '전망',
        title: '전문가들은 어떻게 보고 있을까?',
        desc: '전문가 전망과 시나리오 확인',
        icon: 'info',
      },
    },

    /**
     * ===== S4: 전문가 전망 =====
     * 시각 요소: SpokeFlow + SpokeChecklist
     * 전환 스타일: 없음 (마지막)
     */
    {
      id: 's4',
      number: '04',
      heading: '전문가들은 어떻게 전망하나요?',
      subtitle: '단기 매물 출회 후 거래 절벽, 서울 강세 지속이 다수 의견이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            부동산 전문가들의 대체적인 전망은 '유예 종료 직전 단기 매물 출회 후, 중과 재개 이후 거래 절벽이 올 것'이라는 거예요. 2018~2020년 중과 시행기에도 비슷한 패턴이 나타났기 때문에, 이번에도 유사한 흐름이 예상돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            서울 핵심 지역(강남, 서초, 용산 등)은 수요가 탄탄해서 중과가 재개돼도 가격이 크게 하락하기 어려울 거라는 의견이 많아요. 오히려 매물 감소로 인한 희소성 프리미엄이 붙을 수 있다는 분석도 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            반면 서울 외곽이나 경기 일부, 지방은 상황이 다를 수 있어요. 수요가 약한 지역에서는 유예 종료 전 매물이 쏟아지면서 가격 하락 압력이 생길 수 있어요. 지역별로 양극화가 심화될 가능성이 높아요.
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

          <p className="text-neutral-600 mb-4 leading-relaxed">
            어떤 전망이든 확실한 건, 유예 기간이 끝나면 다주택자의 세금 부담이 크게 늘어난다는 거예요. 지금이 대응 전략을 실행할 수 있는 마지막 기회예요. 매도 순서 전략은 <Link href="/w/다주택-매도-순서-전략-절세" className="text-blue-600 hover:underline">다주택 매도 순서 전략</Link>에서, 증여와 양도 비교는 <Link href="/w/다주택-증여-양도-비교-부담부증여" className="text-blue-600 hover:underline">증여 vs 양도 비교</Link>에서 확인할 수 있어요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '/w/다주택양도세-중과유예-세율-절세-전략',
        badge: '전체 가이드',
        title: '다주택 양도세 절세 전략 전체 보기',
        desc: '유예 기간 활용법과 전체 전략 확인하기',
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
      question: '중과가 재개되면 전세 시장에도 영향이 있나요?',
      answer: '중과 부담으로 다주택자가 매도 대신 보유를 선택하면, 전세 매물이 유지되거나 늘어날 수 있어요. 하지만 증여나 매도로 주택 수를 줄이면 전세 매물이 감소할 수도 있어요. 지역과 상황에 따라 다르게 나타날 수 있어요.',
    },
    {
      question: '중과 재개 후에도 기본세율이 적용되는 경우가 있나요?',
      answer: '네, 있어요. <strong>비조정대상지역</strong> 주택은 다주택자라도 기본세율이 적용돼요. 또한 상속주택(5년 이내), 일시적 2주택, 장기임대등록 주택 등 <strong>중과 예외 사유</strong>에 해당하면 조정지역이라도 기본세율로 양도할 수 있어요.',
    },
  ],

  relatedSpokes: [
    { badge: '전략', title: '다주택 매도 순서 전략 절세', desc: '어떤 집부터 팔아야 절세가 되는지 정리', href: '/w/다주택-매도-순서-전략-절세' },
    { badge: '증여', title: '다주택 증여 양도 비교 부담부증여', desc: '증여와 양도 중 뭐가 유리한지 비교', href: '/w/다주택-증여-양도-비교-부담부증여' },
    { badge: '연혁', title: '중과 유예 연혁 종료일 확정', desc: '유예 종료일과 연장 가능성 확인', href: '/w/중과-유예-연혁-종료일-확정' },
    { badge: '지역', title: '조정대상지역 목록 서울 경기', desc: '서울·경기 조정대상지역과 해제 지역', href: '/w/조정대상지역-목록-서울-경기' },
  ],

  sources: [
    { name: '소득세법 제104조(세율)', url: 'https://law.go.kr/법령/소득세법/제104조', org: '국가법령정보센터' },
    { name: '소득세법 시행령 제167조의3', url: 'https://law.go.kr/법령/소득세법시행령/제167조의3', org: '국가법령정보센터' },
    { name: '2026년 경제정책방향', url: 'https://www.moef.go.kr', org: '기획재정부' },
    { name: '양도소득세 기본정보', url: 'https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2312&cntntsId=7711', org: '국세청' },
  ],
}

export default data
