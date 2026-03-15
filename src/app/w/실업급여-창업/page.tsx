"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body, Calculator,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR } from "@/data/실업급여-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "현재 실업급여를 수급 중이에요" },
  { id: "c2", label: "사업자등록은 아직 안 했어요" },
  { id: "c3", label: "소정급여일수의 절반 이상 남았어요" },
  { id: "c4", label: "12개월 이상 사업을 영위할 계획이에요" },
];

const CALC_SLIDERS = [
  { id: "totalDays", label: "소정급여일수", min: 120, max: 270, step: 30, defaultValue: 210, format: (v: number) => `${v}일` },
  { id: "usedDays", label: "이미 받은 일수", min: 0, max: 200, step: 10, defaultValue: 60, format: (v: number) => `${v}일` },
  { id: "dailyPay", label: "1일 구직급여액", min: 66048, max: 68100, step: 100, defaultValue: 68100, format: (v: number) => `${v.toLocaleString()}원` },
];

const CALC_RESULTS = [
  {
    label: "남은 소정급여일수",
    getValue: (v: Record<string, number>) => Math.max(0, v.totalDays - v.usedDays),
    format: (v: number) => `${v}일`,
  },
  {
    label: "절반 기준 충족 여부",
    getValue: (v: Record<string, number>) => {
      const remaining = v.totalDays - v.usedDays;
      return remaining >= v.totalDays / 2 ? 1 : 0;
    },
    format: (v: number) => v === 1 ? "충족 (조기재취업수당 대상)" : "미달 (조기재취업수당 불가)",
  },
  {
    label: "조기재취업수당 예상액",
    getValue: (v: Record<string, number>) => {
      const remaining = Math.max(0, v.totalDays - v.usedDays);
      return remaining >= v.totalDays / 2 ? Math.round(remaining * v.dailyPay * 0.5) : 0;
    },
    format: (v: number) => v > 0 ? `약 ${Math.round(v / 10000).toLocaleString()}만원` : "해당 없음",
    highlight: true,
  },
];

const CHECKLIST = [
  "고용24(ei.go.kr)에서 남은 소정급여일수 확인",
  "소정급여일수의 절반 이상 남은 시점에 사업자등록",
  "등록 즉시 고용센터에 취업 신고 (1350 또는 고용24)",
  "12개월 이상 사업 영위 후 조기재취업수당 신청",
  "폐업 시 조기재취업수당 자격 상실 — 12개월 반드시 채울 것",
];

