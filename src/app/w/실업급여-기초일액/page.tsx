"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 퇴직 후 실업급여를 신청하려는데 실제로 얼마를 받을 수 있는지 계산해보고 싶은 상황
// Q2. 기초일액(평균임금 × 60%) 계산 후 상한액·하한액 기준으로 실제 수령액을 예측할 수 있어야 함
// Q3. 평균임금 계산 기간(3개월) / 상한액 68,100원·하한액 66,048원 / 소정급여일수와 총수령액 관계
// Q4. GreenBox(상한액·하한액 기준표) + EligibilityChecker(급여 수준별 체커) + BorderBox(계산 예시) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "실업급여 기초일액 계산에서 퇴직금도 포함되나요?",
    a: "퇴직금은 평균임금 계산에 포함되지 않아요. 퇴직 전 3개월간 실제로 받은 기본급, 수당, 분기별 상여금의 해당 기간 분만 합산해요. 퇴직 시 일시 지급되는 미사용 연차수당도 제외해요.",
  },
  {
    q: "상한액과 하한액 차이가 얼마나 나나요?",
    a: "2026년 기준으로 상한액(68,100원)과 하한액(66,048원)의 차이는 2,052원이에요. 최저임금이 꾸준히 올라 두 금액이 가까워졌어요.",
  },
  {
    q: "월 300만원 받았으면 실업급여는 180만원인가요?",
    a: "월 300만원이면 1일 평균임금은 약 98,000~105,000원 수준이에요. 여기에 60%를 곱하면 약 59,000~63,000원인데, 이 금액이 하한액(66,048원)보다 낮으면 하한액이 적용돼요.",
  },
  {
    q: "실업급여는 한 번에 다 주나요?",
    a: "실업급여는 약 4주마다 실업인정일에 나눠서 지급돼요. 구직활동 실적을 제출해야 해당 기간분이 지급돼요. 실업인정일을 빠뜨리면 그 기간 급여가 지급되지 않을 수 있어요.",
  },
  {
    q: "소정급여일수가 길면 총 수령액이 많아지나요?",
    a: "맞아요. 기초일액이 같아도 소정급여일수에 따라 총 수령액이 달라져요. 50세 이상이거나 장애인이면서 피보험기간이 10년 이상이면 최대 270일까지 받을 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "고용보험법 제45조 - 구직급여일액", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용24 - 실업급여 모의계산기", url: "https://www.work24.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePb0201Info.do" },
    ],
  },
];

const RELATED = [
  { slug: "실업급여-수급기간-몇개월-받나요", title: "실업급여 수급기간 몇 개월 받나요", description: "소정급여일수 120~270일 기준표예요." },
  { slug: "실업급여-최대금액", title: "실업급여 최대금액", description: "상한액 기준 최대 수령 가능 금액이에요." },
  { slug: "실업급여-모의계산", title: "실업급여 모의계산", description: "예상 수령액을 직접 계산할 수 있어요." },
];

const CHECKER_GROUPS = [
  {
    key: "salary",
    label: "퇴직 전 세전 월 급여는 얼마였나요?",
    options: [
      { value: "under250", text: "250만원 미만" },
      { value: "250to400", text: "250~400만원" },
      { value: "400to600", text: "400~600만원" },
      { value: "over600", text: "600만원 이상" },
    ],
  },
];

const CHECKER_RESULTS = [
  {
    when: { salary: "under250" },
    pass: true,
    headline: "하한액 66,048원이 적용될 가능성이 높아요",
    detail: "월 250만원 미만이면 평균임금의 60%가 하한액(66,048원)보다 낮아서 하한액이 보장돼요. 최저임금의 80% × 8시간으로 계산한 금액이에요.",
    badges: ["하한액 보장", "66,048원/일"],
    links: [{ icon: "📋", title: "소정급여일수별 총 수령액", desc: "나이·피보험기간별 일수 확인", href: "/w/실업급여-수급기간-몇개월-받나요" }],
  },
  {
    when: { salary: "250to400" },
    pass: true,
    headline: "직접 계산이 필요해요 (66,048~68,100원 범위)",
    detail: "월 250~400만원 구간은 평균임금 60%가 하한액과 상한액 사이에 해당해요. 퇴직 전 3개월 임금총액을 총일수로 나눠 계산해야 정확한 금액을 알 수 있어요.",
    badges: ["직접 계산 필요", "개인별 상이"],
    links: [{ icon: "📋", title: "고용24 모의계산기", desc: "예상 수령액 직접 계산", href: "https://www.work24.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePb0201Info.do" }],
  },
  {
    when: { salary: "400to600" },
    pass: true,
    headline: "상한액 68,100원이 적용돼요",
    detail: "월 400만원 이상이면 평균임금의 60%가 상한액(68,100원)을 초과해요. 실제 급여가 높아도 1일 최대 68,100원까지만 받을 수 있어요.",
    badges: ["상한액 적용", "68,100원/일"],
    links: [{ icon: "📋", title: "상한액 기준 총 수령액", desc: "소정급여일수별 계산", href: "/w/실업급여-최대금액" }],
  },
  {
    when: { salary: "over600" },
    pass: true,
    headline: "상한액 68,100원으로 고정돼요",
    detail: "월 600만원 이상이라도 1일 최대 68,100원까지만 받을 수 있어요. 소정급여일수가 180일이면 총 12,258,000원이 상한이에요.",
    badges: ["상한액 고정", "68,100원/일"],
    links: [{ icon: "📋", title: "소정급여일수 기준", desc: "나이·피보험기간별 일수", href: "/w/실업급여-수급기간-몇개월-받나요" }],
  },
];

