"use client";
// Q1: 임대차계약서 작성법 info
// Q2: 임대차계약서를 직접 작성하거나 확인할 수 있는 능력 확보
// Q3: 필수 기재사항, 특약 작성법, 확정일자 받기, 전자계약 방법
// Q4: GreenBox + Steps + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  { title: "필수 기재사항 확인", desc: "보증금, 월세, 관리비, 계약 기간, 임대인·임차인 인적사항을 정확히 기재해요." },
  { title: "세부 확인", desc: "desc2" },
  { title: "최종 행동", desc: "desc3" },
];
const CHECKLIST = [
  "계약서에 보증금, 월세, 관리비, 계약 기간을 명확히 기재하고 특약사항을 꼼꼼히 작성해야 해요"
];

const FAQS = [
  { q: "임대차계약서는 꼭 공인중개사를 통해야 하나요?", a: "아니요. 당사자 간 직접 계약도 유효합니다. 다만 분쟁 예방을 위해 공인중개사 중개를 권장합니다." },
  { q: "계약서에 도장이 없어도 유효한가요?", a: "네. 서명만으로도 계약은 유효합니다. 다만 도장 또는 서명 중 하나는 반드시 있어야 합니다." },
  { q: "전자계약서도 효력이 있나요?", a: "네. 부동산거래 전자계약시스템을 통한 전자계약은 법적 효력이 있으며 확정일자도 자동 부여됩니다." }
];

const REFERENCES = [
  { category: "출처", items: [
      { label: "국토교통부 표준임대차계약서", url: "https://www.molit.go.kr" },
      { label: "주택임대차보호법", url: "https://www.law.go.kr/법령/주택임대차보호법" }
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 임대차</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        임대차계약서 작성법
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        임대차계약서 작성 방법과 필수 기재 사항을 알아봅니다. 전세, 월세 계약서 양식과 특약사항 작성법을 정리합니다.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>임대차계약서 작성 핵심</H2>
      <p style={body}>임대차계약서는 보증금과 월세, 계약 기간, 특약사항을 정확히 기재해야 해요.</p>
      <GreenBox title="핵심 정리">
        계약서에 보증금, 월세, 관리비, 계약 기간을 명확히 기재해요
      </GreenBox>

      <CategoryButton label="부동산 · 임대차 정보" count={5} href="/category/부동산" />
      <RelatedArticles items={[]} />
      <Divider />

      <H2>세부 절차</H2>
      <p style={body}>desc2</p>
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
      <Disclaimer text="이 글은 2026년 표준임대차계약서 기준 정보를 바탕으로 작성됐어요. 최신 정보는 관련 기관에서 직접 확인해보세요." />
    </ArticleLayout>
  );
}
