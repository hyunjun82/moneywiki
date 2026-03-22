"use client";
import { H2, GreenBox, BorderBox, Divider, body, Steps, FAQ, SourceNote, Disclaimer, ArticleLayout, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";

const FAQS = [
  { q: "경매 대금 납부 기한 소유권 취득에 대해 자세히 알 수 있나요?", a: "이 글에서 핵심 내용을 정리했어요. 아래 내용을 참고하세요." },
  { q: "관련 법령은 어디서 확인하나요?", a: "법제처(law.go.kr)에서 관련 법령 원문을 확인할 수 있어요." },
  { q: "더 자세한 상담은 어디서 받나요?", a: "정부 기관 상담센터나 전문가 상담을 이용하세요." },
  { q: "최신 정보는 어디서 확인하나요?", a: "관련 정부 기관 홈페이지에서 최신 내용을 확인할 수 있어요." },
  { q: "온라인으로 신청할 수 있나요?", a: "대부분 정부24(gov.kr)나 관련 기관 홈페이지에서 온라인 신청이 가능해요." }
];

const SOURCES = [
  { name: "- name: \"민사집행법", href: "https://www.law.go.kr/법령/민사집행법" },
  { name: "찾기쉬운 생활법령정보", href: "https://www.easylaw.go.kr" }
];

const RELATED = [
  { slug: "경매-낙찰-후-등기-소유권이전", title: "- title: \"경매 낙찰 후 등기 소유권이전", description: "" },
  { slug: "경매-절차-입찰-방법-낙찰-매각대금", title: "경매 절차 입찰 방법 낙찰 매각대금", description: "" },
  { slug: "경매-부동산-등기-촉탁-신청-서류", title: "경매 부동산 등기 촉탁 신청 서류", description: "" }
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
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>경매 대금 납부 기한 소유권 취득</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>"경매로 집 낙찰받으셨어요? 이제 중요한 게 남았어요. 돈 내는 거요. "낙찰받았으니 이제 내 집이다!" 하고 방심하시면 큰일 나요. 법원이 정해"</p>
      <p style={body}>경매 낙찰받고 돈 언제까지 내야 하는지 궁금하시죠. 법원이 정한 기한 안에 잔금 다 내야 소유권이 넘어와요. 하루라도 늦으면 보증금 날리고 낙찰 취소예요.</p>
      <Divider /><ArticleAd position="intro" />
      <H2>핵심 정리</H2>
      <GreenBox title="요약">"· 매각허가결정 확정 후 법원이 정한 기한 내 대금 납부\\n· 대금 납부 완료해야 소유권 취득, 법원이 직권으로 등기\\n· 기한 내 납부 못 하면 보증금 몰수, 낙찰 취소"</GreenBox>
      <CategoryButton label="부동산" count={10} href="/category/%EB%B6%80%EB%8F%99%EC%82%B0" />
      <RelatedArticles items={RELATED} />
      <Divider />
      <H2>절차와 방법</H2>
      <p style={body}>아래 순서대로 진행하면 돼요.</p>
      <Steps steps={STEPS} />
      <Divider />
      <H2>알아두면 좋은 것들</H2>
      <BorderBox><strong>참고사항</strong>{"\n"}· 매각허가결정 확정 후 법원이 정한 기한 내 대금 납부\n· 대금 납부 완료해야 소유권 취득, 법원이 직권으로 등기\n· 기한 내 납부 못 하면 보증금 몰수, 낙찰 취소</BorderBox>
      <Divider />
      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준으로 작성했어요. 법 개정이나 정책 변경에 따라 내용이 달라질 수 있으니 관련 기관에서 최신 정보를 확인해 주세요." />
    </ArticleLayout>
  );
}
