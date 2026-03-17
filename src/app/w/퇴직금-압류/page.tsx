"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직금 압류 통지를 받았거나 압류가 우려돼요" },
  { id: "c2", label: "아직 퇴직금을 수령하지 않은 상태예요" },
  { id: "c3", label: "퇴직 전 IRP 계좌를 아직 개설하지 않았어요" },
  { id: "c4", label: "채권자에게 빼앗기지 않고 퇴직금을 지키고 싶어요" },
];

const CALC_SLIDERS = [
  { id: "severance", label: "예상 퇴직금 총액 (만원)", min: 500, max: 20000, step: 500, defaultValue: 3000, format: (v: number) => `${v.toLocaleString()}만원` },
];

const CALC_RESULTS = [
  {
    label: "압류 금지 금액 — 반드시 내 손에 남는 금액",
    getValue: (v: Record<string, number>) => Math.round(v.severance / 2),
    format: (v: number) => `약 ${v.toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "최대 압류 가능 금액 (일반 계좌 기준)",
    getValue: (v: Record<string, number>) => Math.round(v.severance / 2),
    format: (v: number) => `약 ${v.toLocaleString()}만원`,
  },
  {
    label: "IRP 계좌 수령 시 압류 가능 금액",
    getValue: (_v: Record<string, number>) => 0,
    format: (_v: number) => `0원 (전액 압류 금지)`,
  },
];

const DOCS = [
  { name: "압류 명령 통지서", required: true, where: "법원 또는 채권자로부터 수령" },
  { name: "퇴직금 계산 내역서", required: true, where: "회사 인사팀 요청" },
  { name: "IRP 계좌 개설 확인서 (압류 방어용)", required: false, where: "은행·증권사 앱에서 당일 발급" },
  { name: "IRP 이체 요청서 (회사 제출용)", required: false, where: "회사 인사팀 양식 사용" },
  { name: "이의신청서 (과도한 압류 시)", required: false, where: "법원 민원실 또는 대한법률구조공단" },
];

const STEPS = [
  {
    title: "압류 범위 확인 — 1/2 보호 규칙",
    desc: "민사집행법 제246조에 따라 퇴직금의 1/2을 초과하는 금액만 압류할 수 있어요. 퇴직금 3,000만원이면 최대 1,500만원까지만 압류 가능해요. 회사 인사팀에 퇴직금 계산 내역서를 요청해서 정확한 보호 금액부터 파악하세요.",
    tip: "채권이 아무리 커도 퇴직금 절반은 반드시 보호돼요",
  },
  {
    title: "IRP 계좌 개설 후 서면 요청",
    desc: "퇴직 전에 IRP 계좌를 개설하고 인사팀에 서면으로 'IRP 이체 요청'을 제출해요. 퇴직금이 IRP 계좌로 들어오면 근로자퇴직급여보장법 제7조에 따라 계좌 잔액 전액이 압류·양도·담보 제공 금지 대상이에요.",
    tip: "은행·증권사 앱에서 IRP 계좌 개설은 당일 가능해요",
    link: { label: "IRP 계좌 개설 방법", href: "/w/퇴직금-IRP-계좌" },
  },
  {
    title: "압류 통지 받은 경우 이의신청",
    desc: "압류 명령이 회사에 도달하면 회사는 압류 가능 금액을 공탁할 수 있어요. 1/2을 초과한 과도한 압류라면 이의신청으로 다툴 수 있어요. 이의신청 기한이 있으니 결정문을 받은 날 바로 대한법률구조공단(132)에 전화해 무료 상담을 받으세요.",
    tip: "이의신청은 결정문 수령일로부터 1주일 이내가 원칙이에요",
    link: { label: "대한법률구조공단 무료 상담", href: "https://www.klac.or.kr" },
  },
  {
    title: "개인회생·파산 절차 활용",
    desc: "채무가 많아서 압류 자체를 막고 싶다면 개인회생이나 파산 신청을 검토해볼 수 있어요. 개인회생 개시 결정 이후에는 채권자들의 개별 강제집행이 중지돼요. 압류 금지 재산 목록에 퇴직금 1/2이 포함돼서 나머지 절반도 한번 더 보호받아요.",
    tip: "대한법률구조공단(132)에서 무료로 절차 안내를 받을 수 있어요",
  },
];

const CHECKLIST = [
  "압류 범위 확인: 퇴직금의 1/2만 압류 가능 (민사집행법 제246조)",
  "IRP 계좌 개설: 퇴직 전에 미리 개설해두는 게 핵심이에요",
  "회사 인사팀에 IRP 이체 서면 요청 제출",
  "압류 통지 수령 시 이의신청 기한 즉시 확인",
  "대한법률구조공단(132) 무료 법률 상담 활용",
  "채무가 클 경우 개인회생·파산 절차 전문가 상담",
];

const FAQS = [
  {
    q: "퇴직금을 전액 압류당할 수 있나요?",
    a: "아니에요. 민사집행법 제246조에 따라 퇴직금의 1/2은 압류 금지 재산이에요. 채권이 아무리 커도 퇴직금 절반은 반드시 내 손에 남아야 해요.",
  },
  {
    q: "IRP 계좌로 받으면 전혀 압류가 안 되나요?",
    a: "맞아요. 근로자퇴직급여보장법 제7조에 따라 IRP 계좌 잔액은 압류·양도·담보 제공이 모두 금지돼요. 일반 계좌(1/2 보호)보다 훨씬 강한 전액 보호예요. 퇴직 전에 IRP 계좌를 개설하고 인사팀에 서면으로 요청해두는 게 핵심이에요.",
  },
  {
    q: "이미 일반 계좌로 퇴직금을 받았는데 압류가 왔어요",
    a: "계좌에 입금된 뒤라면 민사집행법 제246조 2항에 따라 퇴직금 명목으로 입금된 금액의 1/2만 압류 금지예요. 이미 다른 돈과 섞이거나 시간이 지나면 보호가 어려울 수 있으니 빠르게 법률 상담을 받으세요.",
  },
  {
    q: "압류 통지 후 회사가 퇴직금을 지급하면 어떻게 되나요?",
    a: "회사는 압류 명령 범위 내에서 채권자에게 직접 지급하거나 법원에 공탁할 의무가 생겨요. 회사가 압류 명령을 무시하고 임의로 나에게 전액 지급하면 회사에 채무불이행 책임이 생길 수 있어요.",
  },
  {
    q: "개인회생 신청하면 퇴직금 압류가 중지되나요?",
    a: "개인회생 개시 결정 이후 강제집행이 중지돼요. 퇴직금도 이 범위에 포함될 수 있어요. 법무사나 변호사에게 정확한 적용 범위를 확인하거나 대한법률구조공단(132)에 무료 상담을 받으세요.",
  },
  {
    q: "퇴직연금(DB·DC)도 압류가 안 되나요?",
    a: "퇴직연금은 근로자퇴직급여보장법 제7조에 따라 계좌 잔액 전액이 압류 금지예요. 회사가 적립해둔 퇴직연금이 있다면 일반 퇴직금보다 더 강하게 보호돼요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "민사집행법 제246조: 압류 금지 재산 (퇴직금 1/2)", url: "https://www.law.go.kr/법령/민사집행법" },
      { label: "근로자퇴직급여보장법 제7조: 퇴직급여 압류 금지", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "대한법률구조공단: 무료 법률 상담(132)", url: "https://www.klac.or.kr" },
      { label: "고용노동부: 퇴직급여 제도 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-가압류", title: "퇴직금 가압류 대응 방법", description: "가압류 통지 받았을 때 단계별 대처법이에요." },
  { slug: "퇴직금-IRP-계좌", title: "IRP 계좌 개설 방법", description: "압류 방어를 위한 IRP 계좌 개설 절차예요." },
  { slug: "퇴직금-수령방법", title: "퇴직금 수령 방법", description: "IRP로 안전하게 받는 전체 절차예요." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-압류" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 압류 · 보호</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 압류, 전부 빼앗기나요?<br />
        1/2 보호 한도와 IRP 전액 방어 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금 압류 통지가 날아와도 전액을 빼앗기진 않아요.
        <a href="https://www.law.go.kr/법령/민사집행법" style={{ color: "#1D9E75", textDecoration: "underline" }}>민사집행법 제246조</a>는
        퇴직금의 1/2을 압류 금지 재산으로 보호해요. 퇴직금 3,000만원이라면 최대 1,500만원까지만 압류할 수 있어요.
        더 나아가 퇴직금을 IRP 계좌로 받으면 계좌 잔액 전액이 압류 금지예요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>퇴직금 압류, 얼마나 보호받을 수 있나요?</H2>
      <p style={body}>
        퇴직금에는 두 가지 보호 장치가 있어요. 일반 계좌로 받을 경우 민사집행법 제246조가 퇴직금 전액의 1/2을 압류 금지 재산으로 못 박아요.
        채권이 아무리 커도 절반은 근로자 손에 남아야 해요.
      </p>
      <p style={body}>
        IRP 계좌로 받으면 보호 수준이 전혀 달라져요. <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법 제7조</a>는
        IRP 계좌 잔액 전체를 압류·양도·담보 제공 불가로 막아요. 1/2이 아니라 전부 보호되는 거예요.
      </p>
      <p style={body}>
        퇴직 전에 IRP 계좌를 개설하고 인사팀에 서면으로 IRP 이체를 요청해두는 것만으로 전액 보호가 가능해요.
        이것만 챙겨도 채권자로부터 퇴직금 전체를 지킬 수 있어요.
      </p>

      <GreenBox title="압류 보호 구조 요약">
        일반 계좌 수령: 퇴직금 1/2은 압류 금지 (민사집행법 제246조)<br />
        IRP 계좌 수령: 계좌 잔액 전액 압류 금지 (근로자퇴직급여보장법 제7조)<br />
        퇴직연금(DB·DC): 적립 잔액 전액 압류 금지 (동법 제7조)
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="지금 압류 대응이 필요한 상황이에요. 아래 계산기로 보호 금액부터 확인하세요."
        partialMatchText="상황에 따라 다를 수 있어요. 대한법률구조공단(132) 무료 상담을 권해요."
      />

      <Divider />

      <H2>내 퇴직금 압류 보호 금액 계산해보세요</H2>
      <p style={body}>
        퇴직금 총액을 입력하면 법적으로 보호되는 금액과 최대 압류 가능 금액을 바로 볼 수 있어요.
        일반 계좌로 수령했을 때 기준이에요.
      </p>
      <p style={body}>
        퇴직금 5,000만원이라면 채권자가 가져갈 수 있는 건 최대 2,500만원이에요.
        나머지 2,500만원은 반드시 내 손에 남아야 해요. IRP 계좌로 받으면 금액 상관없이 전액 0원이에요.
      </p>

      <SectionBadge>퇴직금 압류 보호 금액 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 일반 계좌 수령 기준 (민사집행법 제246조). IRP 계좌 수령 시 전액 압류 금지."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>압류 대응에 필요한 서류</H2>
      <p style={body}>
        압류 통지를 받은 뒤 빠르게 움직이려면 서류를 미리 파악해두는 게 좋아요.
        압류 명령 통지서와 퇴직금 계산 내역서는 상황 파악을 위해 즉시 확보하세요.
      </p>
      <p style={body}>
        퇴직 전이라면 IRP 계좌 개설 확인서를 발급받아 인사팀에 이체 요청서와 함께 제출해두는 게 가장 효과적이에요.
        은행·증권사 앱에서 당일 개설과 확인서 발급이 모두 가능해요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>퇴직금 압류 대응 절차 4단계</H2>
      <p style={body}>
        압류 통지를 받은 순간부터 할 일이 있어요. 무작정 기다리면 회사가 압류 가능 금액을 공탁해버려서 나중에 돌려받기 어려워질 수 있어요.
      </p>
      <p style={body}>
        이의신청은 빠를수록 좋아요. 대한법률구조공단(132)은 소득 요건 없이 무료 법률 상담을 제공하니 압류 통지를 받은 당일 바로 전화해보세요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>압류 대응 체크리스트와 주의사항</H2>
      <p style={body}>
        압류 상황에서 놓치기 쉬운 포인트를 항목별로 정리했어요. 퇴직 전이라면 IRP 계좌 개설이 가장 효과적인 사전 대비예요.
        이미 압류 통지가 온 상태라면 이의신청 기한부터 즉시 확인하세요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="IRP 계좌 수령 = 전액 압류 금지">
        퇴직금을 IRP 계좌로 받으면 근로자퇴직급여보장법 제7조에 따라 계좌 잔액 전액이 압류·양도·담보 제공 금지 대상이에요.<br />
        일반 계좌(1/2 보호)보다 훨씬 강한 보호예요. 퇴직 전 IRP 계좌를 미리 개설하고 회사에 서면으로 요청해두는 게 핵심이에요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 압류에 대해 실제로 많이 나오는 질문이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 민사집행법과 근로자퇴직급여보장법을 바탕으로 작성됐어요. 법 개정이 있을 수 있으니 최신 기준은 대한법률구조공단(132) 또는 법제처(www.law.go.kr)에서 확인하세요." />
    </ArticleLayout>
  );
}
