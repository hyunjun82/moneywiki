"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "이사·감사 등 임원으로 등기되어 있어요" },
  { id: "c2", label: "퇴직 후 임원 퇴직금을 청구하고 싶어요" },
  { id: "c3", label: "회사 정관이나 임원퇴직금 지급규정이 있는지 모르겠어요" },
  { id: "c4", label: "근로자와 임원을 겸직하는 경우예요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "최종 월 보수", min: 300, max: 2000, step: 50, defaultValue: 600, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "years", label: "임원 재임 기간", min: 1, max: 30, step: 1, defaultValue: 5, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "임원 퇴직금 (정관 규정 없을 때 법인세법 한도 기준)",
    getValue: (v: Record<string, number>) => Math.round(v.salary * 10000 / 10 * v.years * 3),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "손금 한도 기준 (월 보수 × 재임연수 × 1/10 × 3배)",
    getValue: (v: Record<string, number>) => Math.round(v.salary * 10000 / 10 * v.years * 3),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "회사 정관 (임원 퇴직금 관련 조항)", required: true, where: "법인등기부 또는 회사 경영지원팀" },
  { name: "임원퇴직금 지급규정 또는 이사회 결의서", required: true, where: "회사 경영지원팀" },
  { name: "재임 기간 확인 서류 (등기부등본)", required: true, where: "법원등기소 또는 인터넷등기소" },
  { name: "최종 보수 확인 서류 (급여 지급 내역)", required: false, where: "경리팀 또는 급여명세서" },
];

const STEPS = [
  {
    title: "임원 퇴직금 지급 근거 확인",
    desc: "임원 퇴직금은 법정 의무가 아니에요. 정관 또는 주주총회·이사회 결의에 명시된 경우에만 지급 의무가 발생해요. 정관에 '임원 퇴직금 지급규정에 따른다'는 조항이 있으면 그 규정이 기준이에요.",
    tip: "지급규정이 없으면 주주총회 특별결의로 사후에 정할 수도 있어요",
  },
  {
    title: "지급액 계산",
    desc: "지급규정에 금액 기준이 명시되어 있으면 그에 따라요. 규정이 없을 때는 세법상 손금 한도(최종 월 보수 × 재임연수 × 1/10 × 3배)를 참고해요. 이 한도를 초과하면 법인세법상 손금 산입이 안 돼요.",
    tip: "임원 퇴직금은 과도하면 세무조사 리스크가 있어요",
  },
  {
    title: "주주총회 또는 이사회 결의",
    desc: "임원 퇴직금 지급을 위한 주주총회(또는 정관에 위임된 이사회) 결의가 필요해요. 결의 없이 지급하면 법인 자금 횡령 등 문제가 될 수 있어요. 소규모 법인은 주주 전원 동의서로 대체하기도 해요.",
    tip: "결의 후 의사록을 반드시 보관해두세요",
  },
  {
    title: "지급 및 세금 처리",
    desc: "임원 퇴직금도 퇴직소득세 과세 대상이에요. 근속 기간은 임원 재임 기간 기준이고, 세율은 근로자 퇴직금과 동일하게 적용돼요. 손금 한도 초과분은 법인세 비용 처리가 안 돼요.",
    tip: "임원 퇴직금도 IRP로 수령하면 퇴직소득세 절세 가능해요",
  },
];

const CHECKLIST = [
  "정관 또는 지급규정 — 임원 퇴직금 근거 조항 확인",
  "주주총회 결의 — 지급 전 반드시 결의 필요",
  "세법 한도 — 월 보수 × 재임연수 × 1/10 × 3배 이내",
  "퇴직소득세 — 임원도 근로자와 동일하게 과세",
  "IRP 수령 — 300만원 초과 시 IRP로만 수령 (2022년 이후)",
];

