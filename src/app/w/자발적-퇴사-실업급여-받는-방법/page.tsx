"use client";
import { H2, GreenBox, BorderBox, Divider, body, Steps, FAQ, SourceNote, Disclaimer, ArticleLayout, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";

const FAQS = [
  { q: "자발적 퇴사 실업급여: 정당한 사유 인정 및 신청 방법에 대해 자세히 알 수 있나요?", a: "이 글에서 핵심 내용을 정리했어요. 아래 내용을 참고하세요." },
  { q: "관련 법령은 어디서 확인하나요?", a: "법제처(law.go.kr)에서 관련 법령 원문을 확인할 수 있어요." },
  { q: "더 자세한 상담은 어디서 받나요?", a: "정부 기관 상담센터나 전문가 상담을 이용하세요." },
  { q: "최신 정보는 어디서 확인하나요?", a: "관련 정부 기관 홈페이지에서 최신 내용을 확인할 수 있어요." },
  { q: "온라인으로 신청할 수 있나요?", a: "대부분 정부24(gov.kr)나 관련 기관 홈페이지에서 온라인 신청이 가능해요." }
];

const SOURCES = [
  { name: "- name: \"고용보험법", href: "https://www.law.go.kr/법령/고용보험법" },
  { name: "고용24", href: "https://www.ei.go.kr" },
  { name: "고용노동부", href: "https://www.moel.go.kr" }
];

const RELATED = [
  { slug: "실업급여-수급자격", title: "- title: \"실업급여 수급자격", description: "" },
  { slug: "실업급여-신청방법", title: "실업급여 신청방법", description: "" },
  { slug: "권고사직-실업급여", title: "권고사직 실업급여", description: "" }
];

const STEPS = [
  { title: "관련 정보를 확인하세요", desc: "정부 기관 홈페이지나 법제처에서 최신 기준을 확인할 수 있어요." },
  { title: "필요한 서류를 준비하세요", desc: "신분증과 관련 서류를 미리 준비하면 절차가 빠르게 진행돼요." },
  { title: "온라인 또는 방문 신청하세요", desc: "정부24, 홈택스 등에서 온라인 신청이 가능해요. 방문 신청은 관할 기관에서 할 수 있어요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>고용</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>자발적 퇴사 실업급여: 정당한 사유 인정 및 신청 방법</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>"내가 그만둔 건데 실업급여 받을 수 있을까 궁금하시죠? 정당한 이직 사유가 있으면 자발적 퇴사도 실업급여 받을 수 있어요."</p>
      <p style={body}>자발적 퇴사해도 실업급여 받을 수 있는지 궁금하시죠? 정당한 사유가 있으면 받을 수 있어요.</p>
      <Divider /><ArticleAd position="intro" />
      <H2>핵심 정리</H2>
      <GreenBox title="요약">"· 정당한 이직 사유가 있으면 자발적 퇴사도 실업급여 받을 수 있어요.\\n· 2026년 3월 31일부터 만 18-34세 청년의 커리어 전환 목적 퇴사도 생애 1회 인정돼요.\\n· 증빙서류를 퇴사 전에 미리 모아두고 고용센터에 제출해야 인정받을 수 있어요."</GreenBox>
      <CategoryButton label="고용" count={10} href="/category/%EA%B3%A0%EC%9A%A9" />
      <RelatedArticles items={RELATED} />
      <Divider />
      <H2>절차와 방법</H2>
      <p style={body}>아래 순서대로 진행하면 돼요.</p>
      <Steps steps={STEPS} />
      <Divider />
      <H2>알아두면 좋은 것들</H2>
      <BorderBox><strong>참고사항</strong>{"\n"}· 정당한 이직 사유가 있으면 자발적 퇴사도 실업급여 받을 수 있어요.\n· 2026년 3월 31일부터 만 18-34세 청년의 커리어 전환 목적 퇴사도 생애 1회 인정돼요.\n· 증빙서류를 퇴사 전에 미리 모아두고 고용센터에 제출해야 인정받을 수 있어요.</BorderBox>
      <Divider />
      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준으로 작성했어요. 법 개정이나 정책 변경에 따라 내용이 달라질 수 있으니 관련 기관에서 최신 정보를 확인해 주세요." />
    </ArticleLayout>
  );
}
