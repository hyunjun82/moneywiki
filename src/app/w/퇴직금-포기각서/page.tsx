"use client";
// Q1. 회사가 퇴직금 포기각서에 서명하라고 요구했거나, 이미 서명해버린 상황이에요
// Q2. 포기각서가 무효임을 확인하고, 고용노동부에 진정을 접수해 퇴직금을 받아내야 해요
// Q3. 강행법규 원칙(서명해도 무효), 재직 중/퇴직 후 각서 구별, 소멸시효 3년, 내용증명·진정 절차
// Q4. GreenBox(무효 원칙 강조) + EligibilityChecker + Calculator + Steps(4단계 절차) + Checklist + FAQ
// MAP: Q1→서론 Q2→H2순서 Q3→H2깊이 Q4→컴포넌트

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { FAQ } from "@/components/article-ui/FAQ";
import { References } from "@/components/article-ui/References";
import { Disclaimer } from "@/components/article-ui/Disclaimer";
import { 퇴직금_SIDEBAR, 퇴직금_HIGHLIGHT } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직금 포기각서에 서명했죠" },
  { id: "c2", label: "재직 중이거나 퇴직할 때 서명했죠" },
  { id: "c3", label: "퇴직금을 한 푼도 받지 못했죠" },
  { id: "c4", label: "1년 이상 근무했죠" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "월 급여", min: 150, max: 1000, step: 10, defaultValue: 300, format: (v: number) => `${v}만원` },
  { id: "years", label: "근속 기간", min: 1, max: 35, step: 1, defaultValue: 5, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "청구 가능 퇴직금 추정액",
    highlight: true,
    getValue: (v: Record<string, number>) => v.salary * 10000 * v.years,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
  {
    label: "지연이자 추정 (1년 미지급 기준, 연 20%)",
    getValue: (v: Record<string, number>) => Math.round(v.salary * 10000 * v.years * 0.2),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "근로계약서 또는 임용 관련 서류", required: true, where: "인사팀 또는 본인 보관" },
  { name: "급여명세서 (최근 3개월 이상)", required: true, where: "인사팀 또는 온라인 급여 시스템" },
  { name: "4대보험 가입이력 확인서", required: true, where: "국민건강보험공단 홈페이지(무료)" },
  { name: "퇴직 사실 증빙 (퇴직 발령 통보 등)", required: true, where: "인사팀" },
  { name: "포기각서 사본", required: false, where: "본인 보관 — 있으면 유리한 증거" },
];

const STEPS = [
  {
    title: "포기각서 무효 확인",
    desc: "근로자퇴직급여보장법 제9조는 강행법규라 포기 약정 자체가 무효죠. 서명한 날짜와 실제 퇴직금 수령 여부를 정리해두세요. 각서 사본이 있다면 오히려 유리한 증거가 되죠.",
    tip: "받지도 않고 쓴 포기각서 = 무효. 받은 뒤 쓴 영수확인서 = 유효. 이 차이가 핵심이에요",
  },
  {
    title: "증빙 서류 수집",
    desc: "근로계약서, 급여명세서, 4대보험 가입이력을 준비하세요. 입사일과 퇴직일이 명확히 보여야 해요. 4대보험 가입이력은 국민건강보험공단 홈페이지에서 무료로 출력할 수 있고요.",
    tip: "회사 퇴직 전에 미리 챙겨두는 게 훨씬 편해요",
    link: { label: "4대보험 가입이력 조회", href: "https://www.nhis.or.kr" },
  },
  {
    title: "내용증명 발송",
    desc: "'포기각서는 강행법규 위반으로 무효이며, 퇴직금 ○○만원을 청구해요'라는 내용으로 내용증명을 보내세요. 소멸시효를 6개월 중단하는 효과가 생겨서 청구 기한을 늦출 수 있고요. 우체국 내용증명 서비스를 이용하면 돼요.",
    tip: "발송일 기준 소멸시효 중단 — 시효 만료 직전이어도 내용증명 먼저 보내세요",
    link: { label: "우체국 내용증명 안내", href: "https://www.epost.go.kr" },
  },
  {
    title: "고용노동부 진정 접수",
    desc: "회사가 거부하면 고용노동부 임금체불 진정을 접수하세요. 민원마당(minwon.moel.go.kr)에서 온라인으로 신청할 수 있죠. 근로감독관이 직접 사업주를 조사하고요. 소멸시효 3년 이내면 이미 퇴직한 뒤에도 청구할 수 있죠.",
    tip: "진정 접수부터 처리까지 보통 4~8주 걸려요",
    link: { label: "고용노동부 민원마당", href: "https://minwon.moel.go.kr" },
  },
];

