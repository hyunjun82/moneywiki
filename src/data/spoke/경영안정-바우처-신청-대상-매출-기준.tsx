import Link from 'next/link'
import type { SpokeData } from './types'
import { SpokeTable, FormulaBox, SpokeChecklist, SpokeRateBars, SpokeCompareCards, TipBox, SpokeFlow, RateCards } from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '경영안정-바우처-신청-대상-매출-기준',

  meta: {
    title: '경영안정바우처 신청 대상 매출 기준 업종 제한 총정리',
    description: '매출이 얼마 이하여야 경영안정바우처를 받을 수 있는지 아시나요? 신청 대상 조건부터 제외 업종까지 한 번에 알려드려요',
    keywords: ['경영안정바우처 신청 대상', '경영안정바우처 매출 기준', '소상공인 바우처 자격', '바우처 업종 제한'],
    ogTitle: '경영안정바우처 신청 대상 매출 기준 업종 제한 | 머니위키',
    ogDescription: '소상공인 경영안정바우처 신청 대상, 매출 기준, 제외 업종까지 상세 정리',
  },

  hub: {
    url: '/w/경영안정바우처-신청-사용처-금액',
    name: '경영안정바우처 신청 사용처 금액',
  },

  breadcrumb: ['사업', '경영안정바우처 신청 대상'],

  hero: {
    badge: '2026년 기준',
    h1: <>경영안정바우처 <span className="text-emerald-600">신청 대상</span> — 매출 기준과 업종 제한</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          소상공인 경영안정바우처 25만원을 받고 싶은데 내가 대상인지 아닌지 확실하지 않다면 잘 오셨어요. <strong>연 매출 1억 400만원 미만</strong>이면서 몇 가지 요건을 충족하면 신청할 수 있어요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          <a href="https://www.mss.go.kr/site/smba/ex/bbs/View.do?cbIdx=86&bcIdx=1065091" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">중소벤처기업부 보도자료</a>에 따르면 약 230만 명의 영세 소상공인이 대상이에요. 전체 신청 과정이 궁금하면 <Link href="/w/경영안정바우처-신청-사용처-금액" className="text-blue-600 hover:underline">경영안정바우처 신청 사용처 금액 총정리</Link>를 함께 보면 흐름이 잡혀요. 먼저 대상 조건부터 하나씩 볼게요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '경영안정바우처 신청부터 사용까지 전체 흐름 확인하기',
    },
  },

  toc: [
    { id: 's1', text: '경영안정바우처 신청 대상은 누구인가요?' },
    { id: 's2', text: '매출 기준은 얼마인가요?' },
    { id: 's3', text: '소상공인 자격 조건은 뭔가요?' },
    { id: 's4', text: '제외되는 업종은 어떤 게 있나요?' },
    { id: 's5', text: '자주 묻는 질문' },
  ],

  sections: [
    /**
     * ===== S1: 신청 대상 =====
     * 패턴: 핵심 요건 정리 → SpokeTable + FormulaBox
     * 전환 스타일: A. 독자 대변형
     */
    {
      id: 's1',
      number: '01',
      heading: '경영안정바우처 신청 대상은 누구인가요?',
      subtitle: '3가지 요건을 모두 충족해야 신청할 수 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            경영안정바우처는 영세 소상공인의 고정비 부담을 덜어주기 위한 지원금이에요. <a href="https://www.bizinfo.go.kr/sii/siia/selectSIIA200Detail.do?pblancId=PBLN_000000000117908" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">중소벤처기업부 시행 공고</a>에 따르면 3가지 요건을 <strong>모두</strong> 충족해야 신청할 수 있어요. 2025년 12월 31일 이전에 사업자등록을 마치고 개업한 사업체여야 하고, 연 매출이 0원 초과 1억 400만원 미만이어야 해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            신청일 기준으로 휴업이나 폐업 상태가 아니어야 해요. 현재 영업 중인 사업체만 대상이에요. 사업자등록증을 냈지만 매출이 0원인 경우에도 대상에서 빠져요. 최소한 매출 활동이 있어야 한다는 뜻이에요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            매출 확인은 국세청 신고 자료로 자동 검증되기 때문에 별도 서류를 제출하지 않아도 돼요. 다만 2025년 중간에 개업한 경우에는 연환산 매출을 적용하는데, 이건 뒤에서 자세히 다룰게요.
          </p>

          <SpokeTable
            id="target-req"
            title="경영안정바우처 신청 요건 3가지"
            subtitle="모두 충족해야 대상이에요"
            headers={['요건', '기준', '확인 방법']}
            rows={[
              ['개업일', '2025.12.31 이전 개업', '사업자등록증 확인'],
              ['매출 기준', '0원 초과 ~ 1억 400만원 미만', '국세청 자동 검증'],
              ['영업 상태', '신청일 기준 영업 중', '휴·폐업 아닌 상태'],
            ]}
          />

          <FormulaBox
                        lines={[
              { text: '개업일: 2025년 12월 31일 이전', numbered: true },
              { text: '매출: 0원 < 연 매출 < 1억 400만원', numbered: true },
              { text: '상태: 영업 중 (휴·폐업 X)', numbered: true },
              { text: '// 하나라도 미충족 시 제외: 3가지 모두 충족 → 신청 가능', comment: true },
            ]}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            내 매출이 기준에 해당하는지 좀 더 구체적으로 알고 싶잖아요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '매출 기준',
        title: '매출 기준이 정확히 얼마일까?',
        desc: '연 매출 1억 400만원 미만의 의미와 확인 방법',
        icon: 'calc',
      },
    },

    /**
     * ===== S2: 매출 기준 =====
     * 패턴: 매출 범위 → SpokeChecklist + SpokeRateBars
     * 전환 스타일: D. 화제 전환형
     */
    {
      id: 's2',
      number: '02',
      heading: '매출 기준은 얼마인가요?',
      subtitle: '국세청에 신고된 연 매출이 기준이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            경영안정바우처의 매출 기준은 <strong>2025년 연 매출 0원 초과 ~ 1억 400만원 미만</strong>이에요. 여기서 매출은 부가가치세 신고 시 국세청에 제출한 매출액을 기준으로 해요. 실제 통장 입금액이 아니라 세금 신고 기준이라 차이가 날 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            면세사업자는 사업장 현황 신고서의 수입금액을 기준으로 봐요. 간이과세자라면 부가세 신고서의 공급대가를 기준으로 해요. 매출이 정확히 1억 400만원이면 대상에서 제외되고, 1억 399만원 이하여야 해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            2025년 중간에 개업한 사업체는 실제 영업한 기간의 매출을 12개월로 환산해서 판단해요. 예를 들어 7월에 개업해서 6개월간 매출이 4,000만원이면, 연환산 매출은 8,000만원이 돼요. 이 부분은 <Link href="/w/경영안정-바우처-매출-연환산-계산" className="text-blue-600 hover:underline">매출 연환산 계산</Link>에서 자세히 다뤘어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            매출 0원인 사업체는 왜 제외될까요? 실질적인 영업 활동이 없다고 보기 때문이에요. 사업자등록만 해놓고 실제로 운영하지 않는 사업체를 걸러내기 위한 기준이에요.
          </p>

          <SpokeChecklist
                        items={[
              { text: '2025년 연 매출이 0원을 초과한다', done: false, note: '매출 0원이면 대상 제외' },
              { text: '2025년 연 매출이 1억 400만원 미만이다', done: false, note: '1억 400만원 이상이면 제외' },
              { text: '국세청에 매출을 정상 신고했다', done: false, note: '홈택스에서 확인 가능' },
              { text: '신규 개업이면 연환산 매출이 기준 이내다', done: false, note: '월평균 x 12개월' },
            ]}
          />

          <SpokeRateBars
                        bars={[
              { label: '매출 0원', rate: '제외', width: '5%' },
              { label: '0원 초과 ~ 5,000만원', rate: '대상', width: '48%' },
              { label: '5,000만원 ~ 1억 400만원 미만', rate: '대상', width: '95%' },
              { label: '1억 400만원 이상', rate: '제외', width: '100%' },
            ]}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            그런데 매출 기준 외에도 '소상공인'이라는 자격 자체에 대한 조건이 따로 있어요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '자격 조건',
        title: '소상공인이면 다 되는 걸까?',
        desc: '소상공인 기본 자격 요건 확인',
        icon: 'info',
      },
    },

    /**
     * ===== S3: 소상공인 자격 =====
     * 패턴: 자격 기준 비교 → SpokeCompareCards + TipBox
     * 전환 스타일: C. 간결 연결형
     */
    {
      id: 's3',
      number: '03',
      heading: '소상공인 자격 조건은 뭔가요?',
      subtitle: '상시근로자 수와 매출 규모로 판단해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            경영안정바우처는 '소상공인'에게 지급하는 지원금이에요. <a href="https://www.law.go.kr/법령/소상공인기본법" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">소상공인 기본법</a>에 따르면 소상공인은 업종별 상시근로자 수 기준을 충족하는 소규모 사업체를 말해요. 제조업·건설업·운수업은 10인 미만, 그 외 업종은 5인 미만이어야 해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            1인 사업자(직원 없이 본인만 운영)도 당연히 소상공인에 해당해요. 오히려 이번 바우처는 영세 소상공인을 주 대상으로 하기 때문에 1인 사업자에게 더 유리한 구조예요. 매출 기준이 1억 400만원 미만으로 낮게 설정된 것도 영세 사업체를 타겟으로 잡은 거예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            프랜차이즈 가맹점도 개별 사업자등록이 돼 있고 소상공인 요건을 충족하면 신청할 수 있어요. 법인 사업자도 소상공인 요건에 해당하면 대상이에요. 다만 비영리법인이나 조합은 제외돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            복수 사업장을 운영하는 경우, 모든 사업장의 상시근로자를 합산해서 소상공인 여부를 판단해요. 사업장 3개를 운영하는데 직원이 총 6명이면 소상공인이 아닐 수 있어요.
          </p>

          <SpokeCompareCards
            cards={[
              { title: '소상공인', subtitle: '경영안정바우처 대상', items: ['상시근로자 5인 미만 (서비스업 등)', '상시근로자 10인 미만 (제조업 등)', '연 매출 규모가 소규모', '경영안정바우처 대상'], recommended: true, recLabel: '대상' },
              { title: '중소기업', subtitle: '바우처 대상 아님', items: ['상시근로자 5인 이상', '상시근로자 10인 이상 (제조업 등)', '연 매출 규모가 중규모 이상', '경영안정바우처 대상 아님'] }
            ]}
          />

          <TipBox title="1인 사업자도 소상공인이에요">
            <p className="mb-0 leading-relaxed">
              직원 없이 혼자 운영하는 자영업자도 소상공인에 해당해요. 배달 음식점, 온라인 쇼핑몰, 미용실, 학원 등 1인 사업자가 이번 바우처의 핵심 수혜 대상이에요. 사업자등록만 돼 있으면 업종에 관계없이 신청 가능해요(제외 업종 제외).
            </p>
          </TipBox>

          <p className="text-neutral-600 mb-4 leading-relaxed">
            자격은 되는데 혹시 내 업종이 제외 대상은 아닌지, 마지막으로 확인하고 넘어갈게요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '제외 업종',
        title: '내 업종이 빠지는 건 아닐까?',
        desc: '바우처 제외 업종 목록 확인',
        icon: 'info',
      },
    },

    /**
     * ===== S4: 제외 업종 =====
     * 패턴: 제외 목록 → SpokeFlow + RateCards
     * 전환 스타일: 없음 (마지막 섹션)
     */
    {
      id: 's4',
      number: '04',
      heading: '제외되는 업종은 어떤 게 있나요?',
      subtitle: '유흥업, 도박, 가상자산 등 일부 업종은 신청할 수 없어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            대부분의 소상공인 업종은 바우처 대상이지만, 소상공인 정책자금 지원에서 공통으로 빠지는 업종이 있어요. <a href="https://www.bizinfo.go.kr/sii/siia/selectSIIA200Detail.do?pblancId=PBLN_000000000117908" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">시행 공고</a>에 따르면 유흥업, 담배 중개업, 도박기계 및 사행성업, 가상자산 매매 및 중개업이 제외 대상이에요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            이 제외 업종은 경영안정바우처뿐만 아니라 소상공인 정책자금 전반에 적용되는 기준이에요. 본인 사업이 제외 업종인지 확실하지 않다면 소상공인시장진흥공단(1533-0600)에 문의하면 정확하게 확인할 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            음식점, 카페, 미용실, 세탁소, 편의점, 학원, 부동산 중개, 의류 판매 등 일반적인 소상공인 업종은 전부 대상이에요. 일반 주점(호프집, 소주방)은 대상이지만, 유흥주점(노래방 도우미 등)은 제외되니 구분이 필요해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            업종 확인은 사업자등록증의 업종코드(한국표준산업분류 코드)로 판단해요. 업종코드가 제외 목록에 포함되면 신청이 반려돼요.
          </p>

          <SpokeFlow
                        steps={[
              { icon: '1', label: '사업자등록증 확인', sub: '업종코드 확인' },
              { icon: '2', label: '제외 업종 대조', sub: '4가지 제외 업종' },
              { icon: '3', label: '해당 없음 확인', sub: '신청 가능' },
              { icon: '4', label: '해당 시 문의', sub: '1533-0600' },
            ]}
          />

          <RateCards cards={[
            { value: '유흥업', label: '단란주점, 유흥주점 등', lines: ['유흥종사자를 두는 업종', '일반 호프집은 해당 안 됨'], highlight: '유흥종사자', highlightColor: 'orange' },
            { value: '담배 중개업', label: '담배 도매·중개', lines: ['담배 판매 소매점은 해당 안 됨', '편의점은 대상에 포함'] },
            { value: '도박·사행성', label: '도박기계 제조·유통', lines: ['카지노, 경마 관련 업종', '사행성 오락 기기 업종'] },
            { value: '가상자산', label: '매매·중개업', lines: ['가상자산 거래소 운영', '일반 IT 업종은 해당 안 됨'] },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            제외 업종에 해당하지 않고, 매출 기준과 개업일 요건을 충족했다면 바우처 신청 대상이에요. 신청 방법이 궁금하다면 <Link href="/w/경영안정-바우처-신청-방법-홀짝제" className="text-blue-600 hover:underline">경영안정바우처 신청 방법과 홀짝제</Link>에서 확인할 수 있어요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '/w/경영안정바우처-신청-사용처-금액',
        badge: '전체 가이드',
        title: '바우처 신청부터 사용까지 어떻게 진행될까?',
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
      question: '경영안정바우처 매출 0원이면 왜 대상에서 빠지나요?',
      answer: '매출이 0원이면 실질적인 영업 활동이 없는 것으로 판단해요. 사업자등록만 해놓고 운영하지 않는 사업체를 걸러내기 위한 기준이에요. 최소한의 매출 실적이 있어야 신청할 수 있어요.',
    },
    {
      question: '프랜차이즈 가맹점도 경영안정바우처를 받을 수 있나요?',
      answer: '개별 사업자등록이 돼 있고 소상공인 요건(상시근로자 수, 매출 기준)을 충족하면 프랜차이즈 가맹점도 신청할 수 있어요. 다만 제외 업종에 해당하면 안 돼요.',
    },
  ],

  relatedSpokes: [
    { badge: '신청', title: '경영안정바우처 신청 방법과 홀짝제', desc: '온라인 접수 방법과 홀짝제 일정', href: '/w/경영안정-바우처-신청-방법-홀짝제' },
    { badge: '계산', title: '매출 연환산 계산 방법', desc: '창업 첫해 매출 기준과 연환산 공식', href: '/w/경영안정-바우처-매출-연환산-계산' },
    { badge: '사업장', title: '공동대표와 다수 사업장 기준', desc: '공동대표, 복수 사업장 수혜 기준', href: '/w/경영안정-바우처-공동대표-다수-사업장' },
    { badge: '사용처', title: '바우처 사용처 상세 안내', desc: '공과금, 주유비, 4대 보험 사용법', href: '/w/경영안정-바우처-사용처-공과금-주유비' },
  ],

  sources: [
    { name: '소상공인 경영안정 바우처 지원사업 시행 공고', url: 'https://www.bizinfo.go.kr/sii/siia/selectSIIA200Detail.do?pblancId=PBLN_000000000117908', org: '기업마당(중소벤처기업부)' },
    { name: '영세 소상공인 고정비 부담 완화 보도자료', url: 'https://www.mss.go.kr/site/smba/ex/bbs/View.do?cbIdx=86&bcIdx=1065091', org: '중소벤처기업부' },
    { name: '소상공인 기본법', url: 'https://www.law.go.kr/법령/소상공인기본법', org: '국가법령정보센터' },
    { name: '소상공인 경영안정 바우처 전용 사이트', url: 'https://voucher.sbiz24.kr/', org: '소상공인시장진흥공단' },
  ],
}

export default data
