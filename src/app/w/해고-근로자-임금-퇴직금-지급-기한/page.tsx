"use client";
import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR, 퇴직금_HIGHLIGHT } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "해고 통보를 받고 실제로 퇴직한 상태예요" },
  { id: "c2", label: "1년 이상 계속 근로하고 주 15시간 이상 일했어요" },
  { id: "c3", label: "해고일로부터 14일이 지났는데 임금·퇴직금을 못 받았어요" },
  { id: "c4", label: "퇴직일로부터 아직 3년이 지나지 않았어요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "월 평균 임금 (원)", min: 1000000, max: 8000000, step: 100000, defaultValue: 3000000, format: (v: number) => `${v.toLocaleString()}원` },
  { id: "years", label: "근속연수 (년)", min: 1, max: 30, step: 1, defaultValue: 3, format: (v: number) => `${v}년` },
  { id: "noticeDays", label: "해고예고 부족 일수 (30일 미만 예고)", min: 0, max: 30, step: 1, defaultValue: 30, format: (v: number) => v === 0 ? "30일 이상 예고함" : `${v}일 부족` },
];

const CALC_RESULTS = [
  {
    label: "퇴직금 예상액",
    getValue: (v: Record<string, number>) => Math.round((v.salary / 30) * 30 * v.years),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "해고예고수당 예상액",
    getValue: (v: Record<string, number>) =>
      v.noticeDays > 0 ? Math.round((v.salary / 30) * v.noticeDays) : 0,
    format: (v: number) =>
      v === 0 ? "해당 없음 (30일 이상 예고)" : `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
  {
    label: "지연이자 (14일 초과 30일 기준, 연 20%)",
    getValue: (v: Record<string, number>) => {
      const total = Math.round((v.salary / 30) * 30 * v.years);
      return Math.round(total * 0.20 / 365 * 30);
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "근로계약서 사본", required: true, where: "회사 또는 본인 보관본" },
  { name: "급여명세서 (최근 3개월)", required: true, where: "회사 급여 시스템 또는 통장 입금 내역" },
  { name: "해고 통보서 또는 해고 통지 문자·이메일", required: true, where: "회사로부터 수령" },
  { name: "재직증명서 또는 고용보험 이력 조회 내역", required: true, where: "고용24(www.work.go.kr) 또는 회사 발급" },
  { name: "신분증 사본", required: true, where: "본인 지참" },
  { name: "통장 사본 (본인 명의)", required: true, where: "은행 발급" },
  { name: "미지급 임금 내역 (직접 작성)", required: false, where: "본인 정리" },
];

const STEPS = [
  {
    title: "14일 경과 여부 확인",
    desc: "해고일 다음 날부터 14일이 지났는지 확인해요. 14일 이내라면 조금 더 기다릴 수 있어요. 14일이 넘었다면 연 20% 지연이자가 발생하고 즉시 청구할 수 있어요.",
    tip: "근로기준법 제36조: 해고 포함 모든 퇴직 후 14일 이내 지급 의무",
  },
  {
    title: "회사에 내용증명 발송",
    desc: "임금·퇴직금 지급을 서면으로 요청해요. 내용증명은 우체국 또는 인터넷우체국(ols.epost.go.kr)에서 보낼 수 있어요. 발송일이 법적 청구 시점으로 기록돼서 추후 소송 시 증거가 돼요.",
    tip: "내용증명 발송 자체가 사업주에게 상당한 압박이 돼요",
  },
  {
    title: "고용노동부 지청 신고",
    desc: "회사가 무응답이거나 거부하면 사업장 소재지 관할 고용노동부 지청에 임금 체불 진정을 넣어요. 고용24(www.work.go.kr) 온라인 또는 방문 접수 모두 가능하고, 신고 후 보통 2~4주 내에 근로감독관이 사업주를 불러요.",
    tip: "온라인 신고가 가장 빠르고 24시간 접수 가능해요",
    link: { label: "고용노동부 민원 신고", href: "https://minwon.moel.go.kr" },
  },
  {
    title: "소액사건심판 또는 민사소송",
    desc: "노동청 신고로도 해결되지 않으면 법원에 소송을 제기해요. 3,000만 원 이하는 소액사건심판, 초과는 민사소송이에요. 미지급 퇴직금에 연 20% 지연이자를 함께 청구할 수 있어요.",
    tip: "대한법률구조공단(132)에서 무료 법률 상담을 받을 수 있어요",
    link: { label: "대한법률구조공단", href: "https://www.klac.or.kr" },
  },
];

const CHECKLIST = [
  "해고일 기준 14일 이내 지급이 원칙 — 날짜 계산해두기",
  "30일 예고 없이 즉시 해고됐다면 해고예고수당(30일치 통상임금)도 청구 가능",
  "해고 통보 문자·이메일 삭제 금지 — 핵심 증거로 활용",
  "급여명세서 없으면 통장 입금 내역으로 대체 가능",
  "내용증명 발송으로 지급 요청 서면화 → 청구 시점 확보",
  "14일 초과 미지급 시 연 20% 지연이자 자동 발생 — 소송 시 함께 청구",
  "청구 소멸시효 3년 — 퇴직 후 3년 안에 반드시 움직이기",
];

const FAQS = [
  {
    q: "해고 당일에 퇴직금을 바로 줘야 하나요?",
    a: "당일 지급은 의무가 아니에요. 근로기준법 제36조에 따라 해고일로부터 14일 이내에 지급하면 돼요. 다만 당사자 간 합의하면 기한을 연장할 수 있어요.",
  },
  {
    q: "해고예고수당도 14일 내에 받을 수 있나요?",
    a: "맞아요. 30일 전 예고 없이 즉시 해고됐다면 30일치 통상임금을 해고예고수당으로 받을 수 있어요. 퇴직금·미지급 임금과 함께 14일 내 지급 대상이에요.",
  },
  {
    q: "14일이 지났는데 회사가 돈이 없다고 해요",
    a: "회사 재정 상태와 무관하게 근로자의 임금·퇴직금 청구권은 유효해요. 고용노동부 지청에 신고하거나 소송을 제기할 수 있어요. 회사가 실제로 도산 상태라면 체당금 제도로 국가가 대신 지급해줘요.",
  },
  {
    q: "5인 미만 사업장인데 퇴직금을 받을 수 있나요?",
    a: "받을 수 있어요. 퇴직금은 5인 미만 사업장에도 동일하게 적용돼요. 1년 이상 계속 근로하고 주 15시간 이상 근무했다면 사업장 규모에 상관없이 청구 권리가 있어요.",
  },
  {
    q: "퇴직금 청구 소멸시효는 얼마나 되나요?",
    a: "퇴직일로부터 3년이에요. 3년 안에 청구하지 않으면 소멸시효가 완성돼서 받기 어려워져요. 가급적 빨리 청구하는 게 중요해요.",
  },
  {
    q: "해고된 후 실업급여도 함께 받을 수 있나요?",
    a: "받을 수 있어요. 해고는 비자발적 퇴직이라 실업급여 수급 요건에 해당해요. 퇴직금과 실업급여는 별개 제도여서 동시에 받을 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제36조: 금품 청산 (14일 지급 의무)", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로기준법 제26조: 해고예고", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로자퇴직급여 보장법 제9조: 퇴직금 지급 기한", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부: 임금 체불 신고 안내", url: "https://www.moel.go.kr" },
      { label: "고용24: 온라인 임금 체불 신고", url: "https://www.work.go.kr" },
      { label: "대한법률구조공단: 무료 법률 지원", url: "https://www.klac.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-지급-기한", title: "퇴직금 지급 기한 14일 원칙", description: "퇴직 후 14일 이내 지급 의무와 지연이자 청구법." },
  { slug: "퇴직금-해고", title: "해고 시 퇴직금 지급 기준", description: "해고예고수당과 퇴직금 동시 청구 방법." },
  { slug: "퇴직금-미지급-신고", title: "퇴직금 미지급 신고 절차", description: "고용노동부 신고부터 체불 해결까지." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} highlightSlugs={퇴직금_HIGHLIGHT} currentSlug="해고-근로자-임금-퇴직금-지급-기한" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 해고 · 임금 체불</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        해고됐는데 임금·퇴직금을 아직 못 받았나요?<br />
        지급 기한 14일 · 해고예고수당 · 청구 절차
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        해고 근로자도 <a href="/w/퇴직금-지급-기한" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 지급 기한</a>은 14일이에요.
        근로기준법 제36조는 해고를 포함한 모든 퇴직에서 퇴직일로부터 14일 내에 임금과 퇴직금 전액을 지급하도록 강제해요.
        30일 전 예고 없이 즉시 해고됐다면 해고예고수당(30일치 통상임금)도 추가로 받을 수 있어요.
        14일이 지나면 연 20%의 지연이자가 자동으로 붙어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>해고 후 지급 기한, 내가 해당되나요?</H2>
      <p style={body}>
        근로기준법 제36조는 사용자가 근로자를 해고한 경우 해고일로부터 14일 이내에 임금, 퇴직금, 그 밖의 금품을 지급하도록 규정해요.
        징계 해고, 경영상 해고, 권고사직 등 해고 형태와 무관하게 동일한 기한이 적용돼요.
        당사자 간 서면 합의가 있으면 기한을 연장할 수 있지만, 합의 없이 늦추면 법 위반이에요.
      </p>
      <p style={body}>
        5인 미만 사업장도 퇴직금 지급 의무는 동일해요.
        주 15시간 이상, 1년 이상 계속 근로했다면 사업장 크기와 무관하게 <a href="/w/퇴직금-조건" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 조건</a>이 충족돼요.
        30일 미예고 즉시 해고라면 해고예고수당도 같은 기한 내 청구 대상이에요.
      </p>

      <GreenBox>
        해고일로부터 14일 이내 임금 + 퇴직금 전액 지급 의무<br />
        30일 미예고 즉시 해고 → 해고예고수당(30일치 통상임금) 추가 청구 가능<br />
        14일 초과 시 연 20% 지연이자 자동 발생
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="지급 기한 내 미지급 상태로 즉시 청구할 수 있어요. 아래 계산기로 받을 금액을 먼저 확인해보세요."
        partialMatchText="조건 일부가 다를 수 있어요. 고용노동부 고객상담센터(1350)에서 정확한 확인을 권해요."
      />

      <Divider />

      <H2>퇴직금 + 해고예고수당 + 지연이자 얼마나 받나요?</H2>
      <p style={body}>
        받아야 할 금액을 미리 계산해두면 청구할 때 근거가 생겨요.
        퇴직금은 평균임금 × 30일 × 근속연수로 계산하고, 해고예고수당은 30일치 통상임금이에요.
        14일 초과 미지급 시 연 20% 지연이자도 함께 청구할 수 있어요.
      </p>
      <p style={body}>
        아래 슬라이더에서 월 평균 임금과 근속연수를 조정해보세요.
        즉시 해고됐다면 해고예고 부족 일수를 입력하면 해고예고수당도 함께 계산돼요.
      </p>

      <SectionBadge>예상 금액 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 퇴직금 = 평균임금 × 30일 × 근속연수 기준 단순 계산. 실제 금액은 상여금·수당 포함 여부에 따라 달라질 수 있어요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>청구에 필요한 서류</H2>
      <p style={body}>
        고용노동부 신고나 소송을 진행할 때 아래 서류를 미리 준비해두면 절차가 빨라져요.
        해고 통보 문자나 이메일도 증거로 쓰이니 절대 삭제하지 마세요.
        급여명세서가 없다면 통장 입금 내역으로 대체할 수 있어요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>해고 후 임금·퇴직금 청구 절차</H2>
      <p style={body}>
        내용증명 → 고용노동부 신고 → 소송 순서로 진행해요.
        많은 경우 노동청 신고 단계에서 해결되고, 소송까지 가는 경우는 드물어요.
        단계별로 밟으면 돼요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>청구 전 꼭 챙겨야 할 것들</H2>
      <p style={body}>
        증거 자료는 퇴직 직후에 수집해두는 게 좋아요.
        시간이 지나면 회사 측에서 자료를 폐기하거나 접근을 차단하는 경우가 있어요.
        청구 소멸시효(3년)가 있으니 미루지 말고 빠르게 움직이는 게 중요해요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        14일이 지났다면 따로 신청하지 않아도 연 20% 지연이자가 붙어요.
        소송이나 신고 시 원금에 지연이자를 더해 청구할 수 있고, 법원에서 인정돼요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        해고 근로자의 임금·퇴직금 지급 기한에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법 제36조 및 근로자퇴직급여 보장법을 바탕으로 작성됐어요. 개별 상황에 따라 적용이 달라질 수 있으니 고용노동부 고객상담센터(1350) 또는 대한법률구조공단(132)에서 확인하세요." />
    </ArticleLayout>
  );
}
