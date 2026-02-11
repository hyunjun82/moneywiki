import Link from 'next/link'
import type { SpokeData } from './types'
import { SpokeTable, TipBox, FormulaBox, RateCards } from '@/components/spoke/SpokeBlocks'

// --- Table data ---
const BASIC_RATE_ROWS = [
  ['1,400만원 이하', '6%', '-'],
  ['1,400만~5,000만원', '15%', '126만원'],
  ['5,000만~8,800만원', '24%', '576만원'],
  ['8,800만~1.5억원', '35%', '1,544만원'],
  ['1.5억~3억원', '38%', '1,994만원'],
  ['3억~5억원', '40%', '2,594만원'],
  ['5억~10억원', '42%', '3,594만원'],
  ['10억원 초과', '45%', '6,594만원'],
]

const CALC_EXAMPLE_ROWS = [
  ['양도가액', '8억원', '매매 계약서 기준'],
  ['취득가액', '5억원', '매매 계약서 기준'],
  ['필요경비', '2,000만원', '취득세, 중개보수 등'],
  ['양도차익', '2억 8,000만원', '8억 - 5억 - 2,000만'],
  ['장기보유특별공제', '5,600만원', '10년 보유 × 20%'],
  ['양도소득금액', '2억 2,400만원', '2.8억 - 5,600만'],
  ['기본공제', '250만원', '연 1회'],
  ['과세표준', '2억 2,150만원', '최종 과세 기준'],
  ['산출세액', '약 6,423만원', '38% 구간 적용'],
]

