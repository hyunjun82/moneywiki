import type { SpokeData } from '@/data/spoke/types'
import {
  SpokeTable, FormulaBox, TipBox, WarnBox,
  SpokeTimeline, SpokeCompareCards,
  SpokeRateBars, SpokeChecklist, SpokeWarnBox,
} from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '예술인-노무제공자-특고-실업급여-고용보험-조건',

  meta: {
    title: '예술인 노무제공자 특고 실업급여 조건 | 고용보험 피보험기간 9개월',
    description: '예술인은 피보험기간 9개월이면 실업급여를 받을 수 있어요. 노무제공자 12개월 기준과 구직급여 일액 상한 68,100원까지 정리했어요.',
    keywords: [
      '예술인 실업급여 고용보험 조건',
      '특수고용직 노무제공자 실업급여',
      '예술인 실업급여 피보험기간 9개월',
      '특고 실업급여 금액 상한 하한',
    ],
    ogTitle: '예술인 노무제공자 특고 실업급여 고용보험 조건 | 머니위키',
    ogDescription: '예술인 9개월, 특고 12개월 피보험기간 기준과 구직급여 일액을 확인해 보세요.',
  },

  hub: {
    url: '/w/실업급여-퇴사유형별-수급-자격-권고사직-자진퇴사-해고',
    name: '실업급여 퇴사유형별 수급 자격 비교',
  },

  breadcrumb: ['고용·노동', '실업급여', '예술인·특고 실업급여'],

  summary3: [
    <>예술인 고용보험은 이직 전 24개월 중 <strong>9개월</strong> 피보험기간이면 구직급여 수급 가능</>,
    <>노무제공자(특고)는 이직 전 24개월 중 <strong>12개월</strong> 이상 피보험기간 필요</>,
    <>2026년 구직급여 일액 상한 <strong>68,100원</strong>, 예술인 하한은 <strong>16,000원</strong></>,
  ],

  sourceBar: {
    badge: '출처',
    name: '고용보험법 제77조의2·고용노동부 2026년 고시',
    date: '2026.01',
  },

  prevNext: {
    prev: { title: '자영업자 폐업 실업급여 조건', href: '/w/자영업자-폐업-실업급여-조건-고용보험-가입' },
    next: { title: '일용직 건설근로자 실업급여', href: '/w/일용직-건설근로자-실업급여-피보험기간-계산' },
  },

  stickyBar: {
    topLabel: '예술인 피보험기간',
    value: '9개월',
    buttonText: '수급 조건 확인 →',
    scrollTo: '#s1',
  },

  hero: {
    badge: '2026년 기준',
    h1: (
      <>
        <span className="text-[#1E3A5F]">예술인·노무제공자</span> 실업급여 고용보험 가입 조건과 구직급여 금액
      </>
    ),
    intro: (
      <p className="text-base text-neutral-500 leading-relaxed">
        프리랜서 음악가, 배달라이더, 대리운전 기사님도 고용보험에 가입하면 실업급여를 받을 수 있어요. 예술인은 <strong>9개월</strong>, 노무제공자는 <strong>12개월</strong> 피보험기간이 필요한데요. 2026년 기준 구직급여 일 상한액은 <strong>68,100원</strong>으로 올랐어요. 먼저 <a href="/w/실업급여-퇴사유형별-수급-자격-권고사직-자진퇴사-해고" className="text-[#4A7AB5] underline">퇴사유형별 실업급여 조건</a>이 궁금하시면 허브 글을 참고하시고, 예술인·특고 조건부터 같이 볼게요.
      </p>
    ),
    hubCTA: {
      badge: '전체 비교',
      desc: '퇴사유형별 실업급여 수급 자격 한눈에 비교',
    },
  },

  toc: [
    { id: 's1', label: '예술인 고용보험 실업급여 가입 조건은 어떻게 되나요?' },
    { id: 's2', label: '예술인·특고 실업급여 구직급여 금액은 얼마인가요?' },
    { id: 's3', label: '노무제공자 특수고용직 실업급여 적용 직종은 어떤 게 있나요?' },
    { id: 's4', label: '예술인·특고 실업급여 신청 절차는 어떻게 되나요?' },
    { id: 's-faq', label: '자주 묻는 질문' },
  ],

  sections: [
    {
      id: 's1',
      number: 'SECTION 01',
      heading: '예술인 고용보험 실업급여 가입 조건은 어떻게 되나요?',
      subtitle: '예술인은 9개월, 노무제공자는 12개월이 기준이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            예술인과 노무제공자(특수고용직)는 일반 근로자와 고용보험 가입 체계가 달라요. 예술인은 <strong>예술인복지법</strong>에 따라 예술활동증명을 받은 사람이 대상이에요. 노무제공자는 보험설계사, 택배기사, 배달라이더처럼 근로자는 아니지만 특정 사업주에게 노무를 제공하는 분들이에요.
          </p>

          <SpokeTimeline
            events={[
              { month: '2020.12', title: '예술인 고용보험 시행', desc: '예술인복지법상 예술활동증명 보유자 대상', status: 'normal' },
              { month: '2021.07', title: '노무제공자 1차 적용', desc: '보험설계사·택배기사·학습지교사 등 12개 직종', status: 'normal' },
              { month: '2022.01', title: '노무제공자 2차 확대', desc: '퀵서비스·대리운전·배달라이더 등 플랫폼 종사자', status: 'normal' },
              { month: '2025~', title: '적용 직종 전면 확대', desc: '가사종사자·자동차영업사원 등 추가 검토 중', status: 'current' },
            ]}
          />

          <SpokeCompareCards
            cards={[
              {
                title: '예술인',
                subtitle: '예술활동증명 보유자',
                items: [
                  '피보험기간: 이직 전 24개월 중 9개월',
                  '보험료율: 보수의 1.6% (각 0.8%)',
                  '문화예술 용역 계약 기반',
                  '수급 중 일부 소득활동 허용',
                ],
                recommended: true,
                recLabel: '피보험기간 짧음',
              },
              {
                title: '노무제공자(특고)',
                subtitle: '19개 적용 직종 종사자',
                items: [
                  '피보험기간: 이직 전 24개월 중 12개월',
                  '보험료율: 보수의 1.4~1.6% (각 50%)',
                  '월 보수 80만원 이상 시 적용',
                  '소득 감소 사유도 수급 가능',
                ],
              },
            ]}
          />

          <TipBox title="예술인은 9개월이면 충분해요">
            일반 근로자는 18개월 중 180일(약 6개월), 자영업자는 24개월 중 1년이 필요하지만, 예술인은 24개월 중 <strong>9개월</strong>만 채우면 돼요. 불규칙한 활동 패턴을 반영한 거예요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '금액',
        title: '그러면 실제로 구직급여를 얼마나 받을 수 있을까요?',
        desc: '예술인 하한 16,000원부터 상한 68,100원까지 일액 기준을 정리했어요.',
        icon: 'calc',
      },
    },

    {
      id: 's2',
      number: 'SECTION 02',
      heading: '예술인·특고 실업급여 구직급여 금액은 얼마인가요?',
      subtitle: '이직 전 평균보수의 60%, 일 상한 68,100원',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            예술인과 노무제공자 모두 구직급여 일액은 이직 전 평균보수의 <strong>60%</strong>예요. 다만 예술인은 하한액이 일반 근로자와 다른데요. 일반 근로자 하한액이 66,048원인 반면, 예술인은 <strong>16,000원</strong>이에요. 이건 예술인의 보수가 상대적으로 낮은 현실을 반영한 거예요.
          </p>

          <FormulaBox
            lines={[
              { text: '예술인·노무제공자 구직급여 일액 계산', comment: true },
              { text: '구직급여 일액 = 이직 전 평균보수 x 60%' },
            ]}
          />

          <SpokeRateBars
            bars={[
              { label: '일 상한액', rate: '68,100원', width: '100%' },
              { label: '근로자 하한', rate: '66,048원', width: '97%' },
              { label: '예술인 하한', rate: '16,000원', width: '23%' },
            ]}
          />

          <SpokeTable
            id="tbl-period"
            title="예술인·노무제공자 소정급여일수"
            subtitle="고용보험법 시행령 기준 / 연령·가입기간별"
            headers={['구분', '1년 미만', '1~3년', '3~5년', '5~10년', '10년 이상']}
            rows={[
              ['50세 미만', '120일', '150일', '180일', '210일', '240일'],
              ['50세 이상·장애인', '120일', '180일', '210일', '240일', '270일'],
            ]}
            highlightCol={1}
          />

          <TipBox title="예술인은 수급 기간 중에도 일부 소득활동이 가능해요">
            단기예술인의 경우 신청일 전 1개월간 노무제공일수가 <strong>10일 미만</strong>이면 실업 상태로 인정돼요. 간헐적인 작업은 괜찮아요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '직종',
        title: '내 직업도 노무제공자 고용보험에 해당될까요?',
        desc: '2026년 기준 19개 적용 직종을 한눈에 확인할 수 있어요.',
        icon: 'grid',
      },
    },

    {
      id: 's3',
      number: 'SECTION 03',
      heading: '노무제공자 특수고용직 실업급여 적용 직종은 어떤 게 있나요?',
      subtitle: '보험설계사부터 배달라이더까지 19개 직종',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            노무제공자 고용보험은 처음에 12개 직종으로 시작했지만, 2022년부터 플랫폼 종사자까지 확대되면서 현재 <strong>19개 직종</strong>이 적용 대상이에요. 월 보수가 <strong>80만원 이상</strong>이면 자동으로 가입되고, 보험료는 사업주와 본인이 <a href="/w/자영업자-폐업-실업급여-조건-고용보험-가입" className="text-[#4A7AB5] underline">자영업자 고용보험</a>과 마찬가지로 반반 부담해요.
          </p>

          <SpokeTable
            id="tbl-jobs"
            title="노무제공자 고용보험 적용 19개 직종"
            subtitle="고용보험법 시행령 기준 / 2022.01~ 전면 적용"
            headers={['구분', '직종']}
            rows={[
              ['1차 적용 (2021.07)', '보험설계사, 신용카드모집인, 대출모집인, 학습지교사'],
              ['', '방문교사, 택배기사, 대여제품방문점검원'],
              ['', '가전배송·설치기사, 방문판매원, 화물차주'],
              ['', '건설기계종사자, 방과후강사'],
              ['2차 적용 (2022.01)', '퀵서비스기사, 대리운전기사, 배달라이더'],
              ['', '골프장캐디, 관광통역안내사'],
              ['', '어린이통학버스기사, IT소프트웨어프리랜서'],
            ]}
          />

          <SpokeWarnBox title="적용 제외 사유에 주의하세요">
            <p className="leading-relaxed">
              월 보수가 80만원 미만이면 1개월 이상 계약 시 적용되지 않아요. 다만 1개월 미만 단기 계약은 보수와 관계없이 모두 적용돼요. 또한 <strong>65세 이후 신규 가입</strong>하는 경우에는 <a href="/w/65세-이상-고령자-실업급여-수급-제한-예외" className="text-[#4A7AB5] underline">실업급여 적용이 제외</a>될 수 있어요.
            </p>
          </SpokeWarnBox>

          <TipBox title="배달라이더·퀵서비스 기사도 실업급여를 받을 수 있어요">
            플랫폼 앱을 통해 일하더라도 고용보험 가입 대상이에요. 사업주(플랫폼 사업자)가 피보험자격 취득 신고를 해야 하니, 가입 여부를 근로복지공단(1588-0075)에서 확인해 보세요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '신청',
        title: '수급 조건을 충족했다면 어디서 신청하면 되나요?',
        desc: '온라인과 고용센터 신청 절차를 단계별로 안내해요.',
        icon: 'check',
      },
    },

    {
      id: 's4',
      number: 'SECTION 04',
      heading: '예술인·특고 실업급여 신청 절차는 어떻게 되나요?',
      subtitle: '워크넷 구직등록 → 고용센터 방문 → 수급자격 인정',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            예술인과 노무제공자도 일반 근로자와 신청 절차가 거의 같아요. 이직일 다음 날부터 <strong>12개월 이내</strong>에 신청해야 하는 점이 중요해요. 기한을 넘기면 수급 자격이 사라지니까 퇴직 후 바로 준비하는 게 좋아요.
          </p>

          <SpokeChecklist
            items={[
              { text: '워크넷(work24.go.kr)에 구직등록하기', done: false, note: '온라인으로 미리 등록하면 방문 시간을 줄여요' },
              { text: '고용보험 홈페이지에서 수급자격 신청서 작성', done: false, note: '피보험 이력과 이직 사유를 정확히 기재하세요' },
              { text: '관할 고용센터 방문 (수급자격 인정 신청)', done: false, note: '신분증, 통장사본, 이직확인서(사업주 제출) 필요' },
              { text: '수급자격 인정 여부 통보 (약 14일)', done: false, note: '적합 판정 시 1~4주 대기기간 후 급여 시작' },
              { text: '실업인정일에 고용센터 방문 또는 온라인 인정', done: false, note: '1~4주 단위로 구직활동 보고서 제출' },
            ]}
          />

          <TipBox title="예술인은 한국예술인복지재단에서도 상담받을 수 있어요">
            예술인 고용보험 관련 궁금한 점은 <strong>한국예술인복지재단(02-3668-0200)</strong>이나 <strong>근로복지공단(1588-0075)</strong>에 문의하면 전문 상담을 받을 수 있어요. 예술활동증명 신청도 재단 홈페이지에서 가능해요.
          </TipBox>

          <WarnBox>
            <strong>자발적 이직은 원칙적으로 수급 불가해요.</strong> 본인의 중대한 귀책 사유로 계약이 해지되거나, 스스로 그만둔 경우에는 구직급여를 받을 수 없어요. 다만 임금 체불, 근로조건 위반 같은 정당한 사유가 있으면 예외적으로 인정돼요.
          </WarnBox>
        </>
      ),
      bridgeCTA: {
        href: '/w/실업급여-퇴사유형별-수급-자격-권고사직-자진퇴사-해고',
        badge: '허브',
        title: '퇴사 유형별 실업급여 조건이 궁금하신가요?',
        desc: '권고사직, 자진퇴사, 해고 등 유형별 수급 자격을 한눈에 비교할 수 있어요.',
        icon: 'info',
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
    {
      question: '예술인 실업급여 피보험기간은 얼마나 필요한가요?',
      answer: '이직일 이전 <strong>24개월 중 9개월</strong> 이상이면 돼요. 일반 근로자(18개월 중 180일)보다 기준이 완화되어 있어요.',
    },
    {
      question: '노무제공자(특고) 실업급여는 자영업자와 다른가요?',
      answer: '네, 달라요. 자영업자는 24개월 중 <strong>1년 이상</strong> 가입이 필요하고, 노무제공자는 24개월 중 <strong>12개월</strong>이에요. 자영업자는 폐업이 조건이고, 노무제공자는 계약 종료나 소득 감소도 인정돼요.',
    },
    {
      question: '예술인 구직급여 하한액이 16,000원인데 너무 적지 않나요?',
      answer: '예술인의 보수 수준이 일반 근로자보다 낮은 경우가 많아서 별도 하한액이 적용돼요. 다만 <strong>상한액은 68,100원</strong>으로 일반 근로자와 동일해요.',
    },
    {
      question: '배달라이더인데 사업주가 고용보험 신고를 안 했어요',
      answer: '플랫폼 사업자가 <strong>피보험자격 취득 신고 의무</strong>가 있어요. 미신고 시 근로복지공단(1588-0075)에 직접 가입 신청하거나 신고할 수 있어요.',
    },
    {
      question: '예술인 실업급여를 받으면서 다른 일을 할 수 있나요?',
      answer: '네, 단기예술인은 신청일 전 1개월간 노무제공일수가 <strong>10일 미만</strong>이면 실업 상태로 인정돼요. 다만 소득이 일정 기준을 넘으면 급여가 감액될 수 있어요.',
    },
  ],

  relatedSpokes: [
    { badge: '자영업자', title: '자영업자 폐업 실업급여 조건 고용보험 가입 방법', desc: '24개월 중 1년 이상 가입 조건과 신청 절차', href: '/w/자영업자-폐업-실업급여-조건-고용보험-가입' },
    { badge: '일용직', title: '일용직 건설근로자 실업급여 피보험기간 계산법', desc: '18개월 중 180일 기준과 수급 금액 계산', href: '/w/일용직-건설근로자-실업급여-피보험기간-계산' },
    { badge: '고령자', title: '65세 이상 고령자 실업급여 수급 제한 예외 조건', desc: '65세 전후 가입 시점별 수급 차이', href: '/w/65세-이상-고령자-실업급여-수급-제한-예외' },
    { badge: '유형별', title: '실업급여 퇴사유형별 수급 자격 한눈에 비교', desc: '권고사직·자진퇴사·해고·계약만료 비교', href: '/w/실업급여-퇴사유형별-수급-자격-권고사직-자진퇴사-해고' },
  ],

  sources: [
    { name: '고용보험법 (예술인 특례)', url: 'https://www.law.go.kr/법령/고용보험법', org: '법제처' },
    { name: '예술인 고용보험 안내', url: 'https://www.kawf.kr/aei/empInfo.do', org: '한국예술인복지재단' },
    { name: '노무제공자 고용보험 제도 안내', url: 'https://www.korea.kr/news/policyNewsView.do?newsId=148897536', org: '정책브리핑' },
    { name: '실업급여 안내', url: 'https://www.ei.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePb0201Info.do', org: '고용보험' },
  ],
}

export default data
