"use client";

// Q1. 만 19~34세 청년인데 K-패스 환급률 30%가 내게 적용되는지 확인하고 싶은 상황
// Q2. 청년 요금 30% 적용 조건 확인 → K-패스 가입 시 청년으로 등록 → 매달 환급 받기
// Q3. 만 19~34세 기준(주민등록) / 별도 증빙 불필요 / 만 35세 생일 다음 달부터 일반 전환
// Q4. GreenBox(나이별 환급률 표 + 연 절감액 시뮬) + BorderBox(청년 등록 주의사항) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "청년 30% 적용받으려면 따로 서류를 내야 하나요?",
    a: "아니에요. k-pass.or.kr에서 회원 가입할 때 주민등록번호로 나이가 자동 확인돼요. 만 19~34세면 별도 서류 없이 바로 청년 요금이 적용돼요.",
  },
  {
    q: "만 35세 생일이 지나면 어떻게 되나요?",
    a: "생일이 지난 달의 다음 달부터 일반(20%) 요금으로 자동 전환돼요. 예를 들어 3월에 만 35세가 되면 4월 이용분부터 20% 환급이 적용돼요. 별도 신청 없이 자동 변경이에요.",
  },
  {
    q: "만 19세 미만은 K-패스 신청할 수 없나요?",
    a: "청년 할인은 만 19세부터지만, K-패스 자체는 연령 제한이 없어요. 만 19세 미만은 일반 요금(20%) 또는 선불 티머니 카드로도 K-패스를 이용할 수 있어요.",
  },
  {
    q: "청년 30% 환급을 월 교통비로 계산하면 얼마예요?",
    a: "월 교통비 8만원이면 30% 환급 = 월 2.4만원, 연 28.8만원이에요. 일반(20%)과 비교하면 연 9.6만원 더 환급받는 셈이에요. 교통비가 많을수록 청년 혜택이 커요.",
  },
  {
    q: "저소득 청년이면 30%와 53% 중 어떤 게 적용되나요?",
    a: "저소득층(기초생활수급자·차상위계층)이면 53%가 적용돼요. 만 19~34세 청년이더라도 저소득 자격을 증빙하면 53%로 더 높은 환급률을 받을 수 있어요. K-패스 가입 시 저소득층으로 등록하면 돼요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "K-패스 공식 사이트 (회원가입)", url: "https://www.korea-pass.kr" },
      { label: "국토교통부: K-패스 청년 혜택 안내", url: "https://www.molit.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "K-패스-카드-비교", title: "K-패스 카드 전체 비교", description: "신용·체크·선불 전 카드 한눈에 비교해요." },
  { slug: "K-패스-가입방법", title: "K-패스 가입방법 절차", description: "카드 발급 후 회원 등록 전 과정이에요." },
  { slug: "K-패스-환급-계산", title: "K-패스 환급액 계산", description: "내 교통비로 얼마 돌아오는지 확인해요." },
];

const GREEN = "#1D9E75";

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: GREEN, fontWeight: 600, marginBottom: 10 }}>
        교통 · K-패스 · 청년 할인
      </p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        K-패스 청년 환급 30%<br />
        만 19~34세 신청 방법과 절감액
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        K-패스 청년 요금은 만 19~34세면 교통비의 30%를 돌려줘요.
        일반(20%)보다 10%p 높아서 같은 카드를 써도 더 많이 환급받아요.
        별도 서류 없이 주민등록번호 확인으로 자동 적용돼요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>나이별 K-패스 환급률 비교</H2>
      <p style={body}>
        청년이면 같은 교통비로도 일반보다 연간 수만 원을 더 받아요.
        월 교통비 8만원 기준으로 비교해봤어요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>대상</th>
              <th style={{ textAlign: "center", padding: "5px 8px" }}>환급률</th>
              <th style={{ textAlign: "right", padding: "5px 8px" }}>월 환급 (8만원 기준)</th>
              <th style={{ textAlign: "right", padding: "5px 8px" }}>연 환급액</th>
            </tr>
          </thead>
          <tbody>
            {[
              { group: "만 35세 이상 (일반)", rate: "20%", monthly: "1.6만원", yearly: "19.2만원", highlight: false },
              { group: "만 19~34세 (청년)", rate: "30%", monthly: "2.4만원", yearly: "28.8만원", highlight: true },
              { group: "기초수급자·차상위", rate: "53%", monthly: "4.2만원", yearly: "50.9만원", highlight: false },
            ].map((r, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)", background: r.highlight ? "rgba(29,158,117,0.06)" : undefined }}>
                <td style={{ padding: "5px 8px", fontWeight: r.highlight ? 700 : 400 }}>{r.group}</td>
                <td style={{ textAlign: "center", padding: "5px 8px", color: GREEN, fontWeight: 700 }}>{r.rate}</td>
                <td style={{ textAlign: "right", padding: "5px 8px", fontWeight: r.highlight ? 700 : 400 }}>{r.monthly}</td>
                <td style={{ textAlign: "right", padding: "5px 8px", fontWeight: r.highlight ? 700 : 400 }}>{r.yearly}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: "#555", marginTop: 8, marginBottom: 0 }}>
          ★ 월 15회 이상 이용 기준 / 월 교통비 8만원 가정 / 청년 기준 일반 대비 연 9.6만원 추가 환급
        </p>
      </GreenBox>

      <H2>청년 30% 적용 조건과 주의사항</H2>
      <p style={body}>
        청년 환급은 주민등록 기준이라 따로 증명할 필요 없어요.
        단, 나이가 바뀌는 시점 전후는 알아두는 게 좋아요.
      </p>

      <BorderBox>
        <strong>청년 적용 조건</strong><br />
        만 19세 생일이 지난 달부터 청년 30% 자동 적용<br />
        만 35세 생일이 지난 달의 다음 달부터 일반 20%로 자동 전환<br />
        k-pass.or.kr 가입 시 주민등록번호로 자동 확인 — 별도 서류 불필요<br />
        <br />
        <strong>더 높은 환급률 (53%)</strong><br />
        기초생활수급자 또는 차상위계층 해당 시 K-패스 가입 때 저소득으로 등록<br />
        만 19~34세 청년이라도 저소득 자격 있으면 53% 우선 적용<br />
        <br />
        <strong>환급 시작 시점</strong><br />
        가입 당월 15회 이상 이용 → 다음 달 10일 전후 환급<br />
        월 중순 이후 가입이라도 해당 월 15회 채우면 환급 인정
      </BorderBox>

      <H2>청년 K-패스 절감액 시뮬레이션</H2>
      <p style={body}>
        월 교통비 규모에 따라 연간 절감액이 크게 달라져요.
        출퇴근 외에 주말 이동까지 합산하면 생각보다 많이 쌓여요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>월 교통비</th>
              <th style={{ textAlign: "right", padding: "5px 8px" }}>청년 30% 환급</th>
              <th style={{ textAlign: "right", padding: "5px 8px" }}>연 절감액</th>
              <th style={{ textAlign: "right", padding: "5px 8px" }}>일반 대비 추가</th>
            </tr>
          </thead>
          <tbody>
            {[
              { monthly: "3만원", refund: "9,000원", yearly: "10.8만원", extra: "+3.6만원" },
              { monthly: "5만원", refund: "1.5만원", yearly: "18만원", extra: "+6만원" },
              { monthly: "8만원", refund: "2.4만원", yearly: "28.8만원", extra: "+9.6만원" },
              { monthly: "12만원", refund: "3.6만원", yearly: "43.2만원", extra: "+14.4만원" },
            ].map((r, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "5px 8px", fontWeight: 600 }}>{r.monthly}</td>
                <td style={{ textAlign: "right", padding: "5px 8px", color: GREEN, fontWeight: 700 }}>{r.refund}</td>
                <td style={{ textAlign: "right", padding: "5px 8px" }}>{r.yearly}</td>
                <td style={{ textAlign: "right", padding: "5px 8px", color: "#7C3AED", fontWeight: 600 }}>{r.extra}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: "#555", marginTop: 8, marginBottom: 0 }}>
          ★ 월 15회 이상 이용 기준 / 월 환급 한도 내 계산 (카드사별 최대 6만원 내외)
        </p>
      </GreenBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준으로 작성됐어요. K-패스 청년 요금 기준 나이는 정책 변경으로 조정될 수 있으니 k-pass.or.kr 공지를 확인하세요." />
    </ArticleLayout>
  );
}
