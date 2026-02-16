import type { SpokeData } from '@/data/spoke/types'
import {
  SpokeTable,
  FormulaBox,
  TipBox,
  SpokeFlow,
  SpokeRateBars,
  SpokeStepCards,
  SpokeChecklist,
} from '@/components/spoke/SpokeBlocks'
import 실업급여금액Checker from '@/components/checkers/실업급여금액Checker'

/* ────────────────────────────────────────── */

const data: SpokeData = {
  slug: '실업급여-금액-계산-연봉별-수령액',

  meta: {
    title: '2026 실업급여 금액 계산 연봉별 수령액 | 상한액 68,100원 하한액',
    description:
      '2026년 실업급여 상한액 68,100원, 하한액 66,048원 기준으로 연봉별 예상 수령액을 정리했어요. 계산 공식과 모의계산까지 확인하세요.',
    keywords: [
      '실업급여 금액 계산 방법',
      '실업급여 연봉별 수령액 예시',
      '실업급여 상한액 하한액 2026',
      '실업급여 평균임금 60% 계산',
    ],
    ogTitle: '2026 실업급여 금액 계산 연봉별 수령액 | 머니위키',
    ogDescription: '상한 68,100원·하한 66,048원, 내 월급으로 얼마 받는지 바로 확인해요.',
  },

  hub: {
    url: '/w/실업급여-수급-조건-신청-방법-2026',
    name: '실업급여 수급 조건·신청 방법 2026년 기준',
  },

  breadcrumb: ['고용·노동', '실업급여', '금액 계산'],

  summary3: [
    <>2026년 실업급여 일 상한액 <strong>68,100원</strong>, 일 하한액 <strong>66,048원</strong></>,
    <>퇴직 전 3개월 평균임금의 <strong>60%</strong>가 기본 공식이에요</>,
    <>월급 200~300만원이면 하한액, 350만원 이상이면 상한액이 적용돼요</>,
  ],

  sourceBar: {
    badge: '출처',
    name: '고용노동부 2026년 고시 · 고용보험법 제45조',
    date: '2026.01',
  },

  prevNext: {
    prev: {
      title: '실업급여 수급 조건 자격 요건',
      href: '/w/실업급여-수급-조건-자격-요건-완벽정리',
    },
    next: {
      title: '실업급여 수급기간 소정급여일수',
      href: '/w/실업급여-수급기간-소정급여일수-기준',
    },
  },

  stickyBar: {
    topLabel: '실업급여 일 상한액',
    value: '68,100원',
    buttonText: '내 예상 금액 계산 →',
    scrollTo: '#checker',
  },

  hero: {
    badge: '2026년 기준',
    h1: (
      <>
        <span className="text-[#1E3A5F]">실업급여 금액 계산</span> 연봉별
        수령액
      </>
    ),
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          퇴직 후 실업급여가 정확히 얼마인지 궁금해서 이 글을 찾으셨다면 잘
          오셨어요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          실업급여 금액은{' '}
          <strong className="text-neutral-800">
            퇴직 전 3개월 평균임금의 60%
          </strong>
          로 정해지는데, 2026년 기준 하루{' '}
          <strong className="text-neutral-800">상한액 68,100원</strong>,{' '}
          <strong className="text-neutral-800">하한액 66,048원</strong>이
          적용돼요.{' '}
          <a
            href="/w/실업급여-수급-조건-신청-방법-2026"
            className="text-[#4A7AB5] underline"
          >
            실업급여 전체 가이드
          </a>
          에서 수급 조건과 신청 방법도 함께 확인할 수 있어요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          월급 300만원이면 하루 66,048원, 350만원이면 68,100원으로 사실상 대부분
          하한~상한 범위 안에 들어가요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          먼저 계산 공식부터 같이 볼게요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '실업급여 수급 조건·신청 방법·금액 2026년 기준 총정리',
    },
  },

  toc: [
    { id: 'checker', label: '내 예상 실업급여 금액 계산하기' },
    { id: 's1', label: '실업급여 금액은 어떻게 계산하나요?' },
    { id: 's2', label: '2026년 상한액과 하한액은 얼마인가요?' },
    { id: 's3', label: '연봉별 실업급여 예상 수령액은 얼마인가요?' },
    { id: 's4', label: '실업급여 계산할 때 주의할 점은 무엇인가요?' },
    { id: 's-faq', label: '자주 묻는 질문' },
  ],

  sections: [
    /* ─── CHECK: 체커 ─── */
    {
      id: 'checker',
      number: 'CHECK',
      heading: '내 월급으로 실업급여 얼마 받을까요?',
      subtitle: '월급과 가입기간만 선택하면 바로 알 수 있어요',
      content: <실업급여금액Checker />,
    },

    /* ─── S1: 계산 공식 ─── */
    {
      id: 's1',
      number: '01',
      heading: '실업급여 금액은 어떻게 계산하나요?',
      subtitle: '퇴직 전 3개월 평균임금의 60%가 기본이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            실업급여 금액은 <strong>퇴직 전 3개월 총 급여</strong>를 기준으로
            계산해요.{' '}
            <a
              href="https://www.law.go.kr/법령/고용보험법"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#4A7AB5] underline"
            >
              고용보험법 제45조
            </a>
            에 따라 평균임금의 60%가 하루 구직급여일액이 돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            여기서 평균임금이란 퇴직일 이전 3개월 동안 받은 세전 급여 총액을
            그 기간의 총 일수(보통 91일)로 나눈 금액이에요. 기본급뿐만 아니라
            상여금, 연장근로수당, 식대 같은 고정 수당도 전부 포함해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            계산된 금액이 상한액(68,100원)을 넘으면 상한액으로, 하한액(66,048원)
            보다 낮으면 하한액으로 적용되기 때문에, 실제로 받는 금액은 하루
            66,048~68,100원 사이에 몰려 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            계산 순서를 정리하면 이렇게 돼요.
          </p>

          <FormulaBox
            lines={[
              {
                text: '실업급여 계산 공식',
                comment: true,
              },
              {
                text: '평균임금 = 퇴직 전 3개월 총 급여 ÷ 총 일수(91일)',
                numbered: true,
              },
              {
                text: '구직급여일액 = 평균임금 x 60%',
                numbered: true,
              },
              {
                text: '※ 상한: 68,100원 / 하한: 66,048원 (2026년)',
                comment: true,
              },
              {
                text: '월 수령액 = 구직급여일액 x 30일',
                numbered: true,
              },
            ]}
          />

          <SpokeStepCards
            steps={[
              {
                title: '1단계: 3개월 총 급여 합산',
                desc: '세전 기준으로 기본급+수당+상여금 합산',
                tip: '퇴직금·학자금은 제외',
              },
              {
                title: '2단계: 평균임금 산출',
                desc: '총 급여 ÷ 91일(3개월 총 일수)',
                tip: '일 단위 환산',
              },
              {
                title: '3단계: 60% 적용',
                desc: '평균임금 x 0.6 = 구직급여일액',
                tip: '하루 받는 금액',
              },
              {
                title: '4단계: 상한·하한 비교',
                desc: '68,100원 초과 시 상한, 66,048원 미만 시 하한 적용',
                tip: '2026년 기준',
              },
            ]}
          />

          <p className="text-neutral-600 mb-0">
            공식을 알았으니, 2026년에 적용되는 상한액과 하한액이 정확히 얼마인지
            자세히 살펴볼게요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '상한·하한',
        title: '올해 상한액이 6년 만에 올랐다는데?',
        desc: '2026년 상한 68,100원·하한 66,048원 상세',
        icon: 'calc',
      },
    },

    /* ─── S2: 상한액·하한액 ─── */
    {
      id: 's2',
      number: '02',
      heading: '2026년 실업급여 상한액과 하한액은 얼마인가요?',
      subtitle: '상한 68,100원, 하한 66,048원으로 격차가 2,052원뿐이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            2026년 실업급여 구직급여 <strong>일 상한액은 68,100원</strong>이에요.
            2019년 이후 6년 만에 인상된 건데, 하한액이 상한액을 넘는 역전 현상을
            막기 위해서예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            <strong>일 하한액은 66,048원</strong>이에요. 하한액은{' '}
            <a
              href="/w/실업급여-2026-개정-상한액-하한액-인상-변경"
              className="text-[#4A7AB5] underline"
            >
              2026년 최저임금 10,320원
            </a>
            의 80%에 하루 8시간을 곱해서 나오는 금액이에요. 매년 최저임금이
            오르면 하한액도 자동으로 올라가요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            결국 상한과 하한의 차이가 하루 2,052원밖에 안 돼요. 월급
            200만원이든 400만원이든 실업급여 일액은 66,048~68,100원 범위에서
            크게 벗어나지 않아요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            월로 환산하면 상한 기준 약 204만원, 하한 기준 약 198만원이에요.
            연도별 변화를 비교해보면 이렇게 돼요.
          </p>

          <SpokeTable
            id="tbl-limit-history"
            title="연도별 실업급여 상한액·하한액 변화"
            subtitle="고용노동부 고시 기준 / 단위: 원"
            headers={['연도', '일 상한액', '일 하한액', '최저임금(시급)']}
            rows={[
              ['2024년', '66,000', '63,104', '9,860원'],
              ['2025년', '66,000', '64,192', '10,030원'],
              ['2026년', '68,100', '66,048', '10,320원'],
            ]}
            highlightCol={1}
          />

          <SpokeFlow
            steps={[
              { icon: '💰', label: '최저임금 인상', sub: '10,320원' },
              { icon: '📈', label: '하한액 상승', sub: '66,048원' },
              { icon: '⚠️', label: '역전 위험', sub: '하한>상한' },
              { icon: '🔼', label: '상한액 인상', sub: '68,100원' },
            ]}
          />

          <TipBox title="하한액 계산 공식">
            <p>
              하한액 = 최저임금 x 80% x 8시간 = 10,320원 x 0.8 x 8 ={' '}
              <strong>66,048원</strong>이에요. 최저임금만 알면 하한액을 바로
              구할 수 있어요.
            </p>
          </TipBox>

          <p className="text-neutral-600 mb-0">
            상한과 하한을 알았으니, 내 월급 기준으로 정확히 얼마 받는지
            궁금하시죠?
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '연봉별',
        title: '월급 300만원이면 실업급여 얼마?',
        desc: '200~350만원 구간별 예상 수령액',
        icon: 'calc',
      },
    },

    /* ─── S3: 연봉별 수령액 ─── */
    {
      id: 's3',
      number: '03',
      heading: '연봉별 실업급여 예상 수령액은 얼마인가요?',
      subtitle: '월급 200~350만원 구간별로 비교했어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            월급 200만원부터 350만원까지, 실업급여 일액과 월 수령액을 정리했어요.
            2026년에는 상한과 하한의 차이가 2,052원밖에 안 되기 때문에, 대부분
            비슷한 금액을 받게 돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            월급 200~300만원 구간은 평균임금의 60%가 하한액보다 낮아서 전부{' '}
            <strong>하한액 66,048원</strong>이 적용돼요. 월급 350만원부터는
            60%가 상한액을 넘기 때문에{' '}
            <strong>상한액 68,100원</strong>이 적용되고요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            쉽게 말하면, 월급이 얼마든 실업급여 일액은 하루 66,048~68,100원
            사이예요. 월로 환산하면 약 198~204만원 범위라고 보면 돼요.
          </p>

          <SpokeTable
            id="tbl-salary-compare"
            title="월급별 실업급여 예상 수령액 비교표"
            subtitle="2026년 기준 / 3개월 91일, 30일 환산"
            headers={[
              '월 급여(세전)',
              '평균임금(일)',
              '60% 계산값',
              '적용 일액',
              '월 수령액(30일)',
            ]}
            rows={[
              ['200만원', '65,934원', '39,560원', '66,048원(하한)', '약 198만원'],
              ['250만원', '82,418원', '49,451원', '66,048원(하한)', '약 198만원'],
              ['300만원', '98,901원', '59,341원', '66,048원(하한)', '약 198만원'],
              ['350만원', '115,385원', '69,231원', '68,100원(상한)', '약 204만원'],
            ]}
            highlightCol={3}
          />

          <SpokeRateBars
            bars={[
              {
                label: '월급 200만원 (하한 적용)',
                rate: '66,048원/일',
                width: '97%',
              },
              {
                label: '월급 250만원 (하한 적용)',
                rate: '66,048원/일',
                width: '97%',
              },
              {
                label: '월급 300만원 (하한 적용)',
                rate: '66,048원/일',
                width: '97%',
              },
              {
                label: '월급 350만원 (상한 적용)',
                rate: '68,100원/일',
                width: '100%',
              },
            ]}
          />

          <TipBox title="월급이 높아도 실업급여가 거의 같은 이유">
            <p>
              2026년에는 하한액(66,048원)과 상한액(68,100원)의 차이가 2,052원뿐이에요.
              월급 200만원이나 350만원이나 일액 차이가 하루 2천원 수준이라,
              실질적으로 거의 같은 금액을 받게 돼요.
            </p>
          </TipBox>

          <p className="text-neutral-600 mb-0">
            금액을 알았다면, 계산할 때 놓치기 쉬운 주의사항도 함께 챙겨야 해요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '주의사항',
        title: '계산할 때 실수하기 쉬운 부분은?',
        desc: '상여금 포함 여부, 세전 기준 등',
        icon: 'info',
      },
    },

    /* ─── S4: 계산 시 주의사항 ─── */
    {
      id: 's4',
      number: '04',
      heading: '실업급여 계산할 때 주의할 점은 무엇인가요?',
      subtitle: '세전 기준, 상여금 포함, 비과세 등 자주 헷갈리는 부분이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            실업급여 금액을 계산할 때 가장 많이 실수하는 부분은{' '}
            <strong>세전과 세후를 혼동</strong>하는 거예요.
            평균임금은 반드시 세전(공제 전) 급여로 계산하고, 받을 때는 세금을
            안 떼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            실업급여는{' '}
            <a
              href="/w/실업급여-세금-건강보험-국민연금-처리"
              className="text-[#4A7AB5] underline"
            >
              비과세 소득
            </a>
            이라서 소득세와 주민세가 0원이에요. 계산된 금액 그대로 통장에
            들어오기 때문에 실수령액이 곧 지급액이에요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            또 하나 놓치기 쉬운 건 상여금이에요. 퇴직 전 3개월 안에 받은 상여금,
            연장근로수당, 야간수당, 식대 같은 고정 수당은 전부 평균임금에
            포함해요. 단, 퇴직금이나 학자금 보조는 제외돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            마지막으로, 소정급여일수에 따라 총 수령액이 크게 달라져요.
            같은 일액이라도 120일 받는 사람과 270일 받는 사람은 총액이 2배 이상
            차이 나요.
          </p>

          <SpokeChecklist
            items={[
              {
                text: '평균임금은 세전(공제 전) 급여로 계산',
                done: true,
              },
              {
                text: '상여금·연장수당·식대 포함',
                done: true,
                note: '고정 수당 전부',
              },
              {
                text: '퇴직금·학자금 보조는 제외',
                done: false,
              },
              {
                text: '실업급여는 비과세, 세금 0원',
                done: true,
                note: '소득세·주민세 면제',
              },
              {
                text: '소정급여일수에 따라 총액 차이',
                done: true,
                note: '120~270일',
              },
            ]}
          />

          <SpokeTable
            id="tbl-total-by-days"
            title="소정급여일수별 총 수령액 예시"
            subtitle="일액 66,048원(하한) 기준"
            headers={['소정급여일수', '120일', '150일', '180일', '210일', '270일']}
            rows={[
              [
                '총 수령액',
                '약 793만원',
                '약 991만원',
                '약 1,189만원',
                '약 1,387만원',
                '약 1,783만원',
              ],
            ]}
            highlightCol={4}
          />
        </>
      ),
      bridgeCTA: {
        href: '/w/실업급여-수급-조건-신청-방법-2026',
        badge: '전체 가이드',
        title: '실업급여 수급 조건부터 신청까지 한번에',
        desc: '조건·금액·기간·신청 방법 전체 정리',
        icon: 'check',
        primary: true,
      },
    },

    /* ─── FAQ ─── */
    {
      id: 's-faq',
      number: '05',
      heading: '자주 묻는 질문',
      subtitle: '',
      content: null,
    },
  ],

  faq: [
    {
      question: '실업급여 금액은 세후 기준으로 계산하나요?',
      answer:
        '아니에요. 평균임금은 세전(공제 전) 급여로 계산하고, 실업급여 자체는 비과세라서 소득세·주민세가 0원이에요. 계산된 금액 그대로 통장에 입금돼요.',
    },
    {
      question: '상여금이나 야간수당도 실업급여 평균임금에 포함되나요?',
      answer:
        '네, 포함돼요. 퇴직 전 3개월 동안 받은 기본급·상여금·연장수당·야간수당·식대 등 고정 수당은 전부 합산해요. 단, 퇴직금이나 학자금 보조는 제외돼요.',
    },
    {
      question: '2026년 실업급여 상한액이 왜 올랐나요?',
      answer:
        '2026년 최저임금이 10,320원으로 인상되면서 하한액(66,048원)이 기존 상한액(66,000원)을 넘어서는 역전 현상이 생겨서, 상한액도 68,100원으로 6년 만에 인상됐어요.',
    },
    {
      question: '월급 300만원이면 실업급여 얼마 받나요?',
      answer:
        '월급 300만원이면 평균임금의 60%가 약 59,341원인데, 2026년 하한액 66,048원보다 낮아서 하한액이 적용돼요. 하루 66,048원, 월 약 198만원을 받을 수 있어요.',
    },
  ],

  relatedSpokes: [
    {
      badge: '조건',
      title: '실업급여 수급 조건 자격 요건 확인',
      desc: '고용보험 180일·비자발적 이직 등 4가지 요건',
      href: '/w/실업급여-수급-조건-자격-요건-완벽정리',
    },
    {
      badge: '기간',
      title: '실업급여 수급기간 소정급여일수 기준',
      desc: '나이·가입기간별 120~270일 수급 기간표',
      href: '/w/실업급여-수급기간-소정급여일수-기준',
    },
    {
      badge: '지급',
      title: '실업급여 지급일 첫 입금일 대기기간',
      desc: '7일 대기기간 계산법과 입금 시점',
      href: '/w/실업급여-지급일-첫-입금일-대기기간',
    },
  ],

  sources: [
    {
      name: '고용보험법 (제45조 구직급여일액)',
      url: 'https://www.law.go.kr/법령/고용보험법',
      org: '법제처',
    },
    {
      name: '2026년 실업급여 상한액 고시',
      url: 'https://www.moel.go.kr',
      org: '고용노동부',
    },
    {
      name: '실업급여 안내',
      url: 'https://www.ei.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePb0201Info.do',
      org: '고용보험',
    },
  ],
}

export default data
