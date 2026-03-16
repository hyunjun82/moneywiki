"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "방문판매원·프리랜서 계약을 맺었지만 실제로는 회사 지시를 받았어요" },
  { id: "c2", label: "업무 시간·장소가 회사에 의해 정해졌어요" },
  { id: "c3", label: "보수가 성과급이 아닌 고정급 형태로 지급됐어요" },
  { id: "c4", label: "같은 곳에서 1년 이상 일했어요" },
];

const CALC_SLIDERS = [
  { id: "monthly", label: "월 평균 수입", min: 150, max: 600, step: 10, defaultValue: 250, format: (v: number) => `${v}만원` },
  { id: "years", label: "근무 기간", min: 1, max: 20, step: 1, defaultValue: 3, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "근로자 인정 시 퇴직금 추정액",
    getValue: (v: Record<string, number>) => v.monthly * 10000 * v.years,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "지연이자 (14일 초과, 연 20% 1년 기준)",
    getValue: (v: Record<string, number>) => Math.round(v.monthly * 10000 * v.years * 0.2),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "근로계약서 또는 위탁계약서", required: true, where: "회사 또는 계약 시 수령본" },
  { name: "급여명세서 또는 수수료 지급 내역", required: true, where: "회사 인사팀 요청 또는 통장 거래내역" },
  { name: "업무 지시 증거 (메시지·메일·공지 등)", required: true, where: "본인 보관 또는 캡처" },
  { name: "출근 기록 또는 업무 일지", required: false, where: "본인 보관 또는 회사 시스템" },
];

const STEPS = [
  {
    title: "근로자성 판단 기준 파악",
    desc: "계약서가 위탁·도급이어도 실제 업무 형태가 근로자에 해당하면 퇴직금을 청구할 수 있어요. 핵심 판단 기준은 ① 업무 지시·감독, ② 고정급 지급, ③ 시간·장소 통제, ④ 전속성(다른 곳 일 못 함)이에요.",
    tip: "네 가지 중 3가지 이상 해당되면 근로자성 인정 가능성이 높아요",
  },
  {
    title: "증거 수집",
    desc: "업무 지시 메시지, 회의 참석 내역, 출근 기록, 급여 지급 내역을 모아요. 카카오톡·이메일에서 업무 지시 내용을 캡처해두면 좋아요. 근로자임을 입증하는 증거가 많을수록 유리해요.",
    tip: "통장 거래내역에서 고정급 지급 패턴을 확인할 수 있어요",
  },
  {
    title: "고용노동청 진정 또는 노동위원회 신청",
    desc: "관할 고용노동청에 체불 진정을 내거나, 근로자성 판단을 위해 노동위원회에 구제 신청을 해요. 고용노동부 진정은 무료이고, 결과에 따라 퇴직금 지급 명령이 나올 수 있어요.",
    tip: "고용노동부 1350에 전화 상담 먼저 해보세요",
  },
  {
    title: "소액심판 또는 민사소송",
    desc: "회사가 지급을 거부하면 법원에 소액심판(3,000만원 이하) 또는 민사소송을 제기할 수 있어요. 법원은 실제 업무 형태를 보고 근로자성을 판단해요. 근로자성이 인정되면 퇴직금 + 지연이자를 받을 수 있어요.",
    tip: "대한법률구조공단(132)에서 무료 법률 지원을 받을 수 있어요",
  },
];

const CHECKLIST = [
  "근로자성 판단 4가지 기준 자가 체크",
  "업무 지시 메시지·메일 증거 캡처",
  "급여 지급 내역 — 통장 거래내역 정리",
  "고용노동청 진정 — 고용24 또는 방문",
  "소멸시효 3년 — 퇴직일로부터 3년 이내",
];

