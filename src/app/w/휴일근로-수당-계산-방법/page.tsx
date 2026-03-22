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
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로·임금</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        휴일에 일했으면 수당이 얼마인가요?<br />
        휴일근로 수당 계산 방법
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        공휴일이나 주말에 출근했는데 수당을 제대로 받고 있는지 모르겠죠? 휴일근로수당은 통상임금의 1.5배예요. 8시간을 넘기면 2배가 돼요.
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
