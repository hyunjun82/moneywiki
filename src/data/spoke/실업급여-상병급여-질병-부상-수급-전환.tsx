import type { SpokeData } from '@/data/spoke/types'
import {
  SpokeTable, TipBox, FormulaBox, WarnBox,
  Chips, Steps, SpokeFlow, SpokeChecklist,
} from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '실업급여-상병급여-질병-부상-수급-전환',

  meta: {
    title: '실업급여 상병급여 전환 조건 신청 방법 | 질병 부상 수급 절차',
    description: '실업급여 수급 중 아프면 상병급여로 전환할 수 있어요. 7일 이상 질병·부상 조건과 신청 서류, 출산 45일 지급까지 정리했어요.',
    keywords: [
      '실업급여 상병급여 전환 조건',
      '실업급여 질병 부상 수급 방법',
      '실업급여 간병 퇴직 상병급여',
      '상병급여 신청 절차 서류',
    ],
    ogTitle: '실업급여 상병급여 전환 조건과 신청 방법 | 머니위키',
    ogDescription: '7일 이상 아프면 상병급여로 전환 가능해요. 조건과 절차를 확인하세요.',
  },

  hub: {
    url: '/w/실업급여-수급중-취업-알바-상병급여-보호',
    name: '실업급여 수급 중 취업·알바·상병급여·수급권 보호',
  },

  breadcrumb: ['고용·노동', '실업급여', '상병급여 전환'],

  summary3: [
    <>상병급여는 구직급여 수급 중 <strong>7일 이상</strong> 질병·부상으로 취업이 불가능할 때 받는 급여예요</>,
    <>금액은 구직급여일액과 <strong>동일</strong>하고, 남은 소정급여일수 범위에서 지급돼요</>,
    <>출산의 경우 출산일부터 <strong>45일간</strong> 상병급여를 받을 수 있어요</>,
  ],

  sourceBar: {
    badge: '출처',
    name: '고용보험법 제63조 상병급여',
    date: '2026.02',
  },

  prevNext: {
    prev: { title: '실업급여 중단 거부 수급정지 사유 대처법', href: '/w/실업급여-중단-거부-수급정지-사유-대처' },
    next: { title: '실업급여 수급 중 창업 자격 유지 조건', href: '/w/실업급여-수급중-창업-자격-유지-조건' },
  },

  stickyBar: {
    topLabel: '상병급여 전환 조건',
    value: '7일 이상',
    buttonText: '신청 절차 보기 →',
    scrollTo: '#s3',
  },

  hero: {
    badge: '2026년 기준',
    h1: (
      <>
        실업급여 <span className="text-[#1E3A5F]">상병급여</span> 전환 조건과 질병·부상 수급 방법
      </>
    ),
    intro: (
      <p className="text-base text-neutral-500 leading-relaxed">
        실업급여를 받는 중에 갑자기 아프거나 다치면 구직활동을 할 수 없잖아요. 이럴 때 <strong>상병급여</strong>로 전환하면 구직급여일액과 동일한 금액을 계속 받을 수 있어요. <a href="/w/실업급여-수급중-취업-알바-상병급여-보호" className="text-[#4A7AB5] underline">실업급여 수급 중 관리 전체 가이드</a>에서 다른 상황도 확인해 보시고, 먼저 상병급여가 뭔지부터 볼게요.
      </p>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '실업급여 수급 중 취업·알바·상병급여·수급권 보호 총정리',
    },
  },

  toc: [
    { id: 's1', label: '실업급여 상병급여 전환 조건은 어떻게 되나요?' },
    { id: 's2', label: '실업급여 질병 부상 시 상병급여 금액은 얼마인가요?' },
    { id: 's3', label: '상병급여 신청 절차와 서류는 무엇인가요?' },
    { id: 's4', label: '실업급여 간병이나 출산도 상병급여 대상인가요?' },
    { id: 's-faq', label: '자주 묻는 질문' },
  ],

  sections: [
    {
      id: 's1',
      number: 'SECTION 01',
      heading: '실업급여 상병급여 전환 조건은 어떻게 되나요?',
      subtitle: '실업 신고 후 7일 이상 취업 불능이면 전환 가능해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            상병급여는 구직급여 수급자격자가 <strong>실업 신고를 한 이후에</strong> 질병·부상·출산으로 취업이 불가능해서 실업인정을 받지 못한 날에 대해 지급하는 급여예요. 핵심 조건은 <strong>7일 이상</strong> 질병이나 부상으로 취업할 수 없는 상태여야 한다는 거예요. 감기로 이틀 쉬는 정도는 해당이 안 되고, 입원이나 장기 치료가 필요한 경우에 신청할 수 있어요.
          </p>

          <SpokeChecklist
            items={[
              { text: '실업 신고(수급자격 인정)를 먼저 완료했어요', done: true, note: '실업 신고 전 발생한 질병은 대상이 아니에요' },
              { text: '질병·부상으로 7일 이상 취업할 수 없어요', done: true, note: '의사 증명서가 필수예요' },
              { text: '구직급여 소정급여일수가 남아 있어요', done: true, note: '남은 일수 범위에서만 지급돼요' },
              { text: '근로기준법 휴업보상이나 산재보험 휴업급여를 받고 있지 않아요', done: false, note: '다른 보상을 받으면 상병급여는 제외돼요' },
            ]}
          />

          <WarnBox>
            <strong>주의:</strong> 고용센터가 소개한 직업을 거부하거나, 직업훈련·재취업 지도를 거부해서 구직급여가 <a href="/w/실업급여-중단-거부-수급정지-사유-대처" className="text-amber-700 underline">수급정지된 기간</a>에는 상병급여도 받을 수 없어요.
          </WarnBox>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '금액',
        title: '상병급여로 전환하면 금액이 줄어드는 건 아닐까요?',
        desc: '구직급여일액과 동일한 금액을 받을 수 있어요.',
        icon: 'calc',
      },
    },

    {
      id: 's2',
      number: 'SECTION 02',
      heading: '실업급여 질병 부상 시 상병급여 금액은 얼마인가요?',
      subtitle: '구직급여일액과 동일한 금액을 받아요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            아프다고 급여가 깎이면 억울하잖아요. 다행히 상병급여는 <strong>구직급여일액과 동일한 금액</strong>을 지급해요. 2026년 기준 구직급여 상한액은 일 68,100원(월 약 204만 3,000원)이고, 하한액은 일 66,048원(월 약 198만 1,440원)이에요. 상병급여도 이 범위 안에서 기존에 받던 구직급여일액 그대로 나와요.
          </p>

          <FormulaBox
            lines={[
              { text: '상병급여 금액 계산', comment: true },
              { text: '상병급여일액 = 구직급여일액 (동일)' },
            ]}
          />

          <SpokeTable
            id="tbl-amount"
            title="2026년 상병급여 지급 범위"
            subtitle="고용보험법 제63조, 2026년 최저임금 10,320원 기준"
            headers={['항목', '기준', '금액']}
            rows={[
              ['상한액', '일 기준', '68,100원'],
              ['하한액', '일 기준', '66,048원'],
              ['월 상한', '30일 기준', '약 204만 3,000원'],
              ['월 하한', '30일 기준', '약 198만 1,440원'],
            ]}
            highlightCol={2}
          />

          <TipBox title="남은 소정급여일수만큼만 받을 수 있어요">
            상병급여는 소정급여일수에서 이미 받은 구직급여 일수를 뺀 나머지 범위에서 지급돼요. 예를 들어 소정급여일수가 150일인데 구직급여를 50일 받았다면, 상병급여는 최대 100일까지 받을 수 있어요.
          </TipBox>

          <Chips
            items={[
              { icon: '💰', label: '상한액', value: '일 68,100원' },
              { icon: '📉', label: '하한액', value: '일 66,048원' },
              { icon: '📅', label: '지급 범위', value: '잔여일수' },
              { icon: '🔄', label: '금액 변동', value: '구직급여 동일' },
            ]}
          />
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '절차',
        title: '그럼 상병급여는 어떻게 신청하면 되는 건가요?',
        desc: '필요 서류와 청구 기한을 정리했어요.',
        icon: 'check',
      },
    },

    {
      id: 's3',
      number: 'SECTION 03',
      heading: '상병급여 신청 절차와 서류는 무엇인가요?',
      subtitle: '취업 불능 사유 소멸 후 14일 이내에 청구해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            상병급여 조건에 해당한다면 바로 신청할 수 있는 건 아니에요. 치료가 끝나거나 취업이 가능한 상태가 된 뒤에 청구하는 구조예요. 기한을 놓치면 지급받지 못할 수 있으니 아래 절차를 꼼꼼히 확인하세요.
          </p>

          <Steps
            items={[
              { title: '질병·부상 발생 시 고용센터에 사전 연락', desc: '실업인정일에 출석이 어려운 상황을 미리 알려야 해요. 전화나 온라인으로 가능해요.' },
              { title: '의사 증명서 발급받기', desc: '질병명, 초진일, 완치일이 적힌 의사 증명서(진단서)를 준비해요.' },
              { title: '취업 불능 사유 소멸 후 14일 이내 청구', desc: '상병급여 청구서 + 의사 증명서를 관할 고용센터에 제출해요. 대리인도 가능해요.' },
              { title: '심사 후 지급', desc: '최초 구직급여 수급일에 상병급여가 지정 계좌로 입금돼요.' },
            ]}
          />

          <SpokeTable
            id="tbl-deadline"
            title="상병급여 청구 기한 정리"
            subtitle="고용보험법 시행규칙 기준"
            headers={['상황', '청구 기한']}
            rows={[
              ['일반적인 경우', '취업 불능 사유 소멸 후 14일 이내'],
              ['수급기간 내 종료 시', '수급기간 종료 후 30일 이내'],
              ['불가피한 사유 발생 시', '사유 소멸 후 7일 이내'],
            ]}
          />

          <SpokeFlow
            steps={[
              { icon: '🏥', label: '질병·부상 발생', sub: '고용센터 사전 연락' },
              { icon: '📋', label: '의사 증명서 발급', sub: '진단서 준비' },
              { icon: '📨', label: '고용센터 청구', sub: '14일 이내' },
              { icon: '💰', label: '상병급여 지급', sub: '계좌 입금' },
            ]}
          />

          <TipBox title="서류를 직접 제출하기 어렵다면?">
            대리인을 통해서도 상병급여를 청구할 수 있어요. 가족이나 지인이 대신 고용센터에 방문해서 서류를 제출하면 돼요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '특수',
        title: '출산이나 가족 간병도 상병급여 대상이 될 수 있을까요?',
        desc: '출산 45일 지급과 간병 사유 인정 기준을 알려드려요.',
        icon: 'info',
      },
    },

    {
      id: 's4',
      number: 'SECTION 04',
      heading: '실업급여 간병이나 출산도 상병급여 대상인가요?',
      subtitle: '출산은 45일 지급, 간병은 수급기간 연장 사유예요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            상병급여는 본인의 질병·부상뿐 아니라 <strong>출산</strong>도 대상이에요. 출산의 경우 출산일로부터 <strong>45일간</strong> 상병급여가 지급돼요. 다만 가족 간병은 상병급여 대상은 아니지만, <a href="/w/실업급여-수급-조건-자격-요건-완벽정리" className="text-[#4A7AB5] underline">실업급여 수급 기간을 연장</a>하는 사유로 인정받을 수 있어요.
          </p>

          <SpokeTable
            id="tbl-special"
            title="상황별 상병급여 적용 여부"
            subtitle="고용보험법 제63조 및 시행규칙 기준"
            headers={['상황', '상병급여', '비고']}
            rows={[
              ['본인 질병·부상 (7일 이상)', 'O 가능', '의사 증명서 필수'],
              ['출산', 'O 가능', '출산일부터 45일간 지급'],
              ['가족 간병 (동거친족)', 'X 불가', '수급기간 연장 사유로 인정'],
              ['산재보험 휴업급여 수급 중', 'X 불가', '중복 수급 불가'],
              ['근로기준법 휴업보상 수급 중', 'X 불가', '중복 수급 불가'],
            ]}
            highlightCol={1}
          />

          <WarnBox>
            <strong>출산 상병급여 주의:</strong> 출산 상병급여를 받으려면 <strong>출산 증명서</strong>를 별도로 제출해야 해요. 일반 질병·부상과 청구서 서식이 다르니 고용센터에서 &quot;상병급여(출산시) 청구서&quot;를 받으세요.
          </WarnBox>

          <TipBox title="가족 간병으로 구직활동이 어렵다면?">
            동거 친족(배우자, 8촌 이내 혈족, 4촌 이내 인척)의 질병·부상을 간호해야 하는 경우, <a href="/w/실업급여-실업인정-구직활동-방법" className="text-[#4A7AB5] underline">실업인정 기준기간을 연장</a>받을 수 있어요. 고용센터에 사유를 미리 알리는 게 중요해요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '/w/실업급여-수급중-취업-알바-상병급여-보호',
        badge: '가이드',
        title: '실업급여 수급 중 다른 상황도 궁금하다면?',
        desc: '취업, 알바, 해외체류, 수급권 보호까지 전체 가이드에서 확인하세요.',
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
    { question: '상병급여를 받으면 구직급여 일수가 줄어드나요?', answer: '<strong>네.</strong> 상병급여는 구직급여를 대신하는 급여이기 때문에 소정급여일수에서 차감돼요. 상병급여를 20일 받으면 남은 구직급여 일수가 20일 줄어요.' },
    { question: '실업 신고 전에 아프면 상병급여를 받을 수 있나요?', answer: '<strong>아니요.</strong> 상병급여는 반드시 실업 신고(수급자격 인정)를 한 이후에 발생한 질병·부상만 대상이에요. 퇴직 전이나 실업 신고 전 질병은 해당되지 않아요.' },
    { question: '상병급여와 산재보험 휴업급여를 동시에 받을 수 있나요?', answer: '<strong>아니요.</strong> 산재보험 휴업급여, 근로기준법 휴업보상, 국가배상법 휴업배상 등을 받는 경우에는 상병급여가 지급되지 않아요. 중복 수급은 불가해요.' },
    { question: '감기나 가벼운 질병으로도 상병급여를 신청할 수 있나요?', answer: '<strong>7일 이상</strong> 취업이 불가능해야 해요. 감기로 하루이틀 쉬는 정도는 해당되지 않아요. 의사가 7일 이상 취업 불능으로 판단한 증명서가 있어야 신청할 수 있어요.' },
    { question: '상병급여 청구 기한을 놓치면 어떻게 되나요?', answer: '취업 불능 사유 소멸 후 <strong>14일 이내</strong>에 청구해야 해요. 기한을 넘기면 지급받지 못할 수 있으니 치료가 끝나는 즉시 고용센터에 서류를 제출하는 게 안전해요.' },
  ],

  relatedSpokes: [
    { badge: '중단', title: '실업급여 중단 거부 수급정지 사유 대처법', desc: '수급정지 6가지 사유와 재개 방법', href: '/w/실업급여-중단-거부-수급정지-사유-대처' },
    { badge: '실업인정', title: '실업급여 실업인정 구직활동 방법', desc: '실업인정일 출석과 구직활동 인정 기준', href: '/w/실업급여-실업인정-구직활동-방법' },
    { badge: '수급기간', title: '실업급여 수급기간 소정급여일수 기준', desc: '연령·피보험기간별 소정급여일수 확인', href: '/w/실업급여-수급기간-소정급여일수-기준' },
    { badge: '창업', title: '실업급여 수급 중 창업 자격 유지 조건', desc: '사업자등록 시점별 수급 영향과 전환', href: '/w/실업급여-수급중-창업-자격-유지-조건' },
    { badge: '이의신청', title: '실업급여 이의신청 심사청구 재심사 절차', desc: '불합리한 결정에 불복하는 방법', href: '/w/실업급여-이의신청-심사청구-재심사-불복-절차' },
  ],

  sources: [
    { name: '고용보험법 제63조 (상병급여)', url: 'https://www.law.go.kr/법령/고용보험법', org: '법제처' },
    { name: '실업급여 안내 (상병급여)', url: 'https://www.ei.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePb0201Info.do', org: '고용보험' },
    { name: '찾기쉬운 생활법령정보 상병급여', url: 'https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=722&ccfNo=2&cciNo=5&cnpClsNo=1', org: '법제처' },
    { name: '고용노동부 실업급여 안내', url: 'https://www.moel.go.kr', org: '고용노동부' },
  ],
}

export default data
