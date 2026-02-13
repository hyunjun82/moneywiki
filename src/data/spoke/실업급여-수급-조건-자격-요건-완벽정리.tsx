import type { SpokeData } from '@/data/spoke/types'
import {
  SpokeTable,
  FormulaBox,
  TipBox,
  WarnBox,
  Chips,
  Steps,
  SpokeCompareCards,
  SpokeChecklist,
  SpokeFlow,
  SpokeStepCards,
} from '@/components/spoke/SpokeBlocks'

/* ── 테이블 데이터 ── */
const CONDITION_ROWS = [
  ['고용보험 피보험기간', '18개월 중 180일 이상', '필수'],
  ['비자발적 퇴사', '권고사직·해고·계약만료 등', '필수'],
  ['재취업 의사·능력', '적극적 구직활동 + 근로능력', '필수'],
  ['신청 기한', '이직일 다음날부터 12개월 이내', '필수'],
]

const PERIOD_EXAMPLE_ROWS = [
  ['정규직 7개월', '210일 (30일 × 7)', '충족'],
  ['정규직 6개월', '180일 (30일 × 6)', '충족'],
  ['주 5일 5개월', '약 110일 (유급휴일 제외)', '미달'],
  ['주 3일 알바 6개월', '약 72일', '미달'],
  ['A사 4개월 + B사 3개월', '통산 약 210일', '충족'],
]

const INVOLUNTARY_ROWS = [
  ['권고사직', '회사가 퇴사를 먼저 권유한 경우'],
  ['경영상 해고(정리해고)', '경영 악화로 인원 감축'],
  ['계약 만료', '기간제 근로계약 종료 후 갱신 거절'],
  ['임금 체불', '2개월 이상 임금·퇴직금 미지급'],
  ['근로조건 위반', '채용 시 제시한 조건과 실제 다를 때'],
  ['직장 내 괴롭힘', '사용자나 동료의 부당 대우'],
  ['사업장 이전', '통근 시간 왕복 3시간 초과'],
]

