"use client";

// Q1. 퇴직일이 정해졌거나 곧 퇴직을 앞두고 퇴직금이 어떻게 언제 들어오는지 모르는 상황이에요.
// Q2. 퇴직금을 14일 안에 IRP 계좌로 정확히 수령하는 것 IRP 개설 → 계좌번호 전달 → 입금 확인까지 완료.
// Q3. IRP 계좌 개설이 왜 필수인지, 14일 기한이 어디서 시작되는지, 미입금 시 어떤 조치를 취하는지, 300만원 기준 예외는 뭔지.
// Q4. 단계별 순서(Steps) + 예상 금액 계산기 + 체크리스트 읽고 바로 따라 하는 구조.

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR, 퇴직금_HIGHLIGHT } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직일이 확정됐죠" },
  { id: "c2", label: "퇴직금이 300만원을 초과할 것 같죠" },
  { id: "c3", label: "IRP 계좌를 퇴직 전에 개설했죠" },
  { id: "c4", label: "IRP 계좌번호를 회사 인사팀에 전달했죠" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "월 평균임금", min: 150, max: 1000, step: 10, defaultValue: 300, format: (v: number) => `${v}만원` },
  { id: "years", label: "근속기간", min: 1, max: 40, step: 1, defaultValue: 5, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "예상 퇴직금",
    getValue: (v: Record<string, number>) => v.salary * 10000 * v.years,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "1년치 기준 (월 평균임금 1개월)",
    getValue: (v: Record<string, number>) => v.salary * 10000,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "IRP 계좌번호", required: true, where: "본인 IRP 개설 후 인사팀에 서면·문자로 전달" },
  { name: "사직서", required: true, where: "인사팀 또는 직속 상관 제출 (퇴직일 명기)" },
  { name: "근로계약서", required: false, where: "입사 시 수령분 or 인사팀 재발급 요청" },
  { name: "급여명세서 (최근 3개월)", required: false, where: "퇴직금 계산 이의신청 시 필요" },
  { name: "퇴직소득원천징수영수증", required: false, where: "회사 발급 세금 내역 직접 검토용" },
];

const STEPS = [
  {
    title: "사직서 제출 퇴직일 확정",
    desc: "퇴직일을 명확히 적은 사직서를 인사팀 또는 직속 상관에게 제출해요. 이 날짜가 14일 지급 기한의 기산점이 돼요. 구두 통보만 하면 나중에 퇴직일 자체가 분쟁 대상이 될 수 있죠.",
    tip: "서면·이메일로 전달해서 기록을 남겨두세요. 퇴직일 다음날부터 14일 카운트가 시작돼요",
  },
  {
    title: "IRP 계좌 개설",
    desc: "퇴직금이 300만원을 초과하면 IRP(개인형 퇴직연금) 계좌로만 수령이 가능하죠. 2022년부터 의무화된 규정이에요. 은행·증권사·보험사 어디서든 모바일 앱으로 10분이면 개설되고, 계좌 개설은 무료예요.",
    tip: "55세 이상이거나 퇴직금 300만원 이하면 일반 계좌 수령이 가능해요",
    link: { label: "IRP 계좌 개설 방법 보기", href: "/w/퇴직금-통장" },
  },
  {
    title: "IRP 계좌번호 인사팀에 통보",
    desc: "개설한 IRP 계좌번호를 회사 인사팀에 전달해요. 이 정보가 없으면 회사가 퇴직금을 송금하지 못하죠. 퇴직일 전에 미리 전달하면 처리가 빨라지고, 14일 기한을 여유 있게 맞출 수 있고요.",
    tip: "문자·이메일로 전달해서 전달 시각 기록을 남겨두세요. 분쟁 시 증거가 돼요",
  },
  {
    title: "퇴직일로부터 14일 이내 IRP 입금 확인",
    desc: "퇴직일 다음 날부터 14일 이내에 IRP 계좌에 입금됐는지 살펴봐요. 14일이 지나도 입금이 없으면 먼저 인사팀에 서면으로 지급을 요청하세요. 그래도 미지급이면 고용노동부 고객상담센터(☎1350)나 민원마당에 임금체불 진정을 넣으면 돼요.",
    tip: "14일 초과 시 연 20% 지연이자가 자동 발생해요. 지급 기한을 넘기면 회사에 이자까지 청구할 수 있죠",
    link: { label: "퇴직금 지급 기한 14일 원칙 보기", href: "/w/퇴직금-지급-기한" },
  },
  {
    title: "퇴직소득원천징수영수증 수령 및 세금 확인",
    desc: "회사는 퇴직금 지급 시 퇴직소득세를 원천징수하고 영수증을 발급해요. 영수증으로 세금 계산이 맞는지 직접 검토해봐요. 오류가 있으면 회사에 정정 요청을 하고, 그래도 안 되면 세무서에 경정청구를 낼 수 있죠.",
    tip: "IRP로 받으면 수령 시 세금이 유예돼요. 인출 시점에 세금이 정산되는 구조예요",
  },
];

