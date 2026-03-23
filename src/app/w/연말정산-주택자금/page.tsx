"use client";

// Q1: 연말정산 주택자금 info
// Q2: 장기주택저당차입금 이자는 최대 1,800만원까지 소득공제받아요.
// Q3: 장기주택저당차입금 이자는 최대 1,800만원까지 소득공제받아요., 주택 기준시가 6억원 이하, 대출 기간 15년 이상이어야 해요., 전세자금 대출 원리금은 최대 400만원까지 소득공제받아요.
// Q4: GreenBox + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST = [
  "장기주택저당차입금 이자는 최대 1,800만원까지 소득공제받아요.",
  "주택 기준시가 6억원 이하, 대출 기간 15년 이상이어야 해요.",
  "전세자금 대출 원리금은 최대 400만원까지 소득공제받아요."
];

const FAQS = [
  { q: "주택담보대출 이자도 공제받을 수 있나요?", a: "네, 장기주택저당차입금 이자는 최대 1,800만원까지 소득공제받을 수 있어요." },
  { q: "전세자금 대출도 공제되나요?", a: "네, 원리금 상환액의 40%를 최대 400만원까지 소득공제받을 수 있어요." },
  { q: "주택 가격 제한이 있나요?", a: "네, 주택 기준시가 6억원 이하여야 공제받을 수 있어요." }
];

const REFERENCES = [
  { category: "출처", items: [
      { label: "국세청 연말정산 안내", url: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=6591&cntntsId=7870" },
      { label: "조세특례제한법", url: "https://www.law.go.kr/법령/조세특례제한법" }
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 연말정산</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        연말정산 주택자금
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        주택 구입이나 전세자금 대출 이자를 연말정산에서 소득공제받을 수 있어요. 장기주택저당차입금은 최대 1,800만원까지 공제돼요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>장기주택저당차입금 이자는 최대 1,800만원까지 소득공</H2>
      <p style={body}>장기주택저당차입금 이자는 최대 1,800만원까지 소득공제받아요.</p>
      <GreenBox title="핵심 정리">
        장기주택저당차입금 이자는 최대 1,800만원까지 소득공제받아요.<br />
        주택 기준시가 6억원 이하, 대출 기간 15년 이상이어야 해요.<br />
        전세자금 대출 원리금은 최대 400만원까지 소득공제받아요.
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
      <Disclaimer text="이 글은 2025년 귀속 주택자금 공제 정보 반영 정보를 바탕으로 작성됐어요. 최신 정보는 관련 기관에서 직접 확인해보세요." />
    </ArticleLayout>
  );
}
