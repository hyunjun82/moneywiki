"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR, 퇴직금_HIGHLIGHT } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직일로부터 14일이 지났는데 퇴직금이 아직 안 들어왔어요" },
  { id: "c2", label: "사업주와 서면으로 지급 기한 연장 합의를 한 적 없어요" },
  { id: "c3", label: "1년 이상 주 15시간 이상 근무한 근로자예요" },
  { id: "c4", label: "퇴직일로부터 아직 3년이 지나지 않았어요" },
];

const CALC_SLIDERS = [
  { id: "amount", label: "미지급 퇴직금 (만원)", min: 50, max: 5000, step: 50, defaultValue: 500, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "days", label: "14일 초과 지연 일수", min: 1, max: 365, step: 1, defaultValue: 30, format: (v: number) => `${v.toLocaleString()}일` },
];

const CALC_RESULTS = [
  {
    label: "지연이자 (연 20%)",
    getValue: (v: Record<string, number>) => Math.round(v.amount * 10000 * 0.20 * v.days / 365),
    format: (v: number) => v < 10000 ? `${v.toLocaleString()}원` : `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "총 청구 금액 (퇴직금 + 지연이자)",
    getValue: (v: Record<string, number>) => Math.round(v.amount * 10000 + v.amount * 10000 * 0.20 * v.days / 365),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "근로계약서 또는 재직증명서", required: true, where: "사업주 발급 또는 고용24 이력 조회" },
  { name: "급여명세서 (최근 3개월)", required: true, where: "사업주 발급 또는 통장 거래내역" },
  { name: "퇴직 확인서 또는 사직서 사본", required: true, where: "회사 인사팀" },
  { name: "지급 요청 기록 (문자·이메일 캡처)", required: false, where: "본인 직접 보관" },
  { name: "내용증명 발송 사본", required: false, where: "우체국 발송 후 보관" },
];

const STEPS = [
  {
    title: "퇴직일 기준 14일 경과 날짜 확인",
    desc: "퇴직일 다음 날부터 세어 14일째 자정까지가 법정 기한이에요. 공휴일과 주말도 기한에 포함돼요. 3월 1일 퇴직이라면 3월 15일이 마감이에요.",
    tip: "당사자 간 서면 합의가 없으면 예외 없이 적용돼요.",
  },
  {
    title: "문자·메일로 지급 요청 (날짜 명시)",
    desc: "'○월 ○일 기준 14일 경과, 퇴직금 및 지연이자 지급 요청드립니다'라고 날짜를 명시해서 보내요. 구두 요청은 증거가 안 되니 반드시 기록을 남겨요.",
    tip: "문자나 이메일은 날짜·금액을 구체적으로 적어야 증거로 인정돼요.",
  },
  {
    title: "내용증명 발송",
    desc: "무응답이거나 지급을 거부하면 지연이자를 포함한 청구금액을 명시한 내용증명을 발송해요. 공식 발송 기록이 이후 노동청 신고와 소송에서 사전 청구 증거가 돼요.",
    tip: "인터넷 우체국(epost.go.kr)에서 온라인 발송 가능해요.",
    link: { label: "인터넷 우체국 내용증명", href: "https://www.epost.go.kr" },
  },
  {
    title: "고용노동부 임금체불 진정 접수",
    desc: "내용증명 발송 후에도 지급하지 않으면 사업장 관할 지방고용노동청에 진정을 접수해요. 진정 시 '지연이자 연 20% 청구'를 명시해야 이자도 함께 처리돼요.",
    tip: "고용24(work.go.kr)에서 온라인으로 진정 접수 가능해요.",
    link: { label: "고용24 온라인 진정 접수", href: "https://www.work.go.kr" },
  },
];

const CHECKLIST = [
  "퇴직일 다음 날부터 14일째 날짜 정확히 계산",
  "지급 요청 문자·이메일 발송 후 캡처로 보관",
  "내용증명에 지연이자 금액(연 20%)을 명시해서 청구",
  "노동청 진정 시 '지연이자 청구' 항목 별도 기재",
  "소멸시효 3년: 퇴직일 기준 3년 안에 청구해야 해요",
];

const FAQS = [
  {
    q: "14일 기한을 넘기면 지연이자가 자동으로 붙나요?",
    a: "자동 발생해요. 근로기준법 제37조에 따라 14일이 지난 다음 날부터 연 20%가 하루하루 쌓여요. 단, 사업주가 자발적으로 주지 않으니 진정이나 소송에서 명시적으로 청구해야 실제로 받을 수 있어요.",
  },
  {
    q: "사업주가 '돈이 없다'고 하면 지연이자가 면제되나요?",
    a: "안 돼요. 사업주의 재정 상황과 무관하게 14일이 지나면 지연이자 의무가 생겨요. 자금 사정은 법적 면제 사유가 아니에요.",
  },
  {
    q: "지연이자 계산식이 뭔가요?",
    a: "미지급 퇴직금 × 연 20% ÷ 365 × 지연 일수예요. 예를 들어 500만원을 30일 지연하면 약 8만 2천원이에요. 지연 일수가 늘어날수록 금액이 커져요.",
  },
  {
    q: "회사가 폐업해서 사업주를 찾을 수 없어요.",
    a: "체당금 제도를 이용할 수 있어요. 고용노동부에 체당금 신청을 하면 국가가 퇴직금 일부를 대신 지급하고 사업주에게 구상권을 행사해요. 고용24에서 신청 가능해요.",
  },
  {
    q: "퇴직금은 받았는데 지연이자를 안 줘요. 따로 청구할 수 있나요?",
    a: "가능해요. 지연이자는 퇴직금과 별도 법정 채권이에요. 퇴직금을 늦게 받은 날짜를 기준으로 14일 초과분 이자를 계산해서 노동청 조정이나 소액심판으로 청구하면 돼요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제36조: 금품 청산 14일 기한", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로기준법 제37조: 지연이자 연 20%", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로자퇴직급여보장법 제9조: 퇴직급여 지급 기한", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부: 임금체불 진정 안내", url: "https://www.moel.go.kr" },
      { label: "고용24: 온라인 진정 접수", url: "https://www.work.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-지급-기한", title: "퇴직금 지급 기한 원칙", description: "14일 규정의 예외 조건과 적용 범위." },
  { slug: "퇴직금-지연이자", title: "퇴직금 지연이자 계산법", description: "연 20% 계산 공식과 실제 청구 방법." },
  { slug: "퇴직금-미지급-신고", title: "퇴직금 미지급 신고 방법", description: "노동청 진정 절차와 체당금 신청까지." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} highlightSlugs={퇴직금_HIGHLIGHT} currentSlug="퇴직금-지급-기한-14일-원칙-지연이자" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 14일 기한 · 지연이자</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금이 14일 안에 안 들어왔어요.<br />
        지연이자 계산법부터 신고 절차까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        <a href="/w/퇴직금-지급-기한" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 지급 기한</a>은 퇴직일로부터 14일이에요.
        14일이 지나면 사업주는 <a href="/w/퇴직금-지연이자" style={{ color: "#1D9E75", textDecoration: "underline" }}>연 20% 지연이자</a>를 함께 내야 해요.
        이 이자는 자동으로 붙지만 직접 청구해야 받을 수 있어요.
        지연 일수가 쌓일수록 금액도 늘어나니, 14일이 지났다면 바로 행동해야 해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>내가 지연이자를 청구할 수 있나요?</H2>
      <p style={body}>
        근로기준법 제36조는 퇴직금을 퇴직 후 14일 이내에 지급하도록 정하고 있어요.
        이 기한을 넘기면 근로기준법 제37조에 따라 연 20% 지연이자가 14일 다음 날부터 하루하루 발생해요.
        사업주의 재정 상황이 어렵거나 본인이 모르는 사정이 있어도, 서면 합의 없이 기한을 넘기면 이자 의무가 생겨요.
      </p>
      <p style={body}>
        당사자 간 서면으로 지급 기한 연장에 합의했다면, 합의한 기간 내에는 지연이자가 붙지 않아요.
        그 기한도 지나면 그때부터 연 20%가 적용돼요.
        청구권 소멸시효는 3년으로, 퇴직일 기준 3년이 지나면 법적으로 청구 자체가 막혀요.
      </p>

      <GreenBox>
        퇴직일 기준 14일 초과 시 다음 날부터 연 20% 자동 발생<br />
        서면 합의로 기한 연장 시 — 합의 기간 내에는 이자 없음<br />
        소멸시효 3년: 퇴직일로부터 3년 안에 청구해야 해요
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="지연이자 청구 조건에 해당해요. 아래 계산기로 예상 금액을 확인해보세요."
        partialMatchText="일부 조건이 다를 수 있어요. 서면 합의 여부를 먼저 확인하고, 고용노동부(1350)에 상담해보세요."
      />

      <Divider />

      <H2>지연이자, 얼마나 붙었을까요?</H2>
      <p style={body}>
        계산식은 간단해요. 미지급 퇴직금 × 20% ÷ 365 × 지연 일수예요.
        500만원을 30일 지연하면 약 8만 2천원, 60일 지연하면 약 16만 4천원이 돼요.
        슬라이더로 내 상황에 맞는 금액을 바로 계산해볼 수 있어요.
      </p>

      <SectionBadge>지연이자 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 근로기준법 제37조 연 20% 기준. 퇴직 후 14일 초과 시점부터 실제 지급일까지 계산해요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>청구에 필요한 서류</H2>
      <p style={body}>
        지연이자 청구에서 가장 중요한 건 근로 사실과 퇴직금 미지급을 입증하는 자료예요.
        근로계약서와 급여명세서로 근로 기간과 임금 수준을 증명하고, 지급 요청 기록을 함께 챙겨두면 신고 과정이 훨씬 수월해요.
        내용증명 발송 사본은 사전 청구 사실을 증명하는 강력한 증거가 돼요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>지연이자 청구 절차 4단계</H2>
      <p style={body}>
        문자 발송에서 노동청 신고까지 순서대로 진행해요.
        대부분 내용증명 발송 단계나 노동청 진정 단계에서 해결돼요.
        끝까지 버티는 사업주라면 소액심판(3,000만원 이하)으로 법원에 청구할 수 있어요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>신고 전 꼭 챙길 것들</H2>
      <p style={body}>
        노동청 진정에서 지연이자를 받으려면 진정서에 '지연이자 연 20% 청구'를 명확히 써야 해요.
        퇴직금 미지급만 신고하면 이자는 빠질 수 있어요.
        소멸시효 3년도 꼭 확인하세요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        퇴직금을 뒤늦게 받았더라도 지연된 기간의 이자는 따로 청구할 수 있어요.
        받은 날 기준으로 14일 초과분을 계산해서 노동청이나 소액심판으로 청구하면 돼요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 14일 기한과 지연이자에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법 제36조·제37조 및 근로자퇴직급여보장법 제9조를 바탕으로 작성됐어요. 개별 사안에 따라 적용이 달라질 수 있으니 고용노동부(1350) 또는 관할 노동청에서 확인하세요." />
    </ArticleLayout>
  );
}
