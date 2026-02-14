import type { SpokeData } from '@/data/spoke/types'
import {
  SpokeTable, TipBox, FormulaBox, WarnBox,
  Chips, SpokeLinks, Steps,
  SpokeTimeline, SpokeCompareCards, SpokeRateBars,
  SpokeChecklist,
} from '@/components/spoke/SpokeBlocks'
import 수급기간Checker from '@/components/checkers/50세수급기간Checker'

const data: SpokeData = {
  slug: '50세-이상-정년퇴직-실업급여-수급기간-우대',

  meta: {
    title: '50세 이상 정년퇴직 실업급여 우대 | 소정급여일수 30일 추가 270일',
    description: '50세 이상이면 같은 가입기간이라도 실업급여를 30일 더 받을 수 있어요. 연령별 수급기간 우대와 정년퇴직 수급 방법을 알려드려요.',
    keywords: ['50세 이상 실업급여 소정급여일수 우대', '정년퇴직 실업급여 비자발적 이직 인정', '50세 이상 실업급여 수급기간 최대 270일', '정년퇴직 실업급여 신청 준비 서류'],
    ogTitle: '50세 이상 정년퇴직 실업급여 수급기간 우대 | 머니위키',
    ogDescription: '50세 이상 소정급여일수 30일 추가, 최대 270일까지 구직급여 수급 가능.',
  },

  hub: {
    url: '/w/실업급여-공무원-외국인-특수직종-수급-조건',
    name: '실업급여 공무원 외국인 특수직종 수급 조건',
  },

  breadcrumb: ['고용·노동', '실업급여', '50세 이상 수급기간 우대'],

  summary3: [
    <>50세 이상(또는 장애인)은 같은 피보험기간이라도 소정급여일수가 <strong>30일 더 길어요</strong></>,
    <>피보험기간 10년 이상이면 최대 <strong>270일</strong>(50세 미만은 240일)까지 받아요</>,
    <>정년퇴직은 <strong>비자발적 이직</strong>으로 인정돼서 실업급여 수급이 가능해요</>,
  ],

  sourceBar: {
    badge: '출처',
    name: '고용보험법 제50조·별표1',
    date: '2026.02',
  },

  prevNext: {
    prev: { title: '단시간·파견직 실업급여 피보험기간 계산', href: '/w/단시간-파견직-실업급여-피보험기간-계산' },
    next: { title: '기초수급자 실업급여 동시수급과 소득 영향', href: '/w/기초수급자-실업급여-동시수급-소득-영향' },
  },

  stickyBar: {
    topLabel: '50세 이상 최대 수급기간',
    value: '270일',
    buttonText: '수급기간 확인 →',
    scrollTo: '#checker',
  },

  hero: {
    badge: '2026년 기준',
    h1: (
      <>
        50세 이상 정년퇴직 <span className="text-[#1E3A5F]">실업급여 수급기간</span> 우대와 신청 방법
      </>
    ),
    intro: (
      <p className="text-base text-neutral-500 leading-relaxed">
        정년퇴직을 앞두고 있는데 실업급여를 받을 수 있을지 궁금하셨다면 잘 오셨어요. 50세 이상이면 동일한 피보험기간이라도 <strong>소정급여일수가 30일 더 길어요</strong>. <a href="/w/실업급여-공무원-외국인-특수직종-수급-조건" className="text-[#4A7AB5] underline">근로형태별 수급 조건</a>과 함께 확인하면 더 도움이 돼요. 먼저 내 예상 수급기간부터 확인해 볼게요.
      </p>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '실업급여 공무원·외국인·특수직종 근로형태별 수급 조건 총정리',
    },
  },

  toc: [
    { id: 'checker', label: '내 수급기간 간편 확인' },
    { id: 's1', label: '50세 이상이면 실업급여 소정급여일수가 우대되나요?' },
    { id: 's2', label: '정년퇴직하면 실업급여 비자발적 이직으로 인정되나요?' },
    { id: 's3', label: '50세 이상 실업급여 수급기간은 최대 270일인가요?' },
    { id: 's4', label: '정년퇴직 실업급여 신청에 필요한 서류는 무엇인가요?' },
    { id: 's-faq', label: '자주 묻는 질문' },
  ],

  sections: [
    {
      id: 'checker',
      number: 'CHECK',
      heading: '내 실업급여 수급기간 확인하기',
      subtitle: '나이와 가입기간만 선택하면 예상 수급일수를 알 수 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            50세 이상이면 소정급여일수가 30일 더 길어요. 피보험기간과 퇴직 사유를 선택해서 내 예상 수급기간과 최대 수령액을 바로 확인해 보세요.
          </p>
          <수급기간Checker />
        </>
      ),
      bridgeCTA: {
        href: '#s1',
        badge: '비교',
        title: '연령별 소정급여일수가 얼마나 다른지 궁금하다면?',
        desc: '50세 미만과 50세 이상의 수급기간 비교표를 확인해 보세요.',
        icon: 'calc',
      },
    },

    {
      id: 's1',
      number: 'SECTION 01',
      heading: '50세 이상이면 실업급여 소정급여일수가 우대되나요?',
      subtitle: '같은 가입기간이라도 30일 더 받아요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            구직급여를 받을 수 있는 기간을 <strong>소정급여일수</strong>라고 해요. 이 기간은 피보험기간(고용보험 가입기간)과 이직 당시 나이에 따라 달라지는데요. 50세 이상이거나 장애인이면 같은 가입기간이라도 소정급여일수가 <strong>30일 더 길어요</strong>. <a href="https://www.law.go.kr/법령/고용보험법" className="text-[#4A7AB5] underline" target="_blank" rel="noopener noreferrer">고용보험법 제50조</a>와 별표1에서 이 기준을 정하고 있어요.
          </p>

          <SpokeTable
            id="tbl-days"
            title="피보험기간별 소정급여일수 비교표"
            subtitle="고용보험법 제50조 별표1 / 2019.10.1 이후 이직자 기준"
            headers={['피보험기간', '1년 미만', '1~3년', '3~5년', '5~10년', '10년 이상']}
            rows={[
              ['50세 미만', '120일', '150일', '180일', '210일', '240일'],
              ['50세 이상·장애인', '120일', '180일', '210일', '240일', '270일'],
              ['차이', '0일', '+30일', '+30일', '+30일', '+30일'],
            ]}
            highlightCol={5}
          />

          <SpokeRateBars
            bars={[
              { label: '1~3년 (50세 이상)', rate: '180일', width: '67%' },
              { label: '3~5년 (50세 이상)', rate: '210일', width: '78%' },
              { label: '5~10년 (50세 이상)', rate: '240일', width: '89%' },
              { label: '10년+ (50세 이상)', rate: '270일 (최대)', width: '100%' },
            ]}
          />

          <TipBox title="50세 생일이 이직일 이전이면 우대 적용">
            이직일(퇴사일) 기준으로 만 50세 이상이면 우대가 적용돼요. 49세에 퇴직하면 50세 미만 기준이 적용되니까 퇴직 시점을 잘 따져봐야 해요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '정년',
        title: '정년퇴직도 실업급여 대상이 될까요?',
        desc: '비자발적 이직 인정 여부와 수급 자격 조건을 정리했어요.',
        icon: 'info',
      },
    },

    {
      id: 's2',
      number: 'SECTION 02',
      heading: '정년퇴직하면 실업급여 비자발적 이직으로 인정되나요?',
      subtitle: '정년퇴직은 자동으로 비자발적 이직 인정돼요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            수급기간이 넉넉해도 수급 자격 자체가 안 되면 의미가 없잖아요. 정년퇴직은 본인의 의사와 무관하게 근로관계가 종료되기 때문에 <strong>비자발적 이직</strong>으로 인정돼요. <a href="https://www.law.go.kr/법령/고용보험법시행규칙" className="text-[#4A7AB5] underline" target="_blank" rel="noopener noreferrer">고용보험법 시행규칙</a> 별표2에 정년의 도래가 정당한 이직 사유로 명시되어 있어요.
          </p>

          <SpokeCompareCards
            cards={[
              {
                title: '정년퇴직',
                subtitle: '비자발적 이직 인정',
                items: [
                  '취업규칙·단체협약상 정년 도래',
                  '회사가 이직확인서에 정년퇴직 기재',
                  '별도 자진퇴사 처리 불필요',
                  '실업급여 수급 가능',
                ],
                recommended: true,
                recLabel: '수급 가능',
              },
              {
                title: '자진퇴사 (정년 전)',
                subtitle: '원칙적 수급 제한',
                items: [
                  '본인 의사로 근로관계 종료',
                  '정당한 사유 없으면 수급 불가',
                  '임금체불·근로조건 변경 등은 예외',
                  '별표2 사유 해당 시에만 수급',
                ],
              },
            ]}
          />

          <SpokeChecklist
            items={[
              { text: '이직일 기준 피보험기간 180일 이상', done: true, note: '퇴사 전 18개월 중 180일 이상 고용보험 가입' },
              { text: '비자발적 이직 (정년퇴직 = 자동 인정)', done: true, note: '고용보험법 시행규칙 별표2' },
              { text: '근로 의사와 능력이 있는 상태', done: false, note: '적극적으로 구직활동을 해야 해요' },
              { text: '퇴직 후 1년 이내 신청', done: false, note: '수급기간이 길어도 퇴직 1년 넘기면 소멸' },
            ]}
          />

          <WarnBox>
            <strong>주의:</strong> 정년퇴직이라도 퇴직 후 <strong>12개월 이내</strong>에 구직급여 수급이 완료되어야 해요. 270일 수급 자격이 있어도 늦게 신청하면 남은 일수를 다 받지 못할 수 있어요. 퇴직 후 바로 신청하는 게 중요해요.
          </WarnBox>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '금액',
        title: '실제로 얼마를 받게 되는지 궁금하다면?',
        desc: '2026년 기준 구직급여 상한액·하한액과 총수령액을 확인해 보세요.',
        icon: 'calc',
      },
    },

    {
      id: 's3',
      number: 'SECTION 03',
      heading: '50세 이상 실업급여 수급기간은 최대 270일인가요?',
      subtitle: '2026년 상한액 68,100원 기준 최대 약 1,839만원',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            소정급여일수가 길어지면 총 수령액도 당연히 커지는데요. 구직급여 일액은 퇴직 전 평균임금의 60%예요. 다만 상한액과 하한액이 있어서 일정 범위 안에서 결정돼요. 2026년 기준 일 상한액은 <strong>68,100원</strong>, 하한액은 <strong>66,048원</strong>이에요.
          </p>

          <FormulaBox
            lines={[
              { text: '구직급여 일액 계산 공식', comment: true },
              { text: '구직급여 일액 = 퇴직 전 평균임금 x 60%' },
              { text: '상한: 1일 68,100원 (월 약 204만원)', numbered: true },
              { text: '하한: 1일 66,048원 (최저임금 80%)', numbered: true },
            ]}
          />

          <SpokeTable
            id="tbl-amount"
            title="50세 이상 피보험기간별 최대 총수령액"
            subtitle="2026년 일 상한액 68,100원 기준 / 단위: 만원"
            headers={['피보험기간', '1~3년', '3~5년', '5~10년', '10년 이상']}
            rows={[
              ['소정급여일수', '180일', '210일', '240일', '270일'],
              ['최대 총수령액', '약 1,226만', '약 1,430만', '약 1,634만', '약 1,839만'],
              ['50세 미만 대비', '+204만', '+204만', '+204만', '+204만'],
            ]}
            highlightCol={4}
          />

          <Chips
            items={[
              { icon: '📅', label: '180일', value: '약 1,226만원', href: '#tbl-amount' },
              { icon: '📅', label: '210일', value: '약 1,430만원', href: '#tbl-amount' },
              { icon: '📅', label: '240일', value: '약 1,634만원', href: '#tbl-amount' },
              { icon: '📅', label: '270일', value: '약 1,839만원', href: '#tbl-amount' },
            ]}
          />

          <TipBox title="50세 미만보다 총수령액이 약 204만원 더 많아요">
            30일 추가 수급 x 일 상한액 68,100원 = 약 204만원이에요. 이 금액은 상한액 기준이고, 실제 금액은 퇴직 전 3개월 <a href="/w/실업급여-금액-계산-연봉별-수령액" className="text-[#4A7AB5] underline">평균임금</a>에 따라 달라져요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '신청',
        title: '정년퇴직 후 실업급여 신청은 어디서 하나요?',
        desc: '필요 서류와 단계별 절차를 정리했어요.',
        icon: 'check',
      },
    },

    {
      id: 's4',
      number: 'SECTION 04',
      heading: '정년퇴직 실업급여 신청에 필요한 서류는 무엇인가요?',
      subtitle: '이직확인서 + 구직등록 + 고용센터 방문',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            신청 절차를 미리 알아두면 퇴직 후 빠르게 움직일 수 있어요. 정년퇴직자도 일반 실업급여 신청 절차와 동일하게 진행해요. 회사가 이직확인서를 제출하면 고용센터에서 비자발적 이직 여부를 확인하고 수급자격을 판정해요.
          </p>

          <SpokeTimeline
            events={[
              { month: '퇴직 직후', title: '이직확인서 발급 요청', desc: '회사에 정년퇴직으로 기재 요청' },
              { month: '퇴직 1주 내', title: '고용24 구직등록', desc: 'work24.go.kr에서 온라인 구직등록' },
              { month: '퇴직 2주 내', title: '고용센터 방문', desc: '수급자격인정 신청 + 취업지원 설명회' },
              { month: '매 1~4주', title: '실업인정일 출석', desc: '구직활동 보고 후 구직급여 입금' },
            ]}
          />

          <Steps
            items={[
              { title: '회사에 이직확인서 제출 요청', desc: '퇴직 사유를 "정년퇴직"으로 기재해 달라고 해요. 회사는 피보험자격 상실 신고 시 함께 제출하고, 요청 후 10일 이내에 발급해야 해요.' },
              { title: '고용24(work24.go.kr)에서 구직등록', desc: '온라인으로 먼저 구직등록을 해야 고용센터 방문 예약이 가능해요. 이력서도 함께 작성해 두면 좋아요.' },
              { title: '거주지 관할 고용센터 방문', desc: '신분증, 통장 사본을 가지고 방문해요. 취업지원 설명회에 참석하고 수급자격인정신청서를 작성해요.' },
              { title: '수급자격 인정 결정 (14일 이내)', desc: '고용센터에서 이직 사유와 피보험기간을 확인한 뒤 수급자격 여부를 결정해요.' },
              { title: '실업인정일에 구직활동 증명', desc: '1~4주 간격으로 지정된 실업인정일에 구직활동을 보고하면 구직급여가 계좌로 입금돼요.' },
            ]}
          />

          <TipBox title="퇴직 전에 미리 준비하면 좋은 것">
            고용24 회원가입과 이력서 작성은 재직 중에도 할 수 있어요. 퇴직 후 바로 구직등록을 하면 대기기간 7일이 빨리 시작되니까 <a href="/w/실업급여-지급일-첫-입금일-대기기간" className="text-[#4A7AB5] underline">첫 입금일</a>도 앞당길 수 있어요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '/w/실업급여-공무원-외국인-특수직종-수급-조건',
        badge: '전체 가이드',
        title: '다른 근로형태의 수급 조건도 궁금하다면?',
        desc: '공무원, 외국인, 단시간 근로자 등 근로형태별 실업급여 수급 조건을 한 번에 확인하세요.',
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
    { question: '50세 이상 실업급여 수급기간 우대는 장애인도 동일한가요?', answer: '<strong>네.</strong> 고용보험법 별표1에서 50세 이상과 장애인을 동일하게 우대해요. 피보험기간 10년 이상이면 둘 다 최대 270일까지 받을 수 있어요.' },
    { question: '정년퇴직 후 재취업했다가 다시 퇴직하면 실업급여를 또 받을 수 있나요?', answer: '다시 고용보험에 가입해서 피보험기간 180일 이상을 채우고, 비자발적으로 이직하면 <strong>다시 수급할 수 있어요</strong>. 이전 수급이력과 별개로 새로운 수급자격이 생겨요.' },
    { question: '정년 나이가 60세인데 회사가 62세까지 연장해줬다면 수급 가능한가요?', answer: '정년 연장 후 해당 연장 정년(62세)에 퇴직하면 정년퇴직으로 인정돼요. 다만 <strong>65세 이후에 새로 고용보험에 가입</strong>한 경우는 구직급여 수급이 제한될 수 있어요.' },
    { question: '정년퇴직인데 이직확인서에 자진퇴사로 적혀 있으면 어떻게 하나요?', answer: '고용센터에 이의를 제기할 수 있어요. 취업규칙이나 근로계약서에서 정년 규정을 확인해서 제출하면 <strong>비자발적 이직으로 정정</strong>이 가능해요. 고용노동부 1350에 상담하세요.' },
  ],

  relatedSpokes: [
    { badge: '65세', title: '65세 이상 고령자 실업급여 수급 제한과 예외', desc: '65세 이후 고용보험 가입과 수급 제한 조건', href: '/w/65세-이상-고령자-실업급여-수급-제한-예외' },
    { badge: '수급기간', title: '실업급여 수급기간 소정급여일수 기준', desc: '연령·가입기간별 수급기간 상세 비교', href: '/w/실업급여-수급기간-소정급여일수-기준' },
    { badge: '단시간', title: '단시간·파견직 실업급여 피보험기간 계산', desc: '주 15시간 미만도 고용보험 가입 가능?', href: '/w/단시간-파견직-실업급여-피보험기간-계산' },
    { badge: '수급자', title: '기초수급자 실업급여 동시수급 소득 영향', desc: '실업급여와 생계급여 동시에 받을 수 있나요?', href: '/w/기초수급자-실업급여-동시수급-소득-영향' },
    { badge: '명예퇴직', title: '희망퇴직·명예퇴직 실업급여 수급 차이', desc: '비자발적 이직 인정 기준과 위로금 관계', href: '/w/희망퇴직-명예퇴직-실업급여-수급-차이' },
  ],

  sources: [
    { name: '고용보험법 제50조 별표1 (소정급여일수)', url: 'https://www.law.go.kr/법령/고용보험법', org: '법제처' },
    { name: '고용보험법 시행규칙 별표2 (정당한 이직 사유)', url: 'https://www.law.go.kr/법령/고용보험법시행규칙', org: '법제처' },
    { name: '고용보험 실업급여 안내', url: 'https://www.ei.go.kr', org: '고용보험' },
    { name: '구직급여 수급대상 안내', url: 'https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=722&ccfNo=2&cciNo=3&cnpClsNo=1', org: '찾기쉬운 생활법령정보' },
  ],
}

export default data
