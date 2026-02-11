import Link from 'next/link'
import type { SpokeData } from './types'
import { SpokeTimeline, SpokeWarnBox, SpokeStepCards, SpokeChecklist, FormulaBox } from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '개인파산-재신청-조건-면책후-7년',

  meta: {
    title: '개인파산 재신청 조건 면책 후 7년 기간과 재신청 절차',
    description: '개인파산 면책 확정 후 7년, 개인회생 면책 후 5년이 지나야 재신청할 수 있다는 거 아시나요? 재신청 조건과 절차를 알려드려요',
    keywords: ['개인파산 재신청 조건 기간', '개인파산 면책 후 7년 계산', '개인파산 기각 후 재신청 방법', '개인회생 면책 후 파산 신청'],
    ogTitle: '개인파산 재신청 조건 면책 후 7년 기간 | 머니위키',
    ogDescription: '면책 후 7년, 기각 후 재신청 방법, 개인회생 면책 후 파산까지',
  },

  hub: {
    url: '/w/개인파산-면책-신청-절차-비용',
    name: '개인파산 면책 신청 절차와 비용',
  },

  breadcrumb: ['법률', '개인파산 재신청'],

  hero: {
    badge: '2026년 기준',
    h1: <>개인파산 <span className="text-[#1E3A5F]">재신청 조건</span> — 면책 후 7년 기간과 재신청 절차</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          한 번 면책받았는데 다시 빚이 쌓여서 '또 파산 신청할 수 있나?' 고민 중이라면 잘 오셨어요. <strong>개인파산 면책 후 7년</strong>이 지나야 다시 면책을 받을 수 있고, <strong>개인회생 면책 후라면 5년</strong>이에요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          <a href="https://law.go.kr/법령/채무자회생및파산에관한법률/제564조" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">채무자회생법 제564조</a>에 면책불허가 사유로 명시된 내용이에요. 기각된 경우는 사정이 다르니까 그 부분도 같이 정리했어요. 전체 절차가 궁금하면 <Link href="/w/개인파산-면책-신청-절차-비용" className="text-blue-600 hover:underline">개인파산 면책 신청 절차와 비용</Link>도 참고해 보세요. 먼저 재신청 조건부터 하나씩 볼게요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '전체 절차',
      desc: '개인파산 신청부터 면책까지 전체 흐름 확인하기',
    },
  },

  toc: [
    { id: 's1', text: '개인파산 재신청 조건과 기간은 어떻게 되나요?' },
    { id: 's2', text: '개인파산 면책 후 7년은 어떻게 계산하나요?' },
    { id: 's3', text: '개인파산 기각 후 재신청은 어떻게 하나요?' },
    { id: 's4', text: '개인회생 면책 후 파산 신청이 가능한가요?' },
    { id: 's5', text: '자주 묻는 질문' },
  ],

  sections: [
    /**
     * ===== S1: 재신청 조건과 기간 =====
     * 패턴: 핵심 설명 → 타임라인(SpokeTimeline) → 경고(SpokeWarnBox)
     * 전환 스타일: B. 자연 호기심형
     * 시각 요소: SpokeTimeline + SpokeWarnBox = 2종류
     */
    {
      id: 's1',
      number: '01',
      heading: '개인파산 재신청 조건과 기간은 어떻게 되나요?',
      subtitle: '면책 확정일 기준으로 일정 기간이 지나야 재신청이 가능해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            개인파산은 한 번 면책받았다고 평생 다시 신청 못 하는 건 아니에요. 다만 <a href="https://law.go.kr/법령/채무자회생및파산에관한법률/제564조" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">채무자회생법 제564조</a>에 따라 면책불허가 사유에 해당하지 않아야 해요. 핵심은 이전 면책 확정일부터 <strong>일정 기간</strong>이 경과했느냐예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            이전에 <strong>개인파산으로 면책</strong>받았다면 면책 확정일부터 <strong>7년</strong>이 지나야 해요. <strong>개인회생으로 면책</strong>받았다면 면책 확정일부터 <strong>5년</strong>이 지나야 해요. 이 기간이 지나지 않으면 면책불허가 사유에 해당돼서 파산 신청 자체는 가능해도 면책을 못 받아요.
          </p>

          <SpokeTimeline events={[
            { month: '면책 확정', title: '면책 결정 확정일', desc: '법원 결정이 확정된 날부터 기간 계산 시작', status: 'normal' },
            { month: '5년 경과', title: '개인회생 면책 후 재신청 가능', desc: '개인회생(제624조) 면책 기준', status: 'normal', tag: '회생 면책' },
            { month: '7년 경과', title: '개인파산 면책 후 재신청 가능', desc: '개인파산(제564조) 면책 기준', status: 'current', tag: '파산 면책' },
          ]} />

          <SpokeWarnBox title="주의사항">
            <p className="mb-0 leading-relaxed">
              7년이 안 됐어도 파산 <strong>신청</strong> 자체는 할 수 있어요. 다만 면책불허가 사유에 해당해서 면책을 못 받을 가능성이 높아요. 면책 없이 파산만 선고받으면 채무가 그대로 남으니까, 기간 경과 여부를 꼭 확인하세요.
            </p>
          </SpokeWarnBox>

          {/* 전환 문장 — B. 자연 호기심형 */}
          <p className="text-neutral-600 mb-4 leading-relaxed">
            여기까지 보면 한 가지 궁금한 게 생기죠. 7년이라는 기간은 정확히 언제부터 세는 걸까요?
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '기간 계산',
        title: '면책 후 7년, 정확히 언제부터 세나요?',
        desc: '면책 확정일 기산점과 계산 방법',
        icon: 'calc',
      },
    },

    /**
     * ===== S2: 면책 후 7년 계산 =====
     * 패턴: 계산 설명 → 공식(FormulaBox) → 체크리스트(SpokeChecklist)
     * 전환 스타일: D. 화제 전환형
     * 시각 요소: FormulaBox + SpokeChecklist = 2종류
     */
    {
      id: 's2',
      number: '02',
      heading: '개인파산 면책 후 7년은 어떻게 계산하나요?',
      subtitle: '면책 확정일 다음 날부터 7년을 세면 돼요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            7년의 기산점은 <strong>면책허가 결정이 확정된 날</strong>이에요. 법원이 면책을 허가하면 채권자에게 통지가 가고, 2주 이내에 항고가 없으면 확정돼요. 확정일은 면책허가 결정문에 적혀 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            예를 들어 2019년 3월 15일에 면책이 확정됐다면, 2026년 3월 15일이 지나야 다시 면책을 받을 수 있어요. 결정문을 분실했다면 <a href="https://ecfs.scourt.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">대한민국 법원 전자소송</a>에서 사건 조회로 확인할 수 있어요.
          </p>

          <FormulaBox lines={[
            { text: '// 재신청 가능 시점 계산', comment: true },
            { text: '1. 면책허가 결정일 확인 (결정문 또는 전자소송 조회)', numbered: true },
            { text: '2. 결정일 + 2주 = 확정일 (항고 없는 경우)', numbered: true },
            { text: '3. 확정일 + 7년 = 재신청 면책 가능 시점', numbered: true },
            { text: '// 예시: 2019.03.01 결정 → 2019.03.15 확정 → 2026.03.15 이후 가능', comment: true },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            확정일을 정확히 모르면 법원에 면책확정증명서를 발급받아 확인하는 게 가장 확실해요. 아래 서류를 미리 준비해 두면 좋아요.
          </p>

          <SpokeChecklist items={[
            { text: '면책허가 결정문 (확정일 기재)', done: true },
            { text: '면책확정증명서 (법원 발급)', done: false, note: '분실 시 법원에서 재발급 가능' },
            { text: '신원조회회보서 (파산 기록 확인)', done: false, note: '주민센터 또는 정부24에서 발급' },
            { text: '전자소송 사건 조회 결과', done: false, note: 'ecfs.scourt.go.kr에서 확인' },
          ]} />

          {/* 전환 문장 — D. 화제 전환형 */}
          <p className="text-neutral-600 mb-4 leading-relaxed">
            그런데 면책이 아니라 <strong>기각</strong>된 경우라면 상황이 완전히 달라요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '기각 재신청',
        title: '기각됐다면 바로 다시 신청할 수 있을까?',
        desc: '기각 사유별 재신청 가능 여부 확인',
        icon: 'info',
      },
    },

    /**
     * ===== S3: 기각 후 재신청 =====
     * 패턴: 설명 → 단계(SpokeStepCards) → 경고(SpokeWarnBox)
     * 전환 스타일: E. 실용 연결형
     * 시각 요소: SpokeStepCards + SpokeWarnBox = 2종류
     */
    {
      id: 's3',
      number: '03',
      heading: '개인파산 기각 후 재신청은 어떻게 하나요?',
      subtitle: '기각 사유를 해소하면 바로 다시 신청할 수 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            파산 신청이 <strong>기각</strong>된 경우는 면책불허가와 달라요. 기각은 면책을 받은 적이 없으니까 7년 제한과는 관계가 없어요. 기각 사유를 해소하면 기간 제한 없이 바로 다시 신청할 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            다만 같은 사유로 반복 신청하면 법원이 신청권 남용으로 볼 수 있어요. <a href="https://slb.scourt.go.kr/rel/guide/personal_b/index.jsp" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">서울회생법원</a>에 따르면, 소득이 있어서 개인회생이 가능한데 파산을 신청한 경우가 대표적인 기각 사유예요. 재신청할 때는 기각 사유를 정확히 파악하고 보완하는 게 핵심이에요.
          </p>

          <SpokeStepCards steps={[
            { title: '기각 결정문 확인', desc: '법원이 어떤 사유로 기각했는지 결정문에서 정확히 확인해요' },
            { title: '기각 사유 해소', desc: '서류 미비면 보완, 소득이 문제면 개인회생 전환 검토, 지급불능 증명 보강 등', tip: '법률구조공단 무료 상담 활용' },
            { title: '신청서류 보완 후 재접수', desc: '관할 법원에 파산 및 면책 동시신청서를 다시 제출해요' },
          ]} />

          <SpokeWarnBox title="주의사항">
            <p className="mb-0 leading-relaxed">
              <strong>기각</strong>은 파산 신청 단계에서 요건 미충족으로 돌려보내는 거예요. <strong>면책불허가</strong>는 파산은 인정됐지만 채무 면제를 안 해주는 거예요. 기각은 재신청에 기간 제한이 없지만, 면책불허가 후에는 도박 등 사유에 따라 재량면책도 어려울 수 있어요.
            </p>
          </SpokeWarnBox>

          {/* 전환 문장 — E. 실용 연결형 */}
          <p className="text-neutral-600 mb-4 leading-relaxed">
            파산이 아닌 개인회생으로 면책받은 분이 이번에는 파산을 신청하려는 경우도 있어요. 이때 적용되는 기간을 정리했어요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '회생 후 파산',
        title: '개인회생 면책 후에 파산 신청도 되나요?',
        desc: '회생과 파산 사이의 재신청 기간 차이',
        icon: 'clock',
      },
    },

    /**
     * ===== S4: 개인회생 면책 후 파산 신청 =====
     * 패턴: 설명 → 타임라인(SpokeTimeline) → 공식(FormulaBox)
     * 전환 스타일: 없음 (마지막 섹션 — primary CTA)
     * 시각 요소: SpokeTimeline + FormulaBox = 2종류
     */
    {
      id: 's4',
      number: '04',
      heading: '개인회생 면책 후 파산 신청이 가능한가요?',
      subtitle: '개인회생 면책 확정일로부터 5년이 지나면 파산 면책을 받을 수 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            개인회생으로 면책받은 뒤에 다시 빚이 쌓여서 파산을 고려하는 분이 있어요. <a href="https://law.go.kr/법령/채무자회생및파산에관한법률/제564조" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">채무자회생법 제564조 제1항 제4호</a>에 따르면, 개인회생(제624조) 면책 확정일부터 <strong>5년</strong>이 지나야 파산 면책을 받을 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            파산 면책 후 7년보다 2년 짧은 이유는 개인회생은 채무의 일부를 이미 변제했기 때문이에요. 3~5년간 변제 계획을 이행한 점을 고려해서 기간이 더 짧아요. 반대로, 개인회생 면책 후 다시 개인회생을 신청하는 건 별도 제한이 없어요.
          </p>

          <SpokeTimeline events={[
            { month: '파산→파산', title: '면책 확정 후 7년', desc: '채무자회생법 제564조 제1항 제4호 전단', status: 'warning', tag: '7년' },
            { month: '회생→파산', title: '면책 확정 후 5년', desc: '채무자회생법 제564조 제1항 제4호 후단', status: 'current', tag: '5년' },
            { month: '회생→회생', title: '기간 제한 없음', desc: '별도 면책불허가 사유 해당 여부만 심사', status: 'normal' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            어떤 경로든 재신청 가능 시점을 미리 계산해 두면 준비가 수월해져요. 아래 공식으로 본인 상황에 맞는 시점을 확인해 보세요.
          </p>

          <FormulaBox lines={[
            { text: '// 이전 면책 유형별 재신청 가능 시점', comment: true },
            { text: '개인파산 면책 → 확정일 + 7년 후 파산 재신청 가능' },
            { text: '개인회생 면책 → 확정일 + 5년 후 파산 신청 가능' },
            { text: '기각(면책 없음) → 사유 해소 후 즉시 재신청 가능' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            기간이 아직 남아 있다면 <a href="https://www.klac.or.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">대한법률구조공단</a> 무료 상담으로 개인회생 전환이나 채무조정 등 다른 방법을 먼저 알아보는 것도 방법이에요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '/w/개인파산-면책-신청-절차-비용',
        badge: '전체 절차',
        title: '개인파산 신청부터 면책까지 전체 흐름이 궁금하다면',
        desc: '신청 자격, 비용, 서류, 절차 한눈에 확인',
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
      question: '개인파산 재신청 시 재량면책이 가능한가요?',
      answer: '7년이 안 됐어도 법원이 재량으로 면책을 허가할 수 있어요. <strong>채무자회생법 제564조 제1항 단서</strong>에 따라 채무자의 불성실 정도가 크지 않고 경제적 재기가 필요하다고 판단되면 재량면책을 받을 수 있어요. 다만 도박이나 과소비 같은 사유가 있으면 재량면책도 어려워요.',
    },
    {
      question: '개인파산 면책 확정일을 모르면 어떻게 확인하나요?',
      answer: '<a href="https://ecfs.scourt.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">대한민국 법원 전자소송</a>에서 사건번호로 조회하거나, 해당 법원에 <strong>면책확정증명서</strong>를 신청하면 확인할 수 있어요. 결정문을 분실했더라도 법원에 재발급 요청하면 돼요.',
    },
  ],

  relatedSpokes: [
    { badge: '신청 자격', title: '개인파산 신청 자격 조건과 지급불능 기준', desc: '누가 신청할 수 있는지, 지급불능 판단 기준', href: '/w/개인파산-신청-자격-조건-지급불능' },
    { badge: '면책불허가', title: '개인파산 면책불허가 사유와 재량면책', desc: '도박, 사기 등 면책이 안 되는 경우와 구제 방법', href: '/w/개인파산-면책불허가-도박-재량면책' },
    { badge: '불이익', title: '개인파산 선고 불이익과 자격제한 복권', desc: '파산 선고 후 제한되는 자격과 복권 시기', href: '/w/개인파산-선고-불이익-자격제한-복권' },
    { badge: '비교', title: '개인파산 개인회생 선택기준 비교', desc: '내 상황에 맞는 제도 선택 방법', href: '/w/개인파산-개인회생-선택기준-비교' },
  ],

  sources: [
    { name: '채무자회생법 제564조 (면책허가)', url: 'https://law.go.kr/법령/채무자회생및파산에관한법률/제564조', org: '국가법령정보센터' },
    { name: '개인파산 면책결정 및 복권', url: 'https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=616&ccfNo=4&cciNo=1&cnpClsNo=1', org: '찾기쉬운 생활법령정보' },
    { name: '개인파산 도산절차 소개', url: 'https://slb.scourt.go.kr/rel/guide/personal_b/index.jsp', org: '서울회생법원' },
    { name: '개인파산 및 면책 신청 안내', url: 'https://help.scourt.go.kr/nm/min_2/min_2_1/min_2_1_5/index.html', org: '대한민국 법원' },
  ],
}

export default data
