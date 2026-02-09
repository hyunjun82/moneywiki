import Link from 'next/link'
import type { SpokeData } from './types'
import { SpokeCompareCards, SpokeWarnBox, RateCards, SpokeRateBars, TipBox } from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '개인파산-면책불허가-도박-재량면책',

  meta: {
    title: '개인파산 면책불허가 사유 도박 빚 재산은닉 재량면책 방법',
    description: '면책불허가 사유가 있어도 법원의 재량면책으로 면책받을 수 있다는 거 아시나요? 도박 빚 대응 방법과 재량면책 조건을 알려드려요',
    keywords: ['개인파산 면책불허가 사유', '개인파산 도박 빚 면책 가능', '개인파산 재산은닉 발각 시', '개인파산 재량면책 받는 방법'],
    ogTitle: '개인파산 면책불허가 사유 도박 빚 재산은닉 재량면책 | 머니위키',
    ogDescription: '면책불허가 사유 6가지와 재량면책 가능성까지 한 번에',
  },

  hub: {
    url: '/w/개인파산-면책-신청-절차-비용',
    name: '개인파산 면책 신청 절차와 비용',
  },

  breadcrumb: ['법률', '개인파산 면책불허가'],

  hero: {
    badge: '2026년 기준',
    h1: <>개인파산 <span className="text-emerald-600">면책불허가</span> 사유 — 도박 빚과 재산은닉, 재량면책 방법</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          파산 신청까지 했는데 면책이 안 될 수도 있다는 말에 가슴이 철렁했다면 잘 오셨어요. <strong>면책불허가 사유</strong>에 해당하더라도 법원이 사정을 고려해 면책을 허가하는 <strong>재량면책</strong> 제도가 있어요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          <a href="https://www.law.go.kr/법령/채무자회생및파산에관한법률/제564조" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">채무자회생법 제564조</a>에 따른 면책불허가 사유 6가지부터, 도박 빚이나 재산은닉 같은 대표적인 문제 상황, 그리고 재량면책 조건까지 정리했어요. 전체 절차가 궁금하면 <Link href="/w/개인파산-면책-신청-절차-비용" className="text-blue-600 hover:underline">개인파산 면책 신청 절차와 비용</Link>도 같이 보면 이해가 빨라요. 먼저 어떤 경우에 면책이 안 되는지부터 볼게요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '전체 절차',
      desc: '개인파산 신청부터 면책까지 전체 흐름 확인하기',
    },
  },

  toc: [
    { id: 's1', text: '개인파산 면책불허가 사유는 어떤 게 있나요?' },
    { id: 's2', text: '개인파산 도박 빚도 면책받을 수 있나요?' },
    { id: 's3', text: '개인파산 재산은닉이 발각되면 어떻게 되나요?' },
    { id: 's4', text: '개인파산 재량면책은 어떻게 받나요?' },
    { id: 's5', text: '자주 묻는 질문' },
  ],

  sections: [
    /**
     * ===== S1: 면책불허가 사유 6가지 =====
     * 패턴: 개념 설명 → 비교 카드(SpokeCompareCards) → 경고(SpokeWarnBox)
     * 전환 스타일: E. 실용 연결형
     * 시각 요소: SpokeCompareCards + SpokeWarnBox = 2개
     */
    {
      id: 's1',
      number: '01',
      heading: '개인파산 면책불허가 사유는 어떤 게 있나요?',
      subtitle: '채무자회생법 제564조가 정한 6가지 사유를 알아야 대비할 수 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            <strong>면책불허가</strong>란 파산 선고는 받았지만 빚을 탕감받지 못하는 거예요. <a href="https://www.law.go.kr/법령/채무자회생및파산에관한법률/제564조" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">채무자회생법 제564조 제1항</a>에 6가지 사유가 나와 있어요. 이 중 하나라도 해당하면 법원이 면책을 거부할 수 있어요. 다만 이 사유가 있다고 무조건 면책이 안 되는 건 아니에요.
          </p>

          <SpokeCompareCards cards={[
            {
              title: '행위 관련 사유',
              subtitle: '채무자가 한 행동이 문제',
              items: [
                '재산 은닉, 손괴, 불이익 처분 (사기파산죄)',
                '과다한 낭비, 도박, 사행행위로 재산 감소',
                '파산 전 1년 내 빚질 사실 숨기고 신용거래',
              ],
              recommended: false,
            },
            {
              title: '절차 관련 사유',
              subtitle: '파산 절차에서 문제',
              items: [
                '허위 채권자목록이나 서류 제출',
                '법원에 재산 상태 거짓 진술',
                '이전 면책 후 7년(파산) 또는 5년(회생) 미경과',
              ],
              recommended: false,
            },
          ]} />

          <SpokeWarnBox title="주의사항">
            <p className="mb-0 leading-relaxed">
              실무에서 가장 많이 문제 되는 건 <strong>도박이나 과소비로 빚을 진 경우</strong>와 <strong>재산을 숨긴 경우</strong>예요. 이 두 가지만 해당 안 되면 대부분 면책이 나와요. 해당되더라도 재량면책이라는 길이 있으니 포기하지 마세요.
            </p>
          </SpokeWarnBox>

          {/* 전환 문장 — E. 실용 연결형 */}
          <p className="text-neutral-600 mb-4 leading-relaxed">
            면책불허가 사유 중 가장 걱정되는 게 도박인데, 실제로 도박 빚이 있어도 면책받은 사례가 많아요. 어떤 조건이 필요한지 정리했어요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '도박 빚',
        title: '도박으로 진 빚도 면책받을 수 있을까?',
        desc: '도박 채무의 면책 가능성과 조건',
        icon: 'info',
      },
    },

    /**
     * ===== S2: 도박 빚 면책 가능성 =====
     * 패턴: 설명 → 비율 카드(RateCards) → 비율 바(SpokeRateBars)
     * 전환 스타일: C. 간결 연결형
     * 시각 요소: RateCards + SpokeRateBars = 2개
     */
    {
      id: 's2',
      number: '02',
      heading: '개인파산 도박 빚도 면책받을 수 있나요?',
      subtitle: '도박이 면책불허가 사유지만, 재량면책으로 구제받는 경우가 많아요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            <strong>도박으로 과대한 채무를 부담</strong>한 경우는 <a href="https://www.law.go.kr/법령/채무자회생및파산에관한법률/제564조" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">채무자회생법 제564조 제1항 제6호</a>에 해당하는 면책불허가 사유예요. 하지만 같은 조 제2항에 <strong>재량면책</strong> 조항이 있어서, 법원이 파산에 이르게 된 경위와 그 밖의 사정을 고려해 면책을 허가할 수 있어요. 실제로 도박 채무가 있어도 아래 조건을 갖추면 면책이 나오는 경우가 적지 않아요.
          </p>

          <RateCards cards={[
            { value: '높음', label: '면책 가능성 높은 경우', lines: ['도박 치료 기록이 있는 경우', '생활비 대부분이 도박 외 채무', '반성문과 갱생 의지 소명'], highlightColor: 'emerald', highlight: '유리' },
            { value: '보통', label: '반반인 경우', lines: ['도박 비중이 전체의 절반 수준', '치료 기록은 없지만 중단 증명', '재산 은닉 등 다른 사유 없음'] },
            { value: '낮음', label: '면책 어려운 경우', lines: ['최근까지 도박 지속', '재산 숨기거나 허위 진술', '반성 의지 소명 부족'], highlightColor: 'orange', highlight: '불리' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            법원이 재량면책 여부를 판단할 때 중점적으로 보는 요소가 있어요. 도박 채무 비중, 도박 중단 여부, 치료 노력, 반성 정도 등을 종합적으로 따져요. 특히 도박 중독 치료를 받은 기록이 있으면 재량면책에 상당히 유리해요.
          </p>

          <SpokeRateBars bars={[
            { label: '도박 중단 + 치료 기록', rate: '유리', width: '85%' },
            { label: '반성문 + 갱생 계획', rate: '도움', width: '70%' },
            { label: '도박 외 채무 비중 높음', rate: '도움', width: '65%' },
            { label: '도박 지속 + 허위 진술', rate: '불리', width: '20%' },
          ]} />

          {/* 전환 문장 — C. 간결 연결형 */}
          <p className="text-neutral-600 mb-4 leading-relaxed">
            도박 빚 다음으로 문제 되는 게 재산은닉이에요. 재산을 숨기다 걸리면 어떻게 되는지 넘어갈게요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '재산은닉',
        title: '재산 숨기다 걸리면 어떤 불이익이 있을까?',
        desc: '재산은닉 적발 시 형사처벌과 면책 영향',
        icon: 'info',
      },
    },

    /**
     * ===== S3: 재산은닉 발각 시 =====
     * 패턴: 설명 → 경고(SpokeWarnBox) → 팁(TipBox)
     * 전환 스타일: A. 독자 대변형
     * 시각 요소: SpokeWarnBox + TipBox = 2개
     */
    {
      id: 's3',
      number: '03',
      heading: '개인파산 재산은닉이 발각되면 어떻게 되나요?',
      subtitle: '면책불허가는 물론 형사처벌까지 받을 수 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            재산은닉은 면책불허가 사유 중에서도 가장 무거운 결과를 초래해요. 파산재단에 속하는 재산을 숨기거나 손괴하면 <a href="https://www.law.go.kr/법령/채무자회생및파산에관한법률/제650조" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">채무자회생법 제650조(사기파산죄)</a>에 해당해요. 단순히 면책이 안 되는 걸 넘어서 형사 처벌 대상이에요. 재산의 소유관계를 일부러 복잡하게 만드는 것도 은닉에 해당해요.
          </p>

          <SpokeWarnBox title="주의사항">
            <p className="mb-0 leading-relaxed">
              재산을 은닉하거나 허위로 채무를 만들면 <strong>10년 이하의 징역 또는 1억원 이하의 벌금</strong>에 처해질 수 있어요. 재산은닉 사실이 드러나면 면책불허가는 물론이고 이미 확정된 면책도 취소될 수 있어요. 가족이나 지인 명의로 재산을 돌려놓는 것도 전형적인 은닉으로 적발돼요.
            </p>
          </SpokeWarnBox>

          <p className="text-neutral-600 mb-4 leading-relaxed">
            재산은닉은 도박과 달리 재량면책을 받기도 매우 어려워요. 법원은 절차에 대한 성실성을 중시하기 때문에, 의도적으로 재산을 숨긴 경우에는 갱생 의지를 인정하기 어렵다고 보는 거예요. 반대로 실수로 신고를 빠뜨린 정도라면 보정 기회가 주어지기도 해요.
          </p>

          <TipBox title="재산은닉으로 오해받지 않으려면">
            <p className="mb-0 leading-relaxed">
              재산목록에 예금, 보험, 부동산, 자동차, 보증금 등 <strong>빠짐없이 기재</strong>하는 게 핵심이에요. 잊고 빠뜨린 것도 은닉으로 의심받을 수 있으니, 신청 전에 본인 명의 재산을 꼼꼼히 조회하세요. <a href="https://www.gov.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">정부24</a>에서 재산 조회가 가능해요.
            </p>
          </TipBox>

          {/* 전환 문장 — A. 독자 대변형 */}
          <p className="text-neutral-600 mb-4 leading-relaxed">
            면책불허가 사유가 있으면 끝이라고 생각하기 쉽잖아요. 하지만 법원이 사정을 봐서 면책해주는 재량면책이라는 제도가 있어요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '재량면책',
        title: '면책불허가 사유가 있어도 면책받는 방법은?',
        desc: '재량면책 제도와 준비 방법 안내',
        icon: 'check',
      },
    },

    /**
     * ===== S4: 재량면책 받는 방법 =====
     * 패턴: 설명 → 비율 바(SpokeRateBars) → 비교 카드(SpokeCompareCards)
     * 전환 스타일: 없음 (마지막 섹션 — primary CTA)
     * 시각 요소: SpokeRateBars + SpokeCompareCards = 2개
     */
    {
      id: 's4',
      number: '04',
      heading: '개인파산 재량면책은 어떻게 받나요?',
      subtitle: '법원이 파산 경위와 갱생 의지를 종합 판단해서 면책을 허가해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            <strong>재량면책</strong>은 <a href="https://www.law.go.kr/법령/채무자회생및파산에관한법률/제564조" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">채무자회생법 제564조 제2항</a>에 근거한 제도예요. 면책불허가 사유가 있더라도 법원이 파산에 이르게 된 경위와 그 밖의 사정을 고려해 상당하다고 인정하면 면책을 허가할 수 있어요. 재량면책을 받으려면 법원에 자신의 사정을 충분히 소명하는 게 중요해요. 단순히 "반성합니다"가 아니라 구체적인 증거와 자료가 뒷받침돼야 해요.
          </p>

          <SpokeRateBars bars={[
            { label: '파산 경위의 불가피성', rate: '핵심', width: '90%' },
            { label: '갱생 의지와 노력', rate: '중요', width: '80%' },
            { label: '채권자 이의 여부', rate: '영향', width: '60%' },
            { label: '성실한 절차 협조', rate: '기본', width: '75%' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            재량면책 신청 시에는 반성문, 치료 기록(도박의 경우), 취업 계획서, 가계부 등을 제출하면 유리해요. 법원 심문 기일에 출석해서 갱생 의지를 직접 밝히는 것도 큰 도움이 돼요. 면책불허가 사유의 종류에 따라 재량면책 가능성이 달라지니 참고하세요.
          </p>

          <SpokeCompareCards cards={[
            {
              title: '재량면책 가능성 높은 사유',
              subtitle: '법원이 사정을 봐주는 경우가 많아요',
              items: [
                '도박이나 낭비로 빚을 졌지만 중단하고 치료 중',
                '파산 전 신용거래가 생계 목적이었던 경우',
                '채무자 의무 위반이 경미한 경우',
              ],
              recommended: true,
              recLabel: '가능성 높음',
            },
            {
              title: '재량면책 가능성 낮은 사유',
              subtitle: '법원이 엄격하게 판단하는 경우',
              items: [
                '의도적 재산 은닉 (사기파산)',
                '법원에 허위 진술이나 서류 제출',
                '최근까지 도박 지속하며 반성 부족',
              ],
              recommended: false,
            },
          ]} />
        </>
      ),
      bridgeCTA: {
        href: '/w/개인파산-면책-신청-절차-비용',
        badge: '전체 절차',
        title: '개인파산 신청부터 면책까지 전체 흐름이 궁금하다면',
        desc: '신청 자격, 비용, 서류, 면책까지 한 번에 확인',
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
      question: '개인파산 면책불허가 결정에 불복할 수 있나요?',
      answer: '네, 면책불허가 결정을 받으면 <strong>즉시항고</strong>를 할 수 있어요. 결정문을 송달받은 날부터 14일 이내에 항고장을 제출해야 해요. 항고심에서 원심이 뒤집히는 경우도 있으니 포기하지 않는 게 중요해요.',
    },
    {
      question: '개인파산 면책불허가 사유가 여러 개 겹치면 재량면책이 더 어려운가요?',
      answer: '사유가 겹치면 불리한 건 맞지만, 절대 불가능한 건 아니에요. 법원은 각 사유의 <strong>경중과 경위</strong>를 종합적으로 판단해요. 특히 도박 사유가 있더라도 재산 은닉 같은 절차 위반이 없고 성실하게 협조했다면 재량면책 가능성은 남아 있어요.',
    },
  ],

  relatedSpokes: [
    { badge: '신청 자격', title: '개인파산 신청 자격 조건과 지급불능 기준', desc: '파산 신청이 가능한 조건과 지급불능 판단 기준', href: '/w/개인파산-신청-자격-조건-지급불능' },
    { badge: '비용', title: '개인파산 신청 비용 송달료와 소송구조 제도', desc: '파산 신청에 드는 비용과 무료 지원 방법', href: '/w/개인파산-신청-비용-송달료-소송구조' },
    { badge: '불이익', title: '개인파산 선고 후 불이익 자격제한과 복권', desc: '파산 선고 후 제한되는 자격과 복권 절차', href: '/w/개인파산-선고-불이익-자격제한-복권' },
    { badge: '재신청', title: '개인파산 재신청 조건 면책 후 7년 기준', desc: '면책불허가 후 재신청 가능 시점과 조건', href: '/w/개인파산-재신청-조건-면책후-7년' },
  ],

  sources: [
    { name: '채무자회생법 제564조 (면책허가)', url: 'https://www.law.go.kr/법령/채무자회생및파산에관한법률/제564조', org: '국가법령정보센터' },
    { name: '채무자회생법 제650조 (사기파산죄)', url: 'https://www.law.go.kr/법령/채무자회생및파산에관한법률/제650조', org: '국가법령정보센터' },
    { name: '개인파산 면책 결정 안내', url: 'https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=616&ccfNo=4&cciNo=1&cnpClsNo=1', org: '찾기쉬운 생활법령정보' },
  ],
}

export default data
