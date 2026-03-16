"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직 시 퇴직소득세가 원천징수됐어요" },
  { id: "c2", label: "근속 기간이 실제보다 짧게 계산된 것 같아요" },
  { id: "c3", label: "퇴직금 산정 기초가 잘못된 것 같아요" },
  { id: "c4", label: "IRP에서 연금으로 받으면 세금이 줄어든다고 들었어요" },
];

const CALC_SLIDERS = [
  { id: "tax", label: "원천징수된 퇴직소득세", min: 10, max: 500, step: 5, defaultValue: 80, format: (v: number) => `${v}만원` },
  { id: "years", label: "근속 기간", min: 1, max: 35, step: 1, defaultValue: 10, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "연금 수령 시 절세 가능액 (30% 감면 기준)",
    getValue: (v: Record<string, number>) => Math.round(v.tax * 10000 * 0.3),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원 절세`,
    highlight: true,
  },
  {
    label: "10년 이상 연금 수령 시 절세 (40% 감면)",
    getValue: (v: Record<string, number>) => Math.round(v.tax * 10000 * 0.4),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원 절세`,
  },
];

const DOCS = [
  { name: "퇴직소득 원천징수영수증", required: true, where: "회사 인사팀 또는 홈택스" },
  { name: "근로소득 원천징수영수증", required: true, where: "홈택스(www.hometax.go.kr)" },
  { name: "IRP 운용 내역 (연금 수령 시)", required: false, where: "IRP 가입 금융사" },
  { name: "경정청구서 (과오납 환급 신청 시)", required: false, where: "홈택스에서 작성" },
];

const STEPS = [
  {
    title: "원천징수영수증 확인",
    desc: "회사에서 받은 퇴직소득 원천징수영수증으로 근속 기간, 산정 기초, 세액을 확인해요. 근속 기간이 실제보다 짧게 기재되거나 퇴직금 산정 기초가 틀리면 세금을 과다 납부했을 수 있어요.",
    tip: "홈택스 → 조회/발급 → 지급명세서에서 조회 가능해요",
  },
  {
    title: "환급 사유 확인",
    desc: "퇴직소득세 환급은 ①근속 기간 오계산 ②산정 기초 오류 ③연금 전환 후 퇴직소득세 감면 세 가지 경우에 발생해요. 특히 IRP에서 연금으로 받으면 퇴직소득세의 30~40%를 환급받는 효과가 있어요.",
    tip: "근속 기간 1년 차이로 수십만 원 세액 차이가 날 수 있어요",
  },
  {
    title: "경정청구 또는 연금 전환 신청",
    desc: "과오납된 세금은 퇴직일 다음 달 말일 기준으로 5년 이내에 경정청구를 할 수 있어요. 홈택스에서 '경정청구' 검색 후 신청하면 돼요. IRP 연금 전환은 금융사 앱에서 연금 수령 신청으로 진행해요.",
    tip: "경정청구 후 환급까지 보통 2~3개월 소요돼요",
  },
  {
    title: "환급금 수령",
    desc: "경정청구가 승인되면 납부한 은행 계좌로 환급금이 이체돼요. IRP 연금 전환은 다음 연금 수령일부터 감면된 세율이 적용돼요. 환급 통지가 없으면 홈택스 → 나의 세금 신고·납부에서 확인하세요.",
    tip: "환급받을 계좌를 국세청에 등록해두면 더 빠르게 받아요",
  },
];

const CHECKLIST = [
  "원천징수영수증 — 근속 기간·산정 기초 정확한지 확인",
  "경정청구 기한 — 퇴직일로부터 5년 이내",
  "IRP 연금 전환 — 55세 이후 연금 수령 시 30~40% 감면",
  "홈택스 경정청구 — 과오납 세금 환급 신청 가능",
  "환급 계좌 등록 — 국세청에 미리 등록해두면 빠르게 수령",
];

