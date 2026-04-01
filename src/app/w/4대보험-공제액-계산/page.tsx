"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";
// Q1. 월급 명세서 보고 실수령액이 생각보다 적어서 4대보험 공제액이 얼마인지 궁금한 직장인
// Q2. 2026년 요율로 내 월급에서 빠지는 4대보험 공제액을 직접 계산하는 행동
// Q3. 2026년 국민연금 4.75%, 건강보험 3.595%, 고용보험 0.9%, 장기요양보험 0.473%, 합계 11.36%, 산재보험은 사업주 100%
// Q4. 요율표 + 월급별 계산 예시 + GreenBox + FAQ
// MAP-INTRO: 월급날 명세서 보면 실수령액이 생각보다 적은데, 4대보험 공제 때문이에요
// MAP-TYPE: 비교표
// MAP-H2: 전체요율 > 국민연금 > 건강보험 > 고용보험 > 공제없는경우 > FAQ
// MAP-COMP: 표 > GreenBox > 표 > BorderBox > FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const RELATED = [
  { slug: "4대보험-가입-확인-방법", title: "4대보험 가입 확인 방법", description: "4대보험에 정상 가입됐는지 확인하는 방법이에요." },
  { slug: "원천징수-뜻-방법-신고", title: "원천징수 뜻과 신고 방법", description: "4대보험 공제와 함께 원천징수 구조도 이해해야 해요." },
];

const INSURANCE_TABLE = [
  { name: "국민연금", workerRate: "4.75%", employerRate: "4.75%", calc200: "95,000원", calc300: "142,500원", calc400: "190,000원", note: "2026년 인상 (전년 4.5%)" },
  { name: "건강보험", workerRate: "3.595%", employerRate: "3.595%", calc200: "71,900원", calc300: "107,850원", calc400: "143,800원", note: "2026년 인상 (전년 3.545%)" },
  { name: "장기요양보험", workerRate: "0.473%", employerRate: "0.473%", calc200: "9,460원", calc300: "14,190원", calc400: "18,920원", note: "건강보험료의 13.14%" },
  { name: "고용보험", workerRate: "0.9%", employerRate: "1.15%", calc200: "18,000원", calc300: "27,000원", calc400: "36,000원", note: "실업급여 재원" },
  { name: "산재보험", workerRate: "0%", employerRate: "업종별 상이", calc200: "0원", calc300: "0원", calc400: "0원", note: "사업주 전액 부담" },
  { name: "합계 (근로자)", workerRate: "약 11.36%", employerRate: "-", calc200: "약 227,200원", calc300: "약 340,800원", calc400: "약 454,400원", note: "" },
];

