"use client";
// Q1: 기업형 직업훈련·훈련비 지원·조건 info
// Q2: 고용보험 가입한 기업이면 직원 교육을 위한 훈련비를 신청할 수 있어요
// Q3: 고용보험 가입한 기업이면 직원 교육을 위한 훈련비를 신청할 수 있어요, 일반 훈련은 훈련비용 기준단가의 100%, 신기술 훈련은 300%까지 지원받을 수 있어요, HRD-NET 시스템을 통해 온라인으로 신청하고, 교육받는 동안 지급받을 수 있어요
// Q4: GreenBox + Steps + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  { title: "고용보험 가입한 기업이면 직원 교육을 위한 훈련비를 신", desc: "고용보험 가입한 기업이면 직원 교육을 위한 훈련비를 신청할 수 있어요" },
  { title: "일반 훈련은 훈련비용 기준단가의 100%, 신기술 훈련", desc: "일반 훈련은 훈련비용 기준단가의 100%, 신기술 훈련은 300%까지 지원받을 수 있어요" },
  { title: "HRD-NET 시스템을 통해 온라인으로 신청하고, 교육", desc: "HRD-NET 시스템을 통해 온라인으로 신청하고, 교육받는 동안 지급받을 수 있어요" },
];
const CHECKLIST = [
  "고용보험 가입한 기업이면 직원 교육을 위한 훈련비를 신청할 수 있어요",
  "일반 훈련은 훈련비용 기준단가의 100%, 신기술 훈련은 300%까지 지원받을 수 있어요",
  "HRD-NET 시스템을 통해 온라인으로 신청하고, 교육받는 동안 지급받을 수 있어요"
];

const FAQS = [
  { q: "우리 회사도 직업훈련 지원금을 받을 수 있나요?", a: "고용보험에 가입한 회사면 가능해요. 다만 예산이 정해져 있어서 먼저 신청하는 회사가 받을 수 있어요." },
  { q: "훈련비 지원을 받으려면 얼마나 복잡한가요?", a: "생각보다 간단해요. HRD-NET에서 훈련계획서만 작성해서 제출하면 돼요. 담당자가 온라인으로 다 도와줄 수 있어요." },
  { q: "신기술 훈련은 무엇을 말하나요?", a: "AI, 빅데이터, 클라우드 같은 차세대 기술 분야를 말해요. 정부가 지정한 29개 분야가 있어요." }
];

const REFERENCES = [
  { category: "출처", items: [
      { label: "고용노동부", url: "https://www.moel.go.kr" },
      { label: "일자리안내 work24", url: "https://www.work24.go.kr" },
      { label: "HRD-NET 훈련관리", url: "https://www.hrdkorea.or.kr" }
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로 · 노동</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        기업형 직업훈련<br />
        훈련비 지원·조건
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        기업이 직원 교육할 때 정부가 훈련비를 지원해 줘요. 신기술 분야는 훈련비의 3배까지 받을 수 있어요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>고용보험 가입한 기업이면 직원 교육을 위한 훈련비를 신</H2>
      <p style={body}>고용보험 가입한 기업이면 직원 교육을 위한 훈련비를 신청할 수 있어요</p>
      <GreenBox title="핵심 정리">
        고용보험 가입한 기업이면 직원 교육을 위한 훈련비를 신청할 수 있어요<br />
        일반 훈련은 훈련비용 기준단가의 100%, 신기술 훈련은 300%까지 지원받을 수 있어요<br />
        HRD-NET 시스템을 통해 온라인으로 신청하고, 교육받는 동안 지급받을 수 있어요
      </GreenBox>

      <CategoryButton label="근로 · 노동 정보" count={5} href="/category/근로/노동" />
      <RelatedArticles items={[]} />
      <Divider />

      <H2>일반 훈련은 훈련비용 기준단가의 100%, 신</H2>
      <p style={body}>일반 훈련은 훈련비용 기준단가의 100%, 신기술 훈련은 300%까지 지원받을 수 있어요</p>
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
