"use client";
// Q1. 퇴사한 지 14일이 넘었는데 퇴직금이 아직 안 들어와서, 위법인지·지금 뭘 해야 하는지 모르는 상태
// Q2. 지연이자 금액을 계산하고 고용노동청에 진정을 접수하는 행동
// Q3. 14일 기한은 달력일 기준, 지연이자는 14일 초과 다음 날부터 연 20%, 서면 합의 시 이자 포기 조항 주의, 소멸시효 3년
// Q4. GreenBox(핵심 숫자 요약) + Calculator(지연이자 직접 계산) + Steps(단계별 행동) + FAQ(실전 의문 해소)
// MAP: Q1→서론 첫 문장(상황 공감) Q2→H2 순서(계산→절차) Q3→H2 깊이(기한·이자·서류·절차·체크) Q4→컴포넌트 배치

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR, 퇴직금_HIGHLIGHT } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직일로부터 14일이 지났죠" },
  { id: "c2", label: "퇴직금 지급 기한 연장에 서면 합의하지 않았죠" },
  { id: "c3", label: "퇴직금이 아직 입금되지 않았죠" },
  { id: "c4", label: "퇴직한 지 3년이 안 됐죠" },
];

const CALC_SLIDERS = [
  { id: "amount", label: "미지급 퇴직금 (만원)", min: 100, max: 5000, step: 100, defaultValue: 1000, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "delay", label: "지연 일수 (14일 초과분)", min: 1, max: 365, step: 1, defaultValue: 30, format: (v: number) => `${v}일` },
];

const CALC_RESULTS = [
  {
    label: "지연이자 (연 20% 기준)",
    getValue: (v: Record<string, number>) => Math.round(v.amount * 10000 * 0.20 * v.delay / 365),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "퇴직금 + 지연이자 합계",
    getValue: (v: Record<string, number>) => v.amount * 10000 + Math.round(v.amount * 10000 * 0.20 * v.delay / 365),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "퇴직확인서 또는 사직서 사본", required: true, where: "회사 인사팀" },
  { name: "급여명세서 (최근 3개월)", required: true, where: "회사 인사팀 요청" },
  { name: "통장 거래내역 (미입금 확인용)", required: true, where: "인터넷뱅킹" },
  { name: "근로계약서", required: false, where: "인사팀 또는 입사 시 수령본" },
];

const STEPS = [
  {
    title: "14일 경과 여부 파악",
    desc: "퇴직금은 퇴직일 다음 날부터 14일 이내(달력일 기준)에 지급해야 해요. 합의 없이 이 기한을 넘기면 체불에 해당하고, 지연이자(연 20%)는 14일이 지난 다음 날부터 실제 지급일까지 자동 발생해요.",
    tip: "공휴일이어도 달력일 기준으로 14일 계산해요",
  },
  {
    title: "내용증명 발송",
    desc: "퇴직금 지급을 공식적으로 요청하는 내용증명을 보내요. 인터넷우체국(epost.go.kr)에서 온라인 발송이 가능해요. 요청일, 미지급 금액, 지연이자, 지급 요청 기한을 명시하면 법적 증거가 돼요.",
    tip: "내용증명은 나중에 노동청 진정이나 소송 시 결정적인 증거가 돼요",
    link: { label: "인터넷우체국 내용증명 발송", href: "https://www.epost.go.kr" },
  },
  {
    title: "고용노동청 진정 접수",
    desc: "내용증명 후에도 지급하지 않으면 관할 고용노동청에 체불 진정을 내요. 고용24 온라인 또는 방문으로 접수가 가능해요. 근로감독관이 조사 후 지급 명령을 내려요.",
    tip: "온라인 진정이 가장 빠르고, 비용이 전혀 들지 않아요",
    link: { label: "고용24 온라인 진정 접수", href: "https://www.work.go.kr" },
  },
  {
    title: "소액심판 또는 민사소송",
    desc: "노동청 진정으로도 해결이 안 되면 법원에 소액심판(3,000만원 이하) 또는 민사소송을 제기해요. 지연이자(연 20%)까지 함께 청구할 수 있고, 소멸시효는 퇴직일로부터 3년이에요.",
    tip: "3,000만원 이하라면 소액심판이 빠르고 비용도 저렴해요",
  },
];

const CHECKLIST = [
  "지급 기한 14일: 퇴직일 다음 날부터 달력일 기준 14일",
  "지연이자: 14일 초과 시 연 20% 자동 발생 (근로기준법 제37조)",
  "서면 합의 여부: 연장 합의서에 이자 포기 조항 없는지 살펴봐야 해요",
  "내용증명: 지급 요청 공식 기록 인터넷우체국 발송",
  "소멸시효: 퇴직일로부터 3년 이내에 청구",
];

