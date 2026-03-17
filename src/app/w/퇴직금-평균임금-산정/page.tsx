"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직 전 3개월 동안 계속 근로했어요" },
  { id: "c2", label: "퇴직 전 3개월 급여명세서를 확보했어요" },
  { id: "c3", label: "육아휴직·업무상 재해 요양 기간이 없었어요" },
  { id: "c4", label: "3개월 기간 중 무급 결근이나 정직 기간이 없었어요" },
];

const CALC_SLIDERS = [
  { id: "wage3m", label: "3개월 임금 합계", min: 200, max: 3000, step: 50, defaultValue: 900, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "days3m", label: "3개월 총 일수", min: 88, max: 93, step: 1, defaultValue: 91, format: (v: number) => `${v}일` },
];

const CALC_RESULTS = [
  {
    label: "1일 평균임금",
    getValue: (v: Record<string, number>) => Math.round((v.wage3m * 10000) / v.days3m),
    format: (v: number) => `약 ${Math.round(v / 1000).toLocaleString()}천원`,
    highlight: true,
  },
  {
    label: "퇴직금 1년치 기준 (30일)",
    getValue: (v: Record<string, number>) => Math.round((v.wage3m * 10000) / v.days3m * 30),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "급여명세서 (최근 3개월)", required: true, where: "회사 인사팀 요청" },
  { name: "임금대장 또는 급여이체 내역", required: true, where: "회사 또는 거래 은행" },
  { name: "상여금·성과급 지급 규정 또는 내역", required: false, where: "회사 인사팀" },
  { name: "육아휴직·요양 기간 확인서 (해당자)", required: false, where: "고용보험 또는 근로복지공단" },
];

const STEPS = [
  {
    title: "산정 기간 확정",
    desc: "퇴직일 기준 역산 3개월이 산정 기간이에요. 퇴직일이 3월 31일이면 1월 1일~3월 31일이 해당돼요. 급여 지급일 기준이 아니라 실제 근무 기간 기준이에요.",
    tip: "퇴직일이 월 중순이면 3개월이 두 달 반이 될 수도 있어요",
  },
  {
    title: "산정 제외 기간 확인",
    desc: "육아휴직, 업무상 재해 요양, 출산휴가, 사용자 귀책 휴업 기간은 산정에서 빠져요. 해당 기간과 그 기간에 지급된 임금 모두 제외해요. 제외 기간이 있으면 3개월 범위를 그만큼 앞으로 당겨서 산정해야 해요.",
    tip: "육아휴직 기간을 포함하면 평균임금이 낮아질 수 있어요 — 제외가 근로자에게 유리해요",
  },
  {
    title: "임금 총액 합산",
    desc: "기본급, 고정 수당, 상여금(연간 총액 ÷ 12 × 3), 연차수당(기간 내 지급분)을 모두 더해요. 실비변상·경조금·임시 지급 항목은 제외예요. 상여금 환산이 빠지면 수십~수백만원 손해예요.",
    tip: "항목별 포함 여부가 헷갈리면 퇴직금-평균임금-산정-3개월-임금-계산-기준 글을 보세요",
  },
  {
    title: "1일 평균임금 계산",
    desc: "3개월 임금 합계를 3개월 총 일수로 나눠요. 총 일수는 달력에서 직접 세야 해요(88~93일). 제외 기간이 있는 경우엔 총 일수도 그만큼 빼요.",
    tip: "평균임금이 통상임금보다 낮으면 통상임금으로 계산할 수 있어요",
  },
];

const CHECKLIST = [
  "산정 기간: 퇴직일 기준 역산 3개월 — 급여 지급일 기준 아님",
  "제외 기간: 육아휴직·업무상 재해 요양은 기간·임금 모두 제외",
  "상여금: 연간 총액 ÷ 12 × 3으로 3개월분 환산 포함",
  "총 일수: 달력 기준 실제 일수 (제외 기간 있으면 차감)",
  "통상임금 비교: 평균임금이 낮으면 통상임금으로 계산 가능",
];

