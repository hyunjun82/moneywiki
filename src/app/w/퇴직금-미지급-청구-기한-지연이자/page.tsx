"use client";
import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR, 퇴직금_HIGHLIGHT } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직일로부터 3년이 아직 지나지 않았어요" },
  { id: "c2", label: "퇴직 후 14일이 지났는데 퇴직금을 아직 못 받았어요" },
  { id: "c3", label: "회사에 지급 요청한 기록(문자·이메일)이 남아 있어요" },
  { id: "c4", label: "미지급 퇴직금 원금이 얼마인지 파악하고 있어요" },
];

const CALC_SLIDERS = [
  {
    id: "amount",
    label: "미지급 퇴직금",
    min: 100,
    max: 5000,
    step: 50,
    defaultValue: 1000,
    format: (v: number) => `${v.toLocaleString()}만원`,
  },
  {
    id: "delayed",
    label: "14일 초과 지연 일수",
    min: 1,
    max: 730,
    step: 1,
    defaultValue: 60,
    format: (v: number) => `${v}일`,
  },
];

const CALC_RESULTS = [
  {
    label: "지연이자 (연 20%, 14일 초과분)",
    getValue: (v: Record<string, number>) =>
      Math.round((v.amount * 10000 * 0.2) / 365 * v.delayed),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "퇴직금 + 지연이자 총 청구액",
    getValue: (v: Record<string, number>) =>
      Math.round(v.amount * 10000 + (v.amount * 10000 * 0.2) / 365 * v.delayed),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "급여명세서 (최근 3개월)", required: true, where: "회사 인사팀 요청" },
  { name: "근로계약서 (입사일·임금 확인)", required: true, where: "인사팀 또는 입사 시 수령본" },
  { name: "퇴직 확인서 또는 사직서 사본", required: true, where: "회사 인사팀" },
  { name: "4대보험 자격상실 확인서", required: false, where: "국민건강보험공단 또는 4대사회보험포털" },
];

const STEPS = [
  {
    title: "소멸시효 남은 기간 확인",
    desc: "퇴직금 청구권 소멸시효는 3년이에요(근로기준법 제49조). 퇴직일 다음 날부터 기산해서 3년이 지나면 청구권이 소멸해요. 지연이자 청구권도 동일하게 3년이에요. 기한이 얼마나 남았는지 먼저 파악하세요.",
    tip: "내용증명 발송·노동청 진정 신청 시 소멸시효가 중단돼서 새로 3년이 카운트돼요",
  },
  {
    title: "지연이자 계산",
    desc: "지연이자는 퇴직일로부터 14일이 지난 시점부터 발생해요. 미지급 퇴직금 × 연 20% ÷ 365 × 지연 일수로 계산해요. 이자는 실제 지급일까지 계속 누적되니 청구가 빠를수록 유리해요.",
    tip: "예: 1,000만원 × 20% ÷ 365 × 60일 = 약 32만원",
  },
  {
    title: "내용증명 발송",
    desc: "퇴직금 원금과 지연이자를 합산한 금액을 내용증명으로 회사에 청구해요. 내용증명은 소멸시효 중단 효과가 있어요. 3년이 다 되어간다면 응답 여부와 상관없이 내용증명을 먼저 발송하세요.",
    tip: "내용증명은 우체국에서 직접 보내거나 온라인(인터넷우체국)으로 발송 가능해요",
  },
  {
    title: "노동청 진정 접수 또는 소송",
    desc: "내용증명에 응답이 없으면 사업장 관할 지방노동청 또는 고용노동부 민원마당(온라인)에 진정을 접수해요. 진정 후 보통 2~4주 내에 처리돼요. 그래도 지급 안 하면 법원 지급명령·소액사건 소송으로 강제 회수해요.",
    tip: "법률구조공단(132)에서 무료 법률 지원을 받을 수 있어요. 형사처벌도 가능해요(근로기준법 위반 2년 이하 징역 또는 2,000만원 이하 벌금)",
  },
];

const CHECKLIST = [
  "소멸시효 3년: 퇴직일 다음 날부터 기산, 3년 내 청구 필수",
  "지연이자: 14일 초과분부터 연 20%, 퇴직금과 함께 청구",
  "내용증명 발송: 소멸시효 중단 효과, 3년 임박 시 즉시 발송",
  "노동청 진정: 1350 또는 고용노동부 민원마당(온라인)",
  "형사 고발 가능: 근로기준법 위반으로 2년 이하 징역",
];

