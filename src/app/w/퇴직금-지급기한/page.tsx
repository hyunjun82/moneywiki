"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직일로부터 14일이 넘었어요" },
  { id: "c2", label: "지급 기한 연장을 서면으로 합의한 적이 없어요" },
  { id: "c3", label: "1년 이상 계속 근로한 근로자예요" },
  { id: "c4", label: "퇴직한 지 3년이 지나지 않았어요" },
];

const CALC_SLIDERS = [
  { id: "severance", label: "퇴직금 총액", min: 100, max: 10000, step: 100, defaultValue: 2000, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "delay", label: "14일 초과 지연 일수", min: 1, max: 365, step: 1, defaultValue: 30, format: (v: number) => `${v}일` },
];

const CALC_RESULTS = [
  {
    label: "지연이자 (연 20%)",
    getValue: (v: Record<string, number>) => Math.round(v.severance * 10000 * 0.2 * v.delay / 365),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "총 청구 금액 (퇴직금 + 지연이자)",
    getValue: (v: Record<string, number>) => v.severance * 10000 + Math.round(v.severance * 10000 * 0.2 * v.delay / 365),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "근로계약서 또는 재직증명서", required: true, where: "회사 인사팀" },
  { name: "급여명세서 (최근 3개월)", required: true, where: "인사팀 또는 급여 앱" },
  { name: "퇴직 확인서 또는 사직서 수리 확인", required: true, where: "회사 인사팀" },
  { name: "IRP 계좌번호 (300만원 초과 시)", required: true, where: "은행·증권사 개설 후 확인" },
  { name: "퇴직금 지급 청구서 (회사 양식)", required: false, where: "회사 인사팀" },
];

const STEPS = [
  {
    title: "지급 기한 날짜 계산",
    desc: "퇴직일 다음 날부터 14일을 세요. 14일째 날이 토요일·일요일·공휴일이면 다음 첫 영업일이 기한이에요. 14일은 근무일이 아닌 달력일(캘린더 기준)이에요.",
    tip: "퇴직일 포함 안 해요. 퇴직 다음 날부터 1일로 세기 시작해요",
  },
  {
    title: "IRP 계좌번호 인사팀 통보",
    desc: "퇴직금 300만원 초과 시 반드시 IRP 계좌로만 받을 수 있어요. IRP 계좌번호를 미리 인사팀에 문자·메일로 알려주세요. 계좌를 안 알려주면 회사가 이체 자체를 할 수 없어서 지연 귀책이 근로자에게 돌아올 수 있어요.",
    tip: "IRP 계좌는 은행·증권사에서 당일 개설 가능해요",
  },
  {
    title: "인사팀에 지급 요청",
    desc: "14일이 지났는데도 퇴직금이 안 들어왔으면 인사팀에 문자나 메일로 지급 요청을 보내세요. 요청 일자와 내용을 기록으로 남겨두세요. 대부분 이 단계에서 지급이 이뤄져요.",
    tip: "구두 요청은 증거가 안 돼요. 반드시 문자·메일로 남겨두세요",
  },
  {
    title: "내용증명 발송 및 노동청 신고",
    desc: "요청 후에도 지급이 없으면 내용증명으로 퇴직금과 지연이자 지급을 요청하세요. 내용증명 발송 후에도 응답 없으면 고용노동부 민원마당(minwon.moel.go.kr)에서 임금체불 진정을 접수해요.",
    tip: "내용증명 발송만으로도 소멸시효 3년이 중단돼요",
    link: { label: "고용노동부 민원마당 신청", href: "https://minwon.moel.go.kr" },
  },
];

const CHECKLIST = [
  "지급 기한 계산: 퇴직 다음 날부터 14일 (달력일 기준)",
  "IRP 계좌 개설: 퇴직금 300만원 초과 시 IRP 계좌로만 수령",
  "IRP 계좌번호 인사팀 통보: 문자·메일로 기록 남기기",
  "14일 초과 시: 연 20% 지연이자 자동 발생",
  "내용증명 발송: 지급 요청 + 지연이자 청구 동시에",
  "소멸시효 3년: 퇴직일로부터 3년 이내 청구",
];

