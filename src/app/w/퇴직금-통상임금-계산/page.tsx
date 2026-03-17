"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "기본급 외 매월 고정적으로 받는 수당이 있어요" },
  { id: "c2", label: "회사가 기본급만으로 퇴직금을 계산해서 지급했어요" },
  { id: "c3", label: "퇴직 후 아직 3년이 지나지 않았어요" },
  { id: "c4", label: "근로계약서에 수당 내역이 명시돼 있어요" },
];

const CALC_SLIDERS = [
  { id: "base", label: "월 기본급", min: 150, max: 500, step: 10, defaultValue: 280, format: (v: number) => `${v}만원` },
  { id: "fixed", label: "고정 수당 합계 (월)", min: 0, max: 150, step: 5, defaultValue: 50, format: (v: number) => `${v}만원` },
];

const CALC_RESULTS = [
  {
    label: "통상임금 기준 퇴직금 (1년)",
    getValue: (v: Record<string, number>) => (v.base + v.fixed) * 10000,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원/년`,
    highlight: true,
  },
  {
    label: "기본급만 기준 퇴직금 (1년)",
    getValue: (v: Record<string, number>) => v.base * 10000,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원/년`,
  },
];

const DOCS = [
  { name: "근로계약서 (수당 내역 포함)", required: true, where: "인사팀 또는 입사 시 수령본" },
  { name: "급여명세서 (최근 3개월)", required: true, where: "회사 인사팀" },
  { name: "상여금 지급 규정", required: false, where: "인사팀" },
  { name: "수당 지급 기준 서류", required: false, where: "취업규칙 또는 인사팀" },
];

const STEPS = [
  {
    title: "평균임금 계산",
    desc: "퇴직 전 3개월 총임금(기본급+상여금+수당) ÷ 3개월 총 일수로 1일 평균임금을 구해요. 이 값으로 퇴직금을 계산하면 평균임금 기준 퇴직금이 나와요.",
    tip: "상여금은 연간 총액 ÷ 12로 환산해서 포함시키세요",
  },
  {
    title: "통상임금 계산",
    desc: "기본급 + 정기적·일률적·고정적으로 지급되는 수당의 합이에요. 성과급처럼 지급 여부가 불확실한 건 빠져요. 매월 고정 지급되는 식대·교통비·직책수당은 포함돼요.",
    tip: "통상임금은 월 단위로 계산해서 퇴직금과 비교해요",
  },
  {
    title: "높은 쪽 선택",
    desc: "평균임금 기준과 통상임금 기준 퇴직금 중 높은 쪽을 선택할 수 있어요. 근로기준법 제2조 2항이 이를 허용해요. 두 금액을 모두 계산해서 비교해보세요.",
    tip: "고정 수당이 많을수록 통상임금 기준이 유리해요",
  },
  {
    title: "퇴직금 청구",
    desc: "선택한 기준으로 회사에 서면으로 지급을 요청해요. 회사가 기본급만으로 지급했다면 차액을 청구할 수 있어요. 소멸시효 3년 이내에 청구해야 해요.",
    tip: "청구 내용을 내용증명으로 남겨두면 법적 증거가 돼요",
  },
];

const CHECKLIST = [
  "통상임금 구성: 정기·일률·고정 수당만 포함",
  "평균임금도 계산: 두 가지 비교",
  "높은 쪽으로 청구: 근로기준법 제2조 허용",
  "고정 수당 입증: 근로계약서·취업규칙 보관",
  "IRP 계좌: 300만원 초과 시 필수 개설",
];

