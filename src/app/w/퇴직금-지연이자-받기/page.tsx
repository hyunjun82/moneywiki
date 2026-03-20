"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR, 퇴직금_HIGHLIGHT } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직 후 14일이 지났어요" },
  { id: "c2", label: "지급 기한 연장을 서면으로 합의한 적이 없어요" },
  { id: "c3", label: "1년 이상 계속 근로한 근로자예요" },
  { id: "c4", label: "퇴직한 지 3년이 지나지 않았어요" },
];

const CALC_SLIDERS = [
  { id: "amount", label: "미지급 퇴직금", min: 100, max: 10000, step: 100, defaultValue: 1500, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "days", label: "14일 초과 지연 일수", min: 1, max: 365, step: 1, defaultValue: 45, format: (v: number) => `${v}일` },
];

const CALC_RESULTS = [
  {
    label: "지연이자 (연 20%)",
    getValue: (v: Record<string, number>) => Math.round(v.amount * 10000 * 0.2 * v.days / 365),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "총 청구 금액 (퇴직금 + 지연이자)",
    getValue: (v: Record<string, number>) => v.amount * 10000 + Math.round(v.amount * 10000 * 0.2 * v.days / 365),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "사직서 또는 퇴직 확인서", required: true, where: "본인 보관 또는 회사 인사팀" },
  { name: "급여명세서 (최근 3개월)", required: true, where: "회사 인사팀 요청" },
  { name: "근로계약서", required: true, where: "인사팀 또는 입사 시 수령본" },
  { name: "지급 요청 기록 (문자·메일 캡처)", required: true, where: "직접 보관" },
  { name: "내용증명 발송 영수증", required: false, where: "우체국 방문 또는 카카오 전자내용증명" },
];

const STEPS = [
  {
    title: "지연이자 금액 계산",
    desc: "미지급 퇴직금 × 20% ÷ 365 × 지연 일수로 계산해요. 14일 초과 시점부터 실제 지급일까지 매일 이자가 쌓여요. 퇴직금 1,500만원을 45일 지연하면 이자만 약 37만원이에요. 청구서 발송 전에 금액을 먼저 계산해두세요.",
    tip: "위 계산기로 지연이자를 바로 확인할 수 있어요",
  },
  {
    title: "내용증명으로 퇴직금 + 지연이자 청구",
    desc: "퇴직금 원금과 지연이자를 합산해서 내용증명으로 청구해요. '퇴직일로부터 14일이 경과했으므로 근로기준법 제37조에 따라 연 20% 지연이자를 포함한 OOO원을 청구합니다'라고 명시하면 돼요. 내용증명은 소멸시효 3년도 중단시켜요.",
    tip: "우체국 방문 또는 카카오 전자내용증명으로 간편 발송 가능해요",
  },
  {
    title: "고용노동부 진정 신청",
    desc: "내용증명 발송 후 3~5영업일 내 응답이 없으면 고용노동부 민원마당에서 임금체불 진정을 접수해요. 진정 시 지연이자도 함께 청구할 수 있어요. 근로감독관이 조사 후 지급 명령을 내리고, 보통 2~4주 내 처리돼요.",
    tip: "minwon.moel.go.kr → 민원신청 → 임금체불 진정",
    link: { label: "고용노동부 민원마당 바로가기", href: "https://minwon.moel.go.kr" },
  },
  {
    title: "형사 고발 또는 민사 소송",
    desc: "진정 후에도 지급이 없으면 근로기준법 위반(2년 이하 징역 또는 2,000만원 이하 벌금)으로 형사 고발하거나 법원에 지급명령 신청을 낼 수 있어요. 대한법률구조공단(132)에서 무료 법률 지원을 받을 수 있어요.",
    tip: "형사 고발 직후 합의가 이뤄지는 경우가 많아요",
    link: { label: "대한법률구조공단 무료 상담(132)", href: "https://www.klac.or.kr" },
  },
];

