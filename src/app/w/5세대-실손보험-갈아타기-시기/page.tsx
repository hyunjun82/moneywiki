"use client";
import { H2, GreenBox, BorderBox, Divider, body, Steps, FAQ, SourceNote, Disclaimer, ArticleLayout, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";

const FAQS = [
  { q: "5세대 실손 갈아타기: 시기와 비용에 대해 자세히 알 수 있나요?", a: "이 글에서 핵심 내용을 정리했어요. 아래 내용을 참고하세요." },
  { q: "관련 법령은 어디서 확인하나요?", a: "법제처(law.go.kr)에서 관련 법령 원문을 확인할 수 있어요." },
  { q: "더 자세한 상담은 어디서 받나요?", a: "정부 기관 상담센터나 전문가 상담을 이용하세요." },
  { q: "최신 정보는 어디서 확인하나요?", a: "관련 정부 기관 홈페이지에서 최신 내용을 확인할 수 있어요." },
  { q: "온라인으로 신청할 수 있나요?", a: "대부분 정부24(gov.kr)나 관련 기관 홈페이지에서 온라인 신청이 가능해요." }
];

const SOURCES = [
  { name: "- name: \"KB의 생각 5세대 실손보험", href: "https://kbthink.com/insurance/trend/5th-generation.html" },
  { name: "뱅크샐러드 5세대 실손보험 가이드", href: "https://www.banksalad.com/articles/%EB%B3%B4%ED%97%98-%EC%8B%A4%EC%86%90%EB%B3%B4%ED%97%98-5%EC%84%B8%EB%8C%80%EC%8B%A4%EC%86%90" },
  { name: "보험저널 5세대 실손 출시 일정", href: "https://www.insjournal.co.kr/news/articleView.html?idxno=29812" }
];

const RELATED = [
  { slug: "5세대-실손보험-가입-조건", title: "- title: \"5세대 실손보험 누가 가입할 수 있나요", description: "" },
  { slug: "5세대-실손보험-보장-내용", title: "5세대 실손보험 뭐가 달라졌나요", description: "" },
  { slug: "5세대-실손보험-자기부담금", title: "5세대 실손 자기부담률 50%", description: "" }
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
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>5세대 실손 갈아타기: 시기와 비용</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>"4세대 실손보험 가입했는데 5세대로 바꿔야 할까요? 결론부터 말하면 2026년 7월부터 갱신일에 자동으로 전환돼요. 전환 수수료는 없지만 비급여"</p>
      <p style={body}>4세대 실손 유지할지 5세대로 바꿀지 고민되시나요? 2026년 7월부터 갱신일에 자동 전환되고 수수료는 없어요. 병원 자주 가면 4세대 유지가 유리한 이유를 알려드려요</p>
      <Divider /><ArticleAd position="intro" />
      <H2>핵심 정리</H2>
      <GreenBox title="요약">"· 2026년 7월부터 갱신일에 순차적으로 5세대로 자동 전환돼요\\n· 전환 수수료는 없고 보험료는 30~50% 저렴해져요\\n· 병원 자주 가면 4세대 유지, 건강하면 5세대 전환이 유리해요"</GreenBox>
      <CategoryButton label="보험" count={10} href="/category/%EB%B3%B4%ED%97%98" />
      <RelatedArticles items={RELATED} />
      <Divider />
      <H2>절차와 방법</H2>
      <p style={body}>아래 순서대로 진행하면 돼요.</p>
      <Steps steps={STEPS} />
      <Divider />
      <H2>알아두면 좋은 것들</H2>
      <BorderBox><strong>참고사항</strong>{"\n"}· 2026년 7월부터 갱신일에 순차적으로 5세대로 자동 전환돼요\n· 전환 수수료는 없고 보험료는 30~50% 저렴해져요\n· 병원 자주 가면 4세대 유지, 건강하면 5세대 전환이 유리해요</BorderBox>
      <Divider />
      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준으로 작성했어요. 법 개정이나 정책 변경에 따라 내용이 달라질 수 있으니 관련 기관에서 최신 정보를 확인해 주세요." />
    </ArticleLayout>
  );
}
