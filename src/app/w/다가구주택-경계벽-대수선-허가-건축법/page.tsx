"use client";
import { H2, GreenBox, BorderBox, Divider, body, Steps, FAQ, SourceNote, Disclaimer, ArticleLayout, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";

const FAQS = [
  { q: "다가구주택 경계벽 대수선 허가 건축법 2026에 대해 자세히 알 수 있나요?", a: "이 글에서 핵심 내용을 정리했어요. 아래 내용을 참고하세요." },
  { q: "관련 법령은 어디서 확인하나요?", a: "법제처(law.go.kr)에서 관련 법령 원문을 확인할 수 있어요." },
  { q: "더 자세한 상담은 어디서 받나요?", a: "정부 기관 상담센터나 전문가 상담을 이용하세요." },
  { q: "최신 정보는 어디서 확인하나요?", a: "관련 정부 기관 홈페이지에서 최신 내용을 확인할 수 있어요." },
  { q: "온라인으로 신청할 수 있나요?", a: "대부분 정부24(gov.kr)나 관련 기관 홈페이지에서 온라인 신청이 가능해요." }
];

const SOURCES = [
  { name: "- name: \"건축법 시행령", href: "https://www.law.go.kr/법령/건축법시행령" },
  { name: "건축법 제2조", href: "https://www.law.go.kr/법령/건축법" }
];

const RELATED = [
  { slug: "건축-증축-대수선-허가-신청", title: "- title: \"건축 증축 대수선 허가 신청", description: "" },
  { slug: "개발제한구역-건축-이행강제금-허가-신고", title: "개발제한구역 건축 이행강제금", description: "" },
  { slug: "건물-내진설계-없음-내진보강-지원-신청-조세감면", title: "건물 내진설계 내진보강", description: "" }
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
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>다가구주택 경계벽 대수선 허가 건축법 2026</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>"다가구주택 하나 사서 리모델링하려고 해요. 1층 방 2개를 합쳐서 넓은 거실로 만들고 싶어요. 벽 뚫으면 되는데, 신고만 하면 되나요? 아니면 "</p>
      <p style={body}>다가구주택 가구 간 벽 뚫거나 수리하려고요. 신고만 하면 되나요? 증설·해체는 허가 필요해요.</p>
      <Divider /><ArticleAd position="intro" />
      <H2>핵심 정리</H2>
      <GreenBox title="요약">"· 경계벽 수선만 하면 대수선 신고, 증설·해체·변경은 허가\\n· 지자체마다 해석 다를 수 있으니 사전 확인 필수\\n· 위반 시 이행강제금, 철거 명령 받을 수 있음"</GreenBox>
      <CategoryButton label="부동산" count={10} href="/category/%EB%B6%80%EB%8F%99%EC%82%B0" />
      <RelatedArticles items={RELATED} />
      <Divider />
      <H2>절차와 방법</H2>
      <p style={body}>아래 순서대로 진행하면 돼요.</p>
      <Steps steps={STEPS} />
      <Divider />
      <H2>알아두면 좋은 것들</H2>
      <BorderBox><strong>참고사항</strong>{"\n"}· 경계벽 수선만 하면 대수선 신고, 증설·해체·변경은 허가\n· 지자체마다 해석 다를 수 있으니 사전 확인 필수\n· 위반 시 이행강제금, 철거 명령 받을 수 있음</BorderBox>
      <Divider />
      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준으로 작성했어요. 법 개정이나 정책 변경에 따라 내용이 달라질 수 있으니 관련 기관에서 최신 정보를 확인해 주세요." />
    </ArticleLayout>
  );
}
