import Link from 'next/link'
import type { SpokeData } from './types'
import { SpokeCompareCards, SpokeRateBars, SpokeTable, TipBox, SpokeFlow, FormulaBox, SpokeWarnBox, SpokeChecklist } from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '경영안정-바우처-카드-등록-선택',

  meta: {
    title: '경영안정바우처 카드 등록 방법 카드사 선택 가이드',
    description: '경영안정바우처 카드를 한 번 선택하면 변경이 어렵다는 거 아시나요? 9개 카드사별 차이와 등록 방법을 미리 확인해 보세요',
    keywords: ['경영안정바우처 카드 등록', '바우처 카드 선택', '바우처 결제카드', '카드 변경 방법'],
    ogTitle: '경영안정바우처 카드 등록 방법 카드사 선택 | 머니위키',
    ogDescription: '바우처 카드 등록, 9개 카드사 선택, 변경 방법까지 정리',
  },

  hub: {
    url: '/w/경영안정바우처-신청-사용처-금액',
    name: '경영안정바우처 신청 사용처 금액',
  },

  breadcrumb: ['사업', '경영안정바우처 카드 등록'],

  hero: {
    badge: '2026년 기준',
    h1: <>경영안정바우처 <span className="text-[#1E3A5F]">카드 등록</span> — 카드사 선택과 변경 방법</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          경영안정바우처를 신청할 때 9개 카드사 중 하나를 골라야 해요. <strong>한 번 선택하면 변경이 어렵기 때문에</strong> 미리 어떤 카드가 유리한지 확인하는 게 좋아요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          바우처 25만원이 선택한 카드사의 포인트 형태로 자동 충전되는 구조예요. 전체 신청 과정이 궁금하면 <Link href="/w/경영안정바우처-신청-사용처-금액" className="text-blue-600 hover:underline">경영안정바우처 신청 사용처 금액 총정리</Link>를 함께 보세요. 카드 등록 방법부터 알아볼게요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '경영안정바우처 신청부터 사용까지 전체 흐름 확인하기',
    },
  },

  toc: [
    { id: 's1', text: '바우처 카드는 어떻게 등록하나요?' },
    { id: 's2', text: '어떤 카드를 선택하면 좋나요?' },
    { id: 's3', text: '카드 등록 후 변경할 수 있나요?' },
    { id: 's4', text: '카드별 차이는 뭔가요?' },
    { id: 's5', text: '자주 묻는 질문' },
  ],

  sections: [
    /**
     * ===== S1: 카드 등록 방법 =====
     * 패턴: 등록 절차 비교 → SpokeCompareCards + SpokeRateBars
     * 전환 스타일: A. 독자 대변형
     */
    {
      id: 's1',
      number: '01',
      heading: '바우처 카드는 어떻게 등록하나요?',
      subtitle: '신청할 때 9개 카드사 중 하나를 선택하면 자동 등록돼요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            바우처 카드 등록은 별도로 하는 게 아니라 <strong>바우처 신청 과정에서 카드사를 선택</strong>하면 자동으로 등록돼요. <a href="https://voucher.sbiz24.kr/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">소상공인경영안정바우처.kr</a>이나 소상공인24에서 신청할 때 마지막 단계에서 카드사를 고르면 돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            참여 카드사는 KB국민, 농협, 롯데, BC, 삼성, 신한, 우리, 하나, 현대 총 9곳이에요. 선택한 카드사에서 발급받은 카드로 지정 사용처에서 결제하면 바우처 금액이 자동으로 차감되는 방식이에요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            해당 카드사의 카드를 이미 갖고 있어야 해요. 카드가 없는 카드사를 선택하면 바우처를 쓸 수가 없어요. 본인 명의로 발급된 신용카드 또는 체크카드 모두 사용할 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            2025년 부담경감 크레딧에 참여했던 분은 기존 등록 정보가 남아 있어요. 같은 카드사를 쓸 거라면 바로 연동되고, 카드사를 바꾸고 싶으면 이번에 새로 선택하면 돼요.
          </p>

          <SpokeCompareCards
            cards={[
              { title: '신규 등록', subtitle: '대부분의 신청자', items: ['바우처 신청 시 카드사 선택', '해당 카드사 카드 보유 필수', '본인 명의 신용/체크카드', '선택 후 변경 어려움'], recommended: true, recLabel: '일반' },
              { title: '기존 카드 연동', subtitle: '2025년 참여자', items: ['2025년 크레딧 참여자 대상', '기존 카드 정보 자동 연동', '카드사 변경 시 새로 선택', '같은 카드사면 즉시 사용'] }
            ]}
          />

          <SpokeRateBars
                        bars={[
              { label: 'KB국민', rate: '참여', width: '100%' },
              { label: '신한', rate: '참여', width: '100%' },
              { label: '삼성', rate: '참여', width: '100%' },
              { label: '현대', rate: '참여', width: '100%' },
              { label: '하나', rate: '참여', width: '100%' },
              { label: '우리', rate: '참여', width: '100%' },
              { label: '농협', rate: '참여', width: '100%' },
              { label: '롯데', rate: '참여', width: '100%' },
              { label: 'BC', rate: '참여', width: '100%' },
            ]}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            9개 카드사 중에서 어떤 걸 골라야 유리한지 고민이 되잖아요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '선택 기준',
        title: '어떤 카드를 골라야 할까?',
        desc: '카드사 선택 기준과 팁 확인',
        icon: 'info',
      },
    },

    /**
     * ===== S2: 카드 선택 기준 =====
     * 패턴: 선택 기준 → SpokeTable + TipBox
     * 전환 스타일: B. 정보 예고형
     */
    {
      id: 's2',
      number: '02',
      heading: '어떤 카드를 선택하면 좋나요?',
      subtitle: '본인이 주로 쓰는 카드사를 고르는 게 가장 편해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            바우처 25만원은 카드사별 차이 없이 동일하게 지급돼요. 어떤 카드사를 골라도 받는 금액은 같아요. 그래서 <strong>본인이 평소에 많이 쓰는 카드사</strong>를 선택하는 게 가장 실용적이에요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            바우처 사용처가 공과금, 4대 보험료, 주유비 등이니까 해당 결제를 주로 하는 카드를 기준으로 고르면 돼요. 예를 들어 가스비를 KB국민카드로 내고 있다면 KB국민을 선택하는 게 편해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            카드사의 자체 혜택(포인트 적립, 할인)은 바우처와 별개로 적용돼요. 바우처로 결제해도 카드사 포인트가 쌓이는 경우가 있으니, 포인트 적립률이 좋은 카드사를 고르면 소소한 추가 혜택을 받을 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            다만 카드사별 바우처 포인트 조회 방법이나 앱 편의성에 차이가 있을 수 있어요. 평소 카드사 앱을 잘 사용하는 곳을 고르면 잔액 확인도 편해요.
          </p>

          <SpokeTable
            id="card-select"
            title="카드 선택 시 고려할 점"
            subtitle="금액 차이는 없으니 편의성 위주로 선택하세요"
            headers={['기준', '설명', '추천 상황']}
            rows={[
              ['주 사용 카드', '평소 공과금·주유 결제 카드', '결제 습관 유지하고 싶을 때'],
              ['앱 편의성', '잔액 조회·알림이 편한 카드사', '포인트 관리를 꼼꼼히 하고 싶을 때'],
              ['추가 혜택', '바우처 결제에도 포인트 적립', '소소한 추가 혜택을 원할 때'],
              ['기존 연동', '2025년 크레딧과 같은 카드사', '재등록 번거로움을 피하고 싶을 때'],
            ]}
          />

          <TipBox title="체크카드도 사용 가능해요">
            <p className="mb-0 leading-relaxed">
              신용카드뿐 아니라 <strong>체크카드(직불카드)</strong>도 바우처 카드로 사용할 수 있어요. 해당 카드사에서 발급받은 본인 명의 카드면 종류에 관계없이 돼요. 다만 선불카드나 기프트카드는 안 돼요.
            </p>
          </TipBox>

          <p className="text-neutral-600 mb-4 leading-relaxed">
            카드를 선택했는데, 나중에 바꿀 수 있는지도 미리 알아두면 좋아요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '변경',
        title: '카드사를 잘못 골랐으면?',
        desc: '카드 등록 후 변경 가능 여부 확인',
        icon: 'info',
      },
    },

    /**
     * ===== S3: 카드 변경 =====
     * 패턴: 변경 가능 여부 → SpokeFlow + FormulaBox
     * 전환 스타일: D. 화제 전환형
     */
    {
      id: 's3',
      number: '03',
      heading: '카드 등록 후 변경할 수 있나요?',
      subtitle: '신청 완료 후에는 카드사 변경이 어려워요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            바우처 신청 시 선택한 카드사는 <strong>신청 완료 후 변경이 어려워요.</strong> 바우처가 해당 카드사의 포인트로 충전되는 구조이기 때문에, 다른 카드사로 이전하는 게 기술적으로 복잡해요. 신청 전에 어떤 카드사를 쓸지 미리 정해두는 게 중요해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            2025년 부담경감 크레딧에서 카드사를 등록했던 분은 이번에 같은 카드사를 쓸 수 있고, 바꾸고 싶으면 신청 단계에서 새로 선택하면 돼요. 다만 신청을 완료한 뒤에는 변경이 안 되니까 신청 버튼을 누르기 전에 한 번 더 확인하세요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            만약 선택한 카드사의 카드를 분실하거나 해지한 경우에는 같은 카드사에서 새 카드를 발급받으면 돼요. 카드사는 유지하되 카드 번호만 바뀌는 거라 바우처 포인트는 그대로 남아요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            카드사 변경이 꼭 필요한 특수한 상황이라면 소상공인시장진흥공단(1533-0600)에 문의해서 개별 상담을 받아보세요.
          </p>

          <SpokeFlow
                        steps={[
              { icon: '1', label: '카드 분실·해지', sub: '같은 카드사에서 재발급' },
              { icon: '2', label: '카드사 변경 희망', sub: '1533-0600 문의' },
              { icon: '3', label: '개별 상담', sub: '상황별 안내 받기' },
              { icon: '4', label: '처리 결과 확인', sub: '소상공인24에서 확인' },
            ]}
          />

          <FormulaBox
                        lines={[
              { text: '신청 전: 카드사 자유롭게 선택 가능', numbered: true },
              { text: '신청 후: 카드사 변경 불가 (원칙)', numbered: true },
              { text: '카드 분실: 같은 카드사에서 재발급 → 포인트 유지', numbered: true },
              { text: '// 변경 보장은 아님: 특수 상황: 1533-0600 문의 → 개별 상담', numbered: true, comment: true },
            ]}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            그런데 9개 카드사 사이에 바우처와 관련해서 실질적인 차이가 있는지 궁금한 분도 있을 거예요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '카드 비교',
        title: '카드사별로 차이가 있나요?',
        desc: '9개 카드사 간 실질적 차이 확인',
        icon: 'calc',
      },
    },

    /**
     * ===== S4: 카드별 차이 =====
     * 패턴: 카드사 비교 → SpokeWarnBox + SpokeChecklist
     * 전환 스타일: 없음 (마지막 섹션)
     */
    {
      id: 's4',
      number: '04',
      heading: '카드별 차이는 뭔가요?',
      subtitle: '바우처 금액은 동일하지만, 부가 혜택과 편의성에 차이가 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            경영안정바우처 25만원은 어떤 카드사를 선택해도 동일하게 지급돼요. 바우처 자체의 금액이나 사용 조건에서 카드사별 차이는 없어요. 다만 카드사마다 <strong>앱 편의성, 포인트 조회 방식, 자체 부가 혜택</strong>에 차이가 있을 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            일부 카드사는 바우처 사용 내역을 앱에서 별도 메뉴로 보여주고, 일부는 일반 포인트와 합쳐서 보여줘요. 잔액을 자주 확인하고 싶다면 바우처 포인트를 따로 관리해주는 카드사가 편할 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            바우처 결제 시 카드사 자체 포인트(OK캐쉬백, 신한포인트 등)가 추가로 적립되는지는 카드사와 카드 상품별로 달라요. 적립이 된다면 25만원 외에 소소한 추가 혜택을 받을 수 있으니 본인 카드의 적립 조건을 미리 확인해 보세요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            결론적으로 카드사 선택에서 가장 중요한 건 본인이 편하게 쓸 수 있는 카드사를 고르는 거예요. 바우처 금액 차이가 없으니 공과금이나 주유비를 주로 결제하는 카드 기준으로 선택하면 가장 실용적이에요.
          </p>

          <SpokeWarnBox title="주의사항">
            <p className="mb-0 leading-relaxed">
              해당 카드사에서 발급받은 <strong>본인 명의 카드가 있어야</strong> 바우처를 쓸 수 있어요. 카드가 없는 카드사를 선택하면 바우처가 충전돼도 결제가 안 돼요. 카드가 없다면 미리 발급받거나, 이미 보유한 카드사를 선택하세요.
            </p>
          </SpokeWarnBox>

          <SpokeChecklist
                        items={[
              { text: '해당 카드사의 본인 명의 카드가 있다', done: false, note: '신용/체크 모두 가능' },
              { text: '평소 공과금·주유 결제에 쓰는 카드다', done: false, note: '사용 편의성' },
              { text: '카드사 앱으로 잔액 확인이 가능하다', done: false, note: '포인트 관리' },
              { text: '신청 전에 카드사를 최종 확정했다', done: false, note: '신청 후 변경 어려움' },
            ]}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            카드 등록까지 마쳤다면 바우처를 어디에 쓸 수 있는지 확인해야겠죠. <Link href="/w/경영안정-바우처-사용처-공과금-주유비" className="text-blue-600 hover:underline">바우처 사용처 공과금 주유비</Link>에서 9가지 사용 항목을 확인해 보세요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '/w/경영안정바우처-신청-사용처-금액',
        badge: '전체 가이드',
        title: '바우처 신청부터 사용까지 전체 흐름은?',
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
      question: '가족 명의 카드로 경영안정바우처를 쓸 수 있나요?',
      answer: '안 돼요. 바우처는 <strong>사업자 본인 명의 카드</strong>로만 사용할 수 있어요. 가족이나 타인 명의 카드는 결제가 안 돼요. 본인 명의로 발급된 신용카드나 체크카드를 준비하세요.',
    },
    {
      question: '경영안정바우처 카드사를 선택 안 하면 어떻게 되나요?',
      answer: '카드사를 선택하지 않으면 신청이 완료되지 않아요. 신청 마지막 단계에서 9개 카드사 중 반드시 하나를 골라야 해요. 카드를 아직 안 만들었다면 미리 발급받은 뒤 신청하세요.',
    },
  ],

  relatedSpokes: [
    { badge: '신청', title: '경영안정바우처 신청 방법과 홀짝제', desc: '온라인 접수 방법과 홀짝제 일정', href: '/w/경영안정-바우처-신청-방법-홀짝제' },
    { badge: '사용처', title: '바우처 사용처 공과금 주유비', desc: '어디서 어떻게 쓸 수 있는지', href: '/w/경영안정-바우처-사용처-공과금-주유비' },
    { badge: '지급', title: '바우처 지급 시기와 잔액 확인', desc: '바우처가 언제 들어오고 잔액은 어떻게 보는지', href: '/w/경영안정-바우처-지급-시기-잔액-확인' },
    { badge: '중복', title: '바우처 중복 수혜와 배달비 크레딧', desc: '다른 지원금과 겹치는 경우', href: '/w/경영안정-바우처-중복-수혜-배달비-크레딧' },
  ],

  sources: [
    { name: '소상공인 경영안정 바우처 지원사업 시행 공고', url: 'https://www.bizinfo.go.kr/sii/siia/selectSIIA200Detail.do?pblancId=PBLN_000000000117908', org: '기업마당(중소벤처기업부)' },
    { name: '영세 소상공인 고정비 부담 완화 보도자료', url: 'https://www.mss.go.kr/site/smba/ex/bbs/View.do?cbIdx=86&bcIdx=1065091', org: '중소벤처기업부' },
    { name: '소상공인 경영안정 바우처 전용 사이트', url: 'https://voucher.sbiz24.kr/', org: '소상공인시장진흥공단' },
  ],
}

export default data
