"use client";
import { H2, GreenBox, BorderBox, Divider, body, Steps, FAQ, SourceNote, Disclaimer, ArticleLayout, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";

const FAQS = [
  { q: "증축허가 후 착공신고 별도 제출 여부에 대해 자세히 알 수 있나요?", a: "이 글에서 핵심 내용을 정리했어요. 아래 내용을 참고하세요." },
  { q: "관련 법령은 어디서 확인하나요?", a: "법제처(law.go.kr)에서 관련 법령 원문을 확인할 수 있어요." },
  { q: "더 자세한 상담은 어디서 받나요?", a: "정부 기관 상담센터나 전문가 상담을 이용하세요." },
  { q: "최신 정보는 어디서 확인하나요?", a: "관련 정부 기관 홈페이지에서 최신 내용을 확인할 수 있어요." },
  { q: "온라인으로 신청할 수 있나요?", a: "대부분 정부24(gov.kr)나 관련 기관 홈페이지에서 온라인 신청이 가능해요." }
];

const SOURCES = [
  { name: "- name: \"건축법", href: "https://www.law.go.kr/법령/건축법" },
  { name: "건축법 시행령", href: "https://www.law.go.kr/법령/건축법시행령" }
];

const RELATED = [
  { slug: "건축허가-절차", title: "- title: \"건축허가 절차", description: "" },
  { slug: "건축신고-대상", title: "건축신고 대상", description: "" },
  { slug: "사용승인-신청", title: "사용승인 신청", description: "" }
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
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>증축허가 후 착공신고 별도 제출 여부</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>"집을 증축하려고 허가를 받았어요. 이제 공사 시작하면 되는 건가요? 아니면 또 다른 절차가 필요한가요?"</p>
      <p style={body}>증축허가 받았으면 바로 공사 시작해도 되나요? 착공신고를 별도로 해야 하는지 알아볼게요.</p>
      <Divider /><ArticleAd position="intro" />
      <H2>핵심 정리</H2>
      <GreenBox title="요약">"· 증축허가를 받았어도 공사 시작 전 반드시 착공신고를 별도로 제출해야 함\\n· 착공신고서에 건축관계자 계약서 사본 등 서류를 첨부하여 허가권자에게 제출\\n· 착공신고 없이 공사 시작하면 5천만원 이하 벌금, 허가 후 1년 내 미착수 시 허가 취소 가능"</GreenBox>
      <CategoryButton label="부동산" count={10} href="/category/%EB%B6%80%EB%8F%99%EC%82%B0" />
      <RelatedArticles items={RELATED} />
      <Divider />
      <H2>절차와 방법</H2>
      <p style={body}>아래 순서대로 진행하면 돼요.</p>
      <Steps steps={STEPS} />
      <Divider />
      <H2>알아두면 좋은 것들</H2>
      <BorderBox><strong>참고사항</strong>{"\n"}· 증축허가를 받았어도 공사 시작 전 반드시 착공신고를 별도로 제출해야 함\n· 착공신고서에 건축관계자 계약서 사본 등 서류를 첨부하여 허가권자에게 제출\n· 착공신고 없이 공사 시작하면 5천만원 이하 벌금, 허가 후 1년 내 미착수 시 허가 취소 가능</BorderBox>
      <Divider />
      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준으로 작성했어요. 법 개정이나 정책 변경에 따라 내용이 달라질 수 있으니 관련 기관에서 최신 정보를 확인해 주세요." />
    </ArticleLayout>
  );
}
