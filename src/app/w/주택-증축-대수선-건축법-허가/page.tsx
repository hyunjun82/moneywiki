"use client";

// Q1: 주택 증축 대수선 건축법 허가 절차 2026 info
// Q2: 증축은 집의 면적, 층수, 높이를 늘리는 공사로 건축 허가를 받아야 해요.
// Q3: 증축은 집의 면적, 층수, 높이를 늘리는 공사로 건축 허가를 받아야 해요., 대수선은 기둥, 벽 같은 주요 구조를 고치는 공사로 규모에 따라 신고가 필요해요., 무단으로 증축이나 대수선하면 이행강제금이나 철거 명령을 받을 수 있어요.
// Q4: GreenBox + Steps + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  { title: "증축은 집의 면적, 층수, 높이를 늘리는 공사로 건축 ", desc: "증축은 집의 면적, 층수, 높이를 늘리는 공사로 건축 허가를 받아야 해요." },
  { title: "대수선은 기둥, 벽 같은 주요 구조를 고치는 공사로 규", desc: "대수선은 기둥, 벽 같은 주요 구조를 고치는 공사로 규모에 따라 신고가 필요해요." },
  { title: "무단으로 증축이나 대수선하면 이행강제금이나 철거 명령을", desc: "무단으로 증축이나 대수선하면 이행강제금이나 철거 명령을 받을 수 있어요." },
];
const CHECKLIST = [
  "증축은 집의 면적, 층수, 높이를 늘리는 공사로 건축 허가를 받아야 해요.",
  "대수선은 기둥, 벽 같은 주요 구조를 고치는 공사로 규모에 따라 신고가 필요해요.",
  "무단으로 증축이나 대수선하면 이행강제금이나 철거 명령을 받을 수 있어요."
];

const FAQS = [
  { q: "증축하려면 무조건 허가 받아야 하나요?", a: "네. 건축면적이나 층수, 높이를 늘리는 증축은 건축 허가를 받아야 해요. 허가 없이 증축하면 불법이에요." },
  { q: "방 하나 늘리는 것도 대수선인가요?", a: "벽을 새로 만들거나 허물면서 30제곱미터 이상 공사하면 대수선이에요. 작은 공사라도 구조를 건드리면 신고가 필요할 수 있어요." },
  { q: "무단 증축하면 어떻게 되나요?", a: "이행강제금을 계속 내거나 철거 명령을 받을 수 있어요. 심하면 건물 사용금지까지 당할 수 있어서 꼭 허가받고 공사하세요." }
];

const REFERENCES = [
  { category: "출처", items: [
      { label: "찾기쉬운 생활법령정보", url: "https://www.easylaw.go.kr/CSP/OnhunqueansInfoRetrieve.laf?onhunqnaAstSeq=84&onhunqueSeq=1560" }
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 임대차</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        주택 증축 대수선 건축법 허가 절차 2026
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        집을 늘리거나 크게 고치려는데 증축이랑 대수선이 뭐가 다른가요? 허가 받아야 하나요? 증축은 면적 늘리는 거, 대수선은 구조 바꾸는 거예요
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>증축은 집의 면적, 층수, 높이를 늘리는 공사로 건축 </H2>
      <p style={body}>증축은 집의 면적, 층수, 높이를 늘리는 공사로 건축 허가를 받아야 해요.</p>
      <GreenBox title="핵심 정리">
        증축은 집의 면적, 층수, 높이를 늘리는 공사로 건축 허가를 받아야 해요.<br />
        대수선은 기둥, 벽 같은 주요 구조를 고치는 공사로 규모에 따라 신고가 필요해요.<br />
        무단으로 증축이나 대수선하면 이행강제금이나 철거 명령을 받을 수 있어요.
      </GreenBox>

      <CategoryButton label="부동산 · 임대차 정보" count={5} href="/category/부동산" />
      <RelatedArticles items={[]} />
      <Divider />

      <H2>대수선은 기둥, 벽 같은 주요 구조를 고치는 </H2>
      <p style={body}>대수선은 기둥, 벽 같은 주요 구조를 고치는 공사로 규모에 따라 신고가 필요해요.</p>
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
