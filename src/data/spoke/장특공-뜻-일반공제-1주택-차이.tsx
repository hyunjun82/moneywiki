import Link from 'next/link'
import type { SpokeData } from './types'
import { SpokeCompareCards, SpokeRateBars, SpokeTable, TipBox, FormulaBox, SpokeFlow, SpokeChecklist, RateCards } from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '장특공-뜻-일반공제-1주택-차이',

  meta: {
    title: '장기보유특별공제 뜻 일반공제 1주택 차이 완벽 정리',
    description: '장기보유특별공제가 뭔지, 일반공제와 1주택 공제가 어떻게 다른지 헷갈리셨죠? 공제 유형별 차이와 혜택을 쉽게 정리했어요',
    keywords: ['장기보유특별공제 뜻', '장특공 일반공제 차이', '1세대 1주택 장특공', '장기보유특별공제 개념'],
    ogTitle: '장기보유특별공제 뜻 일반공제 1주택 차이 | 머니위키',
    ogDescription: '장기보유특별공제 개념, 일반공제와 1주택 공제 차이, 혜택 비교를 정리했어요.',
  },

  hub: {
    url: '/w/장기보유특별공제-공제율-계산-거주요건',
    name: '장기보유특별공제 공제율 계산 거주요건',
  },

  breadcrumb: ['세금', '장기보유특별공제 개념'],

  hero: {
    badge: '2026년 기준',
    h1: <>장기보유특별공제 <span className="text-[#1E3A5F]">뜻과 유형</span> — 일반공제와 1주택 차이</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          부동산을 팔 때 양도소득세가 너무 많이 나오면 부담스럽잖아요. <strong>장기보유특별공제</strong>는 오래 갖고 있을수록 양도차익에서 더 많이 빼주는 세금 혜택이에요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          그런데 같은 장특공이라도 '일반공제'와 '1주택 공제'는 조건도 공제율도 완전히 달라요. <a href="https://law.go.kr/법령/소득세법/제95조" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">소득세법 제95조</a>에 근거한 이 두 가지 유형을 구분하는 게 절세의 출발점이에요. 전체 공제율표와 계산법이 궁금하면 <Link href="/w/장기보유특별공제-공제율-계산-거주요건" className="text-blue-600 hover:underline">장기보유특별공제 공제율 계산 거주요건</Link>도 같이 보세요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '장기보유특별공제 공제율, 계산법, 거주요건 총정리 보기',
    },
  },

  toc: [
    { id: 's1', text: '장기보유특별공제란 무엇인가요?' },
    { id: 's2', text: '일반공제와 1주택 공제는 어떻게 다른가요?' },
    { id: 's3', text: '1세대 1주택 장특공 조건은 뭔가요?' },
    { id: 's4', text: '장기보유특별공제 혜택은 얼마나 되나요?' },
    { id: 's5', text: '자주 묻는 질문' },
  ],

  sections: [
    /**
     * ===== S1: 장기보유특별공제란 무엇인가요? =====
     * 컴포넌트: SpokeCompareCards + SpokeRateBars
     * 전환 스타일: A. 독자 대변형
     */
    {
      id: 's1',
      number: '01',
      heading: '장기보유특별공제란 무엇인가요?',
      subtitle: '오래 보유할수록 양도차익에서 더 많이 빼주는 세금 제도예요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            장기보유특별공제(장특공)는 부동산을 3년 이상 보유한 뒤 양도할 때, 양도차익에서 일정 비율을 공제해 주는 제도예요. <a href="https://law.go.kr/법령/소득세법/제95조" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">소득세법 제95조</a>에 따르면, 보유기간이 길수록 공제율이 높아져요. 부동산 투기가 아니라 실거주 목적의 장기 보유를 세제로 지원하겠다는 취지예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            장특공은 크게 두 가지 유형이 있어요. 하나는 모든 부동산(토지, 상가, 다주택 등)에 적용되는 <strong>일반 장기보유특별공제</strong>이고, 다른 하나는 1세대 1주택자만 받을 수 있는 <strong>1주택 장기보유특별공제</strong>예요. 두 유형은 공제율 구조가 완전히 달라요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            일반 장특공은 보유기간만 보고 연 2%씩 최대 30%예요. 반면 1주택 장특공은 보유기간 공제율(최대 40%)에 거주기간 공제율(최대 40%)을 더해서 최대 80%까지 올라가요. 아래에서 두 유형을 비교해 볼게요.
          </p>

          <SpokeCompareCards cards={[
            {
              title: '일반 장특공',
              subtitle: '토지·상가·다주택 등',
              items: ['보유 3년부터 적용', '연 2%씩 공제', '최대 30% (15년)', '거주기간 무관'],
              recommended: false,
            },
            {
              title: '1주택 장특공',
              subtitle: '1세대 1주택 전용',
              items: ['보유 3년 + 거주 2년', '보유 연 4% + 거주 연 4%', '최대 80% (각 10년)', '거주요건 필수'],
              recommended: false,
            },
          ]} />

          <SpokeRateBars bars={[
            { label: '1주택 최대', rate: '80%', width: '100%' },
            { label: '일반 최대', rate: '30%', width: '37%' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            같은 장특공이라도 1주택과 일반의 혜택 차이가 이렇게 크니까, 본인 상황에 어떤 공제가 적용되는지 정확히 아는 게 중요하잖아요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '비교',
        title: '일반공제와 1주택 공제, 구체적으로 뭐가 다를까?',
        desc: '공제율 구조, 적용 대상, 요건 비교하기',
        icon: 'info',
      },
    },

    /**
     * ===== S2: 일반공제와 1주택 공제 차이 =====
     * 컴포넌트: SpokeTable + TipBox
     * 전환 스타일: D. 화제 전환형
     */
    {
      id: 's2',
      number: '02',
      heading: '일반공제와 1주택 공제는 어떻게 다른가요?',
      subtitle: '적용 대상, 공제율 구조, 거주요건까지 전부 달라요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            일반 장특공은 주택 외에도 토지, 상가, 오피스텔(비주거용) 등에 적용되는 공제예요. 보유기간 3년부터 연 2%씩 공제율이 올라가서 15년 이상 보유하면 최대 30%를 공제받아요. 거주기간은 상관없이 보유만 하면 돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            반면 1주택 장특공은 1세대 1주택자가 2년 이상 거주한 경우에만 거주기간 공제율이 추가돼요. 보유기간 연 4%(최대 40%) + 거주기간 연 4%(최대 40%)로, 10년 보유하고 10년 거주하면 80% 공제를 받아요. 거주기간을 채우지 못하면 보유기간 공제율만 적용되니까 사실상 반쪽짜리 혜택이에요.
          </p>

          <SpokeTable
            id="compare-tbl"
            title="일반 장특공 vs 1주택 장특공 비교"
            subtitle="소득세법 제95조 기준"
            headers={['구분', '일반 장특공', '1주택 장특공']}
            rows={[
              ['적용 대상', '토지·상가·다주택 등', '1세대 1주택'],
              ['보유 공제율', '연 2% (3년~)', '연 4% (3년~)'],
              ['거주 공제율', '없음', '연 4% (2년~)'],
              ['최대 공제율', '30% (15년)', '80% (10년+10년)'],
              ['거주요건', '불필요', '2년 이상 실거주'],
              ['적용 조건', '3년 이상 보유', '3년 보유 + 2년 거주'],
            ]}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            주의할 점은 1세대 1주택이라도 보유기간이 3년 미만이면 장특공 자체가 적용되지 않는다는 거예요. 또한 양도가액이 12억을 넘는 고가주택은 12억 초과분에 대해서만 장특공이 적용돼요. 비과세와 장특공은 별개의 제도라서 동시에 적용받을 수 있어요.
          </p>

          <TipBox title="일반 장특공도 받지 못하는 경우">
            <p className="mb-0 leading-relaxed">
              조정대상지역 다주택자가 중과세율로 양도세를 내는 경우에는 일반 장특공도 적용되지 않아요. 다만 2022년 5월~2026년 5월 중과유예 기간에 양도하면 기본세율 + 일반 장특공이 가능해요. 미등기 양도 자산도 장특공이 배제돼요.
            </p>
          </TipBox>

          <p className="text-neutral-600 mb-4 leading-relaxed">
            그런데 1주택 장특공을 받으려면 어떤 조건을 갖춰야 하는지 좀 더 구체적으로 알아야 할 부분이 있어요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '1주택 조건',
        title: '1세대 1주택 장특공, 조건을 정확히 알고 싶다면',
        desc: '1세대 1주택 판단 기준과 거주요건 확인',
        icon: 'check',
      },
    },

    /**
     * ===== S3: 1세대 1주택 장특공 조건 =====
     * 컴포넌트: FormulaBox + SpokeFlow
     * 전환 스타일: C. 간결 연결형
     */
    {
      id: 's3',
      number: '03',
      heading: '1세대 1주택 장특공 조건은 뭔가요?',
      subtitle: '1세대 판단, 1주택 기준, 보유·거주기간까지 세 가지를 충족해야 해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            1주택 장특공(최대 80%)을 받으려면 세 가지 조건을 모두 충족해야 해요. 첫째, 양도일 현재 <strong>1세대</strong>에 해당해야 해요. 세대란 같은 주소에서 생계를 같이하는 가족(배우자, 직계존비속 등)을 말해요. 배우자가 있으면 따로 살아도 같은 세대로 봐요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            둘째, 양도일 현재 <strong>국내에 1주택만 보유</strong>하고 있어야 해요. 일시적 2주택(종전 주택 양도 예정), 상속 주택, 혼인 합가, 부모 봉양 합가 등은 예외적으로 1주택으로 인정받을 수 있어요. 주택 수 판단은 세대 전체를 기준으로 해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            셋째, <strong>보유기간 3년 이상 + 거주기간 2년 이상</strong>이어야 해요. 보유기간은 취득일부터 양도일까지, 거주기간은 주민등록 전입일부터 전출일까지를 기준으로 계산해요. 거주기간이 2년 미만이면 거주 공제율(최대 40%)이 아예 적용되지 않아요.
          </p>

          <FormulaBox lines={[
            { text: '1주택 장특공 조건', numbered: false, comment: true },
            { text: '1세대: 배우자 + 직계존비속 등 동일 세대', numbered: true },
            { text: '1주택: 양도일 기준 국내 주택 1채만 보유', numbered: true },
            { text: '보유기간: 취득일 → 양도일 3년 이상', numbered: true },
            { text: '거주기간: 전입일 → 전출일 2년 이상', numbered: true },
            { text: '공제율 = 보유 공제율(최대 40%) + 거주 공제율(최대 40%)', numbered: false },
          ]} />

          <SpokeFlow steps={[
            { icon: '1', label: '1세대 확인', sub: '세대 구성원 점검' },
            { icon: '2', label: '1주택 확인', sub: '보유 주택 수 판단' },
            { icon: '3', label: '보유기간 확인', sub: '3년 이상 여부' },
            { icon: '4', label: '거주기간 확인', sub: '2년 이상 여부' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            조건을 확인했으니, 이제 실제로 혜택이 얼마나 되는지 숫자로 알아볼게요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '혜택',
        title: '장특공 혜택이 실제로 얼마나 클까?',
        desc: '공제 금액과 절세 효과를 숫자로 확인하기',
        icon: 'calc',
      },
    },

    /**
     * ===== S4: 장기보유특별공제 혜택 =====
     * 컴포넌트: SpokeChecklist + RateCards
     * 전환 스타일: 없음 (마지막 섹션)
     */
    {
      id: 's4',
      number: '04',
      heading: '장기보유특별공제 혜택은 얼마나 되나요?',
      subtitle: '보유·거주기간에 따라 수천만원에서 수억원까지 세금이 줄어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            장기보유특별공제의 혜택은 양도차익이 클수록, 보유·거주기간이 길수록 커져요. 예를 들어 양도차익이 5억원인 1주택을 10년 보유하고 10년 거주했다면 80%인 4억원이 공제돼서, 과세표준이 1억원으로 줄어들어요. 양도세는 수천만원 단위로 줄어드는 거예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            같은 양도차익 5억에서 거주기간이 0년이면 보유 공제율 40%만 적용돼서 2억원만 공제돼요. 과세표준이 3억원이 되니까 세금 차이가 엄청 커요. 거주 2년을 채우느냐 못 채우느냐에 따라 세금이 수천만원 달라질 수 있는 거예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            일반 장특공이 적용되는 상가나 토지도 마찬가지예요. 15년 보유하면 30%를 공제받으니, 양도차익이 3억이면 9,000만원을 빼고 세금을 계산해요. 장특공이 없으면 3억 전체가 과세 대상이 되니까 차이가 크죠.
          </p>

          <SpokeChecklist items={[
            { text: '1주택 10년 보유 + 10년 거주 시 양도차익의 80% 공제', done: true, note: '최대 혜택' },
            { text: '1주택 5년 보유 + 5년 거주 시 36% 공제', done: true, note: '중간 단계' },
            { text: '일반 15년 보유 시 30% 공제', done: true, note: '토지·상가 최대' },
            { text: '거주기간 미충족 시 보유 공제율만 적용', done: false, note: '혜택 절반' },
            { text: '보유 3년 미만은 장특공 적용 불가', done: false, note: '최소 요건' },
          ]} />

          <RateCards cards={[
            { value: '80%', label: '1주택 최대', lines: ['보유 10년 + 거주 10년', '양도차익 대부분 공제'], highlightColor: 'navy' },
            { value: '40%', label: '1주택 거주 미충족', lines: ['보유 10년만 인정', '거주 공제율 0%'] },
            { value: '30%', label: '일반 최대', lines: ['보유 15년 이상', '거주기간 무관'] },
            { value: '0%', label: '3년 미만', lines: ['보유기간 부족', '장특공 적용 불가'] },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            장특공은 부동산 양도세 절세의 핵심 도구예요. 보유기간과 거주기간을 전략적으로 맞추면 세금을 크게 줄일 수 있어요. 구체적인 공제율표와 계산 방법은 <Link href="/w/1주택-장특공-공제율표-연도별" className="text-blue-600 hover:underline">1주택 장특공 공제율표</Link>에서, 실전 절세 사례는 <Link href="/w/장특공-절세-계산-실전-사례" className="text-blue-600 hover:underline">장특공 절세 계산 실전 사례</Link>에서 확인할 수 있어요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '/w/장기보유특별공제-공제율-계산-거주요건',
        badge: '전체 가이드',
        title: '장특공의 모든 것을 한눈에 보고 싶다면',
        desc: '공제율표, 거주요건, 고가주택 계산까지 총정리',
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
      question: '장기보유특별공제는 아파트에만 적용되나요?',
      answer: '아니에요. 장특공은 토지, 상가, 단독주택, 다세대, 오피스텔(주거용) 등 모든 부동산에 적용돼요. 다만 1주택 장특공(최대 80%)은 1세대 1주택에만 해당하고, 나머지는 일반 장특공(최대 30%)이 적용돼요.',
    },
    {
      question: '장특공과 양도소득세 비과세를 동시에 받을 수 있나요?',
      answer: '네, 1세대 1주택이면 양도가액 12억까지 비과세를 먼저 적용하고, 12억 초과분에 대해 장특공을 추가로 적용해요. 두 가지를 모두 활용하면 세금이 크게 줄어들어요.',
    },
  ],

  relatedSpokes: [
    { badge: '공제율', title: '1주택 장특공 공제율표 보유 거주기간별', desc: '보유·거주기간별 공제율을 표로 정리했어요', href: '/w/1주택-장특공-공제율표-연도별' },
    { badge: '거주', title: '장특공 거주기간 2년 요건과 계산 방법', desc: '거주기간 계산법과 미충족 시 불이익', href: '/w/장특공-거주기간-2년-요건' },
    { badge: '고가주택', title: '고가주택 12억 초과 장특공 안분계산', desc: '12억 넘는 주택의 장특공 계산법', href: '/w/고가주택-12억-초과-장특공-계산' },
    { badge: '절세', title: '장특공 절세 계산 실전 사례', desc: '실제 계산으로 보는 절세 효과', href: '/w/장특공-절세-계산-실전-사례' },
  ],

  sources: [
    { name: '소득세법 제95조(장기보유특별공제)', url: 'https://law.go.kr/법령/소득세법/제95조', org: '국가법령정보센터' },
    { name: '소득세법 시행령 제159조의4(1세대 1주택 장특공)', url: 'https://law.go.kr/법령/소득세법시행령/제159조의4', org: '국가법령정보센터' },
    { name: '양도소득세 개요', url: 'https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2312&cntntsId=7711', org: '국세청' },
  ],
}

export default data
