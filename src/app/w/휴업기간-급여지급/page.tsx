"use client";

// Q1: 휴업기간 급여지급 기준 방법 info
// Q2: 회사 귀책사유 휴업 시 평균임금의 70% 이상을 받아요.
// Q3: 회사 귀책사유 휴업 시 평균임금의 70% 이상을 받아요., 불가항력 휴업은 휴업수당 지급 의무가 없어요., 휴업기간에도 4대보험은 유지돼요.
// Q4: GreenBox + Steps + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  { title: "회사 귀책사유 휴업 시 평균임금의 70% 이상을 받아요", desc: "회사 귀책사유 휴업 시 평균임금의 70% 이상을 받아요." },
  { title: "불가항력 휴업은 휴업수당 지급 의무가 없어요.", desc: "불가항력 휴업은 휴업수당 지급 의무가 없어요." },
  { title: "휴업기간에도 4대보험은 유지돼요.", desc: "휴업기간에도 4대보험은 유지돼요." },
];
const CHECKLIST = [
  "회사 귀책사유 휴업 시 평균임금의 70% 이상을 받아요.",
  "불가항력 휴업은 휴업수당 지급 의무가 없어요.",
  "휴업기간에도 4대보험은 유지돼요."
];

const FAQS = [
  { q: "회사가 일이 없어서 쉬라고 하면 급여를 받을 수 있나요?", a: "네, 회사 사정이면 평균임금의 70% 이상을 휴업수당으로 받아요." },
  { q: "휴업수당은 통상임금인가요 평균임금인가요?", a: "휴업수당은 평균임금의 70% 이상이에요." },
  { q: "휴업기간에 4대보험료는 어떻게 되나요?", a: "휴업기간에도 4대보험은 유지되고 보험료도 납부해요." }
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
        휴업기간 급여지급 기준 방법
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        회사 사정으로 휴업하면 급여는 어떻게 받나요? 휴업기간 중 급여 지급 기준을 알려드릴게요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>회사 귀책사유 휴업 시 평균임금의 70% 이상을 받아요</H2>
      <p style={body}>회사 귀책사유 휴업 시 평균임금의 70% 이상을 받아요.</p>
      <GreenBox title="핵심 정리">
        회사 귀책사유 휴업 시 평균임금의 70% 이상을 받아요.<br />
        불가항력 휴업은 휴업수당 지급 의무가 없어요.<br />
        휴업기간에도 4대보험은 유지돼요.
      </GreenBox>

      <CategoryButton label="휴업 정보" count={5} href="/category/휴업" />
      <RelatedArticles items={[]} />
      <Divider />

      <H2>불가항력 휴업은 휴업수당 지급 의무가 없어요.</H2>
      <p style={body}>불가항력 휴업은 휴업수당 지급 의무가 없어요.</p>
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
