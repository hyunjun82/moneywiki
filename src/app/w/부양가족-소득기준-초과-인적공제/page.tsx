"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const FAQS: { q: string; a: string }[] = [];
const REFERENCES: { category: string; items: { label: string; url: string }[] }[] = [];
const RELATED: { slug: string; title: string; description: string }[] = [];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산·세금</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        부양가족 소득이 있으면 인적공제를 못 받나요?<br />
        소득 기준 100만원과 초과 시 처리
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        부모님이나 배우자가 소득이 조금 있는데 인적공제를 받을 수 있는지 궁금하죠? 연간 소득금액 100만원(근로소득만 있으면 총급여 500만원)을 넘으면 공제 대상이 아니에요.
      </p>
      <ArticleAd position="intro" />
      <Divider />
      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <RelatedArticles items={RELATED} />
      <Disclaimer text="이 글은 2026년 관련 법령을 기준으로 작성됐어요. 구체적 사안은 전문가 상담을 받으세요." />
    </ArticleLayout>
  );
}
