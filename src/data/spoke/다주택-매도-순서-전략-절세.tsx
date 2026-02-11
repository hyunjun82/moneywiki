import Link from 'next/link'
import type { SpokeData } from './types'
import { SpokeStepCards, FormulaBox, SpokeTimeline, SpokeRateBars, SpokeTable, SpokeCompareCards, SpokeChecklist, TipBox } from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '다주택-매도-순서-전략-절세',

  meta: {
    title: '다주택 매도 순서 전략 절세 방법 총정리',
    description: '다주택자가 어떤 집부터 팔아야 세금을 줄일 수 있는지 아시나요? 매도 순서와 시기별 절세 전략을 정리했어요',
    keywords: ['다주택 매도 순서', '매도 절세 전략', '다주택 처분 순서', '양도세 절세'],
    ogTitle: '다주택 매도 순서 전략 절세 방법 총정리 | 머니위키',
    ogDescription: '다주택자 매도 순서, 시기별 전략, 양도차익 큰 주택 먼저 등 절세 방법 총정리했어요.',
  },

  hub: {
    url: '/w/다주택양도세-중과유예-세율-절세-전략',
    name: '다주택양도세 중과유예 세율 절세 전략',
  },

  breadcrumb: ['세금', '다주택양도세 매도 순서'],

  hero: {
    badge: '2026년 기준',
    h1: <>다주택 매도 순서 — <span className="text-[#1E3A5F]">절세 전략</span> 총정리</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          다주택자가 세금을 줄이려면 '어떤 집을 먼저 파느냐'가 핵심이에요. 같은 집이라도 파는 순서와 시기에 따라 세금이 수천만원에서 수억원까지 달라져요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          중과 유예가 2026년 5월 9일에 종료될 예정이라, 지금이 매도 전략을 세울 가장 중요한 시점이에요. <Link href="/w/다주택양도세-중과유예-세율-절세-전략" className="text-blue-600 hover:underline">다주택양도세 중과유예 세율 절세 전략</Link>과 함께 보면 전체 그림이 잡혀요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '다주택 양도세 중과유예 세율 절세 전략 전체 보기',
    },
  },

  toc: [
    { id: 's1', text: '다주택자 매도 순서가 왜 중요한가요?' },
    { id: 's2', text: '어떤 집부터 팔아야 절세가 되나요?' },
    { id: 's3', text: '매도 시기별 전략은 뭔가요?' },
    { id: 's4', text: '절세를 위한 체크리스트는 뭔가요?' },
    { id: 's5', text: '자주 묻는 질문' },
  ],

  sections: [
    /**
     * ===== S1: 매도 순서 중요성 =====
     * 시각 요소: SpokeStepCards + FormulaBox
     * 전환 스타일: A. 독자 대변형
     */
    {
      id: 's1',
      number: '01',
      heading: '다주택자 매도 순서가 왜 중요한가요?',
      subtitle: '순서에 따라 주택 수, 세율, 공제가 모두 달라져요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            다주택자가 주택을 처분할 때 순서가 중요한 이유는 크게 세 가지예요. 첫째, 주택을 하나 팔 때마다 보유 주택 수가 줄어들어서 나머지 주택의 세율이 달라져요. 3주택에서 2주택이 되면 중과 추가세율이 30%p에서 20%p로 줄어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            둘째, 양도차익이 큰 주택을 중과 유예 기간에 팔면 절세 효과가 극대화돼요. 양도차익이 작은 집을 먼저 팔면 절세 효과가 줄어요. 셋째, 최종적으로 1주택이 되면 2년 보유(조정지역 2년 거주) 후 12억원까지 비과세를 받을 수 있어요.
          </p>

          <SpokeStepCards steps={[
            { title: '3주택 → 2주택', desc: '첫 번째 매도로 주택 수 줄이기. 중과 유예 중이면 기본세율 적용', tip: '양도차익 큰 주택 먼저' },
            { title: '2주택 → 1주택', desc: '두 번째 매도. 1주택 비과세 길이 열림', tip: '보유 기간 긴 주택 우선' },
            { title: '1주택 비과세', desc: '2년 보유(+2년 거주) 후 12억까지 비과세', tip: '최종 목표' },
          ]} />

          <FormulaBox lines={[
            { text: '절세 효과 = 양도차익 x (중과세율 - 기본세율) + 장특공제 복원분', numbered: true },
            { text: '// 핵심! 양도차익이 클수록 유예 기간 내 매도의 절세 효과가 큼', numbered: true, comment: true },
            { text: '최종 1주택 비과세(12억) 달성이 가장 큰 절세', numbered: true },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            매도 순서가 중요한 건 알겠는데, 구체적으로 어떤 기준으로 순서를 정해야 하는지 궁금하잖아요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '순서',
        title: '어떤 집을 먼저 팔아야 할까?',
        desc: '매도 우선순위 기준 확인',
        icon: 'check',
      },
    },

    /**
     * ===== S2: 매도 우선순위 =====
     * 시각 요소: SpokeTimeline + SpokeRateBars
     * 전환 스타일: B. 실생활 질문형
     */
    {
      id: 's2',
      number: '02',
      heading: '어떤 집부터 팔아야 절세가 되나요?',
      subtitle: '양도차익 큰 주택, 보유 기간 긴 주택을 먼저 팔아요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            매도 우선순위의 첫 번째 기준은 <strong>양도차익</strong>이에요. 양도차익이 큰 주택일수록 중과 시 세금 증가폭이 크기 때문에, 유예 기간 안에 먼저 파는 게 유리해요. 양도차익이 2억인 집과 8억인 집이 있다면, 8억짜리를 먼저 파는 게 절세 효과가 훨씬 커요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            두 번째 기준은 <strong>보유 기간</strong>이에요. 유예 기간에는 3년 이상 보유한 주택에 장기보유특별공제(연 2%, 최대 30%)가 적용돼요. 10년 보유하면 30%를 공제받을 수 있으니까, 오래 보유한 주택을 유예 기간에 파는 게 유리해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            세 번째 기준은 <strong>최종 1주택 전략</strong>이에요. 마지막에 남길 주택은 2년 보유(+2년 거주) 후 12억원까지 비과세를 받을 수 있는 주택으로 정하는 게 좋아요. 비과세 요건을 충족할 가능성이 높은 실거주 주택을 마지막까지 보유하세요.
          </p>

          <SpokeTimeline events={[
            { month: '1순위', title: '양도차익 가장 큰 주택', desc: '양도차익 8억, 보유 12년 → 유예 기간 내 매도', status: 'current', tag: '먼저' },
            { month: '2순위', title: '양도차익 중간 주택', desc: '양도차익 3억, 보유 7년 → 유예 기간 내 매도', status: 'normal', tag: '다음' },
            { month: '보유', title: '최종 1주택(실거주)', desc: '2년 거주 요건 충족 후 12억 비과세 목표', status: 'normal', tag: '보유' },
          ]} />

          <SpokeRateBars bars={[
            { label: '양도차익 2억: 차이', rate: '약 5,600만원', width: '28%' },
            { label: '양도차익 5억: 차이', rate: '약 2.17억원', width: '54%' },
            { label: '양도차익 8억: 차이', rate: '약 3.56억원', width: '89%' },
            { label: '양도차익 10억: 차이', rate: '약 4.02억원', width: '100%' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            양도차익 8억짜리를 유예 기간에 파느냐 마느냐로 3.5억원 이상 차이가 나니까, 매도 순서가 곧 돈이에요. 이제 시기별로 어떤 전략을 쓸 수 있는지도 살펴볼까요?
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '시기별',
        title: '유예 종료 전후 전략은?',
        desc: '시기별 매도 전략 확인',
        icon: 'clock',
      },
    },

    /**
     * ===== S3: 시기별 전략 =====
     * 시각 요소: SpokeTable + SpokeCompareCards
     * 전환 스타일: C. 간결 연결형
     */
    {
      id: 's3',
      number: '03',
      heading: '매도 시기별 전략은 뭔가요?',
      subtitle: '유예 종료 전, 직전, 종료 후 세 단계로 나눠서 대비해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            매도 전략은 시기에 따라 달라져요. 유예 종료 3개월 전(~2월), 종료 직전(3~5월), 종료 후(5월 10일~) 세 구간으로 나누면 각각 다른 접근이 필요해요. 지금(2026년 2월)은 아직 여유가 있지만, 매수자 찾기와 잔금 일정을 고려하면 지금부터 움직여야 해요.
          </p>

          <SpokeTable id="timing-strategy" title="매도 시기별 전략" subtitle="2026년 기준" headers={['시기', '상황', '전략']} rows={[
            ['~2026.2', '유예 종료 3개월+ 전', '양도차익 큰 주택 매물 등록, 매수자 탐색'],
            ['2026.3~4', '유예 종료 직전', '잔금일 5월 초 이전 확정, 계약 체결'],
            ['2026.5.1~5.9', '유예 마지막 주', '잔금 수령 완료, 등기 이전 확인'],
            ['2026.5.10~', '유예 종료 후', '비조정지역 주택 양도, 증여 전환 검토'],
          ]} />

          <SpokeCompareCards
            cards={[
              { title: '유예 종료 전(~5.9)', subtitle: '', items: ['양도차익 큰 주택 우선 매도', '기본세율 6~45% 적용', '장특공제 최대 30% 적용', '잔금일 반드시 5.9 이전'] },
              { title: '유예 종료 후(5.10~)', subtitle: '', items: ['비조정지역 주택은 기본세율', '조정지역은 증여 전환 검토', '부담부증여도 중과 적용 주의', '1주택 비과세 요건 달성 우선'] }
            ]}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            유예 종료 후에도 비조정대상지역 주택은 기본세율이 적용돼요. 조정지역 주택만 중과 대상이니까, 남길 주택과 팔 주택을 지역 기준으로도 구분해야 해요.
          </p>

          <p className="text-neutral-600 mb-4 leading-relaxed">
            전략을 세웠으면 빠뜨리는 게 없도록 체크리스트로 정리해 볼게요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '체크리스트',
        title: '매도 전 체크할 것은?',
        desc: '절세 체크리스트 확인',
        icon: 'check',
      },
    },

    /**
     * ===== S4: 체크리스트 =====
     * 시각 요소: SpokeChecklist + TipBox
     * 전환 스타일: 없음 (마지막)
     */
    {
      id: 's4',
      number: '04',
      heading: '절세를 위한 체크리스트는 뭔가요?',
      subtitle: '매도 전에 반드시 확인해야 할 항목을 정리했어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            매도 순서와 시기를 정했다면, 실행 전에 체크해야 할 항목이 있어요. 세무사 상담, 잔금일 관리, 비과세 요건 확인, 대체주택 특례 등을 빠뜨리면 계획한 절세 효과를 못 받을 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            특히 일시적 2주택 특례(이사 목적 3년 이내 처분), 상속주택 특례(상속 후 5년 이내), 혼인합가 특례(혼인일부터 5년 이내) 등 중과 예외 사유에 해당하는지도 꼭 확인하세요. 해당하면 중과 유예와 관계없이 기본세율이 적용될 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            양도세 신고는 양도일이 속하는 달의 말일부터 2개월 이내예요. 5월 매도분은 7월 말까지 신고해야 해요. 기한을 넘기면 무신고가산세(20%) + 납부불성실가산세가 부과되니 주의하세요.
          </p>

          <SpokeChecklist items={[
            { text: '보유 주택별 양도차익 추정 완료', done: false, note: '매도 우선순위 결정' },
            { text: '각 주택의 조정대상지역 여부 확인', done: false, note: '중과 대상 판단' },
            { text: '장기보유특별공제 적용 가능 여부 확인', done: false, note: '보유 기간 3년+' },
            { text: '일시적 2주택·상속주택 등 중과 예외 해당 여부', done: false, note: '예외 시 유예 무관' },
            { text: '잔금일 2026.5.9 이전으로 계약서 작성', done: false, note: '핵심!' },
            { text: '매수자 대출 실행일 확인(잔금일 지연 방지)', done: false, note: '대출 승인 소요 시간' },
            { text: '최종 1주택 비과세 요건(2년 보유+거주) 확인', done: false, note: '장기 전략' },
            { text: '세무사 상담으로 예상 세액 계산 완료', done: false, note: '전문가 검증' },
          ]} />

          <TipBox title="세무사 상담이 필수인 이유">
            <p className="mb-0 leading-relaxed">
              주택 수 계산(분양권·입주권·오피스텔 포함), 중과 예외 사유 적용, 장특공제 계산, 필요경비 인정 범위 등은 개인이 판단하기 어려운 부분이 많아요. 매도 금액이 수억원 단위라면 세무사 상담 비용(20~50만원)은 절세 효과에 비하면 매우 작은 투자예요. <a href="https://www.hometax.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">홈택스</a>에서 양도세 모의계산도 해볼 수 있어요.
            </p>
          </TipBox>

          <p className="text-neutral-600 mb-4 leading-relaxed">
            매도 순서 전략의 핵심은 '양도차익 큰 주택을 유예 기간 안에 먼저 파는 것'이에요. 증여와 양도 중 어느 쪽이 유리한지도 비교하고 싶다면 <Link href="/w/다주택-증여-양도-비교-부담부증여" className="text-blue-600 hover:underline">증여 vs 양도 비교</Link>를 참고하세요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '/w/다주택양도세-중과유예-세율-절세-전략',
        badge: '전체 가이드',
        title: '다주택 양도세 절세 전략 전체 보기',
        desc: '유예 기간 활용법과 전체 전략 확인하기',
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
      question: '1주택이 되면 바로 비과세를 받을 수 있나요?',
      answer: '아니에요. 1주택이 된 후에도 <strong>2년 이상 보유</strong>(조정대상지역 취득 시 2년 거주 추가)해야 비과세 요건이 충족돼요. 비과세 한도는 양도가액 12억원이고, 초과분에 대해서는 세금이 부과돼요.',
    },
    {
      question: '양도차익이 비슷한 주택이 여러 채면 어떤 걸 먼저 파나요?',
      answer: '양도차익이 비슷하면 <strong>보유 기간이 긴 주택</strong>을 먼저 파는 게 유리해요. 장기보유특별공제를 더 많이 받을 수 있기 때문이에요. 보유 기간도 비슷하면 조정대상지역 주택을 먼저 파서 중과 리스크를 줄이세요.',
    },
  ],

  relatedSpokes: [
    { badge: '계산', title: '다주택 양도세 중과 전후 세액 비교', desc: '실제 사례로 세금 차이 확인', href: '/w/다주택-양도세-중과-전후-세액-비교' },
    { badge: '시기', title: '양도세 잔금일 기준 계약일 판단', desc: '잔금일과 계약일 중 뭐가 기준인지 확인', href: '/w/양도세-잔금일-기준-계약일-판단' },
    { badge: '증여', title: '다주택 증여 양도 비교 부담부증여', desc: '증여와 양도 중 뭐가 유리한지 비교', href: '/w/다주택-증여-양도-비교-부담부증여' },
    { badge: '전망', title: '중과 유예 종료 부동산 시장 전망', desc: '유예 종료 후 시장 영향과 대응 전략', href: '/w/중과-유예-종료-부동산-시장-전망' },
  ],

  sources: [
    { name: '소득세법 제104조(세율)', url: 'https://law.go.kr/법령/소득세법/제104조', org: '국가법령정보센터' },
    { name: '소득세법 시행령 제167조의3', url: 'https://law.go.kr/법령/소득세법시행령/제167조의3', org: '국가법령정보센터' },
    { name: '양도소득세 모의계산', url: 'https://www.hometax.go.kr', org: '국세청 홈택스' },
    { name: '양도소득세 기본정보', url: 'https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2312&cntntsId=7711', org: '국세청' },
  ],
}

export default data