const FAQS = [
  {
    q: "14일이 토요일이면 언제까지 줘야 하나요?",
    a: "토요일·일요일·공휴일이 기한이면 다음 첫 영업일이 기한이에요. 예를 들어 14일째 날이 토요일이면 그 다음 월요일까지 입금하면 기한 내 지급이에요.",
  },
  {
    q: "지급 기한을 연장할 수 있나요?",
    a: "가능해요. 회사와 근로자가 서면으로 합의하면 기한을 늘릴 수 있어요. 단, 구두 합의는 인정되지 않아요. 연장 합의서를 꼭 서면으로 작성해 두세요.",
  },
  {
    q: "IRP 계좌번호를 아직 안 알려줬는데 14일이 지났어요",
    a: "IRP 계좌를 알려주지 않으면 회사가 이체 자체를 할 수 없어요. 이 경우 지연에 대한 귀책이 근로자에게 있을 수 있어요. 빨리 IRP 계좌번호를 문자·메일로 인사팀에 통보하세요.",
  },
  {
    q: "퇴직금 300만원 이하면 IRP 계좌가 없어도 되나요?",
    a: "맞아요. 퇴직금이 300만원 이하면 IRP 의무 이전 대상이 아니에요. 일반 계좌로 받을 수 있어요. 300만원 초과분은 IRP 계좌로만 받을 수 있어요.",
  },
  {
    q: "퇴직금 지급 기한이 14일인 법적 근거가 뭔가요?",
    a: "근로자퇴직급여보장법 제9조에 따라 퇴직 후 14일 이내 지급 의무가 규정돼요. 14일을 초과하면 근로기준법 제37조에 따라 연 20% 지연이자가 발생해요.",
  },
  {
    q: "퇴직금 청구권 소멸시효는 얼마나 되나요?",
    a: "퇴직일로부터 3년이에요. 3년이 지나면 퇴직금과 지연이자 청구권이 모두 소멸해요. 내용증명 발송만으로도 소멸시효를 중단시킬 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 제9조: 퇴직금 지급 기한 14일", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "근로기준법 제37조: 지연이자 연 20%", url: "https://www.law.go.kr/법령/근로기준법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 민원마당: 임금체불 진정 신청", url: "https://minwon.moel.go.kr" },
      { label: "고용노동부: 퇴직급여 제도 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-지급-기한", title: "퇴직금 지급 기한 14일 원칙", description: "지급 기한 계산법과 기한 초과 대응 방법." },
  { slug: "퇴직금-지연이자", title: "퇴직금 지연이자 연 20% 계산법", description: "지연이자 발생 기준과 실수령 예상액 계산." },
  { slug: "퇴직금-미지급-신고", title: "퇴직금 미지급 신고 방법", description: "고용노동부 진정 절차와 내용증명 작성법." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-지급기한" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 지급기한 · 14일</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금, 언제까지 들어와야 하나요?<br />
        지급 기한 14일 계산법과 초과 시 지연이자 청구
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직했는데 퇴직금이 안 들어오는 분들이 생각보다 많아요.
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법 제9조</a>는 퇴직 후 14일 이내 지급 의무를 규정하고 있어요.
        14일은 달력일 기준이고, 이 기한을 넘기면 <a href="/w/퇴직금-지연이자" style={{ color: "#1D9E75", textDecoration: "underline" }}>연 20% 지연이자</a>가 자동으로 붙어요.
        지금 내 기한이 언제인지, 이미 초과했다면 이자가 얼마인지 이 글에서 바로 계산할 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>퇴직금 지급 기한 자격, 내가 해당되나요?</H2>
      <p style={body}>
        퇴직금 지급 기한 14일 규정은 1년 이상 계속 근로한 근로자라면 전부 적용돼요.
        정규직·계약직·아르바이트 구분이 없고, 5인 미만 사업장도 예외 없이 적용돼요.
        지급 기한은 퇴직일 다음 날부터 달력일로 14일을 세요.
      </p>
      <p style={body}>
        회사와 서면으로 기한 연장에 합의했다면 그 기한까지는 이자가 발생하지 않아요.
        구두 합의는 인정되지 않아요. 합의 없이 14일을 넘기면 그 다음 날부터 <a href="/w/퇴직금-지연이자" style={{ color: "#1D9E75", textDecoration: "underline" }}>연 20% 지연이자</a>가 붙어요.
      </p>

      <GreenBox title="14일 지급 기한 핵심">
        기산일: 퇴직일 다음 날부터 14일 (달력일 기준)<br />
        300만원 초과: IRP 계좌로만 이체 가능<br />
        기한이 주말·공휴일: 다음 영업일로 자동 연장<br />
        합의 없이 초과 시: 연 20% 지연이자 자동 발생<br />
        청구권 소멸시효: 퇴직일로부터 3년
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="지연이자 청구 및 노동청 신고가 가능한 상황이에요. 아래 계산기로 지연이자를 먼저 확인하세요."
        partialMatchText="상황에 따라 다를 수 있어요. 고용노동부(1350) 상담을 먼저 받아보세요."
      />

      <Divider />

      <H2>지급 기한 초과, 지연이자는 얼마일까?</H2>
      <p style={body}>
        14일이 지났다면 지연이자가 얼마나 붙었는지 먼저 계산해 보세요.
        이자는 퇴직금 × 연 20% ÷ 365 × 지연 일수로 계산해요.
        퇴직금 2,000만원을 30일 지연하면 이자만 약 32만원이에요.
      </p>
      <p style={body}>
        슬라이더로 내 퇴직금 총액과 지연 일수를 조정하면 청구 가능한 금액을 바로 확인할 수 있어요.
        이 금액이 내용증명과 노동청 진정 시 청구 근거가 돼요.
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

      <H2>퇴직금 수령에 필요한 서류</H2>
      <p style={body}>
        퇴직금을 받으려면 인사팀에 IRP 계좌번호와 함께 몇 가지 서류를 제출해야 해요.
        퇴직금 지급 기한 내에 서류를 갖추지 못하면 지급이 늦어질 수 있어요.
        지급 요청이나 노동청 진정 시에는 근로계약서와 급여명세서가 핵심 증빙이 돼요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>퇴직금 지급 기한 내 수령 절차</H2>
      <p style={body}>
        기한 계산부터 IRP 계좌 통보, 인사팀 요청까지 순서대로 진행하면 돼요.
        대부분은 3단계(인사팀 요청)에서 끝나고, 4단계(내용증명·노동청)까지 가는 경우는 많지 않아요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>지급 기한 전에 챙겨야 할 것들</H2>
      <p style={body}>
        퇴직 후 14일은 생각보다 빨리 지나가요. IRP 계좌 개설과 인사팀 통보를 먼저 해두면 기한 내 수령을 놓치지 않아요.
        이미 14일이 지났다면 지연이자 청구 절차를 바로 시작하세요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="IRP 계좌번호를 미리 알려줘야 이체돼요">
        퇴직금 300만원 초과 시 IRP 계좌로만 받을 수 있어요.<br />
        퇴직 전에 IRP 계좌를 개설하고 계좌번호를 인사팀에 문자·메일로 통보해 두세요.<br />
        계좌 정보 없이는 회사가 이체 자체를 못 해요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 지급 기한과 수령 방법에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법과 근로기준법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
