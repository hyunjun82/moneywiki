"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "주 15시간 이상 근무했어요" },
  { id: "c2", label: "4주(한 달) 이상 같은 사업장에서 일했어요" },
  { id: "c3", label: "근로계약서를 작성했거나 급여를 통장으로 받았어요" },
  { id: "c4", label: "퇴직금을 못 받고 그냥 그만뒀어요" },
];

const CALC_SLIDERS = [
  { id: "hourly", label: "시급", min: 10, max: 30, step: 1, defaultValue: 12, format: (v: number) => `${v}천원/시간` },
  { id: "months", label: "근속 개월 수 (1개월 이상)", min: 1, max: 36, step: 1, defaultValue: 14, format: (v: number) => `${v}개월` },
];

const CALC_RESULTS = [
  {
    label: "월 임금 (주 15시간 × 4.3주)",
    getValue: (v: Record<string, number>) => Math.round(v.hourly * 1000 * 15 * 4.3),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "퇴직금 예상액 (근속 개월 기준)",
    getValue: (v: Record<string, number>) => {
      const monthly = Math.round(v.hourly * 1000 * 15 * 4.3);
      return Math.round(monthly * v.months / 12);
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "근로계약서 또는 근무 일지", required: true, where: "사업장에서 받거나 본인 보관" },
  { id: "d2", name: "급여 이체 내역 (통장)", required: true, where: "본인 통장 내역서" },
  { name: "4대보험 가입 확인서 (있으면)", required: false, where: "국민건강보험공단 또는 4대사회보험포털" },
  { name: "출퇴근 기록 (카카오톡 등)", required: false, where: "메시지·사진 캡처 등" },
];

const STEPS = [
  {
    title: "퇴직금 지급 요건 확인",
    desc: "주 15시간 이상 + 4주 이상 같은 사업장에서 계속 근무했다면 알바도 퇴직금 대상이에요(근로자퇴직급여보장법 제4조). 주 15시간 미만 단시간 근로자는 퇴직금 지급 의무가 없어요.",
    tip: "4주 평균 주 15시간이에요 — 어떤 주는 20시간, 어떤 주는 10시간이어도 평균 15시간 이상이면 해당",
  },
  {
    title: "퇴직금 계산",
    desc: "퇴직 전 3개월 평균임금을 계산하고, 1일 평균임금 × 30 × 근속연수로 퇴직금을 산정해요. 1년 미만이면 일할 계산해요. 예: 시급 1만2천원, 주 20시간, 14개월 근속이면 약 월 100만원 × 14/12 = 약 117만원이에요.",
    tip: "주휴수당도 임금에 포함되니 월 급여 계산 시 포함하세요",
  },
  {
    title: "사장님에게 청구",
    desc: "사업주에게 퇴직금 지급을 서면이나 문자로 요청해요. 퇴직 후 14일 이내가 지급 기한이에요. 이미 지났다면 지연이자(연 20%)와 함께 청구할 수 있어요.",
    tip: "문자나 카카오톡으로 남기면 나중에 증거가 돼요",
  },
  {
    title: "미지급 시 노동청 신고",
    desc: "사업주가 거부하면 고용노동부(1350) 또는 사업장 관할 지방노동청에 진정을 내세요. 온라인 신고도 가능해요(minwon.moel.go.kr). 소멸시효 3년 내에 신고해야 해요.",
    tip: "소규모 사업장이어도 처리 가능해요 — 5인 미만도 퇴직금 대상",
  },
];

const CHECKLIST = [
  "주 15시간 이상 + 계속 근무 — 알바도 퇴직금 대상",
  "5인 미만 소규모 사업장도 동일 적용",
  "14일 기한 초과 — 지연이자(연 20%) 청구 가능",
  "근무 증거 — 통장 이체 내역·근로계약서·문자 보관",
  "소멸시효 3년 — 퇴직일로부터 3년 내에 청구",
];

const FAQS = [
  {
    q: "주 15시간 이상이면 무조건 퇴직금이 생기나요?",
    a: "4주 이상 계속 근무한 경우에 해당해요. 4주 평균 주 15시간 이상이면 조건을 충족해요. 하루 이틀 근무 후 그만두는 일용직 형태라면 계속성이 없어서 퇴직금이 없을 수 있어요.",
  },
  {
    q: "근로계약서가 없어도 퇴직금을 받을 수 있나요?",
    a: "받을 수 있어요. 통장 이체 내역, 카카오톡 메시지, 출퇴근 기록 등으로 근무 사실을 입증하면 돼요. 근로계약서가 없어도 실질적으로 근로 관계가 인정되면 퇴직금 청구가 가능해요.",
  },
  {
    q: "5인 미만 작은 가게도 퇴직금을 줘야 하나요?",
    a: "맞아요. 퇴직금은 사업장 규모와 상관없이 적용돼요. 편의점, 카페, 작은 식당 등 5인 미만 소규모 사업장도 근로자퇴직급여보장법 적용 대상이에요.",
  },
  {
    q: "알바로 받는 퇴직금은 얼마나 되나요?",
    a: "시급 1만2천원, 주 20시간, 14개월 근무한 경우 약 117만원 수준이에요. 주 15시간 최소 기준이면 이보다 적어요. 정확한 금액은 실제 근속일수와 평균임금으로 계산해야 해요.",
  },
  {
    q: "이미 퇴직한 지 1년이 됐는데 퇴직금을 받을 수 있나요?",
    a: "소멸시효 3년 이내라면 청구 가능해요. 내용증명을 보내거나 노동청에 진정을 내면 소멸시효가 중단돼요. 3년이 다 되어간다면 지금 바로 청구하세요.",
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
  { slug: "알바-퇴직금", title: "알바 퇴직금 받는 방법", description: "알바 퇴직금 계산부터 청구까지 정리했어요." },
  { slug: "퇴직금-1년미만", title: "1년 미만 퇴직금 계산", description: "일할 계산 방법을 자세히 설명해요." },
  { slug: "퇴직금-미지급-신고", title: "퇴직금 미지급 신고 방법", description: "노동청 진정 절차를 단계별로 안내해요." },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="알바-퇴직금-지급기준" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 알바 · 지급기준</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        알바도 퇴직금 받을 수 있는 기준은?<br />
        주 15시간·계속 근무 조건과 청구 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        알바도 <a href="/w/퇴직금-조건" style={{ color: "#1D9E75", textDecoration: "underline" }}>주 15시간 이상, 계속 근무</a> 조건을 충족하면 퇴직금을 받을 수 있어요.
        5인 미만 소규모 사업장도 동일하게 적용돼요.
        퇴직 후 14일이 지나도 못 받았다면 <a href="/w/퇴직금-지연이자" style={{ color: "#1D9E75", textDecoration: "underline" }}>지연이자(연 20%)</a>와 함께 노동청에 신고할 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>알바 퇴직금, 어떤 경우에 받을 수 있나요?</H2>
      <p style={body}>
        조건은 간단해요. 4주 평균 주 15시간 이상 + 계속 근무(같은 사업장에서 반복 고용)예요.
        주 15시간 미만 단시간 근로자는 퇴직금 지급 의무 대상에서 제외돼요.
        하지만 주 15시간을 조금만 넘어도 조건을 충족해요.
      </p>
      <p style={body}>
        근로계약서가 없어도 괜찮아요. 통장 이체 내역, 카카오톡 메시지, 출퇴근 기록 등으로 근무 사실을 입증하면 퇴직금 청구가 가능해요.
        사업장 규모가 작아도, 사장님이 "알바는 퇴직금 없어요"라고 해도, 조건을 충족하면 법으로 보장된 권리예요.
      </p>

      <GreenBox title="알바 퇴직금 지급 조건">
        ① 4주 평균 주 15시간 이상 근무<br />
        ② 계속 근무 (일용직 제외)<br />
        → 두 조건 충족 시 사업장 규모 무관 지급 의무
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="알바 퇴직금 지급 대상이에요. 아래 계산기로 예상 금액을 확인하세요."
        partialMatchText="조건 충족 여부에 따라 다를 수 있어요. 고용노동부(1350) 상담을 권해요."
      />

      <Divider />

      <H2>알바 퇴직금 예상액 계산</H2>
      <p style={body}>
        시급과 근속 개월 수를 입력하면 월 임금과 퇴직금 예상액을 바로 확인할 수 있어요.
        주휴수당을 포함한 실제 월 임금 기준으로 계산하면 더 정확해요.
      </p>

      <SectionBadge>알바 퇴직금 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 주 15시간 기준 월 임금 × 근속 비율. 실제 퇴직금은 평균임금 × 근속일수 ÷ 365로 계산해요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>청구에 필요한 서류</H2>
      <p style={body}>
        근로계약서가 없어도 통장 이체 내역만 있어도 충분한 경우가 많아요.
        증거가 많을수록 청구가 쉬워지니 지금 당장 캡처해두세요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>알바 퇴직금 청구 4단계</H2>
      <p style={body}>
        지급 요건 확인 → 금액 계산 → 사장님에게 청구 → 미지급 시 노동청 신고 순서예요.
        대부분 3단계에서 해결돼요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>퇴직금 청구 체크리스트</H2>
      <p style={body}>
        소멸시효 3년을 놓치지 않는 게 가장 중요해요. 지금 바로 청구 준비를 시작하세요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="알바 퇴직금은 포기하지 마세요">
        "알바는 퇴직금이 없어요"는 틀린 말이에요.<br />
        주 15시간 이상 계속 근무했다면 법으로 보장된 권리예요. 모르고 포기하는 경우가 많아요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        알바 퇴직금 지급 기준에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법과 근로기준법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
