"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { FAQ } from "@/components/article-ui/FAQ";
import { References } from "@/components/article-ui/References";
import { Disclaimer } from "@/components/article-ui/Disclaimer";
import { 퇴직금_SIDEBAR, 퇴직금_HIGHLIGHT } from "@/data/퇴직금-guide";

// Q1. 퇴직금을 못 받았고 회사가 기한 연장 동의서를 내밀어서 서명 여부를 고민 중인 상황이에요.
// Q2. 동의서의 독소 조항(이자 포기)을 파악하고, 서명 여부를 결정하거나 거부 후 지연이자를 청구한다.
// Q3. 유효 조건(서면·사전·구체적 날짜), 이자 포기 조항 위험성, 거부 시 이자 자동 발생, 연장 기한 초과 시 대응.
// Q4. GreenBox(유효 조건 요약) + EligibilityChecker(내 동의서 체크) + Calculator(이자 미리 계산) + Steps(절차) + Checklist(서명 전) + FAQ
//
// MAP:
// Q1 → 서론: 동의서를 들이밀어서 서명할지 말지 모르겠는 상황 공감
// Q2 → H2 순서: 유효 조건(알아야 결정) → 이자 계산(숫자로 파악) → 필수 항목(서류) → 절차(4단계) → 체크리스트(결정) → FAQ
// Q3 → H2 5개 + 체크리스트 + FAQ
// Q4 → GreenBox, EligibilityChecker, Calculator, DocTable, Steps, Checklist

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직금을 14일 안에 받지 못했고, 회사가 기한 연장을 요청했어요" },
  { id: "c2", label: "회사가 서면 동의서를 제시하며 서명을 요구하고 있죠" },
  { id: "c3", label: "동의서에 구체적인 지급 예정일이 적혀 있고요" },
  { id: "c4", label: "동의서에 지연이자 포기 조항이 없어요" },
];

const CALC_SLIDERS = [
  { id: "amount", label: "미지급 퇴직금", min: 100, max: 5000, step: 50, defaultValue: 1000, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "extendDays", label: "합의 기한 초과 일수", min: 1, max: 180, step: 1, defaultValue: 30, format: (v: number) => `${v}일` },
];

const CALC_RESULTS = [
  {
    label: "합의 기한 초과 지연이자 (연 20%)",
    getValue: (v: Record<string, number>) => Math.round(v.amount * 10000 * 0.2 / 365 * v.extendDays),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "퇴직금 + 지연이자 합계",
    getValue: (v: Record<string, number>) => Math.round(v.amount * 10000 + v.amount * 10000 * 0.2 / 365 * v.extendDays),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "연장 사유 (자금 사정, 내부 절차 등 구체적으로)", required: true, where: "동의서 본문에 기재" },
  { name: "연장 기간 및 지급 예정일 (날짜 명시)", required: true, where: "동의서 본문에 기재" },
  { name: "지연이자 적용 여부 명시", required: true, where: "동의서 본문에 기재" },
  { name: "지급 보장 방법 (담보·보증 등, 해당 시)", required: false, where: "동의서 본문에 기재" },
  { name: "근로계약서 사본", required: true, where: "인사팀 또는 입사 시 수령본" },
  { name: "급여명세서 (최근 3개월)", required: true, where: "회사 인사팀 요청" },
  { name: "퇴직 확인서 또는 사직서 사본", required: true, where: "회사 인사팀" },
];

const STEPS = [
  {
    title: "동의서 내용 꼼꼼히 검토",
    desc: "서명 전에 세 가지를 반드시 짚어야 해요. 첫째, 구체적인 지급 예정일이 적혀 있는지. 둘째, 지연이자 포기 조항이 없는지. 셋째, 연장 사유가 명시됐는지예요. 이 중 하나라도 빠지면 수정을 요구하거나 서명하지 않는 게 유리하죠.",
    tip: "지연이자 포기 조항이 있으면 삭제 요청 또는 서명 거부해요",
  },
  {
    title: "동의 여부 결정",
    desc: "동의는 강요가 아닌 자발적 합의여야 유효해요. 퇴직 전 사전 합의가 원칙이고, 퇴직 후 강요로 받은 동의서는 무효를 주장할 수 있죠. 합리적인 연장 기간(14~30일)이고 이자 포기 조항이 없다면 서명도 가능하죠.",
    tip: "거부해도 불이익 없어요. 지연이자 청구권은 그대로 유지되죠",
  },
  {
    title: "동의서 교부 및 보관",
    desc: "서명 후 동의서 사본을 반드시 받아두세요. 이후 분쟁 시 합의 내용을 증명하는 핵심 증거가 되죠. 이메일이나 문자로 내용을 재확인해두면 더 안전하고요.",
    tip: "동의서 원본 또는 사진 캡처를 반드시 보관해요",
  },
  {
    title: "연장 기간 내 지급 모니터링",
    desc: "합의한 기한 안에 퇴직금이 실제로 입금됐는지 체크해봐요. 연장 기한도 초과하면 그 시점부터 다시 지연이자(연 20%)가 발생하고, 고용노동부에 진정을 낼 수 있죠. 지급 약속이 반복해서 미뤄지면 즉시 신고하는 게 좋아요.",
    tip: "연장 기한 초과 시 노동청 진정 + 지연이자 청구 가능하죠",
  },
];

