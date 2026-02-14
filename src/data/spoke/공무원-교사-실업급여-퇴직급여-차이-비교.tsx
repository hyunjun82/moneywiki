import type { SpokeData } from '@/data/spoke/types'
import {
  SpokeTable, TipBox, FormulaBox, WarnBox,
  Chips, DetailBox, SpokeLinks, Steps,
  SpokeCompareCards, SpokeRateBars, SpokeFlow, SpokeChecklist,
} from '@/components/spoke/SpokeBlocks'
import 공무원수급Checker from '@/components/checkers/공무원수급Checker'

const data: SpokeData = {
  slug: '공무원-교사-실업급여-퇴직급여-차이-비교',

  meta: {
    title: '공무원 교사 실업급여 수급 가능 여부 | 퇴직급여 차이 기간제 사립',
    description: '정규직 공무원은 고용보험 적용 제외라 실업급여를 못 받아요. 기간제 공무원과 사립학교 교사의 수급 조건, 퇴직급여 차이를 정리했어요.',
    keywords: ['공무원 실업급여 수급 가능 여부 확인', '교사 실업급여 기간제 사립 고용보험', '공무원 퇴직급여 실업급여 차이 비교', '공무원 고용보험 적용 제외 기준'],
    ogTitle: '공무원 교사 실업급여 수급 가능 여부 | 머니위키',
    ogDescription: '정규직 공무원은 실업급여 불가, 별정직·기간제는 가능. 유형별 수급 기준을 확인하세요.',
  },

  hub: {
    url: '/w/실업급여-공무원-외국인-특수직종-수급-조건',
    name: '실업급여 공무원 외국인 특수직종 수급 조건',
  },

  breadcrumb: ['고용보험', '실업급여', '공무원 교사 수급'],

  summary3: [
    <>정규직 공무원은 <strong>고용보험 적용 제외</strong>라 실업급여를 받을 수 없어요</>,
    <>별정직·임기제 공무원은 <strong>임용 3개월 내 임의가입</strong>하면 실업급여 수급 가능해요</>,
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
    buttonText: '내 수급 여부 체크 →',
    scrollTo: '#checker',
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
        정규직 공무원은 퇴직해도 실업급여를 받을 수 없다는 사실, 알고 계셨나요? 하지만 별정직이나 기간제 공무원이라면 사정이 달라요. <a href="/w/실업급여-공무원-외국인-특수직종-수급-조건" className="text-[#4A7AB5] underline">실업급여 특수직종 수급 가이드</a>에서 공무원 파트만 집중적으로 정리했어요. 먼저 내 직종이 수급 대상인지 바로 확인해 볼게요.
      </p>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '공무원·외국인·특수직종 실업급여 수급 조건 총정리',
    },
  },

  toc: [
    { id: 'checker', label: '공무원·교사 실업급여 수급 가능 여부 체크' },
    { id: 's1', label: '공무원도 실업급여를 수급할 수 있나요?' },
    { id: 's2', label: '교사 실업급여는 기간제와 사립만 해당하나요?' },
    { id: 's3', label: '공무원 퇴직급여와 실업급여 차이는 무엇인가요?' },
    { id: 's4', label: '공무원 고용보험 적용 제외 기준은 어떻게 되나요?' },
    { id: 's-faq', label: '자주 묻는 질문' },
  ],

  sections: [
    {
      id: 'checker',
      number: 'CHECK',
      heading: '내가 실업급여를 받을 수 있는 공무원인지 확인하기',
      subtitle: '직종과 가입 상태를 선택하면 바로 알 수 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            같은 공무원이라도 <strong>정규직</strong>인지, <strong>별정직·임기제</strong>인지에 따라 실업급여 수급 가능 여부가 완전히 달라요. 교사도 사학연금 가입 여부가 갈림길이에요. 아래에서 내 상황에 맞는 결과를 바로 확인해 보세요.
          </p>
          <공무원수급Checker />
        </>
      ),
      bridgeCTA: {
        href: '#s1',
        badge: '유형별',
        title: '정규직·별정직·임기제, 어떤 공무원이 받을 수 있나요?',
        desc: '고용보험법 제10조 기준으로 공무원 유형별 수급 가능 여부를 정리했어요.',
        icon: 'info',
      },
    },

    {
      id: 's1',
      number: 'SECTION 01',
      heading: '공무원도 실업급여를 수급할 수 있나요?',
      subtitle: '정규직은 안 되고, 별정직·임기제는 가능해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            <a href="https://www.law.go.kr/법령/고용보험법/제10조" className="text-[#4A7AB5] underline" target="_blank" rel="noopener noreferrer">고용보험법 제10조</a>에 따르면 국가공무원법·지방공무원법에 따른 공무원은 고용보험 적용 대상이 아니에요. 정규직 공무원은 고용보험료를 내지 않기 때문에 퇴직해도 실업급여를 받을 수 없어요. 대신 공무원연금에서 퇴직급여를 받는 구조예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            하지만 <strong>별정직 공무원</strong>과 <strong>임기제 공무원</strong>은 사정이 달라요. 본인 의사에 따라 고용보험에 임의가입할 수 있고, 가입한 상태에서 <a href="/w/실업급여-수급-조건-자격-요건-완벽정리" className="text-[#4A7AB5] underline">실업급여 수급 조건</a>을 충족하면 받을 수 있어요. 2026년부터는 임용 기관의 장이 최초 임용 시 본인 의사를 직접 확인하도록 절차가 명확해졌어요.
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
                subtitle: '본인 의사에 따라 임의가입 가능',
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

          <SpokeRateBars
            bars={[
              { label: '정규직', rate: '0%', width: '3%' },
              { label: '별정직', rate: '가입 시 60%', width: '60%' },
              { label: '임기제', rate: '가입 시 60%', width: '60%' },
              { label: '기간제교사', rate: '조건부 60%', width: '55%' },
            ]}
          />

          <TipBox title="별정직·임기제 공무원 가입 절차 (2026년)">
            임용 기관의 장이 최초 임용 시 본인 의사를 확인하고, 가입 의사가 있으면 <strong>임용일로부터 3개월 이내</strong>에 고용노동부에 가입을 신청해요. 가입 신청일 다음 날부터 피보험자격을 취득한 것으로 봐요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '교사',
        title: '사립학교 교사는 실업급여를 받을 수 있나요?',
        desc: '사학연금 가입 여부가 핵심이에요. 기간제 교사라면 가능성이 있어요.',
        icon: 'info',
      },
    },

    {
      id: 's2',
      number: 'SECTION 02',
      heading: '교사 실업급여는 기간제와 사립만 해당하나요?',
      subtitle: '사학연금 가입자는 제외, 사학연금 미가입 기간제만 가능해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            교사도 고용보험에 가입되어 있어야 실업급여를 받을 수 있어요. 국공립학교 정규 교사는 공무원이라 당연히 적용 제외예요. 사립학교 교원도 <strong>사립학교교직원연금법</strong>의 적용을 받으면 고용보험에서 빠져요. 사학연금이 공무원연금과 같은 역할을 하기 때문이에요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            사학연금 가입 대상이 아닌 <strong>기간제 교사</strong>는 일반 근로자처럼 고용보험에 가입돼요. <a href="/w/계약직-계약만료-실업급여-수급-요건-갱신기대권" className="text-[#4A7AB5] underline">계약만료</a>로 퇴직하면 비자발적 이직으로 인정받아 실업급여를 받을 수 있어요. 이게 기간제 교사의 중요한 권리예요.
          </p>

          <SpokeTable
            id="tbl-teacher"
            title="교사 유형별 고용보험 적용 여부"
            subtitle="사학연금 가입 여부가 핵심 기준이에요"
            headers={['교사 유형', '연금 적용', '고용보험', '실업급여']}
            rows={[
              ['국공립 정규 교사', '공무원연금', '적용 제외', '수급 불가'],
              ['사립 정규 교원', '사학연금', '적용 제외', '수급 불가'],
              ['사립 기간제 (사학연금 O)', '사학연금', '적용 제외', '수급 불가'],
              ['사립 기간제 (사학연금 X)', '국민연금', '가입 대상', '수급 가능'],
              ['학원 강사·시간강사', '국민연금', '가입 대상', '수급 가능'],
            ]}
            highlightCol={3}
          />

          <TipBox title="내가 사학연금에 가입되어 있는지 확인하는 법">
            급여명세서에서 <strong>사학연금 기여금</strong> 공제 항목이 있으면 사학연금 가입자예요. 사학연금공단(1588-4110) 또는 홈페이지(tp.or.kr)에서도 가입 여부를 조회할 수 있어요.
          </TipBox>

          <WarnBox>
            사립학교 기간제 교사라도 <strong>사학연금 가입자</strong>로 등록되어 있으면 고용보험 적용이 안 돼요. 폐교 시에도 실업급여를 받을 수 없어서 사각지대로 지적되고 있어요.
          </WarnBox>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '비교',
        title: '실업급여 대신 받는 퇴직급여는 얼마나 되나요?',
        desc: '공무원연금에서 퇴직연금과 퇴직수당을 지급해요. 계산 방식이 궁금하시죠?',
        icon: 'calc',
      },
    },

    {
      id: 's3',
      number: 'SECTION 03',
      heading: '공무원 퇴직급여와 실업급여 차이는 무엇인가요?',
      subtitle: '재원·지급 조건·기간이 완전히 다른 별개 제도예요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            일반 직장인은 퇴직하면 <a href="/w/실업급여-금액-계산-연봉별-수령액" className="text-[#4A7AB5] underline">고용보험 실업급여</a>를 받아요. 반면 공무원은 공무원연금법에 따라 <strong>퇴직연금</strong>과 <strong>퇴직수당</strong>을 받아요. 두 제도는 재원도, 지급 기간도, 금액 산정 방식도 전부 달라요.
          </p>

          <FormulaBox
            lines={[
              { text: '공무원 퇴직수당 공식', comment: true },
              { text: '퇴직수당 = 기준소득월액 x 재직기간별 지급비율' },
            ]}
          />

          <SpokeTable
            id="tbl-compare"
            title="실업급여 vs 공무원 퇴직급여 비교"
            subtitle="2026년 기준, 고용보험법 + 공무원연금법"
            headers={['항목', '실업급여', '공무원 퇴직급여']}
            rows={[
              ['재원', '고용보험료 (근로자+사업주)', '공무원연금 기여금 (공무원+정부)'],
              ['지급 조건', '비자발적 퇴직 + 구직활동', '1년 이상 재직 후 퇴직'],
              ['지급 기간', '120~270일 (한시적)', '퇴직연금: 평생 / 수당: 일시금'],
              ['금액 산정', '퇴직 전 평균임금의 60%', '기준소득월액 x 재직기간별 비율'],
              ['상한액', '1일 66,000원 (2026년)', '상한 없음 (재직기간 비례)'],
              ['구직활동 의무', '2~4주 간격 실업인정', '없음'],
            ]}
            highlightCol={2}
          />

          <SpokeFlow
            steps={[
              { icon: '🏛️', label: '공무원연금', sub: '기여금 납부' },
              { icon: '📅', label: '1년+ 재직', sub: '최소 조건' },
              { icon: '🚪', label: '퇴직', sub: '사유 무관' },
              { icon: '💰', label: '퇴직수당', sub: '일시금 수령' },
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

          <TipBox title="10년 이상 재직 공무원은 퇴직연금도 있어요">
            퇴직수당과 별도로 <strong>퇴직연금</strong>을 매달 받아요. 평균기준소득월액 x 재직연수 x 1.7%로 계산하는데, 30년 재직 시 월급의 약 51%를 평생 받는 셈이에요. 2026년 기준 연금지급률은 단계적으로 1.7%까지 인하 중이에요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '정리',
        title: '유형별로 한눈에 보는 고용보험 적용 기준이 필요하시죠?',
        desc: '체크리스트 형식으로 내 상황을 빠르게 확인할 수 있어요.',
        icon: 'check',
      },
    },

    {
      id: 's4',
      number: 'SECTION 04',
      heading: '공무원 고용보험 적용 제외 기준은 어떻게 되나요?',
      subtitle: '유형별 체크리스트와 확인 방법을 정리했어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            내가 고용보험에 가입되어 있는지 모르겠다면 <strong>고용24(work24.go.kr)</strong>에서 피보험자격을 조회하거나, 근로복지공단(1588-0075)에 전화하면 바로 확인할 수 있어요. 공무원 신분이라도 기간제·별정직이면 가입이 되어 있을 수 있어요.
          </p>

          <SpokeChecklist
            items={[
              { text: '국가공무원·지방공무원 정규직 → 적용 제외', done: false, note: '공무원연금 퇴직급여 수령' },
              { text: '별정직·임기제 공무원 → 임의가입 가능', done: true, note: '임용 3개월 내 신청, 실업급여만 적용' },
              { text: '국공립학교 정규 교사 → 적용 제외', done: false },
              { text: '사립학교 정규 교원 (사학연금) → 적용 제외', done: false },
              { text: '기간제 교사 (사학연금 미가입) → 가입 대상', done: true, note: '계약만료 시 실업급여 수급 가능' },
              { text: '학원 강사·시간강사 → 일반 근로자 기준', done: true },
              { text: '군인 → 군인연금법 적용, 고용보험 제외', done: false },
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
              { num: '02', heading: '임원 등기이사 실업급여 근로자성 판단', desc: '회사 임원의 고용보험 가입과 실업급여 수급 기준', href: '/w/임원-등기이사-실업급여-근로자성-판단' },
              { num: '03', heading: '65세 이상 고령자 실업급여 수급 제한', desc: '65세 이후 고용보험 신규가입 시 실업급여 제한', href: '/w/65세-이상-고령자-실업급여-수급-제한-예외' },
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
    { badge: '외국인', title: '외국인 근로자 실업급여 체류자격 수급 조건', desc: '상호주의와 체류자격별 고용보험 가입 기준', href: '/w/외국인-근로자-실업급여-체류자격-수급-조건' },
    { badge: '수급 조건', title: '실업급여 수급 조건 자격 요건 완벽정리', desc: '고용보험 가입 기간과 이직 사유 등 기본 조건', href: '/w/실업급여-수급-조건-자격-요건-완벽정리' },
    { badge: '65세+', title: '65세 이상 고령자 실업급여 수급 제한과 예외', desc: '65세 이후 고용보험 가입과 실업급여 제한', href: '/w/65세-이상-고령자-실업급여-수급-제한-예외' },
    { badge: '금액', title: '실업급여 금액 계산과 연봉별 수령액', desc: '퇴직 전 평균임금 60% 기준 계산법', href: '/w/실업급여-금액-계산-연봉별-수령액' },
  ],

  sources: [
    { name: '고용보험법 제10조 (적용 제외)', url: 'https://www.law.go.kr/법령/고용보험법/제10조', org: '법제처' },
    { name: '고용보험법 시행령 (별정직·임기제 가입 절차)', url: 'https://www.law.go.kr/법령/고용보험법시행령', org: '법제처' },
    { name: '공무원연금법 (퇴직급여·퇴직수당)', url: 'https://www.law.go.kr/법령/공무원연금법', org: '법제처' },
    { name: '사립학교교직원연금법', url: 'https://www.law.go.kr/법령/사립학교교직원연금법', org: '법제처' },
    { name: '고용보험 안내', url: 'https://www.ei.go.kr', org: '고용보험' },
  ],
}

export default data
