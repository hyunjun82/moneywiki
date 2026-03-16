"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "같은 사업장에서 1년 이상 일했어요" },
  { id: "c2", label: "4주 평균 주 15시간 이상 근무했어요" },
  { id: "c3", label: "최근 3개월 급여명세서가 있어요" },
  { id: "c4", label: "상여금·연차수당도 정확히 계산하고 싶어요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "월 평균임금", min: 150, max: 800, step: 10, defaultValue: 300, format: (v: number) => `${v}만원` },
  { id: "years", label: "근속 기간", min: 1, max: 35, step: 1, defaultValue: 5, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "예상 퇴직금",
    getValue: (v: Record<string, number>) => Math.round(v.salary * 10000 * v.years),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "1년당 기준 (1개월치)",
    getValue: (v: Record<string, number>) => Math.round(v.salary * 10000),
    format: (v: number) => `${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "급여명세서 (최근 3개월)", required: true, where: "회사 인사팀 요청" },
  { name: "근로계약서", required: true, where: "인사팀 또는 입사 시 수령본" },
  { name: "4대보험 가입 이력", required: false, where: "고용24 무료 조회" },
  { name: "상여금·연차수당 지급 기록", required: false, where: "급여명세서 또는 인사팀" },
];

const STEPS = [
  {
    title: "평균임금 산정",
    desc: "퇴직 전 3개월간 지급된 임금 총액을 3개월 총 일수로 나눠요. 기본급만이 아니라 상여금(월 환산), 연차수당, 고정수당도 포함해야 정확해요. 1일 평균임금 = 3개월 총임금 ÷ 총 일수.",
    tip: "상여금은 연간 총액 ÷ 12로 월 환산해서 포함",
  },
  {
    title: "근속일수 확인",
    desc: "입사일부터 퇴직일까지 실제 일수를 계산해요. 고용24나 4대보험 가입이력으로 정확한 날짜를 확인할 수 있어요. 정확한 근속일수가 있어야 소수점 계산도 정확해져요.",
    tip: "고용24(ei.go.kr)에서 입사일·퇴직일 무료 확인 가능",
  },
  {
    title: "퇴직금 공식 적용",
    desc: "1일 평균임금 × 30일 × (근속일수 ÷ 365)예요. 근속기간이 정확히 n년이 아니라면 일 단위로 계산해야 해요. 예를 들어 근속 1년 6개월이면 549일 ÷ 365 = 1.5년이에요.",
    tip: "월급 × 근속연수는 편의상 추정치 — 정확한 계산은 일 단위",
  },
  {
    title: "IRP 계좌 확인",
    desc: "퇴직금이 300만원을 초과하면 IRP 계좌로만 받을 수 있어요. 아직 IRP 계좌가 없다면 퇴직 전에 미리 만들어두세요. 회사 인사팀에 IRP 계좌번호를 알려줘야 이체가 돼요.",
    tip: "IRP 계좌는 은행·증권사 앱으로 10분 안에 개설 가능",
  },
];

const CHECKLIST = [
  "기본급만 계산하지 않기 — 상여금·수당 포함 필수",
  "3개월 총 일수 — 달력 기준 실제 일수로 나누기",
  "근속일수 — 입사일부터 퇴직일까지 정확히",
  "IRP 계좌 — 퇴직금 300만원 초과 시 미리 개설",
  "소멸시효 — 퇴직 후 3년 안에 청구",
];

const FAQS = [
  {
    q: "퇴직금 공식이 정확히 어떻게 되나요?",
    a: "1일 평균임금 × 30 × (근속일수 ÷ 365)예요. 쉽게 말하면 '1개월치 평균임금 × 근속연수'인데, 정확하게는 일 단위로 계산해야 해요.",
  },
  {
    q: "기본급만으로 계산하면 안 되나요?",
    a: "안 돼요. 평균임금은 3개월간 지급된 임금 총액 기준이에요. 상여금, 연차수당, 고정 야근수당도 포함해야 법에 맞는 계산이에요. 기본급만 쓰면 10~30% 낮게 나와요.",
  },
  {
    q: "수습 3개월은 근속기간에 포함되나요?",
    a: "포함돼요. 수습이든 시용이든 실제로 일하고 임금을 받았다면 근속기간에 들어가요. 회사가 '수습은 제외'라고 해도 법적으로 효력이 없어요.",
  },
  {
    q: "계약직에서 정규직으로 전환된 경우 계산은 어떻게 하나요?",
    a: "같은 사업장이면 계약직 기간도 합산해요. 전환 전 계약직 기간 + 정규직 기간을 합친 총 근속기간으로 퇴직금을 계산해요.",
  },
  {
    q: "퇴직금 계산이 회사랑 내가 계산한 게 다르면?",
    a: "고용노동부(1350)에 상담하거나, 급여명세서를 기준으로 직접 검토해요. 차이가 있으면 노동청에 진정을 낼 수 있어요. 근로감독관이 재산정해줘요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제2조 — 평균임금 정의", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로자퇴직급여보장법 제8조 — 퇴직금 산정 기준", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 — 퇴직금 계산 안내", url: "https://www.moel.go.kr" },
      { label: "고용24 — 고용보험 가입 이력 조회", url: "https://www.ei.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-평균임금", title: "퇴직금 평균임금 계산 방법", description: "상여금·수당 포함 방법을 자세히 설명해요." },
  { slug: "퇴직금-조건", title: "퇴직금 받을 수 있는 조건", description: "1년·주 15시간 조건을 확인하세요." },
  { slug: "퇴직금-세금", title: "퇴직금 세금, 얼마나 떼나요?", description: "IRP 절세 방법까지 정리했어요." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-계산-방법" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 계산방법 · 공식</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 계산 방법, 공식이 헷갈리나요?<br />
        평균임금 기준 단계별 계산 완전 정리
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금 공식은 <strong>1일 평균임금 × 30일 × 근속연수</strong>예요.
        쉽게 말하면 <a href="/w/퇴직금-평균임금" style={{ color: "#1D9E75", textDecoration: "underline" }}>월 평균임금</a> × 근속연수인데, 기본급만이 아니라 상여금·수당도 포함해야 정확하죠.
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법 제8조</a>에서 정한 기준이에요.
        단계별로 정리했으니 차근차근 따라오세요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>내가 퇴직금 계산 대상인지 먼저 확인해보세요</H2>
      <p style={body}>
        퇴직금을 받으려면 같은 사업장에서 1년 이상 계속 근무하고, 4주 평균 주 15시간 이상 일해야 해요.
        정규직·계약직·아르바이트 구분 없이 동일하게 적용돼요.
        5인 미만 사업장도 2010년부터 전원 적용되니 사업장 규모는 상관없어요.
      </p>
      <p style={body}>
        조건을 충족한다면 퇴직금 계산으로 바로 넘어가면 돼요.
        급여명세서 3개월치와 입사일·퇴직일만 있으면 계산이 가능해요.
      </p>

      <GreenBox title="퇴직금 계산 공식">
        <strong>1일 평균임금 × 30일 × (근속일수 ÷ 365)</strong><br />
        ≈ 월 평균임금 × 근속연수 (편의상 추정치)<br />
        평균임금 = 3개월 총임금 ÷ 3개월 총 일수
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="퇴직금 계산 조건을 충족해요. 아래 계산기로 예상 금액을 확인해보세요."
        partialMatchText="조건 일부가 다를 수 있어요. 고용노동부(1350) 상담을 받아보세요."
      />

      <Divider />

      <H2>퇴직금, 얼마나 받을 수 있을까?</H2>
      <p style={body}>
        월 평균임금과 근속기간을 입력하면 예상 퇴직금을 바로 계산할 수 있어요.
        여기서 '월 평균임금'은 기본급만이 아니라 상여금 월 환산도 포함한 금액이에요.
        상여금이 연 600만원이라면 월 50만원을 더해서 입력하면 더 정확해요.
      </p>

      <SectionBadge>퇴직금 예상 금액 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 월 평균임금 기준 추정치. 상여금·연차수당 포함 시 실제 금액이 더 높을 수 있어요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>계산에 필요한 서류</H2>
      <p style={body}>
        정확한 퇴직금 계산을 위해 아래 서류를 준비해두세요.
        특히 급여명세서 3개월치는 평균임금 산정의 핵심이에요.
        퇴직 후엔 회사가 서류 제공을 거부할 수 있으니 재직 중에 챙겨두는 게 좋아요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>퇴직금 계산 4단계</H2>
      <p style={body}>
        순서대로 따라가면 어렵지 않아요.
        핵심은 평균임금을 정확히 산정하고, 근속일수를 일 단위로 계산하는 거예요.
        이 두 가지만 잡으면 나머지는 공식 적용이에요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>계산 전 체크리스트</H2>
      <p style={body}>
        하나라도 놓치면 손해 볼 수 있어요.
        특히 상여금과 IRP 계좌는 미리 챙겨두지 않으면 나중에 번거로워져요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="소멸시효 3년, 퇴직 후 꼭 챙기세요">
        퇴직금 청구권은 퇴직일로부터 3년이 지나면 소멸해요.
        퇴직 후 바로 받지 못했다면 <a href="/w/퇴직금-소멸시효" style={{ color: "#1D9E75", textDecoration: "underline" }}>소멸시효</a> 전에 반드시 청구하세요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 계산 방법에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법과 근로자퇴직급여보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
