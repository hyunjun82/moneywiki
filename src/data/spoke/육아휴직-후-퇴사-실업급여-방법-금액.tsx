import Link from 'next/link'
import type { SpokeData } from './types'
import { SpokeFlow, SpokeWarnBox, SpokeChecklist, FormulaBox, RateCards, TipBox } from '@/components/spoke/SpokeBlocks'

// --- Spoke Data ---
const data: SpokeData = {
  slug: '육아휴직-후-퇴사-실업급여-방법-금액',

  meta: {
    title: '육아휴직 후 퇴사하면 실업급여 받는 방법과 금액',
    description: '육아휴직 후 퇴사 시 실업급여 수급 가능 여부, 신청 방법, 지급 금액까지 한 번에 정리해요.',
    keywords: ['육아휴직 후 퇴사', '육아휴직 후 실업급여', '육아휴직 실업급여 받는 방법', '육아휴직 실업급여 금액'],
    ogTitle: '육아휴직 후 퇴사하면 실업급여 받는 방법과 금액 | 머니위키',
    ogDescription: '퇴사 유형별 수급 가능 여부, 신청 절차, 지급 금액까지 한 번에.',
  },

  hub: {
    url: '',
    name: '',
  },

  breadcrumb: ['근로/노동', '육아휴직 후 퇴사'],

  hero: {
    badge: '2026년 기준',
    h1: <>육아휴직 후 <span className="text-emerald-600">퇴사하면 실업급여</span> 받는 방법과 금액</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          육아휴직이 끝나가는데 복직보단 퇴사가 고민된다면, 가장 먼저 떠오르는 건 &lsquo;실업급여 받을 수 있을까?&rsquo;일 거예요.
          자발적 퇴사라도 육아 사유가 있으면 실업급여를 받을 수 있는 경우가 많아요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          <a href="https://www.ei.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">고용24</a>와{' '}
          <a href="https://www.moel.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">고용노동부</a> 기준으로
          퇴사 유형별 수급 가능 여부부터 신청 방법, 지급 금액까지 정리했어요.
          먼저 받을 수 있는지부터 확인해볼게요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '',
      desc: '',
    },
  },

  toc: [
    { id: 's1', text: '육아휴직 후 퇴사하면 어떻게 되나요?' },
    { id: 'flow1', text: '퇴사→실업급여 전체 흐름도', sub: true },
    { id: 's2', text: '육아휴직 후 실업급여를 받을 수 있나요?' },
    { id: 's3', text: '육아휴직 실업급여 받는 방법은 뭔가요?' },
    { id: 'checklist1', text: '신청 시 준비 서류 체크리스트', sub: true },
    { id: 's4', text: '육아휴직 실업급여 금액은 얼마인가요?' },
    { id: 'cards1', text: '수급기간별 예상 총액', sub: true },
    { id: 's5', text: '육아휴직 후 퇴사 자주 묻는 질문' },
  ],

  sections: [
    // --- Section 01: 퇴사 시 어떻게 되나 ---
    {
      id: 's1',
      number: '01',
      heading: '육아휴직 후 퇴사하면 어떻게 되나요?',
      subtitle: '육아휴직 중 또는 종료 후 언제든 퇴사는 가능해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            육아휴직 중이거나 종료 후에 퇴사하는 건 법적으로 아무 문제 없어요.
            다만 퇴사 사유가 자발적인지 비자발적인지에 따라 <strong>실업급여 수급 가능 여부</strong>가 달라져요.
            또한 육아휴직 급여 중 <strong>사후지급금(25%)</strong>은 복직 후 6개월 이상 근무해야 받을 수 있기 때문에,
            복직 없이 퇴사하면 사후지급금을 받을 수 없다는 점도 알아두세요.
          </p>

          <p className="text-neutral-600 mb-4 leading-relaxed">
            실업급여를 받으려면 고용보험 가입기간이 <strong>180일 이상</strong>이어야 하고,
            퇴사 사유가 비자발적이거나 정당한 육아 사유로 인정받아야 해요.
            육아휴직 후 퇴사를 고민할 땐 실업급여 수급 가능 여부와 사후지급금 포기를 함께 고려해야 해요.
            전체 흐름을 먼저 보면 이해가 쉬워요.
          </p>

          <SpokeFlow
            steps={[
              { icon: '📋', label: '육아휴직 종료', sub: '복직 or 퇴사 고민' },
              { icon: '🤔', label: '퇴사 사유 확인', sub: '비자발적? 자발적?' },
              { icon: '✅', label: '수급 요건 충족', sub: '고용보험 180일+' },
              { icon: '📝', label: '실업급여 신청', sub: '고용24 또는 방문' },
              { icon: '💰', label: '급여 지급', sub: '평균임금 60%' },
            ]}
          />

          <p className="text-neutral-600 mb-0 mt-4 leading-relaxed">
            퇴사 사유에 따라 실업급여를 받을 수도, 못 받을 수도 있으니 내 상황이 어디에 해당하는지 확인하는 게 중요해요.
            가장 궁금한 건 결국 &lsquo;내가 받을 수 있냐 없냐&rsquo;잖아요.
          </p>
        </>
      ),
      bridgeCTA: { href: '#s2', badge: '수급 조건', title: '내 퇴사 사유로 실업급여를 받을 수 있을까?', desc: '비자발적 퇴사와 육아 예외 인정 사유 확인', icon: 'info' },
    },

    // --- Section 02: 실업급여 받을 수 있나 ---
    {
      id: 's2',
      number: '02',
      heading: '육아휴직 후 실업급여를 받을 수 있나요?',
      subtitle: '비자발적 퇴사이거나 육아 사유로 예외 인정되면 가능해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            실업급여는 원칙적으로 <strong>비자발적 퇴사</strong>인 경우에만 받을 수 있어요.
            권고사직, 계약만료, 정리해고, 사업주 귀책사유 등이 해당돼요.
            그런데 자발적 퇴사라도 <strong>정당한 사유</strong>가 있으면 예외로 인정받을 수 있어요.
            특히 육아와 관련된 사유는 예외 인정 가능성이 높아요.
          </p>

          <SpokeWarnBox title="주의사항">
            <p className="mb-0 leading-relaxed">
              <strong>1. 만 8세 이하 자녀 육아</strong>: 업무 수행이 어려운 경우<br />
              <strong>2. 사업주 휴가/휴직 불허</strong>: 육아를 위해 요청했으나 거부된 경우<br />
              <strong>3. 임신/출산 관련 불이익</strong>: 직장 내 괴롭힘, 불합리한 처우 등<br /><br />
              예외 인정 여부는 고용센터에서 개별 판단하므로, 증빙 서류(휴가 신청서, 거부 문서 등)를 반드시 준비하세요.
              이런 서류가 없으면 인정받기 어려울 수 있어요.
            </p>
          </SpokeWarnBox>

          <FormulaBox lines={[
            { text: '// 실업급여 수급 가능 여부 판단', comment: true },
            { text: '1. 비자발적 퇴사 (권고사직, 계약만료, 정리해고 등) → 가능', numbered: true },
            { text: '2. 자발적 퇴사 + 육아 예외 사유 (만 8세 이하 자녀, 휴가 불허 등) → 가능', numbered: true },
            { text: '3. 자발적 퇴사 + 일반 사유 (이직, 진로 변경 등) → 불가', numbered: true },
            { text: '4. 고용보험 가입기간 180일 미만 → 모두 불가', numbered: true },
          ]} />

          <p className="text-neutral-600 mt-4 mb-4 leading-relaxed">
            고용보험 가입기간 180일 미만이면 퇴사 사유와 관계없이 실업급여를 받을 수 없어요.
            자발적 퇴사 중 예외 인정 사유는 <a href="https://www.ei.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">고용24</a>에서 확인 가능해요.
            받을 수 있다는 걸 알았으니, 그런데 한 가지 주의할 게 있어요.
          </p>
        </>
      ),
      bridgeCTA: { href: '#s3', badge: '신청 절차', title: '육아휴직 실업급여는 어떻게 신청하나요?', desc: '온라인 신청부터 필요 서류까지 완벽 정리', icon: 'clock' },
    },

    // --- Section 03: 신청 방법 ---
    {
      id: 's3',
      number: '03',
      heading: '육아휴직 실업급여 받는 방법은 뭔가요?',
      subtitle: '퇴직일 다음날부터 신청 가능하고, 매월 실업인정을 받아야 해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            실업급여는 <strong>퇴직일 다음날</strong>부터 신청할 수 있어요.
            온라인으로는 <a href="https://www.work24.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">고용24(work24.go.kr)</a>에서,
            오프라인으로는 가까운 고용센터를 방문해서 신청하면 돼요.
            신청 후에는 <strong>4주마다</strong> 고용센터에서 실업인정을 받아야 계속 지급받을 수 있어요.
          </p>

          <p className="text-neutral-600 mb-4 leading-relaxed">
            퇴직 후 <strong>12개월 이내</strong>에 반드시 접수해야 하니 기한을 놓치지 마세요.
            실업인정은 재취업 활동(구직 신청, 면접 참여 등)을 했는지 확인하는 절차예요.
            정당한 사유 없이 실업인정일에 불참하거나 구직활동을 안 하면 급여가 중단될 수 있으니 주의하세요.
            이직확인서는 사업주가 고용센터에 직접 제출하는 서류라서 퇴사 전에 회사에 미리 요청해두는 게 좋아요.
          </p>

          <TipBox title="온라인 신청이 훨씬 빨라요">
            <p className="mb-0 leading-relaxed">
              <strong>고용24</strong>에서 온라인 신청하면 대기 없이 바로 접수 가능해요.
              공인인증서 또는 카카오/네이버 간편 인증으로 로그인하고, 구직급여 신청서를 작성한 뒤 통장 사본만 스캔해서 첨부하면 끝이에요.
              고용센터 방문은 온라인 신청이 어려운 경우에만 추천해요.
            </p>
          </TipBox>

          <SpokeChecklist
            items={[
              { text: '이직확인서 (사업주가 고용센터에 제출)', done: true, note: '퇴사 전에 회사에 요청하세요' },
              { text: '구직급여 신청서 (본인 작성)', done: false, note: '고용24 또는 고용센터에서 작성' },
              { text: '통장 사본 (급여 입금 계좌)', done: false, note: '스캔 또는 사진 첨부' },
              { text: '신분증 (본인 확인용)', done: false, note: '주민등록증, 운전면허증 등' },
            ]}
          />

          <p className="text-neutral-600 mt-4 mb-0 leading-relaxed">
            실제로 신청할 때 필요한 서류를 미리 챙겨두면 훨씬 수월해요.
            실제로 얼마나 받을 수 있는지 궁금하시죠?
          </p>
        </>
      ),
      bridgeCTA: { href: '#s4', badge: '지급 금액', title: '실업급여로 매달 얼마나 받을 수 있나요?', desc: '평균임금의 60%, 수급기간별 총액 확인', icon: 'calc' },
    },

    // --- Section 04: 실업급여 금액 ---
    {
      id: 's4',
      number: '04',
      heading: '육아휴직 실업급여 금액은 얼마인가요?',
      subtitle: '퇴직 전 3개월 평균임금의 60%를 받아요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            실업급여는 <strong>퇴직 전 3개월 평균임금의 60%</strong>를 받아요.
            2026년 기준으로 <strong>1일 상한액 68,100원(월 약 204만원)</strong>, <strong>하한액 66,048원</strong>이에요.
            수급기간은 나이와 고용보험 가입기간에 따라 최소 120일부터 최대 270일까지 차등 적용돼요.
            예를 들어 50세 미만, 가입기간 3~5년이면 180일 동안 받을 수 있어요.
          </p>

          <FormulaBox lines={[
            { text: '// 실업급여 금액 계산 공식', comment: true },
            { text: '1일 실업급여 = (퇴직 전 3개월 평균임금 ÷ 30일) × 60%', numbered: false },
            { text: '단, 1일 상한액 68,100원, 하한액 66,048원 적용 (2026년)', numbered: false },
            { text: '총 지급액 = 1일 실업급여 × 수급기간(일)', numbered: false },
          ]} />

          <RateCards
            cards={[
              { value: '120일', label: '50세 미만, 가입 1년 미만', lines: ['1일 68,100원 × 120일', '총 약 408만원'], highlight: '단기', highlightColor: 'orange' },
              { value: '180일', label: '50세 미만, 가입 3~5년', lines: ['1일 68,100원 × 180일', '총 약 612만원'], active: true },
              { value: '270일', label: '50세 이상, 가입 10년+', lines: ['1일 68,100원 × 270일', '총 약 918만원'], highlight: '최대', highlightColor: 'emerald' },
            ]}
          />

          <p className="text-xs text-neutral-400 mt-1">
            * 평균임금이 상한액을 초과하면 상한액만큼만 지급.<br />
            * 평균임금이 하한액에 못 미치면 하한액(66,048원) 보장.
          </p>

          <SpokeWarnBox title="주의사항">
            <p className="mb-0 leading-relaxed">
              <strong>퇴직 전 3개월 평균임금 300만원, 50세 미만, 가입기간 4년</strong><br />
              1일 평균임금: 300만원 ÷ 30일 = 10만원<br />
              1일 실업급여: 10만원 × 60% = 6만원 → 상한액 68,100원보다 낮으므로 6만원 지급<br />
              수급기간: 180일<br />
              총 지급액: 6만원 × 180일 = <strong>약 1,080만원</strong>
            </p>
          </SpokeWarnBox>

          <p className="text-neutral-600 mt-4 mb-0 leading-relaxed">
            실업급여 금액은 개인의 평균임금과 가입기간에 따라 달라지므로,{' '}
            <a href="https://www.ei.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">고용24 실업급여 계산기</a>에서
            내 조건에 맞는 예상 금액을 미리 계산해 보세요.
          </p>
        </>
      ),
      bridgeCTA: { href: '#s5', badge: '궁금증', title: '육아휴직 후 퇴사 자주 묻는 질문', desc: '추가 궁금증 해결하기', icon: 'info', primary: true },
    },

    // --- Section 05: FAQ ---
    {
      id: 's5',
      number: '05',
      heading: '육아휴직 후 퇴사 자주 묻는 질문',
      subtitle: '육아휴직 후 퇴사와 실업급여에 대해 자주 묻는 질문이에요',
      content: null,
    },
  ],

  faq: [
    {
      question: '육아휴직 후 퇴사하면 사후지급금은 어떻게 되나요?',
      answer: '육아휴직 급여의 <strong>25%</strong>는 복직 후 6개월 이상 근무해야 받을 수 있는 사후지급금이에요. 복직 없이 퇴사하면 사후지급금을 받을 수 없으니 주의하세요. 다만 <strong>2026년부터 사후지급금 제도가 폐지</strong>되어 급여 전액을 매달 받는 방식으로 변경된다는 정보도 있으니 고용노동부 공지를 확인하세요.',
    },
    {
      question: '육아휴직 실업급여와 육아휴직 급여를 동시에 받을 수 있나요?',
      answer: '아니요, <strong>동시에 받을 수 없어요</strong>. 육아휴직 급여는 육아휴직 기간 동안 받는 것이고, 실업급여는 퇴사 후 구직 기간 동안 받는 거예요. 육아휴직이 끝나고 퇴사한 이후에 실업급여를 신청할 수 있어요.',
    },
  ],

  relatedSpokes: [
    { badge: '급여', title: '육아휴직 급여 계산 지급일 세금 실수령액', desc: '기간별 급여 상한, 지급일, 비과세 여부', href: '/w/육아휴직-급여-계산-지급일-세금-실수령액' },
    { badge: '복귀', title: '육아휴직 복귀 불이익 신고 보호 규정', desc: '복직 거부, 해고 시 구제 방법', href: '/w/육아휴직-복귀-불이익-신고-보호-규정' },
  ],

  sources: [
    { name: '육아휴직 제도 안내', url: 'https://www.moel.go.kr', org: '고용노동부' },
    { name: '실업급여 신청 안내', url: 'https://www.ei.go.kr', org: '고용24' },
    { name: '고용보험 가입 및 실업급여', url: 'https://www.work24.go.kr', org: '워크넷' },
    { name: '육아휴직 법률정보', url: 'https://easylaw.go.kr', org: '찾기쉬운 생활법령정보' },
    { name: '육아휴직 후 퇴사 관련 정보', url: 'https://help.3o3.co.kr', org: '3O3' },
  ],
}

export default data
