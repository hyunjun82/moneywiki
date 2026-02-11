import Link from 'next/link'
import type { SpokeData } from './types'
import { SpokeTable, TipBox, FormulaBox, RateCards } from '@/components/spoke/SpokeBlocks'

// --- Table data ---
const MATURITY_TABLE_ROWS = [
  ['1년차', '월 10만원', '연 120만원 (월 10만원)', '연 120만원', '약 240만원 + 이자'],
  ['2년차', '월 10만원', '연 240만원 (월 20만원)', '연 360만원', '약 600만원 + 이자'],
  ['3년차 (만기)', '월 10만원', '연 360만원 (월 30만원)', '총 720만원', '약 1,080만원 + 이자'],
]

const USAGE_CARDS = [
  { value: '주거', label: '주거 마련', lines: ['전세·월세 보증금', '주택 구입 자금'], highlight: '가장 많이', highlightColor: 'navy' as const },
  { value: '교육', label: '교육/훈련', lines: ['본인 또는 자녀 교육비', '직업훈련비'], active: true },
  { value: '창업', label: '창업 자금', lines: ['사업 시작 비용', '운영 자금'], highlight: '자립 핵심', highlightColor: 'orange' as const },
]

// --- Spoke Data ---
const data: SpokeData = {
  slug: '희망저축계좌2-만기-수령액-적립금-사용처',

  meta: {
    title: '희망저축계좌2 만기 수령액 적립금과 사용처',
    description: '희망저축계좌2 만기 수령액은 본인 360만원 + 정부 720만원 = 총 1,080만원이에요. 연차별 적립 구조, 사용처 조건, 만기 절차까지 한 번에 정리했어요.',
    keywords: ['희망저축계좌2 만기 수령액', '희망저축계좌2 적립금', '희망저축계좌2 사용처', '희망저축계좌2 만기'],
    ogTitle: '희망저축계좌2 만기 수령액 적립금과 사용처 | 머니위키',
    ogDescription: '3년 만기 1,080만원 + 이자, 주거·교육·창업 사용 가능',
  },

  hub: {
    url: '',
    name: '',
  },

  breadcrumb: ['복지/연금', '희망저축계좌2 만기 수령액'],

  hero: {
    badge: '2026년 기준',
    h1: <>희망저축계좌2 <span className="text-[#1E3A5F]">만기 수령액</span> 적립금과 사용처</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          &lsquo;매달 10만원씩 저축하면 3년 뒤 1천만원 넘게 받는다&rsquo;는 말, 들어보셨죠?<br />
          <strong className="text-neutral-800">희망저축계좌2</strong>는 본인이 쌓은 돈에 정부가 최대 2배를 얹어주는 복지 통장이에요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          3년 만기 수령액부터 사용처까지, 실제로 통장에 찍히는 금액과 조건을 하나씩 정리했어요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '올인원',
      desc: '복지 통장 전체 비교와 신청 방법',
    },
  },

  toc: [
    { id: 's1', text: '희망저축계좌2 만기 수령액은 얼마인가요?' },
    { id: 'tbl1', text: '연차별 수령액 표', sub: true },
    { id: 's2', text: '희망저축계좌2 적립금은 얼마나 쌓이나요?' },
    { id: 's3', text: '희망저축계좌2 사용처는 어떻게 되나요?' },
    { id: 's4', text: '희망저축계좌2 만기가 되면 어떻게 하나요?' },
    { id: 's5', text: '자주 묻는 질문' },
  ],

  sections: [
    // --- Section 01: 만기 수령액 ---
    {
      id: 's1',
      number: '01',
      heading: '희망저축계좌2 만기 수령액은 얼마인가요?',
      subtitle: '본인 360만원 + 정부 720만원 = 총 1,080만원에 이자까지',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            <strong>희망저축계좌2</strong>는 3년 만기 적립식 통장이에요.{' '}
            본인이 매달 10만원씩 3년간 쌓으면 360만원, 정부가 연차별로 차등 매칭해서 총 720만원을 지원해요.{' '}
            <a href="https://www.mohw.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">보건복지부</a>에
            따르면 2025년 이후 가입자 기준으로 1년차에는 월 10만원, 2년차에는 월 20만원, 3년차에는 월 30만원씩 정부 지원금이 쌓이는 구조예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            실제로 통장에 찍히는 금액은 <strong>본인 적립금 360만원 + 정부 매칭금 720만원 + 이자</strong> 합계로, 약 1,080~1,100만원 정도예요.
            이자는 은행마다 다르지만 시중 금리를 적용하므로 최종 수령액은 조금씩 달라질 수 있어요.
          </p>

          <SpokeTable
            id="tbl1"
            title="희망저축계좌2 연차별 적립금과 수령액"
            subtitle="본인 월 10만원 기준, 2025년 이후 가입자"
            headers={['연차', '본인 적립', '정부 매칭', '누적 정부 지원금', '누적 합계']}
            rows={MATURITY_TABLE_ROWS}
            highlightCol={4}
          />

          <p className="text-xs text-neutral-400 mt-1">
            * 이자는 별도 (은행별 상이). 출처:{' '}
            <a href="https://hope.welfareinfo.or.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">희망e음</a>
          </p>

          <TipBox title="이자는 얼마나 붙나요?">
            <p className="mb-0 leading-relaxed">
              은행마다 금리가 다르지만, 보통 <strong>연 1~2% 내외</strong>예요.<br />
              본인 적립금과 정부 지원금 모두에 이자가 붙기 때문에 3년 누적 시 약 20~30만원 추가로 받을 수 있어요.<br />
              정확한 금리는 가입한 은행에 문의하세요.
            </p>
          </TipBox>

          <p className="text-neutral-600 mb-0">그렇다면 매달 어떻게 돈이 쌓이고, 언제 정부 매칭금이 들어오는 걸까요?</p>
        </>
      ),
      bridgeCTA: { href: '#s2', badge: '적립 구조', title: '매달 내 통장에 정확히 얼마가 쌓일까?', desc: '본인 + 정부 + 이자 구조 이해하기', icon: 'calc' },
    },

    // --- Section 02: 적립금 구조 ---
    {
      id: 's2',
      number: '02',
      heading: '희망저축계좌2 적립금은 얼마나 쌓이나요?',
      subtitle: '본인은 매월 1~20일 입금, 정부는 분기별 지급',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            본인 적립금은 <strong>매월 1~20일</strong> 사이에 자동이체로 빠져요.{' '}
            최소 월 10만원 이상 넣어야 하고, 최대 50만원까지 가능하지만 정부 매칭은 <strong>월 10만원 기준</strong>으로만 붙어요.{' '}
            <a href="https://www.nyj.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">남양주시</a> 등
            각 지자체 안내에 따르면, 20일 안에 입금하지 못하면 그 달은 매칭금이 빠지니 주의하세요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            정부 지원금은 분기마다 통장에 입금돼요. 1년차에는 월 10만원씩, 2년차에는 월 20만원씩, 3년차에는 월 30만원씩 차등 지급되는 구조라서 나중으로 갈수록 통장 잔액이 빠르게 늘어나요.
          </p>

          <FormulaBox lines={[
            { text: '// 적립 구조 3단계', comment: true },
            { text: '1. 본인 적립금: 매월 1~20일 자동이체 (월 10만원)', numbered: true },
            { text: '2. 정부 매칭금: 분기별 입금 (연차별 차등)', numbered: true },
            { text: '3. 이자 발생: 본인 + 정부 적립금 모두에 이자 적용', numbered: true },
          ]} />

          <TipBox title="본인 적립금을 더 많이 넣으면?">
            <p className="mb-0 leading-relaxed">
              매월 10만원이 아닌 20만원, 30만원도 가능해요. 하지만 정부 매칭은 <strong>월 10만원 기준</strong>으로만 붙기 때문에 초과 금액에는 매칭금이 없어요.<br />
              자립 목표가 크다면 본인 적립금을 늘려도 되지만, 매칭 효과는 동일하니 참고하세요.
            </p>
          </TipBox>

          <p className="text-neutral-600 mb-0">적립금이 쌓이면 이제 어디에 쓸 수 있는지가 궁금해지죠.</p>
        </>
      ),
      bridgeCTA: { href: '#s3', badge: '사용처', title: '1,080만원을 어디에 쓸 수 있을까?', desc: '주거·교육·창업 조건 확인', icon: 'info' },
    },

    // --- Section 03: 사용처 ---
    {
      id: 's3',
      number: '03',
      heading: '희망저축계좌2 사용처는 어떻게 되나요?',
      subtitle: '주거·교육·창업·기타 자립 목적 자금, 계획서 제출 필요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            <a href="https://www.mohw.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">보건복지부</a>와{' '}
            <a href="https://www.bokjiro.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">복지로</a>에서 안내하는 사용처는 크게 네 가지예요.
            <strong>주거 마련, 교육/기술훈련, 창업/운영자금, 기타 자립 목적 자금</strong>이 해당돼요.{' '}
            전세·월세 보증금, 주택 구입, 본인이나 자녀 교육비, 직업훈련비, 사업 시작 비용 등에 쓸 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            단, 아무 목적이나 다 되는 건 아니에요. 만기 해지 시 <strong>자금사용계획서</strong>를 제출해야 하고, 심사 후 승인받아야 인출할 수 있어요.
            자립에 실질적으로 도움이 되는 용도인지 확인하는 절차예요.
          </p>

          <RateCards cards={USAGE_CARDS} />

          <TipBox title="자금사용계획서는 어떻게 제출하나요?">
            <p className="mb-0 leading-relaxed">
              만기 해지 신청 시 주민센터에서 양식을 받아 작성하면 돼요.<br />
              사용 목적(주거·교육·창업 등), 금액, 일정, 증빙 서류(계약서·견적서 등)를 첨부해야 해요.<br />
              승인 후 본인 통장으로 일괄 입금되니, 계획서 작성은 꼼꼼히 하는 게 좋아요.
            </p>
          </TipBox>

          <p className="text-neutral-600 mb-0">그렇다면 만기가 되면 정확히 어떤 절차를 거쳐야 할까요?</p>
        </>
      ),
      bridgeCTA: { href: '#s4', badge: '만기 절차', title: '3년 뒤 실제로 돈 받는 과정은?', desc: '교육 이수부터 해지까지 4단계', icon: 'clock' },
    },

    // --- Section 04: 만기 절차 ---
    {
      id: 's4',
      number: '04',
      heading: '희망저축계좌2 만기가 되면 어떻게 하나요?',
      subtitle: '교육 이수 확인 → 계획서 제출 → 해지 신청 → 수령',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            3년 만기가 되면 자동으로 안내가 와요.{' '}
            <a href="https://hope.welfareinfo.or.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">희망e음</a>이나
            주민센터에서 연락이 오니 놓치지 마세요.{' '}
            그 전에 <strong>자립역량교육 10시간</strong>을 이수했는지 확인하세요. 교육을 안 들었으면 정부 매칭금을 못 받을 수도 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            교육 확인이 끝나면 자금사용계획서를 작성해서 주민센터에 제출하고, 만기 해지 신청을 하면 돼요.
            본인 적립금과 정부 지원금, 이자가 한꺼번에 본인 통장으로 들어와요.
          </p>

          <FormulaBox lines={[
            { text: '// 만기 절차 4단계', comment: true },
            { text: '1. 자립역량교육 10시간 이수 확인 (필수)', numbered: true },
            { text: '2. 자금사용계획서 작성 및 제출', numbered: true },
            { text: '3. 주민센터에서 만기 해지 신청', numbered: true },
            { text: '4. 본인 적립금 + 정부 지원금 + 이자 일괄 수령', numbered: true },
          ]} />

          <TipBox title="교육 이수를 깜빡했다면?">
            <p className="mb-0 leading-relaxed">
              <strong>자립역량교육 10시간</strong>은 3년 동안 반드시 들어야 해요.<br />
              온라인 교육도 가능하고, 주민센터나 복지관에서 안내받을 수 있어요.<br />
              만기 직전에 몰아서 들어도 되지만, 미이수 시 정부 매칭금을 못 받거나 일부만 받을 수 있으니 주의하세요.<br />
              자세한 내용은 <Link href="/w/희망저축계좌2-가입-조건" className="text-blue-600 hover:underline">희망저축계좌2 가입 조건</Link> 참고.
            </p>
          </TipBox>
        </>
      ),
      bridgeCTA: { href: '#s5', badge: 'FAQ', title: '자주 묻는 질문 확인하기', desc: '중도 해지, 세금 등 궁금증 해결', icon: 'grid', primary: false },
    },

    // --- Section 05: FAQ ---
    {
      id: 's5',
      number: '05',
      heading: '자주 묻는 질문',
      subtitle: '희망저축계좌2 만기와 수령에 대해 자주 묻는 질문이에요',
      content: null, // FAQ 자동 렌더링
    },
  ],

  faq: [
    {
      question: '희망저축계좌2 중도 해지하면 정부 지원금은 어떻게 되나요?',
      answer: '중도 해지 시 <strong>본인 적립금만</strong> 돌려받고, 정부 매칭금은 전액 환수돼요. 이자도 본인 적립금에 붙은 이자만 받을 수 있어요. 3년 채워야 정부 지원금 720만원을 받을 수 있으니, 가급적 만기까지 유지하는 게 좋아요.',
    },
    {
      question: '희망저축계좌2 만기 수령액에 세금이 붙나요?',
      answer: '본인 적립금과 정부 지원금 모두 <strong>비과세</strong>예요. 이자 소득에 대해서는 일반적으로 이자소득세가 붙지만, 저소득층 복지 통장이라 면세 또는 감면되는 경우가 많아요. 정확한 세금은 가입한 은행에 문의하세요.',
    },
  ],

  relatedSpokes: [
    { badge: '신청', title: '희망저축계좌2 신청 기간 서류와 방법', desc: '가입 조건, 필요 서류, 신청 절차', href: '/w/희망저축계좌2-신청-기간-서류-방법' },
    { badge: '해지', title: '희망저축계좌2 중도 해지 환수금과 불이익', desc: '중간에 해지하면 어떤 불이익이 있는지', href: '/w/희망저축계좌2-중도-해지-환수금-불이익' },
  ],

  sources: [
    { name: '희망저축계좌 사업 안내', url: 'https://www.mohw.go.kr', org: '보건복지부' },
    { name: '희망e음 희망저축계좌2', url: 'https://hope.welfareinfo.or.kr', org: '한국사회보장정보원' },
    { name: '복지로 희망저축계좌', url: 'https://www.bokjiro.go.kr', org: '복지로' },
    { name: '희망저축계좌2 가입 안내', url: 'https://www.nyj.go.kr', org: '남양주시청' },
    { name: '희망저축계좌 안내', url: 'https://www.gjcity.go.kr', org: '광주광역시' },
  ],
}

export default data