const FAQS = [
  {
    q: "퇴직금 소멸시효 3년, 정확히 언제부터 시작되나요?",
    a: "퇴직일 다음 날부터예요. 퇴직일이 2023년 3월 1일이면 2026년 3월 2일까지 청구해야 해요. 이후엔 회사가 소멸시효 항변을 주장할 수 있어요.",
  },
  {
    q: "3년이 다 되어가는데 소멸시효를 중단하는 방법이 있나요?",
    a: "있어요. 내용증명 발송, 노동청 진정 접수, 법원 지급명령 신청이 모두 시효 중단 사유예요. 내용증명을 발송하면 시효가 중단되고, 그 시점부터 새로 3년이 카운트돼요.",
  },
  {
    q: "지연이자를 회사가 거부하면 어떻게 하나요?",
    a: "노동청에 지연이자도 포함해서 진정을 내면 돼요. 근로기준법 제37조로 보장된 권리라 노동청이 지급을 명령할 수 있어요.",
  },
  {
    q: "퇴직 후 3년이 지나면 정말 받을 수 없나요?",
    a: "원칙적으로는 그래요. 소멸시효가 완성되면 회사가 시효 이익을 주장할 수 있어요. 다만 회사가 자발적으로 지급하거나 시효 이익을 포기하면 여전히 받을 수 있어요.",
  },
  {
    q: "회사가 폐업했는데 지연이자도 청구할 수 있나요?",
    a: "체당금 제도로 퇴직금 원금은 일부 회수할 수 있어요. 지연이자는 체당금 지급 대상이 아닐 수 있어요. 고용노동부(1350)에 체당금 신청 방법을 문의하세요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제49조: 퇴직금 청구권 소멸시효 3년", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로기준법 제37조: 지연이자 연 20%", url: "https://www.law.go.kr/법령/근로기준법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 민원마당: 온라인 진정 신청", url: "https://minwon.moel.go.kr" },
      { label: "고용노동부: 퇴직금 제도 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-소멸시효", title: "퇴직금 소멸시효 3년", description: "청구 기한과 시효 중단 방법." },
  { slug: "퇴직금-지연이자", title: "퇴직금 지연이자 계산", description: "연 20% 지연이자를 직접 계산해봐요." },
  { slug: "퇴직금-미지급-신고", title: "퇴직금 미지급 신고 방법", description: "노동청 진정 절차를 단계별로 안내해요." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} highlightSlugs={퇴직금_HIGHLIGHT} currentSlug="퇴직금-미지급-청구-기한-지연이자" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 청구기한 · 지연이자</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 못 받았는데 3년 지났을까요?<br />
        소멸시효 기산일과 연 20% 지연이자 계산법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금 <a href="/w/퇴직금-소멸시효" style={{ color: "#1D9E75", textDecoration: "underline" }}>청구권 소멸시효</a>는
        퇴직일 다음 날부터 3년이에요.
        퇴직 후 14일이 지나면 자동으로 <a href="/w/퇴직금-지연이자" style={{ color: "#1D9E75", textDecoration: "underline" }}>지연이자(연 20%)</a>가
        붙고, 이것도 3년 내에 청구해야 해요.
        기한이 촉박하다면 내용증명 발송만으로 소멸시효를 중단시킬 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>소멸시효 3년, 정확히 언제부터 카운트되나요?</H2>
      <p style={body}>
        퇴직일 다음 날 0시부터 3년이에요. 2023년 3월 1일 퇴직이라면 2026년 3월 2일이 마지노선이에요.
        이 날짜를 넘기면 회사가 소멸시효를 주장할 수 있고, 그러면 청구가 어려워져요.
        내용증명 발송·노동청 진정 신청이 있으면 시효가 중단돼서 그 시점부터 새로 3년이 시작돼요.
      </p>
      <p style={body}>
        지연이자는 퇴직일로부터 14일이 지난 순간부터 쌓여요.
        미지급 퇴직금 × 연 20% ÷ 365 × 지연 일수가 공식이에요.
        지급받는 날까지 매일 누적되니 늦게 받을수록 이자가 더 커요.
      </p>

      <GreenBox>
        소멸시효: 퇴직일 다음 날부터 3년 (근로기준법 제49조)<br />
        지연이자: 14일 초과분에 연 20% (근로기준법 제37조)<br />
        시효 중단: 내용증명·노동청 진정·소송 접수 시 중단
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="퇴직금 + 지연이자 청구가 가능해요. 아래 계산기로 지연이자를 계산해보세요."
        partialMatchText="상황에 따라 다를 수 있어요. 고용노동부(1350) 상담을 권해요."
      />

      <Divider />

      <H2>지연이자 총액, 직접 계산해보세요</H2>
      <p style={body}>
        미지급 퇴직금과 14일 초과 지연 일수를 입력하면 지연이자와 총 청구액을 바로 확인할 수 있어요.
        지급이 늦어질수록 이자가 쌓이니 청구는 빠를수록 유리해요.
      </p>
      <p style={body}>
        계산한 금액은 노동청 진정서나 내용증명에 그대로 적으면 돼요.
        퇴직금 원금과 지연이자를 구분해서 명시하는 게 처리 속도를 높이는 데 도움이 돼요.
      </p>

      <SectionBadge>지연이자 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 근로기준법 제37조 기준 연 20%. 14일 초과분부터 실제 지급일까지 누적 계산이에요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>청구에 필요한 서류</H2>
      <p style={body}>
        급여명세서와 근로계약서로 퇴직금 산정 기준을 입증해야 해요.
        퇴직 후엔 서류 발급이 어려울 수 있으니 재직 중에 미리 챙겨두는 게 좋아요.
      </p>
      <p style={body}>
        퇴직 확인서는 인사팀에 서면으로 요청하면 발급해줘야 해요.
        4대보험 자격상실 확인서는 가입자 포털(4insure.or.kr)에서 무료로 내려받을 수 있어요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>소멸시효 중단부터 청구까지 4단계</H2>
      <p style={body}>
        소멸시효 확인 → 지연이자 계산 → 내용증명 발송 → 노동청 진정·소송 순서예요.
        3년이 다 되어간다면 내용증명부터 바로 발송하세요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>청구 전 체크리스트</H2>
      <p style={body}>
        소멸시효 3년을 놓치지 않는 게 가장 중요해요. 지연이자도 퇴직금과 함께 청구하면 추가로 받을 수 있어요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        퇴직금만 받으면 손해예요. 14일 초과분부터 연 20% 지연이자까지 함께 청구하는 게 원칙이에요.<br />
        모르고 포기하는 경우가 많으니 꼭 챙기세요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 청구 기한과 지연이자에 관해 자주 나오는 질문들이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
