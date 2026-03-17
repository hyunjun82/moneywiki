"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "같은 사업장에서 1년 이상 계속 근무했어요" },
  { id: "c2", label: "4주 평균 주 15시간 이상 근무했어요" },
  { id: "c3", label: "퇴직금을 아직 받지 못했어요" },
  { id: "c4", label: "퇴직 후 3년이 아직 지나지 않았어요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "월 평균임금", min: 150, max: 800, step: 10, defaultValue: 300, format: (v: number) => `${v}만원` },
  { id: "years", label: "근속기간", min: 1, max: 35, step: 1, defaultValue: 5, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "예상 퇴직금",
    getValue: (v: Record<string, number>) => Math.round(v.salary * 10000 * v.years),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "1년당 기준",
    getValue: (v: Record<string, number>) => Math.round(v.salary * 10000),
    format: (v: number) => `${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "근로계약서", required: true, where: "인사팀 또는 입사 시 수령본" },
  { name: "급여명세서 (최근 3개월)", required: true, where: "회사 인사팀 요청" },
  { name: "4대보험 가입 이력 확인서", required: false, where: "고용24 또는 국민건강보험공단" },
  { name: "통장 입금 내역", required: false, where: "은행 앱 출력" },
];

const STEPS = [
  {
    title: "조건 확인",
    desc: "1년 이상 계속 근로 + 주 15시간 이상 근무, 두 조건이 모두 충족되면 퇴직금이 발생해요. 4대보험 가입 여부, 사업장 규모, 고용 형태는 관계없어요.",
    tip: "고용24에서 내 고용보험 이력으로 입사일 확인 가능",
  },
  {
    title: "퇴직금 계산",
    desc: "퇴직 전 3개월 평균임금 × 30일 × (근속일수 ÷ 365)예요. 상여금·연차수당도 포함해야 정확해요. 기본급만으로 계산하면 실제보다 낮게 나와요.",
    tip: "위 계산기로 대략적인 금액 확인 후 급여명세서로 검증",
  },
  {
    title: "퇴직금 지급 요청",
    desc: "퇴직 후 14일 이내에 지급해야 해요. 자동으로 안 들어오면 회사에 지급 요청을 해야 해요. 문자·메일로 요청하면 증거가 남아 유리해요.",
    tip: "IRP 계좌 미리 개설해두면 이체가 빨라요",
  },
  {
    title: "미지급 시 신고",
    desc: "14일이 지났는데 안 주면 연 20% 지연이자가 붙어요. 내용증명 발송 → 고용노동부 진정 접수 순서로 대응하면 대부분 해결돼요.",
    tip: "소멸시효 3년: 퇴직 후 3년 내에 반드시 청구해야 해요",
  },
];

const CHECKLIST = [
  "입사일·퇴직일 정확히 확인: 1년 조건 충족 여부",
  "주 근무시간: 4주 평균 15시간 이상 증빙",
  "3개월 급여명세서: 평균임금 산정용",
  "IRP 계좌 개설: 300만원 초과 시 의무이체",
  "소멸시효 3년: 퇴직일 기준 3년 내 청구",
];

const FAQS = [
  {
    q: "계약직도 퇴직금을 받을 수 있나요?",
    a: "받을 수 있어요. 계약직, 알바, 파트타임 모두 1년 이상·주 15시간 이상 조건만 충족하면 동일하게 적용돼요.",
  },
  {
    q: "1년 미만이면 퇴직금이 전혀 없나요?",
    a: "맞아요. 11개월 29일이면 한 푼도 없어요. 1년을 채워야 1개월치가 기준이 되죠.",
  },
  {
    q: "5인 미만 사업장도 퇴직금이 있나요?",
    a: "있어요. 2010년부터 5인 미만 사업장에도 퇴직금 지급 의무가 적용됐어요. 1인 사업장도 예외 없어요.",
  },
  {
    q: "주 14시간 일하면 퇴직금이 없나요?",
    a: "맞아요. 주 15시간 미만이면 초단시간 근로자로 분류돼서 퇴직금이 적용되지 않아요. 4주 평균으로 계산하니 변동이 있어도 평균이 15시간 이상이면 돼요.",
  },
  {
    q: "육아휴직 기간도 근속연수에 포함되나요?",
    a: "포함돼요. 육아휴직은 법적 권리로 근속 기간이 계속 유지되기 때문에 퇴직금 계산 시 포함돼요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법: 퇴직급여제도 설정 의무", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "근로기준법 제2조: 근로자 정의", url: "https://www.law.go.kr/법령/근로기준법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부: 퇴직금 제도 안내", url: "https://www.moel.go.kr" },
      { label: "고용24: 고용보험 이력 조회", url: "https://www.ei.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-계산법",
    title: "퇴직금 계산법, 얼마나 받을 수 있을까?",
    description: "평균임금 공식부터 상여금 포함 계산까지 정리했어요.",
  },
  {
    slug: "퇴직금-1년미만",
    title: "퇴직금 1년 미만, 예외 케이스는?",
    description: "1년 미만 근무 시 퇴직금이 발생하는 예외 상황이에요.",
  },
  {
    slug: "퇴직금-미지급-신고",
    title: "퇴직금 미지급 신고 방법",
    description: "회사가 안 줄 때 신고 절차와 지연이자 청구법이에요.",
  },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-조건" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 조건 · 자격</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금, 나는 받을 수 있을까?<br />
        1년·주 15시간 조건 완전 정리
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금 조건이 헷갈리죠? 핵심은 단 두 가지예요.
        1년 이상 계속 근무와 주 15시간 이상 근무.
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법</a>은 정규직·계약직·알바 구분 없이 동일하게 적용해요.
        조건 체크부터 <a href="/w/퇴직금-계산법" style={{ color: "#1D9E75", textDecoration: "underline" }}>내 금액 계산</a>, 수령 절차까지 한 번에 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>퇴직금, 내가 받을 수 있나요?</H2>
      <p style={body}>
        퇴직금 조건은 의외로 단순해요. 고용 형태, 사업장 규모, 4대보험 가입 여부는 관계없어요.
        단 두 가지, 1년 이상 계속 근로와 주 15시간 이상 근무만 충족하면 받을 수 있죠.
      </p>
      <p style={body}>
        주의할 점은 "계속 근로"예요. 중간에 계약이 갱신되더라도 실질적으로 같은 사업장에서 이어졌다면 합산돼요.
        반면 계약 사이에 공백이 크거나 다른 업무로 전환됐다면 끊길 수 있어요.
      </p>

      <GreenBox title="퇴직금 발생 조건 2가지">
        조건 1: 같은 사업장에서 1년 이상 계속 근로<br />
        조건 2: 4주 평균 주 15시간 이상 근무<br />
        고용형태·사업장 규모·4대보험 가입 여부 무관
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="퇴직금 조건을 갖췄어요. 아래 계산기로 예상 금액을 확인해보세요."
        partialMatchText="조건 일부가 맞지 않아요. 고용노동부(1350)에 상담해보세요."
      />

      <Divider />

      <H2>조건 충족 시 얼마나 받을 수 있을까?</H2>
      <p style={body}>
        퇴직금은 1년 근무할 때마다 월급 1개월치가 쌓이는 구조예요.
        월급 300만원으로 5년 근무하면 1,500만원이 기준이 돼요.
        상여금·연차수당을 포함하면 실제로 더 높게 나와요.
      </p>
      <p style={body}>
        아래 계산기에서 월 평균임금과 근속기간을 입력하면 예상 퇴직금이 바로 나와요.
        회사 정산서와 비교해보면 오류를 잡아낼 수 있어요.
      </p>

      <SectionBadge>퇴직금 예상 금액 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 월 평균임금 기준 추정치. 상여금·연차수당 포함 시 실제 금액이 더 높아요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>조건 확인에 필요한 서류</H2>
      <p style={body}>
        내 퇴직금 조건을 입증하려면 근무 기간과 근무 시간 두 가지를 증명해야 해요.
        아래 서류 중 가능한 것부터 미리 챙겨두세요.
      </p>
      <p style={body}>
        근로계약서가 없어도 포기하지 않아도 돼요. 통장 입금 내역이나 4대보험 가입 이력으로도
        근무 사실을 증명할 수 있어요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>퇴직금 조건 확인부터 수령 절차까지</H2>
      <p style={body}>
        조건이 충족됐다면 퇴직 후 자동으로 주는 게 아니에요.
        회사에 요청하고, 14일 내에 안 주면 신고까지 이어지는 단계를 알아두세요.
      </p>
      <p style={body}>
        부당하게 안 준다면 고용노동부 진정으로 대부분 해결돼요.
        소멸시효 3년을 넘기기 전에 반드시 행동해야 한다는 점만 기억하세요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>수령 전 꼭 확인할 체크리스트</H2>
      <p style={body}>
        날짜 하루 차이로 조건이 달라질 수 있어요. 특히 입사일과 퇴직일은
        회사 기록과 본인 기록이 다른 경우가 종종 있으니 꼼꼼하게 확인해보세요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="퇴직금 못 받았을 때 대응 순서">
        1단계: 인사팀에 서면 지급 요청 (문자·메일로 기록 남기기)<br />
        2단계: 14일 초과 시 내용증명 발송 (연 20% 지연이자 발생)<br />
        3단계: 고용노동부 민원마당에서 온라인 진정 접수
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 조건에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
