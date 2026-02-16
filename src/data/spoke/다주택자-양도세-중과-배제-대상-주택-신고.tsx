import Link from 'next/link'
import type { SpokeData } from './types'
import { SpokeTable, TipBox, FormulaBox, RateCards } from '@/components/spoke/SpokeBlocks'

// --- Table data ---
const EXCLUSION_ROWS = [
  ['수도권 밖 3억 이하', '기준시가 3억원 이하', '읍·면 소재 또는 비수도권'],
  ['장기일반민간임대', '8년 이상 임대 등록', '임대료 증액 5% 이내'],
  ['상속주택 (5년 이내)', '피상속인 사망일부터 5년', '상속개시일 기준'],
  ['감정원 매입임대', '10년 이상 임대 + 기준 충족', '공공성 강한 임대주택'],
  ['이농주택·귀농주택', '농어촌 소재 주택', '대지 660㎡ 이하'],
  ['문화재 주택', '문화재보호법 지정', '보존 의무 주택'],
]

const REPORT_DOC_ROWS = [
  ['양도소득세 예정신고서', '홈택스 또는 세무서', '양도일 포함 달 말일+2개월'],
  ['매매계약서 사본', '양도·취득 각 1부', '실거래가 확인용'],
  ['취득 시 영수증', '취득세, 중개보수 등', '필요경비 증빙'],
  ['감가상각비 자료', '건물분 해당 시', '감가상각 적용 시'],
  ['중과 배제 증빙', '임대사업자 등록증 등', '배제 대상 입증용'],
]

