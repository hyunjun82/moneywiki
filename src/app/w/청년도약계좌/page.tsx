"use client";

// Q1: 청년도약계좌 info
// Q2: 청년도약계좌는 청년이 5년간 납입하면 정부가 기여금을 지원하는 상품입니다. 만기 시 약 5,000만원을 모을 수 있습니다.
// Q3: 청년도약계좌는 청년이 5년간 납입하면 정부가 기여금을 지원하는 상품입니다. 만기 시 약 5,000만원을 모을 수 있습니다.
// Q4: GreenBox + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST = [
  "청년도약계좌는 청년이 5년간 납입하면 정부가 기여금을 지원하는 상품입니다. 만기 시 약 5,000만원을 모을 수 있습니다."
];

const FAQS = [
  { q: "청년도약계좌 가입 조건은?", a: "만 19~34세, 총급여 7,500만원 이하(종합소득 6,300만원 이하)인 청년이 가입할 수 있습니다." },
  { q: "정부 기여금은 얼마인가요?", a: "소득에 따라 월 최대 2.4만원을 지원받습니다. 5년간 최대 144만원입니다." },
  { q: "중도해지하면 어떻게 되나요?", a: "정부 기여금과 비과세 혜택이 사라집니다. 원금과 이자만 받습니다." }
];

const REFERENCES = [
  { category: "출처", items: [
      { label: "금융위원회", url: "https://www.fsc.go.kr" },
      { label: "서민금융진흥원", url: "https://www.kinfa.or.kr" }
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>경제</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        청년도약계좌
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        청년도약계좌 가입 조건과 혜택을 알아봅니다. 정부 기여금, 비과세 혜택, 신청 방법을 정리합니다.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>청년도약계좌는 청년이 5년간 납입하면 정부가 기여금을 </H2>
      <p style={body}>청년도약계좌는 청년이 5년간 납입하면 정부가 기여금을 지원하는 상품입니다. 만기 시 약 5,000만원을 모을 수 있습니다.</p>
      <GreenBox title="핵심 정리">
        청년도약계좌는 청년이 5년간 납입하면 정부가 기여금을 지원하는 상품입니다. 만기 시 약 5,000만원을 모을 수 있습니다.
      </GreenBox>

      <CategoryButton label="경제 정보" count={5} href="/category/경제" />
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
