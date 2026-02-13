import type { SpokeData } from '@/data/spoke/types'
import {
  SpokeTable, FormulaBox, TipBox, WarnBox,
  SpokeStepCards, SpokeCompareCards, SpokeChecklist,
  SpokeFlow, SpokeRateBars,
} from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '65세-이상-고령자-실업급여-수급-제한-예외',

  meta: {
    title: '65세 이상 고령자 실업급여 수급 제한 예외 조건 | 계속고용 기준',
    description: '65세 넘어도 실업급여를 받을 수 있는 경우가 있어요. 65세 이전 가입자의 수급 조건과 예외 사항을 정리했어요.',
    keywords: [
      '65세 이상 실업급여 수급 제한',
      '고령자 실업급여 예외 조건',
      '65세 이전 가입 실업급여 수급',
      '65세 이후 고용보험 적용 제외',
    ],
    ogTitle: '65세 이상 고령자 실업급여 수급 제한과 예외 조건 | 머니위키',
    ogDescription: '65세 이전 가입자는 퇴사 후에도 실업급여를 받을 수 있어요.',
  },

  hub: {
    url: '/w/실업급여-퇴사유형별-수급-자격-권고사직-자진퇴사-해고',
    name: '실업급여 퇴사유형별 수급 자격 비교',
  },

  breadcrumb: ['고용·노동', '실업급여', '65세 이상 고령자'],

  hero: {
    badge: '2026년 기준',
    h1: (
      <>
        65세 이상 고령자 <span className="text-[#1E3A5F]">실업급여 수급 제한</span>과 예외 조건
      </>
    ),
    intro: (
      <p className="text-base text-neutral-500 leading-relaxed">
        65세가 넘으면 실업급여를 못 받는다고 알고 계신 분이 많아요. 하지만 <strong>65세 이전부터 고용보험에 가입</strong>한 분이라면 퇴사 후에도 실업급여를 받을 수 있어요. <a href="/w/실업급여-퇴사유형별-수급-자격-권고사직-자진퇴사-해고" className="text-[#4A7AB5] underline">퇴사 유형별 수급 자격</a>과 함께 65세 고령자의 예외 조건을 먼저 살펴볼게요.
      </p>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '퇴사유형별 실업급여 수급 자격 한눈에 비교',
    },
  },

  summary3: [
    <>65세 이후 <strong>신규 고용</strong>된 사람은 실업급여 적용 제외 (고용보험법 제10조)</>,
    <>65세 이전부터 고용보험 가입 후 <strong>계속 고용</strong>된 경우에는 실업급여 수급 가능</>,
    <>65세 이후에도 <strong>고용안정·직업능력개발사업</strong>은 적용, 보험료도 납부해야 해요</>,
  ],

  sourceBar: {
    badge: '출처',
    name: '고용보험법 제10조 + 고용노동부 안내',
    date: '2026.02',
  },

  prevNext: {
    prev: { title: '일용직 건설근로자 실업급여 피보험기간 계산', href: '/w/일용직-건설근로자-실업급여-피보험기간-계산' },
  },

  stickyBar: {
    topLabel: '65세 이상 핵심',
    value: '이전 가입자 수급 가능',
    buttonText: '수급 조건 확인 →',
    scrollTo: '#s1',
  },

  toc: [
    { id: 's1', label: '65세 이상 실업급여 수급 제한이 뭔가요?' },
    { id: 's2', label: '고령자 실업급여 예외 조건은 어떤 게 있나요?' },
    { id: 's3', label: '65세 이전 가입자가 실업급여를 받으려면 어떻게 하나요?' },
    { id: 's4', label: '65세 이후 고용보험 적용 제외되면 대안이 있나요?' },
    { id: 's-faq', label: '자주 묻는 질문' },
  ],

  sections: [
    {
      id: 's1',
      number: 'SECTION 01',
      heading: '65세 이상 실업급여 수급 제한은 어떤 규정인가요?',
      subtitle: '고용보험법 제10조가 핵심이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            고용보험법 제10조 제2항에 따르면, <strong>65세 이후에 새로 고용된 사람</strong>은 고용보험 중 실업급여 부분이 적용되지 않아요. 쉽게 말해 만 65세 생일이 지난 뒤에 새 직장에 취업하면 실업급여를 받을 수 없다는 뜻이에요.
          </p>

          <FormulaBox
            lines={[
              { text: '65세 이상 고용보험 적용 범위', comment: true },
              { text: '65세 이후 신규 고용 = 실업급여 적용 제외' },
              { text: '(단, 고용안정·직업능력개발사업은 적용)', comment: true },
            ]}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            여기서 중요한 건 <strong>적용 제외 범위</strong>예요. 65세 이후 신규 취업자도 고용안정사업과 직업능력개발사업에는 가입돼요. 사업주가 고용보험료를 납부해야 하고, 직업훈련 지원도 받을 수 있어요.
          </p>

          <SpokeStepCards
            steps={[
              { title: '65세 이전 취업 → 계속 근무', desc: '실업급여 포함 고용보험 전체 적용', tip: '퇴사 시 수급 가능' },
              { title: '65세 이후 신규 취업', desc: '실업급여·육아휴직급여 적용 제외', tip: '고용안정·직업능력사업만 적용' },
              { title: '65세 이후 자영업 개시', desc: '자영업자 실업급여도 적용 제외', tip: '고용보험 임의가입 자체가 불가' },
            ]}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            이 규정의 취지는 실업급여가 <strong>재취업을 위한 생활 안정 지원금</strong>이라는 점에 있어요. 65세 이후 노동시장에 새로 진입하는 분에게는 노인일자리사업 등 별도 지원체계가 마련되어 있다는 게 정부 입장이에요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '예외',
        title: '그런데 65세가 넘었는데 실업급여를 받은 사례가 있다던데요?',
        desc: '65세 이전부터 고용보험에 가입한 분이라면 예외적으로 수급이 가능해요.',
        icon: 'info',
      },
    },

    {
      id: 's2',
      number: 'SECTION 02',
      heading: '고령자 실업급여 예외 조건에는 어떤 게 있나요?',
      subtitle: '65세 이전 가입 + 계속 고용이 핵심이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            65세 이상이어도 실업급여를 받을 수 있는 가장 중요한 예외가 바로 <strong>계속 고용</strong>이에요. 고용보험법은 &quot;65세 전부터 피보험자격을 유지하던 사람이 65세 이후에도 계속하여 고용된 경우는 제외한다&quot;고 명시하고 있어요.
          </p>

          <SpokeTable
            id="tbl-exception"
            title="65세 이상 실업급여 수급 가능 여부 비교"
            subtitle="고용보험법 제10조 제2항 기준"
            headers={['구분', '실업급여 적용', '조건']}
            rows={[
              ['65세 이전 가입 → 계속 근무 후 퇴사', '수급 가능', '근로단절 없이 계속 고용'],
              ['65세 이전 가입 → 전직(단절 없음)', '수급 가능', '공휴일·휴무일 제외 1일도 단절 없어야'],
              ['65세 이후 신규 취업 후 퇴사', '수급 불가', '실업급여 적용 제외'],
              ['65세 이후 자영업 개시 후 폐업', '수급 불가', '자영업자 실업급여 미적용'],
            ]}
            highlightCol={1}
          />

          <SpokeRateBars
            bars={[
              { label: '계속 고용', rate: '수급 가능', width: '100%' },
              { label: '전직(단절 無)', rate: '수급 가능', width: '100%' },
              { label: '신규 취업', rate: '수급 불가', width: '15%' },
              { label: '자영업 개시', rate: '수급 불가', width: '15%' },
            ]}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            여기서 &quot;계속하여 고용&quot;이란 <strong>하루라도 근로단절이 없어야</strong> 한다는 뜻이에요. 다만 토요일, 일요일, 법정 공휴일처럼 원래 쉬는 날은 단절로 보지 않아요. 교대제 근무자의 경우 휴무일이 끼어 있어도 계속 고용으로 인정돼요.
          </p>

          <TipBox title="전직(이직)할 때도 계속 고용이 인정되나요?">
            네. A회사에서 B회사로 옮길 때 금요일 퇴사 → 월요일 입사처럼 주말만 끼어 있으면 계속 고용으로 봐요. 단, 근무일 기준으로 1일이라도 공백이 있으면 단절로 판단해요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '신청',
        title: '계속 고용에 해당하는데, 실업급여를 받으려면 뭘 준비해야 하나요?',
        desc: '65세 이전 가입 이력과 피보험기간 확인이 먼저예요.',
        icon: 'check',
      },
    },

    {
      id: 's3',
      number: 'SECTION 03',
      heading: '65세 이전 가입자가 실업급여를 받으려면 어떻게 하나요?',
      subtitle: '피보험기간 180일 이상 + 비자발적 퇴사가 기본이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            65세 이전부터 고용보험에 가입한 분이 퇴사 후 실업급여를 받으려면, 일반 근로자와 동일한 수급 요건을 갖춰야 해요. 나이와 상관없이 <a href="/w/실업급여-수급기간-소정급여일수-기준" className="text-[#4A7AB5] underline">소정급여일수</a>도 똑같이 적용돼요.
          </p>

          <SpokeCompareCards
            cards={[
              {
                title: '65세 이전 가입자 수급 요건',
                subtitle: '일반 근로자와 동일',
                items: [
                  '이직일 이전 18개월간 피보험기간 180일 이상',
                  '비자발적 이직 (권고사직·해고·계약만료 등)',
                  '근로 의사와 능력이 있으나 취업하지 못한 상태',
                  '적극적인 재취업 노력 (구직활동 인정)',
                  '이직일 다음날부터 12개월 이내 신청',
                ],
                recommended: true,
                recLabel: '수급 가능',
              },
              {
                title: '65세 이후 신규 취업자',
                subtitle: '실업급여 적용 제외',
                items: [
                  '65세 이후 새로 고용보험에 가입한 경우',
                  '실업급여·육아휴직급여 적용 안 됨',
                  '고용안정·직업능력개발사업만 적용',
                  '퇴사해도 실업급여 수급 불가',
                  '이전 사업장 자격으로 수급 가능 여부 확인 필요',
                ],
              },
            ]}
          />

          <SpokeChecklist
            items={[
              { text: '고용24(work24.go.kr)에서 피보험자격 이력 조회', done: true, note: '65세 이전 가입일과 이력 확인' },
              { text: '이직확인서에 비자발적 퇴사 사유 기재 확인', done: true, note: '사업주가 고용센터에 제출' },
              { text: '거주지 관할 고용센터 방문 후 수급자격 신청', done: false, note: '신분증·통장사본 지참' },
              { text: '온라인 취업활동 계획서 작성 및 구직활동 시작', done: false, note: '고용24에서 작성 가능' },
              { text: '실업인정일에 출석 또는 온라인 인정 신청', done: false, note: '1~4주 간격으로 반복' },
            ]}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            한 가지 더 알아두면 좋은 게 있어요. 65세 이후에 새 직장에 취업했다가 퇴사한 경우, 새 직장에서는 실업급여가 안 되지만 <strong>이전 직장(65세 이전 가입)</strong>을 기준으로 수급 자격을 판단할 수 있어요. 단, 이전 직장 퇴사일로부터 <strong>12개월 이내</strong>여야 해요.
          </p>

          <WarnBox>
            <strong>근로단절 주의:</strong> 65세 이전 직장에서 퇴사 후 65세 이후에 재취업했다면, 두 직장 사이에 근로단절이 생겨요. 이 경우 새 직장이 아닌 <strong>이전 직장 퇴사일 기준</strong>으로 12개월 이내 신청해야 실업급여를 받을 수 있어요.
          </WarnBox>
        </>
      ),
      pasBridge: {
        href: '/w/실업급여-신청-방법-절차-준비서류',
        question: '실업급여 신청 절차가 복잡하게 느껴지시나요?',
        answer: <>고용센터 방문부터 실업인정, 급여 지급까지 전 과정을 순서대로 정리했어요. 처음 신청하시는 분도 따라할 수 있어요.</>,
        buttonText: '실업급여 신청 절차 확인 →',
      },
    },

    {
      id: 's4',
      number: 'SECTION 04',
      heading: '65세 이후 고용보험 적용 제외되면 대안은 뭐가 있나요?',
      subtitle: '노인일자리사업, 계속고용장려금 등 대안이 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            65세 이후 신규 취업으로 실업급여 대상이 아닌 분들도 다른 지원을 받을 수 있어요. 정부에서 운영하는 노인일자리사업은 <strong>기초연금 수급자라면 누구나</strong> 신청할 수 있고, 사업주도 고령자 계속고용장려금을 받을 수 있어요.
          </p>

          <SpokeFlow
            steps={[
              { icon: '👤', label: '65세 이후 신규 취업', sub: '실업급여 미적용' },
              { icon: '📋', label: '대안 확인', sub: '아래 제도 활용' },
              { icon: '💰', label: '노인일자리사업', sub: '월 최대 76만원' },
            ]}
          />

          <SpokeTable
            id="tbl-alternative"
            title="65세 이상 실업급여 대안 지원 제도"
            subtitle="2026년 기준 / 지원 금액은 유형별 상이"
            headers={['제도', '대상', '지원 내용', '신청처']}
            rows={[
              ['노인일자리사업', '기초연금 수급 65세 이상', '월 최대 761,040원', '행정복지센터·노인복지관'],
              ['계속고용장려금', '정년 연장·재고용 사업주', '1인당 월 30~40만원 (최대 3년)', '고용24(사업주 신청)'],
              ['60세 이상 고령자 고용지원금', '60세 이상 신규 채용 사업주', '분기별 지원', '고용24(사업주 신청)'],
              ['직업능력개발 훈련', '65세 이상 포함 전 국민', '훈련비 지원', 'HRD-Net'],
            ]}
            highlightCol={2}
          />

          <TipBox title="노인일자리사업은 어디서 신청하나요?">
            거주지 읍면동 행정복지센터, 시니어클럽, 노인복지관에서 신청해요. 온라인은 노인일자리 여기(seniorro.or.kr)에서 가능하고, 전화 상담은 1544-3388번이에요. 매년 11~12월에 다음 해 참여자를 모집해요.
          </TipBox>

          <p className="text-neutral-600 mb-4 leading-relaxed">
            사업주 입장에서도 고령 근로자를 정년 이후 재고용하면 <strong>계속고용장려금</strong>을 받을 수 있어요. 2026년부터 비수도권 기업은 1인당 월 <strong>40만원</strong>, 수도권은 월 <strong>30만원</strong>이 최대 3년간 지원돼요. 근로자에게 직접 주는 돈은 아니지만 고용 유지에 도움이 되는 제도예요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '/w/실업급여-퇴사유형별-수급-자격-권고사직-자진퇴사-해고',
        badge: '허브',
        title: '퇴사 유형별 실업급여 수급 자격 전체 비교',
        desc: '권고사직·자진퇴사·해고·계약만료 등 유형별로 정리했어요.',
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
    { question: '65세 이상인데 실업급여를 받을 수 있나요?', answer: '<strong>65세 이전부터</strong> 고용보험에 가입하고 계속 근무하다가 퇴사한 경우에는 받을 수 있어요. 65세 이후 신규 취업한 경우에는 실업급여 적용이 안 돼요.' },
    { question: '65세 이후 전직하면 실업급여가 끊기나요?', answer: '근무일 기준 <strong>하루도 단절 없이</strong> 전직하면 계속 고용으로 인정돼요. 금요일 퇴사 → 월요일 입사처럼 주말만 끼어도 괜찮아요. 단, 평일에 하루라도 공백이 있으면 신규 고용으로 봐요.' },
    { question: '65세 이후에도 고용보험료를 내야 하나요?', answer: '65세 이후 신규 취업자도 <strong>고용안정·직업능력개발사업</strong> 보험료는 사업주가 납부해야 해요. 실업급여 보험료만 면제예요. 65세 이전 가입자가 계속 근무하는 경우에는 실업급여 보험료도 그대로 납부해요.' },
    { question: '65세 이상 일용직도 실업급여를 받을 수 있나요?', answer: '65세 이전부터 <strong>피보험자격을 유지</strong>하고 있던 일용직 근로자라면 받을 수 있어요. 다만 65세 이후에 일용직으로 새로 취업한 경우에는 실업급여 적용이 안 돼요.' },
    { question: '실업급여 대신 받을 수 있는 지원금이 있나요?', answer: '노인일자리사업(월 최대 761,040원), 직업능력개발 훈련비 지원 등을 받을 수 있어요. 기초연금 수급 65세 이상이면 행정복지센터에서 바로 신청 가능해요.' },
  ],

  relatedSpokes: [
    { badge: '일용직', title: '일용직 건설근로자 실업급여 피보험기간 계산', desc: '일용직 180일 기준 피보험기간 계산법', href: '/w/일용직-건설근로자-실업급여-피보험기간-계산' },
    { badge: '수급기간', title: '실업급여 수급기간 소정급여일수 기준', desc: '나이·근속별 최대 수급일수 확인', href: '/w/실업급여-수급기간-소정급여일수-기준' },
    { badge: '신청 방법', title: '실업급여 신청 방법 절차 준비서류', desc: '고용센터 방문부터 첫 입금까지 전 과정', href: '/w/실업급여-신청-방법-절차-준비서류' },
    { badge: '수급 조건', title: '실업급여 수급 조건 자격 요건 완벽정리', desc: '피보험기간·이직 사유·구직활동 등 총정리', href: '/w/실업급여-수급-조건-자격-요건-완벽정리' },
  ],

  sources: [
    { name: '고용보험법 제10조 (적용 제외)', url: 'https://www.law.go.kr/법령/고용보험법', org: '법제처' },
    { name: '실업급여 안내', url: 'https://www.ei.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePb0201Info.do', org: '고용보험' },
    { name: '65세 이후에도 실업급여 받을 수 있다', url: 'https://www.korea.kr/briefing/policyBriefingView.do?newsId=148737210', org: '대한민국 정책브리핑' },
    { name: '고용노동부 FAQ', url: 'https://www.moel.go.kr', org: '고용노동부' },
  ],
}

export default data
