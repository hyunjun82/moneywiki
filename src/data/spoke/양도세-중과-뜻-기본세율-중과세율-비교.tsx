import Link from 'next/link'
import type { SpokeData } from './types'
import { SpokeCompareCards, FormulaBox, SpokeRateBars, SpokeTable, SpokeFlow, TipBox, SpokeChecklist, RateCards } from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '양도세-중과-뜻-기본세율-중과세율-비교',

  meta: {
    title: '양도세 중과 뜻 기본세율 중과세율 비교 대상까지 총정리',
    description: '양도세 중과가 적용되면 세금이 두 배 가까이 늘어난다는 거 아시나요? 기본세율과 중과세율의 차이를 한눈에 비교해 드려요',
    keywords: ['양도세 중과 뜻', '양도세 기본세율', '양도세 중과세율', '중과 비교'],
    ogTitle: '양도세 중과 뜻 기본세율 중과세율 비교 | 머니위키',
    ogDescription: '양도세 중과 개념, 기본세율과 중과세율 비교, 중과 대상과 조건까지 총정리했어요.',
  },

  hub: {
    url: '/w/다주택양도세-중과유예-세율-절세-전략',
    name: '다주택양도세 중과유예 세율 절세 전략',
  },

  breadcrumb: ['세금', '다주택양도세 중과 뜻'],

  hero: {
    badge: '2026년 기준',
    h1: <>양도세 중과 뜻 — <span className="text-emerald-600">기본세율과 중과세율</span> 비교</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          집을 팔 때 내는 양도소득세, 다주택자라면 '중과'라는 단어가 신경 쓰일 수밖에 없어요. <strong>양도세 중과</strong>란 다주택자가 조정대상지역 내 주택을 양도할 때 기본세율에 추가 세율을 더해서 부과하는 제도예요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          기본세율만 적용되면 6~45%인데, 중과가 붙으면 최대 75%까지 올라가요. <a href="https://law.go.kr/법령/소득세법/제104조" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">소득세법 제104조</a>에 근거한 제도이고, 전체적인 중과유예 흐름이 궁금하면 <Link href="/w/다주택양도세-중과유예-세율-절세-전략" className="text-blue-600 hover:underline">다주택양도세 중과유예 세율 절세 전략</Link>을 같이 보면 도움이 돼요. 먼저 중과가 뭔지부터 정리할게요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '다주택 양도세 중과유예 세율 절세 전략 전체 보기',
    },
  },

  toc: [
    { id: 's1', text: '양도세 중과란 무엇인가요?' },
    { id: 's2', text: '양도세 기본세율은 얼마인가요?' },
    { id: 's3', text: '양도세 중과세율은 얼마나 더 내나요?' },
    { id: 's4', text: '양도세 중과 대상은 누구인가요?' },
    { id: 's5', text: '자주 묻는 질문' },
  ],

  sections: [
    /**
     * ===== S1: 양도세 중과 개념 =====
     * 시각 요소: SpokeCompareCards + FormulaBox
     * 전환 스타일: A. 독자 대변형
     */
    {
      id: 's1',
      number: '01',
      heading: '양도세 중과란 무엇인가요?',
      subtitle: '기본세율에 추가 세율을 더해서 부과하는 제도예요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            양도세 중과란 다주택자가 조정대상지역 내 주택을 양도할 때 기본세율(6~45%)에 추가 세율을 더해서 세금을 부과하는 제도예요. <a href="https://law.go.kr/법령/소득세법/제104조" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">소득세법 제104조</a>에 따르면, 2주택자는 기본세율에 20%p를, 3주택 이상은 30%p를 더해요. 정부가 다주택 투기를 억제하기 위해 도입한 제도예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            중과가 적용되면 세율만 올라가는 게 아니에요. 장기보유특별공제(최대 30%)가 아예 배제돼요. 오래 보유했더라도 공제를 받을 수 없으니까 실질 세금이 훨씬 더 커지는 거예요. 예를 들어 10년 보유해서 30% 공제를 받을 수 있었던 게, 중과되면 공제 0%로 바뀌어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            다만 현재는 중과유예 조치로 2026년 5월 9일까지 기본세율만 적용되고 있어요. 유예 기간에는 다주택자라도 기본세율로 양도할 수 있고, 장기보유특별공제도 받을 수 있어요. 유예와 중과의 핵심 차이를 비교해 볼게요.
          </p>

          <SpokeCompareCards cards={[
            { title: '중과 적용 시', subtitle: '', items: ['기본세율 + 20~30%p 추가', '장기보유특별공제 배제', '실질 세율 최대 75%', '조정대상지역 내 다주택자'] },
            { title: '유예 적용 시(~2026.5.9)', subtitle: '', items: ['기본세율 6~45%만 적용', '장기보유특별공제 가능(최대 30%)', '실질 세율 최대 45%', '주택 수 관계없이 동일'] }
          ]} />

          <FormulaBox lines={[
            { text: '양도차익 = 양도가액 - 취득가액 - 필요경비', numbered: true },
            { text: '// 중과 시 장특공제 0%: 과세표준 = 양도차익 - 장기보유특별공제 - 기본공제(250만원)', numbered: true, comment: true },
            { text: '산출세액 = 과세표준 x (기본세율 + 중과추가세율)', numbered: true },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            세율이 얼마나 차이 나는지 궁금하잖아요. 기본세율 구간부터 먼저 확인해 볼게요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '기본세율',
        title: '기본세율은 구간별로 얼마일까?',
        desc: '과세표준 구간별 기본세율 확인하기',
        icon: 'calc',
      },
    },

    /**
     * ===== S2: 기본세율 =====
     * 시각 요소: SpokeRateBars + SpokeTable
     * 전환 스타일: D. 화제 전환형
     */
    {
      id: 's2',
      number: '02',
      heading: '양도세 기본세율은 얼마인가요?',
      subtitle: '과세표준에 따라 6%에서 45%까지 8단계로 나뉘어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            양도소득세 기본세율은 종합소득세와 동일한 구간을 사용해요. 과세표준(양도차익에서 공제를 뺀 금액)이 커질수록 세율이 올라가는 누진세 구조예요. 가장 낮은 구간은 1,400만원 이하로 6%, 가장 높은 구간은 10억원 초과로 45%가 적용돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            누진세라서 구간별로 세율이 따로 적용돼요. 예를 들어 과세표준이 6,000만원이면, 1,400만원까지는 6%, 5,000만원까지는 15%, 나머지 1,000만원에는 24%가 적용돼요. 전체를 24%로 계산하는 게 아니에요. 이를 쉽게 계산하기 위해 '누진공제'라는 걸 써요.
          </p>

          <SpokeRateBars bars={[
            { label: '1,400만원 이하', rate: '6%', width: '13%' },
            { label: '5,000만원 이하', rate: '15%', width: '33%' },
            { label: '8,800만원 이하', rate: '24%', width: '53%' },
            { label: '1.5억원 이하', rate: '35%', width: '78%' },
            { label: '3억원 이하', rate: '38%', width: '84%' },
            { label: '5억원 이하', rate: '40%', width: '89%' },
            { label: '10억원 이하', rate: '42%', width: '93%' },
            { label: '10억원 초과', rate: '45%', width: '100%' },
          ]} />

          <SpokeTable id="rate-detail" title="기본세율 및 누진공제액" subtitle="2026년 기준, 소득세법 제104조" headers={['과세표준', '세율', '누진공제']} rows={[
            ['1,400만원 이하', '6%', '-'],
            ['5,000만원 이하', '15%', '126만원'],
            ['8,800만원 이하', '24%', '576만원'],
            ['1.5억원 이하', '35%', '1,544만원'],
            ['3억원 이하', '38%', '1,994만원'],
            ['5억원 이하', '40%', '2,594만원'],
            ['10억원 이하', '42%', '3,594만원'],
            ['10억원 초과', '45%', '6,594만원'],
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            기본세율은 1주택자든 다주택자든 동일하게 적용돼요. 차이가 나는 건 중과세율이 추가되느냐 아니냐예요. 중과 유예 중에는 누구나 이 기본세율만 내면 되지만, 유예가 끝나면 상황이 완전히 달라져요.
          </p>

          <p className="text-neutral-600 mb-4 leading-relaxed">
            그런데 중과가 붙으면 구체적으로 세금이 얼마나 더 나오는 걸까요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '중과세율',
        title: '중과되면 세금이 얼마나 늘어날까?',
        desc: '기본세율 대비 중과세율 증가분 확인',
        icon: 'calc',
      },
    },

    /**
     * ===== S3: 중과세율 =====
     * 시각 요소: SpokeFlow + TipBox
     * 전환 스타일: C. 간결 연결형
     */
    {
      id: 's3',
      number: '03',
      heading: '양도세 중과세율은 얼마나 더 내나요?',
      subtitle: '2주택은 +20%p, 3주택 이상은 +30%p가 추가돼요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            중과세율은 기본세율에 일정 퍼센트포인트를 더하는 구조예요. 2주택자는 기본세율에 20%p를, 3주택 이상은 30%p를 추가해요. 과세표준이 3억원이라면 기본세율 38%에 3주택 중과 30%p가 더해져서 68%가 되는 거예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            여기에 장기보유특별공제 배제까지 겹치면 실질 세금 차이는 더 커져요. 10년 보유한 주택의 양도차익이 5억원이라면, 유예 중에는 장특공제 30%를 적용받아 과세표준이 3.5억원이 되고 기본세율 약 38%가 적용돼요. 중과되면 공제 없이 5억원 전체에 70%가 적용되는 거예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            소득세법에서 중과가 적용되는 조건은 명확해요. 조정대상지역 내 주택을 양도하는 다주택자(1세대 2주택 이상)에게만 적용돼요. 비조정대상지역 주택이나 1주택자에게는 중과가 없어요.
          </p>

          <SpokeFlow steps={[
            { icon: '1', label: '주택 수 확인', sub: '2주택 이상?' },
            { icon: '2', label: '지역 확인', sub: '조정대상지역?' },
            { icon: '3', label: '유예 확인', sub: '~2026.5.9?' },
            { icon: '4', label: '세율 결정', sub: '기본 or 중과' },
          ]} />

          <TipBox title="장기보유특별공제 배제의 영향">
            <p className="mb-0 leading-relaxed">
              중과 시 세율만 올라가는 게 아니라 <strong>장기보유특별공제가 배제</strong>돼요. 10년 보유하면 최대 30%를 공제받을 수 있는데, 중과되면 이 혜택이 사라져요. 양도차익 5억원 기준으로, 공제 30% 적용 시 과세표준이 1.5억원 줄어들어요. 이것만으로도 수천만원의 세금 차이가 나요.
            </p>
          </TipBox>

          <p className="text-neutral-600 mb-4 leading-relaxed">
            세율과 공제 차이를 알았으니, 정확히 누가 중과 대상인지 정리해 볼게요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '대상',
        title: '나도 중과 대상에 해당할까?',
        desc: '중과 대상 기준과 예외 사유 확인',
        icon: 'check',
      },
    },

    /**
     * ===== S4: 중과 대상 =====
     * 시각 요소: SpokeChecklist + RateCards
     * 전환 스타일: 없음 (마지막 섹션)
     */
    {
      id: 's4',
      number: '04',
      heading: '양도세 중과 대상은 누구인가요?',
      subtitle: '조정대상지역 내 2주택 이상 보유자가 대상이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            양도세 중과 대상은 1세대가 조정대상지역 내에서 2주택 이상을 보유한 상태에서 주택을 양도하는 경우예요. 여기서 '1세대'란 배우자와 같은 주소에서 생계를 같이하는 가족을 말해요. 부부가 각각 1채씩 보유하면 1세대 2주택이에요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            다만 중과에서 제외되는 경우가 꽤 있어요. 상속받은 주택(5년 이내), 이사를 위한 일시적 2주택(3년 이내 처분), 장기임대등록 주택, 농어촌 주택 등은 중과 대상에서 빠져요. 본인이 중과 대상인지 판단하려면 주택 수, 지역, 보유 기간, 취득 사유를 종합적으로 봐야 해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            특히 주의할 점은 분양권과 입주권도 주택 수에 포함된다는 거예요. 2021년 1월 1일 이후 취득한 분양권은 주택으로 간주돼요. 오피스텔도 주거용으로 사용하면 주택 수에 들어가요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            아래 체크리스트로 본인이 중과 대상에 해당하는지 점검해 보세요.
          </p>

          <SpokeChecklist items={[
            { text: '1세대 기준으로 2주택 이상을 보유하고 있다', done: false, note: '분양권·입주권 포함' },
            { text: '양도하려는 주택이 조정대상지역에 있다', done: false, note: '서울 전역, 경기 12곳' },
            { text: '상속받은 주택이 아니다(또는 상속 후 5년 초과)', done: false, note: '상속주택 5년 이내 예외' },
            { text: '일시적 2주택 예외에 해당하지 않는다', done: false, note: '이사 목적 3년 이내 처분' },
            { text: '장기임대등록 주택이 아니다', done: false, note: '임대등록 요건 충족 시 예외' },
          ]} />

          <RateCards cards={[
            { value: '기본세율', label: '유예 기간 중', lines: ['1주택·다주택 동일', '6~45% 적용', '장특공제 가능'], highlightColor: 'emerald' },
            { value: '+20%p', label: '2주택 중과', lines: ['26~65%', '장특공제 배제', '조정지역 내 주택'],},
            { value: '+30%p', label: '3주택+ 중과', lines: ['36~75%', '장특공제 배제', '조정지역 내 주택'],},
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            중과 대상에 해당한다면 2026년 5월 9일 전에 양도를 완료하는 게 유리해요. 유예 기간 내에 기본세율로 양도하면 중과 시 대비 수천만원에서 수억원까지 세금을 아낄 수 있어요. 구체적인 매도 전략이 궁금하면 <Link href="/w/다주택-매도-순서-전략-절세" className="text-blue-600 hover:underline">다주택 매도 순서 전략</Link>을 참고하세요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '/w/다주택양도세-중과유예-세율-절세-전략',
        badge: '전체 가이드',
        title: '다주택 양도세 중과유예 절세 전략은?',
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
      question: '양도세 중과와 종합부동산세 중과는 같은 건가요?',
      answer: '다른 세금이에요. 양도세 중과는 주택을 <strong>팔 때</strong> 세율이 올라가는 거고, 종부세 중과는 주택을 <strong>보유하는 동안</strong> 매년 부과되는 세금이에요. 다주택자는 두 가지 모두 영향을 받을 수 있어요.',
    },
    {
      question: '1주택인데 분양권을 가지고 있으면 2주택인가요?',
      answer: '2021년 1월 1일 이후에 취득한 분양권은 주택 수에 포함돼요. 기존 1주택에 분양권 1개를 보유하면 2주택으로 간주될 수 있어요. 다만 일시적 2주택 예외 규정이 적용될 수 있으니 취득 시기와 처분 계획을 함께 확인하세요.',
    },
  ],

  relatedSpokes: [
    { badge: '연혁', title: '중과 유예 연혁과 종료일 확정', desc: '2022년부터 매년 연장된 유예 제도 전체 흐름', href: '/w/중과-유예-연혁-종료일-확정' },
    { badge: '계산', title: '다주택 양도세 중과 전후 세액 비교', desc: '실제 사례로 기본세율과 중과세율 세금 차이 계산', href: '/w/다주택-양도세-중과-전후-세액-비교' },
    { badge: '지역', title: '조정대상지역 목록 서울 경기', desc: '서울·경기 조정대상지역과 해제 지역 정리', href: '/w/조정대상지역-목록-서울-경기' },
    { badge: '전략', title: '다주택 매도 순서 전략 절세', desc: '어떤 집부터 팔아야 절세가 되는지 정리', href: '/w/다주택-매도-순서-전략-절세' },
  ],

  sources: [
    { name: '소득세법 제104조(세율)', url: 'https://law.go.kr/법령/소득세법/제104조', org: '국가법령정보센터' },
    { name: '양도소득세 기본정보 세율', url: 'https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2312&cntntsId=7711', org: '국세청' },
    { name: '소득세법 시행령 제167조의3', url: 'https://law.go.kr/법령/소득세법시행령/제167조의3', org: '국가법령정보센터' },
    { name: '2026년 경제정책방향', url: 'https://www.moef.go.kr', org: '기획재정부' },
  ],
}

export default data
