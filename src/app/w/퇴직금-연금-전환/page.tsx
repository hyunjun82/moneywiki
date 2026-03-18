"use client";
import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "IRP 계좌에 퇴직금이 입금된 상태예요" },
  { id: "c2", label: "만 55세 이상이에요" },
  { id: "c3", label: "IRP 가입 기간이 5년 이상이에요" },
  { id: "c4", label: "연금 수령을 10년 이상으로 설정할 계획이에요" },
];

const CALC_SLIDERS = [
  {
    id: "balance",
    label: "IRP 잔액",
    min: 1000,
    max: 30000,
    step: 500,
    defaultValue: 5000,
    format: (v: number) => `${v.toLocaleString()}만원`,
  },
  {
    id: "period",
    label: "연금 수령 기간",
    min: 10,
    max: 30,
    step: 1,
    defaultValue: 10,
    format: (v: number) => `${v}년`,
  },
];

const CALC_RESULTS = [
  {
    label: "연간 연금 수령액 (원금 기준)",
    getValue: (v: Record<string, number>) =>
      Math.round((v.balance * 10000) / v.period),
    format: (v: number) =>
      `약 ${Math.round(v / 10000).toLocaleString()}만원/년`,
    highlight: true,
  },
  {
    label: "월 연금 수령액",
    getValue: (v: Record<string, number>) =>
      Math.round((v.balance * 10000) / v.period / 12),
    format: (v: number) =>
      `약 ${(Math.round(v / 1000) / 10).toFixed(1)}만원/월`,
  },
  {
    label: "퇴직소득세 절감 효과 (30%)",
    getValue: (v: Record<string, number>) => {
      const income = v.balance * 10000;
      const roughTax = Math.round(income * 0.07);
      return Math.round(roughTax * 0.3);
    },
    format: (v: number) =>
      `약 ${Math.round(v / 10000).toLocaleString()}만원 절감 (추정)`,
  },
];

const DOCS = [
  { name: "IRP 계좌 (퇴직금 입금 확인)", required: true, where: "은행·증권사 앱" },
  { name: "연금 수령 신청서", required: true, where: "IRP 금융기관 앱 또는 방문" },
  { name: "신분증 (주민등록증·운전면허증)", required: true, where: "본인 지참" },
  { name: "주민등록등본 (만 55세 이상 확인용)", required: false, where: "정부24 무료 발급" },
];

const STEPS = [
  {
    title: "연금 수령 요건 확인",
    desc: "IRP에서 연금으로 받으려면 만 55세 이상 + IRP 가입 기간 5년 이상 두 조건을 모두 충족해야 해요. 퇴직금이 IRP로 입금된 경우 55세가 되는 시점부터 연금 전환 신청이 가능해요. 55세 이전에 인출하면 기타소득세 16.5%가 부과돼요.",
    tip: "55세 이전 중도 인출 시 기타소득세 16.5% 부과 — 가능하면 기다리는 게 유리해요",
  },
  {
    title: "수령 기간 설정 (10년 이상 권장)",
    desc: "연금 수령 기간을 10년 이상으로 설정하면 퇴직소득세 30%를 절감할 수 있어요. 20년 이상으로 늘리면 40% 절감이에요. 10년 수령과 20년 수령은 절세액 차이가 10%포인트인데, 월 수령액은 절반으로 줄어요. 생활비 계획에 맞게 결정하세요.",
    tip: "10년 이상 수령 → 퇴직소득세 30% 절감 / 20년 이상 수령 → 40% 절감",
  },
  {
    title: "금융기관 앱에서 연금 전환 신청",
    desc: "IRP를 개설한 은행·증권사 앱에서 '연금 수령 신청'을 선택하면 돼요. 연금 개시일, 수령 방식(매월·매분기 등), 수령 기간을 설정하면 10분 내로 완료돼요. 앱 사용이 어렵다면 해당 금융기관 지점에 방문해서 신청할 수 있어요.",
    tip: "앱 비대면 신청이 가장 빠르고 간편해요 — 지점 방문 없이 처리 가능",
  },
  {
    title: "연금 수령 및 세금 정산",
    desc: "신청한 주기(매월·매분기)에 맞춰 연금이 지급돼요. 수령 시 연금소득세(3.3~5.5%)가 자동으로 원천징수돼요. 10년 이하 수령분은 5.5%, 10년 초과분은 3.3%예요. 연간 연금소득이 1,500만원을 넘으면 다음 해 종합소득세 신고 대상이에요.",
    tip: "연금소득세: 10년 이하 수령분 5.5% / 10년 초과분 3.3% / 80세 이후 3.3%",
  },
];

