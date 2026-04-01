"use client";
import { Divider } from "@/components/article-ui/Divider";

// Q1: 소득세 중간예납 분납 1000만원 초과 2월 2일까지 분할 납부 info
// Q2: 중간예납 세액 1,000만원 초과 시 분납 가능
// Q3: 중간예납 세액 1,000만원 초과 시 분납 가능, 1차 11월 30일, 2차 2월 2일까지 절반씩 납부, 분납 신청은 중간예납 신고 시 홈택스에서 선택
// Q4: GreenBox + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST = [
  "중간예납 세액 1,000만원 초과 시 분납 가능",
  "1차 11월 30일, 2차 2월 2일까지 절반씩 납부",
  "분납 신청은 중간예납 신고 시 홈택스에서 선택"
];

const FAQS = [
  { q: "소득세 중간예납이 뭔가요?", a: "전년도 소득세의 절반을 11월에 미리 내는 거예요. 5월 종합소득세 신고 전에 세금을 나눠서 내는 제도예요." },
  { q: "분납 신청은 어떻게 하나요?", a: "중간예납 신고할 때 홈택스에서 분납 신청을 체크하면 돼요. 신고 시 자동으로 선택할 수 있어요." },
  { q: "분납 안 하고 한꺼번에 내도 되나요?", a: "네, 가능해요. 11월에 전액 납부해도 되고, 분납을 신청해서 나눠 내도 돼요. 선택이에요." }
];

const REFERENCES = [
  { category: "출처", items: [
      { label: "국세청 소득세 중간예납", url: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2229&cntntsId=7667" },
      { label: "홈택스", url: "https://www.hometax.go.kr" }
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 절세</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        소득세 중간예납 분납 1000만원 초과 2월 2일까지 분할 납부
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        소득세 중간예납이 1,000만원을 넘으면 분납할 수 있어요. 1차는 11월, 2차는 2월 2일까지 내면 돼요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>중간예납 세액 1,000만원 초과 시 분납 가능</H2>
      <p style={body}>중간예납 세액 1,000만원 초과 시 분납 가능</p>
      <GreenBox title="핵심 정리">
        중간예납 세액 1,000만원 초과 시 분납 가능<br />
        1차 11월 30일, 2차 2월 2일까지 절반씩 납부<br />
        분납 신청은 중간예납 신고 시 홈택스에서 선택
      </GreenBox>

      <CategoryButton label="세금 · 절세 정보" count={5} href="/category/세금" />
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
