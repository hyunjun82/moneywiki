"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직 후 14일이 지났는데 아직 퇴직금을 받지 못했어요" },
  { id: "c2", label: "회사에서 퇴직금을 나눠서 주겠다고 했어요" },
  { id: "c3", label: "분할지급 합의서에 서명을 요청받았어요" },
  { id: "c4", label: "지연이자를 얼마나 받을 수 있는지 모르겠어요" },
];

const CALC_SLIDERS = [
  { id: "severance", label: "퇴직금 총액", min: 300, max: 10000, step: 300, defaultValue: 3000, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "delay", label: "지급 지연 일수", min: 1, max: 365, step: 1, defaultValue: 30, format: (v: number) => `${v}일` },
];

const CALC_RESULTS = [
  {
    label: "지연이자 (연 20%)",
    getValue: (v: Record<string, number>) => Math.round(v.severance * 10000 * 0.2 * v.delay / 365),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "합산 청구액 (퇴직금 + 지연이자)",
    getValue: (v: Record<string, number>) => v.severance * 10000 + Math.round(v.severance * 10000 * 0.2 * v.delay / 365),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "분할지급 합의서 (합의한 경우)", required: false, where: "회사와 서면 작성" },
  { name: "퇴직금 미지급 확인용 내용증명", required: true, where: "우체국 또는 카카오 전자내용증명" },
  { name: "퇴직 증명서 또는 사직서 수리 확인", required: true, where: "회사 인사팀" },
  { name: "IRP 계좌번호 (300만원 초과 시)", required: true, where: "은행·증권사 개설" },
];

const STEPS = [
  {
    title: "14일 기한 확인",
    desc: "회사는 퇴직 후 14일 이내에 퇴직금을 지급해야 해요. 14일이 지나면 지급 지체가 되고 연 20% 지연이자가 자동으로 발생해요. 14일은 달력일 기준이라 공휴일·주말도 포함돼요.",
    tip: "퇴직일이 월요일이면 14일 후인 그다음 월요일까지 지급 의무",
  },
  {
    title: "분할지급 합의 여부 결정",
    desc: "근로자가 동의하면 분할지급 합의가 가능해요. 합의 없이 회사가 일방적으로 분할지급하면 위법이에요. 합의할 때는 지급 일정·금액을 서면으로 남기고, '이자 포기' 조항은 빼는 게 유리해요.",
    tip: "합의서에 서명하기 전 이자 포기 조항이 있는지 꼭 확인하세요",
  },
  {
    title: "내용증명 발송",
    desc: "14일이 지났는데 지급이 안 되면 내용증명으로 퇴직금·지연이자 지급을 요청해요. '퇴직금 ○○만원 및 지연이자 지급 요청'이라는 내용이면 충분해요. 발송 사실이 법적 청구 증거가 돼요.",
    tip: "카카오 전자내용증명으로 10분 안에 발송 가능",
  },
  {
    title: "고용노동부 진정",
    desc: "내용증명 이후에도 지급이 안 되면 고용노동부 민원마당에서 온라인 진정을 접수해요. 근로감독관이 회사를 조사하고 지급 명령을 내려요. 불이행 시 형사 처벌 대상이 돼요.",
    tip: "민원마당(minwon.moel.go.kr): 온라인 24시간 신청 가능",
  },
];

const CHECKLIST = [
  "14일 기한: 퇴직일 기준 달력일로 계산 (공휴일 포함)",
  "분할지급 합의: 근로자 동의 없이 회사가 일방 분할 = 위법",
  "합의서 서명 전: '이자 포기' 조항 삭제 요청",
  "지연이자: 14일 초과 시 연 20% 자동 발생",
  "소멸시효: 퇴직 후 3년 이내에 청구해야 해요",
];

