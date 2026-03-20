"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR, 퇴직금_HIGHLIGHT } from "@/data/퇴직금-guide";

// ─── 데이터 (변경 없음) ──────────────────────────────

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
    desc: "퇴직금 지급 기한은 퇴직일 다음 날부터 14일이에요. 15일째 날부터 이자 계산이 시작되죠. 달력으로 퇴사일 +14일을 세고, 오늘까지 며칠이 더 지났는지 확인하면 돼요. 주말과 공휴일도 일수에 포함돼요.",
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
    desc: "진정 처리 후에도 지급하지 않으면 법원에 소액심판을 청구해요. 청구 금액 3,000만원 이하라면 변호사 없이 본인이 직접 가능하죠. 지연이자는 원금에 포함해 한꺼번에 청구할 수 있어요. 대한법률구조공단(132)에서 무료 법률 지원도 받을 수 있어요.",
    tip: "대법원 전자소송(ecfs.scourt.go.kr)에서 온라인으로 소장 접수 가능해요",
  },
];

const CHECKLIST = [
  "지연이자 시작일: 퇴직 후 15일째부터 (14일 초과 시점)",
  "이율: 연 20%, 일할 계산 (미지급 퇴직금 x 20% / 365 x 지연 일수)",
  "내용증명에 지연이자 금액 명시 - 청구 근거 확보",
  "노동청 진정서에 지연이자 별도 항목으로 기재",
  "소멸시효 3년: 퇴직금 원금과 지연이자 모두 퇴직일로부터 3년 내 청구",
  "부분 지급 시: 지급된 금액만큼 이자 중단, 잔액은 계속 이자 발생",
];

const FAQS = [
  {
    q: "지연이자는 자동으로 붙나요, 직접 청구해야 하나요?",
    a: "법적으로는 자동 발생하지만 실제로 받으려면 반드시 명시적으로 청구해야 해요. 진정서나 소장에 지연이자 항목을 빠뜨리면 안 주죠. 내용증명 단계부터 금액을 명시해두는 게 중요해요.",
  },
  {
    q: "지연이자 계산 시작일이 정확히 언제인가요?",
    a: "퇴직일 다음 날부터 14일을 세고, 그다음 날(15일째)부터 이자가 붙어요. 예를 들어 3월 1일 퇴직이라면 3월 15일부터 이자 계산이 시작되죠. 주말과 공휴일도 일수에 포함돼요.",
  },
  {
    q: "지연이자도 소멸시효가 적용되나요?",
    a: "돼요. 퇴직금 원금과 동일하게 퇴직일로부터 3년이에요. 3년이 지나면 지연이자 청구권도 소멸하죠. 내용증명을 발송하면 소멸시효를 중단시킬 수 있어요.",
  },
  {
    q: "회사가 퇴직금을 부분 지급하면 이자도 부분만 적용되나요?",
    a: "맞아요. 부분 지급한 금액에 대한 이자는 지급일에 멈춰요. 나머지 미지급분에 대해서는 계속 이자가 붙고요. 부분 지급 시 영수증이나 계좌 내역으로 금액과 날짜를 꼭 기록해두세요.",
  },
  {
    q: "지연이자에도 세금이 붙나요?",
    a: "퇴직금 지연이자는 기타소득으로 분류될 수 있어요. 회사가 지급할 때 원천징수하거나, 소송으로 받을 때 세금 문제가 생길 수 있죠. 금액이 크다면 세무사에게 확인하는 게 좋아요.",
  },
  {
    q: "서면 합의로 기한을 연장했다면 이자가 안 붙나요?",
    a: "서면으로 합의한 기간까지는 지연이자가 발생하지 않아요. 단, 구두(말)로만 합의했거나 서면 없이 미루기만 했다면 효력이 없어서 이자를 청구할 수 있죠.",
  },
];

const SOURCES = [
  { name: "고용노동부", href: "https://www.moel.go.kr" },
  { name: "대한법률구조공단", href: "https://www.klac.or.kr" },
  { name: "법제처", href: "https://www.law.go.kr/법령/근로기준법" },
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
        퇴직금 14일 지났는데 아직도 안 왔나요?<br />
        지연이자 연 20% 계산법부터 청구 방법까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제37조</a>는 퇴직금 지급 기한(14일)을 넘기면 연 20% 지연이자를 의무적으로 물도록 해요.
        퇴직금 1,000만원이 60일 지연됐다면 이자만 약 33만원이에요.
        다만 이자는 기다린다고 자동으로 들어오지 않죠. <a href="/w/퇴직금-지연이자-받기" style={{ color: "#1D9E75", textDecoration: "underline" }}>내용증명과 진정</a>으로 명시적으로 청구해야 받을 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* H2-1: Calculator (얼마형 -> 답 먼저) */}
      <H2>내 퇴직금 지연이자, 얼마나 될까?</H2>
      <p style={body}>
        계산 공식은 단순해요. 미지급 퇴직금 x 20% / 365 x 지연 일수예요.
        1,000만원이 90일 지연됐다면 약 49만원이죠.
        슬라이더로 내 금액과 지연 일수를 넣으면 바로 확인할 수 있어요.
      </p>

      <SectionBadge>지연이자 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 근로기준법 제37조 연 20% 기준. 14일 초과 시점(15일째)부터 실제 지급일까지 일할 계산이에요."
      />

      <GreenBox>
        이율: 연 20% (일할 계산)<br />
        시작일: 퇴직 후 15일째부터 (14일 초과 시점)<br />
        종료일: 실제 지급일까지 매일 누적<br />
        소멸시효: 퇴직일로부터 3년
      </GreenBox>

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      {/* H2-2: EligibilityChecker (법정 청구 조건) */}
      <H2>지금 지연이자를 청구할 수 있는 상황인가요?</H2>
      <p style={body}>
        지연이자 청구 조건은 세 가지예요. 퇴직 후 14일이 지났을 것, 서면으로 기한 연장 합의를 한 적 없을 것, 퇴직일로부터 3년이 지나지 않았을 것이에요.
        구두로만 "좀 기다려달라"는 말을 들었다면 효력이 없어서 이자를 청구할 수 있죠.
      </p>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="지연이자 청구가 가능한 상황이에요. 아래 절차를 따라 진행하세요."
        partialMatchText="조건이 다를 수 있어요. 고용노동부(1350)에 무료 상담해보세요."
      />

      <Divider />

      {/* H2-3: Steps (청구 절차) */}
      <H2>지연이자 받는 절차 4단계</H2>
      <p style={body}>
        지연이자는 기다린다고 자동으로 들어오지 않아요.
        내용증명 발송 → 노동청 진정 → 소송 순으로 밟으면 돼요.
        대부분 2~3단계에서 해결되죠.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      {/* H2-4: Checklist */}
      <H2>청구 전 꼭 챙겨야 할 것들</H2>
      <p style={body}>
        지연이자 청구에서 가장 많이 실수하는 게 내용증명과 진정서에 이자를 빠뜨리는 거예요.
        원금만 적으면 원금만 받게 되죠. 소멸시효 3년도 반드시 챙겨야 해요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* H2-5: FAQ */}
      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 지연이자에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