// --- Spoke Data ---
const data: SpokeData = {
  slug: '다주택자-양도세-중과-배제-대상-주택-신고',

  meta: {
    title: '다주택자 양도세 중과 배제 대상 주택과 신고 방법',
    description: '다주택자 양도세 중과에서 빠지는 주택 종류와 신고 방법을 정리했어요. 수도권 밖 3억 이하, 장기임대, 상속주택 등 중과 배제 대상과 서류를 확인하세요.',
    keywords: ['다주택자 양도세 중과 배제', '양도세 중과 배제 대상', '양도세 중과 배제 주택', '다주택자 양도세 신고 방법'],
    ogTitle: '다주택자 양도세 중과 배제 대상 주택과 신고 방법 | 머니위키',
    ogDescription: '중과에서 빠지는 주택 6가지와 신고 서류 총정리',
  },

  hub: {
    url: '/w/다주택양도세-중과유예-세율-절세-전략',
    name: '다주택자 양도세 중과 유예 2026 세율과 절세 방법',
  },

  breadcrumb: ['세금', '양도세 중과 배제'],

  hero: {
    badge: '2026년 기준',
    h1: <>다주택자 양도세 <span className="text-[#1E3A5F]">중과 배제</span> 대상 주택과 신고 방법</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          다주택자라고 무조건 중과세율을 내야 하는 건 아니에요.
          <strong className="text-neutral-800"> 특정 주택은 중과 대상에서 빠져서</strong> 기본세율(6~45%)로 양도할 수 있어요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          <a href="https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7707&mi=2308" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">국세청</a>에서 정한 중과 배제 대상 주택 종류부터 신고 서류까지 한 번에 정리했어요.
          전체 절세 전략은 <Link href="/w/다주택양도세-중과유예-세율-절세-전략" className="text-blue-600 hover:underline">다주택자 양도세 가이드</Link>에서 확인하세요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '올인원',
      desc: '다주택자 양도세 중과·유예·절세 전체 가이드',
    },
  },

  toc: [
    { id: 's1', text: '다주택자 양도세 중과 배제가 뭔가요?' },
    { id: 's2', text: '양도세 중과 배제 대상은 누구인가요?' },
    { id: 's3', text: '양도세 중과 배제되는 주택은 어떤 건가요?' },
    { id: 's4', text: '다주택자 양도세 신고 방법은 뭔가요?' },
    { id: 's5', text: '자주 묻는 질문' },
  ],

  sections: [
    {
      id: 's1',
      number: '01',
      heading: '다주택자 양도세 중과 배제가 뭔가요?',
      subtitle: '중과세율 대신 기본세율을 적용받는 제도예요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            중과 배제란, 다주택자라도 특정 조건을 충족하면 <strong>중과세율(+20~30%p) 대신 기본세율(6~45%)</strong>로 양도세를 낼 수 있는 제도예요.
            현재 2026년 5월 9일까지는 모든 다주택자에게 중과 유예가 적용되고 있지만, 유예가 끝나면 중과 배제 여부가 매우 중요해져요.
            중과 배제 주택은 주택 수 산정에서도 빠지기 때문에, 나머지 주택의 세금에도 영향을 줘요.
            쉽게 말해 3채 중 1채가 중과 배제 대상이면, 나머지 2채 기준으로 세금이 계산돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            중과 배제와 비과세는 다른 개념이에요. 비과세는 세금이 0원이지만, 중과 배제는 기본세율로 세금을 내는 거예요.
            다만 중과세율이 최대 75%까지 올라갈 수 있는 것과 비교하면 기본세율 적용만으로도 세금이 절반 가까이 줄어들어요.
            또한 중과 배제 주택을 양도할 때는 <strong>장기보유특별공제도 받을 수 있어요</strong>.
          </p>

          <RateCards cards={[
            { value: '기본세율', label: '중과 배제 주택', lines: ['6~45% 적용', '장기공제 가능'], highlight: '절세', highlightColor: 'navy' as const },
            { value: '+20~30%p', label: '중과 적용 주택', lines: ['최대 75%', '장기공제 배제'], highlight: '부담', highlightColor: 'orange' as const },
          ]} />

          <p className="text-neutral-600 mb-0">그렇다면 구체적으로 어떤 경우에 중과 배제를 받을 수 있을까요?</p>
        </>
      ),
      bridgeCTA: { href: '#s2', badge: '대상', title: '누가 중과 배제를 받을 수 있을까?', desc: '중과 배제 적용 조건과 대상 확인', icon: 'info' },
    },

    {
      id: 's2',
      number: '02',
      heading: '양도세 중과 배제 대상은 누구인가요?',
      subtitle: '주택 자체의 조건이 핵심이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            중과 배제는 사람이 아니라 <strong>주택 자체의 조건</strong>으로 판단해요.
            즉, 다주택자 본인이 특별한 자격을 갖춰야 하는 게 아니라, 양도하는 주택이 배제 대상에 해당하면 돼요.
            대표적으로 수도권 밖 기준시가 3억원 이하 주택, 장기일반민간임대주택, 상속받은 주택(5년 이내) 등이 있어요.
            이런 주택을 팔 때는 다주택자라도 기본세율이 적용돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            주의할 점은, 중과 배제 대상 주택은 <a href="https://www.law.go.kr/법령/소득세법시행령" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">소득세법 시행령 제167조의3</a>에 구체적으로 열거되어 있어요.
            법에 나열된 유형에 해당해야만 배제를 받을 수 있고, 유사하다고 해서 자의적으로 적용할 수 없어요.
            또한 장기임대주택의 경우 임대 기간, 임대료 인상률 등 추가 요건이 있으니 꼼꼼히 확인해야 해요.
          </p>

          <FormulaBox lines={[
            { text: '// 중과 배제 판단 순서', comment: true },
            { text: '1. 양도하는 주택이 배제 대상 유형에 해당하는지 확인', numbered: true },
            { text: '2. 해당 유형의 세부 요건(기준시가, 임대기간 등) 충족 여부 확인', numbered: true },
            { text: '3. 증빙 서류 준비 (임대사업자 등록증, 상속 서류 등)', numbered: true },
            { text: '4. 양도세 신고 시 중과 배제 적용 신청', numbered: true },
          ]} />

          <TipBox title="중과 배제 vs 주택 수 제외는 달라요">
            <p className="mb-0 leading-relaxed">
              중과 배제는 &lsquo;해당 주택을 팔 때 기본세율 적용&rsquo;이에요.<br />
              주택 수 제외는 &lsquo;다른 주택을 팔 때 이 주택을 세지 않음&rsquo;이에요.<br />
              둘 다 해당하는 주택(예: 상속주택)이 있으니, 세무사와 확인하세요.
            </p>
          </TipBox>

          <p className="text-neutral-600 mb-0">이제 중과 배제되는 주택의 종류를 구체적으로 살펴볼게요.</p>
        </>
      ),
      bridgeCTA: { href: '#s3', badge: '주택 종류', title: '배제되는 주택은 어떤 것들?', desc: '6가지 중과 배제 주택 유형 정리', icon: 'grid' },
    },

    {
      id: 's3',
      number: '03',
      heading: '양도세 중과 배제되는 주택은 어떤 건가요?',
      subtitle: '6가지 대표 유형을 정리했어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            소득세법 시행령에서 정한 주요 중과 배제 주택 유형은 6가지예요.
            가장 흔한 건 <strong>수도권 밖 기준시가 3억원 이하 주택</strong>이에요. 비수도권에 저가 주택을 갖고 있다면 중과 걱정 없이 팔 수 있어요.
            <strong>장기일반민간임대주택</strong>도 많이 활용되는데, 8년 이상 임대 등록하고 임대료 인상을 5% 이내로 유지해야 해요.
            상속주택은 피상속인 사망일부터 5년 이내에 양도하면 중과 배제가 적용돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            이 외에도 감정원 매입임대주택, 이농·귀농주택, 문화재 주택 등이 있어요.
            각 유형마다 세부 요건이 다르니, 본인 주택이 어디에 해당하는지 정확히 확인해야 해요.
            특히 장기임대의 경우 임대 의무기간을 채우지 못하면 배제가 취소되고 중과세가 추징될 수 있어요.
            아래 표에서 유형별 조건을 한눈에 비교해 보세요.
          </p>

          <SpokeTable
            id="tbl-exclusion"
            title="양도세 중과 배제 주택 6가지 유형"
            subtitle="소득세법 시행령 제167조의3 기준"
            headers={['유형', '핵심 조건', '비고']}
            rows={EXCLUSION_ROWS}
          />

          <p className="text-neutral-600 mb-0">배제 대상에 해당한다면, 양도세 신고는 어떻게 해야 할까요?</p>
        </>
      ),
      bridgeCTA: { href: '#s4', badge: '신고', title: '양도세 신고는 어떻게?', desc: '신고 기한, 필요 서류, 절차 안내', icon: 'clock' },
    },

    {
      id: 's4',
      number: '04',
      heading: '다주택자 양도세 신고 방법은 뭔가요?',
      subtitle: '양도일 2개월 내 예정신고가 기본이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            양도세 신고는 잔금일(또는 등기이전일 중 빠른 날)이 속하는 달의 말일부터 <strong>2개월 이내</strong>에 해야 해요.
            예를 들어 3월 15일에 잔금을 받았으면 5월 31일까지가 신고 기한이에요.
            <a href="https://hometax.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">홈택스</a>에서 전자신고하거나, 관할 세무서에 직접 방문해서 신고할 수 있어요.
            기한을 넘기면 무신고가산세(20%)와 납부불성실가산세가 붙으니 꼭 기한을 지키세요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            중과 배제를 적용받으려면 신고 시 해당 증빙 서류를 함께 제출해야 해요.
            임대사업자 등록증, 상속 관련 서류, 기준시가 확인서 등 배제 유형에 맞는 서류를 준비하세요.
            증빙이 없으면 세무서에서 중과 배제를 인정하지 않을 수 있어요.
            아래 표에서 기본 신고 서류를 확인하세요.
          </p>

          <SpokeTable
            id="tbl-docs"
            title="양도세 신고 시 필요 서류"
            subtitle="중과 배제 적용 시 추가 서류 포함"
            headers={['서류', '발급처/형태', '비고']}
            rows={REPORT_DOC_ROWS}
          />

          <TipBox title="세무사 대리 신고도 가능해요">
            <p className="mb-0 leading-relaxed">
              양도세 계산이 복잡하거나 중과 배제 여부가 불확실하면 세무사에게 맡기는 게 안전해요.<br />
              신고 대리 수수료는 보통 30~50만원 수준이에요.<br />
              잘못 신고해서 가산세를 내는 것보다 훨씬 경제적이에요.
            </p>
          </TipBox>

          <p className="text-neutral-600 mb-0">더 궁금한 점은 아래 자주 묻는 질문을 확인해 보세요.</p>
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
      question: '다주택자 양도세 중과 배제는 자동 적용되나요?',
      answer: '아니요, 신고 시 본인이 직접 중과 배제를 신청하고 증빙 서류를 제출해야 해요. 자동으로 적용되지 않으니 반드시 신고 때 챙기세요.',
    },
    {
      question: '양도세 중과 배제 주택도 주택 수에 포함되나요?',
      answer: '유형에 따라 달라요. 상속주택(5년 이내)이나 수도권 밖 3억 이하 주택은 주택 수 산정에서도 제외되는 경우가 있어요. 하지만 모든 배제 주택이 주택 수에서 빠지는 건 아니니 유형별로 확인하세요.',
    },
  ],

  relatedSpokes: [
    { badge: '세금', title: '3주택자 양도세 중과세율 계산과 비과세 조건', desc: '3주택 중과세율과 절세 방법', href: '/w/3주택자-양도세-중과세율-계산-비과세' },
    { badge: '세금', title: '다주택자 장기보유특별공제 적용 조건 공제율과 계산', desc: '장기보유특별공제 활용법', href: '/w/다주택자-장기보유특별공제-적용-조건-공제율-계산' },
  ],

  sources: [
    { name: '양도소득세 개요', url: 'https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7707&mi=2308', org: '국세청' },
    { name: '소득세법 시행령', url: 'https://www.law.go.kr/법령/소득세법시행령', org: '법제처' },
    { name: '홈택스 양도세 신고', url: 'https://hometax.go.kr', org: '국세청' },
  ],
}

export default data
