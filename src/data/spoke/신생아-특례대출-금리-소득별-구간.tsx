import Link from 'next/link'
import type { SpokeData } from './types'
import {
  SpokeCompareCards,
  SpokeTable,
  TipBox,
  RateCards,
  SpokeFlow,
} from '@/components/spoke/SpokeBlocks'

// 구입자금 소득별 금리표 (출처: myhome.go.kr, 2026.02 기준)
const RATE_TABLE_ROWS = [
  ['2천만원 이하', '1.80%', '1.90%', '2.00%', '2.05%'],
  ['2천~4천만원', '2.15%', '2.25%', '2.35%', '2.40%'],
  ['4천~6천만원', '2.40%', '2.50%', '2.60%', '2.65%'],
  ['6천~8.5천만원', '2.65%', '2.75%', '2.85%', '2.90%'],
  ['8.5천만~1억원', '2.90%', '3.00%', '3.10%', '3.20%'],
  ['1억~1.3억원', '3.20%', '3.30%', '3.40%', '3.50%'],
  ['1.3억~1.5억원(맞벌이)', '3.50%', '3.60%', '3.70%', '3.80%'],
  ['1.5억~1.7억원(맞벌이)', '3.85%', '3.95%', '4.05%', '4.15%'],
  ['1.7억~2억원(맞벌이)', '4.20%', '4.30%', '4.40%', '4.50%'],
]

