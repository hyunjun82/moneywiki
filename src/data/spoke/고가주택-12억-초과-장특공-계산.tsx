import Link from 'next/link'
import type { SpokeData } from './types'
import { FormulaBox, SpokeTable, SpokeRateBars, SpokeCompareCards, SpokeStepCards, TipBox, SpokeFlow, SpokeChecklist } from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '고가주택-12억-초과-장특공-계산',

  meta: {
    title: '고가주택 12억 초과 장특공 계산 안분 방법 정리',
    description: '양도가액이 12억을 넘으면 장특공 계산이 복잡해지는 거 아시나요? 안분계산 공식과 실제 사례를 정리했어요',
    keywords: ['고가주택 장특공', '12억 초과 장특공', '고가주택 양도세', '장특공 안분 계산'],
    ogTitle: '고가주택 12억 초과 장특공 계산 안분 방법 | 머니위키',
    ogDescription: '고가주택 기준, 12억 초과 안분계산 공식, 실제 양도세 계산 사례를 정리했어요.',
  },

  hub: {
    url: '/w/장기보유특별공제-공제율-계산-거주요건',
    name: '장기보유특별공제 공제율 계산 거주요건',
  },

  breadcrumb: ['세금', '장기보유특별공제 고가주택'],

  hero: {
    badge: '2026년 기준',
    h1: <>고가주택 <span className="text-[#1E3A5F]">12억 초과</span> 장특공 계산 — 안분 방법 정리</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          1세대 1주택이라도 양도가액이 12억원을 넘으면 '고가주택'이 돼서 12억 초과분에 대해 양도세가 부과돼요. 이때 <strong>장기보유특별공제</strong>도 안분 적용되는데, 계산이 좀 복잡해요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          안분계산이 뭔지, 공식은 어떻게 되는지, 실제 사례로 확인해 볼게요. 장특공의 전체 구조는 <Link href="/w/장기보유특별공제-공제율-계산-거주요건" className="text-blue-600 hover:underline">장기보유특별공제 공제율 계산 거주요건</Link>에서 확인하세요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '장기보유특별공제 공제율, 거주요건, 절세 전략 총정리',
    },
  },

  toc: [
    { id: 's1', text: '고가주택 기준 12억 초과란 뭔가요?' },
    { id: 's2', text: '12억 초과 주택의 장특공은 어떻게 계산하나요?' },
    { id: 's3', text: '안분 계산이란 무엇인가요?' },
    { id: 's4', text: '고가주택 양도세 절세 방법은 뭔가요?' },
    { id: 's5', text: '자주 묻는 질문' },
  ],

  sections: [
    /**
     * ===== S1: 고가주택 기준 =====
     * 컴포넌트: FormulaBox + SpokeTable
     * 전환 스타일: A. 독자 대변형
     */
    {
      id: 's1',
      number: '01',
      heading: '고가주택 기준 12억 초과란 뭔가요?',
      subtitle: '양도가액이 12억원을 넘으면 고가주택으로 분류돼요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            소득세법에서 '고가주택'이란 양도 당시 실지거래가액(양도가액)이 <strong>12억원을 초과</strong>하는 주택을 말해요. <a href="https://law.go.kr/법령/소득세법시행령/제156조의2" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">소득세법 시행령 제156조의2</a>에서 이 기준을 정하고 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            1세대 1주택 비과세는 양도가액 12억원까지만 적용돼요. 12억원까지는 세금이 없지만, 12억을 초과하는 부분에 대해서는 양도소득세를 내야 해요. 이때 장기보유특별공제도 12억 초과분에 대해서만 안분 적용되는 거예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            고가주택 여부는 양도가액 기준이지 공시가격이나 감정가가 아니에요. 실제 매매 계약서의 거래금액이 12억원을 넘는지 아닌지로 판단해요. 부부 공동명의라도 주택 전체의 양도가액으로 판단하니까 주의하세요.
          </p>

          <FormulaBox lines={[
            { text: '고가주택 판단 기준', numbered: false, comment: true },
            { text: '양도가액 > 12억원 → 고가주택', numbered: true },
            { text: '비과세: 양도가액 12억까지만 적용', numbered: true },
            { text: '과세: 12억 초과분에 대해 양도세 계산', numbered: true },
            { text: '장특공: 과세 양도차익에 공제율 적용', numbered: true },
          ]} />

          <SpokeTable
            id="threshold"
            title="고가주택 기준 변천"
            subtitle="소득세법 시행령 기준"
            headers={['시기', '고가주택 기준', '비고']}
            rows={[
              ['~2008년', '6억원 초과', '구 기준'],
              ['2008~2021년', '9억원 초과', '중간 기준'],
              ['2021년 12월~', '12억원 초과', '현행 기준'],
            ]}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            예전에는 9억이었다가 2021년 12월부터 12억으로 올랐으니까, 9~12억 구간의 주택은 고가주택에서 빠졌어요. 그렇다면 12억을 넘는 집은 장특공을 어떻게 계산하는지 궁금하잖아요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '계산법',
        title: '12억 초과분의 장특공 계산은 어떻게 하나?',
        desc: '과세 양도차익 산출과 장특공 적용 방법',
        icon: 'calc',
      },
    },

    /**
     * ===== S2: 12억 초과 장특공 계산 =====
     * 컴포넌트: SpokeRateBars + SpokeCompareCards
     * 전환 스타일: D. 화제 전환형
     */
    {
      id: 's2',
      number: '02',
      heading: '12억 초과 주택의 장특공은 어떻게 계산하나요?',
      subtitle: '전체 양도차익에서 12억 초과 비율만큼만 과세하고, 거기에 장특공을 적용해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            고가주택의 양도세 계산은 세 단계로 이뤄져요. 먼저 전체 양도차익을 구하고, 그중 12억 초과분에 해당하는 비율을 적용해서 '과세 대상 양도차익'을 구해요. 그 다음 이 과세 양도차익에 장특공 공제율을 적용하는 거예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            구체적인 예시로 볼게요. 양도가액 18억, 취득가액 8억이면 양도차익은 10억이에요. 과세 비율은 (18억 - 12억) / 18억 = 6/18 = 1/3이에요. 그러면 과세 양도차익은 10억 x 1/3 = 약 3.33억이에요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            여기에 보유 10년 + 거주 10년이라면 장특공 80%를 적용해요. 과세 양도차익 3.33억 x 80% = 약 2.67억이 장특공 공제액이에요. 과세표준은 3.33억 - 2.67억 = 약 0.66억이 되는 거예요.
          </p>

          <SpokeRateBars bars={[
            { label: '양도차익', rate: '10억원', width: '100%' },
            { label: '비과세분(12억 이하)', rate: '6.67억원', width: '67%' },
            { label: '과세 양도차익', rate: '3.33억원', width: '33%' },
            { label: '장특공 공제', rate: '2.67억원', width: '27%' },
            { label: '과세표준', rate: '0.66억원', width: '7%' },
          ]} />

          <SpokeCompareCards cards={[
            {
              title: '장특공 80% 적용',
              subtitle: '10년 보유 + 10년 거주',
              items: ['과세 양도차익: 3.33억', '장특공 공제: 2.67억', '과세표준: 0.66억', '세금 대폭 감소'],
              recommended: true,
              recLabel: '절세 효과',
            },
            {
              title: '장특공 0% (3년 미만)',
              subtitle: '보유기간 부족',
              items: ['과세 양도차익: 3.33억', '장특공 공제: 0원', '과세표준: 3.33억', '세금 부담 큼'],
              recommended: false,
            },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            그런데 안분 계산이라는 용어가 좀 어렵게 느껴질 수 있어요. 이 계산 원리를 한번 풀어볼게요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '안분계산',
        title: '안분 계산, 쉽게 이해하고 싶다면',
        desc: '안분 계산 공식과 단계별 절차 확인',
        icon: 'info',
      },
    },

    /**
     * ===== S3: 안분 계산 설명 =====
     * 컴포넌트: SpokeStepCards + TipBox
     * 전환 스타일: C. 간결 연결형
     */
    {
      id: 's3',
      number: '03',
      heading: '안분 계산이란 무엇인가요?',
      subtitle: '전체 금액에서 과세 대상 비율만큼만 따로 계산하는 방식이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            안분(按分)이란 비율에 따라 나누는 것을 뜻해요. 고가주택의 양도세에서 안분 계산이란, 양도가액 중 12억원을 초과하는 비율만큼만 과세하고 나머지는 비과세로 처리하는 방식이에요. 이 비율을 '과세 비율'이라고 해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            과세 비율의 공식은 (양도가액 - 12억) / 양도가액이에요. 양도가액이 15억이면 (15억 - 12억) / 15억 = 3/15 = 20%가 과세 비율이에요. 양도차익, 필요경비 등 모든 금액에 이 비율을 곱해서 과세 대상 금액을 산출해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            장기보유특별공제도 과세 양도차익에 대해 적용해요. 전체 양도차익이 아니라 안분된 과세 양도차익에 공제율을 곱하는 거예요. 이 순서를 정확히 지켜야 계산 결과가 맞아요.
          </p>

          <SpokeStepCards steps={[
            { title: '1단계: 양도차익 산출', desc: '양도가액 - 취득가액 - 필요경비 = 전체 양도차익', tip: '실지거래가액 기준' },
            { title: '2단계: 과세 비율 계산', desc: '(양도가액 - 12억) / 양도가액 = 과세 비율', tip: '12억 초과분의 비율' },
            { title: '3단계: 과세 양도차익', desc: '전체 양도차익 x 과세 비율 = 과세 양도차익', tip: '이 금액이 과세 대상' },
            { title: '4단계: 장특공 적용', desc: '과세 양도차익 x 장특공 공제율 = 공제액', tip: '보유+거주 공제율 합산' },
          ]} />

          <TipBox title="홈택스 자동계산을 활용하세요">
            <p className="mb-0 leading-relaxed">
              고가주택의 안분계산은 수기로 하면 실수하기 쉬워요. <a href="https://www.hometax.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">홈택스 양도소득세 자동계산</a> 서비스를 이용하면 양도가액, 취득가액, 보유·거주기간을 입력하면 안분계산을 포함한 전체 세액이 자동으로 나와요. 복잡한 계산은 세무사 상담을 병행하는 게 안전해요.
            </p>
          </TipBox>

          <p className="text-neutral-600 mb-4 leading-relaxed">
            안분 계산 원리를 알았으니, 고가주택에서 세금을 줄이려면 어떤 전략을 쓸 수 있는지 넘어갈게요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '절세',
        title: '고가주택도 세금을 줄일 수 있을까?',
        desc: '보유·거주 전략으로 절세하는 방법 확인',
        icon: 'calc',
      },
    },

    /**
     * ===== S4: 고가주택 절세 방법 =====
     * 컴포넌트: SpokeFlow + SpokeChecklist
     * 전환 스타일: 없음 (마지막 섹션)
     */
    {
      id: 's4',
      number: '04',
      heading: '고가주택 양도세 절세 방법은 뭔가요?',
      subtitle: '보유·거주기간을 늘리고, 양도 시기를 전략적으로 잡는 게 핵심이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            고가주택이라도 1세대 1주택이면 12억까지 비과세가 적용되고, 초과분에 대해 장특공 최대 80%를 받을 수 있어요. 핵심은 보유기간 10년 + 거주기간 10년을 최대한 채우는 거예요. 80% 공제를 받으면 과세표준이 크게 줄어들어서 세금 부담이 확 낮아져요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            양도 시기도 중요해요. 보유기간이 9년 11개월이라면 한 달만 기다리면 보유 공제율이 36%에서 40%로 올라요. 이 4%p 차이가 과세 양도차익이 수억원인 고가주택에서는 수백만원~수천만원의 세금 차이를 만들어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            부부 공동명의로 취득하면 각각 양도소득세 기본공제(250만원)를 받을 수 있고, 세율도 낮은 구간에서 적용될 수 있어요. 다만 공동명의와 단독명의 중 어떤 것이 유리한지는 양도차익 규모와 보유·거주기간에 따라 달라지니까 세무 상담을 받는 게 좋아요.
          </p>

          <SpokeFlow steps={[
            { icon: '1', label: '보유·거주 극대화', sub: '10년+10년 목표' },
            { icon: '2', label: '양도 시기 조절', sub: '연수 넘기기' },
            { icon: '3', label: '명의 전략', sub: '공동명의 검토' },
            { icon: '4', label: '세무 상담', sub: '전문가 확인' },
          ]} />

          <SpokeChecklist items={[
            { text: '보유 10년 + 거주 10년으로 장특공 80% 확보', done: true, note: '최대 공제' },
            { text: '양도 시기를 조절해서 보유연수 한 단계 올리기', done: true, note: '연수 넘기기' },
            { text: '12억 비과세 한도를 최대한 활용', done: true, note: '비과세 우선' },
            { text: '필요경비(취득세, 중개수수료, 인테리어 등) 빠짐없이 반영', done: true, note: '양도차익 줄이기' },
            { text: '홈택스 자동계산 또는 세무사 상담으로 정확한 세액 확인', done: false, note: '실행 전 필수' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            고가주택의 양도세는 금액이 크기 때문에 장특공 공제율 몇 %p 차이로도 세금이 크게 달라져요. 양도 전에 반드시 보유·거주기간을 확인하고, 양도 시기와 명의 구조까지 종합적으로 검토하는 게 절세의 핵심이에요. 실전 계산 사례는 <Link href="/w/장특공-절세-계산-실전-사례" className="text-blue-600 hover:underline">장특공 절세 계산 실전 사례</Link>에서 확인할 수 있어요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '/w/장기보유특별공제-공제율-계산-거주요건',
        badge: '전체 가이드',
        title: '장특공 전체 구조를 한눈에 보고 싶다면',
        desc: '공제율, 거주요건, 다주택 배제까지 총정리',
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
      question: '양도가액이 딱 12억이면 고가주택인가요?',
      answer: '아니에요. 고가주택은 양도가액이 12억원을 "초과"하는 경우예요. 12억원 이하면 고가주택이 아니라서 1세대 1주택 비과세가 전액 적용되고 양도세가 없어요.',
    },
    {
      question: '취득가액에 인테리어 비용도 포함되나요?',
      answer: '네, 자본적 지출에 해당하는 인테리어 비용은 취득가액에 포함할 수 있어요. 베란다 확장, 시스템 에어컨 설치, 주방 리모델링 등이 해당돼요. 영수증을 보관해 두면 양도차익을 줄일 수 있어요.',
    },
  ],

  relatedSpokes: [
    { badge: '공제율', title: '1주택 장특공 공제율표 보유 거주기간별', desc: '보유·거주기간별 공제율 한눈에 보기', href: '/w/1주택-장특공-공제율표-연도별' },
    { badge: '거주', title: '장특공 거주기간 2년 요건과 계산', desc: '거주기간 충족 방법과 불이익', href: '/w/장특공-거주기간-2년-요건' },
    { badge: '다주택', title: '다주택 장특공 배제 조건과 예외', desc: '다주택자 장특공 배제와 예외 사항', href: '/w/다주택-장특공-배제-조건-예외' },
    { badge: '절세', title: '장특공 절세 계산 실전 사례', desc: '고가주택 포함 실전 절세 사례', href: '/w/장특공-절세-계산-실전-사례' },
  ],

  sources: [
    { name: '소득세법 시행령 제156조의2(고가주택 기준)', url: 'https://law.go.kr/법령/소득세법시행령/제156조의2', org: '국가법령정보센터' },
    { name: '소득세법 제95조(장기보유특별공제)', url: 'https://law.go.kr/법령/소득세법/제95조', org: '국가법령정보센터' },
    { name: '양도소득세 자동계산', url: 'https://www.hometax.go.kr', org: '홈택스' },
  ],
}

export default data
