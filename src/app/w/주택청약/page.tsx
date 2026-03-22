"use client";
import { H2, GreenBox, BorderBox, Divider, body, Steps, FAQ, SourceNote, Disclaimer, ArticleLayout, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";

const FAQS = [
  { q: "주택청약 가점제 당첨 전략과 청약통장에 대해 자세히 알 수 있나요?", a: "이 글에서 핵심 내용을 정리했어요. 아래 내용을 참고하세요." },
  { q: "관련 법령은 어디서 확인하나요?", a: "법제처(law.go.kr)에서 관련 법령 원문을 확인할 수 있어요." },
  { q: "더 자세한 상담은 어디서 받나요?", a: "정부 기관 상담센터나 전문가 상담을 이용하세요." },
  { q: "최신 정보는 어디서 확인하나요?", a: "관련 정부 기관 홈페이지에서 최신 내용을 확인할 수 있어요." },
  { q: "온라인으로 신청할 수 있나요?", a: "대부분 정부24(gov.kr)나 관련 기관 홈페이지에서 온라인 신청이 가능해요." }
];

const SOURCES = [
  { name: "- name: 청약홈", href: "https://www.applyhome.co.kr" },
  { name: "주택공급에 관한 규칙", href: "https://www.law.go.kr/법령/주택공급에관한규칙" }
];

const RELATED = [
  { slug: "전세자금대출", title: "- title: 전세자금대출", description: "" },
  { slug: "연말정산", title: "연말정산", description: "" }
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
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>주택청약 가점제 당첨 전략과 청약통장</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>"주택청약은 새로 지어지는 아파트를 분양받기 위해 미리 신청하는 제도예요. 청약통장 가입과 일정 자격 조건을 갖추면 신축 아파트 분양에 참여할 수"</p>
      <p style={body}>주택청약 개념부터 청약통장 종류, 가점제와 추첨제, 당첨 전략까지 내 집 마련의 첫걸음이에요</p>
      <Divider /><ArticleAd position="intro" />
      <H2>핵심 정리</H2>
      <GreenBox title="요약">"· 주택청약은 새 아파트를 분양받기 위한 제도예요. 청약통장 가입이 첫 번째 단계예요.\\n· 민영주택은 가점제(85%) + 추첨제(15%)로 당첨자를 선정해요.\\n· 가점 요소는 무주택 기간, 부양가족 수, 청약통장 가입 기간이에요."</GreenBox>
      <CategoryButton label="부동산" count={10} href="/category/%EB%B6%80%EB%8F%99%EC%82%B0" />
      <RelatedArticles items={RELATED} />
      <Divider />
      <H2>절차와 방법</H2>
      <p style={body}>아래 순서대로 진행하면 돼요.</p>
      <Steps steps={STEPS} />
      <Divider />
      <H2>알아두면 좋은 것들</H2>
      <BorderBox><strong>참고사항</strong>{"\n"}· 주택청약은 새 아파트를 분양받기 위한 제도예요. 청약통장 가입이 첫 번째 단계예요.\n· 민영주택은 가점제(85%) + 추첨제(15%)로 당첨자를 선정해요.\n· 가점 요소는 무주택 기간, 부양가족 수, 청약통장 가입 기간이에요.</BorderBox>
      <Divider />
      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준으로 작성했어요. 법 개정이나 정책 변경에 따라 내용이 달라질 수 있으니 관련 기관에서 최신 정보를 확인해 주세요." />
    </ArticleLayout>
  );
}
