"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "매일 정해진 시간에 출퇴근했어요" },
  { id: "c2", label: "업무 지시를 사용자에게 받았어요" },
  { id: "c3", label: "다른 클라이언트 없이 한 곳에서만 일했어요" },
  { id: "c4", label: "급여가 매월 정기적으로 지급됐어요" },
];

const CALC_SLIDERS = [
  { id: "monthly", label: "월 수입", min: 150, max: 500, step: 10, defaultValue: 250, format: (v: number) => `${v}만원` },
  { id: "months", label: "근무기간", min: 12, max: 60, step: 1, defaultValue: 24, format: (v: number) => `${Math.floor(v / 12)}년 ${v % 12}개월` },
];

const CALC_RESULTS = [
  {
    label: "근로자 인정 시 퇴직금",
    getValue: (v: Record<string, number>) => Math.round(v.monthly * 10000 * (v.months / 12)),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "월 수입 기준 월급",
    getValue: (v: Record<string, number>) => v.monthly * 10000,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "업무계약서", required: true, where: "계약 시 수령 · 없다면 이메일·메시지 내역으로 대체" },
  { name: "급여 이체 내역", required: true, where: "은행 앱 출력 · 매월 고정 지급 내역" },
  { name: "업무지시서·메시지", required: true, where: "이메일·카카오톡 — 업무 지시, 출근 요청 내용" },
  { name: "출퇴근 기록", required: false, where: "출퇴근 앱·사무실 출입카드·사진 등" },
];

const STEPS = [
  {
    title: "근로자성 요건 확인",
    desc: "출퇴근 시간이 정해져 있었는지, 업무 지시를 받았는지, 한 곳에서만 전속적으로 일했는지 따져보세요. 이 요소들이 많이 해당될수록 근로자성이 인정될 가능성이 높아요.",
    tip: "4대보험 미가입이나 3.3% 원천징수는 근로자성을 부정하는 결정적 이유가 아니에요",
  },
  {
    title: "증빙 수집",
    desc: "업무 지시 이메일·카카오톡, 출퇴근 기록, 급여 이체 내역, 업무계약서를 모두 확보해두세요. 근로자성을 입증하는 데 가장 중요한 단계예요.",
    tip: "퇴사 후에는 자료 접근이 막힐 수 있으니 재직 중에 저장해두세요",
  },
  {
    title: "고용노동부(1350) 진정 접수",
    desc: "사용자가 퇴직금 지급을 거부하면 고용노동부 민원마당에서 온라인으로 진정을 접수하세요. 근로감독관이 근로자성을 포함해 전반적인 사실관계를 조사해요.",
    tip: "minwon.moel.go.kr → 임금체불 진정",
  },
  {
    title: "노동위원회·법원 판단",
    desc: "고용노동부 조사 결과에 이의가 있거나 사용자가 불복하면 노동위원회 또는 법원으로 넘어가요. 근로자성 판단은 종합적 사실 기준이라 증거가 많을수록 유리해요.",
    tip: "법률구조공단(132)에서 무료 법률 상담을 받을 수 있어요",
  },
];

const CHECKLIST = [
  "업무계약서 또는 이메일 계약 내용 — 업무 지시 구조 확인",
  "급여 이체 내역 — 매월 고정 지급 여부 증빙",
  "업무 지시 카카오톡·이메일 — 사용종속관계 입증",
  "출퇴근 기록·사무실 출입 이력 — 근무 장소·시간 고정 여부",
  "한 곳에서만 일했다는 증빙 — 전속성 입증 용도",
];

