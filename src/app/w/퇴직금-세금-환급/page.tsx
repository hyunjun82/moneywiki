"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직할 때 퇴직소득세가 원천징수됐어요" },
  { id: "c2", label: "퇴직소득 원천징수영수증을 받았어요" },
  { id: "c3", label: "퇴직일로부터 5년이 지나지 않았어요" },
  { id: "c4", label: "근속 기간이 잘못 기재됐거나 퇴직금 산정 오류가 있었어요" },
];

const CALC_SLIDERS = [
  { id: "tax", label: "원천징수된 퇴직소득세", min: 10, max: 1000, step: 10, defaultValue: 100, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "years", label: "실제 근속 기간", min: 1, max: 35, step: 1, defaultValue: 10, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "연금 수령 시 절세액 (30% 감면, 10년 미만)",
    getValue: (v: Record<string, number>) => Math.round(v.tax * 10000 * 0.3),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원 절세`,
    highlight: true,
  },
  {
    label: "연금 수령 시 절세액 (40% 감면, 10년 이상)",
    getValue: (v: Record<string, number>) => Math.round(v.tax * 10000 * 0.4),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원 절세`,
  },
];

const DOCS = [
  { name: "퇴직소득 원천징수영수증", required: true, where: "회사 인사팀 또는 홈택스 조회/발급" },
  { name: "경정청구서", required: true, where: "홈택스에서 직접 작성" },
  { name: "근속 기간 오류 입증 자료 (재직증명서 등)", required: false, where: "회사 인사팀" },
  { name: "IRP 계좌 개설 확인서 (연금 전환 시)", required: false, where: "IRP 가입 금융사" },
  { name: "본인 명의 환급 계좌 통장 사본", required: false, where: "은행 발급 또는 홈택스 등록" },
];

const STEPS = [
  {
    title: "원천징수영수증 발급",
    desc: "퇴직소득 원천징수영수증을 받아요. 회사 인사팀에 요청하거나 홈택스 → 조회/발급 → 지급명세서에서 직접 내려받을 수 있어요. 근속 기간 시작일·종료일, 퇴직금 산정 기초, 납부 세액을 꼼꼼히 봐야 해요.",
    tip: "홈택스 로그인 → 조회/발급 → 지급명세서 → 퇴직소득 지급명세서",
    link: { label: "홈택스 지급명세서 조회", href: "https://www.hometax.go.kr" },
  },
  {
    title: "오류 항목 파악",
    desc: "근속 기간이 실제와 다르게 기재됐는지, 퇴직금 산정에 포함됐어야 할 상여금·수당이 빠졌는지 살펴봐요. 근속 기간 1년 차이만으로도 수십만 원 세액 차이가 날 수 있어요. 오류가 없다면 IRP 연금 전환 감면 방법도 있어요.",
    tip: "퇴직금 계산기로 예상 세액을 먼저 구해두면 비교가 쉬워요",
  },
  {
    title: "홈택스 경정청구 신청",
    desc: "홈택스 → 신고/납부 → 세금 신고 → 경정·수정신고·기한후신고 메뉴에서 신청해요. 퇴직소득 원천징수영수증과 오류 입증 자료를 첨부하면 돼요. 공동인증서 또는 간편인증이 필요해요.",
    tip: "경정청구 기한: 퇴직일 다음 달 말일 기준으로 5년 이내",
    link: { label: "홈택스 경정청구 신청", href: "https://www.hometax.go.kr" },
  },
  {
    title: "환급금 수령",
    desc: "국세청 검토 후 승인되면 등록된 계좌로 환급금이 이체돼요. 보통 2~3개월 소요돼요. 홈택스 → 나의 세금 신고·납부 → 환급 현황에서 진행 상황을 확인할 수 있어요.",
    tip: "환급 계좌를 미리 국세청에 등록해두면 처리 속도가 빨라져요",
  },
];

const CHECKLIST = [
  "경정청구 기한: 퇴직일 다음 달 말일부터 5년 이내",
  "원천징수영수증: 근속 기간·산정 기초 오류 여부 먼저 점검",
  "홈택스 계정: 공동인증서 또는 간편인증 준비",
  "오류 입증 자료: 재직증명서·급여명세서 등 근거 자료 챙기기",
  "환급 계좌: 홈택스에 본인 계좌 사전 등록 권장",
  "IRP 연금 전환: 55세 이후 수령 시 퇴직소득세 30~40% 감면",
];

