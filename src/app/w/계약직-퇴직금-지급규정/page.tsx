"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "고용 형태가 기간제(계약직)이에요" },
  { id: "c2", label: "최초 입사일로부터 1년 이상 계속 근무했어요" },
  { id: "c3", label: "4주 평균 주 소정 근로시간이 15시간 이상이에요" },
  { id: "c4", label: "계약 만료 후 갱신 없이 퇴직했거나 퇴직 예정이에요" },
];

const CALC_SLIDERS = [
  { id: "months", label: "근속 기간 (개월)", min: 12, max: 120, step: 1, defaultValue: 24, format: (v: number) => `${v}개월` },
  { id: "monthly", label: "월 평균임금 (만원)", min: 200, max: 600, step: 10, defaultValue: 300, format: (v: number) => `${v}만원` },
];

const CALC_RESULTS = [
  {
    label: "퇴직금 예상액",
    getValue: (v: Record<string, number>) => Math.round((v.months / 12) * v.monthly * 10000),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "IRP 수령 여부",
    getValue: (v: Record<string, number>) => Math.round((v.months / 12) * v.monthly * 10000),
    format: (v: number) => v > 3000000 ? "IRP 계좌 필수 (300만원 초과)" : "일반 통장 수령 가능",
  },
];

const DOCS = [
  { name: "근로계약서 (갱신 계약서 포함 전부)", required: true, where: "회사 인사팀 또는 입사 시 수령본" },
  { name: "급여명세서 (퇴직 전 3개월분)", required: true, where: "회사 인사팀 요청" },
  { name: "경력증명서 또는 재직 기간 확인서", required: true, where: "회사 발급 (거부 시 고용보험 이력으로 대체)" },
  { name: "통장 사본 또는 IRP 계좌번호 (300만원 초과 시)", required: true, where: "은행·증권사 개설 후 확인" },
  { name: "퇴직금 지급 청구서", required: false, where: "회사 인사팀 양식 또는 직접 작성" },
];

const STEPS = [
  {
    title: "근속 기간·근로시간 조건 확인",
    desc: "최초 입사일부터 계약 만료일까지 1년 이상인지 계산해요. 계약이 여러 번 갱신됐다면 갱신 사이 공백이 없는 기간을 모두 합산해요. 주 15시간 기준은 4주 평균으로 판단해요.",
    tip: "근로계약서가 여러 장이면 전부 보관하세요. 계속근로 입증에 필요해요.",
  },
  {
    title: "IRP 계좌 사전 개설",
    desc: "퇴직금 300만원 초과 시 반드시 IRP 계좌로만 수령해야 해요(2022년 4월 의무화). 은행·증권사·보험사 앱에서 무료로 개설할 수 있어요. 계약 만료 전에 미리 열어두면 지급 지연을 막을 수 있어요.",
    tip: "IRP 계좌번호를 인사팀에 문자나 메일로 미리 전달하세요.",
    link: { label: "IRP 계좌 개설 방법", href: "/w/퇴직금-IRP-계좌" },
  },
  {
    title: "퇴직금 청구서 제출",
    desc: "계약 만료 후 회사는 14일 이내에 퇴직금을 지급해야 해요. 회사가 먼저 지급하지 않으면 퇴직금 지급 청구서를 작성해서 인사팀에 제출해요. 제출일자를 기록해두세요.",
    tip: "계약서에 '퇴직금 없음'이라고 적혀 있어도 법정 의무는 그대로예요.",
  },
  {
    title: "미지급 시 고용노동부 진정 접수",
    desc: "14일이 지나도 퇴직금이 안 나오면 고용노동부 민원마당(minwon.moel.go.kr)에서 진정을 접수해요. 지연이자(연 20%)도 함께 청구할 수 있고, 소멸시효는 퇴직일로부터 3년이에요.",
    tip: "온라인 접수가 가장 빠르고, 보통 2~4주 내 처리돼요.",
    link: { label: "퇴직금 미지급 신고 방법", href: "/w/퇴직금-미지급-신고" },
  },
];

