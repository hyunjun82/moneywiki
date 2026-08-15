"use client";
// Q1: 국민연금 연기연금 info
// Q2: 연기연금은 수령을 늦추면 연금이 늘어나는 제도예요.
// Q3: 연기연금은 수령을 늦추면 연금이 늘어나는 제도예요., 1년 늦출 때마다 7.2% 증액돼요 (5년이면 36%)., 최대 5년까지 연기할 수 있어요.
// Q4: GreenBox + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST = [
  "연기연금은 수령을 늦추면 연금이 늘어나는 제도예요.",
  "1년 늦출 때마다 7.2% 증액돼요 (5년이면 36%).",
  "최대 5년까지 연기할 수 있어요."
];

const FAQS = [
  { q: "연기연금이 뭐예요?", a: "국민연금 수령 시기를 늦추면 연금이 늘어나는 제도예요." },
  { q: "얼마나 더 받아요?", a: "1년 늦출 때마다 7.2% 증액돼요. 5년 늦추면 36% 더 받아요." },
  { q: "최대 몇 년까지 연기할 수 있어요?", a: "최대 5년까지요. 65세 수령 예정이면 70세까지 늦출 수 있어요." },
  { q: "연기연금 누가 신청하면 좋아요?", a: "소득이 있어서 당장 연금 안 받아도 되고, 오래 살 자신 있는 분이요." },
  { q: "연기했다가 취소할 수 있나요?", a: "네. 연기 신청 후 언제든 수령 개시 신청할 수 있어요." }
];

const REFERENCES = [
  { category: "출처", items: [
      { label: "국민연금법", url: "https://www.law.go.kr/법령/국민연금법" },
      { label: "국민연금공단", url: "https://www.nps.or.kr" }
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 절세</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        국민연금 연기연금
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        국민연금 늦게 받으면 얼마나 더 받나요? 연기연금 증액률과 신청 방법 정리했어요
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>연기연금은 수령을 늦추면 연금이 늘어나는 제도예요.</H2>
      <p style={body}>연기연금은 수령을 늦추면 연금이 늘어나는 제도예요.</p>
      <GreenBox title="핵심 정리">
        연기연금은 수령을 늦추면 연금이 늘어나는 제도예요.<br />
        1년 늦출 때마다 7.2% 증액돼요 (5년이면 36%).<br />
        최대 5년까지 연기할 수 있어요.
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
      <Disclaimer text="이 글은 2026년 기준 정보를 바탕으로 작성됐어요. 최신 정보는 관련 기관에서 직접 확인해보세요." />
    </ArticleLayout>
  );
}
