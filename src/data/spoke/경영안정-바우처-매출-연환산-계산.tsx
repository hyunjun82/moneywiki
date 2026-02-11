import Link from 'next/link'
import type { SpokeData } from './types'
import { FormulaBox, SpokeTable, SpokeStepCards, SpokeRateBars, SpokeChecklist, TipBox, SpokeCompareCards, SpokeFlow } from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '경영안정-바우처-매출-연환산-계산',

  meta: {
    title: '경영안정바우처 매출 연환산 계산 방법 창업 첫해',
    description: '창업한 지 1년이 안 됐는데 매출 기준을 어떻게 적용하는지 아시나요? 매출 연환산 계산 방법과 창업 첫해 기준을 알려드려요',
    keywords: ['경영안정바우처 매출 연환산', '매출 연환산 계산', '창업 첫해 매출', '매출 기준 계산법'],
    ogTitle: '경영안정바우처 매출 연환산 계산 방법 | 머니위키',
    ogDescription: '매출 연환산 계산법, 창업 첫해 기준, 매출 증빙 방법까지 정리',
  },

  hub: {
    url: '/w/경영안정바우처-신청-사용처-금액',
    name: '경영안정바우처 신청 사용처 금액',
  },

  breadcrumb: ['사업', '경영안정바우처 매출 연환산'],

  hero: {
    badge: '2026년 기준',
    h1: <>경영안정바우처 <span className="text-[#1E3A5F]">매출 연환산</span> — 계산 방법과 창업 첫해 기준</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          2025년 중간에 창업했는데 매출 기준이 어떻게 적용되는지 궁금하다면 잘 오셨어요. 1년 미만 영업한 사업체는 <strong>매출을 12개월로 환산(연환산)</strong>해서 기준 충족 여부를 판단해요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          연환산 계산이 어렵지 않아요. 월평균 매출에 12를 곱하면 돼요. 전체 바우처 정보가 궁금하면 <Link href="/w/경영안정바우처-신청-사용처-금액" className="text-blue-600 hover:underline">경영안정바우처 신청 사용처 금액 총정리</Link>를 함께 보세요. 연환산 계산부터 볼게요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '경영안정바우처 신청부터 사용까지 전체 흐름 확인하기',
    },
  },

  toc: [
    { id: 's1', text: '매출 연환산이란 무엇인가요?' },
    { id: 's2', text: '연환산 계산은 어떻게 하나요?' },
    { id: 's3', text: '창업 첫해 매출 기준은 어떻게 되나요?' },
    { id: 's4', text: '매출 증빙은 어떻게 하나요?' },
    { id: 's5', text: '자주 묻는 질문' },
  ],

  sections: [
    /**
     * ===== S1: 연환산 개념 =====
     * 패턴: 개념 설명 → FormulaBox + SpokeTable
     * 전환 스타일: A. 독자 대변형
     */
    {
      id: 's1',
      number: '01',
      heading: '매출 연환산이란 무엇인가요?',
      subtitle: '1년 미만 영업 매출을 12개월 기준으로 환산하는 거예요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            매출 연환산은 <strong>1년 미만 영업한 사업체의 매출을 12개월 기준으로 환산</strong>하는 계산법이에요. 경영안정바우처 대상 기준이 '연 매출 1억 400만원 미만'인데, 2025년 중간에 개업한 사업체는 1년치 매출이 없잖아요. 이런 경우에 연환산을 적용해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            예를 들어 2025년 7월에 개업해서 6개월간 영업한 사업체의 매출이 5,000만원이라면, 1년으로 환산하면 1억원이에요. 이 연환산 매출이 1억 400만원 미만이면 바우처 대상이 되는 거예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            연환산은 경영안정바우처뿐만 아니라 소상공인 정책자금 전반에서 공통적으로 사용하는 방법이에요. 국세청에 신고된 매출 자료를 기준으로 자동 계산되기 때문에 직접 계산할 필요는 없지만, 내가 대상인지 미리 확인하고 싶을 때 알아두면 유용해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            연환산의 핵심은 '월평균 매출'이에요. 영업 기간의 총 매출을 영업 개월수로 나눈 뒤 12를 곱하면 연환산 매출이 나와요.
          </p>

          <FormulaBox
                        lines={[
              { text: '1. 연환산 매출 = (총 매출 / 영업 개월수) x 12', numbered: true },
              { text: '// 또는 (같은 결과)', comment: true },
              { text: '2. 연환산 매출 = 월평균 매출 x 12', numbered: true },
            ]}
          />

          <SpokeTable
            id="example-calc"
            title="연환산 매출 계산 예시"
            subtitle="개업 시기별 환산 결과"
            headers={['개업 시기', '영업 기간', '실제 매출', '연환산 매출']}
            rows={[
              ['2025년 1월', '12개월', '8,000만원', '8,000만원 (환산 불필요)'],
              ['2025년 7월', '6개월', '4,000만원', '8,000만원'],
              ['2025년 10월', '3개월', '2,500만원', '1억원'],
              ['2025년 11월', '2개월', '2,000만원', '1억 2,000만원 (초과)'],
            ]}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            구체적인 계산 방법이 궁금하잖아요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '계산법',
        title: '연환산은 어떻게 계산하나요?',
        desc: '단계별 연환산 계산 방법 확인',
        icon: 'calc',
      },
    },

    /**
     * ===== S2: 연환산 계산 =====
     * 패턴: 단계별 계산 → SpokeStepCards + SpokeRateBars
     * 전환 스타일: B. 정보 예고형
     */
    {
      id: 's2',
      number: '02',
      heading: '연환산 계산은 어떻게 하나요?',
      subtitle: '총 매출을 영업 개월수로 나누고 12를 곱하면 돼요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            연환산 계산은 3단계로 진행돼요. 먼저 개업일부터 2025년 12월 말까지의 <strong>영업 개월수</strong>를 파악해요. 그다음 그 기간의 총 매출을 영업 개월수로 나눠서 월평균 매출을 구해요. 마지막으로 월평균 매출에 12를 곱하면 연환산 매출이 나와요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            영업 개월수는 개업일이 속한 달을 1개월로 치고 계산해요. 예를 들어 10월 20일에 개업했으면 10월, 11월, 12월 = 3개월이에요. 개업 첫 달의 영업일수가 적더라도 1개월로 산정돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            실제 계산 예시를 볼게요. 2025년 10월 15일에 개업해서 3개월간 매출이 2,100만원이라면 월평균은 700만원이에요. 700만원 x 12 = 8,400만원이 연환산 매출이에요. 1억 400만원 미만이니까 바우처 대상이 돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            반대로 같은 기간에 매출이 3,000만원이면 월평균 1,000만원, 연환산 1억 2,000만원이 돼서 기준을 초과해요. 이 경우 바우처 대상에서 제외돼요.
          </p>

          <SpokeStepCards
                        steps={[
              { title: '영업 개월수 파악', desc: '개업일부터 2025년 12월까지의 개월수', tip: '개업 달 포함' },
              { title: '월평균 매출 계산', desc: '총 매출 / 영업 개월수', tip: '국세청 신고 매출 기준' },
              { title: '12 곱하기', desc: '월평균 매출 x 12 = 연환산 매출', tip: '1억 400만원 미만이면 대상' },
            ]}
          />

          <SpokeRateBars
                        bars={[
              { label: '3개월 총 매출', rate: '2,100만원', width: '25%' },
              { label: '월평균 매출', rate: '700만원', width: '8%' },
              { label: '연환산 매출', rate: '8,400만원', width: '81%' },
              { label: '기준 (1억 400만원)', rate: '기준선', width: '100%' },
            ]}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            그런데 창업 첫해에는 매출 패턴이 불규칙한 경우가 많은데, 이런 상황에서 어떻게 적용되는지도 알아둬야 해요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '첫해 기준',
        title: '창업 첫해는 어떻게 적용되나요?',
        desc: '창업 첫해 특수 상황별 매출 기준',
        icon: 'info',
      },
    },

    /**
     * ===== S3: 창업 첫해 =====
     * 패턴: 특수 상황 → SpokeChecklist + TipBox
     * 전환 스타일: C. 간결 연결형
     */
    {
      id: 's3',
      number: '03',
      heading: '창업 첫해 매출 기준은 어떻게 되나요?',
      subtitle: '영업 기간이 짧을수록 연환산 결과가 크게 나올 수 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            창업 첫해에는 영업 기간이 짧기 때문에 연환산 매출이 실제보다 높게 나올 수 있어요. 예를 들어 12월에 개업해서 1개월간 매출이 900만원이면 연환산은 1억 800만원이 돼서 기준을 초과해요. 실제로는 연 매출이 그만큼 안 될 수도 있는데 말이에요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            이런 경우가 발생할 수 있다는 점을 유의해야 해요. 영업 개월수가 1~2개월로 매우 짧으면 연환산 결과가 부풀려질 수 있어요. 반면에 영업 기간이 6개월 이상이면 연환산 결과가 실제 연간 매출과 비슷해져서 좀 더 정확해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            개업 초기에 오픈 이벤트 등으로 매출이 일시적으로 높았다면, 연환산 결과가 기준을 초과할 수 있어요. 이런 상황은 사업자가 제어하기 어려운 부분이에요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            2026년 1월 이후에 개업한 사업체는 이번 바우처 대상이 아니에요. 2025년 12월 31일 이전 개업이 요건이니까, 2026년 신규 개업자는 다음 기회를 기다려야 해요.
          </p>

          <SpokeChecklist
                        items={[
              { text: '영업 기간이 짧으면 연환산 매출이 높게 나올 수 있다', done: false, note: '1~2개월 영업 시 특히 주의' },
              { text: '오픈 초기 매출이 높았다면 연환산 기준 초과 가능', done: false, note: '이벤트 매출 포함' },
              { text: '영업 6개월 이상이면 연환산이 비교적 정확하다', done: false, note: '안정적인 추정치' },
              { text: '2026년 개업은 이번 바우처 대상이 아니다', done: false, note: '2025.12.31 이전 개업 필수' },
            ]}
          />

          <TipBox title="연환산 결과가 기준을 살짝 초과하면?">
            <p className="mb-0 leading-relaxed">
              연환산 매출이 1억 400만원을 약간 넘는 경우, 자격 검증에서 부적격 처리될 수 있어요. 이 경우 소상공인시장진흥공단(1533-0600)에 문의해서 이의 제기를 해볼 수 있어요. 다만 국세청 매출 자료가 기준이라 변경이 어려울 수 있다는 점은 참고하세요.
            </p>
          </TipBox>

          <p className="text-neutral-600 mb-4 leading-relaxed">
            연환산 매출이 어떤 자료를 기반으로 계산되는지, 매출 증빙은 어떻게 되는지도 알아두면 도움이 돼요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '증빙',
        title: '매출 자료는 어떻게 확인되나요?',
        desc: '매출 증빙 방법과 확인 경로',
        icon: 'check',
      },
    },

    /**
     * ===== S4: 매출 증빙 =====
     * 패턴: 증빙 방법 → SpokeCompareCards + SpokeFlow
     * 전환 스타일: 없음 (마지막 섹션)
     */
    {
      id: 's4',
      number: '04',
      heading: '매출 증빙은 어떻게 하나요?',
      subtitle: '별도 서류 없이 국세청 자료로 자동 확인돼요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            경영안정바우처 신청 시 <strong>매출 증빙을 별도로 제출하지 않아도 돼요.</strong> 국세청에 신고된 부가가치세 매출 자료를 기반으로 자동 검증되는 구조예요. 면세사업자는 사업장 현황 신고서의 수입금액이 기준이에요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            자동 검증이 가능한 이유는 신청 시 '정보 제공 동의'를 하기 때문이에요. 이 동의를 통해 국세청 매출 자료와 사업자 정보를 자동으로 대조해요. 사업자가 별도로 매출 증빙 서류를 준비하거나 업로드할 필요가 없어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            다만 내 매출이 정확히 얼마로 잡혀 있는지 미리 확인하고 싶다면 <a href="https://www.hometax.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">홈택스(hometax.go.kr)</a>에서 확인할 수 있어요. '조회/발급' 메뉴에서 부가가치세 신고 내역을 보면 연간 매출 합계를 알 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            간이과세자의 경우 공급대가(부가세 포함 매출)가 기준이에요. 일반과세자는 공급가액(부가세 제외)이 기준인데, 어떤 기준이든 국세청 자료로 자동 확인되니 직접 계산할 필요는 없어요.
          </p>

          <SpokeCompareCards
            cards={[
              { title: '사전 확인', subtitle: '선택 사항', items: ['홈택스 로그인', '부가세 신고 내역 조회', '연간 매출 합계 확인', '연환산 필요 시 직접 계산'] },
              { title: '자동 검증', subtitle: '필수 절차', items: ['바우처 신청 시 정보 동의', '국세청 자료 자동 대조', '매출 기준 충족 여부 판단', '별도 서류 제출 불필요'], recommended: true, recLabel: '권장' }
            ]}
          />

          <SpokeFlow
                        steps={[
              { icon: '1', label: '바우처 신청', sub: '정보 제공 동의' },
              { icon: '2', label: '국세청 자료 조회', sub: '매출 자동 확인' },
              { icon: '3', label: '연환산 적용', sub: '신규 개업자 해당 시' },
              { icon: '4', label: '적격 판정', sub: '충전 진행' },
            ]}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            매출 연환산과 증빙 방법을 확인했다면, 본인이 바우처 대상인지 종합적으로 판단해 보세요. <Link href="/w/경영안정-바우처-신청-대상-매출-기준" className="text-blue-600 hover:underline">경영안정바우처 신청 대상과 매출 기준</Link>에서 전체 요건을 확인할 수 있어요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '/w/경영안정바우처-신청-사용처-금액',
        badge: '전체 가이드',
        title: '바우처 전체 정보를 한눈에 보고 싶다면?',
        desc: '경영안정바우처 전체 과정 확인하기',
        icon: 'grid',
        primary: true,
      },
    },

    {
      id: 's5',
      number: '05',
      heading: '자주 묻는 질문',
      subtitle: '자주 묻는 질문이에요',
      content: null,
    },
  ],

  faq: [
    {
      question: '2025년 12월에 개업하면 연환산 매출이 너무 높게 나오는데 어떡하나요?',
      answer: '영업 기간이 1개월이면 그 달 매출 x 12가 연환산 매출이 돼요. 1개월 매출이 870만원 이상이면 연환산이 1억 400만원을 넘어서 대상에서 제외돼요. 이 경우 이의 제기를 해볼 수 있지만, 국세청 자료 기준이라 변경이 어려울 수 있어요.',
    },
    {
      question: '홈택스에서 내 매출이 실제와 다르게 보여요. 어떻게 하나요?',
      answer: '부가세 신고 시 매출을 과소·과다 신고한 경우 수정신고를 해야 해요. 수정신고 후 반영된 금액이 바우처 자격 검증에 적용돼요. 다만 수정신고에 시간이 걸릴 수 있어서 바우처 신청 전에 미리 처리하는 게 좋아요.',
    },
  ],

  relatedSpokes: [
    { badge: '대상', title: '경영안정바우처 신청 대상과 매출 기준', desc: '누가 대상이고 매출 기준이 어떻게 되는지', href: '/w/경영안정-바우처-신청-대상-매출-기준' },
    { badge: '사업장', title: '공동대표와 다수 사업장 기준', desc: '공동대표, 복수 사업장 수혜 기준', href: '/w/경영안정-바우처-공동대표-다수-사업장' },
    { badge: '신청', title: '경영안정바우처 신청 방법과 홀짝제', desc: '온라인 접수 방법과 홀짝제 일정', href: '/w/경영안정-바우처-신청-방법-홀짝제' },
    { badge: '중복', title: '바우처 중복 수혜와 배달비 크레딧', desc: '다른 지원금과 겹치는 경우', href: '/w/경영안정-바우처-중복-수혜-배달비-크레딧' },
  ],

  sources: [
    { name: '소상공인 경영안정 바우처 지원사업 시행 공고', url: 'https://www.bizinfo.go.kr/sii/siia/selectSIIA200Detail.do?pblancId=PBLN_000000000117908', org: '기업마당(중소벤처기업부)' },
    { name: '영세 소상공인 고정비 부담 완화 보도자료', url: 'https://www.mss.go.kr/site/smba/ex/bbs/View.do?cbIdx=86&bcIdx=1065091', org: '중소벤처기업부' },
    { name: '국세청 홈택스', url: 'https://www.hometax.go.kr', org: '국세청' },
  ],
}

export default data
