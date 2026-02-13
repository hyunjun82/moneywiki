import type { SpokeData } from '@/data/spoke/types'
import {
  SpokeTable, TipBox, FormulaBox, WarnBox,
  Chips, DetailBox, SpokeLinks, Steps,
  SpokeTimeline, SpokeStepCards, SpokeCompareCards,
  SpokeFlow, SpokeChecklist,
} from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '실업급여-피보험기간-180일-계산-합산-방법',

  meta: {
    title: '실업급여 피보험기간 180일 계산 방법 | 이전 직장 합산 조회',
    description: '실업급여 피보험단위기간 180일 계산법과 이전 직장 합산 조건, 고용보험 가입이력 조회 방법까지 한 번에 정리했어요.',
    keywords: [
      '실업급여 피보험기간 180일 계산',
      '실업급여 피보험단위기간 차이',
      '실업급여 이전 직장 합산 방법',
      '실업급여 피보험기간 확인 조회',
    ],
    ogTitle: '실업급여 피보험기간 180일 계산과 합산 방법 | 머니위키',
    ogDescription: '피보험단위기간 180일 계산법, 이전 직장 합산 조건을 확인하세요.',
  },

  hub: {
    url: '/w/실업급여-퇴직사유-임금체불-괴롭힘-피보험기간',
    name: '실업급여 퇴직사유 심화 임금체불 괴롭힘 피보험기간',
  },

  breadcrumb: ['고용노동', '실업급여', '피보험기간 180일'],

  summary3: [
    <>실업급여 수급 요건: 퇴직 전 <strong>18개월</strong> 중 피보험단위기간 <strong>180일 이상</strong></>,
    <>이전 직장에서 실업급여를 받지 않았다면 <strong>3년 이내 합산</strong> 가능</>,
    <>고용보험 가입이력은 <strong>고용24</strong> 또는 <strong>근로복지공단 토탈서비스</strong>에서 무료 조회</>,
  ],

  sourceBar: {
    badge: '출처',
    name: '고용보험법 제40조·제41조',
    date: '2026.02',
  },

  prevNext: {
    next: { title: '고용보험 미가입 소급가입 실업급여', href: '/w/고용보험-미가입-소급가입-실업급여-수급' },
  },

  stickyBar: {
    topLabel: '피보험기간 요건',
    value: '180일 이상',
    buttonText: '계산 방법 보기 →',
    scrollTo: '#s1',
  },

  hero: {
    badge: '2026년 기준',
    h1: (
      <>
        실업급여 <span className="text-[#1E3A5F]">피보험기간 180일</span> 계산과 합산 방법
      </>
    ),
    intro: (
      <p className="text-base text-neutral-500 leading-relaxed">
        퇴직하고 실업급여를 받으려면 피보험기간 180일이 필요하다는 건 들어봤는데, 정확히 어떻게 세는 건지 모르겠다면 잘 오셨어요. <a href="/w/실업급여-퇴직사유-임금체불-괴롭힘-피보험기간" className="text-[#4A7AB5] underline">실업급여 퇴직사유 심화 가이드</a>에서 다루는 핵심 요건이기도 해요. 먼저 180일이 정확히 무슨 뜻인지부터 볼게요.
      </p>
    ),
    hubCTA: {
      badge: '심화 가이드',
      desc: '퇴직사유별 실업급여 인정 기준과 피보험기간 총정리',
    },
  },

  toc: [
    { id: 's1', label: '실업급여 피보험기간 180일은 어떻게 계산하나요?' },
    { id: 's2', label: '실업급여 피보험단위기간과 피보험기간은 뭐가 다른가요?' },
    { id: 's3', label: '실업급여 이전 직장 피보험기간 합산은 어떻게 하나요?' },
    { id: 's4', label: '실업급여 피보험기간은 어디서 확인하고 조회하나요?' },
    { id: 's-faq', label: '자주 묻는 질문' },
  ],

  sections: [
    {
      id: 's1',
      number: 'SECTION 01',
      heading: '실업급여 피보험기간 180일은 어떻게 계산하나요?',
      subtitle: '퇴직 전 18개월 중 보수 지급일 기준으로 세요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            실업급여를 받으려면 <strong>퇴직일 이전 18개월</strong> 동안 피보험단위기간이 <strong>180일 이상</strong>이어야 해요. 여기서 180일은 달력 날짜가 아니라 <strong>보수를 받은 날</strong>만 세는 거예요. 고용보험법 제40조에 명시된 핵심 수급 요건이에요.
          </p>

          <FormulaBox
            lines={[
              { text: '실업급여 수급 요건', comment: true },
              { text: '퇴직일 이전 18개월 중 피보험단위기간 >= 180일' },
            ]}
          />

          <SpokeTable
            id="tbl-180"
            title="근무 형태별 180일 충족 예상 기간"
            subtitle="유급휴일 포함 기준, 실제는 취업규칙에 따라 다를 수 있어요"
            headers={['근무 형태', '주당 유급일', '180일 충족 예상', '비고']}
            rows={[
              ['주 5일 (주휴 포함)', '6일', '약 7~8개월', '주휴일 유급 시'],
              ['주 5일 (주휴 무급)', '5일', '약 9개월', '주휴일 무급 시'],
              ['주 6일', '7일', '약 6~7개월', '토요 근무 포함'],
              ['일용직', '근무일만', '180일 실근무', '하루 단위 계산'],
            ]}
            highlightCol={2}
          />

          <TipBox title="18개월 기준기간이 연장되는 경우도 있어요">
            질병, 부상, 출산, 육아휴직 등으로 30일 이상 보수를 받지 못한 기간이 있으면 그만큼 기준기간이 늘어나요. 최대 3년까지 연장돼요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '핵심',
        title: '피보험기간과 피보험단위기간, 헷갈리시죠?',
        desc: '이름은 비슷하지만 계산 방식이 달라요. 차이를 정확히 알면 내 날수를 놓치지 않아요.',
        icon: 'info',
      },
    },

    {
      id: 's2',
      number: 'SECTION 02',
      heading: '실업급여 피보험단위기간과 피보험기간은 뭐가 다른가요?',
      subtitle: '가입 기간 vs 실제 유급일, 계산 기준이 달라요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            두 용어가 비슷해서 많이 헷갈리잖아요. 쉽게 말하면 <strong>피보험기간</strong>은 고용보험에 가입한 전체 기간이고, <strong>피보험단위기간</strong>은 그중에서 실제로 보수를 받은 날만 센 거예요. 실업급여 180일 요건은 피보험단위기간을 기준으로 해요.
          </p>

          <SpokeCompareCards
            cards={[
              {
                title: '피보험기간',
                subtitle: '고용보험 가입 전체 기간',
                items: [
                  '고용보험 자격 취득일 ~ 상실일',
                  '달력상 날짜 기준으로 세요',
                  '수급기간(소정급여일수) 산정에 사용',
                  '이전 직장 합산 시에도 적용',
                ],
              },
              {
                title: '피보험단위기간',
                subtitle: '보수 지급 기초가 된 날',
                items: [
                  '실제 근로한 날 + 유급휴일',
                  '무급휴일, 무급휴직은 제외',
                  '실업급여 180일 요건의 기준',
                  '주휴수당 지급일도 포함',
                ],
                recommended: true,
                recLabel: '180일 기준',
              },
            ]}
          />

          <DetailBox
            title="피보험단위기간에 포함되는 날"
            items={[
              { heading: '실제 근로일', desc: '출근해서 일한 날은 당연히 포함돼요' },
              { heading: '유급휴일', desc: '주휴일, 유급 공휴일처럼 쉬어도 급여를 받는 날이에요' },
              { heading: '유급휴업일', desc: '회사 사정으로 쉬었지만 휴업수당을 받은 날도 포함돼요' },
              { heading: '연차 사용일', desc: '연차휴가를 쓴 날도 유급이라 포함돼요' },
            ]}
          />

          <WarnBox>
            <strong>무급휴직, 무급휴일은 제외돼요.</strong> 육아휴직 중 급여를 받지 않는 기간이나 무급 안식휴가 같은 날은 피보험단위기간에 안 들어가요. 다만 18개월 기준기간을 연장하는 효과는 있어요.
          </WarnBox>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '합산',
        title: '이전 직장 기간도 합칠 수 있다는 거 아셨나요?',
        desc: '실업급여를 받지 않았던 이전 직장 피보험기간은 지금 직장과 합산할 수 있어요.',
        icon: 'calc',
      },
    },

    {
      id: 's3',
      number: 'SECTION 03',
      heading: '실업급여 이전 직장 피보험기간 합산은 어떻게 하나요?',
      subtitle: '실업급여 미수급 + 3년 이내 재취업이면 합산 가능',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            현재 직장에서 180일을 채우지 못했더라도 포기하지 마세요. 이전 직장에서 <strong>실업급여를 받지 않았다면</strong> 그 피보험기간을 합산할 수 있어요. 고용보험법 제41조에서 보장하는 권리예요.
          </p>

          <SpokeChecklist
            items={[
              { text: '이전 직장에서 실업급여(구직급여)를 받지 않았다', done: true, note: '핵심 조건: 수급 이력이 없어야 해요' },
              { text: '이전 직장 퇴직 후 3년 이내에 새 직장에 입사했다', done: true, note: '3년 초과 시 합산 불가' },
              { text: '이전 직장에서 고용보험에 가입돼 있었다', done: true, note: '4대보험 가입 확인 필수' },
            ]}
          />

          <SpokeFlow
            steps={[
              { icon: '🏢', label: 'A회사 퇴직', sub: '실업급여 미수급' },
              { icon: '📅', label: '3년 이내', sub: '재취업 기간' },
              { icon: '🏢', label: 'B회사 입사', sub: '고용보험 가입' },
              { icon: '✅', label: '합산 인정', sub: 'A+B 기간' },
            ]}
          />

          <SpokeTable
            id="tbl-merge"
            title="피보험기간 합산 가능 여부 판단표"
            subtitle="고용보험법 제41조 기준"
            headers={['상황', '합산 가능', '근거']}
            rows={[
              ['이전 직장 실업급여 미수급 + 3년 이내 재취업', '가능', '제41조 제1항'],
              ['이전 직장 실업급여 수급 완료 후 재취업', '불가', '제41조 제2항'],
              ['이전 직장 퇴직 후 3년 초과 공백', '불가', '제41조 제1항'],
              ['이전 직장 일부 수급 후 잔여일수 포기', '불가', '수급 이력 존재'],
              ['2개 이상 이전 직장 (모두 미수급)', '가능', '여러 직장 합산 가능'],
            ]}
            highlightCol={1}
          />

          <TipBox title="여러 직장을 거쳤더라도 하나씩 합산할 수 있어요">
            A회사 → B회사 → C회사로 이직했는데 A, B 모두 실업급여를 받지 않았다면, 세 곳의 피보험기간을 전부 합산해요. 단, 중간에 한 번이라도 실업급여를 받았으면 그 이전 기간은 빠져요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '조회',
        title: '내 피보험기간이 정확히 얼마인지 궁금하시죠?',
        desc: '고용24와 근로복지공단 토탈서비스에서 무료로 확인할 수 있어요.',
        icon: 'calc',
      },
    },

    {
      id: 's4',
      number: 'SECTION 04',
      heading: '실업급여 피보험기간은 어디서 확인하고 조회하나요?',
      subtitle: '고용24, 근로복지공단 토탈서비스에서 무료 조회',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            내 피보험기간이 180일이 되는지 직접 확인하고 싶잖아요. 온라인으로 바로 조회할 수 있는 방법이 2가지 있어요. 퇴사 후 2~3주면 최신 이력이 반영되니까 그때 조회하면 정확해요.
          </p>

          <Steps
            items={[
              { title: '고용24(work24.go.kr) 접속', desc: '공동인증서 또는 간편인증으로 로그인해요' },
              { title: '개인 서비스 → 고용보험 피보험자격 이력 조회', desc: '과거 직장별 자격 취득일·상실일이 전부 나와요' },
              { title: '피보험단위기간 확인', desc: '각 직장별 피보험단위기간 합계를 확인해요' },
              { title: '합산 가능 여부 판단', desc: '실업급여 수급 이력이 없는 직장의 기간을 합산해요' },
            ]}
          />

          <Chips
            items={[
              { icon: '💻', label: '온라인', value: '고용24', href: 'https://www.work24.go.kr' },
              { icon: '🏛️', label: '토탈서비스', value: '근로복지공단' },
              { icon: '📱', label: '전화', value: '1588-0075' },
              { icon: '🏢', label: '방문', value: '고용센터' },
            ]}
          />

          <TipBox title="고용보험 피보험자격 이력내역서도 발급받을 수 있어요">
            근로복지공단 토탈서비스(total.comwel.or.kr)에서 PDF로 바로 발급돼요. 고용센터 방문 시 가져가면 상담이 빨라져요. 비용은 무료예요.
          </TipBox>

          <SpokeLinks
            title="실업급여 관련 글 더 보기"
            items={[
              { num: '01', heading: '실업급여 수급 조건 자격 요건 완벽정리', desc: '180일 외 나머지 수급 요건까지 한눈에', href: '/w/실업급여-수급-조건-자격-요건-완벽정리' },
              { num: '02', heading: '일용직 건설근로자 실업급여 피보험기간 계산', desc: '일용직은 하루 단위로 따로 계산해요', href: '/w/일용직-건설근로자-실업급여-피보험기간-계산' },
              { num: '03', heading: '고용보험 미가입 소급가입 실업급여 수급', desc: '회사가 고용보험을 안 넣어줬을 때 해결법', href: '/w/고용보험-미가입-소급가입-실업급여-수급' },
            ]}
          />
        </>
      ),
      bridgeCTA: {
        href: '/w/실업급여-퇴직사유-임금체불-괴롭힘-피보험기간',
        badge: '허브',
        title: '피보험기간 확인 후 퇴직사유도 점검하세요',
        desc: '임금체불, 괴롭힘, 근로조건 변경 등 정당한 퇴직사유 인정 기준을 확인할 수 있어요.',
        icon: 'check',
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
      question: '실업급여 피보험기간 180일에 주휴일도 포함되나요?',
      answer: '<strong>유급 주휴일은 포함</strong>돼요. 주 15시간 이상 근무하면 주 1일 유급 주휴일이 발생하고, 이 날도 피보험단위기간에 들어가요. 다만 무급 주휴일이라면 제외돼요.',
    },
    {
      question: '실업급여 피보험기간은 18개월 이전 것도 인정되나요?',
      answer: '원칙적으로 <strong>퇴직일 이전 18개월</strong>만 봐요. 단, 질병·부상·출산·육아휴직 등으로 30일 이상 보수를 못 받은 기간이 있으면 그만큼 기준기간이 연장돼요. 최대 <strong>3년</strong>까지 늘어날 수 있어요.',
    },
    {
      question: '이전 직장 합산은 자동으로 되나요?',
      answer: '<strong>자동으로 처리</strong>돼요. 고용센터에서 피보험자격 이력을 조회하면 이전 직장 기간이 합산 가능한지 바로 확인해줘요. 별도 신청 서류는 필요 없어요.',
    },
    {
      question: '수습기간이나 인턴기간도 피보험기간에 포함되나요?',
      answer: '<strong>고용보험에 가입돼 있었다면 포함</strong>돼요. 수습·인턴이라도 4대보험 가입 대상이면 그 기간의 피보험단위기간이 인정돼요. 단, 고용보험 미가입 상태였다면 빠져요.',
    },
  ],

  relatedSpokes: [
    { badge: '수급 조건', title: '실업급여 수급 조건 자격 요건 완벽정리', desc: '180일 외 나머지 수급 요건 총정리', href: '/w/실업급여-수급-조건-자격-요건-완벽정리' },
    { badge: '일용직', title: '일용직 건설근로자 실업급여 피보험기간 계산', desc: '일용직 하루 단위 피보험기간 계산법', href: '/w/일용직-건설근로자-실업급여-피보험기간-계산' },
    { badge: '미가입', title: '고용보험 미가입 소급가입 실업급여 수급', desc: '회사가 고용보험을 안 들어줬을 때 해결법', href: '/w/고용보험-미가입-소급가입-실업급여-수급' },
    { badge: '신청 절차', title: '실업급여 신청 방법 절차 준비서류', desc: '온라인·오프라인 신청 절차와 필요 서류', href: '/w/실업급여-신청-방법-절차-준비서류' },
    { badge: '수급기간', title: '실업급여 수급기간 소정급여일수 기준', desc: '나이·피보험기간별 최대 수급일수 확인', href: '/w/실업급여-수급기간-소정급여일수-기준' },
  ],

  sources: [
    { name: '고용보험법 제40조·제41조', url: 'https://www.law.go.kr/법령/고용보험법', org: '법제처' },
    { name: '고용보험법 시행규칙 별표2', url: 'https://www.law.go.kr/법령/고용보험법시행규칙', org: '법제처' },
    { name: '찾기쉬운 생활법령정보 실업급여', url: 'https://www.easylaw.go.kr/CSP/CnpClsMainBtr.laf?popMenu=ov&csmSeq=722&ccfNo=2&cciNo=1&cnpClsNo=1', org: '법제처' },
    { name: '고용24 피보험자격 이력 조회', url: 'https://www.work24.go.kr', org: '고용노동부' },
  ],
}

export default data
