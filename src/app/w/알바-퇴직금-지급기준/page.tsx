"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "4주 평균 주 15시간 이상 근무했어요" },
  { id: "c2", label: "같은 사업장에서 1년 이상 계속 근무했어요" },
  { id: "c3", label: "근로소득(시급·일급·월급)을 받았어요" },
  { id: "c4", label: "퇴직 후 퇴직금을 받지 못했어요" },
];

const CALC_SLIDERS = [
  { id: "hourly", label: "시급", min: 10, max: 30, step: 1, defaultValue: 12, format: (v: number) => `${v}천원/시간` },
  { id: "hours", label: "주간 근무 시간", min: 15, max: 40, step: 1, defaultValue: 20, format: (v: number) => `주 ${v}시간` },
  { id: "months", label: "근속 개월 수", min: 12, max: 60, step: 1, defaultValue: 14, format: (v: number) => `${v}개월` },
];

const CALC_RESULTS = [
  {
    label: "월 평균임금 추정",
    getValue: (v: Record<string, number>) => Math.round(v.hourly * 1000 * v.hours * 4.3),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "퇴직금 예상액",
    getValue: (v: Record<string, number>) => {
      const monthly = Math.round(v.hourly * 1000 * v.hours * 4.3);
      return Math.round(monthly * (v.months / 12));
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "근로계약서 또는 근무 일지", required: true, where: "사업장에서 받거나 본인 보관" },
  { name: "급여 이체 내역 (통장 내역서)", required: true, where: "본인 통장 내역 출력" },
  { name: "신분증 (주민등록증 또는 운전면허증)", required: true, where: "본인 지참" },
  { name: "4대보험 가입 확인서 (해당 시)", required: false, where: "4대사회보험포털(4insure.or.kr)" },
  { name: "출퇴근 기록 또는 메시지 캡처", required: false, where: "카카오톡·문자 화면 캡처" },
];

const STEPS = [
  {
    title: "지급 요건 확인",
    desc: "4주 평균 주 15시간 이상 + 계속 근무 + 1년 이상이면 알바도 퇴직금 대상이에요(근로자퇴직급여보장법 제4조). 주 15시간 미만 단시간 근로자는 퇴직금 지급 의무 대상에서 빠져요.",
    tip: "주 15시간은 4주 평균이에요. 어떤 주는 20시간, 어떤 주는 10시간이어도 평균 15시간 이상이면 해당해요",
  },
  {
    title: "퇴직금 금액 계산",
    desc: "퇴직 전 3개월 평균임금을 계산하고, 1일 평균임금 × 30 × 근속연수로 산정해요. 주휴수당도 임금에 포함되기 때문에 실제 월 급여 기준으로 계산하세요.",
    tip: "위 계산기로 예상 금액을 먼저 파악한 뒤 청구하면 협상이 쉬워요",
  },
  {
    title: "사업주에게 서면 청구",
    desc: "문자나 카카오톡으로 퇴직금 지급을 요청해요. 퇴직 후 14일이 지급 기한이에요. 이미 14일이 지났다면 지연이자(연 20%)와 함께 청구할 수 있어요.",
    tip: "문자나 카카오톡으로 남기면 나중에 증거가 돼요. 구두 요청은 기록이 없어 불리해요",
  },
  {
    title: "미지급 시 노동청 신고",
    desc: "사업주가 거부하면 고용노동부(1350) 또는 사업장 관할 지방노동청에 진정을 내세요. 고용노동부 민원마당(minwon.moel.go.kr)에서 온라인으로도 신고할 수 있어요. 소멸시효 3년 내에 신고해야 해요.",
    tip: "5인 미만 소규모 사업장도 동일하게 처리돼요",
    link: { label: "온라인 신고하기", href: "https://minwon.moel.go.kr" },
  },
];

const CHECKLIST = [
  "주 15시간 이상 + 1년 이상 계속 근무: 알바도 퇴직금 대상",
  "5인 미만 소규모 사업장에도 동일하게 적용돼요",
  "14일 기한 초과 시: 지연이자(연 20%) 청구 가능",
  "근무 증거 보관: 통장 이체 내역·근로계약서·문자 메시지",
  "소멸시효 3년: 퇴직일로부터 3년 내에 청구해야 해요",
  "여러 매장 알바: 각 사업장별로 별도 계산·청구해야 해요",
];

const FAQS = [
  {
    q: "주 15시간 이상이면 무조건 퇴직금이 생기나요?",
    a: "1년 이상 계속 근무한 경우에 해당해요. 4주 평균 주 15시간 이상이어야 하고, 근속 기간도 1년을 채워야 해요. 하루 이틀 근무한 일용직 형태라면 계속성이 없어서 퇴직금이 없을 수 있어요.",
  },
  {
    q: "근로계약서가 없어도 퇴직금을 받을 수 있나요?",
    a: "받을 수 있어요. 통장 이체 내역, 카카오톡 메시지, 출퇴근 기록 등으로 근무 사실을 입증하면 돼요. 근로계약서가 없어도 실질적 근로 관계가 인정되면 퇴직금 청구가 가능해요.",
  },
  {
    q: "5인 미만 가게도 퇴직금을 줘야 하나요?",
    a: "맞아요. 퇴직금은 사업장 규모와 상관없이 적용돼요. 편의점, 카페, 작은 식당 등 5인 미만 소규모 사업장도 근로자퇴직급여보장법 적용 대상이에요.",
  },
  {
    q: "여러 매장에서 동시에 알바했는데 퇴직금은 어떻게 되나요?",
    a: "각 사업장별로 별도로 계산해요. A 편의점에서 14개월, B 카페에서 13개월 근무했다면 각각 퇴직금을 따로 청구해야 해요. 합산되지 않아요.",
  },
  {
    q: "퇴직한 지 1년이 됐는데 퇴직금을 받을 수 있나요?",
    a: "소멸시효 3년 이내라면 청구 가능해요. 내용증명을 보내거나 노동청에 진정을 내면 소멸시효가 중단돼요. 3년이 다 되어간다면 지금 바로 청구하세요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 제4조: 퇴직금 지급 요건", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "근로기준법 제18조: 단시간 근로자 기준 (주 15시간)", url: "https://www.law.go.kr/법령/근로기준법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부: 퇴직금 지급 기준 안내", url: "https://www.moel.go.kr" },
      { label: "고용노동부 민원마당: 퇴직금 신고", url: "https://minwon.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "알바-퇴직금", title: "알바 퇴직금 받는 방법", description: "청구 절차와 노동청 신고까지 정리했어요." },
  { slug: "퇴직금-조건", title: "퇴직금 받을 수 있는 조건", description: "1년·주 15시간 조건 완전 정리." },
  { slug: "퇴직금-계산-방법", title: "퇴직금 계산 방법", description: "평균임금 기준 계산 공식 안내." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="알바-퇴직금-지급기준" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 알바 · 지급기준</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        알바도 퇴직금 받을 수 있는 기준은?<br />
        주 15시간·1년 이상 조건과 청구 방법까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        알바도 <a href="/w/퇴직금-조건" style={{ color: "#1D9E75", textDecoration: "underline" }}>주 15시간 이상, 1년 이상 계속 근무</a>하면 퇴직금을 받을 수 있어요.
        5인 미만 소규모 사업장도 동일하게 적용돼요.
        퇴직 후 14일이 지나도 못 받았다면 <a href="/w/퇴직금-지연이자" style={{ color: "#1D9E75", textDecoration: "underline" }}>지연이자(연 20%)</a>와 함께 노동청에 신고할 수 있어요.
        조건·계산 방법·청구 절차까지 한 번에 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>알바 퇴직금 지급 기준, 어떤 경우에 해당하나요?</H2>
      <p style={body}>
        조건은 두 가지예요. 4주 평균 주 15시간 이상 근무 + 같은 사업장에서 1년 이상 계속 근무예요.
        주 15시간 미만 단시간 근로자는 퇴직금 지급 의무 대상에서 제외돼요.
        하지만 주 15시간을 조금만 넘어도 조건을 충족해요.
      </p>
      <p style={body}>
        근로계약서가 없어도 괜찮아요. 통장 이체 내역, 카카오톡 메시지, 출퇴근 기록으로 근무 사실을 입증하면 퇴직금 청구가 가능해요.
        "알바는 퇴직금 없어요"라고 해도 조건을 충족하면 법으로 보장된 권리예요.
      </p>

      <GreenBox title="알바 퇴직금 지급 조건 (근로자퇴직급여보장법 제4조)">
        ① 4주 평균 주 15시간 이상 근무<br />
        ② 같은 사업장에서 1년 이상 계속 근무<br />
        → 두 조건 충족 시 사업장 규모와 무관하게 지급 의무 발생
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="알바 퇴직금 지급 대상이에요. 아래 계산기로 예상 금액을 확인해보세요."
        partialMatchText="조건 충족 여부에 따라 다를 수 있어요. 고용노동부(1350) 상담을 권해요."
      />

      <Divider />

      <H2>알바 퇴직금 계산법, 얼마나 받나요?</H2>
      <p style={body}>
        퇴직금은 퇴직 전 3개월 평균임금을 기준으로 계산해요.
        1일 평균임금 × 30일 × 근속연수가 퇴직금이에요.
        주휴수당도 임금에 포함되기 때문에 실제 수령 급여 기준으로 계산해야 해요.
      </p>

      <SectionBadge>알바 퇴직금 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 주간 근무 시간 × 시급 × 4.3주 기준 월 임금 추정치. 실제 퇴직금은 평균임금 × 근속일수 ÷ 365로 계산해요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>퇴직금 청구에 필요한 서류</H2>
      <p style={body}>
        근로계약서가 없어도 통장 이체 내역만 있으면 충분한 경우가 많아요.
        증거가 많을수록 청구가 쉬워지니 지금 바로 캡처해두세요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <BorderBox title="증거가 없을 때 활용할 수 있는 방법">
        고용노동부 민원마당(minwon.moel.go.kr)에서 진정을 제기하면<br />
        근로감독관이 사업장을 조사해 근무 사실을 확인해줘요.
      </BorderBox>

      <Divider />

      <H2>알바 퇴직금 청구 4단계</H2>
      <p style={body}>
        지급 요건 확인 → 금액 계산 → 사업주에게 청구 → 미지급 시 노동청 신고 순서예요.
        대부분은 3단계에서 해결돼요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>퇴직금 청구 전 체크리스트</H2>
      <p style={body}>
        소멸시효 3년을 놓치지 않는 게 가장 중요해요. 지금 바로 청구 준비를 시작하세요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="여러 매장에서 알바했다면 각각 청구해요">
        각 사업장별로 별도 계산이고, 별도 청구해야 해요.<br />
        한 매장에서만 1년 이상 일했다면 그 사업장에만 청구하면 돼요.
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
