"use client";

// Q1. 퇴직을 앞두거나 퇴직 직후인 사람이 "퇴직금 IRP 의무 이전이 뭔지, 세액공제는 어떻게 받는지" 검색한 상황
// Q2. IRP 계좌를 개설하고, 퇴직금을 이전한 뒤, 추가 납입으로 연말정산 세액공제까지 신청하는 것
// Q3. 의무 이전 기준(300만원 초과), 세액공제율(16.5%/13.2%), 한도(900만원), 절차(개설→이전→납입→연말정산), 중도 해지 불이익
// Q4. EligibilityChecker(대상 체크) + Calculator(환급액 계산) + Steps(절차) + Checklist(주의사항) + FAQ
//
// MAP:
// - Q1 → 서론: 퇴직금 받을 때 IRP 의무라는데 세액공제도 된다고? 혼란스러운 상황 공감
// - Q2 → H2 순서: 대상 확인 → 환급액 계산 → 절차 → 주의사항
// - Q3 → H2 4개 + FAQ
// - Q4 → EligibilityChecker, Calculator, Steps+DocTable, Checklist+GreenBox
//

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR, 퇴직금_HIGHLIGHT } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직금이 300만원을 초과했어요" },
  { id: "c2", label: "근로소득 또는 사업소득이 있어 연말정산·종합소득세를 내요" },
  { id: "c3", label: "현재 만 55세 미만이에요" },
  { id: "c4", label: "IRP 또는 연금저축 계좌를 개설했어요" },
];

const CALC_SLIDERS = [
  {
    id: "deposit",
    label: "연간 IRP 추가 납입액",
    min: 0,
    max: 900,
    step: 50,
    defaultValue: 300,
    format: (v: number) => `${v.toLocaleString()}만원`,
  },
  {
    id: "income",
    label: "총급여 구간",
    min: 1,
    max: 2,
    step: 1,
    defaultValue: 1,
    format: (v: number) => v === 1 ? "5,500만원 이하 (16.5%)" : "5,500만원 초과 (13.2%)",
  },
];

