/**
 * ========================================
 * GOLDEN EXAMPLE — 스포크 글 완성 예시
 * ========================================
 *
 * 이 파일은 "이 수준, 이 문체, 이 흐름으로 써라"를 보여주는 기준 원본이에요.
 * HTML 원본(spoke-salary-skyscraper_4.html)을 SpokeData TSX로 변환한 것이에요.
 *
 * 에이전트가 참고할 포인트:
 * 1. 서론(hero.intro) — 독자 상황 묘사 → 해결 약속 → 구체 숫자
 * 2. 문체 — ~예요체, 독자 감정 먼저, 정보 나열 금지
 * 3. 전환 문장 — 4개 섹션 전부 다른 스타일
 * 4. 시각 요소 — 8종류 사용 (SpokeStepCards, SpokeTable, TipBox, FormulaBox, SpokeRateBars, RateCards, SpokeCompareCards, SpokeWarnBox)
 * 5. bridgeCTA — 다음 섹션의 "독자가 자연스럽게 궁금해할 질문"
 *
 * ⚠️ 이 파일을 그대로 복사하지 마세요. 구조와 문체를 참고하되 주제에 맞게 변형하세요.
 */

import Link from 'next/link'
import type { SpokeData } from './types'
import { SpokeTable, TipBox, FormulaBox, RateCards, SpokeStepCards, SpokeCompareCards, SpokeRateBars, SpokeWarnBox } from '@/components/spoke/SpokeBlocks'

// --- 대용량 테이블 데이터는 상단에 분리 ---
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

const NET_PAY_TABLE_ROWS = [
  ['200만원', '7,700원', '169,200원', '176,900원', '1,823,100원'],
  ['250만원', '22,000원', '216,200원', '238,200원', '2,261,800원'],
  ['300만원', '41,800원', '263,400원', '305,200원', '2,694,800원'],
  ['400만원', '88,000원', '357,600원', '445,600원', '3,554,400원'],
  ['500만원', '179,300원', '451,800원', '631,100원', '4,368,900원'],
  ['700만원', '382,800원', '602,000원', '984,800원', '6,015,200원'],
  ['1,000만원', '904,200원', '765,000원', '1,669,200원', '8,330,800원'],
]


