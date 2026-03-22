"use client";
import { H2, GreenBox, BorderBox, Divider, body, Steps, FAQ, SourceNote, Disclaimer, ArticleLayout, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";

const FAQS = [
  { q: "건축허가 착공신고 연기 가능 기간에 대해 자세히 알 수 있나요?", a: "이 글에서 핵심 내용을 정리했어요. 아래 내용을 참고하세요." },
  { q: "관련 법령은 어디서 확인하나요?", a: "법제처(law.go.kr)에서 관련 법령 원문을 확인할 수 있어요." },
  { q: "더 자세한 상담은 어디서 받나요?", a: "정부 기관 상담센터나 전문가 상담을 이용하세요." },
  { q: "최신 정보는 어디서 확인하나요?", a: "관련 정부 기관 홈페이지에서 최신 내용을 확인할 수 있어요." },
  { q: "온라인으로 신청할 수 있나요?", a: "대부분 정부24(gov.kr)나 관련 기관 홈페이지에서 온라인 신청이 가능해요." }
];

const SOURCES = [
  { name: "- name: \"건축법 제21조", href: "https://www.law.go.kr" },
  { name: "찾기쉬운 생활법령정보", href: "https://easylaw.go.kr" }
];

const RELATED = [
  { slug: "건축허가-절차", title: "- title: \"건축허가 절차", description: "" },
  { slug: "착공신고-방법", title: "착공신고 방법", description: "" },
  { slug: "건축신고-유효기간", title: "건축신고 유효기간", description: "" }
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
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>건축허가 착공신고 연기 가능 기간</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>"건축허가를 받았는데 사정이 생겨서 당장 공사를 시작하기 어려워요. 착공신고를 언제까지 연기할 수 있는지 궁금해요."</p>
      <p style={body}>건축허가 받았는데 당장 공사 시작이 어려워요. 착공신고를 얼마나 연기할 수 있나요? 1년까지 가능해요.</p>
      <Divider /><ArticleAd position="intro" />
      <H2>핵심 정리</H2>
      <GreenBox title="요약">"· 건축허가 후 2년 이내에 착공해야 하고, 정당한 사유가 있으면 1년 연장 가능해요\\n· 건축신고는 1년 이내 착공이 원칙이에요\\n· 총 3년까지 가능하지만 연장은 1회만 허용돼요"</GreenBox>
      <CategoryButton label="부동산" count={10} href="/category/%EB%B6%80%EB%8F%99%EC%82%B0" />
      <RelatedArticles items={RELATED} />
      <Divider />
      <H2>절차와 방법</H2>
      <p style={body}>아래 순서대로 진행하면 돼요.</p>
      <Steps steps={STEPS} />
      <Divider />
      <H2>알아두면 좋은 것들</H2>
      <BorderBox><strong>참고사항</strong>{"\n"}· 건축허가 후 2년 이내에 착공해야 하고, 정당한 사유가 있으면 1년 연장 가능해요\n· 건축신고는 1년 이내 착공이 원칙이에요\n· 총 3년까지 가능하지만 연장은 1회만 허용돼요</BorderBox>
      <Divider />
      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준으로 작성했어요. 법 개정이나 정책 변경에 따라 내용이 달라질 수 있으니 관련 기관에서 최신 정보를 확인해 주세요." />
    </ArticleLayout>
  );
}
