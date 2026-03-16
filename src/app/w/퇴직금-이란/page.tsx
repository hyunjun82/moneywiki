"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const currentSlug = "퇴직금-이란";

const CHECK_ITEMS = [
  { id: "c1", label: "1년 이상 같은 사업장에서 일했어요" },
  { id: "c2", label: "주 15시간 이상 근무했어요" },
  { id: "c3", label: "근로자(정규직·계약직·파트타임)로 일했어요" },
  { id: "c4", label: "퇴직 예정이거나 이미 퇴직했어요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "월 평균급여", min: 200, max: 600, step: 50, defaultValue: 280, format: (v: number) => `${v}만원` },
  { id: "years", label: "근속 기간", min: 1, max: 30, step: 1, defaultValue: 3, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "예상 퇴직금",
    getValue: (v: Record<string, number>) => v.salary * 10000 * v.years,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "근속 1년당 적립액",
    getValue: (v: Record<string, number>) => v.salary * 10000,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원/년`,
  },
];

const DOCS = [
  { name: "근로계약서 또는 재직증명서", required: true, where: "회사 인사팀" },
  { name: "급여명세서 (최근 3개월)", required: true, where: "회사 인사팀 또는 급여앱" },
  { name: "IRP 계좌번호 (300만원 초과 시)", required: true, where: "은행·증권사 개설" },
  { name: "퇴직 확인서 (선택)", required: false, where: "회사 인사팀" },
];

const STEPS = [
  {
    title: "퇴직금 수급 자격 확인",
    desc: "같은 사업주 아래서 1년 이상, 주 15시간 이상 근무하면 퇴직금을 받을 수 있어요. 정규직뿐 아니라 계약직·파트타임도 해당해요. 단, 4대 보험 미가입 상태에서도 실제 근무가 증명되면 받을 수 있어요.",
    tip: "주 15시간은 월 65시간 기준으로도 확인할 수 있어요",
  },
  {
    title: "평균임금 계산",
    desc: "퇴직 전 3개월 총임금을 그 기간의 총 일수로 나눈 게 1일 평균임금이에요. 기본급, 상여금(월 환산), 고정수당이 포함돼요. 이 평균임금이 높을수록 퇴직금이 많아요.",
    tip: "상여금은 연간 총액 ÷ 12로 월 환산해서 포함",
  },
  {
    title: "퇴직금 계산",
    desc: "1일 평균임금 × 30일 × 근속연수예요. 예를 들어 1일 평균임금 10만원에 근속 5년이면 1,500만원이에요. 근속기간이 딱 떨어지지 않으면 일 단위로 계산해요.",
    tip: "퇴직금 계산기로 월급·근속기간 입력하면 바로 나와요",
  },
  {
    title: "IRP 수령 및 세금 납부",
    desc: "퇴직금 300만원 초과 시 IRP 계좌로만 받을 수 있어요. IRP에서 일시금으로 인출 시 퇴직소득세가 차감돼요. 연금으로 10년 이상 수령하면 세금을 30% 줄일 수 있어요.",
    tip: "IRP 계좌는 퇴직 전에 미리 만들어두세요",
  },
];

const CHECKLIST = [
  "수급 자격 — 1년 이상 + 주 15시간 이상",
  "평균임금 — 3개월 총임금 ÷ 총 일수",
  "퇴직금 공식 — 1일 평균임금 × 30 × 근속연수",
  "IRP 계좌 — 300만원 초과 시 필수",
  "지급 기한 — 퇴직 후 14일 이내",
];

const FAQS = [
  {
    q: "퇴직금이란 무엇인가요?",
    a: "근로자가 1년 이상 근무하고 퇴직할 때 사업주가 지급하는 금전이에요. 법적으로 보장된 권리예요. 근속연수 1년당 평균임금 1개월치가 기준이에요.",
  },
  {
    q: "퇴직금은 언제부터 생기나요?",
    a: "입사일부터 만 1년이 되는 순간부터 퇴직금 청구권이 생겨요. 1년 미만에 퇴직하면 퇴직금이 없어요.",
  },
  {
    q: "퇴직금은 꼭 받아야 하나요?",
    a: "받는 게 원칙이에요. 사전에 퇴직금을 포기하는 각서를 써도 무효예요. 퇴직금 청구권은 포기할 수 없는 권리예요.",
  },
  {
    q: "퇴직금은 어떻게 받나요?",
    a: "회사가 퇴직 후 14일 이내에 IRP 계좌(300만원 초과) 또는 지정 계좌로 지급해요. 지급하지 않으면 연 20% 지연이자가 붙어요.",
  },
  {
    q: "퇴직금 소멸시효가 있나요?",
    a: "있어요. 퇴직 후 3년 이내에 청구해야 해요. 3년이 지나면 법적으로 청구가 어려워져요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 제8조 — 퇴직금 산정 기준", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "근로기준법 제2조 — 평균임금 정의", url: "https://www.law.go.kr/법령/근로기준법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 — 퇴직금 제도 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-조건", title: "퇴직금 받는 조건", description: "1년·주15시간 요건과 예외 상황." },
  { slug: "퇴직금-계산법", title: "퇴직금 계산기", description: "월급·근속기간으로 금액 바로 확인." },
  { slug: "퇴직금-수령방법", title: "퇴직금 수령 방법", description: "IRP 계좌 개설부터 수령까지 4단계." },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar items={퇴직금_SIDEBAR} currentSlug={currentSlug} />}
    >
      {/* 타이틀 */}
      <div style={{ marginBottom: 24 }}>
        <p style={{ ...body.badge, marginBottom: 8 }}>퇴직금 · 개념 · 기초</p>
        <h1 style={body.h1}>
          퇴직금이 뭔가요? 누가 받을 수 있나요?
          <br />
          <span style={body.h1sub}>기본 개념부터 계산법, 수령 절차까지 한 번에</span>
        </h1>
      </div>

      {/* 인트로 */}
      <p style={body.prose}>
        퇴직금은 근로자가 1년 이상 일하고 나서 퇴직할 때 사업주로부터 받는 돈이에요. 법으로 보장된 권리라서, 회사 규모나 계약 형태에 상관없이 요건만 맞으면 반드시 받을 수 있어요.{" "}
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={body.link} target="_blank" rel="noopener noreferrer">근로자퇴직급여보장법 제8조</a>에 명시된 규정이에요.
      </p>
      <p style={body.prose}>
        정규직뿐 아니라 계약직, 파트타임, 아르바이트도 받을 수 있어요. 조건은 딱 두 가지, 같은 사업장에서 1년 이상 근무하고 주 15시간 이상 일했으면 돼요. 아래에서 수급 자격, 계산법, 수령 절차를 하나씩 짚어드릴게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1: 수급 자격 */}
      <H2>퇴직금, 어떤 사람이 받을 수 있나요?</H2>

      <p style={body.prose}>
        퇴직금 수급 자격은 생각보다 간단해요. 같은 사업주 밑에서 계속 근로한 기간이 1년 이상이고, 1주일 평균 소정근로시간이 15시간 이상이면 받을 수 있어요. 4대 보험 가입 여부는 상관없어요. 실제로 일한 사실이 증명되면 퇴직금 청구권이 생겨요.
      </p>

      <GreenBox>
        퇴직금 발생 조건 (둘 다 충족해야 해요)<br />
        · 1년 이상 계속 근무 (같은 사업주)<br />
        · 주 15시간 이상 소정근로 (월 65시간 기준으로도 확인 가능)
      </GreenBox>

      <p style={body.prose}>
        계약직이나 파트타임도 포함돼요. 1년짜리 계약을 두 번 반복해서 총 2년을 일했다면, 계약 사이 공백이 없거나 짧으면 계속 근로로 인정받을 수 있어요.{" "}
        <a href="/w/퇴직금-조건" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 조건</a> 글에서 계약직 인정 기준을 더 자세히 볼 수 있어요.
      </p>

      <p style={body.prose}>
        단, 주 15시간 미만으로 일하는 초단시간 근로자는 해당되지 않아요. 예를 들어 매주 3일, 하루 4시간씩(주 12시간) 일했다면 퇴직금이 발생하지 않아요. 이 기준은 근로계약서의 소정근로시간을 기준으로 판단해요.
      </p>

      <EligibilityChecker
        title="내 퇴직금 수급 자격 확인"
        items={CHECK_ITEMS}
      />

      <Divider />

      {/* 섹션 2: 계산기 */}
      <H2>내 퇴직금이 얼마인지 바로 계산해보세요</H2>

      <p style={body.prose}>
        퇴직금 계산 공식은 '1일 평균임금 × 30일 × 근속연수'예요. 평균임금은 퇴직 전 3개월 총임금을 그 기간의 실제 일수로 나눈 값이에요. 기본급뿐 아니라 고정 수당, 상여금(월 환산)도 포함돼요.
      </p>

      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 월 평균급여 기준 간편 계산. 정확한 금액은 실제 3개월 임금 합산 후 일수로 나눠야 해요."
      />

      <p style={body.prose}>
        예를 들어 월급 280만원을 받으며 3년 근무했다면 예상 퇴직금은 840만원이에요. 근속기간이 딱 떨어지지 않아도 걱정 없어요. 3년 6개월이라면 3.5년으로 일 단위까지 계산해요.{" "}
        <a href="/w/퇴직금-계산법" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 계산기</a>에서 더 세밀하게 계산해볼 수 있어요.
      </p>

      <CategoryButton href="/w/퇴직금" label="퇴직금 가이드 전체 보기" />

      <RelatedArticles articles={RELATED} />

      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3: 서류 */}
      <H2>퇴직금 수령에 필요한 서류</H2>

      <p style={body.prose}>
        퇴직금을 받기 위해 별도로 제출할 서류가 많지는 않아요. 회사가 알아서 처리해주는 게 원칙이에요. 다만 IRP 계좌로 받으려면 계좌번호가 필요하고, 분쟁이 생겼을 때를 대비해 근로 증명 서류를 챙겨두는 게 좋아요.
      </p>

      <DocTable docs={DOCS} />

      <p style={body.prose}>
        퇴직금 300만원 초과 시 IRP 계좌로만 받을 수 있어요. IRP 계좌가 없으면 퇴직 전에 미리 은행이나 증권사에서 만들어두세요. 계좌 개설은 당일 처리도 가능해요.
      </p>

      <Divider />

      {/* 섹션 4: 절차 */}
      <H2>퇴직금 받는 절차 4단계</H2>

      <p style={body.prose}>
        퇴직금은 회사가 퇴직일로부터 14일 이내에 지급해야 해요. 이 기한을 넘기면 연 20%의 지연이자가 자동으로 붙어요. 회사가 미루고 있다면 기다리지 말고 아래 절차대로 움직이면 돼요.
      </p>

      <Steps steps={STEPS} />

      <p style={body.prose}>
        절차가 복잡해 보여도 대부분은 회사가 처리해줘요. 내가 직접 챙겨야 할 건 IRP 계좌 개설과 수급 자격 확인 정도예요. 회사가 14일 안에 지급하지 않으면{" "}
        <a href="/w/퇴직금-미지급" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 미지급 신고</a>를 통해 고용노동부에 진정을 넣을 수 있어요.
      </p>

      <Divider />

      {/* 섹션 5: 체크리스트 */}
      <H2>퇴직금 필수 체크리스트</H2>

      <p style={body.prose}>
        퇴직을 앞두고 있거나 이미 퇴직했다면, 아래 항목을 하나씩 점검해보세요. 빠뜨리기 쉬운 것들만 골랐어요.
      </p>

      <Checklist items={CHECKLIST} />

      <GreenBox>
        퇴직 후 14일 이내에 퇴직금을 받지 못했다면?<br />
        지연된 날수만큼 연 20% 지연이자가 붙어요.<br />
        고용노동부(국번 없이 1350)에 신고하거나, 고용노동부 홈페이지에서 진정서 제출 가능해요.
      </GreenBox>

      <p style={body.prose}>
        퇴직금 청구권 소멸시효는 3년이에요. 퇴직 후 3년이 지나면 법적으로 청구하기 어려워져요. 퇴직금을 못 받은 채 시간이 지나고 있다면 지금 바로 움직이는 게 맞아요.
      </p>

      <Divider />

      {/* FAQ */}
      <H2>자주 묻는 것들</H2>

      <FAQ items={FAQS} />

      <References items={REFERENCES} />

      <Disclaimer />
    </ArticleLayout>
  );
}
