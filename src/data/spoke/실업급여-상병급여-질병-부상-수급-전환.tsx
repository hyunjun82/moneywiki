import type { SpokeData } from '@/data/spoke/types'
import {
  SpokeTable, FormulaBox, TipBox, WarnBox,
  Chips, Steps, SpokeFlow, SpokeChecklist,
  SpokeTimeline, SpokeCompareCards, SpokeRateBars,
} from '@/components/spoke/SpokeBlocks'
import 상병급여Checker from '@/components/checkers/상병급여Checker'

const data: SpokeData = {
  slug: '실업급여-상병급여-질병-부상-수급-전환',

  meta: {
    title: '실업급여 상병급여 전환 조건, 신청 | 질병 부상 7일 이상 기준',
    description: '실업급여 받는 중에 다치면 상병급여로 전환할 수 있다는 거 아시나요? 7일 이상 기준과 신청 절차, 지급 금액을 알려드려요.',
    keywords: [
      '실업급여 상병급여 전환 조건 기준',
      '실업급여 상병급여 질병 부상 7일 기준',
      '실업급여 상병급여 신청 절차 서류',
      '실업급여 상병급여 금액 지급기간 한도',
    ],
    ogTitle: '실업급여 상병급여 전환 조건과 신청 절차 | 머니위키',
    ogDescription: '7일 이상 아프면 상병급여로 전환 가능, 조건과 절차를 확인하세요.',
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
    buttonText: '전환 체크하기 →',
    scrollTo: '#checker',
  },

  hero: {
    badge: '2026년 기준',
    h1: (
      <>
        실업급여 <span className="text-[#1E3A5F]">상병급여</span> 전환 조건과 질병·부상 수급 절차
      </>
    ),
    intro: (
      <p className="text-base text-neutral-500 leading-relaxed">
        실업급여 받는 중에 갑자기 아프면 구직활동이 어려우실 텐데요. 이럴 때 <strong>상병급여</strong>로 전환하면 구직급여일액과 동일한 금액을 계속 받을 수 있어요. <a href="/w/실업급여-수급중-취업-알바-상병급여-보호" className="text-[#4A7AB5] underline">실업급여 수급 중 관리 가이드</a>에서 다른 상황도 함께 보시고요. 먼저 상병급여 전환 조건부터 살펴볼게요.
      </p>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '실업급여 수급 중 취업·알바·상병급여·수급권 보호 총정리',
    },
  },

  toc: [
    { id: 'checker', label: '내가 상병급여로 전환할 수 있는지 체크' },
    { id: 's1', label: '실업급여에서 상병급여로 전환하는 조건은 무엇인가요?' },
    { id: 's2', label: '실업급여 상병급여는 질병 부상 7일 이상이면 받나요?' },
    { id: 's3', label: '실업급여 상병급여 신청 절차와 서류는 무엇인가요?' },
    { id: 's4', label: '실업급여 상병급여 금액과 지급기간 한도는 얼마인가요?' },
    { id: 's-faq', label: '자주 묻는 질문' },
  ],

  sections: [
    {
      id: 'checker',
      number: 'CHECK',
      heading: '상병급여로 전환할 수 있는지 확인해 보세요',
      subtitle: '3가지만 선택하면 바로 알 수 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            상병급여는 모든 질병에 해당하는 건 아니에요. <strong>실업 신고 이후</strong>에 발생한 질병·부상이어야 하고, 다른 보상과 중복 수급도 불가해요. 아래에서 전환 가능 여부를 확인해 보세요.
          </p>
          <상병급여Checker />
        </>
      ),
      bridgeCTA: {
        href: '#s1',
        badge: '조건',
        title: '상병급여 전환 조건이 정확히 뭔지 궁금하실 거예요',
        desc: '실업 신고 후 7일 이상 취업 불능이면 전환 가능해요.',
        icon: 'info',
      },
    },

    {
      id: 's1',
      number: 'SECTION 01',
      heading: '실업급여에서 상병급여로 전환하는 조건은 무엇인가요?',
      subtitle: '실업 신고 후 질병·부상·출산으로 취업 불가 시 전환돼요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            상병급여는 구직급여 수급자격자가 <strong>실업 신고를 한 이후에</strong> 질병·부상·출산으로 취업이 불가능해서 실업인정을 받지 못한 날에 대해 지급하는 급여예요. 핵심 조건은 크게 4가지로 나뉘어요.
          </p>

          <FormulaBox
            lines={[
              { text: '상병급여 전환 4가지 핵심 조건', comment: true },
              { text: '1. 실업 신고(수급자격 인정) 완료', numbered: true },
              { text: '2. 7일 이상 질병·부상 또는 출산', numbered: true },
              { text: '3. 소정급여일수 잔여분 존재', numbered: true },
              { text: '4. 산재보험 등 다른 보상 미수급', numbered: true },
            ]}
          />

          <SpokeRateBars
            bars={[
              { label: '질병·부상', rate: '7일 이상', width: '70%' },
              { label: '출산', rate: '45일 지급', width: '100%' },
              { label: '가족 간병', rate: '대상 아님', width: '20%' },
            ]}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            감기로 하루이틀 쉬는 정도는 해당이 안 돼요. 입원이나 장기 치료가 필요해서 <strong>의사가 7일 이상 취업 불능으로 판단</strong>한 경우에만 신청할 수 있어요. 출산은 별도로 출산일부터 45일간 지급되는 특례가 있어요.
          </p>

          <WarnBox>
            <strong>주의:</strong> 고용센터가 소개한 직업을 거부하거나, 직업훈련·재취업 지도를 거부해서 구직급여가 <a href="/w/실업급여-중단-거부-수급정지-사유-대처" className="text-amber-700 underline">수급정지된 기간</a>에는 상병급여도 받을 수 없어요.
          </WarnBox>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '기준',
        title: '7일 기준이 정확히 어떻게 적용되는지 알고 싶으실 텐데요',
        desc: '질병·부상 유형별로 적용 방식이 달라요.',
        icon: 'calc',
      },
    },

    {
      id: 's2',
      number: 'SECTION 02',
      heading: '실업급여 상병급여는 질병 부상 7일 이상이면 받나요?',
      subtitle: '질병·부상 유형별로 적용 기준이 달라요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            아프다고 무조건 상병급여를 받을 수 있는 건 아니에요. <strong>7일 이상</strong> 취업이 불가능해야 하고, 의사 증명서로 이를 입증해야 해요. 다만 출산이나 산재보험 수급 중인 경우는 별도 기준이 적용돼요.
          </p>

          <SpokeCompareCards
            cards={[
              {
                title: '상병급여 대상',
                subtitle: '전환 가능한 경우',
                items: [
                  '질병·부상으로 7일 이상 취업 불가',
                  '입원·수술 등 장기 치료 필요',
                  '출산 (출산일부터 45일)',
                  '의사 증명서 발급 가능',
                ],
                recommended: true,
                recLabel: '전환 가능',
              },
              {
                title: '상병급여 비대상',
                subtitle: '전환 불가한 경우',
                items: [
                  '7일 미만 단기 질병 (감기 등)',
                  '가족 간병 (수급기간 연장은 가능)',
                  '산재보험 휴업급여 수급 중',
                  '근로기준법 휴업보상 수급 중',
                ],
              },
            ]}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            여기서 중요한 게 하나 있어요. 상병급여를 받은 일수는 소정급여일수에서 차감돼요. 예를 들어 소정급여일수가 150일인데 상병급여를 30일 받으면, 남은 구직급여 일수는 120일로 줄어요.
          </p>

          <WarnBox>
            <strong>중복 수급 불가:</strong> 산재보험 휴업급여, 근로기준법 휴업보상, 국가배상법 휴업배상, 의사상자예우법 보상금을 받고 있으면 상병급여는 지급되지 않아요. 어느 쪽이 유리한지 먼저 비교해 보세요.
          </WarnBox>

          <TipBox title="7일 미만이라도 실업인정일 출석이 어렵다면?">
            상병급여 대상은 아니지만, 고용센터에 <strong>사전 연락</strong>하면 실업인정일을 변경할 수 있어요. 전화나 고용24 온라인으로 미리 알려주세요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '절차',
        title: '조건에 해당하면 어떤 서류를 준비해야 할지 궁금하실 텐데요',
        desc: '청구 기한과 필요 서류를 정리했어요.',
        icon: 'check',
      },
    },

    {
      id: 's3',
      number: 'SECTION 03',
      heading: '실업급여 상병급여 신청 절차와 서류는 무엇인가요?',
      subtitle: '취업 불능 사유 소멸 후 14일 이내에 청구해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            상병급여는 아플 때 바로 신청하는 게 아니에요. 치료가 끝나거나 취업이 가능한 상태가 된 뒤에 청구하는 구조예요. 기한을 놓치면 지급받지 못할 수 있으니 아래 절차를 꼭 확인하세요.
          </p>

          <SpokeTable
            id="tbl-docs"
            title="상병급여 청구 시 필요 서류"
            subtitle="고용보험법 시행규칙 기준"
            headers={['구분', '필요 서류', '비고']}
            rows={[
              ['질병·부상', '상병급여 청구서 + 의사 증명서', '질병명·초진일·완치일 기재'],
              ['출산', '상병급여(출산시) 청구서 + 출산 증명서', '별도 서식 사용'],
              ['공통', '신분증 + 수급자격증', '대리인 제출 가능'],
            ]}
            highlightCol={1}
          />

          <SpokeFlow
            steps={[
              { icon: '🏥', label: '질병·부상 발생', sub: '고용센터 사전 연락' },
              { icon: '📋', label: '의사 증명서 발급', sub: '7일 이상 취업 불능' },
              { icon: '💊', label: '치료·회복', sub: '취업 가능 상태 복귀' },
              { icon: '📨', label: '14일 이내 청구', sub: '고용센터 서류 제출' },
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
              ['천재지변 등 부득이한 사유', '사유 소멸 후 7일 이내'],
            ]}
          />

          <TipBox title="서류를 직접 제출하기 어렵다면?">
            대리인을 통해서도 상병급여를 청구할 수 있어요. 가족이나 지인이 대신 고용센터에 방문해서 서류를 제출하면 돼요. 위임장은 별도로 필요하지 않아요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '금액',
        title: '상병급여로 전환하면 금액이 줄어드는지 걱정되시죠?',
        desc: '구직급여일액과 동일한 금액을 받아요.',
        icon: 'calc',
      },
    },

    {
      id: 's4',
      number: 'SECTION 04',
      heading: '실업급여 상병급여 금액과 지급기간 한도는 얼마인가요?',
      subtitle: '구직급여일액과 동일하고, 잔여일수 범위에서 지급돼요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            아프다고 급여가 깎이면 억울하잖아요. 다행히 상병급여는 <strong>구직급여일액과 동일한 금액</strong>을 지급해요. 2026년 기준 구직급여 상한액은 일 68,100원이고, 하한액은 일 66,048원이에요. 상병급여도 이 범위 안에서 기존에 받던 구직급여일액 그대로 나와요.
          </p>

          <SpokeChecklist
            items={[
              { text: '상병급여일액 = 구직급여일액 (동일)', done: true, note: '아프다고 금액이 줄지 않아요' },
              { text: '2026년 상한액: 일 68,100원 (월 약 204만원)', done: true, note: '전 직장 급여의 60% 기준' },
              { text: '2026년 하한액: 일 66,048원 (월 약 198만원)', done: true, note: '최저임금 80% x 8시간 기준' },
              { text: '지급 범위: 소정급여일수 - 이미 받은 구직급여 일수', done: true, note: '상병급여 일수도 소정급여일수에서 차감돼요' },
            ]}
          />

          <SpokeTimeline
            events={[
              { month: '수급 시작', title: '구직급여 수급 개시', desc: '소정급여일수 150일 기준', status: 'normal' as const },
              { month: '50일째', title: '질병·부상 발생', desc: '구직급여 50일 수급 완료 → 잔여 100일', status: 'warning' as const },
              { month: '치료 중', title: '상병급여 전환', desc: '잔여 100일 범위에서 상병급여 지급', status: 'current' as const },
              { month: '회복 후', title: '구직급여 복귀', desc: '남은 일수만큼 다시 구직급여 수급', status: 'normal' as const },
            ]}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            출산의 경우는 조금 달라요. 출산일로부터 <strong>45일간</strong> 상병급여가 지급돼요. 다만 출산 상병급여도 소정급여일수 범위를 넘길 수 없어요. 출산 45일이 끝난 뒤 <a href="/w/실업급여-수급중-알바-취업-신고-기준" className="text-[#4A7AB5] underline">취업 가능 상태</a>가 되면 남은 일수만큼 구직급여를 다시 받을 수 있어요.
          </p>

          <Chips
            items={[
              { icon: '💰', label: '상한액', value: '일 68,100원' },
              { icon: '📉', label: '하한액', value: '일 66,048원' },
              { icon: '📅', label: '출산 지급', value: '45일' },
              { icon: '🔄', label: '금액 변동', value: '없음 (동일)' },
            ]}
          />

          <TipBox title="가족 간병으로 구직활동이 어렵다면?">
            동거 친족(배우자, 8촌 이내 혈족, 4촌 이내 인척)의 질병·부상을 간호해야 하는 경우, 상병급여 대상은 아니지만 <a href="/w/실업급여-실업인정-구직활동-방법" className="text-[#4A7AB5] underline">실업인정 기준기간을 연장</a>받을 수 있어요. 고용센터에 사유를 미리 알리는 게 중요해요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '/w/실업급여-수급중-취업-알바-상병급여-보호',
        badge: '가이드',
        title: '실업급여 수급 중 다른 상황도 궁금하신가요?',
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
    { question: '실업급여 상병급여를 받으면 구직급여 일수가 줄어드나요?', answer: '<strong>네.</strong> 상병급여는 구직급여를 대신하는 급여이기 때문에 소정급여일수에서 차감돼요. 상병급여를 20일 받으면 남은 구직급여 일수가 20일 줄어요.' },
    { question: '실업급여 상병급여 실업 신고 전에 아프면 받을 수 있나요?', answer: '<strong>아니요.</strong> 상병급여는 반드시 실업 신고(수급자격 인정)를 한 이후에 발생한 질병·부상만 대상이에요. 퇴직 전이나 실업 신고 전 질병은 해당되지 않아요.' },
    { question: '실업급여 상병급여와 산재보험 휴업급여를 동시에 받을 수 있나요?', answer: '<strong>아니요.</strong> 산재보험 휴업급여, 근로기준법 휴업보상, 국가배상법 휴업배상 등을 받는 경우에는 상병급여가 지급되지 않아요. 중복 수급은 불가해요.' },
    { question: '실업급여 상병급여 감기나 가벼운 질병으로도 신청할 수 있나요?', answer: '<strong>7일 이상</strong> 취업이 불가능해야 해요. 감기로 하루이틀 쉬는 정도는 해당되지 않아요. 의사가 7일 이상 취업 불능으로 판단한 증명서가 있어야 신청할 수 있어요.' },
    { question: '실업급여 상병급여 청구 기한을 놓치면 어떻게 되나요?', answer: '취업 불능 사유 소멸 후 <strong>14일 이내</strong>에 청구해야 해요. 기한을 넘기면 지급받지 못할 수 있으니 치료가 끝나는 즉시 고용센터에 서류를 제출하는 게 안전해요.' },
  ],

  relatedSpokes: [
    { badge: '알바', title: '실업급여 수급 중 알바 취업 신고 기준', desc: '월 60시간 미만 알바와 소득 신고 방법', href: '/w/실업급여-수급중-알바-취업-신고-기준' },
    { badge: '중단', title: '실업급여 중단 거부 수급정지 사유 대처법', desc: '수급정지 6가지 사유와 재개 방법', href: '/w/실업급여-중단-거부-수급정지-사유-대처' },
    { badge: '창업', title: '실업급여 수급 중 창업 자격 유지 조건', desc: '사업자등록 시점별 수급 영향과 전환', href: '/w/실업급여-수급중-창업-자격-유지-조건' },
    { badge: '재신청', title: '실업급여 재신청 재취업 재퇴직 수급 조건', desc: '잔여일수와 피보험기간 리셋 기준', href: '/w/실업급여-재신청-재취업-재퇴직-수급-조건' },
    { badge: '보호', title: '실업급여 압류 금지 수급권 보호 계좌', desc: '전용계좌 개설과 압류 방지 방법', href: '/w/실업급여-압류금지-수급권-보호-계좌' },
  ],

  sources: [
    { name: '고용보험법 제63조 (상병급여)', url: 'https://www.law.go.kr/법령/고용보험법', org: '법제처' },
    { name: '찾기쉬운 생활법령정보 상병급여', url: 'https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=722&ccfNo=2&cciNo=5&cnpClsNo=1', org: '법제처' },
    { name: '고용보험 실업급여 안내', url: 'https://www.ei.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePb0201Info.do', org: '고용보험' },
    { name: '고용노동부 실업급여 안내', url: 'https://www.moel.go.kr', org: '고용노동부' },
  ],
}

export default data
