"use client";

// Q1. 연말정산에서 특별공제가 뭔지, 어떤 항목이 해당하는지 알고 싶은 상황
// Q2. 특별공제 5가지 항목을 파악하고, 내 공제 가능 금액을 계산해서 신고에 반영한다
// Q3. 보험료·의료비·교육비·주택자금·기부금 공제 기준, 한도, 표준공제와의 비교
// Q4. DocTable(항목별 기준) + GreenBox(표준공제 비교) + BorderBox(주의사항) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  DocTable, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const DEDUCTION_TABLE = {
  headers: ["항목", "공제 유형", "공제율/한도", "비고"],
  rows: [
    ["보험료", "소득공제", "연 100만원 한도", "건강보험·고용보험은 전액 공제"],
    ["의료비", "세액공제 15%", "총급여 3% 초과분", "본인·65세 이상·장애인 무한도"],
    ["교육비", "세액공제 15%", "본인 한도 없음, 자녀 연 300만원", "대학등록금·학원비(미취학)"],
    ["주택자금", "소득공제", "전세 원리금 연 400만원", "무주택 세대주 요건"],
    ["기부금", "세액공제 15~30%", "소득 금액 한도 내", "법정기부금·지정기부금 구분"],
  ],
};

const FAQS = [
  { q: "특별공제와 표준공제 중 뭐가 유리한가요?", a: "특별공제 합계가 표준공제(연 13만원)보다 크면 특별공제가 유리해요. 건강보험료만 내도 13만원을 넘는 경우가 많아서, 대부분 특별공제가 유리해요." },
  { q: "보험료 공제에 건강보험료도 포함되나요?", a: "네. 건강보험료와 고용보험료는 전액 소득공제돼요. 국민연금은 별도로 전액 소득공제 되고요(특별공제가 아닌 연금보험료 공제)." },
  { q: "의료비와 보험료 공제를 동시에 받을 수 있나요?", a: "네. 각각 별개 항목이라 동시에 받을 수 있어요. 실손보험금으로 보전받은 의료비는 공제 대상에서 빠져요." },
  { q: "맞벌이 부부는 누가 공제받는 게 유리한가요?", a: "총급여가 높은 쪽이 교육비·기부금을, 의료비는 총급여가 낮은 쪽이 3% 기준 넘기기 쉬워요. 항목별로 나눠서 받는 게 유리해요." },
  { q: "주택자금 공제는 전세만 되나요?", a: "전세 원리금 상환액(연 400만원), 주택청약저축(연 300만원), 장기주택저당차입금 이자(연 300~1,800만원)가 포함돼요. 무주택 세대주 요건이 있어요." },
  { q: "기부금은 얼마까지 공제되나요?", a: "법정기부금은 소득금액 100%, 지정기부금은 소득금액 30% 한도예요. 1천만원 이하 기부금은 15%, 초과분은 30% 세액공제예요." },
];

const SOURCES = [
  { name: "소득세법 제52조 (특별소득공제)", href: "https://www.law.go.kr/법령/소득세법" },
  { name: "국세청 연말정산 안내", href: "https://www.nts.go.kr" },
];

const RELATED = [
  { slug: "연말정산-교육비-세액공제", title: "연말정산 교육비 세액공제", description: "교육비 공제 대상과 한도." },
  { slug: "연말정산-현금영수증", title: "연말정산 현금영수증 공제", description: "현금영수증 소득공제 기준." },
  { slug: "연말정산-안경구입비-공제", title: "연말정산 안경구입비 공제", description: "안경 의료비 공제 방법." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 연말정산 · 공제</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        연말정산 특별공제, 뭐가 해당되나?<br />
        5가지 항목별 기준과 한도
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>연말정산에서 &ldquo;특별공제&rdquo;라는 게 나오는데, 어떤 항목이 해당하는지 헷갈리죠.</p>
      <p style={body}>특별공제는 보험료·의료비·교육비·주택자금·기부금 5가지예요. <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법</a>에서 정한 기준에 맞으면 소득공제나 세액공제를 받을 수 있어요.</p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>5가지 항목별 공제 기준</H2>
      <p style={body}>각 항목의 공제 유형과 한도가 달라요.</p>
      <SectionBadge>특별공제 항목 정리</SectionBadge>
      <DocTable headers={DEDUCTION_TABLE.headers} rows={DEDUCTION_TABLE.rows} />

      <CategoryButton label="세금 정보" count={15} href="/category/세금" />
      <RelatedArticles items={RELATED} />
      <Divider />

      <H2>표준공제 vs 특별공제, 뭐가 유리할까?</H2>
      <p style={body}>특별공제를 안 받으면 표준공제 13만원이 자동 적용돼요.</p>
      <GreenBox title="표준공제 vs 특별공제">
        표준공제: 연 13만원 (특별공제를 안 받을 때 자동 적용){"\n"}
        특별공제: 보험료+의료비+교육비+주택자금+기부금 합계{"\n"}
        건강보험료만 연 100만원 이상 내는 경우가 많으니, 대부분 특별공제가 유리
      </GreenBox>
      <Divider />

      <H2>맞벌이 부부 공제 배분 전략</H2>
      <p style={body}>부부가 항목별로 나눠 받으면 공제를 더 많이 챙길 수 있어요.</p>
      <BorderBox>
        <strong>항목별 배분 전략</strong><br />
        의료비: 총급여 낮은 쪽 (3% 기준 넘기기 쉬움){"\n"}<br />
        교육비·기부금: 총급여 높은 쪽 (세율 높을수록 절세 효과 큼){"\n"}<br />
        보험료: 명의자가 공제 (변경 불가){"\n"}<br />
        주택자금: 세대주만 공제 가능
      </BorderBox>
      <Divider />

      <H2>자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>특별공제에서 자주 궁금해하는 것들이에요.</p>
      <FAQ items={FAQS} />
      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 소득세법을 바탕으로 작성했어요. 공제 한도와 기준은 세법 개정에 따라 달라질 수 있으니, 국세청(nts.go.kr)에서 확인하세요." />
    </ArticleLayout>
  );
}
