"use client";
import { H2, SectionBadge, GreenBox, BorderBox, Divider, body, Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer, ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "기본급 외 고정 수당이 있어요" },
  { id: "c2", label: "평균임금이 통상임금보다 낮게 나왔어요" },
  { id: "c3", label: "어떤 기준으로 계산하는 게 더 유리한지 모르겠어요" },
  { id: "c4", label: "회사가 기본급만으로 퇴직금을 계산하고 있어요" },
];
const CALC_SLIDERS = [
  { id: "base", label: "월 기본급", min: 150, max: 500, step: 10, defaultValue: 280, format: (v: number) => `${v}만원` },
  { id: "fixed", label: "고정 수당 합계 (월)", min: 0, max: 150, step: 5, defaultValue: 50, format: (v: number) => `${v}만원` },
];
const CALC_RESULTS = [
  { label: "통상임금 기준 퇴직금 (1년)", getValue: (v: Record<string, number>) => (v.base + v.fixed) * 10000, format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원/년`, highlight: true },
  { label: "기본급만 기준 퇴직금 (1년)", getValue: (v: Record<string, number>) => v.base * 10000, format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원/년` },
];
const DOCS = [
  { name: "근로계약서 (수당 내역 포함)", required: true, where: "인사팀 또는 입사 시 수령본" },
  { name: "급여명세서 (최근 3개월)", required: true, where: "회사 인사팀" },
  { name: "상여금 지급 규정", required: false, where: "인사팀" },
  { name: "수당 지급 기준 서류", required: false, where: "취업규칙 또는 인사팀" },
];
const STEPS = [
  { title: "평균임금 계산", desc: "퇴직 전 3개월 총임금(기본급+상여금+수당) ÷ 3개월 총 일수로 1일 평균임금을 구해요. 이 값으로 퇴직금을 계산하면 평균임금 기준 퇴직금이 나와요.", tip: "상여금은 연간 총액 ÷ 12로 환산해서 포함" },
  { title: "통상임금 계산", desc: "기본급 + 정기적·일률적·고정적으로 지급되는 수당의 합이에요. 성과급처럼 지급 여부가 불확실한 건 빠져요. 매월 고정 지급되는 식대·교통비·직책수당은 포함돼요.", tip: "통상임금은 1시간치로 환산해서 계산하기도 해요" },
  { title: "높은 쪽 선택", desc: "평균임금 기준과 통상임금 기준 퇴직금 중 높은 쪽을 선택할 수 있어요. 근로기준법 제2조 2항이 이를 허용해요. 두 금액을 모두 계산해서 비교해보세요.", tip: "고정 수당이 많을수록 통상임금 기준이 유리해요" },
  { title: "퇴직금 청구", desc: "선택한 기준으로 회사에 지급을 요청해요. 회사가 거부하면 고용노동부에 진정을 낼 수 있어요. 소멸시효 3년 이내에 청구해야 해요.", tip: "청구 내용을 문서로 남겨두세요" },
];
const CHECKLIST = [
  "통상임금 구성 — 정기·일률·고정 수당만 포함",
  "평균임금도 계산 — 두 가지 비교",
  "높은 쪽으로 청구 — 근로기준법 허용",
  "고정 수당 입증 — 근로계약서·취업규칙",
  "IRP 계좌 — 300만원 초과 시 필수",
];
const FAQS = [
  { q: "통상임금이 뭔가요?", a: "기본급에 정기적·일률적·고정적으로 지급되는 수당을 더한 금액이에요. 성과급처럼 지급 여부가 불확실한 건 포함 안 돼요." },
  { q: "평균임금과 통상임금 중 어느 게 더 높게 나오나요?", a: "야근수당이 많은 달이 포함되면 평균임금이 높고, 기본급 외 고정수당이 많으면 통상임금이 높을 수 있어요." },
  { q: "식대 20만원이 통상임금에 포함되나요?", a: "매월 모든 근로자에게 정기적·일률적으로 지급된다면 통상임금에 해당해요." },
  { q: "성과급은 통상임금인가요?", a: "원칙적으로 아니에요. 지급 여부와 금액이 실적에 따라 달라지면 고정성이 없어서 제외돼요." },
  { q: "회사가 통상임금 기준 적용을 거부하면?", a: "고용노동부에 진정을 낼 수 있어요. 증빙 서류를 갖추고 이의를 제기하세요." },
];
const REFERENCES = [
  { category: "법령", items: [{ label: "근로기준법 제2조 — 통상임금·평균임금 정의", url: "https://www.law.go.kr/법령/근로기준법" }] },
  { category: "공식 자료", items: [{ label: "고용노동부 — 통상임금 산정 지침", url: "https://www.moel.go.kr" }] },
];
const RELATED = [
  { slug: "통상임금-퇴직금-계산", title: "통상임금 vs 기본급 퇴직금 비교", description: "두 기준 차이와 유리한 방법 선택." },
  { slug: "퇴직금-평균임금", title: "퇴직금 평균임금 계산", description: "3개월 평균임금 포함 항목 정리." },
  { slug: "퇴직금-상여금-포함", title: "상여금 퇴직금 포함 여부", description: "상여금 환산 방법과 기준." },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar data={퇴직금_SIDEBAR} currentSlug="퇴직금-통상임금-계산" />}
    >
      {/* 브레드크럼 */}
      <p style={{ fontSize: 13, color: "#6B7280", marginBottom: 8 }}>퇴직금 · 통상임금 · 계산기준</p>

      {/* H1 */}
      <h1 style={{ fontSize: 26, fontWeight: 800, lineHeight: 1.35, color: "#111827", marginBottom: 6 }}>
        퇴직금 계산, 통상임금으로 하면 더 받을 수 있나요?
      </h1>
      <p style={{ fontSize: 16, color: "#374151", marginBottom: 20, lineHeight: 1.6 }}>
        평균임금 vs 통상임금 비교부터 유리한 기준 선택까지
      </p>

      <EligibilityChecker
        title="이런 상황이라면 통상임금 기준이 유리해요"
        items={CHECK_ITEMS}
        threshold={2}
        positiveMessage="통상임금 기준으로 계산하면 퇴직금이 더 높게 나올 가능성이 높아요."
        negativeMessage="평균임금 기준도 함께 계산해서 더 높은 쪽을 선택하면 돼요."
      />

      <ArticleAd slot="intro" />

      <Divider />

      {/* H2 1 — 통상임금 기준 설명 */}
      <H2>퇴직금 계산에 쓰이는 두 가지 임금 기준</H2>

      <p style={body}>
        퇴직금은 평균임금을 기준으로 계산하는 게 원칙이에요. 퇴직 전 3개월 동안 받은 총임금을 그 기간의 총 일수로 나눠서 하루치를 구하고, 거기에 근무일수를 곱해요. 문제는 이 3개월 안에 야근이 적었거나 상여금 지급이 없었다면 평균임금이 실제 임금보다 낮게 나올 수 있다는 거예요.
      </p>
      <p style={body}>
        그래서 <a href="/w/통상임금-뜻" style={{ color: "#1D9E75" }}>통상임금</a>이라는 개념이 따로 있어요. 기본급에 정기적·일률적·고정적으로 지급되는 수당을 더한 금액인데, 매달 변동이 없는 식대·교통비·직책수당 같은 것들이 여기 해당해요. <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75" }} target="_blank" rel="noopener noreferrer">근로기준법 제2조</a>는 평균임금이 통상임금보다 낮은 경우 통상임금을 퇴직금 계산 기준으로 쓸 수 있도록 해뒀어요.
      </p>
      <p style={body}>
        즉, 두 가지 기준 중 높은 쪽을 고르면 돼요. 고정 수당이 월급에서 큰 비중을 차지하는 사람일수록 통상임금 기준이 유리하게 나오는 경우가 많아요. 직접 계산해보기 전엔 어느 쪽이 더 높은지 알기 어렵기 때문에 두 가지를 모두 계산해보는 게 중요해요.
      </p>

      <GreenBox title="통상임금에 포함되는 항목 vs 제외 항목">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div>
            <p style={{ fontWeight: 700, color: "#1D9E75", marginBottom: 6, fontSize: 14 }}>포함 항목</p>
            <ul style={{ margin: 0, paddingLeft: 16, fontSize: 14, lineHeight: 1.8 }}>
              <li>기본급</li>
              <li>매월 고정 식대</li>
              <li>교통비 (고정 지급)</li>
              <li>직책수당·직무수당</li>
              <li>고정 자격수당</li>
            </ul>
          </div>
          <div>
            <p style={{ fontWeight: 700, color: "#EF4444", marginBottom: 6, fontSize: 14 }}>제외 항목</p>
            <ul style={{ margin: 0, paddingLeft: 16, fontSize: 14, lineHeight: 1.8 }}>
              <li>성과급·인센티브</li>
              <li>초과근무수당 (연장·야간·휴일)</li>
              <li>불규칙 상여금</li>
              <li>실비변상적 수당 (실비 식대 등)</li>
              <li>복리후생적 급여</li>
            </ul>
          </div>
        </div>
      </GreenBox>

      <Divider />

      {/* H2 2 — 비교 계산기 */}
      <H2>통상임금 기준 퇴직금 계산기 (1년 기준 비교)</H2>

      <p style={body}>
        기본급과 고정 수당을 입력하면 통상임금 기준 퇴직금과 기본급만 적용했을 때의 차이를 바로 볼 수 있어요. 실제로 얼마나 차이 나는지 수치로 확인해보세요. 고정 수당이 월 30만원만 돼도 1년 기준으로 30만원 이상 차이가 날 수 있어요.
      </p>
      <p style={body}>
        이 계산기는 1년 근무 기준이에요. 근무 기간이 길수록 차이가 더 크게 벌어지고, 매년 연속으로 차이가 쌓이기 때문에 장기 근속자일수록 꼭 통상임금 기준을 따져보는 게 좋아요.
      </p>

      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        title="통상임금 vs 기본급 퇴직금 비교"
        description="월 기본급과 고정 수당을 조절해서 1년치 퇴직금 차이를 확인해요"
      />

      <ArticleAd slot="mid" />

      <Divider />

      {/* H2 3 — 서류 */}
      <H2>통상임금 기준 퇴직금을 청구할 때 필요한 서류</H2>

      <p style={body}>
        통상임금 기준 퇴직금을 청구하려면 어떤 수당이 정기적·고정적으로 지급됐는지 증명해야 해요. 회사가 자체적으로 기본급만 기준으로 계산했을 때 이의를 제기하려면 근로계약서와 급여명세서가 핵심 증거가 돼요.
      </p>
      <p style={body}>
        급여명세서는 최근 3개월치만 있어도 되지만, 수당 지급이 오래전부터 지속됐다는 걸 보여줄 수 있다면 더 오랜 기간의 자료를 갖추는 게 유리해요. 취업규칙이나 연봉계약서에 수당 지급 규정이 명시돼 있다면 가장 강력한 근거가 돼요.
      </p>

      <DocTable docs={DOCS} />

      <Divider />

      {/* H2 4 — 절차 */}
      <H2>유리한 기준으로 퇴직금 받는 4단계 절차</H2>

      <p style={body}>
        평균임금과 통상임금 중 어느 게 유리한지 직접 계산해보고, 높은 쪽을 기준으로 회사에 청구하는 게 핵심이에요. 이 과정이 처음엔 복잡해 보이지만, 단계별로 따라가면 어렵지 않아요.
      </p>
      <p style={body}>
        특히 회사가 처음부터 기본급만으로 계산해서 지급하려 한다면, 절차 4단계에서 고용노동부 진정을 활용해야 해요. <a href="/w/퇴직금-지급기한" style={{ color: "#1D9E75" }}>퇴직금 지급기한</a>은 퇴직 후 14일이에요. 이 기간이 지나면 연 20% 지연이자가 붙기 때문에 늦어질수록 회사 입장에서도 부담이 커져요.
      </p>

      <Steps steps={STEPS} />

      <CategoryButton category="퇴직금" slug="퇴직금-통상임금-계산" />
      <RelatedArticles articles={RELATED} />

      <Divider />

      {/* H2 5 — 체크리스트 */}
      <H2>퇴직금 계산 기준 최종 점검 체크리스트</H2>

      <p style={body}>
        퇴직금을 받기 전에 아래 항목들을 한 번씩 짚어보세요. 특히 고정 수당이 있는데 회사가 기본급만으로 계산했다면 이의 제기를 통해 차액을 받을 수 있는 경우가 적지 않아요.
      </p>
      <p style={body}>
        퇴직금이 300만원을 넘으면 IRP(개인형 퇴직연금) 계좌로만 받을 수 있어요. 미리 계좌를 만들어두지 않으면 지급이 지연될 수 있으니 퇴직 전에 준비해두는 게 좋아요. <a href="/w/퇴직금-IRP-계좌" style={{ color: "#1D9E75" }}>IRP 계좌 개설 방법</a>은 따로 정리돼 있어요.
      </p>

      <Checklist items={CHECKLIST} title="퇴직금 계산 기준 체크리스트" />

      <GreenBox title="핵심 요약">
        <ul style={{ margin: 0, paddingLeft: 16, fontSize: 14, lineHeight: 2 }}>
          <li><strong>통상임금</strong> = 기본급 + 정기·일률·고정 수당 (성과급·초과수당 제외)</li>
          <li><strong>평균임금</strong> = 퇴직 전 3개월 총임금 ÷ 총 일수</li>
          <li>두 기준 중 <strong>높은 쪽</strong>으로 청구 가능 (근로기준법 제2조)</li>
          <li>회사 거부 시 <strong>고용노동부 진정</strong> 가능, 소멸시효 3년</li>
        </ul>
      </GreenBox>

      <Divider />

      {/* H2 6 — FAQ */}
      <H2>자주 묻는 질문</H2>

      <p style={body}>
        통상임금과 평균임금의 차이가 헷갈리는 분들이 많아요. 가장 많이 받는 질문들을 정리했어요. 내 상황과 비슷한 케이스가 있다면 참고해보세요.
      </p>

      <FAQ items={FAQS} />

      <Divider />

      <References sections={REFERENCES} />
      <Disclaimer />
    </ArticleLayout>
  );
}
