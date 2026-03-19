"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "만 55세 이상이에요" },
  { id: "c2", label: "IRP 또는 연금저축 계좌를 보유하고 있어요" },
  { id: "c3", label: "해당 계좌에 가입한 지 5년이 지났어요" },
  { id: "c4", label: "연금 수령 기간을 10년 이상으로 설정할 수 있어요" },
];

const CALC_SLIDERS = [
  { id: "amount", label: "연금 수령 총액", min: 1000, max: 20000, step: 500, defaultValue: 5000, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "years", label: "연금 수령 기간", min: 5, max: 30, step: 1, defaultValue: 10, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "연간 연금 수령액",
    getValue: (v: Record<string, number>) => Math.round((v.amount * 10000) / v.years),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원/년`,
    highlight: true,
  },
  {
    label: "연금소득세 (연 1,200만원 이하 기준, 5.5%)",
    getValue: (v: Record<string, number>) => {
      const annual = Math.round((v.amount * 10000) / v.years);
      return Math.round(Math.min(annual, 12000000) * 0.055);
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원/년`,
  },
  {
    label: "10년 초과 수령 시 연금소득세 (3.3%)",
    getValue: (v: Record<string, number>) => {
      const annual = Math.round((v.amount * 10000) / v.years);
      return v.years > 10 ? Math.round(Math.min(annual, 12000000) * 0.033) : 0;
    },
    format: (v: number) => v === 0 ? "해당 없음 (수령 기간 10년 이하)" : `약 ${Math.round(v / 10000).toLocaleString()}만원/년`,
  },
];

const DOCS = [
  { name: "신분증 (주민등록증 또는 운전면허증)", required: true, where: "본인 지참" },
  { name: "IRP 계좌 정보 (계좌번호, 금융사)", required: true, where: "IRP 가입 금융사 앱·통장" },
  { name: "연금저축계좌 정보 (계좌번호, 금융사)", required: true, where: "연금저축 가입 금융사 앱·통장" },
  { name: "퇴직소득원천징수영수증", required: false, where: "퇴직 전 회사 인사팀 또는 홈택스" },
  { name: "근로소득 원천징수영수증 (연금 개시 신청 시)", required: false, where: "홈택스 또는 회사 인사팀" },
];

const STEPS = [
  {
    title: "IRP와 연금저축 계좌 현황 파악",
    desc: "IRP에는 퇴직금 이전분(사업주 납입)과 본인 추가 납입금이 들어 있어요. 연금저축에는 본인이 납입한 금액만 있어요. 두 계좌의 잔액과 납입 유형을 먼저 구분해요.",
    tip: "퇴직금 이전분은 IRP에서만 연금으로 받을 수 있어요. 연금저축으로 옮길 수 없어요.",
  },
  {
    title: "연금 수령 기간·금액 설계",
    desc: "연간 1,200만원 이하로 받으면 분리과세(연금소득세 3.3~5.5%)가 적용돼요. 초과 시 다른 소득과 합산해서 종합소득세 신고 대상이 돼요. 퇴직소득세 30% 절감 혜택을 유지하려면 연금 수령 기간을 10년 이상으로 설정하는 게 유리해요.",
    tip: "IRP와 연금저축 합산 연금소득이 1,200만원을 넘지 않도록 나눠서 설계해요.",
  },
  {
    title: "55세 이후 연금 개시 신청",
    desc: "만 55세가 되면 IRP 또는 연금저축에서 연금 개시를 신청할 수 있어요. 금융사 앱 또는 영업점 방문으로 신청 가능해요. 수령 기간과 방식(정액형·자유인출형)을 선택해요.",
    tip: "앱으로 신청하면 보통 당일 처리돼요. 수령 방식은 나중에 변경이 어려울 수 있어요.",
  },
  {
    title: "연금소득세 납부 및 수령",
    desc: "연금 수령 시 금융사가 원천징수로 연금소득세(3.3~5.5%)를 떼고 지급해요. 연간 1,200만원 이하면 분리과세로 끝나요. 초과분은 다음 해 5월 종합소득세 신고를 해야 해요.",
    tip: "연금소득세는 금융사가 자동으로 처리해요. 별도로 납부하지 않아도 돼요.",
  },
];

