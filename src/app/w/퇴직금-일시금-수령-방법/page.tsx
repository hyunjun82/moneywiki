"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직 처리가 완료됐어요 (퇴직일 확정)" },
  { id: "c2", label: "IRP 계좌를 개설했거나 이미 보유하고 있어요" },
  { id: "c3", label: "퇴직금이 IRP 계좌로 입금됐어요" },
  { id: "c4", label: "일시금 인출을 원해요 (55세 이전 또는 목돈 필요)" },
];

const CALC_SLIDERS = [
  { id: "amount", label: "퇴직금 금액", min: 500, max: 15000, step: 100, defaultValue: 3000, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "years", label: "근속 기간", min: 1, max: 35, step: 1, defaultValue: 10, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "퇴직소득세 추정액",
    getValue: (v: Record<string, number>) => {
      const base = v.amount * 10000;
      const y = v.years;
      let deduction = 0;
      if (y <= 5) deduction = 300000 * y;
      else if (y <= 10) deduction = 1500000 + 500000 * (y - 5);
      else if (y <= 20) deduction = 4000000 + 800000 * (y - 10);
      else deduction = 12000000 + 1200000 * (y - 20);
      const taxBase = Math.max(0, base - deduction);
      const annualBase = taxBase / y;
      let rate = 0;
      if (annualBase <= 14000000) rate = 0.06;
      else if (annualBase <= 50000000) rate = 0.15;
      else if (annualBase <= 88000000) rate = 0.24;
      else rate = 0.35;
      return Math.round(taxBase * rate * 0.5);
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원 (참고값)`,
    highlight: true,
  },
  {
    label: "세후 예상 실수령액",
    getValue: (v: Record<string, number>) => {
      const base = v.amount * 10000;
      const y = v.years;
      let deduction = 0;
      if (y <= 5) deduction = 300000 * y;
      else if (y <= 10) deduction = 1500000 + 500000 * (y - 5);
      else if (y <= 20) deduction = 4000000 + 800000 * (y - 10);
      else deduction = 12000000 + 1200000 * (y - 20);
      const taxBase = Math.max(0, base - deduction);
      const annualBase = taxBase / y;
      let rate = 0;
      if (annualBase <= 14000000) rate = 0.06;
      else if (annualBase <= 50000000) rate = 0.15;
      else if (annualBase <= 88000000) rate = 0.24;
      else rate = 0.35;
      const tax = Math.round(taxBase * rate * 0.5);
      return base - tax;
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "신분증 (주민등록증 또는 운전면허증)", required: true, where: "본인 지참 또는 앱 인증" },
  { name: "IRP 계좌 개설 서류 (미개설 시)", required: true, where: "은행·증권사 앱 또는 방문" },
  { name: "퇴직소득 원천징수영수증", required: false, where: "회사 인사팀 또는 홈택스" },
  { name: "일시금 지급 신청서 (금융사 양식)", required: false, where: "IRP 가입 금융사 앱 제공" },
];

const STEPS = [
  {
    title: "IRP 계좌 개설",
    desc: "퇴직금 300만원 초과 시 IRP 계좌로만 수령할 수 있어요. 은행, 증권사, 보험사 중 어디서든 개설 가능해요. 이미 IRP가 있으면 그 계좌 정보를 회사에 알려주면 돼요.",
    tip: "수수료 0원 상품을 먼저 확인하세요. 증권사 IRP는 수수료 면제 이벤트가 많아요",
    link: { label: "IRP 계좌 비교하기", href: "/w/퇴직금-IRP-계좌" },
  },
  {
    title: "회사에 IRP 계좌 정보 전달",
    desc: "IRP 계좌번호와 금융기관명을 인사팀에 알려줘요. 퇴직일로부터 14일 이내에 퇴직금이 이체돼야 해요. 14일 초과 시 연 20% 지연이자가 발생해요.",
    tip: "퇴직 전에 미리 IRP를 개설해두면 지급이 빨라져요",
  },
  {
    title: "IRP에서 일시금 인출 신청",
    desc: "퇴직금이 IRP에 입금되면 금융사 앱 또는 지점에서 일시금 지급 신청을 해요. 신청 후 퇴직소득세가 원천징수되고, 나머지 금액이 지정 계좌로 이체돼요. 보통 3~5영업일 소요돼요.",
    tip: "앱 신청이 방문보다 빠른 경우가 많아요",
  },
  {
    title: "퇴직소득 원천징수영수증 수령",
    desc: "일시금 인출 후 금융사에서 퇴직소득 원천징수영수증을 발급해줘요. 세금이 제대로 계산됐는지 확인하세요. 잘못 계산됐으면 홈택스에서 경정청구로 환급받을 수 있어요.",
    tip: "영수증은 홈택스에서도 조회할 수 있어요",
    link: { label: "홈택스에서 확인", href: "https://www.hometax.go.kr" },
  },
];

const CHECKLIST = [
  "300만원 이하: 일반 계좌 직접 수령 가능, IRP 불필요",
  "300만원 초과: IRP 개설 후 회사에 계좌 정보 제출",
  "퇴직금 지급 기한: 퇴직일로부터 14일 이내",
  "일시금 인출: IRP 앱에서 신청, 3~5영업일 소요",
  "연금 비교: 55세 이후 연금 수령 시 퇴직소득세 30~40% 절세",
];

const FAQS = [
  {
    q: "퇴직금을 IRP 없이 바로 받을 수 있나요?",
    a: "퇴직금이 300만원 이하라면 일반 계좌로 직접 받을 수 있어요. 300만원 초과는 2022년 4월부터 IRP로만 수령해야 해요. IRP 개설 후 일시금 인출 신청을 하면 세금 차감 후 지급돼요.",
  },
  {
    q: "IRP에서 일시금으로 빼는 데 얼마나 걸리나요?",
    a: "금융사 앱에서 신청 후 보통 3~5영업일이에요. 서류 확인이 필요한 경우엔 더 걸릴 수 있어요. 방문 신청보다 앱 신청이 빠른 경우가 많아요.",
  },
  {
    q: "일시금 vs 연금, 어떤 게 나은가요?",
    a: "세금 면에서는 연금이 유리해요. 55세 이후 10년 이상 연금으로 받으면 퇴직소득세를 최대 40% 줄일 수 있어요. 당장 목돈이 필요하거나 55세까지 시간이 많이 남은 경우엔 일시금도 합리적이에요.",
  },
  {
    q: "일시금으로 받으면 세금이 얼마나 나오나요?",
    a: "근속 기간과 퇴직금 규모에 따라 달라요. 근속 10년·퇴직금 3,000만원 기준으로 수십만 원~100만원 수준이에요. 정확한 금액은 홈택스 퇴직소득세 모의계산으로 확인하세요.",
  },
  {
    q: "일시금으로 받은 뒤 다시 IRP에 넣을 수 있나요?",
    a: "넣을 수 있어요. 하지만 이미 세금을 납부한 상태라 과세이연 효과는 없어요. 새로 납입하는 금액에 대해서는 연간 1,800만원 한도 내 세액공제를 받을 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 제9조: IRP 이체 의무화", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "소득세법 제22조: 퇴직소득세 계산 기준", url: "https://www.law.go.kr/법령/소득세법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "국세청 홈택스: 퇴직소득세 모의계산", url: "https://www.hometax.go.kr" },
      { label: "금융감독원: IRP 일시금 인출 안내", url: "https://www.fss.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-수령방법", title: "퇴직금 수령 방법 정리", description: "IRP 이체부터 일시금·연금 선택까지." },
  { slug: "퇴직금-IRP-수령방법", title: "퇴직금 IRP 수령 절차", description: "IRP 연금으로 세금 30% 아끼는 방법." },
  { slug: "퇴직금-일시금-세금", title: "퇴직금 일시금 세금 계산", description: "근속연수 공제와 실납부 세액 확인법." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-일시금-수령-방법" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 일시금 · 수령방법</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 일시금으로 받으려면 어떻게 하나요?<br />
        IRP 인출 절차와 세후 수령액 계산법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금 300만원 초과라면 <a href="/w/퇴직금-IRP-계좌" style={{ color: "#1D9E75", textDecoration: "underline" }}>IRP 계좌</a>로
        먼저 받고, 거기서 일시금 인출 신청을 해야 해요.
        인출 시점에 <a href="/w/퇴직금-일시금-세금" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직소득세</a>가
        원천징수되고 나머지 금액이 지급돼요.
      </p>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        절차 자체는 간단하지만, 인출 전에 연금 수령과 세금 차이를 한 번만 비교해보면 좋아요.
        55세 이후라면 연금으로 받는 게 퇴직소득세를 30~40% 줄일 수 있거든요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>일시금 수령, 어떤 조건이 필요한가요?</H2>
      <p style={body}>
        일시금 수령은 퇴직 후 누구나 선택할 수 있어요.
        퇴직금이 300만원 이하면 IRP 없이 일반 계좌로 받을 수 있고, 300만원 초과라면 IRP를 통해 받아야 해요.
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법 제9조</a>에서
        이를 의무화하고 있어요.
      </p>
      <p style={body}>
        IRP로 이체된 퇴직금은 계좌 안에 있는 동안 세금이 이연돼요.
        일시금으로 빼면 그때 퇴직소득세가 차감되고, 연금으로 10년 이상 수령하면 세금의 30~40%를 감면받을 수 있어요.
        당장 목돈이 필요한 경우에 일시금을 선택하는 게 맞아요.
      </p>

      <GreenBox>
        일시금: 즉시 수령, 퇴직소득세 전액 납부<br />
        연금 (55세 이후 10년 이상): 퇴직소득세 최대 40% 감면<br />
        300만원 이하 퇴직금: IRP 없이 일반 계좌로 수령 가능
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="일시금 인출 절차를 바로 시작할 수 있어요. 아래 계산기로 세후 수령액을 먼저 확인하세요."
        partialMatchText="IRP 개설이나 퇴직 처리가 먼저 필요해요. 단계별로 진행하세요."
      />

      <Divider />

      <H2>일시금 수령 시 세후 수령액 계산법</H2>
      <p style={body}>
        퇴직금 금액과 근속 기간을 조정하면 퇴직소득세 추정액과 세후 실수령액을 바로 확인할 수 있어요.
        실제 세액은 환산급여공제 계산이 별도로 있어서 아래 수치보다 낮게 나오는 경우가 많아요.
        정확한 금액은 <a href="https://www.hometax.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>홈택스 퇴직소득 모의계산</a>으로
        확인하세요.
      </p>

      <SectionBadge>세후 수령액 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 근속연수공제 적용 참고값. 환산급여공제 미적용으로 실제 세금은 낮을 수 있어요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>일시금 수령 신청 서류</H2>
      <p style={body}>
        IRP에서 인출할 때는 금융사 앱에서 신청하면 신분증 확인만으로 처리돼요.
        세액 확인이 필요하다면 원천징수영수증을 인사팀에 요청하거나 홈택스에서 조회하세요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <p style={body}>
        IRP 개설이 처음이라면 은행·증권사 앱에서 10~15분이면 개설돼요.
        수수료 0원 상품을 비교한 뒤 개설하는 게 유리해요.
      </p>

      <Divider />

      <H2>IRP에서 일시금 인출 신청 절차</H2>
      <p style={body}>
        IRP 개설 → 회사에 계좌 정보 전달 → 퇴직금 입금 → 일시금 인출 신청 → 원천징수영수증 수령 순서예요.
        회사가 14일 이내에 이체하지 않으면 연 20% 지연이자를 청구할 수 있어요.
      </p>

      <Steps steps={STEPS} />

      <p style={body}>
        원천징수영수증은 나중에 세금 신고나 경정청구 시 꼭 필요해요.
        인출 직후 금융사 앱에서 바로 내려받아 보관해두는 게 좋아요.
      </p>

      <Divider />

      <H2>일시금 수령 전 체크리스트</H2>
      <p style={body}>
        인출 전에 연금 수령 옵션을 한 번만 더 검토하면 수백만 원 세금을 아낄 수 있어요.
        55세까지 시간 여유가 있다면 연금이 훨씬 유리해요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        55세 이후 연금으로 받으면 퇴직소득세 30% 감면, 10년 이상이면 최대 40% 감면이에요.<br />
        당장 급한 사정이 없다면 IRP에 두고 연금 수령을 선택하는 게 세금 면에서 유리해요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 일시금 수령 방법에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법과 소득세법을 바탕으로 작성됐어요. 세법 개정이 있을 수 있으니 최신 기준은 국세청(126)에서 확인하세요." />
    </ArticleLayout>
  );
}