// --- Spoke Data ---
const data: SpokeData = {
  slug: '2주택자-양도세-비과세-조건-세율-계산',

  meta: {
    title: '2주택자 양도세 비과세 조건 세율과 계산 방법',
    description: '2주택자도 조건만 맞으면 양도세 비과세를 받을 수 있어요. 일시적 2주택 비과세 요건, 세율, 계산 방법까지 정리했어요.',
    keywords: ['2주택자 양도세', '2주택자 양도세 비과세 조건', '2주택자 양도세 세율', '2주택자 양도세 계산 방법'],
    ogTitle: '2주택자 양도세 비과세 조건 세율과 계산 방법 | 머니위키',
    ogDescription: '일시적 2주택 비과세 조건, 세율, 계산까지 한 번에',
  },

  hub: {
    url: '/w/다주택자-양도세-중과-유예-2026-세율-절세',
    name: '다주택자 양도세 중과 유예 2026 세율과 절세 방법',
  },

  breadcrumb: ['세금', '2주택자 양도세'],

  hero: {
    badge: '2026년 기준',
    h1: <><span className="text-[#1E3A5F]">2주택자 양도세</span> 비과세 조건 세율과 계산 방법</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          집을 한 채 더 샀는데 양도세가 걱정되시죠?
          <strong className="text-neutral-800"> 2주택자라도 조건만 맞으면 양도세를 한 푼도 안 낼 수 있어요.</strong>
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          <a href="https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7707&mi=2308" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">국세청</a>에서 안내하는 비과세 요건부터 세율, 실제 계산 예시까지 한 번에 정리했어요.
          전체 절세 전략은 <Link href="/w/다주택자-양도세-중과-유예-2026-세율-절세" className="text-blue-600 hover:underline">다주택자 양도세 중과 유예 가이드</Link>에 모아뒀어요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '올인원',
      desc: '다주택자 양도세 중과·유예·절세 전체 가이드',
    },
  },

  toc: [
    { id: 's1', text: '2주택자도 양도세를 내야 하나요?' },
    { id: 's2', text: '2주택자 양도세 비과세 조건은 뭔가요?' },
    { id: 's3', text: '2주택자 양도세 세율은 얼마인가요?' },
    { id: 's4', text: '2주택자 양도세 계산 방법은 뭔가요?' },
    { id: 's5', text: '자주 묻는 질문' },
  ],

  sections: [
    {
      id: 's1',
      number: '01',
      heading: '2주택자도 양도세를 내야 하나요?',
      subtitle: '2주택이면 무조건 양도세를 내는 건 아니에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            결론부터 말하면, 2주택자도 <strong>반드시</strong> 양도세를 내는 건 아니에요.
            비과세 요건을 충족하면 양도세가 0원이 될 수 있어요.
            대표적인 게 바로 <strong>일시적 1세대 2주택 특례</strong>예요.
            이사를 위해 새 집을 먼저 사고, 기존 집을 일정 기간 내에 팔면 비과세를 받을 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            다만 비과세 대상이 아닌 경우에는 <a href="https://www.law.go.kr/법령/소득세법" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">소득세법</a>에 따라 양도차익에 대해 세금을 내야 해요.
            2026년 5월 9일까지는 다주택자 양도세 중과가 유예되어 있어서, 조정대상지역 주택이라도 <strong>기본세율(6~45%)</strong>만 적용돼요.
            유예 기간이 지나면 2주택자는 기본세율에 20%p가 추가되니, 시기도 중요해요.
          </p>

          <RateCards cards={[
            { value: '비과세', label: '일시적 2주택', lines: ['3년 내 종전주택 처분', '비과세 조건 충족'], highlight: '0원', highlightColor: 'navy' as const },
            { value: '기본세율', label: '유예 기간 중', lines: ['~2026.5.9까지', '6~45% 적용'], active: true },
            { value: '+20%p', label: '유예 종료 후', lines: ['2026.5.10 이후', '중과세율 적용'], highlight: '주의', highlightColor: 'orange' as const },
          ]} />

          <p className="text-neutral-600 mb-0">그렇다면 비과세를 받으려면 구체적으로 어떤 조건을 갖춰야 할까요?</p>
        </>
      ),
      bridgeCTA: { href: '#s2', badge: '비과세', title: '양도세 0원이 되는 조건은?', desc: '일시적 2주택 비과세 요건 총정리', icon: 'info' },
    },

    {
      id: 's2',
      number: '02',
      heading: '2주택자 양도세 비과세 조건은 뭔가요?',
      subtitle: '일시적 2주택 특례가 핵심이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            2주택자가 양도세 비과세를 받는 가장 대표적인 방법은 <strong>일시적 1세대 2주택 특례</strong>예요.
            종전 주택을 1년 이상 보유한 상태에서 새 주택을 취득하고, 새 주택을 산 날부터 <strong>3년 이내에 종전 주택을 매도</strong>하면 비과세가 적용돼요.
            이전에는 조정대상지역은 2년이었지만, 2023년부터 지역 구분 없이 3년으로 통일됐어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            여기서 중요한 건 <strong>1세대 1주택 비과세 요건</strong>도 함께 충족해야 한다는 거예요.
            종전 주택을 2년 이상 보유(조정대상지역은 2년 거주 포함)해야 비과세가 돼요.
            또한 양도가액이 12억원을 초과하면 초과분에 대해서만 과세되는 고가주택 기준도 적용돼요.
            이 조건들을 하나라도 놓치면 비과세가 안 되니 꼼꼼히 확인해야 해요.
          </p>

          <FormulaBox lines={[
            { text: '// 일시적 2주택 비과세 요건 체크리스트', comment: true },
            { text: '1. 종전주택 보유 1년 이상 후 신규주택 취득', numbered: true },
            { text: '2. 신규주택 취득일부터 3년 이내 종전주택 매도', numbered: true },
            { text: '3. 종전주택 2년 이상 보유 (조정지역은 2년 거주 포함)', numbered: true },
            { text: '4. 양도가액 12억원 이하 → 전액 비과세', numbered: true },
            { text: '5. 양도가액 12억원 초과 → 초과분만 과세', numbered: true },
          ]} />

          <TipBox title="상속·증여로 2주택이 된 경우는?">
            <p className="mb-0 leading-relaxed">
              상속으로 주택을 물려받아 2주택이 된 경우에는 상속주택을 주택 수에서 제외해요.<br />
              기존 1주택을 팔 때 1세대 1주택 비과세가 그대로 적용돼요.<br />
              다만 증여로 받은 주택은 주택 수에 포함되니 주의하세요.
            </p>
          </TipBox>

          <p className="text-neutral-600 mb-0">비과세가 안 되는 경우에는 세율이 얼마나 적용될까요?</p>
        </>
      ),
      bridgeCTA: { href: '#s3', badge: '세율', title: '비과세가 안 되면 세금이 얼마?', desc: '2주택자 양도세 세율 구간별 정리', icon: 'calc' },
    },

    {
      id: 's3',
      number: '03',
      heading: '2주택자 양도세 세율은 얼마인가요?',
      subtitle: '유예 기간이냐 아니냐에 따라 달라져요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            2주택자가 비과세 조건에 해당하지 않으면 양도차익에 대해 세금을 내야 해요.
            현재는 <strong>2026년 5월 9일까지 중과 유예</strong> 중이라, 조정대상지역 주택이라도 기본세율(6~45%)만 적용돼요.
            하지만 유예가 끝나는 2026년 5월 10일부터는 기본세율에 <strong>20%p가 추가</strong>되어 최대 65%까지 올라가요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            비조정대상지역 주택은 중과 대상이 아니라서 유예 여부와 상관없이 기본세율이 적용돼요.
            또한 보유기간이 1년 미만이면 70%, 1~2년이면 60%의 단기 양도세율이 적용되는데, 중과세율과 비교해서 더 큰 쪽을 내야 해요.
            <a href="https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2312&cntntsId=7711" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">국세청 양도소득세 세율표</a>에서 정확한 구간을 확인할 수 있어요.
          </p>

          <SpokeTable
            id="tbl-rate"
            title="양도소득세 기본세율표"
            subtitle="2026년 기준, 과세표준 구간별"
            headers={['과세표준', '세율', '누진공제']}
            rows={BASIC_RATE_ROWS}
            highlightCol={1}
          />

          <p className="text-neutral-600 mb-0">세율을 알았으니, 이제 실제로 얼마를 내는지 계산해 볼까요?</p>
        </>
      ),
      bridgeCTA: { href: '#s4', badge: '계산', title: '내 양도세는 얼마일까?', desc: '실제 숫자로 계산 예시 확인', icon: 'calc' },
    },

    {
      id: 's4',
      number: '04',
      heading: '2주택자 양도세 계산 방법은 뭔가요?',
      subtitle: '양도차익에서 공제 빼고 세율 곱하면 돼요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            양도세 계산은 생각보다 단계가 많지만, 순서대로 따라가면 어렵지 않아요.
            먼저 양도가액에서 취득가액과 필요경비를 빼서 <strong>양도차익</strong>을 구해요.
            거기서 장기보유특별공제와 기본공제(250만원)를 빼면 <strong>과세표준</strong>이 나오고, 여기에 세율을 적용하면 최종 세액이 나와요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            2주택자도 유예 기간 중에는 장기보유특별공제를 받을 수 있어요. 보유기간 3년부터 연 2%씩, 최대 30%까지 공제돼요.
            아래는 8억에 판 주택(5억에 취득, 10년 보유)의 계산 예시예요.
            실제 계산 시에는 <a href="https://hometax.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">홈택스 양도세 자동계산</a>을 이용하면 편해요.
          </p>

          <FormulaBox lines={[
            { text: '// 양도세 계산 공식', comment: true },
            { text: '1. 양도차익 = 양도가액 - 취득가액 - 필요경비', numbered: true },
            { text: '2. 양도소득금액 = 양도차익 - 장기보유특별공제', numbered: true },
            { text: '3. 과세표준 = 양도소득금액 - 기본공제(250만원)', numbered: true },
            { text: '4. 산출세액 = 과세표준 × 세율 - 누진공제', numbered: true },
          ]} />

          <SpokeTable
            id="tbl-calc"
            title="2주택자 양도세 계산 예시"
            subtitle="8억 매도, 5억 취득, 10년 보유 기준"
            headers={['항목', '금액', '비고']}
            rows={CALC_EXAMPLE_ROWS}
            highlightCol={1}
          />

          <TipBox title="유예 기간 안에 파는 게 유리해요">
            <p className="mb-0 leading-relaxed">
              같은 조건이라도 2026년 5월 10일 이후에 팔면 중과세율(+20%p)이 적용돼요.<br />
              위 예시 기준으로 세금이 약 4,430만원 더 늘어날 수 있어요.<br />
              매도 시기를 조절할 수 있다면 유예 기간 내 매도를 검토해 보세요.
            </p>
          </TipBox>

          <p className="text-neutral-600 mb-0">더 궁금한 점이 있다면 아래 자주 묻는 질문을 확인해 보세요.</p>
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
      question: '2주택자 양도세 신고 기한은 언제인가요?',
      answer: '양도일(잔금일 또는 등기이전일 중 빠른 날)이 속하는 달의 말일부터 <strong>2개월 이내</strong>에 신고해야 해요. 기한을 넘기면 가산세가 붙어요.',
    },
    {
      question: '2주택자가 장기보유특별공제를 받을 수 있나요?',
      answer: '2026년 5월 9일까지 유예 기간 중에 양도하면 장기보유특별공제를 받을 수 있어요. 3년 이상 보유 시 6%부터 시작해서 최대 30%까지 공제돼요. 다만 유예 종료 후 중과 대상이 되면 공제가 배제돼요.',
    },
  ],

  relatedSpokes: [
    { badge: '세금', title: '일시적 2주택 양도세 비과세 기간과 처분 조건', desc: '3년 처분 기한과 거주 요건 총정리', href: '/w/일시적-2주택-양도세-비과세-기간-처분' },
    { badge: '세금', title: '3주택자 양도세 중과세율 계산과 비과세 조건', desc: '3주택 이상 중과세율과 비과세 방법', href: '/w/3주택자-양도세-중과세율-계산-비과세' },
  ],

  sources: [
    { name: '양도소득세 개요', url: 'https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7707&mi=2308', org: '국세청' },
    { name: '양도소득세 세율', url: 'https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2312&cntntsId=7711', org: '국세청' },
    { name: '소득세법', url: 'https://www.law.go.kr/법령/소득세법', org: '법제처' },
  ],
}

export default data
