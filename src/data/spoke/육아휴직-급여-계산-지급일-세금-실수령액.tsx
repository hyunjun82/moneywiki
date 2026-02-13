import Link from 'next/link'
import type { SpokeData } from './types'
import { FormulaBox, SpokeRateBars, SpokeTable, SpokeWarnBox, TipBox } from '@/components/spoke/SpokeBlocks'

// --- Table data ---
const BENEFIT_TABLE_ROWS = [
  ['1~3개월', '통상임금 100%', '250만원', '70만원'],
  ['4~6개월', '통상임금 100%', '200만원', '70만원'],
  ['7개월~종료', '통상임금 80%', '160만원', '70만원'],
]

const NET_TABLE_ROWS = [
  ['1~3개월', '250만원', '약 9,890원', '약 2,490,110원'],
  ['4~6개월', '200만원', '약 9,890원', '약 1,990,110원'],
  ['7개월~종료', '160만원', '약 9,890원', '약 1,590,110원'],
]

// --- Spoke Data ---
const data: SpokeData = {
  slug: '육아휴직-급여-계산-지급일-세금-실수령액',

  meta: {
    title: '육아휴직 급여 계산 지급일 세금 실수령액 | 월급 80% 상한액 기준',
    description: '육아휴직 급여 계산법, 지급일, 세금 비과세 여부, 실수령액까지 한 번에 정리해요.',
    keywords: ['육아휴직 급여 계산', '육아휴직 급여 지급일', '육아휴직 급여 세금', '육아휴직 급여 실수령액'],
    ogTitle: '육아휴직 급여 계산 지급일 세금 실수령액 | 월급 80% 상한액 기준 | 머니위키',
    ogDescription: '기간별 급여 상한, 신청 일정, 비과세 항목, 실수령액까지 한 번에.',
  },

  hub: {
    url: '',
    name: '',
  },

  breadcrumb: ['근로/노동', '육아휴직 급여 계산'],

  hero: {
    badge: '2026년 기준',
    h1: <><span className="text-[#1E3A5F]">육아휴직 급여</span> 계산 지급일 세금과 실수령액</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          육아휴직 신청서 내기 전에 머릿속으로 계산해 보셨을 거예요. 3개월엔 얼마, 6개월엔 또 얼마가 들어올지.
          상한액이 바뀌는 시점도 헷갈리고, 세금은 또 어떻게 빠지는지도 궁금하잖아요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          <a href="https://www.moel.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">고용노동부</a>와{' '}
          <a href="https://www.ei.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">고용24</a> 자료를 기준으로
          기간별 계산법부터 지급 시점, 비과세 여부, 실수령액까지 직접 정리했어요. 궁금한 부분부터 골라 읽어도 괜찮아요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '',
      desc: '',
    },
  },

  toc: [
    { id: 's1', text: '육아휴직 급여는 어떻게 계산하나요?' },
    { id: 'tbl1', text: '기간별 급여 상한/하한 표', sub: true },
    { id: 's2', text: '육아휴직 급여 지급일은 언제인가요?' },
    { id: 's3', text: '육아휴직 급여 세금은 얼마나 내나요?' },
    { id: 's4', text: '육아휴직 급여 실수령액은 얼마인가요?' },
    { id: 'tbl2', text: '기간별 실수령액 표', sub: true },
    { id: 's5', text: '육아휴직 급여 자주 묻는 질문' },
  ],

  sections: [
    // --- Section 01: 급여 계산 ---
    {
      id: 's1',
      number: '01',
      heading: '육아휴직 급여는 어떻게 계산하나요?',
      subtitle: '기간에 따라 지급 비율과 상한액이 달라요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            육아휴직 급여는 <strong>통상임금</strong>을 기준으로 계산해요.
            여기서 통상임금이란 기본급에 고정수당을 합한 금액이에요.
            다만 기간에 따라 지급 비율과 상한액이 달라지기 때문에, 내 월급이 높더라도 상한선이 있다는 점을 꼭 알아두세요.
            <a href="https://www.moel.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">고용노동부</a> 기준으로 2026년 현재 적용되는 급여 체계를 정리하면 아래와 같아요.
          </p>

          <FormulaBox lines={[
            { text: '// 육아휴직 급여 계산 3단계', comment: true },
            { text: '1. 내 통상임금 확인 (기본급 + 고정수당)', numbered: true },
            { text: '2. 해당 기간의 지급 비율 적용 (100% 또는 80%)', numbered: true },
            { text: '3. 상한액과 비교 후 적은 금액이 내 급여', numbered: true },
          ]} />

          <SpokeTable
            id="tbl1"
            title="육아휴직 기간별 급여 상한과 하한"
            subtitle="고용보험 가입 180일 이상 기준"
            headers={['기간', '지급 비율', '월 상한액', '월 하한액']}
            rows={BENEFIT_TABLE_ROWS}
          />

          <p className="text-xs text-neutral-400 mt-1">
            * 고용보험 가입기간 180일 미만이면 육아휴직 급여를 받을 수 없어요.<br />
            * 6+6 부모육아휴직제 이용 시 부모 각각 통상임금 100%(상한 450만원)까지 받을 수 있어요.
          </p>

          <p className="text-neutral-600 mt-4 mb-0">자, 금액은 알겠는데 언제 들어오는지가 더 중요하잖아요.</p>
        </>
      ),
      bridgeCTA: { href: '#s2', badge: '지급일', title: '육아휴직 급여는 언제 입금되나요?', desc: '신청 시기와 지급 일정 확인하기', icon: 'clock' },
    },

    // --- Section 02: 지급일 ---
    {
      id: 's2',
      number: '02',
      heading: '육아휴직 급여 지급일은 언제인가요?',
      subtitle: '매월 신청하고, 신청 후 약 2주 이내에 입금돼요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            육아휴직 급여는 자동으로 나오는 게 아니라 <strong>매달 직접 신청</strong>해야 해요.
            육아휴직이 시작된 날로부터 1개월이 지나야 첫 신청이 가능하고, 신청하면 보통 <strong>2주 이내</strong>에 통장으로 입금돼요.
            해당 월의 육아휴직분은 다음 달 말일까지 신청해야 하니까 기한을 놓치지 않도록 주의하세요.
            그리고 육아휴직이 끝난 후에도 <strong>12개월 이내</strong>에 신청을 마쳐야 급여를 받을 수 있어요.
          </p>

          <SpokeRateBars bars={[
            { label: '1개월 차', rate: '신청 가능 시작', width: '20%' },
            { label: '2~12개월', rate: '매월 신청 필수', width: '80%' },
            { label: '종료 후', rate: '12개월 이내 최종 신청', width: '60%' },
          ]} />

          <p className="text-neutral-600 mt-4 mb-4 leading-relaxed">
            <a href="https://www.ei.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">고용24</a>에서 온라인으로 신청하면 방문 없이도 처리할 수 있어요.
            사업주가 먼저 육아휴직 확인서를 제출하면 그 다음에 본인이 급여 신청서를 작성하면 돼요.
            신청 후 심사를 거쳐 약 2주 이내에 지정한 통장으로 입금되고, 만약 서류에 문제가 있으면 고용센터에서 연락이 와요.
          </p>

          <SpokeWarnBox title="주의사항">
            <p className="mb-0 leading-relaxed">
              해당 월 육아휴직분은 <strong>다음 달 말일까지</strong> 신청해야 해요.
              기한을 넘기면 해당 월 급여를 받지 못할 수 있으니 꼭 캘린더에 표시해 두세요.
              육아휴직 종료 후에도 <strong>12개월 이내</strong>에 모든 신청을 마쳐야 급여를 받을 수 있어요.
            </p>
          </SpokeWarnBox>

          <p className="text-neutral-600 mt-4 mb-0">여기까지 보면 한 가지 궁금한 게 생기죠. 이 급여에서 세금은 얼마나 빠질까요?</p>
        </>
      ),
      bridgeCTA: { href: '#s3', badge: '세금', title: '육아휴직 급여에서 세금이 빠지나요?', desc: '비과세 여부와 4대보험 정리', icon: 'info' },
    },

    // --- Section 03: 세금 ---
    {
      id: 's3',
      number: '03',
      heading: '육아휴직 급여 세금은 얼마나 내나요?',
      subtitle: '소득세는 0원이에요. 다만 건강보험료가 소액 나가요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            육아휴직 급여는 <strong>비과세 소득</strong>이에요.
            <a href="https://www.nts.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">국세청</a> 기준으로 소득세법과 고용보험법에 따라 소득세와 지방소득세 모두 0원이에요.
            그래서 세금 걱정 없이 급여 전액을 받을 수 있다고 보면 돼요.
            다만 4대보험 중 일부는 납부하거나 유예해야 하는 부분이 있어서, 정확한 공제 항목을 알아두면 좋아요.
          </p>

          <SpokeTable
            id="tbl-tax"
            title="육아휴직 급여 세금 및 4대보험 공제 여부"
            subtitle="2026년 기준"
            headers={['항목', '금액', '비고']}
            rows={[
              ['소득세', '0원', '비과세 소득'],
              ['지방소득세', '0원', '비과세 소득'],
              ['고용보험', '0원', '근로자 납부 면제'],
              ['건강보험', '약 9,890원', '하한액 기준 부과'],
              ['국민연금', '선택', '납부유예 가능'],
            ]}
          />

          <p className="text-xs text-neutral-400 mt-1">
            * 건강보험료는 장기요양보험료 포함 금액.<br />
            * 국민연금은 납부유예 신청 시 0원, 납부 시 본인이 100% 부담.
          </p>

          <TipBox title="국민연금은 납부유예가 가능해요">
            <p className="mb-0 leading-relaxed">
              육아휴직 중에는 국민연금 <strong>납부유예</strong>를 신청할 수 있어요.
              유예하면 그 기간은 가입기간에서 빠지지만, 나중에 추후납부로 채울 수 있어요.
              만약 유예 없이 납부하면 <strong>근로자 본인이 100% 부담</strong>하게 되니까(사업주 부담분 없음), 대부분 유예를 선택해요.
            </p>
          </TipBox>

          <p className="text-neutral-600 mt-4 mb-0">금액을 알았으니 실수령액으로 넘어갈게요.</p>
        </>
      ),
      bridgeCTA: { href: '#s4', badge: '실수령액', title: '결국 내 통장에 얼마가 들어오나요?', desc: '기간별 실수령액 한눈에 보기', icon: 'calc' },
    },

    // --- Section 04: 실수령액 ---
    {
      id: 's4',
      number: '04',
      heading: '육아휴직 급여 실수령액은 얼마인가요?',
      subtitle: '통상임금 300만원 기준, 기간별 실수령액을 정리했어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            육아휴직 급여에서 빠지는 건 사실상 <strong>건강보험료 약 9,890원</strong> 정도가 전부예요.
            소득세가 0원이고 고용보험도 면제니까, 급여 상한액에서 건강보험료만 빼면 실수령액이 나와요.
            통상임금 300만원인 직장인을 기준으로 기간별 실수령액을 정리하면 아래와 같아요.
            본인의 통상임금이 상한액보다 낮다면 상한액 대신 본인 통상임금에 비율을 곱한 금액에서 건보료를 빼면 돼요.
          </p>

          <SpokeTable
            id="tbl2"
            title="육아휴직 기간별 실수령액"
            subtitle="통상임금 300만원 기준, 국민연금 납부유예 시"
            headers={['기간', '급여(상한 적용)', '건강보험료', '실수령액']}
            rows={NET_TABLE_ROWS}
            highlightCol={3}
          />

          <p className="text-xs text-neutral-400 mt-1">
            * 국민연금 납부유예 기준. 납부유예 안 하면 추가 공제돼요.<br />
            * 6+6 부모육아휴직제 이용 시 상한 450만원까지 가능.
          </p>

          <SpokeWarnBox title="주의사항">
            <p className="mb-0 leading-relaxed">
              부부가 같은 자녀에 대해 각각 육아휴직을 쓰면, 처음 6개월간 통상임금 100%를 받을 수 있고 <strong>상한액도 450만원</strong>으로 올라가요.
              통상임금이 400만원인 경우 일반 육아휴직은 4개월 차부터 200만원 상한에 걸리지만, 6+6을 쓰면 400만원 전액을 받을 수 있어요.
              부부 합산으로 보면 수백만원 차이가 나니까 꼭 활용하세요.
            </p>
          </SpokeWarnBox>

          <p className="text-neutral-600 mt-4 mb-0">그런데 한 가지 주의할 게 있어요. 복직 후 사후지급금 같은 추가 궁금증은 FAQ에서 확인해 보세요.</p>
        </>
      ),
      bridgeCTA: { href: '#s5', badge: '궁금증', title: '육아휴직 급여 자주 묻는 질문', desc: '복직 후 사후지급금 등 추가 궁금증 해결', icon: 'info', primary: true },
    },

    // --- Section 05: FAQ ---
    {
      id: 's5',
      number: '05',
      heading: '육아휴직 급여 자주 묻는 질문',
      subtitle: '육아휴직 급여에 대해 자주 묻는 질문이에요',
      content: null,
    },
  ],

  faq: [
    {
      question: '육아휴직 급여 사후지급금은 무엇인가요?',
      answer: '육아휴직 급여의 <strong>25%</strong>는 복직 후 6개월 이상 근무해야 받을 수 있는 사후지급금이에요. 매달 받는 급여는 75%이고, 나머지 25%는 복직 후 한꺼번에 지급돼요. 복직 없이 퇴사하면 사후지급금을 받을 수 없으니 주의하세요.',
    },
    {
      question: '육아휴직 급여를 받으면서 다른 소득이 있으면 어떻게 되나요?',
      answer: '육아휴직 중 다른 소득이 월 <strong>150만원</strong>을 초과하면 급여가 감액되거나 지급이 중단될 수 있어요. 소규모 부업이나 프리랜서 활동도 해당되니까, 반드시 고용센터에 미리 확인하는 게 안전해요.',
    },
  ],

  relatedSpokes: [
    { badge: '육아', title: '6+6 부모육아휴직제 급여 금액과 신청', desc: '부모 동시 사용 시 최대 월 450만원', href: '/w/6+6-부모육아휴직제-급여-금액-신청' },
    { badge: '육아', title: '육아휴직 기간 연장 분할 사용 방법', desc: '최대 1년 6개월, 분할 횟수 제한', href: '/w/육아휴직-기간-연장-분할-사용' },
  ],

  sources: [
    { name: '육아휴직 급여 안내', url: 'https://www.ei.go.kr', org: '고용24' },
    { name: '육아휴직 제도 안내', url: 'https://www.moel.go.kr', org: '고용노동부' },
    { name: '비과세 소득 안내', url: 'https://www.nts.go.kr', org: '국세청' },
    { name: '육아휴직 법률정보', url: 'https://easylaw.go.kr', org: '찾기쉬운 생활법령정보' },
  ],
}

export default data
