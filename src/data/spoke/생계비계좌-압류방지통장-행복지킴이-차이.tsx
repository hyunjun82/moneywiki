import Link from 'next/link'
import type { SpokeData } from './types'
import { SpokeCompareCards, SpokeRateBars, SpokeTimeline, SpokeTable, FormulaBox, SpokeChecklist, SpokeFlow, TipBox } from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '생계비계좌-압류방지통장-행복지킴이-차이',

  meta: {
    title: '생계비계좌 압류방지통장 행복지킴이통장 개념과 차이 총정리',
    description: '생계비계좌, 압류방지통장, 행복지킴이통장이 다 같은 건 줄 알았는데 다르다고요? 세 가지 통장의 차이와 내게 맞는 선택법을 알려드려요',
    keywords: ['생계비계좌', '압류방지통장', '행복지킴이통장', '생계비계좌 차이'],
    ogTitle: '생계비계좌 압류방지통장 행복지킴이통장 차이 | 머니위키',
    ogDescription: '세 가지 통장의 개념, 보호 범위, 개설 조건 차이를 한눈에 비교했어요.',
  },

  hub: {
    url: '/w/생계비계좌-압류방지통장-개설-한도',
    name: '생계비계좌 압류방지통장 개설 한도',
  },

  breadcrumb: ['금융', '생계비계좌 개념과 차이'],

  hero: {
    badge: '2026년 기준',
    h1: <>생계비계좌 <span className="text-[#1E3A5F]">압류방지통장 행복지킴이</span> — 개념과 차이 총정리</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          통장이 압류될까 걱정돼서 알아보다 보면 '생계비계좌', '압류방지통장', '행복지킴이통장'이 전부 나와서 헷갈리죠. 이름은 비슷한데 대상도 다르고 보호 범위도 달라요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          2026년 2월부터 <strong>생계비계좌</strong>라는 새 제도가 시작되면서 기존 압류방지통장 체계가 크게 바뀌었어요. <Link href="/w/생계비계좌-압류방지통장-개설-한도" className="text-blue-600 hover:underline">생계비계좌 전체 가이드</Link>에서 큰 그림을 먼저 보고 오면 이해가 더 쉬워요. 지금부터 세 가지 통장을 하나씩 비교해 볼게요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '생계비계좌 개설부터 한도까지 전체 흐름 확인하기',
    },
  },

  toc: [
    { id: 's1', text: '생계비계좌란 무엇인가요?' },
    { id: 's2', text: '압류방지통장이란 무엇인가요?' },
    { id: 's3', text: '행복지킴이통장과 어떻게 다른가요?' },
    { id: 's4', text: '어떤 통장을 만들어야 하나요?' },
    { id: 's5', text: '자주 묻는 질문' },
  ],

  sections: [
    /**
     * ===== S1: 생계비계좌란 =====
     * 시각 요소: SpokeCompareCards + SpokeRateBars
     * 전환 스타일: A. 독자 대변형
     */
    {
      id: 's1',
      number: '01',
      heading: '생계비계좌란 무엇인가요?',
      subtitle: '2026년 2월부터 시행된 전 국민 대상 압류방지 전용 계좌예요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            생계비계좌는 <a href="https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=207952" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">민사집행법 시행령</a> 개정으로 2026년 2월 1일부터 도입된 제도예요. 대한민국 국민이면 누구나 1인 1계좌를 개설할 수 있고, 계좌에 들어 있는 돈은 <strong>월 250만원까지 압류가 금지</strong>돼요. 기존에는 급여가 통장에 입금되면 '예금'으로 성격이 바뀌어서 압류 대상이 됐는데, 이 문제를 해결한 거예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            법무부가 채무자의 최소 생활비를 실질적으로 보호하기 위해 만든 제도예요. 급여, 연금, 사업소득, 복지급여 등 어떤 돈이든 이 계좌에 넣으면 한도 안에서 보호를 받아요. 시중은행, 저축은행, 우체국, 상호금융 등 대부분의 금융기관에서 개설할 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            채무가 있든 없든, 신용등급이 낮든 높든 상관없어요. 다만 반복 입출금으로 과도한 보호를 받는 걸 막기 위해 1개월 누적 입금액이 250만원으로 제한돼요. 이 한도를 넘기면 초과분은 압류 대상이 될 수 있어요.
          </p>

          <SpokeCompareCards
            cards={[
              { title: '생계비계좌', subtitle: '', items: ['월 250만원 압류금지', '1인 1계좌 원칙', '수수료 면제 혜택', '입금 소스 제한 없음'] },
              { title: '일반 예금계좌', subtitle: '', items: ['전액 압류 가능', '개수 제한 없음', '일반 수수료 적용', '입금 소스 제한 없음'] }
            ]}
          />

          <SpokeRateBars bars={[
            { label: '월 입금 한도', rate: '250만원', width: '100%' },
            { label: '압류금지 금액', rate: '250만원', width: '100%' },
            { label: '기존 보호 한도', rate: '185만원', width: '74%' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            그러면 기존에 있던 '압류방지통장'이라는 건 뭐고, 생계비계좌와는 어떻게 다른 건지 궁금하잖아요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '압류방지통장',
        title: '기존 압류방지통장은 뭐가 다를까?',
        desc: '압류방지통장의 개념과 한계를 알아보기',
        icon: 'info',
      },
    },

    /**
     * ===== S2: 압류방지통장이란 =====
     * 시각 요소: SpokeTimeline + SpokeTable
     * 전환 스타일: D. 화제 전환형
     */
    {
      id: 's2',
      number: '02',
      heading: '압류방지통장이란 무엇인가요?',
      subtitle: '기초수급자의 수급비를 보호하기 위해 만들어진 전용 통장이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            압류방지통장은 민사집행법 제246조에 근거해서, 법으로 정한 압류금지채권이 입금되는 전용 통장을 말해요. 대표적인 게 '행복지킴이통장'이에요. 기초생활수급자가 받는 생계급여, 주거급여 등이 여기로 입금되면 압류가 안 돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            문제는 이 통장에 수급비 외의 돈은 넣을 수 없다는 거예요. 급여나 사업소득이 들어오면 그건 '예금'이 돼서 압류 대상이 됐어요. 그래서 일반 근로자나 자영업자는 사실상 혜택을 받지 못했어요. 생계비계좌는 이 한계를 해결한 거예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            압류금지 생계비 한도도 물가에 맞춰 점점 올라왔어요. 아래는 주요 변화 흐름이에요.
          </p>

          <SpokeTimeline events={[
            { month: '2014년', title: '150만원 설정', desc: '민사집행법 시행령으로 압류금지 최저금액 도입', status: 'normal', tag: '시작' },
            { month: '2018년', title: '150만원 유지', desc: '물가 상승에도 동결, 실효성 논란 제기', status: 'normal', tag: '동결' },
            { month: '2022년', title: '185만원 인상', desc: '최저생계비 인상에 맞춰 35만원 상향', status: 'normal', tag: '인상' },
            { month: '2026년 2월', title: '250만원 인상', desc: '생계비계좌 도입과 함께 65만원 상향', status: 'current', tag: '현행' },
          ]} />

          <SpokeTable id="s2-types" title="압류방지 통장 유형 비교" subtitle="" headers={['유형', '대상', '보호 범위', '근거법']} rows={[
            ['행복지킴이통장', '기초수급자', '수급비 전액', '민사집행법 제246조'],
            ['급여 압류금지', '근로자', '급여의 1/2 (최소 250만원)', '민사집행법 제246조'],
            ['연금 압류금지', '연금 수급자', '연금의 1/2 (최소 250만원)', '민사집행법 제246조'],
            ['생계비계좌', '전 국민', '월 250만원 전액', '민사집행법 시행령'],
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            그런데 여기서 자주 혼동하는 게 있어요. '행복지킴이통장'은 이름이 비슷해서 생계비계좌와 같은 건 줄 아는 분이 많거든요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '비교',
        title: '행복지킴이통장은 뭐가 다를까?',
        desc: '행복지킴이통장과 생계비계좌 차이 비교',
        icon: 'info',
      },
    },

    /**
     * ===== S3: 행복지킴이통장과 차이 =====
     * 시각 요소: FormulaBox + SpokeChecklist
     * 전환 스타일: C. 간결 연결형
     */
    {
      id: 's3',
      number: '03',
      heading: '행복지킴이통장과 어떻게 다른가요?',
      subtitle: '대상, 입금 가능 금액, 보호 범위가 전부 달라요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            행복지킴이통장은 <strong>기초생활수급자만</strong> 개설할 수 있는 전용 통장이에요. 이 통장에는 생계급여, 주거급여, 교육급여 등 정부가 지급하는 수급비만 입금할 수 있어요. 그 외의 돈, 예를 들어 일용직 급여나 아르바이트비는 입금이 차단돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            반면 생계비계좌는 대한민국 국민 누구나 만들 수 있고, 어떤 돈이든 입금할 수 있어요. 급여, 연금, 사업소득, 복지급여 등 소스에 상관없이 월 250만원까지 보호돼요. 행복지킴이통장이 '수급비 보호'에 초점을 맞췄다면, 생계비계좌는 '생활비 전체 보호'로 범위를 넓힌 거예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            두 통장을 동시에 가질 수는 없어요. 행복지킴이통장을 이미 쓰고 있는 수급자라면, 해지 후 생계비계좌로 전환하는 게 유리한 경우가 많아요. 다만 수급비가 월 250만원 이하라면 실질적 차이가 크지 않을 수 있으니 본인 상황에 맞게 판단하면 돼요.
          </p>

          <FormulaBox lines={[
            { text: '행복지킴이: 기초수급자 전용 + 수급비만 입금 가능', numbered: true },
            { text: '생계비계좌: 전 국민 대상 + 모든 소득 입금 가능', numbered: true },
            { text: '한도: 행복지킴이 = 수급비 전액 / 생계비계좌 = 월 250만원', numbered: true },
            { text: '// 전환 시 기존 해지 필요: 중복 불가: 둘 다 동시에 가질 수 없음 (1인 1계좌)', numbered: true, comment: true },
          ]} />

          <SpokeChecklist items={[
            { text: '수급비 외에 아르바이트·일용직 소득이 있는 경우', done: false, note: '행복지킴이에는 입금 불가' },
            { text: '가족에게 용돈을 받아 생활비에 보태는 경우', done: false, note: '행복지킴이에는 입금 불가' },
            { text: '보험금이나 연금 등 다른 소득원이 있는 경우', done: false, note: '생계비계좌는 소스 무관' },
            { text: '수급 자격이 곧 종료될 예정인 경우', done: false, note: '수급 종료 시 행복지킴이 해지됨' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            차이를 알았으니, 실제로 내 상황에서 어떤 통장을 선택하면 좋을지 정리해 볼게요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '선택',
        title: '내 상황에 맞는 통장은?',
        desc: '상황별 추천 통장 확인하기',
        icon: 'check',
      },
    },

    /**
     * ===== S4: 어떤 통장을 만들어야 하나요 =====
     * 시각 요소: SpokeFlow + TipBox
     * 전환 스타일: 없음 (마지막 본문 섹션)
     */
    {
      id: 's4',
      number: '04',
      heading: '어떤 통장을 만들어야 하나요?',
      subtitle: '내 소득 유형과 채무 상황에 따라 선택이 달라져요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            기초생활수급자이고 수급비만 받는다면 행복지킴이통장을 그대로 쓰셔도 돼요. 수급비 전액이 보호되니까 굳이 바꿀 필요가 없어요. 하지만 수급비 외에 다른 소득이 있거나, 가족에게 용돈을 받아서 쓴다면 생계비계좌로 전환하는 게 유리해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            직장인이나 자영업자라면 무조건 생계비계좌를 만드는 게 맞아요. 행복지킴이통장은 수급자 전용이라 개설 자체가 안 되고, 급여가 일반 통장에 입금되면 압류 대상이 돼요. 생계비계좌를 만들어서 급여 중 250만원을 이 계좌로 받으면 그 금액은 보호돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            현재 채무가 없더라도 미리 만들어 두는 게 좋아요. 갑자기 압류가 들어왔을 때 이미 계좌가 있으면 바로 보호를 받을 수 있지만, 압류 후에 만들면 기존 압류 금액은 보호가 안 되거든요. 아래 흐름도로 내 상황에 맞는 선택을 확인해 보세요.
          </p>

          <SpokeFlow steps={[
            { icon: '1', label: '기초수급자인가?', sub: 'Yes→행복지킴이 유지' },
            { icon: '2', label: '수급비 외 소득?', sub: 'Yes→생계비계좌 전환' },
            { icon: '3', label: '직장인·자영업자?', sub: '생계비계좌 개설' },
            { icon: '4', label: '채무 걱정?', sub: '미리 개설 권장' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            어떤 통장을 선택하든 가장 중요한 건 <strong>입금 한도를 넘기지 않는 것</strong>이에요. 생계비계좌는 월 250만원까지만 보호되니까, 초과 금액은 다른 계좌로 분리하는 습관을 들이면 좋아요.
          </p>

          <TipBox title="생계비계좌 개설이 급한 경우">
            <p className="mb-0 leading-relaxed">
              이미 채권추심이 시작됐거나 압류 통보를 받은 상태라면, 최대한 빨리 생계비계좌를 개설하세요. 하나은행 등 일부 은행은 모바일 앱으로 <strong>비대면 즉시 개설</strong>이 가능해요. 개설 후 급여 입금 계좌를 생계비계좌로 변경하면 다음 급여부터 보호를 받을 수 있어요.
            </p>
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '/w/생계비계좌-압류방지통장-개설-한도',
        badge: '전체 가이드',
        title: '생계비계좌 개설부터 한도까지 한번에 보기',
        desc: '개설 조건, 은행별 방법, 한도 관리까지 전체 정리',
        icon: 'grid',
        primary: true,
      },
    },

    {
      id: 's5',
      number: '05',
      heading: '자주 묻는 질문',
      subtitle: '자주 묻는 질문이에요',
      content: null,
    },
  ],

  faq: [
    {
      question: '생계비계좌와 행복지킴이통장을 동시에 가질 수 있나요?',
      answer: '아니요, 동시에 가질 수 없어요. 1인 1계좌 원칙이라서 행복지킴이통장이 있으면 해지 후에 생계비계좌를 만들어야 해요. 반대로 생계비계좌가 있으면 행복지킴이통장 개설이 안 돼요.',
    },
    {
      question: '압류방지통장에 넣은 돈은 무조건 안전한가요?',
      answer: '월 250만원 한도 안에서만 보호돼요. 한도를 넘긴 초과분은 압류 대상이 될 수 있어요. 또한 세금 체납으로 인한 국세 징수는 생계비계좌 보호 대상이 아니에요. 민사상 압류만 금지되는 거예요.',
    },
  ],

  relatedSpokes: [
    { badge: '조건', title: '생계비계좌 개설 조건과 대상 자격 요건', desc: '누가 만들 수 있는지, 필요 서류는 뭔지 정리했어요', href: '/w/생계비계좌-개설-조건-대상-자격' },
    { badge: '은행', title: '생계비계좌 은행별 개설 방법과 비대면 가능 여부', desc: '주요 은행별 개설 절차를 비교했어요', href: '/w/생계비계좌-은행별-개설-방법-비대면' },
    { badge: '한도', title: '생계비계좌 입금 한도 250만원 잔액 관리', desc: '한도 초과 시 어떻게 되는지 알려드려요', href: '/w/생계비계좌-입금-한도-250만원-잔액-관리' },
    { badge: '활용', title: '통장 압류 풀기와 생계비계좌 활용 방법', desc: '이미 압류된 통장을 풀고 생계비계좌를 활용하는 전략', href: '/w/통장-압류-풀기-생계비계좌-활용-방법' },
  ],

  sources: [
    { name: '민사집행법 제246조(압류금지채권)', url: 'https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=207952', org: '국가법령정보센터' },
    { name: '압류금지 생계비계좌 도입 보도자료', url: 'https://www.moj.go.kr/bbs/moj/182/489771/download.do', org: '법무부' },
    { name: '압류방지 전용통장 안내', url: 'https://easylaw.go.kr/CSP/OnhunqueansInfoRetrieve.laf?onhunqnaAstSeq=97&onhunqueSeq=5742', org: '찾기쉬운 생활법령정보' },
    { name: '생계비계좌 제도 안내', url: 'https://www.fss.or.kr', org: '금융감독원' },
  ],
}

export default data
