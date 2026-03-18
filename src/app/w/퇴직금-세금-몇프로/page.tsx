"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직금(퇴직소득)을 받았거나 곧 받을 예정이에요" },
  { id: "c2", label: "근속기간이 1년 이상이에요" },
  { id: "c3", label: "퇴직금이 300만원을 넘어요" },
  { id: "c4", label: "퇴직 후 세금이 얼마나 빠졌는지 궁금해요" },
];

const CALC_SLIDERS = [
  {
    id: "amount",
    label: "퇴직금 총액",
    min: 500,
    max: 15000,
    step: 100,
    defaultValue: 3000,
    format: (v: number) => `${v.toLocaleString()}만원`,
  },
  {
    id: "years",
    label: "근속 기간",
    min: 1,
    max: 35,
    step: 1,
    defaultValue: 10,
    format: (v: number) => `${v}년`,
  },
];

// 퇴직소득세 계산: 근속연수공제 → 환산급여 → 환산급여공제 → 세율 적용 → 환산
function calcTax(amount: number, years: number): number {
  // 근속연수공제 (단위: 원)
  const deduction =
    Math.min(years, 5) * 300_000 +
    Math.max(0, Math.min(years - 5, 5)) * 500_000 +
    Math.max(0, Math.min(years - 10, 10)) * 800_000 +
    Math.max(0, years - 20) * 1_200_000;

  // 퇴직소득금액 (원)
  const retireIncome = Math.max(0, amount * 10_000 - deduction);

  // 환산급여 = 퇴직소득금액 × 12 / 근속연수
  const annualized = (retireIncome * 12) / years;

  // 환산급여공제
  const annualDeduction =
    annualized <= 8_000_000
      ? annualized * 0.6
      : annualized <= 70_000_000
      ? 4_800_000 + (annualized - 8_000_000) * 0.55
      : annualized <= 120_000_000
      ? 38_950_000 + (annualized - 70_000_000) * 0.45
      : 61_450_000 + (annualized - 120_000_000) * 0.35;

  const taxBase = Math.max(0, annualized - annualDeduction);

  // 소득세율 적용 (6~35%)
  const annualTax =
    taxBase <= 14_000_000
      ? taxBase * 0.06
      : taxBase <= 50_000_000
      ? 840_000 + (taxBase - 14_000_000) * 0.15
      : taxBase <= 88_000_000
      ? 6_240_000 + (taxBase - 50_000_000) * 0.24
      : 15_360_000 + (taxBase - 88_000_000) * 0.35;

  // 환산 세액 = 연산 세액 / 12 × 근속연수 (지방소득세 10% 포함)
  return Math.round((annualTax / 12) * years * 1.1);
}

