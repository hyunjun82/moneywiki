"use client";
import { Divider } from "@/components/article-ui/Divider";

// Q1: 대지급금 금액 계산 방법 | 연차 상여금 통상임금 포함 여부 info
// Q2: 대지급금에는 기본급뿐 아니라 연차수당, 상여금도 포함될 수 있어요.
// Q3: 대지급금에는 기본급뿐 아니라 연차수당, 상여금도 포함될 수 있어요., 통상임금 해당 여부에 따라 포함이 결정돼요. 고정성·일률성·정기성이 기준이에요., 체불 확인서에 기재된 금액 기준으로 지급되므로 진정 접수 시 항목을 꼼꼼히 적어야 해요.
// Q4: GreenBox + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST = [
  "대지급금에는 기본급뿐 아니라 연차수당, 상여금도 포함될 수 있어요.",
  "통상임금 해당 여부에 따라 포함이 결정돼요. 고정성·일률성·정기성이 기준이에요.",
  "체불 확인서에 기재된 금액 기준으로 지급되므로 진정 접수 시 항목을 꼼꼼히 적어야 해요."
];

const FAQS = [
  { q: "대지급금 금액 계산 시 퇴직금 산정 기준은 무엇인가요?", a: "퇴직금은 퇴직 전 3개월 평균임금을 기준으로 계산해요. 평균임금에는 기본급, 통상적으로 지급된 상여금, 연차수당 등이 포함돼요. 임금 항목이 누락되지 않도록 체불 진정 시 전체 임금 명세를 제출하는 게 중요해요." },
  { q: "대지급금 계산 연차수당이 소멸됐으면 포함이 안 되나요?", a: "연차수당 청구권이 소멸(3년 소멸시효)하지 않았다면 포함 가능해요. 퇴직 시점을 기준으로 미사용 연차에 대한 수당이 체불됐다면 대지급금 신청 항목에 포함시킬 수 있어요." }
];

const REFERENCES = [
  { category: "출처", items: [
      { label: "임금채권보장법 - 대지급금 대상 임금", url: "https://www.law.go.kr/법령/임금채권보장법" },
      { label: "고용노동부 - 통상임금 판단 기준", url: "https://www.moel.go.kr" }
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        대지급금 금액 계산 방법 | 연차 상여금 통상임금 포함 여부
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        대지급금 신청 시 연차수당이나 상여금도 포함되는지 궁금하신가요? 통상임금 포함 여부와 항목별 계산 방법을 알려드려요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>대지급금에는 기본급뿐 아니라 연차수당, 상여금도 포함될</H2>
      <p style={body}>대지급금에는 기본급뿐 아니라 연차수당, 상여금도 포함될 수 있어요.</p>
      <GreenBox title="핵심 정리">
        대지급금에는 기본급뿐 아니라 연차수당, 상여금도 포함될 수 있어요.<br />
        통상임금 해당 여부에 따라 포함이 결정돼요. 고정성·일률성·정기성이 기준이에요.<br />
        체불 확인서에 기재된 금액 기준으로 지급되므로 진정 접수 시 항목을 꼼꼼히 적어야 해요.
      </GreenBox>

      <CategoryButton label="실업급여 정보" count={5} href="/category/실업급여" />
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
