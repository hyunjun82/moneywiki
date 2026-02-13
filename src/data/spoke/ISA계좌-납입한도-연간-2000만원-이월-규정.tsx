/**
 * ISA계좌 납입한도 이월 규정 | 연간 한도 누적 한도 관리법 — 스포크 4
 *
 * 팩트체크 (2026-02-13):
 * - 연간 납입한도: 2,000만원 (현행)
 * - 누적 납입한도: 1억원 (현행)
 * - 이월: ✅ 가능 (2021년 조세특례제한법 개정으로 미사용 한도 이월 허용)
 * - 2024 세법개정안 확대(연 4,000만원/누적 2억원) → 국회 불통과, 현행 유지
 */

import type { SpokeData } from '@/data/spoke/types'
import {
  SpokeTable, TipBox, FormulaBox, WarnBox,
  SpokeStepCards, SpokeFlow, SpokeChecklist,
  SpokeCompareCards, SpokeRateBars,
} from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: 'ISA계좌-납입한도-연간-2000만원-이월-규정',

  meta: {
    title: 'ISA계좌 납입한도 이월 규정 | 연간 한도 누적 한도 관리법',
    description: 'ISA계좌 한도를 못 채웠는데 다음 해로 넘길 수 있는지 고민이시죠? 연간 2,000만원 한도 이월 규정부터 누적 1억원 관리법까지 알려드려요.',
    keywords: ['ISA계좌 납입한도', 'ISA계좌 연간 한도', 'ISA계좌 이월', 'ISA계좌 누적한도'],
    ogTitle: 'ISA계좌 납입한도 이월 규정 | 연간·누적 한도 관리법 | 머니위키',
    ogDescription: 'ISA 연간 2,000만원 한도, 미사용분 이월 가능, 누적 1억원 관리 전략.',
  },

  hub: {
    url: '/w/ISA계좌-세금혜택-비과세-한도-중개형-서민형-비교',
    name: 'ISA계좌 세금혜택 비과세 한도 | 중개형 서민형 유형 비교 2026',
  },

  breadcrumb: ['금융/투자', 'ISA계좌', '납입한도와 이월'],

  summary3: [
    <>ISA계좌 납입한도는 연간 <strong>2,000만원</strong>, 누적 <strong>1억원</strong>이에요</>,
    <>2021년 개정으로 미사용 한도가 다음 해로 <strong>이월 가능</strong>해졌어요</>,
    <>월별 제한 없이 자유 납입, 자동이체 <strong>166만원/월</strong> 설정하면 한도 소진</>,
  ],

  sourceBar: {
    badge: '출처',
    name: '금융위원회 ISA 납입한도 안내',
    date: '2026.02',
  },

  prevNext: {
    prev: { href: '/w/ISA계좌-가입-조건-개설-방법-필요-서류', title: 'ISA계좌 가입 조건 개설 방법 필요 서류' },
    next: { href: '/w/ISA계좌-만기-해지-중도인출-연금전환-방법', title: 'ISA계좌 만기 해지 중도인출 연금전환 방법' },
  },

  stickyBar: {
    topLabel: '연간 납입한도',
    value: '2,000만원',
    buttonText: '한도 관리법 보기 →',
    scrollTo: '#s2',
  },

  hero: {
    badge: '2026년 기준',
    h1: (
      <>
        ISA계좌 납입한도 이월 규정 | <span className="text-[#1E3A5F]">연간 2,000만원</span> 한도 관리법
      </>
    ),
    intro: (
      <p className="text-base text-neutral-500 leading-relaxed">
        연간 <strong>2,000만원</strong>, 누적 <strong>1억원</strong>까지 넣을 수 있고, 못 채운 한도는 다음 해로 이월돼요. 월별 제한 없이 자유롭게 납입하세요.
      </p>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: 'ISA계좌 세금혜택, 유형 비교, 개설, 투자 전략 총정리',
    },
  },

  toc: [
    { id: 's1', label: 'ISA계좌 납입한도는 얼마인가요?' },
    { id: 's2', label: 'ISA계좌 연간 한도는 어떻게 적용되나요?' },
    { id: 's3', label: 'ISA계좌 미사용 한도 이월이 되나요?' },
    { id: 's4', label: 'ISA계좌 누적한도는 얼마인가요?' },
    { id: 's-faq', label: '자주 묻는 질문' },
  ],

  sections: [
    {
      id: 's1',
      number: 'SECTION 01',
      heading: 'ISA계좌 납입한도는 얼마인가요?',
      subtitle: '연간 2,000만원, 누적 1억원까지 넣을 수 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            ISA계좌 납입한도는 <strong>이중 한도 구조</strong>예요. 연간 한도와 누적 한도가 각각 있고, 둘 중 하나라도 넘으면 입금이 거부돼요. 금융위원회에서 정한 연간 한도는 2,000만원이고, 매년 1월 1일에 새 한도가 시작돼요. 누적 한도 1억원은 계좌를 유지하는 전체 기간 동안 넣을 수 있는 최대 금액이에요.
          </p>

          <FormulaBox
            lines={[
              { text: 'ISA 납입한도 이중 구조', comment: true },
              { text: '① 연간 한도: 매년 2,000만원 (1/1~12/31)' },
              { text: '② 누적 한도: 계좌 전체 기간 합산 1억원' },
              { text: '③ 투자 수익·배당은 한도에 미포함 (원금만 계산)' },
            ]}
          />

          <SpokeTable
            id="tbl-limit"
            title="ISA계좌 납입한도 비교"
            subtitle="연간 + 누적 이중 한도"
            headers={['구분', '금액', '기간', '초과 시']}
            rows={[
              ['연간 한도', '2,000만원', '매년 리셋 (1/1)', '입금 거부'],
              ['누적 한도', '1억원', '계좌 전체 기간', '입금 거부'],
            ]}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            한도에 포함되는 건 순수하게 <strong>내가 넣는 원금</strong>뿐이에요. 투자해서 번 수익이나 배당금은 한도 계산에 들어가지 않아요. 예를 들어 2,000만원을 넣고 배당 100만원을 받았으면 계좌 잔고는 2,100만원이지만 납입 한도 사용액은 2,000만원이에요.
          </p>

          <TipBox title="납입한도는 원금 기준이에요">
            투자 수익이나 배당금은 한도에 포함되지 않아요. 순수하게 내가 넣는 돈만 한도 계산에 들어가요. 배당을 아무리 많이 받아도 추가 납입에는 영향 없어요.
          </TipBox>
        </>
      ),
      pasBridge: {
        href: '/w/ISA계좌-가입-조건-개설-방법-필요-서류',
        question: '아직 ISA를 안 만들었다면 개설부터 하세요',
        answer: <>만 19세 이상이면 앱에서 5분이면 개설 끝이에요. 증권사별 수수료 비교까지 정리했어요.</>,
        buttonText: '납입 전략 보기 →',
      },
    },

    {
      id: 's2',
      number: 'SECTION 02',
      heading: 'ISA계좌 연간 한도는 어떻게 적용되나요?',
      subtitle: '월별 제한 없이 연 2,000만원 자유 납입',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            ISA계좌 연간 한도 2,000만원은 1월 1일부터 12월 31일까지 기간 안에서 적용돼요. 월별 납입 제한은 따로 없어서 1월에 2,000만원을 한 번에 넣어도 되고, 매달 나눠서 넣어도 상관없어요. 자동이체 설정이 가장 편한 방법이에요.
          </p>

          <SpokeRateBars bars={[
            { label: '월 50만원', rate: '연 600만원 (30%)', width: '30%' },
            { label: '월 100만원', rate: '연 1,200만원 (60%)', width: '60%' },
            { label: '월 166만원', rate: '연 1,992만원 (99%)', width: '99%' },
            { label: '월 200만원', rate: '10월 한도 초과!', width: '100%' },
          ]} />

          <SpokeCompareCards cards={[
            { title: '한도 꽉 채우기', subtitle: '월 166만원 자동이체', items: ['연말 잔여 한도: 8만원', '12월 추가 입금으로 100% 달성', '비과세 혜택 극대화', '3년 합산 최대 6,000만원'], recommended: true, recLabel: '추천' },
            { title: '여유 있게 넣기', subtitle: '월 100만원 자동이체', items: ['연말 잔여 한도: 800만원', '미사용분 다음 해 이월 가능', '보너스로 추가 납입', '3년 합산 약 3,600만원'] },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            월 166만원씩 자동이체를 걸면 연간 한도를 거의 다 채울 수 있어요. 200만원으로 설정하면 10월쯤 한도에 도달해서 이후 입금이 거부돼요. 급여 받는 날에 맞춰 자동이체를 설정하면 따로 신경 쓸 필요 없어요. 보너스나 여유 자금이 생기면 수시로 추가 납입해서 한도를 채우는 것도 좋아요.
          </p>

          <TipBox title="한도 잔여액은 앱에서 실시간 확인돼요">
            증권사·은행 앱의 ISA 메뉴에서 올해 남은 납입한도를 바로 확인할 수 있어요. 한도 초과 시 입금 자체가 안 되니까 걱정 없어요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '/w/ISA계좌-비과세-한도-손익통산-절세-계산',
        badge: '절세',
        title: '한도를 채우면 절세 효과가 얼마나 될까요?',
        desc: '2021년 개정으로 미사용 한도가 이월 가능해졌어요. 이월 계산법을 확인하세요.',
        icon: 'info',
      },
    },

    {
      id: 's3',
      number: 'SECTION 03',
      heading: 'ISA계좌 미사용 한도 이월이 되나요?',
      subtitle: '네, 2021년 개정으로 미사용 한도가 다음 해로 이월돼요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            결론부터 말하면 <strong>ISA계좌 미사용 한도는 다음 해로 이월돼요.</strong> 2021년 조세특례제한법 개정으로 미사용 납입한도의 이월이 허용됐어요. 올해 1,000만원만 넣었다면 남은 1,000만원이 다음 해로 넘어가서, 내년에는 최대 <strong>3,000만원</strong>까지 넣을 수 있어요.
          </p>

          <SpokeStepCards
            steps={[
              { title: '1년차: 1,000만원 납입', desc: '미사용 1,000만원 → 다음 해로 이월' },
              { title: '2년차: 한도 3,000만원', desc: '기본 2,000만원 + 이월 1,000만원 = 최대 3,000만원 납입 가능' },
              { title: '3년차: 한도 2,000만원', desc: '2년차에 3,000만원 다 넣었으면 이월 없음' },
              { title: '주의: 누적 1억원', desc: '아무리 이월해도 누적 한도 1억원은 넘을 수 없어요' },
            ]}
          />

          <FormulaBox
            lines={[
              { text: '이월 한도 계산 공식', comment: true },
              { text: '다음 해 납입 가능 = 기본 한도(2,000만원) + 미사용 이월분' },
              { text: '단, 누적 1억원 이내여야 함' },
            ]}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            이월 덕분에 한 해에 한도를 다 못 채워도 다음 해에 몰아서 넣을 수 있어요. 예를 들어 취업 첫해에 여유가 없어서 500만원만 넣었다면, 미사용 1,500만원이 다음 해로 이월돼요. 다음 해에는 기본 2,000만원에 이월 1,500만원을 더해 <strong>최대 3,500만원</strong>까지 넣을 수 있어요.
          </p>

          <TipBox title="이월은 누적 한도 안에서만 가능해요">
            아무리 이월분이 쌓여도 누적 한도 1억원을 넘길 수는 없어요. 누적 한도에 가까워지면 이월분이 자동으로 제한돼요.
          </TipBox>

          <WarnBox>
            <strong>이월 주의:</strong> 미사용분이 자동으로 이월되긴 하지만, 매년 최대한 채우는 게 비과세 효과를 키우는 핵심이에요. 이월을 믿고 미루면 투자 기간이 줄어들어 배당도 줄어요.
          </WarnBox>
        </>
      ),
      pasBridge: {
        href: '/w/ISA계좌-만기-해지-중도인출-연금전환-방법',
        question: '한도를 다 채웠으면 만기 전략을 세워야 해요',
        answer: <>3년 만기 해지, 연장, 연금전환 중 뭐가 유리한지 비교해 보세요. 연금전환하면 세액공제 최대 300만원이에요.</>,
        buttonText: '누적한도 확인 →',
      },
    },

    {
      id: 's4',
      number: 'SECTION 04',
      heading: 'ISA계좌 누적한도는 얼마인가요?',
      subtitle: '총 1억원, 5년이면 소진돼요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            ISA계좌 누적 납입한도는 <strong>1억원</strong>이에요. 연간 2,000만원씩 꽉 채워 넣으면 정확히 5년에 도달하고, 그 이후에는 만기를 연장해도 추가 납입이 불가능해요. 수익은 계속 운용할 수 있지만 원금 추가는 막혀요.
          </p>

          <SpokeFlow steps={[
            { icon: '📅', label: '1~3년차: 6,000만원' },
            { icon: '📅', label: '4년차: 8,000만원' },
            { icon: '📅', label: '5년차: 1억원 도달' },
            { icon: '🚫', label: '6년차~: 추가 납입 불가' },
            { icon: '🔄', label: '해지 후 재가입: 한도 리셋' },
          ]} />

          <SpokeTable
            id="tbl-cumulative"
            title="연도별 누적 납입 예시"
            subtitle="매년 2,000만원 납입 시"
            headers={['연차', '연간 납입', '누적 납입', '잔여 한도']}
            rows={[
              ['1년차', '2,000만원', '2,000만원', '8,000만원'],
              ['2년차', '2,000만원', '4,000만원', '6,000만원'],
              ['3년차', '2,000만원', '6,000만원', '4,000만원'],
              ['4년차', '2,000만원', '8,000만원', '2,000만원'],
              ['5년차', '2,000만원', '1억원', '0원'],
            ]}
            highlightCol={3}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            누적 한도에 도달하면 만기까지 기다렸다가 해지하고 바로 재가입하는 게 유리해요. 재가입하면 연간 2,000만원, 누적 1억원 한도가 처음부터 다시 시작돼요. 비과세 한도도 새로 받아요.
          </p>

          <SpokeChecklist items={[
            { text: '연간 납입한도: 매년 2,000만원 확인', done: true, note: '앱에서 실시간 조회' },
            { text: '미사용분 이월: 다음 해로 자동 이월', done: true, note: '2021년 개정 시행' },
            { text: '누적 한도: 1억원 초과 여부 확인', done: true, note: '5년 꽉 채우면 도달' },
            { text: '한도 도달 후: 만기 해지 → 즉시 재가입', note: '한도 리셋 + 비과세 새로' },
          ]} />

          <WarnBox>
            <strong>만기 전 해지 금지:</strong> 누적 한도가 차더라도 3년 의무기간은 꼭 채우세요. 중도해지하면 비과세 혜택이 사라지고 15.4% 세금을 다 내야 해요.
          </WarnBox>
        </>
      ),
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
    { question: 'ISA계좌 납입한도 초과하면 어떻게 되나요?', answer: '한도를 넘는 금액은 <strong>입금 자체가 거부</strong>돼요. 증권사·은행 앱에서 남은 한도를 확인하고 그 안에서 입금하세요. 다음 해 1월 1일에 새 연간 한도 2,000만원이 생겨요.' },
    { question: 'ISA계좌 미사용 한도는 이월이 되나요?', answer: '<strong>네, 이월돼요.</strong> 2021년 조세특례제한법 개정으로 미사용분이 다음 해로 이월 가능해졌어요. 올해 500만원만 넣었다면 남은 1,500만원이 다음 해로 넘어가서 최대 3,500만원까지 넣을 수 있어요.' },
    { question: 'ISA계좌 납입한도는 부부 합산인가요?', answer: '아니에요, <strong>개인별</strong>이에요. 부부가 각각 ISA를 개설하면 각자 연 2,000만원씩, 총 연 4,000만원까지 넣을 수 있어요.' },
    { question: 'ISA계좌 누적 1억원 다 채우면 추가 납입이 되나요?', answer: '안 돼요. 누적 한도 1억원에 도달하면 <strong>만기 연장을 해도 추가 납입은 불가능</strong>해요. 만기 해지 후 재가입하면 한도가 리셋돼요.' },
  ],

  relatedSpokes: [
    { badge: '절세', title: 'ISA계좌 비과세 한도 손익통산 절세 계산', desc: '비과세 한도와 절세 효과 계산법', href: '/w/ISA계좌-비과세-한도-손익통산-절세-계산' },
    { badge: '가입', title: 'ISA계좌 가입 조건 개설 방법 필요 서류', desc: '개설 절차와 준비 서류 안내', href: '/w/ISA계좌-가입-조건-개설-방법-필요-서류' },
    { badge: '유형', title: 'ISA계좌 중개형 서민형 일반형 유형 선택 기준', desc: '운용방식별 장단점 + 최적 조합', href: '/w/ISA계좌-중개형-서민형-일반형-유형-선택-기준' },
    { badge: '만기', title: 'ISA계좌 만기 해지 중도인출 연금전환 방법', desc: '만기 절차 + 연금전환 세액공제', href: '/w/ISA계좌-만기-해지-중도인출-연금전환-방법' },
  ],

  sources: [
    { name: 'ISA 납입한도·이월 안내', url: 'https://www.fsc.go.kr', org: '금융위원회' },
    { name: 'ISA 제도 가이드', url: 'https://www.fss.or.kr', org: '금융감독원' },
  ],
}

export default data