const FAQS = [
  {
    q: "임원은 퇴직금을 무조건 받을 수 있나요?",
    a: "아니에요. 근로자와 달리 임원 퇴직금은 법정 의무가 없어요. 정관이나 주주총회 결의로 지급 규정이 있어야 받을 수 있어요. 규정이 없으면 받기 어려워요.",
  },
  {
    q: "임원이면서 근로자 역할도 하는 경우엔?",
    a: "실질적으로 근로자에 해당하는 업무를 했다면 근로자 퇴직금도 별도로 청구할 수 있어요. 법원에서도 등기임원이어도 실질 근로자로 보는 경우가 있어요. 근로감독관 확인이나 소송으로 다퉈볼 수 있어요.",
  },
  {
    q: "임원 퇴직금 세법 한도는 어떻게 계산하나요?",
    a: "최종 월 보수 × 재임연수 × 1/10 × 3배예요. 예를 들어 월 600만원, 5년 재임이면 600만 × 5 × 1/10 × 3 = 900만원이에요. 이 한도를 넘으면 초과분은 법인 비용 처리가 안 돼요.",
  },
  {
    q: "임원 퇴직금에도 IRP 의무가 있나요?",
    a: "300만원 초과 시 IRP로만 수령해야 해요. 근로자와 동일한 기준이에요(2022년 4월 이후 퇴직자).",
  },
  {
    q: "소규모 법인에서 정관에 임원 퇴직금 조항이 없으면?",
    a: "주주 전원 동의로 지급을 결의할 수 있어요. 이 경우 결의 전에 지급 기준을 명확히 정해야 해요. 이미 지급한 경우엔 사후 주주 동의도 가능하지만, 세무상 리스크가 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "상법 제388조 — 임원 보수 주주총회 결의", url: "https://www.law.go.kr/법령/상법" },
      { label: "법인세법 시행령 제44조 — 임원 퇴직금 손금 한도", url: "https://www.law.go.kr/법령/법인세법시행령" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "국세청 — 임원 퇴직금 세무 처리 안내", url: "https://www.nts.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-세금", title: "퇴직금 세금, 얼마나 떼나요?", description: "임원 퇴직금 퇴직소득세를 계산해요." },
  { slug: "퇴직금-IRP-계좌", title: "IRP 계좌 개설 방법", description: "임원도 300만원 초과 시 IRP 수령 필수." },
  { slug: "퇴직금-조건", title: "퇴직금 지급 조건 정리", description: "근로자 vs 임원 퇴직금 차이를 설명해요." },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="임원-퇴직금-지급규정" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 임원 · 지급규정</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        임원 퇴직금 지급규정, 어떻게 되나요?<br />
        정관 근거부터 세법 한도, 주총 결의까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        임원 퇴직금은 근로자처럼 법으로 의무화되어 있지 않아요.
        정관이나 주주총회 결의로 지급 규정이 있어야 받을 수 있고, 세법상 손금 한도(월 보수 × 재임연수 × 1/10 × 3배)도 존재해요.
        임원이면서 실질적으로 근로자 역할을 했다면 <a href="/w/퇴직금-조건" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자 퇴직금</a>도 별도로 청구할 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>임원 퇴직금, 언제 받을 수 있나요?</H2>
      <p style={body}>
        등기 임원(이사·감사 등)은 근로기준법 적용을 받지 않아서 법정 퇴직금 의무가 없어요.
        정관에 '임원 퇴직금 지급규정에 따른다'는 조항이 있거나, 주주총회·이사회에서 별도로 결의한 경우에만 지급 의무가 생겨요.
        지급규정에는 산정 기준, 지급 배율, 지급 시기 등이 명시되어야 해요.
      </p>
      <p style={body}>
        임원이지만 실질적으로 근로자 역할을 했다면(직속 상관의 지휘·감독을 받은 경우) 근로자성 인정 소송으로 근로자 퇴직금을 청구할 수도 있어요.
        판례에서도 등기임원이라도 근로자성을 인정한 사례가 있어요.
      </p>

      <GreenBox title="임원 퇴직금 지급 요건">
        정관 조항 또는 주주총회·이사회 결의 필요<br />
        세법 한도: 월 보수 × 재임연수 × 1/10 × 3배<br />
        300만원 초과 시 IRP로만 수령 (2022년 4월 이후)
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="임원 퇴직금 지급 절차를 진행할 수 있어요. 아래에서 예상 금액을 확인하세요."
        partialMatchText="임원 퇴직금 요건이 복잡할 수 있어요. 세무사나 법무사 상담을 권해요."
      />

      <Divider />

      <H2>임원 퇴직금 세법 한도 계산</H2>
      <p style={body}>
        최종 월 보수와 재임 기간을 입력하면 세법상 손금 산입 한도 내 임원 퇴직금을 확인할 수 있어요.
        이 한도를 초과하면 초과분은 법인세 비용으로 처리할 수 없어요.
      </p>

      <SectionBadge>임원 퇴직금 한도 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 법인세법 시행령 제44조 기준. 월 보수 × 재임연수 × 1/10 × 3배. 초과분은 손금 산입 불가해요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>지급에 필요한 서류</H2>
      <p style={body}>
        정관과 지급규정이 핵심이에요. 주주총회 결의 의사록도 반드시 남겨야 법적 효력이 있어요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>임원 퇴직금 지급 4단계</H2>
      <p style={body}>
        지급 근거 확인 → 금액 계산 → 주주총회 결의 → 지급 및 세금 처리 순서예요.
        결의 없이 지급하면 법적 문제가 생길 수 있어요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>임원 퇴직금 체크리스트</H2>
      <p style={body}>
        세법 한도와 주주총회 결의를 꼭 챙기세요. 두 가지 빠뜨리면 세무 리스크와 법적 분쟁이 생겨요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="임원도 IRP로 받아야 절세돼요">
        임원 퇴직금도 IRP에 넣어두면 과세 이연 효과가 있어요.<br />
        55세 이후 연금으로 수령하면 퇴직소득세를 30~40% 절감할 수 있어요.
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
