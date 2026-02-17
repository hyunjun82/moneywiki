import type { SpokeData } from './types'
import {
  FormulaBox,
  SpokeCompareCards,
  RateCards,
  TipBox,
  Chips,
  WarnBox,
  SpokeLinks,
} from '@/components/spoke/SpokeBlocks'
import SeaekBigyoChecker from '@/components/checkers/SeaekBigyoChecker'

const data: SpokeData = {
  slug: '다주택-양도세-중과-전후-세액-비교',

  meta: {
    title: '다주택 양도세 중과 전후 세액 비교 | 유예 종료 후 세금 차이 계산',
    description: '중과 유예 중에 팔면 1억인데, 유예 끝나면 3억이 된다고요? 다주택 양도세 중과 전후 세액 차이를 양도차익별로 비교 계산해서 알려드려요.',
    keywords: ['다주택 양도세 중과 세액 비교', '양도세 유예 종료 세금 차이', '양도세 기본세율 중과세율 계산', '양도세 중과 전후 시뮬레이션'],
    ogTitle: '다주택 양도세 중과 전후 세액 비교 | 머니위키',
    ogDescription: '유예 vs 중과 세액 차이를 양도차익별로 비교해 보세요.',
  },

  hub: {
    url: '/w/다주택양도세-중과유예-세율-절세-전략',
    name: '다주택양도세 중과유예 세율 절세 전략',
  },

  breadcrumb: ['세금', '양도소득세', '중과 전후 세액 비교'],

  summary3: [
    <>양도차익 5억 기준, 유예 시 약 <strong>1억 490만원</strong> vs 중과 시 약 <strong>3억 2,230만원</strong></>,
    <>장특공제 배제 + 세율 추가가 <strong>동시에</strong> 적용돼서 세금이 3배 가까이 늘어나요</>,
    <>중과 유예 <strong>2026년 5월 9일 종료</strong> — 잔금일 하루 차이로 세금이 갈려요</>,
  ],

  sourceBar: {
    badge: '출처',
    name: '소득세법 제104조 세율 + 국세청 양도소득세 안내',
    date: '2026.02',
  },

  prevNext: {
    prev: { title: '조정대상지역 서울 경기 목록', href: '/w/조정대상지역-목록-서울-경기' },
    next: { title: '다주택 매도 순서 전략 절세', href: '/w/다주택-매도-순서-전략-절세' },
  },

  stickyBar: {
    topLabel: '유예 vs 중과 세금 차이',
    value: '최대 4억원+',
    buttonText: '내 세액 비교하기 →',
    scrollTo: '#checker',
  },

  hero: {
    badge: '2026년 기준',
    h1: (
      <>
        다주택 양도세 <span className="text-[#1E3A5F]">중과 전후 세액</span> 비교
      </>
    ),
    intro: (
      <p className="text-base text-neutral-500 leading-relaxed">
        유예 기간에 팔까, 좀 더 기다릴까 — 결국 핵심은 세금이 얼마나 차이 나느냐예요.
        기본세율 38%와 중과세율 68~70%, 숫자만 보면 30%p 차이인데 실제 세액으로 계산하면
        2억원 이상 벌어지는 경우가 많아요. 장기보유특별공제 배제까지 겹치면 차이는 더 벌어져요.
        양도차익 규모별로 유예 시와 중과 시 세금을 직접 비교해서, 매도 시기를 판단할 수 있게 정리했어요.
      </p>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '다주택 양도세 중과유예 세율 절세 전략 전체 보기',
    },
    quickAnswer: {
      title: '중과 전후 세금 차이는 얼마나 나나요?',
      body: '양도차익 5억원, 3주택, 10년 보유 기준으로 유예 시 약 1억 490만원, 중과 시 약 3억 2,230만원이에요. 차이가 약 2억 1,740만원이고, 지방소득세까지 합치면 약 2.4억원 차이가 나요.',
      hook: '아래 체커에서 내 조건으로 바로 비교해 보세요 →',
    },
  },

  toc: [
    { id: 'checker', label: '내 양도세 세액 비교 체커' },
    { id: 'sec-tax-gap', label: '다주택 양도세 중과 전후 세액 차이는 얼마나 나나요?' },
    { id: 'sec-why-big', label: '양도세 중과 세금 차이가 이렇게 큰 이유는 뭔가요?' },
    { id: 'sec-case', label: '양도차익 규모별 세액 비교하면 어떤 결과가 나오나요?' },
    { id: 'sec-timing', label: '양도세 중과 전후 매도 시기는 언제가 유리한가요?' },
    { id: 'sec-faq', label: '자주 묻는 질문' },
  ],

  sections: [
    /* ===== CHECK: 세액 비교 체커 ===== */
    {
      id: 'checker',
      number: 'CHECK',
      heading: '다주택 양도세 중과 전후 세액 비교 체커',
      subtitle: '주택 수, 양도차익, 보유기간을 선택하면 유예 vs 중과 세금을 바로 비교해요',
      content: (<SeaekBigyoChecker />),
    },

    /* ===== S1: 세액 차이 핵심 ===== */
    {
      id: 'sec-tax-gap',
      number: 'SECTION 02',
      heading: '다주택 양도세 중과 전후 세액 차이는 얼마나 나나요?',
      subtitle: '같은 집인데 유예냐 중과냐에 따라 세금이 2~3배 달라져요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            양도차익 5억원인 3주택자가 조정대상지역 주택을 10년 보유 후 파는 상황을 기준으로 설명할게요. 유예 기간에 팔면 장기보유특별공제 30%가 적용돼서 과세표준이 약 3.25억원이에요. 여기에 기본세율 38%를 곱하면 산출세액이 약 1억 490만원이 나와요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            반면 중과가 적용되면 장특공제가 0원이에요. 과세표준이 약 4.975억원으로 커지고, 세율도 기본 40%에 30%p가 추가돼서 70%가 적용돼요. 산출세액이 약 3억 2,230만원이에요. 차이가 약 <strong>2억 1,740만원</strong>이에요. 잔금일 하루 차이로 이 금액이 갈려요.
          </p>

          <FormulaBox lines={[
            { text: '[유예 시] 양도차익 5억 - 장특공제 1.5억(30%) - 기본공제 250만 = 과세표준 약 3.25억', numbered: true },
            { text: '→ 3.25억 x 38% - 누진공제 1,994만 = 산출세액 약 1억 490만원', numbered: true },
            { text: '[중과 시] 양도차익 5억 - 장특공제 0원 - 기본공제 250만 = 과세표준 약 4.975억', numbered: true },
            { text: '→ 4.975억 x 40% + 4.975억 x 30% = 산출세액 약 3억 2,230만원', numbered: true, comment: true },
          ]} />

          <Chips items={[
            { icon: '💰', label: '유예 시 세액', value: '약 1.05억' },
            { icon: '🔥', label: '중과 시 세액', value: '약 3.22억' },
            { icon: '📊', label: '세금 차이', value: '약 2.17억' },
            { icon: '📅', label: '유예 종료일', value: '2026.05.09' },
          ]} />

          <SpokeLinks
            title="양도세 중과 기본 개념"
            items={[
              { num: '01', heading: '양도세 중과 뜻 기본세율 비교', desc: '기본세율과 중과세율이 어떻게 다른지 확인', href: '/w/양도세-중과-뜻-기본세율-중과세율-비교' },
              { num: '02', heading: '중과 유예 연혁 종료일 확정', desc: '유예가 언제 시작해서 언제 끝나는지 정리', href: '/w/중과-유예-연혁-종료일-확정' },
            ]}
          />
        </>
      ),
      pasBridge: {
        href: '/w/양도세-중과-뜻-기본세율-중과세율-비교',
        question: '공제 배제랑 세율 추가, 둘 중 뭐가 더 영향이 큰 걸까요?',
        answer: <>장특공제 배제와 세율 추가가 <strong>동시에</strong> 작용해서 세금이 기하급수적으로 늘어나요. 각각의 영향을 분리해서 설명해 드릴게요.</>,
        buttonText: '세금 차이가 큰 이유 보기 →',
      },
    },

    /* ===== S2: 세금 차이가 큰 이유 ===== */
    {
      id: 'sec-why-big',
      number: 'SECTION 03',
      heading: '양도세 중과 세금 차이가 이렇게 큰 이유는 뭔가요?',
      subtitle: '공제 배제 효과와 세율 추가 효과가 복합적으로 작용해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            중과 적용 시 세금이 3배 가까이 늘어나는 건 두 가지 효과가 동시에 작용하기 때문이에요. 첫째, <a href="/w/양도세-중과-뜻-기본세율-중과세율-비교" className="text-[#4A7AB5] underline">장기보유특별공제</a>가 배제돼서 과세표준 자체가 커져요. 10년 보유 시 30% 공제가 사라지면 과세표준이 3.25억에서 4.975억으로 약 1.7억원 늘어나요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            둘째, 세율이 기본 세율에 20~30%p 추가돼요. 과세표준이 커진 상태에서 더 높은 세율이 적용되니까 세금이 기하급수적으로 불어나는 거예요. 이걸 따로 계산해 보면 공제 배제 효과만으로도 약 6,700만원, 세율 추가 효과가 약 1억 5,000만원이에요. 합치면 2억원이 넘어요.
          </p>

          <SpokeCompareCards
            cards={[
              {
                title: '공제 배제 효과',
                subtitle: '과세표준이 커지는 효과',
                items: [
                  '유예: 과세표준 3.25억 (공제 30%)',
                  '중과: 과세표준 4.975억 (공제 0%)',
                  '과세표준 차이: +1.725억원',
                  '이것만으로 세금 약 6,700만원 증가',
                ],
              },
              {
                title: '세율 추가 효과',
                subtitle: '세율 자체가 올라가는 효과',
                items: [
                  '유예: 기본세율 38%',
                  '중과(3주택): 기본 40% + 추가 30%p = 70%',
                  '세율 차이: +30%p 이상',
                  '세율 추가로 세금 약 1.5억원 증가',
                ],
                recommended: true,
                recLabel: '영향 더 큼',
              },
            ]}
          />

          <TipBox title="지방소득세까지 합치면 차이가 더 커져요">
            <p className="leading-relaxed">
              산출세액의 10%가 지방소득세로 별도 부과돼요. 유예 시 약 1,050만원, 중과 시 약 3,220만원이 추가되니까 실납부 기준으로는 차이가 약 <strong>2억 3,900만원</strong>까지 벌어져요.
            </p>
          </TipBox>

          <SpokeLinks
            title="중과 세율 관련 글"
            items={[
              { num: '01', heading: '양도세 잔금일 기준 계약일 차이', desc: '잔금일 하루 차이로 세금이 갈리는 이유', href: '/w/양도세-잔금일-기준-계약일-판단' },
              { num: '02', heading: '조정대상지역 서울 경기 목록', desc: '내 주택이 조정대상지역인지 확인', href: '/w/조정대상지역-목록-서울-경기' },
            ]}
          />
        </>
      ),
      pasBridge: {
        href: '/w/중과-유예-연혁-종료일-확정',
        question: '양도차익이 다르면 세금 차이도 많이 달라질까요?',
        answer: <>양도차익이 클수록 차이가 <strong>기하급수적으로</strong> 커져요. 3억, 5억, 7억, 10억 규모별로 실제 세액을 비교해 볼게요.</>,
        buttonText: '규모별 세액 비교 보기 →',
      },
    },

    /* ===== S3: 양도차익 규모별 비교 ===== */
    {
      id: 'sec-case',
      number: 'SECTION 04',
      heading: '양도차익 규모별 세액 비교하면 어떤 결과가 나오나요?',
      subtitle: '3억, 5억, 7억, 10억 — 양도차익이 클수록 차이가 극적으로 벌어져요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            모두 3주택자, 10년 보유, <a href="/w/조정대상지역-목록-서울-경기" className="text-[#4A7AB5] underline">조정대상지역</a> 기준이에요. 유예 시에는 장특공제 30%가 적용되고, 중과 시에는 공제 배제 + 세율 30%p 추가예요. 양도차익 3억이면 차이가 약 1.1억인데, 10억이면 차이가 약 4억으로 벌어져요. 양도차익이 2배 늘면 세금 차이는 3~4배 늘어나는 구조예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            특히 양도차익 7억원 이상이면 중과 시 산출세액만 4.5억원을 넘어요. 지방소득세 10%까지 합치면 세금으로 5억원 가까이 내야 해요. 유예 기간에 팔면 약 1.7억원이니까, 3억원 이상 아낄 수 있는 거예요.
          </p>

          <RateCards cards={[
            { value: '3억', label: '양도차익', lines: ['유예: 약 5,400만', '중과: 약 1.64억', '차이: 약 1.1억'], highlightColor: 'navy' },
            { value: '5억', label: '양도차익', lines: ['유예: 약 1.05억', '중과: 약 3.22억', '차이: 약 2.17억'], highlight: '기준 사례', highlightColor: 'orange' },
            { value: '7억', label: '양도차익', lines: ['유예: 약 1.72억', '중과: 약 4.59억', '차이: 약 2.87억'], highlightColor: 'navy' },
            { value: '10억', label: '양도차익', lines: ['유예: 약 2.62억', '중과: 약 6.64억', '차이: 약 4.02억'], highlightColor: 'navy' },
          ]} />

          <WarnBox>
            <p className="leading-relaxed">
              위 금액은 산출세액 기준이에요. 실제로 납부할 때는 지방소득세(산출세액의 10%)가 추가되니까, 차이가 더 벌어져요. 양도차익 10억원 기준 지방소득세까지 합치면 유예 약 2.88억 vs 중과 약 7.3억으로, 실납부 차이가 약 <strong>4.42억원</strong>이에요.
            </p>
          </WarnBox>

          <SpokeLinks
            title="절세 전략 관련 글"
            items={[
              { num: '01', heading: '다주택 매도 순서 전략', desc: '어떤 집부터 팔아야 세금을 아끼는지', href: '/w/다주택-매도-순서-전략-절세' },
              { num: '02', heading: '다주택 증여 양도 비교', desc: '증여와 양도 중 뭐가 유리한지 비교', href: '/w/다주택-증여-양도-비교-부담부증여' },
            ]}
          />
        </>
      ),
      pasBridge: {
        href: '/w/양도세-잔금일-기준-계약일-판단',
        question: '그럼 정확히 언제까지 팔아야 유예를 받을 수 있나요?',
        answer: <>2026년 5월 9일 전에 <strong>잔금을 치러야</strong> 유예가 적용돼요. 계약일이 아니라 잔금일이 기준이에요.</>,
        buttonText: '매도 시기 기준 확인 →',
      },
    },

    /* ===== S4: 매도 시기 판단 ===== */
    {
      id: 'sec-timing',
      number: 'SECTION 05',
      heading: '양도세 중과 전후 매도 시기는 언제가 유리한가요?',
      subtitle: '2026년 5월 9일 전 잔금이 핵심이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            결론부터 말하면, 유예 기간 내에 파는 게 절대적으로 유리해요. <a href="/w/양도세-잔금일-기준-계약일-판단" className="text-[#4A7AB5] underline">양도세 과세 기준은 잔금일</a>이니까, 2026년 5월 9일 전에 잔금을 받아야 해요. 계약만 해놓고 잔금을 5월 10일 이후에 받으면 중과가 적용돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            다만 보완조치가 있어요. 기존 조정대상지역(강남, 서초, 송파, 용산)은 5월 9일 전 계약 시 <strong>4개월 내 잔금</strong>까지 유예가 적용돼요. 신규 조정대상지역은 <strong>6개월 내 잔금</strong>이 기한이에요. 이 경과규정을 활용하면 5월 9일이 지나도 유예를 받을 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            주의할 점은 2주택자와 3주택자의 세금 차이가 크다는 거예요. 3주택자가 1채를 먼저 팔아서 2주택이 되면, 남은 주택에 대한 중과세율이 30%p에서 20%p로 줄어요. 매도 순서를 잘 잡으면 세금을 수천만원 더 아낄 수 있어요.
          </p>

          <SpokeCompareCards
            cards={[
              {
                title: '기존 조정대상지역 (4구)',
                subtitle: '강남 서초 송파 용산',
                items: [
                  '5월 9일 전 계약 필수',
                  '계약 후 4개월 내 잔금',
                  '최대 2026년 9월 8일까지',
                  '경과규정 충족 시 기본세율 적용',
                ],
              },
              {
                title: '신규 조정대상지역',
                subtitle: '서울 나머지 21구 + 경기 12곳',
                items: [
                  '5월 9일 전 계약 필수',
                  '계약 후 6개월 내 잔금',
                  '최대 2026년 11월 8일까지',
                  '경과규정 충족 시 기본세율 적용',
                ],
                recommended: true,
                recLabel: '기한 여유',
              },
            ]}
          />

          <TipBox title="3주택자라면 매도 순서가 절세의 핵심이에요">
            <p className="leading-relaxed">
              3주택에서 1채를 먼저 팔아 2주택이 되면, 나머지 주택의 중과세율이 +30%p에서 +20%p로 줄어요. 양도차익 5억 기준으로 이것만으로도 약 5,000만원 차이가 나요. <a href="/w/다주택-매도-순서-전략-절세" className="text-[#4A7AB5] underline">매도 순서 전략</a>을 꼭 확인해 보세요.
            </p>
          </TipBox>

          <SpokeLinks
            title="매도 시기 관련 글"
            items={[
              { num: '01', heading: '중과 유예 연혁 종료일 확정', desc: '유예가 왜 종료됐는지 연혁 정리', href: '/w/중과-유예-연혁-종료일-확정' },
              { num: '02', heading: '다주택 매도 순서 전략 절세', desc: '어떤 집부터 팔아야 유리한지', href: '/w/다주택-매도-순서-전략-절세' },
            ]}
          />
        </>
      ),
      bridgeCTA: {
        href: '/w/다주택-매도-순서-전략-절세',
        badge: '절세 전략',
        title: '어떤 집부터 팔아야 세금을 가장 아낄까요?',
        desc: '다주택자 매도 순서별 절세 시뮬레이션 확인하기',
        icon: 'calc',
      },
    },

    /* ===== FAQ ===== */
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
      question: '다주택 양도세 중과 시 지방소득세는 얼마나 추가되나요?',
      answer: '지방소득세는 양도소득세 산출세액의 <strong>10%</strong>예요. 중과 시 산출세액이 3.22억이면 지방소득세가 약 3,220만원 추가돼요. 유예 시 산출세액 1.05억이면 약 1,050만원이니까, 지방소득세만으로도 약 2,170만원 차이가 나요.',
    },
    {
      question: '양도세 중과 전후 비교 시 필요경비는 어떻게 반영하나요?',
      answer: '양도차익은 매도가에서 취득가와 필요경비를 뺀 금액이에요. 필요경비에는 취득세, 중개수수료, 법무사 비용, 자본적 지출(인테리어, 발코니 확장 등)이 포함돼요. 필요경비를 최대한 인정받으면 양도차익이 줄어서 <strong>유예·중과 모두</strong> 세금이 줄어요.',
    },
  ],

  relatedSpokes: [
    { badge: '개념', title: '양도세 중과 뜻 기본세율 중과세율 비교', desc: '기본세율과 중과세율이 어떻게 다른지 한눈에 비교', href: '/w/양도세-중과-뜻-기본세율-중과세율-비교' },
    { badge: '시기', title: '양도세 잔금일 기준 계약일 판단', desc: '잔금일 하루 차이로 세금이 갈리는 이유', href: '/w/양도세-잔금일-기준-계약일-판단' },
    { badge: '전략', title: '다주택 매도 순서 전략 절세', desc: '어떤 집부터 팔아야 절세가 되는지 정리', href: '/w/다주택-매도-순서-전략-절세' },
    { badge: '지역', title: '조정대상지역 서울 경기 목록', desc: '내 주택이 조정대상지역인지 바로 확인', href: '/w/조정대상지역-목록-서울-경기' },
  ],

  sources: [
    { name: '소득세법 제104조(세율)', url: 'https://law.go.kr/법령/소득세법/제104조', org: '국가법령정보센터' },
    { name: '양도소득세 기본정보', url: 'https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2312&cntntsId=7711', org: '국세청' },
    { name: '다주택 중과 유예 종료 보완방안', url: 'https://www.korea.kr/news/policyNewsView.do?newsId=148939123', org: '정책브리핑' },
  ],
}

export default data
