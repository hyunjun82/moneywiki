"use client";

// Q1: 연금저축 종신연금 세율: 3.3% vs 확정기간형 16.5% 차이 info
// Q2: 종신연금은 평생 3.3% 저율과세 적용돼요
// Q3: 종신연금은 평생 3.3% 저율과세 적용돼요, 확정기간형은 나이에 따라 5.5%~3.3% 차등 과세돼요, 연금외수령(일시금)은 16.5% 기타소득세가 붙어요
// Q4: GreenBox + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST = [
  "종신연금은 평생 3.3% 저율과세 적용돼요",
  "확정기간형은 나이에 따라 5.5%~3.3% 차등 과세돼요",
  "연금외수령(일시금)은 16.5% 기타소득세가 붙어요"
];

const FAQS = [
  { q: "연금저축 종신연금 세율은 나이가 들어도 그대로인가요?", a: "네, 55세 이후 수령을 시작하면 80세가 되어도 90세가 되어도 평생 3.3%만 과세돼요." },
  { q: "확정기간형 세율 차이는 언제 바뀌나요?", a: "70세 생일, 80세 생일에 세율이 낮아져요. 55~69세는 5.5%, 70~79세는 4.4%, 80세 이상은 3.3%예요." }
];

const REFERENCES = [
  { category: "출처", items: [
      { label: "소득세법", url: "https://www.law.go.kr/법령/소득세법" },
      { label: "국세청", url: "https://www.nts.go.kr" }
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 경제</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        연금저축 종신연금 세율<br />
        3.3% vs 확정기간형 16.5% 차이
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        종신연금 3.3% vs 확정기간형 16.5%, 세율 차이가 5배라는 거 아시나요? 나이와 수령 방식에 따른 세율 비교 알려드려요
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>종신연금은 평생 3.3% 저율과세 적용돼요</H2>
      <p style={body}>종신연금은 평생 3.3% 저율과세 적용돼요</p>
      <GreenBox title="핵심 정리">
        종신연금은 평생 3.3% 저율과세 적용돼요<br />
        확정기간형은 나이에 따라 5.5%~3.3% 차등 과세돼요<br />
        연금외수령(일시금)은 16.5% 기타소득세가 붙어요
      </GreenBox>

      <CategoryButton label="금융 · 경제 정보" count={5} href="/category/금융" />
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
