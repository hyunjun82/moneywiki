"use client";

// Q1. 월급에서 세금이 왜 미리 빠지는지, 원천징수가 무엇인지 궁금한 직장인 또는 프리랜서
// Q2. 원천징수 개념 이해 → 내 급여에서 얼마 빠지는지 파악 → 연말정산으로 정산
// Q3. 회사가 직원 대신 세금 내는 방식 / 근로소득 간이세액표 적용 / 프리랜서 3.3% / 연말정산에서 정산
// Q4. GreenBox(소득 종류별 원천징수율) + GreenBox(간이세액표 예시) + BorderBox(비과세 항목 + 확인 방법) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "원천징수는 왜 하나요?",
    a: "세금을 나중에 한꺼번에 내면 부담이 크니까, 매달 조금씩 미리 떼는 거예요. 국가 입장에서는 세수를 안정적으로 확보할 수 있고, 직장인 입장에서는 나중에 큰 세금을 한 번에 안 내도 돼서 편해요.",
  },
  {
    q: "원천징수 세율은 어떻게 정해지나요?",
    a: "근로소득은 근로소득 간이세액표를 보고 정해요. 월급 금액과 부양가족 수에 따라 달라요. 프리랜서(사업소득)는 소득의 3.3%를 일괄 원천징수해요. 은행 이자와 주식 배당금은 15.4%예요.",
  },
  {
    q: "원천징수를 많이 떼면 환급을 많이 받나요?",
    a: "네, 맞아요. 원천징수를 많이 했으면 연말정산 때 환급을 많이 받을 가능성이 높아요. 원천징수는 대략적인 세금이고, 연말정산에서 정확한 세금을 계산해서 차이를 돌려주거나 추가로 걷는 방식이에요.",
  },
  {
    q: "프리랜서도 원천징수 대상인가요?",
    a: "네, 프리랜서도 3.3% 원천징수를 당해요. 소득세 3%와 지방소득세 0.3%를 합친 거예요. 100만원 받으면 3만 3천원 떼고 96만 7천원을 받아요. 5월에 종합소득세 신고로 정산할 수 있어요.",
  },
  {
    q: "비과세 소득은 원천징수 안 하나요?",
    a: "맞아요. 비과세 소득은 원천징수하지 않아요. 식대 월 20만원, 출산보육수당 월 20만원, 자가운전보조금 월 20만원, 육아휴직급여 등이 비과세예요. 급여명세서에 별도로 표시되어 있어야 해요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "소득세법 제127조 (원천징수의무)", url: "https://www.law.go.kr/법령/소득세법" },
      { label: "국세청: 원천징수 안내", url: "https://www.nts.go.kr" },
      { label: "홈택스 원천징수영수증 조회", url: "https://www.hometax.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "원천세-신고-납부", title: "원천세 신고 납부 방법", description: "사업자가 원천세 신고하는 절차예요." },
  { slug: "연말정산", title: "연말정산 전체 흐름", description: "원천징수와 연결되는 연말정산이에요." },
  { slug: "연말정산-식대-비과세", title: "연말정산 식대 비과세", description: "비과세 소득 대표 항목인 식대예요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 원천징수 · 급여</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        원천징수란 무엇인가요<br />
        월급에서 세금 미리 떼는 이유
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        월급을 받을 때 세금이 미리 빠져있는 게 원천징수예요.
        회사가 직원 대신 세금을 국가에 내주는 방식이에요.
        1년 치 정확한 세금은 연말정산에서 계산하고, 더 냈으면 돌려받아요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>소득 종류별 원천징수율</H2>
      <p style={body}>
        받는 소득 종류에 따라 원천징수율이 달라요. 프리랜서와 직장인이 다르게 적용돼요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>소득 종류</th>
              <th style={{ textAlign: "center", padding: "5px 8px" }}>원천징수율</th>
              <th style={{ textAlign: "right", padding: "5px 8px" }}>정산 방법</th>
            </tr>
          </thead>
          <tbody>
            {[
              { type: "근로소득 (직장인 월급)", rate: "간이세액표 적용", settle: "연말정산" },
              { type: "사업소득 (프리랜서)", rate: "3.3%", settle: "5월 종합소득세 신고" },
              { type: "이자소득 (은행 이자)", rate: "15.4%", settle: "분리과세 (정산 없음)" },
              { type: "배당소득 (주식 배당)", rate: "15.4%", settle: "분리과세 or 종합소득세" },
              { type: "퇴직소득", rate: "퇴직소득세율 적용", settle: "지급 시 정산" },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "5px 8px" }}>{row.type}</td>
                <td style={{ textAlign: "center", padding: "5px 8px", color: "#1D9E75", fontWeight: 600 }}>{row.rate}</td>
                <td style={{ textAlign: "right", padding: "5px 8px", fontSize: 12 }}>{row.settle}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </GreenBox>

      <H2>근로소득 간이세액표 적용 예시</H2>
      <p style={body}>
        직장인 원천징수는 월급과 부양가족 수에 따라 달라요. 부양가족이 많을수록 덜 떼요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>월급 (세전)</th>
              <th style={{ textAlign: "center", padding: "5px 8px" }}>부양가족 1명</th>
              <th style={{ textAlign: "center", padding: "5px 8px" }}>부양가족 2명</th>
              <th style={{ textAlign: "right", padding: "5px 8px" }}>부양가족 3명</th>
            </tr>
          </thead>
          <tbody>
            {[
              { salary: "300만원", f1: "약 10만원", f2: "약 8만원", f3: "약 5만원" },
              { salary: "400만원", f1: "약 18만원", f2: "약 14만원", f3: "약 11만원" },
              { salary: "500만원", f1: "약 28만원", f2: "약 23만원", f3: "약 19만원" },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "5px 8px", fontWeight: 700 }}>{row.salary}</td>
                <td style={{ textAlign: "center", padding: "5px 8px" }}>{row.f1}</td>
                <td style={{ textAlign: "center", padding: "5px 8px" }}>{row.f2}</td>
                <td style={{ textAlign: "right", padding: "5px 8px" }}>{row.f3}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: "#666", marginTop: 8, marginBottom: 0 }}>
          ※ 근로소득 간이세액표 100% 기준 (80%·120% 선택 가능) / 지방소득세 포함<br />
          ※ 실제 금액은 공제 항목에 따라 다를 수 있음
        </p>
      </GreenBox>

      <H2>비과세 소득과 원천징수영수증 확인</H2>
      <p style={body}>
        비과세 소득은 세금을 안 떼고 그대로 줘요.
        1년 치 원천징수 내역은 원천징수영수증에서 확인할 수 있어요.
      </p>

      <BorderBox>
        <strong>주요 비과세 소득 (원천징수 없음)</strong><br />
        식대: 월 20만원까지<br />
        출산보육수당: 월 20만원까지<br />
        자가운전보조금: 월 20만원까지<br />
        육아휴직급여: 전액<br />
        <br />
        <strong>원천징수영수증 확인 방법</strong><br />
        홈택스 → 나의홈택스 → 연말정산·지급명세서 → 지급명세서 제출내역<br />
        연간 총급여, 원천징수 세금, 비과세 소득 내역 확인 가능<br />
        <br />
        <strong>간이세액표 80%/100%/120% 선택</strong><br />
        80%: 매달 적게 떼고 연말정산에서 추가 납부 가능성 높음<br />
        120%: 매달 많이 떼고 연말정산 환급 가능성 높음<br />
        회사 인사팀에 원하는 비율 신청 가능<br />
        <br />
        ★ 회사를 옮겼다면 이전 회사 원천징수영수증 반드시 받아두기
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 소득세법 기준으로 작성됐어요. 간이세액표와 비과세 한도는 세법 개정에 따라 변경될 수 있어요." />
    </ArticleLayout>
  );
}
