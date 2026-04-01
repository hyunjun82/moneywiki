"use client";
import { Divider } from "@/components/article-ui/Divider";

// Q1: 연말정산 일용직 info
// Q2: 일용직 근로자는 원천징수로 과세가 종결되어 별도 연말정산이 필요 없어요.
// Q3: 일용직 근로자는 원천징수로 과세가 종결되어 별도 연말정산이 필요 없어요., 일당 15만원까지 비과세이고 초과분에 대해 2.7% 세율이 적용돼요., 같은 고용주에게 3개월 이상 근무하면 일반 근로소득으로 분류되어 연말정산 대상이에요.
// Q4: GreenBox + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST = [
  "일용직 근로자는 원천징수로 과세가 종결되어 별도 연말정산이 필요 없어요.",
  "일당 15만원까지 비과세이고 초과분에 대해 2.7% 세율이 적용돼요.",
  "같은 고용주에게 3개월 이상 근무하면 일반 근로소득으로 분류되어 연말정산 대상이에요."
];

const FAQS = [
  { q: "일용직도 연말정산 하나요?", a: "아니요, 일용직은 원천징수로 과세가 종결돼요. 별도 연말정산이 없어요." },
  { q: "일용직 소득세율은 얼마인가요?", a: "일당 15만원 초과분의 2.7%예요. 15만원까지는 비과세예요." },
  { q: "3개월 이상 일하면 어떻게 돼요?", a: "같은 고용주에게 3개월 이상 근무하면 상용직으로 분류돼서 연말정산 대상이 돼요." },
  { q: "일용직도 신용카드 공제 받을 수 있나요?", a: "아니요, 일용직은 연말정산이 없어서 각종 공제를 받을 수 없어요." },
  { q: "일용직 세금 환급받을 수 있나요?", a: "아니요, 일용직은 원천징수로 종결돼서 과납해도 환급받을 수 없어요." }
];

const REFERENCES = [
  { category: "출처", items: [
      { label: "국세청 연말정산 안내", url: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2304&cntntsId=238938" },
      { label: "소득세법 제14조", url: "https://www.law.go.kr/법령/소득세법" }
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 연말정산</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        연말정산 일용직
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        일용직은 연말정산 안 해요. 일당 15만원까지 비과세이고, 초과분만 2.7% 세금 떼면 끝이에요
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>일용직 근로자는 원천징수로 과세가 종결되어 별도 연말정</H2>
      <p style={body}>일용직 근로자는 원천징수로 과세가 종결되어 별도 연말정산이 필요 없어요.</p>
      <GreenBox title="핵심 정리">
        일용직 근로자는 원천징수로 과세가 종결되어 별도 연말정산이 필요 없어요.<br />
        일당 15만원까지 비과세이고 초과분에 대해 2.7% 세율이 적용돼요.<br />
        같은 고용주에게 3개월 이상 근무하면 일반 근로소득으로 분류되어 연말정산 대상이에요.
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
