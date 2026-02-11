import Link from 'next/link'
import type { SpokeData } from './types'
import { SpokeChecklist, SpokeTable, SpokeCompareCards, FormulaBox, SpokeRateBars, TipBox, SpokeFlow, SpokeWarnBox } from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '생계비계좌-개설-조건-대상-자격',

  meta: {
    title: '생계비계좌 개설 조건 대상 자격 요건 총정리',
    description: '생계비계좌는 연체가 있어도, 신용이 낮아도 만들 수 있다는 거 아시나요? 개설 조건과 자격 요건, 거절 사유까지 알려드려요',
    keywords: ['생계비계좌 개설 조건', '생계비계좌 대상', '생계비계좌 자격', '압류방지 개설'],
    ogTitle: '생계비계좌 개설 조건 대상 자격 요건 | 머니위키',
    ogDescription: '생계비계좌 개설 자격, 필요 서류, 거절 사유까지 한눈에 정리했어요.',
  },

  hub: {
    url: '/w/생계비계좌-압류방지통장-개설-한도',
    name: '생계비계좌 압류방지통장 개설 한도',
  },

  breadcrumb: ['금융', '생계비계좌 개설 조건'],

  hero: {
    badge: '2026년 기준',
    h1: <>생계비계좌 <span className="text-[#1E3A5F]">개설 조건</span> — 대상과 자격 요건 총정리</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          통장 압류가 걱정돼서 생계비계좌를 만들려고 하는데, 내가 개설 대상이 맞는지 확신이 안 서는 분이 많아요. 결론부터 말하면 <strong>대한민국 국민이면 누구나</strong> 만들 수 있어요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          연체가 있든, 채무가 있든, 신용점수가 낮든 전혀 상관없어요. <Link href="/w/생계비계좌-압류방지통장-개설-한도" className="text-blue-600 hover:underline">생계비계좌 전체 가이드</Link>에서 제도 개요를 먼저 확인하고, 여기서 개설 조건을 구체적으로 살펴볼게요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '생계비계좌 개설부터 한도까지 전체 흐름 확인하기',
    },
  },

  toc: [
    { id: 's1', text: '생계비계좌 개설 조건은 뭔가요?' },
    { id: 's2', text: '누가 개설할 수 있나요?' },
    { id: 's3', text: '자격 요건은 어떻게 확인하나요?' },
    { id: 's4', text: '개설이 안 되는 경우도 있나요?' },
    { id: 's5', text: '자주 묻는 질문' },
  ],

  sections: [
    /**
     * ===== S1: 개설 조건 =====
     * 시각 요소: SpokeChecklist + SpokeTable
     * 전환 스타일: A. 독자 대변형
     */
    {
      id: 's1',
      number: '01',
      heading: '생계비계좌 개설 조건은 뭔가요?',
      subtitle: '국적과 신분증만 있으면 돼요. 별도 심사는 없어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            생계비계좌 개설 조건은 딱 두 가지예요. <strong>대한민국 국적</strong>과 <strong>본인 확인 서류(신분증)</strong>만 있으면 돼요. 소득 증빙이나 재직증명서 같은 건 필요 없어요. 은행에 가서 생계비계좌 개설 신청서와 약정서를 작성하면 바로 만들어져요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            신용평가나 연체 이력 조회도 없어요. 은행이 고객의 채무 상태를 따지지 않고, 법에서 정한 요건만 갖추면 개설을 거부할 수 없어요. 이건 법무부가 생계비 보호를 위해 특별히 정한 거예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            다만 1인 1계좌만 가능해요. 이미 다른 금융기관에 생계비계좌가 있으면 중복 개설이 차단돼요. 행복지킴이통장을 가지고 있는 경우에도 마찬가지예요. 아래에서 준비물을 확인해 보세요.
          </p>

          <SpokeChecklist items={[
            { text: '주민등록증 또는 운전면허증 (본인 확인용)', done: false, note: '여권도 가능' },
            { text: '생계비계좌 개설 신청서 (은행 비치)', done: false, note: '현장 작성' },
            { text: '생계비계좌 약정서 (은행 비치)', done: false, note: '현장 작성' },
            { text: '기존 행복지킴이통장 해지 확인 (해당 시)', done: false, note: '중복 불가' },
          ]} />

          <SpokeTable id="s1-condition" title="개설 조건 요약" subtitle="" headers={['항목', '조건', '비고']} rows={[
            ['국적', '대한민국 국민', '외국인은 별도 확인 필요'],
            ['나이', '제한 없음', '미성년자는 법정대리인 동의'],
            ['신용등급', '무관', '연체·채무 있어도 가능'],
            ['소득', '무관', '무직·무소득도 가능'],
            ['계좌 수', '1인 1계좌', '행복지킴이 포함 중복 불가'],
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            조건이 이렇게 간단한데, 그러면 대체 누가 만드는 건지 구체적으로 알고 싶잖아요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '대상',
        title: '어떤 사람들이 만들고 있을까?',
        desc: '직업별·상황별 개설 대상 확인하기',
        icon: 'info',
      },
    },

    /**
     * ===== S2: 누가 개설할 수 있나요 =====
     * 시각 요소: SpokeCompareCards + FormulaBox
     * 전환 스타일: D. 화제 전환형
     */
    {
      id: 's2',
      number: '02',
      heading: '누가 개설할 수 있나요?',
      subtitle: '직장인, 자영업자, 무직자, 수급자 등 누구나 가능해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            생계비계좌는 직업이나 소득 유무와 관계없이 누구나 만들 수 있어요. 직장인은 급여 보호 용도로, 자영업자는 사업소득 보호 용도로, 연금 수급자는 연금 보호 용도로 쓸 수 있어요. 무직자도 가족에게 받는 생활비를 넣어두면 보호를 받아요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            특히 채무 때문에 언제든 통장 압류가 걸릴 수 있는 분이라면 미리 만들어 두는 게 좋아요. 압류가 걸린 후에 만들면 기존 압류 금액은 보호가 안 되고, 새로 입금되는 금액부터 보호가 시작되거든요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            기초생활수급자도 생계비계좌를 만들 수 있지만, 기존 행복지킴이통장을 먼저 해지해야 해요. 수급비만 받는 분이라면 행복지킴이통장을 유지하는 게 나을 수도 있고, 다른 소득이 있다면 생계비계좌가 유리해요.
          </p>

          <SpokeCompareCards
            cards={[
              { title: '꼭 만들어야 하는 경우', subtitle: '', items: ['채무가 있고 압류 가능성이 높은 경우', '급여가 일반 통장으로 들어오는 경우', '자영업자로 사업 수입이 불규칙한 경우', '연금 외 추가 소득이 있는 은퇴자'] },
              { title: '급하지 않은 경우', subtitle: '', items: ['채무가 없고 압류 걱정이 없는 경우', '기초수급자로 수급비만 받는 경우', '이미 행복지킴이로 충분한 보호를 받는 경우', '해외 거주 중인 경우'] }
            ]}
          />

          <FormulaBox lines={[
            { text: '직장인: 급여 중 250만원을 생계비계좌로, 나머지는 일반 계좌로', numbered: true },
            { text: '자영업자: 월 사업소득 중 250만원을 생계비계좌로 이체', numbered: true },
            { text: '연금 수급자: 연금 전액을 생계비계좌로 수령 (250만원 이하 시)', numbered: true },
            { text: '// 월 250만원 한도 내: 무직자: 가족 용돈·기타 수입을 생계비계좌에 보관', numbered: true, comment: true },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            그런데 이렇게 간단하면 진짜 아무 조건 없이 되는 건지, 확인하는 방법이 있는지 궁금한 분도 있을 거예요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '확인',
        title: '내가 자격이 되는지 확인하려면?',
        desc: '자격 확인 방법과 필요 절차 알아보기',
        icon: 'check',
      },
    },

    /**
     * ===== S3: 자격 확인 방법 =====
     * 시각 요소: SpokeRateBars + TipBox
     * 전환 스타일: C. 간결 연결형
     */
    {
      id: 's3',
      number: '03',
      heading: '자격 요건은 어떻게 확인하나요?',
      subtitle: '은행에 가면 바로 확인할 수 있어요. 별도 서류는 필요 없어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            생계비계좌 자격을 미리 확인하는 별도 시스템은 없어요. 은행에 방문해서 신분증을 제시하면 은행이 실시간으로 중복 개설 여부를 확인해 줘요. 다른 금융기관에 이미 생계비계좌가 있으면 개설이 거절되고, 없으면 바로 만들어져요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            행복지킴이통장 보유 여부도 자동으로 확인돼요. 행복지킴이통장이 있으면 생계비계좌를 만들 수 없다는 안내가 나와요. 이 경우 행복지킴이통장을 먼저 해지하고 다시 신청하면 돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            비대면 개설이 가능한 은행이라면 모바일 앱에서도 확인할 수 있어요. 앱에서 생계비계좌 개설을 신청하면 자동으로 중복 여부가 조회되고, 문제가 없으면 바로 개설이 완료돼요. 2026년 하반기에는 정부24에서도 확인과 신청이 가능해질 예정이에요.
          </p>

          <SpokeRateBars bars={[
            { label: '영업점 방문 개설', rate: '약 15~20분', width: '40%' },
            { label: '모바일 비대면 개설', rate: '약 5~10분', width: '20%' },
            { label: '정부24 비대면 (예정)', rate: '약 10분', width: '25%' },
          ]} />

          <TipBox title="개설 전 확인할 것">
            <p className="mb-0 leading-relaxed">
              은행 방문 전에 본인 명의의 다른 금융기관에 행복지킴이통장이나 생계비계좌가 있는지 확인하세요. <a href="https://www.payinfo.or.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">계좌정보통합관리서비스(payinfo.or.kr)</a>에서 본인 명의 전체 계좌를 조회할 수 있어요. 여기서 행복지킴이통장 보유 여부도 확인할 수 있어요.
            </p>
          </TipBox>

          <p className="text-neutral-600 mb-4 leading-relaxed">
            자격이 되는 건 확인했는데, 혹시 거절되는 경우도 있는지 알아볼게요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '주의',
        title: '개설이 안 되는 경우가 있다고?',
        desc: '개설 거절 사유와 대응 방법 확인하기',
        icon: 'info',
      },
    },

    /**
     * ===== S4: 개설이 안 되는 경우 =====
     * 시각 요소: SpokeFlow + SpokeWarnBox
     * 전환 스타일: 없음 (마지막 본문 섹션)
     */
    {
      id: 's4',
      number: '04',
      heading: '개설이 안 되는 경우도 있나요?',
      subtitle: '중복 개설, 본인 확인 불가 등 제한된 경우에만 거절돼요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            생계비계좌 개설이 거절되는 경우는 극히 드물어요. 가장 흔한 사유는 <strong>이미 다른 금융기관에 생계비계좌가 있는 경우</strong>예요. 1인 1계좌 원칙이기 때문에 중복 개설은 안 돼요. 행복지킴이통장을 보유한 경우에도 마찬가지예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            신분증이 훼손되거나 만료돼서 본인 확인이 안 되면 개설이 보류될 수 있어요. 이 경우 신분증을 재발급받고 다시 방문하면 돼요. 미성년자는 법정대리인(부모)의 동의가 필요한데, 동의서 없이 오면 거절돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            금융사기 의심 계좌로 등록된 경우에도 개설이 제한될 수 있어요. 보이스피싱 등에 이용된 이력이 있으면 금융기관이 계좌 개설 자체를 거부할 수 있어요. 이 경우 금융감독원에 이의신청을 해서 해결할 수 있어요.
          </p>

          <SpokeFlow steps={[
            { icon: '1', label: '거절 사유 확인', sub: '은행에서 안내' },
            { icon: '2', label: '중복 계좌 조회', sub: 'payinfo.or.kr' },
            { icon: '3', label: '기존 계좌 해지', sub: '행복지킴이 등' },
            { icon: '4', label: '재신청', sub: '같은 은행 또는 타행' },
          ]} />

          <SpokeWarnBox title="주의사항">
            <p className="mb-0 leading-relaxed">
              생계비계좌가 보호하는 건 <strong>민사상 압류</strong>예요. 국세 체납으로 인한 압류(국세징수법)는 생계비계좌로도 보호받을 수 없어요. 세금 체납이 있다면 국세청에 분할납부 신청을 먼저 하는 게 중요해요. 관할 세무서에 방문하면 상담을 받을 수 있어요.
            </p>
          </SpokeWarnBox>

          <p className="text-neutral-600 mb-4 leading-relaxed">
            생계비계좌 개설이 어려운 상황이라면, <a href="https://www.kinfa.or.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">서민금융진흥원(kinfa.or.kr)</a>에서 무료 상담을 받을 수 있어요. 채무 조정과 함께 생계비계좌 개설을 안내받을 수 있어요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '/w/생계비계좌-압류방지통장-개설-한도',
        badge: '전체 가이드',
        title: '생계비계좌 개설부터 한도까지 한번에 보기',
        desc: '은행별 개설 방법, 입금 한도, 잔액 관리까지',
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
      question: '생계비계좌 개설에 수수료가 드나요?',
      answer: '개설 자체는 무료예요. 대부분의 은행이 생계비계좌에 대해 이체 수수료, ATM 출금 수수료도 면제해 주고 있어요. 은행마다 면제 범위가 조금 다르니 개설 전에 확인해 보세요.',
    },
    {
      question: '외국인도 생계비계좌를 만들 수 있나요?',
      answer: '현재 생계비계좌는 대한민국 국민을 대상으로 해요. 국내 거주 외국인에 대한 적용은 추후 시행령 개정에 따라 달라질 수 있어요. 외국인등록증이 있으면 일부 은행에서 상담을 받을 수 있어요.',
    },
  ],

  relatedSpokes: [
    { badge: '개념', title: '생계비계좌 압류방지통장 행복지킴이 차이', desc: '세 가지 통장의 개념과 차이를 비교했어요', href: '/w/생계비계좌-압류방지통장-행복지킴이-차이' },
    { badge: '은행', title: '생계비계좌 은행별 개설 방법과 비대면', desc: '은행별 개설 절차와 비대면 가능 여부', href: '/w/생계비계좌-은행별-개설-방법-비대면' },
    { badge: '전환', title: '기존 계좌 전환과 신규 개설 비교', desc: '전환 방법과 신규 개설 장단점 비교', href: '/w/생계비계좌-기존-계좌-전환-신규-개설' },
    { badge: '활용', title: '통장 압류 풀기와 생계비계좌 활용', desc: '압류 해제 방법과 활용 전략', href: '/w/통장-압류-풀기-생계비계좌-활용-방법' },
  ],

  sources: [
    { name: '민사집행법 제246조(압류금지채권)', url: 'https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=207952', org: '국가법령정보센터' },
    { name: '압류금지 생계비계좌 도입 보도자료', url: 'https://www.moj.go.kr/bbs/moj/182/489771/download.do', org: '법무부' },
    { name: '계좌정보통합관리서비스', url: 'https://www.payinfo.or.kr', org: '금융결제원' },
    { name: '서민금융진흥원', url: 'https://www.kinfa.or.kr', org: '서민금융진흥원' },
  ],
}

export default data
