import type { SpokeData } from '@/data/spoke/types'
import {
  SpokeTable,
  TipBox,
  Steps,
  SpokeFlow,
  SpokeChecklist,
  SpokeStepCards,
  FormulaBox,
  WarnBox,
} from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '실업급여-신청-방법-절차-준비서류',

  meta: {
    title: '실업급여 신청 방법 절차 준비서류 | 워크넷 고용센터 접수 안내',
    description: '퇴사 후 실업급여 신청 절차와 준비서류를 정리했어요. 워크넷 구직등록부터 고용센터 접수까지 확인하세요.',
    keywords: [
      '실업급여 신청 방법 절차',
      '실업급여 준비서류 이직확인서',
      '실업급여 워크넷 구직등록 방법',
      '실업급여 고용센터 방문 절차',
    ],
    ogTitle: '실업급여 신청 방법 절차 준비서류 | 머니위키',
    ogDescription: '워크넷 구직등록부터 고용센터 방문까지 단계별 안내',
  },

  hub: {
    url: '/w/실업급여-수급-조건-신청-방법-2026',
    name: '실업급여 수급 조건 신청 방법 가이드',
  },

  breadcrumb: ['고용보험', '실업급여', '신청 방법'],

  summary3: [
    <>실업급여 신청은 <strong>워크넷 구직등록 → 고용센터 수급자격 신청 → 실업인정</strong> 3단계예요</>,
    <>준비서류는 <strong>이직확인서, 신분증, 본인 명의 통장사본</strong> 3가지가 기본이에요</>,
    <>신청 기한은 <strong>퇴사일 다음 날부터 12개월 이내</strong>이고, 넘기면 수급 자격을 잃어요</>,
  ],

  sourceBar: {
    badge: '출처',
    name: '고용보험법 제42조 / 고용노동부',
    date: '2026.02',
  },

  prevNext: {
    prev: { title: '실업급여 수급기간 소정급여일수', href: '/w/실업급여-수급기간-소정급여일수-기준' },
    next: { title: '실업급여 실업인정 구직활동 방법', href: '/w/실업급여-실업인정-구직활동-방법' },
  },

  stickyBar: {
    topLabel: '신청 기한',
    value: '퇴사 후 12개월',
    buttonText: '신청 절차 보기 →',
    scrollTo: '#s1',
  },

  hero: {
    badge: '2026년 기준',
    h1: (
      <>
        <span className="text-[#1E3A5F]">실업급여 신청 방법</span> 절차 준비서류 안내
      </>
    ),
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          퇴사하고 나면 뭐부터 해야 하는지 막막하셨을 거예요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          <strong className="text-neutral-800">실업급여 신청</strong>은 크게 <strong className="text-neutral-800">워크넷 구직등록</strong>, <strong className="text-neutral-800">고용센터 수급자격 신청</strong>, <strong className="text-neutral-800">실업인정</strong> 3단계로 나뉘어요.
          <a href="https://www.work24.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">고용24(work24.go.kr)</a>에서 온라인으로도 진행할 수 있어요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          신청 기한은 퇴사일 다음 날부터 <strong className="text-neutral-800">12개월 이내</strong>이고, 이직확인서와 신분증, 통장사본만 있으면 바로 접수가 가능해요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          먼저 신청 절차 5단계부터 같이 볼게요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '실업급여',
      desc: '실업급여 수급 조건·금액·기간 전체 가이드',
    },
  },

  toc: [
    { id: 's1', label: '실업급여 신청 방법과 절차는 어떻게 되나요?' },
    { id: 's2', label: '실업급여 준비서류와 이직확인서는 어떻게 챙기나요?' },
    { id: 's3', label: '실업급여 워크넷 구직등록은 어떻게 하나요?' },
    { id: 's4', label: '실업급여 고용센터 방문 절차는 어떤 순서인가요?' },
    { id: 's-faq', label: '자주 묻는 질문' },
  ],

  sections: [
    // --- SECTION 01: 신청 방법과 절차 ---
    {
      id: 's1',
      number: '01',
      heading: '실업급여 신청 방법과 절차는 어떻게 되나요?',
      subtitle: '워크넷 등록부터 실업인정까지 5단계예요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            <strong>실업급여 신청 절차</strong>는 총 5단계예요. 먼저 워크넷에서 구직등록을 하고, 관할 고용센터에 수급자격을 신청해요. 자격 심사를 거친 뒤 7일 대기기간이 지나면 첫 실업급여가 입금되고, 이후 1~4주마다 실업인정을 받으면 계속 수급할 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            온라인과 방문 두 가지 방법이 있어요. <a href="https://www.work24.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">고용24</a>를 이용하면 워크넷 구직등록부터 수급자격 신청, 실업인정까지 전부 온라인으로 처리할 수 있어요. 다만 처음 신청할 때는 고용센터를 직접 방문하는 게 정확해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            신청 기한은 <strong>퇴사일 다음 날부터 12개월 이내</strong>예요. <a href="https://www.law.go.kr/법령/고용보험법" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">고용보험법 제42조</a>에 따르면 12개월이 지나면 소정급여일수가 남아 있어도 더 이상 받을 수 없어요. 퇴사 후 최대한 빨리 신청하는 게 유리해요.
          </p>

          <Steps
            items={[
              { title: '워크넷 구직등록', desc: '워크넷(work.go.kr)에서 이력서 작성 + 구직 신청. 10~20분 소요' },
              { title: '고용센터 수급자격 신청', desc: '거주지 관할 고용센터에 이직확인서·신분증·통장사본 제출' },
              { title: '수급자격 심사', desc: '고용센터에서 비자발적 이직 여부 등 심사. 1~2주 소요' },
              { title: '7일 대기기간 후 첫 지급', desc: '자격 인정 후 7일 대기기간을 거쳐 첫 실업급여 입금' },
              { title: '실업인정 (1~4주 주기)', desc: '고용센터 방문 또는 온라인으로 구직활동 증명하면 계속 수급' },
            ]}
          />

          <SpokeFlow steps={[
            { icon: '📝', label: '구직등록', sub: '워크넷' },
            { icon: '🏢', label: '수급 신청', sub: '고용센터' },
            { icon: '🔍', label: '자격 심사', sub: '1~2주' },
            { icon: '⏳', label: '대기기간', sub: '7일' },
            { icon: '💰', label: '급여 지급', sub: '1~4주 주기' },
          ]} />

          <p className="text-neutral-600 mb-0">절차를 알았으니, 어떤 서류를 준비해야 하는지 궁금하실 거예요.</p>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '서류',
        title: '신청할 때 무슨 서류가 필요한가요?',
        desc: '이직확인서부터 추가 증빙까지 체크리스트',
        icon: 'grid',
      },
    },

    // --- SECTION 02: 준비서류 ---
    {
      id: 's2',
      number: '02',
      heading: '실업급여 준비서류와 이직확인서는 어떻게 챙기나요?',
      subtitle: '기본 3가지 + 퇴사 사유별 추가 서류가 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            <strong>실업급여 신청에 필요한 기본 서류</strong>는 <strong>이직확인서</strong>, <strong>신분증</strong>, <strong>본인 명의 통장사본</strong> 3가지예요. 이직확인서는 퇴사할 때 회사가 고용보험 시스템에 등록해주는 서류인데, 회사가 <strong>10일 이내</strong>에 발급해야 할 의무가 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            만약 회사가 이직확인서를 안 내주면 고용센터에 직접 요청하면 돼요. 고용센터가 회사에 발급을 독촉하고, 회사가 거부하면 <strong>과태료 300만원</strong>이 부과돼요. 그러니까 대부분의 회사는 요청하면 발급해줘요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            비자발적 퇴사를 증명해야 하는 경우에는 <strong>추가 서류</strong>가 필요해요. 임금체불이면 체불 임금 확인서, 직장 내 괴롭힘이면 녹취록이나 메신저 캡처, 사업장 이전이면 통근거리 증빙 자료를 준비하면 돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            온라인 신청은 서류를 사진이나 PDF로 찍어서 업로드하면 돼요. 해상도가 낮으면 반려될 수 있으니까 글씨가 잘 보이게 촬영하는 게 중요해요.
          </p>

          <SpokeTable
            id="tbl-docs"
            title="실업급여 신청 준비서류 목록"
            subtitle="2026년 고용보험법 기준"
            headers={['서류', '발급처', '필수 여부', '비고']}
            rows={[
              ['이직확인서', '전 직장 (고용보험 등록)', '필수', '퇴사 후 10일 이내 발급 의무'],
              ['신분증', '주민등록증·운전면허증', '필수', '본인 확인용'],
              ['통장사본', '본인 명의 계좌', '필수', '급여 입금 계좌'],
              ['수급자격 인정신청서', '고용센터 작성', '필수', '고용센터 방문 시 작성'],
              ['퇴사 증빙서류', '상황별 상이', '해당 시', '체불확인서·녹취록 등'],
            ]}
            highlightCol={2}
          />

          <SpokeChecklist items={[
            { text: '이직확인서 발급 확인 (회사에 요청)', done: true },
            { text: '신분증 준비 (주민등록증 또는 운전면허증)', done: true },
            { text: '본인 명의 통장사본 준비', done: true },
            { text: '비자발적 퇴사 증빙서류 (해당 시)', done: false, note: '임금체불·괴롭힘·사업장이전 등' },
            { text: '온라인 신청 시 서류 스캔/촬영', done: false, note: '글씨 선명하게' },
          ]} />

          <p className="text-neutral-600 mb-0">서류가 준비됐으면, 첫 번째 단계인 워크넷 구직등록 방법이 궁금하실 거예요.</p>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '구직등록',
        title: '워크넷 구직등록은 어떻게 하나요?',
        desc: '온라인 구직등록 단계별 안내',
        icon: 'info',
      },
    },

    // --- SECTION 03: 워크넷 구직등록 ---
    {
      id: 's3',
      number: '03',
      heading: '실업급여 워크넷 구직등록은 어떻게 하나요?',
      subtitle: '워크넷 홈페이지에서 10~20분이면 끝나요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            실업급여를 신청하려면 <strong>가장 먼저 워크넷에서 구직등록</strong>을 해야 해요. <a href="https://www.work.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">워크넷(work.go.kr)</a>에 접속해서 회원가입 → 이력서 작성 → 구직 신청 순서로 진행하면 돼요. 소요시간은 10~20분 정도예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            구직등록을 할 때 이력서를 작성하고 희망 직종과 근무 지역을 선택하면 돼요. 이력서는 간략하게 작성해도 괜찮고, 나중에 수정할 수 있어요. 구직등록 확인증은 출력하거나 저장해두면 고용센터 방문 시 편리해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            구직 신청의 유효기간은 <strong>3개월</strong>이에요. 실업급여 수급 기간이 3개월을 넘기면 갱신이 필요할 수 있어요. 로그인은 공동인증서 또는 간편인증(카카오, 네이버 등)으로 할 수 있어요.
          </p>

          <SpokeStepCards steps={[
            { title: '워크넷 접속', desc: 'www.work.go.kr에 접속해요', tip: '고용24(work24.go.kr)에서도 가능' },
            { title: '회원가입 + 로그인', desc: '공동인증서 또는 간편인증 사용', tip: '카카오·네이버·PASS 가능' },
            { title: '이력서 작성', desc: '학력·경력·희망 직종을 입력해요', tip: '간략하게 작성해도 OK' },
            { title: '구직 신청 완료', desc: '희망 근무지역 선택 후 구직 신청', tip: '확인증 출력·저장 권장' },
          ]} />

          <TipBox title="워크넷 구직등록 유효기간 3개월">
            구직 신청 후 3개월이 지나면 갱신해야 해요. 실업급여 수급 기간이 길면 중간에 한 번 갱신하게 되는데, 워크넷에 로그인해서 연장 버튼만 누르면 돼요.
          </TipBox>

          <p className="text-neutral-600 mb-0">구직등록까지 끝났으면, 이제 고용센터에 방문해서 수급자격을 신청해야 해요.</p>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '고용센터',
        title: '고용센터에서는 뭘 하나요?',
        desc: '방문 절차와 수급자격 인정 과정',
        icon: 'check',
      },
    },

    // --- SECTION 04: 고용센터 방문 절차 ---
    {
      id: 's4',
      number: '04',
      heading: '실업급여 고용센터 방문 절차는 어떤 순서인가요?',
      subtitle: '설명회 참석 → 신청서 작성 → 심사 → 지급 순이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            워크넷 구직등록을 마쳤으면 <strong>거주지 관할 고용센터</strong>에 방문해야 해요. 전국에 100곳 넘는 고용센터가 있는데, <a href="/w/실업급여-고용센터-찾기-고용24-사용법" className="text-[#4A7AB5] underline">고용24에서 관할 센터를 검색</a>할 수 있어요. 거주지 관할이 원칙이지만, 교통이 불편하면 인근 센터에서도 신청 가능해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            고용센터에 도착하면 먼저 <strong>실업급여 신청자 취업지원 설명회</strong>에 참석해요. 수급 요건, 실업인정 방법, 부정수급 주의사항 등을 안내받고, 이후 <strong>수급자격 인정신청서</strong>와 재취업활동계획서를 작성해서 제출하면 돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            심사는 <strong>1~2주</strong> 정도 걸려요. 비자발적 이직 여부, 피보험기간 충족 여부 등을 확인한 뒤 수급자격 인정 여부를 통보해줘요. 인정되면 <strong>수급자격증</strong>을 받고, 불인정이면 불인정 통지서와 함께 사유를 안내받아요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            수급자격이 인정되면 <strong>7일 대기기간</strong>을 거쳐 첫 실업급여가 입금돼요. 이후에는 1~4주마다 <a href="/w/실업급여-실업인정-구직활동-방법" className="text-[#4A7AB5] underline">실업인정</a>을 받으며 구직활동을 증명해야 계속 수급할 수 있어요. 대리신청은 본인이 방문하기 어려울 때 가족이 위임장과 함께 방문하면 가능해요.
          </p>

          <FormulaBox
            lines={[
              { text: '고용센터 방문 순서', comment: true },
              { text: '설명회 참석 → 신청서 작성 → 심사(1~2주) → 7일 대기 → 지급' },
            ]}
          />

          <WarnBox>
            <strong>신청 기한 주의:</strong> 퇴사일 다음 날부터 <strong>12개월을 넘기면</strong> 소정급여일수가 남아 있어도 실업급여를 받을 수 없어요. 질병·입원 등 정당한 사유가 있으면 예외 인정이 될 수 있지만, 진단서를 제출해야 해요.
          </WarnBox>

          <p className="text-neutral-600 mb-0">고용센터 방문까지 마치면, 이제 궁금한 점들을 정리해볼게요.</p>
        </>
      ),
      bridgeCTA: {
        href: '/w/실업급여-수급-조건-신청-방법-2026',
        badge: '가이드',
        title: '실업급여 전체 가이드 보기',
        desc: '수급 조건, 금액 계산, 수급기간까지 한 번에 확인',
        icon: 'info',
        primary: true,
      },
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
      question: '실업급여 신청 후 취업하면 어떻게 되나요?',
      answer: '즉시 고용센터에 신고해야 해요. 수급일수의 1/2 이상 남은 상태에서 재취업하면 <strong>조기재취업수당</strong>을 받을 수 있어요. 신고하지 않으면 부정수급으로 처벌받을 수 있어요.',
    },
    {
      question: '이직확인서를 회사가 발급해주지 않으면 어떻게 하나요?',
      answer: '고용센터에 직접 요청하면 돼요. 고용센터가 회사에 발급을 독촉하고, 이를 거부하면 <strong>과태료 300만원</strong>이 부과돼요. 대부분의 회사는 요청하면 발급해줘요.',
    },
    {
      question: '퇴사 후 12개월이 거의 다 됐는데 아직 신청 안 했어요',
      answer: '12개월 넘기면 수급 자격을 잃으니까 <strong>즉시 신청</strong>하세요. 질병·입원 등 정당한 사유가 있었다면 진단서를 첨부해서 예외 인정을 요청할 수 있어요.',
    },
    {
      question: '고용센터 방문 없이 온라인만으로 신청할 수 있나요?',
      answer: '고용24(work24.go.kr)에서 워크넷 구직등록, 수급자격 신청, 실업인정까지 <strong>전부 온라인</strong>으로 처리 가능해요. 단, 추가 서류 제출이나 대면 상담이 필요하면 방문이 필요할 수 있어요.',
    },
  ],

  relatedSpokes: [
    { badge: '조건', title: '실업급여 수급 조건 자격 요건 확인', desc: '비자발적 이직·피보험기간 180일 요건 정리', href: '/w/실업급여-수급-조건-자격-요건-완벽정리' },
    { badge: '실업인정', title: '실업급여 실업인정 구직활동 방법', desc: '실업인정일 출석과 구직활동 인정 기준', href: '/w/실업급여-실업인정-구직활동-방법' },
    { badge: '고용센터', title: '실업급여 고용센터 찾기 고용24 사용법', desc: '관할 고용센터 검색과 온라인 서비스 안내', href: '/w/실업급여-고용센터-찾기-고용24-사용법' },
  ],

  sources: [
    { name: '고용보험법 제42조 (신청기한)', url: 'https://www.law.go.kr/법령/고용보험법', org: '법제처' },
    { name: '구직급여 수급신청 안내', url: 'https://www.easylaw.go.kr/CSP/CnpClsMainBtr.laf?popMenu=ov&csmSeq=722&ccfNo=2&cciNo=2&cnpClsNo=1', org: '찾기쉬운 생활법령정보' },
    { name: '고용24 실업급여 안내', url: 'https://www.work24.go.kr', org: '고용노동부' },
  ],
}

export default data
