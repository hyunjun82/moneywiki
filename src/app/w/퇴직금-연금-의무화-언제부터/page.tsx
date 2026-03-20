"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR, 퇴직금_HIGHLIGHT } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "2022년 4월 14일 이후에 사업을 시작(신설)했어요" },
  { id: "c2", label: "상시 근로자가 1명 이상 있는 사업장이에요" },
  { id: "c3", label: "퇴직연금 제도(DB형·DC형·IRP)를 아직 도입하지 않았어요" },
  { id: "c4", label: "근로자에게 퇴직금 또는 퇴직연금을 지급할 의무가 있어요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "월 평균임금", min: 200, max: 700, step: 10, defaultValue: 300, format: (v: number) => `${v}만원` },
  { id: "years", label: "근속 기간", min: 1, max: 35, step: 1, defaultValue: 5, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "퇴직급여 예상액 (법정 기준)",
    getValue: (v: Record<string, number>) => Math.round(v.salary * 10000 * v.years),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "DC형 연간 부담금 (1/12 적립 기준)",
    getValue: (v: Record<string, number>) => Math.round(v.salary * 10000 * 12 / 12),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원/년`,
  },
];

const DOCS = [
  { name: "퇴직연금 규약 (표준 규약 또는 자체 작성)", required: true, where: "고용노동부 표준 규약 활용 가능" },
  { name: "근로자 동의서 (과반수 대표 동의)", required: true, where: "사업장 자체 작성" },
  { name: "사업자등록증 사본", required: true, where: "세무서 또는 홈택스 발급" },
  { name: "근로자 명부 (재직자 현황)", required: true, where: "사업장 자체 작성" },
  { name: "표준근로계약서", required: false, where: "고용노동부 서식 활용" },
];

const STEPS = [
  {
    title: "퇴직연금 유형 선택 (DB형·DC형)",
    desc: "DB형(확정급여형)은 퇴직 시 받을 금액이 정해져 있어요. DC형(확정기여형)은 매년 임금의 1/12 이상을 납입하는 방식이에요. 신설 사업장은 두 가지 중 하나를 골라야 해요.",
    tip: "DC형이 도입·관리가 간편해서 소규모 사업장에 많이 쓰여요",
  },
  {
    title: "금융기관 선택 및 규약 작성",
    desc: "은행·보험사·증권사 중 퇴직연금 사업자를 선택해요. 금융기관에서 표준 규약 양식을 받아 작성하고, 근로자 과반수의 동의를 받아야 해요.",
    tip: "수수료와 운용상품 종류를 비교해서 선택하는 게 유리해요",
  },
  {
    title: "고용노동부 신고",
    desc: "작성된 규약을 고용노동부에 신고해요. 온라인(퇴직연금 포털) 또는 관할 지방고용노동청에 직접 제출할 수 있어요. 신고 수리 후 제도가 공식 시행돼요.",
    link: { label: "퇴직연금 포털 신고하기", href: "https://pension.moel.go.kr" },
    tip: "신고 완료까지 보통 2~4주 걸려요",
  },
  {
    title: "부담금 납입 시작",
    desc: "DC형은 매년 1회 이상, 연간 임금총액의 1/12 이상을 납입해야 해요. DB형은 금융기관과 협의한 일정에 따라 부담금을 적립해요. 늦게 납입하면 지연이자(연 20%)가 발생할 수 있어요.",
    tip: "DC형 부담금을 월 단위로 나눠 납입하면 자금 관리가 편해요",
  },
];

const CHECKLIST = [
  "2022년 4월 14일 이후 신설 사업장: 퇴직연금 의무 도입 대상",
  "기존 사업장(2022년 이전 설립): 현재 임의 선택, 단계적 의무화 논의 중",
  "DB형·DC형 중 하나 선택: 소규모 사업장엔 DC형이 실용적",
  "금융기관 수수료·운용상품 비교 후 선택",
  "근로자 과반수 동의 확보 후 규약 신고",
  "납입 지연 시 연 20% 지연이자 발생 주의",
];

const FAQS = [
  {
    q: "퇴직연금 의무화가 정확히 언제부터인가요?",
    a: "2022년 4월 14일 이후 신설된 사업장은 설립 시점부터 퇴직연금을 의무로 도입해야 해요. 근로자퇴직급여보장법 제4조 개정으로 시행됐어요. 이전에 설립된 기존 사업장은 현재 임의 가입 대상이에요.",
  },
  {
    q: "기존 사업장은 언제부터 의무가 되나요?",
    a: "아직 확정된 시행일이 없어요. 정부가 단계적 의무화를 추진 중이지만, 2026년 현재까지 기존 사업장에 대한 구체적인 시행 일정은 미정이에요. 법령 개정 논의가 진행 중이에요.",
  },
  {
    q: "직원이 1명뿐인데도 퇴직연금을 도입해야 하나요?",
    a: "2022년 4월 14일 이후 신설된 사업장이라면 상시 근로자 1명 이상이면 의무 대상이에요. 다만 계속근로 1년 미만 근로자나 주 15시간 미만 단시간 근로자는 퇴직급여 지급 의무 자체가 없어요.",
  },
  {
    q: "DB형과 DC형 중 어떤 걸 선택해야 하나요?",
    a: "DB형은 퇴직 시 받는 금액이 정해져 있어서 장기 근속자에게 유리해요. DC형은 매년 임금의 1/12를 적립하는 구조로 중도 퇴직이 잦은 사업장에 유리해요. 소규모 신설 사업장은 대부분 DC형을 선택해요.",
  },
  {
    q: "퇴직연금을 안 도입하면 어떻게 되나요?",
    a: "신설 사업장이 퇴직연금을 도입하지 않으면 근로자퇴직급여보장법 위반이에요. 고용노동부 감독 시 시정 명령이 내려지고, 반복 위반 시 과태료가 부과될 수 있어요. 퇴직금으로 대신 지급하는 건 신설 사업장엔 허용되지 않아요.",
  },
  {
    q: "퇴직연금 도입 후 퇴직금 제도로 다시 바꿀 수 있나요?",
    a: "신설 사업장은 불가해요. 2022년 4월 14일 이후 설립된 사업장은 처음부터 퇴직연금만 가능해요. 기존 사업장은 퇴직연금으로 전환 후 일정 요건 하에 퇴직금으로 환원이 가능하지만, 복잡한 절차가 필요해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 제4조: 퇴직급여제도 설정 의무", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부: 퇴직연금 의무화 안내", url: "https://www.moel.go.kr" },
      { label: "퇴직연금 종합안내 포털", url: "https://pension.moel.go.kr" },
      { label: "금융감독원: 퇴직연금 비교공시", url: "https://www.fss.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-제도-종류", title: "퇴직금 제도 종류 비교", description: "DB형·DC형·IRP 차이와 선택 기준." },
  { slug: "퇴직금-irp-의무", title: "IRP 의무 가입 대상", description: "퇴직금 300만원 초과 시 IRP 의무 수령." },
  { slug: "db형-퇴직금-수령방법", title: "DB형 퇴직금 수령 방법", description: "확정급여형 퇴직연금 수령 절차." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} highlightSlugs={퇴직금_HIGHLIGHT} currentSlug="퇴직금-연금-의무화-언제부터" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 퇴직연금 · 의무화 시행일</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직연금 의무화, 우리 사업장도 해야 하나요?<br />
        신설·기존 사업장 적용 시기와 도입 조건
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        2022년 4월 14일부터 새로 설립된 사업장은 <a href="/w/퇴직금-제도-종류" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직연금</a>을 의무로 도입해야 해요.
        이전에 문을 연 기존 사업장은 아직 임의 가입 대상이지만, 단계적 의무화가 논의 중이에요.
        신설 사업장인지 기존 사업장인지에 따라 적용 시점과 절차가 달라지니, 먼저 설립 시점을 확인하세요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>퇴직연금 의무화, 우리 사업장이 해당되나요?</H2>
      <p style={body}>
        핵심 기준은 사업장 설립 시점이에요.
        2022년 4월 14일 이후에 새로 설립된 사업장은 처음부터 <a href="/w/퇴직금-제도-종류" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직연금(DB형 또는 DC형)</a>을 도입해야 해요.
        퇴직금 제도는 선택할 수 없어요.
      </p>
      <p style={body}>
        반면 2022년 4월 13일 이전에 설립된 기존 사업장은 현재까지 퇴직연금 또는 퇴직금 중 선택할 수 있어요.
        정부가 단계적 의무화를 추진 중이지만, 2026년 현재 기존 사업장에 대한 구체적인 의무화 시행일은 아직 확정되지 않았어요.
      </p>

      <GreenBox>
        신설 사업장(2022.4.14 이후 설립): 퇴직연금 의무 도입<br />
        기존 사업장(2022.4.13 이전 설립): 현재 임의 선택 (단계적 의무화 논의 중)<br />
        법적 근거: 근로자퇴직급여보장법 제4조 (2022년 4월 14일 시행)
      </GreenBox>

      <SectionBadge>우리 사업장 해당 여부 체크</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="퇴직연금 의무 도입 대상 사업장이에요. 아래 절차에 따라 도입하세요."
        partialMatchText="조건이 일부 다를 수 있어요. 고용노동부(1350) 또는 퇴직연금 포털에서 상담을 권해요."
      />

      <Divider />

      <H2>퇴직급여 예상액과 연간 부담금 계산</H2>
      <p style={body}>
        DC형 퇴직연금을 도입하면 매년 근로자 임금의 1/12 이상을 납입해야 해요.
        월 평균임금과 근속 기간을 입력하면 퇴직 시 받게 될 총 퇴직급여와 사업주가 매년 부담해야 할 금액을 확인할 수 있어요.
      </p>

      <SectionBadge>퇴직급여·부담금 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 법정 최저 기준이에요. 상여금·수당을 포함한 연간 임금총액 기준으로 계산하면 더 정확해요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>퇴직연금 도입 시 준비 서류</H2>
      <p style={body}>
        금융기관을 선택한 뒤 규약을 작성하고, 근로자 동의를 받아 고용노동부에 신고해요.
        서류가 미비하면 신고 수리가 지연되니 아래 목록을 미리 챙기세요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>퇴직연금 도입 절차 4단계</H2>
      <p style={body}>
        유형 선택부터 첫 납입까지 보통 3~6주 정도 걸려요.
        금융기관 선택이 가장 중요한 단계예요.
        수수료와 운용상품을 비교하는 데 시간을 충분히 써야 나중에 후회가 없어요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>도입 전 꼭 챙겨야 할 사항</H2>
      <p style={body}>
        신설 사업장이 퇴직연금을 늦게 도입하면 법 위반이에요. 첫 직원 채용 전에 제도를 먼저 갖춰두세요.
        기존 사업장도 자발적으로 도입하면 세제 혜택을 받을 수 있어요.
      </p>

      <SectionBadge>도입 전 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        DC형 부담금은 전액 손비(비용) 처리돼서 법인세·소득세 절감 효과가 있어요.<br />
        근로자도 퇴직연금 계좌 안에서 운용 수익이 쌓이는 동안 세금이 없어요(과세 이연).
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직연금 의무화와 도입 방법에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법을 바탕으로 작성됐어요. 기존 사업장 의무화 시행일은 아직 미확정이에요. 최신 기준은 고용노동부(1350) 또는 퇴직연금 포털(pension.moel.go.kr)에서 확인하세요." />
    </ArticleLayout>
  );
}
