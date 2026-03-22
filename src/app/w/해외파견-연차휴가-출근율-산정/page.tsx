"use client";

// Q1: 해외파견 연차휴가 출근율 산정 info
// Q2: 해외파견기간은 출근한 것으로 인정돼요.
// Q3: 해외파견기간은 출근한 것으로 인정돼요., 국내 소정근로일수 대신 해외근무일수로 계산해요., 파견기간도 계속 근로기간에 포함돼요.
// Q4: GreenBox + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST = [
  "해외파견기간은 출근한 것으로 인정돼요.",
  "국내 소정근로일수 대신 해외근무일수로 계산해요.",
  "파견기간도 계속 근로기간에 포함돼요."
];

const FAQS = [
  { q: "해외파견 중에도 연차휴가가 발생하나요?", a: "네, 해외파견기간은 출근으로 인정되어 연차가 발생해요." },
  { q: "해외파견 기간은 출근율에 어떻게 반영되나요?", a: "해외파견일수가 소정근로일수이자 출근일수로 계산돼요." },
  { q: "파견 복귀 후 연차는 어떻게 되나요?", a: "파견기간 포함 총 근속기간을 기준으로 연차가 계산돼요." }
];

const REFERENCES = [
  { category: "출처", items: [
      { label: "근로기준법 제60조", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "고용노동부 행정해석", url: "https://www.moel.go.kr" }
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연차휴가</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        해외파견 연차휴가 출근율 산정
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        해외 파견근무 중인 근로자의 연차휴가 출근율은 어떻게 계산하나요? 해외파견 연차휴가 산정 방법을 알려드릴게요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>해외파견기간은 출근한 것으로 인정돼요.</H2>
      <p style={body}>해외파견기간은 출근한 것으로 인정돼요.</p>
      <GreenBox title="핵심 정리">
        해외파견기간은 출근한 것으로 인정돼요.<br />
        국내 소정근로일수 대신 해외근무일수로 계산해요.<br />
        파견기간도 계속 근로기간에 포함돼요.
      </GreenBox>

      <CategoryButton label="연차휴가 정보" count={5} href="/category/연차휴가" />
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
