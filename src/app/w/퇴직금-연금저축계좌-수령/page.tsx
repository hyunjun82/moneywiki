"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "IRP에 퇴직금이 들어와 있어요" },
  { id: "c2", label: "연금저축계좌도 보유하고 있어요" },
  { id: "c3", label: "55세 이후 연금으로 받고 싶어요" },
  { id: "c4", label: "IRP와 연금저축을 합산 관리하고 싶어요" },
];

const CALC_SLIDERS = [
  { id: "amount", label: "연금 수령 총액", min: 1000, max: 10000, step: 500, defaultValue: 3000, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "years", label: "연금 수령 기간", min: 5, max: 30, step: 1, defaultValue: 10, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "연간 연금 수령액",
    getValue: (v: Record<string, number>) => Math.round((v.amount * 10000) / v.years),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원/년`,
    highlight: true,
  },
  {
    label: "연금소득세 (연 1,200만원 이하, 5.5%)",
    getValue: (v: Record<string, number>) => {
      const annual = Math.round((v.amount * 10000) / v.years);
      return Math.round(Math.min(annual, 12000000) * 0.055);
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원/년`,
  },
];

const DOCS = [
  { name: "신분증", required: true, where: "본인 지참" },
  { name: "IRP 계좌 정보", required: true, where: "금융기관 IRP 앱 또는 통장" },
  { name: "연금저축계좌 정보", required: true, where: "금융기관 앱 또는 통장" },
  { name: "근로소득 원천징수영수증 (연금 신청 시)", required: false, where: "회사 인사팀 또는 홈택스" },
];

const STEPS = [
  {
    title: "IRP와 연금저축 계좌 현황 파악",
    desc: "보유한 IRP 계좌와 연금저축 계좌의 잔액을 확인해요. IRP에는 퇴직금·추가 납입금이, 연금저축에는 본인 납입금만 있어요. 두 계좌의 합산 잔액이 노후 연금 재원이 돼요.",
    tip: "IRP와 연금저축은 합산해서 연 900만원 세액공제 한도가 적용돼요",
  },
  {
    title: "연금 개시 신청 (55세 이후)",
    desc: "55세가 되면 IRP 또는 연금저축에서 연금 개시를 신청할 수 있어요. 금융사 앱 또는 영업점 방문으로 신청해요. 연금 수령 기간과 금액을 설정하면 돼요.",
    tip: "연금 수령 기간이 10년 이상이면 연금소득세율이 더 낮아요 (3.3%)",
  },
  {
    title: "IRP → 연금저축 이전 여부 결정",
    desc: "IRP에 있는 퇴직금 이전분을 연금저축으로 옮길 수 있어요. 단, 퇴직금 이전분(사업주 납입)은 IRP에서만 연금 수령이 가능하고, 연금저축으로 이전은 안 돼요. 본인 납입분만 이전 가능해요.",
    tip: "이전 전에 금융사 고객센터에 이전 가능 여부를 먼저 확인하세요",
  },
  {
    title: "세금 계산 및 수령",
    desc: "연금 수령 시 연금소득세(3.3~5.5%)가 부과돼요. 연간 연금소득이 1,200만원을 초과하면 종합소득세 신고 대상이 될 수 있어요. IRP에서 퇴직금을 연금으로 받으면 퇴직소득세 30% 절감 효과도 있어요.",
    tip: "연간 1,200만원 이하로 받으면 분리과세로 세금이 줄어요",
  },
];

const CHECKLIST = [
  "연금 개시 연령 — 55세 이후",
  "IRP 퇴직금 → 연금 수령 시 퇴직소득세 30% 절감",
  "연금저축 납입분 → 연금소득세 3.3~5.5%",
  "연간 1,200만원 이하 수령 — 분리과세 적용",
  "세액공제 한도 — IRP+연금저축 합산 연 900만원",
];

