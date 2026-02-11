import Link from 'next/link'
import type { SpokeData } from './types'
import { SpokeTable, FormulaBox, SpokeCompareCards, SpokeRateBars, SpokeWarnBox, SpokeChecklist, SpokeTimeline, RateCards } from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '보험금-압류금지-한도-사망보험-해약환급',

  meta: {
    title: '보험금 압류금지 한도 사망보험금 해약환급금 보호 범위 총정리',
    description: '사망보험금 1500만원, 해약환급금 250만원까지 압류가 안 된다는 거 아시나요? 보험금별 압류금지 한도와 보호 범위를 알려드려요',
    keywords: ['보험금 압류금지', '보험금 압류 한도', '사망보험금 압류', '해약환급금 압류'],
    ogTitle: '보험금 압류금지 한도 사망보험금 해약환급금 | 머니위키',
    ogDescription: '사망보험금, 해약환급금, 만기환급금별 압류금지 한도와 보호 조건을 정리했어요.',
  },

  hub: {
    url: '/w/생계비계좌-압류방지통장-개설-한도',
    name: '생계비계좌 압류방지통장 개설 한도',
  },

  breadcrumb: ['금융', '생계비계좌 보험금 압류금지'],

  hero: {
    badge: '2026년 2월 시행',
    h1: <>보험금 <span className="text-[#1E3A5F]">압류금지 한도</span> — 사망보험금과 해약환급금 보호 범위</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          채무 때문에 보험까지 압류당할 수 있다는 걸 알고 당황하는 분이 많아요. 다행히 법에서 보험금의 일부를 보호해 주고 있고, 2026년 2월부터 그 보호 범위가 더 넓어졌어요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          <strong>사망보험금 1,500만원, 해약환급금 250만원</strong>까지 압류가 금지돼요. 어떤 보험이 보호되고, 어떤 건 안 되는지 정리했어요. <Link href="/w/생계비계좌-압류방지통장-개설-한도" className="text-blue-600 hover:underline">생계비계좌 전체 가이드</Link>와 함께 보면 전체 보호 체계가 한눈에 들어와요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '생계비계좌 개설부터 한도까지 전체 흐름 확인하기',
    },
  },

  toc: [
    { id: 's1', text: '보험금도 압류를 당하나요?' },
    { id: 's2', text: '보험금 압류금지 한도는 얼마인가요?' },
    { id: 's3', text: '사망보험금은 보호되나요?' },
    { id: 's4', text: '해약환급금은 압류 대상인가요?' },
    { id: 's5', text: '자주 묻는 질문' },
  ],

  sections: [
    /**
     * ===== S1: 보험금 압류 여부 =====
     * 시각 요소: SpokeTable + FormulaBox
     * 전환 스타일: A. 독자 대변형
     */
    {
      id: 's1',
      number: '01',
      heading: '보험금도 압류를 당하나요?',
      subtitle: '네, 보험금도 재산이라서 압류 대상이에요. 다만 일부는 보호돼요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            보험금은 법적으로 채무자의 재산에 해당해요. 채권자가 법원에 압류를 신청하면 보험금도 압류 대상이 될 수 있어요. 보험계약의 해약환급금, 만기환급금, 사고보험금, 사망보험금 모두 원칙적으로는 압류가 가능해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            하지만 <a href="https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=207952" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">민사집행법 시행령 제6조</a>에서 보장성 보험의 일부 보험금에 대해 압류를 금지하고 있어요. 보장성 보험이란 사망, 질병, 상해 등의 위험을 보장하는 보험을 말해요. 저축성 보험은 해당되지 않아요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            보장성 보험 중에서도 어떤 보험금이냐에 따라 보호 범위가 달라요. 아래에서 보험금 종류별로 압류 가능 여부를 확인해 보세요.
          </p>

          <SpokeTable id="s1-type" title="보험금 종류별 압류 가능 여부" subtitle="" headers={['보험금 종류', '압류 가능', '보호 한도', '비고']} rows={[
            ['보장성 사망보험금', '일부', '1,500만원까지 보호', '2026년 상향'],
            ['보장성 만기환급금', '일부', '250만원까지 보호', '2026년 상향'],
            ['보장성 해약환급금', '일부', '250만원까지 보호', '2026년 상향'],
            ['저축성 보험금', '전액 압류 가능', '보호 없음', '보장성이 아닌 경우'],
            ['실손의료비 보험금', '압류 불가', '전액 보호', '실손보장 특성상'],
          ]} />

          <FormulaBox lines={[
            { text: '보장성 보험: 사망·질병·상해를 주로 보장 (보험료 대비 보험금이 큰 구조)', numbered: true },
            { text: '저축성 보험: 만기 시 납입보험료 + 이자를 돌려주는 구조', numbered: true },
            { text: '혼합형(보장+저축): 보장 부분만 압류금지 적용', numbered: true },
            { text: '// 별도 법 적용: 실손보험: 의료비 실비보상이므로 전액 보호', numbered: true, comment: true },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            보험금이 압류될 수 있다는 건 알겠는데, 구체적으로 얼마까지 보호받는지 정확한 금액이 궁금하잖아요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '한도',
        title: '정확히 얼마까지 보호받을 수 있을까?',
        desc: '보험금 압류금지 한도 상세 확인',
        icon: 'calc',
      },
    },

    /**
     * ===== S2: 압류금지 한도 =====
     * 시각 요소: SpokeCompareCards + SpokeRateBars
     * 전환 스타일: D. 화제 전환형
     */
    {
      id: 's2',
      number: '02',
      heading: '보험금 압류금지 한도는 얼마인가요?',
      subtitle: '사망보험금 1,500만원, 환급금 250만원까지 보호돼요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            2026년 2월 민사집행법 시행령 개정으로 보험금 압류금지 한도가 올랐어요. 보장성 보험의 <strong>사망보험금</strong>은 1,000만원에서 1,500만원으로, <strong>만기환급금·해약환급금</strong>은 150만원에서 250만원으로 상향됐어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            이 한도는 보험금 '전체'가 아니라 '1건당' 기준이에요. 보장성 보험이 여러 건이면 각 보험별로 한도가 적용돼요. 예를 들어 A보험 해약환급금이 300만원이고 B보험 해약환급금이 200만원이면, A보험에서 250만원, B보험에서 200만원(전액)이 보호돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            다만 같은 보험사에 여러 보험이 있는 경우, 보험사별로 합산해서 한도를 적용할 수 있어요. 이 부분은 법원 판단에 따라 달라질 수 있으니, 압류 상황이라면 전문가 상담을 받는 게 안전해요.
          </p>

          <SpokeCompareCards
            cards={[
              { title: '기존 한도 (~2026.1)', subtitle: '', items: ['사망보험금: 1,000만원', '만기환급금: 150만원', '해약환급금: 150만원', '저축성 보험: 보호 없음'] },
              { title: '변경 한도 (2026.2~)', subtitle: '', items: ['사망보험금: 1,500만원', '만기환급금: 250만원', '해약환급금: 250만원', '저축성 보험: 보호 없음'] }
            ]}
          />

          <SpokeRateBars bars={[
            { label: '사망보험금', rate: '1,500만원', width: '100%' },
            { label: '만기환급금', rate: '250만원', width: '17%' },
            { label: '해약환급금', rate: '250만원', width: '17%' },
            { label: '저축성 보험', rate: '0원 (보호 없음)', width: '0%' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            그런데 사망보험금은 보험 가입자가 아니라 유가족이 받는 돈인데, 그래도 압류가 되는 건지 좀 더 자세히 알아볼게요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '사망보험',
        title: '사망보험금도 압류되나?',
        desc: '사망보험금 보호 범위와 수익자 기준 확인',
        icon: 'info',
      },
    },

    /**
     * ===== S3: 사망보험금 보호 =====
     * 시각 요소: SpokeWarnBox + SpokeChecklist
     * 전환 스타일: C. 간결 연결형
     */
    {
      id: 's3',
      number: '03',
      heading: '사망보험금은 보호되나요?',
      subtitle: '보장성 보험의 사망보험금은 1,500만원까지 보호돼요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            사망보험금은 피보험자(보험에 가입된 사람)가 사망했을 때 보험수익자에게 지급되는 돈이에요. 여기서 압류가 문제되는 건 '보험수익자'에게 채무가 있는 경우예요. 수익자가 받을 사망보험금에 대해 채권자가 압류를 신청할 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            하지만 민사집행법 시행령에 따라 보장성 보험의 사망보험금은 <strong>1,500만원까지 압류가 금지</strong>돼요. 사망보험금이 3,000만원이라면 1,500만원은 보호되고, 초과한 1,500만원만 압류 대상이에요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            여기서 중요한 건 '보장성 보험'이어야 한다는 거예요. 저축성 보험의 사망보장 특약으로 받는 보험금은 보장성 보험으로 인정될 수도, 안 될 수도 있어요. 보험 증권에 '보장성'이라고 명시된 보험이 확실하게 보호돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            또한 보험계약자(보험료를 내는 사람)에게 채무가 있는 경우에는 보험 자체를 해지당할 수 있어요. 채권자가 법원에 보험계약 해지 청구를 하면 해약환급금이 압류돼요. 이 경우 해약환급금 250만원까지만 보호돼요.
          </p>

          <SpokeWarnBox title="주의사항">
            <p className="mb-0 leading-relaxed">
              보험계약자(보험료 내는 사람)에게 채무가 있으면, 채권자가 보험 자체를 해지 청구할 수 있어요. 이 경우 수익자가 누구든 상관없이 해약환급금이 압류 대상이 돼요. <strong>보험계약자를 채무가 없는 가족으로 변경</strong>하면 이 위험을 줄일 수 있지만, 채무 이후에 변경하면 사해행위로 취소될 수 있어요.
            </p>
          </SpokeWarnBox>

          <SpokeChecklist items={[
            { text: '보장성 보험인지 확인 (저축성은 보호 안 됨)', done: false, note: '보험 증권에서 확인' },
            { text: '사망보험금 수령액이 1,500만원 이하인지', done: false, note: '이하면 전액 보호' },
            { text: '보험수익자에게 채무가 있는지', done: false, note: '수익자 채무 시 압류 가능' },
            { text: '보험계약자에게 채무가 있는지', done: false, note: '계약자 채무 시 해지 위험' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            사망보험금과 함께 궁금해하는 게 해약환급금이에요. 보험을 중간에 해지하면 돌려받는 돈인데, 이것도 보호가 되는지 알아볼게요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '해약환급',
        title: '해약환급금도 보호받을 수 있나?',
        desc: '해약환급금 압류 범위와 보호 한도 확인',
        icon: 'info',
      },
    },

    /**
     * ===== S4: 해약환급금 압류 =====
     * 시각 요소: SpokeTimeline + RateCards
     * 전환 스타일: 없음 (마지막 본문 섹션)
     */
    {
      id: 's4',
      number: '04',
      heading: '해약환급금은 압류 대상인가요?',
      subtitle: '보장성 보험은 250만원까지 보호, 저축성은 전액 압류 가능해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            해약환급금은 보험을 중도 해지했을 때 돌려받는 금액이에요. 채권자 입장에서는 채무자의 재산이기 때문에 압류 대상이 돼요. 채권자가 법원에 보험계약 해지 청구를 하면, 법원 명령으로 보험이 해지되고 환급금이 압류돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            2026년 2월부터 보장성 보험의 해약환급금은 <strong>250만원까지 압류가 금지</strong>돼요. 해약환급금이 400만원이라면 250만원은 보호되고, 150만원만 압류 대상이에요. 기존에는 150만원까지만 보호됐는데, 100만원이 더 올라간 거예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            저축성 보험의 해약환급금은 보호 대상이 아니에요. 전액이 압류 가능해요. 종신보험, 암보험, 실손보험 등 '보장'이 주 목적인 보험만 해당되고, 연금저축, 변액보험(저축형) 등은 해당되지 않아요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            만기환급금도 해약환급금과 동일한 기준으로 250만원까지 보호돼요. 보험 만기 시 돌려받는 금액 중 250만원까지는 압류할 수 없어요.
          </p>

          <SpokeTimeline events={[
            { month: '2014년', title: '최초 도입', desc: '사망보험금 1,000만원, 환급금 150만원 보호', status: 'normal', tag: '시작' },
            { month: '2022년', title: '한도 유지', desc: '생계비 185만원 인상에도 보험 한도는 동결', status: 'normal', tag: '동결' },
            { month: '2026년 2월', title: '한도 상향', desc: '사망 1,500만원, 환급금 250만원으로 인상', status: 'current', tag: '현행' },
          ]} />

          <RateCards cards={[
            { value: '1,500만원', label: '사망보험금 보호', lines: ['보장성 보험 한정', '초과분만 압류 가능'], highlightColor: 'navy' as const, active: true },
            { value: '250만원', label: '해약환급금 보호', lines: ['보장성 보험 한정', '저축성은 보호 없음'], active: false },
            { value: '250만원', label: '만기환급금 보호', lines: ['보장성 보험 한정', '해약환급금과 동일 기준'], active: false },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            보험금 보호까지 알았으면, 생계비계좌와 함께 활용해서 전체 자산을 효과적으로 지킬 수 있어요. <Link href="/w/통장-압류-풀기-생계비계좌-활용-방법" className="text-blue-600 hover:underline">통장 압류 풀기와 생계비계좌 활용 방법</Link>에서 종합적인 대응 전략을 확인해 보세요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '/w/생계비계좌-압류방지통장-개설-한도',
        badge: '전체 가이드',
        title: '생계비계좌 개설부터 한도까지 한번에 보기',
        desc: '개설 조건, 은행별 방법, 압류 대응까지 전체 정리',
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
      question: '실손보험금도 압류가 되나요?',
      answer: '실손의료비 보험금은 실제 치료비를 보전하는 성격이라서 압류 대상이 아니에요. 치료를 받고 청구한 실손보험금은 전액 보호돼요. 다만 실손보험의 해약환급금은 별도로 판단돼요.',
    },
    {
      question: '보험을 여러 개 가지고 있으면 한도가 합산되나요?',
      answer: '원칙적으로 보험 1건마다 각각 한도가 적용돼요. 하지만 같은 보험사에서 여러 건의 보험을 가지고 있으면 합산 적용될 수 있어요. 법원 판단에 따라 달라지니 전문가 상담을 받아보세요.',
    },
  ],

  relatedSpokes: [
    { badge: '상향', title: '압류금지 생계비 185만원에서 250만원 상향', desc: '생계비 상향의 배경과 적용 시점', href: '/w/압류금지-생계비-185만원-250만원-상향' },
    { badge: '한도', title: '생계비계좌 입금 한도 250만원 잔액 관리', desc: '생계비계좌 한도 관리와 초과 시 대응', href: '/w/생계비계좌-입금-한도-250만원-잔액-관리' },
    { badge: '활용', title: '통장 압류 풀기와 생계비계좌 활용 방법', desc: '압류 해제 신청과 활용 전략', href: '/w/통장-압류-풀기-생계비계좌-활용-방법' },
    { badge: '개념', title: '생계비계좌 압류방지통장 행복지킴이 차이', desc: '세 가지 통장의 개념과 차이 비교', href: '/w/생계비계좌-압류방지통장-행복지킴이-차이' },
  ],

  sources: [
    { name: '민사집행법 시행령 제6조(압류금지 보장성 보험금)', url: 'https://korea.legal/provision/%EB%AF%BC%EC%82%AC%EC%A7%91%ED%96%89%EB%B2%95-%EC%8B%9C%ED%96%89%EB%A0%B9-%EC%A0%9C6%EC%A1%B0-%EC%95%95%EB%A5%98%EA%B8%88%EC%A7%80-%EB%B3%B4%EC%9E%A5%EC%84%B1-%EB%B3%B4%ED%97%98%EA%B8%88-%EB%93%B1/', org: '신우법무사' },
    { name: '민사집행법 시행령', url: 'https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=207952', org: '국가법령정보센터' },
    { name: '생계비계좌 도입 정책 보도', url: 'https://www.korea.kr/news/policyNewsView.do?newsId=148953265', org: '대한민국 정책브리핑' },
    { name: '금융감독원 보험 안내', url: 'https://www.fss.or.kr', org: '금융감독원' },
  ],
}

export default data
