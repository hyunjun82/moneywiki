// Q1. 급여명세서 보니 국민연금 공제액이 올라서 "얼마나 더 내야 해? 나중에 더 받기는 해?" 확인하려는 직장인·자영업자
// Q2. 내 월급 기준으로 추가 납부액 계산 + 나중에 더 받는 연금액 파악
// Q3. 보험료율 9→13% 단계 인상(매년 0.5%p, 2033년까지) + 소득대체율 41.5→43% 즉시 인상 + 국가 지급 보장
// Q4. GreenBox(연도별 보험료율표) + Calculator(추가 납부액) + BorderBox(소득대체율 효과) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

// ─── 데이터 ──────────────────────────────────────────

const RATE_TABLE = [
  { year: "2026년 (현재)", rate: "9.5%", employeeAdd: "+15,000원" },
  { year: "2027년", rate: "10.0%", employeeAdd: "+30,000원" },
  { year: "2028년", rate: "10.5%", employeeAdd: "+45,000원" },
  { year: "2029년", rate: "11.0%", employeeAdd: "+60,000원" },
  { year: "2030년", rate: "11.5%", employeeAdd: "+75,000원" },
  { year: "2031년", rate: "12.0%", employeeAdd: "+90,000원" },
  { year: "2032년", rate: "12.5%", employeeAdd: "+105,000원" },
  { year: "2033년", rate: "13.0%", employeeAdd: "+120,000원" },
];

const FAQS = [
  {
    q: "2026년 1월부터 보험료가 바로 오른 건가요?",
    a: "네. 2026년 1월부터 보험료율이 9% → 9.5%로 올랐어요. 직장인은 회사와 반반 부담이라 본인 부담은 0.25%p 증가예요. 월급 400만원이면 월 10,000원 더 내요.",
  },
  {
    q: "소득대체율 인상으로 얼마나 더 받나요?",
    a: "소득대체율이 41.5% → 43%로 즉시 올라서 40년 가입 기준 월 약 9만원 더 받아요. 가입 기간이 짧을수록 증가폭은 작아요. 국민연금공단 홈페이지에서 내 예상수령액을 확인할 수 있어요.",
  },
  {
    q: "국민연금이 고갈되면 못 받는 거 아닌가요?",
    a: "이번 개혁으로 고갈 시점이 2056년 → 2071년으로 15년 연장됐어요. 국가 지급 보장도 법으로 명시됐고요. 설령 기금이 부족해도 국가가 세금으로 채워 지급한다는 뜻이에요.",
  },
  {
    q: "지역가입자는 보험료 부담이 2배인가요?",
    a: "네. 직장인은 회사가 절반을 내줘서 본인 부담이 절반이지만, 지역가입자(자영업자·프리랜서)는 전액 본인이 내야 해요. 인상 부담이 직장인의 2배예요.",
  },
  {
    q: "보험료 더 내기 싫으면 납부를 멈출 수 있나요?",
    a: "의무 가입 대상(직장인, 18~59세 지역가입자)은 탈퇴할 수 없어요. 소득이 없는 경우 납부 예외 신청을 할 수 있지만, 그 기간은 가입 기간으로 인정되지 않아서 나중에 받는 연금이 줄어요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "보건복지부: 국민연금 개혁 보도자료", url: "https://www.mohw.go.kr/board.es?mid=a10503000000&bid=0027&list_no=1485039" },
      { label: "국민연금공단: 예상수령액 조회", url: "https://www.nps.or.kr" },
      { label: "정책브리핑: 2026년 국민연금 개혁", url: "https://www.korea.kr/news/policyNewsView.do?newsId=148957270" },
    ],
  },
];

