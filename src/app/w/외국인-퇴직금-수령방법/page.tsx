"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "한국에서 1년 이상 근무했어요" },
  { id: "c2", label: "주 15시간 이상 근무했어요" },
  { id: "c3", label: "퇴직하거나 출국할 예정이에요" },
  { id: "c4", label: "퇴직금을 한국 또는 본국 계좌로 받고 싶어요" },
];

const CALC_SLIDERS = [
  { id: "monthly", label: "월 평균 임금", min: 200, max: 600, step: 10, defaultValue: 280, format: (v: number) => `${v}만원` },
  { id: "years", label: "근속 기간", min: 1, max: 20, step: 1, defaultValue: 3, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "퇴직금 예상액",
    getValue: (v: Record<string, number>) => v.monthly * 10000 * v.years,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "퇴직소득세 (근사치, 근속 5년 기준)",
    getValue: (v: Record<string, number>) => Math.round(v.monthly * 10000 * v.years * 0.05),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "여권 또는 외국인등록증", required: true, where: "본인 지참" },
  { name: "한국 또는 본국 은행 계좌 정보", required: true, where: "본인 계좌" },
  { name: "퇴직확인서 또는 사직서 사본", required: true, where: "회사 인사팀" },
  { name: "출국 예정 증빙 (해당자)", required: false, where: "항공권 또는 비자 만료 서류" },
];

const STEPS = [
  {
    title: "퇴직금 지급 요청",
    desc: "퇴직이 확정되면 회사에 퇴직금 지급을 요청해요. 300만원 초과 시 IRP 계좌로만 받을 수 있어요. IRP 계좌가 없다면 미리 개설해두는 게 좋아요. 회사는 퇴직일 후 14일 이내에 지급해야 해요.",
    tip: "14일 이후 지급이면 연 20% 지연이자를 청구할 수 있어요",
  },
  {
    title: "IRP 계좌 개설 또는 직접 수령",
    desc: "퇴직금이 300만원 이하라면 일반 계좌로 직접 받을 수 있어요. 300만원 초과라면 IRP 계좌가 필요해요. 외국인도 국내 은행에서 IRP를 개설할 수 있어요. 여권과 외국인등록증이 필요해요.",
    tip: "출국 전에 IRP를 해지하면 퇴직소득세가 부과돼요",
  },
  {
    title: "퇴직소득세 계산 및 납부",
    desc: "한국에서 근무한 외국인도 퇴직소득세를 내야 해요. 근속기간이 길수록 세금이 적어요. 회사 또는 세무사가 원천징수로 처리해요. 세금을 내고 남은 금액이 실수령액이에요.",
    tip: "한국과 조세조약이 있는 나라 출신이면 세율이 달라질 수 있어요",
  },
  {
    title: "본국 송금",
    desc: "퇴직금을 받은 후 본국으로 송금하려면 은행 외국환 거래 절차를 따라야 해요. 건당 5만 달러 초과 시 증빙 서류가 필요해요. 송금 수수료와 환율도 고려하세요.",
    tip: "해외송금 시 증빙 서류(퇴직확인서·계좌이체내역)를 챙겨두세요",
  },
];

const CHECKLIST = [
  "퇴직금 수급 조건: 1년 이상, 주 15시간 이상",
  "IRP 계좌: 300만원 초과 시 필수 (외국인도 개설 가능)",
  "14일 이내 입금 확인: 초과 시 연 20% 지연이자",
  "퇴직소득세: 원천징수로 처리 (조세조약 확인)",
  "본국 송금: 5만 달러 초과 시 증빙 서류 필요",
];

