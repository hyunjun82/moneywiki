"use client";

// ─── Q1-Q4 필수 사고 ─────────────────────────────────
// Q1. DC형 퇴직연금에 가입된 채 퇴직을 앞두고 있거나 방금 퇴직했는데,
//     잔액을 어디서 확인하고 어떻게 받는지 절차를 모르는 상황
// Q2. DC 계좌 잔액을 확인하고, IRP로 이전한 뒤 연금 or 일시금을 선택해 수령한다
// Q3. DC형 구조(운용손익 반영), 잔액 조회 경로, IRP 의무 이전(300만원 초과),
//     연금 수령 절세(40% 감면), 마지막 부담금 누락 확인, 4단계 수령 절차
// Q4. Steps(절차) + GreenBox(핵심 조건) + DocTable(서류) + Calculator(누적액 추정) + Checklist
//
// MAP:
// Q1 → 서론: DC형 퇴직 후 "어떻게 받지?" 모르는 불안감
// Q2 → H2 순서: 수령 조건 확인 → 예상 잔액 계산기 → 필요 서류 → 4단계 절차 → 체크리스트
// Q3 → H2 5개 + FAQ
// Q4 → GreenBox, Calculator, DocTable, Steps, Checklist

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR, 퇴직금_HIGHLIGHT } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CALC_SLIDERS = [
  { id: "monthly", label: "월 급여 (세전)", min: 200, max: 800, step: 10, defaultValue: 350, format: (v: number) => `${v}만원` },
  { id: "months", label: "근속 개월 수", min: 12, max: 420, step: 6, defaultValue: 120, format: (v: number) => `${v}개월 (${Math.round(v / 12)}년)` },
];

