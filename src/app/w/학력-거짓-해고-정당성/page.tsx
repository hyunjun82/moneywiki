"use client";
import { H2, GreenBox, BorderBox, Divider, body, Steps, FAQ, SourceNote, Disclaimer, ArticleLayout, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";

const FAQS = [
  { q: "학력 위조 해고 정당성 판단 기준 | 업무 관련성 판례 기준에 대해 자세히 알 수 있나요?", a: "이 글에서 핵심 내용을 정리했어요. 아래 내용을 참고하세요." },
  { q: "관련 법령은 어디서 확인하나요?", a: "법제처(law.go.kr)에서 관련 법령 원문을 확인할 수 있어요." },
  { q: "더 자세한 상담은 어디서 받나요?", a: "정부 기관 상담센터나 전문가 상담을 이용하세요." },
  { q: "최신 정보는 어디서 확인하나요?", a: "관련 정부 기관 홈페이지에서 최신 내용을 확인할 수 있어요." },
  { q: "온라인으로 신청할 수 있나요?", a: "대부분 정부24(gov.kr)나 관련 기관 홈페이지에서 온라인 신청이 가능해요." }
];

const SOURCES = [
  { name: "- name: \"근로기준법 제23조 - 해고 등의 제한", href: "https://www.law.go.kr/법령/근로기준법" },
  { name: "중앙노동위원회 판정례 - 학력 위조 해고", href: "https://www.nlrc.go.kr" }
];

const RELATED = [
  { slug: "부당해고-구제신청", title: "- title: \"부당해고 구제 신청 방법", description: "" },
  { slug: "해고예고수당", title: "해고예고수당 계산", description: "" }
];

const STEPS = [
  { title: "관련 정보를 확인하세요", desc: "정부 기관 홈페이지나 법제처에서 최신 기준을 확인할 수 있어요." },
  { title: "필요한 서류를 준비하세요", desc: "신분증과 관련 서류를 미리 준비하면 절차가 빠르게 진행돼요." },
  { title: "온라인 또는 방문 신청하세요", desc: "정부24, 홈택스 등에서 온라인 신청이 가능해요. 방문 신청은 관할 기관에서 할 수 있어요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>학력 위조 해고 정당성 판단 기준 | 업무 관련성 판례 기준</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>"*"이력서에 학력을 부풀렸는데 회사가 알고 해고했어요. 무조건 정당한 건가요?"*"</p>
      <p style={body}>이력서 학력을 거짓으로 썼다고 무조건 해고가 되는 건 아니에요. 해고 정당성은 업무 관련성과 판례 기준으로 판단해요. 관련 내용을 알려드려요.</p>
      <Divider /><ArticleAd position="intro" />
      <H2>핵심 정리</H2>
      <GreenBox title="요약">"· 학력 위조 해고는 위조 사실이 있어도 업무 관련성이 없으면 부당해고가 될 수 있어요.\\n· 법원은 학력 요건이 채용 조건이었는지, 업무 수행에 실질적 영향이 있는지를 봐요.\\n· 해고가 부당하면 노동위원회 구제 신청으로 복직 또는 해고 수당을 받을 수 있어요."</GreenBox>
      <CategoryButton label="실업급여" count={10} href="/category/%EC%8B%A4%EC%97%85%EA%B8%89%EC%97%AC" />
      <RelatedArticles items={RELATED} />
      <Divider />
      <H2>절차와 방법</H2>
      <p style={body}>아래 순서대로 진행하면 돼요.</p>
      <Steps steps={STEPS} />
      <Divider />
      <H2>알아두면 좋은 것들</H2>
      <BorderBox><strong>참고사항</strong>{"\n"}· 학력 위조 해고는 위조 사실이 있어도 업무 관련성이 없으면 부당해고가 될 수 있어요.\n· 법원은 학력 요건이 채용 조건이었는지, 업무 수행에 실질적 영향이 있는지를 봐요.\n· 해고가 부당하면 노동위원회 구제 신청으로 복직 또는 해고 수당을 받을 수 있어요.</BorderBox>
      <Divider />
      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준으로 작성했어요. 법 개정이나 정책 변경에 따라 내용이 달라질 수 있으니 관련 기관에서 최신 정보를 확인해 주세요." />
    </ArticleLayout>
  );
}
