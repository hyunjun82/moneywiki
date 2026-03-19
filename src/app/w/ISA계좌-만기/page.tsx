"use client";

// Q1. ISA 만기 3년 됐는데 다음에 뭘 해야 하는지 모르는 가입자
// Q2. 해지 or 연장 결정 → 앱에서 신청 → 재가입 계획
// Q3. 자동해지 안됨 / 즉시해지=비과세수령 / 연장=5년+추가비과세 / 재가입 가능 / 만기 전 안정자산 전환
// Q4. GreenBox(만기 선택지 비교) + GreenBox(연장 시 비과세 한도) + BorderBox(체크리스트) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "ISA 만기 되면 자동으로 해지되나요?",
    a: "아니에요. 자동 해지되지 않아요. 만기 후에도 계좌는 그대로 유지되고, 직접 해지 신청해야 돈을 받을 수 있어요. 안 하면 계속 운용 상태가 유지돼요.",
  },
  {
    q: "만기 후 연장하면 비과세 한도가 늘어나나요?",
    a: "네, 연장하면 추가 비과세 한도를 새로 받아요. 서민형이면 400만원, 일반형이면 200만원을 추가로 받아서 총 2배 비과세 혜택을 받을 수 있어요.",
  },
  {
    q: "ISA 해지하고 바로 재가입할 수 있나요?",
    a: "네, 바로 재가입 가능해요. 해지 후 같은 증권사에서 새로 개설하면 돼요. 비과세 한도도 리셋되어서 다시 서민형 400만원을 받을 수 있어요.",
  },
  {
    q: "만기 전에 주식을 전부 팔아야 하나요?",
    a: "꼭 그럴 필요는 없어요. 만기 해지 시 ETF·주식을 현금화해서 받거나, 연장을 선택해서 계속 보유할 수 있어요. 다만 만기 직전 변동성이 큰 투자는 줄이는 게 안전해요.",
  },
  {
    q: "ISA 만기금을 IRP로 이전하면 어떤 혜택이 있나요?",
    a: "ISA 만기금을 연금저축 또는 IRP로 이전하면 이전 금액의 10%(최대 300만원)를 추가 세액공제로 받아요. ISA 비과세 혜택에 더해 연금 세액공제까지 이중 절세가 돼요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "금융위원회: ISA 제도 안내", url: "https://www.fsc.go.kr" },
      { label: "금융감독원: ISA 연장 및 만기 안내", url: "https://www.fss.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "ISA계좌-기본", title: "ISA 계좌 유형 선택 (중개형·서민형)", description: "ISA 가입 전 유형 선택 방법이에요." },
  { slug: "ISA계좌-ETF-추천", title: "ISA 계좌 ETF 추천 고배당", description: "ISA에 넣으면 좋은 ETF 5가지예요." },
  { slug: "연금저축-세액공제-신청방법", title: "연금저축 세액공제 400만원", description: "ISA 만기금 이전 후 추가 공제 방법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · ISA · 만기 해지</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        ISA 계좌 만기 3년<br />
        해지·연장·재가입 완전 정리
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        ISA 만기가 됐다고 자동으로 해지되지 않아요. 직접 신청해야 비과세 혜택을 받아요.
        즉시 해지해서 돈을 받거나, 5년 연장해서 추가 비과세 한도를 더 챙길 수도 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>만기 후 3가지 선택지</H2>
      <p style={body}>
        만기일이 지나도 계좌는 그대로예요. 3가지 중 하나를 골라야 해요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>선택</th>
              <th style={{ textAlign: "center", padding: "5px 8px" }}>비과세</th>
              <th style={{ textAlign: "center", padding: "5px 8px" }}>추천 대상</th>
              <th style={{ textAlign: "right", padding: "5px 8px" }}>비고</th>
            </tr>
          </thead>
          <tbody>
            {[
              { action: "즉시 해지", tax: "적용", target: "목돈 필요한 경우", note: "비과세 후 원금+수익 수령" },
              { action: "5년 연장", tax: "추가 한도 적용", target: "장기 투자자", note: "연장 1회, 총 8년" },
              { action: "그대로 유지", tax: "적용", target: "결정 미룰 때", note: "해지 전까지 계속 운용" },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)", background: i === 1 ? "rgba(29,158,117,0.05)" : undefined }}>
                <td style={{ padding: "5px 8px", fontWeight: 700 }}>{row.action}</td>
                <td style={{ textAlign: "center", padding: "5px 8px", color: "#1D9E75", fontSize: 12 }}>{row.tax}</td>
                <td style={{ textAlign: "center", padding: "5px 8px", fontSize: 12 }}>{row.target}</td>
                <td style={{ textAlign: "right", padding: "5px 8px", fontSize: 12 }}>{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: "#666", marginTop: 8, marginBottom: 0 }}>
          ★ 만기 1개월 전부터 연장 신청 가능 (기한 놓치면 연장 불가)
        </p>
      </GreenBox>

      <H2>연장 시 비과세 한도 비교</H2>
      <p style={body}>
        연장하면 비과세 한도가 새로 추가돼요. 배당·이자 수익이 많은 사람에게 특히 유리해요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>유형</th>
              <th style={{ textAlign: "center", padding: "5px 8px" }}>3년 비과세</th>
              <th style={{ textAlign: "center", padding: "5px 8px" }}>5년 연장 비과세</th>
              <th style={{ textAlign: "right", padding: "5px 8px" }}>총 비과세 합계</th>
            </tr>
          </thead>
          <tbody>
            {[
              { type: "ISA 서민형", base: "400만원", extra: "400만원", total: "800만원" },
              { type: "ISA 일반형", base: "200만원", extra: "200만원", total: "400만원" },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)", background: i === 0 ? "rgba(29,158,117,0.05)" : undefined }}>
                <td style={{ padding: "5px 8px", fontWeight: 700 }}>{row.type}</td>
                <td style={{ textAlign: "center", padding: "5px 8px" }}>{row.base}</td>
                <td style={{ textAlign: "center", padding: "5px 8px", color: "#1D9E75" }}>{row.extra}</td>
                <td style={{ textAlign: "right", padding: "5px 8px", fontWeight: 700 }}>{row.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: "#666", marginTop: 8, marginBottom: 0 }}>
          ※ 연장은 1회만 가능 / 연장 후 만기 도래 시 재가입 가능
        </p>
      </GreenBox>

      <H2>만기 전후 체크리스트</H2>
      <p style={body}>
        만기 3개월 전부터 미리 준비하는 게 유리해요.
        만기 후 IRP 이전까지 계획하면 절세 효과를 두 배로 챙길 수 있어요.
      </p>

      <BorderBox>
        <strong>만기 3개월 전</strong><br />
        만기일 정확한 날짜 확인 (가입일 + 3년)<br />
        해지 vs 연장 결정<br />
        변동성 큰 주식·레버리지 ETF 비중 줄이기<br />
        채권·단기채권 ETF로 안전자산 전환<br />
        <br />
        <strong>만기일 당일</strong><br />
        은행·증권사 앱 접속 → ISA 계좌 → 만기 해지 신청<br />
        비과세 한도 자동 적용 후 원금+수익 입금 (1~2일)<br />
        <br />
        <strong>만기 해지 후</strong><br />
        IRP 이전: 이전 금액 10% 추가 세액공제 (최대 300만원)<br />
        바로 재가입: 서민형 조건 재확인 후 새 ISA 개설<br />
        <br />
        ★ 연장 신청은 만기 1개월 전부터 가능 → 만기일 지나면 연장 불가
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 금융위원회 기준으로 작성됐어요. ISA 연장 기간과 비과세 한도는 세법 개정에 따라 변경될 수 있어요." />
    </ArticleLayout>
  );
}
