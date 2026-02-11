import Link from 'next/link'
import type { SpokeData } from './types'
import { RateCards, TipBox, SpokeCompareCards, SpokeTable, SpokeTimeline, SpokeChecklist, SpokeStepCards, SpokeFlow } from '@/components/spoke/SpokeBlocks'

// --- Table data ---
const PAYMENT_EXAMPLE_ROWS = [
  ['1월 5일', '1월 19일', '1월 26일 (1차)', '2월 2일~5일', '대기 7일 제외'],
  ['2월 1일', '2월 15일', '2월 22일 (1차)', '3월 1일~4일', '대기 7일 제외'],
  ['3월 10일', '3월 24일', '3월 31일 (1차)', '4월 7일~10일', '대기 7일 제외'],
]

// --- Spoke Data ---
const data: SpokeData = {
  slug: '실업급여-지급일-첫-입금일-대기기간',

  meta: {
    title: '실업급여 지급일 첫 입금일 대기기간',
    description: '실업급여 신청하면 언제 입금될까요? 7일 대기기간, 첫 입금일, 이후 지급 주기를 정리했어요',
    keywords: ['실업급여 지급일 첫 입금일 대기기간', '실업급여 언제 입금되나요', '실업급여 대기기간 7일 의미', '실업급여 지급 주기 일정'],
    ogTitle: '실업급여 지급일 첫 입금일 대기기간 | 머니위키',
    ogDescription: '7일 대기기간부터 첫 입금일까지 한 번에.',
  },

  hub: {
    url: '/w/실업급여-신청-조건-금액-기간-총정리',
    name: '실업급여 총정리',
  },

  breadcrumb: ['실업급여', '지급일 대기기간'],

  hero: {
    badge: '2026년 기준',
    h1: <><span className="text-[#1E3A5F]">실업급여 지급일</span> 첫 입금일 대기기간</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          실업급여 신청했는데 언제 입금되는지 몰라서 불안하셨죠?
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          실업급여는 <strong className="text-neutral-800">7일 대기기간</strong>을 거친 후 첫 실업인정을 받아야 입금돼요.
          신청일로부터 약 <strong className="text-neutral-800">14일 후 첫 실업인정일</strong>이 지정되고, 인정을 받으면 3~5일 내에 첫 구직급여가 입금돼요.
          <a href="https://www.ei.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">고용보험 홈페이지</a>에서 고용보험법 시행규칙 제101조 기준이에요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          쉽게 말해서, 신청하자마자 바로 받는 게 아니라 대기기간이 있고, 그 이후부터 실업인정을 받아야 입금돼요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          먼저 7일 대기기간이 뭔지부터 확인해볼게요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '실업급여',
      desc: '실업급여 총정리 전체 보기',
    },
  },

  toc: [
    { id: 's1', text: '실업급여 대기기간 7일의 의미' },
    { id: 's2', text: '첫 입금일 계산 방법과 예시' },
    { id: 'tbl1', text: '신청일별 첫 입금일 예시', sub: true },
    { id: 's3', text: '실업인정 후 지급까지 소요일수' },
    { id: 's4', text: '입금 지연 시 확인 방법' },
    { id: 's5', text: '자주 묻는 질문' },
  ],

  sections: [
    // --- Section 01: 대기기간 → RateCards + TipBox ---
    {
      id: 's1',
      number: '01',
      heading: '실업급여 대기기간 7일의 의미',
      subtitle: '신청일로부터 7일은 구직급여가 안 나와요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            <strong>대기기간 7일</strong>은 실업급여를 신청한 날부터 7일 동안은 구직급여가 지급되지 않는 기간이에요.
            고용보험법 제50조에서 정한 제도로, 단기 실업자와 장기 실업자를 구분하기 위한 장치예요.
            7일 대기기간은 소정급여일수에서 빼지 않고, 그냥 기다리는 기간이라고 생각하면 돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            예를 들어 1월 5일에 신청했다면, 1월 5일~1월 11일까지 7일은 구직급여가 지급되지 않아요.
            <a href="https://www.moel.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">고용노동부 공식 안내</a>에 따르면, 대기기간이 끝나고 첫 실업인정을 받은 날부터 구직급여가 계산돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            대기기간 7일은 모든 수급자에게 공통으로 적용되고, 면제되는 경우는 없어요.
            자영업자도, 계약직도, 정규직도 모두 똑같이 7일을 기다려야 해요.
          </p>

          <RateCards cards={[
            { value: '7일', label: '대기기간', lines: ['신청일부터 기산', '구직급여 0원'], highlight: '필수', highlightColor: 'orange' },
            { value: '8일째', label: '지급 시작', lines: ['첫 실업인정 이후', '소정급여일수 차감'], highlight: '입금', highlightColor: 'navy', active: true },
            { value: '소급 없음', label: '대기기간', lines: ['7일 동안 0원', '면제 불가'], highlight: '불가',  },
          ]} />

          <TipBox title="대기기간 동안 뭘 해야 하나요?">
            대기기간 동안은 구직등록을 완료하고, 워크넷에서 채용공고를 찾아보거나 고용센터 취업특강을 신청하면 돼요. 미리 준비하면 첫 실업인정 때 유리해요.
          </TipBox>

          <p className="text-neutral-600 mb-0">대기기간은 알겠는데, 그럼 실제로 첫 입금일은 언제인지 궁금해지잖아요.</p>
        </>
      ),
      bridgeCTA: { href: '#s2', badge: '첫 입금일', title: '정확히 언제 입금되나요?', desc: '계산 방법과 예시', icon: 'grid' },
    },

    // --- Section 02: 첫 입금일 → SpokeCompareCards + SpokeTable ---
    {
      id: 's2',
      number: '02',
      heading: '첫 입금일 계산 방법과 예시',
      subtitle: '신청일로부터 약 3주 후 입금돼요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            첫 입금일은 <strong>신청일 + 14일(1차 실업인정일) + 3~5일(입금 처리)</strong>로 계산하면 돼요.
            대부분 신청일로부터 약 3주 후에 첫 구직급여가 입금돼요.
            1차 실업인정일은 보통 신청일로부터 14일 후로 지정되는데, 고용센터 사정에 따라 1~2일 차이가 날 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            예를 들어 1월 5일에 신청했다면, 1차 실업인정일은 1월 19일(14일 후)이고, 실업인정을 받으면 1월 26일경 첫 입금이 돼요.
            <a href="https://www.ei.go.kr/ei/eih/eg/pb/pbPersonBnft/retrievePbPersonalBenefit.do" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">고용보험 개인 수급내역</a>에서 정확한 입금 예정일을 확인할 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            입금일은 평일 기준이라서 토요일·일요일·공휴일이면 다음 평일로 밀려요.
            대기기간 7일은 소정급여일수에서 차감되지 않지만, 첫 입금액에는 포함되지 않아요.
          </p>

          <SpokeCompareCards cards={[
            { title: '정상 입금 경로', subtitle: '대부분 3주 내', items: ['신청일 + 14일 → 1차 실업인정일', '실업인정 후 3~5일 → 입금', '총 약 18~21일 소요', '대기 7일 제외 후 금액 지급'], recommended: true, recLabel: '정상' },
            { title: '입금 지연 경우', subtitle: '드문 경우', items: ['서류 보완 요청 시', '은행 계좌 오류 시', '실업인정 불참 시', '이직확인서 미제출 시'], recommended: false },
          ]} />

          <SpokeTable
            id="tbl1"
            title="신청일별 첫 입금일 예시"
            subtitle="2026년 기준 (평일 기준)"
            headers={['신청일', '1차 실업인정일', '실업인정 완료', '첫 입금 예정일', '비고']}
            rows={PAYMENT_EXAMPLE_ROWS}
            highlightCol={3}
          />

          <p className="text-neutral-600 mb-0">첫 입금일은 계산이 됐는데, 실업인정 후 정확히 며칠 만에 입금되는지 궁금해질 수 있어요.</p>
        </>
      ),
      bridgeCTA: { href: '#s3', badge: '지급 주기', title: '실업인정 후 입금까지 며칠 걸리나요?', desc: '소요일수 확인', icon: 'info' },
    },

    // --- Section 03: 지급 소요일수 → SpokeTimeline + SpokeChecklist ---
    {
      id: 's3',
      number: '03',
      heading: '실업인정 후 지급까지 소요일수',
      subtitle: '실업인정 후 3~5일 내 입금돼요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            실업인정을 받으면 <strong>3~5 영업일 내</strong>에 구직급여가 입금돼요.
            고용센터를 직접 방문해서 실업인정을 받은 경우 보통 3~4일, 온라인 실업인정은 4~5일 정도 걸려요.
            <a href="https://www.work.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">고용24 홈페이지</a>에서 실업인정 내역과 입금 예정일을 확인할 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            입금일은 평일 기준이라서 토요일·일요일·공휴일이 끼면 다음 평일로 자동 연기돼요.
            예를 들어 목요일에 실업인정을 받았다면, 월요일이나 화요일에 입금될 가능성이 높아요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            2차 실업인정부터는 4주마다 반복되고, 매번 실업인정을 받은 후 3~5일 내에 입금돼요.
            소정급여일수가 끝날 때까지 계속 반복돼요.
          </p>

          <SpokeTimeline events={[
            { month: 'Day 1', title: '실업인정 완료', desc: '고용센터 방문 or 온라인' },
            { month: 'Day 2~3', title: '심사·승인', desc: '고용센터 내부 처리', status: 'current' },
            { month: 'Day 3~5', title: '입금 처리', desc: '은행 송금' },
            { month: 'Day 5', title: '입금 완료', desc: '계좌 확인' },
          ]} />

          <SpokeChecklist items={[
            { text: '실업인정 후 3~5일 내 입금', done: true },
            { text: '평일 기준 (공휴일 제외)', done: true },
            { text: '온라인 인정 시 4~5일', done: true },
            { text: '입금 지연 시 고용센터 문의', done: false, note: '☎1350' },
          ]} />

          <p className="text-neutral-600 mb-0">정상적으로는 3~5일 내 입금되는데, 만약 지연된다면 어떻게 해야 할까요?</p>
        </>
      ),
      bridgeCTA: { href: '#s4', badge: '입금 지연', title: '입금이 안 되면 어떻게 하나요?', desc: '확인 방법', icon: 'info' },
    },

    // --- Section 04: 입금 지연 → SpokeStepCards + SpokeFlow ---
    {
      id: 's4',
      number: '04',
      heading: '입금 지연 시 확인 방법',
      subtitle: '고용24·고용센터로 문의하세요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            실업인정 후 5일이 지나도 입금이 안 되면 <strong>고용24 홈페이지</strong>에서 개인 수급내역을 먼저 확인해야 해요.
            로그인 후 "실업급여 → 개인 수급내역"에서 지급 상태를 확인할 수 있어요.
            "지급 예정"이라고 나오면 곧 입금될 거고, "보류" 또는 "반려"라고 나오면 고용센터에 문의해야 해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            입금 지연 원인은 대부분 <strong>은행 계좌 오류</strong>, <strong>서류 미비</strong>, <strong>실업인정 불참 이력</strong> 때문이에요.
            <a href="https://www.moel.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">고용노동부 고객센터 ☎1350</a>으로 전화하거나, 관할 고용센터로 직접 문의하면 정확한 원인을 알 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            은행 계좌가 잘못 입력되었거나 폐쇄된 경우, 고용센터에서 계좌 정보를 다시 등록해야 해요.
            서류 보완이 필요하면 고용센터에서 연락이 와요.
          </p>

          <SpokeStepCards steps={[
            { title: '고용24 확인', desc: '개인 수급내역 조회', tip: '지급 상태 확인' },
            { title: '계좌 확인', desc: '입력한 계좌번호 재확인', tip: '폐쇄 여부 점검' },
            { title: '고용센터 문의', desc: '☎1350 또는 관할 센터', tip: '지연 원인 파악' },
            { title: '서류 보완', desc: '요청 서류 제출', tip: '미비 서류 보완' },
            { title: '재처리', desc: '보완 후 3~5일 내 재입금' },
          ]} />

          <SpokeFlow steps={[
            { icon: '🌐', label: '고용24 로그인', sub: 'work.go.kr' },
            { icon: '📋', label: '수급내역 확인', sub: '지급 상태' },
            { icon: '📞', label: '고용센터 문의', sub: '☎1350' },
            { icon: '🔧', label: '원인 해결', sub: '계좌·서류' },
            { icon: '💰', label: '재입금', sub: '3~5일' },
          ]} />

          <p className="text-neutral-600 mb-0">입금 지연 시 확인 방법을 정리했으니, 자주 묻는 질문들을 확인해볼게요.</p>
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
    { question: '실업급여 대기기간 7일 동안 아르바이트를 해도 되나요?', answer: '안 돼요. 대기기간 7일 동안 아르바이트를 하면 실업 상태가 아니라고 판단되어 수급자격이 취소될 수 있어요.' },
    { question: '실업급여 첫 입금액이 생각보다 적은 이유가 뭔가요?', answer: '대기기간 7일은 구직급여가 지급되지 않기 때문에, 첫 입금액은 7일을 제외한 기간만큼만 계산돼요. 2차 실업인정부터는 28일분 전액이 지급돼요.' },
  ],

  relatedSpokes: [
    { badge: '실업급여', title: '실업급여 신청 조건 금액 기간 총정리', desc: '실업급여 전체 안내', href: '/w/실업급여-신청-조건-금액-기간-총정리' },
    { badge: '실업인정', title: '실업급여 실업인정 구직활동 방법', desc: '실업인정 절차', href: '/w/실업급여-실업인정-구직활동-방법' },
  ],

  sources: [
    { name: '고용보험법 제50조 (대기기간)', url: 'https://www.law.go.kr/법령/고용보험법', org: '법제처' },
    { name: '고용보험 개인 수급내역', url: 'https://www.ei.go.kr/ei/eih/eg/pb/pbPersonBnft/retrievePbPersonalBenefit.do', org: '고용노동부' },
    { name: '고용노동부 고객센터', url: 'https://www.moel.go.kr/contact/index.do', org: '고용노동부' },
  ],
}

export default data
