"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "1년 이상 같은 사업장에서 근무했어요" },
  { id: "c2", label: "퇴직 전 3개월 급여명세서를 확보했어요" },
  { id: "c3", label: "상여금·성과급 지급 내역을 알고 있어요" },
  { id: "c4", label: "식대·교통비 등 고정 수당이 급여에 포함돼 있어요" },
];

const CHECKLIST = [
  "최근 3개월 급여명세서 — 평균임금 산정의 핵심 자료",
  "근로계약서 — 기본급, 수당 항목 확인용",
  "상여금 지급 내역 — 연간 상여금의 3/12를 포함해야 해요",
  "연차수당 정산 내역 — 미사용 연차수당 포함 여부 체크",
  "퇴직금 명세서 — 회사가 제공한 계산 내역과 비교용",
];

const FAQS = [
  {
    q: "퇴직금 계산할 때 세전 급여를 쓰나요, 세후를 쓰나요?",
    a: "세전(총지급액) 기준이에요. 4대 보험이나 소득세를 빼기 전 금액으로 평균임금을 계산하죠.",
  },
  {
    q: "수습 기간도 근속연수에 포함되나요?",
    a: "네, 포함돼요. 수습이든 정규직이든 실제 근로를 제공한 기간은 전부 근속연수에 들어가죠.",
  },
  {
    q: "퇴직금 계산기로 나온 금액이 정확한가요?",
    a: "대략적인 금액은 맞지만, 상여금·연차수당 등 변동 항목이 빠지면 차이가 날 수 있어요. 급여명세서를 기준으로 직접 계산해보는 게 정확하죠.",
  },
  {
    q: "월급이 매달 달라지면 어떻게 계산하나요?",
    a: "퇴직 전 3개월간 실제 받은 총액을 그 기간의 총 일수로 나눠요. 매달 금액이 달라도 3개월 평균으로 계산하니 문제없죠.",
  },
  {
    q: "회사가 퇴직금을 적게 계산했다면 어디에 문의하나요?",
    a: "고용노동부(1350)에 진정을 넣을 수 있어요. 14일 이내 미지급 시 연 20% 지연이자가 붙으니 회사 입장에서도 빨리 해결하는 게 유리하죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제34조 — 퇴직급여 제도", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로자퇴직급여보장법 — 퇴직금 산정 기준", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 — 퇴직금 계산 안내", url: "https://www.moel.go.kr" },
      { label: "고용노동부 — 퇴직금 계산기", url: "https://www.moel.go.kr/retirementPay.do" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-평균임금",
    title: "퇴직금 평균임금 산정 기준과 계산법",
    description: "평균임금은 퇴직 전 3개월 총액을 총 일수로 나눈 금액이에요.",
  },
  {
    slug: "퇴직금-상여금-포함",
    title: "퇴직금에 상여금이 포함되는 기준",
    description: "정기 상여금은 연간 총액의 3/12를 3개월 임금에 합산하죠.",
  },
  {
    slug: "퇴직금-통상임금-계산",
    title: "퇴직금 통상임금 계산 방법",
    description: "평균임금이 통상임금보다 낮으면 통상임금이 기준이 돼요.",
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
          currentSlug="퇴직금-계산-방법"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 근로기준법 · 계산법</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 계산 방법, 공식과 실제 사례
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;퇴직금이 얼마나 나올지 감이 안 잡혀요.&rdquo; 당연하죠. 기본급만 넣으면 되는 게 아니라 상여금, 식대, 연차수당까지 빠짐없이 따져야 해요.
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법</a>이 정한 공식은 딱 하나예요. <strong>1일 평균임금 x 30일 x (재직일수 / 365)</strong>. 이 공식에 어떤 항목이 들어가고 빠지는지, 회사 계산과 왜 차이가 나는지까지 지금부터 하나씩 정리해드릴게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 */}
      <H2>퇴직금 계산 공식이 뭔가요?</H2>
      <p style={body}>
        퇴직금 공식은 생각보다 단순해요. <strong>1일 평균임금 x 30일 x (총 재직일수 / 365)</strong>가 전부죠. 여기서 핵심은 &ldquo;1일 평균임금&rdquo;을 얼마로 잡느냐예요. 이 숫자 하나가 퇴직금 전체를 좌우하니까요.
      </p>
      <p style={body}>
        1일 평균임금은 퇴직 전 3개월간 받은 <strong>임금 총액</strong>을 그 기간의 <strong>총 일수</strong>(보통 89~92일)로 나눈 금액이에요. 예를 들어 3개월 임금 총액이 1,200만 원이고 총 일수가 91일이면, 1일 평균임금은 약 131,868원이 되죠.
      </p>
      <p style={body}>
        여기에 30일을 곱하면 1개월분 퇴직금이 나오고, 근속연수를 곱하면 최종 금액이에요. 3년 근무했다면 131,868원 x 30일 x 3 = 약 1,187만 원. 이렇게 계산하면 대략적인 내 퇴직금을 파악할 수 있죠.
      </p>

      <GreenBox title="퇴직금 계산 공식">
        퇴직금 = 1일 평균임금 x 30일 x (재직일수 / 365)<br />
        1일 평균임금 = 퇴직 전 3개월 임금 총액 / 3개월 총 일수<br />
        <strong>14일 이내</strong> 지급이 원칙, 미지급 시 <strong>연 20%</strong> 지연이자
      </GreenBox>

      <SectionBadge>내 상황 체크</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="4가지 모두 해당돼요. 아래 계산 방법대로 직접 계산해보세요."
        partialMatchText="일부 항목이 빠져 있네요. 급여명세서를 먼저 확보한 뒤 계산하세요."
      />

      <Divider />

      {/* 섹션 2 */}
      <H2>평균임금은 어떻게 산정하나요?</H2>
      <p style={body}>
        평균임금 산정의 출발점은 <strong>퇴직 전 3개월</strong>이에요. 퇴직일을 기준으로 역산해서 3개월간 받은 임금을 전부 더하죠. 여기서 &ldquo;임금&rdquo;이란 근로의 대가로 받은 모든 금품을 말해요. 기본급뿐 아니라 정기 상여금, 연차수당, 고정 수당이 모두 해당되죠.
      </p>
      <p style={body}>
        정기 상여금은 3개월이 아니라 <strong>연간 총액의 3/12</strong>를 산입해요. 매달 나오는 게 아니니까 1년치를 월할(月割)로 나누는 거죠. 예를 들어 연 상여금이 600만 원이면, 3개월분은 150만 원(600만 x 3/12)을 더하면 돼요.
      </p>
      <p style={body}>
        연차수당도 마찬가지예요. 퇴직 전 1년간 미사용 연차수당이 발생했다면 그 금액의 3/12를 합산하죠. 이렇게 기본급 + 고정수당 + 상여금(3/12) + 연차수당(3/12)을 모두 합한 뒤 3개월 총 일수로 나누면 1일 평균임금이 나와요.
      </p>

      <BorderBox title="평균임금 vs 통상임금">
        평균임금이 통상임금보다 낮으면 <a href="/w/퇴직금-통상임금-계산" style={{ color: "#1D9E75", textDecoration: "underline" }}>통상임금</a>이 기준이 돼요.<br />
        통상임금은 정기적·일률적·고정적으로 지급되는 금액이죠.<br />
        두 금액을 비교해서 높은 쪽을 적용하는 게 근로자에게 유리해요.
      </BorderBox>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 */}
      <H2>식대·교통비도 포함되나요?</H2>
      <p style={body}>
        이게 제일 헷갈리는 부분이죠. 결론부터 말하면, <strong>고정적·정기적으로 지급되는 식대와 교통비는 포함</strong>돼요. 매달 빠짐없이 10만 원씩 식대를 받았다면 그건 근로의 대가이니 평균임금에 넣어야 하죠.
      </p>
      <p style={body}>
        반면, 실비 정산 방식(영수증 제출 후 지급)은 포함되지 않아요. 실비는 근로의 대가가 아니라 비용 보전이니까요. 같은 식대라도 지급 방식에 따라 결과가 달라지는 거예요. 본인 급여명세서에 &ldquo;식대&rdquo;가 고정 항목으로 잡혀 있으면 포함이고, 별도 정산이면 제외되죠.
      </p>
      <p style={body}>
        자가운전보조금, 직책수당, 야근수당도 마찬가지 기준이에요. 매달 정해진 금액이 나오면 포함, 실제 발생분만 정산하면 제외. 이 구분을 모르면 회사가 빼놓아도 알아차리기 어렵죠. 급여명세서를 한 줄씩 짚어보면서 고정 항목인지 변동 항목인지 나눠보세요.
      </p>

      <Divider />

      {/* 섹션 4 */}
      <H2>계산해보니 예상보다 적은 이유는 뭔가요?</H2>
      <p style={body}>
        직접 계산했는데 예상보다 적다면, 대부분 <strong>상여금이나 연차수당을 빠뜨린 경우</strong>예요. 기본급만으로 계산하면 실제보다 20~30% 낮게 나올 수 있죠. 연간 상여금의 3/12, 미사용 연차수당의 3/12를 꼭 합산해야 해요.
      </p>
      <p style={body}>
        퇴직 전 3개월에 무급휴가, 병가, 육아휴직이 끼어 있었다면 그 기간을 제외하고 평균임금을 다시 산정해야 하는 경우도 있어요. 그냥 3개월 총액을 나누면 평균이 깎이니까요. <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 시행령</a>에서 이런 제외 기간을 별도로 규정하고 있죠.
      </p>
      <p style={body}>
        회사에서 제공한 퇴직금 명세서가 있다면 항목별로 대조해보세요. 어떤 수당을 포함했고 어떤 수당을 뺐는지 확인할 수 있어요. 차이가 나면 회사 인사팀에 근거를 요청하면 되고, 해결이 안 되면 고용노동부(1350)에 진정을 넣을 수 있죠.
      </p>

      <Divider />

      {/* 섹션 5 */}
      <H2>회사 계산과 내 계산이 다를 때는?</H2>
      <p style={body}>
        계산 차이가 나는 가장 흔한 원인은 <strong>상여금·수당 포함 범위</strong>예요. 회사는 기본급만 넣고 계산하는 경우가 적지 않거든요. 정기 상여금, 식대, 직책수당 등이 빠져 있다면 재계산을 요구할 수 있어요.
      </p>
      <p style={body}>
        우선 회사에 퇴직금 산정 내역서를 서면으로 요청하세요. 어떤 항목이 들어갔고 빠졌는지 확인한 뒤, 본인이 계산한 금액과 비교하면 되죠. 대부분 이 단계에서 차이 원인이 드러나요.
      </p>
      <p style={body}>
        합의가 안 되면 <a href="/w/퇴직금-미지급-신고" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부에 진정</a>을 넣을 수 있어요. 퇴직일로부터 <strong>14일 이내</strong>에 퇴직금을 지급하지 않으면 <strong>연 20%</strong> 지연이자가 붙고, 소멸시효는 <strong>3년</strong>이에요. 시간은 넉넉하지만 증빙 자료(급여명세서, 근로계약서)를 미리 확보해두는 게 유리하죠.
      </p>

      <GreenBox title="퇴직금 미지급 시 대응">
        퇴직일로부터 14일 이내 미지급 → 연 20% 지연이자 발생<br />
        고용노동부(1350)에 진정 가능<br />
        퇴직금 청구 소멸시효는 퇴직일로부터 <strong>3년</strong>
      </GreenBox>

      <SectionBadge>준비 서류 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 계산과 관련해서 실제로 자주 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법과 근로자퇴직급여보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니, 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
