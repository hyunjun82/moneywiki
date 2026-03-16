"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직 후 실업급여와 퇴직금을 동시에 신청할 계획이에요" },
  { id: "c2", label: "퇴직금 수령이 실업급여에 영향을 주는지 궁금해요" },
  { id: "c3", label: "자진 퇴사인지 권고사직인지에 따라 달라진다고 들었어요" },
  { id: "c4", label: "두 가지 동시 수령이 가능한지 확인하고 싶어요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "퇴직 전 평균임금 (일급)", min: 5, max: 30, step: 1, defaultValue: 10, format: (v: number) => `${v}만원/일` },
  { id: "months", label: "고용보험 가입 기간", min: 6, max: 120, step: 1, defaultValue: 24, format: (v: number) => `${v}개월` },
];

const CALC_RESULTS = [
  {
    label: "실업급여 1일 지급액 (평균임금 60%)",
    getValue: (v: Record<string, number>) => Math.round(v.salary * 10000 * 0.6),
    format: (v: number) => `약 ${Math.round(v / 10000 * 10) / 10}만원/일`,
    highlight: true,
  },
  {
    label: "예상 수급 기간 (가입 24~36개월 기준)",
    getValue: (v: Record<string, number>) => {
      if (v.months < 12) return 120;
      if (v.months < 36) return 150;
      if (v.months < 60) return 180;
      if (v.months < 120) return 210;
      return 240;
    },
    format: (v: number) => `최대 ${v}일`,
  },
];

const DOCS = [
  { name: "이직확인서 (고용보험 피보험자 확인)", required: true, where: "회사 인사팀 요청 또는 고용24" },
  { name: "퇴직금 수령 확인서 (IRP 입금 내역)", required: false, where: "IRP 가입 금융사" },
  { name: "신분증", required: true, where: "본인 지참" },
  { name: "통장 사본 (실업급여 지급 계좌)", required: true, where: "본인 소유 통장" },
];

const STEPS = [
  {
    title: "퇴직금과 실업급여 동시 신청 가능 여부 확인",
    desc: "퇴직금과 실업급여는 별개의 제도예요. 퇴직금 수령 여부와 상관없이 실업급여 수급 자격을 충족하면 동시에 받을 수 있어요. 단, 실업급여는 비자발적 이직(권고사직·계약만료 등)이 원칙이에요.",
    tip: "자진 퇴사는 원칙적으로 실업급여 불가 — 예외 사유 있으면 고용센터 상담",
  },
  {
    title: "퇴직금 수령",
    desc: "퇴직일로부터 14일 이내에 퇴직금을 받아야 해요. 300만원 초과 시 IRP 계좌로 수령해요. 퇴직금 수령 시기는 실업급여 수급 기간과 무관해요. IRP 계좌를 미리 개설해두면 이체가 빠르게 처리돼요.",
    tip: "IRP 계좌번호를 인사팀에 메일·문자로 알려주세요",
  },
  {
    title: "실업급여 신청",
    desc: "퇴직 다음 날부터 고용센터에 구직 등록하고 수급 신청해요. 신청 기한은 퇴직 후 12개월이에요. 이 기간이 지나면 남은 수급 일수를 소멸시켜요. 고용24(work.go.kr)에서 온라인 신청도 가능해요.",
    tip: "퇴직 직후 바로 신청하는 게 수급 기간을 최대로 확보하는 방법이에요",
  },
  {
    title: "구직 활동 및 수급",
    desc: "실업급여 수급 중에는 4주에 1회 이상 구직활동을 증명해야 해요. 취업하면 실업급여는 종료되고, 남은 수급 기간에 따라 조기 취업 수당이 나오기도 해요. 퇴직금은 이미 받은 금액이라 실업급여 수급에 영향 없어요.",
    tip: "구직활동 증명은 입사지원, 면접, 직업훈련 등으로 해요",
  },
];

const CHECKLIST = [
  "퇴직금과 실업급여는 별개 — 동시 수령 가능",
  "실업급여 조건 — 비자발적 이직, 고용보험 180일 이상",
  "실업급여 신청 기한 — 퇴직 후 12개월 이내",
  "퇴직금 — 300만원 초과 시 IRP로 수령, 14일 이내",
  "구직활동 — 4주 1회 이상 증명 필수",
];

