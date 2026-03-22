"use client";

// Q1: 종합소득세 신고 대상: 제외 대상과 미신고 불이익 info
// Q2: 사업자·프리랜서는 종합소득세 신고 대상이에요
// Q3: 사업자·프리랜서는 종합소득세 신고 대상이에요, 연말정산 끝낸 직장인은 신고 안 해도 돼요, 미신고 시 최대 40% 가산세와 대출 제한 등 불이익이 있어요
// Q4: GreenBox + Steps + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  { title: "사업자·프리랜서는 종합소득세 신고 대상이에요", desc: "사업자·프리랜서는 종합소득세 신고 대상이에요" },
  { title: "연말정산 끝낸 직장인은 신고 안 해도 돼요", desc: "연말정산 끝낸 직장인은 신고 안 해도 돼요" },
  { title: "미신고 시 최대 40% 가산세와 대출 제한 등 불이익이", desc: "미신고 시 최대 40% 가산세와 대출 제한 등 불이익이 있어요" },
];
const CHECKLIST = [
  "사업자·프리랜서는 종합소득세 신고 대상이에요",
  "연말정산 끝낸 직장인은 신고 안 해도 돼요",
  "미신고 시 최대 40% 가산세와 대출 제한 등 불이익이 있어요"
];

const FAQS = [
  { q: "종합소득세 신고 안 하면 과태료만 내면 끝인가요?", a: "아니에요. 가산세뿐 아니라 소득증명 발급 불가로 대출이 막히고, 신용등급 하락, 정부 지원사업 제외 등 여러 불이익이 생겨요." },
  { q: "종합소득세 환급받을 돈이 있어도 신고 안 하면 어떻게 되나요?", a: "5년이 지나면 환급금이 국고로 들어가서 영원히 못 받아요. 환급 대상이라도 반드시 기한 내 신고해야 해요." }
];

const REFERENCES = [
  { category: "출처", items: [
      { label: "국세청 종합소득세 신고", url: "https://hometax.go.kr/websquare/websquare.html?w2xPath=/ui/pp/index_pp.xml&tmIdx=41&tm2lIdx=4103000000&tm3lIdx=4103150000" },
      { label: "국세청 종합소득세 개요", url: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7664&mi=2224" },
      { label: "국세청 가산세 안내", url: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2228&cntntsId=7668" }
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 절세</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        종합소득세 신고 대상<br />
        제외 대상과 미신고 불이익
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        종합소득세 꼭 신고해야 하는지 헷갈리시죠? 신고 대상 여부와 안 냈을 때 불이익을 알려드려요
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>사업자·프리랜서는 종합소득세 신고 대상이에요</H2>
      <p style={body}>사업자·프리랜서는 종합소득세 신고 대상이에요</p>
      <GreenBox title="핵심 정리">
        사업자·프리랜서는 종합소득세 신고 대상이에요<br />
        연말정산 끝낸 직장인은 신고 안 해도 돼요<br />
        미신고 시 최대 40% 가산세와 대출 제한 등 불이익이 있어요
      </GreenBox>

      <CategoryButton label="세금 · 절세 정보" count={5} href="/category/세금" />
      <RelatedArticles items={[]} />
      <Divider />

      <H2>연말정산 끝낸 직장인은 신고 안 해도 돼요</H2>
      <p style={body}>연말정산 끝낸 직장인은 신고 안 해도 돼요</p>
      <Steps steps={STEPS} />
      <Divider />
      <H2>꼭 체크해야 할 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>놓치기 쉬운 항목을 정리했어요.</p>
      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />
      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />
      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 정보를 바탕으로 작성됐어요. 최신 정보는 관련 기관에서 직접 확인해보세요." />
    </ArticleLayout>
  );
}
