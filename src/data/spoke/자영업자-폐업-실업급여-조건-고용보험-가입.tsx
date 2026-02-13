import type { SpokeData } from '@/data/spoke/types'
import {
  SpokeTable, TipBox, FormulaBox, WarnBox,
  Chips, SpokeTimeline, SpokeCompareCards,
  SpokeRateBars, SpokeChecklist, SpokeWarnBox,
} from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '자영업자-폐업-실업급여-조건-고용보험-가입',

  meta: {
    title: '자영업자 폐업 실업급여 조건 고용보험 가입 | 기준보수 등급별 수급액',
    description: '자영업자도 고용보험에 가입하면 폐업 시 실업급여를 받을 수 있어요. 기준보수 7등급 보험료와 수급 금액 계산법을 정리했어요.',
    keywords: [
      '자영업자 폐업 실업급여 조건',
      '자영업자 고용보험 가입 방법',
      '자영업자 실업급여 금액 계산',
      '자영업자 실업급여 신청 절차',
    ],
    ogTitle: '자영업자 폐업 실업급여 조건 고용보험 가입 방법 | 머니위키',
    ogDescription: '자영업자 고용보험 7등급 기준보수별 보험료와 실업급여 수급액을 확인하세요.',
  },

  hub: {
    url: '/w/실업급여-퇴사유형별-수급-자격-권고사직-자진퇴사-해고',
    name: '실업급여 퇴사유형별 수급 자격 비교',
  },

  breadcrumb: ['고용·노동', '실업급여', '자영업자 폐업 실업급여'],

  summary3: [
    <>자영업자 고용보험은 <strong>임의가입</strong>이에요. 본인이 직접 신청해야 해요</>,
    <>폐업일 이전 24개월 중 <strong>1년 이상</strong> 보험료를 납부해야 수급 가능해요</>,
    <>기준보수의 60%를 <strong>120~210일</strong> 동안 구직급여로 받아요</>,
  ],

  sourceBar: {
    badge: '출처',
    name: '근로복지공단 자영업자 고용보험 안내',
    date: '2026.02',
  },

  prevNext: {
    prev: { title: '해고·부당해고 실업급여와 해고예고수당', href: '/w/해고-부당해고-징계해고-실업급여-해고예고수당' },
    next: { title: '예술인·노무제공자 실업급여 조건', href: '/w/예술인-노무제공자-특고-실업급여-고용보험-조건' },
  },

  stickyBar: {
    topLabel: '자영업자 실업급여',
    value: '최대 월 203만원',
    buttonText: '가입 방법 보기 →',
    scrollTo: '#s2',
  },

  hero: {
    badge: '2026년 기준',
    h1: (
      <>
        자영업자 <span className="text-[#1E3A5F]">폐업 실업급여</span> 조건과 고용보험 가입 방법
      </>
    ),
    intro: (
      <p className="text-base text-neutral-500 leading-relaxed">
        사업을 정리해야 하는데, 당장 생활비가 걱정되셨다면 잘 오셨어요. 자영업자도 고용보험에 가입하면 폐업 시 기준보수의 60%를 <strong>최대 210일</strong>까지 받을 수 있어요. <a href="/w/실업급여-퇴사유형별-수급-자격-권고사직-자진퇴사-해고" className="text-[#4A7AB5] underline">퇴사유형별 실업급여 비교</a>와 함께 자영업자 고용보험 가입 조건부터 먼저 살펴볼게요.
      </p>
    ),
    hubCTA: {
      badge: '전체 비교',
      desc: '퇴사유형별 실업급여 수급 자격 한눈에 비교',
    },
  },

  toc: [
    { id: 's1', label: '자영업자 폐업 실업급여 조건은 뭔가요?' },
    { id: 's2', label: '자영업자 고용보험 가입은 어떻게 하나요?' },
    { id: 's3', label: '자영업자 실업급여 금액은 얼마나 되나요?' },
    { id: 's4', label: '자영업자 실업급여 신청은 어떻게 하나요?' },
    { id: 's-faq', label: '자주 묻는 질문' },
  ],

  sections: [
    {
      id: 's1',
      number: 'SECTION 01',
      heading: '자영업자 폐업 실업급여 조건은 뭔가요?',
      subtitle: '고용보험 가입 + 피보험기간 1년 + 비자발적 폐업',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            직장인은 회사가 고용보험을 넣어주지만, 자영업자는 달라요. <strong>본인이 직접 가입 신청</strong>을 해야 하고, 폐업 사유도 일정 기준을 충족해야 실업급여를 받을 수 있어요. 세 가지 핵심 조건을 정리했어요.
          </p>

          <SpokeWarnBox title="자영업자 실업급여 3대 수급 조건">
            <p className="leading-relaxed">
              <strong>1. 피보험기간</strong> — 폐업일 이전 24개월 중 자영업자 고용보험 가입기간이 <strong>1년(12개월) 이상</strong>이어야 해요.<br />
              <strong>2. 비자발적 폐업</strong> — 매출 감소, 적자 지속 등 <a href="https://www.law.go.kr/법령/고용보험법" target="_blank" rel="noopener noreferrer" className="text-[#4A7AB5] underline">고용보험법</a>이 인정하는 사유여야 해요.<br />
              <strong>3. 구직 의사</strong> — 재취업 또는 재창업 의지가 있고, 적극적으로 구직활동을 해야 해요.
            </p>
          </SpokeWarnBox>

          <SpokeTable
            id="tbl-closure-reason"
            title="비자발적 폐업으로 인정되는 사유"
            subtitle="고용보험법 시행규칙 기준 / 하나라도 충족하면 인정"
            headers={['구분', '세부 기준']}
            rows={[
              ['매출액 감소', '직전 3개월 월평균 매출이 전년 동기 대비 20% 이상 감소'],
              ['적자 지속', '6개월 연속 적자 발생'],
              ['매출 추세', '3분기 연속 월평균 매출 감소 추세'],
              ['건강 사유', '질병·부상으로 사업 지속 곤란 (의사 소견서 필요)'],
              ['자연재해', '재해·재난으로 사업 지속 불가 (피해확인서 필요)'],
            ]}
            highlightCol={1}
          />

          <TipBox title="단순히 장사가 안 돼서 문 닫으면 안 되나요?">
            단순 변심이나 다른 사업 시작 목적의 폐업은 인정이 안 돼요. 반드시 매출 감소 20% 이상, 6개월 적자 등 객관적 증빙이 있어야 해요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '가입',
        title: '고용보험에 아직 안 들었다면 지금이라도 가입할 수 있을까요?',
        desc: '자영업자 고용보험은 사업자등록증만 있으면 온라인으로 바로 가입이 돼요.',
        icon: 'info',
      },
    },

    {
      id: 's2',
      number: 'SECTION 02',
      heading: '자영업자 고용보험 가입은 어떻게 하나요?',
      subtitle: '사업자등록증 + 7등급 중 선택 + 월 4만~7.6만원',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            수급 조건을 봤으니 가입 방법도 궁금해지죠. 자영업자 고용보험은 <strong>임의가입</strong>이에요. 사업자등록증이 있는 자영업자라면 누구나 가입할 수 있고, 기준보수 등급을 직접 선택해요.
          </p>

          <SpokeCompareCards
            cards={[
              {
                title: '가입 대상',
                subtitle: '사업자등록증 보유 자영업자',
                items: [
                  '1인 자영업자(근로자 없는 사업주)',
                  '50인 미만 근로자 사업주',
                  '어린이집·요양기관 대표자',
                  '부동산임대업 등 제외 업종 없음',
                ],
                recommended: true,
                recLabel: '대부분 가능',
              },
              {
                title: '가입 제외',
                subtitle: '아래에 해당하면 가입 불가',
                items: [
                  '부동산임대업만 하는 경우 (일부 제한)',
                  '5인 미만 농림어업 법인 대표',
                  '이미 다른 사업장의 근로자 신분인 경우',
                  '고용보험 체납 이력으로 제한된 경우',
                ],
              },
            ]}
          />

          <FormulaBox
            lines={[
              { text: '자영업자 고용보험료 계산', comment: true },
              { text: '월 보험료 = 기준보수 x 2.25%' },
              { text: '(실업급여 2% + 고용안정 0.25%)', comment: true },
            ]}
          />

          <SpokeTable
            id="tbl-grade"
            title="기준보수 등급별 월 보험료와 구직급여"
            subtitle="근로복지공단 2026년 기준 / 등급은 가입 시 본인이 선택"
            headers={['등급', '기준보수', '월 보험료', '구직급여(월)']}
            rows={[
              ['1등급', '182만원', '40,950원', '109.2만원'],
              ['2등급', '208만원', '46,800원', '124.8만원'],
              ['3등급', '234만원', '52,650원', '140.4만원'],
              ['4등급', '260만원', '58,500원', '156만원'],
              ['5등급', '286만원', '64,350원', '171.6만원'],
              ['6등급', '312만원', '70,200원', '187.2만원'],
              ['7등급', '338만원', '76,050원', '202.8만원'],
            ]}
            highlightCol={3}
          />

          <TipBox title="1인 자영업자는 보험료 50~80% 환급받을 수 있어요">
            소상공인시장진흥공단에서 1인 자영업자 고용보험료를 최대 5년간 지원해요. 1등급 기준이면 월 보험료 40,950원 중 최대 80%인 32,760원을 돌려받을 수 있어요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '계산',
        title: '등급별 보험료를 알았으니, 실제 수급 금액도 정리했어요',
        desc: '기준보수 등급별 구직급여일액 계산법과 수급기간을 정리했어요.',
        icon: 'calc',
      },
    },

    {
      id: 's3',
      number: 'SECTION 03',
      heading: '자영업자 실업급여 금액은 얼마나 되나요?',
      subtitle: '기준보수 x 60% / 30일 = 구직급여일액',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            가입 등급을 골랐으면, 실제로 받는 금액이 중요하잖아요. 자영업자 구직급여는 <strong>기준보수의 60%</strong>를 일액으로 환산해서 지급해요. 직장인과 달리 하한액 적용이 다르니 등급 선택이 중요해요.
          </p>

          <FormulaBox
            lines={[
              { text: '구직급여일액 계산', comment: true },
              { text: '구직급여일액 = 기준보수 x 60% / 30일' },
            ]}
          />

          <SpokeRateBars
            bars={[
              { label: '1등급', rate: '일 36,400원', width: '28%' },
              { label: '3등급', rate: '일 46,800원', width: '45%' },
              { label: '5등급', rate: '일 57,200원', width: '65%' },
              { label: '7등급', rate: '일 67,600원', width: '100%' },
            ]}
          />

          <SpokeChecklist
            items={[
              { text: '7등급 선택 시 일 67,600원, 월 약 203만원 수령', done: true, note: '월 보험료 76,050원으로 가장 높은 급여' },
              { text: '1등급 선택 시 일 36,400원, 월 약 109만원 수령', done: true, note: '월 보험료 40,950원으로 부담 최소' },
              { text: '피보험기간 1~3년이면 120일, 10년 이상이면 210일', done: true, note: '총 수급액 = 일액 x 소정급여일수' },
              { text: '퇴직 다음 날부터 12개월 이내에 수급 완료해야', done: false, note: '12개월 지나면 남은 일수도 소멸' },
            ]}
          />

          <SpokeTable
            id="tbl-period"
            title="피보험기간별 소정급여일수"
            subtitle="자영업자는 나이 구분 없이 피보험기간만 적용"
            headers={['피보험기간', '1~3년 미만', '3~5년 미만', '5~10년 미만', '10년 이상']}
            rows={[
              ['소정급여일수', '120일', '150일', '180일', '210일'],
              ['7등급 총 수급액', '약 811만원', '약 1,014만원', '약 1,217만원', '약 1,420만원'],
            ]}
            highlightCol={4}
          />

          <TipBox title="재창업해도 조기재취업수당을 받을 수 있어요">
            폐업 후 재취업뿐 아니라 <a href="/w/실업급여-금액-계산-연봉별-수령액" className="text-[#4A7AB5] underline">재창업</a>을 해도 잔여 급여일수의 50%를 일시금으로 받을 수 있어요. 소정급여일수의 절반 이상이 남아 있어야 해요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '신청',
        title: '서류 준비가 핵심이기 때문에 신청 절차를 미리 알아둬야 해요',
        desc: '폐업 신고부터 고용센터 방문까지 4단계 절차를 정리했어요.',
        icon: 'check',
      },
    },

    {
      id: 's4',
      number: 'SECTION 04',
      heading: '자영업자 실업급여 신청은 어떻게 하나요?',
      subtitle: '폐업 신고 → 수급자격 인정 → 구직활동 → 급여 수령',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            폐업을 결심했다면 신청 순서를 미리 알아두는 게 좋아요. 직장인처럼 이직확인서가 필요한 건 아니지만, 매출 감소 증빙 서류를 준비해야 해요. 절차가 복잡해 보이지만 4단계만 기억하면 돼요.
          </p>

          <SpokeTimeline
            events={[
              { month: 'STEP 1', title: '사업장 폐업 신고', desc: '관할 세무서에 폐업 신고서 제출. 국세청 홈택스에서 온라인 신고도 가능해요', status: 'current' },
              { month: 'STEP 2', title: '수급자격 인정 신청', desc: '거주지 관할 고용센터에 방문해서 자영업자 수급자격 인정신청서 제출', status: 'normal' },
              { month: 'STEP 3', title: '수급자격 심사 (약 14일)', desc: '고용센터에서 폐업 사유, 피보험기간, 보험료 체납 여부 등을 확인해요', status: 'normal' },
              { month: 'STEP 4', title: '구직급여 수급 시작', desc: '수급자격 인정 후 1~4주 단위로 구직활동 인정받고 급여를 수령해요', status: 'normal' },
            ]}
          />

          <SpokeTable
            id="tbl-docs"
            title="수급자격 인정 신청 시 필요 서류"
            subtitle="고용센터 방문 시 지참 / 매출 증빙은 1가지 이상 필수"
            headers={['서류', '용도']}
            rows={[
              ['자영업자 수급자격 인정신청서', '고용센터 양식 작성'],
              ['폐업사실증명원', '세무서 발급 (폐업 확인용)'],
              ['매출총계정원장', '매출 감소 증빙 (6개월 적자 등)'],
              ['부가가치세 과세표준증명', '전년 대비 매출 20% 감소 증빙'],
              ['표준손익계산서', '적자 지속 사실 확인용'],
              ['신분증 + 통장사본', '급여 수령 계좌 등록용'],
            ]}
          />

          <Chips
            items={[
              { icon: '📞', label: '고용센터 대표', value: '1350', href: 'tel:1350' },
              { icon: '🏢', label: '근로복지공단', value: '1588-0075' },
              { icon: '💻', label: '온라인 신고', value: '홈택스' },
              { icon: '📋', label: '고용보험', value: 'ei.go.kr' },
            ]}
          />

          <WarnBox>
            <strong>보험료 체납 주의:</strong> 고용보험료를 3회 이상 체납하면 실업급여 수급이 제한될 수 있어요. 체납 보험료를 완납한 후에 신청해야 정상 수급이 가능해요.
          </WarnBox>
        </>
      ),
      bridgeCTA: {
        href: '/w/실업급여-퇴사유형별-수급-자격-권고사직-자진퇴사-해고',
        badge: '전체 비교',
        title: '다른 퇴사유형의 실업급여 조건도 비교해 보세요',
        desc: '권고사직, 자진퇴사, 해고, 계약만료 등 유형별 수급 자격을 한눈에 정리했어요.',
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
    { question: '자영업자 고용보험 가입 후 바로 폐업하면 실업급여를 받나요?', answer: '<strong>아니요.</strong> 폐업일 이전 24개월 중 자영업자 고용보험 가입기간이 1년(12개월) 이상이어야 해요. 가입 직후 폐업하면 수급 자격이 없어요.' },
    { question: '자영업자 고용보험 등급은 나중에 바꿀 수 있나요?', answer: '<strong>네.</strong> 매년 기준보수 등급을 변경할 수 있어요. 근로복지공단이나 고용산재보험 토탈서비스에서 변경 신고가 가능해요. 다만 변경 후 1년 이상 유지해야 해당 등급으로 급여가 산정돼요.' },
    { question: '직장인이었다가 자영업자로 전환하면 피보험기간이 합산되나요?', answer: '근로자 피보험기간과 자영업자 피보험기간은 <strong>합산되지 않아요</strong>. 자영업자 실업급여는 자영업자 고용보험 가입기간만 따지기 때문에, 자영업자로 전환 후 최소 1년 이상 보험료를 납부해야 해요.' },
    { question: '폐업 후 다시 창업하면 조기재취업수당을 받을 수 있나요?', answer: '<strong>네.</strong> 폐업 후 재창업도 조기재취업수당 대상이에요. 소정급여일수의 절반 이상이 남은 상태에서 12개월 이상 사업을 유지하면, 잔여 급여일수의 50%를 일시금으로 받아요.' },
    { question: '자영업자 실업급여에도 구직활동을 해야 하나요?', answer: '<strong>네.</strong> 1~4주마다 고용센터에 출석해서 구직활동 내역을 보고해야 해요. 재취업뿐 아니라 재창업 준비(사업계획서 작성, 창업 교육 수강 등)도 구직활동으로 인정돼요.' },
  ],

  relatedSpokes: [
    { badge: '예술인', title: '예술인·노무제공자 실업급여 고용보험 조건', desc: '피보험기간 9개월로 수급 가능한 특례', href: '/w/예술인-노무제공자-특고-실업급여-고용보험-조건' },
    { badge: '금액', title: '실업급여 금액 계산 연봉별 수령액', desc: '일 상한 68,100원, 하한 63,104원 기준', href: '/w/실업급여-금액-계산-연봉별-수령액' },
    { badge: '해고', title: '해고·부당해고·징계해고 실업급여', desc: '해고예고수당과 실업급여 관계', href: '/w/해고-부당해고-징계해고-실업급여-해고예고수당' },
    { badge: '권고', title: '권고사직 실업급여 수급 조건과 절차', desc: '합의서 작성부터 신청까지', href: '/w/권고사직-실업급여-수급-조건-절차-합의서' },
  ],

  sources: [
    { name: '고용보험법', url: 'https://www.law.go.kr/법령/고용보험법', org: '법제처' },
    { name: '자영업자 고용보험 안내', url: 'https://www.comwel.or.kr/comwel/paym/ownr/insu.jsp', org: '근로복지공단' },
    { name: '실업급여 안내', url: 'https://www.ei.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePb0201Info.do', org: '고용보험' },
    { name: '고용노동부 FAQ', url: 'https://www.moel.go.kr', org: '고용노동부' },
  ],
}

export default data
