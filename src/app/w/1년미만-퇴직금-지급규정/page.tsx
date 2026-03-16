"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "근속 기간이 1년 미만이에요" },
  { id: "c2", label: "주 15시간 이상 계속 근무했어요" },
  { id: "c3", label: "정규직·계약직·아르바이트 중 하나예요" },
  { id: "c4", label: "퇴직금을 못 받고 그냥 나온 경우예요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "월 평균임금", min: 200, max: 600, step: 10, defaultValue: 240, format: (v: number) => `${v}만원` },
  { id: "days", label: "실제 근속 일수", min: 30, max: 364, step: 1, defaultValue: 240, format: (v: number) => `${v}일` },
];

const CALC_RESULTS = [
  {
    label: "퇴직금 (일할 계산 기준)",
    getValue: (v: Record<string, number>) => Math.round(v.salary * 10000 * v.days / 365),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "1년 만근 시 퇴직금 (비교)",
    getValue: (v: Record<string, number>) => Math.round(v.salary * 10000),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "근로계약서 (입사일·임금·근로 시간 확인)", required: true, where: "회사 인사팀 또는 입사 시 수령본" },
  { name: "급여명세서 또는 통장 이체 내역", required: true, where: "회사 인사팀 또는 본인 통장" },
  { name: "출퇴근 기록 (가능하다면)", required: false, where: "회사 출근부·카드 기록·메시지 등" },
  { name: "4대보험 가입 확인서", required: false, where: "국민건강보험공단 또는 4대사회보험포털" },
];

const STEPS = [
  {
    title: "지급 요건 확인",
    desc: "1년 미만이어도 4주 평균 주 15시간 이상 + 계속 근무 두 가지 조건을 충족하면 퇴직금을 받을 수 있어요(근로자퇴직급여보장법 제4조). 주 15시간 미만 단시간 근로자는 적용 제외예요.",
    tip: "일용직처럼 매일 계약이 바뀌는 방식이 아니어야 해요",
  },
  {
    title: "퇴직금 계산",
    desc: "1년 미만 퇴직금은 근속일수 ÷ 365 × 1년 퇴직금으로 일할 계산해요. 퇴직 전 3개월 평균임금 × 30일 = 1년치 기준이고, 여기에 근속 비율을 곱해요. 정확히는 실제 달력 일수를 세야 해요.",
    tip: "예: 월급 240만원, 240일 근무 → 240만 × 240/365 ≈ 158만원",
  },
  {
    title: "회사에 청구",
    desc: "퇴직일로부터 14일 이내에 청구하는 게 원칙이에요. 300만원 초과 시 IRP로만 수령 가능해요. 서면(문자·메일)으로 청구 기록을 남겨두면 나중에 분쟁 시 유리해요.",
    tip: "300만원 이하라면 일반 계좌로도 받을 수 있어요",
  },
  {
    title: "미지급 시 노동청 신고",
    desc: "14일이 지나도 받지 못하면 고용노동부(1350) 또는 노동청에 진정을 내세요. 지연이자(연 20%)도 함께 청구 가능해요. 소멸시효 3년 내에 신고해야 해요.",
    tip: "온라인 신고: minwon.moel.go.kr",
  },
];

const CHECKLIST = [
  "주 15시간 이상 계속 근무 — 두 조건 동시 충족 시 퇴직금 발생",
  "일할 계산 — 근속일수 ÷ 365 × 1년 퇴직금",
  "300만원 초과 시 IRP 수령 필수",
  "14일 기한 — 초과 시 지연이자(연 20%) 청구 가능",
  "소멸시효 3년 — 퇴직일로부터 3년 내 청구",
];

