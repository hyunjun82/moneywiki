"use client";

// Q1. 퇴직을 앞두고 회사가 계산해준 퇴직금이 맞는지 스스로 검산하려는 상황
// Q2. 평균임금과 통상임금 두 기준을 직접 계산해서 유리한 쪽으로 퇴직금 금액을 확정한다
// Q3. 퇴직금 공식(1일 평균임금×30×재직일수÷365), 평균임금에 포함·제외 항목,
//     통상임금 기준, 두 값 비교 원칙(근로기준법 제2조 제2항), 육아휴직·무급휴가 예외
// Q4. GreenBox(공식 요약) + Calculator(비교 계산기) + Steps(단계별 절차) + Checklist(체크) + FAQ
//
// MAP:
// - Q1 → 서론 톤: "회사 계산이 맞는지 모르겠죠?" 공감
// - Q2 → H2 순서: 기준 이해 → 계산기 비교 → 서류 준비 → 단계별 계산 → 체크리스트
// - Q3 → H2 5개, 각 섹션 깊이 있게
// - Q4 → GreenBox(공식) + EligibilityChecker + Calculator + DocTable + Steps + Checklist

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { FAQ } from "@/components/article-ui/FAQ";
import { References } from "@/components/article-ui/References";
import { Disclaimer } from "@/components/article-ui/Disclaimer";
import { 퇴직금_SIDEBAR, 퇴직금_HIGHLIGHT } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직 전 3개월 급여명세서를 갖고 있죠" },
  { id: "c2", label: "기본급 외에 고정수당이나 상여금을 받았어요" },
  { id: "c3", label: "근속기간이 1년 이상이에요" },
  { id: "c4", label: "회사가 계산해준 퇴직금 금액이 의심스러워요" },
];

