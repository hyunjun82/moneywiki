"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR, 퇴직금_HIGHLIGHT } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "한국에서 1년 이상 계속 근무했어요" },
  { id: "c2", label: "4주 평균 주 15시간 이상 일했어요" },
  { id: "c3", label: "고용허가제(E-9), 방문취업(H-2), 전문직(E-7) 등 취업 비자로 일했어요" },
  { id: "c4", label: "퇴직일 또는 출국일로부터 3년이 지나지 않았어요" },
];

const CALC_SLIDERS = [
  { id: "monthly", label: "월 평균임금", min: 200, max: 700, step: 10, defaultValue: 280, format: (v: number) => `${v}만원` },
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
    label: "퇴직소득세 (근사치, 5년 근속 기준)",
    getValue: (v: Record<string, number>) => Math.round(v.monthly * 10000 * v.years * 0.05),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원 (조세조약에 따라 다름)`,
  },
];

const DOCS = [
  { name: "여권 (유효한 것)", required: true, where: "본인 지참" },
  { name: "외국인등록증 (해당자)", required: true, where: "본인 지참" },
  { name: "퇴직확인서 또는 사직서 사본", required: true, where: "회사 인사팀에 요청" },
  { name: "IRP 또는 일반 계좌 통장 사본 (본인 명의)", required: true, where: "은행 발급" },
  { name: "출국 예정 증빙 (귀국 전 수령 시)", required: false, where: "항공권 또는 비자 만료 서류" },
];

const STEPS = [
  {
    title: "퇴직 확정 후 회사에 지급 요청",
    desc: "퇴직이 결정되면 회사에 퇴직금 지급을 요청하세요. 퇴직금이 300만원을 초과하면 IRP 계좌로만 받을 수 있어요. 회사는 퇴직일 후 14일 이내에 지급해야 해요. 출국 예정이라면 미리 일정을 알려두세요.",
    tip: "14일 이후 지급이면 연 20% 지연이자를 청구할 수 있어요",
  },
  {
    title: "IRP 계좌 개설 또는 일반 계좌 확인",
    desc: "300만원 이하면 일반 계좌로 직접 받을 수 있어요. 300만원 초과라면 IRP 계좌가 필요해요. 외국인도 여권과 외국인등록증으로 국내 은행에서 IRP를 개설할 수 있어요. 출국 전에 미리 개설해두는 게 좋아요.",
    tip: "IRP 계좌 개설은 시중 은행 앱에서 10~15분이면 가능해요",
    link: { label: "IRP 계좌 개설 방법", href: "/w/퇴직금-IRP-계좌" },
  },
  {
    title: "퇴직소득세 계산 및 처리",
    desc: "외국인 근로자도 한국에서 번 퇴직소득에 대해 퇴직소득세를 내야 해요. 회사(또는 세무사)가 원천징수로 처리하고 남은 금액이 실수령액이에요. 한국과 조세조약을 맺은 나라 출신이면 세율이 달라질 수 있어요.",
    tip: "조세조약 국가(미국, 중국, 일본, 베트남 등) 해당 여부는 국세청(126)에 확인하세요",
  },
  {
    title: "수령 후 본국 송금",
    desc: "퇴직금을 받은 후 본국으로 송금하려면 은행 외국환 거래 절차를 따라야 해요. 건당 5만 달러를 초과하면 은행에 증빙 서류(퇴직확인서·계좌이체내역)를 제출해야 해요. 송금 수수료와 환율도 미리 비교해두세요.",
    tip: "IRP를 출국 전에 해지하면 퇴직소득세가 한꺼번에 부과돼요. 세금 계산 먼저 해보세요",
  },
];

const CHECKLIST = [
  "퇴직금 수급 조건: 1년 이상 + 주 15시간 이상 (비자·국적 무관)",
  "300만원 초과 시 IRP 계좌 필수: 외국인도 국내 은행에서 개설 가능",
  "14일 이내 입금 확인: 초과 시 연 20% 지연이자 청구 가능",
  "퇴직소득세: 원천징수로 처리, 조세조약 감면 여부 국세청(126)에 확인",
  "본국 송금: 건당 5만 달러 초과 시 증빙 서류(퇴직확인서 등) 필요",
  "소멸시효 3년: 퇴직일로부터 3년 안에 청구 필수",
];

const FAQS = [
  {
    q: "외국인도 한국 퇴직금을 받을 수 있나요?",
    a: "받을 수 있어요. 근로기준법과 근로자퇴직급여보장법은 국적을 구분하지 않아요. 1년 이상 근무하고 주 15시간 이상 일했다면 내국인과 똑같이 퇴직금을 받을 수 있어요.",
  },
  {
    q: "출국 전에 IRP를 해지할 수 있나요?",
    a: "할 수 있어요. IRP를 출국 전에 해지하면 퇴직소득세가 부과돼요. 55세 미만이라면 기타소득세(16.5%)가 추가될 수 있어요. 세금 계산을 먼저 해보고 결정하세요.",
  },
  {
    q: "퇴직금을 본국으로 바로 송금할 수 있나요?",
    a: "퇴직금을 먼저 한국 계좌로 받은 후 해외송금하면 돼요. 건당 5만 달러를 초과하면 은행에 증빙 서류(퇴직확인서 등)를 제출해야 해요.",
  },
  {
    q: "불법체류 상태에서도 퇴직금을 받을 수 있나요?",
    a: "실제 근무 사실이 있으면 퇴직금 청구 권한이 있어요. 불법체류 여부와 관계없이 근로자로서 임금·퇴직금을 받을 권리는 보장돼요. 고용노동청(1350)에 신고할 수 있어요.",
  },
  {
    q: "조세조약이 있는 나라 출신이면 세금이 달라지나요?",
    a: "달라질 수 있어요. 한국과 조세조약을 맺은 나라(미국, 중국, 일본, 베트남 등) 출신이면 퇴직소득에 대한 과세 방식이 다를 수 있어요. 세금 감면이 가능한 경우도 있으니 국세청(126)에 확인하세요.",
  },
  {
    q: "회사가 퇴직금을 주지 않으면 어떻게 하나요?",
    a: "외국인도 고용노동청(1350)에 체불 신고 권한이 있어요. 한국어가 불편하면 통역 서비스를 요청할 수 있어요. 고용허가제 근로자는 고용센터 외국인력 담당자에게도 도움을 받을 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제2조: 근로자 정의 (국적 무관)", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로자퇴직급여보장법 제8조: 퇴직금 산정 및 지급", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
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
  { slug: "퇴직금-수령방법", title: "퇴직금 수령 방법 전체 정리", description: "일시금·연금·IRP 이전 절차를 정리했어요." },
  { slug: "퇴직금-irp-의무-예외", title: "퇴직금 IRP 의무 예외 조건", description: "출국 시 일반 계좌 수령이 가능한 경우." },
  { slug: "퇴직금-조건", title: "퇴직금 받는 조건", description: "고용형태별 퇴직금 발생 조건을 정리했어요." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} highlightSlugs={퇴직금_HIGHLIGHT} currentSlug="외국인-퇴직금-수령방법" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 외국인근로자 · 수령방법</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        외국인도 한국 퇴직금 받을 수 있을까요?<br />
        비자 무관 수급 조건부터 귀국 전 수령 절차까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        외국인 근로자도 내국인과 똑같이 <a href="/w/퇴직금-수령방법" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금</a>을 받을 수 있어요.
        국적이나 비자 종류와 관계없이 1년 이상, 주 15시간 이상 근무했다면 퇴직금 지급 대상이에요.
        300만원 초과 시 <a href="/w/퇴직금-IRP-계좌" style={{ color: "#1D9E75", textDecoration: "underline" }}>IRP 계좌</a>가 필요하지만, 귀국 전 출국 시엔 예외가 적용돼요.
        퇴직소득세와 본국 송금 방법까지 한 번에 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>외국인 퇴직금, 받을 수 있는 조건은?</H2>
      <p style={body}>
        한국 근로기준법은 국적을 구분하지 않아요. 외국인 근로자도 1년 이상 근무하고 주 15시간 이상 일했다면 퇴직금을 받을 수 있어요.
        고용허가제(E-9), 방문취업(H-2), 전문직(E-7) 등 비자 종류와 상관없이 동일하게 적용돼요.
      </p>
      <p style={body}>
        불법체류 상태에서도 실제 근무 사실이 있으면 퇴직금 청구 권한이 있어요.
        퇴직금이 300만원을 초과하면 IRP 계좌로만 받는 게 원칙이지만, 귀국(출국)하는 경우엔 일반 계좌로도 수령할 수 있어요.
        회사는 퇴직일로부터 14일 이내에 지급해야 하고, 늦으면 <a href="/w/퇴직금-지연이자" style={{ color: "#1D9E75", textDecoration: "underline" }}>연 20% 지연이자</a>를 청구할 수 있어요.
      </p>

      <GreenBox>
        1년 이상 근무 + 주 15시간 이상 (비자·국적 무관)<br />
        300만원 초과 시 IRP 계좌 원칙 (출국 시 예외 — 일반 계좌 수령 가능)<br />
        퇴직소득세 원천징수 후 실수령 (조세조약 감면 가능)
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="퇴직금 수급 조건이 맞아요. 아래 계산기로 예상 금액을 확인해보세요."
        partialMatchText="상황에 따라 다를 수 있어요. 고용노동부(1350) 상담을 먼저 받아보세요."
      />

      <Divider />

      <H2>외국인 퇴직금 얼마나 나올까?</H2>
      <p style={body}>
        외국인 퇴직금도 내국인과 똑같이 계산해요.
        월 평균임금 × 근속연수가 기본 공식이에요.
        퇴직소득세는 근속기간이 길수록 낮아지고, 조세조약 국가 출신이면 추가 감면이 가능해요.
      </p>

      <SectionBadge>퇴직금 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 월 평균임금 × 근속연수 기준. 퇴직소득세는 근속기간·조세조약에 따라 다를 수 있어요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>수령에 필요한 서류</H2>
      <p style={body}>
        여권과 외국인등록증이 신분 확인의 핵심이에요.
        IRP 개설 시에도 동일하게 필요하고, 귀국 전에 서류를 미리 챙겨두는 게 좋아요.
        퇴직확인서는 퇴직 후 발급이 늦을 수 있으니 재직 중에 인사팀과 미리 얘기해두세요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>귀국 전 퇴직금 수령 절차</H2>
      <p style={body}>
        퇴직 확정부터 본국 송금까지 순서대로 진행하면 돼요.
        IRP 처리와 세금 원천징수가 핵심이에요. 귀국 일정에 맞춰 미리 움직이세요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>수령 전 준비 체크리스트</H2>
      <p style={body}>
        조세조약 확인과 IRP 해지 시 세금 계산은 꼭 먼저 해보세요.
        귀국 후에는 한국 은행 계좌 접근이 어려워질 수 있으니 출국 전에 처리를 마치는 게 좋아요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        외국인도 고용노동청(1350)에 체불 신고 권한이 있어요.<br />
        한국어가 불편하면 통역 서비스를 요청할 수 있고, 불법체류자도 체불 임금 신고는 가능해요.
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
