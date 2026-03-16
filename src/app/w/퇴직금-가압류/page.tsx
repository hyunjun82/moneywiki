"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const currentSlug = "퇴직금-가압류";

const CHECK_ITEMS = [
  { id: "c1", label: "채권자로부터 퇴직금 가압류 통보를 받았어요" },
  { id: "c2", label: "퇴직금의 일부를 지킬 수 있는지 알고 싶어요" },
  { id: "c3", label: "IRP 계좌로 받으면 가압류를 피할 수 있다고 들었어요" },
  { id: "c4", label: "가압류 이의 신청 방법을 알고 싶어요" },
];

const CALC_SLIDERS = [
  {
    id: "severance",
    label: "예상 퇴직금 총액",
    min: 500,
    max: 10000,
    step: 500,
    defaultValue: 3000,
    format: (v: number) => `${v.toLocaleString()}만원`,
  },
];

const CALC_RESULTS = [
  {
    label: "가압류 금지 금액 (퇴직금의 1/2)",
    getValue: (v: Record<string, number>) => Math.round(v.severance * 10000 / 2),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "최대 가압류 가능 금액 (퇴직금의 1/2)",
    getValue: (v: Record<string, number>) => Math.round(v.severance * 10000 / 2),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "가압류 결정문 사본", required: true, where: "법원으로부터 수령" },
  { name: "퇴직금 계산 내역서", required: true, where: "회사 인사팀 요청" },
  { name: "IRP 계좌 개설 서류 (방어용)", required: false, where: "은행·증권사" },
  { name: "이의 신청서 (가압류 이의 신청 시)", required: false, where: "법원 또는 법무사 작성" },
];

const STEPS = [
  {
    title: "가압류 범위 확인",
    desc: "퇴직금은 민사집행법에 따라 1/2을 초과하는 금액만 가압류할 수 있어요. 퇴직금의 절반은 반드시 보호돼요. 예를 들어 퇴직금 3,000만원이면 최대 1,500만원까지만 가압류 가능해요.",
    tip: "가압류 가능 범위 = 퇴직금 × 1/2",
  },
  {
    title: "IRP 계좌 수령으로 전액 보호",
    desc: "퇴직금을 IRP 계좌로 수령하면 가압류 대상에서 제외돼요. 근로자퇴직급여보장법 제7조가 퇴직연금 계좌 잔액의 압류·양도·담보 제공을 금지해요. IRP 계좌에 있는 한 채권자가 건드릴 수 없어요.",
    tip: "IRP 계좌 개설 후 계좌번호를 인사팀에 알려주세요",
  },
  {
    title: "가압류 이의 신청",
    desc: "가압류 결정이 과도하거나 부당하면 법원에 이의 신청을 할 수 있어요. 이의 신청이 인정되면 가압류 취소 또는 금액 조정이 가능해요. 이의 신청 기한이 있으니 결정문을 받으면 빠르게 법률 상담을 받으세요.",
    tip: "대한법률구조공단(132)에서 무료 법률 상담 가능",
  },
  {
    title: "개인회생·파산으로 강제집행 중지",
    desc: "개인회생 또는 파산 신청을 하면 채권자들의 개별 가압류·강제집행이 중지돼요. 회생 절차 중에는 퇴직금 압류가 금지돼요. 채무가 많아 정리가 필요하다면 전문가와 상담해보세요.",
    tip: "개인회생 신청은 법원에 직접 하거나 법무사·변호사 도움을 받아요",
  },
];

const CHECKLIST = [
  { label: "가압류 범위", desc: "퇴직금의 1/2만 가압류 가능" },
  { label: "IRP 수령", desc: "IRP 계좌 잔액은 가압류 금지" },
  { label: "이의 신청", desc: "법원 이의 신청 기한 확인" },
  { label: "개인회생·파산", desc: "강제집행 중지 가능" },
  { label: "법률 상담", desc: "대한법률구조공단(132) 무료 상담" },
];

