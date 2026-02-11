import Link from 'next/link'
import type { SpokeData } from './types'
import { SpokeChecklist, SpokeStepCards, SpokeFlow, SpokeRateBars, FormulaBox, RateCards, TipBox, SpokeCompareCards } from '@/components/spoke/SpokeBlocks'

// --- Spoke Data ---
const data: SpokeData = {
  slug: '실업급여-금액-계산-연봉별-수령액',

  meta: {
    title: '실업급여 금액 계산 연봉별 수령액',
    description: '내 연봉이면 실업급여 얼마 받을까? 2026년 상한액 66,000원 기준으로 연봉별 예상 수령액을 계산해봤어요',
    keywords: ['실업급여 금액 계산 연봉별 수령액', '실업급여 계산기 2026 상한액 하한액', '실업급여 한달 얼마 받나요', '실업급여 평균임금 기초일액 계산'],
    ogTitle: '실업급여 금액 계산 연봉별 수령액 | 머니위키',
    ogDescription: '2026년 상한액 66,000원, 연봉별 예상 수령액 한눈에',
  },

  hub: {
    url: '/w/실업급여-신청-조건-금액-기간-총정리-2026',
    name: '실업급여 완전정복 가이드',
  },

  breadcrumb: ['실업급여', '금액 계산'],

  hero: {
    badge: '2026년 기준',
    h1: <><span className="text-[#1E3A5F]">실업급여 금액 계산</span> 연봉별 수령액</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          실업급여 신청하려는데, 내 연봉으로 실업급여를 얼마나 받을 수 있는지 궁금하셨죠?
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          <strong className="text-neutral-800">실업급여 금액</strong>은 <strong className="text-neutral-800">퇴사 전 평균임금의 60%</strong>를 기준으로 계산하는데, 2026년 기준 <strong className="text-neutral-800">상한액 66,000원, 하한액 63,104원</strong>이 정해져 있어요.
          <a href="https://www.ei.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">고용보험</a>과 <a href="https://www.moel.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">고용노동부</a>에서 매년 고시하고 있어요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          쉽게 말해서, 연봉 4천만원이면 하루 66,000원, 연봉 2천만원이면 하루 약 36,000원 정도 받을 수 있어요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          먼저 실업급여 금액 계산 공식부터 확인해볼게요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '실업급여',
      desc: '실업급여 완전정복 가이드 전체 보기',
    },
  },

  toc: [
    { id: 's1', text: '실업급여 금액 계산 공식과 기준' },
    { id: 's2', text: '2026년 실업급여 상한액 하한액 정리' },
    { id: 's3', text: '연봉별 실업급여 예상 수령액 비교' },
    { id: 's4', text: '고용24 실업급여 계산기 사용법' },
    { id: 's5', text: '자주 묻는 질문' },
  ],

  sections: [
    // --- Section 01: 계산 공식 → SpokeChecklist + SpokeStepCards ---
    {
      id: 's1',
      number: '01',
      heading: '실업급여 금액 계산 공식과 기준',
      subtitle: '평균임금의 60%가 기초일액이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            <strong>실업급여 금액</strong>은 <strong>퇴사 전 3개월 평균임금</strong>을 일로 환산한 <strong>평균임금</strong>의 60%로 계산해요. 이걸 <strong>기초일액</strong>이라고 부르고, 하루 받는 실업급여 금액이에요.
            <a href="https://www.ei.go.kr/ei/eih/eg/pb/pbPersonBnftCalcPrvn/retrievePbPersonBnftCalcPrvnView.do" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">고용보험 실업급여 계산 안내</a>에서 공식을 확인할 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            평균임금은 퇴사일 이전 3개월 동안 받은 총 급여(세전)를 그 기간의 총 일수로 나눈 거예요.
            예를 들어, 3개월 총 급여가 900만원이면 평균임금은 900만원 ÷ 90일 = 10만원이고, 기초일액은 10만원 × 60% = 6만원이에요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            단, 2026년 기준 상한액 66,000원, 하한액 63,104원이 정해져 있어서, 계산값이 이 범위를 벗어나면 상한액이나 하한액으로 적용돼요.
            연봉 4천만원 이상이면 대부분 상한액 66,000원을 받게 돼요.
          </p>

          <SpokeChecklist items={[
            { text: '퇴사 전 3개월 총 급여 확인', done: true },
            { text: '평균임금 = 총 급여 ÷ 90일', done: true },
            { text: '기초일액 = 평균임금 × 60%', done: true },
            { text: '상한액 66,000원, 하한액 63,104원', done: true, note: '2026년 기준' },
          ]} />

          <SpokeStepCards steps={[
            { title: '1단계', desc: '퇴사 전 3개월 총 급여 합산', tip: '세전 기준' },
            { title: '2단계', desc: '총 급여 ÷ 90일 = 평균임금', tip: '일 단위 환산' },
            { title: '3단계', desc: '평균임금 × 60% = 기초일액', tip: '실업급여 1일 금액' },
            { title: '4단계', desc: '상한·하한 적용', tip: '66,000원 초과 시 상한 적용' },
          ]} />

          <p className="text-neutral-600 mb-0">계산 공식은 알았는데, 2026년 상한액과 하한액이 얼마인지 정확히 확인해야 해요.</p>
        </>
      ),
      bridgeCTA: { href: '#s2', badge: '상한액·하한액', title: '2026년 실업급여 상한액과 하한액은?', desc: '최대·최소 금액 확인', icon: 'grid' },
    },

    // --- Section 02: 상한액·하한액 → SpokeFlow + SpokeRateBars ---
    {
      id: 's2',
      number: '02',
      heading: '2026년 실업급여 상한액 하한액 정리',
      subtitle: '상한액 66,000원, 하한액 63,104원이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            <strong>2026년 실업급여 상한액</strong>은 하루 <strong>66,000원</strong>, <strong>하한액</strong>은 하루 <strong>63,104원</strong>이에요.
            상한액은 연봉이 높아도 이 금액 이상 받을 수 없고, 하한액은 연봉이 낮아도 최소 이 금액은 받을 수 있다는 뜻이에요. <a href="https://www.moel.go.kr/policy/policyinfo/recptiobs/list5.do" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">고용노동부 고시</a>에서 매년 1월에 발표해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            상한액은 평균임금이 11만원 이상(연봉 약 4천만원 이상)이면 적용되고, 하한액은 평균임금이 10만 5천원 이하(연봉 약 3,800만원 이하)면 적용돼요.
            상한액과 하한액은 최저임금 변동에 맞춰 매년 조정돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            상한액을 받으려면 연봉 4천만원 이상, 하한액을 받으려면 연봉 3,800만원 이하 정도예요.
            중간 연봉은 평균임금의 60%로 계산되는데, 구체적인 금액은 다음 섹션에서 비교해볼게요.
          </p>

          <SpokeFlow steps={[
            { icon: '📊', label: '평균임금 계산', sub: '3개월 급여' },
            { icon: '🧮', label: '60% 적용', sub: '기초일액' },
            { icon: '🔼', label: '상한 체크', sub: '66,000원' },
            { icon: '🔽', label: '하한 체크', sub: '63,104원' },
            { icon: '💰', label: '최종 금액', sub: '1일 수령액' },
          ]} />

          <SpokeRateBars bars={[
            { label: '하한액 (연봉 3,800만원 이하)', rate: '63,104원/일', width: '50%' },
            { label: '중간 (연봉 3,800~4,000만원)', rate: '변동', width: '75%' },
            { label: '상한액 (연봉 4,000만원 이상)', rate: '66,000원/일', width: '100%' },
          ]} />

          <p className="text-neutral-600 mb-0">상한액과 하한액은 확인했고, 이제 내 연봉으로 얼마 받는지 구체적으로 비교해보죠.</p>
        </>
      ),
      bridgeCTA: { href: '#s3', badge: '연봉별 수령액', title: '내 연봉으로 얼마 받을까요?', desc: '연봉별 예상 수령액 비교', icon: 'grid' },
    },

    // --- Section 03: 연봉별 비교 → FormulaBox + RateCards ---
    {
      id: 's3',
      number: '03',
      heading: '연봉별 실업급여 예상 수령액 비교',
      subtitle: '연봉 2천만원부터 5천만원까지 정리했어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            <strong>연봉별 실업급여 예상 수령액</strong>은 연봉 2천만원은 하루 약 36,000원, 연봉 3천만원은 약 54,000원, 연봉 4천만원 이상은 상한액 66,000원이에요.
            실제 급여는 세전 기준이고, 평균임금의 60%를 받는 구조라서 연봉이 낮을수록 상대적으로 대체율이 높아요. <a href="https://www.ei.go.kr/ei/eih/eg/pb/pbPersonBnftCalcPrvn/retrievePbPersonBnftCalcPrvnView.do" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">고용보험 모의계산</a>에서 정확히 확인할 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            연봉 2천만원은 월 급여 약 166만원, 평균임금 약 60,000원이니까 기초일액은 36,000원이고, 연봉 3천만원은 월 250만원, 평균임금 약 90,000원이니까 기초일액은 54,000원이에요.
            연봉 4천만원 이상은 평균임금이 11만원 이상이라 상한액 66,000원이 적용돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            한 달 수령액은 기초일액 × 소정급여일수인데, 보통 30일 기준으로 계산하면 연봉 4천만원은 약 198만원, 연봉 3천만원은 약 162만원, 연봉 2천만원은 약 108만원 정도 받을 수 있어요.
            소정급여일수는 나이와 피보험기간에 따라 120일~270일로 달라져요.
          </p>

          <FormulaBox lines={[
            { text: '// 연봉별 예상 수령액 (하루)', comment: true },
            { text: '연봉 2천만원 → 약 36,000원/일', numbered: false },
            { text: '연봉 3천만원 → 약 54,000원/일', numbered: false },
            { text: '연봉 3천8백만원 → 약 63,104원/일 (하한)', numbered: false },
            { text: '연봉 4천만원 이상 → 66,000원/일 (상한)', numbered: false },
            { text: '', numbered: false },
            { text: '// 한 달 수령액 (30일 기준)', comment: true },
            { text: '연봉 2천만원 → 약 108만원/월', numbered: false },
            { text: '연봉 3천만원 → 약 162만원/월', numbered: false },
            { text: '연봉 4천만원 → 약 198만원/월', numbered: false },
          ]} />

          <RateCards cards={[
            { value: '36,000원', label: '연봉 2천만원', lines: ['하루 수령액', '월 약 108만원'], highlight: '하한액 미만' },
            { value: '54,000원', label: '연봉 3천만원', lines: ['하루 수령액', '월 약 162만원'], highlight: '중간', highlightColor: 'navy', active: true },
            { value: '66,000원', label: '연봉 4천만원+', lines: ['하루 수령액', '월 약 198만원'], highlight: '상한액', highlightColor: 'orange' },
          ]} />

          <p className="text-neutral-600 mb-0">대략적인 금액은 알겠는데, 정확한 계산은 고용24 계산기로 해보는 게 제일 확실해요.</p>
        </>
      ),
      bridgeCTA: { href: '#s4', badge: '계산기', title: '고용24 계산기로 정확히 계산해볼까요?', desc: '온라인 모의계산 방법', icon: 'info' },
    },

    // --- Section 04: 계산기 사용법 → TipBox + SpokeCompareCards ---
    {
      id: 's4',
      number: '04',
      heading: '고용24 실업급여 계산기 사용법',
      subtitle: '온라인으로 즉시 모의계산할 수 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            <strong>고용24 실업급여 계산기</strong>는 <a href="https://www.ei.go.kr/ei/eih/eg/pb/pbPersonBnftCalcPrvn/retrievePbPersonBnftCalcPrvnView.do" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">고용보험 홈페이지</a>에서 무료로 사용할 수 있어요.
            퇴사 전 3개월 급여, 나이, 피보험기간만 입력하면 예상 수령액과 소정급여일수를 즉시 확인할 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            계산기 사용법은 간단해요. 고용보험 홈페이지 → "실업급여 모의계산" 메뉴 → 퇴사 전 3개월 총 급여 입력 → 나이와 피보험기간 입력 → "계산하기" 클릭하면 결과가 바로 나와요.
            세전 급여를 입력해야 정확하고, 상여금이나 수당도 포함해야 해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            계산 결과는 기초일액, 소정급여일수, 총 수령 예상액이 나오는데, 실제 지급액은 심사 후 달라질 수 있으니 참고용으로만 봐야 해요.
            정확한 금액은 고용센터 수급자격 인정 후 확정돼요.
          </p>

          <TipBox title="실업급여 모의계산 사용법">
            <ul className="list-disc pl-5 space-y-1">
              <li>고용보험 홈페이지 → "실업급여 모의계산"</li>
              <li>퇴사 전 3개월 총 급여 입력 (세전)</li>
              <li>나이, 피보험기간 입력</li>
              <li>계산하기 클릭 → 예상 수령액 확인</li>
            </ul>
          </TipBox>

          <SpokeCompareCards cards={[
            { title: '온라인 계산기', subtitle: '고용보험 홈페이지', items: ['실시간 모의계산', '소정급여일수 자동 계산', '무료 이용'], recommended: true, recLabel: '추천' },
            { title: '고용센터 상담', subtitle: '직접 방문', items: ['정확한 심사', '개별 상담 가능', '신청 동시 진행'], recommended: false },
          ]} />

          <p className="text-neutral-600 mb-0">계산기 사용법까지 확인했으니, 이제 자주 묻는 질문들을 정리해볼게요.</p>
        </>
      ),
      bridgeCTA: { href: '#s5', badge: 'FAQ', title: '자주 묻는 질문들', desc: '궁금한 점 바로 확인', icon: 'info' },
    },

    // --- Section 05: FAQ ---
    {
      id: 's5',
      number: '05',
      heading: '자주 묻는 질문',
      subtitle: '자주 묻는 질문이에요',
      content: null,
    },
  ],

  faq: [
    { question: '실업급여 금액은 세후 기준인가요?', answer: '아니에요. 퇴사 전 3개월 급여는 세전 기준으로 계산하고, 실업급여는 비과세라서 세금을 떼지 않아요. 기초일액 그대로 받아요.' },
    { question: '상여금이나 야간수당도 실업급여 계산에 포함되나요?', answer: '네, 포함돼요. 퇴사 전 3개월 동안 받은 모든 급여(기본급, 상여금, 수당)를 합산해서 평균임금을 계산해요.' },
  ],

  relatedSpokes: [
    { badge: '실업급여', title: '실업급여 수급 조건 자격 요건 완벽정리', desc: '실업급여 받을 수 있는 조건 확인', href: '/w/실업급여-수급-조건-자격-요건-완벽정리' },
    { badge: '실업급여', title: '실업급여 수급기간 소정급여일수 기준', desc: '몇 개월 받을 수 있는지 확인', href: '/w/실업급여-수급기간-소정급여일수-기준' },
  ],

  sources: [
    { name: '고용보험 실업급여 계산 안내', url: 'https://www.ei.go.kr/ei/eih/eg/pb/pbPersonBnftCalcPrvn/retrievePbPersonBnftCalcPrvnView.do', org: '고용보험' },
    { name: '고용노동부 실업급여 금액 고시', url: 'https://www.moel.go.kr/policy/policyinfo/recptiobs/list5.do', org: '고용노동부' },
  ],
}

export default data
