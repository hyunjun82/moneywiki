"use client";
import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const currentSlug = "퇴직금-평균임금-근속연수";

const CHECK_ITEMS = [
  "퇴직금 계산 공식을 알고 싶어요",
  "근속기간이 딱 떨어지지 않아요 (예: 3년 5개월)",
  "평균임금에 상여금이 포함되는지 궁금해요",
  "퇴직금을 직접 계산해보고 싶어요",
];

const CALC_SLIDERS = [
  {
    id: "total3m",
    label: "3개월 총임금",
    min: 300,
    max: 3000,
    step: 50,
    defaultValue: 900,
    format: (v: number) => `${v.toLocaleString()}만원`,
  },
  {
    id: "years",
    label: "근속 기간",
    min: 1,
    max: 30,
    step: 1,
    defaultValue: 5,
    format: (v: number) => `${v}년`,
  },
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
    getValue: (v: Record<string, number>) =>
      Math.round((v.total3m * 10000) / 91),
    format: (v: number) =>
      `약 ${Math.round((v / 10000) * 10) / 10}만원`,
    highlight: false,
  },
];

const DOCS = [
  { name: "급여명세서 (최근 3개월)", required: true, where: "회사 인사팀" },
  { name: "상여금 지급 내역", required: true, where: "인사팀 또는 급여명세서" },
  { name: "근로계약서 (입사일 확인)", required: true, where: "인사팀" },
  { name: "IRP 계좌번호", required: true, where: "은행·증권사" },
];

const STEPS = [
  {
    title: "3개월 총임금 합산",
    desc: "퇴직 전 3개월 급여명세서를 합산해요. 기본급, 고정수당, 상여금(연간÷12×3)을 모두 더해요. 실비 변상 성격의 항목(교통비, 식대 중 실비분)은 빼요. 명세서가 없으면 회사 인사팀에 재발급 요청하면 돼요.",
    tip: "상여금은 연간 총액 ÷ 12 × 3으로 3개월분 환산",
  },
  {
    title: "1일 평균임금 계산",
    desc: "3개월 총임금 ÷ 3개월 총 일수(보통 89~92일)로 1일 평균임금을 구해요. 달력에서 실제 일수를 세는 게 정확해요. 편의상 91일로 나눠도 큰 차이는 없지만, 2월이 포함되면 일수가 줄어 평균임금이 높아질 수 있어요.",
    tip: "2월이 포함된 분기는 총 일수가 줄어 평균임금이 높아져요",
  },
  {
    title: "근속연수 계산",
    desc: "입사일부터 퇴직일 전날까지 일 단위로 계산해요. 3년 5개월이라면 약 1,245일이고, 1,245 ÷ 365 = 3.41년이에요. 소수점 근속기간도 일 단위로 정확하게 계산해야 제대로 된 금액이 나와요.",
    tip: "고용24에서 입사일·퇴직일 기준 근속일수 확인 가능",
  },
  {
    title: "퇴직금 공식 적용",
    desc: "1일 평균임금 × 30일 × 근속연수로 최종 퇴직금을 구해요. 회사 계산값과 차이가 나면 인사팀에 재계산을 요청하세요. 거부하거나 14일을 넘겨도 지급하지 않으면 고용노동부에 진정을 낼 수 있어요.",
    tip: "IRP 계좌 미리 개설해두면 수령이 빠르게 처리돼요",
  },
];

const CHECKLIST = [
  "3개월 총임금 — 상여금 환산 포함",
  "1일 평균임금 — 실제 총 일수로 나누기",
  "근속연수 — 일 단위 정확 계산",
  "공식 적용 — 1일평균임금 × 30 × 근속연수",
  "통상임금 비교 — 높은 쪽으로 청구",
];

