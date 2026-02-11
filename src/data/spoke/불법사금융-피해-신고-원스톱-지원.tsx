import Link from 'next/link'
import type { SpokeData } from './types'
import { SpokeTable, TipBox, FormulaBox, RateCards } from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '불법사금융-피해-신고-원스톱-지원',

  meta: {
    title: '불법사금융 피해 신고 방법 원스톱 지원 신청과 절차',
    description: '불법사금융 피해를 당했을 때 신고하는 방법과 원스톱 지원 신청 절차를 정리했어요. 금감원 1332 신고부터 서민금융통합지원센터 방문까지 한 번에 알려드려요.',
    keywords: ['불법사금융 피해 신고', '불법사금융 원스톱 지원', '서민금융통합지원센터', '불법사금융 신고 절차'],
    ogTitle: '불법사금융 피해 신고 방법 원스톱 지원 신청과 절차 | 머니위키',
    ogDescription: '불법사금융 피해 신고, 원스톱 지원 신청, 서민금융통합지원센터 안내까지 한 번에.',
  },

  hub: {
    url: '/w/불법사금융-전체가이드',
    name: '불법사금융 전체가이드',
  },

  breadcrumb: ['복지', '불법사금융 피해 신고'],

  hero: {
    badge: '2026년 기준',
    h1: <>불법사금융 <span className="text-[#1E3A5F]">피해 신고</span> 방법 — 원스톱 지원 신청과 절차</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          불법 고금리 대출이나 추심에 시달리고 있다면 혼자 해결하려고 하지 마세요.<br />
          2026년 3월부터 <strong className="text-neutral-800">한 번의 신고</strong>만으로 추심 중단, 수사 의뢰, 법률 지원까지 한꺼번에 받을 수 있는 원스톱 지원 체계가 본격 시행돼요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          금감원 1332 신고부터 서민금융통합지원센터 방문까지, 피해를 구제받는 전체 절차를 정리했어요.<br />
          불법사금융 관련 모든 내용은 <Link href="/w/불법사금융-전체가이드" className="text-blue-600 hover:underline">불법사금융 전체가이드</Link>에 모아뒀어요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '올인원',
      desc: '불법사금융 판별, 신고, 구제, 대안 대출까지 한 페이지에',
    },
  },

  toc: [
    { id: 's1', text: '불법사금융 피해는 어떻게 신고하나요?' },
    { id: 's2', text: '불법사금융 원스톱 지원은 뭔가요?' },
    { id: 's3', text: '서민금융통합지원센터는 어디에 있나요?' },
    { id: 's4', text: '불법사금융 신고 절차는 어떻게 되나요?' },
    { id: 's5', text: '자주 묻는 질문' },
  ],

  sections: [
    // --- Section 01: 신고 방법 ---
    {
      id: 's1',
      number: '01',
      heading: '불법사금융 피해는 어떻게 신고하나요?',
      subtitle: '전화, 방문, 온라인 세 가지 방법으로 신고할 수 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            불법사금융 피해를 당했다면 가장 먼저 <strong>금융감독원 불법사금융신고센터</strong>에 신고하는 게 중요해요.
            전화, 방문, 온라인 세 가지 방법 중 편한 걸 선택하면 돼요.
            신고서 서식도 객관식 위주로 개편되어서 어렵지 않게 작성할 수 있어요.
            신고 접수 후에는 금감원이 내용을 분석하고, 경찰청 수사 의뢰까지 자동으로 연계해 줘요.
          </p>

          <SpokeTable
            id="tbl1"
            title="불법사금융 피해 신고 방법"
            subtitle="세 가지 채널 중 편한 걸 선택하세요"
            headers={['신고 방법', '연락처/경로', '특징']}
            rows={[
              ['전화 신고', '금감원 1332', '즉시 상담 + 신고 접수'],
              ['방문 신고', '전국 50개 서민금융통합지원센터', '전담직원이 신고서 작성 도와줘요'],
              ['온라인 신고', '금감원 홈페이지 > 민원/신고 > 불법금융신고센터', '24시간 접수 가능'],
            ]}
          />

          <TipBox title="신고할 때 준비하면 좋은 것들">
            <p className="mb-0 leading-relaxed">
              대출 계약서, 입출금 내역, 문자/카톡 대화 내용, 추심 녹음 파일 등이 있으면 처리가 빨라져요.<br />
              증거가 없어도 신고는 가능하니까 일단 연락부터 하세요.
            </p>
          </TipBox>

          <p className="text-neutral-600 mb-0">신고만으로 끝나는 게 아니에요. 2026년부터는 한 번의 신고로 모든 지원을 한꺼번에 받을 수 있어요.</p>
        </>
      ),
      bridgeCTA: { href: '#s2', badge: '원스톱', title: '신고 한 번으로 어디까지 도와주나요?', desc: '추심 중단부터 법률 지원까지 한꺼번에', icon: 'info' },
    },

    // --- Section 02: 원스톱 지원 ---
    {
      id: 's2',
      number: '02',
      heading: '불법사금융 원스톱 지원은 뭔가요?',
      subtitle: '한 번의 신고로 추심 중단, 수사 의뢰, 법률 지원까지 받는 체계예요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            <strong>원스톱 지원</strong>이란 불법사금융 피해자가 여러 기관을 따로 찾아다니지 않아도 되도록 만든 통합 지원 체계예요.
            금융위원회, 금감원, 경찰청, 과기정통부, 법률구조공단 등이 협약을 맺어서 2026년 3월부터 본격 시행돼요.
            쉽게 말해서, 신고 한 번이면 추심 중단부터 수사 의뢰, 통신 차단, 법률 지원까지 알아서 연결해 줘요.
            피해자 입장에서는 서민금융통합지원센터 한 곳만 방문하면 모든 절차가 시작되는 거예요.
          </p>

          <RateCards cards={[
            { value: '추심 중단', label: '금감원', lines: ['불법추심 즉시 중단 요청', '채권 추심 차단 조치'], highlight: '즉시 중단', highlightColor: 'navy' },
            { value: '수사 의뢰', label: '경찰청', lines: ['불법 대부업체 수사', '자동 연계로 별도 신고 불필요'], active: true },
            { value: '법률 지원', label: '법률구조공단', lines: ['무료 법률 상담', '소송 대리 지원 가능'], highlight: '무료', highlightColor: 'navy' },
          ]} />

          <TipBox title="불법사금융예방대출도 함께 신청하세요">
            <p className="mb-0 leading-relaxed">
              피해 구제와 함께 <strong>불법사금융예방대출</strong>도 받을 수 있어요. 2026년 기준 금리가 기존 15.9%에서 <strong>실질 6.3%</strong>로 인하됐고, 공급 규모도 1,326억원에서 <strong>2,000억원</strong>으로 확대됐어요.
            </p>
          </TipBox>

          <p className="text-neutral-600 mb-0">그렇다면 원스톱 지원을 받으려면 어디로 가야 할까요?</p>
        </>
      ),
      bridgeCTA: { href: '#s3', badge: '센터 안내', title: '가까운 서민금융통합지원센터는 어디일까?', desc: '전국 50개 센터 위치와 연락처', icon: 'info' },
    },

    // --- Section 03: 서민금융통합지원센터 ---
    {
      id: 's3',
      number: '03',
      heading: '서민금융통합지원센터는 어디에 있나요?',
      subtitle: '전국 50개 센터에서 전담직원이 직접 도와줘요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            서민금융통합지원센터는 전국에 50개가 운영되고 있어요. 대표 전화번호는 <strong>1600-5500</strong>이에요.
            신용회복위원회 전담직원이 상주하고 있어서, 방문하면 신고서 작성부터 대출 상담까지 한 번에 도와줘요.
            직접 방문이 어려우면 전화로 먼저 상담받고, 가까운 센터를 안내받을 수도 있어요.
            센터에서는 불법사금융 피해 신고뿐 아니라 채무 조정, 서민 대출 상담 등 다양한 금융 지원을 받을 수 있어요.
          </p>

          <FormulaBox lines={[
            { text: '// 서민금융통합지원센터 이용 방법', comment: true },
            { text: '1. 대표 전화 1600-5500으로 먼저 상담', numbered: true },
            { text: '2. 가까운 센터 위치 안내받기', numbered: true },
            { text: '3. 센터 방문 시 전담직원 배정', numbered: true },
            { text: '4. 신고서 작성 + 피해 구제 절차 시작', numbered: true },
          ]} />

          <TipBox title="방문 전에 챙길 것">
            <p className="mb-0 leading-relaxed">
              신분증, 대출 관련 문자나 계약서, 입출금 내역을 가져가면 상담이 빨라져요.<br />
              아무것도 없어도 괜찮아요. 전담직원이 필요한 부분을 안내해 줘요.
            </p>
          </TipBox>

          <p className="text-neutral-600 mb-0">센터를 찾았다면, 이제 신고 후 처리가 어떻게 진행되는지 알아볼게요.</p>
        </>
      ),
      bridgeCTA: { href: '#s4', badge: '절차 확인', title: '신고 후에는 어떤 순서로 처리되나요?', desc: '접수부터 법률 지원까지 전체 흐름', icon: 'clock' },
    },

    // --- Section 04: 신고 절차 ---
    {
      id: 's4',
      number: '04',
      heading: '불법사금융 신고 절차는 어떻게 되나요?',
      subtitle: '신고 접수부터 법률 지원까지 8단계로 진행돼요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            불법사금융 피해를 신고하면 여러 기관이 동시에 움직여요. 피해자가 직접 기관을 돌아다닐 필요 없이, 원스톱 지원 체계 안에서 자동으로 연계돼요.
            금감원이 신고 내용을 분석하면 경찰청에 수사 의뢰가 들어가고, 과기정통부에서는 불법 업체의 통신을 차단해요.
            법률구조공단에서 소송 지원까지 연결되니까, 피해자는 처음에 신고만 하면 나머지는 시스템이 알아서 돌아가는 구조예요.
            아래 절차를 보면 전체 흐름이 한눈에 들어올 거예요.
          </p>

          <FormulaBox lines={[
            { text: '// 불법사금융 신고 후 처리 절차 (원스톱)', comment: true },
            { text: '1. 서민금융통합지원센터 방문 또는 1332 전화', numbered: true },
            { text: '2. 전담직원 배정', numbered: true },
            { text: '3. 신고서 작성 지원 (객관식 위주로 간편)', numbered: true },
            { text: '4. 금감원이 신고 내용 분석', numbered: true },
            { text: '5. 경찰청 수사 의뢰 자동 연계', numbered: true },
            { text: '6. 과기정통부 통신 차단 요청', numbered: true },
            { text: '7. 법률구조공단 소송 지원 연계', numbered: true },
            { text: '8. 채무자대리인 선임 (필요 시)', numbered: true },
          ]} />

          <TipBox title="처리 기간은 얼마나 걸리나요?">
            <p className="mb-0 leading-relaxed">
              추심 중단 요청은 신고 접수 후 <strong>즉시</strong> 들어가요. 수사 의뢰와 통신 차단도 빠르게 진행되지만, 최종 법적 조치까지는 사안에 따라 다를 수 있어요.<br />
              진행 상황은 <a href="https://www.fss.or.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">금융감독원</a> 또는 1332로 확인할 수 있어요.
            </p>
          </TipBox>

          <p className="text-xs text-neutral-400 mt-1">* 2026년 3월 본격 시행 기준. 세부 절차는 시행 후 변경될 수 있어요.</p>
        </>
      ),
      bridgeCTA: { href: '/w/불법사금융-전체가이드', badge: '전체가이드', title: '불법사금융 관련 모든 정보 한 번에 보기', desc: '판별, 신고, 구제, 대안 대출까지', icon: 'grid', primary: true },
    },

    // --- Section 05: FAQ ---
    {
      id: 's5',
      number: '05',
      heading: '자주 묻는 질문',
      subtitle: '불법사금융 피해 신고에 대해 자주 묻는 질문이에요',
      content: null,
    },
  ],

  faq: [
    {
      question: '불법사금융 피해 신고하면 보복당하지 않나요?',
      answer: '신고자 신원은 <strong>철저히 보호</strong>돼요. 금감원과 경찰청이 협력해서 신고 즉시 추심 중단 조치를 취하고, 불법 업체에 대한 수사가 진행돼요. 보복 행위 자체가 추가 범죄이기 때문에 두려워하지 말고 신고하는 게 가장 중요해요.',
    },
    {
      question: '불법사금융 피해 신고는 익명으로도 가능한가요?',
      answer: '네, 금감원 불법사금융신고센터(1332)나 온라인으로 <strong>익명 신고</strong>가 가능해요. 다만 피해 구제(추심 중단, 법률 지원 등)를 직접 받으려면 본인 확인이 필요해서, 실명으로 신고하는 게 더 빠르게 도움을 받을 수 있어요.',
    },
  ],

  relatedSpokes: [
    { badge: '채무', title: '불법사금융 채무 조정 추심 중단', desc: '신용회복위원회 채무 감면과 추심 차단', href: '/w/불법사금융-채무조정-추심중단' },
    { badge: '법률', title: '불법사금융 법률 구조 무료 소송', desc: '무료 변호사 지원과 채무자대리인 선임', href: '/w/불법사금융-법률구조-무료소송' },
  ],

  sources: [
    { name: '불법사금융 피해 원스톱 지원 대책', url: 'https://www.korea.kr', org: '대한민국 정책브리핑' },
    { name: '불법사금융 신고센터', url: 'https://www.fsc.go.kr', org: '금융위원회' },
    { name: '불법사금융신고센터 1332', url: 'https://www.fss.or.kr', org: '금융감독원' },
  ],
}

export default data
