import Link from 'next/link'
import type { SpokeData } from './types'
import { SpokeTimeline, SpokeRateBars, SpokeStepCards, FormulaBox, SpokeTable, SpokeChecklist, SpokeWarnBox, SpokeCompareCards } from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '경영안정-바우처-지급-시기-잔액-확인',

  meta: {
    title: '경영안정바우처 지급 시기 잔액 확인 소멸 기한',
    description: '경영안정바우처가 12월 31일 지나면 자동 소멸된다는 거 아시나요? 지급 시기와 잔액 확인 방법, 미사용 잔액 처리까지 알려드려요',
    keywords: ['경영안정바우처 지급 시기', '바우처 잔액 확인', '바우처 소멸 기한', '바우처 입금일'],
    ogTitle: '경영안정바우처 지급 시기 잔액 확인 소멸 기한 | 머니위키',
    ogDescription: '바우처 입금 시기, 잔액 확인 방법, 소멸 기한까지 정리',
  },

  hub: {
    url: '/w/경영안정바우처-신청-사용처-금액',
    name: '경영안정바우처 신청 사용처 금액',
  },

  breadcrumb: ['사업', '경영안정바우처 지급 시기'],

  hero: {
    badge: '2026년 기준',
    h1: <>경영안정바우처 <span className="text-[#1E3A5F]">지급 시기</span> — 잔액 확인과 소멸 기한</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          경영안정바우처를 신청했는데 언제 들어오는지, 잔액은 어떻게 확인하는지 궁금하다면 잘 오셨어요. <strong>신청 후 영업일 3일 이내</strong>에 포인트가 충전돼요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          바우처 사용 기한은 2026년 12월 31일까지이고 기한이 지나면 자동 소멸되니까 미리 알아두는 게 좋아요. 전체 바우처 정보는 <Link href="/w/경영안정바우처-신청-사용처-금액" className="text-blue-600 hover:underline">경영안정바우처 신청 사용처 금액 총정리</Link>를 참고하세요. 지급 시기부터 볼게요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '경영안정바우처 신청부터 사용까지 전체 흐름 확인하기',
    },
  },

  toc: [
    { id: 's1', text: '바우처는 언제 지급되나요?' },
    { id: 's2', text: '잔액은 어떻게 확인하나요?' },
    { id: 's3', text: '바우처 소멸 기한은 언제인가요?' },
    { id: 's4', text: '미사용 잔액은 어떻게 되나요?' },
    { id: 's5', text: '자주 묻는 질문' },
  ],

  sections: [
    /**
     * ===== S1: 지급 시기 =====
     * 패턴: 타임라인 → SpokeTimeline + SpokeRateBars
     * 전환 스타일: A. 독자 대변형
     */
    {
      id: 's1',
      number: '01',
      heading: '바우처는 언제 지급되나요?',
      subtitle: '신청 후 영업일 기준 약 3일이면 충전돼요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            경영안정바우처 신청이 완료되면 국세청 매출 자료와 사업자 정보를 자동으로 검증해요. 검증이 끝나면 선택한 카드사의 <strong>포인트 형태로 바우처 25만원</strong>이 자동 충전돼요. 신청부터 충전까지 영업일 기준 약 3일이 소요돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            2월 9일 접수 시작이니까 빠르면 2월 12~13일 전후로 충전이 돼요. 주말과 공휴일은 영업일에 포함되지 않으니 참고하세요. 충전이 완료되면 카드사 앱에서 포인트가 늘어난 걸 확인할 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            자격 검증에서 부적격 판정을 받으면 충전이 되지 않고, 부적격 사유가 문자나 소상공인24를 통해 안내돼요. 매출 기준 초과, 제외 업종 해당, 휴·폐업 상태 등이 주된 부적격 사유예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            충전 후에는 별도의 활성화 절차 없이 바로 사용할 수 있어요. 지정 사용처에서 등록 카드로 결제하면 자동으로 차감되는 구조예요.
          </p>

          <SpokeTimeline
            events={[
              { month: 'D+0', title: '신청 완료', desc: '온라인 접수 완료, 자격 검증 시작', status: 'current', tag: '신청' },
              { month: 'D+1~2', title: '자격 검증', desc: '국세청 매출 자료, 사업자 정보 확인', status: 'normal', tag: '검증' },
              { month: 'D+3', title: '바우처 충전', desc: '선택 카드사 포인트로 25만원 충전', status: 'normal', tag: '충전' },
              { month: 'D+3~', title: '사용 가능', desc: '지정 사용처에서 카드 결제로 차감', status: 'normal', tag: '사용' },
            ]}
          />

          <SpokeRateBars
                        bars={[
              { label: '신청 접수', rate: 'D+0', width: '10%' },
              { label: '자격 검증', rate: 'D+1~2일', width: '50%' },
              { label: '포인트 충전', rate: 'D+3일', width: '80%' },
              { label: '사용 시작', rate: 'D+3일~', width: '100%' },
            ]}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            충전이 됐는지, 얼마나 남았는지 확인하는 방법이 궁금하잖아요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '잔액 확인',
        title: '잔액은 어디서 확인하나요?',
        desc: '바우처 잔액 조회 방법',
        icon: 'calc',
      },
    },

    /**
     * ===== S2: 잔액 확인 =====
     * 패턴: 확인 방법 → SpokeStepCards + FormulaBox
     * 전환 스타일: B. 정보 예고형
     */
    {
      id: 's2',
      number: '02',
      heading: '잔액은 어떻게 확인하나요?',
      subtitle: '소상공인24 또는 카드사 앱에서 확인할 수 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            바우처 잔액은 <a href="https://voucher.sbiz24.kr/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">소상공인경영안정바우처.kr</a> 또는 <strong>카드사 앱</strong>에서 확인할 수 있어요. 소상공인24에 로그인하면 바우처 충전 금액, 사용 내역, 잔액을 한눈에 볼 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            카드사 앱에서도 바우처 포인트 잔액을 조회할 수 있어요. 다만 카드사마다 포인트 메뉴 위치가 다를 수 있어요. 일부 카드사는 '바우처 포인트'를 별도 항목으로 표시하고, 일부는 일반 포인트에 합산해서 보여줘요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            바우처 사용 내역도 실시간으로 확인돼요. 결제할 때마다 차감 금액과 잔액이 업데이트되니까 수시로 확인하면 관리가 편해요. 카드사에서 문자 알림을 설정해놓으면 결제 시 자동으로 알려줘요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            전화로도 확인할 수 있어요. 소상공인시장진흥공단 콜센터(1533-0600)에 전화하면 잔액과 사용 내역을 안내받을 수 있어요.
          </p>

          <SpokeStepCards
                        steps={[
              { title: '소상공인24 웹사이트', desc: '로그인 후 바우처 메뉴에서 잔액·사용내역 조회', tip: '가장 정확한 확인 방법' },
              { title: '카드사 앱', desc: '바우처 등록 카드사 앱에서 포인트 잔액 조회', tip: '앱마다 메뉴 위치 다름' },
              { title: '콜센터 전화', desc: '1533-0600에 전화해서 잔액 문의', tip: '온라인이 어려운 분 추천' },
            ]}
          />

          <FormulaBox
                        lines={[
              { text: '충전 금액: 250,000원', numbered: true },
              { text: '전기요금 결제: -150,000원', numbered: true },
              { text: '주유비 결제: -50,000원', numbered: true },
              { text: '// 소상공인24에서 확인: 현재 잔액: 50,000원', comment: true },
            ]}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            잔액 확인 방법을 알았으니, 이 바우처를 언제까지 써야 하는지도 중요해요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '소멸 기한',
        title: '바우처를 언제까지 써야 하나요?',
        desc: '바우처 사용 기한과 소멸 규정',
        icon: 'clock',
      },
    },

    /**
     * ===== S3: 소멸 기한 =====
     * 패턴: 기한 설명 → SpokeTable + SpokeChecklist
     * 전환 스타일: D. 화제 전환형
     */
    {
      id: 's3',
      number: '03',
      heading: '바우처 소멸 기한은 언제인가요?',
      subtitle: '2026년 12월 31일이 지나면 잔액이 자동 소멸돼요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            경영안정바우처의 사용 기한은 <strong>2026년 12월 31일</strong>까지예요. 이 날짜가 지나면 남은 잔액은 자동으로 소멸되고, 현금으로 환급받을 수 없어요. 기한 내에 전액 사용하는 게 가장 좋아요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            바우처 충전일은 사람마다 다르지만 소멸 기한은 모두 동일하게 12월 31일이에요. 2월에 일찍 충전받은 분은 약 10개월, 늦게 신청해서 3~4월에 받은 분은 8~9개월 정도 사용 기간이 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            25만원이라는 금액은 공과금이나 주유비로 쓰면 몇 달이면 소진할 수 있는 규모예요. 매달 공과금을 내면서 차근차근 소진해도 되고, 한 번에 큰 금액을 결제해도 돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            소멸 기한이 다가오면 소상공인24에서 알림을 보내줄 수 있으니, 알림 설정을 해두는 걸 추천해요.
          </p>

          <SpokeTable
            id="expiry-info"
            title="바우처 기한 관련 정리"
            subtitle="핵심 날짜를 기억하세요"
            headers={['구분', '날짜', '비고']}
            rows={[
              ['신청 시작', '2026년 2월 9일', '오전 9시부터'],
              ['충전 시기', '신청 후 영업일 3일', '자격 검증 후'],
              ['사용 기한', '2026년 12월 31일', '기한 후 잔액 소멸'],
              ['환급 가능', '불가', '현금 환급 없음'],
            ]}
            highlightCol={1}
          />

          <SpokeChecklist
                        items={[
              { text: '잔액을 주기적으로 확인한다', done: false, note: '월 1회 이상 확인 권장' },
              { text: '공과금 납부에 먼저 활용한다', done: false, note: '매달 나가는 비용 우선' },
              { text: '12월 전에 잔액 소진 계획을 세운다', done: false, note: '연말 집중 사용' },
              { text: '소상공인24 알림을 설정한다', done: false, note: '기한 임박 알림' },
            ]}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            그런데 만약 기한 내에 다 못 쓰면 정확히 어떻게 처리되는지 궁금한 분도 있을 거예요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '미사용',
        title: '다 못 쓰면 어떻게 되나요?',
        desc: '미사용 잔액 처리 규정 확인',
        icon: 'info',
      },
    },

    /**
     * ===== S4: 미사용 잔액 =====
     * 패턴: 처리 규정 → SpokeWarnBox + SpokeCompareCards
     * 전환 스타일: 없음 (마지막 섹션)
     */
    {
      id: 's4',
      number: '04',
      heading: '미사용 잔액은 어떻게 되나요?',
      subtitle: '기한 초과 시 자동 소멸되고 현금 환급은 안 돼요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            2026년 12월 31일이 지나면 남은 바우처 잔액은 <strong>자동으로 소멸</strong>돼요. 현금으로 환급받거나, 다음 연도로 이월하는 건 불가능해요. 25만원을 모두 활용하려면 기한 내에 지정 사용처에서 전액 사용해야 해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            바우처는 공과금, 4대 보험료, 주유비 등에 쓸 수 있으니까 평소 고정비를 바우처 카드로 결제하는 습관을 들이면 자연스럽게 소진할 수 있어요. 매달 전기요금만 내도 3~4개월이면 다 쓸 수 있는 규모예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            중도 환수되는 경우도 있어요. 부정 사용이 적발되거나, 신청 당시 자격이 없었던 것으로 확인되면 이미 사용한 금액도 환수 대상이 될 수 있어요. 정직하게 지정 사용처에서만 사용하는 게 안전해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            폐업한 경우에도 바우처는 사용 기한까지 쓸 수 있어요. 다만 폐업 후에는 사업 관련 공과금이 없으니 실질적으로 쓸 항목이 제한될 수 있어요.
          </p>

          <SpokeWarnBox title="주의사항">
            <p className="mb-0 leading-relaxed">
              2026년 12월 31일 이후 남은 잔액은 <strong>1원 단위까지 전부 소멸</strong>돼요. 현금 환급, 다음 해 이월, 타인 양도 모두 불가능해요. 잔액이 소액이라도 기한 전에 주유비 등으로 소진하는 게 좋아요.
            </p>
          </SpokeWarnBox>

          <SpokeCompareCards
            cards={[
              { title: '기한 내 전액 사용', subtitle: '권장', items: ['25만원 혜택 100% 활용', '공과금·주유비 절감', '별도 조치 불필요', '정상적인 바우처 활용'], recommended: true, recLabel: '권장' },
              { title: '기한 초과 잔액 있음', subtitle: '주의', items: ['남은 잔액 전액 소멸', '현금 환급 불가', '다음 해 이월 불가', '활용하지 못한 손실'] }
            ]}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            바우처를 받았다면 기한 내에 잘 활용하는 게 핵심이에요. 어디에 쓸 수 있는지 다시 확인하고 싶다면 <Link href="/w/경영안정-바우처-사용처-공과금-주유비" className="text-blue-600 hover:underline">바우처 사용처 공과금 주유비</Link>를 참고하세요.
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
      question: '경영안정바우처가 아직 충전이 안 됐어요. 얼마나 기다려야 하나요?',
      answer: '신청 후 영업일 기준 약 3일이 걸려요. 주말·공휴일은 영업일에 포함되지 않으니 참고하세요. 3일이 넘었는데도 충전이 안 되면 소상공인시장진흥공단(1533-0600)에 문의해 보세요.',
    },
    {
      question: '바우처 잔액을 현금으로 받을 수 있나요?',
      answer: '안 돼요. 바우처 잔액은 현금으로 환급받을 수 없어요. 지정 사용처(공과금, 4대 보험, 주유비 등)에서 카드 결제로만 사용할 수 있고, 기한이 지나면 자동 소멸돼요.',
    },
  ],

  relatedSpokes: [
    { badge: '사용처', title: '바우처 사용처 공과금 주유비', desc: '어디서 어떻게 쓸 수 있는지', href: '/w/경영안정-바우처-사용처-공과금-주유비' },
    { badge: '신청', title: '경영안정바우처 신청 방법과 홀짝제', desc: '온라인 접수 방법과 홀짝제 일정', href: '/w/경영안정-바우처-신청-방법-홀짝제' },
    { badge: '카드', title: '바우처 카드 등록과 카드사 선택', desc: '9개 카드사 선택과 등록 방법', href: '/w/경영안정-바우처-카드-등록-선택' },
    { badge: '중복', title: '바우처 중복 수혜와 배달비 크레딧', desc: '다른 지원금과 겹치는 경우', href: '/w/경영안정-바우처-중복-수혜-배달비-크레딧' },
  ],

  sources: [
    { name: '소상공인 경영안정 바우처 지원사업 시행 공고', url: 'https://www.bizinfo.go.kr/sii/siia/selectSIIA200Detail.do?pblancId=PBLN_000000000117908', org: '기업마당(중소벤처기업부)' },
    { name: '영세 소상공인 고정비 부담 완화 보도자료', url: 'https://www.mss.go.kr/site/smba/ex/bbs/View.do?cbIdx=86&bcIdx=1065091', org: '중소벤처기업부' },
    { name: '소상공인 경영안정 바우처 전용 사이트', url: 'https://voucher.sbiz24.kr/', org: '소상공인시장진흥공단' },
  ],
}

export default data
