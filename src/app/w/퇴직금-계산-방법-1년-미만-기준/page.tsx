"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "주 15시간 이상 근무했어요" },
  { id: "c2", label: "근무 기간이 1년 미만이에요" },
  { id: "c3", label: "회사 취업규칙이나 계약서에 비례 지급 조항이 있어요" },
  { id: "c4", label: "최근 3개월 급여명세서를 보관하고 있어요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "월 평균임금", min: 150, max: 500, step: 10, defaultValue: 250, format: (v: number) => `${v}만원` },
  { id: "months", label: "근무 기간", min: 1, max: 11, step: 1, defaultValue: 8, format: (v: number) => `${v}개월` },
];

const CALC_RESULTS = [
  {
    label: "예상 퇴직금 (비례 계산)",
    getValue: (v: Record<string, number>) => Math.round(v.salary * 10000 * v.months / 12),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "참고: 1년 근무 시 퇴직금",
    getValue: (v: Record<string, number>) => Math.round(v.salary * 10000),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "근로계약서", required: true, where: "인사팀 또는 입사 시 수령본" },
  { name: "취업규칙 (비례 지급 조항 확인용)", required: true, where: "회사 인사팀 요청" },
  { name: "급여명세서 최근 3개월분", required: true, where: "회사 인사팀 또는 인사시스템" },
  { name: "퇴직확인서", required: false, where: "회사 인사팀 요청" },
];

const STEPS = [
  {
    title: "비례 지급 조항 확인",
    desc: "취업규칙이나 근로계약서에 1년 미만도 비례 지급 조항이 있는지 먼저 확인해요. 없으면 법정 의무가 없어요. 조항이 있으면 회사는 반드시 지급해야 해요.",
    tip: "취업규칙은 고용노동부 전자민원에서 신청 가능",
  },
  {
    title: "평균임금 산정",
    desc: "퇴직 전 3개월 임금 총액을 해당 기간 일수로 나눠요. 기본급뿐 아니라 상여금(월 환산)과 고정수당도 포함해야 정확해요. 예: 3개월 총임금 750만원, 91일 → 1일 평균임금 82,418원이에요.",
    tip: "상여금은 연간 총액 ÷ 12로 월 환산해서 포함",
  },
  {
    title: "근무 일수로 계산",
    desc: "공식은 1일 평균임금 × 30일 × (재직일수 ÷ 365)예요. 예를 들어 240일 근무, 1일 평균임금 82,418원이면 → 82,418 × 30 × (240 ÷ 365) ≒ 162만원이에요.",
    tip: "재직일수는 입사일부터 퇴직일까지 달력상 일수",
  },
  {
    title: "회사에 서면으로 청구",
    desc: "비례 지급 근거(취업규칙 조항)를 적시해 이메일이나 내용증명으로 청구해요. 구두 요청은 나중에 증거가 안 돼요. 청구 후 14일 이내 미지급 시 지연이자(연 20%)를 청구할 수 있어요.",
    tip: "소멸시효 3년: 퇴직 후 3년 안에 청구해야 해요",
  },
];

const CHECKLIST = [
  "취업규칙·계약서에서 비례 지급 조항 확인",
  "최근 3개월 급여명세서 확보 (상여금·수당 포함)",
  "재직일수 정확히 계산 (입사일~퇴직일)",
  "회사에 서면(이메일·내용증명)으로 청구",
  "14일 이내 미지급 시 고용노동부(1350) 진정",
];

