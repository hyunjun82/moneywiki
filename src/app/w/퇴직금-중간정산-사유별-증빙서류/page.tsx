"use client";
import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR, 퇴직금_HIGHLIGHT } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "무주택자이고 본인 명의 주택 구입 또는 전세 계약을 앞두고 있어요" },
  { id: "c2", label: "본인·배우자·부양가족이 6개월 이상 요양이 필요한 질병·부상이 있어요" },
  { id: "c3", label: "법원에서 파산 선고 또는 개인회생 절차 개시 결정을 받았어요" },
  { id: "c4", label: "1년 이상 재직 중이고 재직 중 중간정산 이력이 없어요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "월 평균임금", min: 200, max: 700, step: 10, defaultValue: 300, format: (v: number) => `${v}만원` },
  { id: "years", label: "중간정산 신청 시점 근속 연수", min: 1, max: 20, step: 1, defaultValue: 5, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "중간정산 예상 금액",
    getValue: (v: Record<string, number>) => Math.round(v.salary * 10000 * v.years),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "중간정산 후 퇴직금 계산 기산점",
    getValue: () => 0,
    format: () => "중간정산 시점부터 근속 연수 다시 시작",
  },
];

const DOCS = [
  { name: "중간정산 신청서", required: true, where: "회사 인사팀 (법정 양식 없음, 자체 작성 가능)" },
  { name: "주택 매매계약서 또는 임대차계약서", required: false, where: "해당 계약서 사본 (주택 사유 시)" },
  { name: "무주택 확인서 (주민등록 초본)", required: false, where: "정부24 무료 발급 (주택 사유 시)" },
  { name: "진단서 + 의료비 영수증", required: false, where: "병원 발급 (의료비 사유 시)" },
  { name: "파산 선고 결정문 또는 개인회생 개시 결정문", required: false, where: "법원 발행 (파산·회생 사유 시)" },
  { name: "천재지변 피해 확인서", required: false, where: "관할 지자체 발급 (천재지변 사유 시)" },
  { name: "등록금 납부 고지서 또는 수강료 영수증", required: false, where: "학교·기관 발급 (학자금 사유 시)" },
];

const STEPS = [
  {
    title: "법정 사유 해당 여부 확인",
    desc: "근로자퇴직급여보장법 시행령 제3조의 7가지 법정 사유 중 하나에 해당해야 신청할 수 있어요. 주택 구입·임차, 의료비 과다, 파산·개인회생, 천재지변, 임금피크제, 무주택 전세보증금 상환, 학자금이 해당돼요. 사유 해당 여부가 불명확하면 고용노동부(1350)에 사전 문의하세요.",
    tip: "법정 사유 없이 중간정산을 요청하면 회사가 거부할 수 있어요",
  },
  {
    title: "사유별 증빙서류 준비",
    desc: "사유에 맞는 증빙서류를 준비해요. 주택 구입이라면 매매계약서 + 무주택 확인서, 의료비라면 진단서 + 의료비 영수증, 파산·회생이라면 법원 결정문 사본이에요. 공통으로 중간정산 신청서는 반드시 포함돼요.",
    tip: "인사팀에 사전에 필요 서류 목록을 받아두면 한 번에 처리할 수 있어요",
  },
  {
    title: "회사(인사팀)에 신청서 제출",
    desc: "중간정산 신청서와 사유별 증빙서류를 인사팀에 제출해요. 회사는 서류가 완비됐는지 검토하고 지급 여부를 결정해요. 서류가 불완전하면 거부할 수 있어요. 중간정산은 법적 의무가 아닌 회사 재량이에요.",
    tip: "취업규칙에 중간정산 규정이 있는 회사는 기준이 더 엄격할 수 있어요",
  },
  {
    title: "지급 및 근속 기산점 리셋",
    desc: "회사 승인 후 퇴직금이 중간 지급돼요. 중간정산 후에는 근속 기간이 리셋돼 이후 퇴직금은 중간정산 시점부터 다시 계산해요. 세금은 지급 시 퇴직소득세로 원천징수돼요.",
    tip: "중간정산 시점 이후 퇴직금은 중간정산일 기준으로 계산 시작해요",
  },
];

const CHECKLIST = [
  "법정 사유 해당 여부: 근로자퇴직급여보장법 시행령 제3조 확인",
  "공통 서류: 중간정산 신청서 (법정 양식 없음, 자체 작성 가능)",
  "주택 사유: 매매·임대차계약서 + 무주택 확인서 (주민등록 초본)",
  "의료비 사유: 진단서 + 의료비 영수증 (월급 6개월치 초과 여부 증명)",
  "파산·회생 사유: 법원 결정문 사본만으로 가능",
  "근속 기간 리셋: 중간정산 후 퇴직금 계산 기산점이 바뀌어요",
];

