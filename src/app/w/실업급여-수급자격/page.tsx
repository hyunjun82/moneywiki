"use client";
// Q1: 실업급여 수급자격 인정 기준: 가입기간 180일 및 비자발적 퇴사 요건 info
// Q2: 고용보험 180일 이상 가입해야 받을 수 있어요.
// Q3: 고용보험 180일 이상 가입해야 받을 수 있어요., 비자발적 퇴사여야 해요. 권고사직, 계약만료 등이 해당돼요., 퇴직 후 적극적으로 구직활동을 해야 해요.
// Q4: GreenBox + Steps + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  { title: "고용보험 180일 이상 가입해야 받을 수 있어요.", desc: "고용보험 180일 이상 가입해야 받을 수 있어요." },
  { title: "비자발적 퇴사여야 해요. 권고사직, 계약만료 등이 해당", desc: "비자발적 퇴사여야 해요. 권고사직, 계약만료 등이 해당돼요." },
  { title: "퇴직 후 적극적으로 구직활동을 해야 해요.", desc: "퇴직 후 적극적으로 구직활동을 해야 해요." },
];
const CHECKLIST = [
  "고용보험 180일 이상 가입해야 받을 수 있어요.",
  "비자발적 퇴사여야 해요. 권고사직, 계약만료 등이 해당돼요.",
  "퇴직 후 적극적으로 구직활동을 해야 해요."
];

const FAQS = [
  { q: "실업급여 자격 조건이 뭐예요?", a: "고용보험 180일 이상 가입, 비자발적 퇴사, 구직 의사 세 가지가 기본 조건이에요." },
  { q: "6개월만 다녀도 실업급여 받아요?", a: "고용보험 가입일수가 180일 이상이면 받을 수 있어요. 대략 6개월 정도예요." },
  { q: "내가 그만두면 못 받아요?", a: "단순 이직 목적이면 안 되지만, 정당한 사유(임금체불, 괴롭힘 등)가 있으면 받을 수 있어요." }
];

const REFERENCES = [
  { category: "출처", items: [
      { label: "고용보험법", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용24", url: "https://www.ei.go.kr" }
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        실업급여 수급자격 인정 기준<br />
        가입기간 180일 및 비자발적 퇴사 요건
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        실업급여 받을 수 있는 자격이 되는지 궁금하시죠. 고용보험 가입기간, 퇴직 사유 등 조건을 자세히 알려드려요
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>고용보험 180일 이상 가입해야 받을 수 있어요.</H2>
      <p style={body}>고용보험 180일 이상 가입해야 받을 수 있어요.</p>
      <GreenBox title="핵심 정리">
        고용보험 180일 이상 가입해야 받을 수 있어요.<br />
        비자발적 퇴사여야 해요. 권고사직, 계약만료 등이 해당돼요.<br />
        퇴직 후 적극적으로 구직활동을 해야 해요.
      </GreenBox>

      <CategoryButton label="실업급여 정보" count={5} href="/category/실업급여" />
      <RelatedArticles items={[]} />
      <Divider />

      <H2>비자발적 퇴사여야 해요. 권고사직, 계약만료 </H2>
      <p style={body}>비자발적 퇴사여야 해요. 권고사직, 계약만료 등이 해당돼요.</p>
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
