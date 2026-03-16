"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body, Calculator,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR } from "@/data/실업급여-guide";

// ─── 계산 로직 ──────────────────────────────────────────

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

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "insurance", label: "고용보험에 가입된 상태에서 퇴직했다" },
  { id: "involuntary", label: "비자발적 퇴직이다 (권고사직, 계약만료, 정당한 사유 등)" },
  { id: "period", label: "퇴직 전 18개월 중 고용보험 가입기간이 180일 이상이다" },
  { id: "reemploy", label: "재취업 의사가 있고 적극적으로 구직활동을 할 수 있다" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "퇴직 전 월 평균임금", min: 150, max: 700, step: 10, defaultValue: 300, format: (v: number) => `${v}만원` },
  { id: "age", label: "퇴직 시 나이", min: 20, max: 68, step: 1, defaultValue: 35, format: (v: number) => `만 ${v}세` },
  { id: "years", label: "고용보험 가입기간", min: 0, max: 20, step: 1, defaultValue: 3, format: (v: number) => v === 0 ? "1년 미만" : `${v}년` },
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
  "퇴직 전 3개월 급여명세서 준비 (세전 기준)",
  "고용보험 총 가입기간 확인 (고용24 피보험자격 이력)",
  "퇴직 시 만 나이 확인 (50세 이상이면 수급기간 길어짐)",
  "퇴직 사유 확인 (비자발적 퇴사만 실업급여 대상)",
  "관할 고용센터 위치 확인 또는 고용24 온라인 신청 준비",
];

