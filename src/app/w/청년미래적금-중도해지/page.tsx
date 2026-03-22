"use client";
import { H2, GreenBox, BorderBox, Divider, body, Steps, FAQ, SourceNote, Disclaimer, ArticleLayout, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";

const FAQS = [
  { q: "청년미래적금 중도해지 시 기여금 반환과 이자 손실에 대해 자세히 알 수 있나요?", a: "이 글에서 핵심 내용을 정리했어요. 아래 내용을 참고하세요." },
  { q: "관련 법령은 어디서 확인하나요?", a: "법제처(law.go.kr)에서 관련 법령 원문을 확인할 수 있어요." },
  { q: "더 자세한 상담은 어디서 받나요?", a: "정부 기관 상담센터나 전문가 상담을 이용하세요." },
  { q: "최신 정보는 어디서 확인하나요?", a: "관련 정부 기관 홈페이지에서 최신 내용을 확인할 수 있어요." },
  { q: "온라인으로 신청할 수 있나요?", a: "대부분 정부24(gov.kr)나 관련 기관 홈페이지에서 온라인 신청이 가능해요." }
];

const SOURCES = [
  { name: "- name: \"기획재정부", href: "https://www.moef.go.kr" },
  { name: "금융위원회", href: "https://www.fsc.go.kr" }
];

const RELATED = [
  { slug: "청년미래적금-가입방법", title: "- title: \"청년미래적금 가입방법", description: "" },
  { slug: "청년미래적금-자격조건", title: "청년미래적금 자격조건", description: "" },
  { slug: "청년미래적금-기여금", title: "청년미래적금 기여금", description: "" }
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
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>청년미래적금 중도해지 시 기여금 반환과 이자 손실</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>"청년미래적금 가입했는데 급하게 돈 필요하면 어떡하나요? 결론부터 말하면 **중도해지는 가능하지만 기여금을 일부만 받거나 못 받아요**. 1년 미"</p>
      <p style={body}>청년미래적금 중도해지하면 기여금 일부만 받거나 못 받아요. 1년 미만 0%, 2년 미만 50%, 3년 만기 100%예요.</p>
      <Divider /><ArticleAd position="intro" />
      <H2>핵심 정리</H2>
      <GreenBox title="요약">"· 중도해지는 가능하지만 기여금 일부만 받거나 못 받아요\\n· 1년 미만 0%, 1~2년 50%, 2~3년 70%, 만기 100%예요\\n· 이자도 일반 적금 수준으로 깎여서 손해가 커요"</GreenBox>
      <CategoryButton label="금융" count={10} href="/category/%EA%B8%88%EC%9C%B5" />
      <RelatedArticles items={RELATED} />
      <Divider />
      <H2>절차와 방법</H2>
      <p style={body}>아래 순서대로 진행하면 돼요.</p>
      <Steps steps={STEPS} />
      <Divider />
      <H2>알아두면 좋은 것들</H2>
      <BorderBox><strong>참고사항</strong>{"\n"}· 중도해지는 가능하지만 기여금 일부만 받거나 못 받아요\n· 1년 미만 0%, 1~2년 50%, 2~3년 70%, 만기 100%예요\n· 이자도 일반 적금 수준으로 깎여서 손해가 커요</BorderBox>
      <Divider />
      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준으로 작성했어요. 법 개정이나 정책 변경에 따라 내용이 달라질 수 있으니 관련 기관에서 최신 정보를 확인해 주세요." />
    </ArticleLayout>
  );
}
