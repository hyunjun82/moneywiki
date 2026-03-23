"use client";
import { H2, GreenBox, BorderBox, Divider, body, Steps, FAQ, SourceNote, Disclaimer, ArticleLayout, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";

const FAQS = [
  { q: "연말정산 이직자와 퇴사자 정산 방법에 대해 자세히 알 수 있나요?", a: "이 글에서 핵심 내용을 정리했어요. 아래 내용을 참고하세요." },
  { q: "관련 법령은 어디서 확인하나요?", a: "법제처(law.go.kr)에서 관련 법령 원문을 확인할 수 있어요." },
  { q: "더 자세한 상담은 어디서 받나요?", a: "정부 기관 상담센터나 전문가 상담을 이용하세요." },
  { q: "최신 정보는 어디서 확인하나요?", a: "관련 정부 기관 홈페이지에서 최신 내용을 확인할 수 있어요." },
  { q: "온라인으로 신청할 수 있나요?", a: "대부분 정부24(gov.kr)나 관련 기관 홈페이지에서 온라인 신청이 가능해요." }
];

const SOURCES = [
  { name: "- name: \"국세청 연말정산 안내", href: "https://www.nts.go.kr" },
  { name: "소득세법 제137조", href: "https://www.law.go.kr" }
];

const RELATED = [
  { slug: "연말정산-원천징수영수증", title: "- title: \"연말정산 원천징수영수증", description: "" },
  { slug: "연말정산-경정청구", title: "연말정산 경정청구", description: "" },
  { slug: "실업급여", title: "실업급여", description: "" }
];

const STEPS = [
  { title: "관련 정보를 확인하세요", desc: "정부 기관 홈페이지나 법제처에서 최신 기준을 확인할 수 있어요." },
  { title: "필요한 서류를 준비하세요", desc: "신분증과 관련 서류를 미리 준비하면 절차가 빠르게 진행돼요." },
  { title: "온라인 또는 방문 신청하세요", desc: "정부24, 홈택스 등에서 온라인 신청이 가능해요. 방문 신청은 관할 기관에서 할 수 있어요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>연말정산 이직자와 퇴사자 정산 방법</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>"## 이직자 연말정산이 뭔가요"</p>
      <p style={body}>이직자는 전 직장 원천징수영수증을 제출해서 합산 정산해요. 퇴사자는 5월 종합소득세 신고로 환급받을 수 있어요.</p>
      <Divider /><ArticleAd position="intro" />
      <H2>핵심 정리</H2>
      <GreenBox title="요약">"· 이직자는 12월 31일 재직 회사에서 전 직장 소득을 합산 정산해요\\n· 전 직장 원천징수영수증을 제출하면 1년 치 소득을 함께 정산받아요\\n· 퇴사자는 회사에서 중간정산을 해주지만 5월 종합소득세 신고로 최종 정산해요"</GreenBox>
      <CategoryButton label="연말정산" count={10} href="/category/%EC%97%B0%EB%A7%90%EC%A0%95%EC%82%B0" />
      <RelatedArticles items={RELATED} />
      <Divider />
      <H2>절차와 방법</H2>
      <p style={body}>아래 순서대로 진행하면 돼요.</p>
      <Steps steps={STEPS} />
      <Divider />
      <H2>알아두면 좋은 것들</H2>
      <BorderBox><strong>참고사항</strong>{"\n"}· 이직자는 12월 31일 재직 회사에서 전 직장 소득을 합산 정산해요\n· 전 직장 원천징수영수증을 제출하면 1년 치 소득을 함께 정산받아요\n· 퇴사자는 회사에서 중간정산을 해주지만 5월 종합소득세 신고로 최종 정산해요</BorderBox>
      <Divider />
      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준으로 작성했어요. 법 개정이나 정책 변경에 따라 내용이 달라질 수 있으니 관련 기관에서 최신 정보를 확인해 주세요." />
    </ArticleLayout>
  );
}
