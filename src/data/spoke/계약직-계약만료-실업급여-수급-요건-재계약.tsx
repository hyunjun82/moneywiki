import type { SpokeData } from '@/data/spoke/types'
import {
  SpokeTable, FormulaBox, TipBox, WarnBox,
  SpokeRateBars, SpokeWarnBox, SpokeCompareCards,
  SpokeFlow, SpokeChecklist, SpokeTimeline,
} from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '계약직-계약만료-실업급여-수급-요건-재계약',

  meta: {
    title: '계약직 계약만료 실업급여 수급 요건 | 재계약 거부 시 받을 수 있나요?',
    description: '계약직 계약만료 시 실업급여 수급 요건과 재계약 거부 판단 기준을 정리했어요. 피보험기간 180일 계산법까지 확인하세요.',
    keywords: [
      '계약직 계약만료 실업급여 요건',
      '계약만료 실업급여 수급 조건',
      '계약직 재계약 거부 실업급여',
      '계약직 실업급여 피보험기간',
    ],
    ogTitle: '계약직 계약만료 실업급여 수급 요건 | 머니위키',
    ogDescription: '계약만료 후 실업급여, 재계약 거부하면 못 받을 수도 있어요.',
  },

  hub: {
    url: '/w/실업급여-퇴사유형별-수급-자격-권고사직-자진퇴사-해고',
    name: '실업급여 퇴사유형별 수급 자격 비교',
  },

  breadcrumb: ['고용노동', '실업급여', '계약직 계약만료'],

  summary3: [
    <>계약만료는 원칙적으로 <strong>비자발적 이직</strong> → 실업급여 수급 가능</>,
    <>재계약 거부 시 <strong>사유에 따라</strong> 자발적 이직 처리될 수 있어요</>,
    <>피보험기간은 이직일 이전 <strong>18개월 중 180일 이상</strong> 필요해요</>,
  ],

  sourceBar: {
    badge: '출처',
    name: '고용보험법 제58조, 고용노동부 실업급여 안내',
    date: '2026.02',
  },

  prevNext: {
    prev: { title: '자진퇴사 실업급여 예외 사유 정리', href: '/w/자진퇴사-자발적-퇴사-실업급여-예외-사유' },
    next: { title: '해고 부당해고 징계해고 실업급여', href: '/w/해고-부당해고-징계해고-실업급여-해고예고수당' },
  },

  stickyBar: {
    topLabel: '계약만료 실업급여',
    value: '비자발적 이직',
    buttonText: '수급 요건 확인 →',
    scrollTo: '#s1',
  },

  hero: {
    badge: '2026년 기준',
    h1: (
      <>
        계약직 <span className="text-[#1E3A5F]">계약만료 실업급여</span> 수급 요건과 재계약 거부 판단
      </>
    ),
    intro: (
      <p className="text-base text-neutral-500 leading-relaxed">
        계약 기간이 끝나서 나왔는데 실업급여를 못 받는다면 억울하잖아요. 계약만료는 원칙적으로 비자발적 이직이라 실업급여를 받을 수 있지만, 재계약을 본인이 거부한 경우엔 이야기가 달라져요. <a href="/w/실업급여-퇴사유형별-수급-자격-권고사직-자진퇴사-해고" className="text-[#4A7AB5] underline">퇴사유형별 실업급여 비교</a>에서 전체 그림을 확인할 수 있어요. 먼저 계약만료가 왜 비자발적 이직인지부터 볼게요.
      </p>
    ),
    hubCTA: {
      badge: '전체 비교',
      desc: '퇴사 유형별 실업급여 수급 자격 한눈에 비교',
    },
  },

  toc: [
    { id: 's1', label: '계약만료 실업급여 요건은 어떻게 되나요?' },
    { id: 's2', label: '재계약 거부하면 실업급여를 못 받나요?' },
    { id: 's3', label: '계약직 실업급여 피보험기간은 어떻게 계산하나요?' },
    { id: 's4', label: '계약직 실업급여 신청 절차는 어떻게 되나요?' },
    { id: 's-faq', label: '자주 묻는 질문' },
  ],

  sections: [
    // ═══ S1: 계약만료 실업급여 요건 ═══
    {
      id: 's1',
      number: 'SECTION 01',
      heading: '계약만료 실업급여 요건은 어떻게 되나요?',
      subtitle: '계약만료 = 비자발적 이직이 원칙이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            계약 기간이 끝나서 퇴사한 경우, 고용보험법에서는 <strong>비자발적 이직</strong>으로 봐요. 이직확인서에 이직사유 코드 <strong>32번(계약기간 만료)</strong>이 찍히면 실업급여 수급 자격이 인정되는 거예요. 다만 이것 하나만으로는 부족하고, 아래 3가지 요건을 모두 충족해야 해요.
          </p>

          <FormulaBox
            lines={[
              { text: '계약만료 실업급여 수급 3가지 요건', comment: true },
              { text: '1. 비자발적 이직 (계약만료 = 코드 32)', numbered: true },
              { text: '2. 피보험기간 18개월 중 180일 이상', numbered: true },
              { text: '3. 재취업 의사 + 적극적 구직활동', numbered: true },
            ]}
          />

          <SpokeRateBars
            bars={[
              { label: '구직급여', rate: '퇴직 전 평균임금의 60%', width: '60%' },
              { label: '일 상한액', rate: '68,100원', width: '85%' },
              { label: '일 하한액', rate: '66,048원', width: '82%' },
            ]}
          />

          <TipBox title="2026년부터 하한액이 66,048원으로 올랐어요">
            최저임금 인상에 따라 하한액도 올랐고, 상한액과 하한액 차이가 <strong>2,052원</strong>밖에 안 돼요. 사실상 대부분의 계약직 근로자는 하한액 기준으로 받게 돼요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '재계약',
        title: '회사가 재계약을 제안했는데 거절하면 어떻게 될까요?',
        desc: '단순 거부인지, 조건이 달라서인지에 따라 결과가 완전히 달라져요.',
        icon: 'info',
      },
    },

    // ═══ S2: 재계약 거부 시 실업급여 ═══
    {
      id: 's2',
      number: 'SECTION 02',
      heading: '재계약 거부하면 실업급여를 못 받나요?',
      subtitle: '본인이 거부한 이유에 따라 결과가 달라요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            &quot;계약 끝났으니 당연히 받겠지&quot; 하고 방심하면 안 돼요. 회사가 <strong>같은 조건으로 재계약을 제안</strong>했는데 근로자가 특별한 사유 없이 거절하면, 고용센터에서 <strong>자발적 이직</strong>으로 판단할 수 있어요. 반대로 회사가 아예 재계약 의사를 밝히지 않았다면 100% 비자발적 이직이에요.
          </p>

          <SpokeWarnBox title="재계약 거부 = 자발적 이직?">
            <p className="mb-2">사업주가 재계약 의사를 밝혔는데 근로자가 특별한 사정 없이 거부하면 실업급여 <strong>수급자격이 제한</strong>돼요. 단, 근로조건(임금·근무시간·업무 등)이 이전보다 <strong>불리하게 변경</strong>된 경우에는 거부해도 정당한 이직 사유로 인정돼요.</p>
          </SpokeWarnBox>

          <SpokeCompareCards
            cards={[
              {
                title: '실업급여 받을 수 있는 경우',
                subtitle: '비자발적 이직으로 인정',
                items: [
                  '회사가 재계약 의사를 안 밝힌 경우',
                  '재계약 시 임금이 삭감된 경우',
                  '근무지·업무가 크게 변경된 경우',
                  '근로조건 협의가 결렬된 경우',
                ],
                recommended: true,
                recLabel: '수급 가능',
              },
              {
                title: '실업급여 제한되는 경우',
                subtitle: '자발적 이직으로 판단',
                items: [
                  '같은 조건 재계약을 본인이 거부',
                  '더 좋은 직장으로 이직 목적',
                  '개인 사정으로 단순 거부',
                  '특별한 사유 없는 거절',
                ],
              },
            ]}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            2년 넘게 반복 갱신된 계약직이라면 <strong>갱신기대권</strong>이 인정될 수 있어요. 대법원 판례(2011두12528)에서 반복 갱신으로 신뢰관계가 형성된 경우 사용자의 갱신 거절을 부당해고로 본 사례가 있어요. 이런 경우엔 <a href="/w/해고-부당해고-징계해고-실업급여-해고예고수당" className="text-[#4A7AB5] underline">부당해고 실업급여</a>로 접근하는 게 유리할 수 있어요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '180일',
        title: '피보험기간 180일, 계약직은 어떻게 계산하나요?',
        desc: '주 5일 근무자 기준 약 8개월이 필요해요. 유급휴일도 포함돼요.',
        icon: 'calc',
      },
    },

    // ═══ S3: 피보험기간 계산 ═══
    {
      id: 's3',
      number: 'SECTION 03',
      heading: '계약직 실업급여 피보험기간은 어떻게 계산하나요?',
      subtitle: '이직일 이전 18개월 중 180일이 기준이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            실업급여를 받으려면 <strong>이직일 이전 18개월</strong> 동안 피보험 단위기간이 <strong>180일 이상</strong>이어야 해요. 여기서 피보험 단위기간은 달력상 날짜가 아니라, 실제 보수를 받은 날을 세는 거예요. 주 5일 근무자는 유급 주휴일(토요일 제외, 일요일 포함)도 포함되니까 한 달에 약 22일 정도가 인정돼요.
          </p>

          <SpokeTable
            id="tbl-period"
            title="근무 형태별 180일 충족 예상 기간"
            subtitle="피보험 단위기간 = 보수지급 기초일 합산 기준"
            headers={['근무 형태', '월 인정일수', '180일 충족', '비고']}
            rows={[
              ['주 5일 (풀타임)', '약 22일', '약 8~9개월', '유급 주휴일 포함'],
              ['주 4일 (단시간)', '약 17일', '약 10~11개월', '유급휴일 비례 적용'],
              ['주 3일 이하', '약 13일', '약 14개월 이상', '무급 휴일 제외'],
            ]}
            highlightCol={2}
          />

          <SpokeFlow
            steps={[
              { icon: '📅', label: '이직일 확인', sub: '마지막 근무일' },
              { icon: '⏪', label: '18개월 역산', sub: '기준기간 설정' },
              { icon: '📊', label: '근로일수 합산', sub: '유급휴일 포함' },
              { icon: '✅', label: '180일 확인', sub: '수급자격 판정' },
            ]}
          />

          <TipBox title="여러 직장의 피보험기간을 합산할 수 있어요">
            A회사에서 100일, B회사에서 80일 일했다면 합쳐서 180일이에요. 단, <strong>이전 직장에서 실업급여를 이미 받았다면</strong> 그 기간은 합산에서 빠져요. 고용보험 가입이력은 <a href="https://www.ei.go.kr" target="_blank" rel="noopener noreferrer" className="text-[#4A7AB5] underline">고용보험 홈페이지</a>에서 확인할 수 있어요.
          </TipBox>
        </>
      ),
      pasBridge: {
        href: '/w/자진퇴사-자발적-퇴사-실업급여-예외-사유',
        question: '계약 만료가 아니라 본인이 먼저 그만뒀다면 실업급여는 불가능할까요?',
        answer: <>자진퇴사라도 임금체불, 직장 내 괴롭힘 등 <strong>정당한 사유 12가지</strong>에 해당하면 실업급여를 받을 수 있어요.</>,
        buttonText: '자진퇴사 예외 사유 확인 →',
      },
    },

    // ═══ S4: 신청 절차 ═══
    {
      id: 's4',
      number: 'SECTION 04',
      heading: '계약직 실업급여 신청 절차는 어떻게 되나요?',
      subtitle: '이직확인서 발급부터 고용센터 방문까지',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            계약 만료 후 실업급여를 신청하려면 회사에서 <strong>이직확인서</strong>를 발급받는 게 첫 번째예요. 이직확인서에 이직사유가 &quot;계약기간 만료(코드 32)&quot;로 기재되어야 비자발적 이직으로 인정돼요. 회사가 발급을 미루면 고용센터에 신고하면 과태료가 부과돼요.
          </p>

          <SpokeChecklist
            items={[
              { text: '이직확인서 발급 요청 (퇴사 후 즉시)', done: true, note: '사업주는 10일 이내 피보험자격 상실 신고 의무' },
              { text: '이직사유 코드 32번(계약만료) 확인', done: true, note: '다른 코드로 기재되면 정정 요청 가능' },
              { text: 'work24(고용24) 구직급여 온라인 교육 수강', done: false, note: '고용센터 방문 전 사전 교육 필수' },
              { text: '관할 고용센터 방문 + 수급자격 인정 신청', done: false, note: '신분증, 통장사본 지참' },
              { text: '1~4주 단위 실업인정일 출석', done: false, note: '구직활동 2회 이상 필요' },
            ]}
          />

          <SpokeTimeline
            events={[
              { month: 'D-day', title: '계약만료 퇴사', desc: '마지막 근무일 = 이직일', status: 'current' },
              { month: 'D+10일', title: '이직확인서 발급', desc: '사업주가 고용센터에 제출' },
              { month: 'D+14일~', title: '수급자격 신청', desc: '고용센터 방문 또는 온라인' },
              { month: 'D+21일~', title: '1차 실업인정', desc: '대기기간 7일 후 첫 인정일' },
              { month: 'D+35일~', title: '첫 구직급여 입금', desc: '1차 실업인정 후 약 2주 내' },
            ]}
          />

          <WarnBox>
            <strong>12개월 이내 신청 필수!</strong> 퇴사 후 12개월이 지나면 수급 자격이 남아 있어도 실업급여를 받을 수 없어요. 계약 만료 직후 바로 신청하는 게 가장 안전해요.
          </WarnBox>
        </>
      ),
      bridgeCTA: {
        href: '/w/실업급여-퇴사유형별-수급-자격-권고사직-자진퇴사-해고',
        badge: '전체 비교',
        title: '계약만료 외에 다른 퇴사 유형도 궁금하다면?',
        desc: '권고사직, 자진퇴사, 해고 등 퇴사유형별 실업급여 수급 조건을 한눈에 비교해요.',
        icon: 'grid',
        primary: true,
      },
    },

    // ═══ FAQ ═══
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
      question: '계약직 계약만료 실업급여 요건에서 피보험기간은 어떻게 확인하나요?',
      answer: '<a href="https://www.ei.go.kr" target="_blank">고용보험 홈페이지</a>에서 본인 피보험 이력을 조회할 수 있어요. 공동인증서 또는 간편인증으로 로그인하면 직장별 가입기간과 피보험 단위기간을 확인할 수 있어요.',
    },
    {
      question: '계약만료 후 재계약 거부했는데 실업급여를 신청할 수 있나요?',
      answer: '재계약 시 <strong>근로조건이 이전보다 불리하게 변경</strong>된 경우(임금 삭감, 근무지 변경 등)에는 거부해도 정당한 이직으로 인정돼요. 반면 같은 조건인데 단순 거부하면 자발적 이직으로 처리될 수 있어요.',
    },
    {
      question: '계약직으로 6개월만 일했는데 실업급여를 받을 수 있나요?',
      answer: '주 5일 근무 기준으로 6개월이면 피보험 단위기간이 약 132일이라 180일에 미달해요. 이전 직장의 고용보험 가입기간을 <strong>합산</strong>할 수 있으니 확인해 보세요.',
    },
    {
      question: '2년 넘게 계약직으로 일했는데 갱신기대권이 뭔가요?',
      answer: '기간제법상 2년을 초과하면 무기계약직으로 전환되는데, 반복 갱신으로 신뢰관계가 형성된 경우 <strong>갱신기대권</strong>이 인정돼요. 회사가 갱신을 거부하면 부당해고에 해당할 수 있고, 이 경우 실업급여도 당연히 받을 수 있어요.',
    },
  ],

  relatedSpokes: [
    { badge: '자진퇴사', title: '자진퇴사 실업급여 예외 사유 12가지 정리', desc: '정당한 이직 사유에 해당하면 자진퇴사도 수급 가능', href: '/w/자진퇴사-자발적-퇴사-실업급여-예외-사유' },
    { badge: '해고', title: '해고 부당해고 징계해고 실업급여 수급 조건', desc: '해고 유형별 실업급여 가능 여부 비교', href: '/w/해고-부당해고-징계해고-실업급여-해고예고수당' },
    { badge: '전체', title: '퇴사유형별 실업급여 수급 자격 한눈에 비교', desc: '권고사직, 자진퇴사, 해고, 계약만료 비교', href: '/w/실업급여-퇴사유형별-수급-자격-권고사직-자진퇴사-해고' },
  ],

  sources: [
    { name: '고용보험법 제58조 (구직급여의 수급 요건)', url: 'https://www.law.go.kr/법령/고용보험법', org: '법제처' },
    { name: '실업급여 안내', url: 'https://www.ei.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePb0201Info.do', org: '고용보험' },
    { name: '고용노동부 실업급여 FAQ', url: 'https://www.moel.go.kr', org: '고용노동부' },
  ],
}

export default data
