import Link from 'next/link'
import type { SpokeData } from './types'
import { SpokeTable, SpokeTimeline, SpokeChecklist, SpokeStepCards, SpokeFlow, SpokeRateBars, FormulaBox, RateCards } from '@/components/spoke/SpokeBlocks'

// --- Table data ---
const TAX_COMPARISON_ROWS = [
  ['실업급여', '비과세', '0원', '불필요', '신고 제외'],
  ['근로소득', '과세', '원천징수', '필수', '연말정산 대상'],
  ['사업소득', '과세', '종합소득세', '필수', '종합소득세 신고'],
]

// --- Spoke Data ---
const data: SpokeData = {
  slug: '실업급여-세금-건강보험-국민연금-처리',

  meta: {
    title: '실업급여 세금 건강보험 국민연금 처리',
    description: '실업급여 받으면 세금 내야 하나요? 건강보험료 감면, 국민연금 납부유예, 실업크레딧까지 정리했어요',
    keywords: ['실업급여 세금 건강보험 국민연금 처리', '실업급여 비과세 연말정산 신고', '실업급여 건강보험료 감면 신청', '실업급여 국민연금 납부유예 실업크레딧'],
    ogTitle: '실업급여 세금 건강보험 국민연금 처리 | 머니위키',
    ogDescription: '세금 비과세부터 4대보험 처리까지 한 번에.',
  },

  hub: {
    url: '/w/실업급여-신청-조건-금액-기간-총정리',
    name: '실업급여 총정리',
  },

  breadcrumb: ['실업급여', '세금 4대보험'],

  hero: {
    badge: '2026년 기준',
    h1: <><span className="text-emerald-600">실업급여 세금</span> 건강보험 국민연금 처리</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          실업급여 받으면 세금도 내야 하는지, 건강보험료는 어떻게 되는지 헷갈리셨죠?
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          <strong className="text-neutral-800">실업급여는 비과세</strong>라서 소득세를 안 내도 되고, 연말정산에도 신고하지 않아요.
          하지만 <strong className="text-neutral-800">건강보험료는 감면 신청</strong>을 해야 하고, <strong className="text-neutral-800">국민연금은 납부유예나 실업크레딧</strong>을 신청할 수 있어요.
          <a href="https://www.law.go.kr/법령/소득세법" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">소득세법 제12조</a>에서 실업급여를 비과세 소득으로 정하고 있어요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          쉽게 말해서, 실업급여 자체로는 세금 걱정 없지만 건강보험료와 국민연금은 별도로 신청해야 혜택을 받을 수 있어요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          먼저 실업급여 세금 처리부터 확인해볼게요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '실업급여',
      desc: '실업급여 총정리 전체 보기',
    },
  },

  toc: [
    { id: 's1', text: '실업급여 비과세 처리와 연말정산' },
    { id: 'tbl1', text: '소득 유형별 세금 처리 비교', sub: true },
    { id: 's2', text: '건강보험료 감면 신청 방법 기준' },
    { id: 's3', text: '국민연금 납부유예와 실업크레딧' },
    { id: 's4', text: '실업급여 수급 중 4대보험 정리' },
    { id: 's5', text: '자주 묻는 질문' },
  ],

  sections: [
    // --- Section 01: 비과세 → SpokeTable + SpokeTimeline ---
    {
      id: 's1',
      number: '01',
      heading: '실업급여 비과세 처리와 연말정산',
      subtitle: '소득세 0원, 연말정산 신고 불필요해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            <strong>실업급여(구직급여)</strong>는 <strong>비과세 소득</strong>이라서 소득세를 전혀 내지 않아요.
            소득세법 제12조 5호에서 "고용보험법에 따른 실업급여"를 비과세 소득으로 명시하고 있어요.
            연말정산이나 종합소득세 신고에도 포함하지 않아요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            예를 들어 실업급여로 월 150만원을 받아도, 이 금액에서 소득세·지방소득세가 한 푼도 빠지지 않아요.
            <a href="https://www.nts.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">국세청</a> 홈택스에서도 실업급여는 소득으로 조회되지 않아요.
            근로소득이나 사업소득과는 완전히 다르게 취급돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            만약 실업급여를 받다가 중간에 재취업해서 근로소득이 생기면, 근로소득에 대해서만 연말정산을 하면 돼요.
            실업급여 기간은 제외하고 계산해요.
          </p>

          <SpokeTable
            id="tbl1"
            title="소득 유형별 세금 처리 비교"
            subtitle="2026년 기준"
            headers={['소득 유형', '과세 여부', '세금 처리', '연말정산', '비고']}
            rows={TAX_COMPARISON_ROWS}
            highlightCol={1}
          />

          <SpokeTimeline events={[
            { month: '퇴직', title: '회사 퇴직', desc: '근로소득 종료' },
            { month: '실업급여 수급', title: '구직급여 수령', desc: '비과세 소득', status: 'current' },
            { month: '재취업', title: '새 회사 입사', desc: '근로소득 재개' },
            { month: '연말정산', title: '재취업 회사에서 진행', desc: '실업급여 기간 제외' },
          ]} />

          <p className="text-neutral-600 mb-0">세금은 안 내도 되는 건 알겠는데, 건강보험료는 어떻게 되는지 궁금해지잖아요.</p>
        </>
      ),
      bridgeCTA: { href: '#s2', badge: '건강보험', title: '건강보험료 감면받을 수 있나요?', desc: '감면 신청 방법', icon: 'grid' },
    },

    // --- Section 02: 건강보험 감면 → SpokeChecklist + SpokeStepCards ---
    {
      id: 's2',
      number: '02',
      heading: '건강보험료 감면 신청 방법 기준',
      subtitle: '지역가입자는 최대 50% 감면 가능해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            실업급여를 받는 동안 건강보험은 <strong>지역가입자</strong>로 자동 전환돼요.
            직장가입자였다가 퇴직하면 지역가입자가 되는데, 이때 <strong>건강보험료 감면 제도</strong>를 신청하면 보험료를 최대 50%까지 줄일 수 있어요.
            <a href="https://www.nhis.or.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">국민건강보험공단</a>에서 운영하는 제도예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            감면 신청은 실업급여 수급 사실을 증명하는 <strong>실업급여 수급자 확인서</strong>를 발급받아서 건강보험공단에 제출하면 돼요.
            고용24 홈페이지에서 온라인으로 발급받을 수 있어요.
            신청 후 1~2주 내에 감면이 적용돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            단, 감면은 <strong>실업급여 수급 기간 동안만</strong> 적용되고, 재취업하면 자동으로 해제돼요.
            가구 소득이나 재산 기준을 초과하면 감면율이 낮아지거나 감면이 안 될 수 있어요.
          </p>

          <SpokeChecklist items={[
            { text: '실업급여 수급자 확인서 발급', done: true },
            { text: '건강보험공단 방문 또는 온라인 신청', done: true },
            { text: '최대 50% 감면 (소득·재산 기준)', done: true },
            { text: '재취업 시 자동 해제', done: false, note: '직장가입자 전환' },
          ]} />

          <SpokeStepCards steps={[
            { title: '확인서 발급', desc: '고용24에서 수급자 확인서 다운', tip: '온라인 발급' },
            { title: '신청서 작성', desc: '건강보험료 감면 신청서', tip: '공단 홈페이지' },
            { title: '서류 제출', desc: '건강보험공단 지사 방문 or 우편', tip: '온라인 가능' },
            { title: '심사·승인', desc: '1~2주 내 감면 적용', tip: '소득·재산 기준 확인' },
            { title: '고지서 확인', desc: '감면 적용된 보험료 납부', tip: '재취업 시 자동 해제' },
          ]} />

          <p className="text-neutral-600 mb-0">건강보험료 감면은 신청했는데, 국민연금은 어떻게 해야 하는지 궁금해질 수 있어요.</p>
        </>
      ),
      bridgeCTA: { href: '#s3', badge: '국민연금', title: '국민연금도 납부 안 해도 되나요?', desc: '납부유예와 실업크레딧', icon: 'info' },
    },

    // --- Section 03: 국민연금 → SpokeFlow + SpokeRateBars ---
    {
      id: 's3',
      number: '03',
      heading: '국민연금 납부유예와 실업크레딧',
      subtitle: '납부유예 신청하면 나중에 추납 가능해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            실업급여를 받는 동안 국민연금은 <strong>지역가입자</strong>로 전환되는데, 보험료 부담이 크면 <strong>납부유예</strong>를 신청할 수 있어요.
            납부유예를 신청하면 실업 기간 동안 보험료를 안 내도 되고, 나중에 재취업한 후 <strong>추납</strong>할 수 있어요.
            <a href="https://www.nps.or.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">국민연금공단</a>에서 신청할 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            또 다른 제도는 <strong>실업크레딧</strong>인데, 이건 실업 기간 동안 보험료를 안 내도 나중에 연금 계산할 때 납부한 것으로 인정해주는 제도예요.
            최대 12개월까지 인정되고, 평균소득월액의 50% 수준으로 계산돼요.
            국민연금 가입기간이 18개월 이상이어야 신청할 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            납부유예와 실업크레딧은 동시에 신청할 수 없고, 둘 중 하나를 선택해야 해요.
            실업크레딧이 나중에 연금액이 더 높아질 가능성이 있어요.
          </p>

          <SpokeFlow steps={[
            { icon: '🏢', label: '퇴직', sub: '직장가입자 → 지역가입자' },
            { icon: '📋', label: '납부유예 신청', sub: '국민연금공단' },
            { icon: '✅', label: '유예 승인', sub: '실업 기간 동안 미납' },
            { icon: '💼', label: '재취업', sub: '직장가입자 복귀' },
            { icon: '💰', label: '추납', sub: '원하면 나중에' },
          ]} />

          <SpokeRateBars bars={[
            { label: '납부유예 (추납 가능)', rate: '추천', width: '80%' },
            { label: '실업크레딧 (최대 12개월)', rate: '연금액 유리', width: '100%' },
            { label: '계속 납부 (부담 큼)', rate: '선택', width: '40%' },
          ]} />

          <p className="text-neutral-600 mb-0">국민연금 처리 방법을 알았으니, 실업급여 수급 중 4대보험을 전체적으로 정리해봐야죠.</p>
        </>
      ),
      bridgeCTA: { href: '#s4', badge: '4대보험', title: '4대보험 전체 정리하면?', desc: '실업급여 수급 중 처리', icon: 'info' },
    },

    // --- Section 04: 4대보험 정리 → FormulaBox + RateCards ---
    {
      id: 's4',
      number: '04',
      heading: '실업급여 수급 중 4대보험 정리',
      subtitle: '고용·산재는 없고, 건강보험·국민연금만 처리하세요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            실업급여를 받는 동안 <strong>4대보험</strong> 처리는 다음과 같아요.
            <strong>고용보험</strong>과 <strong>산재보험</strong>은 직장가입자만 내는 거라서 퇴직하면 자동으로 없어져요.
            <strong>건강보험</strong>과 <strong>국민연금</strong>만 지역가입자로 전환되어서 납부해야 해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            건강보험은 감면 신청을 하면 최대 50%까지 줄일 수 있고, 국민연금은 납부유예나 실업크레딧을 신청할 수 있어요.
            <a href="https://www.4insure.or.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">4대사회보험 정보연계센터</a>에서 내 가입 상태를 확인할 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            재취업하면 건강보험·국민연금은 다시 직장가입자로 자동 전환되고, 고용보험·산재보험도 자동으로 가입돼요.
            따로 신청할 필요 없어요.
          </p>

          <FormulaBox lines={[
            { text: '// 실업급여 수급 중 4대보험 상태', comment: true },
            { text: '고용보험: 미가입 (직장가입자만 해당)', numbered: true },
            { text: '산재보험: 미가입 (직장가입자만 해당)', numbered: true },
            { text: '건강보험: 지역가입자 전환 → 감면 신청 가능', numbered: true },
            { text: '국민연금: 지역가입자 전환 → 납부유예/실업크레딧 가능', numbered: true },
          ]} />

          <RateCards cards={[
            { value: '없음', label: '고용·산재', lines: ['직장가입자 전용', '퇴직 시 자동 해제'], highlight: '미가입',  },
            { value: '감면', label: '건강보험', lines: ['지역가입자 전환', '최대 50% 감면'], highlight: '신청', highlightColor: 'emerald', active: true },
            { value: '유예', label: '국민연금', lines: ['납부유예 가능', '실업크레딧 선택'], highlight: '선택', highlightColor: 'orange' },
          ]} />

          <p className="text-neutral-600 mb-0">실업급여 수급 중 세금과 4대보험을 정리했으니, 자주 묻는 질문들을 확인해볼게요.</p>
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
    { question: '실업급여를 받으면 연말정산 때 소득으로 신고해야 하나요?', answer: '안 돼요. 실업급여는 비과세 소득이라서 연말정산이나 종합소득세 신고에 포함하지 않아요.' },
    { question: '실업급여 수급 중 건강보험료를 안 내면 어떻게 되나요?', answer: '건강보험료를 3개월 이상 안 내면 보험 급여가 제한될 수 있어요. 감면 신청을 해서 보험료를 줄이고 계속 납부하는 게 안전해요.' },
  ],

  relatedSpokes: [
    { badge: '실업급여', title: '실업급여 신청 조건 금액 기간 총정리', desc: '실업급여 전체 안내', href: '/w/실업급여-신청-조건-금액-기간-총정리' },
    { badge: '지급일', title: '실업급여 지급일 첫 입금일 대기기간', desc: '입금 일정 확인', href: '/w/실업급여-지급일-첫-입금일-대기기간' },
  ],

  sources: [
    { name: '소득세법 제12조 (비과세 소득)', url: 'https://www.law.go.kr/법령/소득세법', org: '법제처' },
    { name: '국민건강보험 보험료 감면', url: 'https://www.nhis.or.kr/nhis/minwon/wbhaec06200m01.do', org: '국민건강보험공단' },
    { name: '국민연금 실업크레딧', url: 'https://www.nps.or.kr/jsppage/info/easy/easy_04_01.jsp', org: '국민연금공단' },
  ],
}

export default data