const FAQS = [
  {
    q: "퇴직금을 받으면 실업급여가 줄어드나요?",
    a: "아니에요. 퇴직금은 실업급여 계산에 전혀 영향을 주지 않아요. 퇴직금과 실업급여는 전혀 다른 제도라서 퇴직금을 많이 받아도 실업급여는 그대로예요.",
  },
  {
    q: "퇴직금 수령 시점이 실업급여 수급과 겹쳐도 되나요?",
    a: "돼요. 퇴직금은 퇴직 후 14일 이내에 받고, 실업급여는 고용센터에 신청하는 별개의 절차예요. 같은 기간에 퇴직금을 받으면서 실업급여를 수급해도 법적으로 아무 문제 없어요.",
  },
  {
    q: "자진 퇴사면 실업급여를 못 받는 건가요?",
    a: "원칙적으로 그래요. 하지만 임금 미지급, 직장 내 괴롭힘, 건강 악화, 회사 이전 등 정당한 사유가 있으면 자진 퇴사도 실업급여를 받을 수 있어요. 고용센터에서 사유를 확인받아야 해요.",
  },
  {
    q: "퇴직금이 많으면 실업급여 신청이 제한되나요?",
    a: "아니에요. 퇴직금 금액과 실업급여 수급 자격은 무관해요. 실업급여 수급 조건은 고용보험 가입 기간, 이직 사유, 구직 의사예요.",
  },
  {
    q: "실업급여 신청 기한이 얼마인가요?",
    a: "퇴직 후 12개월이에요. 이 기간 안에 신청을 해야 남은 수급 일수를 받을 수 있어요. 12개월이 지나면 남은 수급 기간은 소멸해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법 제40조 — 실업급여 수급 요건", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "근로자퇴직급여보장법 제8조 — 퇴직금 지급 기준", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 — 실업급여 수급 안내", url: "https://www.moel.go.kr" },
      { label: "고용24 — 실업급여 신청", url: "https://www.work.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-수령방법", title: "퇴직금 수령 방법 정리", description: "IRP 이체부터 일시금 수령까지 절차 안내." },
  { slug: "퇴직금-IRP-계좌", title: "IRP 계좌 개설 방법", description: "어느 금융사에서 만들지 수수료 비교." },
  { slug: "퇴직금-조건", title: "퇴직금 지급 조건 정리", description: "퇴직금 받을 수 있는 기준을 설명해요." },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="실업급여-퇴직금" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 실업급여 · 동시수령</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 받으면 실업급여가 줄어드나요?<br />
        두 가지 동시 수령 가능 여부와 신청 절차
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금과 실업급여는 별개의 제도라서 동시에 받아도 돼요.
        퇴직금을 많이 받아도 실업급여 금액이나 기간에 영향을 주지 않아요.
        실업급여는 고용보험 가입 기간과 이직 사유(비자발적)가 핵심이고, <a href="/w/퇴직금-수령방법" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 수령</a> 시기와는 무관해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>퇴직금과 실업급여, 함께 받을 수 있나요?</H2>
      <p style={body}>
        퇴직금은 근로기준법·퇴직급여보장법으로 지급되는 근로자 권리예요.
        실업급여는 고용보험법에 따라 지급되는 별개의 사회보험 급여예요.
        두 제도는 재원도, 조건도 완전히 달라서 퇴직금 수령이 실업급여를 막거나 줄이지 않아요.
      </p>
      <p style={body}>
        실업급여를 받으려면 비자발적 이직(권고사직·계약만료 등)과 고용보험 180일 이상 가입이 핵심 조건이에요.
        자진 퇴사라면 임금 미지급·직장 내 괴롭힘 등 정당 사유가 있어야 실업급여 수급이 가능해요.
      </p>

      <GreenBox title="퇴직금 vs 실업급여 핵심 차이">
        퇴직금: 고용주가 지급, 퇴직 후 14일 이내, 근속 기간 기준<br />
        실업급여: 고용보험에서 지급, 퇴직 후 12개월 내 신청, 구직활동 조건<br />
        두 제도 완전 독립 → 퇴직금 수령이 실업급여에 영향 없음
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="퇴직금과 실업급여를 동시에 받을 수 있어요. 아래에서 실업급여 예상액을 확인해보세요."
        partialMatchText="실업급여 수급 조건 충족 여부를 고용센터(1350)에서 먼저 확인하세요."
      />

      <Divider />

      <H2>실업급여 예상 금액 계산</H2>
      <p style={body}>
        퇴직 전 일 평균임금과 고용보험 가입 기간을 입력하면 실업급여 1일 지급액과 수급 기간을 확인할 수 있어요.
        실업급여 하한액은 최저임금의 80% 수준이에요.
      </p>

      <SectionBadge>실업급여 예상액 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 평균임금 60% 기준. 하한액 적용(최저임금 80%)으로 실제 금액은 더 높을 수 있어요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>신청에 필요한 서류</H2>
      <p style={body}>
        이직확인서는 회사가 고용센터에 제출해야 하는 서류예요.
        회사가 제출을 미루면 고용24에서 직접 발급 요청할 수 있어요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>퇴직 후 퇴직금·실업급여 동시 수령 4단계</H2>
      <p style={body}>
        수급 자격 확인 → 퇴직금 수령 → 실업급여 신청 → 구직활동 순서예요.
        실업급여는 퇴직 직후 바로 신청하는 게 수급 기간을 최대로 확보하는 방법이에요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>동시 수령 체크리스트</H2>
      <p style={body}>
        실업급여 신청 기한 12개월을 놓치지 않는 게 중요해요. 퇴직 후 바로 고용센터에 방문하세요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="퇴직금도 받고 실업급여도 받으세요">
        두 가지 모두 근로자의 법적 권리예요.<br />
        퇴직금을 받았다고 실업급여를 포기할 이유가 전혀 없어요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금과 실업급여 동시 수령에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법과 근로자퇴직급여보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
