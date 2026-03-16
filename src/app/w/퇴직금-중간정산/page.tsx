"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "1년 이상 재직 중이에요" },
  { id: "c2", label: "주택 구입·전세 계약·의료비·천재지변 등 법정 사유에 해당해요" },
  { id: "c3", label: "DC형 퇴직연금 또는 퇴직금 제도를 적용받고 있어요" },
  { id: "c4", label: "사유를 증명하는 서류를 준비할 수 있어요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "월 평균임금", min: 150, max: 800, step: 10, defaultValue: 300, format: (v: number) => `${v}만원` },
  { id: "workedYears", label: "중간정산 시점까지 근속", min: 1, max: 20, step: 1, defaultValue: 5, format: (v: number) => `${v}년` },
  { id: "remainYears", label: "중간정산 후 예상 추가 근속", min: 1, max: 20, step: 1, defaultValue: 5, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "중간정산 금액",
    getValue: (v: Record<string, number>) => Math.round(v.salary * 10000 * v.workedYears),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "중간정산 후 추가 퇴직금 (퇴직 시)",
    getValue: (v: Record<string, number>) => Math.round(v.salary * 10000 * v.remainYears),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "중간정산 신청서", required: true, where: "회사 양식 또는 자유 양식" },
  { name: "주택 매매계약서 (주택구입 사유)", required: false, where: "계약 시 수령" },
  { name: "임대차계약서 (전세 사유)", required: false, where: "계약 시 수령" },
  { name: "진단서·의사소견서 (의료비 사유)", required: false, where: "병원 발급" },
  { name: "재직증명서", required: true, where: "회사 인사팀" },
  { name: "급여명세서 (최근 3개월)", required: true, where: "회사 인사팀 요청" },
  { name: "가족관계증명서 (가족 질병 사유)", required: false, where: "정부24 온라인 발급" },
];

const STEPS = [
  {
    title: "법정 사유 해당 여부 확인",
    desc: "중간정산은 아무 때나 할 수 없어요. 무주택자 주택 구입, 전세 보증금 부족, 본인·가족 6개월 이상 요양, 천재지변 등 법정 사유가 있어야 하죠. 사유가 명확해야 회사가 거부할 수 없어요.",
    tip: "사유가 애매하면 고용노동부(1350) 상담 먼저 받아보세요",
  },
  {
    title: "사유별 증빙서류 준비",
    desc: "주택 구입이면 매매계약서, 전세면 임대차계약서, 의료비면 진단서가 필요해요. 서류가 갖춰지지 않으면 회사가 거부할 수 있으니 먼저 준비하세요.",
    tip: "정부24에서 가족관계증명서, 주민등록등본 등 온라인 발급 가능",
  },
  {
    title: "회사에 중간정산 신청",
    desc: "신청서와 증빙서류를 인사팀에 제출해요. 회사는 정당한 사유 없이 거부할 수 없어요. 처리 기간은 회사마다 다르지만 보통 2~4주 이내예요.",
    tip: "DC형이면 금융기관에도 별도 신청이 필요할 수 있어요",
  },
  {
    title: "중간정산 후 퇴직금 기산점 확인",
    desc: "중간정산 후 퇴직금 계산은 중간정산 시점부터 새로 시작돼요. 나중에 퇴직할 때 받는 퇴직금은 중간정산 이후 근속 기간만 기준이 되죠.",
    tip: "중간정산을 자주 하면 최종 퇴직금이 줄어들 수 있어요",
  },
];

const CHECKLIST = [
  "법정 사유 해당 여부 — 조건 외 신청은 무효",
  "사유별 증빙서류 — 미리 준비해야 신청 가능",
  "DC형 여부 — DC형은 금융기관 별도 신청 필요",
  "세금 원천징수 — 중간정산 금액에도 퇴직소득세 적용",
  "중간정산 후 기산점 — 이후 근속부터 다시 계산됨",
];

