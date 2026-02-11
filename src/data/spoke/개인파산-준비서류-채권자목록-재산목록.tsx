import Link from 'next/link'
import type { SpokeData } from './types'
import { SpokeChecklist, SpokeTable, SpokeWarnBox, SpokeStepCards, TipBox } from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '개인파산-준비서류-채권자목록-재산목록',

  meta: {
    title: '개인파산 준비서류 작성 방법 채권자목록과 재산목록 기재',
    description: '채권자목록에 빠진 채권자는 면책이 안 된다는 거 아시나요? 준비서류 작성 방법과 누락 시 불이익을 알려드려요',
    keywords: ['개인파산 준비서류 작성 방법', '개인파산 채권자목록 기재 방법', '개인파산 재산목록 작성 기준', '개인파산 서류 누락 시 불이익'],
    ogTitle: '개인파산 준비서류 작성 방법 채권자목록과 재산목록 기재 | 머니위키',
    ogDescription: '채권자목록, 재산목록, 진술서까지 개인파산 신청 서류 작성법 총정리',
  },

  hub: {
    url: '/w/개인파산-면책-신청-절차-비용',
    name: '개인파산 면책 신청 절차와 비용',
  },

  breadcrumb: ['법률', '개인파산 준비서류'],

  hero: {
    badge: '2026년 기준',
    h1: <>개인파산 <span className="text-[#1E3A5F]">준비서류</span> 작성 방법 — 채권자목록과 재산목록 기재</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          파산 신청하려고 서류를 펼쳤는데 채권자목록, 재산목록, 진술서까지 뭘 어디에 써야 하는지 막막했다면 잘 오셨어요. <strong>채권자목록</strong>에서 채권자 하나라도 빠지면 그 빚만 면책이 안 될 수 있어요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          <a href="https://www.law.go.kr/법령/채무자회생및파산에관한법률" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">채무자 회생 및 파산에 관한 법률</a> 기준으로 각 서류별 기재 사항과 자주 틀리는 부분까지 정리했어요. 신청 자격이나 비용이 궁금하면 <Link href="/w/개인파산-면책-신청-절차-비용" className="text-blue-600 hover:underline">개인파산 전체 절차 안내</Link>도 같이 보면 좋아요. 먼저 어떤 서류가 필요한지부터 볼게요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '전체 절차',
      desc: '개인파산 신청부터 면책까지 전체 흐름 확인하기',
    },
  },

  toc: [
    { id: 's1', text: '개인파산 준비서류는 어떻게 작성하나요?' },
    { id: 's2', text: '개인파산 채권자목록은 어떻게 기재하나요?' },
    { id: 's3', text: '개인파산 재산목록 작성 기준은 뭔가요?' },
    { id: 's4', text: '개인파산 서류를 누락하면 어떤 불이익이 있나요?' },
    { id: 's5', text: '자주 묻는 질문' },
  ],

  sections: [
    /**
     * ===== S1: 개인파산 준비서류 개요 =====
     * 패턴: 개념 설명 → 체크리스트(SpokeChecklist) → 절차(SpokeStepCards)
     * 전환 스타일: D. 화제 전환형
     * 시각 요소: SpokeChecklist + SpokeStepCards = 2개
     */
    {
      id: 's1',
      number: '01',
      heading: '개인파산 준비서류는 어떻게 작성하나요?',
      subtitle: '파산·면책 동시신청 기준 핵심 서류 4가지예요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            개인파산을 신청하려면 파산·면책 신청서 외에 <strong>채권자목록, 재산목록, 진술서, 수입 및 지출에 관한 목록</strong> 이렇게 4가지 첨부서류를 함께 내야 해요. <a href="https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=616&ccfNo=2&cciNo=2&cnpClsNo=1" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">찾기쉬운 생활법령정보</a>에서 양식을 확인할 수 있어요. 법원마다 양식이 조금씩 다를 수 있으니 관할 법원 홈페이지에서 최신 양식을 내려받는 게 좋아요. 빠진 서류가 있으면 보정명령이 나오고, 기한 안에 보완하지 않으면 신청이 각하돼요.
          </p>

          <SpokeChecklist items={[
            { text: '파산·면책 신청서 (인적사항, 신청 취지 기재)', done: true },
            { text: '채권자목록 (모든 채권자, 채권액, 발생원인)', done: false, note: '누락 시 면책 제외 위험' },
            { text: '재산목록 (현금, 예금, 보험, 부동산 등 전부)', done: false, note: '숨기면 면책불허가 사유' },
            { text: '진술서 (파산 경위, 생활상황, 반성문 성격)', done: false },
            { text: '수입 및 지출에 관한 목록 (월 소득·지출 내역)', done: false },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            서류 작성이 어려우면 <a href="https://resu.klac.or.kr/resu/resu_info3.jsp" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">대한법률구조공단</a>의 무료 법률구조를 이용할 수 있어요. 소득이 기준 중위소득 125% 이하면 변호사 선임 비용 없이 도움받을 수 있어요. 전체 작성 흐름은 아래처럼 진행돼요.
          </p>

          <SpokeStepCards steps={[
            { title: '양식 내려받기', desc: '관할 법원 전자민원센터에서 최신 양식을 내려받아요' },
            { title: '증빙자료 모으기', desc: '부채증명서, 통장거래내역, 등기부등본 등 첨부서류를 준비해요' },
            { title: '목록 작성', desc: '채권자목록, 재산목록, 수입지출목록을 빠짐없이 기재해요' },
            { title: '진술서 작성', desc: '파산에 이르게 된 경위와 현재 생활상황을 솔직하게 써요' },
          ]} />

          {/* 전환 문장 — D. 화제 전환형 */}
          <p className="text-neutral-600 mb-4 leading-relaxed">
            그런데 이 서류 중에서 가장 조심해야 할 게 채권자목록이에요. 한 명이라도 빠지면 그 빚만 면책에서 빠질 수 있거든요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '채권자목록',
        title: '채권자 한 명 빠지면 그 빚만 면책 안 된다?',
        desc: '채권자목록 빠짐없이 기재하는 방법',
        icon: 'info',
      },
    },

    /**
     * ===== S2: 채권자목록 기재 방법 =====
     * 패턴: 핵심 설명 → 표(SpokeTable) → 주의(SpokeWarnBox)
     * 전환 스타일: E. 실용 연결형
     * 시각 요소: SpokeTable + SpokeWarnBox = 2개
     */
    {
      id: 's2',
      number: '02',
      heading: '개인파산 채권자목록은 어떻게 기재하나요?',
      subtitle: '채권자명, 채권액, 발생원인을 빠짐없이 적어야 해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            채권자목록에는 본인에게 돈을 빌려준 모든 채권자를 적어야 해요. 은행 대출, 카드 할부, 지인 빌린 돈, 세금 체납까지 전부 포함이에요. <a href="https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=616&ccfNo=2&cciNo=2&cnpClsNo=3" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">생활법령정보 채권자목록 작성 안내</a>에 따르면, 채권자별로 성명(또는 상호), 주소, 채권 발생 원인, 잔존 채권액을 기재하고, 부채증명서를 첨부해야 해요.
          </p>

          <SpokeTable
            id="tbl1"
            title="채권자목록 기재 항목"
            subtitle="채권자별로 아래 항목을 모두 적어요"
            headers={['기재 항목', '작성 방법', '첨부 서류']}
            rows={[
              ['채권자 성명(상호)', '은행명, 카드사명, 개인 이름 등', '없음'],
              ['채권자 주소', '본점 주소 또는 채권자 주소', '없음'],
              ['채권 발생 원인', '신용대출, 카드론, 개인차용 등', '계약서 사본'],
              ['잔존 채권액', '현재 남은 원금 + 이자', '부채증명서'],
              ['담보 유무', '담보 있으면 담보물 기재', '등기부등본'],
            ]}
            highlightCol={1}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            부채증명서는 각 금융기관에서 발급받으면 돼요. 은행은 인터넷뱅킹, 카드사는 고객센터에서 받을 수 있어요. 개인 채권자한테 빌린 돈은 차용증이나 이체 내역으로 증빙하면 돼요. 금액이 정확하지 않으면 "약 OO만원"으로 기재하되 최대한 실제 금액에 가깝게 적어야 해요.
          </p>

          <SpokeWarnBox title="주의사항">
            <p className="mb-0 leading-relaxed">
              보증채무를 빠뜨리는 경우가 많아요. 본인이 누군가의 <strong>연대보증</strong>을 선 적이 있다면 그것도 채권자목록에 반드시 기재해야 해요. 또한 세금 체납(국세, 지방세)이 있으면 비면책채권이지만 목록에는 적어야 해요. 빠뜨리면 재산 은닉으로 의심받을 수 있어요.
            </p>
          </SpokeWarnBox>

          {/* 전환 문장 — E. 실용 연결형 */}
          <p className="text-neutral-600 mb-4 leading-relaxed">
            채권자목록을 다 적었으면 이제 재산목록 차례예요. 어디까지 적어야 하는지 기준을 정리했어요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '재산목록',
        title: '재산목록에는 뭘 어디까지 적어야 할까?',
        desc: '현금부터 퇴직금까지 기재 기준 확인',
        icon: 'grid',
      },
    },

    /**
     * ===== S3: 재산목록 작성 기준 =====
     * 패턴: 핵심 설명 → 체크리스트(SpokeChecklist) → 팁(TipBox)
     * 전환 스타일: A. 독자 대변형
     * 시각 요소: SpokeChecklist + TipBox = 2개
     */
    {
      id: 's3',
      number: '03',
      heading: '개인파산 재산목록 작성 기준은 뭔가요?',
      subtitle: '소유한 재산 전부를 적되, 면제재산은 따로 신청해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            재산목록에는 본인이 가진 <strong>모든 재산</strong>을 빠짐없이 적어야 해요. <a href="https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=616&ccfNo=2&cciNo=2&cnpClsNo=4" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">생활법령정보 재산목록 작성 안내</a>에 따르면, 현금, 예금, 보험, 부동산, 자동차, 퇴직금 등이 전부 대상이에요. 재산을 숨기거나 적게 적으면 면책불허가 사유에 해당해요. 솔직하게 전부 기재하는 게 오히려 면책에 유리해요.
          </p>

          <SpokeChecklist items={[
            { text: '현금 (수중에 있는 현금 전부)', done: true },
            { text: '예금 (모든 금융기관 잔액 + 최근 1년 거래내역)', done: true, note: '통장 사본 첨부' },
            { text: '보험 (해약환급금 기준 금액 기재)', done: false, note: '생명보험협회 가입내역 조회' },
            { text: '임차보증금 (전세·월세 보증금)', done: false, note: '임대차계약서 첨부' },
            { text: '퇴직금 (재직 중이면 예상 퇴직금의 1/2)', done: false, note: '1/2은 압류금지 재산' },
            { text: '부동산 (토지, 건물 — 시가 기준)', done: false, note: '등기부등본 + 시세 자료' },
            { text: '자동차 (중고차 시세 기준)', done: false, note: '자동차등록증 사본' },
            { text: '주식·펀드 (평가금액 기준)', done: false },
            { text: '대여금·매출금 (남에게 빌려준 돈)', done: false },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            재산이 있다고 무조건 불리한 건 아니에요. 생활에 꼭 필요한 재산은 <strong>면제재산</strong>으로 인정받을 수 있어요. 예금은 1인당 185만원까지 압류금지 대상이고, 퇴직금은 절반이 압류금지예요. 면제재산 결정신청서를 같이 내면 법원이 판단해줘요.
          </p>

          <TipBox title="재산 평가 기준이 헷갈린다면?">
            <p className="mb-0 leading-relaxed">
              부동산은 <strong>KB시세 또는 국토부 실거래가</strong> 기준이에요. 자동차는 중고차 시세 조회 사이트 캡처를 첨부하면 돼요. 보험은 각 보험사에 <strong>해약환급금 증명서</strong>를 요청하면 정확한 금액을 알 수 있어요. 잘 모르겠으면 법률구조공단 상담에서 도움받을 수 있어요.
            </p>
          </TipBox>

          {/* 전환 문장 — A. 독자 대변형 */}
          <p className="text-neutral-600 mb-4 leading-relaxed">
            여기까지 보면 결국 가장 걱정되는 건 '실수로 빠뜨리면 어떡하지?'일 거예요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '불이익',
        title: '서류에서 뭘 빠뜨리면 어떻게 될까?',
        desc: '면책 제외부터 면책불허가까지 불이익 총정리',
        icon: 'info',
      },
    },

    /**
     * ===== S4: 서류 누락 시 불이익 =====
     * 패턴: 핵심 설명 → 표(SpokeTable) → 팁(TipBox)
     * 전환 스타일: 없음 (마지막 본문 — primary CTA)
     * 시각 요소: SpokeTable + SpokeStepCards = 2개
     */
    {
      id: 's4',
      number: '04',
      heading: '개인파산 서류를 누락하면 어떤 불이익이 있나요?',
      subtitle: '채권자목록 누락은 비면책, 재산 은닉은 면책불허가예요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            서류를 빠뜨리거나 거짓으로 작성하면 크게 두 가지 불이익이 있어요. 첫째, <strong>채권자목록에서 빠진 채권자의 빚은 면책되지 않아요</strong>. <a href="https://www.law.go.kr/법령/채무자회생및파산에관한법률/제566조" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">채무자회생법 제566조 제7호</a>에 따라 '악의로 기재하지 않은 채권'은 비면책채권이 돼요. 둘째, 재산을 숨기거나 거짓으로 적으면 <strong>면책 자체가 불허가</strong>될 수 있어요.
          </p>

          <SpokeTable
            id="tbl2"
            title="서류 누락·허위 기재 시 불이익"
            subtitle="유형별 법적 결과"
            headers={['유형', '법적 근거', '불이익']}
            rows={[
              ['채권자 누락 (악의)', '제566조 제7호', '해당 채권 면책 제외'],
              ['채권자 누락 (과실)', '대법원 판례', '면책 효력 유지 가능'],
              ['재산 은닉·허위 기재', '제564조 제1항', '면책불허가'],
              ['서류 미제출·미보정', '법원 보정명령', '신청 각하'],
            ]}
            highlightCol={3}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            다만 '악의'와 '과실'은 구분돼요. 대법원 판례(2019다256167)에 따르면, 채무가 있다는 걸 알면서 일부러 빠뜨린 건 악의이고, 정말 몰랐거나 실수로 빠뜨린 건 과실이에요. 과실인 경우에는 면책 효력이 유지될 수 있어요. 하지만 이 입증 과정이 복잡하니까 처음부터 빠짐없이 기재하는 게 훨씬 안전해요.
          </p>

          <SpokeStepCards steps={[
            { title: '신용정보 조회', desc: '한국신용정보원(올크레딧) 또는 나이스지킴이에서 전체 채무 내역을 조회해요', tip: '본인도 모르는 채무가 나올 수 있어요' },
            { title: '금융기관별 부채증명서', desc: '은행, 카드사, 캐피탈 등에서 각각 부채증명서를 발급받아 대조해요' },
            { title: '개인 채무 점검', desc: '지인한테 빌린 돈, 보증 선 내역까지 빠짐없이 확인해요' },
          ]} />
        </>
      ),
      bridgeCTA: {
        href: '/w/개인파산-면책-신청-절차-비용',
        badge: '전체 절차',
        title: '개인파산 신청부터 면책까지 전체 흐름이 궁금하다면',
        desc: '신청 자격, 비용, 기간까지 한눈에 확인',
        icon: 'info',
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
      question: '개인파산 준비서류를 대리인이 작성해도 되나요?',
      answer: '네, 변호사나 법무사에게 대리 작성을 맡길 수 있어요. 다만 <strong>진술서</strong>는 본인의 경험을 바탕으로 쓰는 서류라 대리인이 틀을 잡아주더라도 내용은 본인이 직접 확인해야 해요. 소득이 낮으면 <strong>대한법률구조공단</strong>에서 무료로 변호사를 선임받을 수 있어요.',
    },
    {
      question: '개인파산 서류 제출 후에 채권자를 추가할 수 있나요?',
      answer: '면책결정 확정 전까지는 <strong>채권자목록 보정서</strong>를 제출해서 추가할 수 있어요. 빠진 채권자를 나중에 발견했다면 바로 법원에 보정서를 내야 해요. 면책결정이 확정된 뒤에는 추가가 안 되니까, 신청 단계에서 빠짐없이 확인하는 게 중요해요.',
    },
  ],

  relatedSpokes: [
    { badge: '신청 자격', title: '개인파산 신청 자격과 조건 지급불능 판단 기준', desc: '파산 신청이 가능한 조건과 지급불능 상태 판단법', href: '/w/개인파산-신청-자격-조건-지급불능' },
    { badge: '신청 비용', title: '개인파산 신청 비용 송달료와 소송구조 제도', desc: '인지대, 송달료 비용과 무료 법률구조 이용 방법', href: '/w/개인파산-신청-비용-송달료-소송구조' },
    { badge: '면책불허가', title: '개인파산 면책불허가 사유 도박과 재량면책', desc: '면책이 거부되는 사유와 재량면책 가능성', href: '/w/개인파산-면책불허가-도박-재량면책' },
    { badge: '관할법원', title: '개인파산 관할법원 접수와 서울회생법원 안내', desc: '어디에 신청해야 하는지 관할법원 기준 안내', href: '/w/개인파산-관할법원-접수-서울회생법원' },
  ],

  sources: [
    { name: '채무자 회생 및 파산에 관한 법률', url: 'https://www.law.go.kr/법령/채무자회생및파산에관한법률', org: '법제처' },
    { name: '개인파산·면책 신청서류 작성 안내', url: 'https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=616&ccfNo=2&cciNo=2&cnpClsNo=1', org: '찾기쉬운 생활법령정보' },
    { name: '채권자목록 작성 방법', url: 'https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=616&ccfNo=2&cciNo=2&cnpClsNo=3', org: '찾기쉬운 생활법령정보' },
    { name: '재산목록 작성 방법', url: 'https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=616&ccfNo=2&cciNo=2&cnpClsNo=4', org: '찾기쉬운 생활법령정보' },
    { name: '파산 면책 법률구조 안내', url: 'https://resu.klac.or.kr/resu/resu_info3.jsp', org: '대한법률구조공단' },
    { name: '대법원 2019다256167 (비면책채권 판단 기준)', url: 'https://casenote.kr/대법원/2019다256167', org: '대법원' },
  ],
}

export default data
