import Link from 'next/link'
import type { SpokeData } from './types'
import { SpokeTable, TipBox, SpokeRateBars, SpokeTimeline, SpokeCompareCards } from '@/components/spoke/SpokeBlocks'

// --- Table data ---
const DOCUMENTS_TABLE_ROWS = [
  ['육아기 근로시간 단축 확인서', '사업주 발급', '단축 사실 증명'],
  ['급여 신청서', '본인 작성', '고용24 양식'],
  ['근로조건 증명자료', '임금대장, 근로계약서 사본', '통상임금 확인용'],
]

// --- Spoke Data ---
const data: SpokeData = {
  slug: '육아기-근로시간-단축-급여-신청-계산',

  meta: {
    title: '육아기 근로시간 단축 급여 신청 계산 | 주 15~35시간 급여 보전 방법',
    description: '육아기 근로시간 단축 급여 신청 방법, 계산 방식, 지급 기준을 정리했어요. 최대 2년 사용 가능하고, 최초 10시간은 통상임금 100% 보전받을 수 있어요.',
    keywords: ['육아기 근로시간 단축', '육아기 근로시간 단축 급여', '육아기 근로시간 단축 신청', '육아기 근로시간 단축 계산 방법'],
    ogTitle: '육아기 근로시간 단축 급여 신청 계산 | 주 15~35시간 급여 보전 방법 | 머니위키',
    ogDescription: '신청 방법부터 급여 계산까지 한 번에 정리.',
  },

  hub: {
    url: '',
    name: '',
  },

  breadcrumb: ['근로/노동', '육아기 근로시간 단축'],

  hero: {
    badge: '2026년 기준',
    h1: <>육아기 <span className="text-[#1E3A5F]">근로시간 단축</span> 급여 신청과 계산 방법</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          육아휴직은 부담스러운데 근무시간만 조금 줄였으면 싶은 분들이 많아요.<br />
          육아기 근로시간 단축은 주 15~35시간으로 근무하면서 줄어든 시간분 급여를 고용보험에서 보전받는 제도예요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          만 12세 이하 자녀만 있으면 누구나 신청할 수 있고, 최대 2년까지 쓸 수 있어요.<br />
          먼저 단축 비율부터 한번 볼게요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '',
      desc: '',
    },
  },

  toc: [
    { id: 's1', text: '육아기 근로시간 단축이 뭔가요?' },
    { id: 's2', text: '육아기 근로시간 단축 급여는 얼마인가요?' },
    { id: 's3', text: '육아기 근로시간 단축 신청은 어떻게 하나요?' },
    { id: 'tbl1', text: '필요 서류', sub: true },
    { id: 's4', text: '육아기 근로시간 단축 계산 방법은 뭔가요?' },
    { id: 's5', text: '자주 묻는 질문' },
  ],

  sections: [
    // --- Section 01: 제도 개요 + 단축 비율 막대 차트 ---
    {
      id: 's1',
      number: '01',
      heading: '육아기 근로시간 단축이 뭔가요?',
      subtitle: '만 12세 이하 자녀를 위해 주 15~35시간으로 근무하는 제도예요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            <strong>육아기 근로시간 단축</strong>은 만 12세 이하 또는 초등학교 6학년 이하 자녀를 양육하기 위해 근로시간을 줄일 수 있는 제도예요.{' '}
            <a href="https://easylaw.go.kr/CSP/CnpClsMain.laf?csmSeq=1706&ccfNo=1&cciNo=1&cnpClsNo=1" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">남녀고용평등법 제19조의2</a>에
            따라 사업주는 정당한 사유 없이 거부할 수 없어요.
            주 15~35시간으로 단축할 수 있고, 육아휴직 대신 또는 함께 사용할 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            회사에서는 줄어든 시간만큼 임금도 줄지만, 고용보험이 급여로 보전해 주니까 실제 소득 감소폭은 크지 않아요.
            단축 시작 30일 전에 회사에 서면으로 신청하고, 급여는 단축 시작 1개월 후부터 신청하면 돼요.
            최대 2년까지 사용 가능하며, 육아휴직 미사용 기간을 포함해서 계산돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            단축 폭이 크면 받는 급여도 달라지기 때문에 미리 비율을 알아두면 좋아요.
            아래 차트로 단축 수준별로 근로시간이 얼마나 줄어드는지 확인해 보세요.
          </p>

          <SpokeRateBars bars={[
            { label: '주 40시간 (일반)', rate: '100%', width: '100%' },
            { label: '주 35시간 (최소 단축)', rate: '87.5%', width: '87.5%' },
            { label: '주 25시간 (중간 단축)', rate: '62.5%', width: '62.5%' },
            { label: '주 15시간 (최대 단축)', rate: '37.5%', width: '37.5%' },
          ]} />

          <p className="text-neutral-600 mb-0">단축 비율은 알겠는데, 줄어든 시간에 대한 급여는 얼마나 받을 수 있을까요?</p>
        </>
      ),
      bridgeCTA: { href: '#s2', badge: '급여 계산', title: '육아기 근로시간 단축 급여는 얼마나 되나요?', desc: '최초 10시간은 100%, 나머지는 80% 보전', icon: 'calc' },
    },

    // --- Section 02: 급여 + 비교 카드 ---
    {
      id: 's2',
      number: '02',
      heading: '육아기 근로시간 단축 급여는 얼마인가요?',
      subtitle: '최초 주 10시간은 통상임금 100%, 나머지는 80% 지급돼요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            육아기 근로시간 단축 급여는 단축한 시간에 비례해서 지급돼요.
            <a href="https://www.work24.go.kr/cm/cntnts/cntntsView.do?cntntsId=1752&menuId=20301" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">고용보험법 시행령</a>에
            따라 최초 주 10시간 단축분은 통상임금의 <strong>100%</strong>, 나머지 단축분은 통상임금의 <strong>80%</strong>를 지급해요.
            2026년 기준 상한액이 정해져 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            최초 10시간분은 통상임금 25%의 100%이니까 결국 통상임금의 25%를 받는 거예요.
            나머지 단축 시간은 해당 비율의 80%를 받고요.
            각각 상한액이 적용돼서 고소득자라고 무한정 받는 건 아니에요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            예를 들어 통상임금 300만원을 받던 사람이 주 40시간에서 주 25시간으로 줄였다면, 최초 10시간분은 75만원(300만 × 25%)이고 나머지 5시간분은 30만원(300만 × 12.5% × 80%)을 받아요.
            합계로 약 105만원을 고용보험에서 받고, 회사에서는 25시간분 임금 약 187.5만원을 받으니까 총 수입은 약 292.5만원이 되는 거죠.
          </p>

          <SpokeCompareCards cards={[
            {
              title: '최초 주 10시간분',
              subtitle: '통상임금 100% 보전',
              items: ['통상임금 × 25% × 100%', '상한 월 250만원', '가장 많이 받는 부분'],
              recommended: true,
              recLabel: '핵심'
            },
            {
              title: '나머지 단축분',
              subtitle: '통상임금 80% 보전',
              items: ['통상임금 × 단축비율 × 80%', '상한 월 160만원', '추가 단축시 적용'],
              recommended: false
            },
          ]} />

          <TipBox title="상한액 주의">
            <p className="mb-0 leading-relaxed">
              통상임금이 높아도 급여는 <strong>최초 10시간분 월 250만원, 나머지 월 160만원</strong>이 최대예요.<br />
              예를 들어 통상임금 500만원이어도 최초 10시간분 급여는 125만원(500만 × 25%)이 아니라 상한인 250만원까지만 받아요.<br />
              상한 초과 여부는 신청 전에 고용센터에 문의하면 확인할 수 있어요.
            </p>
          </TipBox>

          <p className="text-neutral-600 mb-0">금액을 알았으니 이제 실제 신청 절차로 넘어갈게요.</p>
        </>
      ),
      bridgeCTA: { href: '#s3', badge: '신청 절차', title: '육아기 근로시간 단축 신청은 어떻게 하나요?', desc: '사업주 신청 → 급여 신청 순서로 진행', icon: 'clock' },
    },

    // --- Section 03: 신청 + 타임라인 + 테이블 ---
    {
      id: 's3',
      number: '03',
      heading: '육아기 근로시간 단축 신청은 어떻게 하나요?',
      subtitle: '단축 시작 30일 전 사업주 신청, 급여는 1개월 후 고용24에서 신청',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            육아기 근로시간 단축 신청은 두 단계로 나뉘어요.
            먼저 회사에 단축을 신청하고, 단축 시작 1개월 후부터 고용보험에 급여를 신청하면 돼요.
            <a href="https://www.moel.go.kr/callCenter/1350/1350_04_01.do?mid=74" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">고용노동부 1350 상담센터</a>에서
            자세한 안내를 받을 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            회사 신청은 단축 시작일 기준 최소 30일 전에 해야 하고, 급여 신청은 단축 시작 후 1개월이 지나야 가능해요.
            급여는 단축 종료 후 12개월 이내까지 신청할 수 있지만, 빨리 할수록 좋아요.
            타임라인으로 정리하면 이렇게 진행돼요.
          </p>

          <SpokeTimeline events={[
            { month: '단축 30일 전', title: '회사에 단축 신청', desc: '서면으로 단축 기간·시간 협의', status: 'normal' },
            { month: '단축 시작', title: '근로시간 단축 개시', desc: '협의한 시간으로 근무 시작', status: 'current', tag: '시작' },
            { month: '단축 1개월 후', title: '고용24 급여 신청', desc: '온라인 또는 고용센터 방문', status: 'warning', tag: '주요' },
            { month: '심사 후', title: '급여 지급 개시', desc: '매월 지정 계좌로 입금', status: 'normal' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            온라인 신청은 고용24(ei.go.kr) 웹사이트에서 하면 되고, 직접 방문하고 싶으면 관할 고용센터에 가면 돼요.
            필요한 서류는 아래 표에 정리했어요.
          </p>

          <SpokeTable
            id="tbl1"
            title="육아기 근로시간 단축 급여 신청 필요 서류"
            subtitle="고용24 또는 고용센터 제출"
            headers={['서류명', '발급처', '용도']}
            rows={DOCUMENTS_TABLE_ROWS}
          />

          <p className="text-neutral-600 mb-0">그런데 한 가지 궁금한 게 있어요. 급여를 정확히 어떻게 계산하는 건지 말이죠.</p>
        </>
      ),
      bridgeCTA: { href: '#s4', badge: '계산 공식', title: '육아기 근로시간 단축 급여 계산 방법은?', desc: '단축 전후 근로시간과 통상임금으로 계산', icon: 'calc' },
    },

    // --- Section 04: 계산 방법 + 공식 + 팁 ---
    {
      id: 's4',
      number: '04',
      heading: '육아기 근로시간 단축 계산 방법은 뭔가요?',
      subtitle: '단축 전후 소정근로시간과 통상임금으로 계산해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            육아기 근로시간 단축 급여는 <strong>단축한 시간 비율</strong>과 <strong>통상임금</strong>을 곱해서 계산해요.
            <a href="https://www.work24.go.kr/cm/cntnts/cntntsView.do?cntntsId=1752&menuId=20301" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">고용보험법 시행령</a>에
            따라 최초 주 10시간분과 나머지 단축분을 나눠서 계산하고, 각각 상한액을 적용해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            단축 비율은 단축 전 소정근로시간에서 단축 후 소정근로시간을 뺀 뒤, 단축 전 시간으로 나누면 나와요.
            그러니까 주 40시간에서 주 25시간으로 줄였다면 단축 비율은 (40-25)/40 = 37.5%가 되는 거죠.
            이 중 10시간분은 100% 보전, 나머지 5시간분은 80% 보전이에요.
          </p>

          <TipBox title="계산 예시: 통상임금 300만원, 주 40시간 → 25시간">
            <p className="mb-0 leading-relaxed">
              • 최초 10시간분: 300만원 × (10/40) × 100% = <strong>75만원</strong><br />
              • 나머지 5시간분: 300만원 × (5/40) × 80% = <strong>30만원</strong><br />
              • 급여 합계: 75만원 + 30만원 = <strong>105만원</strong><br />
              • 회사 임금(25시간분): 300만원 × (25/40) = <strong>187.5만원</strong><br />
              • 총 수입: 105만원 + 187.5만원 = <strong>약 292.5만원</strong><br /><br />
              단축 전 월급 300만원에서 약 7.5만원만 줄어들어요.
            </p>
          </TipBox>

          <p className="text-neutral-600 mb-4 leading-relaxed">
            상한액은 최초 10시간분이 월 250만원, 나머지 단축분이 월 160만원이에요.
            통상임금이 높아도 이 상한액을 초과해서 받을 수는 없으니까, 고소득자는 실제 보전율이 100%나 80%보다 낮아질 수 있어요.
            하한액은 월 70만원이라서, 통상임금이 낮아도 최소 70만원은 보장돼요.
          </p>
        </>
      ),
      bridgeCTA: { href: '#s5', badge: 'FAQ', title: '육아기 근로시간 단축 자주 묻는 질문', desc: '궁금한 점 해결하기', icon: 'info' },
    },

    // --- Section 05: FAQ ---
    {
      id: 's5',
      number: '05',
      heading: '자주 묻는 질문',
      subtitle: '육아기 근로시간 단축에 대해 자주 묻는 질문이에요',
      content: null, // FAQ는 template에서 자동 렌더링
    },
  ],

  faq: [
    {
      question: '육아기 근로시간 단축과 육아휴직을 동시에 사용할 수 있나요?',
      answer: '동시에는 불가능하고, <strong>순차적으로는 가능</strong>해요. 예를 들어 육아휴직 1년 사용 후 육아기 근로시간 단축 1년 사용하면 총 2년 사용할 수 있어요. 두 제도를 합쳐서 최대 2년까지 사용할 수 있어요.',
    },
    {
      question: '육아기 근로시간 단축 급여는 언제까지 신청해야 하나요?',
      answer: '단축 종료 후 <strong>12개월 이내</strong>에 신청해야 해요. 단축 시작 1개월 후부터 신청할 수 있으니까, 단축 기간 중에 미리 신청하는 게 좋아요. 기한 내 신청하지 않으면 급여를 받을 수 없으니 주의하세요.',
    },
  ],

  relatedSpokes: [
    { badge: '급여', title: '육아휴직 급여 계산 지급일 세금 실수령액', desc: '기간별 급여 상한, 지급일, 비과세 여부', href: '/w/육아휴직-급여-계산-지급일-세금-실수령액' },
    { badge: '기간', title: '육아휴직 기간 연장 분할 사용 방법', desc: '최대 1년 6개월, 분할 횟수 제한', href: '/w/육아휴직-기간-연장-분할-사용' },
  ],

  sources: [
    { name: '남녀고용평등법 제19조의2', url: 'https://easylaw.go.kr/CSP/CnpClsMain.laf?csmSeq=1706&ccfNo=1&cciNo=1&cnpClsNo=1', org: '찾기쉬운 생활법령정보' },
    { name: '육아기 근로시간 단축 제도', url: 'https://www.work24.go.kr/cm/cntnts/cntntsView.do?cntntsId=1752&menuId=20301', org: '고용노동부 워크넷' },
    { name: '고용노동부 1350 상담센터', url: 'https://www.moel.go.kr/callCenter/1350/1350_04_01.do?mid=74', org: '고용노동부' },
  ],
}

export default data
