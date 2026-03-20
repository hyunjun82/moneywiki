"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR, 퇴직금_HIGHLIGHT } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "회사가 업무 내용과 방식을 구체적으로 지시했어요" },
  { id: "c2", label: "출근 시간·장소가 회사에 의해 정해졌어요" },
  { id: "c3", label: "성과와 무관하게 고정된 금액을 매달 받았어요" },
  { id: "c4", label: "다른 회사 일을 병행할 수 없었어요 (전속성)" },
  { id: "c5", label: "같은 회사에서 1년 이상 일했어요" },
];

const CALC_SLIDERS = [
  { id: "monthly", label: "월 평균 수입", min: 150, max: 700, step: 10, defaultValue: 280, format: (v: number) => `${v}만원` },
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
    label: "지연이자 (14일 초과, 연 20% · 1년 기준)",
    getValue: (v: Record<string, number>) => Math.round(v.monthly * 10000 * v.years * 0.2),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "근로계약서 또는 위탁·도급 계약서", required: true, where: "계약 체결 당시 수령본 또는 회사 인사팀 요청" },
  { name: "급여명세서 또는 수수료 지급 내역", required: true, where: "회사 인사팀 요청 또는 통장 거래내역" },
  { name: "업무 지시 증거 (카카오톡·이메일·공문 등)", required: true, where: "본인 보관 또는 캡처 출력" },
  { name: "출근 기록 또는 업무 일지", required: false, where: "본인 보관 또는 회사 시스템 출력" },
  { name: "교육·회의 참가 기록", required: false, where: "본인 보관 또는 사내 시스템" },
];

const STEPS = [
  {
    title: "근로자성 자가 판단",
    desc: "근로자 여부는 4가지로 판단해요. ① 업무 지시·감독, ② 고정급 지급, ③ 시간·장소 통제, ④ 전속성(다른 곳 일 못 함). 이 중 3가지 이상 해당되면 근로자로 인정받을 가능성이 높아요. 계약서 명칭은 관계없어요.",
    tip: "대법원도 계약서 이름보다 실제 업무 형태를 우선시해요",
  },
  {
    title: "증거 수집",
    desc: "업무 지시 메시지·이메일 캡처, 교육·회의 참석 내역, 고정급 통장 입금 내역을 모아요. 출근·퇴근 시간이 정해진 사실을 보여주는 메시지가 있으면 특히 유리해요. 증거가 많을수록 인정 가능성이 올라가요.",
    tip: "통장 거래내역에서 매달 고정금액 입금 패턴이 핵심 증거가 돼요",
  },
  {
    title: "고용노동청 진정 제기",
    desc: "관할 고용노동청에 임금 체불 진정을 내요. 고용24(work.go.kr) 온라인 신청 또는 방문 신청 모두 가능해요. 진정 비용은 무료이고, 근로감독관이 조사 후 퇴직금 지급 명령을 내릴 수 있어요.",
    tip: "고용노동부 1350에 전화 상담 먼저 하면 신청 방법을 안내받을 수 있어요",
    link: { label: "고용24 진정 신청", href: "https://www.work.go.kr" },
  },
  {
    title: "소액심판 또는 민사소송",
    desc: "회사가 근로자성을 인정하지 않거나 지급을 거부하면 법원에 소액심판(청구액 3,000만원 이하)을 제기해요. 법원은 계약서가 아닌 실제 업무 형태를 보고 판단해요. 근로자성이 인정되면 퇴직금에 연 20% 지연이자까지 받을 수 있어요.",
    tip: "대한법률구조공단(132)에서 무료 법률 지원을 받을 수 있어요",
  },
];

const CHECKLIST = [
  "근로자성 4가지 기준 자가 체크 (지시·고정급·시간·전속성)",
  "업무 지시 메시지·메일 캡처 저장",
  "통장 거래내역에서 고정급 지급 패턴 출력",
  "고용노동청 진정: 고용24 온라인 또는 방문",
  "소멸시효 3년: 퇴직일로부터 3년 이내에 청구",
  "대한법률구조공단(132) 무료 상담 활용",
];

