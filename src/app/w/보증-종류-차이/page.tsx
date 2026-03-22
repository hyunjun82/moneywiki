"use client";
import { H2, GreenBox, BorderBox, Divider, body, Steps, FAQ, SourceNote, Disclaimer, ArticleLayout, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";

const FAQS = [
  { q: "보증 종류 일반보증 연대보증 근보증 차이에 대해 자세히 알 수 있나요?", a: "이 글에서 핵심 내용을 정리했어요. 아래 내용을 참고하세요." },
  { q: "관련 법령은 어디서 확인하나요?", a: "법제처(law.go.kr)에서 관련 법령 원문을 확인할 수 있어요." },
  { q: "더 자세한 상담은 어디서 받나요?", a: "정부 기관 상담센터나 전문가 상담을 이용하세요." },
  { q: "최신 정보는 어디서 확인하나요?", a: "관련 정부 기관 홈페이지에서 최신 내용을 확인할 수 있어요." },
  { q: "온라인으로 신청할 수 있나요?", a: "대부분 정부24(gov.kr)나 관련 기관 홈페이지에서 온라인 신청이 가능해요." }
];

const SOURCES = [
  { name: "- name: \"찾기쉬운 생활법령정보 - 보증", href: "https://easylaw.go.kr/CSP/CnpClsMain.laf?csmSeq=1209" },
  { name: "민법", href: "https://www.law.go.kr/법령/민법" }
];

const RELATED = [
  { slug: "보증인-책임", title: "- title: \"보증인 책임 범위", description: "" },
  { slug: "보증-계약서", title: "보증 계약서 작성", description: "" }
];

const STEPS = [
  { title: "관련 정보를 확인하세요", desc: "정부 기관 홈페이지나 법제처에서 최신 기준을 확인할 수 있어요." },
  { title: "필요한 서류를 준비하세요", desc: "신분증과 관련 서류를 미리 준비하면 절차가 빠르게 진행돼요." },
  { title: "온라인 또는 방문 신청하세요", desc: "정부24, 홈택스 등에서 온라인 신청이 가능해요. 방문 신청은 관할 기관에서 할 수 있어요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>보증 종류 일반보증 연대보증 근보증 차이</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>"친구가 은행 대출받는데 보증을 서달라고 하네요. 차용증을 보니 '연대보증'이라고 써 있는데, 그냥 '보증'과 뭐가 다른 건지 궁금하시죠? 보증에"</p>
      <p style={body}>일반보증, 연대보증, 근보증의 차이와 최고검색의 항변권에 대해 쉽게 알려드려요</p>
      <Divider /><ArticleAd position="intro" />
      <H2>핵심 정리</H2>
      <GreenBox title="요약">"· 일반보증은 최고검색의 항변권이 있어 채권자가 주채무자에게 먼저 청구해야 해요\\n· 연대보증은 항변권이 없어서 채권자가 보증인에게 바로 청구할 수 있어요\\n· 근보증은 한도액 내에서 계속적인 거래를 보증하는 방식이에요"</GreenBox>
      <CategoryButton label="금융" count={10} href="/category/%EA%B8%88%EC%9C%B5" />
      <RelatedArticles items={RELATED} />
      <Divider />
      <H2>절차와 방법</H2>
      <p style={body}>아래 순서대로 진행하면 돼요.</p>
      <Steps steps={STEPS} />
      <Divider />
      <H2>알아두면 좋은 것들</H2>
      <BorderBox><strong>참고사항</strong>{"\n"}· 일반보증은 최고검색의 항변권이 있어 채권자가 주채무자에게 먼저 청구해야 해요\n· 연대보증은 항변권이 없어서 채권자가 보증인에게 바로 청구할 수 있어요\n· 근보증은 한도액 내에서 계속적인 거래를 보증하는 방식이에요</BorderBox>
      <Divider />
      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준으로 작성했어요. 법 개정이나 정책 변경에 따라 내용이 달라질 수 있으니 관련 기관에서 최신 정보를 확인해 주세요." />
    </ArticleLayout>
  );
}