const CALC_SLIDERS = [
  { id: "avg3m", label: "3개월 평균임금 총액 (상여금 환산 포함)", min: 200, max: 3000, step: 50, defaultValue: 900, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "monthly", label: "월 통상임금 (기본급+고정수당)", min: 150, max: 2000, step: 50, defaultValue: 280, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "years", label: "근속 기간", min: 1, max: 30, step: 1, defaultValue: 5, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "평균임금 기준 퇴직금",
    getValue: (v: Record<string, number>) => Math.round((v.avg3m * 10000 / 91) * 30 * v.years),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "통상임금 기준 퇴직금",
    getValue: (v: Record<string, number>) => Math.round((v.monthly * 10000 / 30) * 30 * v.years),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: false,
  },
  {
    label: "실제 적용 퇴직금 (유리한 것 선택)",
    getValue: (v: Record<string, number>) => {
      const avg = Math.round((v.avg3m * 10000 / 91) * 30 * v.years);
      const usual = Math.round((v.monthly * 10000 / 30) * 30 * v.years);
      return Math.max(avg, usual);
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "급여명세서 (퇴직 전 3개월)", required: true, where: "회사 인사팀" },
  { name: "상여금 지급 내역서 (연간 총액)", required: true, where: "인사팀 또는 급여명세서" },
  { name: "근로계약서 (고정수당 항목 확인)", required: true, where: "인사팀" },
  { name: "연차수당 지급 내역 (산정 기간 내)", required: false, where: "급여명세서 또는 인사팀" },
];

const STEPS = [
  {
    title: "3개월 총임금 산정 (평균임금용)",
    desc: "퇴직 전 3개월 기본급 + 고정수당 + 상여금 월 환산액(연간÷12×3) + 해당 기간 연차수당을 합산해요. 실비 변상이나 임시 지급분은 빼야 해요.",
    tip: "상여금 월 환산 = 연간 총 상여금 ÷ 12 × 3",
  },
  {
    title: "1일 평균임금 계산",
    desc: "3개월 총임금 ÷ 3개월 총 일수(달력 기준 89~92일)예요. 2월이 포함되면 총 일수가 줄어서 1일 평균임금이 높아져요. 편의상 91일을 쓰기도 해요.",
    tip: "정확하게 하려면 달력에서 실제 일수를 세는 게 좋아요",
  },
  {
    title: "월 통상임금 확인 (비교용)",
    desc: "기본급 + 매달 고정적으로 지급되는 수당의 합계예요. 조건 없이 정기적으로 주는 수당이면 통상임금에 포함돼요. 상여금은 지급 조건에 따라 다르니 근로계약서를 보세요.",
    tip: "통상임금 1일 단위 = 월 통상임금 ÷ 30",
  },
  {
    title: "두 금액 비교해서 유리한 것 선택",
    desc: "평균임금이 통상임금보다 낮으면 통상임금을 평균임금으로 사용할 수 있죠. 근로기준법 제2조 제2항에서 이를 명시해요. 두 금액을 계산해서 큰 쪽을 퇴직금 계산에 써요.",
    tip: "이 원칙을 모르면 퇴직금을 덜 받을 수도 있죠",
  },
  {
    title: "퇴직금 공식 적용 후 검증",
    desc: "1일 임금(평균 또는 통상 중 큰 것) × 30일 × 근속연수예요. 근속기간이 딱 떨어지지 않으면 일 단위로 계산해요. 예: 547일 근속 = 547÷365 = 1.498년이에요.",
    tip: "회사 계산 결과와 다르면 인사팀에 재계산 요청 후 고용노동부(1350) 진정 가능",
  },
];

const CHECKLIST = [
  "3개월 총임금: 상여금 월 환산액 포함했는지 체크",
  "실비 변상·임시 지급분: 총임금에서 제외했는지 체크",
  "통상임금: 기본급 + 고정수당으로 정확히 산출했는지 체크",
  "두 기준 비교: 평균임금과 통상임금 중 큰 쪽을 적용했는지 체크",
  "근속기간: 일 단위로 환산해서 소수점 처리했는지 체크",
  "IRP: 퇴직금 300만원 초과 시 IRP 계좌 개설 여부 체크",
];

const FAQS = [
  {
    q: "평균임금과 통상임금이 왜 다른가요?",
    a: "평균임금은 실제로 지급된 임금(상여금, 연차수당 포함)을 3개월로 나눈 실수령 기반이에요. 통상임금은 매달 정기적으로 나오는 기본급+고정수당만 포함해요. 그래서 상여금이 많은 해는 평균임금이 높고, 그 3개월에 상여금이 없으면 통상임금이 더 높게 나오기도 하죠.",
  },
  {
    q: "퇴직 직전에 무급휴가나 결근이 있으면 어떻게 되나요?",
    a: "평균임금이 낮아질 수 있죠. 이때 통상임금이 더 높게 나오는 경우가 많아요. 근로기준법 제2조 제2항에 따라 통상임금을 기준으로 퇴직금을 계산할 수 있으니 꼭 비교해봐야 해요.",
  },
  {
    q: "상여금 전액을 3개월 임금에 넣으면 안 되나요?",
    a: "안 돼요. 연간 총 상여금을 12로 나눠 월 환산한 값의 3배만 포함해요. 3개월 안에 상여금이 한꺼번에 지급됐더라도 그달 지급액 전체를 넣으면 과대 계산이 돼요.",
  },
  {
    q: "회사가 DB형 퇴직연금을 운용 중인데 산정 방식이 같나요?",
    a: "DB(확정급여형)은 일반 퇴직금과 동일하게 퇴직 시점 평균임금 기준으로 계산해요. DC(확정기여형)은 매년 연봉의 1/12이 적립되는 방식이라 산정 기준이 달라요. 본인이 어떤 유형인지 먼저 파악해두는 게 좋아요.",
  },
  {
    q: "회사가 계산한 금액이 내 계산보다 적어요. 어떻게 해야 하나요?",
    a: "먼저 인사팀에 계산 근거를 요청해서 항목별로 비교해요. 차이가 있으면 재계산을 공식 요청하고, 거부하거나 해결이 안 되면 고용노동부 고객상담센터(1350)에 진정을 낼 수 있죠. 소멸시효 3년 이내라면 퇴직 후에도 청구 가능해요.",
  },
  {
    q: "근속기간 계산할 때 육아휴직 기간도 포함되나요?",
    a: "포함돼요. 육아휴직 기간은 근속기간에 포함되고, 평균임금 산정에서는 육아휴직 기간과 그 기간 임금은 빠져요. 결국 나머지 기간 임금으로 평균을 내요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제2조: 평균임금·통상임금 정의", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로자퇴직급여보장법 제8조: 퇴직금 산정 기준", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부: 퇴직금 산정 기준 안내", url: "https://www.moel.go.kr" },
      { label: "고용노동부 고객상담센터 1350", url: "https://minwon.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-평균임금", title: "퇴직금 평균임금 포함 항목 기준", description: "상여금·연차수당 환산 방법 정리." },
  { slug: "통상임금-퇴직금-계산", title: "통상임금으로 퇴직금 계산하는 법", description: "고정수당 포함 기준과 계산 공식." },
  { slug: "퇴직금-계산-방법", title: "퇴직금 계산 방법 단계별 절차", description: "공식부터 검증까지 전체 흐름." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} highlightSlugs={퇴직금_HIGHLIGHT} currentSlug="퇴직금-산정-방식" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 산정방식 · 평균임금 · 통상임금</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 산정 방식, 평균임금이 맞나요 통상임금이 맞나요?<br />
        유리한 기준 선택 방법과 계산 공식
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금 산정 방식에서 가장 많이 헷갈리는 게 평균임금이냐 통상임금이냐죠.
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제2조 제2항</a>은 평균임금이 통상임금보다 낮으면 통상임금을 기준으로 쓰라고 명시해요.
        즉, 무조건 평균임금이 아니라 두 기준을 비교해서 근로자에게 유리한 쪽을 써야 하죠.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>평균임금 vs 통상임금, 어떤 기준이 맞나요?</H2>
      <p style={body}>
        퇴직금 산정의 기본은 평균임금이에요. 퇴직 전 3개월 동안 지급된 임금 총액을 그 기간의 총 일수로 나눈 값이죠.
        여기에 기본급, 고정수당, 상여금 월 환산액, 연차수당이 모두 들어가요.
      </p>
      <p style={body}>
        통상임금은 매달 조건 없이 정기적으로 나오는 기본급과 고정수당의 합계예요.
        상여금이나 실적급은 지급 조건에 따라 통상임금에 포함될 수도, 안 될 수도 있죠.
        퇴직 직전 3개월에 상여금이 없었거나 무급휴가가 끼어 있었다면 평균임금이 낮게 나올 수 있죠.
        그럴 때 통상임금 기준이 더 유리해요.
      </p>

      <GreenBox>
        평균임금 = 퇴직 전 3개월 총임금 ÷ 총 일수 (상여금·연차수당 포함)<br />
        통상임금 = 기본급 + 매달 고정 지급 수당<br />
        <strong>평균임금 &lt; 통상임금이면 → 통상임금 사용 (근로기준법 제2조 제2항)</strong>
      </GreenBox>

      <SectionBadge>내 상황 체크해봐요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="아래 계산기로 두 기준을 비교해서 유리한 쪽으로 퇴직금을 확인해볼 수 있죠."
        partialMatchText="상황에 따라 적용 기준이 달라질 수 있죠. 고용노동부(1350) 상담을 권해요."
      />

      <Divider />

      <H2>평균임금·통상임금 두 기준으로 퇴직금 계산해봐요</H2>
      <p style={body}>
        슬라이더로 3개월 평균임금 총액, 월 통상임금, 근속기간을 설정하면 두 기준의 퇴직금을 동시에 볼 수 있죠.
        실제 적용 퇴직금은 두 값 중 더 높은 쪽으로 나와요.
      </p>
      <p style={body}>
        3개월 총임금에는 상여금 월 환산액을 꼭 포함해야 해요.
        연간 상여금 총액을 12로 나눠 월 환산한 뒤 3을 곱한 값이에요.
        이 항목을 빠뜨리면 평균임금이 낮게 나와서 퇴직금을 덜 받을 수도 있죠.
      </p>

      <SectionBadge>퇴직금 산정 기준 비교 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 평균임금: 3개월 총임금 ÷ 91일 × 30일 × 근속연수. 통상임금: 월 통상임금 ÷ 30 × 30 × 근속연수. 두 값 중 높은 쪽이 실제 적용돼요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>산정에 필요한 서류</H2>
      <p style={body}>
        퇴직금을 직접 검증하려면 최근 3개월 급여명세서와 상여금 내역서가 핵심이에요.
        근로계약서에서 고정수당 항목을 파악해야 통상임금을 정확히 계산할 수 있죠.
      </p>
      <p style={body}>
        회사 인사팀에 자료 요청이 어렵다면 고용노동부(1350)에 임금대장 열람을 요청할 수 있죠.
        퇴직금 분쟁이 생기면 이 서류들이 근거 자료가 돼요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>단계별로 따라가면 계산 실수가 없어요</H2>
      <p style={body}>
        퇴직금 계산에서 가장 많이 틀리는 게 상여금 환산 방법이에요.
        연간 총액을 12로 나눠 월 환산하고 3을 곱해야 하는데, 그달에 실제 지급된 금액을 그대로 넣으면 과대·과소 계산이 생겨요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>계산 전 놓치기 쉬운 포인트 체크</H2>
      <p style={body}>
        평균임금과 통상임금 비교를 빠뜨리는 게 가장 흔한 실수예요.
        퇴직 직전 3개월에 상여금이 없었거나 무급 기간이 끼어 있었다면 통상임금 기준이 유리할 수 있죠.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        퇴직금이 300만원을 넘으면 <a href="/w/퇴직금-IRP-계좌" style={{ color: "#1D9E75", textDecoration: "underline" }}>IRP(개인형 퇴직연금) 계좌</a>로만 받을 수 있죠.<br />
        300만원 이하이거나 만 55세 이상이면 일반 계좌로도 수령 가능해요.<br />
        IRP로 수령하면 퇴직소득세 납부를 연금 수령 시점까지 미룰 수 있죠.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        산정 방식에서 헷갈리는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법과 근로자퇴직급여보장법을 바탕으로 작성됐어요. 제도 변경이 생길 수 있으니 최신 기준은 고용노동부(1350)에서 직접 문의해보세요." />
    </ArticleLayout>
  );
}
