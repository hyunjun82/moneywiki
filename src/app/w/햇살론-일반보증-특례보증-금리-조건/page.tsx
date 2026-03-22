"use client";

// Q1. 햇살론에 대해 알아보려는 상황
// Q2. 관련 정보를 확인하고 실행한다
// Q3. 2026년 1월 2일부터 햇살론 상품 통합, 일반보증과 특례보증 2가지로 간소화, 일반보증 금리 최대 12.5%, 특례보증 12.5% 고정 (배려대상 9.9%)
// Q4. GreenBox + Steps + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "기존 햇살론 대출 받은 사람은 어떻게 되나요?", a: "기존 대출은 그대로 유지돼요. 만기까지 기존 조건으로 상환하면 돼요. 신규 대출만 통합 상품으로 적용돼요." },
  { q: "햇살론 일반보증이랑 특례보증 중 뭐가 유리한가요?", a: "신용등급에 따라 달라요. 1~4등급은 은행에서 일반보증이 유리하고, 5~7등급은 특례보증밖에 안 돼요." },
  { q: "햇살론 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "햇살론 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "햇살론 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
];

const SOURCES = [
  { name: "서민금융진흥원", href: "https://www.kinfa.or.kr" },
  { name: "연합인포맥스", href: "https://news.einfomax.co.kr" },
];

const RELATED = [
  { slug: "햇살론-특례보증-금리-신청방법", title: "햇살론 특례보증 신청방법", description: "관련 내용 정리." },
  { slug: "햇살론-성실상환-금리인하", title: "햇살론 성실상환 금리인하", description: "관련 내용 정리." },
  { slug: "불법사금융예방대출", title: "불법사금융예방대출", description: "관련 내용 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        햇살론 일반보증 특례보증 금리 조건, 통합 변경사항
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        2026년 1월 2일부터 햇살론 상품 통합, 일반보증과 특례보증 2가지로 간소화
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>햇살론 통합, 뭐가 달라졌나요?</H2>
      <p style={body}>서민금융진흥원에서 운영하는 햇살론 상품이 2가지로 정리됐어요. 기존에는 햇살론뱅크, 근로자햇살론, 햇살론15, 최저신용자특례보증 등 상품이 여러 개였죠. 이제 일반보증과 특례보증 딱 2가지예요.</p>
      <GreenBox>
        2026년 1월 2일부터 햇살론 상품 통합, 일반보증과 특례보증 2가지로 간소화{"\n"}
        일반보증 금리 최대 12.5%, 특례보증 12.5% 고정 (배려대상 9.9%){"\n"}
        업권 구분 폐지로 은행·저축은행·상호금융 모두 취급 가능
      </GreenBox>
      <p style={body}>기존 상품이 어떻게 통합됐는지 정리해드릴게요.</p>

      <CategoryButton label="금융" count={10} href="/category/%EA%B8%88%EC%9C%B5" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <H2>햇살론 일반보증, 금리와 한도는?</H2>
      <p style={body}>햇살론 일반보증은 신용등급 1~7등급 차주가 이용할 수 있어요. 다만 금융회사에 따라 대상 등급이 달라요.</p>
      <BorderBox>
        <strong>햇살론 일반보증, 금리와 한도는?</strong><br />
        햇살론 일반보증은 신용등급 1~7등급 차주가 이용할 수 있어요. 다만 금융회사에 따라 대상 등급이 달라요.<br />
        일반보증 금리는 금융회사가 자율적으로 정해요. 대출금리 상한은 10%이고, 여기에 보증요율 최대 2.5%가 붙어요. 합쳐서 12.5%를 넘지 않도록 설계됐어요.
      </BorderBox>
      <p style={body}>일반보증 금리는 금융회사가 자율적으로 정해요. 대출금리 상한은 10%이고, 여기에 보증요율 최대 2.5%가 붙어요. 합쳐서 12.5%를 넘지 않도록 설계됐어요.</p>

      <Divider />
      <H2>햇살론 특례보증, 저신용자 전용 상품</H2>
      <p style={body}>햇살론 특례보증은 신용등급이 낮거나 소득이 적은 분들을 위한 상품이에요. 기존 햇살론15와 최저신용자특례보증을 합친 거예요. 대출 한도는 최대 1,000만원이에요.</p>
      <p style={body}>특례보증은 금리가 고정돼 있어요. 기본 금리는 12.5%예요. 사회적 배려 대상자(기초생활수급자, 차상위계층 등)는 9.9%로 더 낮아요. 성실하게 상환하면 최저 7.0%까지 가능해요.</p>
      <p style={body}>일반보증처럼 금융회사마다 금리가 다르지 않아요. 어디서 신청해도 같은 금리예요. 햇살론 특례보증 신청방법에서 자세한 내용 확인하세요.</p>

      <Divider />
      <H2>햇살론 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>자주 궁금해하는 내용을 모았어요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준 관련 법령과 공식 자료를 바탕으로 작성했어요. 개별 상황에 따라 달라질 수 있으니 전문가 상담을 권해요." />
    </ArticleLayout>
  );
}
