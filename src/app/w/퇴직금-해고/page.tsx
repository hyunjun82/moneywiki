"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "해고 통보를 받았어요" },
  { id: "c2", label: "1년 이상 근무했어요" },
  { id: "c3", label: "퇴직금을 아직 받지 못했어요" },
  { id: "c4", label: "30일 전 예고 없이 즉시 해고를 당했어요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "월 평균급여", min: 200, max: 600, step: 50, defaultValue: 300, format: (v: number) => `${v}만원` },
  { id: "years", label: "근속 기간", min: 1, max: 20, step: 1, defaultValue: 3, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "해고 시 예상 퇴직금",
    getValue: (v: Record<string, number>) => v.salary * 10000 * v.years,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "해고예고수당 (즉시 해고 시 30일분)",
    getValue: (v: Record<string, number>) => v.salary * 10000,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "해고 통보서 또는 해고 통지 문자·이메일", required: true, where: "회사로부터 수령" },
  { name: "근로계약서", required: true, where: "회사 인사팀" },
  { name: "급여명세서 (최근 3개월)", required: true, where: "회사 인사팀 또는 급여앱" },
  { name: "IRP 계좌번호 (300만원 초과 시)", required: true, where: "은행·증권사 개설" },
];

const STEPS = [
  {
    title: "해고 정당성 확인",
    desc: "해고는 정당한 이유가 있어야 해요. 단순 성격 차이, 능률 저하, 경영상 어려움만으로는 해고가 어려워요. 서면 통지 없는 해고도 절차 위반이에요. 부당해고라면 노동위원회에 구제신청을 할 수 있어요.",
    tip: "해고 통보는 반드시 서면으로 이유를 명시해야 해요",
  },
  {
    title: "퇴직금과 해고예고수당 확인",
    desc: "해고여도 1년 이상 근무했다면 퇴직금을 받아야 해요. 해고 30일 전 예고 없이 즉시 해고하면 30일분 통상임금을 해고예고수당으로 받을 수 있어요. 퇴직금은 해고 후 14일 이내에 지급해야 해요.",
    tip: "해고예고수당은 즉시 해고 시에만 발생해요",
  },
  {
    title: "부당해고 구제신청",
    desc: "해고일로부터 3개월 이내에 노동위원회에 구제신청을 할 수 있어요. 구제 인정 시 원직 복직 또는 해고 기간 임금 상당액을 받을 수 있어요. 5인 미만 사업장은 부당해고 구제신청이 불가하지만 민사소송은 가능해요.",
    tip: "3개월 기한이 지나면 구제신청이 불가해요. 바로 신청하세요",
  },
  {
    title: "실업급여 신청",
    desc: "해고는 비자발적 이직이어서 실업급여 수급 자격이 생겨요. 고용보험 피보험기간 180일 이상이면 신청 가능해요. 퇴직일 다음 날부터 12개월 이내에 신청해야 해요.",
    tip: "고용24(www.work24.go.kr)에서 실업급여 신청 가능",
  },
];

const CHECKLIST = [
  "퇴직금: 해고여도 1년 이상이면 지급 의무",
  "해고예고수당: 30일 전 예고 없으면 30일분 통상임금",
  "부당해고 구제신청: 해고일로부터 3개월 이내",
  "실업급여: 해고 시 바로 신청 가능",
  "퇴직금 지급 기한: 해고 후 14일 이내",
];