const FAQS = [
  {
    q: "중간정산은 회사에 말하면 바로 해주나요?",
    a: "법정 사유가 있으면 회사는 거부할 수 없어요. 근로자퇴직급여 보장법 제8조에 따라 사용자가 정당한 사유 없이 거부하면 안 되죠. 다만 서류를 갖춰야 해요.",
  },
  {
    q: "중간정산을 하면 퇴직금이 줄어드나요?",
    a: "중간정산 후 기산점이 초기화돼요. 마지막 퇴직금은 중간정산 이후 기간만 기준이 되죠. 임금이 오르는 상황이라면 중간정산이 불리할 수 있어요.",
  },
  {
    q: "중간정산 금액에도 세금이 붙나요?",
    a: "붙어요. 퇴직소득세가 원천징수돼요. 중간정산도 퇴직금으로 보기 때문에 같은 세율이 적용되죠.",
  },
  {
    q: "DB형도 중간정산이 되나요?",
    a: "DB형은 원칙적으로 중간정산이 안 돼요. DC형이나 퇴직금 제도에서만 가능해요. DB형에서 중간정산 가능한 경우는 특수한 예외 규정이 있을 때예요.",
  },
  {
    q: "이미 중간정산을 한 번 받았어요. 또 받을 수 있나요?",
    a: "법정 사유가 다시 발생하면 가능해요. 예를 들어 이전에 주택 구입으로 받았고, 이번에 가족 의료비가 생겼다면 다시 신청할 수 있죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여 보장법 제8조 — 중간정산 법정 사유", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "근로자퇴직급여 보장법 시행령 제3조 — 중간정산 허용 범위", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법시행령" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 — 퇴직금 중간정산 안내", url: "https://www.moel.go.kr" },
      { label: "정부24 — 증빙서류 온라인 발급", url: "https://www.gov.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-중간정산-조건",
    title: "퇴직금 중간정산 조건, 사유별 정리",
    description: "주택구입·의료비·천재지변 등 허용 사유를 상세히 정리했어요.",
  },
  {
    slug: "퇴직금-중간정산-사유별-증빙서류",
    title: "중간정산 사유별 필요 서류 목록",
    description: "사유에 따라 필요한 서류가 다르니 미리 확인해보세요.",
  },
  {
    slug: "퇴직금-계산법",
    title: "퇴직금 계산법, 얼마나 받을까?",
    description: "중간정산 후 남은 퇴직금이 얼마인지 계산해보세요.",
  },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-중간정산" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 중간정산 · 신청 방법</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 중간정산, 받을 수 있는 조건은?<br />
        사유별 서류부터 신청 절차까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금은 퇴직할 때 받는 게 원칙이에요. 하지만 주택 구입, 전세 보증금, 의료비 등 특정 사유가 있으면 재직 중에도 미리 받을 수 있어요.
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여 보장법 제8조</a>가 정한 법정 사유에 해당하면 회사는 거부할 수 없죠.
        조건 확인, 사유별 서류, 신청 절차를 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>중간정산, 받을 수 있는 조건은?</H2>
      <p style={body}>
        모든 근로자가 중간정산을 신청할 수 있는 건 아니에요. <strong>법정 사유</strong>가 있어야 해요.
        대표적인 사유는 무주택자 주택 구입, 본인·가족의 6개월 이상 요양, 천재지변, 임금 감소로 인한 생계 곤란 등이에요.
      </p>
      <p style={body}>
        또 하나 중요한 점이 있어요. <strong>DC형 퇴직연금 또는 퇴직금 제도</strong>에서만 중간정산이 가능해요.
        DB형 퇴직연금은 원칙적으로 중간정산이 안 되죠.
        내 회사가 어떤 제도를 쓰는지 인사팀에 확인해보세요.
      </p>

      <GreenBox title="중간정산 법정 사유 (대표 4가지)">
        1. 무주택자의 <strong>주택 구입</strong><br />
        2. 전세 보증금으로 인한 <strong>임차보증금 부담</strong><br />
        3. 본인·가족의 <strong>6개월 이상 요양 필요</strong><br />
        4. <strong>천재지변</strong> 또는 기타 법정 사유
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="중간정산 신청이 가능한 상황이에요. 아래 절차를 따라 진행하세요."
        partialMatchText="조건이 완전히 충족되지 않아요. 고용노동부(1350) 상담을 먼저 받아보세요."
      />

      <Divider />

      <H2>중간정산 금액, 얼마나 받을 수 있을까?</H2>
      <p style={body}>
        중간정산 금액은 지금까지 쌓인 퇴직금이에요. 중간정산 후엔 기산점이 리셋되고, 이후 근속분부터 다시 쌓이죠.
        아래에서 현재 상황과 중간정산 후 예상을 함께 확인해보세요.
      </p>

      <SectionBadge>중간정산 금액 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 월 평균임금 기준 추정치. 상여금·연차수당 포함 시 실제 금액이 더 높아요. 중간정산 후 기산점 리셋됨."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>사유별 필요 서류 목록</H2>
      <p style={body}>
        중간정산에서 서류가 가장 중요해요. 사유에 따라 다른 서류가 필요하기 때문에 미리 준비하지 않으면 처리가 늦어져요.
      </p>

      <SectionBadge>사유별 제출 서류</SectionBadge>
      <DocTable docs={DOCS} />

      <BorderBox title="DC형 퇴직연금이라면">
        DC형은 회사가 아닌 <strong>금융기관</strong>에도 별도 신청이 필요할 수 있어요.
        회사 인사팀과 함께 금융기관에도 연락해서 처리 절차를 확인하세요.
      </BorderBox>

      <Divider />

      <H2>중간정산 신청 절차 4단계</H2>
      <p style={body}>
        법정 사유가 명확하고 서류가 갖춰지면 회사는 거부할 수 없어요.
        단계별로 진행하면 처리가 빨라지죠.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>신청 전 준비 체크리스트</H2>
      <p style={body}>
        놓치기 쉬운 포인트들이에요. 특히 세금과 기산점 초기화는 미리 이해하고 결정해야 해요.
      </p>

      <SectionBadge>신청 전 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        중간정산 신청할 때 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여 보장법을 바탕으로 작성됐어요. 법정 사유나 절차는 변경될 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
