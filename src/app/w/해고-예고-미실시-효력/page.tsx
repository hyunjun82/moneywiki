"use client";

// Q1: 해고 예고 미실시 효력 info
// Q2: 해고 예고를 하지 않은 해고도 효력은 있어요. 하지만 30일분 통상임금을 예고수당으로 받을 수 있어요.
// Q3: 해고 예고를 하지 않은 해고도 효력은 있어요. 하지만 30일분 통상임금을 예고수당으로 받을 수 있어요., 사용자는 근로자를 해고하려면 최소 30일 전에 예고해야 해요. 예고 안 하면 30일분 임금을 지급해야 해요., 예고 의무 위반은 형사처벌 대상이에요. 2년 이하 징역 또는 2천만원 이하 벌금에 처해질 수 있어요.
// Q4: GreenBox + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST = [
  "해고 예고를 하지 않은 해고도 효력은 있어요. 하지만 30일분 통상임금을 예고수당으로 받을 수 있어요.",
  "사용자는 근로자를 해고하려면 최소 30일 전에 예고해야 해요. 예고 안 하면 30일분 임금을 지급해야 해요.",
  "예고 의무 위반은 형사처벌 대상이에요. 2년 이하 징역 또는 2천만원 이하 벌금에 처해질 수 있어요."
];

const FAQS = [
  { q: "예고 없이 해고하면 무효인가요?", a: "아니요, 효력은 있어요. 하지만 30일분 통상임금을 예고수당으로 받을 수 있어요." },
  { q: "예고수당은 어떻게 계산하나요?", a: "통상임금 × 30일로 계산해요. 월급 300만원이고 한 달이 30일이라면 300만원을 받는 거예요." },
  { q: "예고 의무 위반은 처벌되나요?", a: "네, 2년 이하 징역 또는 2천만원 이하 벌금에 처해질 수 있어요. 고용노동부에 진정을 제기할 수 있어요." }
];

const REFERENCES = [
  { category: "출처", items: [
      { label: "근로기준법", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "고용노동부", url: "https://www.moel.go.kr" }
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로 · 노동</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        해고 예고 미실시 효력
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        해고 예고를 안 하고 바로 해고했다면 무효일까요? 예고 의무와 위반 시 효력, 예고수당 청구 방법을 알려드려요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>해고 예고를 하지 않은 해고도 효력은 있어요. 하지만 </H2>
      <p style={body}>해고 예고를 하지 않은 해고도 효력은 있어요. 하지만 30일분 통상임금을 예고수당으로 받을 수 있어요.</p>
      <GreenBox title="핵심 정리">
        해고 예고를 하지 않은 해고도 효력은 있어요. 하지만 30일분 통상임금을 예고수당으로 받을 수 있어요.<br />
        사용자는 근로자를 해고하려면 최소 30일 전에 예고해야 해요. 예고 안 하면 30일분 임금을 지급해야 해요.<br />
        예고 의무 위반은 형사처벌 대상이에요. 2년 이하 징역 또는 2천만원 이하 벌금에 처해질 수 있어요.
      </GreenBox>

      <CategoryButton label="근로 · 노동 정보" count={5} href="/category/근로/노동" />
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