const CHECKLIST = [
  "지연이자 계산: 미지급 퇴직금 × 20% ÷ 365 × 지연 일수",
  "내용증명 발송: 퇴직금 원금 + 지연이자 합산 금액 청구",
  "증거 보관: 문자·메일·카카오톡 스크린샷 저장",
  "고용노동부 진정: 민원마당 온라인 신청 (무료)",
  "소멸시효 3년: 내용증명 발송으로 시효 중단 가능",
  "법률 지원: 대한법률구조공단(132) 무료 상담 활용",
];

const FAQS = [
  {
    q: "지연이자는 자동으로 들어오나요?",
    a: "법적으로는 자동 발생하지만, 실제로 받으려면 직접 청구해야 해요. 퇴직금만 받고 넘어가면 이자는 포기하게 돼요. 내용증명이나 노동청 진정 시 지연이자를 명시해서 함께 청구하세요.",
  },
  {
    q: "퇴직금을 받았는데 지연이자도 따로 청구할 수 있나요?",
    a: "가능해요. 지연이자는 퇴직금과 별도로 청구할 수 있어요. 퇴직금을 받았더라도 14일 초과분 이자는 따로 내용증명이나 노동청 진정으로 청구하면 받을 수 있어요.",
  },
  {
    q: "회사가 퇴직금만 주겠다고 하면 어떻게 하나요?",
    a: "지연이자는 근로기준법 제37조에 따라 법으로 보장된 권리예요. 이자 포기 서면 합의를 강요받았다면 무효 주장이 가능해요. 서명하기 전에 고용노동부(1350)에 상담해보세요.",
  },
  {
    q: "IRP 계좌번호를 안 알려줬는데 지연이자를 받을 수 있나요?",
    a: "IRP 계좌번호를 알려주지 않으면 이체 자체가 불가능해서 지연 귀책이 근로자에게 있을 수 있어요. 먼저 IRP 계좌번호를 인사팀에 전달하고, 그 이후에도 입금이 없으면 지연이자를 청구할 수 있어요.",
  },
  {
    q: "소멸시효 3년이 지났으면 정말 못 받나요?",
    a: "원칙적으로 3년이 지나면 청구권이 소멸해요. 하지만 내용증명, 진정, 소송 등으로 시효를 중단시킬 수 있어요. 3년이 임박했다면 내용증명을 먼저 발송해서 시효를 중단시키세요.",
  },
  {
    q: "회사가 폐업했는데 지연이자도 받을 수 있나요?",
    a: "체당금 제도를 통해 퇴직금 원금 일부를 받을 수 있어요. 지연이자는 체당금 지급 대상이 아닐 수 있어요. 고용노동부(1350) 또는 근로복지공단에서 체당금 신청 방법을 확인하세요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제37조: 지연이자 연 20%", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로기준법 제36조: 퇴직 후 14일 이내 금품 청산 의무", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로자퇴직급여보장법 제9조: 퇴직금 지급 기한", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 민원마당: 임금체불 진정 신청", url: "https://minwon.moel.go.kr" },
      { label: "대한법률구조공단: 무료 법률 지원(132)", url: "https://www.klac.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-지연이자", title: "퇴직금 지연이자 연 20% 계산법", description: "지연이자 발생 기준과 계산 공식 정리." },
  { slug: "퇴직금-지급-기한-초과", title: "퇴직금 지급 기한 14일 초과 대응", description: "기한 초과 시 단계별 대응 방법 안내." },
  { slug: "퇴직금-미지급-신고", title: "퇴직금 미지급 신고 방법", description: "노동청 진정부터 형사 고발까지 절차 정리." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} highlightSlugs={퇴직금_HIGHLIGHT} currentSlug="퇴직금-지연이자-받기" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 지연이자 · 청구방법</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 지연이자, 어떻게 받나요?<br />
        내용증명부터 노동청 신고까지 단계별 청구 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금을 14일 안에 못 받았다면 <a href="/w/퇴직금-지연이자" style={{ color: "#1D9E75", textDecoration: "underline" }}>지연이자(연 20%)</a>를 청구할 권리가 생겨요.
        이자는 자동으로 들어오지 않아요. 직접 청구해야 받을 수 있어요.
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제37조</a>에 명시된 권리이고, 소멸시효 3년 안에 청구하면 퇴직금과 별도로 받을 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>지연이자 청구 자격, 내가 해당되나요?</H2>
      <p style={body}>
        지연이자는 퇴직 후 14일이 지나도 퇴직금이 들어오지 않은 경우에 발생해요.
        회사와 서면으로 기한 연장에 합의했다면 그 기간까지는 이자가 발생하지 않아요.
        구두 합의만 있었다면 인정되지 않아서 14일 초과분부터 이자를 청구할 수 있어요.
      </p>
      <p style={body}>
        소멸시효는 퇴직일로부터 3년이에요. 3년이 지나면 퇴직금과 <a href="/w/퇴직금-지연이자" style={{ color: "#1D9E75", textDecoration: "underline" }}>지연이자</a> 청구권이 모두 소멸해요.
        내용증명 발송만으로도 소멸시효를 중단시킬 수 있으니, 기한이 임박했다면 먼저 내용증명부터 보내세요.
      </p>

      <GreenBox>
        발생 시점: 퇴직 후 14일 초과 시점부터 자동 발생<br />
        이율: 연 20%, 실제 지급일까지 일할 계산<br />
        소멸시효: 퇴직일로부터 3년<br />
        청구 방법: 내용증명 → 노동청 진정 → 형사 고발·민사 소송
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="지연이자 청구 및 노동청 신고가 가능한 상황이에요. 아래 계산기로 이자를 먼저 계산하세요."
        partialMatchText="상황에 따라 다를 수 있어요. 고용노동부(1350) 상담을 먼저 받아보세요."
      />

      <Divider />

      <H2>지연이자 실수령 예상액 계산</H2>
      <p style={body}>
        미지급 퇴직금 금액과 14일을 초과한 지연 일수를 입력하면 청구 가능한 지연이자를 바로 확인할 수 있어요.
        이자는 퇴직금이 실제로 지급된 날까지 매일 쌓여요.
        퇴직금 1,500만원을 45일 지연하면 이자만 약 37만원이에요.
      </p>
      <p style={body}>
        이 금액이 내용증명과 노동청 진정서 작성 시 청구 근거 금액이 돼요.
        지급 전까지 날마다 이자가 늘어나니 빨리 행동하는 게 유리해요.
      </p>

      <SectionBadge>퇴직금 지연이자 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 근로기준법 제37조 연 20% 기준. 14일 초과 시점부터 실제 지급일까지 누적 계산이에요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>지연이자 청구에 필요한 서류</H2>
      <p style={body}>
        서류가 많지 않아도 지연이자 청구는 가능해요.
        퇴직 날짜를 증명하는 사직서·퇴직확인서와 급여 수준을 확인할 수 있는 명세서가 핵심이에요.
        지급 요청 기록을 따로 보관해두면 노동청 진정 시 유리한 증거가 돼요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>지연이자 받는 단계별 방법</H2>
      <p style={body}>
        지연이자 계산 → 내용증명 → 노동청 진정 → 형사 고발·소송 순서예요.
        4단계까지 가는 경우는 드물고, 대부분 2~3단계에서 지급이 이뤄져요.
        각 단계에서 서면 기록을 남겨두는 게 핵심이에요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>청구 전에 챙겨야 할 것들</H2>
      <p style={body}>
        퇴직금만 받고 지연이자를 포기하는 경우가 많아요.
        법으로 보장된 권리이고, 청구하지 않으면 자동으로 받을 수 없어요.
        소멸시효 3년을 놓치지 않도록 빠르게 행동하는 게 중요해요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        퇴직금이 늦게라도 들어왔다고 끝이 아니에요.<br />
        14일 초과분 지연이자는 따로 청구해야 받을 수 있어요.<br />
        내용증명 한 통으로 청구권과 소멸시효를 동시에 보전하세요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        지연이자 받는 방법에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법과 근로자퇴직급여보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
