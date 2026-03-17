"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "같은 사업장에서 1년 이상 계속 일했어요" },
  { id: "c2", label: "4주 평균 주 15시간 이상 일했어요" },
  { id: "c3", label: "편의점·카페·식당 등 업종에서 일했어요" },
  { id: "c4", label: "퇴직한 날로부터 3년이 지나지 않았어요" },
];

const CALC_SLIDERS = [
  { id: "hourly", label: "시급", min: 9860, max: 30000, step: 500, defaultValue: 10030, format: (v: number) => `${v.toLocaleString()}원` },
  { id: "hours", label: "주 근무시간", min: 15, max: 40, step: 1, defaultValue: 20, format: (v: number) => `주 ${v}시간` },
  { id: "months", label: "근무 기간", min: 12, max: 120, step: 1, defaultValue: 24, format: (v: number) => `${Math.floor(v / 12)}년 ${v % 12}개월` },
];

const CALC_RESULTS = [
  {
    label: "3개월 평균임금 (월)",
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
  { name: "근로계약서 사본", required: true, where: "사업주에게 요청 또는 보관본 사용" },
  { name: "급여명세서 또는 통장 입금 내역 (3개월치)", required: true, where: "급여명세서·은행 앱 출력" },
  { name: "주간 근무 스케줄표 또는 출퇴근 기록", required: false, where: "매장 보관 또는 직접 저장한 기록" },
  { name: "카카오톡·문자 업무 지시 기록", required: false, where: "본인 휴대폰 캡처" },
];

const STEPS = [
  {
    title: "퇴직금 금액 계산 후 지급 요청",
    desc: "위 계산기로 예상 금액을 먼저 확인하세요. 그다음 사장에게 문자나 메일로 '퇴직금 지급 요청'을 보내고 날짜와 금액을 기록해두세요. 회사는 퇴직일 후 14일 이내에 지급해야 해요.",
    tip: "요청 메시지는 카카오톡보다 문자·이메일로 보내면 증거로 활용하기 더 좋아요",
  },
  {
    title: "IRP 계좌 개설 (300만원 초과 시)",
    desc: "퇴직금이 300만원을 초과하면 IRP(개인형퇴직연금) 계좌로만 받을 수 있어요. 은행이나 증권사 앱에서 10분이면 개설 가능해요. 계좌번호를 사장에게 전달하면 돼요.",
    tip: "300만원 이하면 일반 통장으로 받을 수 있어요",
    link: { label: "퇴직금 IRP 계좌 개설 방법", href: "/w/퇴직금-IRP-계좌" },
  },
  {
    title: "내용증명 발송 (미지급 시)",
    desc: "14일이 지났는데 연락이 없으면 내용증명을 보내세요. '퇴직금 미지급으로 고용노동부에 신고할 예정'이라는 내용이면 충분해요. 우체국 또는 카카오 전자내용증명으로 빠르게 발송할 수 있어요.",
    tip: "대부분 이 단계에서 지급 약속을 받아요",
  },
  {
    title: "고용노동부 진정 접수",
    desc: "내용증명 이후에도 무응답이면 고용노동부 민원마당에서 온라인으로 진정을 접수해요. 무료이고 근로감독관이 사업장을 직접 조사해요. 보통 2~4주 내에 처리돼요.",
    tip: "minwon.moel.go.kr → 임금·퇴직금 체불 진정으로 신청해요",
    link: { label: "고용노동부 민원마당", href: "https://minwon.moel.go.kr" },
  },
];

const CHECKLIST = [
  "1년 이상 + 주 15시간 이상: 업종·규모·4대보험 가입 여부 모두 무관",
  "근로계약서: 주 근무시간·시급·계약 기간 꼭 보관",
  "급여명세서 또는 통장 내역: 3개월치 기준 평균임금 산정에 사용",
  "문자·카카오톡 기록: 주 15시간 이상 증빙 및 근무 사실 증거로 활용",
  "소멸시효 3년: 퇴직일로부터 3년 안에 청구 필수",
  "IRP 계좌: 퇴직금 300만원 초과 시 미리 개설해두기",
];

const FAQS = [
  {
    q: "편의점 알바 1년 2개월 했는데 퇴직금 받을 수 있나요?",
    a: "주 15시간 이상 근무했다면 받을 수 있어요. 편의점, 카페, 식당, 학원 등 업종은 상관없어요. 1년 이상 같은 곳에서 계속 일했다는 게 핵심이에요.",
  },
  {
    q: "4대보험에 안 들어간 알바도 퇴직금이 나오나요?",
    a: "나와요. 4대보험 가입 여부와 퇴직금 지급 의무는 완전히 별개 문제예요. 실제로 근무했다는 증빙(통장 입금 내역, 카카오톡 기록 등)이 있으면 돼요.",
  },
  {
    q: "방학에만 같은 카페에서 일했는데 기간이 합산되나요?",
    a: "방학마다 계속 같은 곳에서 일했다면 합산이 가능해요. 다만 중간에 완전히 그만뒀다가 재입사했다면 기간이 끊길 수 있어요. 계약서와 급여 기록으로 연속성을 입증하는 게 중요해요.",
  },
  {
    q: "사장이 '알바는 퇴직금 없다'고 하면 어떻게 하나요?",
    a: "근로자퇴직급여보장법 제8조는 알바와 정규직을 구분하지 않아요. 고용노동부(1350)에 전화 상담 후, 내용증명 발송 → 진정 접수 순서로 대응하면 돼요. 대부분 내용증명 단계에서 해결돼요.",
  },
  {
    q: "알바 퇴직금 계산이 정규직이랑 같나요?",
    a: "완전히 같아요. 퇴직 전 3개월 평균임금 × 근속연수로 계산해요. 시급제 알바는 3개월간 받은 총 급여를 실제 일수로 나눠 일 평균임금을 구하면 돼요.",
  },
  {
    q: "퇴직금 신청 기한이 따로 있나요?",
    a: "퇴직금 청구권은 소멸시효가 3년이에요. 퇴직일로부터 3년 안에 청구하지 않으면 권리가 사라져요. 퇴직하자마자 바로 청구하는 게 가장 안전해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 제8조: 퇴직금 지급 의무 (사업장 규모 무관)", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "근로기준법 제2조: 근로자 정의 (알바·파트타임 포함)", url: "https://www.law.go.kr/법령/근로기준법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부: 퇴직금 제도 안내", url: "https://www.moel.go.kr" },
      { label: "고용노동부 민원마당: 임금·퇴직금 미지급 신고", url: "https://minwon.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "알바-퇴직금-지급기준", title: "알바 퇴직금 지급 기준", description: "주 15시간 조건과 1년 계산법을 상세히 정리했어요." },
  { slug: "퇴직금-조건", title: "퇴직금 받는 조건", description: "고용형태별 퇴직금 발생 조건을 정리했어요." },
  { slug: "퇴직금-미지급-신고", title: "퇴직금 미지급 신고 방법", description: "회사가 안 줄 때 어디에 어떻게 신고하는지 안내해요." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="알바-퇴직금" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 알바 · 파트타임</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        알바도 퇴직금 받을 수 있을까요?<br />
        주 15시간 조건부터 시급 기준 계산까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "알바한테 퇴직금이 어딨어"라는 말, 법적으로 틀렸어요.
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법</a>은 알바와 정규직을 구분하지 않아요.
        1년 넘게 주 15시간 이상 일했다면 퇴직금은 당연한 법적 권리예요.
        조건 체크부터 시급 기준 계산, <a href="/w/퇴직금-미지급-신고" style={{ color: "#1D9E75", textDecoration: "underline" }}>미지급 시 대응 방법</a>까지 한 번에 해결해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>알바 퇴직금, 받을 수 있는 조건은?</H2>
      <p style={body}>
        퇴직금은 고용 형태와 무관하게 두 가지 조건만 충족하면 발생해요.
        첫째, 같은 사업장에서 계속 근로 1년 이상. 둘째, 4주 평균 주 15시간 이상이에요.
        편의점, 카페, 식당, 학원 등 업종과 사업장 규모는 관계없어요.
      </p>
      <p style={body}>
        여기서 "계속 근로"가 핵심이에요. 방학마다 같은 카페에서 일하면서 총 기간이 1년을 넘었다면 합산해서 퇴직금이 발생할 수 있어요.
        4대보험에 미가입됐어도 실제 근무 사실만 증명하면 받을 수 있어요.
      </p>

      <GreenBox title="알바 퇴직금 핵심 조건">
        1년 이상 같은 사업장에서 계속 근무<br />
        4주 평균 주 15시간 이상 근로<br />
        업종·규모·4대보험 가입 여부 무관
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="퇴직금을 받을 수 있는 조건을 갖췄어요. 아래 계산기로 예상 금액을 확인해보세요."
        partialMatchText="조건 일부가 맞지 않을 수 있어요. 고용노동부(1350)에 상담부터 받아보세요."
      />

      <Divider />

      <H2>시급 기준으로 퇴직금 얼마나 나올까?</H2>
      <p style={body}>
        알바 퇴직금도 정규직과 같은 공식으로 계산해요.
        퇴직 전 3개월 평균임금 × 근속연수가 기본인데, 시급제 알바는 3개월간 받은 총 급여를 실제 일수로 나눠 일 평균임금을 구해요.
        아래에서 시급, 주 근무시간, 기간을 조절해보세요.
      </p>
      <p style={body}>
        상여금이나 연차수당이 있으면 평균임금에 포함돼서 실제 퇴직금이 더 높아질 수 있어요.
        계산기는 순수 시급 기준 추정치예요.
      </p>

      <SectionBadge>알바 퇴직금 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 시급·근무시간 기준 추정치. 상여금·연차수당 포함 시 실제 금액이 높아질 수 있어요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>퇴직금 청구에 필요한 서류</H2>
      <p style={body}>
        4대보험에 미가입된 알바라도 실제 근무 사실만 증명하면 청구할 수 있어요.
        근로계약서가 없어도 통장 급여 입금 내역이나 카카오톡 업무 지시 기록으로 대체 가능해요.
        있는 것부터 최대한 모아두세요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>퇴직금 못 받았을 때 대응 절차</H2>
      <p style={body}>
        사장이 "알바는 해당 없다"고 해도 법적 근거가 없어요.
        단계별로 대응하면 대부분 2단계(내용증명)에서 해결돼요.
        각 단계에서 날짜와 내용 기록을 반드시 남겨두세요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>청구 전 준비 체크리스트</H2>
      <p style={body}>
        청구 전에 아래 항목을 미리 챙겨두면 처리가 훨씬 빨라져요.
        퇴직 후엔 회사에서 서류 발급을 거부하는 경우도 있으니 재직 중에 확보하는 게 좋아요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="증거 없어도 진정 접수 가능해요">
        카카오톡 출근 요청, 통장 입금 내역, 동료 증언만 있어도 진정 접수가 가능해요.<br />
        4대보험 가입 이력은 고용24(ei.go.kr)에서 무료로 조회할 수 있어요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        알바 퇴직금에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법과 근로자퇴직급여보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
