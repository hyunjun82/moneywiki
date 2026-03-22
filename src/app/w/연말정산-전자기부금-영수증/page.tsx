"use client";

// Q1. 연말정산 전자기부금 영수증에 대해 알아보려는 상황
// Q2. 관련 정보를 확인하고 실행한다
// Q3. 핵심 내용 확인
// Q4. GreenBox + BorderBox + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "연말정산 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "연말정산 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "연말정산 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "연말정산 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "연말정산 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
];

const SOURCES = [
  { name: "관련 법령 정보", href: "https://www.law.go.kr" },
];

const RELATED = [
  { slug: "연말정산-전자기부금-영수증", title: "연말정산 전자기부금 영수증", description: "현재 글." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>경제</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        연말정산 전자기부금 영수증
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>기본 개념</H2>
      <p style={body}>국세청 연말정산 간소화 서비스에서 자동 조회되는 전자 형태의 기부금 영수증입니다.</p>
      <GreenBox>
        연말정산 전자기부금 영수증
      </GreenBox>

      <CategoryButton label="경제" count={10} href="/category/%EA%B2%BD%EC%A0%9C" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <H2>전자기부금 영수증 제도</H2>
      <BorderBox>
        <strong>전자기부금 영수증 제도</strong><br />
        
      </BorderBox>

      <Divider />
      <H2>조회 방법</H2>

      <Divider />
      <H2>연말정산 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>자주 궁금해하는 내용을 모았어요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준 관련 법령과 공식 자료를 바탕으로 작성했어요. 개별 상황에 따라 달라질 수 있으니 전문가 상담을 권해요." />
    </ArticleLayout>
  );
}
