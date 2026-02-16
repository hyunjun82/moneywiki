import Link from 'next/link'
import type { SpokeData } from './types'
import { SpokeTable, TipBox, FormulaBox, RateCards } from '@/components/spoke/SpokeBlocks'

// --- Table data ---
const AREA_LIST_ROWS = [
  ['서울', '전 지역 (25개 구)', '2025.10.15 재지정'],
  ['경기 과천', '과천시 전역', '지속 지정'],
  ['경기 성남', '분당·수정·중원구', '지속 지정'],
  ['경기 하남', '하남시 전역', '지속 지정'],
  ['경기 광명', '광명시 전역', '지속 지정'],
  ['경기 수원', '영통·장안·팔달구', '부분 지정'],
  ['경기 안양', '동안구', '부분 지정'],
  ['경기 용인', '수지구', '부분 지정'],
  ['경기 의왕', '의왕시 전역', '지속 지정'],
]

const SURCHARGE_COMPARE_ROWS = [
  ['2주택', '기본세율 + 20%p', '최대 65%'],
  ['3주택 이상', '기본세율 + 30%p', '최대 75%'],
  ['1년 미만 보유', '70%', '단기 양도'],
  ['1~2년 보유', '60%', '단기 양도'],
]

// --- Spoke Data ---
const data: SpokeData = {
  slug: '조정대상지역-다주택자-양도세-중과세율-비과세',

  meta: {
    title: '조정대상지역 다주택자 양도세 중과세율과 비과세',
    description: '조정대상지역에서 다주택자가 주택을 팔면 양도세가 중과돼요. 현재 지정 지역, 중과세율, 비과세 방법까지 한 번에 정리했어요.',
    keywords: ['조정대상지역 다주택자 양도세', '조정대상지역 양도세 중과세율', '조정대상지역 양도세 비과세', '조정대상지역 다주택자'],
    ogTitle: '조정대상지역 다주택자 양도세 중과세율과 비과세 | 머니위키',
    ogDescription: '서울·경기 조정지역 목록, 중과세율, 비과세 조건 총정리',
  },

  hub: {
    url: '/w/다주택양도세-중과유예-세율-절세-전략',
    name: '다주택자 양도세 중과 유예 2026 세율과 절세 방법',
  },

  breadcrumb: ['세금', '조정대상지역 양도세'],

  hero: {
    badge: '2026년 기준',
    h1: <><span className="text-[#1E3A5F]">조정대상지역</span> 다주택자 양도세 중과세율과 비과세</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          내 집이 조정대상지역에 있는지, 있으면 양도세가 얼마나 달라지는지 궁금하시죠?
          <strong className="text-neutral-800"> 조정대상지역 다주택자는 기본세율에 20~30%p가 추가</strong>되는 중과 대상이에요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          다만 2026년 5월 9일까지는 중과가 유예되어 있어요.
          현재 지정 지역 목록부터 중과세율, 비과세 방법까지 정리했어요.
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
    { id: 's1', text: '조정대상지역 다주택자 양도세는 어떻게 되나요?' },
    { id: 's2', text: '조정대상지역 양도세 중과세율은 얼마인가요?' },
    { id: 's3', text: '조정대상지역 양도세 비과세도 받을 수 있나요?' },
    { id: 's4', text: '조정대상지역 다주택자는 누구인가요?' },
    { id: 's5', text: '자주 묻는 질문' },
  ],

  sections: [
    {
      id: 's1',
      number: '01',
      heading: '조정대상지역 다주택자 양도세는 어떻게 되나요?',
      subtitle: '중과 유예 중이지만 2026.5.10부터 달라져요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            조정대상지역에 있는 주택을 다주택자가 팔면 양도세가 <strong>중과</strong>돼요.
            중과란 기본세율(6~45%)에 추가 세율(2주택 +20%p, 3주택 +30%p)을 더하는 거예요.
            하지만 현재 <strong>2022년 5월 10일~2026년 5월 9일</strong>까지 중과가 유예되어 있어서, 이 기간에 팔면 기본세율만 적용돼요.
            유예 기간에는 장기보유특별공제도 받을 수 있어서 세금이 훨씬 줄어들어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            조정대상지역이 아닌 곳의 주택은 애초에 중과 대상이 아니에요.
            그래서 내 집이 조정대상지역에 있는지 아닌지가 세금에 매우 큰 영향을 줘요.
            2025년 10월 15일 서울 전역이 재지정되면서 조정대상지역이 다시 늘어났어요.
            조정지역 해제/지정은 수시로 바뀌니 <a href="https://www.molit.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">국토교통부</a> 고시를 확인하세요.
          </p>

          <RateCards cards={[
            { value: '기본세율', label: '유예 기간 (~2026.5.9)', lines: ['6~45%', '장기공제 가능'], highlight: '현재', highlightColor: 'navy' as const },
            { value: '중과세율', label: '유예 종료 후', lines: ['+20~30%p', '장기공제 배제'], highlight: '주의', highlightColor: 'orange' as const },
          ]} />

          <p className="text-neutral-600 mb-0">유예가 끝나면 정확히 세율이 얼마나 오르는지 살펴볼게요.</p>
        </>
      ),
      bridgeCTA: { href: '#s2', badge: '세율', title: '중과세율은 정확히 얼마?', desc: '주택 수별 중과세율 비교', icon: 'calc' },
    },

    {
      id: 's2',
      number: '02',
      heading: '조정대상지역 양도세 중과세율은 얼마인가요?',
      subtitle: '2주택 +20%p, 3주택 +30%p예요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            조정대상지역 내 주택을 양도하는 다주택자에게는 기본세율에 추가 세율이 붙어요.
            <strong>2주택자는 +20%p</strong>가 추가되어 최대 65%, <strong>3주택 이상은 +30%p</strong>가 추가되어 최대 75%까지 올라가요.
            여기에 지방소득세(양도세의 10%)까지 합치면 3주택자는 실질적으로 <strong>82.5%</strong>까지 세금을 낼 수 있어요.
            양도차익의 대부분이 세금으로 나간다는 뜻이에요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            또한 보유기간이 짧으면 단기 양도세율(1년 미만 70%, 1~2년 60%)이 적용되는데, 중과세율과 비교해서 더 큰 쪽을 내야 해요.
            중과 적용 시에는 장기보유특별공제가 <strong>완전히 배제</strong>돼요.
            유예 기간 중에는 최대 30%까지 공제받을 수 있는데, 중과 시에는 0%예요.
            세율 차이 + 공제 배제가 겹치면서 실제 세금은 2~3배 차이가 날 수 있어요.
          </p>

          <SpokeTable
            id="tbl-surcharge"
            title="조정대상지역 다주택자 중과세율"
            subtitle="유예 종료(2026.5.10) 이후 적용"
            headers={['구분', '세율', '최대 세율']}
            rows={SURCHARGE_COMPARE_ROWS}
            highlightCol={2}
          />

          <p className="text-neutral-600 mb-0">이런 중과를 피하려면 비과세를 받을 방법이 있는지 확인해야겠죠.</p>
        </>
      ),
      bridgeCTA: { href: '#s3', badge: '비과세', title: '조정지역에서도 비과세가 가능할까?', desc: '1세대 1주택·일시적 2주택 특례 활용', icon: 'info' },
    },

    {
      id: 's3',
      number: '03',
      heading: '조정대상지역 양도세 비과세도 받을 수 있나요?',
      subtitle: '거주 요건을 갖추면 가능해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            조정대상지역이라도 <strong>1세대 1주택 비과세</strong>는 받을 수 있어요.
            다만 비조정지역보다 요건이 까다로워요. 비조정지역은 2년 보유만 하면 되지만, 조정대상지역은 <strong>2년 보유 + 2년 실거주</strong>가 필요해요.
            거주 기간은 전입신고 기준이고, 보유 기간 중 아무 때나 2년을 채우면 돼요.
            양도가액 12억원 이하이면 전액 비과세, 초과분만 과세돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            <strong>일시적 2주택 특례</strong>도 조정대상지역에서 적용돼요.
            종전주택에 2년 거주 요건을 충족하고, 신규주택 취득 후 3년 이내에 종전주택을 팔면 비과세를 받을 수 있어요.
            중과 배제 대상 주택(상속주택, 지방 3억 이하 등)도 활용할 수 있고요.
            구체적인 비과세 조건은 <Link href="/w/일시적-2주택-양도세-비과세-기간-처분" className="text-blue-600 hover:underline">일시적 2주택 비과세</Link> 글에서 확인하세요.
          </p>

          <FormulaBox lines={[
            { text: '// 조정대상지역 비과세 요건', comment: true },
            { text: '1세대 1주택: 2년 보유 + 2년 거주 + 12억 이하', numbered: false },
            { text: '일시적 2주택: 위 요건 + 3년 내 종전 매도', numbered: false },
            { text: '', numbered: false },
            { text: '// 비조정지역 비과세 요건 (비교)', comment: true },
            { text: '1세대 1주택: 2년 보유(거주 불필요) + 12억 이하', numbered: false },
          ]} />

          <TipBox title="조정지역 해제되면 거주 요건이 풀려요">
            <p className="mb-0 leading-relaxed">
              주택을 취득한 후 조정대상지역에서 해제되면 거주 요건이 사라져요.<br />
              반대로 취득 후 조정지역으로 지정되면, 지정 전 취득분은 기존 요건이 적용돼요.<br />
              조정지역 지정/해제 시점과 주택 취득 시점의 관계가 중요해요.
            </p>
          </TipBox>

          <p className="text-neutral-600 mb-0">그런데 조정대상지역은 정확히 어디이고, 다주택자 기준은 어떻게 되나요?</p>
        </>
      ),
      bridgeCTA: { href: '#s4', badge: '지역 목록', title: '현재 조정대상지역은 어디?', desc: '서울·경기 지정 지역 전체 목록', icon: 'grid' },
    },

    {
      id: 's4',
      number: '04',
      heading: '조정대상지역 다주택자는 누구인가요?',
      subtitle: '지정 지역 안에 주택 2채 이상이면 해당돼요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            조정대상지역 다주택자란, 1세대가 주택을 <strong>2채 이상 보유</strong>하고 있으면서 그중 <strong>조정대상지역에 있는 주택을 양도</strong>하는 사람이에요.
            다른 주택이 비조정지역에 있어도 상관없어요. 양도하는 주택이 조정지역에 있기만 하면 중과 대상이에요.
            현재 조정대상지역은 서울 전역과 경기도 일부 지역이에요.
            2025년 10월 15일부터 서울 25개 구 전체가 다시 조정대상지역으로 지정됐어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            경기도는 과천, 성남(분당·수정·중원구), 하남, 광명, 수원(영통·장안·팔달구), 안양(동안구), 용인(수지구), 의왕이 지정되어 있어요.
            부산도 해운대·연제·동래·남·부산진·수영구와 기장군이 지정된 적이 있지만, 현재 상태는 국토교통부 고시로 확인해야 해요.
            조정대상지역은 부동산 시장 상황에 따라 수시로 바뀌니, 매도 계획이 있다면 반드시 최신 목록을 확인하세요.
          </p>

          <SpokeTable
            id="tbl-area"
            title="주요 조정대상지역 목록"
            subtitle="2026년 2월 기준"
            headers={['지역', '범위', '비고']}
            rows={AREA_LIST_ROWS}
          />

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
      question: '조정대상지역 해제 후 다시 지정되면 양도세는 어떻게 되나요?',
      answer: '해제 기간 중에 양도하면 중과가 적용되지 않아요. 재지정 이후에 양도하면 다시 중과 대상이 돼요. 다만 유예 기간(~2026.5.9) 중이라면 재지정과 무관하게 기본세율이 적용돼요.',
    },
    {
      question: '조정대상지역에 오피스텔을 가지고 있으면 다주택자인가요?',
      answer: '주거용 오피스텔은 실질 용도에 따라 주택 수에 포함될 수 있어요. 주택임대사업자로 등록했거나 실제 거주용으로 사용 중이면 주택으로 봐요. 업무용 오피스텔은 주택 수에서 제외돼요.',
    },
  ],

  relatedSpokes: [
    { badge: '세금', title: '다주택자 양도세 중과 배제 대상 주택과 신고 방법', desc: '중과에서 빠지는 주택 종류', href: '/w/다주택자-양도세-중과-배제-대상-주택-신고' },
    { badge: '세금', title: '일시적 2주택 양도세 비과세 기간과 처분 조건', desc: '3년 처분 기한과 비과세 요건', href: '/w/일시적-2주택-양도세-비과세-기간-처분' },
  ],

  sources: [
    { name: '양도소득세 개요', url: 'https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7707&mi=2308', org: '국세청' },
    { name: '다주택자 세금 지식', url: 'https://www.pwc.com/kr/ko/insights/issue-brief/one-point-tax-05.html', org: '삼일PwC' },
    { name: '조정대상지역 양도세', url: 'https://www.taxwatch.co.kr/article/tax/2025/10/15/0003', org: '택스워치' },
  ],
}

export default data
