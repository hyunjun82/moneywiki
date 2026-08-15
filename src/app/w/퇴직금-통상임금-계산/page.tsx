"use client";
import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR, 퇴직금_HIGHLIGHT } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "기본급 외 매월 고정으로 식대·교통비·직책수당을 받아요" },
  { id: "c2", label: "육아휴직, 무급휴직, 장기병가로 3개월 임금이 줄었어요" },
  { id: "c3", label: "회사가 기본급만으로 퇴직금을 계산해서 지급했어요" },
  { id: "c4", label: "퇴직한 지 아직 3년이 지나지 않았어요" },
];

const CALC_SLIDERS = [
  { id: "base", label: "월 기본급 (만원)", min: 150, max: 600, step: 10, defaultValue: 280, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "fixed", label: "고정 수당 합계 (월, 만원)", min: 0, max: 200, step: 5, defaultValue: 60, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "years", label: "근속 기간 (년)", min: 1, max: 30, step: 1, defaultValue: 5, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "통상임금 기준 퇴직금",
    getValue: (v: Record<string, number>) => (v.base + v.fixed) * 10000 * v.years,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "기본급만 기준 퇴직금",
    getValue: (v: Record<string, number>) => v.base * 10000 * v.years,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
  {
    label: "통상임금 기준 추가 수령액",
    getValue: (v: Record<string, number>) => v.fixed * 10000 * v.years,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원 더 받을 수 있어요`,
  },
];

const DOCS = [
  { name: "근로계약서 (수당 내역 포함)", required: true, where: "인사팀 또는 입사 시 수령본" },
  { name: "급여명세서 (최근 3개월)", required: true, where: "회사 인사팀" },
  { name: "취업규칙 또는 연봉계약서", required: true, where: "인사팀 (수당 지급 근거 확인용)" },
  { name: "상여금 지급 기준 서류", required: false, where: "인사팀 (고정 상여금 해당자)" },
];

const STEPS = [
  {
    title: "통상임금 구성 항목 확인",
    desc: "기본급에 정기적·일률적·고정적으로 지급되는 수당을 더해요. 식대(고정분), 교통비(고정분), 직책수당, 고정 자격수당이 포함돼요. 성과급·인센티브·실적에 따른 항목은 제외예요.",
    tip: "근로계약서나 취업규칙에 '매월 정기 지급'으로 명시된 수당만 포함해요",
  },
  {
    title: "평균임금과 통상임금 모두 계산",
    desc: "1일 평균임금 = 퇴직 전 3개월 총임금 ÷ 3개월 총 일수. 1일 통상임금 = 월 통상임금 ÷ 30일. 두 금액을 각각 구해서 어느 쪽이 높은지 비교해요.",
    tip: "육아휴직·무급휴직 기간이 있으면 평균임금이 낮게 나와 통상임금이 유리해요",
  },
  {
    title: "높은 쪽으로 퇴직금 계산",
    desc: "근로기준법 제2조 제2항은 평균임금이 통상임금보다 낮은 경우 통상임금을 평균임금으로 사용하도록 규정해요. 두 값 중 높은 쪽에 '× 30일 × 근속연수'를 곱하면 퇴직금이에요.",
    tip: "고정 수당이 월급의 20% 이상이면 통상임금 기준이 유리한 경우가 많아요",
  },
  {
    title: "회사에 서면 청구 또는 고용노동부 진정",
    desc: "회사가 기본급만으로 지급했다면 차액을 서면으로 청구해요. 내용증명으로 발송하면 법적 증거가 돼요. 거부할 경우 고용노동부 고객상담센터(1350)에 진정을 낼 수 있어요. 소멸시효는 퇴직일로부터 3년이에요.",
    tip: "내용증명은 우체국 온라인(epost.go.kr)에서 발송 가능해요",
    link: { label: "고용노동부 진정 신청", href: "https://minwon.moel.go.kr" },
  },
];

const CHECKLIST = [
  "통상임금 포함 항목: 정기·일률·고정 수당만 (성과급 제외)",
  "평균임금도 계산: 두 가지 모두 구해서 비교",
  "높은 쪽 선택: 근로기준법 제2조 제2항 근거",
  "근로계약서·급여명세서: 고정 수당 입증 서류 보관",
  "소멸시효: 퇴직일로부터 3년 내 청구",
];

const FAQS = [
  {
    q: "통상임금이 뭔가요? 평균임금과 뭐가 달라요?",
    a: "통상임금은 기본급 + 정기·일률·고정 수당이에요. 매달 조건 없이 받는 금액이죠. 평균임금은 퇴직 전 3개월에 실제로 받은 금액의 평균이에요. 야근이 많았던 달이 포함되면 평균임금이 높고, 육아휴직 기간이 있으면 평균임금이 낮아져요.",
  },
  {
    q: "식대 20만원이 통상임금에 포함되나요?",
    a: "매월 모든 근로자에게 조건 없이 정기 지급된다면 통상임금이에요. 단, 실제로 식사한 날만 지급하거나 금액이 달라지는 실비 식대는 제외돼요. 근로계약서에 '월 20만원 정기 지급'으로 명시돼 있으면 포함해요.",
  },
  {
    q: "성과급은 통상임금인가요?",
    a: "아니에요. 지급 여부와 금액이 실적에 따라 달라지면 고정성이 없어서 통상임금에서 제외돼요. 단, 최소한의 금액을 무조건 지급하는 구조라면 그 최소 금액은 포함될 수 있어요.",
  },
  {
    q: "육아휴직 중에 퇴직하면 통상임금 기준이 유리한가요?",
    a: "맞아요. 육아휴직 기간에는 임금을 받지 않거나 적게 받기 때문에 3개월 평균임금이 낮게 나와요. 이 경우 통상임금이 평균임금보다 높으면 통상임금 기준으로 퇴직금을 계산할 수 있어요.",
  },
  {
    q: "회사가 통상임금 기준 적용을 거부하면?",
    a: "고용노동부 고객상담센터(1350)에 진정을 낼 수 있어요. 근로계약서, 급여명세서, 취업규칙을 증빙으로 갖추고 신청하면 돼요. 퇴직 후 3년 내라면 청구할 수 있어요.",
  },
  {
    q: "기본급 외 수당을 회사가 인정 안 하면?",
    a: "급여명세서에 수당 항목이 찍혀 있다면 그 자체가 증거예요. 근로계약서나 취업규칙에 명시된 항목도 마찬가지예요. 서류가 없다면 계좌 이체 내역으로도 수당 지급 사실을 입증할 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제2조: 통상임금·평균임금 정의 및 적용 기준", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로자퇴직급여보장법 제8조: 퇴직금 산정 방법", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부: 통상임금 산정 지침", url: "https://www.moel.go.kr" },
      { label: "고용노동부 민원마당: 퇴직금 진정 신청", url: "https://minwon.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-평균임금", title: "퇴직금 평균임금이란", description: "3개월 평균임금 계산 방법과 포함 항목을 정리했어요." },
  { slug: "퇴직금-계산-방법", title: "퇴직금 계산 방법 전체 정리", description: "법정 공식과 계산 예시를 단계별로 설명해요." },
  { slug: "퇴직금-미지급-신고", title: "퇴직금 미지급 신고 방법", description: "고용노동부 진정 절차와 지연이자 청구 방법이에요." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} highlightSlugs={퇴직금_HIGHLIGHT} currentSlug="퇴직금-통상임금-계산" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 통상임금 · 계산기준</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        통상임금으로 퇴직금 더 받을 수 있나요?<br />
        평균임금 vs 통상임금 비교와 유리한 기준 계산법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        회사가 기본급만으로 퇴직금을 계산했다면, 고정 수당까지 포함한 통상임금 기준으로 다시 계산하면 더 받을 수 있어요.
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제2조 제2항</a>은
        평균임금이 통상임금보다 낮으면 통상임금을 기준으로 하도록 명시해요.
        육아휴직, 무급휴직, 장기 병가로 3개월 임금이 줄었다면 통상임금 기준이 유리할 가능성이 높아요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>통상임금 기준이 유리한 상황인지 먼저 확인해요</H2>
      <p style={body}>
        통상임금은 기본급에 정기적·일률적·고정적으로 지급되는 수당을 더한 금액이에요.
        매달 변동 없이 받는 식대·교통비·직책수당 같은 항목들이 포함돼요.
        반면 평균임금은 퇴직 전 3개월에 실제로 받은 금액의 평균이라서, 그 기간에 임금이 줄었다면 통상임금보다 낮게 나올 수 있어요.
      </p>
      <p style={body}>
        회사가 기본급만으로 퇴직금을 계산해서 지급했다면 차액 청구가 가능해요.
        퇴직금 청구권 소멸시효는 퇴직일로부터 3년이에요.
        이미 퇴직했어도 3년 내라면 차액을 받을 수 있어요.
      </p>

      <GreenBox>
        포함: 기본급, 매월 고정 식대, 교통비(고정), 직책수당, 고정 자격수당<br />
        제외: 성과급·인센티브, 연장·야간·휴일 수당, 불규칙 상여금, 실비 식대
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="통상임금 기준으로 계산하면 퇴직금이 더 높게 나올 가능성이 높아요. 아래 계산기로 두 기준을 비교해보세요."
        partialMatchText="평균임금 기준도 함께 계산해서 더 높은 쪽을 선택하면 돼요."
      />

      <Divider />

      <H2>통상임금 vs 기본급만 기준 퇴직금 비교 계산기</H2>
      <p style={body}>
        기본급, 고정 수당, 근속 기간을 입력하면 두 기준의 퇴직금 차이를 바로 볼 수 있어요.
        고정 수당이 월 60만원이면 5년 근무 시 300만원 차이가 나요.
        수당이 클수록, 근속기간이 길수록 차이가 커져요.
      </p>

      <SectionBadge>통상임금 기준 비교 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 통상임금 기준: (기본급 + 고정 수당) × 근속연수. 기본급만 기준: 기본급 × 근속연수. 실제 퇴직금은 평균임금과 통상임금 중 높은 쪽으로 계산해요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>통상임금 기준 퇴직금 청구 서류</H2>
      <p style={body}>
        통상임금 기준으로 퇴직금을 청구하려면 어떤 수당이 정기·고정적으로 지급됐는지 증명해야 해요.
        근로계약서에 수당 내역이 명시돼 있다면 가장 강력한 근거예요.
        급여명세서에 수당 항목이 매월 동일하게 찍혀 있어도 증거가 돼요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>유리한 기준으로 퇴직금 청구하는 4단계</H2>
      <p style={body}>
        평균임금과 통상임금 중 어느 쪽이 유리한지 직접 계산해보고, 높은 쪽을 기준으로 회사에 청구하는 게 핵심이에요.
        회사가 기본급만으로 계산해서 지급했다면 차액 청구가 가능하고, 거부 시 고용노동부에 진정을 낼 수 있어요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>퇴직금 청구 전 체크리스트</H2>
      <p style={body}>
        고정 수당이 있는데도 회사가 기본급만으로 계산했다면 이의 제기로 차액을 받을 수 있어요.
        청구 기한인 3년이 지나면 권리가 소멸되니 서둘러야 해요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        평균임금 기준과 통상임금 기준을 모두 계산해서 높은 쪽을 선택할 수 있어요.<br />
        근로기준법 제2조 제2항이 보장하는 권리예요. 회사가 거부하면 고용노동부(1350)에 진정을 낼 수 있어요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        통상임금과 평균임금 차이에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법과 근로자퇴직급여보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
