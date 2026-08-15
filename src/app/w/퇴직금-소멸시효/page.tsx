"use client";
import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR, 퇴직금_HIGHLIGHT } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직한 지 3년이 지나지 않았어요" },
  { id: "c2", label: "퇴직금을 한 번도 받지 못했어요" },
  { id: "c3", label: "근무 기간을 증명할 수 있는 서류가 있어요" },
  { id: "c4", label: "회사에 퇴직금 지급을 요청한 적이 없어요 (아직 시효 진행 중)" },
];

const CALC_SLIDERS = [
  { id: "amount", label: "미지급 퇴직금", min: 100, max: 10000, step: 100, defaultValue: 1000, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "monthsPassed", label: "퇴직 후 경과 개월", min: 1, max: 36, step: 1, defaultValue: 12, format: (v: number) => `${v}개월 경과 (${Math.max(0, 36 - v)}개월 남음)` },
];

const CALC_RESULTS = [
  {
    label: "소멸시효까지 남은 기간",
    getValue: (v: Record<string, number>) => Math.max(0, 36 - v.monthsPassed),
    format: (v: number) => v === 0 ? "시효 소멸 위험" : `약 ${v}개월 남음`,
    highlight: true,
  },
  {
    label: "지연이자 (연 20% 기준)",
    getValue: (v: Record<string, number>) => {
      const days = Math.max(0, v.monthsPassed * 30 - 14);
      return Math.round(v.amount * 10000 * 0.2 * days / 365);
    },
    format: (v: number) => v === 0 ? "아직 발생 전" : `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "근로계약서", required: true, where: "입사 당시 서면 교부본 또는 인사팀 요청" },
  { name: "사직서 또는 해고통지서 (퇴직일 증빙)", required: true, where: "본인 보관 또는 인사팀" },
  { name: "급여명세서 또는 통장 이체 내역 (3개월치 이상)", required: true, where: "회사 요청 또는 은행 앱" },
  { name: "재직 기간 확인서 또는 건강보험 내역", required: false, where: "국민건강보험공단 앱" },
  { name: "지급 요청 기록 (내용증명·문자·이메일)", required: false, where: "본인 보관" },
];

const STEPS = [
  {
    title: "퇴직일 기준으로 소멸시효 만료일 계산",
    desc: "퇴직일 당일부터 3년이에요. 2023년 3월 1일 퇴직이면 2026년 3월 1일 전에 청구해야 해요. 정확한 날짜를 달력에 표시해두세요.",
    tip: "퇴직일이 불분명하면 마지막 급여 이체일 또는 4대보험 상실일로 확인해요",
  },
  {
    title: "시효가 촉박하면 즉시 내용증명 발송",
    desc: "내용증명을 발송하면 6개월간 시효가 중단돼요(민법 제174조). '퇴직금 ○○만원 지급 요청, 미지급 시 법적 조치 예정'이라는 내용이면 충분해요. 카카오 전자내용증명으로 10분 안에 보낼 수 있어요.",
    tip: "6개월 중단 기간 내에 소송 또는 지급명령 신청까지 해야 완전히 중단돼요",
    link: { label: "카카오 전자내용증명", href: "https://www.kakaocert.com" },
  },
  {
    title: "고용노동부 진정 접수",
    desc: "고용노동부 온라인 민원(minwon.moel.go.kr)에서 퇴직금 미지급 진정을 접수해요. 무료이고, 근로감독관이 직접 사업주에게 출석 요구·조사를 해줘요. 처리 기간은 보통 1~3개월이에요.",
    tip: "진정 접수만으로는 시효 중단 효과가 불확실해요. 내용증명과 함께 병행하는 게 좋아요",
    link: { label: "고용노동부 온라인 민원", href: "https://minwon.moel.go.kr" },
  },
  {
    title: "지급명령 신청 또는 소송 제기",
    desc: "지급명령은 법원에 서면으로 신청하는 간편 절차예요. 3,000만원 이하는 본인이 직접 신청할 수 있고, 인지대는 수만원 수준이에요. 신청하는 순간 소멸시효가 완전히 중단돼요.",
    tip: "대한법률구조공단(132) 무료 법률 상담을 먼저 받으면 절차가 훨씬 쉬워요",
    link: { label: "대한법률구조공단", href: "https://www.klac.or.kr" },
  },
];

const CHECKLIST = [
  "퇴직일 정확히 파악: 소멸시효 3년의 기산점",
  "시효 만료일 계산: 퇴직일 + 3년을 달력에 표시",
  "내용증명 발송: 시효 촉박 시 즉시 → 6개월 중단 확보",
  "고용노동부 진정 접수: 내용증명과 병행",
  "지급명령 또는 소송: 6개월 중단 기간 내 반드시 진행",
  "지연이자 청구: 퇴직 후 14일 초과분 연 20%",
  "서류 보관: 근로계약서·급여명세서·내용증명 사본 3년 이상",
];

const FAQS = [
  {
    q: "소멸시효 3년이 지나면 정말 못 받나요?",
    a: "원칙적으로 청구권이 소멸해요. 다만 회사가 소멸시효를 모르고 자발적으로 지급하면 유효한 변제가 돼요. 시효가 지났더라도 상대방이 시효 소멸 항변을 하지 않으면 받을 수 있는 경우도 있지만, 이건 불확실하니 3년 안에 청구하는 게 맞아요.",
  },
  {
    q: "내용증명을 보내면 소멸시효가 완전히 멈추나요?",
    a: "6개월간 일시 중단돼요(민법 제174조). 완전 중단이 아니에요. 내용증명 발송 후 6개월 안에 소송이나 지급명령 신청을 해야 비로소 시효가 완전히 중단돼요. 내용증명만 보내고 그냥 두면 6개월 뒤 시효가 다시 진행해요.",
  },
  {
    q: "퇴직금 일부만 받았는데 나머지도 3년 기준인가요?",
    a: "맞아요. 미지급 금액에 대한 청구권 기산점은 퇴직일이에요. 일부 지급이 있었어도 나머지 미지급분은 퇴직일로부터 3년 안에 청구해야 해요.",
  },
  {
    q: "회사가 폐업했어도 3년 시효가 적용되나요?",
    a: "적용돼요. 단, 회사 폐업·파산 시에는 체당금 제도를 통해 정부에서 대신 지급받을 수 있어요. 파산 선고일로부터 2년 내 신청 기한이 별도로 있어서 소멸시효와 별개로 챙겨야 해요.",
  },
  {
    q: "고용노동부 진정을 넣으면 소멸시효가 중단되나요?",
    a: "진정 접수만으로는 시효 중단으로 인정받기 어려워요. 법적으로 확실한 방법은 내용증명 발송(6개월 중단) 후 소송 또는 지급명령 신청이에요. 진정은 이 절차와 병행하는 게 좋아요.",
  },
  {
    q: "지연이자는 언제부터 붙나요?",
    a: "퇴직 후 14일이 지난 시점부터 연 20%가 붙어요. 퇴직 후 30일이 지났다면 16일치 이자가 이미 발생한 거예요. 미지급 퇴직금이 1,000만원이면 하루 약 5,479원씩 이자가 쌓여요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제49조: 퇴직금 청구권 소멸시효 3년", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로자퇴직급여 보장법 제10조: 퇴직금 지급 기한 14일", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "민법 제174조: 최고에 의한 시효 중단 (6개월)", url: "https://www.law.go.kr/법령/민법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부: 퇴직금 미지급 진정 안내", url: "https://minwon.moel.go.kr" },
      { label: "대한법률구조공단: 무료 법률 상담 (132)", url: "https://www.klac.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-미지급-신고", title: "퇴직금 미지급 신고 방법", description: "고용노동부 진정 접수부터 처리 절차까지." },
  { slug: "퇴직금-지연이자", title: "퇴직금 지연이자 연 20% 받는 방법", description: "지연이자 계산과 청구 절차 정리." },
  { slug: "퇴직금-계산법", title: "퇴직금 계산법, 얼마나 받을까?", description: "평균임금 기준 퇴직금 계산기 제공." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} highlightSlugs={퇴직금_HIGHLIGHT} currentSlug="퇴직금-소멸시효" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 소멸시효 · 청구 기한</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 청구, 3년 지나면 못 받나요?<br />
        소멸시효 기산점부터 시효 중단 방법까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금 청구권은 퇴직일로부터 3년이에요.{" "}
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제49조</a>에 명시된 기한이고,
        3년이 지나면 법적으로 청구가 막혀요.
        시효가 촉박하더라도 내용증명 하나만 발송해도 6개월을 벌 수 있어요.
        기산점 계산부터 시효 중단 절차까지{" "}
        <a href="/w/퇴직금-미지급-신고" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 미지급 신고</a>와 함께 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>지금 퇴직금 청구할 수 있는 상황인가요?</H2>
      <p style={body}>
        소멸시효의 기산점은 퇴직일 당일이에요. 2023년 1월 1일에 퇴직했다면 2026년 1월 1일 전에 청구해야 해요.
        퇴직금을 아예 못 받은 경우뿐 아니라 일부만 받은 경우도 마찬가지예요.
        미지급 금액에 대한 청구권은 퇴직일 기준 3년이 기산점이에요.
      </p>
      <p style={body}>
        3년이 지나도 회사가 자발적으로 지급하면 유효한 변제가 돼요.
        그러나 회사가 소멸시효를 주장하면 법적으로 청구를 막을 수 있어요.
        시효가 남아있는 지금 행동하는 게 가장 확실해요.
      </p>

      <GreenBox>
        기산점: 퇴직일 당일 (근로기준법 제49조)<br />
        기간: 3년 — 이후 법적 청구권 소멸<br />
        중단: 내용증명 발송(6개월) → 소송·지급명령 신청(완전 중단)
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="지금 퇴직금 청구가 가능해요. 남은 시효 기간을 계산하고 즉시 행동하세요."
        partialMatchText="상황이 다를 수 있어요. 고용노동부(1350) 또는 대한법률구조공단(132)에 상담해보세요."
      />

      <Divider />

      <H2>남은 소멸시효와 지연이자, 얼마나 될까?</H2>
      <p style={body}>
        퇴직 후 경과 개월과 미지급 퇴직금 금액을 입력하면 남은 시효와 지연이자를 바로 확인할 수 있어요.
        지연이자는 퇴직 후 14일이 지난 날부터 연 20%가 붙어요.
        미지급 퇴직금 1,000만원 기준으로 1개월만 지나도 이자가 십수만원씩 쌓여요.
      </p>

      <SectionBadge>소멸시효 + 지연이자 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 소멸시효: 퇴직일부터 3년(근로기준법 제49조). 지연이자: 14일 초과분 연 20%(근로자퇴직급여 보장법 제10조)."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>청구할 때 필요한 서류</H2>
      <p style={body}>
        서류가 없어도 진정·소송 접수 자체는 가능해요. 그러나 서류가 있으면 처리 속도가 빠르고,
        분쟁이 생겼을 때 훨씬 유리해요.
        퇴직 직후에 아래 서류를 미리 챙겨두는 게 좋아요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>소멸시효 중단 절차, 단계별로</H2>
      <p style={body}>
        시효가 촉박하다면 1단계 계산 없이 바로 내용증명 발송으로 시작해도 괜찮아요.
        내용증명만으로 6개월을 확보하고, 그 사이에 법적 절차를 진행하면 돼요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>소멸시효, 놓치면 안 되는 체크포인트</H2>
      <p style={body}>
        시효 관련 실수는 되돌릴 수 없어요. 특히 내용증명 후 6개월을 그냥 넘기는 경우가 많아서,
        타임라인을 꼭 달력에 적어두세요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        내용증명 발송 하나로 6개월을 벌 수 있어요.<br />
        '퇴직금 ○○만원 지급 요청, 미지급 시 법적 조치 예정' — 이 정도면 충분해요.<br />
        카카오 전자내용증명으로 10분 안에 발송 가능하고, 발송 기록이 법적 증거가 돼요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 소멸시효에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법·민법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350) 또는 대한법률구조공단(132)에서 상담하세요." />
    </ArticleLayout>
  );
}
