import type { SpokeData } from '@/data/spoke/types'
import {
  SpokeTable, FormulaBox, TipBox, WarnBox,
  SpokeRateBars, SpokeCompareCards,
  SpokeStepCards, SpokeFlow, SpokeChecklist,
} from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '실업급여-부정수급-유형-제재-벌금-추징',

  meta: {
    title: '실업급여 부정수급 유형 제재 벌금 | 5배 추징금 기준 정리',
    description: '실업급여 부정수급 시 받은 금액의 5배까지 추징당해요. 6가지 유형과 형사처벌 기준, 자진신고 감면 방법을 정리했어요.',
    keywords: [
      '실업급여 부정수급 유형 사례',
      '실업급여 부정수급 벌금 처벌',
      '실업급여 부정수급 5배 추징금',
      '실업급여 부정수급 신고 방법',
    ],
    ogTitle: '실업급여 부정수급 유형 제재 벌금 5배 추징 | 머니위키',
    ogDescription: '부정수급 6가지 유형과 최대 5배 추징, 형사처벌 기준을 확인하세요.',
  },

  hub: {
    url: '/w/실업급여-취업촉진수당-연장급여-부정수급-2026',
    name: '실업급여 취업촉진수당 연장급여 부정수급 2026',
  },

  breadcrumb: ['고용·노동', '실업급여', '부정수급 제재'],

  summary3: [
    <>실업급여 부정수급 적발 시 <strong>전액 반환 + 최대 5배 추가징수</strong> (사업주 공모 시)</>,
    <>형사처벌 기준: <strong>3년 이하 징역 또는 3,000만원 이하 벌금</strong> (고용보험법 제116조)</>,
    <>자진신고하면 추가징수가 <strong>면제</strong>되고, 부정수급 신고 포상금은 <strong>최대 500만원</strong></>,
  ],

  sourceBar: {
    badge: '출처',
    name: '고용보험법 제62조·제116조',
    date: '2026.01',
  },

  prevNext: {
    prev: { title: '광역구직활동비 이주비 직업능력개발수당', href: '/w/광역구직활동비-이주비-직업능력개발수당-신청' },
    next: { title: '실업급여 반복수급 감액 대기기간 2026', href: '/w/실업급여-반복수급-감액-대기기간-2026-개정' },
  },

  stickyBar: {
    topLabel: '부정수급 추가징수',
    value: '최대 5배',
    buttonText: '제재 기준 확인 →',
    scrollTo: '#s2',
  },

  hero: {
    badge: '2026년 기준',
    h1: (
      <>
        실업급여 <span className="text-[#1E3A5F]">부정수급 유형·제재·벌금</span> 5배 추징 총정리
      </>
    ),
    intro: (
      <p className="text-base text-neutral-500 leading-relaxed">
        아르바이트 하루만 했는데 신고를 깜빡해서 부정수급자가 될 수 있다는 거 알고 계셨나요? 실업급여 부정수급이 적발되면 받은 금액을 전액 반환해야 하고, 사업주와 공모한 경우 <strong>최대 5배까지 추징</strong>당해요. <a href="/w/실업급여-취업촉진수당-연장급여-부정수급-2026" className="text-[#4A7AB5] underline">실업급여 전체 가이드</a>에서 수급 조건도 함께 확인해 보세요. 먼저 어떤 행위가 부정수급에 해당하는지부터 볼게요.
      </p>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '실업급여 취업촉진수당·연장급여·부정수급 2026년 총정리',
    },
  },

  toc: [
    { id: 's1', label: '실업급여 부정수급 유형은 어떤 게 있나요?' },
    { id: 's2', label: '실업급여 부정수급 벌금과 추징금은 얼마나 되나요?' },
    { id: 's3', label: '실업급여 부정수급 5배 추징은 어떤 경우에 적용되나요?' },
    { id: 's4', label: '실업급여 부정수급 신고는 어떻게 하나요?' },
    { id: 's-faq', label: '자주 묻는 질문' },
  ],

  sections: [
    // ═══ S1: 부정수급 유형 ═══
    {
      id: 's1',
      number: 'SECTION 01',
      heading: '실업급여 부정수급 유형은 어떤 게 있나요?',
      subtitle: '6가지 유형 중 취업 미신고가 가장 흔해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            부정수급은 거짓이나 부정한 방법으로 실업급여를 받거나 받으려 하는 행위예요. 금액이 아무리 작아도, 단 하루 일한 것도 신고하지 않으면 부정수급이 돼요. 가장 많이 적발되는 유형은 <strong>취업·소득 사실 미신고</strong>예요. 프리랜서 번역료 10만원을 받고도 신고하지 않으면 해당돼요.
          </p>

          <FormulaBox
            lines={[
              { text: '부정수급 = 거짓·부정한 방법으로 실업급여 수령', comment: true },
              { text: '금액과 관계없이 소득 발생 사실 미신고 시 부정수급' },
            ]}
          />

          <SpokeTable
            id="tbl-types"
            title="실업급여 부정수급 6가지 유형"
            subtitle="고용노동부 기준 / 대한민국 정책브리핑"
            headers={['유형', '내용', '사례']}
            rows={[
              ['취업·소득 미신고', '일하거나 소득이 생긴 사실을 미신고', '편의점 알바, 프리랜서 번역'],
              ['이직사유 허위신고', '자발적 퇴사를 권고사직으로 위장', '자진퇴사 → 권고사직 허위 기재'],
              ['위장고용·위장퇴사', '허위 고용보험 가입 후 수급', '근무 중인데 퇴사 처리'],
              ['대리 신청', '본인이 아닌 타인이 대리 신청', '가족이 온라인 대리 인정'],
              ['허위 구직활동', '면접 미참여·확인서 위조', '면접 안 갔는데 참석으로 신고'],
              ['기타', '재취업 불가능 상태에서 수급', 'BJ 활동, 전업 투자'],
            ]}
            highlightCol={0}
          />

          <TipBox title="1회 미신고는 해당 기간만 지급 정지예요">
            근로 제공 사실을 1회 미신고하면 그 실업인정 기간의 급여만 못 받아요. 하지만 2회 이상 반복하면 <strong>전체 실업급여가 정지</strong>되니 주의하세요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '제재',
        title: '적발되면 돈을 얼마나 물어내야 할까요?',
        desc: '부정수급액 전액 반환은 기본이고, 횟수에 따라 추가징수 비율이 달라져요.',
        icon: 'calc',
      },
    },

    // ═══ S2: 벌금·추징금 ═══
    {
      id: 's2',
      number: 'SECTION 02',
      heading: '실업급여 부정수급 벌금과 추징금은 얼마나 되나요?',
      subtitle: '전액 반환 + 추가징수 + 형사처벌까지 3중 제재예요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            "한 번 걸리면 끝"이라는 말이 과장이 아니에요. 부정수급이 확정되면 받은 돈 전액을 돌려줘야 하고, 그 위에 <strong>추가징수금</strong>이 붙어요. 형사고발까지 당하면 <strong>3년 이하 징역 또는 3,000만원 이하 벌금</strong>이에요. 납부기한은 통보받은 날로부터 <strong>30일 이내</strong>예요.
          </p>

          <SpokeRateBars
            bars={[
              { label: '1~2회 적발', rate: '100%', width: '40%' },
              { label: '3~4회 적발', rate: '150%', width: '60%' },
              { label: '5회 이상', rate: '200%', width: '80%' },
              { label: '사업주 공모', rate: '최대 500%', width: '100%' },
            ]}
          />

          <SpokeCompareCards
            cards={[
              {
                title: '행정 제재',
                subtitle: '고용보험법 제62조',
                items: [
                  '부정수급액 전액 반환',
                  '추가징수 100~200% (횟수별)',
                  '사업주 공모 시 최대 5배',
                  '실업급여 지급 즉시 중지',
                  '반환 불이행 시 체납처분',
                ],
              },
              {
                title: '형사 처벌',
                subtitle: '고용보험법 제116조',
                items: [
                  '3년 이하 징역 또는 3,000만원 이하 벌금',
                  '사업주 공모 시 5년 이하 징역',
                  '사업주 공모 시 5,000만원 이하 벌금',
                  '허위서류 제출 시 300만원 과태료',
                  '사업주도 공동 처벌 대상',
                ],
                recommended: true,
                recLabel: '더 무거운 처벌',
              },
            ]}
          />

          <WarnBox>
            부정수급으로 <a href="/w/실업급여-반복수급-감액-대기기간-2026-개정" className="text-amber-700 underline">반복수급 감액</a> 대상이 되면 향후 실업급여를 받을 때도 최대 50%까지 깎여요. 한 번의 부정수급이 앞으로의 수급에도 영향을 줘요.
          </WarnBox>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '5배',
        title: '사업주와 짜고 치면 어떻게 되나요?',
        desc: '사업주 공모 부정수급은 추징금이 최대 5배까지 올라가요.',
        icon: 'info',
      },
    },

    // ═══ S3: 5배 추징 상세 ═══
    {
      id: 's3',
      number: 'SECTION 03',
      heading: '실업급여 부정수급 5배 추징은 어떤 경우에 적용되나요?',
      subtitle: '사업주 공모 + 반복 적발이면 최대 5배예요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            5배 추징은 사업주와 짜고 부정수급한 경우에 적용돼요. 예를 들어 실제로 출근하면서 퇴사 처리를 해달라고 사업주에게 부탁한 뒤 실업급여를 타면, 받은 금액의 5배를 추징당할 수 있어요. 월 150만원을 3개월 받았다면 추징금만 <strong>최대 2,250만원</strong>이에요.
          </p>

          <SpokeStepCards
            steps={[
              { title: '1단계: 부정수급액 전액 반환', desc: '받은 실업급여 전액을 돌려줘야 해요', tip: '예시: 450만원 수급 → 450만원 반환' },
              { title: '2단계: 추가징수 (100~200%)', desc: '반복 횟수에 따라 추가로 붙어요', tip: '3회 미만 100%, 3~4회 150%, 5회+ 200%' },
              { title: '3단계: 사업주 공모 가산 (최대 500%)', desc: '공모 + 반복이면 300~500%까지', tip: '예시: 450만원 × 5배 = 2,250만원 추가' },
              { title: '4단계: 형사처벌 별도 진행', desc: '추징금과 별개로 고발 조치 가능', tip: '사업주 공모: 5년 이하 징역 또는 5,000만원 벌금' },
            ]}
          />

          <TipBox title="자진신고하면 추가징수가 면제돼요">
            조사 착수 전에 자진신고하면 추가징수금이 면제돼요. 부정수급액 반환만 하면 되니까, 혹시라도 미신고 사실이 있다면 빨리 고용센터에 알리는 게 유리해요. 사업주도 연대 책임에서 벗어날 수 있어요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '신고',
        title: '주변에 부정수급자가 있다면 어떻게 신고하나요?',
        desc: '부정수급 신고 시 최대 500만원 포상금을 받을 수 있어요.',
        icon: 'check',
      },
    },

    // ═══ S4: 신고 방법 ═══
    {
      id: 's4',
      number: 'SECTION 04',
      heading: '실업급여 부정수급 신고는 어떻게 하나요?',
      subtitle: '포상금 최대 500만원, 실명 신고 시 지급돼요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            부정수급을 목격했다면 고용노동부에 신고할 수 있어요. 신고가 접수되고 부정수급으로 확정되면 <strong>포상금 최대 500만원</strong>을 받아요. 실업급여 부정수급은 부정수급액의 20%를 연간 500만원 한도로 지급해요. 제보자 신원은 철저하게 보호돼요.
          </p>

          <SpokeFlow
            steps={[
              { icon: '📝', label: '증거 확보', sub: '근무 사실 증빙' },
              { icon: '📞', label: '신고 접수', sub: '1350 또는 온라인' },
              { icon: '🔍', label: '조사 진행', sub: '고용센터 확인' },
              { icon: '💰', label: '포상금 지급', sub: '최대 500만원' },
            ]}
          />

          <SpokeChecklist
            items={[
              { text: '고용보험 홈페이지(ei.go.kr)에서 온라인 신고', done: true, note: '가장 간편한 방법' },
              { text: '국번 없이 1350 전화 신고', done: true, note: '상담원 연결 후 접수' },
              { text: '전국 고용노동청(지청) 방문 신고', done: true, note: '전담 창구 운영' },
              { text: '국민신문고 또는 고용노동부 민원마당', done: true, note: '온라인 민원 접수 가능' },
              { text: '실명 신고 필수 (익명 시 포상금 미지급)', done: false, note: '포상금은 실명만 대상' },
            ]}
          />

          <TipBox title="본인이 부정수급한 경우에는 자진신고가 유리해요">
            조사 착수 전에 직접 고용센터에 자진신고하면 <strong>추가징수금이 면제</strong>돼요. 부정수급액만 반환하면 되고, <a href="/w/실업급여-실업인정-구직활동-방법" className="text-[#4A7AB5] underline">실업인정 방법</a>을 제대로 숙지해서 재발을 방지하세요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '/w/실업급여-취업촉진수당-연장급여-부정수급-2026',
        badge: '전체 가이드',
        title: '실업급여 수급 조건부터 다시 확인하고 싶다면?',
        desc: '취업촉진수당, 연장급여, 부정수급 제재까지 한눈에 볼 수 있어요.',
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
    { question: '실업급여 부정수급 하루 알바도 해당되나요?', answer: '<strong>네.</strong> 금액이나 기간에 관계없이, 하루라도 일한 사실을 실업인정 신청 시 신고하지 않으면 부정수급에 해당해요. 편의점 아르바이트, 대리운전, 배달 등 모든 소득 활동이 포함돼요.' },
    { question: '실업급여 부정수급 자진신고하면 어떤 혜택이 있나요?', answer: '조사 착수 전에 자진신고하면 <strong>추가징수금이 면제</strong>돼요. 부정수급액 반환만 하면 되고, 형사고발도 면할 수 있어요. 가능한 빨리 관할 고용센터에 연락하세요.' },
    { question: '실업급여 부정수급 추징금을 못 내면 어떻게 되나요?', answer: '납부기한(30일) 내에 내지 못하면 <strong>국세 체납처분 절차</strong>가 적용돼요. 재산 압류, 급여 압류 등이 진행될 수 있으니 분할납부를 고용센터에 상담하세요.' },
    { question: '실업급여 부정수급 신고 포상금은 얼마인가요?', answer: '부정수급액의 <strong>20%</strong>를 포상금으로 받아요. 연간 한도는 <strong>500만원</strong>이에요. 단, 실명 신고자만 대상이고 부정수급으로 최종 확정돼야 지급돼요.' },
    { question: '사업주가 모르게 부정수급하면 사업주도 처벌받나요?', answer: '사업주가 <strong>공모하지 않았다면</strong> 처벌받지 않아요. 하지만 허위 이직확인서를 발급하거나 위장퇴사에 협조한 경우에는 <strong>연대 책임</strong>으로 추징금과 형사처벌 모두 적용돼요.' },
  ],

  relatedSpokes: [
    { badge: '반복수급', title: '실업급여 반복수급 감액 대기기간 2026 개정', desc: '5년간 3회 이상 수급 시 최대 50% 감액', href: '/w/실업급여-반복수급-감액-대기기간-2026-개정' },
    { badge: '실업인정', title: '실업급여 실업인정 구직활동 방법', desc: '부정수급 예방을 위한 올바른 실업인정 절차', href: '/w/실업급여-실업인정-구직활동-방법' },
    { badge: '불복절차', title: '실업급여 이의신청 심사청구 재심사 불복 절차', desc: '부정수급 결정에 불복하는 3단계 절차', href: '/w/실업급여-이의신청-심사청구-재심사-불복-절차' },
    { badge: '2026 개정', title: '실업급여 2026 개정 상한액 하한액 인상 변경', desc: '2026년 일 상한액 68,100원 인상 내용', href: '/w/실업급여-2026-개정-상한액-하한액-인상-변경' },
  ],

  sources: [
    { name: '고용보험법 제62조·제116조', url: 'https://www.law.go.kr/법령/고용보험법', org: '법제처' },
    { name: '실업급여 부정수급 유형 안내', url: 'https://www.korea.kr/news/policyNewsView.do?newsId=148894001', org: '대한민국 정책브리핑' },
    { name: '실업급여 안내', url: 'https://www.ei.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePb0201Info.do', org: '고용보험' },
    { name: '부정수급 반환·징수 안내', url: 'https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=722&ccfNo=5&cciNo=2&cnpClsNo=2', org: '찾기쉬운 생활법령정보' },
  ],
}

export default data