const RELATED = [
  { slug: "국민연금-조기수령-감액률-신청조건-손익분기점", title: "국민연금 조기수령 감액률과 손익분기점", description: "일찍 받을수록 깎이는 비율과 언제 이득인지 계산해요." },
  { slug: "국민연금-추납제도", title: "국민연금 추납제도로 연금 늘리기", description: "과거 미납분을 나중에 내고 연금을 늘리는 방법이에요." },
  { slug: "기초연금-수급-자격-및-소득-하위-70-재산-기준", title: "기초연금 2026년 수급 자격과 소득 기준", description: "65세 이상 기초연금 받을 수 있는지 확인하세요." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연금 · 국민연금 · 2026년 개혁</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        2026년 국민연금 개혁, 뭐가 바뀌었나요?<br />
        보험료율 인상과 소득대체율 변경 정리
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        2026년 1월부터 국민연금 보험료율이 9% → 9.5%로 올랐어요.
        매년 0.5%p씩 2033년 13%까지 오르죠.
        반면 소득대체율은 41.5% → 43%로 즉시 인상돼서 나중에 받는 연금도 늘어요.
        40년 가입 기준 월 약 9만원 더 받고, 국가 지급 보장도 법으로 명시됐어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>연도별 보험료율 인상 일정</H2>
      <p style={body}>
        2026년부터 매년 0.5%p씩 올라 2033년에 13%로 고정돼요.
        직장인은 회사와 반반 부담이라 실제 본인 추가 부담은 아래 표의 절반이에요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>연도</th>
              <th style={{ textAlign: "center", padding: "5px 8px" }}>보험료율</th>
              <th style={{ textAlign: "right", padding: "5px 8px" }}>직장인 추가 부담 (월급 600만원 기준)</th>
            </tr>
          </thead>
          <tbody>
            {RATE_TABLE.map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)", background: i === 0 ? "rgba(29,158,117,0.06)" : undefined }}>
                <td style={{ padding: "5px 8px", fontWeight: i === 0 ? 700 : 400 }}>{row.year}</td>
                <td style={{ textAlign: "center", padding: "5px 8px", fontWeight: i === 0 ? 700 : 400 }}>{row.rate}</td>
                <td style={{ textAlign: "right", padding: "5px 8px", color: "#E53E3E" }}>{row.employeeAdd}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </GreenBox>

      <H2>월급별 추가 납부액 (2026년 기준)</H2>
      <p style={body}>
        2026년 보험료율 9.5% 기준, 2025년(9%) 대비 추가로 내는 금액이에요.
        직장인은 회사가 절반 부담해서 아래 금액이 본인 추가 부담분이에요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>월 소득</th>
              <th style={{ textAlign: "right", padding: "5px 8px" }}>직장인 추가 (본인 부담)</th>
              <th style={{ textAlign: "right", padding: "5px 8px" }}>지역가입자 추가 (전액)</th>
            </tr>
          </thead>
          <tbody>
            {[
              { salary: "200만원", emp: "+5,000원", self: "+10,000원" },
              { salary: "300만원", emp: "+7,500원", self: "+15,000원" },
              { salary: "400만원", emp: "+10,000원", self: "+20,000원" },
              { salary: "500만원", emp: "+12,500원", self: "+25,000원" },
              { salary: "600만원", emp: "+15,000원", self: "+30,000원" },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "5px 8px" }}>{row.salary}</td>
                <td style={{ textAlign: "right", padding: "5px 8px" }}>{row.emp}</td>
                <td style={{ textAlign: "right", padding: "5px 8px", color: "#E53E3E" }}>{row.self}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </GreenBox>

      <BorderBox>
        <strong>소득대체율 인상 효과</strong> — 나중에 더 받아요<br />
        소득대체율 41.5% → 43% 즉시 인상 (2026년 1월부터)<br />
        40년 가입 기준: 월 약 9만원 추가 수령<br />
        20년 가입 기준: 월 약 4만5천원 추가 수령<br />
        내 예상수령액 확인: 국민연금공단(nps.or.kr) → "내 연금 알아보기"
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>국가 지급 보장, 고갈돼도 받을 수 있어요</H2>
      <p style={body}>
        이번 개혁에서 가장 중요한 변화예요.
        국가 지급 보장이 <a href="https://www.law.go.kr/법령/국민연금법" style={{ color: "#1D9E75", textDecoration: "underline" }}>국민연금법</a>에 명시됐어요.
        기금이 고갈되더라도 국가가 세금으로 지급을 보장한다는 뜻이에요.
        개혁으로 기금 고갈 시점이 2056년 → 2071년으로 15년 연장됐죠.
      </p>
      <p style={body}>
        보험료를 더 내는 게 아깝게 느껴질 수 있어요.
        하지만 소득대체율 인상으로 나중에 더 받는 금액을 따져보면, 장기적으로는 이득이 되는 구조예요.
        가입 기간이 긴 20~40대일수록 인상 혜택이 더 커요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        국민연금 개혁에 대해 많이 물어보는 것들이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 보건복지부 발표 기준으로 작성됐어요. 정확한 예상 수령액은 국민연금공단(nps.or.kr)에서 확인하세요." />
    </ArticleLayout>
  );
}
