"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "이전에 퇴직금 중간정산을 받은 기록이 있어요" },
  { id: "c2", label: "중간정산 이후에도 같은 회사에서 계속 근무했어요" },
  { id: "c3", label: "중간정산일 이후 근속기간이 1년 이상이에요" },
  { id: "c4", label: "현재 퇴직(예정)이거나 퇴직금 계산이 필요한 상황이에요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "월 평균급여 (만원)", min: 200, max: 800, step: 10, defaultValue: 300, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "after", label: "중간정산 이후 재근속 기간 (년)", min: 1, max: 30, step: 1, defaultValue: 3, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "최종 퇴직금 예상액 (재근속 기간 기준)",
    getValue: (v: Record<string, number>) => Math.round(v.salary * 10000 * v.after),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "중간정산 전 기간",
    getValue: () => 0,
    format: () => "중간정산 시 이미 수령 완료 → 포함 안 됨",
  },
];

const DOCS = [
  { name: "중간정산 지급 확인서 또는 원천징수영수증", required: true, where: "회사 인사팀 또는 홈택스 조회" },
  { name: "급여명세서 (최종 퇴직 전 3개월치)", required: true, where: "인사팀 또는 급여 시스템" },
  { name: "재직증명서 또는 근로계약서", required: false, where: "인사팀 발급" },
  { name: "IRP 계좌번호 및 통장 사본", required: true, where: "은행·증권사 발급" },
];

const STEPS = [
  {
    title: "중간정산 이력 및 날짜 확인",
    desc: "중간정산을 받은 날짜와 금액을 먼저 확인해요. 이 날짜가 재근속 기산일의 기준이 돼요. 원천징수영수증이 없으면 인사팀에 요청하거나 홈택스에서 과거 원천징수 내역을 조회할 수 있어요.",
    tip: "홈택스 → 조회/발급 → 기타 조회 → 근로·퇴직소득 지급명세서 조회",
    link: { label: "홈택스 조회하기", href: "https://www.hometax.go.kr" },
  },
  {
    title: "재근속 기산일 계산",
    desc: "중간정산일 다음 날이 재근속 기산일이에요. 최종 퇴직금은 이 날부터 최종 퇴직일까지의 기간만 기준으로 계산해요. 중간정산 전 기간은 이미 수령했기 때문에 포함되지 않아요.",
    tip: "중간정산일 다음 날 = 재근속 기산일 (이날부터 1년이 채워져야 퇴직금 발생)",
  },
  {
    title: "최종 퇴직금 계산",
    desc: "공식은 '퇴직 전 3개월 평균임금 × 30일 × 재근속 연수'예요. 중간정산 이후 임금이 올랐다면 현재 임금 기준으로 계산되기 때문에 최종 수령액이 더 클 수 있어요. 인사팀에 계산 내역 확인을 요청하세요.",
    tip: "인사팀이 재근속 기산일을 잘못 입력하는 경우가 있으니 직접 대조하세요",
  },
  {
    title: "IRP 계좌로 수령",
    desc: "최종 퇴직금 300만원 초과 시 IRP 계좌로 먼저 받아야 해요. 퇴직소득세는 재근속 기간의 근속연수 공제를 적용해서 원천징수돼요. 회사는 퇴직일로부터 14일 이내에 지급해야 해요.",
    tip: "14일 초과 시 연 20% 지연이자를 청구할 수 있어요",
  },
];

const CHECKLIST = [
  "중간정산 원천징수영수증 확보: 재근속 기산일 증빙용",
  "재근속 기산일 계산: 중간정산일 다음 날부터 기산",
  "재근속 기간 1년 이상 확인: 미만이면 퇴직금 발생 안 됨",
  "최종 퇴직 전 3개월 평균임금 확인: 급여명세서 3개월치 보관",
  "IRP 계좌 사전 개설: 300만원 초과 수령 시 필요",
  "지급기한 14일 확인: 초과 시 지연이자(연 20%) 청구 가능",
];

