"use client";
import { H2, SectionBadge, GreenBox, BorderBox, Divider, body, Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer, ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직금 계산 공식을 정확히 알고 싶어요" },
  { id: "c2", label: "상여금과 수당이 포함되는지 확인하고 싶어요" },
  { id: "c3", label: "회사 계산이 맞는지 검증해보고 싶어요" },
  { id: "c4", label: "DB형·DC형 퇴직연금과 일반 퇴직금 산정이 다른가요?" },
];
const CALC_SLIDERS = [
  { id: "total3m", label: "3개월 총임금 (상여금 환산 포함)", min: 300, max: 3000, step: 50, defaultValue: 900, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "years", label: "근속 기간", min: 1, max: 30, step: 1, defaultValue: 5, format: (v: number) => `${v}년` },
];
const CALC_RESULTS = [
  { label: "퇴직금 (법정 산정 방식)", getValue: (v: Record<string, number>) => Math.round((v.total3m * 10000 / 91) * 30 * v.years), format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`, highlight: true },
  { label: "1일 평균임금", getValue: (v: Record<string, number>) => Math.round(v.total3m * 10000 / 91), format: (v: number) => `약 ${Math.round(v / 10000 * 10) / 10}만원` },
];
const DOCS = [
  { name: "급여명세서 (최근 3개월)", required: true, where: "회사 인사팀" },
  { name: "상여금 지급 내역서", required: true, where: "인사팀 또는 급여명세서" },
  { name: "근로계약서 (입사일 확인)", required: true, where: "인사팀" },
  { name: "퇴직연금 적립금 확인서 (DB·DC형 시)", required: false, where: "금융기관 앱" },
];
const STEPS = [
  { title: "3개월 총임금 산정", desc: "퇴직 전 3개월 기본급 + 고정수당 + 상여금(연간÷12×3)을 합산해요. 실비 변상·임시 지급분은 제외해요. 상여금 환산을 빠뜨리면 퇴직금이 낮게 나와요.", tip: "상여금 = 연간 총액 ÷ 12 × 3" },
  { title: "1일 평균임금 계산", desc: "3개월 총임금 ÷ 3개월 총 일수(89~92일)예요. 달력에서 실제 일수를 세는 게 정확해요. 편의상 91일로 나눠도 큰 차이 없어요.", tip: "2월이 포함되면 일수가 줄어 평균임금이 높아져요" },
  { title: "퇴직금 공식 적용", desc: "1일 평균임금 × 30일 × 근속연수예요. 근속기간이 딱 떨어지지 않으면 일 단위로 계산해요. 예: 근속 547일 = 547÷365 = 1.498년이에요.", tip: "소수점 근속기간도 일 단위로 환산해야 정확" },
  { title: "검증 및 청구", desc: "직접 계산한 값을 회사 계산과 비교해요. 차이가 있으면 인사팀에 재계산을 요청하고, 거부 시 고용노동부에 진정을 내요.", tip: "소멸시효 3년 이내라면 퇴직 후에도 청구 가능" },
];
const CHECKLIST = [
  "3개월 총임금 — 상여금 환산 포함 필수",
  "1일 평균임금 — 실제 총 일수로 나누기",
  "퇴직금 공식 — 1일평균임금×30×근속연수",
  "통상임금 비교 — 낮으면 통상임금 사용 가능",
  "IRP — 300만원 초과 시 의무 수령",
];
const FAQS = [
  { q: "퇴직금 산정 방식이 DB형·DC형과 다른가요?", a: "일반 퇴직금과 DB형은 퇴직 시점 임금 기준이에요. DC형은 매년 연봉의 1/12이 적립돼요. 산정 방식이 달라서 결과도 달라질 수 있어요." },
  { q: "3개월 총임금에 뭐가 포함되나요?", a: "기본급, 고정수당, 상여금(월 환산), 연차수당(기간 내 지급분)이 포함돼요. 실비 변상, 임시 지급분은 제외돼요." },
  { q: "퇴직금 산정 시 근속기간은 어떻게 계산하나요?", a: "입사일부터 퇴직일까지 일 단위로 계산해요. 일 단위를 365로 나눠 연수로 환산해요." },
  { q: "상여금이 산정 기간 내에 들어왔는데 전액 포함하면 되나요?", a: "아니에요. 연간 총액을 12로 나눠 월 환산한 3배(3개월분)를 포함해야 해요. 그달에 지급된 금액 전체를 넣으면 왜곡돼요." },
  { q: "평균임금이 통상임금보다 낮으면 어떻게 되나요?", a: "통상임금을 평균임금으로 사용할 수 있어요. 근로기준법 제2조 2항이 이를 허용해요." },
];
const REFERENCES = [
  { category: "법령", items: [{ label: "근로기준법 제2조 — 평균임금 산정", url: "https://www.law.go.kr/법령/근로기준법" }, { label: "근로자퇴직급여보장법 제8조 — 퇴직금 산정", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" }] },
  { category: "공식 자료", items: [{ label: "고용노동부 — 퇴직금 산정 기준 안내", url: "https://www.moel.go.kr" }] },
];
const RELATED = [
  { slug: "퇴직금-계산-방법", title: "퇴직금 계산 방법 완전 정리", description: "공식부터 단계별 절차까지." },
  { slug: "퇴직금-계산법", title: "퇴직금 계산기", description: "월급·근속기간으로 빠르게 확인." },
  { slug: "퇴직금-평균임금", title: "퇴직금 평균임금 개념", description: "포함 항목과 산정 기준 설명." },
];

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
      {/* 브레드크럼 */}
      <p style={{ fontSize: 13, color: "#6B7280", marginBottom: 8 }}>
        퇴직금 · 산정방식 · 계산공식
      </p>

      {/* H1 */}
      <h1 style={{ fontSize: 26, fontWeight: 800, lineHeight: 1.35, color: "#111827", marginBottom: 6 }}>
        퇴직금 산정 방식, 정확히 어떻게 계산하나요?
      </h1>
      <p style={{ fontSize: 17, fontWeight: 600, color: "#374151", marginBottom: 20 }}>
        법정 공식부터 상여금 환산, 검증 방법까지
      </p>

      {/* 인트로 */}
      <p style={body}>
        퇴직금이 얼마 나올지 막연하게 궁금하셨죠? 회사가 알아서 줄 거라 믿었는데 나중에 보니 계산이 이상한 경우가 꽤 있어요. 근속 5년에 상여금까지 받으면서 일했는데 퇴직금이 생각보다 적게 나왔다면, 산정 방식을 몰라서 그냥 넘어간 거예요.
      </p>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법 제8조</a>에 따라 퇴직금은 딱 하나의 공식으로 계산해요. 1일 평균임금 × 30일 × 근속연수예요. 이 공식이 어떻게 적용되는지, 상여금은 어떻게 넣어야 하는지 아래에서 하나씩 풀어드릴게요.
      </p>

      <ArticleAd position="intro" />

      <Divider />

      {/* H2 1: 산정 공식 */}
      <H2>퇴직금 산정 공식, 이렇게 생겼어요</H2>

      <p style={body}>
        퇴직금 공식은 단순해 보이지만 '평균임금'을 어떻게 뽑느냐가 핵심이에요. 평균임금은 퇴직 전 3개월 동안 지급된 임금 총액을 그 기간의 총 일수로 나눈 값이에요. <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제2조</a>가 이 기준을 정하고 있어요.
      </p>
      <p style={body}>
        여기서 '3개월 임금 총액'에는 기본급만 들어가는 게 아니에요. 고정적으로 지급된 수당, 상여금의 월 환산액, 그리고 산정 기간 내에 지급된 연차수당도 포함돼요. 실비 변상 성격의 비용이나 임시·특별 지급분은 빠져요.
      </p>

      <GreenBox title="퇴직금 법정 공식 요약">
        <p style={{ ...body, marginBottom: 8 }}><strong>퇴직금 = 1일 평균임금 × 30 × 근속연수</strong></p>
        <p style={{ ...body, marginBottom: 4 }}>1일 평균임금 = 퇴직 전 3개월 총임금 ÷ 3개월 총 일수</p>
        <p style={{ ...body, marginBottom: 4 }}>3개월 총임금 = 기본급 + 고정수당 + 상여금 환산(연간÷12×3) + 해당 기간 연차수당</p>
        <p style={{ ...body, marginBottom: 0 }}>근속연수 = 입사일~퇴직일 일 수 ÷ 365 (소수점 포함)</p>
      </GreenBox>

      <p style={body}>
        평균임금이 통상임금보다 낮게 나오는 경우가 있어요. 그럴 땐 <a href="/w/퇴직금-통상임금-계산" style={{ color: "#1D9E75", textDecoration: "underline" }}>통상임금</a>을 평균임금으로 써요. 근로기준법 제2조 제2항이 이를 명시하고 있어서, 회사가 낮은 쪽으로 계산했다면 이의를 제기할 수 있어요.
      </p>

      <Divider />

      {/* H2 2: 계산기 */}
      <H2>내 퇴직금 얼마인지 직접 계산해봐요</H2>

      <p style={body}>
        3개월 총임금을 먼저 준비해야 해요. 급여명세서에서 기본급과 고정수당을 더하고, 연간 상여금을 12로 나눈 뒤 3을 곱해서 합산하면 돼요. 이 값을 아래 계산기에 입력해보세요.
      </p>
      <p style={body}>
        근속기간은 정확한 연수로 입력할수록 결과가 정확해요. 예를 들어 4년 8개월이면 약 4.67년이에요. 소수점 처리가 번거로우면 아래 절차 섹션에서 일 단위 환산법을 참고하세요.
      </p>

      <Calculator sliders={CALC_SLIDERS} results={CALC_RESULTS} />

      <Divider />

      {/* H2 3: 서류 */}
      <H2>산정에 필요한 서류는 이것만 챙기면 돼요</H2>

      <p style={body}>
        퇴직금 산정을 직접 검증하려면 세 가지 서류가 핵심이에요. 최근 3개월 급여명세서, 상여금 지급 내역서, 그리고 근로계약서예요. 이 세 가지만 있으면 회사 계산과 직접 비교할 수 있어요.
      </p>
      <p style={body}>
        퇴직연금(DB형·DC형)에 가입되어 있다면 금융기관 앱에서 적립금 확인서도 뽑아두는 게 좋아요. DB형은 회사가 운용하지만 퇴직 시 지급액은 동일 공식으로 계산되고, DC형은 적립금이 곧 퇴직금이에요.
      </p>

      <DocTable docs={DOCS} />

      <Divider />

      {/* H2 4: 절차 */}
      <H2>단계별로 따라가면 계산 실수가 없어요</H2>

      <p style={body}>
        퇴직금 계산에서 가장 많이 틀리는 부분이 상여금 환산이에요. 상여금이 특정 달에 몰려 지급됐다고 해서 그 금액 전체를 3개월 임금에 넣으면 안 돼요. 반드시 연간 총액을 12로 나눠 월 환산하고 3을 곱해야 해요.
      </p>
      <p style={body}>
        두 번째로 자주 틀리는 부분이 총 일수예요. 3개월이라고 해서 90일로 나누는 사람이 많은데, 실제로는 89일에서 92일까지 달마다 달라요. 퇴직일 기준 3달 전부터 퇴직일까지 달력 일수를 직접 세는 게 가장 정확해요.
      </p>

      <Steps steps={STEPS} />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      {/* H2 5: 체크리스트 */}
      <H2>퇴직금 산정 셀프 체크리스트</H2>

      <p style={body}>
        계산을 마쳤다면 아래 항목을 하나씩 눌러서 빠진 게 없는지 점검해보세요. 상여금 환산 누락이나 통상임금 비교 누락이 가장 흔한 실수예요.
      </p>

      <Checklist items={CHECKLIST} />

      <GreenBox title="IRP 의무 수령 기준 꼭 알아두세요">
        <p style={{ ...body, marginBottom: 0 }}>
          퇴직금이 300만원을 초과하면 IRP(개인형 퇴직연금) 계좌로만 받을 수 있어요. 300만원 이하이거나 만 55세 이상이면 현금 수령도 가능해요. IRP로 받으면 수령 시점까지 세금이 이연되는 장점이 있어요.
        </p>
      </GreenBox>

      <p style={body}>
        퇴직금 지급 기한은 퇴직일로부터 14일이에요. 14일이 지나도 받지 못했다면 연 20% 지연이자를 청구할 수 있어요. <a href="/w/퇴직금-지연이자" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 지연이자 청구 방법</a>에서 구체적인 절차를 볼 수 있어요.
      </p>

      <ArticleAd position="mid" />

      <Divider />

      {/* H2 6: FAQ */}
      <H2>자주 묻는 질문</H2>

      <p style={body}>
        산정 방식에서 헷갈리는 부분을 모아봤어요. 특히 상여금 처리와 DB형·DC형 차이가 가장 많이 나오는 질문이에요.
      </p>

      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법과 근로자퇴직급여보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니, 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
