"use client";

// Q1. 점유취득시효에 대해 알아보려는 상황
// Q2. 관련 정보를 확인하고 실행한다
// Q3. 20년간 평온·공연하게 점유하면 소유권 취득 가능해요, 자주점유(소유 의사)와 선의·무과실이 필요해요
// Q4. GreenBox + BorderBox + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "점유취득시효는 몇 년 동안 점유해야 하나요?", a: "20년간 평온하고 공연하게 점유하면 소유권을 취득할 수 있어요. 다만 자주점유(소유 의사)가 있어야 해요." },
  { q: "건물 확장하면서 타인 토지를 점유한 경우 취득시효 인정되나요?", a: "확장 면적이 건축 오차 범위를 넘어서면 점유 당시 인식했다고 추정되어 자주점유가 부정될 수 있어요." },
  { q: "나중에 타인 토지인 걸 알게 되면 어떻게 되나요?", a: "처음에 자기 토지라고 믿고 점유했다면, 나중에 타인 토지인 걸 알게 되어도 자주점유는 유지돼요." },
  { q: "점유취득시효 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "점유취득시효 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
];

const SOURCES = [
  { name: "민법 제245조", href: "https://www.law.go.kr/법령/민법" },
  { name: "대법원 판례", href: "https://www.law.go.kr" },
];

const RELATED = [
  { slug: "점유취득시효-요건", title: "점유취득시효 요건", description: "관련 내용 정리." },
  { slug: "부동산-소유권-취득", title: "부동산 소유권 취득", description: "관련 내용 정리." },
  { slug: "경계-분쟁", title: "경계 분쟁 해결", description: "관련 내용 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        점유취득시효 타인 토지 건물 확장 30년 소유권 취득
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        20년간 평온·공연하게 점유하면 소유권 취득 가능해요
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>점유취득시효란</H2>
      <p style={body}>쉽게 말해 남의 땅이라도 오랫동안 내 땅처럼 사용하면 법적으로 소유권을 인정받을 수 있는 제도예요. 민법 제245조에서 "20년간 소유의 의사로 평온, 공연하게 부동산을 점유하는 자는 등기함으로써 그 소유권을 취득한다"고 규정하고 있어요.</p>
      <GreenBox>
        20년간 평온·공연하게 점유하면 소유권 취득 가능해요{"\n"}
        자주점유(소유 의사)와 선의·무과실이 필요해요{"\n"}
        건물 확장 면적이 크면 자주점유 인정 어려워요
      </GreenBox>
      <p style={body}>간단히 말해 20년 동안 아무 문제없이 공개적으로 사용하고, "이게 내 땅이야"라는 의사로 점유했다면 소유권을 얻을 수 있다는 거예요.</p>

      <CategoryButton label="부동산" count={10} href="/category/%EB%B6%80%EB%8F%99%EC%82%B0" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <H2>점유취득시효 성립 요건</H2>
      <p style={body}>점유취득시효가 인정되려면 4가지 요건을 모두 충족해야 해요.</p>
      <BorderBox>
        <strong>점유취득시효 성립 요건</strong><br />
        점유취득시효가 인정되려면 4가지 요건을 모두 충족해야 해요.<br />
        20년 점유: 최소 20년 동안 계속해서 점유해야 해요. 중간에 점유가 끊기면 다시 처음부터 세야 해요.
      </BorderBox>
      <p style={body}>20년 점유: 최소 20년 동안 계속해서 점유해야 해요. 중간에 점유가 끊기면 다시 처음부터 세야 해요.</p>

      <Divider />
      <H2>건물 확장 시 점유취득시효 인정 여부</H2>
      <p style={body}>정리하면 집을 확장하면서 옆 토지를 점유한 경우, 자주점유가 인정되느냐가 핵심이에요. 판례는 확장 면적이 얼마나 되느냐에 따라 다르게 판단해요.</p>
      <p style={body}>건축 오차 범위 내: 자기 토지에 건물을 짓다가 경계를 착오해서 조금 넘어간 정도라면, 자주점유로 인정될 가능성이 높아요.</p>
      <p style={body}>건축 오차 범위 초과: 확장 면적이 상당히 크다면, 건축 당시 이미 타인 토지인 걸 알고 있었다고 추정되어 자주점유가 부정돼요.</p>

      <Divider />
      <H2>점유취득시효 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>자주 궁금해하는 내용을 모았어요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준 관련 법령과 공식 자료를 바탕으로 작성했어요. 개별 상황에 따라 달라질 수 있으니 전문가 상담을 권해요." />
    </ArticleLayout>
  );
}