const FAQS = [
  {
    q: "퇴직금을 나눠 받는 게 가능한가요?",
    a: "근로자가 동의하면 분할지급 합의가 가능해요. 하지만 합의 없이 회사가 일방적으로 분할지급하면 위법이에요. 분할지급에 동의할 때는 이자와 지급 일정을 명확히 하세요.",
  },
  {
    q: "퇴직금 지연이자는 어떻게 계산하나요?",
    a: "연 20% 비율로 계산해요. 퇴직 후 14일이 지난 날부터 실제 지급일까지 일 단위로 계산해요. 예를 들어 3,000만원을 30일 지연하면 약 49만원 이자가 발생해요.",
  },
  {
    q: "회사 사정이 어려워 퇴직금을 못 준다고 하면?",
    a: "회사 사정과 무관하게 퇴직금은 지급 의무가 있어요. 폐업이나 도산 시에는 체당금 제도를 이용해 고용보험에서 일부 받을 수 있어요. 고용노동부(1350)에 문의하세요.",
  },
  {
    q: "분할지급 합의서에 이미 서명했는데 이자 포기 조항이 있어요",
    a: "퇴직금 포기나 이자 면제 조항은 근로자 보호를 위해 무효가 될 수 있어요. 법률구조공단(132)에서 무료 상담을 받아보세요. 퇴직금 청구권은 법으로 보호되는 권리예요.",
  },
  {
    q: "퇴직금 소멸시효가 있나요?",
    a: "있어요. 퇴직 후 3년 이내에 청구해야 해요. 3년이 지나면 법적 청구가 어려워져요. 지연이자 청구도 동일하게 3년 이내예요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제37조: 퇴직금 지연이자 연 20%", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로자퇴직급여보장법 제9조: 퇴직금 지급 기한 14일", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 민원마당: 퇴직금 진정 신청", url: "https://minwon.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-지급-기한", title: "퇴직금 지급 기한 14일", description: "14일 기한과 지연이자 계산 방법." },
  { slug: "퇴직금-미지급-신고", title: "퇴직금 못 받았을 때", description: "고용노동부 진정 절차 안내." },
  { slug: "퇴직금-지연이자", title: "퇴직금 지연이자 청구", description: "연 20% 이자 계산 방법과 청구 절차." },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-분할지급" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 분할지급 · 지연이자</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        회사가 퇴직금을 나눠 주겠다고 해요, 괜찮은 건가요?<br />
        분할지급 합의 기준과 지연이자 청구 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금은 퇴직 후 14일 이내에 전액을 한 번에 받는 게 원칙이에요.
        근로자가 동의하지 않으면 분할지급은 위법이에요.
        동의하더라도 14일을 넘긴 기간에 대해서는 <a href="/w/퇴직금-지연이자" style={{ color: "#1D9E75", textDecoration: "underline" }}>연 20% 지연이자</a>를 청구할 수 있어요.
        분할지급 합의 기준과 지연이자 계산 방법을 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>지금 내 상황, 어떻게 대응해야 하나요?</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법 제9조</a>는
        퇴직 후 14일 이내 전액 지급을 의무로 규정해요. 14일을 넘기면 그날부터 연 20% 지연이자가 자동으로 붙어요.
        분쟁 없이 해결하고 싶다면 먼저 내용증명을 발송해서 공식 청구 기록을 남기세요.
      </p>
      <p style={body}>
        합의를 할 때 주의할 점이 있어요. 회사가 "이자 없이 나눠 받는 데 동의하세요"라고 요청할 수 있는데,
        이 조항에 서명하면 불리해요. 이자 포기 조항은 빼고 지급 일정만 합의하는 게 유리해요.
      </p>

      <GreenBox title="분할지급 합의 시 핵심 규칙">
        근로자 동의 없는 분할지급 = 위법<br />
        14일 초과분: 연 20% 지연이자 청구 가능<br />
        합의서에 이자 포기 조항 있으면 삭제 요청
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="지연이자를 청구할 수 있어요. 아래 계산기로 금액을 확인하고 내용증명 발송을 준비하세요."
        partialMatchText="상황에 따라 다를 수 있어요. 고용노동부(1350) 또는 법률구조공단(132)에 상담해보세요."
      />

      <Divider />

      <H2>지연이자 얼마나 받을 수 있나요?</H2>
      <p style={body}>
        지연이자는 연 20%로 고정돼요. 협상으로 줄일 수 없어요.
        퇴직일로부터 14일이 지난 날부터 실제 지급일까지 일 단위로 계산해요.
      </p>
      <p style={body}>
        퇴직금 3,000만원을 30일 지연하면 이자가 약 49만원이에요. 지연이 길수록 이자가 쌓여서
        회사 부담이 커지는 구조예요. 아래 계산기로 직접 확인해보세요.
      </p>

      <SectionBadge>지연이자 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 퇴직 후 14일 초과분에 대해 연 20% 지연이자 발생 (근로기준법 제37조)."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>지급 청구에 필요한 서류</H2>
      <p style={body}>
        퇴직금 지급을 청구하거나 분할지급 합의를 진행할 때 필요한 서류예요.
        미지급 상황이라면 내용증명과 퇴직 증명서가 핵심이에요.
      </p>
      <p style={body}>
        분할지급에 합의한 경우에는 합의서를 별도로 작성해요.
        각 회차 지급 날짜와 금액, 이자 조항 포함 여부를 명확하게 적어야
        나중에 분쟁이 생겼을 때 증거가 돼요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>분할지급 대응 절차 4단계</H2>
      <p style={body}>
        회사가 분할지급을 제안했거나 14일이 지나도 퇴직금을 못 받았다면 아래 순서대로 대응하면 돼요.
        내용증명 발송이 법적 절차의 시작이고, 이후 단계는 고용노동부가 처리해줘요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>분할지급 대응 체크리스트</H2>
      <p style={body}>
        분할지급 합의 전에 아래 항목을 꼭 확인하세요.
        특히 이자 조항은 합의서 서명 전에 확인하는 게 중요해요. 한번 서명하면 번복하기 어려울 수 있어요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="합의 전 반드시 살펴볼 것">
        분할지급 합의서에 서명하기 전, 이자 포기 조항이 있으면 삭제 요청하거나 서명을 거부할 수 있어요.<br />
        지연이자는 근로기준법 제37조에 따른 법적 권리예요. 포기 조항은 무효가 될 수 있어요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        분할지급과 지연이자에 대해 자주 나오는 질문을 정리했어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법과 근로자퇴직급여보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
