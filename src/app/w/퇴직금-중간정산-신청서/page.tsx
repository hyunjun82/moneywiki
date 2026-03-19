"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "1년 이상 근무한 사업장에 재직 중이에요" },
  { id: "c2", label: "주택 구입·전세 계약, 의료비, 파산 등 법정 사유가 생겼어요" },
  { id: "c3", label: "사유를 입증하는 증빙서류를 갖추고 있어요" },
  { id: "c4", label: "정산 금액이 300만원 초과라면 IRP 계좌를 만들었어요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "월 평균임금", min: 200, max: 800, step: 10, defaultValue: 350, format: (v: number) => `${v}만원` },
  { id: "years", label: "신청 시점까지 근속 기간", min: 1, max: 30, step: 1, defaultValue: 5, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "중간정산 예상액",
    getValue: (v: Record<string, number>) => Math.round(v.salary * 10000 * v.years),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "퇴직소득세 추정",
    getValue: (v: Record<string, number>) => {
      const base = v.salary * 10000 * v.years;
      const deduction = Math.min(v.years * 500000, 8000000);
      return Math.round(Math.max(0, base - deduction) * 0.06 * 1.1);
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원 (IRP 이전 시 과세 이연)`,
  },
];

const DOCS = [
  { name: "퇴직금 중간정산 신청서", required: true, where: "회사 인사팀 또는 고용노동부 민원마당 서식" },
  { name: "주택 매매계약서 (주택 구입 사유)", required: false, where: "해당 계약서 원본" },
  { name: "임대차계약서 (전세 계약 사유)", required: false, where: "해당 계약서 원본" },
  { name: "의사 진단서 및 치료비 영수증 (의료비 사유)", required: false, where: "병원 발급" },
  { name: "파산·개인회생 결정문 사본 (해당 시)", required: false, where: "법원 발행" },
  { name: "무주택 확인서 (주택 관련 사유 시)", required: false, where: "정부24 발급" },
  { name: "IRP 계좌번호 (정산액 300만원 초과 시)", required: true, where: "은행·증권사 개설" },
];

const STEPS = [
  {
    title: "법정 사유 해당 여부 확인",
    desc: "신청서를 쓰기 전에 내 상황이 법정 사유에 해당하는지 먼저 확인해요. 근로자퇴직급여보장법 시행령 제3조에서 허용 사유를 정해두고 있어요. 사유에 해당하지 않으면 신청이 반려될 수 있어요.",
    tip: "사유 확인이 불분명하면 고용노동부(1350) 또는 노무사 상담을 먼저 받으세요",
  },
  {
    title: "신청서 양식 수령",
    desc: "회사 인사팀에서 자체 양식을 받아요. 회사 양식이 없다면 고용노동부 민원마당(minwon.moel.go.kr)에서 표준 서식을 내려받을 수 있어요. 어떤 양식을 써도 법적 효력은 같아요.",
    tip: "인사팀에 미리 확인해서 회사 지정 양식이 있으면 그걸 쓰는 게 편해요",
    link: { label: "고용노동부 민원마당 서식 내려받기", href: "https://minwon.moel.go.kr" },
  },
  {
    title: "신청서 작성 및 증빙서류 첨부",
    desc: "신청서에는 신청인 정보(이름·주민번호·입사일), 신청 사유, 정산 요청 금액, 수령 계좌를 기재해요. 사유에 맞는 증빙서류를 반드시 함께 첨부해야 해요. 정산 금액은 인사팀에 확인 후 기재하는 게 정확해요.",
    tip: "허위 사유로 신청하면 법적 책임을 질 수 있어요",
  },
  {
    title: "제출 후 승인 및 수령",
    desc: "신청서와 증빙서류를 인사팀에 제출하면 회사가 검토해요. 법정 사유가 충족되면 거부할 수 없어요. 승인 후 퇴직소득세를 원천징수하고 14일 이내에 지급해요. 300만원 초과 금액은 반드시 IRP 계좌로 받아야 해요.",
    tip: "14일이 지나도 지급이 없으면 연 20% 지연이자를 청구할 수 있어요",
  },
];

const CHECKLIST = [
  "법정 사유: 시행령 제3조 사유에 해당하는지 먼저 확인",
  "신청서 양식: 인사팀 지정 양식 또는 고용노동부 표준 서식",
  "신청인 정보: 이름·주민번호·입사일 정확히 기재",
  "정산 금액: 인사팀과 사전 협의 후 기재",
  "증빙서류: 계약서·진단서·결정문 원본 또는 사본 첨부",
  "IRP 계좌: 300만원 초과 시 사전 개설 필수",
];

const FAQS = [
  {
    q: "신청서 양식은 어디서 받나요?",
    a: "인사팀에서 받는 게 가장 빠르고 회사 기준에 맞아요. 회사 양식이 없다면 고용노동부 민원마당(minwon.moel.go.kr)에서 표준 서식을 내려받을 수 있어요. 어떤 양식을 써도 법적 효력은 동일해요.",
  },
  {
    q: "신청서에 정산 금액을 직접 적어야 하나요?",
    a: "맞아요. 인사팀에 미리 확인해서 정확한 금액을 기재하는 게 좋아요. 금액이 잘못 기재되면 반려될 수 있고, 과다 기재 시에는 나중에 돌려줘야 하는 상황이 생길 수 있어요.",
  },
  {
    q: "신청서 제출 후 얼마나 걸리나요?",
    a: "회사마다 다르지만 보통 1~2주 내에 처리돼요. 서류가 완비됐다면 14일 이내에 지급해야 하고, 이를 넘기면 연 20% 지연이자가 발생해요.",
  },
  {
    q: "회사가 정당한 이유 없이 신청서를 받지 않으면?",
    a: "내용증명으로 신청서를 발송해서 기록을 남기세요. 법정 사유가 있는데 거부하면 고용노동부(1350)에 진정을 낼 수 있어요.",
  },
  {
    q: "허위 사유로 신청서를 냈다가 들키면?",
    a: "근로자퇴직급여보장법 위반이에요. 중간정산금을 반환해야 하고 세금 추징 및 형사 책임이 따를 수 있어요. 반드시 실제 법정 사유에 해당할 때만 신청하세요.",
  },
  {
    q: "신청서 작성 후 마음이 바뀌어 취소할 수 있나요?",
    a: "회사가 아직 처리하지 않았다면 취소가 가능해요. 인사팀에 즉시 연락해서 처리 전 취소 의사를 전달하세요. 이미 세금 원천징수까지 끝났다면 취소가 어려울 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 시행령 제3조: 중간정산 허용 사유", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법시행령" },
      { label: "근로자퇴직급여보장법 제8조: 퇴직금 중간정산", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 민원마당: 퇴직금 중간정산 서식", url: "https://minwon.moel.go.kr" },
      { label: "고용노동부: 퇴직급여 제도 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-중간정산", title: "퇴직금 중간정산 완전 정리", description: "중간정산 요건·절차를 한 번에 정리해요." },
  { slug: "퇴직금-중간정산-신청-법정-사유-절차", title: "중간정산 법정 사유 7가지", description: "어떤 사유에 해당하는지 확인해보세요." },
  { slug: "퇴직금-중간정산-사유별-증빙서류", title: "사유별 증빙서류 목록", description: "사유마다 다른 서류를 한눈에 정리해요." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-중간정산-신청서" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 중간정산 · 신청서</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 중간정산 신청서, 어디서 받고 어떻게 쓰나요?<br />
        양식 수령·작성 방법·제출 절차까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        <a href="/w/퇴직금-중간정산" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 중간정산</a> 신청서는 법정으로 정해진 양식이 없어요.
        인사팀 자체 양식을 쓰거나 고용노동부 표준 서식을 써도 돼요.
        중요한 건 신청서만 내면 끝이 아니라는 거예요. 사유를 증명하는 서류를 반드시 함께 제출해야 하고, 300만원을 넘으면 <a href="/w/퇴직금-IRP-계좌" style={{ color: "#1D9E75", textDecoration: "underline" }}>IRP 계좌</a>도 미리 만들어야 해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>신청서 제출 전, 내가 조건을 갖췄나요?</H2>
      <p style={body}>
        신청서를 쓰기 전에 두 가지를 먼저 확인해야 해요.
        첫째, 법정 사유에 해당하는지 — 주택 구입, 전세 계약, 의료비, 파산·개인회생, 천재지변, 임금피크제 중 하나예요.
        둘째, 사유를 입증하는 서류가 있는지예요.
      </p>
      <p style={body}>
        둘 중 하나라도 빠지면 인사팀에서 반려할 수 있어요.
        법정 사유가 확인됐다면 회사는 신청을 거부할 수 없고, 승인 후 <a href="/w/퇴직금-지급-기한" style={{ color: "#1D9E75", textDecoration: "underline" }}>14일 이내</a>에 지급해야 해요.
      </p>

      <GreenBox>
        법정 사유 해당: 시행령 제3조 7가지 중 하나<br />
        증빙서류 완비: 계약서·진단서·결정문 등 사유별 원본<br />
        IRP 계좌: 정산액 300만원 초과 시 반드시 사전 개설
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="중간정산 신청서 제출 준비가 됐어요. 아래 계산기로 예상 금액을 먼저 확인하세요."
        partialMatchText="조건이 미충족된 항목이 있어요. 고용노동부(1350) 또는 인사팀에 먼저 확인하세요."
      />

      <Divider />

      <H2>신청 금액, 미리 계산해보세요</H2>
      <p style={body}>
        신청서에 기재할 정산 금액을 인사팀과 협의하기 전에 대략 파악해두면 좋아요.
        중간정산 후에는 근속 기간이 리셋되기 때문에 최종 퇴직 시 <a href="/w/퇴직금-중간정산-세금" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직소득세</a>가 늘어날 수 있어요.
        지금 받는 금액과 나중에 늘어나는 세금을 비교해보는 게 좋아요.
      </p>

      <SectionBadge>중간정산 예상 금액 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 월 평균임금 × 근속연수 추정치. 실제 금액은 인사팀 계산 기준과 다를 수 있어요. IRP 이전 시 퇴직소득세 과세 이연 가능."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>신청서와 함께 내야 하는 서류</H2>
      <p style={body}>
        어떤 사유로 신청하느냐에 따라 첨부 서류가 달라요.
        주택 관련 사유라면 계약서 원본, 의료비 사유라면 진단서와 영수증이 필요해요.
        서류를 빠뜨리면 반려되고 처음부터 다시 시작해야 해요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <BorderBox>
        <strong>IRP 계좌 개설이 먼저예요</strong><br />
        정산액이 300만원을 넘으면 IRP 계좌가 없으면 지급 자체가 안 돼요. 신청서 제출 전에 먼저 개설하세요.
      </BorderBox>

      <Divider />

      <H2>작성부터 수령까지 절차 4단계</H2>
      <p style={body}>
        법정 사유 확인 → 양식 수령 → 신청서 작성 및 제출 → 승인 후 수령 순서예요.
        서류를 미리 준비해두면 2주 안에 처리될 수 있어요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>제출 전 꼭 챙겨야 할 체크리스트</H2>
      <p style={body}>
        서류 한 가지라도 빠지면 반려될 수 있어요.
        정산 금액은 인사팀과 사전 협의 후 기재하는 게 분쟁을 막는 방법이에요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        증빙서류는 원본 또는 공증 사본으로 제출<br />
        정산 금액은 인사팀 확인 후 기재<br />
        IRP 계좌는 신청서 제출 전에 미리 개설
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        중간정산 신청서 작성과 제출에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법과 시행령을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
