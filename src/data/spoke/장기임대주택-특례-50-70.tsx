import Link from 'next/link'
import type { SpokeData } from './types'
import { SpokeTable, SpokeRateBars, SpokeCompareCards, FormulaBox, SpokeFlow, SpokeChecklist, RateCards, SpokeTimeline } from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '장기임대주택-특례-50-70',

  meta: {
    title: '장기임대주택 장특공 특례 50 70 조건 정리',
    description: '장기임대주택으로 등록하면 장특공 50%나 70%를 받을 수 있다는 거 아시나요? 조건과 공제율을 정리했어요',
    keywords: ['장기임대주택 장특공', '임대주택 특례 50', '임대주택 특례 70', '등록임대 장특공'],
    ogTitle: '장기임대주택 장특공 특례 50% 70% 조건 | 머니위키',
    ogDescription: '장기임대주택 장기보유특별공제 특례, 50%와 70% 조건, 등록 절차를 정리했어요.',
  },

  hub: {
    url: '/w/장기보유특별공제-공제율-계산-거주요건',
    name: '장기보유특별공제 공제율 계산 거주요건',
  },

  breadcrumb: ['세금', '장기보유특별공제 임대주택 특례'],

  hero: {
    badge: '2026년 기준',
    h1: <>장기임대주택 <span className="text-emerald-600">장특공 특례</span> — 50%와 70% 조건 정리</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          다주택자라도 장기임대주택으로 등록하면 장기보유특별공제 <strong>50% 또는 70%</strong>라는 파격적인 특례를 받을 수 있어요. 일반 다주택은 장특공이 배제되는 것과 비교하면 엄청난 혜택이에요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          다만 임대기간, 임대료 인상 제한, 등록 유지 등 까다로운 조건이 있어요. 50%와 70% 특례의 조건 차이부터 신청 방법까지 정리했어요. 장특공 전체 구조는 <Link href="/w/장기보유특별공제-공제율-계산-거주요건" className="text-blue-600 hover:underline">장기보유특별공제 공제율 계산 거주요건</Link>에서 확인하세요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '장기보유특별공제 공제율, 거주요건, 절세 전략 총정리',
    },
  },

  toc: [
    { id: 's1', text: '장기임대주택 장특공 특례란 뭔가요?' },
    { id: 's2', text: '50% 특례 조건은 무엇인가요?' },
    { id: 's3', text: '70% 특례는 어떤 경우에 받나요?' },
    { id: 's4', text: '등록임대 장특공 신청은 어떻게 하나요?' },
    { id: 's5', text: '자주 묻는 질문' },
  ],

  sections: [
    /**
     * ===== S1: 특례 개요 =====
     * 컴포넌트: SpokeTable + SpokeRateBars
     * 전환 스타일: A. 독자 대변형
     */
    {
      id: 's1',
      number: '01',
      heading: '장기임대주택 장특공 특례란 뭔가요?',
      subtitle: '장기 임대 등록 후 의무기간을 채우면 높은 공제율을 받는 제도예요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            장기임대주택 장특공 특례는 <a href="https://law.go.kr/법령/소득세법/제95조" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">소득세법 제95조</a>에서 정한 특별 공제율이에요. 주택을 장기임대사업자로 등록하고 일정 기간 이상 임대하면, 일반 장특공(최대 30%)이나 1주택 장특공(최대 80%)과 별도로 <strong>50% 또는 70%</strong>의 특례 공제율을 적용받을 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            이 특례는 주로 <strong>다주택자</strong>에게 의미가 커요. 다주택이면 일반적으로 장특공이 배제되거나 최대 30%인데, 임대 특례를 적용받으면 50~70%까지 가능하니까요. 주택 임대를 통해 주거 안정에 기여하는 대신 세제 혜택을 주겠다는 정책이에요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            다만 2020년 7월 이후 수도권, 광역시 등에서 단기 민간임대(4년)가 폐지되고 장기 일반 민간임대(10년)만 등록 가능해요. 기존에 등록한 사업자는 의무기간을 유지하면 특례를 받을 수 있어요.
          </p>

          <SpokeTable
            id="overview"
            title="장기임대주택 장특공 특례 요약"
            subtitle="소득세법 제95조 기준"
            headers={['구분', '50% 특례', '70% 특례']}
            rows={[
              ['임대기간', '8년 이상', '10년 이상'],
              ['임대료 인상', '연 5% 이내', '연 5% 이내'],
              ['등록 기관', '지자체 + 세무서', '지자체 + 세무서'],
              ['거주요건', '없음', '없음'],
              ['공제율', '50%', '70%'],
            ]}
          />

          <SpokeRateBars bars={[
            { label: '1주택 최대', rate: '80%', width: '100%' },
            { label: '임대 특례 (10년)', rate: '70%', width: '87%' },
            { label: '임대 특례 (8년)', rate: '50%', width: '62%' },
            { label: '일반 최대', rate: '30%', width: '37%' },
            { label: '중과 시 다주택', rate: '0%', width: '2%' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            특례의 혜택이 크다 보니 조건도 까다로운데, 50% 특례부터 구체적으로 어떤 조건인지 궁금하잖아요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '50% 조건',
        title: '50% 특례를 받으려면 뭘 해야 하나?',
        desc: '8년 임대 의무와 세부 조건 확인',
        icon: 'check',
      },
    },

    /**
     * ===== S2: 50% 특례 조건 =====
     * 컴포넌트: SpokeCompareCards + FormulaBox
     * 전환 스타일: D. 화제 전환형
     */
    {
      id: 's2',
      number: '02',
      heading: '50% 특례 조건은 무엇인가요?',
      subtitle: '8년 이상 임대하고, 임대료 인상을 연 5% 이내로 지켜야 해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            50% 장특공 특례를 받으려면 <strong>8년 이상</strong> 임대사업자로 등록하고 실제로 임대해야 해요. 지자체(구청·시청)와 세무서에 모두 등록해야 하고, 임대기간 동안 임대료(보증금·월세) 인상은 <strong>연 5% 이내</strong>로 제한돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            임대 개시 당시 주택의 기준시가가 수도권 6억원(비수도권 3억원) 이하여야 해요. 이 금액은 공시가격 기준이지 실거래가가 아니에요. 기준시가 충족 여부는 임대 개시 시점으로 판단하니까, 나중에 시가가 올라가도 상관없어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            8년 의무기간을 채우지 못하고 자진 등록 말소하거나 과태료를 내면 특례가 취소돼요. 이 경우 일반 공제율이나 배제 기준으로 다시 계산해서 추가 세금을 내야 할 수 있어요. 의무기간은 반드시 채워야 해요.
          </p>

          <SpokeCompareCards cards={[
            {
              title: '50% 특례 요건',
              subtitle: '8년 임대 기준',
              items: ['임대기간: 8년 이상', '임대료 인상: 연 5% 이내', '기준시가: 수도권 6억/비수도권 3억 이하', '지자체 + 세무서 이중 등록'],
              recommended: false,
            },
            {
              title: '의무 위반 시',
              subtitle: '특례 취소',
              items: ['의무기간 미달 자진 말소', '임대료 5% 초과 인상', '임대사업자 등록 취소', '일반 또는 배제 기준으로 재계산'],
              recommended: false,
            },
          ]} />

          <FormulaBox lines={[
            { text: '50% 특례 적용 공식', numbered: false, comment: true },
            { text: '양도차익 x 50% = 장특공 공제액', numbered: true },
            { text: '(일반 장특공보다 20%p 이상 유리)', numbered: false, comment: true },
            { text: '조건: 8년 임대 + 연 5% 인상 제한 + 기준시가 충족', numbered: true },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            50%도 상당한 혜택이지만, 2년만 더 임대하면 70%까지 받을 수 있는 특례가 있어요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '70% 조건',
        title: '70% 특례는 어떤 조건이 추가되나?',
        desc: '10년 임대 의무와 추가 조건 확인',
        icon: 'info',
      },
    },

    /**
     * ===== S3: 70% 특례 조건 =====
     * 컴포넌트: SpokeFlow + SpokeChecklist
     * 전환 스타일: C. 간결 연결형
     */
    {
      id: 's3',
      number: '03',
      heading: '70% 특례는 어떤 경우에 받나요?',
      subtitle: '10년 이상 임대하면 70%의 장특공 특례를 받을 수 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            70% 장특공 특례는 <strong>10년 이상</strong> 장기 일반 민간임대로 등록하고 의무기간을 모두 채운 경우에 적용돼요. 50% 특례의 모든 조건을 충족하면서 임대기간만 8년에서 10년으로 늘어나는 거예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            70% 공제율은 일반 장특공 최대 30%의 두 배 이상이에요. 다주택자에게는 사실상 1주택 장특공(80%)에 가까운 혜택이에요. 양도차익의 70%를 공제받으니 과세표준이 30%밖에 안 되는 거예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            다만 10년이라는 긴 임대기간 동안 임대료 인상 제한(연 5%)을 지켜야 하고, 임차인이 바뀌더라도 임대사업을 계속 유지해야 해요. 중간에 자진 말소하면 특례가 취소되니까 장기적인 계획이 필요해요.
          </p>

          <SpokeFlow steps={[
            { icon: '1', label: '임대사업자 등록', sub: '지자체 + 세무서' },
            { icon: '2', label: '10년 임대 유지', sub: '임대료 연 5% 이내' },
            { icon: '3', label: '의무기간 완료', sub: '등록 말소 또는 유지' },
            { icon: '4', label: '양도 시 70% 적용', sub: '장특공 특례 공제' },
          ]} />

          <SpokeChecklist items={[
            { text: '지자체(구청)에 임대사업자 등록', done: true, note: '필수' },
            { text: '세무서에 사업자 등록', done: true, note: '필수' },
            { text: '10년 이상 계속 임대', done: true, note: '의무기간' },
            { text: '임대료 인상 연 5% 이내 준수', done: true, note: '매년 확인' },
            { text: '기준시가 요건 충족 (임대 개시 시)', done: true, note: '수도권 6억 이하' },
            { text: '의무기간 중 자진 말소 안 함', done: false, note: '위반 시 특례 취소' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            특례 요건을 알았으니, 실제로 등록하고 신청하는 절차를 정리해 볼게요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '신청 절차',
        title: '등록임대 장특공은 어떻게 신청하나?',
        desc: '등록부터 양도세 신고까지 절차 확인',
        icon: 'grid',
      },
    },

    /**
     * ===== S4: 신청 절차 =====
     * 컴포넌트: RateCards + SpokeTimeline
     * 전환 스타일: 없음 (마지막 섹션)
     */
    {
      id: 's4',
      number: '04',
      heading: '등록임대 장특공 신청은 어떻게 하나요?',
      subtitle: '임대사업자 등록 후 의무기간을 채우고, 양도세 신고 시 적용해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            장기임대주택 장특공 특례는 별도의 '특례 신청'이 있는 게 아니에요. 임대사업자로 등록하고 의무기간을 채운 후, <strong>양도소득세 신고 시 특례 공제율을 적용</strong>해서 신고하면 돼요. 관할 세무서에 양도세 예정신고를 할 때 임대사업자 등록증, 임대차계약서 등을 증빙자료로 제출해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            임대사업자 등록은 두 곳에 해야 해요. 먼저 주택 소재지 관할 <strong>지자체(구청·시청)</strong>에 민간임대주택으로 등록하고, 그 다음 관할 <strong>세무서</strong>에 사업자 등록을 해요. 두 곳 모두 등록해야 세제 혜택을 받을 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            양도세 신고 시에는 홈택스에서 전자신고하거나 세무서에 직접 방문해서 신고할 수 있어요. 특례 적용을 위해 임대 개시일, 임대기간, 임대료 인상 내역 등을 정리해서 제출하면 돼요. 요건 충족 여부를 세무서에서 확인한 뒤 특례 공제율이 확정돼요.
          </p>

          <RateCards cards={[
            { value: '70%', label: '10년 임대', lines: ['장기 일반 민간임대', '최대 혜택'], highlightColor: 'emerald' },
            { value: '50%', label: '8년 임대', lines: ['장기 임대 기본', '충분한 혜택'] },
            { value: '30%', label: '일반 최대', lines: ['미등록 다주택', '15년 보유 기준'] },
            { value: '0%', label: '중과 적용', lines: ['조정지역 다주택', '유예 종료 후'] },
          ]} />

          <SpokeTimeline events={[
            { month: '1단계', title: '지자체 등록', desc: '관할 구청/시청에 민간임대주택 등록' },
            { month: '2단계', title: '세무서 등록', desc: '관할 세무서에 임대사업자 등록' },
            { month: '8~10년', title: '임대 의무기간', desc: '임대료 연 5% 이내 인상, 임대 유지' },
            { month: '양도 시', title: '양도세 신고', desc: '홈택스 또는 세무서에서 특례 적용 신고' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            장기임대주택 특례는 다주택자에게 가장 큰 절세 수단 중 하나예요. 다만 10년이라는 긴 의무기간과 임대료 인상 제한을 감당할 수 있는지 먼저 판단해야 해요. 임대 등록 여부와 관계없이 활용 가능한 절세 전략은 <Link href="/w/장특공-절세-계산-실전-사례" className="text-blue-600 hover:underline">장특공 절세 계산 실전 사례</Link>에서 확인할 수 있어요.
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
      question: '이미 등록한 8년 임대를 10년으로 연장할 수 있나요?',
      answer: '기존 8년 장기 일반 민간임대를 10년으로 연장 등록할 수 있어요. 연장 시 총 임대기간이 10년 이상이 되면 70% 특례를 적용받을 수 있어요. 다만 연장 시점에도 기준시가 등 요건을 충족해야 해요.',
    },
    {
      question: '의무기간 중 임차인이 나가면 어떻게 되나요?',
      answer: '임차인이 바뀌는 건 괜찮아요. 새로운 임차인과 임대차계약을 체결하고 계속 임대하면 돼요. 다만 일정 기간 이상 공실이 지속되면 임대 의무 위반으로 볼 수 있으니, 빠른 시일 내에 새 임차인을 구하는 게 좋아요.',
    },
  ],

  relatedSpokes: [
    { badge: '다주택', title: '다주택 장특공 배제 조건과 예외', desc: '임대 특례 외 다주택 장특공 예외 사유', href: '/w/다주택-장특공-배제-조건-예외' },
    { badge: '공제율', title: '1주택 장특공 공제율표 보유 거주기간별', desc: '1주택 장특공과 임대 특례 비교', href: '/w/1주택-장특공-공제율표-연도별' },
    { badge: '개념', title: '장특공 뜻 일반공제 1주택 차이', desc: '일반, 1주택, 임대 특례의 구분', href: '/w/장특공-뜻-일반공제-1주택-차이' },
    { badge: '절세', title: '장특공 절세 계산 실전 사례', desc: '임대 특례 포함 절세 효과 확인', href: '/w/장특공-절세-계산-실전-사례' },
  ],

  sources: [
    { name: '조세특례제한법 제97조의4(장기일반민간임대주택 장특공)', url: 'https://www.law.go.kr/법령/조세특례제한법/제97조의4', org: '국가법령정보센터' },
    { name: '소득세법 제95조(장기보유특별공제)', url: 'https://law.go.kr/법령/소득세법/제95조', org: '국가법령정보센터' },
    { name: '양도소득세 개요', url: 'https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2312&cntntsId=7711', org: '국세청' },
  ],
}

export default data
