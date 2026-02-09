import Link from 'next/link'
import type { SpokeData } from './types'
import { SpokeCompareCards, FormulaBox, SpokeRateBars, SpokeFlow, SpokeTimeline, RateCards } from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '개인파산-개인회생-선택기준-비교',

  meta: {
    title: '개인파산 개인회생 선택 기준 소득 유무별 유리한 제도 비교',
    description: '소득이 있는데 개인파산을 신청하면 남용으로 기각될 수 있다는 거 아시나요? 소득 유무별 유리한 제도 선택 기준을 알려드려요',
    keywords: ['개인파산 개인회생 선택 기준', '소득 있으면 개인파산 불가능', '개인파산 개인회생 동시 신청', '개인파산 기각 후 개인회생 전환'],
    ogTitle: '개인파산 개인회생 선택 기준 소득 유무별 비교 | 머니위키',
    ogDescription: '소득 유무, 채무 한도, 자격제한까지 두 제도 핵심 비교',
  },

  hub: {
    url: '/w/개인파산-면책-신청-절차-비용',
    name: '개인파산 면책 신청 절차와 비용',
  },

  breadcrumb: ['법률', '개인파산 vs 개인회생'],

  hero: {
    badge: '2026년 기준',
    h1: <>개인파산 <span className="text-emerald-600">개인회생</span> 선택 기준 — 소득 유무별 유리한 제도 비교</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          빚을 갚을 길이 안 보여서 파산이랑 회생 중 뭘 해야 하나 고민 중이라면 잘 오셨어요. 두 제도는 이름만 비슷하지 <strong>소득이 있느냐 없느냐</strong>에 따라 선택이 완전히 달라져요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          <a href="https://easylaw.go.kr/CSP/CnpClsMain.laf?csmSeq=1286&ccfNo=1&cciNo=1&cnpClsNo=1" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">찾기쉬운 생활법령정보</a>와 <a href="https://slb.scourt.go.kr/rel/guide/personal_b/index.jsp" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">서울회생법원</a> 기준으로 핵심 차이를 정리했어요. 신청부터 면책까지 전체 흐름이 궁금하면 <Link href="/w/개인파산-면책-신청-절차-비용" className="text-blue-600 hover:underline">개인파산 면책 신청 절차와 비용</Link>도 같이 보면 이해가 빨라요. 먼저 두 제도가 근본적으로 뭐가 다른지부터 볼게요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '전체 절차',
      desc: '개인파산 신청부터 면책까지 전체 흐름 확인하기',
    },
  },

  toc: [
    { id: 's1', text: '개인파산과 개인회생 중 어떤 걸 선택하나요?' },
    { id: 's2', text: '소득이 있으면 개인파산을 못 하나요?' },
    { id: 's3', text: '개인파산과 개인회생 동시 신청이 가능한가요?' },
    { id: 's4', text: '개인파산 기각 후 개인회생으로 전환할 수 있나요?' },
    { id: 's5', text: '자주 묻는 질문' },
  ],

  sections: [
    /**
     * ===== S1: 개인파산과 개인회생 중 어떤 걸 선택하나요? =====
     *
     * 패턴: 핵심 개념 비교 → SpokeCompareCards → RateCards
     * 전환 스타일: D. 화제 전환형 (S1→S2)
     * 시각 요소: SpokeCompareCards + RateCards = 2개
     */
    {
      id: 's1',
      number: '01',
      heading: '개인파산과 개인회생 중 어떤 걸 선택하나요?',
      subtitle: '소득 유무와 채무 규모에 따라 유리한 제도가 달라요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            <strong>개인파산</strong>은 재산으로 빚을 다 갚을 수 없는 상태, 즉 <strong>지급불능</strong>일 때 법원이 남은 채무를 면제해주는 제도예요. 반면 <strong>개인회생</strong>은 일정한 소득이 있는 채무자가 3년에서 5년 동안 원금의 일부를 갚고 나머지를 면제받는 제도예요. <a href="https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=616&ccfNo=1&cciNo=1&cnpClsNo=1" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">채무자 회생 및 파산에 관한 법률</a>에 두 제도가 모두 규정되어 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            쉽게 말하면 파산은 <strong>빚을 전부 없애는 대신</strong> 자격제한이 따르고, 회생은 <strong>일부를 갚는 대신</strong> 불이익 없이 경제활동을 계속할 수 있어요. 선택 기준의 핵심은 소득이 있느냐 없느냐예요.
          </p>

          {/* A vs B 비교: SpokeCompareCards */}
          <SpokeCompareCards cards={[
            {
              title: '개인파산',
              subtitle: '소득 없는 채무자',
              items: [
                '지급불능 상태여야 신청 가능',
                '채무 한도 제한 없음',
                '면책 시 채무 전액 소멸',
                '파산 선고 시 자격제한 발생',
                '복권까지 일부 직업 제한',
              ],
              recommended: false,
            },
            {
              title: '개인회생',
              subtitle: '소득 있는 채무자',
              items: [
                '정기적 소득이 있어야 신청 가능',
                '무담보 10억원·담보 15억원 이하',
                '3~5년 변제 후 잔여 채무 면제',
                '법률상 자격제한 없음',
                '변제 기간 중 경제활동 유지',
              ],
              recommended: true,
              recLabel: '소득 있으면',
            },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            소득 외에도 채무 규모가 중요해요. 무담보 채무가 10억원을 넘거나 담보 채무가 15억원을 넘으면 개인회생을 신청할 수 없어요. 이 경우엔 소득이 있어도 파산을 고려해야 해요. 어떤 상황에서 어떤 제도가 유리한지 한눈에 비교해 볼게요.
          </p>

          {/* 선택 기준 카드: RateCards */}
          <RateCards cards={[
            { value: '파산', label: '소득 없음', lines: ['재산으로 빚 변제 불가', '자격제한 감수 가능', '빠른 면책 원할 때'], highlightColor: 'orange' },
            { value: '회생', label: '소득 있음', lines: ['정기적 수입 있음', '직업·자격 유지 필요', '3~5년 변제 가능'], highlight: '추천', highlightColor: 'emerald', active: true },
            { value: '상담', label: '판단 어려움', lines: ['소득이 불규칙', '채무 한도 초과 우려', '법률구조공단 상담'], highlightColor: 'orange' },
          ]} />

          {/* 전환 문장 — D. 화제 전환형 */}
          <p className="text-neutral-600 mb-4 leading-relaxed">
            그런데 한 가지 주의할 게 있어요. 소득이 있는데 파산을 신청하면 법원에서 남용으로 판단할 수 있어요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '소득 기준',
        title: '소득 있으면 정말 개인파산이 안 되나?',
        desc: '남용 기각 기준과 예외 사례 확인',
        icon: 'info',
      },
    },

    /**
     * ===== S2: 소득이 있으면 개인파산을 못 하나요? =====
     *
     * 패턴: 법령 근거 → FormulaBox → SpokeRateBars
     * 전환 스타일: B. 자연 호기심형 (S2→S3)
     * 시각 요소: FormulaBox + SpokeRateBars = 2개
     */
    {
      id: 's2',
      number: '02',
      heading: '소득이 있으면 개인파산을 못 하나요?',
      subtitle: '변제 능력이 있으면 파산 남용으로 기각될 수 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            결론부터 말하면 소득이 있다고 무조건 파산이 안 되는 건 아니에요. 다만 법원은 <strong>변제 능력이 있는데도 파산을 신청하면 남용</strong>으로 볼 수 있어요. <a href="https://slb.scourt.go.kr/rel/guide/personal_b/index.jsp" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">서울회생법원</a>에 따르면 소득이 있어 채무를 일부 변제할 수 있음에도 개인회생 대신 파산을 신청하면 기각될 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            핵심은 <strong>소득 자체</strong>가 아니라 <strong>지급불능 여부</strong>예요. 월급이 있더라도 그 소득으로 최저 생계비를 빼고 나면 채무를 변제할 수 없는 상태라면 지급불능에 해당할 수 있어요. 법원이 판단하는 기준을 정리하면 이래요.
          </p>

          {/* 판단 기준: FormulaBox */}
          <FormulaBox lines={[
            { text: '// 법원의 지급불능 판단 순서', comment: true },
            { text: '1. 채무자의 월 소득 확인', numbered: true },
            { text: '2. 최저 생계비 + 필수 지출 공제', numbered: true },
            { text: '3. 남는 금액으로 총 채무 변제 가능성 판단', numbered: true },
            { text: '4. 변제 가능 → 개인회생 권유 (파산 기각 가능)', numbered: true },
            { text: '5. 변제 불가 → 지급불능 인정 (파산 진행)', numbered: true },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            예를 들어 월급 200만원인데 생계비로 180만원이 나가고 채무가 1억원이라면, 남는 20만원으로는 현실적으로 변제가 불가능해요. 이런 경우 소득이 있어도 파산이 인정될 수 있어요. 반대로 월급이 넉넉하고 채무가 적으면 법원이 개인회생을 권유해요.
          </p>

          {/* 소득별 판단 방향: SpokeRateBars */}
          <SpokeRateBars bars={[
            { label: '소득 없음', rate: '파산 유리', width: '90%' },
            { label: '소득 < 생계비', rate: '파산 가능', width: '70%' },
            { label: '소득 > 생계비 (잔여 적음)', rate: '개별 판단', width: '50%' },
            { label: '소득 > 생계비 (잔여 충분)', rate: '회생 권유', width: '25%' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            허위로 소득이 없다고 속이고 파산을 신청하면 면책이 불허가될 수 있어요. <a href="https://www.law.go.kr/LSW/lsLinkProc.do?lsClsCd=L&lsNm=%EC%B1%84%EB%AC%B4%EC%9E%90+%ED%9A%8C%EC%83%9D+%EB%B0%8F+%ED%8C%8C%EC%82%B0%EC%97%90+%EA%B4%80%ED%95%9C+%EB%B2%95%EB%A5%A0&lsId=prec20090330&joNo=056400&efYd=20090330&mode=11&lnkJoNo=undefined" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">채무자회생법 제564조</a>에서 허위 진술을 면책불허가 사유로 규정하고 있어요.
          </p>

          {/* 전환 문장 — B. 자연 호기심형 */}
          <p className="text-neutral-600 mb-4 leading-relaxed">
            여기까지 보면 한 가지 궁금한 게 생기죠. 그러면 파산이랑 회생을 동시에 신청할 수는 없을까요?
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '동시 신청',
        title: '파산과 회생, 두 개 동시에 낼 수 있을까?',
        desc: '동시 신청 가능 여부와 법원 판단 기준',
        icon: 'info',
      },
    },

    /**
     * ===== S3: 개인파산과 개인회생 동시 신청이 가능한가요? =====
     *
     * 패턴: 핵심 설명 → SpokeFlow → SpokeCompareCards
     * 전환 스타일: C. 간결 연결형 (S3→S4)
     * 시각 요소: SpokeFlow + SpokeCompareCards = 2개
     */
    {
      id: 's3',
      number: '03',
      heading: '개인파산과 개인회생 동시 신청이 가능한가요?',
      subtitle: '법적으로 동시에 낼 수는 있지만 하나가 기각될 수 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            법적으로 개인파산과 개인회생을 <strong>동시에 신청하는 것 자체를 금지하는 규정은 없어요</strong>. 하지만 실무에서는 법원이 두 절차를 동시에 진행하지 않아요. 두 제도는 전제 조건이 반대이기 때문이에요. 파산은 지급불능을, 회생은 일정한 소득을 전제로 해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            만약 두 개를 동시에 냈다면 법원은 채무자의 소득 상태를 확인한 뒤 <strong>적합한 절차 하나만 진행</strong>해요. 소득이 있으면 파산 신청이 남용으로 기각되고 회생만 남는 식이에요. <a href="https://slb.scourt.go.kr/rel/guide/personal_r/index.jsp" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">서울회생법원</a>에 따르면 개인회생절차가 이미 진행 중이고 채권자에게 유리한 경우, 법원은 파산 신청을 기각할 수 있어요.
          </p>

          {/* 프로세스 흐름: SpokeFlow */}
          <SpokeFlow steps={[
            { icon: '📋', label: '동시 신청', sub: '파산+회생' },
            { icon: '🔍', label: '법원 심사', sub: '소득 확인' },
            { icon: '⚖️', label: '적합 판단', sub: '하나 선택' },
            { icon: '📌', label: '절차 진행', sub: '나머지 기각' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            결국 동시 신청보다는 처음부터 내 상황에 맞는 제도를 선택하는 게 시간과 비용 면에서 유리해요. 어떤 제도가 맞는지 판단이 어려우면 <a href="https://www.klac.or.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">대한법률구조공단</a>에서 무료 상담을 받을 수 있어요. 두 제도를 각각 신청했을 때 법원이 어떻게 판단하는지 비교해 볼게요.
          </p>

          {/* 동시 신청 시 법원 판단: SpokeCompareCards */}
          <SpokeCompareCards cards={[
            {
              title: '파산이 진행되는 경우',
              subtitle: '소득 없음 확인 시',
              items: [
                '지급불능 상태 인정',
                '회생 신청은 자동 각하 또는 취하 권유',
                '파산 선고 → 면책 심리 진행',
              ],
              recommended: false,
            },
            {
              title: '회생이 진행되는 경우',
              subtitle: '소득 있음 확인 시',
              items: [
                '정기적 소득 확인',
                '파산 신청은 남용으로 기각',
                '변제계획안 인가 → 3~5년 변제',
              ],
              recommended: false,
            },
          ]} />

          {/* 전환 문장 — C. 간결 연결형 */}
          <p className="text-neutral-600 mb-4 leading-relaxed">
            동시 신청 결과를 알았으니, 파산이 기각됐을 때 회생으로 전환하는 방법을 볼게요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '전환 방법',
        title: '파산 기각되면 회생으로 바꿀 수 있을까?',
        desc: '기각 후 전환 절차와 주의사항 확인',
        icon: 'info',
      },
    },

    /**
     * ===== S4: 개인파산 기각 후 개인회생으로 전환할 수 있나요? =====
     *
     * 패턴: 전환 가능 여부 → SpokeFlow → FormulaBox
     * 전환 스타일: 없음 (마지막 본문 섹션 — primary CTA)
     * 시각 요소: SpokeFlow + FormulaBox = 2개
     */
    {
      id: 's4',
      number: '04',
      heading: '개인파산 기각 후 개인회생으로 전환할 수 있나요?',
      subtitle: '기각 사유에 따라 회생 전환이 가능해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            개인파산이 기각되더라도 <strong>개인회생을 새로 신청하는 건 가능해요</strong>. 법률상 파산 기각이 회생 신청을 막지 않아요. 다만 파산이 왜 기각됐는지가 중요해요. 소득이 있어서 남용으로 기각됐다면 오히려 회생 요건을 갖추고 있다는 의미이기도 해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            파산 기각 후 회생으로 전환할 때 주의할 점은 <strong>채무 한도</strong>예요. 개인회생은 무담보 채무 10억원, 담보 채무 15억원을 넘으면 신청할 수 없어요. 파산은 채무 한도 제한이 없었지만 회생은 있기 때문에 반드시 확인해야 해요.
          </p>

          {/* 전환 절차 흐름: SpokeTimeline */}
          <SpokeTimeline events={[
            { month: '1단계', title: '파산 기각', desc: '남용/소득 사유로 기각 통지' },
            { month: '2단계', title: '회생 신청', desc: '관할법원에 새로 접수' },
            { month: '3단계', title: '서류 준비', desc: '소득·채무 증빙 첨부' },
            { month: '4단계', title: '개시 결정', desc: '변제계획안 수립' },
            { month: '5단계', title: '인가·변제', desc: '3~5년간 변제 진행' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            실무적으로 파산 기각 후 회생을 신청하는 사례가 적지 않아요. 특히 소득이 불규칙하거나 최근에 직장을 구한 경우, 파산 심사 과정에서 법원이 회생을 권유하기도 해요. 전환할 때 필요한 기본 요건을 정리하면 이래요.
          </p>

          {/* 전환 시 확인 사항: FormulaBox */}
          <FormulaBox lines={[
            { text: '// 파산 기각 → 회생 전환 시 확인 사항', comment: true },
            { text: '1. 정기적 소득 존재 여부 (급여·사업·연금)', numbered: true },
            { text: '2. 무담보 채무 10억원 이하 확인', numbered: true },
            { text: '3. 담보 채무 15억원 이하 확인', numbered: true },
            { text: '4. 최저 생계비 제외 후 변제 가능 금액 산출', numbered: true },
            { text: '5. 변제계획안 작성 (3년 원칙, 최대 5년)', numbered: true },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            파산 기각 통지를 받으면 빠르게 움직이는 게 좋아요. 기각 후에도 채권자의 추심은 계속되기 때문에 회생 신청으로 <strong>금지명령</strong>을 받아야 독촉이 멈춰요. 법률구조공단이나 회생법원 상담실에서 서류 준비를 도와줄 수 있어요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '/w/개인파산-면책-신청-절차-비용',
        badge: '전체 절차',
        title: '개인파산 신청부터 면책까지 전체 흐름이 궁금하다면',
        desc: '절차, 비용, 기간까지 한 번에 확인',
        icon: 'info',
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
      question: '개인파산 개인회생 선택 기준에서 채무 규모는 얼마나 중요한가요?',
      answer: '매우 중요해요. 개인회생은 무담보 채무 <strong>10억원</strong>, 담보 채무 <strong>15억원</strong>을 넘으면 신청 자체가 안 돼요. 이 한도를 넘는 채무자는 소득이 있어도 개인파산을 고려해야 해요. 반대로 파산은 채무 한도 제한이 없어서 금액에 관계없이 신청할 수 있어요.',
    },
    {
      question: '개인파산과 개인회생 중 신용 회복이 빠른 건 어떤 쪽인가요?',
      answer: '개인파산은 면책 확정 후 복권이 되면 신용 회복이 시작되고, 보통 <strong>5~7년</strong> 정도 걸려요. 개인회생은 변제계획을 모두 이행하면 바로 잔여 채무가 면제되고, 변제 기간 <strong>3~5년</strong> 완료 후 신용 회복이 가능해요. 자격제한 없이 경제활동을 유지할 수 있어서 실질적인 회복은 회생이 더 빠를 수 있어요.',
    },
  ],

  relatedSpokes: [
    { badge: '자격 조건', title: '개인파산 신청 자격과 지급불능 조건', desc: '파산 신청이 가능한 상태인지 먼저 확인해보세요', href: '/w/개인파산-신청-자격-조건-지급불능' },
    { badge: '비용', title: '개인파산 신청 비용과 송달료 소송구조', desc: '파산 신청에 드는 비용과 무료 지원 제도', href: '/w/개인파산-신청-비용-송달료-소송구조' },
    { badge: '불이익', title: '개인파산 선고 후 불이익과 자격제한 복권', desc: '파산 선고 시 제한되는 자격과 복권 시기', href: '/w/개인파산-선고-불이익-자격제한-복권' },
    { badge: '면책', title: '개인파산 면책불허가 사유와 재량면책', desc: '면책이 안 되는 경우와 예외적 허가 기준', href: '/w/개인파산-면책불허가-도박-재량면책' },
  ],

  sources: [
    { name: '개인회생절차 개념 및 신청자격', url: 'https://easylaw.go.kr/CSP/CnpClsMain.laf?csmSeq=1286&ccfNo=1&cciNo=1&cnpClsNo=1', org: '찾기쉬운 생활법령정보' },
    { name: '개인파산 면책절차 개관', url: 'https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=616&ccfNo=1&cciNo=1&cnpClsNo=1', org: '찾기쉬운 생활법령정보' },
    { name: '도산절차 소개 - 개인파산', url: 'https://slb.scourt.go.kr/rel/guide/personal_b/index.jsp', org: '서울회생법원' },
    { name: '도산절차 소개 - 개인회생', url: 'https://slb.scourt.go.kr/rel/guide/personal_r/index.jsp', org: '서울회생법원' },
    { name: '채무자 회생 및 파산에 관한 법률 제564조 (면책불허가)', url: 'https://www.law.go.kr/법령/채무자회생및파산에관한법률/제564조', org: '국가법령정보센터' },
  ],
}

export default data
