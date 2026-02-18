import type { SpokeData } from './types'
import { SpokeStepCards, SpokeCompareCards, SpokeFlow, RateCards, DetailBox, TipBox, Chips, SpokeLinks } from '@/components/spoke/SpokeBlocks'
import YangdoseJangeumilChecker from '@/components/checkers/YangdoseJangeumilChecker'

const data: SpokeData = {
  slug: '양도세-잔금일-기준-계약일-판단',

  meta: {
    title: '양도세 잔금일 기준 계약일 차이 | 양도세 시기 판단 경과규정 기한',
    description: '잔금일 하루 차이로 양도세가 수천만원 달라진다는 사실, 알고 계셨나요? 계약일이 아닌 잔금일이 과세 기준이고, 2026년 5월 중과유예 종료 전후로 시기 판단이 매우 중요해요. 경과규정 기한까지 정리해드려요.',
    keywords: ['양도세 잔금일 기준', '양도세 계약일 잔금일 차이', '양도세 시기 판단', '양도세 경과규정 기한'],
    ogTitle: '양도세 잔금일 기준 계약일 차이 | 머니위키',
    ogDescription: '잔금일 하루 차이로 세금이 수천만원 달라져요. 계약일·잔금일 기준과 경과규정을 확인하세요.',
  },

  hub: {
    url: '/w/다주택양도세-중과유예-세율-절세-전략',
    name: '다주택양도세 중과유예 세율 절세 전략',
  },

  breadcrumb: ['세금', '양도세', '잔금일 기준 판단'],

  summary3: [
    <>양도세 과세 기준은 계약일이 아니라 <strong>잔금일(대금 청산일)</strong></>,
    <>2026년 <strong>5월 9일</strong> 중과유예 종료 — 잔금일이 전후로 세율이 크게 달라져요</>,
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
      <>양도세 <span className="text-[#1E3A5F]">잔금일 기준</span> 계약일 차이 | 양도세 시기 판단 경과규정 기한</>
    ),
    intro: (
      <p className="text-base text-neutral-500 leading-relaxed">
        계약서를 4월에 썼는데 잔금은 6월에 치른다면, 양도세는 어느 시점으로 매겨질까요? 많은 분이 계약서에 도장 찍은 날이 기준이라고 생각하지만, 실제로는 잔금을 주고받는 날이 과세 기준이에요. 2026년 5월 9일 중과유예 종료를 앞두고 잔금일 하루 차이가 세금 수천만원을 가르는 상황이 생길 수 있어요. 잔금일이 왜 중요한지, 계약일과 어떻게 다른지, 경과규정 기한은 어떤지 차근차근 정리해 볼게요.
      </p>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '다주택양도세 중과유예 세율 절세 전략 전체 보기',
    },
    quickAnswer: {
      title: '양도세 과세 기준 = 잔금일',
      body: '양도소득세는 소득세법 제98조에 따라 대금을 청산한 날, 즉 잔금일이 양도일이에요. 계약서 작성일이 아니라 실제로 돈을 주고받는 잔금일이 과세 시점이에요. 2026년 5월 9일 중과유예 종료 전후로 잔금일 하루 차이에 세율이 크게 달라져요.',
      hook: '내 잔금일 기준으로 중과 적용 여부를 바로 확인할 수 있어요.',
    },
  },

  toc: [
    { id: 'checker', label: '내 중과 적용 여부 확인' },
    { id: 'sec-basis', label: '양도세 잔금일 기준은 어떻게 정해지나요?' },
    { id: 'sec-diff', label: '양도세 계약일과 잔금일 차이가 왜 중요한가요?' },
    { id: 'sec-timing', label: '양도세 시기 판단은 왜 지금 중요한가요?' },
    { id: 'sec-grace', label: '양도세 경과규정 기한은 어떻게 되나요?' },
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
            부동산을 팔 때 양도세가 언제 기준으로 매겨지는지 궁금한 분이 정말 많아요. 결론부터 말하면, <a href="https://law.go.kr/법령/소득세법/제98조" target="_blank" rel="noopener noreferrer" className="text-[#4A7AB5] underline">소득세법 제98조</a>에 따라 대금을 청산한 날, 즉 잔금을 받는 날이 양도일이에요. 계약서를 언제 썼는지, 중도금을 언제 받았는지와 관계없이 잔금을 주고받는 그 시점이 세법상 "양도"가 일어난 날이에요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            왜 하필 잔금일이냐 하면, 돈이 전부 오가고 소유권이 실질적으로 넘어가는 시점이기 때문이에요. 계약금 10%를 받을 때는 아직 소유권 이전 전이라 양도가 성립하지 않아요. 중도금 단계도 마찬가지예요. 잔금을 치르고 나서야 비로소 양도가 완성되는 거예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            다만 예외가 하나 있어요. 잔금을 받기 전에 소유권 이전등기를 먼저 넘긴 경우에는 등기 접수일을 양도일로 볼 수 있어요. 이런 상황은 특수 거래에서 가끔 발생하는데, 세무서가 실질 거래 내용을 따져서 양도일을 판단해요. 계약금만 받고 계약이 해제됐다면 양도 자체가 성립하지 않아요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            핵심은 단순해요. "잔금 받은 날 = 양도일"이 원칙이고, <a href="/w/양도세-중과-뜻-기본세율-중과세율-비교" className="text-[#4A7AB5] underline">중과세율</a>이 적용되는지 여부도 이 잔금일 하나로 갈려요.
          </p>

          <SpokeStepCards steps={[
            { title: '매매계약 체결', desc: '계약서 서명 + 계약금 10% 지급. 아직 양도가 아니에요.' },
            { title: '중도금 지급', desc: '중도금 수령 단계. 여전히 양도 성립 전이에요.' },
            { title: '잔금 지급 = 양도일', desc: '대금 완납 + 소유권 이전. 이날이 과세 기준일이에요.' },
            { title: '양도세 신고', desc: '잔금일이 속한 달 말일부터 2개월 이내에 신고해요.' },
          ]} />

          <DetailBox
            title="양도일 판단 기준 3가지"
            items={[
              { heading: '원칙 — 대금 청산일(잔금일)', desc: '소득세법 제98조에 따라 매매대금을 전부 받은 날이 양도일이에요. 가장 일반적인 기준이에요.' },
              { heading: '예외 — 등기 접수일', desc: '잔금 수령 전에 소유권 이전등기를 먼저 넘겼다면, 등기 접수일이 양도일이 될 수 있어요.' },
              { heading: '불성립 — 계약 해제', desc: '계약금만 주고받은 상태에서 계약이 해제되면 양도 자체가 성립하지 않아요.' },
            ]}
          />

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
        question: '잔금일이 기준이라는 건 알겠는데, 계약일과 정확히 뭐가 다른 걸까요?',
        answer: <>계약서를 일찍 쓰더라도 <strong>잔금일이 유예 종료 이후</strong>면 중과세율이 적용돼요. 두 날짜의 차이를 정확히 이해하는 게 첫걸음이에요.</>,
        buttonText: '계약일 vs 잔금일 차이 확인 →',
      },
    },

    /* ───────── SECTION 03: 계약일과 잔금일 차이 ───────── */
    {
      id: 'sec-diff',
      number: 'SECTION 03',
      heading: '양도세 계약일과 잔금일 차이가 왜 중요한가요?',
      subtitle: '계약서 작성일과 대금 완납일, 과세 기준이 완전히 달라요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            실제 부동산 거래를 해 보면 계약서를 쓰는 날과 잔금을 치르는 날 사이에 보통 2~3개월 공백이 있어요. 계약일은 매도자와 매수자가 매매계약서에 서명·날인하는 날이고, 잔금일은 나머지 대금을 전부 지급하고 소유권을 넘기는 날이에요. 양도세에서는 이 둘 중 오로지 잔금일만 과세 기준으로 인정해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            구체적으로 따져 보면 이런 상황이 생겨요. 2026년 3월에 계약하고 잔금일을 6월로 잡았다면, 중과유예 종료일인 5월 9일이 지난 후에 양도한 것으로 봐요. 계약서를 아무리 일찍 써도 잔금이 유예 종료 이후면 중과세율이 적용되는 거예요. 반대로 계약은 5월에 했어도 잔금을 5월 8일까지 받으면 유예 기간 내 양도로 인정돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            현실적으로 문제가 되는 건 매수자의 대출 지연이나 등기 절차 지연으로 잔금일이 밀리는 경우예요. <a href="/w/조정대상지역-목록-서울-경기" className="text-[#4A7AB5] underline">조정대상지역</a> 주택이라면 잔금일 하루 차이가 세금 수천만원 차이로 이어질 수 있어서 일정 관리가 매우 중요해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            계약 단계에서부터 잔금일을 확실히 정하고, 매수자 대출 승인이나 등기 준비를 미리 마치는 게 안전해요. 유예 종료일 최소 2주 전에 잔금을 받을 수 있도록 여유를 확보하는 게 좋아요.
          </p>

          <SpokeCompareCards cards={[
            {
              title: '계약일',
              subtitle: '매매계약서 작성일',
              items: [
                '매도자·매수자 서명·날인',
                '계약금 10% 지급 시점',
                '양도세 과세 기준 아님',
                '중과유예 판단과 직접 무관',
              ],
            },
            {
              title: '잔금일',
              subtitle: '대금 완납 + 소유권 이전일',
              items: [
                '잔금 전액 완납 시점',
                '소유권 이전등기 진행',
                '양도세 과세 기준일',
                '중과유예 종료일 판단 기준',
              ],
              recommended: true,
              recLabel: '과세 기준',
            },
          ]} />

          <Chips items={[
            { icon: 'x', label: '계약일', value: '과세 기준 아님' },
            { icon: 'check', label: '잔금일', value: '양도일 기준' },
            { icon: 'alert', label: '하루 차이', value: '수천만원 차이' },
            { icon: 'clock', label: '주의', value: '대출 지연 관리' },
          ]} />

          <SpokeLinks
            title="잔금일 관련 더 알아보기"
            items={[
              { num: '01', heading: '조정대상지역 목록 서울 경기', desc: '잔금일 기준이 특히 중요한 조정대상지역 확인', href: '/w/조정대상지역-목록-서울-경기' },
              { num: '02', heading: '다주택 매도 순서 전략 절세', desc: '어떤 집부터 팔아야 유리한지 확인', href: '/w/다주택-매도-순서-전략-절세' },
            ]}
          />
        </>
      ),
      pasBridge: {
        href: '/w/다주택-양도세-중과-전후-세액-비교',
        question: '그러면 유예 종료 전후로 세금이 구체적으로 얼마나 차이 나나요?',
        answer: <>잔금일이 유예 종료 전후로 하루만 갈려도 세율이 <strong>20~30%p</strong> 추가되고, 장기보유특별공제까지 사라져요. 실제 금액으로 따져 볼 필요가 있어요.</>,
        buttonText: '중과 전후 세금 차이 비교 →',
      },
    },

    /* ───────── SECTION 04: 시기 판단의 중요성 ───────── */
    {
      id: 'sec-timing',
      number: 'SECTION 04',
      heading: '양도세 시기 판단은 왜 지금 중요한가요?',
      subtitle: '2026년 5월 9일 중과유예 종료 — 잔금일 하루에 세금이 수천만원 차이',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            양도세에서 시기 판단이 늘 중요하긴 하지만, 지금 시점에 특히 민감한 이유가 있어요. 2022년 5월부터 매년 연장돼 온 다주택자 양도세 중과유예가 2026년 5월 9일에 종료되거든요. 이날까지 잔금을 받으면 다주택자도 기본세율 6~45%로 신고할 수 있지만, 하루만 넘기면 중과세율이 적용돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            구간별로 보면 2주택자는 기본세율에 20%p가 얹어져서 26~65%, <a href="/w/3주택자-양도세-중과세율-계산-비과세" className="text-[#4A7AB5] underline">3주택 이상</a>은 30%p가 더해져서 36~75%까지 올라가요. 장기보유특별공제도 중과 대상이면 완전히 배제되기 때문에, 오래 보유한 주택일수록 세금 차이가 더 크게 벌어져요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            예를 들어 양도차익 5억원인 3주택자라면, 유예 기간 내에 파는 것과 유예 종료 후에 파는 것의 세액 차이가 1억원을 넘을 수 있어요. 같은 집을 같은 값에 팔더라도 잔금일 하루 차이로 이만큼 달라지는 거예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            그래서 매도 계획이 있는 다주택자라면 가장 먼저 잔금일을 확정해야 해요. <a href="/w/다주택-매도-순서-전략-절세" className="text-[#4A7AB5] underline">어떤 집을 먼저 팔지</a> 순서를 정하는 것도 잔금일 확보가 전제돼야 의미가 있어요.
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

          <SpokeFlow steps={[
            { icon: 'calendar', label: '잔금일 5/9 이전?', sub: '기본세율 6~45% 적용' },
            { icon: 'alert', label: '잔금일 5/10 이후?', sub: '중과세율 적용 여부 판단' },
            { icon: 'home', label: '2주택 조정지역?', sub: '+20%p (26~65%)' },
            { icon: 'home', label: '3주택 이상?', sub: '+30%p (36~75%)' },
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
        href: '/w/중과-유예-연혁-종료일-확정',
        question: '유예 종료 후에 잔금을 치르게 되면 무조건 중과인가요?',
        answer: <>5월 9일 <strong>이전에 계약</strong>을 체결한 경우라면, 잔금일이 넘어도 일정 기한 내에는 중과가 면제되는 경과규정이 있어요.</>,
        buttonText: '경과규정 기한 상세 확인 →',
      },
    },

    /* ───────── SECTION 05: 경과규정 기한 ───────── */
    {
      id: 'sec-grace',
      number: 'SECTION 05',
      heading: '양도세 경과규정 기한은 어떻게 되나요?',
      subtitle: '기존 조정지역 4개월, 신규 조정지역 6개월 — 5월 9일 이전 계약 조건',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            2026년 2월 12일 정부 발표에 따르면, 중과유예가 종료되더라도 5월 9일 이전에 매매계약을 체결한 경우에는 경과규정이 적용돼요. 기존 조정대상지역(강남·서초·송파·용산)은 계약일로부터 4개월 이내, 신규 조정대상지역은 6개월 이내에 잔금을 치르면 중과세율이 적용되지 않아요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            경과규정이 마련된 배경을 보면, 부동산 거래에서 계약부터 잔금까지 2~3개월이 걸리는 게 일반적이기 때문이에요. 5월 초에 계약했는데 잔금이 7월에 잡힌 경우, 경과규정 없이 바로 중과세율이 적용되면 거래 당사자 입장에서 지나치게 불합리하거든요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            다만 이 경과규정은 반드시 5월 9일 이전에 체결한 계약에만 적용돼요. 5월 10일 이후에 체결한 계약에는 경과규정이 없이 바로 중과세율이 적용돼요. 그래서 매도 계획이 있다면 유예 종료 전에 최소한 계약서라도 확실히 체결해 두는 게 유리해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            경과규정 적용 여부가 명확하지 않을 때는 <a href="/w/조정대상지역-다주택자-양도세-중과세율-비과세" className="text-[#4A7AB5] underline">조정대상지역 다주택자 중과세율</a> 기준과 함께 세무사 상담을 받아 보는 게 안전해요.
          </p>

          <SpokeStepCards steps={[
            { title: '5월 9일 이전 매매계약 체결', desc: '계약서에 잔금일과 거래 조건을 명시해요. 이 날짜가 경과규정 적용의 전제 조건이에요.' },
            { title: '기존 조정지역 — 4개월 내 잔금', desc: '강남·서초·송파·용산 소재 주택은 계약일로부터 4개월 이내에 잔금을 치르면 중과가 면제돼요.' },
            { title: '신규 조정지역 — 6개월 내 잔금', desc: '서울 나머지 구·과천·성남·하남 등 신규 지정 지역은 6개월의 여유가 있어요.' },
            { title: '기한 초과 시 중과세율 적용', desc: '경과기간을 넘기면 일반 중과세율(+20~30%p)이 적용돼요. 기한 관리가 핵심이에요.' },
          ]} />

          <TipBox title="경과규정 기한 계산 기준">
            <p className="mb-0 leading-relaxed">
              경과규정 기한을 계산할 때는 <strong>계약서에 적힌 계약 체결일</strong>이 기준이에요. 4개월·6개월은 달력 기준으로 계산하니, 예를 들어 4월 15일 계약이면 기존 조정지역은 8월 15일까지가 기한이에요.
            </p>
          </TipBox>

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
        title: '유예 종료 전 잔금일 조율부터 절세 전략까지 한눈에 보고 싶다면?',
        desc: '매도 순서·잔금일 관리·경과규정까지 다주택자 절세 전략 전체 확인',
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
