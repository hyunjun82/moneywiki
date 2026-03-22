"use client";
import { H2, GreenBox, BorderBox, Divider, body, Steps, FAQ, SourceNote, Disclaimer, ArticleLayout, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";

const FAQS = [
  { q: "  - question: DB형에서 DC형으로 바꿀 수 있어요?", a: "네. 회사에 전환 신청하면 가능해요. 근로자 동의가 필요해요." },
  { q: "DC형에서 DB형으로 바꿀 수 있어요?", a: "아니요. DC형에서 DB형으로 전환은 법적으로 불가능해요." },
  { q: "전환하면 기존 적립금은 어떻게 되나요?", a: "DB형 적립금을 정산해서 DC형 계좌로 이전해요. 손해 보는 건 아니에요." },
  { q: "전환 시기가 정해져 있어요?", a: "회사 퇴직연금 규약에 따라 달라요. 보통 연 1~2회 전환 신청 기간이 있어요." },
  { q: "전환하면 유리해요?", a: "상황마다 달라요. 직접 운용하고 싶으면 DC형이 좋고, 안정적으로 받고 싶으면 DB형 유지가 나아요." }
];

const SOURCES = [
  { name: "- name: 고용노동부 퇴직연금제도", href: "https://www.moel.go.kr/policy/policyinfo/retire/list.do" },
  { name: "근로자퇴직급여보장법", href: "https://www.law.go.kr/법령/근로자퇴직급여보장법" }
];

const RELATED = [
  { slug: "퇴직연금-db-dc-차이", title: "- title: 퇴직연금 DB DC 차이", description: "" },
  { slug: "퇴직연금", title: "퇴직연금", description: "" },
  { slug: "퇴직연금-종류", title: "퇴직연금 종류", description: "" }
];

const STEPS = [
  { title: "관련 정보를 확인하세요", desc: "정부 기관 홈페이지나 법제처에서 최신 기준을 확인할 수 있어요." },
  { title: "필요한 서류를 준비하세요", desc: "신분증과 관련 서류를 미리 준비하면 절차가 빠르게 진행돼요." },
  { title: "온라인 또는 방문 신청하세요", desc: "정부24, 홈택스 등에서 온라인 신청이 가능해요. 방문 신청은 관할 기관에서 할 수 있어요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직연금</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>퇴직연금 DB DC 전환</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>"DB형 퇴직연금인데 DC형으로 바꾸고 싶으시죠. 직접 투자해서 수익을 높이고 싶은데 어떻게 전환하는지 모르시겠죠."</p>
      <p style={body}>DB형에서 DC형으로 퇴직연금 전환하는 방법 알려드려요. 한번 바꾸면 다시 못 돌아가요</p>
      <Divider /><ArticleAd position="intro" />
      <H2>핵심 정리</H2>
      <GreenBox title="요약">"· DB형에서 DC형으로 전환은 가능해요. 반대는 안 돼요.\\n· 회사에 전환 신청하고 근로자 동의를 받아요.\\n· 기존 DB형 적립금을 정산해서 DC형으로 이전해요."</GreenBox>
      <CategoryButton label="퇴직연금" count={10} href="/category/%ED%87%B4%EC%A7%81%EC%97%B0%EA%B8%88" />
      <RelatedArticles items={RELATED} />
      <Divider />
      <H2>절차와 방법</H2>
      <p style={body}>아래 순서대로 진행하면 돼요.</p>
      <Steps steps={STEPS} />
      <Divider />
      <H2>알아두면 좋은 것들</H2>
      <BorderBox><strong>참고사항</strong>{"\n"}· DB형에서 DC형으로 전환은 가능해요. 반대는 안 돼요.\n· 회사에 전환 신청하고 근로자 동의를 받아요.\n· 기존 DB형 적립금을 정산해서 DC형으로 이전해요.</BorderBox>
      <Divider />
      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준으로 작성했어요. 법 개정이나 정책 변경에 따라 내용이 달라질 수 있으니 관련 기관에서 최신 정보를 확인해 주세요." />
    </ArticleLayout>
  );
}
