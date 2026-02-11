import Link from 'next/link'
import type { SpokeData } from './types'
import { SpokeCompareCards, SpokeChecklist, TipBox, SpokeRateBars, SpokeFlow } from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '개인파산-신청-자격-조건-지급불능',

  meta: {
    title: '개인파산 신청 자격 조건 지급불능 판단 기준과 소득 요건',
    description: '소득이 있어도 지급불능 상태면 개인파산 신청이 가능하다는 거 아시나요? 자격 조건 판단 기준과 자가진단 방법을 알려드려요',
    keywords: ['개인파산 신청 자격 조건', '개인파산 지급불능 판단 기준', '무직자 개인파산 신청 가능', '개인파산 자격 자가진단 방법'],
    ogTitle: '개인파산 신청 자격 조건 지급불능 판단 기준 | 머니위키',
    ogDescription: '지급불능 판단 기준, 소득별 자격 조건, 무직자 신청 가능 여부, 자가진단 방법까지',
  },

  hub: {
    url: '/w/개인파산-면책-신청-절차-비용',
    name: '개인파산 면책 신청 절차와 비용',
  },

  breadcrumb: ['법률', '개인파산 신청 자격'],

  hero: {
    badge: '2026년 기준',
    h1: <>개인파산 <span className="text-[#1E3A5F]">신청 자격 조건</span> — 지급불능 판단 기준과 소득 요건</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          빚이 쌓여서 이제 갚을 방법이 없는데, 내가 파산을 신청할 수 있는 건지 아닌 건지 감이 안 잡힌다면 잘 오셨어요. <strong>개인파산</strong>은 '지급불능' 상태에 해당하면 누구나 신청할 수 있어요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          <a href="https://law.go.kr/법령/채무자회생및파산에관한법률/제305조" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">채무자 회생 및 파산에 관한 법률 제305조</a>에서 정한 요건만 충족하면 직업이 있든 없든, 소득이 있든 없든 가능해요. 신청부터 면책까지 전체 과정이 궁금하면 <Link href="/w/개인파산-면책-신청-절차-비용" className="text-blue-600 hover:underline">개인파산 면책 신청 절차와 비용</Link>을 같이 보면 흐름이 잡혀요. 먼저 자격 조건부터 하나씩 볼게요.
        </p>
      </>
    ),
    /**
     * quickAnswer: {
     *   text: '개인파산은 채무자가 자신의 재산과 소득으로 모든 빚을 갚을 수 없는 지급불능 상태면 신청할 수 있어요. 무직자도 가능하고, 소득이 있어도 가용소득으로 채무 대부분을 갚을 수 없다면 자격이 돼요.',
     *   hook: '아래에서 내 상황이 지급불능에 해당하는지 자가진단해 볼 수 있어요',
     * },
     */
    hubCTA: {
      badge: '전체 절차',
      desc: '개인파산 신청부터 면책까지 전체 흐름 확인하기',
    },
  },

  toc: [
    { id: 's1', text: '개인파산 신청 자격 조건은 무엇인가요?' },
    { id: 's2', text: '개인파산 지급불능은 어떻게 판단하나요?' },
    { id: 's3', text: '무직자도 개인파산 신청이 가능한가요?' },
    { id: 's4', text: '개인파산 자격을 자가진단하려면 어떻게 하나요?' },
    { id: 's5', text: '자주 묻는 질문' },
  ],

  sections: [
    /**
     * ===== S1: 개인파산 신청 자격 조건 =====
     *
     * 패턴: 핵심 개념 → 조건 비교(SpokeCompareCards) → 프로세스 흐름(SpokeFlow)
     * 전환 스타일: A. 독자 대변형 ("~싶잖아요")
     * 시각 요소: SpokeCompareCards + SpokeFlow = 2개
     */
    {
      id: 's1',
      number: '01',
      heading: '개인파산 신청 자격 조건은 무엇인가요?',
      subtitle: '지급불능 상태면 누구나 신청할 수 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            개인파산은 개인이 사업이나 소비 활동으로 빚이 쌓여서 자기 재산으로 모든 채무를 갚을 수 없는 상태일 때 신청하는 제도예요. <a href="https://law.go.kr/법령/채무자회생및파산에관한법률/제305조" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">채무자 회생 및 파산에 관한 법률 제305조</a>에 따르면, 채무자가 <strong>지급을 할 수 없는 때</strong>에 법원이 파산을 선고해요. 여기서 핵심은 단순히 빚이 많다는 게 아니라, 갚을 능력 자체가 없다는 거예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            같은 법 제305조 제2항에서는 채무자가 <strong>지급을 정지한 때</strong>에는 지급불능으로 추정한다고 돼 있어요. 카드값이나 대출 이자를 더 이상 내지 못하고 연체가 시작됐다면, 법적으로 지급불능 상태에 가까운 거예요. 개인파산은 영업자(자영업자)든 비영업자(직장인·무직자)든 누구나 신청할 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            다만, 갚을 능력이 조금이라도 있는데 파산을 신청하면 법원이 기각할 수 있어요. 특히 소득이 있어서 개인회생으로 일부라도 변제할 수 있는 경우에는 파산 신청이 남용으로 판단될 수 있어요. 개인파산과 개인회생의 차이를 이해하는 게 중요해요.
          </p>

          {/* 개인파산 vs 개인회생 비교: SpokeCompareCards */}
          <SpokeCompareCards cards={[
            {
              title: '개인파산',
              subtitle: '갚을 능력이 없을 때',
              items: ['지급불능 상태 필수', '재산 전부 환가·배당', '남은 채무 면책(탕감)', '소득 요건 없음'],
              recommended: false,
            },
            {
              title: '개인회생',
              subtitle: '일부 갚을 능력이 있을 때',
              items: ['정기적 소득 필수', '3~5년간 일부 변제', '변제 완료 후 잔여 면책', '담보채무 15억, 무담보 10억 이하'],
              recommended: false,
            },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            개인파산은 채무 금액의 상한이 없어요. 빚이 1억이든 10억이든, 지급불능 상태라면 신청할 수 있어요. 법원은 신청서를 받으면 아래와 같은 순서로 자격을 심사해요.
          </p>

          {/* 자격 심사 흐름: SpokeFlow */}
          <SpokeFlow steps={[
            { icon: '1', label: '신청서 접수', sub: '법원 제출' },
            { icon: '2', label: '지급불능 심사', sub: '재산·소득 조사' },
            { icon: '3', label: '파산선고', sub: '요건 충족 시' },
            { icon: '4', label: '면책심사', sub: '면책 결정' },
          ]} />

          {/* 전환 문장 — A. 독자 대변형 */}
          <p className="text-neutral-600 mb-4 leading-relaxed">
            자격 조건은 알겠는데, 내 상황이 정말 '지급불능'에 해당하는 건지 구체적으로 따져보고 싶잖아요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '판단 기준',
        title: '내 상황이 지급불능에 해당할까?',
        desc: '법원이 보는 지급불능 판단 기준 알아보기',
        icon: 'info',
      },
    },

    /**
     * ===== S2: 지급불능 판단 기준 =====
     *
     * 패턴: 법적 기준 설명 → 비율 시각화(SpokeRateBars) → 핵심 팁(TipBox)
     * 전환 스타일: D. 화제 전환형 ("~주의할 게 있어요")
     * 시각 요소: SpokeRateBars + TipBox = 2개
     */
    {
      id: 's2',
      number: '02',
      heading: '개인파산 지급불능은 어떻게 판단하나요?',
      subtitle: '재산 + 가용소득으로 채무를 갚을 수 있는지가 핵심이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            법원이 지급불능을 판단할 때 단순히 '빚이 재산보다 많다'만 보는 게 아니에요. 채무자의 <strong>나이, 직업, 경력, 자격, 노동능력</strong>까지 종합적으로 따져서 앞으로 벌 수 있는 소득(장래 소득)을 추정해요. 거기서 최소 생활비를 빼고 남는 금액이 '가용소득'이에요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            이 가용소득과 현재 보유 재산을 합쳐도 채무의 대부분을 <strong>계속적으로 갚을 수 없는 상태</strong>면 지급불능으로 인정돼요. 예를 들어 빚이 1억인데 재산이 500만원이고 월 가용소득이 20만원이라면, 1억을 갚으려면 40년 넘게 걸리니까 지급불능이에요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            법원은 생계비를 산정할 때 <a href="https://easylaw.go.kr/CSP/CnpClsMain.laf?csmSeq=616&ccfNo=1&cciNo=1&cnpClsNo=1" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">기준중위소득의 60%</a>를 기본으로 봐요. 2026년 1인 가구 기준중위소득은 약 239만원이니까, 60%면 약 143만원이에요. 월 소득에서 이 금액을 빼고 남는 게 가용소득이 되는 거예요.
          </p>

          {/* 가용소득 산출 예시: SpokeRateBars */}
          <SpokeRateBars bars={[
            { label: '월 소득', rate: '180만원', width: '100%' },
            { label: '생계비(중위 60%)', rate: '약 143만원', width: '79%' },
            { label: '가용소득', rate: '약 37만원', width: '21%' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            위 예시처럼 월 소득 180만원에서 생계비를 빼면 가용소득이 약 37만원이에요. 채무가 5,000만원이라면 원금만 갚아도 11년 넘게 걸리니까, 법원은 지급불능으로 판단할 가능성이 높아요. 반대로 가용소득으로 3~5년 안에 채무 대부분을 갚을 수 있다면, 법원은 개인회생을 권할 수 있어요.
          </p>

          {/* 핵심 팁: TipBox */}
          <TipBox title="지급정지 = 지급불능 추정">
            <p className="mb-0 leading-relaxed">
              카드값·대출이자를 3개월 이상 연체해서 금융기관이 채권추심을 시작했다면, 법적으로 <strong>지급정지</strong> 상태로 봐요. 채무자회생법 제305조 제2항에 따라 지급불능으로 추정되기 때문에, 별도로 지급불능을 입증하지 않아도 돼요.
            </p>
          </TipBox>

          {/* 전환 문장 — D. 화제 전환형 */}
          <p className="text-neutral-600 mb-4 leading-relaxed">
            그런데 한 가지 많이 헷갈리는 게 있어요. 직업이 없으면 파산 신청이 안 된다고 오해하는 분이 꽤 있거든요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '무직자',
        title: '직업이 없어도 파산 신청이 될까?',
        desc: '무직자·주부·프리랜서 신청 가능 여부 확인',
        icon: 'info',
      },
    },

    /**
     * ===== S3: 무직자 개인파산 신청 =====
     *
     * 패턴: 오해 해소 → 비교(SpokeCompareCards) → 흐름도(SpokeFlow)
     * 전환 스타일: C. 간결 연결형 ("~넘어갈게요")
     * 시각 요소: SpokeCompareCards + SpokeFlow = 2개
     */
    {
      id: 's3',
      number: '03',
      heading: '무직자도 개인파산 신청이 가능한가요?',
      subtitle: '소득이 없어도, 오히려 파산이 더 적합한 경우가 많아요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            결론부터 말하면 <strong>무직자도 개인파산 신청이 가능해요.</strong> 오히려 소득이 전혀 없는 무직자야말로 개인파산에 가장 적합한 대상이에요. 개인회생은 정기적인 소득이 있어야 3~5년 동안 변제 계획을 세울 수 있는 제도인데, 소득이 없으면 변제 자체가 불가능하잖아요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            전업주부, 고령자, 질병으로 일할 수 없는 분, 프리랜서인데 수입이 끊긴 분 모두 신청할 수 있어요. 법원은 현재 소득뿐 아니라 앞으로 소득을 얻을 가능성까지 보는데, 나이·건강·경력 등을 고려해서 장래 소득이 거의 없다고 판단되면 지급불능을 인정해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            다만 주의할 점이 있어요. 소득이 있는데도 개인회생 대신 파산을 신청하면 '신청 남용'으로 기각될 수 있어요. 법원은 채무자가 일부라도 갚을 능력이 있는지를 꼼꼼히 따져요. 아래에서 상황별로 어떤 제도가 맞는지 비교해 볼게요.
          </p>

          {/* 상황별 비교: SpokeCompareCards */}
          <SpokeCompareCards cards={[
            {
              title: '파산이 적합한 경우',
              subtitle: '갚을 능력 자체가 없을 때',
              items: ['무직·무소득 상태', '고령·질병으로 근로 불가', '재산도 거의 없음', '채무 대비 가용소득 극히 적음'],
              recommended: false,
            },
            {
              title: '회생이 적합한 경우',
              subtitle: '일부 갚을 여력이 있을 때',
              items: ['정기 소득(월급·연금 등) 있음', '3~5년 내 일부 변제 가능', '재산 일부 유지 희망', '담보채무 15억·무담보 10억 이하'],
              recommended: false,
            },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            파산 비용이 걱정된다면 <strong>소송구조 제도</strong>를 활용할 수 있어요. 기준중위소득 60% 이하의 소득이면 법원이 인지대와 송달료를 면제해 줘요. 대한법률구조공단(<a href="https://resu.klac.or.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">klac.or.kr</a>)에서 무료 법률 상담도 받을 수 있어요.
          </p>

          {/* 소송구조 신청 흐름: SpokeFlow */}
          <SpokeFlow steps={[
            { icon: '1', label: '소득 확인', sub: '중위 60% 이하' },
            { icon: '2', label: '소송구조 신청', sub: '파산 신청 시 함께' },
            { icon: '3', label: '법원 심사', sub: '소득·재산 확인' },
            { icon: '4', label: '비용 면제', sub: '인지대·송달료' },
          ]} />

          {/* 전환 문장 — C. 간결 연결형 */}
          <p className="text-neutral-600 mb-4 leading-relaxed">
            자격 조건을 알았으니, 내가 직접 해당되는지 확인하는 방법으로 넘어갈게요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '자가진단',
        title: '내가 개인파산 자격에 해당할까?',
        desc: '5가지 항목으로 자격 자가진단하기',
        icon: 'check',
      },
    },

    /**
     * ===== S4: 자격 자가진단 방법 =====
     *
     * 패턴: 진단 기준 설명 → 체크리스트(SpokeChecklist) → 비율 막대(SpokeRateBars)
     * 전환 스타일: 없음 (마지막 본문 섹션 — primary CTA로 마무리)
     * 시각 요소: SpokeChecklist + SpokeRateBars = 2개
     */
    {
      id: 's4',
      number: '04',
      heading: '개인파산 자격을 자가진단하려면 어떻게 하나요?',
      subtitle: '5가지 항목만 체크하면 대략적인 판단이 가능해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            법원이 실제로 심사하는 항목을 기준으로 자가진단 체크리스트를 만들었어요. 아래 5가지 항목 중 <strong>3개 이상 해당</strong>하면 지급불능 상태에 가깝다고 볼 수 있어요. 다만 이건 참고용이고, 최종 판단은 법원이 해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            자가진단의 핵심은 '가용소득'이에요. 월 소득에서 최소 생활비(기준중위소득의 60%)를 빼고 남은 금액으로 채무를 5년 안에 갚을 수 있는지가 기준이에요. 5년 안에 못 갚으면 지급불능에 해당할 가능성이 높아요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            재산 목록도 꼼꼼히 정리해야 해요. 부동산, 자동차, 예금, 보험 해약환급금, 임대차보증금 반환채권까지 전부 포함이에요. 이 재산을 다 팔아도 채무를 갚을 수 없다면 지급불능의 강력한 근거가 돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            아래 체크리스트로 내 상황을 먼저 점검해 보세요.
          </p>

          {/* 자가진단 체크리스트: SpokeChecklist */}
          <SpokeChecklist items={[
            { text: '총 채무가 보유 재산(부동산+예금+보험 등)보다 훨씬 많다', done: false, note: '채무초과 상태 여부' },
            { text: '월 소득에서 생계비를 빼면 남는 돈이 거의 없다', done: false, note: '가용소득 확인' },
            { text: '3개월 이상 카드값·대출이자를 연체하고 있다', done: false, note: '지급정지 상태 추정' },
            { text: '현재 무직이거나 질병·고령으로 근로가 어렵다', done: false, note: '장래 소득 전망' },
            { text: '가용소득으로 채무를 5년 안에 갚기 어렵다', done: false, note: '변제 가능성 판단' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            진단 결과 3개 이상 해당한다면, 다음 단계로 구체적인 수치를 정리해 보는 게 좋아요. 법원에 제출할 때도 이 수치가 기본 자료가 돼요.
          </p>

          {/* 핵심 수치 정리 예시: SpokeRateBars */}
          <SpokeRateBars bars={[
            { label: '총 채무', rate: '예: 8,000만원', width: '100%' },
            { label: '총 재산', rate: '예: 300만원', width: '4%' },
            { label: '월 가용소득', rate: '예: 25만원', width: '3%' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            위 예시처럼 채무 대비 재산과 가용소득이 극히 적으면 지급불능이 명확해요. 자가진단 후 신청을 결정했다면, <a href="https://resu.klac.or.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">대한법률구조공단</a>이나 <a href="https://slb.scourt.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">서울회생법원</a> 상담을 먼저 받아보는 걸 권해요. 무료 상담으로 내 상황에 맞는 구체적인 조언을 받을 수 있어요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '/w/개인파산-면책-신청-절차-비용',
        badge: '전체 절차',
        title: '파산 신청부터 면책까지 어떻게 진행될까?',
        desc: '개인파산 전체 절차와 비용 확인하기',
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
      question: '개인파산 신청하면 가족에게 불이익이 있나요?',
      answer: '개인파산은 신청한 본인에게만 효력이 있어요. 배우자나 자녀의 재산·신용에는 영향이 없어요. 다만 가족이 <strong>연대보증</strong>을 선 경우에는 보증 채무가 그대로 남아요. 파산 전에 가족의 보증 여부를 꼭 확인하세요.',
    },
    {
      question: '개인파산 신청 중에도 채권추심이 계속되나요?',
      answer: '법원이 파산 신청을 접수하면 <strong>중지명령</strong>이나 <strong>포괄적 금지명령</strong>을 내릴 수 있어요. 이 명령이 나오면 채권자는 추심, 가압류, 강제집행을 할 수 없어요. 신청 직후 법원에 금지명령을 함께 신청하면 빠르게 추심을 멈출 수 있어요.',
    },
  ],

  relatedSpokes: [
    { badge: '비용', title: '개인파산 신청 비용 송달료와 소송구조 제도', desc: '인지대·송달료 금액과 무료로 신청하는 방법', href: '/w/개인파산-신청-비용-송달료-소송구조' },
    { badge: '서류', title: '개인파산 준비서류 채권자목록 재산목록 작성법', desc: '법원 제출 서류 목록과 작성 요령', href: '/w/개인파산-준비서류-채권자목록-재산목록' },
    { badge: '비교', title: '개인파산 개인회생 선택기준 비교', desc: '내 상황에 맞는 제도 선택 방법', href: '/w/개인파산-개인회생-선택기준-비교' },
    { badge: '불이익', title: '개인파산 선고 후 불이익 자격제한과 복권', desc: '파산 선고 후 직업 제한과 복권까지 걸리는 기간', href: '/w/개인파산-선고-불이익-자격제한-복권' },
  ],

  sources: [
    { name: '채무자 회생 및 파산에 관한 법률 제305조(보통파산원인)', url: 'https://law.go.kr/법령/채무자회생및파산에관한법률/제305조', org: '국가법령정보센터' },
    { name: '개인파산·면책절차 개관', url: 'https://easylaw.go.kr/CSP/CnpClsMain.laf?csmSeq=616&ccfNo=1&cciNo=1&cnpClsNo=1', org: '찾기쉬운 생활법령정보' },
    { name: '도산절차 소개 - 개인파산', url: 'https://slb.scourt.go.kr/rel/guide/personal_b/index.jsp', org: '서울회생법원' },
    { name: '개인파산 및 회생 지원센터', url: 'https://resu.klac.or.kr', org: '대한법률구조공단' },
  ],
}

export default data
