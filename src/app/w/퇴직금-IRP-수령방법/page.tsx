"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직금이 300만원을 초과해요" },
  { id: "c2", label: "IRP 계좌가 아직 없어요" },
  { id: "c3", label: "퇴직 확정이 됐어요 (또는 이미 퇴직했어요)" },
  { id: "c4", label: "퇴직금을 아직 받지 못했어요" },
];

const CALC_SLIDERS = [
  { id: "amount", label: "퇴직금 총액", min: 300, max: 10000, step: 100, defaultValue: 3000, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "years", label: "근속 기간", min: 1, max: 35, step: 1, defaultValue: 10, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "IRP 연금 수령 시 절세액 (30% 감면)",
    getValue: (v: Record<string, number>) => {
      const tax = Math.round(v.amount * 10000 * 0.06 * (1 - Math.min(v.years, 30) * 0.015));
      return Math.round(tax * 0.3);
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "일시금 수령 시 퇴직소득세 (추정)",
    getValue: (v: Record<string, number>) => Math.round(v.amount * 10000 * 0.06 * (1 - Math.min(v.years, 30) * 0.015)),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "신분증", required: true, where: "본인 지참" },
  { name: "IRP 계좌 정보 (계좌번호)", required: true, where: "IRP 개설 금융기관" },
  { name: "퇴직확인서 또는 사직서", required: true, where: "회사 인사팀" },
  { name: "급여명세서 (최근 3개월)", required: false, where: "회사 인사팀 요청" },
];

const STEPS = [
  {
    title: "IRP 계좌 개설",
    desc: "퇴직 전에 미리 개설해두는 게 좋아요. 은행, 증권사, 보험사 앱에서 10분 안에 만들 수 있어요. 수수료가 낮은 곳(증권사 0.2% 수준)을 비교해서 선택하면 유리해요.",
    tip: "퇴직금 수령용은 은행보다 증권사 IRP 수수료가 낮은 경우가 많아요",
  },
  {
    title: "회사 인사팀에 IRP 계좌번호 통보",
    desc: "퇴직 확정 후 IRP 계좌번호를 인사팀에 알려줘야 해요. 회사는 이 계좌로 14일 이내에 퇴직금을 이체해야 해요. 구두보다 문자·메일로 남겨두는 게 증거로 좋아요.",
    tip: "300만원 초과 퇴직금은 IRP 이외 계좌로는 이체 자체가 불가해요",
  },
  {
    title: "이체 확인 (14일 이내)",
    desc: "퇴직 후 14일 이내에 IRP 계좌로 입금됐는지 확인해요. 안 들어왔다면 인사팀에 먼저 확인하고, 그래도 안 되면 고용노동부(1350)에 신고할 수 있어요.",
    tip: "IRP 앱 알림 설정 켜두면 입금 시 즉시 확인 가능해요",
  },
  {
    title: "연금 또는 일시금 선택",
    desc: "55세 이전이면 일시금만 가능해요. 55세 이후엔 연금으로 10년 이상 나눠 받으면 퇴직소득세의 30%를 감면받아요. 연금 수령이 세금 면에서 훨씬 유리해요.",
    tip: "연금 수령 시 퇴직소득세 30% 감면 — 오래 둘수록 이득이에요",
  },
];

const CHECKLIST = [
  "IRP 계좌: 퇴직 전에 미리 개설",
  "계좌번호: 인사팀에 문자·메일로 통보",
  "14일 이내 입금 확인: 안 오면 즉시 연락",
  "연금 vs 일시금: 55세 이후라면 연금이 세금 유리",
  "수수료 비교: 증권사 IRP가 은행보다 낮은 경우 많음",
];

const FAQS = [
  {
    q: "퇴직금 300만원 이하면 IRP 없이도 받을 수 있나요?",
    a: "받을 수 있어요. 300만원 이하는 본인 명의 일반 계좌로도 받을 수 있어요. 하지만 IRP로 받으면 연금 전환 후 세금 혜택이 있어요.",
  },
  {
    q: "IRP 계좌를 어디서 만드는 게 좋나요?",
    a: "수수료를 비교하는 게 먼저예요. 증권사(미래에셋, 삼성증권 등)는 0.2% 수준, 은행은 0.3~0.5% 수준이에요. 퇴직금 규모가 크면 수수료 차이가 커져요.",
  },
  {
    q: "IRP에서 바로 꺼내면 세금이 어떻게 되나요?",
    a: "55세 이전에 중도 인출하면 기타소득세 16.5%가 원금에서 부과돼요. 퇴직소득세와 별도로 세금이 붙는 구조라 손해가 커요. 55세 이후 연금 수령을 권해요.",
  },
  {
    q: "회사가 IRP가 아닌 다른 계좌로 보냈으면?",
    a: "300만원 초과 퇴직금을 IRP 아닌 계좌로 보내면 회사가 위법이에요. 고용노동부에 신고하거나, 잘못 이체된 금액을 IRP로 다시 이체하도록 요청하면 돼요.",
  },
  {
    q: "퇴직금을 IRP에 넣고 운용하면 수익도 생기나요?",
    a: "IRP 안에서 ETF, 펀드, 예금 등을 선택해서 운용할 수 있어요. 운용 수익은 연금 수령 시까지 과세가 이연돼요. 장기 운용할수록 유리해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 제9조: 퇴직금 IRP 이전 의무", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "소득세법 제22조: 퇴직소득세 감면 규정", url: "https://www.law.go.kr/법령/소득세법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "금융감독원: IRP 가입 및 수령 안내", url: "https://www.fss.or.kr" },
      { label: "고용노동부: 퇴직급여 제도 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-수령방법", title: "퇴직금 수령 방법 전체 정리", description: "일시금·연금 비교부터 절차까지." },
  { slug: "퇴직금-IRP-계좌", title: "퇴직금 IRP 계좌 개설 방법", description: "어디서 만드는 게 유리한지 비교해요." },
  { slug: "퇴직금-세금", title: "퇴직금 세금, 얼마나 떼나요?", description: "IRP 절세 효과까지 계산해요." },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-IRP-수령방법" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · IRP · 수령방법</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 IRP 수령 방법, 어떻게 받나요?<br />
        계좌 개설부터 연금·일시금 선택까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금이 300만원을 초과하면 IRP(개인형 퇴직연금) 계좌로만 받을 수 있어요.
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법 제9조</a>에서
        정한 의무라 회사가 마음대로 일반 계좌로 보낼 수 없어요.
        IRP 계좌를 미리 만들어두고 계좌번호를 회사에 알려주면 14일 이내에 이체돼요.
        <a href="/w/퇴직금-세금" style={{ color: "#1D9E75", textDecoration: "underline" }}>세금 절약</a>도
        IRP에서 연금으로 받을 때 가장 유리하죠.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>IRP로 퇴직금을 받아야 하는 상황인가요?</H2>
      <p style={body}>
        퇴직금이 300만원을 초과하면 IRP 계좌가 없으면 받을 수가 없어요.
        2022년 4월부터 의무화된 제도라 예외가 없어요. IRP 계좌가 없으면 회사가 이체 자체를 못 하거든요.
        퇴직 전에 미리 만들어두는 게 가장 좋아요.
      </p>
      <p style={body}>
        IRP 계좌에 들어온 퇴직금은 55세 이후에 연금으로 받을 수도 있고, 조건 없이 일시금으로 꺼낼 수도 있어요.
        단, 55세 이전에 꺼내면 기타소득세 16.5%가 추가로 부과되니 주의하세요.
      </p>

      <GreenBox title="IRP 수령 핵심 3가지">
        퇴직금 300만원 초과 → IRP 계좌 필수<br />
        퇴직 전 IRP 개설 → 계좌번호 인사팀 통보<br />
        55세 이후 연금 수령 → 퇴직소득세 30% 감면
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="IRP 계좌 개설이 필요해요. 아래 세금 절세액을 먼저 확인해보세요."
        partialMatchText="상황에 따라 다를 수 있어요. 아래 절차를 참고하거나 금융감독원(1332)에 상담하세요."
      />

      <Divider />

      <H2>연금 vs 일시금, 세금 차이가 얼마나 나나요?</H2>
      <p style={body}>
        IRP로 받은 퇴직금을 55세 이후에 연금으로 10년 이상 분산 수령하면 퇴직소득세의 30%를 감면받아요.
        퇴직금이 크고 근속기간이 짧을수록 절세 효과가 커요.
      </p>
      <p style={body}>
        퇴직소득세 추정액과 절세액을 비교해서 연금 수령이 얼마나 유리한지 아래에서 바로 확인해보세요.
      </p>

      <SectionBadge>IRP 절세 효과 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 연금 선택 시 퇴직소득세 30% 감면 기준. 실제 세금은 근속연수공제 적용 후 달라질 수 있어요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>IRP 수령에 필요한 서류</H2>
      <p style={body}>
        IRP 개설은 신분증 하나로도 가능해요. 퇴직 후 이체 시 회사가 퇴직확인서를 첨부하기도 해요.
        IRP 계좌번호를 회사에 전달하는 것만 잘 해두면 나머지는 회사가 처리해요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>IRP 퇴직금 수령 절차 4단계</H2>
      <p style={body}>
        미리 IRP를 만들어두면 퇴직 후 절차가 훨씬 간단해요.
        인사팀에 계좌번호를 통보하고, 14일 이내 입금을 확인하면 끝이에요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>IRP 수령 체크리스트</H2>
      <p style={body}>
        수수료와 연금 선택 시점이 가장 중요해요. 놓치면 세금과 수수료 모두 손해예요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="IRP 연금 수령, 오래 둘수록 이득이에요">
        퇴직금을 IRP에 넣어두고 55세부터 연금으로 받으면 세금이 30% 줄어요.<br />
        지금 당장 꺼내는 것보다 수백만 원 차이가 날 수 있어요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        IRP 퇴직금 수령에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법과 소득세법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 금융감독원(1332) 또는 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
