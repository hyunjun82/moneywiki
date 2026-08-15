"use client";
// Q1: 연말정산 라식 라섹 info
// Q2: 라식, 라섹, 스마일라식, ICL삽입술 모두 의료비 세액공제 대상이에요.
// Q3: 라식, 라섹, 스마일라식, ICL삽입술 모두 의료비 세액공제 대상이에요., 본인 수술비는 한도 없이 전액 15% 공제되고 부양가족은 700만원 한도예요., 수술비 영수증은 연말정산 간소화 서비스에 자동 반영돼요.
// Q4: GreenBox + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST = [
  "라식, 라섹, 스마일라식, ICL삽입술 모두 의료비 세액공제 대상이에요.",
  "본인 수술비는 한도 없이 전액 15% 공제되고 부양가족은 700만원 한도예요.",
  "수술비 영수증은 연말정산 간소화 서비스에 자동 반영돼요."
];

const FAQS = [
  { q: "라식 라섹 공제 가능한가요?", a: "네. 시력교정 치료 목적이라 의료비 세액공제 대상이에요." },
  { q: "라식 라섹 공제 한도는?", a: "본인은 한도 없이 전액 공제되고 부양가족은 700만원 한도예요." },
  { q: "스마일라식도 공제되나요?", a: "네. 스마일라식, ICL삽입술 등 모든 시력교정술이 의료비 공제 대상이에요." }
];

const REFERENCES = [
  { category: "출처", items: [
      { label: "국세청 의료비 세액공제 안내", url: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=6591&cntntsId=7869" },
      { label: "소득세법 제59조의4", url: "https://www.law.go.kr/법령/소득세법" }
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 연말정산</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        연말정산 라식 라섹
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        라식, 라섹 수술비는 의료비 세액공제가 돼요. 본인은 한도 없이 전액 15% 공제예요. 수술비 300만원이면 45만원 돌려받아요
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>라식, 라섹, 스마일라식, ICL삽입술 모두 의료비 세</H2>
      <p style={body}>라식, 라섹, 스마일라식, ICL삽입술 모두 의료비 세액공제 대상이에요.</p>
      <GreenBox title="핵심 정리">
        라식, 라섹, 스마일라식, ICL삽입술 모두 의료비 세액공제 대상이에요.<br />
        본인 수술비는 한도 없이 전액 15% 공제되고 부양가족은 700만원 한도예요.<br />
        수술비 영수증은 연말정산 간소화 서비스에 자동 반영돼요.
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
