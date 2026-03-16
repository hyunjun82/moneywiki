"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "같은 사업장에서 1년 이상 계속 근무했어요" },
  { id: "c2", label: "주 평균 15시간 이상 일했어요" },
  { id: "c3", label: "퇴직 후 아직 3년이 지나지 않았어요" },
  { id: "c4", label: "근무 기록(계약서·통장·문자)이 남아 있어요" },
];

const CALC_SLIDERS = [
  { id: "hourly", label: "시급", min: 9860, max: 25000, step: 500, defaultValue: 10000, format: (v: number) => `${v.toLocaleString()}원` },
  { id: "hours", label: "주 근무시간", min: 15, max: 40, step: 1, defaultValue: 20, format: (v: number) => `${v}시간` },
  { id: "months", label: "근무기간", min: 12, max: 120, step: 1, defaultValue: 24, format: (v: number) => `${Math.floor(v / 12)}년 ${v % 12}개월` },
];

const CALC_RESULTS = [
  {
    label: "월 평균임금",
    getValue: (v: Record<string, number>) => Math.round(v.hourly * v.hours * (365 / 12 / 7)),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
  {
    label: "예상 퇴직금",
    getValue: (v: Record<string, number>) => {
      const monthlyAvg = Math.round(v.hourly * v.hours * (365 / 12 / 7));
      const years = v.months / 12;
      return Math.round(monthlyAvg * years);
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
];

const DOCS = [
  { name: "근로계약서", required: true, where: "입사 시 수령 · 인사팀 재발급" },
  { name: "급여명세서 또는 통장 입금 내역", required: true, where: "급여명세서·은행 앱 출력" },
  { name: "근무 스케줄표", required: false, where: "매장 보관 또는 직접 저장" },
  { name: "4대보험 가입 이력", required: false, where: "고용24 조회 (무료)" },
  { name: "사업장 정보 (사업자등록번호)", required: false, where: "신고 시 필요 — 국세청 조회" },
];

const STEPS = [
  {
    title: "퇴직금 계산 및 지급 요청",
    desc: "먼저 시급 × 근무시간 기준으로 월 평균임금을 계산해요. 그 금액에 근속연수를 곱하면 대략적인 퇴직금이 나오죠. 사장에게 문자·메일로 '퇴직금 지급 요청'을 하고 증거를 남겨요.",
    tip: "문자나 카카오톡으로 남겨두면 나중에 증거가 돼요",
  },
  {
    title: "내용증명 발송",
    desc: "14일이 지났는데도 연락이 없으면 내용증명을 보내세요. '퇴직금 미지급으로 고용노동부에 신고할 예정'이라는 내용만으로 충분해요. 우체국 또는 카카오 전자내용증명으로 발송할 수 있어요.",
    tip: "대부분 이 단계에서 지급 약속을 받아요",
  },
  {
    title: "고용노동부(1350) 진정 접수",
    desc: "내용증명 이후에도 무응답이면 고용노동부 민원마당에서 온라인으로 진정을 접수해요. 무료이고, 근로감독관이 사업장을 조사한 뒤 시정 명령을 내리죠.",
    tip: "minwon.moel.go.kr → 임금체불 진정",
  },
];

const CHECKLIST = [
  "근로계약서 — 주 근무시간, 시급, 계약 기간 확인",
  "급여명세서 또는 통장 내역 — 3개월치 기준 평균임금 산정",
  "근무 스케줄표 — 주 15시간 이상 증빙",
  "카카오톡·문자 대화 — 급여 안내, 출근 요청 등 근무 증거",
  "사업장 사업자등록번호 — 신고 시 필요",
];

const FAQS = [
  {
    q: "편의점 알바 1년 했는데 퇴직금 받을 수 있나요?",
    a: "주 15시간 이상 근무했다면 받을 수 있어요. 편의점, 카페, 식당 — 업종은 상관없죠. 1년 이상 근속이 핵심이에요.",
  },
  {
    q: "4대보험 미가입 알바도 퇴직금을 받나요?",
    a: "받을 수 있어요. 4대보험 가입 여부와 퇴직금 지급 의무는 별개 문제예요. 실제로 근무했다는 증빙이 있으면 되죠.",
  },
  {
    q: "단기 알바 3개월만 했는데 퇴직금이 나오나요?",
    a: "3개월만이면 안 돼요. 하지만 같은 곳에서 계속 일해서 총 기간이 1년을 넘으면 퇴직금이 발생하죠. 방학마다 같은 카페에서 일해도 합산 가능해요.",
  },
  {
    q: "사장이 퇴직금 없다고 우기면 어떻게 하나요?",
    a: "고용노동부(1350)에 전화 상담 → 내용증명 발송 → 진정 접수 순서로 대응하세요. 대부분 내용증명 단계에서 해결돼요.",
  },
  {
    q: "알바 퇴직금 계산은 정규직이랑 같나요?",
    a: "완전히 같아요. 퇴직 전 3개월 평균임금 × 근속연수로 계산하죠. 시급제 알바는 3개월간 받은 총 급여를 총 일수로 나눠 일 평균임금을 구하면 돼요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여 보장법 — 퇴직금 지급 의무", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "근로기준법 — 근로자 정의 및 퇴직급여", url: "https://www.law.go.kr/법령/근로기준법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 — 퇴직금 제도 안내", url: "https://www.moel.go.kr" },
      { label: "고용노동부 민원마당 — 임금·퇴직금 미지급 신고", url: "https://minwon.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "알바-퇴직금-지급기준",
    title: "알바 퇴직금 지급 기준 주 15시간 조건",
    description: "주 15시간 기준 계산법과 1년 조건을 상세히 정리했어요.",
  },
  {
    slug: "퇴직금-조건",
    title: "퇴직금 받을 수 있는 조건",
    description: "고용형태별 퇴직금 발생 조건을 정리했어요.",
  },
  {
    slug: "퇴직금-미지급-신고",
    title: "퇴직금 미지급 신고 방법",
    description: "회사가 안 줄 때 어디에 어떻게 신고하는지 안내해요.",
  },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="알바-퇴직금" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 알바 · 고용유형</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        알바 퇴직금, 얼마나 받을 수 있을까?<br />
        주 15시간 조건부터 신고까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "알바한테 무슨 퇴직금?"이라는 말, 틀렸어요.
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여 보장법</a>은 알바와 정규직을 구분하지 않아요.
        1년 넘게 주 15시간 이상 일했다면 퇴직금은 법적 권리예요.
        조건 확인부터 시급 기준 계산, <a href="/w/퇴직금-미지급-신고" style={{ color: "#1D9E75", textDecoration: "underline" }}>미지급 시 신고 방법</a>까지 한 번에 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>알바, 퇴직금 받을 수 있는 조건은?</H2>
      <p style={body}>
        퇴직금은 고용 형태와 관계없이 두 조건만 충족하면 받을 수 있어요.
        첫째, <strong>계속 근로 1년 이상</strong>. 둘째, 4주 평균 <strong>주 15시간 이상</strong>.
        편의점·카페·식당·학원 — 업종 불문, 1인 사업장도 예외 없어요.
      </p>
      <p style={body}>
        "계속 근로"가 핵심이에요. 방학마다 같은 카페에서 일하면서 총 기간이 1년을 넘었다면 합산해서 퇴직금이 발생할 수 있어요. 반면 중간에 다른 알바를 뛰거나 완전히 그만뒀다가 재입사하면 기간이 끊길 수 있죠.
      </p>

      <GreenBox title="알바 퇴직금 핵심 조건">
        1. <strong>1년 이상</strong> 같은 사업장에서 계속 근무<br />
        2. 4주 평균 <strong>주 15시간 이상</strong> 근로<br />
        3. 업종·규모·4대보험 가입 여부 <strong>무관</strong>
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="퇴직금을 받을 수 있는 조건을 갖췄어요. 아래 계산기로 예상 금액을 확인해보세요."
        partialMatchText="조건 일부가 맞지 않아요. 고용노동부(1350)에 상담부터 받아보세요."
      />

      <Divider />

      <H2>내 알바 퇴직금, 얼마나 나올까?</H2>
      <p style={body}>
        알바 퇴직금도 정규직과 같은 공식으로 계산해요.
        <strong>1일 평균임금 × 30 × (근속일수 ÷ 365)</strong>인데, 시급제는 3개월간 총 수령 임금을 실제 일수로 나눠 일 평균임금을 구하면 돼요.
        아래에서 시급, 근무시간, 기간을 조절해보세요.
      </p>

      <SectionBadge>알바 퇴직금 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 시급·근무시간 기준 추정치. 상여금·연차수당 포함 시 실제 금액이 더 높을 수 있어요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>신고에 필요한 서류 목록</H2>
      <p style={body}>
        4대보험에 가입하지 않은 알바라도 실제 근무 사실만 증명하면 퇴직금 청구가 가능해요.
        아래 서류 중 있는 것부터 모아두세요.
      </p>

      <SectionBadge>준비 서류</SectionBadge>
      <DocTable docs={DOCS} />

      <BorderBox title="서류가 하나도 없다면?">
        카카오톡 대화(출근 요청, 급여 안내), 통장 입금 내역, 동료 증언만 있어도 진정 접수가 가능해요.
        4대보험 가입 이력은 <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 무료로 확인할 수 있어요.
      </BorderBox>

      <Divider />

      <H2>퇴직금 못 받았을 때 청구 절차</H2>
      <p style={body}>
        사장이 "알바는 해당 없다"고 해도 법적 근거가 없어요.
        단계별로 대응하면 대부분 2단계(내용증명)에서 해결돼요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>신고 전 준비 체크리스트</H2>
      <p style={body}>
        청구 전에 아래 서류를 미리 챙겨두면 처리가 훨씬 빨라져요.
        퇴직 후엔 회사에서 서류 발급을 거부하는 경우도 있어요.
      </p>

      <SectionBadge>준비 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        알바 퇴직금에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법과 근로자퇴직급여 보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
