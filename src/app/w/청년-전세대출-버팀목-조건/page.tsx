"use client";
import { H2, GreenBox, BorderBox, Divider, body, Steps, FAQ, SourceNote, Disclaimer, ArticleLayout, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";

const FAQS = [
  { q: "청년 전세대출 버팀목 조건 한도에 대해 자세히 알 수 있나요?", a: "이 글에서 핵심 내용을 정리했어요. 아래 내용을 참고하세요." },
  { q: "관련 법령은 어디서 확인하나요?", a: "법제처(law.go.kr)에서 관련 법령 원문을 확인할 수 있어요." },
  { q: "더 자세한 상담은 어디서 받나요?", a: "정부 기관 상담센터나 전문가 상담을 이용하세요." },
  { q: "최신 정보는 어디서 확인하나요?", a: "관련 정부 기관 홈페이지에서 최신 내용을 확인할 수 있어요." },
  { q: "온라인으로 신청할 수 있나요?", a: "대부분 정부24(gov.kr)나 관련 기관 홈페이지에서 온라인 신청이 가능해요." }
];

const SOURCES = [
  { name: "- name: \"주택도시기금 청년 버팀목 전세대출", href: "https://www.myhome.go.kr" },
  { name: "한국주택금융공사 청년 대출 안내", href: "https://www.hf.go.kr" }
];

const RELATED = [
  { slug: "신혼부부-전세대출-한도-금리", title: "- title: \"신혼부부 전세대출 조건", description: "" },
  { slug: "전세보증보험-가입-방법", title: "전세보증보험 가입", description: "" }
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
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>청년 전세대출 버팀목 조건 한도</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>"사회 초년생이 전세 얻으려면 목돈이 필요한데 모으기 쉽지 않죠. 부모님 도움 받기도 부담스럽고요. 청년 버팀목 전세대출은 이런 청년들을 위한 정"</p>
      <p style={body}>청년 혼자 전세 얻으려니 대출이 막막하시죠? 버팀목 전세대출 조건부터 한도, 금리까지 청년이라면 꼭 알아야 할 내용 정리해드릴게요.</p>
      <Divider /><ArticleAd position="intro" />
      <H2>핵심 정리</H2>
      <GreenBox title="요약">"· 만 19~34세 무주택 청년 대상, 부부합산 연소득 5천만원 이하 조건\\n· 전용면적 85㎡ 이하 보증금 3억 이하 주택에 최대 1.5억원 한도\\n· 기본금리 연 2.2~3.3%에 청년가구 우대금리 0.3%p 적용"</GreenBox>
      <CategoryButton label="금융" count={10} href="/category/%EA%B8%88%EC%9C%B5" />
      <RelatedArticles items={RELATED} />
      <Divider />
      <H2>절차와 방법</H2>
      <p style={body}>아래 순서대로 진행하면 돼요.</p>
      <Steps steps={STEPS} />
      <Divider />
      <H2>알아두면 좋은 것들</H2>
      <BorderBox><strong>참고사항</strong>{"\n"}· 만 19~34세 무주택 청년 대상, 부부합산 연소득 5천만원 이하 조건\n· 전용면적 85㎡ 이하 보증금 3억 이하 주택에 최대 1.5억원 한도\n· 기본금리 연 2.2~3.3%에 청년가구 우대금리 0.3%p 적용</BorderBox>
      <Divider />
      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준으로 작성했어요. 법 개정이나 정책 변경에 따라 내용이 달라질 수 있으니 관련 기관에서 최신 정보를 확인해 주세요." />
    </ArticleLayout>
  );
}