const FAQS = [
  {
    q: "3.3% 원천징수를 받으면 퇴직금을 못 받나요?",
    a: "3.3% 원천징수(사업소득세)를 받았다고 해서 퇴직금이 무조건 안 되는 건 아니에요. 계약 형식이 아니라 실질적 근로관계가 기준이죠. 출퇴근 관리, 업무 지시, 전속성 등이 인정되면 근로자로 볼 수 있어요.",
  },
  {
    q: "프리랜서 계약서에 '퇴직금 없음'이라고 돼 있으면 어떻게 하나요?",
    a: "계약서에 뭐라고 적혀 있든 실질적으로 근로자에 해당하면 퇴직금은 법적 의무예요. 근로자성이 인정되면 '퇴직금 없음' 조항은 무효가 되죠.",
  },
  {
    q: "프리랜서로 5년 넘게 일했는데 근로자성이 인정되면 퇴직금을 받을 수 있나요?",
    a: "근로자성이 인정되면 계속 근로 기간 전체에 대해 퇴직금을 청구할 수 있어요. 다만 소멸시효 3년이 적용되니, 퇴직일로부터 3년 이내에 청구해야 하죠.",
  },
  {
    q: "근로자성 판단은 누가 하나요?",
    a: "고용노동부 근로감독관이 1차적으로 판단하고, 분쟁이 생기면 노동위원회나 법원에서 최종 판단해요. 사실관계를 종합적으로 검토하죠.",
  },
  {
    q: "프리랜서가 퇴직금을 청구하려면 어떤 증거가 필요한가요?",
    a: "출퇴근 기록, 업무 지시 내용(메일·카톡), 급여 이체 내역, 근무 장소 사진 등이 필요해요. 근로자성을 입증하는 게 핵심이니까, 일할 때부터 자료를 모아두는 게 좋죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제2조 — 근로자의 정의", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로자퇴직급여 보장법", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 — 근로자성 판단 기준", url: "https://www.moel.go.kr" },
      { label: "고용노동부 민원마당 — 임금체불 진정", url: "https://minwon.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-조건",
    title: "퇴직금 받을 수 있는 조건",
    description: "고용형태별 퇴직금 발생 조건을 정리했어요.",
  },
  {
    slug: "퇴직금-지급-기준",
    title: "퇴직금 지급 기준 1년",
    description: "1년 기준이 왜 중요한지, 예외 케이스까지 정리했어요.",
  },
  {
    slug: "계약직-퇴직금",
    title: "계약직 퇴직금 조건부터 신청까지",
    description: "계약직도 정규직과 동일하게 퇴직금을 받을 수 있어요.",
  },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="프리랜서-퇴직금-지급기준" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 프리랜서 · 근로자성</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        프리랜서도 퇴직금을 받을 수 있나요?<br />
        근로자성 판단부터 청구 방법까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "프리랜서니까 퇴직금은 없다"는 말, 무조건 맞는 건 아니에요.
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법</a>은 계약 형식이 아니라 실질적인 근로관계를 기준으로 근로자 여부를 판단해요.
        프리랜서 계약서를 썼어도 출퇴근 관리를 받고, 업무 지시를 따르며, 전속적으로 일했다면 근로자로 인정받을 수 있어요.
        근로자성이 인정되면 <a href="/w/퇴직금-조건" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금</a>도 당연히 발생하죠.
        어떤 경우에 해당하는지, 어떻게 청구하는지 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>프리랜서가 퇴직금을 받을 수 있는 조건</H2>
      <p style={body}>
        핵심은 '프리랜서'라는 명칭이 아니라, 실질적으로 근로자에 해당하느냐 여부예요.
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제2조</a>는 "임금을 목적으로 사업이나 사업장에 근로를 제공하는 사람"을 근로자로 정의해요.
      </p>
      <p style={body}>
        회사가 형식적으로 프리랜서 계약서를 쓰게 했어도, 출퇴근 시간을 정하고 업무 지시를 내리며 전속적으로 일하게 했다면 실질적 근로관계가 성립돼요.
        4대보험 미가입이나 3.3% 원천징수는 근로자성을 부정하는 결정적 이유가 아니에요.
      </p>

      <GreenBox title="프리랜서 퇴직금 핵심">
        계약 형식(프리랜서)이 아니라 <strong>근로 실태</strong>가 기준이에요<br />
        출퇴근 관리 + 업무 지시 + 전속성 → 근로자성 인정 가능<br />
        근로자성 인정 + 1년 이상 근무 → <strong>퇴직금 발생</strong>
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="근로자성이 인정될 가능성이 높아요. 고용노동부(1350)에 상담을 받아보세요."
        partialMatchText="일부만 해당돼요. 근로자성 판단은 종합적으로 이루어지니, 전문 상담을 받아보는 게 좋아요."
      />

      <Divider />

      <H2>근로자 인정 시 퇴직금, 얼마나 나올까?</H2>
      <p style={body}>
        근로자성이 인정되면 일반 퇴직금 공식이 그대로 적용돼요.
        <strong>월 평균임금 × 근속연수</strong>예요.
        아래에서 월 수입과 근무기간을 조절해보세요.
      </p>
      <p style={body}>
        이 금액은 근로자성이 인정된 경우에만 해당돼요.
        인정 여부는 고용노동부 또는 법원이 판단하죠.
      </p>

      <SectionBadge>프리랜서 퇴직금 계산기 (근로자 인정 시)</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 근로자성이 인정된 경우에만 해당돼요. 실제 인정 여부는 고용노동부·법원이 판단해요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>퇴직금 청구 시 필요한 서류</H2>
      <p style={body}>
        프리랜서 퇴직금 청구에서 가장 중요한 건 근로자성을 입증하는 자료예요.
        재직 중에 아래 서류를 미리 저장해두세요. 퇴사 후에는 접근이 막힐 수 있어요.
      </p>

      <SectionBadge>준비 서류</SectionBadge>
      <DocTable docs={DOCS} />

      <BorderBox title="근로자성 판단 7대 기준">
        1. 업무 내용을 사용자가 정하는가<br />
        2. 취업규칙·복무규정 적용을 받는가<br />
        3. 업무 수행 시 지휘·감독을 받는가<br />
        4. 근무 시간·장소가 지정돼 있는가<br />
        5. 비품·도구를 사용자가 제공하는가<br />
        6. 본인 대신 다른 사람을 보낼 수 있는가<br />
        7. 보수가 근로의 대가인가
      </BorderBox>

      <Divider />

      <H2>퇴직금 청구 절차</H2>
      <p style={body}>
        사용자가 "프리랜서니까 퇴직금 의무 없다"고 버티면 고용노동부 진정이 가장 효과적이에요.
        무료이고, 근로감독관 조사 결과에 강제력이 있어요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>청구 전 준비 체크리스트</H2>
      <p style={body}>
        퇴사 후에는 자료 수집이 어려워져요.
        일하는 동안 꾸준히 모아두는 게 가장 확실한 방법이에요.
      </p>

      <SectionBadge>준비 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="소멸시효는 퇴직일로부터 3년">
        퇴직금 청구권은 퇴직일로부터 3년 이내에 행사해야 해요.
        근로자성 인정에 시간이 걸리더라도 3년 이내라면 법적으로 청구할 수 있어요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        프리랜서 퇴직금 지급 기준에 대해 자주 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법과 대법원 판례를 바탕으로 작성됐어요. 개별 사안에 따라 결과가 달라질 수 있으니 전문 상담을 받아보세요." />
    </ArticleLayout>
  );
}
