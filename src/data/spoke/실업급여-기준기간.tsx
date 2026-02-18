import type { SpokeData } from '@/data/spoke/types'
import {
  SpokeTable,
  SpokeCompareCards,
  FormulaBox,
  RateCards,
  TipBox,
  SpokeLinks,
} from '@/components/spoke/SpokeBlocks'
import 기준기간Checker from '@/components/checkers/기준기간Checker'

const data: SpokeData = {
  slug: '실업급여-기준기간',

  meta: {
    title: '실업급여 기준기간 이직일 이전 18개월 | 피보험기간 180일 합산 방법',
    description: '실업급여 기준기간 18개월이 뭔지 헷갈리시죠? 이직일 이전 18개월 역산 방법부터 피보험기간 180일 합산 기준과 기준기간 연장 사유까지 정리해드려요.',
    keywords: [
      '실업급여 기준기간',
      '이직일 이전 18개월',
      '피보험기간 180일',
      '합산 방법',
    ],
    ogTitle: '실업급여 기준기간 이직일 이전 18개월 | 머니위키',
    ogDescription: '기준기간 18개월 역산 방법과 피보험기간 180일 합산 기준을 확인하세요.',
  },

  hub: {
    url: '/w/실업급여-수급-조건-신청-방법-2026',
    name: '실업급여 수급 조건 신청 방법 2026',
  },

  breadcrumb: ['고용·노동', '실업급여', '기준기간'],

  summary3: [
    <>기준기간은 <strong>이직일 이전 18개월</strong>로, 이 기간 내 180일 이상 일해야 해요</>,
    <>질병·출산·육아 사유가 있으면 기준기간이 <strong>최대 3년까지 연장</strong>돼요</>,
    <>이전 직장 근무기간도 기준기간 내라면 <strong>합산 가능</strong>해요</>,
  ],

  sourceBar: {
    badge: '출처',
    name: '고용보험법 제40조·제43조',
    date: '2026.02',
  },

  prevNext: {
    prev: { title: '실업급여 구직활동 인정 증빙 방법', href: '/w/실업급여-구직활동' },
    next: { title: '실업급여 기초일액 평균임금 60% 계산', href: '/w/실업급여-기초일액' },
  },

  stickyBar: {
    topLabel: '기준기간',
    value: '이직일 이전 18개월',
    buttonText: '충족 여부 확인 →',
    scrollTo: '#checker',
  },

  hero: {
    badge: '2026년 기준',
    h1: (
      <>
        실업급여 <span className="text-[#1E3A5F]">기준기간</span> 이직일 이전 18개월{' '}| 피보험기간 180일 합산 방법
      </>
    ),
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          실업급여 조건 찾아보다가 &quot;기준기간 18개월&quot;이라는 말이 나왔는데, 180일이랑 뭐가 다른지 헷갈리셨죠?
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          기준기간은 <strong className="text-neutral-800">피보험단위기간 180일을 계산하는 범위</strong>예요.
          이직일 이전 18개월 안에 180일 이상 일했는지를 확인하는 거예요.
          <a href="/w/실업급여-피보험기간-180일-계산-합산-방법" className="text-[#4A7AB5] underline">피보험기간 180일 계산 방법</a>도 함께 보시면 이해가 빨라요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          18개월 역산 방법부터 연장 사유, 여러 직장 합산 기준까지 순서대로 정리해드릴게요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '실업급여 수급 조건·신청 방법·금액 총정리',
    },
  },

  toc: [
    { id: 's1', label: '실업급여 기준기간은 무엇인가요?' },
    { id: 's2', label: '이직일 이전 18개월은 어떻게 계산하나요?' },
    { id: 's3', label: '피보험기간 180일은 어떻게 채우나요?' },
    { id: 's4', label: '실업급여 피보험기간 합산 방법은 어떻게 되나요?' },
    { id: 'checker', label: '내 기준기간 충족 여부 확인' },
    { id: 's-faq', label: '자주 묻는 질문' },
  ],

  sections: [
    // --- SECTION 01: 기준기간 개념 ---
    {
      id: 's1',
      number: 'SECTION 01',
      heading: '실업급여 기준기간은 무엇인가요?',
      subtitle: '180일을 계산하는 기준이 되는 기간이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            기준기간은 실업급여 수급자격 조건인 &quot;피보험단위기간 180일&quot;을 따지는 기준 기간이에요.
            이직일(퇴직일)로부터 역산해서 18개월 이내에 180일 이상 일했는지를 확인하는 방식이에요.
            18개월 밖에서 일한 날수는 아무리 많아도 계산에 포함되지 않아요.
            최근 고용 상태를 기준으로 삼기 위해 이 18개월 범위를 두는 거예요.
          </p>

          <SpokeCompareCards cards={[
            {
              title: '기준기간 내 근무',
              subtitle: '이직일 이전 18개월 이내',
              items: [
                '피보험단위기간 합산에 포함',
                '180일 계산에 반영',
                '여러 직장 근무기간 합산 가능',
                '연장 사유 있으면 범위 확대',
              ],
              recommended: true,
              recLabel: '이 기간만 인정',
            },
            {
              title: '기준기간 외 근무',
              subtitle: '이직일 이전 18개월 초과',
              items: [
                '피보험단위기간 합산에서 제외',
                '180일 계산에 미반영',
                '이전 실업급여 수급 후 기간도 제외',
                '연장 사유 없으면 계산 불가',
              ],
            },
          ]} />

          <SpokeLinks
            title="피보험기간·수급 조건 함께 보기"
            items={[
              { num: '01', heading: '피보험기간 180일 계산 방법', desc: '여러 직장 합산 방법과 일용직 기준', href: '/w/실업급여-피보험기간-180일-계산-합산-방법' },
              { num: '02', heading: '실업급여 수급 조건 자격 요건', desc: '비자발적 이직 등 전체 수급자격 안내', href: '/w/실업급여-수급-조건-자격-요건-완벽정리' },
            ]}
          />

          <p className="text-neutral-600 mb-0">
            기준기간의 의미를 알았으니, 이직일로부터 18개월을 어떻게 역산하는지 살펴볼게요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '/w/실업급여-피보험기간-180일-계산-합산-방법',
        badge: '계산 방법',
        title: '피보험기간 180일은 어떻게 계산하나요?',
        desc: '일한 날수 계산 방법과 여러 직장 합산 기준',
        icon: 'calc',
      },
    },

    // --- SECTION 02: 18개월 역산 ---
    {
      id: 's2',
      number: 'SECTION 02',
      heading: '이직일 이전 18개월은 어떻게 계산하나요?',
      subtitle: '퇴직한 날로부터 역산해서 18개월 전까지예요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            18개월 역산은 생각보다 간단해요.
            퇴직한 날(이직일)을 기준으로 달력에서 18개월 전까지가 기준기간이에요.
            예를 들어 2026년 3월 31일에 퇴직했다면, 기준기간은 2024년 10월 1일부터 2026년 3월 31일까지예요.
            이 기간 안에 180일 이상 일했는지 확인하면 돼요.
          </p>

          <FormulaBox lines={[
            { text: '기준기간 계산 공식', comment: true },
            { text: '기준기간 시작일 = 이직일 - 18개월 + 1일' },
            { text: '기준기간 종료일 = 이직일' },
            { text: '' },
            { text: '예시: 2026년 3월 31일 이직', comment: true },
            { text: '기준기간: 2024년 10월 1일 ~ 2026년 3월 31일' },
          ]} />

          <SpokeTable
            id="tbl-period"
            title="이직일별 기준기간 예시"
            subtitle="이직일 기준 역산 18개월"
            headers={['이직일', '기준기간 시작', '기준기간 종료']}
            rows={[
              ['2026년 3월 31일', '2024년 10월 1일', '2026년 3월 31일'],
              ['2026년 6월 30일', '2024년 12월 31일', '2026년 6월 30일'],
              ['2026년 12월 31일', '2025년 7월 1일', '2026년 12월 31일'],
            ]}
          />

          <p className="text-neutral-600 mb-0">
            18개월 역산 범위를 파악했으니, 그 안에서 180일을 어떻게 채우는지 알아볼게요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '/w/실업급여-수급-조건-자격-요건-완벽정리',
        badge: '수급자격',
        title: '실업급여 수급 조건이 더 궁금하다면?',
        desc: '기준기간·피보험기간·비자발적 이직 등 전체 요건',
        icon: 'grid',
      },
    },

    // --- SECTION 03: 180일 채우기 ---
    {
      id: 's3',
      number: 'SECTION 03',
      heading: '피보험기간 180일은 어떻게 채우나요?',
      subtitle: '근무 형태에 따라 계산 방법이 달라요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            피보험단위기간 180일은 고용보험에 가입된 상태로 실제로 일한 날수를 합산해서 계산해요.
            유급휴일은 포함되지만, 무급휴가·결근은 제외돼요.
            고용보험에 가입되지 않은 기간은 아예 계산이 안 돼요.
            근무 형태(상용직·일용직·단시간)에 따라 계산 방식이 약간 달라요.
          </p>

          <RateCards cards={[
            {
              icon: 'check',
              label: '정규직·계약직 (상용직)',
              value: '실 근무일 + 유급휴일',
              highlight: '가장 일반적',
              highlightColor: 'navy',
            },
            {
              icon: 'check',
              label: '단시간·파트타임',
              value: '월 60시간 이상이면 포함',
            },
            {
              icon: 'clock',
              label: '무급 결근·무급휴직',
              value: '제외됨',
            },
            {
              icon: 'clock',
              label: '고용보험 미가입 기간',
              value: '전혀 포함 안 됨',
            },
          ]} />

          <TipBox title="기준기간이 연장되는 경우">
            <p>
              질병·부상, 임신·출산·육아, 병역의무 등으로 일하지 못한 기간이 있다면
              기준기간이 최대 3년까지 연장될 수 있어요.
              이 경우{' '}
              <a href="/w/실업급여-신청-방법-절차-준비서류" className="text-[#4A7AB5] underline">고용센터 신청</a> 시
              증빙서류(진단서·출산확인서 등)를 함께 제출하면 돼요.
            </p>
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '/w/실업급여-신청-방법-절차-준비서류',
        badge: '신청 절차',
        title: '기준기간 충족 후 실업급여 신청은 어떻게 하나요?',
        desc: '고용센터 방문부터 고용24 온라인 신청까지',
        icon: 'check',
      },
    },

    // --- SECTION 04: 합산 방법 ---
    {
      id: 's4',
      number: 'SECTION 04',
      heading: '실업급여 피보험기간 합산 방법은 어떻게 되나요?',
      subtitle: '기준기간 내 여러 직장 근무기간을 더할 수 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            기준기간(18개월) 안에 여러 직장을 다녔다면 각 직장의 피보험단위기간을 합산할 수 있어요.
            A회사를 3개월 다니다 퇴직하고, 2개월 쉬다가 B회사를 6개월 다닌 경우라면 두 회사 기간을 더해요.
            단, 이전에 실업급여를 받은 적이 있다면 그 이전 가입 이력은 초기화돼요.
            그래서 수급 이력이 있는 경우에는 마지막 수급 이후 기간부터만 합산이 가능해요.
          </p>

          <SpokeTable
            id="tbl-combine"
            title="여러 직장 합산 예시"
            subtitle="기준기간 내 근무기간만 합산"
            headers={['직장', '근무기간', '기준기간 내 여부', '합산 여부']}
            rows={[
              ['A회사', '4개월 (90일)', '이직일 이전 18개월 이내', '포함 ✓'],
              ['B회사', '5개월 (120일)', '이직일 이전 18개월 이내', '포함 ✓'],
              ['C회사', '3개월 (80일)', '기준기간 밖 (20개월 전)', '제외 ✗'],
              ['합산', '—', '—', '90 + 120 = 210일'],
            ]}
            highlightCol={3}
          />

          <SpokeLinks
            title="실업급여 금액·기간 추가 확인"
            items={[
              { num: '01', heading: '실업급여 기초일액 1일 지급액', desc: '평균임금 60% 계산과 상한·하한 기준', href: '/w/실업급여-기초일액' },
              { num: '02', heading: '실업급여 수급기간 소정급여일수', desc: '나이·가입기간별 수급일수 120~270일', href: '/w/실업급여-수급기간-소정급여일수-기준' },
            ]}
          />

          <p className="text-neutral-600 mb-0">
            합산 기준을 파악했으니, 내 기준기간이 180일을 충족하는지 바로 확인해볼게요.
          </p>
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

    // --- CHECKER ---
    {
      id: 'checker',
      number: 'CHECK',
      heading: '내 기준기간 180일 충족 여부 확인하기',
      subtitle: '근무일수를 선택하면 수급 가능 여부를 바로 알 수 있어요',
      content: (
        <기준기간Checker />
      ),
    },

    // --- FAQ ---
    {
      id: 's-faq',
      number: '06',
      heading: '자주 묻는 질문',
      subtitle: '',
      content: null,
    },
  ],

  faq: [
    {
      question: '실업급여 기준기간 18개월은 어디서부터 계산하나요?',
      answer: '이직일(퇴직한 날)로부터 역산해서 18개월 전까지예요. 예를 들어 3월 31일에 퇴직했다면 전년도 10월 1일부터 퇴직일까지가 기준기간이에요.',
    },
    {
      question: '실업급여 피보험기간 합산 방법, 여러 직장 근무기간을 더할 수 있나요?',
      answer: '기준기간(이직일 이전 18개월) 안에 있는 여러 직장 근무기간은 합산 가능해요. 단, 이전에 실업급여를 받은 적이 있다면 그 이전 기간은 초기화되니까 주의하세요.',
    },
  ],

  relatedSpokes: [
    { badge: '계산', title: '피보험기간 180일 계산 합산 방법', desc: '여러 직장 합산 방법과 일용직 기준', href: '/w/실업급여-피보험기간-180일-계산-합산-방법' },
    { badge: '조건', title: '실업급여 수급 조건 자격 요건', desc: '비자발적 이직 등 전체 수급자격 안내', href: '/w/실업급여-수급-조건-자격-요건-완벽정리' },
    { badge: '신청', title: '실업급여 신청 방법 절차 준비서류', desc: '워크넷 등록부터 고용센터 접수까지', href: '/w/실업급여-신청-방법-절차-준비서류' },
  ],

  sources: [
    { name: '고용보험법 제40조 (수급 자격)', url: 'https://www.law.go.kr/법령/고용보험법', org: '법제처' },
    { name: '고용보험법 제43조 (기준기간)', url: 'https://www.law.go.kr/법령/고용보험법', org: '법제처' },
    { name: '실업급여 안내', url: 'https://www.ei.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePb0201Info.do', org: '고용보험' },
  ],
}

export default data
