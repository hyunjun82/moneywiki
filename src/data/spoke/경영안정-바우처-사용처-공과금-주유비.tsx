import Link from 'next/link'
import type { SpokeData } from './types'
import { SpokeTable, SpokeChecklist, SpokeRateBars, FormulaBox, SpokeCompareCards, SpokeFlow, TipBox, RateCards } from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '경영안정-바우처-사용처-공과금-주유비',

  meta: {
    title: '경영안정바우처 사용처 공과금 주유비 4대보험 총정리',
    description: '경영안정바우처로 통신비는 못 낸다는 거 아시나요? 공과금, 주유비, 4대 보험 등 사용 가능 항목과 불가 항목을 정리해 드려요',
    keywords: ['경영안정바우처 사용처', '바우처 공과금', '바우처 주유비', '바우처 사용 가능 업종'],
    ogTitle: '경영안정바우처 사용처 공과금 주유비 4대보험 | 머니위키',
    ogDescription: '바우처 사용 가능 9가지 항목과 사용 불가 항목까지 정리',
  },

  hub: {
    url: '/w/경영안정바우처-신청-사용처-금액',
    name: '경영안정바우처 신청 사용처 금액',
  },

  breadcrumb: ['사업', '경영안정바우처 사용처'],

  hero: {
    badge: '2026년 기준',
    h1: <>경영안정바우처 <span className="text-[#1E3A5F]">사용처</span> — 공과금 주유비 4대보험</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          경영안정바우처 25만원을 받았는데 어디에 쓸 수 있는지 궁금하다면 잘 오셨어요. 바우처는 <strong>공과금, 4대 보험료, 차량 연료비 등 9가지 항목</strong>에만 사용할 수 있어요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          일반 소비나 통신비에는 못 쓰니까 사용처를 미리 확인해두는 게 좋아요. 전체 바우처 정보가 궁금하면 <Link href="/w/경영안정바우처-신청-사용처-금액" className="text-blue-600 hover:underline">경영안정바우처 신청 사용처 금액 총정리</Link>를 함께 보세요. 어디에 쓸 수 있는지부터 볼게요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '경영안정바우처 신청부터 사용까지 전체 흐름 확인하기',
    },
  },

  toc: [
    { id: 's1', text: '경영안정바우처 사용처는 어디인가요?' },
    { id: 's2', text: '공과금 납부가 되나요?' },
    { id: 's3', text: '주유비로 쓸 수 있나요?' },
    { id: 's4', text: '사용할 수 없는 곳은 어디인가요?' },
    { id: 's5', text: '자주 묻는 질문' },
  ],

  sections: [
    /**
     * ===== S1: 사용처 전체 =====
     * 패턴: 9가지 항목 정리 → SpokeTable + SpokeChecklist
     * 전환 스타일: A. 독자 대변형
     */
    {
      id: 's1',
      number: '01',
      heading: '경영안정바우처 사용처는 어디인가요?',
      subtitle: '9가지 고정비 항목에 사용할 수 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            경영안정바우처는 소상공인의 사업 운영에 꼭 필요한 <strong>고정비 9가지 항목</strong>에 사용할 수 있어요. <a href="https://www.mss.go.kr/site/smba/ex/bbs/View.do?cbIdx=86&bcIdx=1065091" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">중소벤처기업부 보도자료</a>에 따르면 공과금(전기·가스·수도), 4대 보험료(국민연금·건강보험·고용보험·산재보험), 차량 연료비, 전통시장 화재공제료가 해당돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            사용 방법은 간단해요. 바우처 신청 시 선택한 카드사의 카드로 지정 사용처에서 결제하면 바우처 포인트가 자동으로 차감돼요. 25만원 한도 내에서 자유롭게 나눠 쓸 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            한도를 초과하는 금액은 본인이 부담해야 해요. 예를 들어 전기요금이 30만원이면 바우처로 25만원을 차감하고 나머지 5만원은 본인 카드에서 결제돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            지정 사용처 외에서 결제하면 바우처 포인트가 차감되지 않고 본인 카드에서 전액 결제돼요. 잘못 결제해도 바우처 잔액이 줄지는 않으니 걱정하지 않아도 돼요.
          </p>

          <SpokeTable
            id="usage-list"
            title="바우처 사용 가능 항목 9가지"
            subtitle="지정 카드로 결제 시 자동 차감"
            headers={['번호', '항목', '설명']}
            rows={[
              ['1', '전기요금', '한국전력 납부'],
              ['2', '가스요금', '도시가스 납부'],
              ['3', '수도요금', '상수도 납부'],
              ['4', '국민연금', '사업장 국민연금 보험료'],
              ['5', '건강보험', '직장·지역 건강보험료'],
              ['6', '고용보험', '사업주 부담분'],
              ['7', '산재보험', '사업주 부담분'],
              ['8', '차량 연료비', '주유소·충전소 결제'],
              ['9', '전통시장 화재공제료', '시장 상인 공제료'],
            ]}
          />

          <SpokeChecklist
                        items={[
              { text: '바우처가 카드에 충전돼 있다', done: false, note: '소상공인24에서 잔액 확인' },
              { text: '지정 카드사의 카드로 결제한다', done: false, note: '다른 카드사 카드는 안 됨' },
              { text: '지정 사용처에서 결제한다', done: false, note: '9가지 항목 외 차감 안 됨' },
              { text: '25만원 한도 내에서 결제한다', done: false, note: '초과분은 본인 부담' },
            ]}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            공과금 납부가 어떻게 되는지 구체적으로 알고 싶잖아요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '공과금',
        title: '공과금은 어떻게 납부하나요?',
        desc: '전기·가스·수도 요금 납부 방법',
        icon: 'calc',
      },
    },

    /**
     * ===== S2: 공과금 납부 =====
     * 패턴: 공과금 상세 → SpokeRateBars + FormulaBox
     * 전환 스타일: B. 정보 예고형
     */
    {
      id: 's2',
      number: '02',
      heading: '공과금 납부가 되나요?',
      subtitle: '전기·가스·수도 요금을 바우처로 낼 수 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            네, 전기·가스·수도 <strong>3가지 공과금 모두</strong> 바우처로 납부할 수 있어요. 한전, 도시가스, 상수도 요금을 선택한 카드로 납부하면 바우처 포인트에서 자동 차감돼요. 가장 많이 쓰이는 항목이에요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            납부 방법은 평소 카드로 공과금을 내는 것과 동일해요. 카드사 앱이나 공과금 납부 사이트에서 바우처 등록 카드로 결제하면 돼요. 자동이체를 설정해놓은 경우에도 해당 카드로 빠져나가면 바우처가 차감돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            소상공인에게 전기요금은 가장 큰 고정비 중 하나예요. 음식점이나 카페처럼 냉장·에어컨 사용이 많은 업종은 전기요금만으로도 바우처 25만원을 다 쓸 수 있어요. 여러 항목에 나눠 쓸 수도 있고, 한 항목에 몰아서 쓸 수도 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            다만 가정용 공과금에는 사용할 수 없어요. 사업장 명의로 납부하는 공과금만 해당돼요. 사업장 주소와 공과금 납부 주소가 일치해야 해요.
          </p>

          <SpokeRateBars
                        bars={[
              { label: '음식점 전기요금', rate: '월 30~50만원', width: '90%' },
              { label: '미용실 전기요금', rate: '월 15~25만원', width: '55%' },
              { label: '편의점 전기요금', rate: '월 20~35만원', width: '70%' },
              { label: '소규모 사무실', rate: '월 5~10만원', width: '25%' },
            ]}
          />

          <FormulaBox
                        lines={[
              { text: '전기요금 15만원 + 가스요금 5만원 = 20만원', numbered: true },
              { text: '바우처 잔액 25만원 - 20만원 = 5만원 남음', numbered: true },
              { text: '// 한도 내 자유 배분: 남은 5만원은 주유비 등에 사용 가능', comment: true },
            ]}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            공과금 외에 차량 연료비도 바우처로 쓸 수 있어서 배달이나 영업에 차를 쓰는 분에게 유용해요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '주유비',
        title: '주유비로도 쓸 수 있을까?',
        desc: '차량 연료비 사용 방법과 범위',
        icon: 'info',
      },
    },

    /**
     * ===== S3: 주유비 =====
     * 패턴: 주유비 사용법 → SpokeCompareCards + SpokeFlow
     * 전환 스타일: C. 간결 연결형
     */
    {
      id: 's3',
      number: '03',
      heading: '주유비로 쓸 수 있나요?',
      subtitle: '주유소와 충전소에서 차량 연료비로 쓸 수 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            네, <strong>차량 연료비</strong>는 바우처 사용 항목 중 하나예요. 주유소에서 휘발유, 경유, LPG를 넣을 때 바우처 등록 카드로 결제하면 자동 차감돼요. 전기차 충전소에서의 충전비도 포함돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            배달업, 운수업, 영업직처럼 차량을 사업에 쓰는 소상공인에게 특히 유용한 항목이에요. 사업용 차량이 아니더라도 본인 명의 카드로 결제하면 차감이 되기는 하지만, 용도 외 사용으로 환수 대상이 될 수 있으니 사업 관련 주유에 쓰는 게 안전해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            셀프 주유소, 유인 주유소 모두 사용 가능해요. 다만 주유소 내 편의점이나 세차장에서의 결제는 바우처 차감 대상이 아니에요. 순수하게 연료비(주유)에만 적용돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            공과금과 주유비를 합쳐서 25만원 한도 내에서 자유롭게 배분할 수 있어요. 주유비를 많이 쓰는 달에는 주유비 위주로, 공과금이 많은 달에는 공과금 위주로 쓰면 돼요.
          </p>

          <SpokeCompareCards
            cards={[
              { title: '사용 가능', subtitle: '연료비로 인정되는 항목', items: ['주유소 연료비 (휘발유·경유·LPG)', '전기차 충전소 충전비', '셀프 주유소 결제', 'LPG 충전소 결제'], recommended: true, recLabel: '가능' },
              { title: '사용 불가', subtitle: '연료비 외 항목', items: ['주유소 편의점 결제', '세차장 결제', '차량 용품 구매', '톨게이트·주차비'] }
            ]}
          />

          <SpokeFlow
                        steps={[
              { icon: '1', label: '주유소 방문', sub: '셀프·유인 모두 가능' },
              { icon: '2', label: '바우처 카드 결제', sub: '등록한 카드사 카드' },
              { icon: '3', label: '포인트 자동 차감', sub: '한도 내 자동 적용' },
              { icon: '4', label: '초과분 본인 부담', sub: '잔액 이상 주유 시' },
            ]}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            마지막으로 바우처를 사용할 수 없는 곳도 확인하고 넘어갈게요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '사용 불가',
        title: '어디서는 바우처를 못 쓰나요?',
        desc: '사용 불가 항목과 주의사항 확인',
        icon: 'info',
      },
    },

    /**
     * ===== S4: 사용 불가 =====
     * 패턴: 불가 항목 정리 → TipBox + RateCards
     * 전환 스타일: 없음 (마지막 섹션)
     */
    {
      id: 's4',
      number: '04',
      heading: '사용할 수 없는 곳은 어디인가요?',
      subtitle: '통신비, 일반 소비, 온라인 쇼핑 등은 사용 불가예요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            경영안정바우처는 <strong>지정된 9가지 항목에서만</strong> 사용할 수 있어요. 그 외의 모든 결제는 바우처 차감 대상이 아니에요. 가장 많이 물어보시는 게 통신비인데, 이번 바우처에서 통신비는 빠졌어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            2025년 부담경감 크레딧에서는 통신비가 포함됐지만, 이번 경영안정바우처에서는 사용처 논란을 줄이기 위해 제외된 것으로 보여요. 임대료, 인건비, 식재료비, 일반 물품 구매 등 사업 비용도 바우처 사용 대상이 아니에요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            온라인 쇼핑몰, 대형마트, 편의점, 음식점에서의 개인 소비에도 쓸 수 없어요. 만약 지정 외 사용처에서 카드를 결제하면, 바우처 포인트는 차감되지 않고 본인 카드에서 전액 결제돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            부정 사용이 적발되면 바우처 환수는 물론 향후 소상공인 지원사업 참여가 제한될 수 있으니 주의해야 해요. 지정 사용처에서만 정직하게 사용하는 게 중요해요.
          </p>

          <TipBox title="통신비는 왜 빠졌나요?">
            <p className="mb-0 leading-relaxed">
              2025년 부담경감 크레딧에서 통신비가 포함됐을 때 용도 외 사용 논란이 있었어요. 이번 경영안정바우처에서는 사용처를 <strong>공과금·보험·연료비</strong> 등 명확한 고정비 항목으로 한정해서 논란을 줄인 거예요. 통신비 지원이 필요하면 별도의 소상공인 통신비 지원 사업을 확인해 보세요.
            </p>
          </TipBox>

          <RateCards cards={[
            { value: '통신비', label: '이번 바우처 미포함', lines: ['인터넷·전화·휴대폰', '별도 지원사업 확인'], highlight: '미포함', highlightColor: 'orange' },
            { value: '임대료', label: '사용 불가', lines: ['사업장 임대료', '바우처 대상 아님'] },
            { value: '인건비', label: '사용 불가', lines: ['직원 급여', '바우처 대상 아님'] },
            { value: '일반 소비', label: '사용 불가', lines: ['마트·편의점·음식점', '개인 소비 전체 제외'] },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            바우처 사용처를 확인했다면, 잔액 관리와 소멸 기한도 알아둬야 해요. <Link href="/w/경영안정-바우처-지급-시기-잔액-확인" className="text-blue-600 hover:underline">바우처 지급 시기와 잔액 확인</Link>에서 확인할 수 있어요.
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
      question: '경영안정바우처로 임대료를 낼 수 있나요?',
      answer: '안 돼요. 바우처는 공과금, 4대 보험료, 차량 연료비, 전통시장 화재공제료 등 지정된 9가지 항목에서만 쓸 수 있어요. 임대료, 인건비, 식재료비 등은 대상이 아니에요.',
    },
    {
      question: '바우처로 결제했는데 포인트가 안 빠졌어요. 왜 그런가요?',
      answer: '지정 사용처가 아닌 곳에서 결제하면 바우처 포인트가 차감되지 않고 본인 카드에서 결제돼요. 9가지 지정 항목에 해당하는 곳에서 결제해야 바우처가 차감돼요.',
    },
  ],

  relatedSpokes: [
    { badge: '지급', title: '바우처 지급 시기와 잔액 확인', desc: '언제 충전되고 잔액은 어떻게 보는지', href: '/w/경영안정-바우처-지급-시기-잔액-확인' },
    { badge: '카드', title: '바우처 카드 등록과 카드사 선택', desc: '9개 카드사 선택과 등록 방법', href: '/w/경영안정-바우처-카드-등록-선택' },
    { badge: '대상', title: '경영안정바우처 신청 대상과 매출 기준', desc: '누가 대상이고 매출 기준이 어떻게 되는지', href: '/w/경영안정-바우처-신청-대상-매출-기준' },
    { badge: '중복', title: '바우처 중복 수혜와 배달비 크레딧', desc: '다른 지원금과 겹치는 경우', href: '/w/경영안정-바우처-중복-수혜-배달비-크레딧' },
  ],

  sources: [
    { name: '소상공인 경영안정 바우처 지원사업 시행 공고', url: 'https://www.bizinfo.go.kr/sii/siia/selectSIIA200Detail.do?pblancId=PBLN_000000000117908', org: '기업마당(중소벤처기업부)' },
    { name: '영세 소상공인 고정비 부담 완화 보도자료', url: 'https://www.mss.go.kr/site/smba/ex/bbs/View.do?cbIdx=86&bcIdx=1065091', org: '중소벤처기업부' },
    { name: '소상공인 경영안정 바우처 전용 사이트', url: 'https://voucher.sbiz24.kr/', org: '소상공인시장진흥공단' },
  ],
}

export default data