const FAQS = [
  {
    q: "통상임금이 뭔가요?",
    a: "기본급에 정기적·일률적·고정적으로 지급되는 수당을 더한 금액이에요. 성과급처럼 지급 여부가 불확실한 건 포함 안 돼요.",
  },
  {
    q: "평균임금과 통상임금 중 어느 게 더 높게 나오나요?",
    a: "야근수당이 많은 달이 포함되면 평균임금이 높고, 기본급 외 고정수당이 많으면 통상임금이 높을 수 있어요. 둘 다 계산해서 높은 쪽을 선택하면 돼요.",
  },
  {
    q: "식대 20만원이 통상임금에 포함되나요?",
    a: "매월 모든 근로자에게 정기적·일률적으로 지급된다면 통상임금에 해당해요.",
  },
  {
    q: "성과급은 통상임금인가요?",
    a: "원칙적으로 아니에요. 지급 여부와 금액이 실적에 따라 달라지면 고정성이 없어서 제외돼요.",
  },
  {
    q: "회사가 통상임금 기준 적용을 거부하면?",
    a: "고용노동부에 진정을 낼 수 있어요. 근로계약서와 급여명세서를 증빙 서류로 갖추고 이의를 제기하세요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제2조: 통상임금·평균임금 정의", url: "https://www.law.go.kr/법령/근로기준법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부: 통상임금 산정 지침", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-평균임금-산정", title: "퇴직금 평균임금 산정 방법", description: "3개월 평균임금 포함 항목을 정리했어요." },
  { slug: "퇴직금-지급-기준", title: "퇴직금 지급 기준", description: "퇴직금을 받을 수 있는 조건을 설명해요." },
  { slug: "퇴직금-계산법", title: "퇴직금 계산법", description: "평균임금 기준 계산기로 직접 확인해보세요." },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-통상임금-계산" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 통상임금 · 계산기준</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 계산, 통상임금으로 하면 더 받을 수 있나요?<br />
        평균임금 vs 통상임금 비교와 유리한 기준 선택
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금은 평균임금 기준이 원칙이지만, 평균임금이 통상임금보다 낮으면
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제2조</a>에 따라 통상임금 기준으로 계산할 수 있어요.
        기본급 외 고정 수당이 있다면 통상임금 기준이 더 유리한 경우가 많아요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>통상임금 기준이 유리한 상황인지 확인해보세요</H2>
      <p style={body}>
        통상임금은 기본급에 정기적·일률적·고정적으로 지급되는 수당을 더한 금액이에요.
        매달 변동 없이 받는 식대·교통비·직책수당 같은 항목들이 여기 포함돼요.
        고정 수당이 월급에서 큰 비중을 차지할수록 통상임금 기준이 유리해요.
      </p>
      <p style={body}>
        회사가 기본급만으로 퇴직금을 계산했다면 차액을 청구할 수 있어요.
        소멸시효는 3년이에요. 이미 퇴직했어도 3년 내라면 차액 청구가 가능해요.
      </p>

      <GreenBox title="통상임금 포함 항목 vs 제외 항목">
        포함: 기본급, 매월 고정 식대, 교통비(고정), 직책수당, 고정 자격수당<br />
        제외: 성과급·인센티브, 연장·야간·휴일 수당, 불규칙 상여금, 실비 식대
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="통상임금 기준으로 계산하면 퇴직금이 더 높게 나올 가능성이 높아요. 아래 계산기로 비교해보세요."
        partialMatchText="평균임금 기준도 함께 계산해서 더 높은 쪽을 선택하면 돼요."
      />

      <Divider />

      <H2>통상임금 vs 기본급 퇴직금 비교 계산기</H2>
      <p style={body}>
        기본급과 고정 수당을 입력하면 통상임금 기준 퇴직금과 기본급만 적용했을 때의 차이를 바로 볼 수 있어요.
        고정 수당이 월 50만원이면 1년 기준으로 50만원 차이가 나요.
        5년 근무라면 250만원 차이가 생기는 거예요.
      </p>

      <SectionBadge>통상임금 기준 비교 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 1년 근무 기준. 근무 기간이 길수록 통상임금 기준 차이가 커져요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>통상임금 기준 퇴직금 청구 서류</H2>
      <p style={body}>
        통상임금 기준 퇴직금을 청구하려면 어떤 수당이 정기적·고정적으로 지급됐는지 증명해야 해요.
        근로계약서에 수당 내역이 명시돼 있다면 가장 강력한 근거가 돼요.
        취업규칙이나 연봉계약서에 수당 지급 규정이 있다면 함께 제출하세요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>유리한 기준으로 퇴직금 받는 4단계</H2>
      <p style={body}>
        평균임금과 통상임금 중 어느 게 유리한지 직접 계산해보고, 높은 쪽을 기준으로 회사에 청구하는 게 핵심이에요.
        회사가 기본급만으로 계산해서 지급했다면 차액 청구가 가능해요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>퇴직금 계산 기준 체크리스트</H2>
      <p style={body}>
        고정 수당이 있는데 회사가 기본급만으로 계산했다면 이의 제기로 차액을 받을 수 있어요.
        IRP 계좌 미개설로 수령이 늦어지는 경우도 많으니 미리 준비해두세요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="두 기준 중 높은 쪽으로 청구하세요">
        평균임금 기준과 통상임금 기준을 모두 계산해서 높은 쪽을 선택할 수 있어요.<br />
        근로기준법 제2조가 보장하는 권리예요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        통상임금과 평균임금 차이에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
