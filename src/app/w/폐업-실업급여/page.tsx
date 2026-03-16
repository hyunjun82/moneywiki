"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body, Calculator,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR } from "@/data/실업급여-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "자영업자 고용보험에 가입한 지 1년 이상이에요" },
  { id: "c2", label: "비자발적 폐업이에요 (매출 급감, 적자 지속 등)" },
  { id: "c3", label: "사업자등록 폐업 처리를 완료했어요" },
  { id: "c4", label: "재취업 또는 재창업 의사가 있어요" },
];

// 자영업자 기준보수등급별 1일 보수액 (2026년 기준)
const GRADE_DAILY: Record<number, number> = {
  1: 57_600,
  2: 64_000,
  3: 70_400,
  4: 80_000,
  5: 96_000,
  6: 112_000,
  7: 128_000,
};

function getDaysSelf(years: number): number {
  if (years < 1) return 120;
  if (years < 3) return 120;
  if (years < 5) return 150;
  if (years < 10) return 180;
  return 210;
}

function getDailySelf(grade: number): number {
  const base = GRADE_DAILY[grade] ?? 57_600;
  return Math.round(base * 0.6);
}

const CALC_SLIDERS = [
  { id: "grade", label: "기준보수등급 (1~7등급)", min: 1, max: 7, step: 1, defaultValue: 3, format: (v: number) => `${v}등급 (일 ${(GRADE_DAILY[v] ?? 57600).toLocaleString()}원)` },
  { id: "years", label: "고용보험 가입기간", min: 1, max: 15, step: 1, defaultValue: 3, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "1일 수급액 (기준보수 x 60%)",
    getValue: (v: Record<string, number>) => getDailySelf(v.grade),
    format: (v: number) => `${v.toLocaleString()}원`,
  },
  {
    label: "수급기간",
    getValue: (v: Record<string, number>) => getDaysSelf(v.years),
    format: (v: number) => `${v}일 (약 ${Math.round(v / 30)}개월)`,
  },
  {
    label: "예상 총 수령액",
    getValue: (v: Record<string, number>) => getDailySelf(v.grade) * getDaysSelf(v.years),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
];

const CHECKLIST = [
  "고용24에서 자영업자 고용보험 가입기간 확인 (1년 이상인지)",
  "급여명세서, 근로계약서, 통장 내역 등 재직 증빙서류 보관",
  "밀린 월급이 있으면 임금체불 내역 정리 (체당금 신청 대비)",
  "이직확인서가 고용24에 올라왔는지 확인",
  "수급자격 신청자 온라인 교육 이수 (약 1시간)",
];

const FAQS = [
  {
    q: "자영업자 고용보험에 가입한 적이 없으면 폐업해도 실업급여를 못 받나요?",
    a: "맞아요. 자영업자는 고용보험 임의가입이라서, 가입하지 않았으면 실업급여 대상이 아니에요. 직원을 고용한 적이 있고 본인도 근로자로 등록했다면 별도로 확인해 볼 수 있죠.",
  },
  {
    q: "매출이 줄어서 폐업하려는데, 비자발적 폐업으로 인정되나요?",
    a: "6개월 연속 적자이거나 매출이 전년 대비 30% 이상 감소했다면 비자발적 폐업으로 인정돼요. 세무 증빙(부가세 신고서, 매출 장부 등)을 준비하세요.",
  },
  {
    q: "폐업 신고는 어디서 하나요?",
    a: "국세청 홈택스에서 사업자등록 폐업 신고를 해요. 폐업일 기준 25일 이내에 부가가치세 확정신고도 함께 해야 하죠.",
  },
  {
    q: "폐업 후 재창업하면 실업급여가 중단되나요?",
    a: "재창업하면 실업급여 수급이 중단돼요. 다만 수급기간이 절반 이상 남아있을 때 창업하면 조기재취업수당을 받을 수 있으니 고용센터에 확인해 보세요.",
  },
  {
    q: "직원들의 실업급여는 어떻게 되나요?",
    a: "사업주가 폐업하면 직원들은 비자발적 퇴사로 인정돼요. 고용보험 가입기간 180일 이상이면 일반 근로자 기준으로 실업급여를 받을 수 있죠. 사업주가 이직확인서를 발급해줘야 해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법 — 자영업자 고용보험 가입 및 실업급여", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "임금채권보장법 — 체당금 지급 기준", url: "https://www.law.go.kr/법령/임금채권보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24 — 자영업자 실업급여 신청", url: "https://www.ei.go.kr" },
      { label: "근로복지공단 — 체당금 신청 안내", url: "https://www.comwel.or.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "자영업자-실업급여",
    title: "자영업자 실업급여 조건과 신청방법",
    description: "자영업자도 고용보험에 가입했으면 폐업 시 실업급여를 받을 수 있어요.",
  },
  {
    slug: "실업급여-폐업",
    title: "실업급여 폐업 사유 인정 기준",
    description: "폐업으로 인한 실업급여 수급자격 인정 기준을 정리했어요.",
  },
  {
    slug: "실업급여-창업",
    title: "실업급여 받으면서 창업할 수 있을까?",
    description: "실업급여 수급 중 창업하면 조기재취업수당을 받을 수 있어요.",
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
          currentSlug="폐업-실업급여"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 자영업자 · 폐업</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        회사 폐업으로 갑자기 퇴직?<br />
        실업급여 신청 절차와 서류
      </h1>

      <p style={{ ...body, fontSize: 16, lineHeight: 2.1 }}>
        &quot;가게 접으면 그냥 끝인 줄 알았어요.&quot;
      </p>
      <p style={body}>
        자영업자도 실업급여를 받을 수 있죠.
        단, 일반 근로자처럼 자동 가입이 아니라 <strong>본인이 직접 고용보험에 가입</strong>했어야 하죠.
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>이 정한 조건은 두 가지예요 — 가입기간 1년 이상, 그리고 비자발적 폐업.
      </p>
      <p style={body}>
        내가 해당되는지, 얼마를 받을 수 있는지 아래에서 바로 확인해 보세요.
        폐업 후 챙겨야 할 서류와 직원들 정리까지 한꺼번에 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 — 자영업자 고용보험 구조 + 자격 체크 */}
      <H2>신청 절차 전에 고용보험 가입 여부부터 확인해야 하나요?</H2>
      <SectionBadge>핵심 개념</SectionBadge>
      <p style={body}>
        자영업자 고용보험은 &quot;임의가입&quot;이에요. 일반 근로자와 다르게, <strong>본인이 직접 신청</strong>해야만 가입되는 구조죠. 가입한 적이 없으면 아무리 오래 사업을 운영했어도 실업급여를 받을 수 없어요.
      </p>
      <p style={body}>
        가입 시점에 <strong>기준보수등급(1~7등급)</strong>을 직접 선택하게 돼요. 등급이 올라갈수록 보험료 부담은 커지지만, 폐업했을 때 받는 급여도 늘어나죠. 보험료율은 기준보수의 2.25%이고, 전액 본인 부담이에요. 근로자처럼 사업주가 절반을 대신 내주는 구조가 아니에요.
      </p>
      <p style={body}>
        가입 여부가 헷갈린다면 <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 바로 조회할 수 있죠. 가입기간까지 한눈에 나오니까, 폐업을 결정하기 전에 가입 상태부터 점검하세요. 아래 체크리스트로 내 상황을 먼저 확인해 보세요.
      </p>

      <GreenBox title="나의 수급자격 체크">
        4가지를 모두 충족하면 자영업자 실업급여를 신청할 수 있죠.
      </GreenBox>
      <EligibilityChecker items={CHECK_ITEMS} />

      <Divider />

      {/* 섹션 2 — 수급 조건 + 계산기 */}
      <H2>서류를 준비하기 전에 수급 조건이 되나요?</H2>
      <p style={body}>
        핵심 조건 두 가지를 넘어야 해요. 첫째, <strong>고용보험 가입기간 1년(12개월) 이상</strong>이에요. 일반 근로자는 180일이면 되는데, 자영업자는 기준이 더 높죠. 11개월까지 냈어도 1년을 못 채우면 수급 대상에서 빠져요.
      </p>
      <p style={body}>
        둘째, <strong>비자발적 폐업</strong>이어야 해요. &quot;업종을 전환하겠다&quot;거나 &quot;다른 사업을 시작하려고&quot; 접는 건 자발적 폐업이라 해당이 안 되죠. 매출이 전년 대비 30% 이상 급감했거나, 6개월 연속 적자이거나, 건강이 악화됐거나 — 이런 게 비자발적 폐업 사유로 인정돼요.
      </p>
      <p style={body}>
        두 조건 외에 하나 더 챙겨야 할 게 있죠. <strong>사업자등록 폐업 처리가 완료</strong>된 상태여야 신청이 가능해요. 국세청 홈택스에서 폐업 신고를 먼저 해야 하고, 폐업 후에는 재취업이나 재창업 의사가 있다는 걸 고용센터에 보여줘야 하고요.
      </p>

      <BorderBox title="자영업자 vs 일반 근로자 수급 조건 비교">
        <strong>[자영업자]</strong><br />
        고용보험 가입 1년 이상 / 비자발적 폐업 / 재취업·재창업 의사<br /><br />
        <strong>[일반 근로자]</strong><br />
        퇴직 전 18개월 내 180일 이상 / 비자발적 퇴사 / 재취업 의사
      </BorderBox>

      <Calculator
        title="자영업자 폐업 실업급여 계산기"
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 자영업자 실업급여는 기준보수등급에 따라 금액이 결정돼요. 일반 근로자 계산 방식(평균임금 60%)과 다르니 주의하세요."
      />

      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 — 신청 절차 + 체크리스트 */}
      <H2>폐업 후 신청 절차와 필요한 서류</H2>
      <SectionBadge>신청 절차</SectionBadge>
      <p style={body}>
        첫 번째 할 일은 국세청 <a href="https://www.hometax.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>홈택스</a>에서 사업자등록 폐업 신고를 하는 거예요. 폐업일이 확정돼야 고용보험 상실 처리가 진행되죠. 폐업일 기준 25일 이내에 부가가치세 확정신고까지 함께 해야 해요.
      </p>
      <p style={body}>
        폐업 처리가 완료됐으면 <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 수급자격 신청자 온라인 교육(약 1시간)을 이수하세요. 그다음 관할 고용센터에 직접 방문해서 수급자격 인정을 신청하면 돼요. 이때 비자발적 폐업을 증명할 서류 — 매출 감소 증빙이나 건강진단서 같은 걸 같이 내야 하죠.
      </p>
      <p style={body}>
        심사를 통과하면 4주마다 실업인정일에 구직활동을 보고하고 급여를 수령하는 구조예요. 자영업자 특이한 점이 하나 있는데, 재창업 준비 활동도 <a href="/w/실업급여-구직활동-횟수" style={{ color: "#1D9E75", textDecoration: "underline" }}>구직활동으로 인정</a>받을 수 있다는 거예요. <a href="/w/실업급여-창업" style={{ color: "#1D9E75", textDecoration: "underline" }}>창업 교육 수강</a>이나 사업계획서 작성이 여기에 해당되죠. 고용센터 상담사에게 어떤 활동이 인정되는지 미리 물어보는 게 좋아요.
      </p>

      <Checklist items={CHECKLIST} />

      <Divider />

      {/* 섹션 4 — 수급기간과 금액 */}
      <H2>신청 절차 이후 수급액과 지급 기간</H2>
      <p style={body}>
        일반 근로자보다 수급기간이 짧은 편이에요. 가입기간 1년 이상~3년 미만이면 <strong>120일</strong>, 3~5년이면 150일, 5~10년이면 180일, 10년 이상이면 최대 <strong>210일</strong>까지 받을 수 있죠. 일반 근로자와 달리 나이는 영향을 주지 않고, 가입기간만으로 결정돼요.
      </p>
      <p style={body}>
        1일 수급액은 <strong>본인이 선택한 기준보수의 60%</strong>예요. 3등급(일 70,400원)으로 가입했다면 하루에 42,240원, 월 약 127만원이 나오죠. 7등급(일 128,000원)이었다면 하루 76,800원, 월 약 230만원이에요. 등급 차이가 월 100만원 넘게 벌어지는 거예요.
      </p>
      <p style={body}>
        이 구조를 알면 하나가 보이죠. 사업이 안정적일 때 등급을 올려놓는 게 보험 차원에서 훨씬 유리해요. 보험료가 좀 더 나가더라도, 폐업이라는 최악의 상황에서 받는 금액이 크게 달라지니까요. 지금 가입 중이라면 등급 변경을 한번 검토해 보세요.
      </p>

      <BorderBox title="자영업자 수급기간 (나이 무관, 가입기간 기준)">
        1년 이상~3년 미만 → 120일<br />
        3년 이상~5년 미만 → 150일<br />
        5년 이상~10년 미만 → 180일<br />
        10년 이상 → 210일
      </BorderBox>

      <Divider />

      {/* 섹션 5 — 체당금과 직원 실업급여 */}
      <H2>서류 정리와 체당금 신청을 동시에 진행하세요</H2>
      <p style={body}>
        폐업하면서 직원들에게 임금을 다 못 준 경우가 많죠. 이런 상황에서 쓸 수 있는 제도가 <strong>체당금</strong>이에요. <a href="https://www.law.go.kr/법령/임금채권보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>임금채권보장법</a>에 따라 <a href="https://www.comwel.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로복지공단</a>이 사업주 대신 밀린 임금을 지급해주는 거예요.
      </p>
      <p style={body}>
        체당금은 두 종류로 나뉘어요. <strong>소액체당금</strong>(간이대지급금)은 400만원 이하 소액 체불에 적용되고, <strong>일반 체당금</strong>은 도산 기업(폐업·파산)의 체불임금에 적용되죠. 두 경우 모두 직원이 근로복지공단에 직접 신청하는 방식이에요.
      </p>
      <p style={body}>
        사업주 입장에서 마지막으로 반드시 챙겨야 할 게 하나 남았어요. 직원들의 <strong>이직확인서 발급</strong>이죠. 고용보험 상실신고와 이직확인서 제출은 사업주 의무예요. 이걸 안 하면 직원들이 실업급여를 신청할 수 없어서 고용센터에서 사업주를 추적하게 돼요. 폐업 정리와 함께 깔끔하게 처리하세요.
      </p>

      <GreenBox title="폐업 시 사업주가 처리할 것">
        1. 사업자등록 폐업 신고 (홈택스)<br />
        2. 직원 고용보험 상실신고 + 이직확인서 발급<br />
        3. 체불임금이 있으면 근로복지공단 체당금 안내<br />
        4. 본인 자영업자 고용보험 실업급여 신청
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        자영업자 폐업과 실업급여에 대해 실제로 많이 물어보는 내용만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법과 임금채권보장법을 바탕으로 작성됐어요. 자영업자 실업급여는 가입 등급과 폐업 사유에 따라 달라지니, 고용센터(1350)에 사전 상담을 받아보세요." />
    </ArticleLayout>
  );
}
