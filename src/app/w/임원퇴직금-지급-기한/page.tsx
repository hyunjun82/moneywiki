"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR, 퇴직금_HIGHLIGHT } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "법인 등기 임원(이사·감사)으로 재임했어요" },
  { id: "c2", label: "퇴직 후 임원 퇴직금이 약속한 기한에 지급되지 않았어요" },
  { id: "c3", label: "정관이나 주주총회 결의에 지급 시기가 명시돼 있어요" },
  { id: "c4", label: "지급 지연에 따른 이자나 법적 청구를 검토하고 있어요" },
];

const CALC_SLIDERS = [
  { id: "amount", label: "미지급 임원 퇴직금", min: 100, max: 10000, step: 100, defaultValue: 1000, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "months", label: "지연 기간", min: 1, max: 36, step: 1, defaultValue: 3, format: (v: number) => `${v}개월` },
];

const CALC_RESULTS = [
  {
    label: "지연이자 예상액 (상법 연 6% 기준)",
    getValue: (v: Record<string, number>) => Math.round(v.amount * 10000 * 0.06 / 12 * v.months),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "원금 + 지연이자 합계",
    getValue: (v: Record<string, number>) => Math.round(v.amount * 10000 + v.amount * 10000 * 0.06 / 12 * v.months),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "정관 (임원 퇴직금 지급 시기 조항)", required: true, where: "법인 보관 또는 공증사무소" },
  { name: "주주총회 결의서 또는 의사록 (지급 시기 기재)", required: true, where: "법인 사무처" },
  { name: "법인 등기부등본 (재임 기간 확인)", required: true, where: "대법원 인터넷등기소" },
  { name: "퇴직금 지급 요청 내용증명", required: false, where: "우체국 또는 법무사" },
  { name: "퇴직 사유서 또는 사임서", required: false, where: "본인 제출" },
];

const STEPS = [
  {
    title: "정관·결의에서 지급 기한 확인",
    desc: "정관에 '퇴직 후 30일 이내' 같은 기한이 있으면 그 기간이 기준이에요. 기한이 없으면 주주총회 결의에서 정한 날짜가 기준이 돼요. 정관과 결의 모두 기한이 없다면 상법·민법상 '상당한 기간' 원칙이 적용돼요.",
    tip: "기한 명시 여부에 따라 이자 청구 가능 시점이 달라져요",
  },
  {
    title: "내용증명 발송으로 지급 촉구",
    desc: "기한이 지났다면 내용증명으로 지급을 요청하세요. 내용증명은 법적 효력은 없지만 지급 요청 사실을 공식적으로 남길 수 있어요. 발송일 기준으로 지연이자 기산점을 명확히 할 수 있어요.",
    tip: "내용증명 발송 후 2주 이내 회신이 없으면 법적 절차를 준비하세요",
  },
  {
    title: "지연이자 청구",
    desc: "약정한 지급 기한을 넘겼다면 이자를 청구할 수 있어요. 임원은 근로기준법의 연 20% 지연이자가 아닌 상법상 법정이율(연 6%)이 적용돼요. 약정 이율이 있으면 그 이율이 우선이에요.",
    tip: "약정 지급일이 없으면 '상당한 기간' 초과 여부를 다퉈야 해서 소송 난이도가 높아요",
  },
  {
    title: "법적 청구 (지급명령·민사소송)",
    desc: "지연이 계속되면 법원에 지급명령 신청 또는 민사소송을 제기할 수 있어요. 임원 퇴직금 분쟁은 근로기준법이 아닌 상법과 민법을 적용해요. 3,000만원 이하라면 소액심판으로 빠르게 처리할 수 있어요.",
    tip: "변호사 상담 없이 진행하면 주장 근거가 약해질 수 있어요",
  },
];

