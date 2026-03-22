"use client";

// Q1. 재산세 고지서를 받았거나 부동산을 구매해서 재산세가 얼마나 나오는지 궁금한 상황이에요.
// Q2. 본인 주택의 재산세를 계산하고, 납부기한 안에 위택스에서 납부하는 행동.
// Q3. 공시가격 x 공정시장가액비율(60%) = 과세표준, 세율(0.1~0.4%), 납부기한(7월·9월), 1세대1주택 감면, 부담상한.
// Q4. GreenBox(계산 공식) + BorderBox(계산 예시) + Checklist(납부 체크) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer, Checklist,
  ArticleLayout,
} from "@/components/article-ui";
const TAX_ROWS = [
  { bracket: "6,000만원 이하", rate: "0.1%", deduction: "-" },
  { bracket: "6,000만원 ~ 1.5억원", rate: "0.15%", deduction: "3만원" },
  { bracket: "1.5억원 ~ 3억원", rate: "0.25%", deduction: "18만원" },
  { bracket: "3억원 초과", rate: "0.4%", deduction: "63만원" },
];

const CHECK_ITEMS = [
  "6월 1일 기준 소유자인지 확인 — 6월 2일 이후 매수했으면 올해 재산세 없어요",
  "7월 16~31일: 주택분 1/2 + 건물분 납부",
  "9월 16~30일: 주택분 나머지 1/2 + 토지분 납부",
  "위택스(wetax.go.kr)에서 온라인 납부 가능 — 카드·계좌이체·자동이체",
  "1세대 1주택 공시가격 9억원 이하면 세율 감면 적용 확인",
  "재산세 250만원 초과 시 분납 가능",
];

const FAQS = [
  { q: "재산세는 언제 내나요?", a: "주택은 7월(1/2)과 9월(1/2)에 나눠서 내요. 토지는 9월, 건물(상가 등)은 7월에 한 번에 내요." },
  { q: "6월 1일에 집을 팔면 누가 재산세를 내나요?", a: "6월 1일 기준 소유자가 내요. 6월 1일에 아직 본인 명의라면 본인이 납부해야 해요." },
  { q: "공시가격은 어디서 확인하나요?", a: "부동산공시가격알리미(realtyprice.kr)에서 조회할 수 있어요. 아파트는 공동주택공시가격, 단독주택은 개별주택공시가격이에요." },
  { q: "1세대 1주택이면 세금이 줄어드나요?", a: "공시가격 9억원 이하 1세대 1주택은 세율이 낮아져요. 공정시장가액비율도 43~45%로 일반(60%)보다 낮게 적용돼요." },
  { q: "재산세가 갑자기 많이 올랐어요", a: "부담 상한 제도가 있어요. 공시가격 3억원 이하는 전년 대비 105%, 3~6억원은 110%, 6억원 초과는 130%까지만 올라가요." },
  { q: "재산세 고지서 금액이 이상하면 어떻게 하나요?", a: "고지서 수령 후 90일 이내에 해당 시청·구청에 이의신청할 수 있어요. 위택스에서도 문의 가능해요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "지방세법 (재산세 관련 조문)", url: "https://www.law.go.kr/법령/지방세법" },
      { label: "위택스 — 지방세 납부", url: "https://www.wetax.go.kr" },
      { label: "부동산공시가격알리미", url: "https://www.realtyprice.kr" },
    ],
  },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 부동산 · 재산세</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        재산세 얼마나 나올까?<br />
        세율·계산법·납부기한 정리
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        부동산 가지고 있으면 매년 7월·9월에 재산세 고지서가 날아오죠.
        공시가격이 오르면 재산세도 따라 올라서 신경 쓰이실 거예요.
        공시가격에 공정시장가액비율(60%)을 곱한 뒤 세율을 적용하면 계산할 수 있어요.
      </p>

      <Divider />

      <H2>재산세 계산, 어떻게 하나요?</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/지방세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>지방세법</a>에 따른 계산 공식이에요.
        공시가격에 바로 세율을 곱하는 게 아니라, 공정시장가액비율을 먼저 곱해요.
      </p>

      <GreenBox>
        재산세 계산 공식이에요.<br />
        · 과세표준 = 공시가격 x 공정시장가액비율(일반 60%)<br />
        · 재산세 = 과세표준 x 세율(0.1~0.4%)<br />
        · 실제 납부액 = 재산세 + 도시지역분(14%) + 지방교육세(20%)<br />
        · 1세대 1주택은 공정시장가액비율이 43~45%로 더 낮아요
      </GreenBox>

      <SectionBadge>주택 재산세 세율표</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 12 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>과세표준</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>세율</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>누진공제</th>
            </tr>
          </thead>
          <tbody>
            {TAX_ROWS.map((r, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px" }}>{r.bracket}</td>
                <td style={{ padding: "9px 12px", color: "#1D9E75", fontWeight: 600 }}>{r.rate}</td>
                <td style={{ padding: "9px 12px" }}>{r.deduction}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 16 }}>1세대 1주택 공시가격 9억원 이하는 각 구간에서 0.05%p씩 인하돼요.</p>

      <Divider />

      <H2>실제로 얼마나 나오나요?</H2>
      <p style={body}>
        공시가격 5억원 아파트로 계산해볼게요.
      </p>

      <BorderBox>
        공시가격 5억원 아파트 재산세 계산 예시예요.<br /><br />
        <strong>과세표준</strong>: 5억원 x 60% = 3억원<br />
        <strong>재산세</strong>: 3억원 x 0.4% - 63만원(누진공제) = 57만원<br />
        <strong>도시지역분</strong>: 57만원 x 14% = 약 8만원<br />
        <strong>지방교육세</strong>: 57만원 x 20% = 약 11.4만원<br /><br />
        <strong>총 납부액: 약 76만원</strong> (7월 38만원 + 9월 38만원)
      </BorderBox>

      <p style={body}>
        1세대 1주택이면 공정시장가액비율이 45%로 내려가서 실제 납부액이 더 줄어들어요.
        정확한 금액은 <a href="https://www.wetax.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>위택스</a>에서 고지서를 확인하거나
        <a href="/w/재산세-계산기" style={{ color: "#1D9E75", textDecoration: "underline" }}>재산세 계산기</a>를 이용하세요.
      </p>

      <Divider />

      <H2>납부기한, 놓치면 안 돼요</H2>
      <p style={body}>
        재산세는 매년 6월 1일 기준 소유자에게 부과돼요.
        납부기한을 넘기면 가산금(3%)이 붙어요.
      </p>

      <SectionBadge>납부 체크리스트</SectionBadge>
      <Checklist items={CHECK_ITEMS} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 지방세법·위택스 자료를 바탕으로 작성했어요. 공정시장가액비율과 세율은 매년 정책에 따라 달라질 수 있으니 위택스에서 최신 고지 내용을 확인하세요." />
    </ArticleLayout>
  );
}
