"use client";
// Q1: 연말정산에서 의료비·교육비·기부금 등 특별세액공제 항목별 한도를 알고 싶은 직장인
// Q2: 특별세액공제 항목별 한도를 확인하고 공제 최대화
// Q3: 보험료 12만원, 의료비 총급여 3% 초과분, 교육비 한도별, 기부금 한도, 표준공제 13만원과 비교
// Q4: DocTable(항목별 한도) + GreenBox(핵심) + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const LIMIT_DOCS = [
  { name: "보험료", required: true, where: "납입액의 12%, 연 100만원 한도" },
  { name: "의료비", required: true, where: "총급여 3% 초과분의 15%, 난임시술 30%, 한도 700만원(본인·장애인·65세 이상은 한도 없음)" },
  { name: "교육비", required: true, where: "15%, 본인 한도 없음 / 취학전 300만원 / 초중고 300만원 / 대학생 900만원" },
  { name: "기부금", required: true, where: "법정기부금 100%, 지정기부금 소득 30% 한도, 세액공제율 15%(1천만원 초과분 30%)" },
  { name: "월세", required: false, where: "총급여 7천만원 이하, 연 750만원 한도, 17%(5,500만원 이하) / 15%(5,500만원 초과)" },
];

const CHECKLIST = [
  "보험료·의료비·교육비·기부금 등에 대한 세액공제 한도를 정리했어요",
  "항목별 한도를 초과하는 금액은 공제받을 수 없어요",
  "모든 특별세액공제 합계가 13만원 미만이면 표준공제(13만원)가 유리해요",
];

const FAQS = [
  { q: "특별세액공제 항목별 한도가 어떻게 되나요?", a: "보험료 연 100만원, 의료비 700만원(본인은 한도 없음), 교육비 300~900만원, 기부금은 소득의 30% 한도예요." },
  { q: "표준공제 13만원이랑 뭐가 다른가요?", a: "특별세액공제 합계가 13만원 이상이면 항목별 공제가 유리하고, 미만이면 표준공제가 유리해요. 둘 중 하나만 선택할 수 있어요." },
  { q: "의료비 한도 없는 경우가 있나요?", a: "본인, 장애인, 65세 이상 부양가족의 의료비는 공제 한도가 없어요. 총급여 3% 초과분 전액을 공제받을 수 있어요." },
  { q: "교육비에 학원비도 포함되나요?", a: "취학 전 아동의 학원비는 포함돼요. 초중고 학생의 학원비는 포함 안 돼요. 대학생 등록금은 포함돼요." },
  { q: "월세 세액공제는 특별세액공제에 포함되나요?", a: "네, 특별세액공제에 포함돼요. 총급여 7천만원 이하이고 무주택 세대주(또는 세대원)이면 받을 수 있어요." },
];

const REFERENCES = [
  { category: "출처", items: [
    { label: "소득세법 제59조의4 (특별세액공제)", url: "https://www.law.go.kr/법령/소득세법" },
    { label: "국세청 연말정산 안내", url: "https://www.nts.go.kr" },
  ]},
];

const RELATED = [
  { slug: "연말정산-표준공제", title: "연말정산 표준공제", description: "13만원 표준공제와 비교하는 기준이에요." },
  { slug: "연말정산-의료비-공제", title: "연말정산 의료비 공제", description: "의료비 공제 상세 조건이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 연말정산</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        특별세액공제 항목별 한도는?<br />
        보험료·의료비·교육비·기부금 공제 정리
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        연말정산에서 보험료, 의료비, 교육비, 기부금은 각각 공제 한도가 달라요. 항목별 한도를 정확히 알아야 공제를 최대로 받을 수 있어요.
      </p>
      <Divider /><ArticleAd position="intro" />
      <H2>항목별 공제 한도</H2>
      <p style={body}>특별세액공제는 5가지 항목으로 나뉘어요. 각각 한도와 공제율이 달라요.</p>
      <SectionBadge>특별세액공제 항목별 한도</SectionBadge>
      <DocTable docs={LIMIT_DOCS} />
      <GreenBox title="판단 기준">
        특별세액공제 합계가 13만원 이상 → 항목별 공제<br />
        합계가 13만원 미만 → 표준공제 13만원이 유리
      </GreenBox>
      <CategoryButton label="세금·연말정산 정보" count={12} href="/category/연말정산" />
      <RelatedArticles items={RELATED} />
      <Divider />
      <H2>꼭 체크해야 할 것들</H2>
      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />
      <Divider />
      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2025년 귀속 연말정산 기준으로 작성됐어요. 공제 한도와 세율은 세법 개정에 따라 변경될 수 있어요." />
    </ArticleLayout>
  );
}
