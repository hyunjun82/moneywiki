"use client";

// Q1. IRP 계좌에 퇴직금이 입금됐는데 연금으로 받아야 하는지 일시금으로 꺼내야 하는지 모르고 신청 절차도 막막한 상황
// Q2. 수령 방법(연금 vs 일시금)을 결정하고 실제로 IRP 앱에서 수령 신청을 완료한다
// Q3. 연금 수령 3가지 조건(55세·5년·10년), 퇴직소득세 30% 감면(10년 이상), 연금소득세율(3.3~5.5%), 55세 전 인출 시 기타소득세 16.5% 추가, 신청 4단계 절차
// Q4. EligibilityChecker(조건 체크) + GreenBox(핵심 요약) + Calculator(세금 비교) + Steps(신청 절차) + DocTable(서류) + Checklist(수령 전 점검) + FAQ
//
// MAP:
// Q1 → 서론: IRP에 돈이 들어왔는데 뭘 해야 할지 모르는 막막함 공감
// Q2 → H2 순서: 조건 체크(연금 가능 여부 먼저) → 세금 비교(선택 근거) → 수령 절차 → 서류 → 체크리스트
// Q3 → H2 5개 + FAQ 6개
// Q4 → EligibilityChecker, GreenBox, Calculator, Steps, DocTable, Checklist

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR, 퇴직금_HIGHLIGHT } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "IRP 계좌에 퇴직금이 입금됐죠" },
  { id: "c2", label: "현재 만 55세 이상이에요" },
  { id: "c3", label: "IRP 계좌를 5년 이상 유지했죠" },
  { id: "c4", label: "연금 수령 기간을 10년 이상으로 설정할 수 있죠" },
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
  { name: "퇴직소득원천징수영수증", required: false, where: "회사 인사팀 또는 국세청 홈택스" },
];

const STEPS = [
  {
    title: "IRP 금융기관 앱 또는 지점 접속",
    desc: "IRP 계좌를 개설한 은행·증권사·보험사 앱을 열거나 지점을 방문해요. 대부분 앱에서 '퇴직연금 → 연금 수령 → 수령 방법 설정' 경로로 찾을 수 있죠.",
    tip: "앱 메뉴 위치: 퇴직연금 → 연금 수령 → 수령 방법 설정",
  },
  {
    title: "수령 방법 선택 연금 또는 일시금",
    desc: "만 55세 이상이고 IRP 가입 5년 이상이면 연금 수령을 선택할 수 있죠. 수령 기간을 10년 이상으로 설정하면 퇴직소득세 30%를 감면받고요. 55세 미만이거나 급히 필요하면 일시금으로 꺼낼 수 있는데, 이때는 세금 감면이 없어요.",
    tip: "연금 수령 기간이 길수록 세금 감면 비율이 커져요 (10년 미만은 감면 없음)",
  },
  {
    title: "수령 계좌 및 수령 주기 지정",
    desc: "연금이 입금될 본인 명의 계좌번호를 입력해요. 매월·매 분기·매년 중 수령 주기도 선택할 수 있죠. 일시금은 신청 즉시 지정 계좌로 이체되고요.",
    tip: "생활비 계획에 맞게 월 수령으로 설정하면 관리가 편해요",
  },
  {
    title: "세금 원천징수 후 수령 완료",
    desc: "연금은 연금소득세(3.3~5.5%), 일시금은 퇴직소득세가 원천징수된 뒤 입금되죠. 퇴직소득원천징수영수증은 연말정산 때 필요하니 반드시 보관해둬요.",
    tip: "연금소득세율: 70세 미만 5.5% / 70~80세 4.4% / 80세 이상 3.3%",
  },
];

const CHECKLIST = [
  "IRP 가입 기간 5년 이상 충족 여부 (연금 수령 조건)",
  "만 55세 이상인지 (연금 수령 개시 나이)",
  "연금 수령 기간 10년 이상 설정 퇴직소득세 30% 감면 적용",
  "수령 계좌: 본인 명의 일반 계좌 준비",
  "퇴직소득원천징수영수증 수령 및 보관 (연말정산 활용)",
  "수수료: IRP 운용 수수료 낮은 기관이 장기적으로 유리해요",
];

