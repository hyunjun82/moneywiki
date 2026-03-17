"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "정기적으로 상여금을 받고 있어요" },
  { id: "c2", label: "퇴직 전 3개월 급여명세서를 보관하고 있어요" },
  { id: "c3", label: "연간 상여금 총액을 알고 있어요" },
  { id: "c4", label: "회사가 기본급만으로 퇴직금을 계산하고 있어요" },
];

const CALC_SLIDERS = [
  { id: "base", label: "월 기본급", min: 150, max: 500, step: 10, defaultValue: 250, format: (v: number) => `${v}만원` },
  { id: "bonus", label: "연간 상여금", min: 0, max: 2000, step: 100, defaultValue: 600, format: (v: number) => `${v}만원` },
];

const CALC_RESULTS = [
  {
    label: "상여금 포함 월 평균임금",
    getValue: (v: Record<string, number>) => v.base * 10000 + Math.round((v.bonus * 10000) / 12),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원/월`,
    highlight: true,
  },
  {
    label: "상여금 포함 퇴직금 (1년)",
    getValue: (v: Record<string, number>) => v.base * 10000 + Math.round((v.bonus * 10000) / 12),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "급여명세서 (최근 3개월)", required: true, where: "회사 인사팀 또는 급여앱" },
  { name: "상여금 지급 규정 또는 취업규칙", required: true, where: "회사 인사팀" },
  { name: "근로계약서", required: false, where: "인사팀 또는 입사 시 수령본" },
  { name: "상여금 지급 내역서 (연간)", required: false, where: "인사팀 또는 급여명세서" },
];

const STEPS = [
  {
    title: "상여금 종류 확인",
    desc: "정기적·일률적으로 지급되는 상여금은 퇴직금 계산에 포함돼요. 성과급처럼 지급 여부와 금액이 실적에 따라 달라지면 포함 안 돼요. 매년 같은 시기에 비슷한 금액이 지급된다면 포함 대상이에요.",
    tip: "취업규칙·근로계약서에 상여금 지급 기준이 명시되어 있으면 더 확실해요",
  },
  {
    title: "연간 상여금 월 환산",
    desc: "연간 상여금 총액을 12로 나눠서 월 환산액을 구해요. 예를 들어 연 600만원이면 월 50만원으로 환산해요. 이 금액을 3개월 총임금에 더해서 평균임금을 계산해요.",
    tip: "분기별·명절 상여도 연간 합산 후 12로 나눠요",
  },
  {
    title: "평균임금 재계산",
    desc: "기본급 + 상여금 월 환산액 + 기타 고정수당을 합산한 게 실제 평균임금이에요. 회사가 기본급만 쓰고 상여금을 빠뜨렸다면 차액이 있어요. 차액을 계산해서 수정 청구를 할 수 있어요.",
    tip: "차액이 10만원 이상이면 고용노동부 진정 대상이에요",
  },
  {
    title: "수정 청구 또는 진정",
    desc: "먼저 인사팀에 상여금 포함 재계산을 요청해요. 거부하면 고용노동부에 진정을 내거나 소액심판을 청구할 수 있어요. 소멸시효 3년 이내라면 이미 퇴직한 후에도 청구 가능해요.",
    tip: "퇴직 후에도 3년 이내라면 청구 가능해요",
  },
];

const CHECKLIST = [
  "상여금 종류: 정기·일률·고정 지급인지 확인",
  "연간 총액 ÷ 12: 월 환산 포함",
  "급여명세서 3개월: 상여금 지급 내역 확인",
  "회사 재계산 요청: 먼저 인사팀 수정 요청",
  "거부 시 고용노동부 진정: 소멸시효 3년 이내",
];

const FAQS = [
  {
    q: "명절 상여금도 퇴직금 계산에 포함되나요?",
    a: "정기적으로 매년 같은 시기에 지급된다면 포함돼요. 추석·설날에 고정적으로 지급되는 상여금은 연간 총액으로 합산해서 12로 나눠 월 환산해요.",
  },
  {
    q: "성과급은 퇴직금에 포함되나요?",
    a: "원칙적으로는 포함 안 돼요. 성과에 따라 달라지는 변동 성과급은 고정성이 없어서 제외돼요. 하지만 일정 금액 이상을 무조건 지급하는 조건부 성과급은 통상임금으로 볼 수 있어요.",
  },
  {
    q: "회사가 상여금을 퇴직금에서 빼도 되나요?",
    a: "정기·일률·고정으로 지급된 상여금은 법적으로 포함해야 해요. 회사가 임의로 제외하면 근로기준법 위반이에요. 고용노동부에 진정을 낼 수 있어요.",
  },
  {
    q: "상여금 포함 시 퇴직금이 얼마나 더 나오나요?",
    a: "연 상여금 600만원(월 50만원)이고 근속 10년이면 500만원 차이가 나요. 상여금이 클수록, 근속기간이 길수록 차이가 커져요.",
  },
  {
    q: "이미 받은 퇴직금에 상여금이 빠졌으면 어떻게 하나요?",
    a: "퇴직 후 3년 이내라면 차액을 청구할 수 있어요. 내용증명 발송 후 인사팀에 재계산을 요구하거나, 고용노동부 진정·소액심판으로 받을 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제2조: 평균임금·통상임금 정의", url: "https://www.law.go.kr/법령/근로기준법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부: 통상임금 산정 지침", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-평균임금", title: "퇴직금 평균임금 계산 방법", description: "포함 항목과 산정 기준을 설명해요." },
  { slug: "퇴직금-계산법", title: "퇴직금 계산기", description: "월급·근속기간으로 금액 바로 확인해요." },
  { slug: "퇴직금-미지급-신고", title: "퇴직금 미지급 신고 방법", description: "회사가 안 줄 때 신고 절차예요." },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-상여금-포함" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 상여금 · 포함여부</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        상여금은 퇴직금 계산에 포함되나요?<br />
        포함 기준부터 월 환산 방법, 차액 청구까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금 계산할 때 상여금도 들어가는 건가요? 많은 분들이 헷갈려 하는 부분이에요.
        기본급만 보고 계산했다가 실제로 받아야 할 금액보다 적게 받는 경우가 꽤 있거든요.
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법</a>상 평균임금에는 정기적·일률적으로 지급된 상여금이 포함돼요.
        어떤 상여금이 포함되는지 기준부터, 월 환산 방법, 차액 청구 절차까지 전부 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>어떤 상여금이 퇴직금에 포함되나요?</H2>
      <p style={body}>
        퇴직금 계산의 기준이 되는 평균임금에는 퇴직 전 3개월 동안 지급된 임금 총액이 들어가요.
        여기서 핵심은 임금의 범위인데, <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제2조</a>는
        임금을 근로의 대가로 지급하는 금품으로 정의해요. 정기적으로 지급되는 상여금은 이 정의에 해당해요.
      </p>
      <p style={body}>
        판단 기준은 세 가지예요. 첫째, 정기성: 지급 시기가 정해져 있고 매년 반복되는지.
        둘째, 일률성: 모든 근로자 또는 일정 조건을 충족한 근로자에게 균일하게 지급되는지.
        셋째, 고정성: 지급 여부와 금액이 실적·평가에 따라 달라지지 않는지.
        이 세 가지를 갖추면 퇴직금 계산에 포함돼요.
      </p>
      <p style={body}>
        반대로 성과에 따라 금액이 크게 달라지는 변동형 성과급은 고정성이 없어서 제외될 수 있어요.
        단, 최소 XX만원은 무조건 지급 같은 하한선이 있는 성과급은 하한선 금액만큼은 고정성이 있다고 봐서 포함되기도 해요.
      </p>

      <GreenBox title="상여금 포함 여부 핵심 기준">
        정기·일률·고정 지급 상여금 → 퇴직금 계산에 포함<br />
        명절 상여, 분기 상여, 고정 성과급 하한선 → 포함<br />
        실적 변동 성과급, 특별 일회성 포상금 → 제외
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="상여금 포함 퇴직금을 계산할 준비가 됐어요. 아래 계산기로 차이를 확인해보세요."
        partialMatchText="조건 일부가 맞지 않을 수 있어요. 고용노동부(1350) 상담을 권해요."
      />

      <Divider />

      <H2>상여금 포함 시 퇴직금 차이 계산해보세요</H2>
      <p style={body}>
        기본급만으로 계산한 퇴직금과 상여금을 포함한 퇴직금은 생각보다 차이가 커요.
        연 상여금 600만원이면 월 50만원이 평균임금에 더해지고, 10년 근속 기준으로 500만원 이상 차이가 날 수 있죠.
        슬라이더를 조절해서 내 상황을 직접 계산해보세요.
      </p>

      <SectionBadge>상여금 포함 퇴직금 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 연간 상여금 ÷ 12로 월 환산한 금액이 월 평균임금에 합산돼요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>상여금 포함 확인에 필요한 서류</H2>
      <p style={body}>
        상여금이 퇴직금에 제대로 포함됐는지 확인하려면 먼저 서류를 챙겨야 해요.
        회사가 상여금을 포함했는지 여부를 직접 따지려면 실제 지급 내역과 회사 규정을 같이 봐야 해요.
      </p>
      <p style={body}>
        급여명세서는 최근 3개월치가 필수예요. 상여금이 별도 항목으로 표기됐는지, 기본급과 합산됐는지 구분해서 보세요.
        상여금 지급 규정이나 취업규칙에는 지급 시기, 지급률, 지급 조건이 나와 있어서 포함 여부를 판단하는 핵심 자료가 돼요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>상여금 포함 청구 절차 4단계</H2>
      <p style={body}>
        회사가 상여금을 빼고 퇴직금을 계산했다면 차액을 청구할 수 있어요.
        퇴직 전이라면 지급 전에 수정을 요청하고, 이미 퇴직했다면 3년 소멸시효 안에 청구하면 돼요.
      </p>
      <p style={body}>
        대부분은 인사팀에 정중하게 요청하면 재계산해줘요. 거부하는 경우에는
        <a href="/w/퇴직금-미지급-신고" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부 진정</a>이 가장 확실한 방법이에요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>상여금 포함 체크리스트</H2>
      <p style={body}>
        퇴직금을 받기 전에, 또는 이미 받은 퇴직금이 맞는지 점검할 때 이 체크리스트를 써보세요.
        연 상여금 600만원이고 10년 근속이라면 상여금 미포함 시 약 500만원을 덜 받는 셈이에요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="상여금 포함 시 퇴직금 차이 예시">
        연 상여금 600만원 (월 50만원 환산) × 근속 10년 = 약 500만원 차이<br />
        상여금이 클수록, 근속기간이 길수록 차이도 커져요.<br />
        소멸시효 3년 이내라면 퇴직 후에도 청구 가능해요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        상여금 포함 여부에 대해 실제로 자주 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법 및 근로자퇴직급여보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