const FAQS = [
  {
    q: "육아휴직 기간도 포함해서 평균임금을 계산해야 하나요?",
    a: "아니에요. 육아휴직 기간과 그 기간의 임금은 산정에서 제외돼요. 육아휴직 급여는 통상임금의 일부라서 포함하면 평균임금이 낮아지거든요. 근로기준법 시행령 제2조가 이 기간을 명시적으로 제외하고 있어요.",
  },
  {
    q: "업무상 재해로 요양하다 퇴직하면 어떻게 계산하나요?",
    a: "요양 기간과 그 기간 임금을 모두 제외하고 3개월을 역산해요. 예를 들어 6개월 요양 후 퇴직했다면, 요양 시작 전 3개월이 산정 기간이 돼요.",
  },
  {
    q: "산정 기간 중 무급 결근이 있으면 일수를 빼야 하나요?",
    a: "무급 결근은 제외 기간에 해당하지 않아요. 산정 기간에 그대로 포함되고, 결근한 날의 임금이 없으면 그냥 분모인 총 일수가 늘어나서 평균임금이 낮아지는 효과가 생겨요.",
  },
  {
    q: "3개월 총 일수가 91일인지 92일인지 왜 중요한가요?",
    a: "같은 임금이어도 총 일수가 1일 다르면 1일 평균임금이 달라져요. 근속기간이 길면 그 차이가 누적돼서 최종 퇴직금 금액이 달라질 수 있어요. 달력에서 직접 세는 게 가장 정확해요.",
  },
  {
    q: "평균임금이 통상임금보다 낮게 나오면 어떻게 하나요?",
    a: "통상임금을 평균임금으로 사용할 수 있어요. 근로기준법 제2조 2항이 이를 보장해요. 두 가지 모두 계산해서 높은 쪽을 선택하는 게 합법적 권리예요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제2조: 평균임금 정의 및 산정 방법", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로기준법 시행령 제2조: 평균임금 산정 제외 기간", url: "https://www.law.go.kr/법령/근로기준법시행령" },
      { label: "근로자퇴직급여보장법 제8조: 퇴직금 산정 기준", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부: 평균임금 산정 방법 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-평균임금", title: "퇴직금 평균임금 개념 정리", description: "평균임금이란 무엇이고 어떻게 쓰이는지 먼저 정리했어요." },
  { slug: "퇴직금-계산-방법", title: "퇴직금 계산 방법 전체 정리", description: "평균임금 × 30 × 근속연수 공식 적용 예시예요." },
  { slug: "퇴직금-평균임금-근속연수", title: "근속연수별 퇴직금 계산", description: "근속기간이 딱 맞지 않을 때 일 단위 계산 방법이에요." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-평균임금-산정" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 평균임금 · 산정방법</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 평균임금 산정, 어떻게 하나요?<br />
        산정 기간·제외 기간·공식 한 번에 정리
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        <a href="/w/퇴직금-평균임금" style={{ color: "#1D9E75", textDecoration: "underline" }}>평균임금</a>은 퇴직 전 3개월 임금 합계를 총 일수로 나눠서 구해요.
        여기서 '3개월'이 어디부터 어디까지인지, 육아휴직이나 업무상 재해 기간이 있으면 어떻게 처리하는지가 핵심이에요.
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제2조</a>와 시행령 제2조가 산정 기간과 제외 기간을 구체적으로 정하고 있어요.
        이 기준대로 계산하지 않으면 퇴직금이 실제보다 낮게 나올 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>산정 특례, 내게 해당되는 사유가 있나요?</H2>
      <p style={body}>
        3개월 산정 기간 안에 육아휴직, 업무상 재해 요양, 출산전후휴가, 사용자 귀책 휴업 기간이 포함돼 있으면 그 기간을 빼고 계산해요.
        이 기간들은 임금이 없거나 평소보다 낮기 때문에 포함하면 평균임금이 낮아지거든요.
        근로자 보호를 위해 <a href="https://www.law.go.kr/법령/근로기준법시행령" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 시행령 제2조</a>가 이 기간을 명시적으로 제외하고 있어요.
      </p>
      <p style={body}>
        제외 기간이 있으면 산정 기간을 그만큼 앞으로 당겨요.
        6개월 육아휴직 후 퇴직했다면 육아휴직 시작 전 3개월이 산정 기간이 돼요.
        <a href="/w/퇴직금-육아휴직" style={{ color: "#1D9E75", textDecoration: "underline" }}>육아휴직 중 퇴직금 계산</a>이 헷갈린다면 별도 글을 참고하세요.
      </p>

      <GreenBox title="평균임금 산정 제외 기간 (근로기준법 시행령 제2조)">
        업무상 재해 요양 기간<br />
        출산전후휴가 기간<br />
        육아휴직 기간<br />
        사용자 귀책 휴업 기간<br />
        쟁의행위 기간<br />
        병역의무 이행 기간 (사용자 동의 하에)
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="특례 없이 퇴직 전 3개월 그대로 산정할 수 있어요. 아래 계산기로 바로 확인해보세요."
        partialMatchText="산정 제외 기간이 있을 수 있어요. 3단계 절차를 따라 제외 기간을 먼저 확인하세요."
      />

      <Divider />

      <H2>1일 평균임금 계산기</H2>
      <p style={body}>
        3개월 임금 합계와 총 일수를 입력하면 1일 평균임금과 퇴직금 1년치 기준이 바로 나와요.
        상여금은 연간 총액 ÷ 12 × 3으로 3개월분 환산 금액을 미리 더해서 임금 합계에 넣으세요.
        이 계산기는 제외 기간이 없는 일반적인 경우를 기준으로 해요.
      </p>

      <SectionBadge>1일 평균임금 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 3개월 임금 합계 ÷ 총 일수 = 1일 평균임금. 1일 평균임금 × 30 = 퇴직금 1년치 기준."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>산정에 필요한 서류</H2>
      <p style={body}>
        3개월 급여명세서가 핵심 서류예요. 상여금이 있다면 연간 지급 내역도 함께 확보해야 환산이 가능해요.
        퇴직 후엔 서류 발급이 어려울 수 있으니 재직 중에 미리 챙겨두세요.
        퇴직 후에도 <a href="https://www.moel.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부</a>를 통해 임금 지급 내역 확인을 요청할 수 있어요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>평균임금 산정 절차 4단계</H2>
      <p style={body}>
        산정 기간 확정 → 제외 기간 확인 → 임금 합산 → 일수 나누기 순서예요.
        2단계에서 제외 기간이 나오면 1단계로 돌아가 기간을 다시 설정해야 해요.
        상여금 환산이 가장 실수가 잦은 단계예요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>산정 전 체크리스트</H2>
      <p style={body}>
        빠뜨리기 쉬운 항목들이에요. 특히 제외 기간과 상여금 환산은 꼭 확인하세요.
        이미 퇴직금을 받았어도 3년 내라면 차액을 청구할 수 있어요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="평균임금 vs 통상임금, 높은 쪽으로 받을 수 있어요">
        평균임금이 통상임금보다 낮게 나오면 통상임금으로 퇴직금을 계산해요.<br />
        근로기준법 제2조 2항이 근로자 보호 조항으로 이를 명시해요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        평균임금 산정에서 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법 및 시행령을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
