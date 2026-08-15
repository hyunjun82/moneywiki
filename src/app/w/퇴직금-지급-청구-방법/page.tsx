"use client";
import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR, 퇴직금_HIGHLIGHT } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "1년 이상 계속 근무하고 퇴직했어요" },
  { id: "c2", label: "4주 평균 주 15시간 이상 일했어요" },
  { id: "c3", label: "퇴직일로부터 아직 3년이 지나지 않았어요" },
  { id: "c4", label: "퇴직 후 14일이 지나도 퇴직금을 받지 못했어요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "월 평균임금", min: 200, max: 700, step: 10, defaultValue: 300, format: (v: number) => `${v}만원` },
  { id: "years", label: "근속 기간", min: 1, max: 30, step: 1, defaultValue: 5, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "청구할 퇴직금 예상액",
    getValue: (v: Record<string, number>) => Math.round(v.salary * 10000 * v.years),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "30일 지연 시 지연이자 (연 20%)",
    getValue: (v: Record<string, number>) => Math.round(v.salary * 10000 * v.years * 0.2 / 365 * 30),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "퇴직금 청구서 (회사 양식 또는 자체 작성)", required: true, where: "회사 인사팀 또는 직접 작성" },
  { name: "급여명세서 (퇴직 전 3개월)", required: true, where: "회사 인사팀 요청 또는 재직 중 보관본" },
  { name: "근로계약서", required: false, where: "입사 시 수령본 또는 인사팀 재발급" },
  { name: "재직·퇴직 증명 자료 (4대보험 가입확인서 등)", required: false, where: "국민건강보험공단 또는 국민연금공단" },
  { name: "IRP 계좌번호 (퇴직금 300만원 초과 시)", required: true, where: "은행·증권사 개설" },
];

const STEPS = [
  {
    title: "퇴직금 계산 및 청구서 작성",
    desc: "퇴직 전 3개월 평균임금 × 근속연수로 퇴직금을 계산해요. 14일이 지났다면 지연이자(연 20%)도 함께 계산해서 청구서에 넣어요. 법적으로 정해진 양식은 없어요.",
    tip: "상여금·고정수당도 평균임금에 포함될 수 있어요 — 꼼꼼히 계산하세요",
  },
  {
    title: "회사에 서면으로 청구",
    desc: "구두 요청만으로는 나중에 증거가 없어요. 이메일, 문자, 카카오톡으로 '○○년 ○월 ○일 퇴직, 퇴직금 ○○만원 청구'를 명확히 남겨요. 응답 기한(5영업일)도 함께 적어두는 게 좋아요.",
    tip: "내용증명(우체국 발송)이 가장 강력한 증거예요",
  },
  {
    title: "고용노동부 진정 신청",
    desc: "청구 후에도 묵묵부답이거나 거부한다면 사업장 관할 지방노동청 또는 고용노동부 민원마당에서 진정을 내세요. 접수 후 근로감독관이 사실 조사를 진행하고, 보통 2~4주 내에 처리돼요.",
    tip: "고용노동부 민원마당(minwon.moel.go.kr) — 24시간 온라인 무료 신청",
    link: { label: "고용노동부 진정 신청", href: "https://minwon.moel.go.kr" },
  },
  {
    title: "지급명령 신청 또는 민사소송",
    desc: "진정 후에도 지급이 안 되면 법원에 지급명령 신청을 낼 수 있어요. 지급명령은 소송보다 비용이 1/10 수준이고 절차도 간단해요. 법률구조공단(132)에서 무료 법률 지원을 받을 수 있어요.",
    tip: "법률구조공단(132) — 저소득 근로자 무료 소송 지원",
    link: { label: "대한법률구조공단", href: "https://www.klac.or.kr" },
  },
];

const CHECKLIST = [
  "퇴직금 계산: 평균임금 × 근속연수 직접 계산 (계산기 활용)",
  "서면 청구: 이메일·문자·카카오톡으로 청구 기록 남기기",
  "지연이자 포함: 퇴직일로부터 14일 초과분에 연 20% 함께 청구",
  "소멸시효 3년: 퇴직일로부터 3년 내에 반드시 청구",
  "노동청 신고: 고용노동부 민원마당(1350) 무료 온라인 접수",
];

