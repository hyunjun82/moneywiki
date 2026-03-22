"use client";
import { H2, GreenBox, BorderBox, Divider, body, Steps, FAQ, SourceNote, Disclaimer, ArticleLayout, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";

const FAQS = [
  { q: "퇴직연금 기금화 제도 및 수익률 개선 방법에 대해 자세히 알 수 있나요?", a: "이 글에서 핵심 내용을 정리했어요. 아래 내용을 참고하세요." },
  { q: "관련 법령은 어디서 확인하나요?", a: "법제처(law.go.kr)에서 관련 법령 원문을 확인할 수 있어요." },
  { q: "더 자세한 상담은 어디서 받나요?", a: "정부 기관 상담센터나 전문가 상담을 이용하세요." },
  { q: "최신 정보는 어디서 확인하나요?", a: "관련 정부 기관 홈페이지에서 최신 내용을 확인할 수 있어요." },
  { q: "온라인으로 신청할 수 있나요?", a: "대부분 정부24(gov.kr)나 관련 기관 홈페이지에서 온라인 신청이 가능해요." }
];

const SOURCES = [
  { name: "- name: \"근로자퇴직급여 보장법", href: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
  { name: "고용노동부 퇴직연금 정책", href: "https://www.moel.go.kr" }
];

const RELATED = [
  { slug: "퇴직연금-DB형-DC형-차이-수령액-운용-비교", title: "- title: \"퇴직연금 DB형과 DC형 비교", description: "" },
  { slug: "퇴직연금-운용-방법-ETF-펀드-선택-전략", title: "퇴직연금 운용 방법", description: "" },
  { slug: "퇴직연금-수령-일시금-연금-비교", title: "퇴직연금 수령 방법", description: "" }
];

const STEPS = [
  { title: "관련 정보를 확인하세요", desc: "정부 기관 홈페이지나 법제처에서 최신 기준을 확인할 수 있어요." },
  { title: "필요한 서류를 준비하세요", desc: "신분증과 관련 서류를 미리 준비하면 절차가 빠르게 진행돼요." },
  { title: "온라인 또는 방문 신청하세요", desc: "정부24, 홈택스 등에서 온라인 신청이 가능해요. 방문 신청은 관할 기관에서 할 수 있어요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로/노동</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>퇴직연금 기금화 제도 및 수익률 개선 방법</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>"퇴직연금 432조원을 국민연금처럼 통합 운용한다고요? 2026년 1월 정부 발표를 앞두고 논란이 커지고 있어요. 수익률을 3배 올린다는데 개인 "</p>
      <p style={body}>퇴직연금 기금화는 국민연금처럼 통합 운용하는 제도예요. 수익률 개선 vs 선택권 박탈 논란 정리해드려요.</p>
      <Divider /><ArticleAd position="intro" />
      <H2>핵심 정리</H2>
      <GreenBox title="요약">"· 퇴직연금 기금화는 432조원을 국민연금처럼 통합 운용해 수익률 높이는 제도\\n· 현재 평균 수익률 2.86%를 국민연금 수준 8%로 올리는 게 목표지만 선택권 논란\\n· 2026년 1월 정부 발표 예정이며 의무화 vs 선택제 중심으로 노사정 협의 중"</GreenBox>
      <CategoryButton label="근로/노동" count={10} href="/category/%EA%B7%BC%EB%A1%9C%2F%EB%85%B8%EB%8F%99" />
      <RelatedArticles items={RELATED} />
      <Divider />
      <H2>절차와 방법</H2>
      <p style={body}>아래 순서대로 진행하면 돼요.</p>
      <Steps steps={STEPS} />
      <Divider />
      <H2>알아두면 좋은 것들</H2>
      <BorderBox><strong>참고사항</strong>{"\n"}· 퇴직연금 기금화는 432조원을 국민연금처럼 통합 운용해 수익률 높이는 제도\n· 현재 평균 수익률 2.86%를 국민연금 수준 8%로 올리는 게 목표지만 선택권 논란\n· 2026년 1월 정부 발표 예정이며 의무화 vs 선택제 중심으로 노사정 협의 중</BorderBox>
      <Divider />
      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준으로 작성했어요. 법 개정이나 정책 변경에 따라 내용이 달라질 수 있으니 관련 기관에서 최신 정보를 확인해 주세요." />
    </ArticleLayout>
  );
}
