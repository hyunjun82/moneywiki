"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "법인 등기 임원(이사·감사)으로 등재되어 있어요" },
  { id: "c2", label: "정관 또는 주주총회에서 임원 퇴직금 규정을 정했어요" },
  { id: "c3", label: "임원 퇴직 후 퇴직금 지급이 지연되고 있어요" },
  { id: "c4", label: "퇴직금 지급 시기가 정관에 명시되어 있지 않아요" },
];

const CALC_SLIDERS = [
  { id: "monthly", label: "월 평균 보수", min: 300, max: 3000, step: 50, defaultValue: 600, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "years", label: "재임 기간", min: 1, max: 30, step: 1, defaultValue: 5, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "법정 한도 기준 퇴직금 (1개월/년)",
    getValue: (v: Record<string, number>) => v.monthly * 10000 * v.years,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "세법 한도 (3개월/년 기준)",
    getValue: (v: Record<string, number>) => v.monthly * 10000 * 3 * v.years,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원 (한도 초과 시 손금 불산입)`,
  },
];

const DOCS = [
  { name: "정관 (임원 퇴직금 규정 포함)", required: true, where: "법인 보관" },
  { name: "주주총회 의사록 (퇴직금 지급 결의)", required: true, where: "법인 사무처" },
  { id: "d3", name: "등기부등본 (임원 등재 확인)", required: true, where: "대법원 인터넷등기소" },
  { name: "퇴직 사유서 또는 사임서", required: false, where: "본인 제출" },
];

const STEPS = [
  {
    title: "정관·규정 확인",
    desc: "법인 정관에 임원 퇴직금 지급 시기가 명시되어 있으면 그 기간에 따라야 해요. 정관에 별도 규정이 없다면 상법 및 민법상 '상당한 기간' 내에 지급해야 해요. 주주총회 결의로 지급 시기를 별도로 정할 수도 있어요.",
    tip: "정관에 '퇴직 후 30일 이내' 등으로 명시된 경우가 많아요",
  },
  {
    title: "주주총회 결의",
    desc: "임원 퇴직금은 주주총회 보통결의로 금액과 지급 시기를 확정해요. 정관에 임원 퇴직금 지급 규정이 있어야 세법상 손금으로 인정돼요. 정관 규정 없이 지급하면 법인세법상 손금 불산입 처리될 수 있어요.",
    tip: "주주총회 의사록에 퇴직금 금액과 지급 시기를 명확히 기재해요",
  },
  {
    title: "지급 기한 초과 시 이자 청구",
    desc: "임원이라도 약정한 지급 기한을 넘기면 이자 청구가 가능해요. 일반 근로자(연 20%)와 달리 임원은 상법상 법정이율(연 6%) 또는 약정이율을 적용해요. 민사소송이나 지급명령 신청이 가능해요.",
    tip: "약정 지급일이 없으면 이자 청구가 어려울 수 있어요",
  },
  {
    title: "법적 청구",
    desc: "지급이 계속 지연되면 법원에 지급명령 신청 또는 민사소송을 제기할 수 있어요. 임원 퇴직금 분쟁은 근로기준법이 아닌 상법과 민법을 적용해요. 변호사 상담 후 진행하는 게 좋아요.",
    tip: "소액심판(3,000만원 이하)은 비용이 적고 처리가 빠르게 돼요",
  },
];

const CHECKLIST = [
  "정관 퇴직금 규정: 지급 시기 명시 여부 확인",
  "주주총회 결의: 금액과 지급 시기 확정",
  "세법 한도: 월 보수의 3배 × 재임연수",
  "지연이자: 상법 연 6% (약정이율 우선 적용)",
  "법적 청구: 지급명령 또는 민사소송",
];

const FAQS = [
  {
    q: "임원 퇴직금도 14일 이내에 줘야 하나요?",
    a: "아니에요. 14일 이내 지급 규정은 근로자에게 적용되는 근로기준법 조항이에요. 임원은 근로자가 아니라 위임 관계라서, 정관이나 주주총회 결의에 따른 기한 내에 지급하면 돼요.",
  },
  {
    q: "정관에 지급 기한이 없으면 언제 줘야 하나요?",
    a: "상법·민법상 '상당한 기간' 내에 줘야 해요. 보통 퇴직 후 수개월 이내를 의미해요. 합리적인 기간을 초과하면 지연에 따른 이자를 청구할 수 있어요.",
  },
  {
    q: "임원 퇴직금 세법 한도가 있나요?",
    a: "있어요. 법인세법상 손금으로 인정되는 한도는 '1개월 평균 보수 × 재임연수 × 정관 지급 배율(최대 3배)'이에요. 한도 초과분은 손금 불산입(세금 불이익)이에요.",
  },
  {
    q: "임원이 근로자성도 인정되면 어떻게 되나요?",
    a: "실질적으로 사용자의 지시를 받고 근로를 제공했다면 근로자로 인정될 수 있어요. 그 경우 근로기준법이 적용돼서 14일 이내 지급 의무와 지연이자(연 20%) 규정이 적용돼요.",
  },
  {
    q: "소액주주인 임원도 퇴직금을 받을 수 있나요?",
    a: "받을 수 있어요. 주주 여부와 상관없이 정관에 임원 퇴직금 규정이 있으면 지급돼요. 다만 대주주 임원은 과도한 퇴직금이 세법상 부당행위로 볼 수 있으니 한도를 지켜야 해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "상법 제388조: 이사 보수", url: "https://www.law.go.kr/법령/상법" },
      { label: "법인세법 시행령 제44조: 임원 퇴직금 손금 한도", url: "https://www.law.go.kr/법령/법인세법시행령" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "국세청: 임원 퇴직금 세무 처리 안내", url: "https://www.nts.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "임원-퇴직금-지급규정", title: "임원 퇴직금 지급 규정", description: "정관 근거·세법 한도·주총 결의." },
  { slug: "퇴직금-지급-기한-초과", title: "퇴직금 지급 기한 초과 대응", description: "14일 초과 시 지연이자 청구법." },
  { slug: "퇴직금-세금", title: "퇴직금 세금, 얼마나 떼나요?", description: "퇴직소득세와 IRP 절세 방법." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="임원퇴직금-지급-기한" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 임원 · 지급기한</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        임원 퇴직금 지급 기한, 14일 규정이 적용될까요?<br />
        정관 기준·지연이자·법적 청구 방법까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        일반 근로자의 <a href="/w/퇴직금-지급-기한-초과" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 14일 이내 지급</a> 규정은 임원에게 적용되지 않아요.
        임원은 근로기준법이 아닌 상법·민법의 위임 관계에 따라 정관이나 주주총회 결의에서 정한 기한에 지급해야 해요.
        정관에 기한이 없으면 '상당한 기간' 내에 줘야 하고, 그것도 넘기면 이자 청구와 민사소송이 가능해요.
        <a href="/w/임원-퇴직금-지급규정" style={{ color: "#1D9E75", textDecoration: "underline" }}>임원 퇴직금 규정</a> 전반을 함께 확인하세요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>임원 퇴직금 지급 기한, 정관이 기준이에요</H2>
      <p style={body}>
        법인 등기 임원은 근로기준법상 근로자가 아니에요. 그래서 근로기준법의 14일 이내 지급 의무가 적용되지 않아요.
        대신 정관에 임원 퇴직금 지급 시기를 명시해두면 그 기간이 기준이 돼요.
        정관에 '퇴직 후 30일 이내' 같은 규정을 두는 경우가 많아요.
      </p>
      <p style={body}>
        정관에 별도 기한이 없다면 주주총회 결의에서 지급 시기를 정할 수 있어요.
        결의도 없다면 상법·민법상 '상당한 기간' 내에 지급해야 해요.
        이 기간을 지나면 지연이자 청구나 민사소송이 가능해요.
      </p>

      <GreenBox title="임원 퇴직금 지급 기한 기준">
        ① 정관에 기한 명시 → 그 기한 적용<br />
        ② 주주총회 결의로 별도 지정 → 결의 기한 적용<br />
        ③ 기한 없으면 → 상당한 기간 (보통 수개월)<br />
        지연 시 이자: 상법 연 6% (약정이율 우선)
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="임원 퇴직금 지급 기한 문제에 해당할 수 있어요. 아래 내용과 계산기를 참고하세요."
        partialMatchText="상황에 따라 다를 수 있어요. 세무사 또는 변호사 상담을 권해요."
      />

      <Divider />

      <H2>임원 퇴직금 세법 한도 계산</H2>
      <p style={body}>
        법인세법상 손금으로 인정되는 임원 퇴직금 한도는 월 평균 보수에 재임연수와 정관 배율(최대 3배)을 곱한 금액이에요.
        한도 초과분은 손금 불산입 처리돼서 법인세 부담이 생겨요.
        아래 계산기로 법정 한도와 세법 한도를 비교해보세요.
      </p>

      <SectionBadge>임원 퇴직금 한도 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 세법 한도: 월 평균 보수 × 재임연수 × 최대 3배. 초과분은 법인세법상 손금 불산입."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>퇴직금 지급에 필요한 서류</H2>
      <p style={body}>
        정관과 주주총회 의사록이 임원 퇴직금 지급의 핵심 서류예요.
        이 두 서류가 없으면 세법상 손금 처리가 안 될 수 있어요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>임원 퇴직금 청구 절차 4단계</H2>
      <p style={body}>
        정관 확인부터 법적 청구까지 단계별로 접근해야 해요.
        정관에 명시된 기한이 가장 먼저 기준이 돼요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>임원 퇴직금 체크리스트</H2>
      <p style={body}>
        세법 한도와 정관 규정을 모두 충족해야 손금 처리가 돼요. 주주총회 결의도 빠뜨리지 마세요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="정관 없이 지급하면 세금 문제가 생겨요">
        임원 퇴직금은 반드시 정관 규정이 있어야 법인세법상 손금으로 인정돼요.
        정관 없이 지급하면 전액 손금 불산입 처리될 수 있어요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        임원 퇴직금 지급 기한에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 상법과 법인세법을 바탕으로 작성됐어요. 임원 퇴직금은 개별 정관·세법 적용이 다를 수 있으니 세무사 또는 변호사 상담을 권해요." />
    </ArticleLayout>
  );
}
