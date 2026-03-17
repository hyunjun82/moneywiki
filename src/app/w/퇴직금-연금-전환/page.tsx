"use client";
import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "IRP에 퇴직금이 입금된 상태예요" },
  { id: "c2", label: "만 55세 이상이에요" },
  { id: "c3", label: "IRP 가입 기간이 5년 이상이에요" },
  { id: "c4", label: "아직 연금 수령 신청을 하지 않았어요" },
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
  { name: "IRP 계좌 (퇴직금 입금 확인)", required: true, where: "은행·증권사 앱" },
  { name: "연금 수령 신청서", required: true, where: "IRP 금융기관 앱 또는 방문" },
  { name: "신분증", required: true, where: "본인 지참" },
  { name: "주민등록등본 (만 55세 이상 확인)", required: false, where: "정부24에서 무료 발급" },
];

const STEPS = [
  {
    title: "IRP 연금 수령 요건 확인",
    desc: "IRP에서 연금으로 수령하려면 만 55세 이상이어야 해요. IRP 가입 기간이 5년 이상이어야 하는 조건도 있어요. 퇴직금이 IRP로 들어온 경우 55세 이후 언제든지 연금 수령 신청이 가능해요.",
    tip: "55세 이전 일시금 인출 시 기타소득세 16.5% 부과돼요",
  },
  {
    title: "연금 수령 기간 설정 (10년 이상 권장)",
    desc: "연금 수령 기간을 10년 이상으로 설정하면 퇴직소득세 30% 절감 혜택을 받아요. 20년 이상이면 40% 절감이에요. 금융기관 앱에서 수령 기간과 금액을 미리 시뮬레이션할 수 있어요.",
    tip: "10년 이상 수령 시 퇴직소득세 30%, 20년 이상 시 40% 절감",
  },
  {
    title: "연금 수령 신청",
    desc: "IRP 금융기관 앱 또는 방문으로 연금 전환을 신청해요. 연금 수령 시작일, 수령 방식(매월·매분기 등), 기간을 설정하면 돼요. 앱에서 10분이면 신청 가능해요. 개시 후에도 중도 변경이 가능해요.",
    tip: "금융기관 앱에서 비대면 신청이 가장 빠르고 간편해요",
  },
  {
    title: "연금 수령 및 세금 확인",
    desc: "매월 또는 분기별로 연금이 지급돼요. 연금 수령 시 연금소득세(3.3~5.5%)가 자동 원천징수돼요. 퇴직소득세 30% 절감 효과도 자동 적용돼요. 연간 연금소득이 1,500만원을 초과하면 종합소득세 신고 대상이에요.",
    tip: "연금소득세: 10년 이하 5.5%, 10년 초과 3.3%, 80세 이후 3.3%",
  },
];

const CHECKLIST = [
  "만 55세 이상 + IRP 가입 5년 이상: 연금 수령 요건",
  "연금 수령 기간 10년 이상: 퇴직소득세 30% 절감",
  "IRP 금융기관 앱에서 신청: 10분 내 완료",
  "연금소득세 3.3~5.5%: 자동 원천징수",
  "연 1,500만원 초과 시: 종합소득세 신고 필요",
];

