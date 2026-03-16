"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body, Calculator,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR } from "@/data/실업급여-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "기간제 교사(비정규직)로 근무했어요" },
  { id: "c2", label: "급여명세서에서 고용보험료가 공제되고 있어요" },
  { id: "c3", label: "계약 만료 또는 비자발적으로 퇴직했어요" },
  { id: "c4", label: "퇴직 전 18개월 중 피보험기간 180일 이상이에요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "퇴직 전 월 평균임금", min: 150, max: 500, step: 10, defaultValue: 250, format: (v: number) => `${v}만원` },
  { id: "age", label: "퇴직 시 나이", min: 25, max: 65, step: 1, defaultValue: 35, format: (v: number) => `${v}세` },
  { id: "years", label: "고용보험 가입기간", min: 1, max: 15, step: 1, defaultValue: 3, format: (v: number) => `${v}년` },
];

function getDays(age: number, years: number): number {
  if (age >= 50) {
    if (years < 1) return 120;
    if (years < 3) return 180;
    if (years < 5) return 210;
    if (years < 10) return 240;
    return 270;
  }
  if (years < 1) return 120;
  if (years < 3) return 150;
  if (years < 5) return 180;
  if (years < 10) return 210;
  return 240;
}

const CALC_RESULTS = [
  {
    label: "1일 수급액",
    getValue: (v: Record<string, number>) => {
      const daily = Math.round((v.salary * 10000 * 0.6) / 30);
      return Math.max(66048, Math.min(68100, daily));
    },
    format: (v: number) => `${v.toLocaleString()}원`,
  },
  {
    label: "수급기간",
    getValue: (v: Record<string, number>) => getDays(v.age, v.years),
    format: (v: number) => `${v}일 (약 ${Math.round(v / 30)}개월)`,
  },
  {
    label: "예상 총 수령액",
    getValue: (v: Record<string, number>) => {
      const daily = Math.max(66048, Math.min(68100, Math.round((v.salary * 10000 * 0.6) / 30)));
      return daily * getDays(v.age, v.years);
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
];

const CHECKLIST = [
  "고용보험 가입 여부 확인 (급여명세서에서 고용보험료 공제 확인)",
  "고용24(ei.go.kr)에서 피보험 이력 조회",
  "이직확인서에 퇴직 사유가 정확히 기재되었는지 확인",
  "퇴직 후 고용24에서 온라인 교육 수강",
  "수급자격 인정 신청서 제출",
];

const FAQS = [
  {
    q: "공립학교 기간제 교사도 실업급여를 받을 수 있나요?",
    a: "받을 수 있죠. 기간제 교사는 공립이든 사립이든 공무원이 아니에요. 고용보험에 가입되고 피보험기간 180일 이상이면 계약 만료 시 실업급여 대상이에요.",
  },
  {
    q: "사립학교 교사가 본인이 먼저 퇴사하면요?",
    a: "자발적 퇴사는 원칙적으로 실업급여 대상이 아니에요. 다만 임금체불이나 괴롭힘 같은 정당한 사유가 있으면 인정받을 수 있죠.",
  },
  {
    q: "방학 기간에 무급이었으면 피보험기간에 포함되나요?",
    a: "무급 기간은 피보험기간에 산입되지 않아요. 기간제 교사로 1년 계약했더라도 방학 기간이 무급이면 180일이 안 될 수 있으니 고용24에서 꼭 조회해보세요.",
  },
  {
    q: "학원 강사도 실업급여 대상이에요?",
    a: "고용보험에 가입돼 있으면 대상이에요. 주 15시간 이상 근무하거나 3개월 이상 계속 근무했으면 고용보험 가입 대상이죠. 급여명세서에서 고용보험료 공제 여부를 먼저 살펴보세요.",
  },
  {
    q: "기간제 교사인데 학교에서 재계약을 제의했어요. 거절하면 실업급여를 못 받나요?",
    a: "거절하면 자발적 퇴사로 볼 수 있어서 실업급여가 어려워요. 다만 재계약 조건이 기존보다 현저히 불리하면(임금 삭감, 근무지 변경 등) 정당한 사유로 인정될 수 있죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법 — 피보험자격 및 수급자격", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "교육공무원법 — 교육공무원의 신분", url: "https://www.law.go.kr/법령/교육공무원법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24 — 실업급여 신청 안내", url: "https://www.ei.go.kr" },
      { label: "고용노동부 — 고용보험 가입 대상 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "공무원-실업급여",
    title: "공무원 실업급여 받을 수 있을까?",
    description: "공무원은 고용보험 대상이 아니지만, 예외적으로 받을 수 있는 경우가 있죠.",
  },
  {
    slug: "계약만료-실업급여",
    title: "계약만료 퇴직 시 실업급여",
    description: "계약 만료는 비자발적 퇴사로 인정돼요. 기간제 교사에게 가장 흔한 경우예요.",
  },
  {
    slug: "기간제-실업급여",
    title: "기간제 근로자 실업급여 조건",
    description: "기간제 근로자의 실업급여 수급 조건과 신청 방법을 정리했어요.",
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
          currentSlug="교사-실업급여"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 교사</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        기간제 교사 실업급여, 받을 수 있을까?<br />
        유형별 수급 조건
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;선생님인데 퇴직하면 실업급여를 받을 수 있나요?&rdquo;<br />
        교사 유형에 따라 달라요. <strong>공무원 신분</strong>이면 고용보험 대상이 아니라 실업급여를 못 받죠.
        하지만 사립학교 교사, 기간제 교사, 강사는 <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>에 따라 고용보험에 가입돼 있으면 받을 수 있어요.
        기간제 교사는 계약 만료 시 실업급여 대상이고, 2026년 기준 1일 하한액이 <strong>66,048원</strong>이에요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 — 교사 유형별 실업급여 대상 여부 */}
      <H2>유형별로 수급 조건이 어떻게 다른가요?</H2>
      <p style={body}>
        교사라고 해서 전부 같은 신분이 아니에요. <strong>공립학교 정교사</strong>는 임용시험을 거쳐 임용된 <a href="https://www.law.go.kr/법령/교육공무원법" style={{ color: "#1D9E75", textDecoration: "underline" }}>교육공무원</a>이에요. 공무원은 고용보험에 가입하지 않고, 고용보험료도 내지 않아요. 그래서 실업급여 자체가 적용되지 않죠.
      </p>
      <p style={body}>
        반면 <strong>사립학교 교사</strong>는 민간 근로자예요. 학교법인에 소속된 직원이라 고용보험 가입 대상이죠. 급여명세서에서 고용보험료가 빠져나가고 있다면 이미 가입된 상태고요. 비자발적으로 퇴직하면 실업급여를 신청할 수 있어요.
      </p>
      <p style={body}>
        <strong>기간제 교사</strong>는 공립이든 사립이든 상관없이 고용보험 가입 대상이에요. 공무원이 아닌 계약직 신분이니까요. 계약 기간이 끝나면 비자발적 퇴사로 인정돼서 실업급여를 받을 수 있죠.
      </p>

      <GreenBox title="교사 유형별 실업급여 대상">
        공립학교 정교사 (공무원) → 실업급여 대상 아님, 공무원연금 수급<br />
        사립학교 교사 → 고용보험 가입 대상, 비자발적 퇴직 시 수급 가능<br />
        기간제 교사 (공립/사립) → 고용보험 가입 대상, 계약 만료 시 수급 가능<br />
        시간강사·학원 강사 → 고용보험 가입 시 수급 가능
      </GreenBox>

      <SectionBadge>내 상황에 해당되는지 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="4가지 다 해당되네요. 기간제 교사 실업급여 수급 자격을 갖췄어요. 고용센터에서 바로 신청하세요."
        partialMatchText="일부만 해당돼요. 나머지 조건도 확인해보고 고용센터(1350)에 상담해보세요."
      />

      <Divider />

      {/* 섹션 2 — 기간제 교사 실업급여 핵심 + 계산기 */}
      <H2>기간제 교사의 수급 조건은 무엇인가요?</H2>
      <p style={body}>
        기간제 교사에게 가장 중요한 건 <strong>피보험기간 180일</strong>이에요. 퇴직일 기준으로 최근 18개월 동안 고용보험에 가입된 기간이 180일 이상이어야 하죠. 1년 계약이면 보통 180일은 넘기지만, 방학 기간이 무급이었다면 빠질 수 있어요.
      </p>
      <p style={body}>
        계약 만료는 <strong>비자발적 퇴사</strong>로 인정돼요. 본인이 더 일하고 싶어도 학교에서 재계약을 안 해주면 나가야 하니까요. 그렇지만 학교에서 재계약을 제의했는데 본인이 거절한 경우라면 자발적 퇴사로 볼 수 있죠.
      </p>
      <p style={body}>
        피보험기간이 정확히 며칠인지는 <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 피보험 이력을 조회하면 바로 알 수 있어요. 퇴직 전에 미리 확인해두면 좋고, 모자라면 퇴직 시점을 조정하는 방법도 생각해볼 만하죠.
      </p>

      <SectionBadge>내 월급과 가입기간으로 계산해보세요</SectionBadge>
      <Calculator
        title="기간제 교사 실업급여 예상 수령액"
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 2026년 기준 1일 상한액 68,100원, 하한액 66,048원 적용. 실제 금액은 고용센터 심사에 따라 달라질 수 있어요."
      />

      <BorderBox title="기간제 교사 핵심 체크">
        피보험기간 180일 이상 → 고용24에서 조회<br />
        계약 만료 → 비자발적 퇴사 (실업급여 대상)<br />
        본인이 재계약 거부 → 자발적 퇴사 (수급 어려움)<br />
        방학 무급 기간 → 피보험기간에서 제외
      </BorderBox>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 — 사립학교 교사·강사 */}
      <H2>사립학교 교사와 강사의 수급 조건</H2>
      <p style={body}>
        사립학교 교사는 고용보험 가입 대상이지만, 실업급여를 받으려면 <strong>퇴직 사유</strong>가 중요해요. 비자발적 퇴사여야 하죠. 학교가 계약을 해지하거나, 경영상 이유로 권고사직한 경우에 해당돼요.
      </p>
      <p style={body}>
        본인이 먼저 사직서를 냈다면 원칙적으로 실업급여 대상이 아니에요. 그렇지만 임금체불이나 직장 내 괴롭힘 같은 정당한 사유가 있으면 자발적 퇴사여도 인정받을 수 있죠. 증빙자료를 미리 확보해두는 게 핵심이에요.
      </p>
      <p style={body}>
        <strong>시간강사나 학원 강사</strong>도 마찬가지예요. 주 15시간 이상 근무하거나 3개월 이상 계속 근무했으면 <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>상 가입 대상이에요. 급여명세서에서 고용보험료 공제 여부를 보면 바로 알 수 있죠.
      </p>

      <Divider />

      {/* 섹션 4 — 신청 방법 */}
      <H2>유형별 수급 조건 확인 후 신청 절차</H2>
      <p style={body}>
        일반 실업급여 신청 절차와 동일해요. 먼저 퇴직 후 <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 온라인 교육(수급자격 안정 취업활동 계획 사전교육)을 수강해야 하죠. 교육을 마친 뒤에 관할 고용센터에 방문해서 수급자격 인정 신청서를 제출하면 돼요.
      </p>
      <p style={body}>
        이직확인서는 학교에서 <a href="https://www.moel.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부</a>에 제출해야 해요. 기간제 교사라면 이직 사유가 &ldquo;계약 만료&rdquo;로 적히죠. 사립학교 교사가 권고사직을 당한 경우라면 &ldquo;경영상 이유에 의한 퇴직&rdquo;으로 기재돼요. 이직확인서 내용이 실제와 다르면 고용센터에 정정을 요청할 수 있고요.
      </p>
      <p style={body}>
        기간제 교사 중 2월 말에 계약이 끝나는 경우가 많죠. 그러면 3월부터 실업급여를 신청할 수 있어요. 여름방학 전에 계약이 종료되는 경우도 마찬가지로, 계약 종료 시점부터 신청이 가능하죠. 퇴직 후 12개월 이내에 신청해야 하니 미루지 마세요.
      </p>

      <SectionBadge>신청 전 준비사항</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* 섹션 5 — 공무원 교사의 대안 */}
      <H2>공무원 교사는 연금으로 갈아타세요</H2>
      <p style={body}>
        공립학교 정교사는 <strong>공무원연금</strong>을 받아요. 고용보험 대신 공무원연금에 가입돼 있죠. 재직 기간이 10년 이상이면 퇴직 후 연금을 수급할 수 있고, 10년 미만이면 퇴직일시금으로 받게 돼요.
      </p>
      <p style={body}>
        공무원연금 퇴직급여는 실업급여보다 금액이 큰 경우가 많아요. 재직 기간에 비례해서 금액이 늘어나기 때문이죠. 20년 이상 재직하면 매월 연금 형태로 받을 수 있어서, 노후 소득 보장 측면에서는 실업급여보다 훨씬 안정적이에요.
      </p>
      <p style={body}>
        다만 공무원연금은 퇴직 후 <strong>재취업 소득에 따라 감액</strong>될 수 있죠. 연금 수급 중에 일정 금액 이상의 소득이 발생하면 연금의 일부가 정지돼요. 이 부분은 <a href="https://www.geps.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>공무원연금공단</a>에서 상세 안내를 받을 수 있고요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        교사 실업급여에 대해 실제로 많이 물어보시는 내용만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법을 바탕으로 작성됐어요. 개별 사안의 인정 여부는 고용센터 심사에 따라 다르니, 사전 상담(1350)을 받아보세요." />
    </ArticleLayout>
  );
}
