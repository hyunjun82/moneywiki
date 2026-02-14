import Link from 'next/link'
import type { SpokeData } from './types'
import { SpokeTable, SpokeTimeline, SpokeStepCards, SpokeCompareCards, RateCards, TipBox, SpokeFlow, SpokeWarnBox, SpokeChecklist } from '@/components/spoke/SpokeBlocks'

// --- Table data ---
const SUPPORT_AMOUNT_ROWS = [
  ['1인 가구', '713,102원'],
  ['2인 가구', '1,178,435원'],
  ['3인 가구', '1,508,690원'],
  ['4인 가구', '1,833,572원'],
  ['5인 가구', '2,142,635원'],
  ['6인 가구', '2,437,878원'],
]

// --- Spoke Data ---
const data: SpokeData = {
  slug: '긴급복지-생계지원-신청-조건-금액',

  meta: {
    title: '긴급복지 생계지원 조건과 신청 방법 | 금액',
    description: '갑자기 소득이 끊겼을 때 정부가 생활비를 먼저 지급하는 긴급복지 생계지원, 위기사유 조건부터 가구별 금액, 신청 방법까지 정리해드려요.',
    keywords: ['긴급복지 생계지원 신청', '긴급복지 생계지원 조건', '긴급복지 생계지원 금액', '긴급복지 신청 방법'],
    ogTitle: '긴급복지 생계지원 조건과 신청 방법 | 금액 | 머니위키',
    ogDescription: '위기상황 발생 시 선지원 후심사로 생활비를 먼저 받는 방법.',
  },

  hub: {
    url: '',
    name: '',
  },

  breadcrumb: ['복지', '긴급복지지원'],

  hero: {
    badge: '2026년 기준',
    h1: <><span className="text-[#1E3A5F]">긴급복지 생계지원</span> 조건과 신청 방법</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          1인가구 기준 월 713,102원, 4인가구 기준 월 1,833,572원을 생활비로 먼저 받을 수 있어요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          <strong className="text-neutral-800">긴급복지 생계지원</strong>은 갑작스러운 위기 상황에서 자격 심사 전에 먼저 지급하는 제도예요. <a href="https://www.law.go.kr/법령/긴급복지지원법" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">긴급복지지원법</a> 근거예요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          어떤 상황에서 받을 수 있고, 얼마를 받는지, 신청은 어떻게 하는지 순서대로 정리했어요.
        </p>
      </>
    ),
    quickAnswer: {
      title: '긴급복지 생계지원 핵심 답변',
      body: '주소득자 사망, 중한 질병, 화재 등 위기사유가 발생하면 신청할 수 있어요. 1인가구 기준 월 713,102원이고, 129에 전화하면 바로 접수돼요.',
      hook: '아래에서 위기사유별 조건과 신청 절차를 확인하세요.',
    },
    hubCTA: {
      badge: '복지',
      desc: '복지 제도 전체 보기',
    },
  },

  toc: [
    { id: 's1', text: '긴급복지 생계지원 조건은 뭔가요?' },
    { id: 's2', text: '긴급복지 생계지원 금액은 얼마인가요?' },
    { id: 'tbl1', text: '가구규모별 지원금액 표', sub: true },
    { id: 's3', text: '긴급복지 생계지원 신청은 어떻게 하나요?' },
    { id: 's4', text: '긴급복지 생계지원 기간과 연장은 어떻게 되나요?' },
    { id: 's5', text: '긴급복지 생계지원 자주 묻는 질문' },
  ],

  sections: [
    // --- Section 01: 조건 → SpokeChecklist + TipBox ---
    {
      id: 's1',
      number: '01',
      heading: '긴급복지 생계지원 조건은 뭔가요?',
      subtitle: '갑작스러운 위기사유가 발생해야 신청할 수 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            <strong>긴급복지 생계지원</strong>은 아무나 받을 수 있는 게 아니에요. <a href="https://www.law.go.kr/법령/긴급복지지원법" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">긴급복지지원법 제2조</a>에서 정한 위기사유에 해당해야 해요.
            핵심은 "갑작스러운 위기"라는 거예요. 만성적으로 소득이 부족한 경우는 <a href="/w/기초생활수급자-조건-총정리">기초생활보장 제도</a>가 맞아요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            대표적인 위기사유를 보면, 주소득자가 사망하거나 가출해서 행방불명된 경우가 첫 번째예요. 그리고 주소득자가 중한 질병이나 부상을 당해서 일을 못 하게 된 경우도 해당돼요.
          </p>
          <SpokeChecklist items={[
            { text: '주소득자 사망, 가출, 행방불명', done: true },
            { text: '주소득자 중한 질병 또는 부상', done: true },
            { text: '가구원에 대한 가정폭력, 성폭력', done: true },
            { text: '화재, 자연재해 등으로 거주 불가', done: true },
            { text: '실직, 사업 실패로 소득 단절', done: true },
            { text: '그 밖에 보건복지부 장관이 정한 사유', done: false, note: '지자체별 추가 사유 있음' },
          ]} />
          <p className="text-neutral-600 mt-4 mb-4 leading-relaxed">
            여기서 중요한 건 소득과 재산 기준도 함께 본다는 거예요. 소득은 기준 중위소득 75% 이하, 재산은 대도시 기준 2억 4,100만원 이하여야 해요.
          </p>
          <TipBox title="선지원 후심사 원칙">
            <p>긴급한 상황이면 소득/재산 확인 없이 먼저 지급하고 나중에 심사해요. 48시간 이내 현장 확인 후 즉시 지원이 원칙이에요.</p>
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '금액 확인',
        title: '그러면 실제로 얼마를 받을 수 있을까?',
        desc: '가구 규모별 지원 금액 확인하기',
        icon: 'calc',
        primary: false,
      },
    },

    // --- Section 02: 금액 → SpokeTable + RateCards ---
    {
      id: 's2',
      number: '02',
      heading: '긴급복지 생계지원 금액은 얼마인가요?',
      subtitle: '1인가구 71만원, 4인가구 183만원을 한 달분으로 받아요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            긴급복지 생계지원금은 가구 규모에 따라 금액이 달라져요. 기초생활보장 생계급여 기준과 연동되기 때문에 매년 금액이 조금씩 바뀌어요. 이 금액은 식비, 의복비, 교통비 등 기본적인 생계유지비를 포함한 거예요.
          </p>
          <SpokeTable
            id="tbl1"
            title="가구규모별 긴급복지 생계지원 금액"
            subtitle="2026년 기준, 월 지급액"
            headers={['가구 규모', '월 지원 금액']}
            rows={SUPPORT_AMOUNT_ROWS}
            highlightCol={1}
          />
          <p className="text-neutral-600 mt-4 mb-4 leading-relaxed">
            한 가지 더 알아두실 게 있어요. 생계지원 외에도 의료지원, <a href="/w/주거급여-신청">주거지원</a>, 교육지원 등을 동시에 받을 수 있어요.
          </p>
          <RateCards cards={[
            {
              value: '300만원',
              label: '의료지원',
              lines: ['1회 최대 300만원', '본인부담금 지원'],
              highlightColor: 'orange',
            },
            {
              value: '66.4만원',
              label: '주거지원',
              lines: ['대도시 월 기준', '임시 거소 제공'],
              highlightColor: 'orange',
            },
            {
              value: '최대 46.1만원',
              label: '교육지원',
              lines: ['초중고 학비', '학기당 지원'],
            },
          ]} />
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '신청 방법',
        title: '금액을 알았으니 어떻게 신청하면 될까?',
        desc: '전화 한 통으로 신청하는 방법 확인',
        icon: 'info',
        primary: false,
      },
    },

    // --- Section 03: 신청 방법 → SpokeStepCards + SpokeFlow ---
    {
      id: 's3',
      number: '03',
      heading: '긴급복지 생계지원 신청은 어떻게 하나요?',
      subtitle: '129 전화, 주민센터 방문, 복지로 온라인 중 선택하세요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            가장 빠른 방법은 <strong>129(보건복지상담센터)</strong>에 전화하는 거예요. 24시간 상담이 가능하고, 전화 한 통으로 신청 접수가 돼요. 본인이 직접 하기 어려우면 가족, 이웃, 심지어 담당 공무원이 직권으로 신청할 수도 있어요.
          </p>
          <SpokeStepCards steps={[
            { title: '1단계: 위기 상황 발생', desc: '실직, 질병, 사망 등 갑작스러운 위기사유 발생', tip: '가능한 빨리 신청해야 긴급성 인정' },
            { title: '2단계: 신청 접수', desc: '129 전화, 주민센터 방문, 복지로 온라인 중 선택', tip: '신분증만 있으면 구두 신청 가능' },
            { title: '3단계: 현장 확인', desc: '담당 공무원이 48시간 이내 현장 확인', tip: '별도 서류 준비 불필요' },
            { title: '4단계: 지원 결정 및 지급', desc: '선지원 후심사 원칙에 따라 즉시 지급' },
          ]} />
          <p className="text-neutral-600 mt-4 mb-4 leading-relaxed">
            여기서 실수하면 안 되는 게 있어요. 위기 상황이 발생한 날로부터 가능한 빨리 신청해야 해요. 시일이 너무 지나면 "긴급성"이 인정되지 않을 수 있거든요.
          </p>
          <SpokeFlow steps={[
            { icon: '📞', label: '129 전화', sub: '24시간 상담' },
            { icon: '🏢', label: '주민센터 방문', sub: '신분증만 지참' },
            { icon: '👤', label: '현장 확인', sub: '48시간 이내' },
            { icon: '💰', label: '지급', sub: '즉시 지급' },
          ]} />
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '지급 기간',
        title: '그런데 이 지원금을 얼마나 오래 받을 수 있을까?',
        desc: '기본 기간과 연장 조건 확인하기',
        icon: 'clock',
        primary: false,
      },
    },

    // --- Section 04: 기간 + 연장 → SpokeTimeline + SpokeWarnBox ---
    {
      id: 's4',
      number: '04',
      heading: '긴급복지 생계지원 기간과 연장은 어떻게 되나요?',
      subtitle: '기본 1개월, 최대 6개월까지 연장할 수 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            긴급복지 생계지원은 위기 상황에 대한 일시적 지원이에요. 그래서 기본 지급 기간이 1개월이에요. 하지만 위기 상황이 계속되면 긴급복지지원심의위원회 심의를 거쳐서 최대 6개월까지 연장이 가능해요.
          </p>
          <SpokeTimeline events={[
            { month: '1개월', title: '기본 지급', desc: '선지원 후심사로 즉시 지급', status: 'current' },
            { month: '2~3개월', title: '1차 연장', desc: '위기 지속 시 심의위원회 심의', status: 'normal' },
            { month: '4~6개월', title: '최대 연장', desc: '소득/재산 재확인 후 연장 결정', status: 'warning', tag: '엄격 심사' },
          ]} />
          <p className="text-neutral-600 mt-4 mb-4 leading-relaxed">
            연장 심의에서는 처음보다 더 꼼꼼하게 소득과 재산을 확인해요. 처음에는 빠르게 지급하지만, 연장할 때는 실제로 기준에 맞는지 다시 살펴보는 거예요. 위기 상황이 장기화되면 기초생활수급자 신청으로 전환하는 것도 방법이에요.
          </p>
          <SpokeWarnBox title="환수 주의사항">
            <p>소득이나 재산이 기준을 초과하면 지원금을 환수당할 수 있어요. 거짓이나 부정한 방법으로 받으면 <strong>지원금의 2배</strong>를 반환해야 해요.</p>
          </SpokeWarnBox>
        </>
      ),
      bridgeCTA: {
        href: '/w/주거급여-신청',
        badge: '관련 복지',
        title: '주거비도 지원받을 수 있는 방법이 있어요',
        desc: '주거급여 신청 조건 확인하기',
        icon: 'grid',
        primary: true,
      },
    },

    // --- FAQ Section ---
    {
      id: 's5',
      number: 'FAQ',
      heading: '긴급복지 생계지원 자주 묻는 질문',
      subtitle: '',
      content: null,
    },
  ],

  faq: [
    {
      question: '긴급복지 생계지원 받으면 기초생활수급자가 되나요?',
      answer: '아니에요. 긴급복지지원은 일시적 위기 상황에 대한 지원이라서 <strong>기초생활수급자와는 별개 제도</strong>예요. 다만 위기 상황이 지속되면 기초생활보장 신청을 안내받을 수 있어요.',
    },
    {
      question: '긴급복지 생계지원 신청 시 서류가 필요한가요?',
      answer: '기본적으로 <strong>신분증만 있으면 돼요</strong>. 구두 신청도 가능하고, 서류는 나중에 보완할 수 있어요. 긴급한 상황이니까 서류 때문에 신청이 늦어지면 안 돼요.',
    },
  ],

  sources: [
    { name: '긴급복지지원 안내', url: 'https://www.mohw.go.kr/menu.es?mid=a10708010000', org: '보건복지부' },
    { name: '긴급복지지원법', url: 'https://www.law.go.kr/법령/긴급복지지원법', org: '법제처' },
  ],

  relatedSpokes: [],
}

export default data
