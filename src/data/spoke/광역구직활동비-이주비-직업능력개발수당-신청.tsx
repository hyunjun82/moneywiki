import type { SpokeData } from '@/data/spoke/types'
import {
  SpokeTable, FormulaBox, TipBox, WarnBox,
  SpokeRateBars, SpokeWarnBox, SpokeCompareCards,
  SpokeFlow, SpokeChecklist, SpokeTimeline,
} from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '광역구직활동비-이주비-직업능력개발수당-신청',

  meta: {
    title: '광역구직활동비 이주비 직업능력개발수당 신청 조건 | 취업촉진수당 비교',
    description: '면접 교통비부터 이사비용까지 고용센터에서 지원받을 수 있어요. 광역구직활동비·이주비·직업능력개발수당 신청 조건과 금액을 정리했어요.',
    keywords: [
      '광역구직활동비 신청 조건',
      '이주비 실업급여 신청 방법',
      '직업능력개발수당 훈련비 지원',
      '취업촉진수당 종류 비교',
    ],
    ogTitle: '광역구직활동비 이주비 직업능력개발수당 신청 | 머니위키',
    ogDescription: '면접 교통비·이사비·훈련비 지원 조건과 금액을 한번에 확인하세요.',
  },

  hub: {
    url: '/w/실업급여-취업촉진수당-연장급여-부정수급-2026',
    name: '실업급여 취업촉진수당·연장급여·부정수급 2026년 총정리',
  },

  breadcrumb: ['고용·노동', '실업급여', '광역구직활동비·이주비·직업능력개발수당'],

  summary3: [
    <>광역구직활동비는 거주지에서 <strong>25km 이상</strong> 떨어진 곳 면접 시 교통비·숙박비 지원</>,
    <>이주비는 취업을 위해 이사할 때 <strong>이삿짐 운송 실비</strong>를 지원해요</>,
    <>직업능력개발수당은 훈련 수강일마다 <strong>1일 10,320원</strong> 지급해요</>,
  ],

  sourceBar: {
    badge: '출처',
    name: '고용보험법 제65~67조 · 고용노동부',
    date: '2026.01',
  },

  prevNext: {
    prev: { title: '연장급여 훈련연장 개별연장 특별연장 조건 비교', href: '/w/연장급여-훈련연장-개별연장-특별연장-조건-비교' },
    next: { title: '실업급여 부정수급 유형 제재 벌금 5배 추징', href: '/w/실업급여-부정수급-유형-제재-벌금-추징' },
  },

  stickyBar: {
    topLabel: '직업능력개발수당',
    value: '1일 10,320원',
    buttonText: '신청 절차 보기 →',
    scrollTo: '#s3',
  },

  hero: {
    badge: '2026년 기준',
    h1: (
      <>
        광역구직활동비·이주비·<span className="text-[#1E3A5F]">직업능력개발수당</span> 신청 조건과 금액
      </>
    ),
    intro: (
      <p className="text-base text-neutral-500 leading-relaxed">
        먼 곳까지 면접을 보러 가는데 교통비가 부담되셨다면 잘 오셨어요. <a href="/w/실업급여-취업촉진수당-연장급여-부정수급-2026" className="text-[#4A7AB5] underline">취업촉진수당</a>에는 <strong>조기재취업수당</strong> 외에도 교통비·이사비·훈련비를 지원하는 3가지 수당이 더 있어요. 광역구직활동비 25km 기준부터 직업능력개발수당 1일 10,320원까지, 먼저 각 수당의 조건부터 살펴볼게요.
      </p>
    ),
    hubCTA: {
      badge: '전체',
      desc: '실업급여 취업촉진수당·연장급여·부정수급 총정리',
    },
  },

  toc: [
    { id: 's1', label: '광역구직활동비 신청 조건은 어떻게 되나요?' },
    { id: 's2', label: '이주비 실업급여 신청은 어떻게 하나요?' },
    { id: 's3', label: '직업능력개발수당 훈련비는 얼마나 지원하나요?' },
    { id: 's4', label: '취업촉진수당 종류별 차이를 비교할 수 있나요?' },
    { id: 's-faq', label: '자주 묻는 질문' },
  ],

  sections: [
    {
      id: 's1',
      number: 'SECTION 01',
      heading: '광역구직활동비 신청 조건은 어떻게 되나요?',
      subtitle: '거주지에서 25km 이상 떨어진 곳에 면접 보면 교통비·숙박비를 받아요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            광역구직활동비는 <strong>고용센터의 소개</strong>를 받아 먼 곳에서 면접을 볼 때 교통비와 숙박비를 지원하는 수당이에요. 단순히 혼자 지원한 면접이 아니라, 고용센터가 알선한 구직활동이어야 한다는 점이 핵심이에요. 거주지에서 사업장까지 <strong>25km 이상</strong> 떨어져 있어야 하고, 사업주가 교통비를 주지 않거나 부족하게 줄 때 신청할 수 있어요.
          </p>

          <FormulaBox
            lines={[
              { text: '광역구직활동비 수급 요건 (2가지 모두 충족)', comment: true },
              { text: '1. 거주지 ↔ 면접 사업장 거리 25km 이상', numbered: true },
              { text: '2. 사업주 교통비 미지급 또는 부족', numbered: true },
            ]}
          />

          <SpokeRateBars
            bars={[
              { label: '운임', rate: '실비 전액', width: '100%' },
              { label: '숙박료', rate: '1박 10만원 이내', width: '60%' },
            ]}
          />

          <TipBox title="청구 기한은 면접 후 14일 이내예요">
            광역구직활동이 끝난 날부터 14일 안에 수급자격증과 함께 고용센터에 청구서를 제출해야 해요. 기한을 놓치면 지급받지 못할 수 있어요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '이주비',
        title: '취업이 확정돼서 이사까지 해야 한다면?',
        desc: '이삿짐 운송비도 고용센터에서 지원받을 수 있어요.',
        icon: 'check',
      },
    },

    {
      id: 's2',
      number: 'SECTION 02',
      heading: '이주비 실업급여 신청은 어떻게 하나요?',
      subtitle: '취업·훈련을 위해 이사할 때 이삿짐 운송 실비를 지원해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            면접비 정도야 감당할 수 있지만, 취업 때문에 이사까지 해야 한다면 부담이 커지잖아요. 이주비는 취업하거나 고용센터가 지시한 직업훈련을 받기 위해 <strong>주거를 이전</strong>할 때 이삿짐 운송비를 지원하는 수당이에요. 고용보험법 제67조에 근거하고 있어요.
          </p>

          <SpokeWarnBox title="이주비 수급 요건 3가지 (모두 충족해야 해요)">
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>고용센터장이 주거 변경이 필요하다고 <strong>인정</strong>할 것</li>
              <li>사업주가 이주 비용을 지급하지 않거나 <strong>부족</strong>할 것</li>
              <li>취업의 경우 <strong>1년 이상</strong> 근로계약을 체결할 것</li>
            </ul>
          </SpokeWarnBox>

          <SpokeCompareCards
            cards={[
              {
                title: '취업을 위한 이주',
                subtitle: '1년 이상 근로계약 필수',
                items: [
                  '고용센터 알선 또는 자체 취업',
                  '1년 이상 근로계약 체결',
                  '사업주가 이사비 미지급',
                  '이주일로부터 14일 내 청구',
                ],
              },
              {
                title: '훈련을 위한 이주',
                subtitle: '고용센터 지시 훈련만 해당',
                items: [
                  '고용센터장의 훈련 지시 필수',
                  '근로계약 조건 없음',
                  '훈련기관 소재지로 이전',
                  '새 거주지 관할 고용센터에 청구',
                ],
                recommended: true,
                recLabel: '계약 조건 없음',
              },
            ]}
          />

          <TipBox title="이주비는 동거 가족 이사비까지 포함해요">
            수급자격자 본인뿐 아니라 생계를 같이하는 동거 친족의 이주 비용도 함께 산정돼요. 5톤 이하는 실비 전액, 5톤 초과 7.5톤 이하는 5톤 기준액에 초과분의 50%를 더해서 계산해요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '훈련비',
        title: '직업훈련 중 교통비·식비까지 지원된다면?',
        desc: '직업능력개발수당은 훈련 수강일마다 1일 10,320원을 지급해요.',
        icon: 'calc',
      },
    },

    {
      id: 's3',
      number: 'SECTION 03',
      heading: '직업능력개발수당 훈련비는 얼마나 지원하나요?',
      subtitle: '고용센터 지시 훈련을 받으면 수강일마다 1일 10,320원이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            구직급여를 받는 동안 직업훈련까지 받으면 생활비가 빠듯해지는 게 당연해요. 직업능력개발수당은 <strong>고용센터장의 지시</strong>를 받아 직업능력개발훈련을 수강하는 날마다 <strong>1일 10,320원</strong>을 지급하는 수당이에요. 구직급여와 별도로 받을 수 있어서 훈련 기간 중 추가 수입이 되는 셈이에요.
          </p>

          <SpokeTable
            id="tbl-training"
            title="직업능력개발수당 지급 기준"
            subtitle="고용보험법 제65조, 시행령 제88조 기준"
            headers={['항목', '내용']}
            rows={[
              ['일 지급액', '10,320원 (훈련 수강일 한정)'],
              ['월 예상 금액', '약 206,400원 (월 20일 수강 시)'],
              ['지급일', '구직급여 지급일에 함께 입금'],
              ['청구 방법', '실업인정일에 수강증명서 제출'],
              ['차감 조건', '공공단체 교통비·식비 별도 수령 시 차감'],
            ]}
            highlightCol={1}
          />

          <SpokeFlow
            steps={[
              { icon: '📋', label: '고용센터', sub: '훈련 지시' },
              { icon: '🎓', label: '훈련 수강', sub: '출석 확인' },
              { icon: '📄', label: '수강증명서', sub: '실업인정일 제출' },
              { icon: '💰', label: '수당 입금', sub: '구직급여와 동시' },
            ]}
          />

          <WarnBox>
            <strong>주의:</strong> 고용센터의 훈련 지시를 <strong>정당한 사유 없이 거부</strong>하면 구직급여 수급이 정지돼요. 정지 기간에는 직업능력개발수당도 받을 수 없어요.
          </WarnBox>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '비교',
        title: '3가지 수당, 어떤 차이가 있을까요?',
        desc: '광역구직활동비·이주비·직업능력개발수당을 한눈에 비교해요.',
        icon: 'grid',
      },
    },

    {
      id: 's4',
      number: 'SECTION 04',
      heading: '취업촉진수당 종류별 차이를 비교할 수 있나요?',
      subtitle: '조기재취업수당까지 4종류, 상황에 맞는 수당을 확인하세요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            취업촉진수당은 총 4종류예요. <a href="/w/조기재취업수당-신청-조건-금액-잔여일수-계산" className="text-[#4A7AB5] underline">조기재취업수당</a>은 빨리 취업했을 때, 광역구직활동비는 먼 곳에 면접을 볼 때, 이주비는 이사할 때, 직업능력개발수당은 훈련받을 때 각각 지원돼요. 하나만 받는 게 아니라 조건에 해당하면 <strong>여러 수당을 동시에</strong> 받을 수 있다는 게 포인트예요.
          </p>

          <SpokeChecklist
            items={[
              { text: '광역구직활동비: 25km 이상 면접 교통비·숙박비 실비', done: true, note: '면접 후 14일 내 청구' },
              { text: '이주비: 취업·훈련 이사비 실비 (1년 이상 계약)', done: true, note: '이주 후 14일 내 청구' },
              { text: '직업능력개발수당: 훈련일 1일 10,320원', done: true, note: '실업인정일에 수강증명서 제출' },
              { text: '조기재취업수당: 잔여일수 1/2 이상 남기고 취업', done: true, note: '12개월 이상 계속 고용 시 지급' },
            ]}
          />

          <SpokeTimeline
            events={[
              { month: '구직 시작', title: '구직급여 수급 개시', desc: '고용센터에서 실업인정 시작' },
              { month: '면접 이동', title: '광역구직활동비 청구', desc: '25km 이상 면접 후 14일 내 청구', status: 'current' },
              { month: '훈련 수강', title: '직업능력개발수당 수령', desc: '수강일마다 1일 10,320원 지급' },
              { month: '취업 확정', title: '이주비 또는 조기재취업수당', desc: '이사 시 이주비, 조기재취업 시 수당 청구' },
            ]}
          />

          <TipBox title="구직급여와 취업촉진수당은 별개예요">
            구직급여(실업급여)를 받으면서 광역구직활동비·직업능력개발수당을 동시에 받을 수 있어요. <a href="/w/실업급여-고용센터-찾기-고용24-사용법" className="text-[#4A7AB5] underline">고용24</a>에서 온라인으로도 신청 가능해요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '/w/실업급여-취업촉진수당-연장급여-부정수급-2026',
        badge: '허브',
        title: '실업급여 전체 제도가 궁금하다면?',
        desc: '취업촉진수당·연장급여·부정수급까지 실업급여 제도를 한눈에 정리했어요.',
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
    { question: '광역구직활동비와 이주비를 동시에 받을 수 있나요?', answer: '<strong>네.</strong> 두 수당은 지급 사유가 다르기 때문에 조건을 각각 충족하면 동시에 받을 수 있어요. 면접 교통비(광역구직활동비)와 이사비(이주비)는 별개 항목이에요.' },
    { question: '고용센터 소개 없이 혼자 면접 보면 광역구직활동비를 못 받나요?', answer: '<strong>그래요.</strong> 광역구직활동비는 고용센터의 소개(알선)를 받아 구직활동을 한 경우에만 지급돼요. 개인적으로 지원한 면접은 대상이 아니에요.' },
    { question: '직업능력개발수당은 내일배움카드 훈련에도 나오나요?', answer: '직업능력개발수당은 <strong>고용센터장의 훈련 지시</strong>를 받은 경우에 지급돼요. 내일배움카드로 자율 수강하는 것과는 별개이므로, 고용센터에서 훈련 지시를 받았는지 확인이 필요해요.' },
    { question: '이주비 청구 기한을 넘기면 어떻게 되나요?', answer: '이주일로부터 <strong>14일</strong>이 청구 기한이에요. 천재지변 등 불가항력적 사유가 있으면 7일 연장되지만, 기한을 넘기면 지급이 거부될 수 있으니 이사 직후 바로 청구하는 게 좋아요.' },
  ],

  relatedSpokes: [
    { badge: '조기', title: '조기재취업수당 신청 조건 금액 잔여일수 계산법', desc: '소정급여일수 절반 이상 남기고 취업하면 받는 수당', href: '/w/조기재취업수당-신청-조건-금액-잔여일수-계산' },
    { badge: '고용24', title: '실업급여 고용센터 찾기 고용24 사용법', desc: '온라인으로 실업급여 신청하는 방법', href: '/w/실업급여-고용센터-찾기-고용24-사용법' },
    { badge: '연장', title: '연장급여 훈련연장 개별연장 특별연장 조건 비교', desc: '구직급여 끝나도 최대 2년 더 받는 방법', href: '/w/연장급여-훈련연장-개별연장-특별연장-조건-비교' },
    { badge: '부정', title: '실업급여 부정수급 유형 제재 벌금 5배 추징', desc: '부정수급 시 최대 5배 추징 + 형사처벌', href: '/w/실업급여-부정수급-유형-제재-벌금-추징' },
  ],

  sources: [
    { name: '고용보험법 제65~67조 (취업촉진수당)', url: 'https://www.law.go.kr/법령/고용보험법', org: '법제처' },
    { name: '실업급여 안내', url: 'https://www.ei.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePb0201Info.do', org: '고용보험' },
    { name: '취업촉진수당 안내', url: 'https://easylaw.go.kr/CSP/CnpClsMainBtr.laf?popMenu=ov&csmSeq=722&ccfNo=3&cciNo=1&cnpClsNo=3', org: '찾기쉬운 생활법령정보' },
  ],
}

export default data
