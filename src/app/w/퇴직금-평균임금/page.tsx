"use client";
import { Divider } from "@/components/article-ui/Divider";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR, 퇴직금_HIGHLIGHT } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직 전 3개월 급여명세서를 가지고 있어요" },
  { id: "c2", label: "상여금을 정기적으로 받았어요 (분기·반기·연간 포함)" },
  { id: "c3", label: "고정 야근수당이나 직무수당을 매월 받았어요" },
  { id: "c4", label: "회사가 기본급만 기준으로 퇴직금을 계산해서 줬어요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "월 기본급", min: 150, max: 600, step: 10, defaultValue: 300, format: (v: number) => `${v}만원` },
  { id: "bonus", label: "상여금 월 환산 (연 상여 ÷ 12)", min: 0, max: 200, step: 10, defaultValue: 50, format: (v: number) => `${v}만원` },
  { id: "allowance", label: "고정수당 (야근·직무 등)", min: 0, max: 100, step: 5, defaultValue: 20, format: (v: number) => `${v}만원` },
];

const CALC_RESULTS = [
  {
    label: "월 평균임금 (기본급 + 상여금 + 수당)",
    getValue: (v: Record<string, number>) => (v.salary + v.bonus + v.allowance) * 10000,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "1일 평균임금 (÷ 30일 기준)",
    getValue: (v: Record<string, number>) => Math.round((v.salary + v.bonus + v.allowance) * 10000 / 30),
    format: (v: number) => `약 ${v.toLocaleString()}원`,
  },
  {
    label: "퇴직금 예상 (근속 3년 기준)",
    getValue: (v: Record<string, number>) => (v.salary + v.bonus + v.allowance) * 10000 * 3,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "급여명세서 (최근 3개월)", required: true, where: "회사 인사팀 요청" },
  { name: "근로계약서", required: true, where: "입사 시 수령본 또는 인사팀" },
  { name: "상여금 지급 규정 또는 내역서", required: false, where: "인사팀 또는 취업규칙 사본" },
  { name: "연차수당 정산 내역", required: false, where: "급여명세서 또는 인사팀" },
  { name: "식대·교통비 지급 기준 (취업규칙)", required: false, where: "취업규칙 또는 인사팀" },
];

const STEPS = [
  {
    title: "퇴직 전 3개월 임금 총액 합산",
    desc: "퇴직일 기준으로 역산한 3개월의 임금을 모두 더해요. 기본급, 직책수당, 직무수당, 고정 야근수당, 연차수당(3개월 내 지급분)이 포함돼요. 퇴직일이 3월 31일이면 1월 1일~3월 31일 임금이 기준이에요.",
    tip: "상여금은 3개월 안에 지급된 금액만이 아니라 연간 총액을 12로 나눈 월 환산분을 포함해야 정확해요",
  },
  {
    title: "3개월 총 일수 확인",
    desc: "달력 기준 실제 일수를 세요. 1~3월은 90일, 2월이 포함된 분기는 89일(윤년 90일)이에요. 단순히 90일로 고정하거나 30일로 나누면 틀려요. 달력에서 퇴직 전 3개월의 시작일~퇴직일까지 일수를 직접 세야 해요.",
    tip: "2월이 포함된 기간은 총 일수가 달라지니 꼭 달력으로 확인하세요",
  },
  {
    title: "1일 평균임금 계산",
    desc: "3개월 임금 총액 ÷ 3개월 총 일수 = 1일 평균임금이에요. 예를 들어 3개월 임금 합계가 900만원이고 총 일수가 91일이면 1일 평균임금은 약 98,901원이에요.",
    tip: "기본급만 계산한 경우 상여금·수당 포함 시 실제보다 10~30% 낮게 나올 수 있어요",
  },
  {
    title: "퇴직금 산정 및 통상임금과 비교",
    desc: "1일 평균임금 × 30일 × 근속연수 = 퇴직금이에요. 근속 1년 6개월이면 × 1.5를 해요. 산출한 평균임금이 통상임금보다 낮으면 통상임금을 선택할 수 있어요. 두 가지 모두 계산해서 높은 쪽을 택하는 게 유리해요.",
    tip: "평균임금이 통상임금보다 낮으면 근로기준법 제2조 2항에 따라 통상임금으로 대체 가능해요",
  },
];

