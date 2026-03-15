"use client";

import { H2, SectionBadge, GreenBox, BorderBox, Divider, body, Calculator, Steps, Checklist, FAQ, References, Disclaimer } from "@/components/article-ui";

// ─── 데이터 ──────────────────────────────────────────

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

const STEPS = [
  {
    title: "고용24(ei.go.kr) 접속",
    desc: "고용보험 공식 사이트에 들어가세요. 로그인 없이도 모의계산 메뉴를 이용할 수 있어요. 메인 페이지에서 '모의계산' 또는 '예상 급여 조회'를 찾으면 돼요.",
    tip: "검색창에 '실업급여 모의계산' 입력해도 바로 나와요",
  },
  {
    title: "월 평균임금 입력",
    desc: "퇴직 전 최근 3개월 평균 월급을 입력해요. 기본급 + 고정수당 + 상여금(월 환산)을 합친 금액이에요. 급여명세서가 없으면 대략적인 금액을 넣어도 추정치는 나와요.",
    tip: "홈택스에서 원천징수영수증 확인 가능",
  },
  {
    title: "나이·가입기간 입력",
    desc: "퇴직 시 만 나이와 고용보험 총 가입기간을 입력하세요. 가입기간은 고용24에서 '피보험자격 이력내역'을 조회하면 정확히 나와요. 여러 직장이면 합산돼요.",
    tip: "",
  },
  {
    title: "결과 확인",
    desc: "1일 수급액, 수급기간, 총 예상 수령액이 나와요. 이 금액은 참고용이에요. 실제로는 고용센터 심사 후 확정되니까 정확한 금액은 신청 후에 알 수 있어요.",
    tip: "모의계산 결과 캡처해두면 나중에 비교할 때 편해요",
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
    a: "300만원의 60%는 180만원인데, 2026년 하한액이 월 약 198만원이라 실제로는 198만원을 받아요. 월급이 330만원 이하라면 대부분 하한액이 적용돼서 비슷한 금액을 받게 돼요.",
  },
  {
    q: "월급이 높으면 실업급여도 많이 받나요?",
    a: "상한이 있어요. 2026년 기준 1일 최대 68,100원, 월로 치면 약 204만원이에요. 월급이 500만원이든 700만원이든 최대 204만원까지만 받아요. 그래서 고소득자일수록 실업급여 체감 금액은 적어요.",
  },
  {
    q: "모의계산 결과랑 실제 금액이 다를 수 있어요?",
    a: "다를 수 있어요. 모의계산은 입력한 정보만으로 단순 계산하는 거예요. 실제로는 보너스, 식대, 교통비 같은 항목이 평균임금에 포함될 수도 있고, 수급자격 심사 결과에 따라 달라질 수 있어요.",
  },
  {
    q: "고용보험 가입기간을 정확히 모르겠어요",
    a: "고용24(ei.go.kr)에 로그인하면 '피보험자격 이력내역'에서 각 직장별 가입 기간을 확인할 수 있어요. 공인인증서나 간편인증으로 로그인하면 돼요. 여러 직장이면 전부 합산하세요.",
  },
  {
    q: "자발적 퇴사인데 실업급여 받을 수 있나요?",
    a: "원칙적으로 자발적 퇴사는 안 돼요. 하지만 임금체불, 직장 내 괴롭힘, 통근 불가 같은 정당한 사유가 있으면 비자발적 퇴사로 인정받을 수 있어요. 고용센터에서 퇴직 사유를 심사해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법 제50조 — 구직급여의 수급 요건", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용보험법 제46조 — 구직급여일액", url: "https://www.law.go.kr/법령/고용보험법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24 — 실업급여 모의계산", url: "https://www.ei.go.kr" },
      { label: "고용노동부 — 실업급여 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>

      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 모의계산</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        실업급여 얼마 받을까?<br />
        월급별 예상 금액 계산법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "퇴직하면 실업급여 얼마나 나올까?"<br />
        이게 제일 먼저 궁금하잖아요.<br /><br />
        계산 방식은 간단해요. <strong>퇴직 전 3개월 평균임금의 60%</strong>가 기본이에요.<br />
        근데 여기에 상한액·하한액이 있어서 월급이 높다고 무한정 많이 받는 건 아니에요.<br />
        아래 계산기로 내 상황에 맞게 바로 확인해보세요.
      </p>

      <Divider />

      {/* 섹션 1 — 계산기 */}
      <H2>내 월급으로 얼마 받을 수 있을까?</H2>
      <p style={body}>
        실업급여 금액은 세 가지로 결정돼요. 퇴직 전 월 평균임금, 퇴직 시 나이, 고용보험 가입기간이에요. 평균임금의 60%가 기본 계산인데, 2026년 기준으로 1일 상한액 68,100원(월 약 204만원)과 하한액 66,048원(월 약 198만원)이 적용돼요.
      </p>
      <p style={body}>
        쉽게 말하면 월급이 아무리 높아도 월 204만원이 최대고, 월급이 아무리 낮아도 월 198만원은 받아요. 상한과 하한 사이 폭이 좁기 때문에, 사실 대부분의 직장인은 월 198~204만원 사이에서 결정돼요. 차이는 수급기간에서 나요.
      </p>

      <SectionBadge>내 상황으로 직접 계산해보세요</SectionBadge>
      <Calculator
        title="실업급여 예상 수령액 계산"
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 2026년 기준 1일 상한액 68,100원, 하한액 66,048원 적용. 실제 금액은 고용센터 심사에 따라 달라질 수 있어요."
      />

      <p style={body}>
        슬라이더에서 나이를 49세 → 50세로 바꿔보세요. 수급기간이 확 늘어나면서 총액도 크게 달라져요. 50세 이상은 재취업이 어려운 연령대라 수급기간을 더 길게 주거든요. 이 차이만 해도 수백만원이에요.
      </p>

      <GreenBox title="이것만 기억해요">
        월급의 60%가 기본이지만, 상한·하한이 있어서 대부분 월 198~204만원이에요<br />
        차이를 만드는 건 수급기간이에요. 나이와 가입기간이 길수록 유리해요<br />
        모의계산은 참고용이에요. 실제 금액은 고용센터 심사 후 확정돼요
      </GreenBox>

      <Divider />

      {/* 섹션 2 — 월급별 비교 */}
      <H2>월급별로 실제로 얼마를 받게 되나요?</H2>
      <p style={body}>
        구체적인 예시를 봐야 감이 오잖아요. 2026년 기준으로 월급별 실제 수령액을 정리해드릴게요. 핵심은 상한·하한 때문에 월급 차이가 크게 안 벌어진다는 거예요.
      </p>
      <p style={body}>
        월급 250만원인 경우를 볼게요. 250만원의 60%는 150만원인데, 하한액 198만원보다 낮아요. 그래서 실제로는 198만원을 받게 돼요. 월급 350만원이면? 350만원의 60%가 210만원인데 상한액 204만원을 넘으니까 204만원만 받아요. 월급 330만원이 딱 분기점이에요. 이 이하면 하한액, 이 이상이면 상한액이 적용돼요.
      </p>
      <p style={body}>
        그러니까 월급 200만원이든 500만원이든 실업급여 금액 자체는 크게 차이가 안 나요. 진짜 차이를 만드는 건 <strong>수급기간</strong>이에요. 가입기간이 10년 이상이고 50세 이상이면 270일(약 9개월)을 받는데, 가입기간 1년 미만이면 120일(약 4개월)밖에 못 받아요. 기간 차이만으로 1,000만원 넘게 벌어져요.
      </p>

      <BorderBox title="월급별 실업급여 정리 (2026년 기준)">
        월급 250만원 이하 → 하한액 적용, 월 약 198만원<br />
        월급 250~330만원 → 60% 그대로, 월 150~198만원 (하한 적용)<br />
        월급 340만원 이상 → 상한액 적용, 월 약 204만원<br />
        핵심: 대부분 월 198~204만원 사이예요
      </BorderBox>

      <Divider />

      {/* 섹션 3 — 공식 모의계산기 사용법 */}
      <H2>공식 모의계산기는 어떻게 쓰나요?</H2>
      <p style={body}>
        위 계산기로 대략적인 금액을 확인했으면, 정확한 수치는 고용보험 공식 모의계산기에서 한 번 더 확인해보세요. 고용24(ei.go.kr)에서 제공하는데, 로그인 없이 바로 사용할 수 있어요.
      </p>

      <SectionBadge>공식 모의계산기 이용 순서</SectionBadge>
      <Steps steps={STEPS} />

      <p style={body}>
        공식 모의계산기 결과도 어디까지나 참고용이에요. 보너스, 식대, 교통비 같은 항목이 평균임금에 포함되는지는 실제 심사에서 결정돼요. 정확한 금액은 실업급여를 신청하고 고용센터 심사를 받아야 확정돼요.
      </p>

      <Divider />

      {/* 섹션 4 — 모의계산과 실제 차이 */}
      <H2>계산 결과랑 실제 지급액이 다를 수 있어요</H2>
      <p style={body}>
        모의계산에서 나온 금액과 실제로 통장에 찍히는 금액이 다를 수 있어요. 당황하지 마세요, 정상이에요. 차이가 나는 이유는 크게 세 가지예요.
      </p>
      <p style={body}>
        첫째, 평균임금 산정 방식이 달라질 수 있어요. 모의계산은 기본급만 넣지만, 실제로는 상여금, 복리후생비, 식대 등이 포함될 수 있거든요. 퇴직 전 3개월 사이에 보직 변경이나 급여 조정이 있었다면 더 복잡해져요.
      </p>
      <p style={body}>
        둘째, 수급자격 심사 결과에 따라 달라져요. 자발적 퇴사로 판정되면 아예 못 받을 수도 있고, 대기기간이 적용되면 첫 달 금액이 줄어들 수도 있어요. 셋째, 실업급여를 받으면서 새로운 소득이 생기면 그만큼 공제돼요. 아르바이트 수입이 있다면 신고해야 하고, 미신고 시 부정수급이에요.
      </p>

      <GreenBox title="차이가 크다면 이렇게 하세요">
        고용센터에 "평균임금 산정 내역서"를 요청하세요<br />
        어떤 항목이 포함/제외됐는지 상세하게 나와요<br />
        이의가 있으면 14일 이내에 이의신청 가능해요
      </GreenBox>

      <Divider />

      {/* 섹션 5 — 체크리스트 */}
      <H2>계산 전에 이것부터 준비하세요</H2>
      <p style={body}>
        정확한 모의계산을 하려면 세 가지 숫자가 필요해요. 퇴직 전 3개월 평균임금, 고용보험 가입기간, 퇴직 시 만 나이. 이 세 개만 정확하면 오차가 거의 없어요.
      </p>

      <SectionBadge>준비 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <p style={body}>
        급여명세서가 없으면 홈택스에서 근로소득 원천징수영수증을 뽑으면 돼요. 가입기간은 고용24에서 바로 확인할 수 있어요. 이 두 개만 준비하면 5분 안에 모의계산 끝나요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        실업급여 금액 관련해서 실제로 많이 물어보시는 것만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법을 바탕으로 작성됐어요. 법령은 개정될 수 있으니 중요한 결정 전에 고용24(ei.go.kr)나 고용센터(1350)에서 직접 확인하세요." />
    </div>
  );
}
