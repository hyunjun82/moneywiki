"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직한 지 3년이 지나지 않았어요" },
  { id: "c2", label: "퇴직금을 아직 받지 못했거나 일부만 받았어요" },
  { id: "c3", label: "퇴직 후 14일이 지났는데 입금이 없어요" },
  { id: "c4", label: "회사에 지급 요청했지만 거부당했어요" },
];

const CALC_SLIDERS = [
  { id: "amount", label: "미지급 퇴직금", min: 50, max: 5000, step: 50, defaultValue: 500, format: (v: number) => `${v}만원` },
  { id: "days", label: "지연 일수", min: 15, max: 365, step: 5, defaultValue: 90, format: (v: number) => `${v}일` },
];

const CALC_RESULTS = [
  {
    label: "연 20% 지연이자",
    getValue: (v: Record<string, number>) => Math.round(v.amount * 10000 * 0.2 * v.days / 365),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "총 청구 가능 금액",
    getValue: (v: Record<string, number>) => {
      const interest = Math.round(v.amount * 10000 * 0.2 * v.days / 365);
      return v.amount * 10000 + interest;
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "근로계약서", required: true, where: "입사 시 수령 · 인사팀 재발급" },
  { name: "최근 3개월 급여명세서", required: true, where: "회사 인사팀 요청" },
  { name: "퇴직 증빙 (사직서·해고통지서)", required: true, where: "직접 보관 또는 인사팀" },
  { name: "통장 입금 내역", required: true, where: "은행 앱 또는 인터넷뱅킹 출력" },
  { name: "내용증명 발송 기록", required: false, where: "우체국 발송 후 보관" },
  { name: "퇴직금 지급 요청 문자·메일", required: false, where: "직접 캡처 보관" },
];

const STEPS = [
  {
    title: "회사에 직접 요청",
    desc: "구두 또는 문자로 '퇴직금을 언제 지급하냐'고 묻는 것부터 시작해요. 이 단계에서 '2주 내에 주겠다'는 답을 받으면 그냥 기다려도 되죠.",
    tip: "문자·메일로 요청하면 증거가 남아 나중에 유리해요",
  },
  {
    title: "내용증명 발송",
    desc: "14일이 지났는데도 무응답이면 내용증명을 보내세요. '퇴직금 미지급으로 고용노동부에 신고할 예정'이라는 내용만으로 충분해요. 대부분 이 단계에서 지급하는 경우가 많아요.",
    tip: "우체국 또는 카카오 전자내용증명으로 간편 발송 가능",
  },
  {
    title: "고용노동부 진정 접수",
    desc: "내용증명 후에도 무응답이면 관할 지방고용노동청에 '임금체불 진정서'를 접수해요. 온라인(고용노동부 민원마당)이나 방문 모두 가능하고 무료예요. 접수 후 1~3개월 내 결과가 나와요.",
    tip: "minwon.moel.go.kr → 민원신청 → 임금체불 진정으로 온라인 접수",
  },
  {
    title: "소액사건 민사소송 (최후 수단)",
    desc: "진정 결과에도 지급하지 않으면 소액심판 또는 지급명령 신청을 해요. 3,000만원 이하는 변호사 없이 본인이 직접 소송 가능하고, 인지대는 수만원 수준이에요.",
    tip: "대한법률구조공단(132)에서 무료 법률 지원도 받을 수 있어요",
  },
];

const CHECKLIST = [
  "퇴직일 확인 — 14일 이내 지급이 원칙 (이 날짜부터 지연이자 계산)",
  "소멸시효 3년 — 퇴직일로부터 3년 내에 청구해야 해요",
  "서류 미리 보관 — 근로계약서, 급여명세서, 퇴직 증빙",
  "지급 요청 내역 보존 — 문자·메일·카톡 캡처",
  "회사 폐업 시 체당금 제도 확인 — 정부가 대신 지급",
];

const FAQS = [
  {
    q: "퇴직금 미지급 신고는 어디에 하나요?",
    a: "사업장 소재지 관할 지방고용노동청에 임금체불 진정서를 내면 돼요. 방문·우편·온라인(고용노동부 민원마당) 모두 가능하고 무료예요.",
  },
  {
    q: "신고하면 회사가 보복할 수 있나요?",
    a: "근로기준법 제104조가 '신고를 이유로 불이익을 주면 안 된다'고 명시해요. 보복이 있으면 별도 진정이 가능하죠.",
  },
  {
    q: "신고 후 결과가 나오기까지 얼마나 걸리나요?",
    a: "보통 1~3개월이에요. 사건이 복잡하거나 사업주가 출석을 거부하면 더 걸릴 수 있어요. 그래도 민사소송(6개월~1년)보다 훨씬 빠르죠.",
  },
  {
    q: "회사가 폐업했어도 신고할 수 있나요?",
    a: "가능해요. 대표이사 개인에 대한 진정이 가능하고, 체당금 제도로 정부에서 일부를 대신 지급받을 수 있죠.",
  },
  {
    q: "지연이자는 자동으로 받을 수 있나요?",
    a: "노동청 진정 과정에서 함께 청구할 수 있어요. 퇴직 후 14일 초과 시 연 20% 이율이 적용되죠. 별도로 명시해서 요청하면 더 확실해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제36조 — 퇴직 후 14일 이내 지급 의무", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로기준법 제109조 — 임금체불 처벌 (3년 이하 징역 · 3,000만원 벌금)", url: "https://www.law.go.kr/법령/근로기준법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 민원마당 — 임금체불 온라인 진정 접수", url: "https://minwon.moel.go.kr" },
      { label: "대한법률구조공단 — 무료 법률 지원 (132)", url: "https://www.klac.or.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-지연이자",
    title: "퇴직금 지연이자 연 20% 받는 방법",
    description: "14일 초과 미지급 시 지연이자 계산법과 청구 방법이에요.",
  },
  {
    slug: "퇴직금-계산법",
    title: "퇴직금 계산법, 얼마나 받을 수 있을까?",
    description: "내 퇴직금이 얼마인지 계산기로 직접 확인해보세요.",
  },
  {
    slug: "회사-폐업-퇴직금",
    title: "회사 폐업해도 퇴직금 받을 수 있나요?",
    description: "체당금 제도로 정부가 대신 지급해주는 방법이에요.",
  },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-미지급-신고" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 미지급 · 신고</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 미지급, 어디에 신고하나요?<br />
        절차부터 지연이자 청구까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금은 퇴직 후 14일 이내에 줘야 해요. 그런데 "나중에 준다", "자금이 없다"는 말로 미루거나 아예 연락이 끊기는 경우가 있죠.
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제36조</a>는 이걸 명백한 위법으로 봐요.
        14일 초과 시 <a href="/w/퇴직금-지연이자" style={{ color: "#1D9E75", textDecoration: "underline" }}>연 20% 지연이자</a>가 붙고, 형사처벌까지 가능하죠.
        신고 절차, 지연이자 계산, 폐업 시 대응까지 한 번에 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>지금 신고할 수 있는 상황인가요?</H2>
      <p style={body}>
        신고 전에 내 상황이 법적으로 청구 가능한 상태인지 확인해요.
        소멸시효 3년이 지났다면 법적으로 청구가 어려워지기 때문에 빠른 대응이 중요해요.
      </p>
      <p style={body}>
        14일이 지났다고 해서 바로 신고할 필요는 없어요. 먼저 회사에 구두·문자로 요청한 뒤, 그래도 안 주면 내용증명 → 노동청 진정 순서로 가면 대부분 해결돼요.
      </p>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="지금 바로 신고 가능해요. 아래 단계별 절차를 따라하세요."
        partialMatchText="조건이 다를 수 있어요. 고용노동부(1350)에 먼저 상담하세요."
      />

      <Divider />

      <H2>지연이자까지 얼마나 받을 수 있을까?</H2>
      <p style={body}>
        퇴직금을 14일 이상 미지급하면 연 20% 지연이자가 붙어요. 퇴직금 500만원을 90일 미뤘다면 약 25만원의 이자를 추가로 받을 수 있죠.
        아래에서 내 상황을 입력해보세요.
      </p>

      <SectionBadge>지연이자 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 근로기준법 제37조 기준 연 20% 이율 적용. 퇴직 후 14일 초과 시점부터 계산."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>신고에 필요한 서류 목록</H2>
      <p style={body}>
        노동청 진정에는 서류가 많지 않아도 돼요. 근로 사실과 미지급 사실만 증명하면 충분하죠.
        없는 서류가 있어도 통장 내역이나 문자 기록만으로도 진행할 수 있어요.
      </p>

      <SectionBadge>제출 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <BorderBox title="서류가 하나도 없다면?">
        통장 입금 내역 + 카카오톡 대화 + 동료 증언만 있어도 진정 접수는 가능해요.
        4대보험 가입 이력은 <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 무료로 확인할 수 있어요.
      </BorderBox>

      <Divider />

      <H2>퇴직금 미지급 신고 절차 4단계</H2>
      <p style={body}>
        대부분의 경우 2단계(내용증명)에서 해결돼요. 단계를 건너뛰지 말고 순서대로 진행하면 증거도 쌓이고 협상력도 올라가죠.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>신고 전 준비 체크리스트</H2>
      <p style={body}>
        서류를 미리 챙겨두면 진정 처리가 훨씬 빨라져요. 특히 퇴직 직후 서류를 바로 요청해두는 게 중요해요.
      </p>

      <SectionBadge>신고 전 준비 목록</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="소멸시효 3년, 절대 놓치지 마세요">
        퇴직금 청구권은 퇴직일로부터 3년이 지나면 소멸해요.
        "나중에 해야지" 미루다 시효가 끝나면 법적으로 받을 수 없어요.
        지금 당장 신고하기 어렵더라도 내용증명 발송만으로도 시효를 끊을 수 있어요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 신고할 때 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
