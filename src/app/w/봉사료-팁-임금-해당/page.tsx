"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 식당·호텔에서 봉사료(팁)를 받는데, 이게 임금인지 아닌지에 따라 퇴직금·세금이 달라지는 게 궁금한 상황이에요.
// Q2. 봉사료가 임금인지 판단하고, 세금 처리 방법을 파악하는 행동.
// Q3. 임금 여부 판단 기준(지급 주체·정기성·취업규칙), 퇴직금·4대보험 영향, 세법상 20% 기준, 종합소득세 신고.
// Q4. GreenBox(핵심) + EligibilityChecker(임금 여부 진단) + BorderBox(세금 기준) + Checklist(확인사항) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const WAGE_CHECK = [
  { id: "employer", label: "봉사료를 사업주(업주)가 직접 지급해요" },
  { id: "regular", label: "매달 정해진 날짜에 정기적으로 받아요" },
  { id: "rules", label: "취업규칙이나 단체협약에 봉사료 지급이 명시돼 있어요" },
  { id: "fixed", label: "금액이 일정하거나 기준이 정해져 있어요" },
];

const TAX_CHECKLIST = [
  "봉사료 지급 주체가 사업주인지 손님인지 확인했나요?",
  "근로계약서에 봉사료 관련 조항이 있는지 확인했나요?",
  "취업규칙에 봉사료 지급 규정이 명시돼 있나요?",
  "봉사료 원천징수 영수증을 받았나요?",
  "5월 종합소득세 신고 시 봉사료 소득을 포함했나요?",
];

const FAQS = [
  { q: "손님이 카드로 팁을 추가해서 결제했는데 이것도 임금인가요?", a: "아니요, 손님이 직접 지급한 봉사료는 임금이 아니에요. 근로자들끼리 자율적으로 나눠 갖는 거예요." },
  { q: "봉사료가 임금이면 퇴직금이 늘어나나요?", a: "네, 평균임금 계산에 포함돼서 퇴직금이 올라가요. 매달 50만원씩 3년 받았다면 퇴직금에 약 50만원이 추가돼요." },
  { q: "봉사료에 세금을 안 떼도 되나요?", a: "음식값 대비 20% 이하면 원천징수 의무가 없어요. 20% 초과분에 대해서만 5% 소득세를 사업주가 원천징수해야 해요." },
  { q: "봉사료를 종합소득세에 신고해야 하나요?", a: "손님에게 직접 받은 봉사료는 사업소득이라 5월에 종합소득세 신고해야 해요. 업주가 임금으로 주는 건 근로소득이라 연말정산에 포함돼요." },
  { q: "봉사료를 안 주겠다고 하면 어떻게 하나요?", a: "취업규칙에 명시돼 있으면 임금 미지급이라 노동청에 진정 가능해요. 명시 안 돼 있으면 법적 청구가 어려워요." },
  { q: "카지노 딜러가 받는 팁은 임금인가요?", a: "대법원 판례에 따르면 손님이 직접 딜러에게 준 팁을 근로자들끼리 나눈 건 임금이 아니에요. 사업주가 관여하지 않았기 때문이에요." },
];