const FAQS = [
  {
    q: "계약서에 '프리랜서'라고 쓰여 있으면 퇴직금을 못 받나요?",
    a: "계약서 명칭이 아니라 실제 근무 형태가 기준이에요. 회사의 지시·감독을 받고 고정급을 받았다면 근로자로 인정될 수 있어요. 대법원도 실질 관계를 우선시해요.",
  },
  {
    q: "방문판매원은 무조건 근로자로 인정이 안 되나요?",
    a: "아니에요. 방문판매원도 업무 형태에 따라 근로자로 인정될 수 있어요. 지역별 담당 구역이 정해지거나, 출근 시간이 정해지거나, 고정급이 있다면 근로자성을 주장할 수 있어요.",
  },
  {
    q: "근로자성 판단에 가장 중요한 기준은 무엇인가요?",
    a: "사용자의 지시·감독 여부가 핵심이에요. 그 외에 고정급 지급, 근무 장소·시간 통제, 다른 회사 일을 병행할 수 없는 전속성도 중요해요. 네 가지 모두 해당되면 근로자로 인정받기 쉬워요.",
  },
  {
    q: "고용노동청 진정과 소액심판 중 뭐가 더 빠른가요?",
    a: "고용노동청 진정이 더 빠르고 비용도 없어요. 다만 회사가 근로자성을 인정하지 않으면 강제 이행이 어려울 수 있어요. 그때는 법원 소액심판이 실질적인 해결 방법이에요.",
  },
  {
    q: "퇴직한 지 3년이 지나면 청구가 안 되나요?",
    a: "맞아요. 퇴직금 청구권은 퇴직일로부터 3년의 소멸시효가 있어요. 3년이 지나면 법적으로 청구가 어려워요. 빠르게 진정이나 소송을 진행하세요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제2조 — 근로자 정의", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로자퇴직급여보장법 제8조 — 퇴직금 산정", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 — 특수형태근로종사자 제도", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "알바-퇴직금-지급기준", title: "아르바이트 퇴직금 기준", description: "주 15시간 조건과 청구 방법." },
  { slug: "퇴직금-지급-청구-방법", title: "퇴직금 청구 방법", description: "내용증명·노동청 신고·소송 절차." },
  { slug: "퇴직금-미지급-청구-기한-지연이자", title: "퇴직금 미지급 청구 기한", description: "소멸시효 3년과 지연이자 청구법." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="방문판매원-독립계약자-퇴직금-미지급-대응" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 방문판매원 · 근로자성</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        방문판매원·독립계약자도 퇴직금 받을 수 있나요?<br />
        근로자성 판단 기준부터 청구 방법까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        계약서에 '프리랜서' 또는 '위탁계약'이라고 쓰여 있어도, 실제로 회사의 지시를 받고 고정급을 받았다면 <a href="/w/퇴직금-수령방법" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금</a>을 청구할 수 있어요.
        법원은 계약서 명칭이 아니라 실제 근무 형태를 보거든요.
        업무 지시 메시지, 고정급 지급 내역이 있다면 근로자로 인정받을 가능성이 있어요.
        <a href="/w/퇴직금-지급-청구-방법" style={{ color: "#1D9E75", textDecoration: "underline" }}>청구 방법</a>과 증거 수집 방법을 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>내가 근로자인지 어떻게 알 수 있나요?</H2>
      <p style={body}>
        근로자 판단의 핵심은 4가지예요. 업무 지시·감독, 고정급 지급, 시간·장소 통제, 전속성(다른 회사 일 병행 불가)이에요.
        이 중 3가지 이상 해당된다면 근로자로 인정받을 가능성이 높아요.
        계약서에 '프리랜서'라고 적혀 있어도 실제 형태가 근로자와 같다면 법원은 근로자로 봐요.
      </p>
      <p style={body}>
        특히 방문판매원은 지역 담당 구역이 정해지고, 출근 시간이 고정되어 있고, 고정급을 받는 경우가 많아요.
        이런 형태라면 근로자성을 주장할 수 있어요.
        고용노동청에 진정을 내거나 법원에 소액심판을 제기하는 게 실질적인 해결 방법이에요.
      </p>

      <GreenBox title="근로자성 판단 4가지 기준">
        ① 업무 지시·감독 — 회사가 업무 내용을 정해줘요<br />
        ② 고정급 지급 — 성과와 무관하게 일정 금액 지급<br />
        ③ 시간·장소 통제 — 출근 시간·장소가 정해짐<br />
        ④ 전속성 — 다른 회사 일을 병행할 수 없어요
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="근로자성 인정 가능성이 높아요. 퇴직금 청구를 진행해보세요."
        partialMatchText="일부 조건이 해당될 수 있어요. 고용노동부(1350) 상담을 먼저 받아보세요."
      />

      <Divider />

      <H2>근로자로 인정되면 퇴직금이 얼마나 되나요?</H2>
      <p style={body}>
        근로자로 인정되면 <a href="/w/퇴직금-계산-방법" style={{ color: "#1D9E75", textDecoration: "underline" }}>일반 퇴직금</a> 계산 공식이 그대로 적용돼요.
        1년 근속 당 1개월치 평균 임금이 퇴직금으로 나와요.
        지급이 14일 이상 지연되면 연 20% 지연이자도 청구할 수 있어요.
      </p>

      <SectionBadge>퇴직금 예상 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 근로자성이 인정된 경우 기준. 월 평균 수입 × 근속연수 = 퇴직금 추정액. 지연이자는 14일 초과 시 연 20%."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>증거 수집과 청구에 필요한 서류</H2>
      <p style={body}>
        근로자성을 입증하는 서류가 핵심이에요.
        업무 지시 메시지·메일 캡처와 급여 지급 내역이 가장 중요해요.
        계약서가 위탁계약이어도 실제 근무 형태가 드러나는 서류가 있으면 돼요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>퇴직금 청구 절차 4단계</H2>
      <p style={body}>
        근로자성 판단부터 소액심판까지 단계별로 대응하면 돼요.
        고용노동청 진정이 가장 빠르고 비용이 없는 방법이에요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>청구 전 체크리스트</H2>
      <p style={body}>
        소멸시효 3년이 지나면 청구가 어려워요. 퇴직 직후 빠르게 대응하는 게 중요해요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="계약서 명칭보다 실제 근무 형태가 기준이에요">
        법원과 고용노동부 모두 계약서 이름이 아니라 실제 업무 방식을 봐요.
        업무 지시를 받고 고정급을 받았다면 충분히 근로자로 인정받을 수 있어요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        방문판매원·독립계약자 퇴직금 청구에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법과 근로자퇴직급여보장법을 바탕으로 작성됐어요. 근로자성 판단은 개별 사안에 따라 다를 수 있으니 고용노동부(1350) 또는 대한법률구조공단(132)에서 상담받으세요." />
    </ArticleLayout>
  );
}
