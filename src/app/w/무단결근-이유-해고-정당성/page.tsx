"use client";
import { H2, GreenBox, BorderBox, Divider, body, Steps, FAQ, SourceNote, Disclaimer, ArticleLayout, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";

const FAQS = [
  { q: "무단결근 해고 정당성: 기간 기준 및 정당 사유에 대해 자세히 알 수 있나요?", a: "이 글에서 핵심 내용을 정리했어요. 아래 내용을 참고하세요." },
  { q: "관련 법령은 어디서 확인하나요?", a: "법제처(law.go.kr)에서 관련 법령 원문을 확인할 수 있어요." },
  { q: "더 자세한 상담은 어디서 받나요?", a: "정부 기관 상담센터나 전문가 상담을 이용하세요." },
  { q: "최신 정보는 어디서 확인하나요?", a: "관련 정부 기관 홈페이지에서 최신 내용을 확인할 수 있어요." },
  { q: "온라인으로 신청할 수 있나요?", a: "대부분 정부24(gov.kr)나 관련 기관 홈페이지에서 온라인 신청이 가능해요." }
];

const SOURCES = [
  { name: "- name: \"근로기준법", href: "https://www.law.go.kr/법령/근로기준법" },
  { name: "고용노동부", href: "https://www.moel.go.kr" }
];

const RELATED = [
  { slug: "부당해고-구제신청-방법", title: "- title: \"부당해고 구제신청 방법", description: "" },
  { slug: "소명기회-없는-해고-효력", title: "해고 소명기회 의무", description: "" },
  { slug: "퇴직급여-지급-대상-조건", title: "퇴직금 지급 기준", description: "" }
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
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>무단결근 해고 정당성: 기간 기준 및 정당 사유</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>"갑자기 아프거나 개인 사정이 생겨서 회사에 못 갔는데 연락도 못 했나요? "무단결근이니까 해고야" 하면서 협박하는 회사도 있어요. 실제로 며칠까"</p>
      <p style={body}>무단결근 2주 연속하면 정당한 해고 대상이고 회사 취업규칙에 따라 3일~1주도 해고 가능하다는 거 아시나요? 판례 기준과 부당해고 대응법까지 알려드려요</p>
      <Divider /><ArticleAd position="intro" />
      <H2>핵심 정리</H2>
      <GreenBox title="요약">"· 무단결근 2주 연속 시 정당한 해고 사유 인정되고, 취업규칙에 따라 3일~1주도 가능해요\\n· 정당한 사유(질병, 사고)가 있으면 무단결근 아니며, 사후 통보도 인정돼요\\n· 부당해고 판정받으면 원직 복직 또는 해고기간 임금 전액 지급받을 수 있어요"</GreenBox>
      <CategoryButton label="근로/노동" count={10} href="/category/%EA%B7%BC%EB%A1%9C%2F%EB%85%B8%EB%8F%99" />
      <RelatedArticles items={RELATED} />
      <Divider />
      <H2>절차와 방법</H2>
      <p style={body}>아래 순서대로 진행하면 돼요.</p>
      <Steps steps={STEPS} />
      <Divider />
      <H2>알아두면 좋은 것들</H2>
      <BorderBox><strong>참고사항</strong>{"\n"}· 무단결근 2주 연속 시 정당한 해고 사유 인정되고, 취업규칙에 따라 3일~1주도 가능해요\n· 정당한 사유(질병, 사고)가 있으면 무단결근 아니며, 사후 통보도 인정돼요\n· 부당해고 판정받으면 원직 복직 또는 해고기간 임금 전액 지급받을 수 있어요</BorderBox>
      <Divider />
      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준으로 작성했어요. 법 개정이나 정책 변경에 따라 내용이 달라질 수 있으니 관련 기관에서 최신 정보를 확인해 주세요." />
    </ArticleLayout>
  );
}
