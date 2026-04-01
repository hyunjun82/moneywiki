"use client";
import { Divider } from "@/components/article-ui/Divider";

// Q1: 내항화물운송 유류세 보조금 제출 서류 info
// Q2: 내항화물운송사업자는 유류세 보조금 신청 시 운항일지, 유류 구매 영수증, 사업자등록증 등을 제출해야 해요
// Q3: 내항화물운송사업자는 유류세 보조금 신청 시 운항일지, 유류 구매 영수증, 사업자등록증 등을 제출해야 해요, 해양수산부 고시에 따라 분기별로 신청하며, 실제 운항 실적을 증명하는 서류가 핵심이에요, 유류세 보조금은 연안 화물선 운영비 부담을 줄이기 위한 정부 지원 제도예요
// Q4: GreenBox + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST = [
  "내항화물운송사업자는 유류세 보조금 신청 시 운항일지, 유류 구매 영수증, 사업자등록증 등을 제출해야 해요",
  "해양수산부 고시에 따라 분기별로 신청하며, 실제 운항 실적을 증명하는 서류가 핵심이에요",
  "유류세 보조금은 연안 화물선 운영비 부담을 줄이기 위한 정부 지원 제도예요"
];

const FAQS = [
  { q: "유류세 보조금은 언제 신청하나요?", a: "분기별로 신청해요. 보통 분기가 끝나고 다음 달 말일까지 신청해야 해요. 늦으면 그 분기 보조금은 못 받아요." },
  { q: "유류세 보조금은 얼마나 받을 수 있나요?", a: "실제 사용한 유류량과 정부 고시 단가를 기준으로 계산돼요. 선박 톤수와 운항 실적에 따라 달라지지만, 리터당 일정 금액을 지원받아요." },
  { q: "유류세 보조금 신청은 어디서 하나요?", a: "한국해운조합을 통해 신청해요. 온라인 시스템이나 방문 접수 모두 가능하고, 관할 지역 지부에 문의하면 자세히 안내받을 수 있어요." }
];

const REFERENCES = [
  { category: "출처", items: [
      { label: "해운법", url: "https://www.law.go.kr/법령/해운법" },
      { label: "찾기쉬운 생활법령정보", url: "https://www.easylaw.go.kr" }
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 경제</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        내항화물운송 유류세 보조금 제출 서류
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        내항화물운송사업자가 유류세 보조금 받으려면 어떤 서류를 내야 하는지 궁금하시죠? 신청 절차와 필요 서류를 쉽게 알려드려요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>내항화물운송사업자는 유류세 보조금 신청 시 운항일지, </H2>
      <p style={body}>내항화물운송사업자는 유류세 보조금 신청 시 운항일지, 유류 구매 영수증, 사업자등록증 등을 제출해야 해요</p>
      <GreenBox title="핵심 정리">
        내항화물운송사업자는 유류세 보조금 신청 시 운항일지, 유류 구매 영수증, 사업자등록증 등을 제출해야 해요<br />
        해양수산부 고시에 따라 분기별로 신청하며, 실제 운항 실적을 증명하는 서류가 핵심이에요<br />
        유류세 보조금은 연안 화물선 운영비 부담을 줄이기 위한 정부 지원 제도예요
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
      <Disclaimer text="이 글은 2026년 1월 기준 정보를 바탕으로 작성됐어요. 최신 정보는 관련 기관에서 직접 확인해보세요." />
    </ArticleLayout>
  );
}
