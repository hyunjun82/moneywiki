"use client";

// Q1. 산재로 일 못하는데 급여를 못 받아서 생활이 걱정인 근로자예요.
// Q2. 휴업급여를 신청해서 평균임금의 70%를 지급받는 행동.
// Q3. 휴업급여 지급 조건(4일 이상 휴업), 금액(평균임금 70%), 신청 절차, 필요 서류, 지급 기한(14일).
// Q4. GreenBox(핵심 요약) + Steps(신청 절차) + DocTable(서류) + Calculator 없이 BorderBox + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";
import { DocTable } from "@/components/article-ui/DocTable";

const STEPS_DATA = [
  {
    title: "산재 승인 먼저 받기",
    desc: "산재 승인 없이는 휴업급여를 못 받아요. 요양급여 신청서를 먼저 근로복지공단에 제출해서 산재 승인을 받으세요.",
  },
  {
    title: "휴업급여청구서 작성",
    desc: "근로복지공단 홈페이지(comwel.or.kr) 또는 고용·산재보험 토탈서비스(ei.go.kr)에서 양식을 받아 작성해요. 오프라인이면 근로복지공단 지사 방문해도 돼요.",
  },
  {
    title: "서류 첨부해서 제출",
    desc: "청구서에 진단서, 휴업확인서 등을 첨부해서 온라인 또는 방문 제출해요. 회사에서 발급하는 휴업확인서가 필요하니까 미리 요청하세요.",
    tip: "온라인 제출이 가장 빨라요",
  },
  {
    title: "지급 결정 및 입금",
    desc: "근로복지공단이 심사 후 지급 결정해요. 결정일로부터 14일 이내에 본인 계좌로 입금돼요. 보통 신청 후 2~3주 정도 걸려요.",
  },
];

const DOCS = [
  { name: "휴업급여청구서", required: true, where: "근로복지공단 홈페이지 양식" },
  { name: "진단서 또는 소견서", required: true, where: "치료 병원 발급" },
  { name: "휴업확인서", required: true, where: "회사(사업주) 발급" },
  { name: "통장 사본", required: true, where: "본인 계좌" },
  { name: "재해경위서", required: false, where: "최초 산재 신청 시 작성" },
];

const FAQS = [
  {
    q: "휴업급여는 얼마 받나요?",
    a: "1일당 평균임금의 70%예요. 평균임금은 사고 전 3개월간 임금 총액을 총일수로 나눈 금액이에요. 예를 들어 평균임금이 10만원이면 하루 7만원을 받아요.",
  },
  {
    q: "3일만 쉬면 휴업급여 못 받나요?",
    a: "맞아요. 4일 이상 쉬어야 지급 대상이에요. 3일 이내 휴업분은 사업주가 보상해야 하는 부분이에요.",
  },
  {
    q: "언제까지 받을 수 있나요?",
    a: "요양(치료)으로 일하지 못하는 기간 동안 계속 받아요. 완치되거나 직장에 복귀하면 중단돼요. 2년 이상 장기 요양이면 상병보상연금으로 전환될 수 있어요.",
  },
  {
    q: "저소득 근로자는 더 받나요?",
    a: "네. 휴업급여 일액이 최저 보상기준 금액의 80%보다 적으면, 평균임금의 90%를 지급해요. 저소득 근로자 보호 규정이에요.",
  },
  {
    q: "휴업급여 청구 시효가 있나요?",
    a: "휴업한 날의 다음 날부터 3년이에요. 3년이 지나면 청구권이 소멸하니까 빨리 신청하세요.",
  },
  {
    q: "회사가 휴업확인서를 안 줘요. 어떡하나요?",
    a: "근로복지공단에 사정을 설명하면 공단이 직접 회사에 확인해줘요. 회사 비협조가 이유로 휴업급여를 못 받는 건 아니에요.",
  },
];

const REFERENCES = [
  {
    category: "법령 및 공식 자료",
    items: [
      { label: "산업재해보상보험법 제52조 — 휴업급여", url: "https://www.law.go.kr/법령/산업재해보상보험법" },
      { label: "근로복지공단 — 휴업급여 안내", url: "https://www.comwel.or.kr/comwel/comp/rewd/unjo02.jsp" },
      { label: "고용·산재보험 토탈서비스", url: "https://www.ei.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "산재-요양급여", title: "산재 요양급여 신청", description: "산재 치료비 전액 지원받는 방법이에요." },
  { slug: "산재-보험급여", title: "산재 보험급여 종류", description: "산재 시 받을 수 있는 급여 전체를 정리했어요." },
  { slug: "임금체불-신고", title: "임금체불 신고", description: "회사가 급여를 안 줄 때 대응 방법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로·노동 · 산재 · 휴업급여</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        산재로 쉬는 동안 임금은 어떻게 되나?<br />
        휴업급여 신청 방법과 지급액
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        일하다 다쳐서 병원에 다니고 있는데, 월급은 안 나오고 생활비는 걱정되죠.{" "}
        <a href="https://www.law.go.kr/법령/산업재해보상보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>산업재해보상보험법</a>에
        따라 4일 이상 쉬면 평균임금의 70%를 휴업급여로 받을 수 있어요. 신청만 하면 돼요.
      </p>

      <Divider />

      <H2>휴업급여, 얼마나 받을 수 있나요?</H2>
      <p style={body}>
        핵심은 '평균임금의 70%'예요. 평균임금이란 사고 전 3개월 동안 받은 임금 총액을 그 기간의 총일수로 나눈 금액이에요.
      </p>

      <GreenBox title="휴업급여 핵심 정리">
        <strong>지급액</strong>: 1일당 평균임금 × 70%<br />
        <strong>지급 조건</strong>: 4일 이상 휴업 (3일 이하는 사업주 부담)<br />
        <strong>지급 기간</strong>: 요양으로 일 못하는 기간 전체<br />
        <strong>지급 시기</strong>: 결정일로부터 14일 이내 입금
      </GreenBox>

      <BorderBox>
        <strong>계산 예시</strong><br /><br />
        사고 전 3개월 임금: 900만원 / 총일수 91일 = 평균임금 약 9.9만원<br />
        휴업급여: 9.9만원 × 70% = <strong>하루 약 6.9만원</strong><br />
        30일 기준 월 약 <strong>207만원</strong>을 받아요
      </BorderBox>

      <Divider />

      <H2>신청은 이렇게 해요</H2>
      <p style={body}>
        산재 승인이 먼저예요. 승인 없이 휴업급여만 따로 받을 수는 없어요.{" "}
        <a href="/w/산재-요양급여" style={{ color: "#1D9E75", textDecoration: "underline" }}>산재 요양급여 신청</a>과 함께 진행하세요.
      </p>

      <Steps steps={STEPS_DATA} />

      <SectionBadge>필요 서류</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <RelatedArticles items={RELATED} />
      <Disclaimer text="이 글은 2026년 3월 기준 산업재해보상보험법을 기반으로 작성됐어요. 구체적인 지급액은 근로복지공단(1588-0075)에 문의하세요." />
    </ArticleLayout>
  );
}
