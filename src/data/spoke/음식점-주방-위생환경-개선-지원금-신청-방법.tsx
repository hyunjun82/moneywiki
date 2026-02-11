import Link from 'next/link'
import type { SpokeData } from './types'
import { SpokeChecklist, SpokeTable, FormulaBox, RateCards, SpokeStepCards, SpokeCompareCards, SpokeFlow, SpokeRateBars } from '@/components/spoke/SpokeBlocks'

// --- Table data ---
const REGION_SUPPORT_ROWS = [
  ['창원시', '최대 200만원', '70%', '30%'],
  ['인천광역시', '최대 200만원', '90%', '10%'],
  ['청양군', '최대 500만원', '60%', '40%'],
  ['거제시', '최대 200만원', '85%', '15%'],
]

const ELIGIBLE_ITEMS_ROWS = [
  ['주방 구조 변경', '벽체 이동, 구획 변경', '지원 가능'],
  ['위생설비 보수/설치', '싱크대, 작업대, 배수시설', '지원 가능'],
  ['바닥·벽·천장 교체', '타일, 페인트, 방수 공사', '지원 가능'],
  ['간판 교체', '점포 외부 간판', '지원 가능'],
  ['가스레인지', '이동 가능한 동산', '지원 불가'],
  ['냉장고·환풍기', '이동 가능한 동산', '지원 불가'],
]

