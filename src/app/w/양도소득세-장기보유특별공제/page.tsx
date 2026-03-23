"use client";
import { H2, GreenBox, BorderBox, Divider, body, Steps, FAQ, SourceNote, Disclaimer, ArticleLayout, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";

const FAQS = [
  { q: "양도소득세 장기보유특별공제 거주기간 및 계산법에 대해 자세히 알 수 있나요?", a: "이 글에서 핵심 내용을 정리했어요. 아래 내용을 참고하세요." },
  { q: "관련 법령은 어디서 확인하나요?", a: "법제처(law.go.kr)에서 관련 법령 원문을 확인할 수 있어요." },
  { q: "더 자세한 상담은 어디서 받나요?", a: "정부 기관 상담센터나 전문가 상담을 이용하세요." },
  { q: "최신 정보는 어디서 확인하나요?", a: "관련 정부 기관 홈페이지에서 최신 내용을 확인할 수 있어요." },
  { q: "온라인으로 신청할 수 있나요?", a: "대부분 정부24(gov.kr)나 관련 기관 홈페이지에서 온라인 신청이 가능해요." }
];

const SOURCES = [
  { name: "- name: 국세청 장기보유특별공제율", href: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2311&cntntsId=7710" },
  { name: "소득세법", href: "https://www.law.go.kr/법령/소득세법" },
  { name: "홈택스", href: "https://www.hometax.go.kr" }
];

const RELATED = [
  { slug: "양도소득세-계산", title: "- title: 양도소득세 계산", description: "" },
  { slug: "1세대1주택-비과세-요건", title: "1세대 1주택 비과세", description: "" },
  { slug: "다주택자-세금", title: "다주택자 세금", description: "" }
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
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>양도소득세 장기보유특별공제 거주기간 및 계산법</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>"집을 팔 때 양도세가 걱정되시죠? 오래 보유했으면 세금을 크게 줄일 수 있어요. **장기보유특별공제**라는 제도 덕분이에요."</p>
      <p style={body}>집을 오래 보유하면 양도세가 확 줄어요. 1세대 1주택은 보유+거주 10년 이상이면 최대 80% 공제받아요. 다주택자는 15년 보유해도 30%가 한도고요</p>
      <Divider /><ArticleAd position="intro" />
      <H2>핵심 정리</H2>
      <GreenBox title="요약">"· 1세대 1주택은 보유기간 공제(최대 40%) + 거주기간 공제(최대 40%) = 최대 80%까지 공제돼요.\\n· 다주택자나 일반 부동산은 보유기간만 보고, 15년 이상이면 최대 30% 공제예요.\\n· 거주기간 2년 미만이면 1세대 1주택이어도 일반 공제율(최대 30%)만 적용돼요."</GreenBox>
      <CategoryButton label="세금" count={10} href="/category/%EC%84%B8%EA%B8%88" />
      <RelatedArticles items={RELATED} />
      <Divider />
      <H2>절차와 방법</H2>
      <p style={body}>아래 순서대로 진행하면 돼요.</p>
      <Steps steps={STEPS} />
      <Divider />
      <H2>알아두면 좋은 것들</H2>
      <BorderBox><strong>참고사항</strong>{"\n"}· 1세대 1주택은 보유기간 공제(최대 40%) + 거주기간 공제(최대 40%) = 최대 80%까지 공제돼요.\n· 다주택자나 일반 부동산은 보유기간만 보고, 15년 이상이면 최대 30% 공제예요.\n· 거주기간 2년 미만이면 1세대 1주택이어도 일반 공제율(최대 30%)만 적용돼요.</BorderBox>
      <Divider />
      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준으로 작성했어요. 법 개정이나 정책 변경에 따라 내용이 달라질 수 있으니 관련 기관에서 최신 정보를 확인해 주세요." />
    </ArticleLayout>
  );
}
