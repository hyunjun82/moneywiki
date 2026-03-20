"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR, 퇴직금_HIGHLIGHT } from "@/data/퇴직금-guide";

// ─── Q1-Q4 필수 사고 ─────────────────────────────────
// Q1. 퇴직금을 받았거나 곧 받을 예정인데, 세금이 얼마나 빠지는지 모르는 상황
// Q2. 내 퇴직소득세 예상 금액을 계산하고, IRP 절세 여부를 결정한다
// Q3. 퇴직소득세 5단계 계산 구조(근속연수공제→환산급여→세율), IRP 과세이연과 연금 감면율 30~40%, 원천징수 절차와 서류
// Q4. Calculator(예상 세금) + GreenBox(계산 구조) + Steps(절세 절차) + DocTable(서류) + Checklist(준비)
//
// MAP:
// Q1 → 서론: 퇴직금 실수령액이 얼마인지 모르는 불안감
// Q2 → H2 순서: Calculator(답 먼저, 얼마형) → 계산 구조 설명 → IRP 절세 방법 → 서류 → 체크리스트
// Q3 → H2 5개 + FAQ
// Q4 → Calculator, GreenBox, Steps, DocTable, Checklist

// ─── 데이터 ──────────────────────────────────────────

const CALC_SLIDERS = [
  { id: "amount", label: "퇴직금 총액", min: 500, max: 30000, step: 500, defaultValue: 3000, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "years", label: "근속연수", min: 1, max: 35, step: 1, defaultValue: 10, format: (v: number) => `${v}년` },
];

function calcTax(amount: number, years: number): number {
  const amountWon = amount * 10000;

  // 1단계: 근속연수 공제
  let yearDeduct = 0;
  if (years <= 5) yearDeduct = years * 300000;
  else if (years <= 10) yearDeduct = 1500000 + (years - 5) * 500000;
  else if (years <= 20) yearDeduct = 4000000 + (years - 10) * 800000;
  else yearDeduct = 12000000 + (years - 20) * 1200000;

  const taxableBase = Math.max(0, amountWon - yearDeduct);

  // 2단계: 환산급여 계산
  const converted = (taxableBase / years) * 12;

  // 3단계: 환산급여 공제
  let convertedDeduct = 0;
  if (converted <= 8000000) convertedDeduct = converted;
  else if (converted <= 70000000) convertedDeduct = 8000000 + (converted - 8000000) * 0.6;
  else convertedDeduct = 8000000 + (70000000 - 8000000) * 0.6 + (converted - 70000000) * 0.45;

  const finalBase = Math.max(0, converted - convertedDeduct);

  // 4단계: 세율 적용 (6단계 누진세)
  let tax = 0;
  if (finalBase <= 14000000) tax = finalBase * 0.06;
  else if (finalBase <= 50000000) tax = 840000 + (finalBase - 14000000) * 0.15;
  else if (finalBase <= 88000000) tax = 6240000 + (finalBase - 50000000) * 0.24;
  else if (finalBase <= 150000000) tax = 15360000 + (finalBase - 88000000) * 0.35;
  else if (finalBase <= 300000000) tax = 37060000 + (finalBase - 150000000) * 0.38;
  else tax = 94060000 + (finalBase - 300000000) * 0.40;

  // 5단계: 연분연승 환원
  const finalTax = (tax / 12) * years;
  return Math.round(Math.max(0, finalTax));
}

