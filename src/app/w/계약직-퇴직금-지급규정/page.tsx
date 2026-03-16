"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "계약직(기간제) 근로자로 근무했어요" },
  { id: "c2", label: "계약 기간이 1년 이상이에요" },
  { id: "c3", label: "1년 미만이지만 주 15시간 이상 계속 근무했어요" },
  { id: "c4", label: "계약 만료 후 퇴직금을 받지 못했어요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "월 평균임금", min: 200, max: 600, step: 10, defaultValue: 260, format: (v: number) => `${v}만원` },
  { id: "months", label: "계약 기간 (개월)", min: 3, max: 48, step: 1, defaultValue: 24, format: (v: number) => `${v}개월` },
];

const CALC_RESULTS = [
  {
    label: "계약직 퇴직금 예상액",
    getValue: (v: Record<string, number>) => Math.round(v.salary * 10000 * v.months / 12),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "300만원 초과 여부 (IRP 필요 기준)",
    getValue: (v: Record<string, number>) => v.salary * 10000 * v.months / 12,
    format: (v: number) => v > 3000000 ? "IRP 수령 필수 (300만원 초과)" : "일반 계좌 수령 가능",
  },
];

const DOCS = [
  { name: "근로계약서 (계약 기간 명시)", required: true, where: "회사 인사팀 또는 입사 시 수령본" },
  { name: "급여명세서 (최근 3개월)", required: true, where: "회사 인사팀 요청" },
  { name: "계약 만료 확인서 또는 고용보험 상실 확인서", required: false, where: "인사팀 또는 4대사회보험포털" },
  { name: "IRP 계좌번호 (300만원 초과 시)", required: false, where: "증권사·은행 앱 개설 후 확인" },
];

const STEPS = [
  {
    title: "퇴직금 지급 요건 확인",
    desc: "계약직도 근속 1년 이상이면 퇴직금이 발생해요. 1년 미만이라도 주 15시간 이상 계속 근무했다면 일할 계산으로 받을 수 있어요. 계약 만료도 퇴직 사유라서 퇴직금 지급 의무가 생겨요.",
    tip: "계약 연장을 반복한 경우 전체 근속 기간 합산이에요",
  },
  {
    title: "퇴직금 계산",
    desc: "퇴직 전 3개월 평균임금 × 근속연수로 계산해요. 계약 만료 전 3개월 급여를 기준으로 평균임금을 산정해요. 계약이 여러 번 갱신됐다면 최초 입사일부터 최종 퇴직일까지 전체 기간을 합산해요.",
    tip: "계약 중간에 공백 기간이 있으면 합산에서 제외될 수 있어요",
  },
  {
    title: "퇴직금 청구",
    desc: "계약 만료일로부터 14일 이내에 퇴직금을 받아야 해요. 300만원 초과 시 IRP로만 수령 가능해요. 인사팀에 IRP 계좌번호를 미리 알려주면 이체가 빠르게 처리돼요.",
    tip: "계약 만료 전에 IRP를 미리 개설해두세요",
  },
  {
    title: "미지급 시 신고",
    desc: "14일이 지나도 받지 못하면 고용노동부(1350) 또는 사업장 관할 지방노동청에 진정을 내세요. 지연이자(연 20%)도 함께 청구할 수 있어요. 소멸시효는 퇴직일로부터 3년이에요.",
    tip: "온라인 신고: 고용노동부 민원마당(minwon.moel.go.kr)",
  },
];

const CHECKLIST = [
  "근속 1년 이상 — 계약직도 퇴직금 지급 의무",
  "1년 미만이라도 주 15시간 이상이면 일할 계산 지급",
  "계약 갱신 반복 시 전체 기간 합산",
  "300만원 초과 시 IRP 계좌로만 수령",
  "소멸시효 3년 — 계약 만료일로부터 3년 내 청구",
];

