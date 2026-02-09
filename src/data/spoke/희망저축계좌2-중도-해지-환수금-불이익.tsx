import Link from 'next/link'
import type { SpokeData } from './types'
import { SpokeTable, TipBox, FormulaBox, RateCards } from '@/components/spoke/SpokeBlocks'

// --- Table data ---
const WITHDRAWAL_CONDITION_ROWS = [
  ['확인조사 시 근로 미활동', '3년간 소득 활동 증빙 실패 시 자동 해지'],
  ['본인적립금 누적 12개월 미납', '적립중지 신청 없이 12개월 연속 미납 시'],
  ['교육 및 사례관리 기준 미달', '의무 교육 미이수 또는 사례관리 불참 시'],
  ['생계/의료급여 책정 후 환수 요청', '수급자 전환 시 본인 요청으로 해지'],
  ['본인 사망 후 가구원 요청', '가입자 사망 시 가구원이 환수해지 신청'],
  ['압류', '채권 압류 등 법적 조치 발생 시'],
]

// --- Spoke Data ---
const data: SpokeData = {
  slug: '희망저축계좌2-중도-해지-환수금-불이익',

  meta: {
    title: '희망저축계좌2 중도 해지 환수금과 불이익 - 해지 방법과 주의사항',
    description: '희망저축계좌2 중도 해지 시 정부지원금 환수와 불이익을 알아보세요. 본인적립금만 받고 720만원 지원금을 포기하게 되는 구조와 해지 방법까지 정리했어요.',
    keywords: ['희망저축계좌2 중도 해지', '희망저축계좌2 환수금', '희망저축계좌2 해지 불이익', '희망저축계좌2 해지'],
    ogTitle: '희망저축계좌2 중도 해지 환수금과 불이익 | 머니위키',
    ogDescription: '중도 해지 시 정부지원금 환수, 불이익, 해지 방법까지 한 번에',
  },

  hub: {
    url: '',
    name: '',
  },

  breadcrumb: ['복지/연금', '희망저축계좌2 중도 해지'],

  hero: {
    badge: '2026년 기준',
    h1: <>희망저축계좌2 <span className="text-emerald-600">중도 해지</span> 환수금과 불이익 — 해지 전 꼭 확인하세요</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          &lsquo;이번 달 돈이 급해서 희망저축계좌2 해지할까&rsquo; 고민 중이라면 잠깐 멈춰 주세요.<br />
          <strong className="text-neutral-800">중도 해지</strong>하면 3년간 모은 정부지원금 720만원을 전액 포기하게 돼요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          본인이 넣은 360만원과 이자만 받을 수 있고, 정부 매칭금은 국고로 환수돼요.<br />
          해지 전에 적립중지 제도부터 검토해 보세요. 일시적 어려움이라면 최대 12개월까지 납입을 유예할 수 있어요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '올인원',
      desc: '희망저축계좌2 가입 조건부터 해지까지 한 페이지에',
    },
  },

  toc: [
    { id: 's1', text: '희망저축계좌2 중도 해지하면 어떻게 되나요?' },
    { id: 's2', text: '희망저축계좌2 환수금은 얼마나 되나요?' },
    { id: 'tbl1', text: '환수해지 조건', sub: true },
    { id: 's3', text: '희망저축계좌2 해지 불이익에는 뭐가 있나요?' },
    { id: 's4', text: '희망저축계좌2 해지는 어떻게 하나요?' },
    { id: 's5', text: '자주 묻는 질문' },
  ],

  sections: [
    // --- Section 01: 중도 해지 시 ---
    {
      id: 's1',
      number: '01',
      heading: '희망저축계좌2 중도 해지하면 어떻게 되나요?',
      subtitle: '본인적립금만 돌려받고 정부지원금 720만원은 전액 국고 환수',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            희망저축계좌2는 <strong>3년 만기 적립식 사업</strong>이에요. 3년간 매달 10만원씩 본인이 저축하면, 정부가 같은 금액(월 10만원)을 매칭해서 만기 시 총 720만원을 지원해 주는 구조예요.
            중도 해지하면 본인이 납입한 <strong>360만원(월 10만원 × 36개월)</strong>과 거기서 발생한 이자만 수령하고, <strong>정부지원금 720만원은 전액 국고로 환수</strong>돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            <a href="https://www.mohw.go.kr/board.es?mid=a10411010100&bid=0019" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">보건복지부 희망저축계좌 운영지침</a>에 따르면,
            중도 해지는 <strong>&ldquo;본인 요청 해지&rdquo;</strong>와 <strong>&ldquo;환수해지(자동 해지)&rdquo;</strong> 두 가지 유형이 있어요.
            어느 쪽이든 정부지원금은 지급되지 않아요.
          </p>

          <RateCards cards={[
            { value: '만기 유지', label: '3년 완료', lines: ['본인적립금 360만원', '정부지원금 720만원', '총 1,080만원 + 이자'], highlight: '720만원 수령', highlightColor: 'emerald', active: true },
            { value: '중도 해지', label: '해지 시', lines: ['본인적립금 360만원 + 이자만', '정부지원금 0원', '총 수령 360만원대'], highlight: '720만원 포기', highlightColor: 'orange' },
          ]} />

          <TipBox title="일시적 어려움이라면 적립중지 먼저 검토">
            <p className="mb-0 leading-relaxed">
              갑작스러운 실직이나 건강 문제 등 일시적 어려움이라면 <strong>적립중지 제도</strong>를 활용하세요.<br />
              최대 <strong>12개월</strong>까지 납입을 유예할 수 있고, 기간 종료 후 다시 적립을 재개하면 만기 수령이 가능해요.<br />
              적립중지는 관할 주민센터나{' '}
              <a href="https://hope.welfareinfo.or.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">자산형성지원사업 통합관리시스템</a>에서 신청할 수 있어요.
            </p>
          </TipBox>

          <p className="text-neutral-600 mb-0">그렇다면 자동으로 환수해지되는 조건에는 어떤 것들이 있을까요?</p>
        </>
      ),
      bridgeCTA: { href: '#s2', badge: '환수 조건', title: '자동으로 해지되는 경우가 있나요?', desc: '환수해지 조건 6가지 확인', icon: 'info' },
    },

    // --- Section 02: 환수금 ---
    {
      id: 's2',
      number: '02',
      heading: '희망저축계좌2 환수금은 얼마나 되나요?',
      subtitle: '환수해지 조건별 정리 — 12개월 미납·근로 미활동·압류 등',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            <strong>환수해지</strong>란 가입자가 직접 해지를 요청하지 않아도, 일정 조건에 해당하면 <strong>자동으로 해지</strong>되는 제도예요.
            환수해지되면 본인적립금만 돌려받고 정부지원금은 전액 국고로 환수돼요.
            <a href="https://hope.welfareinfo.or.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">자산형성지원사업 통합관리시스템</a>에서 자세한 환수해지 기준을 확인할 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            가장 흔한 환수해지 사유는 <strong>본인적립금 누적 12개월 미납</strong>이에요.
            적립중지 신청 없이 12개월 연속 납입하지 않으면 자동 해지 대상이 되니, 납입이 어려우면 반드시 적립중지를 신청해야 해요.
          </p>

          <SpokeTable
            id="tbl1"
            title="희망저축계좌2 환수해지 조건"
            subtitle="아래 조건 해당 시 자동 해지 (정부지원금 환수)"
            headers={['환수해지 사유', '상세 내용']}
            rows={WITHDRAWAL_CONDITION_ROWS}
          />

          <p className="text-xs text-neutral-400 mt-1">
            * 출처:{' '}
            <a href="https://www.gjcity.go.kr/reserve/contents.do?mId=1101110000" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">광주시 희망저축계좌 안내</a>,{' '}
            <a href="https://hope.welfareinfo.or.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">자산형성지원사업 통합관리시스템</a>
          </p>

          <TipBox title="12개월 미납 주의">
            <p className="mb-0 leading-relaxed">
              적립중지 신청 없이 <strong>12개월 연속 미납</strong>하면 자동 해지돼요.<br />
              일시적으로 납입이 어렵다면 반드시 <strong>적립중지 신청</strong>을 하세요.<br />
              적립중지는 최대 12개월까지 가능하고, 기간 종료 후 다시 적립하면 만기 수령 자격을 유지할 수 있어요.
            </p>
          </TipBox>

          <p className="text-neutral-600 mb-0">환수해지 조건을 확인했다면, 이제 중도 해지의 구체적인 불이익을 살펴볼게요.</p>
        </>
      ),
      bridgeCTA: { href: '#s3', badge: '불이익', title: '중도 해지하면 또 어떤 손해가 있나요?', desc: '재가입 제한, 이자 환수 등 추가 불이익', icon: 'clock' },
    },

    // --- Section 03: 해지 불이익 ---
    {
      id: 's3',
      number: '03',
      heading: '희망저축계좌2 해지 불이익에는 뭐가 있나요?',
      subtitle: '정부지원금 720만원 미지급 + 재가입 제한 + 이자 환수',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            중도 해지의 가장 큰 불이익은 <strong>정부지원금 720만원 전액 미지급</strong>이에요. 3년간 매달 10만원씩 저축한 본인적립금 360만원만 돌려받고, 정부가 매칭해준 720만원은 한 푼도 받을 수 없어요.
            이자 수익도 정부지원금 부분은 환수돼요. 즉, 본인적립금 360만원에서 발생한 이자만 수령 가능해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            <a href="https://www.bokjiro.go.kr/ssis-tbu/TWAT52005M/twataa/wlfareInfo/moveTWAT52005M.do?wlfareInfoId=WLF00000905" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">복지로 희망저축계좌 안내</a>에 따르면,
            중도 해지자는 <strong>재가입 시 불이익</strong>이 있을 수 있어요. 다음 모집 기간에 재가입을 희망해도 우선순위에서 밀리거나 제한될 수 있어요.
            3년간의 저축 노력이 무의미해지고, 재기 기회도 불투명해지는 셈이에요.
          </p>

          <FormulaBox lines={[
            { text: '// 희망저축계좌2 중도 해지 불이익 체크리스트', comment: true },
            { text: '1. 정부지원금 720만원 전액 미지급 (본인적립금 360만원만 수령)', numbered: true },
            { text: '2. 정부지원금에서 발생한 이자도 환수 (본인적립금 이자만 수령)', numbered: true },
            { text: '3. 재가입 시 우선순위 불이익 가능 (다음 모집 시 제한)', numbered: true },
            { text: '4. 3년간의 저축 노력과 근로 의지 증빙 무의미', numbered: true },
          ]} />

          <TipBox title="재가입 제한">
            <p className="mb-0 leading-relaxed">
              중도 해지 이력이 있으면 <strong>재가입 시 불이익</strong>이 있을 수 있어요.<br />
              다음 모집 기간에 재신청해도 우선순위에서 밀리거나, 일정 기간 재가입이 제한될 수 있어요.<br />
              정확한 제한 기준은 지자체마다 다를 수 있으니 관할 주민센터에 문의하세요.
            </p>
          </TipBox>

          <p className="text-neutral-600 mb-0">불이익을 확인했다면, 이제 해지 절차와 적립중지 신청 방법을 알아볼게요.</p>
        </>
      ),
      bridgeCTA: { href: '#s4', badge: '해지 방법', title: '그래도 해지해야 한다면?', desc: '해지 절차와 적립중지 대안 확인', icon: 'calc' },
    },

    // --- Section 04: 해지 방법 ---
    {
      id: 's4',
      number: '04',
      heading: '희망저축계좌2 해지는 어떻게 하나요?',
      subtitle: '주민센터 방문 신청 — 해지 전 적립중지 먼저 검토하세요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            희망저축계좌2 중도 해지는 관할 <strong>주민센터(행정복지센터)</strong>를 방문해서 신청하면 돼요.
            <strong>본인 요청 해지</strong>는 언제든 가능하지만, 해지하면 정부지원금 720만원을 포기하게 되니 신중하게 결정하세요.
            필요 서류는 <strong>신분증</strong>과 <strong>통장</strong>이에요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            일시적 어려움이라면 해지 전에 반드시 <strong>적립중지 제도</strong>를 먼저 검토하세요.
            적립중지는 최대 12개월까지 납입을 유예할 수 있고, 기간 종료 후 다시 적립을 재개하면 만기 수령 자격을 유지할 수 있어요.
            적립중지 신청은 주민센터 방문 또는{' '}
            <a href="https://hope.welfareinfo.or.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">자산형성지원사업 통합관리시스템</a>에서 온라인으로 가능해요.
          </p>

          <FormulaBox lines={[
            { text: '// 해지 vs 적립중지 판단 흐름', comment: true },
            { text: '1. 현재 어려움이 일시적인가? → 예: 적립중지 신청 (최대 12개월)', numbered: true },
            { text: '2. 12개월 내 재개 가능? → 예: 적립중지 후 재개', numbered: true },
            { text: '3. 향후 재개 불가능? → 중도 해지 (정부지원금 720만원 포기)', numbered: true },
            { text: '4. 해지 결정 시 → 주민센터 방문 (신분증 + 통장 지참)', numbered: true },
          ]} />

          <TipBox title="적립중지 핵심 3가지">
            <p className="mb-0 leading-relaxed">
              1. <strong>최대 12개월</strong> 납입 유예 가능<br />
              2. 기간 종료 후 <strong>재개 가능</strong> (만기 수령 자격 유지)<br />
              3. 주민센터 방문 또는{' '}
              <a href="https://hope.welfareinfo.or.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">온라인 신청</a> 가능<br /><br />
              <strong>해지는 마지막 선택</strong>이에요. 적립중지로 버틸 수 있다면 반드시 활용하세요.
            </p>
          </TipBox>
        </>
      ),
      bridgeCTA: { href: '#s5', badge: 'FAQ', title: '중도 해지 관련 궁금한 점이 더 있다면', desc: '자주 묻는 질문 확인', icon: 'info', primary: true },
    },

    // --- Section 05: FAQ ---
    {
      id: 's5',
      number: '05',
      heading: '자주 묻는 질문',
      subtitle: '희망저축계좌2 중도 해지에 대해 자주 묻는 질문이에요',
      content: null, // FAQ는 template에서 자동 렌더링
    },
  ],

  faq: [
    {
      question: '희망저축계좌2 적립중지 중에도 정부지원금을 받을 수 있나요?',
      answer: '적립중지 기간에는 <strong>정부지원금도 적립되지 않아요</strong>. 적립중지는 본인적립금 납입을 유예하는 제도이고, 정부 매칭도 중단돼요. 적립 재개 후 다시 정부지원금이 매칭되고, <strong>3년 만기 시 조건 충족하면</strong> 그동안 적립된 정부지원금을 받을 수 있어요.',
    },
    {
      question: '희망저축계좌2 해지 후 재가입할 수 있나요?',
      answer: '재가입은 가능하지만 <strong>우선순위에서 불이익</strong>이 있을 수 있어요. 중도 해지 이력이 있으면 다음 모집 시 우선순위에서 밀리거나, 일정 기간 재가입이 제한될 수 있어요. 정확한 기준은 지자체마다 다르니 관할 주민센터에 문의하세요.',
    },
  ],

  relatedSpokes: [
    { badge: '만기', title: '희망저축계좌2 만기 수령액 적립금 사용처', desc: '3년 만기 시 수령 금액과 사용 방법', href: '/w/희망저축계좌2-만기-수령액-적립금-사용처' },
    { badge: '신청', title: '희망저축계좌2 신청 기간 서류와 방법', desc: '가입 조건, 필요 서류, 신청 절차', href: '/w/희망저축계좌2-신청-기간-서류-방법' },
  ],

  sources: [
    { name: '희망저축계좌 운영지침', url: 'https://www.mohw.go.kr/board.es?mid=a10411010100&bid=0019', org: '보건복지부' },
    { name: '자산형성지원사업 통합관리시스템', url: 'https://hope.welfareinfo.or.kr', org: '한국사회보장정보원' },
    { name: '광주시 희망저축계좌 안내', url: 'https://www.gjcity.go.kr/reserve/contents.do?mId=1101110000', org: '광주광역시' },
    { name: '복지로 희망저축계좌 안내', url: 'https://www.bokjiro.go.kr/ssis-tbu/TWAT52005M/twataa/wlfareInfo/moveTWAT52005M.do?wlfareInfoId=WLF00000905', org: '복지로' },
  ],
}

export default data
