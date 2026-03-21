"use client";

// Q1. 지방세 고지서를 받았는데 납부기한이 지났거나 곧 지날 것 같아서 가산금이 얼마일지 걱정하는 상황
// Q2. 가산금 계산 후 최대한 빨리 납부하기 : 위택스에서 지금 바로 납부
// Q3. 세목별 납부기한, 기본 3% + 월 0.66% 가산금 공식, 45만원 이하 면제, 75% 상한, 압류까지 가는 절차
// Q4. GreenBox(세목별 납부기한 표) + GreenBox(가산금 계산표) + BorderBox(연체 후 제재 단계) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const PAY_STEPS = [
  { title: "위택스 접속 후 로그인", description: "wetax.go.kr 또는 스마트위택스 앱에서 공동인증서·금융인증서로 로그인해요." },
  { title: "납부할 세액 조회", description: "내 납부 내역에서 미납 세금을 조회하면 가산금 포함된 실제 납부액이 나와요." },
  { title: "결제 수단 선택 후 납부", description: "계좌이체·신용카드·간편결제 중 하나로 납부해요. 납부 완료 후 영수증을 저장해두세요." },
];

const FAQS = [
  {
    q: "지방세 45만원 이하면 가산금 안 내나요?",
    a: "네, 2024년 1월부터 45만원 이하는 납부지연가산세가 면제돼요. 원래 세액만 내면 돼요.",
  },
  {
    q: "가산금은 최대 얼마까지 붙나요?",
    a: "최대 60개월까지 붙고, 원래 세액의 75%가 상한선이에요. 75%를 초과해서 붙지는 않아요.",
  },
  {
    q: "재산세를 7월에 못 내면 9월에 한꺼번에 낼 수 있나요?",
    a: "7월분과 9월분은 별개 고지서예요. 7월분 기한을 넘기면 7월분에 가산금이 붙어요. 합산해서 낸다고 면제되지 않아요.",
  },
  {
    q: "위택스에서 가산금 포함 금액을 바로 확인할 수 있나요?",
    a: "네, wetax.go.kr에서 로그인 후 납부할 세액을 조회하면 가산금이 포함된 실제 납부액이 나와요.",
  },
  {
    q: "취득세 60일을 넘기면 어떻게 되나요?",
    a: "등기 전까지는 가산금이 붙어요. 취득일로부터 60일을 넘기면 3% 기본 가산금 + 월 0.66%가 계속 붙어요.",
  },
  {
    q: "자동차세 연납 신청하면 얼마나 절약되나요?",
    a: "1월에 연납 신청하면 약 5~6% 할인돼요. 2월부터는 할인율이 줄어요. 매년 1월 16일 ~ 31일에 위택스나 각 지방자치단체에서 신청하면 돼요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "지방세기본법 제55조 (납부지연가산세)", url: "https://www.law.go.kr/법령/지방세기본법" },
      { label: "위택스 : 지방세 납부 및 조회", url: "https://www.wetax.go.kr" },
      { label: "행정안전부 지방세 정책", url: "https://www.mois.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "국세-납부기한", title: "국세 납부 기한", description: "소득세·부가세 등 국세 납부기한이에요." },
  { slug: "취득세", title: "취득세 계산 방법", description: "부동산 살 때 취득세 계산법이에요." },
  { slug: "재산세", title: "재산세 과세 기준", description: "재산세 부과 기준과 납부 시기예요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 지방세 · 납부기한</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        지방세 납부 기한과 가산금<br />
        연체 시 계산 방법과 위택스 납부
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        지방세 기한을 넘기면 기본 3% 가산금이 바로 붙고, 이후 매월 0.66%씩 추가돼요.
        100만원을 6개월 연체하면 가산금만 9만원에 달해요.
        납부 기한을 세목별로 확인하고 위택스에서 빠르게 납부하는 게 최선이에요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>세목별 납부 기한</H2>
      <p style={body}>
        지방세는 세목마다 납부 기한이 달라요.
        고지서에 적힌 날짜가 절대 기준이고, 위택스에서도 조회할 수 있어요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>세목</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>납부 시기</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>비고</th>
            </tr>
          </thead>
          <tbody>
            {[
              { tax: "취득세", period: "취득일로부터 60일 이내", note: "부동산 등기 전 납부 필수" },
              { tax: "재산세", period: "7월, 9월 (연 2회)", note: "7·9월 각각 별개 기한" },
              { tax: "자동차세", period: "6월, 12월 (연 2회)", note: "1월 연납 시 5~6% 할인" },
              { tax: "등록면허세", period: "등기·등록 시 즉시", note: "신청 당일 납부" },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "5px 8px", fontWeight: 700, whiteSpace: "nowrap" }}>{row.tax}</td>
                <td style={{ padding: "5px 8px" }}>{row.period}</td>
                <td style={{ padding: "5px 8px", fontSize: 12, color: "#555" }}>{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: "#666", marginTop: 8, marginBottom: 0 }}>
          ★ 고지서 날짜가 우선 / 위택스(wetax.go.kr) 또는 각 지방자치단체 앱에서 조회 가능
        </p>
      </GreenBox>

      <H2>가산금 계산 방법</H2>
      <p style={body}>
        기한을 넘기면 즉시 3%가 붙고, 그 다음 달부터 매월 0.66%씩 추가돼요.
        아래 표로 연체 기간별 실제 금액을 확인해보세요.
      </p>

      <GreenBox>
        <strong>가산금 공식</strong><br />
        기본 가산금 = 미납 세액 × 3%<br />
        월별 추가 = 미납 세액 × 0.66% × 연체 개월 수<br />
        <br />
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, marginTop: 8 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>미납 세액</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>1개월 연체</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>6개월 연체</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>12개월 연체</th>
            </tr>
          </thead>
          <tbody>
            {[
              { amount: "100만원", m1: "3만 6,600원", m6: "8만 9,600원", m12: "15만 9,200원" },
              { amount: "200만원", m1: "7만 3,200원", m6: "17만 9,200원", m12: "31만 8,400원" },
              { amount: "500만원", m1: "18만 3,000원", m6: "44만 8,000원", m12: "79만 6,000원" },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "5px 8px", fontWeight: 700 }}>{row.amount}</td>
                <td style={{ padding: "5px 8px" }}>{row.m1}</td>
                <td style={{ padding: "5px 8px" }}>{row.m6}</td>
                <td style={{ padding: "5px 8px" }}>{row.m12}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: "#666", marginTop: 8, marginBottom: 0 }}>
          ★ 45만원 이하 세액은 납부지연가산세 면제 (2024년 1월부터) / 최대 60개월, 원세액의 75% 상한
        </p>
      </GreenBox>

      <H2>연체 후 제재 단계</H2>
      <p style={body}>
        가산금으로 끝나지 않아요. 계속 안 내면 독촉장, 압류까지 진행돼요.
        압류 단계는 신용도에 심각한 영향을 줄 수 있어요.
      </p>

      <BorderBox>
        <strong>1단계: 납부기한 경과</strong><br />
        기본 가산금 3% 즉시 발생 + 이후 매월 0.66% 추가<br />
        <br />
        <strong>2단계: 독촉장 발송</strong><br />
        기한 후 수 주 내 독촉장 송달 → 독촉 기한 내 납부 안 하면 다음 단계<br />
        <br />
        <strong>3단계: 재산 압류</strong><br />
        예금 계좌, 급여(1/2 이내), 부동산, 자동차 압류 가능<br />
        압류 후에도 미납 시 공매(강제 처분) 진행<br />
        <br />
        <strong>4단계: 신용 불이익</strong><br />
        일정 금액 이상 체납 시 신용정보원에 등록 → 금융 거래 제한<br />
        <br />
        ★ 당장 전액 납부가 어려우면 위택스에서 분납 신청하는 게 낫지요
      </BorderBox>

      <H2>위택스에서 빠르게 납부하기</H2>
      <p style={body}>
        연체가 시작됐다면 지금 당장 납부하는 게 최선이에요.
        하루가 지날수록 가산금이 계속 붙으니까요.
        위택스(wetax.go.kr)에서 3단계로 바로 납부할 수 있어요.
      </p>

      <Steps steps={PAY_STEPS} />

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 지방세기본법 기준으로 작성됐어요. 가산금 요율과 면제 기준은 법 개정으로 변경될 수 있어요. 실제 납부액은 위택스(wetax.go.kr)에서 살펴봐요." />
    </ArticleLayout>
  );
}
