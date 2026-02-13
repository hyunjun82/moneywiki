import type { SpokeData } from '@/data/spoke/types'
import {
  SpokeTable,
  FormulaBox,
  TipBox,
  SpokeCompareCards,
  SpokeRateBars,
  SpokeFlow,
  SpokeChecklist,
  Chips,
  Steps,
} from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '권고사직-실업급여-수급-조건-절차-합의서',

  meta: {
    title: '권고사직 실업급여 수급 조건 절차 | 합의서 작성법 2026',
    description: '권고사직은 비자발적 이직으로 실업급여 수급 대상이에요. 합의서 필수 항목, 이직확인서 확인 포인트, 신청 절차를 정리했어요.',
    keywords: [
      '권고사직 실업급여 수급 조건',
      '권고사직 실업급여 절차',
      '권고사직 합의서 작성법',
      '권고사직 실업급여 신청 방법',
    ],
    ogTitle: '권고사직 실업급여 수급 조건 절차 합의서 작성법 | 머니위키',
    ogDescription: '권고사직 실업급여 조건과 합의서 핵심 항목을 확인하세요.',
  },

  hub: {
    url: '/w/실업급여-퇴사유형별-수급-자격-권고사직-자진퇴사-해고',
    name: '실업급여 퇴사유형별 수급 자격 비교',
  },

  breadcrumb: ['고용·노동', '실업급여', '권고사직 실업급여'],

  summary3: [
    <>권고사직은 <strong>비자발적 이직</strong>으로 실업급여 수급 대상이에요</>,
    <>이직확인서에 <strong>&apos;권고사직(비자발적)&apos;</strong> 기재 여부를 꼭 확인해야 해요</>,
    <>2026년 구직급여 일 상한액 <strong>68,100원</strong>, 하한액 <strong>66,048원</strong></>,
  ],

  sourceBar: {
    badge: '출처',
    name: '고용보험법 · 고용노동부 2026년 고시',
    date: '2026.01',
  },

  prevNext: {
    next: { title: '자진퇴사 실업급여 예외 사유 정리', href: '/w/자진퇴사-자발적-퇴사-실업급여-예외-사유' },
  },

  stickyBar: {
    topLabel: '구직급여 일 상한액',
    value: '68,100원',
    buttonText: '신청 절차 보기 →',
    scrollTo: '#s3',
  },

  hero: {
    badge: '2026년 기준',
    h1: (
      <>
        <span className="text-[#1E3A5F]">권고사직</span> 실업급여 수급 조건과 합의서 작성법
      </>
    ),
    intro: (
      <p className="text-base text-neutral-500 leading-relaxed">
        갑자기 권고사직 통보를 받으셨다면 당황스러울 수 있어요. 권고사직은 <strong>비자발적 이직</strong>이라서 실업급여를 받을 수 있는데, 합의서와 이직확인서를 제대로 챙기는 게 핵심이에요. <a href="/w/실업급여-퇴사유형별-수급-자격-권고사직-자진퇴사-해고" className="text-[#4A7AB5] underline">퇴사 유형별 수급 자격</a>을 비교하면 내 상황이 더 명확해져요. 먼저 수급 조건부터 살펴볼게요.
      </p>
    ),
    hubCTA: {
      badge: '전체 비교',
      desc: '퇴사 유형별 실업급여 수급 자격 한눈에 비교',
    },
  },

  toc: [
    { id: 's1', label: '권고사직 실업급여 수급 조건은 어떻게 되나요?' },
    { id: 's2', label: '권고사직 합의서는 어떻게 작성하나요?' },
    { id: 's3', label: '권고사직 실업급여 신청 절차는 어떻게 되나요?' },
    { id: 's4', label: '권고사직 실업급여 금액은 얼마나 받나요?' },
    { id: 's-faq', label: '자주 묻는 질문' },
  ],

  sections: [
    // ═══ SECTION 01: 수급 조건 ═══
    {
      id: 's1',
      number: 'SECTION 01',
      heading: '권고사직 실업급여 수급 조건은 어떻게 되나요?',
      subtitle: '비자발적 이직 + 피보험기간 180일 + 구직 의사 3가지를 충족해야 해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            권고사직은 회사가 경영 악화나 구조조정 등의 이유로 퇴직을 권유하는 거예요. 근로자 본인이 먼저 그만둔 <a href="/w/자진퇴사-자발적-퇴사-실업급여-예외-사유" className="text-[#4A7AB5] underline">자진퇴사</a>와 달리 <strong>비자발적 이직</strong>으로 분류돼요. 실업급여를 받으려면 3가지 조건을 모두 갖춰야 해요.
          </p>

          <SpokeCompareCards
            cards={[
              {
                title: '비자발적 이직',
                subtitle: '회사 귀책 사유로 퇴직',
                items: [
                  '권고사직 = 비자발적 이직',
                  '이직확인서에 사유 기재 필수',
                  '사측 권유 사실 입증 가능해야 함',
                ],
                recommended: true,
                recLabel: '핵심 조건',
              },
              {
                title: '자발적 이직',
                subtitle: '본인 의사로 퇴직',
                items: [
                  '원칙적으로 실업급여 수급 불가',
                  '정당한 사유 12가지 예외 존재',
                  '임금체불·괴롭힘 등 증빙 필요',
                ],
              },
            ]}
          />

          <SpokeRateBars
            bars={[
              { label: '피보험기간', rate: '180일 이상', width: '60%' },
              { label: '이직 사유', rate: '비자발적', width: '80%' },
              { label: '구직 의사', rate: '적극적 구직활동', width: '100%' },
            ]}
          />

          <TipBox title="피보험기간 180일은 어떻게 계산하나요?">
            이직일 이전 18개월 동안 고용보험에 가입한 날을 합산해요. 주 5일 근무자라면 약 6~7개월 정도 일하면 충족돼요. 유급휴일(주휴일, 공휴일)도 피보험기간에 포함돼요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '합의서',
        title: '합의서를 잘못 쓰면 실업급여를 못 받을 수도 있어요',
        desc: '권고사직 합의서에 반드시 들어가야 하는 5가지 항목을 확인하세요.',
        icon: 'info',
      },
    },

    // ═══ SECTION 02: 합의서 작성법 ═══
    {
      id: 's2',
      number: 'SECTION 02',
      heading: '권고사직 합의서는 어떻게 작성하나요?',
      subtitle: '퇴직 사유, 퇴직일, 퇴직금, 위로금, 이직확인서 5가지가 핵심이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            사실 많은 분이 합의서 없이 구두로만 권고사직을 진행하다가 나중에 문제가 생겨요. 회사가 이직확인서에 &apos;자발적 퇴사&apos;로 기재하면 실업급여를 못 받게 되거든요. 그래서 합의서를 반드시 서면으로 남겨야 해요.
          </p>

          <SpokeTable
            id="tbl-agreement"
            title="권고사직 합의서 필수 기재 항목"
            subtitle="고용노동부 권장 사항 기준"
            headers={['항목', '기재 내용', '주의사항']}
            rows={[
              ['퇴직 사유', '회사 경영상 사유에 의한 권고사직', '"사측 권고"임을 명확히 표기'],
              ['퇴직 예정일', '20XX년 X월 X일', '구체적 날짜 명시 필수'],
              ['퇴직금', '근로기준법에 따른 퇴직금 지급', '지급 시기·금액 명시'],
              ['위로금', '별도 합의금 (있는 경우)', '세전·세후 구분 표기'],
              ['이직확인서', '비자발적 이직으로 기재 약속', '가장 중요한 항목'],
            ]}
            highlightCol={2}
          />

          <TipBox title="이직확인서가 왜 가장 중요한가요?">
            고용센터는 이직확인서의 퇴직 사유를 기준으로 실업급여 수급 자격을 판단해요. 합의서에 &apos;비자발적 이직으로 이직확인서를 작성한다&apos;는 문구가 있으면 나중에 회사가 사유를 바꾸더라도 증거로 활용할 수 있어요.
          </TipBox>
        </>
      ),
      pasBridge: {
        href: '/w/자진퇴사-자발적-퇴사-실업급여-예외-사유',
        question: '혹시 자진퇴사처럼 처리됐는데 실업급여를 받을 수 있는 방법이 있을까요?',
        answer: <>임금체불, 직장 내 괴롭힘 등 <strong>정당한 이직 사유 12가지</strong>에 해당하면 자진퇴사도 실업급여를 받을 수 있어요.</>,
        buttonText: '자진퇴사 예외 사유 확인 →',
      },
    },

    // ═══ SECTION 03: 신청 절차 ═══
    {
      id: 's3',
      number: 'SECTION 03',
      heading: '권고사직 실업급여 신청 절차는 어떻게 되나요?',
      subtitle: '워크넷 구직등록 → 온라인 교육 → 고용센터 방문 순서예요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            퇴사 후 바로 신청하는 게 좋아요. 이직일 다음 날부터 12개월 이내에 신청해야 하고, 늦으면 수급 기간이 줄어들 수 있어요. 전체 절차는 크게 5단계로 나뉘어요.
          </p>

          <FormulaBox
            lines={[
              { text: '실업급여 신청 타이밍', comment: true },
              { text: '이직일 다음 날 ~ 12개월 이내 신청' },
            ]}
          />

          <SpokeFlow
            steps={[
              { icon: '📋', label: '워크넷 구직등록', sub: 'work.go.kr' },
              { icon: '🎓', label: '수급자격 교육', sub: '온라인 약 1시간' },
              { icon: '🏢', label: '고용센터 방문', sub: '수급자격 인정' },
              { icon: '🔍', label: '구직활동', sub: '4주마다 1회' },
              { icon: '💰', label: '급여 수령', sub: '4주 단위 입금' },
            ]}
          />

          <Steps
            items={[
              { title: '워크넷(work.go.kr) 구직등록', desc: '이직 후 가장 먼저 워크넷에 접속해서 구직등록을 해요. 이력서 등록까지 완료해야 다음 단계로 넘어갈 수 있어요.' },
              { title: '고용보험 홈페이지에서 수급자격 신청자 교육 이수', desc: '온라인으로 약 1시간 교육을 수강해요. 실업급여 제도, 구직활동 방법 등을 안내받아요.' },
              { title: '관할 고용센터 방문 — 수급자격 인정 신청', desc: '신분증, 이직확인서(회사가 제출), 통장 사본을 준비해서 방문해요. 수급자격 인정까지 약 2주 소요돼요.' },
              { title: '실업 인정(구직활동 확인) — 4주마다 1회', desc: '4주에 한 번씩 고용센터를 방문하거나 온라인으로 구직활동 내역을 보고해요. 입사 지원, 면접, 직업훈련 등이 인정돼요.' },
              { title: '구직급여 수령', desc: '실업 인정일로부터 약 2주 후에 등록한 통장으로 입금돼요. 4주 단위로 반복해서 받아요.' },
            ]}
          />
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '금액',
        title: '신청 절차를 알았으니, 실제로 얼마나 받는지 궁금하시죠?',
        desc: '피보험기간과 연령에 따라 수급 기간과 금액이 달라져요.',
        icon: 'calc',
      },
    },

    // ═══ SECTION 04: 금액·수급기간 ═══
    {
      id: 's4',
      number: 'SECTION 04',
      heading: '권고사직 실업급여 금액은 얼마나 받나요?',
      subtitle: '퇴직 전 3개월 평균임금의 60%, 일 66,048~68,100원이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            구직급여는 퇴직 전 3개월간 평균임금의 <strong>60%</strong>를 1일 기준으로 계산해요. 다만 상한액과 하한액이 정해져 있어서, 월급이 아주 높거나 낮더라도 일정 범위 안에서 받게 돼요.
          </p>

          <FormulaBox
            lines={[
              { text: '구직급여 일액 계산 공식', comment: true },
              { text: '구직급여 일액 = 퇴직 전 3개월 평균임금 ÷ 일수 × 60%' },
            ]}
          />

          <Chips
            items={[
              { icon: '📈', label: '일 상한액', value: '68,100원' },
              { icon: '📉', label: '일 하한액', value: '66,048원' },
              { icon: '💵', label: '월 환산(상한)', value: '약 204만원' },
              { icon: '📅', label: '최대 수급', value: '270일' },
            ]}
          />

          <SpokeTable
            id="tbl-duration"
            title="연령·피보험기간별 소정급여일수"
            subtitle="2019.10.1. 이후 이직자 기준 / 고용보험법 시행령"
            headers={['구분', '1년 미만', '1~3년', '3~5년', '5~10년', '10년 이상']}
            rows={[
              ['50세 미만', '120일', '150일', '180일', '210일', '240일'],
              ['50세 이상·장애인', '120일', '180일', '210일', '240일', '270일'],
            ]}
            highlightCol={5}
          />

          <SpokeChecklist
            items={[
              { text: '이직확인서에 "비자발적 이직" 기재 확인', done: true, note: '가장 중요한 확인 사항' },
              { text: '피보험기간 180일 이상 충족', done: true, note: '주 5일 근무 시 약 6~7개월' },
              { text: '워크넷 구직등록 완료', done: false, note: '이직 후 가장 먼저 할 일' },
              { text: '수급자격 신청자 온라인 교육 이수', done: false, note: '약 1시간 소요' },
              { text: '고용센터 방문하여 수급자격 인정 신청', done: false, note: '신분증 + 통장사본 지참' },
              { text: '4주마다 실업 인정(구직활동 보고)', done: false, note: '입사 지원·면접·훈련 등' },
            ]}
          />

          <TipBox title="권고사직 위로금(합의금)을 받으면 실업급여가 줄어드나요?">
            아니에요. 위로금은 실업급여 산정과 별개예요. 위로금을 받았더라도 실업급여는 정상적으로 수급할 수 있어요. 다만 위로금에 대한 세금(퇴직소득세 또는 기타소득세)은 별도로 발생할 수 있어요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '/w/실업급여-퇴사유형별-수급-자격-권고사직-자진퇴사-해고',
        badge: '전체 비교',
        title: '다른 퇴사 유형의 실업급여 조건도 궁금하신가요?',
        desc: '권고사직 외에 자진퇴사, 해고, 계약만료 등 퇴사 유형별 수급 자격을 한눈에 비교할 수 있어요.',
        icon: 'grid',
        primary: true,
      },
    },

    // ═══ FAQ ═══
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
      question: '권고사직 실업급여 대기기간은 며칠인가요?',
      answer: '권고사직은 비자발적 이직이므로 <strong>대기기간 7일</strong>만 적용돼요. 자발적 퇴사처럼 1~3개월 추가 대기가 없어요. 수급자격 인정 후 7일이 지나면 바로 구직급여를 받기 시작해요.',
    },
    {
      question: '권고사직인데 회사가 이직확인서를 안 써주면 어떻게 하나요?',
      answer: '고용센터에 <strong>이직확인서 미발급 신고</strong>를 하면 돼요. 고용노동부가 회사에 이직확인서 제출을 요구하고, 정당한 사유 없이 거부하면 과태료(최대 300만원)가 부과돼요.',
    },
    {
      question: '권고사직과 해고는 실업급여에서 어떤 차이가 있나요?',
      answer: '둘 다 비자발적 이직이라 실업급여 수급 가능해요. 다만 <strong>징계해고(중대 귀책사유)</strong>는 실업급여를 못 받을 수 있어요. 권고사직은 징계해고와 달리 근로자의 잘못이 아니므로 수급에 문제가 없어요.',
    },
    {
      question: '권고사직 후 바로 다른 회사에 취업하면 실업급여는 어떻게 되나요?',
      answer: '취업하면 구직급여는 중단돼요. 하지만 소정급여일수의 <strong>절반 이상</strong>을 남기고 재취업하면 <strong>조기재취업수당</strong>을 받을 수 있어요. 남은 급여일수의 50%를 일시금으로 지급해요.',
    },
  ],

  relatedSpokes: [
    { badge: '자진퇴사', title: '자진퇴사도 실업급여를 받을 수 있는 예외 사유', desc: '정당한 이직 사유 12가지와 증빙 서류', href: '/w/자진퇴사-자발적-퇴사-실업급여-예외-사유' },
    { badge: '해고', title: '해고·부당해고·징계해고 실업급여 수급 조건', desc: '해고 유형별 수급 가능 여부와 해고예고수당', href: '/w/해고-부당해고-징계해고-실업급여-해고예고수당' },
    { badge: '신청', title: '실업급여 신청 방법 절차 준비서류', desc: '워크넷 등록부터 구직활동 보고까지', href: '/w/실업급여-신청-방법-절차-준비서류' },
    { badge: '전체 비교', title: '퇴사유형별 실업급여 수급 자격 비교', desc: '권고사직·자진퇴사·해고·계약만료 한눈에', href: '/w/실업급여-퇴사유형별-수급-자격-권고사직-자진퇴사-해고' },
  ],

  sources: [
    { name: '고용보험법', url: 'https://www.law.go.kr/법령/고용보험법', org: '법제처' },
    { name: '실업급여 안내', url: 'https://www.ei.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePb0201Info.do', org: '고용보험' },
    { name: '구직급여 수급대상 안내', url: 'https://www.easylaw.go.kr/CSP/CnpClsMainBtr.laf?popMenu=ov&csmSeq=722&ccfNo=2&cciNo=1&cnpClsNo=1', org: '찾기쉬운 생활법령정보' },
    { name: '고용노동부 FAQ', url: 'https://www.moel.go.kr', org: '고용노동부' },
  ],
}

export default data
