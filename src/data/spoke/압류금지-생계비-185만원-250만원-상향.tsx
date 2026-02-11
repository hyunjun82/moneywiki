import Link from 'next/link'
import type { SpokeData } from './types'
import { SpokeTimeline, FormulaBox, SpokeRateBars, SpokeTable, SpokeCompareCards, SpokeChecklist, SpokeFlow, RateCards } from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '압류금지-생계비-185만원-250만원-상향',

  meta: {
    title: '압류금지 생계비 185만원에서 250만원 상향 배경과 적용 시점',
    description: '2026년 2월부터 압류금지 생계비가 185만원에서 250만원으로 올랐다는 거 아시나요? 상향 배경과 구체적인 적용 방법을 알려드려요',
    keywords: ['압류금지 생계비', '생계비 185만원', '생계비 250만원 상향', '압류금지 금액'],
    ogTitle: '압류금지 생계비 185만원→250만원 상향 | 머니위키',
    ogDescription: '압류금지 생계비 상향의 배경, 적용 시점, 보험금 한도 변경까지 한번에 정리했어요.',
  },

  hub: {
    url: '/w/생계비계좌-압류방지통장-개설-한도',
    name: '생계비계좌 압류방지통장 개설 한도',
  },

  breadcrumb: ['금융', '생계비계좌 압류금지 상향'],

  hero: {
    badge: '2026년 2월 시행',
    h1: <>압류금지 생계비 <span className="text-[#1E3A5F]">185만원에서 250만원</span> — 상향 배경과 적용 시점</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          급여가 압류돼서 생활비가 부족한데, 보호받을 수 있는 금액이 얼마인지 모르는 분이 많아요. 2026년 2월부터 <strong>압류금지 최저 생계비가 월 185만원에서 250만원으로 올랐어요</strong>. 65만원이 더 보호받게 된 거예요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          민사집행법 시행령 개정으로 이뤄진 이 변화가 내 상황에 어떻게 적용되는지 정리했어요. <Link href="/w/생계비계좌-압류방지통장-개설-한도" className="text-blue-600 hover:underline">생계비계좌 전체 가이드</Link>와 함께 보면 이해가 더 쉬워요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '생계비계좌 개설부터 한도까지 전체 흐름 확인하기',
    },
  },

  toc: [
    { id: 's1', text: '압류금지 생계비란 무엇인가요?' },
    { id: 's2', text: '185만원에서 250만원으로 올랐다는 게 뭔가요?' },
    { id: 's3', text: '상향된 금액은 언제부터 적용되나요?' },
    { id: 's4', text: '생계비 기준은 어떻게 정해지나요?' },
    { id: 's5', text: '자주 묻는 질문' },
  ],

  sections: [
    /**
     * ===== S1: 압류금지 생계비란 =====
     * 시각 요소: SpokeTimeline + FormulaBox
     * 전환 스타일: A. 독자 대변형
     */
    {
      id: 's1',
      number: '01',
      heading: '압류금지 생계비란 무엇인가요?',
      subtitle: '채무가 있어도 최소한의 생활을 위해 보호받는 금액이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            압류금지 생계비는 <a href="https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=207952" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">민사집행법 제246조</a>에 따라 채권자가 압류할 수 없는 최소 금액을 말해요. 빚이 있어서 급여가 압류되더라도 이 금액만큼은 보호받아서 생활비로 쓸 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            원래 급여채권은 절반(1/2)까지 압류할 수 있어요. 월급이 400만원이면 200만원까지 압류할 수 있다는 뜻이에요. 하지만 그 절반이 생계비 최저금액보다 적으면, 최저금액까지만 보호돼요. 이 최저금액이 바로 '압류금지 생계비'예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            이 금액은 물가 상승에 맞춰 주기적으로 올라왔어요. 아래에서 변화 과정을 확인해 보세요.
          </p>

          <SpokeTimeline events={[
            { month: '2014년', title: '월 150만원 설정', desc: '민사집행법 시행령으로 처음 도입', status: 'normal', tag: '도입' },
            { month: '2018~2021년', title: '150만원 동결', desc: '물가 상승에도 4년간 그대로, 실효성 논란', status: 'normal', tag: '동결' },
            { month: '2022년 7월', title: '월 185만원 인상', desc: '최저생계비 인상분 반영, 35만원 상향', status: 'normal', tag: '인상' },
            { month: '2026년 2월', title: '월 250만원 인상', desc: '생계비계좌 도입과 함께 65만원 상향', status: 'current', tag: '현행' },
          ]} />

          <FormulaBox lines={[
            { text: '급여의 1/2 = 압류 가능 금액 (원칙)', numbered: true },
            { text: '단, 압류 후 남는 금액이 250만원 미만이면 → 250만원까지 보호', numbered: true },
            { text: '급여가 500만원 초과 시 → 더 복잡한 단계별 계산 적용', numbered: true },
            { text: '// 2026년 2월~: 핵심: 어떤 경우든 최소 월 250만원은 보호', numbered: true, comment: true },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            150만원에서 시작해서 250만원까지 올라왔는데, 이번에 왜 한꺼번에 65만원이나 올랐는지 궁금하잖아요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '상향',
        title: '왜 65만원이나 올랐을까?',
        desc: '상향 배경과 보험금 한도 변경까지 확인',
        icon: 'info',
      },
    },

    /**
     * ===== S2: 185→250만원 상향 =====
     * 시각 요소: SpokeRateBars + SpokeTable
     * 전환 스타일: D. 화제 전환형
     */
    {
      id: 's2',
      number: '02',
      heading: '185만원에서 250만원으로 올랐다는 게 뭔가요?',
      subtitle: '물가 상승과 생계비 현실화를 반영해서 65만원이 올랐어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            법무부가 민사집행법 시행령을 개정해서 압류금지 최저 생계비를 월 185만원에서 250만원으로 올렸어요. <a href="https://www.korea.kr/news/policyNewsView.do?newsId=148953265" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">정책브리핑</a>에 따르면, 물가 상승으로 185만원으로는 최소한의 생활이 어렵다는 판단이 배경이에요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            급여뿐 아니라 보험금 압류금지 한도도 함께 올랐어요. 보장성 <strong>사망보험금</strong>은 1,000만원에서 1,500만원으로, <strong>만기환급금·해약환급금</strong>은 150만원에서 250만원으로 상향됐어요. 보험도 생계에 필요한 자산이라는 인식이 반영된 거예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            이번 개정은 생계비계좌 제도 도입과 함께 이뤄졌어요. 압류금지 금액을 올리면서 동시에 그 금액을 실제로 보호할 수 있는 '생계비계좌'를 만든 거예요. 제도와 금액이 함께 바뀌었기 때문에 실효성이 크게 높아졌어요.
          </p>

          <SpokeRateBars bars={[
            { label: '생계비 (구)', rate: '185만원', width: '74%' },
            { label: '생계비 (신)', rate: '250만원', width: '100%' },
            { label: '사망보험금 (구)', rate: '1,000만원', width: '67%' },
            { label: '사망보험금 (신)', rate: '1,500만원', width: '100%' },
          ]} />

          <SpokeTable id="s2-detail" title="2026년 압류금지 한도 변경 상세" subtitle="" headers={['항목', '기존', '변경', '비고']} rows={[
            ['급여 압류금지 최저', '월 185만원', '월 250만원', '+65만원'],
            ['급여 압류금지 최고', '월 300만원', '월 500만원 (추정)', '고소득자 기준'],
            ['사망보험금', '1,000만원', '1,500만원', '+500만원'],
            ['만기환급금·해약환급금', '150만원', '250만원', '+100만원'],
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            금액이 올랐다는 건 알겠는데, 이게 정확히 언제부터, 어떤 경우에 적용되는지가 중요해요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '적용',
        title: '언제부터 적용되는 거야?',
        desc: '시행 시점과 적용 범위 확인',
        icon: 'clock',
      },
    },

    /**
     * ===== S3: 적용 시점 =====
     * 시각 요소: SpokeCompareCards + SpokeChecklist
     * 전환 스타일: C. 간결 연결형
     */
    {
      id: 's3',
      number: '03',
      heading: '상향된 금액은 언제부터 적용되나요?',
      subtitle: '2026년 2월 1일 이후 접수된 압류명령부터 적용돼요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            개정된 민사집행법 시행령은 <strong>2026년 2월 1일</strong>부터 시행이에요. 이 날짜 이후에 법원에 새로 접수되는 압류명령 신청부터 월 250만원 기준이 적용돼요. 기존에 이미 걸려 있는 압류에는 자동으로 적용되지 않아요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            이미 185만원 기준으로 압류가 진행 중이라면, 법원에 <strong>압류금지채권 범위변경 신청</strong>을 해서 새 기준(250만원)을 적용받을 수 있어요. 신청서를 내면 법원이 검토 후 압류 범위를 조정해 줘요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            보험금 압류금지 한도 변경도 같은 날부터 적용돼요. 사망보험금 1,500만원, 만기환급금·해약환급금 250만원이 새 기준이에요. 기존 보험 계약에도 소급 적용되지만, 이미 집행된 압류에는 별도 신청이 필요해요.
          </p>

          <SpokeCompareCards cards={[
            { title: '2026년 2월 이전 압류', subtitle: '', items: ['기존 185만원 기준 적용 중', '자동으로 250만원 적용 안 됨', '범위변경 신청 필요', '신청 후 법원 검토 2~4주'] },
            { title: '2026년 2월 이후 압류', subtitle: '', items: ['자동으로 250만원 기준 적용', '별도 신청 불필요', '생계비계좌 보호도 동시 적용', '새 기준으로 즉시 보호'] }
          ]} />

          <SpokeChecklist items={[
            { text: '현재 적용 중인 압류금지 금액 확인 (185만원 기준인지)', done: false, note: '압류 결정문에서 확인' },
            { text: '관할 법원에 압류금지채권 범위변경 신청서 제출', done: false, note: '인지대 없음' },
            { text: '생계비계좌를 아직 안 만들었다면 개설', done: false, note: '1인 1계좌' },
            { text: '급여 입금 계좌를 생계비계좌로 변경', done: false, note: '회사 인사팀에 요청' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            적용 시점은 알겠는데, 이 250만원이라는 금액이 어떤 기준으로 정해지는 건지 알아볼게요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '기준',
        title: '250만원은 어떤 기준으로 정해졌을까?',
        desc: '생계비 금액 산정 기준과 향후 전망',
        icon: 'calc',
      },
    },

    /**
     * ===== S4: 생계비 기준 산정 =====
     * 시각 요소: SpokeFlow + RateCards
     * 전환 스타일: 없음 (마지막 본문 섹션)
     */
    {
      id: 's4',
      number: '04',
      heading: '생계비 기준은 어떻게 정해지나요?',
      subtitle: '기준중위소득, 최저생계비, 물가상승률을 종합적으로 반영해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            압류금지 생계비는 국민기초생활보장법상 <strong>최저생계비</strong>를 고려해서 대통령령(시행령)으로 정해요. 2026년 기준 1인 가구 기준중위소득이 약 239만원인데, 이걸 기준으로 최소 생활에 필요한 금액을 산출해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            250만원이라는 금액은 1인 가구 기준중위소득에 근접한 수준이에요. 기준중위소득의 약 105% 정도인데, 주거비, 식비, 교통비 등 기본 생활비를 감안한 거예요. 가구원 수에 따라 생활비는 더 들지만, 현행법은 가구원 수와 무관하게 일률적으로 250만원을 적용해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            앞으로도 물가가 오르면 이 금액이 다시 올라갈 수 있어요. 법무부가 주기적으로 시행령을 개정해서 현실에 맞게 조정해요. 다만 정해진 인상 주기가 없어서, 물가 상승이 크지 않으면 동결되기도 해요.
          </p>

          <SpokeFlow steps={[
            { icon: '1', label: '기준중위소득 확인', sub: '매년 보건복지부 발표' },
            { icon: '2', label: '최저생계비 산출', sub: '주거·식비·교통비 등' },
            { icon: '3', label: '물가상승률 반영', sub: '소비자물가지수 기준' },
            { icon: '4', label: '시행령 개정', sub: '법무부 → 국무회의' },
          ]} />

          <RateCards cards={[
            { value: '250만원', label: '압류금지 생계비', lines: ['2026년 2월 시행', '급여채권 보호 최저금액'], highlightColor: 'navy' as const, active: true },
            { value: '1,500만원', label: '사망보험금 한도', lines: ['보장성 보험 한정', '기존 1,000만원에서 상향'], active: false },
            { value: '250만원', label: '해약환급금 한도', lines: ['보장성 보험 한정', '기존 150만원에서 상향'], active: false },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            압류금지 생계비가 올라서 보호 범위가 넓어졌지만, 실제로 보호를 받으려면 생계비계좌를 만들어야 실효성이 커요. 급여가 일반 통장에 입금되면 여전히 '예금'으로 취급돼서 압류될 수 있거든요. <Link href="/w/생계비계좌-은행별-개설-방법-비대면" className="text-blue-600 hover:underline">은행별 생계비계좌 개설 방법</Link>도 같이 확인해 보세요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '/w/생계비계좌-압류방지통장-개설-한도',
        badge: '전체 가이드',
        title: '생계비계좌 개설부터 한도까지 한번에 보기',
        desc: '개설 조건, 은행별 방법, 한도 관리까지 전체 정리',
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
      question: '급여가 250만원 이하면 전혀 압류가 안 되나요?',
      answer: '네, 급여가 월 250만원 이하라면 전액 압류금지 대상이에요. 채권자가 급여를 압류하더라도 실제로 공제되는 금액은 0원이에요. 다만 이건 급여채권 기준이고, 통장에 입금된 후에는 생계비계좌에 넣어야 보호돼요.',
    },
    {
      question: '압류금지 금액이 앞으로 더 올라갈 수 있나요?',
      answer: '물가 상승이 계속되면 법무부가 시행령을 개정해서 금액을 올릴 수 있어요. 정해진 인상 주기는 없지만, 최저생계비와 기준중위소득이 오르면 연동해서 조정되는 경향이 있어요.',
    },
  ],

  relatedSpokes: [
    { badge: '한도', title: '생계비계좌 입금 한도 250만원 잔액 관리', desc: '생계비계좌 한도 관리와 초과 시 대응', href: '/w/생계비계좌-입금-한도-250만원-잔액-관리' },
    { badge: '보험', title: '보험금 압류금지 한도와 사망보험금 해약환급금', desc: '보험금 압류 보호 범위를 정리했어요', href: '/w/보험금-압류금지-한도-사망보험-해약환급' },
    { badge: '활용', title: '통장 압류 풀기와 생계비계좌 활용 방법', desc: '압류 해제 신청과 활용 전략', href: '/w/통장-압류-풀기-생계비계좌-활용-방법' },
    { badge: '개념', title: '생계비계좌 압류방지통장 행복지킴이 차이', desc: '세 가지 통장의 개념과 차이 비교', href: '/w/생계비계좌-압류방지통장-행복지킴이-차이' },
  ],

  sources: [
    { name: '민사집행법 시행령', url: 'https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=207952', org: '국가법령정보센터' },
    { name: '생계비계좌 도입 정책 보도', url: 'https://www.korea.kr/news/policyNewsView.do?newsId=148953265', org: '대한민국 정책브리핑' },
    { name: '압류금지 생계비계좌 도입 보도자료', url: 'https://www.moj.go.kr/bbs/moj/182/489771/download.do', org: '법무부' },
    { name: '민사집행법 제246조(압류금지채권)', url: 'https://casenote.kr/%EB%B2%95%EB%A0%B9/%EB%AF%BC%EC%82%AC%EC%A7%91%ED%96%89%EB%B2%95/%EC%A0%9C246%EC%A1%B0', org: 'CaseNote' },
  ],
}

export default data
