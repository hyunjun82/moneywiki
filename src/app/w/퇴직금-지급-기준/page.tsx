"use client";

// Q1. 퇴직을 앞두거나 이미 퇴직한 뒤 "내가 퇴직금 대상인지, 얼마나 받는지" 모르는 상황
// Q2. 지급 기준 2가지 충족 여부를 직접 판단하고 IRP 개설 후 회사에 요청해서 수령하는 행동
// Q3. ① 기준 2가지(1년+주15h) 정의와 예외, ② 5인미만·알바·계약직·수습 적용 여부,
//     ③ 계산 공식(평균임금×30일×근속년수), ④ 서류 목록, ⑤ 미지급 시 지연이자·신고 절차
// Q4. EligibilityChecker(자격확인) + GreenBox(핵심기준) + Calculator(금액) + Steps(절차) + FAQ(예외) + DocTable(서류) + Checklist(체크)

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR, 퇴직금_HIGHLIGHT } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "같은 사업장에서 1년 이상 계속 근무했어요" },
  { id: "c2", label: "4주 평균 주 15시간 이상 근무했어요" },
  { id: "c3", label: "정규직·계약직·알바 등 고용 형태와 무관하게 근로했어요" },
  { id: "c4", label: "퇴직 후 3년이 지나지 않았어요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "월 평균임금", min: 150, max: 800, step: 10, defaultValue: 300, format: (v: number) => `${v}만원` },
  { id: "years", label: "근속기간", min: 1, max: 35, step: 1, defaultValue: 5, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "예상 퇴직금",
    getValue: (v: Record<string, number>) => Math.round(v.salary * 10000 * v.years),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "1년당 기준 (1개월치)",
    getValue: (v: Record<string, number>) => Math.round(v.salary * 10000),
    format: (v: number) => `${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "근로계약서", required: true, where: "인사팀 또는 입사 시 수령본" },
  { name: "급여명세서 (최근 3개월)", required: true, where: "회사 인사팀 요청" },
  { name: "출퇴근 기록 또는 근무 스케줄표", required: true, where: "직접 보관 또는 인사팀" },
  { name: "4대보험 가입 이력", required: false, where: "고용24 무료 조회" },
  { name: "재직증명서", required: false, where: "인사팀 발급 요청" },
];

const STEPS = [
  {
    title: "지급 기준 2가지 충족 여부 판단",
    desc: "1년 이상 계속 근로 + 4주 평균 주 15시간 이상이 핵심이에요. 사업장 규모, 고용 형태, 4대보험 가입 여부는 전혀 무관해요. 입사일과 퇴직일 사이 날수를 정확히 세고, 근무 스케줄로 주 평균 시간을 따져보세요.",
    tip: "고용24(www.ei.go.kr)에서 고용보험 이력 조회로 재직 기간 확인이 가능해요",
    link: { label: "고용24 이력 조회", href: "https://www.ei.go.kr" },
  },
  {
    title: "퇴직금 직접 계산",
    desc: "1일 평균임금 × 30일 × (근속일수 ÷ 365) 공식이에요. 퇴직 직전 3개월 급여명세서가 기준이고, 상여금과 연차수당도 포함해야 실제 금액이 나와요. 기본급만 따지면 실제보다 10~20% 낮게 나올 수 있죠.",
    tip: "상여금은 연간 총액 ÷ 12로 월 환산해서 평균임금에 넣어야 해요",
  },
  {
    title: "회사에 서면 지급 요청",
    desc: "퇴직 후 14일 이내 지급이 원칙이에요. 자동 입금이 안 됐다면 인사팀에 서면으로 지급 요청을 해야 해요. 300만원 초과 퇴직금은 IRP 계좌로만 받을 수 있어서 IRP를 미리 개설해두는 게 좋아요.",
    tip: "IRP 계좌 번호를 인사팀에 미리 전달해두면 지급이 빨라져요",
  },
  {
    title: "미지급 시 고용노동부 신고",
    desc: "14일이 지났는데도 안 주면 연 20% 지연이자를 청구할 수 있죠. 내용증명 발송 → 고용노동부 진정 순서로 대응하면 대부분 해결돼요. 청구권 소멸시효는 퇴직일로부터 3년이에요.",
    tip: "고용노동부 민원마당(minwon.moel.go.kr)에서 온라인 진정 신청이 가능해요",
    link: { label: "고용노동부 민원마당", href: "https://minwon.moel.go.kr" },
  },
];

const CHECKLIST = [
  "1년 조건: 입사일과 퇴직일 사이 날수를 정확히 계산해두기",
  "주 15시간: 4주 평균이므로 기간별 스케줄 기록 보관",
  "3개월 급여명세서: 상여금·연차수당 포함 여부 점검",
  "IRP 계좌: 퇴직금 300만원 초과 시 반드시 미리 개설",
  "소멸시효: 퇴직 후 3년 안에 청구해야 권리가 유지돼요",
  "포기각서 요구 시: 서명 거부 — 서명해도 법적으로 무효예요",
];

const FAQS = [
  {
    q: "5인 미만 사업장도 퇴직금을 줘야 하나요?",
    a: "줘야 해요. 2010년 12월부터 모든 사업장에 적용됐어요. 편의점, 식당, 1인 사업장도 예외가 없어요. 사업주가 '우리는 작아서 해당 없다'고 해도 틀린 말이에요.",
  },
  {
    q: "알바도 1년 이상이면 퇴직금을 받을 수 있나요?",
    a: "받을 수 있죠. 주 15시간 이상, 1년 이상 근무했다면 알바도 지급 기준을 충족해요. 고용 형태는 무관하고, 사업주가 안 준다고 해도 고용노동부 진정으로 받을 수 있죠.",
  },
  {
    q: "수습 기간도 근무 기간에 포함되나요?",
    a: "포함돼요. 수습이든 시용이든 실제로 일하고 급여를 받았다면 계속근로기간에 들어가요. 회사가 '수습은 제외'라고 해도 법적 효력이 없어요.",
  },
  {
    q: "계약직에서 정규직으로 전환된 경우 기간이 합산되나요?",
    a: "합산돼요. 같은 사업장에서 계약직으로 시작해 정규직으로 전환됐다면, 계약직 시절도 근속기간에 포함해야 해요.",
  },
  {
    q: "사업주가 퇴직금 포기각서 서명을 요구하면 어떻게 하나요?",
    a: "거부하면 돼요. 근로자퇴직급여 보장법은 강행법규예요. 근로자가 서명했더라도 법적으로 무효고, 퇴직금 청구권은 그대로 유지돼요.",
  },
  {
    q: "주 15시간 미만으로 근무했는데 퇴직금을 받을 수 있나요?",
    a: "못 받아요. 4주 평균 주 15시간 미만이면 단시간 근로자로 분류돼서 퇴직금 지급 의무가 없어요. 다만 특정 주에 15시간을 못 채웠어도 4주 평균이 기준이에요.",
  },
  {
    q: "퇴직금을 14일 내에 못 받으면 어떻게 되나요?",
    a: "지연된 날부터 연 20% 이자를 청구할 수 있죠. 내용증명을 먼저 보내고, 그래도 안 주면 고용노동부 민원마당에서 임금체불 진정을 넣으면 돼요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 제4조: 퇴직급여제도 설정 의무", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "근로기준법 제2조: 근로자·임금·평균임금 정의", url: "https://www.law.go.kr/법령/근로기준법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부: 퇴직급여 지급 기준 안내", url: "https://www.moel.go.kr" },
      { label: "고용24: 고용보험 가입 이력 조회", url: "https://www.ei.go.kr" },
      { label: "고용노동부 민원마당: 임금·퇴직금 진정 신청", url: "https://minwon.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-조건", title: "퇴직금 받을 수 있는 조건", description: "1년·주 15시간 조건을 상세히 설명해요." },
  { slug: "퇴직금-계산법", title: "퇴직금 계산법, 얼마나 받을까?", description: "평균임금 기준 계산기로 직접 따져보세요." },
  { slug: "퇴직금-지급-기한", title: "퇴직금 지급 기한 14일 원칙", description: "지연이자 청구 방법까지 설명해요." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} highlightSlugs={퇴직금_HIGHLIGHT} currentSlug="퇴직금-지급-기준" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 지급기준 · 조건</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 지급 기준, 내가 해당되는지 모르겠죠?<br />
        고용형태·사업장 규모별 조건과 계산법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금 지급 기준은 사업장 크기, 고용 형태와 전혀 무관해요.
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여 보장법 제4조</a>는 5인 미만 사업장, 계약직, 알바, 파트타임 모두에 적용돼요.
        핵심은 단 두 가지예요. 같은 사업장에서 1년 이상 계속 근로했고, 4주 평균 주 15시간 이상 일했다면 무조건 받을 수 있죠.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>내가 퇴직금을 받을 수 있는 기준은?</H2>
      <p style={body}>
        퇴직금 지급 기준은 두 가지만 충족하면 돼요. 같은 사업장에서 1년 이상 계속 근무했고, 4주 평균 주 15시간 이상 일했다면 받을 수 있죠.
        정규직·계약직·알바·파트타임 모두 동일하게 적용되고, 4대보험 가입 여부도 무관해요.
      </p>
      <p style={body}>
        5인 미만 사업장도 2010년 12월부터 전면 적용됐어요. 1인 사업장, 편의점, 식당, 학원 모두 예외가 없어요.
        주 15시간 기준은 4주 평균이라서, 특정 주에 15시간을 못 채웠어도 평균이 15시간 이상이면 조건을 충족해요.
      </p>

      <GreenBox>
        1. 같은 사업장에서 1년 이상 계속 근로<br />
        2. 4주 평균 주 15시간 이상 근무<br />
        사업장 규모·고용 형태·4대보험 가입 여부 무관 (5인 미만도 2010년부터 의무 적용)
      </GreenBox>

      <SectionBadge>내 상황 체크해보기</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="퇴직금 지급 기준을 충족해요. 아래 계산기로 예상 금액을 따져보세요."
        partialMatchText="조건 일부가 다를 수 있죠. 고용노동부(1350) 상담을 받아보세요."
      />

      <Divider />

      <H2>지급 기준을 충족하면 얼마나 받을까?</H2>
      <p style={body}>
        퇴직금 계산법은 1년당 1개월치 월급이 기본이에요.
        월 평균임금 300만원으로 5년 근무하면 1,500만원이 기본 계산이에요.
        퇴직 직전 3개월 평균임금이 기준이고, 기본급 외에 상여금과 연차수당도 포함돼요.
      </p>
      <p style={body}>
        상여금은 연간 총액을 12로 나눠서 월 환산한 뒤 포함시켜야 해요.
        기본급만 쓰면 실제보다 10~20% 낮게 나올 수 있어서, 급여명세서 전체 항목을 꼼꼼히 봐야 해요.
        퇴직금 300만원 초과 시 <a href="/w/퇴직금-IRP-계좌" style={{ color: "#1D9E75", textDecoration: "underline" }}>IRP 계좌</a>로만 수령 가능해요.
      </p>

      <SectionBadge>퇴직금 예상 금액 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 월 평균임금 기준 추정치. 상여금·연차수당 포함 시 실제 금액이 더 높아요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>지급 기준 증명에 필요한 서류</H2>
      <p style={body}>
        퇴직금 지급 기준을 충족했다는 걸 증명하려면 근무 기간과 근무 시간 관련 서류가 필요해요.
        퇴직 후에는 발급이 어려울 수 있으니 재직 중에 챙겨두는 게 좋아요.
        4대보험 가입 이력은 <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 무료로 조회할 수 있죠.
      </p>
      <p style={body}>
        미지급 분쟁이 생겼을 때 출퇴근 기록이나 근무 스케줄표가 핵심 증거예요.
        카카오톡·이메일·메신저 등 근무 지시 기록도 함께 보관하면 강력한 증거가 돼요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>지급 기준 충족 확인부터 수령까지 절차</H2>
      <p style={body}>
        조건 확인 → 금액 계산 → 지급 요청 → 미지급 시 신고 순서예요.
        대부분은 3단계(지급 요청)에서 해결돼요. 14일이 지나도 안 들어오면 4단계로 넘어가야 해요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>수령 전 꼭 점검할 사항</H2>
      <p style={body}>
        하나라도 놓치면 손해가 생길 수 있으니, 아래 항목은 꼭 챙겨두세요.
        특히 IRP 계좌 미개설로 수령이 지연되는 경우가 많고, 포기각서 요구는 거부해야 해요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        사업주가 퇴직금 포기각서에 서명을 요구해도 거부하면 돼요.<br />
        서명했더라도 <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여 보장법</a>에 따라 무효로 퇴직금을 청구할 수 있죠.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 지급 기준에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여 보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에 문의하세요." />
    </ArticleLayout>
  );
}
