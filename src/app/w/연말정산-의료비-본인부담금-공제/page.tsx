"use client";
import { Divider } from "@/components/article-ui/Divider";

// Q1: 연말정산 의료비 본인부담금 공제 info
// Q2: 건강보험 적용 후 본인이 부담한 금액과 비급여 진료비가 공제 대상이에요.
// Q3: 건강보험 적용 후 본인이 부담한 금액과 비급여 진료비가 공제 대상이에요., 실손보험이나 본인부담상한제로 돌려받은 금액은 공제 대상에서 제외돼요., 총급여 3% 초과분부터 15% 세액공제가 적용돼요.
// Q4: GreenBox + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST = [
  "건강보험 적용 후 본인이 부담한 금액과 비급여 진료비가 공제 대상이에요.",
  "실손보험이나 본인부담상한제로 돌려받은 금액은 공제 대상에서 제외돼요.",
  "총급여 3% 초과분부터 15% 세액공제가 적용돼요."
];

const FAQS = [
  { q: "비급여 진료비도 공제되나요?", a: "네, 건강보험 비급여 항목도 의료비 세액공제 대상이에요. 단, 미용·성형 목적은 제외돼요." },
  { q: "실손보험으로 돌려받은 금액도 공제되나요?", a: "아니요, 실손보험 등으로 보전받은 금액은 공제 대상에서 제외돼요." },
  { q: "본인부담상한제 환급금은 어떻게 되나요?", a: "환급받은 금액은 의료비 공제 대상에서 제외해야 해요." },
  { q: "MRI, CT도 공제돼요?", a: "네, 비급여 MRI, CT 검사비도 치료 목적이면 공제 대상이에요." },
  { q: "성형수술은 공제 안 되나요?", a: "미용 목적 성형은 공제 안 돼요. 다만 치료 목적(사고 후 재건 등)이면 공제 가능해요." }
];

const REFERENCES = [
  { category: "출처", items: [
      { label: "국세청 연말정산 안내", url: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2304&cntntsId=238938" },
      { label: "소득세법 제59조의4", url: "https://www.law.go.kr/법령/소득세법" }
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 연말정산</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        연말정산 의료비 본인부담금 공제
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        건강보험 적용 후 본인부담금과 비급여 진료비 모두 15% 세액공제 대상이에요. 실손보험 환급금은 제외돼요
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>건강보험 적용 후 본인이 부담한 금액과 비급여 진료비가</H2>
      <p style={body}>건강보험 적용 후 본인이 부담한 금액과 비급여 진료비가 공제 대상이에요.</p>
      <GreenBox title="핵심 정리">
        건강보험 적용 후 본인이 부담한 금액과 비급여 진료비가 공제 대상이에요.<br />
        실손보험이나 본인부담상한제로 돌려받은 금액은 공제 대상에서 제외돼요.<br />
        총급여 3% 초과분부터 15% 세액공제가 적용돼요.
      </GreenBox>

      <CategoryButton label="세금 · 연말정산 정보" count={5} href="/category/연말정산" />
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
      <Disclaimer text="이 글은 2025년 귀속 연말정산 기준 정보를 바탕으로 작성됐어요. 최신 정보는 관련 기관에서 직접 확인해보세요." />
    </ArticleLayout>
  );
}
