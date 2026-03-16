"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "IRP에 받은 퇴직금을 연금으로 전환하고 싶어요" },
  { id: "c2", label: "55세 이상이에요" },
  { id: "c3", label: "세금을 줄이는 방법으로 수령하고 싶어요" },
  { id: "c4", label: "연금 수령 기간과 금액을 미리 계산해보고 싶어요" },
];

const CALC_SLIDERS = [
  { id: "balance", label: "IRP 잔액", min: 1000, max: 20000, step: 500, defaultValue: 5000, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "period", label: "연금 수령 기간", min: 10, max: 30, step: 1, defaultValue: 10, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "연간 연금 수령액 (원금 기준)",
    getValue: (v: Record<string, number>) => Math.round(v.balance * 10000 / v.period),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원/년`,
    highlight: true,
  },
  {
    label: "월 연금 수령액",
    getValue: (v: Record<string, number>) => Math.round(v.balance * 10000 / v.period / 12),
    format: (v: number) => `약 ${Math.round(v / 10000 * 10) / 10}만원/월`,
  },
];

const DOCS = [
  { name: "IRP 계좌 (퇴직금 수령 후)", required: true, where: "은행·증권사" },
  { name: "연금 수령 신청서", required: true, where: "IRP 금융기관 앱 또는 방문" },
  { name: "신분증", required: true, where: "본인 지참" },
  { name: "주민등록등본 (만 55세 이상 확인)", required: false, where: "정부24에서 무료 발급" },
];

const STEPS = [
  {
    title: "IRP 연금 수령 요건 확인",
    desc: "IRP에서 연금으로 수령하려면 만 55세 이상이어야 해요. 가입 기간이 5년 이상이어야 하는 조건도 있어요. 퇴직금이 IRP에 들어온 경우, 55세 이후 언제든지 연금 수령 신청이 가능해요.",
    tip: "55세 이전에는 일시금 인출만 가능 (기타소득세 16.5% 부과)",
  },
  {
    title: "연금 수령 기간 설정",
    desc: "연금 수령 기간은 최소 10년 이상으로 설정해야 퇴직소득세 30% 절감 혜택을 받아요. 기간이 길수록 월 수령액이 줄지만 세금도 줄어요. 금융기관 앱에서 수령 기간과 금액을 미리 시뮬레이션할 수 있어요.",
    tip: "10년 이상 수령 시 퇴직소득세 30% 절감, 20년 이상 시 40% 절감",
  },
  {
    title: "연금 수령 신청",
    desc: "IRP 금융기관 앱 또는 방문 신청으로 연금 전환을 신청해요. 연금 수령 시작일, 수령 방식(매월·매분기 등), 금액을 설정해요. 개시 후에도 중도 변경이 가능해요.",
    tip: "앱에서 10분이면 신청 가능해요",
  },
  {
    title: "연금 수령 및 세금 납부",
    desc: "매월 또는 분기별로 연금이 지급돼요. 연금 수령 시 연금소득세(3.3~5.5%)가 원천징수돼요. 퇴직소득세 30% 절감 효과도 자동 적용돼요.",
    tip: "연금소득이 연 1,500만원 초과 시 종합소득세 신고 대상",
  },
];

const CHECKLIST = [
  "만 55세 이상 + IRP 가입 5년 이상 — 연금 수령 요건",
  "연금 수령 기간 10년 이상 — 퇴직소득세 30% 절감",
  "IRP 금융기관 앱에서 신청 — 10분 내 완료",
  "연금소득세 3.3~5.5% — 자동 원천징수",
  "연 1,500만원 초과 시 — 종합소득세 신고 필요",
];

const FAQS = [
  {
    q: "퇴직금을 연금으로 받으면 세금이 얼마나 절약되나요?",
    a: "10년 이상 연금으로 수령하면 퇴직소득세의 30%를 절감해요. 예를 들어 퇴직소득세 300만원이라면 연금 수령 시 210만원만 내면 돼요. 20년 이상 수령 시 40% 절감이에요.",
  },
  {
    q: "55세 이전에 퇴직금을 연금으로 받을 수 있나요?",
    a: "55세 이전에는 연금 수령이 불가해요. IRP에서 일시금으로 인출하면 기타소득세 16.5%가 부과돼요. 55세까지 기다리거나 연금저축계좌로 이전하는 방법이 있어요.",
  },
  {
    q: "연금 수령 중 갑자기 돈이 필요하면 인출할 수 있나요?",
    a: "연금 수령 중에도 중도 인출이 가능해요. 하지만 인출 금액에 대해 퇴직소득세 절감 혜택이 취소될 수 있어요. 필요한 경우만 부분 인출하는 게 좋아요.",
  },
  {
    q: "IRP 연금과 국민연금을 동시에 받을 수 있나요?",
    a: "맞아요. IRP 연금과 국민연금은 별개예요. 두 가지를 합산해서 노후 소득을 구성할 수 있어요. 연금소득 합산액이 연 1,500만원을 초과하면 종합소득세 신고를 해야 해요.",
  },
  {
    q: "연금 수령 기간을 10년으로 하면 매월 얼마를 받나요?",
    a: "IRP 잔액이 5,000만원이라면 10년 수령 시 연 약 500만원, 월 약 41만원이에요. 운용 수익이 있으면 더 받을 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "소득세법 제20조의3 — 연금소득 과세", url: "https://www.law.go.kr/법령/소득세법" },
      { label: "근로자퇴직급여보장법 제7조 — IRP 운용 규정", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "금융감독원 — IRP 연금 수령 안내", url: "https://www.fss.or.kr" },
      { label: "국세청 — 연금소득 과세 안내", url: "https://www.nts.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-IRP-수령방법", title: "퇴직금 IRP 수령 절차", description: "IRP 계좌로 퇴직금 받는 4단계." },
  { slug: "퇴직금-세금-절세-방법-IRP-연말정산", title: "퇴직금 절세 방법", description: "연금 수령으로 세금 줄이는 법." },
  { slug: "퇴직금-일시금-세금", title: "퇴직금 일시금 세금", description: "일시금 vs 연금 세금 비교." },
];

export default function Page() {
  const currentSlug = "퇴직금-연금-전환";

  const sidebar = <Sidebar data={퇴직금_SIDEBAR} currentSlug={currentSlug} />;

  return (
    <ArticleLayout sidebar={sidebar}>
      {/* Breadcrumb */}
      <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 12 }}>
        퇴직금 · 연금전환 · 절세
      </div>

      {/* H1 */}
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.4, color: "#111827", marginBottom: 8 }}>
        퇴직금을 연금으로 받으면 세금이 얼마나 줄어드나요?
      </h1>
      <p style={{ fontSize: 17, color: "#374151", fontWeight: 500, marginBottom: 20 }}>
        IRP 연금 전환 절차와 퇴직소득세 30% 절감 방법
      </p>

      {/* Intro */}
      <p style={{ ...body, marginBottom: 12 }}>
        퇴직금을 IRP 계좌로 받았다면 그냥 일시금으로 꺼내지 마세요. 연금으로 전환하면 퇴직소득세를 최대 40%까지 줄일 수 있어요. 퇴직소득세가 300만원이라면 연금 수령으로 210만원만 내면 되는 거죠.
      </p>
      <p style={{ ...body, marginBottom: 12 }}>
        IRP 연금 수령의 핵심 요건은 두 가지예요. 만 55세 이상이어야 하고, IRP 가입 기간이 5년을 넘어야 해요. 퇴직금이 IRP로 입금된 경우 가입 기간 요건은 퇴직금 납입 시점부터 계산해요.
      </p>
      <p style={{ ...body, marginBottom: 20 }}>
        수령 기간을 10년 이상으로 설정하면 퇴직소득세 30% 절감, 20년 이상이면 40% 절감이에요. 월 수령액이 줄어드는 대신 세금 부담이 크게 낮아지는 구조예요. 지금부터 단계별로 정리해드릴게요.
      </p>

      <ArticleAd position="intro" />

      {/* H2-1 */}
      <H2>IRP 연금으로 받으면 세금이 얼마나 줄어드나요?</H2>
      <p style={{ ...body, marginBottom: 12 }}>
        퇴직금을 일시금으로 받으면 퇴직소득세를 100% 내야 해요. 반면 IRP에서 연금으로 수령하면 <a href="/w/퇴직금-세금-절세-방법-IRP-연말정산" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직소득세가 자동으로 줄어드는 혜택</a>이 붙어요. 수령 기간이 길수록 절감 폭이 커지는 구조예요.
      </p>
      <p style={{ ...body, marginBottom: 16 }}>
        연금 수령 기간 10년 이상이면 퇴직소득세의 30%를 깎아줘요. 20년 이상이면 40%예요. 퇴직소득세 500만원짜리 퇴직금이라면 10년 수령 시 350만원, 20년 수령 시 300만원만 내면 되는 거예요. 이 절감분은 따로 신청하지 않아도 자동 적용돼요.
      </p>

      <GreenBox>
        <strong>퇴직소득세 절감률 한눈에 보기</strong><br />
        · 10년 이상 연금 수령 → 퇴직소득세 <strong>30% 절감</strong><br />
        · 20년 이상 연금 수령 → 퇴직소득세 <strong>40% 절감</strong><br />
        · 연금 수령 시 과세: 연금소득세 3.3~5.5% (나이에 따라 다름)<br />
        · 55세 이전 일시금 인출 시: 기타소득세 16.5% 부과
      </GreenBox>

      <p style={{ ...body, marginTop: 12, marginBottom: 20 }}>
        연금 수령 중에는 매월 연금소득세(3.3~5.5%)가 원천징수돼요. 만 70세 미만은 5.5%, 70~80세는 4.4%, 80세 이상은 3.3%예요. 퇴직소득세 절감 혜택까지 합치면 일시금보다 세 부담이 크게 낮아요.
      </p>

      <CategoryButton slug="퇴직금" label="퇴직금 전체 가이드 보기" />
      <RelatedArticles items={RELATED} />

      <Divider />

      {/* H2-2 */}
      <H2>연금 수령액 미리 계산해보세요</H2>
      <p style={{ ...body, marginBottom: 12 }}>
        IRP 잔액과 수령 기간을 입력하면 연 수령액과 월 수령액을 바로 볼 수 있어요. 아래 계산기는 원금 기준이라 실제 운용 수익이 더해지면 수령액이 늘어요.
      </p>
      <p style={{ ...body, marginBottom: 16 }}>
        수령 기간을 10년에서 20년으로 늘리면 월 수령액은 절반이 되지만 퇴직소득세 절감은 30%에서 40%로 늘어요. 노후 생활비가 넉넉하다면 기간을 길게 잡는 게 세금 측면에서 유리해요.
      </p>

      <Calculator sliders={CALC_SLIDERS} results={CALC_RESULTS} />

      <p style={{ ...body, marginTop: 16, marginBottom: 20 }}>
        계산기는 단순 원금 분할 기준이에요. 실제 IRP 연금은 운용 수익이 붙기 때문에 금융기관 앱에서 정확한 예상 수령액을 시뮬레이션해볼 수 있어요.
      </p>

      <ArticleAd position="mid" />

      <Divider />

      {/* H2-3 */}
      <H2>연금 신청에 필요한 서류</H2>
      <p style={{ ...body, marginBottom: 12 }}>
        IRP 연금 수령 신청은 서류가 많지 않아요. 대부분 금융기관 앱에서 비대면으로 처리할 수 있고, 방문이 필요한 경우도 준비 서류가 간단해요.
      </p>
      <p style={{ ...body, marginBottom: 16 }}>
        주민등록등본은 만 55세 이상 확인용으로 필요할 수 있어요. 정부24에서 무료로 발급받을 수 있고, 앱 신청 시에는 본인인증으로 대체되는 경우가 많아요.
      </p>

      <DocTable docs={DOCS} />

      <p style={{ ...body, marginTop: 16, marginBottom: 20 }}>
        연금 수령 신청서는 IRP를 개설한 금융기관에서 양식을 제공해요. 수령 시작일, 수령 주기(매월·매분기·매년), 수령 금액 또는 기간을 함께 기재해야 해요.
      </p>

      <Divider />

      {/* H2-4 */}
      <H2>IRP 연금 전환 절차 4단계</H2>
      <p style={{ ...body, marginBottom: 12 }}>
        IRP 연금 전환은 4단계로 진행돼요. 요건 확인부터 실제 수령까지 순서대로 따라가면 헷갈리지 않아요. 앱에서 진행하면 1~3단계를 한 번에 처리할 수 있어요.
      </p>
      <p style={{ ...body, marginBottom: 16 }}>
        신청 이후에도 수령 기간이나 금액을 변경할 수 있으니 처음부터 완벽하게 설정하지 않아도 돼요. 단, 퇴직소득세 절감 요건인 10년 이상은 반드시 지켜야 해요.
      </p>

      <Steps steps={STEPS} />

      <p style={{ ...body, marginTop: 16, marginBottom: 20 }}>
        연금 수령을 시작한 뒤에도 <a href="/w/퇴직금-IRP-수령방법" style={{ color: "#1D9E75", textDecoration: "underline" }}>IRP 계좌 관리</a>는 계속 필요해요. 잔액을 어떤 상품으로 운용하느냐에 따라 실제 수령액이 달라지거든요. 예금, ETF, 채권 등으로 분산해두는 게 일반적이에요.
      </p>

      <Divider />

      {/* H2-5 */}
      <H2>연금 전환 체크리스트</H2>
      <p style={{ ...body, marginBottom: 12 }}>
        연금 전환 전에 아래 항목을 하나씩 짚어보세요. 요건이 충족되지 않으면 원하는 세금 혜택을 못 받을 수 있어요.
      </p>
      <p style={{ ...body, marginBottom: 16 }}>
        특히 연금소득이 연 1,500만원을 넘으면 종합소득세 신고 대상이 돼요. IRP 연금 외에 국민연금, 개인연금까지 합산해서 계산해야 하니 미리 파악해두는 게 좋아요.
      </p>

      <Checklist items={CHECKLIST} />

      <GreenBox style={{ marginTop: 16 }}>
        <strong>연금소득 합산 주의사항</strong><br />
        IRP 연금 + 국민연금 + 연금저축 합산액이 연 1,500만원을 넘으면 종합소득세 신고 대상이에요. 초과분에 대해 종합소득세율(6~45%)이 적용돼요. 연금 수령 금액 설계 시 이 기준선을 고려하는 게 좋아요.
      </GreenBox>

      <p style={{ ...body, marginTop: 16, marginBottom: 20 }}>
        종합소득세 신고가 걱정된다면 <a href="/w/퇴직금-일시금-세금" style={{ color: "#1D9E75", textDecoration: "underline" }}>일시금 수령과 세금 비교</a>를 먼저 해보세요. 퇴직소득 규모와 다른 소득 상황에 따라 유리한 선택이 달라질 수 있어요.
      </p>

      <Divider />

      {/* H2-6 */}
      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 16 }}>
        IRP 연금 전환 관련해서 가장 많이 물어보는 질문들이에요. 내 상황에 맞는 답을 찾아보세요.
      </p>

      <FAQ items={FAQS} />

      <Divider />

      <References data={REFERENCES} />
      <Disclaimer />
    </ArticleLayout>
  );
}
