"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직 전 3개월 급여명세서를 갖고 있어요" },
  { id: "c2", label: "평균임금과 통상임금 중 어느 게 높은지 비교해봤어요" },
  { id: "c3", label: "퇴직 전 3개월에 휴직·병가가 포함되어 있어요" },
  { id: "c4", label: "회사에서 제공한 퇴직금 산정 내역서를 받았어요" },
];

const CHECKLIST = [
  "퇴직 전 3개월 급여명세서 — 세전 총액 기준",
  "통상임금 산정 자료 — 기본급 + 고정수당 합계",
  "휴직·병가 기록 — 산정 제외 기간 확인용",
  "근로계약서·취업규칙 — 회사 자체 산정 기준 확인",
  "퇴직금 산정 내역서 — 회사 계산과 비교용",
];

const FAQS = [
  {
    q: "퇴직금 산정 기준은 법에서 정해주나요?",
    a: "네, 근로자퇴직급여보장법과 근로기준법이 기준을 정하고 있어요. 평균임금이 원칙이고, 통상임금이 하한선이죠.",
  },
  {
    q: "회사가 자체 기준으로 퇴직금을 더 많이 줄 수 있나요?",
    a: "가능해요. 법정 기준은 최소치이고, 취업규칙이나 단체협약으로 더 유리한 조건을 정할 수 있죠. 이 경우 회사 기준이 적용돼요.",
  },
  {
    q: "산전후휴가 기간은 산정에서 빠지나요?",
    a: "네, 산전후휴가 기간과 그 기간의 임금은 평균임금 산정에서 제외돼요. 제외 후 나머지 기간으로 다시 계산하죠.",
  },
  {
    q: "퇴직금 산정에 이의를 제기하면 불이익이 생기나요?",
    a: "법적으로 불이익이 생기면 안 돼요. 정당한 권리 행사에 대한 보복은 근로기준법 위반이죠. 안심하고 이의를 제기하세요.",
  },
  {
    q: "고용노동부 진정을 넣으면 얼마나 걸리나요?",
    a: "보통 1~3개월 정도 걸려요. 사실 조사 후 시정 명령이 내려지면 회사가 차액을 지급해야 하죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 — 퇴직급여 산정", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "근로기준법 제2조 — 평균임금·통상임금 정의", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로기준법 시행령 제2조~제4조 — 평균임금 산정 특례", url: "https://www.law.go.kr/법령/근로기준법시행령" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 — 퇴직금 산정 기준 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-평균임금",
    title: "퇴직금 평균임금 산정 기준",
    description: "퇴직 전 3개월 임금 총액 기반의 산정 방법을 정리했어요.",
  },
  {
    slug: "퇴직금-통상임금-계산",
    title: "퇴직금 통상임금 계산, 언제 적용되나요?",
    description: "평균임금보다 통상임금이 높으면 통상임금이 기준이 돼요.",
  },
  {
    slug: "퇴직금-이의신청",
    title: "퇴직금 이의신청 방법과 절차",
    description: "산정 결과에 이의가 있을 때 고용노동부 진정 절차를 안내해요.",
  },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={
        <Sidebar
          heading="퇴직금 가이드"
          items={퇴직금_SIDEBAR}
          currentSlug="퇴직금-산정-방식"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 근로기준법 · 계산법</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 산정 방식,<br />
        어떤 기준으로 결정되나요?
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;회사에서 퇴직금을 이렇게 계산했다는데, 기준이 뭔지 모르겠어요.&rdquo; 퇴직금 산정의 핵심 기준은 <strong>평균임금</strong>이에요.
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제2조</a>가 정의한 이 금액은 퇴직 전 3개월간 받은 임금 총액을 총 일수로 나눈 거죠.
        여기에 통상임금이라는 하한선이 있고, 회사마다 자체 규정이 다를 수 있어요.
        지금부터 산정 기준, 제외 기간, 회사별 차이, 이의 제기 방법까지 순서대로 정리해드릴게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 */}
      <H2>퇴직금 산정에 사용되는 기준은 뭔가요?</H2>
      <p style={body}>
        법이 정한 기준은 <strong>평균임금</strong>이에요. 퇴직 전 3개월간 지급된 임금 총액을 그 기간의 총 일수(보통 89~92일)로 나눈 금액이죠. 여기서 &ldquo;임금 총액&rdquo;에는 기본급, 고정 수당, 정기 상여금(연간의 3/12), 미사용 연차수당(연간의 3/12)이 포함돼요.
      </p>
      <p style={body}>
        이렇게 산정한 1일 평균임금에 30일을 곱하면 1개월분 퇴직금이 나오고, 근속연수를 곱하면 최종 금액이에요. <strong>1일 평균임금 x 30일 x (재직일수 / 365)</strong>가 퇴직금 산정의 전부죠.
      </p>
      <p style={body}>
        여기에 하한선이 하나 더 있어요. 산정된 평균임금이 <strong>통상임금</strong>(정기적·일률적·고정적 급여)보다 낮으면 통상임금이 기준이 되죠. 근로자에게 불리하지 않도록 법이 안전장치를 둔 거예요. 퇴직금 산정의 출발점은 이 두 가지를 비교하는 것부터 시작해요.
      </p>

      <GreenBox title="퇴직금 산정 기준 요약">
        원칙: <strong>평균임금</strong> (퇴직 전 3개월 임금 총액 / 총 일수)<br />
        하한: <strong>통상임금</strong> (정기·일률·고정 급여)<br />
        둘 중 높은 금액이 퇴직금 산정의 기초가 돼요
      </GreenBox>

      <SectionBadge>내 상황 체크</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="4가지 모두 해당돼요. 아래 내용을 참고해서 산정 결과를 검증해보세요."
        partialMatchText="일부 항목이 빠져 있네요. 급여명세서와 산정 내역서부터 확보하세요."
      />

      <Divider />

      {/* 섹션 2 */}
      <H2>평균임금과 통상임금 중 어느 것을 쓰나요?</H2>
      <p style={body}>
        원칙적으로 <strong>평균임금</strong>을 써요. 퇴직 전 3개월간 실제로 받은 금액을 기반으로 하니까, 근로자의 실질적인 소득 수준을 가장 정확히 반영하죠. 야근수당이나 특근수당이 많았던 달이 포함되면 평균임금이 올라가요.
      </p>
      <p style={body}>
        그런데 퇴직 전 3개월에 야근이 거의 없었거나, 무급휴가로 급여가 줄었다면 평균임금이 <a href="/w/퇴직금-통상임금-계산" style={{ color: "#1D9E75", textDecoration: "underline" }}>통상임금</a>보다 낮아질 수 있어요. 이때는 통상임금이 자동으로 평균임금을 대체하죠. 법이 이 안전장치를 둔 이유는, 일시적으로 급여가 줄었다고 퇴직금까지 깎이면 안 되니까요.
      </p>
      <p style={body}>
        통상임금에 포함되는 항목은 기본급, 직책수당, 자격수당, 고정 식대 등 <strong>정기적·일률적·고정적으로 지급되는 금품</strong>이에요. 야근수당이나 성과급처럼 변동하는 항목은 빠지죠. 본인 급여명세서를 보고 두 금액을 비교해보는 게 첫 번째 단계예요.
      </p>

      <BorderBox title="한눈에 비교">
        <strong>평균임금</strong>: 실제 지급액 기반 (변동 수당 포함) → 원칙<br />
        <strong>통상임금</strong>: 고정 급여만 (변동 수당 제외) → 하한선<br />
        둘 다 산정해보고 높은 쪽을 적용하세요.
      </BorderBox>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 */}
      <H2>산정 기간에 포함되지 않는 기간이 있나요?</H2>
      <p style={body}>
        네, <a href="https://www.law.go.kr/법령/근로기준법시행령" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 시행령 제2조</a>가 정한 제외 기간이 있어요. 대표적으로 <strong>업무 외 부상·질병으로 인한 휴업 기간, 산전후휴가 기간, 육아휴직 기간, 사용자 귀책사유로 인한 휴업 기간</strong>이 해당되죠.
      </p>
      <p style={body}>
        이 기간과 그 기간에 지급된 임금은 평균임금 산정에서 빠져요. 예를 들어 퇴직 전 3개월 중 1개월이 병가였다면, 나머지 2개월의 임금을 2개월의 총 일수로 나눠서 평균임금을 구하죠. 제외하지 않으면 평균이 왜곡되니까요.
      </p>
      <p style={body}>
        육아휴직이 끝나고 바로 퇴직하는 경우가 종종 있어요. 이때 퇴직 전 3개월이 전부 육아휴직이면, 휴직 전 3개월 임금으로 산정해야 하죠. <a href="/w/퇴직금-평균임금" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 평균임금 산정</a>에서 이런 특수한 경우를 더 자세히 다루고 있어요.
      </p>

      <Divider />

      {/* 섹션 4 */}
      <H2>회사마다 산정 방식이 다른가요?</H2>
      <p style={body}>
        법정 기준은 모든 회사에 동일하게 적용돼요. 하지만 <strong>취업규칙이나 단체협약으로 더 유리한 조건</strong>을 정할 수 있죠. 예를 들어 &ldquo;퇴직금은 마지막 월급의 150%로 계산한다&rdquo;는 식의 자체 규정이 가능해요. 이 경우 법정 기준보다 유리하니 그대로 적용되죠.
      </p>
      <p style={body}>
        반대로 법정 기준보다 <strong>불리한 규정은 무효</strong>예요. &ldquo;퇴직금은 기본급만으로 산정한다&rdquo;는 식의 규정이 있어도, 법이 정한 평균임금(고정수당·상여금 포함) 기준보다 적게 나오면 법정 기준을 따라야 하죠.
      </p>
      <p style={body}>
        DC형(확정기여형) 퇴직연금에 가입한 회사는 산정 방식 자체가 달라요. 매년 연봉의 1/12를 적립하는 구조라 &ldquo;퇴직 전 3개월 평균임금&rdquo; 개념이 적용되지 않죠. 본인 회사가 DB형인지 DC형인지에 따라 산정 방식이 근본적으로 다르니, 이 부분을 먼저 확인하세요.
      </p>

      <Divider />

      {/* 섹션 5 */}
      <H2>산정 방식에 이의를 제기할 수 있나요?</H2>
      <p style={body}>
        당연히 할 수 있어요. 회사가 산정한 퇴직금이 법정 기준에 못 미치거나, 포함해야 할 항목을 빠뜨렸다면 <strong>재산정을 요구할 권리</strong>가 있죠. 먼저 회사에 퇴직금 산정 내역서를 서면으로 요청해서, 어떤 항목이 포함·제외됐는지 확인하세요.
      </p>
      <p style={body}>
        회사와 합의가 안 되면 <a href="/w/퇴직금-미지급-신고" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부(1350)에 진정</a>을 넣을 수 있어요. 근로감독관이 사실 조사를 거쳐 시정 명령을 내리죠. 퇴직일로부터 <strong>14일</strong> 이내에 지급하지 않은 차액에 대해서는 <strong>연 20%</strong> 지연이자도 청구할 수 있어요.
      </p>
      <p style={body}>
        소멸시효는 퇴직일로부터 <strong>3년</strong>이에요. 3년이 지나면 청구권 자체가 사라지니, 퇴직 직후에 산정 내역을 확인하고 이상이 있으면 바로 움직이는 게 중요하죠. 급여명세서, 근로계약서, 상여금 지급 내역 등 증빙은 퇴직 전에 미리 확보해두세요.
      </p>

      <GreenBox title="이의 제기 절차">
        1. 퇴직금 산정 내역서 서면 요청<br />
        2. 포함·제외 항목 대조 후 재계산 요청<br />
        3. 합의 불가 시 고용노동부(1350) 진정<br />
        14일 초과 미지급 → <strong>연 20%</strong> 지연이자, 소멸시효 <strong>3년</strong>
      </GreenBox>

      <SectionBadge>준비 서류 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 산정 방식에 대해 자주 나오는 질문을 모았어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법과 근로자퇴직급여보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니, 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
