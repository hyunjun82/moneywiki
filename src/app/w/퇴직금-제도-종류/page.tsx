"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR, 퇴직금_HIGHLIGHT } from "@/data/퇴직금-guide";

// Q1. DB형·DC형 선택 안내를 받았거나, 이미 가입됐는데 내 퇴직금이 안전한지 모르는 직장인
// Q2. 내 회사 제도 유형을 파악하고, DC형이면 운용 지시·IRP 개설 등 지금 당장 행동을 결정한다
// Q3. 세 제도 차이(사내 적립 vs 금융기관, 기준 임금 vs 연봉÷12), DC형 방치 위험, IRP 300만원 규칙, 연금 절세 30~40%
// Q4. GreenBox(3종 비교) + EligibilityChecker(내 상황) + Calculator(원금 추산) + Steps(4단계) + DocTable + Checklist + FAQ
//
// MAP:
// Q1 → 서론: 제도를 몰라서 수백만원 차이가 날 수 있다는 상황 공감
// Q2 → H2 순서: 제도 차이(무엇인가형) → 유불리 판단 → 원금 계산 → 행동 4단계 → 서류 → 체크리스트 → FAQ
// Q3 → H2 5개 + FAQ 6개
// Q4 → GreenBox, EligibilityChecker, Calculator, Steps, DocTable, Checklist

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "내 회사 퇴직급여 제도 유형(법정 퇴직금·DB형·DC형)을 파악하고 있죠" },
  { id: "c2", label: "DC형이라면 운용 지시를 직접 설정해뒀어요" },
  { id: "c3", label: "퇴직 전에 IRP 계좌를 미리 개설해뒀어요" },
  { id: "c4", label: "연금 수령으로 퇴직소득세를 줄일 계획을 세웠어요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "월 평균임금", min: 200, max: 800, step: 50, defaultValue: 350, format: (v: number) => `${v}만원` },
  { id: "years", label: "근속 기간", min: 1, max: 30, step: 1, defaultValue: 10, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "퇴직급여 예상 원금 (현재 임금 기준)",
    getValue: (v: Record<string, number>) => v.salary * 10000 * v.years,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "DC형 연간 적립액 (연봉 ÷ 12 기준)",
    getValue: (v: Record<string, number>) => v.salary * 10000,
    format: (v: number) => `월 ${Math.round(v / 10000).toLocaleString()}만원씩`,
  },
];

const DOCS = [
  { name: "퇴직연금 규약 사본", required: true, where: "회사 인사팀 또는 금융기관 요청" },
  { name: "퇴직급여 수급 신청서", required: true, where: "퇴직 시 금융기관 앱 또는 방문" },
  { name: "신분증 (IRP 개설용)", required: true, where: "은행·증권사 방문 또는 앱" },
  { name: "퇴직연금 적립금 잔액 확인서", required: false, where: "금융기관 앱 또는 방문 조회" },
];

