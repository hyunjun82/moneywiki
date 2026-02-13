import type { SpokeData } from '@/data/spoke/types'
import {
  SpokeTable, TipBox, FormulaBox, WarnBox,
  Chips, SpokeLinks, Steps,
  SpokeChecklist, SpokeFlow,
} from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '실업급여-수급중-알바-취업-신고-기준',

  meta: {
    title: '실업급여 수급 중 알바 취업 신고 기준 감액 | 월 60시간 미만 조건',
    description: '실업급여 받으면서 알바해도 되는 조건과 소득 신고 방법을 정리했어요. 월 60시간 미만 기준과 감액 계산법을 확인하세요.',
    keywords: [
      '실업급여 수급 중 알바 가능',
      '실업급여 받으면서 취업 신고',
      '실업급여 알바 소득 감액 기준',
      '실업급여 수급 중 근로 미신고',
    ],
    ogTitle: '실업급여 수급 중 알바 취업 신고 기준 감액 | 머니위키',
    ogDescription: '실업급여 받으면서 알바, 월 60시간 미만이면 가능해요. 신고 방법과 감액 기준을 확인하세요.',
  },

  hub: {
    url: '/w/실업급여-수급중-취업-알바-상병급여-보호',
    name: '실업급여 수급 중 취업·알바·상병급여·수급권 보호',
  },

  breadcrumb: ['고용·노동', '실업급여', '수급 중 알바 취업 신고'],

  summary3: [
    <>실업급여 수급 중 알바는 <strong>월 60시간 미만</strong>(주 15시간 미만)이면 가능해요</>,
    <>알바 소득이 <strong>구직급여일액의 50%</strong>를 넘으면 초과분의 50%가 감액돼요</>,
    <>실업인정일에 <strong>반드시 취업 사실과 소득을 신고</strong>해야 부정수급을 피할 수 있어요</>,
  ],

  sourceBar: {
    badge: '출처',
    name: '고용보험법·고용보험법 시행규칙',
    date: '2026.01',
  },

  prevNext: {
    next: { title: '실업급여 중단·거부·수급정지 사유와 대처법', href: '/w/실업급여-중단-거부-수급정지-사유-대처' },
  },

  stickyBar: {
    topLabel: '수급 중 알바 허용 기준',
    value: '월 60시간 미만',
    buttonText: '신고 방법 보기 →',
    scrollTo: '#s3',
  },

  hero: {
    badge: '2026년 기준',
    h1: (
      <>
        실업급여 <span className="text-[#1E3A5F]">수급 중 알바</span> 취업 신고 기준과 감액 계산
      </>
    ),
    intro: (
      <p className="text-base text-neutral-500 leading-relaxed">
        실업급여 받는 중에 알바를 해도 될지 고민되셨다면 잘 오셨어요. <strong>월 60시간 미만</strong>이면 수급 자격을 유지하면서 근로할 수 있고, <a href="/w/실업급여-수급중-취업-알바-상병급여-보호" className="text-[#4A7AB5] underline">수급 중 관리 전체 가이드</a>에서 다른 주의사항도 함께 볼 수 있어요. 먼저 알바가 허용되는 조건부터 볼게요.
      </p>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '실업급여 수급 중 취업·상병급여·수급권 보호 총정리',
    },
  },

  toc: [
    { id: 's1', label: '실업급여 수급 중 알바 가능 조건은 어떻게 되나요?' },
    { id: 's2', label: '실업급여 알바 소득 감액 기준은 어떻게 계산하나요?' },
    { id: 's3', label: '실업급여 받으면서 취업 신고는 어떻게 하나요?' },
    { id: 's4', label: '실업급여 수급 중 근로 미신고 하면 어떻게 되나요?' },
    { id: 's-faq', label: '자주 묻는 질문' },
  ],

  sections: [
    {
      id: 's1',
      number: 'SECTION 01',
      heading: '실업급여 수급 중 알바 가능 조건은 어떻게 되나요?',
      subtitle: '월 60시간 미만 + 3개월 미만이 핵심이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            실업급여를 받는 중에도 알바를 할 수 있어요. 다만 고용보험법상 <strong>취업으로 인정되지 않는 범위</strong> 안에서만 가능해요. 핵심 기준은 근로시간과 근무 기간, 그리고 소득 금액 세 가지예요.
          </p>

          <SpokeTable
            id="tbl-work-criteria"
            title="실업급여 수급 중 취업 인정 기준"
            subtitle="고용보험법 시행규칙 기준"
            headers={['구분', '취업으로 인정되는 경우', '비취업 (수급 유지)']}
            rows={[
              ['근로시간', '월 60시간 이상 (주 15시간 이상)', '월 60시간 미만 (주 15시간 미만)'],
              ['근무기간', '3개월 이상 계속 근로', '3개월 미만 단기'],
              ['일용근로', '근로 제공한 날', '—'],
              ['소득기준', '구직급여일액 이상', '구직급여일액 미만'],
            ]}
            highlightCol={2}
          />

          <TipBox title="주 15시간 미만이라도 3개월 넘기면 안 돼요">
            주 14시간씩 일하더라도 <strong>3개월 이상</strong> 계속 근로하면 생업 목적 취업으로 간주돼요. 그러면 실업급여가 중단되니 기간 관리가 중요해요.
          </TipBox>

          <Chips
            items={[
              { icon: '🕐', label: '주간 근로', value: '15시간 미만' },
              { icon: '📅', label: '월간 근로', value: '60시간 미만' },
              { icon: '📆', label: '근무기간', value: '3개월 미만' },
              { icon: '💰', label: '일 소득', value: '급여일액 미만' },
            ]}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            일용근로의 경우에는 근로를 제공한 날 자체가 취업일로 인정돼요. 그날은 구직급여가 지급되지 않고 소정급여일수에서 차감돼요. 대신 나머지 날은 정상적으로 실업급여를 받을 수 있어요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '감액',
        title: '알바 소득이 있으면 실업급여가 깎이나요?',
        desc: '구직급여일액의 50%를 넘는 소득이 있으면 초과분만큼 감액돼요.',
        icon: 'calc',
      },
    },

    {
      id: 's2',
      number: 'SECTION 02',
      heading: '실업급여 알바 소득 감액 기준은 어떻게 계산하나요?',
      subtitle: '구직급여일액 50% 초과분의 50%가 감액돼요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            알바를 해서 소득이 생기면 그만큼 실업급여가 줄어드는 건 아닌지 걱정되잖아요. 실제로는 <strong>구직급여일액의 50%를 넘는 소득</strong>이 있을 때만 감액이 적용돼요. 소득이 아예 없거나 적으면 실업급여 전액을 받을 수 있어요.
          </p>

          <FormulaBox
            lines={[
              { text: '실업급여 감액 계산 공식', comment: true },
              { text: '감액분 = (1일 소득 − 구직급여일액 × 50%) × 50%' },
            ]}
          />

          <SpokeTable
            id="tbl-deduction-example"
            title="구직급여일액 66,000원 기준 감액 예시"
            subtitle="2026년 상한액 기준 / 일 소득별 감액 시뮬레이션"
            headers={['1일 알바 소득', '기준(일액 50%)', '초과금액', '감액분(50%)', '실수령 급여']}
            rows={[
              ['20,000원', '33,000원', '0원', '0원', '66,000원'],
              ['40,000원', '33,000원', '7,000원', '3,500원', '62,500원'],
              ['55,000원', '33,000원', '22,000원', '11,000원', '55,000원'],
              ['66,000원 이상', '33,000원', '33,000원+', '—', '미지급'],
            ]}
            highlightCol={4}
          />

          <WarnBox>
            1일 소득이 <strong>구직급여일액 이상</strong>이면 해당일의 실업급여는 아예 지급되지 않아요. 2026년 상한 기준으로 일 소득 <strong>66,000원 이상</strong>이면 그날은 실업급여가 0원이에요.
          </WarnBox>

          <TipBox title="감액이 적용되어도 수급일수는 줄어들어요">
            감액 지급된 날도 소정급여일수 1일로 차감돼요. <a href="/w/실업급여-수급기간-소정급여일수-기준" className="text-[#4A7AB5] underline">소정급여일수 기준</a>을 미리 확인하고 남은 일수를 관리하는 게 좋아요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '신고',
        title: '알바 소득은 언제, 어디에 신고해야 하나요?',
        desc: '실업인정일에 고용센터를 통해 취업 사실과 소득을 신고해요.',
        icon: 'check',
      },
    },

    {
      id: 's3',
      number: 'SECTION 03',
      heading: '실업급여 받으면서 취업 신고는 어떻게 하나요?',
      subtitle: '실업인정일에 고용24로 신고하면 돼요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            소득 감액 기준을 알았으니 이제 신고 방법이 궁금한 게 생기죠. 알바를 했거나 소득이 발생한 경우에는 <strong>실업인정일에 반드시 신고</strong>해야 해요. 온라인으로도 간편하게 할 수 있어요.
          </p>

          <Steps
            items={[
              { title: '고용24(work24.go.kr) 로그인', desc: '공동인증서, 간편인증, 카카오 인증 등으로 접속해요' },
              { title: '실업인정 신청서 작성', desc: '구직활동 내역과 함께 취업 여부, 근로일, 소득금액을 입력해요' },
              { title: '근로 내역 상세 기재', desc: '근로한 날짜, 사업장명, 근로시간, 받은 금액을 정확히 적어요' },
              { title: '실업인정 완료 후 감액 또는 정상 지급', desc: '고용센터에서 검토 후 해당 기간의 구직급여를 산정해요' },
            ]}
          />

          <SpokeFlow
            steps={[
              { icon: '💼', label: '알바 근로', sub: '소득 발생' },
              { icon: '📝', label: '실업인정일 신고', sub: '고용24 접속' },
              { icon: '🔍', label: '고용센터 검토', sub: '감액 산정' },
              { icon: '💵', label: '급여 지급', sub: '감액 또는 전액' },
            ]}
          />

          <TipBox title="실업인정일을 놓치면 어떡하나요?">
            지정된 <a href="/w/실업급여-실업인정-구직활동-방법" className="text-[#4A7AB5] underline">실업인정일</a>에 신고하지 못하면 해당 기간의 구직급여가 지급되지 않아요. 부득이한 사유가 있으면 고용센터에 사전 연락하세요.
          </TipBox>

          <p className="text-neutral-600 mb-4 leading-relaxed">
            일용근로의 경우에는 근로 제공일을 정확히 기재하면 돼요. 연속 근로일지 단발 근로인지에 따라 소득 산정 방식이 달라지니, 날짜별 근로시간과 금액을 꼼꼼히 기록해 두는 게 좋아요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '주의',
        title: '신고하지 않으면 어떤 불이익이 있나요?',
        desc: '미신고 적발 시 부정수급으로 최대 5배 추징금이 부과될 수 있어요.',
        icon: 'info',
      },
    },

    {
      id: 's4',
      number: 'SECTION 04',
      heading: '실업급여 수급 중 근로 미신고 하면 어떻게 되나요?',
      subtitle: '부정수급으로 최대 5배 추가징수와 형사처벌 대상이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            알바 소득을 신고하지 않거나 허위로 신고하면 <strong>부정수급</strong>에 해당해요. 부정수급이 적발되면 단순히 돈을 돌려주는 것으로 끝나지 않아요. 추가징수와 형사처벌까지 이어질 수 있기 때문이에요.
          </p>

          <SpokeChecklist
            items={[
              { text: '지급 즉시 중지 — 부정행위 적발 시점부터 실업급여 지급이 중단돼요', done: false },
              { text: '부정수급액 전액 반환 — 부정하게 받은 금액을 전부 돌려줘야 해요', done: false },
              { text: '추가징수 최대 5배 — 사업주와 공모 시 받은 금액의 5배까지 추징돼요', done: false, note: '1회 위반: 100%, 3회 이상: 150%, 5회 이상: 200%' },
              { text: '형사처벌 — 3년 이하 징역 또는 3,000만원 이하 벌금에 처해질 수 있어요', done: false },
            ]}
          />

          <SpokeTable
            id="tbl-penalty"
            title="부정수급 횟수별 추가징수 비율"
            subtitle="고용보험법 제62조 기준"
            headers={['위반 횟수', '1~2회', '3~4회', '5회 이상', '사업주 공모']}
            rows={[
              ['추가징수율', '100%', '150%', '200%', '최대 500%'],
            ]}
          />

          <TipBox title="자진신고하면 추가징수를 면제받을 수 있어요">
            조사가 시작되기 전에 <a href="/w/실업급여-부정수급-유형-제재-벌금-추징" className="text-[#4A7AB5] underline">자진신고</a>하면 추가징수와 형사처벌이 면제될 수 있어요. 실수로 신고를 빠뜨렸다면 빨리 고용센터에 연락하는 게 최선이에요.
          </TipBox>

          <p className="text-neutral-600 mb-4 leading-relaxed">
            부정수급 판정을 받으면 반환금과 추가징수금을 통보받은 날로부터 <strong>30일 이내</strong>에 납부해야 해요. 기한 내 납부가 어려우면 분할납부를 신청할 수도 있어요. 가장 좋은 방법은 처음부터 성실하게 신고하는 것이에요.
          </p>

          <SpokeLinks
            title="실업급여 수급 관리 더 알아보기"
            items={[
              { num: '01', heading: '실업급여 부정수급 유형과 제재·벌금 총정리', desc: '유형별 제재 기준과 자진신고 감면 방법', href: '/w/실업급여-부정수급-유형-제재-벌금-추징' },
              { num: '02', heading: '실업급여 중단·거부·수급정지 사유와 대처법', desc: '수급정지 6가지 사유와 재개 방법', href: '/w/실업급여-중단-거부-수급정지-사유-대처' },
              { num: '03', heading: '실업급여 실업인정 구직활동 방법', desc: '실업인정일 신고 절차와 구직활동 인정 기준', href: '/w/실업급여-실업인정-구직활동-방법' },
            ]}
          />
        </>
      ),
      bridgeCTA: {
        href: '/w/실업급여-수급중-취업-알바-상병급여-보호',
        badge: '전체 가이드',
        title: '실업급여 수급 중 알아야 할 것들이 더 있나요?',
        desc: '창업, 상병급여, 해외체류, 수급권 보호까지 한곳에서 확인하세요.',
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
    { question: '실업급여 수급 중 알바를 하루만 해도 신고해야 하나요?', answer: '<strong>네.</strong> 단 하루라도 근로를 제공하고 소득이 발생했으면 실업인정일에 반드시 신고해야 해요. 미신고 시 부정수급에 해당할 수 있어요.' },
    { question: '실업급여 받으면서 프리랜서 일을 해도 되나요?', answer: '프리랜서도 근로 제공에 해당해요. 월 60시간 미만이고 3개월 미만이면 수급 자격을 유지할 수 있지만, 소득은 반드시 신고해야 해요.' },
    { question: '실업급여 수급 중 알바로 번 돈이 적으면 감액 안 되나요?', answer: '1일 소득이 <strong>구직급여일액의 50% 이하</strong>면 감액 없이 전액 지급돼요. 2026년 상한 기준으로 일 33,000원 이하면 감액이 없어요.' },
    { question: '실업급여 수급 중 무급 봉사활동도 신고해야 하나요?', answer: '무급 봉사활동은 소득이 없으므로 취업으로 인정되지 않아요. 다만 구직활동으로 인정받으려면 별도로 <strong>구직활동 내역</strong>에 기재하는 게 좋아요.' },
    { question: '알바 때문에 실업급여가 중단되면 나중에 다시 받을 수 있나요?', answer: '취업으로 실업급여가 중단된 후 다시 퇴직하면, 남은 소정급여일수가 있고 수급기한(이직일 다음 날부터 <strong>12개월</strong>) 내라면 잔여분을 다시 받을 수 있어요.' },
  ],

  relatedSpokes: [
    { badge: '중단', title: '실업급여 중단·거부·수급정지 사유와 대처법', desc: '수급정지 6가지 사유와 재개 방법', href: '/w/실업급여-중단-거부-수급정지-사유-대처' },
    { badge: '부정수급', title: '실업급여 부정수급 유형 제재 벌금 추징', desc: '부정수급 유형과 자진신고 감면', href: '/w/실업급여-부정수급-유형-제재-벌금-추징' },
    { badge: '실업인정', title: '실업급여 실업인정 구직활동 방법', desc: '실업인정 절차와 구직활동 인정 기준', href: '/w/실업급여-실업인정-구직활동-방법' },
    { badge: '창업', title: '실업급여 수급 중 창업 자격 유지 조건', desc: '사업자등록 시점별 수급 영향', href: '/w/실업급여-수급중-창업-자격-유지-조건' },
    { badge: '수급기간', title: '실업급여 수급기간 소정급여일수 기준', desc: '나이·근속별 수급기간 확인', href: '/w/실업급여-수급기간-소정급여일수-기준' },
  ],

  sources: [
    { name: '고용보험법', url: 'https://www.law.go.kr/법령/고용보험법', org: '법제처' },
    { name: '실업급여 안내', url: 'https://www.ei.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePb0201Info.do', org: '고용보험' },
    { name: '찾기쉬운 생활법령 실업급여', url: 'https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=722', org: '법제처' },
  ],
}

export default data
