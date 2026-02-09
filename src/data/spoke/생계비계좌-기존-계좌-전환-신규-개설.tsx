import Link from 'next/link'
import type { SpokeData } from './types'
import { SpokeCompareCards, SpokeTable, SpokeStepCards, SpokeRateBars, FormulaBox, SpokeChecklist, SpokeTimeline, TipBox } from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '생계비계좌-기존-계좌-전환-신규-개설',

  meta: {
    title: '생계비계좌 기존 계좌 전환 신규 개설 방법 비교 총정리',
    description: '기존에 쓰던 급여 통장을 생계비계좌로 바꿀 수 있다는 거 아시나요? 전환과 신규 개설의 장단점을 비교해서 알려드려요',
    keywords: ['생계비계좌 전환', '생계비계좌 신규 개설', '기존 계좌 전환', '압류방지 전환'],
    ogTitle: '생계비계좌 기존 계좌 전환과 신규 개설 비교 | 머니위키',
    ogDescription: '기존 계좌를 생계비계좌로 전환하는 방법과 신규 개설의 장단점을 비교했어요.',
  },

  hub: {
    url: '/w/생계비계좌-압류방지통장-개설-한도',
    name: '생계비계좌 압류방지통장 개설 한도',
  },

  breadcrumb: ['금융', '생계비계좌 전환과 개설'],

  hero: {
    badge: '2026년 기준',
    h1: <>생계비계좌 <span className="text-emerald-600">기존 계좌 전환</span> — 신규 개설과 비교까지</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          이미 쓰고 있는 급여 통장이나 연금 통장이 있는데, 생계비계좌를 새로 만들어야 하는지 기존 걸 바꿀 수 있는지 헷갈리는 분이 많아요. 결론부터 말하면 <strong>둘 다 가능</strong>해요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          전환과 신규 개설 각각의 장단점이 있으니, 내 상황에 맞는 방법을 골라야 해요. <Link href="/w/생계비계좌-압류방지통장-개설-한도" className="text-blue-600 hover:underline">생계비계좌 전체 가이드</Link>에서 제도 개요를 먼저 보고, 여기서 전환 방법을 자세히 알아볼게요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '생계비계좌 개설부터 한도까지 전체 흐름 확인하기',
    },
  },

  toc: [
    { id: 's1', text: '기존 계좌를 생계비계좌로 바꿀 수 있나요?' },
    { id: 's2', text: '전환 방법은 어떻게 되나요?' },
    { id: 's3', text: '신규 개설과 전환 중 뭐가 나은가요?' },
    { id: 's4', text: '전환 시 주의할 점은 뭔가요?' },
    { id: 's5', text: '자주 묻는 질문' },
  ],

  sections: [
    /**
     * ===== S1: 기존 계좌 전환 가능 여부 =====
     * 시각 요소: SpokeCompareCards + SpokeTable
     * 전환 스타일: A. 독자 대변형
     */
    {
      id: 's1',
      number: '01',
      heading: '기존 계좌를 생계비계좌로 바꿀 수 있나요?',
      subtitle: '네, 기존 계좌를 전환 신청서를 내면 생계비계좌로 바꿀 수 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            기존에 쓰고 있는 입출금 통장을 생계비계좌로 전환할 수 있어요. 은행에 가서 <strong>생계비계좌 전환 신청서</strong>와 약정서를 제출하면 기존 계좌번호 그대로 생계비계좌로 변경돼요. 계좌번호가 바뀌지 않아서 자동이체나 급여 입금 설정을 따로 바꿀 필요가 없어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            다만 모든 계좌가 전환 가능한 건 아니에요. 입출금이 자유로운 보통예금 계좌만 전환할 수 있어요. 정기예금, 적금, 펀드 연결 계좌 같은 건 전환 대상이 아니에요. 또한 이미 다른 금융기관에 생계비계좌가 있으면 전환이 안 돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            행복지킴이통장을 생계비계좌로 '직접 전환'하는 건 안 돼요. 행복지킴이통장은 별도 체계라서, 먼저 해지한 뒤 같은 은행이든 다른 은행이든 새로 신청해야 해요.
          </p>

          <SpokeCompareCards
            cards={[
              { title: '전환 가능', subtitle: '', items: ['입출금 자유 보통예금', '급여 통장 (입출금)', '연금 수령 통장 (입출금)', '일반 저축예금 (입출금)'] },
              { title: '전환 불가', subtitle: '', items: ['정기예금·적금 계좌', '펀드·CMA 연결 계좌', '행복지킴이통장 (해지 후 신규)', '타 금융기관 생계비계좌 보유 시'] }
            ]}
          />

          <SpokeTable id="s1-compare" title="전환 vs 신규 개설 한눈에 비교" subtitle="" headers={['항목', '기존 계좌 전환', '신규 개설']} rows={[
            ['계좌번호', '기존 번호 유지', '새 번호 발급'],
            ['자동이체', '변경 불필요', '재설정 필요'],
            ['급여 입금', '변경 불필요', '회사에 변경 요청'],
            ['소요 시간', '약 10~15분', '약 15~20분'],
            ['기존 잔액', '그대로 유지', '별도 이체 필요'],
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            전환이 가능하다는 건 알겠는데, 구체적으로 어떤 순서로 하면 되는지 궁금하잖아요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '절차',
        title: '전환 절차는 어떻게 될까?',
        desc: '단계별 전환 방법 확인하기',
        icon: 'info',
      },
    },

    /**
     * ===== S2: 전환 방법 =====
     * 시각 요소: SpokeStepCards + SpokeRateBars
     * 전환 스타일: D. 화제 전환형
     */
    {
      id: 's2',
      number: '02',
      heading: '전환 방법은 어떻게 되나요?',
      subtitle: '은행에 가서 전환 신청서를 작성하면 10~15분이면 돼요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            전환 방법은 영업점 방문이 기본이에요. 신분증을 가지고 기존 계좌가 있는 은행에 방문하면 돼요. 다른 은행으로 전환하는 건 안 되고, 기존 계좌가 있는 <strong>같은 은행</strong>에서만 전환할 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            은행 직원에게 '기존 계좌를 생계비계좌로 전환하고 싶다'고 말하면, 전환 신청서와 약정서를 안내해 줘요. 작성하고 서명하면 기존 계좌가 생계비계좌로 바뀌어요. 계좌번호는 변경되지 않아요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            전환이 완료되면 그 시점부터 월 250만원까지 압류금지 보호가 적용돼요. 전환 전에 이미 계좌에 있던 잔액도 보호 범위에 포함돼요. 다만 전환 전에 걸린 압류는 자동으로 풀리지 않아서, 별도로 압류금지채권 범위변경 신청이 필요해요.
          </p>

          <SpokeStepCards steps={[
            { title: '은행 방문', desc: '기존 계좌가 있는 은행 영업점에 신분증을 가지고 가세요.', tip: '반드시 같은 은행이어야 해요' },
            { title: '전환 신청서 작성', desc: '생계비계좌 전환 신청서와 약정서를 작성하세요. 은행 직원이 안내해 줘요.', tip: '행복지킴이통장은 전환 안 됨 (해지 필요)' },
            { title: '중복 확인', desc: '다른 금융기관에 생계비계좌가 없는지 실시간으로 확인해요.', tip: '중복 시 전환 거절' },
            { title: '전환 완료', desc: '기존 계좌번호 그대로 생계비계좌로 변경돼요. 즉시 보호 시작이에요.', tip: '자동이체 변경 불필요' },
          ]} />

          <SpokeRateBars bars={[
            { label: '기존 계좌 전환', rate: '약 10~15분', width: '50%' },
            { label: '신규 계좌 개설', rate: '약 15~20분', width: '70%' },
            { label: '신규 개설 + 자동이체 변경', rate: '약 30~60분', width: '100%' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            전환이 편하긴 한데, 경우에 따라서는 신규 개설이 더 나을 수도 있어요. 어떤 경우에 뭐가 유리한지 비교해 볼게요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '비교',
        title: '전환이 나을까, 새로 만드는 게 나을까?',
        desc: '상황별 유리한 방법 비교',
        icon: 'check',
      },
    },

    /**
     * ===== S3: 전환 vs 신규 비교 =====
     * 시각 요소: FormulaBox + SpokeChecklist
     * 전환 스타일: C. 간결 연결형
     */
    {
      id: 's3',
      number: '03',
      heading: '신규 개설과 전환 중 뭐가 나은가요?',
      subtitle: '계좌번호를 유지하고 싶으면 전환, 은행을 바꾸고 싶으면 신규예요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            기존 계좌 전환의 가장 큰 장점은 <strong>계좌번호가 바뀌지 않는다</strong>는 거예요. 급여 입금 계좌, 자동이체, 카드 결제 연결 계좌를 전부 그대로 쓸 수 있어요. 이미 여러 곳에 계좌번호를 등록해 둔 분이라면 전환이 훨씬 편해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            반면 신규 개설은 원하는 은행을 자유롭게 고를 수 있어요. 기존 은행의 수수료 혜택이 마음에 안 들거나, 비대면 개설이 가능한 은행으로 바꾸고 싶다면 신규 개설이 나아요. 단, 급여 이체, 자동이체 등을 모두 새 계좌로 변경해야 하는 번거로움이 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            현재 계좌에 압류가 걸려 있는 경우에는 신규 개설이 유리해요. 압류된 계좌를 전환하면 기존 압류가 자동으로 풀리지 않거든요. 새 계좌를 만들면 깨끗한 상태에서 시작할 수 있어요.
          </p>

          <FormulaBox lines={[
            { text: '자동이체가 많고 번호 변경이 번거로운 경우 → 기존 계좌 전환', numbered: true },
            { text: '다른 은행의 수수료 혜택이 더 좋은 경우 → 신규 개설', numbered: true },
            { text: '현재 계좌에 압류가 걸려 있는 경우 → 다른 은행에서 신규 개설', numbered: true },
            { text: '// 직접 전환 불가: 행복지킴이통장을 쓰고 있는 경우 → 해지 후 신규 개설', numbered: true, comment: true },
          ]} />

          <SpokeChecklist items={[
            { text: '기존 계좌에 자동이체가 몇 건 연결돼 있는지', done: false, note: '전환 시 유지, 신규 시 재설정' },
            { text: '현재 은행의 생계비계좌 수수료 혜택이 충분한지', done: false, note: '부족하면 신규 검토' },
            { text: '기존 계좌에 압류가 걸려 있는지', done: false, note: '있으면 신규가 유리' },
            { text: '행복지킴이통장을 보유하고 있는지', done: false, note: '해지 후 진행' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            어떤 방법을 선택하든 주의할 점이 있으니, 마지막으로 정리해 볼게요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '주의',
        title: '전환할 때 조심할 건 뭐가 있을까?',
        desc: '전환 시 주의사항과 실수 방지 팁',
        icon: 'info',
      },
    },

    /**
     * ===== S4: 전환 시 주의사항 =====
     * 시각 요소: SpokeTimeline + TipBox
     * 전환 스타일: 없음 (마지막 본문 섹션)
     */
    {
      id: 's4',
      number: '04',
      heading: '전환 시 주의할 점은 뭔가요?',
      subtitle: '기존 압류, 중복 개설, 행복지킴이 해지 타이밍에 주의하세요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            가장 중요한 주의사항은 <strong>기존 압류가 자동으로 풀리지 않는다</strong>는 거예요. 압류가 걸린 계좌를 생계비계좌로 전환하면, 전환 이후 새로 입금되는 금액은 보호되지만 이미 압류된 금액은 그대로예요. 기존 압류를 풀려면 법원에 별도로 범위변경 신청을 해야 해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            행복지킴이통장에서 전환하려면 해지 타이밍을 잘 맞춰야 해요. 해지와 생계비계좌 개설 사이에 공백이 생기면 그 기간에 입금되는 수급비가 보호를 못 받을 수 있어요. 가능하면 같은 날 해지하고 바로 개설하세요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            전환하면 기존 계좌의 입출금 내역은 그대로 유지돼요. 생계비계좌 전환 이전의 거래 내역도 계속 조회할 수 있어요. 단, 전환 이후부터 월 250만원 입금 한도가 적용되니까 입금 관리에 신경 써야 해요.
          </p>

          <SpokeTimeline events={[
            { month: '급여일 직후', title: '급여 받고 바로 전환', desc: '다음 급여부터 자동 보호 적용', status: 'current', tag: '추천' },
            { month: '월초', title: '월초에 전환', desc: '해당 월 입금 한도 전체를 활용 가능', status: 'normal', tag: '적절' },
            { month: '압류 전', title: '압류 통보 받기 전에', desc: '미리 전환해야 보호 효과가 커요', status: 'normal', tag: '중요' },
            { month: '연말', title: '연말정산 전', desc: '환급금 수령 계좌로 활용 가능', status: 'normal', tag: '참고' },
          ]} />

          <TipBox title="압류 걸린 계좌를 전환하는 경우">
            <p className="mb-0 leading-relaxed">
              기존 계좌에 압류가 있다면, 전환보다 <strong>다른 은행에서 신규 개설</strong>하는 게 나아요. 새 계좌에는 압류가 없으니 입금 즉시 보호를 받아요. 기존 압류 계좌의 잔액은 법원에 <a href="https://casenote.kr/%EB%B2%95%EB%A0%B9/%EB%AF%BC%EC%82%AC%EC%A7%91%ED%96%89%EB%B2%95/%EC%A0%9C246%EC%A1%B0" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">압류금지채권 범위변경 신청</a>을 해서 풀 수 있어요.
            </p>
          </TipBox>

          <p className="text-neutral-600 mb-4 leading-relaxed">
            전환이든 신규 개설이든, 만들고 나면 입금 한도를 잘 관리하는 게 핵심이에요. <Link href="/w/생계비계좌-입금-한도-250만원-잔액-관리" className="text-blue-600 hover:underline">입금 한도와 잔액 관리 방법</Link>도 꼭 확인해 보세요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '/w/생계비계좌-압류방지통장-개설-한도',
        badge: '전체 가이드',
        title: '생계비계좌 개설부터 한도까지 한번에 보기',
        desc: '은행별 개설 방법, 입금 한도, 압류 대응까지',
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
      question: '전환하면 기존에 연결된 자동이체가 끊기나요?',
      answer: '아니요, 기존 계좌 전환은 계좌번호가 바뀌지 않기 때문에 자동이체, 카드 결제 연결 등이 모두 유지돼요. 급여 입금 계좌도 변경할 필요 없이 그대로 사용할 수 있어요.',
    },
    {
      question: '다른 은행으로 전환할 수 있나요?',
      answer: '기존 계좌 전환은 같은 은행에서만 가능해요. 다른 은행으로 바꾸고 싶으면 기존 계좌를 해지하고 원하는 은행에서 신규 개설해야 해요. 해지와 개설을 같은 날 처리하면 보호 공백을 줄일 수 있어요.',
    },
  ],

  relatedSpokes: [
    { badge: '조건', title: '생계비계좌 개설 조건과 대상 자격 요건', desc: '개설 자격과 필요 서류 정리', href: '/w/생계비계좌-개설-조건-대상-자격' },
    { badge: '은행', title: '생계비계좌 은행별 개설 방법과 비대면', desc: '은행별 절차와 비대면 가능 여부', href: '/w/생계비계좌-은행별-개설-방법-비대면' },
    { badge: '한도', title: '생계비계좌 입금 한도 250만원 잔액 관리', desc: '한도 초과 시 처리와 잔액 관리 전략', href: '/w/생계비계좌-입금-한도-250만원-잔액-관리' },
    { badge: '활용', title: '통장 압류 풀기와 생계비계좌 활용 방법', desc: '압류 해제 신청과 활용 전략', href: '/w/통장-압류-풀기-생계비계좌-활용-방법' },
  ],

  sources: [
    { name: '압류금지 생계비계좌 도입 보도자료', url: 'https://www.moj.go.kr/bbs/moj/182/489771/download.do', org: '법무부' },
    { name: '민사집행법 제246조(압류금지채권)', url: 'https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=207952', org: '국가법령정보센터' },
    { name: '압류금지채권 범위변경 신청', url: 'https://casenote.kr/%EB%B2%95%EB%A0%B9/%EB%AF%BC%EC%82%AC%EC%A7%91%ED%96%89%EB%B2%95/%EC%A0%9C246%EC%A1%B0', org: 'CaseNote' },
    { name: '계좌정보통합관리서비스', url: 'https://www.payinfo.or.kr', org: '금융결제원' },
  ],
}

export default data
