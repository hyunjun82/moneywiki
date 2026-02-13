import Link from 'next/link'
import type { SpokeData } from './types'
import { SpokeFlow, SpokeRateBars, FormulaBox, RateCards, TipBox, SpokeCompareCards, SpokeTable, SpokeTimeline } from '@/components/spoke/SpokeBlocks'

// --- Table data ---
const CENTER_SEARCH_ROWS = [
  ['고용24', 'www.work.go.kr', '주소 입력 시 자동 검색', '온라인 예약 가능'],
  ['고용노동부 홈페이지', 'www.moel.go.kr', '전국 고용센터 목록', '연락처·주소 제공'],
  ['정부24', 'www.gov.kr', '민원24시 통합 검색', '관할 센터 안내'],
]

// --- Spoke Data ---
const data: SpokeData = {
  slug: '실업급여-고용센터-찾기-고용24-사용법',

  meta: {
    title: '실업급여 고용센터 찾기 고용24 사용법 | 온라인 신청 모의계산 방법',
    description: '실업급여는 관할 고용센터에서 신청해요. 내 주소지 관할 고용센터 찾는 법과 고용24 이용법을 알려드려요',
    keywords: ['실업급여 고용센터 찾기 고용24 사용법', '실업급여 관할 고용센터 지역별 검색', '고용24 실업급여 신청 사용법', '실업급여 고용센터 방문 예약'],
    ogTitle: '실업급여 고용센터 찾기 고용24 사용법 | 온라인 신청 모의계산 방법 | 머니위키',
    ogDescription: '관할 고용센터 찾기부터 고용24 사용법까지 한 번에.',
  },

  hub: {
    url: '/w/실업급여-신청-조건-금액-기간-총정리',
    name: '실업급여 총정리',
  },

  breadcrumb: ['실업급여', '고용센터 찾기'],

  hero: {
    badge: '2026년 기준',
    h1: <><span className="text-[#1E3A5F]">실업급여 고용센터 찾기</span> 고용24 사용법</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          실업급여 신청하려는데 어느 고용센터로 가야 할지 모르겠고, 온라인으로 미리 예약할 수 있는지 궁금하셨죠?
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          <strong className="text-neutral-800">관할 고용센터</strong>는 내 주소지(주민등록상 주소)를 기준으로 정해져요.
          <a href="https://www.work.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">고용24 홈페이지</a>에서 주소만 입력하면 자동으로 관할 센터가 나오고, 방문 예약도 바로 할 수 있어요.
          고용노동부 고용보험 홈페이지에서도 전국 고용센터 목록과 연락처를 확인할 수 있어요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          쉽게 말해서, 내가 사는 동네 관할 고용센터를 찾아서 방문하거나 온라인으로 신청하면 돼요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          먼저 관할 고용센터 찾는 방법부터 확인해볼게요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '실업급여',
      desc: '실업급여 총정리 전체 보기',
    },
  },

  toc: [
    { id: 's1', text: '관할 고용센터 찾는 방법 3가지' },
    { id: 'tbl1', text: '온라인 검색 방법 비교', sub: true },
    { id: 's2', text: '고용24 회원가입과 실업급여 메뉴' },
    { id: 's3', text: '고용센터 방문 시 준비물과 절차' },
    { id: 's4', text: '지역별 고용센터 연락처 검색법' },
    { id: 's5', text: '자주 묻는 질문' },
  ],

  sections: [
    // --- Section 01: 고용센터 찾기 → SpokeFlow + SpokeRateBars ---
    {
      id: 's1',
      number: '01',
      heading: '관할 고용센터 찾는 방법 3가지',
      subtitle: '주소만 입력하면 자동으로 나와요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            관할 고용센터를 찾는 가장 쉬운 방법은 <strong>고용24 홈페이지</strong>를 이용하는 거예요.
            홈페이지 상단 "고용센터 찾기" 메뉴에서 내 주소지를 입력하면 관할 센터가 자동으로 나와요.
            연락처, 주소, 찾아가는 길까지 한 번에 확인할 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            두 번째 방법은 <a href="https://www.moel.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">고용노동부 홈페이지</a>에서 "전국 고용센터 목록"을 검색하는 거예요.
            시·도별로 정리되어 있어서 내가 사는 지역을 클릭하면 관할 센터 정보가 나와요.
            전화번호와 운영시간까지 자세히 나와 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            세 번째는 <a href="https://www.gov.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">정부24</a>에서 "고용센터"를 검색하는 방법이에요.
            민원24시 통합 검색으로 관할 센터를 안내받을 수 있어요.
          </p>

          <SpokeFlow steps={[
            { icon: '🌐', label: '고용24 접속', sub: 'work.go.kr' },
            { icon: '🔍', label: '고용센터 찾기', sub: '상단 메뉴' },
            { icon: '📍', label: '주소 입력', sub: '주민등록상' },
            { icon: '✅', label: '관할 센터 확인', sub: '연락처·지도' },
          ]} />

          <SpokeRateBars bars={[
            { label: '고용24 온라인 검색', rate: '추천', width: '100%' },
            { label: '고용노동부 홈페이지', rate: '상세 정보', width: '85%' },
            { label: '정부24 통합 검색', rate: '편리', width: '70%' },
            { label: '전화 문의 (☎1350)', rate: '직접 안내', width: '60%' },
          ]} />

          <SpokeTable
            id="tbl1"
            title="온라인 검색 방법 비교"
            subtitle="2026년 기준"
            headers={['사이트', 'URL', '검색 방법', '추가 기능']}
            rows={CENTER_SEARCH_ROWS}
            highlightCol={3}
          />

          <p className="text-neutral-600 mb-0">관할 고용센터는 찾았는데, 고용24 홈페이지를 어떻게 쓰는지 궁금해지죠.</p>
        </>
      ),
      bridgeCTA: { href: '#s2', badge: '고용24', title: '고용24에서 뭘 할 수 있나요?', desc: '회원가입과 메뉴 안내', icon: 'grid' },
    },

    // --- Section 02: 고용24 사용법 → FormulaBox + RateCards ---
    {
      id: 's2',
      number: '02',
      heading: '고용24 회원가입과 실업급여 메뉴',
      subtitle: '회원가입 후 온라인 신청 가능해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            <strong>고용24</strong>는 고용노동부에서 운영하는 종합 고용서비스 사이트예요.
            실업급여 신청, 실업인정, 취업특강 신청, 구직등록 등 모든 고용서비스를 온라인으로 이용할 수 있어요.
            <a href="https://www.work.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">고용24 홈페이지</a>에서 회원가입을 하면 바로 사용할 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            회원가입은 공동인증서(구 공인인증서), 간편인증(카카오·네이버·페이코 등), 휴대폰 인증 중 하나로 할 수 있어요.
            로그인 후 "실업급여" 메뉴로 들어가면 수급자격 신청, 실업인정 신고, 구직활동 내역 확인 등을 할 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            단, 1차 실업인정은 반드시 고용센터를 직접 방문해야 하고, 2차부터는 온라인 실업인정이 가능해요.
            방문 예약도 고용24에서 미리 할 수 있어요.
          </p>

          <FormulaBox lines={[
            { text: '// 고용24 회원가입 절차', comment: true },
            { text: '1. work.go.kr 접속', numbered: true },
            { text: '2. 회원가입 클릭', numbered: true },
            { text: '3. 본인인증 (공동인증서·간편인증·휴대폰)', numbered: true },
            { text: '4. 개인정보 입력', numbered: true },
            { text: '5. 로그인 → 실업급여 메뉴', numbered: true },
          ]} />

          <RateCards cards={[
            { value: '온라인', label: '고용24 신청', lines: ['회원가입 필수', '2차 실업인정부터'], highlight: '편리', highlightColor: 'navy', active: true },
            { value: '방문', label: '고용센터 방문', lines: ['1차 실업인정 필수', '서류 지참'], highlight: '필수', highlightColor: 'orange' },
            { value: '전화', label: '전화 상담', lines: ['☎1350', '센터 연결'], highlight: '안내' },
          ]} />

          <p className="text-neutral-600 mb-0">고용24 사용법을 알았으니, 고용센터 방문할 때 뭘 준비해야 하는지 확인해봐야죠.</p>
        </>
      ),
      bridgeCTA: { href: '#s3', badge: '방문 준비', title: '고용센터 방문 시 뭘 준비해야 하나요?', desc: '준비물과 절차 확인', icon: 'info' },
    },

    // --- Section 03: 방문 준비 → TipBox + SpokeCompareCards ---
    {
      id: 's3',
      number: '03',
      heading: '고용센터 방문 시 준비물과 절차',
      subtitle: '신분증·이직확인서·통장 지참하세요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            고용센터에 처음 방문할 때는 <strong>신분증</strong>, <strong>이직확인서</strong>, <strong>통장 사본</strong>, <strong>구직등록 신청서</strong>를 준비해야 해요.
            이직확인서는 퇴사한 회사에서 발급받거나, 회사가 고용센터에 직접 제출한 경우 생략할 수 있어요.
            <a href="https://www.ei.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">고용보험 홈페이지</a>에서 이직확인서 발급 여부를 확인할 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            신분증은 주민등록증이나 운전면허증, 여권 중 하나면 되고, 통장은 본인 명의 계좌여야 해요.
            구직등록 신청서는 고용센터에 비치되어 있어서 현장에서 작성할 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            방문 예약을 하면 대기 시간을 줄일 수 있어요.
            고용24에서 "고용센터 방문 예약" 메뉴로 들어가서 날짜와 시간을 선택하면 돼요.
          </p>

          <TipBox title="이직확인서 미제출 시">
            이직확인서를 회사에서 못 받았다면, 고용센터에서 직권으로 발급 요청할 수 있어요. 단, 시간이 더 걸릴 수 있으니 미리 회사에 요청하는 게 좋아요.
          </TipBox>

          <SpokeCompareCards cards={[
            { title: '필수 서류', subtitle: '반드시 지참', items: ['신분증 (주민등록증·운전면허증)', '이직확인서 (회사 발급)', '통장 사본 (본인 명의)', '구직등록 신청서 (현장 작성 가능)'], recommended: true, recLabel: '필수' },
            { title: '선택 서류', subtitle: '상황에 따라', items: ['학력 증명서 (고졸 미만 시)', '가족관계증명서 (부양가족 있을 시)', '장애인 증명서 (해당 시)', '병역 관련 서류'], recommended: false },
          ]} />

          <p className="text-neutral-600 mb-0">준비물을 확인했으니, 지역별로 고용센터 연락처를 어떻게 찾는지 궁금해질 수 있어요.</p>
        </>
      ),
      bridgeCTA: { href: '#s4', badge: '연락처', title: '우리 지역 고용센터 전화번호는?', desc: '지역별 연락처 검색', icon: 'info' },
    },

    // --- Section 04: 연락처 검색 → SpokeTable + SpokeTimeline ---
    {
      id: 's4',
      number: '04',
      heading: '지역별 고용센터 연락처 검색법',
      subtitle: '고용24·정부 대표전화로 확인하세요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            지역별 고용센터 연락처는 <strong>고용24</strong> 또는 <strong>고용노동부 홈페이지</strong>에서 확인할 수 있어요.
            "고용센터 찾기" 메뉴에서 내 지역을 선택하면 대표 전화번호와 팩스, 주소가 모두 나와요.
            <a href="https://www.work.go.kr/consltJobCarpa/srch/jobMap/jobcntrMap.do" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">고용센터 지도 검색</a>을 이용하면 지도로도 확인할 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            고용노동부 대표 전화번호는 <strong>☎1350</strong>이에요.
            평일 09:00~18:00에 전화하면 상담원이 관할 고용센터를 안내해줘요.
            자동응답 시스템(ARS)으로도 지역별 센터 연락처를 확인할 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            서울·경기는 센터가 많아서 정확한 관할 센터를 확인하는 게 중요해요.
            예를 들어 서울은 동부·서부·남부·북부·강남·강서 등으로 나뉘어 있어요.
          </p>

          <SpokeTable
            id="tbl2"
            title="주요 지역 고용센터 대표 연락처"
            subtitle="2026년 기준"
            headers={['지역', '센터명', '대표 전화', '관할 구역']}
            rows={[
              ['서울', '서울 동부고용센터', '☎02-2204-9300', '강동·송파·광진·성동·동대문'],
              ['서울', '서울 서부고용센터', '☎02-3156-9000', '은평·서대문·마포·종로·중구'],
              ['경기', '수원고용센터', '☎031-259-0900', '수원 전역·화성·오산'],
              ['부산', '부산고용센터', '☎051-860-2700', '부산 중구·서구·동구·영도'],
              ['대구', '대구고용센터', '☎053-650-7000', '대구 중구·동구·서구·남구'],
            ]}
            highlightCol={2}
          />

          <SpokeTimeline events={[
            { month: 'Step 1', title: '고용24 접속', desc: 'work.go.kr' },
            { month: 'Step 2', title: '고용센터 찾기', desc: '상단 메뉴 클릭', status: 'current' },
            { month: 'Step 3', title: '지역 선택', desc: '시·도 → 시·군·구' },
            { month: 'Step 4', title: '연락처 확인', desc: '전화·주소·운영시간' },
          ]} />

          <p className="text-neutral-600 mb-0">고용센터 찾는 방법을 정리했으니, 자주 묻는 질문들을 확인해볼게요.</p>
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
    { question: '실업급여 신청을 다른 지역 고용센터에서 할 수 있나요?', answer: '안 돼요. 주민등록상 주소지 관할 고용센터에서만 신청할 수 있어요. 단, 실제 거주지가 다르면 주민등록을 옮긴 후 신청해야 해요.' },
    { question: '고용24 회원가입 없이 실업급여를 신청할 수 있나요?', answer: '네, 가능해요. 고용센터를 직접 방문하면 회원가입 없이도 신청할 수 있어요. 하지만 온라인 실업인정을 하려면 회원가입이 필요해요.' },
  ],

  relatedSpokes: [
    { badge: '실업급여', title: '실업급여 신청 조건 금액 기간 총정리', desc: '실업급여 전체 안내', href: '/w/실업급여-신청-조건-금액-기간-총정리' },
    { badge: '실업인정', title: '실업급여 실업인정 구직활동 방법', desc: '실업인정 절차와 구직활동', href: '/w/실업급여-실업인정-구직활동-방법' },
  ],

  sources: [
    { name: '고용24 고용센터 찾기', url: 'https://www.work.go.kr/consltJobCarpa/srch/jobMap/jobcntrMap.do', org: '고용노동부' },
    { name: '고용노동부 전국 고용센터', url: 'https://www.moel.go.kr/contact/contactMap.do', org: '고용노동부' },
    { name: '고용보험 홈페이지', url: 'https://www.ei.go.kr', org: '고용노동부' },
  ],
}

export default data