const FAQS = [
  {
    q: "법적으로 1년 미만 근무자는 퇴직금을 못 받나요?",
    a: "근로자퇴직급여보장법상 1년 미만 근무자는 법정 퇴직금 대상이 아니에요. 취업규칙이나 근로계약서에 별도 규정이 있으면 받을 수 있어요.",
  },
  {
    q: "11개월 29일 일하고 퇴직하면 정말 0원인가요?",
    a: "법정 기준으로는 그래요. 회사 규정에 비례 지급 조항이 있다면 근무 일수만큼 계산해서 받을 수 있어요.",
  },
  {
    q: "수습 기간도 근속기간에 포함되나요?",
    a: "포함돼요. 수습이든 시용이든 실제로 일하고 임금을 받았다면 근속기간에 들어가요. 회사가 수습은 제외라고 해도 법적으로 효력이 없어요.",
  },
  {
    q: "계약직 11개월 근무 후 재계약 없이 종료되면?",
    a: "1년 미만이면 법정 퇴직금 대상은 아니에요. 이전에 같은 회사에서 근무한 기간이 이어진다면 합산할 수 있어요.",
  },
  {
    q: "1년 미만 퇴직금을 주겠다던 회사가 안 주면?",
    a: "근로계약서나 취업규칙에 명시되어 있다면 계약 위반이에요. 고용노동부(1350)에 진정을 넣을 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 제4조: 퇴직급여 지급 의무", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "근로기준법 제2조: 평균임금의 정의", url: "https://www.law.go.kr/법령/근로기준법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부: 퇴직금 FAQ", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-1년미만", title: "1년 미만 퇴직금, 받을 수 있는 경우", description: "법정 기준과 예외 조건을 정리했어요." },
  { slug: "퇴직금-계산-방법", title: "퇴직금 계산 방법, 공식과 실제 사례", description: "평균임금 기준 단계별 계산법이에요." },
  { slug: "퇴직금-미지급-신고", title: "퇴직금 미지급 신고 방법", description: "14일 이내 미지급 시 지연이자 청구법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-계산-방법-1년-미만-기준" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 1년미만 · 계산법</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        1년 미만 퇴직금 계산, 정확한 방법은?<br />
        회사 규정 확인부터 비례 계산 공식까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "11개월 일했는데 퇴직금이 0원이라고요?" 법적으로는 맞아요.
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법</a>은 1년 이상 근무한 근로자에게만 퇴직금 지급 의무를 두고 있어요.
        그런데 회사 취업규칙이나 근로계약서에 1년 미만도 비례 지급 조항이 있다면 이야기가 달라져요.
        청구 방법까지 차근차근 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>1년 미만 퇴직금을 받을 수 있는 조건인지 확인해보세요</H2>
      <p style={body}>
        법정 퇴직금은 1년 이상 + 주 15시간 이상 근무자에게만 의무예요. 1년 미만이라도 취업규칙이나 근로계약서에
        비례 지급 조항이 있으면 회사는 반드시 지급해야 해요.
        조항 없이 회사가 자발적으로 주겠다고 했어도, 이메일·문자 등 증거가 있으면 청구 가능해요.
      </p>
      <p style={body}>
        주 15시간 미만 초단시간 근로자는 아무리 오래 일해도 퇴직금이 발생하지 않아요.
        0원이라고 들었는데 의문이 든다면, 근로계약서와 취업규칙을 다시 살펴보세요.
      </p>

      <GreenBox title="1년 미만 퇴직금 수령 조건">
        법정 의무: 1년 이상 + 주 15시간 이상만 해당<br />
        예외 가능: 취업규칙·계약서에 비례 지급 조항이 있을 때<br />
        계산 공식: 1일 평균임금 × 30일 × (재직일수 ÷ 365)
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="비례 지급 조항이 있다면 퇴직금을 청구할 수 있어요. 아래 계산기로 예상 금액을 확인해보세요."
        partialMatchText="일부 조건만 해당돼요. 근로계약서와 취업규칙을 먼저 확인해보세요."
      />

      <Divider />

      <H2>1년 미만 비례 퇴직금 예상 금액 계산</H2>
      <p style={body}>
        월 평균임금과 근무 기간을 입력하면 비례 계산된 예상 퇴직금을 확인할 수 있어요.
        여기서 월 평균임금은 기본급만이 아니라 상여금 월 환산과 고정수당도 포함한 금액이에요.
      </p>
      <p style={body}>
        예를 들어 월 250만원을 받고 8개월 근무했다면 약 166만원이 나와요.
        정확한 금액은 실제 급여명세서 3개월치로 평균임금을 산정해야 해요.
      </p>

      <SectionBadge>비례 퇴직금 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 1년 미만은 법정 의무 대상 아님. 취업규칙에 비례 지급 조항이 있을 때만 적용돼요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>청구에 필요한 서류</H2>
      <p style={body}>
        비례 지급 청구를 위해선 조항의 존재를 증명해야 해요.
        취업규칙과 급여명세서가 핵심이에요. 퇴직 후엔 회사가 서류 제공을 거부할 수 있으니 재직 중에 챙겨두세요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>1년 미만 퇴직금 청구 절차 4단계</H2>
      <p style={body}>
        비례 지급 조항 확인부터 서면 청구까지 4단계로 진행해요.
        서면 기록을 남기는 게 가장 중요해요. 구두로만 요청하면 나중에 증거가 없어요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>청구 전 체크리스트</H2>
      <p style={body}>
        하나라도 놓치면 손해 볼 수 있어요. 소멸시효 3년이 지나면 청구권이 사라지니 빠르게 움직여야 해요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="소멸시효 3년, 퇴직 후 꼭 챙기세요">
        퇴직금 청구권은 퇴직일로부터 3년이 지나면 소멸해요.<br />
        금액이 크지 않다면 소액사건심판(3,000만원 이하)을 이용하면 비용과 시간을 아낄 수 있어요.<br />
        내용증명 발송만으로도 6개월 시효 중단 효과가 있어요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        1년 미만 퇴직금 계산에 관해 자주 나오는 질문이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
