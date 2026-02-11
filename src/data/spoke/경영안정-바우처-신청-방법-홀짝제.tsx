import Link from 'next/link'
import type { SpokeData } from './types'
import { SpokeTimeline, SpokeTable, SpokeStepCards, SpokeChecklist, FormulaBox, SpokeRateBars, SpokeCompareCards, TipBox } from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '경영안정-바우처-신청-방법-홀짝제',

  meta: {
    title: '경영안정바우처 신청 방법 홀짝제 온라인 접수 절차',
    description: '경영안정바우처 신청할 때 홀짝제를 모르면 첫날 접수가 안 될 수 있다는 거 아시나요? 신청 방법과 접수 일정을 알려드려요',
    keywords: ['경영안정바우처 신청 방법', '바우처 홀짝제', '바우처 온라인 신청', '소진공 신청'],
    ogTitle: '경영안정바우처 신청 방법 홀짝제 온라인 접수 | 머니위키',
    ogDescription: '경영안정바우처 온라인 신청 방법, 홀짝제 일정, 접수 기간까지 정리',
  },

  hub: {
    url: '/w/경영안정바우처-신청-사용처-금액',
    name: '경영안정바우처 신청 사용처 금액',
  },

  breadcrumb: ['사업', '경영안정바우처 신청 방법'],

  hero: {
    badge: '2026년 기준',
    h1: <>경영안정바우처 <span className="text-[#1E3A5F]">신청 방법</span> — 홀짝제와 온라인 접수</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          경영안정바우처 25만원을 받으려면 온라인 신청을 해야 해요. 그런데 첫 이틀은 <strong>사업자번호 끝자리 기준 홀짝제</strong>로 접수를 받기 때문에, 내 접수일을 미리 확인해야 해요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          신청 자체는 어렵지 않아요. 별도 서류 없이 본인 인증만 하면 되는 간편한 구조예요. 전체 바우처 정보가 궁금하면 <Link href="/w/경영안정바우처-신청-사용처-금액" className="text-blue-600 hover:underline">경영안정바우처 신청 사용처 금액 총정리</Link>를 함께 보세요. 신청 절차부터 볼게요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '경영안정바우처 신청부터 사용까지 전체 흐름 확인하기',
    },
  },

  toc: [
    { id: 's1', text: '경영안정바우처 신청은 어떻게 하나요?' },
    { id: 's2', text: '홀짝제란 무엇인가요?' },
    { id: 's3', text: '온라인 신청 절차는 어떻게 되나요?' },
    { id: 's4', text: '신청 기간은 언제까지인가요?' },
    { id: 's5', text: '자주 묻는 질문' },
  ],

  sections: [
    /**
     * ===== S1: 신청 방법 개요 =====
     * 패턴: 전체 일정 → SpokeTimeline + SpokeTable
     * 전환 스타일: A. 독자 대변형
     */
    {
      id: 's1',
      number: '01',
      heading: '경영안정바우처 신청은 어떻게 하나요?',
      subtitle: '온라인 전용이고 별도 서류 없이 본인 인증만 하면 돼요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            경영안정바우처는 <a href="https://voucher.sbiz24.kr/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">소상공인경영안정바우처.kr</a> 또는 소상공인24 홈페이지에서 온라인으로만 신청할 수 있어요. 방문 접수나 전화 접수는 안 돼요. 별도 서류를 제출하지 않아도 되고, 간편인증이나 공동인증서로 본인 확인만 하면 끝이에요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            신청이 완료되면 국세청 매출 자료와 사업자 정보를 자동으로 대조해서 자격을 검증해요. 검증이 끝나면 선택한 카드사의 포인트로 바우처가 자동 충전돼요. 신청부터 충전까지 영업일 기준 약 3일이 걸려요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            다만 접수 초반에는 동시 접속이 몰릴 수 있어요. 정부가 이걸 고려해서 처음 이틀은 홀짝제를 도입했어요. 사업자등록번호 끝자리로 접수일을 나누는 방식이에요.
          </p>

          <SpokeTimeline
            events={[
              { month: '2월 9일(월)', title: '홀수 접수 시작', desc: '사업자번호 끝자리 홀수(1,3,5,7,9)만 신청', status: 'current', tag: '홀수' },
              { month: '2월 10일(화)', title: '짝수 접수', desc: '사업자번호 끝자리 짝수(0,2,4,6,8)만 신청', status: 'normal', tag: '짝수' },
              { month: '2월 11일(수)~', title: '전체 접수', desc: '끝자리 관계없이 누구나 신청 가능', status: 'normal', tag: '전체' },
              { month: '예산 소진 시', title: '접수 마감', desc: '선착순 마감, 조기 종료 가능', status: 'normal', tag: '마감' },
            ]}
          />

          <SpokeTable
            id="apply-site"
            title="신청 가능 사이트"
            subtitle="둘 중 아무 곳이나 접속하면 돼요"
            headers={['사이트', '주소', '비고']}
            rows={[
              ['전용 사이트', 'voucher.sbiz24.kr', '경영안정바우처 전용'],
              ['소상공인24', 'sbiz24.kr', '다른 지원사업도 통합 제공'],
            ]}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            홀짝제가 정확히 어떤 건지, 내 접수일은 언제인지 궁금하잖아요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '홀짝제',
        title: '홀짝제가 정확히 뭘까?',
        desc: '사업자번호 기준 접수 날짜 확인',
        icon: 'info',
      },
    },

    /**
     * ===== S2: 홀짝제 =====
     * 패턴: 홀짝제 설명 → SpokeStepCards + SpokeChecklist
     * 전환 스타일: B. 정보 예고형
     */
    {
      id: 's2',
      number: '02',
      heading: '홀짝제란 무엇인가요?',
      subtitle: '사업자등록번호 끝자리로 접수일을 나누는 제도예요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            홀짝제는 접수 초반 서버 과부하를 막기 위해 <strong>사업자등록번호 맨 끝자리</strong>를 기준으로 신청일을 나누는 방식이에요. 2월 9일에는 끝자리가 1, 3, 5, 7, 9인 사업자, 2월 10일에는 0, 2, 4, 6, 8인 사업자만 접수할 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            2월 11일부터는 끝자리에 관계없이 누구나 신청할 수 있어요. 홀짝제 기간에 해당 날짜를 놓쳤더라도 11일 이후에 신청하면 되니까 걱정하지 않아도 돼요. 다만 예산이 소진되면 조기 마감될 수 있으니 가능하면 빨리 신청하는 게 유리해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            사업자등록번호는 10자리 숫자(예: 123-45-67890)로 돼 있어요. 맨 마지막 숫자가 기준이에요. 위 예시에서는 '0'이니까 짝수, 2월 10일에 신청하면 돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            접수 시간은 오전 9시부터예요. 사이트 접속이 몰리면 대기 화면이 뜰 수 있는데, 새로고침하지 말고 순서를 기다리는 게 좋아요.
          </p>

          <SpokeStepCards
                        steps={[
              { title: '사업자등록번호 확인', desc: '사업자등록증의 10자리 숫자를 확인해요', tip: '홈택스에서도 조회 가능' },
              { title: '맨 끝자리 확인', desc: '마지막 숫자가 홀수인지 짝수인지 확인해요', tip: '0은 짝수예요' },
              { title: '해당 날짜에 접수', desc: '홀수면 2/9, 짝수면 2/10에 접수해요', tip: '2/11부터는 전체 가능' },
            ]}
          />

          <SpokeChecklist
                        items={[
              { text: '사업자등록번호 끝자리 확인 완료', done: false, note: '홀짝제 날짜 확인' },
              { text: '간편인증 또는 공동인증서 준비', done: false, note: '카카오·네이버·PASS 등' },
              { text: '정보 제공 동의 내용 확인', done: false, note: '매출·사업자 정보 확인 동의' },
              { text: '등록할 카드사 미리 결정', done: false, note: '9개 카드사 중 택 1' },
            ]}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            접수일을 확인했으면, 실제로 사이트에서 어떤 순서로 진행하는지 알아둬야 해요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '절차',
        title: '실제 신청 화면은 어떻게 되나요?',
        desc: '온라인 접수 절차 단계별 안내',
        icon: 'check',
      },
    },

    /**
     * ===== S3: 온라인 신청 절차 =====
     * 패턴: 절차 상세 → FormulaBox + SpokeRateBars
     * 전환 스타일: D. 화제 전환형
     */
    {
      id: 's3',
      number: '03',
      heading: '온라인 신청 절차는 어떻게 되나요?',
      subtitle: '5단계로 진행되고, 전체 과정이 5분이면 끝나요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            <a href="https://voucher.sbiz24.kr/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">소상공인경영안정바우처.kr</a>에 접속하면 '바우처 신청하기' 버튼이 있어요. 클릭한 뒤 본인 인증 → 정보 확인 → 카드사 선택 → 신청 완료까지 5분이면 끝나요. 서류를 첨부하거나 복잡한 입력은 없어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            본인 인증은 간편인증(카카오, 네이버, PASS 등)이나 공동인증서(구 공인인증서)로 할 수 있어요. 간편인증이 편하니까 미리 설정해두는 걸 추천해요. 인증이 완료되면 사업자 정보와 매출 정보가 자동으로 불러와져요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            정보 제공에 동의하면 국세청 자료를 기반으로 자격을 자동 검증해요. 별도로 매출 증빙을 올릴 필요가 없어요. 마지막으로 바우처를 받을 카드사를 선택하면 신청이 완료돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            2025년 부담경감 크레딧에 참여했던 분은 기존 카드 정보를 그대로 쓸 수 있어요. 카드사를 바꾸고 싶으면 새로 선택하면 돼요.
          </p>

          <FormulaBox
                        lines={[
              { text: '전용 사이트 접속 (voucher.sbiz24.kr)', numbered: true },
              { text: '본인 인증 (간편인증 또는 공동인증서)', numbered: true },
              { text: '사업자 정보 확인 + 정보 제공 동의', numbered: true },
              { text: '바우처 수령 카드사 선택 (9개 중 택 1)', numbered: true },
              { text: '// 별도 서류 제출 없음: 신청 완료 → 영업일 3일 내 충전', numbered: true, comment: true },
            ]}
          />

          <SpokeRateBars
                        bars={[
              { label: '본인 인증', rate: '약 1분', width: '20%' },
              { label: '정보 확인·동의', rate: '약 2분', width: '40%' },
              { label: '카드사 선택', rate: '약 1분', width: '20%' },
              { label: '신청 완료', rate: '약 1분', width: '20%' },
            ]}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            그런데 한 가지 중요한 점이 있어요. 신청 기간이 정해져 있는 게 아니라 예산이 소진되면 끝나요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '기간',
        title: '신청은 언제까지 할 수 있을까?',
        desc: '접수 기간과 마감 기준 확인',
        icon: 'clock',
      },
    },

    /**
     * ===== S4: 신청 기간 =====
     * 패턴: 기간·마감 → SpokeCompareCards + TipBox
     * 전환 스타일: 없음 (마지막 섹션)
     */
    {
      id: 's4',
      number: '04',
      heading: '신청 기간은 언제까지인가요?',
      subtitle: '별도 마감일 없이 예산 소진 시까지예요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            경영안정바우처 신청은 2026년 2월 9일 오전 9시부터 시작해요. 별도의 마감일이 정해져 있지 않고, <strong>예산이 소진되면 자동으로 마감</strong>돼요. 약 230만 명 분의 예산이 편성돼 있지만, 접수가 몰리면 빨리 끝날 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            2025년 부담경감 크레딧 사업에서도 초반에 접수가 집중됐어요. 경영안정바우처도 비슷한 패턴이 예상되니까 가능한 한 빨리 신청하는 게 안전해요. 홀짝제 기간에 놓쳤더라도 11일 이후에 바로 접수하는 게 좋아요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            신청 후 부적격 판정을 받으면 별도 안내가 돼요. 매출이 기준을 초과하거나 제외 업종에 해당하는 경우가 대부분이에요. 부적격 사유가 납득이 안 되면 소상공인시장진흥공단(1533-0600)에 이의 제기를 할 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            바우처가 충전된 뒤의 사용 기한은 2026년 12월 31일이에요. 신청 기한과 사용 기한은 다르니까 헷갈리지 않도록 주의하세요.
          </p>

          <SpokeCompareCards
            cards={[
              { title: '신청 기한', subtitle: '조기 마감 가능', items: ['2026년 2월 9일 시작', '예산 소진 시 마감', '조기 마감 가능', '일찍 신청이 유리'] },
              { title: '사용 기한', subtitle: '연말까지 사용', items: ['충전일부터 사용 가능', '2026년 12월 31일 만료', '잔액 자동 소멸', '기한 내 전액 사용 권장'] }
            ]}
          />

          <TipBox title="접속 몰릴 때 꿀팁">
            <p className="mb-0 leading-relaxed">
              접수 시작일에 사이트 접속이 몰리면 대기 화면이 뜰 수 있어요. 이때 새로고침을 반복하면 대기 순서가 뒤로 밀릴 수 있으니, <strong>대기 화면에서 그대로 기다리는 게 가장 빨라요.</strong> PC와 모바일 중 편한 쪽으로 접속하면 돼요.
            </p>
          </TipBox>

          <p className="text-neutral-600 mb-4 leading-relaxed">
            신청을 마쳤다면 카드 등록과 사용처를 미리 확인해 두면 바우처를 더 효율적으로 쓸 수 있어요. <Link href="/w/경영안정-바우처-카드-등록-선택" className="text-blue-600 hover:underline">바우처 카드 등록과 카드사 선택</Link>에서 자세한 내용을 확인해 보세요.
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
      question: '경영안정바우처 홀짝제 날짜에 신청을 못 했어요. 어떻게 하나요?',
      answer: '2월 11일부터는 사업자번호 끝자리에 관계없이 누구나 신청할 수 있어요. 홀짝제는 처음 이틀만 적용되는 거라, 11일 이후에 접수하면 돼요. 다만 예산 소진 시 마감이니 빠르게 신청하세요.',
    },
    {
      question: '경영안정바우처 신청할 때 필요한 서류가 있나요?',
      answer: '별도 서류가 필요 없어요. 본인 인증(간편인증 또는 공동인증서)만 하면 사업자 정보와 매출 자료가 자동으로 확인돼요. 매출 증빙이나 사업자등록증 사본을 따로 올릴 필요가 없어요.',
    },
  ],

  relatedSpokes: [
    { badge: '대상', title: '경영안정바우처 신청 대상과 매출 기준', desc: '누가 대상이고 매출 기준이 어떻게 되는지', href: '/w/경영안정-바우처-신청-대상-매출-기준' },
    { badge: '카드', title: '바우처 카드 등록과 카드사 선택', desc: '9개 카드사 중 어떤 걸 골라야 하는지', href: '/w/경영안정-바우처-카드-등록-선택' },
    { badge: '지급', title: '바우처 지급 시기와 잔액 확인', desc: '바우처가 언제 들어오고 잔액은 어떻게 보는지', href: '/w/경영안정-바우처-지급-시기-잔액-확인' },
    { badge: '사용처', title: '바우처 사용처 공과금 주유비', desc: '어디서 어떻게 쓸 수 있는지', href: '/w/경영안정-바우처-사용처-공과금-주유비' },
  ],

  sources: [
    { name: '소상공인 경영안정 바우처 지원사업 시행 공고', url: 'https://www.bizinfo.go.kr/sii/siia/selectSIIA200Detail.do?pblancId=PBLN_000000000117908', org: '기업마당(중소벤처기업부)' },
    { name: '영세 소상공인 고정비 부담 완화 보도자료', url: 'https://www.mss.go.kr/site/smba/ex/bbs/View.do?cbIdx=86&bcIdx=1065091', org: '중소벤처기업부' },
    { name: '소상공인 경영안정 바우처 전용 사이트', url: 'https://voucher.sbiz24.kr/', org: '소상공인시장진흥공단' },
  ],
}

export default data