const STEPS = [
  {
    title: "내 회사 제도 유형 파악",
    desc: "법정 퇴직금, DB형(확정급여형), DC형(확정기여형) 중 어느 것인지 인사팀에 물어봐요. 중소기업은 법정 퇴직금이 많고, 대기업·중견기업은 DB형·DC형을 운용하는 경우가 많죠. 제도 유형에 따라 적립 방식과 수령액 기준이 완전히 달라요.",
    tip: "인사팀에 '우리 회사 퇴직급여 제도 유형'을 물어봐요",
  },
  {
    title: "DB형 vs DC형 유불리 따지기",
    desc: "DB형은 퇴직 시점 임금이 기준이라 임금 인상률이 높은 직장이라면 더 유리해요. DC형은 매년 연봉의 1/12이 적립되고 직접 운용해요. 임금 인상이 낮거나 ETF·채권 투자로 수익을 낼 자신이 있다면 DC형이 유리하죠.",
    tip: "임금 인상률 높은 직장 = DB형이 유리, 낮거나 투자 선호 = DC형이 유리",
  },
  {
    title: "IRP 계좌 미리 개설",
    desc: "IRP는 퇴직급여 수령 창구이면서 세액공제 혜택까지 주는 계좌예요. 퇴직 시 300만원 초과 퇴직급여는 IRP 계좌로만 받을 수 있죠. 퇴직 전에 미리 열어두지 않으면 지급이 지연돼요.",
    tip: "수수료 낮은 증권사 IRP가 유리해요 (연 0.2~0.3% 수준)",
    link: { label: "IRP 계좌 개설 방법 보기", href: "/w/퇴직금-IRP-계좌" },
  },
  {
    title: "수령 방식 결정 (일시금 vs 연금)",
    desc: "IRP에서 일시금으로 인출하거나 연금으로 나눠 받을 수 있죠. 만 55세 이후 연금으로 10년 이상 수령하면 퇴직소득세의 30~40%를 아낄 수 있고요. 일시금 인출 시에는 퇴직소득세 전액을 납부해요.",
    tip: "연금 수령 선택 시 절세 + 노후 소득 두 가지를 동시에 챙겨요",
  },
];

const CHECKLIST = [
  "내 회사 제도: 법정 퇴직금·DB형·DC형 중 어느 것인지 인사팀 파악",
  "DB형 = 퇴직 시점 임금 기준, DC형 = 매년 연봉÷12 적립 후 본인 운용",
  "DC형 방치 금지: 원리금보장형 자동 배정 → 직접 운용 지시 필수",
  "IRP 계좌: 퇴직 전 미리 개설 (300만원 초과 퇴직급여는 IRP로만 수령 가능)",
  "연금 수령 10년 이상: 퇴직소득세 30~40% 줄어요",
  "IRP 추가 납입: 연 900만원 한도로 세액공제 16.5%(소득 5,500만원 이하) 적용",
];

