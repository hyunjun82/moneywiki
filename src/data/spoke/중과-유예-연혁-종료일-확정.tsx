import type { SpokeData } from './types'
import {
  SpokeTimeline,
  SpokeTable,
  SpokeCompareCards,
  TipBox,
  SpokeWarnBox,
  Chips,
  DetailBox,
  SpokeLinks,
} from '@/components/spoke/SpokeBlocks'
import JungkwaYuyeChecker from '@/components/checkers/JungkwaYuyeChecker'

const data: SpokeData = {
  slug: '중과-유예-연혁-종료일-확정',

  meta: {
    title: '양도세 중과 유예 연혁 종료일 확정 | 2026 중과유예 보완조치 잔금 기한',
    description: '양도세 중과 유예가 2026년 5월 9일에 최종 종료 확정된 거 아시나요? 2022년부터 매년 연장됐던 중과유예 연혁과 보완조치 잔금 기한, 지역별 경과규정까지 한 번에 정리해드려요.',
    keywords: ['양도세 중과 유예 연혁', '중과유예 종료일 확정', '중과유예 보완조치', '중과유예 잔금 기한'],
    ogTitle: '양도세 중과 유예 연혁 종료일 확정 | 머니위키',
    ogDescription: '중과 유예 종료일 2026.5.9 확정, 보완조치와 잔금 기한까지 정리했어요.',
  },

  hub: {
    url: '/w/다주택양도세-중과유예-세율-절세-전략',
    name: '다주택양도세 중과유예 세율 절세 전략',
  },

  breadcrumb: ['세금', '다주택양도세', '중과유예 연혁 종료일'],

  summary3: [
    <>중과 유예 <strong>2026년 5월 9일 종료 확정</strong> (추가 연장 없음)</>,
    <>기존 4구(강남/서초/송파/용산): 5월 9일 전 계약 + <strong>4개월 내 잔금</strong></>,
    <>신규 조정대상지역: 5월 9일 전 계약 + <strong>6개월 내 잔금</strong></>,
  ],

  sourceBar: {
    badge: '출처',
    name: '기획재정부 다주택 중과 유예 종료 및 보완방안',
    date: '2026.02',
  },

  prevNext: {
    prev: { title: '양도세 중과 뜻 기본세율 중과세율 차이', href: '/w/양도세-중과-뜻-기본세율-중과세율-비교' },
    next: { title: '양도세 잔금일 기준 계약일 차이', href: '/w/양도세-잔금일-기준-계약일-판단' },
  },

  stickyBar: {
    topLabel: '중과 유예 종료일',
    value: '2026년 5월 9일',
    buttonText: '내 상황 체크하기 →',
    scrollTo: '#checker',
  },

  hero: {
    badge: '2026년 2월 확정',
    h1: (
      <>
        양도세 중과 유예 <span className="text-[#1E3A5F]">연혁 종료일 확정</span> | 2026 중과유예 보완조치 잔금 기한
      </>
    ),
    intro: (
      <p className="text-base text-neutral-500 leading-relaxed">
        매년 연장될 거라 믿었던 다주택자 양도세 중과 유예가 2026년 5월 9일에 끝나요.
        정부가 2월 12일 공식 발표했어요. 이번엔 진짜 종료예요.
        다만 기존 조정대상지역과 신규 조정대상지역에 따라 잔금 기한이 달라지는 보완조치가 함께 나왔어요.
        지금 바로 내 상황에 맞는 중과 적용 여부를 체크해 보세요.
      </p>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '다주택 양도세 중과유예 세율 절세 전략 한눈에 보기',
    },
    quickAnswer: {
      title: '중과유예 종료일은?',
      body: '2026년 5월 9일이 최종 종료일이에요. 추가 연장은 없어요. 다만 5월 9일 전에 계약하면 기존 4구는 4개월, 신규 조정대상지역은 6개월 내 잔금까지 유예가 적용돼요.',
      hook: '내 주택이 어디 해당하는지 체커로 바로 확인할 수 있어요.',
    },
  },

  toc: [
    { id: 'checker', label: '중과 유예 적용 여부 체크' },
    { id: 'sec-history', label: '양도세 중과 유예 연혁은 어떻게 진행됐나요?' },
    { id: 'sec-deadline', label: '양도세 중과유예 종료일은 언제 확정됐나요?' },
    { id: 'sec-complement', label: '양도세 중과유예 보완조치 내용은 무엇인가요?' },
    { id: 'sec-grace', label: '양도세 중과유예 잔금 기한은 어떻게 되나요?' },
    { id: 'sec-faq', label: '자주 묻는 질문' },
  ],

  sections: [
    /* ── CHECK ── */
    {
      id: 'checker',
      number: 'CHECK',
      heading: '양도세 중과 유예 적용 여부, 내 상황은?',
      subtitle: '잔금일과 조정대상지역 유형으로 판정해요',
      content: <JungkwaYuyeChecker />,
    },

    /* ── SECTION 02: 연혁 ──
     * 시각: SpokeTimeline
     * 전환: C 간결 연결형
     */
    {
      id: 'sec-history',
      number: 'SECTION 02',
      heading: '양도세 중과 유예 연혁은 어떻게 진행됐나요?',
      subtitle: '2022년 시작, 매년 1년씩 연장, 2026년 종료 확정',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            다주택자 양도세 중과 유예는 2022년 5월 10일에 처음 시작됐어요. 윤석열 정부 출범 직후 부동산 규제 완화 기조로 전환하면서, 소득세법 시행령 제167조의3을 신설해 <a href="/w/조정대상지역-다주택자-양도세-중과세율-비과세" className="text-[#4A7AB5] underline">조정대상지역 다주택자</a>에게 기본세율만 적용하는 한시적 조치를 시행했어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            첫해에는 1년만 유예할 계획이었지만, 금리 인상으로 거래량이 급감하면서 매년 1년씩 연장됐어요. 시행령 개정은 국회 동의 없이 정부가 단독으로 결정할 수 있기 때문에, 종료일 직전에 연장을 발표하는 패턴이 반복됐어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            하지만 2025년 하반기 서울 집값 상승과 투기 우려가 커지면서, 정부는 2026년 2월 12일 중과 유예를 더 이상 연장하지 않겠다고 공식 발표했어요. 4년간 이어진 유예 조치가 마침내 마침표를 찍은 거예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            연혁을 알았으니 종료일 확정 내용으로 넘어갈게요.
          </p>

          <SpokeTimeline events={[
            { month: '2022.05', title: '중과 유예 최초 시행', desc: '소득세법 시행령 167조의3 신설, 1년간 중과 배제', status: 'normal' as const, tag: '1차' },
            { month: '2023.02', title: '1차 연장 결정', desc: '금리 인상 거래절벽, 2024년 5월 9일까지 연장', status: 'normal' as const, tag: '2차' },
            { month: '2024.02', title: '2차 연장 결정', desc: '건설경기 침체 미분양 증가, 2025년 5월 9일까지 연장', status: 'normal' as const, tag: '3차' },
            { month: '2025.02', title: '3차 연장 결정', desc: '서울 상승세에도 지방 침체, 2026년 5월 9일까지 연장', status: 'normal' as const, tag: '4차' },
            { month: '2026.02', title: '종료 확정 발표', desc: '추가 연장 없음, 5월 9일 종료 + 보완조치 발표', status: 'warning' as const, tag: '종료' },
          ]} />

          <SpokeLinks
            title="중과 유예 연혁 더 알아보기"
            items={[
              { num: '01', heading: '양도세 중과 뜻과 세율 비교', desc: '기본세율과 중과세율 차이가 얼마나 되는지 확인', href: '/w/양도세-중과-뜻-기본세율-중과세율-비교' },
              { num: '02', heading: '조정대상지역 다주택자 중과세율', desc: '조정대상지역 내 중과 적용 기준과 세율', href: '/w/조정대상지역-다주택자-양도세-중과세율-비과세' },
            ]}
          />
        </>
      ),
      pasBridge: {
        href: '/w/양도세-중과-뜻-기본세율-중과세율-비교',
        question: '유예가 끝나면 세율이 정확히 얼마나 오르나요?',
        answer: <>2주택자는 기본세율에 <strong>20%p</strong>, 3주택자는 <strong>30%p</strong>가 추가돼요</>,
        buttonText: '중과세율 비교 보기 →',
      },
    },

    /* ── SECTION 03: 종료일 확정 ──
     * 시각: Chips + SpokeCompareCards
     * 전환: A 독자 대변형
     */
    {
      id: 'sec-deadline',
      number: 'SECTION 03',
      heading: '양도세 중과유예 종료일은 언제 확정됐나요?',
      subtitle: '2026년 5월 9일이 마지막, 5월 10일부터 중과 재개',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            중과유예 종료일은 <strong>2026년 5월 9일</strong>이에요. 2026년 2월 12일 기획재정부가 공식 발표했고, 추가 연장은 없다고 못 박았어요. 이날까지 잔금을 받으면(양도하면) 기본세율이 적용되고, 5월 10일부터는 <a href="/w/양도세-중과-뜻-기본세율-중과세율-비교" className="text-[#4A7AB5] underline">중과세율</a>이 다시 적용돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            여기서 핵심은 양도 시기의 기준이에요. 양도세법상 양도 시기는 계약일이 아니라 <strong>잔금 수령일(대금청산일)</strong>이에요. 4월에 계약하고 5월 8일에 잔금을 받으면 유예 적용, 같은 계약인데 잔금이 5월 12일이면 중과가 돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            등기를 먼저 하고 잔금을 나중에 받는 경우도 있는데, 이때는 등기접수일이 양도일이 돼요. 잔금일과 등기접수일 중 빠른 날이 기준이라고 보면 돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            5월 9일 안에 잔금을 못 맞출 수도 있잖아요. 그래서 정부가 보완조치를 함께 발표했어요.
          </p>

          <Chips items={[
            { icon: '📅', label: '종료일', value: '2026.5.9' },
            { icon: '💰', label: '유예 중 세율', value: '6~45%' },
            { icon: '📈', label: '2주택 중과', value: '+20%p' },
            { icon: '📈', label: '3주택 중과', value: '+30%p' },
          ]} />

          <SpokeCompareCards cards={[
            {
              title: '유예 기간 (5.9까지)',
              subtitle: '기본세율 적용',
              items: ['기본세율 6~45%', '장기보유특별공제 가능', '주택 수 무관 동일 세율', '2년 보유 시 공제 적용'],
              recommended: true,
              recLabel: '절세',
            },
            {
              title: '중과 재개 (5.10부터)',
              subtitle: '추가세율 적용',
              items: ['기본세율 + 20~30%p', '장기보유특별공제 배제', '2주택 이상 중과 대상', '조정대상지역 내 주택'],
            },
          ]} />
        </>
      ),
      pasBridge: {
        href: '/w/양도세-잔금일-기준-계약일-판단',
        question: '잔금일을 5월 9일 안에 맞추기 어려우면 어떻게 하나요?',
        answer: <>정부가 보완조치를 마련했어요. 5월 9일 전에 계약만 하면 지역별로 <strong>4~6개월</strong> 추가 유예를 받을 수 있어요.</>,
        buttonText: '잔금일 기준 확인 →',
      },
    },

    /* ── SECTION 04: 보완조치 ──
     * 시각: SpokeTable + SpokeWarnBox
     * 전환: D 화제 전환형
     */
    {
      id: 'sec-complement',
      number: 'SECTION 04',
      heading: '양도세 중과유예 보완조치 내용은 무엇인가요?',
      subtitle: '5월 9일 전 계약하면 잔금 기한을 추가로 받을 수 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            정부는 중과유예 종료와 함께 보완조치를 발표했어요. 핵심은 5월 9일 전에 매매계약만 체결하면, 잔금일이 5월 9일을 넘기더라도 일정 기간 내에 양도하면 중과를 적용하지 않겠다는 거예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            기존 조정대상지역인 <a href="/w/조정대상지역-목록-서울-경기" className="text-[#4A7AB5] underline">서울 강남구, 서초구, 송파구, 용산구</a>에 있는 주택은 5월 9일 전에 계약하고 계약일로부터 <strong>4개월 내</strong>에 잔금을 받으면 돼요. 4월 1일에 계약하면 8월 1일까지 잔금을 치르면 중과가 안 돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            2025년 10월 16일 이후 새로 지정된 조정대상지역은 2개월 더 여유가 있어요. 계약일로부터 <strong>6개월 내</strong>에 잔금을 받으면 중과가 유예돼요. 신규 지정으로 갑자기 중과 대상이 된 점을 감안한 조치예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            그런데 한 가지 주의할 게 있어요. 보완조치는 소득세법 시행령 개정이 필요한데, 2월 13일 입법예고를 거쳐 2월 내 공포 및 시행을 목표로 하고 있어요.
          </p>

          <SpokeTable
            id="complement-table"
            title="지역별 보완조치 비교"
            subtitle="2026.02.12 기획재정부 발표 기준"
            headers={['구분', '기존 4구 (강남/서초/송파/용산)', '신규 조정대상지역']}
            rows={[
              ['지정 시점', '2025.10.15 이전', '2025.10.16 이후'],
              ['계약 기한', '2026.5.9 이전 체결', '2026.5.9 이전 체결'],
              ['잔금 기한', '계약일로부터 4개월 내', '계약일로부터 6개월 내'],
              ['토지거래허가 입주', '허가일로부터 4개월 내', '허가일로부터 6개월 내'],
              ['적용 세율', '기본세율 (6~45%)', '기본세율 (6~45%)'],
            ]}
          />

          <SpokeWarnBox title="보완조치 적용 시 주의사항">
            <p className="mb-0 leading-relaxed">
              보완조치는 5월 9일 <strong>이전</strong>에 매매계약을 체결한 경우에만 해당돼요. 5월 10일 이후 계약은 보완조치 대상이 아니에요. 또한 임대 중인 주택의 경우 실거주 의무가 임대차계약 종료일까지 유예되지만, 늦어도 2028년 2월 11일까지는 입주해야 해요.
            </p>
          </SpokeWarnBox>

          <SpokeLinks
            title="보완조치 관련 더 알아보기"
            items={[
              { num: '01', heading: '양도세 잔금일 기준과 계약일 차이', desc: '잔금일이 양도일인 이유와 예외 상황', href: '/w/양도세-잔금일-기준-계약일-판단' },
              { num: '02', heading: '조정대상지역 목록 서울 경기', desc: '어떤 지역이 조정대상인지 확인', href: '/w/조정대상지역-목록-서울-경기' },
            ]}
          />
        </>
      ),
      pasBridge: {
        href: '/w/다주택-매도-순서-전략-절세',
        question: '보완조치 기한 안에 매도하려면 구체적으로 어떤 일정으로 움직여야 하나요?',
        answer: <>양도차익이 큰 주택부터 우선 매도하고, <strong>잔금일을 역산</strong>해서 매물 시점을 정해야 해요.</>,
        buttonText: '매도 순서 전략 보기 →',
      },
    },

    /* ── SECTION 05: 잔금 기한 ──
     * 시각: DetailBox + TipBox
     * 전환: 없음 (마지막 → bridgeCTA)
     */
    {
      id: 'sec-grace',
      number: 'SECTION 05',
      heading: '양도세 중과유예 잔금 기한은 어떻게 되나요?',
      subtitle: '지역별로 잔금 기한이 다르고, 기한 초과 시 즉시 중과 적용',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            중과유예 잔금 기한은 지역에 따라 달라요. 기존 조정대상지역(강남/서초/송파/용산)은 <strong>계약일로부터 4개월</strong>, 나머지 신규 조정대상지역은 <strong>계약일로부터 6개월</strong>이에요. 두 경우 모두 5월 9일 이전에 계약을 체결해야 하는 건 동일해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            구체적으로 계산하면, 기존 4구에서 5월 9일에 계약하면 잔금 기한이 9월 8일이에요. 신규 지역이라면 11월 8일까지예요. 4월 1일에 계약했다면 기존 4구는 8월 1일, 신규 지역은 10월 1일이 잔금 기한이에요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            3주택자가 양도차익 5억 원인 주택을 파는 경우, 유예 중이면 약 1.6억 원인 세금이 중과되면 약 3.2억 원으로 <a href="/w/다주택-양도세-중과-전후-세액-비교" className="text-[#4A7AB5] underline">두 배 가까이</a> 늘어나요. 잔금 기한 하루 차이가 1.6억 원 차이인 거예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            <a href="/w/중과-유예-종료-부동산-시장-전망" className="text-[#4A7AB5] underline">유예 종료 후 시장 전망</a>도 함께 살펴보면 매도 타이밍을 잡는 데 도움이 돼요.
          </p>

          <DetailBox
            title="잔금 기한 관리 체크리스트"
            items={[
              { heading: '양도차익 큰 주택 목록 정리', desc: '취득가 대비 현재 시세를 확인해서 양도차익이 큰 순서대로 정리하세요' },
              { heading: '잔금일 역산 후 매물 시점 결정', desc: '기존 4구는 계약일+4개월, 신규 지역은 계약일+6개월이 잔금 기한이에요' },
              { heading: '매수자 확보 기간 고려', desc: '통상 2~3개월 소요, 급매 아니면 지금 바로 매물 등록이 필요해요' },
              { heading: '계약서에 잔금일 명시', desc: '잔금일을 구체적으로 적고, 변경 시 양측 합의 조항도 넣어두세요' },
            ]}
          />

          <TipBox title="잔금일 관리 핵심">
            <p className="mb-0 leading-relaxed">
              매매계약서에 잔금일을 명확하게 적어두세요. 잔금일이 불분명하면 등기접수일이 양도일이 돼요. 계약서에 '잔금일: 2026년 O월 O일'이라고 구체적으로 적는 게 안전해요. 특약으로 잔금일 변경 시 양측 합의 조항도 넣어두면 좋아요.
            </p>
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '/w/다주택양도세-중과유예-세율-절세-전략',
        badge: '절세 전략',
        title: '다주택 양도세 절세 전략이 더 궁금하다면?',
        desc: '중과유예 활용부터 매도 순서까지 전체 가이드 확인하기',
        icon: 'grid',
      },
    },

    /* ── FAQ ── */
    {
      id: 'sec-faq',
      number: '06',
      heading: '자주 묻는 질문',
      subtitle: '',
      content: null,
    },
  ],

  faq: [
    {
      question: '양도세 중과 유예 종료 후 시행령을 또 개정해서 연장할 수 있나요?',
      answer: '법적으로는 가능해요. 시행령은 정부 단독으로 개정할 수 있거든요. 하지만 2026년 2월 12일 기획재정부가 <strong>추가 연장 없음</strong>을 공식 발표했기 때문에, 연장 가능성에 기대서 매도를 미루는 건 위험해요.',
    },
    {
      question: '양도세 중과 유예 보완조치는 조정대상지역이 아닌 곳에도 적용되나요?',
      answer: '아니에요. 보완조치는 <strong>조정대상지역 내 주택</strong>에만 해당돼요. 비규제지역 주택은 원래부터 중과 대상이 아니라서 별도 보완조치가 필요 없어요.',
    },
  ],

  relatedSpokes: [
    { badge: '개념', title: '양도세 중과 뜻 기본세율 중과세율 차이', desc: '기본세율과 중과세율 차이를 세율표로 비교', href: '/w/양도세-중과-뜻-기본세율-중과세율-비교' },
    { badge: '시기', title: '양도세 잔금일 기준 계약일 차이', desc: '잔금일과 계약일 중 뭐가 양도일인지 확인', href: '/w/양도세-잔금일-기준-계약일-판단' },
    { badge: '전략', title: '다주택 매도 순서 전략 절세', desc: '어떤 집부터 팔아야 절세가 되는지 정리', href: '/w/다주택-매도-순서-전략-절세' },
    { badge: '전망', title: '중과 유예 종료 부동산 시장 전망', desc: '유예 종료 후 시장 영향과 대응 전략', href: '/w/중과-유예-종료-부동산-시장-전망' },
  ],

  sources: [
    { name: '다주택 중과 유예 종료 및 보완방안 (2026.02.12)', url: 'https://www.korea.kr/news/policyNewsView.do?newsId=148959488', org: '대한민국 정책브리핑' },
    { name: '소득세법 시행령 제167조의3', url: 'https://law.go.kr/법령/소득세법시행령/제167조의3', org: '국가법령정보센터' },
    { name: '양도소득세 기본정보', url: 'https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2312&cntntsId=7711', org: '국세청' },
  ],
}

export default data
