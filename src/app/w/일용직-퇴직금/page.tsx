"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR, 퇴직금_HIGHLIGHT } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "같은 사업주(고용주) 아래서 1년 이상 일했어요" },
  { id: "c2", label: "4주 평균 주 15시간 이상 근무했어요" },
  { id: "c3", label: "퇴직한 지 3년이 지나지 않았어요" },
  { id: "c4", label: "근무 사실을 입증할 통장 내역 또는 연락 기록이 있어요" },
];

const CALC_SLIDERS = [
  { id: "daily", label: "일당", min: 8, max: 30, step: 1, defaultValue: 15, format: (v: number) => `${v}만원` },
  { id: "workdays", label: "주 근무일수", min: 3, max: 6, step: 1, defaultValue: 5, format: (v: number) => `주 ${v}일` },
  { id: "months", label: "근무 기간", min: 12, max: 84, step: 1, defaultValue: 24, format: (v: number) => `${v}개월` },
];

const CALC_RESULTS = [
  {
    label: "월급 환산 (일당 × 주근무일수 × 4.33)",
    getValue: (v: Record<string, number>) => Math.round(v.daily * 10000 * v.workdays * 4.33),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원/월`,
    highlight: true,
  },
  {
    label: "예상 퇴직금 (월급환산 × 근속연수)",
    getValue: (v: Record<string, number>) => {
      const monthly = Math.round(v.daily * 10000 * v.workdays * 4.33);
      return Math.round(monthly * (v.months / 12));
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "급여 입금 통장 내역", required: true, where: "은행 앱·창구 출력" },
  { name: "고용주와의 대화 기록 (카카오톡·문자)", required: true, where: "스마트폰 캡처" },
  { name: "근무일 기록 (메모·수첩·캘린더)", required: false, where: "직접 정리" },
  { name: "4대보험 가입이력 확인서", required: false, where: "고용24(www.ei.go.kr) 무료 조회" },
  { name: "근로계약서 (있는 경우)", required: false, where: "입사 시 수령본" },
];

const STEPS = [
  {
    title: "주 15시간·1년 기준 충족 여부 계산",
    desc: "하루 근무 시간 × 주 근무일수로 '주 15시간'을 맞추는지 먼저 따져요. 하루 3시간씩 주 5일이면 딱 15시간이에요. 1년 이상은 동일 사업주 아래 연속 근로가 원칙인데, 잠깐 쉬었다 재고용됐어도 실질 관계가 유지됐다면 계속 근로로 볼 수 있어요.",
    tip: "4주 평균이 기준이에요. 어떤 주는 20시간, 다른 주는 10시간이어도 평균 15시간 이상이면 조건을 충족해요",
  },
  {
    title: "근무 사실 증빙 수집",
    desc: "통장 입금 내역이 가장 강한 증거예요. 입금 메모에 '일당', 'OO현장' 등이 있으면 더 좋아요. 카카오톡·문자에서 근무 지시나 출근 확인 메시지도 증거가 돼요. 지금이라도 스크린샷을 저장해두세요.",
    tip: "계약서나 4대보험이 없어도 돼요. 실제 근무 사실 입증이 핵심이에요",
  },
  {
    title: "퇴직금 계산 후 서면 청구",
    desc: "일당 × 주 근무일수 × 4.33으로 월급을 환산하고, 월급 × 근속연수로 퇴직금을 계산해요. 문자·카카오톡으로 고용주에게 '퇴직금 지급을 요청한다'는 내용을 보내두면 증거가 생겨요. 거부하거나 무시하면 다음 단계로 넘어가요.",
    tip: "서면(문자, 이메일, 우편) 요청은 나중에 분쟁 시 중요한 증거가 돼요",
  },
  {
    title: "고용노동부 민원마당 임금체불 진정",
    desc: "고용주가 거부하면 고용노동부 민원마당(minwon.moel.go.kr)에서 온라인으로 진정을 접수해요. 비용은 무료예요. 진정 접수 후 근로감독관이 사실 조사를 하고 시정 명령을 내려줘요. 3개월 이내 처리가 원칙이에요.",
    tip: "온라인 접수 후 '접수 완료' 문자가 와요. 사건번호를 보관해두세요",
    link: { label: "민원마당 임금체불 진정 접수", href: "https://minwon.moel.go.kr" },
  },
];

const CHECKLIST = [
  "주 15시간 기준: 하루 근무시간 × 일수로 4주 평균 계산",
  "1년 근속: 동일 사업주 기준, 퇴직 후 3년 내 청구",
  "통장 내역 출력: 급여 입금일·금액 확인",
  "카카오톡·문자 캡처: 근무 지시·확인 메시지 저장",
  "퇴직금 금액 계산: 월급환산 × 근속연수 (위 계산기 활용)",
  "서면 청구 먼저: 거부 시 노동청 진정으로 넘어가세요",
];

const FAQS = [
  {
    q: "일용직이라도 퇴직금을 받을 수 있나요?",
    a: "받을 수 있어요. 일당제·일용직이라는 고용 형태는 퇴직금 기준과 무관해요. 같은 사업주 아래서 1년 이상, 주 15시간 이상이라는 두 조건만 충족하면 일반 근로자와 동일하게 퇴직금이 발생해요.",
  },
  {
    q: "여러 현장을 옮겨 다니면 합산이 되나요?",
    a: "같은 고용주(사업장)에서 일한 기간만 합산돼요. 고용주가 다르면 각 사업장별로 1년 기준을 따져야 해요. 건설 일용직이라면 건설근로자공제회 퇴직공제금도 별도로 받을 수 있어요.",
  },
  {
    q: "4대보험에 가입 안 됐으면 퇴직금이 없나요?",
    a: "아니에요. 4대보험 미가입 여부는 퇴직금 발생과 무관해요. 실제 근무 사실을 입증할 수 있으면 청구가 가능해요. 통장 입금 내역이나 문자 기록이 핵심이에요.",
  },
  {
    q: "고용주가 개인(무사업자)이어도 퇴직금이 생기나요?",
    a: "생겨요. 사업자등록 여부와 관계없이 실질 고용관계가 있으면 근로기준법과 근로자퇴직급여 보장법이 그대로 적용돼요.",
  },
  {
    q: "주 15시간을 맞춰야 하는 기준이 뭔가요?",
    a: "4주 평균이에요. 어떤 주는 20시간을 일하고 다른 주는 10시간을 일해도, 4주 평균이 15시간 이상이면 조건을 충족해요. 시간제·일당제 모두 실제 근무 시간으로 계산해요.",
  },
  {
    q: "퇴직금 청구 기한이 있나요?",
    a: "소멸시효 3년이에요. 퇴직한 날로부터 3년 안에 청구해야 해요. 3년이 지나면 법적으로 청구 권리가 소멸돼요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여 보장법 제4조: 퇴직금 제도 설정 의무", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "근로기준법 제2조: 근로자 정의", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로기준법 제36조: 금품 청산 (퇴직 후 14일 이내)", url: "https://www.law.go.kr/법령/근로기준법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 민원마당: 임금체불 진정 접수", url: "https://minwon.moel.go.kr" },
      { label: "고용24: 4대보험 가입이력 조회", url: "https://www.ei.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "일용직-퇴직금-지급기준", title: "일용직 퇴직금 지급 기준", description: "계속 근로 인정 조건과 주 15시간 계산법." },
  { slug: "퇴직금-조건", title: "퇴직금 받을 수 있는 조건", description: "1년·주 15시간 조건 적용 사례 정리." },
  { slug: "퇴직금-계산-방법", title: "퇴직금 계산 방법", description: "평균임금·통상임금 기준 계산 공식." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} highlightSlugs={퇴직금_HIGHLIGHT} currentSlug="일용직-퇴직금" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 일용직 · 청구 방법</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        일용직도 퇴직금을 받을 수 있나요?<br />
        주 15시간·1년 기준부터 청구 방법까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        일당으로 급여를 받는 일용직이라도 퇴직금을 받을 수 있어요.{" "}
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여 보장법</a>은
        일용직이라는 이유로 예외를 두지 않아요.
        핵심 조건은 같은 사업주 아래서 1년 이상, 4주 평균 주 15시간 이상이에요.
        계약서나 4대보험이 없어도 통장 내역만 있으면 청구할 수 있어요.
        건설 일용직이라면 <a href="/w/건설근로자-퇴직금" style={{ color: "#1D9E75", textDecoration: "underline" }}>건설근로자공제회 퇴직공제금</a>도
        별도로 받을 수 있죠.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>일용직 퇴직금 받을 수 있는 조건</H2>
      <p style={body}>
        조건은 딱 두 가지예요. 같은 사업주 아래서 1년 이상 계속 근로하고, 4주 평균 주 15시간 이상 일하면 퇴직금이 발생해요.
        매일 출근하지 않더라도, 같은 고용주에게 반복적으로 불려 일했다면 계속 근로로 인정될 가능성이 높아요.
      </p>
      <p style={body}>
        일용직은 증빙 자료가 부족한 경우가 많아요. 그래도 통장 입금 내역, 카카오톡 대화, 출퇴근 사진 중 하나만 있어도 진정 접수가 가능해요.
        4대보험 미가입이어도 실제 근무 사실을 입증하면 퇴직금을 청구할 수 있어요.
      </p>

      <GreenBox>
        같은 사업주 아래 1년 이상 계속 근로<br />
        4주 평균 주 15시간 이상 근무<br />
        계약서·4대보험 없어도 실제 근무 사실로 청구 가능
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="퇴직금 청구 조건을 갖추고 있어요. 아래 계산기로 예상 금액을 확인해보세요."
        partialMatchText="조건이 일부 맞지 않을 수 있어요. 고용노동부(1350)에 먼저 전화 상담을 받아보세요."
      />

      <Divider />

      <H2>일당 기준 퇴직금 계산</H2>
      <p style={body}>
        일용직은 일당에 주 근무일수와 4.33(월 평균 주수)을 곱해서 월급을 먼저 환산해요.
        그 월급에 근속연수를 곱하면 퇴직금이 나오죠.
        주 15시간 이상 + 1년 이상 조건을 충족한 경우에만 해당해요.
      </p>
      <p style={body}>
        아래에서 일당, 주 근무일수, 근무 기간을 조절해 예상 금액을 확인해보세요.
        주 15시간 미만이면 퇴직금이 발생하지 않아요.
      </p>

      <SectionBadge>일용직 퇴직금 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 주 15시간 이상 + 1년 이상 계속 근무 시에만 해당돼요. 실제 퇴직금은 3개월 평균임금 기준으로 재산정될 수 있어요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>청구에 필요한 서류 목록</H2>
      <p style={body}>
        일용직은 계약서가 없는 경우가 대부분이에요. 그래도 실제 근무를 입증할 수 있는 자료라면 무엇이든 증거가 돼요.
        있는 것부터 모아두고, 없는 서류는 없어도 청구할 수 있어요.
      </p>
      <p style={body}>
        통장 입금 내역 하나만 있어도 진정 접수는 가능해요.
        4대보험 가입이력은 <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 무료로 조회할 수 있어요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <BorderBox>
        통장 입금 내역, 카카오톡·문자 대화, 동료 근로자 증언만 있어도 진정 접수가 가능해요.
        법원·노동청 모두 실질적인 근무 관계를 중심으로 판단해요.
      </BorderBox>

      <Divider />

      <H2>퇴직금 청구 절차 4단계</H2>
      <p style={body}>
        고용주가 "일용직은 퇴직금 없다"고 해도 법적 근거가 없어요.
        아래 절차대로 단계별로 대응하면 대부분 3단계(노동청 신고) 이전에 해결돼요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>신고 전 준비 체크리스트</H2>
      <p style={body}>
        현장을 떠난 뒤에는 증빙 자료를 구하기 어려울 수 있어요.
        지금 당장 챙겨두면 나중에 분쟁이 생겼을 때 훨씬 빠르게 해결돼요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        1년 기준을 충족해도 주 15시간 미달이면 퇴직금이 발생하지 않아요.
        4주 평균으로 계산하기 때문에, 매주 정확히 15시간이 아니어도 평균만 맞으면 돼요.
        근무 시간 기록을 지금부터 메모해두는 게 가장 중요해요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        일용직 퇴직금에 대해 실제로 자주 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법과 근로자퇴직급여 보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
