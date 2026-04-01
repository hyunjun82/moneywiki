"use client";
import { Divider } from "@/components/article-ui/Divider";

// Q1: 연차휴가 보상 제한 사용촉진제도 적용 info
// Q2: 사용촉진제도를 적용하면 미사용 연차수당 지급 의무가 없어요.
// Q3: 사용촉진제도를 적용하면 미사용 연차수당 지급 의무가 없어요., 촉진 절차를 적법하게 밟아야 효력이 있어요., 근로자가 사용하지 않은 책임이 있어야 해요.
// Q4: GreenBox + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST = [
  "사용촉진제도를 적용하면 미사용 연차수당 지급 의무가 없어요.",
  "촉진 절차를 적법하게 밟아야 효력이 있어요.",
  "근로자가 사용하지 않은 책임이 있어야 해요."
];

const FAQS = [
  { q: "사용촉진하면 연차수당 안 줘도 되나요?", a: "적법한 촉진 절차를 밟았다면 수당 지급 의무가 없어요." },
  { q: "촉진했는데 업무 때문에 못 썼으면요?", a: "회사 책임으로 사용 못한 거면 수당을 지급해야 해요." },
  { q: "촉진 절차가 뭔가요?", a: "서면으로 미사용 일수 통보 → 시기 지정 요청 → 회사가 시기 지정이에요." }
];

const REFERENCES = [
  { category: "출처", items: [
      { label: "근로기준법 제61조", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "고용노동부 행정해석", url: "https://www.moel.go.kr" }
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연차휴가</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        연차휴가 보상 제한 사용촉진제도 적용
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        연차휴가 보상을 제한할 수 있나요? 연차휴가 사용촉진제도의 적용과 연차수당 지급 제한을 알려드릴게요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>사용촉진제도를 적용하면 미사용 연차수당 지급 의무가 없</H2>
      <p style={body}>사용촉진제도를 적용하면 미사용 연차수당 지급 의무가 없어요.</p>
      <GreenBox title="핵심 정리">
        사용촉진제도를 적용하면 미사용 연차수당 지급 의무가 없어요.<br />
        촉진 절차를 적법하게 밟아야 효력이 있어요.<br />
        근로자가 사용하지 않은 책임이 있어야 해요.
      </GreenBox>

      <CategoryButton label="연차휴가 정보" count={5} href="/category/연차휴가" />
      <RelatedArticles items={[]} />
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