const data: SpokeData = {
  slug: '신생아-특례대출-금리-소득별-구간',

  meta: {
    title: '신생아 특례대출 금리 | 소득 구간별 이자율 계산',
    description:
      '신생아 특례대출 금리가 소득에 따라 1.80%부터 4.50%까지 달라진다는 거 아시나요? 소득 구간별 이자율 표와 특례금리 적용 기간을 정리했어요.',
    keywords: [
      '신생아 특례대출 금리',
      '신생아 특례대출 소득 구간별 이자율',
      '신생아 특례 디딤돌대출 금리',
      '신생아 특례 버팀목전세대출 금리',
    ],
    ogTitle: '신생아 특례대출 금리 소득 구간별 이자율 | 머니위키',
    ogDescription: '소득 2천만원 이하 1.80%, 맞벌이 2억원 4.50% — 소득별 전체 금리표',
  },

  hub: {
    url: '/w/신생아-특례대출-전체-가이드',
    name: '신생아 특례대출 전체 가이드',
  },

  breadcrumb: ['부동산', '신생아 특례대출 금리'],

  summary3: [
    <>구입자금 금리는 소득 2천만원 이하 1.80%부터 맞벌이 2억원 4.50%까지 구간별로 달라요</>,
    <>전세자금 금리는 소득과 보증금 규모에 따라 1.30%~4.30% 범위에서 결정돼요</>,
    <>특례금리 기본 5년, 추가 출산 시 5년씩 연장해 최대 15년까지 적용돼요</>,
  ],

  sourceBar: {
    badge: '공식 출처',
    name: '주택도시기금 신생아 특례대출',
    date: '2026-02',
  },

  hero: {
    badge: '2026년 기준',
    h1: (
      <>
        신생아 특례대출 <span className="text-[#059669]">금리</span> — 소득 구간별 이자율 계산
      </>
    ),
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          신생아 특례대출은 소득에 따라 금리가 다르게 적용돼요. 연소득 2천만원 이하 가구는 최저
          1.80%를 받을 수 있고, 맞벌이 상위 구간은 4.50%까지 올라가요. 일반 주택담보대출이
          연 3~4%대인 것과 비교하면 소득이 낮은 가구일수록 혜택이 커요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          구입자금(디딤돌)과 전세자금(버팀목) 두 상품의 금리 체계가 다르고, 대출 기간(10년~30년)에
          따라서도 금리가 달라져요. 내 소득 구간에 해당하는 금리가 얼마인지 아래 표에서 바로 확인해 보세요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '신청 조건, 서류 준비, 신청 방법까지 이 글 하나로 정리돼요',
    },
    quickAnswer: {
      title: '신생아 특례대출 금리 요약',
      body: '구입자금 1.80%~4.50%, 전세자금 1.30%~4.30%예요. 소득이 낮을수록 금리가 낮아지고, 특례금리는 기본 5년 적용돼요.',
      hook: '아래 표에서 내 소득 구간 금리를 바로 확인해 보세요',
    },
  },

  toc: [
    { id: 'checker', text: '신생아 특례대출 금리 요약' },
    { id: 's1', text: '신생아 특례대출 금리는 몇 %인가요?' },
    { id: 's2', text: '소득별로 금리가 어떻게 다른가요?' },
    { id: 's3', text: '신생아 특례 구입자금 금리와 전세자금 금리가 다른가요?' },
    { id: 's4', text: '특례금리는 얼마나 오래 적용되나요?' },
    { id: 's-faq', text: '자주 묻는 질문' },
  ],

  sections: [
    {
      id: 'checker',
      number: 'CHECK',
      heading: '신생아 특례대출 금리 요약',
      subtitle: '소득 구간별 핵심 금리를 먼저 확인하세요',
      content: (
        <RateCards
          cards={[
            {
              label: '소득 2천만원 이하',
              value: '1.80%',
              lines: ['10년 기준 구입자금 최저 금리', '30년 기준 2.05%'],
              active: true,
              highlightColor: 'navy',
            },
            {
              label: '소득 6천~8.5천만원',
              value: '2.65%',
              lines: ['중간 소득 구간 기준', '30년 기준 2.90%'],
            },
            {
              label: '맞벌이 1.7억~2억원',
              value: '4.20%',
              lines: ['맞벌이 최고 소득 구간', '30년 기준 4.50%'],
            },
          ]}
        />
      ),
    },

    {
      id: 's1',
      number: '01',
      heading: '신생아 특례대출 금리는 몇 %인가요?',
      subtitle: '구입자금 1.80%~4.50%, 전세자금 1.30%~4.30% 범위예요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            신생아 특례대출 금리는 하나로 정해진 게 아니에요. 소득 수준, 대출 기간, 구입자금인지
            전세자금인지에 따라 달라져요. 구입자금(디딤돌)은 연 1.80%~4.50%, 전세자금(버팀목)은
            연 1.30%~4.30% 범위에서 적용돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            모두 고정금리예요. 대출 실행 시점에 금리가 확정되고 만기까지 바뀌지 않아요. 단,
            특례금리 적용 기간이 끝나면 그 시점의 일반 금리로 전환돼요. 5년 특례 기간 동안은
            낮은 금리를 그대로 유지할 수 있어요.
          </p>

          <TipBox title="지방 주택은 0.2%p 추가 인하">
            <p className="mb-0 leading-relaxed">
              수도권이 아닌 지방 소재 주택을 구입할 경우, 위 금리에서{' '}
              <strong>0.2%p 추가 인하</strong>가 적용돼요. 예를 들어 소득 2천만원 이하이고 지방
              주택이면 10년 기준 1.60%까지 낮아질 수 있어요.
            </p>
          </TipBox>

          <p className="text-neutral-600 mb-4 leading-relaxed">
            금리는 소득 구간에 따라 세부적으로 나뉘는데, 구간이 꽤 촘촘해요. 한 구간 차이로
            금리가 0.2~0.35%p씩 달라지기 때문에 내 소득이 정확히 어느 구간인지 알아두면 좋아요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '금리표',
        title: '내 소득 구간 금리가 얼마인지 보고 싶어요',
        desc: '소득 구간별 전체 금리표 확인하기',
        icon: 'calc',
      },
    },

    {
      id: 's2',
      number: '02',
      heading: '소득별로 금리가 어떻게 다른가요?',
      subtitle: '9개 소득 구간마다 금리가 달라요 (2026년 기준)',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            아래 표는 2026년 기준 신생아 특례 디딤돌대출(구입자금) 소득 구간별 금리예요.
            부부합산 연소득과 대출 기간(10년/15년/20년/30년)을 교차해서 내 금리를 찾을 수 있어요.
            출처는{' '}
            <a
              href="https://www.myhome.go.kr/hws/portal/cont/selectBabySpecialCaseStepStoneLoneView.do"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              주택도시기금 MY HOME
            </a>
            이에요.
          </p>

          <SpokeTable
            id="rate-table"
            title="신생아 특례 디딤돌대출 소득 구간별 금리표"
            subtitle="2026년 기준, 고정금리 (지방 주택은 0.2%p 추가 인하)"
            headers={['부부합산 연소득', '10년', '15년', '20년', '30년']}
            rows={RATE_TABLE_ROWS}
            highlightCol={1}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            소득이 낮을수록 금리가 낮아요. 소득 2천만원 이하이고 10년 기준이면 1.80%지만,
            맞벌이 1.7억~2억원 구간에서 30년 기준이면 4.50%까지 올라가요. 같은 소득 구간이라도
            대출 기간이 길수록 금리가 소폭 높아져요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            전세자금(버팀목) 금리는 소득과 보증금 규모에 따라 1.30%~4.30% 범위에서 적용돼요.
            구입자금과 전세자금, 두 상품 금리가 어떻게 다른지 비교해 볼게요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '비교',
        title: '구입자금 vs 전세자금 금리가 얼마나 다른가요?',
        desc: '두 상품 금리 체계 비교하기',
        icon: 'grid',
      },
    },

    {
      id: 's3',
      number: '03',
      heading: '신생아 특례 구입자금 금리와 전세자금 금리가 다른가요?',
      subtitle: '전세자금 금리가 더 낮지만 보증금 규모에 따라 달라져요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            구입자금(디딤돌)과 전세자금(버팀목)은 금리 체계가 달라요. 구입자금은 소득 구간만
            보는 반면, 전세자금은 소득과 보증금 규모를 교차해서 금리를 결정해요. 보증금이
            작을수록 더 낮은 금리를 받아요.
          </p>

          <SpokeCompareCards
            cards={[
              {
                title: '구입자금 (디딤돌)',
                subtitle: '소득 구간으로만 결정',
                items: [
                  '금리 범위: 1.80%~4.50%',
                  '소득 구간 9단계로 분류',
                  '대출 기간에 따라 소폭 조정',
                  '지방 주택 0.2%p 추가 인하',
                  '한도 최대 4억원',
                ],
                recommended: false,
              },
              {
                title: '전세자금 (버팀목)',
                subtitle: '소득 + 보증금 규모로 결정',
                items: [
                  '금리 범위: 1.30%~4.30%',
                  '소득 × 보증금 조합으로 결정',
                  '보증금이 낮을수록 금리 낮음',
                  '기본 특례 기간 4년',
                  '한도 최대 2.4억원',
                ],
                recommended: false,
              },
            ]}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            전세자금 최저 금리는 1.30%로 구입자금(1.80%)보다 낮아요. 하지만 소득이 높고 보증금이
            크면 4.30%까지 올라가요. 보증금이 5천만원 이하인 저가 전세라면 소득이 낮을 경우
            매우 낮은 금리를 받을 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            이 낮은 금리가 언제까지 유지되는지도 중요한데, 특례금리 기간이 정해져 있어요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '기간',
        title: '특례금리는 얼마나 오래 유지되나요?',
        desc: '5년 기본 기간과 연장 조건 확인하기',
        icon: 'clock',
      },
    },

    {
      id: 's4',
      number: '04',
      heading: '특례금리는 얼마나 오래 적용되나요?',
      subtitle: '기본 5년, 추가 출산 시 5년씩 최대 15년까지예요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            신생아 특례 금리는 처음부터 만기까지 적용되는 게 아니에요. 대출 실행 후{' '}
            <strong>기본 5년 동안만 특례금리</strong>가 적용돼요. 5년이 지나면 그 시점의 일반
            대출 금리(시중 금리 기준)로 전환돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            단, 특례 기간 중에 아이가 한 명 더 태어나면 특례금리 기간이 5년 연장돼요. 추가 출산마다
            5년씩 늘어나서 최대 15년까지 특례금리를 유지할 수 있어요. 전세자금 대출은 기본 특례
            기간이 4년이에요.
          </p>

          <SpokeFlow
            steps={[
              { icon: '1', label: '대출 실행', sub: '특례금리 시작' },
              { icon: '2', label: '기본 5년', sub: '특례금리 적용 (전세: 4년)' },
              { icon: '3', label: '추가 출산', sub: '5년씩 연장' },
              { icon: '4', label: '최대 15년', sub: '특례금리 유지 가능' },
            ]}
          />

          <TipBox title="5년 후 금리 전환 대비법">
            <p className="mb-0 leading-relaxed">
              특례금리 5년이 끝나면 일반 금리로 바뀌어요. 이때 다른 은행으로 대환대출을 받거나
              조기 상환을 고려해 볼 수 있어요. 특례 기간 종료 시점에 맞춰 금리를 비교해 두는 게
              좋아요. <Link href="/w/신생아-특례대출-신청-방법-서류" className="text-blue-600 hover:underline">신청 방법과 서류</Link>도
              함께 준비하면 좋아요.
            </p>
          </TipBox>

          <p className="text-neutral-600 mb-4 leading-relaxed">
            구체적인 금리와 월 상환액이 얼마나 되는지는 수탁은행(우리·신한·KB국민·NH농협·하나은행)
            상담이나{' '}
            <a
              href="https://enhuf.molit.go.kr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              기금e든든 온라인 시뮬레이션
            </a>
            에서 확인할 수 있어요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '/w/신생아-특례대출-전체-가이드',
        badge: '전체 가이드',
        title: '신청 조건, 서류, 신청 방법까지 한번에',
        desc: '신생아 특례대출 전체 가이드 보기',
        icon: 'grid',
        primary: true,
      },
    },

    {
      id: 's-faq',
      number: '05',
      heading: '자주 묻는 질문',
      subtitle: '자주 묻는 질문이에요',
      content: null,
    },
  ],

  faq: [
    {
      question: '신생아 특례대출 금리가 5년 후에 얼마로 오르나요?',
      answer:
        '특례금리 5년이 끝나면 그 시점의 일반 금리(기금 기준 금리 또는 시중 금리)로 전환돼요. 정확한 전환 금리는 미리 알 수 없고 시장 상황에 따라 달라져요. 은행에서 대출 실행 시 전환 금리 기준에 대해 미리 안내받을 수 있으니 계약 전에 확인하는 게 좋아요.',
    },
    {
      question: '신생아 특례대출 금리를 더 낮출 수 있는 우대 조건이 있나요?',
      answer:
        '지방 소재 주택은 0.2%p 추가 인하가 있어요. 전세자금 대출은 전자계약 체결 시 추가 우대금리가 적용될 수 있어요. 수탁은행별로 자체 우대금리 조건이 다를 수 있으니 여러 은행을 비교해 보는 게 좋아요.',
    },
  ],

  relatedSpokes: [
    {
      badge: '신청 조건',
      title: '신생아 특례대출 신청 조건 소득 기준 자산 기준',
      desc: '소득·자산·출산 날짜 기준 상세 확인하기',
      href: '/w/신생아-특례대출-신청-조건',
    },
    {
      badge: '신청 방법',
      title: '신생아 특례대출 신청 방법과 서류 준비',
      desc: '온라인·은행 방문 신청 절차와 필요 서류',
      href: '/w/신생아-특례대출-신청-방법-서류',
    },
  ],

  sources: [
    {
      name: '신생아 특례 디딤돌대출 금리표',
      url: 'https://www.myhome.go.kr/hws/portal/cont/selectBabySpecialCaseStepStoneLoneView.do',
      org: 'MY HOME (국토교통부)',
    },
    {
      name: '신생아 특례 버팀목전세대출 금리',
      url: 'https://www.myhome.go.kr/hws/portal/cont/selectBabySpecialCaseCrutchLoneView.do',
      org: 'MY HOME (국토교통부)',
    },
  ],

  stickyBar: {
    topLabel: '신생아 특례 최저',
    value: '1.80% 금리',
    buttonText: '내 소득 구간 금리 확인',
    scrollTo: 's2',
  },
}

export default data
