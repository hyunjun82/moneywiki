"use client";
import { Divider } from "@/components/article-ui/Divider";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR, 퇴직금_HIGHLIGHT } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "같은 사업장에서 반복적으로 계속 일했어요" },
  { id: "c2", label: "1년(365일) 이상 근무 기간이 됐어요" },
  { id: "c3", label: "주 15시간 이상 일한 주가 대부분이었어요" },
  { id: "c4", label: "공백 기간이 7일을 넘은 적이 거의 없었어요" },
];

const CALC_SLIDERS = [
  { id: "daily", label: "1일 일당", min: 10, max: 40, step: 1, defaultValue: 18, format: (v: number) => `${v}만원` },
  { id: "days", label: "연간 근무일수", min: 100, max: 300, step: 10, defaultValue: 220, format: (v: number) => `${v}일` },
  { id: "years", label: "근속 기간", min: 1, max: 10, step: 1, defaultValue: 2, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "1일 평균임금 (3개월 기준)",
    getValue: (v: Record<string, number>) => Math.round((v.daily * 10000 * v.days) / 365),
    format: (v: number) => `약 ${Math.round(v / 1000).toLocaleString()}천원`,
    highlight: true,
  },
  {
    label: "예상 퇴직금 (세전)",
    getValue: (v: Record<string, number>) => {
      const avgDay = Math.round((v.daily * 10000 * v.days) / 365);
      return avgDay * 30 * v.years;
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: false,
  },
];

const DOCS = [
  { name: "근무 일지 또는 출근부 사본", required: true, where: "회사 또는 본인 보관" },
  { name: "급여 입금 통장 거래내역", required: true, where: "인터넷뱅킹·앱 발급" },
  { name: "업무 지시 메시지 (카카오톡·문자)", required: true, where: "본인 캡처·저장" },
  { name: "근로계약서 또는 구두계약 증거", required: false, where: "본인 보관 또는 메시지 캡처" },
  { name: "4대 보험 가입 확인서 (건강보험·국민연금)", required: false, where: "국민건강보험공단·국민연금공단 앱" },
];

const STEPS = [
  {
    title: "계속 근로 여부 판단",
    desc: "일용직이어도 반복적으로 같은 사업장에서 일했다면 '계속 근로'로 인정될 수 있어요. 고용노동부 기준은 근무 공백이 7일을 넘지 않으면 계속 근로로 봐요. 1년 이상이고 주 15시간 이상인 주가 대부분이라면 퇴직금 요건을 충족해요.",
    tip: "4대 보험 가입 기간도 계속 근로 증거로 사용할 수 있어요",
  },
  {
    title: "증거 수집",
    desc: "출근부, 통장 거래내역, 업무 지시 카카오톡·문자를 모아요. 국민건강보험공단이나 국민연금공단 앱에서 가입 기간을 조회하면 근무 기간을 입증하는 강력한 증거가 돼요. 사업주가 준 작업 지시 메시지도 계속 근로 관계를 보여줘요.",
    tip: "공단 앱에서 가입 기간 조회는 1분이면 돼요",
  },
  {
    title: "퇴직금 계산",
    desc: "1일 평균임금은 퇴직 전 3개월 총임금 ÷ 해당 기간 총 일수로 계산해요. 일용직은 일한 날만 임금을 받으니 실제 근무일수를 기준으로 해요. 퇴직금 = 1일 평균임금 × 30일 × 근속연수예요.",
    tip: "근무일이 불규칙하면 고용노동부(1350)에 계산 방법을 먼저 문의하세요",
  },
  {
    title: "고용노동청 진정 접수",
    desc: "사업주가 지급을 거부하면 고용노동청에 체불 진정을 내요. 고용24(work.go.kr) 온라인 또는 가까운 고용노동지청 방문으로 접수할 수 있어요. 진정 후 근로감독관이 조사하고 지급 명령을 내려요. 소멸시효 3년 이내라면 퇴직 후에도 청구 가능해요.",
    tip: "진정 접수는 무료이고, 변호사 없이 직접 할 수 있어요",
    link: { label: "고용24 온라인 진정 접수", href: "https://www.work.go.kr" },
  },
];

const CHECKLIST = [
  "계속 근로: 7일 이상 공백 없이 1년 이상 반복 근무",
  "주 15시간 이상: 4주 평균 기준으로 충족 여부 확인",
  "증거 수집: 통장 거래내역·출근부·카카오톡 메시지 저장",
  "4대 보험: 건강보험·국민연금 가입 기간 조회로 기간 입증",
  "퇴직금 계산: 3개월 평균임금 × 30일 × 근속연수",
  "소멸시효: 퇴직일로부터 3년 이내에 신고",
];

const FAQS = [
  {
    q: "일용직도 퇴직금을 받을 수 있나요?",
    a: "받을 수 있어요. 계약서에 '일용직'이라고 써 있어도, 같은 사업장에서 1년 이상 계속 일하고 주 15시간 이상 근무했다면 퇴직금 지급 대상이에요. 고용 형태가 아니라 실제 근무 형태가 기준이에요.",
  },
  {
    q: "일용직의 계속 근로는 어떻게 판단하나요?",
    a: "고용노동부 기준으로 7일 이상 공백 없이 반복적으로 일했다면 계속 근로로 봐요. 같은 사업주 아래 현장이 달라져도 합산될 수 있고, 4대 보험 가입 기간이 증거로 쓰여요.",
  },
  {
    q: "근로계약서가 없어도 퇴직금 청구가 가능한가요?",
    a: "가능해요. 통장 거래내역, 업무 지시 메시지, 출근 기록이 있다면 근무 사실을 충분히 입증할 수 있어요. 계약서가 없어도 실제 근무 사실이 증거가 돼요.",
  },
  {
    q: "건설 현장 일용직은 퇴직금 기준이 다른가요?",
    a: "건설 현장 일용직은 건설근로자공제회 퇴직공제금 제도가 별도로 있어요. 같은 현장에서 1년 이상 일했다면 일반 퇴직금도 함께 청구할 수 있어요.",
  },
  {
    q: "사업주가 '일용직이라 퇴직금이 없다'고 하면?",
    a: "틀린 말이에요. 고용 형태가 아니라 실제 근무 형태가 기준이에요. 계속 근로 요건을 충족하면 반드시 지급해야 하고, 거부하면 고용노동청에 신고하면 돼요.",
  },
  {
    q: "퇴직금을 주 15시간 이상 못 채운 주가 있는데도 받을 수 있나요?",
    a: "4주 평균으로 판단해요. 일부 주에 15시간을 못 채워도 4주 평균이 15시간 이상이라면 퇴직금 지급 의무가 발생해요. 전체 기간 중 대부분이 주 15시간 이상이었다면 청구할 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 제4조: 퇴직금 지급 의무", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "근로기준법 제2조: 계속 근로 및 평균임금 기준", url: "https://www.law.go.kr/법령/근로기준법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부: 일용근로자 퇴직금 기준 안내", url: "https://www.moel.go.kr" },
      { label: "고용24: 온라인 진정 접수", url: "https://www.work.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "일용직-퇴직금-지급기준", title: "일용직 퇴직금 지급 기준", description: "계속 근로 인정 조건을 상세히 정리했어요." },
  { slug: "일용직-퇴직금", title: "일용직 퇴직금 계산법", description: "1일 평균임금 계산 방법과 예시예요." },
  { slug: "퇴직금-조건", title: "퇴직금 받는 조건", description: "1년·주 15시간 요건과 예외 사항이에요." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} highlightSlugs={퇴직금_HIGHLIGHT} currentSlug="퇴직금-일용직" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 일용직 · 계속근로</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        일용직도 퇴직금 받을 수 있을까요?<br />
        계속 근로 인정 조건과 청구 절차
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        일용직이어도 같은 사업장에서 1년 이상, 주 15시간 이상 근무했다면 <a href="/w/퇴직금-수령방법" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금</a>을 받을 수 있어요.
        계약서에 '일용직'이라고 써 있어도 실제 근무 형태가 기준이에요.
        근로계약서가 없어도 통장 거래내역이나 업무 지시 메시지로 입증할 수 있고,
        사업주가 거부하면 <a href="/w/퇴직금-미지급-신고" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동청에 신고</a>하면 돼요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>일용직 퇴직금, 어떤 조건이어야 받을 수 있나요?</H2>
      <p style={body}>
        퇴직금 지급 조건은 고용 형태가 아니라 실제 근무 형태예요.
        같은 사업장에서 반복적으로 일하면서 공백이 7일을 넘지 않고 1년을 채우면 '계속 근로'로 인정돼요.
        그리고 주 15시간 이상인 주가 대부분이어야 해요.
      </p>
      <p style={body}>
        사업주가 "일용직이라 퇴직금이 없다"고 해도 법적으로 틀린 말이에요.
        법원과 고용노동부 모두 실제 근무 형태를 기준으로 판단해요.
        증거만 충분하다면 충분히 청구할 수 있어요.
      </p>

      <GreenBox>
        계속 근로 1년 이상 (공백 7일 미만 기준)<br />
        주 15시간 이상 근무 (4주 평균 기준)<br />
        증거: 통장 거래내역·출근부·업무 지시 메시지
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="퇴직금 청구 조건에 해당해요. 아래 계산기로 예상 금액을 먼저 확인해보세요."
        partialMatchText="일부 조건이 다를 수 있어요. 고용노동부(1350) 상담을 먼저 받아보세요."
      />

      <Divider />

      <H2>일용직 퇴직금 예상액 계산해보세요</H2>
      <p style={body}>
        일당과 연간 근무일수, 근속 기간을 입력하면 1일 평균임금과 예상 퇴직금을 계산할 수 있어요.
        실제 계산은 퇴직 전 3개월 총임금 ÷ 해당 기간 총 일수로 1일 평균임금을 구해요.
        여기에 30일 × 근속연수를 곱하면 퇴직금이 나와요.
      </p>

      <SectionBadge>퇴직금 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 세전 기준. 1일 평균임금 = 3개월 총임금 ÷ 3개월 총 일수. 퇴직금 = 1일 평균임금 × 30 × 근속연수."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>계속 근로 입증에 필요한 서류</H2>
      <p style={body}>
        근로계약서가 없어도 통장 거래내역만으로 청구할 수 있어요.
        업무 지시 카카오톡·문자, 출근부 사본이 있으면 더 강력해요.
        4대 보험 가입 기간은 국민건강보험공단이나 국민연금공단 앱에서 1분이면 조회할 수 있어요.
      </p>
      <p style={body}>
        건강보험 피부양자 자격 상실·취득 내역도 근무 기간을 보여주는 증거로 쓸 수 있어요.
        여러 증거를 함께 제출할수록 계속 근로 인정 가능성이 높아져요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>일용직 퇴직금 청구 절차 4단계</H2>
      <p style={body}>
        계속 근로 여부 확인부터 고용노동청 신고까지 단계별로 대응하면 돼요.
        증거가 충분하면 대부분 신고 단계에서 해결되고, 보통 4~8주 안에 결론이 나요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>청구 전 놓치면 안 되는 체크리스트</H2>
      <p style={body}>
        소멸시효 3년이 지나면 청구가 막혀요. 퇴직 후에도 3년 안이라면 지금 당장 움직이세요.
        증거 수집이 먼저이고, 계속 근로 요건 충족 여부를 하나씩 확인하면 돼요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        고용 형태가 아니라 실제 근무 형태가 기준이에요.<br />
        1년 이상, 주 15시간 이상이라면 고용노동청에 신고해서 청구할 수 있어요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        일용직 퇴직금에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법과 근로기준법을 바탕으로 작성됐어요. 계속 근로 판단은 개별 사안에 따라 다를 수 있으니 고용노동부(1350) 상담을 권해요." />
    </ArticleLayout>
  );
}
