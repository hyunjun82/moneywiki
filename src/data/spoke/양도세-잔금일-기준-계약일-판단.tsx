import Link from 'next/link'
import type { SpokeData } from './types'
import { SpokeFlow, FormulaBox, SpokeTimeline, SpokeTable, SpokeWarnBox, SpokeCompareCards, SpokeChecklist, RateCards } from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '양도세-잔금일-기준-계약일-판단',

  meta: {
    title: '양도세 잔금일 기준 계약일 판단 양도 시기 과세 시점 총정리',
    description: '양도세는 계약일이 아니라 잔금일을 기준으로 부과돼요. 중과유예 종료일 전후 세금 차이가 수천만원 날 수 있어요',
    keywords: ['양도세 잔금일 기준', '양도세 계약일', '양도 시기 판단', '양도세 과세 시점'],
    ogTitle: '양도세 잔금일 기준 계약일 판단 | 머니위키',
    ogDescription: '양도세 과세 시점, 잔금일 기준 원칙, 계약일과 차이, 중과유예 종료일 전후 판단 중요성까지 정리했어요.',
  },

  hub: {
    url: '/w/다주택양도세-중과유예-세율-절세-전략',
    name: '다주택양도세 중과유예 세율 절세 전략',
  },

  breadcrumb: ['세금', '양도세 잔금일 기준'],

  hero: {
    badge: '2026년 기준',
    h1: <>양도세 잔금일 기준 — <span className="text-emerald-600">계약일이 아니라 잔금일이</span> 과세 시점</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          집을 팔 때 계약서에 도장을 찍는 날과 돈을 받는 날, 둘 중 어느 날을 기준으로 세금을 매길까요? <strong>양도세는 잔금일을 기준</strong>으로 과세돼요. 계약서를 언제 썼는지가 아니라, 실제로 소유권이 넘어가는 잔금일이 양도일로 인정돼요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          <a href="https://law.go.kr/법령/소득세법/제98조" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">소득세법 제98조</a>에서 양도일을 "대금을 청산한 날"로 명시하고 있어요. 특히 중과유예 종료일(2026년 5월 9일)을 앞두고 있는 지금, 잔금일이 그 전인지 후인지에 따라 세금 차이가 수천만원에서 수억원까지 날 수 있어요. 전체 중과유예 흐름은 <Link href="/w/다주택양도세-중과유예-세율-절세-전략" className="text-blue-600 hover:underline">다주택양도세 중과유예 세율 절세 전략</Link>에서 확인할 수 있어요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '다주택 양도세 중과유예 세율 절세 전략 전체 보기',
    },
  },

  toc: [
    { id: 's1', text: '양도세 과세 시점은 언제인가요?' },
    { id: 's2', text: '잔금일 기준이 뭔가요?' },
    { id: 's3', text: '계약일과 잔금일 중 뭐가 중요한가요?' },
    { id: 's4', text: '양도 시기 판단이 왜 중요한가요?' },
    { id: 's5', text: '자주 묻는 질문' },
  ],

  sections: [
    /**
     * ===== S1: 양도세 과세 시점 개념 =====
     * 시각 요소: SpokeFlow + FormulaBox
     * 전환 스타일: A. 독자 대변형
     */
    {
      id: 's1',
      number: '01',
      heading: '양도세 과세 시점은 언제인가요?',
      subtitle: '잔금을 받은 날이 양도소득세 과세 기준일이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            양도소득세는 자산을 팔아서 차익이 생긴 시점에 부과되는 세금이에요. 그런데 '팔았다'는 시점을 정확히 언제로 볼 것인지가 중요해요. <a href="https://law.go.kr/법령/소득세법/제98조" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">소득세법 제98조</a>에서는 "대금을 청산한 날"을 양도일로 규정하고 있어요. 쉽게 말하면 잔금을 받은 날이 과세 기준일이에요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            계약서를 쓴 날이 아니라 잔금을 받은 날이 기준이 되는 이유는, 그날 비로소 실질적인 소유권 이전이 완료되기 때문이에요. 등기 이전도 대부분 잔금일에 같이 처리돼요. 양도차익도 잔금을 받을 때 확정되고, 세법에서도 이 시점을 양도일로 인정해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            특히 중과세율이 적용되는지 아닌지는 이 잔금일 하나로 결정돼요. 2026년 5월 9일 전에 잔금을 받으면 기본세율로 신고할 수 있지만, 하루만 늦어도 중과세율이 적용될 수 있어요. 중과세율은 기본세율에 20~30%p가 추가되는 구조라서 세금 차이가 매우 커요.
          </p>

          <SpokeFlow steps={[
            { icon: '1', label: '매매계약', sub: '계약서 작성' },
            { icon: '2', label: '중도금 지급', sub: '일부 대금' },
            { icon: '3', label: '잔금 지급', sub: '소유권 이전' },
            { icon: '4', label: '양도일 확정', sub: '잔금일 = 과세기준' },
          ]} />

          <FormulaBox lines={[
            { text: '양도일 = 대금 청산일(잔금일)', numbered: true },
            { text: '// 등기일과 무관: 소유권 이전등기일 ≠ 양도일 (잔금일이 우선)', numbered: true, comment: true },
            { text: '계약일 < 잔금일 → 잔금일이 기준', numbered: true },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            잔금일이 정확히 어떤 의미인지 궁금하실 거예요. 잔금일 기준 원칙을 구체적으로 확인해 볼게요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '잔금일 기준',
        title: '잔금일 기준은 어떻게 적용되나?',
        desc: '잔금일 기준 원칙과 예외 상황 확인하기',
        icon: 'clock',
      },
    },

    /**
     * ===== S2: 잔금일 기준 상세 =====
     * 시각 요소: SpokeTimeline + SpokeTable
     * 전환 스타일: D. 화제 전환형
     */
    {
      id: 's2',
      number: '02',
      heading: '잔금일 기준이 뭔가요?',
      subtitle: '대금을 완납하고 소유권을 넘기는 날을 기준으로 해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            잔금일이란 매매대금을 모두 지급하고 소유권 이전 등기를 진행하는 날을 말해요. 부동산 거래에서는 보통 계약금 10%, 중도금 10%, 잔금 80%로 나누어 지급하는데, 이 잔금을 받는 날이 양도세 과세 기준일이에요. 등기소에서 소유권 이전 등기를 마치는 것도 대부분 잔금일에 함께 처리돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            국세청 예규에서도 "대금을 청산한 날"을 양도일로 보고 있어요. 잔금을 받은 날짜가 명확하면 그날이 양도일이고, 잔금 지급일과 등기일이 다르면 잔금일을 우선해요. 실제 돈이 오간 시점을 기준으로 세금을 부과하는 거예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            다만 예외도 있어요. 계약금만 받고 계약이 해제되면 양도로 보지 않아요. 잔금 전에 중도금을 받은 상태에서 등기를 먼저 넘긴 경우에는 등기 접수일을 양도일로 볼 수도 있어요. 이런 경우 실질 거래 실태를 따져서 판단해요.
          </p>

          <SpokeTimeline events={[
            { month: '1단계', title: '계약 체결', desc: '계약금 10% 지급 → 아직 양도 아님' },
            { month: '2단계', title: '중도금 지급', desc: '중도금 10% 지급 → 아직 양도 아님' },
            { month: '3단계', title: '잔금 지급', desc: '잔금 80% 완납 → 양도일 확정' },
            { month: '4단계', title: '등기 이전', desc: '소유권 이전등기 완료 → 잔금일과 동일 시 잔금일 기준' },
          ]} />

          <SpokeTable id="date-criteria" title="양도일 판단 기준표" subtitle="2026년 기준, 소득세법 제98조 및 국세청 예규" headers={['상황', '양도일 기준', '비고']} rows={[
            ['잔금과 등기를 같은 날 처리', '잔금 지급일', '일반적인 경우'],
            ['잔금 먼저, 등기 나중', '잔금 지급일', '잔금일 우선'],
            ['등기 먼저, 잔금 나중', '잔금 지급일', '실질 거래일 기준'],
            ['중도금 후 등기 먼저(특수)', '등기 접수일', '실질 판단 필요'],
            ['계약금만 받고 해제', '양도 아님', '양도세 과세 대상 아님'],
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            잔금일 기준은 명확하지만, 실제 거래에서는 계약일과 잔금일이 수개월 차이가 나는 경우가 많아요. 둘 중 어느 날짜가 더 중요한지 비교해 볼게요.
          </p>

          <p className="text-neutral-600 mb-4 leading-relaxed">
            계약일과 잔금일 중 뭐가 정확히 중요한지 궁금하실 텐데요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '계약일 vs 잔금일',
        title: '계약일과 잔금일, 뭐가 더 중요할까?',
        desc: '계약일과 잔금일의 차이와 과세 기준 비교',
        icon: 'calc',
      },
    },

    /**
     * ===== S3: 계약일 vs 잔금일 비교 =====
     * 시각 요소: SpokeWarnBox + SpokeCompareCards
     * 전환 스타일: C. 간결 연결형
     */
    {
      id: 's3',
      number: '03',
      heading: '계약일과 잔금일 중 뭐가 중요한가요?',
      subtitle: '양도세 과세 기준은 계약일이 아니라 잔금일이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            계약일은 매도자와 매수자가 매매계약서에 서명·날인하는 날이고, 잔금일은 매매대금을 모두 지급하고 소유권을 이전하는 날이에요. 양도세 과세 기준은 잔금일이에요. 계약일이 2026년 4월이고 잔금일이 6월이라면, 중과유예 종료일(5월 9일)이 지난 뒤에 양도한 것으로 봐요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            이게 중요한 이유는 중과유예 종료일 전후로 세금 차이가 매우 크기 때문이에요. 유예 기간 내에 잔금을 받으면 기본세율 6~45%만 적용되지만, 하루만 늦어도 중과세율 26~75%가 적용될 수 있어요. 장기보유특별공제도 중과 시에는 배제돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            계약일을 아무리 일찍 잡아도 잔금일이 유예 종료일 이후면 중과세율이 적용돼요. 반대로 계약일이 늦더라도 잔금일이 유예 기간 내에 있으면 기본세율로 신고할 수 있어요. 실무에서는 계약 후 잔금까지 2~3개월이 걸리는 경우가 많아서 계약서를 쓸 때부터 잔금일을 신중하게 정해야 해요.
          </p>

          <SpokeWarnBox title="주의사항">
            <p className="mb-0 leading-relaxed">
              계약서를 일찍 썼다고 안심하면 안 돼요. 양도세 과세 기준은 <strong>잔금일</strong>이에요. 2026년 4월에 계약했어도 잔금일이 6월이면 중과유예 종료일(5월 9일) 이후 양도로 간주돼요. 계약서에 잔금일을 명시할 때 유예 종료일을 반드시 고려하세요.
            </p>
          </SpokeWarnBox>

          <SpokeCompareCards cards={[
            { title: '계약일', subtitle: '', items: ['매매계약서 작성일', '계약금 10% 지급', '양도세 과세 기준 아님', '유예 종료일 판단 무관'] },
            { title: '잔금일', subtitle: '', items: ['매매대금 완납일', '소유권 이전 등기일', '양도세 과세 기준일', '중과유예 종료일 전후 판단 기준'] }
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            잔금일이 중요한 이유를 알았으니, 왜 양도 시기 판단이 지금 더욱 중요한지 정리해 볼게요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '중요성',
        title: '양도 시기 판단이 왜 중요할까?',
        desc: '중과유예 종료일 전후 세금 차이 확인',
        icon: 'check',
      },
    },

    /**
     * ===== S4: 양도 시기 중요성 =====
     * 시각 요소: SpokeChecklist + RateCards
     * 전환 스타일: 없음 (마지막 섹션)
     */
    {
      id: 's4',
      number: '04',
      heading: '양도 시기 판단이 왜 중요한가요?',
      subtitle: '중과유예 종료일 전후로 세금 차이가 수천만원 날 수 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            양도 시기 판단이 중요한 이유는 2026년 5월 9일 중과유예 종료일 때문이에요. 이날까지 잔금을 받으면 다주택자라도 기본세율 6~45%로 신고할 수 있어요. 하지만 하루만 늦어도 2주택자는 26~65%, 3주택 이상은 36~75%의 중과세율이 적용될 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            예를 들어 양도차익이 5억원인 다주택자가 있다고 해볼게요. 유예 기간 내 잔금을 받으면 기본세율 45%와 장기보유특별공제 30%를 적용받아서 실제 과세표준이 3.5억원 정도로 줄어들고, 세액도 약 1.5억원 정도예요. 하지만 유예 종료 후 잔금을 받으면 장기보유특별공제가 배제되고 중과세율 75%가 적용돼서 세액이 3억원을 넘을 수 있어요. 같은 집을 팔아도 잔금일 하나 차이로 1억원 이상 세금이 더 나오는 거예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            그래서 지금 다주택자라면 2026년 5월 9일 이전에 잔금을 받을 수 있도록 계약 일정을 조율해야 해요. 계약서에 잔금일을 명시할 때 여유를 두고 4월 말이나 5월 초로 정하는 게 안전해요. 계약 후 등기나 대출 절차에서 예상치 못한 지연이 생길 수도 있거든요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            아래 체크리스트로 본인의 양도 시기 판단을 점검해 보세요.
          </p>

          <SpokeChecklist items={[
            { text: '매매계약서에 잔금일이 명시돼 있다', done: false, note: '구두 약속 금지' },
            { text: '잔금일이 2026년 5월 9일 이전이다', done: false, note: '중과유예 종료일 기준' },
            { text: '등기 이전 절차에 여유가 있다', done: false, note: '최소 1~2주 여유 필요' },
            { text: '매수자의 대출 승인이 완료됐다', done: false, note: '대출 지연 가능성 확인' },
            { text: '중도금까지 모두 받은 상태다', done: false, note: '잔금만 남은 상태 확인' },
          ]} />

          <RateCards cards={[
            { value: '6~45%', label: '유예 기간 내 잔금(~5/9)', lines: ['기본세율만 적용', '장특공제 가능', '다주택자도 동일'], highlightColor: 'emerald' },
            { value: '26~65%', label: '유예 종료 후 잔금(2주택)', lines: ['기본세율 +20%p', '장특공제 배제', '조정지역 내 주택'],},
            { value: '36~75%', label: '유예 종료 후 잔금(3주택+)', lines: ['기본세율 +30%p', '장특공제 배제', '조정지역 내 주택'],},
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            양도 시기를 정확히 판단하고 계약 일정을 조율하는 게 지금 다주택자의 가장 중요한 절세 전략이에요. 구체적인 매도 순서와 전략이 궁금하면 <Link href="/w/다주택-매도-순서-전략-절세" className="text-blue-600 hover:underline">다주택 매도 순서 전략</Link>을 참고하세요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '/w/다주택양도세-중과유예-세율-절세-전략',
        badge: '전체 가이드',
        title: '다주택 양도세 중과유예 절세 전략은?',
        desc: '유예 기간 활용 전략부터 잔금일 조율까지 확인하기',
        icon: 'grid',
        primary: true,
      },
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
      question: '양도세 신고 시 잔금일을 어떻게 증빙하나요?',
      answer: '매매계약서에 명시된 잔금일과 실제 잔금 입금 내역을 제출하면 돼요. 계좌이체 내역, 영수증, 등기 접수일 등이 증빙 자료가 될 수 있어요. 잔금일이 명확하지 않으면 <strong>등기 접수일을 양도일로 볼 수도 있으니</strong> 잔금 지급 내역을 꼭 보관하세요.',
    },
    {
      question: '계약 후 잔금일을 앞당길 수 있나요?',
      answer: '매도자와 매수자가 합의하면 잔금일을 변경할 수 있어요. 중과유예 종료일 전에 잔금을 받으려면 계약서 변경을 통해 잔금일을 앞당기는 게 가능해요. 다만 매수자의 대출 일정이나 등기 절차를 고려해야 하니까 미리 협의하세요.',
    },
  ],

  relatedSpokes: [
    { badge: '중과', title: '양도세 중과 뜻 기본세율 중과세율 비교', desc: '기본세율과 중과세율 차이, 중과 대상 조건', href: '/w/양도세-중과-뜻-기본세율-중과세율-비교' },
    { badge: '연혁', title: '중과 유예 연혁과 종료일 확정', desc: '2022년부터 매년 연장된 유예 제도 전체 흐름', href: '/w/중과-유예-연혁-종료일-확정' },
    { badge: '지역', title: '조정대상지역 목록 서울 경기', desc: '서울·경기 조정대상지역과 해제 지역 정리', href: '/w/조정대상지역-목록-서울-경기' },
    { badge: '전략', title: '다주택 매도 순서 전략 절세', desc: '어떤 집부터 팔아야 절세가 되는지 정리', href: '/w/다주택-매도-순서-전략-절세' },
  ],

  sources: [
    { name: '소득세법 제98조(양도 또는 취득의 시기)', url: 'https://law.go.kr/법령/소득세법/제98조', org: '국가법령정보센터' },
    { name: '소득세법 시행령 제162조(양도시기)', url: 'https://law.go.kr/법령/소득세법시행령/제162조', org: '국가법령정보센터' },
    { name: '양도소득세 과세표준 및 세액 신고 안내', url: 'https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2312&cntntsId=7711', org: '국세청' },
    { name: '2026년 경제정책방향', url: 'https://www.moef.go.kr', org: '기획재정부' },
  ],
}

export default data
