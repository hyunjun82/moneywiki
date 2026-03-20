"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR, 퇴직금_HIGHLIGHT } from "@/data/퇴직금-guide";

// ─── Q1-Q4 필수 사고 ─────────────────────────────────
// Q1. 육아휴직을 쓰거나 쓴 뒤 퇴직 예정인데, 휴직 기간이 퇴직금에 불이익을 주는지 모르는 상황
// Q2. 육아휴직 포함 퇴직금을 손해 없이 계산하고, 평균임금 재산정까지 요청한다
// Q3. 근속기간 산입 법적 근거, 육아휴직 중 퇴직 시 평균임금 낮아지는 구조, 재산정 요청 방법, IRP 수령 절차
// Q4. EligibilityChecker(내 상황 체크) + Calculator(예상 금액) + Steps(절차) + DocTable(서류) + Checklist(최종 확인)
//
// MAP:
// Q1 → 서론: 육아휴직 쓰면 퇴직금이 깎인다는 오해를 정면 반박
// Q2 → H2 순서: 근속기간 산입 법적 근거 → 평균임금 문제와 해결법 → 계산기 → 서류 → 절차 → 체크리스트
// Q3 → H2 6개 + FAQ
// Q4 → EligibilityChecker, Calculator, Steps, DocTable, Checklist

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "육아휴직을 사용했어요 (현재 중이거나 복직 후 퇴직 예정이에요)" },
  { id: "c2", label: "입사일부터 퇴직일까지 전체 근속기간이 1년 이상이에요" },
  { id: "c3", label: "주당 15시간 이상 근무하는 정규직 또는 계약직이에요" },
  { id: "c4", label: "퇴직금을 아직 한 번도 중간정산 받은 적 없어요" },
];

const CALC_SLIDERS = [
  {
    id: "salary",
    label: "육아휴직 전 월 평균급여",
    min: 200,
    max: 700,
    step: 50,
    defaultValue: 300,
    format: (v: number) => `${v}만원`,
  },
  {
    id: "years",
    label: "입사~퇴직 전체 근속기간",
    min: 1,
    max: 30,
    step: 1,
    defaultValue: 5,
    format: (v: number) => `${v}년`,
  },
];

