import Link from 'next/link'
import type { SpokeData } from './types'
import { SpokeRateBars, FormulaBox, RateCards, TipBox, SpokeCompareCards, SpokeTable, SpokeTimeline, SpokeChecklist } from '@/components/spoke/SpokeBlocks'

// --- Table data ---
const BENEFIT_DAYS_ROWS = [
  ['30세 미만', '1년 미만', '120일'],
  ['30세 미만', '1~3년 미만', '150일'],
  ['30세 미만', '3~5년 미만', '180일'],
  ['30세 미만', '5~10년 미만', '210일'],
  ['30세 미만', '10년 이상', '240일'],
  ['50세 이상 & 장애인', '1년 미만', '120일'],
  ['50세 이상 & 장애인', '1~3년 미만', '180일'],
  ['50세 이상 & 장애인', '3~5년 미만', '210일'],
  ['50세 이상 & 장애인', '5~10년 미만', '240일'],
  ['50세 이상 & 장애인', '10년 이상', '270일'],
]

const UNIT_PERIOD_EXAMPLES = [
  ['정규직 1년', '12개월 × 30일 = 360일', '180일 충족 ✅'],
  ['정규직 6개월', '6개월 × 30일 = 180일', '180일 충족 ✅'],
  ['주 3일 아르바이트 6개월', '약 72일', '180일 미달 ❌'],
  ['주 5일 아르바이트 6개월', '약 120일 (주휴일 제외)', '180일 미달 ❌'],
]

