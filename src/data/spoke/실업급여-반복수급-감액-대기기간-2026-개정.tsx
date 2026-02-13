import type { SpokeData } from '@/data/spoke/types'
import {
  SpokeTable, FormulaBox, TipBox, WarnBox,
  Chips, SpokeLinks,
  SpokeTimeline, SpokeCompareCards,
  SpokeRateBars, SpokeChecklist, SpokeWarnBox,
} from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '실업급여-반복수급-감액-대기기간-2026-개정',

  meta: {
    title: '실업급여 반복수급 감액 기준 대기기간 연장 | 2026 개정 총정리',
    description: '5년간 3회 이상 받으면 실업급여가 최대 50% 감액돼요. 반복수급 감액 기준과 대기기간 4주 연장, 예외 대상까지 정리했어요.',
    keywords: [
      '실업급여 반복수급 감액 기준',
      '실업급여 반복수급 대기기간 연장',
      '실업급여 반복수급 2026 개정',
      '실업급여 5년간 3회 수급 감액',
    ],
    ogTitle: '실업급여 반복수급 감액 기준과 대기기간 2026 개정 | 머니위키',
    ogDescription: '5년간 3회 이상 받으면 최대 50% 감액. 대기기간 4주 연장까지 확인하세요.',
  },

  hub: {
    url: '/w/실업급여-취업촉진수당-연장급여-부정수급-2026',
    name: '실업급여 취업촉진수당·연장급여·부정수급 2026 총정리',
  },

  breadcrumb: ['고용·노동', '실업급여', '반복수급 감액'],

  summary3: [
    <>5년간 <strong>3회 이상</strong> 실업급여를 받으면 반복수급자로 분류돼요</>,
    <>감액률은 3회 10% → 4회 25% → 5회 40% → 6회 이상 <strong>최대 50%</strong></>,
    <>대기기간도 기본 7일에서 <strong>최대 4주</strong>로 늘어나요</>,
  ],

  sourceBar: {
    badge: '출처',
    name: '고용보험법 개정안·고용노동부',
    date: '2026.01',
  },

  prevNext: {
    prev: { title: '실업급여 부정수급 유형 제재 벌금 추징', href: '/w/실업급여-부정수급-유형-제재-벌금-추징' },
    next: { title: '임신 출산 육아 실업급여 수급기간 연장', href: '/w/임신-출산-육아-실업급여-수급기간-연장-특례' },
  },

  stickyBar: {
    topLabel: '반복수급 최대 감액',
    value: '50%',
    buttonText: '감액 기준 확인 →',
    scrollTo: '#s1',
  },

  hero: {
    badge: '2026년 개정',
    h1: (
      <>
        실업급여 <span className="text-[#1E3A5F]">반복수급 감액</span> 기준과 대기기간 2026 개정
      </>
    ),
    intro: (
      <p className="text-base text-neutral-500 leading-relaxed">
        퇴사를 반복하면서 실업급여를 여러 번 받으면 불이익이 생겨요. 5년 안에 3번째 수급부터는 급여가 <strong>10~50%</strong> 깎이고, 대기기간도 <strong>최대 4주</strong>까지 늘어나요. <a href="/w/실업급여-취업촉진수당-연장급여-부정수급-2026" className="text-[#4A7AB5] underline">실업급여 전체 가이드</a>에서 부정수급 제재와 함께 확인할 수 있어요. 먼저 반복수급의 정확한 기준부터 볼게요.
      </p>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '실업급여 취업촉진수당·연장급여·부정수급 2026 총정리',
    },
  },

  toc: [
    { id: 's1', label: '실업급여 반복수급 감액 기준은 어떻게 되나요?' },
    { id: 's2', label: '실업급여 반복수급 대기기간은 얼마나 연장되나요?' },
    { id: 's3', label: '실업급여 반복수급 2026 개정에서 뭐가 달라졌나요?' },
    { id: 's4', label: '실업급여 5년간 3회 수급 감액 예외는 없나요?' },
    { id: 's-faq', label: '자주 묻는 질문' },
  ],

  sections: [
    // ═══ S1: SpokeWarnBox + SpokeTable ═══
    {
      id: 's1',
      number: 'SECTION 01',
      heading: '실업급여 반복수급 감액 기준은 어떻게 되나요?',
      subtitle: '5년 안에 3번 받으면 10%부터 깎여요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            반복수급이란 <strong>이직일 기준으로 과거 5년</strong>을 역산해서, 그 기간 안에 구직급여를 3회 이상 받은 경우를 말해요. <a href="/w/실업급여-부정수급-유형-제재-벌금-추징" className="text-[#4A7AB5] underline">부정수급</a>과는 다르게 합법적 수급이지만 감액 불이익이 있어요. 세 번째 수급부터 감액이 시작되고, 횟수가 늘어날수록 깎이는 비율이 커져요.
          </p>

          <SpokeWarnBox title="반복수급 감액은 생각보다 타격이 커요">
            <p className="leading-relaxed">
              구직급여 일 상한액이 <strong>68,100원</strong>인데, 6회째 수급 시 50% 감액이면 <strong>34,050원</strong>밖에 못 받아요. 월 기준으로 약 <strong>102만 원</strong>에서 약 <strong>51만 원</strong>으로 줄어드는 셈이에요.
            </p>
          </SpokeWarnBox>

          <SpokeTable
            id="tbl-reduction"
            title="반복수급 횟수별 감액률"
            subtitle="고용보험법 개정안 기준 / 5년간 수급 횟수 기준"
            headers={['수급 횟수', '3회', '4회', '5회', '6회 이상']}
            rows={[
              ['감액률', '10%', '25%', '40%', '50%'],
              ['일 상한액 기준', '61,290원', '51,075원', '40,860원', '34,050원'],
              ['월 환산(30일)', '약 184만원', '약 153만원', '약 123만원', '약 102만원'],
            ]}
            highlightCol={4}
          />

          <TipBox title="감액은 구직급여에만 적용돼요">
            조기재취업수당, 광역구직활동비, 직업능력개발수당 같은 취업촉진수당에는 감액이 적용되지 않아요. 구직급여(실업급여 본체)만 해당해요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '대기기간',
        title: '감액만 있는 게 아니라 대기기간도 늘어나요',
        desc: '기존 7일에서 최대 4주까지 연장되는 대기기간을 확인해 보세요.',
        icon: 'clock',
      },
    },

    // ═══ S2: SpokeCompareCards + FormulaBox ═══
    {
      id: 's2',
      number: 'SECTION 02',
      heading: '실업급여 반복수급 대기기간은 얼마나 연장되나요?',
      subtitle: '기존 7일에서 최대 4주로 늘어나요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            실업급여는 원래 퇴사 후 바로 받는 게 아니에요. <strong>대기기간 7일</strong>을 지나야 지급이 시작되죠. 그런데 반복수급자는 이 대기기간이 2주~4주까지 늘어날 수 있어요.
          </p>

          <SpokeCompareCards
            cards={[
              {
                title: '일반 수급자',
                subtitle: '5년간 1~2회 수급',
                items: ['대기기간 7일(1주)', '감액 없이 전액 지급', '정상 소정급여일수 적용'],
                recommended: false,
              },
              {
                title: '반복수급자 (3회~)',
                subtitle: '5년간 3회 이상 수급',
                items: ['대기기간 최대 4주(28일)', '수급 횟수별 10~50% 감액', '실제 수령 시작이 3주 늦어질 수 있음'],
                recommended: false,
              },
            ]}
          />

          <FormulaBox
            lines={[
              { text: '실제 수령 시점 계산', comment: true },
              { text: '첫 지급일 = 실업신고일 + 대기기간 + 실업인정일' },
            ]}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            대기기간이 4주로 늘어나면 첫 실업인정일까지 합쳐서 <strong>최대 5~6주</strong> 뒤에야 첫 급여를 받을 수 있어요. 일반 수급자보다 약 3주나 늦는 거예요. 그 사이 생활비가 빠듯할 수 있으니 미리 대비가 필요해요.
          </p>

          <TipBox title="대기기간 동안에는 구직활동을 안 해도 되나요?">
            아니에요. 대기기간에도 고용센터 출석 의무는 그대로예요. 다만 이 기간의 실업인정은 급여 지급과 무관하게 처리돼요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '2026 개정',
        title: '2026년에 구체적으로 뭐가 바뀌었는지 궁금하시죠?',
        desc: '개정 전후 비교와 시행 시기까지 정리했어요.',
        icon: 'info',
      },
    },

    // ═══ S3: SpokeRateBars + SpokeChecklist ═══
    {
      id: 's3',
      number: 'SECTION 03',
      heading: '실업급여 반복수급 2026 개정에서 뭐가 달라졌나요?',
      subtitle: '감액·대기기간·예외 규정이 동시에 강화됐어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            반복수급 규제는 2024년 고용보험법 시행령 개정으로 법적 근거가 마련됐어요. 이전에도 논의는 있었지만, 21대 국회 임기 만료로 폐기된 뒤 22대 국회에서 재추진돼요.
          </p>

          <SpokeRateBars
            bars={[
              { label: '3회째', rate: '10%', width: '20%' },
              { label: '4회째', rate: '25%', width: '40%' },
              { label: '5회째', rate: '40%', width: '65%' },
              { label: '6회 이상', rate: '50%', width: '80%' },
            ]}
          />

          <SpokeChecklist
            items={[
              { text: '5년간 3회 이상 수급 시 감액 적용', done: true, note: '이직일 기준 역산 5년' },
              { text: '대기기간 7일 → 최대 4주 연장', done: true, note: '반복수급자·자발적 이직 후 일시 취업자' },
              { text: '저임금·일용직 등 노동약자 예외', done: true, note: '반복수급 횟수에서 제외' },
              { text: '법 시행 이후 수급분부터 횟수 산정', done: true, note: '소급 적용 없음' },
              { text: '시행령에 세부 감액률 위임', done: false, note: '국무회의 의결 후 확정 예정' },
            ]}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            핵심은 <strong>소급 적용이 없다</strong>는 점이에요. 법 시행 전에 받은 실업급여는 횟수에 포함되지 않아요. 시행일 이후 첫 수급부터 1회로 카운트되니까, 지금까지 여러 번 받았더라도 당장 감액되는 건 아니에요.
          </p>

          <WarnBox>
            <strong>주의:</strong> 법 시행일은 국회 통과 후 6개월 뒤예요. 아직 정확한 시행일이 확정되지 않았으므로, <a href="https://www.ei.go.kr" target="_blank" rel="noopener noreferrer" className="text-amber-700 underline">고용보험 사이트</a>에서 최신 정보를 확인하세요.
          </WarnBox>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '예외',
        title: '나도 반복수급자에 해당되는 건 아닌지 걱정되시죠?',
        desc: '감액 예외 대상과 횟수 제외 사유를 확인해 보세요.',
        icon: 'check',
      },
    },

    // ═══ S4: SpokeTimeline + Chips ═══
    {
      id: 's4',
      number: 'SECTION 04',
      heading: '실업급여 5년간 3회 수급 감액 예외는 없나요?',
      subtitle: '일용직·저임금 근로자 등은 횟수에서 빠져요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            모든 반복수급자에게 일괄 감액하는 건 아니에요. 노동시장에서 불안정한 위치에 있는 분들은 <strong>반복수급 횟수 산정에서 제외</strong>돼요. 어떤 경우가 해당되는지 알아두면 불필요한 걱정을 줄일 수 있어요.
          </p>

          <Chips
            items={[
              { icon: '👷', label: '일용직', value: '횟수 제외' },
              { icon: '💰', label: '저임금', value: '횟수 제외' },
              { icon: '🔄', label: '적극 구직', value: '횟수 제외' },
              { icon: '⚠️', label: '일반 퇴사', value: '횟수 포함' },
            ]}
          />

          <SpokeTimeline
            events={[
              { month: '2024.05', title: '21대 국회 임기 만료로 기존 개정안 폐기', desc: '반복수급 규제 논의가 처음 시작된 건 2020년대 초반이에요' },
              { month: '2024.07', title: '22대 국회에서 고용보험법 개정안 재추진', desc: '국무회의에서 8건 개정안 심의·의결' },
              { month: '2025~', title: '국회 상임위·본회의 심의 진행', desc: '세부 감액률은 시행령으로 위임, 국무회의 확정 예정', status: 'current' },
              { month: '시행 후', title: '시행일 이후 수급부터 횟수 산정 시작', desc: '과거 수급 이력은 횟수에 미포함, 소급 적용 없음' },
            ]}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            정리하면, <strong>건설 일용근로자</strong>처럼 고용 불안정이 구조적인 직종이나, <strong>최저임금 수준 근로자</strong>는 반복수급을 해도 감액 대상이 아니에요. 반면 정규직에서 자발적으로 퇴사한 뒤 반복 수급하는 패턴은 감액 대상이에요.
          </p>

          <SpokeLinks
            title="관련 글 더 보기"
            items={[
              { num: '01', heading: '실업급여 부정수급 유형과 5배 추징금', desc: '고의 부정수급 시 형사처벌까지', href: '/w/실업급여-부정수급-유형-제재-벌금-추징' },
              { num: '02', heading: '2026 실업급여 상한액·하한액 인상 변경', desc: '일 68,100원 상한, 63,104원 하한', href: '/w/실업급여-2026-개정-상한액-하한액-인상-변경' },
            ]}
          />
        </>
      ),
      bridgeCTA: {
        href: '/w/실업급여-취업촉진수당-연장급여-부정수급-2026',
        badge: '허브',
        title: '실업급여 전체 제도를 한눈에 보고 싶다면?',
        desc: '취업촉진수당, 연장급여, 부정수급 제재까지 2026년 기준 총정리.',
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
      question: '실업급여 반복수급 감액은 언제부터 적용되나요?',
      answer: '법 시행일 이후 수급하는 분부터 횟수가 산정돼요. 시행 전에 받은 실업급여는 횟수에 포함되지 않아서, <strong>소급 적용은 없어요</strong>.',
    },
    {
      question: '반복수급 횟수 5년은 어떻게 계산하나요?',
      answer: '<strong>이직일(퇴사일) 기준으로 과거 5년</strong>을 역산해요. 예를 들어 2026년 6월에 퇴사했다면, 2021년 6월부터 2026년 6월까지 받은 횟수를 세요.',
    },
    {
      question: '일용직인데 반복수급하면 감액되나요?',
      answer: '아니에요. <strong>일용근로자로서 수급한 경우</strong>는 반복수급 횟수 산정에서 제외돼요. 건설 현장 등 고용 불안정 직종은 보호받아요.',
    },
    {
      question: '대기기간 4주 동안 구직활동 의무가 있나요?',
      answer: '네, 대기기간에도 고용센터 출석과 <strong>구직활동 의무</strong>는 유지돼요. 다만 대기기간의 실업인정은 급여 지급 없이 처리돼요.',
    },
  ],

  relatedSpokes: [
    { badge: '부정수급', title: '실업급여 부정수급 유형 제재 벌금 5배 추징', desc: '허위 신고 시 최대 5배 추징·형사처벌', href: '/w/실업급여-부정수급-유형-제재-벌금-추징' },
    { badge: '2026 개정', title: '실업급여 2026 개정 상한액 하한액 인상 변경', desc: '일 상한 68,100원·하한 63,104원', href: '/w/실업급여-2026-개정-상한액-하한액-인상-변경' },
    { badge: '연장급여', title: '연장급여 훈련연장 개별연장 특별연장 비교', desc: '실업급여 끝나도 최대 2년 더 받는 법', href: '/w/연장급여-훈련연장-개별연장-특별연장-조건-비교' },
    { badge: '불복절차', title: '실업급여 이의신청 심사청구 재심사 절차', desc: '거부당했을 때 3단계 불복 방법', href: '/w/실업급여-이의신청-심사청구-재심사-불복-절차' },
  ],

  sources: [
    { name: '고용보험법', url: 'https://www.law.go.kr/법령/고용보험법', org: '법제처' },
    { name: '실업급여 안내', url: 'https://www.ei.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePb0201Info.do', org: '고용보험' },
    { name: '반복수급 감액 정책뉴스', url: 'https://www.korea.kr/news/policyNewsView.do?newsId=148931500', org: '대한민국 정책브리핑' },
  ],
}

export default data