const FAQS = [
  {
    q: "외국인도 한국 퇴직금을 받을 수 있나요?",
    a: "맞아요. 외국인 근로자도 내국인과 동일한 퇴직금 규정이 적용돼요. 1년 이상 근무하고 주 15시간 이상 일했다면 퇴직금을 받을 수 있어요.",
  },
  {
    q: "퇴직금을 본국으로 바로 보낼 수 있나요?",
    a: "가능해요. 퇴직금을 먼저 한국 계좌로 받은 후 해외송금하면 돼요. 건당 5만 달러를 초과하면 은행에 증빙 서류(퇴직확인서 등)를 제출해야 해요.",
  },
  {
    q: "출국 전에 IRP를 해지할 수 있나요?",
    a: "가능해요. IRP를 출국 전에 해지하면 퇴직소득세가 부과돼요. 55세 미만이라면 기타소득세(16.5%)가 추가될 수 있어요. 세금 계산을 먼저 해보고 결정하세요.",
  },
  {
    q: "회사가 퇴직금을 주지 않으면 어떻게 하나요?",
    a: "고용노동청(1350)에 체불 신고를 할 수 있어요. 외국인이라도 신고 권한이 있어요. 불법체류자도 체불 임금 신고는 가능해요.",
  },
  {
    q: "조세조약이 있는 나라 출신이면 세금이 달라지나요?",
    a: "한국과 조세조약을 맺은 나라 출신이면 퇴직소득에 대한 과세 방식이 다를 수 있어요. 세금 환급이나 감면이 가능한 경우도 있어요. 세무사나 국세청(126)에 확인하세요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제2조: 근로자 정의 (국적 무관)", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로자퇴직급여보장법 제8조: 퇴직금 산정", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부: 외국인 근로자 권리 안내", url: "https://www.moel.go.kr" },
      { label: "국세청: 외국인 퇴직소득세 안내", url: "https://www.nts.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-수령방법", title: "퇴직금 수령 방법 전체 정리", description: "일시금·연금·IRP 이전 절차까지." },
  { slug: "퇴직금-IRP-계좌", title: "IRP 계좌 개설 방법", description: "은행·증권사 비교부터 개설까지." },
  { slug: "퇴직금-세금", title: "퇴직금 세금, 얼마나 떼나요?", description: "퇴직소득세와 IRP 절세 방법." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="외국인-퇴직금-수령방법" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 외국인근로자 · 수령방법</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        외국인도 한국 퇴직금 받을 수 있어요<br />
        IRP 계좌·세금·본국 송금까지 완전 정리
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        외국인 근로자도 내국인과 똑같이 <a href="/w/퇴직금-수령방법" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금</a>을 받을 수 있어요.
        국적이나 비자 종류와 관계없이 1년 이상, 주 15시간 이상 근무했다면 퇴직금 지급 대상이에요.
        300만원 초과 시 <a href="/w/퇴직금-IRP-계좌" style={{ color: "#1D9E75", textDecoration: "underline" }}>IRP 계좌</a>로 받아야 하고, 외국인도 국내 은행에서 개설할 수 있어요.
        퇴직소득세와 본국 송금 방법도 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>외국인 퇴직금, 받을 수 있는 조건은?</H2>
      <p style={body}>
        한국 근로기준법은 국적을 구분하지 않아요. 외국인 근로자도 1년 이상 근무하고 주 15시간 이상 일했다면 퇴직금을 받을 수 있어요.
        고용허가제(E-9), 방문취업(H-2), 전문직(E-7) 등 비자 종류와 상관없이 동일하게 적용돼요.
        불법체류 상태에서도 실제 근무 사실이 있으면 퇴직금 청구 권한이 있어요.
      </p>
      <p style={body}>
        퇴직금이 300만원을 초과하면 IRP 계좌로만 받을 수 있어요.
        외국인도 여권과 외국인등록증으로 국내 은행에서 IRP를 개설할 수 있어요.
        회사는 퇴직일로부터 14일 이내에 지급해야 하고, 늦으면 연 20% 지연이자를 청구할 수 있어요.
      </p>

      <GreenBox title="외국인 퇴직금 수급 조건">
        1년 이상 근무 + 주 15시간 이상 (비자·국적 무관)<br />
        300만원 초과 시 IRP 계좌로 수령<br />
        퇴직소득세 원천징수 후 실수령
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="퇴직금 수급 조건이 맞아요. 아래 계산기로 예상 금액을 확인해보세요."
        partialMatchText="상황에 따라 다를 수 있어요. 고용노동부(1350) 상담을 권해요."
      />

      <Divider />

      <H2>퇴직금 예상액 계산</H2>
      <p style={body}>
        월 평균 임금과 근속기간으로 예상 퇴직금을 계산할 수 있어요.
        퇴직소득세는 근속기간이 길수록 낮아지고, 조세조약 국가 출신이면 추가 감면이 가능해요.
      </p>

      <SectionBadge>퇴직금 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 월 평균 임금 × 근속연수 = 퇴직금. 퇴직소득세는 근속기간·조세조약에 따라 다를 수 있어요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>수령에 필요한 서류</H2>
      <p style={body}>
        여권과 외국인등록증이 신분 확인의 핵심이에요.
        IRP 개설 시에도 동일하게 사용돼요.
        본국 송금을 위한 계좌 정보도 미리 준비해두세요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>외국인 퇴직금 수령 절차 4단계</H2>
      <p style={body}>
        퇴직금 요청부터 본국 송금까지 순서대로 진행하면 돼요.
        IRP 개설과 세금 처리가 핵심이에요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>수령 체크리스트</H2>
      <p style={body}>
        조세조약 확인과 IRP 해지 시 세금 계산은 꼭 먼저 해보세요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="퇴직금을 못 받으면 신고할 수 있어요">
        외국인도 고용노동청(1350)에 체불 신고 권한이 있어요.
        불법체류자도 체불 임금 신고는 가능하니 포기하지 마세요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        외국인 퇴직금 수령에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법과 근로자퇴직급여보장법을 바탕으로 작성됐어요. 조세조약에 따라 세율이 다를 수 있으니 국세청(126) 또는 세무사 상담을 권해요." />
    </ArticleLayout>
  );
}
