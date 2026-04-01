"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 종합소득세·양도소득세 고지서 받았는데 한 번에 내기 부담스러운 납세자
// Q2. 세금 종류별 분납 가능 금액 확인 → 홈택스 신고 시 분납 선택 → 2차 납부 기한 준수
// Q3. 종소세·양도세 1천만원 초과 2개월 / 종부세 250만원 초과 6개월 / 연말정산 10만원 초과 3개월 / 부가세 분납 없음
// Q4. GreenBox(세금별 분납 조건 비교표) + BorderBox(신청 방법 + 2차 납부 주의) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "종합소득세 분납 신청은 어떻게 하나요?",
    a: "홈택스에서 종합소득세 신고할 때 분납 신청란에 체크하면 돼요. 세액이 자동으로 계산되고 2차 납부서가 별도로 나와요. 신고 기한(5월 31일) 이후 2개월 이내에 나머지를 내면 돼요.",
  },
  {
    q: "분납하면 이자나 가산세가 붙나요?",
    a: "정해진 기한 안에 납부하면 이자나 가산세가 붙지 않아요. 단, 2차 납부 기한을 하루라도 넘기면 가산세가 붙어요. 자동이체를 설정해두는 게 안전해요.",
  },
  {
    q: "연말정산 분납은 어떻게 되나요?",
    a: "추가 납부세액이 10만원을 초과하면 2~4월 급여에서 3개월에 나눠서 원천징수돼요. 회사에 분납 신청서를 제출하면 되고, 회사가 자동으로 처리해줘요.",
  },
  {
    q: "부가가치세도 분납이 되나요?",
    a: "부가가치세는 분납 제도가 없어요. 대신 납부 기한 연장을 신청할 수 있어요. 천재지변이나 사업 위기 같은 사유가 있으면 최대 9개월까지 연장 가능해요.",
  },
  {
    q: "종합부동산세 분납 신청은 따로 해야 하나요?",
    a: "종부세는 따로 신청 안 해도 돼요. 고지서에 1차·2차 납부 금액과 기한이 함께 나와요. 1차만 내고 나머지는 6개월 이내에 내면 분납이 자동 적용돼요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "국세청: 납부기한 및 분납 안내", url: "https://www.nts.go.kr" },
      { label: "홈택스 종합소득세 신고", url: "https://www.hometax.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "세금-납부-연장-신청", title: "세금 납부 연장 신청 최대 9개월", description: "분납과 달리 기한 자체를 연장하는 방법이에요." },
  { slug: "신용카드-세금납부-방법", title: "신용카드로 세금 납부하기", description: "카드 할부로 세금 부담을 나눌 수 있어요." },
  { slug: "종합소득세-환급-신청", title: "종합소득세 환급 신청 방법", description: "세금 더 냈으면 돌려받는 방법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 분납 · 납부</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        세금 분할 납부 신청<br />
        종류별 분납 조건과 기간 정리
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        세금이 일정 금액을 넘으면 2~6개월에 걸쳐 나눠서 낼 수 있어요.
        이자나 가산세 없이 기한 안에만 내면 돼요.
        종합소득세는 1천만원 초과, 종부세는 250만원 초과면 신청할 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>세금 종류별 분납 조건</H2>
      <p style={body}>
        세금마다 분납 기준 금액과 기간이 달라요.
        내가 낼 세금이 어느 기준에 해당하는지 먼저 확인해요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>세금 종류</th>
              <th style={{ textAlign: "center", padding: "5px 8px" }}>분납 가능 기준</th>
              <th style={{ textAlign: "center", padding: "5px 8px" }}>분납 기간</th>
              <th style={{ textAlign: "right", padding: "5px 8px" }}>신청 방법</th>
            </tr>
          </thead>
          <tbody>
            {[
              { tax: "종합소득세", threshold: "1천만원 초과", period: "2개월", method: "홈택스 신고 시 체크" },
              { tax: "양도소득세", threshold: "1천만원 초과", period: "2개월", method: "홈택스 신고 시 체크" },
              { tax: "종합부동산세", threshold: "250만원 초과", period: "6개월", method: "자동 (고지서에 포함)" },
              { tax: "재산세", threshold: "250만원 초과", period: "2개월", method: "자동 (고지서에 포함)" },
              { tax: "연말정산 추가납부", threshold: "10만원 초과", period: "3개월", method: "회사에 신청서 제출" },
              { tax: "부가가치세", threshold: "없음 (분납 불가)", period: "—", method: "납부기한 연장 신청" },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)", background: i === 5 ? "rgba(0,0,0,0.02)" : undefined }}>
                <td style={{ padding: "5px 8px", fontWeight: 700 }}>{row.tax}</td>
                <td style={{ textAlign: "center", padding: "5px 8px", color: i === 5 ? "#E53E3E" : "#1D9E75", fontSize: 12 }}>{row.threshold}</td>
                <td style={{ textAlign: "center", padding: "5px 8px" }}>{row.period}</td>
                <td style={{ textAlign: "right", padding: "5px 8px", fontSize: 11 }}>{row.method}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: "#666", marginTop: 8, marginBottom: 0 }}>
          ※ 세액 2천만원 이하: 1천만원 초과분만 분납 / 2천만원 초과: 세액의 50% 분납 (종소세·양도세)
        </p>
      </GreenBox>

      <H2>신청 방법과 2차 납부 주의사항</H2>
      <p style={body}>
        분납 신청 자체는 간단해요. 2차 납부 기한을 놓치는 게 가장 큰 실수예요.
      </p>

      <BorderBox>
        <strong>종합소득세 분납 신청</strong><br />
        홈택스 → 종합소득세 신고 → 분납 신청란 체크<br />
        1차: 신고 기한(5월 31일)까지 / 2차: 2개월 이내 (7월 31일)<br />
        <br />
        <strong>종합부동산세 분납</strong><br />
        신청 불필요 → 고지서에 1차·2차 납부 기한 자동 표시<br />
        1차: 12월 납부 / 2차: 다음 해 6월 이내<br />
        <br />
        <strong>2차 납부 주의사항</strong><br />
        하루라도 기한 초과 시 가산세 붙음 (미납액 × 0.025%/일)<br />
        홈택스에서 자동이체 설정하면 놓칠 위험 없음<br />
        <br />
        <strong>분납 불가 세금</strong><br />
        부가가치세 → 납부기한 연장 신청으로 대체 (최대 9개월)<br />
        <br />
        ★ 기한 내 못 내면 체납 처리 → 세무서 상담 먼저 받기
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준으로 작성됐어요. 분납 조건과 기간은 세법 개정에 따라 변경될 수 있으니 국세청 홈택스에서 최신 내용을 확인하세요." />
    </ArticleLayout>
  );
}
