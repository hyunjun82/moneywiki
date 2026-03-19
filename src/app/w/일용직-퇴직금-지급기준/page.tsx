"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "같은 사업장에서 반복·정기적으로 출근했어요" },
  { id: "c2", label: "4주 평균 주 15시간 이상 일한 기간이 있어요" },
  { id: "c3", label: "계속 근무 기간이 1년 이상이에요" },
  { id: "c4", label: "계약이 끊기지 않고 실질적으로 이어졌어요" },
];

const CALC_SLIDERS = [
  { id: "daily", label: "일당 (만원)", min: 10, max: 50, step: 1, defaultValue: 20, format: (v: number) => `${v}만원/일` },
  { id: "months", label: "계속 근로 개월 수", min: 12, max: 60, step: 1, defaultValue: 18, format: (v: number) => `${v}개월` },
];

const CALC_RESULTS = [
  {
    label: "3개월 평균임금 (월 22일 기준)",
    getValue: (v: Record<string, number>) => Math.round(v.daily * 10000 * 22),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원/월`,
    highlight: true,
  },
  {
    label: "퇴직금 예상액",
    getValue: (v: Record<string, number>) => Math.round(v.daily * 10000 * 22 * v.months / 12),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "근로계약서 또는 일용근로확인서", required: true, where: "사업주 요청 또는 직접 보관" },
  { name: "급여 이체 내역 (통장 거래명세서)", required: true, where: "본인 통장 내역서" },
  { name: "출퇴근 기록 또는 작업일지", required: false, where: "사업장 자료 또는 캡처 보관" },
  { name: "4대보험 가입 확인서", required: false, where: "국민건강보험공단 또는 4대사회보험포털" },
  { name: "카카오톡·문자 등 업무 지시 기록", required: false, where: "본인 휴대폰 캡처" },
];

const STEPS = [
  {
    title: "계속 근로 여부 판단",
    desc: "일용직이라도 같은 사업장에서 반복·정기 출근했다면 계속 근로로 인정돼요. 매일 계약을 새로 맺는 형식이어도 실질적으로 고정된 날마다 출근했다면 법원과 노동부가 계속 근로로 보는 경우가 많아요.",
    tip: "통장 이체 패턴이 일정하면 계속 근로 입증에 가장 효과적이에요",
  },
  {
    title: "주 15시간 이상 확인",
    desc: "4주 평균 주 15시간 이상이면 퇴직금 지급 요건을 충족해요. 하루 8시간씩 주 3일만 일해도 주 24시간으로 조건을 넘어요. 15시간 미만이면 퇴직금 대상이 아니에요.",
    tip: "어떤 주는 적게 일해도 4주 평균이 15시간 이상이면 요건 충족이에요",
  },
  {
    title: "사업주에게 퇴직금 청구",
    desc: "계속 근로 + 주 15시간 이상 조건을 갖췄다면 사업주에게 퇴직금 지급을 요청해요. 퇴직일로부터 14일 이내가 지급 기한이에요. 서면이나 문자로 청구 기록을 반드시 남겨두세요.",
    tip: "건설 일용직은 건설근로자공제회 퇴직공제금 제도도 함께 활용할 수 있어요",
  },
  {
    title: "미지급 시 노동청 진정",
    desc: "사업주가 거부하면 고용노동부(1350) 또는 관할 지방노동청에 진정을 내세요. 일용직 계약 형태와 무관하게 계속 근로가 인정되면 퇴직금을 받을 수 있어요. 소멸시효는 퇴직일로부터 3년이에요.",
    tip: "노동청 진정 전에 법률구조공단(132) 무료 상담을 활용하면 좋아요",
    link: { label: "고용노동부 민원 신청", href: "https://minwon.moel.go.kr" },
  },
];

const CHECKLIST = [
  "계속 근로 여부: 반복·정기 출근 사실 확인 (통장 내역이 핵심 증거)",
  "주 15시간 이상: 4주 평균 기준으로 계산",
  "퇴직금 지급 기한 14일: 초과 시 지연이자(연 20%) 청구 가능",
  "근무 증거 확보: 통장 내역·카카오톡·출퇴근 기록 저장",
  "소멸시효 3년: 퇴직일로부터 3년 내 청구 필수",
  "건설 일용직: 건설근로자공제회 퇴직공제금 별도 신청 가능",
];

const FAQS = [
  {
    q: "일용직은 퇴직금을 못 받는 거 아닌가요?",
    a: "아니에요. 계약 형태가 일용직이어도 실질적으로 계속 근무했고 주 15시간 이상이라면 퇴직금을 받을 수 있어요. 법원과 노동부 모두 실질 관계를 기준으로 판단해요.",
  },
  {
    q: "매일 계약을 새로 맺는데 계속 근로가 인정되나요?",
    a: "계약 형식보다 실질을 봐요. 같은 사업장에서 정해진 날마다 반복 출근했고, 사실상 고용 관계가 지속됐다면 계속 근로로 인정될 수 있어요. 통장 이체 기록이 가장 중요한 증거예요.",
  },
  {
    q: "건설 일용직도 퇴직금을 받을 수 있나요?",
    a: "건설근로자는 일반 퇴직금 외에 건설근로자공제회의 퇴직공제금 제도도 있어요. 퇴직공제금은 건설현장 근무일수 252일 이상이면 별도로 청구할 수 있어요.",
  },
  {
    q: "일용직 퇴직금 소멸시효는 얼마인가요?",
    a: "3년이에요. 마지막 근무일로부터 3년 내에 청구해야 해요. 내용증명이나 노동청 진정으로 소멸시효를 중단할 수 있어요.",
  },
  {
    q: "근로계약서가 없는 일용직도 퇴직금 신고가 가능한가요?",
    a: "가능해요. 통장 이체 내역, 문자 메시지, 출퇴근 기록 등 근무 사실을 입증할 수 있다면 노동청에 진정을 낼 수 있어요. 계약서가 없어도 실질 근무 사실로 청구해요.",
  },
  {
    q: "주 15시간을 못 채운 주가 있으면 퇴직금을 못 받나요?",
    a: "4주 평균 기준이에요. 어떤 주에 적게 일하더라도 4주 평균이 15시간 이상이면 요건을 충족해요. 일부 주의 근무시간이 짧아도 전체 평균으로 판단해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 제4조: 퇴직금 지급 요건", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "근로기준법 제2조: 일용근로자 정의", url: "https://www.law.go.kr/법령/근로기준법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부: 일용근로자 퇴직금 안내", url: "https://www.moel.go.kr" },
      { label: "건설근로자공제회: 퇴직공제금 제도", url: "https://www.cw.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "일용직-퇴직금", title: "일용직 퇴직금 받는 방법", description: "계속 근로 인정 요건과 청구 방법을 자세히 다뤄요." },
  { slug: "퇴직금-조건", title: "퇴직금 받을 수 있는 조건", description: "1년 이상 근무·주 15시간 기준 정리." },
  { slug: "퇴직금-계산-방법", title: "퇴직금 계산 방법", description: "평균임금·근속연수로 퇴직금 계산하기." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="일용직-퇴직금-지급기준" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 일용직 · 지급기준</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        일용직도 퇴직금을 받을 수 있나요?<br />
        계속 근로 인정 기준과 청구 방법 정리
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        일용직이라도 실질적으로 같은 사업장에서 반복·계속 근무하고 <a href="/w/퇴직금-조건" style={{ color: "#1D9E75", textDecoration: "underline" }}>주 15시간 이상</a> 일했다면 퇴직금 지급 대상이에요.
        계약서에 '일용직'이라고 적혀 있어도 실질 관계를 기준으로 판단해요.
        건설 일용직은 <a href="/w/건설근로자공제회-퇴직금-수령방법" style={{ color: "#1D9E75", textDecoration: "underline" }}>건설근로자공제회 퇴직공제금</a> 제도도 별도로 활용할 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>일용직 퇴직금, 어떤 경우에 받을 수 있나요?</H2>
      <p style={body}>
        핵심은 '실질적 계속 근로'예요. 매일 계약을 새로 맺는 형식이어도, 같은 사업장에서 정해진 날마다 반복 출근했다면 법원이 계속 근로로 보는 경우가 많아요.
        여기에 주 15시간 이상 조건까지 충족하면 퇴직금 청구가 가능해요.
      </p>
      <p style={body}>
        건설 현장 일용직은 일반 퇴직금 외에 건설근로자공제회 퇴직공제금 제도를 이용할 수 있어요.
        퇴직공제금은 일한 날짜를 누적해서 적립하는 방식이라 일반 퇴직금과는 별개예요.
      </p>

      <GreenBox>
        계속 근로: 반복·정기 출근, 실질적 고용 관계 지속<br />
        주 15시간 이상: 4주 평균 기준<br />
        → 두 조건 충족 시 일용직이어도 퇴직금 지급 의무 발생
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="일용직이어도 퇴직금 청구가 가능한 상황이에요. 아래 계산기로 예상 금액을 확인하세요."
        partialMatchText="계속 근로 인정 여부에 따라 다를 수 있어요. 고용노동부(1350) 상담을 권해요."
      />

      <Divider />

      <H2>일용직 퇴직금 예상액 계산</H2>
      <p style={body}>
        일당과 계속 근로 개월 수를 입력하면 월 임금과 퇴직금 예상액을 바로 확인할 수 있어요.
        실제 퇴직금은 퇴직 전 3개월 평균임금으로 계산하니, 급여명세서나 통장 이체 기준이 가장 정확해요.
      </p>

      <SectionBadge>일용직 퇴직금 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 월 22일 기준 추정치. 실제 퇴직금은 평균임금 × 근속일수 ÷ 365로 계산해요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>계속 근로 입증에 필요한 서류</H2>
      <p style={body}>
        통장 이체 내역이 계속 근로 입증에 가장 효과적이에요.
        근로계약서가 없어도 청구할 수 있으니, 지금 당장 통장 내역과 업무 지시 기록을 확인해두세요.
      </p>
      <p style={body}>
        출퇴근 기록이나 작업일지가 있다면 더 강력한 증거가 돼요.
        카카오톡으로 업무 지시를 받았다면 캡처해서 보관하세요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>일용직 퇴직금 청구 절차 4단계</H2>
      <p style={body}>
        계속 근로 여부 판단 → 주 15시간 확인 → 사업주 청구 → 미지급 시 노동청 진정 순서예요.
        소멸시효가 3년이니 퇴직 후 너무 늦지 않게 진행하세요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>퇴직금 청구 전 체크리스트</H2>
      <p style={body}>
        소멸시효 3년과 계속 근로 증거 확보가 핵심이에요.
        사업주가 거부하더라도 노동청 진정으로 충분히 받아낼 수 있어요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        계약 형식이 아닌 실질 근로 관계가 기준이에요.
        반복·정기 출근 사실만 입증되면 노동청과 법원에서 인정받을 수 있어요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        일용직 퇴직금 지급 기준에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법과 근로기준법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
