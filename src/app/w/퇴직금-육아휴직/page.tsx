"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR, 퇴직금_HIGHLIGHT } from "@/data/퇴직금-guide";

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
    title: "근속기간 산입 여부 확인",
    desc: "육아휴직 기간은 퇴직금 근속기간에 그대로 포함돼요. 남녀고용평등법 제19조 4항에서 육아휴직 기간을 계속 근로기간으로 인정하고 있어요. 5년 근무 중 1년 육아휴직을 써도 근속기간은 5년이에요.",
    tip: "배우자 출산휴가, 출산전후휴가도 동일하게 근속기간에 포함돼요",
  },
  {
    title: "평균임금 산정 기준 협의",
    desc: "퇴직금 평균임금은 퇴직 전 3개월 임금 평균이에요. 육아휴직 중에 퇴직하면 이 3개월이 육아휴직급여(통상임금의 80%)로 채워져 평균임금이 낮아져요. 이 경우 육아휴직 시작 전 3개월 임금을 기준으로 요청할 수 있어요.",
    tip: "근로기준법 시행령 제2조: 평균임금이 통상임금보다 낮으면 통상임금으로 대체 가능해요",
  },
  {
    title: "퇴직금 계산 내역 확인",
    desc: "인사팀에서 퇴직금 계산서를 받아서 근속기간에 육아휴직이 포함됐는지 직접 확인해야 해요. 회사가 육아휴직 기간을 빼고 계산했다면 차액을 서면으로 청구하세요.",
    tip: "소멸시효 3년 이내라면 이미 퇴직한 뒤에도 차액 청구 가능해요",
  },
  {
    title: "IRP 계좌 개설 후 수령",
    desc: "퇴직금 300만원 초과 시 IRP(개인형 퇴직연금) 계좌로만 수령할 수 있어요. 퇴직 전에 미리 개설해두지 않으면 지급이 지연돼요. 회사는 퇴직 후 14일 이내에 IRP로 이체해야 해요.",
    tip: "IRP에서 연금으로 수령하면 퇴직소득세를 30~40% 절감할 수 있어요",
    link: { label: "IRP 계좌 개설 방법", href: "/w/퇴직금-IRP-계좌" },
  },
];

const CHECKLIST = [
  "육아휴직 기간: 근속기간에 포함되는지 계산서에서 직접 확인",
  "평균임금: 육아휴직 직후 퇴직 시 육아휴직 전 3개월 기준 요청",
  "퇴직금 계산서: 인사팀에 서면으로 요청해서 수령",
  "IRP 계좌: 퇴직금 300만원 초과 시 퇴직 전 개설 완료",
  "지급 기한: 퇴직 후 14일 이내 (초과 시 연 20% 지연이자 청구 가능)",
  "소멸시효: 퇴직금 청구권은 퇴직 후 3년까지 유효",
];