const FAQS = [
  {
    q: "퇴사 후 14일이 지났는데 퇴직금이 안 오면 무조건 위법인가요?",
    a: "근로자와 사업주가 서면으로 지급 기한 연장에 합의하면 합법이에요. 합의 없이 14일을 넘기면 위법이고, 형사 고발도 가능해요. 회사가 일방적으로 늦추는 건 체불에 해당해요.",
  },
  {
    q: "지연이자 연 20%는 언제부터 계산하나요?",
    a: "퇴직일로부터 14일이 지난 다음 날부터 실제 지급일까지 연 20%로 계산해요. 예를 들어 1,000만원이 30일 지연됐다면 약 16만원의 지연이자가 발생해요.",
  },
  {
    q: "회사가 지급 기한 연장 동의서에 서명하라고 하면 어떻게 해야 하나요?",
    a: "서명 전에 내용을 꼼꼼히 읽어봐야 해요. 이자 포기 조항이 들어 있으면 지연이자 청구권을 잃어요. 구체적인 지급일과 이자 조항이 빠져 있다면 서명하지 않는 게 유리해요.",
  },
  {
    q: "퇴사한 지 1년이 됐는데 아직도 청구할 수 있나요?",
    a: "청구할 수 있죠. 퇴직금 청구권 소멸시효는 3년이에요. 퇴직 후 3년이 지나지 않았다면 고용노동청 진정이나 소액심판으로 지금도 청구 가능해요.",
  },
  {
    q: "퇴직금을 IRP가 아닌 일반 계좌로 받았는데 문제가 생기나요?",
    a: "300만원 초과 퇴직금을 IRP 아닌 계좌로 받은 건 회사 측 위반이에요. 퇴직금을 받은 근로자에게는 불이익이 없고, 회사가 위법 처리될 수 있죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제36조: 금품 청산 (14일 이내 지급)", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로기준법 제37조: 미지급 임금 지연이자 연 20%", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로자퇴직급여보장법 제9조: 퇴직금 지급 기한", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부: 퇴직금 체불 신고 안내", url: "https://www.moel.go.kr" },
      { label: "고용24: 온라인 체불 진정 접수", url: "https://www.work.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-지급-기한-초과", title: "퇴직금 지급 기한 초과 대응", description: "14일 초과 시 지연이자 청구법." },
  { slug: "퇴직금-지연이자", title: "퇴직금 지연이자 계산", description: "연 20% 지연이자 계산 공식과 청구 방법." },
  { slug: "퇴직금-미지급-신고", title: "퇴직금 미지급 신고 방법", description: "노동청 진정·소송 절차를 설명해요." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} highlightSlugs={퇴직금_HIGHLIGHT} currentSlug="퇴사후-퇴직금-지급-기한" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 지급기한 · 14일규정</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴사 후 퇴직금, 언제까지 받아야 하나요?<br />
        14일 기한·지연이자·청구 절차까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직 후 14일이 지났는데 아직도 퇴직금이 안 들어왔다면, 이미 체불 상태에 해당해요.
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제36조</a>는 퇴직일 다음 날부터 달력일 기준 14일 이내 지급을 의무로 규정해요.
        14일을 넘기는 순간 <a href="/w/퇴직금-지연이자" style={{ color: "#1D9E75", textDecoration: "underline" }}>연 20% 지연이자</a>가 자동으로 붙고, <a href="/w/퇴직금-미지급-신고" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동청 진정</a>이나 소액심판으로 전액 청구할 수 있죠.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>14일 기한, 정확히 어떻게 적용되나요?</H2>
      <p style={body}>
        기한은 퇴직일 다음 날부터 달력일로 세어요. 토요일·일요일·공휴일이 끼어도 기한이 늘어나지 않아요.
        단, 근로자와 사업주가 서면으로 지급 기한 연장에 합의한 경우에는 합법적으로 늦출 수 있죠.
        이 합의 없이 14일이 넘으면 체불이고, 형사 처벌 대상도 돼요.
      </p>
      <p style={body}>
        회사가 동의서 서명을 요구할 때는 내용을 꼼꼼히 읽어봐야 해요.
        이자 포기 조항이 들어 있으면 지연이자 청구권을 사실상 잃는 거예요.
        구체적인 지급일과 이자 조항이 빠진 동의서라면 서명하지 않는 게 유리해요.
      </p>

      <GreenBox>
        지급 기한: 퇴직일 다음 날부터 달력일 기준 14일 이내 (근로기준법 제36조)<br />
        지연이자: 14일 초과 시 연 20% 자동 발생 (근로기준법 제37조)<br />
        소멸시효: 퇴직일로부터 3년
      </GreenBox>

      <SectionBadge>내 상황 체크해봐요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="지연이자 청구 조건에 해당해요. 아래 계산기로 금액을 먼저 파악하고 바로 대응하세요."
        partialMatchText="상황에 따라 다를 수 있죠. 고용노동부(1350) 상담을 받아봐야 해요."
      />

      <Divider />

      <H2>지연이자, 얼마나 되나요?</H2>
      <p style={body}>
        14일이 지난 날부터 실제 지급일까지 연 20%로 계산해요.
        미지급 퇴직금과 14일 초과 지연 일수를 입력하면 지연이자를 바로 파악할 수 있죠.
        지연이자도 퇴직금과 함께 청구가 가능해요.
      </p>

      <SectionBadge>지연이자 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 14일 초과일부터 실제 지급일까지 연 20% 적용 (근로기준법 제37조 및 근로기준법 시행령 제18조)."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>청구에 필요한 서류</H2>
      <p style={body}>
        퇴직확인서와 급여명세서가 핵심이에요.
        고용노동청 진정이나 소액심판 시 미지급 사실을 입증하는 서류가 필요해요.
        통장 거래내역으로 미입금 사실을 증명할 수 있죠.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>퇴직금 지연 시 대응 절차</H2>
      <p style={body}>
        내용증명부터 소액심판까지 단계별로 대응하면 돼요.
        고용노동청 진정이 가장 빠르고 비용 없이 해결할 수 있는 방법이에요.
        소멸시효 3년이 지나면 청구가 어려워지니 빠를수록 유리해요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>대응 전 체크리스트</H2>
      <p style={body}>
        소멸시효 3년이 지나면 법적 청구가 어려워요.
        연장 합의서의 이자 포기 조항을 놓치면 지연이자를 잃을 수 있죠.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        퇴직금 청구권 소멸시효는 3년이에요.
        퇴직한 지 1~2년이 지났어도 청구가 가능해요.
        고용노동청 진정은 무료이고 고용24에서 온라인으로 바로 접수할 수 있죠.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴사 후 퇴직금 지급 기한에서 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법과 근로자퇴직급여보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 받아보세요." />
    </ArticleLayout>
  );
}
