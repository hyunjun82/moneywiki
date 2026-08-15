"use client";
// Q1: 가압류 신청 송달료 금액 계산 및 납부 방법 info
// Q2: 송달료는 1회당 5,500원, 당사자 1명당 3회분 내요.
// Q3: 송달료는 1회당 5,500원, 당사자 1명당 3회분 내요., 채무자 1명이면 16,500원, 2명이면 33,000원이에요., 실제로 3회 안 쓰면 남은 돈 돌려받을 수 있어요.
// Q4: GreenBox + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST = [
  "송달료는 1회당 5,500원, 당사자 1명당 3회분 내요.",
  "채무자 1명이면 16,500원, 2명이면 33,000원이에요.",
  "실제로 3회 안 쓰면 남은 돈 돌려받을 수 있어요."
];

const FAQS = [
  { q: "가압류 송달료 채무자 2명이면 얼마예요?", a: "5,500원 × 2명 × 3회 = 33,000원이에요. 채무자(당사자) 수만큼 곱하면 돼요." },
  { q: "송달료 남으면 돌려받을 수 있나요?", a: "네, 가능해요. 3회분 냈는데 2회만 썼으면 1회분(5,500원) 환급받을 수 있어요." },
  { q: "전자소송으로 신청하면 송달료 할인되나요?", a: "아니요. 송달료는 할인 없어요. 인지대만 10% 할인돼요. 송달료는 실비라서 그대로 내야 해요." }
];

const REFERENCES = [
  { category: "출처", items: [
      { label: "송달료규칙", url: "https://www.law.go.kr/법령/송달료규칙" },
      { label: "찾기쉬운 생활법령정보", url: "https://www.easylaw.go.kr" },
      { label: "대법원", url: "https://www.scourt.go.kr" }
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>법률</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        가압류 신청 송달료 금액 계산 및 납부 방법
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        가압류 신청할 때 송달료 얼마 내야 하는지, 당사자 수별로 달라지는지 알려드려요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>송달료는 1회당 5,500원, 당사자 1명당 3회분 내</H2>
      <p style={body}>송달료는 1회당 5,500원, 당사자 1명당 3회분 내요.</p>
      <GreenBox title="핵심 정리">
        송달료는 1회당 5,500원, 당사자 1명당 3회분 내요.<br />
        채무자 1명이면 16,500원, 2명이면 33,000원이에요.<br />
        실제로 3회 안 쓰면 남은 돈 돌려받을 수 있어요.
      </GreenBox>

      <CategoryButton label="법률 정보" count={5} href="/category/법률" />
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