const CHECKLIST = [
  "근로계약서 전부 모으기: 갱신 계약서까지 전부 포함",
  "1년 이상·주 15시간 이상 조건 확인: 입사일~만료일 정확히 계산",
  "IRP 계좌 미리 개설: 퇴직금 300만원 초과 시 필수",
  "계약 만료 후 14일 이내 지급 여부 확인",
  "미지급 시 3년 이내 고용노동부 진정 접수",
];

const FAQS = [
  {
    q: "계약직도 정규직과 동일한 퇴직금 지급 규정을 적용받나요?",
    a: "맞아요. 근로자퇴직급여보장법 제4조는 고용 형태를 구분하지 않아요. 1년 이상 계속 근무하고 주 15시간 이상이면 계약직도 정규직과 똑같이 퇴직금을 받을 권리가 있어요.",
  },
  {
    q: "6개월짜리 계약을 2번 갱신해 총 1년이 됐는데 퇴직금이 발생하나요?",
    a: "발생해요. 공백 없이 이어졌다면 최초 입사일부터 전체 기간이 합산돼요. 단, 계약 사이에 실질적인 근로 단절이 있으면 계속근로로 보기 어려울 수 있어요.",
  },
  {
    q: "계약 만료로 퇴직해도 퇴직금을 받을 수 있나요?",
    a: "받을 수 있어요. 계약 만료는 적법한 퇴직 사유예요. 회사가 갱신 거부를 통보하고 계약이 종료됐다면 지급 조건만 충족하면 퇴직금이 발생해요.",
  },
  {
    q: "회사가 계약직이라 퇴직금 없다고 하면 어떻게 해야 하나요?",
    a: "고용노동부(1350)에 신고하면 돼요. 계약서에 퇴직금 없다는 조항이 있어도 법정 퇴직금 지급 의무는 계약 내용보다 우선해요. 시정 명령이 내려지고 지연이자도 청구할 수 있어요.",
  },
  {
    q: "계약직 퇴직금도 IRP로 받아야 하나요?",
    a: "퇴직금 300만원 초과 시 IRP 계좌로만 받아야 해요. 계약직·정규직 구분 없이 동일하게 적용되는 의무예요(2022년 4월 이후 기준).",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 제4조: 퇴직급여제도 설정 의무", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "기간제 및 단시간근로자 보호 등에 관한 법률", url: "https://www.law.go.kr/법령/기간제및단시간근로자보호등에관한법률" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부: 퇴직금 제도 안내", url: "https://www.moel.go.kr" },
      { label: "고용노동부 민원마당: 임금체불 진정 접수", url: "https://minwon.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "계약직-퇴직금", title: "계약직 퇴직금 전체 정리", description: "언제, 얼마나, 어떻게 받는지 한 번에." },
  { slug: "퇴직금-조건", title: "퇴직금 지급 조건", description: "1년·15시간 기준 상세 안내." },
  { slug: "퇴직금-계산-방법", title: "퇴직금 계산 방법", description: "평균임금·근속연수로 직접 계산하기." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="계약직-퇴직금-지급규정" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 계약직 · 기간제 지급 규정</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        계약직도 퇴직금 받을 수 있는 규정이 있나요?<br />
        지급 조건·청구 절차·미지급 대응까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        계약직(기간제)이라도 <a href="/w/퇴직금-조건" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 지급 조건</a>인 1년 이상 계속 근무와 주 15시간 이상만 충족하면 퇴직금을 받을 권리가 있어요.
        근로자퇴직급여보장법은 고용 형태를 구분하지 않아요.
        계약 만료 후 갱신 없이 퇴직해도 지급 의무가 생기고, 회사는 14일 이내에 지급해야 해요.
        이 글에서 지급 규정부터 청구 절차, 미지급 대응까지 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>계약직 퇴직금 지급 조건, 어떻게 되나요?</H2>
      <p style={body}>
        근로자퇴직급여보장법 제4조는 정규직·계약직 구분 없이 모든 근로자에게 적용돼요.
        조건은 두 가지예요. 1년 이상 계속 근무, 그리고 4주 평균 주 소정 근로시간 15시간 이상이에요.
        이 두 가지를 충족하면 계약직도 정규직과 동일한 퇴직금을 받을 수 있어요.
      </p>
      <p style={body}>
        계약이 여러 번 갱신됐다면 최초 입사일부터 전체 기간을 합산해요.
        갱신 사이에 공백이 없으면 계속근로로 보고, 실질적인 고용 단절이 없었다면 공백이 있어도 합산될 수 있어요.
        계약 만료 후 갱신 없이 종료되는 것도 퇴직으로 인정되고 퇴직금이 발생해요.
      </p>

      <GreenBox title="계약직 퇴직금 지급 규정 핵심">
        1. 1년 이상 계속 근로 — 계약 갱신 합산 포함<br />
        2. 4주 평균 주 15시간 이상 근무<br />
        3. 고용 형태 무관 — 정규직·계약직·단시간 모두 동일 적용
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="계약직 퇴직금 지급 규정 조건을 갖추고 있어요. 아래 계산기로 예상 금액을 확인해보세요."
        partialMatchText="일부 조건이 다를 수 있어요. 고용노동부 고객상담센터(1350)에 문의해보세요."
      />

      <Divider />

      <H2>계약직 퇴직금 예상 금액 계산</H2>
      <p style={body}>
        퇴직금은 <a href="/w/퇴직금-계산-방법" style={{ color: "#1D9E75", textDecoration: "underline" }}>1일 평균임금 × 30일 × 근속 연수</a>로 계산해요.
        1일 평균임금은 퇴직 전 3개월 임금 총액을 해당 기간 총 일수(보통 89~92일)로 나눈 금액이에요.
        아래 슬라이더에서 근속 기간과 월급을 조정하면 대략적인 예상 금액과 IRP 수령 여부를 바로 볼 수 있어요.
      </p>

      <SectionBadge>계약직 퇴직금 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 월 평균임금 기준 간단 추산이에요. 실제는 퇴직 전 3개월 평균임금으로 계산하며, 상여금·수당 포함 여부에 따라 달라져요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>지급 규정 확인 및 청구 서류</H2>
      <p style={body}>
        퇴직금 청구 시 근로계약서가 핵심 서류예요.
        계약이 여러 번 갱신됐다면 갱신 계약서까지 전부 모아야 계속근로 기간을 증명할 수 있어요.
        회사가 경력증명서 발급을 거부하면 고용24(ei.go.kr)에서 고용보험 피보험자 이력으로 대체할 수 있어요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>계약 만료 후 퇴직금 청구 절차</H2>
      <p style={body}>
        회사는 계약 만료일로부터 14일 이내에 퇴직금을 지급해야 해요.
        IRP 계좌를 미리 개설하지 않으면 지급이 늦어질 수 있어요.
        14일이 지나도 안 나오면 고용노동부 진정을 통해 지연이자(연 20%)까지 받을 수 있어요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>청구 전 놓치면 안 되는 체크리스트</H2>
      <p style={body}>
        지급 규정 조건만 충족하면 계약직 퇴직금은 반드시 받을 수 있어요.
        서류를 미리 모아두고, IRP 계좌를 열어두면 수령이 빨라져요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="지연이자도 함께 청구할 수 있어요">
        계약 만료 후 14일이 지나도 퇴직금이 안 나오면 연 20% 지연이자를 청구할 수 있어요.
        고용노동부 진정 접수 시 사업주에게 시정 명령이 내려지고, 지연이자도 함께 받을 수 있어요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        계약직 퇴직금 지급 규정에 대해 실제로 자주 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법과 기간제 및 단시간근로자 보호 등에 관한 법률을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부 고객상담센터(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
