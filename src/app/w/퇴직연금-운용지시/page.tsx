"use client";
import { H2, GreenBox, BorderBox, Divider, body, Steps, FAQ, SourceNote, Disclaimer, ArticleLayout, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";

const FAQS = [
  { q: "퇴직연금 운용지시 변경과 절차 안내에 대해 자세히 알 수 있나요?", a: "이 글에서 핵심 내용을 정리했어요. 아래 내용을 참고하세요." },
  { q: "관련 법령은 어디서 확인하나요?", a: "법제처(law.go.kr)에서 관련 법령 원문을 확인할 수 있어요." },
  { q: "더 자세한 상담은 어디서 받나요?", a: "정부 기관 상담센터나 전문가 상담을 이용하세요." },
  { q: "최신 정보는 어디서 확인하나요?", a: "관련 정부 기관 홈페이지에서 최신 내용을 확인할 수 있어요." },
  { q: "온라인으로 신청할 수 있나요?", a: "대부분 정부24(gov.kr)나 관련 기관 홈페이지에서 온라인 신청이 가능해요." }
];

const SOURCES = [
  { name: "- name: \"근로자퇴직급여보장법", href: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
  { name: "금융감독원 퇴직연금 포털", href: "https://www.fss.or.kr" }
];

const RELATED = [
  { slug: "퇴직연금-DC형", title: "- title: \"DC형 vs DB형 퇴직연금", description: "" },
  { slug: "퇴직연금-운용수익", title: "퇴직연금 운용수익", description: "" },
  { slug: "퇴직연금-조회", title: "퇴직연금 수익률 조회", description: "" }
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
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>퇴직연금 운용지시 변경과 절차 안내</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>"회사에 입사했는데 "DC형 퇴직연금 운용지시를 하세요"라는 메일을 받으셨죠. 그런데 뭔지 몰라서 그냥 두셨나요?"</p>
      <p style={body}>DC형 퇴직연금은 직접 상품을 선택해야 해요. 운용지시 안 하면 이자가 거의 안 붙어서 큰 손해를 봐요</p>
      <Divider /><ArticleAd position="intro" />
      <H2>핵심 정리</H2>
      <GreenBox title="요약">"· DC형 퇴직연금은 회사가 정해준 금액을 본인이 직접 투자 상품을 골라서 운용해야 해요.\\n· 운용지시를 안 하면 대기 자금으로 이자가 0%에 가까워요. 10년이면 수백만원 손해봐요.\\n· 예금(안전), 펀드(수익), TDF(자동 관리) 등을 조합해서 선택할 수 있어요."</GreenBox>
      <CategoryButton label="근로/노동" count={10} href="/category/%EA%B7%BC%EB%A1%9C%2F%EB%85%B8%EB%8F%99" />
      <RelatedArticles items={RELATED} />
      <Divider />
      <H2>절차와 방법</H2>
      <p style={body}>아래 순서대로 진행하면 돼요.</p>
      <Steps steps={STEPS} />
      <Divider />
      <H2>알아두면 좋은 것들</H2>
      <BorderBox><strong>참고사항</strong>{"\n"}· DC형 퇴직연금은 회사가 정해준 금액을 본인이 직접 투자 상품을 골라서 운용해야 해요.\n· 운용지시를 안 하면 대기 자금으로 이자가 0%에 가까워요. 10년이면 수백만원 손해봐요.\n· 예금(안전), 펀드(수익), TDF(자동 관리) 등을 조합해서 선택할 수 있어요.</BorderBox>
      <Divider />
      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준으로 작성했어요. 법 개정이나 정책 변경에 따라 내용이 달라질 수 있으니 관련 기관에서 최신 정보를 확인해 주세요." />
    </ArticleLayout>
  );
}
