"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "채무가 있고 퇴직금 압류 통보를 받았어요" },
  { id: "c2", label: "퇴직금의 일부를 지킬 수 있는지 알고 싶어요" },
  { id: "c3", label: "IRP 계좌로 받으면 압류를 피할 수 있다고 들었어요" },
  { id: "c4", label: "퇴직금이 얼마인지 계산해보고 싶어요" },
];

const CALC_SLIDERS = [
  { id: "severance", label: "예상 퇴직금 총액", min: 500, max: 10000, step: 500, defaultValue: 3000, format: (v: number) => `${v.toLocaleString()}만원` },
];

const CALC_RESULTS = [
  {
    label: "압류 금지 금액 (1/2)",
    getValue: (v: Record<string, number>) => Math.round(v.severance * 10000 / 2),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "최대 압류 가능 금액 (1/2)",
    getValue: (v: Record<string, number>) => Math.round(v.severance * 10000 / 2),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "압류 명령 통지서", required: true, where: "법원 또는 채권자로부터 수령" },
  { name: "퇴직금 계산 내역서", required: true, where: "회사 인사팀 요청" },
  { name: "IRP 계좌 개설 서류 (압류 방어용)", required: false, where: "은행·증권사" },
  { name: "개인회생·파산 신청서 (해당 시)", required: false, where: "법원 또는 법무사" },
];

const STEPS = [
  {
    title: "압류 범위 확인",
    desc: "퇴직금은 민사집행법에 따라 1/2을 초과하는 금액만 압류할 수 있어요. 즉, 퇴직금의 절반은 반드시 보호돼요. 예를 들어 퇴직금 3,000만원이면 최대 1,500만원까지만 압류 가능해요.",
    tip: "퇴직금 압류 가능 범위 = 퇴직금 × 1/2",
  },
  {
    title: "IRP 계좌로 수령 시 보호",
    desc: "퇴직금이 IRP 계좌로 입금되면 IRP 계좌 잔액은 압류가 금지돼요. 근로자퇴직급여보장법 제7조가 퇴직연금 압류를 금지하고 있어요. IRP 계좌로 수령한 퇴직금은 채권자가 건드릴 수 없어요.",
    tip: "IRP 계좌로 받으면 전액 압류 금지로 보호돼요",
  },
  {
    title: "압류 통지 받은 경우 대응",
    desc: "압류 명령이 회사에 도달하면 회사는 퇴직금 중 압류 가능 금액을 공탁할 수 있어요. 이의 신청을 통해 과도한 압류를 다툴 수 있어요. 개인회생 절차 중이라면 강제집행이 중지될 수 있어요.",
    tip: "이의 신청 기한이 있으니 빠르게 법률 상담을 받으세요",
  },
  {
    title: "법적 보호 절차 확인",
    desc: "개인회생이나 파산 신청 시 채권자들의 개별 압류가 중지돼요. 압류 금지 재산 목록에 퇴직금 1/2이 포함돼요. 법원에 이의 신청이나 압류 취소 신청을 할 수 있어요.",
    tip: "대한법률구조공단(132)에서 무료 법률 상담 가능해요",
  },
];

const CHECKLIST = [
  "압류 가능 범위 — 퇴직금의 1/2만 압류 가능",
  "IRP 수령 — IRP 계좌 잔액은 압류 금지",
  "압류 통지 수령 후 — 이의 신청 기한 확인",
  "개인회생·파산 — 강제집행 중지 가능",
  "법률 상담 — 대한법률구조공단(132) 무료 상담",
];

