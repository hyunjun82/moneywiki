import Link from 'next/link'
import type { SpokeData } from './types'
import { SpokeTable, TipBox, FormulaBox, RateCards } from '@/components/spoke/SpokeBlocks'
import SpokeTaxCalculator from '@/components/spoke/SpokeTaxCalculator'

// --- Table data ---
const TAX_TABLE_ROWS = [
  ['150만원', '3,000원', '1,000원', '0원', '0원'],
  ['200만원', '14,000원', '7,000원', '3,000원', '0원'],
  ['250만원', '28,000원', '20,000원', '14,000원', '9,000원'],
  ['300만원', '46,000원', '38,000원', '30,000원', '22,000원'],
  ['350만원', '66,000원', '57,000원', '48,000원', '39,000원'],
  ['400만원', '89,000원', '80,000원', '72,000원', '61,000원'],
  ['500만원', '188,000원', '163,000원', '143,000원', '125,000원'],
  ['700만원', '378,000원', '348,000원', '317,000원', '287,000원'],
  ['1,000만원', '852,000원', '822,000원', '792,000원', '761,000원'],
]

const RATE_TABLE_ROWS = [
  ['80%', '30,400원', '3,040원', '33,440원', '401,280원'],
  ['100%', '38,000원', '3,800원', '41,800원', '501,600원'],
  ['120%', '45,600원', '4,560원', '50,160원', '601,920원'],
]

const NET_TABLE_ROWS = [
  ['200만원', '7,700원', '169,200원', '176,900원', '1,823,100원'],
  ['250만원', '22,000원', '216,200원', '238,200원', '2,261,800원'],
  ['300만원', '41,800원', '263,400원', '305,200원', '2,694,800원'],
  ['400만원', '88,000원', '357,600원', '445,600원', '3,554,400원'],
  ['500만원', '179,300원', '451,800원', '631,100원', '4,368,900원'],
  ['700만원', '382,800원', '602,000원', '984,800원', '6,015,200원'],
  ['1,000만원', '904,200원', '765,000원', '1,669,200원', '8,330,800원'],
]

