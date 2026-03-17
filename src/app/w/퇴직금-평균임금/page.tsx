"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "최근 3개월 급여명세서가 있어요" },
  { id: "c2", label: "상여금을 정기적으로 받았어요" },
  { id: "c3", label: "연차수당을 받은 적 있어요" },
  { id: "c4", label: "회사가 기본급만 기준으로 퇴직금을 계산해서 줬어요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "월 기본급", min: 150, max: 500, step: 10, defaultValue: 300, format: (v: number) => `${v}만원` },
  { id: "bonus", label: "상여금 월 환산", min: 0, max: 200, step: 10, defaultValue: 50, format: (v: number) => `${v}만원` },
];

const CALC_RESULTS = [
  {
    label: "월 평균임금 (기본급 + 상여금)",
    getValue: (v: Record<string, number>) => (v.salary + v.bonus) * 10000,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "퇴직금 예상 (근속 3년 기준)",
    getValue: (v: Record<string, number>) => (v.salary + v.bonus) * 10000 * 3,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "급여명세서 (최근 3개월)", required: true, where: "회사 인사팀 요청" },
  { name: "근로계약서", required: true, where: "인사팀 또는 입사 시 수령본" },
  { name: "상여금 지급 규정", required: false, where: "회사 인사팀" },
  { name: "연차수당 정산 내역", required: false, where: "인사팀 또는 급여명세서" },
];

const STEPS = [
  {
    title: "3개월 총임금 합산",
    desc: "퇴직 전 3개월의 기본급, 상여금(월 환산), 야근수당, 연차수당을 모두 더해요. 3개월은 퇴직일 기준 역산 3개월이에요. 퇴직일이 3월 31일이면 1월 1일~3월 31일이에요.",
    tip: "상여금은 3개월 안에 들어온 금액만이 아니라 3개월치 해당분으로 환산해야 정확해요",
  },
  {
    title: "1일 평균임금 계산",
    desc: "3개월 총임금을 3개월 총 일수(보통 88~93일)로 나눠요. 단순히 30일로 나누면 틀려요. 달력에서 실제 일수를 세야 정확해요.",
    tip: "2월이 포함된 분기는 총 일수가 달라지니 꼭 달력으로 확인",
  },
  {
    title: "30일치 환산",
    desc: "1일 평균임금 × 30일 = 퇴직금 1년치 기준이에요. 기본급만 쓰면 실제보다 10~30% 낮게 나오는 경우가 많아요. 상여금·수당이 포함되면 더 높게 나와요.",
    tip: "기본급만 계산한 회사 결과와 비교해보세요",
  },
  {
    title: "근속 기간 적용",
    desc: "30일치 평균임금 × 근속연수 = 최종 퇴직금이에요. 근속기간이 1년 6개월이라면 1.5를 곱해요. 일 단위로 계산하면 더 정확해요(근속일수 ÷ 365).",
    tip: "평균임금이 통상임금보다 낮으면 통상임금을 선택할 수 있어요",
  },
];

const CHECKLIST = [
  "기본급 외 정기 상여금도 3개월 환산해서 포함",
  "연차수당: 퇴직 전 3개월에 지급됐으면 포함",
  "야근·휴일수당: 매월 발생했으면 포함",
  "식대·교통비: 취업규칙에 따라 포함 여부 다름",
  "3개월 총 일수: 달력 기준 실제 일수로 나누기",
];

