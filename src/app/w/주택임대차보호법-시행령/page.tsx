"use client";
import { H2, GreenBox, BorderBox, Divider, body, Steps, FAQ, SourceNote, Disclaimer, ArticleLayout, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";

const FAQS = [
  { q: "주택임대차보호법 시행령에 대해 자세히 알 수 있나요?", a: "이 글에서 핵심 내용을 정리했어요. 아래 내용을 참고하세요." },
  { q: "관련 법령은 어디서 확인하나요?", a: "법제처(law.go.kr)에서 관련 법령 원문을 확인할 수 있어요." },
  { q: "더 자세한 상담은 어디서 받나요?", a: "정부 기관 상담센터나 전문가 상담을 이용하세요." },
  { q: "최신 정보는 어디서 확인하나요?", a: "관련 정부 기관 홈페이지에서 최신 내용을 확인할 수 있어요." },
  { q: "온라인으로 신청할 수 있나요?", a: "대부분 정부24(gov.kr)나 관련 기관 홈페이지에서 온라인 신청이 가능해요." }
];

const SOURCES = [
  { name: "- name: 주택임대차보호법 시행령", href: "https://www.law.go.kr/법령/주택임대차보호법시행령" }
];

const RELATED = [
  { slug: "부동산/임대차보호법", title: "- title: 주택임대차보호법", description: "" },
  { slug: "부동산/소액임차인-최우선변제권", title: "소액임차인 최우선변제권", description: "" },
  { slug: "부동산/우선변제권-요건", title: "우선변제권 요건", description: "" }
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
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>주택임대차보호법 시행령</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>""소액임차인 기준이 서울은 1억6500만원이라는데, 이거 어디에 나와 있어요?""</p>
      <p style={body}>소액임차인 기준, 최우선변제금액 등 구체적인 숫자는 시행령에 있어요</p>
      <Divider /><ArticleAd position="intro" />
      <H2>핵심 정리</H2>
      <GreenBox title="요약">"· 시행령은 법의 세부 기준을 정해요. 소액임차인 보증금 기준, 최우선변제금액 등이에요.\\n· 지역별 소액임차인 기준이 달라요. 서울이 가장 높아요.\\n· 시행령은 대통령령으로 법보다 자주 바뀔 수 있어요."</GreenBox>
      <CategoryButton label="부동산" count={10} href="/category/%EB%B6%80%EB%8F%99%EC%82%B0" />
      <RelatedArticles items={RELATED} />
      <Divider />
      <H2>절차와 방법</H2>
      <p style={body}>아래 순서대로 진행하면 돼요.</p>
      <Steps steps={STEPS} />
      <Divider />
      <H2>알아두면 좋은 것들</H2>
      <BorderBox><strong>참고사항</strong>{"\n"}· 시행령은 법의 세부 기준을 정해요. 소액임차인 보증금 기준, 최우선변제금액 등이에요.\n· 지역별 소액임차인 기준이 달라요. 서울이 가장 높아요.\n· 시행령은 대통령령으로 법보다 자주 바뀔 수 있어요.</BorderBox>
      <Divider />
      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준으로 작성했어요. 법 개정이나 정책 변경에 따라 내용이 달라질 수 있으니 관련 기관에서 최신 정보를 확인해 주세요." />
    </ArticleLayout>
  );
}
