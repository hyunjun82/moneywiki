"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직금 포기각서에 서명했어요" },
  { id: "c2", label: "재직 중 또는 퇴직 시에 서명했어요" },
  { id: "c3", label: "실제로 퇴직금을 한 번도 받지 못했어요" },
  { id: "c4", label: "1년 이상 근무했어요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "월 급여", min: 150, max: 800, step: 10, defaultValue: 300, format: (v: number) => `${v}만원` },
  { id: "years", label: "근속 기간", min: 1, max: 35, step: 1, defaultValue: 5, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "청구 가능 퇴직금 추정",
    highlight: true,
    getValue: (v: Record<string, number>) => v.salary * 10000 * v.years,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
  {
    label: "지연이자 추정 (1년 지연 기준, 연 20%)",
    getValue: (v: Record<string, number>) => Math.round(v.salary * 10000 * v.years * 0.2),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "근로계약서", required: true, where: "인사팀" },
  { name: "급여명세서", required: true, where: "인사팀" },
  { name: "퇴직 사실 증빙", required: true, where: "인사팀" },
  { name: "포기각서 사본", required: false, where: "본인 보관" },
];

const STEPS = [
  {
    title: "포기각서 무효 확인",
    desc: "근로자퇴직급여보장법은 강행법규라 포기 약정 자체가 무효예요. 이미 서명했어도 청구권은 그대로예요. 서명한 날짜와 실제 퇴직금 수령 여부를 정리해두세요.",
    tip: "포기각서 사본은 오히려 유리한 증거가 돼요. 법 위반 각서임을 보여주기 때문이에요",
  },
  {
    title: "증빙 서류 준비",
    desc: "근로계약서, 급여명세서, 4대보험 가입이력을 준비해요. 입사일과 퇴직일이 명확하게 보이는 서류가 핵심이에요. 4대보험 가입이력은 국민건강보험공단 홈페이지에서 무료로 출력할 수 있어요.",
    tip: "퇴직 전에 미리 챙겨두는 게 좋아요",
  },
  {
    title: "내용증명 발송",
    desc: "'포기각서는 법적으로 무효이며, 퇴직금 ○○만원을 청구함'이라는 내용으로 내용증명을 보내요. 소멸시효 6개월 중단 효과가 생겨요. 우체국 내용증명 서비스를 이용하면 돼요.",
    tip: "청구 의사를 서면으로 남겨두는 게 중요해요",
  },
  {
    title: "고용노동부 진정",
    desc: "회사가 거부하면 고용노동부 임금체불 진정을 접수해요. 고용노동부 민원마당(minwon.moel.go.kr)에서 온라인으로 신청할 수 있어요. 근로감독관이 직접 조사해요.",
    tip: "소멸시효 3년 이내라면 이미 퇴직한 뒤에도 청구 가능해요",
  },
];

const CHECKLIST = [
  "포기각서 무효: 강행법규 위반으로 처음부터 효력 없음",
  "실제 수령 여부: 한 번도 못 받았으면 청구 가능",
  "소멸시효 3년: 퇴직일 기준 3년 내",
  "내용증명 발송: 청구 의사 표명 + 시효 중단",
  "고용노동부 진정: 거부 시 민원마당 접수",
];

const FAQS = [
  {
    q: "퇴직금 포기각서에 서명하면 정말 못 받나요?",
    a: "아니에요. 포기각서는 근로자퇴직급여보장법 위반으로 무효예요. 서명과 상관없이 퇴직금 청구권은 그대로예요.",
  },
  {
    q: "회사가 포기각서를 강요하면 어떻게 하나요?",
    a: "서명을 거부할 수 있어요. 강요가 심하면 고용노동부에 신고할 수 있어요. 서명했어도 나중에 청구 가능해요.",
  },
  {
    q: "포기각서와 퇴직금 영수증은 다른가요?",
    a: "달라요. 이미 퇴직금을 받고 쓴 영수증은 유효해요. 받지도 않고 쓴 포기각서는 무효예요.",
  },
  {
    q: "포기각서를 쓴 게 3년 전인데 청구할 수 있나요?",
    a: "소멸시효 3년 이내면 가능해요. 퇴직일 기준 3년이에요.",
  },
  {
    q: "퇴직금 포기 합의서도 무효인가요?",
    a: "퇴직 전 합의서는 무효예요. 하지만 퇴직 후 발생한 퇴직금을 놓고 적법하게 합의한 경우는 효력이 있을 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 제9조: 퇴직금 지급 의무", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "근로기준법 제15조: 강행법규 원칙", url: "https://www.law.go.kr/법령/근로기준법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 민원마당: 임금체불 진정 신청", url: "https://minwon.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-조건", title: "퇴직금 받을 수 있는 조건", description: "1년·주 15시간 조건을 설명해요." },
  { slug: "퇴직금-미지급-신고", title: "퇴직금 미지급 신고", description: "고용노동부 진정 절차를 안내해요." },
  { slug: "퇴직금-소멸시효", title: "퇴직금 소멸시효 3년", description: "시효 중단 방법을 설명해요." },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-포기각서" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 포기각서 · 법적 효력</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 포기각서, 서명했어도 받을 수 있나요?<br />
        강행법규 무효 원칙부터 청구 절차까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금 포기각서에 서명했어도 퇴직금을 받을 수 있어요.
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법</a>은 강행법규라서 근로자가 서명한 포기 약정은 법적으로 무효예요.
        회사가 각서를 내밀어도 서명할 필요 없고, 이미 서명했어도 청구권은 그대로 살아있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>포기각서가 무효인 이유</H2>
      <p style={body}>
        퇴직금은 근로자퇴직급여보장법 제9조에 따라 사용자가 반드시 지급해야 하는 법정 권리예요.
        이 법은 강행법규(强行法規)로, 근로자와 사용자가 서로 합의해도 법이 정한 기준 이하로 낮출 수 없어요.
      </p>
      <p style={body}>
        포기각서는 "나는 퇴직금을 받지 않겠다"는 약속이지만, 강행법규 아래에서는 이런 약속 자체가 효력이 없어요.
        근로기준법 제15조도 같은 원칙을 담고 있어요. 법이 정한 기준에 미치지 못하는 근로조건은 그 부분이 무효라고 명시하고 있어요.
      </p>

      <GreenBox title="핵심 정리: 포기각서는 무효">
        서명했어도 퇴직금 청구권은 살아있어요<br />
        강행법규 위반으로 각서 자체가 처음부터 효력 없어요<br />
        단, 퇴직금을 실제로 받은 뒤 서명한 영수증은 유효해요
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="퇴직금 청구가 가능한 상황이에요. 포기각서는 법적으로 무효이므로 아래 계산기로 예상 금액을 확인하세요."
        partialMatchText="상황에 따라 판단이 달라질 수 있어요. 고용노동부(1350) 상담을 받아보세요."
      />

      <Divider />

      <H2>청구 가능 금액 계산해보세요</H2>
      <p style={body}>
        포기각서가 무효라면 퇴직금 전액을 청구할 수 있어요. 지급기한(14일)을 넘기면 연 20% 지연이자도 붙어요.
        퇴직금은 평균임금 × 30일 × 근속연수로 계산해요.
        먼저 예상 금액을 파악해야 회사와 대응할 때 방향이 잡혀요.
      </p>

      <SectionBadge>퇴직금 및 지연이자 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 포기각서는 법적으로 무효예요. 퇴직금 전액 + 지연이자 청구 가능해요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>청구에 필요한 서류</H2>
      <p style={body}>
        청구에 필요한 서류는 많지 않아요. 근로 사실을 증명할 수 있는 서류면 충분해요.
        포기각서 사본은 필수는 아니지만 보관하고 있으면 오히려 유리해요. 법 위반 각서임을 보여주는 증거가 되기 때문이에요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>퇴직금 청구 4단계 절차</H2>
      <p style={body}>
        포기각서가 무효라는 걸 알았으면 이제 실제로 청구해야 해요.
        소멸시효는 퇴직일 기준 3년이에요. 내용증명을 보내면 소멸시효 6개월 중단 효과도 생겨요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>청구 전 최종 체크리스트</H2>
      <p style={body}>
        고용노동부 진정 전에 아래 항목을 하나씩 짚어보세요.
        소멸시효 3년 안에 움직이는 게 중요해요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="단 하나의 예외: 영수 확인 각서">
        퇴직금을 실제로 받은 뒤 서명한 영수 확인 각서는 유효해요.<br />
        구별 기준은 돈이 먼저냐, 각서가 먼저냐예요.<br />
        한 푼도 받지 않은 상태에서 쓴 포기각서는 무효예요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 포기각서와 청구 절차에 대해 많이 나오는 질문들이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법과 근로기준법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
