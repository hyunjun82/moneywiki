"use client";
// Q1: 5세대 실손보험 가입을 고려하면서 어떤 보험사가 좋은지, 1~4세대와 뭐가 다른지 궁금한 사람
// Q2: 5세대 실손보험 특징을 이해하고 자기 상황에 맞게 가입 여부 판단
// Q3: 비급여 특약 분리, 보험료 인하, 도수치료·비급여 제한, 보험사별 비교 어려움(표준화), 기존 실손과 차이
// Q4: GreenBox(핵심 변경) + CompareTable(4세대 vs 5세대) + Checklist(가입 전 확인) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { CompareTable } from "@/components/article-ui/CompareTable";

const COMPARE_ROWS = [
  { label: "보험료", optionA: "상대적으로 저렴", optionB: "비급여 보험료 높음" },
  { label: "비급여 특약", optionA: "선택 가입 (분리)", optionB: "기본 포함" },
  { label: "도수치료", optionA: "비급여 특약 가입 시만 보장", optionB: "보장 (한도 내)" },
  { label: "자기부담률", optionA: "급여 20% / 비급여 30~50%", optionB: "급여 20% / 비급여 30%" },
  { label: "보험료 할인·할증", optionA: "적용 (비이용 할인)", optionB: "적용" },
  { label: "재가입 주기", optionA: "5년", optionB: "15년" },
];

const CHECKLIST = [
  "현재 실손보험(1~4세대) 보유 여부 확인",
  "기존 실손이 있으면 전환 vs 유지 비교 (기존 보장이 나을 수 있음)",
  "비급여 특약 필요성 판단 (도수치료, MRI 등 이용 빈도)",
  "보험료 비교 (급여 + 비급여 특약 합산으로 비교)",
  "재가입 주기 5년 → 5년마다 보험료 재산정됨을 인지",
  "건강 상태에 따른 가입 심사 통과 여부 확인",
];

const FAQS = [
  { q: "5세대 실손보험이 무조건 좋은 건가요?", a: "아니에요. 비급여 보장을 쓸 일이 많다면 4세대가 더 나을 수 있어요. 5세대는 비급여 특약이 분리되어 있어서 가입하지 않으면 비급여 보장이 없어요." },
  { q: "기존 실손보험에서 갈아타야 하나요?", a: "기존 1~3세대 실손은 보장 범위가 넓어서 유지하는 게 유리한 경우가 많아요. 보험료가 부담되면 갈아타기를 검토하되, 보장 축소를 감안해야 해요." },
  { q: "도수치료는 5세대에서 보장되나요?", a: "비급여 특약에 가입해야 보장돼요. 비급여 특약 없이 급여만 가입하면 도수치료 비용은 자비 부담이에요." },
  { q: "보험사별로 차이가 있나요?", a: "5세대 실손은 표준화 상품이라 보장 내용은 동일해요. 다만 보험료와 부가서비스(건강관리 앱 등)는 보험사별로 차이가 있어요." },
  { q: "5년마다 재가입이면 보험료가 올라가나요?", a: "재가입 시점의 나이와 의료이용 실적에 따라 보험료가 재산정돼요. 의료이용이 적으면 할인, 많으면 할증이 적용돼요." },
];

const REFERENCES = [
  { category: "안내", items: [
    { label: "금융감독원 실손보험 안내", url: "https://www.fss.or.kr" },
    { label: "보험개발원", url: "https://www.kidi.or.kr" },
  ]},
];

const RELATED = [
  { slug: "5세대-실손보험-도수치료-제외", title: "5세대 실손보험 도수치료 보장", description: "도수치료 보장 조건이 달라졌어요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 보험</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        5세대 실손보험, 가입해야 할까?<br />
        4세대와 차이점과 가입 전 확인사항
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        5세대 실손보험이 나왔다는데 기존 실손보다 뭐가 좋은 건지 헷갈리죠?
        가장 큰 변화는 비급여 특약이 분리된 거예요. 급여만 가입하면 보험료가 크게 낮아지지만, 도수치료 같은 비급여는 보장이 안 돼요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>4세대 vs 5세대, 뭐가 달라졌나?</H2>
      <p style={body}>5세대 실손은 비급여 보장을 선택형으로 분리한 게 핵심이에요.</p>
      <SectionBadge>4세대 vs 5세대 비교</SectionBadge>
      <CompareTable titleA="5세대 실손" titleB="4세대 실손" rows={COMPARE_ROWS} />

      <GreenBox title="가입 판단 기준">
        비급여 의료이용이 적고 보험료를 아끼고 싶다면 → 5세대 급여만 가입<br />
        도수치료·비급여 MRI 등을 자주 쓴다면 → 기존 실손 유지 또는 5세대 비급여 특약 추가
      </GreenBox>

      <CategoryButton label="금융·보험 정보" count={5} href="/category/금융" />
      <RelatedArticles items={RELATED} />
      <Divider />

      <H2>가입 전 꼭 확인할 것</H2>
      <p style={{ ...body, marginBottom: 14 }}>기존 실손이 있으면 갈아타기 전에 보장 범위를 반드시 비교하세요.</p>
      <SectionBadge>5세대 실손 가입 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />
      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />
      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 5세대 실손보험 제도를 바탕으로 작성됐어요. 보험료와 보장 내용은 보험사별로 다를 수 있으니 가입 전 약관을 확인해보세요." />
    </ArticleLayout>
  );
}
