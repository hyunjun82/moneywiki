"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직금이 300만원을 초과해요" },
  { id: "c2", label: "연 소득이 있어 연말정산 또는 종합소득세를 내요" },
  { id: "c3", label: "IRP 계좌가 이미 개설돼 있어요" },
  { id: "c4", label: "현재 만 55세 미만이에요" },
];

const CALC_SLIDERS = [
  { id: "deposit", label: "연간 IRP 납입액", min: 0, max: 900, step: 50, defaultValue: 300, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "income", label: "연 소득 구간", min: 1, max: 3, step: 1, defaultValue: 1, format: (v: number) => v === 1 ? "5,500만원 이하" : v === 2 ? "5,500만~1억" : "1억 초과" },
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
    label: "실질 납입 부담 (납입 - 공제)",
    getValue: (v: Record<string, number>) => {
      const rate = v.income === 1 ? 0.165 : 0.132;
      const deduction = Math.round(Math.min(v.deposit * 10000, 9000000) * rate);
      return Math.max(0, v.deposit * 10000 - deduction);
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "신분증", required: true, where: "본인 지참" },
  { name: "기존 금융계좌 (이체용)", required: true, where: "은행 계좌" },
  { name: "공동인증서 또는 간편인증", required: true, where: "앱 또는 금융인증서" },
  { name: "근로소득 원천징수영수증 (세액공제 신청 시)", required: false, where: "회사 인사팀 또는 홈택스" },
];

const STEPS = [
  {
    title: "IRP 계좌 개설",
    desc: "은행·증권사·보험사 앱으로 10분이면 개설할 수 있어요. 수수료가 낮은 증권사 IRP(연 0.2%)를 추천해요. 퇴직금 수령 목적이라면 수수료 0% 원리금보장형도 있어요. 퇴직 전 미리 개설해두세요.",
    tip: "증권사 IRP는 ETF 투자도 가능하고 수수료가 낮아요",
  },
  {
    title: "퇴직금 의무 이전",
    desc: "퇴직금이 300만원을 초과하면 IRP 계좌로만 받을 수 있어요. 2022년 4월 14일부터 의무화됐어요. 회사가 14일 이내에 이체하면 별도 신청 없이 자동으로 들어와요.",
    tip: "IRP 계좌번호를 인사팀에 문자·메일로 알려줘요",
  },
  {
    title: "세액공제용 추가 납입",
    desc: "IRP에 본인이 추가로 납입하면 연말정산에서 세액공제를 받을 수 있어요. 한도는 IRP+연금저축 합산 연 900만원이에요. 소득 5,500만원 이하라면 납입액의 16.5%를 돌려받아요.",
    tip: "연 300만원 납입 시 약 49.5만원 환급",
  },
  {
    title: "연금 수령으로 절세",
    desc: "55세 이후 IRP에서 연금으로 받으면 퇴직소득세의 30%를 줄일 수 있어요. 일시금으로 받으면 세금이 더 많고, 연금은 분할 수령이라 부담도 적어요. 10년 이상 수령하면 세율이 더 낮아져요.",
    tip: "IRP로 받은 뒤 바로 인출하는 것보다 연금이 유리해요",
  },
];

const CHECKLIST = [
  "IRP 의무 이전: 300만원 초과 시 (2022년 4월 14일 기준)",
  "세액공제 한도: 연 900만원 (IRP+연금저축 합산)",
  "세액공제율: 5,500만원 이하 16.5% / 초과 13.2%",
  "추가 납입: 연 1,800만원까지 납입 가능",
  "연금 수령: 55세 이후, 퇴직소득세 30% 절감",
];