const FAQS = [
  {
    q: "퇴직금과 퇴직연금은 뭐가 달라요?",
    a: "퇴직금은 회사가 사내에 쌓아두다가 퇴직 시 주는 방식이에요. 퇴직연금(DB형·DC형)은 외부 금융기관에 미리 적립해두는 방식이라 회사가 도산해도 내 돈이 보호돼요. 2022년부터 신규 설립 기업은 퇴직연금 가입이 의무화됐죠.",
  },
  {
    q: "DB형과 DC형 중 어느 게 더 유리해요?",
    a: "상황에 따라 달라요. 임금이 꾸준히 오르는 직장이라면 DB형이 유리하죠. 임금 인상이 낮거나 ETF 직접 투자에 자신 있다면 DC형이 유리해요. 회사 임금 인상률과 본인 투자 성향을 함께 따져봐야 해요.",
  },
  {
    q: "DC형이면 퇴직 시 회사가 퇴직금을 별도로 주나요?",
    a: "주지 않아요. DC형은 회사가 매년 연봉의 1/12을 퇴직연금 계좌에 적립해요. 퇴직 시 그 계좌 잔액이 퇴직급여이고, 운용 결과에 따라 원금보다 많거나 적을 수 있죠.",
  },
  {
    q: "IRP 계좌 없으면 퇴직금을 못 받나요?",
    a: "300만원 초과 퇴직금은 IRP 계좌로만 받을 수 있죠. 계좌 없이는 지급이 지연되니 퇴직 전에 미리 열어두는 게 좋아요.",
  },
  {
    q: "IRP 세액공제는 얼마나 받아요?",
    a: "IRP와 연금저축 합산 연 900만원 한도로 세액공제를 받아요. 소득 5,500만원 이하면 16.5%, 초과면 13.2%이죠. 연 900만원 납입 시 최대 148.5만원 환급돼요.",
  },
  {
    q: "법정 퇴직금은 없어지나요?",
    a: "아직 없어지지 않았어요. 정부가 퇴직연금 의무화를 단계적으로 추진 중이지만 5인 미만 사업장 등 예외가 있죠. 인사팀에 현재 내 회사 적용 제도를 물어보는 게 정확해요.",
  },
  {
    q: "DC형인데 운용 지시를 안 하면 어떻게 돼요?",
    a: "원리금보장형(초저금리 상품)에 자동 배정돼요. 수익이 거의 없어서 장기적으로 손해가 될 수 있죠. ETF나 채권으로 분산 투자하는 운용 지시를 직접 설정해야 해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법: DB형·DC형·IRP 제도 규정", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부: 퇴직연금 제도 안내", url: "https://www.moel.go.kr" },
      { label: "금융감독원: 퇴직연금 비교공시", url: "https://www.fss.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-세금", title: "퇴직금 세금, 얼마나 떼나요?", description: "퇴직소득세 계산법과 IRP 절세 방법이에요." },
  { slug: "퇴직금-IRP-계좌", title: "IRP 계좌 개설 방법", description: "은행·증권사 비교와 개설 절차를 정리했어요." },
  { slug: "퇴직금-계산법", title: "퇴직금 계산법, 얼마나 받을까?", description: "평균임금 기준 퇴직금 계산 공식이에요." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} highlightSlugs={퇴직금_HIGHLIGHT} currentSlug="퇴직금-제도-종류" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · DB형 · DC형 · IRP</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        DB형·DC형·법정 퇴직금, 뭐가 달라요?<br />
        제도별 차이와 내게 유리한 선택 기준
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        입사하거나 이직할 때 "DB형으로 할지, DC형으로 할지 선택하세요"라는 말을 들어본 적 있죠?
        이름은 비슷해도 적립 방식과 수령액 기준이 완전히 달라요.
        제도를 모르고 선택하면 수백만원 차이가 날 수 있고요.{" "}
        법정 퇴직금·DB형·DC형 세 가지 차이와{" "}
        <a href="/w/퇴직금-IRP-계좌" style={{ color: "#1D9E75", textDecoration: "underline" }}>IRP 활용법</a>까지 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* H2-1: 제도 차이 (무엇인가형) */}
      <H2>법정 퇴직금·DB형·DC형, 세 가지가 뭐가 달라요?</H2>
      <p style={body}>
        세 제도는 '어디에 쌓느냐'와 '얼마를 받느냐'가 달라요.
        법정 퇴직금은 회사가 사내에 쌓아뒀다가 퇴직 시 지급해요.
        회사가 도산하면 못 받을 위험이 있죠.
      </p>
      <p style={body}>
        퇴직연금(DB형·DC형)은 외부 금융기관에 미리 적립해두는 방식이에요.
        DB형(확정급여형)은 퇴직 시점 임금이 기준이라 임금이 많이 오를수록 수령액이 커지고,
        DC형(확정기여형)은 매년 연봉의 1/12이 적립되고 본인이 직접 운용해요.
      </p>

      <GreenBox title="세 제도 핵심 차이">
        법정 퇴직금: 회사 사내 적립 → 도산 시 미지급 위험 있음<br />
        DB형(확정급여형): 금융기관 적립, 퇴직 시점 임금 기준으로 수령액 확정<br />
        DC형(확정기여형): 매년 연봉÷12 적립, 본인이 직접 운용해 수익 결정
      </GreenBox>

      <BorderBox>
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법</a>에 따르면
        5인 이상 사업장은 퇴직급여 제도를 반드시 운영해야 해요.
        2022년부터 신규 설립 기업은 퇴직연금(DB형 또는 DC형) 가입이 의무화됐고요.
      </BorderBox>

      <SectionBadge>내 상황 체크</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="퇴직연금 준비가 잘 돼 있죠. IRP 추가 납입으로 세액공제까지 챙기면 더 좋죠."
        partialMatchText="아직 준비가 필요한 부분이 있죠. 아래 단계별 안내를 따라 하나씩 챙겨봐요."
      />

      <Divider />

      {/* H2-2: 유불리 판단 (반전형 시작) */}
      <H2>같은 제도라도 내 상황에 따라 유불리가 달라요</H2>
      <p style={body}>
        DB형과 DC형은 어느 게 절대적으로 좋다고 할 수 없어요.
        임금 인상률이 높은 직장이라면 DB형이 유리해요.
        퇴직 시점 임금이 높을수록 수령액이 커지기 때문이죠.
      </p>
      <p style={body}>
        반면 임금 인상이 낮거나 투자에 자신 있다면 DC형이 유리할 수 있죠.
        매년 연봉의 1/12을 ETF나 채권으로 운용하면 DB형보다 높은 수익을 기대할 수 있죠.
        단, DC형을 방치하면 원리금보장형(초저금리)에 자동 배정되니 운용 지시를 꼭 직접 해야 해요.
      </p>

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* H2-3: 원금 계산 (숫자형 시작) */}
      <H2>내 퇴직급여 원금, 대체 얼마나 될까?</H2>
      <p style={body}>
        퇴직급여 원금은 평균임금(퇴직 전 3개월 급여 평균) × 근속 기간으로 계산해요.
        DB형은 퇴직 시점 임금이 기준이라 임금 인상분이 더해지고,
        DC형은 매년 쌓인 원금에 운용 수익이 더해지죠.
      </p>
      <p style={body}>
        아래 계산기는 현재 임금 기준 원금 추정값이에요.
        DB형은 퇴직까지 임금이 오를수록 실제 수령액이 더 커지고,
        DC형은 운용 성과에 따라 원금보다 많아질 수 있죠.
      </p>

      <SectionBadge>퇴직급여 원금 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 현재 임금 기준 원금 추정값이에요. DB형은 퇴직 시 임금 인상분, DC형은 운용수익이 미반영돼요."
      />

      <Divider />

      {/* H2-4: 행동 4단계 (질문형 시작) */}
      <H2>지금 당장 뭘 해야 하죠?</H2>
      <p style={body}>
        입사부터 퇴직 후 수령까지 네 단계가 있죠.
        각 단계에서 하나라도 놓치면 수백만원 손해로 이어질 수 있죠.
        지금 어느 단계에 있는지 파악해봐요.
      </p>
      <p style={body}>
        특히 IRP 계좌는 퇴직 전에 반드시 개설해야 해요.
        수수료 낮은 증권사 IRP를 미리 열어두면 절세와 수수료 절감을 동시에 챙길 수 있죠.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      {/* H2-5: 서류 (경고형 시작) */}
      <H2>퇴직 시 필요한 서류, 미리 챙겨둬요</H2>
      <p style={body}>
        퇴직연금 규약을 먼저 받아봐요.
        인사팀이나 금융기관에 요청하면 DB형인지 DC형인지,
        어느 금융기관에 적립됐는지 파악할 수 있죠.
      </p>
      <p style={body}>
        IRP 계좌를 퇴직 전에 열어두면 퇴직 당일 바로 퇴직급여가 이전돼요.
        계좌 없으면 300만원 초과 퇴직급여 지급이 지연되니 미리 준비하는 게 좋죠.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      {/* H2-6: 체크리스트 (사례형 시작) */}
      <H2>퇴직급여, 놓치면 안 되는 것들</H2>
      <p style={body}>
        DC형을 선택했다면 운용 지시를 직접 해야 해요.
        방치하면 원리금보장형에 자동 배정돼서 수익이 거의 없어요.
        ETF·채권 등으로 분산 투자하면 장기적으로 더 높은 수익을 기대할 수 있죠.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        연 900만원 납입 × 16.5%(소득 5,500만원 이하) = 최대 148.5만원 환급<br />
        소득 5,500만원 초과라면 13.2% 적용, 최대 118.8만원 환급<br />
        IRP와 연금저축 합산 한도 기준이에요
      </GreenBox>

      <Divider />

      {/* H2-7: FAQ */}
      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직급여 제도에서 가장 많이 헷갈리는 질문들만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 대조해봐요." />
    </ArticleLayout>
  );
}
