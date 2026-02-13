import type { SpokeData } from '@/data/spoke/types'
import {
  SpokeTable, FormulaBox, TipBox, WarnBox,
  Chips, SpokeLinks, Steps,
  SpokeTimeline, SpokeCompareCards,
  SpokeRateBars, SpokeFlow, SpokeChecklist,
} from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '실업급여-이의신청-심사청구-재심사-불복-절차',

  meta: {
    title: '실업급여 이의신청 심사청구 재심사 불복 절차 | 기한 서류 총정리',
    description: '실업급여 거부 처분에 불복하려면 90일 이내 심사청구부터 시작해요. 3단계 불복 절차와 필요 서류를 정리했어요.',
    keywords: [
      '실업급여 이의신청 절차 방법',
      '실업급여 심사청구 재심사 기간',
      '실업급여 거부 불복 방법',
      '실업급여 이의신청 필요 서류',
    ],
    ogTitle: '실업급여 이의신청 심사청구 재심사 불복 절차 | 머니위키',
    ogDescription: '실업급여 거부 시 90일 이내 심사청구, 재심사, 행정소송 3단계 절차',
  },

  hub: {
    url: '/w/실업급여-취업촉진수당-연장급여-부정수급-2026',
    name: '실업급여 취업촉진수당 연장급여 부정수급 2026',
  },

  breadcrumb: ['고용노동', '실업급여', '이의신청 불복'],

  summary3: [
    <>실업급여 처분에 불복하려면 <strong>심사청구 → 재심사청구 → 행정소송</strong> 3단계를 거쳐요</>,
    <>심사청구·재심사청구·행정소송 모두 <strong>90일 이내</strong> 제기가 필수예요</>,
    <>심사청구서, 처분통지서 사본, 증빙자료를 준비하면 고용센터나 온라인으로 신청할 수 있어요</>,
  ],

  sourceBar: {
    badge: '출처',
    name: '고용보험법 제87조~제90조',
    date: '2026.01',
  },

  prevNext: {
    prev: { title: '임신 출산 육아 실업급여 수급기간 연장', href: '/w/임신-출산-육아-실업급여-수급기간-연장-특례' },
    next: { title: '실업급여 2026 개정 상한액 하한액', href: '/w/실업급여-2026-개정-상한액-하한액-인상-변경' },
  },

  stickyBar: {
    topLabel: '불복 기한',
    value: '90일 이내',
    buttonText: '절차 확인 →',
    scrollTo: '#s1',
  },

  hero: {
    badge: '2026년 기준',
    h1: (
      <>
        실업급여 <span className="text-[#1E3A5F]">이의신청 심사청구 재심사</span> 불복 절차
      </>
    ),
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          실업급여 신청이 거부됐거나 감액 처분을 받으면 어떻게 해야 할지 막막하셨죠?
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          <a href="/w/실업급여-취업촉진수당-연장급여-부정수급-2026" className="text-[#4A7AB5] underline">실업급여 제도</a> 안에는 <strong className="text-neutral-800">심사청구 → 재심사청구 → 행정소송</strong>이라는 3단계 불복 절차가 마련돼 있어요. 각 단계 모두 <strong className="text-neutral-800">90일 이내</strong>에 제기해야 해요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          실제로 심사청구의 <strong className="text-neutral-800">인용률은 약 20~30%</strong>로 적지 않은 비율이에요. 특히 <a href="/w/실업급여-부정수급-유형-제재-벌금-추징" className="text-[#4A7AB5] underline">부정수급 처분</a>에 대한 불복에서도 이 절차를 활용해요. 포기하기엔 이른 셈이죠.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          먼저 3단계 불복 절차의 전체 흐름부터 같이 볼게요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '전체',
      desc: '실업급여 취업촉진수당 연장급여 부정수급 총정리',
    },
  },

  toc: [
    { id: 's1', label: '실업급여 이의신청 절차는 어떻게 되나요?' },
    { id: 's2', label: '실업급여 심사청구 재심사 기간은 얼마나 걸리나요?' },
    { id: 's3', label: '실업급여 거부에 불복하려면 어떤 방법이 있나요?' },
    { id: 's4', label: '실업급여 이의신청에 필요한 서류는 무엇인가요?' },
    { id: 's-faq', label: '자주 묻는 질문' },
  ],

  sections: [
    // ═══ S1: 이의신청 절차 방법 — SpokeTable + SpokeRateBars ═══
    {
      id: 's1',
      number: 'SECTION 01',
      heading: '실업급여 이의신청 절차는 어떻게 되나요?',
      subtitle: '심사청구 → 재심사청구 → 행정소송 3단계예요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            실업급여 처분에 불복하는 절차는 <strong>심사청구</strong>, <strong>재심사청구</strong>, <strong>행정소송</strong> 3단계로 나뉘어요. 첫 번째 단계인 심사청구부터 시작해야 하고, 각 단계의 결정에 불복할 때 다음 단계로 넘어가는 구조예요.
          </p>

          <SpokeTable
            id="tbl-step"
            title="실업급여 불복 3단계 절차 비교"
            subtitle="고용보험법 제87조~제90조 기준"
            headers={['단계', '신청 대상', '제기 기한', '결정 기간', '심사 기관']}
            rows={[
              ['1단계 심사청구', '처분에 이의 있는 자', '90일 이내', '30일 (+10일 연장)', '고용보험심사관'],
              ['2단계 재심사청구', '심사 결정에 이의 있는 자', '90일 이내', '50일 (+10일 연장)', '고용보험심사위원회'],
              ['3단계 행정소송', '재결에 이의 있는 자', '90일 이내', '법원 재판 일정', '행정법원'],
            ]}
            highlightCol={3}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            심사청구는 <strong>처분이 있음을 안 날부터 90일</strong> 이내에 제기해야 해요. 이 기한을 넘기면 각하 처리되니 기한을 꼭 지켜야 해요. 고용센터를 거쳐 고용보험심사관에게 청구하는 방식이에요.
          </p>

          <SpokeRateBars
            bars={[
              { label: '심사청구', rate: '인용 20~30%', width: '30%' },
              { label: '재심사청구', rate: '인용 15~20%', width: '20%' },
              { label: '행정소송', rate: '인용 10~15%', width: '15%' },
            ]}
          />

          <TipBox title="심사청구 인용률이 20~30%라는 건?">
            5명 중 1~2명은 처분이 취소되거나 변경된다는 뜻이에요. 증빙자료를 꼼꼼히 준비하면 가능성이 충분히 있어요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '기간',
        title: '심사청구 결과가 나오기까지 얼마나 걸릴까요?',
        desc: '심사청구 30일, 재심사 50일 등 각 단계별 소요 기간을 비교해드려요.',
        icon: 'clock',
      },
    },

    // ═══ S2: 심사청구 재심사 기간 — SpokeCompareCards + FormulaBox ═══
    {
      id: 's2',
      number: 'SECTION 02',
      heading: '실업급여 심사청구 재심사 기간은 얼마나 걸리나요?',
      subtitle: '심사청구 30일, 재심사 50일, 행정소송은 수개월이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            불복 절차를 밟다 보면 결과가 언제 나오는지 궁금한 게 당연하잖아요. 각 단계마다 법에서 정한 결정 기한이 있어요.
          </p>

          <SpokeCompareCards
            cards={[
              {
                title: '심사청구',
                subtitle: '고용보험심사관',
                items: [
                  '제기 기한: 처분 안 날로부터 90일',
                  '결정 기한: 30일 이내',
                  '연장: 1회 한해 10일 이내',
                  '결정 효력: 원처분 기관 기속',
                ],
                recommended: true,
                recLabel: '1단계',
              },
              {
                title: '재심사청구',
                subtitle: '고용보험심사위원회',
                items: [
                  '제기 기한: 결정 안 날로부터 90일',
                  '재결 기한: 50일 이내',
                  '연장: 1회 한해 10일 이내',
                  '재결 효력: 행정심판 재결로 간주',
                ],
              },
            ]}
          />

          <FormulaBox
            lines={[
              { text: '불복 절차 최대 소요 기간', comment: true },
              { text: '심사청구(40일) + 재심사(60일) + 행정소송 = 최소 3~6개월' },
            ]}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            심사청구는 최대 <strong>40일</strong>(30일 + 연장 10일), 재심사는 최대 <strong>60일</strong>(50일 + 연장 10일)이 걸려요. 행정소송까지 가면 수개월이 더 필요해요. 그래서 첫 단계인 심사청구에서 철저하게 준비하는 게 가장 효율적이에요.
          </p>

          <TipBox title="심사청구 결정 기한 내에 결과가 안 나오면?">
            법에서 정한 기한은 훈시 규정이라 넘겨도 바로 위법은 아니에요. 하지만 지나치게 지연되면 부작위 위법 확인 소송을 낼 수 있어요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '방법',
        title: '구체적으로 어떻게 신청하면 되나요?',
        desc: '고용센터 방문, 고용24 온라인 등 실제 불복 신청 방법을 안내해드려요.',
        icon: 'info',
      },
    },

    // ═══ S3: 거부 불복 방법 — SpokeFlow + SpokeChecklist ═══
    {
      id: 's3',
      number: 'SECTION 03',
      heading: '실업급여 거부에 불복하려면 어떤 방법이 있나요?',
      subtitle: '고용센터 방문, 고용24 온라인, 우편 제출 3가지예요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            처분 결과에 납득이 안 가면 바로 행동에 옮겨야 해요. 90일이 지나면 불복 자체가 불가능하니까요.
          </p>

          <SpokeFlow
            steps={[
              { icon: '📋', label: '처분통지서 확인', sub: '거부 사유 파악' },
              { icon: '📝', label: '심사청구서 작성', sub: '이의 내용 정리' },
              { icon: '🏢', label: '고용센터 제출', sub: '방문/온라인/우편' },
              { icon: '⏳', label: '결정 대기', sub: '30일 이내' },
            ]}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            심사청구서를 제출하는 방법은 3가지예요. 관할 <strong>고용센터에 직접 방문</strong>하거나, <strong>고용24(ei.go.kr) 온라인</strong>으로 신청하거나, <strong>우편</strong>으로 보낼 수 있어요.
          </p>

          <SpokeChecklist
            items={[
              { text: '처분통지서의 거부 사유를 꼼꼼히 읽었나요?', done: false, note: '사유별로 반박 논리가 달라요' },
              { text: '반박할 수 있는 증빙자료를 확보했나요?', done: false, note: '퇴직사유서, 근로계약서, 진단서 등' },
              { text: '심사청구서에 이의 내용과 이유를 구체적으로 작성했나요?', done: false, note: '단순 "부당하다"만으로는 부족해요' },
              { text: '처분을 안 날로부터 90일이 지나지 않았나요?', done: false, note: '기한 넘기면 각하 처리돼요' },
              { text: '대리인이 필요한 경우 공인노무사 또는 변호사를 선임했나요?', done: false, note: '배우자·직계가족도 대리 가능' },
            ]}
          />

          <WarnBox>
            <strong>주의:</strong> 심사청구는 <strong>처분을 한 고용센터를 거쳐</strong> 고용보험심사관에게 제출해요. 고용센터를 건너뛰고 바로 심사관에게 보내면 반려될 수 있어요.
          </WarnBox>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '서류',
        title: '심사청구에 어떤 서류를 준비해야 하나요?',
        desc: '심사청구서 양식부터 첨부해야 할 증빙자료 목록까지 정리했어요.',
        icon: 'grid',
      },
    },

    // ═══ S4: 필요 서류 — Chips + SpokeTimeline ═══
    {
      id: 's4',
      number: 'SECTION 04',
      heading: '실업급여 이의신청에 필요한 서류는 무엇인가요?',
      subtitle: '심사청구서 + 처분통지서 사본 + 증빙자료가 기본이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            서류 준비가 불복의 성패를 좌우한다고 해도 과언이 아니에요. 기본 서류 3가지와 상황별 추가 증빙이 있어요.
          </p>

          <Chips
            items={[
              { icon: '📄', label: '심사청구서', value: '필수' },
              { icon: '📋', label: '처분통지서 사본', value: '필수' },
              { icon: '📎', label: '증빙자료', value: '상황별' },
              { icon: '🪪', label: '신분증 사본', value: '필수' },
            ]}
          />

          <SpokeTable
            id="tbl-docs"
            title="심사청구서 기재 사항"
            subtitle="고용보험법 시행규칙 기준"
            headers={['항목', '내용', '비고']}
            rows={[
              ['청구인 정보', '이름, 주소, 연락처', '필수'],
              ['처분청 명칭', '해당 고용센터 이름', '필수'],
              ['처분 내용', '거부·감액 등 처분의 구체적 내용', '필수'],
              ['처분을 안 날', '처분통지서 수령일', '90일 기산점'],
              ['이의 내용과 이유', '왜 부당한지 구체적으로 작성', '가장 중요'],
              ['청구 연월일', '심사청구서 작성 날짜', '필수'],
            ]}
            highlightCol={1}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            증빙자료는 상황에 따라 달라요. 비자발적 퇴사를 주장하려면 <strong>사직서, 권고사직 통보서, 진단서</strong> 등이 필요해요. 피보험기간 다툼이라면 <strong>급여명세서, 근로계약서, 4대보험 가입확인서</strong>를 첨부해요.
          </p>

          <SpokeTimeline
            events={[
              { month: 'D-day', title: '처분통지서 수령', desc: '거부 사유를 확인하고 불복 여부를 판단해요' },
              { month: 'D+7~14일', title: '증빙자료 수집', desc: '퇴직사유서, 근로계약서 등 반박 자료를 모아요' },
              { month: 'D+14~30일', title: '심사청구서 작성·제출', desc: '고용센터 방문 또는 고용24 온라인 제출해요' },
              { month: 'D+30~70일', title: '심사청구 결정 통지', desc: '인용이면 처분 변경, 기각이면 재심사 검토해요' },
              { month: 'D+70~160일', title: '재심사·행정소송', desc: '기각 시 90일 이내 재심사, 그래도 기각 시 행정소송이에요' },
            ]}
          />

          <TipBox title="공인노무사에게 상담받으면 도움이 돼요">
            심사청구서 작성이 어렵다면 대한법률구조공단(전화 132)에서 무료 상담을 받을 수 있어요. 공인노무사나 변호사를 대리인으로 선임하면 인용 가능성이 높아져요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '/w/실업급여-취업촉진수당-연장급여-부정수급-2026',
        badge: '허브',
        title: '실업급여 전체 제도가 궁금하다면?',
        desc: '취업촉진수당, 연장급여, 부정수급 제재까지 한 번에 정리했어요.',
        icon: 'info',
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
      question: '실업급여 심사청구와 이의신청은 같은 건가요?',
      answer: '같은 개념이에요. 고용보험법에서는 공식적으로 <strong>심사청구</strong>라고 부르지만, 일반적으로 이의신청이라고도 불러요. 처분에 불복하는 첫 번째 단계를 말해요.',
    },
    {
      question: '심사청구 없이 바로 행정소송을 낼 수 있나요?',
      answer: '원칙적으로는 <strong>심사청구 → 재심사청구</strong>를 거친 후에 행정소송을 낼 수 있어요. 다만 재심사 재결이 60일을 넘겨 나오지 않으면 재결 전에도 소송이 가능해요.',
    },
    {
      question: '실업급여 심사청구 비용은 얼마인가요?',
      answer: '<strong>무료</strong>예요. 심사청구와 재심사청구 모두 수수료가 없어요. 다만 변호사나 공인노무사를 선임하면 별도 상담·위임 비용이 들어요.',
    },
    {
      question: '심사청구를 하면 실업급여를 받으면서 기다릴 수 있나요?',
      answer: '심사청구 중에는 처분이 <strong>그대로 유지</strong>돼요. 즉, 거부 처분을 받았다면 결정이 나올 때까지 급여를 받을 수 없어요. 인용되면 소급 지급받게 돼요.',
    },
  ],

  relatedSpokes: [
    { badge: '수급조건', title: '실업급여 수급 조건 자격 요건 완벽정리', desc: '고용보험 180일, 비자발적 퇴사, 구직 의사 3가지 핵심', href: '/w/실업급여-수급-조건-자격-요건-완벽정리' },
    { badge: '부정수급', title: '실업급여 부정수급 유형 제재 벌금 5배 추징', desc: '부정수급 시 최대 5배 추징 + 형사처벌 기준', href: '/w/실업급여-부정수급-유형-제재-벌금-추징' },
    { badge: '신청방법', title: '실업급여 신청 방법 절차 준비서류', desc: '온라인·오프라인 신청 절차와 필요 서류', href: '/w/실업급여-신청-방법-절차-준비서류' },
    { badge: '고용센터', title: '실업급여 고용센터 찾기 고용24 사용법', desc: '관할 고용센터 찾기와 온라인 서비스 이용법', href: '/w/실업급여-고용센터-찾기-고용24-사용법' },
  ],

  sources: [
    { name: '고용보험법 제87조~제90조', url: 'https://www.law.go.kr/법령/고용보험법', org: '법제처' },
    { name: '실업급여 안내', url: 'https://www.ei.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePb0201Info.do', org: '고용보험' },
    { name: '실업급여 처분에 대한 이의 제기', url: 'https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=722&ccfNo=5&cciNo=3&cnpClsNo=1', org: '찾기쉬운 생활법령정보' },
    { name: '고용보험심사위원회', url: 'https://eiac.ei.go.kr/eiac/eih/es/si/retrieveSi003Info.do', org: '고용보험' },
  ],
}

export default data
