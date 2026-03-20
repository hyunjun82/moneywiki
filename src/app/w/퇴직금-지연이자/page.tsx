"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR, 퇴직금_HIGHLIGHT } from "@/data/퇴직금-guide";

// ─── Q1-Q4 필수 사고 ─────────────────────────────────
// Q1. 퇴직금 14일 지났는데 아직 안 들어왔고, 지연이자를 받을 수 있는지 모르는 상황
// Q2. 내 지연이자 금액을 계산하고, 내용증명→노동청 진정→소송 순서로 청구한다
// Q3. 지연이자 연 20%(일할 계산), 시작일(15일째), 소멸시효 3년, 내용증명 발송법, 노동청 진정 절차
// Q4. Calculator(이자 계산) + EligibilityChecker(청구 조건) + Steps(절차) + Checklist(준비)
//
// MAP:
// Q1 → 서론: 퇴직금이 안 들어와서 답답한 상황
// Q2 → H2 순서: Calculator(답 먼저, 얼마형) → EligibilityChecker → Steps → Checklist
// Q3 → H2 4개 + FAQ
// Q4 → Calculator, EligibilityChecker, Steps, Checklist

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "퇴사일로부터 14일이 지났는데 퇴직금을 못 받았어요" },
  { id: "c2", label: "기한 연장에 서면으로 동의한 적이 없어요" },
  { id: "c3", label: "퇴사 후 3년이 아직 지나지 않았어요" },
  { id: "c4", label: "회사에 지급 요청했지만 받지 못했어요" },
];

const CALC_SLIDERS = [
  { id: "amount", label: "미지급 퇴직금", min: 100, max: 10000, step: 100, defaultValue: 1000, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "days", label: "14일 초과 지연 일수", min: 1, max: 365, step: 1, defaultValue: 60, format: (v: number) => `${v}일` },
];

