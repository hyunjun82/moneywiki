"use client";
import { H2, GreenBox, BorderBox, Divider, body, Steps, FAQ, SourceNote, Disclaimer, ArticleLayout, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";

const FAQS = [
  { q: "  - question: 미래에셋이 ETF 투자에 좋아요?", a: "네. TIGER ETF를 직접 운용해서 ETF 라인업이 가장 다양해요. 적극 투자하려면 추천해요." },
  { q: "어디서 매수해요?", a: "미래에셋 M-STOCK 앱이나 홈페이지에서 매수해요." },
  { q: "수수료가 저렴해요?", a: "온라인 가입 시 수수료 무료인 경우가 많아요. 운용보수도 TIGER ETF가 경쟁력 있어요." },
  { q: "은행보다 좋아요?", a: "ETF 투자를 적극적으로 하려면 미래에셋이 좋아요. 단순 예금이면 은행도 괜찮아요." },
  { q: "고객센터 번호가 뭐예요?", a: "미래에셋증권 고객센터는 1588-0220이에요." }
];

const SOURCES = [
  { name: "- name: 미래에셋증권 퇴직연금", href: "https://www.miraeasset.com" },
  { name: "금융감독원 퇴직연금", href: "https://www.fss.or.kr" }
];

const RELATED = [
  { slug: "퇴직연금-etf-추천", title: "- title: 퇴직연금 ETF 추천", description: "" },
  { slug: "퇴직연금-dc형-etf-추천", title: "퇴직연금 DC형 ETF 추천", description: "" },
  { slug: "퇴직연금", title: "퇴직연금", description: "" }
];

const STEPS = [
  { title: "관련 정보를 확인하세요", desc: "정부 기관 홈페이지나 법제처에서 최신 기준을 확인할 수 있어요." },
  { title: "필요한 서류를 준비하세요", desc: "신분증과 관련 서류를 미리 준비하면 절차가 빠르게 진행돼요." },
  { title: "온라인 또는 방문 신청하세요", desc: "정부24, 홈택스 등에서 온라인 신청이 가능해요. 방문 신청은 관할 기관에서 할 수 있어요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직연금</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>미래에셋 퇴직연금 ETF 추천</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>"퇴직연금으로 ETF 투자를 적극적으로 하고 싶으시죠. 어느 금융기관이 ETF 라인업이 좋은지 궁금하시죠."</p>
      <p style={body}>미래에셋증권 퇴직연금에서 투자할 수 있는 ETF 추천해드려요. ETF 라인업이 가장 다양해요</p>
      <Divider /><ArticleAd position="intro" />
      <H2>핵심 정리</H2>
      <GreenBox title="요약">"· 미래에셋증권은 ETF 라인업이 가장 다양해요.\\n· TIGER ETF를 직접 운용해서 상품이 풍부해요.\\n· 적극적으로 투자하려면 미래에셋이 좋아요."</GreenBox>
      <CategoryButton label="퇴직연금" count={10} href="/category/%ED%87%B4%EC%A7%81%EC%97%B0%EA%B8%88" />
      <RelatedArticles items={RELATED} />
      <Divider />
      <H2>절차와 방법</H2>
      <p style={body}>아래 순서대로 진행하면 돼요.</p>
      <Steps steps={STEPS} />
      <Divider />
      <H2>알아두면 좋은 것들</H2>
      <BorderBox><strong>참고사항</strong>{"\n"}· 미래에셋증권은 ETF 라인업이 가장 다양해요.\n· TIGER ETF를 직접 운용해서 상품이 풍부해요.\n· 적극적으로 투자하려면 미래에셋이 좋아요.</BorderBox>
      <Divider />
      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준으로 작성했어요. 법 개정이나 정책 변경에 따라 내용이 달라질 수 있으니 관련 기관에서 최신 정보를 확인해 주세요." />
    </ArticleLayout>
  );
}
