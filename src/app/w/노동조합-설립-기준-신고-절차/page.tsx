"use client";
import { H2, GreenBox, BorderBox, Divider, body, Steps, FAQ, SourceNote, Disclaimer, ArticleLayout, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";

const FAQS = [
  { q: "노동조합 설립·기준·신고 절차에 대해 자세히 알 수 있나요?", a: "이 글에서 핵심 내용을 정리했어요. 아래 내용을 참고하세요." },
  { q: "관련 법령은 어디서 확인하나요?", a: "법제처(law.go.kr)에서 관련 법령 원문을 확인할 수 있어요." },
  { q: "더 자세한 상담은 어디서 받나요?", a: "정부 기관 상담센터나 전문가 상담을 이용하세요." },
  { q: "최신 정보는 어디서 확인하나요?", a: "관련 정부 기관 홈페이지에서 최신 내용을 확인할 수 있어요." },
  { q: "온라인으로 신청할 수 있나요?", a: "대부분 정부24(gov.kr)나 관련 기관 홈페이지에서 온라인 신청이 가능해요." }
];

const SOURCES = [
  { name: "- name: \"노동조합및노동관계조정법", href: "https://www.law.go.kr/법령/노동조합및노동관계조정법" },
  { name: "정부24 노동조합 설립신고", href: "https://www.gov.kr/main?a=AA020InfoCappViewApp&HighCtgCD=A05004&CappBizCD=14900000117" },
  { name: "고용노동부", href: "https://www.moel.go.kr" }
];

const RELATED = [
  { slug: "근로기준법-해고-보호", title: "- title: \"근로기준법 해고 보호", description: "" },
  { slug: "성희롱-피해자-보호", title: "성희롱 피해자 보호", description: "" },
  { slug: "임금-미지급-대처", title: "임금 미지급 대처", description: "" }
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
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>노동조합 설립·기준·신고 절차</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>"일을 하다 보면 회사와 의견이 맞지 않을 때가 있어요. 임금이 제때 안 나온다거나, 휴식 시간이 부족하거나, 근무 조건이 열악할 때 말이에요. "</p>
      <p style={body}>근로자들이 함께 권리를 지키기 위해 노동조합을 만들 수 있어요. 설립하는 데 비용도 없고 절차도 간단해요.</p>
      <Divider /><ArticleAd position="intro" />
      <H2>핵심 정리</H2>
      <GreenBox title="요약">"· 노동조합을 설립하려면 정규직 근로자 3명 이상이 모여 총회를 열고 임원을 선출해야 해요\\n· 규약을 만들고 설립신고서를 관할 노동청에 제출하면, 3일 내 승인이 돼요\\n· 신고비는 무료고, 별도 심사나 승인 불가는 거의 없어요. 권리이기 때문이에요"</GreenBox>
      <CategoryButton label="근로/노동" count={10} href="/category/%EA%B7%BC%EB%A1%9C%2F%EB%85%B8%EB%8F%99" />
      <RelatedArticles items={RELATED} />
      <Divider />
      <H2>절차와 방법</H2>
      <p style={body}>아래 순서대로 진행하면 돼요.</p>
      <Steps steps={STEPS} />
      <Divider />
      <H2>알아두면 좋은 것들</H2>
      <BorderBox><strong>참고사항</strong>{"\n"}· 노동조합을 설립하려면 정규직 근로자 3명 이상이 모여 총회를 열고 임원을 선출해야 해요\n· 규약을 만들고 설립신고서를 관할 노동청에 제출하면, 3일 내 승인이 돼요\n· 신고비는 무료고, 별도 심사나 승인 불가는 거의 없어요. 권리이기 때문이에요</BorderBox>
      <Divider />
      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준으로 작성했어요. 법 개정이나 정책 변경에 따라 내용이 달라질 수 있으니 관련 기관에서 최신 정보를 확인해 주세요." />
    </ArticleLayout>
  );
}