const FAQS = [
  {
    q: "4대보험 공제액은 근로자와 사업주가 반반인가요?",
    a: "국민연금, 건강보험, 고용보험은 반반이에요. 산재보험은 사업주가 100% 부담해서 근로자 월급에서는 전혀 안 빠져요.",
  },
  {
    q: "2026년부터 국민연금이 얼마나 올랐나요?",
    a: "근로자 부담분이 4.5%에서 4.75%로 0.25%포인트 올랐어요. 18년 만의 인상이에요. 월급 300만원이면 매달 7,500원씩 더 공제돼요.",
  },
  {
    q: "알바(단기 근로)도 4대보험 가입해야 하나요?",
    a: "주 15시간 미만이면 의무 가입 예외예요. 주 15시간 이상이면 4대보험 모두 의무 가입이에요. 안 들어주는 사업주는 법 위반이에요.",
  },
  {
    q: "장기요양보험은 건강보험이랑 따로 계산하나요?",
    a: "건강보험료를 먼저 계산한 뒤 거기에 13.14%를 곱해요. 월급 300만원이면 건강보험 107,850원 × 13.14% = 14,190원이에요.",
  },
  {
    q: "4대보험 미가입 사업장에서 일하면 손해인가요?",
    a: "단기적으로 실수령액이 높아 보여도 나중에 손해예요. 실업급여, 산재보상, 국민연금 수급에서 모두 불이익이 있어요. 주 15시간 이상 일한다면 가입이 의무예요.",
  },
  {
    q: "4대보험료 정확히 계산하려면 어디서?",
    a: "4대사회보험 정보연계센터 홈페이지(4insure.or.kr)에서 보험료 간편 계산이 가능해요. 월급 입력하면 바로 계산돼요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "4대사회보험 정보연계센터: 보험료 계산", url: "https://www.4insure.or.kr" },
      { label: "국민건강보험공단: 요율 안내", url: "https://www.nhis.or.kr" },
      { label: "국민연금공단: 보험료율 안내", url: "https://www.nps.or.kr" },
      { label: "고용노동부: 고용보험 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>4대보험 · 월급 · 공제</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        4대보험 공제액 계산<br />
        2026년 요율과 월급별 실수령액
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        월급날 명세서 보면 실수령액이 생각보다 적은데, 4대보험 공제 때문이에요.
        2026년부터 국민연금이 4.75%로 인상됐어요. 건강보험도 3.595%로 올랐고요.
        <a href="https://www.nps.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>국민연금공단</a> 기준
        근로자 부담 합계는 월급의 약 11.36%예요. 월급 300만원이면 매달 약 34만원이 공제돼요.
        <a href="/w/4대보험" style={{ color: "#1D9E75", textDecoration: "underline" }}> 4대보험 전체 개념</a>이 궁금하면 함께 보세요.
      </p>

      <Divider />

      <H2>4대보험 공제액, 얼마나 빠지나요?</H2>
      <p style={body}>
        근로자가 부담하는 4대보험은 국민연금, 건강보험, 장기요양보험, 고용보험 4가지예요.
        산재보험은 사업주가 100% 부담해서 월급에서 전혀 안 빠져요.
        4가지를 합산하면 월급의 약 11.36%예요.
      </p>
      <p style={body}>
        2026년 달라진 점은 두 가지예요. 국민연금이 4.5%에서 4.75%로 오르고,
        건강보험이 3.545%에서 3.595%로 올랐어요.
        두 가지 인상으로 월급 300만원 기준 매달 약 6,000원이 더 공제돼요.
      </p>

      <SectionBadge>2026년 4대보험 요율 및 공제액</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 16 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "8px 10px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>보험</th>
              <th style={{ padding: "8px 10px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>근로자</th>
              <th style={{ padding: "8px 10px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>월 200만원</th>
              <th style={{ padding: "8px 10px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>월 300만원</th>
              <th style={{ padding: "8px 10px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>월 400만원</th>
            </tr>
          </thead>
          <tbody>
            {INSURANCE_TABLE.map((row, i) => (
              <tr key={i} style={{ background: i === INSURANCE_TABLE.length - 1 ? "#f0fdf4" : i % 2 === 0 ? "#fff" : "#fafafa" }}>
                <td style={{ padding: "8px 10px", borderBottom: "1px solid #e5e7eb", fontWeight: i === INSURANCE_TABLE.length - 1 ? 700 : 500, color: i === INSURANCE_TABLE.length - 1 ? "#1D9E75" : "inherit" }}>{row.name}</td>
                <td style={{ padding: "8px 10px", borderBottom: "1px solid #e5e7eb", fontWeight: 600 }}>{row.workerRate}</td>
                <td style={{ padding: "8px 10px", borderBottom: "1px solid #e5e7eb" }}>{row.calc200}</td>
                <td style={{ padding: "8px 10px", borderBottom: "1px solid #e5e7eb", fontWeight: i === INSURANCE_TABLE.length - 1 ? 700 : 400 }}>{row.calc300}</td>
                <td style={{ padding: "8px 10px", borderBottom: "1px solid #e5e7eb" }}>{row.calc400}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GreenBox>
        월급 300만원 기준 근로자 공제액 합계: 약 34만원<br />
        사업주도 국민연금·건강보험·고용보험 동일하게 부담 (산재보험 별도)<br />
        실수령액 = 월급 - 4대보험 공제 - 소득세 - 지방소득세
      </GreenBox>

      <Divider />

      <H2>국민연금, 2026년에 얼마나 올랐나요?</H2>
      <p style={body}>
        2026년부터 근로자 부담분이 4.5%에서 4.75%로 올랐어요. 18년 만의 인상이에요.
        사업주도 똑같이 4.75%를 내요. 합산하면 9.5%예요.
        <a href="/w/국민연금-2026년-개혁-보험료율-소득대체율-변경" style={{ color: "#1D9E75", textDecoration: "underline" }}>국민연금 2026년 개혁</a>의 일환으로 점진적으로 인상되는 구조예요.
      </p>
      <p style={body}>
        월급 300만원이라면 국민연금 공제액은 142,500원이에요.
        전년도보다 매달 7,500원이 더 빠져요. 1년 누적하면 9만원이에요.
        회사도 동일하게 142,500원을 부담해요.
      </p>

      <Divider />

      <H2>건강보험과 장기요양보험</H2>
      <p style={body}>
        2026년 건강보험 요율은 7.19%예요. 근로자와 사업주가 절반씩이니 각각 3.595%를 내요.
        <a href="https://www.nhis.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>국민건강보험공단</a>이 매년 조정해요.
        월급 300만원이면 건강보험 107,850원이에요.
      </p>
      <p style={body}>
        장기요양보험은 건강보험료의 13.14%예요. 따로 계산하는 게 아니라
        건강보험료에 13.14%를 곱하는 방식이에요. 월급 300만원이면 14,190원이 추가로 빠져요.
        건강보험 + 장기요양보험 합산하면 122,040원이에요.
      </p>

      <BorderBox>
        고용보험은 근로자 0.9%, 사업주 1.15%예요. 사업주가 더 많이 내요.
        실업급여 재원이 여기서 나와요. 월급 300만원이면 근로자는 27,000원이 빠져요.
      </BorderBox>

      <Divider />

      <H2>4대보험 없이 근로하면 어떻게 되나요?</H2>
      <p style={body}>
        주 15시간 미만이면 4대보험 가입 의무가 없어요. 단기 알바나 주말 파트타임 근무가 해당돼요.
        주 15시간 이상 일하면 사업주가 4대보험을 의무적으로 가입해줘야 해요.
      </p>
      <p style={body}>
        사업주가 가입을 안 해주면 <a href="https://www.moel.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부</a>에 신고할 수 있어요.
        4대보험에 미가입하면 당장 실수령액이 높아 보여도 실업급여나 국민연금, 산재 처리에서 불이익을 받아요.
        <a href="/w/알바-4대보험-가입-조건-주-15시간-기준" style={{ color: "#1D9E75", textDecoration: "underline" }}>알바 4대보험 가입 기준</a>에서 상세 조건을 확인할 수 있어요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        4대보험 공제에 대해 실제로 많이 나오는 질문들이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <RelatedArticles items={RELATED} />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 4대사회보험 요율을 바탕으로 작성됐어요. 요율은 매년 변경될 수 있으니 최신 기준은 4대사회보험 정보연계센터 또는 각 공단에서 확인하세요." />
    </ArticleLayout>
  );
}