const FAQS = [
  {
    q: "창업 준비 중에 비용이 생겼는데 수급이 끊기나요?",
    a: "아니에요. 준비 비용은 소득이 아니라서 수급이 중단되지 않아요. 사업자등록 전이고 실질적인 영업도 시작하지 않았으면 수급을 유지할 수 있죠.",
  },
  {
    q: "사업자등록 없이 프리랜서로 일해도 되나요?",
    a: "안 돼요. 등록 없이 영업을 시작하거나 소득이 발생하면 그날부터 취업으로 간주돼요. 미신고 상태에서 수급하면 부정수급이에요.",
  },
  {
    q: "12개월 전에 폐업하면 조기재취업수당은 어떻게 되나요?",
    a: "자격이 사라져요. 12개월 이상 사업을 영위해야 수당을 받을 수 있죠. 폐업 후 재취업하면 새 피보험기간을 충족해야 실업급여를 다시 받을 수 있어요.",
  },
  {
    q: "조기재취업수당은 언제 신청하나요?",
    a: "사업자등록 후 12개월이 지나야 신청할 수 있어요. 고용24에서 온라인 신청이 가능하고, 사업 영위 증빙(매출 내역, 세금 신고 자료 등)을 함께 제출해야 하죠.",
  },
  {
    q: "배우자 명의로 사업자등록하면 괜찮나요?",
    a: "실질적으로 본인이 운영하면 부정수급이에요. 명의와 관계없이 실질 경영자를 기준으로 판단하죠. 적발되면 최대 5배 환수 대상이에요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법 제64조 — 조기재취업수당 요건", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용보험법 제62조 — 부정수급 제재", url: "https://www.law.go.kr/법령/고용보험법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24 — 수급자격자 창업 안내", url: "https://www.ei.go.kr" },
      { label: "고용센터 — 조기재취업수당 신청", url: "https://www.ei.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "실업급여-조기재취업수당",
    title: "조기재취업수당 조건과 계산법",
    description: "남은 소정급여일수의 50%를 한 번에 받을 수 있죠. 자영업 창업도 대상이에요.",
  },
  {
    slug: "실업급여-부정수급",
    title: "실업급여 부정수급 처벌과 환수",
    description: "미신고 수급 시 최대 5배 추가 징수돼요. 자진신고하면 감면받을 수 있죠.",
  },
  {
    slug: "자영업자-실업급여",
    title: "자영업자 실업급여 가입 조건",
    description: "자영업자도 고용보험에 가입하면 폐업 시 실업급여를 받을 수 있어요.",
  },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={
        <Sidebar
          heading="실업급여 가이드"
          items={실업급여_SIDEBAR}
          currentSlug="실업급여-창업"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 창업</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        실업급여 받으면서 창업하면?<br />
        사업자등록 후 수급 조건
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "실업급여 받는 중인데, 사업자등록하면 수급이 끊기나요?"<br />
        끊겨요. 사업자등록을 하는 순간 취업으로 간주돼서 수급이 중단되죠.<br /><br />
        그런데 방법이 아예 없는 건 아니에요. 소정급여일수의 <strong>절반 이상 남기고 창업</strong>하면
        남은 급여의 50%를 <strong>조기재취업수당</strong>으로 한꺼번에 받을 수 있어요.
      </p>

      <Divider />

      {/* 섹션 1 — 창업 준비 vs 사업자등록 */}
      <H2>창업 준비 중에는 실업급여를 받을 수 있나요?</H2>
      <p style={body}>
        받을 수 있죠. <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>에서 수급 중단 사유로 보는 건 "취업" 또는 "자영업 개시"예요. 사업자등록 전 단계인 시장조사, 사업 계획 수립, 자금 준비 같은 활동은 취업이 아니에요. 이 기간에는 실업급여를 받으면서 창업을 준비할 수 있죠.
      </p>
      <p style={body}>
        그렇다면 어디까지가 "준비"이고, 어디부터가 "개시"일까요? 기준은 명확해요. 사업자등록을 하거나, 실질적으로 영업을 시작하거나, 소득이 발생하는 순간부터 취업으로 봐요. 세 가지 중 <strong>가장 이른 시점</strong>이 수급 중단일이에요. 등록 없이 시험 판매를 했어도, 매출이 생긴 그날부터 해당되죠.
      </p>
      <p style={body}>
        실무적으로 가장 흔한 실수가 "등록만 안 하면 괜찮겠지"라는 판단이에요. 프리랜서 프로젝트를 맡거나 현금 거래를 해도, 소득이 발생했다면 신고 대상이에요. 국세청 소득 자료와 고용보험 시스템이 연동되기 때문에 나중에 적발될 수 있죠.
      </p>

      <GreenBox title="수급 유지 vs 중단, 한눈에 보기">
        사업자등록 전 (시장조사·계획·자금 준비) → <strong>수급 유지</strong><br />
        사업자등록일 또는 영업 시작일 또는 소득 발생일 → <strong>수급 중단</strong><br />
        미신고 수급 시 → <strong>부정수급 (최대 5배 환수)</strong>
      </GreenBox>

      <SectionBadge>내 상황에 해당되는지 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="4가지 다 해당되네요. 사업자등록 시점만 잘 잡으면 조기재취업수당까지 챙길 수 있어요."
        partialMatchText="일부만 해당돼요. 나머지 조건도 확인하고 고용센터(1350)에 상담해보세요."
      />

      <Divider />

      {/* 섹션 2 — 사업자등록 후 수급 중단 */}
      <H2>사업자등록하면 정확히 어떻게 되나요?</H2>
      <p style={body}>
        등록일부터 수급이 중단돼요. 사업자등록이 곧 취업으로 간주되기 때문이에요. 등록한 날 바로 고용센터에 취업 신고를 해야 하죠. 신고 방법은 간단해요. <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 온라인으로 취업 신고를 하거나, 고용센터(1350)에 전화하면 돼요.
      </p>
      <p style={body}>
        취업 신고를 하지 않고 수급을 계속 받으면 부정수급이에요. <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 제62조</a>에 따라 이미 받은 실업급여를 전액 반환해야 하고, 추가로 <strong>최대 5배까지 추가 징수</strong>를 당할 수 있어요. 형사처벌 대상이기도 하죠.
      </p>
      <p style={body}>
        여기서 중요한 게 타이밍이에요. 소정급여일수의 절반 이상을 남긴 상태에서 등록하면 조기재취업수당을 받을 수 있어요. 급하게 등록하기보다, 남은 급여일수를 먼저 확인하고 최적의 시점을 계산하는 게 유리하죠.
      </p>

      <BorderBox title="수급 중단 시점 3가지">
        1. <strong>사업자등록일</strong> — 관할 세무서에 등록한 날<br />
        2. <strong>실질적 영업 시작일</strong> — 등록 없이 영업을 시작한 날<br />
        3. <strong>소득 발생일</strong> — 창업 관련 수입이 생긴 날<br /><br />
        세 가지 중 가장 이른 날이 수급 중단일이에요.
      </BorderBox>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      {/* 섹션 3 — 조기재취업수당 */}
      <H2>창업해도 조기재취업수당을 받을 수 있나요?</H2>
      <p style={body}>
        받을 수 있죠. 자영업 창업도 조기재취업수당 대상이에요. <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 제64조</a>에서 재취업뿐 아니라 자영업 창업도 명시하고 있어요. 다만 조건이 두 가지 붙어요.
      </p>
      <p style={body}>
        첫째, 소정급여일수의 <strong>1/2 이상을 남긴 상태</strong>에서 사업자등록을 해야 해요. 소정급여일수 210일인 사람이라면, 105일 이상 남아있을 때 등록해야 하는 거죠. 둘째, 등록 후 <strong>12개월 이상 계속 사업을 영위</strong>해야 해요. 12개월 전에 폐업하면 자격이 사라지니 주의가 필요해요.
      </p>
      <p style={body}>
        금액은 꽤 커요. 남은 소정급여일수 × 구직급여일액 × 50%예요. 예를 들어 소정급여일수 210일인 사람이 60일만 받고 창업하면, 남은 150일 × 68,100원(2026년 상한) × 50% = 약 511만원이에요. 빨리 창업할수록 남은 일수가 많아서 수당이 커지는 구조죠.
      </p>

      <SectionBadge>조기재취업수당 계산해보세요</SectionBadge>
      <Calculator
        title="조기재취업수당 예상 금액"
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 추정치예요. 정확한 금액은 고용24(ei.go.kr)에서 확인하세요. 2026년 상한 68,100원 / 하한 66,048원 기준."
      />

      <p style={body}>
        슬라이더를 움직여서 본인 상황에 맞게 계산해보세요. 소정급여일수가 길수록, 일찍 창업할수록 수당이 커지는 걸 확인할 수 있죠.
      </p>

      <Divider />

      {/* 섹션 4 — 부정수급 주의사항 */}
      <H2>창업할 때 부정수급에 걸리는 경우</H2>
      <p style={body}>
        가장 흔한 케이스는 사업자등록을 하고 취업 신고를 안 하는 거예요. "등록만 했지 아직 매출이 없는데"라고 생각하기 쉽지만, 등록 자체가 취업 간주 사유예요. 매출 유무와 관계없이 등록일부터 신고해야 하죠.
      </p>
      <p style={body}>
        두 번째는 등록 없이 몰래 영업하는 경우예요. 사업자등록을 안 하고 현금 거래만 하면 괜찮을 거라고 생각하지만, 사업주가 비용 처리를 위해 지급 내역을 신고하면 결국 드러나요. 제보로 적발되는 사례도 많죠. 국세청 소득 자료, 4대보험 자료가 자동으로 연계돼요.
      </p>
      <p style={body}>
        부정수급이 확정되면 타격이 커요. 이미 받은 급여 전액 반환 + 최대 5배 추가 징수예요. 예를 들어 100만원을 부정수급했으면 최대 600만원을 내야 하는 거죠. 여기에 남은 실업급여도 전액 중단돼요. 신고 한 번이면 피할 수 있는 일인데, 아까워서 안 하면 훨씬 더 큰 금액을 잃게 돼요.
      </p>

      <GreenBox title="부정수급 피하는 핵심">
        사업자등록 → 즉시 취업 신고<br />
        등록 없이 영업 시작 → 즉시 취업 신고<br />
        소득 발생 → 실업인정일에 신고<br />
        <strong>신고만 하면 부정수급이 아니에요.</strong>
      </GreenBox>

      <Divider />

      {/* 섹션 5 — 실전 체크리스트 */}
      <H2>창업할 때 실업급여 관련 체크리스트</H2>
      <p style={body}>
        타이밍이 핵심이에요. 창업 준비 기간을 최대한 활용하면서, 소정급여일수의 절반 이상을 남긴 시점에 등록하는 게 가장 유리하죠. 아래 순서대로 진행하면 실업급여와 조기재취업수당을 모두 챙길 수 있어요.
      </p>

      <SectionBadge>순서대로 체크하세요</SectionBadge>
      <Checklist items={CHECKLIST} />

      <p style={body}>
        조기재취업수당 신청은 사업자등록 후 12개월이 지난 뒤에 하는 거예요. 12개월 동안 사업을 영위했다는 증빙(매출 내역, 세금 신고 자료 등)을 함께 제출해야 하죠. 고용24에서 온라인으로 신청할 수 있어요.
      </p>
      <p style={body}>
        실업급여 신청 전부터 준비하던 사업은 조기재취업수당 대상에서 제외될 수 있어요. 실업급여 수급이 시작된 이후에 창업을 결심한 경우에만 해당되죠. 이전부터 준비 중이었다면 고용센터에 먼저 상담하는 게 안전해요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        실업급여와 창업에 관해 실제로 많이 물어보시는 내용만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니, 최신 기준은 고용24(ei.go.kr)나 고용센터(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