const CALC_RESULTS = [
  {
    label: "예상 퇴직소득세 (원천징수)",
    getValue: (v: Record<string, number>) => calcTax(v.amount, v.years),
    format: (v: number) => v < 10000 ? `약 ${v.toLocaleString()}원` : `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "지방소득세 포함 총 세금 (10% 가산)",
    getValue: (v: Record<string, number>) => Math.round(calcTax(v.amount, v.years) * 1.1),
    format: (v: number) => v < 10000 ? `약 ${v.toLocaleString()}원` : `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
  {
    label: "실수령 퇴직금 (세후)",
    getValue: (v: Record<string, number>) => v.amount * 10000 - Math.round(calcTax(v.amount, v.years) * 1.1),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
  {
    label: "IRP 연금 수령 시 절세액 (30% 감면 기준)",
    getValue: (v: Record<string, number>) => Math.round(calcTax(v.amount, v.years) * 1.1 * 0.30),
    format: (v: number) => v < 10000 ? `약 ${v.toLocaleString()}원` : `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const STEPS = [
  {
    title: "회사가 퇴직소득세 원천징수",
    desc: "퇴직금 지급 시 회사가 5단계 계산으로 세금을 차감해요. 근속연수 공제 → 환산급여 공제 → 세율 적용 → 연분연승 환원 순서로 계산하고, 세금을 뺀 금액이 입금되죠. 별도로 세무서에 신고할 필요가 없고요.",
    tip: "퇴직소득원천징수영수증을 퇴직 당일에 받아두면 나중에 검증이 수월해요",
  },
  {
    title: "IRP 계좌 이체 여부 결정",
    desc: "퇴직금 300만원 초과 시 IRP 계좌로 받는 게 원칙이에요. IRP로 받으면 수령 시점까지 퇴직소득세를 내지 않죠(과세 이연). 55세 이후 연금으로 나눠 받으면 세금이 30~40% 줄어들고요.",
    tip: "퇴직 전에 미리 IRP 계좌를 만들어두면 이체가 빠르게 처리돼요",
    link: { label: "IRP 계좌 개설 방법 보기", href: "/w/퇴직금-IRP-계좌" },
  },
  {
    title: "연금 수령 조건 설정 (절세 핵심)",
    desc: "IRP에서 연금으로 받으려면 55세 이상이고 가입 기간 5년 이상이어야 해요. 연간 수령액이 1,500만원 이하면 저율과세(3~5%)가 적용되죠. 10년 이상 나눠 받으면 퇴직소득세의 60~70%만 내고요.",
    tip: "수령 기간이 10년 이상이면 세금이 최대 40% 줄어요",
  },
  {
    title: "세금 환급 또는 추가 납부 정산",
    desc: "두 군데 이상에서 퇴직금을 받은 해라면 다음 해 5월 종합소득세 신고 때 합산 정산이 필요해요. 각 회사가 독립적으로 원천징수했기 때문에 실제 세금과 차이가 생길 수 있죠. 과납이면 환급, 부족하면 추가 납부하게 돼요.",
    tip: "홈택스 → 조회/발급 → 원천징수 내역에서 이전 회사 세액도 조회 가능해요",
    link: { label: "홈택스 원천징수 내역 조회", href: "https://www.hometax.go.kr" },
  },
];

const DOCS = [
  { name: "퇴직소득원천징수영수증", required: true, where: "퇴직 시 회사에서 발급 (의무)" },
  { name: "신분증 (주민등록증·운전면허증)", required: true, where: "본인 지참 (IRP 개설 시 필요)" },
  { name: "IRP 계좌 개설 서류", required: false, where: "은행·증권사 방문 또는 앱" },
  { name: "근로소득원천징수영수증", required: false, where: "종합소득세 신고 시 회사에서 발급" },
  { name: "경정청구서 (세금 환급 신청 시)", required: false, where: "홈택스에서 작성·제출" },
];

const CHECKLIST = [
  "퇴직소득원천징수영수증: 퇴직 즉시 회사에 요청해 보관",
  "IRP 계좌: 퇴직 전 은행·증권사에서 미리 개설",
  "일시금 vs 연금: 세금 차이 계산 후 결정 (연금이 최대 40% 유리)",
  "두 곳 이상 퇴직금 수령: 이듬해 5월 종합소득세 합산 신고",
  "세금 환급 여부: 홈택스에서 원천징수 내역 조회",
  "IRP 중도해지 주의: 이연된 퇴직소득세 전액 + 기타소득세 16.5% 부과",
];

const FAQS = [
  {
    q: "퇴직금에서 세금이 얼마나 빠지나요?",
    a: "고정 세율이 아니에요. 근속연수가 길수록, 금액이 적을수록 세율이 낮아지죠. 10년 근속·3,000만원이면 원천징수세 수십만원 수준이에요. 위 계산기로 내 예상 금액을 먼저 넣어봐요.",
  },
  {
    q: "IRP에 넣으면 세금을 안 내나요?",
    a: "당장은 안 내는 거예요. 나중에 연금으로 받을 때 퇴직소득세의 60~70%만 내죠. 10년 이상 나눠 받으면 일시금 수령보다 세금이 30~40% 줄어들고요.",
  },
  {
    q: "회사에서 세금을 알아서 떼주나요?",
    a: "네, 회사가 원천징수해요. 퇴직소득세를 차감한 금액이 입금되죠. 계산이 맞는지는 퇴직소득원천징수영수증으로 직접 대조해봐요.",
  },
  {
    q: "퇴직금 1,000만원이면 세금이 얼마인가요?",
    a: "근속연수에 따라 달라요. 5년 근속 기준으로 수만원~수십만원 수준이죠. 근속연수 공제 덕분에 소액 퇴직금은 세금이 거의 안 나오거나 0원인 경우도 많고요.",
  },
  {
    q: "두 군데서 퇴직금을 받으면 세금은?",
    a: "각 회사에서 독립적으로 원천징수해요. 이듬해 5월에 종합소득세 신고 때 합산 정산이 필요하죠. 추가 납부 또는 환급이 생길 수 있고요.",
  },
  {
    q: "IRP를 중도해지하면 세금이 어떻게 되나요?",
    a: "불리해져요. 이연됐던 퇴직소득세 전액을 내야 하고, 추가로 기타소득세 16.5%까지 부과되죠. 중도해지는 웬만하면 피하는 게 좋고요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "소득세법 제22조: 퇴직소득의 범위", url: "https://www.law.go.kr/법령/소득세법" },
      { label: "소득세법 제48조: 퇴직소득공제 (근속연수공제)", url: "https://www.law.go.kr/법령/소득세법" },
      { label: "소득세법 제55조: 퇴직소득 세율", url: "https://www.law.go.kr/법령/소득세법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "국세청: 퇴직소득세 안내", url: "https://www.nts.go.kr" },
      { label: "홈택스: 퇴직소득세 계산기", url: "https://www.hometax.go.kr" },
      { label: "금융감독원: IRP 과세 이연 안내", url: "https://www.fss.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-세금-절세-방법-IRP-연말정산", title: "IRP로 퇴직금 세금 줄이는 방법", description: "IRP 연금 수령 시 퇴직소득세 30~40% 절세 방법이에요." },
  { slug: "퇴직금-IRP-수령방법", title: "퇴직금 IRP 수령 방법", description: "IRP 계좌 개설부터 연금 설정까지 단계별로 안내해요." },
  { slug: "퇴직금-계산법", title: "퇴직금 계산법, 얼마나 받을까?", description: "평균임금 기준 퇴직금 계산 공식과 실전 예시예요." },
];

// ─── 페이지 (얼마형: Calculator 먼저) ─────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} highlightSlugs={퇴직금_HIGHLIGHT} currentSlug="퇴직금-세금" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 퇴직소득세 · 절세</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 세금, 얼마나 떼나요?<br />
        퇴직소득세 계산법과 IRP 절세 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금을 받으면 세금이 얼마나 빠지는지 걱정되죠? 퇴직금에는 근로소득세가 아니라 퇴직소득세가 따로 붙어요.
        근속연수가 길수록 공제가 커져서 세금이 줄어드는 구조이고요.{" "}
        <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법 제48조</a> 근속연수공제 덕분에 소액 퇴직금은 세금이 0원인 경우도 많죠.
        여기서 퇴직소득세 계산 구조부터{" "}
        <a href="/w/퇴직금-세금-절세-방법-IRP-연말정산" style={{ color: "#1D9E75", textDecoration: "underline" }}>IRP로 세금을 30~40% 줄이는 방법</a>까지 다뤄요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* H2-1: Calculator (얼마형 → 답 먼저) */}
      <H2>내 퇴직소득세, 대체 얼마나 빠질까?</H2>
      <p style={body}>
        세금이 대체 얼마나 빠지는 걸까요? 퇴직소득세는 5단계 계산을 거치기 때문에 공식만 봐서는 감이 안 잡혀요.
        아래 계산기에 퇴직금 총액과 근속연수를 넣으면 예상 세금, 실수령액, IRP 절세액까지 한 번에 나오죠.
      </p>
      <p style={body}>
        10년 근속에 퇴직금 3,000만원이면 퇴직소득세는 수십만원 수준이에요.
        같은 금액이라도 근속 20년이면 공제가 늘어나서 세금이 절반 이하로 떨어지고요.
        슬라이더로 내 조건을 넣어봐요.
      </p>

      <SectionBadge>퇴직소득세 간편 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 소득세법 기준 간략 계산이에요. 정확한 금액은 홈택스 퇴직소득세 계산기에서 대조해봐요."
      />
      <p style={body}>
        근속연수가 길수록 세금이 줄어드는 게 보이죠? 이런 결과가 나오는 이유가 5단계 계산 구조에 있어요.
      </p>

      <Divider />

      {/* H2-2: 계산 구조 설명 (숫자형 시작) */}
      <H2>퇴직소득세 계산, 5단계 구조예요</H2>
      <p style={body}>
        5단계예요. 근속연수 공제 → 환산급여 계산 → 환산급여 공제 → 세율 적용 → 연분연승 환원.
        복잡해 보이지만 핵심은 하나예요. 오래 일할수록 공제가 커지고, 세금이 줄어드는 구조이죠.
      </p>
      <p style={body}>
        1~2단계에서 근속연수에 비례해 공제금액이 결정되고, 3단계에서 환산급여까지 추가 공제해요.
        4단계에서 6~40% 누진세율을 적용한 뒤, 5단계에서 근속연수를 다시 곱해 최종 세액을 구하죠.
        이 과정에서 근속연수가 두 번 반영되기 때문에 오래 일한 사람일수록 세금이 크게 줄어드는 거예요.
      </p>

      <GreenBox title="퇴직소득세 5단계 요약">
        1단계: 근속연수 공제 (5년 150만원, 10년 400만원, 20년 1,200만원)<br />
        2단계: 환산급여 = (퇴직금 - 공제) / 근속연수 x 12<br />
        3단계: 환산급여 공제 (800만원까지 100%, 이후 60~45%)<br />
        4단계: 누진세율 적용 (6~40%, 6단계)<br />
        5단계: 연분연승 환원 = 세금 / 12 x 근속연수
      </GreenBox>

      <BorderBox>
        퇴직소득세는 일반 소득세와 세율이 같지만, 공제 구조가 완전히 달라요.
        근로소득세처럼 총액에 바로 세율을 곱하는 게 아니라 여러 단계로 나눠 줄여주는 방식이죠.
        그래서 같은 금액이라도 퇴직소득세가 근로소득세보다 훨씬 적게 나오고요.
      </BorderBox>

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      {/* H2-3: IRP 절세 (반전형 시작) */}
      <H2>같은 퇴직금인데, 받는 방법으로 세금이 달라져요</H2>
      <p style={body}>
        같은 퇴직금이라도 받는 방법에 따라 세금이 크게 달라져요.
        일시금으로 바로 받으면 퇴직소득세 100%를 내지만, IRP에 넣고 55세 이후 연금으로 10년 이상 나눠 받으면 60~70%만 내죠.
        세금을 30~40% 줄일 수 있는 합법적 절세 방법이에요.
      </p>
      <p style={body}>
        IRP 계좌로 받으면 수령 시점까지 세금 납부가 미뤄지는 과세 이연 효과도 생기고요.
        그 사이에 투자 수익까지 비과세로 운용할 수 있어서 퇴직금이 클수록 효과가 커져요.
        절차는 4단계로 간단하죠.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      {/* H2-4: 서류 (경고형 시작) */}
      <H2>퇴직소득원천징수영수증, 퇴직 당일에 꼭 받아둬요</H2>
      <p style={body}>
        이 서류를 퇴직 당일에 안 받아두면 나중에 번거로워져요.
        퇴직소득세는 회사가 원천징수하기 때문에 대부분 별도 서류가 필요 없지만,
        IRP 이체나 환급 신청, 종합소득세 신고 시에는 아래 서류가 반드시 필요하죠.
      </p>
      <p style={body}>
        특히 퇴직소득원천징수영수증에는 퇴직금 총액, 근속연수, 공제금액, 원천징수세액이 모두 적혀 있고요.
        세금 계산이 맞는지 직접 대조해볼 수 있는 유일한 서류예요.
        퇴직 후에는 회사 시스템 접근이 막히는 경우가 많으니 당일에 챙기는 게 좋죠.
      </p>

      <SectionBadge>서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      {/* H2-5: 체크리스트 (사례형 시작) */}
      <H2>퇴직 전후 절세 체크리스트</H2>
      <p style={body}>
        퇴직금 5,000만원에 15년 근속이라면, 일시금 수령 시 세금이 100만원대예요.
        IRP 연금(10년 이상 분할)으로 수령하면 그 60~70%만 내죠.
        금액이 클수록 절세 효과도 비례해서 커지고요.
      </p>
      <p style={body}>
        아래 항목 중 놓치면 손해인 것들만 골랐어요.
        IRP 중도해지는 이연된 세금 전액에 기타소득세 16.5%까지 붙기 때문에 가장 주의해야 하죠.
      </p>

      <SectionBadge>절세 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* H2-6: FAQ */}
      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 세금에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 소득세법을 바탕으로 작성됐어요. 세율·공제 기준은 변경될 수 있으니 최신 기준은 국세청(126) 또는 홈택스에서 대조해봐요." />
    </ArticleLayout>
  );
}
