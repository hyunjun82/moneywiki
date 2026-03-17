"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직 후 14일이 지났는데 퇴직금을 못 받았어요" },
  { id: "c2", label: "회사가 지급 기한 연장을 요청했어요" },
  { id: "c3", label: "지급 기한 연장 동의서에 아직 서명하지 않았어요" },
  { id: "c4", label: "아직 퇴직한 지 3년이 지나지 않았어요" },
];

const CALC_SLIDERS = [
  { id: "amount", label: "미지급 퇴직금", min: 100, max: 5000, step: 50, defaultValue: 1000, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "days", label: "14일 초과 지연 일수", min: 1, max: 365, step: 1, defaultValue: 30, format: (v: number) => `${v}일` },
];

const CALC_RESULTS = [
  {
    label: "지연이자 (연 20% 기준)",
    getValue: (v: Record<string, number>) => Math.round(v.amount * 10000 * 0.2 / 365 * v.days),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "퇴직금 + 지연이자 합계",
    getValue: (v: Record<string, number>) => Math.round(v.amount * 10000 + v.amount * 10000 * 0.2 / 365 * v.days),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "지급기한 연장 동의서 (사전 서면 합의 시)", required: false, where: "회사에서 작성, 근로자 서명" },
  { name: "퇴직 확인서 또는 사직서", required: true, where: "회사 인사팀" },
  { name: "급여명세서 (최근 3개월)", required: true, where: "회사 인사팀" },
  { name: "근로계약서", required: false, where: "인사팀 또는 입사 시 수령본" },
];

const STEPS = [
  {
    title: "14일 기한 초과 여부 확인",
    desc: "퇴직금은 퇴직일로부터 14일 이내에 지급해야 해요(근로기준법 제36조). 14일을 넘기면 지연이자(연 20%)가 자동으로 발생해요. 날짜를 직접 계산해서 기한이 지났는지 먼저 확인하세요.",
    tip: "퇴직일 다음 날부터 14일째가 기한이에요",
  },
  {
    title: "연장 동의 여부 결정",
    desc: "회사가 지급 기한 연장을 요청할 수 있어요. 근로기준법 제36조는 사전에 합의하면 기한을 연장할 수 있다고 규정해요. 하지만 이 합의는 퇴직 전에 이뤄져야 하고, 사후 강요는 무효예요.",
    tip: "동의서에 서명 전 지연이자 포기 조항이 있는지 꼭 확인하세요",
  },
  {
    title: "지연이자 청구",
    desc: "14일 초과 시 지연이자(연 20%)를 청구할 수 있어요. 회사에 지연이자 포함 청구서를 내거나 고용노동부에 진정을 내면 돼요. 동의 없이 기한이 지났다면 지연이자 청구가 원칙이에요.",
    tip: "지연이자는 퇴직금과 별도로 청구해요",
  },
  {
    title: "미지급 퇴직금 신고",
    desc: "회사가 지급하지 않거나 지연이자를 거부하면 고용노동부(1350) 또는 관할 지방노동청에 진정을 낼 수 있어요. 소멸시효 3년 내에 신고하면 돼요.",
    tip: "진정 접수 후 보통 2~4주 내에 처리돼요",
  },
];

const CHECKLIST = [
  "14일 기한: 퇴직일 다음 날부터 14일째 자정까지",
  "연장 동의: 사전 합의만 유효, 사후 강요는 무효",
  "지연이자: 14일 초과분에 연 20% 자동 발생",
  "동의서 검토: 지연이자 포기 조항 없는지 확인",
  "미지급 신고: 고용노동부(1350), 소멸시효 3년 내",
];

