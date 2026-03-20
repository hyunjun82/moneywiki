"use client";

// Q1. 퇴직했거나 곧 퇴직 예정인데, 퇴직금을 어떻게 일시금으로 받는지 절차를 모르는 상황
// Q2. IRP 계좌에서 일시금 인출 신청을 직접 완료한다
// Q3. 300만원 초과 IRP 의무, IRP 개설 방법, 일시금 인출 신청 절차(앱/방문), 세금 원천징수 처리, 일시금 vs 연금 세금 차이
// Q4. Steps(절차 흐름) → Calculator(세후 금액 확인) → DocTable(준비 서류) → Checklist(인출 전 확인) → FAQ
//
// MAP:
// Q1 → 서론: IRP에 들어간 퇴직금을 어떻게 꺼내야 하나 막막한 상황
// Q2 → H2 순서: Steps(절차 먼저) → Calculator(세금 확인) → DocTable(서류) → Checklist(인출 전 체크)
// Q3 → H2 4개 + FAQ 5개
// Q4 → Steps, Calculator, DocTable, Checklist, GreenBox, BorderBox

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR, 퇴직금_HIGHLIGHT } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CALC_SLIDERS = [
  { id: "amount", label: "퇴직금 금액", min: 500, max: 15000, step: 100, defaultValue: 3000, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "years", label: "근속 기간", min: 1, max: 35, step: 1, defaultValue: 10, format: (v: number) => `${v}년` },
];

function calcTax(amount: number, years: number): number {
  const base = amount * 10000;
  let deduction = 0;
  if (years <= 5) deduction = 300000 * years;
  else if (years <= 10) deduction = 1500000 + 500000 * (years - 5);
  else if (years <= 20) deduction = 4000000 + 800000 * (years - 10);
  else deduction = 12000000 + 1200000 * (years - 20);
  const taxBase = Math.max(0, base - deduction);
  const converted = (taxBase / years) * 12;
  let convertedDeduct = 0;
  if (converted <= 8000000) convertedDeduct = converted;
  else if (converted <= 70000000) convertedDeduct = 8000000 + (converted - 8000000) * 0.6;
  else convertedDeduct = 8000000 + (70000000 - 8000000) * 0.6 + (converted - 70000000) * 0.45;
  const finalBase = Math.max(0, converted - convertedDeduct);
  let tax = 0;
  if (finalBase <= 14000000) tax = finalBase * 0.06;
  else if (finalBase <= 50000000) tax = 840000 + (finalBase - 14000000) * 0.15;
  else if (finalBase <= 88000000) tax = 6240000 + (finalBase - 50000000) * 0.24;
  else if (finalBase <= 150000000) tax = 15360000 + (finalBase - 88000000) * 0.35;
  else if (finalBase <= 300000000) tax = 37060000 + (finalBase - 150000000) * 0.38;
  else tax = 94060000 + (finalBase - 300000000) * 0.40;
  return Math.round(Math.max(0, (tax / 12) * years));
}

