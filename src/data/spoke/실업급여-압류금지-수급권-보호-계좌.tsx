import type { SpokeData } from '@/data/spoke/types'
import {
  SpokeTable, TipBox, FormulaBox, WarnBox,
  Chips, SpokeLinks, Steps,
  SpokeTimeline, SpokeCompareCards, SpokeRateBars,
  SpokeFlow, SpokeChecklist, SpokeWarnBox,
} from '@/components/spoke/SpokeBlocks'
import 수급권보호Checker from '@/components/checkers/수급권보호Checker'

const data: SpokeData = {
  slug: '실업급여-압류금지-수급권-보호-계좌',

  meta: {
    title: '실업급여 압류 금지 수급권 보호 | 전용계좌 개설 양도 담보 규정',
    description: '실업급여는 전액 압류가 금지돼요. 수급권 보호 범위와 전용계좌 개설법, 양도 담보 금지 규정과 체납 압류 시 구제 방법을 정리했어요.',
    keywords: [
      '실업급여 압류 금지 범위 보호 제도',
      '실업급여 전용계좌 개설 압류방지 방법',
      '실업급여 양도 담보 금지 법적 근거',
      '실업급여 체납 압류 시 구제 방법',
    ],
    ogTitle: '실업급여 압류 금지와 수급권 보호 전용계좌 개설 | 머니위키',
    ogDescription: '실업급여 전액 압류 금지, 전용계좌 개설과 구제 방법을 확인하세요.',
  },

  hub: {
    url: '/w/실업급여-수급중-취업-알바-상병급여-보호',
    name: '실업급여 수급 중 취업·알바·상병급여·수급권 보호',
  },

  breadcrumb: ['고용·노동', '실업급여', '압류 금지·수급권 보호'],

  summary3: [
    <>실업급여 수급권은 <strong>양도·압류·담보 제공이 전면 금지</strong>돼요 (고용보험법 제38조)</>,
    <>실업급여수급계좌에 입금된 금액은 <strong>전액 압류 불가</strong>해요 (시행령 제58조의3)</>,
    <>실업급여로 지급된 금품에는 <strong>국가·지자체 공과금도 부과되지 않아요</strong> (제38조의2)</>,
  ],

  sourceBar: {
    badge: '출처',
    name: '고용보험법 제38조·제38조의2',
    date: '2026.02',
  },

  prevNext: {
    prev: { title: '해외체류·해외취업 수급정지 규정', href: '/w/실업급여-해외체류-해외취업-수급정지-규정' },
    next: { title: '미지급 대리신청·상속·수급순위', href: '/w/실업급여-미지급-대리신청-상속-수급순위' },
  },

  stickyBar: {
    topLabel: '실업급여 압류 금지',
    value: '전액 보호',
    buttonText: '보호 범위 확인 →',
    scrollTo: '#s1',
  },

  hero: {
    badge: '수급권 보호',
    h1: (
      <>
        실업급여 <span className="text-[#1E3A5F]">압류 금지</span>와 수급권 보호 전용계좌 개설
      </>
    ),
    intro: (
      <p className="text-base text-neutral-500 leading-relaxed">
        빚 때문에 실업급여까지 압류될까 봐 걱정하고 계셨다면 잘 오셨어요. 실업급여는 고용보험법 제38조에 따라 <strong>전액 압류가 금지</strong>돼서, 채권자가 손댈 수 없어요. 수급계좌에 입금된 금액도 1원까지 보호받을 수 있고, 공과금도 부과되지 않아요. 바로 아래 체커에서 내 수급권 보호 상태부터 확인해 볼게요.
      </p>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '실업급여 수급 중 취업·알바·상병급여·수급권 보호 총정리',
    },
  },

  toc: [
    { id: 'checker', label: '내 실업급여가 안전한지 확인하기' },
    { id: 's1', label: '실업급여 압류 금지 범위와 보호 제도는 무엇인가요?' },
    { id: 's2', label: '실업급여 전용계좌 개설로 압류를 방지할 수 있나요?' },
    { id: 's3', label: '실업급여 양도와 담보 금지의 법적 근거는 무엇인가요?' },
    { id: 's4', label: '실업급여가 체납 압류됐을 때 구제 방법이 있나요?' },
    { id: 's-faq', label: '자주 묻는 질문' },
  ],

  sections: [
    {
      id: 'checker',
      number: 'CHECK',
      heading: '내 실업급여가 안전하게 보호되고 있나요?',
      subtitle: '3가지만 선택하면 보호 상태를 확인할 수 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            실업급여 수급권은 <strong>전액 압류 금지</strong>가 원칙이에요. 하지만 계좌 종류에 따라 실제 보호 범위가 달라질 수 있어요. 아래에서 지금 내 상황을 확인해 보세요.
          </p>
          <수급권보호Checker />
        </>
      ),
      bridgeCTA: {
        href: '#s1',
        badge: '보호',
        title: '수급권 보호가 3단계로 나뉜다는 거 아시나요?',
        desc: '수급권·수급계좌·지급 금품까지 어디까지 보호되는지 정리했어요.',
        icon: 'info',
      },
    },

    {
      id: 's1',
      number: 'SECTION 01',
      heading: '실업급여 압류 금지 범위와 보호 제도는 무엇인가요?',
      subtitle: '수급권 자체 + 수급계좌 입금액 + 지급 금품까지 전부 보호돼요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            실업급여를 받을 권리, 즉 <strong>수급권</strong> 자체가 압류 대상에서 빠져요. 채권자가 법원에 압류 신청을 해도 실업급여에는 손을 댈 수 없어요. 이 보호는 구직급여뿐 아니라 <a href="/w/조기재취업수당-신청-조건-금액-잔여일수-계산" className="text-[#4A7AB5] underline">조기재취업수당</a>, <a href="/w/실업급여-연장급여-훈련연장-개별연장-특별연장-2026" className="text-[#4A7AB5] underline">연장급여</a>, <a href="/w/실업급여-상병급여-질병-부상-수급-전환" className="text-[#4A7AB5] underline">상병급여</a>까지 모든 실업급여에 적용돼요.
          </p>

          <SpokeTimeline
            events={[
              { month: '1단계', title: '수급권 보호', desc: '양도·압류·담보 전면 금지 (고용보험법 제38조 제1항)', status: 'current' },
              { month: '2단계', title: '수급계좌 보호', desc: '전용계좌 입금액 전액 압류 불가 (제38조 제2항, 시행령 제58조의3)', status: 'current' },
              { month: '3단계', title: '지급 금품 보호', desc: '소득세·건강보험료 등 공과금 부과 금지 (제38조의2)', status: 'current' },
            ]}
          />

          <SpokeCompareCards
            cards={[
              {
                title: '일반 급여(월급) 압류',
                subtitle: '민사집행법 제246조 기준',
                items: [
                  '1/2 초과분 압류 가능',
                  '최저 보호 금액 월 185만원 (2026년)',
                  '소득세·4대보험 부과',
                  '양도·담보 일부 가능',
                ],
              },
              {
                title: '실업급여 압류',
                subtitle: '고용보험법 제38조 기준',
                items: [
                  '전액 압류 금지',
                  '수급계좌 입금액 전부 보호',
                  '공과금 부과 금지',
                  '양도·담보 전면 금지',
                ],
                recommended: true,
                recLabel: '전액 보호',
              },
            ]}
          />

          <TipBox title="일반 통장에 실업급여가 입금되면?">
            일반 통장에 들어간 실업급여는 다른 예금과 섞여서 구분이 어려워요. 이 경우 채권자가 통장 잔액 전체를 압류할 수 있어요. 빚이 있다면 반드시 <strong>실업급여 전용계좌</strong>로 받아야 전액 보호돼요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '계좌',
        title: '전용계좌만 개설하면 100% 안전한 거죠?',
        desc: '수급계좌 개설 절차와 은행별 차이점을 바로 확인할 수 있어요.',
        icon: 'check',
      },
    },

    {
      id: 's2',
      number: 'SECTION 02',
      heading: '실업급여 전용계좌 개설로 압류를 방지할 수 있나요?',
      subtitle: '수급자격증 지참 후 은행 방문이면 끝이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            실업급여 전용계좌는 정확히는 <strong>실업급여수급계좌</strong>라고 불러요. 고용보험법 제37조의2에 근거해서 만들어진 제도로, 이 계좌에 입금된 실업급여는 전액 압류가 불가능해요. 빚이 있는 분이라면 반드시 개설해야 하고, 일반 통장으로 받으면 보호받을 수 없어요.
          </p>

          <FormulaBox
            lines={[
              { text: '전용계좌 보호 원리', comment: true },
              { text: '실업급여수급계좌 입금액 = 전액 압류 금지' },
              { text: '일반 통장 입금 시 = 다른 예금과 혼합 → 구분 불가 → 압류 가능' },
            ]}
          />

          <Steps
            items={[
              { title: '고용센터에서 수급자격 인정받기', desc: '퇴직 후 고용센터 방문 → 구직등록 + 수급자격 인정 신청 → 수급자격증 발급' },
              { title: '시중 은행 방문하여 전용계좌 개설', desc: '수급자격증 + 신분증 지참 후 국민·신한·우리·하나·농협 등 1금융권에서 개설 가능' },
              { title: '고용센터에 수급계좌 등록', desc: '개설한 계좌번호를 고용센터에 등록하면 다음 지급일부터 전용계좌로 입금돼요' },
            ]}
          />

          <SpokeRateBars
            bars={[
              { label: '전용계좌', rate: '100% 보호', width: '100%' },
              { label: '일반통장', rate: '0% 보호', width: '5%' },
              { label: '인출 후', rate: '0% 보호', width: '5%' },
            ]}
          />

          <SpokeWarnBox title="온라인 개설은 불가해요">
            실업급여수급계좌는 <strong>반드시 은행 창구를 방문</strong>해서 개설해야 해요. 인터넷뱅킹이나 모바일앱으로는 개설할 수 없어요. 수급자격증과 주민등록증(또는 운전면허증)을 꼭 챙기세요.
          </SpokeWarnBox>

          <TipBox title="이미 일반 통장으로 받고 있다면?">
            수급 중간에도 전용계좌로 변경할 수 있어요. <a href="/w/실업급여-고용센터-찾기-고용24-사용법" className="text-[#4A7AB5] underline">고용24</a>나 고용센터 전화로 계좌 변경을 요청하면 돼요. 변경 후 다음 지급일부터 적용돼요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '법률',
        title: '돈이 급하면 수급권을 담보로 빌릴 수도 있을까요?',
        desc: '양도·담보 금지 규정과 위반 시 어떻게 되는지 확인하세요.',
        icon: 'info',
      },
    },

    {
      id: 's3',
      number: 'SECTION 03',
      heading: '실업급여 양도와 담보 금지의 법적 근거는 무엇인가요?',
      subtitle: '고용보험법 제38조 제1항으로 3가지 행위가 전면 금지돼요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            실업급여 수급권을 다른 사람에게 넘기거나 대출 담보로 잡는 행위는 <strong>고용보험법 제38조 제1항</strong>에서 법적으로 금지해요. 당사자끼리 합의해도 그 약속 자체가 효력이 없고, 금융기관에서 요구하더라도 응할 수 없어요. 이건 수급자를 보호하기 위한 강제 규정이에요.
          </p>

          <SpokeTable
            id="tbl-prohibit"
            title="실업급여 수급권 3가지 금지 행위"
            subtitle="고용보험법 제38조 제1항 기준"
            headers={['금지 행위', '의미', '위반 시']}
            rows={[
              ['양도 금지', '수급권을 다른 사람에게 넘길 수 없어요', '합의해도 법적 무효'],
              ['압류 금지', '채권자가 강제집행해도 압류 불가', '법원에서 기각'],
              ['담보 금지', '대출 담보로 수급권을 잡을 수 없어요', '금융기관도 요구 불가'],
            ]}
            highlightCol={2}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            보호 대상이 되는 실업급여는 구직급여만이 아니에요. 상병급여, 조기재취업수당, 연장급여, 광역구직활동비, 이주비까지 <strong>고용보험법상 모든 실업급여</strong>가 동일하게 보호돼요.
          </p>

          <WarnBox>
            수급계좌에 있는 동안은 전액 보호되지만, <strong>인출하거나 다른 계좌로 이체한 금액</strong>은 더 이상 압류 금지 대상이 아니에요. 필요한 만큼만 인출하는 게 안전해요.
          </WarnBox>

          <p className="text-neutral-600 mb-4 leading-relaxed">
            다만 <a href="/w/실업급여-부정수급-유형-제재-벌금-추징" className="text-[#4A7AB5] underline">부정수급</a>으로 받은 실업급여는 보호 대상이 아니에요. 거짓이나 부정한 방법으로 받은 급여는 환수 대상이고, <strong>3년 이하 징역 또는 3,000만원 이하 벌금</strong>에 처해질 수 있어요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '구제',
        title: '일반 통장에서 이미 압류당했는데 되돌릴 방법이 있을까요?',
        desc: '압류해제 신청 절차와 필요 서류를 바로 확인할 수 있어요.',
        icon: 'calc',
      },
    },

    {
      id: 's4',
      number: 'SECTION 04',
      heading: '실업급여가 체납 압류됐을 때 구제 방법이 있나요?',
      subtitle: '압류해제 신청으로 돌려받을 수 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            일반 통장에 실업급여가 입금됐는데 압류가 걸렸다면 포기할 필요 없어요. <strong>압류해제 신청</strong>을 하면 실업급여 해당 금액만 풀 수 있어요. 핵심은 그 금액이 실업급여라는걸 증명하는 건데, 고용센터 발급 서류로 가능해요.
          </p>

          <SpokeChecklist
            items={[
              { text: '고용센터에서 수급사실확인서 발급받기', done: false, note: '실업급여 입금 내역이 기재된 공식 문서' },
              { text: '입금 내역서 준비 (실업급여 입금일·금액 확인)', done: false, note: '은행에서 거래내역증명서 발급' },
              { text: '압류해제 신청서 작성', done: false, note: '법원 또는 채권자에게 제출' },
              { text: '법원에 압류범위 감축 신청', done: false, note: '민사집행법 제246조 제1항 제8호 근거' },
              { text: '향후 전용 수급계좌로 변경 등록', done: false, note: '같은 상황 방지를 위해 반드시 변경' },
            ]}
          />

          <TipBox title="국세·지방세 체납으로 압류된 경우는?">
            국세징수법에 따른 체납 압류도 실업급여수급계좌는 제외돼요. 세무서에 수급사실확인서를 제출하면 <strong>실업급여 해당 금액은 압류에서 해제</strong>할 수 있어요. 처리가 안 되면 <a href="/w/실업급여-이의신청-심사청구-재심사-불복-절차" className="text-[#4A7AB5] underline">이의신청</a>을 하세요.
          </TipBox>

          <SpokeFlow
            steps={[
              { icon: '📄', label: '수급사실확인서', sub: '고용센터 발급' },
              { icon: '🏦', label: '거래내역증명서', sub: '은행 발급' },
              { icon: '📝', label: '압류해제 신청', sub: '법원 제출' },
              { icon: '🛡️', label: '실업급여 보호', sub: '해제 완료' },
            ]}
          />

          <Chips
            items={[
              { icon: '🛡️', label: '구직급여', value: '전액 보호' },
              { icon: '🛡️', label: '상병급여', value: '전액 보호' },
              { icon: '🛡️', label: '조기재취업수당', value: '전액 보호' },
              { icon: '🛡️', label: '연장급여', value: '전액 보호' },
            ]}
          />
        </>
      ),
      bridgeCTA: {
        href: '/w/실업급여-수급중-취업-알바-상병급여-보호',
        badge: '허브',
        title: '실업급여 수급 중 다른 궁금한 점이 있다면?',
        desc: '취업·알바·상병급여·수급권 보호를 한눈에 정리했어요.',
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
    { question: '실업급여를 일반 통장으로 받으면 압류될 수 있나요?', answer: '<strong>네.</strong> 일반 통장에 입금된 실업급여는 다른 예금과 섞여 구분이 어렵기 때문에, 채권자가 통장 전체를 압류할 수 있어요. 전용 수급계좌를 개설하면 입금 전액이 보호돼요.' },
    { question: '실업급여 전용계좌에서 돈을 인출하면 보호가 풀리나요?', answer: '<strong>네.</strong> 수급계좌에 있는 동안은 전액 보호되지만, 인출하거나 다른 계좌로 이체하면 더 이상 압류 금지 대상이 아니에요. 필요한 만큼만 인출하는 게 안전해요.' },
    { question: '세금이나 건강보험료도 실업급여에서 떼이나요?', answer: '실업급여로 지급된 금품에는 <strong>공과금이 부과되지 않아요</strong> (고용보험법 제38조의2). 소득세도 비과세이고, 건강보험·국민연금 보험료 산정 시에도 실업급여 금액은 제외돼요.' },
    { question: '실업급여수급계좌는 어느 은행에서 개설하나요?', answer: '국민, 신한, 우리, 하나, 농협 등 <strong>시중 1금융권</strong>에서 개설할 수 있어요. 수급자격증과 신분증을 들고 가면 되고, 온라인 개설은 불가해요.' },
    { question: '빚이 있어도 실업급여를 신청할 수 있나요?', answer: '<strong>당연하죠.</strong> 채무 여부와 실업급여 수급 자격은 전혀 관련이 없어요. 오히려 빚이 있다면 수급계좌를 꼭 개설해서 압류로부터 보호받는 게 중요해요.' },
  ],

  relatedSpokes: [
    { badge: '상병', title: '실업급여 상병급여 전환 조건과 신청 방법', desc: '질병·부상 시 구직급여 대신 상병급여 전환', href: '/w/실업급여-상병급여-질병-부상-수급-전환' },
    { badge: '미지급', title: '실업급여 미지급 대리신청과 상속 수급순위', desc: '수급자 사망 시 미지급 청구 방법', href: '/w/실업급여-미지급-대리신청-상속-수급순위' },
    { badge: '세금', title: '실업급여 세금·건강보험·국민연금 처리', desc: '수급 중 4대보험과 세금 처리 방법', href: '/w/실업급여-세금-건강보험-국민연금-처리' },
    { badge: '중단', title: '실업급여 중단·수급정지 사유와 대처법', desc: '수급정지 6가지 사유와 재개 방법', href: '/w/실업급여-중단-거부-수급정지-사유-대처' },
    { badge: '부정수급', title: '실업급여 부정수급 유형과 제재 벌금', desc: '부정수급 적발 시 환수·추가징수 기준', href: '/w/실업급여-부정수급-유형-제재-벌금-추징' },
  ],

  sources: [
    { name: '고용보험법 제38조·제38조의2', url: 'https://www.law.go.kr/법령/고용보험법', org: '법제처' },
    { name: '실업급여 수급권 보호 안내', url: 'https://www.easylaw.go.kr/CSP/CnpClsMain.laf?csmSeq=722&ccfNo=1&cciNo=1&cnpClsNo=1', org: '찾기쉬운 생활법령정보' },
    { name: '고용보험 실업급여 안내', url: 'https://www.ei.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePb0201Info.do', org: '고용보험' },
  ],
}

export default data