const FAQS = [
  {
    q: "IRP 의무 이전 기준인 300만원은 세전인가요?",
    a: "세전 퇴직금 기준이에요. 퇴직소득세를 공제하기 전 금액이 300만원을 초과하면 IRP로만 받아야 해요.",
  },
  {
    q: "IRP 세액공제는 퇴직금과 별개인가요?",
    a: "별개예요. 세액공제는 본인이 추가로 납입한 금액에 대해서만 적용돼요. 회사가 이전한 퇴직금은 납입 한도에 포함되지 않아요.",
  },
  {
    q: "IRP에 납입했는데 중도 해지하면 어떻게 되나요?",
    a: "세액공제 받은 금액에 기타소득세(16.5%)가 부과돼요. 이미 공제받은 세금을 뱉어내는 개념이에요. 부득이한 경우가 아니라면 중도 해지는 손해예요.",
  },
  {
    q: "연금저축과 IRP를 함께 납입할 수 있나요?",
    a: "가능해요. 두 계좌 합산 연 900만원까지 세액공제를 받을 수 있어요. IRP 단독으로는 최대 900만원, 연금저축 단독으로는 최대 600만원이에요.",
  },
  {
    q: "IRP를 55세 이전에 해지하면 어떤 세금이 부과되나요?",
    a: "55세 미만 중도 해지 시 퇴직소득세 + 기타소득세(16.5%)가 부과될 수 있어요. 퇴직금 이전분은 퇴직소득세만 적용돼요. 세금 부담이 크니 해지 전 꼭 확인하세요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법: IRP 계좌 의무 이전", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "소득세법 제59조의3: IRP 세액공제", url: "https://www.law.go.kr/법령/소득세법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "금융감독원: IRP 세액공제 안내", url: "https://www.fss.or.kr" },
      { label: "국세청: 연금계좌 세액공제 한도", url: "https://www.nts.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-IRP-계좌", title: "IRP 계좌 개설 방법", description: "은행·증권사 비교부터 개설까지." },
  { slug: "퇴직금-IRP-수령방법", title: "퇴직금 IRP 수령 절차", description: "계좌 개설 후 이체까지 4단계." },
  { slug: "퇴직금-세금", title: "퇴직금 세금, 얼마나 떼나요?", description: "퇴직소득세와 절세 방법." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-IRP-이전-의무가입-세액공제-혜택" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · IRP · 의무이전·세액공제</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 IRP 의무 이전과 세액공제 혜택<br />
        연 최대 148.5만원 돌려받는 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금 300만원 초과 시 <a href="/w/퇴직금-IRP-계좌" style={{ color: "#1D9E75", textDecoration: "underline" }}>IRP 계좌</a>로만 받아야 해요. 2022년 4월 14일부터 의무화된 제도예요.
        여기에 본인이 추가로 납입하면 연말정산에서 세액공제까지 받을 수 있어요.
        <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법 제59조의3</a>에 따라 연 900만원 한도 내에서 최대 16.5%를 돌려받아요.
        55세 이후 연금으로 받으면 <a href="/w/퇴직금-세금" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직소득세</a>도 30% 절감돼요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>IRP 의무 이전, 왜 생겼나요?</H2>
      <p style={body}>
        2022년 4월 14일부터 퇴직금이 300만원을 초과하면 반드시 IRP 계좌로만 수령해야 해요.
        이전에는 일반 계좌로도 받을 수 있었지만, 노후 자산 보호를 위해 의무화됐어요.
        IRP로 받으면 바로 해지해서 인출하는 것도 가능하지만, 그럴 경우 퇴직소득세가 부과돼요.
      </p>
      <p style={body}>
        IRP 계좌를 유지하면서 본인이 추가로 돈을 납입하면 세액공제 혜택까지 받을 수 있어요.
        연금저축과 합산해 연 900만원 한도 내에서, 소득 5,500만원 이하라면 납입액의 16.5%를 돌려받아요.
        연 300만원을 납입하면 약 49.5만원이 환급돼요.
      </p>

      <GreenBox title="IRP 두 가지 혜택">
        ① 의무 이전: 퇴직금 300만원 초과 시 IRP로만 수령<br />
        ② 세액공제: 추가 납입액의 최대 16.5% 환급<br />
        ③ 절세: 55세 이후 연금 수령 시 퇴직소득세 30% 감면
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="IRP 세액공제 혜택을 받을 수 있어요. 아래 계산기로 환급액을 확인해보세요."
        partialMatchText="상황에 따라 다를 수 있어요. 금융감독원(1332) 또는 국세청(126) 상담을 권해요."
      />

      <Divider />

      <H2>납입액 기준 세액공제 환급액 계산</H2>
      <p style={body}>
        연간 IRP 납입액과 소득 구간을 선택하면 예상 환급액을 바로 확인할 수 있어요.
        한도는 IRP+연금저축 합산 900만원이에요.
        퇴직금 이전분은 이 한도에 포함되지 않아요.
      </p>

      <SectionBadge>IRP 세액공제 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ IRP+연금저축 합산 최대 900만원 세액공제. 소득 5,500만원 이하 16.5%, 초과 13.2% 기준 (소득세법 제59조의3)."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>IRP 개설 및 세액공제 신청 서류</H2>
      <p style={body}>
        개설 자체는 신분증과 인증서만 있으면 돼요.
        세액공제 신청은 연말정산 시 IRP 납입 확인서를 제출하면 돼요.
        회사 인사팀을 통하거나 홈택스에서 직접 신청할 수 있어요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>IRP 활용 절차 4단계</H2>
      <p style={body}>
        개설부터 세액공제 수령까지 단계별로 진행하면 돼요.
        연금 수령까지 계획하면 세금을 두 번 줄일 수 있어요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>IRP 활용 체크리스트</H2>
      <p style={body}>
        세액공제 한도와 납입 상한을 함께 챙기면 절세 효과가 극대화돼요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="IRP 하나로 두 가지 세금 혜택을 챙겨요">
        추가 납입으로 세액공제를 받고, 55세 이후 연금으로 받으면 퇴직소득세도 줄어요.
        IRP를 잘 활용하면 수백만 원을 아낄 수 있어요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        IRP 의무 이전과 세액공제에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법과 소득세법을 바탕으로 작성됐어요. 세액공제율은 소득에 따라 다르니 최신 기준은 국세청(126)에서 확인하세요." />
    </ArticleLayout>
  );
}
