import type { SpokeData } from '@/data/spoke/types'
import {
  SpokeTable,
  FormulaBox,
  TipBox,
  SpokeTimeline,
  SpokeStepCards,
  SpokeFlow,
  SpokeChecklist,
  Chips,
} from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '실업급여-지급일-첫-입금일-대기기간',

  meta: {
    title: '실업급여 지급일 첫 입금일 대기기간 7일 | 지급 주기 계산법',
    description: '실업급여 7일 대기기간과 첫 입금일 계산 방법을 정리했어요. 실업인정일 후 2~3일 내 입금, 지급 주기까지 확인하세요.',
    keywords: ['실업급여 지급일 입금 시기', '실업급여 첫 입금일 계산 방법', '실업급여 대기기간 7일 의미', '실업급여 지급 주기 통장 입금'],
    ogTitle: '실업급여 지급일 첫 입금일 대기기간 7일 계산 | 머니위키',
    ogDescription: '7일 대기기간부터 지급 주기까지 한눈에 확인하세요.',
  },

  hub: {
    url: '/w/실업급여-수급-조건-신청-방법-2026',
    name: '실업급여 수급 조건 신청 방법 2026',
  },

  breadcrumb: ['고용보험', '실업급여', '지급일 대기기간'],

  summary3: [
    <>실업급여 신청 후 <strong>7일 대기기간</strong> 동안은 구직급여가 지급되지 않아요</>,
    <>첫 입금일은 수급자격인정일로부터 약 <strong>2~3주 후</strong>예요</>,
    <>실업인정일 이후 <strong>2~3일 내</strong> 통장에 입금돼요</>,
  ],

  sourceBar: {
    badge: '출처',
    name: '고용보험법 제49조 (대기기간)',
    date: '2026.02',
  },

  prevNext: {
    prev: { title: '실업급여 실업인정 구직활동 방법', href: '/w/실업급여-실업인정-구직활동-방법' },
    next: { title: '실업급여 세금 건강보험 국민연금 처리', href: '/w/실업급여-세금-건강보험-국민연금-처리' },
  },

  stickyBar: {
    topLabel: '대기기간',
    value: '7일',
    buttonText: '지급 일정 확인 →',
    scrollTo: '#s2',
  },

  hero: {
    badge: '2026년 기준',
    h1: <><span className="text-[#1E3A5F]">실업급여 지급일</span> 첫 입금일과 대기기간 7일</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          실업급여 신청했는데 언제 입금되는지 몰라서 답답하셨죠? 이 글 하나면 바로 알 수 있어요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          <a href="https://www.law.go.kr/법령/고용보험법" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">고용보험법 제49조</a>에 따르면 실업급여는 신청 후 <strong className="text-neutral-800">7일 대기기간</strong>을 거쳐야 하고, 첫 실업인정일 이후 <strong className="text-neutral-800">2~3일 내</strong> 입금돼요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          <a href="/w/실업급여-수급-조건-신청-방법-2026" className="text-[#4A7AB5] hover:underline">실업급여 전체 안내</a>에서 수급 조건부터 금액까지 확인할 수 있어요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          먼저 7일 대기기간이 뭔지부터 같이 볼게요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '실업급여',
      desc: '실업급여 수급 조건·신청 방법 전체 보기',
    },
  },

  toc: [
    { id: 's1', label: '실업급여 대기기간 7일이 뭔가요?' },
    { id: 's2', label: '실업급여 첫 입금일은 어떻게 계산하나요?' },
    { id: 's3', label: '실업급여 지급 주기는 어떻게 되나요?' },
    { id: 's4', label: '실업급여 통장 입금이 안 되면 어떻게 하나요?' },
    { id: 's-faq', label: '자주 묻는 질문' },
  ],

  sections: [
    // --- SECTION 01: 대기기간 7일 ---
    {
      id: 's1',
      number: '01',
      heading: '실업급여 대기기간 7일이 뭔가요?',
      subtitle: '신청일로부터 7일은 구직급여를 못 받아요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            대기기간 7일은 실업급여를 신청한 날(수급자격인정 신청일)부터 7일 동안 구직급여가 지급되지 않는 기간이에요. <a href="https://www.law.go.kr/법령/고용보험법" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">고용보험법 제49조</a>에서 정한 제도예요. 단기 실업과 장기 실업을 구분하기 위한 장치라고 보면 돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            예를 들어 1월 6일에 고용센터에서 실업 신고를 했다면, 1월 6일~1월 12일까지 7일은 구직급여가 0원이에요. 1월 13일부터 소정급여일수가 시작돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            이 7일은 소정급여일수에서 차감되지 않아요. 순수하게 기다리기만 하는 기간이고, 정규직이든 계약직이든 자영업자든 모든 수급자에게 똑같이 적용돼요. 다만 건설일용근로자는 대기기간 없이 바로 지급받을 수 있어요.
          </p>

          <Chips items={[
            { icon: '7', label: '대기기간', value: '7일' },
            { icon: '0', label: '대기 중 급여', value: '0원' },
            { icon: '8', label: '급여 시작일', value: '8일째부터' },
            { icon: '!', label: '면제 대상', value: '건설일용직' },
          ]} />

          <TipBox title="반복수급자는 대기기간이 더 길어요">
            <p>최근 5년 내 실업급여를 3회 이상 받은 반복수급자는 대기기간이 최대 4주까지 늘어날 수 있어요. 2026년 기준으로 <a href="/w/실업급여-반복수급-감액-대기기간-2026-개정" className="text-[#4A7AB5] hover:underline">반복수급 감액 제도</a>가 적용돼요.</p>
          </TipBox>

          <p className="text-neutral-600 mb-0">대기기간은 이해했는데, 그러면 실제로 통장에 첫 입금이 언제 되는지 궁금해지잖아요.</p>
        </>
      ),
      bridgeCTA: { href: '#s2', badge: '입금일', title: '첫 입금일은 정확히 언제인가요?', desc: '수급자격인정일 기준 계산법', icon: 'calc' },
    },

    // --- SECTION 02: 첫 입금일 계산 ---
    {
      id: 's2',
      number: '02',
      heading: '실업급여 첫 입금일은 어떻게 계산하나요?',
      subtitle: '수급자격인정일 + 14일 + 2~3일이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            첫 입금일은 <strong>수급자격인정 신청일로부터 약 2~3주 후</strong>예요. 정확히는 7일 대기기간이 끝나고, 1차 실업인정일에 실업인정을 받은 뒤 2~3일 내에 입금돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            1차 실업인정일은 보통 수급자격인정 신청일로부터 <strong>14일 후</strong>로 지정돼요. 고용센터 사정에 따라 1~2일 차이가 날 수 있어요. <a href="https://www.work24.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">고용24(work24.go.kr)</a>에서 내 실업인정일을 확인할 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            첫 입금액은 14일에서 대기기간 7일을 뺀 <strong>7일분</strong>만 지급돼요. 그래서 2차 지급분보다 적게 느껴질 수 있어요.
          </p>

          <FormulaBox lines={[
            { text: '첫 입금일 계산', comment: true },
            { text: '1. 수급자격인정 신청일 + 14일 = 1차 실업인정일', numbered: true },
            { text: '2. 1차 실업인정일 + 2~3일 = 첫 입금일', numbered: true },
            { text: '※ 첫 입금액 = 구직급여일액 x 7일분 (14일 - 대기기간 7일)', comment: true },
          ]} />

          <SpokeTable
            id="tbl-first-payment"
            title="신청일별 첫 입금일 예시"
            subtitle="2026년 기준, 평일 기준 (공휴일 시 다음 평일)"
            headers={['신청일', '대기기간 종료', '1차 실업인정일', '첫 입금 예상일', '첫 입금액']}
            rows={[
              ['1월 6일(월)', '1월 12일', '1월 20일(월)', '1월 22~23일', '7일분'],
              ['2월 3일(월)', '2월 9일', '2월 17일(월)', '2월 19~20일', '7일분'],
              ['3월 10일(월)', '3월 16일', '3월 24일(월)', '3월 26~27일', '7일분'],
            ]}
            highlightCol={3}
          />

          <p className="text-neutral-600 mb-0">첫 입금일은 알겠는데, 그 이후에는 얼마나 자주 입금되는지 궁금한 게 생기죠.</p>
        </>
      ),
      bridgeCTA: { href: '#s3', badge: '지급 주기', title: '이후 실업급여는 얼마마다 들어오나요?', desc: '실업인정 주기와 입금 일정', icon: 'clock' },
    },

    // --- SECTION 03: 지급 주기 ---
    {
      id: 's3',
      number: '03',
      heading: '실업급여 지급 주기는 어떻게 되나요?',
      subtitle: '1~4주 단위 실업인정 후 2~3일 내 입금돼요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            첫 실업인정 이후부터는 <strong>1~4주 단위</strong>로 실업인정을 받고, 인정 후 <strong>2~3일 내</strong> 구직급여가 입금돼요. 보통 2차부터는 4주(28일) 단위로 실업인정일이 지정돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            실업인정일에 고용센터를 방문하거나 온라인으로 <a href="/w/실업급여-실업인정-구직활동-방법" className="text-[#4A7AB5] hover:underline">실업인정 신청</a>을 하면, 이전 실업인정일부터 해당 실업인정일까지의 기간에 대해 구직급여가 지급돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            2차 실업인정부터는 28일분이 한 번에 지급되기 때문에 첫 입금보다 금액이 커요. 예를 들어 <a href="/w/실업급여-금액-계산-연봉별-수령액" className="text-[#4A7AB5] hover:underline">구직급여일액</a>이 66,000원이면, 28일분은 1,848,000원이에요.
          </p>

          <SpokeTimeline events={[
            { month: '신청일', title: '수급자격인정 신청', desc: '고용센터 방문, 대기기간 7일 시작', status: 'normal' },
            { month: '14일 후', title: '1차 실업인정', desc: '7일분 지급 (대기기간 7일 제외)', status: 'current' },
            { month: '6주 후', title: '2차 실업인정', desc: '28일분 지급 (4주 단위)', status: 'normal' },
            { month: '10주 후', title: '3차 실업인정', desc: '28일분 지급 (4주 단위)', status: 'normal' },
            { month: '소정급여일수', title: '수급 종료', desc: '120~270일까지 반복', status: 'warning', tag: '종료' },
          ]} />

          <SpokeStepCards steps={[
            { title: '실업인정일 확인', desc: '고용24에서 다음 실업인정일 확인', tip: '일정 놓치면 해당 기간 미지급' },
            { title: '구직활동 증빙', desc: '입사지원, 면접, 훈련 등 증빙 준비', tip: '1~2건 이상 필요' },
            { title: '실업인정 신청', desc: '고용센터 방문 또는 온라인 신청', tip: '온라인은 고용24에서' },
            { title: '입금 확인', desc: '실업인정 후 2~3일 내 통장 입금', tip: '평일 기준' },
          ]} />

          <p className="text-neutral-600 mb-0">지급 주기를 알았으니, 혹시 입금이 안 되는 경우에는 어떻게 해야 하는지도 정리해뒀어요.</p>
        </>
      ),
      bridgeCTA: { href: '#s4', badge: '입금 지연', title: '입금 예정일이 지났는데 안 들어왔어요', desc: '지연 사유와 대처법', icon: 'info' },
    },

    // --- SECTION 04: 입금 안 될 때 ---
    {
      id: 's4',
      number: '04',
      heading: '실업급여 통장 입금이 안 되면 어떻게 하나요?',
      subtitle: '고용24 확인 후 1350으로 문의하세요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            실업인정 후 3일이 지나도 입금이 안 되면, 먼저 <a href="https://www.work24.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">고용24</a>에 로그인해서 수급내역을 확인해야 해요. "지급 예정"이면 1~2일 더 기다리면 되고, "보류"나 "반려"면 고용센터에 문의해야 해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            입금 지연의 가장 흔한 원인은 <strong>계좌번호 오류</strong>와 <strong>서류 미비</strong>예요. 신청 시 입력한 계좌가 폐쇄됐거나 본인 명의가 아니면 입금이 안 돼요. 고용노동부 고객센터 1350에 전화하면 정확한 원인을 확인할 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            실업인정일에 출석하지 않으면 해당 기간 구직급여가 아예 지급되지 않아요. 부득이한 사유가 있으면 사전에 <a href="/w/실업급여-고용센터-찾기-고용24-사용법" className="text-[#4A7AB5] hover:underline">관할 고용센터</a>에 연기 신청을 해야 해요.
          </p>

          <SpokeChecklist items={[
            { text: '고용24에서 수급내역·지급 상태 확인', done: true, note: 'work24.go.kr' },
            { text: '계좌번호 정확한지 재확인 (본인 명의)', done: true },
            { text: '실업인정일 불참 여부 확인', done: false, note: '불참 시 해당 기간 미지급' },
            { text: '1350 또는 관할 고용센터 전화 문의', done: false, note: '보류·반려 시 필수' },
          ]} />

          <SpokeFlow steps={[
            { icon: '1', label: '고용24 로그인', sub: '수급내역 확인' },
            { icon: '2', label: '지급 상태 확인', sub: '예정·보류·반려' },
            { icon: '3', label: '1350 전화', sub: '원인 파악' },
            { icon: '4', label: '계좌·서류 보완', sub: '재처리 요청' },
          ]} />
        </>
      ),
      bridgeCTA: { href: '/w/실업급여-수급-조건-신청-방법-2026', badge: '전체 보기', title: '실업급여 전체 안내로 돌아가기', desc: '수급 조건부터 신청 방법까지 한눈에', icon: 'grid', primary: true },
    },

    // --- FAQ ---
    {
      id: 's-faq',
      number: '05',
      heading: '자주 묻는 질문',
      subtitle: '',
      content: null,
    },
  ],

  faq: [
    {
      question: '실업급여 대기기간 7일 동안 아르바이트를 해도 되나요?',
      answer: '대기기간 중에 근로를 하면 대기기간이 연장돼요. 예를 들어 대기기간 중 3일을 일하면, 대기기간이 10일로 늘어나요. 수급자격 자체가 취소되진 않지만 첫 입금이 그만큼 늦어져요.',
    },
    {
      question: '실업급여 첫 입금액이 적은 이유가 뭔가요?',
      answer: '첫 입금은 1차 실업인정일까지의 기간(14일)에서 대기기간 7일을 뺀 7일분만 지급돼요. 2차 실업인정부터는 28일분이 한 번에 지급되기 때문에 금액이 커져요.',
    },
    {
      question: '실업급여 입금 시간은 몇 시인가요?',
      answer: '정해진 시간은 없지만, 보통 오전 중에 입금돼요. 은행마다 처리 시간이 달라서 늦으면 오후까지 기다려야 할 수 있어요.',
    },
    {
      question: '실업급여 지급일이 공휴일이면 어떻게 되나요?',
      answer: '토요일·일요일·공휴일에는 입금 처리가 안 돼요. 다음 평일로 자동 연기돼요. 금요일에 실업인정을 받으면 다음 주 화·수요일경 입금돼요.',
    },
  ],

  relatedSpokes: [
    { badge: '실업인정', title: '실업급여 실업인정 구직활동 방법', desc: '실업인정 출석·온라인 신청 방법', href: '/w/실업급여-실업인정-구직활동-방법' },
    { badge: '금액', title: '실업급여 금액 계산 연봉별 수령액', desc: '구직급여일액 계산법과 상한·하한', href: '/w/실업급여-금액-계산-연봉별-수령액' },
    { badge: '세금', title: '실업급여 세금 건강보험 국민연금 처리', desc: '비과세 혜택과 4대보험 처리', href: '/w/실업급여-세금-건강보험-국민연금-처리' },
    { badge: '반복수급', title: '실업급여 반복수급 감액 대기기간 2026', desc: '3회 이상 수급 시 감액·대기 연장', href: '/w/실업급여-반복수급-감액-대기기간-2026-개정' },
  ],

  sources: [
    { name: '고용보험법 제49조 (대기기간)', url: 'https://www.law.go.kr/법령/고용보험법', org: '법제처' },
    { name: '실업급여 안내', url: 'https://www.ei.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePb0201Info.do', org: '고용보험' },
    { name: '고용노동부 고객센터', url: 'https://www.moel.go.kr', org: '고용노동부' },
  ],
}

export default data
