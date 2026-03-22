"use client";
import { H2, GreenBox, BorderBox, Divider, body, Steps, FAQ, SourceNote, Disclaimer, ArticleLayout, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";

const FAQS = [
  { q: "이혼 포기 외도 배우자 청구: 이혼청구권 포기 효력 및 위자료 청구 가능성에 대해 자세히 알 수 있나요?", a: "이 글에서 핵심 내용을 정리했어요. 아래 내용을 참고하세요." },
  { q: "관련 법령은 어디서 확인하나요?", a: "법제처(law.go.kr)에서 관련 법령 원문을 확인할 수 있어요." },
  { q: "더 자세한 상담은 어디서 받나요?", a: "정부 기관 상담센터나 전문가 상담을 이용하세요." },
  { q: "최신 정보는 어디서 확인하나요?", a: "관련 정부 기관 홈페이지에서 최신 내용을 확인할 수 있어요." },
  { q: "온라인으로 신청할 수 있나요?", a: "대부분 정부24(gov.kr)나 관련 기관 홈페이지에서 온라인 신청이 가능해요." }
];

const SOURCES = [
  { name: "- name: \"민법", href: "https://law.go.kr/법령/민법" },
  { name: "찾기쉬운 생활법령정보", href: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=233&ccfNo=4&cciNo=1&cnpClsNo=1" },
  { name: "국가법령정보센터 판례", href: "https://www.law.go.kr/LSW/precInfoP.do?precSeq=123125" }
];

const RELATED = [
  { slug: "이혼-청구-외도-책임", title: "- title: \"이혼 청구 외도 책임", description: "" },
  { slug: "협의이혼-절차-방법", title: "협의이혼 절차 방법", description: "" },
  { slug: "이혼-재산분할-협의-불가-대응", title: "이혼 재산분할 협의 불가 대응", description: "" }
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
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>이혼 포기 외도 배우자 청구: 이혼청구권 포기 효력 및 위자료 청구 </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>"배우자가 외도했는데 용서하고 이혼 안 하겠다고 합의서까지 썼어요. 그런데 시간이 지나니 마음이 바뀌었어요. 이혼할 수 있을까요? 이혼청구권 포기"</p>
      <p style={body}>배우자 외도를 용서하고 이혼 안 하겠다고 합의했는데, 나중에 마음이 바뀌면 어떻게 될까요? 이혼청구권 포기 합의의 법적 효력과 위자료 청구 가능성을 알려드려요</p>
      <Divider /><ArticleAd position="intro" />
      <H2>핵심 정리</H2>
      <GreenBox title="요약">"· 이혼 포기 합의는 절대적 구속력이 없어요\\n· 혼인 파탄 시 재판상 이혼 청구 가능해요\\n· 위자료는 이혼 시점부터 3년 이내 청구 가능해요"</GreenBox>
      <CategoryButton label="가정법률" count={10} href="/category/%EA%B0%80%EC%A0%95%EB%B2%95%EB%A5%A0" />
      <RelatedArticles items={RELATED} />
      <Divider />
      <H2>절차와 방법</H2>
      <p style={body}>아래 순서대로 진행하면 돼요.</p>
      <Steps steps={STEPS} />
      <Divider />
      <H2>알아두면 좋은 것들</H2>
      <BorderBox><strong>참고사항</strong>{"\n"}· 이혼 포기 합의는 절대적 구속력이 없어요\n· 혼인 파탄 시 재판상 이혼 청구 가능해요\n· 위자료는 이혼 시점부터 3년 이내 청구 가능해요</BorderBox>
      <Divider />
      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준으로 작성했어요. 법 개정이나 정책 변경에 따라 내용이 달라질 수 있으니 관련 기관에서 최신 정보를 확인해 주세요." />
    </ArticleLayout>
  );
}
