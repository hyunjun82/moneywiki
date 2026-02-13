import Link from 'next/link'
import type { SpokeData } from './types'
import { RateCards, FormulaBox, SpokeChecklist, SpokeFlow, TipBox } from '@/components/spoke/SpokeBlocks'

// --- Table data ---
const TARGET_CONDITIONS = [
  '우선지원대상기업 (중소기업 포함) 기준 충족',
  '대체인력 30일 이상 고용 또는 파견근로자 활용',
  '출산전후휴가·육아휴직·육아기 근로시간 단축 사용 중',
]

const DOCS_LIST = [
  { text: '대체인력 채용 확인서 (사업주 발급)', done: true },
  { text: '근로계약서 사본', done: true },
  { text: '급여명세서 (3개월분)', done: false, note: '신청 기간에 해당하는 급여명세' },
  { text: '재직증명서 (대체인력)', done: false, note: '고용센터 양식' },
]

// --- Spoke Data ---
const data: SpokeData = {
  slug: '육아휴직-대체인력-지원금-신청-대상-금액',

  meta: {
    title: '육아휴직 대체인력 지원금 신청 대상 금액 | 사업주 월 최대 120만원',
    description: '육아휴직 대체인력 지원금은 사업주가 받는 지원금이에요. 신청 방법, 대상 조건, 지원 금액까지 한 번에 확인하세요.',
    keywords: ['육아휴직 대체인력 지원금', '대체인력 지원금 신청', '대체인력 지원금 대상', '대체인력 지원금 금액'],
    ogTitle: '육아휴직 대체인력 지원금 신청 대상 금액 | 사업주 월 최대 120만원 | 머니위키',
    ogDescription: '사업주가 받는 지원금. 신청 방법, 대상, 금액 한 번에 확인.',
  },

  hub: {
    url: '',
    name: '',
  },

  breadcrumb: ['근로/노동', '육아휴직 대체인력 지원금'],

  hero: {
    badge: '2026년 기준',
    h1: <>육아휴직 <span className="text-[#1E3A5F]">대체인력 지원금</span> 신청 대상과 금액</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          직원이 육아휴직 쓸 때마다 인력 공백으로 고민하셨나요?
          대체인력을 고용하거나 기존 직원에게 업무를 분담시키면 <strong className="text-neutral-800">사업주가 받는 지원금</strong>이 있어요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          근로자 본인이 받는 육아휴직 급여와는 별개로, 회사가 신청해서 받는 돈이에요.
          규모에 따라 월 최대 140만원까지 지원되니, 그래서 직접 정리해봤어요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '',
      desc: '',
    },
  },

  toc: [
    { id: 's1', text: '육아휴직 대체인력 지원금 금액은 얼마인가요?' },
    { id: 'rc1', text: '규모별 지원금액', sub: true },
    { id: 's2', text: '대체인력 지원금 대상은 누구인가요?' },
    { id: 'fb1', text: '대상 조건 절차', sub: true },
    { id: 's3', text: '육아휴직 대체인력 지원금 신청은 어떻게 하나요?' },
    { id: 'cl1', text: '필요 서류 체크리스트', sub: true },
    { id: 's4', text: '육아휴직 대체인력 지원금이 뭔가요?' },
    { id: 's5', text: '자주 묻는 질문' },
  ],

  sections: [
    // --- Section 01: 금액 ---
    {
      id: 's1',
      number: '01',
      heading: '육아휴직 대체인력 지원금 금액은 얼마인가요?',
      subtitle: '30인 미만은 월 최대 140만원, 30인 이상은 130만원',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            2026년 기준, <strong>30인 미만 사업장</strong>은 월 최대 <strong>140만원</strong>, <strong>30인 이상 사업장</strong>은 월 최대 <strong>130만원</strong>을 받을 수 있어요.
            대체인력을 고용하지 않고 기존 직원이 업무를 분담하는 경우에는 <strong>업무분담지원금</strong>(30인 미만 월 60만원, 30인 이상 월 40만원)을 받을 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            기존에는 사후지급금이 있었지만, 2026년부터는 <strong>전액 선지급 방식</strong>으로 변경되었어요.
            복직 후 인수인계 기간(1개월)까지 지원이 연장되는 게 포인트예요.{' '}
            <a href="https://www.work24.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">고용24</a>와{' '}
            <a href="https://www.gworkingmom.net" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">워킹맘&대디</a>에서 상세 금액 정보를 확인할 수 있어요.
          </p>

          <RateCards cards={[
            { value: '월 140만원', label: '30인 미만', lines: ['대체인력 고용', '선지급 방식'], highlight: '최대 지원', highlightColor: 'navy', active: true },
            { value: '월 130만원', label: '30인 이상', lines: ['대체인력 고용', '선지급 방식'], highlight: '선지급', highlightColor: 'navy' },
            { value: '월 60만원', label: '업무분담 (30인 미만)', lines: ['기존 직원 활용', '별도 고용 불필요'], highlight: '소규모', highlightColor: 'orange' },
          ]} />

          <p className="text-neutral-600 mb-0 mt-4">자, 금액은 알겠는데 나도 받을 수 있는 건지가 더 중요하잖아요.</p>
        </>
      ),
      bridgeCTA: { href: '#s2', badge: '대상 확인', title: '우리 회사도 신청할 수 있을까요?', desc: '우선지원대상기업 기준 확인', icon: 'info' },
    },

    // --- Section 02: 대상 ---
    {
      id: 's2',
      number: '02',
      heading: '대체인력 지원금 대상은 누구인가요?',
      subtitle: '우선지원대상기업(중소기업)이 대상이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            <strong>우선지원대상기업</strong>(중소기업 포함)이 대상이에요.
            근로자가 출산전후휴가, 육아휴직, 육아기 근로시간 단축을 사용하는 동안 <strong>대체인력을 새로 고용</strong>하거나 <strong>파견근로자를 사용</strong>한 경우에 신청할 수 있어요.
            대체인력은 <strong>30일 이상</strong> 고용해야 해요.{' '}
            <a href="https://www.easylaw.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">법제처 찾기쉬운 생활법령정보</a>에서 상세 조건을 확인할 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            대기업은 제외되고, 우선지원대상기업만 신청할 수 있다는 점이 핵심이에요.
            제조업 기준 300인 미만, 도소매업 200인 미만, 서비스업 100인 미만 등 업종별로 기준이 다르니 꼭 확인하세요.
            대체인력을 직접 고용하든, 파견근로자를 활용하든 모두 인정돼요.
          </p>

          <FormulaBox lines={[
            { text: '// 대상 조건 체크포인트', comment: true },
            { text: '1. 우선지원대상기업 (중소기업 포함) 기준 충족', numbered: true },
            { text: '2. 대체인력 30일 이상 고용 또는 파견근로자 활용', numbered: true },
            { text: '3. 출산전후휴가·육아휴직·육아기 근로시간 단축 사용 중', numbered: true },
          ]} />

          <TipBox title="업무분담 방식도 지원받을 수 있어요">
            <p className="mb-0 leading-relaxed">
              대체인력을 새로 고용하지 않고, <strong>기존 직원</strong>이 업무를 분담하는 경우에도 지원금을 받을 수 있어요.<br />
              이 경우 금액은 다르지만(30인 미만 월 60만원, 30인 이상 월 40만원), 소규모 사업장이라면 현실적인 선택이 될 수 있어요.
            </p>
          </TipBox>

          <p className="text-neutral-600 mb-0 mt-4">여기까지 보면 한 가지 궁금한 게 생기죠. 어떤 서류를 내야 하는지가요.</p>
        </>
      ),
      bridgeCTA: { href: '#s3', badge: '신청 절차', title: '어떻게 신청하죠?', desc: '신청 방법과 필요 서류 확인', icon: 'calc' },
    },

    // --- Section 03: 신청 흐름 ---
    {
      id: 's3',
      number: '03',
      heading: '육아휴직 대체인력 지원금 신청은 어떻게 하나요?',
      subtitle: '대체인력 고용 후 다음 달부터 3개월 단위로 신청',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            지원금은 육아휴직 등 제도를 사용한 다음 달부터 신청할 수 있어요.
            예를 들어 1~3월 동안 대체인력을 고용했다면, 4월에 신청하면 돼요.{' '}
            <a href="https://www.work24.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">고용24</a> 온라인 또는 고용센터에서 신청할 수 있고, 복직 후 인수인계 기간(1개월)까지 지원이 연장돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            신청할 때는 <strong>대체인력 채용 확인서</strong>, <strong>근로계약서</strong>, <strong>급여명세서</strong>를 함께 제출해야 해요.
            3개월마다 반복 신청해야 하니 기한을 놓치지 마세요.
            서류만 제대로 챙기면 신청 자체는 어렵지 않아요.
          </p>

          <SpokeFlow steps={[
            { icon: '👤', label: '대체인력 고용', sub: '30일 이상' },
            { icon: '📅', label: '다음 달 신청', sub: '3개월 단위' },
            { icon: '📋', label: '서류 제출', sub: '채용확인서 등' },
            { icon: '💰', label: '지원금 수령', sub: '통장 입금' },
          ]} />

          <SpokeChecklist items={DOCS_LIST} />

          <p className="text-neutral-600 mb-0 mt-4">신청 절차를 알았으니 이제 이 제도가 정확히 뭔지 정리하고 넘어갈게요.</p>
        </>
      ),
      bridgeCTA: { href: '#s4', badge: '제도 이해', title: '대체인력 지원금의 목적은 뭔가요?', desc: '제도 개요와 취지 확인', icon: 'info' },
    },

    // --- Section 04: 제도 개요 ---
    {
      id: 's4',
      number: '04',
      heading: '육아휴직 대체인력 지원금이 뭔가요?',
      subtitle: '사업주가 받는 지원금, 육아휴직 활성화를 위한 제도예요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            <strong>대체인력 지원금</strong>은 근로자가 출산전후휴가, 육아휴직, 육아기 근로시간 단축을 사용하는 동안 <strong>대체인력을 새로 고용한 사업주</strong>에게 지급하는 지원금이에요.
            사업주의 부담을 줄여서 육아휴직을 더 쓰기 쉽게 만드는 게 목적이에요.{' '}
            <a href="https://www.work24.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">고용24</a>와{' '}
            <a href="https://www.gworkingmom.net" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">워킹맘&대디</a>에서 상세 내용을 확인할 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            이 지원금은 <strong>사업주(회사)</strong>가 받는 거예요.
            근로자 본인이 받는 건 <strong>육아휴직 급여</strong>로, 별도로 신청하는 완전히 다른 제도예요.
            회사는 대체인력 지원금을, 근로자는 육아휴직 급여를 각각 받는다고 이해하면 돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            대체인력을 직접 고용하면 월 최대 140만원, 기존 직원에게 업무를 분담시키면 월 최대 60만원을 지원받을 수 있어요.
            소규모 사업장일수록 인력 공백 부담이 크니, 이 지원금을 적극 활용하세요.
          </p>

          <TipBox title="근로자가 받는 돈이 아니에요">
            <p className="mb-0 leading-relaxed">
              이 지원금은 <strong>사업주(회사)</strong>가 받는 거예요.<br />
              근로자 본인이 받는 건 <strong>육아휴직 급여</strong>로, 별도로 신청해요.<br />
              육아휴직 급여가 궁금하다면 <Link href="/w/육아휴직-급여-계산-지급일-세금-실수령액" className="text-blue-600 hover:underline">육아휴직 급여 계산</Link>을 참고하세요.
            </p>
          </TipBox>
        </>
      ),
      bridgeCTA: { href: '#s5', badge: 'FAQ', title: '대체인력 지원금 궁금한 점 더보기', desc: '자주 묻는 질문으로 의문 해결', icon: 'info' },
    },

    // --- Section 05: FAQ ---
    {
      id: 's5',
      number: '05',
      heading: '자주 묻는 질문',
      subtitle: '대체인력 지원금에 대해 자주 묻는 질문이에요',
      content: null, // FAQ는 template에서 자동 렌더링
    },
  ],

  faq: [
    {
      question: '육아휴직 대체인력 지원금은 근로자도 받을 수 있나요?',
      answer: '아니요. 대체인력 지원금은 <strong>사업주(회사)</strong>가 받는 거예요. 근로자 본인이 받는 건 <strong>육아휴직 급여</strong>로, 별도로 신청해야 해요.',
    },
    {
      question: '대체인력 지원금 신청은 언제까지 해야 하나요?',
      answer: '제도를 사용한 다음 달부터 3개월 단위로 신청할 수 있어요. 예를 들어 1~3월분은 4월에 신청하면 돼요. 복직 후 인수인계 기간(1개월)까지 지원이 연장되니, 늦지 않게 신청하세요.',
    },
  ],

  relatedSpokes: [
    { badge: '급여', title: '육아휴직 급여 계산 지급일 세금 실수령액', desc: '기간별 급여 상한, 지급일, 비과세 여부', href: '/w/육아휴직-급여-계산-지급일-세금-실수령액' },
    { badge: '단축', title: '육아기 근로시간 단축 급여 신청과 계산', desc: '통상임금 80% 급여와 신청 방법', href: '/w/육아기-근로시간-단축-급여-신청-계산' },
  ],

  sources: [
    { name: '고용24', url: 'https://www.work24.go.kr', org: '고용노동부' },
    { name: '워킹맘&대디', url: 'https://www.gworkingmom.net', org: '고용노동부' },
    { name: '법제처 찾기쉬운 생활법령정보', url: 'https://www.easylaw.go.kr', org: '법제처' },
    { name: '쇼플웍스', url: 'https://www.shoplworks.com', org: '쇼플웍스' },
  ],
}

export default data
