"use client";

import {
  H2, SectionBadge, GreenBox, Divider, body,
  Calculator, Steps, Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR, 퇴직금_HIGHLIGHT } from "@/data/퇴직금-guide";

// ─── 계산기 로직 (소득세법 제48조, 제55조) /절대 변경 금지 ───

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

  const retirement_income = Math.max(0, amount - tenure_deduction);
  const annual_equiv = (retirement_income * 12) / years;

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

  const taxable_equiv = Math.max(0, annual_equiv - equiv_deduction);

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
    title: "원천징수영수증부터 받으세요",
    desc: "퇴직하면 회사 인사팀에서 퇴직소득원천징수영수증을 줘요. 근속연수, 공제 금액, 세액이 전부 적혀 있죠. 이 서류가 없으면 세금이 맞게 계산됐는지 확인할 방법이 없어요. 퇴직 직후에 바로 요청하세요.",
    tip: "안 주면? 홈택스 My홈택스 → 지급명세서에서 직접 출력 가능해요",
  },
  {
    title: "홈택스 모의계산으로 대조하세요",
    desc: "영수증에 적힌 숫자를 홈택스 '퇴직소득세 모의계산'에 그대로 넣어보세요. 회사 계산과 100만원 이상 차이 나면 인사팀에 정정을 요청해야 해요. 근속연수가 1년 틀려도 세금이 수십만원 달라지거든요.",
    tip: "홈택스 → 세금신고 → 세금모의계산 → 퇴직소득세",
    link: { label: "홈택스 모의계산", href: "https://www.hometax.go.kr" },
  },
  {
    title: "IRP 유지할지, 바로 찾을지 결정하세요",
    desc: "세금이 맞다면 다음 결정은 하나예요. IRP에 넣어두고 나중에 연금으로 받을지, 지금 일시금으로 찾을지. 55세 이후 10년 넘게 연금으로 받으면 퇴직소득세가 40%까지 줄어요. 당장 돈이 급하지 않다면 넣어두는 게 유리하죠.",
    tip: "연금 10년 이하 30% 감면, 10년 초과 40% 감면",
  },
  {
    title: "세금 더 냈다면 경정청구로 돌려받으세요",
    desc: "홈택스에서 '경정청구'를 신청하면 돼요. 세무사 없이 직접 가능하고, 보통 2~3개월이면 환급돼요. 단, 퇴직일로부터 5년이 지나면 청구할 수 없어요. 퇴직 직후에 바로 처리하는 게 가장 안전하죠.",
    tip: "5년 넘으면 환급 불가 /미루지 마세요",
  },
];

const CHECKLIST = [
  "원천징수영수증 받았는지 /없으면 홈택스에서 출력",
  "근속연수가 실제와 맞는지 /1년 차이로 세금이 수십만원 달라져요",
  "홈택스 모의계산과 비교했는지 /100만원 이상 차이 나면 정정 요청",
  "IRP 과세이연 처리됐는지 /금융기관에 확인",
  "경정청구 기한 /퇴직일로부터 5년 이내",
];