const CHECKLIST = [
  "만 55세 이상 + IRP 가입 5년 이상: 두 조건 모두 충족해야 연금 전환 가능해요",
  "수령 기간 10년 이상 설정: 퇴직소득세 30% 절감 조건이에요",
  "수령 기간 20년 이상 설정 시: 퇴직소득세 40% 절감으로 추가 혜택이 있어요",
  "연간 연금소득 1,500만원 이하 유지: 초과 시 종합소득세 신고 대상이에요",
  "중도 일시금 전환 자제: 절세 혜택이 취소되고 기타소득세가 붙어요",
  "운용 수익 확인: IRP 내 운용 상품에 따라 실제 수령액이 늘어날 수 있어요",
];

const FAQS = [
  {
    q: "퇴직금을 연금으로 받으면 세금이 얼마나 줄어요?",
    a: "10년 이상 연금으로 받으면 퇴직소득세의 30%를 절감해요. 퇴직소득세가 300만원이었다면 연금 수령 시 210만원만 내면 돼요. 20년 이상이면 40% 절감이라 180만원만 내면 되고요. 수령 기간이 길수록 세금 부담이 줄어요.",
  },
  {
    q: "55세 이전에 IRP에서 퇴직금을 꺼낼 수 있나요?",
    a: "중도 인출은 가능하지만 세금이 훨씬 비싸요. 연금 수령 요건을 갖추지 못한 상태에서 인출하면 기타소득세 16.5%가 부과돼요. 퇴직소득세 절감 혜택도 사라지고요. 급하게 써야 할 돈이 아니라면 55세까지 그대로 두는 게 유리해요.",
  },
  {
    q: "연금 수령 중에 갑자기 돈이 필요하면 일부 인출이 되나요?",
    a: "가능해요. 연금 수령 중에도 부분 인출은 돼요. 하지만 인출한 금액에 대해선 절세 혜택이 취소될 수 있어요. 꼭 필요한 경우만 부분 인출하고, 인출 전에 세금 영향을 금융기관에 문의해보는 게 좋아요.",
  },
  {
    q: "IRP 연금과 국민연금을 동시에 받을 수 있나요?",
    a: "둘 다 받을 수 있어요. IRP 연금과 국민연금은 완전히 별개 제도예요. 다만 두 연금 합산액이 연 1,500만원을 넘으면 종합소득세 신고를 해야 해요. 연금저축까지 합산하면 1,500만원 기준이 생각보다 빨리 찰 수 있어요.",
  },
  {
    q: "IRP 연금 수령 중 금융기관을 바꿀 수 있나요?",
    a: "연금 수령이 시작된 IRP는 기관 이전이 제한되는 경우가 있어요. 연금 개시 전에 금융기관을 바꾸거나 통합하는 게 훨씬 편해요. 수령 시작 전에 수수료·수익률을 비교해서 기관을 먼저 정리하는 게 좋아요.",
  },
  {
    q: "연금 수령 기간을 나중에 바꿀 수 있나요?",
    a: "연금 개시 후에도 수령 기간 변경이 가능한 금융기관이 있어요. 다만 기관마다 정책이 달라요. 신청 전에 해당 금융기관에 변경 가능 여부를 꼭 물어보세요. 중요한 건 10년 이상 조건을 유지해야 퇴직소득세 절감 혜택이 유지된다는 거예요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      {
        label: "소득세법 제20조의3: 연금소득 과세",
        url: "https://www.law.go.kr/법령/소득세법",
      },
      {
        label: "근로자퇴직급여보장법 제7조: IRP 운용 규정",
        url: "https://www.law.go.kr/법령/근로자퇴직급여보장법",
      },
    ],
  },
  {
    category: "공식 자료",
    items: [
      {
        label: "금융감독원: IRP 연금 수령 안내",
        url: "https://www.fss.or.kr",
      },
      {
        label: "국세청: 퇴직소득·연금소득 과세 안내",
        url: "https://www.nts.go.kr",
      },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-IRP-수령방법",
    title: "퇴직금 IRP 수령 절차",
    description: "IRP 계좌로 퇴직금 받는 방법 4단계예요.",
  },
  {
    slug: "퇴직금-세금-절세-방법-IRP-연말정산",
    title: "퇴직금 절세 방법",
    description: "연금 전환 외 절세 방법을 정리했어요.",
  },
  {
    slug: "퇴직금-일시금-세금",
    title: "퇴직금 일시금 세금",
    description: "일시금 수령 시 세금 계산 방법이에요.",
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
          currentSlug="퇴직금-연금-전환"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>
        퇴직금 · IRP · 연금 전환 · 절세
      </p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금을 그냥 꺼내면 손해예요<br />
        IRP 연금 전환으로 퇴직소득세 30~40% 절감 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        IRP로 받은 퇴직금을 일시금으로 꺼내면 퇴직소득세를 100% 내야 해요.
        그런데 55세 이후 10년 이상 연금으로 나눠 받으면{" "}
        <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>
          소득세법
        </a>
        에 따라 퇴직소득세의 30%를 절감할 수 있어요.
        퇴직소득세가 300만원이라면 연금 수령 시 210만원만 내면 돼요.
        20년 이상이면 180만원으로 줄어들고요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>IRP 연금 전환, 내가 해당되나요?</H2>
      <p style={body}>
        IRP 연금 전환에는 두 가지 요건이 있어요. 만 55세 이상이어야 하고, IRP 가입 기간이 5년 이상이어야 해요.
        퇴직금이 IRP로 입금된 경우 55세가 되는 시점부터 언제든지 연금 수령 신청을 할 수 있어요.
        이 두 조건을 모두 갖추면 퇴직소득세 절감 혜택이 시작돼요.
      </p>
      <p style={body}>
        55세 이전에 IRP를 해지하거나 일시금으로 인출하면 절세 혜택이 전혀 없어요.
        퇴직소득세 전액에 기타소득세 16.5%까지 추가로 붙을 수 있어요.
        급하게 써야 할 돈이 아니라면 55세까지 그대로 두는 게 훨씬 유리해요.
      </p>

      <GreenBox title="퇴직소득세 절감률 한눈에 보기">
        10년 이상 연금 수령 → 퇴직소득세 30% 절감<br />
        20년 이상 연금 수령 → 퇴직소득세 40% 절감<br />
        55세 이전 일시금 인출 → 기타소득세 16.5% 추가 부과
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="IRP 연금 전환 요건을 갖췄어요. 아래 계산기로 수령액과 절감 세금을 바로 확인해봐요."
        partialMatchText="요건이 부족한 항목이 있어요. 55세 이후 또는 IRP 가입 5년 후에 신청하세요."
      />

      <Divider />

      <H2>연금 수령액과 절세 효과 직접 계산해보세요</H2>
      <p style={body}>
        IRP 잔액과 수령 기간을 넣으면 연간·월 수령액과 퇴직소득세 절감 추정액을 바로 볼 수 있어요.
        수령 기간을 10년에서 20년으로 늘리면 월 수령액은 절반이 되지만 절감세율은 30%에서 40%로 올라가요.
      </p>
      <p style={body}>
        계산기는 원금 분할 기준이에요. 실제 IRP는 운용 수익이 붙기 때문에 수령액이 더 높아요.
        정확한 시뮬레이션은 IRP를 개설한 금융기관 앱에서 확인해봐요.
      </p>

      <SectionBadge>IRP 연금 수령액 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 원금 분할 기준 계산이에요. 퇴직소득세 절감액은 대략적인 추정치예요. 실제 세금은 근속연수·퇴직소득 규모에 따라 달라요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>연금 신청에 필요한 서류</H2>
      <p style={body}>
        IRP 연금 수령 신청은 서류가 많지 않아요.
        금융기관 앱으로 비대면 신청하면 신분증 확인과 연금 신청서 작성이 앱 안에서 모두 처리돼요.
        방문 신청 시에는 신분증과 통장 사본을 직접 가져가야 해요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>IRP 연금 전환 절차 4단계</H2>
      <p style={body}>
        요건 확인부터 첫 연금 수령까지 보통 1~2주면 돼요.
        앱에서 신청하면 1~3단계를 한 번에 끝낼 수 있어요.
      </p>
      <p style={body}>
        수령 기간 10년 이상 조건은 신청 후에도 유지해야 해요.
        중간에 일시금으로 전환하면 절세 혜택이 취소되고 세금이 추가로 나와요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>연금 전환 전 놓치기 쉬운 주의사항</H2>
      <p style={body}>
        연금 전환 자체는 간단하지만, 사전에 확인해야 할 항목이 있어요.
        연간 연금소득이 1,500만원을 넘으면 종합소득세 신고 대상이 되기 때문에
        국민연금·연금저축과 합산해서 금액을 설계해야 해요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="연금소득 합산 주의사항">
        IRP 연금 + 국민연금 + 연금저축 합산액이 연 1,500만원을 넘으면 종합소득세 신고 대상이에요.<br />
        초과분에 대해 종합소득세율(6~45%)이 적용돼요. 연금 수령액 설계 시 이 기준선을 먼저 따져보세요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        IRP 연금 전환 관련해서 실제로 많이 들어오는 질문이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 소득세법과 근로자퇴직급여보장법을 바탕으로 작성됐어요. 세율·공제 기준이 변경될 수 있으니 최신 기준은 국세청(126) 또는 금융감독원(1332)에서 확인해봐요." />
    </ArticleLayout>
  );
}
