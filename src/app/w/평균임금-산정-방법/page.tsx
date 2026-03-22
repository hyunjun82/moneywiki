"use client";
import { H2, GreenBox, BorderBox, Divider, body, Steps, FAQ, SourceNote, Disclaimer, ArticleLayout, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";

const FAQS = [
  { q: "평균임금 산정 방법: 3개월 계산 공식 및 포함 항목에 대해 자세히 알 수 있나요?", a: "이 글에서 핵심 내용을 정리했어요. 아래 내용을 참고하세요." },
  { q: "관련 법령은 어디서 확인하나요?", a: "법제처(law.go.kr)에서 관련 법령 원문을 확인할 수 있어요." },
  { q: "더 자세한 상담은 어디서 받나요?", a: "정부 기관 상담센터나 전문가 상담을 이용하세요." },
  { q: "최신 정보는 어디서 확인하나요?", a: "관련 정부 기관 홈페이지에서 최신 내용을 확인할 수 있어요." },
  { q: "온라인으로 신청할 수 있나요?", a: "대부분 정부24(gov.kr)나 관련 기관 홈페이지에서 온라인 신청이 가능해요." }
];

const SOURCES = [
  { name: "- name: \"근로기준법", href: "https://www.law.go.kr/법령/근로기준법" },
  { name: "고용노동부 평균임금 산정공식", href: "https://www.moel.go.kr/faq/faqView.do?seqRepeat=89" },
  { name: "찾기쉬운 생활법령정보", href: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=1694&ccfNo=1&cciNo=2&cnpClsNo=1" }
];

const RELATED = [
  { slug: "1년미만-퇴직금-지급규정", title: "- title: \"퇴직금 계산 방법", description: "" },
  { slug: "2026년-실업급여", title: "실업급여 수급 조건", description: "" },
  { slug: "2026년-최저임금", title: "최저임금 계산", description: "" }
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
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>평균임금 산정 방법: 3개월 계산 공식 및 포함 항목</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>"퇴직금 받는데 평균임금이 기준이라고 해요. 그런데 어떻게 계산하는지 몰라서 불안하죠? 3개월 임금을 어떻게 계산하는지, 상여금이나 수당은 포함되"</p>
      <p style={body}>퇴직금 받을 때 평균임금이 중요하다는 거 아시나요? 3개월 임금 총액 기준으로 계산하는 방법과 포함되는 항목, 제외되는 기간을 명확히 알려드려요</p>
      <Divider /><ArticleAd position="intro" />
      <H2>핵심 정리</H2>
      <GreenBox title="요약">"· 평균임금은 3개월 임금 총액을 총일수로 나눠요\\n· 퇴직금, 휴업수당, 산재보상 계산 기준이에요\\n· 상여금, 수당 포함하지만 제외 기간 확인 필요해요"</GreenBox>
      <CategoryButton label="근로/노동" count={10} href="/category/%EA%B7%BC%EB%A1%9C%2F%EB%85%B8%EB%8F%99" />
      <RelatedArticles items={RELATED} />
      <Divider />
      <H2>절차와 방법</H2>
      <p style={body}>아래 순서대로 진행하면 돼요.</p>
      <Steps steps={STEPS} />
      <Divider />
      <H2>알아두면 좋은 것들</H2>
      <BorderBox><strong>참고사항</strong>{"\n"}· 평균임금은 3개월 임금 총액을 총일수로 나눠요\n· 퇴직금, 휴업수당, 산재보상 계산 기준이에요\n· 상여금, 수당 포함하지만 제외 기간 확인 필요해요</BorderBox>
      <Divider />
      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준으로 작성했어요. 법 개정이나 정책 변경에 따라 내용이 달라질 수 있으니 관련 기관에서 최신 정보를 확인해 주세요." />
    </ArticleLayout>
  );
}
