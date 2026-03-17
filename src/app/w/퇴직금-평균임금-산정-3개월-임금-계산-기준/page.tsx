"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직 전 3개월 급여명세서가 있어요" },
  { id: "c2", label: "상여금을 분기별 또는 연간으로 받았어요" },
  { id: "c3", label: "3개월 산정 기간 안에 연차수당이 지급됐어요" },
  { id: "c4", label: "회사가 계산해준 퇴직금 금액이 의심스러워요" },
];

const CALC_SLIDERS = [
  { id: "total3m", label: "3개월 임금 합계", min: 300, max: 3000, step: 50, defaultValue: 950, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "days", label: "3개월 총 일수", min: 88, max: 93, step: 1, defaultValue: 91, format: (v: number) => `${v}일` },
];

const CALC_RESULTS = [
  {
    label: "1일 평균임금",
    getValue: (v: Record<string, number>) => Math.round((v.total3m * 10000) / v.days),
    format: (v: number) => `약 ${Math.round(v / 10000 * 10) / 10}만원`,
    highlight: true,
  },
  {
    label: "퇴직금 1년 기준 (30일치)",
    getValue: (v: Record<string, number>) => Math.round((v.total3m * 10000) / v.days * 30),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "급여명세서 (3개월치)", required: true, where: "회사 인사팀 요청" },
  { name: "상여금 지급 내역 또는 연간 확인서", required: true, where: "인사팀 또는 급여명세서" },
  { name: "연차수당 지급 내역", required: false, where: "급여명세서 또는 인사팀" },
  { name: "근로계약서", required: false, where: "인사팀 또는 입사 시 수령본" },
];

const STEPS = [
  {
    title: "3개월 범위 확정",
    desc: "퇴직일을 기준으로 역산한 3개월이 산정 기간이에요. 퇴직일이 3월 31일이면 1월 1일~3월 31일이 해당돼요. 급여 지급일 기준이 아니라 실제 근무 기간 기준이에요. 달력에서 직접 세는 게 가장 정확해요.",
    tip: "퇴직일이 월 중순이면 3개월이 두 달 반이 될 수도 있어요",
  },
  {
    title: "포함 항목 합산",
    desc: "기본급, 정기·고정 수당, 상여금(월 환산), 연차수당(기간 내 지급분)을 모두 더해요. 상여금은 지급된 달 금액 전체가 아니라 연간 총액 ÷ 12 × 3으로 환산해서 넣어야 해요. 실비변상·경조금·임시 지급 항목은 제외예요.",
    tip: "상여금 환산이 빠지면 수십~수백만원 손해예요",
  },
  {
    title: "1일 평균임금 계산",
    desc: "3개월 임금 합계를 3개월 총 일수로 나눠요. 총 일수는 달력에서 직접 세야 해요(88~93일). 2월이 포함된 경우 일수가 줄어들어 1일 평균임금이 더 높게 나와요.",
    tip: "편의상 91일로 나눠도 큰 차이 없어요",
  },
  {
    title: "근속연수 적용해서 최종 계산",
    desc: "1일 평균임금 × 30 × 근속연수로 최종 퇴직금을 계산해요. 근속기간이 딱 몇 년이 아니면 일 단위로 계산해요(예: 547일이면 547 ÷ 365 = 1.498년). 통상임금과 비교해서 높은 쪽을 선택하세요.",
    tip: "평균임금이 통상임금보다 낮으면 통상임금 기준으로 계산 가능해요",
  },
];

const CHECKLIST = [
  "3개월 범위: 퇴직일 기준 역산, 달력으로 직접 확인",
  "상여금: 연간 총액 ÷ 12 × 3으로 환산해서 포함",
  "연차수당: 3개월 내 지급분만 포함",
  "총 일수: 달력 기준 실제 일수 (88~93일)",
  "통상임금 비교: 평균임금보다 통상임금이 높으면 통상임금 선택",
];

