"use client";

// Q1. 공공임대주택에 살고 싶은데 영구임대, 국민임대, 행복주택 등 종류가 많아서 뭐가 다른지 궁금한 상황
// Q2. 공공임대주택 유형별 차이를 비교해서 본인에게 맞는 유형을 선택한다
// Q3. 영구임대(최저소득), 국민임대(중위소득 70%), 행복주택(청년/신혼), 장기전세(시세 80%), 통합공공임대
// Q4. GreenBox(유형별 비교) + BorderBox(소득 기준표) + EligibilityChecker + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const ELIGIBILITY = [
  { id: "income", label: "중위소득 기준에 해당해요 (유형별 상이)" },
  { id: "house", label: "무주택 세대구성원이에요" },
  { id: "asset", label: "자산 기준을 충족해요 (유형별 상이)" },
  { id: "age", label: "행복주택은 만 19~39세 청년 또는 신혼부부 우선" },
];

const FAQS = [
  { q: "영구임대주택은 누가 들어갈 수 있나요?", a: "생계·의료급여 수급자, 국가유공자 등 최저소득층이 대상이에요. 시세의 30% 수준으로 매우 저렴해요. 입주 경쟁이 치열하고 대기 기간이 길어요." },
  { q: "국민임대와 영구임대의 차이가 뭔가요?", a: "영구임대는 최저소득층(수급자 등) 대상이고, 국민임대는 중위소득 70% 이하로 범위가 넓어요. 국민임대 임대료는 시세의 60~80% 수준이에요." },
  { q: "행복주택은 청년만 들어갈 수 있나요?", a: "청년(만 19~39세)이 우선이지만, 신혼부부, 고령자, 산업단지 근로자도 입주할 수 있어요. 최대 6~10년 거주 가능해요." },
  { q: "통합공공임대주택은 뭔가요?", a: "2021년부터 시작된 새 유형이에요. 기존 영구·국민·행복·장기전세를 하나로 통합한 거예요. 소득에 따라 임대료가 차등 적용돼요." },
  { q: "공공임대 어디서 신청하나요?", a: "LH(한국토지주택공사) 청약센터(apply.lh.or.kr)에서 신청할 수 있어요. SH(서울주택도시공사) 물량은 SH 사이트에서 따로 신청해요." },
  { q: "소득이 올라가면 퇴거해야 하나요?", a: "입주 후 소득이 기준을 초과하면 임대료가 올라가거나 재계약이 거부될 수 있어요. 유형마다 기준이 달라요." },
];

const SOURCES = [
  { name: "LH 한국토지주택공사", href: "https://www.lh.or.kr" },
  { name: "공공주택특별법", href: "https://www.law.go.kr/법령/공공주택특별법" },
  { name: "마이홈", href: "https://www.myhome.go.kr" },
];

const RELATED = [
  { slug: "국민임대주택-전용면적-70제곱미터-입주자격", title: "국민임대주택 입주자격", description: "국민임대 소득·자산 기준." },
  { slug: "청약저축-청약예금-전환-방법-조건", title: "청약저축 전환 방법", description: "청약통장 전환 절차." },
  { slug: "주택청약", title: "주택청약 제도", description: "청약 가점과 순위 기준." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>주거 · 공공임대 · 임대주택 종류</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        공공임대주택, 종류가 왜 이렇게 많죠?<br />
        유형별 차이와 입주 조건 비교
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>"영구임대, 국민임대, 행복주택... 뭐가 다른 거예요?"</p>
      <p style={body}>
        공공임대주택은 소득 수준과 대상에 따라 여러 유형으로 나뉘어요.
        <a href="https://www.law.go.kr/법령/공공주택특별법" style={{ color: "#1D9E75", textDecoration: "underline" }}>공공주택특별법</a>에 근거한 제도인데,
        유형마다 소득 기준, 임대료, 거주 기간이 달라요.
      </p>
      <Divider /><ArticleAd position="intro" />

      <H2>유형별 차이 한눈에 보기</H2>
      <GreenBox title="공공임대주택 유형 비교">
        {"영구임대\n· 대상: 수급자, 국가유공자 등 최저소득층\n· 임대료: 시세 30% 수준\n· 거주 기간: 50년\n\n국민임대\n· 대상: 중위소득 70% 이하 무주택자\n· 임대료: 시세 60~80%\n· 거주 기간: 30년\n\n행복주택\n· 대상: 청년(19~39세), 신혼부부, 고령자\n· 임대료: 시세 60~80%\n· 거주 기간: 6~10년\n\n장기전세\n· 대상: 중위소득 100% 이하\n· 임대료: 시세 80% (전세)\n· 거주 기간: 20년\n\n통합공공임대 (2021~)\n· 기존 유형 통합, 소득별 차등 임대료"}
      </GreenBox>
      <CategoryButton label="주거 정보" count={10} href="/category/주거" />
      <RelatedArticles items={RELATED} />
      <Divider />

      <H2>소득 기준은 어떻게 되나요?</H2>
      <p style={body}>유형별로 소득 기준이 달라요. 2026년 기준 중위소득을 기준으로 판단해요.</p>
      <BorderBox>
        <strong>2026년 유형별 소득 기준 (4인 가구 기준)</strong>{"\n"}
        · 영구임대: 기초생활수급자 또는 중위소득 50% 이하{"\n"}
        · 국민임대: 중위소득 70% 이하 (약 437만원){"\n"}
        · 행복주택: 중위소득 80~100% 이하 (유형별 상이){"\n"}
        · 장기전세: 중위소득 100% 이하 (약 624만원){"\n"}
        {"\n"}
        ※ 가구원 수에 따라 기준 금액이 달라져요{"\n"}
        ※ 자산(부동산·자동차) 기준도 별도로 있어요
      </BorderBox>
      <Divider />

      <H2>내가 입주할 수 있는지 확인해보세요</H2>
      <SectionBadge>기본 자격 체크</SectionBadge>
      <EligibilityChecker items={ELIGIBILITY} />
      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 공공주택특별법 기준으로 작성했어요. 소득 기준, 임대료, 공급 물량은 매년 바뀌니 LH 또는 마이홈(myhome.go.kr)에서 확인해 주세요." />
    </ArticleLayout>
  );
}
