import type { SpokeData } from '@/data/spoke/types'
import {
  SpokeTable, TipBox, FormulaBox, WarnBox,
  Chips, DetailBox, SpokeLinks, Steps,
  SpokeTimeline, SpokeStepCards, SpokeCompareCards,
  SpokeRateBars, SpokeFlow, SpokeChecklist, SpokeWarnBox,
} from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '실업급여-해외체류-해외취업-수급정지-규정',

  meta: {
    title: '실업급여 해외체류 수급정지 출국 신고 | 해외취업 구직활동 인정',
    description: '실업급여 수급 중 해외여행 가면 끊기나요? 출국 시 수급정지 기준과 실업인정일 변경법, 해외취업 특례까지 정리했어요.',
    keywords: [
      '실업급여 해외체류 수급정지 기준',
      '실업급여 출국 신고 실업인정',
      '실업급여 해외취업 수급 가능',
      '실업급여 해외 구직활동 인정',
    ],
    ogTitle: '실업급여 해외체류 수급정지 출국 신고 규정 | 머니위키',
    ogDescription: '해외여행 중 실업급여 끊기는 기준과 해외취업 특례를 확인하세요.',
  },

  hub: {
    url: '/w/실업급여-수급중-취업-알바-상병급여-보호',
    name: '실업급여 수급 중 취업·알바·상병급여·수급권 보호',
  },

  breadcrumb: ['고용·노동', '실업급여', '해외체류 수급정지'],

  summary3: [
    <>해외 출국 시 <strong>실업인정 불가</strong> — 개인 사유 해외체류 기간은 수급 정지돼요</>,
    <>출국 전 고용센터 신고 필수, 실업인정일 변경은 <strong>수급기간 중 1회</strong>만 가능해요</>,
    <>해외취업 목적이면 <strong>재취업활동계획서</strong> 제출 후 해외 인터넷 실업인정 가능해요</>,
  ],

  sourceBar: {
    badge: '출처',
    name: '고용보험법 및 시행규칙',
    date: '2026.02',
  },

  prevNext: {
    prev: { title: '실업급여 수급 중 창업 자격 유지', href: '/w/실업급여-수급중-창업-자격-유지-조건' },
    next: { title: '실업급여 압류 금지 수급권 보호', href: '/w/실업급여-압류금지-수급권-보호-계좌' },
  },

  stickyBar: {
    topLabel: '해외체류 수급정지',
    value: '출국 시 정지',
    buttonText: '출국 신고 절차 보기 →',
    scrollTo: '#s3',
  },

  hero: {
    badge: '2026년 기준',
    h1: (
      <>
        실업급여 <span className="text-[#1E3A5F]">해외체류·해외취업</span> 수급정지와 출국 규정
      </>
    ),
    intro: (
      <p className="text-base text-neutral-500 leading-relaxed">
        실업급여 받는 중에 해외여행을 가면 어떻게 되는지 걱정되셨다면 잘 오셨어요. 출국 시 수급정지 기준과 <a href="/w/실업급여-실업인정-구직활동-방법" className="text-[#4A7AB5] underline">실업인정일</a> 변경 방법, 해외취업 특례까지 이 글 하나로 정리했어요. 먼저 해외체류 시 수급이 정지되는 기준부터 볼게요.
      </p>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '실업급여 수급 중 취업·알바·상병급여·수급권 보호 총정리',
    },
  },

  toc: [
    { id: 's1', label: '실업급여 해외체류 수급정지 기준은 어떻게 되나요?' },
    { id: 's2', label: '실업급여 출국 신고와 실업인정일 변경은 어떻게 하나요?' },
    { id: 's3', label: '실업급여 해외취업 시 수급이 가능한가요?' },
    { id: 's4', label: '실업급여 해외 구직활동은 어떻게 인정받나요?' },
    { id: 's-faq', label: '자주 묻는 질문' },
  ],

  sections: [
    {
      id: 's1',
      number: 'SECTION 01',
      heading: '실업급여 해외체류 수급정지 기준은 어떻게 되나요?',
      subtitle: '출국 기간에는 실업인정 불가, 수급이 일시 정지돼요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            실업급여를 받으려면 <strong>실업인정일</strong>에 고용센터에 출석하거나 온라인으로 실업인정을 신청해야 해요. 그런데 해외에 나가 있으면 이 절차를 밟을 수 없어서 해당 기간의 실업급여가 지급되지 않아요. 개인 사유(여행, 어학연수, 가족 방문 등)로 출국한 경우에는 해외체류 기간 전체가 <strong>수급 정지</strong> 처리돼요.
          </p>

          <SpokeCompareCards
            cards={[
              {
                title: '국내 체류',
                subtitle: '정상 수급',
                items: [
                  '실업인정일 출석 또는 온라인 신청',
                  '구직활동 증빙 제출',
                  '28일 단위 실업급여 정상 지급',
                ],
                recommended: true,
                recLabel: '정상',
              },
              {
                title: '해외 체류 (개인 사유)',
                subtitle: '수급 정지',
                items: [
                  '출국 기간 실업인정 불가',
                  '해당 회차 실업급여 미지급',
                  '귀국 후 남은 소정급여일수에서 재개',
                ],
              },
            ]}
          />

          <WarnBox>
            <strong>수급기한 12개월은 변하지 않아요.</strong> 해외체류로 수급이 정지돼도 이직일 다음 날부터 <strong>12개월</strong>이라는 전체 수급기한은 그대로 흘러가요. 해외에 오래 있으면 남은 <a href="/w/실업급여-수급기간-소정급여일수-기준" className="text-[#4A7AB5] underline">소정급여일수</a>를 다 못 받을 수 있어요.
          </WarnBox>

          <SpokeTable
            id="tbl-suspend"
            title="해외체류 사유별 수급 영향 비교"
            subtitle="고용보험법 시행규칙 기준"
            headers={['출국 사유', '실업인정', '수급 영향', '비고']}
            rows={[
              ['해외여행 (단기)', '불가', '해당 기간 정지', '귀국 후 재개 가능'],
              ['어학연수', '불가', '해당 기간 정지', '구직활동으로 불인정'],
              ['가족 방문·동거', '불가', '해당 기간 정지', '장기 시 소진 위험'],
              ['워킹홀리데이', '불가', '해당 기간 정지', '해외취업 특례 미적용'],
              ['해외취업 구직', '가능(조건부)', '수급 유지', '사전 계획서 제출 필수'],
            ]}
            highlightCol={1}
          />
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '신고',
        title: '출국 전에 고용센터에 꼭 신고해야 하나요?',
        desc: '실업인정일 변경 절차와 출국 전 신고 방법을 정리했어요.',
        icon: 'info',
      },
    },

    {
      id: 's2',
      number: 'SECTION 02',
      heading: '실업급여 출국 신고와 실업인정일 변경은 어떻게 하나요?',
      subtitle: '출국 전 고용센터 신고 + 실업인정일 변경은 1회만 가능해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            실업급여를 받는 중에 해외에 나갈 계획이 있다면 반드시 관할 고용센터에 미리 알려야 해요. 신고 없이 출국했다가 실업인정일을 놓치면 해당 회차 급여를 아예 못 받게 돼요. 다행히 실업인정일 변경이라는 제도가 있어서 일정을 조절할 수 있어요.
          </p>

          <Steps
            items={[
              { title: '관할 고용센터에 출국 사실 사전 신고', desc: '전화 또는 방문으로 해외여행 일정과 귀국 예정일을 알려요' },
              { title: '실업인정일 변경 신청 (1회 한정)', desc: '출국 전에 실업인정일을 앞당기거나, 귀국 후 14일 이내에 변경 신청이 가능해요' },
              { title: '귀국 후 고용센터 방문', desc: '출입국 증빙서류, 구직활동 증빙, 신분증을 지참하고 실업인정변경신청서를 제출해요' },
              { title: '실업인정 후 급여 지급', desc: '변경된 일정에 따라 실업인정을 받으면 해당 회차 급여가 정상 지급돼요' },
            ]}
          />

          <TipBox title="실업인정일 변경은 수급기간 중 단 1회만 돼요">
            여행을 여러 번 가더라도 변경 기회는 1번뿐이에요. 실업인정일이 겹치지 않는 일정을 짜는 게 가장 안전해요. 실업인정 주기가 보통 1~4주이니 그 사이에 다녀오면 급여에 영향이 없어요.
          </TipBox>

          <SpokeChecklist
            items={[
              { text: '출국 전 관할 고용센터에 해외여행 일정 신고', done: false, note: '전화(1350) 또는 방문' },
              { text: '실업인정일과 출국일 겹치는지 확인', done: false, note: '고용24에서 일정 조회 가능' },
              { text: '변경 필요 시 실업인정일 변경 신청 (1회)', done: false, note: '출국 전 앞당기기 또는 귀국 후 14일 이내' },
              { text: '귀국 후 출입국 증빙서류 준비', done: false, note: '여권 출입국 도장, 항공권 등' },
              { text: '구직활동 증빙서류 지참 후 고용센터 방문', done: false },
            ]}
          />
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '특례',
        title: '해외취업을 준비하는 중이라면 수급이 유지될 수도 있어요',
        desc: '해외취업 목적 출국 시 인터넷 실업인정이 가능한 특례 조건을 알려드려요.',
        icon: 'check',
      },
    },

    {
      id: 's3',
      number: 'SECTION 03',
      heading: '실업급여 해외취업 시 수급이 가능한가요?',
      subtitle: '2017년부터 해외취업 목적이면 해외 인터넷 실업인정이 돼요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            개인 사유와 달리 <strong>해외취업을 목적</strong>으로 출국하는 경우에는 예외적으로 해외에서도 실업인정을 받을 수 있어요. 2017년 1월부터 시행된 제도인데, 출국 전에 <a href="/w/실업급여-고용센터-찾기-고용24-사용법" className="text-[#4A7AB5] underline">관할 고용센터</a>를 방문해서 해외 재취업활동계획서를 제출해야 해요.
          </p>

          <SpokeFlow
            steps={[
              { icon: '📝', label: '재취업활동계획서', sub: '고용센터 제출' },
              { icon: '✈️', label: '해외 출국', sub: '취업 목적' },
              { icon: '💻', label: '인터넷 실업인정', sub: '해외에서 신청' },
              { icon: '💰', label: '급여 지급', sub: '정상 수급 유지' },
            ]}
          />

          <DetailBox
            title="해외 재취업활동계획서 제출 시 필요 서류"
            items={[
              { heading: '해외 채용공고문', desc: '해외 기업의 채용 안내문이나 구인 공고 출력물이에요' },
              { heading: '면접 일정 증빙', desc: '이메일, 초청장, 면접 통지문 등 일정을 확인할 수 있는 자료예요' },
              { heading: '해외체류 기간 확인 서류', desc: '항공권 예약 확인서, 체류 일정표 등이에요' },
            ]}
          />

          <SpokeWarnBox title="해외취업 특례로 인정받지 못하는 경우">
            <p className="leading-relaxed">
              어학연수, 단순 여행, 해외 자원봉사, 가족 동거, 워킹홀리데이 등은 <strong>해외취업 목적으로 보지 않아요</strong>. 또한 해외 현지 입사지원 사이트를 통한 지원이나 온라인 취업특강 수료는 해외체류 이유와 직접 관련이 없으면 재취업활동으로 인정받지 못해요.
            </p>
          </SpokeWarnBox>

          <TipBox title="해외취업 알선 기관을 활용하면 증빙이 수월해요">
            한국산업인력공단, 월드잡플러스 등 정부 해외취업 지원기관을 통하면 채용공고와 면접 일정을 체계적으로 증빙할 수 있어요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '인정',
        title: '해외에서 어떤 구직활동이 인정되는지 궁금하시죠?',
        desc: '해외 구직활동 인정 범위와 부정수급 처벌 기준을 정리했어요.',
        icon: 'calc',
      },
    },

    {
      id: 's4',
      number: 'SECTION 04',
      heading: '실업급여 해외 구직활동은 어떻게 인정받나요?',
      subtitle: '인정 활동과 부정수급 기준을 정확히 알아야 해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            해외취업 특례를 받더라도 아무 활동이나 구직활동으로 인정되는 건 아니에요. 고용센터가 사전에 승인한 재취업활동계획에 따라 실제로 해외 기업에 지원하거나 면접을 본 내역만 인정돼요. 이 기준을 무시하면 <a href="/w/실업급여-부정수급-유형-제재-벌금-추징" className="text-[#4A7AB5] underline">부정수급</a>으로 적발될 수 있어요.
          </p>

          <SpokeTable
            id="tbl-activity"
            title="해외 구직활동 인정 vs 불인정 비교"
            subtitle="고용보험법 시행규칙 / 고용노동부 지침 기준"
            headers={['구분', '활동 유형', '인정 여부']}
            rows={[
              ['인정', '해외 기업 입사지원 (재취업활동계획 부합)', 'O'],
              ['인정', '해외 기업 면접 참석', 'O'],
              ['인정', '해외 취업박람회 참가', 'O'],
              ['불인정', '해외 현지 입사지원 사이트 자율 지원', 'X'],
              ['불인정', '온라인 취업특강 수료', 'X'],
              ['불인정', '어학연수·자원봉사', 'X'],
            ]}
            highlightCol={2}
          />

          <WarnBox>
            <strong>부정수급 적발 시 최대 5배 추징 + 형사처벌을 받아요.</strong> 2023년 고용노동부 특별점검에서 해외체류 중 VPN으로 IP를 우회하거나, 국내 가족에게 대리 신청을 맡긴 <strong>380명이 적발</strong>됐어요. 부정수급액은 19억 1천만 원이었고, 217명이 검찰에 송치됐어요.
          </WarnBox>

          <Chips
            items={[
              { icon: '🚫', label: '부정수급 벌금', value: '3천만원 이하' },
              { icon: '⚖️', label: '징역형', value: '3년 이하' },
              { icon: '💸', label: '추가 징수', value: '최대 5배' },
              { icon: '🔍', label: 'IP 추적', value: '상시 점검' },
            ]}
          />

          <TipBox title="VPN 우회나 대리 신청은 절대 하면 안 돼요">
            고용노동부는 <a href="/w/실업급여-실업인정-구직활동-방법" className="text-[#4A7AB5] underline">온라인 실업인정</a> 시 IP 주소를 분석해요. 해외 IP가 감지되면 출입국 기록과 대조해서 부정수급 여부를 확인해요. 적발되면 받은 급여 전액 반환 + 최대 5배 추가 징수 + 형사처벌까지 받게 돼요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '/w/실업급여-수급중-취업-알바-상병급여-보호',
        badge: '전체 보기',
        title: '실업급여 수급 중 관리 전체 가이드가 궁금하다면?',
        desc: '취업·알바·상병급여·수급권 보호까지 한 번에 정리된 허브 글을 확인해 보세요.',
        icon: 'grid',
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
      question: '실업급여 받는 중에 해외여행 며칠까지 가능한가요?',
      answer: '법적으로 기간 제한은 없지만, 실업인정일에 국내에 있어야 해요. 실업인정 주기(보통 1~4주) 사이에 다녀오면 수급에 영향이 없어요. 단, 실업인정일을 놓치면 해당 회차 급여는 지급되지 않아요.',
    },
    {
      question: '해외에서 인터넷으로 실업인정 신청하면 안 되나요?',
      answer: '<strong>해외취업 특례</strong>로 사전 승인받은 경우에만 가능해요. 개인 사유로 출국한 뒤 해외에서 인터넷 신청하면 부정수급으로 적발돼요. IP 주소로 해외 접속 여부를 확인하고 있어요.',
    },
    {
      question: '실업인정일 변경은 몇 번까지 할 수 있나요?',
      answer: '수급기간 중 <strong>1회만</strong> 가능해요. 출국 전에 앞당기거나 귀국 후 14일 이내에 변경 신청을 해야 해요. 고용센터에 실업인정변경신청서를 제출하면 돼요.',
    },
    {
      question: '해외체류 중 수급기한 12개월이 지나면 어떻게 되나요?',
      answer: '이직일 다음 날부터 12개월이 지나면 남은 소정급여일수가 있어도 <strong>더 이상 수급할 수 없어요</strong>. 해외체류로 수급이 정지된 기간도 12개월에 포함되니 장기 출국은 주의해야 해요.',
    },
    {
      question: '해외취업에 성공하면 조기재취업수당을 받을 수 있나요?',
      answer: '네, 해외 기업에 취업해서 <strong>12개월 이상 고용</strong>이 확인되면 조기재취업수당을 신청할 수 있어요. 남은 소정급여일수의 절반을 일시금으로 받아요.',
    },
  ],

  relatedSpokes: [
    { badge: '중단', title: '실업급여 중단·거부·수급정지 사유와 대처법', desc: '갑자기 실업급여가 끊겼을 때 확인할 6가지 사유', href: '/w/실업급여-중단-거부-수급정지-사유-대처' },
    { badge: '실업인정', title: '실업급여 실업인정 구직활동 방법 총정리', desc: '실업인정일 출석·온라인 신청 방법과 구직활동 인정 기준', href: '/w/실업급여-실업인정-구직활동-방법' },
    { badge: '부정수급', title: '실업급여 부정수급 유형·제재·벌금 추징', desc: 'VPN 우회, 취업 미신고 등 부정수급 유형과 처벌', href: '/w/실업급여-부정수급-유형-제재-벌금-추징' },
    { badge: '수급기간', title: '실업급여 수급기간 소정급여일수 기준', desc: '연령·피보험기간별 최대 270일까지 받는 기준', href: '/w/실업급여-수급기간-소정급여일수-기준' },
    { badge: '창업', title: '실업급여 수급 중 창업 자격 유지 조건', desc: '사업자등록 시점별 수급 영향과 조기재취업수당', href: '/w/실업급여-수급중-창업-자격-유지-조건' },
  ],

  sources: [
    { name: '고용보험법', url: 'https://www.law.go.kr/법령/고용보험법', org: '법제처' },
    { name: '실업급여 안내', url: 'https://www.ei.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePb0201Info.do', org: '고용보험' },
    { name: '고용노동부 부정수급 점검', url: 'https://www.moel.go.kr', org: '고용노동부' },
  ],
}

export default data