const CALC_RESULTS = [
  {
    label: "DC 부담금 누적액 (세전, 수익 제외)",
    getValue: (v: Record<string, number>) => Math.round((v.monthly / 12) * v.months * 10000),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "연금 수령 시 절세 효과 (10년 이상, 퇴직소득세 40% 감면)",
    getValue: (v: Record<string, number>) => {
      const total = Math.round((v.monthly / 12) * v.months * 10000);
      return Math.round(total * 0.055 * 0.4);
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원 절세`,
  },
];

const DOCS = [
  { name: "IRP 계좌번호 (이전용)", required: true, where: "증권사·은행 앱 개설 후 확인" },
  { name: "DC 계좌 잔액 확인서 또는 운용 현황", required: true, where: "가입 금융사 앱 또는 고객센터" },
  { name: "신분증", required: true, where: "본인 지참 또는 앱 인증" },
  { name: "퇴직 확인서", required: false, where: "회사 인사팀 (요청 시 발급)" },
];

const STEPS = [
  {
    title: "DC 계좌 잔액 확인",
    desc: "가입 금융사 앱에서 DC 계좌 평가금액을 먼저 봐야 해요. DC형은 근로자가 ETF·펀드·원리금보장형 등으로 직접 운용하기 때문에 상품 선택에 따라 잔액이 달라지죠. 퇴직 시점의 평가금액이 실제 수령 기준액이에요.",
    tip: "운용 손실이 걱정된다면 퇴직 전에 원리금보장형 상품으로 전환하는 게 안전해요.",
  },
  {
    title: "IRP 계좌 개설 후 이전 신청",
    desc: "퇴직급여 300만원 초과는 IRP 계좌로만 받을 수 있죠. 가입 금융사 앱이나 지점에서 IRP 이전을 신청하면 되죠. 같은 금융사에 IRP를 열면 이전 절차가 더 빠르게 처리되고요.",
    tip: "퇴직 전에 미리 IRP를 개설해두면 퇴직 후 바로 이전 신청할 수 있죠.",
    link: { label: "IRP 계좌 개설 방법 보기", href: "/w/퇴직금-IRP-계좌" },
  },
  {
    title: "퇴직 사실 금융사에 통보",
    desc: "퇴직이 확정되면 DC 계좌 가입 금융사에 퇴직 사실을 알려야 해요. 금융사가 회사의 마지막 부담금 이체 여부를 확인한 뒤 이전 또는 지급 처리를 진행하죠. 보통 영업일 기준 3~5일 걸려요.",
    tip: "퇴직 달 부담금이 제때 입금됐는지도 체크해봐요. 누락된 경우 회사에 요청하면 돼요.",
  },
  {
    title: "일시금 또는 연금 수령 선택",
    desc: "IRP로 이전된 금액을 일시금으로 빼거나 55세 이후 연금으로 받을 수 있죠. 연금으로 10년 이상 수령하면 퇴직소득세가 40% 감면되죠. 장기 보유를 고려한다면 IRP에서 ETF 운용도 가능하고요.",
    tip: "10년 이상 연금으로 받는 게 퇴직소득세 절세에서 가장 유리해요.",
    link: { label: "퇴직금 세금 절세 방법 보기", href: "/w/퇴직금-세금" },
  },
];

const CHECKLIST = [
  "DC 계좌 잔액: 가입 금융사 앱에서 평가금액 확인",
  "운용 상품: 퇴직 전 원리금보장형으로 전환 고려",
  "IRP 계좌: 300만원 초과 시 미리 개설 필수",
  "마지막 부담금: 퇴직 달 회사 납입 여부 확인",
  "연금 수령: 55세 이후 10년 이상 받으면 퇴직소득세 40% 절세",
];

const FAQS = [
  {
    q: "DC형은 회사가 매달 얼마를 넣어줘요?",
    a: "법정 기준은 연간 임금 총액의 1/12 이상이에요. 매달 월급의 1/12에 해당하는 금액을 DC 계좌에 입금하죠. 회사 규정이 더 높으면 그 기준을 따르고, 낮으면 근로자퇴직급여보장법 위반이에요.",
  },
  {
    q: "DC 계좌에서 직접 현금으로 받을 수 있나요?",
    a: "300만원 초과 퇴직급여는 IRP 계좌로만 받아야 해요. 일반 통장이나 현금 수령은 위법이죠. 퇴직급여가 300만원 이하라면 일반 계좌로도 수령 가능해요.",
  },
  {
    q: "DC 운용에서 손실이 나면 퇴직금이 줄어드나요?",
    a: "줄어들 수 있죠. DC형은 근로자가 운용 지시를 하기 때문에 손실이 나면 수령액이 감소하죠. 다만 잔액이 법정 최저 기준(연간 임금 1/12 × 근속연수)보다 낮으면 회사가 차액을 보전해야 해요.",
  },
  {
    q: "DC 계좌를 IRP 말고 다른 계좌로 이전할 수 있나요?",
    a: "퇴직 시 이전 가능한 곳은 IRP 계좌뿐이에요. 새 직장에서 DC형 퇴직연금에 가입하면 기존 DC 잔액을 새 DC 계좌로 이전하는 것도 가능하죠.",
  },
  {
    q: "DC형에서 연금으로 받으려면 어떻게 하나요?",
    a: "IRP로 이전된 잔액을 55세 이후 연금 수령 신청하면 돼요. 금융사 앱에서 연금 지급 신청을 하고 수령 기간(10년 이상 권장)을 설정하면 매월 연금처럼 받을 수 있죠.",
  },
  {
    q: "DB형과 DC형 중 어떤 게 나에게 유리한가요?",
    a: "DB형은 수령액이 임금 기준으로 확정돼 안정적이고, DC형은 운용을 잘하면 더 받을 수 있지만 손실 위험도 있죠. 임금 상승이 빠른 직군이라면 DB형이 유리하고, 투자에 적극적이라면 DC형이 나을 수 있죠.",
  },
  {
    q: "IRP 중도해지하면 어떻게 되나요?",
    a: "이연됐던 퇴직소득세 전액을 납부해야 하고, 추가로 기타소득세 16.5%까지 부과돼요. 웬만하면 중도해지는 피하는 게 좋죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 제20조: DC형 부담금 기준", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "근로자퇴직급여보장법 제9조: IRP 이체 의무", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "금융감독원: 통합연금포털 퇴직연금 조회", url: "https://100lifeplan.fss.or.kr" },
      { label: "고용노동부: 퇴직연금 제도 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-제도-종류", title: "퇴직금 제도 종류 비교", description: "DB·DC·IRP 차이와 내 상황에 맞는 선택 기준이에요." },
  { slug: "db형-퇴직금-수령방법", title: "DB형 퇴직금 수령 방법", description: "확정급여형 IRP 이체 조건·절차·연금 선택까지 다뤄요." },
  { slug: "퇴직금-세금", title: "퇴직금 세금, 얼마나 떼나요?", description: "퇴직소득세 계산법과 IRP 절세 30~40% 방법이에요." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} highlightSlugs={퇴직금_HIGHLIGHT} currentSlug="dc형-퇴직금-수령방법" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · DC형 · 확정기여형</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        DC형 퇴직금, 어떻게 받나요?<br />
        잔액 확인·IRP 이전·연금 선택 절차
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        DC형(확정기여형) 퇴직연금은 회사가 매달 부담금을 넣어주고 근로자가 직접 운용하는 구조예요.
        퇴직 시 DC 계좌 평가금액이 수령 기준액이 되고, 300만원 초과면{" "}
        <a href="/w/퇴직금-IRP-계좌" style={{ color: "#1D9E75", textDecoration: "underline" }}>IRP 계좌</a>로만 받을 수 있죠.
        운용 결과에 따라 금액이 달라지기 때문에 퇴직 전 잔액 확인과{" "}
        <a href="/w/퇴직금-세금" style={{ color: "#1D9E75", textDecoration: "underline" }}>절세 방법</a> 파악이 먼저예요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* H2-1: 수령 조건 (숫자형 시작) */}
      <H2>DC형 퇴직금, 내가 받을 수 있는 조건 3가지</H2>
      <p style={body}>
        3가지예요. 근속 1년 이상, DC형 가입, 퇴직 확정. 이 세 가지를 갖추면 DC 계좌 평가금액을 수령할 수 있죠.
        회사가 매달 연간 임금의 1/12 이상을 DC 계좌에 납입하면, 근로자가 ETF·펀드·원리금보장형 등으로 운용하는 방식이죠.
      </p>
      <p style={body}>
        내가 DC형인지 DB형인지 모르겠다면 인사팀에 물어보거나 금융감독원 통합연금포털에서 조회하면 돼요.
        잔액이 법정 최저 기준보다 낮으면 회사가 차액을 보전할 의무가 있으니, 운용 손실이 있더라도 무조건 손해만 보는 건 아니에요.
      </p>

      <GreenBox>
        수령 조건: 근속 1년 이상 + DC형 가입 + 퇴직 확정<br />
        부담금 기준: 연간 임금 총액의 1/12 이상 (매달 월급의 1/12)<br />
        운용 손실 시: 잔액이 법정 최저 기준 미달이면 회사가 차액 보전
      </GreenBox>

      <p style={body}>
        조건을 갖췄다면 다음 단계는 내 DC 계좌에 얼마가 쌓여 있는지 파악하는 거예요.
      </p>

      <Divider />

      {/* H2-2: 예상 수령액 계산기 */}
      <H2>DC 계좌에 지금까지 얼마나 쌓였을까?</H2>
      <p style={body}>
        월 급여와 근속 개월 수를 넣으면 법정 부담금 기준 누적액을 추산할 수 있죠.
        실제 잔액은 운용 수익·손실에 따라 달라지기 때문에 가입 금융사 앱에서 최신 평가금액을 함께 봐야 하죠.
        세금 차감 전 금액이에요.
      </p>

      <SectionBadge>DC형 누적액 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 법정 부담금(월급 1/12) 기준 누적 세전 금액이에요. 운용 수익·손실에 따라 실제 잔액은 다를 수 있죠."
      />

      <BorderBox>
        계산기 금액보다 실제 잔액이 적다면 운용 손실이 반영된 거예요.
        퇴직 전에 원리금보장형 상품으로 전환하면 추가 손실을 막을 수 있죠.
        잔액이 법정 최저 기준보다 낮은 경우라면 회사에 차액 보전을 요청할 수 있죠.
      </BorderBox>

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      {/* H2-3: 필요 서류 (경고형 시작) */}
      <H2>IRP 이전 전에 이 서류를 먼저 챙겨요</H2>
      <p style={body}>
        IRP 계좌번호가 없으면 이전 신청 자체를 못 해요. 퇴직 전에 미리 개설해두는 게 좋죠.
        수수료가 낮은 증권사 IRP가 장기 운용에 유리하고, 같은 금융사에 개설하면 DC → IRP 이전 절차가 빠르게 처리돼요.
      </p>
      <p style={body}>
        DC 계좌 잔액 확인서는 가입 금융사 앱에서 바로 뽑을 수 있죠.
        퇴직 확인서는 필수는 아니지만 금융사에 따라 요청하는 경우도 있으니 인사팀에 미리 부탁해두는 게 안전하죠.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      {/* H2-4: 4단계 절차 (질문형 시작) */}
      <H2>잔액 확인부터 수령까지, 어떤 순서로 움직이나요?</H2>
      <p style={body}>
        퇴직 전에 미리 흐름을 알아두면 퇴직 후 혼선이 없어요.
        가장 먼저 해야 할 건 DC 계좌 평가금액 확인이고, 그다음이 IRP 이전 신청이에요.
        운용 손실을 막고 싶다면 퇴직 전 안전 자산 전환도 함께 챙기는 게 좋죠.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      {/* H2-5: 체크리스트 (사례형 시작) */}
      <H2>수령 전에 놓치면 손해인 항목들</H2>
      <p style={body}>
        퇴직 달에 회사가 마지막 부담금을 정상 납입했는지 의외로 놓치는 경우가 많아요.
        퇴직 후에는 DC 계좌 접근이 제한될 수 있어서, 퇴직 당일이나 직전에 확인하는 게 안전하죠.
      </p>
      <p style={body}>
        IRP로 이전 후 55세 이후 10년 이상 연금으로 받으면 퇴직소득세가 40% 줄어들어요.
        일시금으로 바로 빼면 퇴직소득세를 전액 납부해야 하니, 금액이 클수록 연금 수령 방식을 먼저 고려해봐요.
      </p>

      <SectionBadge>수령 전 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        IRP로 이전 후 55세 이후 10년 이상 연금으로 받으면 퇴직소득세가 40% 감면돼요.<br />
        일시금으로 바로 빼면 퇴직소득세를 전액 납부해야 해요.
      </GreenBox>

      <Divider />

      {/* H2-6: FAQ */}
      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        DC형 퇴직급여 수령에서 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 체크해봐요." />
    </ArticleLayout>
  );
}