const FAQS = [
  {
    q: "육아휴직 기간이 퇴직금 근속기간에 포함되나요?",
    a: "맞아요. 남녀고용평등법 제19조 4항에서 육아휴직 기간을 계속 근로기간으로 명시하고 있어요. 회사가 임의로 이 기간을 제외하면 위법이에요.",
  },
  {
    q: "육아휴직 중에 퇴직하면 퇴직금이 줄어드나요?",
    a: "근속기간은 줄지 않아요. 단, 퇴직 전 3개월 평균임금이 육아휴직급여(통상임금의 80%)로 채워지면 퇴직금이 낮게 산정될 수 있어요. 이 경우 육아휴직 시작 전 3개월 임금을 기준으로 재산정을 요청하세요.",
  },
  {
    q: "육아휴직 복귀 후 바로 퇴직해도 퇴직금이 나오나요?",
    a: "나와요. 복직 후 단 하루 만에 퇴직해도 육아휴직 포함 전체 근속기간 기준으로 퇴직금이 계산돼요. 복직 후 근무 기간이 짧다고 퇴직금이 줄지 않아요.",
  },
  {
    q: "회사가 육아휴직 기간을 근속기간에서 빼고 계산했어요",
    a: "위법이에요. 인사팀에 서면으로 이의를 신청하고 재산정을 요청하세요. 거부하면 고용노동부 고객상담센터(1350)에 진정을 낼 수 있어요. 퇴직 후 3년 이내라면 차액을 청구할 수 있어요.",
  },
  {
    q: "배우자 출산휴가도 퇴직금 계산에 포함되나요?",
    a: "포함돼요. 배우자 출산휴가와 출산전후휴가는 근로기준법에 따라 계속 근로기간으로 인정돼요. 이 기간도 퇴직금 근속기간에서 제외할 수 없어요.",
  },
  {
    q: "육아휴직 기간의 평균임금 산정 특례가 있나요?",
    a: "있어요. 근로기준법 시행령 제2조에 따라 평균임금 산정이 어렵거나 낮게 나오는 사유가 있으면 그 기간을 빼고 계산해요. 육아휴직 중 퇴직 시 고용노동부 지침에 따라 육아휴직 전 임금을 기준으로 산정할 수 있어요.",
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
  { slug: "퇴직금-평균임금", title: "퇴직금 평균임금 계산", description: "포함 항목과 산정 특례 기준." },
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
        근속기간 산입 기준과 평균임금 특례까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        육아휴직을 쓰고 나면 퇴직금이 줄까 걱정되죠. 결론부터 말하면 육아휴직 기간은 퇴직금 근속기간에 그대로 포함돼요.
        <a href="https://www.law.go.kr/법령/남녀고용평등과일·가정양립지원에관한법률" style={{ color: "#1D9E75", textDecoration: "underline" }}>남녀고용평등법 제19조 4항</a>에서 명시적으로 보장하기 때문에 회사가 빼고 계산하면 위법이에요.
        단, 육아휴직 중이거나 직후에 퇴직하면 평균임금이 낮게 산정될 수 있어요. 이 부분만 정확히 짚으면 손해 없이 퇴직금을 받을 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>육아휴직, 퇴직금 계산에 어떻게 반영되나요?</H2>
      <p style={body}>
        퇴직금은 '계속 근로기간 1년에 30일분 평균임금'으로 계산해요. 여기서 핵심이 '계속 근로기간'인데, 육아휴직 기간이 여기에 포함돼요.
        5년 근무 중 1년 육아휴직을 썼어도 근속기간은 5년이에요. 육아휴직 1년을 뺀 4년이 아니에요.
      </p>
      <p style={body}>
        이 차이가 생각보다 커요. 5년 기준과 4년 기준의 퇴직금 차이는 월급 한 달분이에요.
        육아휴직을 2년 썼다면 그 차이는 두 달분이고요.
      </p>

      <GreenBox>
        남녀고용평등법 제19조 4항: 육아휴직 기간은 계속 근로기간으로 인정해요.<br />
        배우자 출산휴가·출산전후휴가도 동일하게 포함돼요.<br />
        회사가 이 기간을 제외하고 계산하면 근로기준법 위반이에요.
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="육아휴직 기간을 포함한 전체 근속기간으로 퇴직금을 받을 수 있어요. 아래 계산기로 예상 금액을 바로 확인해보세요."
        partialMatchText="상황에 따라 판단이 달라질 수 있어요. 고용노동부 고객상담센터(1350)에서 무료로 상담받을 수 있어요."
      />

      <Divider />

      <H2>육아휴직 포함 예상 퇴직금 계산해보세요</H2>
      <p style={body}>
        아래 계산기는 육아휴직 전 월 평균급여와 전체 근속기간을 기준으로 퇴직금을 추산해요.
        육아휴직 기간이 포함된 입사~퇴직 전체 기간을 입력하면 돼요.
      </p>
      <p style={body}>
        육아휴직 직후에 퇴직하면 퇴직 전 3개월 평균임금이 육아휴직급여(통상임금의 80%)로 채워져 실제 금액이 낮게 나올 수 있어요.
        이 경우 육아휴직 시작 전 3개월 임금을 기준으로 재산정을 요청할 수 있어서, 아래 계산기는 재산정 후 기준으로 참고하세요.
      </p>

      <SectionBadge>퇴직금 예상 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 육아휴직 전 월 평균급여 기준 추산값이에요. 실제 퇴직금은 평균임금 산정 방식에 따라 달라질 수 있어요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>평균임금 산정 시 필요한 서류</H2>
      <p style={body}>
        육아휴직 후 퇴직할 때는 평균임금을 어떤 기준으로 계산했는지 확인하는 게 중요해요.
        회사가 자동으로 유리한 기준을 적용해주지 않는 경우가 많아서 직접 서류로 확인해야 해요.
      </p>
      <p style={body}>
        급여명세서는 육아휴직 전 3개월치와 퇴직 전 3개월치 두 가지를 모두 받아두세요.
        두 금액을 비교해서 어느 쪽이 높은지 확인한 뒤 인사팀에 기준을 요청하면 돼요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>육아휴직 후 퇴직금 받는 4단계 절차</H2>
      <p style={body}>
        퇴직금 수령 과정에서 가장 많이 놓치는 게 평균임금 산정 기준 확인이에요.
        회사가 불리한 기준으로 계산하더라도 서면으로 이의를 신청하면 정정이 가능해요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>육아휴직 퇴직금 체크리스트</H2>
      <p style={body}>
        퇴직 전 아래 항목을 순서대로 확인하면 퇴직금 손해를 막을 수 있어요.
        특히 평균임금 기준과 IRP 계좌 개설은 퇴직 당일 전에 마쳐야 해요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        인사팀에 서면으로 재산정 요청을 하세요.<br />
        거부하면 고용노동부(1350)에 진정을 낼 수 있어요.<br />
        퇴직 후라도 소멸시효 3년 이내라면 차액 청구가 가능해요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        육아휴직과 퇴직금을 둘러싼 질문 중 실제로 많이 나오는 것만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 남녀고용평등법, 근로자퇴직급여보장법, 근로기준법 시행령을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
