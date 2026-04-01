"use client";
import { Divider } from "@/components/article-ui/Divider";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR, 퇴직금_HIGHLIGHT } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "근속 기간이 1년 미만이에요" },
  { id: "c2", label: "4주 평균 주 15시간 이상 근무했어요" },
  { id: "c3", label: "계속 근무 형태로 일했어요 (매일 계약 갱신 방식 아님)" },
  { id: "c4", label: "퇴직금을 받지 못한 채 퇴사했어요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "퇴직 전 3개월 월 평균임금", min: 200, max: 700, step: 10, defaultValue: 280, format: (v: number) => `${v}만원` },
  { id: "days", label: "가상 근속 일수 (1년 채웠다면)", min: 365, max: 3650, step: 30, defaultValue: 365, format: (v: number) => `${v}일` },
];

const CALC_RESULTS = [
  {
    label: "1년 만근 시 받을 수 있는 퇴직금",
    getValue: (v: Record<string, number>) => Math.round(v.salary * 10000 * (v.days / 365)),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "월 평균임금 기준 1년치 퇴직금",
    getValue: (v: Record<string, number>) => Math.round(v.salary * 10000),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "근로계약서 (입사일·근로시간·임금 명시)", required: true, where: "회사 인사팀 또는 입사 시 수령본" },
  { name: "급여명세서 또는 통장 이체 내역", required: true, where: "회사 인사팀 또는 본인 통장" },
  { name: "출퇴근 기록 (출근부·카드 기록·메시지 등)", required: false, where: "회사 또는 본인 보관 자료" },
  { name: "4대보험 가입 확인서", required: false, where: "4대사회보험포털(www.4insure.or.kr)" },
  { name: "재직증명서", required: false, where: "회사 인사팀 발급" },
];

const STEPS = [
  {
    title: "법적 지급 의무 여부 판단",
    desc: "근로자퇴직급여보장법 제4조는 '계속 근로 1년 이상 + 주 15시간 이상'을 퇴직금 지급 요건으로 규정해요. 1년 미만이면 이 조건을 충족하지 못해서 사업주에게 법적 지급 의무가 없어요. 단, 회사 내규나 취업규칙에 별도 규정이 있으면 그 규정이 적용돼요.",
    tip: "취업규칙이나 근로계약서에 '1년 미만도 지급' 조항이 있으면 받을 수 있어요.",
  },
  {
    title: "회사에 자발적 지급 요청",
    desc: "법적 의무가 없어도 회사가 자발적으로 줄 수는 있어요. 인사팀에 퇴직금 지급 가능 여부를 문의해보세요. 이 경우에도 퇴직소득으로 처리돼서 퇴직소득세가 부과돼요. 금액이 300만원 초과면 IRP로만 수령해야 해요.",
    tip: "내규에 근거 없이 지급하더라도 법적으로 문제없어요.",
  },
  {
    title: "DC형 퇴직연금 납입금 수령",
    desc: "회사에 DC형(확정기여형) 퇴직연금이 있다면 1년 미만이어도 납입된 금액을 받을 수 있어요. 금융감독원 통합연금포털(100lifeplan.fss.or.kr)에서 내 퇴직연금 유형과 적립금을 조회할 수 있어요.",
    tip: "DC형은 사용자가 매년 연봉의 1/12 이상을 근로자 계좌에 납입하는 방식이에요.",
    link: { label: "퇴직연금 유형 확인하기", href: "https://100lifeplan.fss.or.kr" },
  },
  {
    title: "실업급여 신청 (비자발적 퇴직일 때)",
    desc: "퇴직금을 못 받더라도 고용보험 피보험기간 180일 이상 + 비자발적 퇴직이면 실업급여를 신청할 수 있어요. 퇴직 후 12개월 내에 고용센터에 방문해서 수급 자격 인정 신청을 해야 해요.",
    tip: "계약 만료, 권고사직, 회사 귀책 사유 퇴직은 비자발적으로 인정돼요.",
    link: { label: "실업급여 조건 확인", href: "/w/실업급여-피보험기간" },
  },
];

