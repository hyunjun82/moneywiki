import Link from 'next/link'
import type { SpokeData } from './types'
import { SpokeTable, TipBox, FormulaBox, RateCards } from '@/components/spoke/SpokeBlocks'

// --- Table data ---
const SURCHARGE_RATE_ROWS = [
  ['1,400만원 이하', '6%', '36%', '-'],
  ['1,400만~5,000만원', '15%', '45%', '126만원(기본) / 없음(중과)'],
  ['5,000만~8,800만원', '24%', '54%', '576만원 / 576만원'],
  ['8,800만~1.5억원', '35%', '65%', '1,544만원 / 1,544만원'],
  ['1.5억~3억원', '38%', '68%', '1,994만원 / 1,994만원'],
  ['3억~5억원', '40%', '70%', '2,594만원 / 2,594만원'],
  ['5억~10억원', '42%', '72%', '3,594만원 / 3,594만원'],
  ['10억원 초과', '45%', '75%', '6,594만원 / 6,594만원'],
]

const CALC_EXAMPLE_ROWS = [
  ['양도가액', '10억원'],
  ['취득가액', '6억원'],
  ['필요경비', '3,000만원'],
  ['양도차익', '3억 7,000만원'],
  ['장기보유특별공제', '0원 (중과 시 배제)'],
  ['기본공제', '250만원'],
  ['과세표준', '3억 6,750만원'],
  ['기본세율 산출세액', '약 1억 2,106만원'],
  ['중과세율(+30%p) 산출세액', '약 2억 3,131만원'],
]

