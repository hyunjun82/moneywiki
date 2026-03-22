"use client";
import { H2, GreenBox, BorderBox, Divider, body, Steps, FAQ, SourceNote, Disclaimer, ArticleLayout, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";

const FAQS = [
  { q: "청년 취업연계금·전문자격 육성비에 대해 자세히 알 수 있나요?", a: "이 글에서 핵심 내용을 정리했어요. 아래 내용을 참고하세요." },
  { q: "관련 법령은 어디서 확인하나요?", a: "법제처(law.go.kr)에서 관련 법령 원문을 확인할 수 있어요." },
  { q: "더 자세한 상담은 어디서 받나요?", a: "정부 기관 상담센터나 전문가 상담을 이용하세요." },
  { q: "최신 정보는 어디서 확인하나요?", a: "관련 정부 기관 홈페이지에서 최신 내용을 확인할 수 있어요." },
  { q: "온라인으로 신청할 수 있나요?", a: "대부분 정부24(gov.kr)나 관련 기관 홈페이지에서 온라인 신청이 가능해요." }
];

const SOURCES = [
  { name: "- name: \"고용노동부", href: "https://www.moel.go.kr" },
  { name: "일자리안내 work24", href: "https://www.work24.go.kr" },
  { name: "정부24 청년 취업 지원", href: "https://www.gov.kr" }
];

const RELATED = [
  { slug: "국민취업지원제도", title: "- title: \"국민취업지원제도", description: "" },
  { slug: "실업급여-수급조건", title: "실업급여 수급조건", description: "" },
  { slug: "청년도약계좌", title: "청년도약계좌", description: "" }
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
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>청년 취업연계금·전문자격 육성비</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>"졸업하고 첫 직장을 시작하는 청년들 모두가 안정적이지는 않아요. 초봉이 낮으면 월세 내기도 빠듯하고, 생활비로 일을 그만두는 경우도 많아요. 정"</p>
      <p style={body}>청년이 취업하면 정부에서 월 50만 원씩 최대 6개월간 취업연계금을 지원해요. 자격증 시험비도 받을 수 있어요.</p>
      <Divider /><ArticleAd position="intro" />
      <H2>핵심 정리</H2>
      <GreenBox title="요약">"· 청년이 취업하면 월 50만 원씩 최대 6개월간 취업연계금을 받을 수 있어요\\n· 국민취업지원제도에서 신청 후 빠르면 1주일 내 지급받을 수 있어요\\n· 자격증 시험비, 자격증 발급비, 교육훈련 비용도 국가가 지원해 줘요"</GreenBox>
      <CategoryButton label="근로/노동" count={10} href="/category/%EA%B7%BC%EB%A1%9C%2F%EB%85%B8%EB%8F%99" />
      <RelatedArticles items={RELATED} />
      <Divider />
      <H2>절차와 방법</H2>
      <p style={body}>아래 순서대로 진행하면 돼요.</p>
      <Steps steps={STEPS} />
      <Divider />
      <H2>알아두면 좋은 것들</H2>
      <BorderBox><strong>참고사항</strong>{"\n"}· 청년이 취업하면 월 50만 원씩 최대 6개월간 취업연계금을 받을 수 있어요\n· 국민취업지원제도에서 신청 후 빠르면 1주일 내 지급받을 수 있어요\n· 자격증 시험비, 자격증 발급비, 교육훈련 비용도 국가가 지원해 줘요</BorderBox>
      <Divider />
      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준으로 작성했어요. 법 개정이나 정책 변경에 따라 내용이 달라질 수 있으니 관련 기관에서 최신 정보를 확인해 주세요." />
    </ArticleLayout>
  );
}
