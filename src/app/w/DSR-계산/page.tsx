"use client";
// Q1: DSR 계산 방법 2026 info
// Q2: DSR은 연간 총 부채 원리금 상환액을 연소득으로 나눈 비율이에요
// Q3: DSR은 연간 총 부채 원리금 상환액을 연소득으로 나눈 비율이에요, 2026년 스트레스 DSR 3단계는 스트레스 금리 1.5%, 기본 비율 40%가 적용돼요, DSR 계산기를 이용하면 내 대출 가능 한도를 미리 확인할 수 있어요
// Q4: GreenBox + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST = [
  "DSR은 연간 총 부채 원리금 상환액을 연소득으로 나눈 비율이에요",
  "2026년 스트레스 DSR 3단계는 스트레스 금리 1.5%, 기본 비율 40%가 적용돼요",
  "DSR 계산기를 이용하면 내 대출 가능 한도를 미리 확인할 수 있어요"
];

const FAQS = [
  { q: "DSR 40%면 대출 얼마나 받을 수 있나요?", a: "연소득 5,000만원이고 DSR 40%라면 연간 원리금 상환액이 2,000만원까지 가능해요. 대략 1억 5천만원 정도 대출받을 수 있어요." },
  { q: "DSR 계산 시 전세대출도 포함되나요?", a: "네, 전세대출도 DSR 계산에 포함돼요. 주택담보대출, 신용대출, 전세대출 등 모든 대출의 원리금 상환액이 합산돼요." },
  { q: "스트레스 DSR 3단계는 언제부터인가요?", a: "2025년 7월부터 전국에 스트레스 DSR 3단계가 시행됐어요. 지방 주담대는 2026년 6월까지 2단계가 유예됐어요." }
];

const REFERENCES = [
  { category: "출처", items: [
      { label: "금융위원회", url: "https://www.fsc.go.kr/no010101/84617" },
      { label: "금융감독원", url: "https://www.fss.or.kr" }
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 경제</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        DSR 계산 방법 2026
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        대출 한도가 궁금할 때 DSR 계산하는 방법을 알려드려요. 2026년 스트레스 DSR 3단계 기준으로 쉽게 계산해보세요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>DSR은 연간 총 부채 원리금 상환액을 연소득으로 나눈</H2>
      <p style={body}>DSR은 연간 총 부채 원리금 상환액을 연소득으로 나눈 비율이에요</p>
      <GreenBox title="핵심 정리">
        DSR은 연간 총 부채 원리금 상환액을 연소득으로 나눈 비율이에요<br />
        2026년 스트레스 DSR 3단계는 스트레스 금리 1.5%, 기본 비율 40%가 적용돼요<br />
        DSR 계산기를 이용하면 내 대출 가능 한도를 미리 확인할 수 있어요
      </GreenBox>

      <CategoryButton label="금융 · 경제 정보" count={5} href="/category/금융" />
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
