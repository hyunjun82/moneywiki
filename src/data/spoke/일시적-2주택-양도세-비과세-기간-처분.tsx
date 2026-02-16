import Link from 'next/link'
import type { SpokeData } from './types'
import { SpokeTable, TipBox, FormulaBox, RateCards } from '@/components/spoke/SpokeBlocks'

// --- Table data ---
const PERIOD_HISTORY_ROWS = [
  ['2018.9.14~2019.12.16', '조정→조정 2년, 그 외 3년'],
  ['2019.12.17~2022.5.9', '조정→조정 1년 (강화)'],
  ['2022.5.10~2022.12.31', '조정→조정 2년 (완화)'],
  ['2023.1.12~현재', '지역 구분 없이 3년 (통일)'],
]

const CHECKLIST_ROWS = [
  ['종전주택 보유기간', '1년 이상 보유 후 신규주택 취득', '필수'],
  ['종전주택 거주요건', '조정지역: 2년 거주 / 비조정: 2년 보유', '필수'],
  ['처분 기한', '신규주택 취득일부터 3년 이내', '필수'],
  ['양도가액', '12억원 이하 전액 비과세', '12억 초과 시 초과분 과세'],
  ['세대 요건', '1세대(동일 세대원 포함)', '필수'],
]

// --- Spoke Data ---
const data: SpokeData = {
  slug: '일시적-2주택-양도세-비과세-기간-처분',

  meta: {
    title: '일시적 2주택 양도세 비과세 기간과 처분 조건',
    description: '일시적 2주택 양도세 비과세를 받으려면 3년 내 종전주택을 팔아야 해요. 처분 기한, 거주 요건, 비과세 조건까지 정리했어요.',
    keywords: ['일시적 2주택 양도세 비과세', '일시적 2주택 비과세 기간', '일시적 2주택 처분 조건', '일시적 2주택 양도세'],
    ogTitle: '일시적 2주택 양도세 비과세 기간과 처분 조건 | 머니위키',
    ogDescription: '3년 처분 기한, 거주 요건, 비과세 체크리스트 총정리',
  },

  hub: {
    url: '/w/다주택양도세-중과유예-세율-절세-전략',
    name: '다주택자 양도세 중과 유예 2026 세율과 절세 방법',
  },

  breadcrumb: ['세금', '일시적 2주택 비과세'],

  hero: {
    badge: '2026년 기준',
    h1: <>일시적 2주택 <span className="text-[#1E3A5F]">양도세 비과세</span> 기간과 처분 조건</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          이사 때문에 집이 두 채가 됐는데, 양도세를 안 내려면 언제까지 팔아야 할까요?
          <strong className="text-neutral-800"> 일시적 2주택 특례를 쓰면 양도세 0원</strong>이 가능해요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          <a href="https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7707&mi=2308" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">국세청</a>에서 안내하는 처분 기한과 요건을 꼼꼼히 정리했어요.
          다주택자 전체 절세 전략은 <Link href="/w/다주택양도세-중과유예-세율-절세-전략" className="text-blue-600 hover:underline">다주택자 양도세 가이드</Link>에서 확인하세요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '올인원',
      desc: '다주택자 양도세 중과·유예·절세 전체 가이드',
    },
  },

  toc: [
    { id: 's1', text: '일시적 2주택 양도세 비과세는 뭔가요?' },
    { id: 's2', text: '일시적 2주택 비과세 기간은 얼마나 되나요?' },
    { id: 's3', text: '일시적 2주택 처분 조건은 뭔가요?' },
    { id: 's4', text: '일시적 2주택 양도세는 얼마인가요?' },
    { id: 's5', text: '자주 묻는 질문' },
  ],

  sections: [
    {
      id: 's1',
      number: '01',
      heading: '일시적 2주택 양도세 비과세는 뭔가요?',
      subtitle: '이사를 위해 잠깐 2주택이 된 경우 세금을 면제해 주는 제도예요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            일시적 2주택 비과세란, 1주택자가 이사 등의 이유로 새 집을 먼저 사서 일시적으로 2주택이 된 경우에 <strong>종전 주택을 팔 때 양도세를 면제</strong>해 주는 제도예요.
            핵심은 &lsquo;일시적&rsquo;이라는 거예요. 두 채를 계속 갖고 있으려는 게 아니라, 이사 과정에서 잠깐 겹치는 상황을 인정해 주는 거예요.
            이 특례를 받으면 양도차익이 아무리 커도 양도세가 <strong>0원</strong>이에요(12억원 이하 기준).
            다주택자 양도세에서 가장 많이 활용되는 비과세 방법이에요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            이 제도는 <a href="https://www.law.go.kr/법령/소득세법시행령" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">소득세법 시행령 제155조</a>에 근거하고 있어요.
            1세대 1주택 비과세 요건(2년 보유, 조정지역은 2년 거주)을 충족한 상태에서 신규주택을 취득하고, 정해진 기간 내에 종전주택을 팔면 돼요.
            여기서 &lsquo;정해진 기간&rsquo;이 바로 처분 기한이에요. 이 기한을 놓치면 비과세를 받을 수 없어요.
          </p>

          <RateCards cards={[
            { value: '0원', label: '비과세 적용 시', lines: ['기한 내 종전주택 매도', '12억 이하 전액 면제'], highlight: '비과세', highlightColor: 'navy' as const },
            { value: '6~45%', label: '비과세 미적용 시', lines: ['기한 초과 또는 요건 미충족', '일반 양도세 과세'], highlight: '과세', highlightColor: 'orange' as const },
          ]} />

          <p className="text-neutral-600 mb-0">가장 중요한 처분 기한이 정확히 얼마인지 살펴볼게요.</p>
        </>
      ),
      bridgeCTA: { href: '#s2', badge: '기간', title: '종전주택을 언제까지 팔아야 할까?', desc: '처분 기한 3년의 정확한 기준', icon: 'clock' },
    },

    {
      id: 's2',
      number: '02',
      heading: '일시적 2주택 비과세 기간은 얼마나 되나요?',
      subtitle: '2023년부터 지역 구분 없이 3년으로 통일됐어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            2023년 1월 12일부터 일시적 2주택 처분 기한이 <strong>지역 구분 없이 3년</strong>으로 통일됐어요.
            이전에는 조정대상지역 주택은 1~2년, 비조정지역은 3년으로 달랐는데, 이제는 모두 같아요.
            기준일은 <strong>신규주택 취득일(잔금일 또는 등기이전일 중 빠른 날)</strong>이에요.
            예를 들어 2024년 3월 1일에 신규주택을 샀다면, 2027년 2월 28일까지 종전주택을 팔면 돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            취득세·종부세에서도 일시적 2주택 처분 기한을 3년으로 맞춰서, 세목별 혼란이 없어졌어요.
            다만 이 3년 기한은 &lsquo;양도일&rsquo; 기준이에요. 잔금을 3년째 되는 날까지 받아야 해요.
            잔금일이 하루라도 넘으면 비과세를 받을 수 없으니, 매도 일정을 넉넉하게 잡는 게 좋아요.
            아래 표에서 처분 기한의 변천 과정을 확인해 보세요.
          </p>

          <SpokeTable
            id="tbl-period"
            title="일시적 2주택 처분 기한 변천"
            subtitle="시기별 적용 기간 비교"
            headers={['적용 시기', '처분 기한']}
            rows={PERIOD_HISTORY_ROWS}
            highlightCol={1}
          />

          <TipBox title="3년 기한은 양도일(잔금일) 기준이에요">
            <p className="mb-0 leading-relaxed">
              매매계약 체결일이 아니라, 잔금을 받는 날이 양도일이에요.<br />
              등기이전일이 잔금일보다 빠르면 등기이전일이 양도일이 돼요.<br />
              기한이 촉박하면 잔금일을 앞당기는 협의를 하세요.
            </p>
          </TipBox>

          <p className="text-neutral-600 mb-0">기간 외에 충족해야 하는 다른 조건들도 살펴볼까요?</p>
        </>
      ),
      bridgeCTA: { href: '#s3', badge: '조건', title: '비과세 받으려면 뭘 더 갖춰야 할까?', desc: '보유·거주·세대 요건 체크리스트', icon: 'info' },
    },

    {
      id: 's3',
      number: '03',
      heading: '일시적 2주택 처분 조건은 뭔가요?',
      subtitle: '기간만이 아니라 5가지 요건을 다 갖춰야 해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            일시적 2주택 비과세는 처분 기한(3년)만 지키면 되는 게 아니에요. 총 <strong>5가지 핵심 요건</strong>을 모두 충족해야 해요.
            먼저 종전주택을 <strong>1년 이상 보유한 상태</strong>에서 신규주택을 취득해야 해요. 두 주택을 동시에 사면 안 돼요.
            또한 종전주택에 대한 1세대 1주택 비과세 요건도 갖춰야 해요.
            조정대상지역 주택은 2년 보유 + 2년 거주, 비조정지역은 2년 보유가 기본이에요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            양도가액이 <strong>12억원을 초과</strong>하는 고가주택이면 초과분에 대해서만 과세돼요.
            12억원 이하라면 양도차익 전액이 비과세예요. 세대원 전체가 1세대로 구성되어야 하고, 별도 세대인 자녀가 주택을 가지고 있으면 세대 합산 문제가 생길 수 있어요.
            아래 체크리스트에서 요건을 하나씩 확인해 보세요.
          </p>

          <FormulaBox lines={[
            { text: '// 비과세 요건 한줄 요약', comment: true },
            { text: '종전주택 1년+ 보유 → 신규주택 취득 → 3년 내 종전 매도', numbered: false },
            { text: '+ 종전주택 2년 보유(조정: 2년 거주) + 12억 이하 = 비과세', numbered: false },
          ]} />

          <SpokeTable
            id="tbl-check"
            title="일시적 2주택 비과세 요건 체크리스트"
            subtitle="모든 항목을 충족해야 비과세 적용"
            headers={['요건', '기준', '비고']}
            rows={CHECKLIST_ROWS}
          />

          <p className="text-neutral-600 mb-0">만약 비과세 요건을 충족하지 못하면 세금이 얼마나 나올까요?</p>
        </>
      ),
      bridgeCTA: { href: '#s4', badge: '세금', title: '비과세 못 받으면 세금이 얼마?', desc: '과세 시 세금과 절세 대안 확인', icon: 'calc' },
    },

    {
      id: 's4',
      number: '04',
      heading: '일시적 2주택 양도세는 얼마인가요?',
      subtitle: '비과세 실패 시 기본세율 6~45%가 적용돼요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            일시적 2주택 비과세 요건을 충족하면 양도세는 <strong>0원</strong>이에요(12억 이하 기준). 하지만 요건을 하나라도 놓치면 일반 양도세가 과세돼요.
            이때 적용되는 세율은 기본세율(6~45%)이에요. 현재는 다주택자 중과 유예 기간(~2026.5.9)이라 2주택이라도 기본세율만 적용되거든요.
            다만 유예가 끝나면 조정대상지역 주택은 기본세율 + 20%p 중과가 적용될 수 있어요.
            3년 기한을 놓쳐서 비과세를 못 받으면 수천만원~수억원의 세금이 발생할 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            비과세 기한이 지났더라도 <strong>장기보유특별공제</strong>를 받으면 세금을 줄일 수 있어요.
            유예 기간 중에는 1세대 1주택자가 아니어도 보유기간 3년 이상이면 연 2%씩 최대 30%까지 공제돼요.
            1세대 1주택 요건을 충족하면 보유 + 거주 기간에 따라 최대 80%까지 공제받을 수 있고요.
            비과세가 안 되더라도 공제를 최대한 활용하는 게 절세의 핵심이에요.
          </p>

          <TipBox title="3년 기한 놓쳤을 때 절세 방법">
            <p className="mb-0 leading-relaxed">
              종전주택 매도가 늦어질 것 같으면, 신규주택 전입을 미루는 방법도 있어요.<br />
              일부 경우에는 신규주택을 먼저 처분하고, 종전주택에 1세대 1주택 비과세를 적용하는 전략도 가능해요.<br />
              상황이 복잡하면 반드시 세무사와 상담하세요.
            </p>
          </TipBox>

          <FormulaBox lines={[
            { text: '// 비과세 실패 시 절세 체크', comment: true },
            { text: '1. 유예 기간 내 매도 → 기본세율 적용', numbered: true },
            { text: '2. 장기보유특별공제 최대화 (보유 10년 = 20%)', numbered: true },
            { text: '3. 필요경비(취득세, 중개보수, 인테리어 등) 최대 인정', numbered: true },
            { text: '4. 양도 시기 조절로 과세표준 구간 낮추기', numbered: true },
          ]} />

          <p className="text-neutral-600 mb-0">더 궁금한 점은 아래 자주 묻는 질문에서 확인하세요.</p>
        </>
      ),
      bridgeCTA: { href: '/w/다주택양도세-중과유예-세율-절세-전략', badge: '절세 가이드', title: '다주택자 절세 전략 전체 보기', desc: '중과 유예·배제·공제 총정리', icon: 'grid', primary: true },
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
      question: '일시적 2주택 비과세는 분양권이나 입주권에도 적용되나요?',
      answer: '2021년 1월 1일부터 분양권도 주택 수에 포함돼요. 분양권을 취득해서 2주택이 된 경우에도 일시적 2주택 특례가 적용될 수 있지만, 취득 시점과 완공 시점에 따라 요건이 달라지니 세무사에게 확인하세요.',
    },
    {
      question: '부부가 각각 1주택씩 보유하면 일시적 2주택인가요?',
      answer: '부부는 같은 세대로 봐요. 부부가 각각 1주택씩 가지고 있으면 1세대 2주택이에요. 혼인 합가로 2주택이 된 경우에는 혼인일부터 5년 이내에 먼저 양도하는 주택에 대해 비과세 특례가 적용돼요.',
    },
  ],

  relatedSpokes: [
    { badge: '세금', title: '2주택자 양도세 비과세 조건 세율과 계산 방법', desc: '2주택자 양도세 전체 가이드', href: '/w/2주택자-양도세-비과세-조건-세율-계산' },
    { badge: '세금', title: '조정대상지역 다주택자 양도세 중과세율과 비과세', desc: '조정지역 여부에 따른 세금 차이', href: '/w/조정대상지역-다주택자-양도세-중과세율-비과세' },
  ],

  sources: [
    { name: '양도소득세 개요', url: 'https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7707&mi=2308', org: '국세청' },
    { name: '소득세법 시행령 제155조', url: 'https://www.law.go.kr/법령/소득세법시행령', org: '법제처' },
    { name: '일시적 2주택 처분기한 연장', url: 'https://www.mois.go.kr/frt/bbs/type010/commonSelectBoardArticle.do?bbsId=BBSMSTR_000000000008&nttId=97906', org: '행정안전부' },
  ],
}

export default data
