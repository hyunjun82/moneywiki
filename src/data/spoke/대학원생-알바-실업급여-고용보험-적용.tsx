import type { SpokeData } from '@/data/spoke/types'
import {
  SpokeTable,
  FormulaBox,
  TipBox,
  WarnBox,
  Chips,
  SpokeLinks,
  Steps,
  SpokeCompareCards,
  SpokeChecklist,
  SpokeFlow,
  SpokeRateBars,
  SpokeStepCards,
} from '@/components/spoke/SpokeBlocks'
import 학생알바Checker from '@/components/checkers/학생알바Checker'

const data: SpokeData = {
  slug: '대학원생-알바-실업급여-고용보험-적용',

  meta: {
    title: '대학원생 알바 실업급여 고용보험 적용 | 주 15시간 이상 가입 기준',
    description: '대학원생도 아르바이트 고용보험 가입 조건을 충족하면 실업급여를 받을 수 있어요. 주 15시간 기준과 수급 조건, 신청 방법을 정리했어요.',
    keywords: ['대학원생 실업급여 수급 가능 여부 확인', '알바 고용보험 가입 주 15시간 기준', '대학원생 아르바이트 고용보험 적용 범위', '알바 퇴직 실업급여 신청 조건 방법'],
    ogTitle: '대학원생 알바도 실업급여 받을 수 있어요 | 머니위키',
    ogDescription: '주 15시간 이상 알바하면 고용보험 가입, 실업급여 수급 가능해요.',
  },

  hub: {
    url: '/w/실업급여-공무원-외국인-특수직종-수급-조건',
    name: '실업급여 공무원·외국인·특수직종 수급 조건',
  },

  breadcrumb: ['고용·노동', '실업급여', '대학원생 알바 고용보험'],

  hero: {
    badge: '2026년 기준',
    h1: (
      <>
        <span className="text-[#1E3A5F]">대학원생 알바</span> 실업급여 고용보험 적용 기준
      </>
    ),
    intro: (
      <p className="text-base text-neutral-500 leading-relaxed">
        대학원 다니면서 카페나 편의점에서 일했는데 갑자기 계약이 끝났다면, 실업급여를 받을 수 있는지 궁금하셨을 거예요. 핵심은 <strong>주 15시간 이상 근무</strong>로 고용보험에 가입됐느냐예요. <a href="/w/실업급여-공무원-외국인-특수직종-수급-조건" className="text-[#4A7AB5] underline">직종별 실업급여 수급 가이드</a>에서 다른 근로형태도 확인할 수 있고요. 먼저 내 자격부터 간편하게 체크해 볼게요.
      </p>
    ),
    hubCTA: {
      badge: '특수직종',
      desc: '공무원·외국인·대학원생 등 근로형태별 수급 조건 비교',
    },
  },

  toc: [
    { id: 'checker', label: '내 알바도 실업급여 받을 수 있는지 체크' },
    { id: 's1', label: '대학원생도 실업급여를 수급할 수 있나요?' },
    { id: 's2', label: '알바 고용보험은 주 15시간 이상이면 가입되나요?' },
    { id: 's3', label: '대학원생 아르바이트 고용보험 적용 범위는 어디까지인가요?' },
    { id: 's4', label: '알바 퇴직 시 실업급여 신청 조건과 방법은 무엇인가요?' },
    { id: 's-faq', label: '자주 묻는 질문' },
  ],

  sections: [
    {
      id: 'checker',
      number: 'CHECK',
      heading: '내 알바도 실업급여 받을 수 있는지 확인해 보세요',
      subtitle: '4가지만 선택하면 수급 가능성을 바로 알 수 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            대학원생이라서 실업급여를 못 받는다고 생각하는 분이 많아요. 하지만 실업급여는 <strong>학생 신분이 아니라 고용보험 가입 여부</strong>로 판단해요. 아래에서 간단히 확인해 보세요.
          </p>
          <학생알바Checker />
        </>
      ),
      bridgeCTA: {
        href: '#s1',
        badge: '수급',
        title: '대학원생이 실업급여를 받으려면 어떤 조건이 필요할까요?',
        desc: '고용보험 가입 여부와 피보험기간 180일 기준을 정리했어요.',
        icon: 'info',
      },
    },

    {
      id: 's1',
      number: 'SECTION 01',
      heading: '대학원생도 실업급여를 수급할 수 있나요?',
      subtitle: '학생 신분과 무관하게 고용보험 가입이 핵심이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            결론부터 말하면, 대학원생도 실업급여를 받을 수 있어요. <a href="https://www.law.go.kr/법령/고용보험법" target="_blank" rel="noopener noreferrer" className="text-[#4A7AB5] underline">고용보험법</a>은 근로자의 학력이나 신분을 따지지 않아요. 주 15시간 이상 일하면서 고용보험에 가입됐고, 비자발적으로 퇴직했다면 수급 자격이 생겨요.
          </p>

          <FormulaBox
            lines={[
              { text: '대학원생 실업급여 수급 핵심 공식', comment: true },
              { text: '고용보험 가입(주 15시간+) + 피보험기간 180일 + 비자발적 퇴직 = 수급 가능' },
              { text: '1일 수급액 = 퇴직 전 3개월 평균임금 x 60%', numbered: true },
              { text: '상한액 68,100원 / 하한액 66,048원 (2026년)', numbered: true },
            ]}
          />

          <SpokeTable
            id="tbl-conditions"
            title="대학원생 실업급여 수급 3대 조건"
            subtitle="고용보험법 제40조 기준"
            headers={['조건', '기준', '대학원생 적용']}
            rows={[
              ['피보험기간', '이직일 이전 18개월간 180일 이상', '여러 알바 합산 가능'],
              ['퇴직 사유', '비자발적 이직 (계약만료·해고 등)', '계약 만료가 가장 흔함'],
              ['구직 의사', '적극적 구직활동 가능', '야간 대학원은 낮 구직 가능'],
            ]}
            highlightCol={1}
          />

          <TipBox title="피보험기간 180일, 어떻게 계산하나요?">
            유급휴일(주휴일)도 피보험기간에 포함돼요. 주 5일 근무라면 주휴 1일이 추가돼서 한 주에 6일로 계산해요. 편의점 3개월 + 카페 4개월처럼 사업장이 달라도 <a href="/w/실업급여-피보험기간-180일-계산-합산-방법" className="text-[#4A7AB5] underline">피보험기간은 합산</a>돼요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '가입',
        title: '그런데 내 알바가 고용보험에 가입돼 있는 건 맞을까요?',
        desc: '주 15시간 기준과 사업주 의무를 정리했어요.',
        icon: 'calc',
      },
    },

    {
      id: 's2',
      number: 'SECTION 02',
      heading: '알바 고용보험은 주 15시간 이상이면 가입되나요?',
      subtitle: '사업주가 반드시 가입 처리해야 하는 의무가 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            고용보험 가입 여부를 알고 싶다면 <a href="https://www.law.go.kr/법령/고용보험법시행령" target="_blank" rel="noopener noreferrer" className="text-[#4A7AB5] underline">고용보험법 시행령 제3조</a>를 보면 돼요. 주 소정근로시간이 15시간(월 60시간) 이상이면 사업주가 반드시 가입시켜야 해요. 학생이든 직장인이든 근로 조건만 충족하면 해당돼요.
          </p>

          <SpokeRateBars
            bars={[
              { label: '주 15시간+', rate: '의무가입', width: '100%' },
              { label: '주 10~14시간', rate: '3개월+ 시 예외', width: '60%' },
              { label: '주 10시간 미만', rate: '원칙 제외', width: '30%' },
            ]}
          />

          <SpokeCompareCards
            cards={[
              {
                title: '주 15시간 이상 알바',
                subtitle: '고용보험 의무가입 대상',
                items: [
                  '사업주가 반드시 가입 처리',
                  '본인 부담 보험료 0.9% (급여에서 공제)',
                  '편의점·카페·과외·학원 등 업종 무관',
                  '피보험기간 180일 충족 시 실업급여 가능',
                ],
                recommended: true,
                recLabel: '수급 가능',
              },
              {
                title: '주 15시간 미만 알바',
                subtitle: '원칙적 적용 제외 (예외 있음)',
                items: [
                  '3개월 이상 계속 근무하면 특례 적용',
                  '초단시간 근로자 기준 기간: 24개월',
                  '월 60시간 미만이라도 가입되는 경우 있음',
                  '<a href="/w/단시간-파견직-실업급여-피보험기간-계산">단시간 근로자 특례</a> 확인',
                ],
              },
            ]}
          />

          <WarnBox>
            <strong>사업주가 고용보험을 안 넣어줬다면?</strong> <a href="/w/고용보험-미가입-소급가입-실업급여-수급" className="text-[#4A7AB5] underline">소급 가입</a>이 가능해요. 고용센터에 신고하면 사업주에게 가입을 강제하고, 미가입 기간도 소급 처리돼요. 미가입 사업주에게는 과태료 300만원이 부과돼요.
          </WarnBox>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '범위',
        title: '대학원생 알바 유형별로 적용이 다른 건 아닌지 궁금하죠?',
        desc: '과외·연구보조·인턴 등 유형별 고용보험 적용 범위를 정리했어요.',
        icon: 'info',
      },
    },

    {
      id: 's3',
      number: 'SECTION 03',
      heading: '대학원생 아르바이트 고용보험 적용 범위는 어디까지인가요?',
      subtitle: '근로 유형에 따라 적용 여부가 달라져요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            같은 대학원생이라도 일하는 방식에 따라 고용보험 적용이 달라져요. 편의점·카페 같은 일반 알바는 거의 대부분 적용되지만, 연구보조(RA)나 조교는 사업장과의 관계에 따라 판단이 갈려요.
          </p>

          <SpokeStepCards
            steps={[
              { title: '편의점·카페·식당 알바', desc: '주 15시간 이상이면 무조건 의무가입 대상이에요. 가장 확실한 유형이에요.', tip: '가입률 95%+' },
              { title: '학원 강사·과외', desc: '사업장 소속 강사는 고용보험 대상이에요. 1:1 개인과외는 프리랜서로 분류돼서 제외돼요.', tip: '소속 여부 확인' },
              { title: '연구보조(RA)·조교(TA)', desc: '대학교가 사업주로서 근로계약을 체결했다면 적용돼요. 장학금 형태라면 적용 제외예요.', tip: '근로계약서 확인' },
              { title: '플랫폼·배달·대리운전', desc: '고용보험 특례 적용 대상이에요. 2021년부터 퀵서비스·대리운전, 2022년부터 플랫폼 노동자도 가입 가능해요.', tip: '특고 특례 적용' },
            ]}
          />

          <TipBox title="연구보조(RA)로 일하고 있다면 꼭 확인하세요">
            학교에서 근로계약서를 작성하고 4대보험이 적용되는 RA라면 고용보험 가입 대상이에요. 하지만 BK21 장학금처럼 장학 형태로 지급되면 근로가 아니라서 고용보험이 적용되지 않아요. 급여명세서에 고용보험료 공제 항목이 있는지 확인해 보세요.
          </TipBox>

          <SpokeTable
            id="tbl-types"
            title="대학원생 알바 유형별 고용보험 적용 정리"
            subtitle="고용보험법 시행령 기준"
            headers={['근로 유형', '고용보험 적용', '실업급여 가능', '비고']}
            rows={[
              ['편의점·카페·식당', '적용', '가능', '주 15시간 이상 필수'],
              ['학원 소속 강사', '적용', '가능', '사업장 소속 확인'],
              ['RA·TA (근로계약)', '적용', '가능', '근로계약서 필수'],
              ['RA (장학금형)', '미적용', '불가', '근로관계 아님'],
              ['개인 과외', '미적용', '불가', '프리랜서 분류'],
              ['배달·대리운전', '특례 적용', '가능', '특고 고용보험 특례'],
            ]}
            highlightCol={1}
          />
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '신청',
        title: '조건을 충족했다면 실업급여를 어떻게 신청하나요?',
        desc: '알바 퇴직 후 신청 절차와 주의사항을 정리했어요.',
        icon: 'check',
      },
    },

    {
      id: 's4',
      number: 'SECTION 04',
      heading: '알바 퇴직 시 실업급여 신청 조건과 방법은 무엇인가요?',
      subtitle: '퇴직일 다음 날부터 12개월 이내에 신청해야 해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            수급 조건을 갖췄다면 빨리 신청하는 게 유리해요. 퇴직일 다음 날부터 12개월이 수급 기한인데, 늦게 신청하면 남은 수급일수만큼만 받을 수 있거든요. 대학원생이라고 별도 절차가 있는 건 아니고, 일반 근로자와 동일하게 진행하면 돼요.
          </p>

          <SpokeFlow
            steps={[
              { icon: '📝', label: '구직 등록', sub: '고용24 사이트' },
              { icon: '📋', label: '수급자격 신청', sub: '이직확인서 필요' },
              { icon: '🎓', label: '교육 이수', sub: '온라인 1시간' },
              { icon: '✅', label: '실업인정', sub: '1~4주마다' },
              { icon: '💰', label: '급여 입금', sub: '인정 후 지급' },
            ]}
          />

          <SpokeChecklist
            items={[
              { text: '고용24(work24.go.kr)에서 구직 등록 완료', done: true, note: '이력서·희망 직종 입력' },
              { text: '이직확인서 확인 (사업주가 제출)', done: true, note: '미제출 시 고용센터에 신고 가능' },
              { text: '수급자격 인정 신청 (온라인 또는 고용센터 방문)', done: true, note: '퇴직 후 가능한 빨리' },
              { text: '수급자격 교육 이수 (온라인 약 1시간)', done: true, note: '실업급여 제도·구직활동 안내' },
              { text: '실업인정일에 구직활동 보고', done: false, note: '1~4주 간격, 온라인 인정도 가능' },
            ]}
          />

          <WarnBox>
            <strong>대학원 학업 중에도 수급 가능하지만 주의가 필요해요.</strong> 야간 대학원은 낮에 구직활동이 가능하니 실업인정에 문제가 없어요. 반면 주간 전일제 대학원은 구직활동이 현실적으로 어려워서 실업인정이 거부될 수 있어요. 수급 중 다른 알바를 시작하면 반드시 <a href="/w/실업급여-수급중-알바-취업-신고-기준" className="text-[#4A7AB5] underline">고용센터에 신고</a>하세요. 미신고 시 부정수급으로 최대 5배 반환이에요.
          </WarnBox>

          <SpokeLinks
            title="실업급여 신청 관련 글"
            items={[
              { num: '01', heading: '실업급여 신청 방법·절차·준비서류', desc: '단계별 상세 가이드', href: '/w/실업급여-신청-방법-절차-준비서류' },
              { num: '02', heading: '실업급여 고용센터 찾기·고용24 사용법', desc: '관할 센터 검색과 온라인 신청', href: '/w/실업급여-고용센터-찾기-고용24-사용법' },
            ]}
          />
        </>
      ),
      bridgeCTA: {
        href: '/w/실업급여-공무원-외국인-특수직종-수급-조건',
        badge: '허브',
        title: '다른 특수직종의 실업급여 조건도 궁금하다면?',
        desc: '공무원·외국인·임원 등 근로형태별 수급 기준을 비교할 수 있어요.',
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
    { question: '대학원생도 실업급여를 받을 수 있나요?', answer: '<strong>네.</strong> 학생 신분과 관계없이 고용보험에 가입된 상태에서 비자발적으로 퇴직하고, 피보험기간 180일 이상을 충족하면 실업급여를 받을 수 있어요.' },
    { question: '알바 고용보험 미가입이면 실업급여를 못 받나요?', answer: '사업주가 고용보험을 가입하지 않았더라도 <strong>소급 가입</strong>이 가능해요. 고용센터에 신고하면 사업주에게 가입 의무를 이행하도록 조치하고, 소급 가입 후 실업급여를 신청할 수 있어요.' },
    { question: '카페·편의점 알바도 실업급여 대상인가요?', answer: '<strong>네.</strong> 업종에 관계없이 주 15시간 이상 근무하면 고용보험 의무가입 대상이에요. 카페, 편의점, 식당, 학원 등 모든 아르바이트가 해당돼요.' },
    { question: '알바 여러 곳의 피보험기간을 합칠 수 있나요?', answer: '<strong>가능해요.</strong> 서로 다른 사업장에서 일한 고용보험 가입 기간은 합산돼요. 다만 이직 후 고용보험 미가입 기간이 3년을 초과하면 그 이전 기간은 합산되지 않아요.' },
    { question: '실업급여 받으면서 대학원 논문 쓸 수 있나요?', answer: '논문 작성 자체는 문제없어요. 다만 <strong>실업인정일마다 구직활동 실적</strong>을 제출해야 해요. 입사지원·면접·직업훈련 등 구직활동을 병행하면 수급이 유지돼요.' },
  ],

  relatedSpokes: [
    { badge: '알바', title: '실업급여 수급 중 알바·취업·신고 기준', desc: '수급 중 근로 시 신고 의무와 감액 기준', href: '/w/실업급여-수급중-알바-취업-신고-기준' },
    { badge: '단시간', title: '단시간·파견직 실업급여 피보험기간 계산법', desc: '주 15시간 미만 근로자의 수급 조건', href: '/w/단시간-파견직-실업급여-피보험기간-계산' },
    { badge: '조건', title: '실업급여 수급 조건·자격 요건 완벽정리', desc: '피보험기간·비자발적 퇴직·구직활동 기준', href: '/w/실업급여-수급-조건-자격-요건-완벽정리' },
    { badge: '미가입', title: '고용보험 미가입 소급가입 실업급여 수급', desc: '사업주 미가입 시 소급 처리 방법', href: '/w/고용보험-미가입-소급가입-실업급여-수급' },
  ],

  sources: [
    { name: '고용보험법', url: 'https://www.law.go.kr/법령/고용보험법', org: '법제처' },
    { name: '고용보험법 시행령', url: 'https://www.law.go.kr/법령/고용보험법시행령', org: '법제처' },
    { name: '고용보험 안내', url: 'https://www.ei.go.kr', org: '고용보험' },
    { name: '고용노동부', url: 'https://www.moel.go.kr', org: '고용노동부' },
  ],

  summary3: [
    <>대학원생도 주 <strong>15시간 이상</strong> 아르바이트 시 고용보험 의무가입 대상이에요</>,
    <>피보험기간 <strong>180일 이상</strong> + 비자발적 퇴직이면 실업급여 수급 가능해요</>,
    <>2026년 1일 수급액: 상한 <strong>68,100원</strong> / 하한 <strong>66,048원</strong>, 최대 270일 지급</>,
  ],

  sourceBar: {
    badge: '출처',
    name: '고용보험법 시행령 제3조 (단시간 근로자 적용 기준)',
    date: '2026.02',
  },

  prevNext: {
    prev: { title: '외국인 근로자 실업급여 체류자격 수급 조건', href: '/w/외국인-근로자-실업급여-체류자격-수급-조건' },
    next: { title: '단시간·파견직 실업급여 피보험기간 계산법', href: '/w/단시간-파견직-실업급여-피보험기간-계산' },
  },

  stickyBar: {
    topLabel: '알바 고용보험 가입 기준',
    value: '주 15시간 이상',
    buttonText: '수급 자격 체크 →',
    scrollTo: '#checker',
  },
}

export default data
