"use client";

// Q1: 휴대폰 소액결제 한도 변경 2026 info
// Q2: SK·KT·LG 통신3사 최대 소액결제 한도 월 100만원
// Q3: SK·KT·LG 통신3사 최대 소액결제 한도 월 100만원, 한도 변경은 월 1회만 가능, 감액·차단만 되고 증액은 고객센터 문의, 통신요금 미납·연체 시 자동으로 한도 제한될 수 있음
// Q4: GreenBox + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST = [
  "SK·KT·LG 통신3사 최대 소액결제 한도 월 100만원",
  "한도 변경은 월 1회만 가능, 감액·차단만 되고 증액은 고객센터 문의",
  "통신요금 미납·연체 시 자동으로 한도 제한될 수 있음"
];

const FAQS = [
  { q: "휴대폰 소액결제 한도는 최대 얼마인가요?", a: "SK텔레콤, KT, LG유플러스 모두 최대 100만원이에요. 다만 통신요금 미납이나 연체 이력 있으면 자동으로 제한될 수 있어요." },
  { q: "소액결제 한도 변경은 어떻게 하나요?", a: "통신사 홈페이지, 모바일 앱, 고객센터(100번)에서 변경 가능해요. 감액과 차단은 바로 되는데, 증액은 고객센터 통화 필요해요." },
  { q: "소액결제 한도 변경은 몇 번 할 수 있나요?", a: "월 1회만 가능해요. 한 달에 한 번 변경하면 다음 달까지 기다려야 해요. 신중하게 결정하세요." }
];

const REFERENCES = [
  { category: "출처", items: [
      { label: "KT 소액결제 안내", url: "https://www.kt.com" },
      { label: "SKT 티월드 소액결제", url: "https://m.tworld.co.kr" }
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 경제</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        휴대폰 소액결제 한도 변경 2026
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        휴대폰 소액결제 한도는 최대 100만원인데요. 통신사별 한도 변경 방법 알려드려요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>SK·KT·LG 통신3사 최대 소액결제 한도 월 100</H2>
      <p style={body}>SK·KT·LG 통신3사 최대 소액결제 한도 월 100만원</p>
      <GreenBox title="핵심 정리">
        SK·KT·LG 통신3사 최대 소액결제 한도 월 100만원<br />
        한도 변경은 월 1회만 가능, 감액·차단만 되고 증액은 고객센터 문의<br />
        통신요금 미납·연체 시 자동으로 한도 제한될 수 있음
      </GreenBox>

      <CategoryButton label="금융 · 경제 정보" count={5} href="/category/금융" />
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
