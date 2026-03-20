"use client";

// Q1. 회사에 중간정산을 요청하려는데 내가 법정 사유에 해당하는지 모르는 근로자
// Q2. 내 상황이 법정 사유 8가지 중 하나에 해당하는지 판단하고, 해당하면 바로 신청 절차를 밟는다
// Q3. 법정 사유 8가지 목록, 무주택 조건(세대원 전체), 요양 6개월 기준, 불법 중간정산 무효 원칙, 사유별 증빙서류
// Q4. GreenBox(8가지 요약), EligibilityChecker(자가진단), DocTable(서류), Steps(절차), Checklist(최종점검)
//
// MAP:
// - Q1 → 서론: "중간정산, 아무 때나 못 받죠" 톤으로 공감
// - Q2 → H2 순서: 조건 확인 → 금액 계산 → 서류 → 절차 → 최종 점검
// - Q3 → H2 5개, 불법 중간정산 경고 별도 섹션
// - Q4 → GreenBox, EligibilityChecker, Calculator, DocTable, Steps, Checklist

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { FAQ } from "@/components/article-ui/FAQ";
import { References } from "@/components/article-ui/References";
import { Disclaimer } from "@/components/article-ui/Disclaimer";
import { 퇴직금_SIDEBAR, 퇴직금_HIGHLIGHT } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "무주택자이고 주택을 구입하거나 전세보증금을 마련해야 하는 상황이에요" },
  { id: "c2", label: "본인 또는 부양가족이 6개월 이상 요양이 필요한 질병이 진단됐어요" },
  { id: "c3", label: "천재지변·재해로 피해를 입었어요" },
  { id: "c4", label: "파산선고 또는 개인회생 절차 개시를 받았어요" },
  { id: "c5", label: "근속기간 5년마다 임금피크제 적용 대상이에요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "월 평균급여", min: 200, max: 800, step: 10, defaultValue: 350, format: (v: number) => `${v}만원` },
  { id: "years", label: "중간정산까지 근속 기간", min: 1, max: 30, step: 1, defaultValue: 7, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "중간정산 예상 금액",
    getValue: (v: Record<string, number>) => v.salary * 10000 * v.years,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "중간정산 후 근속기간",
    getValue: () => 0,
    format: () => "0년으로 초기화 (새로 적립 시작)",
  },
];

const DOCS = [
  { name: "퇴직금 중간정산 신청서", required: true, where: "회사 인사팀 양식" },
  { name: "주택 매매계약서 또는 임대차계약서", required: true, where: "공인중개사 또는 등기소 (주택 구입·전세 사유)" },
  { name: "의사 진단서·치료비 영수증", required: true, where: "병원 발급 (요양 사유)" },
  { name: "재해 피해 확인서", required: true, where: "지자체·소방서 (재해 사유)" },
  { name: "파산·개인회생 결정문 사본", required: true, where: "법원 발급 (파산·회생 사유)" },
  { name: "임금피크제 적용 확인서", required: false, where: "회사 인사팀 (임금피크제 사유)" },
];

const STEPS = [
  {
    title: "법정 사유 해당 여부 판단",
    desc: "중간정산은 근로자퇴직급여보장법 제8조 제2항이 정한 8가지 법정 사유 중 하나에 해당해야 신청 가능해요. 사유가 없으면 회사가 거부해도 법적으로 아무 문제 없어요. 내 상황이 어느 사유에 해당하는지 먼저 파악하는 게 첫 단계죠.",
    tip: "사유별 증빙서류 목록은 인사팀에 미리 물어보면 빠르게 준비할 수 있죠",
  },
  {
    title: "증빙서류 준비",
    desc: "사유가 확인됐다면 그에 맞는 서류를 준비해요. 주택 구입이라면 매매계약서, 요양이라면 진단서와 치료비 영수증이 필요해요. 서류가 불충분하면 신청이 반려돼요.",
    tip: "서류는 신청서와 함께 한 세트로 묶어서 제출하면 처리가 빨라요",
  },
  {
    title: "인사팀에 중간정산 신청서 제출",
    desc: "법정 사유와 증빙서류를 갖췄다면 인사팀에 신청서를 제출해요. 회사마다 양식이 다를 수 있으니 인사팀 양식을 받아서 작성하세요. 법정 사유가 명확한데도 거부한다면 고용노동부(1350)에 진정을 넣을 수 있죠.",
    tip: "신청 접수일자를 기록해두면 지급 기한(14일) 관리에 도움이 돼요",
  },
  {
    title: "퇴직소득세 원천징수 후 수령",
    desc: "승인되면 14일 이내에 지급받아요. 중간정산 금액에 대해 퇴직소득세가 원천징수돼요. 근속연수는 중간정산 시점까지만 적용하고, 이후 근속기간은 0년으로 초기화돼요.",
    tip: "IRP 계좌가 있으면 중간정산금도 IRP로 받아 과세 이연이 가능해요",
    link: { label: "IRP 계좌 개설 방법 보기", href: "/w/퇴직금-IRP-계좌" },
  },
];

