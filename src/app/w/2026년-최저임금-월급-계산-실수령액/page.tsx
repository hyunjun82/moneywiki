"use client";

// Q1. 최저임금으로 일하는 아르바이트생·직장인이 급여명세서 받고 "내가 맞게 받고 있나?" 확인하는 상황
// Q2. 본인 근무시간 기준 예상 월급·실수령액 계산 후 급여명세서와 대조 → 부족하면 사업주에 정정 요청
// Q3. 시급 10,320원 × 209시간 = 2,156,880원 / 4대보험 공제 후 실수령액 / 주휴수당 포함 계산
// Q4. GreenBox(핵심 숫자 요약) + 정적 표(월급 계산) + GreenBox(4대보험 공제) + BorderBox(주휴수당) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "2026년 최저시급은 얼마예요?",
    a: "2026년 최저시급은 10,320원이에요. 2025년 10,030원에서 290원(2.9%) 올랐어요. 고용노동부가 2025년 8월에 확정 발표했죠.",
  },
  {
    q: "주휴수당 안 주면 어떻게 되나요?",
    a: "주 15시간 이상 개근한 직원에게 주휴수당을 주지 않으면 최저임금법 위반이에요. 고용노동부 1350에 신고하거나 지방고용노동청에 진정을 넣을 수 있어요.",
  },
  {
    q: "월 209시간이 왜 기준인가요?",
    a: "주 40시간 + 주휴일 8시간 = 주 48시간 × (365일 ÷ 7일 ÷ 12개월) = 월 209시간이에요. 주 5일 8시간 근무 기준 표준값이에요.",
  },
  {
    q: "알바생도 4대보험 들어야 하나요?",
    a: "주 15시간 미만, 월 60시간 미만은 건강보험·국민연금 가입이 면제돼요. 하지만 고용보험은 주 15시간 미만도 3개월 이상 일하면 가입해야 해요. 산재보험은 모든 근로자가 자동 가입이에요.",
  },
  {
    q: "최저임금 미만으로 받고 있어요. 어떻게 해요?",
    a: "고용노동부 상담전화 1350 또는 가까운 지방고용노동청에 신고하세요. 온라인으로는 고용노동부 민원마당(minwon.moel.go.kr)에서 진정서를 제출할 수 있어요. 3년 이내 미지급 임금을 소급 청구할 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부: 2026년 최저임금 안내", url: "https://www.moel.go.kr" },
      { label: "최저임금위원회: 최저임금 현황", url: "https://www.minimumwage.go.kr" },
      { label: "근로기준법", url: "https://www.law.go.kr/법령/근로기준법" },
    ],
  },
];