// --- Spoke Data ---
const data: SpokeData = {
  slug: '음식점-주방-위생환경-개선-지원금-신청-방법',

  meta: {
    title: '음식점 주방 위생환경 개선 지원금 신청 방법',
    description: '음식점 주방 위생환경 개선 지원금이 지역별로 최대 500만원까지 나온다는 거 아시나요? 신청 대상부터 지원 금액, 신청 방법과 필요 서류까지 알려드려요',
    keywords: ['음식점 주방 위생환경 개선 지원금', '주방 위생 지원금 신청', '음식점 시설개선 지원 대상', '주방 개선 지원 서류'],
    ogTitle: '음식점 주방 위생환경 개선 지원금 신청 방법 | 머니위키',
    ogDescription: '지역별 최대 500만원, 신청 방법과 서류까지 한 번에.',
  },

  hub: {
    url: '/w/소상공인-시설개선-지원금-종류-신청-방법-2026',
    name: '소상공인 시설개선 지원금',
  },

  breadcrumb: ['소상공인', '주방 위생환경 개선'],

  hero: {
    badge: '2026년 기준',
    h1: <><span className="text-[#1E3A5F]">음식점 주방 위생환경 개선</span> 지원금 신청 방법</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          주방 바닥이 낡아서 위생 점검 때마다 걱정이고, 배수시설도 교체하고 싶은데 비용이 부담되셨죠?
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          <strong className="text-neutral-800">지자체 음식점 주방 위생환경 개선 지원금</strong>은 주방 구조 변경, 위생설비 보수, 바닥·벽·천장 교체 등의 비용을 지역별로 <strong className="text-neutral-800">최대 500만원</strong>까지 지원해요.
          <a href="https://www.changwon.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">창원시</a>, <a href="https://www.insupport.or.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">인천광역시</a>, 청양군 등 전국 각 지자체에서 운영하고 있어요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          쉽게 말해서, 인테리어처럼 고정된 시설은 지원되지만 냉장고·가스레인지처럼 옮길 수 있는 동산은 안 돼요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          먼저 우리 지역에서 받을 수 있는 금액부터 확인해볼게요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '시설개선',
      desc: '소상공인 시설개선 지원금 전체 보기',
    },
  },

  toc: [
    { id: 's1', text: '음식점 주방 위생환경 개선 지원금이 뭔가요?' },
    { id: 'tbl1', text: '지역별 지원 금액 비교', sub: true },
    { id: 's2', text: '주방 위생 지원금 신청 대상은 누구인가요?' },
    { id: 's3', text: '음식점 시설개선 지원 항목은 뭐가 있나요?' },
    { id: 'tbl2', text: '지원 가능/불가 항목', sub: true },
    { id: 's4', text: '주방 개선 지원 신청은 어떻게 하나요?' },
    { id: 's5', text: '자주 묻는 질문' },
  ],

  sections: [
    // --- Section 01: 제도 설명 → SpokeChecklist + SpokeTable ---
    {
      id: 's1',
      number: '01',
      heading: '음식점 주방 위생환경 개선 지원금이 뭔가요?',
      subtitle: '지자체마다 최대 200만원~500만원까지 지원해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            <strong>음식점 주방 위생환경 개선 지원금</strong>은 각 지자체(시·군·구)에서 관내 소상공인 음식점의 위생 수준 향상을 위해 주방 시설 개선 비용을 지원하는 사업이에요.
            창업 6개월~1년 이상 정상 영업 중인 음식점이 주방 구조 변경, 바닥·벽 공사, 위생설비 교체 등을 할 때 공사비의 일부를 보조금으로 받을 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            지원 금액은 지역마다 다른데, 창원시는 공급가액의 70%를 최대 200만원까지, 인천은 90%를 최대 200만원까지, 청양군은 60%를 최대 500만원까지 지원해요.
            <a href="https://www.changwon.go.kr/cwportal/biz/11151/11261/11266.web" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">창원시 경제일자리국</a>과 <a href="https://www.insupport.or.kr/sub/?mcode=0401010400" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">인천소상공인종합지원센터</a> 공고 기준이에요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            주의할 점은, 냉장고·가스레인지·환풍기처럼 이동 가능한 동산은 지원 대상에서 제외된다는 거예요.
            고정 설비와 인테리어 공사만 가능해요.
          </p>

          <SpokeChecklist items={[
            { text: '창업 6개월~1년 이상 영업 중', done: true },
            { text: '관내(해당 지자체) 소재 음식점', done: true },
            { text: '주방 구조 변경·위생설비 개선', done: true },
            { text: '냉장고·가스레인지는 제외', done: false, note: '이동 가능한 동산 불가' },
          ]} />

          <SpokeTable
            id="tbl1"
            title="지역별 지원 금액 비교"
            subtitle="2026년 기준 주요 지자체"
            headers={['지역', '최대 지원액', '지원 비율', '자부담']}
            rows={REGION_SUPPORT_ROWS}
            highlightCol={1}
          />

          <p className="text-neutral-600 mb-0">자, 금액은 알았는데 내가 신청 대상인지가 더 중요하잖아요.</p>
        </>
      ),
      bridgeCTA: { href: '#s2', badge: '신청 대상', title: '우리 가게도 신청할 수 있을까요?', desc: '자격 요건 바로 확인', icon: 'grid' },
    },

    // --- Section 02: 신청 대상 → FormulaBox + RateCards ---
    {
      id: 's2',
      number: '02',
      heading: '주방 위생 지원금 신청 대상은 누구인가요?',
      subtitle: '창업 6개월~1년 이상, 세금 체납 없으면 가능해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            신청 대상은 공고일 기준 해당 지자체에서 <strong>6개월~1년 이상</strong> 영업 중인 소상공인이에요.
            창원시는 6개월, 인천은 1년이 기준이니까 우리 지역 공고를 꼭 확인해야 해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            소상공인 기준은 <a href="https://www.law.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">소상공인 보호 및 지원에 관한 법률</a>에 따라 상시근로자 5인 미만(제조업·건설업·운수업·광업은 10인 미만)이에요.
            국세·지방세 체납이 없고, 과거에 같은 사업으로 지원받은 적이 없어야 해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            대기업 프랜차이즈 직영점, 무점포 사업자, 유흥주점·단란주점은 제외돼요.
            일반음식점이나 휴게음식점은 대부분 가능해요.
          </p>

          <FormulaBox lines={[
            { text: '// 신청 자격 체크리스트', comment: true },
            { text: '1. 관내(지자체) 사업장 6개월~1년 이상 영업', numbered: true },
            { text: '2. 상시근로자 5인 미만 (소상공인 기준)', numbered: true },
            { text: '3. 국세·지방세 체납 없음', numbered: true },
            { text: '4. 과거 동일 사업 수혜 이력 없음', numbered: true },
            { text: '5. 대기업 프랜차이즈 직영점 제외', numbered: true },
          ]} />

          <RateCards cards={[
            { value: '6개월', label: '창원시', lines: ['공고일 기준', '6개월 이상 영업'], highlight: '200만원', highlightColor: 'navy' },
            { value: '1년', label: '인천시', lines: ['사업자등록증', '개업연월일 기준'], highlight: '200만원', highlightColor: 'navy', active: true },
            { value: '6개월', label: '청양군', lines: ['공고일 기준', '6개월 이상 영업'], highlight: '500만원', highlightColor: 'orange' },
          ]} />

          <p className="text-neutral-600 mb-0">자격이 되는 건 확인했고, 이제 구체적으로 어떤 공사가 지원되는지 궁금해지죠.</p>
        </>
      ),
      bridgeCTA: { href: '#s3', badge: '지원 항목', title: '주방 어디까지 지원받을 수 있을까요?', desc: '지원 가능 항목 전체 확인', icon: 'grid' },
    },

    // --- Section 03: 지원 항목 → SpokeCompareCards + SpokeTable ---
    {
      id: 's3',
      number: '03',
      heading: '음식점 시설개선 지원 항목은 뭐가 있나요?',
      subtitle: '고정 설비는 가능, 이동 가능한 동산은 불가예요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            지원 가능한 항목은 크게 <strong>주방 구조 변경</strong>, <strong>위생설비 보수/설치</strong>, <strong>바닥·벽·천장 교체</strong>, <strong>간판 교체</strong> 등이에요.
            인테리어 공사나 고정된 시설은 대부분 지원되지만, 가스레인지·냉장고·환풍기처럼 이동 가능한 동산은 안 돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            주방 구조 변경은 벽체 이동이나 구획 변경, 위생설비는 싱크대·작업대·배수시설 설치, 바닥·벽·천장은 타일·페인트·방수 공사가 해당돼요.
            <a href="https://www.changwon.go.kr/cwportal/biz/11151/11261/11266.web" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">창원시 공고</a>에서 명확히 구분하고 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            간판 교체나 인테리어 공사도 포함되는데, 지역에 따라 세부 항목이 조금씩 다르니까 우리 지역 공고를 확인해야 해요.
            컴퓨터·에어컨 같은 사무용품이나 전자제품은 전부 제외예요.
          </p>

          <SpokeCompareCards cards={[
            { title: '지원 가능', subtitle: '고정 설비·인테리리어', items: ['주방 구조 변경 (벽체·구획)', '싱크대·작업대·배수시설', '바닥·벽·천장 교체', '간판·인테리어 공사'], recommended: true, recLabel: '지원' },
            { title: '지원 불가', subtitle: '이동 가능 동산', items: ['가스레인지·냉장고', '환풍기·에어컨', '컴퓨터·사무용품', '전자제품 전반'], recommended: false },
          ]} />

          <SpokeTable
            id="tbl2"
            title="지원 가능/불가 항목 상세"
            subtitle="2026년 기준"
            headers={['항목', '세부 내용', '지원 여부']}
            rows={ELIGIBLE_ITEMS_ROWS}
            highlightCol={2}
          />

          <p className="text-neutral-600 mb-0">지원 항목을 확인했으니, 이제 실제로 어떻게 신청하는지가 남았네요.</p>
        </>
      ),
      bridgeCTA: { href: '#s4', badge: '신청 방법', title: '서류 준비하고 어디에 제출하면 될까요?', desc: '신청 절차 단계별 확인', icon: 'info' },
    },

    // --- Section 04: 신청 방법 → SpokeStepCards + SpokeFlow + SpokeRateBars ---
    {
      id: 's4',
      number: '04',
      heading: '주방 개선 지원 신청은 어떻게 하나요?',
      subtitle: '관할 구청·센터 방문 또는 온라인 접수예요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            신청 방법은 지역마다 조금씩 다른데, 대부분 사업장 소재지 관할 구청 경제교통과나 소상공인지원센터에 <strong>방문 접수</strong>하거나 <strong>온라인 접수</strong>로 가능해요.
            창원시는 구청 방문, 인천은 센터 방문 또는 온라인 모두 가능해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            필수 서류는 신청서, 사업계획서, 사업자등록증, 세금 완납증명서, 건축물대장, 견적서(2개 이상) 등이에요.
            <a href="https://www.insupport.or.kr/sub/?mcode=0401010400" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">인천소상공인지원센터</a>에서 신청서 서식을 다운받을 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            접수 후 심사를 거쳐 선정되면 공사를 진행하고, 완료 후 사진과 영수증을 제출하면 지원금이 입금돼요.
            보통 접수 기간은 1~2월이고, 선정 발표는 2월 말~3월 초예요.
          </p>

          <SpokeStepCards steps={[
            { title: '공고 확인', desc: '지자체 홈페이지에서 접수 기간·금액 확인', tip: '보통 1~2월 공고' },
            { title: '서류 준비', desc: '신청서·사업계획서·견적서 2개 이상', tip: '세금 완납증명서 필수' },
            { title: '접수', desc: '관할 구청 방문 또는 온라인 제출' },
            { title: '심사·선정', desc: '2~4주 내 선정 발표', tip: '창원시 2월 24일 발표' },
            { title: '공사 진행', desc: '선정 후 공사 착수·완료' },
            { title: '정산·입금', desc: '완료 사진·영수증 제출 → 지원금 입금' },
          ]} />

          <SpokeFlow steps={[
            { icon: '📋', label: '공고 확인', sub: '1~2월' },
            { icon: '📎', label: '서류 제출', sub: '방문/온라인' },
            { icon: '🔍', label: '심사', sub: '2~4주' },
            { icon: '🔨', label: '공사', sub: '선정 후' },
            { icon: '💰', label: '지급', sub: '정산 완료 후' },
          ]} />

          <SpokeRateBars bars={[
            { label: '서류 준비', rate: '1주', width: '20%' },
            { label: '접수·심사', rate: '2~4주', width: '40%' },
            { label: '공사 진행', rate: '4~8주', width: '70%' },
            { label: '정산·입금', rate: '2~3주', width: '100%' },
          ]} />

          <p className="text-neutral-600 mb-0">신청 절차를 확인했으니, 이제 자주 묻는 질문들을 정리해볼게요.</p>
        </>
      ),
      bridgeCTA: { href: '#s5', badge: 'FAQ', title: '자주 묻는 질문들', desc: '궁금한 점 바로 확인', icon: 'info' },
    },

    // --- Section 05: FAQ ---
    {
      id: 's5',
      number: '05',
      heading: '자주 묻는 질문',
      subtitle: '자주 묻는 질문이에요',
      content: null,
    },
  ],

  faq: [
    { question: '음식점 주방 위생환경 개선 지원금을 여러 지자체에 중복 신청할 수 있나요?', answer: '안 돼요. 사업장 소재지 관할 지자체 1곳에만 신청 가능해요. 다른 지역 사업장이 있으면 각각 신청할 수는 있어요.' },
    { question: '주방 개선 공사를 먼저 하고 나중에 신청해도 되나요?', answer: '안 돼요. <strong>반드시 선정 통보를 받은 후</strong>에 공사를 시작해야 해요. 먼저 공사하면 지원금을 못 받아요.' },
  ],

  relatedSpokes: [
    { badge: '시설개선', title: '소상공인 시설개선 지원금 종류 비교 정리', desc: '시설개선 지원 종류 전체 비교', href: '/w/소상공인-시설개선-지원금-종류-비교-정리' },
    { badge: '리모델링', title: '지자체 소상공인 매장 리모델링 지원금 신청', desc: '매장 전체 리모델링 지원', href: '/w/지자체-소상공인-매장-리모델링-지원금-신청' },
  ],

  sources: [
    { name: '창원시 소상공인 소규모 경영환경개선사업', url: 'https://www.changwon.go.kr/cwportal/biz/11151/11261/11266.web', org: '창원시청' },
    { name: '인천소상공인 경영환경개선 지원사업', url: 'https://www.insupport.or.kr/sub/?mcode=0401010400', org: '인천소상공인종합지원센터' },
    { name: '소상공인 보호 및 지원에 관한 법률', url: 'https://www.law.go.kr/법령/소상공인보호및지원에관한법률', org: '법제처' },
  ],
}

export default data
