"use client";

// Q1: 전대차 계약 동의서 작성 요령 및 전차인 보호 범위 info
// Q2: 전대차 동의서는 반드시 서면으로 작성하고 건물주 기명날인을 받아야 해요.
// Q3: 전대차 동의서는 반드시 서면으로 작성하고 건물주 기명날인을 받아야 해요., 구두 동의는 나중에 분쟁 시 증거 가치가 없어요., 전차인은 원래 임대인과의 계약 범위 내에서만 보호돼요.
// Q4: GreenBox + Steps + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  { title: "전대차 동의서는 반드시 서면으로 작성하고 건물주 기명날", desc: "전대차 동의서는 반드시 서면으로 작성하고 건물주 기명날인을 받아야 해요." },
  { title: "구두 동의는 나중에 분쟁 시 증거 가치가 없어요.", desc: "구두 동의는 나중에 분쟁 시 증거 가치가 없어요." },
  { title: "전차인은 원래 임대인과의 계약 범위 내에서만 보호돼요.", desc: "전차인은 원래 임대인과의 계약 범위 내에서만 보호돼요." },
];
const CHECKLIST = [
  "전대차 동의서는 반드시 서면으로 작성하고 건물주 기명날인을 받아야 해요.",
  "구두 동의는 나중에 분쟁 시 증거 가치가 없어요.",
  "전차인은 원래 임대인과의 계약 범위 내에서만 보호돼요."
];

const FAQS = [
  { q: "전대차 동의서를 꼭 써야 하나요?", a: "꼭 써야 해요. 구두 동의는 나중에 문제가 생기면 증거가 될 수 없어요. 반드시 서면으로 받으세요." },
  { q: "전차인은 원래 건물주와 계약한 것처럼 보호되나요?", a: "아니에요. 전차인은 원래 임차인과의 계약 범위 내에서만 보호받아요. 원래 계약보다 더 많은 권리를 가질 순 없어요." },
  { q: "전차인도 대항력과 우선변제권이 생겨요?", a: "전차인은 건물주에게 직접 대항력을 가질 수 없어요. 다만 원래 임차인이 가진 권리 내에서 보호받을 수 있어요." }
];

const REFERENCES = [
  { category: "출처", items: [
      { label: "주택임대차보호법", url: "https://www.law.go.kr" },
      { label: "상가건물 임대차보호법", url: "https://www.law.go.kr" }
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 임대차</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        전대차 계약 동의서 작성 요령 및 전차인 보호 범위
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        전대차를 하려면 건물주 동의서가 필수예요. 어떻게 작성하고 전차인은 어디까지 보호되는지 알려드릴게요
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>전대차 동의서는 반드시 서면으로 작성하고 건물주 기명날</H2>
      <p style={body}>전대차 동의서는 반드시 서면으로 작성하고 건물주 기명날인을 받아야 해요.</p>
      <GreenBox title="핵심 정리">
        전대차 동의서는 반드시 서면으로 작성하고 건물주 기명날인을 받아야 해요.<br />
        구두 동의는 나중에 분쟁 시 증거 가치가 없어요.<br />
        전차인은 원래 임대인과의 계약 범위 내에서만 보호돼요.
      </GreenBox>

      <CategoryButton label="부동산 · 임대차 정보" count={5} href="/category/부동산" />
      <RelatedArticles items={[]} />
      <Divider />

      <H2>구두 동의는 나중에 분쟁 시 증거 가치가 없어</H2>
      <p style={body}>구두 동의는 나중에 분쟁 시 증거 가치가 없어요.</p>
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
      <Disclaimer text="이 글은 2026년 1월 기준 정보를 바탕으로 작성됐어요. 최신 정보는 관련 기관에서 직접 확인해보세요." />
    </ArticleLayout>
  );
}
