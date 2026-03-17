"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "같은 사업장에서 1년 이상 계속 근무했어요" },
  { id: "c2", label: "4주 평균 주 15시간 이상 근무했어요" },
  { id: "c3", label: "퇴직금이 아직 지급되지 않았어요" },
  { id: "c4", label: "퇴직 후 아직 3년이 지나지 않았어요" },
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
  { name: "4대보험 가입 이력", required: false, where: "고용24 무료 조회" },
  { name: "근무 스케줄·출퇴근 기록", required: false, where: "직접 보관 또는 인사팀" },
];

const STEPS = [
  {
    title: "지급 기준 충족 여부 확인",
    desc: "1년 이상 계속 근로 + 주 15시간 이상이에요. 사업장 규모, 업종, 고용 형태는 관계없어요. 5인 미만도 2010년부터 의무 적용이에요. 고용24에서 입사일·퇴직일을 무료로 확인할 수 있어요.",
    tip: "고용24(www.ei.go.kr)에서 고용보험 이력 조회 가능해요",
  },
  {
    title: "퇴직금 계산",
    desc: "1일 평균임금 × 30일 × (근속일수 ÷ 365)로 계산해요. 퇴직 전 3개월 급여명세서를 기준으로 해요. 상여금과 연차수당도 포함해야 정확해요. 기본급만 쓰면 실제보다 10~20% 낮게 나와요.",
    tip: "상여금은 연간 총액 ÷ 12로 월 환산해서 포함시키세요",
  },
  {
    title: "퇴직금 지급 요청",
    desc: "퇴직 후 14일 이내 지급이 원칙이에요. 자동으로 안 들어오면 인사팀에 서면으로 지급 요청을 해야 해요. 300만원 초과 시 IRP 계좌로만 받을 수 있어요.",
    tip: "IRP 계좌 미리 개설해서 계좌번호를 인사팀에 전달해두세요",
  },
  {
    title: "미지급 시 신고",
    desc: "14일이 지났는데 안 주면 연 20% 지연이자가 붙어요. 내용증명 발송 → 고용노동부 진정 순서로 대응하면 대부분 해결돼요. 소멸시효는 퇴직일로부터 3년이에요.",
    tip: "고용노동부 민원마당(minwon.moel.go.kr)에서 온라인 신고 가능해요",
  },
];

const CHECKLIST = [
  "1년 조건: 입사일과 퇴직일 사이 정확히 계산",
  "주 15시간: 4주 평균 15시간 이상 근무 증빙 보관",
  "IRP 계좌: 퇴직금 300만원 초과 시 미리 개설",
  "3개월 급여명세서: 평균임금 산정 기준으로 보관",
  "소멸시효: 퇴직 후 3년 안에 청구",
];