// --- Spoke Data ---
const data: SpokeData = {
  slug: '간이세액표-보는법-월급별-세금-실수령액',

  meta: {
    title: '2026 근로소득 간이세액표 보는 법 - 월급별 세금 실수령액 계산',
    description: '2026년 근로소득 간이세액표 보는 법. 월급 150만~1,000만원 구간별 소득세 조회, 80%·100%·120% 비율 선택 기준, 세금 공제 후 실수령액까지 한 번에 계산하세요.',
    keywords: ['간이세액표', '간이세액표 계산기', '간이세액표 80 100 120', '월급별 실수령액'],
    ogTitle: '2026 근로소득 간이세액표 보는 법 | 머니위키',
    ogDescription: '월급별 소득세 조회, 비율 선택, 실수령액 계산까지 한 번에.',
  },

  hub: {
    url: '/w/원천세-전체-가이드',
    name: '원천세 전체 가이드',
  },

  breadcrumb: ['근로소득', '간이세액표 보는 법'],

  hero: {
    badge: '2026년 간이세액표 기준',
    h1: <>2026 근로소득 <span className="text-[#1E3A5F]">간이세액표</span> 보는 법 — 월급별 세금과 실수령액 계산</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          매달 급여명세서 볼 때마다 &lsquo;내 세금 맞게 떼인 건가?&rsquo; 싶었다면 잘 오셨어요.<br />
          <strong className="text-neutral-800">간이세액표</strong> 하나면 매달 빠지는 소득세부터 실수령액까지 바로 알 수 있어요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          직장인 근로소득 기준으로 세금표, 계산기, 비율 선택까지 정리했어요.<br />
          프리랜서 3.3%나 기타소득까지 알고 싶으면 <Link href="/w/원천세-전체-가이드" className="text-blue-600 hover:underline">원천세 전체 가이드</Link>에 모아뒀어요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '올인원',
      desc: '3.3%, 8.8%, 퇴직소득, 가산세까지 한 페이지에',
    },
  },

  toc: [
    { id: 's1', text: '2026 간이세액표 월급별 소득세는 얼마나 되나요?' },
    { id: 'tbl1', text: '월급별 소득세 표', sub: true },
    { id: 's2', text: '간이세액표 계산기로 내 세금은 어떻게 계산하나요?' },
    { id: 's3', text: '간이세액표 80% 100% 120% 중 어떤 걸 선택하나요?' },
    { id: 'tbl2', text: '비율별 세금 차이 표', sub: true },
    { id: 's4', text: '간이세액표 기준 월급별 실수령액은 얼마나 되나요?' },
    { id: 'tbl3', text: '실수령액 표', sub: true },
    { id: 's5', text: '간이세액표 자주 묻는 질문' },
  ],

  sections: [
    // --- Section 01: 월급별 소득세 ---
    {
      id: 's1',
      number: '01',
      heading: '2026 간이세액표 월급별 소득세는 얼마나 되나요?',
      subtitle: '비과세 제외한 월 급여 + 부양가족 수로 내 소득세가 결정돼요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            <strong>근로소득 간이세액표</strong>는 국세청이 매년 발표하는 기준표예요.{' '}
            <a href="https://www.law.go.kr/법령/소득세법시행령/제194조" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">소득세법 시행령 제194조</a>에
            따라 매년 2월에 고시되고, 회사는 이 표대로 원천징수해요.{' '}
            <strong>월 급여(비과세 제외)</strong>와 <strong>부양가족 수(본인 포함)</strong> 두 가지만 알면 매달 원천징수되는 소득세가 나와요.
          </p>

          <FormulaBox lines={[
            { text: '// 간이세액표 보는 법 3단계', comment: true },
            { text: '1. 세전 급여에서 비과세(식대 등)를 뺀다', numbered: true },
            { text: '2. 부양가족 수(본인 포함)를 확인한다', numbered: true },
            { text: '3. 아래 표에서 해당 칸을 찾는다 → 그게 매달 소득세', numbered: true },
          ]} />

          <SpokeTable
            id="tbl1"
            title="2026 간이세액표 월급별 소득세"
            subtitle="부양가족 수 기준, 100%"
            headers={['월급여(비과세 제외)', '1명(본인)', '2명', '3명', '4명']}
            rows={TAX_TABLE_ROWS}
          />

          <p className="text-xs text-neutral-400 mt-1">
            * 소득세만 표시. 지방소득세(소득세의 10%)를 별도 추가하면 원천징수 총액.<br />
            * 부양가족 수 = 본인 포함. 배우자·자녀·부모 등 소득·나이 요건 충족 시.
          </p>

          <TipBox title="표에 내 급여가 정확히 없다면?">
            <p className="mb-0 leading-relaxed">
              국세청 홈택스에서 <strong>1만원 단위</strong>로 조회할 수 있어요.<br />
              홈택스 &rarr; 조회/발급 &rarr; 기타 조회 &rarr; 근로소득 간이세액표<br />
              비과세 항목이 뭔지 헷갈리면 <Link href="/w/직장인-비과세-항목" className="text-blue-600 hover:underline">직장인 비과세 항목 정리</Link>를 참고하세요.
            </p>
          </TipBox>

          <p className="text-neutral-600 mb-0">그렇다면 내 월급에서 빠지는 정확한 금액은 얼마일까요?</p>
        </>
      ),
      bridgeCTA: { href: '#s2', badge: '간편 계산', title: '내 월급에서 세금이 얼마나 빠질까?', desc: '내 월급으로 직접 계산해보기', icon: 'calc' },
    },

    // --- Section 02: 계산기 ---
    {
      id: 's2',
      number: '02',
      heading: '간이세액표 계산기로 내 세금은 어떻게 계산하나요?',
      subtitle: '비과세 뺀 급여, 부양가족 수, 비율만 넣으면 바로 결과',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            아래 계산기에 <strong>비과세 제외한 월급</strong>을 넣어 주세요. 비과세란 식대(월 20만원까지), 자가운전보조금 등 세금이 안 붙는 항목이에요.
            부양가족 수는 <strong>본인을 포함</strong>해서 세면 돼요. 배우자·자녀·부모님 중 소득·나이 요건에 맞는 분만 추가하면 돼요.
          </p>

          <SpokeTaxCalculator />

          <p className="text-xs text-neutral-400">* 간이세액표 근사치 기반. 4대보험 포함 실수령액은 <a href="#s4" className="text-blue-600 hover:underline">섹션 04</a> 참고.</p>

          <p className="text-neutral-600 mt-4 mb-0">내 소득세를 확인했다면, 다음은 비율을 어떻게 선택하느냐예요.</p>
        </>
      ),
      bridgeCTA: { href: '#s3', badge: '비율 선택', title: '80%로 바꾸면 매달 얼마나 더 받을까?', desc: '세 가지 비율, 내 월급에선 얼마 차이 날까', icon: 'clock' },
    },

    // --- Section 03: 80/100/120% ---
    {
      id: 's3',
      number: '03',
      heading: '간이세액표 80% 100% 120% 중 어떤 걸 선택하나요?',
      subtitle: '어떤 걸 골라도 연간 세금 총액은 같아요. 매달 얼마나 미리 내느냐의 차이',
      content: (
        <>
          <RateCards cards={[
            { value: '80%', label: '적게 떼기', lines: ['매달 실수령 많지만', '연말에 추가 납부 가능성'], highlight: '추가 납부', highlightColor: 'orange' },
            { value: '100%', label: '기본 (디폴트)', lines: ['간이세액표 그대로', '신청 안 하면 자동 적용'], active: true },
            { value: '120%', label: '많이 떼기', lines: ['매달 실수령 적지만', '연말에 환급 가능성'], highlight: '환급', highlightColor: 'navy' },
          ]} />

          <p className="text-neutral-600 mb-2 leading-relaxed"><strong>월급 300만원, 부양가족 2명</strong> 기준으로 비교하면:</p>

          <SpokeTable
            id="tbl2"
            title="간이세액표 80% 100% 120% 비율별 세금 차이"
            subtitle="월급 300만원, 부양가족 2명"
            headers={['비율', '매월 소득세', '+지방세', '매월 합계', '연간 합계']}
            rows={RATE_TABLE_ROWS}
          />

          <TipBox title="선택 기준 요약">
            <p className="mb-0 leading-relaxed">
              - <strong>공제 많은 사람</strong> (의료비, 교육비, 기부금) &rarr; 80%도 OK<br />
              - <strong>공제 적은 독신자</strong> &rarr; 120% 안전<br />
              - <strong>잘 모르겠으면</strong> &rarr; 100%가 무난<br /><br />
              변경: 회사 인사팀에{' '}
              <a href="https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2304&cntntsId=238938" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                <strong>&ldquo;원천징수세액 조정 신청서&rdquo;</strong>
              </a>{' '}
              제출. 매년 연초 변경 가능.
            </p>
          </TipBox>

          <p className="text-neutral-600 mb-0">비율까지 정했다면, 이제 4대보험까지 빠진 실수령액을 볼 차례예요.</p>
        </>
      ),
      bridgeCTA: { href: '#s4', badge: '실수령액', title: '그래서 내 통장에 실제로 찍히는 금액은?', desc: '통장에 실제로 들어오는 금액 확인', icon: 'info' },
    },

    // --- Section 04: 실수령액 ---
    {
      id: 's4',
      number: '04',
      heading: '간이세액표 기준 월급별 실수령액은 얼마나 되나요?',
      subtitle: '소득세 + 지방세 + 4대보험까지 전부 빠진 실제 통장 입금액',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            소득세 외에 <strong>국민연금(4.5%), 건강보험(3.545%), 장기요양보험(건강보험의 12.95%), 고용보험(0.9%)</strong>이 추가로 빠져요.
            4대보험 합계 약 9.4%에 소득세를 더하면 전체 공제율은 약 <strong>10~17%</strong>예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            예를 들어 <strong>세전 월급 300만원, 부양가족 2명, 비과세 20만원</strong>이라면,
            소득세+지방세 41,800원에 4대보험 약 263,400원이 빠져서 실수령액은 약 <strong>2,694,800원</strong>이에요.
            아래 표에서 다른 구간도 확인해 보세요.
          </p>

          <SpokeTable
            id="tbl3"
            title="2026 월급별 실수령액 표"
            subtitle="부양가족 2명, 비과세 월 20만원, 100% 기준"
            headers={['세전 월급', '소득세+지방세', '4대보험', '공제 합계', '실수령액']}
            rows={NET_TABLE_ROWS}
            highlightCol={4}
          />

          <p className="text-xs text-neutral-400 mt-1">* 비과세 월 20만원(식대) 기준 근사치. 비과세 항목이 더 많으면 실수령액 올라감.</p>
        </>
      ),
      bridgeCTA: { href: '/w/연봉-실수령액-계산기', badge: '무료 계산기', title: '내 조건에 맞는 실수령액 계산해보기', desc: '비과세·부양가족·비율 직접 설정', icon: 'grid', primary: true },
    },

    // --- Section 05: FAQ ---
    {
      id: 's5',
      number: '05',
      heading: '간이세액표 자주 묻는 질문',
      subtitle: '간이세액표와 원천징수에 대해 자주 묻는 질문이에요',
      content: null, // FAQ는 template에서 자동 렌더링
    },
  ],

  faq: [
    {
      question: '중도입사자는 간이세액표를 어떻게 적용하나요?',
      answer: '입사한 달부터 간이세액표대로 원천징수하면 돼요. 이전 직장 소득은 연말정산 때 합산해서 정산하니까, 전 직장 <strong>원천징수영수증</strong>만 연말정산 시 제출하면 됩니다.',
    },
    {
      question: '간이세액표 소득세와 연말정산 결과가 다른 이유는?',
      answer: '간이세액표는 월급과 부양가족 수만으로 계산한 <strong>추정치</strong>예요. 연말정산에서는 의료비·교육비·기부금 등 실제 공제를 반영해 재계산하므로 차이가 생겨요. 더 냈으면 환급, 덜 냈으면 추가 납부합니다.',
    },
  ],

  relatedSpokes: [],

  sources: [
    { name: '소득세법 시행령 제194조', url: 'https://www.law.go.kr/법령/소득세법시행령/제194조', org: '국세법령정보시스템' },
    { name: '근로소득 간이세액표', url: 'https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=6620&cntntsId=7873', org: '국세청' },
  ],
}

export default data