const FAQS = [
  {
    q: "퇴직금을 전액 압류당할 수 있나요?",
    a: "아니에요. 민사집행법 제246조에 따라 퇴직금의 1/2을 초과하는 금액만 압류 가능해요. 퇴직금 절반은 반드시 보호돼요.",
  },
  {
    q: "IRP 계좌로 받으면 압류 안 되나요?",
    a: "맞아요. 근로자퇴직급여보장법 제7조에 따라 퇴직연금(IRP 포함) 계좌 잔액은 압류·양도·담보 제공이 금지돼요. IRP 계좌로 수령하면 전액이 보호돼요.",
  },
  {
    q: "채무 불이행이 있어도 퇴직금 받을 수 있나요?",
    a: "퇴직금 청구권 자체는 소멸하지 않아요. 압류가 있더라도 보호 금액(1/2)은 반드시 지급받을 수 있어요. IRP 계좌로 받으면 전액 수령 가능해요.",
  },
  {
    q: "압류 통지 후 회사가 퇴직금을 지급하면 어떻게 되나요?",
    a: "회사는 압류 명령 범위 내에서 채권자에게 직접 지급하거나 공탁할 의무가 생겨요. 회사가 임의로 지급하면 채무불이행 책임이 생길 수 있어요.",
  },
  {
    q: "퇴직금 압류를 막을 방법이 있나요?",
    a: "IRP 계좌로 수령하면 전액 압류 금지 보호를 받아요. 개인회생 신청으로 강제집행 중지 효과도 기대할 수 있어요. 법적 보호를 최대한 활용하세요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "민사집행법 제246조 — 압류 금지 재산 (퇴직금 1/2)", url: "https://www.law.go.kr/법령/민사집행법" },
      { label: "근로자퇴직급여보장법 제7조 — 퇴직연금 압류 금지", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "대한법률구조공단 — 법률 상담(132)", url: "https://www.klac.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-가압류", title: "퇴직금 가압류 대응", description: "가압류 통지 받았을 때 대처 방법." },
  { slug: "퇴직금-IRP-계좌", title: "IRP 계좌 개설 방법", description: "퇴직금 압류 방어를 위한 IRP 계좌." },
  { slug: "퇴직금-수령방법", title: "퇴직금 수령 방법", description: "IRP 계좌로 안전하게 받는 방법." },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar items={퇴직금_SIDEBAR} currentSlug="퇴직금-압류" />}
    >
      {/* 브레드크럼 */}
      <p style={{ fontSize: 13, color: "#6B7280", marginBottom: 8 }}>
        퇴직금 · 압류 · 보호
      </p>

      {/* H1 */}
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.35, marginBottom: 6, color: "#111827" }}>
        퇴직금이 압류됐어요, 전부 빼앗기나요?
      </h1>
      <p style={{ fontSize: 18, fontWeight: 500, color: "#374151", marginBottom: 20 }}>
        압류 금지 범위 1/2과 IRP 전액 보호 방법
      </p>

      {/* 인트로 */}
      <p style={body}>
        퇴직금에 압류 통지가 날아오면 수십 년 일한 보상이 한순간에 사라지는 것 같아서 막막하죠. 그런데 법은 근로자를 완전히 무방비 상태로 두지 않아요. <a href="/w/민사집행법" style={{ color: "#1D9E75" }}>민사집행법</a> 제246조는 퇴직금의 절반을 아무도 건드릴 수 없는 압류 금지 재산으로 못 박아두고 있어요. 퇴직금 3,000만원이라면 채권자가 가져갈 수 있는 건 최대 1,500만원이에요.
      </p>
      <p style={body}>
        여기서 한 걸음 더 나아가면 전액을 지킬 수도 있어요. <a href="/w/IRP" style={{ color: "#1D9E75" }}>IRP(개인형 퇴직연금) 계좌</a>로 퇴직금을 받으면 근로자퇴직급여보장법 제7조에 따라 계좌 잔액 전체가 압류·양도 금지 대상이 돼요. 회사에 IRP 계좌로 이체해달라고 요청하는 것만으로도 보호 수준이 완전히 달라지는 거예요.
      </p>
      <p style={body}>
        이 글에서는 압류 범위 계산부터 IRP 전액 보호 방법, 압류 통지 받은 뒤 실제 대응 절차까지 순서대로 설명할게요. 지금 압류 통지를 받은 분이라면 이의 신청 기한이 짧으니 먼저 4단계 절차를 빠르게 읽어보세요.
      </p>

      <ArticleAd position="intro" />

      {/* 적합성 체크 */}
      <EligibilityChecker
        title="이런 상황이신가요?"
        items={CHECK_ITEMS}
        resultMessage="해당 항목이 있다면 아래 내용이 도움될 거예요."
      />

      <Divider />

      {/* H2-1 */}
      <H2>퇴직금 압류, 얼마나 보호받을 수 있나요?</H2>
      <p style={body}>
        퇴직금 압류에서 핵심은 법이 정한 두 가지 보호 장치예요. 첫 번째는 일반 계좌로 받는 경우로, <a href="/w/민사집행법" style={{ color: "#1D9E75" }}>민사집행법</a> 제246조 제1항 제4호가 적용돼요. 퇴직금 전액의 1/2은 압류할 수 없어요. 채권이 아무리 커도 퇴직금의 절반은 근로자 손에 남아야 해요.
      </p>
      <p style={body}>
        두 번째는 IRP 계좌로 받는 경우예요. 근로자퇴직급여보장법 제7조는 퇴직연금 급여를 받을 권리와 퇴직연금 계좌 잔액을 압류·양도·담보 제공할 수 없도록 완전히 차단해요. IRP는 1/2이 아니라 전액이 보호되는 훨씬 강한 보호막이에요.
      </p>
      <GreenBox>
        <strong>압류 보호 구조 요약</strong>
        <br />• 일반 계좌 수령: 퇴직금 1/2은 압류 금지 (민사집행법 제246조)
        <br />• IRP 계좌 수령: 계좌 잔액 전액 압류 금지 (근로자퇴직급여보장법 제7조)
        <br />• IRP 계좌로 받으면 보호 수준이 1/2 → 전액으로 높아져요
      </GreenBox>
      <p style={body}>
        압류 가능 금액을 계산할 때는 세금과 4대보험을 공제하기 전 퇴직금 총액을 기준으로 해요. <a href="/w/퇴직금-소득세" style={{ color: "#1D9E75" }}>퇴직금 소득세</a>나 건강보험료 정산분이 빠져나가고 나면 실수령액은 더 줄어드는데, 여기서 또 1/2을 떼어가면 손에 쥐는 돈이 굉장히 적어지죠. IRP 계좌 활용이 현실적으로 중요한 이유예요.
      </p>

      <Divider />

      {/* H2-2 */}
      <H2>내 퇴직금 압류 가능 금액 확인해보세요</H2>
      <p style={body}>
        퇴직금 총액을 입력하면 법적으로 보호되는 금액과 최대 압류 가능 금액을 바로 계산할 수 있어요. 일반 계좌 수령 기준이에요. IRP 계좌로 수령하면 아래 결과와 무관하게 전액이 보호돼요.
      </p>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="일반 계좌 수령 기준 (IRP 수령 시 전액 보호)"
      />
      <p style={body}>
        예를 들어 퇴직금 5,000만원이라면 압류 금지 금액은 2,500만원, 최대 압류 가능 금액도 2,500만원이에요. 채권자가 5,000만원 전부를 가져가려 해도 법적으로 절반은 막을 수 있어요. IRP 계좌로 받으면 5,000만원 전부를 지킬 수 있고요.
      </p>

      <ArticleAd position="mid" />

      <Divider />

      {/* H2-3 */}
      <H2>압류 대응에 필요한 서류</H2>
      <p style={body}>
        압류 통지를 받은 뒤 빠르게 움직이려면 필요한 서류를 미리 파악해두는 게 좋아요. 필수 서류 두 가지는 현재 상황 파악용이고, 나머지는 적극 방어 전략에 따라 준비해요.
      </p>
      <DocTable docs={DOCS} />
      <p style={body}>
        IRP 계좌 개설은 은행이나 증권사에서 당일 처리 가능해요. 퇴직 전에 미리 개설해두고 회사 인사팀에 IRP 계좌로 퇴직금을 지급해달라고 서면으로 요청하면 돼요. 이미 압류 통지가 들어온 상태라면 법무사나 변호사와 이의 신청 가능 여부를 먼저 확인하세요.
      </p>

      <Divider />

      {/* H2-4 */}
      <H2>퇴직금 압류 대응 절차 4단계</H2>
      <p style={body}>
        압류 통지를 받은 순간부터 할 일이 생겨요. 무작정 기다리면 회사가 압류 가능 금액을 공탁해버려서 나중에 되찾기 어려워질 수 있어요. 아래 4단계를 순서대로 진행하세요.
      </p>
      <Steps steps={STEPS} />
      <p style={body}>
        단계별로 기한이 있어요. 특히 이의 신청은 압류 명령 송달 후 1주일 안에 해야 효과적이에요. 대한법률구조공단(132)은 소득 요건 없이 무료 법률 상담을 제공하니 압류 통지를 받은 당일 바로 전화해보세요.
      </p>

      <Divider />

      <RelatedArticles articles={RELATED} />

      <Divider />

      {/* H2-5 */}
      <H2>압류 대응 체크리스트</H2>
      <p style={body}>
        압류 상황에서 놓치기 쉬운 포인트를 항목별로 정리했어요. 퇴직 전이라면 IRP 계좌 개설이 가장 효과적인 사전 대비책이에요. 이미 압류 통지가 온 상태라면 이의 신청 기한부터 확인하세요.
      </p>
      <Checklist items={CHECKLIST} />
      <GreenBox>
        <strong>IRP 계좌 수령 = 전액 압류 금지</strong>
        <br />
        퇴직금을 IRP 계좌로 받으면 근로자퇴직급여보장법 제7조에 따라 계좌 잔액 전액이 압류·양도·담보 제공 금지 대상이에요. 일반 계좌 수령(1/2 보호)보다 훨씬 강한 보호를 받을 수 있어요. 퇴직 전 IRP 계좌를 미리 개설하고 회사에 서면으로 요청해두는 게 핵심이에요.
      </GreenBox>

      <Divider />

      {/* H2-6 */}
      <H2>자주 묻는 것들</H2>
      <p style={body}>
        압류 관련 가장 많이 나오는 질문들이에요. 상황이 비슷하다면 해당 답변에서 힌트를 얻을 수 있어요. 개별 사정에 따라 결과가 달라질 수 있으니 중요한 결정 전에는 법률 전문가와 상담하세요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References sections={REFERENCES} />
      <Disclaimer />
    </ArticleLayout>
  );
}