// --- Spoke Data ---
const data: SpokeData = {
  slug: '실업급여-수급기간-소정급여일수-기준',

  meta: {
    title: '실업급여 수급기간 소정급여일수 기준 | 나이 근속별 수급 일수 계산',
    description: '실업급여는 최소 120일, 최대 270일 받아요. 나이와 근무기간에 따라 달라지는 소정급여일수를 정리했어요',
    keywords: ['실업급여 수급기간 소정급여일수 기준', '실업급여 몇 개월 받나요 기간', '실업급여 피보험기간 180일 계산', '실업급여 피보험단위기간 근무일수'],
    ogTitle: '실업급여 수급기간 소정급여일수 기준 | 나이 근속별 수급 일수 계산 | 머니위키',
    ogDescription: '최소 120일, 최대 270일, 나이와 근무기간 기준 정리',
  },

  hub: {
    url: '/w/실업급여-신청-조건-금액-기간-총정리-2026',
    name: '실업급여 완전정복 가이드',
  },

  breadcrumb: ['실업급여', '수급기간'],

  hero: {
    badge: '2026년 기준',
    h1: <><span className="text-[#1E3A5F]">실업급여 수급기간</span> 소정급여일수 기준</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          실업급여를 받을 수 있는 건 알겠는데, 몇 개월 동안 받을 수 있는지 궁금하셨죠?
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          <strong className="text-neutral-800">실업급여 수급기간</strong>은 <strong className="text-neutral-800">소정급여일수</strong>로 결정되는데, 나이와 피보험기간에 따라 <strong className="text-neutral-800">최소 120일부터 최대 270일</strong>까지 받을 수 있어요.
          <a href="https://www.moel.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">고용노동부</a>와 <a href="https://www.ei.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">고용보험</a>에서 명확히 규정하고 있어요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          쉽게 말해서, 50세 이상이고 10년 넘게 일했으면 270일(약 9개월), 30세 미만이고 1년 미만 일했으면 120일(약 4개월) 받을 수 있어요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          먼저 소정급여일수가 어떻게 결정되는지 확인해볼게요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '실업급여',
      desc: '실업급여 완전정복 가이드 전체 보기',
    },
  },

  toc: [
    { id: 's1', text: '소정급여일수 결정 기준 나이 피보험기간' },
    { id: 's2', text: '연령별 피보험기간별 소정급여일수 표' },
    { id: 'tbl1', text: '소정급여일수 상세표', sub: true },
    { id: 's3', text: '피보험단위기간 계산 방법 주의사항' },
    { id: 'tbl2', text: '근무 유형별 예시', sub: true },
    { id: 's4', text: '기준기간 18개월과 180일 관계' },
    { id: 's5', text: '자주 묻는 질문' },
  ],

  sections: [
    // --- Section 01: 소정급여일수 기준 → SpokeRateBars + FormulaBox ---
    {
      id: 's1',
      number: '01',
      heading: '소정급여일수 결정 기준 나이 피보험기간',
      subtitle: '나이와 근무기간 2가지로 결정돼요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            <strong>소정급여일수</strong>는 <strong>이직일 당시 나이</strong>와 <strong>피보험기간</strong> 2가지 기준으로 결정돼요.
            나이는 만 나이 기준이고, 피보험기간은 고용보험에 가입되어 일한 총 기간이에요. <a href="https://www.law.go.kr/법령/고용보험법" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">고용보험법 제50조</a>에서 명확히 규정하고 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            나이는 크게 3개 구간으로 나뉘어요. 30세 미만, 30~50세 미만, 50세 이상·장애인이고, 피보험기간은 1년 미만부터 10년 이상까지 5개 구간이에요.
            50세 이상이거나 장애인이면 같은 피보험기간이어도 소정급여일수가 더 길어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            예를 들어, 30세 미만이고 1년 미만 일했으면 120일, 50세 이상이고 10년 이상 일했으면 270일을 받을 수 있어요.
            피보험기간이 길수록, 나이가 많을수록 더 오래 받을 수 있는 구조예요.
          </p>

          <SpokeRateBars bars={[
            { label: '30세 미만, 1년 미만', rate: '120일', width: '44%' },
            { label: '30~50세, 5년 미만', rate: '180일', width: '67%' },
            { label: '50세+, 5~10년', rate: '240일', width: '89%' },
            { label: '50세+, 10년 이상', rate: '270일', width: '100%' },
          ]} />

          <FormulaBox lines={[
            { text: '// 소정급여일수 결정 요소', comment: true },
            { text: '1. 이직일 당시 만 나이', numbered: true },
            { text: '   - 30세 미만', numbered: false },
            { text: '   - 30세 이상 50세 미만', numbered: false },
            { text: '   - 50세 이상 또는 장애인', numbered: false },
            { text: '2. 피보험기간 (고용보험 가입 기간)', numbered: true },
            { text: '   - 1년 미만 ~ 10년 이상 (5개 구간)', numbered: false },
          ]} />

          <p className="text-neutral-600 mb-0">기준은 알았는데, 구체적으로 내 나이와 근무기간으로 몇 일 받는지 표로 확인해야 해요.</p>
        </>
      ),
      bridgeCTA: { href: '#s2', badge: '소정급여일수 표', title: '내 나이와 근무기간으로 몇 일 받나요?', desc: '연령별·기간별 상세표 확인', icon: 'grid' },
    },

    // --- Section 02: 소정급여일수 표 → RateCards + TipBox ---
    {
      id: 's2',
      number: '02',
      heading: '연령별 피보험기간별 소정급여일수 표',
      subtitle: '최소 120일부터 최대 270일까지예요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            <strong>연령별 피보험기간별 소정급여일수</strong>는 표로 정리하면 쉽게 확인할 수 있어요.
            30세 미만은 최소 120일부터 최대 240일, 50세 이상·장애인은 최소 120일부터 최대 270일까지 받을 수 있어요. <a href="https://www.ei.go.kr/ei/eih/eg/pb/pbPersonBnftDays/retrievePbPersonBnftDays.do" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">고용보험 소정급여일수 안내</a>에서 전체 표를 확인할 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            피보험기간 1년 미만은 모든 연령에서 120일이고, 10년 이상은 30세 미만 240일, 30~50세 미만 240일, 50세 이상 270일이에요.
            중간 구간은 피보험기간이 늘어날수록 30일씩 증가하는 구조예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            장애인은 나이와 관계없이 50세 이상 기준을 적용받아서, 피보험기간이 같아도 더 오래 받을 수 있어요.
            예를 들어, 30세 장애인이 5년 일했으면 50세 이상 기준인 210일을 받아요.
          </p>

          <RateCards cards={[
            { value: '120일', label: '최소 기간', lines: ['1년 미만', '모든 연령'], highlight: '약 4개월',  },
            { value: '180일', label: '중간 기간', lines: ['3~5년 미만', '30세 미만'], highlight: '약 6개월', highlightColor: 'navy', active: true },
            { value: '270일', label: '최대 기간', lines: ['10년 이상', '50세 이상'], highlight: '약 9개월', highlightColor: 'orange' },
          ]} />

          <TipBox title="소정급여일수 추가 혜택">
            <ul className="list-disc pl-5 space-y-1">
              <li>50세 이상 또는 장애인: 같은 피보험기간이어도 30일 더 받아요</li>
              <li>피보험기간 10년 이상: 30세 미만 240일, 50세 이상 270일</li>
              <li>여러 회사 합산: 18개월 내 통산 피보험기간으로 계산</li>
            </ul>
          </TipBox>

          <SpokeTable
            id="tbl1"
            title="연령별 피보험기간별 소정급여일수 상세표"
            subtitle="2026년 기준"
            headers={['연령', '피보험기간', '소정급여일수']}
            rows={BENEFIT_DAYS_ROWS}
            highlightCol={2}
          />

          <p className="text-neutral-600 mb-0">소정급여일수는 확인했고, 이제 피보험기간을 어떻게 계산하는지가 중요해요.</p>
        </>
      ),
      bridgeCTA: { href: '#s3', badge: '피보험기간', title: '피보험기간은 어떻게 계산하나요?', desc: '근무 유형별 계산 방법', icon: 'info' },
    },

    // --- Section 03: 피보험단위기간 계산 → SpokeCompareCards + SpokeTable ---
    {
      id: 's3',
      number: '03',
      heading: '피보험단위기간 계산 방법 주의사항',
      subtitle: '실제 근무한 날만 인정돼요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            <strong>피보험단위기간</strong>은 고용보험에 가입되어 실제로 일한 날을 기준으로 계산해요.
            정규직은 1개월 = 30일로 계산하고, 아르바이트는 실제 근무한 시간을 일로 환산해요. <a href="https://www.ei.go.kr/ei/eih/eg/pb/pbPersonRecptnManual/retrievePbPersonRecptnManual.do" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">고용보험 피보험기간 계산 매뉴얼</a>에서 확인할 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            정규직 1년은 12개월 × 30일 = 360일이니까 피보험기간 1년 이상 구간에 해당하고, 정규직 6개월은 180일이니까 1년 미만 구간이지만 수급 조건 180일은 충족해요.
            아르바이트는 주 3일 6개월이면 약 72일로 180일 미달이라 수급 조건 자체가 안 돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            여러 회사를 옮겨 다녔어도 18개월 내에 통산 180일 이상이면 되고, 피보험기간도 합산해서 소정급여일수를 결정해요.
            단, 고용보험에 가입되지 않은 회사는 인정 안 되니까 주의해야 해요.
          </p>

          <SpokeCompareCards cards={[
            { title: '정규직', subtitle: '1개월 = 30일', items: ['1년 = 360일 (1년 이상 구간)', '6개월 = 180일 (1년 미만, 180일 충족)', '피보험기간 계산 쉬움'], recommended: true, recLabel: '소정급여일수 유리' },
            { title: '아르바이트', subtitle: '실제 근무일 계산', items: ['주 3일 6개월 = 약 72일 (180일 미달)', '주 5일 6개월 = 약 120일 (180일 미달)', '근무시간 부족 주의'], recommended: false },
          ]} />

          <SpokeTable
            id="tbl2"
            title="근무 유형별 피보험단위기간 예시"
            subtitle="2026년 기준"
            headers={['근무 유형', '계산', '180일 충족']}
            rows={UNIT_PERIOD_EXAMPLES}
            highlightCol={2}
          />

          <p className="text-neutral-600 mb-0">피보험기간 계산은 확인했고, 이제 기준기간 18개월과 180일의 관계를 정리해볼게요.</p>
        </>
      ),
      bridgeCTA: { href: '#s4', badge: '기준기간', title: '18개월과 180일은 무슨 관계인가요?', desc: '기준기간과 피보험기간 관계', icon: 'grid' },
    },

    // --- Section 04: 기준기간 18개월 → SpokeTimeline + SpokeChecklist ---
    {
      id: 's4',
      number: '04',
      heading: '기준기간 18개월과 180일 관계',
      subtitle: '18개월 내에 180일 이상 일해야 해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            <strong>기준기간 18개월</strong>은 퇴사일 이전 18개월 동안을 말하고, 이 기간 안에 <strong>피보험기간 180일 이상</strong>이 있어야 실업급여를 받을 수 있어요.
            18개월은 수급 조건 판단 기간이고, 180일은 실제 근무 일수예요. <a href="https://www.law.go.kr/법령/고용보험법" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">고용보험법 제40조</a>에서 명확히 규정하고 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            예를 들어, 2026년 1월 1일에 퇴사했으면 기준기간은 2024년 7월 2일부터 2026년 1월 1일까지 18개월이고, 이 기간 동안 고용보험에 가입되어 일한 날이 180일 이상이어야 해요.
            여러 회사를 옮겨 다녀도 18개월 안에 통산 180일만 채우면 돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            피보험기간은 소정급여일수를 결정할 때도 사용되는데, 18개월 내에 통산 피보험기간을 계산해서 1년 미만, 1~3년 미만 등의 구간을 판단해요.
            단, 고용보험에 가입되지 않은 기간은 제외되니까 주의해야 해요.
          </p>

          <SpokeTimeline events={[
            { month: '기준기간 시작', title: '기준기간 산정', desc: '퇴사일 이전 18개월' },
            { month: '피보험기간 통산', title: '가입일수 합산', desc: '고용보험 가입된 실제 근무일' },
            { month: '180일 충족 확인', title: '수급 자격 판정', desc: '수급 조건 충족 여부 판단', status: 'current' },
            { month: '소정급여일수 결정', title: '급여일수 확정', desc: '나이 + 피보험기간으로 계산' },
          ]} />

          <SpokeChecklist items={[
            { text: '기준기간 18개월 확인', done: true },
            { text: '18개월 내 피보험기간 180일 이상', done: true },
            { text: '여러 회사 합산 가능', done: true, note: '18개월 내 통산' },
            { text: '고용보험 미가입 기간 제외', done: false, note: '인정 안 됨' },
          ]} />

          <p className="text-neutral-600 mb-0">기준기간과 피보험기간 관계를 확인했으니, 이제 자주 묻는 질문들을 정리해볼게요.</p>
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
    { question: '실업급여 수급기간 중에 일을 해도 되나요?', answer: '주 15시간 미만 알바는 가능해요. 단, 수입이 있으면 실업급여가 감액되거나 중단될 수 있으니 고용센터에 신고해야 해요.' },
    { question: '소정급여일수를 다 받기 전에 취업하면 나머지는 못 받나요?', answer: '네, 취업하면 실업급여는 중단돼요. 대신 조기재취업수당을 받을 수 있어요. 소정급여일수의 1/2 이상 남았으면 남은 일수의 1/2을 한 번에 받을 수 있어요.' },
  ],

  relatedSpokes: [
    { badge: '실업급여', title: '실업급여 수급 조건 자격 요건 완벽정리', desc: '실업급여 받을 수 있는 조건 확인', href: '/w/실업급여-수급-조건-자격-요건-완벽정리' },
    { badge: '실업급여', title: '실업급여 금액 계산 연봉별 수령액', desc: '내 연봉으로 얼마 받는지 계산', href: '/w/실업급여-금액-계산-연봉별-수령액' },
  ],

  sources: [
    { name: '고용보험법 제40조, 제50조', url: 'https://www.law.go.kr/법령/고용보험법', org: '법제처' },
    { name: '고용보험 소정급여일수 안내', url: 'https://www.ei.go.kr/ei/eih/eg/pb/pbPersonBnftDays/retrievePbPersonBnftDays.do', org: '고용보험' },
    { name: '피보험기간 계산 매뉴얼', url: 'https://www.ei.go.kr/ei/eih/eg/pb/pbPersonRecptnManual/retrievePbPersonRecptnManual.do', org: '고용보험' },
  ],
}

export default data
