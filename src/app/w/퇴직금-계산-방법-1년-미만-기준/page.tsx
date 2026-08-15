"use client";
import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR, 퇴직금_HIGHLIGHT } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "근무 기간이 1년 미만이에요" },
  { id: "c2", label: "회사가 DC형(확정기여형) 퇴직연금을 운용하고 있어요" },
  { id: "c3", label: "DC형 계좌에 이미 납입된 금액이 있어요" },
  { id: "c4", label: "퇴직이 확정됐거나 곧 퇴직 예정이에요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "연간 임금 총액 (만원)", min: 1800, max: 6000, step: 100, defaultValue: 3000, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "days", label: "재직일수 (일)", min: 30, max: 364, step: 10, defaultValue: 240, format: (v: number) => `${v}일` },
];

const CALC_RESULTS = [
  {
    label: "DC형 1년 미만 예상 납입액",
    getValue: (v: Record<string, number>) => Math.round((v.salary * 10000 / 12) * (v.days / 365)),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "1년 근무 시 DC형 납입액 (참고)",
    getValue: (v: Record<string, number>) => Math.round(v.salary * 10000 / 12),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원 (연간 임금의 1/12)`,
  },
];

const DOCS = [
  { name: "DC형 퇴직연금 계좌 잔액 확인서", required: true, where: "퇴직연금 운용 금융기관 (앱·인터넷뱅킹)" },
  { name: "근로계약서 (재직일수 확인)", required: true, where: "회사 인사팀" },
  { name: "급여명세서 전 기간분 (연간 임금 산정)", required: true, where: "회사 인사팀 또는 인사시스템" },
  { name: "IRP 계좌 정보 (수령 시 필요)", required: false, where: "은행·증권사에서 개설" },
  { name: "퇴직확인서", required: false, where: "회사 인사팀" },
];

const STEPS = [
  {
    title: "DC형 여부와 계좌 잔액 확인",
    desc: "회사가 DB형인지 DC형인지 먼저 확인해요. DC형이라면 퇴직연금 운용 금융기관(은행·증권사) 앱이나 인터넷뱅킹에서 내 계좌 잔액을 바로 조회할 수 있어요. 1년 미만이어도 납입된 금액이 있을 수 있어요.",
    tip: "모르면 회사 인사팀에 '퇴직연금 제도 종류'를 문의하세요",
  },
  {
    title: "납입 기간과 금액 계산",
    desc: "DC형은 매년 연간 임금 총액의 1/12 이상을 사용자가 납입해야 해요. 1년 미만이라면 재직일수를 365로 나눈 비율만큼 납입돼요. 예를 들어 240일 근무하고 연봉 3,600만원이면 약 236만원이 납입돼 있을 수 있어요.",
    tip: "납입 기준은 연간 임금 총액 ÷ 12 × (재직일수 ÷ 365)",
  },
  {
    title: "IRP 계좌 개설 또는 일시금 수령",
    desc: "DC형 퇴직금은 퇴직 시 IRP 계좌로 이전되거나 일시금으로 받을 수 있어요. IRP로 이전하면 퇴직소득세를 나중에 내는 과세 이연 효과가 있어요. 55세 이상이라면 연금으로 수령 시 세율이 낮아져요.",
    tip: "IRP 계좌가 없다면 은행·증권사에서 미리 개설해두세요",
    link: { label: "IRP 계좌 개설 안내", href: "/w/퇴직금-IRP-계좌" },
  },
  {
    title: "수령 신청 및 세금 처리",
    desc: "퇴직연금 운용 금융기관에 수령 신청을 해요. 일시금으로 받으면 퇴직소득세가 원천징수돼요. 재직기간이 짧을수록 세금 공제 혜택이 줄어드니 IRP 이전을 고려해보세요. 신청 후 보통 3~5일 내에 입금돼요.",
    tip: "퇴직소득세는 근속연수에 따라 공제액이 달라요 — 1년 미만이면 공제 효과가 작아요",
  },
];

const CHECKLIST = [
  "DC형 여부 확인: 인사팀에 퇴직연금 제도 종류 문의",
  "DC형 계좌 잔액 조회: 운용 금융기관 앱에서 확인",
  "재직일수 계산: 입사일~퇴직일 정확한 일수",
  "IRP 계좌 준비: 없다면 퇴직 전에 미리 개설",
  "법정 퇴직금 별도 확인: 1년 미만이면 법정 퇴직금은 0원",
  "소멸시효: 퇴직 후 3년 이내에 청구 완료",
];

const FAQS = [
  {
    q: "DC형이면 1년 미만 근무자도 퇴직금을 받을 수 있나요?",
    a: "받을 수 있어요. DC형(확정기여형) 퇴직연금은 재직 기간에 비례해 사용자가 납입해요. 법정 퇴직금 요건(만 1년)과 별개로 운영돼서, 1년 미만이어도 납입된 금액을 수령할 수 있어요.",
  },
  {
    q: "DB형이면 1년 미만 근무 시 퇴직금이 없나요?",
    a: "법정 퇴직금 기준은 동일해요. DB형(확정급여형)도 만 1년 이상 근무해야 퇴직급여가 발생해요. DB형은 법정 퇴직금과 동일한 요건을 적용해요.",
  },
  {
    q: "DC형 계좌에 납입된 금액이 없을 수도 있나요?",
    a: "있을 수 있어요. 법적으로 사용자는 매년 납입해야 하지만 지연 납입하는 경우가 있어요. 잔액이 없거나 적다면 회사에 납입 현황을 요청하고, 미납 시 고용노동부에 신고할 수 있어요.",
  },
  {
    q: "DC형 퇴직금을 IRP 없이 일시금으로 바로 받을 수 있나요?",
    a: "가능해요. IRP 이전 없이 일시금으로 받을 수 있어요. 단, 일시금 수령 시 퇴직소득세가 즉시 원천징수돼요. IRP로 이전하면 세금을 나중에 내는 과세 이연 혜택이 있어요.",
  },
  {
    q: "DC형과 법정 퇴직금을 동시에 받을 수 있나요?",
    a: "DC형 퇴직연금이 법정 퇴직금을 대체하는 제도예요. 둘 다 별도로 받을 수는 없어요. DC형에 가입된 회사에서 퇴직하면 DC형 계좌 잔액이 퇴직급여가 돼요.",
  },
  {
    q: "1년 미만이어도 DC형 퇴직금에 퇴직소득세가 붙나요?",
    a: "붙어요. 다만 근속연수가 짧으면 공제액이 줄어서 세금 부담이 상대적으로 커요. 금액이 크지 않다면 세금 차이가 크지 않을 수 있으니 IRP 이전 여부를 판단해보세요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 제20조: DC형 퇴직연금 사용자 부담금 납입", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "근로자퇴직급여보장법 제8조: 퇴직금 지급 요건 (계속근로 1년)", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부: 퇴직연금 제도 안내 (DC형)", url: "https://www.moel.go.kr" },
      { label: "금융감독원: 퇴직연금 비교공시", url: "https://fine.fss.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-1년미만", title: "1년 미만 근무 퇴직금", description: "법정 퇴직금 없을 때 연차수당·실업급여 챙기는 법." },
  { slug: "퇴직금-DC형-계산법", title: "DC형 퇴직금 계산법", description: "확정기여형 퇴직연금 납입·수령 계산 방법이에요." },
  { slug: "퇴직금-조건", title: "퇴직금 받는 조건", description: "DC형과 법정 퇴직금 요건 차이를 정리했어요." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} highlightSlugs={퇴직금_HIGHLIGHT} currentSlug="퇴직금-계산-방법-1년-미만-기준" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · DC형 · 1년미만 계산</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        1년 미만인데 DC형 퇴직금을 받을 수 있나요?<br />
        DC형 납입액 계산부터 수령 절차까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "1년 미만이면 퇴직금이 없다"는 말은 법정 퇴직금 기준이에요.
        회사가 DC형(확정기여형) 퇴직연금을 운용하고 있다면 이야기가 달라져요.
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법 제20조</a>에 따라
        DC형은 재직 기간에 비례해 사용자가 납입하기 때문에, 1년 미만이어도 납입된 금액이 있을 수 있어요.
        내가 DC형인지 확인하는 것부터 시작해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>DC형 퇴직금, 1년 미만도 받을 수 있는지 확인해보세요</H2>
      <p style={body}>
        DC형과 DB형은 1년 미만 수령 여부가 달라요.
        DC형은 재직 기간에 비례해 납입되기 때문에 1년 미만이어도 납입된 금액을 퇴직 시 수령할 수 있어요.
        DB형과 법정 퇴직금은 만 1년 이상 근무해야 지급 의무가 생겨요.
      </p>
      <p style={body}>
        DC형이 맞는지 모르면 회사 인사팀에 "퇴직연금 제도 종류"를 바로 물어보세요.
        운용 금융기관(은행·증권사) 앱에서 내 계좌가 있는지 확인하는 방법도 있어요.
      </p>

      <GreenBox>
        DC형(확정기여형): 재직 기간 비례 납입 → 1년 미만도 수령 가능<br />
        DB형(확정급여형)·법정 퇴직금: 만 1년 이상 필요 → 1년 미만은 0원<br />
        기준 법령: 근로자퇴직급여보장법 제20조 (DC형 납입 의무)
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="DC형 퇴직금 수령 요건이 맞아요. 아래 계산기로 예상 납입액을 확인해보세요."
        partialMatchText="DC형 여부부터 확인이 필요해요. 회사 인사팀이나 운용 금융기관에 문의해보세요."
      />

      <Divider />

      <H2>DC형 1년 미만 납입액 계산</H2>
      <p style={body}>
        DC형 납입액은 연간 임금 총액의 1/12 이상을 재직 기간 비율로 납입해요.
        연봉 3,600만원에 240일 근무했다면 약 236만원이 납입돼 있을 수 있어요.
        실제 잔액은 운용 수익률에 따라 달라질 수 있어요.
      </p>
      <p style={body}>
        아래 계산기에 연간 임금 총액과 재직일수를 입력하면 예상 납입액을 바로 볼 수 있어요.
        정확한 잔액은 운용 금융기관 앱에서 조회하세요.
      </p>

      <SectionBadge>DC형 1년 미만 납입액 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 연간 임금 총액 ÷ 12 × (재직일수 ÷ 365) 기준. 실제 잔액은 운용 수익률에 따라 달라져요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>수령에 필요한 서류</H2>
      <p style={body}>
        DC형 수령은 운용 금융기관에서 처리해요.
        잔액 확인서와 근로계약서로 재직 기간을 증명하고, IRP로 이전할 계획이라면 계좌를 미리 만들어두세요.
      </p>
      <p style={body}>
        재직 중에 급여명세서 전 기간분을 챙겨두세요.
        퇴직 후엔 회사 인사팀에 서류 요청이 어려워지는 경우가 많아요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>DC형 퇴직금 수령 절차 4단계</H2>
      <p style={body}>
        DC형 수령은 법정 퇴직금보다 절차가 단순해요.
        운용 금융기관에서 대부분 처리되고, 신청 후 3~5일이면 입금돼요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>수령 전 체크리스트</H2>
      <p style={body}>
        DC형 수령도 퇴직 후 3년의 소멸시효가 있어요.
        IRP 이전 여부는 세금과 연결되니 수령 전에 미리 결정해두세요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        DC형은 법정 퇴직금과 별개 제도예요.<br />
        1년 미만이어도 사용자가 납입한 금액은 내 DC형 계좌에 있어요.<br />
        퇴직 후 IRP로 이전하거나 일시금으로 받을 수 있어요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        1년 미만 DC형 퇴직금에 대해 많이 나오는 질문이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법을 바탕으로 작성됐어요. DC형 납입액은 회사 실제 납입 현황에 따라 다를 수 있으니 운용 금융기관에서 잔액을 직접 확인하세요." />
    </ArticleLayout>
  );
}