const FAQS = [
  {
    q: "IRP에서 퇴직금을 연금으로 받으려면 꼭 55세가 넘어야 하나요?",
    a: "맞아요. 연금 수령 개시 나이는 만 55세예요. 55세 이전에는 연금으로 받을 수 없고 일시금으로만 꺼낼 수 있죠. 이때 꺼내면 퇴직소득세 외에 기타소득세 16.5%가 추가로 붙고요.",
  },
  {
    q: "연금 수령 기간이 10년보다 짧으면 세금 감면이 없나요?",
    a: "그래요. 10년 미만으로 받으면 퇴직소득세 30% 감면이 적용되지 않아요. 10년 이상으로 수령 기간을 설정해야 감면 혜택을 받을 수 있죠. 연금 개시 후 수령 기간을 늘리는 것도 가능해요.",
  },
  {
    q: "IRP 일시금 수령 시 세금이 얼마나 빠지나요?",
    a: "일시금은 퇴직소득세가 원천징수돼요. 근속연수 공제를 적용한 뒤 세율이 결정되기 때문에 근속기간이 길수록 세금이 줄죠. 정확한 금액은 국세청 홈택스 퇴직소득세 모의계산에서 대조할 수 있고요.",
  },
  {
    q: "IRP 연금 수령 중에 일시금으로 전환할 수 있나요?",
    a: "가능해요. 연금 수령 중에도 잔액을 일시금으로 꺼낼 수 있죠. 단, 그동안 30% 감면 혜택을 받았던 금액에 대해 정산이 이뤄져요. 세금 면에서는 연금 수령을 유지하는 게 유리해요.",
  },
  {
    q: "IRP에 퇴직금이 들어오면 운용을 어떻게 해야 하나요?",
    a: "IRP 안에서 예금·ETF·펀드 등을 골라 운용할 수 있죠. 운용 수익은 연금 수령 시점까지 세금이 이연돼요. 수령 시점이 멀다면 적극적으로 운용하고, 수령이 임박했다면 예금 등 안전 자산 비중을 높이는 게 일반적이에요.",
  },
  {
    q: "IRP 퇴직금을 다른 금융기관으로 옮길 수 있나요?",
    a: "자유롭게 이전할 수 있죠. 수수료가 낮거나 운용 상품이 여러 곳으로 옮기면 유리하고요. 이전 중에는 운용이 잠시 중단되는 기간이 생길 수 있으니 수령 시점이 가깝다면 미리 여유를 두는 게 좋아요.",
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
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} highlightSlugs={퇴직금_HIGHLIGHT} currentSlug="퇴직금-IRP-수령방법" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · IRP · 연금수령</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        IRP에 퇴직금이 들어왔는데 어떻게 꺼내야 하죠?<br />
        연금 vs 일시금 세금 비교와 수령 신청 4단계
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        IRP 계좌에 퇴직금이 들어왔는데 다음 단계를 모르는 경우가 많아요.
        그냥 꺼내면 세금이 100% 나오고, 연금으로 받으면 30%를 줄일 수 있는데 조건이 뭔지 모르죠.
        <a href="/w/퇴직금-세금" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직소득세</a>를
        30% 줄이는 조건은 세 가지인데 생각보다 단순해요.
        조건 체크부터 신청 절차까지 순서대로 짚을게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* H2-1: 연금 수령 조건 체크 */}
      <H2>연금 수령 조건 세 가지, 갖추고 있나요?</H2>
      <p style={body}>
        IRP에서 퇴직금을 연금으로 받으려면 세 가지가 동시에 충족돼야 해요.
        만 55세 이상, IRP 계좌 가입 후 5년 이상, 그리고 연금 수령 기간 10년 이상 설정이죠.
        이 세 가지를 모두 갖춰야 <a href="/w/퇴직금-세금-절세-방법-IRP-연말정산" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직소득세 30% 감면</a>이 적용돼요.
      </p>
      <p style={body}>
        조건을 못 갖춘 상태에서 꺼내면 일시금 수령으로 처리되고요.
        퇴직소득세는 그대로 나오고, 55세 이전이라면 기타소득세 16.5%가 추가로 붙어요.
        급하지 않다면 55세까지 IRP를 유지하는 게 세금 면에서 훨씬 유리해요.
      </p>

      <GreenBox>
        만 55세 이상 (연금 개시 나이)<br />
        IRP 계좌 가입 후 5년 이상 유지<br />
        수령 기간 10년 이상 설정 → 퇴직소득세 30% 감면
      </GreenBox>

      <SectionBadge>내 연금 수령 조건 체크</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="연금 수령 조건을 모두 갖추고 있죠. 아래 계산기로 절세액을 먼저 비교해봐요."
        partialMatchText="아직 조건이 부족해요. 55세까지 IRP를 유지하면 절세 혜택을 받을 수 있죠."
      />

      <Divider />

      {/* H2-2: 세금 비교 */}
      <H2>일시금과 연금, 세금 차이가 얼마나 나나요?</H2>
      <p style={body}>
        퇴직금 규모가 클수록 연금 수령으로 아끼는 세금도 커져요.
        퇴직소득세는 근속연수 공제를 적용한 뒤 계산하는데, 공제 후 남은 금액의 30%가 감면되는 구조이고요.
        퇴직소득세가 300만원이라면 연금 수령 시 90만원을 덜 내는 거예요.
      </p>
      <p style={body}>
        퇴직금 총액과 근속 기간을 넣어보면 예상 절세액을 바로 비교할 수 있죠.
      </p>

      <SectionBadge>연금 수령 절세 효과 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 근속연수 공제 후 세율 6% 적용 추정치예요. 실제 세금은 근속연수공제·환산급여공제 적용 후 달라질 수 있죠."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      {/* H2-3: 수령 절차 */}
      <H2>IRP 퇴직금 수령 신청, 4단계로 끝나요</H2>
      <p style={body}>
        IRP 앱에서 연금 수령 신청까지 빠르면 10분 안에 완료되죠.
        수령 기간과 수령 주기를 미리 정해두면 신청할 때 헷갈리지 않고요.
      </p>
      <p style={body}>
        수령 방법을 한 번 선택해도 나중에 변경이 가능하지만, 세금 정산이 복잡해져요.
        처음부터 10년 이상으로 설정해두는 게 편해요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      {/* H2-4: 서류 */}
      <H2>IRP 수령 신청에 필요한 서류</H2>
      <p style={body}>
        앱으로 신청하면 별도 서류 제출 없이 처리되는 경우가 많아요.
        지점 방문이나 고액 퇴직금 수령 시에는 신분증과 원천징수영수증을 추가로 요청하기도 하죠.
      </p>
      <p style={body}>
        퇴직소득원천징수영수증은 퇴직 당일에 회사에서 받아두는 게 좋아요.
        퇴직 후에는 회사 시스템 접근이 막히는 경우가 많고, 연말정산 때도 쓰는 서류예요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      {/* H2-5: 체크리스트 */}
      <H2>수령 전에 놓치면 손해인 항목들</H2>
      <p style={body}>
        수령 기간을 9년으로 설정하면 퇴직소득세 30% 감면이 전혀 없어요.
        10년 이상으로 설정해야 감면이 적용되는데, 신청 후에도 기간 연장은 가능하니 일단 10년 이상으로 시작하는 게 나아요.
      </p>

      <SectionBadge>수령 전 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <BorderBox>
        55세 이전에 IRP를 중도해지하면 퇴직소득세 100% + 기타소득세 16.5%가 붙어요.
        급한 자금이 필요할 때는 IRP 담보 대출을 먼저 고려해봐요.
        중도해지는 최후의 수단이에요.
      </BorderBox>

      <Divider />

      {/* H2-6: FAQ */}
      <H2>IRP 수령에 대해 자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법과 소득세법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 금융감독원(1332) 또는 고용노동부(1350)에서 대조해봐요." />
    </ArticleLayout>
  );
}
