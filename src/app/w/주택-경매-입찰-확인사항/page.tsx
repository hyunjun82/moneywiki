"use client";

// Q1: 주택 경매 입찰 확인사항 체크리스트 2026 info
// Q2: 등기부등본, 매각물건명세서, 현장 확인은 필수예요
// Q3: 등기부등본, 매각물건명세서, 현장 확인은 필수예요, 입찰 보증금은 최저가의 10분의 1이며 입찰 전 납부해야 해요, 2026년 2월 1일부터 개정 민사집행법이 시행돼요
// Q4: GreenBox + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST = [
  "등기부등본, 매각물건명세서, 현장 확인은 필수예요",
  "입찰 보증금은 최저가의 10분의 1이며 입찰 전 납부해야 해요",
  "2026년 2월 1일부터 개정 민사집행법이 시행돼요"
];

const FAQS = [
  { q: "경매 입찰할 때 꼭 확인해야 하는 서류는 뭐예요?", a: "등기부등본, 매각물건명세서, 현황조사서 3가지는 필수예요. 등기부로 권리 관계를 확인하고, 명세서로 인수할 권리를 파악해야 해요." },
  { q: "경매 입찰 보증금은 얼마 내야 하나요?", a: "최저매각가격의 10분의 1을 납부해야 해요. 예를 들어 최저가가 2억원이면 2천만원을 입찰 전에 현금이나 보증서로 제출해야 해요." },
  { q: "경매 낙찰받으면 바로 입주할 수 있나요?", a: "아니요. 잔금을 납부하고 소유권이전등기를 한 뒤, 기존 점유자가 있다면 명도 절차를 거쳐야 입주할 수 있어요." }
];

const REFERENCES = [
  { category: "출처", items: [
      { label: "민사집행법", url: "https://www.law.go.kr/법령/민사집행법" },
      { label: "찾기쉬운 생활법령정보 - 부동산 경매", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=306&ccfNo=2&cciNo=2&cnpClsNo=1" }
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 임대차</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        주택 경매 입찰 확인사항 체크리스트 2026
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        주택 경매에 참가하기 전에 반드시 확인해야 할 사항들이 있어요. 권리 분석부터 입찰 보증금까지 꼼꼼히 체크하세요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>등기부등본, 매각물건명세서, 현장 확인은 필수예요</H2>
      <p style={body}>등기부등본, 매각물건명세서, 현장 확인은 필수예요</p>
      <GreenBox title="핵심 정리">
        등기부등본, 매각물건명세서, 현장 확인은 필수예요<br />
        입찰 보증금은 최저가의 10분의 1이며 입찰 전 납부해야 해요<br />
        2026년 2월 1일부터 개정 민사집행법이 시행돼요
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
