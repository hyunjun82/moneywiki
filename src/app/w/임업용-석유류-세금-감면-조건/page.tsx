"use client";
import { H2, GreenBox, BorderBox, Divider, body, Steps, FAQ, SourceNote, Disclaimer, ArticleLayout, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";

const FAQS = [
  { q: "임업용 석유류 세금 감면 조건에 대해 자세히 알 수 있나요?", a: "이 글에서 핵심 내용을 정리했어요. 아래 내용을 참고하세요." },
  { q: "관련 법령은 어디서 확인하나요?", a: "법제처(law.go.kr)에서 관련 법령 원문을 확인할 수 있어요." },
  { q: "더 자세한 상담은 어디서 받나요?", a: "정부 기관 상담센터나 전문가 상담을 이용하세요." },
  { q: "최신 정보는 어디서 확인하나요?", a: "관련 정부 기관 홈페이지에서 최신 내용을 확인할 수 있어요." },
  { q: "온라인으로 신청할 수 있나요?", a: "대부분 정부24(gov.kr)나 관련 기관 홈페이지에서 온라인 신청이 가능해요." }
];

const SOURCES = [
  { name: "- name: \"조세특례제한법", href: "https://www.law.go.kr/법령/조세특례제한법" },
  { name: "교통·에너지·환경세법", href: "https://www.law.go.kr/법령/교통·에너지·환경세법" },
  { name: "찾기쉬운 생활법령정보", href: "https://www.easylaw.go.kr" }
];

const RELATED = [
  { slug: "연말정산", title: "연말정산 가이드", description: "연말정산 절차 정리." }
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
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>임업용 석유류 세금 감면 조건</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>"산에서 나무를 기르거나 임산물을 재배하시는 분들은 유류비 부담이 크죠. 산림 작업에 사용하는 기계나 차량에 들어가는 경유, 휘발유 값이 만만치 "</p>
      <p style={body}>산림 사업에 사용하는 석유류 세금을 감면받는 방법과 조건을 알려드려요</p>
      <Divider /><ArticleAd position="intro" />
      <H2>핵심 정리</H2>
      <GreenBox title="요약">"· 임업 경영에 직접 사용하는 석유류는 교통·에너지·환경세와 개별소비세를 면제받을 수 있어요\\n· 산림청장이 발급한 임업용 석유류 공급카드가 있어야 면세 적용을 받아요\\n· 조림, 숲 가꾸기, 임산물 재배 등 산림 사업에 사용할 때만 해당돼요"</GreenBox>
      <CategoryButton label="금융" count={10} href="/category/%EA%B8%88%EC%9C%B5" />
      <RelatedArticles items={RELATED} />
      <Divider />
      <H2>절차와 방법</H2>
      <p style={body}>아래 순서대로 진행하면 돼요.</p>
      <Steps steps={STEPS} />
      <Divider />
      <H2>알아두면 좋은 것들</H2>
      <BorderBox><strong>참고사항</strong>{"\n"}· 임업 경영에 직접 사용하는 석유류는 교통·에너지·환경세와 개별소비세를 면제받을 수 있어요\n· 산림청장이 발급한 임업용 석유류 공급카드가 있어야 면세 적용을 받아요\n· 조림, 숲 가꾸기, 임산물 재배 등 산림 사업에 사용할 때만 해당돼요</BorderBox>
      <Divider />
      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준으로 작성했어요. 법 개정이나 정책 변경에 따라 내용이 달라질 수 있으니 관련 기관에서 최신 정보를 확인해 주세요." />
    </ArticleLayout>
  );
}
