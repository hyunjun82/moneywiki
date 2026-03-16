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
  { id: "c2", label: "야근·특근 수당이 매달 다른 금액으로 나와요" },
  { id: "c3", label: "상여금이 분기별 또는 연 단위로 지급돼요" },
  { id: "c4", label: "평균임금과 통상임금 중 어느 게 높은지 비교해봤어요" },
];

const CHECKLIST = [
  "퇴직 전 3개월 급여명세서 — 총지급액(세전) 기준",
  "연간 상여금 내역 — 정기 상여금 3/12 합산용",
  "야근·특근 수당 내역 — 3개월간 실제 지급액",
  "연차수당 정산 내역 — 미사용 연차수당 3/12",
  "통상임금 산정 자료 — 평균임금과 비교용",
];

const FAQS = [
  {
    q: "퇴직 전 3개월이 정확히 어떤 기간인가요?",
    a: "퇴직일을 기준으로 역산한 3개월이에요. 예를 들어 3월 31일 퇴직이면 1월 1일~3월 31일이 아니라, 12월 31일~3월 30일이 되는 식이죠. 퇴직일 당일은 빠지는 게 일반적이에요.",
  },
  {
    q: "3개월 중 병가나 무급휴가가 있었는데요?",
    a: "병가·무급휴가 기간과 그 기간에 해당하는 임금은 산정에서 제외해요. 나머지 기간의 임금을 나머지 일수로 나누는 거죠.",
  },
  {
    q: "1일 평균임금과 1일 통상임금은 뭐가 다른가요?",
    a: "평균임금은 실제 받은 금액 기반이고, 통상임금은 정기적·일률적·고정적 급여만 포함해요. 야근이 많았던 달에는 평균임금이 높고, 야근이 없으면 통상임금이 높을 수 있죠.",
  },
  {
    q: "평균임금이 최저임금보다 낮게 나올 수 있나요?",
    a: "산정 결과가 최저임금보다 낮으면 최저임금이 평균임금이 돼요. 근로기준법 시행령에서 이 하한선을 정해놓고 있죠.",
  },
  {
    q: "잘못 계산된 평균임금으로 퇴직금을 받았다면?",
    a: "차액을 추가 청구할 수 있어요. 퇴직일로부터 3년 이내라면 고용노동부에 진정을 넣어서 재계산을 요구할 수 있죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제2조 — 평균임금의 정의", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로기준법 시행령 제2조~제4조 — 평균임금 산정 특례", url: "https://www.law.go.kr/법령/근로기준법시행령" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 — 평균임금 산정 기준 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-평균임금-산정",
    title: "퇴직금 평균임금 산정 기준과 사례",
    description: "3개월 임금 총액을 정확히 잡는 방법을 사례로 풀어드려요.",
  },
  {
    slug: "퇴직금-통상임금-계산",
    title: "퇴직금 통상임금 계산, 언제 적용되나요?",
    description: "평균임금이 통상임금보다 낮으면 통상임금이 기준이 돼요.",
  },
  {
    slug: "퇴직금-계산-방법",
    title: "퇴직금 계산 방법, 공식과 실제 사례",
    description: "1일 평균임금 x 30일 x 근속연수 공식을 단계별로 설명해요.",
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
          currentSlug="퇴직금-계산-평균임금-공식"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 근로기준법 · 계산법</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 평균임금 공식,<br />
        어떻게 적용하나요?
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;평균임금이 뭔지는 아는데, 정확히 어떻게 계산하는 건지 모르겠어요.&rdquo; 많은 분이 여기서 막히죠.
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제2조</a>가 정의한 평균임금은 <strong>퇴직 전 3개월간 지급된 임금 총액을 그 기간의 총 일수로 나눈 금액</strong>이에요.
        단순해 보이지만, 야근수당이 들쭉날쭉하거나 상여금 지급 시기가 불규칙하면 계산이 꽤 복잡해지죠.
        지금부터 공식 구조, 3개월 기준의 의미, 불규칙 수당 처리법, 통상임금과의 비교까지 한꺼번에 정리해드릴게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 */}
      <H2>평균임금 공식이 정확히 뭔가요?</H2>
      <p style={body}>
        공식은 이렇게 생겼어요. <strong>1일 평균임금 = 퇴직 전 3개월간 임금 총액 / 그 기간의 총 일수</strong>. 여기서 &ldquo;임금 총액&rdquo;이란 근로의 대가로 받은 모든 금품이에요. 기본급, 고정 수당(식대·교통비), 정기 상여금(연간 총액의 3/12), 미사용 연차수당(연간의 3/12)이 전부 포함되죠.
      </p>
      <p style={body}>
        &ldquo;총 일수&rdquo;는 달력상 일수예요. 출근한 날만 세는 게 아니라 주말, 공휴일까지 전부 포함하죠. 3개월이면 보통 89~92일 사이가 돼요. 이 일수로 임금 총액을 나누면 하루치 평균임금이 나오는 거예요.
      </p>
      <p style={body}>
        산정 결과가 <strong>통상임금</strong>보다 낮으면 통상임금을 평균임금으로 간주해요. 이건 <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제2조 제2항</a>에 명시된 규정이죠. 근로자에게 불리하지 않도록 하한선을 두는 장치예요.
      </p>

      <GreenBox title="평균임금 공식 요약">
        1일 평균임금 = 3개월 임금 총액 / 3개월 총 일수<br />
        임금 총액 = 기본급 + 고정수당 + 상여금(3/12) + 연차수당(3/12)<br />
        평균임금 &lt; 통상임금이면 → <strong>통상임금</strong>이 기준
      </GreenBox>

      <SectionBadge>내 상황 체크</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="4가지 모두 해당돼요. 아래 내용을 따라 정확한 평균임금을 계산해보세요."
        partialMatchText="일부 항목이 빠져 있네요. 급여명세서를 먼저 확보하고 시작하세요."
      />

      <Divider />

      {/* 섹션 2 */}
      <H2>퇴직 전 3개월 기준이란 뭔가요?</H2>
      <p style={body}>
        &ldquo;퇴직 전 3개월&rdquo;은 <strong>퇴직일을 기준으로 역산한 3개월</strong>이에요. 3월 15일에 퇴직했다면 12월 15일~3월 14일이 산정 기간이 되죠. 달력 기준이라 28일이든 31일이든 그대로 세면 돼요.
      </p>
      <p style={body}>
        왜 하필 3개월일까요? 너무 짧으면 특정 달의 야근수당이나 상여금에 좌우되고, 너무 길면 최근 임금 수준을 반영하지 못하죠. 3개월이 적절한 균형점이라고 법이 판단한 거예요.
      </p>
      <p style={body}>
        주의할 점이 하나 있어요. 이 3개월 안에 <strong>업무 외 사유로 쉰 기간</strong>(병가, 무급휴가, 산전후휴가 등)이 있다면 그 기간과 그에 해당하는 임금은 산정에서 빠져요. 근로기준법 시행령 제2조가 이런 &ldquo;제외 기간&rdquo;을 별도로 규정하고 있죠. 제외 후 남은 기간과 임금으로 다시 나누면 돼요.
      </p>

      <BorderBox title="3개월 산정 기간 예시">
        퇴직일: 2026년 3월 15일<br />
        산정 기간: 2025년 12월 15일 ~ 2026년 3월 14일 (총 90일)<br />
        이 기간 중 무급병가 10일 → 제외 후 80일 기준으로 재산정
      </BorderBox>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 */}
      <H2>불규칙 수당이 있을 때 계산은?</H2>
      <p style={body}>
        야근수당, 특근수당, 당직수당처럼 매달 금액이 달라지는 항목이 바로 불규칙 수당이에요. 이런 수당은 <strong>3개월간 실제 지급된 금액을 그대로 합산</strong>하면 돼요. 1월에 30만 원, 2월에 15만 원, 3월에 45만 원이었다면 합계 90만 원을 3개월 총액에 넣는 거죠.
      </p>
      <p style={body}>
        문제는 퇴직 직전 3개월에 유독 야근이 많았거나 적었을 때예요. 3개월 기준이니까 그 기간의 실제 금액이 그대로 반영되죠. 야근이 많았던 시기에 퇴직하면 평균임금이 올라가고, 한가했던 시기라면 내려가요.
      </p>
      <p style={body}>
        회사가 &ldquo;야근수당은 변동이라 빼겠다&rdquo;고 하면 안 돼요. 불규칙하더라도 근로의 대가로 받은 금품이면 임금이에요. <a href="/w/퇴직금-평균임금-산정" style={{ color: "#1D9E75", textDecoration: "underline" }}>평균임금 산정 기준</a>에서 이 부분을 자세히 다루고 있으니 참고하세요.
      </p>

      <Divider />

      {/* 섹션 4 */}
      <H2>평균임금이 통상임금보다 낮으면 어떻게 되나요?</H2>
      <p style={body}>
        <strong>통상임금이 평균임금을 대신해요.</strong> 근로기준법 제2조 제2항이 이걸 명시하고 있죠. 평균임금은 실제 지급액 기반이라 야근이 없었던 달에는 낮아질 수 있어요. 이때 정기적·일률적·고정적 급여만 따지는 통상임금이 오히려 높게 나오는 거예요.
      </p>
      <p style={body}>
        통상임금에 포함되는 항목은 <strong>기본급 + 고정 수당(직책수당, 자격수당, 식대 등)</strong>이에요. 야근수당이나 성과급처럼 변동하는 항목은 빠지죠. 그래서 야근이 거의 없는 사무직이라면 평균임금과 통상임금이 비슷하거나 통상임금이 더 높을 수 있어요.
      </p>
      <p style={body}>
        두 금액을 비교하는 건 회사의 의무예요. 비교 없이 평균임금만으로 퇴직금을 지급했는데, 나중에 통상임금이 더 높았다는 게 밝혀지면 차액을 추가 청구할 수 있죠. <a href="/w/퇴직금-통상임금-계산" style={{ color: "#1D9E75", textDecoration: "underline" }}>통상임금 계산 방법</a>을 참고해서 본인 통상임금을 미리 파악해두세요.
      </p>

      <Divider />

      {/* 섹션 5 */}
      <H2>잘못 계산된 평균임금, 어떻게 바로잡나요?</H2>
      <p style={body}>
        먼저 회사에 <strong>퇴직금 산정 내역서</strong>를 요청하세요. 어떤 항목을 넣고 어떤 항목을 뺐는지 확인할 수 있어요. 상여금 3/12를 안 넣었거나, 고정 수당을 빼놓은 경우가 가장 흔하죠.
      </p>
      <p style={body}>
        차이가 확인되면 인사팀에 재계산을 요청하고, 응하지 않으면 <a href="/w/퇴직금-미지급-신고" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부(1350)에 진정</a>을 넣을 수 있어요. 퇴직일로부터 <strong>14일</strong> 이내 미지급(차액 포함) 시 <strong>연 20%</strong> 지연이자가 발생하죠.
      </p>
      <p style={body}>
        퇴직금 청구 소멸시효는 퇴직일로부터 <strong>3년</strong>이에요. 3년 안에 청구하지 않으면 권리가 소멸되니, 퇴직 직후 급여명세서와 근로계약서를 반드시 확보해두세요. 나중에 자료를 다시 구하려면 훨씬 어려워지거든요.
      </p>

      <GreenBox title="평균임금 오류 대응 절차">
        1. 퇴직금 산정 내역서 서면 요청<br />
        2. 항목별 포함·제외 대조 후 재계산 요청<br />
        3. 미해결 시 고용노동부(1350) 진정<br />
        14일 초과 미지급 → <strong>연 20%</strong> 지연이자, 소멸시효 <strong>3년</strong>
      </GreenBox>

      <SectionBadge>준비 서류 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        평균임금 공식과 관련해서 자주 나오는 질문을 정리했어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니, 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
