"use client";
// Q1. 자녀가 여러 명인데 세액공제 얼마 받는지, 출산했으면 추가 공제도 되는지 궁금
// Q2. 자녀 수별 공제 금액 확인 → 출산·입양 추가 공제 확인 → 연말정산 신청
// Q3. 자녀 수별 금액(1명 15만, 2명 35만, 3명+ 추가 30만), 나이 요건(8~20세), 출산 추가(첫째30만~셋째70만)
// Q4. GreenBox(금액 요약표) + EligibilityChecker(대상 체크) + BorderBox(출산 추가 공제) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer, EligibilityChecker,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECK_ITEMS = [
  { id: "c1", label: "자녀가 만 8세 이상 만 20세 이하이다" },
  { id: "c2", label: "자녀의 연간 소득금액이 100만원 이하이다" },
  { id: "c3", label: "기본공제 대상자로 등록되어 있다" },
  { id: "c4", label: "배우자와 중복 공제하지 않는다" },
];

const FAQS = [
  { q: "만 7세 자녀는 공제 안 되나요?", a: "자녀 세액공제는 만 8세 이상부터예요. 만 7세 이하는 아동수당을 받기 때문에 중복 방지 차원에서 제외돼요." },
  { q: "대학생 자녀도 공제되나요?", a: "만 20세 이하이고 연간 소득 100만원 이하면 공제돼요. 만 21세가 되는 해에는 제외돼요." },
  { q: "이혼 후 양육권이 있는 쪽만 공제받나요?", a: "기본공제 대상자로 등록한 쪽이 공제받아요. 양육비를 부담하더라도 기본공제 등록 여부가 기준이에요." },
  { q: "손자녀도 자녀 세액공제 대상인가요?", a: "직계비속(자녀·손자녀) 모두 대상이에요. 손자녀도 만 8~20세 요건을 충족하면 공제받을 수 있어요." },
  { q: "출산 공제는 어떻게 신청하나요?", a: "연말정산 간소화서비스에서 자동 반영돼요. 출생신고만 되어 있으면 별도 서류 없이 공제 가능해요." },
];

const REFERENCES = [
  { category: "법령", items: [
    { label: "소득세법 제59조의2 (자녀 세액공제)", url: "https://www.law.go.kr/법령/소득세법" },
  ]},
  { category: "기관", items: [
    { label: "국세청 연말정산 안내", url: "https://www.nts.go.kr" },
  ]},
];

const RELATED = [
  { slug: "연말정산-자녀-세액공제-조건", title: "연말정산 자녀 세액공제 조건", description: "자녀 세액공제 나이·소득 요건 상세예요." },
  { slug: "자녀세액공제", title: "자녀세액공제 전체 정리", description: "자녀 세액공제 총정리예요." },
  { slug: "연말정산-급식비", title: "연말정산 급식비 공제", description: "자녀 급식비 교육비 공제 여부예요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        자녀가 많을수록 세금 돌려받는다?<br />
        다자녀 세액공제 금액과 조건
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        아이가 2명, 3명인데 세액공제를 얼마나 받을 수 있는지 궁금하죠.
        자녀 수에 따라 15만~65만 원까지 공제되고, 출산하면 최대 70만 원이 추가돼요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>자녀 수별 세액공제 금액</H2>
      <p style={body}>만 8세 이상 만 20세 이하 자녀가 대상이에요. 자녀 수가 많을수록 공제 금액이 커져요.</p>
      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead><tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
            <th style={{ textAlign: "left", padding: "5px 8px" }}>자녀 수</th>
            <th style={{ textAlign: "left", padding: "5px 8px" }}>공제 금액</th>
          </tr></thead>
          <tbody>
            {[
              { cnt: "1명", amt: "15만원" },
              { cnt: "2명", amt: "35만원" },
              { cnt: "3명", amt: "65만원 (3명째부터 +30만원)" },
              { cnt: "4명", amt: "95만원" },
            ].map((r, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "5px 8px", fontWeight: 700 }}>{r.cnt}</td>
                <td style={{ padding: "5px 8px" }}>{r.amt}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: "#666", marginTop: 8, marginBottom: 0 }}>★ 만 8세 이상 ~ 만 20세 이하, 연간 소득 100만원 이하 자녀 기준</p>
      </GreenBox>

      <H2>우리 아이가 대상인지 체크하세요</H2>
      <p style={body}>모든 항목에 해당해야 자녀 세액공제를 받을 수 있어요.</p>
      <EligibilityChecker items={CHECK_ITEMS} allMatchText="자녀 세액공제 대상이에요!" partialMatchText="일부 미충족 항목이 있어요. 요건을 다시 확인하세요." />

      <H2>출산·입양하면 추가로 공제돼요</H2>
      <p style={body}>해당 연도에 출생하거나 입양한 자녀가 있으면 별도 추가 공제를 받아요.</p>
      <BorderBox>
        <strong>출산·입양 추가 세액공제</strong><br /><br />
        첫째 출산: 30만원<br />
        둘째 출산: 50만원<br />
        셋째 이상 출산: 70만원<br /><br />
        ★ 기본 자녀 세액공제와 별도로 추가되는 금액이에요. 출생신고만 되면 자동 반영돼요.
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />
      <Divider />
      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2025년 귀속 연말정산 기준으로 작성됐어요. 세법 개정에 따라 변경될 수 있으니 국세청 홈택스에서 확인하세요." />
    </ArticleLayout>
  );
}
