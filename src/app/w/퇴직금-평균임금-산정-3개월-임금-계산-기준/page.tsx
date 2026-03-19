"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "기본급 외에 직책수당·직무수당을 매달 받았어요" },
  { id: "c2", label: "연 2회 이상 정기 상여금을 받았어요" },
  { id: "c3", label: "연장·야간·휴일 근로수당이 급여명세서에 포함돼 있어요" },
  { id: "c4", label: "출장비·식대·교통비를 실비로 따로 받았어요" },
];

const CALC_SLIDERS = [
  { id: "base3m", label: "3개월 기본급 + 고정수당 합계", min: 150, max: 2000, step: 50, defaultValue: 750, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "bonus", label: "연간 상여금 총액", min: 0, max: 2000, step: 50, defaultValue: 300, format: (v: number) => `${v.toLocaleString()}만원` },
];

const CALC_RESULTS = [
  {
    label: "3개월 임금 합계 (상여금 환산 포함)",
    getValue: (v: Record<string, number>) => Math.round((v.base3m + v.bonus / 4) * 10000),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "1일 평균임금 (91일 기준)",
    getValue: (v: Record<string, number>) => Math.round((v.base3m + v.bonus / 4) * 10000 / 91),
    format: (v: number) => `약 ${Math.round(v / 1000).toLocaleString()}천원`,
  },
];

const DOCS = [
  { name: "급여명세서 (최근 3개월)", required: true, where: "회사 인사팀 요청" },
  { name: "연간 상여금 지급 내역 또는 확인서", required: true, where: "인사팀 또는 급여명세서 합산" },
  { name: "연장근로수당 내역 (해당자)", required: false, where: "급여명세서 또는 근태 기록" },
  { name: "근로계약서 (수당 항목 확인용)", required: false, where: "인사팀 또는 입사 시 수령본" },
];

const STEPS = [
  {
    title: "급여명세서 항목 분류",
    desc: "3개월치 급여명세서를 꺼내고 항목을 '포함'과 '제외'로 나눠요. 기본급, 직책·직무수당, 가족수당(고정 지급), 연장·야간·휴일 근로수당은 포함이에요. 출장비, 식대(실비), 교통비(실비), 경조금, 해고예고수당은 제외예요.",
    tip: "수당 이름이 아니라 '정기·일률·고정 지급 여부'가 기준이에요",
  },
  {
    title: "상여금 3개월분 환산",
    desc: "연간 상여금 총액 ÷ 12 × 3으로 3개월분을 계산해요. 예를 들어 연 600만원 상여금이면 600 ÷ 12 × 3 = 150만원을 3개월 임금에 더해요. 3개월 안에 상여금이 지급됐다고 그달 지급액 전체를 넣으면 평균임금이 왜곡돼요.",
    tip: "상여금 환산을 빠뜨리면 퇴직금이 수십~수백만원 낮아질 수 있어요",
  },
  {
    title: "총 일수 확인",
    desc: "달력에서 3개월 기간의 날수를 직접 세요(보통 88~93일). 2월이 포함된 분기는 총 일수가 적어서 1일 평균임금이 높아져요. 제외 기간(육아휴직 등)이 있으면 그 일수를 빼야 해요.",
    tip: "달력에서 직접 세는 게 가장 정확해요 — 편의상 91일을 써도 큰 차이 없어요",
  },
  {
    title: "1일 평균임금 산출",
    desc: "3개월 임금 합계(포함 항목 + 상여금 환산액)를 총 일수로 나눠요. 나온 금액에 30을 곱하면 퇴직금 1년치 기준이에요. 통상임금과 비교해서 높은 쪽을 선택할 수 있어요.",
    tip: "1일 평균임금 × 30 × 근속연수 = 최종 퇴직금",
  },
];

const CHECKLIST = [
  "기본급·고정수당: 포함 — 매달 정기적으로 나오는 수당은 모두 포함",
  "상여금: 연간 총액 ÷ 12 × 3으로 환산 — 지급된 달 금액 전체 아님",
  "연장·야간·휴일 수당: 포함 — 급여명세서에 기재된 금액 그대로",
  "실비 지급 식대·교통비·출장비: 제외 — 근무하지 않았으면 지급 안 되는 것도 제외",
  "경조금·결혼축하금·조의금: 제외 — 복리후생 성격이라 제외",
];