const FAQS = [
  {
    q: "퇴직금 청구서는 꼭 써야 하나요?",
    a: "법적으로 정해진 양식은 없어요. 구두 요청도 되지만 분쟁이 생길 때 증거가 없어서 불리해요. 이메일·문자로라도 남겨두는 게 훨씬 유리하고, 내용증명이 가장 강력한 증거예요.",
  },
  {
    q: "고용노동부 진정을 내면 회사에 불이익이 가나요?",
    a: "근로감독관이 사업주에게 연락해 사실관계를 확인해요. 퇴직금을 정당하게 지급하지 않으면 3년 이하 징역 또는 3천만원 이하 벌금이 부과될 수 있어요. 진정 자체가 회사에 압력이 되는 경우가 많아요.",
  },
  {
    q: "지연이자는 언제부터 붙나요?",
    a: "퇴직일로부터 14일이 지나면 그다음 날부터 연 20% 이자가 붙어요. 청구서에 퇴직금 원금과 지연이자를 함께 적어두면 나중에 협의할 때 유리해요.",
  },
  {
    q: "회사가 폐업했는데 퇴직금을 받을 수 있나요?",
    a: "체당금 제도를 이용하세요. 고용노동부에 신청하면 퇴직 전 최종 3개월 임금과 퇴직금(최대 3개월치)을 국가가 먼저 지급해줘요. 법원 도산 판정 또는 고용노동부 행정 도산 확인 후 신청할 수 있어요.",
  },
  {
    q: "퇴직금 청구 소멸시효는 얼마인가요?",
    a: "3년이에요. 퇴직일로부터 3년이 지나면 청구권이 소멸해요. 내용증명 발송이나 노동청 진정을 내면 소멸시효가 중단돼서 새로 3년이 시작돼요.",
  },
  {
    q: "고용노동부 진정과 민사소송, 무엇을 먼저 해야 하나요?",
    a: "진정이 먼저예요. 무료고 빠르게 처리돼요. 진정으로 해결이 안 될 때 지급명령 신청이나 민사소송으로 넘어가는 게 일반적인 순서예요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제36조: 금품 청산 기한 (퇴직 후 14일)", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로기준법 제37조: 지연이자 연 20%", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로자퇴직급여보장법 제9조: 퇴직금 지급 기한", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 민원마당: 퇴직금 진정 온라인 신청", url: "https://minwon.moel.go.kr" },
      { label: "대한법률구조공단: 무료 법률 지원 (132)", url: "https://www.klac.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-미지급-신고", title: "퇴직금 미지급 신고 절차", description: "노동청 진정 신청 방법을 단계별로 안내해요." },
  { slug: "퇴직금-지급-기한", title: "퇴직금 지급 기한 14일 원칙", description: "지급 기한과 지연이자 발생 기준을 설명해요." },
  { slug: "퇴직금-지연이자", title: "퇴직금 지연이자 계산", description: "연 20% 지연이자를 직접 계산해볼 수 있어요." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} highlightSlugs={퇴직금_HIGHLIGHT} currentSlug="퇴직금-지급-청구-방법" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 청구방법 · 미지급 대응</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금을 못 받았다면 어떻게 해야 하나요?<br />
        회사 청구부터 노동청 신고, 소송까지 4단계
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금은 퇴직일로부터 14일 이내에 받는 게 원칙이에요.
        14일이 지나도 받지 못했다면 <a href="/w/퇴직금-지연이자" style={{ color: "#1D9E75", textDecoration: "underline" }}>지연이자(연 20%)</a>와 함께 청구할 수 있어요.
        서면 청구 → 노동청 진정 순서로 밟아가면 대부분 진정 단계에서 해결돼요.
        소멸시효 3년이 지나기 전에 빠르게 청구 절차를 시작하세요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>퇴직금 청구, 어떤 상황에서 필요한가요?</H2>
      <p style={body}>
        회사가 퇴직금을 자발적으로 주지 않거나 계속 미루는 상황이라면 청구 절차가 필요해요.
        퇴직금이 300만원을 넘으면 IRP 계좌로만 받을 수 있어요. IRP가 없다면 청구 전에
        <a href="/w/퇴직금-IRP-계좌" style={{ color: "#1D9E75", textDecoration: "underline" }}>IRP 계좌</a>를 먼저 개설하고 회사에 계좌번호를 알려줘야 해요.
      </p>
      <p style={body}>
        회사가 고의로 지급을 미루는 경우엔 지연이자 청구와 노동청 신고를 병행하는 게 가장 효과적이에요.
        청구 사실을 서면으로 남겨두지 않으면 나중에 분쟁이 생겼을 때 불리해질 수 있어요.
      </p>

      <GreenBox>
        지급 기한: 퇴직일로부터 14일 이내 (서면 합의 시 연장 가능)<br />
        지연이자: 14일 초과분에 연 20% 자동 발생<br />
        소멸시효: 퇴직일로부터 3년 (내용증명·진정 신청 시 중단)
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="퇴직금 청구 및 지연이자 청구가 모두 가능해요. 아래 계산기로 금액을 먼저 확인해보세요."
        partialMatchText="상황에 따라 절차가 다를 수 있어요. 고용노동부(1350) 상담을 권해요."
      />

      <Divider />

      <H2>청구할 퇴직금과 지연이자 계산</H2>
      <p style={body}>
        월 평균임금과 근속 기간을 입력하면 퇴직금 예상액과 30일 지연 시 이자를 바로 볼 수 있어요.
        평균임금은 퇴직 전 3개월 임금 총액을 그 기간 총 일수로 나눈 금액이에요.
        상여금이 포함됐다면 실제 금액이 더 높을 수 있어요.
      </p>

      <SectionBadge>퇴직금 · 지연이자 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 법정 최저 기준. 상여금·고정수당 포함 시 퇴직금이 더 높을 수 있어요. 지연이자는 14일 초과분부터 발생해요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>청구에 필요한 서류</H2>
      <p style={body}>
        청구서와 급여명세서가 핵심이에요. 노동청 진정 시에도 같은 서류가 필요하니 미리 챙겨두세요.
        퇴직 후엔 급여명세서를 달라고 해도 회사가 줄 의무가 없는 경우가 있어요.
        재직 중에 3개월치 이상 받아두는 게 좋아요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <p style={body}>
        4대보험 가입확인서는 국민건강보험공단(1577-1000) 또는 내 보험 사이트에서 바로 발급받을 수 있어요.
        재직 기간을 객관적으로 증명할 수 있어서 근로계약서가 없을 때 대체 자료로 쓸 수 있어요.
      </p>

      <Divider />

      <H2>퇴직금 청구 4단계 절차</H2>
      <p style={body}>
        서면 청구 → 노동청 진정 → 민사소송 순서로 단계를 밟아가면 돼요.
        대부분 2~3단계에서 해결되고, 민사소송까지 가는 경우는 드물어요.
        각 단계에서 필요한 행동이 명확하니 순서대로 따라가세요.
      </p>

      <Steps steps={STEPS} />

      <p style={body}>
        진정을 내면 근로감독관이 사업주에게 연락해서 사실관계를 확인해요.
        이 과정에서 지급 합의가 이뤄지는 경우가 많고, 합의가 안 되면 지급 명령이 내려져요.
        지급명령 신청은 법원에서 처리하고 인지세가 소송의 1/10 수준이라 부담이 적어요.
      </p>

      <Divider />

      <H2>퇴직금 청구 체크리스트</H2>
      <p style={body}>
        소멸시효 3년을 놓치지 않는 게 가장 중요해요.
        기록을 남기지 않으면 나중에 불리해질 수 있어요.
        퇴직 후 빠르게 청구 절차를 시작하는 게 유리해요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        고용노동부 민원마당(minwon.moel.go.kr)에서 집에서 바로 신고할 수 있어요.<br />
        진정 접수 후 보통 2~4주 내에 처리되고, 대부분 퇴직금 지급으로 이어져요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 청구 방법에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법 및 근로자퇴직급여보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
