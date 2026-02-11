import Link from 'next/link'
import type { SpokeData } from './types'
import { SpokeTable, FormulaBox, SpokeRateBars, SpokeChecklist, SpokeCompareCards, TipBox, SpokeTimeline, SpokeFlow } from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '1주택-장특공-공제율표-연도별',

  meta: {
    title: '1주택 장특공 공제율표 보유기간 거주기간별 정리',
    description: '1세대 1주택 장기보유특별공제 공제율이 보유기간과 거주기간에 따라 얼마인지 한눈에 볼 수 있게 정리했어요',
    keywords: ['1주택 장특공 공제율', '장특공 공제율표', '보유기간 공제율', '거주기간 공제율'],
    ogTitle: '1주택 장특공 공제율표 보유기간 거주기간별 | 머니위키',
    ogDescription: '1세대 1주택 장기보유특별공제 공제율표, 보유·거주기간별 공제율을 표로 정리했어요.',
  },

  hub: {
    url: '/w/장기보유특별공제-공제율-계산-거주요건',
    name: '장기보유특별공제 공제율 계산 거주요건',
  },

  breadcrumb: ['세금', '장기보유특별공제 공제율표'],

  hero: {
    badge: '2026년 기준',
    h1: <>1주택 장특공 <span className="text-[#1E3A5F]">공제율표</span> — 보유기간 거주기간별 정리</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          1세대 1주택을 팔 때 장기보유특별공제를 얼마나 받을 수 있는지 궁금하셨죠? 보유기간과 거주기간에 따라 공제율이 달라지는데, 이 글에서 한눈에 볼 수 있게 정리했어요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          <a href="https://law.go.kr/법령/소득세법/제95조" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">소득세법 제95조</a>에 따른 현행 공제율표와 연도별 변경사항까지 다뤘어요. 장특공의 전체 구조가 궁금하면 <Link href="/w/장기보유특별공제-공제율-계산-거주요건" className="text-blue-600 hover:underline">장기보유특별공제 공제율 계산 거주요건</Link>을 참고해 주세요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '장기보유특별공제 공제율, 거주요건, 절세 전략 총정리',
    },
  },

  toc: [
    { id: 's1', text: '1주택 장특공 공제율은 얼마인가요?' },
    { id: 's2', text: '보유기간별 공제율은 어떻게 되나요?' },
    { id: 's3', text: '거주기간별 공제율은 얼마인가요?' },
    { id: 's4', text: '연도별로 공제율이 달라지나요?' },
    { id: 's5', text: '자주 묻는 질문' },
  ],

  sections: [
    /**
     * ===== S1: 1주택 장특공 공제율 =====
     * 컴포넌트: SpokeTable + FormulaBox
     * 전환 스타일: A. 독자 대변형
     */
    {
      id: 's1',
      number: '01',
      heading: '1주택 장특공 공제율은 얼마인가요?',
      subtitle: '보유기간 공제율 + 거주기간 공제율을 합산해서 최대 80%예요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            1세대 1주택 장기보유특별공제는 보유기간 공제율과 거주기간 공제율을 따로 계산한 뒤 합산하는 구조예요. 보유기간은 3년 이상부터 연 4%씩 최대 40%(10년), 거주기간은 2년 이상부터 연 4%씩 최대 40%(10년)예요. 두 가지를 합치면 최대 80%가 되는 거예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            중요한 건 거주기간이 2년 미만이면 거주 공제율이 아예 0%라는 점이에요. 이 경우 보유기간 공제율만 적용되니까 최대 40%밖에 못 받아요. 그래서 1주택 장특공의 진짜 혜택을 보려면 최소 2년 이상 실거주가 필수예요.
          </p>

          <SpokeTable
            id="rate-full"
            title="1세대 1주택 장기보유특별공제율표"
            subtitle="보유 공제율 + 거주 공제율 합산"
            headers={['보유기간', '보유율', '거주기간', '거주율', '합산']}
            rows={[
              ['3년', '12%', '2년', '8%', '20%'],
              ['4년', '16%', '3년', '12%', '28%'],
              ['5년', '20%', '4년', '16%', '36%'],
              ['6년', '24%', '5년', '20%', '44%'],
              ['7년', '28%', '6년', '24%', '52%'],
              ['8년', '32%', '7년', '28%', '60%'],
              ['9년', '36%', '8년', '32%', '68%'],
              ['10년', '40%', '9년', '36%', '76%'],
              ['10년+', '40%', '10년+', '40%', '80%'],
            ]}
          />

          <FormulaBox lines={[
            { text: '1주택 장특공 공제율 계산 공식', numbered: false, comment: true },
            { text: '보유 공제율 = (보유연수 - 2) x 4%  [3년~10년, 최대 40%]', numbered: true },
            { text: '거주 공제율 = (거주연수 - 1) x 4%  [2년~10년, 최대 40%]', numbered: true },
            { text: '총 공제율 = 보유 공제율 + 거주 공제율  [최대 80%]', numbered: true },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            공제율표를 보면 보유기간과 거주기간이 비슷하게 늘어나야 효과가 극대화되는 게 보이잖아요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '보유기간',
        title: '보유기간별 공제율을 더 자세히 볼까?',
        desc: '보유기간만으로 받을 수 있는 공제율 확인',
        icon: 'clock',
      },
    },

    /**
     * ===== S2: 보유기간별 공제율 =====
     * 컴포넌트: SpokeRateBars + SpokeChecklist
     * 전환 스타일: D. 화제 전환형
     */
    {
      id: 's2',
      number: '02',
      heading: '보유기간별 공제율은 어떻게 되나요?',
      subtitle: '3년부터 시작해서 10년 이상이면 최대 40%예요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            보유기간 공제율은 1주택이든 일반이든 보유기간 3년 이상부터 적용돼요. 다만 1주택은 연 4%씩, 일반은 연 2%씩이라 공제율 상승 속도가 다르죠. 1주택 기준으로 보면 3년에 12%, 5년에 20%, 7년에 28%, 10년에 40%예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            보유기간은 취득일부터 양도일까지를 기준으로 해요. 여기서 취득일은 잔금 지급일과 등기접수일 중 빠른 날이에요. 양도일도 마찬가지로 잔금 수령일과 등기접수일 중 빠른 날이에요. 이 날짜가 공제율에 직접 영향을 미치니까 정확히 파악하는 게 중요해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            2023년부터 보유기간 재기산 제도가 폐지됐어요. 예전에는 다주택에서 1주택이 된 시점부터 보유기간을 다시 세는 불이익이 있었는데, 지금은 실제 취득일부터 쭉 계산해요. 이 덕분에 다주택을 정리한 후 남은 1주택의 장특공 공제율이 더 유리해졌어요.
          </p>

          <SpokeRateBars bars={[
            { label: '10년 이상', rate: '40%', width: '100%' },
            { label: '8년', rate: '32%', width: '80%' },
            { label: '6년', rate: '24%', width: '60%' },
            { label: '5년', rate: '20%', width: '50%' },
            { label: '3년', rate: '12%', width: '30%' },
          ]} />

          <SpokeChecklist items={[
            { text: '보유기간 3년 미만이면 장특공 적용 불가', done: false, note: '최소 요건' },
            { text: '취득일 = 잔금일과 등기일 중 빠른 날', done: true, note: '날짜 기준' },
            { text: '2023년 이후 보유기간 재기산 폐지', done: true, note: '취득일 기준' },
            { text: '1주택 보유 공제율: 연 4% (최대 40%)', done: true, note: '10년' },
            { text: '일반 보유 공제율: 연 2% (최대 30%)', done: true, note: '15년' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            보유기간도 중요하지만, 1주택 장특공에서 진짜 큰 차이를 만드는 건 거주기간 공제율이에요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '거주기간',
        title: '거주기간 공제율은 얼마나 되나?',
        desc: '거주기간별 공제율과 혜택 차이 확인',
        icon: 'info',
      },
    },

    /**
     * ===== S3: 거주기간별 공제율 =====
     * 컴포넌트: SpokeCompareCards + TipBox
     * 전환 스타일: C. 간결 연결형
     */
    {
      id: 's3',
      number: '03',
      heading: '거주기간별 공제율은 얼마인가요?',
      subtitle: '2년 이상 거주부터 연 4%씩, 10년 이상이면 최대 40%예요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            거주기간 공제율은 2년 이상 실거주한 경우부터 적용돼요. 2년에 8%, 3년에 12%, 5년에 20%로 올라가고, 10년 이상이면 최대 40%예요. 보유기간 공제율과 합치면 10년 보유 + 10년 거주 시 80%까지 공제받을 수 있는 거예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            거주기간은 실제로 해당 주택에 거주하면서 주민등록이 되어 있던 기간을 합산해요. 중간에 다른 곳으로 이사했다가 다시 돌아온 경우에도 실거주 기간을 합쳐서 계산할 수 있어요. 다만 주민등록만 옮기고 실거주하지 않으면 거주기간으로 인정받지 못해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            거주기간 유무에 따른 세금 차이는 상당히 커요. 양도차익 5억원, 보유 10년 기준으로 거주 10년이면 공제율 80%(공제액 4억), 거주 0년이면 공제율 40%(공제액 2억)이에요. 같은 집을 파는데 거주 여부만으로 2억원의 공제 차이가 나는 거예요.
          </p>

          <SpokeCompareCards cards={[
            {
              title: '10년 거주 충족',
              subtitle: '보유 10년 + 거주 10년',
              items: ['보유 공제율 40%', '거주 공제율 40%', '합산 80% 공제', '양도차익 5억 기준 → 공제 4억'],
              recommended: true,
              recLabel: '최대 혜택',
            },
            {
              title: '거주 미충족',
              subtitle: '보유 10년 + 거주 0년',
              items: ['보유 공제율 40%', '거주 공제율 0%', '합산 40% 공제', '양도차익 5억 기준 → 공제 2억'],
              recommended: false,
            },
          ]} />

          <TipBox title="거주기간 인정받으려면 전입신고가 필수">
            <p className="mb-0 leading-relaxed">
              실제로 살았더라도 주민등록 전입신고를 하지 않으면 거주기간으로 인정받지 못해요. 전입일부터 전출일까지만 거주기간이에요. 임대 사업자로 등록한 주택은 임차인에게 전입 우선권이 있어서, 소유자가 전입신고를 할 수 없는 경우도 있으니 주의하세요.
            </p>
          </TipBox>

          <p className="text-neutral-600 mb-4 leading-relaxed">
            이제 이 공제율 구조가 연도별로 어떻게 바뀌어 왔는지 정리해 볼게요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '연도별',
        title: '공제율이 예전에도 같았을까?',
        desc: '연도별 제도 변경과 공제율 변화 확인',
        icon: 'clock',
      },
    },

    /**
     * ===== S4: 연도별 공제율 변화 =====
     * 컴포넌트: SpokeTimeline + SpokeFlow
     * 전환 스타일: 없음 (마지막 섹션)
     */
    {
      id: 's4',
      number: '04',
      heading: '연도별로 공제율이 달라지나요?',
      subtitle: '장특공 제도는 여러 차례 개정을 거쳐 현재의 구조가 됐어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            장기보유특별공제 제도는 부동산 시장 상황에 따라 여러 번 개정됐어요. 가장 큰 변화는 2021년 1월부터 시행된 개정이에요. 이전에는 1주택 장특공이 보유기간만으로 최대 80%까지 적용됐는데, 2021년부터 보유기간 40% + 거주기간 40%로 분리됐어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            이 개정으로 실거주 없이 보유만 한 1주택자의 공제율이 크게 줄었어요. 예를 들어 10년 보유만 하고 거주하지 않았다면, 이전에는 80%를 받았지만 지금은 40%만 받아요. 실거주를 유도하기 위한 정책 변화였어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            2023년에는 보유기간 재기산 제도가 폐지되면서 또 한번 변화가 있었어요. 이전에는 다주택에서 1주택이 되면 그 시점부터 보유기간을 다시 세기 시작했는데, 지금은 원래 취득일부터 계산하기 때문에 보유기간이 더 길게 인정돼요.
          </p>

          <SpokeTimeline events={[
            { month: '2009년', title: '장특공 확대', desc: '1주택 장특공 보유기간 기준 최대 80%로 확대', status: 'normal', tag: '확대' },
            { month: '2021년 1월', title: '거주기간 분리', desc: '보유 40% + 거주 40% 분리 계산 체계로 전환', status: 'current', tag: '핵심 개정' },
            { month: '2022년 5월', title: '다주택 중과유예', desc: '다주택자 양도세 중과유예, 일반 장특공 허용', status: 'normal', tag: '유예' },
            { month: '2023년 1월', title: '재기산 폐지', desc: '보유기간 재기산 폐지, 취득일 기준으로 통일', status: 'normal', tag: '폐지' },
            { month: '2026년 5월', title: '중과유예 종료 예정', desc: '유예 연장 여부 미정, 국회 논의 중', status: 'normal', tag: '예정' },
          ]} />

          <SpokeFlow steps={[
            { icon: '1', label: '양도일 확인', sub: '어느 시점 기준인지' },
            { icon: '2', label: '적용 법령 확인', sub: '양도일 기준 법률' },
            { icon: '3', label: '공제율 적용', sub: '해당 시점 공제율표' },
            { icon: '4', label: '세금 계산', sub: '홈택스 자동계산 활용' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            양도소득세는 양도일 기준 법률을 적용하기 때문에, 양도 시점에 어떤 공제율이 적용되는지 확인하는 게 중요해요. 2021년 이전에 취득했더라도 양도일이 2021년 이후면 보유+거주 분리 공제율이 적용돼요. 구체적인 계산 사례는 <Link href="/w/장특공-절세-계산-실전-사례" className="text-blue-600 hover:underline">장특공 절세 계산 실전 사례</Link>에서 확인할 수 있어요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '/w/장기보유특별공제-공제율-계산-거주요건',
        badge: '전체 가이드',
        title: '장특공 공제율부터 절세 전략까지 총정리',
        desc: '거주요건, 고가주택 계산, 다주택 배제까지 한눈에',
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
      question: '보유기간이 9년 11개월인데 10년으로 인정받을 수 있나요?',
      answer: '안 돼요. 보유기간은 만으로 계산해서 정확히 10년이 돼야 40% 공제율이 적용돼요. 한 달만 더 기다렸다가 양도하면 공제율이 36%에서 40%로 올라가니까, 양도 시기 조절을 고려해 보세요.',
    },
    {
      question: '일반 장특공 15년과 1주택 장특공 10년 중 뭐가 더 유리한가요?',
      answer: '1주택 장특공이 훨씬 유리해요. 일반 15년은 최대 30%인 반면, 1주택 10년 보유 + 10년 거주는 80%예요. 공제율 차이가 50%p나 나서, 양도차익이 같다면 세금이 크게 달라져요.',
    },
  ],

  relatedSpokes: [
    { badge: '개념', title: '장특공 뜻 일반공제 1주택 차이', desc: '장기보유특별공제의 기본 개념과 유형 비교', href: '/w/장특공-뜻-일반공제-1주택-차이' },
    { badge: '거주', title: '장특공 거주기간 2년 요건과 계산', desc: '거주기간 계산 방법과 미충족 불이익', href: '/w/장특공-거주기간-2년-요건' },
    { badge: '재기산', title: '보유기간 재기산 폐지 내용', desc: '폐지로 달라진 보유기간 계산법', href: '/w/보유기간-재기산-폐지-내용' },
    { badge: '절세', title: '장특공 절세 계산 실전 사례', desc: '실제 계산으로 확인하는 절세 효과', href: '/w/장특공-절세-계산-실전-사례' },
  ],

  sources: [
    { name: '소득세법 제95조(장기보유특별공제)', url: 'https://law.go.kr/법령/소득세법/제95조', org: '국가법령정보센터' },
    { name: '소득세법 시행령 제159조의4', url: 'https://law.go.kr/법령/소득세법시행령/제159조의4', org: '국가법령정보센터' },
    { name: '양도소득세 관련 법령 해석', url: 'https://taxlaw.nts.go.kr', org: '국세법령정보시스템' },
  ],
}

export default data
