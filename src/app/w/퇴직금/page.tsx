"use client";
/*
 * Q1: 퇴직을 앞두고 있거나 이미 퇴직한 직장인. 내 퇴직금이 얼마인지, 어떻게 받는지 모름
 * Q2: 내 퇴직금 금액을 계산하고, 수령 절차를 밟아서 실제로 받는다
 * Q2-1: IRP 계좌 개설(은행앱) 또는 고용24 퇴직금 계산기에서 정확한 금액 확인
 * Q3: 계산 공식(평균임금×30×근속연수), IRP 의무(300만원 초과), 지급 기한(14일), 미지급 시 대응(지연이자 20%)
 * Q4: Calculator(금액 확인) + Steps(수령 절차) + DocTable(서류) + Checklist(놓치면 손해인 것)
 */

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CALC_SLIDERS = [
  { id: "monthly", label: "월 평균 임금", min: 200, max: 800, step: 10, defaultValue: 300, format: (v: number) => `${v}만원` },
  { id: "years", label: "근속 기간", min: 1, max: 35, step: 1, defaultValue: 5, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "퇴직금 예상액",
    getValue: (v: Record<string, number>) => v.monthly * 10000 * v.years,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "세후 수령액 (퇴직소득세 약 5% 공제 기준)",
    getValue: (v: Record<string, number>) => Math.round(v.monthly * 10000 * v.years * 0.95),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const STEPS = [
  {
    title: "IRP 계좌 개설",
    desc: "퇴직금이 300만원을 넘으면 IRP 계좌로만 받을 수 있어요. 은행·증권사 앱에서 10분이면 개설이 끝나죠. 퇴직 전에 미리 만들어두면 지급 지연 없이 바로 받아요.",
    tip: "KB국민·신한·하나·우리 등 주거래 은행 앱에서 바로 개설 가능",
  },
  {
    title: "인사팀에 IRP 계좌번호 전달",
    desc: "개설한 IRP 계좌번호를 인사팀에 문자나 메일로 알려줘야 해요. 이걸 안 하면 회사가 퇴직금을 보낼 곳이 없어서 지급이 늦어지거든요.",
  },
  {
    title: "퇴직금 입금 확인 (퇴직일로부터 14일 이내)",
    desc: "근로기준법 제36조에 따라 퇴직일로부터 14일 안에 입금돼야 해요. 14일이 지나면 연 20% 지연이자가 붙거든요. 입금 안 되면 고용노동부(1350)에 바로 문의하면 돼요.",
    tip: "14일 넘기면 연 20% 지연이자 청구 가능",
  },
  {
    title: "세금 확인 및 수령 방식 결정",
    desc: "IRP로 받으면 퇴직소득세가 원천징수돼요. 55세 이후 연금으로 나눠 받으면 세율이 30% 낮아지죠. 300만원 이하라면 IRP 없이 일반 계좌로 바로 받을 수 있어요.",
    tip: "IRP → 연금 수령 시 퇴직소득세 30% 절세",
  },
];

const DOCS = [
  { name: "신분증", required: true, where: "본인 지참" },
  { name: "급여명세서 (최근 3개월)", required: true, where: "회사 인사팀 — 퇴직 전에 챙겨둘 것" },
  { name: "IRP 계좌 정보 (계좌번호)", required: true, where: "은행·증권사 앱에서 개설 후" },
  { name: "근로계약서", required: false, where: "인사팀 또는 입사 시 수령본" },
];

const CHECKLIST = [
  "퇴직 전 급여명세서 3개월치 확보 — 퇴직 후엔 발급이 어려워요",
  "IRP 계좌 퇴직 전 개설 — 안 하면 지급이 밀려요",
  "14일 지나도 입금 없으면 — 연 20% 지연이자 청구 가능",
  "소멸시효 3년 — 퇴직일로부터 3년 지나면 청구 자체가 안 돼요",
  "상여금 포함 여부 — 회사가 빠뜨렸으면 재계산 요청",
];

const FAQS = [
  {
    q: "계약직이나 알바도 퇴직금을 받을 수 있나요?",
    a: "1년 이상, 주 15시간 이상 근무했다면 고용 형태와 관계없이 받을 수 있어요. 계약직·아르바이트·파견직 전부 동일하게 적용되죠.",
  },
  {
    q: "14일이 지났는데 퇴직금이 안 들어오면?",
    a: "근로기준법 제36조 위반이에요. 연 20% 지연이자를 청구할 수 있고, 고용24(work.go.kr)에서 온라인 진정 접수를 하면 돼요.",
  },
  {
    q: "퇴직금을 IRP 말고 일반 통장으로 받을 수 있나요?",
    a: "300만원 이하라면 일반 계좌로 받을 수 있어요. 넘으면 IRP로만 받아야 하죠. 2022년 4월부터 의무화됐어요.",
  },
  {
    q: "1년 미만 근무하면 퇴직금이 아예 없나요?",
    a: "법적으로 퇴직금이 발생하지 않아요. 다만 11개월 29일까지 근무했는데 회사가 1일 남기고 해고했다면, 부당해고로 다툴 수 있는 여지가 있어요.",
  },
  {
    q: "상여금은 퇴직금에 포함되나요?",
    a: "정기적으로 지급된 상여금은 연간 총액 ÷ 12로 월 환산해서 평균임금에 넣어야 해요. 회사가 빼고 계산했다면 재계산을 요청하면 돼요.",
  },
  {
    q: "퇴직금 계산이 회사랑 다르면?",
    a: "상여금·연차수당 포함 여부에서 차이가 나는 경우가 많아요. 고용노동부(1350)에 전화하면 무료로 계산 검증을 받을 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 제8조: 퇴직금 지급 기준", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "근로기준법 제36조: 금품 청산 (14일 이내)", url: "https://www.law.go.kr/법령/근로기준법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부: 퇴직금 제도 안내", url: "https://www.moel.go.kr" },
      { label: "고용24: 퇴직금 계산기", url: "https://www.work.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-계산-방법", title: "퇴직금 계산 방법", description: "공식부터 상여금 환산까지." },
  { slug: "퇴직금-수령방법", title: "퇴직금 수령, IRP 없이도 되나?", description: "일시금·연금·IRP 이전 절차까지." },
  { slug: "퇴직금-세금", title: "퇴직금 세금, 얼마나 떼나요?", description: "IRP 연금 수령 시 30% 절세 방법까지." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 계산 · 수령</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금, 나는 얼마 받을 수 있을까?<br />
        계산법부터 수령 절차까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "내 퇴직금이 대체 얼마나 되는 거지?" 퇴직을 앞두고 가장 먼저 드는 생각이죠.
      </p>
      <p style={body}>
        공식은 간단해요. 1일 평균임금 × 30 × 근속연수.
        근데 평균임금에 <a href="/w/퇴직금-상여금-포함" style={{ color: "#1D9E75", textDecoration: "underline" }}>상여금</a>이 들어가는지, <a href="/w/퇴직금-IRP-계좌" style={{ color: "#1D9E75", textDecoration: "underline" }}>IRP 계좌</a>가 왜 필요한지, 14일 안에 안 주면 어떻게 되는지 — 막상 따지면 모르는 게 많거든요.
        아래 계산기로 내 금액부터 확인하고, 수령까지 한 번에 끝내봐요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* H2-1: Q2 "계산한다" → Calculator 먼저 */}
      <H2>내 퇴직금은 얼마나 될까?</H2>
      <p style={body}>
        월 평균 임금과 근속기간만 넣으면 바로 나와요.
        상여금이 따로 있다면 연간 총액을 12로 나눈 금액을 월 임금에 더해야 정확해요.
        회사가 계산한 금액과 내가 계산한 금액이 다르다면, 상여금이나 연차수당 포함 여부를 먼저 확인해봐요.
      </p>

      <SectionBadge>퇴직금 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 월 평균 임금 × 근속연수 기준 간이 계산이에요. 정확한 금액은 고용24 퇴직금 계산기(work.go.kr)에서 확인해봐요."
      />
      <p style={body}>
        금액을 확인했으면 이제 실제로 받는 절차가 궁금하죠. IRP 계좌부터 준비해야 해요.
      </p>

      <Divider />

      {/* H2-2: Q2 "받는다" → Steps */}
      <H2>퇴직금 수령 절차, IRP부터 입금까지</H2>
      <p style={body}>
        300만원이 넘는 퇴직금은 IRP 계좌로만 받을 수 있어요. 2022년 4월부터 의무화됐거든요.
        퇴직 전에 미리 만들어두면 지급이 밀리지 않아요. 은행 앱에서 10분이면 끝나죠.
      </p>

      <SectionBadge>수령 4단계</SectionBadge>
      <Steps steps={STEPS} />
      <p style={body}>
        절차를 알았으면, 준비 서류를 빠뜨리지 않는 게 중요해요. 특히 급여명세서는 퇴직 전에 챙겨둬야 해요.
      </p>

      <Divider />

      {/* H2-3: 서류 → DocTable */}
      <H2>퇴직 전에 챙겨야 할 서류</H2>
      <p style={body}>
        급여명세서가 제일 중요해요. 퇴직금 계산의 기준이 되거든요.
        퇴직 후에 회사에 요청하면 발급이 늦어지거나 거부당하는 경우가 있어요. 재직 중에 3개월치를 확보해두세요.
      </p>

      <SectionBadge>준비 서류</SectionBadge>
      <DocTable docs={DOCS} />
      <p style={body}>
        서류까지 준비했으면 마지막으로 놓치기 쉬운 것들을 한번 훑어봐요. 소멸시효나 지연이자 같은 건 모르면 손해거든요.
      </p>

      <Divider />

      {/* H2-4: 놓치면 손해 → Checklist + GreenBox(미지급 대응) */}
      <H2>모르면 손해, 퇴직금 받을 때 놓치는 5가지</H2>
      <p style={body}>
        퇴직금을 받는 것 자체는 어렵지 않아요. 문제는 금액이 적게 나오거나, 아예 안 들어올 때예요.
        아래 5가지를 미리 체크해두면 나중에 억울한 일이 없어요.
      </p>

      <SectionBadge>퇴직금 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="14일 지나도 입금이 없다면">
        <a href="https://www.work.go.kr" target="_blank" rel="noopener noreferrer" style={{ color: "#0F6E56", textDecoration: "underline", fontWeight: 600 }}>고용24(work.go.kr)</a>에서 온라인 진정 접수를 하면 돼요. 연 20% 지연이자도 함께 청구할 수 있어요.
        전화 상담은 고용노동부 1350번이에요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법과 근로기준법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인해봐요." />

      <p style={{ ...body, fontSize: 13, color: "#888", marginTop: 20 }}>
        *이 글은 고용노동부, 법제처의 자료를 참고했어요.
      </p>
    </ArticleLayout>
  );
}