const CALC_RESULTS = [
  {
    label: "지연이자 (연 20%)",
    getValue: (v: Record<string, number>) => Math.round(v.amount * 10000 * 0.2 * v.days / 365),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
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

const STEPS = [
  {
    title: "지연 일수 정확히 계산하기",
    desc: "퇴직금 지급 기한은 퇴직일 다음 날부터 14일이에요. 15일째 날부터 이자 계산이 시작되죠. 달력으로 퇴사일 +14일을 세고, 오늘까지 며칠이 더 지났는지 세면 돼요. 주말과 공휴일도 일수에 포함되고요.",
    tip: "위 계산기에 퇴직금 금액과 초과 일수를 넣으면 이자 금액이 바로 나와요",
  },
  {
    title: "내용증명 발송 (지연이자 금액 명시)",
    desc: "'퇴직금 OO만원이 14일 기한을 초과했으므로 근로기준법 제37조에 따른 연 20% 지연이자와 함께 지급을 요청합니다'라는 내용으로 내용증명을 발송해요. 이 시점부터 소멸시효가 중단되고 법적 청구 기록이 생기죠.",
    tip: "카카오 전자내용증명(등기 효력)으로 집에서 5분 내 발송 가능해요",
  },
  {
    title: "고용노동부 진정 접수 (지연이자 항목 포함)",
    desc: "노동청 진정서에 퇴직금 원금과 지연이자를 별도 항목으로 명시해야 해요. 근로감독관이 시정 명령을 낼 때 지연이자도 함께 포함시켜 주죠. 온라인 접수는 고용노동부 민원마당(minwon.moel.go.kr)에서 가능하고, 보통 2~4주 내에 처리돼요.",
    tip: "진정서 '체불 금품' 항목에 '퇴직금 OO만원 + 지연이자 OO만원'을 구체적으로 적어야 해요",
    link: { label: "고용노동부 민원마당 바로가기", href: "https://minwon.moel.go.kr" },
  },
  {
    title: "소액심판 또는 민사소송 제기",
    desc: "진정 처리 후에도 지급하지 않으면 법원에 소액심판을 청구해요. 청구 금액 3,000만원 이하라면 변호사 없이 본인이 직접 가능하죠. 지연이자는 원금에 포함해 한꺼번에 청구할 수 있고요. 대한법률구조공단(132)에서 무료 법률 지원도 받을 수 있어요.",
    tip: "대법원 전자소송(ecfs.scourt.go.kr)에서 온라인으로 소장 접수 가능해요",
  },
];

const CHECKLIST = [
  "지연이자 시작일: 퇴직 후 15일째부터 (14일 초과 시점)",
  "이율: 연 20%, 일할 계산 (미지급 퇴직금 × 20% / 365 × 지연 일수)",
  "내용증명에 지연이자 금액 명시 — 청구 근거 확보",
  "노동청 진정서에 지연이자 별도 항목으로 기재",
  "소멸시효 3년: 퇴직금 원금과 지연이자 모두 퇴직일로부터 3년 내 청구",
  "부분 지급 시: 지급된 금액만큼 이자 중단, 잔액은 계속 이자 발생",
];

const FAQS = [
  {
    q: "지연이자는 자동으로 붙나요, 직접 청구해야 하나요?",
    a: "법적으로는 자동 발생하지만 실제로 받으려면 명시적으로 청구해야 해요. 진정서나 소장에 지연이자 항목을 빠뜨리면 안 주죠. 내용증명 단계부터 금액을 명시해두는 게 중요하고요.",
  },
  {
    q: "지연이자 계산 시작일이 정확히 언제인가요?",
    a: "퇴직일 다음 날부터 14일을 세고, 그다음 날(15일째)부터 이자가 붙어요. 예를 들어 3월 1일 퇴직이라면 3월 15일부터 이자 계산이 시작되죠. 주말과 공휴일도 일수에 포함되고요.",
  },
  {
    q: "지연이자도 소멸시효가 적용되나요?",
    a: "돼요. 퇴직금 원금과 동일하게 퇴직일로부터 3년이죠. 3년이 지나면 지연이자 청구권도 소멸하고요. 내용증명을 발송하면 소멸시효를 중단시킬 수 있어요.",
  },
  {
    q: "회사가 퇴직금을 부분 지급하면 이자도 부분만 적용되나요?",
    a: "맞아요. 부분 지급한 금액에 대한 이자는 지급일에 멈추죠. 나머지 미지급분에 대해서는 계속 이자가 붙고요. 부분 지급 시 영수증이나 계좌 내역으로 금액과 날짜를 꼭 기록해둬요.",
  },
  {
    q: "지연이자에도 세금이 붙나요?",
    a: "퇴직금 지연이자는 기타소득으로 분류될 수 있어요. 회사가 지급할 때 원천징수하거나, 소송으로 받을 때 세금 문제가 생길 수 있죠. 금액이 크다면 세무사에게 상담받는 게 안전하고요.",
  },
  {
    q: "서면 합의로 기한을 연장했다면 이자가 안 붙나요?",
    a: "서면으로 합의한 기간까지는 지연이자가 발생하지 않아요. 단, 구두(말)로만 합의했거나 서면 없이 미루기만 했다면 효력이 없어서 이자를 청구할 수 있죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제37조: 퇴직금 지연이자", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로자퇴직급여보장법 제9조: 퇴직금 지급 기한", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부: 퇴직금 체불 신고 안내", url: "https://www.moel.go.kr" },
      { label: "대한법률구조공단: 무료 법률 상담", url: "https://www.klac.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-지연이자-받기", title: "퇴직금 지연이자 받는 방법", description: "지연이자 청구 절차와 서류를 단계별로 안내해요." },
  { slug: "퇴직금-지급-기한-초과", title: "퇴직금 지급 기한 초과 대응", description: "14일 초과 시 단계별 대응 방법을 안내해요." },
  { slug: "퇴직금-미지급-신고", title: "퇴직금 미지급 신고 방법", description: "노동청 진정 접수 절차와 처리 기간이에요." },
];

// ─── 페이지 (얼마형: Calculator 먼저) ────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} highlightSlugs={퇴직금_HIGHLIGHT} currentSlug="퇴직금-지연이자" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 지연이자 · 미지급</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 14일 지났는데 아직 안 왔나요?<br />
        지연이자 계산법부터 청구 방법까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제37조</a>는 퇴직금 지급 기한(14일)을 넘기면 연 20% 지연이자를 의무적으로 물도록 해요.
        퇴직금 1,000만원이 60일 지연됐다면 이자만 약 33만원이죠.
        이자는 기다린다고 자동으로 들어오지 않아요.{" "}
        <a href="/w/퇴직금-지연이자-받기" style={{ color: "#1D9E75", textDecoration: "underline" }}>내용증명과 진정</a>으로 명시적으로 청구해야 받을 수 있고요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* H2-1: Calculator (얼마형 → 답 먼저) */}
      <H2>내 퇴직금 지연이자, 얼마나 될까?</H2>
      <p style={body}>
        계산 공식은 단순해요. 미지급 퇴직금 × 20% / 365 × 지연 일수이죠.
        1,000만원이 90일 지연됐다면 약 49만원이에요.
        슬라이더로 내 금액과 지연 일수를 넣으면 바로 나오고요.
      </p>
      <p style={body}>
        지연이자는 퇴직 후 15일째부터(14일 초과 시점) 실제 지급일까지 매일 누적돼요.
        주말과 공휴일도 빠짐없이 일수에 포함되죠.
        소멸시효는 퇴직일로부터 3년이에요.
      </p>

      <SectionBadge>지연이자 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 근로기준법 제37조 연 20% 기준. 14일 초과 시점(15일째)부터 실제 지급일까지 일할 계산이에요."
      />

      <GreenBox title="지연이자 핵심 요약">
        이율: 연 20% (일할 계산)<br />
        시작일: 퇴직 후 15일째부터 (14일 초과 시점)<br />
        종료일: 실제 지급일까지 매일 누적<br />
        소멸시효: 퇴직일로부터 3년
      </GreenBox>

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      {/* H2-2: EligibilityChecker (질문형 시작) */}
      <H2>지금 지연이자를 청구할 수 있는 상황인가요?</H2>
      <p style={body}>
        청구 조건은 세 가지예요. 퇴직 후 14일이 지났을 것, 서면으로 기한 연장 합의를 한 적 없을 것, 퇴직일로부터 3년이 지나지 않았을 것이죠.
        구두로만 "좀 기다려달라"는 말을 들었다면 효력이 없어서 이자를 청구할 수 있고요.
      </p>
      <p style={body}>
        "회사가 어렵다고 했으니 기다려야 하나?" 싶겠지만, 서면 합의가 없다면 법적으로 지연이자가 발생해요.
        아래에서 내 상황을 체크해봐요.
      </p>

      <SectionBadge>내 상황 체크</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="지연이자 청구가 가능한 상황이에요. 아래 절차를 따라 진행해봐요."
        partialMatchText="조건이 다를 수 있어요. 고용노동부(1350)에 무료 상담해봐요."
      />

      <Divider />

      {/* H2-3: Steps (경고형 시작) */}
      <H2>가만히 있으면 이자도 못 받아요, 4단계로 청구하세요</H2>
      <p style={body}>
        지연이자는 법적으로는 자동 발생하지만, 실제로 받으려면 직접 청구해야 해요.
        내용증명 발송 → 노동청 진정 → 소액심판 순으로 밟으면 되죠.
        대부분 2~3단계에서 해결되고요.
      </p>
      <p style={body}>
        가장 많이 하는 실수가 내용증명이나 진정서에 지연이자를 빠뜨리는 거예요.
        원금만 적으면 원금만 받게 되죠.
        아래 절차에서 이자 항목을 반드시 포함시켜야 해요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      {/* H2-4: Checklist (사례형 시작) */}
      <H2>퇴직금 1,000만원이 90일 밀렸다면, 이자만 49만원이에요</H2>
      <p style={body}>
        지연이자 청구에서 가장 중요한 건 '금액을 명시하는 것'이에요.
        내용증명에도, 진정서에도, 소장에도 원금과 이자를 별도 항목으로 적어야 하죠.
        아래 체크리스트로 빠뜨린 게 없는지 점검해봐요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <BorderBox>
        지금 바로 할 수 있는 것: 위 계산기로 이자 금액을 구한 뒤, 카카오 전자내용증명으로 발송해봐요.
        집에서 5분이면 끝나고, 등기 효력이 있어서 법적 증거가 되죠.
      </BorderBox>

      <Divider />

      {/* H2-5: FAQ */}
      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 지연이자에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 문의해봐요." />
    </ArticleLayout>
  );
}