const FAQS = [
  {
    q: "5인 미만 사업장도 퇴직금을 줘야 하나요?",
    a: "줘야 해요. 2010년 12월부터 모든 사업장에 적용됐어요. 편의점, 식당, 1인 사업장 모두 예외가 없어요. 사업주가 '우리는 작아서 해당 없다'고 해도 틀린 말이에요.",
  },
  {
    q: "수습 기간도 근무 기간에 포함되나요?",
    a: "포함돼요. 수습이든 시용이든 실제로 일하고 급여를 받았다면 계속근로기간에 들어가요. 회사가 '수습은 제외'라고 해도 법적 효력이 없어요.",
  },
  {
    q: "정규직 전환 전 계약직 기간도 합산되나요?",
    a: "합산돼요. 같은 사업장에서 계약직에서 정규직으로 전환된 경우, 계약직 시절도 근속기간에 포함해야 해요.",
  },
  {
    q: "사측이 퇴직금 포기각서를 요구하면 어떻게 하나요?",
    a: "무효예요. 근로자퇴직급여 보장법은 강행법규예요. 근로자가 서명했더라도 법적으로 효력이 없고, 퇴직금 청구권은 그대로 유지돼요.",
  },
  {
    q: "알바도 1년 이상이면 퇴직금을 받을 수 있나요?",
    a: "받을 수 있어요. 주 15시간 이상, 1년 이상 근무했다면 알바도 퇴직금 지급 기준을 충족해요. 사업주가 안 준다고 해도 고용노동부 진정으로 받을 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 제4조: 퇴직급여제도 설정 의무", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "근로기준법 제2조: 근로자·사용자·임금 정의", url: "https://www.law.go.kr/법령/근로기준법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부: 퇴직금 지급 기준 안내", url: "https://www.moel.go.kr" },
      { label: "고용24: 고용보험 가입 이력 조회", url: "https://www.ei.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-조건", title: "퇴직금 받을 수 있는 조건", description: "1년·주 15시간 조건을 상세히 설명해요." },
  { slug: "퇴직금-계산법", title: "퇴직금 계산법, 얼마나 받을까?", description: "평균임금 기준 계산기로 직접 확인해보세요." },
  { slug: "퇴직금-지급-기한", title: "퇴직금 지급 기한 14일 원칙", description: "14일 초과 시 지연이자 청구 방법을 설명해요." },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-지급-기준" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 지급기준 · 조건</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 지급 기준, 5인 미만도 해당되나요?<br />
        조건 확인부터 수령까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금 지급 기준은 사업장 규모, 고용 형태와 무관해요.
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여 보장법 제4조</a>는 모든 사업장에 적용되고, 5인 미만도 2010년부터 의무화됐어요.
        핵심은 단 두 가지: 1년 이상 계속 근로와 주 15시간 이상이에요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>내가 퇴직금을 받을 수 있는 기준은?</H2>
      <p style={body}>
        퇴직금 지급 기준은 단순해요. 같은 사업장에서 1년 이상 계속 근무하고, 4주 평균 주 15시간 이상 일했다면 받을 수 있어요.
        정규직·계약직·알바·파트타임 모두 동일하게 적용돼요.
      </p>
      <p style={body}>
        5인 미만 사업장도 2010년부터 전면 적용됐어요. 1인 사업장, 편의점, 식당, 학원 모두 예외가 없어요.
        사업주가 "우리는 작은 가게라 해당 안 된다"고 해도 틀린 말이에요.
      </p>

      <GreenBox title="퇴직금 지급 기준 2가지">
        1. 같은 사업장에서 1년 이상 계속 근로<br />
        2. 4주 평균 주 15시간 이상 근무<br />
        5인 미만·고용형태·4대보험 가입 여부 무관
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="퇴직금 지급 기준을 충족해요. 아래 계산기로 예상 금액을 확인해보세요."
        partialMatchText="조건 일부가 다를 수 있어요. 고용노동부(1350) 상담을 받아보세요."
      />

      <Divider />

      <H2>기준을 충족하면 얼마나 받을 수 있을까?</H2>
      <p style={body}>
        퇴직금은 1년당 1개월치 월급이 기준이에요.
        월급 300만원으로 5년 근무하면 1,500만원이 기본이에요.
        상여금·연차수당이 포함되면 실제 금액은 더 높아져요.
      </p>

      <SectionBadge>퇴직금 예상 금액 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 월 평균임금 기준 추정치. 상여금·연차수당 포함 시 실제 금액이 더 높아요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>지급 기준 확인에 필요한 서류</H2>
      <p style={body}>
        근무 기간과 근무 시간을 증명하는 서류가 필요해요.
        퇴직 후엔 발급이 어려울 수 있으니 재직 중에 챙겨두는 게 좋아요.
        4대보험 가입 이력은 고용24에서 무료로 조회할 수 있어요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>지급 기준 충족부터 수령까지 절차</H2>
      <p style={body}>
        조건 확인 → 계산 → 지급 요청 → 미지급 시 신고 순서예요.
        단계별로 진행하면 빠르게 처리할 수 있어요.
        대부분 3단계(지급 요청)에서 해결돼요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>수령 전 확인 체크리스트</H2>
      <p style={body}>
        하나라도 놓치면 손해 볼 수 있어요.
        특히 IRP 계좌 미개설로 수령이 늦어지는 경우가 많아요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="퇴직금 포기각서는 무효예요">
        사업주가 퇴직금 포기각서에 서명을 요구해도 거부할 수 있어요.<br />
        서명했더라도 근로자퇴직급여 보장법에 따라 무효로 퇴직금을 청구할 수 있어요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 지급 기준에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여 보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
