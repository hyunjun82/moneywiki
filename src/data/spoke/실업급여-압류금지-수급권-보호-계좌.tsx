import type { SpokeData } from '@/data/spoke/types'
import {
  SpokeTable, TipBox, FormulaBox, WarnBox,
  Chips, DetailBox, SpokeLinks, Steps,
  SpokeChecklist, SpokeFlow,
} from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '실업급여-압류금지-수급권-보호-계좌',

  meta: {
    title: '실업급여 압류 금지 수급권 보호 | 전용계좌 개설 방법',
    description: '실업급여는 전액 압류가 금지돼요. 수급권 보호 범위와 전용계좌 개설 방법, 양도·담보 금지 규정까지 정리했어요.',
    keywords: [
      '실업급여 압류 금지 범위',
      '실업급여 수급권 보호 제도',
      '실업급여 전용계좌 압류방지',
      '실업급여 양도 담보 금지 규정',
    ],
    ogTitle: '실업급여 압류 금지와 수급권 보호 제도 | 머니위키',
    ogDescription: '실업급여 전액 압류 금지 범위, 전용계좌 개설법을 확인하세요.',
  },

  hub: {
    url: '/w/실업급여-수급중-취업-알바-상병급여-보호',
    name: '실업급여 수급 중 취업·알바·상병급여·수급권 보호',
  },

  breadcrumb: ['고용·노동', '실업급여', '압류 금지·수급권 보호'],

  summary3: [
    <>실업급여 수급권은 <strong>양도·압류·담보 제공이 전면 금지</strong>돼요 (고용보험법 제38조)</>,
    <>실업급여수급계좌에 입금된 금액은 <strong>전액 압류 불가</strong> (시행령 제58조의3)</>,
    <>실업급여로 지급된 금품에는 <strong>국가·지자체 공과금도 부과되지 않아요</strong> (고용보험법 제38조의2)</>,
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
        빚이 있어서 실업급여가 압류될까 봐 걱정되셨다면 안심하세요. <a href="/w/실업급여-수급중-취업-알바-상병급여-보호" className="text-[#4A7AB5] underline">실업급여 수급 중</a> 받는 급여는 <strong>고용보험법 제38조</strong>에 따라 전액 압류가 금지돼요. 수급계좌에 입금된 금액도 단 1원까지 보호받을 수 있어요. 먼저 어떤 범위까지 보호되는지부터 볼게요.
      </p>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '실업급여 수급 중 취업·알바·상병급여·수급권 보호 총정리',
    },
  },

  toc: [
    { id: 's1', label: '실업급여 압류 금지 범위는 어디까지인가요?' },
    { id: 's2', label: '실업급여 수급권 보호 제도는 무엇인가요?' },
    { id: 's3', label: '실업급여 전용계좌는 어떻게 개설하나요?' },
    { id: 's4', label: '실업급여 양도나 담보 제공은 가능한가요?' },
    { id: 's-faq', label: '자주 묻는 질문' },
  ],

  sections: [
    {
      id: 's1',
      number: 'SECTION 01',
      heading: '실업급여 압류 금지 범위는 어디까지인가요?',
      subtitle: '수급권 자체 + 수급계좌 입금액 전부 보호돼요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            실업급여를 받을 권리, 즉 <strong>수급권</strong> 자체가 압류 대상에서 빠져요. 채권자가 법원에 압류 신청을 하더라도 실업급여에는 손을 댈 수 없어요. 이 보호는 구직급여뿐 아니라 <a href="/w/조기재취업수당-신청-조건-금액-잔여일수-계산" className="text-[#4A7AB5] underline">조기재취업수당</a>, 연장급여 등 모든 실업급여에 적용돼요.
          </p>

          <SpokeTable
            id="tbl-protect-scope"
            title="실업급여 압류 금지 보호 범위"
            subtitle="고용보험법 제38조 기준"
            headers={['구분', '보호 범위', '근거 법령']}
            rows={[
              ['수급권', '양도·압류·담보 전면 금지', '고용보험법 제38조 제1항'],
              ['수급계좌 입금액', '입금 전액 압류 불가', '고용보험법 제38조 제2항'],
              ['지급된 금품', '공과금 부과 금지', '고용보험법 제38조의2'],
            ]}
            highlightCol={1}
          />

          <TipBox title="일반 통장에 실업급여가 입금되면?">
            일반 통장에 들어간 실업급여는 다른 예금과 섞여서 구분이 어려워요. 이 경우 채권자가 통장 잔액 전체를 압류할 수 있어요. 반드시 <strong>실업급여 전용계좌</strong>로 받아야 전액 보호돼요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '보호',
        title: '수급권이 보호된다는 건 구체적으로 뭘 뜻하는 걸까요?',
        desc: '양도·압류·담보 금지 3가지 보호 장치를 자세히 알아봐요.',
        icon: 'info',
      },
    },

    {
      id: 's2',
      number: 'SECTION 02',
      heading: '실업급여 수급권 보호 제도는 무엇인가요?',
      subtitle: '양도·압류·담보 3가지를 법으로 막아줘요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            실업급여 수급권 보호는 <strong>3가지 행위</strong>를 법으로 금지하는 제도예요. 실직 후 생계를 유지할 수 있도록 최소한의 안전망을 보장해주는 거예요. 일반 급여 채권과 달리 실업급여는 일부가 아닌 <strong>전액</strong>이 보호 대상이에요.
          </p>

          <DetailBox
            title="수급권 보호 3가지 장치"
            items={[
              { heading: '양도 금지', desc: '실업급여를 받을 권리를 다른 사람에게 넘길 수 없어요. 사인 간 합의도 무효예요' },
              { heading: '압류 금지', desc: '채권자가 법원에 강제집행을 신청해도 실업급여는 압류할 수 없어요' },
              { heading: '담보 제공 금지', desc: '실업급여 수급권을 대출의 담보로 잡을 수 없어요. 금융기관도 요구할 수 없어요' },
            ]}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            보호 대상이 되는 실업급여는 구직급여만이 아니에요. <a href="/w/실업급여-상병급여-질병-부상-수급-전환" className="text-[#4A7AB5] underline">상병급여</a>, 조기재취업수당, 연장급여, 광역구직활동비, 이주비까지 고용보험법상 모든 실업급여가 동일하게 보호돼요.
          </p>

          <Chips
            items={[
              { icon: '🛡️', label: '구직급여', value: '전액 보호' },
              { icon: '🛡️', label: '상병급여', value: '전액 보호' },
              { icon: '🛡️', label: '조기재취업수당', value: '전액 보호' },
              { icon: '🛡️', label: '연장급여', value: '전액 보호' },
            ]}
          />

          <WarnBox>
            실업급여 <strong>수급권 자체</strong>는 금지되지만, 수급 후 다른 계좌로 이체하거나 인출한 현금은 더 이상 보호 대상이 아니에요. 수급계좌에 그대로 두는 것과 인출 후의 보호 범위가 달라요.
          </WarnBox>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '계좌',
        title: '그래서 전용계좌는 어떻게 만드는 건가요?',
        desc: '실업급여수급계좌 개설 절차와 필요 서류를 정리했어요.',
        icon: 'check',
      },
    },

    {
      id: 's3',
      number: 'SECTION 03',
      heading: '실업급여 전용계좌는 어떻게 개설하나요?',
      subtitle: '수급자격증 지참 후 은행 방문이면 끝이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            실업급여 전용계좌, 정확히는 <strong>실업급여수급계좌</strong>라고 불러요. 고용보험법 제37조의2에 근거한 제도예요. 이 계좌에 입금된 실업급여는 전액 압류가 불가능하기 때문에, 빚이 있는 분이라면 반드시 개설해야 해요.
          </p>

          <Steps
            items={[
              { title: '고용센터에서 수급자격 인정받기', desc: '퇴직 후 고용센터 방문 → 구직등록 + 수급자격 인정 신청 → 수급자격증 발급' },
              { title: '시중 은행 방문하여 전용계좌 개설', desc: '수급자격증 + 신분증 지참. 국민·신한·우리·하나·농협 등 1금융권에서 개설 가능' },
              { title: '고용센터에 수급계좌 등록', desc: '개설한 계좌번호를 고용센터에 등록하면 다음 지급일부터 전용계좌로 입금돼요' },
            ]}
          />

          <SpokeChecklist
            items={[
              { text: '실업급여 수급자격증 발급받기', done: false, note: '고용센터 또는 고용24에서 발급' },
              { text: '신분증 준비 (주민등록증 또는 운전면허증)', done: false },
              { text: '은행 창구 방문하여 전용계좌 개설 신청', done: false, note: '온라인 개설은 불가, 반드시 창구 방문' },
              { text: '고용센터에 계좌번호 등록 완료', done: false, note: '고용24 온라인 또는 고용센터 방문' },
            ]}
          />

          <TipBox title="이미 일반 통장으로 받고 있다면?">
            수급 중간에도 전용계좌로 변경할 수 있어요. 고용센터에 <a href="/w/실업급여-고용센터-찾기-고용24-사용법" className="text-[#4A7AB5] underline">고용24</a>나 전화로 계좌 변경을 요청하면 돼요. 변경 후 다음 지급일부터 적용돼요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '규정',
        title: '실업급여를 다른 사람에게 양도할 수 있나요?',
        desc: '양도·담보 금지 규정과 위반 시 불이익을 확인해 보세요.',
        icon: 'info',
      },
    },

    {
      id: 's4',
      number: 'SECTION 04',
      heading: '실업급여 양도나 담보 제공은 가능한가요?',
      subtitle: '불가능해요. 사인 간 합의도 법적으로 무효예요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            실업급여를 받을 권리를 다른 사람에게 넘기거나, 대출의 담보로 잡는 행위는 <strong>고용보험법 제38조 제1항</strong>에 의해 법적으로 금지돼요. 설령 당사자 간에 합의했더라도 그 약속은 법적 효력이 없어요.
          </p>

          <SpokeFlow
            steps={[
              { icon: '📝', label: '양도 합의', sub: '무효' },
              { icon: '🏦', label: '담보 설정', sub: '불가' },
              { icon: '⚖️', label: '압류 신청', sub: '기각' },
              { icon: '🛡️', label: '수급권 보호', sub: '유지' },
            ]}
          />

          <SpokeTable
            id="tbl-compare-protect"
            title="일반 급여 채권 vs 실업급여 압류 비교"
            subtitle="고용보험법 제38조 · 민사집행법 제246조 비교"
            headers={['구분', '일반 급여(월급)', '실업급여']}
            rows={[
              ['압류 가능 여부', '1/2 초과분 압류 가능', '전액 압류 금지'],
              ['최저 보호 금액', '월 185만원 (2026년)', '전액 보호'],
              ['공과금 부과', '소득세·4대보험 부과', '공과금 부과 금지'],
              ['양도·담보', '일부 가능', '전면 금지'],
            ]}
            highlightCol={2}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            다만 <a href="/w/실업급여-부정수급-유형-제재-벌금-추징" className="text-[#4A7AB5] underline">부정수급</a>으로 받은 실업급여는 보호 대상이 아니에요. 거짓이나 부정한 방법으로 받은 급여는 환수 대상이고, <strong>3년 이하 징역 또는 3,000만원 이하 벌금</strong>에 처해질 수 있어요.
          </p>

          <FormulaBox
            lines={[
              { text: '실업급여 수급권 보호 핵심 정리', comment: true },
              { text: '수급권 = 양도 금지 + 압류 금지 + 담보 금지' },
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
