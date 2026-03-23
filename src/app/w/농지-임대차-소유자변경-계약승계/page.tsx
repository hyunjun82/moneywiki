"use client";
import { H2, GreenBox, BorderBox, Divider, body, Steps, FAQ, SourceNote, Disclaimer, ArticleLayout, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";

const FAQS = [
  { q: "농지 임대차 소유자 변경 계약 승계에 대해 자세히 알 수 있나요?", a: "이 글에서 핵심 내용을 정리했어요. 아래 내용을 참고하세요." },
  { q: "관련 법령은 어디서 확인하나요?", a: "법제처(law.go.kr)에서 관련 법령 원문을 확인할 수 있어요." },
  { q: "더 자세한 상담은 어디서 받나요?", a: "정부 기관 상담센터나 전문가 상담을 이용하세요." },
  { q: "최신 정보는 어디서 확인하나요?", a: "관련 정부 기관 홈페이지에서 최신 내용을 확인할 수 있어요." },
  { q: "온라인으로 신청할 수 있나요?", a: "대부분 정부24(gov.kr)나 관련 기관 홈페이지에서 온라인 신청이 가능해요." }
];

const SOURCES = [
  { name: "- name: \"민법", href: "https://www.law.go.kr/법령/민법" },
  { name: "농지법", href: "https://www.law.go.kr/법령/농지법" }
];

const RELATED = [
  { slug: "농지-타용도-일시사용허가-농지복구", title: "- title: \"농지 타용도 일시사용", description: "" },
  { slug: "농지-처분명령-불이행", title: "농지 처분명령", description: "" },
  { slug: "주택임대차-승계", title: "주택임대차 승계", description: "" }
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
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>농지 임대차 소유자 변경 계약 승계</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>"3년 전부터 밭을 빌려서 농사짓고 있는데 땅 주인이 바뀌었다고 연락이 왔어요. 새 주인이 나가라고 하면 어떡하죠? 계약은 아직 1년이나 남았는데"</p>
      <p style={body}>농사짓던 땅 주인이 바뀌었다고요? 임대차계약이 어떻게 되는지, 계속 농사지을 수 있는지 알려드려요.</p>
      <Divider /><ArticleAd position="intro" />
      <H2>핵심 정리</H2>
      <GreenBox title="요약">"· 농지 소유자가 바뀌어도 임대차계약은 계속 유지돼요\\n· 새 소유자가 임대인 지위를 자동으로 승계해요\\n· 대항력을 갖추면 계약 기간 동안 경작권이 보호돼요"</GreenBox>
      <CategoryButton label="부동산" count={10} href="/category/%EB%B6%80%EB%8F%99%EC%82%B0" />
      <RelatedArticles items={RELATED} />
      <Divider />
      <H2>절차와 방법</H2>
      <p style={body}>아래 순서대로 진행하면 돼요.</p>
      <Steps steps={STEPS} />
      <Divider />
      <H2>알아두면 좋은 것들</H2>
      <BorderBox><strong>참고사항</strong>{"\n"}· 농지 소유자가 바뀌어도 임대차계약은 계속 유지돼요\n· 새 소유자가 임대인 지위를 자동으로 승계해요\n· 대항력을 갖추면 계약 기간 동안 경작권이 보호돼요</BorderBox>
      <Divider />
      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준으로 작성했어요. 법 개정이나 정책 변경에 따라 내용이 달라질 수 있으니 관련 기관에서 최신 정보를 확인해 주세요." />
    </ArticleLayout>
  );
}
