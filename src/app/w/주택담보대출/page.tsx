"use client";

// Q1: 주택담보대출 info
// Q2: 주택담보대출은 주택을 담보로 받는 대출입니다. LTV(담보인정비율) 40~70%, DSR(총부채원리금상환비율) 40% 규제가 적용됩니다.
// Q3: 주택담보대출은 주택을 담보로 받는 대출입니다. LTV(담보인정비율) 40~70%, DSR(총부채원리금상환비율) 40% 규제가 적용됩니다.
// Q4: GreenBox + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST = [
  "주택담보대출은 주택을 담보로 받는 대출입니다. LTV(담보인정비율) 40~70%, DSR(총부채원리금상환비율) 40% 규제가 적용됩니다."
];

const FAQS = [
  { q: "LTV란 무엇인가요?", a: "담보인정비율로, 주택 가격 대비 대출 가능 비율입니다. 조정대상지역은 50%, 비규제지역은 70%입니다." },
  { q: "DSR 40%는 무슨 의미인가요?", a: "연 소득의 40%까지만 모든 대출의 연간 원리금 상환액으로 사용할 수 있다는 의미입니다." },
  { q: "주택담보대출 금리는 얼마인가요?", a: "2026년 기준 시중은행 연 3.5~5.5% 수준이며, 고정금리와 변동금리를 선택할 수 있습니다." }
];

const REFERENCES = [
  { category: "출처", items: [
      { label: "은행연합회", url: "https://www.kfb.or.kr" },
      { label: "금융위원회", url: "https://www.fsc.go.kr" }
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 임대차</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        주택담보대출
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        주택담보대출 조건과 한도를 알아봅니다. LTV, DTI, DSR 규제와 금리, 상환 방식을 정리합니다.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>주택담보대출은 주택을 담보로 받는 대출입니다. LTV(</H2>
      <p style={body}>주택담보대출은 주택을 담보로 받는 대출입니다. LTV(담보인정비율) 40~70%, DSR(총부채원리금상환비율) 40% 규제가 적용됩니다.</p>
      <GreenBox title="핵심 정리">
        주택담보대출은 주택을 담보로 받는 대출입니다. LTV(담보인정비율) 40~70%, DSR(총부채원리금상환비율) 40% 규제가 적용됩니다.
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
