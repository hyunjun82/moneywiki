"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "입사 후 1년이 채 되지 않아 퇴직 예정이에요" },
  { id: "c2", label: "계약직으로 11개월 일하고 계약이 종료됐어요" },
  { id: "c3", label: "주 15시간 이상 근무했어요" },
  { id: "c4", label: "고용보험에 180일 이상 가입됐어요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "월 평균급여", min: 150, max: 400, step: 10, defaultValue: 220, format: (v: number) => `${v}만원` },
  { id: "months", label: "근무 기간", min: 1, max: 11, step: 1, defaultValue: 11, format: (v: number) => `${v}개월` },
];

const CALC_RESULTS = [
  {
    label: "1년 미만 퇴직금",
    getValue: () => 0,
    format: () => "0원 (1년 미만 퇴직금 없음)",
    highlight: true,
  },
  {
    label: "1년 근무 시 예상 퇴직금",
    getValue: (v: Record<string, number>) => v.salary * 10000 * 1,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원 (1년 기준)`,
  },
];

const DOCS = [
  { name: "근로계약서 (근무 기간 확인)", required: true, where: "회사 인사팀" },
  { name: "급여명세서 (마지막 3개월)", required: true, where: "회사 인사팀 또는 급여앱" },
  { name: "퇴직 확인서 또는 사직서 수리 확인", required: false, where: "회사 인사팀" },
  { name: "고용보험 피보험자격 상실 신고서", required: false, where: "근로복지공단 또는 고용보험 홈페이지" },
];

const STEPS = [
  {
    title: "근속기간 정확히 계산",
    desc: "퇴직금 발생 기준은 입사일부터 퇴직일까지 만 1년이에요. 예를 들어 2025년 1월 1일 입사라면, 2026년 1월 1일 퇴직해야 1년이 돼요. 2025년 12월 31일 퇴직은 1년 미만이에요.",
    tip: "입사일 포함, 퇴직일 포함해서 만 1년을 계산해요",
  },
  {
    title: "1년 채울 수 있는지 확인",
    desc: "계약 종료가 확정된 게 아니라면, 1년을 채우는 게 퇴직금 수령에 유리해요. 사용자가 계약 갱신을 거부하거나 1년 직전 해고하면 부당해고에 해당할 수 있어요. 이 경우 노동위원회에 구제신청을 할 수 있어요.",
    tip: "계약 종료 전 1년 채우기 가능 여부를 인사팀에 확인하세요",
  },
  {
    title: "퇴직금 없이 퇴직 시 실업급여 신청",
    desc: "1년 미만 퇴직으로 퇴직금이 없더라도, 고용보험 피보험기간이 180일 이상이면 실업급여를 받을 수 있어요. 자발적 퇴직이 아닌 계약 종료(비자발적 이직)라면 실업급여 신청이 가능해요.",
    tip: "고용24(work24.go.kr)에서 실업급여 신청 가능",
  },
  {
    title: "연차 미사용 수당 청구",
    desc: "1년 미만이어도 월 개근 시 1일씩 연차가 발생해요. 퇴직 시 미사용 연차수당을 청구할 수 있어요. 11개월 근무 시 최대 11일 연차수당이 발생할 수 있어요.",
    tip: "연차수당은 퇴직금과 별개로 반드시 정산돼요",
  },
];

const CHECKLIST = [
  "만 1년 여부: 입사일~퇴직일 정확히 계산",
  "1년 미만이면 퇴직금 없음",
  "고용보험 180일 이상: 실업급여 신청 가능",
  "연차 미사용수당: 1년 미만도 발생, 별도 청구",
  "계약 종료 전 1년 채우기 가능 여부 인사팀 확인",
];

const FAQS = [
  {
    q: "1년 딱 되는 날 퇴직하면 퇴직금이 생기나요?",
    a: "맞아요. 입사일로부터 만 1년이 되는 날 퇴직하면 퇴직금이 발생해요. 예를 들어 1월 1일 입사 후 다음 해 1월 1일 퇴직이면 퇴직금이 있어요.",
  },
  {
    q: "계약직 11개월 후 계약 종료되면 퇴직금이 없나요?",
    a: "1년 미만이면 퇴직금이 없어요. 하지만 계약이 비자발적으로 종료됐다면 실업급여 신청이 가능해요. 연차 미사용 수당도 별도로 청구할 수 있어요.",
  },
  {
    q: "1년이 안 됐는데 퇴직금을 받을 방법이 있나요?",
    a: "법적으로는 없어요. 퇴직금 발생 요건은 만 1년 이상이에요. 단, 연차수당과 실업급여는 별도 요건으로 받을 수 있어요.",
  },
  {
    q: "알바로 8개월 일했는데 아무것도 못 받나요?",
    a: "퇴직금은 없어요. 하지만 주 15시간 이상 근무했고, 고용보험에 가입했다면 실업급여를 받을 수 있어요. 연차수당도 청구 가능해요.",
  },
  {
    q: "1년 직전에 해고당하면 어떻게 되나요?",
    a: "부당해고에 해당할 수 있어요. 노동위원회에 부당해고 구제신청을 할 수 있고, 원직 복직이나 금전 보상을 요구할 수 있어요. 퇴직금을 피하려는 의도적 해고는 법적으로 다툴 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 제8조: 퇴직금 지급 요건 (계속근로 1년)", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "근로기준법 제60조: 연차 유급휴가 (1년 미만 월 1일)", url: "https://www.law.go.kr/법령/근로기준법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부: 퇴직금 제도 안내", url: "https://www.moel.go.kr" },
      { label: "고용24: 실업급여 신청", url: "https://www.work24.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-조건", title: "퇴직금 받는 조건", description: "1년·주15시간 요건과 예외 상황이에요." },
  { slug: "퇴직금-계산법", title: "퇴직금 계산기", description: "근속기간별 예상 퇴직금 바로 확인해요." },
  { slug: "퇴직금-소멸시효", title: "퇴직금 소멸시효 3년", description: "청구 기한과 시효 중단 방법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-1년미만" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 1년미만 · 수령여부</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        1년 미만 근무하면 퇴직금이 없나요?<br />
        연차수당·실업급여로 보완하는 방법까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금은 딱 1년을 채워야 생겨요. 11개월 29일을 일해도 퇴직금은 0원이에요.
        이 기준은 정규직이든 계약직이든 알바든 동일하게 적용되고,
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법 제8조</a>에 명시된 요건이에요.
        그렇다고 1년 미만 퇴직이 무조건 손해인 건 아니에요.
        연차 미사용 수당과 실업급여는 퇴직금과 별개로 챙길 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>지금 상황이 해당되는지 확인해보세요</H2>
      <p style={body}>
        퇴직금은 만 1년 이상, 주 15시간 이상 두 가지 조건을 모두 충족해야 발생해요.
        1년 미만이라도 실업급여와 연차수당은 다른 요건으로 별도 신청이 가능해요.
      </p>
      <p style={body}>
        특히 1년 직전 계약이 갑자기 종료되거나 해고된 경우라면 부당해고 여부를 따져봐야 해요.
        퇴직금을 피하려는 의도로 1년 전 계약을 끊는 건 법적으로 문제가 될 수 있거든요.
      </p>

      <GreenBox title="1년 기준 퇴직금 발생 여부">
        만 1년(365일) 이상 근무 → 퇴직금 발생<br />
        만 1년 미만(364일 이하) 근무 → 퇴직금 0원<br />
        기준: 근로자퇴직급여보장법 제8조
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="실업급여 신청 요건은 충족돼요. 퇴직금은 없지만 연차수당과 실업급여를 챙겨보세요."
        partialMatchText="상황마다 요건이 달라요. 고용24 또는 고용노동부(1350)에 확인하세요."
      />

      <Divider />

      <H2>1년 미만 퇴직 시 받을 수 있는 금액</H2>
      <p style={body}>
        퇴직금은 0원이에요. 아래 계산기로 직접 확인해보면 이해가 더 쉬워요.
        1년 미만 근무 시 퇴직금이 0원으로 나오고, 만약 1년을 채웠다면 얼마를 받을 수 있었는지도 바로 볼 수 있어요.
      </p>
      <p style={body}>
        월 220만원을 받으며 11개월 근무했다면 퇴직금은 0원이에요. 딱 1년을 채웠다면 약 220만원의 퇴직금이 발생했을 거예요.
        1개월 차이가 수백만원 차이를 만드는 구조예요.
      </p>

      <SectionBadge>1년 미만 퇴직금 시뮬레이션</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 1년 미만이면 퇴직금은 0원이에요. 1년을 채웠을 때 예상 퇴직금을 함께 보여줘요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>퇴직 시 챙겨야 할 서류</H2>
      <p style={body}>
        퇴직금이 없어도 연차수당과 실업급여 신청을 위해 챙겨야 할 서류가 있어요.
        근로계약서와 급여명세서는 근무 기간과 급여를 입증하는 핵심 서류라 반드시 보관해야 해요.
      </p>
      <p style={body}>
        실업급여를 신청하려면 고용보험 피보험자격 상실 신고서가 필요해요.
        퇴직 후 지연되는 경우가 있으니 미리 확인하세요.
        회사가 신고를 늦추면 고용24에서 직접 신고 처리를 요청할 수 있어요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>1년 미만 퇴직 시 대응 절차 4단계</H2>
      <p style={body}>
        퇴직금이 없다고 해서 아무것도 못 받는 건 아니에요.
        연차수당, 실업급여, 부당해고 구제까지 상황에 따라 챙길 수 있는 게 꽤 있어요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>1년 미만 퇴직 체크리스트</H2>
      <p style={body}>
        퇴직 전에 이 항목들을 순서대로 체크해보세요.
        연차수당은 청구하지 않으면 그냥 사라지는 돈이에요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="연차수당은 퇴직금과 완전히 별개예요">
        1년 미만 근무자도 월 개근 시 1일씩 연차가 쌓여요.<br />
        11개월 근무 시 최대 11일치 연차수당을 청구할 수 있어요.<br />
        퇴직금 0원이어도 연차수당은 반드시 받아야 해요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        1년 미만 퇴직금에 대해 많이 헷갈려하는 부분들이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법과 근로기준법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
