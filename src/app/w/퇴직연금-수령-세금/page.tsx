"use client";

// Q1. 퇴직연금 받을 때 세금이 얼마나 빠지는지, 일시금과 연금 중 뭐가 유리한지 궁금한 상황이에요.
// Q2. 일시금·연금 세금 차이를 비교해서 본인에게 유리한 수령 방법을 선택하는 행동.
// Q3. 퇴직소득세(5~15%) vs 연금소득세(3.3~5.5%), 근속연수 공제, 2026년 감면 확대(20년 초과 50%), 세액공제 환수.
// Q4. GreenBox(핵심 비교) + 표(세금 비교) + BorderBox(2026 변경사항) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const FAQS = [
  { q: "일시금으로 받으면 세금이 얼마예요?", a: "퇴직소득세가 부과돼요. 근속연수에 따라 다르고, 실효세율은 보통 5~15%예요. 오래 일할수록 세금이 줄어요." },
  { q: "연금이 세금 면에서 얼마나 유리해요?", a: "연금소득세 3.3~5.5%로 퇴직소득세보다 훨씬 낮아요. 같은 1억원이라도 연금으로 받으면 세금이 적어요." },
  { q: "2026년에 뭐가 달라졌나요?", a: "연금 수령 20년 초과 구간이 신설돼서 감면율이 최대 50%까지 올랐어요. 오래 나눠 받을수록 더 유리해졌어요." },
  { q: "55세 전에 인출하면 세금이 어떻게 되나요?", a: "기타소득세 16.5%가 부과돼요. 퇴직소득세보다 훨씬 높으니 가급적 55세까지 기다리세요." },
  { q: "세액공제 받은 금액도 세금이 붙나요?", a: "네. IRP 추가 납입으로 세액공제 받은 금액은 일시금 시 기타소득세 16.5%, 연금 시 연금소득세 3.3~5.5%예요." },
  { q: "종신 수령하면 세율이 달라지나요?", a: "2026년부터 종신 형태로 받으면 나이와 관계없이 일괄 3% 세율이 적용돼요." },
];

const REFERENCES = [
  {
    category: "법령·공식 자료",
    items: [
      { label: "소득세법", url: "https://www.law.go.kr/법령/소득세법" },
      { label: "고용노동부 퇴직연금제도", url: "https://www.moel.go.kr/policy/policyinfo/retire/list.do" },
      { label: "금감원 통합연금포털", url: "https://100lifeplan.fss.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직연금-일시금-수령", title: "퇴직연금 일시금 수령", description: "일시금 수령 조건과 신청 방법을 알려드려요." },
  { slug: "퇴직연금-수령-일시금-연금-비교", title: "퇴직연금 일시금 vs 연금 비교", description: "어떤 수령 방법이 유리한지 비교해드려요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직연금 · 세금</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직연금 수령 세금<br />
        일시금 vs 연금 비교와 절세법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직연금 받을 때 세금이 얼마나 빠지는지 궁금하죠.
        일시금으로 받으면 퇴직소득세 5~15%, 연금으로 받으면 3.3~5.5%예요.
        2026년부터 연금 수령 감면이 더 확대됐어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>일시금과 연금, 세금이 이렇게 달라요</H2>
      <p style={body}>
        수령 방법에 따라 적용되는 세금이 완전히 달라요. 같은 금액이라도 연금이 세금 면에서 유리해요.
      </p>

      <SectionBadge>수령 방법별 세금 비교</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>구분</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>일시금</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>연금</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["세금 종류", "퇴직소득세", "연금소득세"],
              ["세율", "5~15% (실효세율)", "3.3~5.5%"],
              ["계산 기준", "근속연수 공제 후 과세표준", "수령 나이에 따라 차등"],
              ["1억원·20년 기준", "약 600만원", "약 550만원 (10년 수령)"],
            ].map(([label, lump, annuity], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{label}</td>
                <td style={{ padding: "9px 12px" }}>{lump}</td>
                <td style={{ padding: "9px 12px", color: "#1D9E75" }}>{annuity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GreenBox>
        연금소득세율 (나이별)이에요.<br />
        · 55세~70세 미만: 5.5%<br />
        · 70세~80세 미만: 4.4%<br />
        · 80세 이상: 3.3%<br />
        · 종신 수령 (2026년~): 나이 무관 3%
      </GreenBox>

      <RelatedArticles items={RELATED} />
      <Divider />

      <H2>2026년부터 연금이 더 유리해졌어요</H2>
      <p style={body}>
        2026년 1월 1일 이후 연금 수령분부터 감면 구간이 확대됐어요.
        오래 나눠 받을수록 세금을 더 아낄 수 있어요.
      </p>

      <SectionBadge>2026년 변경사항</SectionBadge>
      <BorderBox>
        <strong>연금 수령 시 퇴직소득세 감면율 (2026년~)</strong><br /><br />
        · 1~10년차: 퇴직소득세의 70% (기존과 동일)<br />
        · 11~20년차: 퇴직소득세의 60% (기존과 동일)<br />
        · <strong>21년차 이후: 퇴직소득세의 50% (신설)</strong><br /><br />
        20년 넘게 나눠 받으면 퇴직소득세의 절반만 내면 돼요.<br />
        종신 수령 시에는 나이와 무관하게 일괄 3% 세율이 적용돼요.
      </BorderBox>

      <Divider />

      <H2>세금 줄이는 3가지 방법</H2>
      <p style={body}>
        퇴직연금 세금을 최소화하려면 수령 방법을 전략적으로 선택해야 해요.
      </p>

      <GreenBox>
        절세 핵심 전략이에요.<br />
        · <strong>연금으로 받기</strong> — 일시금보다 세금이 훨씬 적어요<br />
        · <strong>10년 이상 나눠 받기</strong> — 10년 이상이어야 연금소득세 적용<br />
        · <strong>70세 이후 더 많이 받기</strong> — 나이가 많을수록 세율이 낮아요
      </GreenBox>

      <p style={body}>
        급하게 목돈이 필요하지 않다면 연금 수령을 권해요.
        일부만 일시금으로 받고 나머지를 연금으로 받는 혼합 수령도 가능해요.
        <a href="https://100lifeplan.fss.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>금감원 통합연금포털</a>에서 내 퇴직연금을 조회하고 시뮬레이션해보세요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 소득세법을 바탕으로 작성됐어요. 세율과 감면율은 법령 개정 시 달라질 수 있으니 금감원 통합연금포털에서 최신 정보를 확인하세요." />
    </ArticleLayout>
  );
}
