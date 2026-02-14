import type { SpokeData } from '@/data/spoke/types'
import {
  SpokeTable,
  FormulaBox,
  TipBox,
  WarnBox,
  Chips,
  SpokeLinks,
  Steps,
  SpokeCompareCards,
  SpokeRateBars,
  SpokeFlow,
  SpokeChecklist,
} from '@/components/spoke/SpokeBlocks'
import 외국인수급Checker from '@/components/checkers/외국인수급Checker'

const data: SpokeData = {
  slug: '외국인-근로자-실업급여-체류자격-수급-조건',

  meta: {
    title: '외국인 근로자 실업급여 체류자격 수급 | 상호주의 고용보험 의무가입',
    description: '외국인 근로자도 고용보험에 가입했다면 실업급여를 받을 수 있어요. 체류자격별 가입 기준과 상호주의 적용 국가, 신청 서류를 정리했어요.',
    keywords: [
      '외국인 근로자 실업급여 수급 조건',
      '외국인 고용보험 체류자격별 가입 기준',
      '외국인 실업급여 상호주의 적용 국가',
      '외국인 실업급여 신청 서류 절차 안내',
    ],
    ogTitle: '외국인 근로자 실업급여 체류자격별 수급 조건 | 머니위키',
    ogDescription: '체류자격별 고용보험 가입 구분과 실업급여 신청 방법을 확인하세요.',
  },

  hub: {
    url: '/w/실업급여-공무원-외국인-특수직종-수급-조건',
    name: '실업급여 공무원·외국인·특수직종 근로형태별 수급 조건',
  },

  breadcrumb: ['고용·노동', '실업급여', '외국인 근로자 실업급여'],

  summary3: [
    <>거주(F-2)·영주(F-5)·결혼이민(F-6)은 <strong>당연가입</strong> — 내국인과 동일하게 수급 가능</>,
    <>비전문취업(E-9)·방문취업(H-2)은 <strong>임의가입</strong> — 본인이 직접 신청해야 실업급여 대상</>,
    <>2026년 기준 1일 상한액 <strong>68,100원</strong>, 하한액 <strong>66,048원</strong> (내국인과 동일)</>,
  ],

  sourceBar: {
    badge: '출처',
    name: '고용보험법 제10조의2 · 고용보험법 시행령 제3조의3',
    date: '2026.02',
  },

  prevNext: {
    prev: { title: '임원 등기이사 실업급여 근로자성 판단', href: '/w/임원-등기이사-실업급여-근로자성-판단' },
    next: { title: '대학원생 알바 실업급여 고용보험 적용', href: '/w/대학원생-알바-실업급여-고용보험-적용' },
  },

  stickyBar: {
    topLabel: '외국인 실업급여',
    value: '체류자격별 가입',
    buttonText: '수급 자격 체크 →',
    scrollTo: '#checker',
  },

  hero: {
    badge: '2026년 기준',
    h1: (
      <>
        외국인 근로자 <span className="text-[#1E3A5F]">실업급여</span> 체류자격별 수급 조건과 신청 방법
      </>
    ),
    intro: (
      <p className="text-base text-neutral-500 leading-relaxed">
        한국에서 일하다 퇴사한 외국인이라면, 고용보험에 가입되어 있었는지부터 확인해야 해요. 체류자격에 따라 <strong>자동으로 가입</strong>되는 비자가 있고, <strong>직접 신청</strong>해야 하는 비자도 있거든요. <a href="/w/실업급여-공무원-외국인-특수직종-수급-조건" className="text-[#4A7AB5] underline">특수직종 실업급여 가이드</a>에서 전체 흐름도 참고해 보세요. 먼저 내 비자가 어디에 해당하는지부터 볼게요.
      </p>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '공무원·외국인·특수직종 근로형태별 실업급여 수급 조건 총정리',
    },
  },

  toc: [
    { id: 'checker', label: '외국인 실업급여 수급 가능성 간편 체크' },
    { id: 's1', label: '외국인 근로자 실업급여 수급 조건은 무엇인가요?' },
    { id: 's2', label: '외국인 고용보험은 체류자격별로 어떻게 가입하나요?' },
    { id: 's3', label: '외국인 실업급여 상호주의가 적용되는 국가는 어디인가요?' },
    { id: 's4', label: '외국인 실업급여 신청 서류와 절차는 어떻게 되나요?' },
    { id: 's-faq', label: '자주 묻는 질문' },
  ],

  sections: [
    /* ── 체커 ── */
    {
      id: 'checker',
      number: 'CHECK',
      heading: '외국인 실업급여 수급 가능성 간편 체크',
      subtitle: '체류자격과 가입기간, 퇴직 사유를 선택해 보세요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            외국인 근로자의 실업급여 수급 여부는 <strong>체류자격</strong>, <strong>고용보험 가입 여부</strong>, <strong>퇴직 사유</strong> 3가지로 결정돼요. 아래에서 내 상황을 선택하면 대략적인 수급 가능성을 바로 확인할 수 있어요.
          </p>
          <외국인수급Checker />
        </>
      ),
      bridgeCTA: {
        href: '#s1',
        badge: '수급 조건',
        title: '체커 결과가 나왔다면, 구체적인 수급 요건을 확인해 볼까요?',
        desc: '피보험기간 180일, 비자발적 이직 등 외국인도 갖춰야 할 4가지 요건을 정리했어요.',
        icon: 'check',
      },
    },

    /* ── S1: 수급 조건 ── */
    {
      id: 's1',
      number: 'SECTION 01',
      heading: '외국인 근로자 실업급여 수급 조건은 무엇인가요?',
      subtitle: '내국인과 동일한 4가지 요건을 갖춰야 해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            고용보험에 가입된 외국인이라도 실업급여를 받으려면 내국인과 같은 조건을 충족해야 해요. 가장 중요한 건 퇴사 전 18개월 동안 <strong>피보험기간 180일</strong> 이상이에요. 180일은 실제 근무일 기준이라 주 5일 근무 시 약 8~9개월 정도 걸려요.
          </p>

          <FormulaBox
            lines={[
              { text: '외국인 실업급여 수급 4대 요건', comment: true },
              { text: '1. 이직일 이전 18개월간 피보험기간 180일 이상', numbered: true },
              { text: '2. 비자발적 사유로 이직 (해고·계약만료·권고사직)', numbered: true },
              { text: '3. 근로 의사와 능력이 있으나 취업 못 한 상태', numbered: true },
              { text: '4. 재취업을 위한 적극적 구직활동 (실업인정)', numbered: true },
            ]}
          />

          <SpokeRateBars
            items={[
              { label: '퇴직 전 평균임금의 60%', rate: 60, desc: '1일 실업급여 지급 비율' },
              { label: '1일 상한액 68,100원', rate: 85, desc: '2026년 기준 (월 약 204만원)' },
              { label: '1일 하한액 66,048원', rate: 83, desc: '최저임금 80% x 8시간' },
            ]}
          />

          <SpokeCompareCards
            cards={[
              {
                title: '실업급여 수급 가능',
                subtitle: '비자발적 이직 + 고용보험 가입',
                items: [
                  '계약기간 만료로 퇴사',
                  '사업장 폐업·도산',
                  '권고사직·정리해고',
                  '임금 체불 3개월 이상',
                ],
                recommended: true,
                recLabel: '수급 가능',
              },
              {
                title: '실업급여 수급 불가',
                subtitle: '자발적 이직 또는 미가입',
                items: [
                  '본인 의사로 자진 퇴사',
                  '고용보험 미가입 상태',
                  '피보험기간 180일 미달',
                  '체류자격 만료 후 출국',
                ],
              },
            ]}
          />

          <WarnBox>
            <strong>체류자격 만료 주의:</strong> 실업급여 수급 중에 비자가 만료되면 급여가 즉시 중단돼요. 만료 전에 반드시 출입국관리사무소에서 체류기간 연장을 신청해야 해요. 출국하면 남은 급여는 소멸돼요.
          </WarnBox>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '가입 기준',
        title: '내 비자가 고용보험에 자동으로 가입되는 건지 궁금하시죠?',
        desc: '체류자격별 당연가입·임의가입·상호주의 3가지 구분을 한눈에 정리했어요.',
        icon: 'info',
      },
    },

    /* ── S2: 체류자격별 가입 ── */
    {
      id: 's2',
      number: 'SECTION 02',
      heading: '외국인 고용보험은 체류자격별로 어떻게 가입하나요?',
      subtitle: '당연가입·임의가입·상호주의 3가지로 나뉘어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            외국인 근로자의 고용보험 가입은 비자 종류에 따라 크게 3가지로 나뉘어요. <a href="https://www.law.go.kr/법령/고용보험법" className="text-[#4A7AB5] underline" target="_blank" rel="noopener noreferrer">고용보험법 제10조의2</a>와 시행령 제3조의3에 명시된 구분이에요. 같은 외국인이라도 비자가 다르면 가입 방식이 완전히 달라요.
          </p>

          <SpokeTable
            id="tbl-visa"
            title="체류자격별 고용보험 가입 구분"
            subtitle="고용보험법 시행령 제3조의3 기준 / 2026년"
            headers={['구분', '체류자격', '실업급여', '보험료 부담']}
            rows={[
              ['당연가입', 'F-2(거주), F-5(영주), F-6(결혼이민)', '자동 적용', '사업주 50% + 근로자 50%'],
              ['임의가입', 'E-9(비전문취업), H-2(방문취업), F-4(재외동포)', '본인 신청 시', '사업주 50% + 근로자 50%'],
              ['상호주의', 'D-7(주재), D-8(기업투자), D-9(무역경영)', '본국법 적용 시', '사업주 50% + 근로자 50%'],
              ['적용 제외', 'D-4(일반연수), E-2(회화지도) 등', '가입 불가', '-'],
            ]}
            highlightCol={2}
          />

          <Chips
            items={[
              { icon: '🟢', label: 'F-2·F-5·F-6', value: '당연가입' },
              { icon: '🔵', label: 'E-9·H-2·F-4', value: '임의가입' },
              { icon: '🟡', label: 'D-7·D-8·D-9', value: '상호주의' },
              { icon: '🔴', label: 'D-4·E-2 등', value: '적용 제외' },
            ]}
          />

          <TipBox title="F-4(재외동포) 비자는 어디에 해당하나요?">
            F-4 비자는 임의가입 대상이에요. 본인이 원하면 고용보험에 가입할 수 있고, 가입 후 피보험기간 180일 이상이면 <a href="/w/실업급여-수급-조건-자격-요건-완벽정리" className="text-[#4A7AB5] underline">실업급여 수급 조건</a>을 충족해요.
          </TipBox>

          <WarnBox>
            <strong>임의가입 주의:</strong> E-9·H-2 비자 근로자가 고용보험에 가입하려면, 외국인 고용보험 피보험자격 취득 신청서를 근로복지공단에 제출해야 해요. <strong>사업주 동의 없이</strong> 근로자 본인이 단독으로 신청할 수 있어요.
          </WarnBox>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '상호주의',
        title: 'D-7·D-8·D-9 비자라면 본국 법률부터 확인해야 해요',
        desc: '상호주의 원칙이 뭔지, 내 나라가 적용 대상인지 알아보는 방법을 알려드려요.',
        icon: 'info',
      },
    },

    /* ── S3: 상호주의 ── */
    {
      id: 's3',
      number: 'SECTION 03',
      heading: '외국인 실업급여 상호주의가 적용되는 국가는 어디인가요?',
      subtitle: '본국이 한국인에게도 보험을 적용해야 가입돼요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            상호주의는 쉽게 말하면 "당신 나라가 한국인을 보호해 주면, 한국도 당신을 보호해 줄게"라는 원칙이에요. D-7(주재)·D-8(기업투자)·D-9(무역경영) 비자에 적용되는 규정이에요. <a href="https://www.law.go.kr/법령/고용보험법시행령" className="text-[#4A7AB5] underline" target="_blank" rel="noopener noreferrer">고용보험법 시행령 제3조의3</a>에 명시되어 있어요.
          </p>

          <SpokeFlow
            items={[
              { title: '본국법 확인', sub: '한국인에게 고용보험 상응 급여 지급 여부' },
              { title: '상호주의 충족', sub: '본국이 한국인 보호 시 → 한국도 적용' },
              { title: '고용보험 가입', sub: '근로복지공단에 피보험자격 취득 신고' },
              { title: '실업급여 수급', sub: '내국인과 동일한 4대 요건 충족 시' },
            ]}
          />

          <SpokeChecklist
            items={[
              { text: 'D-7(주재)·D-8(기업투자)·D-9(무역경영) 비자에 적용', done: true },
              { text: '본국이 한국인에게 고용보험 상응 급여를 지급해야 적용', done: true },
              { text: '본국에 상응 제도가 없으면 고용보험 자체가 적용 제외', done: false },
              { text: 'F-2·F-5·F-6은 상호주의와 무관하게 당연가입', done: true },
            ]}
          />

          <SpokeTable
            id="tbl-reciprocity"
            title="상호주의 적용 여부 요약"
            subtitle="고용보험법 시행령 제3조의3 기준"
            headers={['체류자격', '상호주의', '고용보험', '비고']}
            rows={[
              ['D-7(주재)', '적용', '본국법 확인 후 가입', '전문인력 체류자격'],
              ['D-8(기업투자)', '적용', '본국법 확인 후 가입', '외국인 투자기업'],
              ['D-9(무역경영)', '적용', '본국법 확인 후 가입', '무역·경영 활동'],
              ['E-9(비전문취업)', '미적용', '임의가입 (본인 선택)', '상호주의 별도'],
            ]}
            highlightCol={1}
          />

          <TipBox title="내 나라가 상호주의 대상인지 어떻게 확인하나요?">
            고용노동부 고객상담센터 <strong>1350</strong>에 전화하면 본국의 상호주의 적용 여부를 확인할 수 있어요. 관할 고용센터에 직접 방문해서 물어보는 것도 좋은 방법이에요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '신청 절차',
        title: '서류를 미리 챙겨야 고용센터에서 헤매지 않아요',
        desc: '외국인등록증부터 이직확인서까지, 필요한 서류와 5단계 절차를 정리했어요.',
        icon: 'calc',
      },
    },

    /* ── S4: 신청 서류·절차 ── */
    {
      id: 's4',
      number: 'SECTION 04',
      heading: '외국인 실업급여 신청 서류와 절차는 어떻게 되나요?',
      subtitle: '고용센터 방문 → 구직 신청 → 수급자격 인정 → 실업인정',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            외국인 근로자도 내국인과 거의 같은 절차로 실업급여를 신청해요. 다만 외국인등록증과 체류자격 증명 서류를 추가로 준비해야 한다는 점이 달라요. 퇴사 후 <strong>12개월 이내</strong>에 신청하지 않으면 수급 자격이 사라지니 서둘러야 해요.
          </p>

          <Steps
            items={[
              { title: '이직확인서 확인', desc: '사업주가 고용센터에 제출하는 서류예요. 퇴사 후 10일 이내 사업주에게 제출 여부를 꼭 확인하세요.' },
              { title: '고용24(work24.go.kr) 구직 신청', desc: '온라인으로 구직 등록을 먼저 해요. 외국인등록번호로 가입할 수 있어요.' },
              { title: '관할 고용센터 방문·수급자격 신청', desc: '외국인등록증, 여권, 통장사본을 가지고 거주지 관할 고용센터에 방문해요.' },
              { title: '수급자격 인정 (14일 이내)', desc: '고용센터에서 이직 사유, 피보험기간 등을 확인하고 수급자격을 결정해요.' },
              { title: '실업인정·급여 수령', desc: '1~4주 간격으로 고용센터에 출석해서 구직활동을 보고하면 급여가 입금돼요.' },
            ]}
          />

          <SpokeTable
            id="tbl-docs"
            title="외국인 실업급여 신청 시 필요 서류"
            subtitle="거주지 관할 고용센터 제출 기준"
            headers={['서류', '비고']}
            rows={[
              ['외국인등록증', '원본 지참 필수'],
              ['여권', '신분 확인용'],
              ['통장사본', '실업급여 입금 계좌 (본인 명의)'],
              ['근로계약서', '근로 조건·기간 확인용'],
              ['급여명세서 또는 원천징수영수증', '평균임금 산정용'],
              ['이직확인서 (사업주 제출)', '고용센터에서 접수 여부 확인'],
            ]}
          />

          <TipBox title="한국어가 어려우면 통역 서비스를 이용하세요">
            고용노동부 고객상담센터 <strong>1350</strong>에서 영어·중국어·베트남어 등 외국어 상담이 가능해요. 외국인력지원센터 <strong>1577-0071</strong>에서도 신청 절차를 안내받을 수 있어요.
          </TipBox>

          <SpokeLinks
            title="관련 실업급여 정보"
            items={[
              { num: '01', heading: '실업급여 신청 방법 절차 준비서류', desc: '고용24 구직 신청부터 급여 수령까지', href: '/w/실업급여-신청-방법-절차-준비서류' },
              { num: '02', heading: '실업급여 실업인정 구직활동 방법', desc: '실업인정일 출석과 구직활동 보고 절차', href: '/w/실업급여-실업인정-구직활동-방법' },
            ]}
          />
        </>
      ),
      bridgeCTA: {
        href: '/w/실업급여-공무원-외국인-특수직종-수급-조건',
        badge: '전체 가이드',
        title: '다른 특수직종의 실업급여 조건도 궁금하시죠?',
        desc: '공무원·임원·대학원생 등 근로형태별 수급 조건을 한눈에 비교할 수 있어요.',
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
      question: '외국인 근로자 실업급여 금액은 얼마인가요?',
      answer: '2026년 기준 퇴직 전 평균임금의 <strong>60%</strong>를 지급받아요. 1일 하한액은 <strong>66,048원</strong>, 상한액은 <strong>68,100원</strong>이에요. 월 최대 약 <strong>204만원</strong>까지 받을 수 있어요.',
    },
    {
      question: 'E-9 비자인데 고용보험 임의가입은 어떻게 하나요?',
      answer: '외국인 고용보험 피보험자격 취득 신청서를 작성해서 사업장 소재지 <strong>근로복지공단</strong>에 제출하면 돼요. 사업주 동의 없이 근로자 본인이 단독으로 신청할 수 있어요.',
    },
    {
      question: '실업급여 수급 중 비자가 만료되면 어떻게 되나요?',
      answer: '체류자격이 만료되면 실업급여가 <strong>즉시 중단</strong>돼요. 반드시 만료 전에 출입국관리사무소에서 체류기간 연장을 신청해야 해요. 출국하면 남은 급여는 받을 수 없어요.',
    },
    {
      question: '불법체류 외국인도 실업급여를 받을 수 있나요?',
      answer: '<strong>아니요.</strong> 불법체류자는 고용보험 가입 자체가 안 되기 때문에 실업급여 수급이 불가능해요. 다만 미지급 임금이나 퇴직금은 체류 상태와 관계없이 청구할 수 있어요.',
    },
    {
      question: '외국인 실업급여 수급기간은 얼마나 되나요?',
      answer: '내국인과 동일하게 피보험기간과 연령에 따라 <strong>120~270일</strong>이에요. 50세 미만이고 1~3년 가입했다면 150일, 50세 이상이면 같은 기간에 180일을 받을 수 있어요.',
    },
  ],

  relatedSpokes: [
    { badge: '수급 조건', title: '실업급여 수급 조건 자격 요건 완벽정리', desc: '피보험기간 180일·이직사유 등 기본 요건', href: '/w/실업급여-수급-조건-자격-요건-완벽정리' },
    { badge: '신청 절차', title: '실업급여 신청 방법 절차 준비서류', desc: '고용24 구직 신청부터 급여 입금까지', href: '/w/실업급여-신청-방법-절차-준비서류' },
    { badge: '대학원생', title: '대학원생 알바 실업급여 고용보험 적용', desc: '아르바이트 고용보험 가입 기준과 수급 조건', href: '/w/대학원생-알바-실업급여-고용보험-적용' },
    { badge: '65세 이상', title: '65세 이상 고령자 실업급여 수급 제한 예외', desc: '65세 이후 고용보험 가입과 수급 조건', href: '/w/65세-이상-고령자-실업급여-수급-제한-예외' },
  ],

  sources: [
    { name: '고용보험법 제10조의2', url: 'https://www.law.go.kr/법령/고용보험법', org: '법제처' },
    { name: '고용보험법 시행령 제3조의3', url: 'https://www.law.go.kr/법령/고용보험법시행령', org: '법제처' },
    { name: '외국인 근로자 고용보험 안내', url: 'https://www.work24.go.kr', org: '고용24' },
    { name: '고용노동부 실업급여 안내', url: 'https://www.moel.go.kr', org: '고용노동부' },
  ],
}

export default data
