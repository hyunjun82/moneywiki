"use client";
import { H2, GreenBox, BorderBox, Divider, body, Steps, FAQ, SourceNote, Disclaimer, ArticleLayout, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";

const FAQS = [
  { q: "농지 폐수배출시설 전용허가 제한 시설에 대해 자세히 알 수 있나요?", a: "이 글에서 핵심 내용을 정리했어요. 아래 내용을 참고하세요." },
  { q: "관련 법령은 어디서 확인하나요?", a: "법제처(law.go.kr)에서 관련 법령 원문을 확인할 수 있어요." },
  { q: "더 자세한 상담은 어디서 받나요?", a: "정부 기관 상담센터나 전문가 상담을 이용하세요." },
  { q: "최신 정보는 어디서 확인하나요?", a: "관련 정부 기관 홈페이지에서 최신 내용을 확인할 수 있어요." },
  { q: "온라인으로 신청할 수 있나요?", a: "대부분 정부24(gov.kr)나 관련 기관 홈페이지에서 온라인 신청이 가능해요." }
];

const SOURCES = [
  { name: "- name: \"농지법", href: "https://www.law.go.kr/법령/농지법" },
  { name: "농지법 시행령", href: "https://www.law.go.kr/법령/농지법시행령" },
  { name: "생활법령정보-농지전용허가", href: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=1815&ccfNo=2&cciNo=1&cnpClsNo=1" }
];

const RELATED = [
  { slug: "농지전용허가-신청-방법", title: "- title: \"농지전용허가 신청 방법", description: "" },
  { slug: "농지보전부담금-계산", title: "농지보전부담금 계산", description: "" }
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
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>농지 폐수배출시설 전용허가 제한 시설</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>"농촌에 공장 부지 구하다가 농지가 저렴해서 구입했는데, 전용허가 신청했더니 거부됐다는 얘기 들어보셨나요? 특히 폐수 배출하는 시설은 [농지법]("</p>
      <p style={body}>농지를 폐수배출시설로 쓰려고 전용허가 신청했는데 거부될 수 있어요. 도시지역이나 계획관리지역이 아니면 안 되거든요.</p>
      <Divider /><ArticleAd position="intro" />
      <H2>핵심 정리</H2>
      <GreenBox title="요약">"· 폐수배출시설: 물환경보전법 시행령 별표 13의 1~4종 사업장은 농지전용 제한\\n· 예외 지역: 도시지역, 계획관리지역, 개발진흥지구 내 농지는 전용 가능\\n· 법 개정: 2025년 6월 2일 개정, 2026년 현재 적용 중"</GreenBox>
      <CategoryButton label="부동산" count={10} href="/category/%EB%B6%80%EB%8F%99%EC%82%B0" />
      <RelatedArticles items={RELATED} />
      <Divider />
      <H2>절차와 방법</H2>
      <p style={body}>아래 순서대로 진행하면 돼요.</p>
      <Steps steps={STEPS} />
      <Divider />
      <H2>알아두면 좋은 것들</H2>
      <BorderBox><strong>참고사항</strong>{"\n"}· 폐수배출시설: 물환경보전법 시행령 별표 13의 1~4종 사업장은 농지전용 제한\n· 예외 지역: 도시지역, 계획관리지역, 개발진흥지구 내 농지는 전용 가능\n· 법 개정: 2025년 6월 2일 개정, 2026년 현재 적용 중</BorderBox>
      <Divider />
      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준으로 작성했어요. 법 개정이나 정책 변경에 따라 내용이 달라질 수 있으니 관련 기관에서 최신 정보를 확인해 주세요." />
    </ArticleLayout>
  );
}
