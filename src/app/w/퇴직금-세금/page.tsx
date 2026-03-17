"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직금을 받았거나 곧 받을 예정이에요" },
  { id: "c2", label: "퇴직소득원천징수영수증을 받았어요" },
  { id: "c3", label: "근속기간이 5년 이상이에요" },
  { id: "c4", label: "IRP 계좌가 있어요" },
];

const CALC_SLIDERS = [
  { id: "amount", label: "퇴직금 총액", min: 500, max: 20000, step: 500, defaultValue: 3000, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "years", label: "근속연수", min: 1, max: 35, step: 1, defaultValue: 10, format: (v: number) => `${v}년` },
];

function calcTax(amount: number, years: number): number {
  const amountWon = amount * 10000;
  let yearDeduct = 0;
  if (years <= 5) yearDeduct = years * 300000;
  else if (years <= 10) yearDeduct = 1500000 + (years - 5) * 500000;
  else if (years <= 20) yearDeduct = 4000000 + (years - 10) * 800000;
  else yearDeduct = 12000000 + (years - 20) * 1200000;

  const taxableBase = Math.max(0, amountWon - yearDeduct);
  const converted = taxableBase / years * 12;
  let convertedDeduct = 0;
  if (converted <= 8000000) convertedDeduct = converted;
  else if (converted <= 70000000) convertedDeduct = 8000000 + (converted - 8000000) * 0.6;
  else convertedDeduct = 8000000 + (70000000 - 8000000) * 0.6 + (converted - 70000000) * 0.45;
  const finalBase = Math.max(0, converted - convertedDeduct);
  let tax = 0;
  if (finalBase <= 14000000) tax = finalBase * 0.06;
  else if (finalBase <= 50000000) tax = 840000 + (finalBase - 14000000) * 0.15;
  else if (finalBase <= 88000000) tax = 6240000 + (finalBase - 50000000) * 0.24;
  else tax = 15360000 + (finalBase - 88000000) * 0.35;
  const finalTax = (tax / 12) * years;
  return Math.round(Math.max(0, finalTax));
}

const CALC_RESULTS = [
  {
    label: "예상 퇴직소득세 (원천징수)",
    getValue: (v: Record<string, number>) => calcTax(v.amount, v.years),
    format: (v: number) => v < 10000 ? `약 ${v.toLocaleString()}원` : `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "실수령 퇴직금 (세후)",
    getValue: (v: Record<string, number>) => v.amount * 10000 - calcTax(v.amount, v.years),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
  {
    label: "IRP 연금 수령 시 절세액",
    getValue: (v: Record<string, number>) => Math.round(calcTax(v.amount, v.years) * 0.35),
    format: (v: number) => v < 10000 ? `약 ${v.toLocaleString()}원` : `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "퇴직소득원천징수영수증", required: true, where: "회사 발급 (퇴직 시)" },
  { name: "신분증", required: true, where: "IRP 계좌 개설 시 필요" },
  { name: "IRP 계좌 개설 서류", required: false, where: "은행·증권사 (연금 절세 시)" },
  { name: "근로소득원천징수영수증", required: false, where: "회사 발급 (종합소득세 신고 시)" },
];

