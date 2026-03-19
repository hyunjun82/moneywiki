"use client";

// Q1. 급여명세서에 식대가 있는데 연말정산에서 비과세 처리가 맞는지 확인하려는 직장인
// Q2. 월 20만원 한도 확인 → 급여명세서 식대 항목 체크 → 원천징수영수증 비과세 반영 확인
// Q3. 월20만원까지 비과세 / 기본급 포함 불가 → 명세서에 별도 표시 필수 / 급식비(현물)는 전액 비과세 / 재택근무도 동일 적용
// Q4. GreenBox(식대 지급 방식별 비과세 요건) + BorderBox(주의사항 + 원천징수영수증 확인) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "재택근무 시에도 식대 비과세를 받을 수 있나요?",
    a: "네, 받을 수 있어요. 재택근무를 하더라도 회사의 식대 지급 규정에 따라 식대를 받으면 월 20만원 한도까지 비과세예요. 회사마다 재택근무 시 식대 지급 여부가 다르니 회사 규정을 확인하세요.",
  },
  {
    q: "아르바이트생도 식대 비과세를 받을 수 있나요?",
    a: "네, 근로계약을 맺고 일하는 근로자라면 아르바이트생도 받을 수 있어요. 급여명세서에 식대를 별도 항목으로 표시해서 지급하면 월 20만원까지 비과세 혜택이 적용돼요.",
  },
  {
    q: "식대가 기본급에 포함되어 있으면 비과세가 안 되나요?",
    a: "맞아요, 안 돼요. 식대가 기본급에 포함되어 있으면 비과세 혜택을 받을 수 없어요. 급여명세서에 '식대' 또는 '식사대' 항목으로 별도로 표시되어 있어야 해요. 회사에 별도 표기 요청이 가능해요.",
  },
  {
    q: "회사 구내식당은 식대와 다른가요?",
    a: "달라요. 회사가 구내식당을 운영하거나 식권을 주는 경우는 '급식비'라고 해서 금액 한도 없이 전액 비과세예요. 현금으로 주는 '식대'는 월 20만원 한도가 있는 거예요.",
  },
  {
    q: "식대 비과세 누락됐으면 어떻게 하나요?",
    a: "회사 인사팀·경리팀에 원천징수영수증 정정을 요청하세요. 이미 연말정산이 끝났다면 5월에 종합소득세 경정청구로 최대 5년치를 소급해서 돌려받을 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "소득세법 제12조 (비과세소득)", url: "https://www.law.go.kr/법령/소득세법" },
      { label: "소득세법 시행령 제17조의2 (식사 또는 식사대)", url: "https://www.law.go.kr/법령/소득세법시행령" },
      { label: "국세청: 연말정산 비과세 소득 안내", url: "https://www.nts.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "연말정산-비과세-소득", title: "연말정산 비과세 소득 종류", description: "식대 외 교통비·육아수당 비과세 목록이에요." },
  { slug: "원천징수", title: "원천징수란 무엇인가요", description: "매달 월급에서 세금 떼는 방식이에요." },
  { slug: "연말정산-신용카드-소득공제", title: "연말정산 신용카드 소득공제", description: "카드 사용액으로 소득공제 받는 방법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 · 비과세 · 식대</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        연말정산 식대 비과세<br />
        월 20만원 한도 조건과 확인 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        직장인이 받는 식대는 월 20만원까지 세금을 안 내요.
        단, 급여명세서에 '식대' 항목으로 별도 표시되어 있어야 해요.
        기본급에 포함되어 있으면 비과세가 안 돼요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>식대 비과세 지급 방식별 요건</H2>
      <p style={body}>
        어떤 방식으로 식대를 받느냐에 따라 비과세 조건이 달라요.
        현금식대와 현물급식은 규칙이 달라요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>지급 방식</th>
              <th style={{ textAlign: "center", padding: "5px 8px" }}>비과세 한도</th>
              <th style={{ textAlign: "right", padding: "5px 8px" }}>조건</th>
            </tr>
          </thead>
          <tbody>
            {[
              { method: "현금 식대 (급여와 별도 지급)", limit: "월 20만원", condition: "명세서에 '식대' 별도 표시 필수" },
              { method: "식권·복지카드로 지급", limit: "월 20만원", condition: "식비 목적 사용분만 인정" },
              { method: "구내식당·현물 급식", limit: "전액 비과세", condition: "금액 한도 없음" },
              { method: "기본급에 포함된 식대", limit: "비과세 없음", condition: "별도 표시 없으면 미적용" },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)", background: i === 2 ? "rgba(29,158,117,0.05)" : undefined }}>
                <td style={{ padding: "5px 8px", fontSize: 12 }}>{row.method}</td>
                <td style={{ textAlign: "center", padding: "5px 8px", color: i === 3 ? "#E53E3E" : "#1D9E75", fontWeight: 600 }}>{row.limit}</td>
                <td style={{ textAlign: "right", padding: "5px 8px", fontSize: 11 }}>{row.condition}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: "#666", marginTop: 8, marginBottom: 0 }}>
          ※ 소득세법 시행령 제17조의2 기준 / 월 20만원 초과분은 근로소득으로 과세
        </p>
      </GreenBox>

      <H2>비과세 적용 확인 방법</H2>
      <p style={body}>
        내 식대가 제대로 비과세 처리됐는지 두 군데에서 확인할 수 있어요.
      </p>

      <BorderBox>
        <strong>급여명세서 확인</strong><br />
        매월 명세서 → '식대' 또는 '식사대' 항목 별도 표시 여부 확인<br />
        금액이 20만원 이내인지 확인<br />
        기본급과 합산되어 있으면 회사에 분리 요청<br />
        <br />
        <strong>원천징수영수증 확인</strong><br />
        홈택스 → 나의홈택스 → 연말정산 지급명세서<br />
        비과세 소득 항목 → 식대 란에 금액 반영 여부 확인<br />
        <br />
        <strong>주의사항</strong><br />
        월 20만원 초과 식대는 초과분만 과세 (20만원까지는 비과세 유지)<br />
        실제 근무일수 기준 지급 권장 → 장기 결근 시 비과세 인정 불가 가능<br />
        누락 시 5년 이내 경정청구로 환급 가능<br />
        <br />
        ★ 연말정산 간소화서비스에는 자동 반영 → 별도 서류 제출 불필요
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 소득세법 기준으로 작성됐어요. 비과세 한도는 세법 개정에 따라 변경될 수 있으니 국세청 공식 안내를 확인하세요." />
    </ArticleLayout>
  );
}
