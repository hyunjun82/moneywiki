import type { SpokeData } from '@/data/spoke/types'
import {
  SpokeTable, TipBox, FormulaBox, WarnBox,
  Chips, DetailBox, SpokeLinks, Steps,
  SpokeTimeline, SpokeStepCards, SpokeCompareCards,
  SpokeRateBars, SpokeFlow, SpokeChecklist, SpokeWarnBox,
} from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '실업급여-중단-거부-수급정지-사유-대처',

  meta: {
    title: '실업급여 중단 수급정지 사유 6가지 | 거부 처분 대처법',
    description: '실업급여가 갑자기 중단됐다면 수급정지 사유를 확인하세요. 직업소개 거부 2주, 훈련 거부 4주 정지 기간과 12개월 수급기한, 이의신청 방법까지 정리했어요.',
    keywords: [
      '실업급여 중단 사유 종류',
      '실업급여 거부 수급정지 처리',
      '실업급여 12개월 수급기한 제한',
      '실업급여 수급자격 제한 해제',
    ],
    ogTitle: '실업급여 중단 수급정지 사유 6가지와 대처법 | 머니위키',
    ogDescription: '수급정지 6가지 사유와 12개월 기한 규정, 재개 방법을 확인하세요.',
  },

  hub: {
    url: '/w/실업급여-수급중-취업-알바-상병급여-보호',
    name: '실업급여 수급 중 취업·알바·상병급여·수급권 보호',
  },

  breadcrumb: ['고용·노동', '실업급여', '수급정지 사유 대처'],

  summary3: [
    <>실업급여 수급정지는 직업소개·훈련·직업지도 거부 시 <strong>2주~4주</strong> 동안 급여가 멈춰요</>,
    <>수급기한은 이직일 다음 날부터 <strong>12개월</strong>이고, 이 기간이 지나면 잔여일수가 소멸해요</>,
    <>부당한 수급정지에는 <strong>90일 이내 심사청구</strong>로 이의를 제기할 수 있어요</>,
  ],

  sourceBar: {
    badge: '출처',
    name: '고용보험법 제48조·제58조·제60조',
    date: '2026.02',
  },

  prevNext: {
    prev: { title: '실업급여 수급 중 알바 취업 신고 기준', href: '/w/실업급여-수급중-알바-취업-신고-기준' },
    next: { title: '실업급여 상병급여 질병 부상 수급 전환', href: '/w/실업급여-상병급여-질병-부상-수급-전환' },
  },

  stickyBar: {
    topLabel: '수급정지 기간',
    value: '최대 4주',
    buttonText: '대처법 보기 →',
    scrollTo: '#s4',
  },

  hero: {
    badge: '2026년 기준',
    h1: (
      <>
        실업급여 <span className="text-[#1E3A5F]">중단·수급정지</span> 사유 6가지와 대처법
      </>
    ),
    intro: (
      <p className="text-base text-neutral-500 leading-relaxed">
        잘 받고 있던 실업급여가 갑자기 끊겼다면, 수급정지 사유부터 확인해야 해요. <a href="/w/실업급여-수급중-취업-알바-상병급여-보호" className="text-[#4A7AB5] underline">실업급여 수급 중 관리 가이드</a>에서 전체 흐름을 먼저 보셔도 좋아요. 직업소개 거부 <strong>2주</strong>, 훈련 거부 <strong>4주</strong> 정지부터 12개월 수급기한까지, 먼저 어떤 경우에 중단되는지부터 볼게요.
      </p>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '실업급여 수급 중 취업·알바·상병급여·수급권 보호 총정리',
    },
  },

  toc: [
    { id: 's1', label: '실업급여 중단 사유에는 어떤 종류가 있나요?' },
    { id: 's2', label: '실업급여 거부 수급정지 처리는 어떻게 되나요?' },
    { id: 's3', label: '실업급여 12개월 수급기한 제한이 뭔가요?' },
    { id: 's4', label: '실업급여 수급자격 제한을 해제할 수 있나요?' },
    { id: 's-faq', label: '자주 묻는 질문' },
  ],

  sections: [
    {
      id: 's1',
      number: 'SECTION 01',
      heading: '실업급여 중단 사유에는 어떤 종류가 있나요?',
      subtitle: '크게 수급자격 제한과 수급정지 2가지로 나뉘어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            실업급여가 끊기는 이유는 크게 두 가지예요. 하나는 처음부터 <strong>수급자격 자체가 제한</strong>되는 경우이고, 다른 하나는 수급 도중 특정 행위로 <strong>일시 정지</strong>되는 경우예요. 수급자격 제한은 <a href="/w/실업급여-수급-조건-자격-요건-완벽정리" className="text-[#4A7AB5] underline">고용보험법 제58조</a>에서, 수급정지는 제60조에서 규정하고 있어요. 각각의 사유를 정확히 알아야 대처가 가능해요.
          </p>

          <SpokeCompareCards
            cards={[
              {
                title: '수급자격 제한 (제58조)',
                subtitle: '처음부터 자격이 인정 안 되는 경우',
                items: [
                  '중대 귀책사유로 해고 (횡령·무단결근 등)',
                  '정당한 사유 없는 자발적 이직',
                  '형법·직무 관련 법률 위반 해고',
                ],
              },
              {
                title: '수급정지 (제60조)',
                subtitle: '수급 중 일시적으로 급여가 멈추는 경우',
                items: [
                  '고용센터 직업소개 거부',
                  '직업능력개발훈련 지시 거부',
                  '재취업 촉진 직업지도 거부',
                ],
                recommended: true,
                recLabel: '이 글의 주제',
              },
            ]}
          />

          <TipBox title="수급자격 제한과 수급정지는 완전히 달라요">
            수급자격 제한은 실업급여를 아예 못 받는 거예요. 수급정지는 일정 기간만 멈추고 이후 다시 받을 수 있어요. 지금 받던 중 끊겼다면 수급정지에 해당할 가능성이 높아요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '정지',
        title: '그럼 수급정지되면 얼마나 오래 못 받는 걸까요?',
        desc: '직업소개 거부 2주, 훈련 거부 4주 등 사유별 정지 기간이 달라요.',
        icon: 'clock',
      },
    },

    {
      id: 's2',
      number: 'SECTION 02',
      heading: '실업급여 거부 수급정지 처리는 어떻게 되나요?',
      subtitle: '사유별로 2주 또는 4주간 급여가 정지돼요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            고용센터에서 직업을 소개하거나 훈련을 지시했는데 거부하면, 그날부터 일정 기간 동안 실업급여를 못 받아요. 정지 기간 동안에는 <a href="/w/실업급여-실업인정-구직활동-방법" className="text-[#4A7AB5] underline">실업인정</a> 자체가 되지 않아요. 다만 정당한 사유가 있으면 정지되지 않으니, 사유를 꼼꼼히 확인해 보세요.
          </p>

          <SpokeTable
            id="tbl-period"
            title="수급정지 사유별 기간"
            subtitle="고용보험법 제60조, 시행령 제79조 기준"
            headers={['정지 사유', '정지 기간', '근거 조항']}
            rows={[
              ['직업소개 거부', '거부일부터 2주', '제60조 제1항'],
              ['직업지도 거부', '거부일부터 2주', '제60조 제3항'],
              ['직업능력개발훈련 거부', '거부일부터 4주', '제60조 제2항'],
            ]}
            highlightCol={1}
          />

          <DetailBox
            title="수급정지가 면제되는 정당한 사유"
            items={[
              { heading: '능력에 맞지 않는 직종', desc: '소개받은 직업이 본인의 경력·기술·자격과 맞지 않는 경우예요' },
              { heading: '주거 이전이 곤란한 경우', desc: '취직을 위해 이사해야 하지만 가족 사정 등으로 이전이 어려운 경우예요' },
              { heading: '임금이 20% 이상 낮은 경우', desc: '같은 지역·같은 직종의 통상 임금보다 20% 넘게 낮으면 거부할 수 있어요' },
            ]}
          />

          <WarnBox>
            정지 기간 중에도 <strong>12개월 수급기한은 계속 흘러가요.</strong> 정지 2주가 지나도 수급기한이 연장되지는 않으니 주의하세요.
          </WarnBox>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '기한',
        title: '12개월 수급기한이 지나면 남은 급여는 어떻게 되나요?',
        desc: '소정급여일수가 남아 있어도 12개월이 지나면 소멸해요.',
        icon: 'clock',
      },
    },

    {
      id: 's3',
      number: 'SECTION 03',
      heading: '실업급여 12개월 수급기한 제한이 뭔가요?',
      subtitle: '이직일 다음 날부터 12개월이 지나면 잔여일수가 사라져요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            실업급여는 퇴직하고 나서 무한정 받을 수 있는 게 아니에요. <a href="/w/실업급여-수급기간-소정급여일수-기준" className="text-[#4A7AB5] underline">소정급여일수</a>가 아무리 많이 남아 있어도, 이직일 다음 날부터 <strong>12개월</strong>이 지나면 더 이상 받을 수 없어요. 이걸 수급기한이라고 해요.
          </p>

          <FormulaBox
            lines={[
              { text: '실업급여 수급기한 계산', comment: true },
              { text: '수급기한 = 이직일 다음 날 ~ 12개월째 날' },
            ]}
          />

          <SpokeTimeline
            events={[
              { month: '퇴직일', title: '이직일 확정', desc: '마지막 근무일이 이직일이에요' },
              { month: '퇴직 다음날', title: '수급기한 시작', desc: '12개월 카운트가 시작돼요', status: 'current' },
              { month: '7일 후', title: '대기기간 종료', desc: '첫 7일은 급여가 나오지 않아요' },
              { month: '수급 중', title: '실업인정 반복', desc: '1~4주 단위로 실업인정을 받아요' },
              { month: '12개월째', title: '수급기한 만료', desc: '잔여일수와 관계없이 수급이 종료돼요', status: 'warning' },
            ]}
          />

          <TipBox title="수급기한 연장이 가능한 예외 사유도 있어요">
            임신·출산·육아, 7일 이상 질병·부상 등으로 취업이 불가능한 경우 고용센터에 사전 신고하면 최대 <strong>4년</strong>까지 수급기한을 연장할 수 있어요. 고용보험법 제50조에 해당해요.
          </TipBox>

          <Chips
            items={[
              { icon: '📅', label: '수급기한', value: '12개월', href: '#s3' },
              { icon: '⏸️', label: '연장 한도', value: '최대 4년' },
              { icon: '⏳', label: '대기기간', value: '첫 7일', href: '/w/실업급여-지급일-첫-입금일-대기기간' },
              { icon: '📝', label: '연장 신고', value: '고용센터' },
            ]}
          />
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '대처',
        title: '부당하게 수급이 정지됐다면 어떻게 해야 할까요?',
        desc: '이의신청과 심사청구로 수급자격 제한을 해제할 수 있어요.',
        icon: 'info',
      },
    },

    {
      id: 's4',
      number: 'SECTION 04',
      heading: '실업급여 수급자격 제한을 해제할 수 있나요?',
      subtitle: '90일 이내 심사청구와 재심사청구로 이의를 제기할 수 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            고용센터의 수급정지나 자격 제한 결정이 부당하다고 느껴지면, 포기하지 말고 이의를 제기할 수 있어요. <a href="/w/실업급여-이의신청-심사청구-재심사-불복-절차" className="text-[#4A7AB5] underline">심사청구와 재심사청구</a> 2단계 불복 절차가 마련되어 있어요. 처분을 안 날부터 <strong>90일 이내</strong>에 신청해야 해요.
          </p>

          <Steps
            items={[
              { title: '수급정지 사유 확인', desc: '고용24 또는 관할 고용센터에서 정확한 정지 사유와 기간을 확인하세요' },
              { title: '정당한 사유 소명 자료 준비', desc: '임금 수준 비교표, 통근 거리 증빙, 직종 불일치 사유서 등을 모아요' },
              { title: '심사청구 (1차)', desc: '처분을 안 날부터 90일 이내에 고용보험심사관에게 심사청구서를 제출해요' },
              { title: '재심사청구 (2차)', desc: '심사 결정에 불복 시 고용보험심사위원회에 재심사를 청구할 수 있어요' },
              { title: '행정소송 (최종)', desc: '재심사 결정에도 불복 시 행정법원에 소송을 제기할 수 있어요' },
            ]}
          />

          <SpokeChecklist
            items={[
              { text: '수급정지 통보서 수령 및 사유 확인', done: false },
              { text: '정당한 사유 증빙 서류 확보', done: false, note: '임금 수준, 통근 거리, 직종 관련 자료' },
              { text: '처분일로부터 90일 이내 심사청구서 작성', done: false },
              { text: '고용보험심사관에게 심사청구서 제출', done: false, note: '온라인(고용24) 또는 관할 고용센터 방문' },
              { text: '심사 결과 확인 및 필요 시 재심사청구', done: false },
            ]}
          />

          <SpokeWarnBox title="수급정지 기간이 끝나면 자동으로 재개돼요">
            수급정지는 영구 중단이 아니에요. 직업소개 거부로 2주 정지됐다면, 2주가 지나면 다시 실업인정을 받고 급여를 수령할 수 있어요. 단, 정지 기간 중 소정급여일수는 줄지 않지만 12개월 수급기한은 계속 진행되니까 빠르게 대응하는 게 좋아요.
          </SpokeWarnBox>
        </>
      ),
      bridgeCTA: {
        href: '/w/실업급여-수급중-취업-알바-상병급여-보호',
        badge: '가이드',
        title: '실업급여 수급 중 관리 전체 가이드 보기',
        desc: '취업·알바·상병급여·수급권 보호까지 한 번에 확인하세요.',
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
    { question: '실업급여 수급정지되면 소정급여일수도 줄어드나요?', answer: '아니요, <strong>수급정지 기간은 소정급여일수에서 차감되지 않아요.</strong> 단, 12개월 수급기한은 계속 흘러가기 때문에 정지 기간만큼 실질적으로 받을 수 있는 기간이 줄어들 수 있어요.' },
    { question: '직업소개를 한 번 거부하면 바로 수급정지 되나요?', answer: '<strong>네, 정당한 사유 없이 거부하면 1회라도 수급정지 처분을 받아요.</strong> 다만 소개된 직업이 본인 능력에 맞지 않거나 임금이 통상의 20% 이상 낮으면 정당한 사유로 인정돼요.' },
    { question: '실업급여 수급기한 12개월이 지나면 재신청할 수 있나요?', answer: '12개월이 지나면 해당 수급자격으로는 더 이상 받을 수 없어요. 다만 <strong>새 직장에서 180일 이상 근무 후 비자발적 퇴직</strong>하면 새로운 수급자격으로 재신청이 가능해요.' },
    { question: '수급정지 중에도 실업인정 출석은 해야 하나요?', answer: '수급정지 기간에는 <strong>실업인정이 되지 않으므로 출석할 필요가 없어요.</strong> 정지 기간이 끝나면 다음 실업인정일에 맞춰 출석하면 돼요. 정확한 날짜는 고용센터에서 안내받으세요.' },
    { question: '부정수급과 수급정지는 어떻게 다른가요?', answer: '수급정지는 직업소개·훈련 거부 시 <strong>일시적으로 급여가 멈추는 것</strong>이에요. 부정수급은 거짓 신고로 급여를 탄 것이라 <strong>전액 환수 + 최대 5배 추가징수</strong>까지 부과돼요. 제재 수준이 완전히 달라요.' },
  ],

  relatedSpokes: [
    { badge: '알바', title: '실업급여 수급 중 알바 취업 신고 기준', desc: '월 60시간 미만 기준과 소득 신고 방법', href: '/w/실업급여-수급중-알바-취업-신고-기준' },
    { badge: '이의신청', title: '실업급여 이의신청 심사청구 재심사 불복 절차', desc: '90일 이내 심사청구와 행정소송 절차', href: '/w/실업급여-이의신청-심사청구-재심사-불복-절차' },
    { badge: '부정수급', title: '실업급여 부정수급 유형 제재 벌금 추징', desc: '부정수급 유형과 최대 5배 추가징수', href: '/w/실업급여-부정수급-유형-제재-벌금-추징' },
    { badge: '상병급여', title: '실업급여 상병급여 질병 부상 수급 전환', desc: '7일 이상 질병·부상 시 상병급여 전환', href: '/w/실업급여-상병급여-질병-부상-수급-전환' },
    { badge: '수급기간', title: '실업급여 수급기간 소정급여일수 기준', desc: '나이·근속별 소정급여일수 120~270일', href: '/w/실업급여-수급기간-소정급여일수-기준' },
  ],

  sources: [
    { name: '고용보험법 제48조·제58조·제60조', url: 'https://www.law.go.kr/법령/고용보험법', org: '법제처' },
    { name: '구직급여 수급·수급정지 안내', url: 'https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=722&ccfNo=2&cciNo=3&cnpClsNo=3', org: '찾기쉬운 생활법령정보' },
    { name: '고용노동부 실업급여 안내', url: 'https://www.moel.go.kr', org: '고용노동부' },
  ],
}

export default data