// === SPOKE DATA ===
const data: SpokeData = {
  slug: '간이세액표-보는-법-월급별-세금-실수령액',

  meta: {
    title: '2026 근로소득 간이세액표 보는 법 월급별 세금 실수령액 계산',
    description: '간이세액표로 매달 원천징수되는 소득세부터 실수령액까지 바로 확인할 수 있어요.',
    keywords: ['간이세액표 월급별 소득세', '간이세액표 계산', '간이세액표 80 100 120', '간이세액표 실수령액'],
    ogTitle: '2026 근로소득 간이세액표 보는 법 | 머니위키',
    ogDescription: '월급별 소득세, 계산 방법, 비율 선택, 실수령액까지 한 번에',
  },

  hub: {
    url: '/w/원천세-가이드',
    name: '원천세 가이드',
  },

  breadcrumb: ['세금', '간이세액표 보는 법'],

  /**
   * HERO — 서론
   *
   * 1줄: 독자의 실제 상황 묘사 ("급여명세서 볼 때마다 '내 세금 맞게 떼인 건가?' 싶었다면")
   * 2줄: 이 글로 해결된다는 약속 ("간이세액표 하나면 ~ 바로 알 수 있어요")
   * 3줄: 구체 숫자/범위 언급 + 허브 연결 ("프리랜서 3.3%나 기타소득 8.8%는 ~")
   * 4줄: 동행 톤으로 첫 섹션 안내 ("먼저 ~ 볼게요" 느낌, intro 마지막 문장)
   *
   * ❌ 금지: "아래에서 확인해 보세요", "이 글 하나로 정리했어요", "~ 한 번에 알아볼게요"
   */
  hero: {
    badge: '2026년 최신 기준',
    h1: <>2026 근로소득 <span className="text-emerald-600">간이세액표</span> 보는 법 — 월급별 세금과 실수령액 계산</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          매달 급여명세서 볼 때마다 '내 세금 맞게 떼인 건가?' 싶었다면 잘 오셨어요. <strong>간이세액표</strong> 하나면 매달 빠지는 소득세부터 실수령액까지 바로 알 수 있어요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          직장인 근로소득 기준으로 세금표, 비율 선택, 실수령액까지 정리했어요. 프리랜서 3.3%나 기타소득 8.8%는 계산 방식이 다른데, 그 차이가 궁금하면 <Link href="/w/원천세-가이드" className="text-blue-600 hover:underline">원천세 구조별 비교</Link>도 같이 보면 이해가 빨라요. 먼저 월급별 세금표부터 볼게요.
        </p>
      </>
    ),
    /**
     * Quick Answer — Google Featured Snippet 타겟 + 이탈 방지 핵심
     *
     * ⚠️ 현재 SpokeData 타입에 quickAnswer 필드 없음. 타입 확장 후 추가 예정.
     * 원본 HTML에서는 hero 바로 아래에 "핵심 요약" 박스로 존재:
     *
     * quickAnswer: {
     *   text: '간이세액표는 비과세 제외 월급과 부양가족 수(본인 포함), 이 두 가지만 알면
     *          매달 원천징수되는 소득세가 나와요. 예를 들어 월급 300만원·부양가족 2명이면
     *          매월 소득세 38,000원 + 지방세 3,800원 = 총 41,800원이 빠져요.',
     *   hook: '아래 계산기에 내 월급을 넣어 보면 바로 확인돼요',
     * },
     *
     * 작성 원칙:
     * - H2-1의 핵심 답변을 3줄 이내로 요약
     * - 마지막에 계산기/도구로 자연스럽게 유도
     * - 구체적 숫자 예시 포함 (이 글의 신뢰도를 한눈에 보여줌)
     */
    hubCTA: {
      badge: '올인원',
      desc: '내 소득 유형에 맞는 세금 구조 확인하기',
    },
  },

  toc: [
    { id: 's1', text: '간이세액표 월급별 소득세는 얼마나 되나요?' },
    { id: 's2', text: '내 세금은 어떻게 계산하나요?' },
    { id: 's3', text: '80% 100% 120% 중 어떤 걸 선택하나요?' },
    { id: 's4', text: '월급별 실수령액은 얼마나 되나요?' },
    { id: 's5', text: '자주 묻는 질문' },
  ],

  sections: [
    /**
     * ===== S1: 간이세액표 월급별 소득세 =====
     *
     * 패턴: 개념 설명 → 절차(SpokeStepCards) → 데이터(SpokeTable) → 보충(TipBox)
     * 전환 스타일: A. 독자 대변형 ("~싶잖아요")
     * 시각 요소: SpokeStepCards + SpokeTable + TipBox = 3개
     */
    {
      id: 's1',
      number: '01',
      heading: '2026 간이세액표 월급별 소득세는 얼마나 되나요?',
      subtitle: '비과세 제외한 월 급여 + 부양가족 수로 내 소득세가 결정돼요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            <strong>근로소득 간이세액표</strong>는 국세청이 매년 발표하는 기준표예요. <a href="https://www.law.go.kr/법령/소득세법시행령/제194조" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">소득세법 시행령 제194조</a>에 따라 매년 2월에 고시되고, 회사는 이 표대로 매달 원천징수해요. 보는 법은 간단해요.
          </p>

          {/* 절차: SpokeStepCards */}
          <SpokeStepCards steps={[
            { title: '비과세 항목 빼기', desc: '세전 급여에서 식대(월 20만원), 자가운전보조금 등 비과세 항목을 빼요' },
            { title: '부양가족 수 확인', desc: '본인 포함해서 배우자·자녀·부모님 중 소득·나이 요건 충족 인원을 세요' },
            { title: '표에서 교차점 찾기', desc: '아래 표에서 월급 구간 × 부양가족 수가 만나는 칸 = 매달 소득세' },
          ]} />

          {/* 데이터: SpokeTable */}
          <SpokeTable
            id="tbl1"
            title="2026 간이세액표 월급별 소득세"
            subtitle="부양가족 수 기준 · 100%"
            headers={['월급여(비과세 제외)', '1명(본인)', '2명', '3명', '4명']}
            rows={TAX_TABLE_ROWS}
            highlightCol={2}
          />

          {/* 보충: TipBox */}
          <TipBox title="비과세 항목이 뭔지 헷갈린다면?">
            <p className="mb-0 leading-relaxed">
              대표적인 비과세: <strong>식대 월 20만원</strong>, 자가운전보조금 월 20만원, 출산·보육수당 월 20만원, 야간근로수당(생산직·월 240만원 이하). 급여명세서에서 '비과세'라고 표시된 항목을 확인하세요.
            </p>
          </TipBox>

          {/* 전환 문장 — A. 독자 대변형 */}
          <p className="text-neutral-600 mb-4 leading-relaxed">
            자, 표에서 대략적인 세금은 알겠는데 내 월급에선 정확히 얼마인지 직접 계산해 보고 싶잖아요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '간편 계산',
        title: '내 월급에서 세금이 얼마나 빠질까?',
        desc: '내 월급으로 직접 계산해보기',
        icon: 'calc',
      },
    },

    /**
     * ===== S2: 계산 방법 =====
     *
     * ⚠️ 원본 HTML은 인터랙티브 계산기(SpokeTaxCalculator) — 직접 입력하는 체험형 UX.
     * 현재는 기존 컴포넌트(FormulaBox + SpokeRateBars)로 대체.
     * 계산기 컴포넌트 개발 후 교체 필요. 계산기 없을 때는 국세청 조회 링크로 유도가 UX상 맞음.
     *
     * 패턴: 계산 공식(FormulaBox) → 수치 비교(SpokeRateBars) → 출처 안내
     * 전환 스타일: B. 자연 호기심형 ("~궁금한 게 생기죠")
     * 시각 요소: FormulaBox + SpokeRateBars = 2개
     */
    {
      id: 's2',
      number: '02',
      heading: '간이세액표 계산기로 내 세금은 어떻게 계산하나요?',
      subtitle: '3가지만 알면 세금부터 실수령액까지 바로 나와요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            <strong>비과세 제외한 월급</strong>과 <strong>부양가족 수</strong>, <strong>원천징수 비율</strong> — 이 세 가지만 알면 매달 소득세가 나와요. 부양가족 수는 본인을 포함해서 세면 돼요.
          </p>

          {/* 계산 공식: FormulaBox */}
          <FormulaBox lines={[
            { text: '// 간이세액 계산 순서', comment: true },
            { text: '1. 세전 급여 - 비과세 항목 = 과세 급여', numbered: true },
            { text: '2. 과세 급여 × 부양가족 수 → 간이세액표 조회', numbered: true },
            { text: '3. 조회된 소득세 × 원천징수 비율(80/100/120%)', numbered: true },
            { text: '4. 소득세 + 지방소득세(소득세의 10%) = 원천징수 총액', numbered: true },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            예를 들어 월급 300만원, 부양가족 2명이면 소득세 <strong>38,000원</strong>이에요. 여기에 지방소득세 3,800원을 더하면 매달 <strong>총 41,800원</strong>이 빠져요.
          </p>

          {/* 수치 비교: SpokeRateBars */}
          <SpokeRateBars bars={[
            { label: '소득세', rate: '38,000원', width: '65%' },
            { label: '지방소득세', rate: '3,800원', width: '10%' },
            { label: '원천징수 합계', rate: '41,800원', width: '75%' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            표에 없는 금액이면 <a href="https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=6620&cntntsId=7873" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">국세청 간이세액표 조회</a>에서 1만원 단위로 정확한 세액을 조회할 수 있어요.
          </p>

          {/* 전환 문장 — B. 자연 호기심형 */}
          <p className="text-neutral-600 mb-4 leading-relaxed">
            여기까지 보면 한 가지 궁금한 게 생기죠. 80%로 바꾸면 매달 얼마나 더 받을 수 있을까요?
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '비율 선택',
        title: '80%로 바꾸면 매달 얼마나 더 받을까?',
        desc: '세 가지 비율, 내 월급에선 얼마 차이 날까',
        icon: 'info',
      },
    },

    /**
     * ===== S3: 80/100/120% 비율 선택 =====
     *
     * ⚠️ 원본 HTML은 RateCards + 슬라이더 비교 시뮬레이터 + 3문 진단 위저드(SpokeWizard) 포함.
     * 현재는 RateCards + SpokeCompareCards로 대체. 위저드 컴포넌트 개발 후 추가 예정.
     *
     * 패턴: 선택지 비교(RateCards) → 상세 비교(SpokeCompareCards) → 실무 팁(TipBox)
     * 전환 스타일: E. 실용 연결형 ("~정리했어요")
     * 시각 요소: RateCards + SpokeCompareCards + TipBox = 3개
     *
     * ⚠️ TipBox가 S1에도 있어서 전체 40% 경계선 (2/4 = 50%)
     *    → 실제 작성 시 S3의 TipBox를 SpokeChecklist 등으로 대체하면 더 좋음
     */
    {
      id: 's3',
      number: '03',
      heading: '간이세액표 80% 100% 120% 중 어떤 걸 선택하나요?',
      subtitle: '어떤 걸 골라도 연간 세금 총액은 같아요 — 매달 얼마나 미리 내느냐의 차이',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            <strong>어떤 비율을 골라도 연간 세금 총액은 같아요.</strong> 차이는 매달 미리 내는 금액뿐이에요. 80%를 선택하면 매달 실수령이 늘지만 연말에 추가 납부 가능성이 있고, 120%를 선택하면 반대로 환급 가능성이 높아져요.
          </p>

          {/* 선택지 비교: RateCards */}
          <RateCards cards={[
            { value: '80%', label: '적게 떼기', lines: ['매달 실수령 ↑', '연말에 추가 납부 가능성'], highlightColor: 'orange' },
            { value: '100%', label: '기본 (디폴트)', lines: ['간이세액표 그대로', '신청 안 하면 자동 적용'], active: true },
            { value: '120%', label: '많이 떼기', lines: ['매달 실수령 ↓', '연말에 환급 가능성'], highlight: '환급', highlightColor: 'emerald' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            월급 300만원·부양가족 2명 기준으로 80%와 120% 사이 매달 약 <strong>8,400원</strong> 차이예요. 연간으로 환산하면 약 <strong>100,800원</strong>이에요. 어떤 상황에서 뭘 골라야 하는지 한눈에 비교해 볼게요.
          </p>

          {/* 상세 비교: SpokeCompareCards */}
          <SpokeCompareCards cards={[
            {
              title: '80% 선택이 유리한 경우',
              subtitle: '연말에 환급 많이 받던 분',
              items: ['의료비·교육비·기부금 공제 많음', '부양가족 공제 빠짐없이 적용', '매달 실수령 극대화 원할 때'],
              recommended: false,
            },
            {
              title: '120% 선택이 유리한 경우',
              subtitle: '추가 납부 경험 있는 분',
              items: ['공제 항목이 거의 없음', '첫 직장이라 잘 모름', '연말 목돈 환급을 선호'],
              recommended: false,
            },
          ]} />

          {/* 실무 팁: TipBox */}
          <TipBox title="변경 방법">
            <p className="mb-0 leading-relaxed">
              회사 인사팀에 <a href="https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2304&cntntsId=238938" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline"><strong>원천징수세액 조정 신청서</strong></a>를 제출하면 돼요. 연중 아무 때나 변경 가능하고, 변경한 달부터 적용돼요.
            </p>
          </TipBox>

          {/* 전환 문장 — E. 실용 연결형 */}
          <p className="text-neutral-600 mb-4 leading-relaxed">
            비율까지 정했으면 실제로 통장에 찍히는 금액이 궁금할 거예요. 4대보험까지 빠진 진짜 실수령액을 정리했어요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '실수령액',
        title: '그래서 내 통장에 실제로 찍히는 금액은?',
        desc: '4대보험까지 빠진 실제 입금액 확인',
        icon: 'info',
      },
    },

    /**
     * ===== S4: 월급별 실수령액 =====
     *
     * 패턴: 핵심 정보 → 공식(FormulaBox) → 데이터(SpokeTable) → 주의(SpokeWarnBox)
     * 전환 스타일: 없음 (마지막 본문 섹션 — primary CTA로 마무리)
     * 시각 요소: FormulaBox + SpokeTable + SpokeWarnBox = 3개
     */
    {
      id: 's4',
      number: '04',
      heading: '간이세액표 기준 월급별 실수령액은 얼마나 되나요?',
      subtitle: '소득세 + 지방세 + 4대보험까지 전부 빠진 실제 통장 입금액',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            소득세 외에 <strong>국민연금(4.5%), 건강보험(3.545%), 장기요양보험(건강보험의 12.95%), 고용보험(0.9%)</strong>이 추가로 빠져요. 4대보험 합계 약 9.4%에 소득세를 더하면 전체 공제율은 약 <strong>10~17%</strong>예요.
          </p>

          {/* 공식: FormulaBox */}
          <FormulaBox lines={[
            { text: '// 실수령액 공식', comment: true },
            { text: '실수령액 = 세전급여 - 소득세 - 지방세 - 4대보험' },
            { text: '// 예시: 세전 300만원, 부양가족 2명, 비과세 20만원', comment: true },
            { text: '2,694,800 = 3,000,000 - 38,000 - 3,800 - 263,400' },
          ]} />

          {/* 데이터: SpokeTable */}
          <SpokeTable
            id="tbl3"
            title="2026 월급별 실수령액 표"
            subtitle="부양가족 2명 · 비과세 월 20만원 · 100%"
            headers={['세전 월급', '소득세+지방세', '4대보험', '공제 합계', '실수령액']}
            rows={NET_PAY_TABLE_ROWS}
            highlightCol={5}
          />

          {/* 주의: SpokeWarnBox */}
          <SpokeWarnBox title="주의사항">
            <p className="mb-0 leading-relaxed">
              위 표는 <strong>근사치</strong>예요. 건강보험료 상한·하한, 국민연금 상한(월 590만원), 비과세 항목 차이 등에 따라 실제 금액과 다를 수 있어요. 정확한 금액은 급여명세서를 확인하세요.
            </p>
          </SpokeWarnBox>
        </>
      ),
      /* 마지막 섹션 bridgeCTA — primary: true, 허브 또는 계산기로 연결 */
      bridgeCTA: {
        href: '/w/원천세-가이드',
        badge: '올인원',
        title: '내 조건에 맞는 실수령액 계산해보기',
        desc: '비과세·부양가족·비율 직접 설정',
        icon: 'calc',
        primary: true,
      },
    },

    /**
     * ===== S5: FAQ =====
     * content: null → FAQ 자동 렌더링
     */
    {
      id: 's5',
      number: '05',
      heading: '자주 묻는 질문',
      subtitle: '자주 나오는 질문만 모았어요',
      content: null,
    },
  ],

  /**
   * FAQ — H2와 겹치지 않는 실무 질문 2개
   *
   * H2: 세금표, 계산, 비율 선택, 실수령액
   * FAQ: 중도입사자 적용, 연말정산 차이 ← H2와 안 겹침
   */
  faq: [
    {
      question: '중도입사자는 간이세액표를 어떻게 적용하나요?',
      answer: '입사한 달부터 간이세액표대로 원천징수하면 돼요. 이전 직장 소득은 연말정산 때 합산해서 정산하니까, 전 직장 <strong>원천징수영수증</strong>만 연말정산 시 제출하면 돼요. 전 직장에서 연락이 안 되면 홈택스에서 직접 발급받을 수 있어요.',
    },
    {
      question: '간이세액표 소득세와 연말정산 결과가 다른 이유는?',
      answer: '간이세액표는 월급과 부양가족 수만으로 계산한 <strong>추정치</strong>예요. 연말정산에서는 의료비·교육비·기부금·신용카드·보험료 등 실제 공제를 반영해 재계산하니까 차이가 생겨요. 더 냈으면 환급, 덜 냈으면 추가 납부해요.',
    },
  ],

  relatedSpokes: [
    { badge: '프리랜서', title: '프리랜서 3.3% 원천징수 계산 방법과 실수령액', desc: '소득세 3% + 지방세 0.3% 구조와 종합소득세 신고까지', href: '/w/사업소득-원천징수-3-3-percent' },
    { badge: '기타소득', title: '기타소득 8.8% 원천징수 강연료 원고료 세금 계산', desc: '필요경비 60% 공제 구조와 분리과세 기준', href: '/w/기타소득-원천징수' },
  ],

  sources: [
    { name: '소득세법 시행령 제194조', url: 'https://www.law.go.kr/법령/소득세법시행령/제194조', org: '국세법령정보시스템' },
    { name: '근로소득 간이세액표', url: 'https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=6620&cntntsId=7873', org: '국세청' },
    { name: '국민연금 보험료율 (2026년 기준 4.5%)', url: 'https://www.nps.or.kr', org: '국민연금공단' },
    { name: '건강보험료율 (2026년 기준 3.545%)', url: 'https://www.nhis.or.kr', org: '국민건강보험공단' },
  ],
}

export default data
