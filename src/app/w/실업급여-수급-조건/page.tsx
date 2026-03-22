"use client";

// Q1: 실업급여 수급조건 피보험기간 180일 | 비자발적 퇴사 자격요건 info
// Q2: 퇴직 전 18개월 중 고용보험 피보험기간 180일 이상이 첫 번째 조건이에요.
// Q3: 퇴직 전 18개월 중 고용보험 피보험기간 180일 이상이 첫 번째 조건이에요., 비자발적 퇴사(권고사직·계약만료·정리해고)가 원칙이에요., 자발적 퇴사도 임금체불·괴롭힘 등 정당한 사유가 있으면 예외로 인정돼요.
// Q4: GreenBox + Steps + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  { title: "퇴직 전 18개월 중 고용보험 피보험기간 180일 이상", desc: "퇴직 전 18개월 중 고용보험 피보험기간 180일 이상이 첫 번째 조건이에요." },
  { title: "비자발적 퇴사(권고사직·계약만료·정리해고)가 원칙이에요", desc: "비자발적 퇴사(권고사직·계약만료·정리해고)가 원칙이에요." },
  { title: "자발적 퇴사도 임금체불·괴롭힘 등 정당한 사유가 있으면", desc: "자발적 퇴사도 임금체불·괴롭힘 등 정당한 사유가 있으면 예외로 인정돼요." },
];
const CHECKLIST = [
  "퇴직 전 18개월 중 고용보험 피보험기간 180일 이상이 첫 번째 조건이에요.",
  "비자발적 퇴사(권고사직·계약만료·정리해고)가 원칙이에요.",
  "자발적 퇴사도 임금체불·괴롭힘 등 정당한 사유가 있으면 예외로 인정돼요."
];

const FAQS = [
  { q: "실업급여 수급조건에서 피보험기간 180일은 유급휴일도 포함되나요?", a: "네, 주말·공휴일 등 유급휴일도 피보험기간에 포함돼요. 실제 출근일보다 피보험일수가 더 많아요." },
  { q: "실업급여 수급조건을 충족해도 못 받는 경우가 있나요?", a: "중대한 귀책사유(횡령, 폭행 등)로 해고된 경우, 조건을 충족해도 수급자격이 인정되지 않아요." }
];

const REFERENCES = [
  { category: "출처", items: [
      { label: "고용보험법 제40조 - 구직급여의 수급 요건", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용24 - 실업급여 수급자격", url: "https://www.ei.go.kr" }
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        실업급여 수급조건 피보험기간 180일 | 비자발적 퇴사 자격요건
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        실업급여를 받으려면 고용보험 피보험기간 180일이 필요하다는 거 아시나요? 비자발적 퇴사 기준부터 자발적 퇴사 예외 인정 사유까지, 수급조건과 자격요건을 정리했어요. 여러 직장 합산 방법도 알려드려요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>퇴직 전 18개월 중 고용보험 피보험기간 180일 이상</H2>
      <p style={body}>퇴직 전 18개월 중 고용보험 피보험기간 180일 이상이 첫 번째 조건이에요.</p>
      <GreenBox title="핵심 정리">
        퇴직 전 18개월 중 고용보험 피보험기간 180일 이상이 첫 번째 조건이에요.<br />
        비자발적 퇴사(권고사직·계약만료·정리해고)가 원칙이에요.<br />
        자발적 퇴사도 임금체불·괴롭힘 등 정당한 사유가 있으면 예외로 인정돼요.
      </GreenBox>

      <CategoryButton label="실업급여 정보" count={5} href="/category/실업급여" />
      <RelatedArticles items={[]} />
      <Divider />

      <H2>비자발적 퇴사(권고사직·계약만료·정리해고)가 </H2>
      <p style={body}>비자발적 퇴사(권고사직·계약만료·정리해고)가 원칙이에요.</p>
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
      <Disclaimer text="이 글은 2026년 2월 기준 정보를 바탕으로 작성됐어요. 최신 정보는 관련 기관에서 직접 확인해보세요." />
    </ArticleLayout>
  );
}
