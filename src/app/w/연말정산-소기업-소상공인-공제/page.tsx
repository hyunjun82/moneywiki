"use client";
import { H2, GreenBox, BorderBox, Divider, body, Steps, FAQ, SourceNote, Disclaimer, ArticleLayout, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";

const FAQS = [
  { q: "연말정산 소기업 소상공인 공제 (노란우산공제)에 대해 자세히 알 수 있나요?", a: "이 글에서 핵심 내용을 정리했어요. 아래 내용을 참고하세요." },
  { q: "관련 법령은 어디서 확인하나요?", a: "법제처(law.go.kr)에서 관련 법령 원문을 확인할 수 있어요." },
  { q: "더 자세한 상담은 어디서 받나요?", a: "정부 기관 상담센터나 전문가 상담을 이용하세요." },
  { q: "최신 정보는 어디서 확인하나요?", a: "관련 정부 기관 홈페이지에서 최신 내용을 확인할 수 있어요." },
  { q: "온라인으로 신청할 수 있나요?", a: "대부분 정부24(gov.kr)나 관련 기관 홈페이지에서 온라인 신청이 가능해요." }
];

const SOURCES = [
  { name: "- name: 중소기업중앙회 노란우산공제", href: "https://www.8899.or.kr/" },
  { name: "조세특례제한법 제86조의3", href: "https://www.law.go.kr/법령/조세특례제한법" }
];

const RELATED = [
  { slug: "연말정산-연금저축-공제", title: "- title: 연말정산 연금저축 공제", description: "" },
  { slug: "연말정산-IRP-세액공제", title: "연말정산 IRP 세액공제", description: "" },
  { slug: "연말정산", title: "연말정산", description: "" }
];

const STEPS = [
  { title: "관련 정보를 확인하세요", desc: "정부 기관 홈페이지나 법제처에서 최신 기준을 확인할 수 있어요." },
  { title: "필요한 서류를 준비하세요", desc: "신분증과 관련 서류를 미리 준비하면 절차가 빠르게 진행돼요." },
  { title: "온라인 또는 방문 신청하세요", desc: "정부24, 홈택스 등에서 온라인 신청이 가능해요. 방문 신청은 관할 기관에서 할 수 있어요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>연말정산 소기업 소상공인 공제 (노란우산공제)</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>"사업자는 퇴직금이 없어서 노후가 불안해요. 노란우산공제는 사업자를 위한 퇴직금 마련 제도인데, 소득공제 혜택까지 받을 수 있어요."</p>
      <p style={body}>노란우산공제 납입금은 소득공제 대상이에요. 2025년부터 공제 한도가 상향되어 소득 4천만원 이하면 최대 600만원까지 공제받을 수 있어요.</p>
      <Divider /><ArticleAd position="intro" />
      <H2>핵심 정리</H2>
      <GreenBox title="요약">"· 노란우산공제는 소기업·소상공인 대표자의 퇴직금 마련 제도예요.\\n· 2025년부터 소득공제 한도가 상향되어 최대 600만원까지 공제받을 수 있어요.\\n· 폐업 시 압류 방지 혜택이 있어서 사업자 안전망 역할을 해요."</GreenBox>
      <CategoryButton label="연말정산" count={10} href="/category/%EC%97%B0%EB%A7%90%EC%A0%95%EC%82%B0" />
      <RelatedArticles items={RELATED} />
      <Divider />
      <H2>절차와 방법</H2>
      <p style={body}>아래 순서대로 진행하면 돼요.</p>
      <Steps steps={STEPS} />
      <Divider />
      <H2>알아두면 좋은 것들</H2>
      <BorderBox><strong>참고사항</strong>{"\n"}· 노란우산공제는 소기업·소상공인 대표자의 퇴직금 마련 제도예요.\n· 2025년부터 소득공제 한도가 상향되어 최대 600만원까지 공제받을 수 있어요.\n· 폐업 시 압류 방지 혜택이 있어서 사업자 안전망 역할을 해요.</BorderBox>
      <Divider />
      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준으로 작성했어요. 법 개정이나 정책 변경에 따라 내용이 달라질 수 있으니 관련 기관에서 최신 정보를 확인해 주세요." />
    </ArticleLayout>
  );
}
