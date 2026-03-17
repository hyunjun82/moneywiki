"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "연봉제 근로계약서를 쓰고 입사했어요" },
  { id: "c2", label: "계약서에 '연봉에 퇴직금 포함' 조항이 있어요" },
  { id: "c3", label: "1년 이상 근무했어요" },
  { id: "c4", label: "퇴직금을 따로 한 번도 받은 적 없어요" },
];

const CALC_SLIDERS = [
  { id: "annual", label: "연봉 (세전)", min: 2400, max: 12000, step: 200, defaultValue: 4000, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "years", label: "근속 기간", min: 1, max: 30, step: 1, defaultValue: 3, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "예상 퇴직금 (연봉÷12 × 근속연수)",
    getValue: (v: Record<string, number>) => Math.round((v.annual * 10000 / 12) * v.years),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "월 환산 임금 (연봉÷12)",
    getValue: (v: Record<string, number>) => Math.round(v.annual * 10000 / 12),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원/월`,
  },
];

const DOCS = [
  { name: "근로계약서 (연봉 명시)", required: true, where: "인사팀 또는 입사 시 수령" },
  { name: "급여명세서 (최근 3개월)", required: true, where: "회사 인사팀 또는 급여앱" },
  { name: "퇴직금 포함 특약 조항 (있는 경우)", required: false, where: "근로계약서 내 확인" },
  { name: "IRP 계좌번호 (300만원 초과 시)", required: true, where: "은행·증권사 개설" },
];

const STEPS = [
  {
    title: "연봉에 퇴직금 포함 여부 확인",
    desc: "근로계약서에 '퇴직금 포함' 또는 'DC형 퇴직연금' 조항이 있는지 확인해요. 연봉에 퇴직금이 포함됐다는 약정이 있어도, 별도 지급 규정이 없으면 퇴직 시 추가 지급이 맞아요.",
    tip: "법원은 '연봉에 퇴직금 포함' 약정이 있어도 퇴직금 별도 청구 권리를 인정해요",
  },
  {
    title: "평균임금 계산 (3개월 임금 기준)",
    desc: "연봉제 근로자도 퇴직 전 3개월 임금을 기준으로 평균임금을 계산해요. 연봉 ÷ 12로 월 임금을 구하고, 여기에 고정수당을 더해요. 성과급이나 변동 상여는 월 환산해서 포함해요.",
    tip: "연봉이 올랐다면 마지막 3개월이 유리해요",
  },
  {
    title: "퇴직금 계산 및 청구",
    desc: "1일 평균임금 × 30일 × 근속연수로 계산해요. 연봉 4,000만원에 근속 3년이면 약 1,000만원이에요. 회사가 계산을 잘못했다면 고용노동부에 진정을 낼 수 있어요.",
    tip: "상여금 포함 여부로 퇴직금 차이가 수백만 원 날 수 있어요",
  },
  {
    title: "IRP 계좌 수령",
    desc: "퇴직금 300만원 초과 시 IRP 계좌로만 받아요. IRP 계좌번호를 인사팀에 알려줘야 14일 이내에 이체돼요. IRP에서 연금으로 수령하면 퇴직소득세를 30% 절감할 수 있어요.",
    tip: "퇴직 확정 전에 IRP 계좌 미리 개설하세요",
  },
];

const CHECKLIST = [
  "근로계약서 확인: 퇴직금 포함 조항 여부",
  "평균임금 계산: 연봉÷12 × 근속연수",
  "상여금 포함 여부: 정기 지급 시 포함",
  "IRP 계좌: 300만원 초과 시 필수",
  "지급 기한 확인: 퇴직 후 14일 이내",
];

const FAQS = [
  {
    q: "연봉에 퇴직금이 포함됐다고 했는데 또 받을 수 있나요?",
    a: "근로기준법상 퇴직금은 법정 권리예요. '연봉에 포함'이라는 약정만으로는 퇴직금 청구권이 소멸되지 않아요. 실질적으로 별도 적립이 없었다면 퇴직 시 추가 청구가 가능한 경우가 많아요.",
  },
  {
    q: "연봉제 근로자는 어떻게 퇴직금을 계산하나요?",
    a: "퇴직 전 3개월 급여를 합산해서 평균임금을 구해요. 연봉 ÷ 12로 월 임금을 구하고, 1일 평균임금 × 30 × 근속연수로 계산해요. 성과급이 있으면 월 환산해서 더해요.",
  },
  {
    q: "DC형 퇴직연금과 연봉제 퇴직금은 다른가요?",
    a: "DC형(확정기여형) 퇴직연금은 매년 연봉의 1/12을 IRP에 적립하는 방식이에요. 일반 퇴직금 대신 DC형으로 운영하는 회사도 많아요. 퇴직 시 IRP에 쌓인 금액이 퇴직급여예요.",
  },
  {
    q: "연봉 인상이 있으면 퇴직금도 올라가나요?",
    a: "맞아요. 퇴직금은 퇴직 직전 3개월 임금을 기준으로 계산하기 때문에, 퇴직 시점에 가까울수록 연봉이 높을수록 퇴직금이 커요.",
  },
  {
    q: "연봉제 근로자도 퇴직금 소멸시효가 3년인가요?",
    a: "맞아요. 퇴직 후 3년 이내에 청구해야 해요. 연봉제라도 퇴직금 소멸시효는 동일하게 3년이에요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 제8조: 퇴직금 산정", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "근로기준법 제2조: 평균임금 정의", url: "https://www.law.go.kr/법령/근로기준법" },
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
  { slug: "퇴직금-계산법", title: "퇴직금 계산기", description: "월급·근속기간으로 금액 바로 확인." },
  { slug: "퇴직금-평균임금", title: "퇴직금 평균임금 계산", description: "상여금 포함 방법을 설명해요." },
  { slug: "퇴직금-상여금-포함", title: "상여금 퇴직금 포함 여부", description: "상여금 환산 방법과 포함 기준." },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-연봉제" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 연봉제 · 계산</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        연봉제 근로자도 퇴직금을 따로 받을 수 있나요?<br />
        포함 약정 무효 여부부터 계산 방법까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        입사할 때 "연봉에 퇴직금 포함"이라는 말을 들었다면, 그 약정이 실제로 유효한지 따져봐야 해요.
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법 제8조</a>는 강행법규라서 단순 포함 약정만으로는 퇴직금 청구권이 사라지지 않아요.
        퇴직금 계산은 연봉제라도 월급제와 동일하게 퇴직 전 3개월 평균임금에 근속연수를 곱하는 방식이에요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>연봉 포함 약정, 정말 유효한가요?</H2>
      <p style={body}>
        근로계약서에 '연봉에 퇴직금 포함'이라고 적혀 있어도, 그게 곧 퇴직금을 못 받는다는 뜻은 아니에요.
        근로자퇴직급여보장법은 퇴직금을 계속근로기간 1년에 30일분 이상의 평균임금으로 지급하도록 하고, 이 기준에 미달하는 약정은 효력이 없어요.
      </p>
      <p style={body}>
        예외가 있어요. 회사가 DC형(확정기여형) 퇴직연금으로 매년 연봉의 1/12을 IRP에 실제 적립하고 있다면, 이건 별도 지급이 이루어지는 거예요.
        계약서에 DC형 조항이 있는지 먼저 확인해보세요. '연봉 4,000만원(퇴직금 포함)'처럼 총액만 적혀 있고 별도 적립이 없었다면, 그 약정은 법적으로 효력이 약해요.
      </p>

      <GreenBox title="연봉 포함 약정 핵심 정리">
        단순 포함 약정만으로 퇴직금 청구권 소멸 안 돼요<br />
        실제로 별도 적립이 없었다면 퇴직 시 추가 청구 가능해요<br />
        DC형으로 매년 1/12 적립한 경우는 별도 지급으로 인정돼요
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="연봉에 퇴직금 포함 약정이 있어도 별도 청구가 가능한 상황이에요. 아래 계산기로 예상 금액을 먼저 확인해보세요."
        partialMatchText="상황에 따라 판단이 달라질 수 있어요. 고용노동부(1350) 또는 노무사 상담을 받아보세요."
      />

      <Divider />

      <H2>연봉제 기준 퇴직금 계산해보세요</H2>
      <p style={body}>
        연봉제 근로자의 퇴직금은 '연봉 ÷ 12 × 근속연수'로 간단하게 추정할 수 있어요.
        상여금이나 고정수당이 있으면 실제 금액은 더 올라가요.
      </p>
      <p style={body}>
        연봉 4,000만원에 3년 근속이면 약 1,000만원이에요. 연봉이 오르는 추세라면 마지막 3개월 기준으로 평균임금이 높아지기 때문에, 퇴직 시점에 가까울수록 유리해요.
      </p>

      <SectionBadge>연봉제 퇴직금 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 상여금·고정수당 포함 시 실제 퇴직금이 더 높을 수 있어요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>퇴직금 수령에 필요한 서류</H2>
      <p style={body}>
        연봉제 근로자가 퇴직금을 받을 때 챙겨야 할 서류예요.
        근로계약서에 퇴직금 포함 조항이 있는지 없는지를 우선 파악해야 수령 방식이 달라져요.
      </p>
      <p style={body}>
        퇴직금이 300만원을 넘으면 IRP 계좌로만 받아야 해요. 계좌번호를 인사팀에 미리 알려두지 않으면 이체가 늦어질 수 있으니, 퇴직 확정 전에 IRP 계좌를 만들어 두세요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>연봉제 퇴직금 수령 4단계 절차</H2>
      <p style={body}>
        약정 확인부터 IRP 수령까지 4단계로 진행돼요. 상여금 포함 여부가 금액을 크게 좌우하기 때문에, 2단계 평균임금 계산을 꼭 직접 확인해보세요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>연봉제 퇴직금 체크리스트</H2>
      <p style={body}>
        퇴직 준비를 시작할 때 아래 목록을 기준으로 하나씩 처리하면 돼요. 계산 실수나 서류 누락을 방지할 수 있어요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="DC형이라면 IRP 적립액 확인">
        회사가 매년 연봉 1/12을 IRP에 적립했는지 잔액 조회로 확인하세요.<br />
        적립이 누락된 기간이 있으면 회사에 소급 청구할 수 있어요.
        퇴직금 소멸시효는 연봉제도 동일하게 3년이에요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        연봉제 퇴직금에서 실제로 많이 헷갈리는 부분들이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법과 근로기준법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
