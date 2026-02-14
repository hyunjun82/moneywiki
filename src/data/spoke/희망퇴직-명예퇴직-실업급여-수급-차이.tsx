import type { SpokeData } from '@/data/spoke/types'
import {
  SpokeTable,
  FormulaBox,
  TipBox,
  SpokeCompareCards,
  SpokeFlow,
  SpokeChecklist,
  SpokeStepCards,
  SpokeRateBars,
  Steps,
} from '@/components/spoke/SpokeBlocks'
import 희망퇴직Checker from '@/components/checkers/희망퇴직Checker'

const data: SpokeData = {
  slug: '희망퇴직-명예퇴직-실업급여-수급-차이',

  meta: {
    title: '희망퇴직 명예퇴직 실업급여 수급 조건 | 비자발적 인정 위로금 관계',
    description: '희망퇴직 위로금을 받아도 실업급여를 별도로 수급할 수 있어요. 비자발적 인정 기준과 이직확인서 기재 방법을 정리했어요.',
    keywords: [
      '희망퇴직 실업급여 비자발적 이직 인정',
      '명예퇴직 실업급여 수급 가능 여부 기준',
      '희망퇴직 위로금 실업급여 중복 수령',
      '희망퇴직 명예퇴직 이직확인서 기재 사항',
    ],
    ogTitle: '희망퇴직 명예퇴직해도 실업급여 받을 수 있어요 | 머니위키',
    ogDescription: '비자발적 인정 기준과 위로금·실업급여 별도 수급 조건을 확인하세요.',
  },

  hub: {
    url: '/w/실업급여-공무원-외국인-특수직종-수급-조건',
    name: '실업급여 공무원·외국인·특수직종 근로형태별 수급 조건',
  },

  breadcrumb: ['고용·노동', '실업급여', '희망퇴직 명예퇴직 수급 차이'],

  summary3: [
    <>희망퇴직은 <strong>회사 주도 구조조정</strong>이면 비자발적 이직으로 인정돼요</>,
    <>위로금·퇴직금을 받아도 <strong>실업급여는 별도로</strong> 지급돼요</>,
    <>이직확인서에 <strong>비자발적 이직 코드</strong>가 기재돼야 수급이 원활해요</>,
  ],

  sourceBar: {
    badge: '출처',
    name: '고용보험법 시행규칙 별표2',
    date: '2026.01',
  },

  prevNext: {
    prev: { title: '기초수급자 실업급여 동시수급 소득 영향', href: '/w/기초수급자-실업급여-동시수급-소득-영향' },
  },

  stickyBar: {
    topLabel: '희망퇴직 실업급여',
    value: '비자발적 인정',
    buttonText: '수급 체크 →',
    scrollTo: '#checker',
  },

  hero: {
    badge: '2026년 기준',
    h1: (
      <>
        <span className="text-[#1E3A5F]">희망퇴직 명예퇴직</span> 실업급여 수급 조건과 비자발적 인정 기준
      </>
    ),
    intro: (
      <p className="text-base text-neutral-500 leading-relaxed">
        희망퇴직이나 명예퇴직을 하면 실업급여를 못 받는다고 알고 있는 분이 많아요. 하지만 <strong>회사 주도의 구조조정이나 인원 감축</strong>으로 퇴직한 거라면 비자발적 이직으로 인정받을 수 있어요. <a href="/w/실업급여-공무원-외국인-특수직종-수급-조건" className="text-[#4A7AB5] underline">근로형태별 수급 조건</a>과 함께, 먼저 내 상황부터 간단히 체크해 볼게요.
      </p>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '실업급여 공무원·외국인·특수직종 근로형태별 수급 조건 총정리',
    },
  },

  toc: [
    { id: 'checker', label: '희망퇴직 실업급여 수급 체크하기' },
    { id: 's1', label: '희망퇴직하면 실업급여 비자발적 이직으로 인정되나요?' },
    { id: 's2', label: '명예퇴직해도 실업급여를 수급할 수 있나요?' },
    { id: 's3', label: '희망퇴직 위로금과 실업급여를 동시에 받을 수 있나요?' },
    { id: 's4', label: '희망퇴직 명예퇴직 시 이직확인서에 뭐라고 기재하나요?' },
    { id: 's-faq', label: '자주 묻는 질문' },
  ],

  sections: [
    {
      id: 'checker',
      number: 'CHECK',
      heading: '희망퇴직 실업급여 수급 가능성 체크하기',
      subtitle: '3가지만 선택하면 바로 확인할 수 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            희망퇴직·명예퇴직이라는 이름 때문에 &quot;자발적 퇴사&quot;로 오해하기 쉬운데, <strong>회사 사정으로 인한 퇴직</strong>이라면 실업급여 수급이 가능해요. 아래에서 내 상황에 맞는 결과를 확인해 보세요.
          </p>
          <희망퇴직Checker />
        </>
      ),
      bridgeCTA: {
        href: '#s1',
        badge: '조건 확인',
        title: '비자발적 이직으로 인정되려면 뭐가 필요할까요?',
        desc: '고용보험법 시행규칙 별표2의 정당한 이직 사유를 자세히 볼게요.',
        icon: 'info',
      },
    },

    {
      id: 's1',
      number: 'SECTION 01',
      heading: '희망퇴직하면 실업급여 비자발적 이직으로 인정되나요?',
      subtitle: '회사 주도 구조조정이면 정당한 이직 사유로 인정돼요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            희망퇴직이란 회사가 경영 악화·인원 감축이 필요할 때 퇴직자를 모집하는 제도예요. &quot;희망&quot;이라는 이름만 보면 자발적인 것 같지만, 실제로는 <strong>회사 사정으로 떠나는 경우</strong>가 대부분이에요. 고용보험법 시행규칙 별표2에서는 이런 경우를 정당한 이직 사유로 인정해요.
          </p>

          <FormulaBox
            lines={[
              { text: '희망퇴직 실업급여 수급 기본 공식', comment: true },
              { text: '회사 주도 구조조정 + 피보험기간 180일 이상 + 재취업 의사 = 수급 가능' },
            ]}
          />

          <SpokeStepCards
            steps={[
              { title: '회사가 먼저 구조조정 결정', desc: '고용조정계획을 수립하고 퇴직 모집 공고를 내는 단계예요', tip: '핵심 판단 기준' },
              { title: '본인이 희망퇴직에 응모', desc: '대상자 요건 확인 후 퇴직 신청서를 제출하는 단계예요' },
              { title: '비자발적 이직으로 처리', desc: '이직확인서에 회사 사유(고용조정)로 기재돼야 해요' },
              { title: '실업급여 신청', desc: '이직일 다음날부터 12개월 이내에 고용센터에 신청해요' },
            ]}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            핵심은 <strong>회사가 먼저 구조조정·인원 감축을 결정</strong>한 뒤 퇴직자를 모집했느냐예요. 이 전제가 있으면 본인이 자발적으로 지원했더라도 비자발적 이직으로 인정받아요. 이직일 이전 18개월간 <a href="/w/실업급여-피보험기간-180일-계산-합산-방법" className="text-[#4A7AB5] underline">피보험 단위기간 180일 이상</a>이라는 기본 요건도 충족해야 해요.
          </p>

          <TipBox title="합의서 문구가 승패를 가려요">
            희망퇴직 합의서에 &quot;회사의 경영상 필요에 의한 인원 감축&quot; 문구가 들어가야 비자발적 이직으로 인정받기 쉬워요. &quot;본인의 자유의사에 의한 퇴직&quot;으로만 적혀 있으면 자발적 이직으로 처리될 수 있어요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '명예퇴직',
        title: '명예퇴직은 희망퇴직과 뭐가 다를까요?',
        desc: '민간 근로자와 공무원의 적용이 완전히 달라요.',
        icon: 'info',
      },
    },

    {
      id: 's2',
      number: 'SECTION 02',
      heading: '명예퇴직해도 실업급여를 수급할 수 있나요?',
      subtitle: '민간 근로자는 가능하지만, 공무원 명예퇴직은 대상이 아니에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            같은 &quot;명예퇴직&quot;이라도 <strong>민간 기업</strong>과 <strong>공무원</strong>은 적용 기준이 완전히 달라요. 민간 기업에서 사업주 권고로 명예퇴직을 했다면 희망퇴직과 동일하게 비자발적 이직으로 인정받을 수 있어요.
          </p>

          <SpokeTable
            id="tbl-compare"
            title="민간 명예퇴직 vs 공무원 명예퇴직 비교"
            subtitle="2026년 기준 / 고용보험법, 국가공무원법"
            headers={['구분', '민간 근로자 명예퇴직', '공무원 명예퇴직']}
            rows={[
              ['고용보험 가입', '가입 대상', '미가입 (적용 제외)'],
              ['실업급여 수급', '비자발적 인정 시 가능', '불가 (제도 자체 없음)'],
              ['퇴직 보상', '위로금 + 퇴직금 + 실업급여', '명예퇴직수당 + 퇴직급여'],
              ['수당 지급 기준', '회사 내규 (1~24개월분)', '국가공무원법 제74조의2'],
              ['근속 요건', '회사별 상이', '20년 이상 근속 시 지급'],
            ]}
            highlightCol={1}
          />

          <SpokeRateBars
            bars={[
              { label: '민간 명퇴', rate: '실업급여 O', width: '85%' },
              { label: '공무원 명퇴', rate: '실업급여 X', width: '15%' },
              { label: '기간제 공무원', rate: '실업급여 O', width: '75%' },
            ]}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            공무원은 고용보험에 가입하지 않기 때문에 실업급여 자체가 없어요. 대신 국가공무원법에 따라 20년 이상 근속한 공무원이 정년 전 퇴직하면 <strong>명예퇴직수당</strong>을 받아요. 단, <a href="/w/공무원-교사-실업급여-퇴직급여-차이-비교" className="text-[#4A7AB5] underline">기간제 공무원과 사립학교 교사</a>는 고용보험 가입 대상이라 실업급여 수급이 가능해요.
          </p>

          <TipBox title="기간제 공무원·사립교사는 예외예요">
            정규직 공무원과 달리 기간제 공무원과 사립학교 교직원은 고용보험에 가입해요. 계약 만료나 구조조정으로 퇴직하면 실업급여를 받을 수 있어요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '위로금',
        title: '위로금을 많이 받으면 실업급여가 줄어들까요?',
        desc: '결론부터 말하면, 위로금과 실업급여는 완전히 별개예요.',
        icon: 'calc',
      },
    },

    {
      id: 's3',
      number: 'SECTION 03',
      heading: '희망퇴직 위로금과 실업급여를 동시에 받을 수 있나요?',
      subtitle: '위로금은 회사 지급, 실업급여는 고용보험 지급이라 별개예요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            희망퇴직이나 명예퇴직 시 회사에서 <strong>위로금(퇴직위로금)</strong>을 주는 경우가 많아요. 위로금을 아무리 많이 받아도 실업급여가 줄거나 제한되지 않아요. 재원 자체가 다르기 때문이에요.
          </p>

          <SpokeCompareCards
            cards={[
              {
                title: '위로금·퇴직금',
                subtitle: '회사가 지급하는 돈',
                items: [
                  '퇴직금: 30일분 평균임금 x 근속연수',
                  '위로금: 회사 내규 (1~24개월분 급여)',
                  '세법상 퇴직소득세 적용',
                  '실업급여와 별개로 전액 수령',
                ],
              },
              {
                title: '실업급여',
                subtitle: '고용보험에서 지급하는 돈',
                items: [
                  '이직 전 평균임금의 60% 지급',
                  '2026년 상한액: 1일 68,100원',
                  '2026년 하한액: 1일 66,048원',
                  '피보험기간·나이에 따라 120~270일',
                ],
                recommended: true,
                recLabel: '별도 수급 가능',
              },
            ]}
          />

          <SpokeChecklist
            items={[
              { text: '퇴직금을 받아도 실업급여에 영향 없어요', done: true },
              { text: '위로금(명퇴수당)을 받아도 실업급여에 영향 없어요', done: true },
              { text: '퇴직금 + 위로금 + 실업급여 3가지 모두 받을 수 있어요', done: true },
              { text: '신청 기한은 이직일 다음날부터 12개월 이내예요', done: true, note: '기한 초과 시 남은 일수만큼만 수급' },
            ]}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            실업급여는 고용보험 기금에서 나오고, 위로금은 회사 재원이에요. 서로 다른 재원이기 때문에 위로금이 1억원이든 2억원이든 <strong>실업급여 수급 여부나 금액에 전혀 영향이 없어요</strong>. <a href="/w/실업급여-퇴직금-관계-동시수급-세금-처리" className="text-[#4A7AB5] underline">퇴직금과 실업급여의 세금 처리</a>가 궁금하다면 별도 글에서 확인하세요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '서류 준비',
        title: '이직확인서는 어떻게 준비하면 되나요?',
        desc: '비자발적 이직 코드 기재가 실업급여 수급의 열쇠예요.',
        icon: 'check',
      },
    },

    {
      id: 's4',
      number: 'SECTION 04',
      heading: '희망퇴직 명예퇴직 시 이직확인서에 뭐라고 기재하나요?',
      subtitle: '이직확인서의 이직 사유 코드가 실업급여 수급의 핵심이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            실업급여를 원활하게 받으려면 사업주가 고용센터에 제출하는 <strong>이직확인서</strong>에 이직 사유가 정확하게 기재돼야 해요. 사유 코드가 &quot;비자발적 이직(권고사직·고용조정)&quot;으로 돼 있어야 수급이 순조로워요.
          </p>

          <SpokeFlow
            steps={[
              { icon: '🏢', label: '구조조정 결정', sub: '고용조정계획 수립' },
              { icon: '📢', label: '희망퇴직 모집', sub: '대상자·위로금 안내' },
              { icon: '📝', label: '합의서 작성', sub: '비자발적 사유 명시' },
              { icon: '📄', label: '이직확인서 발급', sub: '비자발적 코드 기재' },
              { icon: '✅', label: '고용센터 신청', sub: '수급자격 인정' },
            ]}
          />

          <Steps
            items={[
              { title: '퇴직 전: 합의서 문구 확인', desc: '인사팀에 요청해서 합의서에 "회사 경영상 필요에 의한 인원 감축" 문구가 포함되는지 꼭 확인하세요' },
              { title: '퇴직 전: 이직확인서 사유 요청', desc: '이직확인서에 비자발적 이직(고용조정) 코드로 기재해달라고 인사팀에 미리 요청하세요' },
              { title: '퇴직 후: 고용센터 방문 신청', desc: '이직일 다음날부터 12개월 이내에 신분증·통장사본 지참하고 관할 고용센터에 방문하세요' },
              { title: '대기기간 7일 경과 후 구직활동', desc: '실업 신고 후 7일은 대기기간이에요. 이후 1~4주 단위로 실업인정일에 출석하세요' },
            ]}
          />

          <TipBox title="이직확인서를 안 내주거나 거짓 기재하면?">
            사업주가 이직확인서를 발급하지 않거나 사유를 거짓으로 기재하면 고용보험법 제118조에 따라 <strong>300만원 이하 과태료</strong>가 부과돼요. 거부 시 관할 고용센터에 신고하면 직권조사가 진행돼요.
          </TipBox>

          <p className="text-neutral-600 mb-4 leading-relaxed">
            만약 이직확인서에 자발적 퇴사로 적혀 있다면 <a href="/w/실업급여-이의신청-심사청구-재심사-방법" className="text-[#4A7AB5] underline">이의신청</a>을 할 수 있어요. 희망퇴직 공고문, 합의서, 구조조정 관련 사내 공지 등을 증빙으로 제출하면 고용센터에서 사실관계를 조사해요. 50세 이상이라면 같은 피보험기간이라도 <a href="/w/50세-이상-정년퇴직-실업급여-수급기간-우대" className="text-[#4A7AB5] underline">소정급여일수가 30일 더 길어져요</a>.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '/w/실업급여-공무원-외국인-특수직종-수급-조건',
        badge: '전체 보기',
        title: '다른 근로형태별 실업급여 조건도 확인해 보세요',
        desc: '공무원·외국인·단시간 근로자 등 직종별 수급 조건을 정리했어요.',
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
      question: '희망퇴직에 자발적으로 지원해도 실업급여를 받을 수 있나요?',
      answer: '<strong>네, 가능해요.</strong> 본인이 지원했더라도 회사가 구조조정·인원 감축을 위해 퇴직 모집을 실시한 거라면 비자발적 이직으로 인정돼요. 핵심은 회사의 고용조정계획이 먼저 있었느냐예요.',
    },
    {
      question: '희망퇴직 위로금이 1억원 넘어도 실업급여를 받을 수 있나요?',
      answer: '위로금 금액 자체는 실업급여 수급 여부에 영향을 주지 않아요. 위로금은 회사 재원이고 실업급여는 고용보험 기금이라 별개예요. 다만 <strong>이직일 다음날부터 12개월 이내</strong>에 신청해야 해요.',
    },
    {
      question: '명예퇴직수당과 퇴직금을 동시에 받을 수 있나요?',
      answer: '<strong>네.</strong> 퇴직금은 근로기준법상 법정 의무이고, 명예퇴직수당(위로금)은 회사 내규에 따른 별도 지급이에요. 두 가지에 실업급여까지 합해서 총 3가지를 받을 수 있어요.',
    },
    {
      question: '이직확인서에 자발적 퇴사로 적혀 있으면 어떻게 하나요?',
      answer: '관할 <strong>고용센터에 이의신청</strong>을 할 수 있어요. 희망퇴직 공고문, 합의서, 구조조정 사내 공지 등 비자발적 퇴직임을 증명하는 서류를 제출하면 사실관계를 조사해요.',
    },
  ],

  relatedSpokes: [
    { badge: '권고사직', title: '권고사직 실업급여 수급 조건과 절차 합의서 작성법', desc: '권고사직과 해고의 차이, 합의서 필수 항목', href: '/w/권고사직-실업급여-수급-조건-절차-합의서' },
    { badge: '50세 우대', title: '50세 이상 정년퇴직 실업급여 수급기간 우대', desc: '소정급여일수 30일 추가, 최대 270일', href: '/w/50세-이상-정년퇴직-실업급여-수급기간-우대' },
    { badge: '퇴직금', title: '실업급여 퇴직금 관계 동시수급 세금 처리', desc: '퇴직금·실업급여 별도 수급과 세금', href: '/w/실업급여-퇴직금-관계-동시수급-세금-처리' },
    { badge: '기초수급', title: '기초수급자 실업급여 동시수급 소득 영향', desc: '실업급여 수급 시 생계급여 감소 영향', href: '/w/기초수급자-실업급여-동시수급-소득-영향' },
    { badge: '수급 조건', title: '실업급여 수급 조건 자격 요건 완벽정리', desc: '피보험기간 180일, 비자발적 이직 기본 요건', href: '/w/실업급여-수급-조건-자격-요건-완벽정리' },
  ],

  sources: [
    { name: '고용보험법 시행규칙 별표2 (정당한 이직 사유)', url: 'https://www.law.go.kr/법령/고용보험법시행규칙', org: '법제처' },
    { name: '고용보험법 (구직급여 수급 요건)', url: 'https://www.law.go.kr/법령/고용보험법', org: '법제처' },
    { name: '실업급여 안내', url: 'https://eiac.ei.go.kr/ei/m/pf/MOW-PF-00-140-C.html', org: '고용보험' },
    { name: '국가공무원법 (명예퇴직수당)', url: 'https://www.law.go.kr/법령/국가공무원법', org: '법제처' },
  ],
}

export default data
