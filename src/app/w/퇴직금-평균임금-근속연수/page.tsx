"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직 전 3개월 급여명세서를 보관하고 있어요" },
  { id: "c2", label: "근속기간이 딱 떨어지지 않아요 (예: 3년 5개월)" },
  { id: "c3", label: "연간 상여금을 받고 있어요" },
  { id: "c4", label: "회사가 기본급만으로 퇴직금을 계산하고 있어요" },
];

const CALC_SLIDERS = [
  { id: "total3m", label: "3개월 총임금", min: 300, max: 3000, step: 50, defaultValue: 900, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "years", label: "근속 기간", min: 1, max: 30, step: 1, defaultValue: 5, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "퇴직금 (법정 공식 기준)",
    getValue: (v: Record<string, number>) => {
      const dailyAvg = (v.total3m * 10000) / 91;
      return Math.round(dailyAvg * 30 * v.years);
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "1일 평균임금",
    getValue: (v: Record<string, number>) => Math.round((v.total3m * 10000) / 91),
    format: (v: number) => `약 ${Math.round((v / 10000) * 10) / 10}만원`,
  },
];

const DOCS = [
  { name: "급여명세서 (최근 3개월)", required: true, where: "회사 인사팀" },
  { name: "상여금 지급 내역", required: true, where: "인사팀 또는 급여명세서" },
  { name: "근로계약서 (입사일 확인)", required: true, where: "인사팀" },
  { name: "IRP 계좌번호", required: true, where: "은행·증권사" },
];

const STEPS = [
  {
    title: "3개월 총임금 합산",
    desc: "퇴직 전 3개월 급여명세서를 합산해요. 기본급, 고정수당, 상여금(연간÷12×3)을 모두 더해요. 실비 변상 성격의 항목(교통비, 식대 중 실비분)은 빼요. 명세서가 없으면 인사팀에 재발급 요청하면 돼요.",
    tip: "상여금은 연간 총액 ÷ 12 × 3으로 3개월분 환산",
  },
  {
    title: "1일 평균임금 계산",
    desc: "3개월 총임금 ÷ 3개월 총 일수(보통 89~92일)로 1일 평균임금을 구해요. 달력에서 실제 일수를 세는 게 정확해요. 2월이 포함된 분기는 일수가 줄어 평균임금이 높아질 수 있어요.",
    tip: "2월이 포함된 분기는 총 일수가 줄어 평균임금이 높아져요",
  },
  {
    title: "근속연수 계산",
    desc: "입사일부터 퇴직일 전날까지 일 단위로 계산해요. 3년 5개월이라면 약 1,245일이고, 1,245 ÷ 365 = 3.41년이에요. 소수점 근속기간도 일 단위로 정확하게 계산해야 제대로 된 금액이 나와요.",
    tip: "고용24에서 입사일·퇴직일 기준 근속일수 확인 가능해요",
  },
  {
    title: "퇴직금 공식 적용",
    desc: "1일 평균임금 × 30일 × 근속연수로 최종 퇴직금을 구해요. 회사 계산값과 차이가 나면 인사팀에 재계산을 요청하세요. 거부하면 고용노동부에 진정을 낼 수 있어요.",
    tip: "IRP 계좌 미리 개설해두면 수령이 빠르게 처리돼요",
  },
];

const CHECKLIST = [
  "3개월 총임금: 상여금 환산 포함",
  "1일 평균임금: 실제 총 일수로 나누기",
  "근속연수: 일 단위 정확 계산",
  "공식 적용: 1일평균임금 × 30 × 근속연수",
  "통상임금 비교: 높은 쪽으로 청구",
];

const FAQS = [
  {
    q: "근속기간이 3년 5개월이면 퇴직금이 얼마나 되나요?",
    a: "3년 5개월은 약 3.41년이에요. 월급 300만원 기준 3개월 총임금 900만원이면, 1일 평균임금은 약 98,900원이에요. 퇴직금은 98,900 × 30 × 3.41 ≈ 약 1,012만원이에요.",
  },
  {
    q: "상여금은 평균임금에 어떻게 반영되나요?",
    a: "연간 상여금 총액을 12로 나눠 월 환산하고, 그 3배를 3개월 총임금에 더해요. 연 상여금 600만원이면 600÷12×3 = 150만원을 포함해요.",
  },
  {
    q: "3개월 총 일수가 왜 중요한가요?",
    a: "같은 임금이어도 총 일수가 달라지면 1일 평균임금이 달라져요. 2월이 포함된 분기는 일수가 89~90일로 적어서 평균임금이 높아질 수 있어요.",
  },
  {
    q: "평균임금이 통상임금보다 낮게 나오면?",
    a: "통상임금을 평균임금으로 대신 사용할 수 있어요. 근로기준법 제2조 2항이 이를 허용해요. 두 금액을 모두 계산해서 더 높은 쪽으로 청구하면 돼요.",
  },
  {
    q: "회사가 기본급만으로 계산했는데 어떻게 하나요?",
    a: "상여금·고정수당 포함 금액으로 직접 계산해서 차액을 청구하세요. 인사팀이 거부하면 고용노동부 진정을 낼 수 있어요. 퇴직금 청구권 소멸시효는 퇴직일로부터 3년이에요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제2조: 평균임금 산정 기준", url: "https://www.law.go.kr/법령/근로기준법" },
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
  { slug: "퇴직금-평균임금-산정", title: "퇴직금 평균임금 산정 방법", description: "포함 항목과 산정 방법을 정리했어요." },
  { slug: "퇴직금-계산법", title: "퇴직금 계산기", description: "월급·근속기간으로 빠르게 예상 금액 확인해요." },
  { slug: "퇴직금-통상임금-계산", title: "통상임금 기준 퇴직금 계산", description: "기본급만 계산했다면 차액 청구 방법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-평균임금-근속연수" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 평균임금 · 근속연수</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 계산, 평균임금과 근속연수를 어떻게 적용하나요?<br />
        3개월 평균임금 산정부터 소수점 근속기간 계산까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금 계산에서 가장 많이 막히는 게 두 가지예요. "3개월 평균임금에 상여금이 들어가나요?"와 "3년 5개월처럼 딱 안 떨어지는 기간은 어떻게 계산하나요?"예요.
        법정 공식은 <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법 제8조</a>에 명시된 '1일 평균임금 × 30일 × 근속연수'예요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>퇴직금 법정 계산 공식, 세 가지 숫자가 전부예요</H2>
      <p style={body}>
        퇴직금 계산에 필요한 숫자는 딱 셋이에요. 3개월 총임금, 3개월 총 일수, 근속연수예요.
        이 셋을 구하면 공식에 대입하기만 하면 돼요.
        3개월 총임금에는 기본급 외에 상여금도 포함돼요.
      </p>
      <p style={body}>
        평균임금이 통상임금보다 낮게 계산될 때는 통상임금을 평균임금으로 쓸 수 있어요.
        두 금액을 모두 계산해보고 더 높은 쪽으로 청구하면 돼요.
        회사가 기본급만으로 계산했다면 차액을 청구할 수 있어요.
      </p>

      <GreenBox title="퇴직금 계산 공식 (근로자퇴직급여보장법 제8조)">
        ① 1일 평균임금 = 퇴직 전 3개월 총임금 ÷ 3개월 총 일수<br />
        ② 퇴직금 = 1일 평균임금 × 30일 × 근속연수<br />
        예시: 3개월 총임금 900만원, 91일, 근속 5년<br />
        → 퇴직금: (9,000,000 ÷ 91) × 30 × 5 = 약 1,484만원
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="직접 퇴직금을 계산해볼 수 있어요. 아래 계산기로 예상 금액을 확인하세요."
        partialMatchText="상황에 따라 계산 방식이 다를 수 있어요. 고용노동부(1350)에 상담해보세요."
      />

      <Divider />

      <H2>3개월 총임금과 근속기간을 넣으면 바로 계산돼요</H2>
      <p style={body}>
        슬라이더를 움직여서 퇴직금 예상 금액을 확인해보세요.
        3개월 총임금에는 상여금 환산액까지 포함해서 입력하면 더 정확해요.
        계산기 결과는 법정 공식 기준이에요.
      </p>

      <SectionBadge>퇴직금 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 상여금을 포함한 3개월 총임금을 기준으로 입력하세요. 정확한 계산은 고용노동부 퇴직금 계산기를 이용하세요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>계산에 필요한 서류</H2>
      <p style={body}>
        퇴직금을 직접 계산하거나 회사 계산값을 검증하려면 급여 관련 서류가 필요해요.
        인사팀에 퇴직 전에 미리 요청해두는 게 좋아요.
        급여명세서에 상여금이 따로 표기되지 않는 경우 인사팀에 연간 상여금 지급 내역을 별도로 요청하세요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>퇴직금 직접 계산하는 순서</H2>
      <p style={body}>
        회사가 계산해준 금액이 맞는지 직접 검증해보고 싶을 때 아래 순서대로 따라가면 돼요.
        계산 결과가 회사 제시액과 5만원 이상 차이가 나면 인사팀에 재계산을 요청할 수 있어요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>계산 전에 이 다섯 가지만 챙기세요</H2>
      <p style={body}>
        퇴직금 계산에서 실수하는 지점은 거의 정해져 있어요.
        상여금 빠뜨리기, 총 일수 대신 30일로 나누기, 소수점 근속기간 반올림 처리 등이에요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="계산 결과 검증 방법">
        고용노동부 퇴직금 계산기(moel.go.kr)와 비교해보세요<br />
        차이가 5만원 이상이면 인사팀에 재계산 요청<br />
        1일 평균임금이 통상임금보다 낮으면 통상임금 기준으로 재계산
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        평균임금과 근속연수 계산에서 실제로 자주 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법과 근로자퇴직급여보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
