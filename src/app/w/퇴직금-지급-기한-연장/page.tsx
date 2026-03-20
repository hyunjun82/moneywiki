"use client";

// Q1. 퇴직 후 회사가 "퇴직금을 나중에 줘도 되겠냐"며 연장 합의서 서명을 요청받은 상황
//     거부해도 되는지, 서명하면 어떤 권리를 잃는지 모르는 상태
// Q2. 합의서 서명 여부를 스스로 결정하고, 이미 서명했다면 지연이자를 청구하는 행동
//     → 마지막 클릭: 고용24 온라인 진정 접수 또는 관할 노동청 방문
// Q3. 유효한 합의 조건(퇴직 전 서면), 포기 조항 유무, 합의 기한 초과 시 이자 계산법,
//     노동청 진정 절차 거부권·소멸시효 포함
// Q4. 조건 판단 체크리스트 + 이자 계산기 + 단계별 절차 (판단→계산→청구)

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR, 퇴직금_HIGHLIGHT } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "회사가 퇴직금 지급 기한 연장을 서면으로 요청했어요" },
  { id: "c2", label: "연장 합의서에 지연이자 포기 문구가 없어요" },
  { id: "c3", label: "연장 합의가 퇴직 전(재직 중)에 이뤄졌어요" },
  { id: "c4", label: "합의한 연장 기한도 이미 지났어요" },
];

const CALC_SLIDERS = [
  { id: "amount", label: "미지급 퇴직금 (만원)", min: 50, max: 5000, step: 50, defaultValue: 500, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "days", label: "합의 기한 초과 지연 일수", min: 1, max: 365, step: 1, defaultValue: 30, format: (v: number) => `${v.toLocaleString()}일` },
];

