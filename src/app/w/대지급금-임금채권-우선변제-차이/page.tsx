"use client";
// Q1: 대지급금과 우선변제 차이 | 임금채권 대위권 변제 순위 구조 info
// Q2: 대지급금은 국가가 먼저 지급 후 회사에 구상권(대위권)을 행사하는 제도예요.
// Q3: 대지급금은 국가가 먼저 지급 후 회사에 구상권(대위권)을 행사하는 제도예요., 임금채권 우선변제권은 도산 시 다른 채권보다 먼저 변제받는 법적 권리예요., 최우선변제 임금채권은 담보권보다도 앞서요. 최근 3개월 임금과 3년 퇴직금이 대상이에요.
// Q4: GreenBox + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST = [
  "대지급금은 국가가 먼저 지급 후 회사에 구상권(대위권)을 행사하는 제도예요.",
  "임금채권 우선변제권은 도산 시 다른 채권보다 먼저 변제받는 법적 권리예요.",
  "최우선변제 임금채권은 담보권보다도 앞서요. 최근 3개월 임금과 3년 퇴직금이 대상이에요."
];

const FAQS = [
  { q: "대지급금 받으면 임금채권 우선변제권이 사라지나요?", a: "사라지지 않아요. 대지급금 한도를 초과하는 금액에 대해서는 여전히 우선변제권을 직접 행사할 수 있어요. 다만 대지급금 지급된 금액에 대해서는 국가가 대위권을 행사하기 때문에 같은 채권에 대해 이중으로 받을 수는 없어요." },
  { q: "임금채권 변제 순위에서 담보권이 먼저인 경우가 있나요?", a: "최우선변제 임금채권은 담보권보다도 앞서요. 그러나 그 외의 일반 임금채권은 담보권 설정 시기와 비교해서 변제 순위가 결정돼요. 담보권 설정 후 발생한 임금이라도 최우선변제 요건을 충족하면 담보권자보다 먼저 받을 수 있어요." }
];

const REFERENCES = [
  { category: "출처", items: [
      { label: "근로기준법 제38조 - 임금채권의 우선변제", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "임금채권보장법 - 대위권 조항", url: "https://www.law.go.kr/법령/임금채권보장법" }
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        대지급금과 우선변제 차이 | 임금채권 대위권 변제 순위 구조
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        회사 도산 시 대지급금과 임금채권 우선변제권을 동시에 활용할 수 있다는 거 아시나요? 대위권이 어떻게 작동하는지 변제 순위까지 알려드려요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>대지급금은 국가가 먼저 지급 후 회사에 구상권(대위권)</H2>
      <p style={body}>대지급금은 국가가 먼저 지급 후 회사에 구상권(대위권)을 행사하는 제도예요.</p>
      <GreenBox title="핵심 정리">
        대지급금은 국가가 먼저 지급 후 회사에 구상권(대위권)을 행사하는 제도예요.<br />
        임금채권 우선변제권은 도산 시 다른 채권보다 먼저 변제받는 법적 권리예요.<br />
        최우선변제 임금채권은 담보권보다도 앞서요. 최근 3개월 임금과 3년 퇴직금이 대상이에요.
      </GreenBox>

      <CategoryButton label="실업급여 정보" count={5} href="/category/실업급여" />
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
      <Disclaimer text="이 글은 2026년 2월 기준 정보를 바탕으로 작성됐어요. 최신 정보는 관련 기관에서 직접 확인해보세요." />
    </ArticleLayout>
  );
}
