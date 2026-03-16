"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "같은 사업장에서 1년 이상 근무했어요" },
  { id: "c2", label: "주 15시간 이상 일했어요" },
  { id: "c3", label: "퇴직했거나 곧 퇴직할 예정이에요" },
  { id: "c4", label: "아직 퇴직금을 받지 못했어요" },
];

const CALC_SLIDERS = [
  { id: "monthly", label: "월 평균 임금", min: 200, max: 800, step: 10, defaultValue: 300, format: (v: number) => `${v}만원` },
  { id: "years", label: "근속 기간", min: 1, max: 35, step: 1, defaultValue: 5, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "퇴직금 예상액",
    getValue: (v: Record<string, number>) => v.monthly * 10000 * v.years,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "세후 수령액 (퇴직소득세 약 5% 공제 기준)",
    getValue: (v: Record<string, number>) => Math.round(v.monthly * 10000 * v.years * 0.95),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "신분증", required: true, where: "본인 지참" },
  { name: "급여명세서 (최근 3개월)", required: true, where: "회사 인사팀" },
  { name: "IRP 계좌 정보 (계좌번호)", required: true, where: "금융기관 IRP 개설 후" },
  { name: "근로계약서", required: false, where: "인사팀 또는 입사 시 수령본" },
];

const STEPS = [
  {
    title: "퇴직금 수급 자격 확인",
    desc: "1년 이상 근무 + 주 15시간 이상이 기본 조건이에요. 계약직·아르바이트·파견직도 동일하게 적용돼요. 1년 미만이면 일할 계산(근속일수 ÷ 365)으로 일부만 받아요.",
    tip: "주 15시간 조건은 4주 평균으로 계산해요",
  },
  {
    title: "퇴직금 계산",
    desc: "퇴직금 = 1일 평균임금 × 30 × 근속연수예요. 1일 평균임금은 퇴직 전 3개월 총임금 ÷ 총 일수로 계산해요. 상여금은 월 환산해서 포함해야 해요.",
    tip: "회사 계산과 내 계산이 다르면 고용노동부(1350)에 문의하세요",
  },
  {
    title: "IRP 계좌 개설 및 통보",
    desc: "퇴직금 300만원 초과 시 IRP 계좌로만 받을 수 있어요. 은행·증권사 앱으로 10분이면 개설 가능해요. 계좌번호를 인사팀에 문자·메일로 알려줘야 해요.",
    tip: "퇴직 전 미리 개설해두면 지급 지연 없이 바로 받아요",
  },
  {
    title: "수령 및 세금 처리",
    desc: "IRP로 받으면 퇴직소득세가 원천징수돼요. 55세 이후 연금으로 받으면 세율이 30% 낮아져요. 300만원 이하라면 일반 계좌로 직접 받을 수 있어요.",
    tip: "IRP로 받고 연금 수령하면 퇴직소득세 30% 절세",
  },
];

const CHECKLIST = [
  "수급 조건 — 1년 이상, 주 15시간 이상",
  "퇴직금 계산 — 1일 평균임금 × 30 × 근속연수",
  "IRP 계좌 — 300만원 초과 시 필수",
  "14일 이내 지급 — 초과 시 연 20% 지연이자",
  "소멸시효 — 퇴직일로부터 3년",
];

