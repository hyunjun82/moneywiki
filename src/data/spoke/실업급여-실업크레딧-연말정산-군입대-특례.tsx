import type { SpokeData } from '@/data/spoke/types'
import {
  SpokeTable, TipBox, FormulaBox, WarnBox,
  Chips, DetailBox, SpokeLinks, Steps,
  SpokeFlow, SpokeChecklist,
} from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '실업급여-실업크레딧-연말정산-군입대-특례',

  meta: {
    title: '실업급여 실업크레딧 신청 방법 | 연말정산 비과세 군입대 특례',
    description: '실업크레딧으로 국민연금 보험료 75%를 지원받는 방법과 실업급여 비과세 처리, 군입대 수급유예까지 정리했어요.',
    keywords: [
      '실업급여 실업크레딧 국민연금',
      '실업급여 연말정산 소득 신고',
      '실업급여 군입대 수급 유예',
      '실업급여 실업크레딧 신청 방법',
    ],
    ogTitle: '실업급여 실업크레딧 신청 방법 | 머니위키',
    ogDescription: '실업크레딧 75% 지원과 연말정산 비과세 처리를 확인하세요.',
  },

  hub: {
    url: '/w/실업급여-퇴직사유-임금체불-괴롭힘-피보험기간',
    name: '실업급여 퇴직사유 심화 임금체불 괴롭힘 피보험기간',
  },

  breadcrumb: ['고용/노동', '실업급여', '실업크레딧 연말정산 군입대'],

  summary3: [
    <>실업크레딧은 구직급여 수급 중 국민연금 보험료 <strong>75%</strong>를 지원받는 제도예요</>,
    <>실업급여는 <strong>비과세 소득</strong>이라 연말정산이나 종합소득세 신고에 포함하지 않아요</>,
    <>군입대 시 수급기간을 <strong>최대 4년</strong>까지 연장할 수 있어요</>,
  ],

  sourceBar: {
    badge: '출처',
    name: '국민연금법 제19조의2 + 고용보험법',
    date: '2026.02',
  },

  prevNext: {
    prev: { title: '실업급여 퇴직금 동시수급 세금 처리', href: '/w/실업급여-퇴직금-관계-동시수급-세금-처리' },
  },

  stickyBar: {
    topLabel: '실업크레딧 본인부담',
    value: '월 16,625원',
    buttonText: '실업크레딧 알아보기 →',
    scrollTo: '#s1',
  },

  hero: {
    badge: '2026년 기준',
    h1: (
      <>
        실업급여 <span className="text-[#1E3A5F]">실업크레딧</span> 연말정산 군입대 특례
      </>
    ),
    intro: (
      <p className="text-base text-neutral-500 leading-relaxed">
        실업급여를 받는 동안 국민연금 가입기간이 끊기면 나중에 연금 수령액이 줄어들어요. <strong>실업크레딧</strong>을 신청하면 보험료의 75%를 지원받아 가입기간을 유지할 수 있어요. <a href="/w/실업급여-퇴직사유-임금체불-괴롭힘-피보험기간" className="text-[#4A7AB5] underline">실업급여 퇴직사유 심화 가이드</a>에서 수급 자격도 함께 확인해 보세요. 먼저 실업크레딧이 정확히 무엇인지부터 볼게요.
      </p>
    ),
    hubCTA: {
      badge: '심화 가이드',
      desc: '실업급여 퇴직사유, 임금체불, 괴롭힘, 피보험기간 총정리',
    },
  },

  toc: [
    { id: 's1', label: '실업급여 실업크레딧 국민연금 지원은 어떤 제도인가요?' },
    { id: 's2', label: '실업급여 연말정산 소득 신고는 어떻게 하나요?' },
    { id: 's3', label: '실업급여 군입대 수급 유예는 어떻게 신청하나요?' },
    { id: 's4', label: '실업급여 실업크레딧 신청 방법은 어떻게 되나요?' },
    { id: 's-faq', label: '자주 묻는 질문' },
  ],

  sections: [
    {
      id: 's1',
      number: 'SECTION 01',
      heading: '실업급여 실업크레딧 국민연금 지원은 어떤 제도인가요?',
      subtitle: '구직급여 수급 중 보험료 75%를 국가가 대신 내줘요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            실업크레딧은 <a href="https://www.law.go.kr/법령/국민연금법" target="_blank" rel="noopener noreferrer" className="text-[#4A7AB5] underline">국민연금법 제19조의2</a>에 근거한 제도예요. 구직급여를 받는 동안 국민연금 보험료의 <strong>75%를 국가가 지원</strong>하고, 본인은 25%만 내면 돼요. 가입기간이 끊기지 않으니 나중에 받을 연금액도 줄어들지 않아요. 생애 통산 <strong>최대 12개월</strong>까지 지원받을 수 있어요.
          </p>

          <FormulaBox
            lines={[
              { text: '실업크레딧 보험료 계산 (2026년 기준)', comment: true },
              { text: '인정소득 = 실직 전 3개월 평균소득 x 50% (최대 70만원)' },
              { text: '월 보험료 = 70만원 x 9.5% = 66,500원', numbered: true },
              { text: '본인부담 25% = 16,625원', numbered: true },
              { text: '국가지원 75% = 49,875원', numbered: true },
            ]}
          />

          <SpokeTable
            id="tbl-credit-calc"
            title="인정소득별 실업크레딧 보험료 부담 비교"
            subtitle="2026년 보험료율 9.5% 기준 / 단위: 원"
            headers={['인정소득', '월 보험료', '본인부담(25%)', '국가지원(75%)']}
            rows={[
              ['40만원', '38,000', '9,500', '28,500'],
              ['50만원', '47,500', '11,875', '35,625'],
              ['60만원', '57,000', '14,250', '42,750'],
              ['70만원(상한)', '66,500', '16,625', '49,875'],
            ]}
            highlightCol={2}
          />

          <Chips
            items={[
              { icon: '💰', label: '지원 비율', value: '75%' },
              { icon: '📅', label: '최대 기간', value: '12개월' },
              { icon: '🏦', label: '인정소득 상한', value: '70만원' },
              { icon: '📊', label: '보험료율', value: '9.5%' },
            ]}
          />

          <TipBox title="실업크레딧을 12개월 모두 받으면 연금이 얼마나 늘어날까요?">
            인정소득 70만원 기준으로 12개월 가입기간이 추가돼요. 국민연금은 가입기간 1년당 약 <strong>월 2~3만원</strong>씩 연금액이 늘어나니, 20년 수령하면 약 480~720만원 차이가 나요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '비과세',
        title: '실업급여를 받으면 연말정산은 어떻게 되는지 궁금하시죠?',
        desc: '실업급여는 비과세 소득이라 세금 신고에 포함하지 않아요. 자세한 처리 방법을 알려드릴게요.',
        icon: 'calc',
      },
    },

    {
      id: 's2',
      number: 'SECTION 02',
      heading: '실업급여 연말정산 소득 신고는 어떻게 하나요?',
      subtitle: '실업급여는 비과세라 연말정산에 포함하지 않아요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            실업급여는 <a href="https://www.law.go.kr/법령/고용보험법" target="_blank" rel="noopener noreferrer" className="text-[#4A7AB5] underline">고용보험법</a>에 따라 지급되는 <strong>비과세 소득</strong>이에요. 아무리 많이 받아도 소득세를 내지 않아요. 연말정산이나 종합소득세 신고에도 포함하지 않아요. 건강보험료 산정 시에도 소득으로 잡히지 않아요.
          </p>

          <SpokeChecklist
            items={[
              { text: '실업급여 = 비과세 소득 (소득세법상 비과세 근로소득)', done: true },
              { text: '연말정산 총급여에 포함하지 않아요', done: true },
              { text: '종합소득세 신고 대상이 아니에요', done: true },
              { text: '건강보험료 산정 시 소득으로 잡히지 않아요', done: true },
              { text: '육아휴직 급여, 출산 전후 휴가 급여도 동일하게 비과세예요', done: true },
            ]}
          />

          <DetailBox
            title="연도 중간에 퇴직했을 때 연말정산 처리"
            items={[
              { heading: '퇴직 전 회사 급여분', desc: '퇴직한 회사에서 중도 퇴사자 연말정산을 해줘요. 원천징수영수증을 꼭 받아두세요' },
              { heading: '실업급여 기간', desc: '비과세이므로 아무 처리도 필요 없어요. 소득 자체가 0원으로 취급돼요' },
              { heading: '같은 해 재취업한 경우', desc: '새 직장에서 전 직장 원천징수영수증을 제출하고 합산 연말정산을 받아요' },
              { heading: '그 해 재취업 안 한 경우', desc: '다음 해 5월 종합소득세 신고로 환급받을 수 있어요. 실업급여는 포함하지 않아요' },
            ]}
          />

          <WarnBox>
            <strong>주의:</strong> 실업급여와 달리 실업크레딧으로 납부한 국민연금 보험료(본인부담 25%)는 <strong>사회보험료 세액공제 대상</strong>이에요. 다만 퇴직 후 소득이 없으면 공제받을 세금 자체가 없으니 실질적 혜택은 재취업 후에 발생해요.
          </WarnBox>

          <SpokeLinks
            title="세금 관련 스포크 더 보기"
            items={[
              { num: '01', heading: '실업급여 세금 건강보험 국민연금 처리', desc: '수급 중 4대보험과 세금 처리를 한 번에 정리', href: '/w/실업급여-세금-건강보험-국민연금-처리' },
              { num: '02', heading: '실업급여 퇴직금 동시수급 세금 처리', desc: '퇴직금과 실업급여의 세금 차이와 동시수급', href: '/w/실업급여-퇴직금-관계-동시수급-세금-처리' },
            ]}
          />
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '군입대',
        title: '군 입대를 앞두고 있다면 수급기간 연장이 가능해요',
        desc: '병역의무 이행 중에는 수급이 유예되고, 전역 후 남은 급여를 받을 수 있어요.',
        icon: 'clock',
      },
    },

    {
      id: 's3',
      number: 'SECTION 03',
      heading: '실업급여 군입대 수급 유예는 어떻게 신청하나요?',
      subtitle: '전역 후 30일 이내에 신고하면 남은 급여를 이어 받아요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            실업급여를 받던 중 군에 입대하면 수급이 자동으로 중단돼요. 하지만 <a href="https://www.law.go.kr/법령/고용보험법" target="_blank" rel="noopener noreferrer" className="text-[#4A7AB5] underline">고용보험법</a>에 따라 병역의무 이행 기간만큼 수급기간이 연장돼요. 수급기간은 기존 12개월에 복무 기간을 더한 기간으로 늘어나고, <strong>최대 4년</strong>까지 가능해요. 전역 후 남은 소정급여일수만큼 구직급여를 이어 받을 수 있어요.
          </p>

          <SpokeFlow
            steps={[
              { icon: '📋', label: '구직급여 수급 중', sub: '입대 전 고용센터 신고' },
              { icon: '🎖️', label: '병역의무 이행', sub: '수급기간 자동 연장' },
              { icon: '🏠', label: '전역 후 30일 이내', sub: '고용센터에 연기신고' },
              { icon: '💰', label: '잔여 급여 수급', sub: '남은 일수만큼 지급' },
            ]}
          />

          <Steps
            items={[
              { title: '입대 전 고용센터에 방문해서 수급기간 연기 사유를 미리 알려요', desc: '병역 입영통지서 사본을 가져가면 처리가 빨라요' },
              { title: '복무 기간 동안에는 실업급여가 지급되지 않아요', desc: '복무 중에는 실업인정도 받을 필요 없어요' },
              { title: '전역 후 30일 이내에 고용센터에 연기사유 신고를 해요', desc: '전역증명서를 지참하고 방문하면 돼요' },
              { title: '남은 소정급여일수만큼 구직급여를 다시 받아요', desc: '실업인정 절차를 새로 시작해야 해요' },
            ]}
          />

          <TipBox title="군 복무 중에도 실업크레딧은 적용되나요?">
            군 복무 기간에는 구직급여를 받지 않으니 실업크레딧도 적용되지 않아요. 대신 병역의무 이행 기간은 국민연금법상 <strong>군복무 크레딧</strong>으로 별도 인정받을 수 있어요. 6개월까지 가입기간에 추가돼요.
          </TipBox>

          <WarnBox>
            전역 후 <strong>30일 이내</strong>에 고용센터에 신고하지 않으면 수급기간 연장을 받지 못할 수 있어요. 전역하면 바로 고용센터를 방문하세요.
          </WarnBox>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '신청',
        title: '실업크레딧은 언제, 어디서 신청할 수 있을까요?',
        desc: '고용센터에서 실업급여 신청할 때 함께 하면 가장 간편해요.',
        icon: 'check',
      },
    },

    {
      id: 's4',
      number: 'SECTION 04',
      heading: '실업급여 실업크레딧 신청 방법은 어떻게 되나요?',
      subtitle: '구직급여 신청 시 고용센터에서 동시 신청이 가장 편해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            실업크레딧은 구직급여 신청이나 수급자격 인정 시 <strong>고용센터에서 바로 신청</strong>할 수 있어요. 이미 수급 중이라면 국민연금공단 지사에서도 신청 가능해요. 구직급여 종료일이 속하는 달의 <strong>다음 달 15일까지</strong> 신청해야 하니 기한을 놓치지 마세요. 한번 신청하면 구직급여 수급 기간 동안 매달 자동으로 지원돼요.
          </p>

          <Steps
            items={[
              { title: '고용센터에서 구직급여 신청 시 실업크레딧도 함께 신청해요', desc: '별도 서류 없이 동의서만 작성하면 돼요' },
              { title: '인정소득이 자동 산정돼요', desc: '실직 전 3개월 평균소득의 50%(최대 70만원)가 기준이에요' },
              { title: '매월 본인부담 25%가 자동 고지돼요', desc: '국민연금공단에서 고지서가 나와요. 미납 시 해당 월 지원이 중단돼요' },
              { title: '구직급여 종료 시 자동으로 실업크레딧도 종료돼요', desc: '재취업 후에는 직장 가입자로 전환돼요' },
            ]}
          />

          <SpokeTable
            id="tbl-exclude"
            title="실업크레딧 제외 대상"
            subtitle="국민연금법 시행령 기준"
            headers={['구분', '기준', '비고']}
            rows={[
              ['나이', '18세 미만 또는 60세 이상', '가입 연령 밖'],
              ['재산', '재산세 과세표준 합계 6억원 초과', '고액 재산가 제외'],
              ['소득', '종합소득(사업·근로 제외) 1,680만원 초과', '금융·연금소득 기준'],
            ]}
          />

          <SpokeChecklist
            items={[
              { text: '구직급여 수급자격 인정받았나요?', done: false, note: '고용센터에서 확인' },
              { text: '18세 이상 60세 미만인가요?', done: false, note: '국민연금 가입 연령' },
              { text: '재산세 과세표준 6억원 이하인가요?', done: false, note: '초과 시 제외' },
              { text: '종합소득 1,680만원 이하인가요?', done: false, note: '사업·근로소득 제외' },
              { text: '구직급여 종료 후 다음 달 15일 이내인가요?', done: false, note: '신청 기한' },
            ]}
          />

          <TipBox title="국민연금공단에서도 신청할 수 있어요">
            고용센터에서 깜빡했다면 가까운 국민연금공단 지사에 방문, 우편, 팩스로도 신청할 수 있어요. 국번 없이 <strong>1355</strong>로 전화하면 가까운 지사를 안내받을 수 있어요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '/w/실업급여-퇴직사유-임금체불-괴롭힘-피보험기간',
        badge: '허브',
        title: '실업급여 퇴직사유 심화 가이드로 돌아가기',
        desc: '임금체불, 괴롭힘, 피보험기간 등 퇴직사유별 수급 자격을 확인하세요.',
        icon: 'grid',
        primary: true,
      },
    },

    {
      id: 's-faq',
      number: '05',
      heading: '자주 묻는 질문',
      subtitle: '',
      content: null,
    },
  ],

  faq: [
    { question: '실업크레딧을 받으면 나중에 국민연금을 더 받을 수 있나요?', answer: '<strong>네.</strong> 실업크레딧 기간이 국민연금 가입기간에 포함돼요. 인정소득 70만원 기준 12개월이면 약 <strong>월 2~3만원</strong> 연금이 늘어나요. 20년 수령 시 약 480~720만원 차이가 나요.' },
    { question: '실업급여를 받으면 건강보험 지역가입자 보험료가 올라가나요?', answer: '<strong>아니요.</strong> 실업급여는 비과세 소득이라 건강보험료 산정에 포함되지 않아요. 퇴직 후 지역가입자로 전환되면 이전 직장 소득과 재산 기준으로 보험료가 산정돼요.' },
    { question: '실업크레딧 본인부담금을 안 내면 어떻게 되나요?', answer: '해당 월의 실업크레딧 지원이 <strong>중단</strong>돼요. 미납 월은 가입기간으로 인정되지 않아요. 단, 다음 달에 다시 납부하면 그 달부터 지원이 재개돼요.' },
    { question: '실업크레딧은 생애 총 12개월까지만 받을 수 있나요?', answer: '<strong>네.</strong> 실업과 재취업을 반복해도 생애 통산 <strong>최대 12개월</strong>까지만 지원돼요. 한 번에 12개월을 다 쓸 수도 있고, 여러 번에 걸쳐 나눠 쓸 수도 있어요.' },
    { question: '군입대 외에 수급기간이 연장되는 경우가 또 있나요?', answer: '<strong>네.</strong> 임신·출산·육아, 질병·부상으로 취업이 불가능한 경우에도 수급기간이 연장돼요. 사유가 해소된 날부터 30일 이내에 고용센터에 신고해야 해요.' },
  ],

  relatedSpokes: [
    { badge: '세금', title: '실업급여 세금 건강보험 국민연금 처리 방법', desc: '수급 중 4대보험료와 세금 처리 총정리', href: '/w/실업급여-세금-건강보험-국민연금-처리' },
    { badge: '수급조건', title: '실업급여 수급 조건 자격 요건 완벽정리', desc: '실업급여를 받기 위한 기본 조건 확인', href: '/w/실업급여-수급-조건-자격-요건-완벽정리' },
    { badge: '퇴직금', title: '실업급여 퇴직금 관계 동시수급 세금 처리', desc: '퇴직금과 실업급여 동시 수급 가능 여부', href: '/w/실업급여-퇴직금-관계-동시수급-세금-처리' },
    { badge: '신청방법', title: '실업급여 신청 방법 절차 준비서류', desc: '고용센터 방문부터 첫 입금까지 절차 안내', href: '/w/실업급여-신청-방법-절차-준비서류' },
    { badge: '수급기간', title: '실업급여 수급기간 소정급여일수 기준', desc: '나이와 가입기간별 수급일수 확인', href: '/w/실업급여-수급기간-소정급여일수-기준' },
  ],

  sources: [
    { name: '국민연금법 제19조의2 (실업크레딧)', url: 'https://www.law.go.kr/법령/국민연금법', org: '법제처' },
    { name: '고용보험법 (구직급여 수급기간)', url: 'https://www.law.go.kr/법령/고용보험법', org: '법제처' },
    { name: '국민연금공단 실업크레딧 안내', url: 'https://www.nps.or.kr', org: '국민연금공단' },
    { name: '고용노동부 실업급여 안내', url: 'https://www.moel.go.kr', org: '고용노동부' },
  ],
}

export default data
