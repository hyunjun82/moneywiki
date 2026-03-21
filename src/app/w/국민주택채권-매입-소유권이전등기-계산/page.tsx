"use client";
// Q1. 처음 집을 사고 소유권이전등기를 하려는데 국민주택채권을 사야 한다고 들어서 뭔지 모르는 매수인
// Q2. 국민주택채권 액면가와 실납부액을 계산해 등기 예산에 포함하는 행동
// Q3. 시가표준액 × 매입률 = 액면가, 할인율 적용하면 실납부액 10%, 서울/기타 지역별 매입률 표, 토지·상가는 다른 요율
// Q4. 계산 예시 + 지역별 매입률 표 + GreenBox + FAQ
// MAP-INTRO: 집 등기하러 갔더니 국민주택채권을 사야 한다는 말에 당황했죠
// MAP-TYPE: 비교표
// MAP-H2: 국민주택채권이란 > 계산방법 > 실납부액 > 지역별매입률 > 토지상가 > FAQ
// MAP-COMP: GreenBox > 표 > BorderBox > 표 > FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const RELATED = [
  { slug: "부동산등기부-열람-발급-방법-인터넷등기소", title: "부동산등기부 열람·발급 방법", description: "소유권이전등기 전에 등기부를 확인하는 방법이에요." },
  { slug: "주택-취득세", title: "주택 취득세 계산 방법", description: "국민주택채권과 함께 취득세도 예산에 포함해야 해요." },
];

const SEOUL_RATES = [
  { range: "2천만원 ~ 5천만원", rate: "13/1,000 (1.3%)" },
  { range: "5천만원 ~ 1억원", rate: "19/1,000 (1.9%)" },
  { range: "1억원 ~ 1억6천만원", rate: "21/1,000 (2.1%)" },
  { range: "1억6천만원 ~ 2억6천만원", rate: "23/1,000 (2.3%)" },
  { range: "2억6천만원 ~ 6억원", rate: "26/1,000 (2.6%)" },
  { range: "6억원 이상", rate: "31/1,000 (3.1%)" },
];

const OTHER_RATES = [
  { range: "2천만원 ~ 5천만원", rate: "13/1,000 (1.3%)" },
  { range: "5천만원 ~ 1억원", rate: "14/1,000 (1.4%)" },
  { range: "1억원 ~ 1억6천만원", rate: "16/1,000 (1.6%)" },
  { range: "1억6천만원 ~ 2억6천만원", rate: "18/1,000 (1.8%)" },
  { range: "2억6천만원 ~ 6억원", rate: "21/1,000 (2.1%)" },
  { range: "6억원 이상", rate: "26/1,000 (2.6%)" },
];

