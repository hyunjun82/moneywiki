import Link from 'next/link'
import type { SpokeData } from './types'
import { SpokeTable, TipBox, FormulaBox, RateCards } from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '불법사금융-법률구조-무료소송',

  meta: {
    title: '불법사금융 법률 구조 지원 무료 소송 대리와 채무자대리인',
    description: '불법사금융 피해자를 위한 무료 법률 구조 지원을 정리했어요. 대한법률구조공단 소송 대리부터 채무자대리인 선임까지 한 번에 알려드려요.',
    keywords: ['불법사금융 법률 구조', '대한법률구조공단', '채무자대리인 선임', '피해구제 소송 대리'],
    ogTitle: '불법사금융 법률 구조 지원 무료 소송 대리와 채무자대리인 | 머니위키',
    ogDescription: '불법사금융 피해 무료 법률 구조, 채무자대리인, 소송 대리 절차를 한 번에.',
  },

  hub: {
    url: '/w/불법사금융-전체가이드',
    name: '불법사금융 전체가이드',
  },

  breadcrumb: ['복지', '불법사금융 법률 구조'],

  hero: {
    badge: '2026년 기준',
    h1: <>불법사금융 <span className="text-[#1E3A5F]">법률 구조</span> 지원 — 무료 소송 대리와 채무자대리인</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          불법 대부업자에게 빌린 돈 때문에 추심에 시달리고 있다면, 혼자 감당하지 않아도 돼요.{' '}
          <strong className="text-neutral-800">정부가 지원하는 무료 법률 구조 제도</strong>를 이용하면 변호사 비용 없이 소송까지 진행할 수 있어요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          대한법률구조공단의 채무자대리인 선임부터 피해구제 소송까지, 이 글 하나로 정리했어요.{' '}
          불법사금융 피해 대응의 전체 흐름이 궁금하면 <Link href="/w/불법사금융-전체가이드" className="text-blue-600 hover:underline">불법사금융 전체가이드</Link>에 모아뒀어요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '올인원',
      desc: '신고부터 채무 탕감, 법률 구조까지 한 페이지에',
    },
  },

  toc: [
    { id: 's1', text: '불법사금융 법률 구조는 뭔가요?' },
    { id: 's2', text: '대한법률구조공단에서 지원받을 수 있나요?' },
    { id: 's3', text: '채무자대리인은 어떻게 선임하나요?' },
    { id: 's4', text: '피해구제 소송은 어떻게 진행하나요?' },
    { id: 's5', text: '자주 묻는 질문' },
  ],

  sections: [
    // --- Section 01: 불법사금융 법률 구조란 ---
    {
      id: 's1',
      number: '01',
      heading: '불법사금융 법률 구조는 뭔가요?',
      subtitle: '정부가 변호사 비용을 대신 내주는 무료 법률 지원 제도예요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            불법사금융 법률 구조란, 미등록 대부업자나 법정 최고금리(연 20%)를 초과한 대출로 피해를 입은 분들에게 정부가 무료로 변호사를 붙여주는 제도예요.{' '}
            <a href="https://www.fsc.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">금융위원회</a>가 예산을 지원하고,{' '}
            <a href="https://www.klac.or.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">대한법률구조공단</a> 소속 변호사가 직접 대리해요.
            돈이 없어서 법률 도움을 못 받는 일이 없도록 만든 안전장치라고 보면 돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            지원 범위가 넓어서 단순 상담만이 아니라, 실제 소송 대리까지 해줘요. 불법 추심을 멈추게 하는 채무자대리인 선임, 피해금 반환 청구, 손해배상 소송, 채무부존재확인 소송, 심지어 개인회생이나 파산 대리까지 포함돼요.
            피해자 본인뿐 아니라 가족이 추심 피해를 당하고 있어도 무료 법률 서비스를 받을 수 있어요.
          </p>

          <RateCards cards={[
            { value: '0원', label: '변호사 비용', lines: ['정부 예산으로', '전액 지원해요'], highlight: '전액 지원', highlightColor: 'navy' as const },
            { value: '0원', label: '소송 비용', lines: ['인지대, 송달료 포함', '전부 정부 부담'], active: true },
            { value: '연 20%', label: '법정 최고금리', lines: ['초과 이자는 무효', '돌려받을 수 있어요'], highlight: '무효', highlightColor: 'orange' as const },
          ]} />

          <TipBox title="법정 최고금리 초과 = 불법이에요">
            <p className="mb-0 leading-relaxed">
              현행 법정 최고금리는 <strong>연 20%</strong>예요. 이자가 이보다 높다면 초과분은 법적으로 무효이고, 이미 낸 초과 이자는 돌려받을 수 있어요. 등록 여부와 상관없이 연 20%를 넘기면 불법이에요.
            </p>
          </TipBox>

          <p className="text-neutral-600 mb-0">그렇다면 대한법률구조공단에서 구체적으로 어떤 지원을 받을 수 있을까요?</p>
        </>
      ),
      bridgeCTA: { href: '#s2', badge: '지원 내용', title: '공단에서 어떤 도움을 받을 수 있을까?', desc: '무료 소송 대리부터 개인회생까지', icon: 'info' },
    },

    // --- Section 02: 대한법률구조공단 지원 ---
    {
      id: 's2',
      number: '02',
      heading: '대한법률구조공단에서 지원받을 수 있나요?',
      subtitle: '소송 대리, 법률 상담, 개인회생까지 전부 무료예요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            <a href="https://www.klac.or.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">대한법률구조공단</a>은 불법사금융 피해자를 위해 다양한 법률 서비스를 무료로 제공해요.
            단순 상담에서 끝나는 게 아니라, 실제 재판에 변호사가 나가서 대신 싸워준다는 게 핵심이에요.
            서민과 취약계층이 법적 권리를 포기하지 않도록 국가가 직접 지원하는 거예요.
            전국 어디서나 전화 132번으로 상담을 시작할 수 있어요.
          </p>

          <SpokeTable
            id="tbl1"
            title="대한법률구조공단 무료 지원 항목"
            subtitle="불법사금융 피해자 대상"
            headers={['지원 유형', '내용', '비용']}
            rows={[
              ['법률 상담', '피해 사실 확인, 대응 방법 안내', '무료'],
              ['채무자대리인 선임', '변호사가 추심 대응 대리', '무료'],
              ['피해금 반환청구 소송', '초과 이자 돌려받기', '무료'],
              ['손해배상 소송', '불법 추심으로 인한 피해 보상', '무료'],
              ['채무부존재확인 소송', '갚을 의무 없음을 법원에서 확인', '무료'],
              ['개인회생/파산 대리', '법원 절차 대리', '무료'],
            ]}
          />

          <FormulaBox lines={[
            { text: '// 대한법률구조공단 이용 3단계', comment: true },
            { text: '1. 132 전화 또는 공단 방문 → 상담 접수', numbered: true },
            { text: '2. 피해 사실 확인 → 지원 대상 여부 심사', numbered: true },
            { text: '3. 변호사 배정 → 소송 또는 대리 절차 시작', numbered: true },
          ]} />

          <p className="text-neutral-600 mb-0">공단에서 지원받을 수 있다는 걸 알았으니, 채무자대리인은 구체적으로 어떻게 선임하는지 알아볼게요.</p>
        </>
      ),
      bridgeCTA: { href: '#s3', badge: '대리인 선임', title: '채무자대리인을 세우면 추심이 멈춘다고?', desc: '선임 절차와 효력을 자세히 알아보기', icon: 'calc' },
    },

    // --- Section 03: 채무자대리인 선임 ---
    {
      id: 's3',
      number: '03',
      heading: '채무자대리인은 어떻게 선임하나요?',
      subtitle: '대부업법에 따라 변호사가 대신 추심에 대응해줘요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            채무자대리인 제도는 대부업법에 근거한 제도예요. 불법사금융 피해자에게 대한법률구조공단 소속 변호사를 무료로 대리인으로 붙여주는 거예요.
            대리인이 선임되면 채권자(대부업자)는 피해자 본인에게 직접 연락할 수 없고, 대리인을 통해서만 연락해야 해요.
            쉽게 말해서 변호사가 방패 역할을 해주는 거예요. 협박이나 야간 추심 같은 불법 행위가 바로 멈추는 효과가 있어요.
          </p>

          <FormulaBox lines={[
            { text: '// 채무자대리인 선임 절차', comment: true },
            { text: '1. 금융감독원 1332 또는 대한법률구조공단 132 전화', numbered: true },
            { text: '2. 불법사금융 피해 사실 상담 및 접수', numbered: true },
            { text: '3. 지원 대상 확인 (미등록 대부업 또는 연 20% 초과)', numbered: true },
            { text: '4. 공단 소속 변호사 채무자대리인으로 선임', numbered: true },
            { text: '5. 채권자에게 대리인 선임 통지 → 직접 추심 중단', numbered: true },
          ]} />

          <TipBox title="온라인 신청도 가능해요">
            <p className="mb-0 leading-relaxed">
              전화가 어려우면 <strong>금융감독원 홈페이지</strong>에서 온라인으로도 신청할 수 있어요. 민원/신고 메뉴에서 불법금융신고센터를 찾으면 돼요. 또한 전국 <strong>50개 서민금융통합지원센터</strong>에 직접 방문해도 상담과 접수가 가능해요.
            </p>
          </TipBox>

          <RateCards cards={[
            { value: '전화', label: '가장 빠른 방법', lines: ['즉시 상담 가능', '접수부터 안내까지'], active: true },
            { value: '온라인', label: '비대면 접수', lines: ['금감원 홈페이지에서', '24시간 신청 가능'] },
            { value: '방문', label: '대면 상담', lines: ['전국 50개 센터', '전담직원 배정'] },
          ]} />

          <p className="text-neutral-600 mb-0">대리인을 선임해서 추심을 멈췄다면, 다음은 피해를 돌려받는 소송 절차를 알아볼 차례예요.</p>
        </>
      ),
      bridgeCTA: { href: '#s4', badge: '소송 절차', title: '초과 이자를 돌려받는 소송은 어떻게?', desc: '피해금 반환부터 손해배상까지 절차 확인', icon: 'clock' },
    },

    // --- Section 04: 피해구제 소송 ---
    {
      id: 's4',
      number: '04',
      heading: '피해구제 소송은 어떻게 진행하나요?',
      subtitle: '초과 이자 반환부터 손해배상까지, 변호사가 대신 진행해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            불법사금융 피해구제 소송은 크게 세 가지로 나뉘어요. 초과 이자를 돌려받는 피해금 반환청구, 불법 추심으로 입은 정신적/물질적 피해에 대한 손해배상 청구, 그리고 갚을 의무 자체가 없다는 걸 확인하는 채무부존재확인 소송이에요.
            세 가지 모두 대한법률구조공단 변호사가 무료로 대리해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            소송 기간은 보통 6개월에서 1년 정도 걸려요. 하지만 증거가 충분하면 조정이나 화해로 더 빨리 끝나는 경우도 많아요.
            대출 계약서, 이체 내역, 문자/카톡 내용 등을 미리 모아두면 소송에 유리해요. 증거가 부족해도 변호사가 수집을 도와주니까 너무 걱정하지 않아도 돼요.
          </p>

          <SpokeTable
            id="tbl2"
            title="불법사금융 피해구제 소송 유형"
            subtitle="대한법률구조공단 무료 대리"
            headers={['소송 유형', '목적', '주요 근거']}
            rows={[
              ['피해금 반환청구', '연 20% 초과 이자 돌려받기', '이자제한법'],
              ['손해배상 청구', '불법 추심 피해 보상받기', '민법 제750조'],
              ['채무부존재확인', '갚을 의무 없음 확인받기', '대부업법'],
            ]}
          />

          <FormulaBox lines={[
            { text: '// 소송 전 준비할 증거 목록', comment: true },
            { text: '1. 대출 계약서 또는 차용증 (없어도 진행 가능)', numbered: true },
            { text: '2. 통장 이체 내역 (빌린 금액, 갚은 금액)', numbered: true },
            { text: '3. 문자, 카카오톡, 녹취록 (협박/추심 증거)', numbered: true },
            { text: '4. 진단서 (정신적 피해가 있는 경우)', numbered: true },
          ]} />

          <TipBox title="소송 비용은 정말 0원이에요">
            <p className="mb-0 leading-relaxed">
              변호사 보수, 인지대, 송달료 등 소송에 드는 비용 전부를 정부가 부담해요. 승소하면 상대방에게 소송비용을 청구할 수도 있어요. 경제적 부담 없이 법적 권리를 찾을 수 있는 제도이니, 피해를 입었다면 망설이지 말고 신청하세요.
            </p>
          </TipBox>
        </>
      ),
      bridgeCTA: { href: '/w/불법사금융-전체가이드', badge: '전체가이드', title: '불법사금융 대응 A to Z 한 번에 보기', desc: '신고, 채무 탕감, 법률 구조까지 총정리', icon: 'grid', primary: true },
    },

    // --- Section 05: FAQ ---
    {
      id: 's5',
      number: '05',
      heading: '자주 묻는 질문',
      subtitle: '불법사금융 법률 구조에 대해 자주 묻는 질문이에요',
      content: null,
    },
  ],

  faq: [
    {
      question: '불법사금융 법률 구조는 소득 기준이 있나요?',
      answer: '일반적인 법률 구조는 소득 기준이 있지만, 불법사금융 피해자 지원 사업은 <strong>서민과 취약계층</strong>을 대상으로 해요. 미등록 대부업이나 연 20% 초과 대출 피해라면 대부분 지원 대상에 해당돼요. 정확한 자격 여부는 대한법률구조공단(132)에 전화하면 바로 확인할 수 있어요.',
    },
    {
      question: '불법사금융 채무자대리인을 선임하면 빚이 없어지나요?',
      answer: '채무자대리인 선임만으로 빚이 바로 없어지는 건 아니에요. 대리인의 역할은 <strong>불법 추심을 중단</strong>시키고, 법적 절차를 통해 초과 이자를 돌려받거나 채무 자체가 무효라는 판결을 받는 거예요. 결과적으로 빚이 줄거나 없어질 수는 있지만, 적법한 원금까지 탕감되는 건 별도 절차(개인회생 등)가 필요해요.',
    },
  ],

  relatedSpokes: [
    { badge: '신고', title: '불법사금융 피해 신고 원스톱 지원', desc: '금감원 신고부터 원스톱 지원 신청까지', href: '/w/불법사금융-피해-신고-원스톱-지원' },
    { badge: '채무', title: '불법사금융 채무 조정 추심 중단', desc: '신용회복위원회 채무 감면과 추심 차단', href: '/w/불법사금융-채무조정-추심중단' },
  ],

  sources: [
    { name: '채무자대리인 무료지원 사업', url: 'https://www.korea.kr', org: '대한민국 정책브리핑' },
    { name: '불법사금융 피해 예방', url: 'https://www.fsc.go.kr', org: '금융위원회' },
    { name: '법률구조 서비스', url: 'https://www.klac.or.kr', org: '대한법률구조공단' },
  ],
}

export default data