const STEPS = [
  {
    title: "퇴직소득세 원천징수 (회사 처리)",
    desc: "회사가 퇴직금에서 퇴직소득세를 계산해 차감한 뒤 지급해요. 별도로 신고할 필요는 없어요. 단, 계산이 잘못됐다면 다음 해 5월에 종합소득세 신고로 정산할 수 있어요.",
    tip: "퇴직소득원천징수영수증을 꼭 받아두세요",
  },
  {
    title: "IRP 계좌로 이체 (절세 선택)",
    desc: "퇴직금을 IRP 계좌로 받으면 바로 세금을 내지 않아요. 연금으로 수령할 때 퇴직소득세의 30~40%를 감면해줘요. 장기 절세 효과가 크기 때문에 여유가 있다면 권해요.",
    tip: "퇴직금 300만원 초과 시 IRP 이체 의무화",
  },
  {
    title: "연금 수령 (최대 절세)",
    desc: "IRP에 넣은 퇴직금을 55세 이후 10년 이상 연금으로 나눠 받으면 퇴직소득세의 60~70%만 내요. 일시금 수령 대비 세금이 30~40% 줄어드는 셈이에요.",
    tip: "10년 이상 분할 수령 시 절세 효과 극대화",
  },
  {
    title: "세금 환급 또는 추가 납부 확인",
    desc: "두 군데 이상에서 퇴직금을 받았다면 다음 해 5월 종합소득세 신고 때 합산 정산을 해야 해요. 각 회사에서 별도로 원천징수됐기 때문에 조정이 필요할 수 있어요.",
    tip: "홈택스에서 원천징수 내역 조회 가능",
  },
];

const CHECKLIST = [
  "퇴직소득원천징수영수증: 회사에서 반드시 받아두기",
  "IRP 계좌: 퇴직 전 미리 개설해두면 이체가 빨라요",
  "일시금 vs 연금 비교: 세금 차이를 계산 후 결정",
  "두 곳 이상 퇴직금: 다음 해 5월 종합소득세 신고 필요",
  "세금 환급 여부: 홈택스에서 원천징수 내역 확인",
];

