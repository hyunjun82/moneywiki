"use client";

import {
  H2, SectionBadge, GreenBox, Divider, body,
  Calculator, Steps, Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 계산기 로직 (소득세법 제48조, 제55조) — 절대 변경 금지 ───

const CALC_SLIDERS = [
  {
    id: "amount",
    label: "퇴직금",
    min: 500, max: 20000, step: 100, defaultValue: 5000,
    format: (v: number) => `${v.toLocaleString()}만원`,
  },
  {
    id: "years",
    label: "근속 기간",
    min: 1, max: 40, step: 1, defaultValue: 10,
    format: (v: number) => `${v}년`,
  },
];

function calcRetirementTax(amountMan: number, years: number): number {
  const amount = amountMan * 10000;

  // 1단계: 근속연수공제
  let tenure_deduction = 0;
  if (years <= 5) {
    tenure_deduction = years * 300000;
  } else if (years <= 10) {
    tenure_deduction = 1500000 + (years - 5) * 500000;
  } else if (years <= 20) {
    tenure_deduction = 4000000 + (years - 10) * 800000;
  } else {
    tenure_deduction = 12000000 + (years - 20) * 1200000;
  }

  // 2단계: 퇴직소득 (퇴직금 - 근속연수공제, 최소 0)
  const retirement_income = Math.max(0, amount - tenure_deduction);

  // 3단계: 환산급여 = 퇴직소득 × 12 / 근속연수
  const annual_equiv = (retirement_income * 12) / years;

  // 4단계: 환산급여공제
  let equiv_deduction = 0;
  if (annual_equiv <= 8000000) {
    equiv_deduction = annual_equiv;
  } else if (annual_equiv <= 70000000) {
    equiv_deduction = 8000000 + (annual_equiv - 8000000) * 0.6;
  } else if (annual_equiv <= 140000000) {
    equiv_deduction = 45200000 + (annual_equiv - 70000000) * 0.55;
  } else if (annual_equiv <= 300000000) {
    equiv_deduction = 83700000 + (annual_equiv - 140000000) * 0.45;
  } else {
    equiv_deduction = 155700000 + (annual_equiv - 300000000) * 0.35;
  }

  // 5단계: 환산과세표준
  const taxable_equiv = Math.max(0, annual_equiv - equiv_deduction);

  // 6단계: 세율 적용 (종합소득세율)
  let tax_on_equiv = 0;
  if (taxable_equiv <= 14000000) {
    tax_on_equiv = taxable_equiv * 0.06;
  } else if (taxable_equiv <= 50000000) {
    tax_on_equiv = 840000 + (taxable_equiv - 14000000) * 0.15;
  } else if (taxable_equiv <= 88000000) {
    tax_on_equiv = 6240000 + (taxable_equiv - 50000000) * 0.24;
  } else if (taxable_equiv <= 150000000) {
    tax_on_equiv = 15360000 + (taxable_equiv - 88000000) * 0.35;
  } else if (taxable_equiv <= 300000000) {
    tax_on_equiv = 37060000 + (taxable_equiv - 150000000) * 0.38;
  } else if (taxable_equiv <= 500000000) {
    tax_on_equiv = 94060000 + (taxable_equiv - 300000000) * 0.40;
  } else {
    tax_on_equiv = 174060000 + (taxable_equiv - 500000000) * 0.42;
  }

  // 7단계: 퇴직소득세 = 환산세액 / 12 × 근속연수
  const retirement_tax = Math.round((tax_on_equiv / 12) * years);

  return retirement_tax;
}

const CALC_RESULTS = [
  {
    label: "퇴직소득세 (추정)",
    highlight: true,
    getValue: (v: Record<string, number>) => calcRetirementTax(v.amount, v.years),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
  {
    label: "지방소득세 포함",
    getValue: (v: Record<string, number>) => Math.round(calcRetirementTax(v.amount, v.years) * 1.1),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
  {
    label: "세후 수령액",
    getValue: (v: Record<string, number>) => {
      const tax = Math.round(calcRetirementTax(v.amount, v.years) * 1.1);
      return v.amount * 10000 - tax;
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

// ─── 데이터 ──────────────────────────────────────────

const STEPS = [
  {
    title: "퇴직소득원천징수영수증 수령",
    desc: "퇴직 후 회사 인사팀에 원천징수영수증을 요청해요. '근속연수', '근속연수공제', '환산급여', '환산급여공제', '퇴직소득세' 항목이 모두 있는지 확인해요.",
    tip: "홈택스 → My홈택스 → 지급명세서 조회·출력에서도 발급받을 수 있어요",
  },
  {
    title: "홈택스 모의계산으로 검증",
    desc: "홈택스(hometax.go.kr) '퇴직소득세 모의계산'에 같은 수치를 입력해 회사 계산과 비교해요. 100만원 이상 차이가 나면 회사에 정정을 요청해야 해요.",
    tip: "홈택스 → 세금신고 → 세금모의계산 → 퇴직소득세 세액 계산",
    link: { label: "홈택스 모의계산 바로가기", href: "https://www.hometax.go.kr" },
  },
  {
    title: "이상 없으면 IRP 유지 여부 결정",
    desc: "세금이 맞으면 IRP를 만 55세까지 유지할지, 일시금으로 인출할지 결정해요. IRP 유지 시 인출 시점에 세금을 납부하고, 연금으로 수령하면 퇴직소득세의 30~40%가 줄어요.",
    tip: "연금 수령 10년 초과 시 40%, 10년 이하 시 30% 감면",
  },
  {
    title: "세금 오납이면 경정청구 신청",
    desc: "더 낸 세금이 있으면 홈택스에서 '경정청구'를 해요. 퇴직일로부터 5년 이내에 신청해야 해요. 세무사 없이 직접 온라인으로 신청 가능하고 보통 2~3개월 내에 환급돼요.",
    tip: "경정청구 기한 5년 초과 시 환급 불가 — 퇴직 직후 처리하는 게 유리해요",
  },
];

const CHECKLIST = [
  "퇴직소득원천징수영수증 수령 후 항목별 금액 확인",
  "근속연수공제 금액이 법정 기준표대로 적용됐는지 검토",
  "홈택스 모의계산과 세액 비교 (100만원 이상 차이 시 정정 요청)",
  "IRP 이체 시 과세이연 처리됐는지 금융기관에 확인",
  "세금 오납 발견 시 경정청구 — 퇴직일로부터 5년 이내",
  "IRP 연금 수령 계획 시 55세 이후 시기와 기간 미리 설계",
];

const FAQS = [
  {
    q: "근로소득세랑 퇴직소득세, 뭐가 달라요?",
    a: "근로소득세는 매달 월급에서 떼고 연말정산으로 정산하는 세금이에요. 퇴직소득세는 퇴직금에만 붙는 별도 세금으로, 종합소득에 합산하지 않고 따로 계산해요(분류과세). 근속연수공제와 환산급여공제를 두 번 받을 수 있어서 같은 금액이라도 세금이 훨씬 적게 나와요.",
  },
  {
    q: "IRP로 받으면 세금이 0원인가요?",
    a: "IRP 이체 시점에는 세금을 안 내요. 과세이연이라고 해서 나중에 수령할 때 납부하는 방식이에요. 만 55세 이후 연금으로 나눠 받으면 퇴직소득세가 30% 줄어요. 10년 이상 받으면 40% 감면까지 돼요. 일시금으로 인출하면 원래 세율 그대로 내야 해요.",
  },
  {
    q: "퇴직소득세가 너무 많이 나온 것 같아요",
    a: "원천징수영수증에서 근속연수가 실제와 다르게 기재됐거나, 근속연수공제 금액이 빠진 경우가 종종 있어요. 먼저 홈택스 모의계산과 비교해보세요. 차이가 있으면 회사에 정정을 요청하고, 이미 세금을 낸 상태라면 경정청구로 5년 이내에 환급받을 수 있어요.",
  },
  {
    q: "퇴직소득세는 언제 납부하나요?",
    a: "회사에서 퇴직금 지급 시 원천징수해서 납부해요. 독자가 직접 납부할 일은 없고, 퇴직금에서 세금이 이미 빠진 금액이 입금돼요. IRP 계좌로 받는 경우에는 이체 시 원천징수 없이 전액 들어오고, 나중에 수령할 때 납부해요.",
  },
  {
    q: "명예퇴직금도 퇴직소득세가 붙나요?",
    a: "원칙적으로 붙어요. 다만 지급 명목과 금액에 따라 일부가 근로소득으로 처리될 수 있어요. 명예퇴직금이 일반 퇴직금보다 크거나 별도 계약으로 지급되는 경우, 세무사와 확인해보는 게 유리해요.",
  },
  {
    q: "퇴직 후 몇 년이 지났는데 환급 신청이 가능한가요?",
    a: "퇴직일로부터 5년 이내라면 경정청구로 환급받을 수 있어요. 5년이 지나면 청구권이 소멸해요. 홈택스에서 직접 신청 가능하고, 경정청구서에 원천징수영수증과 계산 근거를 첨부하면 돼요.",
  },
];

const SOURCES = [
  { name: "국세청", href: "https://www.nts.go.kr" },
  { name: "홈택스", href: "https://www.hometax.go.kr" },
  { name: "법제처", href: "https://www.law.go.kr/법령/소득세법" },
];

const RELATED = [
  { slug: "퇴직금-세금", title: "퇴직금 세금 얼마나 떼나요?", description: "퇴직소득세 구조와 IRP 절세 방법 비교." },
  { slug: "퇴직금-세금-환급", title: "퇴직금 세금 환급받는 방법", description: "경정청구 조건과 신청 절차 안내." },
  { slug: "퇴직금-IRP-수령방법", title: "퇴직금 IRP 수령 방법", description: "계좌 개설부터 연금 전환까지 절차." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-소득세" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 퇴직소득세 · 절세</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금에 세금이 얼마나 붙나요?<br />
        퇴직소득세 계산법부터 절세 방법까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금에 붙는 세금은 퇴직소득세예요. 일반 근로소득세와 달리 근속연수공제와 환산급여공제를 이중으로 받는 구조라서,
        같은 금액도 세금이 훨씬 적게 나와요. 근속 10년에 퇴직금 5,000만원이면 세금이 100만원대로 나오기도 해요.
        <a href="/w/퇴직금-IRP-수령방법" style={{ color: "#1D9E75", textDecoration: "underline" }}>IRP로 받으면 이 세금마저 나중에 낼 수 있고</a>,
        연금 수령 시 30~40%를 줄일 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* ── H2-1: Calculator (얼마형 → 답 먼저) ── */}
      <H2>내 퇴직금에서 세금이 얼마나 빠지나요?</H2>
      <p style={body}>
        근속연수가 길수록 세금이 적어요. 같은 5,000만원 퇴직금이라도 10년 근무와 20년 근무는 세금이 두 배 이상 차이 나요.
        아래 계산기에 퇴직금과 근속 기간을 넣어보세요.
      </p>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법 제48조</a> 근속연수공제와
        제55조 환산급여공제 공식을 적용한 추정치예요. 정확한 수치는 홈택스 모의계산이나 원천징수영수증 기준이 우선이에요.
      </p>

      <SectionBadge>퇴직소득세 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 소득세법 제48조·제55조 공제 공식 적용. 지방소득세 10% 포함. 정확한 계산은 홈택스 모의계산 이용."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      {/* ── H2-2: GreenBox (세금 구조 설명) ── */}
      <H2>퇴직소득세는 왜 이렇게 계산되나요?</H2>
      <p style={body}>
        퇴직소득세는 월급에 붙는 근로소득세와 완전히 다른 구조예요. 종합소득에 합산하지 않고 따로 계산하는 분류과세 방식이라서,
        같은 금액이라도 세금이 훨씬 적게 나와요.
      </p>
      <p style={body}>
        핵심은 공제를 두 번 받는다는 거예요. 먼저 근속연수에 따라 공제를 한 번 받고(근속연수공제),
        그 금액을 다시 연단위로 환산해서 한 번 더 공제를 받아요(환산급여공제). 오래 일할수록 세금이 줄어드는 이유가 여기 있어요.
      </p>

      <GreenBox title="퇴직소득세 계산 구조 (소득세법 제48조·제55조)">
        ① 퇴직금 - 근속연수공제 = 퇴직소득<br />
        ② 퇴직소득 x 12 / 근속연수 = 환산급여<br />
        ③ 환산급여 - 환산급여공제 = 환산과세표준<br />
        ④ 세율 적용 → / 12 x 근속연수 = 퇴직소득세<br />
        ⑤ 퇴직소득세 x 10% = 지방소득세 (합산 납부)
      </GreenBox>

      <GreenBox title="근속연수별 공제 금액 기준 (소득세법 제48조)">
        5년 이하: 근속연수 x 30만원<br />
        6~10년: 150만원 + (근속연수 - 5) x 50만원<br />
        11~20년: 400만원 + (근속연수 - 10) x 80만원<br />
        20년 초과: 1,200만원 + (근속연수 - 20) x 120만원
      </GreenBox>

      <p style={body}>
        <a href="/w/퇴직금-IRP-수령방법" style={{ color: "#1D9E75", textDecoration: "underline" }}>IRP 계좌</a>로 퇴직금을 받으면 이 세금을 당장 안 내도 돼요.
        과세이연이라고 해서, 나중에 실제로 인출할 때 납부하는 방식이에요.
        만 55세 이후 연금으로 10년 이상 나눠 받으면 퇴직소득세가 40%까지 줄어요.
      </p>

      <Divider />

      {/* ── H2-3: Steps (세금 처리 절차) ── */}
      <H2>퇴직소득세, 확인하고 처리하는 절차</H2>
      <p style={body}>
        회사가 원천징수한 세금이 맞게 계산됐는지 확인하는 게 첫 번째예요. 원천징수영수증은 퇴직 후 회사 인사팀에 요청하거나,
        <a href="https://www.hometax.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>홈택스</a> My홈택스에서 직접 발급받을 수 있어요.
      </p>
      <p style={body}>
        세금이 맞으면 IRP 운용 계획만 세우면 되고, 잘못 계산됐으면 경정청구로 돌려받을 수 있어요.
        퇴직일로부터 5년이 지나면 환급 청구권이 소멸하니까 퇴직 직후에 처리하는 게 좋아요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      {/* ── H2-4: Checklist (절세 체크리스트) ── */}
      <H2>세금 덜 내려면 이것부터 챙기세요</H2>
      <p style={body}>
        퇴직 후 세금 관련 처리는 한 번에 끝내는 게 좋아요. 나중에 다시 챙기려면 서류 재발급부터 번거로워지거든요.
        아래 항목을 퇴직 직후 순서대로 확인해보세요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* ── H2-5: FAQ ── */}
      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직소득세에서 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 소득세법을 바탕으로 작성됐어요. 세율·공제 한도는 법 개정에 따라 달라질 수 있으니 최신 기준은 국세청(126) 또는 홈택스에서 확인해요." />
    </ArticleLayout>
  );
}
