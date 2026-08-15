"use client";
// Q1: 연말정산 의료비 공제 완벽 가이드 (2025년) info
// Q2: 총급여의 3%를 초과한 의료비에 대해 15% 세액공제받아요
// Q3: 총급여의 3%를 초과한 의료비에 대해 15% 세액공제받아요, 본인·65세 이상·장애인 의료비는 한도 없이 전액 공제되죠, 난임시술비는 30%, 미숙아는 20% 공제율로 더 높아요
// Q4: GreenBox + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST = [
  "총급여의 3%를 초과한 의료비에 대해 15% 세액공제받아요",
  "본인·65세 이상·장애인 의료비는 한도 없이 전액 공제되죠",
  "난임시술비는 30%, 미숙아는 20% 공제율로 더 높아요"
];

const FAQS = [
  { q: "병원비 얼마부터 공제받을 수 있나요?", a: "총급여의 3%를 넘는 금액부터예요. 연봉 5천만원이면 150만원 넘는 병원비부터 공제받는 거죠." },
  { q: "성형수술도 공제되나요?", a: "아니요, 미용 목적 성형이나 라식수술은 공제 안 돼요. 치료 목적만 인정돼요." },
  { q: "부모님 병원비도 합산되나요?", a: "네, 부양가족이라면 나이와 소득 관계없이 합산할 수 있어요. 의료비는 인적공제와 별개예요." }
];

const REFERENCES = [
  { category: "출처", items: [
      { label: "국세청 2025년 귀속 키워드 연말정산 가이드", url: "https://www.nts.go.kr" },
      { label: "소득세법 제59조의4 (특별세액공제)", url: "https://www.law.go.kr" }
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>경제 · 생활</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        연말정산 의료비 공제 완벽 가이드 (2025년)
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        의료비는 총급여의 3%를 초과한 금액에 대해 15% 세액공제를 받을 수 있어요. 본인·부양가족 의료비를 합산해서 공제받으세요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>총급여의 3%를 초과한 의료비에 대해 15% 세액공제받</H2>
      <p style={body}>총급여의 3%를 초과한 의료비에 대해 15% 세액공제받아요</p>
      <GreenBox title="핵심 정리">
        총급여의 3%를 초과한 의료비에 대해 15% 세액공제받아요<br />
        본인·65세 이상·장애인 의료비는 한도 없이 전액 공제되죠<br />
        난임시술비는 30%, 미숙아는 20% 공제율로 더 높아요
      </GreenBox>

      <CategoryButton label="경제 · 생활 정보" count={5} href="/category/경제" />
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
      <Disclaimer text="이 글은 2026년 기준 정보를 바탕으로 작성됐어요. 최신 정보는 관련 기관에서 직접 확인해보세요." />
    </ArticleLayout>
  );
}
