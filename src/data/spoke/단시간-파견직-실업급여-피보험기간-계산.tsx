import type { SpokeData } from '@/data/spoke/types'
import {
  SpokeTable, TipBox, FormulaBox, WarnBox,
  Chips, DetailBox, SpokeLinks, Steps,
  SpokeCompareCards, SpokeChecklist,
} from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '단시간-파견직-실업급여-피보험기간-계산',

  meta: {
    title: '단시간 파견직 실업급여 피보험기간 계산 | 주 15시간 기준 수급 조건',
    description: '단시간 근로자와 파견직의 실업급여 피보험기간 계산법을 정리했어요. 주 15시간 기준과 24개월 특례까지 확인하세요.',
    keywords: [
      '단시간 근로자 실업급여 조건',
      '파견직 실업급여 수급 방법',
      '4시간 미만 실업급여 피보험',
      '단시간 파견 고용보험 가입',
    ],
    ogTitle: '단시간 파견직 실업급여 피보험기간 계산 | 머니위키',
    ogDescription: '주 15시간 기준, 단시간·파견직 피보험기간 계산과 수급 조건을 정리했어요.',
  },

  hub: {
    url: '/w/실업급여-공무원-외국인-특수직종-수급-조건',
    name: '실업급여 공무원·외국인·특수직종 근로형태별 수급 조건',
  },

  breadcrumb: ['고용·노동', '실업급여', '단시간·파견직 피보험기간'],

  summary3: [
    <>주 15시간 이상 근무하면 <strong>고용보험 의무가입</strong>, 15시간 미만이어도 3개월 이상이면 가입 대상이에요</>,
    <>초단시간 근로자는 기준기간이 <strong>24개월</strong>로 늘어나고, 그 중 90일 이상 해당 조건으로 근무해야 해요</>,
    <>파견직은 <strong>파견사업주</strong>가 고용보험을 가입하고, 파견 종료 시 비자발적 이직으로 인정받을 수 있어요</>,
  ],

  sourceBar: {
    badge: '출처',
    name: '고용보험법 시행령 제3조 · 고용보험법 제41조',
    date: '2026.02',
  },

  prevNext: {
    prev: { title: '대학원생 알바 실업급여 고용보험 적용', href: '/w/대학원생-알바-실업급여-고용보험-적용' },
    next: { title: '50세 이상 정년퇴직 실업급여 수급기간 우대', href: '/w/50세-이상-정년퇴직-실업급여-수급기간-우대' },
  },

  stickyBar: {
    topLabel: '단시간 근로자 기준',
    value: '주 15시간',
    buttonText: '피보험기간 계산법 보기 →',
    scrollTo: '#s2',
  },

  hero: {
    badge: '2026년 기준',
    h1: (
      <>
        <span className="text-[#1E3A5F]">단시간·파견직</span> 실업급여 피보험기간 계산과 수급 조건
      </>
    ),
    intro: (
      <p className="text-base text-neutral-500 leading-relaxed">
        하루 4시간, 주 3일만 일해도 실업급여를 받을 수 있는지 궁금하셨다면 잘 오셨어요. 주 15시간 기준과 초단시간 근로자 24개월 특례만 알면 내가 수급 대상인지 바로 판단할 수 있어요. <a href="/w/실업급여-공무원-외국인-특수직종-수급-조건" className="text-[#4A7AB5] underline">근로형태별 실업급여 가이드</a>에서 다른 유형도 확인할 수 있어요. 먼저 고용보험 가입 기준부터 볼게요.
      </p>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '공무원·외국인·특수직종 근로형태별 실업급여 수급 조건 총정리',
    },
  },

  toc: [
    { id: 's1', label: '단시간 근로자 고용보험 가입 조건은 어떻게 되나요?' },
    { id: 's2', label: '단시간 근로자 피보험기간은 어떻게 계산하나요?' },
    { id: 's3', label: '파견직 실업급여 수급 방법은 어떻게 되나요?' },
    { id: 's4', label: '단시간 파견 고용보험 가입 시 주의할 점은 무엇인가요?' },
    { id: 's-faq', label: '자주 묻는 질문' },
  ],

  sections: [
    {
      id: 's1',
      number: 'SECTION 01',
      heading: '단시간 근로자 실업급여 고용보험 가입 조건은 어떻게 되나요?',
      subtitle: '주 15시간이 기준이지만 예외도 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            고용보험 가입 여부가 실업급여의 출발점이에요. 단시간 근로자는 <strong>주 소정근로시간</strong>에 따라 가입 의무가 달라져요. <a href="https://www.law.go.kr/법령/고용보험법시행령" target="_blank" rel="noopener noreferrer" className="text-[#4A7AB5] underline">고용보험법 시행령 제3조</a>에서 이 기준을 정하고 있어요.
          </p>

          <SpokeCompareCards
            cards={[
              {
                title: '주 15시간 이상',
                subtitle: '일반 단시간 근로자',
                items: [
                  '고용보험 의무가입',
                  '기준기간 18개월 적용',
                  '피보험단위기간 180일 이상',
                  '일반 근로자와 동일한 수급 조건',
                ],
                recommended: true,
                recLabel: '의무가입',
              },
              {
                title: '주 15시간 미만',
                subtitle: '초단시간 근로자',
                items: [
                  '3개월 이상 계속 근로 시 가입',
                  '기준기간 24개월로 확대',
                  '24개월 중 90일 이상 해당 근무',
                  '월 소정근로시간 60시간 미만',
                ],
              },
            ]}
          />

          <DetailBox
            title="고용보험 가입 대상 판단 기준"
            items={[
              { heading: '주 소정근로시간 확인', desc: '근로계약서에 적힌 주당 근로시간이 15시간 이상이면 즉시 의무가입 대상이에요' },
              { heading: '계속 근로 기간 확인', desc: '15시간 미만이더라도 3개월 이상 계속 일하면 고용보험 가입 대상이에요' },
              { heading: '복수 사업장 합산 불가', desc: '두 곳에서 각각 10시간씩 일해도 합산 20시간이 아니라 개별 사업장 기준이에요' },
            ]}
          />

          <TipBox title="주 15시간 미만이라고 무조건 제외되는 건 아니에요">
            3개월 이상 계속 근무하면 초단시간 근로자로 고용보험에 가입돼요. 사업주가 가입을 안 했다면 <a href="/w/고용보험-미가입-소급가입-실업급여-수급" className="text-[#4A7AB5] underline">소급가입</a>을 요청할 수 있어요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '계산법',
        title: '그런데 주 3일만 일하면 180일을 어떻게 채울까요?',
        desc: '단시간 근로자의 피보험단위기간 계산법은 일반 근로자와 다른 부분이 있어요.',
        icon: 'calc',
      },
    },

    {
      id: 's2',
      number: 'SECTION 02',
      heading: '단시간 근로자 실업급여 피보험기간은 어떻게 계산하나요?',
      subtitle: '보수 지급의 기초가 된 날을 합산해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            피보험단위기간은 단순히 달력상 근무 개월 수가 아니에요. <a href="https://www.law.go.kr/법령/고용보험법" target="_blank" rel="noopener noreferrer" className="text-[#4A7AB5] underline">고용보험법 제41조</a>에 따라 <strong>보수 지급의 기초가 된 날</strong>을 하루하루 합산하는 방식이에요. 실제 일한 날뿐 아니라 유급휴일, 휴업수당을 받은 날도 포함돼요.
          </p>

          <FormulaBox
            lines={[
              { text: '피보험단위기간 계산', comment: true },
              { text: '피보험단위기간 = 근로일 + 유급휴일 + 휴업수당 지급일' },
            ]}
          />

          <SpokeTable
            id="tbl-example"
            title="단시간 근로자 피보험단위기간 계산 예시"
            subtitle="주 3일, 하루 5시간 근무자 기준 (주휴수당 지급 시)"
            headers={['구분', '월 근로일', '월 유급휴일', '월 합계', '6개월 누적']}
            rows={[
              ['주 3일 근무', '약 13일', '약 4일', '약 17일', '약 102일'],
              ['주 4일 근무', '약 17일', '약 4일', '약 21일', '약 126일'],
              ['주 5일 근무', '약 22일', '약 4일', '약 26일', '약 156일'],
            ]}
            highlightCol={4}
          />

          <SpokeTable
            id="tbl-criteria"
            title="일반 vs 초단시간 근로자 수급 요건 비교"
            subtitle="고용보험법 제40조·제41조 기준"
            headers={['구분', '일반 근로자', '초단시간 근로자']}
            rows={[
              ['기준기간', '이직일 전 18개월', '이직일 전 24개월'],
              ['피보험단위기간', '180일 이상', '180일 이상'],
              ['추가 조건', '없음', '90일 이상 해당 조건 근무'],
              ['주 소정근로시간', '15시간 이상', '15시간 미만'],
            ]}
            highlightCol={2}
          />

          <TipBox title="여러 직장의 피보험기간을 합산할 수 있어요">
            이전 직장에서 실업급여를 받지 않고 퇴사했다면, 3년 이내 새 직장 피보험기간과 합산할 수 있어요. 짧은 근무를 여러 번 한 경우에 유리해요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '파견직',
        title: '파견직은 누가 고용보험을 가입하고 실업급여는 어디서 받나요?',
        desc: '파견사업주와 사용사업주, 두 곳이 있어서 헷갈리기 쉬운 파견직 실업급여 구조를 정리했어요.',
        icon: 'info',
      },
    },

    {
      id: 's3',
      number: 'SECTION 03',
      heading: '파견직 실업급여 수급 방법은 어떻게 되나요?',
      subtitle: '파견사업주가 고용보험 가입, 파견 종료 시 수급 가능',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            파견직은 실제로 일하는 곳(사용사업주)과 고용계약을 맺은 곳(파견사업주)이 달라요. 고용보험은 <strong>파견사업주</strong>가 가입하고, 실업급여도 파견사업주 기준으로 처리돼요. 파견 계약이 끝나면 비자발적 이직으로 인정받을 수 있어요.
          </p>

          <Chips
            items={[
              { icon: '📋', label: '고용계약', value: '파견사업주' },
              { icon: '🏢', label: '실제 근무지', value: '사용사업주' },
              { icon: '🛡️', label: '고용보험', value: '파견사업주' },
              { icon: '💰', label: '실업급여', value: '고용센터' },
            ]}
          />

          <Steps
            items={[
              { title: '파견 계약 종료 또는 갱신 거절', desc: '파견사업주가 이직확인서를 발급해요. 사용사업주가 아닌 파견사업주에게 요청해야 해요' },
              { title: '고용센터 방문 후 수급자격 신청', desc: '거주지 관할 고용센터에 이직확인서, 신분증, 통장사본을 가지고 방문해요' },
              { title: '수급자격 인정 후 실업급여 수령', desc: '7일 대기기간 후 1~4주마다 실업인정을 받으면 구직급여가 지급돼요' },
            ]}
          />

          <WarnBox>
            파견 계약이 끝났는데 파견사업주가 이직확인서를 안 주면 고용센터에 <strong>직권 발급</strong>을 요청할 수 있어요. 사용사업주가 아닌 파견사업주에게 요청하는 게 맞아요.
          </WarnBox>

          <SpokeChecklist
            items={[
              { text: '파견사업주에게 이직확인서 발급 요청', done: false, note: '사용사업주가 아닌 파견사업주가 발급 주체예요' },
              { text: '고용보험 가입 이력 확인 (고용24)', done: false, note: 'ei.go.kr에서 피보험기간 조회 가능' },
              { text: '비자발적 이직 사유 해당 여부 확인', done: false, note: '파견 종료, 갱신 거절은 비자발적 이직이에요' },
              { text: '고용센터 방문 전 구비 서류 준비', done: false, note: '신분증, 통장사본, 이직확인서 3가지 필수' },
            ]}
          />
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '주의',
        title: '사업주가 고용보험 미가입이라면 어떻게 해야 하나요?',
        desc: '단시간·파견 근로자에게 흔한 고용보험 미가입 문제와 대처법을 정리했어요.',
        icon: 'check',
      },
    },

    {
      id: 's4',
      number: 'SECTION 04',
      heading: '단시간 파견 고용보험 가입 시 주의할 점은 무엇인가요?',
      subtitle: '미가입, 이중 취득, 자발적 이직 등 실수를 피하세요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            단시간 근로자와 파견직은 고용보험 관련 실수가 잦은 편이에요. 가장 흔한 문제는 사업주의 <strong>고용보험 미가입</strong>이에요. 가입 이력이 없으면 피보험기간이 0일이 돼서 실업급여를 받을 수 없어요.
          </p>

          <DetailBox
            title="자주 발생하는 실수와 대처법"
            items={[
              { heading: '고용보험 미가입', desc: '근로복지공단에 소급가입 신청이 가능해요. 근로계약서, 급여명세서, 출퇴근 기록 등을 준비하세요' },
              { heading: '자발적 이직 처리', desc: '파견 종료인데 자발적 퇴사로 처리되면 수급이 거부돼요. 이직확인서 사유를 꼭 확인하세요' },
              { heading: '피보험기간 부족', desc: '180일을 못 채운 경우, 이전 직장 기간과 합산이 가능한지 확인하세요. 3년 이내면 합산돼요' },
              { heading: '2곳 이상 근무 시 이중 취득', desc: '각각 따로 고용보험에 가입하고, 마지막으로 퇴사한 사업장 기준으로 실업급여를 신청해요' },
            ]}
          />

          <SpokeTable
            id="tbl-benefits"
            title="2026년 실업급여 소정급여일수 (피보험기간·연령별)"
            subtitle="고용보험법 제50조 기준 / 단위: 일"
            headers={['구분', '1년 미만', '1~3년', '3~5년', '5~10년', '10년 이상']}
            rows={[
              ['50세 미만', '120일', '150일', '180일', '210일', '240일'],
              ['50세 이상·장애인', '120일', '180일', '210일', '240일', '270일'],
            ]}
            highlightCol={5}
          />

          <FormulaBox
            lines={[
              { text: '2026년 실업급여 일 지급액', comment: true },
              { text: '일 지급액 = 퇴직 전 평균임금 × 60%' },
              { text: '1. 하한액: 71,424원 (최저임금 80%)', numbered: true },
              { text: '2. 상한액: 84,000원', numbered: true },
            ]}
          />

          <TipBox title="단시간 근로자도 하한액 적용을 받아요">
            하루 4시간만 일해서 평균임금이 낮더라도, 실업급여 하한액 <strong>71,424원</strong>이 보장돼요. 하한액보다 계산 금액이 낮으면 하한액으로 지급해요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '/w/실업급여-공무원-외국인-특수직종-수급-조건',
        badge: '허브',
        title: '다른 근로형태의 실업급여 조건도 궁금하시다면',
        desc: '공무원, 외국인, 임원, 대학원생 등 근로형태별 수급 조건을 한눈에 비교할 수 있어요.',
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
      question: '주 15시간 미만 단시간 근로자도 실업급여를 받을 수 있나요?',
      answer: '<strong>네.</strong> 3개월 이상 계속 근무하면 고용보험 가입 대상이에요. 다만 기준기간이 24개월로 늘어나고, 그 중 90일 이상 해당 조건으로 근무해야 해요.',
    },
    {
      question: '파견 계약이 끝나면 자동으로 실업급여를 받을 수 있나요?',
      answer: '파견 계약 종료는 <strong>비자발적 이직</strong>으로 인정돼요. 다만 파견사업주에게 이직확인서를 발급받아야 하고, 피보험단위기간 180일 이상 등 기본 요건을 갖춰야 해요.',
    },
    {
      question: '두 곳에서 단시간 근무 중인데 피보험기간을 합칠 수 있나요?',
      answer: '동시 근무 중인 사업장의 피보험기간은 <strong>각각 따로</strong> 산정돼요. 다만 한 곳을 퇴사하고 다른 곳도 퇴사하면, 이전 사업장 기간을 3년 이내에 합산할 수 있어요.',
    },
    {
      question: '단시간 근로자의 실업급여 금액은 얼마나 되나요?',
      answer: '퇴직 전 평균임금의 60%예요. 다만 2026년 기준 <strong>하한액 71,424원</strong>(일)이 보장돼요. 주 15시간 미만 근무라 평균임금이 낮더라도 하한액 이하로는 내려가지 않아요.',
    },
  ],

  relatedSpokes: [
    { badge: '일용직', title: '일용직 건설근로자 실업급여 피보험기간 계산', desc: '일용직의 피보험단위기간 계산과 수급 조건', href: '/w/일용직-건설근로자-실업급여-피보험기간-계산' },
    { badge: '피보험기간', title: '실업급여 피보험기간 180일 계산과 합산 방법', desc: '여러 직장 피보험기간 합산 규칙과 계산 사례', href: '/w/실업급여-피보험기간-180일-계산-합산-방법' },
    { badge: '수급조건', title: '실업급여 수급 조건 자격 요건 완벽정리', desc: '4가지 수급 요건과 제한사유 총정리', href: '/w/실업급여-수급-조건-자격-요건-완벽정리' },
    { badge: '대학원생', title: '대학원생 알바 실업급여 고용보험 적용', desc: '아르바이트 고용보험 가입과 수급 조건', href: '/w/대학원생-알바-실업급여-고용보험-적용' },
    { badge: '50세', title: '50세 이상 정년퇴직 실업급여 수급기간 우대', desc: '연령별 소정급여일수 30일 추가 우대', href: '/w/50세-이상-정년퇴직-실업급여-수급기간-우대' },
  ],

  sources: [
    { name: '고용보험법', url: 'https://www.law.go.kr/법령/고용보험법', org: '법제처' },
    { name: '고용보험법 시행령', url: 'https://www.law.go.kr/법령/고용보험법시행령', org: '법제처' },
    { name: '고용보험 구직급여 안내', url: 'https://www.ei.go.kr', org: '고용보험' },
    { name: '실업급여 수급자격 안내', url: 'https://www.easylaw.go.kr/CSP/CnpClsMainBtr.laf?popMenu=ov&csmSeq=722&ccfNo=2&cciNo=1&cnpClsNo=1', org: '찾기쉬운 생활법령정보' },
  ],
}

export default data