const CHECKLIST = [
  "정관 기한 확인: '퇴직 후 N일 이내' 조항 존재 여부",
  "주주총회 결의서: 지급 시기 명시 여부",
  "지연이자율: 상법 연 6% (약정이율이 있으면 우선 적용)",
  "내용증명 발송: 지급 요청 사실 공식화",
  "소송 유형: 소액심판(3,000만원 이하) vs 민사소송",
];

const FAQS = [
  {
    q: "임원 퇴직금도 14일 이내에 줘야 하나요?",
    a: "아니에요. 14일 이내 지급 규정은 근로기준법 조항이라서 근로자에게만 적용돼요. 등기 임원은 위임 관계라서 정관이나 주주총회에서 정한 기한이 기준이 돼요.",
  },
  {
    q: "정관에 지급 기한이 없으면 언제까지 줘야 하나요?",
    a: "상법·민법상 '상당한 기간' 내에 지급해야 해요. 판례에서는 보통 퇴직 후 수개월 이내를 기준으로 봐요. 합리적인 기간을 넘기면 이자 청구와 민사소송이 가능해요.",
  },
  {
    q: "임원 퇴직금 지연이자는 몇 %인가요?",
    a: "약정 이율이 없으면 상법 법정이율 연 6%가 적용돼요. 근로자(연 20%)보다 낮아요. 정관이나 결의에 지연이율을 별도로 정해두면 그 이율이 우선이에요.",
  },
  {
    q: "임원이 근로자성도 인정되면 어떻게 되나요?",
    a: "실질적으로 사용자 지휘 아래 근로를 제공한 사실이 입증되면 근로기준법 적용 대상이 돼요. 그 경우 14일 지급 의무와 연 20% 지연이자 규정이 적용돼요. 법원이나 노동위원회에서 다툴 수 있어요.",
  },
  {
    q: "소액심판으로 청구할 수 있나요?",
    a: "퇴직금 청구액이 3,000만원 이하라면 소액심판 절차를 쓸 수 있어요. 비용이 적고 처리 기간이 빠른 편이에요. 3,000만원 초과라면 일반 민사소송으로 진행해야 해요.",
  },
  {
    q: "내용증명을 꼭 보내야 하나요?",
    a: "법적 의무는 아니에요. 다만 지급 요청 사실을 공식적으로 남길 수 있고, 이후 소송에서 지연이자 기산점을 명확히 하는 데 도움이 돼요. 가능하면 발송하는 게 유리해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "상법 제388조: 이사 보수 및 퇴직금 주주총회 결의", url: "https://www.law.go.kr/법령/상법" },
      { label: "법인세법 시행령 제44조: 임원 퇴직금 손금 한도", url: "https://www.law.go.kr/법령/법인세법시행령" },
      { label: "민법 제379조: 법정이율", url: "https://www.law.go.kr/법령/민법" },
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
  { slug: "임원-퇴직금-지급규정", title: "임원 퇴직금 지급규정이 없으면?", description: "정관 근거·세법 한도·주총 결의 조건 정리." },
  { slug: "퇴직금-지급-기한-초과", title: "퇴직금 지급 기한 초과 대응", description: "근로자 기준 14일 초과 시 지연이자 청구법." },
  { slug: "퇴직금-미지급-신고", title: "퇴직금 미지급 신고 방법", description: "고용노동부 신고 절차와 대지급금 안내." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} highlightSlugs={퇴직금_HIGHLIGHT} currentSlug="임원퇴직금-지급-기한" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 임원 · 지급기한</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        임원 퇴직금 지급 기한, 14일 규정이 적용될까요?<br />
        정관 기준·지연이자·법적 청구 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        일반 근로자의 <a href="/w/퇴직금-지급-기한" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 14일 이내 지급</a> 규정은 임원에게 적용되지 않아요.
        임원은 근로기준법이 아닌 상법·민법의 위임 관계에 따라 정관이나 주주총회 결의에서 정한 기한에 지급해야 해요.
        정관에 기한이 없으면 '상당한 기간' 내에 줘야 하고, 그것도 넘기면 상법 연 6% 지연이자 청구와 민사소송이 가능해요.
        <a href="/w/임원-퇴직금-지급규정" style={{ color: "#1D9E75", textDecoration: "underline" }}>임원 퇴직금 규정</a> 전반을 함께 보면 더 명확해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>임원 퇴직금 지급 기한, 정관이 기준이에요</H2>
      <p style={body}>
        법인 등기 임원은 근로기준법상 근로자가 아니에요. 그래서 근로기준법 제36조의 14일 이내 지급 의무가 적용되지 않아요.
        정관에 "퇴직 후 30일 이내" 같은 지급 시기 조항이 있으면 그 기한이 기준이 돼요.
        정관에 기한이 없다면 주주총회 결의에서 지급 시기를 별도로 정할 수 있어요.
      </p>
      <p style={body}>
        정관에도, 결의에도 기한이 없다면 상법·민법상 '상당한 기간' 내에 지급해야 해요.
        판례에서는 보통 퇴직 후 수개월 이내를 기준으로 봐요.
        이 기간을 넘기면 지연이자 청구와 민사소송이 가능해요.
      </p>

      <GreenBox>
        ① 정관에 기한 명시 → 그 기한 적용<br />
        ② 주주총회 결의로 별도 지정 → 결의 기한 적용<br />
        ③ 기한 없으면 → 상당한 기간 (보통 수개월)<br />
        지연 시 이자: 상법 연 6% (약정이율 우선 적용)
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="임원 퇴직금 지급 기한 문제에 해당해요. 아래 계산기로 지연이자를 확인해보세요."
        partialMatchText="상황에 따라 다를 수 있어요. 세무사 또는 변호사 상담을 권해요."
      />

      <Divider />

      <H2>지연이자 얼마나 청구할 수 있나요?</H2>
      <p style={body}>
        약정 지급 기한을 넘겼다면 상법 법정이율 연 6%로 이자를 청구할 수 있어요.
        근로자에게 적용되는 연 20%보다 낮지만, 금액이 크면 무시할 수 없어요.
        아래 계산기로 미지급 퇴직금과 지연 기간을 입력하면 청구 가능한 이자를 확인할 수 있어요.
      </p>

      <SectionBadge>지연이자 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 상법 법정이율 연 6% 기준. 약정 이율이 있으면 약정 이율이 우선이에요. 실제 금액은 소송 결과에 따라 달라질 수 있어요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>임원 퇴직금 청구에 필요한 서류</H2>
      <p style={body}>
        정관과 주주총회 의사록이 핵심이에요. 이 두 서류에 지급 기한이 적혀 있어야 지연이자 청구 근거가 명확해져요.
        재임 기간은 법인 등기부등본으로 증빙해요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>임원 퇴직금 미지급 시 청구 절차 4단계</H2>
      <p style={body}>
        정관 기한 확인부터 법적 청구까지 단계별로 접근해야 해요.
        내용증명을 먼저 보내고, 응답이 없으면 법적 절차로 넘어가는 게 효율적이에요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>청구 전 꼭 확인할 체크리스트</H2>
      <p style={body}>
        지급 기한과 이자율을 명확히 파악해야 청구 금액이 정확해요.
        내용증명 발송 여부도 소송 준비에 영향을 줘요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        지급 기한이 없으면 '상당한 기간'이 얼마인지 다퉈야 해서 소송 기간이 길어질 수 있어요.
        정관 작성 단계에서 지급 시기를 명시해두는 게 분쟁을 예방하는 가장 확실한 방법이에요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        임원 퇴직금 지급 기한에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 상법·민법을 바탕으로 작성됐어요. 임원 퇴직금은 개별 정관과 사실관계에 따라 결과가 달라질 수 있으니 세무사 또는 변호사 상담을 권해요." />
    </ArticleLayout>
  );
}
