import type { SpokeData } from '@/data/spoke/types'
import {
  SpokeTable,
  SpokeCompareCards,
  FormulaBox,
  SpokeChecklist,
  TipBox,
  SpokeLinks,
} from '@/components/spoke/SpokeBlocks'
import 기초일액Checker from '@/components/checkers/기초일액Checker'

const data: SpokeData = {
  slug: '실업급여-기초일액',

  meta: {
    title: '실업급여 기초일액 평균임금 60% 계산 | 상한액 하한액 적용 기준',
    description: '실업급여를 하루에 얼마 받는지 궁금하시죠? 기초일액은 평균임금의 60%인데, 2026년 상한액 68,100원·하한액 66,048원 적용 기준과 월급별 계산법을 정리해드려요.',
    keywords: [
      '실업급여 기초일액',
      '평균임금 60% 계산',
      '상한액 하한액',
      '적용 기준',
    ],
    ogTitle: '실업급여 기초일액 평균임금 60% 계산 | 머니위키',
    ogDescription: '기초일액 상한 68,100원·하한 66,048원 계산 기준과 월급별 적용 사례를 정리했어요.',
  },

  hub: {
    url: '/w/실업급여-수급-조건-신청-방법-2026',
    name: '실업급여 수급 조건 신청 방법 2026',
  },

  breadcrumb: ['고용·노동', '실업급여', '기초일액'],

  summary3: [
    <>기초일액은 <strong>퇴직 전 3개월 평균임금 ÷ 30 × 60%</strong>로 계산해요</>,
    <>2026년 기준 <strong>상한액 68,100원, 하한액 66,048원</strong>이에요</>,
    <>월급 330만원 이하면 하한액, 342만원 이상이면 <strong>상한액이 적용돼요</strong></>,
  ],

  sourceBar: {
    badge: '출처',
    name: '고용보험법 제45조',
    date: '2026.02',
  },

  prevNext: {
    prev: { title: '실업급여 기준기간 이직일 이전 18개월', href: '/w/실업급여-기준기간' },
    next: { title: '실업급여 수급기간 소정급여일수 기준', href: '/w/실업급여-수급기간-소정급여일수-기준' },
  },

  stickyBar: {
    topLabel: '2026년 상한액',
    value: '1일 68,100원',
    buttonText: '내 기초일액 확인 →',
    href: '/w/실업급여-금액-계산-연봉별-수령액',
  },

  hero: {
    badge: '2026년 기준',
    h1: (
      <>
        실업급여 <span className="text-[#1E3A5F]">기초일액</span> 평균임금 60% 계산{' '}| 상한액 하한액 적용 기준
      </>
    ),
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          실업급여를 받게 됐는데 &quot;1일 얼마예요?&quot;가 궁금하셨다면 이 글 하나로 정리돼요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          기초일액은 <strong className="text-neutral-800">퇴직 전 3개월 평균임금의 60%</strong>인데, 상한과 하한이 정해져 있어서 대부분 비슷한 금액을 받아요.
          2026년 기준 1일 최대 68,100원, 최소 66,048원이에요.
          <a href="/w/실업급여-2026-개정-상한액-하한액-인상-변경" className="text-[#4A7AB5] underline">상한액·하한액 변경 내용</a>도 아래에서 바로 이어서 볼 수 있어요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          계산 공식부터 월급별 적용 사례까지 순서대로 정리해드릴게요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '실업급여 수급 조건·신청 방법·금액 전체 안내',
    },
  },

  toc: [
    { id: 'checker', label: '내 기초일액 확인' },
    { id: 's1', label: '실업급여 기초일액는 어떻게 계산하나요?' },
    { id: 's2', label: '실업급여 평균임금 60%는 어떻게 산정하나요?' },
    { id: 's3', label: '실업급여 상한액 하한액은 얼마인가요?' },
    { id: 's4', label: '실업급여 1일 지급액 적용 기준은 어떻게 되나요?' },
    { id: 's-faq', label: '자주 묻는 질문' },
  ],

  sections: [
    // --- CHECKER ---
    {
      id: 'checker',
      number: 'CHECK',
      heading: '내 월급으로 기초일액 예상 금액 확인하기',
      subtitle: '월급 구간을 선택하면 적용되는 기초일액을 바로 알 수 있어요',
      content: (
        <기초일액Checker />
      ),
    },

    // --- SECTION 01: 기초일액 계산 ---
    {
      id: 's1',
      number: 'SECTION 01',
      heading: '실업급여 기초일액는 어떻게 계산하나요?',
      subtitle: '퇴직 전 3개월 평균임금을 기준으로 계산해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            기초일액은 실업급여를 하루 기준으로 얼마나 받는지를 정하는 금액이에요.
            이 기초일액에 수급일수를 곱하면 전체 실업급여 총액이 나오는 거예요.
            계산 공식은 간단한데, 상한과 하한이 있어서 실제로는 대부분 비슷한 범위에서 결정돼요.
            세전 월급을 기준으로 계산하기 때문에 실수령액이 아니라 근로계약서에 적힌 금액을 써야 해요.
          </p>

          <FormulaBox lines={[
            { text: '기초일액 계산 공식', comment: true },
            { text: '기초일액 = (퇴직 전 3개월 평균임금 ÷ 30) × 60%' },
            { text: '' },
            { text: '적용 범위 (2026년 기준)', comment: true },
            { text: '최솟값 (하한액): 1일 66,048원' },
            { text: '최댓값 (상한액): 1일 68,100원' },
          ]} />

          <SpokeLinks
            title="실업급여 금액 관련 안내"
            items={[
              { num: '01', heading: '실업급여 수급기간 소정급여일수', desc: '나이·가입기간별 수급일수 120~270일', href: '/w/실업급여-수급기간-소정급여일수-기준' },
              { num: '02', heading: '실업급여 금액 계산 연봉별 수령액', desc: '연봉별 예상 실업급여 수령액 정리', href: '/w/실업급여-금액-계산-연봉별-수령액' },
            ]}
          />

          <p className="text-neutral-600 mb-0">
            공식은 간단한데, &quot;3개월 평균임금&quot;을 어떻게 구하는지 궁금해지셨죠?
          </p>
        </>
      ),
      bridgeCTA: {
        href: '/w/실업급여-금액-계산-연봉별-수령액',
        badge: '수령액 계산',
        title: '실업급여를 전체적으로 얼마나 받나요?',
        desc: '연봉별 예상 수령액과 총액 계산법 안내',
        icon: 'calc',
      },
    },

    // --- SECTION 02: 평균임금 계산 ---
    {
      id: 's2',
      number: 'SECTION 02',
      heading: '실업급여 평균임금 60%는 어떻게 산정하나요?',
      subtitle: '퇴직 전 3개월 세전 월급을 기준으로 해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            평균임금은 퇴직한 날 기준으로 역산해서 3개월 동안 받은 세전 총 임금을 90일로 나누면 돼요.
            연봉제라면 연봉을 12개월로 나눈 월 기준 임금을 30일로 나눠서 쓰면 돼요.
            중요한 건 실수령액이 아니라 <strong>세전 총 지급액(근로계약서 기준)</strong>을 써야 한다는 거예요.
            만약 퇴직 전 3개월 중 휴직이나 무급 기간이 있었다면 회사에 정정을 요청할 수 있어요.
          </p>

          <SpokeTable
            id="tbl-calc"
            title="월급별 기초일액 계산 예시"
            subtitle="2026년 상한액 68,100원·하한액 66,048원 기준"
            headers={['월급', '1일 평균임금', '60% 계산', '실제 기초일액']}
            rows={[
              ['200만원', '66,667원', '40,000원', '66,048원 (하한액 적용)'],
              ['300만원', '100,000원', '60,000원', '66,048원 (하한액 적용)'],
              ['350만원', '116,667원', '70,000원', '68,100원 (상한액 적용)'],
              ['500만원', '166,667원', '100,000원', '68,100원 (상한액 적용)'],
            ]}
            highlightCol={3}
          />

          <SpokeLinks
            title="상한·하한 변경 기준 확인"
            items={[
              { num: '01', heading: '2026년 실업급여 상한액 하한액 변경', desc: '상한 68,100원 인상 배경과 적용 기준', href: '/w/실업급여-2026-개정-상한액-하한액-인상-변경' },
              { num: '02', heading: '실업급여 기준기간 18개월', desc: '피보험기간 180일 합산 방법', href: '/w/실업급여-기준기간' },
            ]}
          />
        </>
      ),
      bridgeCTA: {
        href: '/w/실업급여-2026-개정-상한액-하한액-인상-변경',
        badge: '2026년 변경',
        title: '2026년에 상한액이 왜 바뀌었나요?',
        desc: '하한액이 상한액을 역전한 이유와 인상 배경',
        icon: 'info',
      },
    },

    // --- SECTION 03: 상한액 하한액 ---
    {
      id: 's3',
      number: 'SECTION 03',
      heading: '실업급여 상한액 하한액은 얼마인가요?',
      subtitle: '2026년 기준 상한 68,100원·하한 66,048원이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            상한액은 고소득자가 지나치게 많이 받는 걸 방지하기 위한 한도예요.
            하한액은 저소득자도 기본 생활을 유지할 수 있도록 최솟값을 보장하는 제도예요.
            재밌는 건 상한과 하한의 차이가 1일 2,052원밖에 안 된다는 거예요.
            그래서 월급 수준에 관계없이 대부분 비슷한 금액을 받게 되는 구조예요.
          </p>

          <SpokeCompareCards cards={[
            {
              title: '상한액',
              subtitle: '1일 최대 68,100원',
              items: [
                '월급 342만원 이상이면 적용',
                '60% 계산 결과가 68,100원 초과 시',
                '고소득자도 이 금액이 상한선',
                '매년 최저임금 기준으로 조정',
              ],
              recommended: true,
              recLabel: '2026년 신규 기준',
            },
            {
              title: '하한액',
              subtitle: '1일 최소 66,048원',
              items: [
                '월급 330만원 이하이면 적용',
                '60% 계산 결과가 66,048원 미만 시',
                '최저임금의 80%가 기준',
                '매년 최저임금 인상에 따라 조정',
              ],
            },
          ]} />

          <TipBox title="매년 1월 1일 기준 자동 조정">
            <p>
              상한액과 하한액은 최저임금 변동에 따라 <strong>매년 1월 1일</strong>에 조정돼요.
              수급 중에 새해가 되면 그날부터{' '}
              <a href="/w/실업급여-2026-개정-상한액-하한액-인상-변경" className="text-[#4A7AB5] underline">인상된 금액</a>이 적용돼요.
              신청 전 최신 금액을 확인하는 게 좋아요.
            </p>
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '/w/실업급여-수급-조건-신청-방법-2026',
        badge: '전체 가이드',
        title: '실업급여 전체 수령액을 알고 싶다면?',
        desc: '기초일액 × 수급일수 = 총수령액 계산법',
        icon: 'check',
      },
    },

    // --- SECTION 04: 적용 기준 ---
    {
      id: 's4',
      number: 'SECTION 04',
      heading: '실업급여 1일 지급액 적용 기준은 어떻게 되나요?',
      subtitle: '월급 구간별로 하한액·상한액이 자동 적용돼요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            실제로 기초일액을 결정하는 흐름은 이래요.
            먼저 퇴직 전 3개월 평균임금을 구하고, 30으로 나눠 1일 평균임금을 계산해요.
            거기에 60%를 곱한 금액이 68,100원보다 크면 상한액, 66,048원보다 작으면 하한액이 적용돼요.
            중간에 해당하는 경우만 계산된 금액이 그대로 기초일액이 돼요.
          </p>

          <SpokeChecklist items={[
            { text: '퇴직 전 3개월 평균임금을 세전 기준으로 확인', done: true, note: '1단계' },
            { text: '평균임금 ÷ 30으로 1일 평균임금 계산', done: true, note: '2단계' },
            { text: '1일 평균임금 × 60% = 기초일액 계산', done: true, note: '3단계' },
            { text: '계산 결과 > 68,100원 → 상한액 68,100원 적용', done: true, note: '상한 적용' },
            { text: '계산 결과 < 66,048원 → 하한액 66,048원 적용', done: true, note: '하한 적용' },
          ]} />

          <p className="text-neutral-600 mb-0">
            적용 기준을 파악했으니, 내 월급에서 기초일액이 정확히 얼마나 되는지 확인해볼게요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '/w/실업급여-수급-조건-신청-방법-2026',
        badge: '전체 가이드',
        title: '실업급여 전체 흐름이 궁금하다면?',
        desc: '수급 조건부터 신청·금액·기간까지 한눈에 확인',
        icon: 'check',
        primary: true,
      },
    },

    // --- FAQ ---
    {
      id: 's-faq',
      number: '06',
      heading: '자주 묻는 질문',
      subtitle: '',
      content: null,
    },
  ],

  faq: [
    {
      question: '실업급여 기초일액는 어떻게 계산하나요?',
      answer: '퇴직 전 3개월 평균임금을 30으로 나눠서 1일 평균임금을 구한 다음, 거기에 60%를 곱하면 돼요. 단, 2026년 기준 상한액 68,100원과 하한액 66,048원이 있어서 대부분 이 범위에서 결정돼요.',
    },
    {
      question: '실업급여 상한액 하한액 적용 기준이 뭔가요?',
      answer: '계산된 기초일액이 하한액(66,048원)보다 낮으면 하한액을, 상한액(68,100원)보다 높으면 상한액을 적용해요. 대략 월급 330만원 이하면 하한액, 342만원 이상이면 상한액이 적용돼요.',
    },
  ],

  relatedSpokes: [
    { badge: '변경', title: '2026년 실업급여 상한액 하한액 인상', desc: '상한 68,100원 인상 배경과 적용 기준', href: '/w/실업급여-2026-개정-상한액-하한액-인상-변경' },
    { badge: '수급기간', title: '실업급여 수급기간 소정급여일수', desc: '나이·가입기간별 수급일수 120~270일', href: '/w/실업급여-수급기간-소정급여일수-기준' },
    { badge: '금액', title: '실업급여 금액 계산 연봉별 수령액', desc: '연봉별 예상 실업급여 수령액 정리', href: '/w/실업급여-금액-계산-연봉별-수령액' },
  ],

  sources: [
    { name: '고용보험법 제45조 (구직급여일액)', url: 'https://www.law.go.kr/법령/고용보험법', org: '법제처' },
    { name: '실업급여 안내', url: 'https://www.ei.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePb0201Info.do', org: '고용보험' },
  ],
}

export default data
