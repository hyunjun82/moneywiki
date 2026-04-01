"use client";
import { Divider } from "@/components/article-ui/Divider";

// Q1: 연말정산 정치자금 기부금 info
// Q2: 정치자금 기부금은 10만원까지 거의 전액(100/110) 세액공제돼요.
// Q3: 정치자금 기부금은 10만원까지 거의 전액(100/110) 세액공제돼요., 초과분은 3천만원까지 15%, 3천만원 초과분은 25% 공제돼요., 후원회, 정당 당비, 선거관리위원회 기탁금이 공제 대상이에요.
// Q4: GreenBox + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST = [
  "정치자금 기부금은 10만원까지 거의 전액(100/110) 세액공제돼요.",
  "초과분은 3천만원까지 15%, 3천만원 초과분은 25% 공제돼요.",
  "후원회, 정당 당비, 선거관리위원회 기탁금이 공제 대상이에요."
];

const FAQS = [
  { q: "정치후원금 10만원 내면 얼마나 돌려받나요?", a: "약 9만원(100/110)을 세액공제로 돌려받아요. 실질 부담은 약 1만원이에요." },
  { q: "정당 당비도 기부금 공제가 되나요?", a: "네. 정당에 납부하는 당비도 정치자금 기부금으로 세액공제 대상이에요." },
  { q: "선거 후보자에게 직접 기부해도 공제되나요?", a: "아니요. 반드시 후원회 또는 선거관리위원회를 통해 기부해야 공제돼요." },
  { q: "부부가 각각 기부하면 각각 공제받나요?", a: "네. 부부 각각 10만원씩 기부하면 18만원 환급이 가능해요." },
  { q: "기부금영수증 어떻게 받아요?", a: "대부분 간소화서비스에서 자동 조회돼요. 안 되면 정당이나 후원회에서 직접 발급받으세요." }
];

const REFERENCES = [
  { category: "출처", items: [
      { label: "국세청 연말정산 안내", url: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2304&cntntsId=238938" },
      { label: "정치자금법", url: "https://www.law.go.kr/법령/정치자금법" }
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 연말정산</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        연말정산 정치자금 기부금
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        정치자금 10만원 기부하면 약 9만원 돌려받아요. 실질 부담 1만원으로 정치 참여할 수 있어요
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>정치자금 기부금은 10만원까지 거의 전액(100/110</H2>
      <p style={body}>정치자금 기부금은 10만원까지 거의 전액(100/110) 세액공제돼요.</p>
      <GreenBox title="핵심 정리">
        정치자금 기부금은 10만원까지 거의 전액(100/110) 세액공제돼요.<br />
        초과분은 3천만원까지 15%, 3천만원 초과분은 25% 공제돼요.<br />
        후원회, 정당 당비, 선거관리위원회 기탁금이 공제 대상이에요.
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
