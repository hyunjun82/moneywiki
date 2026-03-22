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
        DB, DC, IRP 중 뭐가 유리한가요?<br />
        퇴직연금 유형별 비교
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직연금 유형이 3가지나 되는데 뭐가 뭔지 헷갈리죠? 핵심은 이거예요. DB는 회사가 운용하고 정해진 금액을 받고, DC는 내가 운용하고 수익에 따라 달라지고, IRP는 개인이 추가로 넣는 거예요.
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
