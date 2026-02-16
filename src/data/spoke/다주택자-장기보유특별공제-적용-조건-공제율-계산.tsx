import Link from 'next/link'
import type { SpokeData } from './types'
import { SpokeTable, TipBox, FormulaBox, RateCards } from '@/components/spoke/SpokeBlocks'

// --- Table data ---
const GENERAL_RATE_ROWS = [
  ['3년', '6%'],
  ['4년', '8%'],
  ['5년', '10%'],
  ['6년', '12%'],
  ['7년', '14%'],
  ['8년', '16%'],
  ['9년', '18%'],
  ['10년', '20%'],
  ['11년', '22%'],
  ['12년', '24%'],
  ['13년', '26%'],
  ['14년', '28%'],
  ['15년 이상', '30% (최대)'],
]

const ONE_HOUSE_ROWS = [
  ['3년', '12%', '-'],
  ['4년', '16%', '8%'],
  ['5년', '20%', '12%'],
  ['6년', '24%', '16%'],
  ['7년', '28%', '20%'],
  ['8년', '32%', '24%'],
  ['9년', '36%', '28%'],
  ['10년', '40% (최대)', '32%'],
  ['11년 이상', '40%', '36%'],
  ['12년 이상', '40%', '40% (최대)'],
]

// --- Spoke Data ---
const data: SpokeData = {
  slug: '다주택자-장기보유특별공제-적용-조건-공제율-계산',

  meta: {
    title: '다주택자 장기보유특별공제 적용 조건 공제율과 계산',
    description: '다주택자도 유예 기간 중이면 장기보유특별공제를 받을 수 있어요. 적용 조건, 보유기간별 공제율, 계산 예시까지 정리했어요.',
    keywords: ['다주택자 장기보유특별공제', '장기보유특별공제 적용 조건', '장기보유특별공제 공제율', '장기보유특별공제 계산'],
    ogTitle: '다주택자 장기보유특별공제 적용 조건 공제율과 계산 | 머니위키',
    ogDescription: '보유기간별 공제율, 1주택 vs 다주택 비교, 계산 예시',
  },

  hub: {
    url: '/w/다주택양도세-중과유예-세율-절세-전략',
    name: '다주택자 양도세 중과 유예 2026 세율과 절세 방법',
  },

  breadcrumb: ['세금', '장기보유특별공제'],

  hero: {
    badge: '2026년 기준',
    h1: <>다주택자 <span className="text-[#1E3A5F]">장기보유특별공제</span> 적용 조건 공제율과 계산</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          오래 보유한 주택을 팔 때 세금을 깎아주는 장기보유특별공제, 다주택자도 받을 수 있을까요?
          <strong className="text-neutral-800"> 유예 기간(~2026.5.9) 중이라면 다주택자도 최대 30%까지 공제</strong>받을 수 있어요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          <a href="https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2311&cntntsId=7710" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">국세청 장기보유특별공제율표</a>를 기준으로 조건, 공제율, 계산 방법까지 정리했어요.
          다주택자 절세 전략 전체는 <Link href="/w/다주택양도세-중과유예-세율-절세-전략" className="text-blue-600 hover:underline">다주택자 양도세 가이드</Link>에서 확인하세요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '올인원',
      desc: '다주택자 양도세 중과·유예·절세 전체 가이드',
    },
  },

  toc: [
    { id: 's1', text: '다주택자 장기보유특별공제가 뭔가요?' },
    { id: 's2', text: '장기보유특별공제 적용 조건은 어떻게 되나요?' },
    { id: 's3', text: '장기보유특별공제 공제율은 얼마인가요?' },
    { id: 's4', text: '장기보유특별공제 계산은 어떻게 하나요?' },
    { id: 's5', text: '자주 묻는 질문' },
  ],

  sections: [
    {
      id: 's1',
      number: '01',
      heading: '다주택자 장기보유특별공제가 뭔가요?',
      subtitle: '오래 보유할수록 양도차익에서 빼주는 공제예요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            장기보유특별공제(장특공제)는 부동산을 <strong>3년 이상 보유</strong>하고 팔 때 양도차익에서 일정 비율을 빼주는 제도예요.
            보유 기간이 길수록 공제율이 올라가서, 세금을 크게 줄일 수 있어요.
            쉽게 말해 &lsquo;오래 갖고 있다가 파는 건 투기가 아니니까 세금을 깎아줄게&rsquo;라는 취지예요.
            1세대 1주택자는 최대 80%까지 공제받을 수 있고, 일반(다주택 포함)은 최대 30%까지 가능해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            문제는 <strong>다주택자에게 중과세율이 적용되면 이 공제가 완전히 배제</strong>된다는 거예요.
            하지만 현재 2026년 5월 9일까지 중과가 유예되어 있어서, 유예 기간 중에 양도하면 다주택자도 장특공제를 받을 수 있어요.
            유예 기간이 절세의 핵심인 이유가 바로 여기에 있어요.
            세율 차이뿐 아니라 공제 유무까지 달라지거든요.
          </p>

          <RateCards cards={[
            { value: '최대 30%', label: '유예 기간 중', lines: ['~2026.5.9', '보유 15년 이상'], highlight: '가능', highlightColor: 'navy' as const },
            { value: '0%', label: '중과 적용 시', lines: ['2026.5.10~', '장특공제 배제'], highlight: '불가', highlightColor: 'orange' as const },
            { value: '최대 80%', label: '1세대 1주택', lines: ['보유 40% + 거주 40%', '고가주택 초과분'], active: true },
          ]} />

          <p className="text-neutral-600 mb-0">정확한 적용 조건을 자세히 알아볼까요?</p>
        </>
      ),
      bridgeCTA: { href: '#s2', badge: '조건', title: '장특공제 받으려면 뭐가 필요할까?', desc: '적용 요건과 배제 사유 확인', icon: 'info' },
    },

    {
      id: 's2',
      number: '02',
      heading: '장기보유특별공제 적용 조건은 어떻게 되나요?',
      subtitle: '보유기간 3년 이상이 기본이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            장기보유특별공제를 받으려면 해당 주택을 <strong>3년 이상 보유</strong>해야 해요.
            보유기간은 취득일(잔금일 또는 등기이전일 중 빠른 날)부터 양도일까지 계산해요.
            일반 주택(다주택 포함)은 보유기간만 보지만, 1세대 1주택 고가주택(12억 초과)은 <strong>보유기간 + 거주기간</strong>을 함께 봐요.
            보유 3년 미만이면 장특공제를 아예 받을 수 없어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            다주택자의 경우 가장 중요한 건 <strong>중과 유예 기간 내 양도 여부</strong>예요.
            유예 기간(~2026.5.9)에 양도하면 다주택자도 장특공제를 받을 수 있어요.
            유예 종료 후 중과세율이 적용되면 조정대상지역 주택에 대해서는 장특공제가 <strong>완전 배제</strong>돼요.
            비조정대상지역 주택은 중과 대상이 아니므로 유예 여부와 상관없이 공제를 받을 수 있어요.
          </p>

          <FormulaBox lines={[
            { text: '// 장특공제 적용 조건 체크', comment: true },
            { text: '1. 보유기간 3년 이상인가?', numbered: true },
            { text: '2. 유예 기간(~2026.5.9) 중 양도인가?', numbered: true },
            { text: '   → YES: 다주택자도 장특공제 가능', numbered: false },
            { text: '   → NO: 조정지역 중과 대상이면 공제 배제', numbered: false },
            { text: '3. 1세대 1주택이면 거주기간도 확인', numbered: true },
          ]} />

          <TipBox title="미등기 양도는 장특공제가 안 돼요">
            <p className="mb-0 leading-relaxed">
              취득 후 등기를 하지 않은 상태에서 양도하면(미등기 양도) 장특공제를 받을 수 없어요.<br />
              이 경우 70% 단일세율이 적용되니 반드시 등기 후 양도하세요.
            </p>
          </TipBox>

          <p className="text-neutral-600 mb-0">그렇다면 보유기간에 따라 공제율이 얼마나 되는지 볼까요?</p>
        </>
      ),
      bridgeCTA: { href: '#s3', badge: '공제율', title: '몇 년 보유하면 얼마나 공제될까?', desc: '연차별 공제율 비교표 확인', icon: 'calc' },
    },

    {
      id: 's3',
      number: '03',
      heading: '장기보유특별공제 공제율은 얼마인가요?',
      subtitle: '일반 최대 30%, 1세대 1주택 최대 80%예요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            공제율은 <strong>일반(다주택 포함)</strong>과 <strong>1세대 1주택</strong>으로 나뉘어요.
            일반은 보유기간 3년부터 연 2%씩 올라서 15년 이상 보유하면 최대 30%예요.
            1세대 1주택(고가주택 초과분)은 보유기간 공제(연 4%, 최대 40%) + 거주기간 공제(연 4%, 최대 40%)를 합산해서 <strong>최대 80%</strong>까지 가능해요.
            다주택자가 유예 기간 중에 양도하면 일반 공제율(최대 30%)이 적용돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            예를 들어 10년 보유한 다주택자가 유예 기간에 양도하면 양도차익의 20%를 공제받을 수 있어요.
            양도차익이 3억이라면 6,000만원이 빠지는 거예요. 세금으로 따지면 수천만원 차이가 나요.
            아래 표에서 연차별 공제율을 확인하세요. 1세대 1주택 공제율은 비교용으로 함께 정리했어요.
          </p>

          <SpokeTable
            id="tbl-general"
            title="일반(다주택) 장기보유특별공제율"
            subtitle="보유기간 기준, 유예 기간 중 적용"
            headers={['보유기간', '공제율']}
            rows={GENERAL_RATE_ROWS}
            highlightCol={1}
          />

          <SpokeTable
            id="tbl-one"
            title="1세대 1주택 장기보유특별공제율 (참고)"
            subtitle="고가주택(12억 초과) 초과분에 적용"
            headers={['보유기간', '보유 공제율', '거주 공제율']}
            rows={ONE_HOUSE_ROWS}
            highlightCol={1}
          />

          <p className="text-neutral-600 mb-0">공제율을 알았으니, 실제 세금이 얼마나 줄어드는지 계산해 볼까요?</p>
        </>
      ),
      bridgeCTA: { href: '#s4', badge: '계산', title: '장특공제로 세금이 얼마나 줄까?', desc: '유예 기간 vs 중과 적용 시 비교', icon: 'calc' },
    },

    {
      id: 's4',
      number: '04',
      heading: '장기보유특별공제 계산은 어떻게 하나요?',
      subtitle: '양도차익에 공제율을 곱하면 돼요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            계산은 간단해요. <strong>양도차익 x 공제율 = 장기보유특별공제 금액</strong>이에요.
            예를 들어 양도차익이 3억원이고 10년 보유(공제율 20%)라면, 3억 x 20% = 6,000만원이 공제돼요.
            이 6,000만원을 양도차익에서 빼면 양도소득금액이 2억 4,000만원이 되고, 여기에 세율을 적용해요.
            공제가 없는 경우(중과 시)와 비교하면 과세표준 자체가 달라지니 세금 차이가 크죠.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            실제로 양도차익 3억원, 10년 보유 2주택자가 유예 기간에 팔 때와 중과 적용 시를 비교하면, 세금 차이가 <strong>약 7,000만원 이상</strong> 벌어져요.
            장특공제 6,000만원 자체에 세율을 곱한 만큼의 세금이 줄어들고, 중과 시 세율까지 높아지니 이중으로 불리해져요.
            <a href="https://hometax.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">홈택스 자동계산기</a>에서 본인 상황을 직접 계산해 보세요.
          </p>

          <FormulaBox lines={[
            { text: '// 장특공제 계산 예시 (2주택, 10년 보유, 유예 중)', comment: true },
            { text: '양도차익: 3억원', numbered: false },
            { text: '장기보유특별공제: 3억 × 20% = 6,000만원', numbered: false },
            { text: '양도소득금액: 3억 - 6,000만 = 2억 4,000만원', numbered: false },
            { text: '과세표준: 2.4억 - 250만 = 2억 3,750만원', numbered: false },
            { text: '산출세액: 약 7,030만원 (38% 구간)', numbered: false },
            { text: '', numbered: false },
            { text: '// 중과 적용 시 (장특공제 0원, +20%p)', comment: true },
            { text: '과세표준: 3억 - 250만 = 2억 9,750만원', numbered: false },
            { text: '산출세액: 약 1억 5,283만원 (58% 구간)', numbered: false },
            { text: '→ 차이: 약 8,253만원', numbered: false },
          ]} />

          <TipBox title="보유기간이 길수록 유리해요">
            <p className="mb-0 leading-relaxed">
              같은 양도차익이라도 보유기간이 10년(20%)이냐 15년(30%)이냐에 따라 공제액이 크게 달라져요.<br />
              유예 기간이 끝나기 전에 팔 계획이라면, 보유기간이 가장 긴 주택부터 매도를 검토하세요.<br />
              보유 1년이 더 늘면 공제율이 2%p 오르니, 매도 시기를 약간 미루는 것도 방법이에요.
            </p>
          </TipBox>

          <p className="text-neutral-600 mb-0">더 궁금한 점은 아래 자주 묻는 질문에서 확인하세요.</p>
        </>
      ),
      bridgeCTA: { href: '/w/다주택양도세-중과유예-세율-절세-전략', badge: '절세 가이드', title: '다주택자 절세 전략 전체 보기', desc: '중과 유예·배제·공제 총정리', icon: 'grid', primary: true },
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
      question: '장기보유특별공제와 기본공제(250만원)는 같은 건가요?',
      answer: '다른 거예요. 장기보유특별공제는 양도차익에서 빼는 거고, 기본공제 250만원은 양도소득금액에서 추가로 빼는 거예요. 둘 다 적용되니 합쳐서 공제받을 수 있어요.',
    },
    {
      question: '토지나 상가에도 장기보유특별공제가 적용되나요?',
      answer: '네, 토지와 상가(건물)도 3년 이상 보유하면 장기보유특별공제를 받을 수 있어요. 공제율은 일반 부동산 기준(연 2%, 최대 30%)이 적용돼요. 1세대 1주택 특례(최대 80%)는 주택에만 해당해요.',
    },
  ],

  relatedSpokes: [
    { badge: '세금', title: '2주택자 양도세 비과세 조건 세율과 계산 방법', desc: '2주택자 세율과 계산 예시', href: '/w/2주택자-양도세-비과세-조건-세율-계산' },
    { badge: '세금', title: '3주택자 양도세 중과세율 계산과 비과세 조건', desc: '3주택 중과세율과 절세 방법', href: '/w/3주택자-양도세-중과세율-계산-비과세' },
  ],

  sources: [
    { name: '장기보유특별공제율', url: 'https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2311&cntntsId=7710', org: '국세청' },
    { name: '소득세법', url: 'https://www.law.go.kr/법령/소득세법', org: '법제처' },
    { name: '장기보유특별공제 안내', url: 'https://www.heumtax.com/contents/posts/long-term-holding-deduction', org: '흠세무' },
  ],
}

export default data
