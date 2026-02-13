import type { SpokeData } from '@/data/spoke/types'
import {
  SpokeTable,
  FormulaBox,
  TipBox,
  SpokeRateBars,
  SpokeChecklist,
  SpokeCompareCards,
  SpokeTimeline,
  SpokeFlow,
  SpokeLinks,
} from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '연장급여-훈련연장-개별연장-특별연장-조건-비교',

  meta: {
    title: '연장급여 훈련연장 개별연장 특별연장 조건 비교 | 실업급여 연장 3종류 정리',
    description: '실업급여 연장급여 3종류의 조건과 급여액 차이를 비교해요. 훈련연장은 100% 최대 2년, 개별연장은 70% 최대 60일이에요.',
    keywords: [
      '연장급여 훈련연장 개별연장 비교',
      '실업급여 연장급여 조건 기준',
      '특별연장급여 지정 기준',
      '연장급여 급여액 지급기간',
    ],
    ogTitle: '연장급여 훈련연장 개별연장 특별연장 조건 비교 | 머니위키',
    ogDescription: '실업급여 끝나도 최대 2년 더 받아요. 연장급여 3종류 비교.',
  },

  hub: {
    url: '/w/실업급여-취업촉진수당-연장급여-부정수급-2026',
    name: '실업급여 취업촉진수당 연장급여 부정수급 2026 총정리',
  },

  breadcrumb: ['고용보험', '실업급여', '연장급여 비교'],

  hero: {
    badge: '2026년 기준',
    h1: (
      <>
        실업급여 <span className="text-[#1E3A5F]">연장급여 3종류</span> 훈련연장 개별연장 특별연장 조건 비교
      </>
    ),
    intro: (
      <p className="text-base text-neutral-500 leading-relaxed">
        구직급여가 끝났는데 아직 취업이 안 됐다면 연장급여를 받을 수 있어요. 훈련연장은 구직급여일액의 <strong>100%를 최대 2년</strong>, 개별연장과 특별연장은 <strong>70%를 최대 60일</strong> 받을 수 있는데요. <a href="/w/실업급여-취업촉진수당-연장급여-부정수급-2026" className="text-[#4A7AB5] underline">실업급여 전체 제도</a>와 함께 연장급여의 조건과 급여액 차이를 먼저 비교해 볼게요.
      </p>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '실업급여 취업촉진수당, 연장급여, 부정수급 제재 총정리',
    },
  },

  summary3: [
    <>훈련연장급여: 고용센터 훈련 지시 시 구직급여일액의 <strong>100%</strong>, 최대 <strong>2년</strong></>,
    <>개별연장급여: 재취업 곤란 + 생활 어려운 경우 구직급여일액의 <strong>70%</strong>, 최대 <strong>60일</strong></>,
    <>특별연장급여: 실업률 급증 등 경제 위기 시 고용노동부 장관 고시, <strong>70%</strong> 최대 <strong>60일</strong></>,
  ],

  sourceBar: {
    badge: '출처',
    name: '고용보험법 제51~53조 / 고용노동부',
    date: '2026.02',
  },

  prevNext: {
    prev: { title: '조기재취업수당 신청 조건 금액 계산', href: '/w/조기재취업수당-신청-조건-금액-잔여일수-계산' },
    next: { title: '광역구직활동비 이주비 직업능력개발수당', href: '/w/광역구직활동비-이주비-직업능력개발수당-신청' },
  },

  stickyBar: {
    topLabel: '훈련연장급여',
    value: '100% / 최대 2년',
    buttonText: '3종류 비교 보기 →',
    scrollTo: '#s1',
  },

  toc: [
    { id: 's1', label: '연장급여 훈련연장 개별연장 특별연장 비교는 어떻게 되나요?' },
    { id: 's2', label: '실업급여 연장급여 조건과 급여액 기준은 뭔가요?' },
    { id: 's3', label: '특별연장급여는 어떤 기준으로 지정되나요?' },
    { id: 's4', label: '연장급여 급여액과 지급기간은 얼마나 되나요?' },
    { id: 's-faq', label: '자주 묻는 질문' },
  ],

  sections: [
    // ═══ SECTION 01: 3종류 비교 총정리 ═══
    {
      id: 's1',
      number: 'SECTION 01',
      heading: '연장급여 훈련연장 개별연장 특별연장 비교는 어떻게 되나요?',
      subtitle: '종류별 조건·급여율·기간을 한눈에 비교해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            연장급여는 구직급여 소정급여일수가 끝난 뒤에도 추가로 받을 수 있는 급여예요. 크게 <strong>훈련연장·개별연장·특별연장</strong> 3종류가 있고, 각각 조건과 급여율이 달라요. 3종류는 중복 수급이 안 되고 훈련연장 → 개별연장 → 특별연장 순서로 지급돼요.
          </p>

          <SpokeTable
            id="tbl-compare"
            title="연장급여 3종류 핵심 비교"
            subtitle="고용보험법 제51~53조 기준"
            headers={['구분', '훈련연장급여', '개별연장급여', '특별연장급여']}
            rows={[
              ['급여율', '구직급여일액 100%', '구직급여일액 70%', '구직급여일액 70%'],
              ['최대 기간', '2년', '60일', '60일'],
              ['발동 주체', '고용센터장 지시', '개인 신청', '고용노동부 장관 고시'],
              ['핵심 조건', '직업훈련 수강', '재취업 곤란 + 생활 곤란', '실업률 급증 등 경제 위기'],
              ['중복 수급', '불가 (순서대로)', '불가 (순서대로)', '불가 (순서대로)'],
            ]}
            highlightCol={1}
          />

          <FormulaBox
            lines={[
              { text: '연장급여 지급 순서', comment: true },
              { text: '훈련연장 → 개별연장 → 특별연장 (중복 불가)' },
            ]}
          />

          <TipBox title="훈련연장급여가 가장 유리해요">
            급여율 100%에 기간도 최대 2년이라 혜택이 가장 커요. 고용센터에서 훈련을 지시받을 수 있는지 먼저 상담해 보세요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '조건',
        title: '내가 어떤 연장급여를 받을 수 있을까?',
        desc: '종류별 세부 조건과 재산·소득 기준을 확인해요.',
        icon: 'check',
      },
    },

    // ═══ SECTION 02: 연장급여 조건 기준 ═══
    {
      id: 's2',
      number: 'SECTION 02',
      heading: '실업급여 연장급여 조건과 급여액 기준은 뭔가요?',
      subtitle: '훈련연장은 훈련 출석 80%, 개별연장은 재산·소득 심사',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            구직급여가 끝나면 자동으로 연장되는 게 아니라 각각 다른 요건을 충족해야 해요. 특히 개별연장급여는 소득·재산 요건이 까다로운 편이에요.
          </p>

          <SpokeRateBars
            bars={[
              { label: '훈련연장', rate: '100%', width: '100%' },
              { label: '개별연장', rate: '70%', width: '70%' },
              { label: '특별연장', rate: '70%', width: '70%' },
            ]}
          />

          <SpokeChecklist
            items={[
              { text: '훈련연장: 고용센터장이 직업훈련 수강을 지시한 경우', done: true, note: '출석률 80% 이상 유지 필수' },
              { text: '훈련연장: 기술자격증이 없거나 해당 기술 수요가 감소한 경우', done: true },
              { text: '훈련연장: 고용센터 직업소개에 3회 이상 응했으나 미취업', done: true },
              { text: '개별연장: 급여기초임금일액 88,000원 이하', done: false, note: '고소득자는 대상 제외' },
              { text: '개별연장: 부양가족 1명 이상 (18세 미만·65세 이상·장애인 등)', done: false },
              { text: '개별연장: 주택 소유 시 재산세 과세액 합계 16만원 이하', done: false },
              { text: '개별연장: 주택 미소유 시 재산합계액 2억 4천만원 이하', done: false },
            ]}
          />

          <TipBox title="개별연장급여 재산 기준이 완화됐어요">
            주택이 없으면 재산합계액 2억 4천만원까지 인정돼요. 전세보증금이 있더라도 기준 이하라면 신청할 수 있어요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '경제위기',
        title: '특별연장급여는 어떤 상황에서 발동되나요?',
        desc: '실업률 6% 초과 등 구체적인 고시 기준을 확인해요.',
        icon: 'info',
      },
    },

    // ═══ SECTION 03: 특별연장급여 기준 ═══
    {
      id: 's3',
      number: 'SECTION 03',
      heading: '특별연장급여는 어떤 기준으로 지정되나요?',
      subtitle: '실업률 6% 초과 등 경제 위기 시 고용노동부 장관이 결정해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            훈련연장이나 개별연장은 개인이 조건을 갖추면 신청하는 방식인데요. 특별연장급여는 성격이 좀 달라요. 경제 전체가 어려워져서 실업자가 급증할 때 고용노동부 장관이 기간을 정해서 일괄 시행하는 거예요.
          </p>

          <SpokeCompareCards
            cards={[
              {
                title: '개인 신청형',
                subtitle: '훈련연장 + 개별연장',
                items: [
                  '본인이 직접 요건 충족 후 신청',
                  '고용센터에서 개별 심사',
                  '상시 운영 (경기와 무관)',
                  '훈련연장: 2년 / 개별연장: 60일',
                ],
              },
              {
                title: '정부 발동형',
                subtitle: '특별연장급여',
                items: [
                  '고용노동부 장관이 기간 지정',
                  '고용정책심의회 의결 필요',
                  '경제 위기 시에만 한시 운영',
                  '최대 60일, 구직급여의 70%',
                ],
                recommended: true,
                recLabel: '비상 제도',
              },
            ]}
          />

          <SpokeTable
            id="tbl-special-trigger"
            title="특별연장급여 발동 요건 (4가지 중 1개)"
            subtitle="고용보험법 제52조 / 고용보험법 시행령"
            headers={['요건', '기준', '기간']}
            rows={[
              ['구직급여 지급자 비율', '피보험자 대비 3% 초과', '연속 3개월'],
              ['수급자격신청률', '피보험자 대비 1% 초과', '연속 3개월'],
              ['실업률', '6% 초과', '연속 3개월'],
              ['고용정책심의회 의결', '필요하다고 인정', '수시'],
            ]}
          />

          <TipBox title="특별연장급여 제외 대상도 있어요">
            이직 시 급여기초임금일액 상한액의 730일분(약 24개월분) 이상을 받은 고소득자는 특별연장급여 대상에서 제외돼요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '급여액',
        title: '연장급여를 받으면 실제로 얼마를 받나요?',
        desc: '종류별 급여 계산과 수급 타임라인을 확인해요.',
        icon: 'calc',
      },
    },

    // ═══ SECTION 04: 급여액과 지급 타임라인 ═══
    {
      id: 's4',
      number: 'SECTION 04',
      heading: '연장급여 급여액과 지급기간은 얼마나 되나요?',
      subtitle: '훈련연장 100% 최대 2년, 개별·특별 70% 최대 60일',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            연장급여를 받는 동안에도 <a href="/w/실업급여-수급기간-소정급여일수-기준" className="text-[#4A7AB5] underline">실업인정</a>을 받아야 해요. 4주마다 고용센터에 출석해서 구직활동을 증명해야 하는 건 기본 구직급여와 같아요.
          </p>

          <SpokeTimeline
            events={[
              { month: '0~120일', title: '기본 구직급여 수급', desc: '소정급여일수만큼 구직급여일액 100% 지급', status: 'current' },
              { month: '소정급여일수 종료 후', title: '훈련연장급여 (해당자)', desc: '직업훈련 수강 시 100%로 최대 2년 연장' },
              { month: '훈련연장 종료 후', title: '개별연장급여 (해당자)', desc: '재취업 곤란 + 생활 곤란 시 70%로 60일' },
              { month: '개별연장 종료 후', title: '특별연장급여 (고시 기간)', desc: '경제 위기 시 70%로 60일 추가', status: 'warning' },
            ]}
          />

          <SpokeFlow
            steps={[
              { icon: '📋', label: '구직급여 종료', sub: '소정급여일수 만료' },
              { icon: '🎓', label: '훈련연장', sub: '100% / 최대 2년' },
              { icon: '📝', label: '개별연장', sub: '70% / 최대 60일' },
              { icon: '🚨', label: '특별연장', sub: '70% / 최대 60일' },
            ]}
          />

          <FormulaBox
            lines={[
              { text: '연장급여 일별 급여액 계산', comment: true },
              { text: '훈련연장 = 구직급여일액 x 100%' },
              { text: '개별·특별연장 = 구직급여일액 x 70%' },
            ]}
          />

          <SpokeLinks
            title="연장급여 관련 글 더보기"
            items={[
              { num: '01', heading: '조기재취업수당 조건과 금액 계산', desc: '빨리 취업하면 남은 급여의 절반을 받아요', href: '/w/조기재취업수당-신청-조건-금액-잔여일수-계산' },
              { num: '02', heading: '실업급여 수급기간과 소정급여일수', desc: '나이와 근속기간에 따라 120~270일 달라요', href: '/w/실업급여-수급기간-소정급여일수-기준' },
            ]}
          />
        </>
      ),
      bridgeCTA: {
        href: '/w/실업급여-취업촉진수당-연장급여-부정수급-2026',
        badge: '허브',
        title: '실업급여 전체 제도를 한눈에 보고 싶다면?',
        desc: '취업촉진수당, 연장급여, 부정수급 제재까지 총정리.',
        icon: 'grid',
        primary: true,
      },
    },

    // ═══ FAQ ═══
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
      question: '연장급여 3종류를 동시에 받을 수 있나요?',
      answer: '<strong>아니요.</strong> 훈련연장·개별연장·특별연장은 중복 수급이 안 돼요. 훈련연장이 끝나야 개별연장을, 개별연장이 끝나야 특별연장을 받을 수 있어요.',
    },
    {
      question: '연장급여를 받는 동안에도 실업인정을 해야 하나요?',
      answer: '<strong>네.</strong> 연장급여 기간에도 4주마다 고용센터에 출석해서 실업인정을 받아야 해요. 구직활동 실적도 기본 구직급여와 동일하게 제출해야 해요.',
    },
    {
      question: '훈련연장급여 수강 중에 취업하면 어떻게 되나요?',
      answer: '취업하면 연장급여 지급이 중단돼요. 다만 <a href="/w/조기재취업수당-신청-조건-금액-잔여일수-계산">조기재취업수당</a> 요건을 충족하면 별도로 수당을 받을 수도 있어요.',
    },
    {
      question: '특별연장급여는 2026년에 시행 중인가요?',
      answer: '2026년 2월 기준으로 특별연장급여 고시가 발동된 상태는 아니에요. 특별연장급여는 실업률이 6%를 3개월 연속 초과하는 등 경제 위기 때만 시행돼요.',
    },
  ],

  relatedSpokes: [
    { badge: '조기', title: '조기재취업수당 신청 조건 금액 잔여일수 계산', desc: '빨리 취업하면 남은 급여의 절반을 받아요', href: '/w/조기재취업수당-신청-조건-금액-잔여일수-계산' },
    { badge: '수급기간', title: '실업급여 수급기간 소정급여일수 기준', desc: '나이와 근속기간별 120~270일 차이 비교', href: '/w/실업급여-수급기간-소정급여일수-기준' },
    { badge: '부가', title: '광역구직활동비 이주비 직업능력개발수당 신청', desc: '면접 교통비·이사비·훈련비 지원 안내', href: '/w/광역구직활동비-이주비-직업능력개발수당-신청' },
  ],

  sources: [
    { name: '고용보험법 제51~53조 (연장급여)', url: 'https://www.law.go.kr/법령/고용보험법', org: '법제처' },
    { name: '실업급여 연장급여 안내', url: 'https://www.ei.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePb0201Info.do', org: '고용보험' },
    { name: '찾기쉬운 생활법령정보 - 구직급여 연장', url: 'https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=722&ccfNo=2&cciNo=4&cnpClsNo=1', org: '법제처' },
  ],
}

export default data
