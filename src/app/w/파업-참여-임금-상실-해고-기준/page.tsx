"use client";
import { H2, GreenBox, BorderBox, Divider, body, Steps, FAQ, SourceNote, Disclaimer, ArticleLayout, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";

const FAQS = [
  { q: "파업 참여·임금 상실·해고 기준 알아보기에 대해 자세히 알 수 있나요?", a: "이 글에서 핵심 내용을 정리했어요. 아래 내용을 참고하세요." },
  { q: "관련 법령은 어디서 확인하나요?", a: "법제처(law.go.kr)에서 관련 법령 원문을 확인할 수 있어요." },
  { q: "더 자세한 상담은 어디서 받나요?", a: "정부 기관 상담센터나 전문가 상담을 이용하세요." },
  { q: "최신 정보는 어디서 확인하나요?", a: "관련 정부 기관 홈페이지에서 최신 내용을 확인할 수 있어요." },
  { q: "온라인으로 신청할 수 있나요?", a: "대부분 정부24(gov.kr)나 관련 기관 홈페이지에서 온라인 신청이 가능해요." }
];

const SOURCES = [
  { name: "- name: \"노동조합및노동관계조정법 제44조", href: "https://www.law.go.kr/lsLinkProc.do?lsNm=%EB%85%B8%EB%8F%99%EC%A1%B0%ED%95%A9+%EB%B0%8F+%EB%85%B8%EB%8F%99%EA%B4%80%EA%B3%84%EC%A1%B0%EC%A0%95%EB%B2%95&lsId=61380" },
  { name: "근로기준법 제23조", href: "https://www.law.go.kr/lsLinkProc.do?lsNm=%EA%B7%BC%EB%A1%9C%EA%B8%B0%EC%A4%80%EB%B2%95&lsId=61380&chrClsCd=010202&joNo=002300000" }
];

const RELATED = [
  { slug: "단체협약-기준-체결-절차-이행-보장", title: "- title: \"단체협약 기준·체결 절차·이행 보장", description: "" },
  { slug: "부당해고-구제-절차-복직-조건", title: "부당해고 구제 절차 및 복직 조건", description: "" }
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
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>파업 참여·임금 상실·해고 기준 알아보기</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>"파업이라고 하면 좀 낯설 수 있어요. "파업하면 임금을 못 받는다고 하던데, 정말인가요?" 이런 질문을 많이 받아요. 맞아요. 파업 중에는 임금"</p>
      <p style={body}>파업에 참여하면 임금을 못 받아요. 하지만 조건이 있어요. 해고될 수 있는 경우와 보호받는 경우를 구분해서 설명해드릴게요.</p>
      <Divider /><ArticleAd position="intro" />
      <H2>핵심 정리</H2>
      <GreenBox title="요약">"· 파업 중에는 '무노동 무임금' 원칙에 따라 임금을 받지 못해요\\n· 다만 법정 휴일·휴가는 근무한 것으로 봐서 휴가 계산에 포함돼요\\n· 파업 참여만으로 해고될 수 없어요. 정당한 이유가 필요해요"</GreenBox>
      <CategoryButton label="근로/노동" count={10} href="/category/%EA%B7%BC%EB%A1%9C%2F%EB%85%B8%EB%8F%99" />
      <RelatedArticles items={RELATED} />
      <Divider />
      <H2>절차와 방법</H2>
      <p style={body}>아래 순서대로 진행하면 돼요.</p>
      <Steps steps={STEPS} />
      <Divider />
      <H2>알아두면 좋은 것들</H2>
      <BorderBox><strong>참고사항</strong>{"\n"}· 파업 중에는 '무노동 무임금' 원칙에 따라 임금을 받지 못해요\n· 다만 법정 휴일·휴가는 근무한 것으로 봐서 휴가 계산에 포함돼요\n· 파업 참여만으로 해고될 수 없어요. 정당한 이유가 필요해요</BorderBox>
      <Divider />
      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준으로 작성했어요. 법 개정이나 정책 변경에 따라 내용이 달라질 수 있으니 관련 기관에서 최신 정보를 확인해 주세요." />
    </ArticleLayout>
  );
}
