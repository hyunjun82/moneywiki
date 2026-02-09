import Link from 'next/link'
import type { SpokeData } from './types'
import { FormulaBox, SpokeTable, SpokeRateBars, SpokeStepCards, TipBox } from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '개인파산-신청-비용-송달료-소송구조',

  meta: {
    title: '개인파산 신청 비용 인지대 송달료 계산과 소송구조 신청',
    description: '개인파산 인지대가 2,000원이고 송달료는 채권자 수에 따라 달라진다는 거 아시나요? 비용 계산과 무료 소송구조 신청 방법을 알려드려요',
    keywords: ['개인파산 신청 비용 계산', '개인파산 송달료 계산 방법', '개인파산 소송구조 신청 방법', '개인파산 법무사 비용 비교'],
    ogTitle: '개인파산 신청 비용 인지대 송달료 소송구조 | 머니위키',
    ogDescription: '인지대, 송달료 계산, 관재인 예납금, 소송구조 신청까지 한 번에',
  },

  hub: {
    url: '/w/개인파산-면책-신청-절차-비용',
    name: '개인파산 면책 신청 절차와 비용',
  },

  breadcrumb: ['법률', '개인파산 신청 비용'],

  hero: {
    badge: '2026년 기준',
    h1: <>개인파산 <span className="text-emerald-600">신청 비용</span> — 인지대 송달료 계산과 소송구조 신청</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          개인파산을 준비하면서 '비용이 얼마나 들지?' 걱정부터 앞선다면 잘 오셨어요. 법원에 내는 인지대는 <strong>파산+면책 동시신청 기준 2,000원</strong>이고, 송달료는 채권자 수에 따라 달라져요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          여기에 관재인 예납금과 전문가 수수료까지 더하면 전체 비용이 나오는데, 돈이 없어서 파산하는 건데 비용이 부담되는 분을 위한 <strong>소송구조 제도</strong>도 있어요. 개인파산 전체 절차가 궁금하면 <Link href="/w/개인파산-면책-신청-절차-비용" className="text-blue-600 hover:underline">개인파산 면책 신청 가이드</Link>도 같이 보면 이해가 빨라요. 먼저 법원에 내는 비용부터 볼게요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '전체 절차',
      desc: '개인파산 신청부터 면책까지 전체 흐름 확인하기',
    },
  },

  toc: [
    { id: 's1', text: '개인파산 신청 비용은 얼마나 드나요?' },
    { id: 's2', text: '개인파산 송달료는 어떻게 계산하나요?' },
    { id: 's3', text: '개인파산 소송구조는 어떻게 신청하나요?' },
    { id: 's4', text: '개인파산 법무사 비용은 얼마인가요?' },
    { id: 's5', text: '자주 묻는 질문' },
  ],

  sections: [
    /**
     * ===== S1: 개인파산 신청 비용 총 정리 =====
     * 패턴: 개념 텍스트 → 비용 구조(FormulaBox) → 항목별 표(SpokeTable) → 보충(TipBox)
     * 전환 스타일: B. 자연 호기심형
     * 시각 요소: FormulaBox + SpokeTable = 2개
     */
    {
      id: 's1',
      number: '01',
      heading: '개인파산 신청 비용은 얼마나 드나요?',
      subtitle: '인지대 + 송달료 + 관재인 예납금이 법원에 내는 기본 비용이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            개인파산을 신청하면 법원에 내야 하는 비용은 크게 세 가지예요. <strong>인지대</strong>(신청수수료), <strong>송달료</strong>(우편 통지 비용), <strong>관재인 예납금</strong>(재산 조사 비용)이에요. <a href="https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=616&ccfNo=2&cciNo=1&cnpClsNo=1" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">찾기쉬운 생활법령정보</a>에 따르면 채무자 본인이 직접 신청하면 법원 비용만으로도 진행이 가능해요.
          </p>

          <p className="text-neutral-600 mb-4 leading-relaxed">
            인지대는 파산과 면책을 동시에 신청하면 <strong>2,000원</strong>이에요. 파산만 따로 내거나 면책만 따로 내면 각각 1,000원씩이에요. 채권자가 신청하는 경우에는 30,000원으로 올라가요. 여기에 송달료와 관재인 예납금을 더하면 전체 법원 비용이 나와요.
          </p>

          {/* 비용 구조: FormulaBox */}
          <FormulaBox lines={[
            { text: '// 개인파산 법원 비용 구조', comment: true },
            { text: '1. 인지대: 파산+면책 동시신청 = 2,000원', numbered: true },
            { text: '2. 송달료: 기본 104,000원 + 채권자 수별 추가', numbered: true },
            { text: '3. 관재인 예납금: 기본 40만원 (유관기관 경유 30만원)', numbered: true },
            { text: '// 합계 = 인지대 + 송달료 + 관재인 예납금', comment: true },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            예를 들어 채권자가 5명이고 본인이 직접 신청하면 법원 비용은 약 <strong>60만~70만원</strong> 수준이에요. 관재인 예납금은 부채 규모에 따라 늘어날 수 있는데, 부채 1억 미만이면 최대 150만원, 5억 이상이면 최대 300만원까지 증액될 수 있어요.
          </p>

          {/* 관재인 예납금 표: SpokeTable */}
          <SpokeTable
            id="tbl1"
            title="관재인 예납금 기준"
            subtitle="부채 규모별 증액 한도"
            headers={['부채 규모', '기본 예납금', '증액 시 최대']}
            rows={[
              ['1억 미만', '40만원', '150만원'],
              ['1억~3억', '40만원', '200만원'],
              ['3억~5억', '40만원', '250만원'],
              ['5억 이상', '40만원', '300만원'],
            ]}
            highlightCol={3}
          />

          {/* 전환 문장 — B. 자연 호기심형 */}
          <p className="text-neutral-600 mb-4 leading-relaxed">
            여기까지 보면 한 가지 궁금한 게 생기죠. 송달료가 채권자 수에 따라 달라진다는데, 내 경우엔 정확히 얼마일까요?
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '송달료',
        title: '채권자 수별 송달료는 얼마일까?',
        desc: '내 채권자 수로 송달료 직접 계산해보기',
        icon: 'calc',
      },
    },

    /**
     * ===== S2: 송달료 계산 =====
     * 패턴: 계산 공식(FormulaBox) → 수치 비교(SpokeRateBars) → 보충 텍스트
     * 전환 스타일: A. 독자 대변형
     * 시각 요소: FormulaBox + SpokeRateBars = 2개
     */
    {
      id: 's2',
      number: '02',
      heading: '개인파산 송달료는 어떻게 계산하나요?',
      subtitle: '파산 송달료 + 면책 송달료를 따로 계산해서 합쳐요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            송달료는 법원이 채권자들에게 우편으로 통지하는 비용이에요. 파산 신청과 면책 신청의 송달료를 각각 계산해서 합산해야 해요. 1회당 송달료는 <strong>5,200원</strong>이고, 파산은 기본 10회분 + 채권자 수 x 4회분, 면책은 기본 10회분 + 채권자 수 x 3회분이에요.
          </p>

          {/* 송달료 계산 공식: FormulaBox */}
          <FormulaBox lines={[
            { text: '// 송달료 계산 공식 (1회 = 5,200원)', comment: true },
            { text: '파산 송달료 = 5,200원 x 10회 + (채권자 수 x 5,200원 x 4회)' },
            { text: '면책 송달료 = 5,200원 x 10회 + (채권자 수 x 5,200원 x 3회)' },
            { text: '// 합산 공식', comment: true },
            { text: '총 송달료 = 104,000원 + (채권자 수 x 5,200원 x 7회)' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            채권자가 5명이면 파산 송달료 <strong>156,000원</strong>(52,000 + 104,000)에 면책 송달료 <strong>130,000원</strong>(52,000 + 78,000)을 더해서 총 <strong>286,000원</strong>이에요. 채권자가 10명이면 총 <strong>468,000원</strong>까지 올라가요. 채권자가 많을수록 부담이 커지는 구조예요.
          </p>

          {/* 채권자 수별 비교: SpokeRateBars */}
          <SpokeRateBars bars={[
            { label: '채권자 3명', rate: '약 21만원', width: '35%' },
            { label: '채권자 5명', rate: '약 29만원', width: '50%' },
            { label: '채권자 10명', rate: '약 47만원', width: '80%' },
            { label: '채권자 15명', rate: '약 65만원', width: '100%' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            참고로 송달료는 신청할 때 미리 내는 거예요. 절차가 끝난 뒤 사용하지 않고 남은 금액은 돌려받을 수 있어요.
          </p>

          {/* 전환 문장 — A. 독자 대변형 */}
          <p className="text-neutral-600 mb-4 leading-relaxed">
            그런데 파산 신청하는 사람이 이 비용을 어떻게 내냐는 게 가장 현실적인 문제잖아요. 돈이 없어서 파산하는 건데 말이에요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '무료 지원',
        title: '비용 낼 형편이 안 되면 어떡하지?',
        desc: '소송구조로 비용 면제받는 방법 확인하기',
        icon: 'info',
      },
    },

    /**
     * ===== S3: 소송구조 신청 =====
     * 패턴: 제도 설명 → 절차(SpokeStepCards) → 핵심 팁(TipBox)
     * 전환 스타일: E. 실용 연결형
     * 시각 요소: SpokeStepCards + TipBox = 2개
     */
    {
      id: 's3',
      number: '03',
      heading: '개인파산 소송구조는 어떻게 신청하나요?',
      subtitle: '비용을 낼 형편이 안 되면 법원이 납입을 유예하거나 면제해줘요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            <strong>소송구조</strong>는 소송비용을 낼 형편이 안 되는 사람을 위해 법원이 비용 납입을 유예하거나 면제해주는 제도예요. <a href="https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=616&ccfNo=2&cciNo=1&cnpClsNo=1" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">찾기쉬운 생활법령정보</a>에 따르면 일정 요건을 갖추면 인지대와 송달료, 변호사 비용까지 지원받을 수 있어요. 별도로 <a href="https://resu.klac.or.kr/main.jsp" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">대한법률구조공단</a>의 무료 법률구조도 있어요.
          </p>

          <p className="text-neutral-600 mb-4 leading-relaxed">
            소송구조를 받으려면 다음 중 하나에 해당해야 해요. 기초생활수급자, 중위소득 75% 이하 소득자, 한부모가족 지원 대상자, 60세 이상, 장애인, 국가유공자 중 상이등급 판정자가 대상이에요. 법률구조공단은 월평균 수입이 중위소득 125% 이하인 분에게 무료로 소송대리를 지원해요.
          </p>

          {/* 소송구조 절차: SpokeStepCards */}
          <SpokeStepCards steps={[
            { title: '관할 회생법원 방문', desc: '본인의 파산사건을 다루는 회생법원에 가서 소송구조 담당 변호사를 확인해요' },
            { title: '지정변호사 선임', desc: '법원이 지정한 변호사를 통해 상담받고, 신청서 작성을 도움받아요' },
            { title: '소송구조 신청서 제출', desc: '변호사비용과 송달료에 대한 소송구조를 법원에 신청해요' },
            { title: '법원 심사 후 결정', desc: '법원이 요건을 확인한 뒤 구조 여부를 결정해요. 인용되면 비용이 유예되거나 면제돼요' },
          ]} />

          {/* 핵심 팁: TipBox */}
          <TipBox title="법률구조공단 vs 소송구조, 뭐가 다른가요?">
            <p className="mb-0 leading-relaxed">
              <strong>법률구조</strong>는 대한법률구조공단이 변호사를 무료로 붙여주는 거예요. <strong>소송구조</strong>는 법원이 인지대·송달료 같은 소송비용 납입을 유예·면제해주는 거예요. 둘 다 해당되면 같이 신청할 수 있어요.
            </p>
          </TipBox>

          {/* 전환 문장 — E. 실용 연결형 */}
          <p className="text-neutral-600 mb-4 leading-relaxed">
            소송구조 없이 직접 진행하거나 전문가에게 맡기려는 분도 있을 거예요. 법무사와 변호사 비용이 실제로 얼마나 차이 나는지 정리했어요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '전문가 비용',
        title: '법무사와 변호사, 비용 차이가 얼마나 날까?',
        desc: '전문가 유형별 비용 비교해보기',
        icon: 'info',
      },
    },

    /**
     * ===== S4: 법무사 비용 비교 =====
     * 패턴: 비교 텍스트 → 비율 비교(SpokeRateBars) → 보충 텍스트
     * 전환 스타일: 없음 (마지막 본문 섹션 — primary CTA로 마무리)
     * 시각 요소: SpokeRateBars + SpokeTable = 2개
     */
    {
      id: 's4',
      number: '04',
      heading: '개인파산 법무사 비용은 얼마인가요?',
      subtitle: '법무사는 약 100~250만원, 변호사는 약 200~500만원이 일반적이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            개인파산을 본인이 직접 신청하면 법원 비용만 내면 되지만, 서류 작성이 복잡해서 전문가에게 맡기는 경우가 많아요. <strong>법무사</strong>에게 맡기면 약 <strong>100만~250만원</strong>, <strong>변호사</strong>에게 의뢰하면 약 <strong>200만~500만원</strong>이 일반적이에요. 법무사 보수는 <a href="https://www.law.go.kr/법령/법무사법" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">법무사법</a>에 따라 대법원 인가를 받은 보수 기준이 있어요.
          </p>

          <p className="text-neutral-600 mb-4 leading-relaxed">
            비용 차이가 나는 이유는 사건 난이도, 채권자 수, 전문가의 경력 등에 따라 달라지기 때문이에요. 채권자가 20명 넘거나 부채 규모가 큰 복잡한 사건은 비용이 올라갈 수 있어요. 법원 비용은 별도이니 전문가 비용에 더해야 총비용이 나와요.
          </p>

          {/* 비용 비교: SpokeRateBars */}
          <SpokeRateBars bars={[
            { label: '본인 직접 신청', rate: '법원비용만', width: '20%' },
            { label: '법무사 의뢰', rate: '약 100~250만원', width: '50%' },
            { label: '변호사 의뢰', rate: '약 200~500만원', width: '90%' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            전체 비용을 한눈에 정리하면 이렇게 돼요. 본인 신청이면 법원 비용 약 50만~70만원 선이고, 전문가를 쓰면 거기에 수수료가 추가되는 구조예요.
          </p>

          {/* 전체 비용 비교: SpokeTable */}
          <SpokeTable
            id="tbl2"
            title="개인파산 전체 비용 비교"
            subtitle="채권자 5명 기준 예시"
            headers={['항목', '본인 신청', '법무사', '변호사']}
            rows={[
              ['인지대', '2,000원', '2,000원', '2,000원'],
              ['송달료', '약 29만원', '약 29만원', '약 29만원'],
              ['관재인 예납금', '40만원', '40만원', '40만원'],
              ['전문가 수수료', '0원', '약 100~250만원', '약 200~500만원'],
              ['합계', '약 69만원', '약 170~320만원', '약 270~570만원'],
            ]}
            highlightCol={2}
          />
        </>
      ),
      bridgeCTA: {
        href: '/w/개인파산-면책-신청-절차-비용',
        badge: '전체 절차',
        title: '비용 준비가 됐으면 신청 절차를 확인해보세요',
        desc: '개인파산 신청부터 면책까지 전체 흐름 보기',
        icon: 'check',
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
      question: '개인파산 신청 비용을 분할납부할 수 있나요?',
      answer: '관재인 예납금은 법원에 따라 분할납부가 가능한 경우가 있어요. 다만 인지대와 송달료는 신청 시 한꺼번에 내야 해요. 비용이 부담되면 <strong>소송구조</strong>를 먼저 신청하는 게 현실적이에요. 소송구조가 인용되면 송달료와 변호사 비용이 유예되거나 면제돼요.',
    },
    {
      question: '개인파산 송달료를 냈는데 남으면 돌려받을 수 있나요?',
      answer: '네, 돌려받을 수 있어요. 송달료는 미리 예납하는 거라서 절차가 끝난 뒤 <strong>사용하지 않은 금액</strong>은 환급돼요. 법원에서 별도로 안내해 주기도 하지만, 안 오면 직접 관할 법원에 환급 신청을 하면 돼요.',
    },
  ],

  relatedSpokes: [
    { badge: '자격 확인', title: '개인파산 신청 자격 조건과 지급불능 기준', desc: '누가 신청할 수 있는지 자격 요건 확인', href: '/w/개인파산-신청-자격-조건-지급불능' },
    { badge: '준비서류', title: '개인파산 준비서류 채권자목록 재산목록 작성법', desc: '신청에 필요한 서류와 작성 요령', href: '/w/개인파산-준비서류-채권자목록-재산목록' },
    { badge: '관할법원', title: '개인파산 관할법원 접수 서울회생법원 안내', desc: '어디에 신청하는지 관할 법원 확인', href: '/w/개인파산-관할법원-접수-서울회생법원' },
    { badge: '비교', title: '개인파산 개인회생 선택기준 비교', desc: '파산과 회생 중 어떤 게 맞는지 비교', href: '/w/개인파산-개인회생-선택기준-비교' },
  ],

  sources: [
    { name: '개인파산 면책 법률구조 및 소송구조 안내', url: 'https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=616&ccfNo=2&cciNo=1&cnpClsNo=1', org: '찾기쉬운 생활법령정보' },
    { name: '도산절차 소개 - 개인파산', url: 'https://slb.scourt.go.kr/rel/guide/personal_b/index.jsp', org: '서울회생법원' },
    { name: '개인회생·파산 종합지원센터', url: 'https://resu.klac.or.kr/main.jsp', org: '대한법률구조공단' },
    { name: '개인파산 및 면책 개요', url: 'https://ecfs.scourt.go.kr/psp/index.on?m=PSP734M01', org: '대한민국 법원 전자소송포털' },
  ],
}

export default data
