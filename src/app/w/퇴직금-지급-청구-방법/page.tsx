"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직 후 14일이 지났는데 퇴직금을 못 받았어요" },
  { id: "c2", label: "회사에 청구했지만 묵묵부답이에요" },
  { id: "c3", label: "노동청에 신고하는 방법을 알고 싶어요" },
  { id: "c4", label: "지연이자도 함께 청구하고 싶어요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "월 평균임금", min: 200, max: 700, step: 10, defaultValue: 300, format: (v: number) => `${v}만원` },
  { id: "years", label: "근속 기간", min: 1, max: 30, step: 1, defaultValue: 5, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "퇴직금 예상액 (법정 기준)",
    getValue: (v: Record<string, number>) => Math.round(v.salary * 10000 * v.years),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "14일 초과 30일 지연 시 이자 (연 20%)",
    getValue: (v: Record<string, number>) => Math.round(v.salary * 10000 * v.years * 0.2 / 365 * 30),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "퇴직금 청구서 (회사 양식 또는 자체 작성)", required: true, where: "회사 인사팀 또는 직접 작성" },
  { name: "급여명세서 (최근 3개월)", required: true, where: "회사 인사팀 요청" },
  { name: "근로계약서", required: true, where: "인사팀 또는 입사 시 수령본" },
  { name: "재직 증명 자료 (입사일·퇴직일 확인)", required: false, where: "인사팀 또는 4대보험 가입확인서" },
];

const STEPS = [
  {
    title: "퇴직금 계산 및 청구서 작성",
    desc: "퇴직 전 3개월 평균임금 × 근속연수로 퇴직금을 직접 계산해요. 계산한 금액과 지연이자(14일 초과 시)를 포함한 청구서를 작성해서 인사팀에 내용증명 또는 이메일로 발송해요.",
    tip: "내용증명은 우체국에서 발송 — 법적 증거로 활용 가능해요",
  },
  {
    title: "회사 내 해결 시도",
    desc: "인사팀 또는 대표자에게 퇴직금 지급을 서면으로 요청해요. 요청 후 3~5영업일 내 응답이 없으면 다음 단계로 넘어가세요. 구두 요청만 했다면 문자·메일로도 기록을 남겨두세요.",
    tip: "메일 제목에 '퇴직금 지급 요청'을 명시하세요",
  },
  {
    title: "고용노동부 진정 신청",
    desc: "회사가 응하지 않으면 사업장 관할 지방노동청에 진정을 내거나 고용노동부 홈페이지에서 온라인 신고가 가능해요. 진정 접수 후 근로감독관이 사실 조사를 진행해요. 보통 2~4주 내에 처리돼요.",
    tip: "고용노동부 민원마당(minwon.moel.go.kr)에서 온라인 신고 가능해요",
  },
  {
    title: "민사 소송 또는 지급명령 신청",
    desc: "진정 후에도 지급이 안 되면 법원에 지급명령 신청 또는 소액사건 소송을 낼 수 있어요. 퇴직금은 소액사건이 아닌 경우도 있으나 법률구조공단(132)에서 무료 법률 지원을 받을 수 있어요.",
    tip: "지급명령 신청 비용은 소송보다 저렴해요 (인지세 1/10)",
  },
];

const CHECKLIST = [
  "퇴직금 계산 — 평균임금 × 근속연수 직접 계산",
  "청구서 발송 — 내용증명 또는 이메일로 증거 남기기",
  "지연이자 포함 — 14일 초과분 연 20% 함께 청구",
  "고용노동부 신고 — 1350 또는 온라인 민원마당",
  "소멸시효 3년 — 퇴직일로부터 3년 내에 청구",
];

