"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직연금 DB형(확정급여형)에 가입되어 있어요" },
  { id: "c2", label: "퇴직일로부터 14일 이내 수령을 원해요" },
  { id: "c3", label: "IRP 계좌를 아직 만들지 않았어요" },
  { id: "c4", label: "일시금보다 연금으로 받고 싶어요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "퇴직 직전 3개월 평균 월급", min: 200, max: 800, step: 10, defaultValue: 350, format: (v: number) => `${v}만원` },
  { id: "years", label: "근속 기간", min: 1, max: 35, step: 1, defaultValue: 10, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "DB형 퇴직급여 (법정 최저 기준)",
    getValue: (v: Record<string, number>) => Math.round(v.salary * 10000 * 30 / 30 * v.years),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "IRP 이체 후 연금 수령 시 절세 효과",
    getValue: (v: Record<string, number>) => {
      const total = Math.round(v.salary * 10000 * v.years);
      return Math.round(total * 0.3 * 0.03);
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원 절세`,
  },
];

const DOCS = [
  { name: "IRP 계좌번호 (은행명·예금주)", required: true, where: "증권사·은행 앱 개설 후 확인" },
  { name: "퇴직 확인서 또는 사직서", required: true, where: "회사 인사팀" },
  { name: "신분증", required: true, where: "본인 지참 또는 앱 인증" },
  { name: "DB형 퇴직연금 가입 확인서", required: false, where: "회사 인사팀 또는 금융사" },
];

const STEPS = [
  {
    title: "IRP 계좌 개설",
    desc: "DB형 퇴직급여는 300만원 초과 시 IRP 계좌로만 수령할 수 있어요. 퇴직 전에 증권사나 은행 앱으로 미리 만들어두면 이체가 빠르게 처리돼요. 수수료 낮은 증권사(미래에셋, 삼성증권 등) 추천해요.",
    tip: "개설 후 계좌번호를 인사팀에 문자·메일로 전달하세요",
  },
  {
    title: "인사팀에 IRP 계좌번호 통보",
    desc: "퇴직이 확정되면 IRP 계좌번호(은행명, 계좌번호, 예금주명)를 인사팀에 알려요. 회사는 퇴직일로부터 14일 이내에 DB형 퇴직급여를 IRP로 이체해야 해요. 구두 통보보다 메일이나 문자가 증거로 남아요.",
    tip: "14일 초과 시 지연이자(연 20%) 청구 가능해요",
  },
  {
    title: "DB형 퇴직급여 수령 확인",
    desc: "이체 완료 후 IRP 계좌에서 입금 내역을 확인해요. DB형은 회사(사용자)가 적립한 금액으로 지급하므로 금융사가 아니라 회사가 이체 주체예요. 금액이 예상과 다르면 회사에 산정 내역을 요청하세요.",
    tip: "퇴직소득 원천징수영수증도 함께 요청하면 좋아요",
  },
  {
    title: "일시금 or 연금 선택",
    desc: "IRP에 들어온 퇴직급여를 일시금으로 빼면 퇴직소득세를 바로 냅니다. 55세 이후 연금으로 수령하면 퇴직소득세의 30~40%를 감면해요(10년 이상 수령 시 40%). 연금 수령을 고려하면 IRP에 두는 게 유리해요.",
    tip: "연금 수령 나이(55세)까지 시간이 있다면 ETF 운용도 가능해요",
  },
];

const CHECKLIST = [
  "IRP 계좌 — 퇴직 전 미리 개설 (300만원 초과 시 필수)",
  "계좌번호 통보 — 메일·문자로 증거 남기기",
  "14일 기한 — 초과 시 지연이자(연 20%) 청구 가능",
  "DB형 산정 기준 — 퇴직 직전 3개월 평균임금 × 근속연수",
  "연금 수령 — 55세 이후 연금으로 받으면 세금 30~40% 절세",
];

const FAQS = [
  {
    q: "DB형과 DC형 퇴직금 수령 방법이 다른가요?",
    a: "수령 절차는 비슷해요. 차이는 적립 주체예요. DB형은 회사가 적립·운용하고 퇴직 시 IRP로 이체해요. DC형은 근로자 개인이 운용하는 계좌에 이미 쌓여 있고 퇴직 시 그 금액을 받아요.",
  },
  {
    q: "DB형 퇴직급여 금액은 어떻게 계산되나요?",
    a: "법정 최저 기준은 퇴직 직전 3개월 평균임금 × 근속연수예요. 회사 규정이 이보다 높으면 그 기준을 따라요. 낮으면 법정 기준 미달로 근로자퇴직급여보장법 위반이에요.",
  },
  {
    q: "회사가 DB형 퇴직급여를 현금으로 주겠다고 하면?",
    a: "300만원 초과 퇴직급여는 IRP로만 받아야 해요. 현금이나 일반 통장으로 지급하면 위법이에요. 거부 시 고용노동부(1350)에 신고하면 돼요.",
  },
  {
    q: "DB형에서 퇴직 후 연금으로 받으려면 언제부터 가능한가요?",
    a: "IRP에 들어온 뒤 55세 이후부터 연금으로 수령 가능해요. 연금 수령 기간이 10년 이상이면 퇴직소득세를 40%까지 감면받아요.",
  },
  {
    q: "DB형 가입 여부를 어떻게 확인하나요?",
    a: "인사팀에 문의하거나 고용노동부 퇴직연금 통합공시(금감원 통합연금포털)에서 확인할 수 있어요. 회사 규모에 따라 DB·DC 혼합 가입도 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 제17조 — DB형 퇴직급여 산정", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "근로자퇴직급여보장법 제9조 — IRP 이체 의무", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "금융감독원 — 퇴직연금 통합공시", url: "https://www.fss.or.kr" },
      { label: "고용노동부 — 퇴직연금 제도 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "dc형-퇴직금-수령방법", title: "DC형 퇴직금 수령 방법", description: "DC형 계좌에서 직접 수령하는 절차를 설명해요." },
  { slug: "퇴직금-IRP-계좌", title: "IRP 계좌 개설 방법", description: "어느 금융사에서 만들지, 수수료 비교까지." },
  { slug: "퇴직금-세금", title: "퇴직금 세금, 얼마나 떼나요?", description: "DB형 퇴직급여의 퇴직소득세를 계산해요." },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="db형-퇴직금-수령방법" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · DB형 · 수령방법</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        DB형 퇴직금(확정급여형), 어떻게 받나요?<br />
        IRP 이체부터 연금 수령 선택까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        DB형(확정급여형) 퇴직연금은 회사가 적립하고 운용하다가 퇴직 시 <a href="/w/퇴직금-IRP-계좌" style={{ color: "#1D9E75", textDecoration: "underline" }}>IRP 계좌</a>로 이체해줘요.
        법정 기준은 퇴직 직전 3개월 평균임금 × 근속연수이고, 300만원 초과 시 IRP로만 수령할 수 있어요.
        퇴직 후엔 IRP에서 일시금으로 빼거나 55세 이후 연금으로 받으면 <a href="/w/퇴직금-세금" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직소득세</a>를 절세할 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>DB형 퇴직금, 내가 받을 수 있는 조건인가요?</H2>
      <p style={body}>
        DB형(확정급여형) 퇴직연금은 근속 1년 이상 근무하고 퇴직하면 받을 수 있어요.
        수령액은 퇴직 직전 3개월 평균임금 × 근속연수 기준이에요. 회사가 더 높은 기준을 정해두면 그 기준을 따르고, 법정 기준 아래로는 내려갈 수 없어요.
        300만원 초과 퇴직급여는 반드시 IRP 계좌로 받아야 해요(2022년 4월 이후 의무화).
      </p>
      <p style={body}>
        DB형인지 DC형인지 모르겠다면 인사팀에 확인하거나 고용노동부 퇴직연금 통합공시에서 조회하면 돼요.
        회사에 따라 DB형과 DC형을 혼합 적용하는 경우도 있어요.
      </p>

      <GreenBox title="DB형 퇴직급여 법정 기준">
        퇴직 직전 3개월 평균임금 × 근속연수 (1년 = 30일치)<br />
        근속 10년 · 월 350만원이면 → 약 3,500만원<br />
        300만원 초과 시 IRP 계좌로만 수령 가능
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="DB형 퇴직급여 수령 절차를 바로 시작할 수 있어요. 아래 계산기로 예상 금액을 확인하세요."
        partialMatchText="조건에 따라 절차가 달라질 수 있어요. 고용노동부(1350) 상담을 권해요."
      />

      <Divider />

      <H2>DB형 퇴직급여 예상 금액 계산</H2>
      <p style={body}>
        퇴직 직전 3개월 평균 월급과 근속 기간을 입력하면 법정 최저 기준 퇴직급여를 바로 확인할 수 있어요.
        상여금이 있다면 <a href="/w/퇴직금-평균임금" style={{ color: "#1D9E75", textDecoration: "underline" }}>평균임금 계산</a> 시 포함해서 넣으면 더 정확해요.
      </p>

      <SectionBadge>DB형 퇴직급여 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 법정 최저 기준(평균임금 × 근속연수). 회사 규정이 더 높을 수 있어요. 퇴직소득세 차감 전 금액이에요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>수령에 필요한 서류</H2>
      <p style={body}>
        DB형 수령의 핵심은 IRP 계좌번호를 인사팀에 전달하는 거예요.
        퇴직 전에 미리 개설하고 계좌번호를 챙겨두면 이체가 빠르게 처리돼요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>DB형 퇴직급여 수령 4단계</H2>
      <p style={body}>
        IRP 개설 → 계좌번호 통보 → 이체 확인 → 연금/일시금 선택 순서예요.
        14일 기한이 지나면 지연이자를 받을 수 있으니 기한을 꼭 체크하세요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>수령 전 체크리스트</H2>
      <p style={body}>
        IRP 계좌 개설을 미루다가 이체가 지연되는 경우가 많아요. 퇴직이 확정되면 바로 개설하세요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="연금 수령이 일시금보다 유리한 이유">
        55세 이후 연금으로 10년 이상 받으면 퇴직소득세 40% 감면이에요.<br />
        일시금으로 빼면 세금을 한꺼번에 다 내야 해요. 시간이 있다면 연금이 유리해요.
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
