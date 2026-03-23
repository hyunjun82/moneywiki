"use client";
import { H2, GreenBox, BorderBox, Divider, body, Steps, FAQ, SourceNote, Disclaimer, ArticleLayout, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";

const FAQS = [
  { q: "임대차 건물 양도 임대인 지위 승계 2026에 대해 자세히 알 수 있나요?", a: "이 글에서 핵심 내용을 정리했어요. 아래 내용을 참고하세요." },
  { q: "관련 법령은 어디서 확인하나요?", a: "법제처(law.go.kr)에서 관련 법령 원문을 확인할 수 있어요." },
  { q: "더 자세한 상담은 어디서 받나요?", a: "정부 기관 상담센터나 전문가 상담을 이용하세요." },
  { q: "최신 정보는 어디서 확인하나요?", a: "관련 정부 기관 홈페이지에서 최신 내용을 확인할 수 있어요." },
  { q: "온라인으로 신청할 수 있나요?", a: "대부분 정부24(gov.kr)나 관련 기관 홈페이지에서 온라인 신청이 가능해요." }
];

const SOURCES = [
  { name: "- name: \"주택임대차보호법", href: "https://www.law.go.kr/법령/주택임대차보호법" },
  { name: "상가건물임대차보호법", href: "https://www.law.go.kr/법령/상가건물임대차보호법" }
];

const RELATED = [
  { slug: "임대인-변경-대항력-우선변제권-유지", title: "- title: \"임대인 변경 대항력", description: "" },
  { slug: "전세-보증금-반환-청구-절차", title: "전세 보증금 반환 청구", description: "" },
  { slug: "계약갱신청구권-행사-방법-절차", title: "계약갱신청구권 행사", description: "" }
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
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>임대차 건물 양도 임대인 지위 승계 2026</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>"건물 하나 사서 세 주고 있는데, 팔려고 해요. 근데 세입자가 3명이나 살고 있어요. 건물 팔면 세입자한테 뭐라고 해야 하나요? 보증금은 누가 "</p>
      <p style={body}>임대 중인 건물 팔았어요. 세입자한테 통보해야 하나요? 새 주인이 자동으로 임대인 돼요.</p>
      <Divider /><ArticleAd position="intro" />
      <H2>핵심 정리</H2>
      <GreenBox title="요약">"· 건물 양도 시 임대인 지위 자동 승계, 임차인 동의 불필요\\n· 보증금 반환 의무, 월세 수령 권리 모두 양수인에게 이전\\n· 임차인이 이의 제기하면 양도인이 보증금 반환 책임"</GreenBox>
      <CategoryButton label="부동산" count={10} href="/category/%EB%B6%80%EB%8F%99%EC%82%B0" />
      <RelatedArticles items={RELATED} />
      <Divider />
      <H2>절차와 방법</H2>
      <p style={body}>아래 순서대로 진행하면 돼요.</p>
      <Steps steps={STEPS} />
      <Divider />
      <H2>알아두면 좋은 것들</H2>
      <BorderBox><strong>참고사항</strong>{"\n"}· 건물 양도 시 임대인 지위 자동 승계, 임차인 동의 불필요\n· 보증금 반환 의무, 월세 수령 권리 모두 양수인에게 이전\n· 임차인이 이의 제기하면 양도인이 보증금 반환 책임</BorderBox>
      <Divider />
      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준으로 작성했어요. 법 개정이나 정책 변경에 따라 내용이 달라질 수 있으니 관련 기관에서 최신 정보를 확인해 주세요." />
    </ArticleLayout>
  );
}
