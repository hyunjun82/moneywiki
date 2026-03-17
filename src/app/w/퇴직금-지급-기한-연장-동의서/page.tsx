"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "회사가 퇴직금 지급 기한 연장 동의서를 써달라고 했어요" },
  { id: "c2", label: "동의서에 지급 날짜가 구체적으로 명시돼 있어요" },
  { id: "c3", label: "동의서에 지연이자 포기 조항이 없어요" },
  { id: "c4", label: "아직 서명하기 전이에요" },
];

const CALC_SLIDERS = [
  { id: "amount", label: "미지급 퇴직금", min: 100, max: 5000, step: 50, defaultValue: 1000, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "extendDays", label: "연장 기간 (일)", min: 7, max: 180, step: 7, defaultValue: 30, format: (v: number) => `${v}일` },
];

const CALC_RESULTS = [
  {
    label: "연장 기간 지연이자 (연 20%)",
    getValue: (v: Record<string, number>) => Math.round(v.amount * 10000 * 0.2 / 365 * v.extendDays),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "퇴직금 + 연장 기간 이자 합계",
    getValue: (v: Record<string, number>) => Math.round(v.amount * 10000 + v.amount * 10000 * 0.2 / 365 * v.extendDays),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "지급기한 연장 동의서 (회사 제공)", required: false, where: "회사가 작성, 근로자 서명" },
  { name: "근로계약서", required: true, where: "인사팀 또는 입사 시 수령본" },
  { name: "급여명세서 (최근 3개월)", required: true, where: "회사 인사팀 요청" },
  { name: "퇴직 확인서 또는 사직서 사본", required: true, where: "회사 인사팀" },
];

const STEPS = [
  {
    title: "동의서 내용 꼼꼼히 확인",
    desc: "지급기한 연장 동의서에 서명 전 ①연장 기간이 명시됐는지 ②지연이자 포기 조항이 없는지 ③지급 보장 방법이 적혀 있는지를 확인하세요. 지연이자 포기 문구가 있으면 서명하는 순간 이자를 받기 어려워요.",
    tip: "동의서 수정 요청 가능: 불리한 조항은 삭제 요청하세요",
  },
  {
    title: "동의 여부 결정",
    desc: "동의는 강요가 아닌 자발적 합의여야 해요. 합리적인 연장 기간(14~30일)이고 지연이자 포기 조항이 없다면 동의할 수 있어요. 기간이 너무 길거나 이자 포기 조항이 있으면 거부하세요.",
    tip: "거부하더라도 불이익은 없어요 — 근로기준법으로 보호받아요",
  },
  {
    title: "동의 없이 거부 시 대응",
    desc: "거부하면 14일 초과분부터 자동으로 지연이자(연 20%)가 발생해요. 회사에 퇴직금과 지연이자를 포함한 청구서를 발송하고, 응하지 않으면 고용노동부 진정을 내세요.",
    tip: "거부 사실을 문자나 메일로 기록에 남겨두세요",
  },
  {
    title: "동의 후 지급 보장 확인",
    desc: "동의서에 서명했다면 연장된 기한 내에 지급이 이뤄지는지 확인해요. 연장 기한도 초과하면 다시 지연이자가 발생하고 노동청 신고가 가능해요. 지급 약속이 반복해서 미뤄지면 즉시 신고하세요.",
    tip: "동의서에 서명했어도 지급이 안 되면 즉시 신고 가능해요",
  },
];

const CHECKLIST = [
  "동의서 확인: 지연이자 포기 조항 없는지 반드시 확인",
  "연장 기간 명시: 구체적인 지급 날짜가 적혀 있어야 해요",
  "거부 권리: 동의는 자발적 합의, 강요하면 위법",
  "14일 초과: 동의 없이 기한 지나면 연 20% 지연이자 자동 발생",
  "이중 위반: 연장 기간도 초과하면 다시 신고 가능",
];