const FAQS = [
  {
    q: "중간정산 후 최종 퇴직금은 전체 근속기간으로 계산하나요?",
    a: "아니에요. 중간정산 이후 재근속 기간만 기준으로 계산해요. 중간정산 전 기간에 해당하는 퇴직금은 이미 받았기 때문에 다시 포함되지 않아요.",
  },
  {
    q: "재근속 기간이 1년 미만이면 퇴직금이 없나요?",
    a: "맞아요. 퇴직금은 근속기간 1년 이상인 근로자에게만 발생해요. 중간정산 이후 1년이 채 안 됐다면 최종 퇴직금은 나오지 않아요. 다만 중간정산 시 받은 금액이 전부예요.",
  },
  {
    q: "중간정산 날짜를 모르면 어떻게 확인하나요?",
    a: "인사팀에 중간정산 원천징수영수증 재발급을 요청하면 날짜를 확인할 수 있어요. 없다면 홈택스에서 '근로·퇴직소득 지급명세서 조회' 메뉴로 과거 기록을 찾을 수 있어요.",
  },
  {
    q: "중간정산 이후 세금 공제가 더 불리한가요?",
    a: "재근속 기간이 짧으면 근속연수 공제가 줄어서 세금이 더 많이 나올 수 있어요. 전체 근속기간으로 한 번에 받을 때보다 세금 측면에서 불리해지는 경우가 있어요. 중간정산 시 수령한 금액과 합산하면 총액은 비슷하지만 세금 부담이 분산되기도 해요.",
  },
  {
    q: "중간정산을 여러 번 받았다면 어떻게 계산하나요?",
    a: "마지막 중간정산일 다음 날부터 최종 퇴직일까지의 기간이 재근속 기간이에요. 중간정산을 세 번 받았다면 세 번째 중간정산일 다음 날이 기산일이에요. 그 이전 기간은 각각 정산 완료됐어요.",
  },
  {
    q: "퇴직금을 14일 안에 안 주면 어떻게 하나요?",
    a: "퇴직일로부터 14일 이내 지급이 원칙이에요. 초과 시 연 20% 지연이자를 청구할 수 있어요. 고용노동부(1350)에 신고하거나 민사 소송으로 청구할 수 있어요. 자세한 내용은 퇴직금 지연이자 글에서 볼 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 제8조: 퇴직금 산정 기준", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "근로자퇴직급여보장법 제9조: 퇴직금 지급 기한", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부: 퇴직금 중간정산 안내", url: "https://www.moel.go.kr" },
      { label: "홈택스: 퇴직소득 지급명세서 조회", url: "https://www.hometax.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-중간정산", title: "퇴직금 중간정산이란", description: "신청 사유와 절차 전체 안내." },
  { slug: "퇴직금-계산-방법", title: "퇴직금 계산 방법", description: "평균임금과 근속연수로 계산하는 공식." },
  { slug: "퇴직금-중간정산-세금", title: "중간정산 세금 얼마나 나오나요", description: "퇴직소득세 원천징수 계산법." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-중간정산-후-퇴직금-계산" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 중간정산 · 재계산</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        중간정산 받았는데 최종 퇴직금은 어떻게 계산하나요?<br />
        재근속 기간 기산일·계산 공식·세금 차이까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        <a href="/w/퇴직금-중간정산" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 중간정산</a>을 받고 나서
        나중에 퇴직할 때 또 받을 수 있는지 헷갈리죠?
        중간정산은 그 시점까지의 퇴직금을 미리 당긴 것이라 이미 정산된 기간은 다시 계산하지 않아요.
        최종 퇴직금은 중간정산일 다음 날부터 시작된 재근속 기간만 기준으로 계산해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>중간정산 후 퇴직금 계산 기준이 어떻게 달라지나요?</H2>
      <p style={body}>
        중간정산을 받으면 그날까지 쌓인 퇴직금을 미리 받은 거예요.
        중간정산일 다음 날부터 근속기간이 0년으로 리셋되고, 새로 쌓이기 시작해요.
        퇴직금 계산 공식 자체는 똑같이 '평균임금 × 30일 × 근속연수'인데,
        적용되는 근속연수가 전체 기간이 아닌 '재근속 기간'으로 바뀌어요.
      </p>
      <p style={body}>
        중간정산 이후 임금이 올랐다면 최종 퇴직금에 유리해요.
        퇴직 직전 3개월 평균임금 기준으로 계산하기 때문에 현재 임금이 높을수록 최종 금액이 커지거든요.
        단, 재근속 기간이 1년 미만이면 퇴직금 자체가 발생하지 않아요.
      </p>

      <GreenBox>
        최종 퇴직금 = 퇴직 전 3개월 평균임금 × 30일 × 재근속 연수<br />
        재근속 기간 = 중간정산일 다음 날 ~ 최종 퇴직일<br />
        중간정산 전 기간 = 이미 수령 완료 → 포함 안 됨
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="최종 퇴직금 계산이 가능한 상황이에요. 아래 계산기로 재근속 기간 기준 예상액을 확인해보세요."
        partialMatchText="중간정산 이력이나 재근속 기간을 인사팀에 먼저 확인하세요."
      />

      <Divider />

      <H2>재근속 기간으로 최종 퇴직금 계산해보기</H2>
      <p style={body}>
        현재 월급과 중간정산 이후 재근속 기간을 입력하면 대략적인 최종 퇴직금이 나와요.
        중간정산 이후 1년 미만이라면 퇴직금이 발생하지 않아요.
        정확한 금액은 퇴직 전 3개월 평균임금(상여금·수당 포함)을 기준으로 계산해야 해요.
      </p>

      <SectionBadge>최종 퇴직금 간편 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 월 평균급여 × 재근속 연수 기준 추정값이에요. 실제 금액은 퇴직 전 3개월 평균임금 기준으로 달라질 수 있어요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>최종 퇴직 전에 챙겨야 할 서류</H2>
      <p style={body}>
        중간정산 이력이 있으면 인사팀이 재근속 기산일을 잘못 계산하는 경우가 간혹 있어요.
        원천징수영수증이 재근속 기산일의 핵심 근거라서 반드시 확보해야 해요.
        없다면 홈택스에서 과거 지급명세서를 조회하면 날짜를 찾을 수 있어요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <p style={body}>
        <a href="https://www.hometax.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>홈택스</a>에서
        '조회/발급 → 기타 조회 → 근로·퇴직소득 지급명세서 조회' 메뉴로 과거 중간정산 내역을 찾을 수 있어요.
        원천징수영수증을 받았다면 파일로 저장해두는 게 좋아요.
      </p>

      <Divider />

      <H2>중간정산 이후 최종 퇴직금 받는 절차</H2>
      <p style={body}>
        퇴직 전에 해야 할 게 몇 가지 있어요.
        특히 인사팀이 재근속 기산일을 잘못 입력하면 퇴직금이 적게 나올 수 있어서
        직접 대조하는 과정이 중요해요.
      </p>

      <Steps steps={STEPS} />

      <p style={body}>
        받은 퇴직금 지급 명세서에서 적용된 근속기간 항목을 직접 확인하세요.
        퇴직금 지급이 14일을 넘기면{" "}
        <a href="/w/퇴직금-지연이자" style={{ color: "#1D9E75", textDecoration: "underline" }}>연 20% 지연이자</a>를 청구할 수 있어요.
      </p>

      <Divider />

      <H2>중간정산 이력자 퇴직금 처리 체크리스트</H2>
      <p style={body}>
        중간정산을 받은 적 있는 분들은 아래 항목을 빠뜨리지 않도록 순서대로 챙기세요.
        재근속 기산일과 세금 공제 부분은 인사팀 계산만 믿지 말고 직접 확인하는 게 안전해요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        최종 퇴직금 = 재근속 기간만 계산 (전체 기간 아님)<br />
        세금도 재근속 기간 근속연수 공제 적용<br />
        원천징수영수증 = 재근속 기산일 증빙 → 반드시 보관<br />
        지급기한 14일 초과 시 연 20% 지연이자 청구 가능
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        중간정산 후 최종 퇴직금 계산에서 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법을 바탕으로 작성됐어요. 법령 개정이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
