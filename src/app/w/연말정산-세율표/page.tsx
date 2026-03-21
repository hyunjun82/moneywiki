"use client";

// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     → 연말정산에서 내가 어느 세율 구간에 해당하는지, 세금이 어떻게 계산되는지 이해하고 싶은 상황이에요.
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     → 본인의 과세표준을 파악하고, 해당 구간의 세율과 누진공제액을 적용해 산출세액을 직접 계산하는 행동.
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     → 8개 세율 구간 수치, 누진공제액 의미, 과세표준 계산 경로(총급여→공제→과세표준), 산출세액에서 최종 결정세액으로 이어지는 구조.
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     → 세율표 + 계산 예시(숫자로 직접 보여주기) + Steps(계산 흐름) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "총급여에서 근로소득공제 차감 → 근로소득금액",
    desc: "연봉(총급여)에서 근로소득공제를 빼면 근로소득금액이 나와요. 공제액은 총급여에 따라 달라요. 예를 들어 총급여 5,000만원이면 근로소득공제 약 1,200만원을 빼서 3,800만원이 돼요.",
  },
  {
    title: "각종 소득공제 차감 → 과세표준",
    desc: "근로소득금액에서 인적공제, 신용카드 공제, 연금저축·IRP 소득공제 등을 빼면 과세표준이 나와요. 총급여 5,000만원 기준으로 공제를 1,000만원 더 받으면 과세표준이 약 2,800만원이 돼요.",
  },
  {
    title: "과세표준 × 세율 - 누진공제 = 산출세액",
    desc: "과세표준 2,800만원이면 15% 구간(1,400만원 초과~5,000만원 이하)에 해당해요. 2,800만원 × 15% - 누진공제 126만원 = 294만원이 산출세액이에요.",
    tip: "누진공제액은 구간별로 정해져 있어요. 15% 구간은 126만원을 빼요",
  },
  {
    title: "산출세액 - 세액공제 = 결정세액",
    desc: "산출세액 294만원에서 자녀 세액공제, 의료비·교육비·연금저축 세액공제 등을 빼면 최종 결정세액이 나와요. 원천징수된 세금과 비교해서 많이 냈으면 환급, 적게 냈으면 추가 납부예요.",
  },
];

const FAQS = [
  {
    q: "세율이 24%라면 소득의 24%를 다 내나요?",
    a: "아니에요. 누진세율이라서 24%는 해당 구간에 속한 금액에만 적용돼요. 과세표준 6,000만원이면 1,400만원까지는 6%, 1,400~5,000만원은 15%, 5,000~6,000만원만 24%가 적용돼요.",
  },
  {
    q: "누진공제액은 왜 빼나요?",
    a: "구간별로 나눠서 계산하면 복잡하니까, 간편하게 계산하기 위해 빼는 금액이에요. 예를 들어 5,000만원 초과~8,800만원 구간의 누진공제액 522만원을 빼면, 나눠서 계산한 것과 같은 세금이 나와요.",
  },
  {
    q: "과세표준 1,400만원 이하면 세금이 6%인가요?",
    a: "산출세액은 6%지만, 여기서 세액공제(근로소득 세액공제 등)를 빼면 실제 납부 세액은 훨씬 적어요. 소득이 낮을수록 공제 비율이 커서 실효세율은 6%보다 낮아요.",
  },
  {
    q: "지방소득세는 어떻게 계산하나요?",
    a: "소득세의 10%예요. 결정세액이 300만원이면 지방소득세는 30만원이에요. 연말정산할 때 소득세와 지방소득세를 합쳐서 처리해요.",
  },
  {
    q: "소득공제를 더 받으면 어떻게 달라지나요?",
    a: "과세표준이 낮아져서 세율 구간이 내려갈 수 있어요. 예를 들어 과세표준이 5,100만원에서 공제 200만원을 더 받아 4,900만원으로 내려가면, 24% 구간에서 15% 구간으로 떨어져 세금이 크게 줄어요.",
  },
];