const FAQS = [
  {
    q: "1년 미만이면 퇴직금이 얼마나 되나요?",
    a: "근속일수 ÷ 365 × 1년치 퇴직금이에요. 예: 월급 240만원에 6개월(180일) 근무했다면 240만원 × 180/365 ≈ 118만원이에요.",
  },
  {
    q: "3개월만 일했어도 퇴직금이 있나요?",
    a: "주 15시간 이상 계속 근무했다면 있어요. 퇴직금 = 월급 × 90일/365로 계산해요. 금액은 적지만 법적 권리예요.",
  },
  {
    q: "1년 미만 퇴직금도 IRP로 받아야 하나요?",
    a: "300만원이 초과할 때만 IRP로 받아야 해요. 1년 미만 퇴직금은 대부분 300만원 이하라서 일반 계좌로도 받을 수 있는 경우가 많아요.",
  },
  {
    q: "사장님이 1년 안 됐으니 퇴직금 없다고 하면?",
    a: "주 15시간 이상 계속 근무 조건을 충족했다면 고용노동부(1350)에 신고하면 돼요. 법정 의무라서 사업주가 거부할 수 없어요.",
  },
  {
    q: "소멸시효는 얼마나 되나요?",
    a: "퇴직일로부터 3년이에요. 이미 퇴직한 지 2년이 됐다면 빨리 청구하세요. 내용증명이나 노동청 진정을 하면 소멸시효가 중단돼요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 제4조 — 퇴직금 지급 요건", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "근로기준법 제18조 — 단시간 근로자 기준 (주 15시간)", url: "https://www.law.go.kr/법령/근로기준법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 — 퇴직금 지급 기준 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-1년미만", title: "퇴직금 1년 미만 지급 기준", description: "일할 계산 방법을 자세히 설명해요." },
  { slug: "알바-퇴직금", title: "알바 퇴직금 받는 방법", description: "주 15시간 기준과 청구 방법을 설명해요." },
  { slug: "계약직-퇴직금", title: "계약직 퇴직금 지급 기준", description: "계약 만료 시 퇴직금 수령 방법." },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="1년미만-퇴직금-지급규정" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 1년미만 · 지급규정</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        1년 미만 근무 시 퇴직금 지급 규정은?<br />
        주 15시간 조건과 일할 계산 방법 정리
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        근속 기간이 1년이 안 됐어도 <a href="/w/퇴직금-조건" style={{ color: "#1D9E75", textDecoration: "underline" }}>주 15시간 이상 계속 근무</a> 조건을 충족하면 퇴직금을 받을 수 있어요.
        금액은 1년 만근 퇴직금을 실제 근속일수로 일할 계산한 값이에요.
        "1년 안 됐으니 퇴직금 없다"는 말은 법적으로 틀렸어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>1년 미만 퇴직금, 어떤 규정이 적용되나요?</H2>
      <p style={body}>
        근로자퇴직급여보장법 제4조는 '계속 근로 1년 이상'을 지급 기준으로 규정하면서도, 1년 미만이라도 퇴직금 발생 자체를 막지 않아요.
        주 15시간 이상 계속 근무한 근로자는 1일이라도 근무 후 퇴직하면 일할 계산 퇴직금이 발생해요.
        다만 주 15시간 미만 단시간 근로자는 퇴직금 대상에서 제외돼요.
      </p>
      <p style={body}>
        정규직·계약직·아르바이트 구분 없이 동일하게 적용돼요.
        5인 미만 소규모 사업장도 마찬가지예요.
      </p>

      <GreenBox title="1년 미만 퇴직금 지급 규정">
        조건: 주 15시간 이상 + 계속 근무<br />
        금액: 1년 만근 퇴직금 × 실제 근속일수 ÷ 365<br />
        사업장 규모 무관 적용 (근로자퇴직급여보장법 제4조)
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="1년 미만이어도 퇴직금 지급 대상이에요. 아래 계산기로 예상 금액을 확인하세요."
        partialMatchText="조건 충족 여부에 따라 다를 수 있어요. 고용노동부(1350) 상담을 권해요."
      />

      <Divider />

      <H2>1년 미만 퇴직금 계산해보세요</H2>
      <p style={body}>
        월 평균임금과 실제 근속 일수를 입력하면 퇴직금 예상액을 바로 확인할 수 있어요.
        1년 만근 시 퇴직금과 비교해서 일할 계산한 금액이에요.
      </p>

      <SectionBadge>1년 미만 퇴직금 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 일할 계산: 월급 × 근속일수 ÷ 365. 300만원 초과 시 IRP 필수."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>청구에 필요한 서류</H2>
      <p style={body}>
        근로계약서와 급여 이체 내역으로 근속 기간과 임금을 입증해야 해요.
        재직 중에 챙겨두지 못했다면 통장 이체 내역으로도 가능해요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>1년 미만 퇴직금 수령 4단계</H2>
      <p style={body}>
        지급 요건 확인 → 금액 계산 → 회사 청구 → 미지급 시 신고 순서예요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>퇴직금 청구 체크리스트</H2>
      <p style={body}>
        소멸시효 3년을 놓치지 마세요. 지금 바로 청구 준비를 시작하세요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="1년 안 됐어도 퇴직금은 있어요">
        주 15시간 이상 계속 근무했다면 법으로 보장된 권리예요.<br />
        "1년 안 됐으니 없다"는 말에 속지 마세요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        1년 미만 퇴직금 지급 규정에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법과 근로기준법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