const CALC_RESULTS = [
  {
    label: "퇴직소득세 (원천징수 추정)",
    getValue: (v: Record<string, number>) => calcTax(v.amount, v.years),
    format: (v: number) => v < 10000 ? `약 ${v.toLocaleString()}원` : `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "지방소득세 포함 총 세금 (10% 가산)",
    getValue: (v: Record<string, number>) => Math.round(calcTax(v.amount, v.years) * 1.1),
    format: (v: number) => v < 10000 ? `약 ${v.toLocaleString()}원` : `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
  {
    label: "세후 실수령액",
    getValue: (v: Record<string, number>) => v.amount * 10000 - Math.round(calcTax(v.amount, v.years) * 1.1),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const STEPS = [
  {
    title: "IRP 계좌 개설 (300만원 초과라면 필수)",
    desc: "퇴직금이 300만원을 넘으면 IRP(개인형 퇴직연금) 계좌로만 받을 수 있죠. 은행·증권사·보험사 어디서든 앱으로 10~15분이면 개설 가능하고요. 이미 IRP 계좌가 있다면 그 계좌 정보를 회사 인사팀에 알려주면 돼요.",
    tip: "수수료 0원 상품이 증권사에 많아요. 개설 전에 한 번 비교해보면 좋죠",
    link: { label: "IRP 계좌 비교하기", href: "/w/퇴직금-IRP-계좌" },
  },
  {
    title: "회사에 IRP 계좌 정보 전달",
    desc: "IRP 계좌번호와 금융기관명을 인사팀에 알려줘요. 퇴직일로부터 14일 이내에 퇴직금이 IRP로 이체되고요. 14일이 지나도 안 들어오면 연 20%의 지연이자를 청구할 수 있죠.",
    tip: "퇴직 전에 미리 IRP를 만들어두면 이체가 빠르게 처리되고 지연 위험이 줄어요",
  },
  {
    title: "IRP 앱에서 일시금 인출 신청",
    desc: "퇴직금이 IRP에 입금되면 가입한 금융사 앱에서 '일시금 지급 신청'을 해요. 별도 서류 없이 본인 인증만으로 처리되는 경우가 대부분이죠. 신청 후 퇴직소득세가 자동 공제되고 남은 금액이 지정 계좌로 들어오고요. 보통 3~5영업일 걸려요.",
    tip: "앱 신청이 방문보다 대부분 빨라요. 모바일 앱에서 '퇴직금 인출' 또는 '일시금 신청' 메뉴를 찾아봐요",
  },
  {
    title: "퇴직소득 원천징수영수증 수령",
    desc: "인출 완료 후 금융사에서 퇴직소득 원천징수영수증을 받아요. 세금이 제대로 계산됐는지 직접 대조해볼 수 있는 유일한 서류예요. 잘못 계산됐다면 홈택스에서 경정청구를 신청해 환급받을 수 있고요.",
    tip: "영수증은 홈택스에서도 조회 가능해요. 퇴직 당일 챙겨두는 게 좋죠",
    link: { label: "홈택스 원천징수 내역 조회", href: "https://www.hometax.go.kr" },
  },
];

const DOCS = [
  { name: "신분증 (주민등록증 또는 운전면허증)", required: true, where: "본인 지참 또는 앱 인증" },
  { name: "IRP 계좌 개설 서류 (미개설 시)", required: true, where: "은행·증권사 앱 또는 방문" },
  { name: "퇴직소득 원천징수영수증", required: false, where: "회사 인사팀 또는 홈택스에서 조회" },
  { name: "일시금 지급 신청서 (금융사 양식)", required: false, where: "IRP 가입 금융사 앱 자동 제공" },
];

const CHECKLIST = [
  "퇴직금 300만원 이하: IRP 없이 일반 계좌로 직접 수령 가능",
  "퇴직금 300만원 초과: IRP 개설 후 계좌 정보를 인사팀에 제출",
  "퇴직금 지급 기한: 퇴직일로부터 14일 이내 (초과 시 연 20% 지연이자 청구 가능)",
  "일시금 인출: IRP 앱에서 신청, 퇴직소득세 자동 공제 후 3~5영업일 이내 지급",
  "55세 이후라면: 연금 수령 시 퇴직소득세 최대 40% 감면, 일시금 전에 한 번 비교해봐요",
  "원천징수영수증: 인출 직후 앱 또는 홈택스에서 내려받아 보관",
];

const FAQS = [
  {
    q: "퇴직금을 IRP 없이 바로 받을 수 없나요?",
    a: "300만원 이하라면 일반 계좌로 직접 받을 수 있죠. 300만원 초과는 2022년 4월부터 IRP로만 수령해야 해요. 근로자퇴직급여보장법 제9조에서 의무화한 사항이에요. IRP 개설 후 일시금 인출 신청을 하면 세금 차감 후 바로 지급되고요.",
  },
  {
    q: "IRP에서 일시금으로 빼는 데 얼마나 걸리나요?",
    a: "금융사 앱에서 신청 후 보통 3~5영업일이에요. 서류 확인이 필요한 경우엔 더 걸릴 수 있고요. 방문 신청보다 앱 신청이 빠른 경우가 많으니 앱을 먼저 써봐요.",
  },
  {
    q: "일시금 vs 연금, 세금 차이가 얼마나 나나요?",
    a: "55세 이후 10년 이상 연금으로 받으면 퇴직소득세를 최대 40% 줄일 수 있죠. 당장 목돈이 필요하거나 55세까지 시간이 많이 남았다면 일시금도 합리적이에요. 위 계산기에서 일시금 세금을 먼저 넣어봐요.",
  },
  {
    q: "일시금으로 받으면 세금이 얼마나 나오나요?",
    a: "근속 기간과 퇴직금 규모에 따라 달라요. 근속 10년·퇴직금 3,000만원 기준으로 수십만 원 수준이에요. 위 계산기로 내 조건을 넣어보면 예상 세금과 실수령액을 바로 확인할 수 있죠.",
  },
  {
    q: "일시금으로 받은 뒤 다시 IRP에 납입할 수 있나요?",
    a: "납입은 가능해요. 다만 이미 세금을 낸 상태라 과세이연 효과는 없고요. 새로 납입하는 금액은 연간 1,800만원 한도 내에서 세액공제를 받을 수 있죠.",
  },
  {
    q: "회사가 14일 안에 퇴직금을 안 줬어요. 어떻게 하나요?",
    a: "지연된 날수만큼 연 20%의 지연이자를 청구할 수 있죠. 고용노동부 고객상담센터(1350)에 신고하거나 사업장 관할 노동지청에 진정을 넣어요. 3년 이내에 청구해야 소멸시효가 지나지 않아요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 제9조: IRP 이체 의무화", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "소득세법 제22조: 퇴직소득세 계산 기준", url: "https://www.law.go.kr/법령/소득세법" },
      { label: "소득세법 제48조: 근속연수 공제", url: "https://www.law.go.kr/법령/소득세법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "국세청 홈택스: 퇴직소득세 모의계산", url: "https://www.hometax.go.kr" },
      { label: "금융감독원: IRP 일시금 인출 안내", url: "https://www.fss.or.kr" },
      { label: "고용노동부: 퇴직급여 지급 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-세금", title: "퇴직금 세금, 얼마나 떼나요?", description: "퇴직소득세 5단계 계산 구조와 IRP 절세 방법이에요." },
  { slug: "퇴직금-IRP-수령방법", title: "퇴직금 IRP 수령 방법", description: "IRP 계좌 개설부터 연금 설정까지 단계별 안내예요." },
  { slug: "퇴직금-계산법", title: "퇴직금 계산법, 얼마나 받을까?", description: "평균임금 기준 퇴직금 계산 공식과 실전 예시예요." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} highlightSlugs={퇴직금_HIGHLIGHT} currentSlug="퇴직금-일시금-수령-방법" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 일시금 · IRP 인출</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 일시금으로 받으려면 어떻게 하나요?<br />
        IRP 인출 4단계 절차와 세후 수령액 계산법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금이 IRP에 들어왔는데 어떻게 꺼내야 할지 막막하죠? 퇴직금 300만원 초과라면{" "}
        <a href="/w/퇴직금-IRP-계좌" style={{ color: "#1D9E75", textDecoration: "underline" }}>IRP 계좌</a>로
        먼저 받고, 거기서 일시금 인출 신청을 해야 해요.
        인출 시점에{" "}
        <a href="/w/퇴직금-세금" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직소득세</a>가
        자동으로 차감되고 나머지가 지급되는 구조예요.
      </p>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        절차 자체는 4단계로 간단해요. 다만 인출 전에 일시금과 연금 수령의 세금 차이를 한 번만 비교해보는 게 좋고요.
        55세 이후라면 연금 수령이 퇴직소득세를 최대 40% 줄여줄 수 있죠.
      </p>

      <GreenBox>
        300만원 이하: IRP 없이 일반 계좌로 직접 수령 가능<br />
        300만원 초과: IRP 계좌 개설 → 회사에 전달 → 입금 확인 → 일시금 인출 신청<br />
        55세 이후 연금 수령(10년 이상): 퇴직소득세 최대 40% 감면
      </GreenBox>

      <Divider />
      <ArticleAd position="intro" />

      {/* H2-1: Steps (절차형 핵심 행동 먼저) */}
      <H2>IRP에서 일시금 인출하는 4단계 절차예요</H2>
      <p style={body}>
        IRP 계좌에 퇴직금이 들어왔다면 바로 인출할 수 있죠.
        금융사 앱에서 '일시금 지급 신청' 메뉴를 찾아 신청하면 퇴직소득세가 자동 차감되고, 남은 금액이 지정 계좌로 이체되죠.
        IRP가 아직 없다면 1단계부터 시작해요.
      </p>
      <p style={body}>
        회사가 14일 이내에 IRP로 이체하지 않으면 연 20% 지연이자가 발생해요.
        퇴직 전에 IRP를 미리 만들어두면 이체가 빠르게 처리되고요.
      </p>

      <Steps steps={STEPS} />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      {/* H2-2: Calculator (얼마형 세금 먼저 확인) */}
      <H2>일시금 받으면 세금이 얼마나 빠질까요?</H2>
      <p style={body}>
        퇴직소득세는 고정 세율이 아니에요. 근속 기간이 길수록 공제가 커져서 세금이 줄어드는 구조죠.
        아래 계산기에 퇴직금과 근속 기간을 넣으면 예상 세금과 세후 실수령액을 바로 볼 수 있죠.
      </p>
      <p style={body}>
        10년 근속에 퇴직금 3,000만원이면 세금이 수십만원 수준이에요.
        같은 금액이라도 근속 20년이면 공제가 늘어나서 세금이 절반 이하로 떨어지고요.
        슬라이더로 내 조건을 맞춰봐요.
      </p>

      <SectionBadge>세후 수령액 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 소득세법 기준 간략 계산이에요. 정확한 금액은 홈택스 퇴직소득세 계산기에서 대조해봐요."
      />

      <BorderBox>
        일시금으로 받으면 퇴직소득세 100%를 내야 하지만, IRP에 두고 55세 이후 10년 이상 연금으로 나눠 받으면 세금의 60~70%만 내요.
        당장 목돈이 급하지 않다면 연금 수령 옵션을 한 번은 따져보는 게 맞죠.
      </BorderBox>

      <Divider />

      {/* H2-3: DocTable (서류) */}
      <H2>일시금 인출에 필요한 서류가 뭔가요?</H2>
      <p style={body}>
        IRP 앱에서 신청하면 대부분 신분증 인증 한 번으로 처리돼요.
        별도 서류를 준비할 필요가 없는 경우가 많지만, 나중에 세금 환급이나 종합소득세 신고 시에는 원천징수영수증이 꼭 필요하죠.
      </p>
      <p style={body}>
        퇴직소득 원천징수영수증은 퇴직 당일 회사 인사팀에 요청하거나 인출 후 금융사 앱에서 바로 내려받을 수 있죠.
        퇴직 후에는 회사 시스템 접근이 막히는 경우가 많아서 당일에 챙기는 게 좋고요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      {/* H2-4: Checklist (인출 전 확인사항) */}
      <H2>인출 전에 이것만 체크해봐요</H2>
      <p style={body}>
        퇴직금 5,000만원에 15년 근속이라면 일시금 수령 시 세금이 100만원대예요.
        IRP 연금으로 10년 이상 나눠 받으면 그 60~70%만 내죠. 금액이 클수록 절세 효과도 커지고요.
      </p>
      <p style={body}>
        아래 항목 중 하나라도 놓치면 손해가 생길 수 있죠.
        특히 IRP 중도해지는 이연된 세금 전액에 기타소득세 16.5%까지 붙기 때문에 절대 피해야 하죠.
      </p>

      <SectionBadge>인출 전 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* H2-5: FAQ */}
      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 일시금 수령에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법과 소득세법을 바탕으로 작성됐어요. 세법 개정이 있을 수 있으니 최신 기준은 국세청(126)에서 대조해봐요." />
    </ArticleLayout>
  );
}