const CALC_RESULTS = [
  {
    label: "지연이자 (연 20%, 합의 기한 초과분)",
    getValue: (v: Record<string, number>) => Math.round(v.amount * 10000 * 0.20 * v.days / 365),
    format: (v: number) => v < 10000 ? `${v.toLocaleString()}원` : `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "총 청구 금액 (퇴직금 + 이자)",
    getValue: (v: Record<string, number>) => Math.round(v.amount * 10000 + v.amount * 10000 * 0.20 * v.days / 365),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "지급 기한 연장 합의서 (서면)", required: true, where: "회사에서 작성, 근로자 서명 후 사본 보관" },
  { name: "퇴직 확인서 또는 사직서 사본", required: true, where: "회사 인사팀" },
  { name: "급여명세서 (최근 3개월)", required: true, where: "회사 인사팀" },
  { name: "근로계약서", required: false, where: "인사팀 또는 입사 시 수령본" },
  { name: "합의 기한 초과 관련 요청 기록", required: false, where: "문자·이메일 캡처 보관" },
];

const STEPS = [
  {
    title: "연장 합의 유효성 판단",
    desc: "지급 기한 연장이 법적으로 유효하려면 퇴직 전(재직 중)에 사업주와 근로자 간 서면 합의가 있어야 해요. 퇴직 후 사후 강요로 서명한 합의서는 법적 효력이 없어요.",
    tip: "전화나 말로 한 합의는 서면 합의로 인정되지 않아요.",
  },
  {
    title: "합의서 내용 꼼꼼히 살피기",
    desc: "합의서에 '지연이자 포기' 문구가 있는지 반드시 읽어봐야 해요. 포기 문구가 없으면 합의 기간이 지난 이후부터 연 20% 지연이자를 청구할 수 있죠. 포기 문구가 있고 자발적 서명이면 이자 청구가 제한되기도 해요.",
    tip: "서명 전에 사본을 요청해서 반드시 보관해야 해요.",
  },
  {
    title: "합의 기한 도래 후 지급 요청",
    desc: "합의한 날짜가 지났는데도 지급이 없으면, 그 다음 날부터 연 20% 지연이자가 발생해요. 문자나 이메일로 날짜·금액을 명시해서 지급을 요청하고 기록을 남겨요.",
    tip: "지연이자 금액도 함께 명시해서 청구하면 효과적이에요.",
  },
  {
    title: "노동청 진정 또는 소액심판 청구",
    desc: "지급이 계속 없으면 사업장 관할 지방고용노동청에 임금체불 진정을 접수해요. 진정서에 '지연이자 연 20% 청구'를 명시해야 이자도 처리돼요. 3,000만원 이하라면 법원 소액심판도 이용할 수 있고요.",
    tip: "고용24(work.go.kr)에서 온라인 진정 가능해요.",
    link: { label: "고용24 온라인 진정 접수", href: "https://www.work.go.kr" },
  },
];

const CHECKLIST = [
  "합의서 유효성: 퇴직 전 서면 합의여야 해요 (사후 강요 합의는 무효)",
  "지연이자 포기 조항: 포기 문구 없으면 합의 기한 후 이자 청구 가능",
  "합의서 사본 보관: 서명 전에 반드시 사본을 받아둬야 해요",
  "합의 기한 초과 시: 다음 날부터 연 20% 지연이자 발생",
  "소멸시효 3년: 퇴직일 기준 3년 안에 청구해야 해요",
];

const FAQS = [
  {
    q: "회사가 연장 합의서에 서명을 강요해요. 거부할 수 있나요?",
    a: "거부할 수 있죠. 연장 합의는 근로자 자유의사로 이뤄져야 해요. 거부하면 14일 기한이 그대로 적용되고, 초과 시 연 20% 지연이자를 청구할 수 있죠.",
  },
  {
    q: "합의서에 서명했어도 지연이자를 받을 수 있나요?",
    a: "합의서에 지연이자 포기 문구가 없다면 청구 가능해요. 포기 문구가 있더라도 강요로 서명했다면 무효 주장이 가능해요. 합의서 내용을 먼저 살펴봐야 해요.",
  },
  {
    q: "합의한 기한 안에 퇴직금을 줬으면 지연이자가 없나요?",
    a: "맞아요. 유효한 서면 합의로 연장한 기한 안에 지급하면 지연이자 의무가 없어요. 하지만 합의 기한도 넘기면 그 다음 날부터 연 20%가 붙어요.",
  },
  {
    q: "구두로 연장에 동의했는데, 법적 효력이 있나요?",
    a: "없어요. 근로기준법 제36조는 서면 합의를 요건으로 해요. 전화나 말로 한 합의는 인정되지 않고, 14일 기한이 그대로 적용돼요.",
  },
  {
    q: "퇴직 후에 사업주가 연장 합의서를 가져왔어요.",
    a: "퇴직 후 사후 합의는 법적 효력이 없어요. 이미 14일 기한이 적용되는 상황이라면 14일 경과분부터 연 20% 지연이자를 청구할 수 있죠.",
  },
  {
    q: "소멸시효가 지나면 지연이자도 청구 못하나요?",
    a: "퇴직금 청구권은 퇴직일로부터 3년이에요. 3년이 지나면 원금은 물론 지연이자도 청구가 어려워요. 기한이 임박하면 노동청 진정을 빨리 넣는 게 좋아요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제36조: 금품 청산 기한 및 합의 연장", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로기준법 제37조: 지연이자 연 20%", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로자퇴직급여보장법 제9조: 퇴직급여 지급 기한", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부: 퇴직금 지급 기준 안내", url: "https://www.moel.go.kr" },
      { label: "고용24: 온라인 진정 접수", url: "https://www.work.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-지급-기한", title: "퇴직금 지급 기한 원칙", description: "14일 기준 원칙과 예외 조건." },
  { slug: "퇴직금-지급-기한-연장-동의서", title: "지급 기한 연장 동의서 작성법", description: "서명 전 확인 사항과 거부 방법." },
  { slug: "퇴직금-지연이자", title: "퇴직금 지연이자 계산법", description: "연 20% 계산 공식과 청구 절차." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} highlightSlugs={퇴직금_HIGHLIGHT} currentSlug="퇴직금-지급-기한-연장" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 지급 기한 연장 · 합의 조건</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 지급 기한 연장, 동의해도 되나요?<br />
        합의 유효 조건과 지연이자 청구 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        <a href="/w/퇴직금-지급-기한" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 지급 기한</a>은 원칙적으로 퇴직일로부터 14일이에요.
        사업주와 근로자가 서면으로 합의하면 기한을 연장할 수 있고, 합의 기간 내에는 <a href="/w/퇴직금-지연이자" style={{ color: "#1D9E75", textDecoration: "underline" }}>지연이자</a>가 붙지 않아요.
        다만 합의서에 '지연이자 포기' 문구가 있는지, 합의가 퇴직 전에 이뤄진 건지를 꼭 따져봐야 해요.
        조건을 모르고 서명하면 정당한 권리를 잃게 돼요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>기한 연장 합의, 어떤 경우에 유효한가요?</H2>
      <p style={body}>
        근로기준법 제36조는 퇴직 후 14일 이내 지급을 원칙으로 하되, 당사자 간 합의 시 기한을 연장할 수 있다고 규정해요.
        유효한 합의가 되려면 퇴직 전 재직 중에 서면으로 이뤄져야 해요.
        구두 합의나 퇴직 이후 사후 강요로 받은 합의서는 법적 효력이 없어요.
      </p>
      <p style={body}>
        합의 기간 내에 지급하면 지연이자 의무가 사라져요.
        하지만 합의 기한도 넘기면 그 다음 날부터 연 20% 지연이자가 발생해요.
        합의서에 '지연이자 포기' 문구가 있으면 이자 청구가 제한될 수 있으니 서명 전에 반드시 내용을 읽어봐야 해요.
      </p>

      <GreenBox>
        퇴직 전(재직 중) 서면 합의 퇴직 후 사후 합의는 무효<br />
        구두 합의 불인정 반드시 서면이어야 해요<br />
        합의 기한 초과 시 다음 날부터 연 20% 지연이자 발생
      </GreenBox>

      <SectionBadge>합의 유효성 체크해봐요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="합의 기한 초과분에 대해 지연이자 청구가 가능해요. 아래 계산기로 금액을 따져봐요."
        partialMatchText="상황에 따라 다를 수 있죠. 합의서 내용과 서명 시점을 먼저 살펴봐요."
      />

      <Divider />

      <H2>합의 기한 초과 시 지연이자는 얼마예요?</H2>
      <p style={body}>
        합의한 기한도 지났다면, 초과한 날부터 연 20% 지연이자가 붙어요.
        계산 방법은 미지급 퇴직금 × 20% ÷ 365 × 초과 일수예요.
        500만원을 30일 초과하면 약 8만 2천원이에요.
      </p>

      <SectionBadge>지연이자 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 근로기준법 제37조 연 20% 기준. 합의한 기한 다음 날부터 실제 지급일까지 적용돼요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>연장 합의 시 필요한 서류</H2>
      <p style={body}>
        합의서는 양측이 서명한 서면이어야 해요. 작성 후 반드시 사본을 보관해야 해요.
        합의서 외에도 퇴직 확인서와 급여명세서를 챙겨야 퇴직금 금액을 입증할 수 있죠.
        이후 노동청 진정이나 소액심판으로 이어질 때 동일한 서류가 필요해요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>기한 연장 합의 대응 절차</H2>
      <p style={body}>
        합의 여부를 살피고, 기한이 지나도 지급이 없으면 지급 요청 후 노동청에 진정을 넣으면 돼요.
        진정서에 지연이자를 명시해야 이자도 받을 수 있죠.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>서명 전·후 확인 체크리스트</H2>
      <p style={body}>
        합의서에 서명하기 전에 지연이자 포기 조항이 없는지 꼭 살펴봐야 해요.
        서명 후에도 강요가 있었다면 무효 주장이 가능하고, 합의 기한 후 이자는 청구할 수 있죠.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        합의서에 지연이자 포기 문구가 없으면 합의 기한 초과분에 대해 연 20% 청구 가능해요.
        근로기준법 제37조로 보장된 권리예요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 지급 기한 연장에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법 제36조·제37조를 바탕으로 작성됐어요. 개별 사안에 따라 적용이 달라질 수 있으니 고용노동부(1350) 또는 관할 노동청에 문의하세요." />
    </ArticleLayout>
  );
}
