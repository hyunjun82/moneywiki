"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "퇴사일로부터 14일이 넘었는데 퇴직금을 못 받았어요" },
  { id: "c2", label: "기한 연장에 서면으로 동의한 적이 없어요" },
  { id: "c3", label: "퇴사한 지 아직 3년이 안 됐어요" },
  { id: "c4", label: "미지급 퇴직금 금액을 알고 있어요" },
];

const CALC_SLIDERS = [
  { id: "amount", label: "미지급 퇴직금", min: 100, max: 10000, step: 100, defaultValue: 1000, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "days", label: "지연 일수 (14일 초과분)", min: 15, max: 730, step: 5, defaultValue: 90, format: (v: number) => `${v}일` },
];

const CALC_RESULTS = [
  {
    label: "지연이자 (연 20%)",
    getValue: (v: Record<string, number>) => Math.round(v.amount * 10000 * 0.2 * v.days / 365),
    format: (v: number) => v < 10000 ? `${v.toLocaleString()}원` : `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "총 청구 금액 (원금 + 이자)",
    getValue: (v: Record<string, number>) => {
      const interest = Math.round(v.amount * 10000 * 0.2 * v.days / 365);
      return v.amount * 10000 + interest;
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "퇴직 증빙 (사직서·해고통지서)", required: true, where: "본인 보관 또는 인사팀" },
  { name: "근로계약서", required: true, where: "인사팀 또는 입사 시 수령본" },
  { name: "급여명세서 (최근 3개월)", required: true, where: "회사 인사팀 요청" },
  { name: "내용증명 발송 기록", required: false, where: "우체국 발송 후 보관" },
  { name: "통장 입금 내역", required: false, where: "은행 앱 출력" },
];

const STEPS = [
  {
    title: "14일 기한 초과 확인",
    desc: "퇴사일 다음 날부터 14일째 되는 날이 기한이에요. 이 날이 지났는데 입금이 없다면 지연이자 계산이 시작된 거예요. 날짜를 정확히 계산해서 위 계산기에 입력하세요.",
    tip: "달력 앱으로 퇴사일 +14일 계산하면 정확해요",
  },
  {
    title: "내용증명 발송 (지연이자 명시)",
    desc: "'퇴직금 미지급으로 14일 기한을 초과했으며, 연 20% 지연이자와 함께 지급을 요청합니다'라는 내용으로 내용증명을 보내세요. 이 시점에서 지연이자 청구 의사를 명확히 해야 나중에 받기 쉬워요.",
    tip: "카카오 전자내용증명으로 빠르게 발송 가능",
  },
  {
    title: "고용노동부 진정 접수 (지연이자 포함)",
    desc: "노동청 진정 시 '퇴직금 + 지연이자'를 함께 명시하세요. 진정서에 지연이자 금액을 구체적으로 쓰면 근로감독관이 함께 시정 명령을 내려요.",
    tip: "minwon.moel.go.kr에서 온라인 접수 시 지연이자 항목 체크",
  },
  {
    title: "민사소송 또는 소액심판 (최후 수단)",
    desc: "진정 결과에도 지급하지 않으면 소액심판이나 민사소송을 제기해요. 3,000만원 이하는 변호사 없이 직접 가능해요. 지연이자는 자동으로 원금에 포함돼 청구할 수 있어요.",
    tip: "대한법률구조공단(132)에서 무료 법률 지원",
  },
];

const CHECKLIST = [
  "지연이자 계산 — 14일 초과 시점부터 연 20% 적용",
  "내용증명에 지연이자 명시 — 나중에 청구 근거 확보",
  "노동청 진정 시 지연이자 항목 포함",
  "소멸시효 3년 — 퇴직금과 지연이자 모두 3년 내 청구",
  "서류 보관 — 진정 처리 시 증빙 자료로 사용",
];

const FAQS = [
  {
    q: "지연이자는 자동으로 붙나요?",
    a: "법적으로 자동 발생하지만, 실제로 받으려면 진정 또는 소송에서 명시적으로 청구해야 해요. 그냥 두면 안 주는 경우가 많죠.",
  },
  {
    q: "지연이자 계산 시작 날짜가 언제인가요?",
    a: "퇴직 후 14일이 되는 날 다음 날부터예요. 즉 15일째부터 이자가 붙기 시작하죠.",
  },
  {
    q: "지연이자도 소멸시효가 있나요?",
    a: "있어요. 퇴직금 원금과 같은 3년이에요. 3년이 지나면 지연이자 청구권도 소멸하죠.",
  },
  {
    q: "지연이자 연 20%는 세금이 있나요?",
    a: "퇴직금 지연이자는 기타소득으로 분류돼 원천징수될 수 있어요. 회사가 지급 시 세금 처리를 하거나, 소송으로 받을 때 세금 문제가 생길 수 있죠.",
  },
  {
    q: "회사가 부분 지급하면 이자도 부분 적용되나요?",
    a: "맞아요. 부분 지급 시 그 금액에 대한 이자는 지급일에 멈추고, 나머지 미지급분에 대해서는 계속 이자가 붙어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제37조 — 퇴직금 지연이자 연 20%", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로기준법 제36조 — 14일 이내 금품 청산 의무", url: "https://www.law.go.kr/법령/근로기준법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 민원마당 — 임금체불 진정 접수", url: "https://minwon.moel.go.kr" },
      { label: "대한법률구조공단 — 무료 법률 지원 (132)", url: "https://www.klac.or.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-미지급-신고",
    title: "퇴직금 미지급 신고 절차",
    description: "노동청 진정 접수부터 처리 과정까지 안내해요.",
  },
  {
    slug: "퇴직금-지급-기한",
    title: "퇴직금 지급 기한 14일 원칙",
    description: "14일 기한 계산법과 초과 시 대응 방법이에요.",
  },
  {
    slug: "퇴직금-소멸시효",
    title: "퇴직금 소멸시효 3년, 주의사항",
    description: "3년 안에 청구하지 않으면 받을 수 없어요.",
  },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-지연이자" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 지연이자 · 미지급</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 지연이자 연 20%, 받는 방법은?<br />
        계산부터 신고 절차까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금을 14일 안에 안 주면 <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제37조</a>에 따라 연 20% 지연이자가 붙어요.
        퇴직금 1,000만원이 90일 지연됐다면 이자만 약 49만원이에요.
        지연이자는 자동으로 받는 게 아니에요. <a href="/w/퇴직금-미지급-신고" style={{ color: "#1D9E75", textDecoration: "underline" }}>진정 또는 소송</a>에서 명시적으로 청구해야 받을 수 있죠.
        계산법과 청구 절차를 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>지금 지연이자를 받을 수 있는 상황인가요?</H2>
      <p style={body}>
        지연이자는 퇴직 후 14일이 지난 시점부터 발생해요.
        단, 당사자 간 서면 합의로 기한을 연장한 경우엔 연장 기간까지는 이자가 안 붙어요.
        구두 합의만 했다면 효력이 없으니 이자를 청구할 수 있어요.
      </p>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="지연이자 청구가 가능한 상황이에요. 아래 계산기로 금액을 확인해보세요."
        partialMatchText="조건이 다를 수 있어요. 고용노동부(1350)에 상담해보세요."
      />

      <Divider />

      <H2>지연이자, 얼마나 받을 수 있을까?</H2>
      <p style={body}>
        공식은 간단해요. <strong>미지급 퇴직금 × 20% × 지연 일수 ÷ 365</strong>.
        아래 계산기에 금액과 지연 일수를 넣어보세요. 지연이자가 생각보다 클 수 있어요.
      </p>

      <SectionBadge>지연이자 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 근로기준법 제37조 연 20% 기준. 14일 초과 시점부터 계산."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>청구에 필요한 서류</H2>
      <p style={body}>
        지연이자 청구에도 기본 서류가 필요해요. 진정 접수 전에 미리 준비해두세요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>지연이자 받는 절차 4단계</H2>
      <p style={body}>
        지연이자는 그냥 기다린다고 들어오지 않아요. 내용증명부터 진정까지 명시적으로 청구해야 해요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>지연이자 청구 체크리스트</H2>
      <p style={body}>
        놓치기 쉬운 부분들이에요. 특히 소멸시효 3년은 반드시 지켜야 해요.
      </p>

      <SectionBadge>청구 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="내용증명에 지연이자를 꼭 명시하세요">
        내용증명 단계에서 지연이자를 명시해두면, 나중에 노동청 진정이나 소송으로 가더라도
        청구 근거가 명확해요. "퇴직금 ○○만원 + 연 20% 지연이자"를 함께 써두세요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 지연이자에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
