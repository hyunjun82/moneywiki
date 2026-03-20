"use client";

import {
  H2, SectionBadge, GreenBox, Divider, body,
  Calculator, Steps, DocTable, Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR, 퇴직금_HIGHLIGHT } from "@/data/퇴직금-guide";

// ─── 데이터 (변경 없음) ──────────────────────────────

const CALC_SLIDERS = [
  { id: "amount", label: "퇴직금 총액", min: 300, max: 20000, step: 100, defaultValue: 3000, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "years", label: "연금 수령 기간", min: 10, max: 30, step: 1, defaultValue: 10, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "연금 연간 수령액",
    getValue: (v: Record<string, number>) => Math.round(v.amount * 10000 / v.years),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "IRP 연금 절세 금액 (30% 감면 기준)",
    getValue: (v: Record<string, number>) => {
      const estTax = Math.round(v.amount * 10000 * 0.07);
      return Math.round(estTax * 0.30);
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "IRP 계좌 (300만원 초과 시 의무)", required: true, where: "은행·증권사·보험사 어디서나 개설" },
  { name: "신분증 (주민등록증 또는 운전면허증)", required: true, where: "IRP 개설 및 본인 확인 시 지참" },
  { name: "퇴직소득원천징수영수증", required: true, where: "퇴직 시 회사에서 발급" },
  { name: "퇴직연금 적립금 확인서", required: false, where: "DB형: 회사 / DC형: 금융기관" },
];

const STEPS = [
  {
    title: "IRP 계좌 개설",
    desc: "퇴직 전에 미리 IRP 계좌를 열어두는 게 좋아요. 300만원 초과 퇴직금은 IRP로만 받을 수 있고, 퇴직 후 14일 이내에 이체돼요. 은행·증권사·보험사 어디서나 개설할 수 있고, 수수료가 낮은 증권사 IRP를 비교해보는 게 유리하죠.",
    tip: "퇴직 후 개설해도 되지만, 미리 해두면 이체가 빨라요",
  },
  {
    title: "회사에 IRP 계좌 정보 전달",
    desc: "IRP 계좌번호와 금융기관 정보를 인사팀에 전달해요. 회사는 퇴직일로부터 14일 이내에 해당 계좌로 이체해야 하죠. 문자나 메일로 전달해두면 나중에 증거가 돼요.",
    tip: "이체 확인은 IRP 앱 또는 금융기관 앱에서 바로 가능해요",
  },
  {
    title: "일시금 vs 연금 선택",
    desc: "IRP에 들어온 퇴직금을 일시금으로 찾거나 연금으로 분할 수령할 수 있어요. 연금으로 10년 이상 받으면 퇴직소득세의 30~40%를 감면해주죠. 일시금은 즉시 사용 가능하지만 세금이 더 많아요.",
    tip: "55세 이후, 10년 이상 분할 수령이 최대 절세 조합이에요",
  },
  {
    title: "연금 개시 신청",
    desc: "55세 이후 금융기관 앱이나 지점에서 연금 개시를 신청해요. 연금 수령 개시 후 IRP에서 정기적으로 입금돼요. 퇴직소득세의 60~70%만 내게 되고, 나머지 30~40%는 절세되죠.",
    tip: "연금 개시 전 IRP 내 투자 상품 운용도 할 수 있어요",
  },
];

const CHECKLIST = [
  "IRP 계좌: 퇴직 전 미리 개설해두기 (퇴직 후에도 가능)",
  "퇴직금 규모: 300만원 초과 여부로 IRP 의무 해당 여부 판단",
  "나이: 만 55세 이상이면 일반 계좌 수령 가능",
  "일시금 vs 연금: 퇴직소득세 차이 비교 후 결정",
  "퇴직소득원천징수영수증: 회사에서 반드시 받아두기",
  "14일 이내 미이체 시: 지연이자(연 20%) 청구 가능",
];

const FAQS = [
  {
    q: "퇴직금을 꼭 IRP로 받아야 하나요?",
    a: "2022년 4월부터 원칙적으로 IRP로 지급해요. 다만 만 55세 이상이거나 퇴직금이 300만원 이하거나, 외국인이 귀국하는 경우라면 일반 계좌로도 받을 수 있죠.",
  },
  {
    q: "IRP에 넣으면 돈을 바로 못 꺼내나요?",
    a: "중도인출은 제한돼요. 주택 구입, 전세 보증금, 의료비 등 법정 사유에 해당해야 가능하죠. 55세 이후에는 자유롭게 인출할 수 있어요.",
  },
  {
    q: "IRP 수수료가 얼마나 되나요?",
    a: "금융기관마다 달라요. 연간 운용보수 기준 0.1~0.5% 수준이죠. 은행보다 증권사 IRP가 수수료가 낮은 경우가 많아요.",
  },
  {
    q: "연금 수령 기간을 얼마로 해야 가장 절세가 되나요?",
    a: "10년 이상이면 퇴직소득세 30% 감면돼요. 10년을 초과하면 40% 감면으로 더 높아지죠. 보통 10~20년으로 설정하는 경우가 많아요.",
  },
  {
    q: "DB형 퇴직금과 DC형 퇴직금의 수령 방법이 다른가요?",
    a: "퇴직 후 IRP로 이체되는 방식은 동일해요. DB형은 회사가 운용하고 퇴직 시 확정된 금액을 이체하고, DC형은 내 계좌로 적립된 금액 그대로 이전되죠.",
  },
  {
    q: "회사가 14일 안에 퇴직금을 안 주면 어떻게 하나요?",
    a: "14일 초과 시 연 20% 지연이자가 붙어요. 고용노동부(1350) 신고 또는 노동청에 진정을 제기할 수 있죠.",
  },
];

const SOURCES = [
  { name: "고용노동부", href: "https://www.moel.go.kr" },
  { name: "금융감독원", href: "https://www.fss.or.kr" },
  { name: "법제처", href: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
];

const RELATED = [
  { slug: "퇴직금-IRP-수령방법", title: "퇴직금 IRP 수령 방법 단계별 안내", description: "IRP 계좌 개설부터 연금 개시 신청까지 단계별로 설명해요." },
  { slug: "퇴직금-세금", title: "퇴직금 세금, IRP로 줄이는 방법", description: "퇴직소득세 계산과 IRP 절세 효과 비교예요." },
  { slug: "퇴직금-계산법", title: "퇴직금 계산법, 얼마나 받을까?", description: "평균임금 기준 퇴직금 계산 방법이에요." },
];

// ─── 페이지 (방법형: Steps 먼저) ─────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} highlightSlugs={퇴직금_HIGHLIGHT} currentSlug="퇴직금-수령방법" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 수령방법 · IRP</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 받는 방법, 어디서부터 시작해야 하죠?<br />
        일시금·연금 비교부터 IRP 절차까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        2022년 4월부터 퇴직금 300만원 초과 시 <a href="/w/퇴직금-IRP-계좌" style={{ color: "#1D9E75", textDecoration: "underline" }}>IRP 계좌</a>로만 받을 수 있어요.
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법 제9조</a>에서 정한 이유는 세금 혜택 때문이에요.
        IRP로 받고 연금으로 나눠 수령하면 <a href="/w/퇴직금-세금" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직소득세를 30~40% 줄일 수 있죠</a>.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* H2-1: Steps (방법형 -> 절차 먼저) */}
      <H2>퇴직금 수령 절차, 4단계로 끝나요</H2>
      <p style={body}>
        IRP 개설부터 연금 개시까지 4단계예요. 퇴직 전에 IRP만 열어두면 나머지는 순서대로 따라가면 돼요.
        300만원 이하거나 만 55세 이상이면 IRP 없이 일반 계좌로 바로 받을 수도 있죠.
      </p>
      <p style={body}>
        퇴직 후 14일 이내에 회사가 이체해야 하는데, IRP 계좌 정보를 미리 알려두지 않으면 처리가 늦어져요.
        퇴직이 확정되면 바로 계좌를 열고 인사팀에 알려주세요.
      </p>

      <Steps steps={STEPS} />

      <GreenBox>
        IRP 의무: 300만원 초과 + 만 55세 미만{"\n"}
        일반 계좌 가능: 300만원 이하 / 만 55세 이상 / 외국인 귀국
      </GreenBox>

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      {/* H2-2: DocTable (필요 서류) */}
      <H2>수령에 필요한 서류가 뭔가요?</H2>
      <p style={body}>
        IRP 계좌 개설은 신분증 하나면 충분해요. 퇴직 후 받을 서류는 회사에서 자동으로 발급해주죠.
        퇴직소득원천징수영수증은 연말정산이나 세금 신고 때도 필요하니 꼭 챙겨두세요.
      </p>

      <SectionBadge>필요 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      {/* H2-3: Calculator (연금 시뮬레이션) */}
      <H2>연금으로 받으면 얼마나 절세될까?</H2>
      <p style={body}>
        IRP에 넣고 연금으로 나눠 받으면 퇴직소득세의 30~40%를 아낄 수 있어요.
        퇴직금이 클수록, 연금 기간이 길수록 절세 금액도 커지죠.
        아래에서 내 퇴직금 규모로 연간 수령액과 절세 금액을 미리 확인해보세요.
      </p>

      <SectionBadge>IRP 연금 수령 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 연금 수령액은 퇴직금 / 수령 기간. 절세 금액은 예상 퇴직소득세의 30% 기준. 실제 세금은 근속연수·소득에 따라 달라요."
      />

      <Divider />

      {/* H2-4: Checklist */}
      <H2>수령 전 놓치면 안 되는 것들</H2>
      <p style={body}>
        퇴직 전에 놓치면 나중에 손해가 되는 포인트들이에요.
        특히 14일 지연이자와 연금 수령 기간은 미리 결정해두면 유리하죠.
      </p>

      <SectionBadge>수령 전 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* H2-5: FAQ */}
      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 수령 방법에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법과 소득세법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 내용은 고용노동부(1350) 또는 금융감독원에서 직접 확인해요." />
    </ArticleLayout>
  );
}