const FAQS = [
  {
    q: "3개월이 정확히 어디서 어디까지인가요?",
    a: "퇴직일 기준 역산 3개월이에요. 2026년 3월 31일 퇴직이면 2026년 1월 1일~3월 31일이 산정 기간이에요. 달력 기준으로 직접 세는 게 가장 정확해요.",
  },
  {
    q: "상여금이 3개월 안에 지급됐을 때 전액 포함 안 되나요?",
    a: "그렇게 하면 평균임금이 부풀려져요. 연간 상여금 총액을 12로 나눠 월 환산한 뒤 3개월치를 더해야 해요.",
  },
  {
    q: "연차수당은 언제 포함되나요?",
    a: "3개월 산정 기간 안에 실제로 지급된 연차수당이 포함돼요. 퇴직 시 정산되는 미사용 연차수당도 동일하게 포함될 수 있어요.",
  },
  {
    q: "2월이 포함된 3개월은 일수가 달라지나요?",
    a: "달라져요. 2월 포함 시 총 일수가 88~89일로 줄어들어 1일 평균임금이 높아질 수 있어요. 3월~5월 퇴직자는 이를 유리하게 활용할 수 있어요.",
  },
  {
    q: "평균임금이 통상임금보다 낮으면 어떻게 해요?",
    a: "통상임금으로 퇴직금을 계산할 수 있어요. 근로기준법 제2조 2항이 이를 허용해요. 두 기준을 모두 계산해서 높은 쪽을 선택하세요.",
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
  { slug: "퇴직금-계산법", title: "퇴직금 계산기", description: "월급·근속기간으로 예상 금액을 빠르게 확인해요." },
  { slug: "퇴직금-통상임금-계산", title: "통상임금으로 퇴직금 계산", description: "평균임금과 통상임금 비교 방법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-평균임금-산정-3개월-임금-계산-기준" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 평균임금 · 3개월기준</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 평균임금 3개월 기준, 어떻게 계산하나요?<br />
        포함·제외 항목과 상여금 환산 방법 정리
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금 <a href="/w/퇴직금-평균임금" style={{ color: "#1D9E75", textDecoration: "underline" }}>평균임금</a>은 퇴직 전 3개월 임금 합계를 총 일수로 나눠서 계산해요.
        상여금 환산을 빠뜨리거나 총 일수를 잘못 세면 퇴직금이 실제보다 낮게 나와요.
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제2조</a>가 정한 포함·제외 항목을 정확히 알아야 손해를 막을 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>3개월 기준, 어떤 항목이 포함되나요?</H2>
      <p style={body}>
        포함 항목은 기본급, 정기·고정 수당, 상여금(월 환산), 연차수당(기간 내 지급분)이에요.
        제외 항목은 실비변상, 경조금, 임시 지급 금품이에요.
        상여금을 그달 지급 금액 전체로 넣으면 평균임금이 부풀려지니 반드시 연간 총액을 12로 나눠 월 환산해서 3개월분만 넣어야 해요.
      </p>
      <p style={body}>
        3개월 총 일수도 정확히 세야 해요. 달력에서 직접 세는 게 가장 정확하고, 2월이 포함되면 총 일수가 줄어들어 1일 평균임금이 더 높게 나와요.
        <a href="/w/퇴직금-통상임금-계산" style={{ color: "#1D9E75", textDecoration: "underline" }}>통상임금</a>과 비교해서 높은 쪽을 선택하는 것도 가능해요.
      </p>

      <GreenBox title="3개월 임금 포함 vs 제외">
        포함: 기본급, 정기수당, 상여금(월환산), 연차수당(기간 내 지급분)<br />
        제외: 실비변상, 경조금, 임시지급 금품, 해고예고수당, 퇴직금 자체
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="3개월 평균임금 산정이 가능해요. 아래 계산기로 바로 확인해보세요."
        partialMatchText="항목별 확인이 필요해요. 고용노동부(1350) 상담을 받아보세요."
      />

      <Divider />

      <H2>3개월 임금으로 1일 평균임금 계산하기</H2>
      <p style={body}>
        3개월 임금 합계와 총 일수를 입력하면 1일 평균임금과 퇴직금 1년치 기준을 바로 확인할 수 있어요.
        상여금은 3개월분 환산액을 미리 더해서 총임금에 포함시키세요.
        계산기 결과에 근속연수를 곱하면 최종 퇴직금이 나와요.
      </p>

      <SectionBadge>1일 평균임금 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 3개월 합계 ÷ 총 일수 = 1일 평균임금. 30일 × 1일 평균임금 = 퇴직금 1년치 기준."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>산정에 필요한 서류</H2>
      <p style={body}>
        3개월 급여명세서와 상여금 지급 내역이 핵심이에요.
        퇴직 후엔 발급이 어려울 수 있으니 재직 중에 챙겨두세요.
        상여금 지급 규정이 별도로 있다면 함께 확보하면 증거력이 높아져요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>평균임금 산정 4단계</H2>
      <p style={body}>
        3개월 범위 확정 → 포함 항목 합산 → 1일 평균임금 산출 → 근속연수 적용 순서예요.
        상여금 환산이 가장 실수가 많은 단계예요. 이 단계를 빠뜨리면 수십~수백만원 손해가 생겨요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>산정 체크리스트</H2>
      <p style={body}>
        상여금 환산과 통상임금 비교는 꼭 챙기세요.
        빠뜨리면 퇴직금이 낮게 나오고, 이미 받았어도 3년 내라면 차액을 청구할 수 있어요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="상여금 환산을 빠뜨리면 손해예요">
        상여금을 제대로 환산하지 않으면 퇴직금이 수십만~수백만원 적게 나와요.<br />
        연간 상여금 ÷ 12 × 3으로 반드시 환산해서 포함하세요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 평균임금 3개월 산정에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법과 근로자퇴직급여보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
