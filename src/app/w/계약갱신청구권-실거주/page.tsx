"use client";
import { H2, GreenBox, BorderBox, Divider, body, Steps, FAQ, SourceNote, Disclaimer, ArticleLayout, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";

const FAQS = [
  { q: "  - question: 형제자매 실거주도 거절 사유인가요?", a: "아니요. 직계존비속(부모, 자녀)만 가능해요. 형제자매는 안 돼요." },
  { q: "실거주 안 하고 다른 세입자 들이면 어떻게 되나요?", a: "손해배상 청구할 수 있어요. 이사 비용, 중개수수료, 보증금 차액 등이요." },
  { q: "실거주 기간은 얼마나 해야 하나요?", a: "법에 정해진 기간은 없지만 실제로 거주해야 해요. 형식적 거주는 인정 안 돼요." },
  { q: "거짓 실거주 어떻게 확인해요?", a: "퇴거 후 3개월 정도 지나서 등기부등본 열람하거나 직접 방문해서 확인하세요." },
  { q: "손해배상 얼마나 받을 수 있나요?", a: "이사 비용, 중개수수료, 새 집과의 보증금 차액 등 입증 가능한 실제 손해예요." }
];

const SOURCES = [
  { name: "- name: 주택임대차보호법 제6조의3", href: "https://www.law.go.kr/법령/주택임대차보호법" }
];

const RELATED = [
  { slug: "계약갱신청구권-기간", title: "- title: 계약갱신청구권 기간", description: "" },
  { slug: "계약갱신청구권-거절사유", title: "계약갱신청구권 거절사유", description: "" },
  { slug: "계약갱신청구권-행사방법", title: "계약갱신청구권 행사방법", description: "" }
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
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>계약갱신청구권 실거주</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>""저 직접 살 거예요." 집주인이 이렇게 말하면 나가야 할까요?"</p>
      <p style={body}>집주인이 실거주한다고 거절했는데 거짓말이면? 손해배상 받을 수 있어요</p>
      <Divider /><ArticleAd position="intro" />
      <H2>핵심 정리</H2>
      <GreenBox title="요약">"· 집주인이 실거주한다고 하면 계약갱신청구권 거절할 수 있어요.\\n· 본인뿐 아니라 직계존비속(부모, 자녀) 실거주도 거절 사유예요.\\n· 거짓 실거주로 나갔는데 다른 세입자 들이면 손해배상 청구 가능해요."</GreenBox>
      <CategoryButton label="부동산" count={10} href="/category/%EB%B6%80%EB%8F%99%EC%82%B0" />
      <RelatedArticles items={RELATED} />
      <Divider />
      <H2>절차와 방법</H2>
      <p style={body}>아래 순서대로 진행하면 돼요.</p>
      <Steps steps={STEPS} />
      <Divider />
      <H2>알아두면 좋은 것들</H2>
      <BorderBox><strong>참고사항</strong>{"\n"}· 집주인이 실거주한다고 하면 계약갱신청구권 거절할 수 있어요.\n· 본인뿐 아니라 직계존비속(부모, 자녀) 실거주도 거절 사유예요.\n· 거짓 실거주로 나갔는데 다른 세입자 들이면 손해배상 청구 가능해요.</BorderBox>
      <Divider />
      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준으로 작성했어요. 법 개정이나 정책 변경에 따라 내용이 달라질 수 있으니 관련 기관에서 최신 정보를 확인해 주세요." />
    </ArticleLayout>
  );
}
