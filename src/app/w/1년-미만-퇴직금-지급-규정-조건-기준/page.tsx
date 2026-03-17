"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "근속 기간이 1년 미만이에요" },
  { id: "c2", label: "주 15시간 이상 근무했어요" },
  { id: "c3", label: "4대 보험에 가입되어 있어요 (정규직·계약직)" },
  { id: "c4", label: "계약 만료 또는 자진 퇴직 예정이에요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "월 평균임금", min: 200, max: 600, step: 10, defaultValue: 250, format: (v: number) => `${v}만원` },
  { id: "months", label: "근속 개월 수 (1~11개월)", min: 1, max: 11, step: 1, defaultValue: 8, format: (v: number) => `${v}개월` },
];

const CALC_RESULTS = [
  {
    label: "퇴직금 (1년 미만 일할 계산)",
    getValue: (v: Record<string, number>) => Math.round(v.salary * 10000 * v.months / 12),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "월 임금 대비 퇴직금 비율",
    getValue: (v: Record<string, number>) => v.months / 12 * 100,
    format: (v: number) => `월급의 약 ${v.toFixed(1)}%`,
  },
];

const DOCS = [
  { name: "근로계약서 (입사일·임금 확인)", required: true, where: "회사 인사팀 또는 입사 시 수령본" },
  { name: "급여명세서 (재직 기간 전체)", required: true, where: "회사 인사팀 요청" },
  { name: "4대보험 가입 확인서", required: false, where: "국민건강보험공단 또는 4대사회보험포털" },
  { name: "출근 기록 또는 근무 확인서", required: false, where: "회사 인사팀 또는 출근부" },
];

const STEPS = [
  {
    title: "퇴직금 지급 요건 확인",
    desc: "근속 1년 미만이라도 ①계속 근무 ②주 15시간 이상 ③1년 미만 근속 세 요건을 갖추면 퇴직금을 받을 수 있어요(근로자퇴직급여보장법 제4조). 일용직·프리랜서처럼 계속성이 없으면 요건 미충족이에요.",
    tip: "주 15시간 미만 단시간 근로자는 퇴직금 지급 대상이 아니에요",
  },
  {
    title: "퇴직금 계산",
    desc: "1년 미만 근속 시 퇴직금은 일할 계산해요. 1년 만근 시 퇴직금 × 실제 근속일수 ÷ 365예요. 예를 들어 8개월(약 243일) 근속 시 월급 250만원이면 약 250만원 × 243/365 = 약 166만원이에요.",
    tip: "달력 기준 실제 근속일수로 계산하는 게 가장 정확해요",
  },
  {
    title: "회사에 퇴직금 지급 요청",
    desc: "퇴직이 확정되면 인사팀에 퇴직금 지급을 요청해요. 퇴직금이 300만원 초과 시 IRP 계좌로만 수령해야 하고, 이하면 일반 계좌로도 받을 수 있어요. 퇴직일로부터 14일 이내에 지급해야 해요.",
    tip: "IRP가 없으면 미리 만들어서 계좌번호를 알려줘야 해요",
  },
  {
    title: "미지급 시 신고",
    desc: "14일이 지나도 지급이 안 되면 지연이자(연 20%)와 함께 청구할 수 있어요. 고용노동부(1350) 또는 사업장 관할 지방노동청에 진정을 내면 돼요. 소멸시효는 퇴직일로부터 3년이에요.",
    tip: "온라인 신고: 고용노동부 민원마당(minwon.moel.go.kr)",
  },
];

const CHECKLIST = [
  "근속 1년 미만이어도 주 15시간 이상 계속 근무 시 퇴직금 지급",
  "퇴직금 계산: 실제 근속일수 ÷ 365로 일할 계산",
  "300만원 초과 시 IRP 계좌로만 수령",
  "지급 기한: 퇴직일로부터 14일 이내",
  "소멸시효: 퇴직일로부터 3년 내에 청구",
];

