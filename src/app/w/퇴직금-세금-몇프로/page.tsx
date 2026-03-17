"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직금을 받을 예정이거나 이미 받았어요" },
  { id: "c2", label: "근속기간이 5년 이상이에요" },
  { id: "c3", label: "퇴직소득원천징수영수증을 받았어요" },
  { id: "c4", label: "IRP 계좌가 있어요" },
];

const CALC_SLIDERS = [
  { id: "amount", label: "퇴직금 총액", min: 500, max: 10000, step: 100, defaultValue: 3000, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "years", label: "근속 기간", min: 1, max: 35, step: 1, defaultValue: 10, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "퇴직소득세 추정",
    getValue: (v: Record<string, number>) => {
      const deduction = Math.min(v.years, 5) * 300000 +
        Math.max(0, Math.min(v.years - 5, 5)) * 500000 +
        Math.max(0, Math.min(v.years - 10, 10)) * 800000 +
        Math.max(0, v.years - 20) * 1200000;
      const taxableIncome = Math.max(0, v.amount * 10000 - deduction);
      const annualizedIncome = (taxableIncome * 12) / v.years;
      const annualizedDeduction = annualizedIncome <= 8000000 ? annualizedIncome * 0.6 :
        annualizedIncome <= 70000000 ? 4800000 + (annualizedIncome - 8000000) * 0.55 :
        annualizedIncome <= 120000000 ? 38950000 + (annualizedIncome - 70000000) * 0.45 :
        61450000 + (annualizedIncome - 120000000) * 0.35;
      const taxableAnnualized = Math.max(0, annualizedIncome - annualizedDeduction);
      const annualTax = taxableAnnualized <= 14000000 ? taxableAnnualized * 0.06 :
        taxableAnnualized <= 50000000 ? 840000 + (taxableAnnualized - 14000000) * 0.15 :
        taxableAnnualized <= 88000000 ? 6240000 + (taxableAnnualized - 50000000) * 0.24 :
        15360000 + (taxableAnnualized - 88000000) * 0.35;
      return Math.round((annualTax / 12) * v.years * 1.1);
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "세후 실수령액 추정",
    getValue: (v: Record<string, number>) => {
      const deduction = Math.min(v.years, 5) * 300000 +
        Math.max(0, Math.min(v.years - 5, 5)) * 500000 +
        Math.max(0, Math.min(v.years - 10, 10)) * 800000 +
        Math.max(0, v.years - 20) * 1200000;
      const taxableIncome = Math.max(0, v.amount * 10000 - deduction);
      const annualizedIncome = (taxableIncome * 12) / v.years;
      const annualizedDeduction = annualizedIncome <= 8000000 ? annualizedIncome * 0.6 :
        annualizedIncome <= 70000000 ? 4800000 + (annualizedIncome - 8000000) * 0.55 :
        annualizedIncome <= 120000000 ? 38950000 + (annualizedIncome - 70000000) * 0.45 :
        61450000 + (annualizedIncome - 120000000) * 0.35;
      const taxableAnnualized = Math.max(0, annualizedIncome - annualizedDeduction);
      const annualTax = taxableAnnualized <= 14000000 ? taxableAnnualized * 0.06 :
        taxableAnnualized <= 50000000 ? 840000 + (taxableAnnualized - 14000000) * 0.15 :
        taxableAnnualized <= 88000000 ? 6240000 + (taxableAnnualized - 50000000) * 0.24 :
        15360000 + (taxableAnnualized - 88000000) * 0.35;
      const tax = Math.round((annualTax / 12) * v.years * 1.1);
      return v.amount * 10000 - tax;
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "퇴직소득원천징수영수증", required: true, where: "회사 인사팀 (퇴직 시 발급)" },
  { name: "근로계약서 (입사일 확인)", required: true, where: "인사팀 또는 입사 시 수령본" },
  { name: "급여명세서 (최근 3개월)", required: false, where: "인사팀" },
  { name: "IRP 계좌 개설 서류", required: false, where: "IRP 개설 금융기관" },
];

const STEPS = [
  {
    title: "근속연수공제 계산",
    desc: "퇴직금에서 근속연수공제를 먼저 빼요. 5년 이하 1년당 30만원, 5~10년 1년당 50만원, 10~20년 1년당 80만원, 20년 초과 1년당 120만원이에요. 10년 근속이면 공제액이 700만원이에요. 근속기간이 길수록 공제가 커져요.",
    tip: "근속연수 계산 시 입사일부터 퇴직일까지 정확히 계산해요",
  },
  {
    title: "환산급여 계산",
    desc: "근속연수공제 후 퇴직소득에 12를 곱하고 근속연수로 나눠요. 이게 환산급여예요. 장기 근속을 연봉으로 환산한 개념이라서, 근속기간이 길수록 이 값이 낮아져요.",
    tip: "퇴직소득 × 12 ÷ 근속연수 = 환산급여",
  },
  {
    title: "환산급여공제 적용",
    desc: "환산급여에서 다시 환산급여공제를 빼요. 환산급여 8,000만원 이하 구간에서 55~60%를 공제해요. 이 두 단계 공제 덕분에 실질 세율이 크게 낮아지는 거예요.",
    tip: "국세청 홈택스 퇴직소득세 계산기로 정확한 금액 확인 가능해요",
  },
  {
    title: "소득세율 적용 후 환산",
    desc: "환산급여공제 후 금액에 일반 소득세율(6~45%)을 적용해 세액을 구해요. 그다음 다시 근속연수로 나눠서 실제 내야 할 퇴직소득세가 나와요. 회사가 이 과정을 대신해서 원천징수해요.",
    tip: "원천징수영수증으로 최종 세금을 반드시 확인하세요",
  },
];

const CHECKLIST = [
  "근속연수공제: 근속기간 정확히 계산 (일 단위)",
  "IRP 계좌: 퇴직 전 미리 개설",
  "연금 수령 선택: 55세 이후 10년+ → 퇴직소득세 30~40% 감면",
  "원천징수영수증: 회사 발급 확인 및 보관",
  "경정청구: 세금 초과 납부 시 5년 이내 환급 신청 가능",
];

const FAQS = [
  {
    q: "퇴직금 세금이 정확히 몇 퍼센트인가요?",
    a: "정해진 퍼센트가 없어요. 근속연수공제와 환산급여공제 두 단계를 거쳐서 실질 세율이 정해지거든요. 근속 10년에 퇴직금 3,000만원이면 실질 세율이 3~5%대예요.",
  },
  {
    q: "퇴직금 세금은 회사에서 알아서 떼나요?",
    a: "맞아요. 회사가 퇴직 시 원천징수하고 세무서에 납부해요. 퇴직소득원천징수영수증으로 확인할 수 있어요.",
  },
  {
    q: "IRP로 받으면 세금을 안 내도 되나요?",
    a: "지금 당장은 안 내요. IRP로 이체되면 세금이 유예되고, 나중에 인출할 때 내요. 55세 이후 10년 이상 연금으로 받으면 30~40% 감면 혜택이 있어요.",
  },
  {
    q: "퇴직금에 건강보험료도 붙나요?",
    a: "퇴직소득은 건강보험료 부과 대상이 아니에요. 퇴직소득세(지방소득세 포함)만 납부하면 돼요.",
  },
  {
    q: "세금이 너무 많이 나온 것 같으면 어떻게 하나요?",
    a: "원천징수영수증을 꺼내서 근속연수공제가 맞게 적용됐는지 확인해요. 오류가 있으면 경정청구(5년 이내)로 환급받을 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "소득세법 제22조: 퇴직소득", url: "https://www.law.go.kr/법령/소득세법" },
      { label: "소득세법 제48조: 퇴직소득공제", url: "https://www.law.go.kr/법령/소득세법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "국세청: 퇴직소득세 안내", url: "https://www.nts.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-세금-절세-방법-IRP-연말정산", title: "퇴직금 세금 줄이는 방법", description: "IRP와 연말정산 활용한 절세 전략이에요." },
  { slug: "퇴직금-세금-환급", title: "퇴직금 세금 환급 방법", description: "초과 납부 시 환급받는 방법이에요." },
  { slug: "퇴직금-계산법", title: "퇴직금 계산기", description: "월급·근속기간으로 금액 바로 확인해요." },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-세금-몇프로" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 세금 · 퇴직소득세</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 세금, 몇 퍼센트나 나가나요?<br />
        퇴직소득세 계산 공식과 IRP 절세 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금 3,000만원을 받으면 세금이 얼마나 빠질지 걱정되죠? 좋은 소식이 있어요.
        퇴직소득세는 일반 근로소득세와 달리{" "}
        <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법 제22조</a>에
        따라 근속연수공제와 환산급여공제 두 단계를 거쳐요.
        근속 10년에 퇴직금 3,000만원이면 실질 세율이 3~5%대예요.
        IRP로 받아 연금 수령하면 여기서 30~40%를 더 줄일 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>퇴직금 세금, 일반 급여와 왜 다른가요?</H2>
      <p style={body}>
        퇴직금은 수십 년 일한 대가를 한 번에 받는 돈이에요. 이걸 그 해 소득으로 잡으면 세율이 너무 높아지기 때문에
        소득세법은 퇴직소득에만 특별 계산 구조를 적용해요.
        핵심은 두 단계 공제예요. 먼저 근속연수공제로 과세표준을 낮추고, 다시 환산급여공제로 한 번 더 낮춰요.
      </p>
      <p style={body}>
        예를 들어 근속 10년에 퇴직금 3,000만원이면, 근속연수공제 700만원을 빼고 나서 환산급여로 전환해
        다시 공제를 적용해요. 같은 금액이어도 근속 5년과 15년의 세금이 두 배 이상 차이 나는 이유가 여기에 있어요.
      </p>

      <GreenBox title="퇴직소득세 구조 요약">
        근속연수공제 (최대 1년당 120만원) → 과세표준 감소<br />
        환산급여공제 (60% 수준) → 세율 적용 기준 대폭 하락<br />
        실질 세율: 근속 10년·3,000만원 기준 약 3~5%대
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="퇴직소득세 계산과 절세 전략이 필요한 상황이에요. 아래 계산기로 예상 세금을 확인해보세요."
        partialMatchText="아직 준비 중인 항목이 있어요. 퇴직 전에 IRP 계좌 개설과 원천징수영수증 확인을 챙겨두세요."
      />

      <Divider />

      <H2>예상 퇴직소득세, 직접 계산해보세요</H2>
      <p style={body}>
        퇴직금 총액과 근속기간을 조정하면 예상 세금을 바로 볼 수 있어요.
        근속연수가 길수록 공제가 늘어나면서 세금이 크게 줄어드는 걸 숫자로 확인할 수 있어요.
      </p>
      <p style={body}>
        계산기는 단순화된 추정값이에요. 정확한 금액은 회사가 퇴직 시 발급하는 퇴직소득원천징수영수증에서 확인하세요.
        지방소득세(소득세의 10%)도 추가되니 실제 납부액은 계산기 결과보다 약 10% 높아요.
      </p>

      <SectionBadge>퇴직소득세 추정 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 근속연수공제·환산급여공제 적용 추정값이에요. 지방소득세(10%) 포함 시 실제 납부액이 더 높아요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>세금 확인에 필요한 서류</H2>
      <p style={body}>
        퇴직 시 회사가 퇴직소득세를 대신 계산해서 원천징수해요. 이때 발급되는 퇴직소득원천징수영수증이 가장 중요한 서류예요.
        이 영수증에 근속연수공제, 환산급여, 최종 세액이 모두 적혀 있어요.
      </p>
      <p style={body}>
        영수증을 보고 근속기간 계산이 틀렸거나 공제 항목이 잘못됐다면 경정청구(5년 이내)로 환급받을 수 있어요.
        IRP 계좌로 퇴직금을 받으려면 퇴사 전에 미리 개설해두고 인사팀에 계좌번호를 알려줘야 해요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>퇴직소득세 계산 4단계</H2>
      <p style={body}>
        회사 인사팀이 이 과정을 대신 계산해주지만, 직접 검증하고 싶다면 4단계 흐름을 알아두면 좋아요.
        특히 근속연수공제 금액이 제대로 반영됐는지 확인하는 게 중요해요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>퇴직 전 세금 체크리스트</H2>
      <p style={body}>
        퇴직 전에 챙겨야 할 항목이에요. IRP 계좌 미개설이 가장 흔한 실수예요.
        퇴직금이 300만원을 초과하면 IRP로만 받아야 해서, 계좌 없이 퇴직하면 절차가 복잡해져요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="IRP 연금 수령 절세 핵심">
        55세 이후 연금 수령 → 퇴직소득세 30% 감면<br />
        10년 초과 연금 수령 → 퇴직소득세 40% 감면<br />
        일시금 수령 → 감면 없이 전액 납부
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 세금에서 실제로 자주 나오는 질문이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 소득세법을 바탕으로 작성됐어요. 세법 개정이 있을 수 있으니, 최신 기준은 국세청(126) 또는 홈택스에서 확인하세요." />
    </ArticleLayout>
  );
}
