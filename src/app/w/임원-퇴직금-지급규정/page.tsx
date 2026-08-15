"use client";
import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR, 퇴직금_HIGHLIGHT } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "법인에 이사·감사 등 등기 임원으로 등재돼 있어요" },
  { id: "c2", label: "회사 정관 또는 임원퇴직금 지급규정이 마련돼 있어요" },
  { id: "c3", label: "임원으로 재임한 기간이 1년 이상이에요" },
  { id: "c4", label: "퇴직 후 퇴직금을 청구할 계획이에요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "최종 월 평균 보수", min: 300, max: 3000, step: 50, defaultValue: 600, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "years", label: "임원 재임 기간", min: 1, max: 30, step: 1, defaultValue: 5, format: (v: number) => `${v}년` },
  { id: "rate", label: "정관 지급 배율", min: 1, max: 3, step: 0.5, defaultValue: 2, format: (v: number) => `${v}배` },
];

const CALC_RESULTS = [
  {
    label: "임원 퇴직금 예상액",
    getValue: (v: Record<string, number>) => Math.round(v.salary * 10000 / 10 * v.years * v.rate),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "세법 최대 한도 (배율 3배 기준)",
    getValue: (v: Record<string, number>) => Math.round(v.salary * 10000 / 10 * v.years * 3),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원 (초과 시 손금 불산입)`,
  },
];

const DOCS = [
  { name: "정관 (임원 퇴직금 관련 조항)", required: true, where: "법인 보관 또는 공증사무소" },
  { name: "임원퇴직금 지급규정 또는 이사회·주주총회 결의서", required: true, where: "회사 경영지원팀" },
  { name: "법인 등기부등본 (임원 등재 확인용)", required: true, where: "대법원 인터넷등기소" },
  { name: "최종 보수 확인 서류 (급여명세서·지급내역)", required: true, where: "경리팀 또는 세무담당자" },
  { name: "퇴직 사유서 또는 사임서", required: false, where: "본인 제출" },
];

const STEPS = [
  {
    title: "정관·지급규정 존재 여부 확인",
    desc: "임원 퇴직금은 법정 의무가 아니에요. 정관에 '임원퇴직금 지급규정에 따른다'는 조항이 있거나, 주주총회·이사회에서 별도 결의한 경우에만 지급 의무가 생겨요. 먼저 정관 해당 조항을 찾아보세요.",
    tip: "정관 없이는 청구 자체가 어려워요. 규정이 없다면 주주총회 특별결의로 사후 제정도 가능해요",
  },
  {
    title: "지급액 계산 및 세법 한도 확인",
    desc: "지급규정에 산정 기준이 있으면 그에 따라요. 규정이 없을 때는 법인세법 시행령 제44조 손금 한도(월 평균 보수 × 재임연수 × 1/10 × 배율, 최대 3배)를 넘지 않도록 해요. 한도 초과분은 법인세 비용 처리가 안 돼요.",
    tip: "세법 한도를 초과하면 초과분에 대해 세무조사 리스크가 생겨요",
  },
  {
    title: "주주총회 또는 이사회 결의",
    desc: "지급 전에 주주총회(정관에 이사회 위임 시 이사회) 결의가 필요해요. 결의 없이 지급하면 법인 자금 유용 문제로 이어질 수 있어요. 소규모 법인은 주주 전원 동의서로 대체하기도 해요.",
    tip: "결의 후 의사록을 반드시 작성하고 보관해두세요",
  },
  {
    title: "지급 및 세금 처리",
    desc: "임원 퇴직금도 퇴직소득세 과세 대상이에요. 근속 기간은 임원 재임 기간 기준으로 계산하고, 세율은 근로자 퇴직금과 동일해요. 300만원 초과 시 IRP 계좌로만 수령해야 해요(2022년 4월 이후 퇴직자).",
    tip: "IRP에 넣어두고 55세 이후 연금으로 수령하면 퇴직소득세 30~40% 절감 가능해요",
  },
];

const CHECKLIST = [
  "정관 조항 확인: 임원 퇴직금 지급 근거 조항 존재 여부",
  "주주총회 결의: 지급 전 반드시 결의 및 의사록 보관",
  "세법 한도: 월 보수 × 재임연수 × 1/10 × 최대 3배 이내",
  "퇴직소득세: 임원도 근로자와 동일한 세율 적용",
  "IRP 수령: 퇴직금 300만원 초과 시 IRP로만 수령 (2022년 4월 이후)",
];

const FAQS = [
  {
    q: "임원은 퇴직금을 무조건 받을 수 있나요?",
    a: "아니에요. 근로자와 달리 임원 퇴직금은 법정 의무가 없어요. 정관이나 주주총회 결의로 지급 규정이 있어야 받을 수 있고, 규정이 없으면 청구 근거 자체가 없어요.",
  },
  {
    q: "임원이면서 실질적으로 근로자 역할도 한 경우엔?",
    a: "사용자의 지휘·감독 아래 근로를 제공한 사실이 있다면 근로자성을 인정받을 수 있어요. 법원에서도 등기임원이지만 실질 근로자로 본 사례가 있어요. 이 경우 근로기준법상 퇴직금도 별도로 청구 가능해요.",
  },
  {
    q: "세법 한도 계산법을 알기 쉽게 설명해줘요.",
    a: "월 평균 보수 × 재임연수 × 1/10 × 지급 배율(최대 3배)예요. 예를 들어 월 보수 600만원, 재임 5년, 배율 2배라면 600만 × 5 × 0.1 × 2 = 600만원이에요. 한도를 넘으면 초과분은 법인세 비용으로 안 돼요.",
  },
  {
    q: "임원 퇴직금에도 IRP 의무가 있나요?",
    a: "있어요. 2022년 4월 이후 퇴직자는 300만원 초과 시 IRP 계좌로만 수령해야 해요. 근로자와 동일한 기준이에요.",
  },
  {
    q: "정관에 임원 퇴직금 조항이 없는 소규모 법인이라면?",
    a: "주주 전원 동의로 지급을 결의할 수 있어요. 지급 기준을 명확히 정하고 의사록을 남겨야 해요. 이미 지급한 경우 사후 동의도 가능하지만, 세무상 리스크가 있어요.",
  },
  {
    q: "임원 퇴직금 지급이 지연되면 어떻게 하나요?",
    a: "임원은 근로기준법 14일 규정이 적용 안 돼요. 정관에 명시된 기한을 넘기면 상법 연 6% 지연이자를 청구할 수 있어요. 계속 미지급이면 민사소송 또는 지급명령 신청이 가능해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "상법 제388조: 이사 보수 및 퇴직금 주주총회 결의", url: "https://www.law.go.kr/법령/상법" },
      { label: "법인세법 시행령 제44조: 임원 퇴직금 손금 산입 한도", url: "https://www.law.go.kr/법령/법인세법시행령" },
      { label: "근로자퇴직급여보장법: 근로자 퇴직금 의무", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "국세청: 임원 퇴직금 세무 처리 안내", url: "https://www.nts.go.kr" },
      { label: "고용노동부: 퇴직급여 지급 기준", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "임원퇴직금-지급-기한", title: "임원 퇴직금 지급 기한은 언제까지?", description: "14일 규정이 적용 안 되는 이유와 지연이자 청구법." },
  { slug: "퇴직금-조건", title: "퇴직금 지급 조건 정리", description: "근로자 vs 임원 퇴직금 차이를 설명해요." },
  { slug: "퇴직금-수령방법", title: "퇴직금 수령 방법 전체 정리", description: "일시금·IRP 이전 절차까지." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} highlightSlugs={퇴직금_HIGHLIGHT} currentSlug="임원-퇴직금-지급규정" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 임원 · 지급규정</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        임원 퇴직금 받을 수 있나요?<br />
        정관 근거·세법 한도·주총 결의 조건
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        등기 임원(이사·감사)은 <a href="/w/퇴직금-조건" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법</a>의 직접 적용 대상이 아니에요.
        정관이나 주주총회 결의로 임원 퇴직금 규정을 만들어야 지급 의무가 생겨요.
        규정이 있더라도 <a href="/w/퇴직금-세금" style={{ color: "#1D9E75", textDecoration: "underline" }}>세법 손금 한도</a>를 넘으면 법인세 불이익이 생기고, 주주총회 결의 없이 지급하면 법적 문제로 이어질 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>임원 퇴직금, 어떤 조건이어야 받을 수 있나요?</H2>
      <p style={body}>
        등기 임원은 회사와 위임 관계예요. 근로자처럼 근로기준법이나 근로자퇴직급여보장법이 당연히 적용되지 않아요.
        정관에 "임원퇴직금 지급규정에 따른다"는 조항이 있거나, 주주총회·이사회에서 별도로 결의한 경우에만 지급 의무가 발생해요.
        지급규정에는 산정 기준, 지급 배율, 지급 시기가 명시돼야 해요.
      </p>
      <p style={body}>
        임원으로 등기돼 있어도 실질적으로 사용자의 지휘·감독을 받으며 근로를 제공했다면 근로자성 인정 가능성이 있어요.
        이 경우 <a href="/w/퇴직금-이란" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자 퇴직금</a>도 별도로 청구할 수 있어요.
        판례에서도 등기임원이지만 실질 근로자로 본 사례가 있어요.
      </p>

      <GreenBox>
        ① 정관 조항 또는 주주총회·이사회 결의로 지급 근거 존재<br />
        ② 세법 한도 이내: 월 보수 × 재임연수 × 1/10 × 최대 3배<br />
        ③ IRP 수령: 300만원 초과 시 IRP 계좌로만 수령 (2022년 4월 이후)
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="임원 퇴직금 지급 절차를 진행할 수 있어요. 아래 계산기로 예상 금액을 확인해보세요."
        partialMatchText="임원 퇴직금 지급 요건이 복잡할 수 있어요. 세무사나 법무사 상담을 권해요."
      />

      <Divider />

      <H2>임원 퇴직금 세법 한도는 얼마인가요?</H2>
      <p style={body}>
        법인세법 시행령 제44조에 따르면, 손금으로 인정되는 한도는 최종 월 평균 보수 × 재임연수 × 1/10 × 배율(최대 3배)이에요.
        이 한도를 넘으면 초과분은 법인 비용으로 처리할 수 없어요.
        정관에 배율이 명시돼 있으면 그 배율이 우선이고, 없으면 세법 최대치(3배)가 기준이 돼요.
      </p>
      <p style={body}>
        아래 계산기에서 월 보수와 재임 기간, 정관 배율을 조정하면 예상 퇴직금과 세법 최대 한도를 바로 비교할 수 있어요.
      </p>

      <SectionBadge>임원 퇴직금 한도 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 법인세법 시행령 제44조 기준. 월 평균 보수 × 재임연수 × 1/10 × 배율(최대 3배). 초과분은 손금 불산입."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>임원 퇴직금 수령에 필요한 서류</H2>
      <p style={body}>
        정관과 주주총회 결의 의사록이 핵심이에요. 이 두 서류가 없으면 세법상 손금 처리가 안 돼요.
        법인 등기부등본으로 임원 재임 기간을 증빙해야 해요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>임원 퇴직금 청구 절차 4단계</H2>
      <p style={body}>
        지급 근거 확인부터 세금 처리까지 순서대로 진행해야 해요.
        결의 없이 지급부터 하면 나중에 법적·세무 문제가 생겨요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>임원 퇴직금 주의사항 체크리스트</H2>
      <p style={body}>
        세법 한도와 주주총회 결의를 빠뜨리면 세무조사와 법적 분쟁이 동시에 생길 수 있어요.
        지급 전 아래 5가지를 모두 챙겨야 해요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        임원 퇴직금도 IRP에 넣어두면 과세 이연 효과가 있어요.
        55세 이후 연금으로 받으면 퇴직소득세를 30~40% 절감할 수 있어요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        임원 퇴직금 지급규정에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 상법·법인세법을 바탕으로 작성됐어요. 개인 상황에 따라 결과가 달라질 수 있으니 세무사 또는 법무사 상담을 권해요." />
    </ArticleLayout>
  );
}