const REFERENCES = [
  {
    category: "법령 및 공식 자료",
    items: [
      { label: "소득세법 제55조 — 세율", url: "https://www.law.go.kr/법령/소득세법" },
      { label: "국세청 — 2025년 귀속 연말정산 가이드", url: "https://www.nts.go.kr" },
      { label: "홈택스 연말정산 간소화 서비스", url: "https://www.hometax.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "IRP계좌-가입-세액공제", title: "IRP 계좌 세액공제", description: "연 900만원 납입 시 최대 148만원 환급받아요." },
  { slug: "연말정산-신용카드-공제-한도", title: "신용카드 소득공제", description: "신용카드·체크카드 공제로 과세표준을 낮춰요." },
  { slug: "연말정산-의료비-공제", title: "의료비 세액공제", description: "총급여의 3% 초과분부터 15% 세액공제받아요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 · 소득세 · 세율</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        연말정산 세율표<br />
        과세표준 구간별 소득세율과 계산법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        소득세는 벌수록 높은 세율을 적용하는 누진세 구조예요.{" "}
        <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법 제55조</a>에
        따라 과세표준 1,400만원 이하는 6%에서 10억원 초과 45%까지 8개 구간으로 나뉘어요.
        핵심은 높은 세율이 전체 소득이 아닌 해당 구간 금액에만 적용된다는 거예요.
      </p>

      <Divider />

      <H2>2025년 귀속 소득세 세율표</H2>
      <p style={body}>
        2025년(2026년 연말정산) 세율은 2023년부터 동일하게 유지되고 있어요. 과세표준 금액에 해당 세율을 곱하고 누진공제액을 빼면 산출세액이 나와요.
      </p>

      <SectionBadge>소득세 세율표 (2025년 귀속)</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>과세표준</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75" }}>세율</th>
              <th style={{ padding: "10px 12px", textAlign: "right", borderBottom: "2px solid #1D9E75" }}>누진공제액</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["1,400만원 이하", "6%", "—"],
              ["1,400만원 초과 ~ 5,000만원 이하", "15%", "126만원"],
              ["5,000만원 초과 ~ 8,800만원 이하", "24%", "522만원"],
              ["8,800만원 초과 ~ 1억 5,000만원 이하", "35%", "1,490만원"],
              ["1억 5,000만원 초과 ~ 3억원 이하", "38%", "1,940만원"],
              ["3억원 초과 ~ 5억원 이하", "40%", "2,540만원"],
              ["5억원 초과 ~ 10억원 이하", "42%", "3,540만원"],
              ["10억원 초과", "45%", "6,540만원"],
            ].map(([range, rate, deduct], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                <td style={{ padding: "9px 12px" }}>{range}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", fontWeight: 700, color: "#1D9E75" }}>{rate}</td>
                <td style={{ padding: "9px 12px", textAlign: "right" }}>{deduct}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GreenBox>
        계산식: 과세표준 × 세율 - 누진공제액 = 산출세액<br />
        예시: 과세표준 2,800만원 → 2,800만원 × 15% - 126만원 = 294만원
      </GreenBox>

      <Divider />

      <H2>세금 계산 4단계 흐름</H2>
      <p style={body}>
        세율표만 봐서는 내 세금이 얼마인지 모르죠. 총급여에서 출발해서 결정세액이 나오기까지의 흐름을 순서대로 짚어볼게요.
      </p>

      <Steps steps={STEPS} />

      <BorderBox>
        소득공제는 과세표준을 낮춰서 세율 구간을 떨어뜨려요.<br />
        세액공제는 산출세액에서 직접 빼주는 방식이라 절세 효과가 더 커요.<br />
        IRP·연금저축은 세액공제 항목이라서 납입 금액만큼 직접 환급받아요.
      </BorderBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <RelatedArticles items={RELATED} />
      <Disclaimer text="이 글은 2025년 귀속(2026년 연말정산) 소득세법을 기준으로 작성됐어요. 세율은 법 개정 시 변경될 수 있으니 국세청(126) 또는 홈택스에서 확인하세요." />
    </ArticleLayout>
  );
}
