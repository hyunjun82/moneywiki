import Link from 'next/link'
import type { SpokeData } from './types'
import { SpokeTable, SpokeTimeline, SpokeStepCards, SpokeCompareCards, SpokeRateBars, SpokeWarnBox, SpokeChecklist } from '@/components/spoke/SpokeBlocks'

// --- Table data ---
const MONTHLY_LIMIT_ROWS = [
  ['1개월차', '250만원', '70만원'],
  ['2개월차', '250만원', '70만원'],
  ['3개월차', '300만원', '70만원'],
  ['4개월차', '350만원', '70만원'],
  ['5개월차', '400만원', '70만원'],
  ['6개월차', '450만원', '70만원'],
]

// --- Spoke Data ---
const data: SpokeData = {
  slug: '6+6-부모육아휴직제-급여-금액-신청',

  meta: {
    title: '6+6 부모육아휴직제 급여 금액과 신청 대상',
    description: '6+6 부모육아휴직제 급여 금액, 신청 대상, 신청 방법까지 한 번에 정리해요.',
    keywords: ['6+6 부모육아휴직제', '부모육아휴직제 급여 금액', '부모육아휴직제 신청 대상', '부모육아휴직제 신청'],
    ogTitle: '6+6 부모육아휴직제 급여 금액과 신청 대상 | 머니위키',
    ogDescription: '월별 상한액, 대상 요건, 신청 절차까지 한 번에.',
  },

  hub: {
    url: '',
    name: '',
  },

  breadcrumb: ['근로/노동', '6+6 부모육아휴직제'],

  hero: {
    badge: '2026년 기준',
    h1: <><span className="text-emerald-600">6+6 부모육아휴직제</span> 급여 금액과 신청 대상</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          맞벌이 부부가 둘 다 육아휴직을 쓰면 급여가 일반 육아휴직의 거의 2배라는데, 실제로 얼마나 차이가 나는지 궁금하셨죠?
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          <strong className="text-neutral-800">6+6 부모육아휴직제</strong>는 생후 18개월 이내 자녀를 둔 부모가 각각 첫 6개월간 통상임금 100%, 최대 <strong className="text-neutral-800">월 450만원</strong>까지 받을 수 있는 제도예요.
          <a href="https://www.moel.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">고용노동부</a> 고시 기준이에요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          쉽게 말해서, 부모 한 명만 쓰면 4개월차부터 상한 200만원으로 떨어지는데 둘 다 쓰면 6개월차까지 매달 상한이 올라가요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          먼저 일반 육아휴직이랑 뭐가 다른지부터 볼게요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '근로/노동',
      desc: '육아휴직 제도 전체 보기',
    },
  },

  toc: [
    { id: 's1', text: '6+6 부모육아휴직제가 뭔가요?' },
    { id: 's2', text: '부모육아휴직제 급여 금액은 얼마인가요?' },
    { id: 'tbl1', text: '월별 상한액 표', sub: true },
    { id: 's3', text: '부모육아휴직제 신청 대상은 누구인가요?' },
    { id: 's4', text: '부모육아휴직제 신청은 어떻게 하나요?' },
    { id: 's5', text: '6+6 부모육아휴직제 자주 묻는 질문' },
  ],

  sections: [
    // --- Section 01: 제도 설명 → SpokeCompareCards ---
    {
      id: 's1',
      number: '01',
      heading: '6+6 부모육아휴직제가 뭔가요?',
      subtitle: '부모가 둘 다 육아휴직을 쓰면 급여 상한이 확 올라가는 제도예요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            <strong>6+6 부모육아휴직제</strong>는 2024년에 도입된 제도로, 생후 18개월 이내 자녀를 돌보기 위해 부모가 <strong>모두</strong> 육아휴직을 사용하면 각각 첫 6개월 동안 통상임금의 100%를 지급해요.
            핵심은 부모 중 한 명만 쓰면 일반 육아휴직이 적용되고, 둘 다 써야 이 혜택을 받는다는 거예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            일반 육아휴직은 4개월차부터 상한이 200만원으로 떨어지는 반면, 6+6 제도는 매월 상한이 올라가서 6개월차에 450만원까지 받을 수 있어요.
            <a href="https://www.moel.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">고용노동부</a>에서 운영하고, 2025~2026년에 걸쳐 상한액이 단계적으로 인상되고 있어요.
            맞벌이 부부라면 수백만원 차이가 나기 때문에 반드시 확인해야 하는 제도예요.
          </p>

          <SpokeCompareCards cards={[
            { title: '일반 육아휴직', subtitle: '부모 한 명만 사용', items: ['1~3개월: 통상임금 100% (상한 250만원)', '4~6개월: 통상임금 100% (상한 200만원)', '7개월~: 통상임금 80% (상한 160만원)', '6개월 총 상한: 1,350만원'], recommended: false },
            { title: '6+6 부모육아휴직', subtitle: '부모 둘 다 사용', items: ['1~2개월: 통상임금 100% (상한 250만원)', '3개월: 300만원 / 4개월: 350만원', '5개월: 400만원 / 6개월: 450만원', '6개월 총 상한: 2,000만원'], recommended: true, recLabel: '추천' },
          ]} />

          <p className="text-neutral-600 mb-0">자, 차이는 알겠는데 매달 정확히 얼마씩 받는지가 더 중요하잖아요.</p>
        </>
      ),
      bridgeCTA: { href: '#s2', badge: '급여 금액', title: '매달 통장에 들어오는 금액은 얼마일까요?', desc: '월별 상한액 표로 바로 확인', icon: 'calc' },
    },

    // --- Section 02: 급여 금액 → SpokeTable + SpokeRateBars ---
    {
      id: 's2',
      number: '02',
      heading: '부모육아휴직제 급여 금액은 얼마인가요?',
      subtitle: '1개월차 250만원에서 시작해서 6개월차에는 450만원까지 올라가요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            6+6 부모육아휴직제 급여는 <strong>통상임금의 100%</strong>를 받되, 월별 상한액이 단계적으로 올라가는 구조예요.
            1~2개월차에는 상한 250만원, 3개월차 300만원, 4개월차 350만원, 5개월차 400만원, 그리고 6개월차에는 450만원까지 올라가요.
            통상임금이 상한액보다 낮으면 통상임금 100% 전액을 받을 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            7개월차부터는 일반 육아휴직 규정으로 전환돼서 통상임금의 80%, 상한 160만원이에요.
            <a href="https://easylaw.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">찾기쉬운 생활법령정보</a>에 따르면 급여의 25%는 사후지급금으로 복직 후 6개월 근무해야 받을 수 있으니, 매달 실수령은 75%라는 점도 알아두세요.
          </p>

          <SpokeTable
            id="tbl1"
            title="6+6 부모육아휴직제 월별 상한액"
            subtitle="부모 각각 적용, 2026년 기준"
            headers={['기간', '월 상한액', '월 하한액']}
            rows={MONTHLY_LIMIT_ROWS}
          />

          <SpokeRateBars bars={[
            { label: '1~2개월', rate: '250만원', width: '56%' },
            { label: '3개월', rate: '300만원', width: '67%' },
            { label: '4개월', rate: '350만원', width: '78%' },
            { label: '5개월', rate: '400만원', width: '89%' },
            { label: '6개월', rate: '450만원', width: '100%' },
          ]} />

          <p className="text-xs text-neutral-400 mt-1">
            * 7개월차부터는 일반 육아휴직 규정(통상임금 80%, 상한 160만원, 하한 70만원)으로 전환돼요.<br />
            * 급여 중 25%는 사후지급금으로 복직 후 6개월 근무 시 받아요.
          </p>

          <p className="text-neutral-600 mb-0">여기까지 보면 한 가지 궁금한 게 생기죠. 우리 부부도 받을 수 있는 건지요.</p>
        </>
      ),
      bridgeCTA: { href: '#s3', badge: '대상 확인', title: '우리 부부도 받을 수 있을까요?', desc: '자격 요건 체크리스트로 바로 확인', icon: 'info' },
    },

    // --- Section 03: 신청 대상 → SpokeChecklist + SpokeWarnBox ---
    {
      id: 's3',
      number: '03',
      heading: '부모육아휴직제 신청 대상은 누구인가요?',
      subtitle: '고용보험 180일, 생후 18개월 이내 자녀, 부모 모두 사용이 핵심 조건이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            6+6 부모육아휴직제를 받으려면 세 가지 조건을 모두 충족해야 해요.
            <strong>고용보험 피보험단위기간 180일 이상</strong>, <strong>생후 18개월 이내 자녀</strong>(입양 포함), 그리고 <strong>부모 모두 육아휴직 사용</strong>이 핵심이에요.
            <a href="https://ei.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">고용24</a>에서 본인의 피보험기간을 조회할 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            부모가 동시에 육아휴직을 써도 되고, 순차적으로 써도 돼요. 누가 먼저 쓰든 상관없이 각각 첫 6개월 동안 혜택을 받을 수 있어요.
            다만 생후 18개월이라는 기한이 있으니, 너무 늦게 시작하면 6개월을 다 못 채울 수 있다는 점을 주의하세요.
          </p>

          <SpokeChecklist items={[
            { text: '고용보험 가입기간 180일 이상', done: true, note: '피보험단위기간 기준, 고용24에서 조회 가능' },
            { text: '생후 18개월 이내 자녀 (입양 포함)', done: true, note: '18개월 넘기면 일반 육아휴직만 가능' },
            { text: '부모 모두 육아휴직 사용', done: false, note: '한 명만 쓰면 6+6 혜택 없이 일반 적용' },
            { text: '같은 자녀에 대해 각각 신청', done: false, note: '자녀별로 각각 적용, 사용 순서 무관' },
          ]} />

          <SpokeWarnBox title="예외 대상 확인">
            <p className="mb-0 leading-relaxed">
              <strong>공무원</strong>과 <strong>사립학교 교원</strong>은 별도 규정이 적용돼요. 소속 기관에 문의하세요.
              자영업자와 프리랜서는 고용보험 미가입이라 현재 대상이 아니에요.
              부모 중 한 명이라도 육아휴직을 사용하지 않으면 6+6 혜택 없이 일반 육아휴직 규정이 적용돼요.
            </p>
          </SpokeWarnBox>

          <p className="text-neutral-600 mb-0">대상이 된다면, 실제로 어디에 뭘 내야 하는지 정리했어요.</p>
        </>
      ),
      bridgeCTA: { href: '#s4', badge: '신청 방법', title: '대상이 된다면 어디에 뭘 내야 하나요?', desc: '4단계로 끝나는 신청 절차', icon: 'clock' },
    },

    // --- Section 04: 신청 방법 → SpokeStepCards + SpokeTimeline ---
    {
      id: 's4',
      number: '04',
      heading: '부모육아휴직제 신청은 어떻게 하나요?',
      subtitle: '사업주 신청 → 확인서 발급 → 고용24 급여 신청 → 매월 수령 순서예요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            6+6 부모육아휴직제 신청은 크게 두 단계로 나뉘어요. 먼저 <strong>사업주에게 육아휴직을 신청</strong>하고, 그 다음에 <strong>고용24에서 급여를 신청</strong>해요.
            육아휴직 신청은 시작 예정일 30일 전까지 해야 하고, 급여 신청은 휴직 시작 1개월 후부터 가능해요.
            <a href="https://ei.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">고용24</a>에서 온라인으로 신청하거나 관할 고용센터를 방문해도 돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            급여는 매월 단위로 신청해야 하고, 해당 월 육아휴직분은 다음 달 말일까지 신청을 마쳐야 해요.
            휴직이 끝난 후에도 12개월 이내에 신청해야 급여를 받을 수 있으니까 기한을 꼭 지키세요.
          </p>

          <SpokeStepCards steps={[
            { title: '사업주에게 육아휴직 신청', desc: '휴직 시작 예정일 30일 전까지 서면으로 신청해요', tip: '근로기준법상 사업주는 거부할 수 없어요' },
            { title: '육아휴직 확인서 받기', desc: '사업주가 고용센터에 확인서를 제출해요', tip: '사업주 미제출 시 본인이 직접 제출 가능' },
            { title: '고용24에서 급여 신청', desc: '육아휴직 시작 1개월 후부터 매월 온라인 신청', tip: 'ei.go.kr 또는 고용센터 방문' },
            { title: '급여 수령 확인', desc: '신청 후 약 14일 이내 본인 계좌로 입금', tip: '25%는 사후지급금 → 복직 후 6개월 근무 시 지급' },
          ]} />

          <SpokeTimeline events={[
            { month: 'D-30', title: '사업주에게 신청', desc: '육아휴직 시작 30일 전까지', status: 'normal' as const },
            { month: 'D-Day', title: '육아휴직 시작', desc: '급여 신청은 1개월 후부터', status: 'current' as const, tag: '휴직 시작' },
            { month: '+1개월', title: '첫 급여 신청', desc: '고용24 온라인 또는 고용센터', status: 'normal' as const },
            { month: '+6개월', title: '6+6 혜택 종료', desc: '7개월차부터 일반 육아휴직 전환', status: 'warning' as const, tag: '전환 시점' },
            { month: '종료+12개월', title: '신청 마감', desc: '이 기한 넘기면 급여 못 받아요', status: 'warning' as const, tag: '기한 주의' },
          ]} />

          <p className="text-xs text-neutral-400 mt-1">
            * 육아휴직 확인서는 사업주가 발급하고, 급여 신청은 본인이 직접 해요.<br />
            * 필요 서류: 육아휴직 확인서, 급여 신청서, 통장 사본 (본인 명의).
          </p>
        </>
      ),
      bridgeCTA: { href: '#s5', badge: '궁금증', title: '다른 분들이 자주 물어보는 것들', desc: '사용 순서, 사후지급금 등', icon: 'info', primary: true },
    },

    // --- Section 05: FAQ ---
    {
      id: 's5',
      number: '05',
      heading: '6+6 부모육아휴직제 자주 묻는 질문',
      subtitle: '6+6 부모육아휴직제에 대해 자주 묻는 질문이에요',
      content: null,
    },
  ],

  faq: [
    {
      question: '6+6 부모육아휴직제 사용 순서가 정해져 있나요?',
      answer: '순서는 정해져 있지 않아요. 부모가 <strong>동시에</strong> 쓰거나 <strong>순차적으로</strong> 써도 되고, 누가 먼저 쓰든 상관없이 각각 첫 6개월 동안 혜택을 받을 수 있어요. 다만 생후 18개월 이내 자녀가 대상이니까 시작 시점을 잘 계산해서 6개월을 다 채울 수 있도록 하세요.',
    },
    {
      question: '6+6 부모육아휴직제 사후지급금도 일반 육아휴직과 같나요?',
      answer: '네, 6+6 부모육아휴직제도 급여의 <strong>25%</strong>는 사후지급금으로 복직 후 6개월 이상 근무해야 받을 수 있어요. 매달 실수령은 75%이고, 나머지 25%는 복직 후 한꺼번에 지급돼요. 복직 없이 퇴사하면 사후지급금을 받을 수 없으니 이 점을 꼭 참고하세요.',
    },
  ],

  relatedSpokes: [
    { badge: '급여', title: '육아휴직 급여 계산 지급일 세금 실수령액', desc: '기간별 급여 상한, 지급일, 비과세 여부', href: '/w/육아휴직-급여-계산-지급일-세금-실수령액' },
    { badge: '아빠', title: '아빠 육아휴직 급여 신청 대상과 기간', desc: '남성 육아휴직 급여와 신청 방법', href: '/w/아빠-육아휴직-급여-신청-대상-기간' },
  ],

  sources: [
    { name: '육아휴직 급여 안내', url: 'https://www.ei.go.kr', org: '고용24' },
    { name: '6+6 부모육아휴직제 안내', url: 'https://www.moel.go.kr', org: '고용노동부' },
    { name: '육아휴직 법률정보', url: 'https://easylaw.go.kr', org: '찾기쉬운 생활법령정보' },
  ],
}

export default data
