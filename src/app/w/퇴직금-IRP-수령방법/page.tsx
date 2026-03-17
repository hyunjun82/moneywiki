"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "IRP 계좌에 퇴직금이 입금됐어요" },
  { id: "c2", label: "현재 만 55세 이상이에요" },
  { id: "c3", label: "IRP 계좌를 5년 이상 유지했어요" },
  { id: "c4", label: "연금 수령 기간을 10년 이상으로 할 수 있어요" },
];

const CALC_SLIDERS = [
  { id: "amount", label: "퇴직금 총액", min: 500, max: 20000, step: 500, defaultValue: 5000, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "years", label: "근속 기간", min: 1, max: 35, step: 1, defaultValue: 10, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "일시금 수령 시 퇴직소득세 (추정)",
    getValue: (v: Record<string, number>) => {
      const base = v.amount * 10000;
      const deduction = Math.min(v.years, 5) * 1000000 + Math.max(0, Math.min(v.years - 5, 5)) * 2000000 + Math.max(0, Math.min(v.years - 10, 10)) * 2500000 + Math.max(0, Math.min(v.years - 20, 10)) * 3000000 + Math.max(0, v.years - 30) * 3500000;
      const taxable = Math.max(0, base - deduction);
      return Math.round(taxable * 0.06);
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
  {
    label: "연금 수령 시 절세액 (30% 감면 기준)",
    getValue: (v: Record<string, number>) => {
      const base = v.amount * 10000;
      const deduction = Math.min(v.years, 5) * 1000000 + Math.max(0, Math.min(v.years - 5, 5)) * 2000000 + Math.max(0, Math.min(v.years - 10, 10)) * 2500000 + Math.max(0, Math.min(v.years - 20, 10)) * 3000000 + Math.max(0, v.years - 30) * 3500000;
      const taxable = Math.max(0, base - deduction);
      const tax = Math.round(taxable * 0.06);
      return Math.round(tax * 0.3);
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원 절약`,
    highlight: true,
  },
];

const DOCS = [
  { name: "신분증 (주민등록증 또는 운전면허증)", required: true, where: "본인 지참" },
  { name: "IRP 계좌 정보 (계좌번호, 금융기관명)", required: true, where: "IRP 개설 금융기관" },
  { name: "연금 수령 신청서", required: true, where: "IRP 금융기관 앱 또는 지점" },
  { name: "원천징수영수증 (퇴직소득)", required: false, where: "회사 인사팀 또는 국세청 홈택스" },
];

const STEPS = [
  {
    title: "IRP 금융기관 앱 또는 지점 접속",
    desc: "IRP 계좌를 개설한 은행·증권사·보험사 앱을 열거나 지점을 방문해요. 대부분 앱에서 '연금 수령 신청' 메뉴를 찾을 수 있어요.",
    tip: "앱 메뉴 위치: 퇴직연금 → 연금 수령 → 수령 방법 설정",
  },
  {
    title: "수령 방법 선택 (연금 vs 일시금)",
    desc: "55세 이상이고 IRP 가입 5년 이상이면 연금 수령이 가능해요. 수령 기간을 10년 이상으로 설정하면 퇴직소득세 30%를 감면받아요. 55세 미만이거나 급히 필요하면 일시금으로 꺼낼 수 있어요.",
    tip: "연금 수령 기간이 길수록 세금 감면 비율이 높아요 (10년 미만: 감면 없음)",
  },
  {
    title: "수령 계좌 및 수령일 지정",
    desc: "연금이 입금될 본인 명의 계좌번호를 입력해요. 매월, 매 분기, 매년 중 수령 주기도 선택할 수 있어요. 일시금은 바로 지정 계좌로 이체돼요.",
    tip: "생활비 계획에 맞게 월 수령으로 설정하면 관리가 편해요",
  },
  {
    title: "세금 원천징수 확인 후 수령",
    desc: "연금은 연금소득세(3.3~5.5%), 일시금은 퇴직소득세가 원천징수된 뒤 입금돼요. 원천징수영수증은 연말정산이나 종합소득세 신고 때 필요하니 보관하세요.",
    tip: "연금소득세율: 70세 미만 5.5% / 70~80세 4.4% / 80세 이상 3.3%",
  },
];

const CHECKLIST = [
  "IRP 가입 기간 5년 이상 충족 여부 확인 (연금 수령 조건)",
  "만 55세 이상인지 확인 (연금 수령 개시 나이)",
  "연금 수령 기간 10년 이상 설정 — 퇴직소득세 30% 감면",
  "수령 계좌: 본인 명의 일반 계좌 준비",
  "원천징수영수증 수령 및 보관 (연말정산 활용)",
  "수수료 확인: IRP 운용 수수료 낮은 기관이 유리해요",
];

const FAQS = [
  {
    q: "IRP에서 퇴직금을 연금으로 받으려면 꼭 55세가 넘어야 하나요?",
    a: "맞아요. 연금 수령 개시 나이는 만 55세예요. 55세 이전에는 연금으로 받을 수 없고, 일시금으로만 꺼낼 수 있어요. 이때 꺼내면 퇴직소득세 외에 기타소득세 16.5%가 추가로 붙어요.",
  },
  {
    q: "연금 수령 기간이 10년보다 짧으면 세금 감면이 없나요?",
    a: "10년 미만으로 받으면 퇴직소득세 30% 감면이 적용되지 않아요. 10년 이상으로 수령 기간을 설정해야 감면 혜택을 받을 수 있어요. 연금 개시 후 수령 기간을 변경하는 것도 가능해요.",
  },
  {
    q: "IRP 일시금 수령 시 세금이 얼마나 떼이나요?",
    a: "일시금은 퇴직소득세가 원천징수돼요. 근속연수 공제를 적용한 뒤 세율이 결정되므로, 근속기간이 길수록 세금이 적어요. 정확한 금액은 국세청 홈택스의 퇴직소득세 모의계산 서비스를 이용하면 확인할 수 있어요.",
  },
  {
    q: "IRP 연금 수령 중에 일시금으로 전환할 수 있나요?",
    a: "가능해요. 연금 수령 중에도 잔액을 일시금으로 꺼낼 수 있어요. 단, 이때는 퇴직소득세 30% 감면 혜택이 적용됐던 금액에 대해 정산이 이뤄져요. 연금 수령을 유지하는 게 세금 면에서 유리해요.",
  },
  {
    q: "IRP에 퇴직금이 들어오면 운용을 어떻게 해야 하나요?",
    a: "IRP 안에서 예금, ETF, 펀드 등을 선택해서 운용할 수 있어요. 운용 수익은 연금 수령 시까지 세금이 이연돼요. 수령 시점이 멀다면 적극적으로 운용하고, 수령이 임박했다면 예금 등 안전 자산 비중을 높이는 게 일반적이에요.",
  },
  {
    q: "IRP 퇴직금을 다른 금융기관으로 옮길 수 있나요?",
    a: "퇴직금을 다른 IRP 계좌로 이전하는 건 자유롭게 할 수 있어요. 수수료가 낮거나 운용 상품이 다양한 곳으로 옮기면 유리할 수 있어요. 단, 이전 중에는 운용이 중단되는 기간이 생길 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 제9조: 퇴직금 IRP 이전 의무", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "소득세법 제22조: 퇴직소득 세액 계산", url: "https://www.law.go.kr/법령/소득세법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "금융감독원: IRP 연금 수령 안내", url: "https://www.fss.or.kr" },
      { label: "고용노동부: 퇴직급여 제도 안내", url: "https://www.moel.go.kr" },
      { label: "국세청 홈택스: 퇴직소득세 모의계산", url: "https://www.hometax.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-IRP-계좌", title: "퇴직금 IRP 계좌 개설 방법", description: "수수료 비교부터 개설 절차까지." },
  { slug: "퇴직금-세금-절세-방법-IRP-연말정산", title: "퇴직금 세금 절세 방법", description: "IRP 연금 수령으로 줄이는 세금 계산." },
  { slug: "퇴직금-수령방법", title: "퇴직금 수령 방법 전체 정리", description: "일시금·연금·IRP 절차 한 번에." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-IRP-수령방법" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · IRP · 연금수령</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        IRP에 들어온 퇴직금, 어떻게 꺼내야 하죠?<br />
        일시금 vs 연금 세금 비교부터 수령 절차까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        IRP 계좌에 퇴직금이 들어왔는데 이제 어떻게 하면 되는지 막막한 분들이 많아요.
        그냥 꺼내면 세금이 많이 나오고, 연금으로 받으면 절세가 된다는데 조건이 복잡하죠.
        <a href="/w/퇴직금-세금" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직소득세</a>를
        30% 줄이는 방법이 있고, 그 조건은 생각보다 단순해요.
        수령 방법 선택 기준과 신청 절차를 아래에서 차례로 짚어드릴게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>연금 수령 조건을 갖추고 있나요?</H2>
      <p style={body}>
        IRP에서 퇴직금을 연금으로 받으려면 세 가지 조건이 동시에 충족돼야 해요.
        만 55세 이상, IRP 계좌 가입 후 5년 이상, 그리고 연금 수령 기간 10년 이상 설정이에요.
        이 세 가지를 모두 갖춰야 <a href="/w/퇴직금-세금-절세-방법-IRP-연말정산" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직소득세 30% 감면</a> 혜택이 적용돼요.
      </p>
      <p style={body}>
        조건을 못 갖춘 상태에서 꺼내면 일시금 수령으로 처리돼요.
        퇴직소득세는 그대로 나오고, 55세 이전이라면 기타소득세 16.5%가 추가로 붙어요.
        급하지 않다면 55세까지 기다리는 게 세금 면에서 훨씬 유리해요.
      </p>

      <GreenBox title="연금 수령 3대 조건">
        만 55세 이상 (연금 개시 나이)<br />
        IRP 계좌 가입 후 5년 이상 유지<br />
        수령 기간 10년 이상 설정 → 퇴직소득세 30% 감면
      </GreenBox>

      <SectionBadge>내 연금 수령 조건 체크</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="연금 수령 조건을 모두 갖추고 있어요. 아래 계산기로 절세액을 확인해보세요."
        partialMatchText="아직 조건이 부족해요. 55세가 될 때까지 IRP를 유지하면 절세 혜택을 받을 수 있어요."
      />

      <Divider />

      <H2>일시금과 연금, 세금 차이가 얼마나 나나요?</H2>
      <p style={body}>
        퇴직금 규모가 클수록 연금 수령으로 아끼는 세금도 커요.
        퇴직소득세는 근속연수 공제를 적용한 뒤 계산하는데, 공제 후 남은 금액의 30%가 감면돼요.
        예를 들어 퇴직소득세가 300만원이라면 연금 수령 시 90만원을 덜 내는 거예요.
      </p>
      <p style={body}>
        퇴직금 총액과 근속 기간을 넣어보면 예상 절세액을 바로 비교할 수 있어요.
      </p>

      <SectionBadge>연금 수령 절세 효과 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 근속연수 공제 후 세율 6% 적용 추정치. 실제 세금은 근속연수공제, 환산급여공제 적용 후 달라질 수 있어요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>IRP 수령 신청에 필요한 서류</H2>
      <p style={body}>
        앱으로 신청하면 별도 서류 제출 없이 처리되는 경우가 많아요.
        지점 방문이나 고액 퇴직금 수령 시에는 신분증과 원천징수영수증을 추가로 요청하기도 해요.
        퇴직 후 회사에서 원천징수영수증을 발급받아두면 연말정산 때도 쓸 수 있어요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>IRP 퇴직금 수령 절차 4단계</H2>
      <p style={body}>
        IRP 앱에서 연금 수령 신청까지 빠르면 10분 안에 완료할 수 있어요.
        수령 기간과 수령 주기를 미리 정해두면 신청할 때 헷갈리지 않아요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>수령 전 놓치면 안 되는 체크리스트</H2>
      <p style={body}>
        수령 방법을 한 번 선택하면 바꾸기 번거로워요.
        연금 수령 조건과 세금 감면 요건을 미리 확인해두는 게 좋아요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="10년 이상 연금 수령이 핵심이에요">
        수령 기간을 9년으로 설정하면 세금 감면이 전혀 없어요.<br />
        10년 이상으로 설정해야 퇴직소득세 30%를 덜 낼 수 있어요.<br />
        신청 후에도 수령 기간 연장은 가능하니 일단 10년 이상으로 시작하세요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        IRP 퇴직금 수령에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법과 소득세법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 금융감독원(1332) 또는 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