const FAQS = [
  {
    q: "퇴직금 가압류를 전액 당할 수 있나요?",
    a: "아니에요. 민사집행법 제246조에 따라 퇴직금의 1/2은 가압류 금지 재산이에요. 퇴직금 절반은 반드시 보호돼요.",
  },
  {
    q: "IRP로 받으면 가압류가 안 되나요?",
    a: "맞아요. 근로자퇴직급여보장법 제7조에 따라 IRP 계좌 잔액은 압류·가압류·양도·담보 설정이 금지돼요. IRP 계좌로 수령하면 전액 보호예요.",
  },
  {
    q: "가압류 통보가 회사에 갔어요, 어떻게 되나요?",
    a: "가압류 결정이 제3채무자(회사)에 송달되면 회사는 퇴직금 지급을 보류할 수 있어요. 가압류 금액 범위에서 공탁하거나 법원 지시를 기다려요.",
  },
  {
    q: "가압류 금액이 퇴직금 전체보다 작으면 나머지는 받나요?",
    a: "맞아요. 가압류 금액을 초과하는 부분은 정상적으로 수령할 수 있어요. 예를 들어 3,000만원 퇴직금에 1,000만원 가압류라면, 2,000만원은 정상 수령해요.",
  },
  {
    q: "퇴직금 가압류와 압류의 차이는 뭔가요?",
    a: "가압류는 본안 소송 전 임시 조치로 재산을 동결하는 거예요. 압류는 확정 판결 후 강제로 재산을 취득하는 절차예요. 둘 다 퇴직금의 1/2 초과 금액만 가능해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    name: "민사집행법 제246조 — 압류 금지 재산 (퇴직금 1/2)",
    url: "https://www.law.go.kr/법령/민사집행법",
  },
  {
    category: "법령",
    name: "근로자퇴직급여보장법 제7조 — 퇴직연금 압류 금지",
    url: "https://www.law.go.kr/법령/근로자퇴직급여보장법",
  },
  {
    category: "공식",
    name: "대한법률구조공단 — 무료 법률 상담 (132)",
    url: "https://www.klac.or.kr",
  },
];