const FAQS = [
  {
    q: "퇴직금은 무조건 받을 수 있나요?",
    a: "1년 이상 근무하고 주 15시간 이상 일했다면 받을 수 있어요. 자발적 퇴직이든 해고든 관계없어요. 사업주가 지급을 거부하면 고용노동청에 신고할 수 있어요.",
  },
  {
    q: "퇴직금 지급은 언제까지 해야 하나요?",
    a: "퇴직일로부터 14일 이내에 지급해야 해요. 근로기준법 제36조에 명시된 규정이에요. 14일이 지나면 연 20% 지연이자가 발생해요.",
  },
  {
    q: "퇴직금을 IRP가 아닌 통장으로 받을 수 있나요?",
    a: "300만원 이하라면 일반 계좌로 받을 수 있어요. 초과하면 IRP 계좌로만 받아야 해요. 2022년 4월 14일부터 의무화됐어요.",
  },
  {
    q: "1년 미만 근무하면 퇴직금이 없나요?",
    a: "1년 미만이면 법적으로 퇴직금이 발생하지 않아요. 단, 주 15시간 이상 근무를 기준으로 1년 이상 채운 경우에는 정산 대상이에요.",
  },
  {
    q: "퇴직금에 상여금도 포함되나요?",
    a: "포함돼요. 정기적·일률적으로 지급된 상여금은 연간 총액 ÷ 12로 월 환산해서 평균임금에 포함해야 해요. 회사가 빠뜨렸다면 재계산 요청을 할 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 제8조 — 퇴직금 지급 기준", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "근로기준법 제36조 — 금품 청산 (14일 이내)", url: "https://www.law.go.kr/법령/근로기준법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 — 퇴직금 제도 안내", url: "https://www.moel.go.kr" },
      { label: "고용24 — 퇴직금 계산기", url: "https://www.work.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-계산-방법", title: "퇴직금 계산 방법 완전 정리", description: "공식부터 상여금 환산까지." },
  { slug: "퇴직금-수령방법", title: "퇴직금 수령 방법", description: "일시금·연금·IRP 이전 절차까지." },
  { slug: "퇴직금-세금", title: "퇴직금 세금, 얼마나 떼나요?", description: "IRP 절세 방법까지 정리했어요." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 수급조건 · 계산방법</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 완전 정리 — 조건·계산·수령까지<br />
        1년 이상 근무하면 누구나 받을 수 있어요
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금은 1년 이상 근무하고 주 15시간 이상 일했다면 누구나 받을 수 있어요.
        계약직·아르바이트·파견직도 동일하게 적용돼요.
        <a href="/w/퇴직금-계산-방법" style={{ color: "#1D9E75", textDecoration: "underline" }}>계산 방법</a>은 1일 평균임금 × 30 × 근속연수예요.
        300만원 초과 시 <a href="/w/퇴직금-IRP-계좌" style={{ color: "#1D9E75", textDecoration: "underline" }}>IRP 계좌</a>로만 받을 수 있고, 퇴직일로부터 14일 이내에 지급해야 해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>퇴직금, 내가 받을 수 있는 조건은?</H2>
      <p style={body}>
        근로자퇴직급여보장법에 따라 1년 이상 근무 + 주 15시간 이상이 기본 조건이에요.
        고용 형태에 관계없이 정규직·계약직·알바·파견직 모두 동일하게 적용돼요.
        자발적 퇴직이든 해고든 조건을 충족하면 퇴직금을 받을 수 있어요.
      </p>
      <p style={body}>
        1년 미만 근무했다면 법적 퇴직금이 발생하지 않아요.
        다만 1년 이상 근무 후 퇴직하면 일 단위로 정확하게 계산해서 받아요.
        퇴직금이 300만원을 넘으면 IRP 계좌로만 수령해야 해요.
      </p>

      <GreenBox title="퇴직금 수급 기본 조건">
        1년 이상 근무 + 주 15시간 이상<br />
        고용 형태 무관 (정규직·계약직·알바 동일)<br />
        퇴직금 = 1일 평균임금 × 30 × 근속연수
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="퇴직금 수급 조건을 충족해요. 아래 계산기로 예상 금액을 확인해보세요."
        partialMatchText="일부 조건에 따라 달라질 수 있어요. 고용노동부(1350) 상담을 권해요."
      />

      <Divider />

      <H2>내 퇴직금 예상액 계산</H2>
      <p style={body}>
        월 평균 임금과 근속기간을 입력하면 예상 퇴직금을 바로 확인할 수 있어요.
        상여금이 있다면 연간 총액 ÷ 12를 월 임금에 더해서 계산하면 더 정확해요.
      </p>

      <SectionBadge>퇴직금 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 월 평균 임금 × 근속연수 기준. 퇴직소득세는 근속기간에 따라 다르며 IRP 연금 수령 시 30% 절감 가능."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>수령에 필요한 서류</H2>
      <p style={body}>
        신분증과 IRP 계좌 정보가 핵심이에요.
        급여명세서는 퇴직금 계산 기준이 되니 퇴직 전에 챙겨두세요.
        퇴직 후엔 발급이 어려울 수 있어요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>퇴직금 수령 절차 4단계</H2>
      <p style={body}>
        자격 확인부터 수령까지 단계별로 따라가면 헷갈리지 않아요.
        IRP 개설이 핵심이고, 퇴직 전에 미리 해두는 게 좋아요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>퇴직금 수령 체크리스트</H2>
      <p style={body}>
        소멸시효 3년과 IRP 의무화는 꼭 기억하세요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="퇴직금을 못 받으면 바로 신고하세요">
        14일이 지나도 입금이 없으면 연 20% 지연이자를 청구할 수 있어요.
        고용24(work.go.kr) 온라인 진정 접수로 빠르게 해결할 수 있어요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법과 근로기준법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
