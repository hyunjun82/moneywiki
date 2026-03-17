"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "회사에서 DB형(확정급여형) 퇴직연금에 가입되어 있어요" },
  { id: "c2", label: "현 직장에서 1년 이상 근무했어요" },
  { id: "c3", label: "퇴직이 확정됐거나 퇴직을 앞두고 있어요" },
  { id: "c4", label: "퇴직급여 300만원 초과가 예상돼요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "퇴직 직전 3개월 평균 월급", min: 200, max: 800, step: 10, defaultValue: 350, format: (v: number) => `${v}만원` },
  { id: "years", label: "근속 기간", min: 1, max: 35, step: 1, defaultValue: 10, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "DB형 퇴직급여 예상액 (세전)",
    getValue: (v: Record<string, number>) => Math.round(v.salary * 10000 * v.years),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "연금 수령 시 절세 효과 (10년 이상, 퇴직소득세 40% 감면)",
    getValue: (v: Record<string, number>) => {
      const total = Math.round(v.salary * 10000 * v.years);
      return Math.round(total * 0.055 * 0.4);
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원 절세`,
  },
];

const DOCS = [
  { name: "IRP 계좌번호 (은행명·예금주)", required: true, where: "증권사·은행 앱 개설 후 확인" },
  { name: "퇴직 확인서 또는 사직서", required: true, where: "회사 인사팀" },
  { name: "신분증", required: true, where: "본인 지참 또는 앱 인증" },
  { name: "퇴직급여 산정 내역서", required: false, where: "회사 인사팀 요청" },
];

const STEPS = [
  {
    title: "IRP 계좌 미리 개설",
    desc: "DB형 퇴직급여 300만원 초과 시 IRP 계좌로만 받을 수 있어요. 퇴직이 확정되면 바로 증권사나 은행 앱에서 개설하세요. 수수료가 낮은 미래에셋, 삼성증권, 키움증권 같은 증권사가 유리해요.",
    tip: "개설 즉시 계좌번호를 메모해두세요. 인사팀에 전달해야 해요.",
  },
  {
    title: "인사팀에 IRP 계좌번호 통보",
    desc: "퇴직이 확정되면 IRP 계좌번호(은행명·계좌번호·예금주)를 인사팀에 메일이나 문자로 알려요. 회사는 퇴직일로부터 14일 이내에 DB형 퇴직급여를 IRP로 이체해야 해요. 구두 통보보다 문서가 나중에 증거가 돼요.",
    tip: "14일을 넘기면 연 20% 지연이자를 청구할 수 있어요.",
  },
  {
    title: "IRP 계좌로 입금 확인",
    desc: "이체 후 IRP 계좌에서 입금 내역을 확인하세요. DB형은 회사가 이체 주체라 금융사가 아닌 회사 쪽에서 처리해요. 금액이 예상과 다르다면 인사팀에 산정 내역서를 요청하세요.",
    tip: "퇴직소득 원천징수영수증도 함께 받아두면 연말정산에 유용해요.",
  },
  {
    title: "일시금 또는 연금 수령 선택",
    desc: "IRP에 들어온 퇴직급여는 일시금으로 빼거나 55세 이후 연금으로 받을 수 있어요. 연금으로 10년 이상 받으면 퇴직소득세를 40% 감면받아요. 시간 여유가 있다면 IRP에서 ETF 운용도 가능해요.",
    tip: "55세 이전에 일시금으로 빼면 퇴직소득세를 전액 납부해야 해요.",
  },
];

const CHECKLIST = [
  "IRP 계좌: 퇴직 전 미리 개설, 계좌번호 인사팀에 메일로 전달",
  "14일 기한: 퇴직일 기산, 초과 시 지연이자(연 20%) 청구 가능",
  "산정 기준 확인: 퇴직 직전 3개월 평균임금 × 근속연수",
  "원천징수영수증: 인사팀에 함께 요청해두기",
  "연금 수령: 55세 이후 10년 이상 받으면 퇴직소득세 40% 절세",
];

const FAQS = [
  {
    q: "DB형과 DC형 퇴직금 수령 방법이 어떻게 달라요?",
    a: "수령 절차는 비슷하지만 적립 구조가 달라요. DB형은 회사가 적립·운용하다가 퇴직 시 IRP로 이체해줘요. DC형은 근로자 개인 계좌에 이미 쌓여 있고, 퇴직 시 그 잔액을 받아요. DB형은 수령액이 평균임금 기준으로 확정되고, DC형은 운용 결과에 따라 달라져요.",
  },
  {
    q: "DB형 퇴직급여 금액은 어떻게 계산돼요?",
    a: "법정 최저 기준은 퇴직 직전 3개월 평균임금 × 근속연수예요. 예를 들어 월 350만원으로 10년 일했다면 약 3,500만원이에요. 회사 규정이 이보다 높으면 그 기준을 따르고, 낮으면 근로자퇴직급여보장법 위반이에요.",
  },
  {
    q: "회사가 DB형 퇴직급여를 현금으로 주겠다고 하면요?",
    a: "300만원 초과 퇴직급여는 IRP로만 받아야 해요. 현금이나 일반 통장으로 지급하면 위법이에요. 거부 시 고용노동부(1350)에 신고할 수 있어요.",
  },
  {
    q: "DB형에서 55세 이전에 퇴직하면 연금 못 받아요?",
    a: "IRP에 이체된 금액은 55세 이전엔 연금으로 받을 수 없어요. 55세가 되면 그때 연금 신청하면 돼요. 그 전에 일시금으로 빼면 퇴직소득세를 전부 내야 해요.",
  },
  {
    q: "DB형 가입 여부를 어떻게 확인하나요?",
    a: "인사팀에 직접 문의하거나 금융감독원 통합연금포털(100lifeplan.fss.or.kr)에서 조회하면 돼요. 회사 규모에 따라 DB와 DC를 혼합 적용하는 경우도 있어요.",
  },
  {
    q: "퇴직급여를 IRP 말고 연금저축계좌에 받을 수 있나요?",
    a: "퇴직급여는 IRP 계좌로만 수령 가능해요. 연금저축계좌는 세액공제용으로 개인이 납입하는 계좌라 퇴직급여 수령 계좌로 사용할 수 없어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 제17조: DB형 퇴직급여 산정 기준", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
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
  { slug: "dc형-퇴직금-수령방법", title: "DC형 퇴직금 수령 방법", description: "확정기여형 계좌 잔액 확인부터 IRP 이전까지." },
  { slug: "퇴직금-IRP-수령방법", title: "IRP에서 퇴직금 받는 방법", description: "일시금·연금 선택과 세금 절감 전략." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="db형-퇴직금-수령방법" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · DB형 · 확정급여형</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        DB형 퇴직금, 어떻게 받나요?<br />
        IRP 이체 조건·절차·연금 선택까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        DB형(확정급여형) 퇴직연금은 회사가 적립·운용하다가 퇴직 시 <a href="/w/퇴직금-IRP-계좌" style={{ color: "#1D9E75", textDecoration: "underline" }}>IRP 계좌</a>로 이체해줘요.
        수령액은 퇴직 직전 3개월 평균임금 × 근속연수로 확정되고, 운용 결과에 관계없이 그 금액을 받아요.
        300만원 초과 시 IRP 계좌로만 수령 가능하고, 55세 이후 연금으로 받으면 <a href="/w/퇴직금-세금" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직소득세</a>를 최대 40%까지 줄일 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>DB형 퇴직급여, 내가 받을 수 있는 조건인가요?</H2>
      <p style={body}>
        DB형 퇴직연금은 회사가 가입을 결정하는 제도예요. 근로자가 직접 선택하는 게 아니라 회사가 DB형을 도입한 경우에 해당해요.
        근속 1년 이상이면 퇴직 시 퇴직급여를 받을 수 있고, 수령액은 퇴직 직전 3개월 평균임금을 기준으로 계산해요.
        회사가 더 높은 기준을 내규로 정했다면 그 기준을 따르고, 법정 기준 아래로는 내려갈 수 없어요.
      </p>
      <p style={body}>
        DB형인지 DC형인지 모르겠다면 인사팀에 직접 확인하거나 금융감독원 통합연금포털에서 조회하면 돼요.
        회사에 따라 DB형과 DC형을 혼합 적용하는 경우도 있어요. 이 경우 각 제도에서 별도로 수령해요.
      </p>

      <GreenBox title="DB형 퇴직급여 법정 산정 기준">
        퇴직 직전 3개월 평균임금 × 근속연수 (1년 = 30일치)<br />
        월 350만원 · 근속 10년 → 약 3,500만원<br />
        300만원 초과 시 반드시 IRP 계좌로만 수령
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="DB형 퇴직급여 수령 조건을 갖추고 있어요. 아래 계산기로 예상 금액을 확인해보세요."
        partialMatchText="조건에 따라 절차가 달라질 수 있어요. 고용노동부(1350) 상담을 권해요."
      />

      <Divider />

      <H2>DB형 퇴직급여 예상 금액은 얼마인가요?</H2>
      <p style={body}>
        퇴직 직전 3개월 평균 월급과 근속 기간을 입력하면 법정 최저 기준 퇴직급여를 바로 확인할 수 있어요.
        상여금이 있다면 <a href="/w/퇴직금-평균임금" style={{ color: "#1D9E75", textDecoration: "underline" }}>평균임금 계산</a> 시 포함해서 넣으면 더 정확해요.
        세금 차감 전 금액이니 실제 수령액은 퇴직소득세를 제외한 금액이에요.
      </p>

      <SectionBadge>DB형 퇴직급여 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 법정 최저 기준(평균임금 × 근속연수) 기준 세전 금액이에요. 회사 규정이 더 높을 수 있어요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>IRP 이체에 필요한 서류</H2>
      <p style={body}>
        DB형 수령의 핵심은 IRP 계좌번호를 인사팀에 전달하는 거예요.
        회사가 이체 주체라서 금융사가 아닌 인사팀이 처리해요.
        퇴직 전에 미리 IRP를 개설해두면 이체 처리가 빠르게 돼요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>DB형 퇴직급여 수령 절차 4단계</H2>
      <p style={body}>
        IRP 개설부터 수령 방법 선택까지 퇴직 전에 미리 알아두면 이체 지연 없이 처리할 수 있어요.
        14일 기한을 넘기면 지연이자를 받을 수 있으니 기한도 꼭 챙기세요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>수령 전 반드시 챙길 것들</H2>
      <p style={body}>
        IRP 계좌 개설을 미루다 이체가 지연되는 경우가 많아요. 퇴직이 확정되면 바로 개설하고 계좌번호를 전달하세요.
        수수료 낮은 증권사 IRP가 장기 운용에 유리해요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="연금 수령이 일시금보다 절세에 유리한 이유">
        55세 이후 연금으로 10년 이상 받으면 퇴직소득세가 40% 감면돼요.<br />
        일시금으로 바로 빼면 퇴직소득세를 한꺼번에 전부 내야 해요. 시간 여유가 있다면 연금이 유리해요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        DB형 퇴직급여 수령에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
