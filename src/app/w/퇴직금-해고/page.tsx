"use client";

// ─── Q1-Q4 필수 사고 ─────────────────────────────────
// Q1. 갑자기 해고 통보를 받았는데 퇴직금을 받을 수 있는 건지, 부당해고인지 몰라서 당장 뭘 해야 할지 막막한 상황
// Q2. 퇴직금·해고예고수당을 청구하고, 부당해고 여부를 판단해서 구제신청까지 직접 진행할 수 있어야 함
// Q3. (1) 퇴직금 지급 조건과 해고 사유 무관성, (2) 해고예고수당 발생 조건(30일 예고), (3) 부당해고 판단 기준·구제신청 기한 3개월, (4) 필요 서류, (5) 실업급여 연계
// Q4. GreenBox(결론 요약) + EligibilityChecker(내 상황 체크) + Calculator(금액 계산) + DocTable(서류) + Steps(절차) + Checklist + FAQ
//
// MAP:
// Q1 → 서론: 해고 직후 당혹감 공감 ("해고 통보를 받으면 퇴직금도 못 받는 건지 불안하죠")
// Q2 → H2 순서: 조건(GreenBox+EligibilityChecker) → 금액(Calculator) → 서류(DocTable) → 절차(Steps) → 놓치기 쉬운 것(Checklist+GreenBox)
// Q3 → H2 5개 + FAQ 6개
// Q4 → GreenBox, EligibilityChecker, Calculator, DocTable, Steps, Checklist, FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR, 퇴직금_HIGHLIGHT } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "해고 통보를 받았어요" },
  { id: "c2", label: "1년 이상 계속 근무했어요" },
  { id: "c3", label: "주 15시간 이상 근무했어요" },
  { id: "c4", label: "30일 전 예고 없이 즉시 해고됐어요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "월 평균임금", min: 200, max: 800, step: 10, defaultValue: 300, format: (v: number) => `${v}만원` },
  { id: "years", label: "근속 기간", min: 1, max: 30, step: 1, defaultValue: 3, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "예상 퇴직금",
    getValue: (v: Record<string, number>) => v.salary * 10000 * v.years,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "해고예고수당 (즉시 해고 시 30일분)",
    getValue: (v: Record<string, number>) => v.salary * 10000,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "해고 통보서 (서면) 또는 해고 통지 문자·이메일·카톡 캡처", required: true, where: "회사로부터 수령 또는 직접 캡처" },
  { name: "근로계약서", required: true, where: "회사 인사팀 또는 서명 당시 사본" },
  { name: "급여명세서 최근 3개월분", required: true, where: "회사 인사팀 또는 급여 앱" },
  { name: "재직증명서 또는 고용보험 이직확인서", required: true, where: "회사 요청 또는 고용24 발급" },
  { name: "IRP 계좌번호 (퇴직금 300만원 초과 시)", required: false, where: "은행·증권사 개설" },
];

