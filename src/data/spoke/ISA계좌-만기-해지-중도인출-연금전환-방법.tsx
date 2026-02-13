/**
 * ISA계좌 만기 해지 중도인출 | 연금전환 세액공제 방법 — 스포크 5
 *
 * 팩트체크 (2026-02-13):
 * - 의무기간: 3년
 * - 만기 해지: 비과세 적용
 * - 중도해지: 15.4% 전액 과세
 * - 원금 중도인출: 패널티 없음, 계좌 유지
 * - 연금전환: 60일 이내, 전환금의 10% 세액공제 (최대 300만원)
 * - 세액공제율: 16.5% (총급여 5,500만원 이하) / 13.2% (초과)
 */

import type { SpokeData } from '@/data/spoke/types'
import {
  SpokeTable, TipBox, WarnBox, FormulaBox,
  SpokeFlow, SpokeCompareCards, SpokeStepCards,
  SpokeTimeline, SpokeRateBars, SpokeChecklist, RateCards,
} from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: 'ISA계좌-만기-해지-중도인출-연금전환-방법',

  meta: {
    title: 'ISA계좌 만기 해지 중도인출 | 연금전환 세액공제 방법',
    description: 'ISA 만기 후 연금전환하면 최대 49.5만원을 추가로 돌려받는다는 사실, 알고 계셨나요? 만기 절차부터 중도인출, 연금전환 세액공제까지 정리해드려요.',
    keywords: ['ISA계좌 만기', 'ISA계좌 해지', 'ISA계좌 중도인출', 'ISA계좌 연금전환'],
    ogTitle: 'ISA계좌 만기 해지 중도인출 | 연금전환 세액공제 방법 | 머니위키',
    ogDescription: 'ISA 만기 3년, 해지 절차, 원금 중도인출, 연금전환 세액공제 300만원까지.',
  },

  hub: {
    url: '/w/ISA계좌-세금혜택-비과세-한도-중개형-서민형-비교',
    name: 'ISA계좌 세금혜택 비과세 한도 | 중개형 서민형 유형 비교 2026',
  },

  breadcrumb: ['금융/투자', 'ISA계좌', '만기·해지·연금전환'],

  summary3: [
    <>ISA계좌 의무 가입 기간은 <strong>3년</strong>, 만기 해지 시 비과세 적용</>,
    <>원금은 <strong>언제든 중도인출 가능</strong> — 패널티 없음, 계좌 유지</>,
    <>연금전환 시 전환금액 10% <strong>최대 300만원 세액공제</strong> 추가</>,
  ],

  sourceBar: {
    badge: '출처',
    name: '금융위원회 ISA 만기·연금전환 안내',
    date: '2026.02',
  },

  prevNext: {
    prev: { href: '/w/ISA계좌-납입한도-연간-2000만원-이월-규정', title: 'ISA계좌 납입한도 연간 2000만원 이월 규정' },
    next: { href: '/w/ISA계좌-세금혜택-비과세-한도-중개형-서민형-비교', title: 'ISA계좌 세금혜택 비과세 한도 비교 (허브)' },
  },

  stickyBar: {
    topLabel: '연금전환 세액공제',
    value: '최대 300만원',
    buttonText: '연금전환 혜택 보기 →',
    scrollTo: '#s4',
  },

  hero: {
    badge: '2026년 기준',
    h1: (
      <>
        ISA계좌 만기 해지 중도인출 | <span className="text-[#1E3A5F]">연금전환</span> 세액공제 방법
      </>
    ),
    intro: (
      <p className="text-base text-neutral-500 leading-relaxed">
        ISA 만기는 3년이에요. 만기 해지하면 비과세 혜택을 받고, 연금전환하면 세액공제 <strong>최대 49.5만원</strong>을 추가로 받아요.
      </p>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: 'ISA계좌 세금혜택, 유형 비교, 개설, 투자 전략 총정리',
    },
  },

  toc: [
    { id: 's1', label: 'ISA계좌 만기는 언제인가요?' },
    { id: 's2', label: 'ISA계좌 해지는 어떻게 하나요?' },
    { id: 's3', label: 'ISA계좌 중도인출은 어떻게 하나요?' },
    { id: 's4', label: 'ISA계좌 연금전환은 어떤 혜택이 있나요?' },
    { id: 's-faq', label: '자주 묻는 질문' },
  ],

  sections: [
    {
      id: 's1',
      number: 'SECTION 01',
      heading: 'ISA계좌 만기는 언제인가요?',
      subtitle: '가입일로부터 정확히 3년 후예요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            ISA계좌의 의무 가입 기간은 <strong>3년</strong>이에요. 가입일로부터 정확히 3년이 지나야 만기가 되고, 하루라도 부족하면 중도해지로 처리돼요. 만기가 되면 세 가지 선택지가 있어요.
          </p>

          <WarnBox>
            <strong>3년 의무기간 중요:</strong> 2023년 3월 1일 개설 → 2026년 3월 1일 만기예요. 하루라도 일찍 해지하면 15.4% 세금을 다 내야 해요.
          </WarnBox>

          <SpokeTable
            id="tbl-options"
            title="ISA계좌 만기 후 선택지 비교"
            subtitle="해지·연장·연금전환"
            headers={['선택', '비과세', '추가 혜택', '추천 대상']}
            rows={[
              ['즉시 해지', '적용', '없음', '목돈 필요한 사람'],
              ['만기 연장 (최대 5년)', '추가 한도', '비과세 한도 2배', '장기 투자자'],
              ['연금전환', '적용', '세액공제 최대 300만원', '노후 준비자'],
            ]}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            만기일 1개월 전에 은행·증권사에서 문자나 앱 알림으로 안내해줘요. 만기일이 지나도 자동 해지는 되지 않으니 직접 신청해야 해요. 만기 연장을 선택하면 비과세 한도가 추가로 생기니까 장기 투자 계획이 있으면 연장이 유리해요.
          </p>

          <TipBox title="만기 연장 시 비과세 한도 2배">
            만기 연장은 1회만 가능하고 최대 5년이에요. 연장하면 서민형은 비과세 한도가 400만원 → 800만원으로, 일반형은 200만원 → 400만원으로 늘어나요.
          </TipBox>
        </>
      ),
      pasBridge: {
        href: '/w/ISA계좌-비과세-한도-손익통산-절세-계산',
        question: '만기 해지 시 비과세 혜택이 정확히 얼마인지 아시나요?',
        answer: <>서민형 400만원, 일반형 200만원까지 세금 0원이에요. 손익통산으로 실제 절세액을 계산해 보세요.</>,
        buttonText: '해지 절차 보기 →',
      },
    },

    {
      id: 's2',
      number: 'SECTION 02',
      heading: 'ISA계좌 해지는 어떻게 하나요?',
      subtitle: '만기 해지 vs 중도해지, 세금 차이가 커요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            ISA계좌 해지는 만기 이후에 하느냐 이전에 하느냐에 따라 세금이 완전히 달라져요. 만기 해지는 비과세 혜택이 적용되지만, 중도해지는 일반 계좌처럼 15.4% 세금을 내야 해요.
          </p>

          <SpokeCompareCards cards={[
            { title: '만기 해지 (3년 이후)', subtitle: '비과세 혜택 적용', items: ['비과세 한도: 서민형 400만원 / 일반형 200만원', '초과분 세율: 9.9% (분리과세)', '원금: 100% 수령', '배당 500만원 기준 세금: 9.9만원'], recommended: true, recLabel: '추천' },
            { title: '중도해지 (3년 이전)', subtitle: '비과세 미적용', items: ['비과세 한도: 적용 안 됨', '세율: 15.4% (전액 과세)', '원금: 100% 수령', '배당 500만원 기준 세금: 77만원'] },
          ]} />

          <FormulaBox
            lines={[
              { text: '만기 해지 vs 중도해지 세금 차이 (서민형, 배당 500만원)', comment: true },
              { text: '만기 해지: (500만 − 400만) × 9.9% = 9.9만원' },
              { text: '중도해지: 500만 × 15.4% = 77만원' },
              { text: '차이: 67.1만원 (3년만 기다리면 67만원 절약)' },
            ]}
          />

          <SpokeStepCards steps={[
            { title: '앱 접속', desc: '은행·증권사 앱에서 ISA 계좌 메뉴 선택' },
            { title: '해지 신청', desc: '만기 해지 또는 중도해지 선택' },
            { title: '세금 확인', desc: '자동 계산된 세금 내역 확인' },
            { title: '입금 수령', desc: '원금 + 수익 − 세금이 1~2영업일 내 입금' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            만기 해지와 중도해지 모두 절차는 같아요. 다만 세금 계산에서 비과세 한도 적용 여부가 달라지는 거예요. 해지하면 되돌릴 수 없으니까, 만기일이 얼마 안 남았다면 조금만 더 기다리세요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '/w/ISA계좌-납입한도-연간-2000만원-이월-규정',
        badge: '한도',
        title: '해지 전에 납입한도와 이월 규정 확인하세요',
        desc: '급하게 돈이 필요할 때 패널티 없이 원금만 인출하는 방법을 알려드려요.',
        icon: 'calc',
      },
    },

    {
      id: 's3',
      number: 'SECTION 03',
      heading: 'ISA계좌 중도인출은 어떻게 하나요?',
      subtitle: '원금만 빼면 패널티 없어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            ISA계좌에서 원금은 언제든지 자유롭게 인출할 수 있어요. 원금 인출에는 세금도 패널티도 없고, 계좌도 그대로 유지돼요. 핵심은 '원금'과 '수익'을 구분하는 거예요.
          </p>

          <SpokeRateBars bars={[
            { label: '원금 인출', rate: '세금 0%', width: '5%' },
            { label: '만기 해지', rate: '초과분 9.9%', width: '40%' },
            { label: '중도해지', rate: '전액 15.4%', width: '65%' },
          ]} />

          <SpokeChecklist items={[
            { text: '원금만 인출 → 세금 없음, 계좌 유지', done: true },
            { text: '수익까지 빼기 → 해지 필요 (비과세 포기 위험)', note: '3년 미만이면 15.4%' },
            { text: '원금 인출 후 재입금 → 납입한도 복구 안 됨', note: '빠진 원금만큼 한도 소진' },
            { text: '원금 인출해도 3년 의무기간은 그대로', done: true },
          ]} />

          <SpokeTable
            id="tbl-withdraw"
            title="원금 인출 vs 완전 해지 비교"
            subtitle="계좌 유지 여부가 핵심"
            headers={['구분', '원금 인출', '완전 해지']}
            rows={[
              ['받는 금액', '원금만', '원금 + 수익 − 세금'],
              ['비과세 유지', '유지', '3년 전이면 포기'],
              ['ISA 계좌', '유지', '폐쇄'],
              ['재가입', '불필요', '재가입 필요 (3년 재시작)'],
            ]}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            원금 2,000만원을 넣고 수익 500만원이 생겼을 때, 급하면 원금 2,000만원만 빼고 수익 500만원은 그대로 두세요. 3년 채우면 수익에 비과세 혜택이 적용돼요. 원금을 빼도 3년 카운트다운은 계속 진행되니까 걱정 없어요.
          </p>

          <TipBox title="손실 상태에서 해지하면 세금 없어요">
            수익이 마이너스이면 과세할 대상이 없어요. 다만 나중에 회복될 수도 있으니 신중하게 판단하세요.
          </TipBox>
        </>
      ),
      pasBridge: {
        href: '/w/ISA계좌-가입-조건-개설-방법-필요-서류',
        question: '해지 후 재가입하려면 조건이 어떻게 되나요?',
        answer: <>ISA는 해지 후 바로 재가입 가능해요. 개설 조건, 증권사 선택, 필요 서류를 한 번에 확인하세요.</>,
        buttonText: '연금전환 혜택 보기 →',
      },
    },

    {
      id: 's4',
      number: 'SECTION 04',
      heading: 'ISA계좌 연금전환은 어떤 혜택이 있나요?',
      subtitle: '전환금액 10%, 최대 300만원 세액공제 추가',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            ISA계좌 만기 후 60일 이내에 연금저축이나 IRP로 전환하면 전환금액의 10%(최대 300만원)를 <strong>추가 세액공제</strong> 받을 수 있어요. ISA 비과세 혜택에 더해서 연금 세액공제까지 이중으로 받는 셈이에요.
          </p>

          <SpokeTimeline events={[
            { month: 'D-30', title: '만기 알림 수신', desc: '증권사·은행에서 만기 안내 문자/알림' },
            { month: 'D-day', title: 'ISA 만기 도달', desc: '만기 해지 신청 → 비과세 적용' },
            { month: 'D+30', title: '연금전환 신청', desc: '연금저축 또는 IRP로 전환 신청' },
            { month: 'D+60', title: '전환 기한 마감', desc: '60일 이내 전환 안 하면 혜택 소멸', status: 'warning' },
          ]} />

          <RateCards cards={[
            { label: '전환 한도', value: '300만원', lines: ['전환금액의 10%까지'] },
            { label: '공제율 (5,500↓)', value: '16.5%', lines: ['최대 환급 49.5만원'] },
            { label: '공제율 (5,500↑)', value: '13.2%', lines: ['최대 환급 39.6만원'] },
          ]} />

          <SpokeTable
            id="tbl-pension"
            title="ISA 연금전환 세액공제 상세"
            subtitle="전환금액 10%, 최대 300만원"
            headers={['항목', '내용']}
            rows={[
              ['전환 가능 상품', '연금저축, IRP (개인형 퇴직연금)'],
              ['전환 기한', '만기 해지일로부터 60일 이내'],
              ['추가 공제 한도', '전환금액의 10%, 최대 300만원'],
              ['공제율', '총급여 5,500만원 이하 16.5% / 초과 13.2%'],
              ['최대 환급액', '300만원 × 16.5% = 49.5만원'],
            ]}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            예를 들어 ISA 만기에 3,000만원을 연금저축으로 전환하면, 전환금액의 10%인 300만원이 세액공제 대상이에요. 총급여 5,500만원 이하인 분은 49.5만원을 연말정산에서 돌려받아요. 이 공제는 연금저축 기본 한도(600만원)와 별도로 적용돼요.
          </p>

          <WarnBox>
            <strong>연금전환 기한은 60일:</strong> 기한을 넘기면 전환이 불가능하니 만기 전에 연금저축 계좌를 미리 만들어두세요. 연금전환한 금액은 55세 이후에 연금으로 받아야 해요.
          </WarnBox>
        </>
      ),
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
    { question: 'ISA계좌 만기 되면 자동 해지되나요?', answer: '아니에요, <strong>자동 해지가 안 돼요</strong>. 만기일 이후에 직접 해지 신청해야 원금과 수익을 받을 수 있어요.' },
    { question: 'ISA계좌 중도해지하면 원금도 못 받나요?', answer: '원금은 <strong>100% 돌려받아요</strong>. 수익 부분에만 15.4% 세금이 붙어요. 비과세 혜택만 못 받는 거예요.' },
    { question: 'ISA계좌 연금전환 후 다시 ISA를 개설할 수 있나요?', answer: '<strong>네, 가능해요.</strong> ISA를 해지(또는 연금전환)한 뒤 바로 새 ISA를 개설하면 한도가 리셋돼요.' },
    { question: 'ISA계좌 원금만 빼면 계좌가 해지되나요?', answer: '아니에요, 원금만 인출하면 <strong>계좌는 그대로 유지</strong>돼요. 수익도 계속 운용되고 3년 채우면 비과세 혜택 받아요.' },
  ],

  relatedSpokes: [
    { badge: '절세', title: 'ISA계좌 비과세 한도 손익통산 절세 계산', desc: '비과세 한도와 절세 효과 비교', href: '/w/ISA계좌-비과세-한도-손익통산-절세-계산' },
    { badge: '한도', title: 'ISA계좌 납입한도 연간 2000만원 이월 규정', desc: '연간·누적 납입한도와 이월 여부', href: '/w/ISA계좌-납입한도-연간-2000만원-이월-규정' },
    { badge: '유형', title: 'ISA계좌 중개형 서민형 일반형 유형 선택 기준', desc: '유형별 차이와 선택 가이드', href: '/w/ISA계좌-중개형-서민형-일반형-유형-선택-기준' },
    { badge: '가입', title: 'ISA계좌 가입 조건 개설 방법 필요 서류', desc: '비대면 개설 절차와 증권사 비교', href: '/w/ISA계좌-가입-조건-개설-방법-필요-서류' },
  ],

  sources: [
    { name: 'ISA 제도 안내', url: 'https://www.fsc.go.kr', org: '금융위원회' },
    { name: 'ISA 가이드', url: 'https://www.fss.or.kr', org: '금융감독원' },
    { name: '연금계좌 세액공제', url: 'https://www.nts.go.kr', org: '국세청' },
  ],
}

export default data
