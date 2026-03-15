"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body, Calculator,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR } from "@/data/실업급여-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "소정급여일수의 절반 이상 남긴 상태에서 취업했어요" },
  { id: "c2", label: "12개월 이상 고용이 유지되고 있어요 (또는 유지할 예정)" },
  { id: "c3", label: "이전 직장(실업급여 받기 전 회사)에 복귀한 게 아니에요" },
  { id: "c4", label: "1년 이상 계속 근무할 수 있는 직장이에요" },
];

const CALC_SLIDERS = [
  { id: "totalDays", label: "소정급여일수", min: 120, max: 270, step: 30, defaultValue: 180, format: (v: number) => `${v}일` },
  { id: "usedDays", label: "이미 받은 일수", min: 0, max: 200, step: 10, defaultValue: 40, format: (v: number) => `${v}일` },
  { id: "dailyPay", label: "1일 구직급여액", min: 66048, max: 68100, step: 100, defaultValue: 66048, format: (v: number) => `${v.toLocaleString()}원` },
];

const CALC_RESULTS = [
  {
    label: "남은 소정급여일수",
    getValue: (v: Record<string, number>) => Math.max(0, v.totalDays - v.usedDays),
    format: (v: number) => `${v}일`,
  },
  {
    label: "절반 기준 충족",
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
  "고용24(ei.go.kr)에서 소정급여일수와 남은 일수 확인",
  "취업 후 12개월 이상 고용 유지 (자영업은 12개월 사업 영위)",
  "12개월 경과 후 3개월 이내에 조기재취업수당 신청",
  "재직증명서 또는 고용보험 가입확인서 준비",
  "고용24 → 취업촉진수당 → 조기재취업수당 신청",
];

const FAQS = [
  {
    q: "조기재취업수당은 정확히 뭔가요?",
    a: "빨리 취업한 사람에게 주는 보너스예요. 남은 소정급여일수의 50%를 일시금으로 한 번에 받죠. 빨리 취업할수록 금액이 커지는 구조예요.",
  },
  {
    q: "자영업(창업)도 받을 수 있나요?",
    a: "받을 수 있죠. 사업자등록 후 12개월 이상 사업을 영위하면 신청 자격이 생겨요. 12개월 전에 폐업하면 자격이 사라지니 주의하세요.",
  },
  {
    q: "이전 직장에 다시 들어가면 받을 수 있나요?",
    a: "안 돼요. 실업급여를 받기 전에 다니던 회사에 복귀하면 조기재취업수당 대상이 아니에요. 새로운 직장이어야 하죠.",
  },
  {
    q: "12개월 안에 퇴사하면 어떻게 되나요?",
    a: "조기재취업수당 자격이 사라져요. 12개월 이상 고용 유지가 핵심 조건이니까요. 다만 회사 사정(정리해고, 폐업 등)으로 퇴사한 경우에는 예외가 적용될 수 있어요.",
  },
  {
    q: "신청 기한을 놓치면 어떡하나요?",
    a: "12개월 고용 후 3개월 이내에 신청해야 해요. 기한을 넘기면 받을 수 없죠. 12개월이 되는 날짜를 미리 체크해두세요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법 제64조 — 조기재취업수당 요건 및 금액", url: "https://www.law.go.kr/법령/고용보험법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24 — 조기재취업수당 신청", url: "https://www.ei.go.kr" },
      { label: "고용센터 — 취업촉진수당 안내", url: "https://www.ei.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "실업급여-창업",
    title: "실업급여 받으면서 창업 시 수급 조건",
    description: "창업해도 조기재취업수당을 받을 수 있죠. 사업자등록 시점과 수급 중단 기준을 정리했어요.",
  },
  {
    slug: "실업급여-취업촉진수당",
    title: "실업급여 취업촉진수당 종류",
    description: "조기재취업수당 외에 광역구직활동비, 이주비 등 다른 취업촉진수당도 확인하세요.",
  },
  {
    slug: "실업급여-모의계산",
    title: "실업급여 모의계산 월급별 금액",
    description: "본인의 소정급여일수와 1일 구직급여액을 먼저 확인해보세요.",
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
          currentSlug="실업급여-조기재취업수당"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 조기재취업수당</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        실업급여 조기재취업수당 조건과 금액<br />
        남은 급여 50% 받는 법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "실업급여 받다가 취업했는데, 남은 기간이 그냥 사라지는 건가요?"<br />
        아니에요. <strong>조기재취업수당</strong>으로 남은 급여의 50%를 한꺼번에 받을 수 있죠.<br /><br />
        빨리 취업할수록 남은 일수가 많으니까 수당이 커지는 구조예요.
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 제64조</a>에서 정한 조건과 금액을 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 — 조기재취업수당이란 */}
      <H2>조기재취업수당이 뭔가요?</H2>
      <p style={body}>
        빨리 취업한 사람에게 주는 보상이에요. 실업급여를 오래 받으면서 천천히 구직하는 것보다, 빨리 재취업하는 게 본인에게도 사회에도 이득이니까요. 남은 소정급여일수의 <strong>50%를 일시금</strong>으로 한 번에 지급하죠.
      </p>
      <p style={body}>
        예를 들어볼게요. 소정급여일수 180일인 사람이 40일만 받고 취업했어요. 1일 구직급여가 66,048원이라면, 남은 140일 × 66,048원 × 50% = <strong>약 462만원</strong>이에요. 빨리 취업할수록 남은 일수가 많으니까 금액이 커지는 구조죠.
      </p>
      <p style={body}>
        단, 취업하자마자 바로 받는 게 아니에요. <strong>12개월 이상 고용이 유지</strong>된 후에 신청할 수 있어요. 안정된 직장에 취업했는지를 확인하는 거예요. 12개월 안에 퇴사하면 수당 자격이 사라지죠.
      </p>

      <GreenBox title="조기재취업수당 핵심 요약">
        소정급여일수의 <strong>절반 이상 남기고</strong> 취업<br />
        <strong>12개월 이상</strong> 고용 유지 후 신청<br />
        남은 일수 × 1일 구직급여 × <strong>50%</strong> 일시금 지급
      </GreenBox>

      <SectionBadge>내 상황에 해당되는지 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="4가지 다 해당되네요. 12개월 고용 유지 후 3개월 이내에 신청하세요."
        partialMatchText="일부만 해당돼요. 나머지 조건도 확인하고 고용센터(1350)에 상담해보세요."
      />

      <Divider />

      {/* 섹션 2 — 조건 상세 */}
      <H2>조기재취업수당 조건, 정확히 뭘 충족해야 하나요?</H2>
      <p style={body}>
        네 가지 조건을 모두 충족해야 해요. 첫째, <strong>소정급여일수의 절반 이상</strong>을 남긴 상태에서 취업해야 해요. 180일 수급 기간이면 90일 이상 남았을 때 취업해야 하는 거죠. 절반 미만만 남았으면 해당 안 돼요.
      </p>
      <p style={body}>
        둘째, <strong>1년 이상 계속 근무</strong>할 수 있는 안정된 직장이어야 해요. 3개월짜리 단기 계약직이나 일용 알바는 대상이 아니에요. 정규직, 무기계약직, 또는 1년 이상 계약직이 해당되죠. 자영업(창업)도 대상이에요.
      </p>
      <p style={body}>
        셋째, <strong>12개월 이상 실제로 고용이 유지</strong>돼야 해요. 조건을 갖추고 취업했어도 12개월 안에 퇴사하면 수당을 받을 수 없죠. 넷째, <strong>이전 직장 복귀는 안 돼요</strong>. 실업급여를 받기 전에 다니던 회사에 다시 들어가는 건 조기재취업수당 대상이 아니에요.
      </p>

      <BorderBox title="자영업(창업)도 받을 수 있나요?">
        네, 받을 수 있어요. 사업자등록 후 <strong>12개월 이상 사업을 영위</strong>하면 신청 자격이 생겨요.<br />
        12개월 안에 폐업하면 자격이 사라지니 주의하세요.<br />
        실업급여 수급 시작 전부터 준비하던 사업은 대상에서 제외될 수 있어요.
      </BorderBox>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 — 금액 계산 */}
      <H2>조기재취업수당은 얼마나 받나요?</H2>
      <p style={body}>
        계산 방법은 간단해요. <strong>남은 소정급여일수 × 1일 구직급여액 × 50%</strong>예요. 소정급여일수 180일인 사람이 60일만 받고 취업하면, 남은 120일 × 68,100원(2026년 상한) × 50% = <strong>약 409만원</strong>이에요.
      </p>
      <p style={body}>
        빨리 취업할수록 금액이 커져요. 같은 조건에서 30일만 받고 취업하면 남은 150일 × 68,100원 × 50% = 약 511만원이에요. 30일 차이로 100만원 넘게 달라지죠. 그래서 재취업 결정이 섰다면 미루지 않는 게 유리해요.
      </p>

      <SectionBadge>예상 금액 계산해보세요</SectionBadge>
      <Calculator
        title="조기재취업수당 예상 금액"
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 추정치예요. 정확한 금액은 고용24(ei.go.kr)에서 확인하세요. 2026년 상한 68,100원 / 하한 66,048원 기준."
      />

      <Divider />

      {/* 섹션 4 — 신청 방법 */}
      <H2>어떻게 신청하나요?</H2>
      <p style={body}>
        <strong>12개월 이상 고용된 후</strong>에 신청해요. 취업하자마자 바로 하는 게 아니에요. 1년 넘게 안정적으로 다녔다는 걸 증명해야 하니까요. 신청 기한은 <strong>12개월 고용 후 3개월 이내</strong>예요. 기한을 넘기면 받을 수 없으니 날짜를 반드시 체크해두세요.
      </p>
      <p style={body}>
        <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 온라인으로 신청할 수 있어요. 로그인 → "취업촉진수당" → "조기재취업수당 신청"으로 들어가면 되죠. 재직증명서나 고용보험 가입확인서 등 12개월 이상 근무했다는 증빙이 필요해요.
      </p>
      <p style={body}>
        고용센터에 직접 방문해서 신청해도 돼요. 온라인 신청이 어렵다면 고용센터(1350)에 전화해서 안내를 받으세요. 신청 후 심사를 거쳐 승인되면 일시금으로 통장에 입금되죠.
      </p>

      <SectionBadge>신청 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* 섹션 5 — 주의사항 */}
      <H2>놓치기 쉬운 주의사항</H2>
      <p style={body}>
        가장 큰 실수는 <strong>12개월을 못 채우고 퇴사하는 거</strong>예요. 11개월 29일에 퇴사하면 조기재취업수당 자격이 사라져요. 회사 사정(정리해고, 폐업)으로 어쩔 수 없이 퇴사한 경우에는 예외가 적용될 수 있지만, 자발적 퇴사라면 무조건 12개월을 채워야 하죠.
      </p>
      <p style={body}>
        두 번째 실수는 <strong>신청 기한을 놓치는 거</strong>예요. 12개월 고용 후 3개월 이내에 신청해야 해요. 바쁘다고 미루다가 3개월이 지나면 수백만원을 받을 수 없게 돼요. 취업 후 12개월이 되는 날짜를 캘린더에 표시해두는 걸 추천하죠.
      </p>
      <p style={body}>
        세 번째, <strong>이전 직장 복귀</strong>를 확인하세요. 실업급여 받기 직전에 다니던 회사 계열사나 관련 회사에 재입사하면 조기재취업수당이 거부될 수 있어요. "새로운 직장"이어야 한다는 조건을 놓치는 분들이 의외로 많죠.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        조기재취업수당에 대해 실제로 많이 물어보시는 내용만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니, 최신 기준은 고용24(ei.go.kr)나 고용센터(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
