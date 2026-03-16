"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직일이 확정됐어요" },
  { id: "c2", label: "퇴직금이 300만원을 초과할 것 같아요" },
  { id: "c3", label: "IRP 계좌를 미리 만들었어요" },
  { id: "c4", label: "14일 안에 받을 예정이에요" },
];

const CALC_SLIDERS = [
  { id: "amount", label: "월급", min: 150, max: 800, step: 10, defaultValue: 300, format: (v: number) => `${v}만원` },
  { id: "years", label: "근속기간", min: 1, max: 35, step: 1, defaultValue: 5, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "예상 퇴직금",
    getValue: (v: Record<string, number>) => v.amount * 10000 * v.years,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "1년당 기준 (월급 1개월치)",
    getValue: (v: Record<string, number>) => v.amount * 10000,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "IRP 계좌번호", required: true, where: "본인 IRP 개설 후 회사 인사팀에 전달" },
  { name: "근로계약서", required: true, where: "입사 시 수령 · 인사팀 재발급" },
  { name: "사직서", required: true, where: "퇴직 의사 전달 시 제출" },
  { name: "급여명세서 (최근 3개월)", required: false, where: "회사 인사팀 요청" },
];

const STEPS = [
  {
    title: "퇴직 의사 전달",
    desc: "사직서를 작성해 인사팀 또는 직속 상관에게 전달해요. 퇴직일을 명확히 기재해두는 게 중요해요. 이 날짜부터 14일 기한이 시작되거든요.",
    tip: "구두 통보보다 서면(사직서)으로 남기는 게 나중에 분쟁 예방에 유리해요",
  },
  {
    title: "IRP 계좌 개설",
    desc: "퇴직금이 300만원을 초과하면 IRP(개인형 퇴직연금) 계좌로만 받을 수 있어요. 2022년부터 의무화됐죠. 은행·증권사·보험사 어디서든 모바일 앱으로 10분이면 개설이 끝나요.",
    tip: "55세 이상이거나 퇴직금이 300만원 이하면 일반 계좌로 받을 수 있어요",
  },
  {
    title: "회사에 계좌 통보",
    desc: "IRP 계좌번호를 회사 인사팀에 전달해요. 이 정보가 있어야 회사가 퇴직금을 IRP로 송금할 수 있어요. 퇴직 전에 미리 전달해두면 처리가 빨라지죠.",
    tip: "계좌번호는 문자나 메일로 전달해서 기록을 남겨두세요",
  },
  {
    title: "14일 이내 IRP 입금 확인",
    desc: "퇴직일로부터 14일 이내에 IRP 계좌에 입금이 됐는지 확인하세요. 14일이 지나도 입금이 없으면 회사에 서면으로 지급을 요청하고, 그래도 안 되면 노동청에 임금체불 진정을 넣으면 돼요.",
    tip: "14일이 지나면 연 20% 지연이자가 발생해요. 바로 행동하는 게 중요해요",
  },
];

const CHECKLIST = [
  "사직서 제출 — 퇴직일 명확히 기재",
  "IRP 계좌 개설 — 퇴직 전에 미리 준비",
  "IRP 계좌번호 인사팀에 전달 — 서면 또는 문자로",
  "퇴직소득원천징수영수증 수령 — 세금 내역 확인",
  "14일 이내 입금 확인 — 미입금 시 바로 대응",
];

