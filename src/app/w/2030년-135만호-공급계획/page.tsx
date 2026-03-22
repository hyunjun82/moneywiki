"use client";

// Q1: 2030년 135만호 공급계획이 뭔가요? 수도권 27만호 연간 일정과 지역별 배분 info
// Q2: 2030년까지 수도권 135만호 공급 (연 27만호)
// Q3: 2030년까지 수도권 135만호 공급 (연 27만호), 과거 대비 1.7배 많은 공급 물량, LH 직접 시행으로 공급 속도 향상
// Q4: GreenBox + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST = [
  "2030년까지 수도권 135만호 공급 (연 27만호)",
  "과거 대비 1.7배 많은 공급 물량",
  "LH 직접 시행으로 공급 속도 향상"
];

const FAQS = [
  { q: "2030년 135만호 공급계획은 언제 시작되나요?", a: "2026년부터 시작되고 연 27만호씩 2030년까지 계속돼요. 2026~2027년에 절반 정도가 착공될 예정이에요." },
  { q: "135만호 공급으로 집값이 내려갈까요?", a: "공급 증가로 가격 안정 효과는 있지만 입주까지 2~3년 걸려서 단기 효과는 제한적이에요. 2028년 이후 본격적인 효과 예상돼요." }
];

const REFERENCES = [
  { category: "출처", items: [
      { label: "국토교통부", url: "https://www.molit.go.kr/USR/NEWS/m_71/dtl.jsp?lcmspage=1&id=95091185" },
      { label: "국토교통부 2026 업무계획", url: "https://www.molit.go.kr/2026plan/sub3_realestate.html" }
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 임대차</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        2030년 135만호 공급계획이 뭔가요? 수도권 27만호 연간 일정과 지역별 배분
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        2030년까지 수도권에 135만호가 공급돼요. 연간 27만호씩 착공하고 과거 대비 1.7배 많은 수준이에요. 공급 일정과 지역별 배분 알려드려요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>2030년까지 수도권 135만호 공급 (연 27만호)</H2>
      <p style={body}>2030년까지 수도권 135만호 공급 (연 27만호)</p>
      <GreenBox title="핵심 정리">
        2030년까지 수도권 135만호 공급 (연 27만호)<br />
        과거 대비 1.7배 많은 공급 물량<br />
        LH 직접 시행으로 공급 속도 향상
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
      <Disclaimer text="이 글은 2026년 2월 기준 정보를 바탕으로 작성됐어요. 최신 정보는 관련 기관에서 직접 확인해보세요." />
    </ArticleLayout>
  );
}
