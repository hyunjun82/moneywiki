"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "기본급 외 고정 수당(식대·직책수당·교통비 등)이 매월 지급돼요" },
  { id: "c2", label: "육아휴직·무급휴직 기간이 퇴직 전 3개월에 포함돼 있어요" },
  { id: "c3", label: "퇴직 전 3개월 중 특정 달에 급여가 크게 줄거나 비정상적이었어요" },
  { id: "c4", label: "회사가 기본급만으로 퇴직금을 계산했어요" },
];

const CALC_SLIDERS = [
  { id: "base", label: "월 기본급 (만원)", min: 150, max: 600, step: 10, defaultValue: 280, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "fixed", label: "고정 수당 합계 (월, 만원)", min: 0, max: 200, step: 5, defaultValue: 50, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "years", label: "근속연수", min: 1, max: 30, step: 1, defaultValue: 3, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "통상임금 기준 퇴직금",
    getValue: (v: Record<string, number>) => Math.round((v.base + v.fixed) * 10000 * v.years),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "기본급만 기준 퇴직금",
    getValue: (v: Record<string, number>) => Math.round(v.base * 10000 * v.years),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
  {
    label: "고정 수당 포함 시 추가 금액",
    getValue: (v: Record<string, number>) => Math.round(v.fixed * 10000 * v.years),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원 더`,
  },
];

const DOCS = [
  { name: "근로계약서 (수당 내역 명시본)", required: true, where: "인사팀 또는 입사 시 수령본" },
  { name: "급여명세서 (최근 3개월 이상)", required: true, where: "회사 인사팀 요청" },
  { name: "취업규칙 또는 사규 (수당 지급 기준)", required: true, where: "회사 인사팀" },
  { name: "상여금 지급 규정", required: false, where: "회사 인사팀 또는 노사합의서" },
];

const STEPS = [
  {
    title: "평균임금 계산",
    desc: "퇴직 전 3개월 총임금(기본급 + 상여금 + 수당) ÷ 3개월 총 일수로 1일 평균임금을 구해요. 상여금은 연간 총액 ÷ 12로 환산해서 더해요.",
    tip: "병가·육아휴직·무급휴직 기간이 포함된 달은 평균임금이 낮아질 수 있어요",
  },
  {
    title: "통상임금 계산",
    desc: "기본급 + 정기적·일률적·고정적으로 지급되는 수당의 합이에요. 성과급처럼 지급 여부가 불확실한 건 빠져요. 매월 모든 직원에게 빠짐없이 지급되는 식대·교통비·직책수당이 대표적인 포함 항목이에요.",
    tip: "고정성·정기성·일률성 3가지를 모두 충족해야 통상임금에 해당해요",
  },
  {
    title: "두 기준 비교 후 높은 쪽 선택",
    desc: "평균임금 기준 퇴직금과 통상임금 기준 퇴직금을 각각 계산해서 높은 쪽을 선택해요. 근로기준법 제2조 2항이 이를 허용하는 조항이에요. 평균임금이 통상임금보다 낮을 때만 통상임금으로 계산해요.",
    tip: "두 금액을 모두 계산해서 비교해보세요",
  },
  {
    title: "회사에 재계산 요청",
    desc: "통상임금 기준이 유리하다면 회사에 수당을 포함한 퇴직금 재계산을 요청해요. 회사가 거부하면 고용노동부(1350)에 진정을 낼 수 있어요. 증빙 서류(급여명세서, 취업규칙)를 미리 갖춰두세요.",
    tip: "거부 시 내용증명을 먼저 보내고 그래도 안 되면 노동청 진정",
  },
];

const CHECKLIST = [
  "통상임금 항목 확인: 식대·교통비·직책수당의 정기성·일률성·고정성 여부",
  "평균임금 계산: 상여금 연간 총액 ÷ 12 환산 포함",
  "두 기준 비교: 통상임금 기준이 높으면 해당 기준으로 청구",
  "증빙 확보: 급여명세서 + 취업규칙 사본 필수",
  "IRP 계좌: 퇴직금 300만원 초과 시 IRP로만 수령 가능",
];

const FAQS = [
  {
    q: "통상임금과 평균임금, 어떤 경우에 통상임금이 더 높게 나오나요?",
    a: "육아휴직·무급병가 등으로 퇴직 전 3개월 임금이 평소보다 줄었을 때, 또는 고정 수당이 크고 평균임금 산정기간에 비정상적인 달이 끼었을 때 통상임금이 더 높게 나올 수 있어요.",
  },
  {
    q: "식대 20만원이 통상임금에 포함되나요?",
    a: "매월 모든 근로자에게 정기적·일률적으로 지급된다면 통상임금에 해당해요. 취업규칙에 명시되어 있거나 근로계약서에 '고정 식대'로 표기된 경우 더 확실하게 인정받을 수 있어요.",
  },
  {
    q: "성과급은 통상임금인가요?",
    a: "원칙적으로 아니에요. 지급 여부나 금액이 실적에 따라 달라지는 성과급은 고정성이 없어 통상임금에 해당하지 않아요. 다만 일정 요건만 충족하면 무조건 지급되는 조건부 상여금은 통상임금으로 볼 수 있어요.",
  },
  {
    q: "회사가 통상임금 기준 적용을 거부하면 어떻게 하나요?",
    a: "급여명세서·취업규칙을 갖추고 고용노동부(1350)에 진정을 낼 수 있어요. 대법원 판례에서도 정기·일률·고정 수당은 통상임금으로 인정한 판결이 다수 있어요. 증빙 서류가 있으면 인용 가능성이 높아요.",
  },
  {
    q: "고정 수당이 월 50만원이면 퇴직금 차이가 얼마나 나나요?",
    a: "근속 5년 기준으로 약 250만원(50만원 × 5년) 더 받을 수 있어요. 근속이 길수록, 고정 수당이 많을수록 차이가 커져요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제2조: 통상임금·평균임금 정의", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로자퇴직급여보장법 제8조: 퇴직금 산정", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부: 통상임금 산정 지침", url: "https://www.moel.go.kr" },
      { label: "고용노동부: 퇴직금 계산 방법 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-평균임금", title: "퇴직금 평균임금 계산 방법", description: "포함 항목과 산정 기준을 설명해요." },
  { slug: "퇴직금-계산-방법", title: "퇴직금 계산 방법", description: "공식부터 단계별 절차까지." },
  { slug: "퇴직금-상여금-포함", title: "상여금 퇴직금 포함 여부", description: "상여금 환산 방법을 설명해요." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="통상임금-퇴직금-계산" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 통상임금 · 계산</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        통상임금으로 퇴직금을 더 받을 수 있나요?<br />
        평균임금 비교부터 수당 포함 기준까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금은 보통 <a href="/w/퇴직금-평균임금" style={{ color: "#1D9E75", textDecoration: "underline" }}>평균임금</a>을 기준으로 계산해요.
        그런데 육아휴직이나 무급휴직이 끼어 있거나, 고정 수당이 많다면 통상임금 기준이 더 높게 나올 수 있어요.
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제2조 2항</a>은 평균임금이 통상임금보다 낮으면 통상임금으로 계산하도록 규정하고 있어요.
        기본급만으로 퇴직금을 받았다면 지금 바로 비교해보세요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>통상임금 기준, 내가 해당되는 상황인가요?</H2>
      <p style={body}>
        통상임금은 기본급에 정기적·일률적·고정적으로 지급되는 수당을 더한 금액이에요.
        성과급처럼 지급 여부가 불확실한 건 빠지고, 매월 빠짐없이 지급되는 식대·교통비·직책수당 등이 포함돼요.
        통상임금으로 계산한 퇴직금이 평균임금 기준보다 높다면 통상임금 기준을 선택할 수 있어요.
      </p>
      <p style={body}>
        회사가 기본급만으로 퇴직금을 계산했다면 고정 수당이 누락된 거예요.
        이런 경우 통상임금 기준으로 재계산을 요청할 수 있고, 거부 시 <a href="/w/퇴직금-미지급-신고" style={{ color: "#1D9E75", textDecoration: "underline" }}>노동청 진정</a>을 낼 수 있어요.
      </p>

      <GreenBox>
        월 고정 식대 20만원 + 직책수당 30만원이 있다면<br />
        통상임금 = 기본급 + 50만원이에요.<br />
        이를 기준으로 퇴직금을 다시 계산해보세요.
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="통상임금 기준 계산이 더 유리할 수 있어요. 아래 계산기로 두 기준을 비교해보세요."
        partialMatchText="상황에 따라 다를 수 있어요. 고용노동부(1350) 상담을 권해요."
      />

      <Divider />

      <H2>통상임금 vs 기본급만, 퇴직금 차이는?</H2>
      <p style={body}>
        월 기본급과 고정 수당, 근속연수를 입력하면 두 기준의 퇴직금 차이를 바로 비교할 수 있어요.
        고정 수당이 많을수록, 근속이 길수록 차이가 커져요.
      </p>

      <SectionBadge>통상임금 vs 기본급 비교 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 통상임금 기준: (기본급 + 고정 수당) × 근속연수. 평균임금이 통상임금보다 낮을 때 통상임금 기준이 적용돼요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>계산에 필요한 서류</H2>
      <p style={body}>
        통상임금 포함 여부를 판단하려면 수당 지급 기준이 명확히 나와 있는 서류가 필요해요.
        취업규칙이나 근로계약서에 수당 내역이 명시되어 있으면 증빙이 쉬워요.
        급여명세서에 수당 항목이 별도로 표시된 경우에도 통상임금 포함 여부를 확인할 수 있어요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>통상임금 기준 퇴직금 청구 절차</H2>
      <p style={body}>
        회사가 기본급만으로 계산했다면 먼저 수정 요청을 해보세요.
        거부하면 내용증명 발송 후 노동청에 진정을 내는 방법이 있어요.
        증빙 서류를 갖추고 있으면 대부분 해결돼요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>통상임금 청구 전 체크리스트</H2>
      <p style={body}>
        고정 수당 포함 여부가 핵심이에요. 두 기준을 모두 계산해서 비교하는 게 가장 좋아요.
        IRP 계좌 개설도 미리 해두면 퇴직금 이체가 빨라요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        고정 수당이 명확히 있고 정기적으로 지급됐다면 통상임금에 포함돼요.
        고용노동부 진정 또는 소액심판으로 대부분 해결 가능해요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        통상임금 퇴직금 계산에서 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법과 근로자퇴직급여보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
