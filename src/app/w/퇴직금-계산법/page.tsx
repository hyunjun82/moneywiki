"use client";
// Q1. 퇴직을 앞두고 상여금·연차수당이 포함된 정확한 퇴직금 금액이 궁금한 상황
// Q2. 공식에 본인 급여 정보를 넣어 예상 퇴직금을 직접 계산한다
// Q3. 평균임금 산정 범위(포함/제외 항목), 계산 공식, 통상임금 비교 원칙, IRP 수령 절차
// Q4. Calculator(슬라이더), Steps(수령 절차), EligibilityChecker(조건 체크), Checklist(놓치기 쉬운 항목)
// MAP: Q1→서론(기본급만 넣으면 틀린 이유) Q2→H2순서(조건→계산→절차→체크리스트) Q3→H2깊이(포함/제외 구분 명시) Q4→컴포넌트 선택

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { FAQ } from "@/components/article-ui/FAQ";
import { References } from "@/components/article-ui/References";
import { Disclaimer } from "@/components/article-ui/Disclaimer";
import { 퇴직금_SIDEBAR, 퇴직금_HIGHLIGHT } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "같은 사업장에서 1년 이상 계속 근무했죠" },
  { id: "c2", label: "4주 평균 주 15시간 이상 근무했죠" },
  { id: "c3", label: "최근 3개월 급여명세서를 받을 수 있고요" },
  { id: "c4", label: "상여금이나 연차수당을 받은 적 있죠" },
];

const CALC_SLIDERS = [
  {
    id: "salary",
    label: "월 기본급",
    min: 150,
    max: 800,
    step: 10,
    defaultValue: 300,
    format: (v: number) => `${v}만원`,
  },
  {
    id: "bonus",
    label: "연간 상여금",
    min: 0,
    max: 600,
    step: 10,
    defaultValue: 100,
    format: (v: number) => `${v}만원`,
  },
  {
    id: "years",
    label: "근속기간",
    min: 1,
    max: 35,
    step: 1,
    defaultValue: 5,
    format: (v: number) => `${v}년`,
  },
];

