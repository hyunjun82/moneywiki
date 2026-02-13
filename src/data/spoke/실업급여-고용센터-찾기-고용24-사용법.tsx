import type { SpokeData } from '@/data/spoke/types'
import {
  SpokeTable,
  FormulaBox,
  TipBox,
  SpokeStepCards,
  SpokeChecklist,
  SpokeFlow,
  SpokeCompareCards,
} from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '실업급여-고용센터-찾기-고용24-사용법',

  meta: {
    title: '실업급여 고용센터 찾기 고용24 사용법 | 관할 센터 온라인 신청',
    description: '전국 고용센터 132곳 중 내 관할 센터 찾는 법과 고용24 온라인 실업급여 신청 방법을 정리했어요.',
    keywords: [
      '실업급여 고용센터 찾기 방법',
      '고용24 사용법 온라인 신청',
      '실업급여 관할 고용센터 확인',
      '고용24 실업급여 신청 절차',
    ],
    ogTitle: '실업급여 고용센터 찾기 고용24 사용법 | 머니위키',
    ogDescription: '관할 고용센터 찾기부터 고용24 온라인 신청까지 정리했어요.',
  },

  hub: {
    url: '/w/실업급여-수급-조건-신청-방법-2026',
    name: '실업급여 수급 조건 신청 방법 2026',
  },

  breadcrumb: ['고용보험', '실업급여', '고용센터 찾기'],

  summary3: [
    <>전국 고용센터는 <strong>132곳</strong>이고, 주민등록상 주소지 기준으로 관할 센터가 정해져요</>,
    <>고용24(<strong>work24.go.kr</strong>)에서 관할 센터 검색, 방문 예약, 온라인 실업인정까지 가능해요</>,
    <>고용센터 첫 방문 시 <strong>신분증·통장 사본</strong>을 지참하고, 사전에 온라인 교육을 수료하면 시간이 줄어요</>,
  ],

  sourceBar: {
    badge: '출처',
    name: '고용24 (고용노동부)',
    date: '2026.02',
  },

  prevNext: {
    prev: { title: '실업급여 세금 건강보험 국민연금 처리', href: '/w/실업급여-세금-건강보험-국민연금-처리' },
  },

  stickyBar: {
    topLabel: '고용노동부 상담',
    value: '1350',
    buttonText: '고용센터 찾기 →',
    scrollTo: '#s1',
  },

  hero: {
    badge: '2026년 기준',
    h1: (
      <>
        <span className="text-[#1E3A5F]">실업급여 고용센터 찾기</span> 고용24 사용법
      </>
    ),
    intro: (
      <p className="text-base text-neutral-500 leading-relaxed">
        퇴사 후 실업급여를 신청하려는데 어느 고용센터로 가야 하는지, 온라인으로도 가능한지 궁금하셨다면 잘 오셨어요.
        전국 고용센터는 <strong>132곳</strong>이고, 내 주민등록 주소지 기준으로 관할 센터가 자동으로 정해져요.
        <a href="/w/실업급여-수급-조건-신청-방법-2026" className="text-[#4A7AB5] underline">실업급여 전체 안내</a>에서 수급 조건과 금액을 함께 확인할 수 있어요.
        먼저 관할 고용센터를 찾는 방법부터 볼게요.
      </p>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '실업급여 수급 조건·금액·신청 절차 안내',
    },
  },

  toc: [
    { id: 's1', label: '실업급여 고용센터 찾기 방법은 어떻게 되나요?' },
    { id: 's2', label: '고용24 사용법과 온라인 신청은 어떻게 하나요?' },
    { id: 's3', label: '실업급여 관할 고용센터 방문 시 준비물은 뭔가요?' },
    { id: 's4', label: '고용24 실업급여 신청 절차는 어떻게 되나요?' },
    { id: 's-faq', label: '자주 묻는 질문' },
  ],

  sections: [
    {
      id: 's1',
      number: '01',
      heading: '실업급여 고용센터 찾기 방법은 어떻게 되나요?',
      subtitle: '주소만 입력하면 관할 센터가 바로 나와요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            실업급여를 신청하려면 <strong>주민등록상 주소지</strong> 기준으로 정해진 관할 고용센터에 가야 해요.
            다른 지역 센터에서는 접수가 안 되니까 꼭 확인해야 해요.
            가장 빠른 방법은 고용24 홈페이지에서 검색하는 거예요.
          </p>

          <SpokeFlow steps={[
            { icon: '🌐', label: 'work24.go.kr 접속' },
            { icon: '🔍', label: '고용센터 찾기 클릭' },
            { icon: '📍', label: '주소 입력', sub: '주민등록상 주소' },
            { icon: '✅', label: '관할 센터 확인', sub: '전화·지도 제공' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            고용24 외에도 <a href="https://www.moel.go.kr" target="_blank" rel="noopener noreferrer" className="text-[#4A7AB5] underline">고용노동부 홈페이지</a>에서 시·도별 고용센터 목록을 볼 수 있어요.
            전화로 확인하고 싶으면 고용노동부 대표번호 <strong>1350</strong>에 전화하면 돼요.
            평일 09시~18시에 상담원이 관할 센터를 안내해줘요.
          </p>

          <SpokeTable
            id="tbl-center"
            title="주요 지역 고용센터 연락처"
            subtitle="2026년 기준, 전국 132개소"
            headers={['지역', '센터명', '대표 전화', '관할 구역']}
            rows={[
              ['서울', '서울고용센터', '02-2004-7301', '중구·종로·용산'],
              ['서울', '서울강남고용센터', '02-3468-4794', '강남·서초'],
              ['서울', '서울동부고용센터', '02-2142-8924', '송파·강동·광진'],
              ['경기', '수원고용센터', '031-259-0900', '수원·화성·오산'],
              ['부산', '부산고용센터', '051-860-2700', '중구·서구·동구·영도'],
            ]}
            highlightCol={2}
          />

          <TipBox title="서울·경기는 센터가 많아요">
            서울만 해도 강남·서부·동부·남부 등 10곳 이상이에요. 관할이 세분되어 있으니 반드시 주소 검색으로 확인하세요.
          </TipBox>

          <p className="text-neutral-600 mb-0 leading-relaxed">
            관할 센터를 찾았으면 고용24에서 어떤 서비스를 이용할 수 있는지 궁금해지죠.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '고용24',
        title: '고용24에서 뭘 할 수 있나요?',
        desc: '온라인 교육부터 실업인정까지 가능해요',
        icon: 'grid',
      },
    },

    {
      id: 's2',
      number: '02',
      heading: '고용24 사용법과 온라인 신청은 어떻게 하나요?',
      subtitle: '회원가입 후 교육·신청·인정까지 한 곳에서',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            고용24(<strong>work24.go.kr</strong>)는 고용노동부가 운영하는 통합 고용서비스 포털이에요.
            실업급여 수급자격 신청, 온라인 교육, 실업인정 인터넷 신청, 구직등록까지 한 곳에서 처리할 수 있어요.
            모바일 앱으로도 동일한 서비스를 이용할 수 있어서 스마트폰에서도 편리해요.
          </p>

          <SpokeStepCards steps={[
            { title: '회원가입', desc: 'work24.go.kr에서 공동인증서·간편인증(카카오, 네이버)·휴대폰 인증 중 택1', tip: '간편인증이 가장 빨라요' },
            { title: '구직등록', desc: '로그인 후 "구직등록" 메뉴에서 이력서와 희망직종을 등록해요', tip: '구직등록은 실업급여 신청 전 필수예요' },
            { title: '수급자격 온라인 교육', desc: '"수급자격 신청자 온라인 교육" 메뉴에서 약 60분 교육을 수료해요', tip: '교육 수료 후 14일 이내 센터 방문' },
            { title: '수급자격 신청서 제출', desc: '온라인으로 신청서를 먼저 제출하면 센터 방문 시간이 줄어요' },
            { title: '실업인정 인터넷 신청', desc: '2차 실업인정부터는 고용24에서 온라인으로 신청 가능해요', tip: '1차는 반드시 고용센터 방문' },
          ]} />

          <SpokeCompareCards cards={[
            {
              title: '온라인 (고용24)',
              subtitle: 'work24.go.kr·모바일 앱',
              items: ['구직등록·수급자격 신청서 제출', '온라인 교육 수료', '2차 이후 실업인정', '방문 예약'],
              recommended: true,
              recLabel: '시간 절약',
            },
            {
              title: '오프라인 (고용센터)',
              subtitle: '관할 센터 직접 방문',
              items: ['1차 실업인정 (필수 방문)', '수급자격 면접', '서류 직접 제출', '담당자 상담'],
            },
          ]} />

          <p className="text-neutral-600 mb-0 leading-relaxed">
            온라인으로 미리 준비할 수 있는 건 알겠는데, 막상 센터에 갈 때 뭘 가져가야 하는지가 중요해요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '준비물',
        title: '고용센터 방문 시 뭘 챙겨야 하나요?',
        desc: '빠뜨리면 다시 와야 하는 서류가 있어요',
        icon: 'check',
      },
    },

    {
      id: 's3',
      number: '03',
      heading: '실업급여 관할 고용센터 방문 시 준비물은 뭔가요?',
      subtitle: '신분증·통장 사본은 필수예요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            고용센터 첫 방문 때 <strong>신분증</strong>과 <strong>본인 명의 통장 사본</strong>은 반드시 가져가야 해요.
            이직확인서는 퇴사한 회사에서 고용보험 시스템에 제출하는 서류라서 본인이 직접 챙길 필요는 없어요.
            다만 회사가 미제출하면 신청이 지연되니까 고용24에서 제출 여부를 꼭 확인하세요.
          </p>

          <SpokeChecklist items={[
            { text: '신분증 (주민등록증·운전면허증·여권 중 1개)', done: true },
            { text: '본인 명의 통장 사본 (급여 입금용)', done: true, note: '사본이 없으면 통장 앞면 사진도 가능' },
            { text: '이직확인서 제출 여부 확인 (고용24에서 조회)', done: true, note: '회사가 제출, 본인은 확인만' },
            { text: '수급자격 온라인 교육 수료 (방문 전 완료)', done: false, note: '수료 후 14일 이내 방문' },
            { text: '구직등록 완료 (고용24에서 사전 등록)', done: false },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            방문 예약을 하면 대기 시간을 줄일 수 있어요.
            고용24 "고용센터 방문 예약" 메뉴에서 날짜와 시간을 선택하면 돼요.
            예약 없이 가도 접수는 가능하지만, 대기가 길어질 수 있어요.
          </p>

          <FormulaBox lines={[
            { text: '고용센터 운영 시간', comment: true },
            { text: '평일 09:00 ~ 18:00 (점심 12:00~13:00)' },
            { text: '※ 토·일·공휴일 휴무, 방문 예약 권장', comment: true },
          ]} />

          <TipBox title="이직확인서를 회사가 안 내면?">
            고용센터에 신고하면 직권으로 발급 요청을 해줘요. 그래도 시간이 걸리니까 퇴사 후 1주일 안에 고용24에서 제출 여부를 확인하는 게 좋아요.
          </TipBox>

          <p className="text-neutral-600 mb-0 leading-relaxed">
            준비물을 다 챙겼으면, 실제로 실업급여를 신청하는 전체 흐름이 어떻게 되는지 정리해볼게요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '절차',
        title: '실업급여 신청 전체 흐름은?',
        desc: '구직등록부터 급여 수령까지 순서대로 안내해요',
        icon: 'calc',
      },
    },

    {
      id: 's4',
      number: '04',
      heading: '고용24 실업급여 신청 절차는 어떻게 되나요?',
      subtitle: '구직등록 → 교육 → 센터 방문 → 실업인정',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            실업급여 신청은 크게 4단계로 나눌 수 있어요.
            온라인으로 먼저 할 수 있는 건 미리 해두면 고용센터 방문 시간이 크게 줄어요.
            이직일(퇴사일) 다음 날부터 <strong>12개월 이내</strong>에 신청해야 하니까 미루면 안 돼요.
          </p>

          <SpokeStepCards steps={[
            { title: '1단계: 워크넷 구직등록', desc: '고용24 로그인 후 "구직등록" 메뉴에서 이력서와 희망직종을 등록해요', tip: '온라인으로 5~10분이면 완료' },
            { title: '2단계: 수급자격 온라인 교육', desc: '고용24 "수급자격 신청자 온라인 교육"을 수료해요 (약 60분)', tip: '수료증은 14일간 유효' },
            { title: '3단계: 관할 고용센터 방문', desc: '신분증·통장 사본 지참 후 수급자격 인정 신청을 해요', tip: '방문 예약 시 대기 시간 단축' },
            { title: '4단계: 실업인정 (1~4주마다)', desc: '지정된 실업인정일에 구직활동 내역을 보고해요', tip: '2차부터 온라인 가능' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            <a href="/w/실업급여-실업인정-구직활동-방법" className="text-[#4A7AB5] underline">실업인정과 구직활동 방법</a>은 별도 글에서 자세히 다루고 있어요.
            실업인정일에 빠지면 해당 기간 급여가 지급되지 않으니까 꼭 챙기세요.
            첫 실업인정은 반드시 고용센터에 직접 방문해야 하고, 2차부터는 고용24에서 온라인으로 해요.
          </p>

          <SpokeTable
            id="tbl-method"
            title="단계별 온라인·오프라인 구분"
            subtitle="2026년 기준"
            headers={['단계', '방법', '소요 시간', '비고']}
            rows={[
              ['구직등록', '온라인 (고용24)', '5~10분', '실업급여 신청 전 필수'],
              ['온라인 교육', '온라인 (고용24)', '약 60분', '수료 후 14일 이내 방문'],
              ['수급자격 인정', '오프라인 (센터 방문)', '30분~1시간', '1차 필수 방문'],
              ['실업인정 (1차)', '오프라인 (센터 방문)', '20~30분', '출석 필수'],
              ['실업인정 (2차~)', '온라인 (고용24)', '5~10분', '온라인 가능'],
            ]}
            highlightCol={1}
          />

          <TipBox title="신청 기한을 놓치면?">
            이직일 다음 날부터 12개월이 지나면 실업급여 수급 자격 자체가 사라져요. <a href="/w/실업급여-신청-방법-절차-준비서류" className="text-[#4A7AB5] underline">신청 절차와 서류</a>를 미리 확인하고 빠르게 진행하세요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '/w/실업급여-수급-조건-신청-방법-2026',
        badge: '전체 안내',
        title: '실업급여 수급 조건부터 다시 확인하고 싶다면?',
        desc: '수급 조건·금액·기간·신청까지 한 번에 정리했어요',
        icon: 'info',
        primary: true,
      },
    },

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
      question: '실업급여 고용센터를 다른 지역에서 신청할 수 있나요?',
      answer: '안 돼요. 주민등록상 주소지 관할 고용센터에서만 신청할 수 있어요. 실제 거주지가 다르면 주민등록을 옮긴 뒤 신청해야 해요.',
    },
    {
      question: '고용24 회원가입 없이 실업급여를 받을 수 있나요?',
      answer: '네, 고용센터를 직접 방문하면 회원가입 없이도 신청 가능해요. 다만 2차 이후 실업인정을 온라인으로 하려면 회원가입이 필요해요.',
    },
    {
      question: '고용센터 방문 예약은 필수인가요?',
      answer: '필수는 아니에요. 예약 없이 방문해도 접수가 가능하지만, 예약하면 대기 시간을 줄일 수 있어요. 고용24에서 날짜와 시간을 선택하면 돼요.',
    },
    {
      question: '고용24 앱으로도 실업급여 신청이 되나요?',
      answer: '네. 고용24 모바일 앱에서 구직등록, 온라인 교육 수료, 실업인정 신청까지 모두 가능해요. 앱스토어에서 "고용24"를 검색하면 돼요.',
    },
  ],

  relatedSpokes: [
    { badge: '신청', title: '실업급여 신청 방법 절차 준비서류', desc: '워크넷 구직등록부터 서류 준비까지', href: '/w/실업급여-신청-방법-절차-준비서류' },
    { badge: '인정', title: '실업급여 실업인정 구직활동 방법', desc: '실업인정일 출석과 구직활동 기준', href: '/w/실업급여-실업인정-구직활동-방법' },
    { badge: '조건', title: '실업급여 수급 조건 자격 요건 정리', desc: '피보험기간 180일, 비자발적 이직', href: '/w/실업급여-수급-조건-자격-요건-완벽정리' },
  ],

  sources: [
    { name: '고용24 고용센터 찾기', url: 'https://m.work24.go.kr/cm/c/d/0190/retrieveInstSrchLst.do', org: '고용노동부' },
    { name: '고용보험법', url: 'https://www.law.go.kr/법령/고용보험법', org: '법제처' },
    { name: '실업급여 안내', url: 'https://www.work24.go.kr', org: '고용24' },
    { name: '고용노동부', url: 'https://www.moel.go.kr', org: '고용노동부' },
  ],
}

export default data
