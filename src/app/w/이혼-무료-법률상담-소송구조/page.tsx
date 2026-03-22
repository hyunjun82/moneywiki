"use client";
import { H2, GreenBox, BorderBox, Divider, body, Steps, FAQ, SourceNote, Disclaimer, ArticleLayout, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";

const FAQS = [
  { q: "이혼 무료 법률상담 소송구조: 법률 지원 받는 방법에 대해 자세히 알 수 있나요?", a: "이 글에서 핵심 내용을 정리했어요. 아래 내용을 참고하세요." },
  { q: "관련 법령은 어디서 확인하나요?", a: "법제처(law.go.kr)에서 관련 법령 원문을 확인할 수 있어요." },
  { q: "더 자세한 상담은 어디서 받나요?", a: "정부 기관 상담센터나 전문가 상담을 이용하세요." },
  { q: "최신 정보는 어디서 확인하나요?", a: "관련 정부 기관 홈페이지에서 최신 내용을 확인할 수 있어요." },
  { q: "온라인으로 신청할 수 있나요?", a: "대부분 정부24(gov.kr)나 관련 기관 홈페이지에서 온라인 신청이 가능해요." }
];

const SOURCES = [
  { name: "- name: \"대한법률구조공단", href: "https://www.klac.or.kr/" },
  { name: "소송구조제도 안내", href: "https://easylaw.go.kr/CSP/CnpClsMainBtr.laf?popMenu=ov&csmSeq=568&ccfNo=2&cciNo=3&cnpClsNo=1" },
  { name: "법률상담 서비스", href: "https://www.gov.kr/portal/service/serviceInfo/PTR000050633" }
];

const RELATED = [
  { slug: "개인파산-면책절차-신청방법-법원-심리", title: "- title: \"개인파산 면책절차 신청방법", description: "" },
  { slug: "헬프법24-법률구조-서비스-통합-플랫폼", title: "헬프법24 법률구조 통합 플랫폼", description: "" },
  { slug: "부당해고-공인노무사-무료법률지원", title: "부당해고 무료법률지원", description: "" }
];

const STEPS = [
  { title: "관련 정보를 확인하세요", desc: "정부 기관 홈페이지나 법제처에서 최신 기준을 확인할 수 있어요." },
  { title: "필요한 서류를 준비하세요", desc: "신분증과 관련 서류를 미리 준비하면 절차가 빠르게 진행돼요." },
  { title: "온라인 또는 방문 신청하세요", desc: "정부24, 홈택스 등에서 온라인 신청이 가능해요. 방문 신청은 관할 기관에서 할 수 있어요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>가정법률</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>이혼 무료 법률상담 소송구조: 법률 지원 받는 방법</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>"이혼하고 싶은데 변호사 비용이 없어서 고민이시죠? 걱정 마세요. 돈이 없어도 무료로 법률상담 받고 소송 지원까지 받을 수 있는 방법이 있어요. "</p>
      <p style={body}>이혼할 때 돈이 없어도 무료로 법률상담 받고 소송 지원받는 방법을 알려드려요. 대한법률구조공단과 법원 소송구조 제도로 변호사 비용 걱정 없이 이혼 절차를 진행할 수 있어요</p>
      <Divider /><ArticleAd position="intro" />
      <H2>핵심 정리</H2>
      <GreenBox title="요약">"· 대한법률구조공단에서 132번 전화로 이혼 무료 상담 가능해요\\n· 중위소득 125% 이하면 변호사 비용 무료로 지원받아요\\n· 법원 소송구조 제도로 인지대와 송달료도 면제받을 수 있어요"</GreenBox>
      <CategoryButton label="가정법률" count={10} href="/category/%EA%B0%80%EC%A0%95%EB%B2%95%EB%A5%A0" />
      <RelatedArticles items={RELATED} />
      <Divider />
      <H2>절차와 방법</H2>
      <p style={body}>아래 순서대로 진행하면 돼요.</p>
      <Steps steps={STEPS} />
      <Divider />
      <H2>알아두면 좋은 것들</H2>
      <BorderBox><strong>참고사항</strong>{"\n"}· 대한법률구조공단에서 132번 전화로 이혼 무료 상담 가능해요\n· 중위소득 125% 이하면 변호사 비용 무료로 지원받아요\n· 법원 소송구조 제도로 인지대와 송달료도 면제받을 수 있어요</BorderBox>
      <Divider />
      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준으로 작성했어요. 법 개정이나 정책 변경에 따라 내용이 달라질 수 있으니 관련 기관에서 최신 정보를 확인해 주세요." />
    </ArticleLayout>
  );
}
