import type { SpokeData } from '@/data/spoke/types'
import {
  SpokeTable,
  FormulaBox,
  TipBox,
  WarnBox,
  Chips,
  DetailBox,
  SpokeLinks,
  Steps,
} from '@/components/spoke/SpokeBlocks'
import 기초수급Checker from '@/components/checkers/기초수급Checker'

const data: SpokeData = {
  slug: '기초생활수급자-1인가구-생계급여-조건-소득인정액',

  meta: {
    title: '2026 기초생활수급자 1인가구 생계급여 조건 | 소득인정액 계산 방법',
    description: '2026년 1인가구 생계급여, 매월 82만원까지 받을 수 있다는 거 아시나요? 소득인정액 계산법부터 근로소득공제 30% 적용, 부양의무자 기준 폐지까지 사례별로 풀어서 알려드려요.',
    keywords: ['기초생활수급자 1인가구', '생계급여 조건', '소득인정액 계산', '부양의무자 폐지'],
    ogTitle: '2026 기초생활수급자 1인가구 생계급여 조건 | 머니위키',
    ogDescription: '1인가구 생계급여 선정기준 820,556원. 소득인정액 계산과 부양의무자 기준 확인해 보세요.',
  },

  hub: {
    url: '/w/기초생활수급자-조건-총정리',
    name: '2026 기초생활수급자 조건과 급여 총정리',
  },

  breadcrumb: ['복지', '기초생활보장', '1인가구 생계급여'],

  summary3: [
    <>2026년 1인가구 생계급여 선정기준은 <strong>중위소득 32%</strong> = 월 <strong>820,556원</strong></>,
    <>소득인정액 = 소득평가액(근로소득 30% 공제) + 재산의 소득환산액</>,
    <>생계·주거·교육급여 부양의무자 기준 <strong>완전 폐지</strong>, 의료급여만 유지</>,
  ],

  sourceBar: {
    badge: '출처',
    name: '보건복지부 2026 기준 중위소득',
    date: '2026.01',
  },

  prevNext: {
    prev: { title: '기초생활수급자 자격요건 총정리', href: '/w/기초생활수급자-조건-총정리' },
    next: { title: '소득인정액 모의계산 방법', href: '/w/소득인정액-모의계산' },
  },

  stickyBar: {
    topLabel: '1인가구 생계급여',
    value: '820,556원',
    buttonText: '내 수급자격 체크 →',
    scrollTo: '#checker',
  },

  hero: {
    badge: '2026년 최신',
    h1: (
      <>
        2026 기초생활수급자 <span className="text-[#1E3A5F]">1인가구 생계급여</span> 조건과 소득인정액 계산
      </>
    ),
    intro: (
      <p className="text-base text-neutral-500 leading-relaxed">
        1인가구 생계급여 선정기준 <strong>월 820,556원</strong> 이하. 소득인정액 계산법부터 부양의무자 기준 폐지까지, 신청 전 알아야 할 모든 것을 정리했어요.
      </p>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '기초생활수급자 조건, 4가지 급여, 신청 방법 한 번에 확인',
    },
  },

  toc: [
    { id: 'checker', label: '내가 수급자가 될 수 있는지 30초 자격 체크' },
    { id: 'sec-standard', label: '2026년 선정기준은 얼마인가요?' },
    { id: 'sec-income', label: '소득인정액은 어떻게 계산하나요?' },
    { id: 'sec-family', label: '부양의무자 기준은 폐지됐나요?' },
    { id: 'sec-amount', label: '생계급여 실수령액은 얼마인가요?' },
    { id: 'sec-apply', label: '신청은 어떻게 하나요?' },
    { id: 'sec-faq', label: '자주 묻는 질문' },
  ],

  sections: [
    {
      id: 'checker',
      number: 'STEP 01',
      heading: '내가 생계급여 대상인지 확인하기',
      subtitle: '4가지만 선택하면 바로 알 수 있어요',
      content: (
        <>
        <기초수급Checker />
        <p className="text-neutral-600 mb-4 leading-relaxed">
          기초생활수급자가 되려면 <strong>소득인정액</strong>이 급여별 선정기준 이하여야 해요. 소득인정액은 월급만 보는 게 아니라, 부동산·자동차·예금 같은 <a href="#sec-income" className="text-[#4A7AB5] underline">재산도 월 소득으로 환산</a>해서 합산한 금액이에요. 아래에서 대략적인 자격 여부를 확인해 보세요.
        </p>
        </>
      ),
      pasBridge: {
        href: '/w/기초생활수급자-자동차-재산기준',
        question: '전세금 1억, 자동차 있어도 수급자 될 수 있다는 거 아셨나요?',
        answer: <>서울 거주자라면 전세 9,900만원까지 재산 0원 처리돼요. 1,600cc 미만 차량도 조건부 인정.</>,
        buttonText: '자동차 재산 기준 확인 →',
      },
    },

    {
      id: 'sec-standard',
      number: 'SECTION 02',
      heading: '2026년 기초생활수급자 선정기준은 얼마인가요?',
      subtitle: '기준중위소득의 32~50%가 급여별 기준이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            기초생활보장 급여는 생계·의료·주거·교육 4가지예요. 각 급여마다 <strong>선정기준이 다릅니다.</strong> 생계급여가 가장 엄격하고(중위소득 32%), <a href="/w/교육급여-지원항목" className="text-[#4A7AB5] underline">교육급여</a>가 가장 넓어요(50%).
          </p>

          <SpokeTable
            id="tbl-standard"
            title="2026 급여별 선정기준 금액표"
            subtitle="보건복지부 2026년 고시 기준 / 단위: 원"
            headers={['가구원', '생계(32%)', '의료(40%)', '주거(48%)', '교육(50%)']}
            rows={[
              ['1인', '820,556', '1,025,695', '1,230,834', '1,282,119'],
              ['2인', '1,343,773', '1,679,717', '2,015,660', '2,099,646'],
              ['3인', '1,714,892', '2,143,614', '2,572,337', '2,679,518'],
              ['4인', '2,078,316', '2,597,895', '3,117,474', '3,247,369'],
              ['5인', '2,418,150', '3,022,688', '3,627,225', '3,778,360'],
            ]}
            highlightCol={1}
          />

          <TipBox title="내 소득인정액이 생계급여 기준은 넘지만 교육급여 기준 이하라면?">
            생계급여는 못 받지만 교육급여는 받을 수 있어요. 급여별로 따로 판정해요.
          </TipBox>

          <SpokeTable
            id="tbl-median"
            title="2026 기준중위소득 금액표"
            subtitle="보건복지부 고시 / 단위: 원"
            headers={['가구원 수', '1인', '2인', '3인', '4인', '5인']}
            rows={[
              ['기준중위소득', '2,564,238', '4,199,292', '5,359,036', '6,494,738', '7,556,720'],
            ]}
          />
        </>
      ),
      pasBridge: {
        href: '/w/의료급여-1종-2종-차이',
        question: '매달 병원비가 부담되시나요? 의료급여 1종이면 본인부담 0원이에요.',
        answer: <>MRI·입원비·수술비 포함 본인부담 0원에 가깝고, 건강보험료도 0원이에요.</>,
        buttonText: '의료급여 조건 확인 →',
      },
    },

    {
      id: 'sec-income',
      number: 'SECTION 03',
      heading: '소득인정액은 어떻게 계산하나요?',
      subtitle: '월급 + 재산 환산액 − 공제 = 소득인정액',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            소득인정액은 <strong>소득평가액</strong>과 <strong>재산의 소득환산액</strong>을 합한 금액이에요. 단순히 월급만 보는 게 아니라 부동산, 자동차, 예금도 월 소득으로 환산해서 더해요.
          </p>

          <FormulaBox
            lines={[
              { text: '소득인정액 계산 공식', comment: true },
              { text: '소득인정액 = 소득평가액 + 재산의 소득환산액' },
            ]}
          />

          <DetailBox
            title="소득에서 빠지는 주요 공제 항목"
            items={[
              { heading: '근로소득공제 30%', desc: '일해서 번 소득의 30%를 무조건 공제해요. 월 100만원 → 70만원만 반영' },
              { heading: '가구특성 지출', desc: '장애인 추가 비용, 만성질환 치료비, 양육비 등을 공제해요' },
              { heading: '기본재산액 공제', desc: '거주 지역에 따라 5,300만~9,900만원을 재산에서 먼저 빼요' },
            ]}
          />

          <SpokeTable
            id="tbl-base-asset"
            title="2026 지역별 기본재산액 공제 기준표"
            subtitle="기본재산액 이하는 소득환산 시 0원 처리"
            headers={['지역', '서울', '경기', '광역·세종·창원', '그 외 지역']}
            rows={[['기본재산액', '9,900만원', '8,000만원', '7,700만원', '5,300만원']]}
            highlightCol={1}
          />

          <TipBox title="서울에 전세 8,000만원으로 거주 중이라면?">
            기본재산액 9,900만원을 공제하면 <strong>환산액은 0원</strong>이에요. &quot;전세가 있어서 안 된다&quot;고 포기하지 마세요.
          </TipBox>

          <SpokeLinks
            title="소득인정액 더 알아보기"
            items={[
              { num: '01', heading: '소득인정액 모의계산 방법 (복지로 사용법)', desc: '내 정확한 소득인정액을 직접 계산하는 법', href: '/w/소득인정액-모의계산' },
              { num: '02', heading: '재산의 소득환산율 계산 — 자동차, 전세금은?', desc: '자동차 보유 시 불이익, 전세금 공제 기준', href: '/w/재산-소득환산율-계산' },
              { num: '03', heading: '근로소득공제 30% 적용 사례', desc: '월 100만원 소득자의 실제 소득인정액 계산 예시', href: '/w/근로소득공제-적용사례' },
            ]}
          />
        </>
      ),
      pasBridge: {
        href: '/w/주거급여-신청조건',
        question: '월세가 밀려서 걱정이신가요? 서울 1인가구 최대 35만원 지원돼요.',
        answer: <>주거급여는 부양의무자 기준이 완전 폐지됐어요. 중위소득 48% 이하면 임차료를 지원받아요.</>,
        buttonText: '주거급여 조건 확인 →',
      },
    },

    {
      id: 'sec-family',
      number: 'SECTION 04',
      heading: '부양의무자 기준은 폐지됐나요?',
      subtitle: '생계·주거·교육급여는 폐지, 의료급여만 유지',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            2026년 기준으로 <strong>생계급여, <a href="/w/주거급여-신청조건" className="text-[#4A7AB5] underline">주거급여</a>, 교육급여</strong>의 부양의무자 기준은 <strong>완전 폐지</strong>됐어요. 부모님이나 자녀가 돈을 많이 벌어도 내 소득인정액만 기준 이하면 받을 수 있어요.
          </p>

          <Chips
            items={[
              { icon: '✅', label: '생계급여', value: '폐지', href: '#checker' },
              { icon: '⚠️', label: '의료급여', value: '유지', href: '/w/의료급여-1종-2종-차이' },
              { icon: '✅', label: '주거급여', value: '폐지', href: '/w/주거급여-신청조건' },
              { icon: '✅', label: '교육급여', value: '폐지', href: '/w/교육급여-지원항목' },
            ]}
          />

          <WarnBox>
            <strong>의료급여 예외:</strong> 부양의무자 연소득 <strong>1.3억 초과</strong> 또는 재산 <strong>12억 초과</strong> 시 의료급여가 제외될 수 있어요. 단 수급자가 중증장애인·노인이면 면제돼요.
          </WarnBox>

          <SpokeLinks
            title="부양의무자 더 알아보기"
            items={[
              { num: '01', heading: '의료급여 부양의무자 면제 조건', desc: '중증장애·노인 면제 대상과 소득·재산 기준 상세', href: '/w/의료급여-부양의무자-면제' },
              { num: '02', heading: '부양능력 판정 기준', desc: '부양의무자의 소득·재산이 얼마까지 허용되는지', href: '/w/부양능력-판정기준' },
            ]}
          />
        </>
      ),
      pasBridge: {
        href: '/w/긴급복지지원-신청방법',
        question: '갑자기 직장을 잃었는데, 당장 다음 달 생활비가 막막하시죠?',
        answer: <>긴급복지지원은 신청 즉시 선지급 후 조사해요. 생계급여와 별개로 최대 월 71만원 긴급생계지원.</>,
        buttonText: '긴급복지지원 확인 →',
      },
    },

    {
      id: 'sec-amount',
      number: 'SECTION 05',
      heading: '생계급여 실수령액은 얼마인가요?',
      subtitle: '선정기준액 − 소득인정액 = 매월 받는 현금',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            생계급여는 선정기준액에서 내 소득인정액을 뺀 차액을 <strong>매달 현금</strong>으로 줘요. 소득이 전혀 없는 1인가구라면 월 <strong>820,556원 전액</strong>을 받아요.
          </p>

          <FormulaBox
            lines={[
              { text: '생계급여 실수령액 계산', comment: true },
              { text: '생계급여 = 선정기준액 − 소득인정액' },
            ]}
          />

          <SpokeTable
            id="tbl-amount"
            title="1인가구 소득인정액별 생계급여 예상 수령액"
            subtitle="2026년 선정기준 820,556원 기준"
            headers={['소득인정액', '0원', '20만원', '30만원', '50만원', '70만원']}
            rows={[
              ['월 수령액', '820,556원', '약 62만원', '약 52만원', '약 32만원', '약 12만원'],
            ]}
            highlightCol={1}
          />

          <TipBox title="소득인정액이 0원에 가까울수록 더 많이 받아요">
            위의 <a href="#checker" className="text-[#4A7AB5] underline">간편 체크</a>에서 예상 수령액도 확인할 수 있어요.
          </TipBox>
        </>
      ),
      pasBridge: {
        href: '/w/생계급여-실수령액-계산',
        question: '그래서 나는 매달 얼마를 받을 수 있을까?',
        answer: <>소득인정액별 정확한 수령액 계산 예시와 추가 감액 조건까지 정리했어요.</>,
        buttonText: '실수령액 계산하기 →',
      },
    },

    {
      id: 'sec-apply',
      number: 'STEP 06',
      heading: '기초생활수급자 신청은 어떻게 하나요?',
      subtitle: '주민센터 방문 → 서류 제출 → 조사 → 결정 통지',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            온라인은 <strong>복지로(bokjiro.go.kr)</strong>에서, 오프라인은 거주지 읍·면·동 <strong>주민센터</strong>에서 신청해요. 본인 또는 친족이 신청할 수 있고, 위기 상황이면 직권 신청도 가능해요.
          </p>

          <Steps
            items={[
              { title: '주민센터 방문·신청서 작성', desc: '신분증, 통장사본, 임대차계약서 지참. 소득·재산 조회 동의서 작성' },
              { title: '소득·재산 조사 (약 30일)', desc: '국민건강보험·국세청·금융기관 등 공적 자료 일괄 조회' },
              { title: '부양의무자 조사 (의료급여만)', desc: '생계·주거·교육급여는 부양의무자 조사 없음' },
              { title: '결정 통지 → 급여 개시', desc: '신청일 기준 30일 이내 결정. 통과 시 신청월부터 소급 지급' },
            ]}
          />

          <TipBox title="온라인 신청이 어려우신 분은?">
            주민센터에 방문하시면 담당 공무원이 대신 입력해줘요. 전화 예약(129번) 후 방문하면 대기 시간을 줄일 수 있어요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '/w/차상위계층-조건-혜택',
        badge: '차상위',
        title: '기준을 초과해서 수급자가 안 된다면?',
        desc: '소득인정액이 중위소득 50% 이하면 차상위계층으로 의료비 감면, 통신비 할인 혜택을 받을 수 있어요.',
        icon: 'info',
      },
    },

    {
      id: 'sec-faq',
      number: '07',
      heading: '자주 묻는 질문',
      subtitle: '',
      content: null,
    },
  ],

  faq: [
    {
      question: '기초생활수급자 1인가구 생계급여 조건은?',
      answer: '2026년 기준 1인가구 소득인정액이 <strong>820,556원 이하</strong>면 생계급여를 받을 수 있어요. 소득인정액은 근로소득(30% 공제 후)과 재산 환산액을 합한 금액이에요.',
    },
    {
      question: '일을 하면서도 수급자가 될 수 있나요?',
      answer: '<strong>네.</strong> 근로소득의 30%를 공제하기 때문에 가능해요. 예를 들어 월 100만원 벌면 소득평가액은 70만원이에요. 1인가구 기준(82만원) 이하이므로 생계급여를 받을 수 있어요.',
    },
    {
      question: '자동차가 있으면 수급자가 안 되나요?',
      answer: '1,600cc 미만·차량가액 200만원 이하·10년 이상 차량 등은 <strong>재산 산정에서 제외</strong>돼요. 장애인 사용 차량도 마찬가지예요. 다만 그 외 차량은 월 100% 소득환산되어 불리해요.',
    },
    {
      question: '전세보증금도 재산에 포함되나요?',
      answer: '포함되지만 <strong>기본재산액을 먼저 공제</strong>해요. 서울은 9,900만원까지 공제되므로, 전세 9,000만원이면 환산액은 0원이에요.',
    },
    {
      question: '탈락해도 다시 신청할 수 있나요?',
      answer: '<strong>횟수 제한 없이</strong> 다시 신청할 수 있어요. 소득·재산 변동이 있으면 바로 재신청하세요. 직장을 그만두거나 부채가 늘었을 때가 재신청 적기예요.',
    },
    {
      question: '의료급여 수급자는 건강보험료를 안 내나요?',
      answer: '<strong>네.</strong> 의료급여 수급자는 건강보험 가입 대상이 아니에요. 건강보험료 0원이고, 병원비 본인부담도 1종은 입원 무료, 외래 1,000원이에요.',
    },
  ],

  relatedSpokes: [
    { badge: '기준중위소득', title: '2026 기준중위소득 금액 총정리 (1인~6인가구)', desc: '가구원 수별 기준중위소득 금액 확인', href: '/w/기준중위소득-금액-총정리' },
    { badge: '주거급여', title: '주거급여 신청 조건 — 1인가구 임차료 최대 35만원', desc: '서울·경기·지방 기준임대료 비교', href: '/w/주거급여-신청조건' },
    { badge: '의료급여', title: '의료급여 1종 2종 차이 — 본인부담금 0원 조건', desc: '본인부담금·건강보험료 면제 기준', href: '/w/의료급여-1종-2종-차이' },
    { badge: '긴급복지', title: '긴급복지지원 신청 방법 — 갑자기 소득이 끊겼을 때', desc: '선지급 후 조사, 최대 월 71만원', href: '/w/긴급복지지원-신청방법' },
    { badge: '소득인정액', title: '기초생활수급자 자동차 재산 기준 — 보유해도 되는 조건', desc: '1,600cc 미만·200만원 이하 제외 조건', href: '/w/기초생활수급자-자동차-재산기준' },
  ],

  sources: [
    { name: '2026년 기초생활보장 사업안내', url: 'https://www.mohw.go.kr', org: '보건복지부' },
    { name: '복지로 기초생활보장 안내', url: 'https://www.bokjiro.go.kr', org: '보건복지부' },
  ],
}

export default data