const CHECKER_DEFAULT = {
  pass: false,
  headline: "월 급여를 선택해 주세요",
  detail: "퇴직 전 세전 월 급여를 선택하면 예상 기초일액과 적용 기준을 알려드려요.",
  badges: [],
  links: [],
};

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 기초일액 · 상한액 하한액</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        실업급여 기초일액 계산법<br />
        평균임금 60% 상한액 하한액 기준
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직하고 나서 실제로 얼마를 받을 수 있는지 궁금하죠?
        퇴직 전 3개월 평균임금의 60%가 기초일액이고, 2026년 기준 상한액은 1일 68,100원, 하한액은 66,048원이에요.
        내 급여 수준에 따라 어느 기준이 적용되는지 아래서 바로 알 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>기초일액은 어떻게 계산하나요</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75" }} target="_blank" rel="noopener noreferrer">고용보험법 제45조</a>에서 구직급여일액은 기초일액 × 60%로 정하고 있어요.
        기초일액 자체가 평균임금이기 때문에 실질적으로는 평균임금 × 60%예요.
      </p>
      <p style={body}>
        평균임금은 퇴직 전 3개월 동안 받은 임금 총액을 그 기간의 총 일수(역일 기준)로 나눈 금액이에요.
        달마다 일수가 다르기 때문에 3개월 총일수는 89~92일 사이가 되는 경우가 많아요.
        2월이 포함되면 더 짧아져요.
      </p>

      <BorderBox>
        <strong>계산 예시: 월 300만원 받은 경우</strong><br />
        퇴직 전 3개월 임금 합계: 900만원<br />
        3개월 총일수: 91일<br />
        평균임금: 9,000,000 ÷ 91 = 약 98,901원/일<br />
        60% 적용: 98,901 × 60% = 59,341원<br />
        하한액(66,048원) 미만 → 하한액 66,048원 적용<br />
        <br />
        ★ 퇴직금·미사용 연차수당·경조사비 등 일시금은 평균임금에서 제외
      </BorderBox>

      <H2>상한액·하한액 기준은 얼마인가요</H2>
      <p style={body}>
        2026년 기준 상한액은 68,100원, 하한액은 66,048원이에요.
        평균임금 × 60%가 이 범위를 벗어나면 상한액 또는 하한액이 자동으로 적용돼요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>구분</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>금액</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>적용 조건</th>
            </tr>
          </thead>
          <tbody>
            {[
              { label: "상한액", amount: "68,100원/일", condition: "평균임금 × 60% > 68,100원" },
              { label: "하한액", amount: "66,048원/일", condition: "평균임금 × 60% < 66,048원" },
              { label: "개인별 적용", amount: "해당 금액", condition: "두 금액 사이에 해당하는 경우" },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "5px 8px", fontWeight: 700, whiteSpace: "nowrap" }}>{row.label}</td>
                <td style={{ padding: "5px 8px", fontSize: 12 }}>{row.amount}</td>
                <td style={{ padding: "5px 8px", fontSize: 12 }}>{row.condition}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: "#666", marginTop: 8, marginBottom: 0 }}>
          ★ 하한액 계산식: 2026년 최저임금 10,320원 × 80% × 8시간 = 66,048원
        </p>
      </GreenBox>

      <p style={body}>
        상한액과 하한액의 차이가 2,052원밖에 안 돼요. 최저임금이 꾸준히 인상된 반면 상한액 인상이 더뎠던 결과예요.
        사실상 많은 수급자가 하한액과 상한액 사이의 좁은 범위에서 실업급여를 받아요.
      </p>

      <H2>내 기초일액 예상 체커</H2>
      <p style={body}>
        퇴직 전 월 급여를 선택하면 어떤 기준이 적용되는지 바로 알 수 있어요.
      </p>

      
      <EligibilityChecker
        title="내 기초일액 예상 체커"
        subtitle="퇴직 전 월 급여를 선택하면 예상 기초일액을 알려드려요"
        intro="실업급여 기초일액은 평균임금의 60%지만 상한액·하한액이 있어요. 월 급여 수준별로 어떤 기준이 적용되는지 확인해 보세요."
        groups={CHECKER_GROUPS}
        results={CHECKER_RESULTS}
        defaultResult={CHECKER_DEFAULT}
      />

      <H2>기초일액 기준 총 수령액 계산</H2>
      <p style={body}>
        기초일액이 결정되면 총 수령액은 기초일액 × 소정급여일수예요.
        소정급여일수는 나이와 고용보험 피보험기간에 따라 120~270일로 달라져요.
      </p>

      <BorderBox>
        <strong>소정급여일수별 총 수령액 예시 (상한액 68,100원 기준)</strong><br />
        120일: 68,100원 × 120일 = 8,172,000원<br />
        150일: 68,100원 × 150일 = 10,215,000원<br />
        180일: 68,100원 × 180일 = 12,258,000원<br />
        210일: 68,100원 × 210일 = 14,301,000원<br />
        240일: 68,100원 × 240일 = 16,344,000원<br />
        270일: 68,100원 × 270일 = 18,387,000원<br />
        <br />
        ★ 50세 이상 또는 장애인이면서 피보험기간 10년 이상이면 최대 270일 가능
      </BorderBox>

      <p style={body}>
        실업급여는 약 4주마다 실업인정일에 나눠서 지급돼요. 구직활동 실적을 제출해야 해당 기간분이 입금돼요.
        기초일액 계산이 어렵게 느껴지면 <a href="https://www.work24.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePb0201Info.do" style={{ color: "#1D9E75" }} target="_blank" rel="noopener noreferrer">고용24 모의계산기</a>를 이용하면 편해요.
      </p>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 2월 고용보험법 기준으로 작성됐어요. 상한액·하한액은 매년 최저임금에 따라 변경될 수 있으니 고용24 또는 고용센터에 문의하시길 권해요." />
    </ArticleLayout>
  );
}
