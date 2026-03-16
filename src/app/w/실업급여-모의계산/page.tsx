"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body, Calculator,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR } from "@/data/실업급여-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "고용보험에 가입돼 있어요" },
  { id: "c2", label: "비자발적 퇴사예요 (권고사직, 계약만료 등)" },
  { id: "c3", label: "고용보험 가입기간 180일 이상이에요" },
  { id: "c4", label: "재취업 의사가 있고 구직활동이 가능해요" },
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

function getDaily(salary: number): number {
  const raw = Math.round((salary * 10000 * 0.6) / 30);
  return Math.max(66048, Math.min(68100, raw));
}

const CALC_SLIDERS = [
  { id: "salary", label: "퇴직 전 월 평균임금", min: 150, max: 700, step: 10, defaultValue: 300, format: (v: number) => `${v}만원` },
  { id: "age", label: "퇴직 시 나이", min: 25, max: 68, step: 1, defaultValue: 40, format: (v: number) => `${v}세` },
  { id: "years", label: "고용보험 가입기간", min: 1, max: 20, step: 1, defaultValue: 5, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "1일 수급액",
    getValue: (v: Record<string, number>) => getDaily(v.salary),
    format: (v: number) => `${v.toLocaleString()}원`,
  },
  {
    label: "수급기간",
    getValue: (v: Record<string, number>) => getDays(v.age, v.years),
    format: (v: number) => `${v}일 (약 ${Math.round(v / 30)}개월)`,
  },
  {
    label: "월 수령액 (30일 기준)",
    getValue: (v: Record<string, number>) => getDaily(v.salary) * 30,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
  {
    label: "예상 총 수령액",
    getValue: (v: Record<string, number>) => getDaily(v.salary) * getDays(v.age, v.years),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
];

const CHECKLIST = [
  "최근 3개월 급여명세서 준비 (없으면 홈택스 원천징수영수증)",
  "고용보험 가입기간 확인 (고용24 피보험자격 이력)",
  "퇴직 시 만 나이 확인 (50세 이상이면 수급기간 더 김)",
  "모의계산 결과 캡처 저장",
  "관할 고용센터 위치·연락처 확인 (1350)",
];

const FAQS = [
  {
    q: "월급 300만원이면 실업급여 얼마 받아요?",
    a: "300만원의 60%는 180만원인데, 2026년 하한액이 월 약 198만원이라 실제로는 198만원을 받게 돼요. 월급이 330만원 이하라면 대부분 하한액이 적용돼서 비슷한 금액을 받게 되죠.",
  },
  {
    q: "월급이 높으면 실업급여도 많이 받나요?",
    a: "상한이 걸려요. 2026년 기준 1일 최대 68,100원, 월로 치면 약 204만원이에요. 월급이 500만원이든 700만원이든 최대 204만원까지만 받아요. 고소득자일수록 실업급여 체감 금액은 적죠.",
  },
  {
    q: "모의계산 결과랑 실제 금액이 다를 수 있나요?",
    a: "다를 수 있죠. 모의계산은 입력한 정보만으로 단순 계산하는 거예요. 실제로는 보너스, 식대, 교통비 같은 항목이 평균임금에 포함될 수도 있고, 수급자격 심사 결과에 따라 달라지죠.",
  },
  {
    q: "고용보험 가입기간을 정확히 모르겠어요",
    a: "고용24(ei.go.kr)에 로그인하면 '피보험자격 이력내역'에서 각 직장별 가입 기간을 확인할 수 있죠. 공인인증서나 간편인증으로 로그인하면 돼요. 여러 직장이면 전부 합산하세요.",
  },
  {
    q: "자발적 퇴사인데 실업급여를 받을 수 있나요?",
    a: "원칙적으로 자발적 퇴사는 안 돼요. 하지만 임금체불, 직장 내 괴롭힘, 통근 불가 같은 정당한 사유가 있으면 비자발적 퇴사로 인정받을 수 있죠. 고용센터에서 퇴직 사유를 심사해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법 제46조 — 구직급여일액", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용보험법 제50조 — 구직급여의 수급 요건", url: "https://www.law.go.kr/법령/고용보험법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24 — 실업급여 모의계산", url: "https://www.ei.go.kr" },
      { label: "고용노동부 고객상담센터 (1350)", url: "https://1350.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "실업급여-나이제한",
    title: "실업급여 나이제한 65세 기준과 수급기간",
    description: "65세가 넘으면 못 받을까? 퇴직 나이가 아니라 고용보험 가입 시점이 기준이에요.",
  },
  {
    slug: "실업급여-최대금액",
    title: "실업급여 최대금액 2026년 상한액",
    description: "2026년 1일 상한액 68,100원, 월로 환산하면 약 204만원이에요. 월급이 아무리 높아도 이 금액을 넘을 수 없어요.",
  },
  {
    slug: "실업급여-한달-얼마-받나요",
    title: "실업급여 한 달에 얼마 받나요?",
    description: "월 수령액은 대부분 198~204만원 사이에요. 상한·하한 때문에 월급 차이가 크게 안 벌어지죠.",
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
          currentSlug="실업급여-모의계산"
        />
      }
    >
      {/* breadcrumb */}
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 모의계산</p>

      {/* h1 — 2줄 */}
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        실업급여 모의계산,<br />
        월급별 예상 금액과 상한·하한 기준
      </h1>

      {/* intro */}
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "퇴직하면 실업급여 얼마나 나올까?"<br />
        이게 제일 먼저 궁금하잖아요.<br /><br />
        계산 방식은 간단해요. <strong>퇴직 전 3개월 평균임금의 60%</strong>가 기본이에요.<br />
        근데 여기에 상한액·하한액이 걸려서 월급이 높다고 무한정 많이 받는 건 아니죠.<br />
        2026년 기준 1일 <strong>상한액 68,100원</strong>(월 약 204만원), <strong>하한액 66,048원</strong>(월 약 198만원)이에요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* ── 섹션 1 — 계산기 (메인 포커스) ── */}
      <H2>내 월급별 예상 금액은 얼마일까?</H2>
      <p style={body}>
        실업급여 금액은 세 가지로 결정돼요. 퇴직 전 월 평균임금, 퇴직 시 나이, 고용보험 가입기간이죠. 평균임금의 60%가 기본 계산인데, 2026년 기준으로 1일 상한액 68,100원과 하한액 66,048원이 적용돼요.
      </p>
      <p style={body}>
        쉽게 말하면 월급이 아무리 높아도 월 204만원이 최대고, 월급이 아무리 낮아도 월 198만원은 받아요. 상한과 하한 사이 폭이 좁기 때문에, 사실 대부분의 직장인은 월 198~204만원 사이에서 결정돼요. 차이는 수급기간에서 나죠.
      </p>
      <p style={body}>
        <strong>상한액 68,100원</strong>은 전체 근로자 평균임금의 60%에서 산출돼요. 매년 고용노동부가 고시하죠. <strong>하한액 66,048원</strong>은 최저시급 × 8시간 × 80%로 계산해요. 2026년 최저시급 10,320원 기준이에요. 이 두 금액이 사실상 대부분의 실업급여 수령액을 결정하는 셈이죠.
      </p>

      <GreenBox title="2026년 실업급여 핵심 수치">
        1일 상한액: 68,100원 (월 약 204만원)<br />
        1일 하한액: 66,048원 (월 약 198만원)<br />
        계산 공식: 퇴직 전 3개월 평균임금 × 60% ÷ 30일<br />
        대부분의 직장인은 월 198~204만원 사이예요
      </GreenBox>

      <SectionBadge>내 상황에 해당되는지 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="4가지 다 해당되네요. 실업급여 수급 자격을 갖췄어요. 아래 계산기로 예상 금액을 확인해보세요."
        partialMatchText="일부만 해당돼요. 나머지 조건도 확인해보고 고용센터(1350)에 상담해보세요."
      />

      <Divider />

      {/* ── 섹션 2 — 계산기 상세 + 결과 ── */}
      <H2>상한·하한 기준으로 실제 수급액이 어떻게 정해질까?</H2>
      <p style={body}>
        아래 계산기에서 월급, 나이, 가입기간을 조절하면 1일 수급액, 수급기간, 월 수령액, 총 수령액이 바로 나와요. 나이를 49세에서 50세로 바꿔보세요. 수급기간이 확 늘어나면서 총액도 크게 달라지죠.
      </p>
      <p style={body}>
        50세 이상은 재취업이 어려운 연령대라 <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>에서 수급기간을 더 길게 줘요. 같은 10년 가입 기준으로 49세는 최대 240일(약 8개월), 50세는 최대 270일(약 9개월)이에요. 이 30일 차이가 금액으로는 약 200만원이죠.
      </p>

      <SectionBadge>슬라이더를 움직여서 계산해보세요</SectionBadge>
      <Calculator
        title="실업급여 예상 수령액 계산"
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 2026년 기준 1일 상한액 68,100원, 하한액 66,048원 적용. 실제 금액은 고용센터 심사에 따라 달라질 수 있죠."
      />

      <p style={body}>
        월급 330만원이 분기점이에요. 이 이하면 하한액이 적용되고, 이 이상이면 상한액에 걸리죠. 그래서 월급 200만원이든 500만원이든 실업급여 금액 자체는 크게 차이가 안 나요. 진짜 차이를 만드는 건 수급기간이에요.
      </p>

      <BorderBox title="월급별 실업급여 정리 (2026년 기준)">
        월급 330만원 이하 → 하한액 적용, 월 약 198만원<br />
        월급 340만원 이상 → 상한액 적용, 월 약 204만원<br />
        핵심: 대부분 월 198~204만원 사이예요<br />
        차이를 만드는 건 수급기간 (나이 + 가입기간)
      </BorderBox>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* ── 섹션 3 — 수급기간별 총액 비교 ── */}
      <H2>가입기간과 나이별 예상 금액 총액 비교</H2>

      <SectionBadge>수급기간별 총 수령액 비교</SectionBadge>

      <p style={body}>
        같은 월급이어도 가입기간과 나이에 따라 총 수령액이 크게 달라져요. 2026년 상한액 68,100원 기준으로 정리하면 이래요.
      </p>
      <p style={body}>
        50세 미만, 가입기간 1년 미만이면 120일 × 68,100원 = 약 817만원이에요. 50세 미만, 가입기간 10년 이상이면 240일 × 68,100원 = 약 1,634만원이죠. 50세 이상, 가입기간 10년 이상이면 270일 × 68,100원 = 약 1,839만원이에요. 최소와 최대 사이에 무려 1,000만원 이상 차이가 나요.
      </p>
      <p style={body}>
        가입기간이 길수록, 나이가 50세 이상일수록 유리한 구조예요. 퇴직 시점을 조절할 수 있다면 이 기준을 참고해서 결정하는 게 좋죠. 물론 개인 상황에 따라 다르니까 무조건 그렇다는 건 아니에요.
      </p>

      <Checklist items={CHECKLIST} />

      <Divider />

      {/* ── 섹션 4 — 모의계산과 실제 차이 ── */}
      <H2>모의계산 결과와 실제 지급 금액의 차이</H2>
      <p style={body}>
        모의계산에서 나온 금액과 실제로 통장에 찍히는 금액이 다를 수 있어요. 당황하지 마세요, 정상이에요. 차이가 나는 이유는 크게 세 가지예요.
      </p>
      <p style={body}>
        첫째, 평균임금 산정 방식이 달라질 수 있죠. 모의계산은 기본급만 넣지만, 실제로는 상여금, 복리후생비, 식대 등이 포함될 수 있어요. 퇴직 전 3개월 사이에 보직 변경이나 급여 조정이 있었다면 더 복잡해지죠.
      </p>
      <p style={body}>
        둘째, 수급자격 심사 결과에 따라 달라져요. 자발적 퇴사로 판정되면 아예 못 받을 수도 있고, 대기기간이 적용되면 첫 달 금액이 줄어들 수도 있죠. 셋째, 실업급여를 받으면서 새로운 소득이 생기면 그만큼 공제돼요. 아르바이트 수입이 있다면 신고해야 하고, 미신고 시 부정수급이에요.
      </p>

      <GreenBox title="차이가 크다면 이렇게 하세요">
        고용센터에 "평균임금 산정 내역서"를 요청하세요<br />
        어떤 항목이 포함/제외됐는지 상세하게 나와요<br />
        이의가 있으면 14일 이내에 이의신청 가능해요
      </GreenBox>

      <Divider />

      {/* ── 섹션 5 — 공식 모의계산기 안내 ── */}
      <H2>고용24 공식 모의계산기로 예상 금액을 재확인하세요</H2>
      <p style={body}>
        위 계산기로 대략적인 금액을 확인했으면, 정확한 수치는 고용보험 공식 모의계산기에서 한 번 더 확인해보세요. <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24(ei.go.kr)</a>에서 제공하는데, 로그인 없이 바로 사용할 수 있죠.
      </p>
      <p style={body}>
        메인 페이지에서 '모의계산' 또는 '예상 급여 조회'를 찾으면 돼요. 월 평균임금, 나이, 가입기간을 입력하면 1일 수급액과 수급기간이 나오죠. 홈택스에서 원천징수영수증을 뽑으면 정확한 월 평균임금을 확인할 수 있어요.
      </p>
      <p style={body}>
        공식 모의계산기 결과도 어디까지나 참고용이에요. 보너스, 식대, 교통비 같은 항목이 평균임금에 포함되는지는 실제 심사에서 결정돼요. 정확한 금액은 실업급여를 신청하고 고용센터 심사를 받아야 확정되죠.
      </p>

      <Divider />

      {/* ── FAQ 5개 ── */}
      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        실업급여 금액 관련해서 실제로 많이 물어보시는 것만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법을 바탕으로 작성됐어요. 법령은 개정될 수 있으니 중요한 결정 전에 고용24(ei.go.kr)나 고용센터(1350)에서 직접 확인하세요." />
    </ArticleLayout>
  );
}