const FAQS = [
  {
    q: "근속기간이 3년 5개월이면 퇴직금이 얼마나 되나요?",
    a: "3년 5개월은 약 3.41년이에요. 월급 300만원 기준 3개월 총임금 900만원이면, 1일 평균임금은 약 98,900원이에요. 퇴직금은 98,900 × 30 × 3.41 ≈ 약 1,012만원이에요.",
  },
  {
    q: "상여금은 평균임금에 어떻게 반영되나요?",
    a: "연간 상여금 총액을 12로 나눠 월 환산하고, 그 3배를 3개월 총임금에 더해요. 예를 들어 연 상여금 600만원이면 600÷12×3 = 150만원을 포함해요. 지급 시기와 무관하게 월 환산 방식으로 포함해요.",
  },
  {
    q: "3개월 총 일수가 왜 중요한가요?",
    a: "같은 임금이어도 총 일수가 달라지면 1일 평균임금이 달라져요. 2월이 포함된 분기는 일수가 89~90일로 적어서 평균임금이 높아질 수 있어요. 달력에서 실제 날짜를 세는 게 가장 정확해요.",
  },
  {
    q: "평균임금이 통상임금보다 낮게 나오면?",
    a: "통상임금을 평균임금으로 대신 사용할 수 있어요. 근로기준법 제2조 2항이 이를 허용해요. 두 금액을 모두 계산해서 더 높은 쪽으로 청구하면 돼요.",
  },
  {
    q: "회사가 기본급만으로 계산했는데 어떻게 하나요?",
    a: "상여금·고정수당 포함 금액으로 직접 계산해서 차액을 청구하세요. 인사팀이 거부하면 고용노동부 진정을 낼 수 있어요. 퇴직금 청구권 소멸시효는 퇴직일로부터 3년이에요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      {
        label: "근로기준법 제2조 — 평균임금 산정 기준",
        url: "https://www.law.go.kr/법령/근로기준법",
      },
      {
        label: "근로자퇴직급여보장법 제8조 — 퇴직금 산정",
        url: "https://www.law.go.kr/법령/근로자퇴직급여보장법",
      },
    ],
  },
  {
    category: "공식 자료",
    items: [
      {
        label: "고용노동부 — 퇴직금 산정 기준 안내",
        url: "https://www.moel.go.kr",
      },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-계산법",
    title: "퇴직금 계산기",
    description: "월급·근속기간으로 빠르게 예상 금액 확인.",
  },
  {
    slug: "퇴직금-평균임금",
    title: "퇴직금 평균임금 개념",
    description: "포함 항목과 산정 방법.",
  },
  {
    slug: "퇴직금-계산-방법",
    title: "퇴직금 계산 방법 완전 정리",
    description: "공식부터 단계별 절차까지.",
  },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={
        <Sidebar
          heading="퇴직금 가이드"
          items={퇴직금_SIDEBAR}
          currentSlug={currentSlug}
        />
      }
    >
      {/* 타이틀 */}
      <div style={{ marginBottom: 24 }}>
        <p style={{ ...body.badge, marginBottom: 8 }}>퇴직금 · 평균임금 · 근속연수</p>
        <h1 style={body.h1}>
          퇴직금 계산, 평균임금과 근속연수를 어떻게 적용하나요?
          <br />
          <span style={body.h1sub}>3개월 평균임금 산정부터 소수점 근속기간 계산까지</span>
        </h1>
      </div>

      {/* 인트로 */}
      <p style={body.prose}>
        퇴직금 계산에서 가장 많이 막히는 게 딱 두 가지예요. "3개월 평균임금에 상여금이 들어가나요?"와 "3년 5개월처럼 딱 안 떨어지는 기간은 어떻게 계산하나요?"예요. 이 두 가지만 해결하면 퇴직금 계산 공식은 어렵지 않아요.
      </p>
      <p style={body.prose}>
        법정 공식은 '1일 평균임금 × 30일 × 근속연수'예요.{" "}
        <a href="https://www.law.go.kr/법령/근로기준법" style={body.link} target="_blank" rel="noopener noreferrer">근로기준법 제2조</a>와{" "}
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={body.link} target="_blank" rel="noopener noreferrer">근로자퇴직급여보장법 제8조</a>에 명시된 기준이에요. 아래에서 각 항목을 어떻게 계산하는지 하나씩 풀어드릴게요.
      </p>

      <ArticleAd position="intro" />

      <Divider />

      {/* 섹션 1: 계산 공식 설명 */}
      <H2>퇴직금 법정 계산 공식, 세 가지 숫자가 전부예요</H2>

      <p style={body.prose}>
        퇴직금 계산에 필요한 숫자는 딱 셋이에요. 3개월 총임금, 3개월 총 일수, 근속연수예요. 이 셋을 구하면 공식에 대입하기만 하면 돼요. 복잡해 보여도 구조 자체는 단순해요.
      </p>

      <GreenBox>
        퇴직금 계산 공식 (근로자퇴직급여보장법 제8조){"\n"}
        ① 1일 평균임금 = 퇴직 전 3개월 총임금 ÷ 3개월 총 일수{"\n"}
        ② 퇴직금 = 1일 평균임금 × 30일 × 근속연수{"\n"}
        {"\n"}
        예시: 3개월 총임금 900만원, 91일, 근속 5년{"\n"}
        → 1일 평균임금: 9,000,000 ÷ 91 = 98,901원{"\n"}
        → 퇴직금: 98,901 × 30 × 5 = 약 1,484만원
      </GreenBox>

      <p style={body.prose}>
        '3개월 총임금'에는 기본급 외에 상여금도 포함돼요. 연간 상여금을 12로 나눠 월 환산 후 3을 곱한 금액이에요. 매월 지급되는 고정수당도 포함되지만, 출장비·실비변상처럼 업무 수행에 쓰이는 실비 항목은 제외해요.
      </p>

      <BorderBox>
        <strong>평균임금 포함 항목 (근로기준법 제2조)</strong>{"\n"}
        · 포함: 기본급, 직책수당, 가족수당, 연간 상여금 환산액, 고정 인센티브{"\n"}
        · 제외: 출장비, 실비변상 교통비, 비정기 특별상여금(지급 조건 없는 경우)
      </BorderBox>

      <p style={body.prose}>
        평균임금이 통상임금보다 낮게 계산될 때는 통상임금을 평균임금으로 쓸 수 있어요. 근로기준법 제2조 2항이 명시하는 내용이에요. 두 금액을 모두 계산해보고 더 높은 쪽으로 청구하면 돼요.
      </p>

      <Divider />

      {/* 섹션 2: 계산기 */}
      <H2>3개월 총임금과 근속기간을 넣으면 바로 계산돼요</H2>

      <p style={body.prose}>
        슬라이더를 움직여서 퇴직금 예상 금액을 확인해보세요. 3개월 총임금에는 상여금 환산액까지 포함해서 입력하면 더 정확해요. 계산기 결과는 법정 공식 기준이에요.
      </p>

      <SectionBadge>내 상황 먼저 확인해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="네 가지 다 해당되네요. 아래 계산기로 예상 퇴직금을 확인하고, 절차대로 직접 검증해보세요."
        partialMatchText="일부 상황에 해당돼요. 해당 항목부터 먼저 확인한 뒤 계산기를 써보세요."
      />

      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 상여금을 포함한 3개월 총임금을 기준으로 입력하세요. 정확한 계산은 고용노동부 퇴직금 계산기(moel.go.kr)를 이용하세요."
      />

      <p style={body.prose}>
        계산기에서 근속 기간을 늘릴수록 퇴직금이 비례해서 증가하는 걸 볼 수 있어요. 1년 더 다니면 1일 평균임금 × 30일만큼 퇴직금이 늘어나는 구조예요. 월급 300만원 기준이면 1년에 약 99만원씩 쌓이는 셈이에요.
      </p>

      <CategoryButton label="퇴직금 가이드" count={퇴직금_SIDEBAR.length} href="/w/퇴직금" />
      <RelatedArticles items={RELATED} />

      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3: 서류 */}
      <H2>계산에 필요한 서류 네 가지</H2>

      <p style={body.prose}>
        퇴직금을 직접 계산하거나 회사 계산값을 검증하려면 급여 관련 서류가 필요해요. 인사팀에 퇴직 전에 미리 요청해두는 게 좋아요. 퇴직 후에도 재발급이 가능하지만 시간이 걸릴 수 있어요.
      </p>

      <DocTable docs={DOCS} />

      <p style={body.prose}>
        급여명세서에 상여금이 따로 표기되지 않는 경우가 있어요. 그럴 때는 인사팀에 '연간 상여금 지급 내역'을 별도로 요청하면 돼요. 상여금 지급 내역이 없으면 평균임금 계산에서 상여금을 빠뜨리는 일이 생길 수 있어요.
      </p>

      <p style={body.prose}>
        IRP 계좌는 퇴직금 수령 전에 미리 개설해두세요. 퇴직금은 IRP로 입금된 후 수령하는 구조로 바뀌었어요. 은행이나 증권사 어디서든 개설할 수 있고, 개설 시간은 10분 내외예요.
      </p>

      <Divider />

      {/* 섹션 4: 절차 */}
      <H2>퇴직금 직접 계산하는 순서</H2>

      <p style={body.prose}>
        회사가 계산해준 금액이 맞는지 직접 검증해보고 싶을 때 아래 순서대로 따라가면 돼요. 계산기보다 정확하게 내 퇴직금이 얼마인지 파악할 수 있어요.
      </p>

      <Steps steps={STEPS} />

      <p style={body.prose}>
        근속연수 계산에서 소수점 처리가 중요해요. '3년 5개월'을 그냥 3.5로 쓰면 약간의 오차가 생겨요. 정확하게는 입사일부터 퇴직일 전날까지 총 일수를 세고 365로 나눠야 해요. 고용24 사이트에서 근속일수 계산 기능을 제공하고 있어요.
      </p>

      <p style={body.prose}>
        계산 결과가 회사 제시액과 5만원 이상 차이가 나면 인사팀에 재계산을 요청할 수 있어요. 회사가 거부하거나 14일을 넘겨도 지급하지 않으면{" "}
        <a href="/w/퇴직금-미지급" style={body.link}>고용노동부 진정 신청</a>이 가능해요. 퇴직금 청구권은 퇴직일로부터 3년이에요.
      </p>

      <Divider />

      {/* 섹션 5: 체크리스트 */}
      <H2>계산 전에 이 다섯 가지만 챙기세요</H2>

      <p style={body.prose}>
        퇴직금 계산에서 실수하는 지점은 거의 정해져 있어요. 상여금 빠뜨리기, 총 일수 대신 30일로 나누기, 소수점 근속기간 반올림 처리 등이에요. 아래 체크리스트를 보면서 하나씩 짚어보세요.
      </p>

      <Checklist items={CHECKLIST} />

      <GreenBox>
        계산 결과 검증 방법{"\n"}
        · 고용노동부 퇴직금 계산기(moel.go.kr)와 비교{"\n"}
        · 차이가 5만원 이상이면 인사팀에 재계산 요청{"\n"}
        · 1일 평균임금이 통상임금보다 낮으면 통상임금 기준으로 재계산
      </GreenBox>

      <p style={body.prose}>
        특히 통상임금 비교는 놓치기 쉬운 항목이에요. 3개월 평균임금이 낮게 나왔는데 그냥 넘어가면 손해예요. 통상임금으로 계산했을 때 더 높게 나오면 그 금액으로 청구할 권리가 있어요.
      </p>

      <Divider />

      {/* 섹션 6: FAQ */}
      <H2>자주 묻는 것들</H2>

      <p style={body.prose}>
        평균임금과 근속연수 계산에서 실제로 자주 나오는 질문만 골랐어요. 내 상황과 비슷한 케이스를 찾아보세요.
      </p>

      <FAQ items={FAQS} />

      <References groups={REFERENCES} />

      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법과 근로자퇴직급여보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니, 최신 기준은 고용노동부(moel.go.kr)나 관할 노동관서(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
