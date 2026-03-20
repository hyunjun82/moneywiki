"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR, 퇴직금_HIGHLIGHT } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "직원 수 4명 이하인 사업장에서 일했어요" },
  { id: "c2", label: "1년 이상 계속 근무했어요" },
  { id: "c3", label: "4주 평균 주 15시간 이상 일했어요" },
  { id: "c4", label: "퇴직한 지 3년이 아직 지나지 않았어요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "월 평균임금", min: 200, max: 500, step: 10, defaultValue: 260, format: (v: number) => `${v}만원` },
  { id: "years", label: "근속 기간", min: 1, max: 15, step: 1, defaultValue: 3, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "퇴직금 예상액 (5인 미만도 동일 공식)",
    getValue: (v: Record<string, number>) => Math.round(v.salary * 10000 * v.years),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "근속 1년당 퇴직금",
    getValue: (v: Record<string, number>) => Math.round(v.salary * 10000),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원/년`,
  },
];

const DOCS = [
  { name: "근로계약서 (근무 기간·임금 확인)", required: true, where: "사업주 요청 또는 본인 작성본" },
  { name: "급여명세서 또는 통장 입금 내역 (3개월 이상)", required: true, where: "본인 통장 또는 문자 기록" },
  { name: "근무 사실 증명 자료 (출퇴근 기록·업무 메신저 캡처 등)", required: false, where: "본인 보관" },
  { name: "IRP 계좌번호 (퇴직금 300만원 초과 시)", required: true, where: "은행·증권사 개설" },
];

const STEPS = [
  {
    title: "적용 여부 확인",
    desc: "1년 이상 계속 근무했고 4주 평균 주 15시간 이상 일했다면 사업장 규모와 관계없이 퇴직금을 받을 수 있어요. 5인 미만, 3인, 1인 사업장 모두 포함돼요.",
    tip: "2010년 12월 1일 이후 퇴직자부터 5인 미만도 전면 적용돼요",
  },
  {
    title: "퇴직금 직접 계산",
    desc: "퇴직금 = 30일분 평균임금 × 근속연수. 평균임금은 퇴직 전 3개월 임금 총액 ÷ 그 기간 총 일수예요. 계산기로 먼저 대략적인 금액을 확인해보세요.",
    tip: "상여금·고정수당도 평균임금에 포함될 수 있어요",
  },
  {
    title: "사업주에게 서면 청구",
    desc: "말로 요청하면 나중에 증거가 없어요. 문자·카카오톡·이메일로 '○○년 ○월 ○일 퇴직, 퇴직금 ○○만원 청구'를 남겨두세요. 14일 이내 지급이 원칙이에요.",
    tip: "청구 기록은 분쟁 시 증거로 쓰여요",
  },
  {
    title: "고용노동부 진정 신청 (거부 시)",
    desc: "사업주가 거부하거나 연락이 없으면 고용노동부 민원마당에서 진정을 내세요. 근로감독관이 조사하고 지급 명령을 내려요. 온라인으로 24시간 신청할 수 있어요.",
    tip: "고용노동부 민원마당(minwon.moel.go.kr) — 무료 신청",
    link: { label: "고용노동부 진정 신청", href: "https://minwon.moel.go.kr" },
  },
];

const CHECKLIST = [
  "5인 미만이어도 퇴직금 지급 의무 동일 — 1인 사업장 포함",
  "지급 조건: 1년 이상 계속 근무 + 주 15시간 이상",
  "서면 청구: 문자·카카오톡·이메일로 기록 남기기",
  "지급 기한: 퇴직일로부터 14일 이내, 초과 시 연 20% 지연이자",
  "거부 시: 고용노동부 진정 → 체당금 제도 활용",
];

const FAQS = [
  {
    q: "직원 2명인 작은 가게에서 일했는데 퇴직금을 받을 수 있나요?",
    a: "받을 수 있어요. 2010년 12월 1일부터는 1인 사업장까지 근로자퇴직급여보장법이 적용돼요. 1년 이상, 주 15시간 이상 근무했다면 사업장 규모와 관계없이 퇴직금이 발생해요.",
  },
  {
    q: "5인 미만은 퇴직연금도 가입해야 하나요?",
    a: "퇴직연금(DB·DC형) 도입 의무는 없어요. 5인 미만 사업장은 법정 퇴직금 제도(일시금 지급)를 그대로 유지해도 돼요. 단, 퇴직금 지급 의무 자체는 동일하게 적용돼요.",
  },
  {
    q: "근로계약서가 없어도 퇴직금을 받을 수 있나요?",
    a: "받을 수 있어요. 계약서가 없어도 실제 근무 사실만 입증하면 돼요. 급여 입금 내역, 카카오톡 업무 지시 기록, 출퇴근 시간 메모도 증거가 돼요.",
  },
  {
    q: "사장님이 '5인 미만이라 퇴직금이 없다'고 하면 어떻게 하나요?",
    a: "법을 잘못 알고 있는 거예요. 고용노동부(1350)에 신고하세요. 근로감독관이 사실 확인 후 지급 명령을 내려요. 지급 거부 시 3년 이하 징역 또는 3천만원 이하 벌금이 부과될 수 있어요.",
  },
  {
    q: "사업주가 폐업해서 퇴직금을 못 받았어요",
    a: "체당금 제도를 쓰세요. 고용노동부에 신청하면 퇴직 전 최종 3개월 임금과 퇴직금(최대 3개월치)을 국가가 먼저 지급해줘요. 이후 국가가 사업주에게 구상권을 행사해요.",
  },
  {
    q: "퇴직금 청구 기한이 있나요?",
    a: "있어요. 퇴직일로부터 3년이 소멸시효예요. 3년이 지나면 청구권이 없어져요. 내용증명을 발송하거나 노동청에 진정을 내면 소멸시효가 중단돼요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 제8조: 퇴직금 지급 의무 (사업장 규모 무관)", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "근로기준법 제11조: 근로기준법 적용 범위 (5인 미만 제외 조항)", url: "https://www.law.go.kr/법령/근로기준법" },
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
  { slug: "퇴직금-조건", title: "퇴직금 받는 조건", description: "1년·주15시간 기준과 예외 케이스 정리." },
  { slug: "퇴직금-지급-기준", title: "퇴직금 지급 기준", description: "사업장 규모별 적용 법령 비교." },
  { slug: "퇴직금-미지급-신고", title: "퇴직금 미지급 신고 방법", description: "노동청 진정 절차를 단계별로 안내해요." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} highlightSlugs={퇴직금_HIGHLIGHT} currentSlug="퇴직금-지급-기준-5인미만" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 5인미만 · 지급의무</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        직원 4명 이하 사업장, 퇴직금을 안 줘도 되나요?<br />
        5인 미만 퇴직금 지급 기준과 청구 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "우리는 직원이 몇 명 안 되니까 퇴직금이 없어요." 이 말, 잘못된 거예요.
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법</a>은
        사업장 규모를 따지지 않아요. 2010년 12월 1일부터 1인 사업장까지 전면 적용돼요.
        1년 이상, 주 15시간 이상 일했다면 편의점이든 식당이든 퇴직금을 받을 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>5인 미만도 퇴직금 지급 의무가 있나요?</H2>
      <p style={body}>
        있어요. 근로자퇴직급여보장법 제8조는 사업장 규모 제한이 없어요.
        1인 사업장도, 4인 이하 사업장도 1년 이상 근무한 근로자에게 퇴직금을 줘야 해요.
        근무 기간과 주 근무 시간 조건만 충족하면 퇴직금이 발생해요.
      </p>
      <p style={body}>
        5인 미만에 적용되지 않는 규정은 따로 있어요. 연장근로 가산임금(근로기준법 제56조), 부당해고 구제(동법 제23조)는 5인 이상부터예요.
        퇴직금은 그 예외 목록에 없어요. 사업주가 5인 미만을 이유로 거부하면 고용노동부(1350)에 신고할 수 있어요.
      </p>

      <GreenBox>
        적용 시점: 2010년 12월 1일 이후 퇴직자부터 전면 적용<br />
        지급 조건: 1년 이상 계속 근무 + 4주 평균 주 15시간 이상<br />
        지급 기한: 퇴직일로부터 14일 이내 (지연 시 연 20% 이자 발생)
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="퇴직금 지급 기준을 충족해요. 아래 계산기로 예상 금액을 먼저 확인해보세요."
        partialMatchText="조건 일부가 맞지 않을 수 있어요. 고용노동부(1350)에 상담받아보세요."
      />

      <Divider />

      <H2>5인 미만 퇴직금 예상액 계산해보세요</H2>
      <p style={body}>
        계산 공식은 5인 이상과 동일해요. "30일분 평균임금 × 근속연수"예요.
        평균임금은 퇴직 전 3개월 임금 총액을 그 기간 총 일수로 나눈 금액이에요.
        슬라이더로 월 평균임금과 근속 기간을 조정하면 예상 금액을 바로 볼 수 있어요.
      </p>
      <p style={body}>
        상여금이나 고정수당이 있다면 실제 퇴직금이 더 높게 나올 수 있어요.
        퇴직금이 300만원을 넘으면 IRP 계좌로만 받을 수 있어요.
        IRP가 없다면 미리 <a href="/w/퇴직금-IRP-계좌" style={{ color: "#1D9E75", textDecoration: "underline" }}>개설</a>해두세요.
      </p>

      <SectionBadge>퇴직금 예상 금액 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 실제 퇴직금은 퇴직 전 3개월 평균임금 기준. 상여금·연장수당 포함 여부에 따라 달라질 수 있어요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>퇴직금 청구에 필요한 서류</H2>
      <p style={body}>
        5인 미만 사업장은 근로계약서가 없는 경우도 많아요. 계약서가 없어도 실제 근무 사실만 증명하면 돼요.
        통장 입금 내역이 가장 강력한 증거예요. 카카오톡으로 받은 업무 지시, 출퇴근 시간 메모도 증거로 쓸 수 있어요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <p style={body}>
        퇴직 후엔 급여명세서를 달라고 해도 회사가 줄 의무가 없어요.
        재직 중에 3개월치 이상 받아두는 게 좋아요.
        지금 보관 중인 자료를 미리 정리해두면 분쟁이 생겼을 때 빠르게 대응할 수 있어요.
      </p>

      <Divider />

      <H2>퇴직금 청구 절차 4단계</H2>
      <p style={body}>
        사업주가 퇴직금을 주지 않을 때 순서대로 대응하면 돼요.
        혼자 해결하기 어렵다는 생각에 포기하는 분이 많지만, 고용노동부 진정은 무료고 온라인으로도 쉽게 낼 수 있어요.
        대부분 3단계(노동청 진정) 전에 해결돼요.
      </p>

      <Steps steps={STEPS} />

      <p style={body}>
        진정을 내면 근로감독관이 사업주에게 연락해 사실관계를 확인해요.
        사업주가 계속 지급을 거부하면 형사 처벌(3년 이하 징역 또는 3천만원 이하 벌금)까지 갈 수 있어요.
        체당금은 사업주가 폐업하거나 지급 능력이 없을 때 국가가 먼저 지급해주는 제도예요.
      </p>

      <Divider />

      <H2>퇴직금 받기 전 체크리스트</H2>
      <p style={body}>
        청구 전에 꼭 챙겨야 할 것들이에요. 기록을 남겨두지 않으면 나중에 증거 부족으로 불리해질 수 있어요.
        순서대로 체크하면 퇴직금을 빠짐없이 받을 수 있어요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        고용노동부 체당금 신청 → 퇴직 전 최종 3개월 임금 + 퇴직금 최대 3개월치 지급<br />
        신청 방법: 고용노동부 공식 사이트(moel.go.kr)에서 온라인 접수 가능해요.
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
