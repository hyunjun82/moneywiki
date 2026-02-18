import Link from 'next/link'
import type { SpokeData } from './types'
import {
  SpokeCompareCards,
  SpokeChecklist,
  TipBox,
  WarnBox,
  SpokeWarnBox,
  SpokeFlow,
} from '@/components/spoke/SpokeBlocks'
import ShinSaengaTeukreyeChecker from '@/components/checkers/ShinSaengaTeukreyeChecker'

const data: SpokeData = {
  slug: '신생아-특례대출-신청-조건',

  meta: {
    title: '신생아 특례대출 신청 조건 | 소득 기준 자산 기준',
    description:
      '2023년 1월 1일 이후 출생아가 있다면 최저 1.80% 금리로 집을 살 수 있다는 거 아시나요? 소득 기준, 자산 기준, 출산 날짜 기준을 한눈에 정리했어요.',
    keywords: [
      '신생아 특례대출 신청 조건',
      '신생아 특례대출 소득 기준',
      '신생아 특례대출 자산 기준',
      '신생아 특례대출 출산 날짜',
    ],
    ogTitle: '신생아 특례대출 신청 조건 소득 기준 자산 기준 | 머니위키',
    ogDescription: '출산 2년 이내, 소득 1.3억 이하, 순자산 5.11억 이하 — 3가지 조건 정리',
  },

  hub: {
    url: '/w/신생아-특례대출-전체-가이드',
    name: '신생아 특례대출 전체 가이드',
  },

  breadcrumb: ['부동산', '신생아 특례대출 신청 조건'],

  summary3: [
    <>2023년 1월 1일 이후 출생아이고 대출 접수일 기준 2년 이내 출산이어야 해요</>,
    <>부부합산 연소득 1.3억원 이하(맞벌이 2억원), 순자산 구입자금 5.11억원·전세자금 3.45억원 이하가 기준이에요</>,
    <>구입자금(디딤돌)과 전세자금(버팀목) 두 상품의 자산 기준과 한도가 달라요</>,
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
        신생아 특례대출 <span className="text-[#059669]">신청 조건</span> — 소득 기준 자산 기준 출산 날짜
      </>
    ),
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          아기가 태어났는데 집을 살 계획이 있다면, 일반 대출보다 훨씬 낮은 금리로 돈을 빌릴 수
          있어요. <strong>신생아 특례대출</strong>은 2023년 1월 1일 이후 출생아가 있는 무주택 가구에
          주택 구입 자금이나 전세 자금을 시중 금리보다 낮게 지원하는 정책 대출이에요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          구입자금 최저 1.80%, 전세자금 최저 1.30% 수준이라 일반 주택담보대출(연 3~4%대)과
          비교하면 이자 부담이 크게 줄어요. 소득·자산 기준과 출산 날짜 기준만 맞으면 신청할 수 있어요.
          아래에서 내 상황이 해당되는지 먼저 확인해 보세요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '구입자금·전세자금 비교, 금리, 신청 방법까지 이 글 하나로 정리돼요',
    },
    quickAnswer: {
      title: '신생아 특례대출 신청 조건 요약',
      body: '2023년 1월 1일 이후 출생아가 있는 무주택 세대주로, 부부합산 연소득 1.3억원 이하(맞벌이 2억원), 순자산 5.11억원 이하이면 신청 가능해요.',
      hook: '아래 자격 확인에서 내 상황이 맞는지 10초 만에 체크해 보세요',
    },
  },

  toc: [
    { id: 'checker', text: '신생아 특례대출 자격 확인' },
    { id: 's1', text: '신생아 특례대출 신청 조건은 무엇인가요?' },
    { id: 's2', text: '신생아 특례대출 소득 기준은 얼마인가요?' },
    { id: 's3', text: '신생아 특례대출 자산 기준은 어떻게 되나요?' },
    { id: 's4', text: '신생아 특례대출 출산 날짜 기준은 언제인가요?' },
    { id: 's-faq', text: '자주 묻는 질문' },
  ],

  sections: [
    {
      id: 'checker',
      number: 'CHECK',
      heading: '신생아 특례대출 자격 확인',
      subtitle: '3가지 조건을 선택하면 신청 가능 여부가 바로 나와요',
      content: <ShinSaengaTeukreyeChecker />,
    },

    {
      id: 's1',
      number: '01',
      heading: '신생아 특례대출 신청 조건은 무엇인가요?',
      subtitle: '출산·주택·소득·자산, 이 4가지가 핵심이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            신생아 특례대출은 크게 <strong>신생아 특례 디딤돌대출(구입자금)</strong>과{' '}
            <strong>신생아 특례 버팀목전세대출(전세자금)</strong> 두 가지예요. 두 상품 모두
            2023년 1월 1일 이후 출생아가 있어야 하고, 대출 접수일 기준 2년 이내 출산이어야 해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            가장 큰 차이는 집을 사는지 전세로 들어가는지예요. 구입자금 대출은 무주택 세대주가
            집을 살 때, 전세자금 대출은 전세를 구할 때 써요. 자산 기준과 한도도 조금 달라요.
          </p>

          <SpokeCompareCards
            cards={[
              {
                title: '구입자금 (디딤돌)',
                subtitle: '집을 살 때',
                items: [
                  '무주택 세대주',
                  '주택가액 9억원 이하',
                  '전용면적 85㎡ 이하 (지방 100㎡)',
                  '순자산 5.11억원 이하',
                  '소득 1.3억원 이하 (맞벌이 2억원)',
                  '한도 최대 4억원',
                ],
                recommended: false,
              },
              {
                title: '전세자금 (버팀목)',
                subtitle: '전세로 들어갈 때',
                items: [
                  '무주택 세대주',
                  '보증금 수도권 5억·지방 4억 이하',
                  '전용면적 85㎡ 이하',
                  '순자산 3.45억원 이하',
                  '소득 1.3억원 이하 (맞벌이 2억원)',
                  '한도 최대 2.4억원',
                ],
                recommended: false,
              },
            ]}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            두 상품 모두 출산 조건은 동일해요. 대출 접수일 기준으로 2년 이내에 아이가 태어났거나
            입양했어야 해요. 2022년 12월 31일 이전에 태어난 아이는 해당되지 않아요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            소득 기준이 얼마인지, 어떻게 계산하는지 자세히 알고 싶잖아요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '소득 기준',
        title: '소득이 얼마까지 가능한가요?',
        desc: '홑벌이·맞벌이 소득 기준 확인하기',
        icon: 'calc',
      },
    },

    {
      id: 's2',
      number: '02',
      heading: '신생아 특례대출 소득 기준은 얼마인가요?',
      subtitle: '홑벌이 1.3억, 맞벌이 2억원까지 신청할 수 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            소득 기준은 <strong>부부합산 연소득</strong>으로 계산해요. 한 명만 일하는 홑벌이는
            1억 3천만원 이하, 부부 모두 소득이 있는 맞벌이는 합산 2억원 이하까지 신청 가능해요.
            이 기준은 구입자금과 전세자금 대출 모두 동일해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            소득이 낮을수록 적용받는 금리도 낮아져요. 구입자금 기준으로 연소득 2천만원 이하면
            최저 1.80%, 맞벌이 1.7억~2억원 구간이면 4.20% 수준이에요. 소득 구간별 금리는{' '}
            <Link href="/w/신생아-특례대출-금리-소득별-구간" className="text-blue-600 hover:underline">
              신생아 특례대출 금리 소득별 구간
            </Link>에서 자세히 확인할 수 있어요.
          </p>

          <TipBox title="맞벌이 판단 기준">
            <p className="mb-0 leading-relaxed">
              두 분 모두 소득이 있으면 맞벌이로 분류돼요. 근로소득, 사업소득, 연금소득 등이 있는
              경우 모두 포함이에요. 배우자가 육아휴직 중이어도 급여가 나온다면 맞벌이로 봐요.
              소득 확인은 전년도 근로소득원천징수영수증이나 소득확인증명서로 해요.
            </p>
          </TipBox>

          <p className="text-neutral-600 mb-4 leading-relaxed">
            신청 시점 기준 소득으로 계산해요. 올해 연봉이 올랐거나 부업 소득이 생겼다면 예상
            연소득 기준으로 심사받아요. 소득 계산이 애매하면 수탁은행 상담을 먼저 받아보는 게 좋아요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            그런데 자산 기준도 소득 기준 못지않게 중요한데, 두 상품이 기준이 달라요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '자산 기준',
        title: '자산이 얼마까지 가능한가요?',
        desc: '구입자금·전세자금 자산 기준 비교하기',
        icon: 'info',
      },
    },

    {
      id: 's3',
      number: '03',
      heading: '신생아 특례대출 자산 기준은 어떻게 되나요?',
      subtitle: '구입자금 5.11억원, 전세자금 3.45억원 이하예요 (2026년 기준)',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            자산 기준은 <strong>부부 합산 순자산액</strong>으로 계산해요. 순자산은 보유한 모든 자산에서
            부채를 뺀 금액이에요. 2026년 기준으로 구입자금 대출은 5.11억원 이하, 전세자금 대출은
            3.45억원 이하여야 해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            자산을 산정할 때 토지와 건물(공시가격 기준), 금융자산(예금·주식·보험 해약환급금),
            자동차(차량가액)가 모두 포함돼요. 현재 살고 있는 집의 공시가격도 포함되기 때문에,
            주거용 부동산이 있으면 순자산이 기준을 넘을 수 있어요.
          </p>

          <SpokeChecklist
            items={[
              { text: '부동산 자산 포함 (공시가격 기준)', done: false, note: '토지, 건물 모두 포함' },
              { text: '금융자산 포함', done: false, note: '예금, 주식, 보험 해약환급금 등' },
              { text: '자동차 포함', done: false, note: '한국감정원 차량가액 기준' },
              { text: '사업용 자산 제외', done: false, note: '사업장, 재고자산 등은 제외됨' },
              { text: '부채 차감 후 순자산 계산', done: false, note: '모든 부채를 뺀 순자산 기준' },
            ]}
          />

          <SpokeWarnBox title="구입자금 신청 시 주의사항">
            <p className="mb-0 leading-relaxed">
              현재 1주택을 보유하고 있다면 신규 구입 목적으로는 신청이 안 돼요. 기존 주택담보대출을
              신생아 특례 조건으로 바꾸는 <strong>대환대출</strong>만 신청 가능해요. 대환대출도
              동일하게 순자산 5.11억원 이하 기준이 적용돼요.
            </p>
          </SpokeWarnBox>

          <p className="text-neutral-600 mb-4 leading-relaxed">
            자산 심사는 건강보험료 납부 내역과 금융 정보를 기반으로 해요. 애매한 경우 한국주택금융공사
            자산심사 상담(1551-3119)을 먼저 받아보는 게 좋아요. 자산 기준을 알았으니, 출산 날짜
            기준도 함께 확인해 볼게요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '출산 기준',
        title: '출산 날짜 기준이 어떻게 되나요?',
        desc: '2023년 1월 1일 기준과 2년 이내 조건 확인하기',
        icon: 'clock',
      },
    },

    {
      id: 's4',
      number: '04',
      heading: '신생아 특례대출 출산 날짜 기준은 언제인가요?',
      subtitle: '2023년 1월 1일 이후 출생아, 대출 접수일 기준 2년 이내예요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            출산 날짜 기준은 두 가지를 동시에 충족해야 해요. 첫째, 아이가{' '}
            <strong>2023년 1월 1일 이후</strong> 태어났어야 해요. 이 날짜 이전 출생아는 신생아
            특례대출 대상이 아니에요. 둘째, <strong>대출 접수일 기준으로 2년 이내</strong>에
            출산(또는 입양)이 있어야 해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            예를 들어, 2024년 5월에 아이가 태어났다면 2026년 5월까지 대출을 신청해야 해요.
            2026년 6월에 신청하면 2년이 지나서 해당이 안 돼요. 신청 계획이 있다면 출산 날짜로부터
            2년이 되는 시점을 미리 달력에 표시해 두는 게 좋아요.
          </p>

          <SpokeFlow
            steps={[
              { icon: '1', label: '2023.1.1 이후 출산', sub: '기준일 이후 출생아만 해당' },
              { icon: '2', label: '대출 접수일 기준 2년 이내', sub: '출산일부터 2년 안에 신청' },
              { icon: '3', label: '신청 후 대출 실행', sub: '수탁은행·기금e든든 통해' },
              { icon: '4', label: '추가 출산 시 특례 연장', sub: '5년씩 최대 15년까지' },
            ]}
          />

          <TipBox title="추가 출산 시 특례금리 연장">
            <p className="mb-0 leading-relaxed">
              대출을 받은 뒤에 아이가 한 명 더 태어나면, 특례금리 적용 기간이 5년 더 연장돼요.
              기본 5년에 추가 출산마다 5년씩, 최대 15년까지 특례금리를 유지할 수 있어요.
              입양의 경우도 출산과 동일하게 인정돼요.
            </p>
          </TipBox>

          <p className="text-neutral-600 mb-4 leading-relaxed">
            조건을 다 확인했으면 이제 실제로 어떻게 신청하는지 절차를 보는 게 좋아요.{' '}
            <Link href="/w/신생아-특례대출-신청-방법-서류" className="text-blue-600 hover:underline">
              신생아 특례대출 신청 방법과 서류
            </Link>에서 온라인 신청 절차와 필요 서류를 확인할 수 있어요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '/w/신생아-특례대출-전체-가이드',
        badge: '전체 가이드',
        title: '구입자금·전세자금 비교, 금리, 신청 방법 한번에',
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
      question: '신생아 특례대출 신청 조건에서 소득이 1.3억원을 살짝 넘어요. 방법이 없나요?',
      answer:
        '맞벌이 가구라면 부부합산 2억원 이하까지 신청 가능해요. 배우자에게도 소득이 있다면 맞벌이로 분류돼서 기준이 올라가요. 단독 세대주로 소득이 1.3억원을 초과하면 신생아 특례대출은 어렵고, 일반 디딤돌대출이나 시중 은행 주택담보대출을 알아보셔야 해요.',
    },
    {
      question: '신생아 특례대출 신청 조건으로 자산을 어디서 확인하나요?',
      answer:
        '자산 확인은 금융정보조회와 건강보험료 납부 내역을 기반으로 해요. 신청 전에 내 순자산이 대략 얼마인지 계산해 보고 싶다면 한국주택금융공사(1551-3119) 또는 수탁은행 상담을 먼저 받아보는 게 좋아요. 자산 기준 초과로 탈락하는 경우도 있어서 미리 확인하는 게 중요해요.',
    },
  ],

  relatedSpokes: [
    {
      badge: '금리',
      title: '신생아 특례대출 금리 소득별 구간',
      desc: '소득에 따라 달라지는 금리 구간과 특례 적용 기간 확인하기',
      href: '/w/신생아-특례대출-금리-소득별-구간',
    },
    {
      badge: '신청',
      title: '신생아 특례대출 신청 방법과 서류 준비',
      desc: '온라인·은행 방문 신청 절차와 필요 서류 목록',
      href: '/w/신생아-특례대출-신청-방법-서류',
    },
  ],

  sources: [
    {
      name: '신생아 특례 디딤돌대출 안내',
      url: 'https://www.myhome.go.kr/hws/portal/cont/selectBabySpecialCaseStepStoneLoneView.do',
      org: 'MY HOME (국토교통부)',
    },
    {
      name: '신생아 특례 버팀목전세대출 안내',
      url: 'https://www.myhome.go.kr/hws/portal/cont/selectBabySpecialCaseCrutchLoneView.do',
      org: 'MY HOME (국토교통부)',
    },
    {
      name: '주택도시기금 신생아 특례대출',
      url: 'https://nhuf.molit.go.kr/FP/FP05/FP0503/FP05030801.jsp',
      org: '주택도시기금',
    },
  ],

  stickyBar: {
    topLabel: '신생아 특례 최저',
    value: '1.80% 금리',
    buttonText: '자격 확인하기',
    scrollTo: 'checker',
  },
}

export default data
