"use client";
import { Divider } from "@/components/article-ui/Divider";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR, 퇴직금_HIGHLIGHT } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직 후 14일이 지났는데 퇴직금을 아직 받지 못했어요" },
  { id: "c2", label: "회사가 퇴직금을 나눠서 주겠다고 했어요" },
  { id: "c3", label: "분할지급 합의서에 서명을 요청받았어요" },
  { id: "c4", label: "합의서에 이자 포기 조항이 포함돼 있어요" },
];

const CALC_SLIDERS = [
  { id: "severance", label: "퇴직금 총액", min: 300, max: 10000, step: 300, defaultValue: 3000, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "delay", label: "지급 지연 일수 (14일 초과분)", min: 1, max: 365, step: 1, defaultValue: 30, format: (v: number) => `${v}일` },
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
  { name: "분할지급 합의서 (합의한 경우)", required: false, where: "회사와 서면 작성, 각 회차 지급일·금액·이자 조항 명시" },
  { name: "퇴직금 미지급 확인용 내용증명", required: true, where: "우체국 또는 카카오 전자내용증명" },
  { name: "퇴직 증명서 또는 사직서 수리 확인", required: true, where: "회사 인사팀 요청" },
  { name: "IRP 계좌번호 (300만원 초과 시)", required: true, where: "은행·증권사 개설 후 계좌번호 제출" },
];

const STEPS = [
  {
    title: "14일 기한 계산",
    desc: "퇴직 후 14일 이내에 퇴직금 전액을 지급해야 해요. 14일은 달력일 기준으로, 공휴일과 주말도 포함돼요. 퇴직일이 월요일이라면 14일 뒤인 그다음 월요일까지가 기한이에요. 기한이 지난 날부터 연 20% 지연이자가 자동 발생해요.",
    tip: "퇴직일을 기준으로 정확히 14일 뒤 날짜를 달력에서 확인하세요",
  },
  {
    title: "분할지급 합의 여부 결정",
    desc: "근로자가 동의하면 분할지급으로 합의할 수 있어요. 하지만 합의 없이 회사가 일방적으로 나눠 지급하면 위법이에요. 합의할 때는 각 회차 지급일과 금액을 서면에 명확히 적어야 해요. 이자 포기 조항이 들어가 있다면 삭제를 요청하거나 서명을 거부할 수 있어요.",
    tip: "합의서에 서명하기 전 이자 관련 조항이 있는지 꼭 확인해야 해요",
  },
  {
    title: "내용증명 발송",
    desc: "14일이 지났는데 지급이 안 됐다면 내용증명으로 퇴직금과 지연이자 지급을 요청해요. '퇴직금 ○○만원 및 연 20% 지연이자 지급 요청'이라는 내용이면 충분해요. 발송 사실이 법적 청구 증거가 돼서, 나중에 소송이나 진정 시 유리하게 작용해요.",
    tip: "카카오 전자내용증명으로 10분 이내 발송 가능",
    link: { label: "카카오 전자내용증명 바로가기", href: "https://ecertifit.kakaocert.com" },
  },
  {
    title: "고용노동부 진정 신청",
    desc: "내용증명 발송 이후에도 지급이 안 되면 고용노동부 민원마당에서 온라인 진정을 접수해요. 근로감독관이 회사를 조사하고 지급 명령을 내려요. 회사가 명령을 이행하지 않으면 형사 처벌 대상이 돼요.",
    tip: "민원마당 온라인 신청: 24시간 접수 가능",
    link: { label: "고용노동부 민원마당", href: "https://minwon.moel.go.kr" },
  },
];

const CHECKLIST = [
  "14일 기한: 퇴직일 기준 달력일로 계산 (공휴일·주말 포함)",
  "분할지급 합의: 근로자 동의 없는 회사 일방 분할 = 위법",
  "합의서 서명 전: 이자 포기 조항이 있으면 삭제 요청",
  "지연이자: 14일 초과 시 연 20% 자동 발생, 협상 불가",
  "소멸시효: 퇴직 후 3년 이내에 청구 (지연이자도 동일)",
  "IRP 계좌: 퇴직금 300만원 초과 시 IRP 계좌로만 수령 가능",
];

