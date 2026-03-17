"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "같은 사업장에서 1년 이상 일했어요" },
  { id: "c2", label: "4주 평균 주 15시간 이상 근무했어요" },
  { id: "c3", label: "고용주(사업주)가 동일했어요" },
  { id: "c4", label: "임금을 규칙적으로 받았어요" },
];

const CALC_SLIDERS = [
  { id: "daily", label: "일당", min: 8, max: 20, step: 1, defaultValue: 12, format: (v: number) => `${v}만원` },
  { id: "workdays", label: "주 근무일수", min: 3, max: 6, step: 1, defaultValue: 5, format: (v: number) => `${v}일` },
  { id: "months", label: "근무 기간", min: 12, max: 60, step: 1, defaultValue: 24, format: (v: number) => `${v}개월` },
];

const CALC_RESULTS = [
  {
    label: "월급 환산 (일당×근무일수×4.33)",
    getValue: (v: Record<string, number>) => Math.round(v.daily * 10000 * v.workdays * 4.33),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원/월`,
    highlight: true,
  },
  {
    label: "예상 퇴직금 (월급환산×근속연수, 주15시간 이상 시)",
    getValue: (v: Record<string, number>) => {
      const monthly = Math.round(v.daily * 10000 * v.workdays * 4.33);
      return Math.round(monthly * (v.months / 12));
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "근무일 기록", required: true, where: "직접 메모 또는 캡처" },
  { name: "급여 입금 통장 내역", required: true, where: "은행 앱 출력" },
  { name: "고용주와의 대화 기록", required: false, where: "카카오톡·문자 캡처" },
  { name: "4대보험 가입이력", required: false, where: "고용24 무료 조회" },
];

const STEPS = [
  {
    title: "주 15시간 기준 확인",
    desc: "4주 평균 주 15시간 이상인지 계산해요. 하루 3시간씩 주 5일이면 딱 15시간이에요. 일당제로 일했어도 실제 근무 시간이 기준이에요. 근무일수와 하루 근무 시간을 곱해서 계산하면 돼요.",
    tip: "일용직은 증빙이 없으면 인정 받기 어려워요",
  },
  {
    title: "근무 사실 증빙 준비",
    desc: "통장 입금 내역, 근무일 기록, 카카오톡 대화가 증거가 돼요. 고용주에게 '며칠 일했다'는 내용이 담긴 문자나 메시지도 충분한 자료가 돼요. 지금이라도 스크린샷으로 보관해두세요.",
    tip: "지금이라도 스크린샷 보관하세요",
  },
  {
    title: "퇴직금 계산 및 지급 요청",
    desc: "1일 평균임금 × 30 × 근속연수로 금액을 계산해요. 고용주에게 서면으로 요청하는 게 중요해요. 구두 요청은 나중에 다툼이 생겼을 때 입증이 어려워요.",
    tip: "문자나 메시지로 요청하면 증거가 돼요",
  },
  {
    title: "노동청 진정",
    desc: "고용주가 거부하면 고용노동부 민원마당에서 임금체불 진정을 접수해요. 온라인으로도 신청할 수 있고, 근로감독관이 조사 후 시정 명령을 내려줘요.",
    tip: "minwon.moel.go.kr 온라인 접수, 무료",
  },
];

const CHECKLIST = [
  "주 15시간 기준 충족 여부 계산",
  "통장 입금 내역 보관: 급여 증빙",
  "근무일 기록: 문자·카카오톡 등",
  "1년 근속 계산: 동일 사업장 기준",
  "소멸시효: 퇴직 후 3년 내 청구",
];

const FAQS = [
  {
    q: "일용직이라도 퇴직금을 받을 수 있나요?",
    a: "받을 수 있어요. 일용직이라도 계속근로 1년 이상 + 주 15시간 이상이면 퇴직금 대상이에요. 고용 형태가 아니라 실질 근무 내용이 기준이에요.",
  },
  {
    q: "현장마다 다른 일용직은 어떻게 하나요?",
    a: "다른 사업장이면 합산이 안 돼요. 같은 고용주(사업장)에서 1년 이상 일한 경우에만 해당해요.",
  },
  {
    q: "4대보험에 안 들어있으면 퇴직금이 없나요?",
    a: "아니에요. 4대보험 미가입이어도 실제 근무 사실이 증명되면 퇴직금을 받을 수 있어요. 통장 내역이 핵심이에요.",
  },
  {
    q: "고용주가 개인이면 어떻게 되나요?",
    a: "개인 고용주도 동일하게 적용돼요. 사업자등록 여부와 관계없이 실질 고용관계가 있으면 퇴직금이 발생해요.",
  },
  {
    q: "일용직 퇴직금을 받으려면 어디에 신청하나요?",
    a: "먼저 고용주에게 서면 요청하고, 거부 시 고용노동부 민원마당에서 임금체불 진정을 접수해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제2조: 근로자 정의", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로자퇴직급여보장법 제4조", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 민원마당", url: "https://minwon.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-조건",
    title: "퇴직금 받을 수 있는 조건",
    description: "1년·주 15시간 조건 완전 정리",
  },
  {
    slug: "알바-퇴직금",
    title: "알바 퇴직금 받는 방법",
    description: "주 15시간 조건부터 청구까지",
  },
  {
    slug: "퇴직금-지급-기준",
    title: "퇴직금 지급 기준",
    description: "5인 미만 사업장도 해당돼요",
  },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="일용직-퇴직금" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 일용직 · 수령조건</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        일용직 퇴직금, 받을 수 있는 조건이 있나요?<br />
        주 15시간·1년 기준부터 청구 방법까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        일당으로 급여를 받는 일용직이라도 퇴직금을 받을 수 있어요.
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여 보장법</a>은 일용직이라고 예외를 두지 않아요.
        핵심은 같은 사업주 아래서 1년 이상, 주 15시간 이상 일했느냐예요.
        건설 일용직이라면 <a href="/w/건설근로자-퇴직금" style={{ color: "#1D9E75", textDecoration: "underline" }}>건설근로자공제회 퇴직공제금</a>도 별도로 받을 수 있죠.
        조건 체크부터 증빙 준비, 신고 방법까지 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>일용직도 퇴직금을 받을 수 있는 조건</H2>
      <p style={body}>
        조건은 두 가지예요. 같은 사업주 아래서 1년 이상 계속 근로하고, 4주 평균 주 15시간 이상 일하면 퇴직금이 발생해요.
        매일 출근하지 않아도 같은 고용주에게 반복적으로 불려서 일했다면 계속 근로로 인정될 가능성이 높아요.
      </p>
      <p style={body}>
        일용직의 특성상 증빙이 부족한 경우가 많아요. 통장 입금 내역, 카카오톡 대화, 출퇴근 사진만 있어도 진정 접수가 가능해요.
        4대보험 미가입이어도 실제 근무 사실만 증명하면 퇴직금을 청구할 수 있어요.
      </p>

      <GreenBox title="일용직 퇴직금 핵심 조건">
        1년 이상 같은 사업주 아래 계속 근로<br />
        4주 평균 주 15시간 이상 근무<br />
        4대보험 미가입이어도 근무 사실 증빙으로 청구 가능
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="퇴직금을 받을 수 있는 조건을 갖췄어요. 아래 계산기로 예상 금액을 확인해보세요."
        partialMatchText="조건 일부가 맞지 않아요. 고용노동부(1350)에 전화 상담부터 받아보세요."
      />

      <Divider />

      <H2>내 일용직 퇴직금, 얼마나 나올까?</H2>
      <p style={body}>
        일용직은 일당 × 주 근무일수 × 4.33으로 월급을 먼저 환산해요.
        그 월급에 근속연수를 곱하면 대략적인 퇴직금이 나오죠.
        아래에서 일당, 주 근무일수, 기간을 조절해보세요.
      </p>
      <p style={body}>
        주 15시간 이상이고 1년 이상 근무한 경우에만 해당돼요.
        주 15시간 미만이면 퇴직금이 발생하지 않아요.
      </p>

      <SectionBadge>일용직 퇴직금 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 주 15시간 이상 + 1년 이상 계속 근무 시에만 해당돼요. 증빙이 핵심이에요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>신고에 필요한 서류 목록</H2>
      <p style={body}>
        일용직은 계약서가 없는 경우가 많아요. 그래도 실제 근무를 입증할 수 있는 자료라면 무엇이든 증거가 돼요.
        아래 서류 중 있는 것부터 모아두세요.
      </p>

      <SectionBadge>준비 서류</SectionBadge>
      <DocTable docs={DOCS} />

      <BorderBox title="계약서·4대보험이 없어도 신고 가능해요">
        통장 입금 내역, 고용주와의 카카오톡·문자, 동료 근로자 증언만 있어도 진정 접수가 가능해요.
        4대보험 가입이력은 <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 무료로 조회할 수 있어요.
      </BorderBox>

      <Divider />

      <H2>퇴직금 청구 절차</H2>
      <p style={body}>
        고용주가 "일용직은 퇴직금 없다"고 해도 법적 근거가 없어요.
        단계별로 대응하면 대부분 3단계(노동청 신고) 이전에 해결돼요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>신고 전 준비 체크리스트</H2>
      <p style={body}>
        현장을 이미 떠난 뒤에는 증빙 자료를 구하기 어려울 수 있어요.
        일하는 동안 미리 챙겨두면 신고 처리가 훨씬 빠르게 진행돼요.
      </p>

      <SectionBadge>준비 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        일용직 퇴직금에 대해 자주 나오는 질문이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법과 근로자퇴직급여 보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인해보세요." />
    </ArticleLayout>
  );
}
