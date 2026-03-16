"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직금이 IRP 계좌로 이체됐어요" },
  { id: "c2", label: "IRP에서 바로 빼면 세금이 얼마나 나오는지 궁금해요" },
  { id: "c3", label: "연금으로 받으면 세금이 줄어드는지 알고 싶어요" },
  { id: "c4", label: "퇴직소득세 계산 방법을 모르겠어요" },
];

const CALC_SLIDERS = [
  { id: "amount", label: "IRP 이체된 퇴직금", min: 500, max: 10000, step: 100, defaultValue: 3000, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "years", label: "근속 기간", min: 1, max: 35, step: 1, defaultValue: 10, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "퇴직소득세 추정액 (일반 세율 기준)",
    getValue: (v: Record<string, number>) => {
      const base = v.amount * 10000;
      const deduction = Math.min(v.years * 1000000, 20000000);
      const taxBase = Math.max(0, base - deduction);
      return Math.round(taxBase * 0.06 * 1.1);
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "연금 수령 시 절세 (30% 감면 기준)",
    getValue: (v: Record<string, number>) => {
      const base = v.amount * 10000;
      const deduction = Math.min(v.years * 1000000, 20000000);
      const taxBase = Math.max(0, base - deduction);
      const tax = Math.round(taxBase * 0.06 * 1.1);
      return Math.round(tax * 0.3);
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원 절세`,
  },
];

const DOCS = [
  { name: "퇴직소득 원천징수영수증", required: true, where: "회사 인사팀 또는 홈택스" },
  { name: "IRP 계좌 잔액 확인서", required: false, where: "IRP 가입 금융사 앱" },
  { name: "신분증", required: true, where: "본인 지참 또는 앱 인증" },
  { name: "연금 수령 신청서 (연금으로 받을 때)", required: false, where: "IRP 가입 금융사" },
];

const STEPS = [
  {
    title: "IRP 이체 후 세금 확인",
    desc: "퇴직금이 IRP로 이체될 때는 퇴직소득세가 원천징수되지 않아요. IRP 계좌 안에 있는 동안은 세금이 없어요(과세 이연). 세금은 IRP에서 돈을 꺼낼 때 납부해요.",
    tip: "IRP 안에 두면 운용 수익도 과세 이연 효과가 있어요",
  },
  {
    title: "일시금 vs 연금 세금 비교",
    desc: "IRP에서 일시금으로 빼면 퇴직소득세를 한꺼번에 내야 해요. 55세 이후 연금으로 받으면 퇴직소득세의 30%(10년 이상 수령 시 40%)를 감면받아요. 퇴직소득세가 크다면 연금 수령이 훨씬 유리해요.",
    tip: "연금 수령 신청은 IRP 금융사 앱에서 할 수 있어요",
  },
  {
    title: "연금소득세 vs 퇴직소득세 선택",
    desc: "연금으로 받으면 연금소득세(3.3~5.5%)가 부과돼요. 퇴직소득세보다 세율이 낮아서 대부분 연금이 유리해요. 단, 연간 연금 수령액이 1,500만원을 넘으면 종합소득세 신고 대상이 될 수 있어요.",
    tip: "연간 1,200만원 이하 연금 수령 시 분리과세 선택 가능해요",
  },
  {
    title: "세금 납부 또는 절세 실행",
    desc: "일시금을 선택했다면 IRP 금융사에서 퇴직소득세 원천징수 후 지급해줘요. 연금을 선택했다면 매년 연금 수령 시 연금소득세를 납부해요. 세금 환급이 필요하면 경정청구를 통해 돌려받을 수 있어요.",
    tip: "퇴직소득세 과오납 시 경정청구 기한은 5년이에요",
  },
];

const CHECKLIST = [
  "IRP 이체 시 세금 없음 — IRP 안에 있는 동안은 과세 이연",
  "일시금 인출 — 퇴직소득세 한꺼번에 납부",
  "연금 수령 — 퇴직소득세 30~40% 감면 (55세 이후, 10년 이상)",
  "연금소득세 — 3.3~5.5% (퇴직소득세보다 낮음)",
  "연간 1,200만원 초과 — 종합소득세 신고 검토 필요",
];

const FAQS = [
  {
    q: "퇴직금이 IRP로 이체될 때 세금이 바로 빠지나요?",
    a: "아니에요. IRP로 이체될 때는 세금이 없어요. IRP에서 꺼낼 때(일시금 또는 연금) 세금을 내요. 이를 '과세 이연'이라고 해요.",
  },
  {
    q: "IRP에서 바로 빼면 세금이 얼마나 나오나요?",
    a: "퇴직소득세가 원천징수돼요. 금액과 근속 기간에 따라 다르지만, 근속 10년·퇴직금 3,000만원이면 수십만 원에서 수백만 원 수준이에요. 정확한 금액은 원천징수영수증으로 확인하세요.",
  },
  {
    q: "연금으로 받으면 세금이 얼마나 줄어드나요?",
    a: "퇴직소득세의 30%(10년 이상 수령 시 40%)를 감면받아요. 퇴직소득세가 100만원이라면 연금 수령 시 60~70만원만 내면 돼요.",
  },
  {
    q: "IRP에서 연금으로 받으면 연금소득세도 내야 하나요?",
    a: "맞아요. 퇴직금 재원에서 나온 연금은 연금소득세(3.3~5.5%)가 부과돼요. 퇴직소득세 감면 효과와 합산하면 대부분 연금 수령이 유리해요.",
  },
  {
    q: "IRP에서 연금으로 받는 나이 제한이 있나요?",
    a: "55세 이후부터 연금 수령이 가능해요. 55세 이전에 빼면 세금 감면 없이 퇴직소득세 전액을 납부해야 해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "소득세법 제22조 — 퇴직소득세 계산 기준", url: "https://www.law.go.kr/법령/소득세법" },
      { label: "소득세법 시행령 제40조의2 — IRP 연금 수령 감면", url: "https://www.law.go.kr/법령/소득세법시행령" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "국세청 — 퇴직소득세 계산 안내", url: "https://www.nts.go.kr" },
      { label: "금융감독원 — IRP 세금 안내", url: "https://www.fss.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-세금", title: "퇴직금 세금, 얼마나 떼나요?", description: "퇴직소득세 계산 방법을 설명해요." },
  { slug: "퇴직금-세금-환급", title: "퇴직금 세금 환급 방법", description: "경정청구로 퇴직소득세를 환급받는 법." },
  { slug: "퇴직금-IRP-계좌", title: "IRP 계좌 개설 방법", description: "어느 금융사가 유리한지 수수료 비교." },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-IRP-이체-세금" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · IRP · 세금</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 IRP 이체 후 세금은 언제, 얼마나 내나요?<br />
        과세 이연부터 연금 수령 절세까지 정리
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금이 <a href="/w/퇴직금-IRP-계좌" style={{ color: "#1D9E75", textDecoration: "underline" }}>IRP 계좌</a>로 이체될 때는 세금이 없어요(과세 이연).
        <a href="/w/퇴직금-세금" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직소득세</a>는 IRP에서 돈을 꺼낼 때 납부해요.
        일시금으로 빼면 세금을 한꺼번에 내지만, 55세 이후 연금으로 받으면 퇴직소득세를 30~40% 감면받을 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>IRP로 이체됐을 때 세금은 어떻게 되나요?</H2>
      <p style={body}>
        IRP로 이체할 때는 퇴직소득세가 원천징수되지 않아요.
        IRP 계좌 안에 있는 동안은 운용 수익도 포함해서 세금이 없어요. 이걸 '과세 이연'이라고 해요.
        세금은 IRP에서 돈을 실제로 꺼낼 때 납부해요.
      </p>
      <p style={body}>
        꺼내는 방법에 따라 세금이 달라져요.
        일시금으로 빼면 퇴직소득세를 한꺼번에 내고, 연금으로 받으면 퇴직소득세를 30~40% 감면해줘요.
        55세가 됐을 때 연금을 선택하면 수십만 원에서 수백만 원을 아낄 수 있어요.
      </p>

      <GreenBox title="IRP 세금 핵심 정리">
        이체 시: 세금 없음 (과세 이연)<br />
        일시금 인출: 퇴직소득세 전액 납부<br />
        연금 수령(55세 이후): 퇴직소득세 30~40% 감면
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="IRP 세금 절세 방법을 확인해봐요. 아래 계산기로 세금 차이를 비교해보세요."
        partialMatchText="상황에 따라 다를 수 있어요. 국세청(126) 또는 금융사 상담을 권해요."
      />

      <Divider />

      <H2>퇴직소득세 추정액과 절세 효과 계산</H2>
      <p style={body}>
        IRP에 이체된 퇴직금과 근속 기간을 입력하면 퇴직소득세 추정액과 연금 수령 시 절세 효과를 확인할 수 있어요.
        실제 세액은 소득세 계산 방식에 따라 달라지니 원천징수영수증으로 확인하세요.
      </p>

      <SectionBadge>퇴직소득세 절세 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 추정치. 실제 퇴직소득세는 근속공제·환산산식 적용으로 다를 수 있어요. 원천징수영수증으로 확인하세요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>세금 처리에 필요한 서류</H2>
      <p style={body}>
        퇴직소득 원천징수영수증으로 퇴직소득세를 먼저 확인하세요.
        연금 수령 신청은 IRP 금융사 앱에서 간단하게 처리할 수 있어요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>IRP 세금 절세 4단계</H2>
      <p style={body}>
        이체 후 세금 확인 → 일시금 vs 연금 비교 → 연금 수령 신청 → 세금 납부 순서예요.
        55세까지 시간이 있다면 IRP 안에서 운용하면서 기다리는 게 유리해요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>IRP 세금 체크리스트</H2>
      <p style={body}>
        연금 수령으로 세금을 줄이는 게 핵심이에요. 55세 이후 연금 수령 계획을 미리 세우세요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="IRP에 두면 세금이 이연돼요">
        IRP 안에 있는 동안은 세금이 없어요.<br />
        55세 이후 연금으로 받으면 퇴직소득세를 최대 40%까지 아낄 수 있어요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 IRP 이체 후 세금에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 소득세법을 바탕으로 작성됐어요. 세법 개정이 있을 수 있으니 최신 기준은 국세청(126)에서 확인하세요." />
    </ArticleLayout>
  );
}