const FAQS = [
  {
    q: "회사가 자금난을 이유로 연장을 요청하면 동의해야 하나요?",
    a: "동의 여부는 근로자가 결정할 수 있어요. 동의하지 않으면 14일 초과분부터 지연이자(연 20%)가 붙어요. 동의서에 서명할 때는 지연이자 포기 조항이 없는지 반드시 확인하세요.",
  },
  {
    q: "지급 기한 연장 동의서를 썼어도 지연이자를 받을 수 있나요?",
    a: "동의서에 지연이자 포기 문구가 없다면 청구 가능해요. 포기 문구가 있어도 사전 합의 없이 강요로 서명했다면 무효 주장이 가능해요.",
  },
  {
    q: "퇴직 후 14일이 지나도 못 받으면 어디에 신고하나요?",
    a: "고용노동부 고객상담센터(1350)에 전화하거나, 사업장 관할 지방노동청에 진정서를 제출하면 돼요. 고용노동부 홈페이지에서 온라인으로도 신고 가능해요.",
  },
  {
    q: "지연이자는 얼마나 되나요?",
    a: "연 20%예요. 1,000만원을 30일 늦게 받으면 약 16만원의 지연이자가 생겨요(1,000만 × 20% ÷ 365 × 30). 지급이 늦어질수록 금액이 커지니 빨리 청구하는 게 좋아요.",
  },
  {
    q: "퇴직금 지급 기한 소멸시효는 얼마인가요?",
    a: "3년이에요. 퇴직일로부터 3년 내에 청구해야 해요. 지연이자도 동일하게 3년 소멸시효가 적용돼요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제36조: 금품 청산 기한 14일", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로기준법 제37조: 지연이자 연 20%", url: "https://www.law.go.kr/법령/근로기준법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부: 퇴직금 지급 기준 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-지연이자", title: "퇴직금 지연이자 계산 방법", description: "연 20% 지연이자 계산법을 설명해요." },
  { slug: "퇴직금-지급-기한-연장-동의서", title: "지급 기한 연장 동의서", description: "서명 전 확인 사항과 거부 방법." },
  { slug: "퇴직금-지급-기한-초과", title: "지급 기한 초과 대응", description: "노동청 진정 절차를 단계별로 안내해요." },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-지급-기한-연장" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 지급기한 · 연장</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 지급 기한 연장, 동의해도 되나요?<br />
        연장 조건과 지연이자 청구 방법 정리
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금은 퇴직일로부터 14일 이내에 지급해야 해요(근로기준법 제36조).
        14일이 지나면 자동으로 <a href="/w/퇴직금-지연이자" style={{ color: "#1D9E75", textDecoration: "underline" }}>지연이자(연 20%)</a>가 붙어요.
        회사가 연장을 요청한다면 동의서 서명 전에 지연이자 포기 조항이 없는지 반드시 확인해야 해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>14일 기한, 정확히 어떻게 계산하나요?</H2>
      <p style={body}>
        퇴직일 다음 날부터 14일째 자정까지예요. 예를 들어 3월 1일에 퇴직했다면 3월 15일 자정이 기한이에요.
        공휴일이나 주말이 포함돼도 기한은 그대로예요. 기한을 넘기면 사용자는 지연이자까지 지급할 의무가 생겨요.
      </p>
      <p style={body}>
        회사가 자금 사정 등을 이유로 연장을 요청할 수 있어요. 근로자가 동의하면 지급 기한을 늦출 수 있지만,
        이 합의는 퇴직 전에 이뤄져야 해요. 강요나 사후 합의는 무효예요.
      </p>

      <GreenBox title="14일 기한 초과 시 지연이자">
        퇴직일로부터 14일 초과 → 연 20% 지연이자 자동 발생<br />
        예: 1,000만원 × 20% ÷ 365 × 30일 = 약 16만원<br />
        소멸시효: 퇴직일로부터 3년
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="지연이자 청구가 가능한 상황이에요. 아래 계산기로 지연이자를 계산해보세요."
        partialMatchText="상황에 따라 다를 수 있어요. 고용노동부(1350) 상담을 권해요."
      />

      <Divider />

      <H2>지연이자 계산해보세요</H2>
      <p style={body}>
        미지급 퇴직금과 14일 초과 지연 일수를 입력하면 지연이자와 합계 금액을 바로 확인할 수 있어요.
        지급이 늦어질수록 금액이 커지니 빨리 청구하는 게 유리해요.
      </p>

      <SectionBadge>퇴직금 지연이자 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 근로기준법 제37조 기준 연 20%. 14일 초과분부터 적용되며 소멸시효 3년이에요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>청구에 필요한 서류</H2>
      <p style={body}>
        지연이자 청구 시 퇴직 확인서와 급여명세서로 퇴직금 기준을 입증해야 해요.
        노동청 진정 시에도 동일한 서류가 필요해요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>지급 기한 연장 대응 4단계</H2>
      <p style={body}>
        14일 초과 확인 → 연장 동의 여부 결정 → 지연이자 청구 → 필요 시 노동청 신고 순서예요.
        대부분은 청구 단계에서 해결돼요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>지급 기한 연장 체크리스트</H2>
      <p style={body}>
        동의서 서명 전 지연이자 포기 조항을 반드시 확인하세요.
        한 번 서명하면 이자를 포기한 것으로 볼 수 있어요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="지연이자는 포기하지 마세요">
        동의서에 지연이자 포기 문구가 없다면 14일 초과분에 대해 연 20% 청구가 가능해요.<br />
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
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
