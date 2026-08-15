"use client";
// Q1. 전세 준 집주인이 종합소득세 신고 앞두고 "간주임대료가 얼마야? 세금 얼마 나와?" 계산하는 상황
// Q2. 본인 보증금 기준 간주임대료 금액 파악 → 종합소득세 신고서에 기재
// Q3. 공식: (보증금-3억) × 60% × 3.1% / 2주택 합산 계산 / 월세+반전세 합산 방식 / 과세 대상 요건
// Q4. GreenBox(공식 + 핵심 숫자) + 보증금별 금액표 + BorderBox(2주택 계산 예시) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "3억원 공제는 어떻게 적용되나요?",
    a: "보증금 합계에서 3억원을 먼저 빼요. 주택이 여러 채면 보증금이 가장 큰 주택부터 차감해요. 예를 들어 A주택 7억, B주택 5억이면 A주택에서 3억을 차감해 A 4억 + B 5억 = 9억이 과세 기준 보증금이 돼요.",
  },
  {
    q: "2026년 이자율은 왜 3.1%인가요?",
    a: "간주임대료 이자율은 시중 정기예금 금리에 연동돼요. 2024~2025년 3.5%에서 2026년 3.1%로 인하됐어요. 금리 하락 추세를 반영한 거예요. 매년 국세청에서 고시해요.",
  },
  {
    q: "월세도 받고 보증금도 있으면 어떻게 계산해요?",
    a: "월세 수입과 간주임대료를 각각 계산해서 더해요. 월세 100만원 × 12개월 = 1,200만원, 보증금 5억원이면 (5억-3억)×60%×3.1% = 372만원. 합계 1,572만원이 임대소득이에요.",
  },
  {
    q: "1주택자도 간주임대료 세금을 내나요?",
    a: "1주택자는 기준시가 12억원 이하면 비과세예요. 기준시가 12억원 초과인 고가 1주택자도 간주임대료 과세 대상이에요.",
  },
  {
    q: "간주임대료 계산기가 있나요?",
    a: "홈택스(hometax.go.kr)에서 '간주임대료 계산' 메뉴를 이용하면 자동으로 계산돼요. 보증금, 주택 수, 임대 기간을 입력하면 국세청 공식 결과를 받아볼 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "국세청: 주택 보증금 간주임대료 안내", url: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2249&cntntsId=7681" },
      { label: "홈택스: 간주임대료 계산", url: "https://www.hometax.go.kr" },
      { label: "소득세법 제25조 (간주임대료)", url: "https://www.law.go.kr/법령/소득세법" },
    ],
  },
];