const FAQS = [
  {
    q: "퇴직금 청구서는 꼭 써야 하나요?",
    a: "법적으로 정해진 양식은 없어요. 회사에 구두로 요청해도 되지만, 나중에 분쟁이 생길 경우 서면이나 메일로 남기는 게 훨씬 유리해요. 내용증명이 가장 강력한 증거예요.",
  },
  {
    q: "고용노동부 진정과 민사소송, 뭐가 더 빠른가요?",
    a: "보통 진정이 더 빠르게 처리돼요. 근로감독관이 개입해서 2~4주 내에 지급이 이뤄지는 경우가 많아요. 민사소송은 시간이 더 걸리지만 더 많은 금액을 청구할 수 있어요.",
  },
  {
    q: "지연이자도 청구서에 넣어야 하나요?",
    a: "넣는 게 좋아요. 청구서에 퇴직금 원금 + 지연이자(연 20%, 14일 초과분)를 명시해두면 나중에 추가 협상이 편해요. 노동청 진정 시에도 지연이자를 함께 청구할 수 있어요.",
  },
  {
    q: "회사가 폐업했는데 퇴직금을 받을 수 있나요?",
    a: "체당금 제도를 이용하면 돼요. 고용노동부에 체당금 신청을 하면 국가가 퇴직금의 일부를 먼저 지급해줘요. 최대 한도는 근속 기간에 따라 달라요.",
  },
  {
    q: "퇴직금 청구 소멸시효는 얼마인가요?",
    a: "3년이에요. 퇴직일로부터 3년이 지나면 청구권이 소멸해요. 내용증명을 발송하거나 노동청에 진정을 내면 소멸시효가 중단돼요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제36조 — 금품 청산 기한", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로기준법 제37조 — 지연이자 연 20%", url: "https://www.law.go.kr/법령/근로기준법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 민원마당 — 온라인 신고", url: "https://minwon.moel.go.kr" },
      { label: "대한법률구조공단 — 무료 법률 지원(132)", url: "https://www.klac.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-미지급-신고", title: "퇴직금 미지급 신고 방법", description: "노동청 진정 절차를 단계별로 안내해요." },
  { slug: "퇴직금-지연이자", title: "퇴직금 지연이자 계산", description: "연 20% 지연이자를 직접 계산해봐요." },
  { slug: "퇴직금-소멸시효", title: "퇴직금 소멸시효 3년", description: "청구 기한과 시효 중단 방법을 설명해요." },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-지급-청구-방법" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 청구방법 · 미지급</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 지급 청구 방법, 어떻게 해야 하나요?<br />
        내용증명부터 노동청 신고, 소송까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금은 퇴직일로부터 14일 이내에 받아야 해요. 14일이 지나도 받지 못했다면 <a href="/w/퇴직금-지연이자" style={{ color: "#1D9E75", textDecoration: "underline" }}>지연이자(연 20%)</a>와 함께 청구할 수 있어요.
        청구서 발송 → 회사 협의 → 고용노동부 진정 → 민사소송 순서로 단계를 밟아가면 대부분 해결돼요.
        소멸시효는 퇴직일로부터 3년이라서 서두르는 게 좋아요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>퇴직금 청구, 어떤 경우에 필요한가요?</H2>
      <p style={body}>
        퇴직 후 14일이 지나도 퇴직금이 들어오지 않거나, 회사가 퇴직금 지급을 거부하거나 계속 미루는 경우에 청구 절차가 필요해요.
        퇴직금이 300만원을 초과한다면 <a href="/w/퇴직금-IRP-계좌" style={{ color: "#1D9E75", textDecoration: "underline" }}>IRP 계좌</a>로 받아야 하는데, IRP가 없으면 이체 자체가 불가능해요.
        이 경우엔 IRP를 먼저 개설하고 회사에 계좌번호를 알려줘야 해요.
      </p>
      <p style={body}>
        회사가 고의로 지급을 미루는 경우엔 지연이자 청구와 노동청 신고를 병행하는 게 가장 효과적이에요.
        진정 접수 후 2~4주 내에 처리되는 경우가 많아요.
      </p>

      <GreenBox title="퇴직금 청구 핵심 기준">
        지급 기한: 퇴직일로부터 14일 이내<br />
        지연이자: 14일 초과분에 연 20%<br />
        소멸시효: 3년 (근로기준법 제49조)
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="퇴직금 청구 및 지연이자 청구가 가능해요. 아래 계산기로 금액을 먼저 확인하세요."
        partialMatchText="상황에 따라 절차가 다를 수 있어요. 고용노동부(1350) 상담을 권해요."
      />

      <Divider />

      <H2>퇴직금 예상액과 지연이자 계산</H2>
      <p style={body}>
        월 평균임금과 근속 기간을 입력하면 퇴직금 예상액과 30일 지연 시 이자를 바로 확인할 수 있어요.
        <a href="/w/퇴직금-평균임금" style={{ color: "#1D9E75", textDecoration: "underline" }}>평균임금</a>에 상여금이 포함됐다면 실제 금액은 더 높게 나올 수 있어요.
      </p>

      <SectionBadge>퇴직금 · 지연이자 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 법정 최저 기준. 상여금·고정수당 포함 시 퇴직금이 더 높을 수 있어요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>청구에 필요한 서류</H2>
      <p style={body}>
        청구서와 급여명세서가 핵심이에요. 노동청 진정 시에도 동일한 서류가 필요하니 미리 챙겨두세요.
        퇴직 후엔 급여명세서 발급이 어려울 수 있어 재직 중에 챙겨두는 게 좋아요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>퇴직금 청구 4단계</H2>
      <p style={body}>
        계산 및 청구서 작성 → 회사 내 해결 → 노동청 진정 → 민사소송 순서예요.
        대부분 3단계(노동청 진정)에서 해결돼요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>퇴직금 청구 체크리스트</H2>
      <p style={body}>
        소멸시효 3년을 놓치지 않는 게 가장 중요해요. 퇴직 후 빠르게 청구 절차를 시작하세요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="노동청 진정, 생각보다 쉬워요">
        온라인(minwon.moel.go.kr)으로 집에서 신고 가능해요.<br />
        진정 접수 후 보통 2~4주 내에 처리되고, 대부분 지급으로 이어져요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 청구 방법에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