const CHECKLIST = [
  "근로자퇴직급여보장법 제4조: 1년 이상이 법적 지급 요건",
  "취업규칙·근로계약서: 1년 미만 지급 규정 있는지 확인",
  "DC형 퇴직연금: 1년 미만이어도 납입금 수령 가능",
  "회사 자발적 지급: 법 의무는 없지만 가능, 퇴직소득세 부과",
  "실업급여: 피보험 180일 이상 + 비자발적 퇴직이면 별도 신청",
  "소멸시효: 청구권은 퇴직일로부터 3년 내 행사 필요",
];

const FAQS = [
  {
    q: "1년 미만이면 법으로 퇴직금을 못 받는 건가요?",
    a: "근로자퇴직급여보장법 제4조는 계속 근로 1년 이상을 지급 요건으로 규정해요. 1년 미만이면 사업주에게 법적 지급 의무가 없어요. 단, 취업규칙이나 단체협약에 별도 규정이 있으면 그 규정에 따라 받을 수 있어요.",
  },
  {
    q: "회사가 1년 미만인데도 퇴직금을 주겠다고 하면?",
    a: "받을 수 있어요. 법적 의무는 없지만 회사가 자발적으로 주는 건 아무 문제가 없어요. 이 경우 퇴직소득으로 처리돼서 퇴직소득세가 부과돼요. 금액이 300만원을 넘으면 IRP로만 수령해야 해요.",
  },
  {
    q: "주 15시간 이상 일했는데도 1년 미만이면 퇴직금이 없나요?",
    a: "주 15시간 기준과 1년 근속 기준은 별개예요. 주 15시간 이상은 퇴직금 적용 대상 근로자 범위를 정하는 조건이에요. 이 조건을 충족해도 1년을 채우지 못하면 법정 퇴직금이 발생하지 않아요.",
  },
  {
    q: "1년 미만 퇴직금 지급 규정이 있는 회사는 얼마나 되나요?",
    a: "취업규칙에 별도 규정을 두는 회사는 많지 않아요. 입사 전 근로계약서와 취업규칙에 이런 조항이 있는지 확인하는 게 가장 정확해요. 고용노동부 공식 자료에 따르면 법적 의무 외 자발적 지급은 회사 재량이에요.",
  },
  {
    q: "5인 미만 사업장도 1년 미만이면 퇴직금 없나요?",
    a: "5인 미만이어도 동일해요. 근로자퇴직급여보장법은 사업장 규모와 무관하게 적용돼요. 1년 이상 근무해야 퇴직금 지급 의무가 생겨요. 1년 미만이면 5인 미만 사업장도 법적 지급 의무가 없어요.",
  },
  {
    q: "1년 미만 퇴직금 청구권 소멸시효는 얼마나 되나요?",
    a: "회사가 자발적으로 지급하기로 했거나 내규에 규정이 있는 경우, 청구권 소멸시효는 3년이에요. 취업규칙이나 계약서에 근거가 있다면 퇴직일로부터 3년 내에 청구해야 해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 제4조: 퇴직급여제도 설정", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "근로기준법 제18조: 단시간 근로자 적용 기준", url: "https://www.law.go.kr/법령/근로기준법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부: 퇴직급여제도 안내", url: "https://www.moel.go.kr" },
      { label: "금융감독원: 퇴직연금 통합포털", url: "https://100lifeplan.fss.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-조건", title: "퇴직금 지급 조건", description: "1년·주 15시간 기준을 법조문 기반으로 설명해요." },
  { slug: "1년-미만-퇴직금-지급-규정-조건-기준", title: "1년 미만 퇴직금 조건과 DC형 수령", description: "DC형 퇴직연금이면 1년 미만도 받을 수 있어요." },
  { slug: "퇴직금-계산-방법", title: "퇴직금 계산 방법", description: "평균임금 기준 계산 공식을 알기 쉽게 설명해요." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} highlightSlugs={퇴직금_HIGHLIGHT} currentSlug="1년미만-퇴직금-지급규정" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 1년 미만 · 지급 규정</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        1년 미만 근무한 퇴직금, 법적으로 받을 수 있나요?<br />
        지급 규정·예외 조건·대응 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        <a href="/w/퇴직금-기준" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법 제4조</a>는 퇴직금 지급 요건으로 '계속 근로 1년 이상'을 명시하고 있어요.
        1년 미만이면 법적으로 사업주에게 지급 의무가 없어요.
        하지만 취업규칙에 별도 규정이 있거나, 회사에 <a href="/w/퇴직금-DC형-계산법" style={{ color: "#1D9E75", textDecoration: "underline" }}>DC형 퇴직연금</a>이 있다면 예외가 생겨요.
        정확한 지급 규정과 내가 할 수 있는 조치를 아래에서 확인하세요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>1년 미만 퇴직금, 법 규정은 어떻게 돼 있나요?</H2>
      <p style={body}>
        근로자퇴직급여보장법 제4조 제1항은 퇴직금 지급 조건을 '계속 근로기간 1년 이상, 4주간 평균 주 15시간 이상'으로 정해요.
        두 조건을 모두 충족해야 사업주에게 퇴직금을 지급할 의무가 생겨요.
        근속 기간이 1년 미만이면 아무리 열심히 일했어도 이 조건을 충족하지 못해요.
      </p>
      <p style={body}>
        법이 이렇게 정한 건 퇴직금 제도의 취지가 장기 근속에 대한 보상이기 때문이에요.
        그래서 1년을 기준선으로 뒀어요.
        다만 법적 의무가 없다는 것과 회사가 줄 수 없다는 건 다른 얘기예요. 회사가 자발적으로 줄 수는 있어요.
      </p>

      <GreenBox>
        근로자퇴직급여보장법 제4조: 계속 근로 1년 이상이 법적 지급 요건<br />
        1년 미만 → 사업주에게 법적 지급 의무 없음<br />
        예외: 취업규칙 별도 규정 / DC형 퇴직연금 납입금 수령
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="1년 미만이라서 법정 퇴직금 지급 의무는 없어요. 단, 취업규칙 확인 및 DC형 연금 납입금 수령 가능 여부를 확인해보세요."
        partialMatchText="상황에 따라 다를 수 있어요. 아래 내용을 읽어보거나 고용노동부(1350)에 문의해보세요."
      />

      <Divider />

      <H2>1년을 채웠다면 퇴직금이 얼마였을까요?</H2>
      <p style={body}>
        1년 미만이라 못 받는 상황이라면 '1년을 채웠을 때 얼마를 받았을까'를 계산해볼 수 있어요.
        퇴직금은 평균임금 × 30일 × 근속연수로 계산해요.
        1년 근속이면 월 평균임금 1개월치가 기준이에요.
      </p>

      <SectionBadge>1년 채웠을 때 퇴직금 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 퇴직 전 3개월 평균임금 × 30일 × (근속일수 ÷ 365) 기준. 실제 금액은 평균임금 산정 방식에 따라 다를 수 있어요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>퇴직금 지급 규정 관련 서류</H2>
      <p style={body}>
        취업규칙이나 근로계약서에 1년 미만 지급 규정이 있는지 확인하려면 관련 서류가 필요해요.
        미지급 분쟁이 생길 경우를 대비해서 근무 증빙 자료도 챙겨두세요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>1년 미만 퇴직 후 대응 절차</H2>
      <p style={body}>
        법정 퇴직금을 받기 어렵더라도 할 수 있는 조치가 있어요.
        취업규칙 확인부터 DC형 수령, 실업급여 신청까지 단계적으로 챙기세요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>퇴직 전 체크리스트</H2>
      <p style={body}>
        1년 미만 퇴직이라면 법적 권리가 제한적이에요. 그래도 챙길 수 있는 것들은 꼼꼼하게 챙겨야 해요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        법적 의무는 없지만 DC형 퇴직연금에 납입된 금액은 내 것이에요.<br />
        금융감독원 통합연금포털(100lifeplan.fss.or.kr)에서 내 연금 적립금을 바로 조회할 수 있어요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        1년 미만 퇴직금 지급 규정에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법을 바탕으로 작성됐어요. 법 개정이 있을 수 있으니 최신 기준은 고용노동부(1350) 또는 법제처(www.law.go.kr)에서 확인하세요." />
    </ArticleLayout>
  );
}
