"use client";
import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const currentSlug = "퇴직금-중간정산-후-퇴직금-계산";

const CHECK_ITEMS = [
  { id: "c1", label: "예전에 퇴직금 중간정산을 받은 적이 있어요" },
  { id: "c2", label: "중간정산 후 퇴직금이 어떻게 계산되는지 모르겠어요" },
  { id: "c3", label: "전체 근속기간 기준인지, 남은 기간 기준인지 헷갈려요" },
  { id: "c4", label: "최종 퇴직금 예상액을 미리 알고 싶어요" },
];

const CALC_SLIDERS = [
  {
    id: "salary",
    label: "현재 월 평균급여",
    min: 200, max: 600, step: 50, defaultValue: 300,
    format: (v: number) => `${v}만원`,
  },
  {
    id: "after",
    label: "중간정산 후 재근속 기간",
    min: 1, max: 20, step: 1, defaultValue: 3,
    format: (v: number) => `${v}년`,
  },
];

const CALC_RESULTS = [
  {
    id: "result1",
    label: "최종 퇴직금 (재근속 기간 기준)",
    highlight: true,
    getValue: (v: Record<string, number>) => v.salary * 10000 * v.after,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
  {
    id: "result2",
    label: "중간정산 전 기간",
    highlight: false,
    getValue: () => 0,
    format: () => "이전 기간 퇴직금 = 중간정산 시 수령 완료",
  },
];

const DOCS = [
  { name: "중간정산 지급 확인서 또는 원천징수영수증", required: true, where: "회사 인사팀 또는 과거 수령 자료" },
  { name: "급여명세서 (최근 3개월)", required: true, where: "인사팀" },
  { name: "근로계약서 (중간정산 이후 재시작일 기재분)", required: false, where: "인사팀" },
  { name: "IRP 계좌번호 (최종 퇴직 시)", required: true, where: "은행·증권사" },
];

const STEPS = [
  {
    title: "중간정산 이력 확인",
    desc: "중간정산을 받은 날짜와 금액을 확인해요. 중간정산 후 근속기간의 기산일이 달라지기 때문에 이력이 중요해요. 이전 인사팀에서 중간정산 원천징수영수증을 받아두세요.",
    tip: "영수증이 없으면 인사팀에 재발급을 요청하세요",
  },
  {
    title: "재근속 기산일 확인",
    desc: "중간정산일 다음 날부터 다시 근속기간이 시작돼요. 최종 퇴직금은 이 재근속 기간에 해당하는 임금만 기준으로 계산해요. 중간정산 전 기간은 이미 정산됐으니 포함되지 않아요.",
    tip: "중간정산일 다음 날 = 재근속 기산일",
  },
  {
    title: "최종 퇴직금 계산",
    desc: "재근속 기간의 3개월 평균임금 × 30일 × 재근속 연수로 계산해요. 임금이 올랐다면 현재 임금 기준으로 계산돼요. 중간정산 전보다 임금이 높아졌다면 최종 수령액이 더 클 수 있어요.",
    tip: "현재 임금이 높을수록 최종 퇴직금이 커져요",
  },
  {
    title: "IRP 계좌로 수령",
    desc: "최종 퇴직금 300만원 초과 시 IRP 계좌로 수령해요. 인사팀에 계좌번호를 알려주면 14일 이내에 이체돼요. 퇴직소득세는 재근속 기간 기준으로 원천징수돼요.",
    tip: "퇴직소득세는 재근속 기간의 근속연수 공제를 적용해요",
  },
];

const CHECKLIST = [
  "중간정산 이력 확인 — 날짜·금액 확인",
  "재근속 기산일 — 중간정산일 다음 날",
  "최종 퇴직금 — 재근속 기간만 계산",
  "세금 처리 — 재근속 기간 근속연수 공제 적용",
  "IRP 수령 — 300만원 초과 시 의무 수령",
];

const FAQS = [
  {
    q: "중간정산 후 퇴직금은 전체 기간으로 계산하나요?",
    a: "아니에요. 중간정산 후 재근속 기간만 기준으로 계산해요. 중간정산 전 기간은 이미 정산됐기 때문에 포함되지 않아요.",
  },
  {
    q: "중간정산 이력이 있으면 세금이 더 나오나요?",
    a: "근속연수 공제가 재근속 기간 기준으로만 적용돼요. 공제 기간이 짧아서 세금이 더 많이 나올 수 있어요. 전체 근속기간으로 계산하는 것보다 불리해질 수 있어요.",
  },
  {
    q: "중간정산 날짜를 모르면 어떻게 하나요?",
    a: "인사팀에서 중간정산 원천징수영수증을 요청하면 날짜를 확인할 수 있어요. 없으면 국세청 홈택스에서 과거 원천징수 내역을 조회해볼 수 있어요.",
  },
  {
    q: "중간정산 후 근속기간이 짧아서 퇴직금이 작아요",
    a: "어쩔 수 없어요. 중간정산으로 이미 받은 금액과 합산하면 전체 근속기간에 해당하는 퇴직금이 돼요. 중간정산 자체가 미리 받은 것이기 때문에 총액은 같아요.",
  },
  {
    q: "중간정산을 여러 번 받았으면 어떻게 계산하나요?",
    a: "마지막 중간정산일 다음 날부터 최종 퇴직일까지의 기간만 기준으로 계산해요. 그 이전 기간은 이미 각각 정산됐어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 제8조 — 퇴직금 산정 기준", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 — 퇴직금 중간정산 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-중간정산",
    title: "퇴직금 중간정산 전체 안내",
    description: "신청 방법부터 절차까지.",
  },
  {
    slug: "퇴직금-중간정산-세금",
    title: "중간정산 세금 계산",
    description: "원천징수 금액 미리 확인.",
  },
  {
    slug: "퇴직금-계산법",
    title: "퇴직금 계산기",
    description: "월급·근속기간으로 금액 바로 확인.",
  },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={
        <Sidebar
          heading="퇴직금 가이드"
          items={퇴직금_SIDEBAR}
          currentSlug={currentSlug}
        />
      }
    >
      {/* 타이틀 */}
      <div style={{ marginBottom: 24 }}>
        <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 8 }}>퇴직금 · 중간정산후 · 재계산</p>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14, color: "#111" }}>
          중간정산을 받은 적 있는데, 최종 퇴직금은 어떻게 계산하나요?
          <br />
          <span style={{ fontSize: 18, fontWeight: 500, color: "#6b7280" }}>재근속 기간 기준 계산법과 세금 차이까지</span>
        </h1>
      </div>

      {/* 인트로 */}
      <p style={body}>
        퇴직금 중간정산을 받고 나서 최종 퇴직 때 또 받을 수 있는지, 그러면 얼마나 받을 수 있는지 헷갈리죠? 중간정산은 미리 받은 거라서 이미 정산된 기간은 다시 계산 안 해요. 최종 퇴직금은 중간정산 이후 재근속 기간만 기준으로 계산해요.
      </p>
      <p style={body}>
        계산 원리를 알면 미리 예상액을 뽑아볼 수 있어요. 세금도 재근속 기간 기준으로만 공제가 적용되기 때문에, 중간정산 이력이 있는 분들은 퇴직소득세가 더 나올 수 있어요. 아래에서 하나씩 짚어드릴게요.
      </p>

      <ArticleAd />

      <Divider />

      {/* 섹션 1: 계산 기준 설명 */}
      <H2>중간정산 후 퇴직금 계산 기준이 어떻게 달라지나요</H2>

      <p style={body}>
        <a href="/w/퇴직금-중간정산" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 중간정산</a>을 받으면 그 시점까지의 퇴직금을 미리 받은 거예요. 그래서 중간정산일 다음 날부터 근속기간이 다시 시작돼요. 퇴직금 계산 공식 자체는 똑같이 '평균임금 × 30일 × 근속연수'인데, 적용되는 근속연수가 재근속 기간으로 바뀌어요.
      </p>

      <GreenBox>
        최종 퇴직금 계산 공식 (중간정산 후)<br />
        최종 퇴직금 = 퇴직 전 3개월 평균임금 × 30일 × 재근속 연수<br />
        재근속 기간 = 중간정산일 다음 날 ~ 최종 퇴직일<br />
        ※ 중간정산 전 기간은 이미 수령 완료 → 포함 안 됨
      </GreenBox>

      <p style={body}>
        중간정산 이후 임금이 올랐다면 최종 퇴직금 계산에 유리해요. 퇴직 직전 3개월 평균임금 기준이라 현재 임금이 높을수록 최종 금액이 커지거든요. 반대로 임금이 그대로라면 재근속 기간만큼만 받게 돼요.
      </p>

      <BorderBox>
        <strong>예시: 2019년 중간정산, 2025년 최종 퇴직</strong><br />
        · 중간정산일: 2019년 1월 31일<br />
        · 재근속 기간: 2019년 2월 1일 ~ 2025년 1월 31일 = 6년<br />
        · 퇴직 전 3개월 평균임금: 월 350만원<br />
        · 최종 퇴직금: 350만원 × 6 = 약 2,100만원<br />
        · 2019년 이전 기간 퇴직금은 중간정산 시 이미 수령
      </BorderBox>

      <p style={body}>
        <a href="/w/퇴직금-계산법" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 계산 원칙</a>은 1년 이상 근무 시 1개월분 임금이에요. 재근속 기간도 마찬가지로 1년 미만이면 퇴직금이 없어요. 중간정산 이후 1년이 채 안 됐다면 이번에는 퇴직금을 못 받아요.
      </p>

      <Divider />

      {/* 섹션 2: 계산기 */}
      <H2>재근속 기간 기준 퇴직금 간편 계산기</H2>

      <p style={body}>
        현재 월급과 중간정산 이후 재근속 기간을 넣으면 대략적인 최종 퇴직금이 나와요. 재근속 기간이 1년 미만이면 퇴직금이 발생하지 않으니 그 점은 미리 확인하세요.
      </p>

      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 실제 퇴직금은 퇴직 전 3개월 평균임금 기준. 정확한 금액은 인사팀 또는 고용노동부 퇴직금 계산기에서 확인 가능."
      />

      <p style={body}>
        재근속 기간이 길수록, 현재 임금이 높을수록 최종 퇴직금이 커져요. 중간정산을 받았어도 이후 오래 다닌 분들은 상당한 금액을 받을 수 있어요. 중간정산 전 기간까지 합치면 전체 재직기간에 대한 퇴직금이 다 나온 셈이에요.
      </p>

      <CategoryButton href="/w/퇴직금" label="퇴직금 가이드 전체 보기" />

      <RelatedArticles items={RELATED} />

      <ArticleAd />

      <Divider />

      {/* 섹션 3: 서류 */}
      <H2>최종 퇴직 전에 챙겨야 할 서류</H2>

      <p style={body}>
        중간정산 이력이 있으면 인사팀에서 재근속 기산일을 정확히 파악해야 해요. 기산일이 잘못되면 퇴직금 계산 자체가 틀려요. 중간정산 원천징수영수증이 가장 중요한 근거 서류예요.
      </p>

      <DocTable docs={DOCS} />

      <p style={body}>
        원천징수영수증이 없으면 국세청 홈택스에서 과거 원천징수 내역을 조회할 수 있어요. '조회/발급 → 기타 조회 → 근로·퇴직소득 지급명세서 조회' 메뉴에서 확인 가능해요. 이 자료로 중간정산일을 특정할 수 있어요.
      </p>

      <p style={body}>
        IRP 계좌는 퇴직 전에 미리 개설해두는 게 편해요. 퇴직금 300만원 초과 시 IRP 계좌로만 수령할 수 있거든요. 은행·증권사 어디서나 개설되고 수수료도 없어요. <a href="/w/irp-계좌-퇴직금-수령방법" style={{ color: "#1D9E75", textDecoration: "underline" }}>IRP 계좌 개설 방법</a>에서 단계별로 안내하고 있어요.
      </p>

      <Divider />

      {/* 섹션 4: 절차 */}
      <H2>중간정산 이후 최종 퇴직금 받는 절차</H2>

      <p style={body}>
        퇴직 전에 해야 할 일이 몇 가지 있어요. 특히 중간정산 이력이 있으면 재근속 기산일을 직접 확인해야 인사팀 실수를 잡아낼 수 있어요. 단계별로 따라가 보세요.
      </p>

      <Steps steps={STEPS} />

      <p style={body}>
        인사팀이 재근속 기산일을 잘못 입력해서 퇴직금이 적게 나오는 경우가 종종 있어요. 받은 퇴직금 명세서에서 근속기간 항목을 꼭 확인하세요. 잘못됐으면 14일 이내에 이의 제기하고, 그래도 안 되면 <a href="/w/퇴직금-미지급" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 미지급 신고</a>로 고용노동부에 접수할 수 있어요.
      </p>

      <p style={body}>
        퇴직금은 퇴직일로부터 14일 이내에 지급해야 해요. <a href="/w/퇴직금-지급기한" style={{ color: "#1D9E75", textDecoration: "underline" }}>지급기한 14일</a>을 넘기면 지연이자 연 20%가 붙어요. 회사가 늦게 주면 이자까지 청구할 수 있어요.
      </p>

      <Divider />

      {/* 섹션 5: 체크리스트 */}
      <H2>중간정산 이력자 퇴직금 처리 체크리스트</H2>

      <p style={body}>
        중간정산을 받은 적 있는 분들은 아래 목록대로 챙기면 빠뜨리지 않아요. 특히 재근속 기산일과 세금 공제 부분은 직접 확인해야 해요.
      </p>

      <Checklist items={CHECKLIST} />

      <GreenBox>
        이것만 기억하세요<br />
        · 최종 퇴직금 = 재근속 기간만 계산 (전체 기간 X)<br />
        · 세금도 재근속 기간 근속연수 공제 적용<br />
        · 중간정산 원천징수영수증 = 재근속 기산일 증빙<br />
        · 지급기한 14일 초과 시 연 20% 지연이자 청구 가능
      </GreenBox>

      <p style={body}>
        중간정산 이력이 있으면 퇴직소득세가 더 나올 수 있어요. 재근속 기간이 짧으면 근속연수 공제 금액도 적어지기 때문이에요. 미리 <a href="/w/퇴직금-중간정산-세금" style={{ color: "#1D9E75", textDecoration: "underline" }}>중간정산 세금 계산</a>에서 예상 세금을 확인해두면 놀라지 않아요.
      </p>

      <EligibilityChecker
        items={CHECK_ITEMS}
      />

      <Divider />

      {/* 섹션 6: FAQ */}
      <FAQ items={FAQS} />

      <References groups={REFERENCES} />

      <Disclaimer />
    </ArticleLayout>
  );
}
