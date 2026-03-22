"use client";
import { H2, GreenBox, BorderBox, Divider, body, Steps, FAQ, SourceNote, Disclaimer, ArticleLayout, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";

const FAQS = [
  { q: "5세대 실손 비급여: 50% 기준에 대해 자세히 알 수 있나요?", a: "이 글에서 핵심 내용을 정리했어요. 아래 내용을 참고하세요." },
  { q: "관련 법령은 어디서 확인하나요?", a: "법제처(law.go.kr)에서 관련 법령 원문을 확인할 수 있어요." },
  { q: "더 자세한 상담은 어디서 받나요?", a: "정부 기관 상담센터나 전문가 상담을 이용하세요." },
  { q: "최신 정보는 어디서 확인하나요?", a: "관련 정부 기관 홈페이지에서 최신 내용을 확인할 수 있어요." },
  { q: "온라인으로 신청할 수 있나요?", a: "대부분 정부24(gov.kr)나 관련 기관 홈페이지에서 온라인 신청이 가능해요." }
];

const SOURCES = [
  { name: "- name: \"금융감독원 실손보험 개편안", href: "https://www.fsc.go.kr" },
  { name: "서울신문 - 5세대 실손 비급여 보장", href: "https://www.seoul.co.kr/news/economy/finance/2026/01/16/20260116012007" },
  { name: "경향신문 - 5세대 실손보험 자기부담률", href: "https://www.khan.co.kr/article/202504020600091" }
];

const RELATED = [
  { slug: "5세대-실손보험-4세대-차이", title: "- title: \"5세대 실손보험 4세대 차이", description: "" },
  { slug: "5세대-실손보험-자기부담금", title: "5세대 실손보험 자기부담금", description: "" },
  { slug: "5세대-실손보험-보장-내용", title: "5세대 실손보험 보장 내용", description: "" }
];

const STEPS = [
  { title: "관련 정보를 확인하세요", desc: "정부 기관 홈페이지나 법제처에서 최신 기준을 확인할 수 있어요." },
  { title: "필요한 서류를 준비하세요", desc: "신분증과 관련 서류를 미리 준비하면 절차가 빠르게 진행돼요." },
  { title: "온라인 또는 방문 신청하세요", desc: "정부24, 홈택스 등에서 온라인 신청이 가능해요. 방문 신청은 관할 기관에서 할 수 있어요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>보험</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>5세대 실손 비급여: 50% 기준</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>"5세대 실손보험 가입하려는데 비급여 자기부담률이 50%라는 말을 들으셨나요? 4세대보다 20%포인트 올라서 부담스럽게 느껴지실 거예요. 하지만 "</p>
      <p style={body}>5세대 실손보험은 비급여 자기부담률이 50%로 올라요. 4세대 30%보다 높아지지만 보험료는 30~50% 저렴해져요. 비중증과 중증 보장 차이를 알려드려요</p>
      <Divider /><ArticleAd position="intro" />
      <H2>핵심 정리</H2>
      <GreenBox title="요약">"· 5세대는 비급여 자기부담률이 50%로 인상돼요\\n· 비중증 비급여 한도가 연 1천만원으로 줄어요\\n· 중증 환자는 본인부담 최대 500만원으로 보장 강화돼요"</GreenBox>
      <CategoryButton label="보험" count={10} href="/category/%EB%B3%B4%ED%97%98" />
      <RelatedArticles items={RELATED} />
      <Divider />
      <H2>절차와 방법</H2>
      <p style={body}>아래 순서대로 진행하면 돼요.</p>
      <Steps steps={STEPS} />
      <Divider />
      <H2>알아두면 좋은 것들</H2>
      <BorderBox><strong>참고사항</strong>{"\n"}· 5세대는 비급여 자기부담률이 50%로 인상돼요\n· 비중증 비급여 한도가 연 1천만원으로 줄어요\n· 중증 환자는 본인부담 최대 500만원으로 보장 강화돼요</BorderBox>
      <Divider />
      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준으로 작성했어요. 법 개정이나 정책 변경에 따라 내용이 달라질 수 있으니 관련 기관에서 최신 정보를 확인해 주세요." />
    </ArticleLayout>
  );
}