const CALC_RESULTS = [
  {
    label: "세액공제 환급액",
    getValue: (v: Record<string, number>) => {
      const rate = v.income === 1 ? 0.165 : 0.132;
      return Math.round(Math.min(v.deposit * 10000, 9000000) * rate);
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "실제 납입 부담 (납입액 - 환급)",
    getValue: (v: Record<string, number>) => {
      const rate = v.income === 1 ? 0.165 : 0.132;
      const refund = Math.round(Math.min(v.deposit * 10000, 9000000) * rate);
      return Math.max(0, v.deposit * 10000 - refund);
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "신분증 (주민등록증 또는 운전면허증)", required: true, where: "본인 지참" },
  { name: "공동인증서 또는 간편인증", required: true, where: "앱 또는 금융인증서" },
  { name: "연금저축·IRP 납입 확인서", required: true, where: "IRP 금융기관 발급" },
  { name: "근로소득 원천징수영수증", required: false, where: "회사 인사팀 또는 홈택스" },
];

const STEPS = [
  {
    title: "IRP 계좌 개설",
    desc: "은행·증권사·보험사 앱으로 10분이면 개설이 끝나요. 수수료가 낮은 증권사 IRP(연 0.2% 수준)를 많이 쓰죠. 퇴직금 수령만 목적이라면 수수료 0% 원리금보장형도 괜찮아요. 퇴직 전 미리 개설해두면 회사가 바로 이체해줘요.",
    tip: "증권사 IRP는 ETF 투자까지 가능하고 수수료가 낮아요",
  },
  {
    title: "퇴직금 IRP 이전 (의무)",
    desc: "퇴직금이 300만원을 초과하면 반드시 IRP 계좌로만 수령해야 해요. 2022년 4월 14일부터 의무화됐어요. 회사가 퇴직 후 14일 이내에 자동 이체하니 IRP 계좌번호만 인사팀에 알려주면 돼요.",
    tip: "퇴직 전 IRP 계좌번호를 문자·메일로 인사팀에 보내두세요",
  },
  {
    title: "세액공제용 추가 납입",
    desc: "IRP에 본인이 직접 추가로 납입하면 연말정산에서 세액공제를 받아요. 한도는 IRP+연금저축 합산 연 900만원이에요. 납입액의 16.5%(총급여 5,500만원 이하) 또는 13.2%(초과)를 돌려받아요. 연금저축이 있다면 두 계좌 납입액 합산 기준이에요.",
    tip: "12월 31일 이전 납입분까지 당해 연도 공제 적용돼요",
  },
  {
    title: "연말정산으로 세액공제 신청",
    desc: "연말정산 시 IRP 납입 확인서를 제출하면 세액공제가 적용돼요. 홈택스 간소화 서비스에서 자동 반영되는 경우도 많죠. 회사 인사팀에 확인서를 제출하거나 직접 홈택스에서 신청하면 돼요.",
    tip: "금융기관 앱에서 납입 확인서를 바로 발급받을 수 있죠",
    link: { label: "홈택스 연말정산 바로가기", href: "https://www.hometax.go.kr" },
  },
];

const CHECKLIST = [
  "IRP 의무 이전 조건: 퇴직금 세전 300만원 초과 시 필수",
  "세액공제 한도: IRP+연금저축 합산 연 900만원",
  "공제율: 총급여 5,500만원 이하 16.5% / 초과 13.2%",
  "추가 납입 상한: 연 1,800만원 (세액공제 한도와 별개)",
  "연금 수령 조건: 만 55세 이후, 가입 5년 이상",
  "중도 해지 시 기타소득세 16.5% 추가 부과",
  "55세 이후 연금 수령 시 퇴직소득세 30% 절감",
];

const FAQS = [
  {
    q: "IRP 의무 이전 기준 300만원은 세전인가요?",
    a: "세전 퇴직금 기준이에요. 퇴직소득세를 공제하기 전 금액이 300만원을 초과하면 IRP로만 받아야 하죠. 300만원 이하라면 일반 계좌로 수령하는 것도 가능해요.",
  },
  {
    q: "회사가 이전한 퇴직금도 세액공제 대상인가요?",
    a: "아니에요. 세액공제는 본인이 추가로 납입한 금액에만 적용돼요. 회사가 이전한 퇴직금은 세액공제 납입 한도에 포함되지 않아요. 두 금액은 완전히 별개 취급이에요.",
  },
  {
    q: "연금저축 계좌가 있으면 IRP 세액공제 한도가 줄어드나요?",
    a: "두 계좌 합산 한도가 연 900만원이에요. 연금저축에 600만원을 넣었다면 IRP는 300만원까지 세액공제가 되죠. IRP 단독으로는 최대 900만원까지 공제 가능해요.",
  },
  {
    q: "IRP를 중도 해지하면 세금이 어떻게 되나요?",
    a: "세액공제 받은 금액에 기타소득세 16.5%가 부과돼요. 이미 돌려받은 세금을 다시 내는 구조예요. 특별한 사정이 없다면 중도 해지는 손해죠.",
  },
  {
    q: "55세 이후 연금으로 받으면 세금이 얼마나 줄어요?",
    a: "IRP에서 연금으로 수령하면 퇴직소득세의 30%(10년 초과 시 40%)를 감면해줘요. 일시금으로 받는 것보다 훨씬 유리하죠. 연간 수령액 1,500만원 이하라면 연금소득세율도 낮아요.",
  },
  {
    q: "자영업자도 IRP 세액공제를 받을 수 있나요?",
    a: "가능해요. 자영업자도 IRP에 납입하고 종합소득세 신고 시 세액공제를 적용하죠. 납입 한도와 공제율은 근로자와 동일해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법: IRP 계좌 의무 이전", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "소득세법 제59조의3: 연금계좌 세액공제", url: "https://www.law.go.kr/법령/소득세법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "국세청: 연금계좌 세액공제 한도 안내", url: "https://www.nts.go.kr" },
      { label: "금융감독원: IRP 세액공제 제도 안내", url: "https://www.fss.or.kr" },
      { label: "고용노동부: 퇴직연금 IRP 의무 이전", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-IRP-계좌", title: "IRP 계좌 개설 방법", description: "은행·증권사 비교부터 개설 절차까지." },
  { slug: "퇴직금-세금-절세-방법-IRP-연말정산", title: "퇴직금 절세 방법", description: "IRP 이전으로 세금 줄이는 구체적인 방법." },
  { slug: "irp-계좌-퇴직금-수령방법", title: "IRP 계좌로 퇴직금 받는 법", description: "개설 후 이체·수령까지 단계별 안내." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} highlightSlugs={퇴직금_HIGHLIGHT} currentSlug="퇴직금-IRP-이전-의무가입-세액공제-혜택" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · IRP · 세액공제</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 IRP 의무 이전, 세액공제까지<br />
        받는 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금 300만원 넘으면 <a href="/w/퇴직금-IRP-계좌" style={{ color: "#1D9E75", textDecoration: "underline" }}>IRP 계좌</a>로만 받아야 해요.
        2022년 4월부터 의무화된 제도인데, 많은 분이 "그냥 통장으로 못 받나?" 하고 당황하죠.
        그런데 이 의무 이전이 오히려 기회예요.
        본인이 추가로 납입하면 <a href="/w/퇴직금-세금-절세-방법-IRP-연말정산" style={{ color: "#1D9E75", textDecoration: "underline" }}>연말정산 세액공제</a>까지 챙길 수 있죠.
        <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법 제59조의3</a>에 따라 연 900만원 한도로 최대 148.5만원을 돌려받아요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* ── H2-1: 대상 확인 (가능형 → GreenBox + EligibilityChecker) ── */}
      <H2>내가 IRP 의무 이전 대상인지 체크</H2>
      <p style={body}>
        퇴직금을 받게 됐는데 IRP로 꼭 옮겨야 하는 건지 헷갈리죠.
        기준은 단순해요 세전 퇴직금이 300만원을 넘으면 의무 이전 대상이에요.
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법</a>에 따라 2022년 4월 14일부터 시행됐어요.
      </p>
      <p style={body}>
        의무 이전과 세액공제는 별개 혜택이에요.
        퇴직금이 IRP로 들어오면 과세 이연(세금을 나중에 내는 것)이 자동 적용되고, 여기에 본인 돈을 추가로 넣으면 세액공제까지 받죠.
        세액공제는 소득이 있어야 적용되니 근로자든 자영업자든 소득세를 내는 사람이어야 해요.
      </p>

      <GreenBox>
        ① 과세 이연: 퇴직금 이전 시 세금을 당장 내지 않아요<br />
        ② 세액공제: 추가 납입액의 최대 16.5% 환급 (연 900만원 한도)<br />
        ③ 절세: 55세 이후 연금 수령 시 퇴직소득세 30% 감면
      </GreenBox>

      <SectionBadge>내 상황 체크해봐요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="IRP 세액공제 혜택 조건을 갖추고 있죠. 아래 계산기로 예상 환급액을 계산해봐요."
        partialMatchText="일부 조건이 다를 수 있죠. 국세청(126) 또는 금융감독원(1332)에 문의해봐요."
      />

      <p style={body}>
        4개 항목 전부 해당된다면 의무 이전과 세액공제를 동시에 챙길 수 있죠.
        일부만 해당돼도 퇴직금 과세 이연 혜택은 그대로 적용되니 IRP 개설 자체는 손해가 아니에요.
      </p>

      <Divider />

      {/* ── H2-2: 환급액 계산 (Calculator 기존 로직 불변) ── */}
      <H2>납입하면 얼마나 돌려받을까?</H2>
      <p style={body}>
        "IRP에 얼마를 넣으면 세금을 얼마나 아끼는 건지" 이게 핵심이죠.
        총급여 5,500만원 이하라면 납입액의 16.5%, 초과라면 13.2%를 환급받아요.
        연 900만원 한도까지 넣으면 최대 148.5만원(16.5% 기준)을 돌려받는 구조예요.
      </p>
      <p style={body}>
        주의할 점이 하나 있죠.
        회사가 이전한 퇴직금은 세액공제 한도에 포함되지 않아요.
        세액공제 한도 900만원은 본인이 추가로 납입한 금액 기준이에요.
        연금저축에 이미 납입한 금액이 있다면 두 계좌 합산이니 IRP에 넣을 수 있는 공제 한도가 줄어드는 점도 기억해둬요.
      </p>

      <SectionBadge>IRP 세액공제 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ IRP+연금저축 합산 최대 900만원 공제. 총급여 5,500만원 이하 16.5%, 초과 13.2% 기준 (소득세법 제59조의3)."
      />

      <p style={body}>
        계산 결과를 보면 감이 오죠.
        연 300만원만 넣어도 49.5만원(16.5% 기준)을 돌려받으니, 안 넣는 게 오히려 손해예요.
      </p>

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      {/* ── H2-3: 절차 (Steps + DocTable) ── */}
      <H2>IRP 개설부터 세액공제 신청까지 절차</H2>
      <p style={body}>
        "IRP가 좋다는 건 알겠는데 뭐부터 하면 되죠?" 이런 분이 많아요.
        개설부터 환급까지 딱 4단계예요.
        퇴직 전에 IRP를 미리 개설해두면 회사에서 바로 이체해주니 절차가 훨씬 빨라지죠.
      </p>

      <Steps steps={STEPS} />

      <p style={body}>
        추가 납입은 연중 언제든 가능하고, 12월 31일까지 넣은 금액이 당해 연도 공제에 적용돼요.
        연말에 몰아서 넣어도 되니 부담 없이 계획을 세워봐요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <p style={body}>
        IRP 계좌 개설은 신분증과 인증서만 있으면 앱으로 10분이면 끝나요.
        세액공제 신청 서류는 홈택스 간소화 서비스에서 자동으로 불러와지는 경우가 많으니 따로 준비할 게 거의 없죠.
      </p>

      <Divider />

      {/* ── H2-4: 주의사항 (Checklist + GreenBox) ── */}
      <H2>중도 해지하면 어떻게 될까?</H2>
      <p style={body}>
        IRP는 장기 운용 상품이에요.
        세액공제를 받은 뒤 중도 해지하면 돌려받은 세금을 다시 뱉어야 하죠 기타소득세 16.5%가 부과돼요.
        납입 전에 내 소득 구간과 연금저축 납입액을 먼저 파악하는 게 중요해요.
      </p>
      <p style={body}>
        반대로, 55세 이후 연금으로 수령하면 <a href="/w/퇴직금-세금" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직소득세</a>의 30%(10년 초과 시 40%)를 감면받아요.
        일시금으로 한 번에 받는 것보다 연금으로 나눠 받는 게 세금 면에서 훨씬 유리한 구조예요.
        연간 수령액 1,500만원 이하라면 연금소득세율도 낮게 적용되죠.
      </p>

      <SectionBadge>IRP 활용 전 점검 항목</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        연금저축 납입액이 있다면 두 계좌 합산 900만원 한도를 초과하지 않도록 조정해야 해요.
        초과 납입분은 세액공제 없이 그냥 넣은 것과 같아요.
      </GreenBox>

      <p style={body}>
        지금 퇴직을 앞두고 있다면 IRP 계좌부터 개설해두세요.
        퇴직금 이전은 의무이니 어차피 만들어야 하고, 추가 납입으로 세액공제까지 받으면 연 최대 148.5만원을 돌려받을 수 있죠.
      </p>

      <Divider />

      {/* ── H2-5: FAQ ── */}
      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        IRP 의무 이전과 세액공제에 대해 실제로 자주 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법과 소득세법을 바탕으로 작성됐어요. 세액공제율은 소득에 따라 다르니 최신 기준은 국세청(126)에서 문의해봐요." />
    </ArticleLayout>
  );
}