const FAQS = [
  {
    q: "계약서에 '프리랜서'라고 쓰여 있으면 퇴직금을 못 받나요?",
    a: "계약서 명칭이 아니라 실제 근무 형태가 기준이에요. 회사의 지시·감독을 받고 고정급을 받았다면 근로자로 인정될 수 있어요. 대법원도 계약 형식보다 실질적인 종속 관계를 우선시해요.",
  },
  {
    q: "방문판매원은 근로자로 인정받기 어렵나요?",
    a: "업무 형태에 따라 달라요. 지역별 담당 구역이 정해지거나, 출근 시간이 고정되거나, 매달 고정급을 받았다면 근로자성을 주장할 수 있어요. 성과와 무관한 고정 수입이 있다면 특히 유리해요.",
  },
  {
    q: "근로자성 판단에서 가장 중요한 기준은 뭔가요?",
    a: "사용자의 지시·감독 여부가 핵심이에요. 회사가 업무 내용을 정해주고 방식을 통제했다면 이게 가장 강력한 근거가 돼요. 고정급·시간 통제·전속성도 함께 확인해요.",
  },
  {
    q: "고용노동청 진정과 소액심판 중 뭐가 더 빠른가요?",
    a: "고용노동청 진정이 더 빠르고 비용이 없어요. 다만 회사가 근로자성을 인정하지 않으면 강제 이행이 어려울 수 있어요. 그때는 법원 소액심판이 실질적인 해결 방법이에요.",
  },
  {
    q: "퇴직한 지 2년이 지났는데 청구할 수 있나요?",
    a: "퇴직금 청구권의 소멸시효는 퇴직일로부터 3년이에요. 2년이 지났다면 아직 청구할 수 있어요. 단 소멸시효가 임박했다면 빠르게 고용노동청 진정이나 법원 소송을 진행하세요.",
  },
  {
    q: "회사가 세금신고를 사업소득으로 했는데도 퇴직금을 받을 수 있나요?",
    a: "받을 수 있어요. 세금 처리 방식은 근로자성 판단의 절대 기준이 아니에요. 실제 업무 형태가 근로자에 해당하면 사업소득 처리를 해도 퇴직금 청구가 가능해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제2조: 근로자 정의", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로자퇴직급여보장법 제8조: 퇴직금 산정", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부: 특수형태근로종사자 제도 안내", url: "https://www.moel.go.kr" },
      { label: "고용24: 임금 체불 진정 신청", url: "https://www.work.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-프리랜서", title: "프리랜서 퇴직금 지급 기준", description: "프리랜서·특고가 퇴직금을 받을 수 있는 조건." },
  { slug: "퇴직금-조건", title: "퇴직금 지급 조건 정리", description: "1년 이상 근속, 주 15시간 이상 핵심 기준." },
  { slug: "퇴직금-미지급-신고", title: "퇴직금 미지급 신고 방법", description: "고용노동청 진정부터 소액심판까지 절차." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} highlightSlugs={퇴직금_HIGHLIGHT} currentSlug="방문판매원-독립계약자-퇴직금-미지급-대응" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 방문판매원 · 근로자성 판단</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        방문판매원·독립계약자도 퇴직금 받을 수 있나요?<br />
        근로자성 입증 방법과 청구 절차
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        계약서에 '프리랜서' 또는 '위탁계약'이라고 쓰여 있어도, 실제로 회사의 지시를 받고 고정급을 받았다면 <a href="/w/퇴직금-수령방법" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금</a>을 청구할 수 있어요.
        법원은 계약서 명칭이 아니라 실제 근무 형태를 기준으로 판단하거든요.
        업무 지시 메시지와 고정급 지급 내역이 있다면 근로자로 인정받을 가능성이 충분해요.
        <a href="/w/퇴직금-미지급-신고" style={{ color: "#1D9E75", textDecoration: "underline" }}>미지급 신고</a> 절차와 증거 수집 방법을 아래에서 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>내가 근로자인지 어떻게 판단하나요?</H2>
      <p style={body}>
        근로자 판단의 핵심은 4가지예요. 업무 지시·감독, 고정급 지급, 시간·장소 통제, 전속성(다른 회사 일 병행 불가)이에요.
        대법원 판례상 이 중 3가지 이상 해당되면 근로자로 인정받을 가능성이 높아요.
        계약서에 '사업자 등록' 또는 '위탁'이라고 쓰여 있어도 실제 형태가 근로자와 같다면 법원은 근로자로 봐요.
      </p>
      <p style={body}>
        특히 방문판매원은 지역별 담당 구역이 정해지거나, 출근 시간이 고정되거나, 매달 고정급을 받는 경우가 많아요.
        이런 형태라면 <a href="/w/퇴직금-조건" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 조건</a>을 충족한 근로자로 주장할 수 있어요.
        세금 처리를 사업소득으로 했어도 실질 관계가 근로자이면 청구 가능해요.
      </p>

      <GreenBox>
        ① 업무 지시·감독: 회사가 업무 내용과 방식을 정해줘요<br />
        ② 고정급 지급: 성과와 무관하게 일정 금액을 매달 받아요<br />
        ③ 시간·장소 통제: 출근 시간·근무 장소가 회사에 의해 정해져요<br />
        ④ 전속성: 다른 회사 일을 병행할 수 없어요
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="근로자성 인정 가능성이 높아요. 아래 계산기로 예상 퇴직금을 확인하고 청구를 진행해보세요."
        partialMatchText="일부 조건이 해당될 수 있어요. 고용노동부(1350) 상담을 먼저 받아보세요."
      />

      <Divider />

      <H2>근로자로 인정되면 퇴직금이 얼마나 되나요?</H2>
      <p style={body}>
        근로자로 인정되면 <a href="/w/퇴직금-계산-방법" style={{ color: "#1D9E75", textDecoration: "underline" }}>일반 퇴직금 계산 공식</a>이 그대로 적용돼요.
        1년 근속당 1개월치 평균 임금이 퇴직금으로 나오고, 회사가 14일 이상 지급을 미루면 연 20% 지연이자도 청구할 수 있어요.
        슬라이더로 월 수입과 근무 기간을 입력하면 예상 금액을 확인할 수 있어요.
      </p>

      <SectionBadge>퇴직금 예상 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 근로자성이 인정된 경우 기준. 월 평균 수입 × 근속연수 = 퇴직금 추정액. 지연이자는 퇴직일로부터 14일 초과 시 연 20%."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>근로자성 입증에 필요한 서류</H2>
      <p style={body}>
        업무 지시 메시지와 고정급 지급 내역이 가장 핵심 서류예요.
        계약서가 위탁계약이어도 실제 업무 형태를 드러내는 증거가 있으면 충분해요.
        교육·회의 참석 기록은 회사의 지휘·감독을 증명하는 강력한 자료가 돼요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>퇴직금 청구 4단계 절차</H2>
      <p style={body}>
        근로자성 자가 판단부터 소액심판까지 단계별로 대응하면 돼요.
        고용노동청 진정이 가장 빠르고 비용이 없는 첫 번째 방법이에요.
        회사가 버티더라도 법원 소액심판으로 강제 집행까지 이어갈 수 있어요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>청구 전 체크리스트</H2>
      <p style={body}>
        소멸시효 3년이 지나면 청구가 어려워요. 퇴직 직후 빠르게 대응하는 게 중요해요.
        증거는 시간이 지날수록 사라질 수 있으니 지금 바로 캡처해두세요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        법원과 고용노동부 모두 계약서 이름이 아닌 실제 업무 방식을 봐요.
        업무 지시를 받고 고정급을 받았다면 근로자로 인정받을 수 있어요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        방문판매원·독립계약자 퇴직금 청구에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법과 근로자퇴직급여보장법을 바탕으로 작성됐어요. 근로자성 판단은 개별 사안에 따라 달라질 수 있으니 고용노동부(1350) 또는 대한법률구조공단(132)에서 상담받으세요." />
    </ArticleLayout>
  );
}
