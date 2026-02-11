import Link from 'next/link'
import type { SpokeData } from './types'
import { SpokeTimeline, SpokeFlow, SpokeStepCards, TipBox, SpokeTable } from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '개인파산-관할법원-접수-서울회생법원',

  meta: {
    title: '개인파산 관할법원 접수 방법 서울회생법원과 지방법원 선택',
    description: '개인파산은 주소지 관할 지방법원 본원에만 접수할 수 있다는 거 아시나요? 관할법원 선택과 전자소송 접수 방법을 알려드려요',
    keywords: ['개인파산 관할법원 접수 방법', '서울회생법원 개인파산 접수', '개인파산 전자소송 신청 방법', '개인파산 접수 후 심문 기간'],
    ogTitle: '개인파산 관할법원 접수 방법 | 머니위키',
    ogDescription: '관할법원 선택부터 전자소송 접수, 심문 기간까지 한 번에',
  },

  hub: {
    url: '/w/개인파산-면책-신청-절차-비용',
    name: '개인파산 면책 신청 절차와 비용',
  },

  breadcrumb: ['법률', '개인파산 관할법원'],

  hero: {
    badge: '2026년 기준',
    h1: <>개인파산 <span className="text-[#1E3A5F]">관할법원</span> 접수 방법 — 서울회생법원과 지방법원 선택</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          개인파산 신청서를 쓰긴 했는데 어느 법원에 내야 하는지 몰라서 멈춰 있다면 잘 오셨어요. <strong>관할법원</strong>을 잘못 선택하면 접수 자체가 반려될 수 있어서 처음부터 정확히 알아두는 게 중요해요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          <a href="https://www.law.go.kr/법령/채무자회생및파산에관한법률/제3조" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">채무자 회생 및 파산에 관한 법률 제3조</a>에 따라 개인파산은 주소지 관할 지방법원 본원 또는 회생법원에만 접수할 수 있어요. 서류 준비와 비용이 궁금하면 <Link href="/w/개인파산-면책-신청-절차-비용" className="text-blue-600 hover:underline">개인파산 전체 절차 안내</Link>도 같이 참고하면 좋아요. 먼저 관할법원 정하는 법부터 볼게요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '전체 절차',
      desc: '개인파산 신청부터 면책까지 전체 흐름 확인하기',
    },
  },

  toc: [
    { id: 's1', text: '개인파산 관할법원에 어떻게 접수하나요?' },
    { id: 's2', text: '서울회생법원에서 개인파산 접수는 어떻게 하나요?' },
    { id: 's3', text: '개인파산 전자소송으로 신청할 수 있나요?' },
    { id: 's4', text: '개인파산 접수 후 심문까지 얼마나 걸리나요?' },
    { id: 's5', text: '자주 묻는 질문' },
  ],

  sections: [
    /**
     * ===== S1: 관할법원 접수 방법 =====
     * 패턴: 개념 설명 → 흐름도(SpokeFlow) → 데이터(SpokeTable)
     * 전환 스타일: C. 간결 연결형
     * 시각 요소: SpokeFlow + SpokeTable = 2개
     */
    {
      id: 's1',
      number: '01',
      heading: '개인파산 관할법원에 어떻게 접수하나요?',
      subtitle: '채무자의 주소지 관할 지방법원 본원에만 접수할 수 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            개인파산 신청서는 아무 법원에나 내는 게 아니에요. <a href="https://www.law.go.kr/법령/채무자회생및파산에관한법률/제3조" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">채무자 회생 및 파산에 관한 법률 제3조</a>에 따라 채무자의 <strong>보통재판적 소재지</strong>를 관할하는 회생법원에 전속관할이 돼요. 쉽게 말하면 주민등록상 주소지를 기준으로 관할법원이 정해져요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            여기서 중요한 포인트가 하나 있어요. 개인파산은 <strong>지방법원 본원</strong>에만 접수할 수 있고, 지원에는 접수가 안 돼요. 예를 들어 부천시에 사는 분은 인천지방법원 부천지원이 아니라 <strong>인천지방법원 본원</strong>에 신청해야 해요. 다만 강릉 지역 거주자는 춘천지방법원 강릉지원에도 접수할 수 있는 특례가 있어요.
          </p>

          {/* 관할법원 결정 흐름: SpokeFlow */}
          <SpokeFlow steps={[
            { icon: '1', label: '주소 확인', sub: '주민등록상 주소' },
            { icon: '2', label: '관할 확인', sub: '지방법원 본원' },
            { icon: '3', label: '서류 준비', sub: '신청서+첨부서류' },
            { icon: '4', label: '접수', sub: '방문 또는 전자소송' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            주소가 대한민국에 없거나 알 수 없으면 거소(실제 생활하는 곳)를 기준으로 하고, 거소도 불분명하면 마지막 주소지를 기준으로 해요. 또한 주채무자나 보증인 중 한 명이 이미 파산 절차를 진행 중이라면 그 법원에 함께 접수할 수도 있어요.
          </p>

          {/* 지역별 관할법원: SpokeTable */}
          <SpokeTable
            id="tbl1"
            title="주요 지역별 개인파산 관할법원"
            subtitle="2026년 기준"
            headers={['거주 지역', '관할법원', '비고']}
            rows={[
              ['서울특별시', '서울회생법원', '서울 전 지역 통합'],
              ['인천·부천·김포', '인천지방법원 본원', '부천지원 접수 불가'],
              ['수원·성남·용인', '수원지방법원 본원', '성남지원 접수 불가'],
              ['부산·울산·경남', '부산회생법원', '울산·경남 특례 적용'],
              ['대전·충남', '대전지방법원 본원', ''],
              ['대구·경북', '대구지방법원 본원', ''],
              ['광주·전남', '광주지방법원 본원', ''],
            ]}
            highlightCol={2}
          />

          {/* 전환 문장 — C. 간결 연결형 */}
          <p className="text-neutral-600 mb-4 leading-relaxed">
            관할법원 기준을 알았으니, 서울에 사는 분들이 접수하는 서울회생법원 절차를 구체적으로 넘어갈게요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '서울 접수',
        title: '서울회생법원에는 어떻게 접수하나요?',
        desc: '서울 거주자 전용 관할법원 접수 방법',
        icon: 'info',
      },
    },

    /**
     * ===== S2: 서울회생법원 접수 =====
     * 패턴: 설명 → 단계(SpokeStepCards) → 팁(TipBox)
     * 전환 스타일: B. 자연 호기심형
     * 시각 요소: SpokeStepCards + TipBox = 2개
     */
    {
      id: 's2',
      number: '02',
      heading: '서울회생법원에서 개인파산 접수는 어떻게 하나요?',
      subtitle: '서울 전 지역 거주자는 서울회생법원에 접수해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            서울시에 주민등록이 되어 있으면 주소지와 관계없이 <strong>서울회생법원</strong>에 접수해야 해요. 강남이든 노원이든 관할법원이 서울동부지방법원이나 서울남부지방법원이더라도 개인파산만큼은 서울회생법원으로 통합되어 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            서울회생법원은 서울 서초구 법원로 3에 위치해 있고, 2호선 서초역 또는 교대역에서 가까워요. 접수할 때는 <strong>파산 및 면책 신청서</strong>를 동시에 제출하는 게 일반적이에요. 파산만 신청하고 면책을 따로 내면 별도 절차가 필요해서 번거로워져요.
          </p>

          {/* 접수 절차: SpokeStepCards */}
          <SpokeStepCards steps={[
            { title: '신청서 작성', desc: '파산 및 면책 동시신청서를 작성해요. 서울회생법원 홈페이지에서 양식을 내려받을 수 있어요', tip: '채권자목록, 재산목록, 수입·지출 내역서 첨부 필수' },
            { title: '인지대·송달료 납부', desc: '인지대 3만원 + 송달료(기본 10회분 + 채권자 수 x 8회분)를 납부해요', tip: '소송구조 신청 시 납부 면제 가능' },
            { title: '법원 접수', desc: '서울회생법원 민원실에 방문 접수하거나, 전자소송으로 온라인 접수해요' },
            { title: '사건번호 수령', desc: '접수가 완료되면 사건번호가 부여돼요. 이후 진행 상황은 이 번호로 조회할 수 있어요' },
          ]} />

          {/* 팁: TipBox */}
          <TipBox title="소송구조 제도를 활용하세요">
            <p className="mb-0 leading-relaxed">
              비용이 부담되면 <strong>소송구조 신청</strong>을 함께 할 수 있어요. 소송구조가 인정되면 인지대와 송달료 납부가 면제되거나 유예돼요. 신청서에 소득·재산 증빙을 첨부하면 돼요.
            </p>
          </TipBox>

          {/* 전환 문장 — B. 자연 호기심형 */}
          <p className="text-neutral-600 mb-4 leading-relaxed">
            여기까지 보면 궁금한 게 하나 생기죠. 꼭 법원에 직접 가야 하는 건지, 온라인으로도 접수할 수 있는 건지요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '온라인 접수',
        title: '전자소송으로도 파산 신청할 수 있을까?',
        desc: '법원 방문 없이 온라인으로 접수하는 방법',
        icon: 'calc',
      },
    },

    /**
     * ===== S3: 전자소송 신청 =====
     * 패턴: 설명 → 타임라인(SpokeTimeline) → 흐름도(SpokeFlow)
     * 전환 스타일: D. 화제 전환형
     * 시각 요소: SpokeTimeline + SpokeFlow = 2개
     */
    {
      id: 's3',
      number: '03',
      heading: '개인파산 전자소송으로 신청할 수 있나요?',
      subtitle: '대법원 전자소송 포털에서 온라인 접수가 가능해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            네, 개인파산도 <strong>전자소송</strong>으로 접수할 수 있어요. <a href="https://ecfs.scourt.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">대법원 전자소송 포털</a>에서 회원가입 후 파산 및 면책 신청서를 온라인으로 제출하면 돼요. 법원에 직접 가지 않아도 되니까 지방에 사시는 분들에게 특히 편리해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            전자소송을 이용하려면 <strong>전자소송 동의서</strong>를 먼저 제출해야 해요. 본인 인증은 공동인증서(구 공인인증서), 금융인증서, 또는 간편인증(카카오·네이버 등)으로 할 수 있어요. 신청서와 첨부서류는 모두 PDF나 이미지 파일로 변환해서 올리면 돼요.
          </p>

          {/* 전자소송 절차: SpokeTimeline */}
          <SpokeTimeline events={[
            { month: '1단계', title: '회원가입 + 본인인증', desc: '전자소송 포털에서 공동인증서 또는 간편인증 로그인', status: 'normal' },
            { month: '2단계', title: '전자소송 동의서 제출', desc: '전자소송 이용에 동의하는 서면을 먼저 제출해요', status: 'normal' },
            { month: '3단계', title: '신청서 작성·제출', desc: '파산 및 면책 동시신청서 + 첨부서류 업로드', status: 'current', tag: '핵심' },
            { month: '4단계', title: '인지대·송달료 전자 납부', desc: '인터넷 뱅킹이나 카드로 바로 결제할 수 있어요', status: 'normal' },
            { month: '5단계', title: '접수 확인', desc: '전자소송 포털에서 사건번호와 접수 상태 확인', status: 'normal' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            전자소송으로 접수하면 이후 보정 명령이나 심문 기일 통지도 온라인으로 받을 수 있어요. 다만 심문 기일에는 법원에 직접 출석해야 하는 경우가 대부분이에요. 서류 보정이 필요할 때도 전자소송 포털에서 바로 추가 서류를 올릴 수 있어서 방문 접수보다 수정이 빨라요.
          </p>

          {/* 방문 vs 전자소송 비교: SpokeFlow */}
          <SpokeFlow steps={[
            { icon: '1', label: '방문 접수', sub: '법원 직접 방문' },
            { icon: 'VS', label: '', sub: '' },
            { icon: '2', label: '전자소송', sub: '온라인 24시간' },
          ]} />

          {/* 전환 문장 — D. 화제 전환형 */}
          <p className="text-neutral-600 mb-4 leading-relaxed">
            그런데 접수만 하면 바로 파산 선고가 나오는 건 아니에요. 심문이라는 절차가 남아 있어요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '심문 일정',
        title: '접수 후 심문까지 얼마나 기다려야 할까?',
        desc: '접수부터 파산선고까지 걸리는 기간',
        icon: 'clock',
      },
    },

    /**
     * ===== S4: 접수 후 심문 기간 =====
     * 패턴: 설명 → 타임라인(SpokeTimeline) → 테이블(SpokeTable)
     * 전환 스타일: 없음 (마지막 섹션 — primary CTA)
     * 시각 요소: SpokeTimeline + SpokeTable = 2개
     *
     * ⚠️ SpokeTable 2개째이므로 글 전체 제한 충족 (2/2)
     */
    {
      id: 's4',
      number: '04',
      heading: '개인파산 접수 후 심문까지 얼마나 걸리나요?',
      subtitle: '접수 후 약 1~2개월 뒤 심문, 면책까지는 약 6~8개월이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            신청서를 접수하면 법원에서 서류를 검토한 뒤 <strong>심문 기일</strong>을 잡아줘요. 보통 접수 후 약 <strong>1~2개월</strong> 뒤에 심문이 진행돼요. 심문에서는 판사가 채무자에게 재산 상태, 파산에 이르게 된 경위, 면책 결격 사유 여부 등을 물어봐요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            법원은 파산신청일부터 <strong>1개월 이내</strong>에 파산선고 여부를 결정하도록 하고 있지만, 실무적으로는 서류 보정 기간이 포함되면 약 1~3개월이 걸려요. 파산 및 면책을 동시에 신청한 경우 전체 절차는 약 <strong>6~8개월</strong>이 소요돼요.
          </p>

          {/* 전체 일정: SpokeTimeline */}
          <SpokeTimeline events={[
            { month: '접수일', title: '신청서 제출', desc: '파산 및 면책 동시신청', status: 'normal' },
            { month: '약 2~4주', title: '서류 보정', desc: '법원이 부족한 서류 보정을 요청할 수 있어요', status: 'warning', tag: '보정' },
            { month: '약 1~2개월', title: '심문 기일', desc: '판사가 채무 경위와 재산 상태를 확인해요', status: 'current', tag: '심문' },
            { month: '약 1~3개월', title: '파산선고 + 동시폐지', desc: '배당할 재산이 없으면 파산선고와 동시에 폐지돼요', status: 'normal' },
            { month: '약 6~8개월', title: '면책 결정', desc: '면책 불허가 사유가 없으면 면책이 확정돼요', status: 'normal', tag: '완료' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            심문은 필수가 아니에요. 신청서와 첨부서류만으로 판단이 가능하면 심문 없이 <strong>서면 심리</strong>로 결정되기도 해요. 서울회생법원은 사건이 많아서 심문 일정이 다소 밀릴 수 있고, 지방법원은 상대적으로 빨리 진행되는 편이에요.
          </p>

          {/* 파산선고 시 결정 사항: SpokeTable */}
          <SpokeTable
            id="tbl2"
            title="파산선고 시 법원이 결정하는 사항"
            subtitle="채무자 회생 및 파산에 관한 법률 기준"
            headers={['결정 사항', '내용', '기한']}
            rows={[
              ['파산관재인 선임', '채무자 재산을 관리할 관재인 지정', '선고와 동시'],
              ['채권신고 기간', '채권자들이 채권을 신고하는 기간', '선고일부터 2주~3개월'],
              ['제1회 채권자집회', '채권자들이 모여 의견을 나누는 자리', '선고일부터 4개월 이내'],
              ['동시폐지 결정', '배당할 재산이 없으면 폐지 결정', '선고와 동시 (대부분)'],
            ]}
          />
        </>
      ),
      bridgeCTA: {
        href: '/w/개인파산-면책-신청-절차-비용',
        badge: '전체 절차',
        title: '개인파산 신청부터 면책까지 전체 흐름이 궁금하다면',
        desc: '비용, 서류, 면책까지 한 번에 확인하기',
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
      question: '개인파산 관할법원을 잘못 선택해서 접수하면 어떻게 되나요?',
      answer: '관할이 맞지 않으면 법원에서 <strong>이송 결정</strong>을 내려요. 신청이 무효가 되는 건 아니지만, 정확한 관할법원으로 사건이 옮겨지면서 처리 기간이 늘어나요. 처음부터 주소지 관할 지방법원 본원을 확인하고 접수하는 게 시간 낭비를 줄이는 방법이에요.',
    },
    {
      question: '개인파산 접수 중에 이사하면 관할법원이 바뀌나요?',
      answer: '접수 시점의 주소지를 기준으로 관할이 정해지기 때문에, 접수 후에 이사해도 관할법원은 <strong>바뀌지 않아요</strong>. 다만 접수 전에 이사했다면 새 주소지 관할법원에 접수해야 해요. 주민등록 전입신고 기준이니까, 이사 후에는 전입신고를 먼저 하고 관할을 확인하세요.',
    },
  ],

  relatedSpokes: [
    { badge: '자격 조건', title: '개인파산 신청 자격과 조건 지급불능 기준', desc: '파산 신청 자격과 지급불능 판단 기준', href: '/w/개인파산-신청-자격-조건-지급불능' },
    { badge: '비용', title: '개인파산 신청 비용 송달료와 소송구조', desc: '인지대, 송달료 계산과 비용 감면 방법', href: '/w/개인파산-신청-비용-송달료-소송구조' },
    { badge: '준비서류', title: '개인파산 준비서류 채권자목록 재산목록', desc: '파산 신청에 필요한 서류 목록과 작성법', href: '/w/개인파산-준비서류-채권자목록-재산목록' },
    { badge: '면책', title: '개인파산 면책불허가 도박 재량면책', desc: '면책이 거부되는 사유와 재량면책 가능성', href: '/w/개인파산-면책불허가-도박-재량면책' },
  ],

  sources: [
    { name: '채무자 회생 및 파산에 관한 법률 제3조(재판관할)', url: 'https://www.law.go.kr/법령/채무자회생및파산에관한법률/제3조', org: '법제처' },
    { name: '개인파산·면책절차 관할법원 안내', url: 'https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=616&ccfNo=2&cciNo=3&cnpClsNo=2', org: '찾기쉬운 생활법령정보' },
    { name: '서울회생법원 도산절차 안내', url: 'https://slb.scourt.go.kr/rel/guide/personal_b/index.jsp', org: '서울회생법원' },
    { name: '대법원 전자소송 포털', url: 'https://ecfs.scourt.go.kr', org: '대법원' },
  ],
}

export default data
