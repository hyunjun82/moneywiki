"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "최근 3개월 급여명세서가 있어요" },
  { id: "c2", label: "상여금을 분기별 또는 연 단위로 받았어요" },
  { id: "c3", label: "야근수당이 포함된 달이 있어요" },
  { id: "c4", label: "회사가 기본급만으로 퇴직금을 계산해서 줬어요" },
];

const CALC_SLIDERS = [
  { id: "total", label: "3개월 합계 임금", min: 300, max: 3000, step: 50, defaultValue: 900, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "days", label: "3개월 총 일수", min: 80, max: 95, step: 1, defaultValue: 91, format: (v: number) => `${v}일` },
];

const CALC_RESULTS = [
  {
    label: "1일 평균임금",
    getValue: (v: Record<string, number>) => Math.round((v.total * 10000) / v.days),
    format: (v: number) => `약 ${(v / 10000).toFixed(2)}만원`,
    highlight: true,
  },
  {
    label: "퇴직금 기준 (1개월치 = 30일)",
    getValue: (v: Record<string, number>) => Math.round((v.total * 10000) / v.days * 30),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "급여명세서 (3개월치)", required: true, where: "회사 인사팀 요청" },
  { name: "상여금·성과급 지급내역", required: true, where: "인사팀 또는 급여명세서" },
  { name: "연장근로수당 내역", required: false, where: "급여명세서 또는 시급 계산서" },
  { name: "근로계약서", required: false, where: "인사팀 또는 입사 시 수령본" },
];

const STEPS = [
  {
    title: "3개월 범위 확인",
    desc: "퇴직일을 기준으로 역산한 3개월을 확인해요. 퇴직일이 3월 31일이면 1월 1일~3월 31일이 산정 기간이에요. 급여 지급일이 아니라 실제 근무한 기간 기준이에요.",
    tip: "퇴직일이 월 중순이면 3개월이 두 달 반도 될 수 있어요",
  },
  {
    title: "포함 항목 정리",
    desc: "기본급, 직무·직책 수당, 고정 야근수당, 상여금(월 환산), 연차수당(3개월 내 지급분)을 모두 합산해요. 임시 지급 항목이나 실비 변상은 제외해요. 상여금은 연간 총액 ÷ 12 × 3으로 3개월분을 환산해서 넣어요.",
    tip: "상여금 환산이 빠지면 수십~수백만원 손해예요",
  },
  {
    title: "총합 ÷ 총 일수",
    desc: "3개월 총임금을 3개월의 총 일수(88~93일)로 나눠요. 달력에서 직접 세는 게 가장 정확해요. 2월이 포함된 분기는 총 일수가 줄어드니 주의하세요.",
    tip: "편의상 91일로 나눠도 큰 차이 없어요",
  },
  {
    title: "근속일수 적용",
    desc: "1일 평균임금 × 30 × (근속일수 ÷ 365)로 최종 퇴직금을 계산해요. 근속기간이 딱 1년·2년이 아니어도 일 단위로 정확히 계산할 수 있어요. 통상임금과 비교해서 높은 쪽을 선택하세요.",
    tip: "고용24에서 입사일·퇴직일을 무료로 확인할 수 있어요",
  },
];

const CHECKLIST = [
  "3개월 범위: 퇴직일 기준 역산 3개월",
  "상여금: 연간 총액 ÷ 12 × 3으로 환산 포함",
  "총 일수: 달력 기준 실제 일수로 나누기",
  "연차수당: 3개월 내 지급분만 포함",
  "통상임금 비교: 평균임금이 낮으면 통상임금 사용 가능",
];

