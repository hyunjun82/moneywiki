"use client";
// Q1: 근로자의 날 유급처리 방법 info
// Q2: 근로자의 날은 유급휴일로 쉬어도 급여가 나와요.
// Q3: 근로자의 날은 유급휴일로 쉬어도 급여가 나와요., 근무하면 휴일근로수당(150%)을 추가로 받아요., 월급제는 급여에 포함, 시급제는 별도 지급이에요.
// Q4: GreenBox + Steps + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  { title: "근로자의 날은 유급휴일로 쉬어도 급여가 나와요.", desc: "근로자의 날은 유급휴일로 쉬어도 급여가 나와요." },
  { title: "근무하면 휴일근로수당(150%)을 추가로 받아요.", desc: "근무하면 휴일근로수당(150%)을 추가로 받아요." },
  { title: "월급제는 급여에 포함, 시급제는 별도 지급이에요.", desc: "월급제는 급여에 포함, 시급제는 별도 지급이에요." },
];
const CHECKLIST = [
  "근로자의 날은 유급휴일로 쉬어도 급여가 나와요.",
  "근무하면 휴일근로수당(150%)을 추가로 받아요.",
  "월급제는 급여에 포함, 시급제는 별도 지급이에요."
];

const FAQS = [
  { q: "근로자의 날 쉬면 급여가 깎이나요?", a: "아니요, 유급휴일이라 쉬어도 급여가 정상 지급돼요." },
  { q: "근로자의 날 근무하면 수당이 얼마나 나오나요?", a: "기본급 100% + 휴일가산 50% = 150%를 받아요." },
  { q: "시급제 알바도 근로자의 날 유급인가요?", a: "네, 근로자의 날이 근무일이면 유급휴일로 시급을 받아요." }
];

const REFERENCES = [
  { category: "출처", items: [
      { label: "근로자의 날 제정에 관한 법률", url: "https://www.law.go.kr/법령/근로자의날제정에관한법률" },
      { label: "근로기준법 제56조", url: "https://www.law.go.kr/법령/근로기준법" }
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>휴일</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        근로자의 날 유급처리 방법
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        근로자의 날 급여는 어떻게 계산하나요? 유급휴일 처리와 근무 시 수당 계산을 알려드릴게요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>근로자의 날은 유급휴일로 쉬어도 급여가 나와요.</H2>
      <p style={body}>근로자의 날은 유급휴일로 쉬어도 급여가 나와요.</p>
      <GreenBox title="핵심 정리">
        근로자의 날은 유급휴일로 쉬어도 급여가 나와요.<br />
        근무하면 휴일근로수당(150%)을 추가로 받아요.<br />
        월급제는 급여에 포함, 시급제는 별도 지급이에요.
      </GreenBox>

      <CategoryButton label="휴일 정보" count={5} href="/category/휴일" />
      <RelatedArticles items={[]} />
      <Divider />

      <H2>근무하면 휴일근로수당(150%)을 추가로 받아</H2>
      <p style={body}>근무하면 휴일근로수당(150%)을 추가로 받아요.</p>
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
