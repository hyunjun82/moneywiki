"use client";

// Q1: 종신보험 상속세 면제 조건: 계약자 수익자 구조 info
// Q2: 계약자를 자녀로 하면 상속세 면제돼요
// Q3: 계약자를 자녀로 하면 상속세 면제돼요, 피상속인이 계약자면 상속재산에 포함되어 과세돼요, 자녀가 소득 능력 입증해야 증여세 없어요
// Q4: GreenBox + Steps + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  { title: "계약자를 자녀로 하면 상속세 면제돼요", desc: "계약자를 자녀로 하면 상속세 면제돼요" },
  { title: "피상속인이 계약자면 상속재산에 포함되어 과세돼요", desc: "피상속인이 계약자면 상속재산에 포함되어 과세돼요" },
  { title: "자녀가 소득 능력 입증해야 증여세 없어요", desc: "자녀가 소득 능력 입증해야 증여세 없어요" },
];
const CHECKLIST = [
  "계약자를 자녀로 하면 상속세 면제돼요",
  "피상속인이 계약자면 상속재산에 포함되어 과세돼요",
  "자녀가 소득 능력 입증해야 증여세 없어요"
];

const FAQS = [
  { q: "종신보험 가입하면 상속세 면제되나요?", a: "계약자와 수익자가 누구냐에 따라 달라져요. 자녀가 계약자이고 본인도 수익자면 상속세 안 나와요. 하지만 부모가 계약자면 상속재산에 포함돼서 세금 나와요." },
  { q: "종신보험 비과세 조건은 뭔가요?", a: "자녀=계약자·수익자, 부모=피보험자 구조로 하고, 자녀가 보험료 낼 소득이 있어야 해요. 소득 증빙 못 하면 증여세 나올 수 있어요." }
];

const REFERENCES = [
  { category: "출처", items: [
      { label: "상속세 및 증여세법", url: "https://www.law.go.kr/법령/상속세및증여세법" },
      { label: "국세청 상속세 계산", url: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2326&cntntsId=7720" }
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 절세</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        종신보험 상속세 면제 조건<br />
        계약자 수익자 구조
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        종신보험 가입하면 상속세를 안 낼 수 있다는 말 들어보셨나요? 계약자와 수익자를 누구로 하느냐에 따라 세금이 달라져요. 절세 전략까지 정리해드려요
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>계약자를 자녀로 하면 상속세 면제돼요</H2>
      <p style={body}>계약자를 자녀로 하면 상속세 면제돼요</p>
      <GreenBox title="핵심 정리">
        계약자를 자녀로 하면 상속세 면제돼요<br />
        피상속인이 계약자면 상속재산에 포함되어 과세돼요<br />
        자녀가 소득 능력 입증해야 증여세 없어요
      </GreenBox>

      <CategoryButton label="세금 · 절세 정보" count={5} href="/category/세금" />
      <RelatedArticles items={[]} />
      <Divider />

      <H2>피상속인이 계약자면 상속재산에 포함되어 과세돼</H2>
      <p style={body}>피상속인이 계약자면 상속재산에 포함되어 과세돼요</p>
      <Steps steps={STEPS} />
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
