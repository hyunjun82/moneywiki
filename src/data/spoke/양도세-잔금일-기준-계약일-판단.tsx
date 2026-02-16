import type { SpokeData } from './types'
import { SpokeTimeline, SpokeCompareCards, DetailBox, RateCards, WarnBox, Steps, SpokeLinks } from '@/components/spoke/SpokeBlocks'
import YangdoseJangeumilChecker from '@/components/checkers/YangdoseJangeumilChecker'

const data: SpokeData = {
  slug: '양도세-잔금일-기준-계약일-판단',

  meta: {
    title: '양도세 잔금일 기준 계약일 차이 | 양도 시기 판단 과세 기준일',
    description: '양도세 과세 기준이 계약일인지 잔금일인지 헷갈리시죠? 2026년 5월 9일 중과유예 종료 전후로 잔금일 하루 차이에 세금이 수천만원 달라지는데, 경과규정 4개월·6개월 기한까지 정리해드려요.',
    keywords: ['양도세 잔금일 기준', '양도세 계약일 잔금일 차이', '양도 시기 판단', '양도세 중과유예 잔금일'],
    ogTitle: '양도세 잔금일 기준 계약일 차이 | 머니위키',
    ogDescription: '잔금일 하루 차이로 세금이 수천만원 달라져요. 지금 바로 확인하세요.',
  },

  hub: {
    url: '/w/다주택양도세-중과유예-세율-절세-전략',
    name: '다주택양도세 중과유예 세율 절세 전략',
  },

  breadcrumb: ['세금', '양도세', '잔금일 기준 판단'],

  summary3: [
    <>양도세 과세 기준은 계약일이 아니라 <strong>잔금일(대금 청산일)</strong></>,
    <>2026년 <strong>5월 9일</strong> 중과유예 종료 — 잔금일이 그 전후로 세율 크게 달라져요</>,
    <>기존 조정지역 <strong>4개월</strong>, 신규 조정지역 <strong>6개월</strong> 경과규정 적용</>,
  ],

  sourceBar: {
    badge: '출처',
    name: '소득세법 제98조 + 정부 정책뉴스(2026.02.12)',
    date: '2026.02',
  },

  prevNext: {
    prev: { title: '양도세 중과 뜻 기본세율 중과세율 비교', href: '/w/양도세-중과-뜻-기본세율-중과세율-비교' },
    next: { title: '다주택 매도 순서 전략 절세', href: '/w/다주택-매도-순서-전략-절세' },
  },

  stickyBar: {
    topLabel: '중과유예 종료',
    value: '2026.05.09',
    buttonText: '내 중과 여부 확인 →',
    scrollTo: '#checker',
  },

  hero: {
    badge: '2026년 기준',
    h1: (
      <>양도세 <span className="text-[#1E3A5F]">잔금일 기준</span> 계약일 차이</>
    ),
    intro: (
      <p className="text-base text-neutral-500 leading-relaxed">
        계약서를 4월에 썼는데 잔금은 6월에 받는다면, 양도세는 언제 기준으로 나올까요? 많은 분이 계약일을 기준으로 생각하지만, 실제 과세 기준은 <strong>잔금일(대금 청산일)</strong>이에요. 2026년 5월 9일 중과유예 종료를 앞두고 잔금일 하루 차이로 세금이 수천만원 이상 달라질 수 있어요. 잔금일 기준 원칙부터 경과규정까지 차례대로 확인해 볼게요.
      </p>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '다주택양도세 중과유예 세율 절세 전략 전체 보기',
    },
    quickAnswer: {
      title: '양도세 과세 기준은 잔금일',
      body: '양도소득세는 소득세법 제98조에 따라 대금을 청산한 날(잔금일)이 양도일이에요. 계약일이 아니라 잔금일이 과세 시점이고, 2026년 5월 9일 중과유예 종료 전후로 잔금일 하루 차이에 세율이 크게 달라져요.',
      hook: '내 잔금일이 유예 기간 내인지 지금 바로 체크할 수 있어요.',
    },
  },

  toc: [
    { id: 'checker', label: '내 중과 적용 여부 확인' },
    { id: 'sec-basis', label: '양도세 잔금일 기준은 어떻게 정해지나요?' },
    { id: 'sec-diff', label: '양도세 계약일과 잔금일 차이는 뭔가요?' },
    { id: 'sec-timing', label: '양도 시기 판단이 왜 지금 중요한가요?' },
    { id: 'sec-grace', label: '양도세 중과유예 잔금일 경과규정은 어떻게 되나요?' },
    { id: 'sec-faq', label: '자주 묻는 질문' },
  ],

  sections: [
    /* ───────── 체커 ───────── */
    {
      id: 'checker',
      number: 'CHECK',
      heading: '양도세 중과 적용 여부, 내 잔금일로 확인해 보세요',
      subtitle: '계약일·잔금일·지역·주택 수를 선택하면 중과 여부를 판정해 드려요',
      content: <YangdoseJangeumilChecker />,
    },

    /* ───────── SECTION 02: 잔금일 기준 원칙 ───────── */
    {
      id: 'sec-basis',
      number: 'SECTION 02',
      heading: '양도세 잔금일 기준은 어떻게 정해지나요?',
      subtitle: '소득세법 제98조가 정한 양도일 = 대금 청산일',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            양도소득세에서 "양도일"은 <a href="https://law.go.kr/법령/소득세법/제98조" target="_blank" rel="noopener noreferrer" className="text-[#4A7AB5] underline">소득세법 제98조</a>에 따라 대금을 청산한 날, 즉 잔금일이에요. 계약서를 언제 썼든 잔금을 주고받는 날이 과세 기준일이 돼요. 이 원칙은 부동산뿐 아니라 모든 자산 양도에 공통으로 적용돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            잔금일이 양도일인 이유는 간단해요. 돈이 오가고 소유권이 실질적으로 넘어가는 시점이 잔금일이거든요. 계약금이나 중도금을 받는 단계에서는 아직 소유권이 이전되지 않아서 양도로 보지 않아요. 등기 접수일과 잔금일이 다르면 원칙적으로 잔금일을 우선해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            다만 예외가 있어요. 잔금을 받기 전에 등기를 먼저 넘긴 경우에는 등기 접수일을 양도일로 볼 수 있어요. 이런 특수한 경우에는 실질 거래 내용을 따져서 세무서가 판단해요. 계약금만 받고 계약이 해제됐다면 양도 자체가 성립하지 않아요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            결국 핵심은 "돈을 전부 받은 날 = 양도일"이라는 거예요. <a href="/w/양도세-중과-뜻-기본세율-중과세율-비교" className="text-[#4A7AB5] underline">중과세율</a>이 적용되는지 여부도 이 잔금일 하나로 결정돼요.
          </p>

          <DetailBox
            title="양도일 판단 기준 3가지"
            items={[
              { heading: '원칙 — 대금 청산일(잔금일)', desc: '소득세법 제98조에 따라 매매대금을 모두 받은 날이 양도일이에요. 가장 일반적인 기준이에요.' },
              { heading: '예외 — 등기 접수일', desc: '잔금 수령 전에 소유권 이전등기를 먼저 넘겼다면, 등기 접수일이 양도일이 될 수 있어요.' },
              { heading: '불성립 — 계약 해제', desc: '계약금만 받고 계약이 해제되면 양도가 성립하지 않아요. 양도세 과세 대상이 아니에요.' },
            ]}
          />

          <SpokeTimeline events={[
            { month: '1단계', title: '매매계약 체결', desc: '계약금 10% 지급 — 아직 양도 아님', status: 'normal' },
            { month: '2단계', title: '중도금 지급', desc: '중도금 수령 — 아직 양도 아님', status: 'normal' },
            { month: '3단계', title: '잔금 지급(양도일)', desc: '대금 완납 + 소유권 이전 — 이날이 과세 기준일', status: 'warning' },
            { month: '4단계', title: '양도세 신고', desc: '잔금일이 속한 달 말일부터 2개월 이내 신고', status: 'normal' },
          ]} />

          <SpokeLinks
            title="양도세 기준 더 알아보기"
            items={[
              { num: '01', heading: '양도세 중과 뜻과 세율 비교', desc: '기본세율과 중과세율 차이를 한눈에 확인', href: '/w/양도세-중과-뜻-기본세율-중과세율-비교' },
              { num: '02', heading: '중과 유예 연혁과 종료일', desc: '2022년부터 이어진 유예 제도 흐름', href: '/w/중과-유예-연혁-종료일-확정' },
            ]}
          />
        </>
      ),
      pasBridge: {
        href: '/w/양도세-중과-뜻-기본세율-중과세율-비교',
        question: '계약일과 잔금일이 수개월 차이 나면 어떻게 되나요?',
        answer: <>계약일이 아무리 빨라도 <strong>잔금일이 유예 종료 후</strong>면 중과세율이 적용돼요. 둘의 차이를 정확히 알아야 해요.</>,
        buttonText: '계약일 vs 잔금일 차이 확인 →',
      },
    },

    /* ───────── SECTION 03: 계약일과 잔금일 차이 ───────── */
    {
      id: 'sec-diff',
      number: 'SECTION 03',
      heading: '양도세 계약일과 잔금일 차이는 뭔가요?',
      subtitle: '계약서 작성일과 대금 완납일, 과세 기준이 완전히 달라요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            부동산 거래에서 계약일과 잔금일은 보통 2~3개월 차이가 나요. 계약일은 매도자와 매수자가 매매계약서에 서명·날인하는 날이고, 잔금일은 나머지 대금을 모두 지급하고 소유권을 이전하는 날이에요. 양도세에서는 이 둘 중 <strong>잔금일</strong>만 과세 기준으로 인정해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            예를 들어 2026년 3월에 계약하고 잔금일을 6월로 잡았다면, 중과유예 종료일(5월 9일)이 지난 후에 양도한 것으로 봐요. 계약서를 일찍 썼다고 안심하면 안 되는 이유가 바로 이거예요. 반대로 계약은 5월에 했어도 잔금을 5월 8일까지 받으면 유예 기간 내 양도로 인정돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            실무에서 문제가 되는 건 매수자의 대출 지연이나 등기 절차 지연으로 잔금일이 밀리는 경우예요. 계약서에 잔금일을 분명히 명시하고, 대출 승인이나 등기 준비를 미리 마쳐야 해요. 특히 <a href="/w/조정대상지역-목록-서울-경기" className="text-[#4A7AB5] underline">조정대상지역</a> 주택이라면 잔금일 하루 차이가 세금 수천만원 차이로 이어질 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            그래서 지금 매도를 고려하는 다주택자라면 계약 단계에서부터 잔금일을 확실히 정하고, 유예 종료일 최소 2주 전에 잔금을 받을 수 있도록 여유를 둬야 해요.
          </p>

          <SpokeCompareCards cards={[
            {
              title: '계약일',
              subtitle: '매매계약서 작성일',
              items: [
                '매도자·매수자 서명·날인',
                '계약금 10% 지급',
                '양도세 과세 기준 아님',
                '중과유예 판단과 무관',
              ],
            },
            {
              title: '잔금일',
              subtitle: '대금 완납 + 소유권 이전일',
              items: [
                '잔금 80% 완납',
                '소유권 이전등기 진행',
                '양도세 과세 기준일',
                '중과유예 종료일 판단 기준',
              ],
              recommended: true,
              recLabel: '과세 기준',
            },
          ]} />

          <WarnBox>
            <p className="mb-0 leading-relaxed">
              2026년 4월에 계약했어도 잔금일이 5월 10일이면 중과유예 종료 <strong>이후</strong> 양도예요. 계약서에 잔금일을 명시할 때 반드시 5월 9일 이전으로 잡고, 대출·등기 일정도 미리 확인하세요.
            </p>
          </WarnBox>
        </>
      ),
      pasBridge: {
        href: '/w/중과-유예-연혁-종료일-확정',
        question: '중과유예가 끝나면 세금이 정확히 얼마나 달라지나요?',
        answer: <>잔금일이 유예 종료일 전후로 하루만 달라져도 세율이 <strong>20~30%p</strong> 추가되고, 장기보유특별공제까지 배제돼요.</>,
        buttonText: '중과 전후 세금 차이 확인 →',
      },
    },

    /* ───────── SECTION 04: 양도 시기 판단의 중요성 ───────── */
    {
      id: 'sec-timing',
      number: 'SECTION 04',
      heading: '양도 시기 판단이 왜 지금 중요한가요?',
      subtitle: '2026년 5월 9일 중과유예 종료 — 잔금일 하루에 세금이 수천만원 차이',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            양도 시기가 왜 지금 특히 중요하냐면, 2022년 5월부터 계속 연장돼 온 다주택자 양도세 중과유예가 2026년 5월 9일에 예정대로 종료되기 때문이에요. 이날까지 잔금을 받으면 다주택자도 기본세율(6~45%)로 신고할 수 있지만, 하루만 넘기면 중과세율이 적용돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            2주택자는 기본세율에 20%p가 추가돼서 26~65%, 3주택 이상은 30%p가 추가돼서 36~75%가 돼요. 장기보유특별공제도 중과 시에는 완전히 배제되기 때문에 실제 세금 차이는 더 크게 벌어져요. 양도차익 5억원인 <a href="/w/3주택자-양도세-중과세율-계산-비과세" className="text-[#4A7AB5] underline">3주택자</a>라면 유예 내 양도와 유예 후 양도의 세액 차이가 1억원을 넘을 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            그래서 지금 다주택자라면 매도 계획을 세울 때 가장 먼저 확인해야 할 게 잔금일이에요. 계약서를 쓰기 전에 매수자와 잔금일을 합의하고, 대출 승인·등기 일정까지 맞춰야 유예 기간 안에 양도를 마칠 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            잔금일을 확실하게 유예 기간 내로 잡는 게 현재 <a href="/w/다주택-매도-순서-전략-절세" className="text-[#4A7AB5] underline">다주택 매도 순서 전략</a>의 핵심이에요.
          </p>

          <RateCards cards={[
            {
              value: '6~45%',
              label: '유예 기간 내 잔금(~5/9)',
              lines: ['기본세율만 적용', '장기보유특별공제 가능', '다주택자도 동일 혜택'],
              highlight: '유예 적용',
              highlightColor: 'navy',
            },
            {
              value: '26~65%',
              label: '유예 종료 후(2주택)',
              lines: ['기본세율 +20%p', '장특공제 배제', '조정대상지역 주택'],
              highlightColor: 'orange',
            },
            {
              value: '36~75%',
              label: '유예 종료 후(3주택+)',
              lines: ['기본세율 +30%p', '장특공제 배제', '조정대상지역 주택'],
              highlightColor: 'orange',
            },
          ]} />

          <SpokeLinks
            title="중과유예 종료 더 알아보기"
            items={[
              { num: '01', heading: '다주택 양도세 중과 전후 세액 비교', desc: '실제 사례로 보는 유예 전후 세금 차이', href: '/w/다주택-양도세-중과-전후-세액-비교' },
              { num: '02', heading: '중과 유예 종료 후 부동산 시장 전망', desc: '5월 9일 이후 매물·가격 변화 전망', href: '/w/중과-유예-종료-부동산-시장-전망' },
            ]}
          />
        </>
      ),
      pasBridge: {
        href: '/w/다주택-양도세-중과-전후-세액-비교',
        question: '유예 종료 후에 계약했는데 경과규정이 있다면요?',
        answer: <>5월 9일 <strong>이전에 계약</strong>했다면, 잔금일이 넘어도 일정 기간 내에는 중과가 면제되는 경과규정이 있어요.</>,
        buttonText: '경과규정 상세 확인 →',
      },
    },

    /* ───────── SECTION 05: 경과규정 ───────── */
    {
      id: 'sec-grace',
      number: 'SECTION 05',
      heading: '양도세 중과유예 잔금일 경과규정은 어떻게 되나요?',
      subtitle: '기존 조정지역 4개월, 신규 조정지역 6개월 — 계약일 기준 경과규정',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            2026년 2월 12일 정부 발표에 따르면, 중과유예가 종료되더라도 5월 9일 이전에 매매계약을 체결한 경우에는 경과규정이 적용돼요. 기존 조정대상지역(강남·서초·송파·용산)은 계약일로부터 <strong>4개월 이내</strong>, 신규 조정대상지역은 <strong>6개월 이내</strong>에 잔금을 치르면 중과세율이 적용되지 않아요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            이 경과규정이 중요한 이유는, 부동산 거래에서 계약부터 잔금까지 2~3개월이 걸리는 게 일반적이기 때문이에요. 5월 초에 계약했는데 잔금이 7월에 잡힌 경우, 경과규정이 없으면 바로 중과세율이 적용되는 불합리한 상황이 생기거든요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            다만 경과규정은 <strong>5월 9일 이전 계약</strong>에만 적용돼요. 5월 10일 이후에 계약한 경우에는 경과규정 없이 바로 중과세율이 적용돼요. 그래서 유예 종료 전에 최소한 계약서라도 확실히 체결해 두는 게 유리해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            정확한 경과규정 적용 여부는 <a href="/w/조정대상지역-다주택자-양도세-중과세율-비과세" className="text-[#4A7AB5] underline">조정대상지역 다주택자 양도세 중과세율</a>과 함께 확인하는 게 좋아요.
          </p>

          <Steps items={[
            { title: '5월 9일 이전에 매매계약 체결', desc: '계약서에 잔금일과 거래 조건을 명시해요. 5월 9일 이전 계약이 경과규정 적용의 전제 조건이에요.' },
            { title: '기존 조정지역: 4개월 내 잔금 완납', desc: '강남·서초·송파·용산 소재 주택은 계약일로부터 4개월 이내에 잔금을 치르면 중과가 면제돼요.' },
            { title: '신규 조정지역: 6개월 내 잔금 완납', desc: '서울 나머지 구·과천·성남·하남 등 신규 지정 지역은 6개월의 여유가 있어요.' },
            { title: '기한 초과 시 중과세율 적용', desc: '경과기간 내에 잔금을 못 치르면 일반 중과세율(+20~30%p)이 적용돼요. 기한 관리가 핵심이에요.' },
          ]} />

          <SpokeLinks
            title="경과규정 관련 더 알아보기"
            items={[
              { num: '01', heading: '조정대상지역 목록 서울 경기', desc: '기존·신규 조정대상지역 전체 현황', href: '/w/조정대상지역-목록-서울-경기' },
              { num: '02', heading: '다주택자 중과 배제 대상 주택', desc: '수도권 밖 3억 이하 등 배제 대상 확인', href: '/w/다주택자-양도세-중과-배제-대상-주택-신고' },
              { num: '03', heading: '2주택자 양도세 비과세 조건', desc: '일시적 2주택 비과세 요건', href: '/w/2주택자-양도세-비과세-조건-세율-계산' },
            ]}
          />
        </>
      ),
      bridgeCTA: {
        href: '/w/다주택양도세-중과유예-세율-절세-전략',
        badge: '전체 전략',
        title: '유예 종료 전 다주택자 절세 전략이 궁금하다면?',
        desc: '매도 순서·잔금일 조율·경과규정까지 전체 전략 확인',
        icon: 'grid',
      },
    },

    /* ───────── FAQ ───────── */
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
      question: '양도세 신고 시 잔금일을 어떻게 증빙하나요?',
      answer: '매매계약서에 명시된 잔금일과 실제 잔금 입금 내역(계좌이체 확인서)을 함께 제출하면 돼요. 잔금일이 불분명하면 <strong>등기 접수일을 양도일로 볼 수도 있으니</strong> 이체 내역을 반드시 보관하세요.',
    },
    {
      question: '양도세 잔금일을 매수자와 합의해서 앞당길 수 있나요?',
      answer: '매도자와 매수자가 합의하면 잔금일 변경이 가능해요. 다만 매수자의 <strong>대출 승인 일정</strong>이나 등기 이전 절차도 함께 맞춰야 하니까, 최소 2주 전에 미리 협의하는 게 좋아요.',
    },
  ],

  relatedSpokes: [
    { badge: '중과', title: '양도세 중과 뜻 기본세율 중과세율 비교', desc: '기본세율과 중과세율 차이를 한눈에 비교', href: '/w/양도세-중과-뜻-기본세율-중과세율-비교' },
    { badge: '연혁', title: '양도세 중과 유예 연혁 종료일 확정', desc: '2022년부터 매년 연장된 유예 제도 전체 흐름', href: '/w/중과-유예-연혁-종료일-확정' },
    { badge: '전략', title: '다주택 매도 순서 전략 절세', desc: '어떤 집부터 팔아야 세금이 줄어드는지 확인', href: '/w/다주택-매도-순서-전략-절세' },
    { badge: '지역', title: '조정대상지역 목록 서울 경기', desc: '서울·경기 조정대상지역과 해제 지역 현황', href: '/w/조정대상지역-목록-서울-경기' },
  ],

  sources: [
    { name: '소득세법 제98조(양도 또는 취득의 시기)', url: 'https://law.go.kr/법령/소득세법/제98조', org: '국가법령정보센터' },
    { name: '소득세법 시행령 제162조(양도시기)', url: 'https://law.go.kr/법령/소득세법시행령/제162조', org: '국가법령정보센터' },
    { name: '다주택자 양도세 중과유예 종료 관련 정책뉴스(2026.02.12)', url: 'https://www.korea.kr/news/policyNewsView.do?newsId=148959488', org: '대한민국 정책브리핑' },
  ],
}

export default data
