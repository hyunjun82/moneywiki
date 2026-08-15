"use client";
// Q1. 아파트에 살면서 동대표(동별 대표자)에 출마하고 싶은데, 자격 요건이 뭔지 궁금한 입주민
// Q2. 동대표 자격 요건(소유자·거주자 등)과 선출 절차를 확인해서 출마 여부를 판단한다
// Q3. 공동주택관리법 기준, 소유자 본인 필요 여부, 세대주 요건, 결격사유, 선출 절차
// Q4. GreenBox(핵심 자격) + EligibilityChecker(자격 확인) + Steps(선출 절차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Steps, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const ELIGIBILITY = [
  { id: "owner", label: "해당 아파트 구분소유자이거나 구분소유자의 배우자·직계존비속이에요" },
  { id: "resident", label: "해당 동에 실제로 거주하고 있어요" },
  { id: "no_crime", label: "금고 이상의 형 선고를 받고 2년이 지나지 않은 적 없어요" },
  { id: "no_debt", label: "관리비를 3개월 이상 체납 중이 아니에요" },
  { id: "no_conflict", label: "해당 공동주택의 관리업무에 이해관계가 없어요" },
];

const STEPS = [
  { title: "선거관리위원회의 공고를 확인하세요", desc: "아파트 게시판이나 관리사무소에서 동대표 선거 공고를 확인할 수 있어요. 임기 만료 전에 공고가 나와요. 후보 등록 기간, 투표일, 투표 장소가 안내돼요." },
  { title: "후보 등록을 하세요", desc: "공고된 기간 내에 선거관리위원회에 후보 등록을 해요. 주민등록등본, 등기사항증명서 등 본인 자격을 증명하는 서류를 제출해요." },
  { title: "투표를 통해 선출돼요", desc: "후보가 1명이면 찬반 투표(과반수 찬성), 2명 이상이면 다수 득표자가 선출돼요. 관리규약에 따라 세부 방식은 단지마다 다를 수 있어요.", tip: "위임장으로 대리투표가 가능한 단지도 있어요" },
];

const FAQS = [
  { q: "세입자도 동대표가 될 수 있나요?", a: "원칙적으로 안 돼요. 동대표는 구분소유자(집주인)이거나 그 배우자·직계존비속이어야 해요. 다만 일부 관리규약에서 세대 구성원까지 허용하는 단지도 있으니 관리규약을 확인하세요." },
  { q: "아들 명의 아파트에 부모가 살면 동대표 가능한가요?", a: "가능해요. 구분소유자의 직계존속(부모)이 해당 동에 거주하고 있으면 자격이 돼요." },
  { q: "동대표 임기는 얼마나 되나요?", a: "보통 2년이에요. 관리규약에 따라 다를 수 있어요. 연임이 가능한 단지도 있고, 1회 연임까지만 허용하는 단지도 있어요." },
  { q: "관리비 체납이 있으면 안 되나요?", a: "3개월 이상 체납 중이면 결격사유에 해당해요. 체납액을 먼저 납부하면 자격이 회복돼요." },
  { q: "동대표가 하는 일은 뭔가요?", a: "입주자대표회의에 참석해서 관리비 예산 승인, 장기수선계획, 관리업체 선정 등 단지 운영에 관한 의사결정을 해요." },
];

const SOURCES = [
  { name: "공동주택관리법", href: "https://www.law.go.kr/법령/공동주택관리법" },
  { name: "공동주택관리법 시행령", href: "https://www.law.go.kr/법령/공동주택관리법시행령" },
];

const RELATED = [
  { slug: "아파트-관리사무소장-업무-역할", title: "아파트 관리사무소장 역할", description: "관리사무소장이 하는 일." },
  { slug: "아파트-반려동물-고양이-사육", title: "아파트 반려동물 사육 규정", description: "공동주택에서의 반려동물 규정." },
  { slug: "공공임대주택-종류-차이", title: "공공임대주택 종류", description: "영구임대, 국민임대, 행복주택 차이." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 아파트 관리 · 동대표</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        아파트 동대표, 누가 될 수 있나요?<br />
        자격 요건과 선출 절차
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>"동대표에 관심 있는데, 세입자도 될 수 있나요?"</p>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/공동주택관리법" style={{ color: "#1D9E75", textDecoration: "underline" }}>공동주택관리법</a>에 따라 동대표는 <strong>구분소유자(집주인) 또는 그 배우자·직계존비속</strong>이어야 해요.
        해당 동에 실제로 거주해야 하고, 결격사유가 없어야 하죠.
      </p>
      <Divider /><ArticleAd position="intro" />

      <H2>동대표 자격이 되는지 확인해보세요</H2>
      <SectionBadge>자격 체크</SectionBadge>
      <EligibilityChecker items={ELIGIBILITY} />
      <CategoryButton label="부동산 정보" count={18} href="/category/부동산" />
      <RelatedArticles items={RELATED} />
      <Divider />

      <H2>자격 요건을 자세히 볼게요</H2>
      <p style={body}>공동주택관리법 시행령 제11조에서 정한 자격과 결격사유를 정리했어요.</p>
      <GreenBox title="동대표 자격 요건 정리">
        {"자격: 구분소유자 또는 배우자·직계존비속\n거주: 해당 동에 주민등록 + 실거주\n\n결격사유:\n· 미성년자\n· 피성년후견인·피한정후견인\n· 금고 이상 형 선고 후 2년 미경과\n· 관리비 3개월 이상 체납 중\n· 해당 아파트 관리업무 이해관계자\n\n관리규약으로 추가 요건 설정 가능 (단지마다 다름)"}
      </GreenBox>
      <Divider />

      <H2>선출 절차는 이렇게 진행돼요</H2>
      <Steps steps={STEPS} />
      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 공동주택관리법 기준으로 작성했어요. 세부 자격과 선출 방식은 단지별 관리규약에 따라 다를 수 있으니 관리사무소에서 확인해 주세요." />
    </ArticleLayout>
  );
}