const FAQS = [
  {
    q: "고용24 모의계산 결과랑 이 계산기 결과가 같나요?",
    a: "같은 방식이에요. 2026년 상한액 68,100원, 하한액 66,048원, 수급기간표 모두 고용24 공식 기준과 동일하죠. 다만 실제 지급액은 고용센터 심사에 따라 달라질 수 있어요.",
  },
  {
    q: "50세 이상이면 뭐가 달라지나요?",
    a: "같은 가입기간이어도 수급기간이 30일 더 길어요. 3~5년 가입 기준으로 50세 미만은 180일인데, 50세 이상은 210일이에요. 기간이 길어지는 만큼 총 수령액도 수백만원 차이가 나죠.",
  },
  {
    q: "월급이 높으면 실업급여도 많이 나오나요?",
    a: "상한이 걸려요. 2026년 기준 1일 최대 68,100원이라 월로 치면 약 204만원이에요. 월급 500만원이든 700만원이든 이 금액을 넘을 수 없죠.",
  },
  {
    q: "평균임금에 상여금이나 식대도 포함되나요?",
    a: "포함될 수 있죠. 퇴직 전 3개월간 받은 기본급 + 고정수당 + 상여금(월 환산)을 합산해요. 급여명세서나 홈택스 원천징수영수증에서 정확한 금액을 확인하면 돼요.",
  },
  {
    q: "이전 직장에서 실업급여를 받았으면 가입기간이 어떻게 되나요?",
    a: "리셋돼요. 이전에 실업급여를 수급했다면 그 시점 이전 가입기간은 전부 소멸되죠. 그 이후 새로 쌓인 가입기간만 계산에 들어가요. 고용24에서 피보험자격 이력을 조회하면 정확한 기간을 볼 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법 제46조 — 구직급여일액 산정 기준", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용보험법 제50조 — 소정급여일수(수급기간표)", url: "https://www.law.go.kr/법령/고용보험법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24 — 실업급여 모의계산", url: "https://www.work24.go.kr" },
      { label: "고용보험 — 수급기간 안내", url: "https://www.ei.go.kr" },
      { label: "고용노동부 — 실업급여 제도 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "실업급여-모의계산",
    title: "실업급여 모의계산 월급별 예상 금액",
    description: "월급 300만원이면 실제로 얼마 받을까? 월급별 비교와 공식 모의계산기 사용법을 정리했어요.",
  },
  {
    slug: "실업급여-최대금액",
    title: "실업급여 최대금액 2026년 상한액",
    description: "2026년 1일 상한액 68,100원, 월 환산 약 204만원이에요. 월급이 높아도 이 금액을 넘을 수 없죠.",
  },
  {
    slug: "실업급여-한달-얼마-받나요",
    title: "실업급여 한달 얼마 받나요",
    description: "한 달에 최소 198만원에서 최대 204만원이에요. 상한액과 하한액이 적용되는 구조를 알려드릴게요.",
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
          currentSlug="실업급여-계산기"
        />
      }
    >
      {/* ── 브레드크럼 + h1 + intro ── */}
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 계산기</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        실업급여 계산기, 내 금액은 얼마?<br />
        2026년 자동 계산법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "퇴직하면 실업급여 얼마나 나오는 거지?"<br />
        제일 먼저 궁금한 부분이죠.<br /><br />
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 제46조</a>에 따르면
        퇴직 전 3개월 평균임금의 <strong>60%</strong>가 기본 계산이에요.
        여기에 2026년 기준 1일 상한액 68,100원, 하한액 66,048원이 적용되죠.<br />
        아래 계산기에서 내 상황을 입력하면 바로 확인할 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* ── 섹션 1 — 자격 체크 + 계산기 ── */}
      <H2>자동 계산 전에 수급자격부터 맞을까?</H2>
      <p style={body}>
        계산기를 돌리기 전에 수급자격부터 확인하는 게 순서예요. 아래 네 가지 조건을 모두 충족해야 실업급여를 받을 수 있죠. <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>에서 정한 핵심 요건이에요.
      </p>
      <p style={body}>
        비자발적 퇴직이란 권고사직, 계약만료, 회사 폐업, 근로조건이 크게 달라진 경우 등을 말해요. 내가 먼저 그만둔 경우에도 정당한 사유가 인정되면 비자발적으로 처리돼요. 임금체불, 직장 내 괴롭힘, 통근 곤란 같은 사유가 여기에 해당하죠.
      </p>
      <p style={body}>
        180일은 "달력상 6개월"이 아니라 실제로 급여를 받으면서 일한 날(유급일) 기준이에요. 주5일 근무라면 주휴일 포함이라 한 달에 약 25~26일이 잡혀요. 여러 직장의 가입기간을 합산할 수 있지만, 이전에 실업급여를 받은 적이 있으면 그 이후 기간만 계산하죠.
      </p>

      <SectionBadge>내 수급자격 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="실업급여 수급 조건을 충족해요. 아래 계산기로 예상 금액을 확인하세요."
        partialMatchText="일부 조건이 미충족이에요. 해당 항목을 다시 확인해보세요."
      />

      <GreenBox title="수급자격 핵심 요건">
        고용보험 피보험기간 180일 이상 (퇴직 전 18개월 기준)<br />
        비자발적 퇴직 또는 정당한 사유 인정<br />
        재취업 의사 + 적극적 구직활동 가능<br />
        퇴직 후 12개월 이내 신청
      </GreenBox>

      <Divider />

      {/* ── 섹션 2 — 계산기 본체 ── */}
      <H2>2026년 기준 내 자동 계산 결과는?</H2>
      <p style={body}>
        세 가지만 입력하면 돼요. 퇴직 전 월 평균임금, 퇴직 시 만 나이, 고용보험 가입기간이에요. 슬라이더를 움직이면 1일 수급액, 수급기간, 월 수령액, 예상 총액이 실시간으로 바뀌죠. <a href="https://www.work24.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a> 공식 모의계산과 동일한 기준이에요.
      </p>
      <p style={body}>
        핵심 포인트가 하나 있죠. 나이를 49세에서 50세로 바꿔보세요. 수급기간이 30일 늘어나면서 총액이 확 뛰어요. <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 제50조</a>에서 50세 이상(또는 장애인)은 재취업이 어렵다고 보고 수급기간을 더 길게 잡거든요.
      </p>
      <p style={body}>
        계산 결과를 보면 알겠지만, 월급이 아무리 높아도 월 약 204만원이 한도예요. 반대로 월급이 최저임금 수준이어도 월 약 198만원은 보장되죠. 상한과 하한 사이 폭이 좁기 때문에 대부분의 직장인은 비슷한 금액을 받게 돼요. 진짜 차이를 만드는 건 수급기간이에요.
      </p>

      <Calculator
        title="실업급여 예상 수령액 계산"
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 2026년 기준 1일 상한액 68,100원, 하한액 66,048원 적용. 실제 금액은 고용센터 심사에 따라 달라질 수 있어요."
      />

      <BorderBox title="2026년 실업급여 상한·하한">
        1일 상한액: 68,100원 (월 약 204만원)<br />
        1일 하한액: 66,048원 (월 약 198만원)<br />
        하한액 산출 근거: 최저임금의 80% × 1일 소정근로시간(8시간)<br />
        상한·하한은 매년 최저임금에 연동돼 변경돼요
      </BorderBox>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* ── 섹션 3 — 수급기간표 ── */}
      <H2>자동 계산에서 수급기간이 총액을 바꾸는 원리</H2>
      <p style={body}>
        실업급여 금액 자체는 상한·하한 때문에 비슷하지만, 수급기간은 크게 달라져요. 최소 120일(약 4개월)에서 최대 270일(약 9개월)까지 차이가 나죠. 이 기간이 총 수령액을 결정하는 핵심 변수예요.
      </p>
      <p style={body}>
        예를 들어볼게요. 고용보험 5년 가입한 45세 직장인은 180일(6개월)이에요. 같은 5년 가입이라도 52세면 210일(7개월)을 받죠. 30일 차이가 약 200만원의 차이를 만들어요. 10년 이상 가입한 50세 이상이면 270일(9개월)로, 1년 미만 가입자(120일)와 비교하면 총액 차이가 1,000만원을 넘어요.
      </p>
      <p style={body}>
        가입기간은 여러 직장을 합산해요. A회사 3년, B회사 2년이면 총 5년이죠. 단, 실업급여를 한 번 받으면 그 이전 가입기간은 리셋돼요. 이전 직장에서 실업급여를 받은 적이 있다면 그 이후 기간만 계산해야 하니까 주의하세요.
      </p>

      <SectionBadge>계산 전 준비 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* ── 섹션 4 — 계산 후 다음 단계 ── */}
      <H2>계산법을 확인했으면 신청까지 이어지는 절차</H2>
      <p style={body}>
        예상 금액을 확인했으니 다음은 실제 신청이에요. 먼저 자격 요건을 확인하세요. 비자발적 퇴사(권고사직, 계약만료, 정당한 사유 등)여야 하고, 고용보험 가입기간이 이직일 전 18개월 중 180일 이상이어야 해요. 이 두 가지를 충족하면 수급자격이 되죠.
      </p>
      <p style={body}>
        신청 절차는 이래요. 퇴직 후 고용24에서 구직등록을 하고, 수급자격 신청자 온라인 교육을 이수한 뒤, 관할 고용센터에 방문해서 수급자격 인정 신청을 하면 돼요. 이후 1~4주 이내에 대기기간(7일)이 지나고 첫 실업급여가 입금되죠.
      </p>
      <p style={body}>
        기억할 게 하나 있죠. 퇴직 후 <strong>12개월 이내</strong>에 신청해야 해요. 12개월이 지나면 수급자격 자체가 사라지니까, 퇴직하면 미루지 말고 빨리 움직이세요. 고용센터 전화번호는 <strong>1350</strong>이에요. 궁금한 건 전화로 먼저 물어봐도 되죠.
      </p>

      <GreenBox title="신청까지 3단계">
        1단계: 고용24에서 구직등록 + 온라인 교육 이수<br />
        2단계: 관할 고용센터 방문 → 수급자격 인정 신청<br />
        3단계: 대기기간(7일) 후 실업급여 지급 시작
      </GreenBox>

      <Divider />

      {/* ── 섹션 5 — 주의사항 ── */}
      <H2>자동 계산할 때 자주 틀리는 부분 잡아두세요</H2>
      <p style={body}>
        가장 흔한 실수가 <strong>세후 월급으로 계산하는 것</strong>이에요. 실업급여 기준은 세전 평균임금이에요. 통장에 찍히는 실수령액이 아니라 급여명세서에 나오는 총지급액을 넣어야 정확한 결과가 나오죠.
      </p>
      <p style={body}>
        고용보험 가입기간도 착각하기 쉬워요. 입사일부터 퇴직일까지가 아니라, 실제로 고용보험이 가입된 기간만 인정돼요. 수습기간에 고용보험을 안 넣은 경우가 종종 있으니 <a href="https://www.work24.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 피보험자격 이력을 꼭 조회해보세요.
      </p>
      <p style={body}>
        나이 기준도 중요해요. "만 나이"로 계산하기 때문에, 퇴직일 기준으로 만 50세가 되는 해에 퇴직하면 50세 이상 구간이 적용돼요. 생일이 지났는지 여부에 따라 수급기간이 30일 차이가 나니까 꼼꼼하게 확인하세요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        실업급여 계산과 관련해서 실제로 많이 물어보시는 것만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법을 바탕으로 작성됐어요. 상한액·하한액은 매년 최저임금에 따라 변경되니, 최신 기준은 고용24(ei.go.kr)나 고용센터(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
