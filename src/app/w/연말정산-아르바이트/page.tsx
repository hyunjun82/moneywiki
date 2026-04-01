"use client";
import { Divider } from "@/components/article-ui/Divider";

// Q1: 연말정산 아르바이트 info
// Q2: 3개월 이상 근무한 아르바이트는 상용직으로 분류되어 연말정산 대상이에요.
// Q3: 3개월 이상 근무한 아르바이트는 상용직으로 분류되어 연말정산 대상이에요., 소득이 적고 세금을 납부했다면 환급받을 가능성이 높아요., 연간 소득금액 100만원 이하면 부모님 부양가족으로 등록될 수 있어요.
// Q4: GreenBox + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST = [
  "3개월 이상 근무한 아르바이트는 상용직으로 분류되어 연말정산 대상이에요.",
  "소득이 적고 세금을 납부했다면 환급받을 가능성이 높아요.",
  "연간 소득금액 100만원 이하면 부모님 부양가족으로 등록될 수 있어요."
];

const FAQS = [
  { q: "알바도 연말정산 하나요?", a: "3개월 이상 근무한 알바는 상용직으로 분류되어 연말정산 대상이에요." },
  { q: "알바생도 환급받을 수 있나요?", a: "네, 기납부세액이 있으면 환급 가능해요. 소득이 적을수록 환급 가능성이 높아요." },
  { q: "알바 소득이 있으면 부모님 공제에서 빠지나요?", a: "연간 소득금액 100만원(근로소득만 있으면 총급여 500만원) 이하면 부모님 부양가족으로 등록될 수 있어요." }
];

const REFERENCES = [
  { category: "출처", items: [
      { label: "국세청 연말정산 안내", url: "https://www.nts.go.kr" },
      { label: "소득세법 제137조", url: "https://www.law.go.kr/법령/소득세법" }
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 연말정산</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        연말정산 아르바이트
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        아르바이트도 3개월 이상 근무하면 연말정산 대상이에요. 기납부세액이 있으면 환급받을 수 있어요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>3개월 이상 근무한 아르바이트는 상용직으로 분류되어 연</H2>
      <p style={body}>3개월 이상 근무한 아르바이트는 상용직으로 분류되어 연말정산 대상이에요.</p>
      <GreenBox title="핵심 정리">
        3개월 이상 근무한 아르바이트는 상용직으로 분류되어 연말정산 대상이에요.<br />
        소득이 적고 세금을 납부했다면 환급받을 가능성이 높아요.<br />
        연간 소득금액 100만원 이하면 부모님 부양가족으로 등록될 수 있어요.
      </GreenBox>

      <CategoryButton label="세금 · 연말정산 정보" count={5} href="/category/연말정산" />
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
      <Disclaimer text="이 글은 2025년 귀속 연말정산 기준 정보를 바탕으로 작성됐어요. 최신 정보는 관련 기관에서 직접 확인해보세요." />
    </ArticleLayout>
  );
}
