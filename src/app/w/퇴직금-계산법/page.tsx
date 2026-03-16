"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "1년 이상 같은 사업장에서 계속 근무했어요" },
  { id: "c2", label: "주 평균 15시간 이상 근무했어요" },
  { id: "c3", label: "최근 3개월 급여명세서를 받을 수 있어요" },
  { id: "c4", label: "상여금·성과급을 받은 적 있어요 (선택)" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "월 평균임금", min: 150, max: 800, step: 10, defaultValue: 300, format: (v: number) => `${v}만원` },
  { id: "years", label: "근속기간", min: 1, max: 35, step: 1, defaultValue: 5, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "예상 퇴직금",
    getValue: (v: Record<string, number>) => Math.round(v.salary * 10000 * v.years),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "1년당 기준 (1개월치)",
    getValue: (v: Record<string, number>) => Math.round(v.salary * 10000),
    format: (v: number) => `${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "최근 3개월 급여명세서", required: true, where: "회사 인사팀 요청" },
  { name: "근로계약서", required: true, where: "입사 시 수령 · 인사팀 재발급" },
  { name: "연간 상여금·성과급 지급 내역", required: false, where: "급여명세서 또는 인사팀" },
  { name: "미사용 연차수당 내역", required: false, where: "인사팀 또는 근태 시스템" },
  { name: "육아휴직 확인서", required: false, where: "근속연수 포함 여부 확인 시 필요" },
];

const STEPS = [
  {
    title: "평균임금 산정",
    desc: "퇴직 전 3개월간 받은 총임금을 실제 일수로 나눠 1일 평균임금을 구해요. 기본급 외에 상여금(연간 총액의 3/12), 연차수당도 포함되죠.",
    tip: "3개월 급여명세서 세전 총액 합산 ÷ 실제 일수(보통 89~92일)",
  },
  {
    title: "근속일수 확인",
    desc: "입사일부터 퇴직일까지 총 일수를 계산해요. 육아휴직·병가 기간도 근속일수에 포함되죠. 반면 무단결근은 제외될 수 있어요.",
    tip: "고용보험 이력 조회(고용24)로 정확한 입사일 확인 가능",
  },
  {
    title: "퇴직금 계산",
    desc: "퇴직금 = 1일 평균임금 × 30 × (근속일수 ÷ 365). 근속 1년이면 월급의 약 1배, 10년이면 약 10배가 기준이에요.",
    tip: "상여금·연차수당 포함하면 기본급 기준보다 5~20% 높게 나와요",
  },
  {
    title: "퇴직 후 14일 이내 수령 확인",
    desc: "법적으로 퇴직 후 14일 이내에 지급해야 해요. 미지급 시 연 20% 지연이자가 붙죠. 14일이 지나도록 안 주면 고용노동부(1350)에 바로 신고하세요.",
    tip: "IRP 계좌 미리 개설해두면 이체가 빨라져요",
  },
];

const CHECKLIST = [
  "3개월 급여명세서 — 세전 총액 기준으로 챙기기",
  "연간 상여금·성과급 — 1년치 총액을 12로 나눈 뒤 3을 곱함",
  "미사용 연차수당 — 퇴직 전 1년간 발생분 포함 여부 확인",
  "IRP 계좌 — 퇴직금 수령 전 미리 개설 (300만원 초과 시 의무)",
  "근속기간 — 입사일·퇴직일 정확히 확인 (날짜 하루 차이로 달라짐)",
];

const FAQS = [
  {
    q: "기본급만으로 계산하면 안 되나요?",
    a: "부정확해요. 상여금, 식대·교통비 같은 복리후생비(고정 지급 시), 연차수당까지 포함해야 실제 퇴직금에 가깝게 나오죠. 기본급만 쓰면 10~20% 낮게 계산될 수 있어요.",
  },
  {
    q: "성과급이 매년 달라도 포함하나요?",
    a: "포함해요. 퇴직 전 1년간 받은 성과급 총액의 3/12를 3개월 임금에 더하죠. 금액이 매년 달라도 직전 1년 기준이에요.",
  },
  {
    q: "퇴직금을 14일 안에 안 주면 어떻게 되나요?",
    a: "연 20% 지연이자가 붙어요. 고용노동부(1350)에 진정을 넣으면 근로감독관이 조사해요. 형사 처벌(3년 이하 징역 또는 3,000만원 벌금)까지 가능하죠.",
  },
  {
    q: "퇴직금 계산기 결과를 믿어도 되나요?",
    a: "기본 구조는 맞지만, 변동 항목(상여금·연차수당)을 빼면 부정확해요. 계산기는 참고용으로 쓰고, 급여명세서 기반으로 직접 검증하세요.",
  },
  {
    q: "1년 미만이면 퇴직금이 아예 없나요?",
    a: "맞아요. 계속 근로 1년이 충족돼야 퇴직금이 발생해요. 11개월 29일이면 한 푼도 없죠. 단, 1년을 채우면 1개월치가 기준이 되죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 — 퇴직급여 산정 기준", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "근로기준법 제2조 — 평균임금 정의", url: "https://www.law.go.kr/법령/근로기준법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 — 퇴직금 제도 안내", url: "https://www.moel.go.kr" },
      { label: "고용24 — 내 고용보험 이력 조회", url: "https://www.ei.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-조건",
    title: "퇴직금 받을 수 있는 조건",
    description: "1년, 주 15시간 기준 등 퇴직금 발생 조건을 정리했어요.",
  },
  {
    slug: "퇴직금-미지급-신고",
    title: "퇴직금 미지급 신고 방법",
    description: "회사가 안 줄 때 어디에 어떻게 신고하는지 안내해요.",
  },
  {
    slug: "퇴직금-세금",
    title: "퇴직금 세금, 얼마나 떼나요?",
    description: "퇴직소득세 계산법과 IRP 절세 방법을 설명해요.",
  },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-계산법" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 계산 · 평균임금</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 계산법, 근속 5년이면<br />
        얼마 받을 수 있을까?
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금 계산, 생각보다 복잡하죠? 기본급만 넣으면 실제보다 낮게 나와요.
        상여금, 연차수당까지 포함해야 정확한 금액이 나오거든요.
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여 보장법</a>에서 정한
        평균임금 공식부터, 실제 계산 예시, 미지급 시 신고까지 한 번에 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>퇴직금, 받을 수 있는 조건은?</H2>
      <p style={body}>
        퇴직금은 고용 형태와 무관하게 두 가지 조건을 충족하면 법적으로 받을 수 있어요.
        첫째, 같은 사업장에서 <strong>계속 근로 1년 이상</strong>. 둘째, 4주 평균 <strong>주 15시간 이상</strong> 근무.
        정규직·계약직·알바·파트타임 모두 동일하게 적용돼요.
      </p>
      <p style={body}>
        1인 사업장도 예외가 없어요. 2012년부터 규모에 상관없이 모든 사업장에 퇴직금 지급 의무가 확대됐거든요.
        4대보험 미가입 상태여도 실제 근무했다는 증거가 있으면 청구할 수 있어요.
      </p>
      <p style={body}>
        주의할 점은 "계속 근로"예요. 중간에 계약이 끊겼다가 다시 이어진 경우, 실질적으로 같은 근무라는 걸 입증하면 합산이 가능하지만, 법원 판단에 따라 달라질 수 있어요.
      </p>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="퇴직금 계산 조건을 갖췄어요. 아래 계산기로 예상 금액을 확인해보세요."
        partialMatchText="조건 일부가 부족해요. 고용노동부(1350) 상담을 먼저 받아보세요."
      />

      <Divider />

      <H2>내 퇴직금, 얼마나 나올까?</H2>
      <p style={body}>
        퇴직금 공식은 <strong>1일 평균임금 × 30 × (근속일수 ÷ 365)</strong>예요.
        쉽게 말하면 1년 근무할 때마다 월급 1개월치가 퇴직금으로 쌓이는 구조죠.
        아래에서 월급과 근속기간을 조절해보세요.
      </p>

      <SectionBadge>내 상황에 맞게 직접 계산해보세요</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 월 평균임금 기준 추정치. 상여금·연차수당 포함 시 실제 금액이 더 높을 수 있어요."
      />

      <p style={body}>
        계산 결과에서 중요한 점은 <strong>상여금과 연차수당</strong>이에요. 연봉의 10~20%를 상여금으로 받는다면 퇴직금도 그만큼 올라가죠.
        예를 들어 월급 300만원에 연 600만원 상여금을 받는다면, 상여금만으로 월 50만원(600÷12)이 평균임금에 추가돼요.
      </p>

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>정확한 계산에 필요한 서류</H2>
      <p style={body}>
        계산기로 나온 금액이 "예상치"라면, 실제 수령액은 서류 기반으로 계산한 값이에요.
        회사 인사팀에 아래 서류를 요청하거나, 직접 보관해두세요.
        퇴직 후엔 발급이 어려울 수 있으니 재직 중에 챙겨두는 게 좋아요.
      </p>

      <SectionBadge>서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <BorderBox title="서류가 없다면?">
        통장 입금 내역, 카카오톡 급여 안내 메시지, 4대보험 가입 이력만 있어도 기본 증명이 돼요.
        고용보험 가입 이력은 <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 바로 조회할 수 있어요.
      </BorderBox>

      <Divider />

      <H2>퇴직금 수령 절차 4단계</H2>
      <p style={body}>
        퇴직금은 자동으로 들어오지 않아요. 퇴직 전에 IRP 계좌를 개설하고, 회사에 지급 요청을 해야 하죠.
        미지급 시엔 단계별로 대응하면 대부분 해결할 수 있어요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>계산 전 꼭 확인할 것들</H2>
      <p style={body}>
        퇴직금 계산에서 가장 많이 놓치는 항목들이에요.
        하나씩 체크하면서 빠진 게 없는지 확인해보세요.
      </p>

      <SectionBadge>퇴직금 계산 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="1년 미만으로 끊기는 경우 주의">
        사용자가 11개월 29일에 퇴직하도록 유도하는 사례가 있어요.
        이건 명백한 불법이에요. 실질적으로 계속 근로라는 증거가 있다면
        <a href="/w/퇴직금-미지급-신고" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부에 진정</a>을 넣을 수 있어요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 계산할 때 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법과 근로자퇴직급여 보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
