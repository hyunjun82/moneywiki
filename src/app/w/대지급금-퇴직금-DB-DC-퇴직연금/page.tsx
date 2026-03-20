"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR, 퇴직금_HIGHLIGHT } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "회사가 폐업·도산했거나 임금·퇴직금을 체불했어요" },
  { id: "c2", label: "DB형 또는 DC형 퇴직연금을 받지 못했어요" },
  { id: "c3", label: "퇴직한 지 2년이 지나지 않았어요" },
  { id: "c4", label: "재직 당시 상시근로자 수가 300인 미만이었어요" },
];

const CALC_SLIDERS = [
  { id: "monthly", label: "월 평균 임금 (만원)", min: 200, max: 800, step: 10, defaultValue: 300, format: (v: number) => `${v}만원` },
  { id: "months", label: "미지급 개월 수", min: 1, max: 36, step: 1, defaultValue: 3, format: (v: number) => `${v}개월` },
];

const CALC_RESULTS = [
  {
    label: "대지급금 상한액 (퇴직금 기준)",
    getValue: (v: Record<string, number>) => Math.min(v.monthly * 10000 * v.months, 21000000),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원 (최대 2,100만원)`,
    highlight: true,
  },
  {
    label: "체불 임금 추정액",
    getValue: (v: Record<string, number>) => v.monthly * 10000 * v.months,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "체불 임금 등 사업주 확인서", required: true, where: "관할 고용노동청 발급" },
  { name: "신분증", required: true, where: "본인 지참" },
  { name: "통장 사본 (본인 명의)", required: true, where: "은행 발급" },
  { name: "근로계약서 또는 재직 증명 서류", required: false, where: "인사팀 또는 고용24" },
];

const STEPS = [
  {
    title: "고용노동청에 체불 신고",
    desc: "회사가 퇴직금·임금을 주지 않으면 관할 고용노동청에 체불 진정을 내요. 고용24(online) 또는 방문으로 접수할 수 있어요. 신고 후 근로감독관이 조사에 들어가요.",
    tip: "퇴직 후 3년 이내에 신고해야 해요 (소멸시효)",
    link: { label: "고용24 체불 신고", href: "https://www.work24.go.kr" },
  },
  {
    title: "체불 확인서 발급",
    desc: "근로감독관이 체불 사실을 확인하면 '체불 임금 등 사업주 확인서'를 발급해줘요. 이 서류가 대지급금 신청의 핵심이에요. 도산·폐업 기업은 법원의 도산 사실 확인도 필요해요.",
    tip: "확인서 발급까지 보통 1~3개월 소요돼요",
  },
  {
    title: "근로복지공단에 대지급금 신청",
    desc: "체불 확인서를 받은 날로부터 1년 이내에 근로복지공단에 대지급금을 신청해요. 온라인(kcomwel.or.kr) 또는 방문으로 가능해요. DB·DC 퇴직연금 미지급분도 여기서 신청해요.",
    tip: "퇴직 후 2년 이내, 확인서 발급 후 1년 이내 — 두 조건 모두 충족해야 해요",
    link: { label: "근로복지공단 신청", href: "https://www.kcomwel.or.kr" },
  },
  {
    title: "대지급금 수령",
    desc: "신청 후 보통 2~4주 내에 지급돼요. 상한액은 2,100만원이에요. 대지급금을 받은 뒤 국가가 사업주에게 구상권을 행사해요. 수령 후에도 부족분은 사업주에게 직접 청구할 수 있어요.",
    tip: "IRP로도 받을 수 있어요 — 세금 납부를 나중으로 미룰 수 있어요",
  },
];

const CHECKLIST = [
  "체불 신고: 고용24 또는 관할 고용노동청",
  "소멸시효: 퇴직 후 3년 이내",
  "체불 확인서: 근로감독관 발급 후 1년 이내 신청",
  "상한액: 2,100만원 (퇴직금+임금 합산)",
  "DB·DC 퇴직연금 미납분도 대지급금 대상이에요",
  "상한액 초과분은 민사소송으로 별도 청구 가능해요",
];

const FAQS = [
  {
    q: "DB·DC 퇴직연금을 못 받은 경우도 대지급금 신청이 되나요?",
    a: "가능해요. 퇴직연금(DB·DC형) 미지급분도 체불 임금에 해당해서 대지급금 신청 대상이에요. 사업주가 퇴직연금 납입을 안 했거나 운용사에서 지급 거부한 경우에 해당해요.",
  },
  {
    q: "대지급금 상한액이 2,100만원이면 부족하면 어떻게 하나요?",
    a: "상한액을 초과하는 부분은 사업주에게 직접 청구해야 해요. 법원에 소액심판 또는 민사소송을 제기할 수 있고, 회사 재산이 남아 있다면 압류도 가능해요.",
  },
  {
    q: "회사가 폐업했는데 사업자번호도 모르면?",
    a: "고용24나 국세청 홈택스에서 사업자 정보를 조회할 수 있어요. 정보가 없어도 고용노동청 방문 상담을 받으면 조사 방법을 안내해줘요.",
  },
  {
    q: "대지급금 신청 기한이 지나면 방법이 없나요?",
    a: "대지급금은 기한이 지나면 신청이 안 돼요. 그래도 민사소송이나 지급명령으로 사업주에게 직접 청구할 수 있어요. 3년 소멸시효 내라면 법적 청구는 가능해요.",
  },
  {
    q: "재직 중 임금 체불도 대지급금을 받을 수 있나요?",
    a: "아니에요. 대지급금은 퇴직 후에 신청할 수 있어요. 재직 중 체불은 고용노동청 진정을 통해 사업주에게 지급을 강제하는 방식으로 해결해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "임금채권보장법: 대지급금 제도", url: "https://www.law.go.kr/법령/임금채권보장법" },
      { label: "근로자퇴직급여보장법: DB·DC 퇴직연금", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "근로복지공단: 대지급금 신청 안내", url: "https://www.kcomwel.or.kr" },
      { label: "고용노동부: 체불임금 처리 절차", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "회사-폐업-퇴직금", title: "회사 폐업 후 퇴직금 받는 법", description: "폐업 시 퇴직금 청구 절차와 우선변제권." },
  { slug: "퇴직금-미지급-신고", title: "퇴직금 미지급 신고 방법", description: "노동청 신고 절차와 지연이자 청구." },
  { slug: "회사-폐업-퇴직금-체당금-신청-우선변제권", title: "체당금 신청과 우선변제권", description: "대지급금과 우선변제권 차이점 정리." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} highlightSlugs={퇴직금_HIGHLIGHT} currentSlug="대지급금-퇴직금-DB-DC-퇴직연금" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 대지급금 · DB·DC퇴직연금</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        회사 도산 후 퇴직연금도 못 받았다면?<br />
        대지급금으로 DB·DC형도 신청할 수 있어요
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        회사가 폐업·도산해서 <a href="/w/퇴직금-수령방법" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금</a>을 못 받았다면 국가가 대신 지급해주는 대지급금(구 체당금) 제도가 있어요.
        DB·DC 퇴직연금 미지급분도 대지급금으로 받을 수 있어요.
        상한액은 2,100만원이고, 퇴직 후 2년 이내에 신청해야 해요.
        <a href="/w/퇴직금-소멸시효" style={{ color: "#1D9E75", textDecoration: "underline" }}>소멸시효</a>가 지나면 청구할 수 없으니 빠르게 신청하세요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>대지급금, 퇴직연금도 받을 수 있나요?</H2>
      <p style={body}>
        대지급금은 사업주가 임금·퇴직금을 못 준 경우 국가(근로복지공단)가 대신 지급하는 제도예요.
        일반 퇴직금뿐만 아니라 DB·DC 퇴직연금 미지급분도 신청 대상이에요.
        단, 퇴직 후 2년 이내에 신청해야 하고, 재직 당시 상시근로자 수 300인 미만 사업장이어야 해요.
      </p>
      <p style={body}>
        DC형(확정기여형)은 사업주가 매년 퇴직금을 납입해야 하는데, 미납된 경우 대지급금으로 받을 수 있어요.
        DB형(확정급여형)은 운용사가 지급을 거부하거나 사업주가 적립을 못 한 경우에 해당해요.
        체불 확인서 발급 후 1년 이내에 근로복지공단에 신청해요.
      </p>

      <GreenBox>
        퇴직 후 2년 이내 (기준: 퇴직일)<br />
        체불 확인서 발급 후 1년 이내<br />
        상한액: 2,100만원 (퇴직금+임금 합산)<br />
        상시근로자 300인 미만 사업장 (일반 대지급금 기준)
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="대지급금 신청 요건에 해당해요. 아래 예상 금액을 확인하고 고용노동청에 신고하세요."
        partialMatchText="일부 조건이 다를 수 있어요. 고용노동부(1350) 상담을 권해요."
      />

      <Divider />

      <H2>체불 임금과 대지급금 상한액 계산</H2>
      <p style={body}>
        대지급금 상한액은 퇴직금과 임금을 합산해 최대 2,100만원이에요.
        월 임금과 미지급 개월 수를 입력하면 체불 추정액과 대지급금 상한액을 비교할 수 있어요.
        상한액을 넘는 부분은 사업주에게 직접 청구하거나 민사소송으로 해결해야 해요.
      </p>

      <SectionBadge>대지급금 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 대지급금 상한액은 2,100만원. 초과분은 사업주에게 직접 청구 또는 민사소송으로 해결해요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>신청에 필요한 서류</H2>
      <p style={body}>
        체불 확인서가 핵심 서류예요. 이 서류는 고용노동청 근로감독관이 발급해줘요.
        신분증과 통장 사본을 준비하면 대부분의 신청이 가능해요.
        근로계약서가 없어도 재직 사실을 증명할 수 있으면 돼요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>대지급금 신청 절차 4단계</H2>
      <p style={body}>
        신고부터 수령까지 보통 3~5개월이 걸려요.
        체불 확인서 발급이 핵심이고, 이후 근로복지공단 신청이 빠르게 진행돼요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>신청 전 꼭 챙겨야 할 것들</H2>
      <p style={body}>
        소멸시효와 신청 기한이 엄격해요. 퇴직 후 2년을 넘기면 신청할 수 없어요.
        기한을 놓치기 전에 고용노동청에 먼저 신고하는 게 중요해요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        사업주가 퇴직연금 납입을 안 했거나 운용사가 지급을 못 하는 경우,
        대지급금으로 청구할 수 있어요. 고용노동청 신고가 첫 번째 단계예요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        대지급금과 퇴직연금 미지급에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 임금채권보장법과 근로자퇴직급여보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
