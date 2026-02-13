import Link from 'next/link'
import type { SpokeData } from './types'
import { SpokeWarnBox, SpokeTable, SpokeCompareCards, FormulaBox, SpokeRateBars, SpokeChecklist, SpokeTimeline, RateCards } from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '다주택-장특공-배제-조건-예외',

  meta: {
    title: '다주택 장특공 배제 조건 예외 | 중과유예 기간 적용 가능 주택 기준',
    description: '다주택자는 장특공을 못 받는다고 들었는데 예외가 있다는 거 아시나요? 배제 조건과 중과유예 기간 혜택을 정리했어요',
    keywords: ['다주택 장특공 배제', '장특공 배제 조건', '다주택 장특공 예외', '중과 배제 장특공'],
    ogTitle: '다주택 장특공 배제 조건 예외 중과유예 | 머니위키',
    ogDescription: '다주택자 장기보유특별공제 배제 조건, 예외 사유, 중과유예 기간 혜택을 정리했어요.',
  },

  hub: {
    url: '/w/장기보유특별공제-공제율-계산-거주요건',
    name: '장기보유특별공제 공제율 계산 거주요건',
  },

  breadcrumb: ['세금', '장기보유특별공제 다주택 배제'],

  hero: {
    badge: '2026년 기준',
    h1: <>다주택 <span className="text-[#1E3A5F]">장특공 배제</span> — 조건과 예외 중과유예 정리</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          다주택자는 장기보유특별공제를 못 받는다는 이야기를 많이 들어보셨을 거예요. 원칙적으로는 맞지만, <strong>중과유예 기간</strong>이나 <strong>비조정대상지역</strong> 주택 등 예외가 꽤 있어요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          정확히 어떤 경우에 배제되고, 어떤 경우에 예외가 되는지를 정리했어요. 장특공 전체 구조는 <Link href="/w/장기보유특별공제-공제율-계산-거주요건" className="text-blue-600 hover:underline">장기보유특별공제 공제율 계산 거주요건</Link>에서 확인할 수 있어요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '장기보유특별공제 공제율, 거주요건, 절세 전략 총정리',
    },
  },

  toc: [
    { id: 's1', text: '다주택자는 장특공을 못 받나요?' },
    { id: 's2', text: '장특공 배제 조건은 무엇인가요?' },
    { id: 's3', text: '배제 예외가 되는 경우는 뭔가요?' },
    { id: 's4', text: '중과유예 기간에는 장특공이 되나요?' },
    { id: 's5', text: '자주 묻는 질문' },
  ],

  sections: [
    /**
     * ===== S1: 다주택자 장특공 =====
     * 컴포넌트: SpokeWarnBox + SpokeTable
     * 전환 스타일: A. 독자 대변형
     */
    {
      id: 's1',
      number: '01',
      heading: '다주택자는 장특공을 못 받나요?',
      subtitle: '조정대상지역 다주택자는 중과 시 장특공이 배제돼요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            원칙적으로 <strong>조정대상지역에 있는 주택을 양도하는 다주택자</strong>는 양도소득세 중과와 함께 장기보유특별공제가 배제돼요. <a href="https://law.go.kr/법령/소득세법/제95조" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">소득세법 제95조</a>에서 중과세율이 적용되는 경우 장특공을 적용하지 않는다고 규정하고 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            다만 이건 '중과세율이 적용될 때'의 이야기예요. 현재 다주택자 양도세 중과가 유예되고 있어서(2022.5~2026.5), 이 기간에 양도하면 기본세율이 적용되고 일반 장특공(최대 30%)도 받을 수 있어요. 상황에 따라 장특공을 받을 수도 있고 못 받을 수도 있는 거예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            비조정대상지역의 주택이라면 다주택이라도 중과 자체가 적용되지 않아요. 그래서 기본세율 + 일반 장특공(최대 30%)이 가능해요. 다만 1주택 장특공(최대 80%)은 1세대 1주택이 아니면 어떤 경우에도 적용되지 않아요.
          </p>

          <SpokeWarnBox title="주의사항">
            <p className="mb-0 leading-relaxed">
              장특공 배제는 '중과세율이 적용되는 경우'에 한정돼요. 중과유예 기간이거나 비조정대상지역이면 중과가 아니니까 장특공을 받을 수 있어요. 핵심은 <strong>내 양도 건에 중과세율이 적용되는지 아닌지</strong>를 먼저 판단하는 거예요.
            </p>
          </SpokeWarnBox>

          <SpokeTable
            id="multi-summary"
            title="다주택자 장특공 적용 여부 요약"
            subtitle="조정대상지역 여부 + 중과유예 여부에 따라 달라요"
            headers={['상황', '세율', '장특공']}
            rows={[
              ['조정지역 + 중과 적용', '기본 + 20~30%p', '배제 (0%)'],
              ['조정지역 + 중과유예', '기본세율', '일반 장특공 (최대 30%)'],
              ['비조정지역', '기본세율', '일반 장특공 (최대 30%)'],
              ['1세대 1주택', '기본세율', '1주택 장특공 (최대 80%)'],
            ]}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            어떤 경우에 중과가 적용되는지 구체적인 배제 조건을 알아야 본인 상황을 판단할 수 있잖아요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '배제 조건',
        title: '정확히 어떤 조건일 때 배제되나?',
        desc: '장특공 배제가 적용되는 구체적 조건 확인',
        icon: 'info',
      },
    },

    /**
     * ===== S2: 배제 조건 =====
     * 컴포넌트: SpokeCompareCards + FormulaBox
     * 전환 스타일: D. 화제 전환형
     */
    {
      id: 's2',
      number: '02',
      heading: '장특공 배제 조건은 무엇인가요?',
      subtitle: '중과세율이 적용되는 경우와 미등기 양도가 해당돼요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            장기보유특별공제가 배제되는 경우는 크게 두 가지예요. 첫째, <strong>양도소득세 중과세율이 적용되는 경우</strong>예요. 조정대상지역에서 2주택자가 양도하면 기본세율 + 20%p, 3주택 이상은 + 30%p가 중과되면서 장특공도 배제돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            둘째, <strong>미등기 양도 자산</strong>이에요. 취득 후 등기를 하지 않고 양도하는 경우에는 70%의 단일세율이 적용되면서 장특공이 배제돼요. 미등기 양도는 사실상 투기로 간주되기 때문이에요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            주의할 점은 '다주택'의 기준이에요. 주택 수는 세대 전체를 기준으로 판단해요. 본인 명의 1채 + 배우자 명의 1채면 세대 기준 2주택이에요. 다만 주택으로 보지 않는 것(주택 부수토지 없는 소형주택 등)도 있으니 정확한 주택 수 판단이 중요해요.
          </p>

          <SpokeCompareCards cards={[
            {
              title: '장특공 배제',
              subtitle: '적용 불가',
              items: ['조정대상지역 2주택 이상 (중과 시)', '미등기 양도 자산', '중과세율 적용 시 자동 배제', '공제율 0%'],
              recommended: false,
            },
            {
              title: '장특공 적용',
              subtitle: '일반 또는 1주택 공제',
              items: ['비조정대상지역 다주택', '중과유예 기간 내 양도', '1세대 1주택', '조건 충족 시 30~80%'],
              recommended: true,
              recLabel: '확인 필요',
            },
          ]} />

          <FormulaBox lines={[
            { text: '장특공 배제 판단 흐름', numbered: false, comment: true },
            { text: '중과세율 적용 → 장특공 배제 (0%)', numbered: true },
            { text: '기본세율 적용 + 다주택 → 일반 장특공 가능 (최대 30%)', numbered: true },
            { text: '1세대 1주택 → 1주택 장특공 가능 (최대 80%)', numbered: true },
            { text: '미등기 양도 → 장특공 배제 (0%)', numbered: true },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            그런데 다주택이라도 배제에서 예외가 되는 경우가 몇 가지 있어요. 이 예외 사항을 아는 게 절세의 열쇠예요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '예외',
        title: '배제 예외가 되는 경우는 뭐가 있지?',
        desc: '일시적 2주택, 상속주택 등 예외 사유 확인',
        icon: 'check',
      },
    },

    /**
     * ===== S3: 배제 예외 =====
     * 컴포넌트: SpokeRateBars + SpokeChecklist
     * 전환 스타일: C. 간결 연결형
     */
    {
      id: 's3',
      number: '03',
      heading: '배제 예외가 되는 경우는 뭔가요?',
      subtitle: '일시적 2주택, 상속주택 등은 1주택으로 인정받을 수 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            다주택이라도 특정 요건을 갖추면 1세대 1주택으로 인정받아서 비과세나 1주택 장특공을 적용받을 수 있어요. 대표적인 예외가 <strong>일시적 2주택</strong>이에요. 새 집을 사고 기존 집을 일정 기간 안에 처분하면 1주택으로 봐요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            <strong>상속주택</strong>도 예외예요. 상속받은 주택이 있어도 일반주택을 양도할 때는 1주택으로 취급해 줘요. 다만 상속주택이 조정대상지역에 있고 상속 후 5년이 지나면 일반 2주택 취급이 될 수 있으니 기간 요건을 확인해야 해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            그 외에도 <strong>혼인 합가</strong>(결혼으로 2주택), <strong>부모 봉양 합가</strong>(60세 이상 부모와 합가), <strong>농어촌 주택</strong> 등의 예외가 있어요. 각 예외마다 처분 기한이나 추가 조건이 다르니까 본인 상황에 맞는 예외를 정확히 확인하는 게 중요해요.
          </p>

          <SpokeRateBars bars={[
            { label: '일시적 2주택 (처분 시)', rate: '최대 80%', width: '100%' },
            { label: '상속주택 (일반주택 양도 시)', rate: '최대 80%', width: '100%' },
            { label: '혼인 합가 (5년 내 처분)', rate: '최대 80%', width: '100%' },
            { label: '비조정지역 다주택', rate: '최대 30%', width: '37%' },
            { label: '중과 적용 다주택', rate: '0%', width: '2%' },
          ]} />

          <SpokeChecklist items={[
            { text: '일시적 2주택: 신규 취득 후 3년 내 종전주택 양도', done: true, note: '조정지역 2년 내' },
            { text: '상속주택: 상속 후 일반주택 양도 시 1주택 간주', done: true, note: '기간 제한 확인' },
            { text: '혼인 합가: 혼인일 5년 내 1채 처분', done: true, note: '5년 기한' },
            { text: '부모 봉양: 60세 이상 부모 합가 후 10년 내 처분', done: true, note: '10년 기한' },
            { text: '농어촌 주택: 수도권 밖 읍·면 소재 주택', done: true, note: '요건 확인 필요' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            예외 사유를 확인했으니, 지금 진행 중인 중과유예 제도에 대해서도 정리해 볼게요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '중과유예',
        title: '중과유예 기간, 정확히 언제까지인지 알고 싶다면',
        desc: '중과유예 기간과 장특공 적용 조건 확인',
        icon: 'clock',
      },
    },

    /**
     * ===== S4: 중과유예 기간 =====
     * 컴포넌트: SpokeTimeline + RateCards
     * 전환 스타일: 없음 (마지막 섹션)
     */
    {
      id: 's4',
      number: '04',
      heading: '중과유예 기간에는 장특공이 되나요?',
      subtitle: '2022년 5월~2026년 5월 유예 기간에는 일반 장특공이 가능해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            정부는 2022년 5월 10일부터 다주택자 양도세 중과를 <strong>한시적으로 유예</strong>하고 있어요. 현재 유예 기한은 2026년 5월 9일까지예요. 이 기간에 양도하면 중과세율 대신 기본세율이 적용되고, <strong>일반 장기보유특별공제(최대 30%)</strong>도 받을 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            다만 이건 '일반 장특공'이에요. 1주택 장특공(최대 80%)은 1세대 1주택만 가능하니까, 다주택자가 중과유예 기간에 받을 수 있는 최대 공제율은 30%(15년 보유)예요. 그래도 중과 시 0%와 비교하면 상당한 혜택이에요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            중과유예가 2026년 5월 이후에도 연장될지는 아직 미정이에요. 국회에서 논의 중이지만 확정된 건 없어요. 다주택자라면 유예 기간 내에 양도를 검토하는 게 안전해요. 유예가 종료되면 중과세율 + 장특공 배제가 다시 적용되니까요.
          </p>

          <SpokeTimeline events={[
            { month: '2018년 4월', title: '다주택 중과 시행', desc: '2주택 +10%p, 3주택 +20%p 중과 시작', status: 'normal', tag: '시행' },
            { month: '2021년 6월', title: '중과세율 인상', desc: '2주택 +20%p, 3주택 +30%p로 인상', status: 'normal', tag: '인상' },
            { month: '2022년 5월', title: '중과유예 시작', desc: '기본세율 + 일반 장특공 적용', status: 'current', tag: '유예' },
            { month: '2026년 5월', title: '유예 종료 예정', desc: '연장 여부 미정, 국회 논의 중', status: 'normal', tag: '종료 예정' },
          ]} />

          <RateCards cards={[
            { value: '30%', label: '유예 기간 최대', lines: ['일반 장특공 적용', '15년 보유 기준'], highlightColor: 'navy' },
            { value: '0%', label: '중과 적용 시', lines: ['장특공 배제', '중과세율까지 적용'] },
            { value: '80%', label: '참고: 1주택', lines: ['1세대 1주택 전용', '다주택은 해당 없음'] },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            다주택자라면 중과유예 종료 전에 양도 여부를 결정하는 게 유리할 수 있어요. 유예 기간의 일반 장특공 30%와 유예 종료 후의 0%는 양도차익이 클수록 수천만원 이상의 세금 차이를 만들어요. 구체적인 계산 사례는 <Link href="/w/장특공-절세-계산-실전-사례" className="text-blue-600 hover:underline">장특공 절세 계산 실전 사례</Link>에서 확인해 보세요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '/w/장기보유특별공제-공제율-계산-거주요건',
        badge: '전체 가이드',
        title: '장특공 전체 구조를 한눈에 보고 싶다면',
        desc: '공제율, 거주요건, 고가주택까지 총정리',
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
      question: '일시적 2주택으로 장특공 80%를 받으려면 어떻게 해야 하나요?',
      answer: '신규 주택 취득 후 일정 기간 내(비조정 3년, 조정 2년)에 종전 주택을 양도하면 1세대 1주택으로 인정돼요. 종전 주택에서 2년 이상 거주했다면 1주택 장특공(최대 80%)을 적용받을 수 있어요.',
    },
    {
      question: '중과유예 기간이 끝나면 바로 중과가 적용되나요?',
      answer: '유예 기간이 종료되면 원칙적으로 중과세율 + 장특공 배제가 다시 적용돼요. 다만 국회에서 추가 연장을 결정할 수 있으니, 2026년 초에 연장 여부를 확인하는 게 좋아요.',
    },
  ],

  relatedSpokes: [
    { badge: '개념', title: '장특공 뜻 일반공제 1주택 차이', desc: '일반 장특공과 1주택 장특공의 차이', href: '/w/장특공-뜻-일반공제-1주택-차이' },
    { badge: '임대특례', title: '장기임대주택 장특공 특례 50% 70%', desc: '등록임대로 받는 특례 공제율', href: '/w/장기임대주택-특례-50-70' },
    { badge: '재기산', title: '보유기간 재기산 폐지 내용', desc: '다주택 정리 후 보유기간 계산법', href: '/w/보유기간-재기산-폐지-내용' },
    { badge: '절세', title: '장특공 절세 계산 실전 사례', desc: '다주택 양도 시 절세 효과 확인', href: '/w/장특공-절세-계산-실전-사례' },
  ],

  sources: [
    { name: '소득세법 제95조(장기보유특별공제)', url: 'https://law.go.kr/법령/소득세법/제95조', org: '국가법령정보센터' },
    { name: '소득세법 제104조(세율)', url: 'https://law.go.kr/법령/소득세법/제104조', org: '국가법령정보센터' },
    { name: '양도소득세 중과유예 안내', url: 'https://www.nts.go.kr', org: '국세청' },
  ],
}

export default data