const CALC_RESULTS = [
  {
    label: "1일 평균임금",
    getValue: (v: Record<string, number>) => {
      const monthlyBonus = (v.bonus * 10000) / 12;
      const daily = ((v.salary * 10000 + monthlyBonus) * 3) / 91;
      return Math.round(daily);
    },
    format: (v: number) => `약 ${Math.round(v / 1000).toLocaleString()}천원`,
  },
  {
    label: "예상 퇴직금",
    getValue: (v: Record<string, number>) => {
      const monthlyBonus = (v.bonus * 10000) / 12;
      const daily = ((v.salary * 10000 + monthlyBonus) * 3) / 91;
      return Math.round(daily * 30 * v.years);
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "기본급만 계산했을 때",
    getValue: (v: Record<string, number>) => {
      const dailyBase = (v.salary * 10000 * 3) / 91;
      return Math.round(dailyBase * 30 * v.years);
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원 (상여금 미포함)`,
  },
];

const DOCS = [
  { name: "최근 3개월 급여명세서", required: true, where: "회사 인사팀 요청 또는 이메일 수령" },
  { name: "근로계약서", required: true, where: "입사 시 수령 · 인사팀 재발급 요청" },
  { name: "연간 상여금·성과급 지급 내역", required: false, where: "급여명세서 또는 인사팀" },
  { name: "미사용 연차수당 내역", required: false, where: "인사팀 또는 근태관리 시스템" },
  { name: "고용보험 가입 이력 (입사일 확인용)", required: false, where: "고용24(ei.go.kr) 조회" },
];

const STEPS = [
  {
    title: "3개월 임금 총액 계산",
    desc: "퇴직 전 3개월간 받은 모든 임금을 더해요. 기본급 외에 식대·교통비(고정 지급분), 연차수당, 성과급·상여금(연간 총액의 3/12)도 포함되죠. 세전 금액 기준이에요.",
    tip: "급여명세서 세전 총액 3개월치를 더한 뒤, 연간 상여금 × 3 ÷ 12를 더하면 돼요",
  },
  {
    title: "실제 일수로 나눠 1일 평균임금 산출",
    desc: "3개월 임금 총액을 해당 기간의 실제 일수(보통 89~92일)로 나눠요. 달력상 일수이기 때문에 2월이 포함되면 일수가 줄어서 평균임금이 살짝 높아지기도 하죠.",
    tip: "1일 평균임금 = 3개월 임금 총액 ÷ 실제 일수(예: 91일)",
  },
  {
    title: "퇴직금 공식 적용",
    desc: "1일 평균임금 × 30 × (근속일수 ÷ 365)가 최종 퇴직금이에요. 근속 1년이면 월급 1개월치, 5년이면 5개월치가 기준이 되죠. 소수점 이하 일수도 비례 계산해요.",
    tip: "근속일수는 입사일부터 퇴직일까지 달력 날수 전부예요. 하루 차이로 금액이 달라져요",
  },
  {
    title: "IRP 계좌로 수령",
    desc: "퇴직금이 300만원을 초과하면 IRP 계좌로만 받을 수 있죠. 퇴직 전에 미리 개설해두면 이체가 빠르게 진행돼요. IRP에 두면 연금 수령 시 세금을 30~40% 줄일 수 있고요.",
    tip: "은행·증권사 어디서든 개설 가능. 퇴직 당일 개설해도 돼요",
    link: { label: "IRP 계좌 개설 방법", href: "/w/퇴직금-IRP-계좌" },
  },
];

const CHECKLIST = [
  "급여명세서: 세전 총액 기준 3개월치 챙기기",
  "상여금·성과급: 연간 총액 ÷ 12 × 3을 3개월 임금에 더하기",
  "미사용 연차수당: 퇴직 전 1년간 발생분 포함 여부 점검",
  "IRP 계좌: 퇴직금 수령 전 미리 개설 (300만원 초과 시 의무)",
  "근속일수: 입사일·퇴직일 하루도 빠짐없이 계산 (고용24 조회)",
  "식대·교통비: 매달 고정으로 받는 경우 평균임금에 포함",
];

const FAQS = [
  {
    q: "기본급만으로 계산하면 안 되나요?",
    a: "기본급만 쓰면 실제보다 10~20% 낮게 나와요. 상여금, 고정 식대·교통비, 연차수당까지 포함해야 법적으로 정확한 퇴직금이에요. 회사가 기본급 기준으로 계산했다면 차액을 청구할 수 있죠.",
  },
  {
    q: "성과급이 매년 달라도 포함되나요?",
    a: "포함되죠. 퇴직 전 1년간 받은 성과급 총액의 3/12(3개월치)를 평균임금에 더해요. 금액이 해마다 달라도 직전 1년 기준으로 계산하면 돼요.",
  },
  {
    q: "육아휴직 기간도 근속일수에 들어가나요?",
    a: "들어가죠. 육아휴직은 법적 보호를 받는 기간이라 근속일수에 포함돼요. 다만 육아휴직 중엔 임금을 받지 않으므로 평균임금 계산에서 해당 기간과 임금은 제외해요. 결과적으로 퇴직금이 줄지 않아요.",
  },
  {
    q: "퇴직금을 14일 안에 안 주면 어떻게 되나요?",
    a: "연 20% 지연이자가 붙어요. 고용노동부(1350) 진정을 넣으면 근로감독관이 직접 조사해요. 형사 처벌(3년 이하 징역 또는 3,000만원 벌금)까지 갈 수 있죠.",
  },
  {
    q: "1년 미만이면 퇴직금이 아예 없나요?",
    a: "맞아요. 계속 근로 1년이 충족돼야 퇴직금이 생겨요. 11개월 29일이면 한 푼도 없어요. 1년을 채운 순간부터 1개월치가 기준이 되죠.",
  },
  {
    q: "퇴직금 계산기 결과를 믿어도 되나요?",
    a: "기본 구조는 맞지만, 상여금·연차수당을 빼면 부정확해요. 계산기는 어디까지나 예상치예요. 급여명세서를 직접 기반으로 계산하거나, 고용노동부 퇴직금 계산기(moel.go.kr)를 쓰는 게 정확하죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법: 퇴직급여 산정 기준", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "근로기준법 제2조: 평균임금 정의", url: "https://www.law.go.kr/법령/근로기준법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부: 퇴직금 제도 안내 및 계산기", url: "https://www.moel.go.kr" },
      { label: "고용24: 내 고용보험 가입 이력 조회", url: "https://www.ei.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-조건",
    title: "퇴직금 받을 수 있는 조건",
    description: "1년, 주 15시간 기준 등 퇴직금 발생 조건 정리.",
  },
  {
    slug: "퇴직금-평균임금",
    title: "퇴직금 평균임금 계산 방법",
    description: "상여금·연차수당 포함 평균임금 계산 공식.",
  },
  {
    slug: "퇴직금-세금",
    title: "퇴직금 세금, 얼마나 떼나요?",
    description: "퇴직소득세 계산과 IRP 절세 방법.",
  },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} highlightSlugs={퇴직금_HIGHLIGHT} currentSlug="퇴직금-계산법" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 계산 · 평균임금</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 계산법, 상여금까지 포함하면<br />
        얼마나 더 받을 수 있을까?
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        기본급만 넣으면 퇴직금이 실제보다 낮게 나와요. 상여금, 연차수당, 고정 식대까지 포함해야
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법</a>에서
        정한 올바른 평균임금이에요.
        1일 평균임금 × 30 × 근속연수 공식부터, 상여금 포함 계산 예시, 수령 절차까지 한 번에 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* H2-1: 조건 체크 */}
      <H2>퇴직금 계산, 내가 해당되는 조건은?</H2>
      <p style={body}>
        퇴직금은 고용 형태와 무관하게 두 가지 조건을 충족하면 받을 수 있죠.
        계속 근로 1년 이상, 4주 평균 주 15시간 이상 근무. 정규직·계약직·파트타임·아르바이트 모두 동일하게 적용돼요.
      </p>
      <p style={body}>
        1인 사업장도 예외 없이 지급 의무가 있죠. 4대보험 미가입 상태여도 실제 근무 증거가 있으면 청구할 수 있고요.
        여러 직장을 다녔다면 각 직장별로 따로 계산해요. 합산 기준은 없어요.
      </p>

      <GreenBox>
        같은 사업장에서 계속 근로 1년 이상<br />
        4주 평균 주 15시간 이상 근무<br />
        정규직·계약직·파트타임·아르바이트 모두 동일 적용
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="퇴직금 계산 조건을 모두 갖췄어요. 아래 계산기로 상여금까지 포함해서 예상 금액을 구해보세요."
        partialMatchText="조건 일부가 부족할 수 있죠. 고용노동부(1350) 상담을 먼저 받아보세요."
      />

      <Divider />

      {/* H2-2: 계산기 */}
      <H2>상여금 포함 퇴직금 계산기</H2>
      <p style={body}>
        퇴직금 공식은 <strong>1일 평균임금 × 30 × (근속일수 ÷ 365)</strong>예요.
        여기서 평균임금은 기본급만이 아니에요. 연간 상여금을 12로 나눈 값도 매달 평균임금에 더해지죠.
        월 300만원 기본급에 연 120만원 상여금을 받는다면, 매달 10만원이 추가돼서 310만원 기준으로 계산하는 거예요.
      </p>
      <p style={body}>
        아래에서 기본급, 연간 상여금, 근속기간을 직접 조정해보세요.
        기본급만 계산했을 때와 상여금 포함 금액이 얼마나 차이 나는지도 함께 보여줘요.
      </p>

      <SectionBadge>내 상황에 맞게 직접 계산해보세요</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 1일 평균임금 = (3개월 기본급 + 상여금 연간 총액 × 3/12) ÷ 91일 기준. 연차수당·식대 등 추가 시 실제 금액이 더 높아요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      {/* H2-3: 서류 */}
      <H2>정확한 계산에 필요한 서류</H2>
      <p style={body}>
        계산기 결과는 어디까지나 예상치예요. 실제 수령액은 급여명세서를 기반으로 계산해야 정확하죠.
        퇴직 후에는 서류 발급이 어려울 수 있으니 재직 중에 챙겨두는 게 좋아요.
      </p>
      <p style={body}>
        서류가 없어도 통장 입금 내역, 카카오톡 급여 안내 메시지, 4대보험 이력만 있으면 기본 증명은 돼요.
        입사일 확인은 고용24(ei.go.kr)에서 바로 조회할 수 있죠.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      {/* H2-4: 수령 절차 */}
      <H2>퇴직금 계산부터 수령까지 4단계</H2>
      <p style={body}>
        계산 방법을 알아도 어떻게 수령하는지 모르면 늦어질 수 있죠.
        IRP 계좌 개설부터 14일 지급 기한까지 순서대로 따라가면 돼요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      {/* H2-5: 체크리스트 */}
      <H2>계산 전 꼭 짚어봐야 할 것들</H2>
      <p style={body}>
        퇴직금 계산에서 가장 많이 놓치는 항목들이에요.
        상여금 하나만 빠져도 예상보다 수십만원 낮게 나올 수 있죠.
      </p>

      <SectionBadge>퇴직금 계산 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        11개월 29일에 퇴직하도록 유도하는 사례가 있죠.<br />
        실질적으로 계속 근로라는 증거가 있으면 고용노동부에 진정을 넣을 수 있죠.<br />
        급여 이체 내역, 업무 지시 문자, 근태 기록이 증거가 되고요.
      </GreenBox>

      <Divider />

      {/* H2-6: FAQ */}
      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 계산할 때 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법과 근로자퇴직급여보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 직접 문의하세요." />
    </ArticleLayout>
  );
}
