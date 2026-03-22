"use client";
import { H2, GreenBox, BorderBox, Divider, body, Steps, FAQ, SourceNote, Disclaimer, ArticleLayout, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";

const FAQS = [
  { q: "  - question: ISA 가입하려면 어떤 조건이 필요한가요?", a: "만 19세 이상이면 누구나 가입할 수 있어요. 근로소득자는 만 15세부터 가능하고요. 1인 1계좌만 개설할 수 있어요." },
  { q: "일반형과 서민형 비과세 한도가 왜 달라요?", a: "일반형은 200만원, 서민형은 400만원까지 비과세예요. 서민형은 총급여 5,000만원 이하면 받을 수 있어서 소득이 낮은 분들에게 더 큰 혜택을 주는 거죠." },
  { q: "중개형과 신탁형 중 뭘 선택해야 하나요?", a: "국내 주식을 직접 매매하고 싶으면 중개형, 펀드나 예금 위주로 안전하게 운용하고 싶으면 신탁형을 선택하세요. 중개형이 투자 폭이 더 넓어요." },
  { q: "ISA 3년 전에 해지하면 어떻게 되나요?", a: "비과세 혜택이 사라지고 일반 계좌처럼 15.4% 세금이 부과돼요. 3년은 꼭 채워야 절세 효과를 받을 수 있어요." },
  { q: "ISA에서 투자할 수 있는 상품이 뭐예요?", a: "중개형은 국내 주식·ETF·펀드·채권, 신탁형은 펀드·예금·ELS 등에 투자할 수 있어요. 해외 주식은 직접 매매가 안 돼요." }
];

const SOURCES = [
  { name: "- name: ISA 계좌 세금 혜택 가이드", href: "https://jungcheck.com/isa-account-tax-benefits-guide-2026/" },
  { name: "KB국민은행 ISA 세제 혜택", href: "https://obank.kbstar.com/quics?page=C041167" },
  { name: "조세특례제한법", href: "https://www.law.go.kr/법령/조세특례제한법" }
];

const RELATED = [
  { slug: "연금저축", title: "- title: 연금저축", description: "" },
  { slug: "청년도약계좌", title: "청년도약계좌", description: "" },
  { slug: "배당소득세", title: "배당소득세", description: "" }
];

const STEPS = [
  { title: "관련 정보를 확인하세요", desc: "정부 기관 홈페이지나 법제처에서 최신 기준을 확인할 수 있어요." },
  { title: "필요한 서류를 준비하세요", desc: "신분증과 관련 서류를 미리 준비하면 절차가 빠르게 진행돼요." },
  { title: "온라인 또는 방문 신청하세요", desc: "정부24, 홈택스 등에서 온라인 신청이 가능해요. 방문 신청은 관할 기관에서 할 수 있어요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>경제</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>ISA계좌 비과세 한도 200만원 400만원 차이</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>"ISA 계좌 열어놓으면 주식으로 돈 벌어도 세금 안 내도 돼요. 펀드로 수익 나도 비과세고요. 예금 이자도 ISA에 넣으면 세금 덜 떼요."</p>
      <p style={body}>ISA는 주식·펀드·예금을 한 계좌에서 운용하며 200~400만원까지 비과세 혜택 받아요. 일반형과 서민형 차이, 중개형과 신탁형 선택 기준을 알려드릴게요</p>
      <Divider /><ArticleAd position="intro" />
      <H2>핵심 정리</H2>
      <GreenBox title="요약">"· ISA는 주식·펀드·예금을 한 계좌에 담고 순이익 200~400만원까지 비과세받는 절세 계좌예요.\\n· 일반형은 200만원, 서민형은 400만원까지 비과세되고 초과분은 9.9%만 과세돼요.\\n· 중개형은 국내주식 직접 매매 가능하고, 신탁형은 펀드와 예금 위주로 운용해요."</GreenBox>
      <CategoryButton label="경제" count={10} href="/category/%EA%B2%BD%EC%A0%9C" />
      <RelatedArticles items={RELATED} />
      <Divider />
      <H2>절차와 방법</H2>
      <p style={body}>아래 순서대로 진행하면 돼요.</p>
      <Steps steps={STEPS} />
      <Divider />
      <H2>알아두면 좋은 것들</H2>
      <BorderBox><strong>참고사항</strong>{"\n"}· ISA는 주식·펀드·예금을 한 계좌에 담고 순이익 200~400만원까지 비과세받는 절세 계좌예요.\n· 일반형은 200만원, 서민형은 400만원까지 비과세되고 초과분은 9.9%만 과세돼요.\n· 중개형은 국내주식 직접 매매 가능하고, 신탁형은 펀드와 예금 위주로 운용해요.</BorderBox>
      <Divider />
      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준으로 작성했어요. 법 개정이나 정책 변경에 따라 내용이 달라질 수 있으니 관련 기관에서 최신 정보를 확인해 주세요." />
    </ArticleLayout>
  );
}