const FAQS = [
  {
    q: "지급기한 연장 동의서에 반드시 서명해야 하나요?",
    a: "아니에요. 동의는 자발적 합의예요. 서명을 거부해도 아무 불이익이 없어요. 거부하면 14일 초과분부터 지연이자(연 20%)를 받을 수 있어요.",
  },
  {
    q: "동의서에 지연이자 포기 조항이 있는데 서명해야 하나요?",
    a: "서명하면 이자를 받기 어려워져요. 포기 조항 삭제를 요청하거나, 삭제 안 되면 서명하지 않고 고용노동부에 진정을 내는 게 유리해요.",
  },
  {
    q: "동의서를 썼는데 연장 기한도 지났어요",
    a: "다시 지연이자가 발생해요. 연장된 기한 초과분에 대해 연 20% 이자를 청구할 수 있고, 고용노동부에 다시 신고할 수 있어요.",
  },
  {
    q: "동의서에 서명한 뒤 마음이 바뀌었어요",
    a: "사후에 취소하기는 어려워요. 단, 강요·사기·착오로 서명한 경우엔 무효를 주장할 수 있어요. 노무사나 법률구조공단(132)에 상담하세요.",
  },
  {
    q: "퇴직금 지급기한 연장 동의서, 법적으로 유효한가요?",
    a: "사전에 자발적으로 합의한 경우에만 유효해요. 퇴직 후 강요로 받은 동의서는 무효 주장이 가능해요. 근로기준법 제36조에 따라 지급 기한 연장은 사전 합의가 원칙이에요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제36조: 금품 청산 기한 14일, 합의 연장 가능", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로기준법 제37조: 지연이자 연 20%", url: "https://www.law.go.kr/법령/근로기준법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부: 퇴직금 지급 기준 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-지급-기한-연장", title: "퇴직금 지급 기한 연장", description: "연장 조건과 지연이자 청구 방법." },
  { slug: "퇴직금-지연이자", title: "퇴직금 지연이자 계산", description: "연 20% 지연이자 계산법을 설명해요." },
  { slug: "퇴직금-지급-기한-14일-원칙-지연이자", title: "14일 원칙 지연이자", description: "기한 계산과 지연이자 청구 절차." },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-지급-기한-연장-동의서" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 기한연장 · 동의서</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 지급 기한 연장 동의서, 서명해도 되나요?<br />
        동의 전 확인 사항과 거부 시 대응 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        지급기한 연장 동의서에 서명하기 전에 지연이자 포기 조항이 없는지 반드시 확인해야 해요.
        이 조항이 있으면 서명 후 <a href="/w/퇴직금-지연이자" style={{ color: "#1D9E75", textDecoration: "underline" }}>지연이자(연 20%)</a>를 받기 어려워져요.
        동의는 자발적 합의여야 하고, 거부하더라도 불이익은 없어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>연장 동의서, 왜 주의해야 하나요?</H2>
      <p style={body}>
        지급기한 연장 동의서는 법적으로 유효한 문서예요. 자발적으로 서명했다면 그 내용에 구속돼요.
        특히 "지연이자를 청구하지 않겠다"는 조항이 있으면 추후 이자를 받기 매우 어려워져요.
        회사가 자금 사정을 이유로 이 문서를 요구하는 경우가 많아요.
      </p>
      <p style={body}>
        동의서에는 ①구체적인 지급 날짜 ②지연이자 유무 ③지급 보장 방법이 명시돼야 해요.
        이것들이 없거나 이자 포기 조항이 있다면 서명하지 말고 고용노동부에 신고하는 게 유리해요.
      </p>

      <GreenBox title="연장 동의서 서명 전 확인 사항">
        ① 지급 날짜 명시 여부 (구체적인 날짜여야 해요)<br />
        ② 지연이자 포기 조항 없는지<br />
        ③ 지급 보장 방법 (담보·보증 등) 여부
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="동의 전 조건을 잘 갖추고 있어요. 아래 계산기로 연장 기간 지연이자를 먼저 확인하세요."
        partialMatchText="동의서 조건에 문제가 있을 수 있어요. 서명 전 고용노동부(1350)에 상담받아보세요."
      />

      <Divider />

      <H2>연장 기간 지연이자 계산</H2>
      <p style={body}>
        미지급 퇴직금과 연장 기간을 입력하면 해당 기간 지연이자를 바로 확인할 수 있어요.
        이자 포기 조항이 있는 동의서에 서명하면 이 금액을 포기하는 거예요.
      </p>

      <SectionBadge>연장 기간 지연이자 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 근로기준법 제37조 기준 연 20%. 14일 초과분부터 발생해요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>동의서 관련 준비 서류</H2>
      <p style={body}>
        동의서 검토 시 근로계약서와 급여명세서를 함께 준비해두면 퇴직금 기준을 명확히 할 수 있어요.
        퇴직 확인서는 기한 기산일을 증명하는 데 필요해요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>연장 동의서 대응 4단계</H2>
      <p style={body}>
        동의서 내용 확인 → 동의 여부 결정 → 거부 시 청구·신고 → 동의 후 지급 모니터링 순서예요.
        가장 먼저 해야 할 건 지연이자 포기 조항 유무 확인이에요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>연장 동의서 체크리스트</H2>
      <p style={body}>
        지연이자 포기 조항이 가장 중요한 확인 사항이에요.
        아무 생각 없이 서명하면 수십만 원 이자를 포기할 수 있어요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="서명 전에 이자 포기 조항을 꼭 확인하세요">
        포기 조항이 있으면 삭제를 요청하거나 서명하지 마세요.<br />
        거부해도 불이익 없어요 — 지연이자 청구권은 그대로 유지돼요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 지급 기한 연장 동의서에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