const CHECKLIST = [
  "기본급 외 정기 상여금: 연간 총액 ÷ 12로 월 환산해서 포함",
  "연차수당: 퇴직 전 3개월 내에 지급된 금액은 포함",
  "야근·휴일수당: 매월 고정 지급되면 포함 (임시·특별 지급분 제외)",
  "식대·교통비: 취업규칙에 명시됐거나 매월 정기 지급이면 포함 가능",
  "3개월 총 일수: 달력 기준 실제 일수로 나누기 (30일 고정 금지)",
  "평균임금 vs 통상임금: 둘 다 계산해서 높은 쪽 선택",
];

const FAQS = [
  {
    q: "상여금이 분기별로 지급되면 어떻게 계산하나요?",
    a: "3개월 기간 중에 상여금이 한 번 들어왔다고 해서 그 금액만 넣으면 안 돼요. 연간 상여금 총액 ÷ 12로 월 환산해서 3개월치를 포함해야 해요. 예를 들어 연 600만원 상여금이면 월 50만원, 3개월분 150만원을 포함해요.",
  },
  {
    q: "식대·교통비도 평균임금에 포함되나요?",
    a: "근로의 대가로 정기적·일률적으로 지급된다면 포함돼요. 취업규칙에 명시됐거나 매월 빠짐없이 지급됐다면 포함 가능성이 높아요. 반면 실비 보전 성격으로 영수증 제출 후 지급되는 건 제외돼요.",
  },
  {
    q: "평균임금이 통상임금보다 낮으면 어떻게 하나요?",
    a: "통상임금을 평균임금으로 사용할 수 있어요. 근로기준법 제2조 2항이 이를 허용하고 있어요. 두 방법을 모두 계산한 뒤 높은 쪽을 선택하면 돼요. 기본급에 고정수당만 더한 통상임금이 평균임금보다 높게 나오는 경우도 있어요.",
  },
  {
    q: "퇴직 전에 무급 병가나 휴직이 있었는데 어떻게 되나요?",
    a: "무급 기간이 포함된 달은 임금 총액이 줄어서 평균임금이 낮아질 수 있어요. 업무상 부상·질병으로 인한 휴업 기간은 평균임금 산정에서 제외할 수 있어요. 출산휴가·육아휴직 기간도 마찬가지예요.",
  },
  {
    q: "회사가 평균임금을 잘못 계산했는데 어떻게 하나요?",
    a: "고용노동부(1350)에 진정을 접수하면 돼요. 근로감독관이 급여명세서와 근로계약서를 기준으로 재산정해줘요. 차액이 발생하면 추가 지급 시정 명령이 내려져요. 퇴직금 청구권은 3년 안에 행사해야 해요.",
  },
  {
    q: "3개월 총 일수를 어떻게 세나요?",
    a: "퇴직일 기준으로 역산해요. 퇴직일이 3월 31일이면 1월 1일부터 3월 31일까지 90일이에요. 12월 31일 퇴직이면 10월 1일부터 12월 31일까지 92일이에요. 달마다 일수가 다르니 달력으로 직접 세는 게 정확해요.",
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
      { label: "고용노동부: 평균임금 산정 기준 안내", url: "https://www.moel.go.kr" },
      { label: "고용24: 퇴직금 상담 및 신고", url: "https://www.ei.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-계산법", title: "퇴직금 계산법, 얼마나 받을까?", description: "평균임금 기준 계산기로 직접 확인해볼 수 있어요." },
  { slug: "퇴직금-통상임금-계산", title: "통상임금 기준 퇴직금 계산", description: "평균임금이 낮을 때 통상임금으로 계산하는 방법이에요." },
  { slug: "퇴직금-미지급-신고", title: "퇴직금 미지급 신고 방법", description: "잘못 계산된 퇴직금 차액을 받아내는 절차예요." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} highlightSlugs={퇴직금_HIGHLIGHT} currentSlug="퇴직금-평균임금" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 평균임금 · 산정 방법</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        기본급만으로 계산했는데 퇴직금이 너무 적지 않나요?<br />
        평균임금 포함 항목부터 계산 기준까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금은 기본급이 아니라 평균임금을 기준으로 계산해요.{" "}
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제2조</a>에서 정한 평균임금은 퇴직 전 3개월 임금 총액을 3개월 총 일수로 나눈 금액이에요.
        상여금, 연차수당, 고정 야근수당까지 포함되는데, 회사가 기본급만 기준으로 계산하면 실제 퇴직금보다 10~30%가량 적게 받는 경우가 많아요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>평균임금에 어떤 항목이 들어가나요?</H2>
      <p style={body}>
        평균임금은 퇴직 전 3개월 동안 지급된 임금 총액을 그 기간의 총 일수로 나눈 금액이에요.
        기본급, 직책수당, 직무수당, 매월 고정 지급된 야근수당, 연차수당(퇴직 전 3개월 내 지급분), 상여금(월 환산분)이 포함돼요.
        반면 실비 보전성 비용(출장비 실비, 교통비 영수증 처리분), 임시·일시적으로 지급된 것, 퇴직금 자체는 빠져요.
      </p>
      <p style={body}>
        식대·교통비는 회사 규정에 따라 달라요. 취업규칙에 명시됐거나 매월 일률적으로 지급됐으면 포함될 수 있어요.
        <a href="/w/퇴직금-통상임금-계산" style={{ color: "#1D9E75", textDecoration: "underline" }}>통상임금</a>과 비교해서 높은 쪽을 선택하는 것도 가능하기 때문에, 두 방법을 모두 계산해봐야 해요.
      </p>

      <GreenBox>
        포함: 기본급, 정기 상여금(월 환산), 고정 야근수당, 연차수당(3개월 내 지급분)<br />
        조건부 포함: 식대·교통비 (취업규칙 명시 또는 매월 정기 지급 시)<br />
        제외: 실비 보전비, 임시·특별 지급분, 퇴직금 자체
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="상여금·수당까지 포함한 정확한 평균임금을 계산할 수 있어요. 아래 계산기로 예상액을 확인해보세요."
        partialMatchText="항목별로 따져볼 부분이 있어요. 고용노동부(1350) 상담을 받아보는 게 좋아요."
      />

      <Divider />

      <H2>내 평균임금과 퇴직금, 얼마나 될까?</H2>
      <p style={body}>
        월 기본급, 상여금 월 환산액, 고정수당을 입력하면 월 평균임금과 퇴직금 예상액을 바로 확인할 수 있어요.
        상여금은 연간 총액을 12로 나눈 값을 입력하면 돼요. 연 600만원 상여금이면 월 50만원이에요.
        연차수당은 퇴직 전 3개월 내에 지급됐다면 월 환산액에 더해서 계산해요.
      </p>

      <SectionBadge>평균임금 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 기본급 + 상여금 월 환산 + 고정수당 기준. 실제 1일 평균임금은 3개월 총 일수(88~93일)로 나누면 더 정확해요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>평균임금 산정에 필요한 서류</H2>
      <p style={body}>
        회사가 평균임금을 잘못 계산했다면 직접 확인하고 이의를 제기할 수 있어요.
        아래 서류가 있으면 정확한 계산이 가능하고, 분쟁이 생겼을 때 핵심 증거가 돼요.
        퇴직 전에 미리 챙겨두는 게 중요해요.
      </p>
      <p style={body}>
        급여명세서는 퇴직 후에도 회사에 요청할 수 있어요.
        인사팀이 거부하면 고용노동부(1350) 신고 대상이에요.
        <a href="/w/퇴직금-미지급-신고" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 미지급 신고</a>와 함께 진행하면 돼요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>평균임금 계산 4단계</H2>
      <p style={body}>
        핵심은 3개월 총 일수를 달력으로 정확히 세는 것과 상여금을 월 환산해서 포함하는 거예요.
        이 두 가지만 제대로 해도 회사 계산과 차이를 잡아낼 수 있어요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>계산 전 꼭 확인해야 할 것들</H2>
      <p style={body}>
        하나라도 빠지면 퇴직금이 실제보다 낮게 계산돼요.
        특히 상여금과 연차수당은 빠뜨리는 경우가 많고, 3개월 총 일수를 90일로 고정하는 실수도 흔해요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        산출한 평균임금이 통상임금보다 낮을 때는 통상임금을 기준으로 계산할 수 있어요.<br />
        근로기준법 제2조 2항이 보장하는 권리예요. 두 가지를 모두 계산해서 높은 쪽을 선택하세요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 평균임금 계산에서 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법과 근로자퇴직급여보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