const STEPS = [
  {
    title: "해고 통보 즉시 증거부터 확보",
    desc: "해고 통보를 받으면 가장 먼저 해고 사유와 날짜를 기록해둬야 해요. 서면 통보가 없었다면 카카오톡, 문자, 이메일이라도 캡처하세요. 근로계약서와 최근 3개월 급여명세서도 바로 챙겨두는 게 좋아요.",
    tip: "서면 없는 해고는 그 자체로 절차 위반이에요. 증거 수집이 이후 분쟁에서 핵심이 되죠",
  },
  {
    title: "퇴직금·해고예고수당 서면 청구",
    desc: "1년 이상 근무했다면 해고 사유와 상관없이 퇴직금을 청구할 수 있죠. 30일 전 예고 없이 즉시 해고됐다면 30일분 통상임금을 해고예고수당으로 추가 청구하고요. 회사에 퇴직금 지급을 서면으로 요청하면서 지급 기한인 해고 후 14일을 명시해야 해요.",
    tip: "퇴직금 300만원 초과면 IRP 계좌로만 받을 수 있으니 미리 개설해두세요",
  },
  {
    title: "부당해고 여부 판단",
    desc: "해고는 정당한 이유가 있어야 해요. 단순 성격 차이, 사소한 실수, 경영상 어려움만으로는 해고가 어렵죠. 서면 해고 통지 없이 말로만 해고당했거나, 해고 사유가 납득되지 않는다면 부당해고를 검토해볼 수 있죠. 고용노동부 1350에 무료 상담을 먼저 받아보세요.",
    tip: "징계 해고라도 절차(징계위원회 개최, 서면 통보)를 지키지 않으면 부당해고가 될 수 있죠",
  },
  {
    title: "부당해고 구제신청 (해고일로부터 3개월 기한)",
    desc: "부당해고라고 판단되면 해고일로부터 3개월 이내에 지방노동위원회에 구제신청을 해야 해요. 구제 인정 시 원직 복직 또는 해고 기간 임금 상당액을 받게 되죠. 5인 미만 사업장은 근로기준법 부당해고 조항이 적용되지 않지만, 퇴직금·해고예고수당 청구권은 그대로 남아 있죠.",
    tip: "3개월 기한이 지나면 노동위원회 구제신청이 아예 불가능해요. 망설이지 말고 바로 신청하세요",
    link: { label: "노동위원회 구제신청 안내", href: "https://www.nlrc.go.kr" },
  },
  {
    title: "실업급여 신청",
    desc: "해고는 비자발적 이직이라 실업급여 수급 자격이 생겨요. 고용보험 피보험기간이 180일(약 6개월) 이상이면 신청 가능하죠. 퇴직일 다음 날부터 12개월 이내에 신청해야 하고, 회사에서 이직확인서를 발급해 주지 않으면 고용24에서 직접 신고할 수 있죠.",
    tip: "실업급여 신청은 고용24(www.work24.go.kr)에서 온라인으로 할 수 있죠",
    link: { label: "고용24 실업급여 신청", href: "https://www.work24.go.kr" },
  },
];

const CHECKLIST = [
  "퇴직금: 1년 이상 근무 + 주 15시간 이상이면 해고 사유 무관하게 지급 의무",
  "지급 기한: 해고 후 14일 이내 (합의 시 연장 가능)",
  "해고예고수당: 30일 전 예고 없는 즉시 해고면 30일분 통상임금 추가",
  "IRP 계좌: 퇴직금 300만원 초과면 IRP로만 수령",
  "부당해고 구제신청: 해고일로부터 3개월 이내, 기한 절대 놓치지 않기",
  "실업급여: 고용보험 180일 이상이면 퇴직일 다음 날부터 12개월 안에 신청",
  "증거 보존: 해고 통보 문자·카톡·이메일 캡처 후 별도 저장",
];