const FAQS = [
  {
    q: "해고당해도 퇴직금을 받을 수 있나요?",
    a: "맞아요. 해고는 근로 종료 사유 중 하나이고, 1년 이상 근무했다면 퇴직금 지급 의무가 있어요. 징계 해고여도 동일해요.",
  },
  {
    q: "즉시 해고를 당했어요, 무엇을 더 받을 수 있나요?",
    a: "30일 전 예고 없이 즉시 해고하면 30일분 통상임금(해고예고수당)을 받을 수 있어요. 퇴직금과 별개로 추가 청구 가능해요.",
  },
  {
    q: "부당해고라고 생각해요, 어떻게 해야 하나요?",
    a: "해고일로부터 3개월 이내에 지방노동위원회에 부당해고 구제신청을 해야 해요. 구제 인정 시 복직 또는 임금 상당액을 받을 수 있어요.",
  },
  {
    q: "해고 통보를 말로만 받았는데 유효한가요?",
    a: "아니에요. 해고는 서면으로 해고 사유와 시기를 명시해야 해요. 서면 통지 없는 해고는 절차 위반으로 부당해고에 해당할 수 있어요.",
  },
  {
    q: "5인 미만 사업장에서 해고당했어요",
    a: "5인 미만은 근로기준법 부당해고 조항(제23조)이 적용 안 돼요. 노동위원회 구제신청도 불가해요. 하지만 퇴직금·해고예고수당 지급 의무는 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제23조: 부당해고 금지", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로기준법 제26조: 해고예고 30일", url: "https://www.law.go.kr/법령/근로기준법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부: 부당해고 구제신청 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-미지급-신고", title: "퇴직금 못 받았을 때", description: "고용노동부 진정 절차를 안내해요." },
  { slug: "퇴직금-지급-기한", title: "퇴직금 지급 기한 14일", description: "해고 후 14일 이내 지급 원칙이에요." },
  { slug: "퇴직금-수령방법", title: "퇴직금 수령 방법", description: "IRP 계좌로 안전하게 받는 방법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-해고" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 해고 · 권리</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        해고당했어요, 퇴직금을 받을 수 있나요?<br />
        해고예고수당·부당해고 구제까지 한 번에
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        해고여도 1년 이상 근무했다면 퇴직금은 받을 수 있어요.
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법</a>은 해고 사유와 무관하게 퇴직금 지급을 보장해요.
        30일 전 예고 없이 즉시 해고당했다면 해고예고수당까지 추가로 청구할 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>해고 시 받을 수 있는 것들</H2>
      <p style={body}>
        해고를 당하면 크게 세 가지를 청구할 수 있어요. 퇴직금, 해고예고수당, 실업급여예요.
        각각 요건이 다르니 본인 상황에 맞는 걸 짚어보세요.
      </p>
      <p style={body}>
        부당해고라면 노동위원회 구제신청도 가능해요. 단, 해고일로부터 3개월 이내에 신청해야 해요.
        기한을 놓치면 구제신청 자체가 불가능해지기 때문에 빠르게 움직여야 해요.
      </p>

      <GreenBox title="해고 시 청구 가능한 3가지">
        퇴직금: 1년 이상 근무하면 해고여도 반드시 지급해야 해요<br />
        해고예고수당: 30일 전 서면 예고 없이 즉시 해고하면 30일분 통상임금<br />
        실업급여: 해고는 비자발적 이직이어서 고용보험 180일 이상이면 바로 신청 가능
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="퇴직금과 해고예고수당을 모두 청구할 수 있는 상황이에요. 아래 계산기로 예상 금액을 확인해보세요."
        partialMatchText="상황에 따라 받을 수 있는 항목이 다를 수 있어요. 고용노동부(1350) 상담을 받아보세요."
      />

      <Divider />

      <H2>퇴직금과 해고예고수당 계산해보세요</H2>
      <p style={body}>
        월 평균급여와 근속 기간을 입력하면 예상 퇴직금과 해고예고수당을 바로 볼 수 있어요.
        퇴직금은 30일분 평균임금 × 근속연수로 계산해요.
        해고예고수당은 즉시 해고 시에만 발생하고, 30일분 통상임금이에요.
      </p>

      <SectionBadge>퇴직금·해고예고수당 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 해고예고수당은 30일 전 예고 없이 즉시 해고 시에만 발생해요. 상여금 포함 시 실제 퇴직금이 더 높을 수 있어요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>해고 관련 필요 서류</H2>
      <p style={body}>
        퇴직금 청구든 부당해고 구제신청이든, 서류 준비를 먼저 해야 해요.
        해고 통보서는 특히 중요해요. 회사가 서면으로 통보하지 않았다면 카카오톡, 문자, 이메일이라도 캡처해두세요.
        퇴직금은 300만원 초과 시 IRP 계좌로만 받을 수 있으니 미리 개설해두세요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>해고 대응 절차 4단계</H2>
      <p style={body}>
        해고 통보를 받은 직후 해야 할 일들을 순서대로 정리했어요.
        부당해고라고 느낀다면 구제신청 기한인 3개월을 절대 놓치면 안 돼요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>해고 시 체크리스트</H2>
      <p style={body}>
        해고 후 챙겨야 할 것들을 한 번에 정리했어요. 하나씩 짚어가면서 빠뜨린 게 없는지 확인하세요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="부당해고 구제신청 3개월 기한 주의">
        해고일로부터 3개월이 지나면 노동위원회에 구제신청을 할 수 없어요.<br />
        부당해고라고 생각한다면 퇴직금 청구와 동시에 바로 신청하세요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        해고를 당한 분들이 공통으로 궁금해하는 질문들을 모았어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법과 근로자퇴직급여보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
