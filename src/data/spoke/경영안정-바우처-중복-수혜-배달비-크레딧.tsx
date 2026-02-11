import Link from 'next/link'
import type { SpokeData } from './types'
import { SpokeCompareCards, SpokeTable, SpokeRateBars, FormulaBox, SpokeFlow, SpokeChecklist, SpokeTimeline, TipBox } from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '경영안정-바우처-중복-수혜-배달비-크레딧',

  meta: {
    title: '경영안정바우처 중복 수혜 배달비 크레딧 다른 지원금',
    description: '경영안정바우처와 배달비 크레딧을 동시에 받을 수 있다는 거 아시나요? 중복 수혜 기준과 함께 신청할 수 있는 지원금을 알려드려요',
    keywords: ['경영안정바우처 중복 수혜', '바우처 배달비 크레딧', '소상공인 지원금 중복', '바우처 다른 지원금'],
    ogTitle: '경영안정바우처 중복 수혜 배달비 크레딧 | 머니위키',
    ogDescription: '바우처와 배달비 크레딧 중복 가능 여부, 다른 지원금과의 관계까지 정리',
  },

  hub: {
    url: '/w/경영안정바우처-신청-사용처-금액',
    name: '경영안정바우처 신청 사용처 금액',
  },

  breadcrumb: ['사업', '경영안정바우처 중복 수혜'],

  hero: {
    badge: '2026년 기준',
    h1: <>경영안정바우처 <span className="text-[#1E3A5F]">중복 수혜</span> — 배달비 크레딧과 다른 지원금</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          경영안정바우처를 받으면서 배달비 크레딧이나 다른 소상공인 지원금도 함께 받을 수 있는지 궁금하다면 잘 오셨어요. <strong>별개 사업이면 중복 수혜가 가능</strong>해요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          다만 같은 항목에 이중 지원을 받으면 환수될 수 있으니 기준을 잘 알아둬야 해요. 전체 바우처 정보는 <Link href="/w/경영안정바우처-신청-사용처-금액" className="text-blue-600 hover:underline">경영안정바우처 신청 사용처 금액 총정리</Link>를 참고하세요. 중복 수혜 기준부터 볼게요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '경영안정바우처 신청부터 사용까지 전체 흐름 확인하기',
    },
  },

  toc: [
    { id: 's1', text: '다른 지원금과 중복으로 받을 수 있나요?' },
    { id: 's2', text: '배달비 크레딧과 겹치나요?' },
    { id: 's3', text: '중복 수혜 기준은 뭔가요?' },
    { id: 's4', text: '함께 신청할 수 있는 지원금은 뭔가요?' },
    { id: 's5', text: '자주 묻는 질문' },
  ],

  sections: [
    /**
     * ===== S1: 중복 수혜 가능 여부 =====
     * 패턴: 원칙 설명 → SpokeCompareCards + SpokeTable
     * 전환 스타일: A. 독자 대변형
     */
    {
      id: 's1',
      number: '01',
      heading: '다른 지원금과 중복으로 받을 수 있나요?',
      subtitle: '별개 사업이면 중복 수혜가 가능해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            경영안정바우처는 <strong>다른 소상공인 지원 사업과 별개로 운영</strong>돼요. 각 사업의 요건을 각각 충족하면 중복으로 받을 수 있어요. 예를 들어 경영안정바우처와 배달비 크레딧은 별개 사업이라 둘 다 대상이면 두 가지 모두 받을 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            다만 주의할 점이 있어요. <strong>같은 바우처 사업에서 복수 사업체를 등록해서 두 번 받는 건 안 돼요.</strong> 1인 1개 사업체 원칙이 적용돼요. 사업장이 여러 개여도 경영안정바우처는 1개 사업체에 대해서만 25만원을 받을 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            소상공인 정책자금(대출), 희망리턴패키지, 소상공인 역량 강화 교육 등은 경영안정바우처와 성격이 다른 사업이에요. 이런 사업들은 바우처와 관계없이 별도로 신청할 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            핵심은 '같은 항목에 대한 이중 지원'이 안 된다는 거예요. 예를 들어 바우처로 전기요금을 냈는데, 다른 지원 사업에서도 같은 전기요금에 대해 지원받으면 이중 지원으로 환수될 수 있어요.
          </p>

          <SpokeCompareCards
            cards={[
              { title: '중복 수혜 가능', subtitle: '별개 사업 간 중복', items: ['경영안정바우처 + 배달비 크레딧', '경영안정바우처 + 정책자금 대출', '경영안정바우처 + 역량 강화 교육', '별개 사업이면 가능'], recommended: true, recLabel: '가능' },
              { title: '중복 수혜 불가', subtitle: '동일 사업 이중 신청', items: ['바우처를 2개 사업체에 신청', '같은 항목에 이중 지원', '동일 비용에 다른 사업 중복', '1인 1개 사업체 원칙'] }
            ]}
          />

          <SpokeTable
            id="overlap-rule"
            title="중복 수혜 주요 규정"
            subtitle="별개 사업 여부가 핵심이에요"
            headers={['구분', '중복 가능 여부', '근거']}
            rows={[
              ['배달비 크레딧', '가능', '별개 사업'],
              ['소상공인 정책자금', '가능', '대출 vs 바우처 성격 다름'],
              ['역량 강화 교육', '가능', '교육 vs 바우처 성격 다름'],
              ['바우처 2회 수령', '불가', '1인 1개 사업체 원칙'],
            ]}
            highlightCol={1}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            배달비 크레딧과 겹치는지 구체적으로 알고 싶잖아요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '배달비',
        title: '배달비 크레딧도 같이 받을 수 있을까?',
        desc: '배달비 크레딧과의 관계 확인',
        icon: 'info',
      },
    },

    /**
     * ===== S2: 배달비 크레딧 =====
     * 패턴: 별개 사업 설명 → SpokeRateBars + FormulaBox
     * 전환 스타일: B. 정보 예고형
     */
    {
      id: 's2',
      number: '02',
      heading: '배달비 크레딧과 겹치나요?',
      subtitle: '별개 사업이라 요건만 맞으면 둘 다 받을 수 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            경영안정바우처와 <strong>배달비 지원(배달비 크레딧)</strong>은 완전히 별개의 사업이에요. 경영안정바우처는 공과금·보험료·연료비 지원이고, 배달비 크레딧은 배달 플랫폼 수수료 부담을 줄여주는 거예요. 성격이 다르기 때문에 각각 대상이 되면 모두 받을 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            배달비 크레딧은 배달 앱(배달의민족, 요기요 등)을 이용하는 소상공인이 대상이에요. 경영안정바우처는 업종에 관계없이 매출 기준만 충족하면 돼요. 두 사업의 대상 조건이 다르니 각각 확인해야 해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            2025년 부담경감 크레딧과 비교하면, 이번 경영안정바우처는 사용처가 좀 더 한정적이에요. 부담경감 크레딧에서는 통신비도 됐지만 이번에는 빠졌어요. 대신 지원 금액은 동일하게 25만원이에요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            두 지원금을 합치면 총 수혜 금액이 커질 수 있으니, 대상이 되는 사업이 있다면 꼼꼼히 챙겨서 신청하는 게 유리해요.
          </p>

          <SpokeRateBars
                        bars={[
              { label: '경영안정바우처', rate: '최대 25만원', width: '50%' },
              { label: '배달비 크레딧', rate: '별도 지원', width: '50%' },
              { label: '합산 수혜 가능', rate: '25만원 + a', width: '100%' },
            ]}
          />

          <FormulaBox
                        lines={[
              { text: '경영안정바우처: 25만원 (공과금·주유비 등)', numbered: true },
              { text: '배달비 크레딧: 배달 수수료 지원', numbered: true },
              { text: '소상공인 정책자금: 저리 대출 (별도)', numbered: true },
              { text: '// 별개 사업 원칙: 대상이면 모두 신청 가능', comment: true },
            ]}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            중복 수혜가 된다는 건 알겠는데, 정확한 기준이 뭔지 좀 더 자세히 알아둬야 해요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '기준',
        title: '중복 수혜 기준이 정확히 뭔가요?',
        desc: '이중 지원 금지와 환수 기준',
        icon: 'info',
      },
    },

    /**
     * ===== S3: 중복 수혜 기준 =====
     * 패턴: 기준 상세 → SpokeFlow + SpokeChecklist
     * 전환 스타일: C. 간결 연결형
     */
    {
      id: 's3',
      number: '03',
      heading: '중복 수혜 기준은 뭔가요?',
      subtitle: '같은 항목에 대한 이중 지원만 안 돼요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            중복 수혜의 핵심 기준은 <strong>'동일 항목에 대한 이중 지원 금지'</strong>예요. 예를 들어 경영안정바우처로 전기요금 15만원을 냈는데, 다른 지원 사업에서도 같은 달 같은 전기요금에 대해 지원을 받으면 이중 지원에 해당해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            하지만 경영안정바우처로 전기요금을 내고, 배달비 크레딧으로 배달 수수료를 지원받는 건 항목이 다르기 때문에 문제가 없어요. 지원 사업이 다르고 사용 항목이 다르면 중복 수혜가 가능해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            1인 1개 사업체 원칙도 중요해요. 사업장이 여러 개여도 경영안정바우처는 1개 사업체에만 신청할 수 있어요. 이건 <Link href="/w/경영안정-바우처-공동대표-다수-사업장" className="text-blue-600 hover:underline">공동대표와 다수 사업장 기준</Link>에서 자세히 다뤘어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            부정 사용이나 이중 지원이 적발되면 바우처 금액이 환수되고, 향후 소상공인 지원 사업 참여가 제한될 수 있어요. 모든 지원금은 정해진 용도대로만 사용하는 게 안전해요.
          </p>

          <SpokeFlow
                        steps={[
              { icon: '1', label: '사업별로 구분', sub: '별개 사업인가?' },
              { icon: '2', label: '항목 확인', sub: '같은 비용 항목인가?' },
              { icon: '3', label: '이중 지원 여부', sub: '동일 항목 이중 지원?' },
              { icon: '4', label: '판정', sub: '별개 사업 + 다른 항목 = 가능' },
            ]}
          />

          <SpokeChecklist
                        items={[
              { text: '각 지원금의 사용 항목이 서로 다르다', done: false, note: '항목 중복 시 이중 지원' },
              { text: '경영안정바우처는 1개 사업체만 신청했다', done: false, note: '1인 1개 사업체 원칙' },
              { text: '부정 사용 없이 지정 사용처에서만 쓴다', done: false, note: '부정 사용 시 환수' },
              { text: '각 지원금의 대상 요건을 각각 충족한다', done: false, note: '요건 미충족 시 환수 대상' },
            ]}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            중복 수혜 기준을 확인했으니, 경영안정바우처 외에 함께 챙길 수 있는 지원금도 알아볼게요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '다른 지원금',
        title: '어떤 지원금을 함께 받을 수 있을까?',
        desc: '경영안정바우처와 병행 가능한 지원 사업',
        icon: 'check',
      },
    },

    /**
     * ===== S4: 함께 받을 수 있는 지원금 =====
     * 패턴: 지원금 목록 → SpokeTimeline + TipBox
     * 전환 스타일: 없음 (마지막 섹션)
     */
    {
      id: 's4',
      number: '04',
      heading: '함께 신청할 수 있는 지원금은 뭔가요?',
      subtitle: '소상공인 대상 지원 사업이 여러 가지 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            경영안정바우처 외에도 소상공인이 받을 수 있는 지원 사업이 여러 가지 있어요. 각 사업의 대상 요건이 다르기 때문에 본인에게 해당하는 사업이 뭔지 확인하고 빠짐없이 신청하는 게 유리해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            <a href="https://www.semas.or.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">소상공인시장진흥공단(semas.or.kr)</a>에서 현재 신청 가능한 지원 사업 목록을 확인할 수 있어요. 소상공인24(sbiz24.kr)에서도 통합 검색이 가능해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            정책자금(저리 대출)은 바우처와 성격이 완전히 달라서 중복 제한이 없어요. 디지털 전환 지원, 온라인 판로 지원 등 교육·컨설팅 사업도 바우처와 별개로 참여할 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            각 지원 사업의 신청 기간과 대상이 다르니, 소상공인24에서 수시로 확인하고 기한을 놓치지 않도록 챙기는 게 중요해요.
          </p>

          <SpokeTimeline
            events={[
              { month: '연중', title: '소상공인 정책자금', desc: '저금리 대출, 직접대출·대리대출 방식', status: 'normal', tag: '대출' },
              { month: '연중', title: '배달비 지원(크레딧)', desc: '배달 플랫폼 수수료 지원', status: 'normal', tag: '배달' },
              { month: '2월~', title: '경영안정바우처', desc: '고정비 25만원 바우처 지원', status: 'current', tag: '바우처' },
              { month: '수시', title: '디지털 전환 지원', desc: '온라인 판로·스마트 상점 지원', status: 'normal', tag: '디지털' },
            ]}
          />

          <TipBox title="소상공인24에서 한 번에 확인하세요">
            <p className="mb-0 leading-relaxed">
              <a href="https://sbiz24.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">소상공인24(sbiz24.kr)</a>에 로그인하면 본인이 신청할 수 있는 지원 사업을 <strong>한눈에 확인</strong>할 수 있어요. 경영안정바우처뿐만 아니라 정책자금, 교육, 컨설팅 등 다양한 사업이 통합 제공돼요. 놓치는 혜택 없이 전부 챙기세요.
            </p>
          </TipBox>

          <p className="text-neutral-600 mb-4 leading-relaxed">
            지원금을 최대한 활용하려면 바우처 사용처도 꼼꼼히 확인해야 해요. <Link href="/w/경영안정-바우처-사용처-공과금-주유비" className="text-blue-600 hover:underline">바우처 사용처 공과금 주유비</Link>에서 9가지 항목을 확인해 보세요.
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
      question: '2025년 부담경감 크레딧을 받았는데 경영안정바우처도 받을 수 있나요?',
      answer: '네, 받을 수 있어요. 2025년 부담경감 크레딧과 2026년 경영안정바우처는 별도의 사업이에요. 이번 바우처의 대상 요건을 충족하면 다시 신청해서 25만원을 받을 수 있어요.',
    },
    {
      question: '경영안정바우처와 다른 지원금을 같은 항목에 쓰면 어떻게 되나요?',
      answer: '동일 비용 항목에 대해 이중으로 지원받으면 환수 대상이 될 수 있어요. 예를 들어 같은 달 전기요금에 바우처와 다른 지원금을 동시에 쓰면 문제가 될 수 있어요. 서로 다른 항목에 사용하는 건 문제없어요.',
    },
  ],

  relatedSpokes: [
    { badge: '사용처', title: '바우처 사용처 공과금 주유비', desc: '어디서 어떻게 쓸 수 있는지', href: '/w/경영안정-바우처-사용처-공과금-주유비' },
    { badge: '사업장', title: '공동대표와 다수 사업장 기준', desc: '공동대표, 복수 사업장 수혜 기준', href: '/w/경영안정-바우처-공동대표-다수-사업장' },
    { badge: '대상', title: '경영안정바우처 신청 대상과 매출 기준', desc: '누가 대상이고 매출 기준이 어떻게 되는지', href: '/w/경영안정-바우처-신청-대상-매출-기준' },
    { badge: '지급', title: '바우처 지급 시기와 잔액 확인', desc: '바우처가 언제 들어오고 잔액은 어떻게 보는지', href: '/w/경영안정-바우처-지급-시기-잔액-확인' },
  ],

  sources: [
    { name: '소상공인 경영안정 바우처 지원사업 시행 공고', url: 'https://www.bizinfo.go.kr/sii/siia/selectSIIA200Detail.do?pblancId=PBLN_000000000117908', org: '기업마당(중소벤처기업부)' },
    { name: '영세 소상공인 고정비 부담 완화 보도자료', url: 'https://www.mss.go.kr/site/smba/ex/bbs/View.do?cbIdx=86&bcIdx=1065091', org: '중소벤처기업부' },
    { name: '소상공인시장진흥공단', url: 'https://www.semas.or.kr', org: '소상공인시장진흥공단' },
  ],
}

export default data