const FAQS = [
  {
    q: "3개월이 정확히 어디서 어디까지인가요?",
    a: "퇴직일을 포함한 역산 3개월이에요. 퇴직일이 2026년 3월 31일이면 2026년 1월 1일부터 3월 31일까지가 산정 기간이에요. 달력 기준으로 계산해요.",
  },
  {
    q: "성과급이 3개월 안에 지급되면 전액 포함되나요?",
    a: "성과급이 정기적·일률적으로 지급되는 경우 연간 환산해서 포함해요. 그 달에 지급된 금액을 그대로 넣으면 평균임금이 왜곡될 수 있어요.",
  },
  {
    q: "연차수당은 언제 포함되나요?",
    a: "3개월 산정 기간 내에 실제로 지급된 연차수당은 포함돼요. 퇴직 시 정산되는 미사용 연차수당도 마찬가지로 포함될 수 있어요.",
  },
  {
    q: "총 일수가 91일인지 92일인지 왜 중요한가요?",
    a: "동일한 임금이어도 91일로 나누면 1일 평균임금이 살짝 높고, 92일로 나누면 낮아요. 작은 차이지만 근속기간이 길면 합산 금액이 달라져요.",
  },
  {
    q: "평균임금이 통상임금보다 낮게 나오면?",
    a: "통상임금을 평균임금으로 사용할 수 있어요. 근로기준법 제2조 2항이 보호 조항으로 명시하고 있어요.",
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
      { label: "고용노동부: 평균임금 산정 방법 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-평균임금", title: "퇴직금 평균임금 개념", description: "포함 항목과 제외 항목을 정리했어요." },
  { slug: "퇴직금-계산법", title: "퇴직금 계산기", description: "월급·근속기간으로 빠르게 예상 금액을 확인해요." },
  { slug: "퇴직금-상여금-포함", title: "상여금 퇴직금 포함 여부", description: "상여금 환산 방법을 상세히 설명해요." },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-평균임금-산정" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 평균임금 · 산정기준</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 평균임금 산정, 3개월 기준은 어떻게 적용하나요?<br />
        포함·제외 항목부터 계산 공식까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금 <a href="/w/퇴직금-평균임금" style={{ color: "#1D9E75", textDecoration: "underline" }}>평균임금</a>은 퇴직 전 3개월간 지급된 임금 총액을 총 일수로 나눠서 계산해요.
        핵심은 어떤 항목을 3개월 총임금에 포함시키느냐예요.
        상여금 환산을 빠뜨리거나 총 일수를 잘못 세면 퇴직금이 실제보다 낮게 나와요.
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제2조</a>가 정한 기준을 정확히 알면 손해를 막을 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>3개월 기준, 어떤 항목이 포함되나요?</H2>
      <p style={body}>
        3개월 산정 기간은 퇴직일을 기준으로 역산해요. 포함 항목은 기본급, 정기·고정 수당, 상여금(월 환산), 연차수당(기간 내 지급분)이에요.
        임시로 지급된 금품이나 실비 변상 성격의 항목은 제외돼요.
      </p>
      <p style={body}>
        상여금은 주의가 필요해요. 3개월 안에 한꺼번에 들어왔다고 그 금액 전부를 산정 기간 임금으로 넣으면 안 돼요.
        연간 상여금 총액을 12로 나눈 뒤 3을 곱해서 3개월분만 포함해야 정확한 계산이에요.
        <a href="/w/퇴직금-통상임금-계산" style={{ color: "#1D9E75", textDecoration: "underline" }}>통상임금</a>과 비교해서 높은 쪽을 선택하는 것도 가능해요.
      </p>

      <GreenBox title="포함 vs 제외 항목">
        포함: 기본급, 정기수당, 야근수당(고정분), 상여금(월환산), 연차수당<br />
        제외: 실비변상, 임시지급, 경조금, 해고예고수당, 퇴직금 자체
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="3개월 평균임금 산정이 가능해요. 아래 계산기로 확인해보세요."
        partialMatchText="항목별로 확인이 필요해요. 고용노동부(1350) 상담을 받아보세요."
      />

      <Divider />

      <H2>3개월 총임금으로 1일 평균임금 계산하기</H2>
      <p style={body}>
        3개월 급여명세서를 합산한 총임금과 그 기간의 총 일수를 입력하면 1일 평균임금과 퇴직금 기준(30일치)을 바로 확인할 수 있어요.
        상여금은 3개월분 환산액을 미리 더해서 총임금에 포함하세요.
        1일 평균임금에 30을 곱하면 퇴직금 1년치 기준이 나와요.
      </p>

      <SectionBadge>1일 평균임금 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 3개월 합계 ÷ 총 일수 = 1일 평균임금. 1개월치(30일) = 퇴직금 1년 기준."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>산정에 필요한 서류</H2>
      <p style={body}>
        3개월 급여명세서가 핵심이에요. 상여금 지급규정이나 연장근로 내역이 있으면 포함 여부 판단에 도움이 돼요.
        퇴직 후엔 발급이 어려울 수 있으니 재직 중에 챙겨두세요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>평균임금 산정 4단계</H2>
      <p style={body}>
        단계별로 따라가면 상여금 환산과 일수 계산이 명확해져요.
        2단계 포함 항목 정리가 가장 중요해요. 빠뜨리는 항목이 있으면 퇴직금이 낮게 나와요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>산정 체크리스트</H2>
      <p style={body}>
        자주 빠뜨리는 항목들이에요. 상여금 환산과 통상임금 비교는 꼭 해보세요.
        이미 퇴직했어도 3년 내라면 차액 청구가 가능해요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="평균임금 vs 통상임금, 높은 쪽으로 청구하세요">
        평균임금이 통상임금보다 낮으면 통상임금으로 퇴직금을 계산할 수 있어요.<br />
        두 가지 모두 계산해서 높은 쪽을 선택하는 게 합법적 권리예요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        평균임금 산정에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법과 근로자퇴직급여보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
