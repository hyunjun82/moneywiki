"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "정기적으로 상여금을 받고 있어요" },
  { id: "c2", label: "퇴직 전 3개월 급여명세서를 보관하고 있어요" },
  { id: "c3", label: "연간 상여금 총액을 알고 있어요" },
  { id: "c4", label: "회사 계산과 내 계산 결과가 달라요" },
];

const CALC_SLIDERS = [
  { id: "total3m", label: "3개월 총임금 (상여금 환산 포함)", min: 300, max: 3000, step: 50, defaultValue: 900, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "years", label: "근속 기간", min: 1, max: 30, step: 1, defaultValue: 5, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "퇴직금 (법정 산정 방식)",
    getValue: (v: Record<string, number>) => Math.round((v.total3m * 10000 / 91) * 30 * v.years),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "1일 평균임금",
    getValue: (v: Record<string, number>) => Math.round(v.total3m * 10000 / 91),
    format: (v: number) => `약 ${Math.round(v / 10000 * 10) / 10}만원`,
  },
];

const DOCS = [
  { name: "급여명세서 (최근 3개월)", required: true, where: "회사 인사팀" },
  { name: "상여금 지급 내역서", required: true, where: "인사팀 또는 급여명세서" },
  { name: "근로계약서 (입사일 확인)", required: true, where: "인사팀" },
  { name: "퇴직연금 적립금 확인서 (DB·DC형 시)", required: false, where: "금융기관 앱" },
];

const STEPS = [
  {
    title: "3개월 총임금 산정",
    desc: "퇴직 전 3개월 기본급 + 고정수당 + 상여금(연간÷12×3)을 합산해요. 실비 변상·임시 지급분은 제외해요. 상여금 환산을 빠뜨리면 퇴직금이 낮게 나와요.",
    tip: "상여금 = 연간 총액 ÷ 12 × 3",
  },
  {
    title: "1일 평균임금 계산",
    desc: "3개월 총임금 ÷ 3개월 총 일수(89~92일)예요. 달력에서 실제 일수를 세는 게 정확해요. 편의상 91일로 나눠도 큰 차이 없어요.",
    tip: "2월이 포함되면 일수가 줄어 평균임금이 높아져요",
  },
  {
    title: "퇴직금 공식 적용",
    desc: "1일 평균임금 × 30일 × 근속연수예요. 근속기간이 딱 떨어지지 않으면 일 단위로 계산해요. 예: 근속 547일 = 547÷365 = 1.498년이에요.",
    tip: "소수점 근속기간도 일 단위로 환산해야 정확",
  },
  {
    title: "검증 및 청구",
    desc: "직접 계산한 값을 회사 계산과 비교해요. 차이가 있으면 인사팀에 재계산을 요청하고, 거부 시 고용노동부에 진정을 내요.",
    tip: "소멸시효 3년 이내라면 퇴직 후에도 청구 가능",
  },
];

const CHECKLIST = [
  "3개월 총임금: 상여금 환산 포함 필수",
  "1일 평균임금: 실제 총 일수로 나누기",
  "퇴직금 공식: 1일평균임금×30×근속연수",
  "통상임금 비교: 낮으면 통상임금 사용 가능",
  "IRP: 300만원 초과 시 의무 수령",
];