const FAQS = [
  {
    q: "상여금이 분기별로 지급되면 어떻게 계산하나요?",
    a: "3개월 평균임금 산정 기간에 상여금이 들어온 달만 반영하면 안 돼요. 연간 상여금 ÷ 12로 월 환산해서 포함해야 정확해요.",
  },
  {
    q: "식대·교통비도 평균임금에 포함되나요?",
    a: "근로의 대가로 지급되는 것이면 포함돼요. 취업규칙에 명시되어 있거나 매월 정기적으로 지급됐다면 포함 가능성이 높아요.",
  },
  {
    q: "평균임금이 통상임금보다 낮으면 어떻게 하나요?",
    a: "통상임금을 평균임금으로 사용할 수 있어요. 근로기준법 제2조 2항이 이를 허용하고 있어요. 두 방법을 모두 계산해서 높은 쪽을 선택하세요.",
  },
  {
    q: "퇴직 전에 무급병가가 있었는데 어떻게 되나요?",
    a: "무급 기간이 포함된 달은 평균임금이 낮아질 수 있어요. 이 경우 정당하지 않다고 판단되면 무급 기간을 제외하고 계산할 수 있어요.",
  },
  {
    q: "평균임금을 회사에서 잘못 계산하면 어떻게 되나요?",
    a: "고용노동부에 진정 접수하면 돼요. 근로감독관이 급여명세서와 근로계약서를 기준으로 재산정해줘요. 차액이 발생하면 추가 지급을 시정 명령해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제2조: 평균임금 정의", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로자퇴직급여보장법 제8조: 퇴직금 산정", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부: 평균임금 산정 기준", url: "https://www.moel.go.kr" },
      { label: "고용24: 퇴직금 관련 상담", url: "https://www.ei.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-계산법", title: "퇴직금 계산법, 얼마나 받을까?", description: "평균임금 기준 계산기로 직접 확인해보세요." },
  { slug: "퇴직금-조건", title: "퇴직금 받을 수 있는 조건", description: "1년·주 15시간 조건을 상세히 설명해요." },
  { slug: "퇴직금-지급-기준", title: "퇴직금 지급 기준", description: "5인 미만도 해당되는지 확인해보세요." },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-평균임금" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 평균임금 · 산정방법</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 평균임금, 어떻게 계산하나요?<br />
        산정 기준부터 포함 항목까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금은 평균임금을 기준으로 계산해요.
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제2조</a>에서 정한 개념인데, 기본급만이 아니라 상여금·연차수당·각종 수당까지 포함될 수 있어요.
        기본급만으로 계산하면 실제보다 훨씬 적게 받는 경우가 많아요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>평균임금, 어떤 항목이 포함되나요?</H2>
      <p style={body}>
        평균임금은 퇴직 전 3개월 동안 지급된 임금 총액을 그 기간의 총 일수로 나눈 금액이에요.
        기본급, 직책수당, 직무수당, 야근수당(고정 지급분), 연차수당(퇴직 전 지급분), 상여금(월 환산)이 해당돼요.
        반면 실비 보전성 비용(출장비, 교통비 실비 등), 임시·일시적으로 지급된 것, 퇴직금 자체는 빠져요.
      </p>
      <p style={body}>
        식대·교통비는 회사 규정에 따라 포함 여부가 달라져요. 취업규칙에 명시되어 있거나 매월 정기적으로 지급됐다면 포함될 수 있어요.
        <a href="/w/퇴직금-통상임금-계산" style={{ color: "#1D9E75", textDecoration: "underline" }}>통상임금</a>과 비교해서 높은 쪽을 선택하는 것도 가능해요.
      </p>

      <GreenBox title="평균임금 포함 항목 3가지">
        기본급: 무조건 포함<br />
        정기 상여금: 3개월치 환산 포함<br />
        연차수당·고정수당: 퇴직 전 3개월 내 지급분 포함
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="상여금·수당까지 포함한 정확한 평균임금을 계산할 수 있어요. 아래 계산기를 써보세요."
        partialMatchText="항목별로 확인이 필요해요. 고용노동부(1350) 상담을 받아보세요."
      />

      <Divider />

      <H2>내 평균임금, 얼마나 될까?</H2>
      <p style={body}>
        월 기본급과 상여금 월 환산액을 입력하면 평균임금과 퇴직금 예상액을 바로 확인할 수 있어요.
        상여금은 연간 총액을 12로 나눈 값을 입력하면 돼요. 연 상여금 600만원이면 월 환산 50만원이에요.
        연차수당·야근수당 등 추가 항목을 더하면 실제 금액은 더 높아질 수 있어요.
      </p>

      <SectionBadge>평균임금 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 기본급 + 상여금 월 환산 기준. 연차수당·야근수당 등 추가 항목 포함 시 실제 금액이 더 높아요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>평균임금 산정에 필요한 서류</H2>
      <p style={body}>
        회사가 평균임금을 잘못 계산한 경우 직접 확인하고 이의를 제기할 수 있어요.
        아래 서류가 있으면 정확한 계산이 가능하고, 분쟁이 생겼을 때 증거로 활용돼요.
        퇴직 전에 미리 챙겨두세요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>평균임금 계산 4단계</H2>
      <p style={body}>
        포인트는 3개월 총 일수를 정확히 세는 것과 상여금을 월 환산하는 것이에요.
        이 두 가지만 제대로 해도 회사 계산과 차이를 잡아낼 수 있어요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>평균임금 계산 체크리스트</H2>
      <p style={body}>
        하나라도 빠지면 퇴직금이 실제보다 낮게 계산돼요.
        특히 상여금과 연차수당을 빠뜨리는 경우가 많으니 꼭 확인하세요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="평균임금이 통상임금보다 낮게 나오면?">
        평균임금이 통상임금보다 낮으면 통상임금을 기준으로 계산할 수 있어요.<br />
        근로기준법 제2조 2항이 보장하는 권리예요. 두 가지 모두 계산해서 높은 쪽을 선택하세요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 평균임금 계산에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법과 근로자퇴직급여보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
