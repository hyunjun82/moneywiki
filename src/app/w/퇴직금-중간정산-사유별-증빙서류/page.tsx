"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "무주택자이고 주택 구입 또는 전세 계약이 있어요" },
  { id: "c2", label: "본인 또는 가족의 의료비가 6개월 월급을 초과해요" },
  { id: "c3", label: "개인회생 또는 파산 결정을 받았어요" },
  { id: "c4", label: "어떤 서류를 준비해야 하는지 모르겠어요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "월 평균임금", min: 200, max: 700, step: 10, defaultValue: 300, format: (v: number) => `${v}만원` },
  { id: "years", label: "중간정산 신청 시점 근속 기간", min: 1, max: 20, step: 1, defaultValue: 5, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "중간정산 예상 금액",
    getValue: (v: Record<string, number>) => Math.round(v.salary * 10000 * v.years),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "중간정산 후 근속 기간 리셋 — 최종 퇴직금 0원",
    getValue: () => 0,
    format: () => "중간정산 시점부터 다시 계산 시작",
  },
];

const DOCS = [
  { name: "주택 매매계약서 또는 임대차계약서 (주택 사유)", required: false, where: "해당 계약서 사본" },
  { name: "진단서·치료확인서·의료비 영수증 (의료비 사유)", required: false, where: "병원 발급" },
  { name: "파산·개인회생 결정문 (해당 시)", required: false, where: "법원 발행" },
  { name: "중간정산 신청서", required: true, where: "회사 인사팀 양식 또는 자체 작성" },
];

const STEPS = [
  {
    title: "주택 구입·임차 사유 (가장 흔한 사유)",
    desc: "무주택자가 본인 주거 목적으로 주택을 구입하거나 전세계약을 맺는 경우에 해당해요. 필요 서류: 주택 매매계약서 또는 임대차계약서, 무주택 확인서(주민등록 초본 또는 부동산 미보유 확인). 회사에 따라 가족관계증명서도 요구하는 경우가 있어요.",
    tip: "전월세 갱신은 사유에 해당하지 않는 경우도 있어요 — 회사에 먼저 확인",
  },
  {
    title: "의료비 과다 사유",
    desc: "본인·배우자·부양가족이 질병·부상으로 6개월 이상의 치료를 요하고, 의료비가 본인 월급의 6개월치를 초과하는 경우예요. 필요 서류: 진단서(주치의 발행), 치료확인서, 의료비 영수증(또는 예상 금액 확인서). 입원이 예정된 경우에도 해당돼요.",
    tip: "의료비가 월급 6개월치를 넘는다는 서류가 핵심이에요",
  },
  {
    title: "파산·개인회생 사유",
    desc: "법원에서 파산 결정 또는 개인회생 절차 개시 결정을 받은 경우예요. 필요 서류: 파산 선고 결정문 또는 개인회생 개시 결정문 사본(법원 발행). 결정문 사본만 있으면 다른 서류는 필요 없어요.",
    tip: "결정문을 법원에서 직접 발급받거나 법원 전자소송 시스템에서 출력하세요",
  },
  {
    title: "기타 사유 (천재지변·학자금 등)",
    desc: "천재지변으로 재산 피해가 있는 경우: 관할 자치단체 피해 확인서가 필요해요. 학자금 사유: 교육비 납부 고지서 또는 등록금 영수증이에요. 기타 사유는 근로자퇴직급여보장법 시행령 제3조 전문을 확인하세요.",
    tip: "사유 해당 여부가 불명확하면 고용노동부(1350) 사전 문의를 권해요",
  },
];

const CHECKLIST = [
  "사유별 서류 — 주택: 계약서, 의료: 진단서·영수증, 파산: 결정문",
  "중간정산 신청서 — 회사 양식 또는 자체 작성",
  "무주택 확인 — 주민등록 초본 또는 부동산 미보유 확인",
  "회사 취업규칙 확인 — 중간정산 세부 요건이 다를 수 있어요",
  "근속 기간 리셋 주의 — 중간정산 후 퇴직금 다시 계산 시작",
];

