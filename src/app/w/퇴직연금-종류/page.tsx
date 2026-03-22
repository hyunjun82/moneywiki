"use client";
import { H2, GreenBox, BorderBox, Divider, body, Steps, FAQ, SourceNote, Disclaimer, ArticleLayout, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";

const FAQS = [
  { q: "  - question: 퇴직연금 종류가 뭐가 있어요?", a: "DB형(확정급여형), DC형(확정기여형), IRP(개인형 퇴직연금) 세 가지가 있어요." },
  { q: "DB형이랑 DC형 중 뭐가 좋아요?", a: "임금 상승률이 높으면 DB형, 투자에 자신 있으면 DC형이 유리해요." },
  { q: "IRP는 꼭 가입해야 하나요?", a: "퇴직금 수령 시 IRP로 받는 게 의무예요. 세액공제 혜택도 있어요." },
  { q: "퇴직연금 종류를 바꿀 수 있나요?", a: "회사 규정에 따라 DB에서 DC로 변경 가능한 경우가 있어요. 인사팀에 문의하세요." },
  { q: "중소기업도 퇴직연금 있나요?", a: "네. 1인 이상 사업장은 퇴직급여 제도 의무예요. 퇴직연금이나 퇴직금 제도 중 선택해요." }
];

const SOURCES = [
  { name: "- name: 근로자퇴직급여보장법", href: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
  { name: "고용노동부 퇴직연금제도", href: "https://www.moel.go.kr/policy/policyinfo/retire/list.do" }
];

const RELATED = [
  { slug: "퇴직금", title: "- title: 퇴직금", description: "" },
  { slug: "퇴직금-irp-의무", title: "퇴직금 IRP 의무", description: "" },
  { slug: "퇴직연금-수령방법", title: "퇴직연금 수령방법", description: "" }
];

const STEPS = [
  { title: "관련 정보를 확인하세요", desc: "정부 기관 홈페이지나 법제처에서 최신 기준을 확인할 수 있어요." },
  { title: "필요한 서류를 준비하세요", desc: "신분증과 관련 서류를 미리 준비하면 절차가 빠르게 진행돼요." },
  { title: "온라인 또는 방문 신청하세요", desc: "정부24, 홈택스 등에서 온라인 신청이 가능해요. 방문 신청은 관할 기관에서 할 수 있어요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>퇴직연금 종류와 DB형 DC형 IRP 차이점 비교</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>"퇴직금 받을 때 퇴직연금 가입되어 있다고 하는데 DB형, DC형, IRP가 뭐가 다른지 모르시겠죠. 종류마다 특징이 확실히 달라서 본인 상황에 "</p>
      <p style={body}>퇴직연금 종류와 차이점 알려드려요. DB형, DC형, IRP 중 나에게 맞는 게 뭔지 알아보세요</p>
      <Divider /><ArticleAd position="intro" />
      <H2>핵심 정리</H2>
      <GreenBox title="요약">"· 퇴직연금은 DB형, DC형, IRP 세 가지가 있어요.\\n· DB형은 회사가 운용하고, DC형은 본인이 운용해요.\\n· IRP는 개인이 가입하는 퇴직연금 계좌예요."</GreenBox>
      <CategoryButton label="퇴직금" count={10} href="/category/%ED%87%B4%EC%A7%81%EA%B8%88" />
      <RelatedArticles items={RELATED} />
      <Divider />
      <H2>절차와 방법</H2>
      <p style={body}>아래 순서대로 진행하면 돼요.</p>
      <Steps steps={STEPS} />
      <Divider />
      <H2>알아두면 좋은 것들</H2>
      <BorderBox><strong>참고사항</strong>{"\n"}· 퇴직연금은 DB형, DC형, IRP 세 가지가 있어요.\n· DB형은 회사가 운용하고, DC형은 본인이 운용해요.\n· IRP는 개인이 가입하는 퇴직연금 계좌예요.</BorderBox>
      <Divider />
      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준으로 작성했어요. 법 개정이나 정책 변경에 따라 내용이 달라질 수 있으니 관련 기관에서 최신 정보를 확인해 주세요." />
    </ArticleLayout>
  );
}
