import Link from 'next/link'
import type { SpokeData } from './types'
import { SpokeTable, TipBox, SpokeChecklist, SpokeCompareCards, SpokeWarnBox } from '@/components/spoke/SpokeBlocks'

// --- Spoke Data ---
const data: SpokeData = {
  slug: '계약직-육아휴직-사용-조건-급여-기간',

  meta: {
    title: '계약직 육아휴직 사용 조건 급여 기간 | 계약만료 갱신 기대권 기준',
    description: '계약직도 육아휴직 사용할 수 있어요. 조건, 급여, 기간부터 계약 만료와의 관계까지 2026년 기준으로 정리했어요.',
    keywords: ['계약직 육아휴직', '계약직 육아휴직 조건', '계약직 육아휴직 급여', '계약직 육아휴직 기간'],
    ogTitle: '계약직 육아휴직 사용 조건 급여 기간 | 계약만료 갱신 기대권 기준 | 머니위키',
    ogDescription: '계약직도 육아휴직 쓸 수 있어요. 조건, 급여, 기간 정리.',
  },

  hub: {
    url: '',
    name: '',
  },

  breadcrumb: ['근로/노동', '계약직 육아휴직'],

  hero: {
    badge: '2026년 기준',
    h1: <>계약직도 가능한 <span className="text-[#1E3A5F]">육아휴직</span> 사용 조건 급여 기간</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          계약직이라 육아휴직 못 쓴다는 얘기를 듣고 불안해하셨나요?
          <strong className="text-neutral-800"> 아니에요. 계약직도 육아휴직 쓸 수 있어요.</strong>
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          남녀고용평등법에서 기간제 근로자의 육아휴직 사용을 명시적으로 보장하고 있어요.
          정규직과 조건도 급여도 똑같고, 계약 만료와도 별개예요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          조건부터 급여, 계약기간과 관계까지 필요한 부분만 골라 읽어도 돼요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '',
      desc: '',
    },
  },

  toc: [
    { id: 's1', text: '계약직 육아휴직 조건은 어떻게 되나요?' },
    { id: 's2', text: '계약직 육아휴직 급여는 얼마인가요?' },
    { id: 's3', text: '계약직 육아휴직 기간은 얼마나 되나요?' },
    { id: 's4', text: '계약직 육아휴직 계약 만료되면 어떻게 되나요?' },
    { id: 's5', text: '자주 묻는 질문' },
  ],

  sections: [
    // --- Section 01: 조건 ---
    {
      id: 's1',
      number: '01',
      heading: '계약직 육아휴직 조건은 어떻게 되나요?',
      subtitle: '만 8세 이하 자녀, 고용보험 180일, 해당 사업장 6개월 이상',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            계약직 육아휴직 조건은 정규직과 거의 같아요.
            만 8세 이하 또는 초등학교 2학년 이하 자녀가 있어야 하고, 고용보험 가입기간이 180일 이상이어야 해요.
            여기에 <strong>해당 사업장에서 6개월 이상 근무</strong>했다는 조건이 하나 더 있어요.
            <a href="https://www.moel.go.kr/policy/policyinfo/reclamat/list7.do" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline"> 고용노동부</a>에서
            확인한 기준이에요.
          </p>

          <SpokeChecklist items={[
            { text: '만 8세 이하 또는 초등학교 2학년 이하 자녀 있음', done: true },
            { text: '고용보험 가입기간 180일 이상 (이전 직장 포함 통산)', done: true, note: '약 6개월' },
            { text: '해당 사업장에서 6개월 이상 근무', done: true, note: '6개월 미만 시 사업주 거부 가능' },
            { text: '육아휴직 신청서 제출 (휴직 30일 전)', done: false },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed mt-4">
            고용보험 180일은 이전 직장 기간까지 합쳐서 계산해요.
            하지만 해당 사업장 6개월 근무는 현재 직장에서만 따져요.
            6개월이 안 됐으면 사업주가 거부할 수 있어요.
          </p>

          <p className="text-neutral-600 mb-0">조건은 확인했고, 실제로 월급이 얼마나 나오는지가 더 중요하죠.</p>
        </>
      ),
      bridgeCTA: { href: '#s2', badge: '급여 계산', title: '월급 80%가 아니라 100%라고?', desc: '2026년 육아휴직 급여 기준 확인', icon: 'calc' },
    },

    // --- Section 02: 급여 ---
    {
      id: 's2',
      number: '02',
      heading: '계약직 육아휴직 급여는 얼마인가요?',
      subtitle: '1~6개월 통상임금 100%, 7개월~ 80%, 전액 선지급',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            계약직도 정규직과 <strong>동일한 육아휴직 급여</strong>를 받아요.
            2026년부터는 사후지급금 제도가 폐지되어 육아휴직 급여를 전액 매달 받아요.
            1~3개월은 통상임금의 100% (상한 월 250만원), 4~6개월도 100% (상한 월 200만원), 7개월부터는 80% (상한 월 160만원)예요.
            하한액은 모든 기간 월 70만원으로 보장돼요.
          </p>

          <SpokeTable
            id="salary-table"
            title="계약직 육아휴직 급여 기준 (2026년)"
            subtitle="기간별 급여율과 상한·하한 금액"
            headers={['기간', '급여율', '상한액', '하한액']}
            rows={[
              ['1~3개월', '통상임금의 100%', '월 250만원', '월 70만원'],
              ['4~6개월', '통상임금의 100%', '월 200만원', '월 70만원'],
              ['7개월~', '통상임금의 80%', '월 160만원', '월 70만원'],
            ]}
            highlightCol={1}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed mt-4">
            통상임금 기준으로 계산하고, 상한액 초과 시 상한액을 지급하고 하한액 미만 시 하한액을 보장해요.
            6+6 부모육아휴직제도도 동일하게 적용돼요.
            같은 자녀에 대해 생후 18개월 이내에 부모가 각각 사용하면 더 높은 급여율을 적용받을 수 있어요.
          </p>

          <TipBox title="2026년 사후지급금 폐지 — 전액 선지급">
            <p className="mb-0 leading-relaxed">
              기존에는 육아휴직 급여의 25%를 복귀 후 6개월 근무 시 사후지급했어요.<br />
              2026년부터는 <strong>전액 선지급</strong>으로 매달 100% 지급돼요.<br />
              자세한 급여 계산은 <a href="https://www.work24.go.kr/cm/cntnts/cntntsView.do?cntntsId=1565&menuId=M_02_02_05_02" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">고용노동부 워크넷</a>에서 확인하세요.
            </p>
          </TipBox>

          <p className="text-neutral-600 mb-0 mt-4">급여 기준을 알았으니, 육아휴직 기간이 얼마나 되는지 볼까요?</p>
        </>
      ),
      bridgeCTA: { href: '#s3', badge: '기간 확인', title: '1년 이상도 쓸 수 있을까?', desc: '기본 기간, 연장, 분할 가능 횟수', icon: 'clock' },
    },

    // --- Section 03: 기간 ---
    {
      id: 's3',
      number: '03',
      heading: '계약직 육아휴직 기간은 얼마나 되나요?',
      subtitle: '기본 1년, 최대 1년 6개월, 분할 최대 4회',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            계약직 육아휴직 기간도 정규직과 같아요.
            자녀 1명당 <strong>1년</strong>이 기본이고, 부모가 각각 3개월 이상씩 사용하면 최대 <strong>1년 6개월</strong>까지 연장할 수 있어요.
            분할 사용도 가능한데, 최대 <strong>4회(3회 분할)</strong>까지 나눠 쓸 수 있어요.
            예를 들어 6개월 → 복귀 → 3개월 → 복귀 → 3개월 이런 식으로 총 1년을 사용할 수 있어요.
          </p>

          <SpokeCompareCards cards={[
            {
              title: '기본 육아휴직',
              subtitle: '자녀 1명당',
              items: ['1년', '한 번에 사용', '분할 가능 (최대 4회)'],
              recommended: false
            },
            {
              title: '연장 육아휴직',
              subtitle: '부모 각각 3개월+',
              items: ['최대 1년 6개월', '부모 모두 사용 시', '추가 6개월'],
              recommended: true,
              recLabel: '확대'
            },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed mt-4">
            <strong>핵심은 계약기간 만료와 별개</strong>라는 거예요.
            육아휴직 중에 계약이 만료되어도 급여는 계속 지급돼요.
            단, 계약 갱신이 안 되면 복귀 자체가 어려울 수 있어요.
          </p>

          <p className="text-neutral-600 mb-0">그런데 한 가지 주의할 게 있어요. 계약 만료와 관련된 부분이에요.</p>
        </>
      ),
      bridgeCTA: { href: '#s4', badge: '계약 만료', title: '육아휴직 중 계약 만료되면?', desc: '급여 지급, 복귀, 갱신 여부 확인', icon: 'info' },
    },

    // --- Section 04: 계약 만료 ---
    {
      id: 's4',
      number: '04',
      heading: '계약직 육아휴직 계약 만료되면 어떻게 되나요?',
      subtitle: '급여는 계속 지급, 복귀는 갱신 협의 필요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            육아휴직 중에 계약이 만료되어도 <strong>급여는 계속 지급</strong>돼요.
            육아휴직 급여는 고용보험에서 나오기 때문에 계약 만료와 관계없이 끝까지 받을 수 있어요.
            하지만 복귀할 때는 <strong>계약 갱신 여부를 사업주와 협의</strong>해야 해요.
            <a href="https://easylaw.go.kr/CSP/CnpClsMain.laf?csmSeq=1734&ccfNo=4&cciNo=1&cnpClsNo=1" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline"> 법제처 찾기쉬운 생활법령</a>에서
            확인한 내용이에요.
          </p>

          <SpokeWarnBox title="주의사항">
            <p className="mb-0 leading-relaxed">
              육아휴직 중 계약이 만료되어도 <strong>급여는 계속 지급</strong>돼요.<br />
              하지만 복귀 시 <strong>계약 갱신 여부는 사업주와 협의</strong>해야 해요.<br />
              계약이 갱신되지 않으면 복귀 자체가 어려울 수 있으니, 육아휴직 신청 전에 계약 갱신 가능성을 미리 확인하세요.<br /><br />
              <strong>육아휴직 기간은 계약기간(사용기간)에서 제외</strong>돼요.<br />
              예: 2년 계약 중 1년 육아휴직 → 남은 계약기간 1년은 복귀 후 사용
            </p>
          </SpokeWarnBox>

          <p className="text-neutral-600 mb-4 leading-relaxed mt-4">
            계약이 갱신되지 않으면 복귀가 어렵지만, 급여는 끝까지 받을 수 있어요.
            육아휴직 신청 전에 계약 갱신 가능성을 미리 확인하는 게 좋아요.
            계약 갱신이 불투명하다면 육아휴직 기간을 조정하거나, 분할 사용을 고려할 수도 있어요.
          </p>

          <p className="text-neutral-600 mb-0">여기까지 계약직 육아휴직의 핵심을 모두 정리했어요. 추가 궁금한 점은 FAQ에서 확인하세요.</p>
        </>
      ),
      bridgeCTA: { href: '#s5', badge: 'FAQ', title: '더 궁금한 점이 있다면?', desc: '자주 묻는 질문 확인', icon: 'info' },
    },

    // --- Section 05: FAQ ---
    {
      id: 's5',
      number: '05',
      heading: '자주 묻는 질문',
      subtitle: '계약직 육아휴직에 대해 자주 묻는 질문이에요',
      content: null, // FAQ 자동 렌더링
    },
  ],

  faq: [
    {
      question: '계약직 육아휴직 중 계약이 만료되면 복귀는 어떻게 되나요?',
      answer: '육아휴직 급여는 계속 지급돼요. 단, 복귀 시 계약 갱신 여부는 사업주와 협의해야 해요. 계약이 갱신되지 않으면 복귀 자체가 어려울 수 있지만, <strong>육아휴직 급여 자체는 끝까지 받을 수 있어요.</strong> 육아휴직 신청 전에 계약 갱신 가능성을 미리 확인하는 게 좋아요.',
    },
    {
      question: '계약직 육아휴직 신청은 언제까지 해야 하나요?',
      answer: '육아휴직 개시 <strong>30일 전</strong>까지 회사에 신청서를 제출해야 해요. 긴급한 사유가 있으면 7일 전까지도 가능해요. 신청서는 회사 인사팀에서 받거나 고용노동부 워크넷에서 다운로드할 수 있어요.',
    },
  ],

  relatedSpokes: [
    { badge: '기간', title: '육아휴직 기간 연장 분할 사용 방법', desc: '최대 1년 6개월, 분할 횟수 제한', href: '/w/육아휴직-기간-연장-분할-사용' },
    { badge: '급여', title: '육아휴직 급여 계산 지급일 세금 실수령액', desc: '기간별 급여 상한, 지급일, 비과세 여부', href: '/w/육아휴직-급여-계산-지급일-세금-실수령액' },
  ],

  sources: [
    { name: '남녀고용평등과 일·가정 양립 지원에 관한 법률', url: 'https://www.law.go.kr/법령/남녀고용평등과일과가정양립지원에관한법류', org: '국가법령정보센터' },
    { name: '육아휴직 급여 제도', url: 'https://www.work24.go.kr/cm/cntnts/cntntsView.do?cntntsId=1565&menuId=M_02_02_05_02', org: '고용노동부 워크넷' },
    { name: '기간제 근로자 육아휴직', url: 'https://easylaw.go.kr/CSP/CnpClsMain.laf?csmSeq=1734&ccfNo=4&cciNo=1&cnpClsNo=1', org: '법제처 찾기쉬운 생활법령' },
  ],
}

export default data
