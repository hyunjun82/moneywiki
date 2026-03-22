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
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로·퇴직연금</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직연금 중도인출, 어떤 서류가 필요한가요?<br />
        사유별 필요 서류
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        급하게 퇴직연금을 빼야 하는데 서류가 뭐가 필요한지 궁금하죠? 사유에 따라 주택매매계약서, 임대차계약서, 진단서 등이 필요해요.
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