const FAQS = [
  {
    q: "퇴직소득세가 월급 세금보다 적은 이유가 뭔가요?",
    a: "공제를 두 번 받기 때문이에요. 근속연수공제로 한 번 깎고, 환산급여공제로 한 번 더 깎아요. 월급에 붙는 근로소득세는 이런 이중 공제가 없죠. 그래서 같은 금액이라도 퇴직소득세가 훨씬 적게 나와요.",
  },
  {
    q: "IRP에 넣으면 세금을 아예 안 내나요?",
    a: "당장은 안 내요. 과세이연이라고 해서 나중에 꺼낼 때 내는 방식이죠. 55세 이후 연금으로 받으면 세금이 30~40% 줄어요. 일시금으로 한꺼번에 꺼내면 원래 세율 그대로 납부해야 하고요.",
  },
  {
    q: "회사가 세금을 잘못 계산한 것 같은데 어떻게 하죠?",
    a: "홈택스 모의계산에 같은 숫자를 넣어서 비교해보세요. 차이가 나면 회사 인사팀에 정정을 요청하고, 이미 세금을 낸 뒤라면 경정청구로 5년 이내에 환급받을 수 있죠.",
  },
  {
    q: "퇴직소득세는 내가 직접 내야 하나요?",
    a: "아니에요. 회사가 퇴직금 지급할 때 원천징수해서 대신 납부해요. 통장에 들어오는 금액이 이미 세금 빠진 뒤 금액이에요. IRP로 받는 경우에만 나중에 인출할 때 납부하는 구조죠.",
  },
  {
    q: "10년 일한 사람과 20년 일한 사람, 세금 차이가 얼마나 되나요?",
    a: "퇴직금 5,000만원 기준으로 10년 근무 시 퇴직소득세가 약 100만원, 20년 근무 시 약 30만원이에요. 근속연수가 길수록 공제가 커지기 때문에 세금이 크게 줄어들죠.",
  },
  {
    q: "퇴직 후 5년이 거의 다 됐는데 환급 신청이 가능한가요?",
    a: "5년 이내라면 가능해요. 홈택스에서 경정청구를 직접 신청하면 돼요. 5년이 지나면 청구권이 소멸하니까, 기한이 얼마 안 남았다면 지금 바로 신청하세요.",
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

// ─── 페이지 (얼마형: 계산기로 바로 답) ───────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} highlightSlugs={퇴직금_HIGHLIGHT} currentSlug="퇴직금-소득세" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 퇴직소득세 · 절세</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금에 세금이 얼마나 붙나요?<br />
        퇴직소득세 계산법부터 절세 방법까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "퇴직금 5,000만원인데 세금 얼마나 떼가나요?"
      </p>
      <p style={body}>
        결론부터 말하면, 생각보다 적어요. 근속 10년에 5,000만원이면 퇴직소득세가 100만원대로 나오거든요. 월급에 붙는 근로소득세랑 구조가 완전히 달라서,
        공제를 두 번이나 받을 수 있죠. 근데 여기서 끝이 아니에요.
        <a href="/w/퇴직금-IRP-수령방법" style={{ color: "#1D9E75", textDecoration: "underline" }}>IRP에 넣고 연금으로 받으면</a> 이 세금마저 30~40% 줄일 수 있죠.
        내 퇴직금에서 실제로 빠지는 세금, 아래에서 바로 계산해보세요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* H2-1: Calculator /"얼마?"에 바로 답 */}
      <H2>내 퇴직금에서 세금이 얼마나 빠지나요?</H2>
      <p style={body}>
        퇴직금과 근속 기간 두 가지만 넣으면 바로 나와요. 같은 5,000만원이라도 5년 일한 사람과 20년 일한 사람은 세금이 3배 넘게 차이 나요.
        오래 일할수록 공제가 커지기 때문이죠.
      </p>
      <p style={body}>
        아래 계산기는 <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법 제48조·제55조</a> 공제 공식을 그대로 적용한 추정치예요.
        정확한 금액은 퇴직 후 받는 원천징수영수증이나 <a href="https://www.hometax.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>홈택스 모의계산</a>이 기준이에요.
      </p>

      <SectionBadge>퇴직소득세 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 소득세법 제48조·제55조 공제 공식 적용. 지방소득세 10% 포함."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      {/* H2-2: 세금 구조 /왜 이렇게 적게 나오는지 */}
      <H2>월급 세금보다 적은 이유가 뭔가요?</H2>
      <p style={body}>
        비밀은 이중 공제 구조에 있죠. 퇴직소득세는 종합소득에 합산하지 않고 따로 계산하는데(분류과세),
        이 과정에서 공제를 두 번 받아요.
      </p>
      <p style={body}>
        먼저 근속연수에 따라 한 번 깎고(근속연수공제), 남은 금액을 1년 단위로 쪼개서 한 번 더 깎아요(환산급여공제).
        10년 일하면 공제액만 400만원이고, 20년이면 1,200만원이에요. 오래 다닐수록 세금이 확 줄어드는 이유가 바로 이거예요.
      </p>

      <GreenBox>
        퇴직금 - 근속연수공제 = 퇴직소득{"\n"}
        퇴직소득 x 12 / 근속연수 = 환산급여{"\n"}
        환산급여 - 환산급여공제 = 환산과세표준{"\n"}
        세율 적용 / 12 x 근속연수 = 퇴직소득세{"\n"}
        퇴직소득세 x 10% = 지방소득세
      </GreenBox>

      <p style={body}>
        여기서 한 가지 더 줄일 수 있는 방법이 남아있죠.
        <a href="/w/퇴직금-IRP-수령방법" style={{ color: "#1D9E75", textDecoration: "underline" }}>IRP 계좌</a>에 넣으면 당장 세금을 안 내도 되고(과세이연),
        55세 이후 연금으로 10년 넘게 받으면 퇴직소득세 자체가 40% 줄어요.
        퇴직금이 3,000만원만 넘어도 IRP를 거치는 게 유리한 경우가 대부분이에요.
      </p>

      <Divider />

      {/* H2-3: Steps /세금 확인·처리 절차 */}
      <H2>퇴직 후 세금 처리, 이 순서대로 하세요</H2>
      <p style={body}>
        세금은 회사가 알아서 떼고 입금해줘요. 내가 직접 신고할 일은 없죠.
        근데 문제는 회사가 잘못 계산하는 경우가 꽤 많다는 거예요. 근속연수를 1년 틀리게 넣거나, 공제를 빠뜨리거나.
        그래서 퇴직 직후에 내가 직접 검증하는 과정이 필요해요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      {/* H2-4: Checklist /절세 체크 */}
      <H2>세금 덜 내려면 이것부터 챙기세요</H2>
      <p style={body}>
        퇴직소득세에서 가장 많이 실수하는 게 "영수증 확인 안 하고 넘어가는 것"이에요.
        근속연수 1년 차이로 세금이 수십만원 달라지는데, 대부분 확인조차 안 하죠.
        아래 항목을 퇴직 직후에 순서대로 체크해보세요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* H2-5: FAQ */}
      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직소득세에서 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 소득세법을 바탕으로 작성했어요. 세율·공제 한도는 법 개정에 따라 달라질 수 있으니 최신 기준은 국세청(126) 또는 홈택스에서 체크해보세요." />
    </ArticleLayout>
  );
}
