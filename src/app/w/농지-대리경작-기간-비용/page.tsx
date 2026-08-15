"use client";
// Q1. 농지를 가지고 있는데 직접 농사를 못 지어서, 대리경작 제도의 기간·비용·계약 방법이 궁금한 상황이에요.
// Q2. 대리경작 계약 조건을 이해하고 서면 계약을 체결하는 행동.
// Q3. 대리경작과 임대차 차이, 경작 기간·비용, 농지법 규정, 계약 시 주의사항.
// Q4. GreenBox(핵심 구분) + BorderBox(계약 포인트) + Checklist(계약 체크) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const CONTRACT_ITEMS = [
  "경작 기간(시작일~종료일)을 명확히 기재",
  "경작료(금전 또는 수확물 분배 비율) 약정",
  "작물 종류와 경작 방법 지정",
  "토양 훼손·농약 사용 범위 합의",
  "계약 해지 조건과 원상복구 의무 명시",
  "서면 계약 체결 (구두 계약은 분쟁 위험)",
];

const FAQS = [
  { q: "대리경작과 농지 임대차는 뭐가 다른가요?", a: "임대차는 임차인에게 경작권이 완전히 넘어가요. 대리경작은 소유자가 관리 책임을 유지하면서 경작만 위탁하는 구조예요. 농지법상 자경 의무 면제 방식도 달라요." },
  { q: "대리경작료는 보통 얼마인가요?", a: "지역·작물·면적에 따라 달라요. 논은 연 수확량의 20~30%를 현물로, 밭은 연 50만~200만원/1,000㎡ 수준이 일반적이에요. 지역 농업기술센터에서 시세를 참고할 수 있어요." },
  { q: "대리경작하면 농지 처분명령을 피할 수 있나요?", a: "대리경작만으로는 자경 의무를 충족하지 못해요. 농지법상 자경은 본인이 직접 경작하는 걸 의미해요. 처분명령 대상이라면 별도 대응이 필요해요." },
  { q: "대리경작 계약 기간에 제한이 있나요?", a: "법적 제한은 없어요. 당사자 간 자유롭게 정할 수 있어요. 보통 1~3년 단위로 계약하고 갱신하는 게 일반적이에요." },
  { q: "대리경작 중 토양이 훼손되면 누가 책임지나요?", a: "계약서에 명시된 대로 따라요. 명시하지 않았다면 민법상 선관주의의무에 따라 경작자가 원상복구 책임을 져요." },
];

const REFERENCES = [
  { category: "법령", items: [
    { label: "농지법(법제처)", url: "https://www.law.go.kr/법령/농지법" },
    { label: "농림축산식품부", url: "https://www.mafra.go.kr" },
  ]},
];

const RELATED = [
  { slug: "농지-처분명령-불이행-제재", title: "농지 처분명령 불이행 시 제재", description: "처분 기한과 이행강제금 구조를 정리했어요." },
  { slug: "농지보전부담금-5천만원-할부-납부", title: "농지보전부담금 할부 납부", description: "5천만원 이상 부담금은 분할 납부가 가능해요." },
  { slug: "농지-임대차-대리경작-가능여부", title: "농지 임대차와 대리경작 가능 여부", description: "어떤 경우에 임대차가 되고 안 되는지 정리했어요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 농지</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        농지 대리경작, 기간과 비용은 얼마나 드나요?<br />
        계약 조건과 주의사항
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        농지를 가지고 있는데 직접 농사를 짓기 어려운 상황이죠? 대리경작은 소유권은 유지하면서 경작만 다른 사람에게 맡기는 방식이에요.
        임대차와 다르고 농지법상 자경과도 다르니, 계약 전에 구조를 정확히 이해해야 해요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>대리경작이란? 임대차와 뭐가 다른가요?</H2>
      <p style={body}>
        대리경작은 농지 소유자가 관리 책임을 유지하면서 경작 행위만 위탁하는 거예요.
        <a href="https://www.law.go.kr/법령/농지법" style={{ color: "#1D9E75", textDecoration: "underline" }}>농지법</a>상 임대차와는 법적 성격이 달라요.
      </p>

      <GreenBox title="핵심 구분">
        · 대리경작: 소유자 관리 책임 유지 + 경작만 위탁<br />
        · 임대차: 임차인에게 경작권 완전 이전<br />
        · 자경: 소유자가 직접 경작 (농지법상 의무)
      </GreenBox>

      <Divider />

      <H2>경작 기간과 비용은 어떻게 정하나요?</H2>
      <p style={body}>
        법적으로 정해진 기간 제한은 없어요. 당사자 간 자유롭게 정할 수 있고, 보통 1~3년 단위로 계약해요.
        경작료도 지역·작물·면적에 따라 다르게 책정돼요.
      </p>

      <BorderBox>
        <strong>일반적인 경작료 수준</strong><br /><br />
        · 논: 수확량의 20~30% (현물 분배)<br />
        · 밭: 연 50만~200만원 / 1,000㎡<br />
        · 과수원: 수확량의 30~40% 또는 고정 금액<br /><br />
        지역 농업기술센터에서 시세를 참고할 수 있어요.
      </BorderBox>

      <Divider />

      <H2>계약 전에 이것만은 꼭 챙기세요</H2>
      <p style={body}>
        구두 계약은 분쟁이 생겼을 때 증명이 어려워요. 반드시 서면으로 작성하고, 아래 항목을 빠짐없이 넣으세요.
      </p>

      <Checklist items={CONTRACT_ITEMS} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <RelatedArticles items={RELATED} />
      <Disclaimer text="이 글은 2026년 농지법을 기준으로 작성됐어요. 지역별 관행과 경작료 수준이 다를 수 있으니 해당 지역 농업기술센터에 문의하세요." />
    </ArticleLayout>
  );
}