const FAQS = [
  {
    q: "전세 계약 갱신도 중간정산 사유가 되나요?",
    a: "원칙적으로 신규 전세 계약만 해당돼요. 계약 갱신은 사유에 해당하지 않는 경우가 많아요. 무주택자가 전세보증금 상환을 위해 신청하는 건 별도 사유로 인정될 수 있어요. 정확한 해당 여부는 고용노동부(1350)에 사전 확인을 권해요.",
  },
  {
    q: "무주택 확인서는 어떻게 발급받나요?",
    a: "정부24(gov.kr)에서 주민등록 초본을 무료로 발급받을 수 있어요. 부동산 미보유 사실은 등기부등본으로도 확인할 수 있어요. 회사마다 요구 서류 기준이 다르니 인사팀에서 먼저 확인하세요.",
  },
  {
    q: "의료비 사유로 신청 시 예상 의료비도 인정되나요?",
    a: "인정될 수 있어요. 6개월 이상 치료를 요하는 진단서와 예상 의료비 확인서(병원 발행)가 있으면 신청 가능해요. 핵심은 의료비 총액이 본인 월급의 6개월치를 초과한다는 걸 서류로 증명하는 거예요.",
  },
  {
    q: "서류가 불완전하면 회사가 거부할 수 있나요?",
    a: "거부할 수 있어요. 중간정산은 법적 의무가 아니에요. 회사가 취업규칙으로 중간정산을 허용하더라도 서류가 불완전하면 거부할 수 있어요. 신청 전에 인사팀에서 필요 서류 목록을 먼저 확인하세요.",
  },
  {
    q: "임금피크제로 임금이 줄면 중간정산 사유가 되나요?",
    a: "맞아요. 임금피크제 적용으로 임금이 삭감되는 경우는 법정 사유에 해당해요. 임금피크제 적용 확인서 또는 취업규칙 변경 공고문을 증빙으로 제출하면 돼요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 시행령 제3조: 중간정산 사유 전체", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법시행령" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부: 퇴직급여제도 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-중간정산-조건", title: "퇴직금 중간정산 조건", description: "7가지 법정 사유와 자격 요건 정리." },
  { slug: "퇴직금-중간정산-신청서", title: "퇴직금 중간정산 신청서", description: "신청서 작성법과 양식 다운로드." },
  { slug: "퇴직금-중간정산", title: "퇴직금 중간정산 전체 안내", description: "중간정산 요건부터 절차까지 한 번에." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} highlightSlugs={퇴직금_HIGHLIGHT} currentSlug="퇴직금-중간정산-사유별-증빙서류" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 중간정산 · 증빙서류</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 중간정산, 서류가 없으면 거부돼요<br />
        사유별 증빙서류와 신청 절차
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        <a href="/w/퇴직금-중간정산" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 중간정산</a>은 법정 사유와 증빙서류가 갖춰져야 회사가 승인해요.
        사유 없이 신청하거나 서류가 불완전하면 거부되고, 재신청해야 해요.
        주택 구입, 의료비, 파산·개인회생, 천재지변 등 사유별로 필요한 서류가 달라요.
        어떤 서류를 준비해야 하는지 사유별로 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>내가 중간정산을 신청할 수 있나요?</H2>
      <p style={body}>
        중간정산은 아무 때나 신청할 수 없어요.
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법시행령" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법 시행령 제3조</a>에서 정한 7가지 법정 사유 중 하나에 해당하고, 해당 사유를 증명하는 서류가 있어야 신청할 수 있어요.
        법정 사유에 해당해도 회사가 취업규칙으로 별도 요건을 정할 수 있어요.
      </p>
      <p style={body}>
        7가지 사유는 주택 구입·임차, 의료비 과다, 파산·개인회생, 천재지변, 임금피크제, 무주택 전세보증금 상환, 학자금이에요.
        사유 해당 여부가 불분명하면 고용노동부(1350)에 먼저 문의하는 게 빠를 수 있어요.
      </p>

      <GreenBox>
        주택 구입·임차 / 의료비 과다 (월급 6개월치 초과)<br />
        파산·개인회생 / 천재지변 / 임금피크제 적용<br />
        무주택 전세보증금 상환 / 학자금 납부
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="중간정산 신청 요건에 해당해요. 아래에서 사유별 증빙서류를 준비하세요."
        partialMatchText="사유 해당 여부를 고용노동부(1350) 또는 인사팀에서 먼저 확인하세요."
      />

      <Divider />

      <H2>중간정산 예상 금액 계산</H2>
      <p style={body}>
        중간정산 금액은 평균임금 × 근속 연수로 계산해요.
        중간정산 후에는 근속 기간이 리셋돼서 이후 퇴직금은 중간정산 시점부터 다시 계산해요.
        신청 전에 예상 금액과 세금을 확인해두면 좋아요.
      </p>

      <SectionBadge>중간정산 금액 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 평균임금 × 근속 연수 기준. 세금은 퇴직소득세로 원천징수돼요. 정확한 세액은 국세청 홈택스에서 확인하세요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>사유별 증빙서류 목록</H2>
      <p style={body}>
        어떤 사유든 중간정산 신청서는 공통으로 필요해요.
        사유별 증빙서류는 추가로 준비해야 해요.
        아래 표에서 내 사유에 해당하는 서류를 골라 준비하세요.
      </p>

      <SectionBadge>서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <p style={body}>
        법원 결정문이 있는 파산·개인회생은 결정문 사본만으로 충분해요.
        의료비 사유는 의료비 총액이 월급 6개월치를 넘는다는 사실을 서류로 입증하는 게 핵심이에요.
      </p>

      <Divider />

      <H2>중간정산 신청 절차 4단계</H2>
      <p style={body}>
        서류가 완비됐다면 신청은 어렵지 않아요.
        사유 확인 → 서류 준비 → 회사 제출 → 지급 순서로 진행돼요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>신청 전 서류 준비 체크리스트</H2>
      <p style={body}>
        서류 하나라도 빠지면 재제출해야 해서 처리 기간이 늘어나요.
        제출 전에 아래 목록으로 한 번 더 확인하세요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        법정 사유와 서류가 완비돼도 회사가 거부할 수 있어요.<br />
        취업규칙이나 단체협약에 중간정산 관련 규정이 있다면 그 기준이 우선돼요.<br />
        신청 전에 인사팀에서 내부 기준과 필요 서류 목록을 먼저 받아두세요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        중간정산 사유별 증빙서류에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법 시행령을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
