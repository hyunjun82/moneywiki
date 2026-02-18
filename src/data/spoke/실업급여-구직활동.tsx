import type { SpokeData } from '@/data/spoke/types'
import {
  SpokeTable,
  SpokeCompareCards,
  FormulaBox,
  SpokeChecklist,
  RateCards,
  TipBox,
  SpokeLinks,
} from '@/components/spoke/SpokeBlocks'
import 구직활동차수Checker from '@/components/checkers/구직활동차수Checker'

const data: SpokeData = {
  slug: '실업급여-구직활동',

  meta: {
    title: '실업급여 구직활동 인정 증빙 방법 | 워크넷 입사지원 온라인 교육',
    description: '실업급여 구직활동 인정 기준이 차수마다 다르다는 거 아시나요? 1차 온라인 교육부터 5차 이후 2회 요건까지, 워크넷 입사지원 증빙 방법을 정리해드려요.',
    keywords: [
      '실업급여 구직활동',
      '인정 증빙 방법',
      '워크넷 입사지원',
      '온라인 교육',
    ],
    ogTitle: '실업급여 구직활동 인정 증빙 방법 | 머니위키',
    ogDescription: '차수별 구직활동 요건과 워크넷 입사지원 증빙 방법을 확인하세요.',
  },

  hub: {
    url: '/w/실업급여-수급-조건-신청-방법-2026',
    name: '실업급여 수급 조건 신청 방법 2026',
  },

  breadcrumb: ['고용·노동', '실업급여', '구직활동'],

  summary3: [
    <>구직활동 요건은 <strong>차수마다 달라요</strong>. 1차는 온라인 교육, 5차부터는 2회 이상이에요</>,
    <>워크넷 입사지원은 <strong>고용24 자동 연동</strong>으로 별도 증빙 없이 인정돼요</>,
    <>1일 1회 제한이 있어서 <strong>같은 날 여러 활동을 해도 1회</strong>만 계산돼요</>,
  ],

  sourceBar: {
    badge: '출처',
    name: '고용보험법 제44조·시행규칙 제101조',
    date: '2026.02',
  },

  prevNext: {
    prev: { title: '실업급여 신청 방법 절차 준비서류', href: '/w/실업급여-신청-방법-절차-준비서류' },
    next: { title: '실업급여 기준기간 이직일 이전 18개월', href: '/w/실업급여-기준기간' },
  },

  stickyBar: {
    topLabel: '5차 이후 구직활동',
    value: '2회 이상 필수',
    buttonText: '차수별 확인 →',
    scrollTo: '#checker',
  },

  hero: {
    badge: '2026년 기준',
    h1: (
      <>
        실업급여 <span className="text-[#1E3A5F]">구직활동 인정 증빙 방법</span>{' '}| 워크넷 입사지원 온라인 교육
      </>
    ),
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          실업급여 받는 중에 구직활동을 해야 한다는 건 알겠는데, 정확히 뭘 해야 하는지 막막하셨죠?
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          인정되는 활동 종류와 횟수는 <strong className="text-neutral-800">실업인정 차수마다 달라요</strong>.
          1차는 온라인 교육으로 대체되고, 5차 이후부터는 구직활동이 필수로 포함돼야 해요.
          <a href="/w/실업급여-실업인정-구직활동-방법" className="text-[#4A7AB5] underline">실업인정 방법 전반</a>도 함께 보시면 이해가 훨씬 빨라요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          차수별 요건부터 워크넷 입사지원 방법까지 순서대로 정리해드릴게요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '실업급여 수급 조건·신청 방법·금액 총정리',
    },
  },

  toc: [
    { id: 's1', label: '실업급여 구직활동 인정 기준은 무엇인가요?' },
    { id: 'checker', label: '내 차수별 구직활동 요건 확인' },
    { id: 's2', label: '실업급여 구직활동 증빙 방법은 어떻게 되나요?' },
    { id: 's3', label: '워크넷 입사지원으로 구직활동 인정받는 방법은?' },
    { id: 's4', label: '실업급여 구직활동 온라인 교육은 무엇인가요?' },
    { id: 's-faq', label: '자주 묻는 질문' },
  ],

  sections: [
    // --- SECTION 01: 인정 기준 ---
    {
      id: 's1',
      number: 'SECTION 01',
      heading: '실업급여 구직활동 인정 기준은 무엇인가요?',
      subtitle: '구직활동과 구직외활동, 차수별로 요건이 달라요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            실업인정마다 재취업활동을 했다는 걸 증명해야 해요.
            인정되는 활동은 크게 <strong>구직활동</strong>과 <strong>구직외활동</strong> 두 가지로 나뉘어요.
            구직활동은 입사지원·면접 같은 직접적인 취업 노력이고, 구직외활동은 취업특강·직업훈련 같은 역량 강화 활동이에요.
            차수가 올라갈수록 더 많은 횟수가 요구되는 구조예요.
          </p>

          <SpokeCompareCards cards={[
            {
              title: '구직활동',
              subtitle: '직접적 취업 노력',
              items: [
                '워크넷·사람인·잡코리아 입사지원',
                '채용 면접 참석 (면접확인서 필요)',
                '채용박람회 참여',
                '구인업체 방문·우편 지원',
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
                'HRD-Net 직업능력훈련 수강',
              ],
            },
          ]} />

          <SpokeTable
            id="tbl-round"
            title="차수별 재취업활동 요건"
            subtitle="고용보험법 시행규칙 제101조 기준"
            headers={['차수', '필요 횟수', '구직활동 필수 여부', '비고']}
            rows={[
              ['1차', '없음', '불필요', '온라인 교육 이수만'],
              ['2~4차', '1회 이상', '선택', '구직활동 또는 구직외활동'],
              ['5차 이후', '2회 이상', '구직활동 1회 필수', '1일 1회만 인정'],
            ]}
            highlightCol={1}
          />

          <SpokeLinks
            title="실업인정 방법 더 자세히 보기"
            items={[
              { num: '01', heading: '실업인정 온라인 출석 방법', desc: '1~4차 출석/온라인 구분과 신청 절차', href: '/w/실업급여-실업인정-구직활동-방법' },
              { num: '02', heading: '실업급여 신청 방법 절차', desc: '수급자격 신청부터 1차 실업인정까지', href: '/w/실업급여-신청-방법-절차-준비서류' },
            ]}
          />

          <p className="text-neutral-600 mb-0">
            어떤 활동이 인정되는지 알았으니, 이제 실제로 어떻게 증빙하면 되는지 살펴볼게요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '/w/실업급여-실업인정-구직활동-방법',
        badge: '온라인 신청',
        title: '고용24에서 실업인정 온라인 신청하는 방법은?',
        desc: '온라인 실업인정 신청 절차와 출석 회차 구분',
        icon: 'grid',
      },
    },

    // --- CHECKER ---
    {
      id: 'checker',
      number: 'CHECK',
      heading: '내 차수에 맞는 구직활동 요건 확인하기',
      subtitle: '차수를 선택하면 필요한 횟수와 증빙 방법을 바로 알 수 있어요',
      content: (
        <구직활동차수Checker />
      ),
    },

    // --- SECTION 02: 증빙 방법 ---
    {
      id: 's2',
      number: 'SECTION 02',
      heading: '실업급여 구직활동 증빙 방법은 어떻게 되나요?',
      subtitle: '활동 유형에 따라 자동 연동 vs 직접 제출로 나뉘어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            구직활동이 있었다고 해서 자동으로 인정되는 건 아니에요.
            고용24에서 실업인정 신청할 때 활동 내역을 입력하거나 연동해야 실적으로 처리돼요.
            증빙 방식은 온라인 채용사이트와 오프라인 활동이 다르니 미리 알아두세요.
            증빙이 잘못되면 실적이 불인정될 수 있어서 꼼꼼하게 확인하는 게 중요해요.
          </p>

          <RateCards cards={[
            {
              label: '워크넷 입사지원',
              value: '자동 연동',
              lines: ['별도 서류 불필요', '고용24 자동 처리'],
              highlight: '가장 편리',
              highlightColor: 'navy',
            },
            {
              label: '연동 민간 채용사이트',
              value: '자동 처리',
              lines: ['사람인·잡코리아 등', '연동 목록 확인 필요'],
            },
            {
              label: '비연동 사이트 지원',
              value: '캡처 첨부',
              lines: ['지원 완료 화면 저장', '회사명·날짜 보여야 함'],
            },
            {
              label: '오프라인 면접·교육',
              value: '확인서 필요',
              lines: ['면접확인서·출석확인서', '증빙 발급 후 첨부'],
            },
          ]} />

          <FormulaBox lines={[
            { text: '증빙 흐름', comment: true },
            { text: '① 워크넷·연동 사이트 지원 → 고용24 자동 연동' },
            { text: '② 비연동 사이트 지원 → 지원완료 화면 캡처 첨부' },
            { text: '③ 오프라인 면접 → 면접확인서 수령 후 첨부' },
            { text: '④ 취업특강·훈련 → 출석확인서 수령 후 첨부' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            중요한 것은 <strong>1일 1회만 인정된다</strong>는 점이에요.
            같은 날 입사지원을 여러 번 해도 1회로만 계산돼요.
            그래서 2회가 필요한 5차 이후에는 반드시 이틀에 나눠서 활동해야 해요.
          </p>

          <TipBox title="부정수급 주의">
            <p>실제로 취업 의사가 없는 회사에 반복 지원하다 적발되면{' '}
              <a href="/w/실업급여-반복수급-감액-대기기간-2026-개정" className="text-[#4A7AB5] underline">반복수급 감액 대상</a>이 될 수 있어요.
              수급액 반환과 추가 제재까지 받을 수 있으니 성실하게 활동하는 게 원칙이에요.
            </p>
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '/w/실업급여-수급-조건-신청-방법-2026',
        badge: '주의사항',
        title: '형식적인 구직활동은 수급 자격에 영향을 줄 수 있어요',
        desc: '실업급여 수급 조건 전반과 주의사항 확인',
        icon: 'info',
      },
    },

    // --- SECTION 03: 워크넷 입사지원 ---
    {
      id: 's3',
      number: 'SECTION 03',
      heading: '워크넷 입사지원으로 구직활동 인정받는 방법은?',
      subtitle: '고용24와 자동 연동돼서 별도 서류가 필요 없어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            워크넷 입사지원이 구직활동 중 가장 편리한 이유는 <strong>고용24와 자동 연동</strong>되기 때문이에요.
            별도 서류 없이 지원 내역이 자동으로 실업인정 화면에 뜨니까 따로 챙길 게 없어요.
            사람인, 잡코리아 등 연동 가능한 민간 채용사이트도 같은 방식으로 처리돼요.
            연동이 안 되는 사이트라면 지원 완료 화면을 캡처해서 첨부하면 돼요.
          </p>

          <SpokeChecklist items={[
            { text: '워크넷 또는 고용24 아이디 미리 만들어두기', done: true, note: '필수 준비' },
            { text: '희망 직종·지역 외 공고도 지원 가능해요', done: true, note: '제한 없음' },
            { text: '지원 완료 후 고용24 실업인정 신청 화면에서 자동 확인', done: true, note: '자동 연동' },
            { text: '같은 회사에 같은 기간 반복 지원', done: false, note: '인정 불가' },
            { text: '지원 의사 없는 공고 형식적 지원', done: false, note: '부정수급 위험' },
          ]} />

          <SpokeLinks
            title="실업급여 관련 추가 정보"
            items={[
              { num: '01', heading: '실업급여 지급일 첫 입금일', desc: '7일 대기기간 계산과 지급 주기 안내', href: '/w/실업급여-지급일-첫-입금일-대기기간' },
              { num: '02', heading: '실업급여 기초일액 계산', desc: '1일 지급액 상한·하한 기준 안내', href: '/w/실업급여-기초일액' },
            ]}
          />
        </>
      ),
      bridgeCTA: {
        href: '/w/실업급여-기초일액',
        badge: '기초일액',
        title: '실업급여를 하루에 얼마나 받나요?',
        desc: '1일 지급액 상한 68,100원·하한 66,048원 계산법',
        icon: 'calc',
      },
    },

    // --- SECTION 04: 온라인 교육 ---
    {
      id: 's4',
      number: 'SECTION 04',
      heading: '실업급여 구직활동 온라인 교육은 무엇인가요?',
      subtitle: '1차 실업인정은 온라인 교육 이수만으로 대체돼요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            실업급여를 처음 받는 1차 실업인정에서는 구직활동 없이 <strong>수급자격자 온라인 교육 이수</strong>만 하면 돼요.
            교육 시간은 약 1시간이고, 고용24 앱이나 웹사이트에서 언제든 수강할 수 있어요.
            이수하고 나면 자동으로 1차 실업인정 실적이 처리되니 따로 신청할 필요가 없어요.
            교육을 빠뜨리면 1차 급여가 나오지 않으니 수급자격 인정 후 바로 수강하는 걸 추천해요.
          </p>

          <SpokeTable
            id="tbl-edu"
            title="1차 온라인 교육 vs 2차 이후 구직활동"
            subtitle="차수별 실업인정 요건 비교"
            headers={['구분', '1차 실업인정', '2~4차', '5차 이후']}
            rows={[
              ['인정 방식', '온라인 교육 이수', '재취업활동 1회', '재취업활동 2회'],
              ['구직활동 필수', '불필요', '선택', '구직활동 1회 필수'],
              ['수강·활동 기한', '실업인정일 전까지', '인정기간 내', '인정기간 내 이틀 이상'],
              ['자동 처리 여부', '교육 완료 시 자동', '직접 입력·연동', '직접 입력·연동'],
            ]}
          />

          <p className="text-neutral-600 mb-0">
            1~4차 요건은 파악했으니, 내 차수에 정확히 뭘 해야 하는지 바로 확인해볼게요.
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
      question: '실업급여 구직활동 인정 횟수가 차수마다 다른가요?',
      answer: '네, 달라요. 1차는 온라인 교육으로 대체되고, 2~4차는 재취업활동 1회 이상, 5차 이후는 2회 이상(구직활동 1회 필수)이에요. 1일 1회만 인정되니까 2회가 필요한 차수는 이틀에 걸쳐 활동해야 해요.',
    },
    {
      question: '워크넷 말고 사람인·잡코리아도 구직활동 인정 증빙 방법이 되나요?',
      answer: '연동되는 민간 채용사이트는 자동으로 인정돼요. 연동이 안 되는 사이트라면 지원 완료 화면을 캡처해서 첨부하면 돼요. 회사명, 직종, 지원 날짜가 보이는 화면이어야 해요.',
    },
  ],

  relatedSpokes: [
    { badge: '실업인정', title: '실업인정 구직활동 온라인 출석 방법', desc: '회차별 출석·온라인 신청 구분과 절차', href: '/w/실업급여-실업인정-구직활동-방법' },
    { badge: '신청', title: '실업급여 신청 방법 절차 준비서류', desc: '워크넷 등록부터 고용센터 접수까지', href: '/w/실업급여-신청-방법-절차-준비서류' },
    { badge: '지급일', title: '실업급여 지급일 첫 입금일 대기기간', desc: '7일 대기기간 계산과 지급 주기', href: '/w/실업급여-지급일-첫-입금일-대기기간' },
  ],

  sources: [
    { name: '고용보험법 제44조 (실업의 인정)', url: 'https://www.law.go.kr/법령/고용보험법', org: '법제처' },
    { name: '고용보험법 시행규칙 제101조', url: 'https://www.law.go.kr/법령/고용보험법시행규칙', org: '법제처' },
    { name: '실업급여 안내', url: 'https://www.ei.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePb0201Info.do', org: '고용보험' },
  ],
}

export default data