const FAQS = [
  {
    q: "계약 기간이 11개월인데 퇴직금을 받을 수 있나요?",
    a: "주 15시간 이상 계속 근무했다면 받을 수 있어요. 1년 미만이면 근속 기간을 일할 계산한 금액을 받아요. 예: 11개월 근무라면 1년 만근 금액의 11/12 수준이에요.",
  },
  {
    q: "계약이 3번 갱신됐는데 퇴직금은 전체 기간을 기준으로 하나요?",
    a: "맞아요. 동일 사업장에서 계속 근무했다면 최초 입사일부터 최종 퇴직일까지 합산해요. 계약 갱신 사이에 공백 기간이 없어야 해요.",
  },
  {
    q: "계약직에게 퇴직금을 안 줘도 된다는 말을 들었는데요?",
    a: "틀린 말이에요. 계약직·정규직 구분 없이 근로자퇴직급여보장법이 적용돼요. 1년 이상 근속하거나 1년 미만이라도 주 15시간 이상이면 지급 의무가 있어요.",
  },
  {
    q: "계약 만료 후 회사가 퇴직금 없다고 하면?",
    a: "고용노동부(1350)에 신고하면 돼요. 계약서에 '퇴직금 없음'이라고 적혀 있어도 법정 퇴직금 지급 의무는 계약서보다 우선해요.",
  },
  {
    q: "계약직도 IRP로 받아야 하나요?",
    a: "퇴직금 300만원 초과 시 IRP로만 받아야 해요. 계약직·정규직 관계없이 동일 기준이에요(2022년 4월 의무화).",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 제4조 — 퇴직금 지급 요건", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "기간제 및 단시간근로자 보호 등에 관한 법률", url: "https://www.law.go.kr/법령/기간제및단시간근로자보호등에관한법률" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 — 계약직 퇴직금 지급 기준", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "계약직-퇴직금", title: "계약직 퇴직금 받는 방법", description: "계약 만료 시 퇴직금 수령 절차를 안내해요." },
  { slug: "퇴직금-1년미만", title: "1년 미만 퇴직금 계산", description: "일할 계산 방법을 설명해요." },
  { slug: "퇴직금-미지급-신고", title: "퇴직금 미지급 신고 방법", description: "노동청 진정 절차를 단계별로 안내해요." },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="계약직-퇴직금-지급규정" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 계약직 · 지급규정</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        계약직도 퇴직금을 받을 수 있나요?<br />
        지급 조건과 계약 갱신 시 합산 기준 정리
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        계약직(기간제) 근로자도 <a href="/w/퇴직금-조건" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 지급 조건</a>을 충족하면 당연히 받을 수 있어요.
        근속 1년 이상이면 전액, 1년 미만이라도 주 15시간 이상이면 일할 계산으로 지급해요.
        계약이 여러 번 갱신됐다면 전체 근속 기간을 합산해요.
        "계약직은 퇴직금 없다"는 말은 틀렸어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>계약직 퇴직금, 어떤 조건에서 받나요?</H2>
      <p style={body}>
        근로자퇴직급여보장법은 정규직·계약직을 구분하지 않아요. 근속 1년 이상 + 주 15시간 이상이면 계약직도 동일하게 적용돼요.
        계약 만료로 인한 퇴직도 퇴직금 지급 사유예요.
        계약서에 "퇴직금 없음"이라고 적혀 있어도 법정 의무보다 아래로는 내려갈 수 없어요.
      </p>
      <p style={body}>
        계약 갱신이 반복된 경우엔 최초 입사일부터 최종 퇴직일까지 전체 기간을 합산해요.
        중간에 짧은 공백(수일~수 주)이 있더라도 실질적 계속 고용 관계가 인정되면 합산될 수 있어요.
      </p>

      <GreenBox title="계약직 퇴직금 지급 기준">
        근속 1년 이상: 전액 지급 의무<br />
        1년 미만 + 주 15시간 이상: 일할 계산 지급<br />
        계약 갱신 반복: 전체 기간 합산
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="계약직 퇴직금 지급 대상이에요. 아래 계산기로 예상 금액을 확인하세요."
        partialMatchText="조건 충족 여부에 따라 다를 수 있어요. 고용노동부(1350) 상담을 권해요."
      />

      <Divider />

      <H2>계약직 퇴직금 예상액 계산</H2>
      <p style={body}>
        월 평균임금과 계약 기간을 입력하면 퇴직금 예상액과 IRP 필요 여부를 바로 확인할 수 있어요.
        계약 갱신이 있었다면 전체 근속 개월 수를 합산해서 넣으세요.
      </p>

      <SectionBadge>계약직 퇴직금 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 법정 최저 기준. 300만원 초과 시 IRP 계좌 필수(2022년 4월 이후)."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>청구에 필요한 서류</H2>
      <p style={body}>
        근로계약서로 계약 기간과 임금 기준을 입증해야 해요.
        계약 갱신이 반복됐다면 전체 계약서를 모두 챙겨두세요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>계약직 퇴직금 수령 4단계</H2>
      <p style={body}>
        지급 요건 확인 → 퇴직금 계산 → 청구 → 미지급 시 신고 순서예요.
        계약 만료 전에 IRP를 미리 개설해두면 이체가 빠르게 처리돼요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>계약직 퇴직금 체크리스트</H2>
      <p style={body}>
        계약 갱신 합산과 IRP 계좌 개설이 핵심이에요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="계약서에 퇴직금 없다고 해도 받을 수 있어요">
        법정 퇴직금 의무는 계약서 내용보다 우선해요.<br />
        조건을 충족한다면 고용노동부(1350)에 신고하면 돼요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        계약직 퇴직금 지급규정에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법과 기간제법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
