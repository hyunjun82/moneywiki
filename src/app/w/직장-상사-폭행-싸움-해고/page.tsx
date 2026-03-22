"use client";

// Q1: 직장 상사 폭행 싸움 해고 info
// Q2: 상사 먼저 폭행 → 정당방위 인정 가능, 사회통념상 과하지 않으면 해고 무효
// Q3: 상사 먼저 폭행 → 정당방위 인정 가능, 사회통념상 과하지 않으면 해고 무효, 당사자 간 합의했어도 회사가 일방적 해고 시 부당해고, 노동위원회 구제신청 3개월 내, 승소 시 복직+임금보상
// Q4: GreenBox + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST = [
  "상사 먼저 폭행 → 정당방위 인정 가능, 사회통념상 과하지 않으면 해고 무효",
  "당사자 간 합의했어도 회사가 일방적 해고 시 부당해고",
  "노동위원회 구제신청 3개월 내, 승소 시 복직+임금보상"
];

const FAQS = [
  { q: "상사와 화해했는데도 회사에서 해고할 수 있나요?", a: "당사자끼리 합의했다면 해고 사유가 약해져요. 판례상 합의 후 해고는 부당해고로 인정되는 경우가 많아요." },
  { q: "정당방위면 싸움 해고 안 당하나요?", a: "상사가 먼저 폭행하고 방어 차원에서 대응했다면 정당방위로 볼 수 있어요. 과도하지 않으면 해고 사유 안 돼요." },
  { q: "부당해고 구제 신청은 언제까지 해야 하나요?", a: "해고일로부터 3개월 이내에 노동위원회에 신청해야 해요. 기간 지나면 구제받기 어려워요." }
];

const REFERENCES = [
  { category: "출처", items: [
      { label: "근로기준법", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "노동위원회", url: "https://www.nlrc.go.kr" }
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로 · 노동</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        직장 상사 폭행 싸움 해고
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        상사가 먼저 때려서 정당방위로 맞섰는데 해고당했다면요? 정당한 이유 없는 부당해고일 가능성이 높아요. 구제 방법 알려드려요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>상사 먼저 폭행 → 정당방위 인정 가능, 사회통념상 과</H2>
      <p style={body}>상사 먼저 폭행 → 정당방위 인정 가능, 사회통념상 과하지 않으면 해고 무효</p>
      <GreenBox title="핵심 정리">
        상사 먼저 폭행 → 정당방위 인정 가능, 사회통념상 과하지 않으면 해고 무효<br />
        당사자 간 합의했어도 회사가 일방적 해고 시 부당해고<br />
        노동위원회 구제신청 3개월 내, 승소 시 복직+임금보상
      </GreenBox>

      <CategoryButton label="근로 · 노동 정보" count={5} href="/category/근로/노동" />
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
