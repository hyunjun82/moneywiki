"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직금을 IRP가 아닌 현금으로 바로 받고 싶어요" },
  { id: "c2", label: "IRP에서 일시금으로 인출하는 방법을 알고 싶어요" },
  { id: "c3", label: "퇴직소득세가 얼마나 떼이는지 궁금해요" },
  { id: "c4", label: "연금보다 일시금이 유리한지 비교해보고 싶어요" },
];

const CALC_SLIDERS = [
  { id: "amount", label: "퇴직금 금액", min: 500, max: 10000, step: 100, defaultValue: 3000, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "years", label: "근속 기간", min: 1, max: 35, step: 1, defaultValue: 10, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "퇴직소득세 추정액 (일시금 수령 기준)",
    getValue: (v: Record<string, number>) => {
      const base = v.amount * 10000;
      const deduction = Math.min(v.years * 1000000, 20000000);
      return Math.round(Math.max(0, base - deduction) * 0.06 * 1.1);
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "세후 실수령액",
    getValue: (v: Record<string, number>) => {
      const base = v.amount * 10000;
      const deduction = Math.min(v.years * 1000000, 20000000);
      const tax = Math.round(Math.max(0, base - deduction) * 0.06 * 1.1);
      return base - tax;
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "IRP 계좌 (300만원 초과 시 수령 후 인출 신청)", required: true, where: "IRP 가입 금융사" },
  { name: "신분증", required: true, where: "본인 지참 또는 앱 인증" },
  { name: "퇴직소득 원천징수영수증", required: false, where: "회사 인사팀 또는 홈택스" },
  { name: "일시금 인출 신청서 (IRP에서 인출 시)", required: false, where: "IRP 금융사 앱" },
];

const STEPS = [
  {
    title: "일시금 수령 가능 여부 확인",
    desc: "퇴직금이 300만원 이하라면 IRP 없이 일반 계좌로 일시금 수령이 가능해요. 300만원 초과라면 IRP로 이체 후 인출 신청을 해야 해요. IRP에서 일시금으로 빼면 퇴직소득세를 한꺼번에 납부해요.",
    tip: "300만원 이하 퇴직금은 회사가 일반 계좌로 직접 지급할 수 있어요",
  },
  {
    title: "퇴직소득세 확인",
    desc: "일시금으로 받을 때 퇴직소득세가 원천징수돼요. 세액은 퇴직금 금액과 근속 기간에 따라 다르고, 근속 기간이 길수록 공제가 커서 세율이 낮아요. 원천징수영수증으로 정확한 세액을 확인하세요.",
    tip: "홈택스에서 퇴직소득세 모의계산이 가능해요",
  },
  {
    title: "IRP에서 일시금 인출 신청",
    desc: "IRP로 받은 퇴직금을 일시금으로 빼려면 금융사 앱 또는 지점에서 '일시금 지급 신청'을 하면 돼요. 신청 후 퇴직소득세를 차감하고 나머지 금액이 지정 계좌로 이체돼요. 보통 3~5영업일 소요돼요.",
    tip: "인출 신청 전 연금 수령과 세금 차이를 비교해보세요",
  },
  {
    title: "연금과 일시금 비교",
    desc: "일시금은 지금 당장 돈을 쓸 수 있는 장점이 있어요. 반면 연금으로 받으면 퇴직소득세를 30~40% 절세할 수 있어요. 55세가 됐거나 곧 될 예정이라면 연금이 훨씬 유리해요. 당장 목돈이 필요한 경우에만 일시금을 선택하세요.",
    tip: "연금 수령 신청은 55세 이후 언제든 가능해요",
  },
];

const CHECKLIST = [
  "300만원 이하 — 일반 계좌로 일시금 수령 가능",
  "300만원 초과 — IRP 이체 후 일시금 인출 신청",
  "퇴직소득세 — 일시금 수령 시 한꺼번에 납부",
  "연금 비교 — 55세 이후 연금 수령 시 세금 30~40% 절세",
  "원천징수영수증 — 세액 확인 후 수령",
];

const FAQS = [
  {
    q: "퇴직금을 IRP 없이 바로 받을 수 있나요?",
    a: "300만원 이하라면 가능해요. 300만원 초과는 IRP로만 받아야 해요(2022년 4월 의무화). IRP 이체 후 일시금 인출 신청을 하면 되지만, 세금이 한꺼번에 나와요.",
  },
  {
    q: "일시금으로 받으면 세금이 얼마나 나오나요?",
    a: "근속 기간과 퇴직금 금액에 따라 달라요. 근속 10년·퇴직금 3,000만원 기준으로 대략 수십만 원에서 수백만 원 수준이에요. 정확한 금액은 홈택스 퇴직소득세 계산기를 이용하세요.",
  },
  {
    q: "IRP에서 일시금으로 빼면 얼마나 걸리나요?",
    a: "금융사 앱에서 신청 후 보통 3~5영업일이에요. 서류 제출이 필요한 경우엔 더 걸릴 수 있어요. 방문 신청보다 앱 신청이 빠른 경우가 많아요.",
  },
  {
    q: "일시금 vs 연금, 어떤 게 더 유리한가요?",
    a: "세금만 보면 연금이 유리해요. 55세 이후 10년 이상 연금으로 받으면 퇴직소득세를 40% 절감해요. 다만 당장 목돈이 필요하다면 일시금이 맞아요. 세금 차이를 계산하고 선택하세요.",
  },
  {
    q: "일시금으로 받은 뒤 다시 IRP에 넣을 수 있나요?",
    a: "넣을 수 있어요. 하지만 이미 세금을 냈으니 절세 효과는 없어요. 새로 납입하는 금액에 대해서는 연간 납입 한도(1,800만원) 내에서 세액공제 혜택을 받을 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 제9조 — IRP 이체 의무", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "소득세법 제22조 — 퇴직소득세 계산 기준", url: "https://www.law.go.kr/법령/소득세법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "국세청 홈택스 — 퇴직소득세 모의계산", url: "https://www.hometax.go.kr" },
      { label: "금융감독원 — IRP 일시금 인출 안내", url: "https://www.fss.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-수령방법", title: "퇴직금 수령 방법 정리", description: "IRP 이체부터 일시금·연금 선택까지." },
  { slug: "퇴직금-세금", title: "퇴직금 세금, 얼마나 떼나요?", description: "퇴직소득세 계산 방법을 설명해요." },
  { slug: "퇴직금-IRP-계좌", title: "IRP 계좌 개설 방법", description: "어느 금융사가 유리한지 수수료 비교." },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-일시금-수령-방법" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 일시금 · 수령방법</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 일시금으로 받는 방법은?<br />
        IRP 인출 절차와 세금 비교 완전 정리
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금 300만원 이하라면 일반 계좌로 일시금 수령이 가능해요.
        300만원 초과라면 <a href="/w/퇴직금-IRP-계좌" style={{ color: "#1D9E75", textDecoration: "underline" }}>IRP 이체</a> 후 인출 신청을 해야 해요.
        일시금으로 받으면 <a href="/w/퇴직금-세금" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직소득세</a>를 한꺼번에 납부해요.
        연금 수령(55세 이후)과 비교하면 세금이 더 나와요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>일시금 수령, 어떤 경우에 선택하나요?</H2>
      <p style={body}>
        당장 목돈이 필요하거나 부채 상환 등 급한 자금 용도가 있을 때 일시금을 선택해요.
        세금 면에서는 연금이 유리하지만, 55세까지 기다리기 어렵거나 운용 위험을 원하지 않는 경우엔 일시금도 합리적인 선택이에요.
        퇴직소득세를 미리 계산해보고 결정하는 게 좋아요.
      </p>
      <p style={body}>
        IRP로 이체된 퇴직금을 일시금으로 빼면 금융사가 퇴직소득세를 원천징수하고 나머지를 지급해요.
        IRP 안에 두면 세금이 이연되니, 빼기 전에 연금 수령 옵션도 꼭 검토하세요.
      </p>

      <GreenBox title="일시금 vs 연금 핵심 비교">
        일시금: 즉시 수령, 퇴직소득세 전액 납부<br />
        연금(55세 이후 10년): 퇴직소득세 40% 절세<br />
        300만원 이하: IRP 없이 일반 계좌 수령 가능
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="일시금 수령 절차를 바로 시작할 수 있어요. 아래 계산기로 세금을 먼저 확인하세요."
        partialMatchText="상황에 따라 다를 수 있어요. 금융사나 국세청(126) 상담을 권해요."
      />

      <Divider />

      <H2>일시금 수령 시 퇴직소득세 계산</H2>
      <p style={body}>
        퇴직금 금액과 근속 기간을 입력하면 일시금 수령 시 퇴직소득세 추정액과 세후 실수령액을 확인할 수 있어요.
        실제 세액은 홈택스 모의계산기로 정확히 계산해보세요.
      </p>

      <SectionBadge>퇴직소득세 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 추정치. 실제 세액은 근속공제·환산산식으로 달라요. 홈택스 모의계산기를 이용하세요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>일시금 수령에 필요한 서류</H2>
      <p style={body}>
        IRP에서 인출할 때는 금융사 앱에서 신청하면 별도 서류 없이 처리돼요.
        세액 확인이 필요하면 원천징수영수증을 요청하세요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>일시금 수령 4단계</H2>
      <p style={body}>
        수령 가능 여부 확인 → 퇴직소득세 확인 → IRP 인출 신청 → 연금과 비교 후 최종 결정 순서예요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>일시금 수령 체크리스트</H2>
      <p style={body}>
        연금 수령과 비교 후 결정하는 게 세금 면에서 가장 유리해요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="일시금 선택 전 연금을 한 번 더 고민하세요">
        55세가 됐거나 가까운 나이라면 연금으로 받는 게 세금을 40%까지 줄여요.<br />
        당장 급한 사정이 없다면 IRP에 두고 연금 수령을 선택하는 게 유리해요.
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
