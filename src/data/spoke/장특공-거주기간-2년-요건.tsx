import Link from 'next/link'
import type { SpokeData } from './types'
import { FormulaBox, SpokeRateBars, SpokeWarnBox, SpokeCompareCards, SpokeTable, SpokeFlow, SpokeChecklist, SpokeTimeline } from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '장특공-거주기간-2년-요건',

  meta: {
    title: '장특공 거주기간 2년 요건 계산 | 1세대 1주택 거주 공제율 방법',
    description: '2년 거주를 못 채우면 장특공 공제율이 절반으로 줄어든다는 거 아시나요? 거주기간 계산법과 불이익을 정리했어요',
    keywords: ['장특공 거주기간', '2년 거주요건', '1주택 거주 공제', '장특공 거주 계산'],
    ogTitle: '장특공 거주기간 2년 요건 계산 방법 | 머니위키',
    ogDescription: '장기보유특별공제 거주기간 요건, 계산 방법, 미충족 시 불이익을 정리했어요.',
  },

  hub: {
    url: '/w/장기보유특별공제-공제율-계산-거주요건',
    name: '장기보유특별공제 공제율 계산 거주요건',
  },

  breadcrumb: ['세금', '장기보유특별공제 거주요건'],

  hero: {
    badge: '2026년 기준',
    h1: <>장특공 <span className="text-[#1E3A5F]">거주기간 2년 요건</span> — 계산 방법과 미충족 불이익</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          1세대 1주택 장특공에서 거주기간은 공제율을 결정짓는 핵심 요건이에요. 2년 이상 거주해야만 거주 공제율(최대 40%)이 붙는데, 이걸 못 채우면 같은 10년 보유라도 공제율이 80%에서 40%로 뚝 떨어져요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          거주기간이 어떻게 계산되는지, 합산은 되는지, 미충족이면 정확히 어떤 불이익이 있는지를 다뤘어요. 장특공 전체 구조는 <Link href="/w/장기보유특별공제-공제율-계산-거주요건" className="text-blue-600 hover:underline">장기보유특별공제 공제율 계산 거주요건</Link>에서 확인할 수 있어요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '장기보유특별공제 공제율표와 절세 전략 총정리',
    },
  },

  toc: [
    { id: 's1', text: '장특공 거주기간 요건은 얼마인가요?' },
    { id: 's2', text: '2년 거주를 채우면 뭐가 달라지나요?' },
    { id: 's3', text: '거주기간은 어떻게 계산하나요?' },
    { id: 's4', text: '거주기간 미충족 시 불이익은 뭔가요?' },
    { id: 's5', text: '자주 묻는 질문' },
  ],

  sections: [
    /**
     * ===== S1: 거주기간 요건 =====
     * 컴포넌트: FormulaBox + SpokeRateBars
     * 전환 스타일: A. 독자 대변형
     */
    {
      id: 's1',
      number: '01',
      heading: '장특공 거주기간 요건은 얼마인가요?',
      subtitle: '1세대 1주택 장특공의 거주 공제율은 2년 거주부터 시작돼요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            1세대 1주택 장기보유특별공제에서 거주기간 공제율을 받으려면 해당 주택에 <strong>2년 이상 실제 거주</strong>해야 해요. <a href="https://law.go.kr/법령/소득세법시행령/제159조의4" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">소득세법 시행령 제159조의4</a>에 따르면, 거주기간 2년부터 8%의 공제율이 시작되고 연 4%씩 올라서 10년 이상이면 최대 40%예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            보유기간 공제율(최대 40%)은 거주 여부와 무관하게 보유기간만으로 적용돼요. 하지만 거주기간 공제율은 실거주 기간이 2년 이상이어야만 적용되는 별도 공제예요. 그래서 1주택 장특공의 최대 80% 혜택을 받으려면 보유기간과 거주기간 둘 다 충분히 확보하는 게 필요해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            참고로 이 거주기간 분리 제도는 2021년 1월 1일 이후 양도분부터 적용돼요. 2020년까지 양도한 경우에는 보유기간만으로 최대 80%를 받을 수 있었지만, 지금은 거주기간 없이는 최대 40%가 한계예요.
          </p>

          <FormulaBox lines={[
            { text: '거주 공제율 계산 기준', numbered: false, comment: true },
            { text: '거주 2년: 8%', numbered: true },
            { text: '거주 5년: 20%', numbered: true },
            { text: '거주 10년 이상: 40% (최대)', numbered: true },
            { text: '산식: (거주연수 - 1) x 4%  [2년~10년]', numbered: false },
          ]} />

          <SpokeRateBars bars={[
            { label: '거주 10년', rate: '40%', width: '100%' },
            { label: '거주 7년', rate: '28%', width: '70%' },
            { label: '거주 5년', rate: '20%', width: '50%' },
            { label: '거주 2년', rate: '8%', width: '20%' },
            { label: '거주 0년', rate: '0%', width: '2%' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            공제율을 봤으니 이제 2년 거주를 채우면 실제로 세금이 얼마나 달라지는지 궁금하잖아요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '혜택 비교',
        title: '2년 거주로 세금이 얼마나 줄어들까?',
        desc: '거주 충족과 미충족의 세금 차이 확인',
        icon: 'calc',
      },
    },

    /**
     * ===== S2: 2년 거주의 차이 =====
     * 컴포넌트: SpokeWarnBox + SpokeCompareCards
     * 전환 스타일: D. 화제 전환형
     */
    {
      id: 's2',
      number: '02',
      heading: '2년 거주를 채우면 뭐가 달라지나요?',
      subtitle: '거주 2년은 비과세와 장특공 거주 공제율의 기본 요건이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            2년 거주가 중요한 이유는 두 가지예요. 첫째, 1세대 1주택 <strong>비과세</strong>(양도가액 12억까지)를 받으려면 조정대상지역 주택은 2년 이상 거주가 필수예요. 비조정대상지역은 2년 보유만으로 비과세가 되지만, 조정대상지역은 거주 없이는 비과세 자체가 안 돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            둘째, 장특공 <strong>거주 공제율</strong>(최대 40%)의 시작점이 2년이에요. 거주 2년을 채우면 8% 공제가 시작되고, 이후 매년 4%씩 올라요. 2년을 못 채우면 보유 공제율만 적용되니까 같은 10년 보유라도 공제율이 80% vs 40%로 갈려요.
          </p>

          <SpokeWarnBox title="주의사항">
            <p className="mb-0 leading-relaxed">
              조정대상지역 1주택인데 거주 2년을 못 채우면 비과세도 안 되고, 장특공 거주 공제율도 0%예요. 양도차익 전체가 과세 대상이 되면서 보유 공제율만 적용돼요. 비과세와 거주 공제율을 동시에 놓치는 최악의 상황이 될 수 있으니 양도 전 반드시 거주기간을 확인하세요.
            </p>
          </SpokeWarnBox>

          <p className="text-neutral-600 mb-4 leading-relaxed">
            구체적으로 숫자를 비교해 볼게요. 양도차익이 4억원인 1주택을 10년 보유했을 때, 거주기간에 따른 세금 차이예요.
          </p>

          <SpokeCompareCards cards={[
            {
              title: '10년 거주 충족',
              subtitle: '보유 10년 + 거주 10년',
              items: ['공제율: 보유 40% + 거주 40% = 80%', '공제액: 4억 x 80% = 3.2억', '과세표준: 약 0.8억', '양도세: 약 1,600만원대'],
              recommended: true,
              recLabel: '절세 극대화',
            },
            {
              title: '거주 미충족',
              subtitle: '보유 10년 + 거주 0년',
              items: ['공제율: 보유 40% + 거주 0% = 40%', '공제액: 4억 x 40% = 1.6억', '과세표준: 약 2.4억', '양도세: 약 6,400만원대'],
              recommended: false,
            },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            그런데 거주기간이 정확히 어떻게 계산되는지는 알아둬야 할 세부사항이 있어요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '계산법',
        title: '거주기간, 정확히 어떻게 세는 거야?',
        desc: '거주기간 합산, 전입신고, 예외 사항 확인',
        icon: 'info',
      },
    },

    /**
     * ===== S3: 거주기간 계산 방법 =====
     * 컴포넌트: SpokeTable + SpokeFlow
     * 전환 스타일: C. 간결 연결형
     */
    {
      id: 's3',
      number: '03',
      heading: '거주기간은 어떻게 계산하나요?',
      subtitle: '주민등록 전입일부터 전출일까지를 합산해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            거주기간은 해당 주택에 <strong>주민등록이 되어 있으면서 실제 거주한 기간</strong>을 기준으로 해요. 전입일부터 전출일까지가 하나의 거주 구간이 되고, 여러 번 전입·전출을 반복한 경우에는 실거주 기간을 합산할 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            예를 들어 2016년에 3년 거주하고, 2020년에 다시 돌아와서 2년 거주했다면 총 거주기간은 5년이에요. 합산할 때는 각 구간의 거주 기간을 더하면 돼요. 다만 주민등록만 옮기고 실제로는 다른 곳에서 산 경우, 세무서에서 거주 사실을 부인할 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            거주 사실 확인은 전기·수도·가스 사용량, 건강보험 가입지 정보, 자녀 학교 재학 증명 등으로 판단해요. 위장 전입이 적발되면 거주기간 불인정은 물론이고 가산세까지 부과될 수 있으니 실거주가 원칙이에요.
          </p>

          <SpokeTable
            id="calc-example"
            title="거주기간 합산 계산 예시"
            subtitle="주민등록 기준, 실거주 기간 합산"
            headers={['구간', '전입일', '전출일', '거주기간']}
            rows={[
              ['1차 거주', '2016.03.15', '2019.03.14', '3년'],
              ['2차 거주', '2020.06.01', '2022.05.31', '2년'],
              ['합산', '', '', '총 5년'],
            ]}
          />

          <SpokeFlow steps={[
            { icon: '1', label: '전입신고', sub: '주민등록 이전' },
            { icon: '2', label: '실거주', sub: '해당 주택에서 생활' },
            { icon: '3', label: '전출 시 기간 산정', sub: '전입일~전출일' },
            { icon: '4', label: '합산', sub: '여러 구간 합산 가능' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            거주기간 계산을 알았으니, 미충족하면 구체적으로 어떤 불이익이 있는지 짚어볼게요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '불이익',
        title: '거주 요건 못 채우면 정확히 뭘 잃게 되나?',
        desc: '미충족 시 비과세, 공제율, 세금 영향 확인',
        icon: 'info',
      },
    },

    /**
     * ===== S4: 미충족 불이익 =====
     * 컴포넌트: SpokeChecklist + SpokeTimeline
     * 전환 스타일: 없음 (마지막 섹션)
     */
    {
      id: 's4',
      number: '04',
      heading: '거주기간 미충족 시 불이익은 뭔가요?',
      subtitle: '비과세 불가 + 거주 공제율 0%로 세금 부담이 크게 늘어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            거주기간 2년을 못 채우면 발생하는 불이익은 두 가지예요. 첫째, 조정대상지역 주택이라면 <strong>1세대 1주택 비과세 자체가 적용되지 않아요</strong>. 양도가액 12억까지 비과세되는 혜택을 통째로 놓치는 거예요. 양도차익 전체가 과세 대상이 돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            둘째, 장특공의 <strong>거주 공제율(최대 40%)이 아예 0%</strong>가 돼요. 보유기간 공제율만 적용되니까 10년 보유했어도 40%가 한계예요. 거주 10년을 채웠다면 80%인데, 거주 0년이면 40%니까 공제율이 절반이에요. 양도차익이 클수록 세금 차이가 수천만원에서 수억원까지 벌어질 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            다만 비조정대상지역 주택은 거주 없이 2년 보유만으로 비과세가 가능해요. 하지만 장특공 거주 공제율은 조정·비조정 관계없이 실거주 기간을 기준으로 하기 때문에, 비조정지역이라도 거주하지 않으면 거주 공제율은 0%예요.
          </p>

          <SpokeChecklist items={[
            { text: '조정대상지역: 2년 거주 못 채우면 비과세 불가', done: false, note: '12억 비과세 상실' },
            { text: '비조정대상지역: 2년 보유만으로 비과세는 가능', done: true, note: '비과세는 OK' },
            { text: '거주 공제율: 2년 미만이면 0% (조정·비조정 동일)', done: false, note: '40% 상실' },
            { text: '보유 공제율: 거주 무관하게 보유기간으로 적용', done: true, note: '최대 40%' },
            { text: '거주기간은 양도 전까지 채울 수 있음', done: true, note: '전략적 거주 가능' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            양도를 계획하고 있는데 거주기간이 부족하다면, 양도 시기를 늦춰서 2년을 채우는 것도 전략이에요. 아래 타임라인처럼 거주기간을 계획적으로 확보하는 게 절세의 핵심이에요.
          </p>

          <SpokeTimeline events={[
            { month: '양도 2년 전', title: '전입신고', desc: '해당 주택으로 주민등록 이전, 실거주 시작', status: 'normal', tag: '전입' },
            { month: '거주 중', title: '실거주 유지', desc: '전기·수도·가스 사용, 자녀 학교 등 거주 증거 확보', status: 'current', tag: '거주' },
            { month: '2년 후', title: '거주요건 충족', desc: '비과세 + 거주 공제율 적용 가능', status: 'normal', tag: '충족' },
            { month: '양도일', title: '양도 실행', desc: '보유 공제율 + 거주 공제율 합산 적용', status: 'normal', tag: '양도' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            거주기간은 양도세에서 가장 큰 영향을 미치는 변수 중 하나예요. 양도 전에 반드시 거주기간을 확인하고, 부족하다면 양도 시기를 조절하는 게 현명한 절세 전략이에요. 구체적인 절세 사례는 <Link href="/w/장특공-절세-계산-실전-사례" className="text-blue-600 hover:underline">장특공 절세 계산 실전 사례</Link>에서 확인해 보세요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '/w/장기보유특별공제-공제율-계산-거주요건',
        badge: '전체 가이드',
        title: '장특공 공제율부터 다주택 배제까지 한눈에',
        desc: '장기보유특별공제 전체 가이드 보기',
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
      question: '해외 체류 기간도 거주기간에서 빠지나요?',
      answer: '주민등록이 유지되어 있고 일시적 해외 출장·여행 수준이면 거주기간에서 빠지지 않아요. 하지만 1년 이상 장기 해외 체류로 비거주자가 되면 해당 기간은 거주기간에서 제외될 수 있어요.',
    },
    {
      question: '세입자가 살고 있으면 거주기간이 인정되지 않나요?',
      answer: '맞아요. 세입자에게 임대한 기간은 소유자의 거주기간으로 인정되지 않아요. 전세·월세를 주고 있는 동안은 거주기간이 쌓이지 않으니, 양도 전에 거주 계획을 세울 때 이 점을 고려해야 해요.',
    },
  ],

  relatedSpokes: [
    { badge: '공제율', title: '1주택 장특공 공제율표 보유 거주기간별', desc: '보유·거주 공제율을 표로 한눈에', href: '/w/1주택-장특공-공제율표-연도별' },
    { badge: '고가주택', title: '고가주택 12억 초과 장특공 계산', desc: '12억 넘는 주택의 장특공 안분계산', href: '/w/고가주택-12억-초과-장특공-계산' },
    { badge: '다주택', title: '다주택 장특공 배제 조건과 예외', desc: '다주택자 장특공 배제와 중과유예', href: '/w/다주택-장특공-배제-조건-예외' },
    { badge: '절세', title: '장특공 절세 계산 실전 사례', desc: '거주기간 활용한 절세 효과 확인', href: '/w/장특공-절세-계산-실전-사례' },
  ],

  sources: [
    { name: '소득세법 시행령 제159조의4(1세대 1주택 장특공)', url: 'https://law.go.kr/법령/소득세법시행령/제159조의4', org: '국가법령정보센터' },
    { name: '소득세법 제89조(비과세 양도소득)', url: 'https://law.go.kr/법령/소득세법/제89조', org: '국가법령정보센터' },
    { name: '양도소득세 개요', url: 'https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2312&cntntsId=7711', org: '국세청' },
  ],
}

export default data
