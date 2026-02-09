import Link from 'next/link'
import type { SpokeData } from './types'
import { SpokeTable, TipBox, FormulaBox, RateCards } from '@/components/spoke/SpokeBlocks'

// --- Table data ---
const SCHEDULE_2026 = [
  ['1차', '2월', '약 3주간', '2월 첫째 주 ~ 셋째 주'],
  ['2차', '7월', '약 3주간', '7월 첫째 주 ~ 셋째 주'],
  ['3차', '10월', '약 3주간', '10월 첫째 주 ~ 셋째 주'],
]

const CONTACT_TABLE = [
  ['주민센터 방문', '거주지 관할 읍/면/동 행정복지센터', '☎ 각 지역 주민센터 (지역번호 + 114)'],
  ['복지로 온라인', 'bokjiro.go.kr', '☎ 보건복지상담센터 129'],
  ['자산형성포털', 'hope.welfareinfo.or.kr', '☎ 보건복지상담센터 129'],
]

// --- Spoke Data ---
const data: SpokeData = {
  slug: '희망저축계좌2-신청-기간-서류-방법',

  meta: {
    title: '희망저축계좌2 신청 기간 서류와 신청 방법',
    description: '희망저축계좌2 신청 기간은 연 3회(2월, 7월, 10월) 모집하고, 필요 서류와 주민센터 방문 또는 복지로 온라인 신청 방법을 알려드려요.',
    keywords: ['희망저축계좌2 신청 기간', '희망저축계좌2 서류', '희망저축계좌2 신청 방법', '희망저축계좌2 신청'],
    ogTitle: '희망저축계좌2 신청 기간 서류와 신청 방법 | 머니위키',
    ogDescription: '연 3회 모집, 필요 서류, 주민센터 방문·온라인 신청 방법까지.',
  },

  hub: {
    url: '',
    name: '',
  },

  breadcrumb: ['복지/연금', '희망저축계좌2 신청 기간'],

  hero: {
    badge: '2026년 기준',
    h1: <>희망저축계좌2 <span className="text-emerald-600">신청 기간</span> 서류와 신청 방법</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          희망저축계좌2는 연 3회만 모집하기 때문에 <strong className="text-neutral-800">신청 기간</strong>을 놓치면 다음 모집 때까지 몇 달을 기다려야 해요.<br />
          2026년 기준으로 2월·7월·10월에 각 3주 정도 신청을 받아요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          이 글에서는 <strong>희망저축계좌2 신청 기간</strong>, <strong>필요 서류</strong>, <strong>신청 방법</strong>, <strong>신청 장소</strong>까지 한 번에 정리했어요.<br />
          자격 조건이나 수령액 계산이 궁금하면{' '}
          <a href="https://www.mohw.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">보건복지부</a> 또는{' '}
          <a href="https://hope.welfareinfo.or.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">자산형성포털</a>에서 확인하세요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '올인원',
      desc: '희망저축계좌2 자격, 금액, 신청까지 한 페이지에',
    },
  },

  toc: [
    { id: 's1', text: '희망저축계좌2 신청 기간은 언제인가요?' },
    { id: 'tbl1', text: '2026년 모집 일정표', sub: true },
    { id: 's2', text: '희망저축계좌2 서류는 뭘 준비해야 하나요?' },
    { id: 's3', text: '희망저축계좌2 신청 방법은 뭔가요?' },
    { id: 's4', text: '희망저축계좌2 신청은 어디서 하나요?' },
    { id: 'tbl2', text: '신청 채널별 연락처', sub: true },
    { id: 's5', text: '자주 묻는 질문' },
  ],

  sections: [
    // --- Section 01: 신청 기간 ---
    {
      id: 's1',
      number: '01',
      heading: '희망저축계좌2 신청 기간은 언제인가요?',
      subtitle: '연 3회 모집, 각 3주 정도. 모집 기간 외에는 신청 불가',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            희망저축계좌2는 <strong>연 3회만 신청</strong>받아요.{' '}
            <a href="https://www.mohw.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">보건복지부</a>에서 매년 모집 공고를 내고, 보통 2월·7월·10월에 각 3주 정도 접수해요.
            2026년 기준으로 1차는 2월, 2차는 7월, 3차는 10월인데요. 정확한 날짜는 매년 약간씩 달라질 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            신청 자격은 <strong>기준 중위소득 50% 이하</strong> 또는 <strong>주거·교육급여 수급자</strong>, <strong>차상위계층</strong>이에요.
            자격이 되는지 확인하고 싶으면{' '}
            <a href="https://hope.welfareinfo.or.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">자산형성포털</a>에서 자가진단을 해보세요.
          </p>

          <SpokeTable
            id="tbl1"
            title="2026년 희망저축계좌2 모집 일정"
            subtitle="보건복지부 공고 기준"
            headers={['모집 차수', '모집 월', '기간', '상세 일정']}
            rows={SCHEDULE_2026}
          />

          <p className="text-xs text-neutral-400 mt-1">
            * 정확한 날짜는 매년 공고 시 확인. 보건복지부 또는 자산형성포털에서 사전 공지.
          </p>

          <TipBox title="모집 기간 외 신청 불가">
            <p className="mb-0 leading-relaxed">
              희망저축계좌2는 <strong>모집 기간에만 신청 가능</strong>해요.<br />
              기간을 놓치면 다음 모집 때까지 몇 달을 기다려야 하니까,{' '}
              <a href="https://hope.welfareinfo.or.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">자산형성포털</a>이나 주민센터에서 공고를 확인하세요.<br />
              알림 신청을 해두면 모집 시작 전에 문자로 안내받을 수 있어요.
            </p>
          </TipBox>

          <p className="text-neutral-600 mb-0">그렇다면 신청할 때 어떤 서류를 준비해야 할까요?</p>
        </>
      ),
      bridgeCTA: { href: '#s2', badge: '서류 준비', title: '희망저축계좌2 신청할 때 필요한 서류는?', desc: '서류 체크리스트 확인하기', icon: 'info' },
    },

    // --- Section 02: 필요 서류 ---
    {
      id: 's2',
      number: '02',
      heading: '희망저축계좌2 서류는 뭘 준비해야 하나요?',
      subtitle: '신청서, 자가진단표, 소득증빙, 신분증 등 필수 서류 체크',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            희망저축계좌2 신청할 때는 <strong>신청서</strong>, <strong>자가진단표</strong>, <strong>개인정보 동의서</strong>, <strong>소득·재산 증빙 서류</strong> 등이 필요해요.
            대부분 서류는 주민센터에 비치돼 있거나{' '}
            <a href="https://www.bokjiro.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">복지로</a>에서 내려받을 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            소득 증빙은 <strong>근로자</strong>는 급여명세서나 근로소득 원천징수영수증, <strong>자영업자</strong>는 소득금액증명원, <strong>무소득자</strong>는 사실증명서를 제출하면 돼요.
            필요한 서류가 헷갈리면 주민센터에 전화해서 미리 확인하는 게 가장 빠릅니다.
          </p>

          <FormulaBox lines={[
            { text: '// 희망저축계좌2 필요 서류 체크리스트', comment: true },
            { text: '1. 사회복지서비스 및 급여 제공(변경) 신청서', numbered: true },
            { text: '2. 자산형성지원사업 참여(변경) 신청서 (저축동의서 포함)', numbered: true },
            { text: '3. 자가진단표 (자산형성포털에서 출력 가능)', numbered: true },
            { text: '4. 개인정보 수집·이용·제공 동의서', numbered: true },
            { text: '5. 금융정보 등 제공동의서', numbered: true },
            { text: '6. 소득·재산 신고서', numbered: true },
            { text: '7. 소득증빙 서류 (급여명세서, 소득금액증명원 등)', numbered: true },
            { text: '8. 신분증 (주민등록증, 운전면허증 등)', numbered: true },
          ]} />

          <p className="text-xs text-neutral-400 mt-1">
            * 서류는 지자체별로 약간 다를 수 있어요. 신청 전 주민센터에 전화로 확인하세요.
          </p>

          <TipBox title="소득 증빙 팁">
            <p className="mb-0 leading-relaxed">
              <strong>근로자</strong>: 최근 3개월 급여명세서 또는 근로소득 원천징수영수증<br />
              <strong>자영업자</strong>: 국세청 소득금액증명원 (홈택스 발급 가능)<br />
              <strong>무소득자</strong>: 무소득 사실증명서 (주민센터 발급)<br /><br />
              복잡하면 주민센터에서 안내받으면서 작성하는 게 가장 확실해요.
            </p>
          </TipBox>

          <p className="text-neutral-600 mb-0">서류를 다 준비했다면, 이제 어떻게 신청하는지 볼 차례예요.</p>
        </>
      ),
      bridgeCTA: { href: '#s3', badge: '신청 방법', title: '희망저축계좌2 신청은 어떻게 하나요?', desc: '주민센터 방문 vs 온라인 신청', icon: 'calc' },
    },

    // --- Section 03: 신청 방법 ---
    {
      id: 's3',
      number: '03',
      heading: '희망저축계좌2 신청 방법은 뭔가요?',
      subtitle: '주민센터 방문이 원칙, 복지로 온라인도 일부 가능',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            희망저축계좌2는 <strong>거주지 관할 주민센터(행정복지센터) 방문 신청</strong>이 원칙이에요.
            신청서를 작성하고 필요 서류를 제출하면 담당 공무원이 자격 심사를 진행해요.
            심사는 보통 <strong>1~2개월</strong> 정도 걸리고, 선정되면 문자나 우편으로 통보받아요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            일부 지자체에서는{' '}
            <a href="https://www.bokjiro.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">복지로(bokjiro.go.kr)</a> 온라인 신청도 가능해요.
            하지만 모든 지역에서 지원하는 건 아니니까, 먼저{' '}
            <a href="https://hope.welfareinfo.or.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">자산형성포털</a>에서 본인 지역의 신청 방법을 확인하세요.
          </p>

          <FormulaBox lines={[
            { text: '// 희망저축계좌2 신청 4단계', comment: true },
            { text: '1. 신청 기간 확인 → 연 3회 모집 기간에만 가능', numbered: true },
            { text: '2. 서류 준비 → 신청서, 자가진단표, 소득증빙 등', numbered: true },
            { text: '3. 주민센터 방문 (또는 복지로 온라인) → 접수', numbered: true },
            { text: '4. 자격 심사 (1~2개월) → 선정 통보 후 통장 개설', numbered: true },
          ]} />

          <RateCards cards={[
            { value: '주민센터', label: '방문 신청', lines: ['담당자 직접 상담', '서류 누락 시 현장 보완 가능'], highlight: '확실', highlightColor: 'emerald', active: true },
            { value: '복지로', label: '온라인 신청', lines: ['일부 지역만 가능', '서류 스캔·업로드 필요'], highlight: '편리', highlightColor: 'orange' },
          ]} />

          <p className="text-xs text-neutral-400 mt-1">
            * 온라인 신청 가능 여부는 거주지 지자체에 따라 달라요. 주민센터에 전화로 확인하세요.
          </p>

          <TipBox title="선정 후 통장 개설">
            <p className="mb-0 leading-relaxed">
              심사 통과 후 선정 통보를 받으면 <strong>우리은행 또는 농협은행</strong>에서 희망저축계좌2 전용 통장을 개설해야 해요.<br />
              통장 개설 후 매월 <strong>10만원</strong>을 저축하면, 정부가 매칭 지원금을 적립해 주는 구조예요.<br />
              자세한 내용은{' '}
              <a href="https://hope.welfareinfo.or.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">자산형성포털</a>에서 확인하세요.
            </p>
          </TipBox>

          <p className="text-neutral-600 mb-0">그렇다면 어디서 신청하는지 구체적으로 알아볼까요?</p>
        </>
      ),
      bridgeCTA: { href: '#s4', badge: '신청 장소', title: '희망저축계좌2 신청은 어디서 하나요?', desc: '주민센터 위치, 복지로 링크 확인', icon: 'info' },
    },

    // --- Section 04: 신청 장소 ---
    {
      id: 's4',
      number: '04',
      heading: '희망저축계좌2 신청은 어디서 하나요?',
      subtitle: '거주지 주민센터 또는 복지로 온라인',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            희망저축계좌2는 <strong>거주지 관할 읍·면·동 주민센터(행정복지센터)</strong>에서 신청할 수 있어요.
            주민센터 위치가 어디인지 모르겠으면 <strong>지역번호 + 114</strong>로 전화해서 가까운 주민센터를 안내받으면 돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            온라인으로는{' '}
            <a href="https://www.bokjiro.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">복지로(bokjiro.go.kr)</a>에서 신청할 수 있어요.
            단, 모든 지역에서 온라인 신청을 지원하는 건 아니니까, 먼저{' '}
            <a href="https://hope.welfareinfo.or.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">자산형성포털</a>에서 본인 지역의 신청 방법을 확인하세요.
          </p>

          <SpokeTable
            id="tbl2"
            title="희망저축계좌2 신청 채널별 연락처"
            subtitle="2026년 기준"
            headers={['신청 채널', '접속 경로', '연락처']}
            rows={CONTACT_TABLE}
          />

          <p className="text-xs text-neutral-400 mt-1">
            * 자산형성포털(hope.welfareinfo.or.kr)에서 모집 공고, 자격 확인, Q&A 등 확인 가능.
          </p>

          <TipBox title="보건복지상담센터 129 안내">
            <p className="mb-0 leading-relaxed">
              신청 방법, 필요 서류, 자격 조건이 헷갈리면 <strong>보건복지상담센터 129</strong>로 전화하세요.<br />
              평일 오전 9시~오후 6시까지 운영하고, 희망저축계좌2뿐만 아니라 다른 복지 제도도 안내받을 수 있어요.<br />
              통화료는 무료예요.
            </p>
          </TipBox>
        </>
      ),
      bridgeCTA: { href: 'https://hope.welfareinfo.or.kr', badge: '자산형성포털', title: '희망저축계좌2 자격 확인하러 가기', desc: '자가진단, 모집 공고, 신청 방법 확인', icon: 'grid', primary: true },
    },

    // --- Section 05: FAQ ---
    {
      id: 's5',
      number: '05',
      heading: '자주 묻는 질문',
      subtitle: '희망저축계좌2 신청에 대해 자주 묻는 질문이에요',
      content: null, // FAQ는 template에서 자동 렌더링
    },
  ],

  faq: [
    {
      question: '희망저축계좌2 신청 기간을 놓치면 어떻게 하나요?',
      answer: '모집 기간 외에는 신청이 불가능해요. 다음 모집 때까지 기다렸다가 <strong>다음 차수(2월, 7월, 10월)</strong>에 신청하면 됩니다. <a href="https://hope.welfareinfo.or.kr" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">자산형성포털</a>에서 알림 신청을 해두면 모집 시작 전에 문자로 안내받을 수 있어요.',
    },
    {
      question: '희망저축계좌2 신청 후 심사는 얼마나 걸리나요?',
      answer: '신청 후 <strong>1~2개월</strong> 정도 소요돼요. 심사에서 소득·재산 요건을 확인하고, 선정되면 문자나 우편으로 통보받아요. 선정 통보 후 <strong>우리은행 또는 농협은행</strong>에서 전용 통장을 개설하면 매월 저축을 시작할 수 있어요.',
    },
  ],

  relatedSpokes: [
    { badge: '만기', title: '희망저축계좌2 만기 수령액 적립금 사용처', desc: '3년 만기 시 수령 금액과 사용 방법', href: '/w/희망저축계좌2-만기-수령액-적립금-사용처' },
    { badge: '해지', title: '희망저축계좌2 중도 해지 환수금과 불이익', desc: '중간에 해지하면 어떤 불이익이 있는지', href: '/w/희망저축계좌2-중도-해지-환수금-불이익' },
  ],

  sources: [
    { name: '희망저축계좌2 제도 안내', url: 'https://www.mohw.go.kr', org: '보건복지부' },
    { name: '자산형성포털', url: 'https://hope.welfareinfo.or.kr', org: '한국사회보장정보원' },
    { name: '복지로', url: 'https://www.bokjiro.go.kr', org: '보건복지부' },
  ],
}

export default data
