"use client";

// Q1. 신용카드로 대중교통 탔는데 연말정산에서 얼마나 공제되는지 궁금한 직장인
// Q2. 대중교통 신용카드 소득공제율과 한도 파악 → 연말정산 간소화서비스에서 확인
// Q3. 대중교통 40% 공제율 / 기본 카드한도 300만원 + 추가 100만원 / 전통시장·도서공연비와 합산 최대 600만원
// Q4. GreenBox(교통수단별 공제 적용 여부) + GreenBox(공제 한도 계산) + BorderBox(간소화서비스 확인 방법) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "택시도 대중교통 공제 대상인가요?",
    a: "네, 신용카드·체크카드로 결제한 택시비도 대중교통 40% 공제 대상이에요. 현금 결제는 대상이 아니에요.",
  },
  {
    q: "대중교통 카드 공제는 별도 신청이 필요한가요?",
    a: "아니에요. 국세청 연말정산 간소화서비스에서 자동으로 조회돼요. 회사에 제출하는 소득공제신고서에 반영하면 끝이에요.",
  },
  {
    q: "교통카드(티머니 등)도 공제되나요?",
    a: "신용카드나 체크카드로 충전한 금액은 해당 카드 공제율이 적용돼요. 현금으로 충전한 티머니는 대중교통 소득공제 대상이 아니에요.",
  },
  {
    q: "대중교통 추가 100만원 공제 받으려면 뭐가 필요한가요?",
    a: "별도 조건은 없어요. 기본 카드공제 한도 300만원을 채운 뒤에도 대중교통·전통시장·도서공연비 사용액이 있으면 추가 100만원씩 더 받을 수 있어요.",
  },
  {
    q: "KTX, 고속버스도 대중교통 공제 대상인가요?",
    a: "네, 기차(KTX 포함)는 대중교통 공제 대상이에요. 고속버스도 포함돼요. 신용카드·체크카드로 결제해야 공제돼요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "조세특례제한법 제126조의2 (신용카드 소득공제)", url: "https://www.law.go.kr/법령/조세특례제한법" },
      { label: "국세청: 신용카드 소득공제 안내", url: "https://www.nts.go.kr" },
      { label: "홈택스 연말정산 간소화서비스", url: "https://www.hometax.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "연말정산", title: "연말정산 전체 흐름", description: "대중교통 공제가 포함되는 연말정산 전체 구조예요." },
  { slug: "연말정산-신용카드-공제-한도", title: "신용카드 소득공제 한도", description: "신용카드 공제 한도 300만원 계산법이에요." },
  { slug: "연말정산-식대-비과세", title: "식대 비과세 월 20만원", description: "비과세 소득 대표 항목인 식대예요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 연말정산 · 신용카드</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        연말정산 대중교통 신용카드<br />
        40% 공제율과 최대 한도
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        지하철, 버스, 기차, 택시를 신용카드로 결제하면 사용금액의 40%를 소득공제 받아요.
        기본 카드공제 한도(300만원)를 넘겨도 대중교통은 추가 100만원을 더 받을 수 있어요.
        전통시장, 도서공연비와 합치면 최대 600만원까지 공제 한도가 늘어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>교통수단별 소득공제 적용 여부</H2>
      <p style={body}>
        대중교통이라도 현금 결제는 공제 안 돼요. 신용카드·체크카드로 결제한 금액만 해당해요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>교통수단</th>
              <th style={{ textAlign: "center", padding: "5px 8px" }}>공제 여부</th>
              <th style={{ textAlign: "right", padding: "5px 8px" }}>공제율</th>
            </tr>
          </thead>
          <tbody>
            {[
              { transport: "지하철 (카드 결제)", apply: "✅ 공제", rate: "40%" },
              { transport: "시내버스 (카드 결제)", apply: "✅ 공제", rate: "40%" },
              { transport: "KTX·고속버스 (카드 결제)", apply: "✅ 공제", rate: "40%" },
              { transport: "택시 (카드 결제)", apply: "✅ 공제", rate: "40%" },
              { transport: "현금 교통비", apply: "❌ 해당 없음", rate: "—" },
              { transport: "항공기 국내선", apply: "❌ 해당 없음", rate: "—" },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "5px 8px" }}>{row.transport}</td>
                <td style={{ textAlign: "center", padding: "5px 8px" }}>{row.apply}</td>
                <td style={{ textAlign: "right", padding: "5px 8px", color: "#1D9E75", fontWeight: 600 }}>{row.rate}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: "#666", marginTop: 8, marginBottom: 0 }}>
          ※ 신용카드·체크카드·현금영수증 결제분만 공제 대상
        </p>
      </GreenBox>

      <H2>공제 한도 계산 구조</H2>
      <p style={body}>
        신용카드 기본 한도를 다 쓰고도 대중교통·전통시장·도서공연비는 추가 한도를 각각 100만원씩 더 받아요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>공제 항목</th>
              <th style={{ textAlign: "center", padding: "5px 8px" }}>공제율</th>
              <th style={{ textAlign: "right", padding: "5px 8px" }}>추가 한도</th>
            </tr>
          </thead>
          <tbody>
            {[
              { item: "신용카드 기본 (전체)", rate: "15%", limit: "기본 300만원" },
              { item: "체크카드·현금영수증", rate: "30%", limit: "기본 300만원" },
              { item: "대중교통", rate: "40%", limit: "+ 100만원" },
              { item: "전통시장", rate: "40%", limit: "+ 100만원" },
              { item: "도서·공연·영화관람비", rate: "30%", limit: "+ 100만원" },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "5px 8px" }}>{row.item}</td>
                <td style={{ textAlign: "center", padding: "5px 8px", color: "#1D9E75", fontWeight: 600 }}>{row.rate}</td>
                <td style={{ textAlign: "right", padding: "5px 8px", fontWeight: 700 }}>{row.limit}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: "#666", marginTop: 8, marginBottom: 0 }}>
          ★ 기본 300만원 + 대중교통 100만원 + 전통시장 100만원 + 도서공연 100만원 = 최대 600만원<br />
          ※ 총급여 7,000만원 이하 기준. 7,000만원 초과 시 기본 250만원
        </p>
      </GreenBox>

      <H2>간소화서비스 확인 방법과 주의사항</H2>
      <p style={body}>
        대중교통 사용액은 별도 서류 없이 자동 조회돼요.
        교통카드를 신용카드로 충전한 경우만 해당 카드사 집계에 포함돼요.
      </p>

      <BorderBox>
        <strong>연말정산 간소화서비스 확인 방법</strong><br />
        홈택스 → 연말정산 간소화 → 대중교통 항목 확인<br />
        신용카드 공제 내역에 대중교통 사용금액이 별도 표시됨<br />
        <br />
        <strong>공제 극대화 팁</strong><br />
        교통비는 신용카드보다 체크카드 결제 시 더 유리하지 않음 (대중교통은 동일 40%)<br />
        기본 카드공제 한도를 채운 뒤에도 대중교통 사용분은 계속 추가 공제<br />
        KTX 자주 이용하면 추가 100만원 한도 채우기 쉬움<br />
        <br />
        <strong>주의사항</strong><br />
        교통카드(티머니 등) 현금 충전분은 공제 불가<br />
        회사 법인카드 사용분은 개인 공제 대상 아님<br />
        총급여의 25% 초과분부터 공제 시작 (기본 카드공제 공통 조건)
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 조세특례제한법 기준으로 작성됐어요. 신용카드 공제율과 한도는 세법 개정에 따라 변경될 수 있어요." />
    </ArticleLayout>
  );
}
