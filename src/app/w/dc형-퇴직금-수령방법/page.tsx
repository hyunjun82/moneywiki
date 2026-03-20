"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR, 퇴직금_HIGHLIGHT } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "회사에서 DC형(확정기여형) 퇴직연금에 가입되어 있어요" },
  { id: "c2", label: "현 직장에서 1년 이상 근무했어요" },
  { id: "c3", label: "퇴직이 확정됐거나 퇴직을 앞두고 있어요" },
  { id: "c4", label: "DC 계좌에 회사 부담금이 정기적으로 입금되고 있어요" },
];

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
  { name: "퇴직 확인서", required: false, where: "회사 인사팀" },
];

const STEPS = [
  {
    title: "DC 계좌 잔액 확인",
    desc: "퇴직 전 가입 금융사 앱에서 DC 계좌 평가금액을 확인하세요. DC형은 근로자가 운용 지시를 하는 방식이라 ETF, 펀드, 원리금보장형 등 선택한 상품에 따라 잔액이 달라요. 퇴직 시점 평가금액이 수령 기준액이에요.",
    tip: "운용 손실이 걱정된다면 퇴직 전에 원리금보장형 상품으로 전환하는 게 안전해요.",
  },
  {
    title: "IRP 계좌 개설 후 이전 신청",
    desc: "300만원 초과 퇴직급여는 IRP 계좌로만 받을 수 있어요. 가입 금융사 앱이나 지점에서 IRP로 이전 신청하면 돼요. 같은 금융사에 IRP를 열면 이전 절차가 더 빠르게 처리돼요.",
    tip: "퇴직 전에 미리 IRP를 개설해두면 퇴직 후 바로 이전 신청할 수 있어요.",
  },
  {
    title: "퇴직 사실 금융사에 통보",
    desc: "퇴직이 확정되면 DC 계좌 가입 금융사에 퇴직 사실을 알려야 해요. 금융사가 회사의 마지막 부담금 이체 여부를 확인한 뒤 이전 또는 지급 처리를 진행해요. 보통 영업일 기준 3~5일 소요돼요.",
    tip: "퇴직 달 부담금이 제때 입금됐는지도 확인하세요. 누락된 경우 회사에 요청하세요.",
  },
  {
    title: "일시금 또는 연금 수령 선택",
    desc: "IRP로 이전된 금액을 일시금으로 빼거나 55세 이후 연금으로 받을 수 있어요. 연금으로 10년 이상 수령하면 퇴직소득세가 40% 감면돼요. 장기 보유를 고려한다면 IRP에서 ETF 운용도 가능해요.",
    tip: "10년 이상 연금으로 받는 게 퇴직소득세 절세에서 가장 유리해요.",
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
    a: "법정 기준은 연간 임금 총액의 1/12 이상이에요. 매달 월급의 1/12에 해당하는 금액을 DC 계좌에 넣어줘요. 회사 규정이 더 높으면 그 기준을 따르고, 낮으면 근로자퇴직급여보장법 위반이에요.",
  },
  {
    q: "DC 계좌에서 직접 현금으로 받을 수 있나요?",
    a: "300만원 초과 퇴직급여는 IRP 계좌로만 받아야 해요. 일반 통장이나 현금 수령은 위법이에요. 퇴직급여가 300만원 이하라면 일반 계좌로도 수령 가능해요.",
  },
  {
    q: "DC 운용에서 손실이 나면 퇴직금이 줄어드나요?",
    a: "줄어들 수 있어요. DC형은 근로자가 운용 지시를 하기 때문에 손실이 나면 수령액이 감소해요. 다만 잔액이 법정 최저 기준(연간 임금 1/12 × 근속연수)보다 낮으면 회사가 그 차액을 보전해야 해요.",
  },
  {
    q: "DC 계좌를 IRP 말고 다른 계좌로 이전할 수 있나요?",
    a: "퇴직 시 이전 가능한 곳은 IRP 계좌뿐이에요. 새 직장에서 DC형 퇴직연금에 가입하면 기존 DC 잔액을 새 DC 계좌로 이전하는 것도 가능해요.",
  },
  {
    q: "DC형에서 연금으로 받으려면 어떻게 하나요?",
    a: "IRP로 이전된 잔액을 55세 이후 연금 수령 신청하면 돼요. 금융사 앱에서 연금 지급 신청을 하고 수령 기간(10년 이상 권장)을 설정하면 매월 연금처럼 받을 수 있어요.",
  },
  {
    q: "DB형과 DC형 중 어떤 게 나에게 유리한가요?",
    a: "DB형은 수령액이 임금 기준으로 확정돼 안정적이고, DC형은 운용을 잘하면 더 받을 수 있지만 손실 위험도 있어요. 임금 상승이 빠른 직군이라면 DB형이 유리하고, 투자에 적극적이라면 DC형이 나을 수 있어요.",
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
  { slug: "퇴직금-제도-종류", title: "퇴직금 제도 종류 비교", description: "DB·DC·IRP 차이와 내 상황에 맞는 선택 기준." },
  { slug: "db형-퇴직금-수령방법", title: "DB형 퇴직금 수령 방법", description: "확정급여형 IRP 이체 조건·절차·연금 선택까지." },
  { slug: "퇴직금-DC형-계산법", title: "DC형 퇴직금 계산법", description: "부담금 누적 방식과 실제 수령액 계산 방법." },
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
        DC형(확정기여형) 퇴직연금은 회사가 매달 부담금을 넣어주면 근로자가 직접 운용하는 방식이에요.
        퇴직 시 DC 계좌 평가금액이 수령액이고, 300만원 초과 시 <a href="/w/퇴직금-IRP-계좌" style={{ color: "#1D9E75", textDecoration: "underline" }}>IRP 계좌</a>로만 받을 수 있어요.
        운용 결과에 따라 금액이 달라지므로 퇴직 전 잔액 확인과 <a href="/w/퇴직금-세금" style={{ color: "#1D9E75", textDecoration: "underline" }}>세금</a> 절감 방법을 미리 파악해두는 게 중요해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>DC형 퇴직금, 내가 받을 수 있는 조건인가요?</H2>
      <p style={body}>
        DC형 퇴직연금도 근속 1년 이상이면 퇴직 시 퇴직급여를 받을 수 있어요.
        회사가 매달 연간 임금의 1/12 이상을 DC 계좌에 납입하면, 근로자가 ETF·펀드·원리금보장형 등으로 운용해요.
        수령액은 납입 총액에 운용 수익 또는 손실을 더한 평가금액이에요.
      </p>
      <p style={body}>
        DC형인지 DB형인지 모르겠다면 인사팀에 확인하거나 금융감독원 통합연금포털에서 조회할 수 있어요.
        잔액이 법정 최저 기준보다 낮으면 회사가 차액을 보전해줘야 해요.
      </p>

      <GreenBox>
        연간 임금 총액의 1/12 이상 → 매달 월급의 1/12 납입<br />
        운용 수익 나면 수령액 증가, 손실 나면 감소<br />
        법정 최저 기준보다 낮으면 회사가 차액 보전 의무
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="DC형 퇴직급여 수령 조건을 갖추고 있어요. 아래 계산기로 예상 금액을 확인해보세요."
        partialMatchText="조건에 따라 절차가 달라질 수 있어요. 금융사 고객센터나 고용노동부(1350) 상담을 권해요."
      />

      <Divider />

      <H2>DC 계좌 잔액 기준 예상 수령액은 얼마인가요?</H2>
      <p style={body}>
        월 급여와 근속 개월 수를 입력하면 법정 부담금 기준 누적액을 확인할 수 있어요.
        실제 잔액은 운용 수익·손실에 따라 달라지니 가입 금융사 앱에서 최신 평가금액을 함께 확인하세요.
        세금 차감 전 금액이에요.
      </p>

      <SectionBadge>DC형 수령액 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 법정 부담금(월급 1/12) 기준 누적 세전 금액이에요. 운용 수익·손실에 따라 실제 잔액은 다를 수 있어요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>IRP 이전에 필요한 서류</H2>
      <p style={body}>
        DC형 수령의 핵심은 가입 금융사에 퇴직 사실을 알리고 IRP 이전 신청을 하는 거예요.
        IRP 계좌를 미리 만들어두면 퇴직 후 바로 이전 처리가 가능해요.
        수수료 낮은 증권사 IRP가 장기 운용에 유리해요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>DC형 퇴직급여 수령 절차 4단계</H2>
      <p style={body}>
        잔액 확인부터 수령 방법 선택까지 퇴직 전에 미리 파악해두면 퇴직 후 혼선을 줄일 수 있어요.
        운용 손실을 방지하고 싶다면 퇴직 전 안전 자산 전환도 미리 챙기세요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>수령 전 반드시 챙길 것들</H2>
      <p style={body}>
        DC 계좌 잔액 확인과 안전 자산 전환을 먼저 챙기는 게 핵심이에요.
        마지막 달 부담금 누락도 의외로 자주 생기니 꼭 확인하세요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        IRP로 이전 후 55세 이후 10년 이상 연금으로 받으면 퇴직소득세가 40% 감면돼요.<br />
        일시금으로 바로 빼면 퇴직소득세를 전액 납부해야 해요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        DC형 퇴직급여 수령에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