const FAQS = [
  {
    q: "퇴직금을 연금으로 받으면 세금이 얼마나 줄어요?",
    a: "10년 이상 연금으로 수령하면 퇴직소득세의 30%를 절감해요. 퇴직소득세 300만원이라면 연금 수령 시 210만원만 내면 돼요. 20년 이상이면 40% 절감이에요.",
  },
  {
    q: "55세 이전에 퇴직금을 연금으로 받을 수 있나요?",
    a: "55세 이전에는 연금 수령이 불가해요. IRP에서 인출하면 일시금으로만 가능하고 기타소득세 16.5%가 부과돼요. 55세까지 기다리는 게 세금 면에서 유리해요.",
  },
  {
    q: "연금 수령 중 갑자기 돈이 필요하면 인출할 수 있나요?",
    a: "연금 수령 중에도 중도 인출이 가능해요. 하지만 인출 금액에 대해 퇴직소득세 절감 혜택이 취소될 수 있어요. 꼭 필요한 경우만 부분 인출하는 게 좋아요.",
  },
  {
    q: "IRP 연금과 국민연금을 동시에 받을 수 있나요?",
    a: "둘 다 받을 수 있어요. IRP 연금과 국민연금은 별개예요. 연금소득 합산액이 연 1,500만원을 초과하면 종합소득세 신고를 해야 해요.",
  },
  {
    q: "연금 수령 기간을 10년으로 하면 매월 얼마를 받나요?",
    a: "IRP 잔액이 5,000만원이라면 10년 수령 시 연 약 500만원, 월 약 41만원이에요. 운용 수익이 붙으면 더 받을 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "소득세법 제20조의3: 연금소득 과세", url: "https://www.law.go.kr/법령/소득세법" },
      { label: "근로자퇴직급여보장법 제7조: IRP 운용 규정", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "금융감독원: IRP 연금 수령 안내", url: "https://www.fss.or.kr" },
      { label: "국세청: 연금소득 과세 안내", url: "https://www.nts.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-IRP-수령방법", title: "퇴직금 IRP 수령 절차", description: "IRP 계좌로 퇴직금 받는 4단계예요." },
  { slug: "퇴직금-세금-절세-방법-IRP-연말정산", title: "퇴직금 절세 방법", description: "연금 수령으로 세금 줄이는 법이에요." },
  { slug: "퇴직금-일시금-세금", title: "퇴직금 일시금 세금", description: "일시금 vs 연금 세금 비교예요." },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-연금-전환" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 연금전환 · 절세</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금을 연금으로 받으면 세금이 얼마나 줄어드나요?<br />
        IRP 연금 전환 절차와 퇴직소득세 30~40% 절감 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        IRP로 받은 퇴직금을 그냥 일시금으로 꺼내지 마세요. 55세 이후 10년 이상 연금으로 받으면
        <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법</a>에 따라
        퇴직소득세의 30%를 절감할 수 있어요. 20년 이상이면 40%예요.
        퇴직소득세 300만원이라면 연금 수령 시 210만원만 내도 된다는 뜻이에요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>IRP 연금 전환 요건, 내가 해당되나요?</H2>
      <p style={body}>
        IRP에서 연금으로 받으려면 만 55세 이상 + IRP 가입 기간 5년 이상 두 가지 요건을 충족해야 해요.
        퇴직금이 IRP로 입금된 경우 55세가 되면 언제든지 연금 수령 신청이 가능해요.
      </p>
      <p style={body}>
        55세 이전에 IRP를 해지하거나 일시금으로 인출하면 절세 혜택이 사라져요.
        퇴직소득세 전액 + 기타소득세(16.5%)까지 붙을 수 있어요. 급하게 쓸 돈이 아니라면 55세까지 기다리는 게 훨씬 유리해요.
      </p>

      <GreenBox title="퇴직소득세 절감률 요약">
        10년 이상 연금 수령 → 퇴직소득세 30% 절감<br />
        20년 이상 연금 수령 → 퇴직소득세 40% 절감<br />
        55세 이전 일시금 인출 → 기타소득세(16.5%) 추가 부과
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="IRP 연금 전환 요건을 갖췄어요. 아래 계산기로 수령액을 확인하세요."
        partialMatchText="요건이 부족한 항목이 있어요. 55세 이후 또는 가입 5년 후에 신청하세요."
      />

      <Divider />

      <H2>연금 수령액 직접 계산해보세요</H2>
      <p style={body}>
        IRP 잔액과 수령 기간을 입력하면 연간·월 수령액을 바로 볼 수 있어요.
        수령 기간을 10년에서 20년으로 늘리면 월 수령액은 절반이 되지만 퇴직소득세 절감은 30%에서 40%로 늘어요.
      </p>
      <p style={body}>
        계산기는 원금 분할 기준이에요. 실제 IRP 연금은 운용 수익이 붙어서 더 받을 수 있어요.
        금융기관 앱에서 정확한 예상 수령액을 시뮬레이션해보세요.
      </p>

      <SectionBadge>IRP 연금 수령액 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 원금 기준 계산이에요. 운용 수익 포함 시 실제 수령액이 더 높아요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>연금 신청에 필요한 서류</H2>
      <p style={body}>
        IRP 연금 수령 신청은 서류가 많지 않아요. 대부분 금융기관 앱에서 비대면으로 처리할 수 있어요.
        만 55세 이상 확인을 위해 주민등록등본이 필요할 수 있는데, 정부24에서 무료 발급이 가능해요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>IRP 연금 전환 절차 4단계</H2>
      <p style={body}>
        요건 확인부터 실제 연금 수령까지 4단계로 진행돼요. 앱에서 신청하면 1~3단계를 한 번에 처리할 수 있어요.
        신청 후에도 수령 기간이나 금액을 변경할 수 있어요.
      </p>
      <p style={body}>
        퇴직소득세 절감 요건인 10년 이상 수령 조건은 반드시 유지해야 해요.
        중도에 일시금으로 바꾸면 절세 혜택이 취소돼요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>연금 전환 체크리스트</H2>
      <p style={body}>
        연금 전환 전에 아래 항목을 하나씩 짚어보세요. 요건이 충족되지 않으면 세금 혜택을 못 받아요.
        연간 연금소득이 1,500만원을 넘으면 종합소득세 신고 대상이 돼요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="연금소득 합산 주의사항">
        IRP 연금 + 국민연금 + 연금저축 합산액이 연 1,500만원을 넘으면 종합소득세 신고 대상이에요.<br />
        초과분에 대해 종합소득세율(6~45%)이 적용돼요. 연금 수령 금액 설계 시 이 기준선을 고려하세요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        IRP 연금 전환 관련 가장 많이 나오는 질문이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 소득세법과 근로자퇴직급여보장법을 바탕으로 작성됐어요. 세율·공제 기준이 변경될 수 있으니 최신 기준은 국세청(126)에서 확인하세요." />
    </ArticleLayout>
  );
}