const FAQS = [
  {
    q: "퇴직금에서 세금을 얼마나 떼나요?",
    a: "고정 세율이 아니에요. 근속연수가 길수록, 퇴직금이 적을수록 세율이 낮아요. 10년 근속·3,000만원 기준으로 수십만원 수준이에요. 위 계산기로 확인해보세요.",
  },
  {
    q: "IRP에 넣으면 세금을 안 내나요?",
    a: "당장 안 내는 거예요. 나중에 연금으로 받을 때 퇴직소득세의 60~70%만 내게 돼요. 일시금 수령 대비 30~40% 절세 효과가 있어요.",
  },
  {
    q: "회사에서 세금을 알아서 떼주나요?",
    a: "네, 회사가 원천징수해요. 퇴직금에서 퇴직소득세를 차감한 금액이 입금돼요. 계산이 맞는지 퇴직소득원천징수영수증으로 확인하세요.",
  },
  {
    q: "퇴직금 1,000만원이면 세금이 얼마인가요?",
    a: "근속연수에 따라 달라요. 5년 근속 기준으로 수만원~수십만원 수준이에요. 근속연수 공제 덕분에 소액 퇴직금은 세금이 거의 안 나와요.",
  },
  {
    q: "두 군데서 퇴직금을 받으면 세금은?",
    a: "각 회사에서 별도로 원천징수해요. 다음 해 5월에 종합소득세 신고 때 합산 정산이 필요해요. 추가 납부 또는 환급이 발생할 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "소득세법 제22조: 퇴직소득의 범위", url: "https://www.law.go.kr/법령/소득세법" },
      { label: "소득세법 제48조: 퇴직소득공제 (근속연수공제)", url: "https://www.law.go.kr/법령/소득세법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "국세청: 퇴직소득세 안내", url: "https://www.nts.go.kr" },
      { label: "홈택스: 퇴직소득세 계산기", url: "https://www.hometax.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-세금-절세-방법-IRP-연말정산", title: "IRP로 퇴직금 세금 줄이는 방법", description: "IRP 연금 수령 시 퇴직소득세 30~40% 절세 방법이에요." },
  { slug: "퇴직금-IRP-수령방법", title: "퇴직금 IRP 수령 방법", description: "IRP 계좌 개설부터 연금 설정까지 단계별로 안내해요." },
  { slug: "퇴직금-계산법", title: "퇴직금 계산법, 얼마나 받을까?", description: "평균임금 기준 퇴직금 계산 공식과 실전 예시예요." },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-세금" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 세금 · 절세</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 세금, 얼마나 떼나요?<br />
        퇴직소득세 계산법과 IRP 절세까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금에도 세금이 붙어요. 하지만 근로소득세와 다른 퇴직소득세가 적용되고, 근속연수가 길수록 세금이 줄어드는 구조예요.
        <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법 제22조</a>에서 정한 퇴직소득세 계산 방식과,
        <a href="/w/퇴직금-IRP-수령방법" style={{ color: "#1D9E75", textDecoration: "underline" }}>IRP로 받으면 세금을 30~40% 줄일 수 있는</a> 절세 방법까지 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>퇴직금 세금, 나한테 해당하나요?</H2>
      <p style={body}>
        퇴직금을 받는 모든 근로자에게 퇴직소득세가 적용돼요. 다만 근속연수 공제 덕분에 짧게 근무하거나 퇴직금이 소액이면 세금이 거의 없거나 0원인 경우도 많아요.
      </p>
      <p style={body}>
        퇴직소득세는 회사가 원천징수해서 차감한 뒤 지급해요. 별도로 신고할 필요는 없지만, 두 곳 이상에서 퇴직금을 받으면 다음 해 5월에 합산 정산이 필요해요.
      </p>

      <GreenBox title="퇴직소득세 핵심 구조">
        원칙: 회사가 원천징수 후 지급<br />
        절세: IRP 연금 수령 시 퇴직소득세 30~40% 감면<br />
        주의: 두 곳 이상 수령 시 다음 해 5월 합산 신고 필요
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="퇴직소득세 관련 내용이 해당돼요. 아래 계산기로 예상 세금을 확인해보세요."
        partialMatchText="일부 상황이 달라요. 국세청 상담(126) 또는 홈택스 계산기를 이용해보세요."
      />

      <Divider />

      <H2>내 퇴직소득세, 얼마일까?</H2>
      <p style={body}>
        퇴직소득세는 근속연수 공제 → 환산급여 공제 → 세율 적용 순서로 계산해요.
        복잡하기 때문에 아래 계산기로 예상 금액을 먼저 확인하고, 정확한 금액은 홈택스 계산기로 검증하세요.
        근속연수가 길수록 세금이 줄어드는 구조라서 장기 근속자에게 유리해요.
      </p>

      <SectionBadge>퇴직소득세 간편 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 소득세법 기준 간략 계산. 지방소득세 10% 별도. 정확한 금액은 홈택스 퇴직소득세 계산기에서 확인하세요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>세금 신고에 필요한 서류</H2>
      <p style={body}>
        퇴직소득세는 회사가 원천징수하기 때문에 별도 신고가 필요 없어요.
        다만 IRP 이체나 종합소득세 신고 시엔 아래 서류가 필요해요.
        특히 퇴직소득원천징수영수증은 퇴직 즉시 받아두세요.
      </p>

      <SectionBadge>필요 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>퇴직금 세금 절세 방법 4단계</H2>
      <p style={body}>
        같은 퇴직금이라도 받는 방법에 따라 세금이 크게 달라져요.
        일시금으로 받으면 세금 100%, IRP 연금으로 받으면 60~70%만 내는 구조예요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>퇴직금 세금 준비 체크리스트</H2>
      <p style={body}>
        퇴직 전후로 놓치면 손해인 세금 포인트들이에요. 하나씩 확인해두세요.
      </p>

      <SectionBadge>절세 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="IRP vs 일시금, 세금 차이">
        퇴직금 3,000만원·10년 근속 기준으로 일시금 수령 시 세금이 수십만원이라면,<br />
        IRP 연금(10년 분할) 수령 시엔 30~40%만 내면 돼요.<br />
        금액이 클수록 IRP 절세 효과가 훨씬 커져요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 세금에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 소득세법을 바탕으로 작성됐어요. 세율·공제 기준은 변경될 수 있으니 최신 기준은 국세청(126) 또는 홈택스에서 확인하세요." />
    </ArticleLayout>
  );
}