const FAQS = [
  {
    q: "국민주택채권 안 사면 등기가 안 되나요?",
    a: "네, 의무 매입이에요. 소유권이전등기 신청 시 국민주택채권 영수증을 제출해야 해요. 영수증 없이는 등기 신청 자체가 안 돼요.",
  },
  {
    q: "액면가 460만원이면 460만원을 내야 하나요?",
    a: "아니요. 채권을 사자마자 즉시 매도할 수 있어요. 은행에서 할인율(보통 10%)을 적용해줘서 실제로는 약 46만원만 내요. 할인율은 매일 달라지니 등기 전날 은행에서 확인하세요.",
  },
  {
    q: "시가표준액이 뭔가요? 실거래가랑 다른가요?",
    a: "정부가 세금 부과를 위해 정한 기준 가격이에요. 보통 실거래가보다 낮지만, 신축이나 인기 지역은 비슷할 수도 있어요. 지자체 세금 고지서나 국토교통부에서 확인할 수 있어요.",
  },
  {
    q: "토지와 주택 매입률이 다른가요?",
    a: "달라요. 토지는 주택보다 매입률이 훨씬 높아요. 서울·광역시 기준 1억원 이상 토지는 50/1,000(5%)이에요. 상가·오피스텔은 주택보다 낮아요.",
  },
  {
    q: "취득세랑 채권 매입비용, 둘 다 내야 하나요?",
    a: "네, 별개예요. 취득세는 지방세이고 국민주택채권은 주택도시기금법에 따른 의무 매입이에요. 집 살 때는 취득세 + 채권 매입비용 + 등기수수료를 모두 예산에 포함해야 해요.",
  },
  {
    q: "할인율은 어디서 확인하나요?",
    a: "등기 신청 당일 은행에서 확인해야 해요. 매일 달라지거든요. 국민은행, 우리은행 등 시중은행 창구에서 채권 매입과 즉시 매도를 동시에 처리해줘요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "주택도시기금법: 국민주택채권 매입 의무", url: "https://www.law.go.kr/법령/주택도시기금법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "찾기쉬운 생활법령정보: 국민주택채권 매입액 계산", url: "https://www.easylaw.go.kr/CSP/OnhunqueansInfoRetrieve.laf?onhunqnaAstSeq=84&onhunqueSeq=1952" },
    ],
  },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 등기 · 취득비용</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        국민주택채권 매입 소유권이전등기 계산<br />
        할인율 적용 실납부액 계산법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        집 등기하러 갔더니 국민주택채권을 사야 한다는 말에 당황했죠.
        <a href="https://www.law.go.kr/법령/주택도시기금법" style={{ color: "#1D9E75", textDecoration: "underline" }}>주택도시기금법</a>에 따라
        소유권이전등기 시 의무적으로 채권을 매입해야 해요. 하지만 실제 납부액은 생각보다 적어요.
        시가표준액에 매입률을 곱한 액면가에 할인율(약 10%)을 적용하면 그 10%만 내면 되거든요.
        <a href="/w/주택-취득세" style={{ color: "#1D9E75", textDecoration: "underline" }}> 주택 취득세</a>와 함께 집 살 때 반드시 예산에 포함해야 해요.
      </p>

      <Divider />

      <H2>국민주택채권, 정확히 뭐예요?</H2>
      <p style={body}>
        정부가 주택 사업 자금을 조달하기 위해 발행하는 채권이에요. 부동산 등기를 할 때
        의무적으로 매입해야 해요. 소유권이전등기뿐 아니라 저당권 설정, 소유권보존등기 때도 해당돼요.
      </p>
      <p style={body}>
        특이한 점이 있어요. 채권을 사자마자 바로 팔 수 있어요. 은행에서 즉시 매도하면
        할인율이 적용된 금액만 실제로 내요. 액면가 460만원짜리 채권이라도
        할인율 10% 적용 시 실납부액은 46만원이에요.
      </p>

      <GreenBox>
        계산 공식: 시가표준액 × 매입률 = 채권 액면가<br />
        실납부액: 채권 액면가 × 할인율 (보통 10%)<br />
        예시: 시가표준액 2억원(서울) → 액면가 460만원 → 실납부액 약 46만원
      </GreenBox>

      <Divider />

      <H2>지역별·금액대별 매입률</H2>
      <p style={body}>
        매입률은 부동산 소재지와 시가표준액에 따라 달라요. 서울·광역시가 기타 지역보다
        매입률이 높아요. 시가표준액이 높을수록 매입률도 높아지는 구조예요.
      </p>

      <SectionBadge>서울·광역시 주택 소유권이전등기 매입률</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 16 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>시가표준액 구간</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>매입률</th>
            </tr>
          </thead>
          <tbody>
            {SEOUL_RATES.map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                <td style={{ padding: "10px 12px", borderBottom: "1px solid #e5e7eb" }}>{row.range}</td>
                <td style={{ padding: "10px 12px", borderBottom: "1px solid #e5e7eb", fontWeight: 600, color: "#1D9E75" }}>{row.rate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SectionBadge>기타 지역 주택 소유권이전등기 매입률</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 16 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>시가표준액 구간</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>매입률</th>
            </tr>
          </thead>
          <tbody>
            {OTHER_RATES.map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                <td style={{ padding: "10px 12px", borderBottom: "1px solid #e5e7eb" }}>{row.range}</td>
                <td style={{ padding: "10px 12px", borderBottom: "1px solid #e5e7eb", fontWeight: 600 }}>{row.rate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <BorderBox>
        시가표준액 2억원 집을 등기할 때 비교해봐요.<br />
        서울: 2억원 × 23/1,000 = 460만원 → 할인 적용 시 약 46만원<br />
        경기도: 2억원 × 18/1,000 = 360만원 → 할인 적용 시 약 36만원
      </BorderBox>

      <Divider />

      <H2>토지나 상가는 매입률이 달라요</H2>
      <p style={body}>
        토지는 주택보다 매입률이 훨씬 높아요. 서울·광역시 기준 1억원 이상 토지는 50/1,000(5%)이에요.
        1억원짜리 토지라면 채권 액면가 500만원, 할인 적용 시 약 50만원이에요.
      </p>
      <p style={body}>
        상가·오피스텔 같은 비주거용 부동산은 주택보다 낮아요. 서울·광역시 기준
        1억3천~2억5천만원 구간은 16/1,000, 2억5천만원 이상은 20/1,000이에요.
        상가나 오피스텔을 살 때도 반드시 채권 매입 예산을 따로 잡아야 해요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        부동산 등기 시 국민주택채권에 대해 자주 헷갈리는 질문들이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <RelatedArticles items={RELATED} />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 주택도시기금법 및 관련 규정을 바탕으로 작성됐어요. 매입률과 할인율은 변경될 수 있으니 등기 전 은행 및 법무부 등기포털에서 최신 기준을 확인하세요." />
    </ArticleLayout>
  );
}