const RELATED = [
  { slug: "2주택자-임대소득세", title: "2주택자 임대소득세 2026년 변경", description: "고가 2주택자 간주임대료 과세 요건이에요." },
  { slug: "주택임대소득-신고", title: "주택임대소득 종합소득세 신고 방법", description: "임대소득 신고 절차와 분리과세 선택 방법이에요." },
  { slug: "연말정산-연금저축", title: "연금저축 세액공제 400만원 혜택", description: "임대소득 외 세금을 줄이는 방법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 임대소득 · 간주임대료</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        간주임대료 계산 방법<br />
        2026년 이자율 3.1% 적용 공식
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        전세보증금을 받으면 월세 없어도 세금이 나올 수 있어요.
        공식은 (보증금 합계 - 3억원) × 60% × 3.1%(2026년)예요.
        보증금 10억원이면 연간 간주임대료가 약 1,302만원이에요.
        3주택 이상이거나 고가 2주택자라면 과세 대상이에요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>간주임대료 계산 공식</H2>
      <p style={body}>
        보증금도 은행에 넣으면 이자가 붙죠. 국세청은 이 이자 수익을 임대소득으로 봐요.
        실제로 이자를 받지 않아도 세금이 붙어요.
      </p>

      <GreenBox>
        <strong>간주임대료 계산 공식 (2026년)</strong><br />
        <strong>(보증금 합계 - 3억원) × 60% × 3.1%</strong><br />
        <br />
        2026년 정기예금 이자율: 3.1% (2025년 3.5%에서 인하)<br />
        3억원 공제: 기본 면세 기준 (3억원까지는 과세 안 해요)<br />
        60% 적용: 보증금 전액이 아닌 60%만 과세 대상<br />
        <br />
        예시: 보증금 10억원 → (10억-3억) × 60% × 3.1% = <strong>1,302만원/년</strong>
      </GreenBox>

      <H2>보증금별 간주임대료 (2026년 기준)</H2>
      <p style={body}>
        1채 기준으로 보증금 금액에 따른 연간 간주임대료예요.
        이 금액이 임대소득에 합산돼요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>보증금</th>
              <th style={{ textAlign: "right", padding: "5px 8px" }}>과세 기준액</th>
              <th style={{ textAlign: "right", padding: "5px 8px" }}>연간 간주임대료</th>
            </tr>
          </thead>
          <tbody>
            {[
              { deposit: "3억원 이하", base: "0원", rent: "0원 (비과세)" },
              { deposit: "5억원", base: "(5억-3억)×60% = 1.2억", rent: "372만원" },
              { deposit: "7억원", base: "(7억-3억)×60% = 2.4억", rent: "744만원" },
              { deposit: "10억원", base: "(10억-3억)×60% = 4.2억", rent: "1,302만원" },
              { deposit: "15억원", base: "(15억-3억)×60% = 7.2억", rent: "2,232만원" },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "5px 8px" }}>{row.deposit}</td>
                <td style={{ textAlign: "right", padding: "5px 8px", fontSize: 12, color: "#555" }}>{row.base}</td>
                <td style={{ textAlign: "right", padding: "5px 8px", color: i === 0 ? "#1D9E75" : "#E53E3E" }}>{row.rent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </GreenBox>

      <H2>2주택 이상이면 합산해서 계산해요</H2>
      <p style={body}>
        주택이 여러 채면 전체 보증금을 합친 다음 3억원을 차감해요.
        보증금이 가장 큰 주택부터 차감 순서가 적용돼요.
      </p>

      <BorderBox>
        <strong>2주택 계산 예시</strong><br />
        A주택 보증금 7억원, B주택 보증금 5억원<br />
        합계: 12억원<br />
        <br />
        3억원 차감: A주택(7억)에서 3억 차감 → A 4억, B 5억 남음<br />
        과세 기준: (4억 + 5억) × 60% = 5.4억원<br />
        간주임대료: 5.4억 × 3.1% = <strong>1,674만원/년</strong><br />
        <br />
        ※ 월세도 받는다면 월세 수입 + 간주임대료를 합산해요<br />
        보증금 5억 + 월세 100만원 → 간주임대료 372만원 + 월세 1,200만원 = 1,572만원/년
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>과세 대상인지 먼저 확인하세요</H2>
      <p style={body}>
        모든 집주인이 간주임대료 세금을 내는 건 아니에요.
        아래 요건에 해당할 때만 과세 대상이에요.
      </p>
      <p style={body}>
        <strong>3주택 이상 보유자</strong>: 전체 보증금 합계 3억원 초과 시 과세예요. 주택 가격은 상관없어요.<br />
        <strong>2주택 보유자 (2026년 기준)</strong>: 두 주택 모두 기준시가 12억원 초과이고 보증금 합계 12억원 초과 시 과세예요.<br />
        <strong>1주택 보유자</strong>: 기준시가 12억원 이하면 비과세예요.
      </p>
      <p style={body}>
        내 보증금이 과세 대상인지 헷갈리면 홈택스(hometax.go.kr)에서 '간주임대료 계산' 메뉴를 이용하거나, 가까운 세무서에서 무료 상담을 받으세요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 국세청 고시 기준으로 작성됐어요. 간주임대료 계산은 개인 상황에 따라 달라지니 홈택스(hometax.go.kr) 모의계산이나 세무사 상담을 받으세요." />
    </ArticleLayout>
  );
}
