"use client";
import { H2, GreenBox, BorderBox, Divider, body, Steps, FAQ, SourceNote, Disclaimer, ArticleLayout, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";

const FAQS = [
  { q: "전세 보증금 반환 청구 절차 2026에 대해 자세히 알 수 있나요?", a: "이 글에서 핵심 내용을 정리했어요. 아래 내용을 참고하세요." },
  { q: "관련 법령은 어디서 확인하나요?", a: "법제처(law.go.kr)에서 관련 법령 원문을 확인할 수 있어요." },
  { q: "더 자세한 상담은 어디서 받나요?", a: "정부 기관 상담센터나 전문가 상담을 이용하세요." },
  { q: "최신 정보는 어디서 확인하나요?", a: "관련 정부 기관 홈페이지에서 최신 내용을 확인할 수 있어요." },
  { q: "온라인으로 신청할 수 있나요?", a: "대부분 정부24(gov.kr)나 관련 기관 홈페이지에서 온라인 신청이 가능해요." }
];

const SOURCES = [
  { name: "- name: \"주택임대차보호법", href: "https://www.law.go.kr/법령/주택임대차보호법" },
  { name: "한국주택금융공사 전세보증금반환보증", href: "https://www.hf.go.kr/ko/sub02/sub02_05_07.do" }
];

const RELATED = [
  { slug: "대항력-요건-전입신고-점유", title: "- title: \"대항력 요건", description: "" },
  { slug: "임대인-변경-대항력-우선변제권", title: "임대인 변경 대항력", description: "" },
  { slug: "경매-임차권-인수-선택-낙찰자", title: "경매 임차권 인수", description: "" }
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
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>전세 보증금 반환 청구 절차 2026</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>"전세 계약 끝났는데 집주인이 보증금 안 돌려줘요. "다음 달에 줄게", "조금만 기다려" 하면서 계속 미루고 있어요. 계속 기다리면 나만 손해예"</p>
      <p style={body}>계약 끝났는데 집주인이 보증금 안 돌려줘요. 내용증명부터 소송까지 단계별 절차 알려드려요.</p>
      <Divider /><ArticleAd position="intro" />
      <H2>핵심 정리</H2>
      <GreenBox title="요약">"· 내용증명 발송으로 증거 확보 먼저\\n· 3천만 원 이하는 소액사건심판 이용 가능\\n· 임차권등기명령으로 대항력 유지하며 이사 가능"</GreenBox>
      <CategoryButton label="부동산" count={10} href="/category/%EB%B6%80%EB%8F%99%EC%82%B0" />
      <RelatedArticles items={RELATED} />
      <Divider />
      <H2>절차와 방법</H2>
      <p style={body}>아래 순서대로 진행하면 돼요.</p>
      <Steps steps={STEPS} />
      <Divider />
      <H2>알아두면 좋은 것들</H2>
      <BorderBox><strong>참고사항</strong>{"\n"}· 내용증명 발송으로 증거 확보 먼저\n· 3천만 원 이하는 소액사건심판 이용 가능\n· 임차권등기명령으로 대항력 유지하며 이사 가능</BorderBox>
      <Divider />
      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준으로 작성했어요. 법 개정이나 정책 변경에 따라 내용이 달라질 수 있으니 관련 기관에서 최신 정보를 확인해 주세요." />
    </ArticleLayout>
  );
}