const FAQS = [
  {
    q: "퇴직금 산정 방식이 DB형·DC형과 다른가요?",
    a: "일반 퇴직금과 DB형은 퇴직 시점 임금 기준이에요. DC형은 매년 연봉의 1/12이 적립돼요. 산정 방식이 달라서 결과도 달라질 수 있어요.",
  },
  {
    q: "3개월 총임금에 뭐가 포함되나요?",
    a: "기본급, 고정수당, 상여금(월 환산), 연차수당(기간 내 지급분)이 포함돼요. 실비 변상, 임시 지급분은 제외돼요.",
  },
  {
    q: "퇴직금 산정 시 근속기간은 어떻게 계산하나요?",
    a: "입사일부터 퇴직일까지 일 단위로 계산해요. 일 단위를 365로 나눠 연수로 환산해요.",
  },
  {
    q: "상여금이 산정 기간 내에 들어왔는데 전액 포함하면 되나요?",
    a: "아니에요. 연간 총액을 12로 나눠 월 환산한 3배(3개월분)를 포함해야 해요. 그달에 지급된 금액 전체를 넣으면 왜곡돼요.",
  },
  {
    q: "평균임금이 통상임금보다 낮으면 어떻게 되나요?",
    a: "통상임금을 평균임금으로 사용할 수 있어요. 근로기준법 제2조 2항이 이를 허용해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제2조: 평균임금 산정", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로자퇴직급여보장법 제8조: 퇴직금 산정", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부: 퇴직금 산정 기준 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-계산-방법", title: "퇴직금 계산 방법 완전 정리", description: "공식부터 단계별 절차까지예요." },
  { slug: "퇴직금-계산법", title: "퇴직금 계산기", description: "월급·근속기간으로 빠르게 확인해요." },
  { slug: "퇴직금-평균임금", title: "퇴직금 평균임금 개념", description: "포함 항목과 산정 기준 설명이에요." },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-산정-방식" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 산정방식 · 계산공식</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 산정 방식, 정확히 어떻게 계산하나요?<br />
        법정 공식부터 상여금 환산, 검증 방법까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금이 얼마 나올지 막연하게 궁금하셨죠? 회사가 알아서 줄 거라 믿었는데 나중에 보니 계산이 이상한 경우가 꽤 있어요.
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법 제8조</a>에 따라 퇴직금은 딱 하나의 공식으로 계산해요.
        1일 평균임금 × 30일 × 근속연수예요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>퇴직금 산정 공식, 내 상황 확인해보세요</H2>
      <p style={body}>
        퇴직금 공식은 단순해 보이지만 평균임금을 어떻게 뽑느냐가 핵심이에요. 평균임금은 퇴직 전 3개월 동안 지급된 임금 총액을
        그 기간의 총 일수로 나눈 값이에요.
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제2조</a>가 이 기준을 정하고 있어요.
      </p>
      <p style={body}>
        3개월 임금 총액에는 기본급만 들어가는 게 아니에요. 고정적으로 지급된 수당, 상여금의 월 환산액,
        그리고 산정 기간 내에 지급된 연차수당도 포함돼요.
        실비 변상 성격의 비용이나 임시·특별 지급분은 빠져요.
      </p>

      <GreenBox title="퇴직금 법정 공식 요약">
        퇴직금 = 1일 평균임금 × 30 × 근속연수<br />
        1일 평균임금 = 퇴직 전 3개월 총임금 ÷ 3개월 총 일수<br />
        3개월 총임금 = 기본급 + 고정수당 + 상여금 환산(연간÷12×3) + 해당 기간 연차수당
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="계산 준비가 됐어요. 아래 계산기로 직접 확인해보세요."
        partialMatchText="일부 항목이 다를 수 있어요. 고용노동부(1350) 상담을 권해요."
      />

      <Divider />

      <H2>내 퇴직금 얼마인지 직접 계산해봐요</H2>
      <p style={body}>
        3개월 총임금을 먼저 준비해야 해요. 급여명세서에서 기본급과 고정수당을 더하고,
        연간 상여금을 12로 나눈 뒤 3을 곱해서 합산하면 돼요.
      </p>
      <p style={body}>
        근속기간은 정확한 연수로 입력할수록 결과가 정확해요. 4년 8개월이면 약 4.67년이에요.
        소수점 처리가 번거로우면 아래 절차 섹션에서 일 단위 환산법을 참고하세요.
      </p>

      <SectionBadge>퇴직금 계산기 (법정 공식)</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 3개월 총임금 ÷ 91일 × 30일 × 근속연수. 실제 총 일수(89~92일)에 따라 달라질 수 있어요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>산정에 필요한 서류</H2>
      <p style={body}>
        퇴직금 산정을 직접 검증하려면 세 가지 서류가 핵심이에요. 최근 3개월 급여명세서, 상여금 지급 내역서, 그리고 근로계약서예요.
        이 세 가지만 있으면 회사 계산과 직접 비교할 수 있어요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>단계별로 따라가면 계산 실수가 없어요</H2>
      <p style={body}>
        퇴직금 계산에서 가장 많이 틀리는 부분이 상여금 환산이에요. 연간 총액을 12로 나눠 월 환산하고 3을 곱해야 해요.
        두 번째로 자주 틀리는 부분이 총 일수예요. 90일이 아니라 달력 일수를 직접 세는 게 가장 정확해요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>퇴직금 산정 셀프 체크리스트</H2>
      <p style={body}>
        계산을 마쳤다면 아래 항목을 하나씩 점검해보세요. 상여금 환산 누락이나 통상임금 비교 누락이 가장 흔한 실수예요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="IRP 의무 수령 기준 꼭 알아두세요">
        퇴직금이 300만원을 초과하면 IRP(개인형 퇴직연금) 계좌로만 받을 수 있어요.<br />
        300만원 이하이거나 만 55세 이상이면 현금 수령도 가능해요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        산정 방식에서 헷갈리는 부분을 모아봤어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법과 근로자퇴직급여보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
