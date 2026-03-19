"use client";

// Q1. 종합소득세·부가세 등 국세를 현금 없이 신용카드로 내고 싶은 납세자
// Q2. 홈택스 or 카드로택스 접속 → 신용카드 선택 → 수수료 확인 후 납부
// Q3. 수수료 신용카드0.8%·체크카드0.5% / 00:30~23:30 연중무휴 / 할부 가능 / 본인+가족카드 가능 / 법인카드는 법인세만
// Q4. GreenBox(납부 방법 비교 + 수수료) + BorderBox(사용 가능 카드 목록 + 주의사항) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "신용카드 세금납부 수수료는 얼마인가요?",
    a: "신용카드는 납부 금액의 0.8%, 체크카드는 0.5%예요. 100만원 납부 시 신용카드 8,000원, 체크카드 5,000원이 추가로 붙어요. 할부로 나눠 낼 수 있다는 장점을 고려하면 활용할 만해요.",
  },
  {
    q: "가족 명의 카드로 내 세금을 낼 수 있나요?",
    a: "네, 배우자나 직계가족 명의 카드로도 세금을 낼 수 있어요. 다만 법인카드는 법인세 납부에만 사용 가능하고, 개인 세금은 개인 카드(본인 또는 가족)로만 납부할 수 있어요.",
  },
  {
    q: "할부로 세금을 낼 수 있나요?",
    a: "네, 신용카드로 납부하면 카드사 할부 서비스를 이용해서 분할 납부할 수 있어요. 할부 이자는 카드사 정책에 따라 다르니 카드사에 미리 확인하세요.",
  },
  {
    q: "카드로택스와 홈택스 차이는 뭔가요?",
    a: "홈택스는 공인인증서 로그인 후 모든 세금을 납부할 수 있어요. 카드로택스는 공인인증서 없이도 이용 가능하지만 전자신고 납부 세액만 가능하고, 고지서 세액은 홈택스에서 해야 해요.",
  },
  {
    q: "은행 창구에서 신용카드로 세금을 낼 수 있나요?",
    a: "은행 창구에서는 신용카드 납부가 안 돼요. 은행 내 CD/ATM 기기에서는 가능해요. 홈택스·카드로택스·세무서 단말기·CD/ATM을 이용하면 돼요.",
  },
];

const REFERENCES = [
  {
    category: "공식 사이트",
    items: [
      { label: "국세청 홈택스 세금 납부", url: "https://www.hometax.go.kr" },
      { label: "금융결제원 카드로택스", url: "https://www.cardrotax.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "세금-분할-납부-신청", title: "세금 분할 납부 신청 조건", description: "종소세·종부세 분납 기준과 기간이에요." },
  { slug: "세금-납부-연장-신청", title: "세금 납부 연장 신청 방법", description: "기한 자체를 연장하는 방법이에요." },
  { slug: "종합소득세-신고-방법", title: "종합소득세 신고 방법", description: "5월 종합소득세 신고부터 납부까지예요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 납부 · 카드</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        신용카드로 세금 납부하는 방법<br />
        수수료 0.8%, 홈택스·카드로택스 이용
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        국세는 홈택스나 카드로택스에서 신용카드로 낼 수 있어요.
        수수료는 신용카드 0.8%, 체크카드 0.5%예요.
        할부로 나눠 낼 수 있어서 현금 일시납보다 부담이 적어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>납부 방법과 수수료 비교</H2>
      <p style={body}>
        납부할 수 있는 곳이 여러 곳이에요. 상황에 맞는 방법을 골라서 사용해요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>납부 방법</th>
              <th style={{ textAlign: "center", padding: "5px 8px" }}>공인인증서</th>
              <th style={{ textAlign: "center", padding: "5px 8px" }}>수수료</th>
              <th style={{ textAlign: "right", padding: "5px 8px" }}>이용 시간</th>
            </tr>
          </thead>
          <tbody>
            {[
              { method: "홈택스 (hometax.go.kr)", cert: "필요", fee: "신용카드 0.8% / 체크 0.5%", time: "00:30~23:30" },
              { method: "카드로택스 (cardrotax.or.kr)", cert: "불필요", fee: "신용카드 0.8% / 체크 0.5%", time: "00:30~23:30" },
              { method: "세무서 방문 (단말기)", cert: "불필요", fee: "동일", time: "업무시간" },
              { method: "은행 CD/ATM", cert: "불필요", fee: "동일", time: "기기 운영시간" },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)", background: i < 2 ? "rgba(29,158,117,0.04)" : undefined }}>
                <td style={{ padding: "5px 8px", fontWeight: i < 2 ? 700 : 400 }}>{row.method}</td>
                <td style={{ textAlign: "center", padding: "5px 8px", fontSize: 12 }}>{row.cert}</td>
                <td style={{ textAlign: "center", padding: "5px 8px", fontSize: 12 }}>{row.fee}</td>
                <td style={{ textAlign: "right", padding: "5px 8px", fontSize: 11 }}>{row.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: "#666", marginTop: 8, marginBottom: 0 }}>
          ※ 365일 연중무휴 / 시스템 점검 시간 일시 이용 불가
        </p>
      </GreenBox>

      <H2>사용 가능한 카드와 주의사항</H2>
      <p style={body}>
        대부분의 주요 카드사가 다 돼요. 가족 카드도 사용 가능해요.
      </p>

      <BorderBox>
        <strong>사용 가능한 신용카드</strong><br />
        우리, 비씨, 신한, 삼성, 현대, 롯데, KB국민, 씨티<br />
        하나, NH농협, 전북은행, 광주은행, 제주은행, 수협은행<br />
        <br />
        <strong>이용 조건</strong><br />
        본인 명의 카드 + 배우자·직계가족 카드 가능<br />
        법인카드 → 법인세 납부만 가능 (개인세금 불가)<br />
        은행 창구 → 신용카드 납부 불가 (CD/ATM은 가능)<br />
        <br />
        <strong>할부 이용 시</strong><br />
        카드사의 할부 이자 정책 적용 → 카드사에 미리 확인<br />
        무이자 할부 이벤트 기간 활용 시 이자 없이 분납 가능<br />
        <br />
        ★ 카드로택스: 공인인증서 없이 주민번호+납부세액만 입력하면 결제 가능
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준으로 작성됐어요. 수수료율은 금융결제원 정책에 따라 변경될 수 있어요." />
    </ArticleLayout>
  );
}
