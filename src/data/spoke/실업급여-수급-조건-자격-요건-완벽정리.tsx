import Link from 'next/link'
import type { SpokeData } from './types'
import { SpokeCompareCards, SpokeTable, SpokeTimeline, SpokeChecklist, SpokeStepCards, SpokeFlow, SpokeRateBars, FormulaBox } from '@/components/spoke/SpokeBlocks'

// --- Table data ---
const CONDITION_SUMMARY_ROWS = [
  ['고용보험 가입', '18개월 중 180일 이상', '필수'],
  ['비자발적 퇴사', '권고사직·해고·부당대우', '필수'],
  ['적극적 구직 의사', '4주마다 재취업활동', '필수'],
]

const INSURANCE_PERIOD_ROWS = [
  ['정규직 1년', '12개월 = 365일', '180일 초과 ✅'],
  ['정규직 6개월', '6개월 = 180일', '180일 충족 ✅'],
  ['3일/주 아르바이트 6개월', '약 72일', '180일 미달 ❌'],
  ['주 5일 6개월', '약 120일 (주휴일 제외)', '180일 미달 ❌'],
]

// --- Spoke Data ---
const data: SpokeData = {
  slug: '실업급여-수급-조건-자격-요건-완벽정리',

  meta: {
    title: '실업급여 수급 조건 자격 요건 | 고용보험 가입기간 퇴직사유 기준',
    description: '고용보험 180일, 비자발적 퇴사, 구직 의사 3가지가 핵심이에요. 실업급여 받으려면 어떤 조건을 갖춰야 하는지 정리했어요',
    keywords: ['실업급여 수급 조건 자격 요건 완벽정리', '실업급여 받을 수 있는 조건 3가지', '실업급여 자격 요건 확인 방법', '실업급여 비자발적 퇴사 기준'],
    ogTitle: '실업급여 수급 조건 자격 요건 | 고용보험 가입기간 퇴직사유 기준 | 머니위키',
    ogDescription: '고용보험 180일, 비자발적 퇴사, 구직 의사 3가지 핵심 조건',
  },

  hub: {
    url: '/w/실업급여-신청-조건-금액-기간-총정리-2026',
    name: '실업급여 완전정복 가이드',
  },

  breadcrumb: ['실업급여', '수급 조건'],

  hero: {
    badge: '2026년 기준',
    h1: <><span className="text-[#1E3A5F]">실업급여 수급 조건</span> 자격 요건 완벽정리</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          회사에서 퇴사하고 실업급여를 받으려는데, 내가 받을 수 있는 자격이 되는지 궁금하셨죠?
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          <strong className="text-neutral-800">실업급여 수급 조건</strong>은 크게 3가지예요. <strong className="text-neutral-800">고용보험 18개월 중 180일 이상 가입</strong>, <strong className="text-neutral-800">비자발적 퇴사</strong>, <strong className="text-neutral-800">적극적인 구직 의사</strong>가 핵심이에요.
          <a href="https://www.moel.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">고용노동부</a>와 <a href="https://www.ei.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">고용보험</a>에서 명확히 규정하고 있어요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          쉽게 말해서, 일정 기간 고용보험에 가입했고, 내 의지가 아닌 이유로 퇴사했으며, 지금 적극적으로 일자리를 찾고 있으면 받을 수 있어요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          먼저 3가지 조건을 정확히 확인해볼게요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '실업급여',
      desc: '실업급여 완전정복 가이드 전체 보기',
    },
  },

  toc: [
    { id: 's1', text: '실업급여 수급 조건 3가지 핵심 정리' },
    { id: 'tbl1', text: '3가지 조건 요약', sub: true },
    { id: 's2', text: '고용보험 피보험기간 180일 계산 방법' },
    { id: 'tbl2', text: '근무 유형별 180일 충족 여부', sub: true },
    { id: 's3', text: '비자발적 퇴사 인정 범위와 기준' },
    { id: 's4', text: '수급자격 인정 신청 절차와 준비물' },
    { id: 's5', text: '자주 묻는 질문' },
  ],

  sections: [
    // --- Section 01: 3가지 조건 → SpokeCompareCards + SpokeTable ---
    {
      id: 's1',
      number: '01',
      heading: '실업급여 수급 조건 3가지 핵심 정리',
      subtitle: '고용보험 180일, 비자발적 퇴사, 구직 의사가 핵심이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            <strong>실업급여 수급 조건</strong>은 <strong>고용보험 피보험기간 180일 이상</strong>, <strong>비자발적 퇴사</strong>, <strong>적극적인 재취업 의사</strong> 3가지예요.
            이 조건을 모두 충족해야 실업급여를 받을 수 있어요. <a href="https://www.moel.go.kr/policy/policyinfo/recptiobs/list5.do" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">고용노동부 실업급여 안내</a>에서 명확히 규정하고 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            고용보험 가입은 퇴사일 이전 18개월(기준기간) 동안 통산 180일 이상 일한 기록이 있어야 해요.
            비자발적 퇴사는 권고사직, 해고, 계약 만료, 임금체불, 부당대우 등 내 의지가 아닌 이유로 퇴사한 경우를 말해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            적극적인 재취업 의사는 4주마다 실업 인정을 받고, 취업 활동을 증명해야 해요.
            단순히 실업급여를 받으려는 목적만으로는 안 되고, 실제로 구직 활동을 해야 인정돼요.
          </p>

          <SpokeCompareCards cards={[
            { title: '수급 가능 ✅', subtitle: '3가지 조건 모두 충족', items: ['고용보험 180일 이상 가입', '비자발적 퇴사 (권고사직·해고)', '적극적인 구직 활동'], recommended: true, recLabel: '자격 인정' },
            { title: '수급 불가 ❌', subtitle: '하나라도 미충족', items: ['고용보험 180일 미만', '자발적 퇴사 (사직서 제출)', '구직 의사 없음 (허위 신청)'], recommended: false },
          ]} />

          <SpokeTable
            id="tbl1"
            title="실업급여 수급 조건 3가지 요약"
            subtitle="2026년 기준"
            headers={['조건', '세부 기준', '필수 여부']}
            rows={CONDITION_SUMMARY_ROWS}
            highlightCol={2}
          />

          <p className="text-neutral-600 mb-0">3가지 조건은 알았는데, 고용보험 180일을 어떻게 계산하는지가 중요하잖아요.</p>
        </>
      ),
      bridgeCTA: { href: '#s2', badge: '피보험기간', title: '180일은 어떻게 계산하나요?', desc: '근무 유형별 계산 방법 확인', icon: 'grid' },
    },

    // --- Section 02: 180일 계산 → SpokeTimeline + SpokeChecklist ---
    {
      id: 's2',
      number: '02',
      heading: '고용보험 피보험기간 180일 계산 방법',
      subtitle: '18개월 중 실제 근무한 날 기준이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            <strong>피보험기간 180일</strong>은 퇴사일 이전 18개월(기준기간) 동안 고용보험에 가입되어 실제로 일한 날짜를 통산한 거예요.
            단순히 회사에 다닌 기간이 아니라, 고용보험료가 납부된 날짜만 인정돼요. <a href="https://www.ei.go.kr/ei/eih/eg/pb/pbPersonRecptnManual/retrievePbPersonRecptnManual.do" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">고용보험 수급자격 인정 매뉴얼</a>에서 확인할 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            정규직은 월급 기준으로 1개월 = 30일로 계산하고, 아르바이트는 실제 근무한 시간을 일로 환산해요.
            예를 들어, 정규직 6개월이면 180일 충족이고, 주 3일 아르바이트 6개월은 약 72일로 180일 미달이에요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            여러 회사를 옮겨 다녔어도 18개월 안에 통산 180일만 채우면 돼요.
            단, 고용보험에 가입되지 않은 회사는 인정 안 되니까 주의해야 해요.
          </p>

          <SpokeTimeline events={[
            { month: '① 기준', title: '기준기간', desc: '퇴사일 이전 18개월' },
            { month: '② 계산', title: '피보험기간', desc: '고용보험료 납부된 실제 근무일' },
            { month: '③ 충족', title: '180일 충족', desc: '18개월 중 통산 180일 이상', status: 'current' },
            { month: '④ 신청', title: '신청', desc: '퇴사 후 12개월 이내' },
          ]} />

          <SpokeChecklist items={[
            { text: '18개월 내 고용보험 가입 확인', done: true },
            { text: '실제 근무일 180일 이상', done: true },
            { text: '여러 회사 합산 가능', done: true, note: '18개월 내 통산' },
            { text: '아르바이트는 근무시간 환산', done: false, note: '시간 부족 주의' },
          ]} />

          <SpokeTable
            id="tbl2"
            title="근무 유형별 180일 충족 여부 예시"
            subtitle="2026년 기준"
            headers={['근무 유형', '계산', '180일 충족']}
            rows={INSURANCE_PERIOD_ROWS}
            highlightCol={2}
          />

          <p className="text-neutral-600 mb-0">180일 계산은 확인했고, 이제 비자발적 퇴사가 뭔지 궁금해지죠.</p>
        </>
      ),
      bridgeCTA: { href: '#s3', badge: '비자발적 퇴사', title: '어떤 퇴사가 인정되나요?', desc: '비자발적 퇴사 인정 기준', icon: 'info' },
    },

    // --- Section 03: 비자발적 퇴사 → SpokeStepCards + SpokeFlow ---
    {
      id: 's3',
      number: '03',
      heading: '비자발적 퇴사 인정 범위와 기준',
      subtitle: '권고사직, 해고, 계약만료, 임금체불 등이 해당돼요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            <strong>비자발적 퇴사</strong>는 내가 원해서 퇴사한 게 아니라, 회사 사정이나 부득이한 이유로 퇴사한 경우를 말해요.
            권고사직, 해고, 계약 만료, 임금체불, 부당대우, 사업장 이전 등이 인정돼요. <a href="https://www.law.go.kr/법령/고용보험법" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">고용보험법 제58조</a>에서 명확히 규정하고 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            단순히 "이직확인서"를 받는다고 자동으로 인정되는 게 아니라, 퇴사 사유가 명확히 증명돼야 해요.
            예를 들어, 임금체불은 2개월 이상 체불 증명서, 부당대우는 구체적인 증거 자료가 필요해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            자발적 퇴사(사직서 제출)는 원칙적으로 안 되지만, 임신·출산, 육아, 질병, 부모 간병 등 정당한 사유가 있으면 예외적으로 인정될 수 있어요.
            정당한 사유는 고용센터에서 개별 심사해요.
          </p>

          <SpokeStepCards steps={[
            { title: '권고사직', desc: '회사가 먼저 퇴사 권유', tip: '이직확인서 필수' },
            { title: '해고', desc: '징계해고, 경영상 해고 포함', tip: '해고 통지서 필요' },
            { title: '계약만료', desc: '기간제 근로계약 종료', tip: '계약서 만료일 확인' },
            { title: '임금체불', desc: '2개월 이상 체불', tip: '체불 증명서 필수' },
            { title: '부당대우', desc: '괴롭힘, 차별 등', tip: '증거 자료 준비' },
            { title: '사업장 이전', desc: '출퇴근 2시간 초과', tip: '거리 증명 필요' },
          ]} />

          <SpokeFlow steps={[
            { icon: '📋', label: '퇴사 사유 확인', sub: '비자발적?' },
            { icon: '📎', label: '증빙자료 준비', sub: '이직확인서 등' },
            { icon: '🔍', label: '고용센터 제출', sub: '수급자격 신청' },
            { icon: '✅', label: '개별 심사', sub: '1~2주 소요' },
            { icon: '💰', label: '자격 인정', sub: '실업급여 지급' },
          ]} />

          <p className="text-neutral-600 mb-0">비자발적 퇴사 기준을 확인했으니, 이제 실제 신청 절차가 남았네요.</p>
        </>
      ),
      bridgeCTA: { href: '#s4', badge: '신청 절차', title: '어떻게 신청하면 되나요?', desc: '수급자격 인정 신청 단계별 안내', icon: 'grid' },
    },

    // --- Section 04: 신청 절차 → SpokeRateBars + FormulaBox ---
    {
      id: 's4',
      number: '04',
      heading: '수급자격 인정 신청 절차와 준비물',
      subtitle: '워크넷 구직등록 → 고용센터 신청 → 실업인정이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            <strong>수급자격 인정 신청</strong>은 퇴사 후 <strong>워크넷 구직등록</strong>을 먼저 하고, 관할 고용센터에 <strong>이직확인서</strong>와 <strong>신분증</strong>을 제출하면 돼요.
            <a href="https://www.work.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">워크넷</a>에서 온라인으로 구직등록하고, <a href="https://www.ei.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">고용보험</a> 사이트나 고용센터 방문으로 신청할 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            신청 후 1~2주 내에 수급자격 인정 여부가 결정되고, 인정되면 7일 뒤부터 첫 실업급여가 지급돼요.
            이후 4주마다 실업 인정을 받아야 계속 받을 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            준비물은 이직확인서(회사 발급), 신분증, 본인 명의 통장사본이고, 비자발적 퇴사 증빙 자료가 추가로 필요할 수 있어요.
            이직확인서는 퇴사 후 회사에 요청하면 10일 이내에 발급해줘야 해요.
          </p>

          <SpokeRateBars bars={[
            { label: '구직등록 (워크넷)', rate: '즉시', width: '15%' },
            { label: '수급자격 신청 (고용센터)', rate: '1일', width: '25%' },
            { label: '자격 심사', rate: '1~2주', width: '50%' },
            { label: '첫 지급 (7일 대기)', rate: '2~3주', width: '75%' },
            { label: '4주마다 실업인정', rate: '계속', width: '100%' },
          ]} />

          <FormulaBox lines={[
            { text: '// 수급자격 인정 신청 절차', comment: true },
            { text: '1. 워크넷 구직등록 (온라인)', numbered: true },
            { text: '2. 관할 고용센터 방문 또는 온라인 신청', numbered: true },
            { text: '3. 이직확인서 + 신분증 + 통장사본 제출', numbered: true },
            { text: '4. 수급자격 심사 (1~2주)', numbered: true },
            { text: '5. 자격 인정 → 7일 대기 후 첫 지급', numbered: true },
            { text: '6. 4주마다 실업인정 + 구직활동 증명', numbered: true },
          ]} />

          <p className="text-neutral-600 mb-0">신청 절차를 확인했으니, 이제 자주 묻는 질문들을 정리해볼게요.</p>
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
    { question: '실업급여 수급 조건에서 고용보험 180일은 연속으로 다녀야 하나요?', answer: '아니에요. 18개월 내에 통산 180일만 채우면 돼요. 여러 회사를 옮겨 다녀도 합산할 수 있어요.' },
    { question: '자발적 퇴사는 실업급여를 절대 못 받나요?', answer: '원칙적으로 안 되지만, 임신·출산, 육아, 질병, 부모 간병 등 정당한 사유가 있으면 예외적으로 인정될 수 있어요. 고용센터에서 개별 심사해요.' },
  ],

  relatedSpokes: [
    { badge: '실업급여', title: '실업급여 금액 계산 연봉별 수령액', desc: '내 연봉으로 얼마 받는지 계산', href: '/w/실업급여-금액-계산-연봉별-수령액' },
    { badge: '실업급여', title: '실업급여 수급기간 소정급여일수 기준', desc: '몇 개월 받을 수 있는지 확인', href: '/w/실업급여-수급기간-소정급여일수-기준' },
  ],

  sources: [
    { name: '고용보험법 제58조', url: 'https://www.law.go.kr/법령/고용보험법', org: '법제처' },
    { name: '실업급여 수급자격 인정 매뉴얼', url: 'https://www.ei.go.kr/ei/eih/eg/pb/pbPersonRecptnManual/retrievePbPersonRecptnManual.do', org: '고용보험' },
    { name: '고용노동부 실업급여 안내', url: 'https://www.moel.go.kr/policy/policyinfo/recptiobs/list5.do', org: '고용노동부' },
  ],
}

export default data
