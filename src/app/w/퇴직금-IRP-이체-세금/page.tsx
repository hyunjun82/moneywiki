"use client";
import { Divider } from "@/components/article-ui/Divider";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR, 퇴직금_HIGHLIGHT } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직 후 퇴직금이 IRP 계좌로 이체됐어요" },
  { id: "c2", label: "회사에서 퇴직소득 원천징수영수증을 받았어요" },
  { id: "c3", label: "IRP 가입 금융사에서 수령 방법(일시금/연금)을 아직 결정 중이에요" },
  { id: "c4", label: "연금 수령 시 절세 혜택 조건(만 55세 이후)을 충족하거나 충족 예정이에요" },
];

const CALC_SLIDERS = [
  { id: "amount", label: "IRP 이체 퇴직금", min: 500, max: 15000, step: 100, defaultValue: 3000, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "years", label: "근속 기간", min: 1, max: 35, step: 1, defaultValue: 10, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "일시금 인출 시 퇴직소득세 (추정)",
    getValue: (v: Record<string, number>) => {
      const base = v.amount * 10000;
      const deduction = Math.min(v.years * 1500000, 30000000);
      const taxBase = Math.max(0, base - deduction);
      return Math.round(taxBase * 0.055 * 1.1);
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "연금 수령 시 절세 효과 (30% 감면 기준)",
    getValue: (v: Record<string, number>) => {
      const base = v.amount * 10000;
      const deduction = Math.min(v.years * 1500000, 30000000);
      const taxBase = Math.max(0, base - deduction);
      const tax = Math.round(taxBase * 0.055 * 1.1);
      return Math.round(tax * 0.3);
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원 절세`,
  },
];

const DOCS = [
  { name: "퇴직소득 원천징수영수증", required: true, where: "퇴사한 회사 인사팀 또는 홈택스 조회" },
  { name: "IRP 계좌 개설 서류 (신분증)", required: true, where: "IRP 가입 금융사 앱 또는 방문" },
  { name: "연금 수령 신청서 (연금 선택 시)", required: false, where: "IRP 가입 금융사 앱" },
  { name: "경정청구서 (세금 과오납 환급 시)", required: false, where: "홈택스 온라인 작성" },
];

const STEPS = [
  {
    title: "IRP 이체 확인",
    desc: "퇴직 후 회사가 IRP 계좌로 퇴직금을 이체해요. 이때 퇴직소득세는 원천징수되지 않아요. IRP 앱에서 이체 금액을 확인하고, 회사에서 퇴직소득 원천징수영수증을 받아두세요.",
    tip: "원천징수영수증에 퇴직소득세 계산 내역이 나와요 — 나중에 절세 계획 세울 때 꼭 필요해요",
  },
  {
    title: "수령 방법 결정 (일시금 vs 연금)",
    desc: "IRP 금융사 앱에서 일시금 또는 연금을 선택할 수 있어요. 일시금을 선택하면 퇴직소득세 전액을 납부 후 수령해요. 만 55세 이후 연금을 선택하면 퇴직소득세의 30%(10년 이상 수령 시 40%)를 감면받아요.",
    tip: "55세 이전이라면 IRP 안에서 운용하면서 기다리는 게 세금 면에서 유리해요",
  },
  {
    title: "연금 수령 신청 (연금 선택 시)",
    desc: "IRP 금융사 앱에서 연금 수령 신청서를 작성해요. 연금 지급 주기(월·분기·연간)와 수령 기간을 선택할 수 있어요. 수령 기간이 10년 이상이면 퇴직소득세 40% 감면 혜택을 받을 수 있어요.",
    tip: "연간 연금 수령액이 1,200만원 이하면 분리과세 선택이 가능해요",
  },
  {
    title: "세금 납부 및 환급 확인",
    desc: "일시금 인출 시 금융사가 퇴직소득세를 원천징수하고 나머지를 지급해요. 세금이 과오납됐다면 홈택스에서 경정청구로 환급받을 수 있어요. 경정청구 기한은 5년이에요.",
    tip: "퇴직소득세 환급은 홈택스 > 세금 신고 > 경정청구 메뉴에서 신청해요",
    link: { label: "홈택스 경정청구 신청", href: "https://www.hometax.go.kr" },
  },
];

const CHECKLIST = [
  "IRP 이체 시 세금 없음: 꺼낼 때까지 과세 이연",
  "일시금 인출: 퇴직소득세 전액 납부 (감면 없음)",
  "연금 수령: 만 55세 이후, 퇴직소득세 30~40% 감면",
  "10년 이상 연금 수령: 감면율 30% → 40% 상향",
  "연간 1,200만원 이하 연금: 분리과세 선택 가능",
  "세금 과오납 시: 경정청구 기한 5년 내 환급 신청",
];

const FAQS = [
  {
    q: "IRP로 이체될 때 세금이 바로 빠지나요?",
    a: "아니에요. IRP로 이체하는 것 자체는 과세 없이 그대로 들어가요. 세금은 IRP에서 돈을 꺼낼 때 납부해요. 이걸 과세 이연이라고 해요. IRP 안에서 운용 수익이 생겨도 꺼낼 때까지 과세되지 않아요.",
  },
  {
    q: "IRP에서 바로 일시금으로 빼면 세금이 얼마나 나오나요?",
    a: "퇴직소득세 전액이 원천징수돼요. 금액과 근속 기간에 따라 다른데, 예를 들어 근속 10년·퇴직금 3,000만원이면 수십만 원에서 수백만 원 수준이에요. 정확한 금액은 회사에서 받은 퇴직소득 원천징수영수증으로 확인할 수 있어요.",
  },
  {
    q: "연금으로 받으면 세금이 얼마나 줄어드나요?",
    a: "퇴직소득세의 30%를 감면받아요. 수령 기간이 10년 이상이면 40% 감면이에요. 퇴직소득세가 200만원이라면 연금 수령 시 120~140만원만 내면 돼요. 퇴직금이 클수록 절세 효과도 커요.",
  },
  {
    q: "중도 인출 시 세금이 더 많이 나온다고 하던데요?",
    a: "맞아요. IRP에서 중도 인출을 하면 퇴직소득세에 더해 기타소득세 16.5%가 추가로 부과될 수 있어요. 법에서 허용하는 사유(무주택자 주택 구입, 요양비 등)가 아니면 중도 인출이 제한되고 세금도 많아요.",
  },
  {
    q: "55세 이전인데 IRP에서 연금을 받을 수 있나요?",
    a: "안 돼요. 연금 수령은 만 55세 이후부터 가능해요. 55세 이전에 인출하면 연금 수령이 아닌 일시금 또는 중도 인출로 처리돼서 세금 감면 혜택을 받을 수 없어요.",
  },
  {
    q: "연금으로 받을 때 연금소득세도 내야 하나요?",
    a: "퇴직금 재원에서 나온 연금은 퇴직소득세 기준으로 과세돼요(30~40% 감면 적용). 연금저축 등 세액공제 받은 금액은 연금소득세(3.3~5.5%)가 부과돼요. 재원에 따라 세금 방식이 달라요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "소득세법 제22조: 퇴직소득 과세 기준", url: "https://www.law.go.kr/법령/소득세법" },
      { label: "소득세법 제146조의2: IRP 연금 수령 세액 감면", url: "https://www.law.go.kr/법령/소득세법" },
      { label: "근로자퇴직급여 보장법 제17조: IRP 이전 의무", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "국세청: 퇴직소득세 계산 안내", url: "https://www.nts.go.kr" },
      { label: "금융감독원: IRP 퇴직금 세금 안내", url: "https://www.fss.or.kr" },
      { label: "고용노동부: 퇴직급여 IRP 이전 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-IRP-수령방법", title: "IRP 퇴직금 수령 방법", description: "일시금·연금 선택과 신청 절차 정리." },
  { slug: "퇴직금-세금", title: "퇴직금 세금, 얼마나 떼나요?", description: "퇴직소득세 계산 공식과 절세 방법." },
  { slug: "퇴직금-일시금-세금", title: "퇴직금 일시금 수령 세금", description: "일시금으로 받을 때 세금 계산 방법." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} highlightSlugs={퇴직금_HIGHLIGHT} currentSlug="퇴직금-IRP-이체-세금" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · IRP · 세금</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금을 IRP로 이체하면 세금이 바로 빠지나요?<br />
        과세 이연부터 연금 수령 절세 조건까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        <a href="/w/퇴직금-IRP-계좌" style={{ color: "#1D9E75", textDecoration: "underline" }}>IRP 계좌</a>로 퇴직금을 이체하는 것 자체는 세금이 없어요.
        <a href="/w/퇴직금-세금" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직소득세</a>는 IRP에서 돈을 꺼낼 때 납부해요.
        꺼내는 방법이 중요한데, 만 55세 이후 연금으로 받으면 퇴직소득세의 30~40%를 감면받을 수 있어요.
        일시금으로 빼면 감면 없이 전액을 내야 해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>IRP로 이체됐을 때 세금은 어떻게 되나요?</H2>
      <p style={body}>
        퇴직금이 IRP로 이체될 때는 퇴직소득세를 원천징수하지 않아요.
        이를 '과세 이연'이라고 해요. IRP 계좌 안에 있는 동안에는 운용 수익도 포함해서 세금이 발생하지 않아요.
        세금은 IRP에서 실제로 돈을 꺼내는 시점에 납부해요.
      </p>
      <p style={body}>
        꺼내는 방식이 세금을 결정해요.
        일시금으로 인출하면 퇴직소득세 전액을 내야 해요.
        만 55세 이후 연금으로 받으면 퇴직소득세를 30% 감면받고, 10년 이상 수령하면 40% 감면받아요.
        중도에 규정 외 사유로 인출하면 퇴직소득세에 기타소득세 16.5%까지 더 나올 수 있어요.
      </p>

      <GreenBox>
        이체 시: 세금 없음 (과세 이연)<br />
        일시금 인출: 퇴직소득세 전액 납부<br />
        연금 수령(만 55세 이후, 10년 미만): 퇴직소득세 30% 감면<br />
        연금 수령(만 55세 이후, 10년 이상): 퇴직소득세 40% 감면<br />
        중도 인출(규정 외): 퇴직소득세 + 기타소득세 16.5%
      </GreenBox>

      <SectionBadge>과세 이연 혜택 조건 체크</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="과세 이연 혜택과 연금 수령 절세 조건을 갖추고 있어요. 아래 계산기로 절세 효과를 비교해보세요."
        partialMatchText="상황에 따라 세금 처리가 달라질 수 있어요. 국세청(126) 또는 IRP 금융사 상담을 권해요."
      />

      <Divider />

      <H2>일시금 vs 연금 수령, 세금 차이 계산</H2>
      <p style={body}>
        퇴직금 규모와 근속 기간을 입력하면 일시금 인출 시 퇴직소득세 추정액과 연금 수령 시 절세 효과를 비교할 수 있어요.
        퇴직금이 클수록, 근속 기간이 짧을수록 절세 효과가 더 크게 나타나요.
      </p>
      <p style={body}>
        계산기는 단순화된 추정치예요. 실제 퇴직소득세는 근속공제와 환산산식을 적용하기 때문에 달라질 수 있어요.
        회사에서 받은 퇴직소득 원천징수영수증에 정확한 세액이 나와요.
      </p>

      <SectionBadge>퇴직소득세 절세 비교 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 추정치. 실제 퇴직소득세는 근속공제·환산산식 적용으로 다를 수 있어요. 퇴직소득 원천징수영수증으로 정확한 세액을 확인하세요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>세금 처리에 필요한 서류</H2>
      <p style={body}>
        퇴직소득 원천징수영수증은 퇴직소득세 계산의 기준이 돼요.
        회사 인사팀에 요청하거나 홈택스에서 조회할 수 있어요.
        연금 수령을 선택할 때는 IRP 금융사 앱에서 신청서를 작성하면 돼요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>퇴직금 IRP 이체 후 세금 처리 절차</H2>
      <p style={body}>
        이체 확인 → 수령 방법 결정 → 연금 신청(선택 시) → 세금 납부 순서예요.
        55세까지 시간이 남아있다면 IRP 안에서 운용하면서 기다리는 게 세금 측면에서 유리해요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>IRP 세금 절세 체크리스트</H2>
      <p style={body}>
        연금 수령이 핵심이에요. 55세가 되면 IRP 금융사에 연금 수령 신청을 하고, 수령 기간을 10년 이상으로 설정하면 최대 40% 감면을 받을 수 있어요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        수령 기간 10년 미만: 퇴직소득세 30% 감면<br />
        수령 기간 10년 이상: 퇴직소득세 40% 감면<br />
        연간 1,200만원 이하 수령 시 분리과세 선택 가능해요
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 IRP 이체 후 세금에 대해 실제로 많이 묻는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 소득세법 및 근로자퇴직급여 보장법을 바탕으로 작성됐어요. 세법 개정이 있을 수 있으니 최신 기준은 국세청(126)에서 확인하세요." />
    </ArticleLayout>
  );
}