const RELATED = [
  { slug: "주휴수당-지급-조건-결근-시-계산", title: "주휴수당 지급 조건과 계산법", description: "주 15시간 이상 개근 시 받을 수 있는 주휴수당이에요." },
  { slug: "4대보험-가입-내역-확인서-발급-자격-득실", title: "4대보험 가입 내역 확인서 발급", description: "내 4대보험 가입 이력을 확인하는 방법이에요." },
  { slug: "실업급여-수급-자격-조건", title: "실업급여 수급 자격과 조건", description: "퇴직 후 실업급여 받을 수 있는지 확인하세요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로·노동 · 최저임금 · 2026년</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        2026년 최저임금 월급 계산<br />
        4대보험 공제 후 실수령액 얼마예요?
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        2026년 최저시급은 10,320원이에요.
        주 5일 8시간 기준 월 209시간 근무하면 월급은 2,156,880원이에요.
        여기서 4대보험 공제하면 실수령액은 약 195만~197만원대가 돼요.
        주휴수당까지 포함하면 더 받아요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>2026년 최저임금 월급, 핵심 숫자</H2>
      <p style={body}>
        최저시급 × 월 근무시간 = 월급이에요. 주 40시간 근무 기준 월 209시간이 표준이에요.
      </p>

      <GreenBox>
        <strong>2026년 최저임금 핵심 숫자</strong><br />
        최저시급: 10,320원 (2025년 10,030원 대비 +290원)<br />
        월 209시간 기준 기본급: 2,156,880원<br />
        4대보험 공제 후 실수령액: 약 195만~197만원<br />
        주휴수당 포함 시 기본급: 약 2,486,880원 (월 4주 기준)<br />
        주휴수당 포함 실수령액: 약 225만~230만원
      </GreenBox>

      <H2>월급별 실수령액 계산표</H2>
      <p style={body}>
        실제 공제 비율로 계산한 예상 실수령액이에요.
        국민연금(4.5%) + 건강보험(3.545%) + 장기요양(건보료의 12.81%) + 고용보험(0.9%)을 공제해요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>구분</th>
              <th style={{ textAlign: "right", padding: "5px 8px" }}>금액</th>
            </tr>
          </thead>
          <tbody>
            {[
              { label: "기본급 (209시간)", amount: "2,156,880원", highlight: false },
              { label: "국민연금 공제 (4.5%)", amount: "△ 97,059원", highlight: false },
              { label: "건강보험 공제 (3.545%)", amount: "△ 76,460원", highlight: false },
              { label: "장기요양보험 (건보료×12.81%)", amount: "△ 9,794원", highlight: false },
              { label: "고용보험 공제 (0.9%)", amount: "△ 19,411원", highlight: false },
              { label: "총 공제액", amount: "202,724원", highlight: false },
              { label: "실수령액 (세전 소득세 없을 경우)", amount: "약 1,954,156원", highlight: true },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)", background: row.highlight ? "rgba(29,158,117,0.08)" : undefined }}>
                <td style={{ padding: "5px 8px", fontWeight: row.highlight ? 700 : 400 }}>{row.label}</td>
                <td style={{ textAlign: "right", padding: "5px 8px", fontWeight: row.highlight ? 700 : 400, color: row.highlight ? "#1D9E75" : undefined }}>{row.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: "#666", marginTop: 8, marginBottom: 0 }}>
          ※ 산재보험은 사업주가 전액 부담 (본인 공제 없음)<br />
          ※ 연간 총급여 3,300만원 이하는 근로소득세도 거의 없어요
        </p>
      </GreenBox>

      <H2>주휴수당 포함하면 더 받아요</H2>
      <p style={body}>
        주 15시간 이상 일하고 약속된 근무일을 모두 출근하면 주휴수당을 받아야 해요.
        결근이 없으면 요건 충족이에요. 지각·조퇴는 결근이 아니에요.
      </p>

      <BorderBox>
        <strong>주휴수당 계산법</strong><br />
        주 40시간 근무 기준: 10,320원 × 8시간 = 82,560원/주<br />
        월 환산 (4.345주): 약 358,000원/월<br />
        주 40시간 기준 주휴수당 포함 월 기본급: 약 2,514,880원<br />
        <br />
        주 20시간 근무 시: (20÷40) × 8 × 10,320원 = 41,280원/주<br />
        → 시간에 비례해서 줄어들어요
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>급여명세서로 확인하는 법</H2>
      <p style={body}>
        매달 급여명세서를 받으면 기본급, 주휴수당, 공제 항목을 하나씩 체크해요.
        "기타 공제"라는 항목이 있으면 사업주에게 공제 사유를 물어봐야 해요.
        근로기준법상 법정 공제(4대보험, 소득세) 외에는 동의 없이 공제할 수 없어요.
      </p>
      <p style={body}>
        최저임금 미만으로 받고 있다면 고용노동부 상담전화 1350에 전화하거나
        가까운 지방고용노동청에 신고하세요.
        최근 3년 이내 임금 체불분을 소급해서 청구할 수 있어요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 고용노동부 발표 기준으로 작성됐어요. 4대보험 공제액은 개인 상황에 따라 달라질 수 있어요." />
    </ArticleLayout>
  );
}
