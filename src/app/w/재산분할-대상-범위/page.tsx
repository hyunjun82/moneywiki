"use client";
import { H2, GreenBox, BorderBox, Divider, body, Steps, FAQ, SourceNote, Disclaimer, ArticleLayout, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";

const FAQS = [
  { q: "재산분할 대상 범위: 포함 자산 및 기준 완벽 정리에 대해 자세히 알 수 있나요?", a: "이 글에서 핵심 내용을 정리했어요. 아래 내용을 참고하세요." },
  { q: "관련 법령은 어디서 확인하나요?", a: "법제처(law.go.kr)에서 관련 법령 원문을 확인할 수 있어요." },
  { q: "더 자세한 상담은 어디서 받나요?", a: "정부 기관 상담센터나 전문가 상담을 이용하세요." },
  { q: "최신 정보는 어디서 확인하나요?", a: "관련 정부 기관 홈페이지에서 최신 내용을 확인할 수 있어요." },
  { q: "온라인으로 신청할 수 있나요?", a: "대부분 정부24(gov.kr)나 관련 기관 홈페이지에서 온라인 신청이 가능해요." }
];

const SOURCES = [
  { name: "- name: \"찾기쉬운 생활법령정보", href: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=233&ccfNo=4&cciNo=2&cnpClsNo=2" },
  { name: "민법", href: "https://www.law.go.kr/법령/민법" }
];

const RELATED = [
  { slug: "재산분할-법원-비율-기준", title: "- title: \"재산분할 법원 비율 기준", description: "" },
  { slug: "이혼-재산분할-협의-불가-대응", title: "이혼 재산분할 협의 불가 대응", description: "" },
  { slug: "재산분할-청구권-소멸시효", title: "재산분할 청구권 소멸시효", description: "" }
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
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>재산분할 대상 범위: 포함 자산 및 기준 완벽 정리</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>"이혼하려고 하는데 재산을 어떻게 나눠야 할지 막막하죠? 집도 있고 예금도 있는데 뭘 나눌 수 있는지 헷갈려요. 재산분할 대상이 뭔지, 어떤 기준"</p>
      <p style={body}>이혼할 때 나눌 수 있는 재산이 뭔지 알려드려요. 혼인 중 모은 재산은 전부 대상이고, 상속받은 재산은 원칙적으로 제외되지만 예외도 있어요</p>
      <Divider /><ArticleAd position="intro" />
      <H2>핵심 정리</H2>
      <GreenBox title="요약">"· 혼인 중 함께 모은 재산은 전부 재산분할 대상이에요\\n· 상속·증여받은 재산은 원칙적으로 제외되지만 배우자가 유지·증가에 기여했으면 포함돼요\\n· 혼인 중 생긴 빚도 공동재산 형성 관련이면 나눠져요"</GreenBox>
      <CategoryButton label="가정법률" count={10} href="/category/%EA%B0%80%EC%A0%95%EB%B2%95%EB%A5%A0" />
      <RelatedArticles items={RELATED} />
      <Divider />
      <H2>절차와 방법</H2>
      <p style={body}>아래 순서대로 진행하면 돼요.</p>
      <Steps steps={STEPS} />
      <Divider />
      <H2>알아두면 좋은 것들</H2>
      <BorderBox><strong>참고사항</strong>{"\n"}· 혼인 중 함께 모은 재산은 전부 재산분할 대상이에요\n· 상속·증여받은 재산은 원칙적으로 제외되지만 배우자가 유지·증가에 기여했으면 포함돼요\n· 혼인 중 생긴 빚도 공동재산 형성 관련이면 나눠져요</BorderBox>
      <Divider />
      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준으로 작성했어요. 법 개정이나 정책 변경에 따라 내용이 달라질 수 있으니 관련 기관에서 최신 정보를 확인해 주세요." />
    </ArticleLayout>
  );
}
