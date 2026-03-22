"use client";

// Q1: 정전 휴업 급여 지급 휴업수당 info
// Q2: 회사 과실로 정전됐다면 휴업수당(평균임금 70%)을 받아요.
// Q3: 회사 과실로 정전됐다면 휴업수당(평균임금 70%)을 받아요., 불가항력 정전이면 휴업수당 지급 의무가 없어요., 정전 원인에 따라 급여 지급 여부가 달라져요.
// Q4: GreenBox + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST = [
  "회사 과실로 정전됐다면 휴업수당(평균임금 70%)을 받아요.",
  "불가항력 정전이면 휴업수당 지급 의무가 없어요.",
  "정전 원인에 따라 급여 지급 여부가 달라져요."
];

const FAQS = [
  { q: "정전으로 일 못했는데 급여 안 준다면?", a: "정전 원인에 따라 달라요. 회사 과실이면 휴업수당을 받을 수 있어요." },
  { q: "태풍으로 정전된 건 불가항력인가요?", a: "네, 천재지변으로 인한 정전은 불가항력으로 볼 수 있어요." },
  { q: "전기요금 미납으로 단전되면?", a: "회사 귀책사유예요. 휴업수당을 지급해야 해요." }
];

const REFERENCES = [
  { category: "출처", items: [
      { label: "근로기준법 제46조", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "고용노동부 행정해석", url: "https://www.moel.go.kr" }
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>휴업</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        정전 휴업 급여 지급 휴업수당
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        정전으로 근무를 못하면 급여를 받을 수 있나요? 정전 휴업 시 급여 지급 기준과 휴업수당을 알려드릴게요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>회사 과실로 정전됐다면 휴업수당(평균임금 70%)을 받</H2>
      <p style={body}>회사 과실로 정전됐다면 휴업수당(평균임금 70%)을 받아요.</p>
      <GreenBox title="핵심 정리">
        회사 과실로 정전됐다면 휴업수당(평균임금 70%)을 받아요.<br />
        불가항력 정전이면 휴업수당 지급 의무가 없어요.<br />
        정전 원인에 따라 급여 지급 여부가 달라져요.
      </GreenBox>

      <CategoryButton label="휴업 정보" count={5} href="/category/휴업" />
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
