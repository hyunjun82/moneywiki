"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직 후 14일이 지났는데 퇴직금이 입금되지 않았어요" },
  { id: "c2", label: "회사에 지급 요청했지만 거부하거나 계속 미루고 있어요" },
  { id: "c3", label: "퇴직일로부터 3년(소멸시효)이 아직 지나지 않았어요" },
  { id: "c4", label: "근로 기간이 1년 이상이고 주 15시간 이상 일했어요" },
];

const CALC_SLIDERS = [
  { id: "amount", label: "미지급 퇴직금", min: 100, max: 5000, step: 100, defaultValue: 500, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "days", label: "지연 일수 (14일 초과분)", min: 1, max: 730, step: 5, defaultValue: 90, format: (v: number) => `${v}일` },
];

const CALC_RESULTS = [
  {
    label: "지연이자 (연 20%)",
    getValue: (v: Record<string, number>) => Math.round(v.amount * 10000 * 0.2 * v.days / 365),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "총 청구금액 (원금 + 지연이자)",
    getValue: (v: Record<string, number>) => {
      const interest = Math.round(v.amount * 10000 * 0.2 * v.days / 365);
      return v.amount * 10000 + interest;
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "근로계약서", required: true, where: "입사 시 수령본 또는 인사팀 재발급" },
  { name: "퇴직사실 증빙 (사직서·해고통지서·퇴직 확인서)", required: true, where: "본인 보관 또는 인사팀" },
  { name: "급여명세서 (최근 3개월)", required: true, where: "회사 인사팀 요청" },
  { name: "지급 요청 기록 (문자·이메일·카카오톡 캡처)", required: false, where: "직접 저장 보관" },
  { name: "통장 거래내역 (급여 입금 확인용)", required: false, where: "은행 앱 또는 인터넷뱅킹" },
];

const STEPS = [
  {
    title: "고용24에서 임금체불 진정 온라인 접수",
    desc: "고용24(ei.go.kr) → 민원신청 → 임금체불 진정으로 접수해요. 진정서에 '퇴직금 ○○만원 및 연 20% 지연이자 포함 청구'를 명시해야 나중에 지연이자도 함께 받을 수 있어요. 방문 진정은 관할 고용노동청 근로감독과에 가면 돼요.",
    tip: "온라인 접수가 가장 빠르고, 접수 즉시 소멸시효가 중단돼요",
    link: { label: "고용24 진정 접수하기", href: "https://www.ei.go.kr" },
  },
  {
    title: "근로감독관 조사 및 사실 확인",
    desc: "접수 후 담당 근로감독관이 배정돼요. 근로감독관은 사업주에게 출석 요구 및 자료 제출을 명령하고, 근로 사실과 미지급 금액을 확인해요. 이 단계에서 사업주가 형사처벌(3년 이하 징역 또는 3,000만원 이하 벌금) 위험을 인식하고 대부분 지급해요.",
    tip: "보통 접수 후 1~3개월 내 처리되고, 단순 미지급은 더 빠른 경우도 있어요",
  },
  {
    title: "시정 명령 — 지급 이행 요구",
    desc: "근로감독관이 조사 결과를 바탕으로 사업주에게 시정 명령을 내려요. 시정 기간 내에 퇴직금과 지연이자를 지급하면 사건이 종결돼요. 시정 명령을 무시하면 검찰에 송치돼요.",
    tip: "이 단계에서도 미지급이면 검찰 송치로 형사 처벌이 진행돼요",
  },
  {
    title: "검찰 송치 또는 소액심판 병행",
    desc: "시정 명령 후에도 지급하지 않으면 근로감독관이 사건을 검찰에 송치해요. 동시에 본인이 직접 법원에 소액심판(3,000만원 이하)을 신청하면 민사 강제집행도 가능해요. 대한법률구조공단(132)에서 무료 법률 지원을 받을 수 있어요.",
    tip: "소액심판은 변호사 없이 직접 신청 가능하고, 인지대는 수만 원이에요",
  },
];

const CHECKLIST = [
  "지연이자 발생 시작일 확인: 퇴직 후 14일 초과 다음 날부터",
  "소멸시효 3년: 퇴직일 기준 3년 내 청구 (진정 접수 시 시효 중단)",
  "진정서에 '연 20% 지연이자 포함' 명시 — 빠뜨리면 원금만 받아요",
  "지급 요청 기록 보존: 문자·이메일·카카오톡 캡처 저장",
  "서류 없어도 진정 가능: 통장 내역 + 대화 기록으로 대체 가능",
];

const FAQS = [
  {
    q: "지연이자는 자동으로 받을 수 있나요?",
    a: "자동으로 받아지지 않아요. 고용노동부 진정서나 법원 청구서에 '연 20% 지연이자 포함'을 직접 명시해야 받을 수 있어요. 빠뜨리면 원금만 받게 될 수 있어요.",
  },
  {
    q: "소멸시효 3년이 지나면 정말 못 받나요?",
    a: "법적 청구권이 소멸해요. 다만 내용증명 발송(6개월 중단), 진정 접수, 소송 제기로 시효를 중단시킬 수 있어요. 3년이 임박했다면 빨리 진정부터 접수하세요.",
  },
  {
    q: "노동청 진정 결과까지 얼마나 걸리나요?",
    a: "보통 1~3개월이에요. 사업주가 출석을 거부하거나 사건이 복잡하면 더 걸릴 수 있어요. 민사소송(6개월~1년)보다 훨씬 빠르고 무료예요.",
  },
  {
    q: "회사가 폐업했어도 지연이자 청구가 되나요?",
    a: "체당금 제도로 정부에서 퇴직금 일부를 받을 수 있어요. 지연이자는 대표이사 개인에 대한 민사 청구로 별도 진행해야 할 수 있어요. 폐업 후 2년 내 신청해야 해요.",
  },
  {
    q: "진정 접수 후 회사가 불이익을 주면 어떻게 하나요?",
    a: "근로기준법 제104조가 신고를 이유로 한 불이익을 금지해요. 보복 행위가 있다면 별도로 진정을 접수할 수 있고, 처벌 대상이 돼요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제36조: 퇴직 후 14일 이내 금품 청산 의무", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로기준법 제37조: 지연이자 연 20% 이율", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로기준법 제109조: 임금체불 처벌 규정 (3년 이하 징역·3,000만원 이하 벌금)", url: "https://www.law.go.kr/법령/근로기준법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24: 임금체불 온라인 진정 접수", url: "https://www.ei.go.kr" },
      { label: "고용노동부: 임금체불 신고·처리 안내", url: "https://www.moel.go.kr" },
      { label: "대한법률구조공단: 무료 법률 지원 (132)", url: "https://www.klac.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-미지급-신고", title: "퇴직금 미지급 신고 방법", description: "관할 노동청에 임금체불 진정을 넣는 방법을 정리했어요." },
  { slug: "퇴직금-지연이자", title: "퇴직금 지연이자 연 20% 받는 방법", description: "14일 초과 미지급 시 지연이자 계산법과 청구 방법이에요." },
  { slug: "퇴직금-지급-기한", title: "퇴직금 지급 기한 14일 규정", description: "지급 기한 원칙과 예외 상황을 정리했어요." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-미지급-신고-절차-지연이자-청구" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 미지급 신고 · 지연이자 청구</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 미지급, 신고해도 될까요?<br />
        고용노동부 진정 절차와 지연이자 청구 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금을 14일 넘게 안 줬다면 그 다음 날부터{" "}
        <a href="/w/퇴직금-지연이자" style={{ color: "#1D9E75", textDecoration: "underline" }}>연 20% 지연이자</a>가
        발생해요.{" "}
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제37조</a>에
        명시된 권리예요. 지연이자는 자동으로 받아지지 않고, 진정서에 직접 명시해야만 받을 수 있어요.
        고용24 온라인 진정부터 검찰 송치까지 4단계 절차와 지연이자 계산 방법을 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>내가 신고할 수 있는 상황인가요?</H2>
      <p style={body}>
        퇴직 후 14일이 지났는데 퇴직금이 안 들어왔다면 이미 지연이자가 쌓이고 있어요.
        소멸시효 3년이 지나기 전이라면 언제든 진정을 접수할 수 있어요.
        아직 시효가 남아 있다면 지금 바로 행동하는 게 중요하죠.
      </p>
      <p style={body}>
        진정 접수 자체는 무료고, 서류가 부족해도 통장 내역이나 카카오톡 대화만으로 시작할 수 있어요.
        접수하는 순간 소멸시효도 멈춰요.
      </p>

      <GreenBox title="지연이자 청구 핵심 조건">
        발생 시점: 퇴직 후 14일 초과 다음 날부터 자동 발생<br />
        이율: 연 20% (근로기준법 제37조 기준)<br />
        청구 방법: 진정서·소송장에 반드시 지연이자 명시 필수
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="지연이자 포함 진정이 가능한 상황이에요. 아래 절차를 따라 진행하세요."
        partialMatchText="상황에 따라 다를 수 있어요. 고용노동부(1350)에 먼저 상담하세요."
      />

      <Divider />

      <H2>지연이자가 얼마나 붙을까요?</H2>
      <p style={body}>
        퇴직금 500만원을 90일 미뤘다면 지연이자만 약 25만원이에요.
        미지급 기간이 길어질수록 이자도 쌓이기 때문에 지연 일수를 정확히 기록해두세요.
      </p>
      <p style={body}>
        지연이자 시작일은 퇴직 후 14일을 넘긴 다음 날이에요.
        주말·공휴일 포함 달력 기준으로 세고, 영업일 기준이 아니에요.
      </p>

      <SectionBadge>지연이자 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 근로기준법 제37조 기준 연 20% 이율. 퇴직 후 14일 초과 시점부터 지연 일수를 입력하세요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>진정 접수에 필요한 서류</H2>
      <p style={body}>
        고용노동부 진정에는 많은 서류가 필요하지 않아요.
        근로 사실과 미지급 사실만 증명하면 충분하죠.
        없는 서류가 있어도 온라인으로 대체 서류를 구할 수 있어요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <BorderBox title="서류를 회사에서 안 줄 때는?">
        4대보험 가입 이력은{" "}
        <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서
        무료로 출력할 수 있어요. 근로 사실은 동료 진술이나 카카오톡 대화로도 인정돼요.
      </BorderBox>

      <Divider />

      <H2>고용노동부 진정 절차 4단계</H2>
      <p style={body}>
        고용24 온라인 접수부터 검찰 송치까지 4단계예요.
        대부분의 사건은 2~3단계(근로감독관 조사·시정 명령)에서 해결되고, 4단계까지 가는 경우는 드물어요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>진정 전 놓치면 안 되는 체크리스트</H2>
      <p style={body}>
        지연이자를 진정서에 명시하지 않으면 나중에 따로 청구해야 하는 번거로움이 생겨요.
        소멸시효는 진정 접수하면 그 시점부터 완전히 중단돼요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="진정서에 지연이자를 꼭 명시하세요">
        단순히 "퇴직금을 지급해 달라"는 내용만으로는 지연이자 청구 의사가 전달되지 않아요.<br />
        진정서에 "퇴직금 ○○만원 및 14일 초과분 연 20% 지연이자를 함께 청구합니다"라고 써야 해요.<br />
        이 한 문장이 협상력을 크게 높여주고, 이후 민사 소송에서도 근거가 돼요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 미지급 신고와 지연이자 청구 시 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인해봐요." />
    </ArticleLayout>
  );
}
