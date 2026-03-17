"use client";
import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "같은 사업장에서 1년 이상 계속 근무했어요" },
  { id: "c2", label: "4주 평균 주 15시간 이상 일했어요" },
  { id: "c3", label: "계약 종료 후 아직 3년이 지나지 않았어요" },
  { id: "c4", label: "퇴직금을 아직 받지 못했어요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "월 급여", min: 150, max: 500, step: 10, defaultValue: 250, format: (v: number) => `${v}만원` },
  { id: "months", label: "계약 기간", min: 12, max: 60, step: 1, defaultValue: 24, format: (v: number) => `${v}개월` },
];

const CALC_RESULTS = [
  {
    label: "예상 퇴직금",
    getValue: (v: Record<string, number>) => Math.round(v.salary * 10000 * (v.months / 12)),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "1년당 기준 (1개월치)",
    getValue: (v: Record<string, number>) => v.salary * 10000,
    format: (v: number) => `${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "근로계약서", required: true, where: "인사팀 또는 입사 시 수령본" },
  { name: "급여명세서 (최근 3개월)", required: true, where: "회사 인사팀 요청" },
  { name: "4대보험 가입 이력", required: false, where: "고용24 무료 조회" },
  { name: "IRP 계좌번호 (300만원 초과 시)", required: true, where: "은행·증권사 개설" },
];

const STEPS = [
  {
    title: "1년 충족 여부 확인",
    desc: "입사일부터 계약 종료일까지 정확히 계산해요. 하루라도 짧으면 법적으로 퇴직금이 발생하지 않아요. 계약을 반복 갱신했다면 공백 없이 이어진 전체 기간을 합산해요.",
    tip: "고용24(ei.go.kr)에서 고용보험 가입 이력으로 입사일 확인 가능해요",
  },
  {
    title: "퇴직금 계산",
    desc: "1일 평균임금 × 30일 × 근속연수로 계산해요. 기본급만이 아니라 상여금도 포함돼요. 연간 상여금이 있다면 총액 ÷ 12로 환산해서 월 급여에 더하세요.",
    tip: "상여금 환산: 연간 총액 ÷ 12 = 월 환산액",
  },
  {
    title: "IRP 계좌 개설 및 지급 요청",
    desc: "퇴직금이 300만원을 초과하면 IRP 계좌로만 받아야 해요. 은행이나 증권사 앱에서 10분이면 개설 가능해요. 계좌번호를 인사팀에 문자나 메일로 알려주면 14일 이내에 이체돼요.",
    tip: "300만원 이하면 일반 통장으로도 받을 수 있어요",
  },
  {
    title: "미지급 시 고용노동부 신고",
    desc: "14일이 지났는데도 퇴직금이 안 들어오면 고용노동부 민원마당에서 임금체불 진정을 접수해요. 근로감독관이 조사 후 지급 명령을 내려요. 보통 2~4주 내에 처리돼요.",
    tip: "minwon.moel.go.kr 온라인 접수 가능, 소멸시효 3년",
  },
];

const CHECKLIST = [
  "1년 근속: 입사일~종료일 정확히 계산 (갱신 반복 시 합산)",
  "주 15시간: 4주 평균 주 15시간 이상 증빙 보관",
  "IRP 계좌: 300만원 초과 시 사전 개설 필수",
  "3개월 급여명세서: 평균임금 산정 증빙",
  "소멸시효 3년: 퇴직일로부터 3년 내 청구 필수",
];

const FAQS = [
  {
    q: "계약직도 정규직과 동일한 퇴직금을 받나요?",
    a: "맞아요. 계약직, 정규직, 알바 구분 없이 1년 이상 + 주 15시간 이상이면 동일하게 적용돼요. 회사가 '계약직은 해당 없다'고 해도 틀린 말이에요.",
  },
  {
    q: "계약을 반복 갱신했으면 근속기간이 합산되나요?",
    a: "합산돼요. 같은 사업장에서 공백 없이 계속 근무했다면 갱신 횟수와 관계없이 전체 기간이 근속기간이에요.",
  },
  {
    q: "계약 종료 전에 퇴직금을 미리 받을 수 있나요?",
    a: "중간정산은 법정 사유(주택 구입 등)가 있어야 가능해요. 이유 없이 미리 지급하는 건 원칙적으로 안 돼요.",
  },
  {
    q: "계약 종료 후 바로 재계약하면 퇴직금은 어떻게 되나요?",
    a: "공백 없이 재계약하면 계속근로로 볼 수 있어요. 다만 실질적인 근로 단절이 있으면 계약별로 퇴직금이 정산돼요.",
  },
  {
    q: "4대보험 미가입 계약직인데 퇴직금을 받을 수 있나요?",
    a: "받을 수 있어요. 4대보험 가입 여부는 퇴직금 수령 조건과 무관해요. 실제 근무 사실이 증명되면 돼요.",
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
    ],
  },
];

const RELATED = [
  { slug: "계약직-퇴직금-지급규정", title: "계약직 퇴직금 지급 규정", description: "갱신·중단 시 퇴직금 처리 방법을 설명해요." },
  { slug: "퇴직금-조건", title: "퇴직금 받는 조건", description: "1년·주 15시간 조건과 예외를 정리했어요." },
  { slug: "퇴직금-계산법", title: "퇴직금 계산법", description: "평균임금 기준 정확한 계산 방법을 안내해요." },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="계약직-퇴직금" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 계약직 · 수령조건</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        계약직 퇴직금, 정규직이랑 똑같이 받을 수 있나요?<br />
        조건부터 계산법, 수령 절차까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        계약직도 퇴직금을 받을 수 있어요. 정규직이랑 완전히 동일한 조건이에요.
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법 제4조</a>는
        고용 형태를 구분하지 않아요. 1년 이상 근무하고 주 15시간 이상 일했다면 계약직도 퇴직금이 발생해요.
        회사에서 '계약직은 해당 없다'고 해도 틀린 말이에요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>계약직 퇴직금, 이 두 가지만 맞으면 돼요</H2>
      <p style={body}>
        조건은 딱 두 개예요. 1년 이상 근속, 그리고 4주 평균 주 15시간 이상 근무예요.
        이걸 모두 충족하면 계약직도 퇴직금을 받을 수 있어요.
        계약 갱신을 반복했더라도 공백 없이 같은 사업장에서 일한 기간은 전부 합산돼요.
      </p>
      <p style={body}>
        1년 계산은 생각보다 엄격해요. 입사일 기준 정확히 365일 이상이어야 해요.
        계약 종료일이 하루라도 모자라면 퇴직금이 발생하지 않아요.
        주 15시간 조건도 중요한데, 4주 평균으로 계산해요.
      </p>

      <GreenBox title="계약직 퇴직금 핵심 조건">
        1년 이상 계속 근무 (갱신 반복 시 합산)<br />
        4주 평균 주 15시간 이상 근무<br />
        고용 형태·사업장 규모 무관, 소멸시효 3년
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="퇴직금 수령 조건을 갖췄어요. 아래 계산기로 예상 금액을 확인해보세요."
        partialMatchText="조건 미충족 항목이 있어요. 1년 근속과 주 15시간은 필수예요."
      />

      <Divider />

      <H2>예상 퇴직금, 직접 계산해보세요</H2>
      <p style={body}>
        퇴직금은 1일 평균임금 × 30일 × 근속연수로 계산해요.
        실제 퇴직금에는 상여금과 연차수당도 포함돼요. 연간 상여금이 있다면 총액을 12로 나눠서 월 급여에 더하면 더 정확해요.
        아래 계산기는 월 급여 기준 추정치예요.
      </p>

      <SectionBadge>계약직 퇴직금 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 월 급여 × 근속연수 기준 추정치. 상여금·연차수당 포함 시 실제 금액이 더 높아요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>퇴직금 청구에 필요한 서류</H2>
      <p style={body}>
        퇴직금 청구에 복잡한 서류는 필요 없어요. 근로계약서와 급여명세서만 있으면 기본적으로 처리할 수 있어요.
        4대보험 미가입 계약직이라도 실제 근무 사실이 증명되면 퇴직금 청구는 가능해요.
        문자, 카카오톡, 통장 입금 내역도 증거가 돼요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>계약 종료 후 퇴직금 받는 순서 4단계</H2>
      <p style={body}>
        계약이 끝나면 회사는 14일 안에 퇴직금을 지급해야 해요.
        IRP 계좌 정보를 미리 알려주지 않으면 처리가 늦어질 수 있어요.
        단계별로 순서대로 따라가면 돼요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>퇴직금 수령 체크리스트</H2>
      <p style={body}>
        계약이 끝나기 전에 미리 준비해두면 퇴직금 수령이 훨씬 빠르고 매끄러워져요.
        소멸시효 3년을 놓치지 않는 게 가장 중요해요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="계약직 퇴직금 포기각서는 무효예요">
        사업주가 계약 갱신 조건으로 퇴직금 포기각서를 요구해도 거부할 수 있어요.<br />
        서명했더라도 근로자퇴직급여보장법에 따라 퇴직금 청구권은 그대로 유지돼요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        계약직 퇴직금에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법과 근로기준법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