const RELATED = [
  {
    slug: "퇴직금-압류",
    title: "퇴직금 압류 대응 방법",
    desc: "압류와 가압류의 차이와 대응 절차.",
  },
  {
    slug: "퇴직금-IRP-계좌",
    title: "IRP 계좌 개설 방법",
    desc: "가압류 방어를 위한 IRP 계좌 개설.",
  },
  {
    slug: "퇴직금-수령방법",
    title: "퇴직금 수령 방법",
    desc: "IRP 계좌로 안전하게 받는 방법.",
  },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar items={퇴직금_SIDEBAR} currentSlug={currentSlug} />}
    >
      {/* 타이틀 */}
      <div style={{ marginBottom: 24 }}>
        <p style={{ ...body.badge, marginBottom: 8 }}>퇴직금 · 가압류 · 보호</p>
        <h1 style={body.h1}>
          퇴직금에 가압류가 걸렸어요, 어떻게 해야 하나요?
          <br />
          <span style={body.h1sub}>1/2 보호 원칙과 IRP 전액 방어 방법</span>
        </h1>
      </div>

      {/* 인트로 */}
      <p style={body.prose}>
        퇴직금에 가압류 통보를 받으면 당황하기 쉽죠. 그런데 법적으로 퇴직금 절반은 무조건 보호받아요.{" "}
        <a href="https://www.law.go.kr/법령/민사집행법" style={body.link} target="_blank" rel="noopener noreferrer">민사집행법 제246조</a>가
        퇴직금의 1/2은 가압류 금지 재산으로 못 박아놨거든요. 채권자가 원해도 절반은 건드릴 수 없어요.
      </p>
      <p style={body.prose}>
        더 나아가 <a href="/w/퇴직금-수령방법" style={body.link}>IRP 계좌로 수령하면 전액 가압류 금지</a>예요.{" "}
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={body.link} target="_blank" rel="noopener noreferrer">근로자퇴직급여보장법 제7조</a>가
        IRP 계좌 잔액의 압류·양도·담보 제공을 아예 막아놨어요. 아래에서 보호 범위와 구체적인 대응 방법을 풀어드릴게요.
      </p>

      <ArticleAd position="intro" />

      <Divider />

      {/* 섹션 1: 가압류 보호 범위 */}
      <H2>퇴직금 가압류, 얼마까지 보호받나요?</H2>

      <p style={body.prose}>
        퇴직금은 생계와 직결된 돈이라 법이 특별히 보호해요. 민사집행법 제246조 1항 5호에 따라 퇴직금의 1/2에 해당하는 금액은
        가압류·압류가 불가능해요. 퇴직금 4,000만원이면 2,000만원은 어떤 상황에서도 온전히 받을 수 있어요.
      </p>

      <GreenBox>
        퇴직금 가압류 보호 원칙<br />
        · 민사집행법 제246조: 퇴직금 1/2은 가압류 금지<br />
        · 근로자퇴직급여보장법 제7조: IRP 계좌 잔액 전액 가압류 금지<br />
        · IRP 계좌로 수령하면 채권자가 전혀 건드릴 수 없어요
      </GreenBox>

      <p style={body.prose}>
        일반 계좌로 수령하면 1/2만 보호돼요. 반면 IRP 계좌로 받으면 전액 보호예요. 가압류 통보를 받기 전에 IRP 계좌를 개설하고
        인사팀에 계좌번호를 알려두면, 퇴직금이 IRP로 입금되는 순간부터 채권자는 손을 댈 수 없어요.
      </p>

      <BorderBox>
        <strong>가압류 가능 금액 계산 (민사집행법 제246조)</strong><br />
        · 일반 계좌 수령: 퇴직금의 1/2까지만 가압류 가능<br />
        · IRP 계좌 수령: 가압류 불가 (전액 보호)<br />
        · 예시: 퇴직금 3,000만원 → 일반 계좌 시 최대 1,500만원 가압류 가능
      </BorderBox>

      <p style={body.prose}>
        가압류는 본안 소송 전 임시 보전 조치예요. 채권자가 소송에서 이기면 나중에 압류·추심으로 이어져요.
        통보를 받은 시점에 빠르게 IRP 전환 또는 이의 신청 여부를 결정하는 게 중요해요.
      </p>

      <Divider />

      {/* 섹션 2: 계산기 */}
      <H2>내 퇴직금 가압류 가능 금액 확인해보세요</H2>

      <p style={body.prose}>
        예상 퇴직금을 입력하면 보호받는 금액과 채권자가 가압류할 수 있는 최대 금액이 바로 나와요.
        법적으로 두 금액은 항상 같아요. 퇴직금의 정확히 절반이 각각의 기준이에요.
      </p>

      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 민사집행법 제246조 기준. IRP 계좌로 수령하면 가압류 가능 금액은 0원이에요."
      />

      <p style={body.prose}>
        IRP 계좌로 받는 순간 위 계산은 의미가 없어져요. 가압류 가능 금액이 0원이 되거든요.
        퇴직금이 많을수록 IRP 전환 효과가 커요. 3,000만원이면 1,500만원을 지키는 셈이에요.
      </p>

      <CategoryButton href="/w/퇴직금" label="퇴직금 가이드 전체 보기" />

      <RelatedArticles articles={RELATED} />

      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3: 서류 */}
      <H2>가압류 대응에 필요한 서류</H2>

      <p style={body.prose}>
        가압류 결정문을 받으면 어떤 서류가 필요한지 미리 파악해두는 게 좋아요.
        IRP 전환을 선택하든, 이의 신청을 하든 준비해야 할 서류가 달라요.
      </p>

      <DocTable docs={DOCS} />

      <p style={body.prose}>
        가압류 결정문에는 가압류 금액, 청구 원인, 제3채무자(회사) 정보가 적혀 있어요.
        퇴직금 계산 내역서는 보호받는 금액의 기준이 되니 인사팀에 요청해서 받아두세요.
        이의 신청을 고려한다면 법무사나 변호사와 상담 후 이의 신청서를 작성하는 게 안전해요.
      </p>

      <Divider />

      {/* 섹션 4: 대응 절차 */}
      <H2>가압류 대응 절차 4단계</H2>

      <p style={body.prose}>
        가압류 통보를 받았다고 무조건 손해를 보는 건 아니에요. 상황에 맞는 대응 방법을 선택하면
        퇴직금을 최대한 지킬 수 있어요. 아래 4단계를 순서대로 검토해보세요.
      </p>

      <Steps steps={STEPS} />

      <p style={body.prose}>
        단계별로 효과가 달라요. IRP 전환이 가장 간단하고 확실한 방법이에요. 이의 신청은 가압류 자체가 부당하거나
        금액이 잘못됐을 때 유효해요. 개인회생·파산은 채무 전반을 정리해야 하는 상황에서 검토해요.
      </p>

      <Divider />

      {/* 섹션 5: 체크리스트 */}
      <H2>가압류 대응 체크리스트</H2>

      <p style={body.prose}>
        가압류 통보를 받은 뒤 챙겨야 할 것들을 한눈에 볼 수 있게 정리했어요.
        IRP 전환 여부가 가장 먼저 결정해야 할 핵심이에요.
      </p>

      <Checklist items={CHECKLIST} />

      <GreenBox>
        IRP 계좌로 수령하면 전액 가압류 불가예요<br />
        · 근로자퇴직급여보장법 제7조: IRP 계좌 잔액 압류·가압류 금지<br />
        · 가압류 통보 전이라도 IRP 계좌를 미리 개설해두면 돼요<br />
        · 인사팀에 IRP 계좌번호를 알려주면 퇴직금이 자동으로 입금돼요
      </GreenBox>

      <EligibilityChecker
        title="나에게 해당하는 상황 체크"
        items={CHECK_ITEMS}
      />

      <Divider />

      {/* 섹션 6: FAQ */}
      <H2>자주 묻는 것들</H2>

      <FAQ items={FAQS} />

      <References items={REFERENCES} />

      <Disclaimer />
    </ArticleLayout>
  );
}
