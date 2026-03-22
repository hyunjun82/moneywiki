"use client";
import { H2, GreenBox, BorderBox, Divider, body, Steps, FAQ, SourceNote, Disclaimer, ArticleLayout, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";

const FAQS = [
  { q: "  - question: 서울에서 전세 1억 5천 살면 소액임차인인가요?", a: "네, 서울은 1억 6,500만원 이하면 소액임차인이에요. 경매 나면 5,500만원까지 최우선 변제받을 수 있어요." },
  { q: "확정일자 없어도 최우선변제 받을 수 있나요?", a: "네, 최우선변제권은 대항력만 있으면 돼요. 전입신고 + 실거주만 하면 확정일자 없어도 가능해요." },
  { q: "경매개시결정 후에 전입신고해도 되나요?", a: "안 돼요. 경매개시결정 등기 전에 대항력을 갖춰야 해요. 그 후에는 최우선변제 못 받아요." },
  { q: "낙찰가가 낮으면 어떻게 되나요?", a: "낙찰가의 1/2 범위 안에서만 변제돼요. 소액임차인 여러 명이면 안분해서 나눠 받아요." },
  { q: "월세는 소액임차인 기준에 어떻게 적용되나요?", a: "보증금 + (월세 × 100)으로 환산해요. 보증금 1억에 월세 50만원이면 1억 5,000만원으로 계산돼요." }
];

const SOURCES = [
  { name: "- name: 주택임대차보호법 제8조", href: "https://www.law.go.kr/법령/주택임대차보호법" },
  { name: "주택임대차보호법 시행령", href: "https://www.law.go.kr/법령/주택임대차보호법시행령" },
  { name: "찾기쉬운 생활법령정보 소액보증금 최우선변제", href: "https://www.easylaw.go.kr/CSP/OnhunqueansInfoRetrieve.laf?onhunqnaAstSeq=84&onhunqueSeq=2466" }
];

const RELATED = [
  { slug: "확정일자", title: "- title: 확정일자", description: "" },
  { slug: "대항력-발생-시점", title: "대항력 발생 시점", description: "" },
  { slug: "우선변제권-요건", title: "우선변제권 요건", description: "" }
];

const STEPS = [
  { title: "관련 정보를 확인하세요", desc: "정부 기관 홈페이지나 법제처에서 최신 기준을 확인할 수 있어요." },
  { title: "필요한 서류를 준비하세요", desc: "신분증과 관련 서류를 미리 준비하면 절차가 빠르게 진행돼요." },
  { title: "온라인 또는 방문 신청하세요", desc: "정부24, 홈택스 등에서 온라인 신청이 가능해요. 방문 신청은 관할 기관에서 할 수 있어요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>소액임차인 최우선변제권 한도 금액 지역별 기준</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>"전세 보증금이 적은 세입자를 보호하는 제도예요. 집이 경매로 넘어가도 은행 근저당권보다 먼저 보증금 일부를 돌려받을 수 있어요."</p>
      <p style={body}>경매 시 저당권보다 먼저 보증금을 돌려받을 수 있어요. 서울 1.65억 이하면 5,500만원까지 최우선 변제받아요</p>
      <Divider /><ArticleAd position="intro" />
      <H2>핵심 정리</H2>
      <GreenBox title="요약">"· 소액임차인은 저당권보다 먼저 보증금 일부를 변제받을 수 있어요.\\n· 서울 보증금 1.65억 이하면 5,500만원까지 최우선 변제돼요.\\n· 대항력만 있으면 되고 확정일자는 필요 없어요."</GreenBox>
      <CategoryButton label="부동산" count={10} href="/category/%EB%B6%80%EB%8F%99%EC%82%B0" />
      <RelatedArticles items={RELATED} />
      <Divider />
      <H2>절차와 방법</H2>
      <p style={body}>아래 순서대로 진행하면 돼요.</p>
      <Steps steps={STEPS} />
      <Divider />
      <H2>알아두면 좋은 것들</H2>
      <BorderBox><strong>참고사항</strong>{"\n"}· 소액임차인은 저당권보다 먼저 보증금 일부를 변제받을 수 있어요.\n· 서울 보증금 1.65억 이하면 5,500만원까지 최우선 변제돼요.\n· 대항력만 있으면 되고 확정일자는 필요 없어요.</BorderBox>
      <Divider />
      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준으로 작성했어요. 법 개정이나 정책 변경에 따라 내용이 달라질 수 있으니 관련 기관에서 최신 정보를 확인해 주세요." />
    </ArticleLayout>
  );
}