/* ── Spoke 데이터 ── */
const data: SpokeData = {
  slug: '실업급여-수급-조건-자격-요건-완벽정리',

  meta: {
    title: '실업급여 수급 조건 자격 요건 | 피보험기간 180일 비자발적 퇴사 확인',
    description: '실업급여 수급 조건 4가지와 피보험기간 180일 계산법, 비자발적 퇴사 인정 범위를 정리했어요. 2026년 기준으로 확인하세요.',
    keywords: [
      '실업급여 수급 조건 자격 요건',
      '실업급여 피보험기간 180일 계산',
      '실업급여 비자발적 이직 사유',
      '실업급여 수급 제외 대상 확인',
    ],
    ogTitle: '실업급여 수급 조건 자격 요건 피보험기간 확인 | 머니위키',
    ogDescription: '피보험기간 180일, 비자발적 퇴사 등 4가지 핵심 조건을 확인하세요.',
  },

  hub: {
    url: '/w/실업급여-수급-조건-신청-방법-2026',
    name: '실업급여 수급 조건 신청 방법 2026',
  },

  breadcrumb: ['실업급여', '수급 조건·자격 요건'],

  summary3: [
    <>실업급여 수급 조건은 <strong>피보험기간 180일</strong> + <strong>비자발적 퇴사</strong> + <strong>재취업 의사</strong> 3가지가 핵심이에요</>,
    <>피보험기간은 퇴사 전 18개월 동안 고용보험료가 납부된 날을 통산해서 계산해요</>,
    <>2026년 구직급여 일 상한액 <strong>68,100원</strong>, 하한액 <strong>66,048원</strong>이에요</>,
  ],

  sourceBar: {
    badge: '출처',
    name: '고용보험법 + 고용노동부 2026년 고시',
    date: '2026.01',
  },

  prevNext: {
    next: { title: '실업급여 금액 계산 연봉별 수령액', href: '/w/실업급여-금액-계산-연봉별-수령액' },
  },

  stickyBar: {
    topLabel: '피보험기간',
    value: '180일 이상',
    buttonText: '조건 확인하기 →',
    scrollTo: '#s1',
  },

  hero: {
    badge: '2026년 기준',
    h1: (
      <>
        <span className="text-[#1E3A5F]">실업급여 수급 조건</span> 자격 요건 피보험기간 확인
      </>
    ),
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          퇴사 후 실업급여를 받고 싶은데, 내가 자격이 되는지 헷갈리셨다면 잘 오셨어요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          <strong className="text-neutral-800">피보험기간 180일</strong>, <strong className="text-neutral-800">비자발적 퇴사</strong>, <strong className="text-neutral-800">적극적 구직 의사</strong> 이 3가지만 확인하면 바로 알 수 있어요.
          2026년 기준 구직급여 일 상한액은 <strong className="text-neutral-800">68,100원</strong>이고, <a href="/w/실업급여-수급-조건-신청-방법-2026" className="text-[#4A7AB5] hover:underline">실업급여 전체 가이드</a>에서 신청 방법까지 확인할 수 있어요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          먼저 4가지 핵심 조건부터 같이 볼게요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '실업급여',
      desc: '실업급여 수급 조건·신청 방법 전체 가이드 보기',
    },
  },

  toc: [
    { id: 's1', label: '실업급여 수급 조건 4가지 핵심' },
    { id: 'tbl-cond', label: '조건 요약 테이블', sub: true },
    { id: 's2', label: '피보험기간 180일 계산 방법' },
    { id: 'tbl-period', label: '근무 유형별 180일 충족 예시', sub: true },
    { id: 's3', label: '비자발적 이직 사유 인정 범위' },
    { id: 'tbl-inv', label: '비자발적 퇴사 유형 7가지', sub: true },
    { id: 's4', label: '수급 제외 대상은 누구인가요' },
    { id: 's-faq', label: '자주 묻는 질문' },
  ],

  sections: [
    /* ── SECTION 01: 수급 조건 4가지 ── */
    {
      id: 's1',
      number: '01',
      heading: '실업급여 수급 조건 자격 요건은 무엇인가요?',
      subtitle: '피보험기간·퇴사사유·구직의사·신청기한 4가지예요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            실업급여를 받으려면 <strong>4가지 조건</strong>을 모두 갖춰야 해요. <a href="https://www.law.go.kr/법령/고용보험법" target="_blank" rel="noopener noreferrer" className="text-[#4A7AB5] hover:underline">고용보험법 제40조</a>에서 명확히 규정하고 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            첫째, 퇴사 전 18개월 동안 고용보험 피보험기간이 <strong>180일 이상</strong>이어야 해요.
            둘째, 퇴사 사유가 <a href="/w/권고사직-실업급여-수급-조건-절차-합의서" className="text-[#4A7AB5] hover:underline">권고사직</a>·해고·계약만료 같은 <strong>비자발적 이직</strong>이어야 해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            셋째, 지금 적극적으로 일자리를 찾고 있다는 <strong>재취업 의사와 능력</strong>이 있어야 해요.
            넷째, 퇴사한 날 다음날부터 <strong>12개월 이내</strong>에 신청해야 해요.
          </p>

          <SpokeTable
            id="tbl-cond"
            title="실업급여 수급 조건 4가지 요약"
            subtitle="고용보험법 제40조 기준"
            headers={['조건', '세부 기준', '필수 여부']}
            rows={CONDITION_ROWS}
            highlightCol={2}
          />

          <SpokeCompareCards cards={[
            {
              title: '수급 가능',
              subtitle: '4가지 조건 모두 충족',
              items: [
                '고용보험 18개월 중 180일 이상',
                '비자발적 퇴사 (권고사직·해고 등)',
                '적극적 구직활동 의사',
                '퇴사 후 12개월 이내 신청',
              ],
              recommended: true,
              recLabel: '자격 인정',
            },
            {
              title: '수급 불가',
              subtitle: '하나라도 미충족',
              items: [
                '피보험기간 180일 미만',
                '자발적 퇴사 (사직서 제출)',
                '구직 의사 없이 쉬려는 경우',
                '퇴사 후 12개월 초과',
              ],
            },
          ]} />

          <p className="text-neutral-600 mb-0">4가지 조건을 알았다면, 180일을 정확히 어떻게 세는지가 궁금해지잖아요.</p>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '계산법',
        title: '피보험기간 180일은 어떻게 세나요?',
        desc: '정규직·알바·이직자별 계산 예시 확인',
        icon: 'calc',
      },
    },

    /* ── SECTION 02: 피보험기간 180일 계산 ── */
    {
      id: 's2',
      number: '02',
      heading: '실업급여 피보험기간 180일 계산은 어떻게 하나요?',
      subtitle: '퇴사 전 18개월 동안 보험료 납부일을 통산해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            피보험기간 180일은 단순히 "회사에 6개월 다녔다"와는 다른 개념이에요.
            퇴사일 이전 <strong>18개월(기준기간)</strong> 동안 고용보험료가 실제로 납부된 날만 세는 거예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            정규직은 <strong>월 30일</strong>로 잡기 때문에 6개월이면 180일을 딱 채워요.
            반면 아르바이트는 실제 근무한 날짜로 계산하니까 주 3일 6개월이면 약 72일밖에 안 돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            여러 회사를 옮겨 다녔어도 <strong>18개월 안에 합산</strong>할 수 있어요.
            단, 전 직장에서 이미 실업급여를 받았다면 그 기간은 빠지니까 <a href="https://www.ei.go.kr" target="_blank" rel="noopener noreferrer" className="text-[#4A7AB5] hover:underline">고용보험 홈페이지</a>에서 이력을 확인해 보세요.
          </p>

          <FormulaBox lines={[
            { text: '피보험기간 계산 공식', comment: true },
            { text: '퇴사 전 18개월 중 고용보험료 납부일 합산 ≥ 180일' },
          ]} />

          <SpokeTable
            id="tbl-period"
            title="근무 유형별 피보험기간 180일 충족 예시"
            subtitle="2026년 기준, 정규직은 월 30일 산정"
            headers={['근무 유형', '피보험기간 산정', '180일 충족']}
            rows={PERIOD_EXAMPLE_ROWS}
            highlightCol={2}
          />

          <SpokeChecklist items={[
            { text: '고용보험 가입 사업장에서 근무했는지 확인', done: true },
            { text: '퇴사 전 18개월 내 합산 180일 이상', done: true },
            { text: '여러 회사 합산 가능 (18개월 범위 내)', done: true, note: '전 직장 수급 이력 제외' },
            { text: '알바·일용직은 실제 근무일로 계산', done: false, note: '부족할 수 있으니 미리 확인' },
          ]} />

          <TipBox title="내 피보험기간이 정확히 몇 일인지 모르겠다면?">
            고용보험 홈페이지(ei.go.kr)에서 공인인증서로 로그인하면 피보험기간 조회가 가능해요. 가입 이력이 사업장별로 나와요.
          </TipBox>

          <p className="text-neutral-600 mb-0">180일을 계산했으면, 이제 비자발적 퇴사가 정확히 어디까지인지 궁금한 게 생기죠.</p>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '이직 사유',
        title: '어떤 퇴사가 비자발적으로 인정되나요?',
        desc: '인정되는 7가지 사유와 예외 확인',
        icon: 'info',
      },
    },

    /* ── SECTION 03: 비자발적 이직 사유 ── */
    {
      id: 's3',
      number: '03',
      heading: '실업급여 비자발적 이직 사유는 어떤 게 인정되나요?',
      subtitle: '권고사직·해고·계약만료 외에도 인정되는 사유가 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            비자발적 퇴사란 내가 원해서 그만둔 게 아니라 <strong>회사 사정이나 부득이한 이유</strong>로 퇴사한 경우예요.
            <a href="https://www.law.go.kr/법령/고용보험법" target="_blank" rel="noopener noreferrer" className="text-[#4A7AB5] hover:underline">고용보험법 제58조</a>에서 구체적인 사유를 열거하고 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            권고사직이나 해고처럼 명확한 경우뿐 아니라 <strong>임금 2개월 이상 체불</strong>, <strong>직장 내 괴롭힘</strong>, <strong>사업장 이전</strong>도 인정돼요.
            퇴사 전에 이직확인서 사유란을 꼭 확인해야 해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            자발적 퇴사도 예외가 있어요. <strong>임신·출산·육아</strong>, <strong>본인 질병</strong>, <strong>부모 간병</strong> 같은 정당한 사유가 입증되면 고용센터에서 개별 심사해서 인정해 줄 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            이직확인서에 "개인 사유"로 적혀 있어도 실제 비자발적이었다면 증빙자료를 제출해서 번복할 수 있어요.
          </p>

          <SpokeTable
            id="tbl-inv"
            title="비자발적 퇴사로 인정되는 7가지 유형"
            subtitle="고용보험법 제58조 및 시행규칙 기준"
            headers={['퇴사 유형', '인정 기준']}
            rows={INVOLUNTARY_ROWS}
          />

          <SpokeStepCards steps={[
            { title: '이직확인서 확인', desc: '퇴사 사유가 비자발적으로 기재됐는지 확인해요', tip: '회사에 10일 이내 발급 요청' },
            { title: '증빙자료 준비', desc: '임금체불 증명서, 괴롭힘 녹취록 등 사유별 서류 준비', tip: '자발적 퇴사도 증거 있으면 번복 가능' },
            { title: '고용센터 제출', desc: '관할 고용센터에 이직확인서 + 증빙 제출', tip: '심사 기간 1~2주 소요' },
          ]} />

          <p className="text-neutral-600 mb-0">비자발적 퇴사 기준을 확인했는데, 조건을 갖춰도 받지 못하는 사람이 있어요. 그 이유를 짚어 볼게요.</p>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '제외 대상',
        title: '조건을 갖춰도 못 받는 경우가 있나요?',
        desc: '수급 제외 대상 5가지 확인',
        icon: 'check',
      },
    },

    /* ── SECTION 04: 수급 제외 대상 ── */
    {
      id: 's4',
      number: '04',
      heading: '실업급여 수급 제외 대상은 누구인가요?',
      subtitle: '조건을 갖춰도 받지 못하는 5가지 사유가 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            피보험기간 180일을 채웠고 비자발적 퇴사여도 <strong>수급이 제한되는 경우</strong>가 있어요.
            <a href="https://www.law.go.kr/법령/고용보험법" target="_blank" rel="noopener noreferrer" className="text-[#4A7AB5] hover:underline">고용보험법 제61조</a>에서 부정수급 제재를 규정하고 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            대표적으로 <strong>자기 잘못(중대한 귀책사유)</strong>으로 해고된 경우예요. 횡령이나 폭행 같은 중대한 비위로 징계해고되면 실업급여를 못 받아요.
            다만 경미한 실수로 인한 징계해고는 고용센터 심사에서 인정될 수도 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            또한 <strong>정당한 이유 없이 구직활동을 거부</strong>하거나, <strong>취업알선을 3회 이상 거부</strong>하면 급여가 중지돼요.
            실업인정일에 불출석하거나 허위 구직활동을 신고하면 <strong>부정수급</strong>으로 처리돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            부정수급이 적발되면 지급받은 금액의 <strong>최대 5배</strong>를 반환해야 하니까, 솔직하게 신고하는 게 중요해요.
          </p>

          <SpokeFlow steps={[
            { icon: '📋', label: '수급 신청', sub: '조건 충족 확인' },
            { icon: '❌', label: '제외 사유 심사', sub: '귀책·부정수급 등' },
            { icon: '⚖️', label: '고용센터 판단', sub: '1~2주 소요' },
            { icon: '✅', label: '자격 인정', sub: '또는 제한 통보' },
          ]} />

          <Chips items={[
            { icon: '🚫', label: '중대 귀책 해고', value: '수급 불가' },
            { icon: '⏸️', label: '구직 거부 3회', value: '급여 중지' },
            { icon: '💸', label: '부정수급 적발', value: '최대 5배 반환' },
            { icon: '⏰', label: '12개월 초과', value: '수급 소멸' },
          ]} />

          <WarnBox>
            <strong>반복수급 제한:</strong> 5년 이내에 실업급여를 3회 이상 받으면 급여의 <strong>50%가 감액</strong>되고, <strong>대기기간이 4주</strong>로 늘어나요. 2026년부터 강화된 규정이에요.
          </WarnBox>

          <p className="text-neutral-600 mb-0">수급 조건과 제외 대상까지 살펴봤어요. 이제 내 상황에 맞는 금액이 궁금하시면 아래 가이드를 참고해 보세요.</p>
        </>
      ),
      bridgeCTA: {
        href: '/w/실업급여-수급-조건-신청-방법-2026',
        badge: '전체 가이드',
        title: '내 실업급여 금액은 얼마일까요?',
        desc: '연봉별 수령액 계산부터 신청 절차까지 한 번에 확인',
        icon: 'calc',
        primary: true,
      },
    },

    /* ── FAQ 섹션 ── */
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
      question: '실업급여 피보험기간 180일은 연속 근무해야 하나요?',
      answer: '아니에요. 퇴사 전 18개월 이내에 여러 회사를 합산해서 통산 180일만 채우면 돼요. 중간에 공백 기간이 있어도 상관없어요.',
    },
    {
      question: '자발적 퇴사인데 실업급여를 받을 수 있는 예외가 있나요?',
      answer: '네, 있어요. 임신·출산·육아, 본인 질병, 부모 간병, 사업장 이전으로 통근 곤란 등 정당한 사유가 입증되면 고용센터 심사를 거쳐 예외적으로 인정돼요.',
    },
    {
      question: '이직확인서에 자발적 퇴사로 적혀 있으면 어떻게 하나요?',
      answer: '실제 비자발적 사유가 있었다면 증빙자료(체불 증명서, 녹취록 등)를 고용센터에 제출하면 번복 심사를 받을 수 있어요.',
    },
    {
      question: '실업급여 수급 중에 아르바이트를 하면 어떻게 되나요?',
      answer: '주 15시간 미만·월 60시간 미만 아르바이트는 신고 후 수급이 가능해요. 단 소득이 발생하면 그만큼 급여가 감액될 수 있으니 반드시 실업인정일에 정확히 신고해야 해요.',
    },
  ],

  relatedSpokes: [
    { badge: '금액', title: '실업급여 금액 계산 연봉별 수령액', desc: '내 연봉 기준 하루·월 수령액 계산', href: '/w/실업급여-금액-계산-연봉별-수령액' },
    { badge: '기간', title: '실업급여 수급기간 소정급여일수 기준', desc: '연령·가입기간별 120~270일 기간표', href: '/w/실업급여-수급기간-소정급여일수-기준' },
    { badge: '신청', title: '실업급여 신청 방법 절차 준비서류', desc: '워크넷 등록부터 고용센터 방문까지', href: '/w/실업급여-신청-방법-절차-준비서류' },
    { badge: '권고사직', title: '권고사직 실업급여 수급 조건 절차', desc: '권고사직 시 실업급여 받는 법', href: '/w/권고사직-실업급여-수급-조건-절차-합의서' },
  ],

  sources: [
    { name: '고용보험법 (제40조, 제58조, 제61조)', url: 'https://www.law.go.kr/법령/고용보험법', org: '법제처' },
    { name: '실업급여 안내', url: 'https://www.ei.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePb0201Info.do', org: '고용보험' },
    { name: '고용노동부 실업급여 정책', url: 'https://www.moel.go.kr', org: '고용노동부' },
  ],
}

export default data
