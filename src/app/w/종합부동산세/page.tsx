"use client";

// Q1: 종합부동산세 계산 방법 및 세율: 주택·토지 과세 기준 info
// Q2: 주택·토지 공시가격 합계가 일정 금액을 초과할 때 부과돼요.
// Q3: 주택·토지 공시가격 합계가 일정 금액을 초과할 때 부과돼요., 1세대 1주택자는 12억원, 다주택자는 6억원이 기준이에요., 매년 12월 1~15일에 납부하고 250만원 초과 시 6개월 분납 가능해요.
// Q4: GreenBox + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST = [
  "주택·토지 공시가격 합계가 일정 금액을 초과할 때 부과돼요.",
  "1세대 1주택자는 12억원, 다주택자는 6억원이 기준이에요.",
  "매년 12월 1~15일에 납부하고 250만원 초과 시 6개월 분납 가능해요."
];

const FAQS = [
  { q: "1세대 1주택자 종부세 기준은?", a: "공시가격 12억원 초과 시 종부세가 부과됩니다. 고령자·장기보유 공제 적용 시 더 줄어듭니다." },
  { q: "종부세는 언제 내나요?", a: "매년 12월 1~15일 사이에 납부합니다. 250만원 초과 시 6개월 분납 가능합니다." },
  { q: "종부세 세율은 얼마인가요?", a: "1세대 1주택은 0.5~2.7%, 다주택은 0.5~5%까지 누진세율이 적용됩니다." }
];

const REFERENCES = [
  { category: "출처", items: [
      { label: "종합부동산세법", url: "https://www.law.go.kr/법령/종합부동산세법" },
      { label: "국세청 종부세 안내", url: "https://www.nts.go.kr" }
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 절세</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        종합부동산세 계산 방법 및 세율<br />
        주택·토지 과세 기준
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        종합부동산세 얼마나 내는지 궁금하시죠. 1세대 1주택은 공시가격 12억원, 다주택은 6억원 초과 시 부과돼요
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>주택·토지 공시가격 합계가 일정 금액을 초과할 때 부과</H2>
      <p style={body}>주택·토지 공시가격 합계가 일정 금액을 초과할 때 부과돼요.</p>
      <GreenBox title="핵심 정리">
        주택·토지 공시가격 합계가 일정 금액을 초과할 때 부과돼요.<br />
        1세대 1주택자는 12억원, 다주택자는 6억원이 기준이에요.<br />
        매년 12월 1~15일에 납부하고 250만원 초과 시 6개월 분납 가능해요.
      </GreenBox>

      <CategoryButton label="세금 · 절세 정보" count={5} href="/category/세금" />
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
