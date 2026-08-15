"use client";
// Q1. 약국에서 산 약값이 연말정산 공제 대상인지 궁금한 상황
// Q2. 어떤 약국비가 공제되는지 확인하고, 빠짐없이 의료비 공제를 챙긴다
// Q3. 의료비 세액공제 대상 약국비, 건강기능식품·영양제 제외, 공제율·한도, 간소화 자료 확인법
// Q4. GreenBox(공제 기준) + DocTable(대상·비대상 비교) + BorderBox(주의사항) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  DocTable, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const COMPARE_TABLE = {
  headers: ["구분", "공제 대상", "공제 불가"],
  rows: [
    ["처방전 의약품", "O (약국 조제약)", "-"],
    ["일반 의약품", "O (감기약·소화제 등)", "-"],
    ["한약", "O (의사·한의사 처방)", "X (건강 보양 목적)"],
    ["건강기능식품", "-", "X (비타민·오메가3 등)"],
    ["영양제", "-", "X (드링크·보조식품)"],
    ["의료기기", "O (혈압계·혈당계 등)", "-"],
    ["마스크·손소독제", "-", "X (의약외품)"],
  ],
};

const FAQS = [
  { q: "약국에서 산 감기약도 공제되나요?", a: "네. 약사가 판매하는 일반 의약품(감기약, 소화제, 진통제 등)은 의료비 세액공제 대상이에요. 단, 약국이 아닌 편의점에서 산 의약외품은 안 돼요." },
  { q: "건강기능식품은 왜 안 되나요?", a: "소득세법에서 의료비 공제 대상을 '의약품'으로 한정하고 있어요. 건강기능식품(비타민, 오메가3, 유산균 등)은 의약품이 아니라 식품이라 제외돼요." },
  { q: "약국비가 간소화 자료에 안 뜨면 어떻게 하나요?", a: "일부 약국은 간소화 자료에 누락될 수 있어요. 약국 영수증을 직접 모아서 회사에 제출하면 공제받을 수 있어요." },
  { q: "약국비 공제에 한도가 있나요?", a: "의료비 세액공제는 총급여의 3% 초과분에 대해 15% 세액공제예요. 난임시술비·미숙아는 20~30%로 높아요. 본인·65세 이상·장애인 의료비는 한도가 없고, 그 외 가족은 연 700만원 한도예요." },
  { q: "신용카드로 결제한 약국비는 이중 공제되나요?", a: "의료비 세액공제와 신용카드 소득공제를 동시에 받을 수 있어요. 이중 공제가 허용되는 항목이에요." },
  { q: "가족이 쓴 약국비도 내가 공제받을 수 있나요?", a: "기본공제 대상자(배우자, 직계존비속 등)의 의료비라면 공제 가능해요. 소득 요건(100만원 이하)은 의료비에는 적용 안 돼요." },
];

const SOURCES = [
  { name: "소득세법 제59조의4 (의료비 세액공제)", href: "https://www.law.go.kr/법령/소득세법" },
  { name: "국세청 연말정산 의료비 안내", href: "https://www.nts.go.kr" },
];

const RELATED = [
  { slug: "연말정산-안경구입비-공제", title: "연말정산 안경구입비 공제", description: "안경·콘택트렌즈도 의료비 공제 가능." },
  { slug: "연말정산-교육비-세액공제", title: "연말정산 교육비 세액공제", description: "교육비 공제 대상과 한도." },
  { slug: "연말정산-현금영수증-공제", title: "연말정산 현금영수증 공제", description: "현금영수증 소득공제 기준." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 연말정산 · 의료비</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        약국에서 산 약값, 연말정산에 공제되나?<br />
        약국비 공제 대상과 한도
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        약국에서 약을 사면서 &ldquo;이것도 연말정산에 들어가나?&rdquo; 궁금했던 적 있죠.
      </p>
      <p style={body}>
        처방전 의약품과 일반 의약품은 <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법</a>상 의료비 세액공제 대상이에요. 하지만 비타민, 건강기능식품, 영양제는 안 돼요. 어디까지 되는지 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>약국비 공제 대상 vs 불가 항목</H2>
      <p style={body}>
        같은 약국에서 샀더라도 의약품이냐 식품이냐에 따라 공제 여부가 갈려요.
      </p>

      <SectionBadge>약국비 공제 대상 비교</SectionBadge>
      <DocTable headers={COMPARE_TABLE.headers} rows={COMPARE_TABLE.rows} />

      <p style={body}>
        핵심은 &ldquo;의약품&rdquo;이냐 &ldquo;식품&rdquo;이냐예요. 약사가 의약품으로 판매하는 건 공제되고, 건강기능식품이나 의약외품은 안 돼요.
      </p>

      <CategoryButton label="세금 정보" count={15} href="/category/세금" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>공제율과 한도는 어떻게 되나요?</H2>
      <p style={body}>
        약국비는 의료비 세액공제에 포함돼요.
      </p>

      <GreenBox title="의료비 세액공제 기준">
        공제 시작점: 총급여의 3% 초과분부터{"\n"}
        공제율: 15% (난임시술비 30%, 미숙아·선천이상 20%){"\n"}
        한도: 본인·65세 이상·장애인은 무한도 / 그 외 가족 연 700만원{"\n"}
        신용카드 소득공제와 이중 공제 가능
      </GreenBox>

      <p style={body}>
        총급여 5,000만원이면 3%인 150만원을 넘는 의료비부터 공제가 시작돼요. 약국비도 이 의료비에 합산되니 모아두면 도움이 돼요.
      </p>

      <Divider />

      <H2>간소화 자료에 빠진 약국비 챙기는 법</H2>
      <p style={body}>
        홈택스 간소화 서비스에 약국비가 안 뜨는 경우가 가끔 있어요.
      </p>

      <BorderBox>
        <strong>누락 약국비 처리 방법</strong><br />
        1. 약국 영수증을 별도로 보관{"\n"}<br />
        2. 1월 중 홈택스에서 &lsquo;누락 자료 조회&rsquo; 확인{"\n"}<br />
        3. 그래도 안 뜨면 영수증을 회사에 직접 제출{"\n"}<br />
        4. 약국에 현금영수증 발급을 요청하면 자동 반영돼요
      </BorderBox>

      <Divider />

      <H2>자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>약국비 연말정산에서 자주 궁금해하는 것들이에요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 소득세법을 바탕으로 작성했어요. 의료비 공제 대상과 한도는 세법 개정에 따라 달라질 수 있으니, 국세청(nts.go.kr)에서 확인하세요." />
    </ArticleLayout>
  );
}