const CALC_RESULTS = [
  {
    label: "퇴직소득세 추정 (지방소득세 포함)",
    getValue: (v: Record<string, number>) => calcTax(v.amount, v.years),
    format: (v: number) => `약 ${Math.round(v / 10_000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "세후 실수령액 추정",
    getValue: (v: Record<string, number>) =>
      Math.max(0, v.amount * 10_000 - calcTax(v.amount, v.years)),
    format: (v: number) => `약 ${Math.round(v / 10_000).toLocaleString()}만원`,
  },
  {
    label: "실효세율",
    getValue: (v: Record<string, number>) => {
      const tax = calcTax(v.amount, v.years);
      return Math.round((tax / (v.amount * 10_000)) * 1000) / 10;
    },
    format: (v: number) => `약 ${v}%`,
  },
];

const DOCS = [
  { name: "퇴직소득원천징수영수증", required: true, where: "회사 인사팀 (퇴직 시 자동 발급)" },
  { name: "근로계약서 (입사일 확인용)", required: true, where: "인사팀 또는 입사 시 받은 원본" },
  { name: "급여명세서 최근 3개월분", required: false, where: "인사팀" },
  { name: "IRP 계좌 개설 서류 (과세 이연 선택 시)", required: false, where: "IRP 개설 금융기관" },
];

const STEPS = [
  {
    title: "근속연수공제 계산",
    desc: "퇴직금에서 근속연수공제를 먼저 빼요. 5년 이하는 1년당 30만원, 5~10년 구간은 1년당 50만원, 10~20년 구간은 1년당 80만원, 20년 초과는 1년당 120만원이에요. 근속 10년이면 공제액 합계가 700만원이에요.",
    tip: "근속기간은 입사일부터 퇴직일까지 일 단위로 계산해요",
  },
  {
    title: "환산급여 계산",
    desc: "근속연수공제 후 남은 퇴직소득에 12를 곱하고 근속연수로 나눠요. 이게 환산급여예요. 장기 근속을 연 단위로 펼쳐서 세율이 너무 높게 적용되지 않도록 하는 장치예요.",
    tip: "공식: (퇴직소득금액 × 12) ÷ 근속연수 = 환산급여",
  },
  {
    title: "환산급여공제 적용",
    desc: "환산급여에서 다시 환산급여공제를 빼요. 환산급여 8,000만원 이하 구간에서 55~60%를 공제해요. 두 단계 공제 덕분에 실질 세율이 일반 근로소득세보다 훨씬 낮아져요.",
    tip: "환산급여가 낮을수록 공제율이 높아서 세금이 더 줄어요",
  },
  {
    title: "세율 적용 후 환산",
    desc: "환산급여공제 후 과세표준에 일반 소득세율(6~35%)을 적용해 산출 세액을 구해요. 그 금액을 다시 근속연수로 나눠서 최종 퇴직소득세가 나와요. 여기에 지방소득세(소득세의 10%)가 붙어요.",
    tip: "회사가 이 과정을 대신 계산해서 원천징수 후 세무서에 납부해요",
  },
];

const CHECKLIST = [
  "근속연수공제: 입사일~퇴직일 정확히 계산 (일 단위)",
  "IRP 계좌: 퇴직 전 미리 개설 (300만원 초과 시 의무 이전)",
  "원천징수영수증: 인사팀에 발급 요청 후 공제 항목 직접 검토",
  "연금 수령 선택: 55세 이후 10년 이상 → 퇴직소득세 40% 감면",
  "경정청구: 근속연수 계산 오류 있으면 5년 이내 환급 신청 가능",
];

const FAQS = [
  {
    q: "퇴직금 세금이 정확히 몇 퍼센트인가요?",
    a: "정해진 퍼센트가 없어요. 근속연수공제와 환산급여공제 두 단계를 거쳐서 실질 세율이 정해지거든요. 근속 10년에 퇴직금 3,000만원이면 실효세율이 약 3~5%대예요. 같은 퇴직금이어도 근속 5년이면 두 배 가까이 차이 나요.",
  },
  {
    q: "퇴직금 세금은 회사에서 알아서 떼나요?",
    a: "맞아요. 회사가 퇴직 시 계산해서 원천징수하고 세무서에 납부해요. 퇴직소득원천징수영수증으로 얼마가 빠졌는지 확인할 수 있어요.",
  },
  {
    q: "IRP로 받으면 세금을 안 내도 되나요?",
    a: "지금 당장은 안 내요. IRP로 이체되면 세금이 유예되고, 나중에 인출할 때 납부해요. 55세 이후 10년 이상 연금으로 받으면 퇴직소득세의 40%를 감면받아요.",
  },
  {
    q: "퇴직금에 건강보험료도 붙나요?",
    a: "안 붙어요. 퇴직소득은 건강보험료 부과 대상이 아니에요. 퇴직소득세와 지방소득세만 납부하면 돼요.",
  },
  {
    q: "세금이 너무 많이 나온 것 같으면 어떻게 하나요?",
    a: "원천징수영수증을 꺼내서 근속연수공제가 정확히 적용됐는지 봐요. 입사일이 잘못 기재됐거나 공제 계산에 오류가 있으면 경정청구(5년 이내)로 환급받을 수 있어요.",
  },
  {
    q: "중간정산 후 퇴직금 세금 계산이 달라지나요?",
    a: "달라져요. 중간정산을 받으면 그 이후 근속기간만 새로 계산해요. 근속기간이 짧아지면 근속연수공제가 줄고 세금이 높아질 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "소득세법 제22조: 퇴직소득 범위", url: "https://www.law.go.kr/법령/소득세법" },
      { label: "소득세법 제48조: 퇴직소득공제", url: "https://www.law.go.kr/법령/소득세법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "국세청: 퇴직소득세 안내", url: "https://www.nts.go.kr" },
      { label: "홈택스: 퇴직소득세 계산기", url: "https://www.hometax.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-세금-절세-방법-IRP-연말정산",
    title: "퇴직금 세금 줄이는 방법",
    description: "IRP와 연금 수령으로 세금 최소화하는 전략이에요.",
  },
  {
    slug: "퇴직금-세금-환급",
    title: "퇴직금 세금 환급 방법",
    description: "초과 납부했을 때 경정청구로 돌려받는 방법이에요.",
  },
  {
    slug: "퇴직금-IRP-계좌",
    title: "IRP 계좌 개설 방법",
    description: "퇴직금 이전 전 미리 알아둬야 할 것들이에요.",
  },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={
        <Sidebar
          heading="퇴직금 가이드"
          items={퇴직금_SIDEBAR}
          currentSlug="퇴직금-세금-몇프로"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>
        퇴직금 · 퇴직소득세 · 세율
      </p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 세금, 정확히 몇 퍼센트 나가나요?<br />
        퇴직소득세 계산 공식과 절세 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금 3,000만원을 받으면 세금이 얼마나 빠질지 걱정되죠?
        퇴직소득세는 일반 급여세와 구조가 달라서 생각보다 훨씬 적게 나와요.{" "}
        <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>
          소득세법 제22조·제48조
        </a>
        에 따라 근속연수공제와 환산급여공제 두 단계를 거치기 때문이에요.
        근속 10년에 퇴직금 3,000만원이면 실효세율이 3~5%대예요.
        IRP로 받아 연금으로 수령하면 여기서 최대 40%까지 더 줄일 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* H2-1: 핵심 개념 */}
      <H2>퇴직소득세, 일반 급여세와 왜 다른가요?</H2>
      <p style={body}>
        퇴직금은 수십 년 일한 대가를 한 번에 받는 돈이에요. 그대로 그 해 소득으로 잡으면 세율이 너무 높아지기 때문에
        소득세법은 퇴직소득에만 특별 계산 구조를 적용해요.
        핵심은 두 단계 공제인데, 먼저 근속연수공제로 과세표준을 낮추고, 다시 환산급여공제로 한 번 더 낮춰요.
      </p>
      <p style={body}>
        근속 10년에 퇴직금 3,000만원을 받는다면, 근속연수공제 700만원이 먼저 빠지고
        나머지 금액을 연봉으로 환산한 뒤 다시 55~60%를 공제해요.
        같은 퇴직금이어도 근속 5년과 15년의 세금이 두 배 이상 차이 나는 이유가 여기에 있어요.
      </p>

      <GreenBox title="퇴직소득세 계산 구조">
        근속연수공제 (최대 1년당 120만원) → 과세표준 감소<br />
        환산급여공제 (60% 수준) → 세율 적용 기준 대폭 하락<br />
        실효세율: 근속 10년·3,000만원 기준 약 3~5%대
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="퇴직소득세 계산과 절세 전략이 필요한 상황이에요. 아래 계산기로 예상 세금을 바로 확인해보세요."
        partialMatchText="조건이 일부 다를 수 있어요. 퇴직 전에 IRP 계좌 개설과 근속기간 계산을 미리 챙겨두세요."
      />

      <Divider />

      {/* H2-2: 계산 */}
      <H2>예상 퇴직소득세, 직접 계산해보세요</H2>
      <p style={body}>
        퇴직금 총액과 근속기간을 조정하면 예상 세금을 바로 볼 수 있어요.
        근속연수가 길수록 공제가 늘어나면서 세금이 크게 줄어드는 걸 숫자로 확인할 수 있어요.
      </p>
      <p style={body}>
        계산기는 근속연수공제·환산급여공제·지방소득세(10%)를 모두 반영한 추정값이에요.
        정확한 금액은 회사가 발급하는 퇴직소득원천징수영수증에 적혀 있어요.
      </p>

      <SectionBadge>퇴직소득세 추정 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 근속연수공제·환산급여공제 적용 추정값이에요. 지방소득세(10%) 포함 기준이에요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      {/* H2-3: 서류 */}
      <H2>세금 확인에 필요한 서류</H2>
      <p style={body}>
        퇴직 시 회사가 퇴직소득세를 대신 계산해서 원천징수해요.
        이때 발급되는 퇴직소득원천징수영수증이 가장 중요한 서류예요.
        근속연수공제, 환산급여, 최종 세액이 모두 적혀 있어요.
      </p>
      <p style={body}>
        영수증을 보고 근속기간이 잘못 기재됐거나 공제 항목에 오류가 있으면
        경정청구(5년 이내)로 환급받을 수 있어요.
        IRP 계좌로 퇴직금을 받으려면 퇴사 전 미리 개설해 인사팀에 계좌번호를 알려줘야 해요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      {/* H2-4: 절차 */}
      <H2>퇴직소득세 계산 4단계</H2>
      <p style={body}>
        회사 인사팀이 이 과정을 대신 계산해주지만, 직접 검증하고 싶다면 4단계 흐름을 알아두면 좋아요.
        특히 근속연수공제 금액이 제대로 반영됐는지 짚어보는 게 포인트예요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      {/* H2-5: 준비/주의사항 */}
      <H2>퇴직 전에 꼭 챙겨야 할 것들</H2>
      <p style={body}>
        IRP 계좌 미개설이 가장 흔한 실수예요.
        퇴직금이 300만원을 초과하면 IRP로만 받아야 하는 의무 이전 규정이 있어서,
        계좌 없이 퇴직하면 절차가 복잡해져요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="IRP 연금 수령 절세 핵심">
        55세 이후 연금 수령 시작 → 퇴직소득세 30% 감면<br />
        10년 초과 연금 수령 → 퇴직소득세 40% 감면<br />
        일시금 수령 → 감면 없이 전액 납부
      </GreenBox>

      <Divider />

      {/* H2-6: FAQ */}
      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 세금에서 실제로 자주 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 소득세법을 바탕으로 작성됐어요. 세법 개정이 있을 수 있으니, 최신 기준은 국세청(126) 또는 홈택스에서 직접 확인해봐요." />
    </ArticleLayout>
  );
}
