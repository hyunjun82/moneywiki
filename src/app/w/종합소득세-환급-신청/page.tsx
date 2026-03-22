"use client";

// Q1: 종합소득세 환급 조회 신청 2026 info
// Q2: 종합소득세 환급금은 신고 마지막 날부터 30일 이내 지급돼요
// Q3: 종합소득세 환급금은 신고 마지막 날부터 30일 이내 지급돼요, 5월에 신고하면 보통 6월 말~7월 초에 환급받아요, 손택스나 홈택스에서 원클릭 환급신고로 간편하게 받을 수 있어요
// Q4: GreenBox + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST = [
  "종합소득세 환급금은 신고 마지막 날부터 30일 이내 지급돼요",
  "5월에 신고하면 보통 6월 말~7월 초에 환급받아요",
  "손택스나 홈택스에서 원클릭 환급신고로 간편하게 받을 수 있어요"
];

const FAQS = [
  { q: "종합소득세 환급금 언제 받나요?", a: "5월 31일까지 신고하면 6월 말~7월 초에 받아요. 신고 마지막 날 기준 30일 이내에 입금돼요." },
  { q: "종소세 환급금 조회는 어디서 하나요?", a: "손택스 앱이나 홈택스에서 '종합소득세 원클릭 환급신고'로 확인할 수 있어요. 신고 처리 후 조회 가능해요." },
  { q: "지방소득세 환급은 언제 받나요?", a: "종합소득세 환급 후 1~4주 뒤에 별도로 입금돼요. 보통 7월 말~8월 초에 받아요." }
];

const REFERENCES = [
  { category: "출처", items: [
      { label: "종합소득세 환급일", url: "https://www.banksalad.com/articles/세금환급-종합소득세환급" },
      { label: "토스뱅크 종합소득세 환급", url: "https://www.tossbank.com/articles/2025-comprehensive-income-tax" }
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 절세</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        종합소득세 환급 조회 신청 2026
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        종소세 환급금은 6월 말~7월 초에 받아요. 조회부터 환급 시기까지 알려드릴게요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>종합소득세 환급금은 신고 마지막 날부터 30일 이내 지</H2>
      <p style={body}>종합소득세 환급금은 신고 마지막 날부터 30일 이내 지급돼요</p>
      <GreenBox title="핵심 정리">
        종합소득세 환급금은 신고 마지막 날부터 30일 이내 지급돼요<br />
        5월에 신고하면 보통 6월 말~7월 초에 환급받아요<br />
        손택스나 홈택스에서 원클릭 환급신고로 간편하게 받을 수 있어요
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
      <Disclaimer text="이 글은 2026년 1월 기준 정보를 바탕으로 작성됐어요. 최신 정보는 관련 기관에서 직접 확인해보세요." />
    </ArticleLayout>
  );
}
