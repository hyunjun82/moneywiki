"use client";
// Q1: 사실혼 배우자 임대차 승계 권리 2026 info
// Q2: 사실혼 배우자는 상속인이 없거나 함께 거주하지 않을 때 승계 가능
// Q3: 사실혼 배우자는 상속인이 없거나 함께 거주하지 않을 때 승계 가능, 승계하면 임차인 권리와 의무를 모두 이어받음, 1개월 이내 반대 의사 표시하면 승계 거부 가능
// Q4: GreenBox + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST = [
  "사실혼 배우자는 상속인이 없거나 함께 거주하지 않을 때 승계 가능",
  "승계하면 임차인 권리와 의무를 모두 이어받음",
  "1개월 이내 반대 의사 표시하면 승계 거부 가능"
];

const FAQS = [
  { q: "혼인신고 안 했는데 사실혼 배우자로 인정받을 수 있나요?", a: "네, 임차주택에서 함께 가정공동생활을 했다는 증거가 있으면 인정받을 수 있어요." },
  { q: "상속인이 있으면 사실혼 배우자는 승계 못 하나요?", a: "상속인이 함께 거주했다면 상속인이 우선이에요. 상속인이 함께 안 살았다면 사실혼 배우자와 2촌 이내 친족이 공동으로 승계해요." },
  { q: "승계를 거부하고 싶으면 어떻게 하나요?", a: "임차인 사망 후 1개월 이내에 임대인에게 반대 의사를 표시하면 돼요." }
];

const REFERENCES = [
  { category: "출처", items: [
      { label: "찾기쉬운 생활법령정보 - 주택임대차", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=629&ccfNo=4&cciNo=3&cnpClsNo=3" },
      { label: "주택임대차보호법", url: "https://www.law.go.kr/법령/주택임대차보호법" }
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 임대차</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        사실혼 배우자 임대차 승계 권리 2026
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        혼인신고 못 한 채 동거하던 남자가 사고로 죽었어요. 저는 이 집에서 바로 나가야 하나요? 사실혼 배우자도 임차권을 승계받을 수 있어요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>사실혼 배우자는 상속인이 없거나 함께 거주하지 않을 때</H2>
      <p style={body}>사실혼 배우자는 상속인이 없거나 함께 거주하지 않을 때 승계 가능</p>
      <GreenBox title="핵심 정리">
        사실혼 배우자는 상속인이 없거나 함께 거주하지 않을 때 승계 가능<br />
        승계하면 임차인 권리와 의무를 모두 이어받음<br />
        1개월 이내 반대 의사 표시하면 승계 거부 가능
      </GreenBox>

      <CategoryButton label="부동산 · 임대차 정보" count={5} href="/category/부동산" />
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
