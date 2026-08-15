"use client";
import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR, 퇴직금_HIGHLIGHT } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "1년 이상 계속 근무하고 주 15시간 이상 일했어요" },
  { id: "c2", label: "퇴직 후 14일이 지났는데 퇴직금이 입금되지 않았어요" },
  { id: "c3", label: "퇴직일로부터 3년(소멸시효)이 아직 지나지 않았어요" },
  { id: "c4", label: "회사에 지급 요청했지만 무응답이거나 거부하고 있어요" },
];

const CALC_SLIDERS = [
  { id: "amount", label: "미지급 퇴직금", min: 100, max: 5000, step: 100, defaultValue: 1000, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "months", label: "미지급 기간", min: 1, max: 36, step: 1, defaultValue: 6, format: (v: number) => `${v}개월` },
];

const CALC_RESULTS = [
  {
    label: "지연이자 (연 20%, 14일 초과분)",
    getValue: (v: Record<string, number>) =>
      Math.round(v.amount * 10000 * 0.2 * (Math.max(0, v.months * 30 - 14)) / 365),
    format: (v: number) => v < 10000 ? `${v.toLocaleString()}원` : `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "총 청구 가능 금액 (원금 + 지연이자)",
    getValue: (v: Record<string, number>) => {
      const interest = Math.round(v.amount * 10000 * 0.2 * (Math.max(0, v.months * 30 - 14)) / 365);
      return v.amount * 10000 + interest;
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "근로계약서", required: true, where: "입사 시 수령본 또는 인사팀 재발급" },
  { name: "사직서 또는 해고통지서", required: true, where: "본인 보관 또는 인사팀" },
  { name: "급여명세서 (최근 3개월)", required: true, where: "회사 인사팀 요청" },
  { name: "내용증명 발송 영수증", required: false, where: "우체국 또는 카카오 전자내용증명" },
  { name: "4대보험 가입이력 확인서", required: false, where: "고용24 무료 조회·출력" },
];

const STEPS = [
  {
    title: "회사에 직접 청구 — 기록을 남기세요",
    desc: "문자·이메일·카카오톡으로 '○월 ○일까지 퇴직금 ○○만원을 지급해 주세요'라고 요청해요. 전화는 기록이 남지 않아서 불리해요. 요청 메시지는 반드시 캡처해서 저장하세요. 이 기록이 나중에 증거가 돼요.",
    tip: "요청 메시지에 금액을 명시하면 나중에 분쟁 시 유리해요",
  },
  {
    title: "내용증명 발송 — 지연이자 청구 의사 명시",
    desc: "문자 요청 후에도 지급이 없으면 내용증명을 발송해요. '퇴직금 ○○만원 및 14일 초과분 연 20% 지연이자를 ○일 이내 지급해 달라'는 내용을 넣어야 해요. 우체국 방문 또는 카카오 전자내용증명으로 10분 안에 발송 가능하고, 발송 즉시 소멸시효가 6개월 중단돼요.",
    tip: "지연이자 청구 의사를 명시하지 않으면 원금만 받게 될 수 있어요",
  },
  {
    title: "고용노동부 임금체불 진정 접수",
    desc: "고용24(ei.go.kr)에서 온라인으로 무료 접수해요. 진정서에 '퇴직금 ○○만원 및 연 20% 지연이자 포함 청구'를 명시해야 해요. 접수 즉시 소멸시효가 완전히 중단되고, 근로감독관이 배정돼서 사업주에게 시정 명령을 내려요. 대부분 이 단계에서 해결돼요.",
    tip: "진정 접수는 무료. 방문은 관할 고용노동청 근로감독과로 가세요",
    link: { label: "고용24에서 진정 접수하기", href: "https://www.ei.go.kr" },
  },
  {
    title: "소액심판 또는 민사소송 — 폐업 시 체당금",
    desc: "진정 이후에도 지급하지 않으면 법원에 소액심판(3,000만원 이하)을 신청해요. 변호사 없이 직접 신청 가능하고, 인지대는 수만 원 수준이에요. 회사가 폐업했다면 고용노동부에 체당금(임금채권보장제도)을 신청하면 정부가 대신 지급해줘요. 대한법률구조공단(132)에서 무료 법률 지원도 받을 수 있어요.",
    tip: "폐업 회사라면 체당금 신청이 우선이에요 — 폐업 후 2년 내 신청해야 해요",
  },
];

const CHECKLIST = [
  "직접 청구 기록 보존: 문자·이메일·카카오톡 캡처",
  "내용증명에 '연 20% 지연이자 포함' 명시 — 없으면 원금만 받아요",
  "소멸시효 3년: 퇴직일 기준 3년 내 진정 접수",
  "고용24 진정서: 퇴직금 + 지연이자 금액 모두 기재",
  "폐업 시 체당금 신청: 폐업 후 2년 내, 고용노동부 접수",
];

const FAQS = [
  {
    q: "내용증명을 보내면 얼마나 효과가 있나요?",
    a: "법적 청구 의사를 공식적으로 전달하는 거예요. 많은 회사가 내용증명을 받으면 바로 지급해요. 소멸시효도 6개월 중단되는 효과가 있어요.",
  },
  {
    q: "노동청 진정은 얼마나 걸리나요?",
    a: "보통 1~3개월이에요. 단순 미지급 건은 더 빠르게 처리되는 경우가 많아요. 민사소송(6개월~1년)보다 훨씬 빠르고 무료예요.",
  },
  {
    q: "회사가 폐업했으면 어떻게 받나요?",
    a: "체당금 제도로 고용노동부에서 대신 받을 수 있어요. 파산 선고일 또는 폐업일로부터 2년 내 신청해야 해요. 퇴직금 전액이 아닌 일정 한도 내에서 지급돼요.",
  },
  {
    q: "지연이자도 같이 받을 수 있나요?",
    a: "받을 수 있어요. 진정서나 소송장에 '연 20% 지연이자 포함'을 명시해야 받을 수 있어요. 자동으로 주지 않으니 반드시 명시하세요.",
  },
  {
    q: "소액심판이 뭔가요?",
    a: "3,000만원 이하 분쟁을 법원에서 빠르게 해결하는 절차예요. 변호사 없이 직접 신청 가능하고 인지대가 수만 원이에요. 판결이 나면 강제집행도 가능해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제36조: 퇴직 후 14일 이내 금품 청산 의무", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로기준법 제37조: 지연이자 연 20%", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "임금채권보장법: 체당금 제도", url: "https://www.law.go.kr/법령/임금채권보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24: 임금체불 진정 접수", url: "https://www.ei.go.kr" },
      { label: "고용노동부: 임금체불 처리 절차 안내", url: "https://www.moel.go.kr" },
      { label: "대한법률구조공단: 무료 법률 지원 (132)", url: "https://www.klac.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-미지급-신고", title: "퇴직금 미지급 신고 방법", description: "노동청 접수부터 처리까지 안내해요." },
  { slug: "퇴직금-지급-청구-방법", title: "퇴직금 지급 청구 방법", description: "퇴직금 청구서 작성과 제출 방법이에요." },
  { slug: "회사-폐업-퇴직금", title: "회사 폐업 시 퇴직금 받는 방법", description: "체당금 신청 조건과 절차를 정리했어요." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} highlightSlugs={퇴직금_HIGHLIGHT} currentSlug="퇴직금-미지급-지급받는-방법" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 미지급 · 해결 방법</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금을 못 받았을 때 어떻게 해야 하나요?<br />
        직접 청구부터 노동청 신고, 소액심판까지 4단계
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금을 못 받았다면 지금 바로 행동해야 해요.{" "}
        <a href="/w/퇴직금-지급-기한" style={{ color: "#1D9E75", textDecoration: "underline" }}>14일 기한</a>을
        넘긴 순간부터{" "}
        <a href="/w/퇴직금-지연이자" style={{ color: "#1D9E75", textDecoration: "underline" }}>연 20% 지연이자</a>가
        붙기 시작하고, 3년이 지나면 청구권 자체가 소멸해요.
        내용증명 → 노동청 진정 순서로만 밟으면 대부분 3단계 이내에서 해결돼요.
        단계별 대응법과 폐업 시 체당금 신청 방법까지 전부 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>지금 당장 퇴직금을 청구할 수 있는 상황인가요?</H2>
      <p style={body}>
        퇴직금 청구 자격은 1년 이상 근무 + 주 15시간 이상 근로예요.
        이 조건을 갖췄다면 퇴직일로부터 3년 안에 언제든 청구할 수 있어요.
      </p>
      <p style={body}>
        14일 기한이 지났다면 이미 지연이자가 쌓이고 있어요.
        소멸시효 3년이 임박했다면 내용증명부터 발송해서 시효를 끊는 게 먼저예요.
      </p>

      <GreenBox>
        1단계: 문자·이메일로 지급 요청 (기록 남기기)<br />
        2단계: 내용증명 발송 (지연이자 명시 + 소멸시효 중단)<br />
        3단계: 고용노동부 임금체불 진정 (무료, 1~3개월 처리)<br />
        4단계: 소액심판·민사소송 또는 폐업 시 체당금 신청
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="지금 바로 내용증명 발송이 필요한 상황이에요. 아래 절차를 따라 진행하세요."
        partialMatchText="상황에 따라 다를 수 있어요. 고용노동부(1350)에 먼저 상담하세요."
      />

      <Divider />

      <H2>지연이자 얼마나 받을 수 있나요?</H2>
      <p style={body}>
        퇴직금 1,000만원을 6개월 받지 못했다면 지연이자만 30만원이 넘어요.
        노동청 진정 단계에서 함께 청구해야 받을 수 있고, 빠뜨리면 원금만 받게 돼요.
      </p>
      <p style={body}>
        지연이자 계산은 퇴직 후 14일 초과 다음 날부터 시작해요.
        아래 계산기에서 기간을 조정하면 예상 지연이자를 바로 확인할 수 있어요.
      </p>

      <SectionBadge>지연이자 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 퇴직 후 14일 초과분부터 연 20% 지연이자 발생 (근로기준법 제37조). 소멸시효 3년."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>각 단계에서 필요한 서류</H2>
      <p style={body}>
        노동청 진정에는 서류가 많지 않아도 돼요.
        근로 사실과 미지급 사실만 증명하면 충분하고, 없는 서류는 온라인으로 대체할 수 있어요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <BorderBox>
        통장 입금 내역 + 카카오톡 대화 + 동료 증언만 있어도 진정 접수는 가능해요.
        4대보험 가입 이력은{" "}
        <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서
        무료로 확인하고 출력할 수 있어요.
      </BorderBox>

      <Divider />

      <H2>단계별 해결 절차 4단계</H2>
      <p style={body}>
        대부분은 2단계(내용증명) 또는 3단계(노동청 진정)에서 해결돼요.
        단계를 건너뛰지 않고 순서대로 가면 증거도 쌓이고 협상력도 높아지죠.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>놓치면 안 되는 체크리스트</H2>
      <p style={body}>
        지연이자를 진정서에 명시하지 않으면 나중에 따로 청구해야 하는 번거로움이 생겨요.
        소멸시효는 내용증명 발송 시 6개월 중단되고, 진정 접수 시 완전 중단돼요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        진정서나 소송장에 "퇴직금 ○○만원 및 이에 대한 연 20% 지연손해금"으로 명시해야 받을 수 있어요.<br />
        빠뜨리면 원금만 받게 될 수 있으니 꼭 포함하세요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 미지급 해결 시 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법과 임금채권보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