const FAQS = [
  {
    q: "IRP와 연금저축, 어느 계좌에서 먼저 받는 게 유리한가요?",
    a: "퇴직금이 있는 IRP에서 연금으로 받으면 퇴직소득세를 30% 아낄 수 있어요. 연금저축은 세액공제 받은 납입분에 연금소득세가 붙어요. 보통 IRP에서 먼저 수령하는 방식이 세금 면에서 유리해요.",
  },
  {
    q: "IRP 퇴직금을 연금저축으로 옮길 수 있나요?",
    a: "사업주가 납입한 퇴직금 이전분은 IRP에서만 연금 수령이 가능해요. 연금저축으로 이전할 수 없어요. 본인이 추가로 납입한 금액은 이전이 가능할 수 있으니 금융사에 문의하세요.",
  },
  {
    q: "연금을 10년 이상 받으면 세금이 달라지나요?",
    a: "달라져요. 연금 수령 기간이 10년을 초과하면 연금소득세율이 3.3%로 낮아져요. 10년 이하는 5.5%, 80세 이후는 3.3%가 적용돼요.",
  },
  {
    q: "연간 1,200만원을 초과해서 받으면 어떻게 되나요?",
    a: "1,200만원 초과 시 종합소득세 신고 대상이 돼요. 다른 소득과 합산해서 신고해야 해서 세금이 늘어날 수 있어요. 연간 1,200만원 이하로 수령을 조정하는 게 유리해요.",
  },
  {
    q: "연금 수령 중 계좌를 해지하면 어떻게 되나요?",
    a: "해지하면 퇴직소득세 30% 절감 혜택이 사라지고, 기타소득세(16.5%)가 부과될 수 있어요. 세금 손실이 크니 부득이한 경우가 아니면 해지를 피하세요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "소득세법 제20조의3 — 연금소득 과세", url: "https://www.law.go.kr/법령/소득세법" },
      { label: "근로자퇴직급여보장법 제48조 — IRP 연금 수령 세율 특례", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "금융감독원 — 연금저축 및 IRP 안내", url: "https://www.fss.or.kr" },
      { label: "국세청 — 연금소득 세금 안내", url: "https://www.nts.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-IRP-계좌", title: "IRP 계좌 개설 방법", description: "은행·증권사 비교부터 개설까지." },
  { slug: "퇴직금-IRP-이전-의무가입-세액공제-혜택", title: "IRP 의무 이전과 세액공제", description: "연 최대 148.5만원 환급 방법." },
  { slug: "퇴직금-세금", title: "퇴직금 세금, 얼마나 떼나요?", description: "퇴직소득세와 절세 방법." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-연금저축계좌-수령" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · IRP · 연금저축 · 수령방법</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 IRP·연금저축 계좌로 연금 받는 방법<br />
        세금·수령 기간·절세 전략까지 완전 정리
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        IRP로 받은 <a href="/w/퇴직금-수령방법" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금</a>은 55세 이후 연금으로 수령하면 퇴직소득세를 30% 아낄 수 있어요.
        <a href="/w/퇴직금-IRP-이전-의무가입-세액공제-혜택" style={{ color: "#1D9E75", textDecoration: "underline" }}>연금저축</a>과 IRP를 함께 활용하면 세액공제와 연금 수령을 동시에 챙길 수 있어요.
        연간 수령액을 1,200만원 이하로 유지하면 분리과세로 세금 부담이 줄어요.
        IRP와 연금저축의 차이, 수령 전략을 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>IRP와 연금저축, 뭐가 다른가요?</H2>
      <p style={body}>
        IRP(개인형퇴직연금)는 퇴직금 이전분 + 본인 추가 납입금이 들어가요.
        연금저축은 본인이 직접 납입한 금액만 있어요.
        두 계좌 모두 55세 이후 연금 수령이 가능하고, 합산해서 연 900만원 세액공제 한도가 적용돼요.
      </p>
      <p style={body}>
        IRP에 있는 퇴직금 이전분(사업주 납입)은 IRP에서만 연금으로 받을 수 있어요.
        연금저축으로 이전이 안 돼요.
        반면 본인이 추가로 납입한 금액은 계좌 이전이 가능한 경우가 있어요.
      </p>

      <GreenBox title="IRP vs 연금저축 핵심 차이">
        IRP: 퇴직금 이전 + 본인 납입 / 연금저축: 본인 납입만<br />
        세액공제 한도: IRP+연금저축 합산 연 900만원<br />
        연금 수령: 55세 이후 / 퇴직소득세 30% 절감 (IRP 연금 수령 시)
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="IRP와 연금저축을 활용한 절세 연금 수령이 가능해요. 아래 계산기로 예상 수령액을 확인해보세요."
        partialMatchText="상황에 따라 다를 수 있어요. 금융감독원(1332) 또는 국세청(126) 상담을 권해요."
      />

      <Divider />

      <H2>연간 수령액과 세금 계산</H2>
      <p style={body}>
        총 연금 수령액과 수령 기간을 입력하면 연간 수령액과 세금을 확인할 수 있어요.
        연간 1,200만원 이하로 받으면 분리과세가 적용돼서 세금 부담이 낮아요.
      </p>

      <SectionBadge>연금 수령 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 연금소득세: 10년 이하 수령 5.5%, 10년 초과 3.3%, 80세 이후 3.3%. 연간 1,200만원 초과 시 종합소득세 대상."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>연금 신청에 필요한 서류</H2>
      <p style={body}>
        신분증과 IRP·연금저축 계좌 정보가 기본이에요.
        금융사 앱에서 연금 개시 신청을 하면 별도 서류 없이 처리되는 경우가 많아요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>IRP·연금저축 연금 수령 절차 4단계</H2>
      <p style={body}>
        계좌 현황 파악부터 연금 개시까지 단계별로 따라가면 돼요.
        세금 최적화를 위해 수령 금액과 기간을 미리 설계해두세요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>연금 수령 체크리스트</H2>
      <p style={body}>
        연간 1,200만원 초과 여부와 IRP 퇴직금 이전분 구분은 꼭 확인하세요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="연금으로 받으면 세금이 두 번 줄어요">
        IRP에서 연금 수령 시 퇴직소득세 30% 절감, 연금소득세 3.3~5.5%만 부담해요.
        일시금으로 받는 것보다 훨씬 유리할 수 있어요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        IRP·연금저축 연금 수령에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 소득세법과 근로자퇴직급여보장법을 바탕으로 작성됐어요. 세율은 수령 방식·기간에 따라 다르니 최신 기준은 국세청(126)에서 확인하세요." />
    </ArticleLayout>
  );
}
