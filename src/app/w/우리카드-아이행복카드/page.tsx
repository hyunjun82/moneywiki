"use client";

// Q1: 우리카드 아이행복카드: 발급 및 혜택 상세 안내 info
// Q2: 우리카드 아이행복카드는 현재 신규 발급이 제한되어 있어요
// Q3: 우리카드 아이행복카드는 현재 신규 발급이 제한되어 있어요, 기존 소지자는 병원, 약국, 대중교통 할인 혜택을 계속 쓸 수 있어요, 신규 발급은 다른 카드사의 국민행복카드로 대체됐어요
// Q4: GreenBox + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST = [
  "우리카드 아이행복카드는 현재 신규 발급이 제한되어 있어요",
  "기존 소지자는 병원, 약국, 대중교통 할인 혜택을 계속 쓸 수 있어요",
  "신규 발급은 다른 카드사의 국민행복카드로 대체됐어요"
];

const FAQS = [
  { q: "우리카드 아이행복카드 기존 소지자도 못 쓰나요?", a: "아니요, 기존 카드 소지자는 계속 사용 가능해요. 보육료 결제와 생활 할인 혜택 모두 유지돼요." },
  { q: "우리카드 아이행복카드 대신 뭘 발급받나요?", a: "KB국민카드, 신한카드, 롯데카드, NH농협카드 같은 다른 카드사의 국민행복카드를 발급받으면 돼요." }
];

const REFERENCES = [
  { category: "출처", items: [
      { label: "국민행복카드 공식", url: "http://www.voucher.go.kr/card/childCare.do" },
      { label: "우리카드 공식", url: "https://www.wooricard.com" }
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>복지</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        우리카드 아이행복카드<br />
        발급 및 혜택 상세 안내
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        우리카드 아이행복카드는 병원, 약국, 대중교통 할인까지 폭넓게 지원한다는 거 아시나요? 신규 발급 제한 정보와 대체 카드까지 알려드려요
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>우리카드 아이행복카드는 현재 신규 발급이 제한되어 있어</H2>
      <p style={body}>우리카드 아이행복카드는 현재 신규 발급이 제한되어 있어요</p>
      <GreenBox title="핵심 정리">
        우리카드 아이행복카드는 현재 신규 발급이 제한되어 있어요<br />
        기존 소지자는 병원, 약국, 대중교통 할인 혜택을 계속 쓸 수 있어요<br />
        신규 발급은 다른 카드사의 국민행복카드로 대체됐어요
      </GreenBox>

      <CategoryButton label="복지 정보" count={5} href="/category/복지" />
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