const CALC_RESULTS = [
  {
    label: "퇴직금 예상액 (육아휴직 포함 전체 근속 기준)",
    getValue: (v: Record<string, number>) => v.salary * 10000 * v.years,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "근속 1년당 적립액",
    getValue: (v: Record<string, number>) => v.salary * 10000,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원/년`,
  },
];

const DOCS = [
  { name: "육아휴직 확인서 (또는 육아휴직 발령통지서)", required: true, where: "회사 인사팀" },
  { name: "급여명세서 — 육아휴직 전 3개월치", required: true, where: "회사 인사팀" },
  { name: "급여명세서 — 퇴직 전 3개월치 (비교용)", required: false, where: "회사 인사팀" },
  { name: "근로계약서 (입사일 확인)", required: false, where: "회사 인사팀" },
  { name: "IRP 계좌번호 (퇴직금 300만원 초과 시)", required: true, where: "은행·증권사 앱에서 개설" },
];

const STEPS = [
  {
    title: "근속기간 산입 여부 직접 확인",
    desc: "인사팀에 퇴직금 계산서를 서면으로 요청하고, 육아휴직 기간이 근속기간에 포함됐는지 날짜로 대조해봐요. 남녀고용평등법 제19조 4항에서 육아휴직 기간을 계속 근로기간으로 인정하기 때문에 회사가 임의로 빼면 위법이에요.",
    tip: "배우자 출산휴가, 출산전후휴가도 동일하게 근속기간에 포함돼요",
  },
  {
    title: "평균임금 산정 기준 협의",
    desc: "퇴직금 평균임금은 퇴직 전 3개월 임금 평균이에요. 육아휴직 중에 퇴직하면 이 3개월이 육아휴직급여(통상임금의 80%)로 채워져 평균임금이 낮아져요. 이 경우 육아휴직 시작 전 3개월 임금을 기준으로 재산정을 요청할 수 있죠.",
    tip: "근로기준법 시행령 제2조: 평균임금이 통상임금보다 낮으면 통상임금으로 대체 가능해요",
  },
  {
    title: "퇴직금 계산 내역 검토 후 이의 신청",
    desc: "인사팀에서 받은 퇴직금 계산서를 보고 근속기간과 평균임금 기준을 대조해봐요. 회사가 육아휴직 기간을 빼고 계산했다면 차액을 서면으로 청구하세요. 소멸시효 3년 이내라면 이미 퇴직한 뒤에도 차액 청구가 가능하죠.",
    tip: "이의 신청 거부 시 고용노동부 1350에 진정 가능해요",
  },
  {
    title: "IRP 계좌 개설 후 수령",
    desc: "퇴직금 300만원 초과 시 IRP(개인형 퇴직연금) 계좌로만 수령하는 게 원칙이에요. 퇴직 전에 미리 개설해두지 않으면 지급이 지연되죠. 회사는 퇴직 후 14일 이내에 IRP로 이체해야 해요.",
    tip: "IRP에서 연금으로 수령하면 퇴직소득세를 30~40% 줄일 수 있죠",
    link: { label: "IRP 계좌 개설 방법", href: "/w/퇴직금-IRP-계좌" },
  },
];

const CHECKLIST = [
  "육아휴직 기간: 근속기간에 포함됐는지 계산서에서 날짜로 대조",
  "평균임금: 육아휴직 직후 퇴직 시 육아휴직 전 3개월 기준 재산정 요청",
  "퇴직금 계산서: 인사팀에 서면으로 요청해서 수령",
  "IRP 계좌: 퇴직금 300만원 초과 시 퇴직 전 개설 완료",
  "지급 기한: 퇴직 후 14일 이내 (초과 시 연 20% 지연이자 청구 가능)",
  "소멸시효: 퇴직금 청구권은 퇴직 후 3년까지 유효",
];

const FAQS = [
  {
    q: "육아휴직 기간이 퇴직금 근속기간에 포함되나요?",
    a: "포함돼요. 남녀고용평등법 제19조 4항에서 육아휴직 기간을 계속 근로기간으로 명시하고 있죠. 회사가 임의로 이 기간을 제외하면 위법이에요.",
  },
  {
    q: "육아휴직 중에 퇴직하면 퇴직금이 줄어드나요?",
    a: "근속기간은 줄지 않아요. 단, 퇴직 전 3개월 평균임금이 육아휴직급여(통상임금의 80%)로 채워지면 퇴직금이 낮게 산정될 수 있죠. 이 경우 육아휴직 시작 전 3개월 임금 기준으로 재산정을 요청하세요.",
  },
  {
    q: "육아휴직 복귀 후 바로 퇴직해도 퇴직금이 나오나요?",
    a: "나와요. 복직 후 단 하루 만에 퇴직해도 육아휴직 포함 전체 근속기간 기준으로 퇴직금이 계산돼요. 복직 후 근무 기간이 짧다고 퇴직금이 줄지 않아요.",
  },
  {
    q: "회사가 육아휴직 기간을 근속기간에서 빼고 계산했어요",
    a: "위법이에요. 인사팀에 서면으로 이의를 신청하고 재산정을 요청하세요. 거부하면 고용노동부 고객상담센터(1350)에 진정을 낼 수 있죠. 퇴직 후 3년 이내라면 차액 청구도 가능해요.",
  },
  {
    q: "배우자 출산휴가도 퇴직금 계산에 포함되나요?",
    a: "포함돼요. 배우자 출산휴가와 출산전후휴가는 근로기준법에 따라 계속 근로기간으로 인정되죠. 이 기간도 퇴직금 근속기간에서 제외할 수 없어요.",
  },
  {
    q: "육아휴직 기간의 평균임금 산정 특례가 있나요?",
    a: "맞아요. 근로기준법 시행령 제2조에 따라 평균임금 산정이 어렵거나 낮게 나오는 사유가 있으면 그 기간을 빼고 계산해요. 육아휴직 중 퇴직 시 고용노동부 지침에 따라 육아휴직 전 임금을 기준으로 산정할 수 있죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "남녀고용평등법 제19조: 육아휴직 계속근로기간 산입", url: "https://www.law.go.kr/법령/남녀고용평등과일·가정양립지원에관한법률" },
      { label: "근로자퇴직급여보장법 제8조: 퇴직금 산정 기준", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "근로기준법 시행령 제2조: 평균임금 산정 특례", url: "https://www.law.go.kr/법령/근로기준법시행령" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부: 육아휴직 퇴직금 안내", url: "https://www.moel.go.kr" },
      { label: "고용노동부 고객상담센터 1350", url: "https://www.moel.go.kr/info/centerInfo/list.do" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-평균임금", title: "퇴직금 평균임금 계산", description: "포함 항목과 산정 특례 기준이에요." },
  { slug: "퇴직금-IRP-계좌", title: "IRP 계좌 개설 방법", description: "은행·증권사 비교부터 개설까지." },
  { slug: "퇴직금-지급-기한", title: "퇴직금 지급 기한과 지연이자", description: "14일 원칙과 연 20% 지연이자 청구법." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} highlightSlugs={퇴직금_HIGHLIGHT} currentSlug="퇴직금-육아휴직" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 육아휴직 · 근속기간 · 평균임금</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        육아휴직 쓰면 퇴직금이 줄어드나요?<br />
        근속기간 산입 법적 근거와 평균임금 특례까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        육아휴직을 쓰고 나면 퇴직금이 깎인다고 걱정하는 분들이 많죠. 결론부터 말하면, 근속기간은 깎이지 않아요.
        <a href="https://www.law.go.kr/법령/남녀고용평등과일·가정양립지원에관한법률" style={{ color: "#1D9E75", textDecoration: "underline" }}>남녀고용평등법 제19조 4항</a>에서 육아휴직 기간을 계속 근로기간으로 명시하고 있어서 회사가 임의로 빼면 위법이에요.
        단, 육아휴직 중이거나 직후에 퇴직하면 평균임금이 낮게 산정되는 문제가 생겨요. 이 부분을 정확히 짚어야 손해 없이 퇴직금을 받을 수 있죠.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* H2-1: 법적 근거 (숫자형 시작) */}
      <H2>육아휴직, 퇴직금 계산에 어떻게 반영되나요?</H2>
      <p style={body}>
        퇴직금은 '계속 근로기간 1년에 30일분 평균임금'으로 계산해요. 여기서 핵심이 '계속 근로기간'인데, 육아휴직 기간이 여기에 포함돼요.
        5년 근무 중 1년 육아휴직을 썼어도 근속기간은 5년이고, 육아휴직 1년을 뺀 4년이 아니에요.
      </p>
      <p style={body}>
        이 차이가 생각보다 커요. 5년 기준과 4년 기준의 퇴직금 차이는 월급 한 달분이에요.
        육아휴직을 2년 썼다면 그 차이는 두 달분이고, 회사가 이를 제외하고 지급하면 그만큼 손해를 보게 되죠.
      </p>

      <GreenBox>
        남녀고용평등법 제19조 4항: 육아휴직 기간은 계속 근로기간으로 인정해요.<br />
        배우자 출산휴가·출산전후휴가도 동일하게 포함돼요.<br />
        회사가 이 기간을 제외하고 계산하면 근로기준법 위반이에요.
      </GreenBox>

      <SectionBadge>내 상황 체크해봐요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="육아휴직 기간을 포함한 전체 근속기간으로 퇴직금을 받을 수 있죠. 아래 계산기로 예상 금액을 바로 넣어봐요."
        partialMatchText="상황에 따라 판단이 달라질 수 있죠. 고용노동부 고객상담센터(1350)에서 무료로 상담받을 수 있죠."
      />

      <Divider />

      {/* H2-2: 계산기 (얼마형) */}
      <H2>육아휴직 포함 예상 퇴직금 계산해봐요</H2>
      <p style={body}>
        아래 계산기는 육아휴직 전 월 평균급여와 전체 근속기간을 기준으로 퇴직금을 추산해요.
        육아휴직 기간이 포함된 입사~퇴직 전체 기간을 넣으면 되고, 중간에 육아휴직 기간을 뺄 필요가 없어요.
      </p>
      <p style={body}>
        육아휴직 직후에 퇴직하면 퇴직 전 3개월 평균임금이 육아휴직급여(통상임금의 80%)로 채워져 실제 금액이 낮게 나올 수 있죠.
        이 경우 육아휴직 시작 전 3개월 임금 기준으로 재산정을 요청할 수 있어서, 아래 계산기는 재산정 후 기준으로 참고하세요.
      </p>

      <SectionBadge>퇴직금 예상 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 육아휴직 전 월 평균급여 기준 추산값이에요. 실제 퇴직금은 평균임금 산정 방식에 따라 달라질 수 있죠."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      {/* H2-3: 평균임금 문제 (경고형 시작) */}
      <H2>평균임금 산정 시 필요한 서류</H2>
      <p style={body}>
        육아휴직 후 퇴직할 때 회사가 자동으로 유리한 기준을 적용해주지 않는 경우가 많아요.
        어떤 평균임금 기준으로 계산했는지 서류로 직접 확인하지 않으면 손해를 보고 지나칠 수 있죠.
      </p>
      <p style={body}>
        급여명세서는 육아휴직 전 3개월치와 퇴직 전 3개월치 두 가지를 모두 받아두세요.
        두 금액을 비교해서 어느 쪽이 높은지 확인한 뒤 인사팀에 기준을 요청하면 돼요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      {/* H2-4: 절차 (사례형 시작) */}
      <H2>육아휴직 후 퇴직금 받는 4단계 절차</H2>
      <p style={body}>
        퇴직금 수령 과정에서 가장 많이 놓치는 게 평균임금 산정 기준 확인이에요.
        회사가 불리한 기준으로 계산하더라도 서면으로 이의를 신청하면 정정이 가능해요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      {/* H2-5: 체크리스트 (반전형 시작) */}
      <H2>육아휴직 퇴직금 체크리스트</H2>
      <p style={body}>
        퇴직 당일이 지나면 놓친 서류나 기준을 되돌리기가 어렵고, 소멸시효 3년 안에 청구하지 않으면 권리가 사라져요.
        아래 항목을 순서대로 대조하면 퇴직금 손해를 막을 수 있죠.
      </p>
      <p style={body}>
        특히 평균임금 기준과 IRP 계좌 개설은 퇴직 당일 전에 마쳐야 해요.
        퇴직 후에야 IRP가 없어서 지급이 지연되는 경우가 많죠.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        인사팀에 서면으로 재산정 요청을 하세요.<br />
        거부하면 고용노동부(1350)에 진정을 낼 수 있죠.<br />
        퇴직 후라도 소멸시효 3년 이내라면 차액 청구가 가능해요.
      </GreenBox>

      <Divider />

      {/* H2-6: FAQ (질문형 시작) */}
      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        육아휴직과 퇴직금을 둘러싼 질문 중 실제로 많이 나오는 것만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 남녀고용평등법, 근로자퇴직급여보장법, 근로기준법 시행령을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 대조해봐요." />
    </ArticleLayout>
  );
}
