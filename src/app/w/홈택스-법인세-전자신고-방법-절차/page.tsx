"use client";
import { H2, GreenBox, BorderBox, Divider, body, Steps, FAQ, SourceNote, Disclaimer, ArticleLayout, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";

const FAQS = [
  { q: "홈택스 법인세 전자신고 방법 및 절차: 로그인부터 신고까지에 대해 자세히 알 수 있나요?", a: "이 글에서 핵심 내용을 정리했어요. 아래 내용을 참고하세요." },
  { q: "관련 법령은 어디서 확인하나요?", a: "법제처(law.go.kr)에서 관련 법령 원문을 확인할 수 있어요." },
  { q: "더 자세한 상담은 어디서 받나요?", a: "정부 기관 상담센터나 전문가 상담을 이용하세요." },
  { q: "최신 정보는 어디서 확인하나요?", a: "관련 정부 기관 홈페이지에서 최신 내용을 확인할 수 있어요." },
  { q: "온라인으로 신청할 수 있나요?", a: "대부분 정부24(gov.kr)나 관련 기관 홈페이지에서 온라인 신청이 가능해요." }
];

const SOURCES = [
  { name: "- name: \"국세청 법인세 신고절차", href: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=6549&cntntsId=7975" },
  { name: "국세청 홈택스", href: "https://hometax.go.kr" },
  { name: "무실적법인 간편 전자신고", href: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=6552&cntntsId=7978" }
];

const RELATED = [
  { slug: "법인세-계산기", title: "- title: \"법인세 계산기", description: "" },
  { slug: "중소기업-특별세액감면-업종-조건", title: "중소기업 특별세액감면 업종 조건", description: "" },
  { slug: "고용증대-세액공제-요건-공제액-계산", title: "고용증대 세액공제 요건", description: "" }
];

const STEPS = [
  { title: "관련 정보를 확인하세요", desc: "정부 기관 홈페이지나 법제처에서 최신 기준을 확인할 수 있어요." },
  { title: "필요한 서류를 준비하세요", desc: "신분증과 관련 서류를 미리 준비하면 절차가 빠르게 진행돼요." },
  { title: "온라인 또는 방문 신청하세요", desc: "정부24, 홈택스 등에서 온라인 신청이 가능해요. 방문 신청은 관할 기관에서 할 수 있어요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>홈택스 법인세 전자신고 방법 및 절차: 로그인부터 신고까지</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>"회계담당자는 법인세 신고 때문에 스트레스 받으시나요. 사실 홈택스에서 단계별로 진행하면 크게 어렵지 않아요. 절차를 따라하다 보면 자동으로 신고"</p>
      <p style={body}>법인세 신고 어렵게 생각하셨나요. 홈택스에서 단계별로 신고하는 방법과 필요한 서류를 쉽게 설명해드릴게요</p>
      <Divider /><ArticleAd position="intro" />
      <H2>핵심 정리</H2>
      <GreenBox title="요약">"· 홈택스에서 법인세를 전자신고하면 신고 세액공제를 받을 수 있어요.\\n· 기본사항 입력 → 재무제표 → 신고서 작성 이렇게 3단계로 진행돼요.\\n· 소규모 법인은 간편한 무실적법인 신고 방식도 있어요."</GreenBox>
      <CategoryButton label="세금" count={10} href="/category/%EC%84%B8%EA%B8%88" />
      <RelatedArticles items={RELATED} />
      <Divider />
      <H2>절차와 방법</H2>
      <p style={body}>아래 순서대로 진행하면 돼요.</p>
      <Steps steps={STEPS} />
      <Divider />
      <H2>알아두면 좋은 것들</H2>
      <BorderBox><strong>참고사항</strong>{"\n"}· 홈택스에서 법인세를 전자신고하면 신고 세액공제를 받을 수 있어요.\n· 기본사항 입력 → 재무제표 → 신고서 작성 이렇게 3단계로 진행돼요.\n· 소규모 법인은 간편한 무실적법인 신고 방식도 있어요.</BorderBox>
      <Divider />
      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준으로 작성했어요. 법 개정이나 정책 변경에 따라 내용이 달라질 수 있으니 관련 기관에서 최신 정보를 확인해 주세요." />
    </ArticleLayout>
  );
}
