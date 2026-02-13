import type { SpokeData } from '@/data/spoke/types'
import {
  SpokeTable, TipBox, FormulaBox, WarnBox,
  Chips, DetailBox, SpokeLinks, Steps,
  SpokeCompareCards, SpokeChecklist,
} from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '공무원-교사-실업급여-퇴직급여-차이-비교',

  meta: {
    title: '공무원 교사 실업급여 수급 가능 여부 | 퇴직급여 차이 비교',
    description: '정규직 공무원은 고용보험 적용 제외라 실업급여를 못 받아요. 기간제 공무원, 사립학교 교사 수급 가능 여부와 퇴직급여 차이를 정리했어요.',
    keywords: ['공무원 실업급여 수급 가능', '교사 실업급여 기간제 사립', '공무원 퇴직급여 실업급여 차이', '공무원 고용보험 적용 여부'],
    ogTitle: '공무원 교사 실업급여 수급 가능 여부 | 머니위키',
    ogDescription: '정규직 공무원은 실업급여 불가, 기간제는 가능. 유형별 수급 기준을 확인하세요.',
  },

  hub: {
    url: '/w/실업급여-공무원-외국인-특수직종-수급-조건',
    name: '실업급여 공무원 외국인 특수직종 근로형태별 수급 조건',
  },

  breadcrumb: ['고용보험', '실업급여', '공무원 교사 수급'],

  summary3: [
    <>정규직 공무원은 <strong>고용보험 적용 제외</strong>라 실업급여를 받을 수 없어요</>,
    <>별정직·임기제 공무원은 <strong>본인 의사에 따라 고용보험 임의가입</strong>이 가능해요</>,
    <>공무원은 실업급여 대신 <strong>퇴직연금 + 퇴직수당</strong>을 공무원연금에서 받아요</>,
  ],

  sourceBar: {
    badge: '출처',
    name: '고용보험법 제10조 + 공무원연금법',
    date: '2026.02',
  },

  prevNext: {
    next: { title: '임원 등기이사 실업급여 근로자성 판단', href: '/w/임원-등기이사-실업급여-근로자성-판단' },
  },

  stickyBar: {
    topLabel: '공무원 실업급여',
    value: '적용 제외',
    buttonText: '유형별 비교 보기 →',
    scrollTo: '#s1',
  },

  hero: {
    badge: '2026년 기준',
    h1: (
      <>
        공무원·교사 <span className="text-[#1E3A5F]">실업급여</span> 수급 가능 여부와 퇴직급여 차이
      </>
    ),
    intro: (
      <p className="text-base text-neutral-500 leading-relaxed">
        공무원이 퇴직하면 실업급여를 받을 수 있을까요? 정규직은 받을 수 없지만, 기간제·별정직이라면 얘기가 달라요. <a href="/w/실업급여-공무원-외국인-특수직종-수급-조건" className="text-[#4A7AB5] underline">실업급여 특수직종 수급 가이드</a>에서 공무원 파트를 자세히 풀어볼게요. 먼저 어떤 공무원이 고용보험에 가입할 수 있는지부터 볼게요.
      </p>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '공무원·외국인·특수직종 실업급여 수급 조건 총정리',
    },
  },

  toc: [
    { id: 's1', label: '공무원 실업급여 수급이 가능한가요?' },
    { id: 's2', label: '교사 실업급여 기간제와 사립 차이는?' },
    { id: 's3', label: '공무원 퇴직급여와 실업급여 차이는?' },
    { id: 's4', label: '공무원 고용보험 적용 여부 정리' },
    { id: 's-faq', label: '자주 묻는 질문' },
  ],

  sections: [
    {
      id: 's1',
      number: 'SECTION 01',
      heading: '공무원 실업급여 수급이 가능한가요?',
      subtitle: '정규직은 안 되고, 별정직·임기제는 가능해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            고용보험법 제10조에 따르면 <strong>국가공무원법·지방공무원법에 따른 공무원</strong>은 고용보험 적용 대상이 아니에요. 정규직 공무원은 고용보험료를 내지 않기 때문에 퇴직해도 실업급여를 받을 수 없어요. 대신 공무원연금에서 퇴직급여를 받는 구조예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            하지만 <strong>별정직 공무원</strong>과 <strong>임기제 공무원</strong>은 예외예요. 본인의 의사에 따라 고용보험에 임의가입할 수 있고, 가입했다면 <a href="/w/실업급여-수급-조건-자격-요건-완벽정리" className="text-[#4A7AB5] underline">실업급여 수급 조건</a>을 충족하면 받을 수 있어요.
          </p>

          <SpokeCompareCards
            cards={[
              {
                title: '정규직 공무원',
                subtitle: '일반직·특정직·기능직 등',
                items: [
                  '고용보험 적용 제외',
                  '실업급여 수급 불가',
                  '공무원연금 퇴직급여 수령',
                  '별도의 퇴직수당 지급',
                ],
              },
              {
                title: '별정직·임기제 공무원',
                subtitle: '본인 의사에 따라 임의가입',
                items: [
                  '고용보험 임의가입 가능',
                  '가입 시 실업급여 수급 가능',
                  '임용 후 3개월 내 가입 신청',
                  '실업급여(제4장)만 적용',
                ],
                recommended: true,
                recLabel: '실업급여 가능',
              },
            ]}
          />

          <TipBox title="별정직·임기제 공무원 가입 신청 기한">
            2026년 1월부터 임용 기관의 장이 최초 임용 시 <strong>본인 의사를 확인</strong>하고, 가입 의사가 있으면 <strong>임용일로부터 3개월 이내</strong>에 고용노동부에 가입을 신청해야 해요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '교사',
        title: '사립학교 교사나 기간제 교사도 받을 수 있을까요?',
        desc: '교사도 유형에 따라 고용보험 적용 여부가 달라요. 국공립과 사립의 차이를 정리했어요.',
        icon: 'info',
      },
    },

    {
      id: 's2',
      number: 'SECTION 02',
      heading: '교사 실업급여 기간제와 사립은 어떻게 다른가요?',
      subtitle: '사학연금 가입자는 제외, 기간제 교사는 가능성 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            교사도 실업급여를 받으려면 고용보험에 가입되어 있어야 해요. 국공립학교 정규 교사는 공무원이라 당연히 적용 제외예요. 사립학교 교원도 <strong>사립학교교직원연금법</strong>의 적용을 받으면 고용보험에서 빠져요. 사학연금은 공무원연금과 비슷한 역할을 하기 때문이에요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            다만 <strong>기간제 교사</strong>가 사학연금 가입 대상이 아닌 경우에는 일반 근로자와 같은 기준으로 고용보험에 가입돼요. 계약기간이 만료되어 퇴직하면 비자발적 이직으로 인정받아 실업급여를 받을 수 있어요.
          </p>

          <SpokeTable
            id="tbl-teacher"
            title="교사 유형별 고용보험 적용 여부"
            subtitle="사학연금 가입 여부가 핵심 기준"
            headers={['교사 유형', '연금 적용', '고용보험', '실업급여']}
            rows={[
              ['국공립 정규 교사', '공무원연금', '적용 제외', '수급 불가'],
              ['사립 정규 교원', '사학연금', '적용 제외', '수급 불가'],
              ['사립 기간제 교사 (사학연금 가입)', '사학연금', '적용 제외', '수급 불가'],
              ['사립 기간제 교사 (사학연금 미가입)', '국민연금', '가입 가능', '수급 가능'],
              ['학원 강사·시간강사', '국민연금', '가입 대상', '수급 가능'],
            ]}
            highlightCol={3}
          />

          <WarnBox>
            사립학교 기간제 교사라도 <strong>사학연금 가입자</strong>로 등록되어 있으면 고용보험 적용이 안 돼요. 본인이 어떤 연금에 가입되어 있는지 급여명세서에서 꼭 확인하세요.
          </WarnBox>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '비교',
        title: '그럼 공무원은 퇴직하면 뭘 받는 건가요?',
        desc: '실업급여 대신 공무원연금에서 퇴직연금과 퇴직수당을 받아요. 금액 차이를 비교해 볼게요.',
        icon: 'calc',
      },
    },

    {
      id: 's3',
      number: 'SECTION 03',
      heading: '공무원 퇴직급여와 실업급여는 무엇이 다른가요?',
      subtitle: '공무원연금 퇴직급여 vs 고용보험 실업급여 구조가 달라요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            일반 직장인은 퇴직하면 <a href="/w/실업급여-수급-조건-자격-요건-완벽정리" className="text-[#4A7AB5] underline">고용보험 실업급여</a>를 받아요. 반면 공무원은 공무원연금법에 따라 <strong>퇴직연금</strong>과 <strong>퇴직수당</strong>을 받아요. 두 제도는 재원, 지급 기간, 금액 산정 방식이 모두 달라요.
          </p>

          <SpokeTable
            id="tbl-compare"
            title="실업급여 vs 공무원 퇴직급여 비교"
            subtitle="2026년 기준, 고용보험법 + 공무원연금법"
            headers={['항목', '실업급여 (일반 근로자)', '퇴직급여 (공무원)']}
            rows={[
              ['재원', '고용보험료 (근로자+사업주)', '공무원연금 기여금 (공무원+정부)'],
              ['지급 조건', '비자발적 퇴직 + 구직활동', '1년 이상 재직 후 퇴직'],
              ['지급 기간', '120~270일 (한시적)', '퇴직연금: 평생 / 수당: 일시금'],
              ['금액 산정', '퇴직 전 평균임금의 60%', '기준소득월액 × 재직기간별 비율'],
              ['상한액', '1일 66,000원 (2026년)', '상한 없음 (재직기간 비례)'],
              ['구직활동 의무', '2~4주 간격 실업인정', '없음'],
            ]}
            highlightCol={2}
          />

          <FormulaBox
            lines={[
              { text: '공무원 퇴직수당 계산 공식', comment: true },
              { text: '퇴직수당 = 기준소득월액 × 재직기간별 지급비율' },
            ]}
          />

          <DetailBox
            title="재직기간별 퇴직수당 지급비율"
            items={[
              { heading: '1~5년 미만', desc: '기준소득월액의 6.5%' },
              { heading: '5~10년 미만', desc: '기준소득월액의 22.75%' },
              { heading: '10~15년 미만', desc: '기준소득월액의 29.25%' },
              { heading: '15~20년 미만', desc: '기준소득월액의 32.5%' },
              { heading: '20년 이상', desc: '기준소득월액의 39%' },
            ]}
          />

          <TipBox title="공무원은 퇴직연금도 따로 있어요">
            10년 이상 재직한 공무원은 퇴직수당과 별도로 <strong>퇴직연금</strong>을 매달 받아요. 퇴직연금은 평균기준소득월액 x 재직연수 x 1.7%로 계산해요. 30년 재직 시 월급의 약 51%를 평생 받는 셈이에요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '정리',
        title: '결국 내가 고용보험에 해당하는지 어떻게 알 수 있나요?',
        desc: '공무원·교사 유형별로 고용보험 적용 여부를 한눈에 정리했어요.',
        icon: 'check',
      },
    },

    {
      id: 's4',
      number: 'SECTION 04',
      heading: '공무원 고용보험 적용 여부를 어떻게 확인하나요?',
      subtitle: '유형별 체크리스트로 확인해 보세요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            내가 고용보험에 가입되어 있는지 모르겠다면 <strong>고용보험 피보험자격 확인</strong>을 해볼 수 있어요. 고용24(work24.go.kr)에서 본인 이력을 조회하거나, 근로복지공단(1588-0075)에 전화하면 돼요. 공무원 신분이라도 기간제·별정직이면 가입이 되어 있을 수 있어요.
          </p>

          <SpokeChecklist
            items={[
              { text: '국가공무원·지방공무원 정규직 → 고용보험 적용 제외', done: false, note: '공무원연금 퇴직급여 수령' },
              { text: '별정직·임기제 공무원 → 본인 의사 시 임의가입 가능', done: true, note: '임용 3개월 내 신청, 실업급여만 적용' },
              { text: '국공립학교 정규 교사 → 공무원이라 적용 제외', done: false },
              { text: '사립학교 정규 교원 (사학연금) → 적용 제외', done: false },
              { text: '기간제 교사 (사학연금 미가입) → 고용보험 가입 대상', done: true, note: '계약만료 시 실업급여 수급 가능' },
              { text: '학원 강사·시간강사 → 일반 근로자 기준 가입', done: true },
            ]}
          />

          <Chips
            items={[
              { icon: '📋', label: '고용보험 확인', value: '고용24', href: 'https://www.work24.go.kr' },
              { icon: '📞', label: '전화 상담', value: '1588-0075' },
              { icon: '🏛️', label: '공무원연금', value: 'geps.or.kr', href: 'https://www.geps.or.kr' },
              { icon: '🏫', label: '사학연금', value: 'tp.or.kr', href: 'https://www.tp.or.kr' },
            ]}
          />

          <SpokeLinks
            title="관련 실업급여 글 더 보기"
            items={[
              { num: '01', heading: '실업급여 수급 조건과 자격 요건', desc: '고용보험 가입 후 실업급여 받는 기본 조건', href: '/w/실업급여-수급-조건-자격-요건-완벽정리' },
              { num: '02', heading: '65세 이상 고령자 실업급여 수급 제한', desc: '65세 이후 고용보험 신규가입 시 실업급여 제한', href: '/w/65세-이상-고령자-실업급여-수급-제한-예외' },
            ]}
          />
        </>
      ),
      bridgeCTA: {
        href: '/w/실업급여-공무원-외국인-특수직종-수급-조건',
        badge: '허브',
        title: '외국인이나 임원의 실업급여도 궁금하다면?',
        desc: '공무원 외에도 외국인, 임원, 단시간 근로자 등 다양한 유형별 수급 기준을 확인할 수 있어요.',
        icon: 'grid',
        primary: true,
      },
    },

    {
      id: 's-faq',
      number: '05',
      heading: '자주 묻는 질문',
      subtitle: '',
      content: null,
    },
  ],

  faq: [
    { question: '공무원 퇴직 후 민간 회사에 재취업하면 실업급여를 받을 수 있나요?', answer: '<strong>네.</strong> 민간 회사에서 고용보험에 가입하고 피보험기간 180일 이상을 채운 뒤 비자발적으로 퇴직하면 실업급여를 받을 수 있어요. 공무원 재직기간은 고용보험 피보험기간에 포함되지 않아요.' },
    { question: '공무원연금 수령 중에도 실업급여를 받을 수 있나요?', answer: '공무원연금 퇴직연금을 받고 있더라도, 이후 고용보험 가입 사업장에서 근무하다 퇴직한 경우 <strong>실업급여 수급 요건을 충족하면 가능</strong>해요. 두 제도는 별개의 사회보험이에요.' },
    { question: '임기제 공무원이 고용보험에 가입 안 했는데 퇴직했어요. 소급가입이 되나요?', answer: '원칙적으로 <strong>임용 시점에 가입하지 않으면 소급 적용이 어려워요</strong>. 다만 담당 공무원의 고의·과실로 가입 안내를 받지 못한 경우 손해배상 청구가 가능할 수 있어요. 근로복지공단에 상담하세요.' },
    { question: '군인도 실업급여를 받을 수 있나요?', answer: '<strong>받을 수 없어요.</strong> 군인은 군인연금법의 적용을 받기 때문에 고용보험 적용 제외 대상이에요. 퇴직 시 군인연금에서 퇴역연금 또는 퇴직일시금을 받아요.' },
  ],

  relatedSpokes: [
    { badge: '임원', title: '임원 등기이사 실업급여 근로자성 판단 기준', desc: '회사 임원도 실업급여를 받을 수 있는 조건', href: '/w/임원-등기이사-실업급여-근로자성-판단' },
    { badge: '수급 조건', title: '실업급여 수급 조건 자격 요건 완벽정리', desc: '고용보험 가입 기간, 이직 사유 등 기본 조건', href: '/w/실업급여-수급-조건-자격-요건-완벽정리' },
    { badge: '65세+', title: '65세 이상 고령자 실업급여 수급 제한과 예외', desc: '65세 이후 고용보험 가입과 실업급여 제한', href: '/w/65세-이상-고령자-실업급여-수급-제한-예외' },
    { badge: '금액', title: '실업급여 금액 계산과 연봉별 수령액', desc: '퇴직 전 평균임금 60% 기준 계산법', href: '/w/실업급여-금액-계산-연봉별-수령액' },
    { badge: '신청', title: '실업급여 신청 방법 절차 준비서류', desc: '고용센터 방문부터 온라인 신청까지', href: '/w/실업급여-신청-방법-절차-준비서류' },
  ],

  sources: [
    { name: '고용보험법 제10조 (적용 제외)', url: 'https://www.law.go.kr/법령/고용보험법/제10조', org: '법제처' },
    { name: '공무원연금법 (퇴직급여)', url: 'https://www.law.go.kr/법령/공무원연금법', org: '법제처' },
    { name: '사립학교교직원연금법', url: 'https://www.law.go.kr/법령/사립학교교직원연금법', org: '법제처' },
    { name: '고용보험 안내', url: 'https://www.ei.go.kr', org: '고용보험' },
  ],
}

export default data
