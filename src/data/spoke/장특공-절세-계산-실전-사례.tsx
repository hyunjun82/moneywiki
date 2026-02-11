import Link from 'next/link'
import type { SpokeData } from './types'
import { FormulaBox, SpokeStepCards, SpokeTable, SpokeRateBars, SpokeCompareCards, SpokeChecklist, SpokeFlow, TipBox } from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '장특공-절세-계산-실전-사례',

  meta: {
    title: '장특공 절세 계산 실전 사례 양도세 줄이는 방법',
    description: '장기보유특별공제로 양도세를 얼마나 아낄 수 있는지 실제 사례로 계산해 봤어요. 보유 거주 전략과 절세 효과를 확인하세요',
    keywords: ['장특공 절세', '장특공 계산 사례', '양도세 절세 방법', '장특공 실전 활용'],
    ogTitle: '장특공 절세 계산 실전 사례 양도세 줄이는 방법 | 머니위키',
    ogDescription: '장기보유특별공제 실제 계산 사례, 보유·거주 전략, 절세 효과를 정리했어요.',
  },

  hub: {
    url: '/w/장기보유특별공제-공제율-계산-거주요건',
    name: '장기보유특별공제 공제율 계산 거주요건',
  },

  breadcrumb: ['세금', '장기보유특별공제 절세 사례'],

  hero: {
    badge: '2026년 기준',
    h1: <>장특공 <span className="text-[#1E3A5F]">절세 계산</span> — 실전 사례로 보는 양도세 줄이기</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          장기보유특별공제가 절세에 좋다는 건 알겠는데, 실제로 <strong>내 상황에서 세금이 얼마나 줄어드는지</strong> 숫자로 봐야 감이 오잖아요. 이 글에서는 실제 사례를 통해 장특공의 절세 효과를 계산해 봤어요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          1주택부터 고가주택, 거주기간 차이까지 다양한 시나리오를 다뤘어요. 장특공 공제율표와 전체 구조는 <Link href="/w/장기보유특별공제-공제율-계산-거주요건" className="text-blue-600 hover:underline">장기보유특별공제 공제율 계산 거주요건</Link>에서 확인하세요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '장기보유특별공제 공제율, 거주요건, 계산법 총정리',
    },
  },

  toc: [
    { id: 's1', text: '장특공으로 세금을 얼마나 아낄 수 있나요?' },
    { id: 's2', text: '장특공 계산은 어떻게 하나요?' },
    { id: 's3', text: '절세를 위한 보유 거주 전략은 뭔가요?' },
    { id: 's4', text: '실전 사례로 보는 절세 효과는 어떤가요?' },
    { id: 's5', text: '자주 묻는 질문' },
  ],

  sections: [
    /**
     * ===== S1: 절세 효과 개요 =====
     * 컴포넌트: FormulaBox + SpokeStepCards
     * 전환 스타일: A. 독자 대변형
     */
    {
      id: 's1',
      number: '01',
      heading: '장특공으로 세금을 얼마나 아낄 수 있나요?',
      subtitle: '보유·거주기간에 따라 수천만원에서 수억원까지 절세할 수 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            장기보유특별공제의 절세 효과는 양도차익, 보유기간, 거주기간에 따라 크게 달라져요. 양도차익이 5억원인 1세대 1주택을 10년 보유하고 10년 거주했다면 80%인 4억원이 공제돼서, 과세표준이 5억에서 1억으로 줄어요. 양도세가 수천만원 단위로 줄어드는 거예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            반대로 장특공이 없으면(보유 3년 미만) 양도차익 전체에 세금이 붙어요. 양도차익 5억이면 과세표준이 5억 그대로니까, 누진세율 구조상 세금이 1억원을 훌쩍 넘어요. 장특공 유무에 따른 차이가 이렇게 극적이에요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            양도소득세의 계산 구조를 먼저 이해하면 장특공이 어디서 세금을 줄여주는지 명확히 보여요. 양도가액에서 취득가액과 필요경비를 빼서 양도차익을 구하고, 거기서 장특공을 빼고, 기본공제 250만원을 빼면 과세표준이에요.
          </p>

          <FormulaBox lines={[
            { text: '양도소득세 계산 흐름', numbered: false, comment: true },
            { text: '양도가액 - 취득가액 - 필요경비 = 양도차익', numbered: true },
            { text: '양도차익 - 장기보유특별공제 = 양도소득금액', numbered: true },
            { text: '양도소득금액 - 기본공제(250만원) = 과세표준', numbered: true },
            { text: '과세표준 x 세율 - 누진공제 = 산출세액', numbered: true },
          ]} />

          <SpokeStepCards steps={[
            { title: '양도차익 산출', desc: '양도가액에서 취득가액과 필요경비(취득세, 중개수수료, 인테리어 등)를 빼요', tip: '필요경비를 빠짐없이 넣는 게 중요' },
            { title: '장특공 적용', desc: '보유·거주기간에 따른 공제율을 양도차익에 곱해서 빼요', tip: '이 단계에서 세금이 크게 줄어요' },
            { title: '과세표준 확정', desc: '양도소득금액에서 기본공제 250만원을 빼면 과세표준이에요', tip: '과세표준이 낮을수록 세율도 낮아요' },
            { title: '세금 계산', desc: '과세표준에 누진세율(6%~45%)을 적용해서 산출세액을 구해요', tip: '지방소득세 10% 별도' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            절세 효과가 크다는 건 알겠는데, 내 상황에 적용해서 직접 계산하는 방법을 알고 싶잖아요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '계산법',
        title: '장특공 계산을 직접 해보고 싶다면',
        desc: '단계별 계산 방법과 예시 확인',
        icon: 'calc',
      },
    },

    /**
     * ===== S2: 계산 방법 =====
     * 컴포넌트: SpokeTable + SpokeRateBars
     * 전환 스타일: D. 화제 전환형
     */
    {
      id: 's2',
      number: '02',
      heading: '장특공 계산은 어떻게 하나요?',
      subtitle: '양도차익에 공제율을 곱하면 돼요. 고가주택은 안분을 먼저 해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            기본적인 장특공 계산은 간단해요. 양도차익에 공제율을 곱하면 공제액이 나와요. 1주택 장특공이라면 보유 공제율(연 4%, 최대 40%)과 거주 공제율(연 4%, 최대 40%)을 합산한 비율을 적용해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            예를 들어 양도차익 4억원, 보유 8년, 거주 6년이라면 보유 공제율 32% + 거주 공제율 24% = 56%예요. 장특공 공제액은 4억 x 56% = 2.24억이에요. 과세표준은 4억 - 2.24억 - 0.025억(기본공제) = 약 1.735억이에요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            고가주택(12억 초과)이면 안분 계산을 먼저 해요. 과세 비율 = (양도가액 - 12억) / 양도가액으로 구한 뒤, 양도차익에 이 비율을 곱해서 과세 양도차익을 구하고, 거기에 장특공 공제율을 적용해요. 아래 표에서 두 가지 사례를 비교해 볼게요.
          </p>

          <SpokeTable
            id="calc-compare"
            title="장특공 계산 사례 비교"
            subtitle="1주택, 보유 8년 + 거주 6년 (공제율 56%)"
            headers={['항목', '일반주택 (10억)', '고가주택 (16억)']}
            rows={[
              ['양도가액', '10억', '16억'],
              ['취득가액', '6억', '8억'],
              ['양도차익', '4억', '8억'],
              ['과세 비율', '해당 없음 (12억 이하)', '(16-12)/16 = 25%'],
              ['과세 양도차익', '4억', '8억 x 25% = 2억'],
              ['장특공 공제 (56%)', '2.24억', '2억 x 56% = 1.12억'],
              ['양도소득금액', '1.76억', '0.88억'],
            ]}
          />

          <SpokeRateBars bars={[
            { label: '일반주택 양도차익', rate: '4억', width: '100%' },
            { label: '장특공 공제 후', rate: '1.76억', width: '44%' },
            { label: '고가주택 과세분', rate: '2억', width: '50%' },
            { label: '장특공 공제 후', rate: '0.88억', width: '22%' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            계산 방법은 알겠는데, 실제로 절세 효과를 극대화하려면 어떤 전략을 세워야 하는지가 더 중요해요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '전략',
        title: '장특공 절세를 극대화하려면 어떤 전략이 필요할까?',
        desc: '보유·거주기간 최적화와 양도 시기 전략',
        icon: 'info',
      },
    },

    /**
     * ===== S3: 보유·거주 전략 =====
     * 컴포넌트: SpokeCompareCards + SpokeChecklist
     * 전환 스타일: C. 간결 연결형
     */
    {
      id: 's3',
      number: '03',
      heading: '절세를 위한 보유 거주 전략은 뭔가요?',
      subtitle: '보유·거주기간을 전략적으로 맞추고, 양도 시기를 조절하는 게 핵심이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            장특공 절세의 핵심 전략은 세 가지예요. 첫째, <strong>거주기간을 최대한 확보</strong>하는 거예요. 같은 10년 보유라도 거주 10년이면 80%, 거주 0년이면 40%예요. 이 40%p 차이는 양도차익이 클수록 수억원의 세금 차이로 이어져요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            둘째, <strong>양도 시기를 공제율이 올라가는 시점에 맞추는 거예요</strong>. 보유기간 4년 11개월이면 한 달만 기다려서 5년을 채우면 보유 공제율이 16%에서 20%로 올라요. 거주기간도 마찬가지로 연수가 바뀌는 시점을 잘 맞추면 유리해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            셋째, <strong>필요경비를 빠짐없이 반영</strong>하는 거예요. 취득세, 법무사 비용, 중개수수료, 자본적 지출(인테리어)까지 포함하면 양도차익이 줄어들어서 세금도 줄어요. 영수증과 증빙을 잘 보관해 두는 게 중요해요.
          </p>

          <SpokeCompareCards cards={[
            {
              title: '거주 전략',
              subtitle: '거주기간 극대화',
              items: ['양도 전 2년 이상 거주 확보', '전입신고 필수 (실거주 증빙)', '임대 → 직접 거주 전환 시기 계획', '거주 연수 올리기 위한 양도 시기 조절'],
              recommended: true,
              recLabel: '효과 최대',
            },
            {
              title: '시기 전략',
              subtitle: '양도 타이밍 최적화',
              items: ['보유·거주 연수 넘기는 시점 대기', '다주택 정리 후 1주택 전환 시점', '중과유예 종료 전 양도 검토', '부동산 시장 상황도 고려'],
              recommended: false,
            },
          ]} />

          <SpokeChecklist items={[
            { text: '현재 보유·거주기간 정확히 확인', done: true, note: '날짜 기준' },
            { text: '양도 시점에서 공제율이 올라가는 날짜 파악', done: true, note: '연수 넘기기' },
            { text: '필요경비 영수증 모두 보관', done: true, note: '취득세, 인테리어 등' },
            { text: '홈택스 자동계산으로 예상 세액 확인', done: false, note: '양도 전 필수' },
            { text: '세무사 상담으로 최적 양도 시기 결정', done: false, note: '고가주택은 필수' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            전략을 알았으니, 실제 시나리오별로 세금이 얼마나 달라지는지 사례로 비교해 볼게요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '실전 사례',
        title: '실제 사례로 세금 차이를 확인하고 싶다면',
        desc: '시나리오별 양도세 비교 계산 사례',
        icon: 'calc',
      },
    },

    /**
     * ===== S4: 실전 사례 =====
     * 컴포넌트: SpokeFlow + TipBox
     * 전환 스타일: 없음 (마지막 섹션)
     */
    {
      id: 's4',
      number: '04',
      heading: '실전 사례로 보는 절세 효과는 어떤가요?',
      subtitle: '같은 집을 팔아도 장특공 적용 여부에 따라 세금이 수천만원 차이 나요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            사례를 하나 들어볼게요. 김씨가 2016년에 아파트를 7억에 샀고, 2026년에 14억에 양도해요. 양도차익은 7억, 필요경비(취득세, 중개수수료 등) 3,000만원을 빼면 순 양도차익은 6.7억이에요. 고가주택이니까 안분을 먼저 해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            과세 비율은 (14억 - 12억) / 14억 = 약 14.3%예요. 과세 양도차익은 6.7억 x 14.3% = 약 9,580만원이에요. 여기에 10년 보유 + 10년 거주라면 장특공 80%를 적용해요. 공제액은 약 7,664만원, 과세표준은 약 1,666만원이에요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            만약 장특공 없이(3년 미만 보유) 같은 조건이라면 과세 양도차익 9,580만원 전체가 과세표준이에요. 세율 35% 구간에 해당해서 산출세액이 약 2,450만원인 반면, 장특공 80%를 적용하면 약 170만원대예요. 장특공 하나로 세금이 약 2,280만원이나 줄어드는 거예요.
          </p>

          <SpokeFlow steps={[
            { icon: '1', label: '양도차익 6.7억', sub: '14억 - 7억 - 0.3억' },
            { icon: '2', label: '안분 14.3%', sub: '(14-12)/14' },
            { icon: '3', label: '과세분 9,580만', sub: '6.7억 x 14.3%' },
            { icon: '4', label: '장특공 80%', sub: '공제 7,664만' },
          ]} />

          <TipBox title="절세 효과를 극대화하는 3가지 포인트">
            <ul className="list-disc ml-5 space-y-1">
              <li className="leading-relaxed"><strong>거주기간 10년 채우기</strong>: 보유만 10년이면 40%, 거주도 10년이면 80%예요. 40%p 차이는 고가주택에서 수천만원의 세금 차이를 만들어요.</li>
              <li className="leading-relaxed"><strong>필요경비 빠짐없이 반영</strong>: 취득세, 중개수수료, 법무사 비용, 베란다 확장비, 시스템 에어컨 등 자본적 지출 영수증을 모두 보관하세요.</li>
              <li className="leading-relaxed"><strong>양도 시기 한 달 조절</strong>: 보유·거주 연수가 바뀌는 날짜에 맞춰서 양도하면 공제율 4%p를 추가로 확보할 수 있어요.</li>
            </ul>
          </TipBox>

          <p className="text-neutral-600 mb-4 leading-relaxed">
            장기보유특별공제는 부동산 양도세에서 가장 큰 절세 효과를 내는 제도예요. 양도를 계획하고 있다면 보유기간, 거주기간, 필요경비를 미리 정리해서 최적의 시기에 양도하는 게 현명해요. <a href="https://www.hometax.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">홈택스 양도소득세 자동계산</a>으로 예상 세액을 먼저 확인해 보고, 금액이 크면 세무사 상담을 병행하는 걸 권해요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '/w/장기보유특별공제-공제율-계산-거주요건',
        badge: '전체 가이드',
        title: '장특공 전체 구조를 한눈에 보고 싶다면',
        desc: '공제율표, 거주요건, 고가주택, 다주택까지 총정리',
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
      question: '장특공과 양도소득세 감면을 동시에 받을 수 있나요?',
      answer: '장특공과 감면은 별개의 제도예요. 다만 감면 한도가 있는 경우 장특공을 먼저 적용한 후의 세액에서 감면이 이뤄져요. 두 가지를 동시에 활용하면 세금을 더 줄일 수 있어요.',
    },
    {
      question: '양도세 신고를 안 하면 장특공을 못 받나요?',
      answer: '장특공은 양도세 신고 시 직접 적용해서 신고해야 해요. 무신고하면 가산세가 붙고, 나중에 수정신고를 해도 일부 불이익이 있을 수 있어요. 비과세 대상이라도 양도세 신고는 하는 게 안전해요.',
    },
  ],

  relatedSpokes: [
    { badge: '공제율', title: '1주택 장특공 공제율표 보유 거주기간별', desc: '보유·거주 공제율을 표로 한눈에', href: '/w/1주택-장특공-공제율표-연도별' },
    { badge: '고가주택', title: '고가주택 12억 초과 장특공 안분계산', desc: '안분 계산 공식과 상세 사례', href: '/w/고가주택-12억-초과-장특공-계산' },
    { badge: '거주', title: '장특공 거주기간 2년 요건', desc: '거주기간이 세금에 미치는 영향', href: '/w/장특공-거주기간-2년-요건' },
    { badge: '재기산', title: '보유기간 재기산 폐지 내용', desc: '폐지 효과로 절세가 더 유리해진 사례', href: '/w/보유기간-재기산-폐지-내용' },
  ],

  sources: [
    { name: '소득세법 제95조(장기보유특별공제)', url: 'https://law.go.kr/법령/소득세법/제95조', org: '국가법령정보센터' },
    { name: '양도소득세 세율표', url: 'https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2312&cntntsId=7711', org: '국세청' },
    { name: '양도소득세 자동계산', url: 'https://www.hometax.go.kr', org: '홈택스' },
    { name: '소득세법 시행령 제159조의4', url: 'https://law.go.kr/법령/소득세법시행령/제159조의4', org: '국가법령정보센터' },
  ],
}

export default data
