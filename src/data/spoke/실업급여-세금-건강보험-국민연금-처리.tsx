import type { SpokeData } from '@/data/spoke/types'
import {
  SpokeTable,
  FormulaBox,
  TipBox,
  SpokeCompareCards,
  SpokeFlow,
  SpokeChecklist,
  SpokeWarnBox,
  SpokeStepCards,
} from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '실업급여-세금-건강보험-국민연금-처리',

  meta: {
    title: '실업급여 세금 비과세 건강보험 국민연금 처리 | 4대보험 납부 방법',
    description: '실업급여는 소득세 0원 비과세예요. 건강보험 임의계속가입과 국민연금 실업크레딧 신청 방법을 정리했어요.',
    keywords: [
      '실업급여 세금 과세 비과세',
      '실업급여 건강보험료 납부 방법',
      '실업급여 국민연금 납부 유예',
      '실업급여 수급 중 4대보험 처리',
    ],
    ogTitle: '실업급여 세금 비과세 건강보험 국민연금 처리 | 머니위키',
    ogDescription: '실업급여 비과세, 건강보험료 줄이는 법, 국민연금 실업크레딧까지.',
  },

  hub: {
    url: '/w/실업급여-수급-조건-신청-방법-2026',
    name: '실업급여 수급 조건 신청 방법 2026',
  },

  breadcrumb: ['고용·노동', '실업급여', '세금·4대보험'],

  summary3: [
    <>실업급여(구직급여)는 <strong>비과세 소득</strong>이라서 소득세 0원, 연말정산에도 포함 안 돼요</>,
    <>퇴직 후 건강보험은 <strong>임의계속가입</strong>(최대 36개월)이나 피부양자 등록으로 보험료를 줄일 수 있어요</>,
    <>국민연금 <strong>실업크레딧</strong>을 신청하면 보험료의 75%를 국가가 지원해요 (최대 12개월)</>,
  ],

  sourceBar: {
    badge: '출처',
    name: '소득세법 제12조 · 고용보험법',
    date: '2026.02',
  },

  prevNext: {
    prev: { title: '실업급여 지급일 첫 입금일 대기기간', href: '/w/실업급여-지급일-첫-입금일-대기기간' },
    next: { title: '실업급여 고용센터 찾기 고용24 사용법', href: '/w/실업급여-고용센터-찾기-고용24-사용법' },
  },

  stickyBar: {
    topLabel: '실업급여 세금',
    value: '비과세 0원',
    buttonText: '4대보험 처리 보기',
    scrollTo: '#s4',
  },

  hero: {
    badge: '2026년 기준',
    h1: (
      <>
        <span className="text-[#1E3A5F]">실업급여 세금</span> 건강보험 국민연금 처리
      </>
    ),
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          퇴직하고 실업급여를 받으면 세금은 어떻게 되는지, 건강보험료는 얼마나 나오는지 걱정되셨다면 잘 오셨어요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          <strong className="text-neutral-800">실업급여는 비과세 소득</strong>이라서 소득세가 0원이에요. <a href="https://www.law.go.kr/법령/소득세법" target="_blank" rel="noopener noreferrer" className="text-[#4A7AB5] underline">소득세법 제12조</a>에서 고용보험법에 따른 실업급여를 비과세로 정하고 있어요. 건강보험료는 <strong className="text-neutral-800">임의계속가입</strong>으로 최대 36개월 직장 시절 보험료를 유지할 수 있고, 국민연금은 <strong className="text-neutral-800">실업크레딧</strong>으로 75%를 국가가 지원해요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          먼저 실업급여가 왜 비과세인지부터 볼게요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '실업급여',
      desc: '실업급여 수급 조건·신청 방법·금액 전체 보기',
    },
  },

  toc: [
    { id: 's1', label: '실업급여 세금은 비과세인가요?' },
    { id: 's2', label: '실업급여 건강보험료는 어떻게 납부하나요?' },
    { id: 's3', label: '실업급여 국민연금은 납부 유예되나요?' },
    { id: 's4', label: '실업급여 수급 중 4대보험은 어떻게 처리하나요?' },
    { id: 's-faq', label: '자주 묻는 질문' },
  ],

  sections: [
    /* ── S1: 실업급여 비과세 ── */
    {
      id: 's1',
      number: '01',
      heading: '실업급여 세금은 비과세인가요?',
      subtitle: '소득세법 제12조에 따라 소득세 0원이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            실업급여(구직급여)는 <strong>비과세 소득</strong>이에요. 소득세법 제12조에서 고용보험법에 따라 받는 실업급여를 비과세 소득으로 명시하고 있어요. 매달 150만원을 받아도 소득세가 한 푼도 빠지지 않아요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            연말정산이나 종합소득세 신고에도 포함하지 않아요. <a href="https://www.nts.go.kr" target="_blank" rel="noopener noreferrer" className="text-[#4A7AB5] underline">국세청</a> 홈택스에서도 실업급여는 소득으로 조회되지 않아요. 원천징수도 없고, 지방소득세도 없어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            다만 실업급여를 받다가 중간에 재취업해서 근로소득이 생기면, 그 근로소득에 대해서만 연말정산을 하면 돼요. 실업급여 기간은 빼고 계산해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            다른 소득과 어떻게 다른지 비교표로 정리했어요.
          </p>

          <SpokeTable
            id="tbl-tax"
            title="소득 유형별 세금 처리 비교"
            subtitle="2026년 기준"
            headers={['소득 유형', '과세 여부', '세금', '연말정산']}
            rows={[
              ['실업급여(구직급여)', '비과세', '0원', '신고 불필요'],
              ['근로소득', '과세', '원천징수', '연말정산 대상'],
              ['사업소득', '과세', '종합소득세', '종합소득세 신고'],
              ['퇴직소득', '과세', '퇴직소득세', '분리과세'],
            ]}
            highlightCol={0}
          />

          <TipBox title="퇴직금과 실업급여는 세금이 달라요">
            <p>퇴직금은 퇴직소득세가 원천징수돼요. 하지만 실업급여는 비과세라서 세금이 전혀 없어요. <a href="/w/실업급여-금액-계산-연봉별-수령액" className="text-[#4A7AB5] hover:underline">실업급여 금액 계산</a>이 궁금하다면 따로 정리해뒀어요.</p>
          </TipBox>

          <p className="text-neutral-600 mb-0">
            세금은 걱정 없는데, 건강보험료가 갑자기 많이 나올까 봐 불안하잖아요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '건강보험',
        title: '건강보험료는 얼마나 나오나요?',
        desc: '임의계속가입으로 보험료를 줄이는 방법이 있어요',
        icon: 'calc',
      },
    },

    /* ── S2: 건강보험 ── */
    {
      id: 's2',
      number: '02',
      heading: '실업급여 건강보험료는 어떻게 납부하나요?',
      subtitle: '임의계속가입 또는 피부양자 등록으로 부담을 줄이세요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            직장을 그만두면 건강보험이 <strong>지역가입자</strong>로 자동 전환돼요. 지역가입자 보험료는 소득, 재산, 자동차 등을 기준으로 산정하는데, 직장가입자 때보다 보험료가 더 나올 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            이때 <strong>임의계속가입</strong>을 신청하면 퇴직 전 직장에서 내던 보험료 수준을 최대 <strong>36개월</strong> 유지할 수 있어요. 단, 회사 부담분까지 본인이 전액 내야 하지만 지역보험료보다 적으면 이득이에요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            임의계속가입은 퇴직 전 18개월 중 <strong>1년 이상</strong> 직장가입자였던 사람만 신청할 수 있어요. 첫 지역보험료 고지서를 받은 뒤 <strong>2개월 이내</strong>에 <a href="https://www.nhis.or.kr" target="_blank" rel="noopener noreferrer" className="text-[#4A7AB5] underline">국민건강보험공단</a>에 신청하면 돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            배우자나 부모님이 직장가입자라면 <strong>피부양자</strong>로 등록하는 방법도 있어요. 피부양자가 되면 보험료가 0원이에요. 다만 연소득 2,000만원 이하, 재산세 과세표준 5.4억원 이하 등 조건을 충족해야 해요.
          </p>

          <SpokeCompareCards cards={[
            {
              title: '임의계속가입',
              subtitle: '최대 36개월',
              items: [
                '직장 시절 보험료 유지',
                '본인이 전액 부담 (회사분 포함)',
                '지역보험료보다 적으면 유리',
                '퇴직 전 1년 이상 직장가입 필수',
              ],
              recommended: true,
              recLabel: '보험료 절약에 유리',
            },
            {
              title: '지역가입자 전환',
              subtitle: '자동 전환',
              items: [
                '소득·재산·자동차 기준 산정',
                '재산이 많으면 보험료 높음',
                '별도 신청 없이 자동 적용',
                '보험료 조정 신청 가능',
              ],
            },
            {
              title: '피부양자 등록',
              subtitle: '보험료 0원',
              items: [
                '가족 직장가입자에 등록',
                '연소득 2,000만원 이하 조건',
                '재산세 5.4억원 이하 조건',
                '조건 충족 시 가장 유리',
              ],
            },
          ]} />

          <SpokeChecklist items={[
            { text: '퇴직 전 18개월 중 1년 이상 직장가입자 확인', done: true },
            { text: '첫 지역보험료 고지 후 2개월 이내 신청', done: true, note: '기한 엄수' },
            { text: '건강보험공단 지사 방문 또는 온라인 신청', done: true },
            { text: '임의계속 vs 지역가입 보험료 비교 확인', done: false, note: '공단 문의' },
          ]} />

          <p className="text-neutral-600 mb-0">
            건강보험은 정리했는데, 국민연금도 계속 내야 하는지 궁금해지죠.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '국민연금',
        title: '국민연금은 안 내도 되나요?',
        desc: '납부예외와 실업크레딧 중 선택할 수 있어요',
        icon: 'info',
      },
    },

    /* ── S3: 국민연금 ── */
    {
      id: 's3',
      number: '03',
      heading: '실업급여 국민연금은 납부 유예되나요?',
      subtitle: '납부예외 또는 실업크레딧 중 선택할 수 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            퇴직하면 국민연금도 <strong>지역가입자</strong>로 전환되는데, 소득이 없으면 <strong>납부예외</strong>를 신청할 수 있어요. 납부예외를 신청하면 보험료를 안 내도 되지만, 그 기간은 연금 가입기간에 포함되지 않아서 나중에 연금액이 줄어들어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            더 좋은 방법은 <strong>실업크레딧</strong>이에요. 구직급여 수급자가 신청하면 국가가 보험료의 <strong>75%</strong>를 지원하고, 본인은 <strong>25%</strong>만 내면 돼요. 인정소득 70만원 기준으로 월 보험료 63,000원 중 <strong>본인부담은 15,750원</strong>이에요. 최대 <strong>12개월</strong>까지 지원받을 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            실업크레딧 신청 조건은 만 18세 이상 60세 미만 구직급여 수급자이면서, 재산세 과세표준 합계 <strong>6억원 이하</strong>, 종합소득(사업·근로 제외) <strong>1,680만원 이하</strong>예요. <a href="https://www.nps.or.kr" target="_blank" rel="noopener noreferrer" className="text-[#4A7AB5] underline">국민연금공단</a>이나 고용센터에서 신청하면 돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            납부예외와 실업크레딧은 동시에 신청할 수 없어서 둘 중 하나를 골라야 해요. 실업크레딧이 연금액 보전에 훨씬 유리해요.
          </p>

          <FormulaBox lines={[
            { text: '실업크레딧 본인부담 계산', comment: true },
            { text: '인정소득 70만원 x 보험료율 9% = 63,000원', numbered: true },
            { text: '본인부담 25% = 63,000원 x 25% = 15,750원/월', numbered: true },
            { text: '국가지원 75% = 63,000원 x 75% = 47,250원/월', numbered: true },
          ]} />

          <SpokeStepCards steps={[
            { title: '구직급여 수급 확인', desc: '실업급여 수급자격 인정을 받은 상태', tip: '고용센터 확인' },
            { title: '실업크레딧 신청', desc: '고용센터 또는 국민연금공단에서 신청', tip: '온라인도 가능' },
            { title: '본인부담 25% 납부', desc: '월 15,750원(인정소득 70만원 기준)', tip: '자동이체 가능' },
            { title: '가입기간 인정', desc: '최대 12개월, 연금액 산정에 반영', tip: '생애 누적 12개월' },
          ]} />

          <SpokeWarnBox title="납부예외 기간은 연금에 불리해요">
            <p>납부예외 기간은 가입기간에서 빠지기 때문에 나중에 받는 연금액이 줄어들어요. 여유가 있다면 실업크레딧을 신청하는 게 훨씬 유리해요. <a href="/w/실업급여-지급일-첫-입금일-대기기간" className="text-[#4A7AB5] hover:underline">실업급여 지급일</a>에 맞춰 납부 계획을 세우면 좋아요.</p>
          </SpokeWarnBox>

          <p className="text-neutral-600 mb-0">
            이제 4대보험 전체를 한눈에 정리해볼게요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '정리',
        title: '4대보험 전체 처리 한눈에 보기',
        desc: '고용·산재·건강·국민연금 상태를 정리했어요',
        icon: 'grid',
      },
    },

    /* ── S4: 4대보험 전체 정리 ── */
    {
      id: 's4',
      number: '04',
      heading: '실업급여 수급 중 4대보험은 어떻게 처리하나요?',
      subtitle: '고용·산재는 자동 상실, 건강·연금만 챙기세요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            퇴직하면 <strong>고용보험</strong>과 <strong>산재보험</strong>은 자동으로 자격이 없어져요. 직장가입자만 가입하는 보험이라서 퇴직과 동시에 상실돼요. 실업급여를 받는 동안에는 이 두 가지 보험료를 낼 필요가 없어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            직접 관리해야 하는 건 <strong>건강보험</strong>과 <strong>국민연금</strong> 두 가지예요. 건강보험은 임의계속가입이나 피부양자 등록으로 부담을 줄이고, 국민연금은 실업크레딧으로 가입기간을 유지하는 게 좋아요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            재취업하면 4대보험 모두 <strong>직장가입자</strong>로 자동 전환돼요. 임의계속가입이나 실업크레딧도 자동으로 해제되기 때문에 따로 해지 신청할 필요 없어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            <a href="https://www.4insure.or.kr" target="_blank" rel="noopener noreferrer" className="text-[#4A7AB5] underline">4대사회보험 정보연계센터</a>에서 내 가입 상태를 한 번에 확인할 수 있어요.
          </p>

          <SpokeTable
            id="tbl-4ins"
            title="실업급여 수급 중 4대보험 처리 요약"
            subtitle="2026년 기준"
            headers={['보험', '상태', '보험료', '필요 조치']}
            rows={[
              ['고용보험', '자격 상실', '0원', '없음'],
              ['산재보험', '자격 상실', '0원', '없음'],
              ['건강보험', '지역가입자 전환', '임의계속 or 피부양자', '신청 필요'],
              ['국민연금', '지역가입자 전환', '실업크레딧 월 15,750원', '신청 필요'],
            ]}
            highlightCol={3}
          />

          <SpokeFlow steps={[
            { icon: '🏢', label: '퇴직', sub: '4대보험 직장가입 종료' },
            { icon: '📋', label: '건강보험 신청', sub: '임의계속 or 피부양자' },
            { icon: '💰', label: '국민연금 신청', sub: '실업크레딧 or 납부예외' },
            { icon: '💼', label: '재취업', sub: '4대보험 자동 복귀' },
          ]} />

          <TipBox title="재취업하면 모든 게 자동이에요">
            <p>새 직장에 입사하면 4대보험 모두 직장가입자로 자동 전환돼요. 임의계속가입은 자동 해제되고, 실업크레딧도 자동 종료돼요. 따로 해지 신청을 안 해도 돼요.</p>
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '/w/실업급여-수급-조건-신청-방법-2026',
        badge: '허브',
        title: '실업급여 전체 가이드로 돌아가기',
        desc: '수급 조건, 금액 계산, 신청 절차까지 한 번에 확인',
        icon: 'check',
        primary: true,
      },
    },

    /* ── S5: FAQ ── */
    {
      id: 's-faq',
      number: '05',
      heading: '자주 묻는 질문',
      subtitle: '',
      content: null,
    },
  ],

  faq: [
    {
      question: '실업급여 받으면 연말정산에 신고해야 하나요?',
      answer: '아니에요. 실업급여는 비과세 소득이라서 연말정산이나 종합소득세 신고에 포함하지 않아요. 중간에 재취업하면 근로소득만 연말정산하면 돼요.',
    },
    {
      question: '실업급여 수급 중 건강보험료를 안 내면 어떻게 되나요?',
      answer: '건강보험료를 3개월 이상 안 내면 보험 급여가 제한될 수 있어요. 임의계속가입이나 피부양자 등록으로 부담을 줄이고, 꼭 납부해야 해요.',
    },
    {
      question: '실업크레딧과 납부예외를 동시에 신청할 수 있나요?',
      answer: '동시 신청은 안 돼요. 둘 중 하나만 선택해야 해요. 실업크레딧은 월 15,750원만 내면 가입기간이 인정되니까 여유가 된다면 실업크레딧이 더 유리해요.',
    },
    {
      question: '실업급여 중 아르바이트하면 세금이 달라지나요?',
      answer: '실업급여 자체는 비과세로 변함없어요. 하지만 아르바이트 소득은 근로소득이라서 과세 대상이에요. 일정 금액 이상 벌면 실업급여 감액도 될 수 있으니 주의하세요.',
    },
  ],

  relatedSpokes: [
    {
      badge: '금액',
      title: '실업급여 금액 계산 연봉별 수령액',
      desc: '평균임금 60% 계산법, 상한액 68,100원',
      href: '/w/실업급여-금액-계산-연봉별-수령액',
    },
    {
      badge: '지급',
      title: '실업급여 지급일 첫 입금일 대기기간',
      desc: '7일 대기기간과 지급 주기 정리',
      href: '/w/실업급여-지급일-첫-입금일-대기기간',
    },
    {
      badge: '신청',
      title: '실업급여 신청 방법 절차 준비서류',
      desc: '워크넷 등록부터 고용센터 방문까지',
      href: '/w/실업급여-신청-방법-절차-준비서류',
    },
  ],

  sources: [
    { name: '소득세법 제12조 (비과세 소득)', url: 'https://www.law.go.kr/법령/소득세법', org: '법제처' },
    { name: '고용보험법', url: 'https://www.law.go.kr/법령/고용보험법', org: '법제처' },
    { name: '실업크레딧 안내', url: 'https://www.nps.or.kr/jsppage/info/easy/easy_04_01.jsp', org: '국민연금공단' },
    { name: '임의계속가입 안내', url: 'https://www.nhis.or.kr', org: '국민건강보험공단' },
  ],
}

export default data
