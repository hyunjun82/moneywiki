"use client";
import { H2, GreenBox, BorderBox, Divider, body, Steps, FAQ, SourceNote, Disclaimer, ArticleLayout, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";

const FAQS = [
  { q: "지역사랑상품권 환전대행 규정에 대해 자세히 알 수 있나요?", a: "이 글에서 핵심 내용을 정리했어요. 아래 내용을 참고하세요." },
  { q: "관련 법령은 어디서 확인하나요?", a: "법제처(law.go.kr)에서 관련 법령 원문을 확인할 수 있어요." },
  { q: "더 자세한 상담은 어디서 받나요?", a: "정부 기관 상담센터나 전문가 상담을 이용하세요." },
  { q: "최신 정보는 어디서 확인하나요?", a: "관련 정부 기관 홈페이지에서 최신 내용을 확인할 수 있어요." },
  { q: "온라인으로 신청할 수 있나요?", a: "대부분 정부24(gov.kr)나 관련 기관 홈페이지에서 온라인 신청이 가능해요." }
];

const SOURCES = [
  { name: "- name: 지역사랑상품권 이용 활성화에 관한 법률", href: "https://www.law.go.kr/법령/지역사랑상품권이용활성화에관한법률" },
  { name: "행정안전부 지역사랑상품권", href: "https://www.mois.go.kr/frt/sub/a06/b07/localVoucher/screen.do" }
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
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>지역사랑상품권 환전대행 규정</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>"환전대행가맹점을 하면서 동네 다른 가게 사장님한테 "우리 것도 환전 좀 해주세요"라는 부탁을 받으신 적 있으시죠? 친한 사이니까 도와주고 싶은데"</p>
      <p style={body}>환전대행가맹점인데 다른 가맹점에서 환전 요청이 왔다면 해도 되는지 헷갈리시죠?</p>
      <Divider /><ArticleAd position="intro" />
      <H2>핵심 정리</H2>
      <GreenBox title="요약">"· 환전대행가맹점은 본인과 계약한 개별가맹점 것만 환전 가능해요\\n· 다른 가맹점 환전 대행하면 부정유통으로 제재받아요\\n· 가맹점 취소, 발행비용 환수, 과태료 2천만 원까지 나올 수 있어요"</GreenBox>
      <CategoryButton label="금융" count={10} href="/category/%EA%B8%88%EC%9C%B5" />
      <RelatedArticles items={RELATED} />
      <Divider />
      <H2>절차와 방법</H2>
      <p style={body}>아래 순서대로 진행하면 돼요.</p>
      <Steps steps={STEPS} />
      <Divider />
      <H2>알아두면 좋은 것들</H2>
      <BorderBox><strong>참고사항</strong>{"\n"}· 환전대행가맹점은 본인과 계약한 개별가맹점 것만 환전 가능해요\n· 다른 가맹점 환전 대행하면 부정유통으로 제재받아요\n· 가맹점 취소, 발행비용 환수, 과태료 2천만 원까지 나올 수 있어요</BorderBox>
      <Divider />
      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준으로 작성했어요. 법 개정이나 정책 변경에 따라 내용이 달라질 수 있으니 관련 기관에서 최신 정보를 확인해 주세요." />
    </ArticleLayout>
  );
}
