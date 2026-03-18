"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직 후 14일이 지났는데 퇴직금을 받지 못했어요" },
  { id: "c2", label: "지급 기한 연장에 서면으로 합의한 적이 없어요" },
  { id: "c3", label: "회사에 청구했지만 지급이 이뤄지지 않았어요" },
  { id: "c4", label: "퇴직한 지 3년이 지나지 않았어요" },
];

const CALC_SLIDERS = [
  { id: "amount", label: "미지급 퇴직금", min: 100, max: 5000, step: 50, defaultValue: 800, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "overDays", label: "14일 초과 지연 일수", min: 1, max: 365, step: 1, defaultValue: 45, format: (v: number) => `${v}일` },
];

const CALC_RESULTS = [
  {
    label: "지연이자 (연 20%)",
    getValue: (v: Record<string, number>) => Math.round(v.amount * 10000 * 0.2 / 365 * v.overDays),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "퇴직금 + 지연이자 합계",
    getValue: (v: Record<string, number>) => Math.round(v.amount * 10000 + v.amount * 10000 * 0.2 / 365 * v.overDays),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "급여명세서 (최근 3개월)", required: true, where: "회사 인사팀 요청" },
  { name: "근로계약서 또는 임금 관련 서류", required: true, where: "인사팀 또는 입사 시 수령본" },
  { name: "퇴직 확인서 또는 사직서 사본", required: true, where: "회사 인사팀" },
  { name: "퇴직금 청구 기록 (문자·이메일 캡처)", required: true, where: "본인 보관" },
  { name: "재직기간 증빙 (입사·퇴사 날짜 확인 가능한 서류)", required: false, where: "건강보험 자격득실 확인서 등" },
];

const STEPS = [
  {
    title: "지연이자 계산 후 청구서 작성",
    desc: "퇴직일로부터 14일이 지난 시점부터 지연이자(연 20%)가 자동 발생해요. 미지급 퇴직금 × 20% ÷ 365 × 지연 일수로 계산해요. 퇴직금 원금과 지연이자를 합산한 청구 금액을 내용증명이나 이메일로 회사에 발송하세요.",
    tip: "내용증명 발송 시 소멸시효(3년)가 중단돼요",
  },
  {
    title: "회사에 서면 청구",
    desc: "청구서를 보낸 뒤 3~5영업일 내 응답이 없거나 지급이 안 되면 다음 단계로 넘어가세요. 구두 요청은 증거가 안 돼요. 문자·이메일·내용증명으로 기록을 남겨야 해요.",
    tip: "카카오톡 대화 캡처도 증거로 활용 가능해요",
  },
  {
    title: "고용노동부 진정 신청",
    desc: "사업장 관할 지방노동청 또는 고용노동부 민원마당(minwon.moel.go.kr)에 진정을 접수해요. 근로감독관이 사실 조사 후 지급 명령을 내려요. 진정 시 지연이자도 함께 청구 가능하고, 보통 2~4주 안에 처리돼요.",
    tip: "온라인 진정이 방문보다 빠르게 처리돼요",
    link: { label: "민원마당 온라인 진정", href: "https://minwon.moel.go.kr" },
  },
  {
    title: "형사 고발 또는 민사 소송",
    desc: "노동청 조사 후에도 지급하지 않으면 형사 고발이나 민사 지급명령 신청이 가능해요. 근로자퇴직급여보장법 위반으로 3년 이하 징역 또는 3,000만원 이하 벌금 처벌 대상이 돼요. 법률구조공단(132)에서 무료 법률 지원을 받으세요.",
    tip: "형사 고발 후 합의가 이뤄지는 경우도 많아요",
  },
];

const CHECKLIST = [
  "지연이자 계산: 14일 초과분부터 연 20%, 퇴직금과 함께 청구",
  "서면 청구 필수: 내용증명 또는 이메일로 기록 남기기",
  "노동청 진정: 민원마당 온라인 또는 1350 상담",
  "형사 고발 가능: 근로자퇴직급여보장법 위반, 3년 이하 징역",
  "소멸시효 3년: 퇴직일로부터 3년 내 청구 필수",
  "폐업 시 체당금: 고용노동부(1350)에서 체당금 신청 가능",
];