const CHECKLIST = [
  "사직서 제출: 퇴직일 날짜 명확히 기재 (서면 보관)",
  "IRP 계좌 개설: 퇴직 전에 미리 준비 (모바일 10분)",
  "IRP 계좌번호 인사팀 전달: 문자·이메일로 기록 남기기",
  "14일 이내 IRP 입금 여부 점검: 미입금 시 서면 지급 요청",
  "퇴직소득원천징수영수증 수령: 세금 내역 직접 검토",
  "미지급 지속 시 고용노동부 진정: 연 20% 지연이자 청구 가능",
];

const FAQS = [
  {
    q: "퇴직금은 퇴사 후 며칠이면 들어오나요?",
    a: "법적으로 퇴직일 다음 날부터 14일 이내에 지급해야 해요. 회사가 급여일에 맞춰 처리하기도 하지만, 14일이 법정 상한선이죠. 14일이 지나면 연 20% 지연이자가 자동으로 발생해요.",
  },
  {
    q: "IRP 계좌가 없으면 퇴직금을 못 받나요?",
    a: "55세 이상이거나 퇴직금이 300만원 이하라면 일반 계좌로 수령이 가능하죠. 그 외에는 IRP가 반드시 필요해요. 퇴직 전에 개설해두지 않으면 지급이 늦어질 수 있으니, 퇴직일 결정 후 바로 개설하세요.",
  },
  {
    q: "회사가 IRP 계좌를 안 받겠다고 하면 어떻게 하나요?",
    a: "근로자퇴직급여보장법상 퇴직금 300만원 초과 시 IRP 입금이 의무예요. 회사가 거부하면 고용노동부 고객상담센터(☎1350)에 신고할 수 있죠. 회사 입장에서도 의무 위반이에요.",
  },
  {
    q: "퇴직금 계산이 잘못된 것 같아요. 어떻게 이의신청하나요?",
    a: "퇴직소득원천징수영수증을 받아서 직접 계산해봐요. 퇴직 전 3개월 평균임금 × 근속연수가 기준이에요. 계산이 틀렸다면 인사팀에 정정 요청을 서면으로 하고, 해결이 안 되면 고용노동부에 진정을 낼 수 있죠.",
  },
  {
    q: "회사가 폐업해서 퇴직금을 못 받을 것 같아요.",
    a: "체당금 제도를 활용해봐요. 고용노동부에서 사업주 도산 인정을 받으면 정부가 퇴직금을 대신 지급해줘요. 근로복지공단에 신청하면 되고, 최고 3년치 퇴직금까지 보장받을 수 있죠.",
  },
  {
    q: "퇴직금을 분할로 받아달라고 회사가 요청하면?",
    a: "원칙적으로 퇴직금은 한 번에 지급해요. 분할 지급은 근로자가 동의해야만 가능하고, 동의하지 않아도 불이익은 없어요. 동의 없이 분할 지급하면 회사가 법을 위반한 거예요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법: 퇴직금 지급 절차 및 IRP 의무화", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "근로기준법 제36조: 금품 청산 의무 (퇴직일 후 14일)", url: "https://www.law.go.kr/법령/근로기준법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부: 퇴직급여 제도 안내", url: "https://www.moel.go.kr" },
      { label: "고용노동부 민원마당: 임금체불 진정 접수", url: "https://minwon.moel.go.kr" },
      { label: "근로복지공단: 체당금 신청 안내", url: "https://www.comwel.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-지급-기한", title: "퇴직금 지급 기한 14일 원칙", description: "14일 안에 안 들어오면 지연이자까지 청구할 수 있죠." },
  { slug: "퇴직금-통장", title: "퇴직금 IRP 계좌 활용 방법", description: "IRP가 왜 필요한지, 어디서 만드는지 정리했어요." },
  { slug: "퇴직금-미지급-신고", title: "퇴직금 미지급 신고 방법", description: "고용노동부 진정 절차와 지연이자 청구까지 안내해요." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} highlightSlugs={퇴직금_HIGHLIGHT} currentSlug="퇴직금-지급-절차" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 지급절차 · IRP 수령</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금, 어떻게 받는 건가요?<br />
        IRP 개설부터 14일 입금까지 단계별 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금이 자동으로 들어오는 게 아니에요. 퇴직 전에 준비해야 할 것, 회사가 해야 할 것, 입금 확인까지 순서가 따로 있죠.
        2022년부터 퇴직금 300만원 초과 시 <a href="/w/퇴직금-통장" style={{ color: "#1D9E75", textDecoration: "underline" }}>IRP 계좌</a>로만
        수령이 의무화됐어요.{" "}
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법</a>과{" "}
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제36조</a>에 따라
        퇴직일로부터 14일 이내 지급이 법정 의무예요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>퇴직금 지급 절차, 내 상황에 맞나요?</H2>
      <p style={body}>
        퇴직금을 제때 받으려면 근로자 쪽에서도 준비가 필요해요.
        IRP 계좌 개설과 계좌번호 전달이 늦으면 14일 기한 내 입금이 밀릴 수 있죠.
        퇴직일이 확정된 시점부터 바로 움직이는 게 좋아요.
      </p>
      <p style={body}>
        퇴직금 300만원 초과인데 IRP 계좌가 없으면 회사도 송금을 못 해요.
        아래 체크리스트로 내 준비 상태를 먼저 살펴봐요.
      </p>

      <GreenBox>
        ① 사직서 제출 (퇴직일 확정) → ② IRP 계좌 개설<br />
        → ③ IRP 계좌번호 인사팀 전달 → ④ 퇴직일 후 14일 이내 입금 점검<br />
        ※ 퇴직금 300만원 초과 시 IRP 계좌 필수 (2022년부터 의무)
      </GreenBox>

      <SectionBadge>내 상황 체크해봐요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="퇴직금 수령 준비가 다 됐어요. 14일 이내 IRP 입금 여부만 살펴보면 돼요."
        partialMatchText="아직 준비가 덜 된 부분이 있죠. 위 항목 중 빠진 것부터 처리하세요."
      />

      <Divider />

      <H2>내 퇴직금 예상 금액 계산</H2>
      <p style={body}>
        퇴직금 계산 공식은 간단해요. 퇴직 전 3개월 평균임금 × 근속연수예요.
        월급이 큰 변화 없이 유지됐다면 아래 계산기로 대략적인 금액을 바로 뽑아볼 수 있죠.
      </p>
      <p style={body}>
        300만원을 초과하는지 미리 파악해야 IRP 계좌 개설 여부를 결정할 수 있죠.
        1년 미만 근속이면 퇴직금 자체가 발생하지 않고요.
      </p>

      <SectionBadge>퇴직금 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 근로자퇴직급여보장법 기준. 정확한 금액은 퇴직 전 3개월 평균임금으로 계산해요. 상여금·수당 포함 여부는 회사 규정에 따라 달라요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>절차에 필요한 서류 목록</H2>
      <p style={body}>
        퇴직금 수령 자체에 복잡한 서류는 필요 없어요.
        IRP 계좌번호와 사직서가 핵심이고, 나머지는 이의신청이나 세금 검토 시 필요한 보조 서류예요.
      </p>
      <p style={body}>
        퇴직소득원천징수영수증은 회사가 퇴직금 지급 시 자동으로 발급해줘야 해요.
        받지 못했다면 인사팀에 요청하세요.
      </p>

      <SectionBadge>필요 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>퇴직일부터 IRP 입금까지 5단계</H2>
      <p style={body}>
        사직서 제출부터 세금 검토까지, 단계별로 따라가면 빠짐없이 처리할 수 있죠.
        각 단계에서 기록(서면·문자·이메일)을 남겨두면 나중에 분쟁이 생겼을 때 증거가 되죠.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>수령 전 체크리스트와 주의사항</H2>
      <p style={body}>
        퇴직금 지급이 지연되는 가장 흔한 이유는 IRP 계좌번호를 늦게 전달하거나,
        아예 개설을 안 한 경우예요. 퇴직일이 확정되면 그날 바로 IRP를 개설하세요.
      </p>

      <SectionBadge>수령 전 준비 목록</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        IRP 계좌로 퇴직금을 받으면 퇴직소득세가 유예돼요.<br />
        IRP에서 꺼낼 때 세금이 정산되는 구조예요.<br />
        55세 이후 연금 형태로 꺼내면 세율이 낮아져서 절세 효과가 있죠.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 지급 절차에 관해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법과 근로기준법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(☎1350)에서 살펴봐요." />
    </ArticleLayout>
  );
}
