/**
 * ISA계좌 가입 조건 개설 방법 | 필요 서류 증권사 수수료 — 스포크 3
 *
 * 팩트체크 (2026-02-13):
 * - 가입 나이: 만 19세 이상
 * - 1인 1계좌
 * - 비대면 개설: 앱 5분
 * - 서민형 추가 서류: 소득금액증명원 (홈택스)
 */

import type { SpokeData } from '@/data/spoke/types'
import {
  SpokeTable, TipBox, FormulaBox, WarnBox,
  DetailBox, SpokeStepCards, SpokeRateBars,
  SpokeCompareCards, SpokeFlow, SpokeChecklist, SpokeTimeline,
} from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: 'ISA계좌-가입-조건-개설-방법-필요-서류',

  meta: {
    title: 'ISA계좌 가입 조건 개설 방법 | 필요 서류 증권사 수수료',
    description: 'ISA계좌 만들고 싶은데 어디서 어떻게 개설해야 할지 고민이시죠? 가입 조건부터 필요 서류, 증권사별 수수료 비교까지 알려드려요.',
    keywords: [
      'ISA계좌 가입 조건',
      'ISA계좌 개설 방법',
      'ISA계좌 필요 서류',
      'ISA계좌 증권사 수수료',
    ],
    ogTitle: 'ISA계좌 가입 조건 개설 방법 | 필요 서류 증권사 수수료 | 머니위키',
    ogDescription: '가입 조건, 비대면 개설 절차, 필요 서류, 증권사별 수수료 비교까지.',
  },

  hub: {
    url: '/w/ISA계좌-세금혜택-비과세-한도-중개형-서민형-비교',
    name: 'ISA계좌 세금혜택 비과세 한도 | 중개형 서민형 유형 비교 2026',
  },

  breadcrumb: ['금융/투자', 'ISA계좌', '가입과 개설'],

  summary3: [
    <>만 <strong>19세 이상</strong>이면 소득·직업 관계없이 누구나 가입 가능</>,
    <>은행·증권사 앱에서 <strong>비대면 5분</strong> 개설 — 일반형은 신분증만, 서민형은 소득증명원 추가</>,
    <>증권사 수수료 차이: 미래에셋 <strong>0.003%</strong> vs 은행 0.3% — 3년에 수만 원 차이</>,
  ],

  sourceBar: {
    badge: '출처',
    name: '금융위원회 ISA 개설 안내',
    date: '2026.01',
  },

  prevNext: {
    prev: { title: 'ISA계좌 중개형 서민형 일반형 유형 선택 기준', href: '/w/ISA계좌-중개형-서민형-일반형-유형-선택-기준' },
    next: { title: 'ISA계좌 납입한도 연간 2000만원 이월 규정', href: '/w/ISA계좌-납입한도-연간-2000만원-이월-규정' },
  },

  stickyBar: {
    topLabel: '비대면 개설',
    value: '5분 완료',
    buttonText: '개설 절차 보기 →',
    scrollTo: '#s4',
  },

  hero: {
    badge: '2026년 기준',
    h1: (
      <>
        ISA계좌 <span className="text-[#1E3A5F]">가입 조건</span>과 개설 방법
      </>
    ),
    intro: (
      <p className="text-base text-neutral-500 leading-relaxed">
        만 19세 이상이면 앱에서 <strong>5분</strong>이면 개설 끝이에요. 가입 조건부터 증권사 수수료 비교까지 한 번에 정리했어요.
      </p>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: 'ISA계좌 세금혜택, 유형 비교, 개설, 투자 전략 총정리',
    },
  },

  toc: [
    { id: 's1', label: 'ISA계좌 가입 조건은 뭔가요?' },
    { id: 's2', label: 'ISA계좌 개설 방법은 어떻게 되나요?' },
    { id: 's3', label: 'ISA계좌 필요 서류는 뭔가요?' },
    { id: 's4', label: 'ISA계좌 개설 절차는 어떻게 진행되나요?' },
    { id: 's-faq', label: '자주 묻는 질문' },
  ],

  sections: [
    {
      id: 's1',
      number: 'SECTION 01',
      heading: 'ISA계좌 가입 조건은 뭔가요?',
      subtitle: '만 19세 이상, 1인 1계좌, 소득 무관',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            ISA는 <strong>만 19세 이상 대한민국 국민</strong>이면 직업이나 소득에 관계없이 누구나 가입할 수 있어요. 학생, 주부, 무직자 모두 OK예요. 다만 <strong>1인 1계좌</strong>라서 이미 ISA 계좌가 있으면 다른 곳에서 추가로 만들 수 없어요.
          </p>

          <FormulaBox
            lines={[
              { text: 'ISA 가입 조건 핵심 3가지', comment: true },
              { text: '① 만 19세 이상 (2007년생은 2026년 생일 이후)' },
              { text: '② 대한민국 국민 (거주자)' },
              { text: '③ 1인 1계좌 (기존 ISA 없어야 함)' },
            ]}
          />

          <SpokeRateBars bars={[
            { label: '일반형', rate: '소득 무관', width: '100%' },
            { label: '서민형', rate: '5,000만원↓', width: '70%' },
            { label: '농어민형', rate: '3,800만원↓', width: '55%' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            서민형은 소득 조건이 있지만 일반형은 제한이 없어요. 서민형 조건이 안 되면 일반형으로 가입하면 돼요. 이미 ISA 계좌가 있는데 다른 증권사로 옮기고 싶으면, 기존 계좌를 해지하고 새로 개설해야 해요. 3년 의무기간이 리셋되니까 신중하게 결정하세요.
          </p>

          <WarnBox>
            <strong>미성년자 가입 불가:</strong> 만 19세 미만은 ISA를 만들 수 없어요. 증여세 절세를 위해 자녀 명의로 만들려는 건 안 돼요.
          </WarnBox>
        </>
      ),
      pasBridge: {
        href: '#s2',
        question: '조건은 됐으니, 어디서 만드는 게 좋을까요?',
        answer: <>증권사마다 수수료가 다르고, 은행은 주식을 직접 못 사요. 선택에 따라 수년간 수만 원 차이가 나요.</>,
        buttonText: '개설 방법 확인 →',
      },
    },

    {
      id: 's2',
      number: 'SECTION 02',
      heading: 'ISA계좌 개설 방법은 어떻게 되나요?',
      subtitle: '증권사·은행 앱에서 비대면 5분 개설',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            ISA 개설은 <strong>은행·증권사 앱</strong>에서 비대면으로 5~10분이면 끝나요. 영업점에 갈 필요 없어요. 중개형은 증권사(미래에셋증권, NH투자증권, 토스증권 등), 신탁형은 은행(KB국민은행, 신한은행 등)에서 만들어요.
          </p>

          <SpokeCompareCards cards={[
            { title: '미래에셋증권', subtitle: '수수료 최저', items: ['연 수수료: 0.003%', '평생 우대 수수료', '해외 ETF 풍부', '리서치 자료 풍부'], recommended: true, recLabel: '최저' },
            { title: '토스증권', subtitle: '앱 편의성', items: ['연 수수료: 0.01%', '초보자 친화 UI', '간편 개설 3분', '소수점 투자 가능'] },
          ]} />

          <SpokeTable
            id="tbl-broker"
            title="증권사·은행별 수수료 비교"
            subtitle="중개형 기준 · 2026년"
            headers={['금융사', '유형', '연 수수료', '특징']}
            rows={[
              ['미래에셋증권', '중개형', '0.003%', '수수료 최저, 해외 ETF'],
              ['삼성증권', '중개형', '0.004%', '안정적, 리서치'],
              ['토스증권', '중개형', '0.01%', '앱 편리, 초보자 추천'],
              ['NH투자증권', '중개형', '0.01%', '상품 다양, 리서치'],
              ['KB국민은행', '신탁형', '0.3%', '펀드·예금, 안전'],
            ]}
            highlightCol={2}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            수수료가 가장 저렴한 곳은 미래에셋증권(0.003%)이에요. 3,000만원 투자 기준으로 은행(0.3%)과 비교하면 3년에 약 26만원 차이가 나요. 주식 직접 거래하고 싶으면 증권사 중개형, 은행에 맡기고 싶으면 신탁형을 선택하세요.
          </p>

          <TipBox title="주식 처음이라면?">
            토스증권이 앱 UI가 가장 직관적이고 초보자 친화적이에요. 중개형으로 개설해서 KODEX 200 같은 안전한 ETF만 매달 사면 돼요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '서류',
        title: '개설할 때 뭘 준비해야 하나요?',
        desc: '일반형은 신분증만, 서민형은 소득증명원 1장만 추가로 있으면 돼요.',
        icon: 'check',
      },
    },

    {
      id: 's3',
      number: 'SECTION 03',
      heading: 'ISA계좌 필요 서류는 뭔가요?',
      subtitle: '일반형은 신분증만, 서민형은 소득증명원 추가',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            ISA 개설에 필요한 서류는 간단해요. 일반형은 <strong>신분증</strong>만 있으면 되고, 서민형은 <strong>소득금액증명원</strong>을 추가로 제출해야 해요. 소득금액증명원은 홈택스(hometax.go.kr)에서 3분이면 무료로 발급받을 수 있어요.
          </p>

          <SpokeTable
            id="tbl-docs"
            title="유형별 필요 서류"
            subtitle="앱에서 사진 또는 PDF 업로드"
            headers={['서류', '일반형', '서민형', '발급처']}
            rows={[
              ['신분증 (주민등록증/운전면허증)', '필수', '필수', '기 보유'],
              ['소득금액증명원', '불필요', '필수', '홈택스 (3분)'],
              ['재직증명서', '불필요', '불필요', '-'],
            ]}
          />

          <SpokeFlow steps={[
            { icon: '🔑', label: '홈택스 로그인' },
            { icon: '📋', label: '민원증명 메뉴' },
            { icon: '📅', label: '2025년 선택' },
            { icon: '📄', label: 'PDF 다운로드' },
            { icon: '📱', label: 'ISA 앱 업로드' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            소득금액증명원은 <strong>작년 소득</strong> 기준이에요. 3개월 이내 발급분만 인정되니까 너무 미리 발급받지 마세요. 서민형 조건(총급여 5,000만원 이하)에 해당하는지 확인하고, 맞으면 서민형으로 신청하세요. 안 되면 일반형으로 바로 개설하면 돼요.
          </p>

          <SpokeChecklist items={[
            { text: '신분증 준비 (주민등록증 또는 운전면허증)', done: true },
            { text: '홈택스에서 소득금액증명원 발급 (서민형만)', note: '3개월 이내 발급분' },
            { text: '증권사 앱 설치 및 회원가입', done: true },
            { text: 'ISA 개설 메뉴 진입 → 유형 선택', note: '중개형 + 서민형 추천' },
          ]} />

          <SpokeTimeline events={[
            { month: 'STEP 1', title: '홈택스 접속', desc: 'hometax.go.kr → 간편인증 또는 공동인증서 로그인' },
            { month: 'STEP 2', title: '민원증명 메뉴', desc: '"민원증명" → "소득금액증명" 선택' },
            { month: 'STEP 3', title: '발급 연도 선택', desc: '직전 연도(2025년)를 선택하고 발급 신청' },
            { month: 'STEP 4', title: 'PDF 저장', desc: 'PDF로 저장한 뒤 ISA 개설 앱에서 업로드' },
          ]} />
        </>
      ),
      pasBridge: {
        href: '#s4',
        question: '서류 준비됐으면 바로 만들 수 있어요',
        answer: <>앱 설치부터 첫 투자까지 전체 절차를 순서대로 정리했어요.</>,
        buttonText: '개설 절차 확인 →',
      },
    },

    {
      id: 's4',
      number: 'STEP 04',
      heading: 'ISA계좌 개설 절차는 어떻게 진행되나요?',
      subtitle: '앱 설치 → 유형 선택 → 본인인증 → 개설 → 첫 투자',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            증권사·은행 앱만 있으면 처음부터 끝까지 <strong>5~10분</strong>이면 끝나요. 개설 후에는 자동이체를 걸고 바로 투자를 시작하세요. 개설만 하고 방치하면 비과세 혜택을 받을 수 없어요.
          </p>

          <SpokeStepCards
            steps={[
              { title: '증권사·은행 앱 설치', desc: '미래에셋증권, 토스증권, KB국민은행 등 원하는 곳의 앱을 설치하고 회원가입' },
              { title: 'ISA 계좌 메뉴 선택', desc: '앱 내 "ISA 개설" 또는 "절세 계좌" 메뉴를 찾아 진입' },
              { title: '유형 선택', desc: '운용방식(중개형/신탁형) + 소득기준(일반형/서민형) 선택' },
              { title: '본인인증 + 서류 제출', desc: '신분증 촬영, 얼굴 인식. 서민형은 소득증명원 PDF 업로드' },
              { title: '개설 완료 → 자동이체 설정', desc: '매월 자동이체 설정(50만~166만원) + 첫 ETF 매수' },
            ]}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            개설 후에는 <strong>자동이체를 바로 설정</strong>하세요. 매달 정해진 금액을 자동으로 넣으면 잊지 않고 꾸준히 투자할 수 있어요. 연간 한도 2,000만원을 꽉 채우려면 월 166만원이 필요하고, 여유가 없으면 50만원부터 시작해도 돼요.
          </p>

          <TipBox title="개설 후 첫 투자 추천">
            고배당 ETF(KODEX 고배당) 50% + 안정 ETF(KODEX 200) 30% + 채권 ETF(KODEX 단기채권) 20%로 분산하면 배당도 받고 안정적이에요.
          </TipBox>
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
    { question: 'ISA 개설하는 데 시간이 얼마나 걸리나요?', answer: '비대면으로 <strong>5~10분</strong>이면 끝나요. 일반형은 5분, 서민형은 소득증명원 업로드 포함 10분 정도예요.' },
    { question: 'ISA 계좌는 어디서 개설하는 게 좋아요?', answer: '수수료 최저는 <strong>미래에셋증권</strong>(0.003%), 앱 편의성은 <strong>토스증권</strong>, 은행에 맡기면 <strong>KB국민은행</strong> 추천해요.' },
    { question: 'ISA 계좌 개설 후 바로 안 넣어도 되나요?', answer: '네, 계좌만 만들어두고 나중에 넣어도 돼요. 하지만 <strong>3년 의무기간은 개설일부터 시작</strong>하니까, 빨리 넣을수록 비과세 혜택 기간이 길어요.' },
    { question: '다른 증권사로 ISA를 옮길 수 있나요?', answer: '직접 이관은 안 돼요. <strong>해지 후 새로 개설</strong>해야 하는데, 3년 의무기간이 리셋돼요. 처음에 잘 선택하는 게 중요해요.' },
  ],

  relatedSpokes: [
    { badge: '유형', title: 'ISA계좌 중개형 서민형 일반형 유형 선택 기준', desc: '운용방식별 장단점 + 최적 조합', href: '/w/ISA계좌-중개형-서민형-일반형-유형-선택-기준' },
    { badge: '절세', title: 'ISA계좌 비과세 한도 손익통산 절세 계산', desc: '수익 구간별 절세액 + 계산기', href: '/w/ISA계좌-비과세-한도-손익통산-절세-계산' },
    { badge: '한도', title: 'ISA계좌 납입한도 연간 2000만원 이월 규정', desc: '이월 계산법 + 한도 활용 전략', href: '/w/ISA계좌-납입한도-연간-2000만원-이월-규정' },
    { badge: '만기', title: 'ISA계좌 만기 해지 중도인출 연금전환 방법', desc: '만기 절차 + 연금전환 세액공제', href: '/w/ISA계좌-만기-해지-중도인출-연금전환-방법' },
  ],

  sources: [
    { name: 'ISA 개설 안내', url: 'https://www.fsc.go.kr', org: '금융위원회' },
    { name: 'ISA 비대면 개설', url: 'https://www.fss.or.kr', org: '금융감독원' },
  ],
}

export default data
