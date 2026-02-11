import Link from 'next/link'
import type { SpokeData } from './types'
import { FormulaBox, SpokeRateBars, SpokeTable, SpokeWarnBox, SpokeFlow, SpokeCompareCards, SpokeChecklist, RateCards } from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '생계비계좌-입금-한도-250만원-잔액-관리',

  meta: {
    title: '생계비계좌 입금 한도 250만원 잔액 관리 방법 총정리',
    description: '생계비계좌에 250만원을 넘겨서 넣으면 초과분이 압류된다는 거 아시나요? 입금 한도 관리법과 잔액 운영 전략을 알려드려요',
    keywords: ['생계비계좌 입금 한도', '생계비계좌 250만원', '생계비계좌 잔액', '압류방지 한도'],
    ogTitle: '생계비계좌 입금 한도 250만원 잔액 관리 | 머니위키',
    ogDescription: '생계비계좌 월 250만원 한도의 정확한 기준과 초과 시 처리, 잔액 관리 전략을 정리했어요.',
  },

  hub: {
    url: '/w/생계비계좌-압류방지통장-개설-한도',
    name: '생계비계좌 압류방지통장 개설 한도',
  },

  breadcrumb: ['금융', '생계비계좌 입금 한도'],

  hero: {
    badge: '2026년 기준',
    h1: <>생계비계좌 <span className="text-[#1E3A5F]">입금 한도 250만원</span> — 잔액 관리 방법까지</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          생계비계좌를 만들었는데 한도를 어떻게 관리해야 하는지 모르면, 보호받아야 할 돈이 오히려 압류될 수도 있어요. 월 250만원이라는 한도가 어떻게 적용되는지 정확히 이해하는 게 중요해요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          입금 한도의 기산 방식, 초과 시 처리, 잔액 관리 전략까지 한번에 정리했어요. <Link href="/w/생계비계좌-압류방지통장-개설-한도" className="text-blue-600 hover:underline">생계비계좌 전체 가이드</Link>와 함께 보면 더 도움이 돼요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '생계비계좌 개설부터 한도까지 전체 흐름 확인하기',
    },
  },

  toc: [
    { id: 's1', text: '생계비계좌 입금 한도는 얼마인가요?' },
    { id: 's2', text: '250만원 넘게 입금하면 어떻게 되나요?' },
    { id: 's3', text: '잔액 관리는 어떻게 하나요?' },
    { id: 's4', text: '한도 초과 시 압류되나요?' },
    { id: 's5', text: '자주 묻는 질문' },
  ],

  sections: [
    /**
     * ===== S1: 입금 한도 =====
     * 시각 요소: FormulaBox + SpokeRateBars
     * 전환 스타일: A. 독자 대변형
     */
    {
      id: 's1',
      number: '01',
      heading: '생계비계좌 입금 한도는 얼마인가요?',
      subtitle: '한 달에 최대 250만원까지 입금할 수 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            생계비계좌의 입금 한도는 <strong>월 250만원</strong>이에요. 이건 1개월 동안의 누적 입금액 기준이에요. 한 번에 250만원을 넣든, 여러 번 나눠서 넣든 1개월 누적이 250만원을 넘으면 안 돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            '1개월'의 기산점은 매월 1일부터 말일까지예요. 예를 들어 3월 1일에 100만원, 3월 15일에 100만원, 3월 25일에 50만원을 넣으면 3월 누적 입금액이 250만원이 돼요. 이 범위 안에서는 전액 압류가 금지돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            이 한도는 '입금액' 기준이지 '잔액' 기준이 아니에요. 이전 달에 남은 잔액은 한도에 포함되지 않아요. 2월에 200만원을 넣고 50만원만 쓴 뒤 150만원이 남아 있어도, 3월에 다시 250만원을 입금할 수 있어요.
          </p>

          <FormulaBox lines={[
            { text: '월간 누적 입금액 = 해당 월 1일~말일 모든 입금의 합계', numbered: true },
            { text: '// 잔액 중 250만원까지 압류금지: 보호 금액 = min(잔액, 250만원)', numbered: true, comment: true },
            { text: '이전 달 이월 잔액은 월간 입금 한도에 불포함', numbered: true },
            { text: '// 주의 필요: 한도 초과 입금 시: 초과분은 압류 대상 가능', numbered: true, comment: true },
          ]} />

          <SpokeRateBars bars={[
            { label: '월 소득 200만원', rate: '전액 입금 가능', width: '80%' },
            { label: '월 소득 250만원', rate: '전액 입금 가능', width: '100%' },
            { label: '월 소득 350만원', rate: '250만원만 입금', width: '100%' },
            { label: '월 소득 500만원', rate: '250만원만 입금', width: '100%' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            한도가 250만원인 건 알겠는데, 실수로 넘기면 어떻게 되는지 걱정이 되잖아요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '초과',
        title: '실수로 250만원을 넘기면?',
        desc: '한도 초과 시 어떤 일이 생기는지 확인',
        icon: 'info',
      },
    },

    /**
     * ===== S2: 250만원 초과 시 =====
     * 시각 요소: SpokeTable + SpokeWarnBox
     * 전환 스타일: D. 화제 전환형
     */
    {
      id: 's2',
      number: '02',
      heading: '250만원 넘게 입금하면 어떻게 되나요?',
      subtitle: '초과분은 압류 보호를 받지 못할 수 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            월 250만원을 초과해서 입금하면, 초과된 금액은 압류 보호 대상에서 빠져요. 예를 들어 300만원을 입금했다면 250만원은 보호되고, 초과한 50만원은 채권자가 압류할 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            은행 시스템에서 월 250만원을 넘는 입금을 자동으로 차단하는 건 아니에요. 입금 자체는 가능하지만, 법적 보호 범위를 넘기는 거예요. 급여가 자동으로 들어오는 경우, 급여 중 250만원만 생계비계좌로 받도록 회사에 요청하는 게 안전해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            자동이체로 공과금이나 보험료가 빠져나가는 건 '출금'이라서 입금 한도와 무관해요. 250만원을 넣고 그중 일부를 생활비로 쓰는 건 한도에 영향을 주지 않아요. 한도는 오직 '입금'에만 적용돼요.
          </p>

          <SpokeTable id="s2-example" title="입금 한도 초과 시나리오" subtitle="" headers={['상황', '입금액', '보호 금액', '압류 가능 금액']} rows={[
            ['급여 200만원 입금', '200만원', '200만원', '0원'],
            ['급여 250만원 입금', '250만원', '250만원', '0원'],
            ['급여 350만원 입금', '350만원', '250만원', '100만원'],
            ['200만원 + 가족 용돈 100만원', '300만원', '250만원', '50만원'],
          ]} />

          <SpokeWarnBox title="주의사항">
            <p className="mb-0 leading-relaxed">
              급여가 월 250만원을 넘는다면, 급여 전액을 생계비계좌로 받으면 안 돼요. 회사 인사팀에 <strong>급여 분할 이체</strong>를 요청하세요. 250만원은 생계비계좌로, 나머지는 일반 계좌로 받으면 돼요. 회사에서 분할 이체가 안 되면, 일반 계좌로 전액 받은 뒤 250만원만 직접 이체하는 방법도 있어요.
            </p>
          </SpokeWarnBox>

          <p className="text-neutral-600 mb-4 leading-relaxed">
            한도 초과를 막는 게 중요한데, 그러려면 평소 잔액을 어떻게 관리하느냐가 핵심이에요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '관리',
        title: '잔액을 어떻게 관리하면 좋을까?',
        desc: '월별 잔액 운영 전략과 팁 확인',
        icon: 'calc',
      },
    },

    /**
     * ===== S3: 잔액 관리 =====
     * 시각 요소: SpokeFlow + SpokeCompareCards
     * 전환 스타일: C. 간결 연결형
     */
    {
      id: 's3',
      number: '03',
      heading: '잔액 관리는 어떻게 하나요?',
      subtitle: '입금은 한도 내로, 생활비는 이 계좌에서 바로 쓰는 게 좋아요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            생계비계좌 잔액 관리의 핵심은 '입금은 250만원 이내, 지출은 이 계좌에서 직접'이에요. 생활비를 다른 계좌로 옮기는 대신 생계비계좌에서 바로 이체하거나 카드 결제를 하면, 잔액이 자연스럽게 관리돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            이전 달 잔액이 남아 있어도 다음 달 입금 한도에는 영향이 없어요. 2월에 200만원을 넣고 100만원만 썼다면 잔액 100만원이 남지만, 3월에 다시 250만원을 입금할 수 있어요. 잔액을 굳이 빼놓을 필요가 없다는 뜻이에요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            다만 잔액이 많이 쌓이면 주의할 점이 있어요. 생계비계좌에 보호되는 건 '월 입금 한도 250만원'이지, 잔액 전체가 아니에요. 잔액이 500만원인데 압류가 들어오면 250만원만 보호되고 나머지 250만원은 압류 대상이 될 수 있어요.
          </p>

          <SpokeFlow steps={[
            { icon: '1', label: '월초 급여 입금', sub: '250만원 이내로' },
            { icon: '2', label: '생활비 지출', sub: '이체·카드·출금' },
            { icon: '3', label: '잔액 확인', sub: '250만원 이내 유지' },
            { icon: '4', label: '다음 달 반복', sub: '잔액 이월 OK' },
          ]} />

          <SpokeCompareCards cards={[
            { title: '안전한 관리', subtitle: '', items: ['월 입금 250만원 이내 유지', '생활비는 이 계좌에서 직접 지출', '잔액이 쌓이면 다른 곳으로 이동', '급여 분할 이체 설정'] },
            { title: '위험한 관리', subtitle: '', items: ['급여 전액을 한도 초과 입금', '잔액을 계속 쌓아두기만 함', '압류 상황에서 한도 초과 방치', '입금 내역 확인 안 함'] }
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            잔액 관리 방법은 알겠는데, 실제로 한도를 넘겼을 때 압류가 어떻게 진행되는지 구체적으로 정리해 볼게요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '압류',
        title: '한도를 넘기면 바로 압류되나요?',
        desc: '초과분 압류 절차와 대응 방법 확인',
        icon: 'info',
      },
    },

    /**
     * ===== S4: 한도 초과 시 압류 =====
     * 시각 요소: SpokeChecklist + RateCards
     * 전환 스타일: 없음 (마지막 본문 섹션)
     */
    {
      id: 's4',
      number: '04',
      heading: '한도 초과 시 압류되나요?',
      subtitle: '한도를 넘긴 초과분만 압류 대상이 돼요. 250만원은 보호돼요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            한도를 넘겼다고 해서 계좌 전체가 압류되는 건 아니에요. 법에서 보호하는 250만원은 그대로 유지되고, <strong>초과분에 대해서만</strong> 압류가 가능해요. 예를 들어 잔액이 300만원인데 압류가 들어오면 250만원은 출금할 수 있고, 50만원만 압류돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            다만 실무에서는 은행이 압류 명령을 받으면 일단 전액 출금 정지를 걸 수 있어요. 이 경우 법원에 압류금지채권 범위변경 신청을 해서 250만원을 풀어달라고 요청해야 해요. 생계비계좌는 이 과정이 일반 계좌보다 훨씬 간단해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            가장 좋은 방법은 애초에 한도를 넘기지 않는 거예요. 급여가 250만원을 넘으면 분할 이체를 설정하고, 잔액이 쌓이지 않도록 생활비를 이 계좌에서 직접 쓰세요. 아래 체크리스트로 본인의 관리 상태를 점검해 보세요.
          </p>

          <SpokeChecklist items={[
            { text: '월 입금액이 250만원을 넘지 않는지 매달 확인', done: false, note: '앱 입금 내역 확인' },
            { text: '급여가 250만원 초과라면 분할 이체를 설정했는지', done: false, note: '회사 인사팀에 요청' },
            { text: '잔액이 과도하게 쌓이고 있지 않은지', done: false, note: '250만원 이하 유지 권장' },
            { text: '자동이체(공과금·보험료)가 이 계좌에 연결돼 있는지', done: false, note: '출금은 한도에 무관' },
            { text: '압류 통보를 받았다면 즉시 범위변경 신청 준비', done: false, note: '관할 법원에 신청' },
          ]} />

          <RateCards cards={[
            { value: '250만원', label: '월 입금 한도', lines: ['1개월 누적 입금 기준', '매월 1일 초기화'], highlightColor: 'navy' as const, active: true },
            { value: '250만원', label: '압류금지 보호액', lines: ['잔액 중 이 금액까지 보호', '초과분만 압류 대상'], active: false },
            { value: '1,500만원', label: '사망보험금 한도', lines: ['보장성 보험 한정', '2026년 2월 상향'], active: false },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            생계비계좌를 잘 활용하면 채무가 있어도 최소한의 생활비는 지킬 수 있어요. 더 구체적인 압류 대응 방법은 <Link href="/w/통장-압류-풀기-생계비계좌-활용-방법" className="text-blue-600 hover:underline">통장 압류 풀기와 생계비계좌 활용 방법</Link>에서 다루고 있어요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '/w/생계비계좌-압류방지통장-개설-한도',
        badge: '전체 가이드',
        title: '생계비계좌 개설부터 한도까지 한번에 보기',
        desc: '개설 조건, 은행별 방법, 잔액 관리까지 전체 정리',
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
      question: '생계비계좌에서 카드 결제를 하면 한도에 영향이 있나요?',
      answer: '카드 결제는 출금이라서 입금 한도와 무관해요. 250만원을 입금하고 그중 일부를 카드 결제로 사용해도 입금 한도는 그대로 250만원이에요. 안심하고 생활비를 쓰셔도 돼요.',
    },
    {
      question: '이전 달 잔액이 250만원 넘게 남아 있으면 어떻게 되나요?',
      answer: '이전 달 잔액은 다음 달 입금 한도에 포함되지 않아요. 하지만 잔액이 250만원을 넘으면 초과분이 압류 대상이 될 수 있어요. 잔액이 쌓이면 다른 계좌로 옮기는 게 안전해요.',
    },
  ],

  relatedSpokes: [
    { badge: '개념', title: '생계비계좌 압류방지통장 행복지킴이 차이', desc: '세 가지 통장의 개념 비교', href: '/w/생계비계좌-압류방지통장-행복지킴이-차이' },
    { badge: '상향', title: '압류금지 생계비 185만원에서 250만원 상향', desc: '한도 상향의 배경과 적용 시점', href: '/w/압류금지-생계비-185만원-250만원-상향' },
    { badge: '활용', title: '통장 압류 풀기와 생계비계좌 활용 방법', desc: '압류 해제 신청과 활용 전략', href: '/w/통장-압류-풀기-생계비계좌-활용-방법' },
    { badge: '전환', title: '기존 계좌 전환과 신규 개설 비교', desc: '기존 계좌를 생계비계좌로 전환하는 방법', href: '/w/생계비계좌-기존-계좌-전환-신규-개설' },
  ],

  sources: [
    { name: '민사집행법 시행령 개정안', url: 'https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=207952', org: '국가법령정보센터' },
    { name: '압류금지 생계비계좌 도입 보도자료', url: 'https://www.moj.go.kr/bbs/moj/182/489771/download.do', org: '법무부' },
    { name: '생계비계좌 제도 안내', url: 'https://www.fss.or.kr', org: '금융감독원' },
    { name: '압류금지채권 안내', url: 'https://easylaw.go.kr/CSP/OnhunqueansInfoRetrieve.laf?onhunqnaAstSeq=97&onhunqueSeq=5742', org: '찾기쉬운 생활법령정보' },
  ],
}

export default data
