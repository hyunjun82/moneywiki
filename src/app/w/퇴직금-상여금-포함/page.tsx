"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR, 퇴직금_HIGHLIGHT } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "매년 같은 시기에 상여금을 받아요 (명절·분기·연말 등)" },
  { id: "c2", label: "전 직원 또는 일정 직급 이상에게 동일하게 지급돼요" },
  { id: "c3", label: "실적과 무관하게 일정 금액이 고정 지급돼요" },
  { id: "c4", label: "회사가 기본급만으로 퇴직금을 계산해줬어요" },
];

const CALC_SLIDERS = [
  { id: "base", label: "월 기본급", min: 150, max: 600, step: 10, defaultValue: 300, format: (v: number) => `${v}만원` },
  { id: "bonus", label: "연간 상여금 합계", min: 0, max: 3000, step: 100, defaultValue: 600, format: (v: number) => `${v}만원` },
  { id: "years", label: "근속연수", min: 1, max: 30, step: 1, defaultValue: 5, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "상여금 포함 월 평균임금",
    getValue: (v: Record<string, number>) =>
      v.base * 10000 + Math.round((v.bonus * 10000) / 12),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원/월`,
    highlight: true,
  },
  {
    label: "상여금 포함 퇴직금 (세전)",
    getValue: (v: Record<string, number>) => {
      const avgMonthly = v.base * 10000 + Math.round((v.bonus * 10000) / 12);
      return Math.round(avgMonthly * v.years);
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
  {
    label: "기본급만 계산 시 퇴직금",
    getValue: (v: Record<string, number>) => Math.round(v.base * 10000 * v.years),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "급여명세서 (최근 3개월)", required: true, where: "회사 인사팀 또는 급여앱" },
  { name: "상여금 지급 규정 또는 취업규칙", required: true, where: "회사 인사팀" },
  { name: "근로계약서", required: true, where: "입사 시 수령본 또는 인사팀" },
  { name: "연간 상여금 지급 내역서", required: false, where: "인사팀 또는 급여명세서 합산" },
];

const STEPS = [
  {
    title: "상여금 종류 먼저 확인",
    desc: "지급 시기가 정해져 있고, 모든 직원에게 균일하게, 실적과 무관하게 지급됐다면 퇴직금 계산에 포함되는 임금이에요. 취업규칙이나 근로계약서에 상여금 지급 기준이 명시돼 있으면 더 명확해요.",
    tip: "명절 상여, 분기 상여, 고정 하한선이 있는 성과급 → 포함 대상이에요",
  },
  {
    title: "연간 상여금 월 환산 계산",
    desc: "연간 상여금 총액을 12로 나눠서 월 환산액을 구해요. 예를 들어 연 600만원이면 월 50만원으로 환산해요. 이 금액을 기본급·수당 등과 합산해 평균임금을 다시 계산해요.",
    tip: "분기별·명절 상여가 여러 번 있다면 모두 합산한 후 12로 나눠요",
  },
  {
    title: "차액 계산 후 회사에 수정 요청",
    desc: "상여금을 포함한 퇴직금과 실제 받은 금액의 차이를 계산해요. 차액이 있으면 인사팀에 상여금 포함 재계산을 정중하게 요청해요. 대부분은 이 단계에서 해결돼요.",
    tip: "요청은 서면(이메일)으로 남겨두면 나중에 증거가 돼요",
  },
  {
    title: "거부 시 고용노동부 진정",
    desc: "회사가 재계산을 거부하면 고용노동부에 진정을 낼 수 있어요. 소멸시효 3년 이내라면 퇴직 후에도 청구 가능해요. 소액심판 청구도 방법 중 하나예요.",
    tip: "퇴직 후 3년이 지나면 청구권이 사라지니 빨리 움직이는 게 좋아요",
    link: { label: "고용노동부 진정 방법 보기", href: "/w/퇴직금-미지급-신고" },
  },
];

const CHECKLIST = [
  "상여금 성격 확인: 정기·일률·고정 지급인지 취업규칙 대조",
  "연간 총액 계산: 명절 상여 + 분기 상여 + 기타 고정 상여 합산",
  "월 환산: 연간 합계 ÷ 12 = 월 환산액",
  "급여명세서 3개월: 상여금 항목이 별도 표기됐는지 확인",
  "차액 계산: 상여금 포함 퇴직금 - 실제 수령액",
  "수정 요청: 인사팀에 서면으로 재계산 요청",
  "소멸시효: 퇴직 후 3년 이내 청구 가능",
];

const FAQS = [
  {
    q: "명절 상여금도 퇴직금 계산에 포함되나요?",
    a: "매년 같은 시기에 고정적으로 지급됐다면 포함돼요. 추석·설날 상여금은 정기성과 일률성을 갖추는 경우가 많아서 연간 합산 후 12로 나눠 월 환산해요.",
  },
  {
    q: "성과급은 퇴직금에 포함되나요?",
    a: "실적에 따라 금액이 달라지는 변동형 성과급은 원칙적으로 제외돼요. 단, '최소 OO만원은 무조건 지급'하는 하한선이 있다면 그 하한선만큼은 고정성이 있어서 포함될 수 있어요.",
  },
  {
    q: "회사가 상여금을 퇴직금 계산에서 제외해도 되나요?",
    a: "정기·일률·고정으로 지급된 상여금은 법적으로 평균임금에 포함해야 해요. 임의로 제외하면 근로기준법 위반이에요. 고용노동부에 진정을 낼 수 있어요.",
  },
  {
    q: "연 600만원 상여금이면 퇴직금이 얼마나 더 나오나요?",
    a: "월 50만원(600만원 ÷ 12)이 평균임금에 추가돼요. 근속 10년 기준으로 약 500만원 차이가 나요. 근속기간이 길수록, 상여금이 클수록 차이도 커져요.",
  },
  {
    q: "이미 받은 퇴직금에 상여금이 빠졌다면 어떻게 하나요?",
    a: "퇴직 후 3년 이내라면 차액을 청구할 수 있어요. 내용증명 발송 후 인사팀에 재계산을 요구하거나, 고용노동부 진정·소액심판으로 받을 수 있어요.",
  },
  {
    q: "상여금이 매년 지급됐지만 금액이 조금씩 달라요. 포함되나요?",
    a: "지급 여부와 큰 흐름은 고정돼 있고 금액만 소폭 다르다면 포함 가능성이 높아요. 정확한 판단은 지급 내역 전체와 취업규칙을 함께 봐야 해서 고용노동부(1350) 상담을 권해요.",
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
      { label: "고용노동부: 통상임금·평균임금 산정 지침", url: "https://www.moel.go.kr" },
      { label: "고용노동부 민원 상담 (1350)", url: "https://minwon.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-평균임금", title: "퇴직금 평균임금 계산 방법", description: "포함 항목과 3개월 산정 기준을 설명해요." },
  { slug: "퇴직금-계산법", title: "퇴직금 계산법 완전 정복", description: "월급·근속기간으로 금액 바로 확인해요." },
  { slug: "퇴직금-미지급-신고", title: "퇴직금 미지급 신고 절차", description: "회사가 안 줄 때 고용노동부 진정 방법이에요." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} highlightSlugs={퇴직금_HIGHLIGHT} currentSlug="퇴직금-상여금-포함" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 상여금 · 평균임금</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        상여금, 퇴직금 계산에 넣어야 하나요?<br />
        포함 기준부터 월 환산·차액 청구 방법까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        회사가 기본급만으로 퇴직금을 계산해줬는데, 상여금이 빠진 것 같다는 느낌 받아본 적 있죠?
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법</a>상
        평균임금에는 정기적·일률적·고정적으로 지급된 상여금이 반드시 포함돼요.
        어떤 상여금이 해당되는지 기준과 월 환산법, 차액이 있을 때 청구 방법까지 한 번에 정리해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* H2-1: 핵심 개념/자격 */}
      <H2>내 상여금이 퇴직금에 포함되는 기준</H2>
      <p style={body}>
        퇴직금 계산의 기준이 되는 <a href="/w/퇴직금-평균임금" style={{ color: "#1D9E75", textDecoration: "underline" }}>평균임금</a>은
        퇴직 전 3개월 동안 지급된 임금 총액으로 구해요.
        여기서 핵심은 '임금'의 범위예요.
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제2조</a>는
        임금을 근로의 대가로 지급하는 금품으로 정의하고, 상여금이 이 정의에 해당하려면 세 가지 요건을 갖춰야 해요.
      </p>
      <p style={body}>
        첫째, 정기성—지급 시기가 정해져 있고 매년 반복되는지.
        둘째, 일률성—모든 근로자 또는 일정 조건의 근로자에게 균일하게 지급되는지.
        셋째, 고정성—실적·평가에 따라 지급 여부와 금액이 달라지지 않는지.
        이 세 가지를 갖추면 퇴직금 계산에 들어가요.
      </p>
      <p style={body}>
        반대로 실적에 따라 크게 달라지는 변동 성과급은 고정성이 없어서 제외될 수 있어요.
        단, '최소 OO만원 보장' 같은 하한선이 있는 성과급은 그 하한선 금액만큼은 고정성이 인정돼요.
      </p>

      <GreenBox>
        정기·일률·고정 지급 상여금 → 퇴직금 계산에 포함<br />
        명절 상여, 분기 상여, 고정 하한선 성과급 → 포함<br />
        실적 변동 성과급, 일회성 특별 포상금 → 제외
      </GreenBox>

      <SectionBadge>내 상여금 포함 여부 체크</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="상여금이 퇴직금 계산에 포함될 가능성이 높아요. 아래 계산기로 차액을 직접 확인해보세요."
        partialMatchText="조건 일부가 다를 수 있어요. 고용노동부(1350) 상담으로 정확하게 확인하는 걸 권해요."
      />

      <Divider />

      {/* H2-2: 금액/계산 */}
      <H2>상여금 포함 시 퇴직금이 얼마나 달라지나요?</H2>
      <p style={body}>
        기본급만 기준으로 계산한 퇴직금과 상여금을 포함한 퇴직금은 생각보다 차이가 커요.
        연 상여금 600만원이면 월 50만원이 평균임금에 더해지고,
        <a href="/w/퇴직금-계산법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근속 10년 퇴직금</a> 기준으로 약 500만원 차이가 나요.
      </p>
      <p style={body}>
        아래 계산기에서 슬라이더를 조절해 내 상황을 직접 계산해보세요.
        세 번째 결과값에서 기본급만 계산한 금액과 비교할 수 있어요.
      </p>

      <SectionBadge>상여금 포함 퇴직금 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 연간 상여금 ÷ 12로 월 환산한 금액을 월 평균임금에 합산해요. 세금 미반영 세전 기준이에요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      {/* H2-3: 서류/증빙 */}
      <H2>상여금 포함 여부 확인에 필요한 서류</H2>
      <p style={body}>
        상여금이 퇴직금에 제대로 반영됐는지 따지려면 실제 지급 내역과 회사 규정을 같이 봐야 해요.
        급여명세서만으로는 부족하고, 상여금 지급 기준이 담긴 취업규칙이나 근로계약서가 핵심이에요.
      </p>
      <p style={body}>
        급여명세서는 최근 3개월치가 기본이에요.
        상여금이 별도 항목으로 표기됐는지, 기본급에 합산됐는지 구분해서 봐야
        회사가 평균임금에 포함시켰는지 알 수 있어요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      {/* H2-4: 절차/방법 */}
      <H2>차액 청구 절차는 어떻게 되나요?</H2>
      <p style={body}>
        회사가 상여금을 빼고 퇴직금을 계산했다면 차액을 청구할 수 있어요.
        퇴직 전이라면 지급 전에 수정 요청을 하고,
        이미 퇴직했다면 <a href="/w/퇴직금-소멸시효" style={{ color: "#1D9E75", textDecoration: "underline" }}>3년 소멸시효</a> 안에 움직여야 해요.
      </p>
      <p style={body}>
        대부분은 인사팀에 정중하게 요청하면 재계산해줘요.
        거부하는 경우에는 <a href="/w/퇴직금-미지급-신고" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부 진정</a>이 가장 확실한 방법이에요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      {/* H2-5: 준비/주의사항 */}
      <H2>청구 전에 꼭 점검해야 할 사항들</H2>
      <p style={body}>
        퇴직금을 받기 전이든, 이미 받은 금액이 맞는지 점검하든 이 체크리스트를 써보세요.
        항목마다 실제로 확인해야 나중에 놓치는 게 없어요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        연 상여금 600만원 × 근속 10년 → 약 500만원 차이<br />
        상여금이 크고 근속기간이 길수록 차이도 커져요<br />
        소멸시효 3년: 퇴직일 기준, 지나면 청구권 소멸
      </GreenBox>

      <Divider />

      {/* H2-6: FAQ */}
      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        상여금 포함 여부에 대해 실제로 자주 나오는 질문만 모았어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법 및 근로자퇴직급여보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
