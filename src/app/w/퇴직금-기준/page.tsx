"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "같은 사업장에서 만 1년 이상 계속 근무했어요" },
  { id: "c2", label: "4주 평균 주 15시간 이상 근무했어요" },
  { id: "c3", label: "최근 3개월 급여명세서를 보관하고 있어요" },
  { id: "c4", label: "퇴직금을 아직 받지 못했어요" },
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
  { name: "퇴직 확인서", required: false, where: "회사 인사팀" },
];

const STEPS = [
  {
    title: "퇴직금 수급 자격 확인",
    desc: "퇴직금은 같은 사업주 아래서 만 1년 이상, 주 평균 15시간 이상 근무한 근로자에게 발생해요. 정규직·계약직·파트타임 구분 없이 요건을 충족하면 모두 해당해요. 4대보험 미가입이어도 실제 근무가 증명되면 받을 수 있어요.",
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
  "수급 자격: 만 1년 이상 + 주 15시간 이상",
  "평균임금: 3개월 총임금 ÷ 총 일수",
  "상여금: 연간 총액 ÷ 12 환산 포함",
  "IRP 계좌: 300만원 초과 시 필수",
  "지급 기한: 퇴직 후 14일 이내",
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
      { label: "근로자퇴직급여보장법 제8조: 퇴직금 지급 기준", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "근로기준법 제2조: 평균임금 정의", url: "https://www.law.go.kr/법령/근로기준법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부: 퇴직금 제도 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-조건", title: "퇴직금 받는 조건 상세", description: "1년·주15시간 요건과 예외 상황이에요." },
  { slug: "퇴직금-계산법", title: "퇴직금 계산기", description: "월급·근속기간으로 금액 바로 확인해요." },
  { slug: "퇴직금-미지급-신고", title: "퇴직금 미지급 신고 방법", description: "안 줄 때 신고 절차와 지연이자 청구법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-기준" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 지급기준 · 자격요건</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금을 받으려면 어떤 조건이 필요한가요?<br />
        1년·주15시간 기준부터 계산 공식까지 한 번에
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금은 1년 이상 근무하고 퇴직하는 근로자라면 고용 형태와 상관없이 받을 수 있어요.
        계약직·파트타임도 요건만 충족하면 똑같이 지급받아야 해요.
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법 제8조</a>에서 정한
        두 가지 조건이에요. 5인 미만 사업장도 예외가 없어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>퇴직금 수급 자격인지 확인해보세요</H2>
      <p style={body}>
        핵심 요건은 두 가지예요. 같은 사업주 아래서 만 1년 이상 계속 근무할 것, 주 평균 15시간 이상 근무할 것.
        이 두 조건을 모두 충족하면 퇴직금이 발생해요.
      </p>
      <p style={body}>
        4대보험에 가입되지 않은 상태로 일했어도 퇴직금을 받을 수 있어요.
        실제 근무 사실이 증명되면 고용 형식에 상관없이 근로자로 인정받을 수 있거든요.
        급여 이체 내역, 업무 지시 문자, 출퇴근 기록 등이 증거가 돼요.
      </p>

      <GreenBox title="퇴직금 발생 요건 2가지">
        만 1년 이상 계속 근무 (입사일 기준, 같은 사업주)<br />
        주 평균 소정근로시간 15시간 이상<br />
        정규직·계약직·파트타임·아르바이트 모두 동일 적용
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="퇴직금 수급 조건을 충족해요. 아래 계산기로 예상 금액을 확인해보세요."
        partialMatchText="조건 일부가 다를 수 있어요. 고용노동부(1350) 상담을 먼저 받아보세요."
      />

      <Divider />

      <H2>내 퇴직금 예상액 계산해보세요</H2>
      <p style={body}>
        퇴직금 계산 공식은 1일 평균임금 × 30일 × 근속연수예요.
        쉽게 말하면 1년 근무할 때마다 월급 1개월치가 퇴직금으로 쌓이는 구조예요.
        상여금을 빠뜨리면 수십~수백만원 적게 나올 수 있어요.
      </p>
      <p style={body}>
        상여금이 있다면 연간 총액을 12로 나눠서 월 급여에 더한 금액이 평균임금 기준이에요.
        회사에서 자동 계산해주더라도 직접 검산해보는 게 좋아요.
      </p>

      <SectionBadge>퇴직금 예상 금액 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 월 평균급여 기준 간편 계산이에요. 상여금·수당 포함 시 실제 금액이 달라질 수 있어요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>퇴직금 수령에 필요한 서류</H2>
      <p style={body}>
        퇴직금은 별도 신청서 없이 퇴직하면 회사가 자동 지급해야 해요.
        정확한 금액 확인과 분쟁 예방을 위해 서류를 미리 챙겨두는 게 좋아요.
        근로계약서로 입사일을 확정하고, 급여명세서로 평균임금을 산정하는 게 기본이에요.
      </p>
      <p style={body}>
        퇴직금이 300만원을 넘으면 IRP 계좌로만 수령할 수 있어요.
        미리 개설하지 않으면 지급이 지연될 수 있으니 퇴사 전에 은행이나 증권사 앱으로 만들어두세요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>퇴직금 받는 절차 4단계</H2>
      <p style={body}>
        퇴직금은 조건을 충족했다고 해서 자동으로 들어오지 않아요. 직접 챙겨야 할 단계가 있어요.
        순서대로 따라가면 빠뜨리는 부분 없이 처리할 수 있어요.
      </p>
      <p style={body}>
        14일 안에 퇴직금이 들어오지 않으면 바로 고용노동부에서 온라인 진정을 낼 수 있어요.
        진정이 접수되면 근로감독관이 조사에 나서고, 회사는 지연이자(연 20%)까지 물어야 해요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>퇴직금 기준 체크리스트</H2>
      <p style={body}>
        퇴직 준비할 때 한 번씩 짚어보면 좋은 항목들이에요.
        특히 상여금 환산은 놓치기 쉬운 부분이에요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="상여금 환산 주의">
        연간 상여금 ÷ 12 = 월 환산액, 평균임금에 포함해요.<br />
        연 600만원 상여금이면 월 50만원이 추가돼요.<br />
        3년 근속 기준 퇴직금이 150만원 이상 차이 날 수 있어요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 기준에 관해 자주 나오는 질문들이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