const FAQS = [
  {
    q: "14일이 지나면 회사에 어떤 불이익이 생기나요?",
    a: "지연이자(연 20%) 지급 의무가 생겨요. 고의적으로 미지급하면 근로자퇴직급여보장법 위반으로 3년 이하 징역 또는 3,000만원 이하 벌금 처벌 대상이 돼요.",
  },
  {
    q: "지연이자는 자동으로 받을 수 있나요?",
    a: "법적으로는 자동 발생하지만, 실제로 받으려면 청구를 해야 해요. 노동청 진정 시 지연이자도 함께 청구하면 돼요.",
  },
  {
    q: "회사가 자금난이라며 못 준다고 하면?",
    a: "자금난도 지급 기한 초과의 정당한 이유가 되지 않아요. 지연이자는 그대로 청구할 수 있고 노동청 신고도 가능해요. 회사가 폐업했다면 체당금 제도를 활용하세요.",
  },
  {
    q: "퇴직금 소멸시효가 걱정돼요",
    a: "소멸시효는 퇴직일로부터 3년이에요. 지금 바로 내용증명을 보내면 소멸시효가 중단돼요. 3년이 지나기 전에 반드시 청구 행위를 해야 해요.",
  },
  {
    q: "회사가 폐업했는데 지연이자도 받을 수 있나요?",
    a: "체당금 제도를 통해 퇴직금 원금 일부를 받을 수 있어요. 지연이자는 체당금 대상에서 제외될 수 있어요. 고용노동부(1350)에서 체당금 신청 방법을 안내받으세요.",
  },
  {
    q: "내용증명 없이 문자로만 청구해도 되나요?",
    a: "문자도 청구 기록으로 활용할 수 있어요. 다만 소멸시효 중단 효과를 확실히 하려면 내용증명이 더 안전해요. 우체국에서 간단히 보낼 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제36조: 금품 청산 기한 14일", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로기준법 제37조: 지연이자 연 20%", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로자퇴직급여보장법 제9조: 퇴직금 지급 기한", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "근로자퇴직급여보장법 제44조: 벌칙 (3년 이하 징역 또는 3,000만원 이하 벌금)", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 민원마당: 온라인 진정 신청", url: "https://minwon.moel.go.kr" },
      { label: "고용노동부: 퇴직급여 지급 기준 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-미지급-신고", title: "퇴직금 미지급 신고 방법", description: "노동청 진정 절차와 신고 서류를 정리했어요." },
  { slug: "퇴직금-지연이자", title: "퇴직금 지연이자 계산", description: "연 20% 지연이자 계산법과 청구 방법." },
  { slug: "퇴직금-지급-기한", title: "퇴직금 지급 기한 14일 원칙", description: "기한 계산과 예외 상황을 설명해요." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-지급-기한-초과" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 지급기한초과 · 지연이자 · 노동청신고</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 지급 기한 14일 초과됐어요<br />
        지연이자 청구부터 형사 고발까지 단계별 대응
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금은 퇴직일로부터 14일 이내에 받아야 해요(근로자퇴직급여보장법 제9조).
        14일이 지나면 <a href="/w/퇴직금-지연이자" style={{ color: "#1D9E75", textDecoration: "underline" }}>지연이자(연 20%)</a>가 자동으로 쌓이고, 고의 미지급이면 3년 이하 징역 또는 3,000만원 이하 벌금 처벌 대상이 돼요.
        내용증명 → 노동청 진정 → 형사 고발 순서로 대응하면 대부분 해결돼요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>14일 초과하면 뭐가 달라지나요?</H2>
      <p style={body}>
        <a href="/w/퇴직금-지급-기한" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 14일 지급 기한</a>을 넘기면 회사는 지연이자(연 20%)를 추가로 줘야 해요.
        근로기준법 제37조에 명시된 의무라서 당사자 합의가 없어도 자동 발생해요.
        지급이 늦어질수록 이자가 쌓이니 빨리 청구할수록 유리해요.
      </p>
      <p style={body}>
        단순 지연이 아니라 의도적으로 지급을 거부하면 형사처벌까지 가능해요.
        근로자퇴직급여보장법 제44조에 따라 3년 이하 징역 또는 3,000만원 이하 벌금이에요.
        노동청 진정 후 형사 처벌 가능성만으로도 대부분 지급이 이뤄져요.
      </p>

      <GreenBox title="14일 기한 초과 시 발생하는 권리">
        지연이자 연 20%: 14일 초과분부터 실제 지급일까지 자동 발생<br />
        노동청 진정: 근로자퇴직급여보장법 위반으로 신고 가능<br />
        형사 고발: 3년 이하 징역 또는 3,000만원 이하 벌금<br />
        소멸시효 3년: 퇴직일로부터 3년 내 청구 필수
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="지연이자 청구 및 노동청 신고가 가능한 상황이에요. 아래 계산기로 지연이자를 먼저 계산하세요."
        partialMatchText="상황에 따라 달라질 수 있어요. 고용노동부(1350) 상담을 권해요."
      />

      <Divider />

      <H2>지연이자 직접 계산해보세요</H2>
      <p style={body}>
        미지급 퇴직금과 14일 초과 지연 일수를 넣으면 지연이자와 합계 금액을 바로 확인할 수 있어요.
        청구서에 퇴직금과 지연이자를 명시해서 회사에 발송하세요.
      </p>

      <SectionBadge>퇴직금 지연이자 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 근로기준법 제37조 기준 연 20%. 14일 초과분부터 실제 지급일까지 누적 계산이에요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>진정·고소 시 필요한 서류</H2>
      <p style={body}>
        급여명세서와 퇴직 확인서로 퇴직금 기준과 퇴직 날짜를 입증해야 해요.
        청구 기록(문자·이메일)은 이미 지급 요청을 했다는 증거로 쓰여요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>기한 초과 대응 4단계</H2>
      <p style={body}>
        지연이자 계산 → 서면 청구 → 노동청 진정 → 형사 고발 또는 소송 순서예요.
        대부분은 3단계 노동청 진정에서 해결돼요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>기한 초과 대응 체크리스트</H2>
      <p style={body}>
        지연이자를 함께 청구하는 걸 빠뜨리는 경우가 많아요. 소멸시효 3년도 반드시 챙겨야 해요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="지연이자는 포기하지 마세요">
        14일 초과분은 법으로 보장된 이자예요.<br />
        퇴직금 원금만 받으면 손해예요. 지연이자까지 함께 청구하세요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 지급 기한 초과에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법 및 근로자퇴직급여보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인해봐요." />
    </ArticleLayout>
  );
}
