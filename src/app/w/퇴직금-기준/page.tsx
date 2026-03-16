"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const currentSlug = "퇴직금-기준";

const CHECK_ITEMS = [
  { id: "c1", label: "1년 이상 같은 사업장에서 일했어요" },
  { id: "c2", label: "주 15시간 이상 근무했어요" },
  { id: "c3", label: "정규직이 아니어도 퇴직금 자격이 되는지 궁금해요" },
  { id: "c4", label: "퇴직금이 얼마나 되는지 계산해보고 싶어요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "월 평균급여", min: 200, max: 600, step: 50, defaultValue: 280, format: (v: number) => `${v}만원` },
  { id: "years", label: "근속 기간", min: 1, max: 20, step: 1, defaultValue: 3, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "예상 퇴직금",
    getValue: (v: Record<string, number>) => v.salary * 10000 * v.years,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "근속 1년당",
    getValue: (v: Record<string, number>) => v.salary * 10000,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원/년`,
  },
];

const DOCS = [
  { name: "근로계약서 (근무 기간 확인)", required: true, where: "회사 인사팀" },
  { name: "급여명세서 (최근 3개월)", required: true, where: "회사 인사팀 또는 급여앱" },
  { name: "IRP 계좌번호 (300만원 초과 시)", required: true, where: "은행·증권사 개설" },
  { name: "퇴직 확인서 (선택)", required: false, where: "회사 인사팀" },
];

const STEPS = [
  {
    title: "퇴직금 수급 자격 확인",
    desc: "퇴직금은 같은 사업주 아래서 만 1년 이상, 주 평균 15시간 이상 근무한 근로자에게 발생해요. 정규직·계약직·파트타임 구분 없이 요건을 충족하면 모두 해당해요. 4대 보험 미가입이어도 실제 근무가 증명되면 받을 수 있어요.",
    tip: "주 15시간은 월 65시간으로도 환산해요",
  },
  {
    title: "퇴직금 계산",
    desc: "퇴직금 = 1일 평균임금 × 30일 × 근속연수예요. 1일 평균임금은 퇴직 전 3개월 총임금 ÷ 총 일수로 구해요. 상여금·고정수당도 포함해야 해요.",
    tip: "상여금은 연간 총액 ÷ 12로 환산해서 포함",
  },
  {
    title: "IRP 계좌 개설 및 통보",
    desc: "퇴직금 300만원 초과 시 IRP 계좌로만 수령해야 해요. 퇴직 전에 미리 IRP 계좌를 개설하고, 계좌번호를 인사팀에 알려줘야 해요. IRP 계좌가 없으면 지급이 지연될 수 있어요.",
    tip: "증권사 IRP는 수수료가 낮고 ETF 투자도 가능해요",
  },
  {
    title: "14일 이내 수령 확인",
    desc: "회사는 퇴직 후 14일 이내에 퇴직금을 지급해야 해요. 14일이 지나도 지급 안 되면 연 20% 지연이자가 자동 발생해요. 고용노동부 민원마당에서 온라인 진정을 낼 수 있어요.",
    tip: "퇴직 후 IRP 계좌 입금 여부를 반드시 확인하세요",
  },
];

const CHECKLIST = [
  "수급 자격 — 만 1년 이상 + 주 15시간 이상",
  "평균임금 — 3개월 총임금 ÷ 총 일수",
  "상여금 — 연간 총액 ÷ 12 환산 포함",
  "IRP 계좌 — 300만원 초과 시 필수",
  "지급 기한 — 퇴직 후 14일 이내",
];

const FAQS = [
  {
    q: "퇴직금 지급 기준이 되는 1년은 어떻게 계산하나요?",
    a: "입사일부터 퇴직일까지 만 1년을 기준으로 해요. 1월 1일 입사라면 다음 해 1월 1일이 1년이에요. 12월 31일 퇴직은 1년 미만이에요.",
  },
  {
    q: "주 15시간 미만 파트타임은 퇴직금이 없나요?",
    a: "주 평균 15시간 미만이면 퇴직금이 발생하지 않아요. 주 15시간 이상이면 파트타임도 퇴직금 대상이에요.",
  },
  {
    q: "5인 미만 사업장도 퇴직금을 줘야 하나요?",
    a: "맞아요. 5인 미만 사업장도 퇴직금 지급 의무가 있어요. 근로자퇴직급여보장법은 사업장 규모와 관계없이 적용돼요.",
  },
  {
    q: "퇴직금 계산에 식대, 교통비도 포함되나요?",
    a: "매월 정기적·일률적으로 지급되는 식대·교통비는 통상임금에 포함돼요. 평균임금 계산에도 영향을 줄 수 있어요. 실비 변상 성격이면 제외돼요.",
  },
  {
    q: "퇴직금을 안 주면 어떻게 되나요?",
    a: "14일이 지나도 지급하지 않으면 연 20% 지연이자가 붙고, 형사 처벌 대상이 돼요. 고용노동부에 진정을 내면 근로감독관이 조사해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 제8조 — 퇴직금 지급 기준", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
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
  { slug: "퇴직금-조건", title: "퇴직금 받는 조건 상세", description: "1년·주15시간 요건과 예외 상황." },
  { slug: "퇴직금-계산법", title: "퇴직금 계산기", description: "월급·근속기간으로 금액 바로 확인." },
  { slug: "퇴직금-지급-기준-5인미만", title: "5인 미만 퇴직금 기준", description: "소규모 사업장 퇴직금 적용 여부." },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar items={퇴직금_SIDEBAR} currentSlug={currentSlug} />}
    >
      {/* 타이틀 */}
      <div style={{ marginBottom: 24 }}>
        <p style={{ ...body.badge, marginBottom: 8 }}>퇴직금 · 지급기준 · 자격요건</p>
        <h1 style={body.h1}>
          퇴직금을 받으려면 어떤 조건이 필요한가요?
          <br />
          <span style={body.h1sub}>1년·주15시간 기준부터 계산 공식까지 한 번에</span>
        </h1>
      </div>

      {/* 인트로 */}
      <p style={body.prose}>
        퇴직금은 1년 이상 근무하고 퇴직하는 근로자라면 고용 형태와 상관없이 받을 수 있어요. 정규직만 해당된다고 생각하는 분이 많은데, <a href="/w/퇴직금-조건" style={body.link}>계약직·파트타임도 요건만 충족하면</a> 똑같이 지급받아야 해요. 5인 미만 사업장도 예외가 없어요.
      </p>
      <p style={body.prose}>
        핵심 요건은 두 가지예요. 같은 사업주 아래서 만 1년 이상 계속 근무할 것, 주 평균 15시간 이상 근무할 것. 이 두 조건을 모두 충족하면 퇴직금이 발생해요. 아래에서 자격 요건부터 계산 공식, 수령 절차까지 한 번에 정리할게요.
      </p>

      <ArticleAd position="intro" />

      <Divider />

      {/* 섹션 1: 자격 요건 */}
      <H2>퇴직금 자격 요건, 두 가지만 기억하세요</H2>

      <p style={body.prose}>
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={body.link} target="_blank" rel="noopener noreferrer">근로자퇴직급여보장법 제8조</a>에 따라 퇴직금은 계속근로기간 1년 이상, 주 평균 소정근로시간 15시간 이상인 근로자에게 지급해요. 계속근로기간이란 입사일부터 퇴직일까지 같은 사업주 아래 끊김 없이 일한 기간이에요. 중간에 짧은 공백이 있어도 업무 연속성이 인정되면 합산해요.
      </p>

      <GreenBox>
        퇴직금 발생 요건 2가지<br />
        ① 만 1년 이상 계속 근무 (입사일 기준, 같은 사업주)<br />
        ② 주 평균 소정근로시간 15시간 이상<br />
        → 정규직·계약직·파트타임·아르바이트 모두 동일 적용
      </GreenBox>

      <p style={body.prose}>
        파트타임도 주 15시간 이상이면 퇴직금 대상이에요. 주 14시간 59분이면 해당이 안 되고, 주 15시간이면 해당돼요. 1시간 차이가 퇴직금 수백만 원을 가를 수 있어요. 근로계약서에 적힌 소정근로시간과 실제 근무시간이 다를 경우 실제 출퇴근 기록이 기준이 돼요.
      </p>

      <p style={body.prose}>
        4대 보험에 가입되지 않은 상태로 일했어도 퇴직금을 받을 수 있어요. 실제 근무 사실이 증명되면 고용 형식에 상관없이 근로자로 인정받을 수 있거든요. 급여 이체 내역, 카카오톡 업무 지시, 출퇴근 기록 등이 증거가 돼요.
      </p>

      <EligibilityChecker
        title="내 퇴직금 자격 해당 여부"
        items={CHECK_ITEMS}
      />

      <Divider />

      {/* 섹션 2: 계산기 */}
      <H2>내 퇴직금 예상액 계산해보세요</H2>

      <p style={body.prose}>
        퇴직금 계산 공식은 간단해요. 1일 평균임금 × 30일 × 근속연수예요. 1일 평균임금은 퇴직 전 3개월간 받은 총임금을 그 기간의 총 일수로 나눈 값이에요. 월급만이 아니라 상여금, 고정수당도 포함돼요.
      </p>

      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 월 평균급여 기준 간편 계산이에요. 상여금·수당 포함 시 실제 금액이 달라질 수 있어요."
      />

      <p style={body.prose}>
        상여금을 빠뜨리면 퇴직금이 수십~수백만 원 적게 나올 수 있어요. 연간 상여금을 12로 나눠서 월 급여에 더한 금액이 평균임금 계산의 기준이에요. 회사에서 자동 계산해주더라도 꼭 직접 검산해보는 게 좋아요.
      </p>

      <CategoryButton href="/w/퇴직금" label="퇴직금 가이드 전체 보기" />

      <RelatedArticles articles={RELATED} />

      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3: 서류 */}
      <H2>퇴직금 수령에 필요한 서류</H2>

      <p style={body.prose}>
        퇴직금을 받으려면 몇 가지 서류를 챙겨야 해요. 회사에서 자동으로 처리해주는 경우도 있지만, 직접 챙기지 않으면 지연되거나 누락되는 일이 생겨요. 특히 IRP 계좌는 퇴직 전에 미리 만들어둬야 해요.
      </p>

      <DocTable docs={DOCS} />

      <p style={body.prose}>
        퇴직금이 300만 원을 넘으면 반드시 IRP 계좌로만 지급해요. IRP 계좌가 없으면 회사가 지급 자체를 못 해요. 은행이나 증권사에서 10분이면 개설할 수 있어요. 증권사 IRP는 수수료가 낮고 ETF에 투자할 수 있어서 장기 관리에 유리해요.
      </p>

      <Divider />

      {/* 섹션 4: 절차 */}
      <H2>퇴직금 받는 절차 4단계</H2>

      <p style={body.prose}>
        퇴직금은 조건을 충족했다고 해서 자동으로 들어오지 않아요. 직접 챙겨야 할 단계가 있어요. 아래 순서대로 따라가면 빠뜨리는 부분 없이 처리할 수 있어요.
      </p>

      <Steps steps={STEPS} />

      <p style={body.prose}>
        14일 안에 퇴직금이 들어오지 않으면 바로 고용노동부 민원마당(minwon.moel.go.kr)에서 온라인 진정을 넣을 수 있어요. 진정이 접수되면 근로감독관이 조사에 나서고, 회사는 지연이자까지 물어야 해요. 청구권은 퇴직일로부터 3년이에요.
      </p>

      <Divider />

      {/* 섹션 5: 체크리스트 */}
      <H2>퇴직금 기준 체크리스트</H2>

      <p style={body.prose}>
        퇴직 준비할 때 한 번씩 짚어보면 좋은 항목들이에요. 특히 상여금 환산은 놓치기 쉬운 부분이에요. 빠뜨리면 수십~수백만 원이 날아갈 수 있어요.
      </p>

      <Checklist items={CHECKLIST} />

      <GreenBox>
        상여금 환산 주의<br />
        연간 상여금 ÷ 12 = 월 환산액 → 평균임금에 포함<br />
        예) 연 600만원 상여 → 월 50만원 추가 → 퇴직금 계산 기준 상승<br />
        → 3년 근속 기준 퇴직금 150만원 이상 차이 날 수 있어요
      </GreenBox>

      <p style={body.prose}>
        IRP 계좌 개설 여부도 미리 체크해두세요. 퇴직 당일 허둥지둥 만들려다가 은행 마감 시간을 넘기면 지급이 다음 영업일로 밀려요. 퇴직 2주 전쯤 미리 개설해두는 게 가장 안전해요.
      </p>

      <Divider />

      {/* 섹션 6: FAQ */}
      <H2>자주 묻는 것들</H2>

      <FAQ items={FAQS} />

      <References items={REFERENCES} />

      <Disclaimer />
    </ArticleLayout>
  );
}
