"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "직원 4명 이하인 사업장에서 일했어요" },
  { id: "c2", label: "1년 이상 계속 근무했어요" },
  { id: "c3", label: "4주 평균 주 15시간 이상 근무했어요" },
  { id: "c4", label: "아직 퇴직한 지 3년이 지나지 않았어요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "월 평균급여", min: 200, max: 400, step: 10, defaultValue: 250, format: (v: number) => `${v}만원` },
  { id: "years", label: "근속 기간", min: 1, max: 10, step: 1, defaultValue: 3, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "예상 퇴직금 (5인 미만도 동일)",
    getValue: (v: Record<string, number>) => v.salary * 10000 * v.years,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "근속 1년당",
    getValue: (v: Record<string, number>) => v.salary * 10000,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원/년`,
  },
];

const DOCS = [
  { name: "근로계약서 (근무 기간 확인)", required: true, where: "사업주 또는 직접 작성본" },
  { name: "급여명세서 또는 계좌 입금 내역", required: true, where: "본인 통장 또는 문자 기록" },
  { name: "근무 사실 증명 자료 (사진·메신저·출퇴근 기록)", required: false, where: "본인 보관" },
  { name: "IRP 계좌번호 (300만원 초과 시)", required: true, where: "은행·증권사 개설" },
];

const STEPS = [
  {
    title: "퇴직금 지급 의무 확인",
    desc: "5인 미만 사업장도 근로자퇴직급여보장법 적용 대상이에요. 1인 사업장이라도 1년 이상, 주 15시간 이상 근무한 근로자에게는 퇴직금을 줘야 해요. '직원이 적으니까 없다'는 말은 틀렸어요.",
    tip: "5인 미만이어도 퇴직금 지급 의무는 동일해요",
  },
  {
    title: "퇴직금 청구",
    desc: "사업주에게 퇴직금 지급을 요청해요. 구두보다 문자나 카카오톡으로 남기는 게 좋아요. 거부하면 고용노동부에 진정을 낼 수 있어요.",
    tip: "청구 내용을 메시지로 남겨두면 증거가 돼요",
  },
  {
    title: "고용노동부 진정 신청",
    desc: "사업주가 거부하면 고용노동부 민원마당에서 온라인으로 진정을 낼 수 있어요. 근로감독관이 조사하고 지급 명령을 내려요. 불이행 시 형사 처벌 대상이에요.",
    tip: "고용노동부 민원마당(minwon.moel.go.kr) 24시간 신청 가능",
  },
  {
    title: "체당금 제도 활용 (사업주 지급 능력 없을 시)",
    desc: "사업주가 폐업하거나 지급 능력이 없으면 고용보험에서 체당금을 지급받을 수 있어요. 퇴직 전 1년분 임금과 퇴직금을 최대 3개월치까지 보전해줘요.",
    tip: "체당금은 법원 도산 판정 또는 행정 도산 확인 후 신청 가능",
  },
];

const CHECKLIST = [
  "5인 미만이어도 퇴직금 지급 의무 동일",
  "1년 이상 + 주 15시간 이상 = 퇴직금 발생",
  "청구 기록: 문자·카카오톡으로 남기기",
  "거부 시 고용노동부 진정 신청",
  "사업주 폐업 시 체당금 제도 활용",
];

const FAQS = [
  {
    q: "직원이 2명인 작은 가게에서 일했는데 퇴직금을 받을 수 있나요?",
    a: "맞아요. 5인 미만이어도 1년 이상, 주 15시간 이상 근무했다면 퇴직금을 받을 수 있어요. 사업장 규모와 무관하게 적용돼요.",
  },
  {
    q: "5인 미만 사업장은 부당해고 보호가 안 된다는데, 퇴직금도 없나요?",
    a: "부당해고 구제(근로기준법 제23조)는 5인 미만에 적용 안 되지만, 퇴직금은 별개예요. 근로자퇴직급여보장법은 사업장 규모 관계없이 모두 적용해요.",
  },
  {
    q: "사장님이 퇴직금이 없다고 하면 어떻게 하나요?",
    a: "고용노동부에 진정을 내세요. 근로 사실만 증명되면 사업주가 퇴직금을 지급해야 해요. 통장 입금 기록, 메신저 기록, 근무 사진 등이 증거가 돼요.",
  },
  {
    q: "근로계약서가 없어도 퇴직금을 받을 수 있나요?",
    a: "받을 수 있어요. 계약서가 없더라도 실제 근무를 입증하면 돼요. 급여 입금 내역, 메신저 업무 지시 기록, 동료 증인도 증거가 돼요.",
  },
  {
    q: "사업주가 폐업했는데 퇴직금을 못 받았어요",
    a: "체당금 제도를 이용하세요. 고용노동부에 신청하면 퇴직 전 1년분 임금과 퇴직금 중 일부를 국가에서 대신 지급해줘요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 제8조: 퇴직금 지급 (사업장 규모 무관)", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 민원마당: 퇴직금 진정 신청", url: "https://minwon.moel.go.kr" },
      { label: "고용노동부: 체당금 제도 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-지급-기준", title: "퇴직금 지급 기준", description: "1년·주15시간 기준과 계산 방법." },
  { slug: "퇴직금-조건", title: "퇴직금 받는 조건", description: "규모별 예외 없는 퇴직금 요건." },
  { slug: "퇴직금-지급-절차", title: "퇴직금 지급 절차", description: "청구부터 수령까지 단계별 안내." },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-지급-기준-5인미만" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 5인미만 · 지급의무</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        직원 4명 이하 사업장, 퇴직금을 줘야 하나요?<br />
        5인 미만도 퇴직금 의무: 청구 방법까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "직원이 몇 명 안 되는 작은 가게니까 퇴직금이 없다"는 말, 들어본 적 있죠? 틀린 말이에요.
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법</a>은
        사업장 규모를 따지지 않아요. 1년 이상 주 15시간 이상 일했다면 사장님이 안 준다고 해도 고용노동부에 진정을 낼 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>5인 미만 사업장도 퇴직금을 줘야 하나요?</H2>
      <p style={body}>
        줘야 해요. 근로자퇴직급여보장법 제8조에는 사업장 규모 제한이 없어요. 1년 이상 계속 근무하고
        4주 평균 주 15시간 이상 일한 근로자라면, 편의점이든 식당이든 1인 사업장이든 퇴직금을 받을 수 있어요.
      </p>
      <p style={body}>
        5인 미만에 적용되지 않는 규정은 따로 있어요. 부당해고 구제(근로기준법 제23조), 연장근로 가산임금 일부 조항은
        5인 이상부터예요. 퇴직금은 그 예외 목록에 없어요. 사업주가 "우리는 5인 미만이라 퇴직금이 없다"고 하면
        법을 잘못 알고 있는 거예요.
      </p>

      <GreenBox title="근로자퇴직급여보장법 제8조 핵심">
        · 적용 대상: 사업장 규모 무관 (1인 사업장 포함)<br />
        · 지급 조건: 1년 이상 계속 근무 + 주 평균 15시간 이상<br />
        · 지급 기한: 퇴직 후 14일 이내 (지연 시 연 20% 이자)
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="퇴직금 지급 기준을 충족해요. 아래 계산기로 예상 금액을 확인하세요."
        partialMatchText="조건 일부가 맞지 않을 수 있어요. 고용노동부(1350)에 상담받아보세요."
      />

      <Divider />

      <H2>내 퇴직금 예상액 계산해보세요</H2>
      <p style={body}>
        퇴직금 계산 공식은 "30일분 평균임금 × 근속연수"예요. 5인 미만이어도 공식은 똑같아요.
        월 평균급여와 근속 기간을 입력하면 대략적인 금액이 나와요.
        정확한 평균임금은 퇴직 전 3개월치 급여를 합산한 뒤 90일로 나눠요.
      </p>

      <SectionBadge>퇴직금 예상 금액 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 실제 퇴직금은 퇴직 전 3개월 평균임금 기준. 상여금·연장수당 포함 여부에 따라 달라질 수 있어요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>퇴직금 청구에 필요한 서류</H2>
      <p style={body}>
        5인 미만 사업장은 규모가 작아서 근로계약서도 없는 경우가 많아요. 계약서가 없어도 괜찮아요.
        실제로 근무했다는 사실을 입증할 수 있으면 퇴직금을 청구할 수 있어요.
        통장 급여 입금 내역이 가장 강력한 증거예요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <p style={body}>
        메신저 기록도 증거가 돼요. 카카오톡으로 업무 지시를 받았거나 출퇴근 시간이 찍힌 사진이 있으면
        근무 사실을 뒷받침할 수 있어요. 분쟁이 생겼을 때를 대비해 지금 보관하고 있는 자료를 미리 정리해두세요.
      </p>

      <Divider />

      <H2>5인 미만 퇴직금 청구 절차 4단계</H2>
      <p style={body}>
        사업주가 퇴직금을 주지 않을 때 쓸 수 있는 방법이 있어요. 혼자 해결하려다 포기하는 분이 많은데,
        고용노동부 진정은 무료고 절차도 어렵지 않아요.
      </p>

      <Steps steps={STEPS} />

      <p style={body}>
        진정을 내면 근로감독관이 사업주에게 연락해서 사실관계를 확인해요.
        사업주가 지급을 거부하면 형사 처벌(3년 이하 징역 또는 3천만원 이하 벌금)까지 갈 수 있어요.
        대부분은 진정 단계에서 해결돼요.
      </p>

      <Divider />

      <H2>퇴직금 수령 전 체크리스트</H2>
      <p style={body}>
        퇴직 전후로 챙겨야 할 것들을 정리했어요. 순서대로 확인하면 퇴직금을 빠짐없이 받을 수 있어요.
        특히 청구 기록을 남기는 게 중요해요. 나중에 분쟁이 생겼을 때 증거가 돼요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="폐업 사업주라면 체당금으로 일부 회수 가능">
        고용노동부에 체당금 신청 → 퇴직 전 1년분 임금 + 퇴직금 최대 3개월치 지급<br />
        신청: 고용노동부 공식 사이트(moel.go.kr)에서 온라인으로 접수해요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        5인 미만 사업장 퇴직금에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
