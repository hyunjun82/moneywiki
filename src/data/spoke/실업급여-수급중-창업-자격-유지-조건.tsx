import type { SpokeData } from '@/data/spoke/types'
import {
  SpokeTable, TipBox, FormulaBox, WarnBox,
  Chips, SpokeLinks, Steps,
  SpokeFlow, SpokeChecklist, SpokeCompareCards,
  SpokeRateBars, SpokeStepCards,
} from '@/components/spoke/SpokeBlocks'
import 창업수급Checker from '@/components/checkers/창업수급Checker'

const data: SpokeData = {
  slug: '실업급여-수급중-창업-자격-유지-조건',

  meta: {
    title: '실업급여 수급 중 창업 준비, 자격 유지 | 사업자등록 조기재취업수당',
    description: '실업급여 받으면서 창업 준비해도 되는지, 사업자등록 시점별 수급 영향과 조기재취업수당 전환 조건을 정리했어요.',
    keywords: [
      '실업급여 수급 중 창업 준비 가능 여부',
      '실업급여 창업 사업자등록 시점별 영향',
      '실업급여 창업 조기재취업수당 전환 조건',
      '실업급여 수급 중 프리랜서 활동 기준',
    ],
    ogTitle: '실업급여 수급 중 창업 가능 여부와 조기재취업수당 | 머니위키',
    ogDescription: '사업자등록 시점별 수급 영향, 조기재취업수당 전환 조건을 확인하세요.',
  },

  hub: {
    url: '/w/실업급여-수급중-취업-알바-상병급여-보호',
    name: '실업급여 수급 중 취업·알바·상병급여·수급권 보호',
  },

  breadcrumb: ['고용·노동', '실업급여 수급 중 관리', '창업과 자격 유지'],

  summary3: [
    <>실업급여 수급 중 <strong>사업자등록</strong>을 하면 취업으로 간주돼 구직급여가 중단돼요</>,
    <>창업 <strong>준비 단계</strong>에서는 고용센터에 신고하면 실업인정을 유지할 수 있어요</>,
    <>소정급여일수 <strong>1/2 이상</strong> 남기고 창업하면 조기재취업수당을 받을 수 있어요</>,
  ],

  sourceBar: {
    badge: '출처',
    name: '고용보험법 + 고용노동부 실업급여 안내',
    date: '2026.02',
  },

  prevNext: {
    prev: { title: '실업급여 상병급여 질병 부상 수급 전환', href: '/w/실업급여-상병급여-질병-부상-수급-전환' },
    next: { title: '실업급여 해외체류 해외취업 수급정지 규정', href: '/w/실업급여-해외체류-해외취업-수급정지-규정' },
  },

  stickyBar: {
    topLabel: '창업 시 수급 변화',
    value: '사업자등록 = 수급 중단',
    buttonText: '조기재취업수당 확인 →',
    scrollTo: '#s3',
  },

  hero: {
    badge: '2026년 기준',
    h1: (
      <>
        실업급여 수급 중 <span className="text-[#1E3A5F]">창업</span> 자격 유지와 조기재취업수당
      </>
    ),
    intro: (
      <p className="text-base text-neutral-500 leading-relaxed">
        실업급여를 받으면서 창업을 준비하고 싶었다면 잘 오셨어요. 사업자등록을 언제 하느냐에 따라 수급이 유지될 수도 있고, 바로 끊길 수도 있어요. <a href="/w/실업급여-수급중-취업-알바-상병급여-보호" className="text-[#4A7AB5] underline">수급 중 관리 가이드</a>에서 전체 규정을 확인할 수 있고요. 먼저 창업 준비와 수급 자격의 관계부터 살펴볼게요.
      </p>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '실업급여 수급 중 취업·알바·상병급여·수급권 보호 총정리',
    },
  },

  toc: [
    { id: 'checker', label: '창업 시 실업급여 수급 유지 체크' },
    { id: 's1', label: '실업급여 수급 중 창업 준비를 해도 되나요?' },
    { id: 's2', label: '실업급여 수급 중 사업자등록하면 어떤 영향이 있나요?' },
    { id: 's3', label: '실업급여 창업 시 조기재취업수당으로 전환 가능한가요?' },
    { id: 's4', label: '실업급여 수급 중 프리랜서 활동은 가능한가요?' },
    { id: 's-faq', label: '자주 묻는 질문' },
  ],

  sections: [
    {
      id: 'checker',
      number: 'CHECK',
      heading: '창업하면 실업급여를 계속 받을 수 있을까?',
      subtitle: '3가지만 선택하면 수급 유지 여부를 확인할 수 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            창업 단계와 근로시간에 따라 실업급여 수급 여부가 완전히 달라져요. 아래에서 내 상황에 맞는 결과를 확인해 보세요.
          </p>
          <창업수급Checker />
        </>
      ),
    },

    {
      id: 's1',
      number: 'SECTION 01',
      heading: '실업급여 수급 중 창업 준비를 해도 되나요?',
      subtitle: '사업자등록 전이라면 수급을 유지할 수 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            결론부터 말하면, 사업자등록만 하지 않으면 창업 준비를 하면서도 실업급여를 계속 받을 수 있어요. 시장조사, 사업계획서 작성, 창업 교육 수강 같은 활동은 재취업활동으로 인정받을 수 있거든요. 핵심은 고용센터에 미리 알리느냐 아니냐예요. 신고하지 않으면 부정수급 위험이 있어서 주의가 필요하죠.
          </p>

          <Steps
            items={[
              { title: '고용센터에 창업 의향 신고', desc: '실업인정일에 담당 상담사에게 창업 준비 중임을 알려요' },
              { title: '자영업활동계획서 제출', desc: '업종, 예상 위치, 자금 계획 등을 기재한 서류를 제출해요' },
              { title: '창업 준비 활동 보고', desc: '시장조사, 창업 교육, 사업계획서 작성 등을 실업인정일에 보고해요' },
              { title: '구직활동 병행 유지', desc: '창업 준비와 함께 구직활동도 계속해야 실업인정이 유지돼요' },
            ]}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            고용센터에서 승인한 <a href="/w/실업급여-실업인정-구직활동-방법" className="text-[#4A7AB5] underline">창업 교육이나 직업훈련</a> 수강은 구직활동으로 인정돼요. 다만 단순히 점포를 반복적으로 둘러보기만 하면 증빙이 안 돼요. 교육 수료증이나 사업계획서 같은 구체적인 근거가 있어야 해요. 이런 증빙을 철저히 준비하면 창업 준비 기간에도 수급을 유지할 수 있죠.
          </p>

          <SpokeTable
            id="tbl-activity"
            title="창업 준비 활동별 실업인정 인정 여부"
            subtitle="고용노동부 실업인정 기준"
            headers={['활동 유형', '인정 여부', '비고']}
            rows={[
              ['창업 교육 수강', '인정', '고용센터 승인 교육 우선'],
              ['사업계획서 작성', '인정', '계획서 사본 제출'],
              ['시장조사·상권 분석', '인정', '조사 보고서 제출 시'],
              ['점포 반복 물색만', '불인정', '구체적 증빙 없으면 불가'],
              ['사업자등록 완료', '중단', '등록 시점부터 수급 중단'],
            ]}
            highlightCol={1}
          />

          <TipBox title="이미 사업자등록이 있는 상태에서 퇴직했다면?">
            수급자격 신청일부터 7일 이내에 휴업사실증명원이나 폐업사실증명원을 제출하면 실업급여를 받을 수 있어요. 기존 사업자가 사실상 폐업 상태라면 이 방법을 쓰면 돼요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '등록',
        title: '사업자등록을 하면 수급이 바로 중단되는 건가요?',
        desc: '등록 시점에 따라 결과가 완전히 달라져요.',
        icon: 'info',
      },
    },

    {
      id: 's2',
      number: 'SECTION 02',
      heading: '실업급여 수급 중 사업자등록하면 어떤 영향이 있나요?',
      subtitle: '등록 시점에 따라 수급과 수당이 달라져요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            사업자등록을 하면 고용보험법상 <strong>취업한 것으로 간주</strong>돼요. 실제 매출이 0원이어도 등록 자체가 기준이에요. 그래서 같은 창업이라도 사업자등록 시점에 따라 받을 수 있는 금액이 크게 달라져요. 절반 이전에 등록하면 조기재취업수당을 받을 수 있는데, 절반 이후면 수당 기회 자체가 사라지죠.
          </p>

          <SpokeRateBars
            bars={[
              { label: '준비 단계', rate: '수급 유지', width: '100%' },
              { label: '절반 전 등록', rate: '수당 전환 가능', width: '75%' },
              { label: '절반 후 등록', rate: '수당 불가', width: '40%' },
              { label: '수급 전 등록', rate: '수급 불가', width: '10%' },
            ]}
          />

          <SpokeTable
            id="tbl-timing"
            title="사업자등록 시점별 실업급여 영향 비교"
            subtitle="소정급여일수 180일, 구직급여일액 68,100원 기준 예시"
            headers={['등록 시점', '구직급여', '조기재취업수당', '총 수령액']}
            rows={[
              ['수급 전 (퇴직 직후)', '수급 불가', '해당 없음', '0원'],
              ['수급 30일 차', '중단 (30일분)', '가능 (약 511만원)', '약 715만원'],
              ['수급 60일 차', '중단 (60일분)', '가능 (약 409만원)', '약 817만원'],
              ['수급 91일 차 (절반 초과)', '중단 (91일분)', '불가', '약 620만원만'],
              ['수급 종료 후', '전액 수령', '해당 없음', '약 1,226만원'],
            ]}
            highlightCol={2}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            <a href="/w/실업급여-수급기간-소정급여일수-기준" className="text-[#4A7AB5] underline">소정급여일수</a>의 절반이 지나기 전에 등록하는 게 조기재취업수당을 받을 수 있는 마지막 기회예요. 절반을 넘기면 수당 자격 자체가 사라져요.
          </p>

          <SpokeCompareCards
            cards={[
              {
                title: '실업급여 끝까지 수급',
                subtitle: '창업 안 하고 구직활동 유지',
                items: [
                  '매 2~4주마다 실업인정 필요',
                  '소정급여일수 전부 수령 가능',
                  '수급기한 12개월 이내 제한',
                  '수급 종료 후 자유롭게 창업',
                ],
              },
              {
                title: '조기재취업수당 전환',
                subtitle: '절반 이상 남기고 사업자등록',
                items: [
                  '잔여 급여의 50% 일시 수령',
                  '12개월 이상 영업 증빙 필요',
                  '2년 내 재수급 제한',
                  '구직급여 + 수당 합산 수령',
                ],
                recommended: true,
                recLabel: '빠른 창업 시 유리',
              },
            ]}
          />

          <WarnBox>
            <strong>통신판매업·스마트스토어 주의:</strong> 통신판매업 등록도 사업자등록에 해당돼요. 쿠팡, 스마트스토어 판매를 시작하면 수급이 중단될 수 있으니 반드시 고용센터에 확인하세요.
          </WarnBox>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '수당',
        title: '조기재취업수당은 구체적으로 얼마를 받을 수 있나요?',
        desc: '잔여 급여일수별 예상 금액을 계산해서 보여드려요.',
        icon: 'calc',
      },
    },

    {
      id: 's3',
      number: 'SECTION 03',
      heading: '실업급여 창업 시 조기재취업수당으로 전환 가능한가요?',
      subtitle: '잔여 급여일수의 1/2을 일시금으로 받아요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            창업을 결심했다면 남은 실업급여를 그냥 포기하기보다 <strong>조기재취업수당</strong>으로 전환하는 게 유리해요. <a href="/w/조기재취업수당-신청-조건-금액-잔여일수-계산" className="text-[#4A7AB5] underline">조기재취업수당</a>은 소정급여일수의 절반 이상을 남긴 상태에서 사업을 시작하고 12개월 이상 영업을 계속하면 잔여 급여의 50%를 일시금으로 받을 수 있는 제도예요. 수급 중간에 창업하는 분들이라면 반드시 고려해야 할 옵션이죠.
          </p>

          <FormulaBox
            lines={[
              { text: '조기재취업수당 계산 공식', comment: true },
              { text: '조기재취업수당 = 구직급여일액 × 미지급일수 × 1/2' },
            ]}
          />

          <SpokeTable
            id="tbl-early"
            title="조기재취업수당 예상 금액 (창업 기준)"
            subtitle="2026년 구직급여 상한액 68,100원 기준 예시"
            headers={['소정급여일수', '사용 일수', '미지급일수', '수당 금액']}
            rows={[
              ['120일', '30일', '90일', '약 306만원'],
              ['150일', '40일', '110일', '약 375만원'],
              ['180일', '50일', '130일', '약 443만원'],
              ['210일', '60일', '150일', '약 511만원'],
              ['270일', '80일', '190일', '약 647만원'],
            ]}
            highlightCol={3}
          />

          <Steps
            items={[
              { title: '소정급여일수 절반 이전에 사업자등록', desc: '대기기간(7일) 경과 후에 등록해야 해요' },
              { title: '12개월 이상 사업 영위', desc: '매출이 없어도 사업을 계속 유지해야 해요 (65세 이상은 6개월)' },
              { title: '관할 고용센터에 수당 신청', desc: '창업일로부터 12개월 경과 후에 신청 가능해요' },
              { title: '영업 증빙 서류 제출', desc: '부가세 신고서, 사업자등록증 사본 등을 제출해요' },
            ]}
          />

          <TipBox title="월 소득 574만원 이상이면 지급 제외예요">
            조기재취업수당은 월 소득 574만원(2026년 기준) 이상인 경우 지급 대상에서 제외돼요. 또한 최근 2년 이내에 조기재취업수당을 받은 이력이 있으면 다시 받을 수 없어요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '프리랜서',
        title: '사업자등록 없이 프리랜서로 일하면 어떻게 되나요?',
        desc: '근로시간과 소득에 따른 수급 유지 기준을 정리했어요.',
        icon: 'info',
      },
    },

    {
      id: 's4',
      number: 'SECTION 04',
      heading: '실업급여 수급 중 프리랜서 활동은 가능한가요?',
      subtitle: '월 60시간 미만이면 수급을 유지할 수 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            사업자등록을 하지 않고 프리랜서로 일하는 경우에는 <strong>월 60시간 기준</strong>이 적용돼요. 월 60시간 미만이면서 3개월 미만 단기 계약이면 취업으로 간주되지 않아서 구직급여를 계속 받을 수 있어요. 다만 소득이 생기면 반드시 신고해야 해요. 미신고 시 부정수급으로 처벌받을 위험이 크거든요.
          </p>

          <SpokeFlow
            steps={[
              { icon: '💼', label: '프리랜서 계약', sub: '사업자등록 없음' },
              { icon: '⏰', label: '시간 확인', sub: '월 60시간 기준' },
              { icon: '📋', label: '소득 신고', sub: '고용센터 신고' },
              { icon: '💰', label: '감액 or 유지', sub: '소득에 따라 결정' },
            ]}
          />

          <SpokeChecklist
            items={[
              { text: '월 60시간 미만 + 3개월 미만 계약', done: true, note: '취업 아님 → 수급 유지 (소득 신고 필수)' },
              { text: '월 60시간 미만 + 3개월 이상 계약', done: false, note: '취업 간주 → 수급 중단' },
              { text: '월 60시간 이상 근로', done: false, note: '취업 간주 → 수급 중단' },
              { text: '사업자등록 후 프리랜서 활동', done: false, note: '시간과 관계없이 수급 중단' },
            ]}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            프리랜서 소득이 구직급여일액(2026년 상한 68,100원/일) 이상이면 해당일의 <a href="/w/실업급여-수급중-알바-취업-신고-기준" className="text-[#4A7AB5] underline">구직급여가 감액</a>돼요. 미신고 시에는 <a href="/w/실업급여-부정수급-유형-제재-벌금-추징" className="text-[#4A7AB5] underline">부정수급</a>으로 지급액의 최대 5배를 추징당할 수 있어요. 소득이 적어도 반드시 고용센터에 신고하는 습관을 들이는 게 중요해요.
          </p>

          <Chips
            items={[
              { icon: '⏰', label: '시간 기준', value: '월 60시간 미만' },
              { icon: '📅', label: '계약 기간', value: '3개월 미만' },
              { icon: '📋', label: '신고 의무', value: '소득 발생 시 필수' },
              { icon: '💰', label: '감액 기준', value: '일액 이상 시' },
            ]}
          />

          <WarnBox>
            <strong>배우자 명의 사업자 주의:</strong> 배우자 명의로 사업자등록을 하더라도 본인이 실질적으로 사업에 참여하면 부정수급으로 적발될 수 있어요. 고용센터에서 사실 조사를 진행해요.
          </WarnBox>

          <SpokeLinks
            title="창업과 실업급여 관련 글"
            items={[
              { num: '01', heading: '조기재취업수당 신청 조건과 금액 계산', desc: '잔여일수별 수당 금액 상세 계산', href: '/w/조기재취업수당-신청-조건-금액-잔여일수-계산' },
              { num: '02', heading: '실업급여 수급 중 알바 취업 신고 기준', desc: '월 60시간 미만 알바 시 감액 기준', href: '/w/실업급여-수급중-알바-취업-신고-기준' },
            ]}
          />
        </>
      ),
      bridgeCTA: {
        href: '/w/실업급여-수급중-취업-알바-상병급여-보호',
        badge: '가이드',
        title: '수급 중 취업·알바·상병급여 전체 규정이 궁금하다면?',
        desc: '실업급여 수급 중 관리 완전 가이드에서 모든 상황별 대처법을 확인하세요.',
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
    {
      question: '실업급여 받으면서 창업 교육을 수강해도 되나요?',
      answer: '<strong>네.</strong> 창업 교육 수강은 재취업활동으로 인정돼요. 고용센터에 사전 신고하고, 수료 후 증빙 서류를 실업인정일에 제출하면 돼요.',
    },
    {
      question: '배우자 명의로 사업자등록하면 실업급여를 계속 받을 수 있나요?',
      answer: '본인 명의가 아니면 형식적으로는 수급이 유지될 수 있지만, <strong>실질적으로 사업에 참여</strong>하고 있다면 부정수급으로 적발돼요. 고용센터에서 사실 조사를 해요.',
    },
    {
      question: '사업자등록 없이 프리랜서로 일하면 실업급여를 받을 수 있나요?',
      answer: '월 60시간 미만이고 3개월 미만 단기 계약이면 취업으로 간주되지 않아요. 다만 소득이 구직급여일액 이상이면 <strong>감액 지급</strong>될 수 있고, 반드시 고용센터에 신고해야 해요.',
    },
    {
      question: '조기재취업수당을 받으면 실업급여를 다시 신청할 수 없나요?',
      answer: '조기재취업수당 수급 후 <strong>2년 이내</strong>에는 다시 조기재취업수당을 받을 수 없어요. 다만 새 직장에서 180일 이상 피보험기간을 채우면 실업급여 자체는 <a href="/w/실업급여-재신청-재취업-재퇴직-수급-조건" className="text-[#4A7AB5] underline">재신청</a>이 가능해요.',
    },
  ],

  relatedSpokes: [
    { badge: '수당', title: '조기재취업수당 신청 조건과 금액 잔여일수 계산', desc: '취업·창업 시 잔여 급여 50% 일시금 수령', href: '/w/조기재취업수당-신청-조건-금액-잔여일수-계산' },
    { badge: '알바', title: '실업급여 수급 중 알바 취업 신고 기준 감액', desc: '월 60시간 미만 알바 허용 기준', href: '/w/실업급여-수급중-알바-취업-신고-기준' },
    { badge: '중단', title: '실업급여 중단 거부 수급정지 사유 대처법', desc: '수급정지 6가지 사유와 재개 방법', href: '/w/실업급여-중단-거부-수급정지-사유-대처' },
    { badge: '부정수급', title: '실업급여 부정수급 유형 제재 벌금 추징', desc: '미신고 시 최대 5배 추징 기준', href: '/w/실업급여-부정수급-유형-제재-벌금-추징' },
    { badge: '구직활동', title: '실업급여 실업인정 구직활동 방법', desc: '실업인정일 구직활동 인정 기준', href: '/w/실업급여-실업인정-구직활동-방법' },
  ],

  sources: [
    { name: '고용보험법', url: 'https://www.law.go.kr/법령/고용보험법', org: '법제처' },
    { name: '실업급여 안내', url: 'https://www.ei.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePb0201Info.do', org: '고용보험' },
    { name: '조기재취업수당 안내', url: 'https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=722&ccfNo=3&cciNo=1&cnpClsNo=1', org: '찾기쉬운 생활법령정보' },
    { name: '고용노동부', url: 'https://www.moel.go.kr', org: '고용노동부' },
  ],
}

export default data