const FAQS = [
  {
    q: "징계 해고를 당해도 퇴직금을 받을 수 있나요?",
    a: "받을 수 있죠. 퇴직금은 해고 사유와 무관하게, 1년 이상 계속 근무하고 주 15시간 이상 일했다면 반드시 지급돼야 해요. 징계 해고, 권고사직, 정리해고 모두 마찬가지예요. 근로기준법이 아닌 근로자퇴직급여보장법에 따른 권리라서 어떤 사유의 해고여도 적용되죠.",
  },
  {
    q: "즉시 해고당했어요. 해고예고수당은 어떻게 받나요?",
    a: "30일 전 서면 예고 없이 해고됐다면 30일분 통상임금을 해고예고수당으로 받을 수 있죠. 퇴직금과 별도로 추가 청구하는 거예요. 회사에 서면으로 요청하고, 거부하면 고용노동부(1350)에 진정 신청을 할 수 있죠. 단, 3개월 미만 수습 기간 중인 경우는 예외예요.",
  },
  {
    q: "해고 통보를 말로만 받았는데 유효한가요?",
    a: "법적으로 유효하지 않아요. 근로기준법 제27조에 따르면 해고는 서면으로 해고 사유와 시기를 명시해서 통보해야 하거든요. 구두 해고만 있고 서면 통보가 없다면 그 자체로 절차 위반이에요. 이 경우 부당해고 구제신청의 근거가 될 수 있죠.",
  },
  {
    q: "5인 미만 사업장에서 해고당했는데 어떻게 되나요?",
    a: "5인 미만 사업장은 근로기준법 부당해고 조항(제23조)이 적용되지 않아요. 노동위원회 구제신청도 할 수 없죠. 다만 퇴직금 지급 의무(근로자퇴직급여보장법)와 해고예고수당(근로기준법 제26조)은 5인 미만도 적용돼요. 1년 이상 일했다면 퇴직금은 당연히 받을 수 있죠.",
  },
  {
    q: "회사가 퇴직금을 14일 이내에 안 주면 어떻게 되나요?",
    a: "14일이 지나면 지연된 기간에 대해 연 20%의 지연이자가 발생해요. 고용노동부(1350)에 진정을 넣으면 사업주는 형사처벌(3년 이하 징역 또는 3,000만원 이하 벌금) 대상이 될 수 있죠. 임금체불 진정은 퇴직일로부터 3년 이내에 가능해요.",
  },
  {
    q: "부당해고 구제신청과 퇴직금 청구를 동시에 할 수 있나요?",
    a: "동시에 할 수 있죠. 부당해고 구제신청은 노동위원회에, 퇴직금 및 해고예고수당 미지급은 고용노동부에 각각 신청하는 거예요. 두 절차는 서로 독립적으로 진행되죠. 복직을 원하면 구제신청을, 금전 보상을 원하면 금전보상명령 신청도 가능하고요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제23조: 해고 등의 제한", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로기준법 제26조: 해고의 예고 (30일)", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로기준법 제27조: 해고 서면 통지 의무", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로자퇴직급여보장법 제9조: 퇴직금 지급", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부: 부당해고 구제신청 안내", url: "https://www.moel.go.kr" },
      { label: "노동위원회: 구제신청 절차", url: "https://www.nlrc.go.kr" },
      { label: "고용24: 실업급여 신청", url: "https://www.work24.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-지급-기한", title: "퇴직금 지급 기한 14일 원칙", description: "해고 후 14일 이내 지급, 지연이자 연 20%." },
  { slug: "퇴직금-미지급-신고", title: "퇴직금 못 받았을 때 신고 방법", description: "고용노동부 진정 절차와 체당금 신청." },
  { slug: "퇴직금-IRP-계좌", title: "IRP 계좌 개설 방법", description: "퇴직금 300만원 초과 시 IRP 필수, 은행별 비교." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} highlightSlugs={퇴직금_HIGHLIGHT} currentSlug="퇴직금-해고" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 해고 · 근로자 권리</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        해고됐는데 퇴직금 받을 수 있을까?<br />
        조건부터 구제신청까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        해고 통보를 받으면 퇴직금도 못 받는 건 아닌지 불안하죠.
        결론부터 말하면, 해고여도 1년 이상 근무했다면 퇴직금은 반드시 받을 수 있죠.
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법</a>이
        해고 사유와 상관없이 퇴직금 지급을 보장하고 있기 때문이에요.
        30일 전 예고 없이 즉시 해고당했다면 해고예고수당까지 추가로 청구할 수 있고,
        부당해고라면 3개월 이내에 노동위원회 구제신청도 가능하죠.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* ── H2-1: 타이틀 질문에 바로 답 (가능형 → GreenBox + EligibilityChecker) ── */}
      <H2>해고 시 받을 수 있는 세 가지, 조건이 뭔가요?</H2>
      <p style={body}>
        해고를 당하면 상황에 따라 퇴직금, 해고예고수당, 실업급여 세 가지를 청구할 수 있죠.
        퇴직금은 1년 이상 근무한 모든 근로자에게 해당되고, 해고 사유는 전혀 관계없죠.
        징계 해고, 권고사직, 정리해고 어느 쪽이든 퇴직금 지급 의무는 그대로예요.
      </p>
      <p style={body}>
        30일 전 예고 없이 당일 또는 수일 내에 해고됐다면 해고예고수당이 추가로 발생하고요.
        이건 30일분 통상임금으로, 퇴직금과 별개로 청구하는 금액이에요.
        <a href="/w/실업급여" style={{ color: "#1D9E75", textDecoration: "underline" }}>실업급여</a>는
        고용보험 피보험기간이 180일 이상이면 해고 직후 신청 가능하죠.
      </p>

      <GreenBox>
        퇴직금: 1년 이상 근무 + 주 15시간 이상이면 해고 사유 무관하게 지급 의무<br />
        해고예고수당: 30일 전 서면 예고 없이 즉시 해고 시 → 30일분 통상임금 추가<br />
        실업급여: 해고는 비자발적 이직 → 고용보험 180일 이상이면 바로 신청 가능
      </GreenBox>

      <p style={body}>
        아래에서 내 상황에 해당하는 항목을 체크해보세요.
        퇴직금만 받을 수 있는 건지, 해고예고수당까지 청구 가능한 건지 바로 알 수 있죠.
      </p>

      <SectionBadge>내 상황 체크</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="퇴직금과 해고예고수당을 모두 청구할 수 있는 상황이에요. 아래 계산기로 예상 금액을 넣어봐요."
        partialMatchText="일부 항목에 따라 받을 수 있는 금액이 달라져요. 고용노동부(1350) 무료 상담을 받아보세요."
      />

      <Divider />

      {/* ── H2-2: 금액 계산 (Calculator) ── */}
      <H2>퇴직금과 해고예고수당, 얼마나 받게 되나요?</H2>
      <p style={body}>
        퇴직금은 30일분 평균임금(퇴직 전 3개월 급여 평균) x 근속연수로 계산해요.
        예를 들어 3년 근무에 월급 300만원이라면 퇴직금은 약 900만원이 되죠.
        해고예고수당은 즉시 해고 시에만 발생하고, 1개월 치 통상임금이에요.
      </p>
      <p style={body}>
        아래 슬라이더로 내 월급과 근속 기간을 조정하면 예상 금액을 바로 볼 수 있죠.
        상여금이나 고정 수당을 포함한 평균임금 기준으로는 실제
        <a href="/w/퇴직금-계산법" style={{ color: "#1D9E75", textDecoration: "underline" }}> 퇴직금 계산 결과</a>가
        더 높게 나올 수 있죠.
      </p>

      <SectionBadge>퇴직금·해고예고수당 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 퇴직금 = 30일분 평균임금 x 근속연수. 해고예고수당 = 30일분 통상임금 (즉시 해고 시만 발생). 상여금 포함 시 실제 금액이 달라질 수 있죠."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* ── H2-3: 서류 (DocTable) ── */}
      <H2>퇴직금 청구에 필요한 서류는 뭔가요?</H2>
      <p style={body}>
        퇴직금 청구에서 가장 중요한 서류는 해고 통보 증거예요.
        회사가 서면으로 해고 통지를 안 했다면 카카오톡, 문자, 이메일이라도 캡처해둬야 하죠.
        이후 부당해고 구제신청까지 이어진다면 이 증거가 핵심 자료가 되거든요.
      </p>
      <p style={body}>
        <a href="/w/퇴직금-IRP-계좌" style={{ color: "#1D9E75", textDecoration: "underline" }}>IRP 계좌</a>는
        퇴직금이 300만원을 넘으면 반드시 필요해요.
        해고 통보를 받은 직후 바로 개설해두면 지급 지연 없이 수령 가능하죠.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      {/* ── H2-4: 절차 (Steps) ── */}
      <H2>해고 후 단계별로 어떻게 움직여야 하나요?</H2>
      <p style={body}>
        해고 통보를 받은 순간부터 시간이 중요해요.
        부당해고라고 생각한다면 구제신청 기한인 3개월을 절대 놓치면 안 되고요.
        퇴직금 청구와 구제신청은 동시에 진행할 수 있으니 한꺼번에 준비하는 게 효율적이에요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      {/* ── H2-5: 놓치기 쉬운 것 (Checklist + GreenBox) ── */}
      <H2>해고 후 놓치기 쉬운 것들</H2>
      <p style={body}>
        퇴직금은 해고 후 14일 이내 지급이 원칙이에요.
        14일이 지났는데도 받지 못했다면
        <a href="/w/퇴직금-지연이자" style={{ color: "#1D9E75", textDecoration: "underline" }}> 지연이자 연 20%</a>를
        추가로 청구할 수 있죠.
        아래 체크리스트로 빠뜨린 것이 없는지 하나씩 짚어보세요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        해고일로부터 3개월이 지나면 노동위원회 구제신청이 완전히 차단돼요.<br />
        퇴직금 청구와 동시에 진행할 수 있으니 부당해고라는 생각이 들면 바로 신청하세요.<br />
        신청은 <a href="https://www.nlrc.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>노동위원회 홈페이지</a>에서 온라인으로 가능해요.
      </GreenBox>

      <p style={body}>
        지금 해고 통보를 받은 상태라면, 먼저 해고 증거를 캡처하고 고용노동부(1350)에 전화해보세요.
        퇴직금 청구와 부당해고 구제 절차를 동시에 안내받을 수 있죠.
      </p>

      <Divider />

      {/* ── FAQ ── */}
      <H2>자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        해고를 당한 분들이 공통으로 궁금해하는 것들만 모았어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법·근로자퇴직급여보장법을 바탕으로 작성됐어요. 제도 변경이 가능하니 최신 기준은 고용노동부(1350)에서 안내받으세요." />
    </ArticleLayout>
  );
}