const CHECKLIST = [
  "지급 예정일 명시: 동의서에 구체적인 날짜가 반드시 있어야 해요",
  "이자 포기 조항 없는지: 있으면 삭제 요청 또는 서명 거부",
  "연장 사유 기재: 사유 없는 동의서는 효력 논란 가능성",
  "사전 합의 원칙: 퇴직 전에 서면으로 합의해야 유효해요",
  "동의서 사본 보관: 서명 후 반드시 사본 받아두기",
  "연장 기한 초과 시: 다시 지연이자 발생 + 노동청 신고 가능",
];

const FAQS = [
  {
    q: "지급기한 연장 동의서에 반드시 서명해야 하나요?",
    a: "아니에요. 동의는 자발적 합의예요. 서명을 거부해도 불이익이 없죠. 거부하면 14일 초과분부터 지연이자(연 20%)를 청구할 수 있고요.",
  },
  {
    q: "동의서에 지연이자 포기 조항이 있는데 서명해야 하나요?",
    a: "서명하면 이자를 받기 어려워지죠. 포기 조항 삭제를 요청하거나, 삭제가 안 되면 서명하지 않고 고용노동부에 진정을 내는 게 유리해요.",
  },
  {
    q: "동의서를 썼는데 연장 기한도 지났어요",
    a: "연장 기한 초과분부터 다시 지연이자(연 20%)가 발생해요. 추가로 고용노동부에 진정을 낼 수 있죠.",
  },
  {
    q: "구두로 합의했는데 유효한가요?",
    a: "구두 합의는 입증이 어렵고 유효성 논란이 생기죠. 근로기준법 제36조는 서면 합의를 요구해요. 구두만 있다면 사실상 미지급 상태로 봐도 무방해요.",
  },
  {
    q: "퇴직 후 강요로 서명한 동의서도 유효한가요?",
    a: "강요·사기·착오로 서명한 경우는 무효를 주장할 수 있죠. 근로기준법 제36조는 사전 합의가 원칙이에요. 노무사나 법률구조공단(132)에 상담해봐요.",
  },
  {
    q: "동의서 없이 기한이 지났으면 어떻게 되나요?",
    a: "14일 초과 시점부터 자동으로 지연이자(연 20%)가 발생해요. 동의서 없이 기한이 지나면 바로 고용노동부 진정을 낼 수 있죠.",
  },
  {
    q: "서명 거부 의사는 어떻게 전달하나요?",
    a: "문자 또는 이메일로 '동의서 서명을 거부한다'는 내용을 남겨두면 돼요. 말로만 거부하면 나중에 분쟁 시 증거가 없어서 불리해지죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제36조: 금품 청산 기한 14일, 합의 연장 가능", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로기준법 제37조: 지연이자 연 20%", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로자퇴직급여보장법 제9조: 퇴직금 지급 기한", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부: 퇴직금 지급 기준 안내", url: "https://www.moel.go.kr" },
      { label: "고용노동부 민원마당: 온라인 진정 신청", url: "https://minwon.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-지급-기한-연장", title: "퇴직금 지급 기한 연장 조건", description: "연장이 가능한 조건과 절차를 정리했어요." },
  { slug: "퇴직금-지급-기한", title: "퇴직금 지급 기한 14일 원칙", description: "기한 계산법과 예외 상황을 설명해요." },
  { slug: "퇴직금-지연이자", title: "퇴직금 지연이자 계산", description: "연 20% 지연이자 계산법과 청구 방법이에요." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} highlightSlugs={퇴직금_HIGHLIGHT} currentSlug="퇴직금-지급-기한-연장-동의서" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 지급기한 · 연장동의서</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 지급 기한 연장 동의서, 서명해도 되나요?<br />
        독소 조항 파악부터 거부 방법까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        회사가 퇴직금을 바로 못 주겠다며 기한 연장 동의서를 내밀었을 때, 막막하죠?
        서명 전에 지연이자 포기 조항이 있는지 반드시 짚어봐야 해요.
        이 조항이 들어 있으면 서명 순간{" "}
        <a href="/w/퇴직금-지연이자" style={{ color: "#1D9E75", textDecoration: "underline" }}>지연이자(연 20%)</a>{" "}
        청구권을 잃을 수 있죠.
        거부해도 불이익은 없고, 14일 초과분부터 이자는 그대로 발생해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* H2-1: 유효 조건 알아야 결정 */}
      <H2>연장 동의서가 유효하려면 갖춰야 할 조건</H2>
      <p style={body}>
        <a href="/w/퇴직금-지급-기한" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 지급 기한</a>은{" "}
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법 제9조</a>에 따라 퇴직 후 14일이에요.
        단, 근로기준법 제36조는 당사자가 합의하면 기한을 연장할 수 있다고 정해요.
        여기서 합의는 반드시 서면이어야 하고, 퇴직 전 사전 합의가 원칙이에요.
        구두로만 합의했다면 유효성 논란이 생기죠.
      </p>
      <p style={body}>
        동의서에 꼭 들어가야 할 세 가지가 있죠. 연장 사유, 구체적인 지급 예정일, 그리고 지연이자 적용 여부예요.
        이 중 하나라도 빠지면 분쟁이 생겼을 때 근로자에게 불리하게 작용할 수 있고요.
        지급 예정일이 "조속한 시일 내" 같은 모호한 표현이면 효력을 인정받기 어렵죠.
      </p>

      <GreenBox>
        ① 서면 합의: 구두 합의는 입증 어려움, 서명 문서 필수<br />
        ② 사전 합의: 원칙적으로 퇴직 전에 이뤄져야 해요<br />
        ③ 구체적 지급일 명시: "조속한 시일" 같은 표현은 무효 논란 가능
      </GreenBox>

      <SectionBadge>내 동의서 상태 체크</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="동의서를 검토하고 서명할 조건을 갖추고 있죠. 아래 계산기로 연장 기간 중 지연이자를 미리 파악해봐요."
        partialMatchText="동의서 조건에 문제가 있을 수 있죠. 서명 전 고용노동부(1350)에 상담받아봐요."
      />

      <Divider />

      {/* H2-2: 이자 계산 숫자로 파악 */}
      <H2>합의 기한도 넘기면 지연이자가 또 붙어요</H2>
      <p style={body}>
        동의서를 써줬더라도 합의한 기한을 또 넘기면 그 시점부터 다시 지연이자가 발생해요.
        동의서에 지연이자 포기 조항이 없었다면 청구할 수 있고요.
        미지급 퇴직금과 초과 일수를 넣으면 예상 이자를 미리 파악할 수 있죠.
      </p>

      <BorderBox>
        퇴직금 1,000만원이 30일 더 늦어지면 지연이자만 약 16만원이에요.
        금액이 크거나 기간이 길수록 이자도 비례해서 커지죠.
        아래 계산기에 내 숫자를 넣어봐요.
      </BorderBox>

      <SectionBadge>연장 기간 지연이자 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 근로기준법 제37조 기준 연 20%. 합의한 지급일 초과분부터 실제 지급일까지 누적 계산이에요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      {/* H2-3: 필수 항목 및 서류 */}
      <H2>동의서 본문에 빠지면 안 되는 항목</H2>
      <p style={body}>
        동의서 본문에 반드시 들어가야 하는 항목과, 퇴직금 기준 입증에 필요한 첨부 서류를 정리했어요.
        첨부 서류는 분쟁 시 퇴직금 원금을 입증하는 데 쓰이죠.
      </p>
      <p style={body}>
        특히 지연이자 적용 여부를 동의서에 명시해두는 게 중요해요.
        나중에 "이자를 포기한 게 아니다"라는 근거가 되거든요.
        애매하게 작성된 동의서는 회사에 유리하게 해석될 가능성이 높아요.
      </p>

      <SectionBadge>동의서 필수 항목 및 첨부 서류</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      {/* H2-4: 4단계 절차 */}
      <H2>동의서 작성부터 지급 완료까지 4단계</H2>
      <p style={body}>
        동의서 내용 검토 → 동의 여부 결정 → 교부 및 보관 → 기한 내 지급 모니터링 순서예요.
        첫 단계에서 이자 포기 조항을 걸러내는 게 핵심이죠.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      {/* H2-5: 체크리스트 */}
      <H2>서명 전 반드시 짚어야 할 체크리스트</H2>
      <p style={body}>
        이자 포기 조항이 가장 위험해요. 서명 전 아무 생각 없이 넘기면 수십만원 이자를 잃을 수 있죠.
        아래 항목을 하나씩 체크하고 서명 여부를 결정하면 돼요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        서명 거부 시 14일 초과분부터 지연이자(연 20%)가 자동 발생해요.<br />
        거부 의사는 문자나 이메일로 기록을 남겨두는 게 좋죠.
      </GreenBox>

      <Divider />

      {/* H2-6: FAQ */}
      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 지급 기한 연장 동의서에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법 및 근로자퇴직급여보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 살펴봐요." />
    </ArticleLayout>
  );
}