const FAQS = [
  {
    q: "중간정산 신청서 양식은 어디서 받나요?",
    a: "회사 인사팀에서 받거나 자체 작성해도 돼요. 법정 양식은 없어요. 신청 사유, 금액, 날짜를 명시해서 작성하면 됩니다.",
  },
  {
    q: "무주택 확인서는 어떻게 발급받나요?",
    a: "주민등록 초본이나 부동산 등기부등본으로 확인할 수 있어요. 정부24에서 주민등록 초본을 무료로 발급받을 수 있어요.",
  },
  {
    q: "의료비 사유로 중간정산 신청 시 예상 의료비도 인정되나요?",
    a: "인정될 수 있어요. 6개월 이상 치료를 요하는 진단서와 예상 의료비 확인서(병원 발행)가 있으면 신청 가능해요. 회사마다 기준이 다를 수 있어요.",
  },
  {
    q: "서류가 불완전하면 회사가 거부할 수 있나요?",
    a: "맞아요. 증빙 서류가 불완전하면 회사가 중간정산을 거부할 수 있어요. 중간정산은 법정 의무가 아닌 재량이라서, 서류를 완벽히 준비하는 게 중요해요.",
  },
  {
    q: "전세 계약 갱신도 중간정산 사유가 되나요?",
    a: "원칙적으로 '신규 전세 계약'이 대상이에요. 계약 갱신은 사유에 해당하지 않는 경우가 많아요. 회사 취업규칙이나 고용노동부(1350)에 사전 확인을 권해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 시행령 제3조 — 중간정산 사유 전체", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법시행령" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 — 퇴직금 중간정산 사유 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-중간정산", title: "퇴직금 중간정산 완전 정리", description: "중간정산 요건과 절차를 자세히 설명해요." },
  { slug: "퇴직금-중간정산-신청-법정-사유-절차", title: "중간정산 신청 법정 사유와 절차", description: "7가지 법정 사유와 신청 단계를 안내해요." },
  { slug: "퇴직금-중간정산-세금", title: "퇴직금 중간정산 세금", description: "중간정산 시 퇴직소득세를 계산해요." },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-중간정산-사유별-증빙서류" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 중간정산 · 증빙서류</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 중간정산 사유별 필요 서류는?<br />
        주택·의료·파산 등 사유 4가지 완전 정리
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        <a href="/w/퇴직금-중간정산" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 중간정산</a>은 법정 사유와 증빙 서류가 갖춰져야 신청할 수 있어요.
        사유별로 필요한 서류가 다르고, 서류가 불완전하면 회사가 거부할 수 있어요.
        주택 구입, 의료비, 파산·개인회생, 기타 사유로 나눠서 필요 서류를 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>중간정산 사유별 핵심 서류 한눈에 보기</H2>
      <p style={body}>
        사유 확인과 서류 준비가 핵심이에요. 아래에서 내 상황이 어디에 해당하는지 먼저 체크해보세요.
        법정 사유에 해당하지 않으면 신청 자체가 불가능해요.
      </p>
      <p style={body}>
        회사마다 취업규칙에 중간정산 세부 요건이 다를 수 있어요.
        신청 전에 회사 인사팀에 먼저 확인하고 필요 서류 목록을 받아두면 한 번에 처리할 수 있어요.
      </p>

      <GreenBox title="중간정산 사유별 핵심 서류 요약">
        주택 구입·임차: 매매·임대차계약서 + 무주택 확인<br />
        의료비 과다: 진단서 + 의료비 영수증<br />
        파산·개인회생: 법원 결정문 사본<br />
        신청 공통: 중간정산 신청서
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="중간정산 신청 사유에 해당해요. 아래에서 사유별 필요 서류를 확인하세요."
        partialMatchText="사유 해당 여부를 고용노동부(1350) 또는 노무사를 통해 확인하세요."
      />

      <Divider />

      <H2>중간정산 예상 금액 계산</H2>
      <p style={body}>
        월 평균임금과 근속 기간을 입력하면 중간정산 예상 금액을 확인할 수 있어요.
        중간정산 후 근속 기간이 리셋되니 신청 전에 세금도 함께 계산해보세요.
      </p>

      <SectionBadge>중간정산 금액 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 법정 최저 기준. 중간정산 후 근속 기간이 다시 시작돼요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>사유별 공통 준비 서류</H2>
      <p style={body}>
        어떤 사유든 공통으로 중간정산 신청서가 필요해요.
        사유별 증빙 서류는 추가로 준비해야 해요.
      </p>

      <SectionBadge>공통 준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>사유별 증빙 서류 4가지</H2>
      <p style={body}>
        주택·의료·파산·기타 사유별로 필요한 서류가 달라요.
        사유에 맞는 서류를 완벽히 갖춰서 한 번에 제출하는 게 처리 속도를 높이는 방법이에요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>중간정산 서류 준비 체크리스트</H2>
      <p style={body}>
        사유별 서류와 공통 서류를 모두 챙겨야 승인이 돼요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="서류 불완전 시 회사가 거부할 수 있어요">
        중간정산은 회사 재량이에요. 서류가 불완전하면 거부됩니다.<br />
        신청 전에 인사팀에 필요 서류 목록을 먼저 받아두세요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 중간정산 사유별 증빙 서류에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법 시행령을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