const FAQS = [
  {
    q: "퇴직소득세 경정청구, 기한이 얼마나 되나요?",
    a: "퇴직일 다음 달 말일로부터 5년이에요. 예를 들어 2021년 3월에 퇴직했다면 2026년 4월 말까지 신청할 수 있어요. 기한을 넘기면 환급받을 수 없으니 빨리 신청하는 게 유리해요.",
  },
  {
    q: "회사가 근속 기간을 잘못 기재했는데 어떻게 하나요?",
    a: "회사 인사팀에 원천징수영수증 수정을 먼저 요청하는 게 순서예요. 수정이 안 된다면 홈택스에서 직접 경정청구를 할 수 있어요. 재직증명서나 급여명세서로 실제 근속 기간을 입증하면 돼요.",
  },
  {
    q: "IRP에서 연금으로 받으면 세금이 얼마나 줄어드나요?",
    a: "퇴직소득세의 30%가 감면돼요. 10년 이상 연금으로 나눠 받으면 40%까지 줄어요. 퇴직소득세가 200만원이라면 연금 수령 시 60~80만원을 덜 내게 되는 셈이에요.",
  },
  {
    q: "경정청구 후 환급까지 얼마나 걸리나요?",
    a: "국세청 검토 기간 포함해 보통 2~3개월 정도 걸려요. 자료가 충분하고 오류가 명확하면 더 빨리 처리되기도 해요. 홈택스 → 나의 세금 신고·납부에서 진행 상황을 확인할 수 있어요.",
  },
  {
    q: "일시금으로 받은 퇴직금도 경정청구가 가능한가요?",
    a: "가능해요. 일시금 수령 여부와 관계없이 퇴직소득세 산정에 오류가 있었다면 경정청구로 환급받을 수 있어요. 원천징수영수증의 근속 기간과 산정 기초를 우선 확인해요.",
  },
  {
    q: "세무사 없이 혼자 경정청구를 할 수 있나요?",
    a: "충분히 가능해요. 홈택스에서 절차가 안내되고, 오류가 명확하다면 자료 첨부만으로 처리돼요. 복잡한 계산이 필요하거나 고액이라면 세무사 상담을 받는 게 안전해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "소득세법 제45조의2: 경정 등의 청구", url: "https://www.law.go.kr/법령/소득세법" },
      { label: "소득세법 제146조: 퇴직소득 원천징수", url: "https://www.law.go.kr/법령/소득세법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "국세청 홈택스: 경정청구 신청 안내", url: "https://www.hometax.go.kr" },
      { label: "국세청: 퇴직소득세 계산 및 환급 안내", url: "https://www.nts.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-세금", title: "퇴직금 세금, 얼마나 떼나요?", description: "퇴직소득세 구조와 세율 계산 방법." },
  { slug: "퇴직금-소득세", title: "퇴직금 소득세 신고 방법", description: "퇴직소득세 신고 절차 안내." },
  { slug: "퇴직금-IRP-계좌", title: "IRP 계좌 개설 방법", description: "연금 전환 절세 방법까지." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-세금-환급" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 세금 · 환급</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직소득세 더 냈다면 돌려받을 수 있나요?<br />
        경정청구로 5년 내 환급받는 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직할 때 원천징수된{" "}
        <a href="/w/퇴직금-세금" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직소득세</a>가
        실제보다 많이 나왔다면 돌려받을 수 있어요.
        근속 기간이 잘못 기재됐거나 퇴직금 산정 기초에 오류가 있었다면{" "}
        <a href="/w/퇴직금-소득세" style={{ color: "#1D9E75", textDecoration: "underline" }}>경정청구</a>로
        퇴직일로부터 5년 내에 환급 신청이 가능해요.
        <a href="/w/퇴직금-IRP-계좌" style={{ color: "#1D9E75", textDecoration: "underline" }}>IRP</a>에서
        55세 이후 연금으로 나눠 받으면 퇴직소득세의 30~40%를 줄이는 방법도 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>퇴직소득세 환급, 어떤 경우에 해당하나요?</H2>
      <p style={body}>
        퇴직소득세 환급이 가능한 경우는 크게 두 가지예요.
        첫째는 세금 산정 자체에 오류가 있는 경우예요. 근속 기간이 실제보다 짧게 기재되거나,
        퇴직금 산정 기초가 되는 평균임금에 포함됐어야 할 수당이 빠졌다면 과다 납부한 셈이에요.
        이때는 경정청구로 차액을 돌려받아요.
      </p>
      <p style={body}>
        둘째는 IRP 연금 전환 감면이에요. 이건 오류가 아니라 합법적인 절세 방법이에요.
        <a href="/w/퇴직금-IRP-수령방법" style={{ color: "#1D9E75", textDecoration: "underline" }}>IRP에서 일시금으로 빼지 않고</a>{" "}
        55세 이후 연금으로 수령하면 퇴직소득세를 30~40% 줄일 수 있어요.
        두 방법 모두 퇴직 후 바로 챙겨야 놓치지 않아요.
      </p>

      <GreenBox>
        근속 기간 오기재 → 경정청구로 차액 환급 (5년 내)<br />
        퇴직금 산정 기초 오류 → 경정청구로 차액 환급 (5년 내)<br />
        IRP 연금 수령 전환 → 퇴직소득세 30~40% 감면
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="경정청구 또는 IRP 연금 전환으로 세금을 돌려받을 수 있어요. 아래 계산기로 절세 효과를 먼저 확인해보세요."
        partialMatchText="상황에 따라 환급 여부가 달라져요. 국세청 상담 전화(126)에서 확인해보세요."
      />

      <Divider />

      <H2>IRP 연금 전환 시 절세 금액 계산</H2>
      <p style={body}>
        원천징수된 퇴직소득세와 근속 기간을 조정하면 연금 수령 시 절세 가능 금액을 바로 볼 수 있어요.
        10년 미만 수령이면 30%, 10년 이상이면 40% 감면돼요.
      </p>
      <p style={body}>
        퇴직소득세가 300만원이고 10년 이상 연금으로 나눠 받는다면 120만원을 아낄 수 있어요.
        금액이 클수록 연금 전환 절세 효과도 커지죠.
        다만 이미 일시금으로 수령했다면 경정청구만 가능해요.
      </p>

      <SectionBadge>퇴직소득세 절세 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ IRP 연금 수령 기준. 10년 미만 30% 감면, 10년 이상 40% 감면. 실제 세액은 근속 기간·퇴직소득 규모에 따라 달라요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>경정청구에 필요한 서류</H2>
      <p style={body}>
        퇴직소득 원천징수영수증이 핵심 서류예요. 홈택스에서 바로 조회하거나 회사 인사팀에 요청하면 받을 수 있어요.
        근속 기간 오류를 주장하려면 실제 근무 기간을 증명하는 자료도 함께 준비하는 게 좋아요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>퇴직소득세 환급 신청 4단계</H2>
      <p style={body}>
        원천징수영수증 발급 → 오류 파악 → 홈택스 경정청구 → 환급 수령 순서예요.
        세무사 없이도 홈택스에서 처리할 수 있고, 기한 5년만 놓치지 않으면 돼요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>환급 전 꼭 짚어야 할 것들</H2>
      <p style={body}>
        경정청구 기한 5년이 가장 중요해요.
        퇴직한 날을 기준으로 언제까지 신청 가능한지 먼저 날짜를 잡아두세요.
        오류 여부와 관계없이 IRP 연금 전환 여부도 같이 검토하는 게 유리해요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        IRP에서 바로 빼지 않고 55세 이후 연금으로 받으면 퇴직소득세를 30~40% 줄일 수 있어요.<br />
        이미 낸 세금 중 과다 납부된 부분은 경정청구로 돌려받을 수 있어요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직소득세 환급과 경정청구에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 소득세법을 바탕으로 작성됐어요. 세법 개정이 있을 수 있으니 최신 기준은 국세청(126)에서 문의하세요." />
    </ArticleLayout>
  );
}