const FAQS = [
  {
    q: "퇴직소득세는 어떻게 환급받나요?",
    a: "과오납이 있다면 홈택스에서 경정청구를 신청하면 돼요. 근속 기간이 잘못 계산됐거나 산정 기초가 틀렸다면 환급 대상이에요. 퇴직일로부터 5년 내에 신청해야 해요.",
  },
  {
    q: "IRP에서 연금으로 받으면 실제로 세금이 얼마나 줄어드나요?",
    a: "퇴직소득세의 30%가 감면돼요. 10년 이상 연금으로 받으면 40%까지 감면돼요. 예를 들어 퇴직소득세가 100만원이면 연금 수령 시 60~70만원만 내면 돼요.",
  },
  {
    q: "연금 수령 중에 세금 환급이 가능한가요?",
    a: "연금 수령을 시작하면 퇴직소득세 감면이 적용돼요. 이미 납부한 세금에 대해서는 경정청구로 차액을 환급받을 수 있어요.",
  },
  {
    q: "퇴직소득세 경정청구, 어디서 신청하나요?",
    a: "홈택스(www.hometax.go.kr) → 신고/납부 → 세금 신고 → 기한 후 신고·경정청구 메뉴에서 신청할 수 있어요. 공동인증서(또는 간편인증)가 필요해요.",
  },
  {
    q: "회사가 퇴직소득세를 잘못 계산했다면?",
    a: "원천징수영수증의 근속 기간과 산정 기초를 확인하세요. 오류가 있으면 회사에 수정 요청을 먼저 해보고, 해결이 안 되면 세무서나 홈택스 경정청구를 통해 직접 환급 신청할 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "소득세법 제48조 — 퇴직소득세 경정청구", url: "https://www.law.go.kr/법령/소득세법" },
      { label: "소득세법 제59조의3 — IRP 연금 수령 세금 감면", url: "https://www.law.go.kr/법령/소득세법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "국세청 홈택스 — 경정청구 신청", url: "https://www.hometax.go.kr" },
      { label: "국세청 — 퇴직소득세 계산 안내", url: "https://www.nts.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-세금", title: "퇴직금 세금, 얼마나 떼나요?", description: "퇴직소득세 계산 방법을 설명해요." },
  { slug: "퇴직금-소득세", title: "퇴직금 소득세 신고 방법", description: "퇴직소득세 신고 절차를 안내해요." },
  { slug: "퇴직금-IRP-계좌", title: "IRP 계좌 개설 방법", description: "연금 전환으로 세금을 줄이는 방법까지." },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-세금-환급" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 세금 · 환급</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 세금 환급받을 수 있는 경우는?<br />
        경정청구부터 IRP 연금 전환 절세까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금에서 원천징수된 <a href="/w/퇴직금-세금" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직소득세</a>를 환급받을 수 있는 경우가 있어요.
        근속 기간이 잘못 계산됐거나 퇴직금 산정 기초에 오류가 있다면 경정청구로 5년 내에 환급 신청이 가능해요.
        <a href="/w/퇴직금-IRP-계좌" style={{ color: "#1D9E75", textDecoration: "underline" }}>IRP</a>에서 연금으로 수령하면 퇴직소득세의 30~40%를 절세하는 효과도 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>퇴직금 세금 환급, 어떤 경우에 가능한가요?</H2>
      <p style={body}>
        퇴직소득세 환급은 세 가지 상황에서 발생해요.
        첫째, 근속 기간이 실제보다 짧게 기재된 경우예요. 근속 기간이 짧을수록 세금이 더 나오는 구조라 오류가 있으면 환급 대상이에요.
        둘째, 퇴직금 산정 기초(평균임금)가 잘못 계산된 경우예요.
        셋째, IRP에서 연금으로 수령하면 퇴직소득세를 30~40% 줄일 수 있어요.
      </p>
      <p style={body}>
        경정청구 기한은 퇴직일로부터 5년이에요.
        홈택스에서 직접 신청 가능하고, 환급까지 보통 2~3개월 소요돼요.
      </p>

      <GreenBox title="퇴직소득세 환급 3가지 경우">
        ① 근속 기간 오계산 → 경정청구로 환급<br />
        ② 퇴직금 산정 기초 오류 → 경정청구로 환급<br />
        ③ IRP 연금 전환 → 퇴직소득세 30~40% 감면
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="퇴직소득세 환급 또는 절세 방법이 있어요. 아래 계산기로 절세 효과를 확인하세요."
        partialMatchText="상황에 따라 다를 수 있어요. 국세청(126) 또는 세무사 상담을 권해요."
      />

      <Divider />

      <H2>IRP 연금 전환 시 절세 효과 계산</H2>
      <p style={body}>
        원천징수된 퇴직소득세와 근속 기간을 입력하면 연금 수령 시 절세 가능 금액을 바로 확인할 수 있어요.
        55세 이후 10년 이상 연금으로 받으면 최대 40%까지 절세돼요.
      </p>

      <SectionBadge>퇴직소득세 절세 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 연금 수령 기간 기준. 10년 미만 30% 감면, 10년 이상 40% 감면. 실제 세액은 근속 기간·소득 구간에 따라 달라요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>환급 신청에 필요한 서류</H2>
      <p style={body}>
        퇴직소득 원천징수영수증이 핵심이에요. 홈택스에서 조회하거나 회사 인사팀에 요청하면 돼요.
        경정청구 시 오류를 입증하는 자료도 함께 준비하면 처리가 빠르게 돼요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>퇴직소득세 환급 신청 4단계</H2>
      <p style={body}>
        원천징수영수증 확인 → 환급 사유 파악 → 경정청구 또는 연금 전환 신청 → 환급금 수령 순서예요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>세금 환급 체크리스트</H2>
      <p style={body}>
        경정청구 기한 5년을 놓치지 않는 게 가장 중요해요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="연금으로 받으면 세금이 덜 나와요">
        IRP에서 바로 빼지 않고 55세 이후 연금으로 받으면 퇴직소득세를 30~40% 줄일 수 있어요.<br />
        이미 낸 세금도 경정청구로 일부 돌려받을 수 있어요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 세금 환급에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 소득세법을 바탕으로 작성됐어요. 세법 개정이 있을 수 있으니 최신 기준은 국세청(126)에서 확인하세요." />
    </ArticleLayout>
  );
}
