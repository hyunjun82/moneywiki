"use client";

// Q1. 계약직으로 일하다가 계약이 끝났거나 끝날 예정인데 퇴직금을 받을 수 있는지 모르는 상황
// Q2. 본인 조건을 파악하고 금액을 계산한 뒤 실제로 퇴직금을 청구하는 행동
// Q3. 발생 조건(1년+15시간), 갱신 합산 규칙, 계산 방법, IRP 계좌, 미지급 시 신고 절차
// Q4. 조건 체크리스트 → 계산기 → 단계별 절차 순서 (행동 순서 = 글 순서)

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR, 퇴직금_HIGHLIGHT } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "계약직(기간제)으로 근무하고 있거나 근무했죠" },
  { id: "c2", label: "같은 사업장에서 1년 이상 계속 근무했죠" },
  { id: "c3", label: "4주 평균 주 소정 근로시간이 15시간 이상이고요" },
  { id: "c4", label: "계약 종료일로부터 아직 3년이 지나지 않았죠" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "월 급여 (만원)", min: 150, max: 600, step: 10, defaultValue: 260, format: (v: number) => `${v}만원` },
  { id: "months", label: "계약 기간 (개월)", min: 12, max: 72, step: 1, defaultValue: 24, format: (v: number) => `${v}개월` },
];