const FAQS = [
  {
    q: "근로자가 동의하면 퇴직금을 분할로 받아도 괜찮나요?",
    a: "근로자가 자발적으로 동의한 경우에는 분할지급 합의가 유효해요. 중요한 건 '자발적 동의'라는 점이에요. 회사가 강요하거나 서면 합의 없이 일방적으로 나눠 지급하면 근로자퇴직급여보장법 위반이에요. 합의서에는 각 회차 지급일과 금액을 반드시 명시해야 해요.",
  },
  {
    q: "합의서에 이미 서명했는데 이자 포기 조항이 있어요",
    a: "퇴직금 지연이자는 근로기준법 제37조에서 보장하는 법적 권리예요. 근로자에게 불리한 조항은 법에 따라 무효가 될 수 있어요. 법률구조공단(132) 무료 상담을 받아보세요. 서명 자체가 이자 청구권을 완전히 박탈하지는 않을 수 있어요.",
  },
  {
    q: "회사 사정이 어려워 퇴직금을 못 준다고 해요",
    a: "회사 사정과 무관하게 퇴직금 지급 의무는 유지돼요. 회사가 폐업하거나 도산한 경우에는 체당금 제도를 통해 고용보험에서 일부를 받을 수 있어요. 고용노동부(1350)에 문의하면 구체적인 절차를 안내받을 수 있어요.",
  },
  {
    q: "지연이자를 꼭 받아야 하나요, 포기해도 되나요?",
    a: "지연이자 청구는 선택이에요. 회사와 원만하게 해결하고 싶다면 지연이자를 포기하고 원금만 받는 합의도 가능해요. 다만 지연이자가 법적 권리라는 걸 알고서 협상하는 게 유리해요. 소멸시효(3년) 내라면 언제든 청구할 수 있어요.",
  },
  {
    q: "퇴직금 청구권 소멸시효가 얼마나 되나요?",
    a: "퇴직 후 3년이에요. 3년 이내에 청구하지 않으면 법적 권리가 소멸해요. 지연이자 청구권도 동일하게 3년 이내예요. 회사가 '이미 시효가 지났다'고 주장할 수 있으니 퇴직 후 시간이 지나기 전에 청구하는 게 좋아요.",
  },
  {
    q: "분할지급 합의서는 어떻게 작성하나요?",
    a: "법적으로 정해진 양식은 없어요. 핵심은 '지급 회차별 날짜와 금액'을 명확히 적는 거예요. 예를 들어 '1회차: ○월 ○일까지 ○○만원, 2회차: ○월 ○일까지 ○○만원' 식으로 서면에 남기고 양쪽이 서명해요. 이자 조항은 포기하지 않는 게 유리해요.",
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
      { label: "법률구조공단: 무료 법률 상담 (132)", url: "https://www.klac.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-지급-기한", title: "퇴직금 지급 기한 14일 규정", description: "14일 기한과 지연이자 계산 방법." },
  { slug: "퇴직금-지연이자", title: "퇴직금 지연이자 청구 방법", description: "연 20% 이자 계산과 청구 절차." },
  { slug: "퇴직금-미지급-신고", title: "퇴직금 못 받았을 때 신고 방법", description: "고용노동부 진정 절차 안내." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} highlightSlugs={퇴직금_HIGHLIGHT} currentSlug="퇴직금-분할지급" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 분할지급 · 지연이자</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        회사가 퇴직금을 나눠 주겠다고 해요, 어떻게 해야 하나요?<br />
        분할지급 합의 유효 조건과 지연이자 청구 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금은 퇴직 후 14일 이내에 전액을 한 번에 받는 게 원칙이에요.
        근로자가 동의하지 않으면 분할지급은 <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법</a> 위반이에요.
        동의하더라도 14일을 넘긴 기간에 대해서는 <a href="/w/퇴직금-지연이자" style={{ color: "#1D9E75", textDecoration: "underline" }}>연 20% 지연이자</a>를 따로 청구할 수 있어요.
        합의서에 서명하기 전에 이자 포기 조항이 있는지 꼭 확인해야 해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>분할지급, 합법인가요 위법인가요?</H2>
      <p style={body}>
        근로자가 자발적으로 동의했다면 분할지급 합의는 유효해요.
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법 제9조</a>는
        퇴직 후 14일 이내 전액 지급을 의무로 규정하지만, 당사자 간 합의가 있으면 예외를 인정해요.
        핵심은 '자발적 동의'와 '서면 합의'예요.
      </p>
      <p style={body}>
        회사가 일방적으로 나눠 지급하면 위법이에요. 구두로만 합의했거나 강요에 의한 서명이었다면
        나중에 법적으로 다툴 여지가 생겨요.
        합의서를 쓸 때는 각 회차 지급일과 금액을 구체적으로 적어야 해요.
      </p>

      <GreenBox>
        근로자 자발적 동의 + 서면 합의 = 유효<br />
        회사 일방 분할지급 = 근로자퇴직급여보장법 위반<br />
        합의하더라도 14일 초과분: 연 20% 지연이자 청구 가능
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="지연이자를 청구할 수 있는 상황이에요. 아래 계산기로 금액을 확인하고, 내용증명 발송을 준비하세요."
        partialMatchText="상황에 따라 다를 수 있어요. 고용노동부(1350) 또는 법률구조공단(132)에서 상담해보세요."
      />

      <Divider />

      <H2>지연이자 얼마나 받을 수 있나요?</H2>
      <p style={body}>
        지연이자는 연 20%로 고정돼요.
        퇴직일로부터 14일이 지난 다음 날부터 실제 지급일까지 일 단위로 계산해요.
        협상으로 줄일 수 없는 법정 이율이라 회사가 거부해도 청구 권리는 유지돼요.
      </p>
      <p style={body}>
        퇴직금 3,000만원을 30일 지연하면 지연이자가 약 49만원이에요.
        지연이 길수록 이자가 쌓여서 회사 부담이 커지는 구조예요.
        슬라이더로 직접 계산해보세요.
      </p>

      <SectionBadge>지연이자 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 14일 초과 지연 일수에 대해 연 20% 지연이자 발생 (근로기준법 제37조). 실제 지급 시점에 따라 달라져요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>지급 청구에 필요한 서류</H2>
      <p style={body}>
        퇴직금을 청구하거나 분할지급 합의를 진행할 때 필요한 서류예요.
        내용증명과 퇴직 증명서가 핵심이고, 합의하는 경우에는 합의서도 별도로 작성해요.
      </p>
      <p style={body}>
        합의서에는 각 회차 지급일·금액·이자 조항 포함 여부를 명확히 적어야 해요.
        나중에 분쟁이 생겼을 때 서면 증거가 가장 강력한 보호 수단이 돼요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>분할지급 대응 절차 4단계</H2>
      <p style={body}>
        회사가 분할지급을 제안했거나 14일이 지나도 퇴직금이 안 들어왔다면 아래 순서로 대응하면 돼요.
        내용증명 발송이 법적 절차의 시작이고, 이후 단계는 고용노동부가 처리해줘요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>합의서 서명 전 체크리스트</H2>
      <p style={body}>
        분할지급 합의서에 서명하기 전에 아래 항목을 하나씩 체크해보세요.
        특히 이자 조항은 한 번 서명하면 번복하기 까다로울 수 있어서 사전에 꼭 확인해야 해요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        합의서에 '이자 포기', '지연이자 면제' 등의 조항이 있다면 삭제 요청하거나 서명을 거부할 수 있어요.<br />
        지연이자는 근로기준법 제37조에서 보장하는 법적 권리예요. 포기 조항은 무효가 될 수 있어요.<br />
        확신이 안 서면 법률구조공단(132)에서 무료 상담을 받아보세요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        분할지급과 지연이자에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법과 근로자퇴직급여보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