// --- Spoke Data ---
const data: SpokeData = {
  slug: '3주택자-양도세-중과세율-계산-비과세',

  meta: {
    title: '3주택자 양도세 중과세율 계산과 비과세 조건',
    description: '3주택자는 양도세 중과세율로 기본세율에 30%p가 추가돼요. 중과 유예 기간, 계산 방법, 비과세 조건까지 정리했어요.',
    keywords: ['3주택자 양도세', '3주택자 양도세 중과세율', '3주택자 양도세 계산', '3주택자 양도세 비과세 조건'],
    ogTitle: '3주택자 양도세 중과세율 계산과 비과세 조건 | 머니위키',
    ogDescription: '3주택 중과세율 +30%p, 유예 기간과 비과세 조건까지',
  },

  hub: {
    url: '/w/다주택자-양도세-중과-유예-2026-세율-절세',
    name: '다주택자 양도세 중과 유예 2026 세율과 절세 방법',
  },

  breadcrumb: ['세금', '3주택자 양도세'],

  hero: {
    badge: '2026년 기준',
    h1: <><span className="text-[#1E3A5F]">3주택자 양도세</span> 중과세율 계산과 비과세 조건</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          3채 이상 보유하고 있다면 양도세가 얼마나 나올지 걱정되시죠?
          <strong className="text-neutral-800"> 3주택자는 기본세율에 30%p가 추가</strong>되는 중과 대상이에요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          다행히 2026년 5월 9일까지는 <a href="https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7707&mi=2308" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">중과가 유예</a>되어 있어요. 유예 기간 활용법과 비과세 조건은 <Link href="/w/다주택자-양도세-중과-유예-2026-세율-절세" className="text-blue-600 hover:underline">다주택자 양도세 가이드</Link>에서 전체를 볼 수 있어요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '올인원',
      desc: '다주택자 양도세 중과·유예·절세 전체 가이드',
    },
  },

  toc: [
    { id: 's1', text: '3주택자도 양도세를 내야 하나요?' },
    { id: 's2', text: '3주택자 양도세 중과세율은 얼마인가요?' },
    { id: 's3', text: '3주택자 양도세는 어떻게 계산하나요?' },
    { id: 's4', text: '3주택자 양도세 비과세 조건은 뭔가요?' },
    { id: 's5', text: '자주 묻는 질문' },
  ],

  sections: [
    {
      id: 's1',
      number: '01',
      heading: '3주택자도 양도세를 내야 하나요?',
      subtitle: '3주택이면 기본적으로 중과 대상이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            네, 3주택 이상 보유자가 <strong>조정대상지역</strong> 내 주택을 팔면 양도세 중과 대상이에요.
            중과란 기본세율(6~45%)에 추가 세율을 더해서 세금을 더 많이 내는 거예요.
            3주택자는 <strong>기본세율 + 30%p</strong>가 적용돼요.
            예를 들어 기본세율이 38%인 구간이면 중과 시 68%를 내야 해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            하지만 현재 <strong>2026년 5월 9일까지 중과 유예</strong> 기간이에요.
            유예 기간 중에는 3주택자라도 기본세율만 적용되고, 장기보유특별공제도 받을 수 있어요.
            비조정대상지역 주택은 애초에 중과 대상이 아니라서 유예와 무관하게 기본세율이 적용돼요.
            어떤 주택이 조정대상지역인지는 <Link href="/w/조정대상지역-다주택자-양도세-중과세율-비과세" className="text-blue-600 hover:underline">조정대상지역 양도세 글</Link>에서 확인할 수 있어요.
          </p>

          <RateCards cards={[
            { value: '기본세율', label: '유예 기간 중', lines: ['~2026.5.9', '6~45% + 장기공제 가능'], highlight: '지금', highlightColor: 'navy' as const },
            { value: '+30%p', label: '유예 종료 후', lines: ['2026.5.10~', '최대 75% + 장기공제 배제'], highlight: '주의', highlightColor: 'orange' as const },
          ]} />

          <p className="text-neutral-600 mb-0">그렇다면 중과세율이 적용되면 실제로 얼마나 세금이 올라갈까요?</p>
        </>
      ),
      bridgeCTA: { href: '#s2', badge: '세율', title: '중과세율은 정확히 얼마?', desc: '기본세율 vs 중과세율 구간별 비교', icon: 'calc' },
    },

    {
      id: 's2',
      number: '02',
      heading: '3주택자 양도세 중과세율은 얼마인가요?',
      subtitle: '기본세율에 30%p를 더한 게 중과세율이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            3주택자의 중과세율은 과세표준 구간별 기본세율에 30%p를 더한 금액이에요.
            가장 낮은 구간(1,400만원 이하)은 6% + 30% = <strong>36%</strong>, 가장 높은 구간(10억 초과)은 45% + 30% = <strong>75%</strong>까지 올라가요.
            참고로 2주택자는 +20%p라서 3주택자보다 10%p 낮아요.
            양도 주택의 보유기간이 1년 미만이면 70%, 1~2년이면 60% 세율과 비교해서 더 큰 쪽을 내야 해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            중과세율이 적용되면 장기보유특별공제가 <strong>완전히 배제</strong>된다는 것도 큰 차이예요.
            유예 기간에는 최대 30%까지 공제받을 수 있지만, 중과 적용 시에는 0%예요.
            공제가 사라지면서 과세표준 자체가 크게 올라가니, 실질 세 부담은 세율 차이보다 훨씬 커져요.
            아래 표에서 구간별 기본세율과 중과세율을 비교해 보세요.
          </p>

          <SpokeTable
            id="tbl-surcharge"
            title="3주택자 양도세 기본세율 vs 중과세율"
            subtitle="조정대상지역 기준, 2026.5.10 이후 적용"
            headers={['과세표준', '기본세율', '중과세율(+30%p)', '누진공제(기본/중과)']}
            rows={SURCHARGE_RATE_ROWS}
            highlightCol={2}
          />

          <p className="text-neutral-600 mb-0">세율 차이가 이렇게 큰데, 실제 세금은 얼마나 차이 날까요?</p>
        </>
      ),
      bridgeCTA: { href: '#s3', badge: '계산', title: '기본세율 vs 중과, 실제 차이는?', desc: '동일 조건에서 세금 비교 계산', icon: 'calc' },
    },

    {
      id: 's3',
      number: '03',
      heading: '3주택자 양도세는 어떻게 계산하나요?',
      subtitle: '유예 기간 vs 중과 적용 시 세금 차이가 커요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            3주택자 양도세 계산도 기본 구조는 같아요. 양도차익에서 공제를 빼고 세율을 곱하면 돼요.
            다만 중과 적용 여부에 따라 <strong>장기보유특별공제 유무</strong>와 <strong>세율</strong>이 달라져서 결과가 크게 차이 나요.
            아래 예시는 10억에 팔고 6억에 산 주택(10년 보유)의 양도세를 비교한 거예요.
            유예 기간 중에는 약 1.2억인데, 중과 적용 시 약 2.3억으로 <strong>1.1억 차이</strong>가 나요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            중과 시 장기보유특별공제가 0원이 되면서 과세표준이 크게 올라가고, 거기에 높은 세율까지 적용되니 이중으로 부담이 늘어나요.
            <a href="https://hometax.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">홈택스 양도세 자동계산</a>에서 본인 상황에 맞게 계산해 볼 수 있어요.
            지방소득세(양도세의 10%)까지 합치면 실제 부담은 더 커지니 참고하세요.
          </p>

          <FormulaBox lines={[
            { text: '// 3주택자 양도세 계산 순서', comment: true },
            { text: '1. 양도차익 = 양도가 - 취득가 - 필요경비', numbered: true },
            { text: '2. 유예 중: 장기보유특별공제 적용 (최대 30%)', numbered: true },
            { text: '   중과 시: 장기보유특별공제 0원 (배제)', numbered: false },
            { text: '3. 과세표준 = 양도소득금액 - 250만원', numbered: true },
            { text: '4. 유예 중: 기본세율(6~45%) 적용', numbered: true },
            { text: '   중과 시: 기본세율 + 30%p 적용', numbered: false },
          ]} />

          <SpokeTable
            id="tbl-calc"
            title="3주택자 양도세 계산 비교"
            subtitle="10억 매도, 6억 취득, 10년 보유 기준"
            headers={['항목', '금액']}
            rows={CALC_EXAMPLE_ROWS}
            highlightCol={1}
          />

          <p className="text-neutral-600 mb-0">이렇게 세금이 크다 보니, 비과세를 받을 방법이 없는지 찾게 되죠.</p>
        </>
      ),
      bridgeCTA: { href: '#s4', badge: '비과세', title: '3주택자도 비과세가 가능할까?', desc: '주택 수 제외와 중과 배제 활용법', icon: 'info' },
    },

    {
      id: 's4',
      number: '04',
      heading: '3주택자 양도세 비과세 조건은 뭔가요?',
      subtitle: '주택 수에서 빠지는 경우를 활용하세요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            3주택자가 직접 비과세를 받기는 어렵지만, <strong>주택 수 산정에서 제외되는 주택</strong>이 있으면 가능해요.
            상속주택, 수도권 밖 기준시가 3억원 이하 주택, 장기임대 등록 주택 등은 주택 수에서 빠져요.
            예를 들어 3채 중 1채가 상속주택이면 세법상 2주택자가 되고, 일시적 2주택 비과세도 검토할 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            또한 <strong>중과 배제 대상 주택</strong>을 먼저 파는 전략도 있어요.
            수도권 밖 기준시가 3억원 이하 주택이나 장기일반민간임대주택은 중과 배제 대상이라 기본세율로 양도할 수 있어요.
            이런 주택을 먼저 정리해서 주택 수를 줄인 뒤 나머지를 파는 게 절세의 핵심이에요.
            구체적인 중과 배제 주택 종류는 <Link href="/w/다주택자-양도세-중과-배제-대상-주택-신고" className="text-blue-600 hover:underline">중과 배제 대상 주택</Link> 글에서 확인하세요.
          </p>

          <TipBox title="주택 수 줄이는 순서가 중요해요">
            <p className="mb-0 leading-relaxed">
              3채 중 어떤 주택을 먼저 파느냐에 따라 세금이 크게 달라져요.<br />
              중과 배제 대상 → 저가 주택 → 고가 주택 순서로 정리하면 전체 세 부담을 줄일 수 있어요.<br />
              세무사 상담을 통해 본인 상황에 맞는 매도 순서를 정하는 게 좋아요.
            </p>
          </TipBox>

          <FormulaBox lines={[
            { text: '// 3주택자 절세 전략 요약', comment: true },
            { text: '1. 주택 수 제외 대상 확인 (상속·임대·지방 저가)', numbered: true },
            { text: '2. 중과 배제 주택 먼저 매도 → 주택 수 줄이기', numbered: true },
            { text: '3. 유예 기간(~2026.5.9) 안에 매도 검토', numbered: true },
            { text: '4. 장기보유특별공제 극대화 (유예 중 매도)', numbered: true },
          ]} />

          <p className="text-neutral-600 mb-0">더 궁금한 점은 아래 자주 묻는 질문에서 확인해 보세요.</p>
        </>
      ),
      bridgeCTA: { href: '/w/다주택자-양도세-중과-유예-2026-세율-절세', badge: '절세 가이드', title: '다주택자 절세 전략 전체 보기', desc: '중과 유예·배제·공제 총정리', icon: 'grid', primary: true },
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
      question: '3주택자 양도세 지방소득세는 별도인가요?',
      answer: '네, 양도소득세의 <strong>10%</strong>를 지방소득세로 추가 납부해야 해요. 예를 들어 양도세가 1억이면 지방소득세 1,000만원이 더 나와요.',
    },
    {
      question: '3주택자도 유예 기간 중에 장기보유특별공제를 받을 수 있나요?',
      answer: '네, 2026년 5월 9일까지 양도하면 장기보유특별공제를 받을 수 있어요. 보유기간 3년 이상부터 연 2%씩, 최대 30%까지 공제돼요. 유예 종료 후 중과 적용 시에는 공제가 배제돼요.',
    },
  ],

  relatedSpokes: [
    { badge: '세금', title: '2주택자 양도세 비과세 조건 세율과 계산 방법', desc: '2주택자 비과세 요건과 세율 정리', href: '/w/2주택자-양도세-비과세-조건-세율-계산' },
    { badge: '세금', title: '다주택자 양도세 중과 배제 대상 주택과 신고 방법', desc: '중과에서 빠지는 주택 종류와 신고법', href: '/w/다주택자-양도세-중과-배제-대상-주택-신고' },
  ],

  sources: [
    { name: '양도소득세 세율', url: 'https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2312&cntntsId=7711', org: '국세청' },
    { name: '다주택자 세금 지식', url: 'https://www.pwc.com/kr/ko/insights/issue-brief/one-point-tax-05.html', org: '삼일PwC' },
    { name: '소득세법', url: 'https://www.law.go.kr/법령/소득세법', org: '법제처' },
  ],
}

export default data
