import Link from 'next/link'
import type { SpokeData } from './types'
import { SpokeCompareCards, SpokeTimeline, SpokeChecklist, TipBox, FormulaBox } from '@/components/spoke/SpokeBlocks'

// --- Spoke Data ---
const data: SpokeData = {
  slug: '육아휴직-기간-연장-분할-사용',

  meta: {
    title: '육아휴직 기간 연장 신청과 분할 사용 횟수',
    description: '육아휴직 기간 연장 조건, 연장 신청 방법, 분할 사용 가능 여부와 최대 횟수까지 한 번에 정리해요.',
    keywords: ['육아휴직 기간 연장', '육아휴직 연장 신청', '육아휴직 분할 사용', '육아휴직 분할 사용 횟수'],
    ogTitle: '육아휴직 기간 연장 신청과 분할 사용 횟수 | 머니위키',
    ogDescription: '연장 조건, 신청 절차, 분할 사용 횟수까지 한 번에.',
  },

  hub: {
    url: '',
    name: '',
  },

  breadcrumb: ['근로/노동', '육아휴직 기간 연장'],

  hero: {
    badge: '2025년 2월 23일 시행',
    h1: <><span className="text-emerald-600">육아휴직 기간 연장</span> 신청과 분할 사용 횟수</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          육아휴직 1년으로는 부족해서 연장하고 싶은데, 가능한지 헷갈리시죠?
          <a href="https://www.korea.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">정부24</a>와{' '}
          <a href="https://www.moel.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">고용노동부</a> 기준으로
          2025년 2월 23일부터 기간 연장 조건이 완화되고, 분할 사용 횟수도 확대됐어요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          쉽게 말해서 부모가 함께 쓰면 최대 1년 6개월까지 연장할 수 있고, 최대 4번에 나눠 쓸 수 있어요.
          먼저 연장 조건부터 차근차근 볼게요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '',
      desc: '',
    },
  },

  toc: [
    { id: 's1', text: '육아휴직 기간 연장이 가능한가요?' },
    { id: 's2', text: '육아휴직 연장 신청은 어떻게 하나요?' },
    { id: 's3', text: '육아휴직 분할 사용이 가능한가요?' },
    { id: 's4', text: '육아휴직 분할 사용 횟수는 몇 번인가요?' },
    { id: 's5', text: '육아휴직 자주 묻는 질문' },
  ],

  sections: [
    // --- Section 01: 기간 연장 (SpokeCompareCards + SpokeChecklist) ---
    {
      id: 's1',
      number: '01',
      heading: '육아휴직 기간 연장이 가능한가요?',
      subtitle: '조건 충족 시 최대 1년 6개월까지 연장 가능해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            육아휴직 기본 기간은 <strong>1년</strong>이에요.
            하지만 <a href="https://www.korea.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">2025년 2월 23일부터 시행되는 개정안</a>에 따라
            부모가 함께 쓰거나 한부모 가정, 중증 장애아동 부모는 <strong>최대 1년 6개월</strong>까지 연장할 수 있어요.
            연장된 기간에도 급여를 받을 수 있으니까 조건을 꼭 확인해 보세요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            기본 1년과 연장 6개월의 차이점은 급여 상한이에요.
            기본 기간에는 통상임금 100%를 받지만, 연장된 7~18개월 구간은 통상임금 80%를 받고 상한액도 월 160만원으로 낮아져요.
            그래도 6개월을 더 쓸 수 있다는 게 큰 장점이에요.
          </p>

          <SpokeCompareCards cards={[
            {
              title: '기본 육아휴직',
              subtitle: '1~6개월',
              items: [
                '통상임금 100%',
                '상한 200~250만원',
                '모든 근로자 가능',
                '조건 없음'
              ],
              recommended: false
            },
            {
              title: '연장 육아휴직',
              subtitle: '7~18개월',
              items: [
                '통상임금 80%',
                '상한 월 160만원',
                '조건 충족 시만 가능',
                '부모 공동 또는 한부모·장애'
              ],
              recommended: true,
              recLabel: '6개월 추가'
            },
          ]} />

          <SpokeChecklist items={[
            { text: '부모가 각각 3개월 이상 사용 (양쪽 모두 필요)', done: true },
            { text: '한부모 가정', done: true },
            { text: '중증 장애아동의 부모', done: true },
            { text: '8세 이하 또는 초등학교 2학년 이하 자녀 대상', done: false, note: '추가 요건' },
            { text: '고용보험 180일 이상 가입', done: false, note: '필수' },
          ]} />

          <p className="text-neutral-600 mb-0">자, 연장 조건은 알겠는데 실제로 신청은 어떻게 하는지가 더 중요하잖아요.</p>
        </>
      ),
      bridgeCTA: { href: '#s2', badge: '신청', title: '연장 신청 절차가 궁금한가요?', desc: '사업주 신청부터 급여까지 단계별로', icon: 'info' },
    },

    // --- Section 02: 연장 신청 (SpokeTimeline + TipBox) ---
    {
      id: 's2',
      number: '02',
      heading: '육아휴직 연장 신청은 어떻게 하나요?',
      subtitle: '휴직 종료 30일 전까지 사업주에게 신청하고, 급여는 고용24에서 신청해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            육아휴직 연장은 자동으로 되는 게 아니라 <strong>휴직 종료 30일 전까지</strong> 사업주에게 신청해야 해요.
            사업주가 승인하면 <a href="https://www.ei.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">고용24</a>나
            고용센터에서 연장 기간에 대한 급여를 별도로 신청하면 돼요.
            시기별로 어떤 절차를 밟는지 정리하면 이렇게 돼요.
          </p>

          <SpokeTimeline events={[
            {
              month: '휴직 종료 30일 전',
              title: '사업주에게 연장 신청',
              desc: '연장 사유 설명, 조건 충족 확인',
              status: 'normal'
            },
            {
              month: '승인 후',
              title: '육아휴직 연장 확인서 발급',
              desc: '회사에서 확인서 받기',
              status: 'normal'
            },
            {
              month: '연장 시작 전',
              title: '고용24 또는 고용센터 급여 신청',
              desc: '연장 기간 급여 별도 신청 필수',
              status: 'current',
              tag: '중요'
            },
            {
              month: '매월',
              title: '급여 지급',
              desc: '통상임금 80%, 상한 160만원',
              status: 'normal'
            },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            연장된 기간(7~18개월)의 급여는 통상임금의 <strong>80%</strong>를 받고, 상한액은 <strong>월 160만원</strong>, 하한액은 <strong>70만원</strong>이에요.
            기본 1~6개월 기간의 급여보다는 상한액이 낮지만, 6개월을 더 쓸 수 있다는 점에서 큰 장점이에요.
          </p>

          <TipBox title="6+6 부모육아휴직제와 차이점">
            <p className="mb-0 leading-relaxed">
              <strong>6+6 부모육아휴직제</strong>는 부모가 각각 쓸 때 처음 6개월 상한이 <strong>450만원</strong>으로 높아지는 제도이고,
              <strong>기간 연장</strong>은 기간 자체를 6개월 더 늘리는 제도예요.<br /><br />
              6+6은 급여 상한이 높아지는 거고, 기간 연장은 말 그대로 기간을 늘리는 거라서 둘은 별개예요.
              조건이 맞으면 둘 다 활용할 수 있어요.
            </p>
          </TipBox>

          <p className="text-neutral-600 mb-0">신청 방법을 알았으니, 이제 기간을 나눠 쓸 수 있는지 확인할 차례예요.</p>
        </>
      ),
      bridgeCTA: { href: '#s3', badge: '분할', title: '1년 6개월을 나눠 쓸 수 있을까요?', desc: '분할 사용 가능 여부 확인', icon: 'clock' },
    },

    // --- Section 03: 분할 사용 (FormulaBox + SpokeCompareCards) ---
    {
      id: 's3',
      number: '03',
      heading: '육아휴직 분할 사용이 가능한가요?',
      subtitle: '2025년 2월 23일부터 최대 4번에 나눠 쓸 수 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            <a href="https://www.korea.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">2025년 2월 23일부터</a> 육아휴직 분할 사용 횟수가 확대됐어요.
            기존에는 <strong>2회 분할</strong>(총 3덩어리)까지만 가능했는데, 이제는 <strong>3회 분할</strong>(총 4덩어리)까지 가능해요.
            예를 들어 출산 직후 3개월, 복귀 후 유치원 적응 3개월, 다시 복귀 후 초등 입학 3개월, 마지막 나머지 3개월 이런 식으로
            아이의 성장 단계에 맞춰 자유롭게 나눠 쓸 수 있어요.
          </p>

          <FormulaBox lines={[
            { text: '// 육아휴직 분할 사용 예시 (총 12개월)', comment: true },
            { text: '1회차: 출산 직후 3개월 (0~3개월)', numbered: true },
            { text: '→ 복직 → 근무', comment: true },
            { text: '2회차: 유치원 적응기 3개월 (4~7개월)', numbered: true },
            { text: '→ 복직 → 근무', comment: true },
            { text: '3회차: 초등 입학기 3개월 (8~11개월)', numbered: true },
            { text: '→ 복직 → 근무', comment: true },
            { text: '4회차: 나머지 3개월 (12~15개월)', numbered: true },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            분할 사용 1회당 <strong>최소 30일 이상</strong>은 써야 해요.
            30일만 채우면 나머지 기간은 자유롭게 배분할 수 있어요.
            복직 기간에 대한 최소 제한은 없으니까, 예를 들어 3개월 쓰고 1주일 복귀 후 다시 3개월 쓸 수도 있어요.
            다만 회사 사정과 업무 연속성을 고려해서 사업주와 협의하는 게 좋아요.
          </p>

          <SpokeCompareCards cards={[
            {
              title: '기존 분할 제도',
              subtitle: '2025.2.22까지',
              items: [
                '2회 분할',
                '총 3덩어리',
                '예: 3개월 → 복귀 → 3개월 → 복귀 → 6개월'
              ],
              recommended: false
            },
            {
              title: '변경된 분할 제도',
              subtitle: '2025.2.23부터',
              items: [
                '3회 분할',
                '총 4덩어리',
                '예: 3개월씩 4번 나눠 사용 가능'
              ],
              recommended: true,
              recLabel: '확대'
            },
          ]} />

          <p className="text-xs text-neutral-400 mt-1">
            * 1회 최소 사용 기간은 <strong>30일 이상</strong>이에요.<br />
            * 분할 사용 시에도 급여는 동일하게 적용돼요.
          </p>

          <p className="text-neutral-600 mb-0">그런데 한 가지 주의할 게 있어요. 정확한 횟수 제한과 실무적인 주의사항이죠.</p>
        </>
      ),
      bridgeCTA: { href: '#s4', badge: '횟수', title: '정확히 몇 번까지 나눌 수 있나요?', desc: '최대 횟수와 주의사항 정리', icon: 'calc' },
    },

    // --- Section 04: 분할 사용 횟수 (SpokeChecklist + TipBox) ---
    {
      id: 's4',
      number: '04',
      heading: '육아휴직 분할 사용 횟수는 몇 번인가요?',
      subtitle: '최대 4회에 나눠 쓸 수 있고, 1회당 최소 30일 이상이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            육아휴직은 <strong>최대 4회</strong>에 나눠서 쓸 수 있어요.
            이건 <strong>3회 분할</strong>을 의미하는데, 분할을 3번 하면 총 4개의 덩어리가 생기는 거예요.
            남은 기간을 자유롭게 배분할 수 있고, 각 회차별로 <strong>최소 30일 이상</strong>씩은 써야 해요.
            분할 사용 시에도 급여는 동일하게 적용되니까 아이의 성장 단계나 가정 사정에 맞춰 유연하게 활용하면 돼요.
          </p>

          <SpokeChecklist items={[
            { text: '최대 4회(3회 분할)까지 나눠 쓸 수 있어요', done: true },
            { text: '1회당 최소 30일 이상 사용 필수', done: true },
            { text: '복직 기간 최소 제한 없음 (사업주 협의 필요)', done: true },
            { text: '분할 사용 시에도 급여는 동일하게 적용', done: true },
            { text: '8세 이하 또는 초등학교 2학년 이하 자녀 대상', done: false, note: '대상 조건' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            다만 분할 횟수를 늘리면 복직과 재휴직을 반복하게 되는데, 이 과정에서 회사와의 관계나 업무 연속성이 끊길 수 있어요.
            특히 중소기업이나 인력이 부족한 부서라면 사업주와 미리 충분히 협의하는 게 좋아요.
            법적으로는 가능하지만 실무적으로는 원활한 소통이 중요해요.
          </p>

          <TipBox title="2026년부터 육아휴직 보장 확대 예정">
            <p className="mb-0 leading-relaxed">
              <a href="https://www.moel.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">고용노동부</a>는
              2026년부터 자영업자, 특수고용직, 프리랜서에게도 육아휴직을 보장하는 방안을 추진 중이에요.
              지금은 고용보험 가입자(직장인)만 가능하지만, 앞으로는 더 많은 분들이 육아휴직을 쓸 수 있게 될 거예요.
              기간 연장과 분할 사용 확대와 함께 일·가정 양립 제도가 계속 발전하고 있으니 관심 있게 지켜보세요.
            </p>
          </TipBox>

          <p className="text-neutral-600 mb-4 leading-relaxed">
            실제로 필요한 서류나 추가 궁금증이 있다면 아래 FAQ도 확인해 보세요.
            복직 기간 제한이나 급여 관련 질문들을 정리해뒀어요.
          </p>

          <p className="text-neutral-600 mb-0">육아휴직 기간 연장과 분할 사용에 대해 궁금한 점은 다 해결되셨나요?</p>
        </>
      ),
      bridgeCTA: { href: '#s5', badge: '궁금증', title: '육아휴직 자주 묻는 질문', desc: '추가 궁금증 해결하기', icon: 'info', primary: true },
    },

    // --- Section 05: FAQ ---
    {
      id: 's5',
      number: '05',
      heading: '육아휴직 자주 묻는 질문',
      subtitle: '육아휴직 기간 연장과 분할 사용에 대해 자주 묻는 질문이에요',
      content: null,
    },
  ],

  faq: [
    {
      question: '육아휴직 기간 연장하면 급여는 얼마나 받나요?',
      answer: '연장된 기간(7~18개월)에는 통상임금의 <strong>80%</strong>를 받아요. 상한액은 월 <strong>160만원</strong>, 하한액은 <strong>70만원</strong>이에요. 기본 1~6개월 기간의 급여보다는 상한액이 낮지만, 6개월을 더 쓸 수 있다는 점에서 큰 장점이에요.',
    },
    {
      question: '육아휴직 분할 사용 시 복직 기간 제한이 있나요?',
      answer: '복직 기간에 대한 <strong>최소 기간 제한은 없어요</strong>. 예를 들어 3개월 쓰고 1주일 복귀 후 다시 3개월 쓸 수도 있어요. 다만 회사 사정과 업무 연속성을 고려해서 사업주와 협의하는 게 좋아요. 분할 사용 1회당 최소 30일 이상만 지키면 됩니다.',
    },
  ],

  relatedSpokes: [
    { badge: '급여', title: '육아휴직 급여 계산 지급일 세금 실수령액', desc: '기간별 급여 상한, 지급일, 비과세 여부', href: '/w/육아휴직-급여-계산-지급일-세금-실수령액' },
    { badge: '계약직', title: '계약직 육아휴직 사용 조건 급여와 기간', desc: '계약직도 육아휴직 쓸 수 있는 조건', href: '/w/계약직-육아휴직-사용-조건-급여-기간' },
  ],

  sources: [
    { name: '육아휴직 기간 연장 안내', url: 'https://www.korea.kr', org: '정부24' },
    { name: '육아휴직 제도 개편', url: 'https://www.moel.go.kr', org: '고용노동부' },
    { name: '육아휴직 급여 안내', url: 'https://www.ei.go.kr', org: '고용24' },
    { name: '육아휴직 법률정보', url: 'https://easylaw.go.kr', org: '찾기쉬운 생활법령정보' },
    { name: '육아휴직 노동정보', url: 'https://www.nodong.kr', org: '노동OK' },
    { name: '육아휴직 워킹맘 정보', url: 'https://www.gworkingmom.net', org: '워킹맘&대디' },
  ],
}

export default data
