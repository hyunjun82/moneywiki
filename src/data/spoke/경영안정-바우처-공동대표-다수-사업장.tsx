import Link from 'next/link'
import type { SpokeData } from './types'
import { SpokeFlow, FormulaBox, SpokeTable, SpokeCompareCards, SpokeWarnBox, SpokeRateBars, SpokeChecklist, RateCards } from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '경영안정-바우처-공동대표-다수-사업장',

  meta: {
    title: '경영안정바우처 공동대표 다수 사업장 신청 기준',
    description: '사업장이 여러 개인데 바우처를 1개만 받을 수 있다는 거 아시나요? 공동대표와 다수 사업장 운영 시 신청 기준을 알려드려요',
    keywords: ['경영안정바우처 공동대표', '바우처 다수 사업장', '공동대표 바우처 신청', '복수 사업장 바우처'],
    ogTitle: '경영안정바우처 공동대표 다수 사업장 신청 기준 | 머니위키',
    ogDescription: '공동대표, 복수 사업장 운영 시 바우처 수혜 기준과 매출 산정 방법 정리',
  },

  hub: {
    url: '/w/경영안정바우처-신청-사용처-금액',
    name: '경영안정바우처 신청 사용처 금액',
  },

  breadcrumb: ['사업', '경영안정바우처 공동대표'],

  hero: {
    badge: '2026년 기준',
    h1: <>경영안정바우처 <span className="text-emerald-600">공동대표</span> — 다수 사업장 신청 기준</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          사업장을 여러 개 운영하거나 공동대표로 등록돼 있으면 바우처 신청이 어떻게 되는지 궁금하다면 잘 오셨어요. <strong>복수 사업체는 1개만, 공동대표는 주대표 1인만</strong> 신청할 수 있어요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          매출 기준도 좀 다르게 적용될 수 있으니 미리 확인해두는 게 좋아요. 전체 바우처 정보는 <Link href="/w/경영안정바우처-신청-사용처-금액" className="text-blue-600 hover:underline">경영안정바우처 신청 사용처 금액 총정리</Link>를 참고하세요. 공동대표 기준부터 볼게요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '경영안정바우처 신청부터 사용까지 전체 흐름 확인하기',
    },
  },

  toc: [
    { id: 's1', text: '공동대표도 바우처를 받을 수 있나요?' },
    { id: 's2', text: '사업장이 여러 개면 어떻게 되나요?' },
    { id: 's3', text: '공동대표 신청 시 주의할 점은 뭔가요?' },
    { id: 's4', text: '다수 사업장 운영자의 매출 기준은 어떻게 되나요?' },
    { id: 's5', text: '자주 묻는 질문' },
  ],

  sections: [
    /**
     * ===== S1: 공동대표 =====
     * 패턴: 원칙 설명 → SpokeFlow + FormulaBox
     * 전환 스타일: A. 독자 대변형
     */
    {
      id: 's1',
      number: '01',
      heading: '공동대표도 바우처를 받을 수 있나요?',
      subtitle: '공동대표 사업체는 주대표 1인만 신청할 수 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            공동대표로 등록된 사업체의 경우, <strong>주대표 1인만</strong> 경영안정바우처를 신청할 수 있어요. 공동대표 A와 B가 있으면 주대표로 등록된 사람만 신청 자격이 있고, 부대표는 같은 사업체에 대해 별도로 신청할 수 없어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            주대표가 누구인지는 사업자등록증에 나와 있어요. 사업자등록증의 '대표자' 란에 먼저 기재된 사람이 주대표예요. 보통 사업자등록 시 먼저 기재한 사람이 주대표가 돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            이 원칙은 같은 사업체에 대해 여러 사람이 중복 신청하는 걸 막기 위한 거예요. 한 사업체에서 바우처를 2번 받을 수 없다는 뜻이에요. 공동대표 2명이 각각 다른 사업체를 운영하고 있다면, 각자의 사업체에 대해 별도로 신청할 수는 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            공동대표 중 주대표가 바우처 대상이 아닌 경우(예: 매출 초과, 제외 업종), 부대표가 대신 신청할 수 있는지는 명확하지 않아요. 이런 경우 소상공인시장진흥공단(1533-0600)에 문의하는 게 확실해요.
          </p>

          <SpokeFlow
            steps={[
              { icon: '1', label: '사업자등록증 확인', sub: '주대표 확인' },
              { icon: '2', label: '주대표가 신청', sub: '1인만 가능' },
              { icon: '3', label: '자격 검증', sub: '매출·업종 확인' },
              { icon: '4', label: '바우처 충전', sub: '주대표 카드로' },
            ]}
          />

          <FormulaBox
            lines={[
              { text: '1. 공동대표 사업체: 주대표 1인만 신청 가능', numbered: true },
              { text: '2. 부대표는 같은 사업체에 대해 신청 불가', numbered: true },
              { text: '3. 각각 별도 사업체 운영 시: 각자 신청 가능', numbered: true },
              { text: '// 주대표 = 사업자등록증 먼저 기재된 사람 (등록증으로 확인)', comment: true },
            ]}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            사업장이 여러 개인 경우도 마찬가지로 제한이 있는지 궁금하잖아요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '복수 사업장',
        title: '사업장 여러 개면 어떻게 되나요?',
        desc: '복수 사업체 운영 시 바우처 신청 기준',
        icon: 'info',
      },
    },

    /**
     * ===== S2: 다수 사업장 =====
     * 패턴: 복수 사업장 규정 → SpokeTable + SpokeCompareCards
     * 전환 스타일: B. 정보 예고형
     */
    {
      id: 's2',
      number: '02',
      heading: '사업장이 여러 개면 어떻게 되나요?',
      subtitle: '복수 사업체라도 1개 사업체에만 신청할 수 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            1인이 여러 사업체를 운영하더라도 경영안정바우처는 <strong>1개 사업체에 대해서만</strong> 신청할 수 있어요. 사업장이 3개, 5개라도 바우처는 딱 1번, 25만원이에요. 가장 유리한 사업체 1개를 골라서 신청하면 돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            '가장 유리한 사업체'를 고르는 기준은 간단해요. 매출이 기준(1억 400만원 미만) 이내이고, 제외 업종이 아닌 사업체를 골라야 해요. 여러 사업체가 모두 대상이라면, 공과금이나 연료비를 가장 많이 쓰는 사업체를 선택하면 바우처를 효율적으로 활용할 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            신청 시 사업자등록번호를 입력하게 되는데, 이때 선택한 사업체에 대해서만 자격 검증이 진행돼요. 다른 사업체로 바꾸고 싶으면 기존 신청을 취소하고 다시 신청해야 하는데, 예산 소진 전에 해야 해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            가족이 각각 별도의 사업체를 운영하는 경우에는 각자 신청할 수 있어요. 1인 1개 사업체 원칙은 '동일인' 기준이라, 부부가 각각 다른 사업자등록을 갖고 있으면 각각 25만원씩 받을 수 있어요.
          </p>

          <SpokeTable
            id="multi-biz"
            title="복수 사업장 운영 시 바우처 규정"
            subtitle="1인 1개 사업체 원칙"
            headers={['상황', '신청 가능 여부', '비고']}
            rows={[
              ['본인 사업체 3개 운영', '1개만 신청 가능', '가장 유리한 1개 선택'],
              ['부부 각각 별도 사업체', '각각 신청 가능', '동일인이 아니면 OK'],
              ['개인사업 + 법인사업', '1개만 신청 가능', '동일인 기준'],
              ['공동대표 + 개인사업', '1개만 신청 가능', '본인 명의 사업체 중 택 1'],
            ]}
          />

          <SpokeCompareCards
            cards={[
              { title: '공과금이 많은 사업체', subtitle: '고정비 절감형', items: ['전기·가스·수도 비용이 높은 업종', '음식점, 카페, 제조업 등', '바우처 25만원 빠르게 소진 가능', '고정비 절감 효과 큰 편'] },
              { title: '주유비가 많은 사업체', subtitle: '연료비 절감형', items: ['차량 사용이 많은 업종', '배달업, 운수업, 영업직 등', '연료비로 바우처 활용 가능', '이동이 많은 사업에 유리'] },
            ]}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            공동대표로 신청할 때 좀 더 주의해야 할 점이 있으니 확인하고 넘어가야 해요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '주의사항',
        title: '공동대표 신청 시 주의할 점은?',
        desc: '공동대표 관련 주의사항과 분쟁 방지',
        icon: 'info',
      },
    },

    /**
     * ===== S3: 공동대표 주의점 =====
     * 패턴: 주의사항 → SpokeWarnBox + SpokeRateBars
     * 전환 스타일: C. 간결 연결형
     */
    {
      id: 's3',
      number: '03',
      heading: '공동대표 신청 시 주의할 점은 뭔가요?',
      subtitle: '주대표 확인과 사전 합의가 중요해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            공동대표 사업체에서 바우처를 신청하려면 먼저 <strong>주대표가 누구인지</strong> 확인해야 해요. 사업자등록증에 대표자가 2명 이상 기재돼 있으면, 먼저 기재된 사람이 주대표예요. 주대표만 신청할 수 있으니 이 부분을 놓치면 신청 자체가 안 돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            바우처는 주대표 명의의 카드로만 사용할 수 있어요. 부대표가 사업장의 공과금이나 주유비를 결제하더라도, 바우처가 주대표 카드에 충전되기 때문에 주대표 카드로 결제해야 차감이 돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            공동대표 간에 바우처 사용에 대해 미리 합의하는 게 좋아요. 25만원이 큰 금액은 아니지만, 누가 신청하고 어디에 쓸지 정하지 않으면 분쟁이 생길 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            주대표 변경은 세무서에서 사업자등록 정정을 해야 하는 절차예요. 바우처 때문에 주대표를 바꾸는 건 비효율적이니까, 현재 주대표가 신청하는 게 합리적이에요.
          </p>

          <SpokeWarnBox title="주의사항">
            <p className="mb-0 leading-relaxed">
              공동대표가 2명 이상일 때는 바우처 신청 전에 <strong>누가 신청하고, 어디에 사용할지 미리 합의</strong>하세요. 바우처는 주대표 카드에만 충전되고, 한 번 충전되면 다른 대표자에게 이전이 안 돼요. 사전 합의 없이 주대표가 단독으로 사용하면 갈등의 원인이 될 수 있어요.
            </p>
          </SpokeWarnBox>

          <SpokeRateBars
            bars={[
              { label: '주대표 확인', rate: '필수', width: '100%' },
              { label: '부대표 합의', rate: '권장', width: '80%' },
              { label: '카드 등록 (주대표)', rate: '필수', width: '100%' },
              { label: '사용 계획 수립', rate: '권장', width: '60%' },
            ]}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            마지막으로 여러 사업장을 운영할 때 매출 기준이 어떻게 적용되는지도 확인해 볼게요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '매출 기준',
        title: '여러 사업장의 매출은 어떻게 보나요?',
        desc: '다수 사업장 매출 기준 적용 방법',
        icon: 'calc',
      },
    },

    /**
     * ===== S4: 다수 사업장 매출 =====
     * 패턴: 매출 기준 → SpokeChecklist + RateCards
     * 전환 스타일: 없음 (마지막 섹션)
     */
    {
      id: 's4',
      number: '04',
      heading: '다수 사업장 운영자의 매출 기준은 어떻게 되나요?',
      subtitle: '신청한 사업체의 매출만 기준으로 봐요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            경영안정바우처 매출 기준은 <strong>신청한 사업체 1개의 매출</strong>만 봐요. 다른 사업체의 매출과 합산하지 않아요. 예를 들어 A 사업체 매출이 8,000만원, B 사업체 매출이 5,000만원이라면, A 사업체로 신청하면 8,000만원 기준으로 검증돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            이건 소상공인에게 유리한 구조예요. 사업체 3개의 매출을 합치면 기준을 초과하더라도, 매출이 가장 낮은 사업체 1개로 신청하면 대상이 될 수 있어요. 신청할 사업체를 전략적으로 선택하는 게 중요해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            다만 '소상공인' 자격 판단 시에는 모든 사업장의 상시근로자를 합산해요. 사업장 3개에 각각 직원이 2명씩 있으면 총 6명이라, 서비스업 기준(5인 미만) 소상공인에 해당하지 않을 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            전체 규정을 종합하면, 매출은 사업체별로, 소상공인 자격은 합산으로 판단한다는 거예요. 두 가지 모두 충족해야 바우처를 받을 수 있어요.
          </p>

          <SpokeChecklist
                        items={[
              { text: '신청할 사업체 1개를 선택했다', done: false, note: '매출이 기준 이내인 사업체' },
              { text: '해당 사업체 매출이 1억 400만원 미만이다', done: false, note: '합산 아닌 개별 매출' },
              { text: '모든 사업장 직원 합산이 소상공인 기준 이내다', done: false, note: '서비스업 5인·제조업 10인 미만' },
              { text: '선택한 사업체가 제외 업종이 아니다', done: false, note: '유흥업 등 제외' },
              { text: '공동대표인 경우 주대표인지 확인했다', done: false, note: '주대표만 신청 가능' },
            ]}
          />

          <RateCards cards={[
            { value: '매출 기준', label: '신청 사업체만', lines: ['해당 사업체 1개의 매출', '다른 사업체 매출 미포함', '1억 400만원 미만'], highlight: '중요', highlightColor: 'emerald' },
            { value: '근로자 기준', label: '전체 합산', lines: ['모든 사업장 직원 합산', '서비스업: 5인 미만', '제조업: 10인 미만'] },
            { value: '신청 횟수', label: '1회만', lines: ['복수 사업체라도 1개만', '1인 1개 사업체 원칙', '25만원 x 1회'] },
            { value: '공동대표', label: '주대표 1인', lines: ['주대표만 신청 가능', '부대표 별도 신청 불가', '사업자등록증 확인'] },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            공동대표와 다수 사업장 관련 규정을 확인했다면, 바우처 신청을 진행해 보세요. <Link href="/w/경영안정-바우처-신청-방법-홀짝제" className="text-blue-600 hover:underline">경영안정바우처 신청 방법과 홀짝제</Link>에서 접수 방법을 확인할 수 있어요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '/w/경영안정바우처-신청-사용처-금액',
        badge: '전체 가이드',
        title: '바우처 전체 정보를 한눈에 보고 싶다면?',
        desc: '경영안정바우처 전체 과정 확인하기',
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
      question: '공동대표인데 주대표가 바우처에 관심이 없어요. 부대표가 신청할 수 있나요?',
      answer: '원칙적으로 주대표만 신청할 수 있어요. 주대표가 신청하지 않으면 해당 사업체는 바우처를 못 받아요. 부대표가 별도의 사업체를 운영하고 있다면, 그 사업체로 신청하는 방법을 고려해 보세요.',
    },
    {
      question: '사업장 2개 중 하나가 제외 업종이에요. 나머지 하나로 신청할 수 있나요?',
      answer: '네, 제외 업종이 아닌 사업체로 신청하면 돼요. 매출 기준은 신청한 사업체 1개만 보기 때문에, 대상 요건을 충족하는 사업체를 선택해서 신청하세요.',
    },
  ],

  relatedSpokes: [
    { badge: '대상', title: '경영안정바우처 신청 대상과 매출 기준', desc: '누가 대상이고 매출 기준이 어떻게 되는지', href: '/w/경영안정-바우처-신청-대상-매출-기준' },
    { badge: '계산', title: '매출 연환산 계산 방법', desc: '창업 첫해 매출 기준과 연환산 공식', href: '/w/경영안정-바우처-매출-연환산-계산' },
    { badge: '중복', title: '바우처 중복 수혜와 배달비 크레딧', desc: '다른 지원금과 겹치는 경우', href: '/w/경영안정-바우처-중복-수혜-배달비-크레딧' },
    { badge: '신청', title: '경영안정바우처 신청 방법과 홀짝제', desc: '온라인 접수 방법과 홀짝제 일정', href: '/w/경영안정-바우처-신청-방법-홀짝제' },
  ],

  sources: [
    { name: '소상공인 경영안정 바우처 지원사업 시행 공고', url: 'https://www.bizinfo.go.kr/sii/siia/selectSIIA200Detail.do?pblancId=PBLN_000000000117908', org: '기업마당(중소벤처기업부)' },
    { name: '영세 소상공인 고정비 부담 완화 보도자료', url: 'https://www.mss.go.kr/site/smba/ex/bbs/View.do?cbIdx=86&bcIdx=1065091', org: '중소벤처기업부' },
    { name: '소상공인 경영안정 바우처 전용 사이트', url: 'https://voucher.sbiz24.kr/', org: '소상공인시장진흥공단' },
  ],
}

export default data
