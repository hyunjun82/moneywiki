import type { SpokeData } from '@/data/spoke/types'
import {
  SpokeTable, FormulaBox, TipBox,
  SpokeRateBars, SpokeCompareCards,
  SpokeStepCards, SpokeFlow, SpokeChecklist,
} from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '해고-부당해고-징계해고-실업급여-해고예고수당',

  meta: {
    title: '해고 부당해고 징계해고 실업급여 수급 조건 | 해고예고수당 계산',
    description: '해고 유형별 실업급여 수급 조건과 해고예고수당 30일분 통상임금 계산법을 정리했어요. 부당해고 구제신청 절차까지 확인하세요.',
    keywords: [
      '해고 실업급여 수급 조건',
      '부당해고 실업급여 신청 방법',
      '징계해고 실업급여 가능 여부',
      '해고예고수당 실업급여 관계',
    ],
    ogTitle: '해고 부당해고 징계해고 실업급여 수급 조건 | 머니위키',
    ogDescription: '해고 유형별 실업급여 수급 여부와 해고예고수당 계산법을 한눈에 확인하세요.',
  },

  hub: {
    url: '/w/실업급여-퇴사유형별-수급-자격-권고사직-자진퇴사-해고',
    name: '실업급여 퇴사유형별 수급 자격 비교',
  },

  breadcrumb: ['고용·노동', '실업급여', '해고·부당해고 실업급여'],

  summary3: [
    <>일반해고는 <strong>비자발적 이직</strong>으로 실업급여 수급이 가능해요</>,
    <>징계해고 중 <strong>중대한 귀책사유</strong>에 해당하면 수급이 제한돼요</>,
    <>해고예고수당은 <strong>30일분 통상임금</strong>이고 실업급여와 별개로 받아요</>,
  ],

  sourceBar: {
    badge: '출처',
    name: '고용보험법 + 근로기준법 제26조',
    date: '2026.02',
  },

  prevNext: {
    prev: { title: '계약직 계약만료 실업급여 수급 요건', href: '/w/계약직-계약만료-실업급여-수급-요건-재계약' },
    next: { title: '자영업자 폐업 실업급여 조건', href: '/w/자영업자-폐업-실업급여-조건-고용보험-가입' },
  },

  stickyBar: {
    topLabel: '해고예고수당',
    value: '30일분 통상임금',
    buttonText: '수급 조건 확인 →',
    scrollTo: '#s1',
  },

  hero: {
    badge: '해고',
    h1: (
      <>
        해고·부당해고·징계해고별 <span className="text-[#1E3A5F]">실업급여 수급 조건</span>과 해고예고수당
      </>
    ),
    intro: (
      <p className="text-base text-neutral-500 leading-relaxed">
        갑자기 해고 통보를 받으면 실업급여부터 걱정되잖아요. 해고 유형에 따라 수급 가능 여부가 달라지고, 해고예고를 안 받았다면 <strong>30일분 통상임금</strong>도 따로 청구할 수 있어요. <a href="/w/실업급여-퇴사유형별-수급-자격-권고사직-자진퇴사-해고" className="text-[#4A7AB5] underline">퇴사유형별 실업급여 비교</a>에서 전체 그림을 먼저 보셔도 좋아요. 먼저 해고 유형별 수급 조건부터 살펴볼게요.
      </p>
    ),
    hubCTA: {
      badge: '퇴사유형',
      desc: '권고사직·자진퇴사·해고·계약만료 퇴사유형별 실업급여 비교',
    },
  },

  toc: [
    { id: 's1', label: '해고 유형별 실업급여 수급 조건은 어떻게 되나요?' },
    { id: 's2', label: '부당해고를 당하면 실업급여 신청은 어떻게 하나요?' },
    { id: 's3', label: '징계해고를 당해도 실업급여를 받을 수 있나요?' },
    { id: 's4', label: '해고예고수당과 실업급여는 어떤 관계인가요?' },
    { id: 's-faq', label: '자주 묻는 질문' },
  ],

  sections: [
    {
      id: 's1',
      number: 'SECTION 01',
      heading: '해고 유형별 실업급여 수급 조건은 어떻게 되나요?',
      subtitle: '일반해고는 수급 가능, 징계해고는 사유에 따라 달라요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            해고는 크게 <strong>일반해고</strong>, <strong>징계해고</strong>, <strong>정리해고</strong> 세 가지로 나뉘어요. 일반해고와 정리해고는 비자발적 이직이라서 실업급여 수급이 가능해요. 반면 징계해고는 해고 사유가 고용보험법상 &ldquo;중대한 귀책사유&rdquo;에 해당하면 수급이 제한돼요. 이 기준은 고용보험법 제58조에 구체적으로 정해져 있어요.
          </p>

          <FormulaBox
            lines={[
              { text: '실업급여 수급 판정 기준', comment: true },
              { text: '비자발적 이직 + 피보험 180일 + 구직 의사 = 수급 가능' },
            ]}
          />

          <SpokeTable
            id="tbl-type"
            title="해고 유형별 실업급여 수급 여부"
            subtitle="고용보험법 제58조 기준"
            headers={['해고 유형', '이직 분류', '실업급여', '비고']}
            rows={[
              ['일반해고', '비자발적', '수급 가능', '경영상 이유 포함'],
              ['정리해고', '비자발적', '수급 가능', '긴박한 경영상 필요'],
              ['징계해고 (경미)', '비자발적', '수급 가능', '중대 귀책 아닌 경우'],
              ['징계해고 (중대)', '자기 과실', '수급 제한', '금고 이상·횡령 등'],
            ]}
            highlightCol={2}
          />

          <TipBox title="핵심 포인트 — 징계해고라고 무조건 못 받는 건 아니에요">
            징계해고라도 고용보험법이 정한 &ldquo;중대한 귀책사유&rdquo; 3가지에 해당하지 않으면 실업급여를 받을 수 있어요. 뒤에서 자세히 설명할게요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '부당해고',
        title: '해고가 부당하다면 구제신청도 같이 할 수 있어요',
        desc: '부당해고 구제신청과 실업급여를 동시에 진행하는 방법을 알려드려요.',
        icon: 'info',
      },
    },

    {
      id: 's2',
      number: 'SECTION 02',
      heading: '부당해고를 당하면 실업급여 신청은 어떻게 하나요?',
      subtitle: '구제신청과 실업급여를 동시에 진행할 수 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            정당한 이유 없이 해고당했다면 실업급여 신청과 동시에 노동위원회에 부당해고 <strong>구제신청</strong>을 할 수 있어요. 두 절차는 별개로 진행되기 때문에 하나를 포기할 필요가 없어요. 부당해고 구제신청은 해고일로부터 <strong>3개월 이내</strong>에 관할 지방노동위원회에 접수해야 해요. 실업급여는 워크넷 구직등록 후 관할 고용센터에서 신청하면 돼요.
          </p>

          <SpokeRateBars
            bars={[
              { label: '구제신청', rate: '3개월', width: '60%' },
              { label: '실업급여', rate: '12개월', width: '100%' },
              { label: '민사소송', rate: '3년', width: '80%' },
            ]}
          />

          <SpokeCompareCards
            cards={[
              {
                title: '부당해고 구제신청',
                subtitle: '노동위원회 판정',
                items: [
                  '해고일로부터 3개월 이내 접수',
                  '관할 지방노동위원회에 서면 신청',
                  '심문회의 → 30일 이내 판정',
                  '구제 인정 시 원직 복직 또는 금전 보상',
                ],
                recommended: true,
                recLabel: '무료·빠름',
              },
              {
                title: '민사소송 (해고무효)',
                subtitle: '법원 판결',
                items: [
                  '해고 무효확인 + 임금 청구',
                  '변호사 비용·인지대 자부담',
                  '1심 6~12개월 소요',
                  '확정판결까지 밀린 임금 전액 청구 가능',
                ],
              },
            ]}
          />

          <TipBox title="구제신청이 기각돼도 실업급여는 영향 없어요">
            부당해고 구제가 기각되더라도 이미 받고 있는 실업급여를 반환할 필요는 없어요. <a href="/w/권고사직-실업급여-수급-조건-절차-합의서" className="text-[#4A7AB5] underline">권고사직 실업급여</a>와 달리, 해고는 이직확인서에 &ldquo;해고&rdquo;로 기재되기 때문에 수급 자격이 바로 인정돼요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '징계',
        title: '징계해고인데 실업급여를 받을 수 있는 경우가 있어요',
        desc: '중대한 귀책사유 3가지에 해당하지 않으면 수급이 가능해요.',
        icon: 'check',
      },
    },

    {
      id: 's3',
      number: 'SECTION 03',
      heading: '징계해고를 당해도 실업급여를 받을 수 있나요?',
      subtitle: '중대한 귀책사유 3가지에만 해당하지 않으면 가능해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            많은 분이 징계해고는 실업급여를 못 받는다고 생각하지만 꼭 그렇지는 않아요. 고용보험법 제58조가 정한 <strong>&ldquo;중대한 귀책사유&rdquo;</strong>에 해당하는 경우에만 수급이 제한돼요. 이 기준에 포함되지 않는 징계해고라면 일반해고와 동일하게 실업급여를 받을 수 있어요. 중대한 귀책사유는 딱 3가지예요.
          </p>

          <SpokeStepCards
            steps={[
              {
                title: '형법·직무 관련 법률 위반 (금고 이상 선고)',
                desc: '횡령, 배임, 업무상 과실치상 등으로 금고 이상 형이 확정된 경우에요.',
                tip: '벌금형은 해당 안 돼요',
              },
              {
                title: '사업에 막대한 지장·재산상 손해',
                desc: '영업비밀 유출, 납품 비리, 불법 쟁의 주도 등 사업에 큰 피해를 준 경우예요.',
                tip: '고용노동부령 시행규칙에 구체 사례 열거',
              },
              {
                title: '정당한 사유 없이 장기간 무단결근',
                desc: '취업규칙·근로계약을 위반해서 장기간 무단결근한 경우예요.',
                tip: '7일 이상 무단결근이 일반적 기준',
              },
            ]}
          />

          <TipBox title="이 3가지에 해당하지 않는 징계해고 사례">
            근무태만, 지각 반복, 복장규정 위반 등 경미한 사유로 징계해고된 경우에는 실업급여 수급이 가능해요. 이직확인서에 &ldquo;징계해고&rdquo;라고 적혀 있어도 고용센터가 사유를 따져서 판단해요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '수당',
        title: '해고예고수당은 실업급여와 별개로 받을 수 있어요',
        desc: '30일 전 예고 없이 해고당했다면 30일분 통상임금을 청구하세요.',
        icon: 'calc',
      },
    },

    {
      id: 's4',
      number: 'SECTION 04',
      heading: '해고예고수당과 실업급여는 어떤 관계인가요?',
      subtitle: '별개 제도라서 둘 다 받을 수 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            해고예고수당은 근로기준법 제26조에 근거한 것이고, 실업급여는 고용보험법에 근거한 제도예요. 완전히 별개이기 때문에 해고예고수당을 받았다고 실업급여가 줄어들거나, 반대로 실업급여를 받는다고 해고예고수당을 못 받는 일은 없어요. 사용자가 30일 전에 해고 예고를 하지 않으면 <strong>30일분 이상의 통상임금</strong>을 지급해야 해요.
          </p>

          <SpokeFlow
            steps={[
              { icon: '📋', label: '해고 통보', sub: '30일 전 예고?' },
              { icon: '❌', label: '예고 없음', sub: '즉시 해고' },
              { icon: '💰', label: '수당 청구', sub: '30일분 통상임금' },
              { icon: '📑', label: '실업급여', sub: '별도 신청' },
            ]}
          />

          <SpokeChecklist
            items={[
              { text: '해고 예고 없이 즉시 해고 → 30일분 통상임금 청구 가능', done: true },
              { text: '해고예고수당 받아도 실업급여 수급에 영향 없음', done: true },
              { text: '근속 3개월 미만은 해고예고수당 적용 제외', done: false, note: '근로기준법 제26조 단서' },
              { text: '일용근로자는 해고예고 의무 적용 제외', done: false, note: '근로기준법 제35조' },
              { text: '천재지변·근로자 중과실도 예외 대상', done: false, note: '노동위원회 인정 필요' },
              { text: '미지급 시 사용자에게 2년 이하 징역 또는 2,000만원 이하 벌금', done: true },
            ]}
          />

          <TipBox title="해고예고수당 계산 예시">
            월 통상임금 300만원인 근로자가 예고 없이 해고당하면, 300만원(30일분)을 해고예고수당으로 받아요. 여기에 더해 <a href="/w/실업급여-수급-조건-자격-요건-완벽정리" className="text-[#4A7AB5] underline">실업급여</a>도 별도로 신청할 수 있어요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '/w/실업급여-퇴사유형별-수급-자격-권고사직-자진퇴사-해고',
        badge: '전체 비교',
        title: '다른 퇴사유형의 실업급여 조건도 궁금하다면',
        desc: '권고사직·자진퇴사·계약만료·해고 유형별 수급 자격을 한눈에 비교할 수 있어요.',
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
    {
      question: '해고 실업급여 신청할 때 필요한 서류는 뭔가요?',
      answer: '이직확인서(사업주가 고용센터에 제출), 신분증, 통장사본이 기본이에요. 사업주가 이직확인서를 안 내주면 고용센터에 직접 <strong>확인 청구</strong>를 할 수 있어요.',
    },
    {
      question: '부당해고 구제신청을 하면 실업급여를 못 받나요?',
      answer: '<strong>아니에요.</strong> 부당해고 구제신청과 실업급여는 별개 절차예요. 동시에 진행할 수 있고, 구제신청 결과와 관계없이 실업급여 수급은 유지돼요.',
    },
    {
      question: '해고예고수당과 퇴직금을 둘 다 받을 수 있나요?',
      answer: '<strong>네.</strong> 해고예고수당(근로기준법)과 퇴직금(근로자퇴직급여보장법)은 별개 제도예요. 1년 이상 근속했다면 퇴직금 + 해고예고수당 + 실업급여, 3가지를 모두 받을 수 있어요.',
    },
    {
      question: '징계해고 당하면 퇴직금은 못 받나요?',
      answer: '징계해고라도 <strong>퇴직금은 반드시 지급</strong>해야 해요. 퇴직금은 1년 이상 근속한 근로자의 법적 권리이고, 해고 사유와 상관없어요.',
    },
  ],

  relatedSpokes: [
    { badge: '권고사직', title: '권고사직 실업급여 수급 조건과 합의서 작성법', desc: '합의서 작성 요령과 이직확인서 기재 방법', href: '/w/권고사직-실업급여-수급-조건-절차-합의서' },
    { badge: '수급조건', title: '실업급여 수급 조건과 자격 요건 완벽정리', desc: '피보험기간·이직사유·구직활동 3가지 요건', href: '/w/실업급여-수급-조건-자격-요건-완벽정리' },
    { badge: '계약만료', title: '계약직 계약만료 실업급여 수급 요건', desc: '재계약 거부, 갱신 기대권, 피보험기간 계산', href: '/w/계약직-계약만료-실업급여-수급-요건-재계약' },
    { badge: '자진퇴사', title: '자진퇴사 실업급여 예외 사유 정리', desc: '정당한 이직 사유 12가지와 증빙 서류', href: '/w/자진퇴사-자발적-퇴사-실업급여-예외-사유' },
  ],

  sources: [
    { name: '고용보험법 제58조 (이직 사유에 따른 수급자격의 제한)', url: 'https://www.law.go.kr/법령/고용보험법', org: '법제처' },
    { name: '근로기준법 제26조 (해고의 예고)', url: 'https://www.law.go.kr/법령/근로기준법', org: '법제처' },
    { name: '실업급여 안내', url: 'https://www.ei.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePb0201Info.do', org: '고용보험' },
    { name: '부당해고 구제절차 안내', url: 'https://www.easylaw.go.kr/CSP/CnpClsMainBtr.laf?popMenu=ov&csmSeq=514&ccfNo=5&cciNo=1&cnpClsNo=1', org: '찾기쉬운 생활법령정보' },
  ],
}

export default data
