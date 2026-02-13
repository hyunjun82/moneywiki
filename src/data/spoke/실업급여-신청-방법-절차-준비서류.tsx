import Link from 'next/link'
import type { SpokeData } from './types'
import { TipBox, SpokeCompareCards, SpokeTable, SpokeTimeline, SpokeChecklist, SpokeStepCards, SpokeFlow, SpokeRateBars } from '@/components/spoke/SpokeBlocks'

// --- Table data ---
const REQUIRED_DOCS_ROWS = [
  ['이직확인서', '회사 발급', '필수', '퇴사 후 10일 이내 발급'],
  ['신분증', '주민등록증·운전면허증', '필수', '본인 확인용'],
  ['통장사본', '본인 명의', '필수', '급여 입금 계좌'],
  ['증빙서류', '임금체불·부당대우 등', '필요시', '비자발적 퇴사 증명'],
]

const TIMELINE_STEPS_ROWS = [
  ['워크넷 구직등록', '즉시', '온라인 가능'],
  ['수급자격 신청', '1일', '고용센터 방문/온라인'],
  ['자격 심사', '1~2주', '고용센터 개별 심사'],
  ['첫 지급 (7일 대기)', '2~3주', '대기기간 후 지급'],
  ['4주마다 실업인정', '계속', '구직활동 증명 필요'],
]

