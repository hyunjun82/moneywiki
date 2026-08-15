"use client";
// Q1: 산지전용허가 면적 변경 신고 절차 info
// Q2: 면적 변경 시 원칙은 변경허가지만, 경미한 사항은 신고로 가능
// Q3: 면적 변경 시 원칙은 변경허가지만, 경미한 사항은 신고로 가능, 측량오차로 인한 면적 증감이나 경계 변경은 신고로 처리, 사업계획 변경은 면적이 안 바뀌면 신고, 면적 바뀌면 변경허가 필요
// Q4: GreenBox + Steps + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  { title: "면적 변경 시 원칙은 변경허가지만, 경미한 사항은 신고", desc: "면적 변경 시 원칙은 변경허가지만, 경미한 사항은 신고로 가능" },
  { title: "측량오차로 인한 면적 증감이나 경계 변경은 신고로 처리", desc: "측량오차로 인한 면적 증감이나 경계 변경은 신고로 처리" },
  { title: "사업계획 변경은 면적이 안 바뀌면 신고, 면적 바뀌면 ", desc: "사업계획 변경은 면적이 안 바뀌면 신고, 면적 바뀌면 변경허가 필요" },
];
const CHECKLIST = [
  "면적 변경 시 원칙은 변경허가지만, 경미한 사항은 신고로 가능",
  "측량오차로 인한 면적 증감이나 경계 변경은 신고로 처리",
  "사업계획 변경은 면적이 안 바뀌면 신고, 면적 바뀌면 변경허가 필요"
];

const FAQS = [
  { q: "변경신고만 하면 되는 경우는 언제인가요?", a: "측량오차로 면적이나 경계가 바뀌는 경우, 또는 사업계획이 바뀌어도 면적은 그대로인 경우예요. 이럴 땐 신고만 하면 돼요." },
  { q: "변경신고 안 하면 과태료 받나요?", a: "네, 변경신고를 하지 않으면 500만원 이하의 과태료가 부과돼요. 꼭 기한 내에 신고하세요." },
  { q: "변경신고는 어디에 하나요?", a: "산지전용허가를 받은 관할 행정청(시장, 군수, 구청장)에게 신고하면 돼요. 산지전용통합정보시스템에서 온라인으로도 가능해요." }
];

const REFERENCES = [
  { category: "출처", items: [
      { label: "산지관리법", url: "https://www.law.go.kr/법령/산지관리법" },
      { label: "산지전용통합정보시스템", url: "https://fcis.forest.go.kr" }
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 임대차</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        산지전용허가 면적 변경 신고 절차
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        산지전용허가 받은 땅의 면적이 바뀌었어요. 변경신고만 해도 되는지, 다시 허가받아야 하는지 알아봐요
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>면적 변경 시 원칙은 변경허가지만, 경미한 사항은 신고</H2>
      <p style={body}>면적 변경 시 원칙은 변경허가지만, 경미한 사항은 신고로 가능</p>
      <GreenBox title="핵심 정리">
        면적 변경 시 원칙은 변경허가지만, 경미한 사항은 신고로 가능<br />
        측량오차로 인한 면적 증감이나 경계 변경은 신고로 처리<br />
        사업계획 변경은 면적이 안 바뀌면 신고, 면적 바뀌면 변경허가 필요
      </GreenBox>

      <CategoryButton label="부동산 · 임대차 정보" count={5} href="/category/부동산" />
      <RelatedArticles items={[]} />
      <Divider />

      <H2>측량오차로 인한 면적 증감이나 경계 변경은 신</H2>
      <p style={body}>측량오차로 인한 면적 증감이나 경계 변경은 신고로 처리</p>
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
