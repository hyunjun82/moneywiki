"use client";
import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "채권자로부터 퇴직금 가압류 통보를 받았어요" },
  { id: "c2", label: "퇴직금이 아직 지급되지 않은 상태예요" },
  { id: "c3", label: "IRP 계좌가 아직 개설되지 않았어요" },
  { id: "c4", label: "가압류 금액이 퇴직금의 절반을 초과해요" },
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
  { name: "IRP 계좌 개설 서류 (방어용)", required: false, where: "은행·증권사 앱" },
  { name: "이의 신청서 (가압류 이의 신청 시)", required: false, where: "법원 또는 법무사 작성" },
];

const STEPS = [
  {
    title: "가압류 범위 확인",
    desc: "퇴직금은 민사집행법 제246조에 따라 1/2을 초과하는 금액만 가압류할 수 있어요. 퇴직금의 절반은 반드시 보호돼요. 퇴직금 3,000만원이면 최대 1,500만원까지만 가압류 가능해요.",
    tip: "가압류 가능 범위 = 퇴직금 × 1/2",
  },
  {
    title: "IRP 계좌 수령으로 전액 보호",
    desc: "퇴직금을 IRP 계좌로 수령하면 가압류 대상에서 제외돼요. 근로자퇴직급여보장법 제7조가 퇴직연금 계좌 잔액의 압류·양도·담보 제공을 금지해요. IRP 계좌에 있는 한 채권자가 건드릴 수 없어요.",
    tip: "IRP 계좌 개설 후 계좌번호를 인사팀에 서면으로 전달하세요",
  },
  {
    title: "가압류 이의 신청",
    desc: "가압류 결정이 과도하거나 부당하면 법원에 이의 신청을 할 수 있어요. 이의 신청이 인정되면 가압류 취소 또는 금액 조정이 가능해요. 결정문을 받으면 빠르게 대한법률구조공단(132)에서 무료 상담을 받으세요.",
    tip: "이의 신청 기한이 있으니 결정문 받은 날 바로 움직이세요",
  },
  {
    title: "개인회생·파산으로 강제집행 중지",
    desc: "개인회생 또는 파산 신청을 하면 채권자들의 개별 가압류·강제집행이 중지돼요. 회생 절차 중에는 퇴직금 압류가 금지돼요. 채무가 많아 정리가 필요하다면 전문가와 상담해보세요.",
    tip: "개인회생 신청은 법원에 직접 하거나 법무사·변호사 도움을 받아요",
  },
];

