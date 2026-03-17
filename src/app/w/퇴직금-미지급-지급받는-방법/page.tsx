"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직금을 아직 못 받았어요" },
  { id: "c2", label: "퇴사한 지 14일이 넘었어요" },
  { id: "c3", label: "퇴직 후 3년이 아직 안 됐어요" },
  { id: "c4", label: "회사에 지급 요청했지만 무응답이에요" },
];

const CALC_SLIDERS = [
  { id: "amount", label: "미지급 퇴직금", min: 100, max: 5000, step: 100, defaultValue: 1000, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "months", label: "미지급 기간", min: 1, max: 36, step: 1, defaultValue: 6, format: (v: number) => `${v}개월` },
];

const CALC_RESULTS = [
  {
    label: "지연이자 (연 20%, 14일 초과분)",
    getValue: (v: Record<string, number>) => Math.round(v.amount * 10000 * 0.2 * (Math.max(0, v.months * 30 - 14)) / 365),
    format: (v: number) => v < 10000 ? `${v.toLocaleString()}원` : `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "총 청구 가능 금액 (원금+이자)",
    getValue: (v: Record<string, number>) => {
      const interest = Math.round(v.amount * 10000 * 0.2 * (Math.max(0, v.months * 30 - 14)) / 365);
      return v.amount * 10000 + interest;
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "근로계약서", required: true, where: "인사팀 또는 입사 시 수령본" },
  { name: "사직서 또는 해고통지서", required: true, where: "본인 보관 또는 인사팀" },
  { name: "급여명세서 (최근 3개월)", required: true, where: "회사 인사팀 요청" },
  { name: "4대보험 가입이력", required: false, where: "고용24 무료 조회" },
];

const STEPS = [
  {
    title: "내용증명 발송 (지연이자 명시)",
    desc: "'퇴직금 ○○만원 + 지연이자 포함 ○일 이내 지급 요청'으로 발송해요. 우체국 또는 카카오 전자내용증명으로 10분 안에 보낼 수 있어요. 소멸시효도 6개월 중단되는 효과가 있어요.",
    tip: "카카오 전자내용증명은 카카오톡 앱에서 바로 이용 가능해요",
  },
  {
    title: "고용노동부 임금체불 진정 접수",
    desc: "minwon.moel.go.kr에서 온라인으로 접수해요. 퇴직금과 지연이자를 모두 명시해야 나중에 함께 받을 수 있어요. 접수 후 1~3개월 내에 처리되고, 진정 접수 시 소멸시효가 완전히 중단돼요.",
    tip: "진정서에 '퇴직금 ○○원 및 지연이자 포함' 명시 필수예요",
  },
  {
    title: "근로감독관 조사 및 시정 명령",
    desc: "접수 후 근로감독관이 사실 확인하고 시정 명령을 내려요. 회사는 형사처벌(3년 이하 징역 또는 3,000만원 벌금) 위험이 있어서 이 단계에서 대부분 지급해요.",
    tip: "이 단계에서 대부분의 사건이 해결돼요",
  },
  {
    title: "소액심판 또는 지급명령 신청",
    desc: "진정 이후에도 지급하지 않으면 법원에 소액심판이나 지급명령을 신청해요. 3,000만원 이하는 변호사 없이 직접 가능하고 인지대는 수만 원 수준이에요. 대한법률구조공단(132)에서 무료 지원도 받을 수 있어요.",
    tip: "지급명령은 소송보다 절차가 간단하고 결과가 빠르게 나와요",
  },
];

const CHECKLIST = [
  "내용증명 발송: 지연이자 청구 명시 포함",
  "소멸시효 3년: 퇴직일 기준 3년 내 청구",
  "노동청 진정: 퇴직금 + 지연이자 모두 포함해서 접수",
  "서류 보관: 근로계약서, 급여명세서, 지급 요청 기록",
  "폐업 시 체당금 신청: 정부가 대신 지급해줘요",
];

const FAQS = [
  {
    q: "내용증명을 보내면 얼마나 효과가 있나요?",
    a: "법적 청구 의사를 공식적으로 전달하는 거예요. 많은 회사가 내용증명을 받으면 바로 지급해요. 소멸시효도 6개월 중단되는 효과가 있어요.",
  },
  {
    q: "노동청 진정은 얼마나 걸리나요?",
    a: "보통 1~3개월이에요. 사안이 복잡하면 더 걸릴 수 있지만, 단순 미지급 건은 빠르게 처리되는 경우가 많아요.",
  },
  {
    q: "회사가 폐업했으면 어떻게 받나요?",
    a: "체당금 제도로 고용노동부에서 대신 받을 수 있어요. 파산 선고일로부터 2년 내 신청해야 해요.",
  },
  {
    q: "지연이자도 같이 받을 수 있나요?",
    a: "받을 수 있어요. 진정 또는 소송 단계에서 지연이자를 함께 청구해야 받을 수 있어요. 자동으로 주지는 않아요.",
  },
  {
    q: "소액심판이 뭔가요?",
    a: "3,000만원 이하 분쟁을 법원에서 빠르게 해결하는 절차예요. 변호사 없이 직접 신청 가능하고 인지대가 수만원 수준이에요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제36조: 14일 이내 금품 청산 의무", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로기준법 제37조: 지연이자 연 20%", url: "https://www.law.go.kr/법령/근로기준법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 민원마당: 임금체불 진정 접수", url: "https://minwon.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-미지급-신고", title: "퇴직금 미지급 신고 방법", description: "노동청 접수부터 처리까지 안내해요." },
  { slug: "퇴직금-지연이자", title: "퇴직금 지연이자 연 20%", description: "계산부터 청구까지 정리했어요." },
  { slug: "퇴직금-소멸시효", title: "퇴직금 소멸시효 3년", description: "시효 중단 방법을 설명해요." },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-미지급-지급받는-방법" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 미지급 · 해결방법</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 못 받았을 때 어떻게 받아낼 수 있나요?<br />
        내용증명부터 노동청 신고, 소액심판까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금을 못 받았다면 바로 행동해야 해요. 14일 기한을 넘긴 순간부터{" "}
        <a href="/w/퇴직금-지연이자" style={{ color: "#1D9E75", textDecoration: "underline" }}>연 20% 지연이자</a>가 붙기 시작하고,
        3년이 지나면 청구권 자체가 소멸해요.
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제36조</a>는
        이를 명백한 위법으로 보고, 3년 이하 징역 또는 3,000만원 이하 벌금까지 처벌할 수 있어요.
        내용증명 → 노동청 진정 순서만 밟으면 대부분 2~3단계에서 해결돼요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>지금 바로 행동해야 하는 상황인가요?</H2>
      <p style={body}>
        퇴직금은 퇴직 후 14일 이내에 지급해야 해요. 이 기한을 넘겼다면 이미 위법 상태고,
        소멸시효 3년이 임박했다면 내용증명부터 발송해서 시효를 끊는 게 먼저예요.
      </p>
      <p style={body}>
        14일이 지났다고 바로 신고할 필요는 없어요. 먼저 문자로 요청한 뒤,
        그래도 안 주면 내용증명 → 노동청 진정 순서로 가면 대부분 해결돼요.
      </p>

      <GreenBox title="퇴직금 미지급 해결 핵심 경로">
        1단계: 문자·이메일로 지급 요청 (증거 남기기)<br />
        2단계: 내용증명 발송 (지연이자 명시 + 시효 중단)<br />
        3단계: 고용노동부 임금체불 진정 (무료, 1~3개월 처리)
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
        14일이 넘은 순간부터 연 20% 이자가 붙어요. 퇴직금 1,000만원을 6개월 받지 못했다면
        지연이자만 30만원이 넘어요. 노동청 진정 단계에서 이 이자를 함께 청구해야 받을 수 있어요.
      </p>
      <p style={body}>
        지연이자는 자동으로 받아지지 않아요. 내용증명과 진정서에 '연 20% 지연이자 포함'을
        명시해서 청구해야 해요.
      </p>

      <SectionBadge>지연이자 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 퇴직 후 14일 초과분부터 연 20% 지연이자 발생 (근로기준법 제37조). 소멸시효 3년."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>신고에 필요한 서류</H2>
      <p style={body}>
        노동청 진정에는 서류가 많지 않아도 돼요. 근로 사실과 미지급 사실만 증명하면 충분해요.
        없는 서류가 있어도 통장 내역이나 문자 기록만으로 진행할 수 있어요.
      </p>

      <SectionBadge>제출 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <BorderBox title="서류가 없다면?">
        통장 입금 내역 + 카카오톡 대화 + 동료 증언만 있어도 진정 접수는 가능해요.
        4대보험 가입 이력은{" "}
        <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서
        무료로 확인할 수 있어요.
      </BorderBox>

      <Divider />

      <H2>단계별 해결 절차 4단계</H2>
      <p style={body}>
        대부분의 경우 2단계(내용증명) 또는 3단계(노동청 진정)에서 해결돼요.
        단계를 건너뛰지 않고 순서대로 진행하면 증거도 쌓이고 협상력도 올라가요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>놓치면 안 되는 체크리스트</H2>
      <p style={body}>
        지연이자를 진정서에 명시하지 않으면 나중에 따로 청구해야 하는 번거로움이 생겨요.
        소멸시효 3년은 내용증명 발송 시 6개월 중단, 진정 접수 시 완전 중단돼요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="지연이자는 자동으로 안 줘요">
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
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
