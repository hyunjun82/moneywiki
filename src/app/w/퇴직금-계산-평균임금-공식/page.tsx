"use client";

// Q1. 퇴직을 앞두고 회사가 퇴직금을 제대로 계산했는지 의심스럽고, 상여금이 빠진 것 같아 직접 검증하려는 상황
// Q2. 법정 공식에 상여금·연차수당을 포함해 본인 퇴직금을 직접 계산한다
// Q3. 평균임금 포함/제외 항목, 상여금 월 환산법, 3개월 총 일수, 통상임금 비교, 육아휴직 제외 처리
// Q4. GreenBox(공식), Calculator(직접 계산), Steps(4단계 절차), FAQ(분쟁 상황 대응)
//
// MAP:
// - Q1 → 서론 톤: "회사 계산이 맞는지 모르겠죠?" 공감형
// - Q2 → H2 순서: 공식 이해 → 직접 계산 → 절차 → 분쟁 대응
// - Q3 → H2 개수/깊이: 포함/제외 항목 명확히, 상여금 환산 심층
// - Q4 → GreenBox 공식 박스, Calculator, Steps, Checklist, FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { FAQ } from "@/components/article-ui/FAQ";
import { References } from "@/components/article-ui/References";
import { Disclaimer } from "@/components/article-ui/Disclaimer";
import { 퇴직금_SIDEBAR, 퇴직금_HIGHLIGHT } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "정기적으로 받는 상여금이 있죠" },
  { id: "c2", label: "식대·교통비를 매월 받고 있죠" },
  { id: "c3", label: "퇴직 전 3개월 급여명세서가 있죠" },
  { id: "c4", label: "연차수당을 정산받은 내역이 있죠" },
];