const CHECKLIST = [
  "포기각서 무효 원칙: 강행법규 위반으로 처음부터 효력 없음",
  "실제 수령 여부 구분: 받기 전 서명한 각서는 무효, 받은 뒤 영수증은 유효",
  "소멸시효 3년: 퇴직일 기준 3년 내에 청구해야 함",
  "내용증명 발송: 청구 의사 표명 + 소멸시효 6개월 중단 효과",
  "고용노동부 진정: 회사 거부 시 minwon.moel.go.kr에서 온라인 접수",
  "지연이자: 지급기한(14일) 초과 시 연 20% 자동 발생",
];

const FAQS = [
  {
    q: "포기각서에 서명하면 정말 퇴직금 못 받나요?",
    a: "못 받는 게 아니에요. 근로자퇴직급여보장법은 강행법규라 근로자가 서명한 포기 약정 자체가 무효죠. 서명 여부와 상관없이 퇴직금 청구권은 그대로 살아있죠.",
  },
  {
    q: "포기각서와 퇴직금 영수증은 어떻게 다른가요?",
    a: "결정적 차이는 돈이 먼저냐, 각서가 먼저냐예요. 퇴직금을 실제로 받은 뒤 서명한 영수확인서는 유효해요. 반면 한 푼도 받지 않은 상태에서 '받지 않겠다'고 쓴 각서는 무효죠.",
  },
  {
    q: "회사가 포기각서 서명을 강요하면 어떻게 하나요?",
    a: "서명을 거부할 수 있죠. 강요 자체가 위법이라 고용노동부에 신고할 수 있고요. 이미 서명했더라도 나중에 청구 가능하니 서명했다고 포기하지 않아도 돼요.",
  },
  {
    q: "퇴직 후 3년이 지났는데 청구할 수 있나요?",
    a: "소멸시효 3년이 지나면 청구권이 소멸돼요. 퇴직일 기준 3년 이내라면 청구할 수 있고요. 시효 만료가 얼마 남지 않았다면 내용증명을 먼저 보내 소멸시효를 중단시켜야 해요.",
  },
  {
    q: "퇴직 후에 쓴 합의서도 무효인가요?",
    a: "퇴직 전 합의서는 무조건 무효예요. 퇴직 후에 작성한 합의서는 상황에 따라 달라요. 퇴직 후 자유로운 상태에서 적법하게 합의한 경우라면 효력이 인정될 수 있죠.",
  },
  {
    q: "포기각서를 쓰도록 강요당했다는 걸 어떻게 증명하나요?",
    a: "카카오톡·문자 등 메시지, 녹음, 증인 진술 등이 증거가 돼요. 강요 입증이 어려워도 각서 자체가 무효라는 법 원칙이 있어서, 강요를 증명하지 못해도 청구는 가능해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 제9조: 퇴직금 지급 의무", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "근로기준법 제15조: 강행법규 원칙 — 기준 미달 근로조건 무효", url: "https://www.law.go.kr/법령/근로기준법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 민원마당: 임금체불 진정 온라인 신청", url: "https://minwon.moel.go.kr" },
      { label: "고용노동부: 퇴직급여 제도 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-미지급-신고", title: "퇴직금 미지급 신고 방법", description: "고용노동부 진정 절차를 단계별로 안내해요." },
  { slug: "퇴직금-소멸시효", title: "퇴직금 소멸시효 3년 기준", description: "시효 중단 방법과 내용증명 활용법을 설명해요." },
  { slug: "퇴직금-지연이자", title: "퇴직금 지연이자 연 20% 계산법", description: "14일 기한 초과 시 자동으로 붙는 이자 계산 방법이에요." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} highlightSlugs={퇴직금_HIGHLIGHT} currentSlug="퇴직금-포기각서" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 포기각서 · 강행법규 무효</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 포기각서, 서명해도 받을 수 있나요?<br />
        무효 원칙부터 청구 절차까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        포기각서에 서명했어도 퇴직금을 받을 수 있죠.
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법</a>은 강행법규(强行法規)라서, 근로자가 서명한 포기 약정은 법적으로 처음부터 효력이 없어요.
        회사가 각서를 내밀어도 서명할 의무가 없고, 이미 서명했어도 청구권은 그대로 살아있죠.
        소멸시효 3년 안에 청구하면 퇴직금 전액과 지연이자까지 받을 수 있고요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>포기각서가 무효인 이유</H2>
      <p style={body}>
        퇴직금은 <a href="/w/퇴직금-지급-기준" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법 제9조</a>에 따라 사용자가 반드시 지급해야 하는 법정 권리예요.
        이 법은 강행법규로, 근로자와 사용자가 서로 합의해도 법이 정한 기준을 낮출 수 없죠.
        포기각서는 "나는 퇴직금을 받지 않겠다"는 약속이지만, 강행법규 아래에서는 이런 약속 자체가 효력이 없어요.
      </p>
      <p style={body}>
        근로기준법 제15조도 같은 원칙이에요. 법이 정한 기준에 미치지 못하는 근로조건은 그 부분이 무효라고 명시하고 있죠.
        포기각서는 퇴직금 기준보다 낮은 조건이라 자동으로 무효 처리돼요.
        강요로 서명했는지 여부와 관계없이, 각서 자체가 법 위반이기 때문이에요.
      </p>

      <GreenBox>
        서명 여부와 무관하게 퇴직금 청구권은 그대로예요<br />
        강압 여부를 증명하지 못해도 청구 가능해요<br />
        단, 퇴직금을 실제로 받은 뒤 서명한 영수확인서는 유효해요
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="퇴직금 청구가 가능한 상황이에요. 포기각서는 법적으로 무효라 아래 계산기로 예상 금액을 직접 계산해보세요."
        partialMatchText="일부 조건이 다를 수 있죠. 고용노동부(1350) 상담을 받아보세요."
      />

      <Divider />

      <H2>청구 가능 금액 계산해보세요</H2>
      <p style={body}>
        포기각서가 무효라면 퇴직금 전액을 청구할 수 있죠.
        퇴직금은 평균임금 × 30일 × 근속연수로 계산해요.
        지급기한인 14일을 넘기면 연 20% <a href="/w/퇴직금-지연이자" style={{ color: "#1D9E75", textDecoration: "underline" }}>지연이자</a>도 자동으로 붙고요.
      </p>
      <p style={body}>
        지연이자는 회사가 퇴직금을 주지 않는 기간만큼 쌓여요.
        미지급 기간이 길수록 청구 금액이 커지기 때문에, 소멸시효 만료 전에 빠르게 움직이는 게 유리하죠.
      </p>

      <SectionBadge>퇴직금 및 지연이자 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 포기각서는 법적으로 무효예요. 퇴직금 전액 + 연 20% 지연이자 청구 가능해요. (평균임금 × 30일 × 근속연수 기준)"
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>청구에 필요한 서류</H2>
      <p style={body}>
        청구에 필요한 서류는 많지 않아요. 근로 사실을 증명할 수 있는 서류면 충분하죠.
        포기각서 사본은 필수가 아니지만, 있으면 오히려 유리해요.
        법 위반 각서임을 보여주는 증거가 되기 때문이에요.
      </p>
      <p style={body}>
        4대보험 가입이력은 국민건강보험공단 홈페이지에서 무료로 출력할 수 있죠.
        회사를 떠나기 전에 미리 챙겨두면 나중에 훨씬 편해요.
        회사가 자료 제공을 거부하면 근로감독관이 직접 확보해줄 수 있고요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>퇴직금 청구 4단계 절차</H2>
      <p style={body}>
        포기각서가 무효라는 걸 알았다면 이제 실제로 청구해야 해요.
        <a href="/w/퇴직금-소멸시효" style={{ color: "#1D9E75", textDecoration: "underline" }}>소멸시효</a>는 퇴직일 기준 3년이죠.
        내용증명 발송부터 시작하면 소멸시효가 6개월 중단되는 효과도 생기고요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>청구 전 최종 체크리스트</H2>
      <p style={body}>
        <a href="/w/퇴직금-미지급-신고" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부 진정</a> 전에 아래 항목을 하나씩 짚어보세요.
        소멸시효 3년 안에 움직이는 게 핵심이에요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        구별 기준은 딱 하나 — 돈이 먼저냐, 각서가 먼저냐예요.<br />
        퇴직금을 먼저 받은 뒤 서명한 영수확인서는 유효해요.<br />
        한 푼도 받지 않은 상태에서 쓴 포기각서는 처음부터 무효죠.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 포기각서와 청구 절차에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법·근로기준법을 바탕으로 작성됐어요. 법 해석이나 개인 상황에 따라 결과가 다를 수 있으니 고용노동부(1350) 상담을 함께 받아보세요." />
    </ArticleLayout>
  );
}
