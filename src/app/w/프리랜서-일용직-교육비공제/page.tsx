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
        프리랜서·일용직도 교육비 공제 받을 수 있나요?<br />
        사업소득자 교육비 처리 방법
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        프리랜서인데 학원비나 교육비를 공제받을 수 있는지 궁금하죠? 근로소득 교육비 세액공제는 안 되지만, 사업 관련 교육비라면 필요경비로 처리해서 세금을 줄일 수 있어요.
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
