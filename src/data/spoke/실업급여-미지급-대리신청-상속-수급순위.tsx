import type { SpokeData } from '@/data/spoke/types'
import {
  SpokeTable,
  FormulaBox,
  TipBox,
  WarnBox,
  Steps,
  SpokeFlow,
  SpokeChecklist,
  SpokeRateBars,
  SpokeCompareCards,
  SpokeTimeline,
} from '@/components/spoke/SpokeBlocks'
import 미지급청구Checker from '@/components/checkers/미지급청구Checker'

const data: SpokeData = {
  slug: '실업급여-미지급-대리신청-상속-수급순위',

  meta: {
    title: '실업급여 미지급 대리신청 상속 수급순위 | 사망 시 청구 기한 3년',
    description: '실업급여 수급자가 사망하면 유족이 미지급분을 청구할 수 있어요. 상속 순위 6단계와 3년 소멸시효, 필요 서류를 정리했어요.',
    keywords: [
      '실업급여 미지급 상속 수급 순위',
      '실업급여 대리신청 방법 조건',
      '실업급여 수급자 사망 미지급 청구',
      '실업급여 미지급 청구 서류 절차',
    ],
    ogTitle: '실업급여 미지급 대리신청 상속 수급순위 | 머니위키',
    ogDescription: '수급자 사망 시 유족이 미지급 실업급여를 청구하는 방법과 순위를 확인하세요.',
  },

  hub: {
    url: '/w/실업급여-수급중-취업-알바-상병급여-보호',
    name: '실업급여 수급 중 취업 알바 상병급여 수급권 보호',
  },

  breadcrumb: ['고용·노동', '실업급여 수급 중 관리', '미지급 대리신청'],

  summary3: [
    <>수급자 사망 시 미지급 실업급여는 <strong>생계를 같이 한 유족</strong>이 대리 청구할 수 있어요</>,
    <>수급 순위는 배우자 → 자녀 → 부모 → 손자녀 → 조부모 → 형제자매 <strong>6단계</strong>예요</>,
    <>청구 기한은 <strong>사망일로부터 3년</strong>이고, 소멸시효가 지나면 받을 수 없어요</>,
  ],

  sourceBar: {
    badge: '출처',
    name: '고용보험법 제57조·제107조',
    date: '2026.02',
  },

  prevNext: {
    prev: { title: '실업급여 압류 금지 수급권 보호', href: '/w/실업급여-압류금지-수급권-보호-계좌' },
    next: { title: '실업급여 재신청 재취업 재퇴직 수급', href: '/w/실업급여-재신청-재취업-재퇴직-수급-조건' },
  },

  stickyBar: {
    topLabel: '미지급 청구 기한',
    value: '사망일로부터 3년',
    buttonText: '청구 절차 보기 →',
    scrollTo: '#s3',
  },

  hero: {
    badge: '2026년 기준',
    h1: (
      <>
        실업급여 <span className="text-[#1E3A5F]">미지급 대리신청</span> 상속 수급순위와 청구 방법
      </>
    ),
    intro: (
      <p className="text-base text-neutral-500 leading-relaxed">
        실업급여를 받던 가족이 갑자기 돌아가셨다면 남은 급여를 어떻게 해야 할지 막막하실 거예요. 고용보험법 제57조에 따르면 생계를 같이 한 유족이 미지급분을 청구할 수 있어요. 다만 <strong>사망일로부터 3년</strong> 안에 청구해야 하니 늦지 않게 준비해야 해요. 바로 아래 체커에서 내가 청구할 수 있는 자격이 되는지부터 확인해 볼게요.
      </p>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '실업급여 수급 중 취업·알바·상병급여·수급권 보호 총정리',
    },
  },

  toc: [
    { id: 'checker', label: '미지급 실업급여 청구 자격 확인하기' },
    { id: 's1', label: '실업급여 미지급 상속 수급 순위는 어떻게 되나요?' },
    { id: 's2', label: '실업급여 대리신청 방법과 위임 조건은 무엇인가요?' },
    { id: 's3', label: '실업급여 수급자 사망 시 미지급 청구 기한은 언제까지인가요?' },
    { id: 's4', label: '실업급여 미지급 청구에 필요한 서류와 절차는 무엇인가요?' },
    { id: 's-faq', label: '자주 묻는 질문' },
  ],

  sections: [
    {
      id: 'checker',
      number: 'CHECK',
      heading: '미지급 실업급여를 청구할 수 있는지 확인해 보세요',
      subtitle: '3가지만 선택하면 청구 가능 여부를 바로 알 수 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            미지급 실업급여는 아무나 받을 수 있는 게 아니에요. <strong>가족 관계</strong>와 <strong>생계 공동 여부</strong>, 그리고 <strong>사망 후 경과 기간</strong> 3가지를 충족해야 해요. 아래에서 대략적인 자격 여부를 확인해 보세요.
          </p>
          <미지급청구Checker />
        </>
      ),
      bridgeCTA: {
        href: '#s1',
        badge: '순위',
        title: '내 가족 관계에서 내가 몇 순위일까요?',
        desc: '배우자부터 형제자매까지 6단계 수급 순위를 확인하세요.',
        icon: 'info',
      },
    },

    {
      id: 's1',
      number: 'SECTION 01',
      heading: '실업급여 미지급 상속 수급 순위는 어떻게 되나요?',
      subtitle: '배우자가 1순위, 형제자매가 마지막 6순위예요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            실업급여를 받던 분이 사망하면 아직 지급되지 않은 급여가 남는 경우가 있어요. 이걸 <strong>미지급 구직급여</strong>라고 하는데, 고용보험법 제57조에 따라 유족이 순위별로 청구할 수 있어요. 여기서 핵심은 사망한 수급자와 <strong>생계를 같이 하고 있던 사람</strong>이어야 한다는 거예요. 단순히 가족이라는 사실만으로는 부족해요.
          </p>

          <SpokeTable
            id="tbl-priority"
            title="미지급 실업급여 수급 순위표"
            subtitle="고용보험법 제57조 기준 / 같은 순위 2명 이상이면 균등 분배"
            headers={['순위', '대상', '비고']}
            rows={[
              ['1순위', '배우자', '사실혼 관계 포함'],
              ['2순위', '자녀', '성인·미성년 모두 가능'],
              ['3순위', '부모', '양부모 포함'],
              ['4순위', '손자녀', '직계비속 2촌'],
              ['5순위', '조부모', '외조부모 포함'],
              ['6순위', '형제자매', '마지막 순위'],
            ]}
            highlightCol={1}
          />

          <SpokeRateBars
            bars={[
              { label: '1순위', rate: '배우자', width: '100%' },
              { label: '2순위', rate: '자녀', width: '83%' },
              { label: '3순위', rate: '부모', width: '67%' },
              { label: '4순위', rate: '손자녀', width: '50%' },
              { label: '5순위', rate: '조부모', width: '33%' },
              { label: '6순위', rate: '형제자매', width: '17%' },
            ]}
          />

          <TipBox title="같은 순위에 여러 명이 있으면?">
            1순위인 배우자가 없고 자녀가 3명이라면, 미지급 급여를 3명이 <strong>균등하게 나눠</strong> 받아요. 상위 순위자가 한 명이라도 있으면 하위 순위자는 청구할 수 없어요.
          </TipBox>

          <WarnBox>
            <strong>핵심 조건은 &apos;생계를 같이 하고 있었느냐&apos;예요.</strong> 단순히 가족이라는 사실만으로는 부족하고, 사망 당시 <strong>같은 집에 살거나 생활비를 함께 쓰고 있었다</strong>는 점이 증명되어야 해요. 주민등록등본에 같은 주소지로 등재되어 있으면 입증이 쉬워요.
          </WarnBox>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '자격',
        title: '따로 살았으면 무조건 못 받는 걸까요?',
        desc: '생계 공동 입증 방법과 예외 케이스를 바로 확인할 수 있어요.',
        icon: 'info',
      },
    },

    {
      id: 's2',
      number: 'SECTION 02',
      heading: '실업급여 대리신청 방법과 위임 조건은 무엇인가요?',
      subtitle: '가족 범위 + 생계 공동 입증이 핵심이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            순위를 확인했다면 실제 자격 요건이 궁금하실 거예요. 미지급 실업급여를 받으려면 두 가지를 동시에 충족해야 해요. 하나는 법에서 정한 <strong>가족 범위</strong>에 들어야 하고, 다른 하나는 사망 당시 <strong>생계를 같이 하고 있었다</strong>는 사실을 증명해야 해요. 둘 중 하나라도 빠지면 청구가 거부될 수 있어요.
          </p>

          <SpokeCompareCards
            cards={[
              {
                title: '요건 1: 가족 범위',
                subtitle: '고용보험법 제57조 기준',
                items: [
                  '배우자 (사실혼 포함)',
                  '자녀, 부모 (양부모 포함)',
                  '손자녀, 조부모',
                  '형제자매',
                ],
                recommended: true,
                recLabel: '법정 범위',
              },
              {
                title: '요건 2: 생계 공동',
                subtitle: '사망 당시 기준',
                items: [
                  '같은 집에 거주 (등본 동일 주소)',
                  '또는 생활비 송금 내역',
                  '사실혼은 별도 입증 필요',
                  '두 요건 모두 충족해야 함',
                ],
              },
            ]}
          />

          <FormulaBox
            lines={[
              { text: '미지급 청구 자격 공식', comment: true },
              { text: '청구 자격 = 가족 범위 충족 + 생계 공동 입증' },
            ]}
          />

          <SpokeChecklist
            items={[
              { text: '주민등록등본에 같은 주소지로 등재되어 있다', done: true, note: '가장 확실한 생계 공동 증빙' },
              { text: '사실혼 관계라면 동거 사실 확인서가 있다', done: false, note: '주민등록등본에 미반영 시 별도 증빙 필요' },
              { text: '별거 상태였지만 생활비 송금 내역이 있다', done: false, note: '통장 이체 내역 등으로 생계 공유 입증' },
              { text: '수급 순위에 해당하는 가족관계증명서 준비 완료', done: true },
            ]}
          />

          <TipBox title="사실혼 배우자도 1순위로 청구할 수 있어요">
            혼인신고를 안 했더라도 사실혼 관계를 입증하면 법적 배우자와 동일하게 <strong>1순위</strong>로 미지급 급여를 청구할 수 있어요. 주민등록등본이나 동거 사실 확인서가 증빙으로 활용돼요. 이 권리는 <a href="/w/실업급여-압류금지-수급권-보호-계좌" className="text-[#4A7AB5] underline">수급권 보호 제도</a>와 같은 취지로, 실제 부양 관계에 있던 유족을 보호하기 위한 거예요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '기한',
        title: '오랜 시간이 지났는데도 청구할 수 있을까요?',
        desc: '3년 소멸시효 기준과 기한 내 청구 방법을 확인하세요.',
        icon: 'clock',
      },
    },

    {
      id: 's3',
      number: 'SECTION 03',
      heading: '실업급여 수급자 사망 시 미지급 청구 기한은 언제까지인가요?',
      subtitle: '사망일로부터 3년, 소멸시효가 지나면 권리가 사라져요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            자격이 된다고 해서 마음 놓으면 안 돼요. 미지급 실업급여를 받을 권리에는 법정 기한이 있어요. 고용보험법 제107조에 따라 <strong>사망일로부터 3년</strong> 안에 청구하지 않으면 소멸시효가 완성돼서 더 이상 받을 수 없게 돼요. 늦게 알았다고 해도 사망일 기준이라서 예외가 없어요.
          </p>

          <SpokeTimeline
            events={[
              { month: 'D-Day', title: '수급자 사망', desc: '미지급 구직급여 발생, 소멸시효 기산', status: 'warning' },
              { month: '~6개월', title: '권장 청구 시기', desc: '장례 정리 후 가능한 빨리 청구하는 게 유리해요', status: 'current' },
              { month: '~1년', title: '서류 준비 여유 기간', desc: '생계 공동 입증이 어려우면 이 기간 안에 증빙을 모아요' },
              { month: '3년 경과', title: '소멸시효 완성', desc: '이 시점 이후에는 청구 자체가 불가능해요', status: 'warning' },
            ]}
          />

          <SpokeTable
            id="tbl-timeline"
            title="미지급 청구 기한 vs 일반 실업급여 기한 비교"
            subtitle="고용보험법 기준"
            headers={['구분', '기한', '기산일', '근거']}
            rows={[
              ['미지급 청구 소멸시효', '3년', '수급자 사망일', '제107조'],
              ['일반 수급기한', '12개월', '이직일 다음날', '제48조'],
              ['수급권 양도·압류 금지', '해당 없음', '-', '제38조'],
            ]}
            highlightCol={1}
          />

          <WarnBox>
            <strong>소멸시효 3년은 연장되지 않아요.</strong> 유족이 사망 사실을 늦게 알았더라도 법적으로 사망일 기준 3년이 지나면 청구할 수 없어요. 사망 후 <strong>6개월 이내</strong>에 청구하는 걸 권장해요.
          </WarnBox>

          <TipBox title="미지급 급여는 민법상 상속재산이 아니에요">
            미지급 실업급여는 <strong>고용보험법상 고유한 청구권</strong>이에요. 상속 포기를 했더라도 생계를 같이 한 유족이라면 별도로 청구할 수 있어요. 반대로 상속인이라도 생계를 같이 하지 않았으면 자격이 없어요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '서류',
        title: '서류는 어떻게 준비하고 어디에 내면 되나요?',
        desc: '고용센터 방문부터 지급까지 구체적인 절차를 확인하세요.',
        icon: 'check',
      },
    },

    {
      id: 's4',
      number: 'SECTION 04',
      heading: '실업급여 미지급 청구에 필요한 서류와 절차는 무엇인가요?',
      subtitle: '고용센터 방문 → 서류 제출 → 심사 → 지급',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            기한도 확인했고 자격도 된다면 이제 실제 청구만 남았어요. 절차는 <a href="/w/실업급여-신청-방법-절차-준비서류" className="text-[#4A7AB5] underline">일반 실업급여 신청</a>과 비슷한데, 사망 사실 증명 서류가 추가로 필요해요. 관할은 사망한 수급자가 마지막으로 실업인정을 받은 고용센터예요.
          </p>

          <Steps
            items={[
              { title: '관할 고용센터 확인', desc: '사망한 수급자가 마지막으로 실업인정을 받은 고용센터가 관할이에요. 고용24(work24.go.kr)에서 조회할 수 있어요' },
              { title: '미지급 실업급여 청구서 작성', desc: '고용센터에서 양식을 받거나 고용보험 홈페이지에서 미리 다운로드해요 (시행규칙 제90호 서식)' },
              { title: '구비서류 제출', desc: '사망진단서, 주민등록등본, 가족관계증명서 등을 함께 제출해요' },
              { title: '심사 후 지급', desc: '서류 확인 후 미지급분이 청구인 계좌로 입금돼요. 접수 후 14일 이내 처리가 원칙이에요' },
            ]}
          />

          <SpokeTable
            id="tbl-docs"
            title="미지급 실업급여 청구 시 필요 서류"
            subtitle="정부24 기준 / 상황에 따라 추가 서류 요청 가능"
            headers={['서류', '용도', '발급처']}
            rows={[
              ['미지급 실업급여 청구서', '청구 양식 (고용센터 비치)', '고용센터'],
              ['사망진단서 또는 사체검안서', '사망 사실 확인', '병원·읍면동 주민센터'],
              ['주민등록등본', '생계 공동 + 주소지 확인', '주민센터·정부24'],
              ['가족관계증명서 (상세)', '가족 관계 확인', '법원·정부24'],
              ['기본증명서 (상세)', '사망자 인적사항 확인', '법원·정부24'],
              ['청구인 신분증 + 통장사본', '본인 확인 + 입금 계좌', '본인 지참'],
            ]}
            highlightCol={0}
          />

          <SpokeFlow
            steps={[
              { icon: '📋', label: '서류 준비', sub: '사망진단서 등' },
              { icon: '🏢', label: '고용센터 방문', sub: '관할 센터' },
              { icon: '🔍', label: '심사', sub: '14일 이내' },
              { icon: '💰', label: '미지급분 수령', sub: '계좌 입금' },
            ]}
          />

          <TipBox title="사망 당일까지의 실업인정도 함께 진행해요">
            미지급 청구 시 사망한 수급자에 대한 <strong>최종 실업인정</strong>도 동시에 처리해요. 고용센터에서 사망일까지의 구직활동을 인정하고, 그에 따른 급여를 산정해서 지급해요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '/w/실업급여-수급중-취업-알바-상병급여-보호',
        badge: '전체 가이드',
        title: '실업급여 수급 중 다른 궁금증이 있다면?',
        desc: '취업·알바 신고, 상병급여 전환, 수급권 보호까지 허브에서 확인하세요.',
        icon: 'grid',
        primary: true,
      },
    },

    {
      id: 's-faq',
      number: '05',
      heading: '자주 묻는 질문',
      subtitle: '',
      content: null,
    },
  ],

  faq: [
    {
      question: '실업급여 수급자가 사망하면 남은 급여를 가족이 받을 수 있나요?',
      answer: '<strong>네.</strong> 고용보험법 제57조에 따라 사망한 수급자와 생계를 같이 하고 있던 배우자, 자녀, 부모, 손자녀, 조부모, 형제자매가 순위에 따라 미지급분을 청구할 수 있어요. 청구 기한은 사망일로부터 <strong>3년</strong>이에요.',
    },
    {
      question: '생계를 같이 하지 않았던 자녀도 미지급 실업급여를 받을 수 있나요?',
      answer: '원칙적으로 <strong>생계를 같이 하고 있던 사람</strong>만 청구할 수 있어요. 따로 살고 있었다면 생활비 송금 내역이나 통장 이체 내역으로 생계 공유를 입증해야 해요. 입증이 어려우면 청구가 거부될 수 있어요.',
    },
    {
      question: '미지급 실업급여를 청구하면 세금이 붙나요?',
      answer: '실업급여는 <strong>비과세 소득</strong>이에요. 미지급분도 마찬가지로 소득세가 부과되지 않아요. 건강보험료 산정에도 포함되지 않으니 안심하세요.',
    },
    {
      question: '상속을 포기했는데도 미지급 실업급여를 받을 수 있나요?',
      answer: '<strong>가능해요.</strong> 미지급 실업급여는 민법상 상속재산이 아니라 고용보험법상 고유한 청구권이에요. 상속 포기와 무관하게 생계를 같이 한 유족이라면 별도로 청구할 수 있어요.',
    },
  ],

  relatedSpokes: [
    { badge: '보호', title: '실업급여 압류 금지 수급권 보호 전용계좌', desc: '수급권 보호 범위와 전용계좌 개설 방법', href: '/w/실업급여-압류금지-수급권-보호-계좌' },
    { badge: '재신청', title: '실업급여 재신청 재취업 재퇴직 수급 조건', desc: '재취업 후 재퇴직 시 재수급 가능 여부', href: '/w/실업급여-재신청-재취업-재퇴직-수급-조건' },
    { badge: '신청', title: '실업급여 신청 방법 절차 준비서류', desc: '실업급여 최초 신청 절차와 필요 서류 안내', href: '/w/실업급여-신청-방법-절차-준비서류' },
    { badge: '중단', title: '실업급여 중단 거부 수급정지 사유 대처법', desc: '갑자기 실업급여가 끊겼을 때 확인할 사항', href: '/w/실업급여-중단-거부-수급정지-사유-대처' },
  ],

  sources: [
    { name: '고용보험법 제57조 (미지급 구직급여)', url: 'https://www.law.go.kr/법령/고용보험법', org: '법제처' },
    { name: '고용보험법 제107조 (소멸시효)', url: 'https://www.law.go.kr/법령/고용보험법', org: '법제처' },
    { name: '미지급 실업급여 청구 안내', url: 'https://www.gov.kr/mw/AA020InfoCappView.do?HighCtgCD=A05007&CappBizCD=14900000073', org: '정부24' },
    { name: '고용보험 실업급여 안내', url: 'https://www.ei.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePb0201Info.do', org: '고용보험' },
  ],
}

export default data