const CHECKLIST = [
  "연금 개시 나이: 만 55세 이상 (생일 이후 신청 가능)",
  "가입 기간: 계좌 개설 후 5년 이상 경과",
  "연금 수령 기간: 10년 이상 설정 시 세율 3.3%로 낮아짐",
  "연간 수령액: 1,200만원 이하 유지 시 분리과세 적용",
  "IRP 퇴직금 이전분: 연금저축으로 이전 불가, IRP에서만 수령",
  "해지 금지: 중도 해지 시 기타소득세 16.5% 부과 리스크",
];

const FAQS = [
  {
    q: "퇴직금을 연금저축계좌로 직접 이전할 수 있나요?",
    a: "불가해요. 퇴직금은 반드시 IRP 계좌로만 수령할 수 있어요. 사업주가 납입하는 퇴직금 이전분은 IRP에서만 연금으로 받을 수 있고, 연금저축계좌로 직접 이전은 안 돼요. IRP에서 연금 개시를 신청하면 돼요.",
  },
  {
    q: "IRP와 연금저축, 어디서 먼저 받는 게 유리한가요?",
    a: "IRP에 퇴직금이 있다면 IRP에서 먼저 연금을 수령하는 게 유리해요. IRP로 연금을 받으면 퇴직소득세를 30% 절감할 수 있거든요. 연금저축은 세액공제 받은 납입분에 연금소득세만 붙어요.",
  },
  {
    q: "연금 수령 기간이 길수록 세금이 낮아지나요?",
    a: "맞아요. 10년 초과 수령 시 연금소득세율이 5.5%에서 3.3%로 낮아져요. 80세 이후에는 3.3%가 적용돼요. 기간을 길게 설정할수록 매년 내는 세금이 줄어요.",
  },
  {
    q: "연간 1,200만원을 넘게 받으면 어떻게 되나요?",
    a: "초과 금액은 종합소득세 신고 대상이 돼요. 다른 소득(근로소득, 사업소득 등)과 합산해서 세율이 결정되기 때문에 세금이 크게 늘 수 있어요. 가능하면 연간 1,200만원 이하로 수령액을 조정하세요.",
  },
  {
    q: "연금 수령 중에 계좌를 해지하면 어떻게 되나요?",
    a: "중도 해지하면 세액공제 받은 금액과 운용 수익에 기타소득세 16.5%가 부과돼요. IRP에서 퇴직금 이전분을 해지하면 퇴직소득세 30% 절감 혜택도 사라져요. 세금 손실이 크니 해지는 피하세요.",
  },
  {
    q: "55세 미만인데 연금저축에서 돈을 꺼낼 수 있나요?",
    a: "연금 외 수령으로 꺼낼 수는 있어요. 하지만 세액공제 받은 납입분과 운용 수익에 기타소득세 16.5%가 붙어요. 퇴직금 이전분이 있는 IRP도 마찬가지예요. 55세까지 기다리는 게 세금 면에서 훨씬 유리해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "소득세법 제20조의3: 연금소득 과세 기준", url: "https://www.law.go.kr/법령/소득세법" },
      { label: "근로자퇴직급여보장법 제48조: IRP 연금 수령 세율 특례", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "금융감독원: 개인형IRP·연금저축 안내", url: "https://www.fss.or.kr" },
      { label: "국세청: 연금소득 세금 안내", url: "https://www.nts.go.kr" },
      { label: "고용노동부: 퇴직급여제도 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-IRP-계좌", title: "IRP 계좌 개설 방법", description: "은행·증권사 비교부터 개설 절차까지." },
  { slug: "퇴직금-세금-절세-방법-IRP-연말정산", title: "퇴직금 절세 방법", description: "IRP와 연말정산으로 세금 줄이는 방법." },
  { slug: "퇴직금-수령방법", title: "퇴직금 수령 방법", description: "일시금·IRP·연금 수령 방법 비교." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-연금저축계좌-수령" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · IRP · 연금저축 · 연금 수령</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금을 연금저축계좌로 받을 수 있나요?<br />
        IRP 연금 수령 조건과 절세 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금은 원칙적으로 <a href="/w/퇴직금-IRP-계좌" style={{ color: "#1D9E75", textDecoration: "underline" }}>IRP 계좌</a>로 수령해요.
        연금저축계좌로 직접 이전은 불가하지만, IRP에서 55세 이후 연금을 수령하면 <a href="/w/퇴직금-세금" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직소득세</a>를 30% 아낄 수 있어요.
        연간 1,200만원 이하로 받으면 분리과세까지 적용돼서 세금이 두 번 줄어요.
        IRP와 연금저축의 차이, 수령 조건, 절세 전략을 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>퇴직금을 연금저축으로 받을 수 있나요?</H2>
      <p style={body}>
        퇴직금은 연금저축계좌로 직접 이전이 안 돼요.
        사업주가 납입하는 퇴직금 이전분은 반드시 IRP 계좌로만 수령해요.
        연금저축계좌는 본인이 직접 납입한 금액만 있는 계좌예요.
      </p>
      <p style={body}>
        다만 IRP에서 연금 개시를 신청하면 55세 이후부터 연금 형태로 퇴직금을 받을 수 있어요.
        IRP 연금 수령 시 퇴직소득세를 30% 아낄 수 있고, 연금소득세(3.3~5.5%)만 내면 돼요.
        연금저축과 IRP는 합산해서 연 900만원 세액공제 한도가 적용돼요.
      </p>

      <GreenBox>
        IRP: 퇴직금 이전분 + 본인 납입 / 연금저축: 본인 납입만 가능<br />
        퇴직금 이전분은 IRP에서만 수령 (연금저축 이전 불가)<br />
        연금 수령 조건: 만 55세 이상 + 계좌 가입 5년 이상
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="IRP·연금저축 연금 수령 조건을 갖추고 있어요. 아래 계산기로 예상 수령액과 세금을 계산해보세요."
        partialMatchText="조건 일부가 충족되지 않아요. 금융감독원(1332) 또는 국세청(126)에 문의하세요."
      />

      <Divider />

      <H2>연간 수령액과 절세 효과 계산</H2>
      <p style={body}>
        총 연금 수령액과 수령 기간을 조정하면 연간 수령액과 예상 세금을 확인할 수 있어요.
        수령 기간이 10년을 넘으면 세율이 5.5%에서 3.3%로 낮아져요.
        연간 1,200만원 이하로 받으면 분리과세 적용으로 종합소득세 신고가 필요 없어요.
      </p>

      <SectionBadge>연금 수령 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 연금소득세: 10년 이하 5.5%, 10년 초과 3.3%, 80세 이후 3.3%. 연간 1,200만원 초과 시 종합소득세 신고 필요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>연금 개시 신청에 필요한 서류</H2>
      <p style={body}>
        금융사 앱으로 신청하면 신분증 없이 본인 인증만으로 처리되는 경우가 많아요.
        영업점 방문 시에는 신분증을 반드시 지참해야 해요.
        퇴직소득원천징수영수증은 연금 신청 시 필요할 수 있어서 미리 보관해두세요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>IRP 연금 수령 절차 4단계</H2>
      <p style={body}>
        계좌 현황 파악부터 연금 개시까지 단계별로 따라가면 돼요.
        수령 기간과 금액을 미리 설계해두면 세금을 최소화할 수 있어요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>연금 수령 전 꼭 챙겨야 할 것들</H2>
      <p style={body}>
        연금 개시 후에는 수령 기간 변경이 어려울 수 있어요.
        특히 연간 수령액이 1,200만원을 넘으면 종합소득세 부담이 생기기 때문에 사전 설계가 중요해요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        IRP에서 연금 수령 시 퇴직소득세 30% 절감 + 연금소득세 3.3~5.5%만 부담해요.
        일시금으로 받을 때보다 수백만 원 이상 세금이 줄 수 있어요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        IRP·연금저축 연금 수령에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 소득세법과 근로자퇴직급여보장법을 바탕으로 작성됐어요. 세율은 수령 방식·기간에 따라 달라질 수 있으니 최신 기준은 국세청(126)에 문의하세요." />
    </ArticleLayout>
  );
}
