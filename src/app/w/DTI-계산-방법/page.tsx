"use client";
// Q1. DTI에 대해 알아보려는 상황
// Q2. 관련 정보를 확인하고 실행한다
// Q3. DTI는 주담대 원리금과 기타 대출 이자만 포함해요, DSR은 모든 대출의 원리금을 포함해서 더 엄격해요
// Q4. Steps + GreenBox + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "DTI와 DSR 차이는요?", a: "DTI는 주담대 원리금+기타 이자, DSR은 모든 원리금이에요. DSR이 더 엄격해요." },
  { q: "DTI는 어떻게 계산하나요?", a: "(주담대 원리금 + 기타 대출 이자) ÷ 연소득 × 100이에요." },
  { q: "DSR 한도는요?", a: "은행권 40%, 비은행권 50%예요." },
  { q: "DTI 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "DTI 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
];

const SOURCES = [
  { name: "LTV DTI DSR 계산", href: "https://kbthink.com/main/asset-management/wealth-manage-tip/kbthink-original/202408/LTV-DTI-DSR.html" },
];

const RELATED = [
  { slug: "주택담보대출-계산기", title: "주택담보대출 계산기", description: "관련 내용 정리." },
  { slug: "전세대출-한도-계산", title: "전세대출 한도", description: "관련 내용 정리." },
  { slug: "LTV-계산-방법", title: "LTV 계산", description: "관련 내용 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        DTI 계산 방법 DSR 차이
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        DTI는 주담대 원리금과 기타 대출 이자만 포함해요
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>DTI와 DSR 기본 차이</H2>
      <p style={body}>DTI는 주담대 원리금과 기타 대출 이자만 포함해요. DSR은 모든 대출의 원리금을 포함해서 더 엄격해요.</p>
      <GreenBox>
        DTI는 주담대 원리금과 기타 대출 이자만 포함해요{"\n"}
        DSR은 모든 대출의 원리금을 포함해서 더 엄격해요{"\n"}
        DSR 40% 이내여야 대출 가능해요
      </GreenBox>

      <CategoryButton label="부동산" count={10} href="/category/%EB%B6%80%EB%8F%99%EC%82%B0" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <H2>DTI 계산 방법</H2>
      <p style={body}>DTI = (주담대 원리금 + 기타 대출 이자) ÷ 연소득 × 100이에요.</p>
      <BorderBox>
        <strong>DTI 계산 방법</strong><br />
        DTI = (주담대 원리금 + 기타 대출 이자) ÷ 연소득 × 100이에요.
      </BorderBox>

      <Divider />
      <H2>DSR 계산 방법</H2>
      <p style={body}>DSR = (모든 대출 원리금) ÷ 연소득 × 100이에요. 은행권 40%, 비은행 50% 이내여야 해요.</p>

      <Divider />
      <H2>DTI 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>자주 궁금해하는 내용을 모았어요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준 관련 법령과 공식 자료를 바탕으로 작성했어요. 개별 상황에 따라 달라질 수 있으니 전문가 상담을 권해요." />
    </ArticleLayout>
  );
}
