"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const currentSlug = "퇴직금-일시금-세금";

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직금을 일시금으로 받을 예정이에요" },
  { id: "c2", label: "근속기간이 10년 이상이에요" },
  { id: "c3", label: "퇴직금이 2,000만원 이상 예상돼요" },
  { id: "c4", label: "절세 방법을 알고 싶어요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "월 평균급여", min: 200, max: 800, step: 50, defaultValue: 350, format: (v: number) => `${v}만원` },
  { id: "years", label: "근속 기간", min: 1, max: 30, step: 1, defaultValue: 10, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "예상 퇴직금",
    getValue: (v: Record<string, number>) => v.salary * 10000 * v.years,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "예상 퇴직소득세 (근속공제 후)",
    getValue: (v: Record<string, number>) => {
      const total = v.salary * 10000 * v.years;
      // 근속연수공제: 5년이하 30만×년, 10년이하 50만×년, 20년이하 80만×년, 초과 120만×년
      let deduction = 0;
      if (v.years <= 5) deduction = 300000 * v.years;
      else if (v.years <= 10) deduction = 1500000 + 500000 * (v.years - 5);
      else if (v.years <= 20) deduction = 4000000 + 800000 * (v.years - 10);
      else deduction = 12000000 + 1200000 * (v.years - 20);
      const taxBase = Math.max(0, total - deduction);
      // 환산급여공제 및 세율 적용 (간략 추정)
      const annualTax = taxBase / v.years;
      let rate = 0;
      if (annualTax <= 14000000) rate = 0.06;
      else if (annualTax <= 50000000) rate = 0.15;
      else if (annualTax <= 88000000) rate = 0.24;
      else rate = 0.35;
      return Math.round(taxBase * rate * 0.5); // 퇴직소득 분리과세 50% 경감
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "퇴직소득 원천징수영수증", required: true, where: "회사 인사팀 발급" },
  { name: "근로계약서 (근속기간 확인용)", required: true, where: "회사 인사팀" },
  { name: "IRP 계좌 (선택)", required: false, where: "은행·증권사" },
  { name: "연금계좌 수령 신청서 (IRP 연금 선택 시)", required: false, where: "IRP 금융기관" },
];

const STEPS = [
  {
    title: "퇴직소득세 계산",
    desc: "회사 인사팀에서 퇴직소득 원천징수영수증을 발급해줘요. 근속연수 공제 후 세율을 적용해 세금이 결정돼요. 근속기간이 길수록 공제액이 커져서 세금이 줄어요.",
    tip: "근속 5년마다 공제 구간이 바뀌어 세금 차이가 커져요",
  },
  {
    title: "IRP 수령 vs 일시금 직접 수령 선택",
    desc: "퇴직금 300만원 초과 시 IRP 계좌로만 수령 가능해요. IRP에서 일시금으로 인출하면 퇴직소득세를 납부해요. 연금으로 10년 이상 수령하면 퇴직소득세를 30% 절감할 수 있어요.",
    tip: "IRP 연금 수령 선택 시 연금소득세 3.3~5.5%로 절세 가능",
  },
  {
    title: "원천징수 확인",
    desc: "회사가 퇴직금 지급 시 퇴직소득세를 원천징수하고 이미 납부해요. 별도 종합소득세 신고는 불필요해요. 퇴직소득은 분리과세라서 다른 소득과 합산되지 않아요.",
    tip: "원천징수영수증을 꼭 받아두세요 — 나중에 필요해요",
  },
  {
    title: "세금 환급 여부 확인",
    desc: "중간정산 이력이 있으면 정산 시점 근속기간으로 재계산해요. 세금을 더 냈다면 5월 종합소득세 신고로 환급받을 수 있어요. 퇴직소득공제 계산이 잘못된 경우도 경정청구로 환급 가능해요.",
    tip: "국세청 홈택스(www.hometax.go.kr)에서 퇴직소득세 자기검증 가능",
  },
];

const CHECKLIST = [
  "퇴직소득 원천징수영수증 — 인사팀에서 반드시 수령",
  "근속연수 공제 적용 확인 — 5·10·20년 구간별",
  "IRP 연금 수령 검토 — 퇴직소득세 30% 절감 가능",
  "중간정산 이력 있으면 재계산 여부 확인",
  "경정청구 기한 — 납부 후 5년 이내",
];

const FAQS = [
  {
    q: "퇴직금 일시금 수령 시 세금이 얼마나 나오나요?",
    a: "근속기간과 퇴직금 규모에 따라 달라요. 근속 10년에 퇴직금 3,500만원이라면 실제 세금은 수십만 원 수준이에요. 근속연수 공제가 크기 때문에 대부분 세율이 낮아요.",
  },
  {
    q: "퇴직금은 종합소득세에 포함되나요?",
    a: "아니에요. 퇴직소득은 분리과세라서 다른 소득(근로·사업·이자)과 합산하지 않아요. 별도로 퇴직소득세만 납부하면 돼요.",
  },
  {
    q: "IRP로 받으면 세금이 줄어드나요?",
    a: "IRP 계좌에 받는 것 자체로는 세금이 달라지지 않아요. 그 돈을 연금으로 10년 이상 수령하면 퇴직소득세의 30%를 감면받아요. 일시금으로 인출하면 동일하게 퇴직소득세를 내요.",
  },
  {
    q: "퇴직소득세는 회사가 알아서 내나요?",
    a: "맞아요. 회사가 퇴직금 지급 시 퇴직소득세를 원천징수하고 세무서에 납부해요. 별도 신고 없이 처리돼요. 다만 원천징수영수증은 꼭 받아두세요.",
  },
  {
    q: "근속 30년 이상이면 세금이 거의 없나요?",
    a: "근속공제가 크기 때문에 과세표준이 많이 줄어요. 근속 30년이면 공제액이 2,400만원 이상이에요. 퇴직금 규모에 따라 다르지만 세율이 낮게 적용돼요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "소득세법 제22조 — 퇴직소득 범위", url: "https://www.law.go.kr/법령/소득세법" },
      { label: "소득세법 제48조 — 퇴직소득공제", url: "https://www.law.go.kr/법령/소득세법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "국세청 — 퇴직소득세 계산 안내", url: "https://www.nts.go.kr" },
      { label: "홈택스 — 퇴직소득 원천징수 조회", url: "https://www.hometax.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-세금", title: "퇴직금 세금, 얼마나 떼나요?", description: "퇴직소득세 계산 구조를 정리했어요." },
  { slug: "퇴직금-IRP-수령방법", title: "퇴직금 IRP 수령 절차", description: "IRP 연금 절세 효과를 비교해요." },
  { slug: "퇴직금-세금-절세-방법-IRP-연말정산", title: "퇴직금 절세 방법", description: "IRP 연금 수령으로 세금 30% 아끼는 법." },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar items={퇴직금_SIDEBAR} currentSlug={currentSlug} />}
    >
      {/* 타이틀 */}
      <div style={{ marginBottom: 24 }}>
        <p style={{ ...body.badge, marginBottom: 8 }}>퇴직금 · 일시금 · 세금</p>
        <h1 style={body.h1}>
          퇴직금 일시금으로 받으면 세금이 얼마나 나오나요?
          <br />
          <span style={body.h1sub}>퇴직소득세 계산 구조부터 절세 방법까지</span>
        </h1>
      </div>

      {/* 인트로 */}
      <p style={body.prose}>
        퇴직금을 일시금으로 받을 때 가장 먼저 드는 의문이 "세금이 얼마나 나오지?"예요. 근속기간이 짧으면 부담스럽고, 길면 공제가 커서 생각보다 세금이 적게 나오죠.{" "}
        <a href="/w/퇴직금-세금" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직소득세</a>는
        일반 소득세와 계산 방식이 완전히 달라서, 구조를 알면 절세 여지도 보여요.
      </p>
      <p style={body.prose}>
        회사가 원천징수해서 알아서 처리해주긴 하지만, 공제가 제대로 적용됐는지는 직접 챙겨야 해요.
        퇴직소득 원천징수영수증을 받아서 근속연수 공제와 세액을 직접 대조해보는 게 중요해요.
        아래에서 계산 구조, 절세 방법, 필요 서류까지 순서대로 정리할게요.
      </p>

      <Divider />

      <ArticleAd position="intro" />

      {/* 섹션 1: 세금 계산 구조 */}
      <H2>퇴직금 일시금 세금, 어떻게 계산하나요?</H2>

      <p style={body.prose}>
        퇴직소득세는 근속기간 전체를 단번에 받는 특성을 반영해서 일반 소득세보다 훨씬 낮게 설계돼 있어요.{" "}
        <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }} target="_blank" rel="noopener noreferrer">소득세법 제48조</a>에서
        근속연수 공제를 정하고 있는데, 근속기간에 따라 수백만 원에서 수천만 원을 퇴직금에서 먼저 빼줘요.
        그 나머지에만 세율이 적용돼요.
      </p>

      <GreenBox>
        퇴직소득세 = 근속연수 공제 후 분리과세<br />
        · 5년 이하: 근속연수 × 30만원 공제<br />
        · 10년 이하: 150만원 + (근속연수-5) × 50만원<br />
        · 20년 이하: 400만원 + (근속연수-10) × 80만원<br />
        · 20년 초과: 1,200만원 + (근속연수-20) × 120만원
      </GreenBox>

      <p style={body.prose}>
        공제 이후에도 '환산급여공제'가 한 번 더 적용돼요. 퇴직소득을 연 단위로 나눠서 계산하는 방식이기 때문에,
        장기 근속자일수록 유리하게 설계돼 있어요. 두 번의 공제를 거치고 나면 최종 실질 세율은
        퇴직금의 5~10% 수준으로 낮아져요.
      </p>
      <p style={body.prose}>
        퇴직소득은 다른 소득과 합산되지 않는 분리과세예요. 연봉이 높아도 퇴직금 세금에는 영향이 없어요.
        근로소득세, 사업소득세와 완전히 별개로 계산돼요.
      </p>

      <Divider />

      {/* 섹션 2: 계산기 */}
      <H2>내 퇴직금에 세금이 얼마나 붙나요?</H2>

      <p style={body.prose}>
        월 평균급여와 근속기간을 입력하면 퇴직금과 예상 세금을 바로 확인할 수 있어요.
        실제 세금은 환산급여공제 계산이 별도로 있어서 아래 수치는 참고용이에요.
        정확한 금액은{" "}
        <a href="https://www.hometax.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }} target="_blank" rel="noopener noreferrer">국세청 홈택스</a>에서
        퇴직소득세 모의계산 메뉴로 확인하는 게 맞아요.
      </p>

      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 실제 세금은 근속연수공제+환산급여공제 적용 후 결정돼요. 홈택스 모의계산으로 정확히 확인하세요."
      />

      <p style={body.prose}>
        근속기간을 늘려보면 세금 항목 숫자가 줄어드는 걸 볼 수 있어요.
        같은 퇴직금이라도 10년 근속과 20년 근속의 세금 차이가 크게 나요. 이게 근속연수 공제의 효과예요.
        퇴직이 가까운 분이라면 근속기간을 한두 해 더 채우는 게 세금 면에서도 차이를 만들어줘요.
      </p>

      <CategoryButton href="/w/퇴직금" label="퇴직금 가이드 전체 보기" />

      <RelatedArticles articles={RELATED} />

      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3: 필요 서류 */}
      <H2>퇴직금 수령 시 필요한 서류</H2>

      <p style={body.prose}>
        퇴직소득세는 회사가 원천징수하지만, 이게 제대로 됐는지 확인하려면 원천징수영수증이 꼭 있어야 해요.
        퇴직할 때 인사팀에 요청하면 발급해줘요. 퇴직 후에도 재발급 요청이 가능해요.
      </p>

      <DocTable docs={DOCS} />

      <p style={body.prose}>
        IRP 계좌는 퇴직금 300만원 초과 시 의무적으로 개설해야 해요.
        이미 IRP 계좌가 있으면 그 계좌로 받으면 되고, 없으면 은행이나 증권사에서 개설하면 돼요.
        IRP 연금 수령을 선택할 생각이라면 연금계좌 수령 신청서도 함께 준비해야 해요.
      </p>
      <p style={body.prose}>
        서류가 많아 보여도 필수는 원천징수영수증과 근로계약서 두 가지예요.
        나머지는 IRP 연금 절세를 선택할 때만 필요해요.
        우선 퇴직하면서 원천징수영수증부터 챙기는 게 가장 중요해요.
      </p>

      <Divider />

      {/* 섹션 4: 수령 절차 */}
      <H2>퇴직금 일시금 수령 절차</H2>

      <p style={body.prose}>
        퇴직금 수령 과정에서 세금 관련 선택을 두 번 해야 해요.
        첫 번째는 IRP로 받을지 직접 일시금으로 받을지, 두 번째는 IRP에 들어온 돈을 연금으로 받을지
        일시금으로 인출할지예요. 이 선택에 따라 최종 세금이 달라질 수 있어요.
      </p>

      <Steps steps={STEPS} />

      <p style={body.prose}>
        세금 환급 여부 확인은 놓치기 쉬운 단계예요.
        특히 중간정산 이력이 있거나, 근속기간 계산에 오류가 있었던 경우라면 납부한 세금을 돌려받을 수 있어요.
        경정청구 기한이 5년이라서 급하지 않지만, 이왕이면 퇴직 직후에 챙기는 게 편해요.
      </p>

      <Divider />

      {/* 섹션 5: 체크리스트 */}
      <H2>세금 관련 체크리스트</H2>

      <p style={body.prose}>
        퇴직 전후로 해야 할 세금 관련 항목들을 정리했어요.
        회사가 알아서 처리해주는 부분도 있지만, 내가 직접 챙겨야 하는 것도 있어요.
        하나씩 체크해두면 나중에 후회할 일이 없어요.
      </p>

      <Checklist items={CHECKLIST} />

      <GreenBox>
        IRP 연금 수령으로 30% 절세 가능해요<br />
        · 55세 이후 연금 수령 시 퇴직소득세 30% 감면<br />
        · 10년 초과 수령하면 최대 40% 추가 감면 (총 최대 60%)<br />
        · 일시금 인출 시 감면 없음 — 연금 수령이 핵심이에요
      </GreenBox>

      <p style={body.prose}>
        IRP 연금 절세는 퇴직금 규모가 클수록 효과가 커요.
        퇴직금이 5,000만원 이상이고 55세까지 시간 여유가 있다면 연금 수령 방식을 검토해볼 만해요.
        단순히 세금 30%를 아끼는 게 아니라, 수십만 원에서 수백만 원의 실제 차이가 날 수 있거든요.
      </p>

      <EligibilityChecker
        title="IRP 절세 해당 여부 확인"
        items={CHECK_ITEMS}
      />

      <Divider />

      {/* 섹션 6: FAQ */}
      <H2>자주 묻는 것들</H2>

      <FAQ items={FAQS} />

      <References items={REFERENCES} />

      <Disclaimer />
    </ArticleLayout>
  );
}