const FAQS = [
  {
    q: "식대가 포함인지 제외인지 어떻게 구분해요?",
    a: "정기적·일률적으로 나오면 포함, 실비 지급이면 제외예요. 근무일에 상관없이 매달 고정으로 10만원이 나오면 포함이에요. 영수증 제출 후 실비로 받는 방식이면 제외예요.",
  },
  {
    q: "3개월 안에 성과급이 지급됐어요. 전액 포함되나요?",
    a: "정기·일률적으로 지급되는 성과급은 연간 총액 기준으로 환산해서 3개월분만 포함해요. 특정 달에만 지급된 금액 전체를 넣으면 평균임금이 부풀려져서 나중에 문제가 생길 수 있어요.",
  },
  {
    q: "연차수당은 언제 포함되나요?",
    a: "3개월 산정 기간 안에 실제로 지급된 연차수당이 포함돼요. 퇴직 시 정산되는 미사용 연차수당도 해당 기간에 지급된 경우 포함될 수 있어요.",
  },
  {
    q: "회사가 기본급만으로 퇴직금을 계산해서 줬어요. 어떻게 하나요?",
    a: "수당·상여금을 제외한 채 계산하면 근로기준법 위반이에요. 차액에 대해 퇴직금 청구가 가능해요. 소멸시효 3년 내라면 고용노동부(1350)에 신고하거나 노동위원회에 청구할 수 있어요.",
  },
  {
    q: "연장근로수당이 달마다 달라요. 어떻게 포함하나요?",
    a: "달마다 다르더라도 3개월 산정 기간에 실제로 지급된 금액을 그대로 합산하면 돼요. 3개월 합계에 넣고 총 일수로 나누면 자동으로 평균값이 반영돼요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제2조: 평균임금 정의 및 산정 기준", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로자퇴직급여보장법 제8조: 퇴직금 산정 방법", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부: 임금 포함 여부 판단 기준 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-평균임금-산정", title: "평균임금 산정 방법과 제외 기간", description: "산정 기간 설정과 육아휴직·요양 기간 제외 방법이에요." },
  { slug: "퇴직금-평균임금", title: "퇴직금 평균임금 개념 정리", description: "평균임금이 퇴직금 계산에서 어떻게 쓰이는지 정리했어요." },
  { slug: "퇴직금-계산-방법", title: "퇴직금 계산 방법 전체 정리", description: "평균임금 × 30 × 근속연수 공식 적용 예시예요." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-평균임금-산정-3개월-임금-계산-기준" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 평균임금 · 3개월임금</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 3개월 임금 계산 기준, 뭘 넣고 뭘 빼야 하나요?<br />
        포함·제외 항목과 상여금 환산 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        <a href="/w/퇴직금-평균임금" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 평균임금</a>은 퇴직 전 3개월 임금 합계를 총 일수로 나눠서 계산해요.
        문제는 '3개월 임금'에 어떤 항목을 넣어야 하는지가 불명확하다는 점이에요.
        기본급만 넣으면 퇴직금이 낮게 나오고, 상여금을 잘못 환산해도 손해예요.
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제2조</a>가 정한 기준대로 항목을 정리하면 정확한 금액을 받을 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>내 수당 항목, 포함인가요 제외인가요?</H2>
      <p style={body}>
        포함 여부 기준은 '정기적·일률적·고정적으로 지급되는가'예요.
        기본급, 직책수당, 직무수당, 가족수당(고정 지급), 연장·야간·휴일 근로수당은 포함이에요.
        출장비, 식대(실비), 교통비(실비), 경조금, 임시로 지급된 금품은 제외예요.
        수당 이름이 아니라 지급 방식이 기준이에요.
      </p>
      <p style={body}>
        상여금이 고정으로 나온다면 포함 대상이에요. 단, 3개월 안에 지급된 금액 전체를 그대로 넣으면 안 돼요.
        연간 총액 ÷ 12 × 3으로 3개월분만 환산해서 넣어야 해요.
        이 환산을 빠뜨리면 퇴직금이 수십~수백만원 낮아질 수 있어요.
        <a href="/w/퇴직금-상여금-포함" style={{ color: "#1D9E75", textDecoration: "underline" }}>상여금 포함 기준</a>이 더 궁금하다면 별도 글을 보세요.
      </p>

      <GreenBox>
        포함: 기본급, 직책·직무수당, 가족수당(고정), 연장·야간·휴일 수당, 상여금(연간 환산분), 연차수당(기간 내 지급분)<br />
        제외: 식대·교통비(실비), 출장비, 경조금, 임시 지급 금품, 해고예고수당, 퇴직금 자체
      </GreenBox>

      <SectionBadge>내 수당 구성 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="기본급 외 항목이 여러 개 있어요. 아래 계산기로 상여금 환산을 포함한 3개월 임금을 확인해보세요."
        partialMatchText="수당 구성이 단순한 편이에요. 기본급 + 고정수당만 합산하면 돼요."
      />

      <Divider />

      <H2>상여금 환산 포함한 3개월 임금 계산기</H2>
      <p style={body}>
        3개월 기본급·고정수당 합계와 연간 상여금 총액을 입력하면 상여금 환산이 포함된 3개월 임금 합계와 1일 평균임금이 나와요.
        연장근로수당처럼 달마다 다른 항목은 3개월 합계에 미리 더해서 슬라이더에 포함시키세요.
      </p>

      <SectionBadge>3개월 임금 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 상여금 환산: 연간 총액 ÷ 12 × 3. 총 일수는 91일 기준 (달력에서 직접 세면 더 정확해요)."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>산정에 필요한 서류</H2>
      <p style={body}>
        3개월 급여명세서가 핵심 서류예요. 상여금이 있으면 연간 지급 총액을 확인할 수 있는 내역도 함께 확보해야 환산이 가능해요.
        퇴직 후엔 인사팀에 요청하기 어려울 수 있으니 재직 중에 미리 저장해두세요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>3개월 임금 항목 정리 후 퇴직금 계산 4단계</H2>
      <p style={body}>
        항목 분류 → 상여금 환산 → 총 일수 확인 → 1일 평균임금 산출 순서예요.
        1단계와 2단계를 제대로 하면 3단계부터는 단순한 나눗셈이에요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>항목별 포함·제외 체크리스트</H2>
      <p style={body}>
        항목별로 헷갈릴 때 참고하세요. 판단 기준이 애매한 항목은 고용노동부(1350) 상담을 받아보세요.
        이미 퇴직금을 받았어도 3년 내라면 차액 청구가 가능해요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        평균임금이 통상임금보다 낮으면 통상임금으로 퇴직금을 계산할 수 있어요.<br />
        근로기준법 제2조 2항이 이를 보장하고 있어요. 두 가지 모두 계산해서 높은 쪽을 선택하세요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        3개월 임금 항목 기준으로 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법과 근로자퇴직급여보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
