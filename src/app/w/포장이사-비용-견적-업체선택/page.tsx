"use client";

// Q1: 포장이사 비용 견적 및 업체 선택 방법 info
// Q2: 포장이사 비용은 20평 기준 80~150만원, 짐 양과 거리에 따라 달라져요
// Q3: 포장이사 비용은 20평 기준 80~150만원, 짐 양과 거리에 따라 달라져요, 견적은 최소 3곳 이상 받고, 방문견적이 가장 정확해요, 계약서 작성 필수, 파손 보상 조건과 추가비용 항목 꼭 확인하세요
// Q4: GreenBox + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST = [
  "포장이사 비용은 20평 기준 80~150만원, 짐 양과 거리에 따라 달라져요",
  "견적은 최소 3곳 이상 받고, 방문견적이 가장 정확해요",
  "계약서 작성 필수, 파손 보상 조건과 추가비용 항목 꼭 확인하세요"
];

const FAQS = [
  { q: "포장이사 비용 얼마나 드나요?", a: "20평 아파트 기준 80~150만원 정도예요. 짐 양, 이동 거리, 층수, 엘리베이터 유무에 따라 달라져요." },
  { q: "포장이사 견적 어디서 받나요?", a: "이사모아, 짐싸닷컴 같은 비교 사이트에서 한 번에 여러 업체 견적 받을 수 있어요. 방문견적이 가장 정확해요." },
  { q: "이사업체 선택할 때 뭘 봐야 하나요?", a: "허가 여부, 보험 가입 여부, 파손 보상 조건, 후기 평점을 확인하세요. 가격만 보고 선택하면 후회해요." }
];

const REFERENCES = [
  { category: "출처", items: [
      { label: "한국소비자원", url: "https://www.kca.go.kr" },
      { label: "공정거래위원회", url: "https://www.ftc.go.kr" }
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 임대차</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        포장이사 비용 견적 및 업체 선택 방법
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        포장이사 비용 얼마나 드는지, 견적 비교하는 방법 알려드려요. 업체 선택 시 주의할 점도 정리했어요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>포장이사 비용은 20평 기준 80~150만원, 짐 양과</H2>
      <p style={body}>포장이사 비용은 20평 기준 80~150만원, 짐 양과 거리에 따라 달라져요</p>
      <GreenBox title="핵심 정리">
        포장이사 비용은 20평 기준 80~150만원, 짐 양과 거리에 따라 달라져요<br />
        견적은 최소 3곳 이상 받고, 방문견적이 가장 정확해요<br />
        계약서 작성 필수, 파손 보상 조건과 추가비용 항목 꼭 확인하세요
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