const CHECKLIST = [
  "법정 사유 해당 여부 — 8가지 중 하나여야 신청 가능",
  "무주택 조건 — 세대원 전체가 무주택자여야 주택 관련 사유 적용",
  "요양 기간 — 6개월 이상 요양 필요 진단서가 있어야 인정",
  "증빙서류 준비 — 사유별 서류 목록 인사팀에 사전 확인",
  "퇴직소득세 원천징수 — 중간정산도 세금 납부 대상",
  "근속기간 초기화 — 중간정산 후 0년에서 새로 시작",
  "IRP 의무 여부 — 중간정산금도 300만원 초과 시 IRP 수령",
];

const FAQS = [
  {
    q: "중간정산 법정 사유가 8가지라는데 전부 뭔가요?",
    a: "근로자퇴직급여보장법 시행령이 정한 8가지죠. ① 무주택 근로자의 주택 구입, ② 무주택 근로자의 전세보증금 부담, ③ 본인·부양가족 6개월 이상 요양, ④ 파산선고·개인회생 개시, ⑤ 천재지변·재해 피해, ⑥ 임금피크제 적용(근속 5년 이상), ⑦ 근로시간 단축으로 임금 감소, ⑧ 고용노동부 장관이 고시한 사유예요.",
  },
  {
    q: "집을 갖고 있으면 주택 관련 사유로 신청할 수 없나요?",
    a: "맞아요. 주택 구입과 전세보증금 사유는 '무주택 근로자'에게만 적용돼요. 세대원 중 한 명이라도 집이 있으면 해당 안 돼요. 이미 주택을 보유하고 있다면 요양이나 다른 법정 사유를 검토하세요.",
  },
  {
    q: "회사가 법정 사유가 있는데도 중간정산을 거부하면 어떻게 하나요?",
    a: "법정 사유가 명확한데도 회사가 거부하면 고용노동부(1350)에 진정을 낼 수 있죠. 단, 법정 외 임의 사유는 회사 동의가 필요해서 거부해도 법적으로 문제없어요. 사유가 법정에 해당하는지를 먼저 파악하는 게 중요해요.",
  },
  {
    q: "중간정산 후 퇴직할 때 퇴직금은 어떻게 계산되나요?",
    a: "중간정산 이후 재직한 기간만 기준으로 새로 계산해요. 중간정산 전 기간은 이미 정산됐으니 포함 안 돼요. 근속연수도 중간정산 이후부터 다시 세요. 세금도 중간정산 기간과 퇴직 기간 각각 따로 계산돼요.",
  },
  {
    q: "중간정산금도 IRP 계좌로 받아야 하나요?",
    a: "300만원을 초과하면 IRP 계좌로 받아야 해요. 2022년부터 퇴직금 IRP 의무화가 시행됐고 중간정산도 동일하게 적용돼요. 단, 법정 사유에 해당하면 IRP에서 중도 인출이 가능해요.",
  },
  {
    q: "요양 사유로 신청할 때 본인이 아닌 가족도 되나요?",
    a: "돼요. 배우자, 부양가족인 자녀나 부모도 포함돼요. 6개월 이상 요양이 필요하다는 의사 진단서가 있어야 해요. 단순 입원이나 짧은 치료로는 인정이 안 돼요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 제8조 제2항: 중간정산 허용 사유", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "근로자퇴직급여보장법 시행령 제3조: 중간정산 세부 사유", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법시행령" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부: 퇴직급여제도 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-중간정산", title: "퇴직금 중간정산 신청 방법", description: "법정 사유 확인부터 절차까지 한 번에." },
  { slug: "퇴직금-중간정산-세금", title: "중간정산 퇴직소득세 계산", description: "원천징수 금액 미리 계산해요." },
  { slug: "퇴직금-중간정산-주택구입", title: "주택 구입 중간정산 조건", description: "무주택자 주택 구입 시 신청 방법." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} highlightSlugs={퇴직금_HIGHLIGHT} currentSlug="퇴직금-중간정산-조건" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 중간정산 · 법정 사유</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 중간정산, 언제 받을 수 있나요?<br />
        법정 허용 사유 8가지와 신청 조건
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        <a href="/w/퇴직금-중간정산" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 중간정산</a>은 아무 때나 받을 수 있는 게 아니에요.
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법 제8조 제2항</a>이
        정한 법정 사유에 해당해야만 신청 가능해요.
        주택 구입, 전세보증금, 장기 요양, 파산·회생, 천재지변 등 8가지 사유죠.
        사유 없이 신청하면 회사가 거부해도 법적으로 문제없어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>중간정산이 되는 조건이 뭔가요?</H2>
      <p style={body}>
        법정 사유 8가지 중 하나에 해당해야 중간정산 신청이 가능해요.
        가장 많이 쓰이는 건 무주택자 주택 구입과 전세보증금 사유죠.
        주택 관련 사유는 '세대원 전체가 무주택자'인 경우에만 해당해요.
      </p>
      <p style={body}>
        요양 사유는 6개월 이상 요양이 필요하다는 의사 진단서가 있어야 해요.
        배우자·자녀·부모 등 부양가족도 포함돼요.
        단순 입원이나 짧은 치료는 인정 안 돼요.
      </p>

      <GreenBox>
        ① 무주택 근로자가 주택을 구입하는 경우<br />
        ② 무주택 근로자의 전세보증금이 부족한 경우<br />
        ③ 본인 또는 부양가족이 6개월 이상 요양이 필요한 경우<br />
        ④ 파산선고 또는 개인회생 절차 개시를 받은 경우<br />
        ⑤ 천재지변·재해로 피해를 입은 경우<br />
        ⑥ 임금피크제 적용으로 임금이 줄어든 경우 (근속 5년 이상)<br />
        ⑦ 근로시간 단축으로 임금이 감소한 경우<br />
        ⑧ 고용노동부 장관이 고시한 사유에 해당하는 경우
      </GreenBox>

      <SectionBadge>내 상황 자가진단</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="중간정산 신청 사유에 해당할 가능성이 높아요. 아래 계산기로 예상 금액을 파악해보세요."
        partialMatchText="해당 사유와 세부 조건을 고용노동부(1350) 또는 노무사 상담으로 확인해보세요."
      />

      <Divider />

      <H2>중간정산으로 얼마나 받나요?</H2>
      <p style={body}>
        중간정산 금액은 일반 <a href="/w/퇴직금-계산-방법" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 계산</a>과 동일해요.
        퇴직 전 3개월 평균임금 × 근속연수(중간정산 시점까지)로 계산해요.
        상여금이나 수당 포함 여부에 따라 실제 금액이 달라질 수 있죠.
      </p>
      <p style={body}>
        중간정산을 받으면 그 시점부터 근속기간이 0년으로 초기화돼요.
        퇴직 시기가 얼마 안 남았다면 세금 측면에서 중간정산보다 퇴직까지 기다리는 게 유리할 수 있죠.
        <a href="/w/퇴직금-중간정산-세금" style={{ color: "#1D9E75", textDecoration: "underline" }}>중간정산 세금 계산</a>을 먼저 비교해보세요.
      </p>

      <SectionBadge>중간정산 예상 금액 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 퇴직 전 3개월 평균임금 기준. 상여금·수당 포함 여부에 따라 실제 금액이 달라질 수 있죠."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>사유별로 필요한 서류가 달라요</H2>
      <p style={body}>
        법정 사유가 확인됐다면 그에 맞는 증빙서류를 준비해야 해요.
        주택 구입이라면 매매계약서, 요양이라면 진단서와 치료비 영수증이 필요해요.
        서류가 불충분하면 신청이 반려될 수 있죠.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>중간정산 신청 절차 4단계</H2>
      <p style={body}>
        법정 사유에 해당한다는 걸 파악했다면 아래 절차를 따르면 돼요.
        회사마다 처리 기간이 다를 수 있지만, 승인 후 14일 이내 지급이 원칙이에요.
      </p>

      <Steps steps={STEPS} />

      <p style={body}>
        중간정산이 완료되면 회사는 <a href="/w/퇴직금-소득세" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직소득원천징수영수증</a>을 발급해줘요.
        나중에 퇴직소득세 신고나 환급 시 필요하니 잘 보관하세요.
      </p>

      <Divider />

      <H2>불법 중간정산은 무효예요</H2>
      <p style={body}>
        법정 사유 없이 회사와 근로자가 합의해서 진행한 중간정산은 법적으로 무효예요.
        근로자퇴직급여보장법이 강행규정이라, 당사자 합의로도 뺄 수 없어요.
        무효 중간정산이라면 근로자는 퇴직 시 전체 기간 기준으로 퇴직금을 다시 청구할 수 있죠.
      </p>
      <BorderBox>
        <strong style={{ color: "#d97706" }}>주의</strong><br />
        사유 없는 중간정산에 합의했더라도 나중에 퇴직금 전액 청구가 가능해요.<br />
        회사가 이미 지급한 금액은 반환 청구 대상이 되고, 미지급분은 지연이자(연 20%)가 붙어요.
      </BorderBox>

      <Divider />

      <H2>신청 전 꼭 점검할 것들</H2>
      <p style={body}>
        중간정산은 한 번 받으면 근속기간이 초기화돼요.
        신청 전에 아래 항목을 하나씩 점검하면 반려 없이 처리할 수 있죠.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        중간정산을 받으면 그 시점부터 근속기간이 0년으로 다시 시작돼요.<br />
        퇴직이 1~2년 내라면 중간정산 대신 퇴직 때까지 기다리는 게 세금 절세 면에서 유리할 수 있죠.<br />
        <a href="/w/퇴직금-중간정산-세금" style={{ color: "#1D9E75", textDecoration: "underline" }}>중간정산 세금 계산기</a>로 비교해보세요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        중간정산 조건에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법 및 시행령을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 파악해보세요." />
    </ArticleLayout>
  );
}
