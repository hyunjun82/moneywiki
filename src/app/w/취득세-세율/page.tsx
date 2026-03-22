"use client";

// Q1: 취득세 세율 info
// Q2: 취득세는 부동산을 취득할 때 내는 지방세입니다. 주택은 1~12%, 토지·상가는 4%가 기본 세율이며, 다주택자는 중과세가 적용됩니다.
// Q3: 취득세는 부동산을 취득할 때 내는 지방세입니다. 주택은 1~12%, 토지·상가는 4%가 기본 세율이며, 다주택자는 중과세가 적용됩니다.
// Q4: GreenBox + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST = [
  "취득세는 부동산을 취득할 때 내는 지방세입니다. 주택은 1~12%, 토지·상가는 4%가 기본 세율이며, 다주택자는 중과세가 적용됩니다."
];

const FAQS = [
  { q: "생애최초 주택 취득세 감면은 어떻게 받나요?", a: "무주택자가 처음 주택을 취득하면 취득세 최대 200만원까지 감면받을 수 있습니다." },
  { q: "다주택자 취득세는 얼마인가요?", a: "조정대상지역에서 2주택은 8%, 3주택 이상은 12%가 적용됩니다." },
  { q: "취득세는 언제까지 내야 하나요?", a: "취득일(잔금일)로부터 60일 이내에 신고·납부해야 합니다." }
];

const REFERENCES = [
  { category: "출처", items: [
      { label: "지방세법", url: "https://www.law.go.kr/법령/지방세법" },
      { label: "행정안전부 지방세 안내", url: "https://www.mois.go.kr" }
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 임대차</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        취득세 세율
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        부동산 취득세 세율과 계산 방법을 알아봅니다. 주택, 토지, 상가 등 부동산 유형별 취득세율을 정리합니다.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>취득세는 부동산을 취득할 때 내는 지방세입니다. 주택은</H2>
      <p style={body}>취득세는 부동산을 취득할 때 내는 지방세입니다. 주택은 1~12%, 토지·상가는 4%가 기본 세율이며, 다주택자는 중과세가 적용됩니다.</p>
      <GreenBox title="핵심 정리">
        취득세는 부동산을 취득할 때 내는 지방세입니다. 주택은 1~12%, 토지·상가는 4%가 기본 세율이며, 다주택자는 중과세가 적용됩니다.
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
      <Disclaimer text="이 글은 2026년 1월 기준 정보를 바탕으로 작성됐어요. 최신 정보는 관련 기관에서 직접 확인해보세요." />
    </ArticleLayout>
  );
}
