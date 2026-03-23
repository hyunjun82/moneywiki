"use client";
import { H2, GreenBox, BorderBox, Divider, body, Steps, FAQ, SourceNote, Disclaimer, ArticleLayout, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";

const FAQS = [
  { q: "대한민국 엄마보험 무료 가입·신청·보장내용에 대해 자세히 알 수 있나요?", a: "이 글에서 핵심 내용을 정리했어요. 아래 내용을 참고하세요." },
  { q: "관련 법령은 어디서 확인하나요?", a: "법제처(law.go.kr)에서 관련 법령 원문을 확인할 수 있어요." },
  { q: "더 자세한 상담은 어디서 받나요?", a: "정부 기관 상담센터나 전문가 상담을 이용하세요." },
  { q: "최신 정보는 어디서 확인하나요?", a: "관련 정부 기관 홈페이지에서 최신 내용을 확인할 수 있어요." },
  { q: "온라인으로 신청할 수 있나요?", a: "대부분 정부24(gov.kr)나 관련 기관 홈페이지에서 온라인 신청이 가능해요." }
];

const SOURCES = [
  { name: "- name: \"우체국보험", href: "https://www.epostlife.go.kr" },
  { name: "K-공감", href: "https://gonggam.korea.kr" }
];

const RELATED = [
  { slug: "출산지원금-신청", title: "- title: \"출산지원금 신청", description: "" },
  { slug: "임신바우처-국민행복카드", title: "임신바우처 국민행복카드", description: "" }
];

const STEPS = [
  { title: "관련 정보를 확인하세요", desc: "정부 기관 홈페이지나 법제처에서 최신 기준을 확인할 수 있어요." },
  { title: "필요한 서류를 준비하세요", desc: "신분증과 관련 서류를 미리 준비하면 절차가 빠르게 진행돼요." },
  { title: "온라인 또는 방문 신청하세요", desc: "정부24, 홈택스 등에서 온라인 신청이 가능해요. 방문 신청은 관할 기관에서 할 수 있어요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>복지</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>대한민국 엄마보험 무료 가입·신청·보장내용</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>"임신했는데 혹시 문제 생기면 어쩌나 걱정되시죠? 보험 들자니 보험료도 부담되고요. 국가에서 무료로 보험 들어줘요. 대한민국 엄마보험은 보험료 0"</p>
      <p style={body}>임신부 보험료 0원이에요. 국가가 전액 부담하는 대한민국 엄마보험으로 임신중독증, 희귀질환 보장받는 방법 알려드려요.</p>
      <Divider /><ArticleAd position="intro" />
      <H2>핵심 정리</H2>
      <GreenBox title="요약">"· 대한민국 엄마보험은 국가가 보험료 전액 부담하는 무료 공익보험\\n· 임신 22주 이내 임신부(만 17~45세)면 누구나 가입 가능, 태아도 보장\\n· 임신중독증 10만원, 아이 희귀질환 100만원 등 진단비 지급"</GreenBox>
      <CategoryButton label="복지" count={10} href="/category/%EB%B3%B5%EC%A7%80" />
      <RelatedArticles items={RELATED} />
      <Divider />
      <H2>절차와 방법</H2>
      <p style={body}>아래 순서대로 진행하면 돼요.</p>
      <Steps steps={STEPS} />
      <Divider />
      <H2>알아두면 좋은 것들</H2>
      <BorderBox><strong>참고사항</strong>{"\n"}· 대한민국 엄마보험은 국가가 보험료 전액 부담하는 무료 공익보험\n· 임신 22주 이내 임신부(만 17~45세)면 누구나 가입 가능, 태아도 보장\n· 임신중독증 10만원, 아이 희귀질환 100만원 등 진단비 지급</BorderBox>
      <Divider />
      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준으로 작성했어요. 법 개정이나 정책 변경에 따라 내용이 달라질 수 있으니 관련 기관에서 최신 정보를 확인해 주세요." />
    </ArticleLayout>
  );
}
