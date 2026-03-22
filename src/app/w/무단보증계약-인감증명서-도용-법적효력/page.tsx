"use client";
import { H2, GreenBox, BorderBox, Divider, body, Steps, FAQ, SourceNote, Disclaimer, ArticleLayout, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";

const FAQS = [
  { q: "무단 보증계약 인감증명서 도용 법적 효력에 대해 자세히 알 수 있나요?", a: "이 글에서 핵심 내용을 정리했어요. 아래 내용을 참고하세요." },
  { q: "관련 법령은 어디서 확인하나요?", a: "법제처(law.go.kr)에서 관련 법령 원문을 확인할 수 있어요." },
  { q: "더 자세한 상담은 어디서 받나요?", a: "정부 기관 상담센터나 전문가 상담을 이용하세요." },
  { q: "최신 정보는 어디서 확인하나요?", a: "관련 정부 기관 홈페이지에서 최신 내용을 확인할 수 있어요." },
  { q: "온라인으로 신청할 수 있나요?", a: "대부분 정부24(gov.kr)나 관련 기관 홈페이지에서 온라인 신청이 가능해요." }
];

const SOURCES = [
  { name: "- name: \"민법", href: "https://www.law.go.kr/법령/민법" },
  { name: "찾기쉬운 생활법령정보 - 보증", href: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=1209&ccfNo=2&cciNo=1&cnpClsNo=2" }
];

const RELATED = [
  { slug: "보증인-권리", title: "- title: \"보증인 권리", description: "" },
  { slug: "차용증-작성", title: "차용증 작성", description: "" },
  { slug: "대출-보증", title: "대출 보증", description: "" }
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
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>무단 보증계약 인감증명서 도용 법적 효력</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>"아들이 몰래 부모님 인감증명서를 가져가 대출을 받았다는 소식, 뉴스에서 한 번쯤 들어보셨죠? 사채업자가 찾아와 보증책임을 묻는데 나는 아무것도 "</p>
      <p style={body}>가족이 인감증명서를 몰래 가져가 보증인으로 세웠다면 보증책임을 져야 할까요? 무권대리 보증계약의 법적 효력과 대응 방법을 알아봐요.</p>
      <Divider /><ArticleAd position="intro" />
      <H2>핵심 정리</H2>
      <GreenBox title="요약">"· 인감증명서가 무단으로 도용된 보증계약은 원칙적으로 무효예요\\n· 보증인의 의사 없이 체결된 계약은 무권대리로 보증책임이 없어요\\n· 표현대리가 성립하려면 상대방이 믿을 만한 객관적 사정이 있어야 해요"</GreenBox>
      <CategoryButton label="금융" count={10} href="/category/%EA%B8%88%EC%9C%B5" />
      <RelatedArticles items={RELATED} />
      <Divider />
      <H2>절차와 방법</H2>
      <p style={body}>아래 순서대로 진행하면 돼요.</p>
      <Steps steps={STEPS} />
      <Divider />
      <H2>알아두면 좋은 것들</H2>
      <BorderBox><strong>참고사항</strong>{"\n"}· 인감증명서가 무단으로 도용된 보증계약은 원칙적으로 무효예요\n· 보증인의 의사 없이 체결된 계약은 무권대리로 보증책임이 없어요\n· 표현대리가 성립하려면 상대방이 믿을 만한 객관적 사정이 있어야 해요</BorderBox>
      <Divider />
      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준으로 작성했어요. 법 개정이나 정책 변경에 따라 내용이 달라질 수 있으니 관련 기관에서 최신 정보를 확인해 주세요." />
    </ArticleLayout>
  );
}
