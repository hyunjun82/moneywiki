"use client";
import { Divider } from "@/components/article-ui/Divider";

// Q1: 계약갱신청구권 중도해지 info
// Q2: 계약갱신청구권으로 갱신한 후에도 중도해지 가능해요.
// Q3: 계약갱신청구권으로 갱신한 후에도 중도해지 가능해요., 세입자는 3개월 전에 통보하면 언제든 나갈 수 있어요., 집주인은 정당한 사유 없이 중도해지 요구 못 해요.
// Q4: GreenBox + Steps + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  { title: "계약갱신청구권으로 갱신한 후에도 중도해지 가능해요.", desc: "계약갱신청구권으로 갱신한 후에도 중도해지 가능해요." },
  { title: "세입자는 3개월 전에 통보하면 언제든 나갈 수 있어요.", desc: "세입자는 3개월 전에 통보하면 언제든 나갈 수 있어요." },
  { title: "집주인은 정당한 사유 없이 중도해지 요구 못 해요.", desc: "집주인은 정당한 사유 없이 중도해지 요구 못 해요." },
];
const CHECKLIST = [
  "계약갱신청구권으로 갱신한 후에도 중도해지 가능해요.",
  "세입자는 3개월 전에 통보하면 언제든 나갈 수 있어요.",
  "집주인은 정당한 사유 없이 중도해지 요구 못 해요."
];

const FAQS = [
  { q: "갱신했는데 1년만 살고 나갈 수 있나요?", a: "네. 3개월 전에 통보하면 언제든 나갈 수 있어요." },
  { q: "중도해지하면 위약금 내야 하나요?", a: "법적으로 위약금 의무는 없어요. 다만 계약서에 특약이 있으면 확인하세요." },
  { q: "집주인이 중간에 나가라고 하면요?", a: "정당한 사유 없이는 못 해요. 세입자가 동의해야 해요." }
];

const REFERENCES = [
  { category: "출처", items: [
      { label: "주택임대차보호법 제6조의3", url: "https://www.law.go.kr/법령/주택임대차보호법" }
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 임대차</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        계약갱신청구권 중도해지
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        갱신해서 2년 더 살기로 했는데 중간에 나가고 싶으면? 3개월 전 통보하면 돼요
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>계약갱신청구권으로 갱신한 후에도 중도해지 가능해요.</H2>
      <p style={body}>계약갱신청구권으로 갱신한 후에도 중도해지 가능해요.</p>
      <GreenBox title="핵심 정리">
        계약갱신청구권으로 갱신한 후에도 중도해지 가능해요.<br />
        세입자는 3개월 전에 통보하면 언제든 나갈 수 있어요.<br />
        집주인은 정당한 사유 없이 중도해지 요구 못 해요.
      </GreenBox>

      <CategoryButton label="부동산 · 임대차 정보" count={5} href="/category/부동산" />
      <RelatedArticles items={[]} />
      <Divider />

      <H2>세입자는 3개월 전에 통보하면 언제든 나갈 수</H2>
      <p style={body}>세입자는 3개월 전에 통보하면 언제든 나갈 수 있어요.</p>
      <Steps steps={STEPS} />
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
