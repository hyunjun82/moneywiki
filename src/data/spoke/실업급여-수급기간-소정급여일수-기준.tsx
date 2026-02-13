import type { SpokeData } from '@/data/spoke/types'
import {
  SpokeTable,
  FormulaBox,
  TipBox,
  Chips,
  SpokeStepCards,
  SpokeTimeline,
  SpokeChecklist,
  SpokeCompareCards,
} from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '실업급여-수급기간-소정급여일수-기준',

  meta: {
    title: '실업급여 수급기간 소정급여일수 연령별 기간표 | 최대 270일 계산',
    description: '실업급여는 최소 120일, 최대 270일까지 받을 수 있어요. 나이와 피보험기간에 따라 달라지는 소정급여일수를 확인하세요.',
    keywords: [
      '실업급여 수급기간 소정급여일수',
      '실업급여 연령별 수급 기간 표',
      '실업급여 가입기간별 급여일수',
      '실업급여 수급기간 연장 조건',
    ],
    ogTitle: '실업급여 수급기간 소정급여일수 연령별 기간표 | 머니위키',
    ogDescription: '나이·피보험기간별 소정급여일수 120~270일 한눈에 확인',
  },

  hub: {
    url: '/w/실업급여-수급-조건-신청-방법-2026',
    name: '실업급여 수급 조건 신청 방법 2026',
  },

  breadcrumb: ['고용·노동', '실업급여', '수급기간 소정급여일수'],

  summary3: [
    <>실업급여 소정급여일수는 <strong>최소 120일</strong>에서 <strong>최대 270일</strong>이에요</>,
    <>이직일 당시 <strong>나이</strong>와 <strong>피보험기간</strong> 2가지로 결정돼요</>,
    <>50세 이상이거나 장애인이면 같은 피보험기간이어도 <strong>30일 더</strong> 받아요</>,
  ],

  sourceBar: {
    badge: '출처',
    name: '고용보험법 제50조 소정급여일수',
    date: '2026.02',
  },

  prevNext: {
    prev: { title: '실업급여 금액 계산 연봉별 수령액', href: '/w/실업급여-금액-계산-연봉별-수령액' },
    next: { title: '실업급여 신청 방법 절차 준비서류', href: '/w/실업급여-신청-방법-절차-준비서류' },
  },

  stickyBar: {
    topLabel: '소정급여일수',
    value: '최소 120일~최대 270일',
    buttonText: '내 수급기간 확인 →',
    scrollTo: '#s1',
  },

  hero: {
    badge: '2026년 기준',
    h1: (
      <>
        <span className="text-[#1E3A5F]">실업급여 수급기간</span> 소정급여일수 연령별 기간표
      </>
    ),
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          실업급여를 받을 수 있는 건 알겠는데, 정확히 몇 개월 동안 받을 수 있는지 궁금하셨다면 잘 오셨어요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          소정급여일수는 나이와 피보험기간 2가지로 결정되는데, <strong className="text-neutral-800">최소 120일(약 4개월)</strong>부터 <strong className="text-neutral-800">최대 270일(약 9개월)</strong>까지 차이가 커요. <a href="https://www.law.go.kr/법령/고용보험법" target="_blank" rel="noopener noreferrer" className="text-[#4A7AB5] hover:underline">고용보험법 제50조</a>에서 구체적으로 정하고 있어요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          먼저 내 나이와 근무기간에 해당하는 소정급여일수부터 확인해볼게요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '실업급여 가이드',
      desc: '실업급여 수급 조건·신청 방법 전체 보기',
    },
  },

  toc: [
    { id: 's1', label: '실업급여 수급기간 소정급여일수란 무엇인가요' },
    { id: 's2', label: '실업급여 연령별 수급 기간은 어떻게 되나요' },
    { id: 's3', label: '실업급여 가입기간별 급여일수는 어떻게 계산하나요' },
    { id: 's4', label: '실업급여 수급기간 연장은 어떤 경우에 가능한가요' },
    { id: 's-faq', label: '자주 묻는 질문' },
  ],

  sections: [
    /* ── SECTION 01 ── */
    {
      id: 's1',
      number: '01',
      heading: '실업급여 수급기간 소정급여일수란 무엇인가요?',
      subtitle: '실업급여를 받을 수 있는 총 일수를 말해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            <strong>소정급여일수</strong>는 실업급여(구직급여)를 받을 수 있는 총 일수를 말해요.
            흔히 "실업급여 몇 개월 받나요?"라고 물어보는데, 정확히는 <strong>월 단위가 아니라 일 단위</strong>로 정해져 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            소정급여일수를 결정하는 기준은 딱 2가지예요.
            첫째는 <strong>이직일 당시 만 나이</strong>, 둘째는 <strong>피보험기간</strong>(고용보험 가입 기간)이에요.
            <a href="https://www.law.go.kr/법령/고용보험법" target="_blank" rel="noopener noreferrer" className="text-[#4A7AB5] hover:underline">고용보험법 제50조</a>에 별표로 명시되어 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            연령 구분은 50세 미만과 50세 이상(장애인 포함)으로 나뉘고, 피보험기간은 1년 미만부터 10년 이상까지 5개 구간이에요.
            50세 이상이거나 장애인이면 같은 피보험기간이어도 30일을 더 받는 구조예요.
          </p>

          <Chips items={[
            { icon: '📅', label: '최소', value: '120일' },
            { icon: '📅', label: '중간', value: '180일' },
            { icon: '📅', label: '장기', value: '240일' },
            { icon: '📅', label: '최대', value: '270일' },
          ]} />

          <FormulaBox lines={[
            { text: '소정급여일수 결정 기준', comment: true },
            { text: '소정급여일수 = 나이(50세 기준) + 피보험기간(5개 구간)' },
          ]} />

          <TipBox title="장애인은 나이 상관없이 50세 이상 기준 적용">
            <p>30세 장애인이 5년 일했어도 50세 이상 기준인 240일을 받아요. 장애인고용촉진법에 따른 장애인이면 모두 해당돼요.</p>
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '기간표',
        title: '내 나이에 해당하는 수급기간은 며칠일까요?',
        desc: '연령별 소정급여일수 상세표에서 바로 확인할 수 있어요',
        icon: 'grid',
      },
    },

    /* ── SECTION 02 ── */
    {
      id: 's2',
      number: '02',
      heading: '실업급여 연령별 수급 기간은 어떻게 되나요?',
      subtitle: '50세 기준으로 최대 150일까지 차이 나요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            소정급여일수를 한눈에 확인할 수 있는 표를 정리했어요.
            50세 미만은 최대 240일이고, 50세 이상이거나 장애인이면 최대 270일까지 받을 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            같은 피보험기간 10년 이상이라도 49세와 50세가 한 달 차이로 30일이 갈려요.
            이직 시점을 조절할 수 있다면 <strong>만 50세 이후에 퇴사</strong>하는 게 유리해요.
          </p>

          <SpokeTable
            id="tbl-days-under50"
            title="50세 미만 소정급여일수"
            subtitle="고용보험법 제50조 별표 / 2026년 기준"
            headers={['피보험기간', '1년 미만', '1~3년', '3~5년', '5~10년', '10년 이상']}
            rows={[
              ['50세 미만', '120일', '150일', '180일', '210일', '240일'],
            ]}
            highlightCol={5}
          />

          <SpokeTable
            id="tbl-days-over50"
            title="50세 이상 및 장애인 소정급여일수"
            subtitle="고용보험법 제50조 별표 / 2026년 기준"
            headers={['피보험기간', '1년 미만', '1~3년', '3~5년', '5~10년', '10년 이상']}
            rows={[
              ['50세 이상·장애인', '120일', '180일', '210일', '240일', '270일'],
            ]}
            highlightCol={5}
          />

          <SpokeCompareCards cards={[
            {
              title: '50세 미만',
              subtitle: '120일~240일',
              items: [
                '1년 미만: 120일 (약 4개월)',
                '1~3년: 150일 (약 5개월)',
                '3~5년: 180일 (약 6개월)',
                '5~10년: 210일 (약 7개월)',
                '10년 이상: 240일 (약 8개월)',
              ],
            },
            {
              title: '50세 이상·장애인',
              subtitle: '120일~270일',
              items: [
                '1년 미만: 120일 (약 4개월)',
                '1~3년: 180일 (약 6개월)',
                '3~5년: 210일 (약 7개월)',
                '5~10년: 240일 (약 8개월)',
                '10년 이상: 270일 (약 9개월)',
              ],
              recommended: true,
              recLabel: '30일 더 수급 가능',
            },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            참고로 대기기간 7일은 소정급여일수에 포함되지 않아요.
            실업 신고 후 첫 7일은 급여가 지급되지 않고, 8일째부터 소정급여일수가 차감되기 시작해요.
          </p>

          <TipBox title="자영업자(폐업) 실업급여는 별도 기준">
            <p>자영업자는 피보험기간에 따라 120~210일이에요. 근로자 기준과 다르니 <a href="/w/자영업자-폐업-실업급여-고용보험-조건" className="text-[#4A7AB5] underline">자영업자 실업급여</a>에서 따로 확인하세요.</p>
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '계산법',
        title: '피보험기간은 정확히 어떻게 계산하나요?',
        desc: '여러 회사를 다녔거나 아르바이트 경력이 있을 때 계산법이 궁금하시죠',
        icon: 'calc',
      },
    },

    /* ── SECTION 03 ── */
    {
      id: 's3',
      number: '03',
      heading: '실업급여 가입기간별 급여일수는 어떻게 계산하나요?',
      subtitle: '피보험기간 계산이 소정급여일수를 좌우해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            피보험기간은 고용보험에 가입되어 <strong>실제로 일한 날</strong>을 기준으로 계산해요.
            정규직은 한 달을 30일로 보지만, 단시간 근로자나 일용직은 실제 근무일만 인정돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            여러 회사를 옮겨 다녔어도 이직일 이전 18개월 안에 통산 180일 이상이면 수급 자격이 돼요.
            피보험기간도 합산해서 소정급여일수 구간을 판단해요.
            다만 이전 직장에서 이미 실업급여를 받았다면 그 기간은 합산에서 빠져요.
          </p>

          <SpokeStepCards steps={[
            { title: '정규직 1년 근무', desc: '12개월 x 30일 = 360일 → 피보험기간 1~3년 구간', tip: '50세 미만 150일, 50세 이상 180일' },
            { title: '정규직 6개월 근무', desc: '6개월 x 30일 = 180일 → 피보험기간 1년 미만 구간', tip: '수급 조건 180일은 충족' },
            { title: '주 3일 알바 6개월', desc: '약 72일 → 180일 미달로 수급 불가', tip: '다른 직장 경력 합산 필요' },
            { title: '회사 A(8개월) + B(4개월)', desc: '합산 360일 → 피보험기간 1~3년 구간', tip: '18개월 내 합산 가능' },
          ]} />

          <SpokeTimeline events={[
            { month: '18개월 전', title: '기준기간 시작', desc: '이직일 기준 과거 18개월부터 산정', status: 'normal' },
            { month: '근무 기간', title: '피보험기간 합산', desc: '고용보험 가입된 실제 근무일 통산', status: 'normal' },
            { month: '180일 확인', title: '수급 자격 판정', desc: '피보험기간 180일 이상 여부 확인', status: 'current' },
            { month: '이직일', title: '소정급여일수 확정', desc: '나이 + 피보험기간 구간으로 결정', status: 'warning', tag: '확정' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            고용보험에 가입하지 않은 사업장 근무기간은 인정 안 돼요.
            <a href="https://www.work24.go.kr" target="_blank" rel="noopener noreferrer" className="text-[#4A7AB5] hover:underline">고용24</a>에서 내 피보험기간을 조회하면 정확한 일수를 확인할 수 있어요.
          </p>

          <TipBox title="피보험기간이 애매하게 걸린다면?">
            <p>예를 들어 피보험기간이 2년 11개월이면 1~3년 구간이에요. 한 달만 더 채우면 3~5년 구간으로 올라가서 30일을 더 받을 수 있어요. 퇴사 시기를 조절할 수 있다면 구간 경계를 넘기는 게 유리해요.</p>
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '연장',
        title: '소정급여일수를 다 써도 연장할 수 있나요?',
        desc: '훈련연장·개별연장·특별연장 3가지 방법이 있어요',
        icon: 'clock',
      },
    },

    /* ── SECTION 04 ── */
    {
      id: 's4',
      number: '04',
      heading: '실업급여 수급기간 연장은 어떤 경우에 가능한가요?',
      subtitle: '훈련·개별·특별연장으로 최대 2년까지 늘어나요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            소정급여일수를 다 받았는데 아직 취업하지 못했다면 <strong>연장급여</strong>를 받을 수 있어요.
            연장급여는 훈련연장급여, 개별연장급여, 특별연장급여 3가지가 있어요.
            <a href="https://www.law.go.kr/법령/고용보험법" target="_blank" rel="noopener noreferrer" className="text-[#4A7AB5] hover:underline">고용보험법 제51~53조</a>에서 정하고 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            가장 흔한 건 훈련연장급여예요.
            고용센터가 지정한 직업훈련을 받으면 훈련 기간 동안 구직급여의 100%를 계속 받을 수 있고, 최대 2년까지 가능해요.
          </p>

          <SpokeTable
            id="tbl-extension"
            title="실업급여 연장급여 종류 비교"
            subtitle="고용보험법 제51~53조 기준"
            headers={['구분', '훈련연장급여', '개별연장급여', '특별연장급여']}
            rows={[
              ['조건', '직업훈련 수강', '취업 곤란 + 생활 곤란', '실업률 급등 시 고시'],
              ['기간', '최대 2년', '60일', '60일'],
              ['급여 수준', '구직급여의 100%', '구직급여의 70%', '구직급여의 70%'],
              ['신청', '고용센터 지시', '본인 신청', '자동 적용'],
            ]}
            highlightCol={1}
          />

          <SpokeChecklist items={[
            { text: '소정급여일수 만료 후 신청 가능', done: true },
            { text: '훈련연장: 고용센터 지정 훈련 수강 필수', done: true, note: '최대 2년, 급여 100%' },
            { text: '개별연장: 재산 기준 충족 + 부양가족 조건', done: true, note: '60일, 급여 70%' },
            { text: '특별연장: 실업률 3% 초과 3개월 연속 시', done: false, note: '정부 고시 필요' },
            { text: '훈련연장 중에는 개별·특별 중복 불가', done: false, note: '순차 적용' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            개별연장급여는 재산 기준과 부양가족 조건 등을 따지기 때문에 누구나 받는 건 아니에요.
            특별연장급여는 경기 침체로 실업률이 급등할 때만 정부가 고시해서 시행하는 거라 상시 운영되는 건 아니에요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            수급기간 연장이 필요하다면 소정급여일수가 끝나기 전에 관할 <a href="/w/실업급여-고용센터-찾기-고용24-사용법" className="text-[#4A7AB5] underline">고용센터</a>에 미리 상담받는 게 좋아요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '/w/실업급여-수급-조건-신청-방법-2026',
        badge: '허브',
        title: '실업급여 전체 가이드로 돌아가기',
        desc: '수급 조건부터 신청 방법, 금액 계산까지 한 번에 확인하세요',
        icon: 'info',
        primary: true,
      },
    },

    /* ── FAQ ── */
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
      question: '실업급여 수급기간 중에 취업하면 나머지는 못 받나요?',
      answer: '취업하면 실업급여는 중단돼요. 대신 소정급여일수의 1/2 이상 남았을 때 재취업하면 <strong>조기재취업수당</strong>을 받을 수 있어요. 남은 일수의 1/2을 한 번에 지급해요.',
    },
    {
      question: '실업급여 수급기간 중에 단기 알바를 해도 되나요?',
      answer: '주 15시간 미만 단기 알바는 가능하지만, 수입이 생기면 해당 기간의 실업급여가 <strong>감액 또는 중단</strong>될 수 있어요. 반드시 실업인정일에 고용센터에 신고해야 해요.',
    },
    {
      question: '피보험기간이 여러 회사에 걸쳐 있으면 합산되나요?',
      answer: '<strong>네, 합산돼요.</strong> 이직일 이전 18개월 이내에 근무한 기간은 통산해서 피보험기간을 계산해요. 단, 이전 직장에서 이미 실업급여를 받았다면 그 이전 기간은 합산에서 빠져요.',
    },
    {
      question: '만 50세 생일 직전에 퇴사하면 50세 미만 기준이 적용되나요?',
      answer: '<strong>네.</strong> 이직일 당시 만 나이가 기준이에요. 50세 생일 하루 전에 퇴사하면 50세 미만으로 분류돼요. 가능하면 만 50세 이후에 퇴사하는 게 30일을 더 받을 수 있어서 유리해요.',
    },
  ],

  relatedSpokes: [
    { badge: '금액', title: '실업급여 금액 계산 연봉별 수령액', desc: '평균임금 60% 기준 상한·하한 계산', href: '/w/실업급여-금액-계산-연봉별-수령액' },
    { badge: '연장', title: '연장급여 훈련연장 개별연장 특별연장 조건 비교', desc: '소정급여일수 이후 추가 수급 방법', href: '/w/연장급여-훈련연장-개별연장-특별연장-조건-비교' },
    { badge: '조건', title: '실업급여 수급 조건 자격 요건 완벽정리', desc: '피보험기간 180일·비자발적 이직 확인', href: '/w/실업급여-수급-조건-자격-요건-완벽정리' },
    { badge: '신청', title: '실업급여 신청 방법 절차 준비서류', desc: '워크넷 구직등록부터 고용센터 방문까지', href: '/w/실업급여-신청-방법-절차-준비서류' },
  ],

  sources: [
    { name: '고용보험법 제50조 (소정급여일수)', url: 'https://www.law.go.kr/법령/고용보험법', org: '법제처' },
    { name: '구직급여 수급일수 안내', url: 'https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=722&ccfNo=2&cciNo=3&cnpClsNo=1', org: '찾기쉬운 생활법령정보' },
    { name: '고용노동부 실업급여 안내', url: 'https://www.moel.go.kr', org: '고용노동부' },
  ],
}

export default data