const FAQS = [
  {
    q: "6개월 일하면 퇴직금을 받을 수 있나요?",
    a: "주 15시간 이상 계속 근무했다면 받을 수 있어요. 6개월 근속 시 퇴직금은 1년 만근 금액의 절반 수준이에요(6/12). 최소 계속 근로 기간 요건은 따로 없고, 1일만 근무해도 조건을 충족하면 퇴직금이 생겨요.",
  },
  {
    q: "계약직도 1년 미만이면 퇴직금을 받나요?",
    a: "맞아요. 정규직·계약직 구분 없이 근로자라면 주 15시간 이상, 계속 근무 요건을 충족하면 퇴직금을 받아요. 계약 만료도 퇴직금 지급 사유예요.",
  },
  {
    q: "알바도 1년 미만이면 퇴직금이 있나요?",
    a: "주 15시간 이상, 4주 기준 60시간 이상 근무했다면 알바도 퇴직금 대상이에요. 단, 주 15시간 미만이면 단시간 근로자로서 퇴직금 지급 의무가 없어요.",
  },
  {
    q: "1년 미만 퇴직금은 얼마나 되나요?",
    a: "1년 만근 퇴직금의 근속 비율이에요. 월급 250만원에 8개월 근무했다면 약 250만원 × 8/12 = 약 167만원이에요. 정확히는 실제 근속일수 ÷ 365로 계산해요.",
  },
  {
    q: "회사가 1년 안 됐다고 퇴직금을 거부하면?",
    a: "주 15시간 이상 계속 근무했다면 법적으로 지급 의무가 있어요. 고용노동부(1350)에 진정을 내면 돼요. 근로자퇴직급여보장법 위반으로 처벌받을 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 제4조: 퇴직금 지급 요건", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "근로기준법 제18조: 단시간 근로자 기준", url: "https://www.law.go.kr/법령/근로기준법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부: 퇴직금 지급 기준 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-1년미만", title: "퇴직금 1년 미만 지급 기준", description: "일할 계산 방법을 자세히 설명해요." },
  { slug: "알바-퇴직금", title: "알바도 퇴직금 받을 수 있나요?", description: "주 15시간 기준과 계산법을 설명해요." },
  { slug: "계약직-퇴직금", title: "계약직 퇴직금 지급 기준", description: "계약 만료 시 퇴직금 지급 조건을 안내해요." },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="1년-미만-퇴직금-지급-규정-조건-기준" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 1년미만 · 지급조건</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        1년 미만 근무해도 퇴직금 받을 수 있나요?<br />
        지급 조건과 일할 계산 기준 정리
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        근속 1년이 안 됐어도 퇴직금을 받을 수 있어요.
        주 15시간 이상 계속 근무했다면 <a href="/w/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법 제4조</a>에 따라 퇴직금 지급 의무가 생겨요.
        금액은 1년 만근 퇴직금을 실제 근속일수로 일할 계산한 금액이에요.
        300만원 초과 시 <a href="/w/퇴직금-IRP-계좌" style={{ color: "#1D9E75", textDecoration: "underline" }}>IRP 계좌</a>로만 수령해야 해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>1년 미만 퇴직금, 받을 수 있는 조건은?</H2>
      <p style={body}>
        조건은 단 두 가지예요. 첫째, 계속 근무한 기간이 있어야 해요. 일용직처럼 매일 계약이 바뀌는 방식이 아니어야 해요.
        둘째, 4주 평균 주 15시간 이상 근무해야 해요. 이 두 조건을 충족하면 근속 기간에 상관없이 퇴직금 지급 의무가 생겨요.
      </p>
      <p style={body}>
        계약직, 아르바이트, 정규직 모두 동일하게 적용돼요.
        "1년 안 됐으니까 퇴직금 없어요"라는 말은 틀린 말이에요. 조건만 충족하면 1개월 근무 후 퇴직해도 퇴직금이 생겨요.
      </p>

      <GreenBox title="1년 미만 퇴직금 지급 조건">
        ① 계속 근무 (일용직 제외)<br />
        ② 4주 기준 주 15시간 이상 근무 (월 60시간 이상)<br />
        → 두 조건 충족 시 퇴직금 지급 의무 발생
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="1년 미만이어도 퇴직금 지급 대상이에요. 아래 계산기로 예상 금액을 확인하세요."
        partialMatchText="조건 충족 여부에 따라 다를 수 있어요. 고용노동부(1350) 상담을 권해요."
      />

      <Divider />

      <H2>1년 미만 퇴직금 계산해보세요</H2>
      <p style={body}>
        월 평균임금과 근속 개월 수를 입력하면 예상 퇴직금을 바로 확인할 수 있어요.
        정확히는 실제 근속일수 ÷ 365로 일할 계산하지만, 개월 수로도 대략적인 금액을 파악할 수 있어요.
      </p>

      <SectionBadge>1년 미만 퇴직금 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 개월 기준 추정치. 정확히는 실제 근속일수 ÷ 365로 계산해요. 300만원 초과 시 IRP 필수."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>퇴직금 청구에 필요한 서류</H2>
      <p style={body}>
        근로계약서와 급여명세서로 근속 기간과 임금을 입증해야 해요.
        서류가 없으면 입증이 어려울 수 있으니 재직 중에 챙겨두세요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>1년 미만 퇴직금 수령 4단계</H2>
      <p style={body}>
        지급 요건 확인 → 퇴직금 계산 → 회사에 청구 → 미지급 시 노동청 신고 순서예요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>퇴직금 청구 체크리스트</H2>
      <p style={body}>
        주 15시간 기준과 계속 근무 여부가 핵심이에요. 두 조건을 충족하면 1년 미만이어도 무조건 지급 대상이에요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="1년 안 됐어도 퇴직금을 청구하세요">
        주 15시간 이상 계속 근무했다면 법적 권리예요.<br />
        "1년 안 됐으니 없다"는 말에 속지 마세요. 조건 충족 시 고용노동부(1350)에 신고하면 돼요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        1년 미만 퇴직금에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법과 근로기준법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
