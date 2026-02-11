import Link from 'next/link'
import type { SpokeData } from './types'
import { SpokeTimeline, SpokeTable, SpokeChecklist, SpokeCompareCards, TipBox, SpokeStepCards } from '@/components/spoke/SpokeBlocks'

// --- Table data ---
const RESTRICTION_TABLE_ROWS = [
  ['변호사', '변호사법 제5조'],
  ['공인회계사', '공인회계사법 제4조'],
  ['법무사', '법무사법 제6조'],
  ['공인노무사', '공인노무사법 제5조'],
  ['변리사', '변리사법 제4조'],
  ['세무사', '세무사법 제4조'],
  ['공증인', '공증인법 제12조'],
  ['공무원', '국가공무원법 제33조'],
  ['부동산중개사', '공인중개사법 제10조'],
  ['사립학교 교원', '사립학교법 제22조'],
]

const data: SpokeData = {
  slug: '개인파산-선고-불이익-자격제한-복권',

  meta: {
    title: '개인파산 선고 후 불이익 자격제한 직업 제한과 복권 방법',
    description: '개인파산 면책결정이 확정되면 자격제한이 자동으로 풀린다는 거 아시나요? 불이익 범위와 면책 후 신용 회복 방법을 알려드려요',
    keywords: ['개인파산 선고 후 불이익', '개인파산 자격제한 직업 목록', '개인파산 복권 신청 방법', '개인파산 면책 후 신용 회복'],
    ogTitle: '개인파산 선고 후 불이익 자격제한과 복권 방법 | 머니위키',
    ogDescription: '파산자 자격제한 직업, 복권 조건, 면책 후 신용 회복까지 한 번에',
  },

  hub: {
    url: '/w/개인파산-면책-신청-절차-비용',
    name: '개인파산 면책 신청 절차와 비용',
  },

  breadcrumb: ['법률', '개인파산 불이익'],

  hero: {
    badge: '2026년 기준',
    h1: <>개인파산 선고 후 <span className="text-[#1E3A5F]">불이익</span> — 자격제한 직업 제한과 복권 방법</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          파산선고를 받으면 당장 뭐가 달라지는지, 직업을 잃게 되는 건 아닌지 걱정부터 앞서죠. 결론부터 말하면 <strong>면책결정이 확정되면 자격제한은 자동으로 풀려요</strong>. <a href="https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=616&ccfNo=4&cciNo=1&cnpClsNo=3" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">채무자회생법 제574조</a>에서 이걸 '당연복권'이라고 해요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          다만 파산 선고부터 면책 확정까지 몇 달 동안은 제한이 있고, 면책 후에도 신용 회복에는 시간이 걸려요. 전체 절차가 궁금하면 <Link href="/w/개인파산-면책-신청-절차-비용" className="text-blue-600 hover:underline">개인파산 면책 신청 절차와 비용</Link>을 같이 보면 흐름이 잡혀요. 먼저 파산 선고 직후 어떤 불이익이 생기는지부터 볼게요.
        </p>
      </>
    ),
    /**
     * Quick Answer — Google Featured Snippet 타깃
     *
     * quickAnswer: {
     *   text: '개인파산 선고 후 변호사, 공무원 등 일부 직업에 자격제한이 생기지만, 면책결정이 확정되면 당연복권으로 모든 제한이 자동 해제돼요. 면책 후 신용 기록은 5년간 남아요.',
     *   hook: '내 직업이 자격제한 대상인지 아래에서 확인할 수 있어요',
     * },
     */
    hubCTA: {
      badge: '전체 절차',
      desc: '개인파산 신청부터 면책까지 전체 흐름 확인하기',
    },
  },

  toc: [
    { id: 's1', text: '개인파산 선고 후 어떤 불이익이 있나요?' },
    { id: 's2', text: '개인파산 자격제한 받는 직업은 어떤 게 있나요?' },
    { id: 's3', text: '개인파산 복권은 어떻게 신청하나요?' },
    { id: 's4', text: '개인파산 면책 후 신용은 어떻게 회복하나요?' },
    { id: 's5', text: '자주 묻는 질문' },
  ],

  sections: [
    /**
     * ===== S1: 개인파산 선고 후 불이익 =====
     *
     * 패턴: 개념 설명 → 타임라인(SpokeTimeline) → 보충 비교(SpokeCompareCards)
     * 전환 스타일: A. 독자 대변형
     * 시각 요소: SpokeTimeline + SpokeCompareCards = 2개
     */
    {
      id: 's1',
      number: '01',
      heading: '개인파산 선고 후 어떤 불이익이 있나요?',
      subtitle: '재산 처분 제한부터 직업 자격제한까지 범위를 정리했어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            법원에서 파산선고가 내려지면 채무자는 법적으로 '파산자' 신분이 돼요. <a href="https://www.law.go.kr/법령/채무자회생및파산에관한법률" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">채무자회생법</a>에 따라 재산 처분이 제한되고, 일부 직업과 자격에도 제한이 생겨요. 우편물이 파산관재인에게 전달되는 것도 이 기간에 해당해요. 다만 이 불이익은 영구적인 게 아니라 면책결정이 확정되면 전부 풀려요.
          </p>

          {/* 타임라인: 파산 → 면책 → 복권 흐름 */}
          <SpokeTimeline events={[
            { month: '파산선고', title: '파산자 신분 시작', desc: '재산 처분 제한, 자격제한 시작', status: 'warning', tag: '제한 시작' },
            { month: '면책심리', title: '법원 심리 진행', desc: '약 2~4개월 소요, 채권자 의견 청취', status: 'current', tag: '진행 중' },
            { month: '면책확정', title: '당연복권으로 제한 해제', desc: '모든 공사법상 불이익 자동 소멸', status: 'normal' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            파산 선고 후 불이익은 크게 공법상 제한과 사법상 제한으로 나뉘어요. 공법상 제한은 공무원, 변호사 같은 특정 직업의 자격이 정지되는 거예요. 사법상 제한은 후견인, 유언집행자, 대리인 등이 될 수 없는 거예요. 두 가지 모두 면책결정이 확정되면 자동으로 풀려요.
          </p>

          {/* 공법 vs 사법 비교 */}
          <SpokeCompareCards cards={[
            {
              title: '공법상 제한',
              subtitle: '특정 직업 자격 정지',
              items: ['변호사, 공인회계사 등 전문자격', '공무원 임용 결격', '법인 이사, 감사 취임 제한'],
              recommended: false,
            },
            {
              title: '사법상 제한',
              subtitle: '민법상 지위 제한',
              items: ['후견인, 보좌인 불가', '유언집행자 불가', '신원보증인 자격 제한'],
              recommended: false,
            },
          ]} />

          {/* 전환 문장 — A. 독자 대변형 */}
          <p className="text-neutral-600 mb-4 leading-relaxed">
            불이익 범위는 알겠는데, 내 직업이 자격제한 대상인지가 제일 궁금하잖아요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '직업 목록',
        title: '내 직업이 자격제한 대상일까?',
        desc: '자격제한 직업 전체 목록 확인하기',
        icon: 'info',
      },
    },

    /**
     * ===== S2: 자격제한 직업 목록 =====
     *
     * 패턴: 설명 → 테이블(SpokeTable) → 팁(TipBox)
     * 전환 스타일: E. 실용 연결형
     * 시각 요소: SpokeTable + TipBox = 2개
     */
    {
      id: 's2',
      number: '02',
      heading: '개인파산 자격제한 받는 직업은 어떤 게 있나요?',
      subtitle: '각 법률에서 파산자를 결격사유로 정한 직업이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            파산자는 개별 법률에서 정한 자격 결격사유에 해당해요. 대표적으로 <strong>변호사, 공인회계사, 법무사, 세무사, 공무원</strong> 등이 있어요. 이 직업들은 각각의 개별법에서 '파산선고를 받고 복권되지 아니한 자'를 결격사유로 규정하고 있어요. 일반 회사원이나 자영업자는 해당되지 않으니 지나치게 걱정할 필요는 없어요.
          </p>

          {/* 자격제한 직업 테이블 */}
          <SpokeTable
            id="tbl1"
            title="개인파산 자격제한 주요 직업"
            subtitle="파산선고 후 복권 전까지 제한"
            headers={['직업', '근거 법령']}
            rows={RESTRICTION_TABLE_ROWS}
            highlightCol={1}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            위 목록 외에도 신용정보회사 임원, 보험설계사, 상호저축은행 이사 등 금융 관련 직종에서도 자격제한이 있어요. 중요한 건 이 제한이 '복권되지 아니한 자'에게만 적용된다는 거예요. 면책결정이 확정되면 당연복권이 되니까 제한이 바로 풀려요.
          </p>

          {/* 일반 직장인 안심 팁 */}
          <TipBox title="일반 직장인이라면?">
            <p className="mb-0 leading-relaxed">
              일반 회사원, 자영업자, 프리랜서는 파산 선고 후에도 <strong>직업 자격에 영향이 없어요</strong>. 회사에 파산 사실이 통보되지도 않아요. 다만 법인 대표이사나 이사직은 <a href="https://www.law.go.kr/법령/상법/제382조" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">상법 제382조</a>에 따라 퇴임 사유가 될 수 있어요.
            </p>
          </TipBox>

          {/* 전환 문장 — E. 실용 연결형 */}
          <p className="text-neutral-600 mb-4 leading-relaxed">
            자격제한이 생겨도 면책만 받으면 풀린다고 했는데, 구체적으로 복권이 어떻게 되는지 정리했어요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '복권 절차',
        title: '자격제한은 언제, 어떻게 풀릴까?',
        desc: '당연복권과 신청복권 조건 확인',
        icon: 'check',
      },
    },

    /**
     * ===== S3: 복권 신청 방법 =====
     *
     * 패턴: 설명 → 체크리스트(SpokeChecklist) → 타임라인(SpokeTimeline)
     * 전환 스타일: B. 자연 호기심형
     * 시각 요소: SpokeChecklist + SpokeTimeline = 2개
     */
    {
      id: 's3',
      number: '03',
      heading: '개인파산 복권은 어떻게 신청하나요?',
      subtitle: '면책을 받았다면 따로 신청할 필요 없이 자동으로 복권돼요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            복권에는 <strong>당연복권</strong>과 <strong>신청복권</strong> 두 가지가 있어요. 대부분의 개인파산 신청자는 면책결정을 받으니까 당연복권에 해당해요. <a href="https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=616&ccfNo=4&cciNo=1&cnpClsNo=3" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">채무자회생법 제574조</a>에 따르면 면책결정이 확정되는 순간 별도 신청 없이 자동으로 복권돼요. 따로 복권 신청서를 낼 필요가 없다는 뜻이에요.
          </p>

          {/* 당연복권 요건 체크리스트 */}
          <SpokeChecklist items={[
            { text: '면책결정이 확정된 경우 (가장 일반적)', done: true },
            { text: '파산채권자 전원 동의로 파산폐지결정 확정', done: false, note: '드문 경우' },
            { text: '파산선고 후 사기파산죄 유죄 판결 없이 10년 경과', done: false, note: '면책 없이도 가능' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            면책이 불허가되거나 면책신청을 철회한 경우에는 당연복권이 안 돼요. 이때는 <a href="https://www.law.go.kr/법령/채무자회생및파산에관한법률/제575조" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">채무자회생법 제575조</a>에 따라 신청복권을 해야 해요. 파산채권자에 대한 채무 전부를 갚았다는 증명서류를 법원에 제출하면 돼요. 법원이 이를 공고한 뒤 채권자 이의가 없으면 복권결정이 나와요.
          </p>

          {/* 신청복권 절차 타임라인 */}
          <SpokeTimeline events={[
            { month: '1단계', title: '복권 신청서 제출', desc: '채무 변제 증명서류 첨부해서 법원에 제출', status: 'normal' },
            { month: '2단계', title: '법원 공고', desc: '법원이 신청 내용을 공고하고 서류 비치', status: 'normal' },
            { month: '3단계', title: '이의 기간', desc: '공고 후 3개월간 채권자 이의신청 가능', status: 'current', tag: '3개월' },
            { month: '4단계', title: '복권결정 확정', desc: '이의 없으면 복권결정, 파산 전 상태로 복구', status: 'normal' },
          ]} />

          {/* 전환 문장 — B. 자연 호기심형 */}
          <p className="text-neutral-600 mb-4 leading-relaxed">
            복권으로 자격제한은 풀리는데 한 가지 궁금한 게 남죠. 신용등급은 언제쯤 정상으로 돌아올까요?
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '신용 회복',
        title: '면책 후 신용은 언제 돌아올까?',
        desc: '신용 기록 삭제 시기와 회복 방법',
        icon: 'clock',
      },
    },

    /**
     * ===== S4: 면책 후 신용 회복 =====
     *
     * 패턴: 설명 → 스텝카드(SpokeStepCards) → 체크리스트(SpokeChecklist)
     * 전환 스타일: 없음 (마지막 본문 섹션 — primary CTA로 마무리)
     * 시각 요소: SpokeStepCards + SpokeChecklist = 2개
     */
    {
      id: 's4',
      number: '04',
      heading: '개인파산 면책 후 신용은 어떻게 회복하나요?',
      subtitle: '면책 기록은 5년간 남고, 그 이후부터 본격 회복이 시작돼요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            면책결정이 확정되면 법원이 <strong>한국신용정보원</strong>에 면책 사실을 등록해요. <a href="https://www.niceinfo.co.kr/creditrating/cb_info_4_3_4.nice" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">NICE 신용정보</a> 기준으로 파산 면책 기록은 등록일로부터 <strong>5년간</strong> 신용평점에 반영돼요. 5년이 지나면 기록이 삭제되면서 신용점수가 단계적으로 올라가요. 기록이 남아 있는 동안에도 소액 금융거래부터 조금씩 시작하면 회복 속도가 빨라져요.
          </p>

          {/* 신용 회복 단계 */}
          <SpokeStepCards steps={[
            { title: '면책 직후 — 면책 정보 등록', desc: '한국신용정보원에 면책 사실이 등록되고, 신용점수가 하락한 상태에요', tip: '면책 결정문을 꼭 보관하세요' },
            { title: '1~2년차 — 소액 금융거래 시작', desc: '체크카드, 적금 등 소액 거래로 신용 이력을 쌓기 시작해요', tip: '월 10만원 이상 꾸준히 사용' },
            { title: '5년 경과 — 면책 기록 삭제', desc: '신용평점 반영이 종료되고, 점수 회복이 본격화돼요' },
            { title: '5~7년차 — 정상 금융거래 가능', desc: '제2금융권 대출부터 단계적으로 가능해져요' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            신용 회복을 앞당기려면 면책 직후부터 꾸준히 금융거래 이력을 쌓는 게 중요해요. 통신요금이나 공과금을 자동이체로 설정하고, 체크카드를 꾸준히 사용하는 것만으로도 도움이 돼요. 반대로 이 기간에 연체가 발생하면 신용 회복이 크게 늦어지니까 무리한 대출은 피해야 해요.
          </p>

          {/* 신용 회복 실천 체크리스트 */}
          <SpokeChecklist items={[
            { text: '체크카드 발급 후 꾸준히 사용 (월 10만원 이상)', done: false, note: '가장 쉬운 첫걸음' },
            { text: '통신요금, 공과금 자동이체 설정', done: false, note: '정기 납부 이력이 쌓여요' },
            { text: '적금 가입 (소액이라도 6개월 이상 유지)', done: false, note: '금융거래 이력 확보' },
            { text: '면책 후 5년간 절대 연체 금지', done: false, note: '연체 시 회복 속도 크게 저하' },
            { text: 'NICE, KCB에서 내 신용점수 정기 확인', done: false, note: '올크레딧, 나이스 지키미 무료' },
          ]} />
        </>
      ),
      bridgeCTA: {
        href: '/w/개인파산-면책-신청-절차-비용',
        badge: '전체 절차',
        title: '개인파산 신청부터 면책까지 전체 흐름이 궁금하다면',
        desc: '개인파산 면책 신청 절차와 비용 확인하기',
        icon: 'grid',
        primary: true,
      },
    },

    /**
     * ===== S5: FAQ =====
     * content: null -> FAQ 자동 렌더링
     */
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
      question: '개인파산 선고 사실이 회사에 통보되나요?',
      answer: '법원이 직장에 파산 사실을 알리지는 않아요. 다만 관보에 공고되기 때문에 이론상 확인은 가능하지만, 실제로 관보를 일일이 확인하는 회사는 거의 없어요. <strong>급여 압류</strong>가 진행 중이었다면 면책결정으로 압류가 풀리면서 회사가 간접적으로 알게 될 수는 있어요.',
    },
    {
      question: '개인파산 면책 후 대출은 언제부터 가능한가요?',
      answer: '면책 기록이 신용정보원에 <strong>5년간</strong> 남아 있어서 그 기간에는 1금융권 대출이 어려워요. 보통 면책 후 5~7년 지나면 제2금융권 소액 대출부터 가능해지고, 체크카드 사용이나 적금 유지로 신용 이력을 꾸준히 쌓으면 회복 속도가 빨라져요.',
    },
  ],

  relatedSpokes: [
    { badge: '신청 자격', title: '개인파산 신청 자격 조건과 지급불능 기준', desc: '누가 파산 신청을 할 수 있는지, 지급불능 상태란 무엇인지', href: '/w/개인파산-신청-자격-조건-지급불능' },
    { badge: '면책불허가', title: '개인파산 면책불허가 사유와 재량면책', desc: '도박 채무도 면책받을 수 있는지, 재량면책 기준', href: '/w/개인파산-면책불허가-도박-재량면책' },
    { badge: '재신청', title: '개인파산 재신청 조건과 면책 후 7년 제한', desc: '한 번 면책받은 후 다시 신청할 수 있는 조건', href: '/w/개인파산-재신청-조건-면책후-7년' },
    { badge: '비교', title: '개인파산과 개인회생 선택 기준 비교', desc: '내 상황에 맞는 제도는 파산인지 회생인지', href: '/w/개인파산-개인회생-선택기준-비교' },
  ],

  sources: [
    { name: '채무자 회생 및 파산에 관한 법률', url: 'https://www.law.go.kr/법령/채무자회생및파산에관한법률', org: '법제처' },
    { name: '개인파산 면책 - 복권 안내', url: 'https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=616&ccfNo=4&cciNo=1&cnpClsNo=3', org: '찾기쉬운 생활법령정보' },
    { name: '신용정보 등록 기간 안내', url: 'https://www.niceinfo.co.kr/creditrating/cb_info_4_3_4.nice', org: 'NICE평가정보' },
    { name: '서울회생법원 개인파산 안내', url: 'https://slb.scourt.go.kr/rel/guide/personal_b/index.jsp', org: '서울회생법원' },
  ],
}

export default data
