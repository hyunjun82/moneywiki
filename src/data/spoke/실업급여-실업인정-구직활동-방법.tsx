import Link from 'next/link'
import type { SpokeData } from './types'
import { SpokeTimeline, SpokeChecklist, SpokeStepCards, SpokeFlow, SpokeRateBars, FormulaBox, RateCards, TipBox } from '@/components/spoke/SpokeBlocks'

// --- Spoke Data ---
const data: SpokeData = {
  slug: '실업급여-실업인정-구직활동-방법',

  meta: {
    title: '실업급여 실업인정 구직활동 방법 | 인정 횟수 온라인 교육 신청',
    description: '실업급여 받으려면 구직활동을 증명해야 해요. 실업인정 출석일, 구직활동 횟수, 온라인 교육까지 정리했어요',
    keywords: ['실업급여 실업인정 구직활동 방법', '실업급여 구직활동 횟수 인정 기준', '실업급여 온라인 교육 실업인정', '실업인정일 변경 방법 특례'],
    ogTitle: '실업급여 실업인정 구직활동 방법 | 인정 횟수 온라인 교육 신청 | 머니위키',
    ogDescription: '실업인정 출석일, 구직활동 횟수, 온라인 교육까지 한 번에.',
  },

  hub: {
    url: '/w/실업급여-신청-조건-금액-기간-총정리',
    name: '실업급여 총정리',
  },

  breadcrumb: ['실업급여', '실업인정 구직활동'],

  hero: {
    badge: '2026년 기준',
    h1: <><span className="text-[#1E3A5F]">실업급여 실업인정</span> 구직활동 방법</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          실업급여 신청했는데 계속 받으려면 뭘 해야 하는지 막막하셨죠?
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          <strong className="text-neutral-800">실업인정 제도</strong>는 구직활동을 증명해야 실업급여를 계속 받을 수 있는 시스템이에요.
          4주마다 고용센터를 방문하거나 온라인으로 실업인정을 받아야 하고, 1회 인정기간 동안 <strong className="text-neutral-800">재취업활동 1회 이상</strong> 해야 해요.
          <a href="https://www.moel.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">고용노동부</a> 고용보험법 시행규칙에서 정한 기준이에요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          쉽게 말해서, 그냥 돈만 받으면 안 되고 진짜 구직활동을 했다는 증거를 보여줘야 돼요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          먼저 실업인정 출석일부터 확인해볼게요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '실업급여',
      desc: '실업급여 총정리 전체 보기',
    },
  },

  toc: [
    { id: 's1', text: '실업인정 제도와 출석 주기 안내' },
    { id: 's2', text: '구직활동 인정 범위와 최소 횟수' },
    { id: 's3', text: '온라인 교육으로 실업인정 받기' },
    { id: 's4', text: '실업인정일 변경과 특례 적용' },
    { id: 's5', text: '자주 묻는 질문' },
  ],

  sections: [
    // --- Section 01: 실업인정 제도 → SpokeTimeline + SpokeChecklist ---
    {
      id: 's1',
      number: '01',
      heading: '실업인정 제도와 출석 주기 안내',
      subtitle: '4주마다 고용센터 방문 또는 온라인 신고예요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            <strong>실업인정</strong>은 구직급여를 받기 위해 4주마다 실업 상태와 재취업 노력을 확인받는 절차예요.
            고용센터를 직접 방문하거나, 고용24에서 온라인으로 실업인정을 신고할 수 있어요.
            1차 실업인정은 보통 신청일로부터 14일 후 첫 실업인정일로 지정돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            매 인정기간(4주)마다 <strong>재취업활동을 1회 이상</strong> 해야 실업급여가 지급돼요.
            <a href="https://www.work.go.kr/unemployed" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">워크넷</a>에서 입사지원하거나, 고용센터 취업특강을 듣거나, 실제 면접에 다녀오면 인정돼요.
            고용보험법 시행규칙 제101조에서 정한 기준이에요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            실업인정일에 출석하지 않으면 그 기간 동안 구직급여가 지급되지 않아요.
            정당한 사유 없이 2회 이상 불참하면 지급이 정지될 수 있으니 주의해야 해요.
          </p>

          <SpokeTimeline events={[
            { month: '신청일', title: '수급자격 신청', desc: '고용센터 방문' },
            { month: '14일 후', title: '1차 실업인정일', desc: '재취업활동 1회 이상', status: 'current' },
            { month: '28일 후', title: '2차 실업인정일', desc: '재취업활동 1회 이상' },
            { month: '42일 후', title: '3차 실업인정일', desc: '재취업활동 1회 이상' },
            { month: '이후 4주마다', title: '정기 실업인정', desc: '소정급여일수 종료까지' },
          ]} />

          <SpokeChecklist items={[
            { text: '4주마다 실업인정 필수', done: true },
            { text: '1회 인정기간 = 재취업활동 1회 이상', done: true },
            { text: '온라인 실업인정 가능', done: true },
            { text: '정당한 사유 없이 불참 시 지급 중단', done: false, note: '2회 이상 불참 주의' },
          ]} />

          <p className="text-neutral-600 mb-0">출석일은 알겠는데, 구체적으로 어떤 활동을 해야 인정되는지 궁금해지잖아요.</p>
        </>
      ),
      bridgeCTA: { href: '#s2', badge: '구직활동', title: '어떤 활동을 해야 인정될까요?', desc: '구직활동 인정 범위 확인', icon: 'grid' },
    },

    // --- Section 02: 구직활동 범위 → SpokeStepCards + SpokeFlow ---
    {
      id: 's2',
      number: '02',
      heading: '구직활동 인정 범위와 최소 횟수',
      subtitle: '워크넷 입사지원, 취업특강, 면접도 인정돼요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            재취업활동으로 인정되는 항목은 <strong>워크넷 입사지원</strong>, <strong>고용센터 취업특강 참석</strong>, <strong>실제 면접 참석</strong>, <strong>직업능력개발 훈련</strong> 등이에요.
            1회 인정기간 동안 최소 1회 이상 활동을 해야 실업급여가 정상 지급돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            워크넷에서 채용공고를 보고 온라인으로 지원하면 자동으로 기록이 남아요.
            <a href="https://www.work.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">워크넷 홈페이지</a>에서 로그인 후 "입사지원 관리"에서 확인할 수 있어요.
            고용센터 취업특강이나 구직역량강화 프로그램도 참석만 하면 인정돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            면접에 다녀온 경우 면접확인서를 회사에서 받아서 제출하면 인정돼요.
            자영업 준비나 창업 관련 상담도 고용센터에 신고하면 재취업활동으로 인정될 수 있어요.
          </p>

          <SpokeStepCards steps={[
            { title: '워크넷 입사지원', desc: '채용공고에 온라인 지원', tip: '자동 기록' },
            { title: '취업특강 참석', desc: '고용센터 프로그램 참여', tip: '출석만 하면 인정' },
            { title: '면접 참석', desc: '면접확인서 제출', tip: '회사 직인 필요' },
            { title: '직업훈련', desc: '국비지원 교육 수강', tip: '수강증명서 제출' },
            { title: '창업준비', desc: '자영업 관련 상담', tip: '고용센터 신고' },
          ]} />

          <SpokeFlow steps={[
            { icon: '🔍', label: '워크넷 검색', sub: '채용공고' },
            { icon: '📝', label: '입사지원', sub: '온라인 제출' },
            { icon: '✅', label: '자동 기록', sub: '재취업활동' },
            { icon: '🏢', label: '고용센터', sub: '실업인정 신고' },
          ]} />

          <p className="text-neutral-600 mb-0">구직활동 방법을 알았으니, 온라인 교육으로도 인정받을 수 있는지 궁금해지죠.</p>
        </>
      ),
      bridgeCTA: { href: '#s3', badge: '온라인 교육', title: '온라인 교육만 들어도 인정될까요?', desc: '온라인 실업인정 방법', icon: 'info' },
    },

    // --- Section 03: 온라인 교육 → SpokeRateBars + FormulaBox ---
    {
      id: 's3',
      number: '03',
      heading: '온라인 교육으로 실업인정 받기',
      subtitle: 'HRD-Net 직업훈련도 재취업활동 인정돼요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            <strong>HRD-Net 국비지원 교육</strong>이나 <strong>고용센터 온라인 취업특강</strong>을 들으면 재취업활동으로 인정돼요.
            단, 단순히 동영상만 보는 게 아니라 수강 완료 후 <strong>수료증이나 참석확인서</strong>가 발급되는 교육이어야 해요.
            <a href="https://www.hrd.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">HRD-Net 홈페이지</a>에서 "실업자 훈련"을 검색하면 인정되는 교육 목록이 나와요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            온라인 교육을 들으면서 워크넷 입사지원을 병행하면 더 안전하게 실업인정을 받을 수 있어요.
            교육만 듣고 입사지원을 전혀 안 하면 나중에 고용센터에서 "적극적인 구직활동을 안 했다"고 판단할 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            온라인 실업인정은 고용24에서 가능하지만, 1차 실업인정은 반드시 고용센터를 방문해야 해요.
            2차부터는 온라인으로도 가능해요.
          </p>

          <SpokeRateBars bars={[
            { label: '워크넷 입사지원', rate: '필수', width: '100%' },
            { label: 'HRD-Net 직업훈련', rate: '인정', width: '80%' },
            { label: '고용센터 온라인 특강', rate: '인정', width: '80%' },
            { label: '유튜브 강의', rate: '불인정', width: '20%' },
          ]} />

          <FormulaBox lines={[
            { text: '// 온라인 교육 인정 조건', comment: true },
            { text: '1. HRD-Net 국비지원 교육 수강', numbered: true },
            { text: '2. 수료증 또는 참석확인서 발급', numbered: true },
            { text: '3. 워크넷 입사지원 병행 권장', numbered: true },
            { text: '4. 2차 실업인정부터 온라인 가능', numbered: true },
          ]} />

          <p className="text-neutral-600 mb-0">온라인 교육도 인정되는 건 알겠는데, 실업인정일을 변경할 수 있는지 궁금해질 수 있어요.</p>
        </>
      ),
      bridgeCTA: { href: '#s4', badge: '일정 변경', title: '실업인정일을 변경할 수 있을까요?', desc: '변경 방법과 특례 확인', icon: 'info' },
    },

    // --- Section 04: 일정 변경 → RateCards + TipBox ---
    {
      id: 's4',
      number: '04',
      heading: '실업인정일 변경과 특례 적용',
      subtitle: '면접·질병·가족 사유는 변경 가능해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            실업인정일을 바꾸고 싶다면 <strong>정당한 사유</strong>가 있어야 해요.
            입사 면접, 질병·부상, 직계가족 경조사, 천재지변 등은 정당한 사유로 인정돼요.
            고용센터에 미리 전화나 고용24 온라인으로 신고하면 일정을 조정할 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            면접 때문에 실업인정일에 못 갈 경우, <strong>면접확인서</strong>를 제출하면 불참 사유가 인정되고 다음 인정일로 연기돼요.
            <a href="https://www.ei.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">고용보험 홈페이지</a>에서 양식을 다운받을 수 있어요.
            질병의 경우 진단서나 입원확인서가 필요해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            특례는 장기 질병, 출산, 육아 등의 사유로 일시적으로 구직활동을 못 하는 경우 실업인정 횟수를 줄여주는 제도예요.
            단, 특례 기간 중에도 실업급여는 계속 지급되지만 소정급여일수는 차감돼요.
          </p>

          <RateCards cards={[
            { value: '면접', label: '입사 면접', lines: ['면접확인서 제출', '일정 조정 가능'], highlight: '인정', highlightColor: 'navy' },
            { value: '질병', label: '질병·부상', lines: ['진단서 제출', '입원확인서 가능'], highlight: '인정', highlightColor: 'navy', active: true },
            { value: '경조사', label: '경조사', lines: ['직계가족 사망', '결혼 등'], highlight: '인정', highlightColor: 'navy' },
          ]} />

          <TipBox title="실업인정 불참 시 패널티">
            정당한 사유 없이 2회 이상 불참하면 구직급여 지급이 정지될 수 있어요. 미리 고용센터에 연락해서 일정을 조정하는 게 안전해요.
          </TipBox>

          <p className="text-neutral-600 mb-0">실업인정 제도를 정리했으니, 자주 묻는 질문들을 확인해볼게요.</p>
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
    { question: '실업급여 실업인정을 온라인으로만 계속 받을 수 있나요?', answer: '안 돼요. 1차 실업인정은 반드시 고용센터를 방문해야 하고, 2차부터는 온라인 실업인정이 가능해요.' },
    { question: '워크넷 입사지원을 몇 회나 해야 하나요?', answer: '1회 인정기간(4주)마다 최소 1회 이상 재취업활동을 해야 해요. 워크넷 입사지원 1회면 충분하지만, 여러 번 하면 더 안전해요.' },
  ],

  relatedSpokes: [
    { badge: '실업급여', title: '실업급여 신청 조건 금액 기간 총정리', desc: '실업급여 전체 안내', href: '/w/실업급여-신청-조건-금액-기간-총정리' },
    { badge: '고용센터', title: '실업급여 고용센터 찾기 고용24 사용법', desc: '고용센터 찾는 법', href: '/w/실업급여-고용센터-찾기-고용24-사용법' },
  ],

  sources: [
    { name: '고용보험법 시행규칙 제101조', url: 'https://www.law.go.kr/법령/고용보험법시행규칙', org: '법제처' },
    { name: '실업인정 제도 안내', url: 'https://www.moel.go.kr/policy/policyinfo/recpet/list4.do', org: '고용노동부' },
    { name: '워크넷 채용정보', url: 'https://www.work.go.kr/unemployed', org: '고용노동부' },
  ],
}

export default data