// --- Spoke Data ---
const data: SpokeData = {
  slug: '실업급여-신청-방법-절차-준비서류',

  meta: {
    title: '실업급여 신청 방법 절차 준비서류 | 고용센터 온라인 접수 안내',
    description: '퇴사하고 실업급여 어떻게 신청하나요? 워크넷 구직등록부터 고용센터 방문까지 단계별로 알려드려요',
    keywords: ['실업급여 신청 방법 절차 준비서류', '실업급여 온라인 신청 고용24', '실업급여 대리신청 방법', '퇴사 후 실업급여 신청 기간 기한'],
    ogTitle: '실업급여 신청 방법 절차 준비서류 | 고용센터 온라인 접수 안내 | 머니위키',
    ogDescription: '워크넷 구직등록부터 고용센터 신청까지 단계별 안내',
  },

  hub: {
    url: '/w/실업급여-신청-조건-금액-기간-총정리-2026',
    name: '실업급여 완전정복 가이드',
  },

  breadcrumb: ['실업급여', '신청 방법'],

  hero: {
    badge: '2026년 기준',
    h1: <><span className="text-[#1E3A5F]">실업급여 신청 방법</span> 절차 준비서류</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          퇴사하고 실업급여를 받으려는데, 어디서 어떻게 신청해야 하는지 막막하셨죠?
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          <strong className="text-neutral-800">실업급여 신청</strong>은 크게 3단계예요. <strong className="text-neutral-800">워크넷 구직등록</strong> → <strong className="text-neutral-800">관할 고용센터 수급자격 신청</strong> → <strong className="text-neutral-800">4주마다 실업인정</strong>을 받으면 돼요.
          <a href="https://www.work.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">워크넷</a>과 <a href="https://www.ei.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">고용보험</a> 사이트에서 온라인으로도 가능해요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          쉽게 말해서, 워크넷에서 구직 등록하고, 고용센터에 이직확인서와 신분증을 제출하면 심사 후 1~2주 내에 자격 인정 여부가 결정돼요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          먼저 신청 절차 5단계를 정확히 확인해볼게요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '실업급여',
      desc: '실업급여 완전정복 가이드 전체 보기',
    },
  },

  toc: [
    { id: 's1', text: '실업급여 신청 절차 5단계 정리' },
    { id: 'tbl1', text: '단계별 소요시간', sub: true },
    { id: 's2', text: '필요 서류와 구비서류 체크리스트' },
    { id: 'tbl2', text: '준비서류 상세', sub: true },
    { id: 's3', text: '온라인 신청 방법 고용24 이용법' },
    { id: 's4', text: '퇴사 후 신청 기한과 대리신청' },
    { id: 's5', text: '자주 묻는 질문' },
  ],

  sections: [
    // --- Section 01: 신청 절차 5단계 → TipBox + SpokeCompareCards ---
    {
      id: 's1',
      number: '01',
      heading: '실업급여 신청 절차 5단계 정리',
      subtitle: '워크넷 구직등록부터 실업인정까지예요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            <strong>실업급여 신청 절차</strong>는 5단계예요. <strong>1단계: 워크넷 구직등록</strong> → <strong>2단계: 관할 고용센터 수급자격 신청</strong> → <strong>3단계: 자격 심사 (1~2주)</strong> → <strong>4단계: 7일 대기 후 첫 지급</strong> → <strong>5단계: 4주마다 실업인정</strong>이에요.
            <a href="https://www.ei.go.kr/ei/eih/eg/pb/pbPersonRecptnManual/retrievePbPersonRecptnManual.do" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">고용보험 수급자격 인정 매뉴얼</a>에서 전체 절차를 확인할 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            1단계는 워크넷에서 온라인으로 구직 등록하는 거예요. 이력서를 작성하고, 희망 직종을 선택하면 돼요. 소요시간은 10~20분 정도예요.
            2단계는 관할 고용센터(사업장 소재지 또는 거주지)에 이직확인서, 신분증, 통장사본을 제출하면 돼요. 방문 또는 온라인 접수 가능해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            3단계는 고용센터에서 자격 요건을 심사하는 기간이고, 4단계는 자격 인정 후 7일 대기기간을 거쳐 첫 실업급여가 지급돼요.
            5단계는 4주마다 고용센터를 방문하거나 온라인으로 실업인정을 받고 구직활동을 증명해야 계속 받을 수 있어요.
          </p>

          <TipBox title="실업급여 신청 5단계 요약">
            <ul className="list-disc pl-5 space-y-1">
              <li>1단계: 워크넷 구직등록 (온라인, 10~20분)</li>
              <li>2단계: 고용센터 수급자격 신청 (방문/온라인)</li>
              <li>3단계: 자격 심사 (1~2주 소요)</li>
              <li>4단계: 7일 대기 후 첫 지급</li>
              <li>5단계: 4주마다 실업인정 + 구직활동 증명</li>
            </ul>
          </TipBox>

          <SpokeCompareCards cards={[
            { title: '온라인 신청', subtitle: '고용보험 사이트', items: ['24시간 접수 가능', '방문 불필요', '서류 업로드만'], recommended: true, recLabel: '추천' },
            { title: '방문 신청', subtitle: '관할 고용센터', items: ['대면 상담 가능', '서류 직접 제출', '평일 9~18시'], recommended: false },
          ]} />

          <SpokeTable
            id="tbl1"
            title="실업급여 신청 단계별 소요시간"
            subtitle="2026년 기준"
            headers={['단계', '소요시간', '방법']}
            rows={TIMELINE_STEPS_ROWS}
            highlightCol={1}
          />

          <p className="text-neutral-600 mb-0">신청 절차는 알았는데, 준비해야 할 서류가 뭔지 정확히 확인해야 해요.</p>
        </>
      ),
      bridgeCTA: { href: '#s2', badge: '준비서류', title: '무슨 서류를 준비해야 하나요?', desc: '구비서류 체크리스트', icon: 'grid' },
    },

    // --- Section 02: 준비서류 → SpokeTable + SpokeTimeline ---
    {
      id: 's2',
      number: '02',
      heading: '필요 서류와 구비서류 체크리스트',
      subtitle: '이직확인서, 신분증, 통장사본 3가지가 기본이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            <strong>실업급여 신청 필수 서류</strong>는 <strong>이직확인서</strong>, <strong>신분증</strong>, <strong>본인 명의 통장사본</strong> 3가지예요.
            이직확인서는 퇴사 후 회사에 요청하면 10일 이내에 발급해줘야 하고, 신분증은 주민등록증이나 운전면허증, 통장사본은 급여를 입금받을 계좌 정보예요. <a href="https://www.ei.go.kr/ei/eih/eg/pb/pbPersonRecptnManual/retrievePbPersonRecptnManual.do" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">고용보험 신청 안내</a>에서 확인할 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            비자발적 퇴사 증빙 자료는 퇴사 사유에 따라 추가로 필요할 수 있어요.
            임금체불이면 체불 증명서, 부당대우면 녹취록이나 메신저 캡처, 사업장 이전이면 거리 증명 자료가 필요해요. 정당한 사유가 있는 자발적 퇴사도 증빙 자료를 준비해야 해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            이직확인서는 회사가 발급해주지 않으면 직접 고용센터에 요청할 수 있어요.
            회사가 발급 의무를 위반하면 과태료가 부과되니까 대부분 발급해줘요. 온라인 신청은 서류를 스캔하거나 사진으로 찍어서 업로드하면 돼요.
          </p>

          <SpokeTable
            id="tbl2"
            title="실업급여 신청 준비서류 상세"
            subtitle="2026년 기준"
            headers={['서류', '발급처', '필수 여부', '비고']}
            rows={REQUIRED_DOCS_ROWS}
            highlightCol={2}
          />

          <SpokeTimeline events={[
            { month: '퇴사', title: '이직확인서 요청', desc: '회사에 이직확인서 요청' },
            { month: '10일 이내', title: '이직확인서 발급', desc: '회사가 이직확인서 발급', status: 'current' },
            { month: '워크넷 등록', title: '구직 등록', desc: '구직 등록 완료' },
            { month: '서류 제출', title: '신청 서류 준비', desc: '이직확인서 + 신분증 + 통장사본' },
          ]} />

          <p className="text-neutral-600 mb-0">서류 준비는 확인했고, 이제 온라인으로 어떻게 신청하는지 단계별로 알아볼게요.</p>
        </>
      ),
      bridgeCTA: { href: '#s3', badge: '온라인 신청', title: '온라인으로는 어떻게 신청하나요?', desc: '고용24 이용법 단계별 안내', icon: 'info' },
    },

    // --- Section 03: 온라인 신청 → SpokeChecklist + SpokeStepCards ---
    {
      id: 's3',
      number: '03',
      heading: '온라인 신청 방법 고용24 이용법',
      subtitle: '고용보험 사이트에서 24시간 가능해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            <strong>실업급여 온라인 신청</strong>은 <a href="https://www.ei.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">고용보험 홈페이지(고용24)</a>에서 24시간 가능해요.
            회원가입 → 로그인 → "실업급여 수급자격 신청" 메뉴 → 서류 업로드 → 신청 완료 순서로 진행하면 돼요. 공동인증서나 간편인증(카카오, 네이버 등)으로 로그인할 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            온라인 신청은 워크넷 구직등록을 먼저 해야 하고, 이직확인서는 회사가 온라인으로 발급하거나 PDF 파일로 업로드하면 돼요.
            신분증과 통장사본은 사진으로 찍어서 업로드하고, 비자발적 퇴사 증빙 자료가 있으면 함께 첨부하면 돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            신청 후 1~2주 내에 고용센터에서 자격 심사 결과를 알려주고, 인정되면 7일 대기기간을 거쳐 첫 실업급여가 입금돼요.
            4주마다 실업인정은 온라인으로도 가능하니까, 방문 없이 전 과정을 온라인으로 처리할 수 있어요.
          </p>

          <SpokeChecklist items={[
            { text: '워크넷 구직등록 완료', done: true },
            { text: '고용보험 홈페이지 로그인', done: true },
            { text: '실업급여 수급자격 신청 메뉴', done: true },
            { text: '서류 업로드 (이직확인서·신분증·통장)', done: true, note: 'PDF나 사진' },
            { text: '신청 완료 → 심사 대기', done: false, note: '1~2주 소요' },
          ]} />

          <SpokeStepCards steps={[
            { title: '1단계', desc: '고용보험 홈페이지 접속', tip: 'www.ei.go.kr' },
            { title: '2단계', desc: '공동인증서 또는 간편인증 로그인', tip: '카카오·네이버 가능' },
            { title: '3단계', desc: '실업급여 수급자격 신청 메뉴', tip: '메인 화면에서 선택' },
            { title: '4단계', desc: '서류 업로드', tip: '이직확인서·신분증·통장사본' },
            { title: '5단계', desc: '신청 완료', tip: '심사 결과 1~2주 내 통보' },
          ]} />

          <p className="text-neutral-600 mb-0">온라인 신청 방법은 확인했고, 이제 퇴사 후 언제까지 신청해야 하는지 알아봐야 해요.</p>
        </>
      ),
      bridgeCTA: { href: '#s4', badge: '신청 기한', title: '퇴사 후 언제까지 신청해야 하나요?', desc: '신청 기한과 대리신청 안내', icon: 'grid' },
    },

    // --- Section 04: 신청 기한·대리신청 → SpokeFlow + SpokeRateBars ---
    {
      id: 's4',
      number: '04',
      heading: '퇴사 후 신청 기한과 대리신청',
      subtitle: '12개월 이내 신청, 대리신청도 가능해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            <strong>실업급여 신청 기한</strong>은 <strong>퇴사일 다음 날부터 12개월 이내</strong>예요.
            12개월이 지나면 수급 자격을 상실하니까, 퇴사 후 최대한 빨리 신청하는 게 좋아요. <a href="https://www.law.go.kr/법령/고용보험법" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">고용보험법 제42조</a>에서 명확히 규정하고 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            대리신청은 본인이 직접 방문하기 어려울 때 가족이나 대리인이 신청할 수 있어요.
            대리인 신분증, 본인 신분증 사본, 위임장이 추가로 필요하고, 고용센터 방문으로만 가능해요. 온라인 대리신청은 안 돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            신청 지연 사유가 정당하면(질병, 입원 등) 12개월 이후에도 예외적으로 인정될 수 있지만, 고용센터에서 개별 심사해요.
            질병·입원 등으로 늦어졌다면 진단서나 입원확인서를 제출해야 해요.
          </p>

          <SpokeFlow steps={[
            { icon: '📅', label: '퇴사일', sub: '이직일' },
            { icon: '📋', label: '구직등록', sub: '워크넷' },
            { icon: '📎', label: '신청', sub: '12개월 이내' },
            { icon: '🔍', label: '심사', sub: '1~2주' },
            { icon: '💰', label: '지급', sub: '7일 대기 후' },
          ]} />

          <SpokeRateBars bars={[
            { label: '신청 기한 (퇴사 후)', rate: '12개월 이내', width: '100%' },
            { label: '심사 기간', rate: '1~2주', width: '15%' },
            { label: '대기 기간', rate: '7일', width: '8%' },
            { label: '첫 지급', rate: '약 2~3주 후', width: '25%' },
          ]} />

          <p className="text-neutral-600 mb-0">신청 기한과 대리신청까지 확인했으니, 이제 자주 묻는 질문들을 정리해볼게요.</p>
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
    { question: '실업급여 신청 후 취업하면 어떻게 되나요?', answer: '즉시 고용센터에 신고해야 해요. 조기재취업수당을 받을 수 있고, 신고하지 않으면 부정수급으로 처벌받을 수 있어요.' },
    { question: '이직확인서를 회사가 안 주면 어떻게 하나요?', answer: '고용센터에 직접 요청하면 돼요. 고용센터가 회사에 발급을 요구하고, 회사가 거부하면 과태료가 부과돼요.' },
  ],

  relatedSpokes: [
    { badge: '실업급여', title: '실업급여 수급 조건 자격 요건 완벽정리', desc: '실업급여 받을 수 있는 조건 확인', href: '/w/실업급여-수급-조건-자격-요건-완벽정리' },
    { badge: '실업급여', title: '실업급여 금액 계산 연봉별 수령액', desc: '내 연봉으로 얼마 받는지 계산', href: '/w/실업급여-금액-계산-연봉별-수령액' },
  ],

  sources: [
    { name: '고용보험법 제42조', url: 'https://www.law.go.kr/법령/고용보험법', org: '법제처' },
    { name: '고용보험 수급자격 인정 매뉴얼', url: 'https://www.ei.go.kr/ei/eih/eg/pb/pbPersonRecptnManual/retrievePbPersonRecptnManual.do', org: '고용보험' },
    { name: '워크넷 구직등록', url: 'https://www.work.go.kr', org: '워크넷' },
  ],
}

export default data
