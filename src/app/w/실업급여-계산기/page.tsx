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
        &quot;내가 퇴직하면 한 달에 얼마나 들어오지?&quot;
      </p>
      <p style={body}>
        이 질문, 퇴직 앞두고 제일 먼저 떠오르죠.
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 제46조</a>가 정해놓은 계산법은 간단해요 — 퇴직 전 3개월 평균임금의 <strong>60%</strong>예요.
        여기에 2026년 1일 상한액 68,100원, 하한액 66,048원이 걸리죠.
      </p>
      <p style={body}>
        월급이 아무리 높아도 월 약 204만원이 천장이고, 낮아도 월 약 198만원은 보장돼요.
        아래 계산기에 내 월급, 나이, 가입기간만 넣으면 예상 수령액이 바로 나오니까 직접 돌려보세요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* ── 섹션 1 — 자격 체크 + 계산기 ── */}
      <H2>자동 계산 전에 수급자격부터 맞을까?</H2>
      <p style={body}>
        계산기부터 돌리고 싶겠지만, 수급자격이 안 되면 아무 소용이 없어요. <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>이 정한 네 가지 조건을 전부 충족해야 실업급여를 받을 수 있죠. 하나라도 빠지면 신청 자체가 반려돼요.
      </p>
      <p style={body}>
        &quot;비자발적 퇴직&quot;이 뭔지 헷갈리는 분이 많죠. 권고사직, 계약만료, 회사 폐업이 대표적이에요. 내가 먼저 그만뒀어도 임금체불, 직장 내 괴롭힘, 통근 곤란 같은 정당한 사유가 인정되면 비자발적으로 처리돼요. 고용센터가 퇴직 사유를 개별 심사하니까, 애매하면 퇴직 전에 1350으로 미리 문의하세요.
      </p>
      <p style={body}>
        <a href="/w/실업급여-피보험단위기간" style={{ color: "#1D9E75", textDecoration: "underline" }}>180일 기준</a>도 자주 착각하는 부분이에요. 달력상 6개월이 아니라 실제 유급일(급여를 받으며 일한 날) 기준이죠. 주5일제 직장이면 주휴일 포함 한 달에 약 25~26일이 잡혀요. 직장을 여러 군데 다녔으면 가입기간을 합산할 수 있지만, 이전에 실업급여를 수급한 이력이 있으면 그 이후 기간만 인정돼요.
      </p>

      <SectionBadge>내 수급자격 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="실업급여 수급 조건을 충족해요. 아래 계산기로 예상 금액을 확인하세요."
        partialMatchText="일부 조건이 미충족이에요. 해당 항목을 다시 확인해보세요."
      />

      <GreenBox title="수급자격 4가지 요건">
        고용보험 피보험기간 180일 이상 (퇴직 전 18개월 중)<br />
        비자발적 퇴직이거나 정당한 사유로 인정<br />
        재취업 의사가 있고 적극적 구직활동 가능<br />
        퇴직일로부터 12개월 이내에 신청
      </GreenBox>

      <Divider />

      {/* ── 섹션 2 — 계산기 본체 ── */}
      <H2>2026년 기준 내 자동 계산 결과는?</H2>
      <p style={body}>
        입력할 건 세 가지뿐이에요 — 퇴직 전 월 평균임금, 퇴직 시 만 나이, 고용보험 가입기간이죠. 슬라이더를 움직이면 1일 수급액, 수급기간, 월 수령액, 예상 총액이 실시간으로 바뀌어요. <a href="https://www.work24.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a> 공식 모의계산과 동일한 산출 기준을 적용했죠.
      </p>
      <p style={body}>
        한 가지 꼭 해볼 게 있어요. 나이를 49세에서 50세로 바꿔보세요. 수급기간이 30일 늘어나면서 총액이 확 뛰죠. <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 제50조</a>가 50세 이상(장애인 포함)은 재취업이 어려운 연령대로 보고 수급기간을 더 길게 잡아놨어요.
      </p>
      <p style={body}>
        결과를 보면 금방 느끼겠지만, 월급 차이가 생각보다 큰 영향을 주지 않아요. 상한(월 204만원)과 하한(월 198만원) 사이 폭이 워낙 좁기 때문이죠. 대부분 직장인은 이 범위 안에서 결정돼요. 총 수령액을 좌우하는 진짜 변수는 수급기간, 즉 나이와 가입기간이에요.
      </p>

      <Calculator
        title="실업급여 예상 수령액 계산"
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 2026년 기준 1일 상한액 68,100원, 하한액 66,048원 적용. 실제 금액은 고용센터 심사에 따라 달라질 수 있어요."
      />

      <BorderBox title="2026년 실업급여 상한·하한 정리">
        1일 상한액: 68,100원 → 월 환산 약 204만원<br />
        1일 하한액: 66,048원 → 월 환산 약 198만원<br />
        하한액 산출: 최저임금(10,320원) × 8시간 × 80%<br />
        두 금액 모두 매년 최저임금에 연동돼서 바뀌어요
      </BorderBox>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* ── 섹션 3 — 수급기간표 ── */}
      <H2>자동 계산에서 수급기간이 총액을 바꾸는 원리</H2>
      <p style={body}>
        월 수령액은 상한·하한 때문에 거의 비슷하지만, &quot;몇 개월 동안 받느냐&quot;는 크게 달라요. 최소 120일(약 4개월)에서 최대 270일(약 9개월)까지 벌어지죠. 이 수급기간이 바로 총 수령액을 가르는 핵심 변수예요.
      </p>
      <p style={body}>
        숫자로 보면 바로 체감돼요. 고용보험 5년 가입한 45세 직장인이라면 180일(6개월)이에요. 같은 5년 가입인데 52세면? 210일(7개월)을 받죠. 30일 차이가 금액으로는 약 200만원이에요. 10년 이상 가입한 50세 이상은 270일(9개월)까지 가능한데, 1년 미만 가입자(120일)랑 비교하면 총액이 1,000만원 넘게 벌어져요.
      </p>
      <p style={body}>
        가입기간 계산에서 자주 빠뜨리는 게 합산 규칙이에요. A회사 3년, B회사 2년이면 총 5년으로 합쳐지죠. 대신 이전 직장에서 실업급여를 이미 받았다면 그 시점 이전 가입기간은 리셋돼요. 새 직장부터 다시 쌓이는 기간만 인정되니까, <a href="https://www.work24.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 피보험자격 이력을 꼭 조회해보세요.
      </p>

      <SectionBadge>계산 전 준비 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* ── 섹션 4 — 계산 후 다음 단계 ── */}
      <H2>계산법을 확인했으면 신청까지 이어지는 절차</H2>
      <p style={body}>
        금액을 확인했으면 다음은 실제로 신청하는 거예요. 퇴직 후 <a href="https://www.work24.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 구직등록을 먼저 하고, 수급자격 신청자 온라인 교육을 이수하세요. 그 다음 관할 고용센터에 방문해서 수급자격 인정 신청을 하면 절차가 시작되죠.
      </p>
      <p style={body}>
        대기기간 7일이 지나면 첫 실업급여가 입금돼요. 보통 신청부터 첫 입금까지 2~4주 정도 걸리죠. 이후에는 1~4주 간격으로 실업인정일에 고용센터를 방문하거나 온라인으로 구직활동을 보고하면 계속 지급받을 수 있어요.
      </p>
      <p style={body}>
        절대 잊으면 안 되는 게 하나 있어요.{" "}
        <a href="/w/퇴사후-실업급여-신청-기간" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직일로부터 12개월</a> 안에 신청해야 해요. 수급기간이 아무리 길어도 12개월이 지나면 남은 일수가 전부 사라지죠. 퇴직하면 미루지 말고 바로 움직이세요. 궁금한 건 고용센터(<strong>1350</strong>)에 전화부터 해도 돼요.
      </p>

      <GreenBox title="신청 절차 3단계">
        1단계: 고용24 구직등록 + 온라인 교육 이수<br />
        2단계: 관할 고용센터 방문해서 수급자격 인정 신청<br />
        3단계: 대기기간(7일) 지나면 실업급여 지급 시작
      </GreenBox>

      <Divider />

      {/* ── 섹션 5 — 주의사항 ── */}
      <H2>자동 계산할 때 자주 틀리는 부분 잡아두세요</H2>
      <p style={body}>
        제일 흔한 실수가 <strong>실수령액(세후 월급)을 넣는 것</strong>이에요. 실업급여 기준은 세전 평균임금이죠. 통장에 찍히는 금액이 아니라 급여명세서에 나오는 총지급액을 입력해야 정확한 결과가 나와요. 홈택스에서 원천징수영수증을 뽑으면 정확한 세전 금액을 볼 수 있죠.
      </p>
      <p style={body}>
        고용보험 가입기간에서도 착각이 많아요. &quot;입사일부터 퇴직일까지&quot;가 아니라, 실제로 고용보험에 가입된 기간만 인정돼요. 수습기간이나 시용기간에 고용보험을 안 넣는 회사가 종종 있으니, <a href="https://www.work24.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 피보험자격 이력을 반드시 조회해보세요. 내가 생각한 기간이랑 다를 수 있어요.
      </p>
      <p style={body}>
        나이 기준은 &quot;만 나이&quot;예요. 퇴직일 기준으로 만 50세 생일이 지났느냐가 갈림길이죠. 49세 364일에 퇴직하면 50세 미만 구간, 생일 다음 날에 퇴직하면 50세 이상 구간이 적용돼요. 딱 하루 차이로 수급기간이 30일(약 200만원) 달라지니까 퇴직 시점을 조절할 수 있다면 꼭 고려하세요.
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
