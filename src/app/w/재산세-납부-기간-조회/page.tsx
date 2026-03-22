"use client";

// Q1: 재산세 납부 기간 조회 계산 2026 info
// Q2: 재산세는 7월과 9월에 두 번 나눠서 납부해요.
// Q3: 재산세는 7월과 9월에 두 번 나눠서 납부해요., 위택스나 STAX 앱으로 간편하게 조회하고 납부할 수 있어요., 1세대 1주택자는 공시가격 9억원 이하면 특례 세율로 최대 50% 감면받아요.
// Q4: GreenBox + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST = [
  "재산세는 7월과 9월에 두 번 나눠서 납부해요.",
  "위택스나 STAX 앱으로 간편하게 조회하고 납부할 수 있어요.",
  "1세대 1주택자는 공시가격 9억원 이하면 특례 세율로 최대 50% 감면받아요."
];

const FAQS = [
  { q: "재산세 납부 기한 넘기면 어떻게 되나요?", a: "납부 기한을 넘기면 3%의 가산금을 내야 해요. 계속 안 내면 추가 가산금과 체납처분을 받을 수 있어요." },
  { q: "재산세는 누가 내나요?", a: "과세 기준일인 매년 6월 1일 기준으로 해당 재산을 보유한 사람이 납부해요. 6월 1일에 소유자가 누구냐가 중요해요." },
  { q: "재산세 20만원 이하면 어떻게 되나요?", a: "재산세 세액이 20만원 이하라면 7월에 일괄 납부하게 돼요. 9월에는 따로 고지서가 안 나와요." }
];

const REFERENCES = [
  { category: "출처", items: [
      { label: "서울시 재산세 안내", url: "https://news.seoul.go.kr" },
      { label: "위택스 재산세 조회", url: "https://www.wetax.go.kr" }
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 절세</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        재산세 납부 기간 조회 계산 2026
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        재산세 납부 기간은 언제인지, 조회와 계산은 어떻게 하는지 쉽게 알려드려요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>재산세는 7월과 9월에 두 번 나눠서 납부해요.</H2>
      <p style={body}>재산세는 7월과 9월에 두 번 나눠서 납부해요.</p>
      <GreenBox title="핵심 정리">
        재산세는 7월과 9월에 두 번 나눠서 납부해요.<br />
        위택스나 STAX 앱으로 간편하게 조회하고 납부할 수 있어요.<br />
        1세대 1주택자는 공시가격 9억원 이하면 특례 세율로 최대 50% 감면받아요.
      </GreenBox>

      <CategoryButton label="세금 · 절세 정보" count={5} href="/category/세금" />
      <RelatedArticles items={[]} />
      <Divider />

      <H2>꼭 체크해야 할 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>놓치기 쉬운 항목을 정리했어요.</p>
      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />
      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />
      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 정보를 바탕으로 작성됐어요. 최신 정보는 관련 기관에서 직접 확인해보세요." />
    </ArticleLayout>
  );
}
