"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "회사에서 퇴직연금(DB형 또는 DC형)을 운용하고 있어요" },
  { id: "c2", label: "DC형이라면 현재 운용 지시를 직접 하고 있어요" },
  { id: "c3", label: "퇴직을 앞두고 있어서 수령 준비가 필요해요" },
  { id: "c4", label: "IRP 계좌가 아직 없어요 (300만원 초과 수령 예정)" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "현재 월 기본급", min: 200, max: 600, step: 50, defaultValue: 300, format: (v: number) => `${v}만원` },
  { id: "years", label: "예상 근속 기간", min: 1, max: 30, step: 1, defaultValue: 10, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "DB형 퇴직급여 (퇴직 시점 임금 기준)",
    getValue: (v: Record<string, number>) => v.salary * 10000 * v.years,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "DC형 적립 원금 (현재 임금 기준)",
    getValue: (v: Record<string, number>) => v.salary * 10000 * v.years,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원 (운용수익 별도)`,
  },
];

const DOCS = [
  { name: "퇴직연금 규약 (회사 제도 확인)", required: true, where: "회사 인사팀 또는 퇴직연금 금융기관" },
  { name: "퇴직연금 적립금 확인서", required: false, where: "금융기관 앱 또는 방문" },
  { name: "퇴직급여 수급 신청서", required: true, where: "금융기관 또는 회사 인사팀 (퇴직 시)" },
  { name: "IRP 계좌 개설 서류", required: false, where: "은행·증권사" },
];

const STEPS = [
  {
    title: "우리 회사 퇴직급여 제도 확인",
    desc: "법정 퇴직금, DB형(확정급여형), DC형(확정기여형) 중 어느 제도인지 인사팀에 확인해요. 중소기업은 법정 퇴직금, 대기업·중견기업은 DB형·DC형이 많아요. 제도에 따라 적립 방식과 수령 방법이 달라요.",
    tip: "인사팀에 '우리 회사 퇴직급여 유형'을 물어보세요",
  },
  {
    title: "DB형 vs DC형 장단점 비교",
    desc: "DB형은 퇴직 시점 임금 기준으로 계산해서 임금 인상률이 높으면 유리해요. DC형은 매년 연봉의 1/12이 적립되고 본인이 직접 운용해요. 임금 인상이 낮거나 ETF 투자로 수익을 올리면 DC형이 유리해요.",
    tip: "임금 인상률 높은 회사 = DB형 유리, 낮은 회사 = DC형 유리",
  },
  {
    title: "IRP 계좌 개설",
    desc: "IRP는 퇴직금·퇴직연금 수령 창구이면서 추가 납입도 가능한 계좌예요. 퇴직 시 퇴직급여가 자동으로 IRP로 이전돼요. 추가 납입하면 연 900만원 한도로 세액공제(16.5%)도 받을 수 있어요.",
    tip: "수수료가 낮은 증권사 IRP가 유리해요 (연 0.2~0.3%)",
  },
  {
    title: "수령 방식 선택",
    desc: "IRP에서 일시금으로 인출하거나 연금으로 나눠 받을 수 있어요. 55세 이후 연금으로 10년 이상 수령하면 퇴직소득세의 30%를 절감해요. 일시금 인출 시에는 퇴직소득세를 전액 납부해요.",
    tip: "연금 수령을 선택하면 절세와 노후 소득 두 가지 효과",
  },
];

const CHECKLIST = [
  "우리 회사 제도 확인: 법정퇴직금·DB형·DC형 중 어느 것인지",
  "DB형 = 퇴직 시점 임금 기준, DC형 = 매년 연봉÷12 적립",
  "DC형이라면 운용 지시 직접 관리: 방치하면 초저금리 상품 배정",
  "IRP 계좌: 수령 창구 + 세액공제 이중 활용",
  "연금 수령: 10년 이상 시 퇴직소득세 30% 절감",
];

const FAQS = [
  {
    q: "퇴직금과 퇴직연금은 뭐가 다른가요?",
    a: "퇴직금은 회사가 사내에 쌓아두다가 퇴직 시 지급하는 방식이에요. 퇴직연금(DB형·DC형)은 금융기관에 미리 적립해두는 방식이라 회사가 도산해도 내 돈이 안전해요.",
  },
  {
    q: "DB형과 DC형 중 어느 게 더 좋나요?",
    a: "상황에 따라 달라요. 임금이 꾸준히 오르는 회사라면 DB형이 유리해요. 임금 인상이 낮거나 ETF 직접 투자에 자신 있다면 DC형이 유리해요. 본인 회사 임금 인상률과 투자 성향을 함께 고려하세요.",
  },
  {
    q: "DC형이면 퇴직 시 회사가 따로 퇴직금을 주나요?",
    a: "안 줘요. DC형은 회사가 매년 연봉의 1/12을 퇴직연금 계좌에 적립해요. 퇴직 시 그 계좌 잔액이 퇴직급여예요. 운용 결과에 따라 원금보다 많거나 적을 수 있어요.",
  },
  {
    q: "IRP 계좌가 없으면 퇴직금을 못 받나요?",
    a: "300만원 초과 퇴직금은 IRP 계좌로만 수령할 수 있어요. IRP 계좌 없이는 지급이 지연돼요. 퇴직 전에 미리 개설해두는 게 좋아요.",
  },
  {
    q: "IRP 세액공제는 얼마나 받을 수 있나요?",
    a: "IRP + 연금저축 합산 연 900만원 한도로 세액공제를 받아요. 소득 5,500만원 이하면 16.5%, 초과면 13.2%예요. 연 300만원 납입 시 약 49만원 환급이에요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법: DB형·DC형·IRP 제도 규정", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부: 퇴직연금 제도 비교 안내", url: "https://www.moel.go.kr" },
      { label: "금융감독원: 퇴직연금 비교공시", url: "https://www.fss.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-DC형-계산법", title: "DC형 퇴직연금 계산 방법", description: "DC형 적립 구조와 수령 절차." },
  { slug: "db형-퇴직금-수령방법", title: "DB형 퇴직금 수령 방법", description: "DB형 적립 구조와 수령 절차." },
  { slug: "퇴직금-IRP-계좌", title: "IRP 계좌 개설 방법", description: "은행·증권사 비교와 개설 절차." },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-제도-종류" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 제도 · DB·DC·IRP</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금, 퇴직연금, IRP: 뭐가 다른가요?<br />
        DB형·DC형 비교부터 내게 유리한 제도 선택까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        입사나 이직 때 "DB형으로 할지, DC형으로 할지 선택하세요"라는 말을 들어본 적 있죠?
        퇴직금·퇴직연금·IRP는 이름은 비슷하지만 적립 방식과 수령액이 완전히 달라요.
        제도를 모르고 선택하면 수백만원 차이가 날 수 있어요.
        각 제도의 차이와 <a href="/w/퇴직금-IRP-계좌" style={{ color: "#1D9E75", textDecoration: "underline" }}>IRP 활용법</a>을 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>지금 내 상황에 맞는 제도인가요?</H2>
      <p style={body}>
        법정 퇴직금은 회사가 사내에 쌓아두다가 퇴직 시 지급해요. 회사가 도산하면 못 받을 위험이 있어요.
        퇴직연금(DB형·DC형)은 외부 금융기관에 적립해서 회사가 망해도 내 돈이 보호돼요.
      </p>
      <p style={body}>
        DC형이라면 본인이 직접 운용 지시를 해야 해요. 방치하면 기본 원리금보장형(초저금리)으로 배정돼요.
        매년 연봉의 1/12이 쌓이지만 운용을 안 하면 수익이 거의 없어요.
      </p>

      <GreenBox title="퇴직급여 3가지 제도 요약">
        법정 퇴직금: 회사 내부 적립 → 도산 시 위험<br />
        DB형: 금융기관 적립, 퇴직 시 임금 기준 확정 수령<br />
        DC형: 매년 1/12 적립, 운용 지시 직접 관리
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="퇴직연금 운용 중이에요. IRP 계좌를 미리 개설해두고 DC형이라면 운용 지시를 점검하세요."
        partialMatchText="상황이 다를 수 있어요. 인사팀에 우리 회사 퇴직급여 제도를 먼저 확인해보세요."
      />

      <Divider />

      <H2>DB형 vs DC형 예상 수령액 비교</H2>
      <p style={body}>
        DB형과 DC형의 원금은 현재 임금 기준으로 같아 보여요. 하지만 DB형은 퇴직 시점의 임금이 기준이라
        임금이 많이 오른다면 수령액이 더 커요. DC형은 운용 수익을 더하면 원금보다 훨씬 많이 받을 수도 있어요.
      </p>
      <p style={body}>
        아래 계산기는 현재 임금 기준 퇴직급여 원금이에요. DB형은 퇴직 시까지 임금 인상분이 더 반영되고,
        DC형은 여기에 운용 수익이 더해져요. 내 회사 임금 인상률과 투자 성향을 함께 고려해서 제도를 선택하세요.
      </p>

      <SectionBadge>DB형·DC형 원금 비교</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 현재 임금 기준 원금 비교. DB형은 퇴직 시점 임금 상승분 미반영. DC형은 운용수익 미포함."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>퇴직급여 수령에 필요한 서류</H2>
      <p style={body}>
        가장 중요한 건 우리 회사가 어떤 제도를 운용하는지 확인하는 퇴직연금 규약이에요.
        인사팀이나 퇴직연금 금융기관에 요청하면 받을 수 있어요.
      </p>
      <p style={body}>
        퇴직 전에 IRP 계좌를 미리 개설해두면 퇴직 당일 바로 퇴직급여가 이전돼요.
        IRP 계좌 없으면 300만원 초과 퇴직금 지급이 지연돼요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>퇴직급여 제도 활용 4단계</H2>
      <p style={body}>
        입사 시점부터 퇴직 후 수령까지 4단계가 있어요. 각 단계에서 놓치는 포인트가 있으면 수백만원 손해로 이어질 수 있어요.
        지금 어느 단계에 있는지 파악해두세요.
      </p>
      <p style={body}>
        특히 IRP 계좌는 퇴직 전에 반드시 개설해야 해요. 수수료가 낮은 증권사 IRP를 미리 열어두면
        절세와 수수료 절감을 동시에 챙길 수 있어요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>제도 선택 체크리스트</H2>
      <p style={body}>
        IRP 세액공제는 재직 중에도 납입할 수 있어요. 퇴직과 무관하게 절세 효과를 누릴 수 있으니,
        지금 당장 IRP를 열고 매달 조금씩 납입해도 손해가 없어요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="IRP 세액공제 최대 절세 금액">
        연 900만원 납입 × 16.5%(소득 5,500만원 이하) = 최대 148.5만원 환급<br />
        소득 5,500만원 초과라면 13.2% 적용, 최대 118.8만원<br />
        IRP와 연금저축 합산 한도예요
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직급여 제도에서 가장 많이 헷갈리는 질문들만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
