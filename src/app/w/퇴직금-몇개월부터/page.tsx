"use client";
import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "같은 사업장에서 1년 이상 근무했어요" },
  { id: "c2", label: "주 평균 15시간 이상 근무했어요" },
  { id: "c3", label: "아직 퇴직금을 받지 못했어요" },
  { id: "c4", label: "최근 3개월 급여명세서를 보관하고 있어요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "월 평균급여", min: 150, max: 400, step: 10, defaultValue: 220, format: (v: number) => `${v}만원` },
  { id: "months", label: "근무 기간", min: 1, max: 24, step: 1, defaultValue: 12, format: (v: number) => `${v}개월` },
];

const CALC_RESULTS = [
  {
    label: "예상 퇴직금",
    getValue: (v: Record<string, number>) => v.months >= 12 ? Math.round(v.salary * 10000 * v.months / 12) : 0,
    format: (v: number) => v === 0 ? "0원 (12개월 미만 퇴직금 없음)" : `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "퇴직금 발생 여부",
    getValue: (v: Record<string, number>) => v.months,
    format: (v: number) => v >= 12 ? "퇴직금 발생 (1년 이상)" : `퇴직금 없음 (${v}개월, 1년 미만)`,
  },
];

const DOCS = [
  { name: "근로계약서 (입사일 확인)", required: true, where: "회사 인사팀" },
  { name: "급여명세서 (3개월)", required: true, where: "인사팀 또는 급여앱" },
  { name: "IRP 계좌번호 (300만원 초과 시)", required: true, where: "은행·증권사" },
  { name: "퇴직 확인서", required: false, where: "인사팀" },
];

const STEPS = [
  {
    title: "정확한 근무 기간 확인",
    desc: "입사일부터 퇴직일까지 만 1년(12개월)이 돼야 퇴직금이 발생해요. 1월 1일 입사라면 다음 해 1월 1일이 정확히 1년이에요. 1년이 안 되면 퇴직금이 없어요.",
    tip: "입사일 포함, 퇴직일 포함해서 만 1년 계산",
  },
  {
    title: "주 15시간 기준 확인",
    desc: "1년 이상 근무했더라도 주 평균 15시간 미만이면 퇴직금이 발생하지 않아요. 파트타임이나 단시간 근무자도 주 15시간 이상이면 퇴직금이 생겨요.",
    tip: "주 15시간은 월 65시간 기준으로도 확인해요",
  },
  {
    title: "퇴직금 계산",
    desc: "1일 평균임금 × 30일 × 근속연수예요. 근속기간이 1년이면 월급 1개월치가 기준이에요. 2년이면 2개월치, 5년이면 5개월치예요.",
    tip: "상여금·고정수당도 평균임금에 포함돼요",
  },
  {
    title: "IRP 계좌 수령",
    desc: "300만원 초과 퇴직금은 IRP 계좌로만 받아요. 미리 개설하고 인사팀에 계좌번호를 알려줘요. 14일 이내에 이체돼요.",
    tip: "IRP 계좌는 앱으로 10분이면 개설 가능해요",
  },
];

const CHECKLIST = [
  "만 12개월(1년) 이상: 퇴직금 발생",
  "11개월 이하: 퇴직금 없음",
  "주 15시간 이상: 필수 요건",
  "1년 미만이어도: 연차수당 청구 가능",
  "IRP 계좌: 300만원 초과 시 필수",
];

const FAQS = [
  {
    q: "몇 개월부터 퇴직금이 생기나요?",
    a: "만 12개월(1년) 이상 근무해야 퇴직금이 발생해요. 11개월 29일은 1년 미만이라서 퇴직금이 없어요.",
  },
  {
    q: "딱 12개월 됐을 때 퇴직하면 퇴직금이 얼마나 되나요?",
    a: "월 평균임금 1개월치예요. 월급 250만원이라면 퇴직금도 약 250만원이에요.",
  },
  {
    q: "주 15시간 기준이 뭔가요?",
    a: "주 평균 근무시간이 15시간 이상이어야 퇴직금 대상이 돼요. 월 65시간 기준으로도 확인해요.",
  },
  {
    q: "11개월 일하고 그만뒀는데 아무것도 못 받나요?",
    a: "퇴직금은 없어요. 하지만 월 개근 시 연차(최대 11일)가 발생해요. 연차수당은 별도로 청구할 수 있어요.",
  },
  {
    q: "1년 직전에 해고당하면 어떻게 되나요?",
    a: "1년을 채우지 못하게 하려는 의도적 해고는 부당해고에 해당할 수 있어요. 노동위원회에 구제신청을 할 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 제8조: 계속근로 1년 요건", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
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
  { slug: "퇴직금-1년미만", title: "1년 미만 퇴직금 없을 때", description: "연차수당·실업급여로 보완하는 방법." },
  { slug: "퇴직금-조건", title: "퇴직금 받는 조건", description: "1년·주15시간 요건과 예외 상황." },
  { slug: "퇴직금-계산법", title: "퇴직금 계산기", description: "월급·근속기간으로 금액 바로 확인." },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-몇개월부터" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 발생시점 · 12개월</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금은 몇 개월부터 받을 수 있나요?<br />
        만 1년 기준과 주 15시간 요건, 미만일 때 대안
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금은 만 12개월 이상 근무해야 발생해요. 11개월 29일이면 0원이에요.
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법 제8조</a>에 따라 두 가지 조건을 모두 충족해야 해요.
        1년을 채우면 월급 1개월치가 기준이에요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>내 퇴직금 발생 조건 해당 여부 확인</H2>
      <p style={body}>
        퇴직금 발생 요건은 딱 두 가지예요. 같은 사업주 아래서 계속근로 기간이 만 1년 이상이고, 주 평균 15시간 이상 근무한 근로자에게 지급해요.
        "계속근로"란 고용 관계가 끊기지 않고 이어진 기간이에요. 계약이 중간에 갱신됐더라도 사실상 동일한 근무라면 합산돼요.
      </p>
      <p style={body}>
        파트타임도 주 15시간 이상이면 퇴직금 대상이에요. 카페 아르바이트로 주 20시간 일한다면 1년 후 퇴직금 대상이 되고, 주 10시간만 일한다면 1년이 넘어도 퇴직금이 없어요.
      </p>

      <GreenBox title="퇴직금 발생 요건 2가지">
        만 1년(12개월) 이상 계속근로: 하루라도 미달이면 0원<br />
        주 평균 15시간 이상 근무: 단시간 근로자도 해당 가능<br />
        정규직·계약직·아르바이트 구분 없이 동일 적용
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="퇴직금 수급 조건을 갖췄어요. 아래 계산기로 예상 금액을 확인해보세요."
        partialMatchText="조건 일부가 부족해요. 고용노동부(1350) 상담을 먼저 받아보세요."
      />

      <Divider />

      <H2>근무 기간별 예상 퇴직금 계산</H2>
      <p style={body}>
        퇴직금 계산식은 1일 평균임금 × 30일 × (총 근속일수 ÷ 365)예요. 쉽게 말하면 1년 근무 시 월급 1개월치, 2년 근무 시 2개월치가 기본 기준이에요.
        12개월 미만으로 설정하면 퇴직금이 0원으로 나오는 걸 바로 볼 수 있어요.
      </p>

      <SectionBadge>퇴직금 간이 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 상여금·수당이 있으면 실제 퇴직금은 더 높을 수 있어요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>퇴직금 청구에 필요한 서류</H2>
      <p style={body}>
        퇴직금은 별도 신청서 없이 퇴직하면 회사가 자동 지급해야 해요.
        정확한 금액 확인과 분쟁 예방을 위해 서류는 미리 챙겨두는 게 좋아요.
      </p>
      <p style={body}>
        퇴직금이 300만원을 넘으면 IRP(개인형퇴직연금) 계좌로만 수령할 수 있어요.
        미리 개설하지 않으면 지급이 지연될 수 있으니 퇴사 전에 은행이나 증권사 앱으로 만들어두는 게 좋아요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>퇴직금 받는 절차 4단계</H2>
      <p style={body}>
        퇴직금은 퇴사 결정 전에 준비해야 할 게 있어요. 특히 IRP 계좌는 퇴사 후 개설하면 수령이 늦어지니까요.
        아래 단계를 순서대로 따라가면 퇴사 후 14일 안에 퇴직금을 받을 수 있어요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>1년 미만일 때 받을 수 있는 것들</H2>
      <p style={body}>
        퇴직금이 없다고 해서 아무것도 못 받는 건 아니에요. 1년 미만 근무자도 챙길 수 있는 게 있어요.
        월 개근하면 연차가 생기고, 퇴사 시 사용하지 않은 연차는 수당으로 받을 수 있어요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="1년 미만 퇴사 시 챙길 수 있는 권리">
        연차수당: 월 개근 시 발생, 최대 11일치 청구 가능<br />
        실업급여: 비자발적 퇴사라면 180일 이상 가입 시 수령 가능<br />
        퇴직금 청구권: 1년 이상이면 소멸시효 3년 이내 청구 가능
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 발생 기준에 관해 자주 나오는 질문이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
