import type { SpokeData } from '@/data/spoke/types'
import {
  SpokeTable, FormulaBox, TipBox, WarnBox,
  Chips, SpokeLinks, Steps,
  SpokeTimeline, SpokeStepCards, SpokeCompareCards,
  SpokeRateBars, SpokeFlow, SpokeChecklist,
} from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '일용직-건설근로자-실업급여-피보험기간-계산',

  meta: {
    title: '일용직 건설근로자 실업급여 피보험기간 계산법 | 2026 수급 조건',
    description: '일용직 실업급여 피보험기간은 18개월 중 180일 이상이면 충족돼요. 건설근로자 수급 조건과 구직급여 일액 계산법, 신청 절차를 확인하세요.',
    keywords: [
      '일용직 실업급여 피보험기간 계산',
      '건설근로자 실업급여 수급 조건',
      '일용직 실업급여 금액 계산',
      '일용직 실업급여 신청 방법',
    ],
    ogTitle: '일용직 건설근로자 실업급여 피보험기간 계산법 | 머니위키',
    ogDescription: '일용직 피보험기간 180일 충족 여부와 구직급여 금액을 확인해 보세요.',
  },

  hub: {
    url: '/w/실업급여-퇴사유형별-수급-자격-권고사직-자진퇴사-해고',
    name: '실업급여 퇴사유형별 수급 자격 비교',
  },

  breadcrumb: ['고용·노동', '실업급여', '일용직 건설근로자'],

  summary3: [
    <>일용직 피보험기간은 이직일 이전 <strong>18개월 중 180일 이상</strong> (실 근무일 기준)</>,
    <>2026년 구직급여 일 상한액 <strong>68,100원</strong>, 일 하한액 <strong>66,048원</strong></>,
    <>건설일용직은 사업장이 바뀌어도 피보험기간이 <strong>자동 합산</strong>돼요</>,
  ],

  sourceBar: {
    badge: '출처',
    name: '고용보험법 제58조·고용노동부 2026년 고시',
    date: '2026.01',
  },

  prevNext: {
    prev: { title: '예술인 노무제공자 특고 실업급여 조건', href: '/w/예술인-노무제공자-특고-실업급여-고용보험-조건' },
    next: { title: '65세 이상 고령자 실업급여 수급 제한', href: '/w/65세-이상-고령자-실업급여-수급-제한-예외' },
  },

  stickyBar: {
    topLabel: '일용직 실업급여 일 상한액',
    value: '68,100원',
    buttonText: '신청 절차 보기 →',
    scrollTo: '#s4',
  },

  hero: {
    badge: '2026년 기준',
    h1: (
      <>
        일용직 건설근로자 <span className="text-[#1E3A5F]">실업급여 피보험기간</span> 계산과 수급 조건
      </>
    ),
    intro: (
      <p className="text-base text-neutral-500 leading-relaxed">
        건설현장을 옮겨 다니며 일했는데 피보험기간이 어떻게 계산되는지 궁금하셨다면 잘 오셨어요. 이직일 이전 18개월 중 실제 일한 날이 <strong>180일 이상</strong>이면 실업급여를 받을 수 있어요. <a href="/w/예술인-노무제공자-특고-실업급여-고용보험-조건" className="text-[#4A7AB5] underline">예술인·특고</a>는 24개월 중 9개월이라서 기준이 달라요. <a href="/w/실업급여-퇴사유형별-수급-자격-권고사직-자진퇴사-해고" className="text-[#4A7AB5] underline">퇴사유형별 실업급여 수급 자격</a> 중 일용직에 해당하는 내용이에요. 먼저 피보험기간 계산 방법부터 살펴볼게요.
      </p>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '퇴사유형별 실업급여 수급 자격 한눈에 비교',
    },
  },

  toc: [
    { id: 's1', label: '일용직 실업급여 피보험기간은 어떻게 계산하나요?' },
    { id: 's2', label: '건설근로자 실업급여 수급 조건은 무엇인가요?' },
    { id: 's3', label: '일용직 실업급여 금액은 얼마나 받을 수 있나요?' },
    { id: 's4', label: '일용직 실업급여 신청은 어떻게 하나요?' },
    { id: 's-faq', label: '자주 묻는 질문' },
  ],

  sections: [
    /* ═══ S1: 피보험기간 계산 ═══ */
    {
      id: 's1',
      number: 'SECTION 01',
      heading: '일용직 실업급여 피보험기간은 어떻게 계산하나요?',
      subtitle: '18개월 중 실제 근무일 180일 이상이면 충족돼요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            일용직 근로자의 피보험기간은 일반 직장인과 계산 방식이 달라요. 월 단위가 아니라 <strong>실제로 일한 날(근무일)</strong>을 하루씩 세는 방식이에요. 이직일 이전 18개월 동안 보수를 받은 날이 합계 180일 이상이면 수급 자격의 첫 번째 요건이 충족돼요.
          </p>

          <SpokeTable
            id="tbl-period"
            title="일용직 vs 일반 근로자 피보험기간 비교"
            subtitle="고용보험법 제58조 기준"
            headers={['구분', '일용직 근로자', '일반 근로자']}
            rows={[
              ['기산 기간', '이직일 이전 18개월', '이직일 이전 18개월'],
              ['피보험 단위', '실 근무일(일 단위)', '달력상 가입기간'],
              ['필요 일수', '180일 이상', '180일 이상'],
              ['합산 방식', '여러 사업장 자동 합산', '자동 합산'],
              ['특이사항', '유급휴일·휴업수당일 포함', '근로 안 해도 가입기간 인정'],
            ]}
            highlightCol={1}
          />

          <SpokeRateBars
            bars={[
              { label: '일반직', rate: '180일/18개월', width: '100%' },
              { label: '일용직', rate: '실근무 180일', width: '85%' },
              { label: '예술인', rate: '9개월/24개월', width: '60%' },
              { label: '자영업자', rate: '12개월/24개월', width: '70%' },
            ]}
          />

          <TipBox title="건설일용직은 현장이 바뀌어도 걱정 없어요">
            고용보험에 가입된 사업장이라면 어떤 현장에서 일했든 <strong>피보험기간이 자동 합산</strong>돼요. A건설사에서 50일, B건설사에서 70일, C건설사에서 60일 일했다면 합계 180일로 충족이에요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '조건',
        title: '피보험기간 외에 또 어떤 조건이 필요한지 궁금하시죠?',
        desc: '일용직만의 특별한 수급 요건 3가지를 정리했어요.',
        icon: 'info',
      },
    },

    /* ═══ S2: 수급 조건 ═══ */
    {
      id: 's2',
      number: 'SECTION 02',
      heading: '건설근로자 실업급여 수급 조건은 무엇인가요?',
      subtitle: '피보험기간 + 최종 근무일 + 비자발적 이직, 3가지를 모두 충족해야 해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            피보험기간 180일을 채웠다고 바로 받을 수 있는 건 아니에요. 일용직에게는 한 가지 조건이 더 붙어요. <strong>최종 이직일 이전 1개월간 근무일이 10일 미만</strong>이어야 실업 상태로 인정받아요. 이건 일반 근로자에게는 없는 일용직만의 요건이에요.
          </p>

          <SpokeCompareCards
            cards={[
              {
                title: '일용직 수급 요건',
                subtitle: '고용보험법 제58조 기준',
                items: [
                  '이직일 이전 18개월 중 180일 이상 근무',
                  '최종 이직일 이전 1개월간 10일 미만 근무',
                  '비자발적 이직 (공사 종료·현장 폐쇄 등)',
                  '적극적 재취업 의사와 능력 보유',
                ],
                recommended: true,
                recLabel: '일용직 전용',
              },
              {
                title: '일반 근로자 수급 요건',
                subtitle: '고용보험법 제40조 기준',
                items: [
                  '이직일 이전 18개월 중 180일 이상 가입',
                  '해당 조건 없음',
                  '비자발적 이직 (해고·권고사직 등)',
                  '적극적 재취업 의사와 능력 보유',
                ],
              },
            ]}
          />

          <FormulaBox
            lines={[
              { text: '일용직 실업 인정 기준', comment: true },
              { text: '최종 이직일 이전 1개월간 근무일 < 10일' },
            ]}
          />

          <WarnBox>
            건설현장 공사가 끝나서 자연스럽게 일이 없어진 경우도 <strong>비자발적 이직</strong>으로 인정돼요. 다만, 본인이 일이 있는데도 출근하지 않았다면 자발적 이직으로 볼 수 있어서 주의가 필요해요.
          </WarnBox>
        </>
      ),
      pasBridge: {
        href: '/w/예술인-노무제공자-특고-실업급여-고용보험-조건',
        question: '특수고용직이나 프리랜서인데 실업급여 조건이 궁금하신가요?',
        answer: <>예술인은 피보험기간 9개월, 노무제공자는 12개월이면 수급 자격이 생겨요. 고용보험 가입 요건도 다르니 확인해 보세요.</>,
        buttonText: '예술인·특고 조건 확인 →',
      },
    },

    /* ═══ S3: 금액 계산 ═══ */
    {
      id: 's3',
      number: 'SECTION 03',
      heading: '일용직 실업급여 금액은 얼마나 받을 수 있나요?',
      subtitle: '이직 전 1년간 1일 평균보수의 60%를 받아요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            일용직 구직급여 일액은 <strong>이직 전 1년간 1일 평균보수의 60%</strong>예요. 다만 상한과 하한이 정해져 있어서 계산 결과와 관계없이 일정 범위 안에서 지급돼요. 2026년 기준 일 상한액은 68,100원, 일 하한액은 66,048원이에요.
          </p>

          <SpokeFlow
            steps={[
              { icon: '📋', label: '1일 평균보수', sub: '이직 전 1년간' },
              { icon: '✖️', label: '60% 적용', sub: '구직급여율' },
              { icon: '📊', label: '상·하한 비교', sub: '범위 내 확정' },
              { icon: '💰', label: '구직급여일액', sub: '하루 지급액' },
            ]}
          />

          <SpokeChecklist
            items={[
              { text: '이직 전 1년간 총 보수액 확인 (근로내역확인서 기준)', done: true },
              { text: '총 보수액 / 실 근무일수 = 1일 평균보수 계산', done: true },
              { text: '1일 평균보수 x 60% = 구직급여일액', done: true },
              { text: '일 상한액 68,100원 / 일 하한액 66,048원 범위 내 확인', done: false, note: '대부분 하한액 수준에서 지급돼요' },
            ]}
          />

          <SpokeTable
            id="tbl-amount"
            title="2026년 일용직 구직급여 상·하한액"
            subtitle="고용노동부 2026년 고시 기준"
            headers={['구분', '일액', '월 환산(30일)']}
            rows={[
              ['상한액', '68,100원', '약 204만 3,000원'],
              ['하한액', '66,048원', '약 198만 1,440원'],
            ]}
            highlightCol={1}
          />

          <SpokeTable
            id="tbl-days"
            title="소정급여일수 (나이·피보험기간별)"
            subtitle="고용보험법 시행령 기준"
            headers={['연령 구분', '1년 미만', '1~3년', '3~5년', '5~10년', '10년 이상']}
            rows={[
              ['50세 미만', '120일', '150일', '180일', '210일', '240일'],
              ['50세 이상·장애인', '120일', '180일', '210일', '240일', '270일'],
            ]}
            highlightCol={5}
          />

          <TipBox title="일용직은 상한액과 하한액 차이가 크지 않아요">
            2026년 기준 일 상한 68,100원, 일 하한 66,048원으로 차이가 약 2,000원이에요. 일용직 평균보수가 낮은 편이라 대부분 <strong>하한액 수준</strong>에서 지급돼요. 50세 미만·피보험기간 1년 미만이라도 최소 120일간 받을 수 있어요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '신청',
        title: '금액을 확인했으니 어디서 어떻게 신청하는지 알아볼까요?',
        desc: '일용직은 일반 근로자와 신청 절차가 조금 달라요.',
        icon: 'calc',
      },
    },

    /* ═══ S4: 신청 방법 ═══ */
    {
      id: 's4',
      number: 'STEP 04',
      heading: '일용직 실업급여 신청은 어떻게 하나요?',
      subtitle: '마지막 근무일 다음 날부터 12개월 이내에 신청하세요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            일용직도 신청 절차 자체는 일반 근로자와 비슷해요. 다만 <strong>이직확인서 대신 근로내역확인서</strong>를 활용하고, 건설일용직은 대기기간 7일 없이 <strong>실업신고일부터 바로 급여가 지급</strong>된다는 점이 달라요.
          </p>

          <Chips
            items={[
              { icon: '📅', label: '신청 기한', value: '12개월 이내' },
              { icon: '⏱️', label: '대기기간', value: '없음(건설)' },
              { icon: '📞', label: '상담 전화', value: '1350' },
              { icon: '🏢', label: '방문 장소', value: '고용센터' },
            ]}
          />

          <Steps
            items={[
              { title: '워크넷(work24.go.kr) 구직 등록', desc: '온라인으로 구직신청서를 작성해요. 희망 직종과 근무 조건을 입력하면 돼요.' },
              { title: '수급자격 신청 온라인 교육 이수', desc: '고용24 사이트에서 약 60분짜리 온라인 교육을 수강해요. 교육을 이수해야 다음 단계로 넘어가요.' },
              { title: '관할 고용센터 방문 + 실업 신고', desc: '신분증, 통장사본을 가지고 거주지 관할 고용센터를 방문해요. 일용직은 근로내역확인서로 피보험기간을 확인해요.' },
              { title: '1~4주 간격 실업인정일 출석', desc: '지정된 날짜에 고용센터를 방문해서 구직활동 내역을 보고해요. 인정받으면 2주 단위로 급여가 입금돼요.' },
            ]}
          />

          <SpokeTimeline
            events={[
              { month: '마지막 근무일', title: '퇴직(공사 종료)', desc: '고용보험 피보험자격 상실 처리', status: 'warning' },
              { month: '퇴직 후 1~2주', title: '워크넷 구직등록 + 온라인 교육', desc: '집에서 미리 완료하면 시간 절약' },
              { month: '퇴직 후 2~3주', title: '고용센터 방문·실업 신고', desc: '건설일용직은 신고일부터 급여 개시', status: 'current' },
              { month: '이후 1~4주 간격', title: '실업인정일 출석', desc: '구직활동 2건 이상 보고하면 급여 지급' },
              { month: '최대 120~270일', title: '구직급여 수급 종료', desc: '재취업 시 조기재취업수당 가능' },
            ]}
          />

          <TipBox title="근로내역확인서는 어디서 확인하나요?">
            고용보험 홈페이지(ei.go.kr)에서 <strong>본인 명의 공동인증서</strong>로 로그인하면 일용직 근로내역을 조회할 수 있어요. 사업주가 신고한 내역이 자동으로 쌓여 있어요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '/w/실업급여-퇴사유형별-수급-자격-권고사직-자진퇴사-해고',
        badge: '전체 비교',
        title: '다른 퇴사 유형의 실업급여 조건도 궁금하시다면',
        desc: '권고사직, 자진퇴사, 해고, 계약만료별 수급 자격을 한눈에 비교할 수 있어요.',
        icon: 'grid',
        primary: true,
      },
    },

    /* ═══ FAQ ═══ */
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
      question: '일용직 실업급여 피보험기간에 유급휴일도 포함되나요?',
      answer: '<strong>네.</strong> 실제 근무일뿐만 아니라 사업주로부터 임금을 받은 유급휴일, 휴업수당을 지급받은 날도 피보험 단위기간에 포함돼요.',
    },
    {
      question: '건설현장이 바뀌면 피보험기간이 초기화되나요?',
      answer: '<strong>아니요.</strong> 고용보험에 가입된 사업장이라면 어떤 현장에서 일했든 피보험기간이 <strong>자동 합산</strong>돼요. A현장 50일 + B현장 80일 + C현장 50일 = 합계 180일로 인정받아요.',
    },
    {
      question: '일용직인데 한 달에 10일 이상 일하면 실업급여를 못 받나요?',
      answer: '최종 이직일 이전 <strong>1개월간 근무일이 10일 미만</strong>이어야 해요. 지금 10일 이상 일하고 있다면 아직 실업 상태가 아닌 거예요. 10일 미만이 되는 시점에 수급 자격을 신청하면 돼요.',
    },
    {
      question: '건설일용직은 대기기간이 정말 없나요?',
      answer: '<strong>네.</strong> 일반 근로자는 실업 신고 후 7일간 대기기간이 있지만, 건설일용근로자는 <strong>실업신고일부터 바로</strong> 구직급여가 지급돼요. 고용보험법 제49조 제4항에 근거해요.',
    },
    {
      question: '일용직 실업급여를 받으면서 단기 알바를 해도 되나요?',
      answer: '가능하지만 주의가 필요해요. 1주에 <strong>15시간 미만</strong>이면서 3개월 미만 단기 취업이면 구직급여와 병행할 수 있어요. 다만 소득이 발생하면 해당 일수만큼 급여가 감액될 수 있어요.',
    },
  ],

  relatedSpokes: [
    { badge: '예술인', title: '예술인 노무제공자 특고 실업급여 고용보험 조건', desc: '피보험기간 9개월로 수급 자격 충족', href: '/w/예술인-노무제공자-특고-실업급여-고용보험-조건' },
    { badge: '고령자', title: '65세 이상 고령자 실업급여 수급 제한 예외 조건', desc: '65세 전 가입자는 수급 가능한 예외', href: '/w/65세-이상-고령자-실업급여-수급-제한-예외' },
    { badge: '퇴사유형', title: '실업급여 퇴사유형별 수급 자격 비교', desc: '권고사직·자진퇴사·해고별 조건 비교', href: '/w/실업급여-퇴사유형별-수급-자격-권고사직-자진퇴사-해고' },
  ],

  sources: [
    { name: '고용보험법', url: 'https://www.law.go.kr/법령/고용보험법', org: '법제처' },
    { name: '실업급여 안내', url: 'https://www.ei.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePb0201Info.do', org: '고용보험' },
    { name: '건설일용근로자 실업급여', url: 'https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=1002&ccfNo=5&cciNo=1&cnpClsNo=1', org: '찾기쉬운 생활법령정보' },
    { name: '고용노동부 실업급여 FAQ', url: 'https://www.moel.go.kr', org: '고용노동부' },
  ],
}

export default data
