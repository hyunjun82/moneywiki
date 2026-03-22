"use client";

// Q1: 연말정산 기납부세액 info
// Q2: 기납부세액은 1년간 매달 급여에서 떼간 소득세 합계예요.
// Q3: 기납부세액은 1년간 매달 급여에서 떼간 소득세 합계예요., 기납부세액 - 결정세액 = 환급금이에요. 양수면 돌려받아요., 원천징수 비율을 120%로 높이면 연말 환급금이 커져요.
// Q4: GreenBox + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST = [
  "기납부세액은 1년간 매달 급여에서 떼간 소득세 합계예요.",
  "기납부세액 - 결정세액 = 환급금이에요. 양수면 돌려받아요.",
  "원천징수 비율을 120%로 높이면 연말 환급금이 커져요."
];

const FAQS = [
  { q: "기납부세액 어디서 확인해요?", a: "매달 급여명세서의 소득세 항목을 합산하거나 원천징수영수증에서 확인할 수 있어요." },
  { q: "원천징수 비율 선택은 어떻게 해요?", a: "회사에 요청하면 80%, 100%, 120% 중에서 선택할 수 있어요." },
  { q: "120% 선택하면 뭐가 좋아요?", a: "매달 월급은 줄지만 연말에 환급금이 커져요. 목돈으로 받고 싶은 분에게 좋아요." },
  { q: "80% 선택하면요?", a: "매달 월급은 늘지만 연말에 추가 납부할 수 있어요. 공제 항목 많은 분에게 맞아요." },
  { q: "중도입사자는 어떻게 돼요?", a: "입사 후부터 원천징수한 금액만 기납부세액이에요. 전 직장 세금은 별도 합산해요." }
];

const REFERENCES = [
  { category: "출처", items: [
      { label: "국세청 연말정산 안내", url: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2304&cntntsId=238938" },
      { label: "소득세법 제137조", url: "https://www.law.go.kr/법령/소득세법" }
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 연말정산</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        연말정산 기납부세액
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        기납부세액은 매달 월급에서 떼간 세금 합계예요. 이게 결정세액보다 많으면 차액을 환급받아요
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>기납부세액은 1년간 매달 급여에서 떼간 소득세 합계예요</H2>
      <p style={body}>기납부세액은 1년간 매달 급여에서 떼간 소득세 합계예요.</p>
      <GreenBox title="핵심 정리">
        기납부세액은 1년간 매달 급여에서 떼간 소득세 합계예요.<br />
        기납부세액 - 결정세액 = 환급금이에요. 양수면 돌려받아요.<br />
        원천징수 비율을 120%로 높이면 연말 환급금이 커져요.
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
