"use client";
import { Divider } from "@/components/article-ui/Divider";

// Q1: 묵시적갱신 중도해지 2년 전 불가 3개월 통지 2026 info
// Q2: 묵시적갱신 후에는 임차인이 언제든지 해지 통지 가능해요
// Q3: 묵시적갱신 후에는 임차인이 언제든지 해지 통지 가능해요, 3개월 전 통지하면 해지 효력 발생해요, 집주인이 2년 전 불가라고 하는 건 잘못된 주장이에요
// Q4: GreenBox + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST = [
  "묵시적갱신 후에는 임차인이 언제든지 해지 통지 가능해요",
  "3개월 전 통지하면 해지 효력 발생해요",
  "집주인이 2년 전 불가라고 하는 건 잘못된 주장이에요"
];

const FAQS = [
  { q: "묵시적갱신 후 언제든지 나갈 수 있나요?", a: "네, 가능해요. 임대인에게 3개월 전에 해지 통지를 하면 되고, 통지한 날로부터 3개월이 지나면 해지 효력이 발생해요." },
  { q: "집주인이 2년 전에는 못 나간다고 하는데 맞나요?", a: "아니요, 틀린 주장이에요. 묵시적갱신 후에는 임차인이 언제든지 해지 통지를 할 수 있어요." },
  { q: "3개월 통지는 어떻게 하나요?", a: "내용증명으로 보내는 게 가장 안전해요. 카톡이나 문자는 나중에 증거로 인정받기 어려울 수 있어요." }
];

const REFERENCES = [
  { category: "출처", items: [
      { label: "주택임대차보호법 제6조의2", url: "https://www.law.go.kr/법령/주택임대차보호법" },
      { label: "찾기쉬운 생활법령정보", url: "https://easylaw.go.kr" }
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 임대차</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        묵시적갱신 중도해지 2년 전 불가 3개월 통지 2026
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        묵시적갱신으로 계속 살다가 갑자기 이사 가야 하는데, 2년 전에는 못 나간다는 게 맞나요?
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>묵시적갱신 후에는 임차인이 언제든지 해지 통지 가능해요</H2>
      <p style={body}>묵시적갱신 후에는 임차인이 언제든지 해지 통지 가능해요</p>
      <GreenBox title="핵심 정리">
        묵시적갱신 후에는 임차인이 언제든지 해지 통지 가능해요<br />
        3개월 전 통지하면 해지 효력 발생해요<br />
        집주인이 2년 전 불가라고 하는 건 잘못된 주장이에요
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
