"use client";

// Q1: 주택 증축 대수선 이웃 건축물 규제 2026 info
// Q2: 증축·대수선 시 건축선과 인접 대지 경계선에서 일정 거리 이격 필요
// Q3: 증축·대수선 시 건축선과 인접 대지 경계선에서 일정 거리 이격 필요, 이격 거리는 용도지역, 건물 용도, 규모에 따라 최대 6m까지 차이, 위반 시 도시지역 3년 이하 징역 또는 5억원 이하 벌금
// Q4: GreenBox + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST = [
  "증축·대수선 시 건축선과 인접 대지 경계선에서 일정 거리 이격 필요",
  "이격 거리는 용도지역, 건물 용도, 규모에 따라 최대 6m까지 차이",
  "위반 시 도시지역 3년 이하 징역 또는 5억원 이하 벌금"
];

const FAQS = [
  { q: "주택 증축 시 이웃집과 얼마나 떨어져야 하나요?", a: "용도지역과 건물 규모에 따라 다르지만, 인접 대지 경계선에서 0.5m~6m 이격해야 해요. 정확한 거리는 지역 건축조례로 정해져 있어요." },
  { q: "증축 허가 없이 공사하면 어떻게 되나요?", a: "도시지역에서는 3년 이하 징역이나 5억원 이하 벌금, 도시지역 밖에서는 2년 이하 징역이나 1억원 이하 벌금을 받을 수 있어요." },
  { q: "대수선도 허가가 필요한가요?", a: "건물 바닥면적이 200㎡ 미만이고 3층 미만이면 신고만 하면 돼요. 그 이상은 허가를 받아야 해요." }
];

const REFERENCES = [
  { category: "출처", items: [
      { label: "찾기쉬운 생활법령정보 - 단독주택건축(증축ㆍ대수선)", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=298&ccfNo=3&cciNo=1&cnpClsNo=4" },
      { label: "건축법", url: "https://www.law.go.kr/법령/건축법" }
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 임대차</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        주택 증축 대수선 이웃 건축물 규제 2026
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        집을 증축하거나 대수선할 때 이웃 건물이랑 얼마나 떨어뜨려야 하는지, 사람 출입은 어떻게 규제되는지 궁금하시죠? 건축법 규정을 쉽게 정리해 드릴게요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>증축·대수선 시 건축선과 인접 대지 경계선에서 일정 거</H2>
      <p style={body}>증축·대수선 시 건축선과 인접 대지 경계선에서 일정 거리 이격 필요</p>
      <GreenBox title="핵심 정리">
        증축·대수선 시 건축선과 인접 대지 경계선에서 일정 거리 이격 필요<br />
        이격 거리는 용도지역, 건물 용도, 규모에 따라 최대 6m까지 차이<br />
        위반 시 도시지역 3년 이하 징역 또는 5억원 이하 벌금
      </GreenBox>

      <CategoryButton label="부동산 · 임대차 정보" count={5} href="/category/부동산" />
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
