"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "임금과 퇴직금을 모두 못 받았어요" },
  { id: "c2", label: "퇴직 후 14일 이상 지났어요" },
  { id: "c3", label: "소멸시효 3년이 남아 있어요" },
  { id: "c4", label: "이자까지 청구하고 싶어요" },
];

const CALC_SLIDERS = [
  { id: "amount", label: "미지급 임금+퇴직금 합계", min: 100, max: 5000, step: 100, defaultValue: 700, format: (v: number) => `${v}만원` },
  { id: "days", label: "지연 일수", min: 15, max: 730, step: 5, defaultValue: 60, format: (v: number) => `${v}일` },
];

const CALC_RESULTS = [
  {
    label: "지연이자 합계",
    getValue: (v: Record<string, number>) => Math.round(v.amount * 10000 * 0.2 * v.days / 365),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "총 청구금액",
    getValue: (v: Record<string, number>) => {
      const interest = Math.round(v.amount * 10000 * 0.2 * v.days / 365);
      return v.amount * 10000 + interest;
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "근로계약서", required: true, where: "입사 시 수령 · 인사팀 재발급" },
  { name: "급여명세서", required: true, where: "회사 인사팀 요청" },
  { name: "퇴직일 증빙 (사직서·해고통지서)", required: true, where: "직접 보관 또는 인사팀" },
  { name: "미지급 내역 정리 (임금+퇴직금 구분)", required: false, where: "직접 작성" },
];

const STEPS = [
  {
    title: "미지급 금액 정리",
    desc: "미지급 임금과 퇴직금을 항목별로 분리해 정리하세요. 임금은 지급일 기준, 퇴직금은 퇴직 후 14일 기준으로 이자 기산점이 다르기 때문에 따로 계산해야 해요. 금액과 지연 일수를 정확히 파악하는 것부터 시작이에요.",
    tip: "임금 미지급 기산점: 원래 지급일 다음 날 / 퇴직금 기산점: 퇴직 후 15일째",
  },
  {
    title: "이자 계산",
    desc: "임금과 퇴직금 각각에 대해 연 20% 이율로 지연이자를 계산해요. 공식은 미지급금액 × 20% × (지연일수 / 365)예요. 두 이자를 합산해서 '총 청구 이자'를 산출하면 되죠. 정확한 계산이 어려우면 대략적인 금액만 적어도 근로감독관이 재산정해줘요.",
    tip: "고용노동부(1350)에서 전화 상담으로 이자 계산 도움을 받을 수 있어요",
  },
  {
    title: "내용증명 발송",
    desc: "임금과 퇴직금 원금, 각각의 지연이자를 명시한 내용증명을 발송해요. '근로기준법 제37조에 따른 연 20% 지연이자를 함께 청구한다'는 문구를 꼭 넣으세요. 이 단계에서 해결되는 경우가 많아요.",
    tip: "우체국 또는 카카오 전자내용증명으로 발송 가능. 발송 영수증을 보관하세요",
  },
  {
    title: "고용노동부 진정 (임금+퇴직금 모두)",
    desc: "내용증명 후에도 무응답이면 관할 지방고용노동청에 진정서를 접수해요. 임금 미지급과 퇴직금 미지급을 하나의 진정서에 함께 청구할 수 있어요. 온라인(고용노동부 민원마당)이나 방문 모두 무료예요.",
    tip: "minwon.moel.go.kr → 민원신청 → 임금체불 진정. 두 항목을 한 번에 접수하세요",
  },
];

const CHECKLIST = [
  "임금·퇴직금 미지급 금액 항목별로 정리",
  "지연이자 기산점 확인 — 임금(지급일 다음 날) vs 퇴직금(퇴직 후 15일째)",
  "소멸시효 3년 확인 — 퇴직일로부터 3년 내",
  "내용증명에 이자 청구 명시 — '연 20% 지연이자 포함'",
  "진정서에 임금+퇴직금 모두 기재 — 한 번에 청구",
];

const FAQS = [
  {
    q: "임금 지연이자와 퇴직금 지연이자가 다른가요?",
    a: "이자율은 둘 다 연 20%로 같아요. 다만 기산점이 달라요. 임금은 약정 지급일 다음 날부터, 퇴직금은 퇴직 후 15일째부터 이자가 시작되죠.",
  },
  {
    q: "지연이자에 세금이 붙나요?",
    a: "지연이자는 이자소득이 아니라 손해배상 성격이에요. 소득세가 부과되지 않죠.",
  },
  {
    q: "회사가 일부만 줬을 때 이자는 어떻게 계산하나요?",
    a: "미지급 잔액에 대해서만 이자가 붙어요. 1,000만원 중 600만원을 받았다면 나머지 400만원에 대해 연 20%를 적용하죠.",
  },
  {
    q: "5인 미만 사업장도 지연이자가 적용되나요?",
    a: "적용돼요. 근로기준법 시행령 제17조는 사업장 규모에 관계없이 적용되죠.",
  },
  {
    q: "회사가 이자만 빼고 원금만 주겠다고 하면?",
    a: "지연이자는 법에 명시된 권리이기 때문에 거부할 수 없어요. 급하게 합의하기보다 원금과 이자를 합산한 금액을 기준으로 판단하세요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제36조 — 금품 청산 (14일 이내 지급 의무)", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로기준법 시행령 제17조 — 미지급 임금에 대한 지연이자 (연 20%)", url: "https://www.law.go.kr/법령/근로기준법시행령" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 — 임금체불 신고 안내", url: "https://www.moel.go.kr" },
      { label: "고용노동부 민원마당 — 온라인 진정 접수", url: "https://minwon.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-지연이자",
    title: "퇴직금 지연이자 연 20% 계산법",
    description: "14일이 지나도 퇴직금을 안 주면 연 20% 지연이자가 붙어요.",
  },
  {
    slug: "퇴직금-미지급-신고",
    title: "퇴직금 미지급 신고, 어디에 어떻게 하나요?",
    description: "노동청 신고 장소, 준비 서류, 진행 절차를 한눈에 정리했어요.",
  },
  {
    slug: "퇴직금-소멸시효",
    title: "퇴직금 소멸시효 3년, 지나면 정말 못 받나요?",
    description: "소멸시효 계산 기준과 중단 방법을 정리했어요.",
  },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="임금-퇴직금-미지급-이자" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>임금·퇴직금 · 미지급이자 · 청구</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        임금과 퇴직금 미지급, 이자를 함께 청구할 수 있나요?<br />
        미지급 이자율 연 20%와 청구 방법 완전 정리
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        임금과 퇴직금을 모두 못 받았을 때 이자까지 함께 청구할 수 있어요.{" "}
        <a href="https://www.law.go.kr/법령/근로기준법시행령" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 시행령 제17조</a>가
        두 경우 모두 연 20% 지연이자를 적용해요. 단, 기산점(이자 시작일)이 달라요.
        임금은 약정 지급일 다음 날, 퇴직금은{" "}
        <a href="/w/퇴직금-지연이자" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직 후 15일째</a>부터죠.
        두 항목을 한 번에 청구하는 방법을 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>지금 이자까지 청구할 수 있는 상황인가요?</H2>
      <p style={body}>
        임금과 퇴직금 미지급 이자는 별도로 계산하지만, 노동청 진정 한 번에 모두 청구할 수 있어요.
        소멸시효 3년 안에만 있다면 지금이라도 청구가 가능해요.
      </p>
      <p style={body}>
        두 항목의 이자 기산점이 다르기 때문에 금액 정리를 먼저 해야 해요.
        아래 체크리스트로 청구 가능 여부를 먼저 살펴보세요.
      </p>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="임금과 퇴직금 이자를 함께 청구할 수 있어요. 아래 절차대로 진행하세요."
        partialMatchText="상황에 따라 다를 수 있어요. 고용노동부(1350)에 먼저 상담하세요."
      />

      <Divider />

      <H2>이자가 얼마나 붙을까요?</H2>
      <p style={body}>
        임금과 퇴직금 합계에 연 20%를 적용해서 계산해요.
        700만원을 60일 동안 못 받았다면 이자만 약 23만원이에요.
        기간이 길수록 이자도 커지기 때문에 빠른 청구가 중요하죠.
      </p>

      <SectionBadge>지연이자 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 근로기준법 시행령 제17조 기준 연 20% 이율 적용. 임금은 지급일 다음 날, 퇴직금은 퇴직 후 15일째부터 계산."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>청구에 필요한 서류 목록</H2>
      <p style={body}>
        임금과 퇴직금을 한 번에 청구할 때 서류 목록이에요.
        없는 서류가 있어도 통장 내역이나 문자 기록만으로 진정 접수가 가능해요.
      </p>

      <SectionBadge>제출 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <BorderBox title="미지급 내역 정리 방법">
        임금 미지급: 몇 월 급여 / 금액 / 지급 예정일 / 실제 미지급일<br />
        퇴직금 미지급: 퇴직일 / 예상 퇴직금 / 14일 기한 초과 날짜<br />
        이렇게 정리해서 진정서에 첨부하면 처리가 빨라져요.
      </BorderBox>

      <Divider />

      <H2>임금과 퇴직금 이자 청구 절차 4단계</H2>
      <p style={body}>
        두 항목을 따로 청구할 필요 없어요. 한 번의 진정서에 모두 기재하면 되죠.
        단계를 순서대로 따라가면 대부분 해결돼요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>청구 전 준비 체크리스트</H2>
      <p style={body}>
        항목별로 미지급 금액을 정리해두면 진정 처리 속도가 빨라져요.
        이자 기산점이 다르기 때문에 임금과 퇴직금을 분리해서 계산하는 게 중요해요.
      </p>

      <SectionBadge>청구 전 준비 목록</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="임금과 퇴직금, 한 번에 청구하세요">
        노동청 진정서에 임금 미지급과 퇴직금 미지급을 모두 기재할 수 있어요.
        별도로 두 번 신청할 필요가 없죠. 지연이자도 각각 명시해서 청구하면
        근로감독관이 두 항목을 함께 검토해 시정 지시를 내려요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        임금과 퇴직금 미지급 이자에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
