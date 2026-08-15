"use client";
// Q1. 최저임금 받고 일했는데 실업급여도 적게 나오는 거 아닌지 걱정되는 상황이에요.
// Q2. 2026년 실업급여 하한액이 1일 66,048원(월 약 198만원)이라는 걸 확인하고, 본인 수급액을 예상하는 행동.
// Q3. 하한액 66,048원(1일), 상한액 68,100원(1일), 최저임금 80% x 8시간 계산법, 상한액과의 역전 현상.
// Q4. GreenBox(핵심 금액) + BorderBox(계산 예시) + 표(연도별 변화) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "하한액이 있으면 누구나 최소 이만큼은 받나요?",
    a: "고용보험에 가입돼 있었고 실업급여 수급 자격을 갖추면 하한액 이상을 받아요. 근무 기간, 임금과 관계없이 최소 금액이 보장돼요.",
  },
  {
    q: "알바도 하한액이 적용되나요?",
    a: "네. 고용보험에 가입돼 있었다면 알바도 동일하게 하한액이 적용돼요.",
  },
  {
    q: "실업급여가 월급보다 많을 수 있나요?",
    a: "가능해요. 최저임금으로 일했던 분이 실업급여를 받으면 일할 때보다 많은 금액을 받는 경우가 생겨요. 이걸 '역전 현상'이라고 불러요.",
  },
  {
    q: "상한액은 얼마예요?",
    a: "2026년 기준 1일 상한액은 68,100원이에요. 7년 만에 인상됐어요. 하한액과 불과 2,052원 차이예요.",
  },
  {
    q: "하한액 계산은 어떻게 하나요?",
    a: "최저임금 x 80% x 8시간이에요. 2026년 기준 10,320원 x 0.8 x 8 = 66,048원이에요.",
  },
  {
    q: "실업급여 지급 기간은 얼마나 되나요?",
    a: "나이와 고용보험 가입 기간에 따라 120일~270일이에요. 50세 이상이고 가입 기간이 길수록 오래 받아요.",
  },
],

REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "고용보험법", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용24 실업급여 안내", url: "https://www.ei.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "실업급여-상한액", title: "실업급여 상한액", description: "2026년 상한액 68,100원, 7년 만의 인상 배경이에요." },
  { slug: "실업급여-금액", title: "실업급여 금액 계산", description: "퇴직 전 평균임금 기준 실업급여 계산법이에요." },
  { slug: "알바-실업급여", title: "알바도 실업급여 받을 수 있나요?", description: "고용보험 가입 기준과 수급 자격을 정리해요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 수급액</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        2026년 실업급여 하한액, 하루 66,048원<br />
        최소 보장액 계산법과 상한액 비교
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        최저임금 받고 일했는데 실업급여도 적게 나오지 않을까 걱정되시죠?
        실업급여에는 하한액이 있어서 월급이 아무리 적었어도 최소 금액은 보장돼요.
        2026년 기준 1일 66,048원, 월로 따지면 약 198만원이에요.
      </p>

      <ArticleAd position="intro" />

      <Divider />

      <H2>2026년 하한액과 상한액</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>에 따르면
        실업급여 구직급여의 하한액은 최저임금의 80%에 1일 소정근로시간(8시간)을 곱한 금액이에요.
        2026년 최저임금이 시간당 10,320원이니까 하한액도 올라갔어요.
      </p>

      <GreenBox>
        2026년 실업급여 기준이에요.<br />
        · <strong>하한액</strong>: 1일 66,048원 (월 약 198만원)<br />
        · <strong>상한액</strong>: 1일 68,100원 (월 약 204만원)<br />
        · 하한액과 상한액 차이가 불과 <strong>2,052원</strong>
      </GreenBox>

      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>하한액은 어떻게 계산하나요?</H2>
      <p style={body}>
        계산 공식은 단순해요. 최저임금에 80%를 곱하고, 여기에 8시간을 곱하면 돼요.
      </p>

      <BorderBox>
        2026년 하한액 계산이에요.<br /><br />
        <strong>최저임금</strong>: 시간당 10,320원<br />
        <strong>80% 적용</strong>: 10,320 x 0.8 = 8,256원<br />
        <strong>8시간 적용</strong>: 8,256 x 8 = <strong>66,048원 (1일)</strong><br /><br />
        월 30일 기준: 66,048 x 30 = <strong>약 198만원</strong>
      </BorderBox>

      <Divider />

      <H2>하한액·상한액 변화 추이</H2>
      <p style={body}>
        상한액은 2019년부터 66,000원으로 동결됐다가 2026년에 7년 만에 인상됐어요.
        하한액은 최저임금에 연동되니까 매년 올라왔고, 상한액과 거의 같아지는 역전 현상이 생겼었어요.
      </p>

      <SectionBadge>연도별 비교</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>연도</th>
              <th style={{ padding: "10px 12px", textAlign: "right", borderBottom: "2px solid #1D9E75" }}>하한액 (1일)</th>
              <th style={{ padding: "10px 12px", textAlign: "right", borderBottom: "2px solid #1D9E75" }}>상한액 (1일)</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["2024년", "63,104원", "66,000원"],
              ["2025년", "64,192원", "66,000원"],
              ["2026년", "66,048원", "68,100원"],
            ].map(([year, low, high], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{year}</td>
                <td style={{ padding: "9px 12px", textAlign: "right" }}>{low}</td>
                <td style={{ padding: "9px 12px", textAlign: "right" }}>{high}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법과 고용24 자료를 바탕으로 작성됐어요. 개인별 수급액은 퇴직 전 평균임금과 고용보험 가입 기간에 따라 달라져요." />
    </ArticleLayout>
  );
}
