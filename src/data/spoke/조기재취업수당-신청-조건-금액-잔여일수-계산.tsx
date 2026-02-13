import type { SpokeData } from '@/data/spoke/types'
import {
  SpokeTable,
  FormulaBox,
  TipBox,
  Chips,
  SpokeChecklist,
  SpokeCompareCards,
  SpokeRateBars,
  SpokeFlow,
  Steps,
} from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '조기재취업수당-신청-조건-금액-잔여일수-계산',

  meta: {
    title: '조기재취업수당 신청 조건 금액 계산법 | 잔여일수 기준 서류',
    description: '남은 실업급여의 절반을 한 번에 받을 수 있는 조기재취업수당. 신청 조건과 잔여일수 계산법, 지급 금액까지 정리했어요.',
    keywords: [
      '조기재취업수당 신청 조건',
      '조기재취업수당 금액 계산법',
      '조기재취업수당 잔여일수 기준',
      '조기재취업수당 신청 방법 서류',
    ],
    ogTitle: '조기재취업수당 신청 조건 금액 잔여일수 계산법 | 머니위키',
    ogDescription: '남은 실업급여 절반을 한 번에 받는 조기재취업수당 조건과 계산법을 확인하세요.',
  },

  hub: {
    url: '/w/실업급여-취업촉진수당-연장급여-부정수급-2026',
    name: '실업급여 취업촉진수당·연장급여·부정수급 2026년 총정리',
  },

  breadcrumb: ['고용·노동', '실업급여', '조기재취업수당'],

  summary3: [
    <>조기재취업수당 = <strong>남은 소정급여일수의 1/2</strong> x 구직급여일액</>,
    <>소정급여일수를 <strong>절반 이상 남기고</strong> 12개월 이상 재취업해야 해요</>,
    <>신청 기한은 재취업일로부터 <strong>12개월 이내</strong>, 고용센터 또는 고용24에서 청구해요</>,
  ],

  sourceBar: {
    badge: '출처',
    name: '고용보험법 제64조 · 고용보험 사이트',
    date: '2026.02',
  },

  prevNext: {
    next: { title: '연장급여 훈련연장·개별연장·특별연장 조건 비교', href: '/w/연장급여-훈련연장-개별연장-특별연장-조건-비교' },
  },

  stickyBar: {
    topLabel: '조기재취업수당',
    value: '잔여일수 1/2',
    buttonText: '계산법 보기 →',
    scrollTo: '#s2',
  },

  hero: {
    badge: '취업촉진수당',
    h1: (
      <>
        조기재취업수당 <span className="text-[#1E3A5F]">신청 조건·금액·잔여일수</span> 계산법
      </>
    ),
    intro: (
      <p className="text-base text-neutral-500 leading-relaxed">
        실업급여를 받다가 빨리 재취업하면 남은 급여의 절반을 한꺼번에 받을 수 있어요. <a href="/w/실업급여-수급기간-소정급여일수-기준" className="text-[#4A7AB5] underline">소정급여일수</a>를 절반 이상 남긴 상태에서 12개월 이상 고용되면 지급 대상이에요. 구직급여일액이 <strong>60,000원</strong>이고 100일 남았다면 약 <strong>300만 원</strong>을 받을 수 있어요. 먼저 어떤 조건을 갖춰야 하는지부터 볼게요.
      </p>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '취업촉진수당·연장급여·부정수급 총정리',
    },
  },

  toc: [
    { id: 's1', label: '조기재취업수당 신청 조건은 어떻게 되나요?' },
    { id: 's2', label: '조기재취업수당 금액은 어떻게 계산하나요?' },
    { id: 's3', label: '조기재취업수당 잔여일수 기준은 어떻게 되나요?' },
    { id: 's4', label: '조기재취업수당 신청 방법과 서류는 무엇인가요?' },
    { id: 's-faq', label: '자주 묻는 질문' },
  ],

  sections: [
    /* ── S1: 신청 조건 ── */
    {
      id: 's1',
      number: 'SECTION 01',
      heading: '조기재취업수당 신청 조건은 어떻게 되나요?',
      subtitle: '소정급여일수 절반 이상 남기고 12개월 이상 고용이 핵심이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            조기재취업수당은 <strong>구직급여 수급자격자</strong>가 빨리 취업했을 때 받는 장려금 성격의 급여예요. 핵심은 두 가지인데, 소정급여일수를 <strong>절반 이상 남긴 상태</strong>에서 재취업해야 하고, 그 직장에서 <strong>12개월 이상</strong> 계속 일해야 해요. 대기기간 7일이 지난 후에 취업한 건이어야 하고, 최근 2년 안에 조기재취업수당을 받은 적이 없어야 해요.
          </p>

          <SpokeCompareCards
            cards={[
              {
                title: '지급 대상',
                subtitle: '아래 조건을 모두 충족해야 해요',
                items: [
                  '소정급여일수 1/2 이상 남긴 상태',
                  '대기기간(7일) 경과 후 재취업',
                  '12개월 이상 계속 고용 또는 사업 영위',
                  '최근 2년 내 수당 수령 이력 없음',
                  '실업신고 전 채용 약속 아닐 것',
                ],
                recommended: true,
                recLabel: '필수',
              },
              {
                title: '지급 제외',
                subtitle: '해당되면 받을 수 없어요',
                items: [
                  '이전 사업주에게 재고용된 경우',
                  '실업신고 전 채용 약속한 경우',
                  '월 임금 574만 원 이상인 경우',
                  '공무원 등 고용보험 미가입 직종',
                  '병역 복무 중인 경우',
                ],
              },
            ]}
          />

          <SpokeRateBars
            bars={[
              { label: '소정급여일수', rate: '120~270일', width: '80%' },
              { label: '절반 이상 남김', rate: '60~135일+', width: '50%' },
              { label: '대기기간', rate: '7일', width: '10%' },
            ]}
          />

          <TipBox title="자영업도 해당돼요">
            사업자등록을 하고 실제로 12개월 이상 영업한 경우에도 조기재취업수당을 받을 수 있어요. 과세증명자료와 사업자등록증이 필요해요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '계산',
        title: '그러면 실제로 얼마를 받을 수 있을까요?',
        desc: '구직급여일액과 남은 일수로 금액을 바로 계산할 수 있어요.',
        icon: 'calc',
      },
    },

    /* ── S2: 금액 계산법 ── */
    {
      id: 's2',
      number: 'SECTION 02',
      heading: '조기재취업수당 금액은 어떻게 계산하나요?',
      subtitle: '구직급여일액 x 남은 일수의 절반이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            조건을 알았으니 금액이 궁금하잖아요. 공식은 아주 단순해요. <a href="/w/실업급여-금액-계산-연봉별-수령액" className="text-[#4A7AB5] underline">구직급여일액</a>에 남은 소정급여일수의 절반을 곱하면 돼요. 2026년 기준 구직급여 일 상한액은 <strong>68,100원</strong>이고, 하한액은 <strong>63,104원</strong>이에요.
          </p>

          <FormulaBox
            lines={[
              { text: '조기재취업수당 계산 공식', comment: true },
              { text: '조기재취업수당 = 구직급여일액 x 미지급일수 x 1/2' },
            ]}
          />

          <SpokeTable
            id="tbl-calc-example"
            title="구직급여일액별 조기재취업수당 예상 금액"
            subtitle="소정급여일수 180일, 90일 남긴 경우 기준"
            headers={['구직급여일액', '남은 일수', '계산식', '수당 금액']}
            rows={[
              ['68,100원', '90일', '68,100 x 45', '3,064,500원'],
              ['63,104원', '90일', '63,104 x 45', '2,839,680원'],
              ['60,000원', '100일', '60,000 x 50', '3,000,000원'],
              ['68,100원', '120일', '68,100 x 60', '4,086,000원'],
            ]}
            highlightCol={3}
          />

          <TipBox title="남은 일수가 많을수록 수당이 커져요">
            소정급여일수 270일인 분이 140일 남기고 취업하면 68,100 x 70 = <strong>약 477만 원</strong>을 한꺼번에 받을 수 있어요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '일수',
        title: '내 잔여일수가 기준에 맞는지 궁금하다면',
        desc: '소정급여일수 절반 기준과 취업 시점별 판정 방법을 정리했어요.',
        icon: 'calc',
      },
    },

    /* ── S3: 잔여일수 기준 ── */
    {
      id: 's3',
      number: 'SECTION 03',
      heading: '조기재취업수당 잔여일수 기준은 어떻게 되나요?',
      subtitle: '재취업 전날 기준으로 남은 일수를 따져요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            금액 계산법을 봤는데, 정작 내가 잔여일수 기준을 충족하는지 판단하는 게 헷갈리죠. 잔여일수는 <strong>재취업한 날의 전날</strong>을 기준으로 계산해요. 소정급여일수에서 이미 지급받은 일수를 빼면 남은 일수가 나오고, 이 숫자가 소정급여일수의 절반 이상이면 조건을 충족해요.
          </p>

          <FormulaBox
            lines={[
              { text: '잔여일수 계산', comment: true },
              { text: '잔여일수 = 소정급여일수 - 이미 지급받은 일수' },
              { text: '1. 잔여일수 >= 소정급여일수 x 1/2 → 대상', numbered: true },
              { text: '2. 잔여일수 < 소정급여일수 x 1/2 → 미대상', numbered: true },
            ]}
          />

          <SpokeFlow
            steps={[
              { icon: '📋', label: '소정급여일수 확인', sub: '120~270일' },
              { icon: '➗', label: '절반 계산', sub: '60~135일' },
              { icon: '📅', label: '지급받은 일수 차감', sub: '재취업 전날 기준' },
              { icon: '✅', label: '절반 이상 남으면 대상', sub: '수당 청구 가능' },
            ]}
          />

          <SpokeTable
            id="tbl-threshold"
            title="소정급여일수별 절반 기준 일수표"
            subtitle="고용보험법 제64조 기준"
            headers={['소정급여일수', '120일', '150일', '180일', '210일', '240일', '270일']}
            rows={[
              ['절반 기준', '60일', '75일', '90일', '105일', '120일', '135일'],
              ['최소 남겨야 할 일수', '60일', '75일', '90일', '105일', '120일', '135일'],
            ]}
            highlightCol={3}
          />

          <TipBox title="65세 이상은 6개월 고용으로 충분해요">
            이직 당시 65세 이상인 분은 12개월이 아니라 <strong>6개월 이상</strong> 고용이 인정되면 바로 청구할 수 있어요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '신청',
        title: '조건이 되면 어디서 어떻게 신청하나요?',
        desc: '고용센터 방문과 온라인 신청 방법, 필요 서류를 정리했어요.',
        icon: 'check',
      },
    },

    /* ── S4: 신청 방법 서류 ── */
    {
      id: 's4',
      number: 'SECTION 04',
      heading: '조기재취업수당 신청 방법과 서류는 무엇인가요?',
      subtitle: '재취업 12개월 경과 후 고용센터에 청구해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            조건과 금액을 확인했으니 이제 실제로 신청하는 절차가 궁금할 거예요. 조기재취업수당은 재취업한 날로부터 <strong>12개월이 지난 후</strong>에 청구할 수 있어요. 12개월 이상 계속 고용됐다는 걸 증명해야 하기 때문이에요. 신청 기한은 재취업일로부터 <strong>12개월 이내</strong>이니 잊지 마세요.
          </p>

          <Steps
            items={[
              { title: '12개월 이상 근무 확인', desc: '재취업일로부터 12개월이 지났는지 확인해요. 65세 이상은 6개월이에요.' },
              { title: '필요 서류 준비', desc: '재직증명서(또는 근로계약서), 임금명세서, 신분증을 준비해요.' },
              { title: '고용센터 방문 또는 고용24 온라인 청구', desc: '관할 고용센터에 직접 방문하거나 고용24(work24.go.kr)에서 온라인 접수해요.' },
              { title: '심사 후 계좌 입금 (1~2개월)', desc: '고용센터에서 고용 유지 여부를 확인한 뒤 지정 계좌로 입금해요.' },
            ]}
          />

          <SpokeChecklist
            items={[
              { text: '소정급여일수 1/2 이상 남기고 취업했는지 확인', done: true, note: '수급자격증 확인' },
              { text: '12개월 이상 계속 근무(또는 사업 영위) 완료', done: true, note: '65세 이상은 6개월' },
              { text: '재직증명서 또는 근로계약서 준비', done: false },
              { text: '임금명세서 (최근 1개월분 이상) 준비', done: false },
              { text: '자영업자: 사업자등록증 + 과세증명자료', done: false, note: '해당자만' },
              { text: '고용센터 방문 또는 고용24 온라인 청구', done: false },
            ]}
          />

          <Chips
            items={[
              { icon: '📄', label: '재직증명서', value: '필수' },
              { icon: '💰', label: '임금명세서', value: '필수' },
              { icon: '🏢', label: '고용센터', value: '방문/온라인' },
              { icon: '⏰', label: '처리기간', value: '1~2개월' },
            ]}
          />
        </>
      ),
      bridgeCTA: {
        href: '/w/실업급여-취업촉진수당-연장급여-부정수급-2026',
        badge: '전체 가이드',
        title: '다른 취업촉진수당도 궁금하다면',
        desc: '광역구직활동비·이주비·직업능력개발수당까지 취업촉진수당 4종류를 한 번에 비교할 수 있어요.',
        icon: 'grid',
        primary: true,
      },
    },

    /* ── FAQ ── */
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
      question: '조기재취업수당은 퇴직 후 바로 취업해도 받을 수 있나요?',
      answer: '실업급여 대기기간 <strong>7일이 지난 후</strong> 취업해야 받을 수 있어요. 실업신고일로부터 14일 이내에 취업하면 지급 대상에서 제외돼요.',
    },
    {
      question: '조기재취업수당을 받으면 남은 실업급여는 어떻게 되나요?',
      answer: '조기재취업수당은 남은 구직급여의 <strong>절반</strong>을 지급하는 거예요. 나머지 절반은 소멸돼요. 이미 받던 구직급여는 재취업일 전날까지만 지급돼요.',
    },
    {
      question: '조기재취업수당 신청 후 12개월 전에 퇴사하면 어떻게 되나요?',
      answer: '12개월 이상 계속 고용이 확인되지 않으면 수당이 <strong>지급되지 않아요</strong>. 다만 본인 귀책 없이 권고사직·폐업 등으로 퇴사한 경우 예외가 인정될 수 있어요.',
    },
    {
      question: '조기재취업수당과 구직급여를 동시에 받을 수 있나요?',
      answer: '동시에 받을 수는 없어요. 재취업하면 구직급여가 중단되고, 12개월 이상 근무한 뒤에 조기재취업수당을 <strong>한 번에</strong> 받는 구조예요.',
    },
  ],

  relatedSpokes: [
    { badge: '수급기간', title: '실업급여 수급기간 소정급여일수 기준', desc: '나이·근속별 소정급여일수 표', href: '/w/실업급여-수급기간-소정급여일수-기준' },
    { badge: '금액', title: '실업급여 금액 계산 연봉별 수령액', desc: '연봉별 구직급여일액 계산 예시', href: '/w/실업급여-금액-계산-연봉별-수령액' },
    { badge: '연장', title: '연장급여 훈련연장 개별연장 특별연장 비교', desc: '실업급여가 끝나도 최대 2년 연장', href: '/w/연장급여-훈련연장-개별연장-특별연장-조건-비교' },
    { badge: '부가급여', title: '광역구직활동비 이주비 직업능력개발수당', desc: '면접 교통비·이사비 지원 조건', href: '/w/광역구직활동비-이주비-직업능력개발수당-신청' },
  ],

  sources: [
    { name: '고용보험법 제64조 (조기재취업수당)', url: 'https://www.law.go.kr/법령/고용보험법', org: '법제처' },
    { name: '실업급여 안내', url: 'https://www.ei.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePb0201Info.do', org: '고용보험' },
    { name: '조기재취업수당 신청 (정부24)', url: 'https://www.gov.kr/mw/AA020InfoCappView.do?HighCtgCD=A05007&CappBizCD=14900000076', org: '정부24' },
  ],
}

export default data
