"use client";
// Q1: 임차인 우선매수권 info
// Q2: 대항력 있는 임차인은 경매 시 최고가 매수인과 같은 조건으로 우선 매수할 수 있습니다. 매각기일까지 우선매수 신고를 해야 합니다.
// Q3: 대항력 있는 임차인은 경매 시 최고가 매수인과 같은 조건으로 우선 매수할 수 있습니다. 매각기일까지 우선매수 신고를 해야 합니다.
// Q4: GreenBox + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST = [
  "대항력 있는 임차인은 경매 시 최고가 매수인과 같은 조건으로 우선 매수할 수 있습니다. 매각기일까지 우선매수 신고를 해야 합니다."
];

const FAQS = [
  { q: "우선매수권 행사하면 무조건 낙찰받나요?", a: "최고가 매수인과 같은 금액을 내야 합니다. 금액을 낼 수 없으면 행사가 무효됩니다." },
  { q: "우선매수 신고 기한은?", a: "매각기일까지 법원에 우선매수 신고서를 제출해야 합니다." },
  { q: "우선매수하면 보증금은?", a: "보증금은 매수대금에 충당되지 않습니다. 별도로 매수대금을 준비해야 합니다." }
];

const REFERENCES = [
  { category: "출처", items: [
      { label: "민사집행법 제148조", url: "https://www.law.go.kr/법령/민사집행법" },
      { label: "대법원 경매정보", url: "https://www.courtauction.go.kr" }
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 임대차</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        임차인 우선매수권
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        경매 시 임차인 우선매수권의 의미와 행사 방법을 알아봅니다. 우선매수 신고 절차와 조건을 정리합니다.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>대항력 있는 임차인은 경매 시 최고가 매수인과 같은 조</H2>
      <p style={body}>대항력 있는 임차인은 경매 시 최고가 매수인과 같은 조건으로 우선 매수할 수 있습니다. 매각기일까지 우선매수 신고를 해야 합니다.</p>
      <GreenBox title="핵심 정리">
        대항력 있는 임차인은 경매 시 최고가 매수인과 같은 조건으로 우선 매수할 수 있습니다. 매각기일까지 우선매수 신고를 해야 합니다.
      </GreenBox>

      <CategoryButton label="부동산 · 임대차 정보" count={5} href="/category/부동산" />
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
      <Disclaimer text="이 글은 2026년 기준 정보를 바탕으로 작성됐어요. 최신 정보는 관련 기관에서 직접 확인해보세요." />
    </ArticleLayout>
  );
}