const CALC_SLIDERS = [
  { id: "total3m", label: "3개월 총임금", min: 300, max: 3000, step: 50, defaultValue: 900, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "years", label: "근속 기간", min: 1, max: 35, step: 1, defaultValue: 5, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "퇴직금 (법정 공식 기준)",
    getValue: (v: Record<string, number>) => {
      const dailyAvg = (v.total3m * 10000) / 91;
      return Math.round(dailyAvg * 30 * v.years);
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "1일 평균임금",
    getValue: (v: Record<string, number>) => Math.round((v.total3m * 10000) / 91),
    format: (v: number) => `약 ${Math.round(v / 10000 * 10) / 10}만원`,
  },
];

const DOCS = [
  { name: "급여명세서 (최근 3개월)", required: true, where: "회사 인사팀 요청" },
  { name: "상여금 지급 규정", required: true, where: "회사 인사팀" },
  { name: "근로계약서", required: true, where: "인사팀 또는 입사 시 수령본" },
  { name: "연차 사용 및 수당 현황", required: false, where: "인사팀 또는 취업규칙" },
];

const STEPS = [
  {
    title: "3개월 임금 총합 계산",
    desc: "퇴직일 기준으로 역산한 3개월간의 임금을 모두 더해요. 기본급, 정기 상여금(월 환산), 각종 고정수당이 포함되고, 연차수당은 퇴직 전 3개월 내 지급됐으면 포함해요.",
    tip: "상여금은 지급된 달 금액이 아니라 연 총액 ÷ 12로 환산",
  },
  {
    title: "1일 평균임금 계산",
    desc: "3개월 총임금 ÷ 3개월 총 일수(보통 89~92일)이에요. 달력에서 직접 세는 게 정확하고, 2월이 포함된 경우 총 일수가 달라지니 주의해요.",
    tip: "편의상 91일로 계산하면 크게 차이 안 나요",
  },
  {
    title: "퇴직금 공식 적용",
    desc: "1일 평균임금 × 30 × 근속연수이에요. 근속기간이 딱 떨어지지 않으면 일 단위로 계산해요. 근속 547일이면 547÷365=1.498년이에요.",
    tip: "소수점 근속 기간도 일 단위로 환산해야 정확",
  },
  {
    title: "세금 계산 및 IRP 확인",
    desc: "퇴직금에서 퇴직소득세가 차감돼요. 근속기간이 길수록 세금이 적고, 퇴직금이 300만원을 넘으면 IRP 계좌로만 받을 수 있죠.",
    tip: "IRP로 받고 연금으로 수령하면 퇴직소득세 30% 절세",
  },
];

const CHECKLIST = [
  "상여금: 연간 총액을 12로 나눠 월 환산 포함",
  "연차수당: 3개월 내 지급분 포함",
  "3개월 총 일수: 달력 기준 실제 일수",
  "근속일수: 입사일~퇴직일 정확히",
  "IRP 계좌: 300만원 초과 시 필수 개설",
];

const FAQS = [
  {
    q: "퇴직금 공식에서 '30일'은 왜 쓰나요?",
    a: "1일 평균임금을 30일로 곱해 한 달치 임금을 산정하기 위해서이에요. 실제 달의 일수(28~31일)가 아니라 법정 기준 30일이에요.",
  },
  {
    q: "상여금을 1년에 한 번 받으면 어떻게 계산하나요?",
    a: "연간 상여금 ÷ 12로 월 환산해요. 연 상여금 600만원이면 월 50만원을 3개월 임금에 포함시키고, 지급 시기와 관계없이 월 환산 포함이에요.",
  },
  {
    q: "3개월 총 일수가 왜 중요한가요?",
    a: "동일한 3개월치 임금이어도 총 일수가 89일인지 92일인지에 따라 1일 평균임금이 달라져요. 2월이 포함되면 총 일수가 줄어 평균임금이 높아질 수 있죠.",
  },
  {
    q: "입사일 바로 당일부터 근속기간이 시작되나요?",
    a: "맞아요. 입사일 당일부터 계산하고, 퇴직일은 마지막 근무일 포함이에요. 정확한 날짜는 고용24에서 조회할 수 있죠.",
  },
  {
    q: "공식 계산과 회사 계산이 다르면 어떻게 하나요?",
    a: "급여명세서를 기준으로 직접 계산한 뒤 차액을 비교해요. 10만원 이상 차이가 나면 고용노동부에 진정을 낼 수 있죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제2조: 평균임금 정의", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로자퇴직급여보장법 제8조: 퇴직금 산정", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부: 퇴직금 산정 기준 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-평균임금", title: "퇴직금 평균임금 개념", description: "포함 항목부터 산정 방법까지 설명해요." },
  { slug: "퇴직금-계산법", title: "퇴직금 계산기로 직접 확인", description: "슬라이더로 빠르게 예상 금액을 계산해요." },
  { slug: "퇴직금-세금", title: "퇴직금 세금, 얼마나 떼나요?", description: "IRP 절세 방법까지 정리했어요." },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} highlightSlugs={퇴직금_HIGHLIGHT} currentSlug="퇴직금-계산-평균임금-공식" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 평균임금공식 · 계산</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 평균임금 공식, 정확히 어떻게 되나요?<br />
        법정 공식부터 상여금 환산까지 완전 정리
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        회사가 기본급만으로 퇴직금을 계산했다면 상여금이 빠진 거이에요.
        퇴직금 법정 공식은 1일 평균임금 × 30일 × 근속연수인데,
        여기서 1일 평균임금은 <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제2조</a>에 따라 퇴직 전 3개월 총임금을 총 일수로 나눈 값이에요.
        상여금 환산이 빠지면 실제보다 낮게 계산되니, 공식을 정확히 이해하는 게 중요하죠.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>평균임금 공식, 어떤 항목이 들어가나요?</H2>
      <p style={body}>
        평균임금은 퇴직 전 3개월간 지급된 임금의 총액을 그 기간의 총 일수로 나눈 금액이에요.
        기본급, 정기 상여금(월 환산), 연차수당, 고정수당이 포함되고,
        실비 변상 항목이나 일시적으로 지급된 금품은 제외돼요.
      </p>
      <p style={body}>
        상여금을 분기별로 받거나 연 1회 받는 경우에는 연간 총액을 12로 나눠 월 환산해서 포함해야 해요.
        회사에서 기본급만으로 퇴직금을 계산하는 경우가 꽤 있죠.
        이때는 상여금 월 환산액을 직접 계산해서 차이를 비교하고 수정 요청을 해야 해요.
      </p>

      <GreenBox>
        1일 평균임금 = 3개월 총임금 ÷ 3개월 총 일수(89~92일)<br />
        퇴직금 = 1일 평균임금 × 30 × 근속연수
      </GreenBox>

      <SectionBadge>내 상황 체크해봐요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="공식 적용에 필요한 항목을 다 갖추고 있죠. 아래 계산기로 직접 계산해봐요."
        partialMatchText="일부 항목이 다를 수 있죠. 고용노동부(1350) 상담을 권해요."
      />

      <Divider />

      <H2>3개월 총임금으로 바로 계산해봐요</H2>
      <p style={body}>
        3개월 급여명세서를 합산한 총임금과 근속기간을 입력하면 퇴직금을 바로 계산할 수 있죠.
        상여금이 있다면 연간 총액 ÷ 12 × 3을 더해서 총임금에 포함시키면 더 정확하죠.
      </p>

      <SectionBadge>퇴직금 계산기 (법정 공식)</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 3개월 총임금 ÷ 91일 × 30일 × 근속연수. 실제 총 일수(89~92일)에 따라 달라질 수 있죠."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>계산에 필요한 서류</H2>
      <p style={body}>
        정확한 평균임금 계산에는 급여명세서가 핵심이에요.
        상여금 지급 규정이 있으면 포함 여부 판단에 도움이 되고, 분쟁 시 증빙자료가 되죠.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>퇴직금 계산 절차 4단계</H2>
      <p style={body}>
        단계별로 따라가면 복잡해 보이던 공식이 쉬워져요.
        상여금 월 환산과 3개월 총 일수만 정확히 처리하면 나머지는 공식 대입이죠.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>계산 전 체크리스트</H2>
      <p style={body}>
        자주 실수하는 항목들이에요. 상여금 환산과 IRP 계좌는 꼭 짚고 넘어가야 해요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        공식 자체는 단순해요. 핵심은 어떤 항목이 3개월 총임금에 들어가느냐이에요.<br />
        상여금·연차수당을 빠뜨리면 실제보다 적은 퇴직금을 받게 되죠.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 평균임금 공식에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법과 근로자퇴직급여보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 문의해요." />
    </ArticleLayout>
  );
}