const CALC_RESULTS = [
  {
    label: "계약직 퇴직금 예상액",
    getValue: (v: Record<string, number>) => Math.round(v.salary * 10000 * (v.months / 12)),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "연간 퇴직금 적립액 (참고)",
    getValue: (v: Record<string, number>) => v.salary * 10000,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원 / 1년`,
  },
];

const DOCS = [
  { name: "근로계약서 (갱신 계약서 포함)", required: true, where: "회사 인사팀 또는 입사 시 수령본" },
  { name: "급여명세서 (퇴직 전 3개월분)", required: true, where: "회사 인사팀 요청" },
  { name: "고용보험 피보험자격 이력 확인서", required: false, where: "고용24(ei.go.kr) 무료 발급" },
  { name: "IRP 계좌번호 (300만원 초과 시)", required: true, where: "은행·증권사·보험사 앱 개설" },
];

const STEPS = [
  {
    title: "계속근로 기간 체크",
    desc: "입사일부터 계약 종료일까지 정확히 계산해봐요. 계약을 반복 갱신했다면 공백 없이 이어진 전체 기간을 합산해요. 고용24(ei.go.kr)에서 고용보험 가입 이력으로 입사일을 조회할 수 있죠.",
    tip: "계약 사이에 공백이 있어도 동일 업무·동일 장소라면 실질로 판단해요.",
  },
  {
    title: "퇴직금 금액 계산",
    desc: "1일 평균임금 × 30일 × 근속연수로 계산해요. 평균임금은 퇴직 전 3개월 급여 총액을 해당 기간 총 일수로 나눈 금액이에요. 상여금이 있다면 연간 총액을 12로 나눠서 월 급여에 더해봐요.",
    tip: "상여금 환산: 연간 상여금 총액 ÷ 12 = 월 환산액",
  },
  {
    title: "IRP 계좌 개설 및 지급 요청",
    desc: "퇴직금 300만원 초과 시 IRP 계좌로만 받을 수 있죠. 은행·증권사·보험사 앱에서 무료로 열 수 있죠. 계좌번호를 인사팀에 문자나 메일로 전달하면 계약 만료 후 14일 이내에 이체돼요.",
    tip: "계약 만료 전에 미리 IRP를 개설해두면 지급 지연을 막을 수 있죠.",
    link: { label: "IRP 계좌 개설 방법", href: "/w/퇴직금-IRP-계좌" },
  },
  {
    title: "미지급 시 고용노동부 신고",
    desc: "14일이 지났는데도 퇴직금이 안 들어오면 고용노동부 민원마당(minwon.moel.go.kr)에서 임금체불 진정을 접수해요. 지연이자(연 20%)도 함께 청구할 수 있죠. 소멸시효는 퇴직일로부터 3년이에요.",
    tip: "온라인 접수로 빠르게 처리돼요. 보통 2~4주 내 근로감독관이 처리해요.",
    link: { label: "퇴직금 미지급 신고 방법", href: "/w/퇴직금-미지급-신고" },
  },
];

const CHECKLIST = [
  "계속근로 1년 체크: 입사일~종료일 정확히 계산 (갱신 합산)",
  "주 15시간 조건: 4주 평균 기준, 근로계약서에 명시된 소정근로시간 확인",
  "IRP 계좌: 퇴직금 300만원 초과 시 사전 개설 필수",
  "3개월 급여명세서 준비: 평균임금 산정 증빙",
  "소멸시효 3년: 계약 종료일로부터 3년 이내 청구",
];

const FAQS = [
  {
    q: "계약 갱신을 3번 했는데 근속기간이 전부 합산되나요?",
    a: "공백 없이 이어졌다면 합산돼요. 최초 입사일부터 최종 계약 종료일까지 전체 기간이 근속기간이에요. 갱신 횟수는 관계없죠.",
  },
  {
    q: "계약 사이에 2주 공백이 있었는데 계속근로로 인정되나요?",
    a: "법원은 실질을 봐요. 동일 업무·동일 장소에서 계속 일했다면 짧은 공백은 계속근로로 인정될 수 있죠. 반대로 명확히 고용관계가 끊겼다면 공백 전후를 별도로 산정해요.",
  },
  {
    q: "계약 종료 후 바로 재계약하면 퇴직금은 어떻게 되나요?",
    a: "공백 없이 재계약하면 계속근로로 볼 수 있죠. 다만 실질적인 근로 단절이 있었다고 회사가 입증하면 계약별로 퇴직금이 정산돼요. 재계약 시 퇴직금 중간정산 여부를 꼭 살펴봐요.",
  },
  {
    q: "4대보험에 미가입된 계약직인데 퇴직금을 받을 수 있나요?",
    a: "받을 수 있죠. 4대보험 가입 여부는 퇴직금 수령 조건과 무관해요. 실제 근무 사실이 증명되면 퇴직금 청구권이 생겨요. 문자, 카카오톡, 통장 입금 내역 모두 증거로 쓸 수 있죠.",
  },
  {
    q: "계약직 퇴직금 포기각서를 써줬는데 퇴직금을 못 받나요?",
    a: "받을 수 있죠. 퇴직금 포기각서는 법적 효력이 없어요. 근로자퇴직급여보장법에서 정한 권리는 계약이나 각서로 없애지 못해요. 서명했더라도 퇴직금 청구권은 그대로 유지돼요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 제4조: 퇴직급여 설정 의무 (계약직 포함)", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "근로기준법 제2조: 계속근로기간 정의", url: "https://www.law.go.kr/법령/근로기준법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부: 계약직 퇴직금 안내", url: "https://www.moel.go.kr" },
      { label: "고용노동부 민원마당: 임금체불 진정 접수", url: "https://minwon.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "계약직-퇴직금-지급규정", title: "계약직 퇴직금 지급 규정 상세", description: "갱신 합산·청구 절차·지연이자 청구 방법." },
  { slug: "퇴직금-계산-방법", title: "퇴직금 계산 방법", description: "평균임금 기준 정확한 계산 공식." },
  { slug: "퇴직금-지급-기한", title: "퇴직금 지급 기한 14일 원칙", description: "지연이자 청구 조건과 방법." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} highlightSlugs={퇴직금_HIGHLIGHT} currentSlug="계약직-퇴직금" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 계약직 · 수령 조건</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        계약직 퇴직금, 정규직이랑 똑같이 받나요?<br />
        발생 조건·계산법·수령 절차까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        계약직도 정규직과 동일하게 퇴직금을 받을 수 있죠.
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법 제4조</a>는 고용 형태를 구분하지 않아요.
        1년 이상 계속 근무하고 주 15시간 이상 일했다면 계약직도 퇴직금이 발생해요.
        "계약직은 퇴직금 없다"는 말은 틀렸죠.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>계약직 퇴직금, 발생 조건은 딱 두 가지예요</H2>
      <p style={body}>
        조건은 1년 이상 계속 근무, 그리고 4주 평균 주 소정 근로시간 15시간 이상이에요.
        이 두 가지를 충족하면 계약직도 퇴직금을 받을 수 있죠.
        계약서에 "퇴직금 없음"이라고 적혀 있어도 법정 의무는 계약 내용보다 우선해요.
      </p>
      <p style={body}>
        계약 갱신을 반복했더라도 공백 없이 같은 사업장에서 일했다면 최초 입사일부터 전체 기간이 합산돼요.
        1년 계산은 하루도 빠짐없이 365일 이상이어야 하고요.
        계약 만료로 퇴직한 경우도 퇴직금 발생 사유로 인정돼요.
      </p>

      <GreenBox>
        1. 1년 이상 계속 근무 — 갱신 반복 시 전체 합산<br />
        2. 4주 평균 주 15시간 이상 근무<br />
        3. 고용 형태·사업장 규모 무관, 소멸시효 3년
      </GreenBox>

      <SectionBadge>내 상황 체크해봐요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="계약직 퇴직금 발생 조건을 갖췄어요. 아래 계산기로 예상 금액을 살펴봐요."
        partialMatchText="조건 미충족 항목이 있죠. 1년 근속과 주 15시간은 필수예요."
      />

      <Divider />

      <H2>계약직 퇴직금 예상액, 직접 계산해봐요</H2>
      <p style={body}>
        퇴직금은 1일 평균임금 × 30일 × 근속연수로 계산해요.
        실제 퇴직금에는 기본급뿐 아니라 상여금도 포함되고요. 연간 상여금이 있다면 총액을 12로 나눠서 월 급여에 더하면 더 정확해요.
        계약 갱신이 있었다면 전체 근속 개월 수를 합산해서 입력해봐요.
      </p>

      <SectionBadge>계약직 퇴직금 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 월 급여 × 근속연수 기준 추정치예요. 상여금·연차수당 포함 시 실제 금액이 더 높아요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>퇴직금 청구에 필요한 서류</H2>
      <p style={body}>
        퇴직금 청구에 복잡한 서류는 필요 없죠.
        근로계약서와 급여명세서만 있으면 기본적으로 처리할 수 있죠.
        4대보험 미가입 계약직이라도 실제 근무 사실을 증명하면 퇴직금 청구가 가능하고요.
        문자, 카카오톡, 통장 입금 내역도 증거로 쓸 수 있죠.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>계약 종료 후 퇴직금 수령 절차</H2>
      <p style={body}>
        계약이 끝나면 회사는 14일 안에 퇴직금을 지급해야 해요.
        IRP 계좌 정보를 미리 알려주지 않으면 처리가 늦어질 수 있죠.
        아래 절차를 순서대로 따라가봐요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>계약직 퇴직금 수령 체크리스트</H2>
      <p style={body}>
        계약이 끝나기 전에 미리 준비해두면 퇴직금 수령이 훨씬 빠르고 매끄러워요.
        소멸시효 3년을 놓치지 않는 게 가장 중요하고요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        사업주가 계약 갱신 조건으로 퇴직금 포기각서를 요구해도 거부할 수 있죠.
        서명했더라도 근로자퇴직급여보장법에 따라 퇴직금 청구권은 그대로 유지돼요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        계약직 퇴직금에 대해 실제로 자주 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법과 근로기준법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부 고객상담센터(1350)에서 살펴봐요." />
    </ArticleLayout>
  );
}