const FAQS = [
  {
    q: "퇴직금은 퇴사 후 며칠이면 들어오나요?",
    a: "법적으로 퇴사일로부터 14일 이내에 지급해야 해요. 대부분의 회사는 급여일에 맞춰 처리하기도 하지만, 14일이 법정 기한이죠.",
  },
  {
    q: "IRP 계좌가 없으면 퇴직금을 못 받나요?",
    a: "55세 이상이거나 퇴직금이 300만원 이하면 일반 계좌로 받을 수 있어요. 그 외에는 IRP가 필요하니 퇴직 전에 개설해두세요.",
  },
  {
    q: "퇴직금을 분할로 달라고 할 수 있나요?",
    a: "원칙적으로 퇴직금은 일시에 지급해요. 회사가 분할 지급을 요청하면 동의 여부는 근로자에게 있고, 동의하지 않아도 불이익은 없어요.",
  },
  {
    q: "퇴직금 계산이 잘못됐을 때 어떻게 하나요?",
    a: "퇴직소득원천징수영수증을 받아서 직접 확인해보세요. 계산이 틀렸다면 회사에 정정을 요청하고, 안 되면 고용노동부에 진정을 넣을 수 있어요.",
  },
  {
    q: "회사가 폐업해서 퇴직금 절차가 막혔을 때는?",
    a: "체당금 제도를 활용하세요. 고용노동부에 도산 인정을 받으면 정부가 퇴직금을 대신 지급해줘요. 근로복지공단에 신청하면 되죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여 보장법 — 퇴직금 지급 절차 및 기한", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "근로기준법 제36조 — 금품 청산 의무 (14일 이내)", url: "https://www.law.go.kr/법령/근로기준법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 — 퇴직금 제도 안내", url: "https://www.moel.go.kr" },
      { label: "고용노동부 민원마당 — 임금체불 진정 접수", url: "https://minwon.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-수령방법",
    title: "퇴직금 수령 방법별 비교",
    description: "일시금과 IRP, 어떤 수령 방법이 유리한지 비교했어요.",
  },
  {
    slug: "퇴직금-IRP-계좌",
    title: "퇴직금 IRP 계좌 개설과 활용",
    description: "IRP 계좌가 왜 필요한지, 어디서 만드는지 정리했어요.",
  },
  {
    slug: "퇴직금-지급-기한",
    title: "퇴직금 지급 기한 14일 원칙",
    description: "14일 안에 안 들어오면 지연이자까지 청구할 수 있어요.",
  },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-지급-절차" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 지급절차 · 수령</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 지급 절차, 어떤 순서로 진행되나요?<br />
        퇴직일부터 IRP 입금까지 단계별 정리
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금이 알아서 들어오는 게 아니에요. 회사가 해야 할 일도 있고,
        퇴직자 본인이 준비해야 할 것도 있죠. 2022년부터 퇴직금 300만원 초과 시{" "}
        <a href="/w/퇴직금-IRP-계좌" style={{ color: "#1D9E75", textDecoration: "underline" }}>IRP 계좌</a>로만
        수령이 의무화됐어요.{" "}
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여 보장법</a>에
        따른 지급 절차를 단계별로 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>퇴직금 지급 절차가 맞는지 확인해보세요</H2>
      <p style={body}>
        퇴직 전에 준비해야 할 것과 퇴직 후 확인해야 할 것을 체크해보세요.
        IRP 계좌 준비가 늦으면 퇴직금 수령도 늦어질 수 있어요.
      </p>
      <p style={body}>
        14일 안에 입금이 안 되면 연 20% 지연이자가 발생해요.
        아래 체크리스트로 현재 상황을 파악해보세요.
      </p>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="퇴직금 지급 절차 준비가 잘 돼 있어요. 14일 이내 입금 여부만 확인하면 돼요."
        partialMatchText="아직 준비가 덜 된 부분이 있어요. 위 항목을 하나씩 살펴보세요."
      />

      <Divider />

      <H2>내 퇴직금이 얼마나 될까요?</H2>
      <p style={body}>
        퇴직금은 월급 × 근속연수로 계산해요. 정확하게는 퇴직 전 3개월 평균임금 기준이지만,
        월급이 비슷하다면 아래 계산기로 대략적인 금액을 확인할 수 있어요.
      </p>

      <SectionBadge>퇴직금 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 근로자퇴직급여 보장법 기준. 정확한 금액은 퇴직 전 3개월 평균임금 기준으로 계산해요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>수령에 필요한 서류 목록</H2>
      <p style={body}>
        퇴직금 수령에 복잡한 서류가 필요하지 않아요.
        IRP 계좌번호와 사직서가 핵심이에요.
      </p>

      <SectionBadge>필요 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <BorderBox title="DC형 퇴직연금 가입자는 절차가 달라요">
        DC형은 회사가 매년 적립한 금액이 이미 본인 계좌에 있어요.
        퇴직 시 별도 산정 없이 적립금과 운용수익을 합산해서 수령하게 되죠.
      </BorderBox>

      <Divider />

      <H2>퇴직일부터 IRP 입금까지 4단계</H2>
      <p style={body}>
        퇴직 의사 전달부터 IRP 입금 확인까지, 순서대로 따라가면 돼요.
        각 단계에서 기록을 남겨두면 나중에 문제가 생겼을 때 증거가 돼요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>퇴직금 수령 전 체크리스트</H2>
      <p style={body}>
        퇴직 전에 미리 준비해두면 퇴직금 수령이 훨씬 빠르고 매끄러워져요.
        특히 IRP 계좌 개설과 계좌번호 전달이 핵심이에요.
      </p>

      <SectionBadge>수령 전 준비 목록</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="300만원 초과 퇴직금은 IRP로만 수령 가능해요">
        2022년부터 퇴직금 300만원 초과 시 IRP 계좌로만 받을 수 있어요.
        IRP로 받으면 퇴직소득세가 유예되고, 퇴직금 전액이 그대로 입금되죠.
        나중에 인출할 때 세금이 정산되는 구조예요.
        55세 이상이거나 300만원 이하면 일반 계좌로도 받을 수 있어요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 지급 절차에 관해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여 보장법과 근로기준법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
