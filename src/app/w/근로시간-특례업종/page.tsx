"use client";
import { H2, GreenBox, BorderBox, Divider, body, Steps, FAQ, SourceNote, Disclaimer, ArticleLayout, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";

const FAQS = [
  { q: "근로시간 특례업종·5개 업종 범위·연장근로 제한·폐지 계획에 대해 자세히 알 수 있나요?", a: "이 글에서 핵심 내용을 정리했어요. 아래 내용을 참고하세요." },
  { q: "관련 법령은 어디서 확인하나요?", a: "법제처(law.go.kr)에서 관련 법령 원문을 확인할 수 있어요." },
  { q: "더 자세한 상담은 어디서 받나요?", a: "정부 기관 상담센터나 전문가 상담을 이용하세요." },
  { q: "최신 정보는 어디서 확인하나요?", a: "관련 정부 기관 홈페이지에서 최신 내용을 확인할 수 있어요." },
  { q: "온라인으로 신청할 수 있나요?", a: "대부분 정부24(gov.kr)나 관련 기관 홈페이지에서 온라인 신청이 가능해요." }
];

const SOURCES = [
  { name: "법제처", href: "https://www.law.go.kr" }
];

const RELATED = [
  { slug: "주52시간-근무제-위반-처벌", title: "- title: \"주 52시간 근무제 위반 처벌", description: "" },
  { slug: "연장근로-수당-계산-방법", title: "연장근로 수당 계산 방법", description: "" },
  { slug: "근로시간-단축-지원금", title: "근로시간 단축 지원금", description: "" }
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
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>근로시간 특례업종·5개 업종 범위·연장근로 제한·폐지 계획</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>"택배 일하는데 주 60시간 넘게 일했나요? 버스 운전하는데 주말도 없이 일했죠. "특례업종이니까 괜찮다"고 들었는데 정말 맞는 말일까요? 202"</p>
      <p style={body}>근로시간 특례는 5개 업종만 주 52시간 예외 인정해요. 육상운송업, 수상운송업, 항공운송업, 보건업, 통신판매업이 해당되며 주 12시간까지 연장근로 가능해요.</p>
      <Divider /><ArticleAd position="intro" />
      <H2>핵심 정리</H2>
      <GreenBox title="요약">"· 특례업종은 2021년 26개→5개로 축소, 육상운송·수상운송·항공운송·보건·통신판매업만 유지\\n· 특례업종도 주 52시간 초과 금지, 근로자 동의 시 주 12시간 연장근로 가능\\n· 특례 적용 시 근로자 서면동의 필수, 연차사용 촉진 및 11시간 연속휴식 보장"</GreenBox>
      <CategoryButton label="근로/노동" count={10} href="/category/%EA%B7%BC%EB%A1%9C%2F%EB%85%B8%EB%8F%99" />
      <RelatedArticles items={RELATED} />
      <Divider />
      <H2>절차와 방법</H2>
      <p style={body}>아래 순서대로 진행하면 돼요.</p>
      <Steps steps={STEPS} />
      <Divider />
      <H2>알아두면 좋은 것들</H2>
      <BorderBox><strong>참고사항</strong>{"\n"}· 특례업종은 2021년 26개→5개로 축소, 육상운송·수상운송·항공운송·보건·통신판매업만 유지\n· 특례업종도 주 52시간 초과 금지, 근로자 동의 시 주 12시간 연장근로 가능\n· 특례 적용 시 근로자 서면동의 필수, 연차사용 촉진 및 11시간 연속휴식 보장</BorderBox>
      <Divider />
      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준으로 작성했어요. 법 개정이나 정책 변경에 따라 내용이 달라질 수 있으니 관련 기관에서 최신 정보를 확인해 주세요." />
    </ArticleLayout>
  );
}
