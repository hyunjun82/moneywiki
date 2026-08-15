"use client";
// Q1: 5세대 실손보험 도수치료: 제외와 본인부담률 info
// Q2: 5세대 실손보험에서 도수치료·체외충격파·주사료는 보장 대상에서 완전히 제외됐어요
// Q3: 5세대 실손보험에서 도수치료·체외충격파·주사료는 보장 대상에서 완전히 제외됐어요, 관리급여로 지정되면 건강보험이 적용되지만 본인부담률 95%로 거의 전액 본인 부담이에요, 4세대는 연간 350만원까지 도수치료 보장했지만 5세대는 아예 보장이 없어요
// Q4: GreenBox + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST = [
  "5세대 실손보험에서 도수치료·체외충격파·주사료는 보장 대상에서 완전히 제외됐어요",
  "관리급여로 지정되면 건강보험이 적용되지만 본인부담률 95%로 거의 전액 본인 부담이에요",
  "4세대는 연간 350만원까지 도수치료 보장했지만 5세대는 아예 보장이 없어요"
];

const FAQS = [
  { q: "5세대 실손보험 도수치료 왜 제외됐나요?", a: "도수치료 과잉 청구로 보험사 손해율이 85% 이상 올라가서 보험료 인하를 위해 비중증 항목을 보장에서 제외한 거예요." },
  { q: "5세대 실손 관리급여 되면 얼마나 부담하나요?", a: "도수치료가 관리급여로 지정되면 본인부담률 95%예요. 치료비가 10만원이면 9만 5천원은 본인이 내고 5천원만 건강보험에서 나와요." }
];

const REFERENCES = [
  { category: "출처", items: [
      { label: "경향신문", url: "https://www.khan.co.kr/article/202504020600091" },
      { label: "농민신문", url: "https://www.nongmin.com/article/20250320500233" },
      { label: "의협신문", url: "https://www.doctorsnews.co.kr/news/articleView.html?idxno=162568" }
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>보험</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        5세대 실손보험 도수치료<br />
        제외와 본인부담률
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        5세대 실손보험에서 도수치료가 완전 제외됐다는 거 아시나요? 관리급여로 지정되면 본인부담률 95%로 거의 전액 본인이 부담해야 해요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>5세대 실손보험에서 도수치료·체외충격파·주사료는 보장 </H2>
      <p style={body}>5세대 실손보험에서 도수치료·체외충격파·주사료는 보장 대상에서 완전히 제외됐어요</p>
      <GreenBox title="핵심 정리">
        5세대 실손보험에서 도수치료·체외충격파·주사료는 보장 대상에서 완전히 제외됐어요<br />
        관리급여로 지정되면 건강보험이 적용되지만 본인부담률 95%로 거의 전액 본인 부담이에요<br />
        4세대는 연간 350만원까지 도수치료 보장했지만 5세대는 아예 보장이 없어요
      </GreenBox>

      <CategoryButton label="보험 정보" count={5} href="/category/보험" />
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
      <Disclaimer text="이 글은 2026년 2월 기준 정보를 바탕으로 작성됐어요. 최신 정보는 관련 기관에서 직접 확인해보세요." />
    </ArticleLayout>
  );
}