const CHECKLIST = [
  "가압류 범위 확인: 퇴직금의 1/2만 가압류 가능 (민사집행법 제246조)",
  "IRP 계좌 개설 후 인사팀에 계좌번호 서면 전달",
  "법원 이의 신청 기한 즉시 확인",
  "필요 시 개인회생·파산으로 강제집행 중지 검토",
  "대한법률구조공단(132) 무료 법률 상담 활용",
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
    a: "맞아요. 가압류 금액을 초과하는 부분은 정상적으로 수령할 수 있어요. 3,000만원 퇴직금에 1,000만원 가압류라면 2,000만원은 정상 수령해요.",
  },
  {
    q: "퇴직금 가압류와 압류의 차이는 뭔가요?",
    a: "가압류는 본안 소송 전 임시 조치로 재산을 동결하는 거예요. 압류는 확정 판결 후 강제로 재산을 취득하는 절차예요. 둘 다 퇴직금의 1/2 초과 금액만 가능해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "민사집행법 제246조: 압류 금지 재산 (퇴직금 1/2)", url: "https://www.law.go.kr/법령/민사집행법" },
      { label: "근로자퇴직급여보장법 제7조: 퇴직연금 압류 금지", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "대한법률구조공단: 무료 법률 상담 (132)", url: "https://www.klac.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-압류", title: "퇴직금 압류 대응 방법", description: "압류와 가압류의 차이와 대응 절차." },
  { slug: "퇴직금-IRP-계좌", title: "IRP 계좌 개설 방법", description: "가압류 방어를 위한 IRP 계좌 개설." },
  { slug: "퇴직금-수령방법", title: "퇴직금 수령 방법", description: "IRP 계좌로 안전하게 받는 방법." },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-가압류" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 가압류 · 보호</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금에 가압류가 걸렸어요, 어떻게 해야 하나요?<br />
        1/2 보호 원칙과 IRP 전액 방어 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금에 가압류 통보를 받으면 당황하기 쉽죠. 그런데 법적으로 퇴직금 절반은 무조건 보호받아요.
        <a href="https://www.law.go.kr/법령/민사집행법" style={{ color: "#1D9E75", textDecoration: "underline" }}>민사집행법 제246조</a>가
        퇴직금의 1/2은 가압류 금지 재산으로 못 박아놨어요.
        더 나아가 <a href="/w/퇴직금-IRP-수령방법" style={{ color: "#1D9E75", textDecoration: "underline" }}>IRP 계좌로 수령하면 전액 가압류 금지</a>예요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>내 상황이 가압류 전액 방어 가능한지 확인해보세요</H2>
      <p style={body}>
        퇴직금 가압류는 상황에 따라 대응 방법이 달라요. IRP 계좌가 없는 상태라면 지금 바로 개설해두는 게 가장 효과적인 방어 수단이에요.
        가압류 통보 전이라도 IRP로 수령 지정을 해두면 입금 순간부터 전액 보호돼요.
      </p>
      <p style={body}>
        가압류 금액이 퇴직금의 절반을 초과한다면 법원 이의 신청이 필요해요.
        퇴직금은 생계 자금이라 법이 특별히 절반을 보호해줘요.
      </p>

      <GreenBox title="퇴직금 가압류 보호 원칙">
        민사집행법 제246조: 퇴직금 1/2은 가압류 금지<br />
        근로자퇴직급여보장법 제7조: IRP 계좌 잔액 전액 가압류 금지
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="IRP 계좌를 지금 바로 개설하세요. 퇴직금이 IRP로 입금되면 전액 가압류 금지예요. 아래 계산기로 보호 금액도 확인해보세요."
        partialMatchText="일부 조건만 해당돼요. 가압류 범위와 IRP 전환 여부를 아래에서 확인하세요."
      />

      <Divider />

      <H2>내 퇴직금 가압류 가능 금액 확인</H2>
      <p style={body}>
        예상 퇴직금을 입력하면 보호받는 금액과 채권자가 가압류할 수 있는 최대 금액을 확인할 수 있어요.
        법적으로 두 금액은 항상 같아요. 퇴직금의 정확히 절반이 각각의 기준이에요.
      </p>
      <p style={body}>
        IRP 계좌로 받는 순간 이 계산은 의미가 없어져요. 가압류 가능 금액이 0원이 되거든요.
        퇴직금이 많을수록 IRP 전환 효과가 커요. 3,000만원이면 1,500만원을 추가로 지키는 셈이에요.
      </p>

      <SectionBadge>가압류 가능 금액 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 민사집행법 제246조 기준. IRP 계좌로 수령하면 가압류 가능 금액은 0원이에요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>가압류 대응에 필요한 서류</H2>
      <p style={body}>
        가압류 결정문을 받으면 어떤 서류가 필요한지 미리 파악해두는 게 좋아요.
        IRP 전환을 선택하든, 이의 신청을 하든 준비해야 할 서류가 달라요.
      </p>
      <p style={body}>
        가압류 결정문에는 가압류 금액, 청구 원인, 제3채무자(회사) 정보가 적혀 있어요.
        퇴직금 계산 내역서는 보호받는 금액의 기준이 되니 인사팀에 요청해서 받아두세요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>가압류 대응 절차 4단계</H2>
      <p style={body}>
        가압류 통보를 받았다고 무조건 손해를 보는 건 아니에요. 상황에 맞는 대응 방법을 선택하면 퇴직금을 최대한 지킬 수 있어요.
        IRP 전환이 가장 간단하고 확실한 방법이에요.
      </p>
      <p style={body}>
        이의 신청은 가압류 자체가 부당하거나 금액이 잘못됐을 때 유효해요.
        개인회생·파산은 채무 전반을 정리해야 하는 상황에서 검토해요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>가압류 대응 체크리스트</H2>
      <p style={body}>
        가압류 통보를 받은 뒤 챙겨야 할 것들을 정리했어요. IRP 전환 여부가 가장 먼저 결정해야 할 핵심이에요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="IRP 계좌로 수령하면 전액 가압류 불가예요">
        근로자퇴직급여보장법 제7조에 따라 IRP 계좌 잔액은 압류·가압류 금지예요.<br />
        가압류 통보 전이라도 IRP 계좌를 미리 개설해두고 인사팀에 알려주면 돼요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 가압류에 관해 자주 나오는 질문들이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 민사집행법·근로자퇴직급여보장법을 바탕으로 작성됐어요. 개인 상황에 따라 다를 수 있으니 법률 상담을 받으세요." />
    </ArticleLayout>
  );
}
