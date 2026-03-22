"use client";
import { H2, GreenBox, BorderBox, Divider, body, Steps, FAQ, SourceNote, Disclaimer, ArticleLayout, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";

const FAQS = [
  { q: "가정폭력 이혼 방법: 절차 및 피해자 보호 규정에 대해 자세히 알 수 있나요?", a: "이 글에서 핵심 내용을 정리했어요. 아래 내용을 참고하세요." },
  { q: "관련 법령은 어디서 확인하나요?", a: "법제처(law.go.kr)에서 관련 법령 원문을 확인할 수 있어요." },
  { q: "더 자세한 상담은 어디서 받나요?", a: "정부 기관 상담센터나 전문가 상담을 이용하세요." },
  { q: "최신 정보는 어디서 확인하나요?", a: "관련 정부 기관 홈페이지에서 최신 내용을 확인할 수 있어요." },
  { q: "온라인으로 신청할 수 있나요?", a: "대부분 정부24(gov.kr)나 관련 기관 홈페이지에서 온라인 신청이 가능해요." }
];

const SOURCES = [
  { name: "- name: \"가정폭력방지 및 피해자보호 등에 관한 법률", href: "https://www.law.go.kr/법령/가정폭력방지및피해자보호등에관한법률" },
  { name: "민법 제840조", href: "https://www.law.go.kr/법령/민법" },
  { name: "찾기쉬운 생활법령정보", href: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=233&ccfNo=6&cciNo=2&cnpClsNo=2" }
];

const RELATED = [
  { slug: "상속세-계산-세율-공제", title: "- title: \"상속세 계산 세율 공제", description: "" },
  { slug: "배우자재산-담보제공-대출변제-책임", title: "배우자 재산 담보제공 대출변제 책임", description: "" }
];

const STEPS = [
  { title: "관련 정보를 확인하세요", desc: "정부 기관 홈페이지나 법제처에서 최신 기준을 확인할 수 있어요." },
  { title: "필요한 서류를 준비하세요", desc: "신분증과 관련 서류를 미리 준비하면 절차가 빠르게 진행돼요." },
  { title: "온라인 또는 방문 신청하세요", desc: "정부24, 홈택스 등에서 온라인 신청이 가능해요. 방문 신청은 관할 기관에서 할 수 있어요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>법률</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>가정폭력 이혼 방법: 절차 및 피해자 보호 규정</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>"배우자가 계속 폭력을 휘두르는데 참고만 살 순 없잖아요. 하지만 어떻게 이혼해야 할지, 보호받는 방법은 뭔지 막막하시죠? 가정폭력 이혼 절차와 "</p>
      <p style={body}>배우자가 폭력을 행사하는데 이혼하려면 어떻게 해야 할지 막막하시죠? 가정폭력 이혼 절차와 긴급 신고 방법, 위자료 청구까지 모두 알려드려요</p>
      <Divider /><ArticleAd position="intro" />
      <H2>핵심 정리</H2>
      <GreenBox title="요약">"· 가정폭력은 민법상 이혼 사유로 인정돼요\\n· 긴급전화 1366이나 112로 즉시 신고 가능해요\\n· 증거 확보하면 위자료 1,000만~3,000만원 청구할 수 있어요"</GreenBox>
      <CategoryButton label="법률" count={10} href="/category/%EB%B2%95%EB%A5%A0" />
      <RelatedArticles items={RELATED} />
      <Divider />
      <H2>절차와 방법</H2>
      <p style={body}>아래 순서대로 진행하면 돼요.</p>
      <Steps steps={STEPS} />
      <Divider />
      <H2>알아두면 좋은 것들</H2>
      <BorderBox><strong>참고사항</strong>{"\n"}· 가정폭력은 민법상 이혼 사유로 인정돼요\n· 긴급전화 1366이나 112로 즉시 신고 가능해요\n· 증거 확보하면 위자료 1,000만~3,000만원 청구할 수 있어요</BorderBox>
      <Divider />
      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준으로 작성했어요. 법 개정이나 정책 변경에 따라 내용이 달라질 수 있으니 관련 기관에서 최신 정보를 확인해 주세요." />
    </ArticleLayout>
  );
}
