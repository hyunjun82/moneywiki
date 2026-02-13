import type { SpokeData } from '@/data/spoke/types'
import {
  SpokeTable,
  FormulaBox,
  TipBox,
  SpokeTimeline,
  SpokeStepCards,
  SpokeCompareCards,
  SpokeFlow,
  SpokeChecklist,
} from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '실업급여-실업인정-구직활동-방법',

  meta: {
    title: '실업급여 실업인정 구직활동 방법 | 온라인 출석 인정 기준',
    description: '실업인정일에 빠지면 그 기간 급여가 안 나와요. 온라인·오프라인 실업인정 방법과 구직활동 인정 기준을 정리했어요.',
    keywords: [
      '실업급여 실업인정 방법 절차',
      '실업급여 구직활동 인정 기준',
      '실업급여 온라인 실업인정 신청',
      '실업급여 실업인정일 출석 방법',
    ],
    ogTitle: '실업급여 실업인정 구직활동 방법 | 머니위키',
    ogDescription: '실업인정 출석 주기와 구직활동 인정 기준을 확인하세요.',
  },

  hub: {
    url: '/w/실업급여-수급-조건-신청-방법-2026',
    name: '실업급여 수급 조건 신청 방법 2026',
  },

  breadcrumb: ['고용·노동', '실업급여', '실업인정 구직활동'],

  summary3: [
    <>실업인정은 <strong>1~4주마다</strong> 실업 상태와 구직활동을 확인받는 절차예요</>,
    <>1차·4차는 고용센터 <strong>출석 필수</strong>, 나머지 회차는 온라인 가능해요</>,
    <>5차부터 4주간 <strong>재취업활동 2회</strong>(구직활동 1회 필수)를 해야 해요</>,
  ],

  sourceBar: {
    badge: '출처',
    name: '고용보험법 제44조·시행규칙 제101조',
    date: '2026.02',
  },

  prevNext: {
    prev: { title: '실업급여 신청 방법 절차 준비서류', href: '/w/실업급여-신청-방법-절차-준비서류' },
    next: { title: '실업급여 지급일 첫 입금일 대기기간', href: '/w/실업급여-지급일-첫-입금일-대기기간' },
  },

  stickyBar: {
    topLabel: '실업인정 주기',
    value: '1~4주 단위',
    buttonText: '인정 기준 확인 →',
    scrollTo: '#s2',
  },

  hero: {
    badge: '2026년 기준',
    h1: (
      <>
        실업급여 <span className="text-[#1E3A5F]">실업인정</span> 구직활동 방법과 출석 기준
      </>
    ),
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          실업급여를 받고 있는데 실업인정일마다 뭘 해야 하는지 막막하셨다면 잘 오셨어요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          실업인정은 <strong className="text-neutral-800">1~4주 단위</strong>로 고용센터에서 &quot;정말 구직활동을 하고 있는지&quot; 확인하는 절차예요.
          1차와 4차는 <strong className="text-neutral-800">고용센터 출석 필수</strong>이고, 나머지는 온라인으로 가능해요.
          <a href="/w/실업급여-수급-조건-신청-방법-2026" className="text-[#4A7AB5] underline">실업급여 전체 안내</a>도 함께 참고해 보세요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          먼저 실업인정 제도가 어떤 구조인지부터 살펴볼게요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '실업급여 수급 조건·신청 방법·금액 총정리',
    },
  },

  toc: [
    { id: 's1', label: '실업급여 실업인정 방법과 절차는 어떻게 되나요?' },
    { id: 's2', label: '실업급여 구직활동 인정 기준은 무엇인가요?' },
    { id: 's3', label: '실업급여 온라인 실업인정은 어떻게 신청하나요?' },
    { id: 's4', label: '실업급여 실업인정일 출석 못 하면 어떻게 되나요?' },
    { id: 's-faq', label: '자주 묻는 질문' },
  ],

  sections: [
    // --- SECTION 01: 실업인정 제도 절차 ---
    {
      id: 's1',
      number: 'SECTION 01',
      heading: '실업급여 실업인정 방법과 절차는 어떻게 되나요?',
      subtitle: '1~4주마다 고용센터 확인을 받아야 급여가 지급돼요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            실업인정은 <strong>&quot;아직 실업 상태이고, 적극적으로 구직활동을 하고 있다&quot;</strong>는 걸 고용센터에서 확인받는 절차예요.
            고용보험법 제44조에 따라 실업인정을 받은 날에 대해서만 구직급여가 지급돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            수급자격 신청 후 약 <strong>14일 뒤</strong>에 1차 실업인정일이 잡혀요.
            그 뒤로는 1~4주 간격으로 정기적으로 실업인정을 받아야 해요.
            회차마다 요구되는 재취업활동 횟수가 달라지니 아래 표를 꼭 확인하세요.
          </p>

          <SpokeTable
            id="tbl-round"
            title="회차별 실업인정 요건"
            subtitle="고용보험법 시행규칙 제101조 기준"
            headers={['회차', '재취업활동 횟수', '출석/온라인', '비고']}
            rows={[
              ['1차', '없음 (취업특강 수강)', '출석 필수', '수급자격 교육 이수'],
              ['2~3차', '1회 이상', '온라인 가능', '구직활동 또는 구직외활동'],
              ['4차', '1회 이상', '출석 필수', '취업지원 상담 병행'],
              ['5차 이후', '2회 이상 (구직 1회 필수)', '온라인 가능', '입사지원 1회 필수 포함'],
            ]}
            highlightCol={1}
          />

          <SpokeTimeline events={[
            { month: '신청일', title: '수급자격 신청', desc: '고용센터 방문 또는 고용24 접수', status: 'normal' },
            { month: '약 14일 후', title: '1차 실업인정', desc: '출석 필수 + 취업특강 수강', status: 'current' },
            { month: '약 28일 후', title: '2차 실업인정', desc: '재취업활동 1회 이상', status: 'normal' },
            { month: '약 42일 후', title: '3차 실업인정', desc: '재취업활동 1회 이상', status: 'normal' },
            { month: '약 56일 후', title: '4차 실업인정', desc: '출석 필수 + 재취업활동 1회', status: 'warning' },
            { month: '이후 4주마다', title: '5차~ 정기 인정', desc: '재취업활동 2회 (구직 1회 필수)', status: 'normal' },
          ]} />

          <p className="text-neutral-600 mb-0">
            회차별 기준을 알았으니, 구체적으로 어떤 활동이 인정되는지 궁금해지잖아요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '인정 기준',
        title: '어떤 활동을 해야 구직활동으로 인정되나요?',
        desc: '입사지원, 면접, 교육 등 인정되는 활동 목록 확인',
        icon: 'grid',
      },
    },

    // --- SECTION 02: 구직활동 인정 기준 ---
    {
      id: 's2',
      number: 'SECTION 02',
      heading: '실업급여 구직활동 인정 기준은 무엇인가요?',
      subtitle: '구직활동과 구직외활동으로 나뉘어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            재취업활동은 크게 <strong>구직활동</strong>과 <strong>구직외활동</strong> 두 가지로 나뉘어요.
            5차부터는 구직활동을 반드시 1회 포함해야 하니까 구분을 확실히 알아둬야 해요.
          </p>

          <SpokeCompareCards cards={[
            {
              title: '구직활동',
              subtitle: '적극적 취업 노력',
              items: [
                '워크넷 등 채용사이트 입사지원',
                '채용 면접 참석 (면접확인서 필요)',
                '채용박람회 참여',
                '구인업체 직접 방문·우편 지원',
              ],
              recommended: true,
              recLabel: '5차부터 1회 필수',
            },
            {
              title: '구직외활동',
              subtitle: '취업 역량 강화',
              items: [
                '고용센터 취업특강 (최대 3회 인정)',
                '직업심리검사 (최대 1회 인정)',
                '심리안정프로그램 (최대 1회 인정)',
                '직업능력개발 훈련 수강',
              ],
            },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            가장 쉬운 방법은 <a href="https://www.work24.go.kr" target="_blank" rel="noopener noreferrer" className="text-[#4A7AB5] underline">워크넷(고용24)</a>에서 채용공고에 입사지원하는 거예요.
            온라인으로 지원하면 자동으로 기록이 남아서 따로 증빙을 챙기지 않아도 돼요.
            면접에 다녀온 경우에는 면접확인서를 회사에서 받아 제출하면 인정돼요.
          </p>

          <SpokeChecklist items={[
            { text: '워크넷 입사지원 (자동 기록, 가장 간편)', done: true, note: '구직활동' },
            { text: '채용 면접 참석 + 면접확인서 제출', done: true, note: '구직활동' },
            { text: '채용박람회 참여 (참석확인서 발급)', done: true, note: '구직활동' },
            { text: '고용센터 취업특강 수강 (전체 3회까지)', done: true, note: '구직외활동' },
            { text: 'HRD-Net 직업훈련 수강 (수료증 필요)', done: true, note: '구직외활동' },
            { text: '유튜브·블로그 강의 시청', done: false, note: '인정 불가' },
            { text: '동일 회사 반복 지원', done: false, note: '인정 불가' },
          ]} />

          <TipBox title="허위 구직활동을 하면?">
            <p>형식적이거나 허위로 구직활동을 신고하면 해당 기간 급여가 <strong>부지급</strong> 처리돼요. 2회 적발되면 그 인정기간 전체 급여가 나오지 않으니 실제로 활동한 내역만 신고하세요.</p>
          </TipBox>

          <p className="text-neutral-600 mb-0">
            인정되는 활동 범위를 파악했다면, 온라인으로 실업인정 신청하는 구체적인 방법이 궁금해질 거예요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '온라인',
        title: '고용센터 안 가고 온라인으로 실업인정 받을 수 있나요?',
        desc: '고용24 온라인 실업인정 신청 절차 안내',
        icon: 'calc',
      },
    },

    // --- SECTION 03: 온라인 실업인정 ---
    {
      id: 's3',
      number: 'SECTION 03',
      heading: '실업급여 온라인 실업인정은 어떻게 신청하나요?',
      subtitle: '고용24에서 지정일 당일에 신청할 수 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            1차와 4차를 제외한 나머지 회차는 <strong>고용24(work24.go.kr)</strong>에서 온라인으로 실업인정을 신청할 수 있어요.
            실업인정일 당일 오전 0시부터 오후 5시까지 신청이 가능하고, 본인이 직접 해야 해요.
          </p>

          <SpokeStepCards steps={[
            { title: '고용24 로그인', desc: '공동인증서 또는 간편인증으로 로그인', tip: '카카오·네이버 인증 가능' },
            { title: '실업인정 신청 메뉴 진입', desc: '마이페이지 > 실업급여 > 실업인정 신청', tip: '모바일 앱에서도 가능' },
            { title: '구직활동 내역 입력', desc: '입사지원·면접·교육 등 활동 내역 기재', tip: '워크넷 지원은 자동 연동' },
            { title: '신청 완료 확인', desc: '접수 완료 문자 수신 후 급여 지급 대기', tip: '처리 결과도 고용24에서 확인' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            1차 실업인정은 고용센터에 직접 가서 <strong>수급자격 교육(취업특강)</strong>을 이수해야 해요.
            온라인 취업특강(약 1시간)을 미리 수강한 뒤 센터를 방문하면 시간을 줄일 수 있어요.
            4차도 출석이 필수인데, 이때는 담당자와 <strong>취업지원 상담</strong>을 함께 진행해요.
          </p>

          <SpokeFlow steps={[
            { icon: '1', label: '1차 출석', sub: '취업특강 이수' },
            { icon: '2', label: '2~3차 온라인', sub: '재취업활동 1회' },
            { icon: '3', label: '4차 출석', sub: '취업지원 상담' },
            { icon: '4', label: '5차~ 온라인', sub: '재취업활동 2회' },
          ]} />

          <FormulaBox lines={[
            { text: '온라인 실업인정 가능 시간', comment: true },
            { text: '실업인정일 당일 00:00 ~ 17:00' },
          ]} />

          <p className="text-neutral-600 mb-0">
            온라인 신청 방법은 알겠는데, 실업인정일에 출석을 못 하면 어떤 불이익이 있는지도 미리 알아둬야 해요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '주의사항',
        title: '실업인정일에 출석을 못 하면 급여가 끊기나요?',
        desc: '불참 시 불이익과 일정 변경 방법 확인',
        icon: 'info',
      },
    },

    // --- SECTION 04: 출석 못 하면 ---
    {
      id: 's4',
      number: 'SECTION 04',
      heading: '실업급여 실업인정일 출석 못 하면 어떻게 되나요?',
      subtitle: '정당한 사유가 있으면 일정 변경이 가능해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            실업인정일에 정당한 사유 없이 출석하지 않으면 해당 인정기간의 <strong>구직급여가 지급되지 않아요</strong>.
            고용보험법 제44조에 따라 실업인정을 받은 날에 대해서만 급여가 나오기 때문이에요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            다만 면접, 질병·부상, 직계가족 경조사, 천재지변 같은 <strong>정당한 사유</strong>가 있으면 일정을 변경할 수 있어요.
            사전에 고용센터에 전화하거나 고용24에서 신고하면 다음 인정일로 연기돼요.
          </p>

          <SpokeTable
            id="tbl-excuse"
            title="실업인정일 변경이 가능한 정당한 사유"
            subtitle="고용보험법 시행규칙 기준"
            headers={['사유', '필요 서류', '처리 방법']}
            rows={[
              ['채용 면접', '면접확인서', '사전 신고 → 다음 인정일 연기'],
              ['질병·부상', '진단서·입원확인서', '사전 신고 → 치료 후 방문'],
              ['직계가족 경조사', '사망진단서·청첩장 등', '사전 신고 → 연기'],
              ['천재지변', '별도 서류 불요', '고용센터 판단'],
            ]}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            개인 사정(날짜 착각 등)으로 빠진 경우에는 전체 수급기간 중 <strong>1회에 한해</strong> 변경이 가능해요.
            실업인정일 당일 오후 5시까지 온라인 신청을 못 했다면, 오후 6시까지 고용센터에 직접 방문하거나 14일 이내에 방문해서 처리할 수 있어요.
          </p>

          <TipBox title="반복수급자·장기수급자는 기준이 더 엄격해요">
            <p>이전에 실업급여를 여러 번 받은 반복수급자나 장기수급자는 실업인정 주기가 짧아지고, 구직활동 요구 횟수도 늘어날 수 있어요. <a href="/w/실업급여-반복수급-감액-대기기간" className="text-[#4A7AB5] underline">반복수급 감액 기준</a>에서 자세히 확인하세요.</p>
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '/w/실업급여-수급-조건-신청-방법-2026',
        badge: '전체 가이드',
        title: '실업급여 전체 흐름이 궁금하다면?',
        desc: '수급 조건부터 신청·금액·기간까지 한눈에 확인',
        icon: 'check',
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
      question: '실업급여 실업인정을 온라인으로만 받을 수 있나요?',
      answer: '전부 온라인으로 할 수는 없어요. 1차와 4차 실업인정은 고용센터 출석이 필수이고, 2~3차와 5차 이후는 고용24에서 온라인 신청이 가능해요.',
    },
    {
      question: '실업급여 구직활동은 몇 회나 해야 하나요?',
      answer: '2~4차까지는 4주간 재취업활동 1회 이상이면 돼요. 5차부터는 2회 이상이 필요하고 그중 구직활동(입사지원·면접)을 반드시 1회 포함해야 해요.',
    },
    {
      question: '워크넷 입사지원만으로 실업인정이 되나요?',
      answer: '네, 워크넷에서 채용공고에 입사지원하면 자동으로 기록이 남아서 구직활동 1회로 인정돼요. 다만 동일 회사에 반복 지원하면 인정되지 않아요.',
    },
    {
      question: '실업인정일을 깜빡하고 놓치면 어떻게 하나요?',
      answer: '개인 사정으로 놓친 경우 전체 수급기간 중 1회에 한해 변경할 수 있어요. 14일 이내에 고용센터를 방문하면 처리가 가능해요. 정당한 사유 없이 2회 이상 불참하면 급여가 정지될 수 있어요.',
    },
  ],

  relatedSpokes: [
    { badge: '신청', title: '실업급여 신청 방법 절차 준비서류', desc: '워크넷 등록부터 고용센터 접수까지', href: '/w/실업급여-신청-방법-절차-준비서류' },
    { badge: '지급', title: '실업급여 지급일 첫 입금일 대기기간', desc: '7일 대기기간 계산과 지급 주기', href: '/w/실업급여-지급일-첫-입금일-대기기간' },
    { badge: '센터', title: '실업급여 고용센터 찾기 고용24 사용법', desc: '관할 고용센터 찾는 법과 온라인 신청', href: '/w/실업급여-고용센터-찾기-고용24-사용법' },
  ],

  sources: [
    { name: '고용보험법 제44조 (실업의 인정)', url: 'https://www.law.go.kr/법령/고용보험법', org: '법제처' },
    { name: '고용보험법 시행규칙 제101조', url: 'https://www.law.go.kr/법령/고용보험법시행규칙', org: '법제처' },
    { name: '실업급여 안내', url: 'https://www.ei.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePb0201Info.do', org: '고용보험' },
    { name: '고용노동부 실업급여 제도', url: 'https://www.moel.go.kr', org: '고용노동부' },
  ],
}

export default data