const REFERENCES = [
  {
    category: "법령 및 공식 자료",
    items: [
      { label: "근로기준법 제2조 (임금 정의)", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "찾기쉬운 생활법령정보 — 임금 판단", url: "https://www.easylaw.go.kr" },
      { label: "국세청 홈택스 (종합소득세 신고)", url: "https://www.hometax.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-계산-방법", title: "퇴직금 계산 방법", description: "평균임금 기반 퇴직금 계산법이에요." },
  { slug: "종합소득세-신고-방법", title: "종합소득세 신고 방법", description: "5월 종합소득세 신고 전체 절차예요." },
  { slug: "배달기사-종합소득세-신고-납부", title: "배달기사 종합소득세 신고", description: "3.3% 원천징수 환급 방법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로·노동 · 임금 · 세금</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        봉사료와 팁, 임금에 해당할까?<br />
        판단 기준부터 세금 처리까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        식당에서 손님한테 팁을 받았는데, 이게 월급의 일부인지 별도 수입인지 헷갈리죠?
        누가 주느냐에 따라 퇴직금·4대보험·세금이 완전히 달라져요.
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법</a> 기준으로 정리했어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      {/* ── 섹션 1: 임금 여부 핵심 ── */}
      <H2>누가 주느냐가 핵심이에요</H2>
      <p style={body}>
        손님이 테이블에 현금을 놓고 가거나 카드에 팁을 추가한 건 임금이 아니에요.
        반면 사업주가 매달 25일에 &lsquo;서비스 수당&rsquo;이라는 이름으로 지급하면 임금이에요.
        근로기준법 제2조가 정의하는 임금은 &lsquo;사용자가 근로의 대가로 지급하는 모든 금품&rsquo;이거든요.
      </p>

      <SectionBadge>임금 여부 자가진단</SectionBadge>
      <EligibilityChecker
        items={WAGE_CHECK}
        allMatchText="봉사료가 임금에 해당할 가능성이 높아요. 퇴직금 계산에 포함돼요."
        partialMatchText="일부 요건만 해당돼요. 구체적인 지급 방식에 따라 판단이 달라질 수 있어요."
      />

      <GreenBox title="한눈에 비교">
        <b>손님이 직접 지급</b>: 임금 아님 → 사업소득 → 종합소득세 신고 → 퇴직금 제외<br /><br />
        <b>업주가 정기 지급</b>: 임금 인정 → 근로소득 → 연말정산 포함 → 퇴직금·4대보험 포함
      </GreenBox>

      <RelatedArticles items={RELATED} />
      <Divider />

      {/* ── 섹션 2: 퇴직금·4대보험 영향 ── */}
      <H2>퇴직금과 4대보험은 어떻게 달라지나요?</H2>
      <p style={body}>
        봉사료가 임금으로 인정되면 평균임금에 포함돼요. 퇴직금은 평균임금 기반이니까 금액이 올라가죠.
        매달 봉사료 50만원씩 받고 1년 근무했다면 퇴직금에 약 50만원이 추가돼요.
      </p>
      <p style={body}>
        4대보험 산정 기준에도 포함되니까 국민연금·건강보험료가 조금 올라가지만,
        나중에 연금 수령액이나 실업급여 산정에서는 유리해요.
        반대로 손님이 직접 준 봉사료는 이 모든 계산에서 빠져요.
      </p>

      <BorderBox>
        <b>실제 사례</b>: A씨는 호텔 식당에서 월급 250만원 + 봉사료 50만원을 받았어요.
        퇴직할 때 업주가 &ldquo;봉사료는 손님이 준 거라 퇴직금에 안 들어간다&rdquo;고 했는데,
        취업규칙에 &ldquo;매월 봉사료 지급&rdquo;이 명시돼 있었어요.
        결국 봉사료 포함 평균임금으로 퇴직금을 받았어요.
      </BorderBox>

      <Divider />

      {/* ── 섹션 3: 세금 처리 ── */}
      <H2>봉사료 세금은 어떻게 내나요?</H2>
      <p style={body}>
        세법에서는 봉사료가 음식값(공급가액)의 20%를 넘으면 사업주가 5% 소득세를 원천징수해야 해요.
        20% 이하면 원천징수 의무가 없어요.
      </p>
      <p style={body}>
        손님에게 직접 받은 봉사료는 사업소득이라 다음 해 5월에 종합소득세로 신고해야 해요.
        원천징수 안 된 금액을 신고 안 하면 무신고 가산세가 붙으니 주의하세요.
      </p>

      <SectionBadge>세금 처리 체크리스트</SectionBadge>
      <Checklist items={TAX_CHECKLIST} />

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법·소득세법을 바탕으로 작성됐어요. 구체적인 사안은 노무사나 세무사에게 상담하세요." />
    </ArticleLayout>
  );
}
