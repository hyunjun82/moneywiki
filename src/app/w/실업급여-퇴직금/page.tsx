"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR, 퇴직금_HIGHLIGHT } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "비자발적으로 퇴직했어요 (권고사직·계약만료·폐업 등)" },
  { id: "c2", label: "고용보험에 180일 이상 가입되어 있어요" },
  { id: "c3", label: "같은 직장에서 1년 이상 일해서 퇴직금 조건을 충족해요" },
  { id: "c4", label: "퇴직 후 적극적으로 구직 활동을 할 의사가 있어요" },
];

const CALC_SLIDERS = [
  { id: "daily", label: "퇴직 전 일 평균임금", min: 5, max: 40, step: 1, defaultValue: 12, format: (v: number) => `${v}만원/일` },
  { id: "months", label: "고용보험 가입 기간", min: 6, max: 120, step: 6, defaultValue: 24, format: (v: number) => `${v}개월` },
];

const CALC_RESULTS = [
  {
    label: "실업급여 1일 지급액 (평균임금 60%)",
    getValue: (v: Record<string, number>) => Math.round(v.daily * 10000 * 0.6),
    format: (v: number) => `약 ${(v / 10000).toFixed(1)}만원/일`,
    highlight: true,
  },
  {
    label: "예상 수급 기간",
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
  { name: "이직확인서 (고용보험 피보험자 이직 확인)", required: true, where: "회사 인사팀 제출 또는 고용24에서 발급 요청" },
  { name: "신분증 (주민등록증 또는 운전면허증)", required: true, where: "본인 지참" },
  { name: "통장 사본 (실업급여 수령 계좌)", required: true, where: "본인 명의 통장" },
  { name: "퇴직금 수령 확인서 또는 IRP 입금 내역", required: false, where: "IRP 가입 금융사 발급" },
];

const STEPS = [
  {
    title: "퇴직금 수령 준비",
    desc: "퇴직일로부터 14일 이내에 퇴직금을 받아야 해요. 퇴직금이 300만원을 초과하면 IRP 계좌로 이체해요. 미리 IRP 계좌번호를 인사팀에 전달해두면 이체가 빠르게 처리돼요. 퇴직금 수령 시기는 실업급여 신청과 무관해요.",
    tip: "IRP 계좌는 은행·증권사·보험사 어디서든 개설 가능해요",
  },
  {
    title: "이직확인서 발급 확인",
    desc: "실업급여 신청 전에 회사가 고용24에 이직확인서를 제출했는지 확인해요. 회사가 10일 이내에 제출하지 않으면 고용24에서 직접 발급 요청을 할 수 있어요. 이직확인서 없이는 실업급여 신청이 안 돼요.",
    tip: "고용24 > 나의 서비스 > 이직확인서 처리 여부 조회에서 확인 가능해요",
    link: { label: "고용24에서 이직확인서 확인", href: "https://www.work.go.kr" },
  },
  {
    title: "실업급여 신청",
    desc: "퇴직 다음 날부터 고용센터 방문 또는 고용24 온라인으로 신청해요. 신청 기한은 퇴직 후 12개월이에요. 이 기간이 지나면 남은 수급 일수가 소멸해요. 퇴직 직후 바로 신청하는 게 가장 유리해요.",
    tip: "온라인 수급자 교육을 먼저 이수하면 방문 없이 신청할 수 있어요",
    link: { label: "고용24 실업급여 신청", href: "https://www.work.go.kr" },
  },
  {
    title: "구직 활동 및 실업인정",
    desc: "실업급여 수급 중에는 4주에 1회 이상 구직활동을 증명해야 해요. 입사지원, 면접, 직업훈련 등이 인정돼요. 취업하면 실업급여가 종료되고, 남은 수급 일수에 따라 조기재취업수당을 받을 수도 있어요.",
    tip: "퇴직금은 이미 받은 금액이라 실업급여 수급 기간 중에도 영향이 없어요",
  },
];

const CHECKLIST = [
  "퇴직금과 실업급여: 별개 제도, 동시 수령 가능",
  "퇴직금 지급 기한: 퇴직 후 14일 이내",
  "IRP 계좌: 퇴직금 300만원 초과 시 사전 개설 필요",
  "이직확인서: 회사 제출 여부 고용24에서 확인",
  "실업급여 신청 기한: 퇴직 후 12개월 이내",
  "구직활동: 4주 1회 이상 증명 필수",
];

const FAQS = [
  {
    q: "퇴직금을 받으면 실업급여가 줄어드나요?",
    a: "아니에요. 퇴직금은 실업급여 계산에 전혀 영향을 주지 않아요. 두 제도는 재원도, 조건도 완전히 달라서 퇴직금을 많이 받아도 실업급여는 그대로예요.",
  },
  {
    q: "퇴직금 수령 시점이 실업급여 수급 기간과 겹쳐도 되나요?",
    a: "돼요. 퇴직금은 퇴직 후 14일 이내에 받고, 실업급여는 고용센터에서 별개로 신청하는 거예요. 같은 기간에 퇴직금을 받으면서 실업급여를 수급해도 법적으로 아무 문제가 없어요.",
  },
  {
    q: "자진 퇴사면 실업급여를 못 받나요?",
    a: "원칙적으로 그래요. 하지만 임금 미지급, 직장 내 괴롭힘, 건강 악화, 회사 이전 등 정당한 사유가 있으면 자진 퇴사도 실업급여를 받을 수 있어요. 고용센터에서 사유를 확인받아야 해요.",
  },
  {
    q: "퇴직금을 IRP로 받으면 실업급여 신청에 불이익이 있나요?",
    a: "없어요. IRP로 퇴직금을 받든 일시금으로 받든 실업급여 수급과 완전히 무관해요. IRP는 세금 절감 목적의 계좌고, 실업급여는 고용보험에서 나오는 별개의 급여예요.",
  },
  {
    q: "실업급여 신청 기한이 얼마인가요?",
    a: "퇴직 후 12개월이에요. 이 기간 안에 신청해야 남은 수급 일수를 받을 수 있어요. 12개월이 지나면 잔여 수급 기간이 소멸하니 퇴직 후 빠르게 신청하세요.",
  },
  {
    q: "회사가 이직확인서를 안 내줄 때는 어떻게 하나요?",
    a: "고용24에서 직접 이직확인서 발급 요청을 할 수 있어요. 회사에 발급 요청 후 10일이 지나도 처리가 안 되면 고용24를 통해 고용센터가 직접 사업주에게 요청해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법 제40조: 구직급여 수급 요건", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "근로자퇴직급여보장법 제8조: 퇴직금 지급 기준", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부: 실업급여 수급 안내", url: "https://www.moel.go.kr" },
      { label: "고용24: 실업급여 신청 및 이직확인서 조회", url: "https://www.work.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-수령방법", title: "퇴직금 수령 방법 정리", description: "IRP 이체부터 일시금 수령까지 절차 안내." },
  { slug: "퇴직금-지급-기한", title: "퇴직금 지급 기한 14일", description: "기한 초과 시 지연이자 청구 방법." },
  { slug: "퇴직금-조건", title: "퇴직금 지급 조건 정리", description: "1년 이상 근속, 주 15시간 이상 핵심 기준." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} highlightSlugs={퇴직금_HIGHLIGHT} currentSlug="실업급여-퇴직금" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 실업급여 · 동시 수령</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 받으면 실업급여가 줄어드나요?<br />
        동시 수령 조건과 신청 절차
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금과 실업급여는 완전히 별개의 제도라서 동시에 받아도 돼요.
        퇴직금을 많이 받아도 실업급여 금액이나 수급 기간에 전혀 영향을 주지 않아요.
        실업급여는 고용보험 가입 기간과 비자발적 이직 여부가 핵심 조건이고, <a href="/w/퇴직금-수령방법" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 수령</a> 시기와는 무관해요.
        두 가지를 동시에 받을 수 있는 조건과 신청 방법을 아래에 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>퇴직금과 실업급여, 함께 받을 수 있나요?</H2>
      <p style={body}>
        퇴직금은 근로자퇴직급여보장법에 따라 사용자(회사)가 지급하는 근로자 권리예요.
        실업급여는 고용보험법에 따라 고용보험 기금에서 지급하는 별개의 사회보험 급여예요.
        재원도, 지급 주체도, 조건도 완전히 달라서 퇴직금 수령이 실업급여를 막거나 줄이지 않아요.
      </p>
      <p style={body}>
        실업급여를 받으려면 비자발적 이직(권고사직·계약만료·폐업 등)과 고용보험 180일 이상 가입이 핵심 조건이에요.
        자진 퇴사라면 임금 미지급·직장 내 괴롭힘 등 <a href="/w/실업급여-정당한-퇴사-사유" style={{ color: "#1D9E75", textDecoration: "underline" }}>정당한 퇴직 사유</a>가 있어야 수급이 가능해요.
        <a href="/w/퇴직금-조건" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 조건</a>은 별도로 1년 이상 근속, 주 15시간 이상 근무예요.
      </p>

      <GreenBox>
        퇴직금: 회사가 지급, 퇴직 후 14일 이내, 1년 이상 근속 기준<br />
        실업급여: 고용보험 기금 지급, 퇴직 후 12개월 내 신청, 구직활동 조건<br />
        두 제도 완전 독립 → 퇴직금 수령이 실업급여에 영향 없어요
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="퇴직금과 실업급여를 동시에 받을 수 있어요. 아래 계산기로 실업급여 예상액을 확인해보세요."
        partialMatchText="실업급여 수급 조건 충족 여부를 고용센터(1350)에서 먼저 확인하세요."
      />

      <Divider />

      <H2>실업급여 예상 금액 계산</H2>
      <p style={body}>
        실업급여는 퇴직 전 일 평균임금의 60%예요. 하한액은 최저임금의 80% 수준으로 적용돼요.
        슬라이더로 일 평균임금과 고용보험 가입 기간을 입력하면 1일 지급액과 예상 수급 기간을 확인할 수 있어요.
        퇴직금은 별도로 계산되는 금액이라 아래 결과에 포함되지 않아요.
      </p>

      <SectionBadge>실업급여 예상액 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 일 평균임금의 60% 기준. 하한액(최저임금 80%)이 적용되면 실제 금액이 더 높을 수 있어요. 퇴직금은 별도 수령."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>퇴직금·실업급여 신청 서류</H2>
      <p style={body}>
        이직확인서는 회사가 고용24에 제출해야 하는 서류예요.
        회사가 제출을 미루면 고용24에서 직접 발급 요청을 할 수 있어요.
        퇴직금 수령을 위한 IRP 계좌는 퇴직 전에 미리 개설해두는 게 좋아요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>퇴직 후 퇴직금·실업급여 동시 수령 절차</H2>
      <p style={body}>
        퇴직금 수령 준비 → 이직확인서 확인 → 실업급여 신청 → 구직활동 순서로 진행해요.
        실업급여는 퇴직 직후 바로 신청하는 게 수급 기간을 최대로 확보하는 방법이에요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>동시 수령 체크리스트</H2>
      <p style={body}>
        실업급여 신청 기한 12개월을 놓치지 않는 게 중요해요.
        퇴직금 지급 기한 14일도 확인하고, 미지급 시 <a href="/w/퇴직금-지연이자" style={{ color: "#1D9E75", textDecoration: "underline" }}>지연이자</a>를 청구할 수 있어요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        두 가지 모두 근로자의 법적 권리예요.<br />
        퇴직금을 받았다고 실업급여를 포기할 이유가 없어요.
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
