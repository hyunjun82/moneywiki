import Link from 'next/link'
import type { SpokeData } from './types'
import { SpokeTable, TipBox, FormulaBox, RateCards } from '@/components/spoke/SpokeBlocks'

// --- Table data ---
const DEBT_PROGRAM_ROWS = [
  ['신속채무조정(일반)', '연체 발생 후', '최대 10년 분할'],
  ['신속채무조정(특례)', '특수 상황', '최대 10년 분할'],
  ['프리워크아웃', '연체 전(조기)', '최대 10년 분할'],
  ['개인워크아웃', '장기연체자', '최대 10년 분할'],
]

const RELIEF_ROWS = [
  ['원금 감면', '최대 15%'],
  ['분할상환', '최장 10년 원금균등분할'],
  ['이자율 조정', '연체이자 감면 또는 면제'],
  ['상환유예', '최대 2년'],
  ['신청비', '5만원 (추가비용 없음)'],
]

// --- Spoke Data ---
const data: SpokeData = {
  slug: '불법사금융-채무조정-추심중단',

  meta: {
    title: '불법사금융 채무 조정 방법 추심 중단과 채무 감면',
    description: '불법사금융 채무로 고통받고 계신다면, 신용회복위원회를 통해 추심 중단과 채무 감면을 받을 수 있어요. 신청 방법부터 감면 범위까지 정리했어요.',
    keywords: ['불법사금융 채무 조정', '불법사금융 추심 중단', '신용회복위원회 지원', '불법사금융 채무 감면'],
    ogTitle: '불법사금융 채무 조정 방법 추심 중단과 채무 감면 | 머니위키',
    ogDescription: '신용회복위원회 채무 조정으로 추심 중단, 원금 감면, 분할상환까지.',
  },

  hub: {
    url: '/w/불법사금융-전체가이드',
    name: '불법사금융 전체가이드',
  },

  breadcrumb: ['복지', '불법사금융 채무 조정'],

  hero: {
    badge: '2026년 기준',
    h1: <>불법사금융 <span className="text-[#1E3A5F]">채무 조정</span> 방법 — 추심 중단과 채무 감면</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          불법사금융 빚 때문에 밤잠을 못 이루고 계신다면, 혼자 감당하지 않아도 돼요.<br />
          <strong className="text-neutral-800">신용회복위원회</strong>를 통하면 추심을 멈추고 빚도 줄일 수 있어요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          쉽게 말해서 국가가 인정한 기관에서 채무를 조정해 주는 제도예요.<br />
          불법사금융 관련 전체 대응 방법은 <Link href="/w/불법사금융-전체가이드" className="text-blue-600 hover:underline">불법사금융 전체가이드</Link>에 모아뒀어요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '올인원',
      desc: '신고, 추심 차단, 채무 조정, 법률 지원까지 한 페이지에',
    },
  },

  toc: [
    { id: 's1', text: '불법사금융 채무 조정은 뭔가요?' },
    { id: 's2', text: '불법사금융 추심은 어떻게 중단하나요?' },
    { id: 's3', text: '신용회복위원회에서 지원받을 수 있나요?' },
    { id: 's4', text: '불법사금융 채무 감면은 얼마나 되나요?' },
    { id: 's5', text: '자주 묻는 질문' },
  ],

  sections: [
    // --- Section 01: 채무 조정이란 ---
    {
      id: 's1',
      number: '01',
      heading: '불법사금융 채무 조정은 뭔가요?',
      subtitle: '갚기 어려운 빚을 줄여주고, 다시 시작할 수 있게 도와주는 제도예요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            <strong>채무 조정</strong>이란 빚을 갚기 어려운 상황에 놓인 분들을 위해 원금을 깎아주거나, 이자를 줄여주거나, 상환 기간을 늘려주는 제도예요. 불법사금융에 시달리고 있다면 더더욱 이 제도가 필요해요. <a href="https://www.ccrs.or.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">신용회복위원회</a>가 채무자와 채권자 사이에서 조정 역할을 해줘요. 혼자서 불법 업자와 싸울 필요 없이, 공식 기관이 대신 나서주는 거예요.
          </p>

          <FormulaBox lines={[
            { text: '// 채무 조정의 핵심 흐름', comment: true },
            { text: '1. 신용회복위원회에 상담 신청 (1600-5500)', numbered: true },
            { text: '2. 채무 현황 파악 및 조정안 마련', numbered: true },
            { text: '3. 채권자(금융회사)와 합의', numbered: true },
            { text: '4. 조정된 조건으로 분할상환 시작', numbered: true },
          ]} />

          <TipBox title="불법사금융도 채무 조정이 되나요?">
            <p className="mb-0 leading-relaxed">
              불법사금융은 등록되지 않은 대부업이라 직접적인 채무 조정 대상은 아니에요. 하지만 <strong>서민금융진흥원</strong>의 불법사금융 원스톱 지원을 통해 불법채무 확인, 추심 중단, 대환대출까지 연계받을 수 있어요. 합법적인 채무가 함께 있다면 신용회복위원회에서 통합 조정도 가능해요.
            </p>
          </TipBox>

          <p className="text-neutral-600 mb-0">채무 조정이 뭔지 알았다면, 가장 급한 건 추심을 멈추는 거예요.</p>
        </>
      ),
      bridgeCTA: { href: '#s2', badge: '추심 차단', title: '지금 당장 추심을 멈출 수 있을까?', desc: '신청 다음 날부터 추심이 중단되는 방법', icon: 'info' },
    },

    // --- Section 02: 추심 중단 ---
    {
      id: 's2',
      number: '02',
      heading: '불법사금융 추심은 어떻게 중단하나요?',
      subtitle: '채무 조정 신청만 하면 다음 날부터 추심이 멈춰요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            <strong>채무 조정을 신청하면 그 다음 날부터</strong> 협약에 가입한 금융회사의 추심이 중단돼요. 이건 법적으로 보장되는 권리예요. 불법사금융의 경우에도 원스톱 신고를 접수하면 추심 중단 효력이 생겨요. 밤낮없이 걸려오던 전화, 문자, 방문 추심을 공식적으로 막을 수 있어요.
          </p>

          <FormulaBox lines={[
            { text: '// 추심 중단 신청 방법', comment: true },
            { text: '1. 신용회복위원회 상담 (1600-5500 또는 ccrs.or.kr)', numbered: true },
            { text: '2. 채무 조정 신청서 제출', numbered: true },
            { text: '3. 다음 날부터 협약 금융회사 추심 중단', numbered: true },
            { text: '4. 불법사금융은 서민금융진흥원(1397) 원스톱 신고 병행', numbered: true },
          ]} />

          <RateCards cards={[
            { value: '최대 15%', label: '원금 감면', lines: ['신용회복위원회 채무 조정', '원금 일부 감면 가능'], highlight: '감면', highlightColor: 'navy' as const },
            { value: '최장 10년', label: '분할상환', lines: ['원금균등분할 방식', '상환 부담 대폭 완화'], active: true },
            { value: '최대 2년', label: '상환 유예', lines: ['당장 갚기 어려울 때', '유예 후 분할상환 시작'], highlight: '유예', highlightColor: 'navy' as const },
          ]} />

          <p className="text-neutral-600 mb-0">추심이 멈추면, 이제 본격적으로 채무를 줄이는 방법을 알아볼 차례예요.</p>
        </>
      ),
      bridgeCTA: { href: '#s3', badge: '지원 제도', title: '신용회복위원회에서 어떤 도움을 받을 수 있을까?', desc: '채무 감면부터 대환대출 연계까지', icon: 'info' },
    },

    // --- Section 03: 신용회복위원회 지원 ---
    {
      id: 's3',
      number: '03',
      heading: '신용회복위원회에서 지원받을 수 있나요?',
      subtitle: '채무 감면, 분할상환, 이자 조정, 상환유예까지 다양한 지원이 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            <a href="https://www.ccrs.or.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">신용회복위원회</a>는 과도한 빚으로 어려움을 겪는 분들의 경제적 재기를 돕는 공적 기관이에요. 채무 감면, 이자율 조정, 분할상환, 상환 기간 연장, 상환유예까지 상황에 맞는 맞춤형 지원을 받을 수 있어요. 신청비는 5만원이고, 그 외에 추가 비용은 없어요. 전국 <strong>50개 서민금융통합지원센터</strong>에서 대면 상담도 가능해요.
          </p>

          <SpokeTable
            id="tbl1"
            title="채무 조정 프로그램 종류"
            subtitle="상황에 따라 적합한 프로그램이 달라요"
            headers={['프로그램', '신청 시점', '상환 조건']}
            rows={DEBT_PROGRAM_ROWS}
          />

          <TipBox title="불법사금융 피해자라면 추가 지원도 있어요">
            <p className="mb-0 leading-relaxed">
              <a href="https://www.kinfa.or.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">서민금융진흥원</a>에서 <strong>불법사금융예방대출</strong>을 연계받을 수 있어요. 실질 금리 6.3%로 불법 고금리 대출을 갈아탈 수 있어요. 대한법률구조공단(132)에서는 무료 법률 상담과 소송 지원도 받을 수 있어요.
            </p>
          </TipBox>

          <p className="text-neutral-600 mb-0">그렇다면 실제로 빚이 얼마나 줄어드는지 구체적으로 확인해 볼까요?</p>
        </>
      ),
      bridgeCTA: { href: '#s4', badge: '감면 범위', title: '실제로 빚이 얼마나 줄어들까?', desc: '원금 감면부터 분할상환 조건까지 확인', icon: 'calc' },
    },

    // --- Section 04: 채무 감면 범위 ---
    {
      id: 's4',
      number: '04',
      heading: '불법사금융 채무 감면은 얼마나 되나요?',
      subtitle: '원금 최대 15% 감면, 최장 10년 분할상환이 가능해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            신용회복위원회를 통한 채무 조정에서 <strong>원금은 최대 15%까지 감면</strong>받을 수 있어요. 연체이자는 전액 감면되거나 크게 줄어들고, 남은 금액은 최장 10년에 걸쳐 원금균등분할로 갚으면 돼요. 상환이 당장 어렵다면 최대 2년까지 유예도 가능해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            불법사금융의 경우 원래 계약 자체가 불법이기 때문에 법률구조공단을 통해 계약 무효를 주장할 수도 있어요. <a href="https://easylaw.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">찾기쉬운 생활법령정보</a>에서 관련 법령을 확인할 수 있어요. 불법 이자(연 20% 초과)로 이미 낸 돈은 원금에서 차감되거나 돌려받을 수 있어요.
          </p>

          <SpokeTable
            id="tbl2"
            title="채무 감면 및 조정 내용"
            subtitle="신용회복위원회 기준"
            headers={['항목', '내용']}
            rows={RELIEF_ROWS}
            highlightCol={1}
          />

          <TipBox title="신청 전에 꼭 알아두세요">
            <p className="mb-0 leading-relaxed">
              채무 조정 기간 중에는 <strong>신규 대출이 제한</strong>돼요. 조정안대로 성실하게 상환을 마치면 신용정보가 해제되고, 신용등급 회복도 가능해요. 중간에 3회 이상 연체하면 조정이 취소될 수 있으니 꾸준히 갚는 게 중요해요.
            </p>
          </TipBox>
        </>
      ),
      bridgeCTA: { href: '/w/불법사금융-전체가이드', badge: '전체가이드', title: '불법사금융 대응 방법 전체 보기', desc: '신고, 추심 차단, 법률 지원까지 총정리', icon: 'grid', primary: true },
    },

    // --- Section 05: FAQ ---
    {
      id: 's5',
      number: '05',
      heading: '자주 묻는 질문',
      subtitle: '불법사금융 채무 조정에 대해 자주 묻는 질문이에요',
      content: null,
    },
  ],

  faq: [
    {
      question: '불법사금융 채무 조정 신청하면 신용등급에 영향이 있나요?',
      answer: '채무 조정을 신청하면 일시적으로 신용정보에 등록돼요. 하지만 조정안대로 <strong>성실하게 상환을 완료</strong>하면 등록 정보가 해제되고, 신용등급도 점차 회복돼요. 빚을 방치하는 것보다 조정을 받는 편이 신용 회복에 훨씬 유리해요.',
    },
    {
      question: '불법사금융 채무 조정 비용은 얼마나 드나요?',
      answer: '신용회복위원회 채무 조정 <strong>신청비는 5만원</strong>이에요. 그 외에 추가 비용은 전혀 없어요. 대한법률구조공단(132)의 법률 상담도 무료이고, 서민금융진흥원의 불법사금융 원스톱 지원도 비용이 들지 않아요.',
    },
  ],

  relatedSpokes: [
    { badge: '신고', title: '불법사금융 피해 신고 원스톱 지원', desc: '금감원 신고부터 원스톱 지원 신청까지', href: '/w/불법사금융-피해-신고-원스톱-지원' },
    { badge: '법률', title: '불법사금융 법률 구조 무료 소송', desc: '무료 변호사 지원과 채무자대리인 선임', href: '/w/불법사금융-법률구조-무료소송' },
  ],

  sources: [
    { name: '신용회복위원회', url: 'https://www.ccrs.or.kr', org: '신용회복위원회' },
    { name: '서민금융진흥원', url: 'https://www.kinfa.or.kr', org: '서민금융진흥원' },
    { name: '찾기쉬운 생활법령정보', url: 'https://easylaw.go.kr', org: '법제처' },
  ],
}

export default data
