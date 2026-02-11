import Link from 'next/link'
import type { SpokeData } from './types'
import { FormulaBox, SpokeTable, SpokeRateBars, SpokeCompareCards, SpokeStepCards, SpokeChecklist, SpokeWarnBox, RateCards } from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '다주택-양도세-중과-전후-세액-비교',

  meta: {
    title: '다주택 양도세 중과 전후 세액 비교 계산 사례',
    description: '중과유예가 끝나면 세금이 두 배 가까이 늘어난다는 게 실감이 안 되시나요? 실제 사례로 세액 차이를 비교해 드려요',
    keywords: ['다주택 양도세 비교', '중과 세액 계산', '기본세율 중과세율 차이', '양도세 시뮬레이션'],
    ogTitle: '다주택 양도세 중과 전후 세액 비교 계산 사례 | 머니위키',
    ogDescription: '양도차익 5억원 기준으로 기본세율과 중과세율의 세금 차이를 실제 계산했어요.',
  },

  hub: {
    url: '/w/다주택양도세-중과유예-세율-절세-전략',
    name: '다주택양도세 중과유예 세율 절세 전략',
  },

  breadcrumb: ['세금', '다주택양도세 세액 비교'],

  hero: {
    badge: '2026년 기준',
    h1: <>다주택 양도세 <span className="text-[#1E3A5F]">중과 전후 세액 비교</span> — 실제 계산 사례</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          '중과되면 세금이 많이 늘어난다'는 건 알겠는데, 구체적으로 얼마나 차이 나는지 궁금하잖아요. 이 글에서는 <strong>양도차익 5억원</strong>을 기준으로 기본세율과 중과세율의 세금을 실제로 계산해서 비교해요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          중과 유예 중인 지금과, 유예가 끝난 후의 세금 차이를 숫자로 확인하면 매도 시기 결정에 확실한 기준이 될 거예요. <Link href="/w/다주택양도세-중과유예-세율-절세-전략" className="text-blue-600 hover:underline">다주택양도세 중과유예 세율 절세 전략</Link>과 함께 보세요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '다주택 양도세 중과유예 세율 절세 전략 전체 보기',
    },
  },

  toc: [
    { id: 's1', text: '중과 전후 세액 차이는 얼마나 나나요?' },
    { id: 's2', text: '양도세 계산은 어떻게 하나요?' },
    { id: 's3', text: '기본세율과 중과세율 차이는 뭔가요?' },
    { id: 's4', text: '실제 사례로 비교하면 어떤가요?' },
    { id: 's5', text: '자주 묻는 질문' },
  ],

  sections: [
    /**
     * ===== S1: 세액 차이 개요 =====
     * 시각 요소: FormulaBox + SpokeTable
     * 전환 스타일: A. 독자 대변형
     */
    {
      id: 's1',
      number: '01',
      heading: '중과 전후 세액 차이는 얼마나 나나요?',
      subtitle: '같은 주택이라도 중과 여부에 따라 세금이 1.5~2배 차이 나요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            양도차익이 5억원인 3주택자가 10년 보유한 조정대상지역 주택을 파는 경우를 예로 들어볼게요. 유예 기간(기본세율)에 팔면 장기보유특별공제 30%를 받아서 과세표준이 3.25억원이 되고, 세금은 약 1억 490만원이에요. 중과(+30%p)가 적용되면 공제 없이 과세표준 4.975억원에 70% 세율이 적용돼서 약 3억 2,230만원이에요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            차이가 약 <strong>2억 1,740만원</strong>이에요. 같은 집을 같은 가격에 파는데, 유예 기간 내냐 아니냐에 따라 2억원 넘게 세금이 달라지는 거예요. 이게 잔금일 하루 차이로 결정될 수 있어요.
          </p>

          <FormulaBox lines={[
            { text: '양도차익: 5억원', numbered: true },
            { text: '장기보유특별공제: 5억 x 30%(10년) = 1.5억원', numbered: true },
            { text: '기본공제: 250만원', numbered: true },
            { text: '과세표준: 5억 - 1.5억 - 250만 = 약 3.25억원', numbered: true },
            { text: '// 누진공제 적용: 산출세액: 3.25억 x 38% - 1,994만원 = 약 1억 490만원', numbered: true, comment: true },
          ]} />

          <SpokeTable id="compare-overview" title="유예 vs 중과 세액 비교(3주택, 양도차익 5억, 10년 보유)" subtitle="2026년 기준" headers={['항목', '유예(기본세율)', '중과(+30%p)']} rows={[
            ['양도차익', '5억원', '5억원'],
            ['장기보유특별공제', '1.5억원(30%)', '0원(배제)'],
            ['기본공제', '250만원', '250만원'],
            ['과세표준', '약 3.25억원', '약 4.975억원'],
            ['적용 세율', '38%', '70%'],
            ['산출세액', '약 1억 490만원', '약 3억 2,230만원'],
            ['차이', '', '약 +2억 1,740만원'],
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            숫자를 직접 보니까 차이가 실감이 나잖아요. 이 계산이 어떻게 나오는지 단계별로 풀어볼게요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '계산법',
        title: '양도세 계산 단계가 궁금하다면?',
        desc: '양도세 계산 순서를 단계별로 확인',
        icon: 'calc',
      },
    },

    /**
     * ===== S2: 계산 방법 =====
     * 시각 요소: SpokeRateBars + SpokeCompareCards
     * 전환 스타일: D. 화제 전환형
     */
    {
      id: 's2',
      number: '02',
      heading: '양도세 계산은 어떻게 하나요?',
      subtitle: '양도차익 → 공제 → 과세표준 → 세율 적용 순서예요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            양도소득세 계산은 크게 4단계로 이루어져요. 먼저 양도가액에서 취득가액과 필요경비를 빼서 양도차익을 구해요. 그다음 장기보유특별공제와 기본공제(250만원)를 빼서 과세표준을 구하고, 여기에 세율을 곱해서 산출세액을 계산해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            중과가 적용되면 두 가지가 달라져요. 첫째, 장기보유특별공제가 배제돼서 과세표준이 훨씬 커져요. 둘째, 세율 자체가 기본세율에 20~30%p가 추가돼요. 이 두 가지가 동시에 작용하기 때문에 세금 차이가 배 이상 나는 거예요.
          </p>

          <SpokeRateBars bars={[
            { label: '양도차익', rate: '5억원', width: '100%' },
            { label: '유예: 공제 후 과세표준', rate: '3.25억원', width: '65%' },
            { label: '중과: 공제 없이 과세표준', rate: '4.975억원', width: '100%' },
            { label: '유예: 산출세액', rate: '1.05억원', width: '33%' },
            { label: '중과: 산출세액', rate: '3.22억원', width: '100%' },
          ]} />

          <SpokeCompareCards
            cards={[
              { title: '유예 시(기본세율)', subtitle: '', items: ['양도차익: 5억원', '장특공제: -1.5억(30%)', '기본공제: -250만원', '과세표준: 3.25억원', '세율: 38%', '세액: 약 1.05억원'] },
              { title: '중과 시(+30%p)', subtitle: '', items: ['양도차익: 5억원', '장특공제: 0원(배제)', '기본공제: -250만원', '과세표준: 4.975억원', '세율: 70%', '세액: 약 3.22억원'] }
            ]}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            결국 '공제 배제 + 세율 인상'이 동시에 일어나서 세금이 기하급수적으로 늘어나는 구조예요.
          </p>

          <p className="text-neutral-600 mb-4 leading-relaxed">
            그런데 2주택자와 3주택자는 추가세율이 다르니까, 주택 수에 따른 차이도 살펴볼 필요가 있어요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '주택 수별',
        title: '2주택과 3주택의 세금 차이는?',
        desc: '주택 수에 따른 중과세율 차이 확인',
        icon: 'calc',
      },
    },

    /**
     * ===== S3: 기본 vs 중과 차이 =====
     * 시각 요소: SpokeStepCards + SpokeChecklist
     * 전환 스타일: C. 간결 연결형
     */
    {
      id: 's3',
      number: '03',
      heading: '기본세율과 중과세율 차이는 뭔가요?',
      subtitle: '2주택은 +20%p, 3주택은 +30%p에 장특공제 배제까지 겹쳐요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            기본세율과 중과세율의 차이는 단순히 세율 몇 퍼센트 차이가 아니에요. 장기보유특별공제 배제까지 겹치면 실질 세금 차이가 세율 차이보다 훨씬 더 커져요. 2주택자는 기본세율에 20%p, 3주택자는 30%p가 추가되고, 두 경우 모두 장특공제가 배제돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            예를 들어 양도차익 5억원에 10년 보유한 경우, 유예 중에는 장특공제 30%를 빼서 과세표준이 3.25억원이에요. 2주택 중과 시에는 공제 없이 4.975억원에 60%, 3주택 중과 시에는 같은 4.975억원에 70%가 적용돼요.
          </p>

          <SpokeStepCards steps={[
            { title: '1단계: 양도차익 확인', desc: '양도가액 - 취득가액 - 필요경비 = 5억원', tip: '필요경비: 취득세, 중개수수료, 인테리어 등' },
            { title: '2단계: 공제 적용', desc: '유예 시 장특공제 30%(1.5억) 적용, 중과 시 0원', tip: '기본공제 250만원은 동일 적용' },
            { title: '3단계: 세율 적용', desc: '유예 38%, 2주택 중과 60%, 3주택 중과 70%', tip: '과세표준 구간별 누진세' },
            { title: '4단계: 세액 산출', desc: '유예 1.05억, 2주택 2.46억, 3주택 3.22억', tip: '지방소득세 10% 별도' },
          ]} />

          <SpokeChecklist items={[
            { text: '세율 자체가 20~30%p 추가', done: true, note: '직접 영향' },
            { text: '장기보유특별공제(최대 30%) 배제', done: true, note: '과세표준 증가' },
            { text: '과세표준이 커지면서 더 높은 누진구간 적용', done: true, note: '복합 영향' },
            { text: '지방소득세도 산출세액의 10%로 함께 증가', done: true, note: '부수 영향' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            이론적인 차이를 알았으니, 좀 더 현실적인 사례로 비교해 볼게요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '사례',
        title: '실제 사례로 얼마나 차이 날까?',
        desc: '양도차익 3억, 5억, 10억 사례 비교',
        icon: 'calc',
      },
    },

    /**
     * ===== S4: 실제 사례 비교 =====
     * 시각 요소: SpokeWarnBox + RateCards
     * 전환 스타일: 없음 (마지막)
     */
    {
      id: 's4',
      number: '04',
      heading: '실제 사례로 비교하면 어떤가요?',
      subtitle: '양도차익 규모별로 세금 차이를 비교했어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            양도차익 규모에 따라 중과의 영향이 얼마나 달라지는지 3가지 사례로 비교했어요. 모두 3주택자, 10년 보유, 조정대상지역 주택 양도를 기준으로 했어요. 장기보유특별공제 30%가 유예 시에만 적용돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            양도차익이 3억원이면 유예 시 약 5,400만원, 중과 시 약 1억 6,400만원으로 약 1억 1,000만원 차이가 나요. 양도차익이 10억원이면 유예 시 약 2억 6,200만원, 중과 시 약 6억 6,400만원으로 약 4억원 차이가 나요. 양도차익이 클수록 차이가 기하급수적으로 커져요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            이 계산에는 지방소득세(산출세액의 10%)가 포함되지 않았어요. 지방소득세까지 합치면 실제 납부액은 위 금액보다 10% 더 커요.
          </p>

          <SpokeWarnBox title="주의사항">
            <p className="mb-2 leading-relaxed">
              양도차익 10억원, 3주택 중과 시 산출세액만 약 6.6억원이에요. 여기에 지방소득세 10%를 더하면 약 7.3억원을 세금으로 내야 해요. 유예 기간에 팔면 약 2.9억원이니까, <strong>4억원 이상</strong>을 아낄 수 있는 거예요. 양도차익이 클수록 유예 기간 내 양도가 절대적으로 유리해요.
            </p>
          </SpokeWarnBox>

          <RateCards cards={[
            { value: '3억원', label: '양도차익', lines: ['유예: 약 5,400만원', '중과: 약 1.64억원', '차이: 약 1.1억원'] },
            { value: '5억원', label: '양도차익', lines: ['유예: 약 1.05억원', '중과: 약 3.22억원', '차이: 약 2.17억원'], highlightColor: 'navy' },
            { value: '10억원', label: '양도차익', lines: ['유예: 약 2.62억원', '중과: 약 6.64억원', '차이: 약 4.02억원'] },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            세액 비교를 통해 유예 기간 내 양도가 얼마나 중요한지 확인했어요. 구체적인 매도 순서와 전략이 궁금하면 <Link href="/w/다주택-매도-순서-전략-절세" className="text-blue-600 hover:underline">다주택 매도 순서 전략</Link>을, 증여와 양도 중 어떤 게 유리한지 비교하려면 <Link href="/w/다주택-증여-양도-비교-부담부증여" className="text-blue-600 hover:underline">증여 vs 양도 비교</Link>를 참고하세요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '/w/다주택양도세-중과유예-세율-절세-전략',
        badge: '전체 가이드',
        title: '다주택 양도세 절세 전략 전체 보기',
        desc: '유예 기간 활용법과 매도 전략까지 확인하기',
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
      question: '지방소득세는 별도로 내야 하나요?',
      answer: '네, 양도소득세 산출세액의 10%를 지방소득세로 별도 납부해야 해요. 예를 들어 산출세액이 1억원이면 지방소득세 1,000만원이 추가돼요. 양도세 신고 시 함께 신고하고, 관할 시·군·구에 납부해요.',
    },
    {
      question: '필요경비에는 뭐가 포함되나요?',
      answer: '취득 시 낸 취득세, 중개수수료, 법무사 비용과 보유 중 지출한 자본적 지출(인테리어, 발코니 확장 등)이 필요경비예요. 수선유지비(도배, 장판 등)는 인정되지 않아요. 필요경비가 클수록 양도차익이 줄어서 세금이 줄어요.',
    },
  ],

  relatedSpokes: [
    { badge: '개념', title: '양도세 중과 뜻 기본세율 중과세율 비교', desc: '기본세율과 중과세율 차이 한눈에 비교', href: '/w/양도세-중과-뜻-기본세율-중과세율-비교' },
    { badge: '전략', title: '다주택 매도 순서 전략 절세', desc: '어떤 집부터 팔아야 절세가 되는지 정리', href: '/w/다주택-매도-순서-전략-절세' },
    { badge: '시기', title: '양도세 잔금일 기준 계약일 판단', desc: '잔금일과 계약일 중 뭐가 기준인지 확인', href: '/w/양도세-잔금일-기준-계약일-판단' },
    { badge: '증여', title: '다주택 증여 양도 비교 부담부증여', desc: '증여와 양도 중 뭐가 유리한지 비교', href: '/w/다주택-증여-양도-비교-부담부증여' },
  ],

  sources: [
    { name: '소득세법 제104조(세율)', url: 'https://law.go.kr/법령/소득세법/제104조', org: '국가법령정보센터' },
    { name: '양도소득세 계산기', url: 'https://xn--989a00af8jnslv3dba.com/transfer', org: '부동산계산기' },
    { name: '양도소득세 기본정보', url: 'https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2312&cntntsId=7711', org: '국세청' },
    { name: '소득세법 시행령 제167조의3', url: 'https://law.go.kr/법령/소득세법시행령/제167조의3', org: '국가법령정보센터' },
  ],
}

export default data
