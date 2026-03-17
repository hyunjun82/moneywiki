"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직 또는 퇴직 예정이에요" },
  { id: "c2", label: "하나은행 IRP 계좌가 개설돼 있어요 (또는 개설할 예정이에요)" },
  { id: "c3", label: "회사 인사·급여 담당자에게 IRP 계좌번호를 전달했어요 (또는 전달할 예정이에요)" },
  { id: "c4", label: "퇴직금이 300만원을 넘어요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "월 평균 임금 (만원)", min: 150, max: 1000, step: 10, defaultValue: 300, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "years", label: "근속연수 (년)", min: 1, max: 30, step: 1, defaultValue: 5, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "퇴직금 예상액 (세전)",
    getValue: (v: Record<string, number>) => Math.round(v.salary * 10000 * v.years),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "퇴직소득세 추정 (약 5.5% 기준)",
    getValue: (v: Record<string, number>) => Math.round(v.salary * 10000 * v.years * 0.055),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원 (근속·공제에 따라 달라요)`,
  },
  {
    label: "세후 예상 수령액",
    getValue: (v: Record<string, number>) => Math.round(v.salary * 10000 * v.years * 0.945),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "신분증 (주민등록증 또는 운전면허증)", required: true, where: "본인 지참" },
  { name: "IRP 계좌 개설 신청서", required: true, where: "하나은행 영업점 또는 하나원큐 앱" },
  { name: "퇴직급여 수령 IRP 계좌번호 통보서 (회사 제출용)", required: true, where: "개설 후 본인 작성" },
  { name: "재직증명서 (일부 영업점 요구)", required: false, where: "회사 발급" },
];

const STEPS = [
  {
    title: "하나은행 IRP 계좌 개설",
    desc: "하나원큐 앱 또는 영업점에서 IRP 계좌를 개설해요. 신분증만 있으면 10분 내에 완료돼요. 앱에서 비대면 개설도 가능해요.",
    tip: "하나원큐 앱 → 자산관리 → IRP 개설 메뉴에서 진행해요",
    link: { label: "하나원큐 앱 이동", href: "https://www.kebhana.com" },
  },
  {
    title: "회사에 IRP 계좌번호 제출",
    desc: "퇴직 전 또는 퇴직 직후 회사 인사·급여 담당자에게 하나은행 IRP 계좌번호를 알려줘요. 회사는 이 계좌로 퇴직금을 이체해요.",
    tip: "계좌번호 + 은행명(하나은행)을 문자나 이메일로 전달하면 돼요",
  },
  {
    title: "퇴직금 IRP 계좌 입금 확인",
    desc: "퇴직일로부터 14일 이내에 회사가 IRP 계좌로 퇴직금을 이체해야 해요. 퇴직소득세는 이 시점에 원천징수돼요. 하나원큐 앱에서 입금 내역을 바로 확인할 수 있어요.",
    tip: "14일이 지나도 입금 안 되면 지연이자(연 20%) 청구 가능해요",
  },
  {
    title: "수령 방식 선택 (일시금 또는 연금)",
    desc: "IRP 계좌에 입금된 퇴직금은 일시금으로 바로 받거나, 55세 이후 연금으로 나눠 받을 수 있어요. 연금 수령 시 퇴직소득세의 30~40%를 감면받아요.",
    tip: "55세 미만이면 일시금 수령만 가능해요. 연금은 55세 이후부터 신청할 수 있어요",
  },
];

const CHECKLIST = [
  "하나은행 IRP 계좌 개설: 앱 또는 영업점에서 신분증만으로 가능",
  "회사 담당자에게 IRP 계좌번호 제출: 퇴직 전후 즉시",
  "퇴직일로부터 14일 이내 입금 여부 확인",
  "IRP 입금 확인 후 수령 방식 결정 (일시금/연금)",
  "55세 이후 연금 수령 선택 시 퇴직소득세 30~40% 감면",
  "운용 중인 펀드 있으면 환매 후 수령 일정 확인",
];

const FAQS = [
  {
    q: "하나은행 IRP 계좌가 없으면 퇴직금을 못 받나요?",
    a: "아니에요. IRP 계좌가 없으면 회사는 일반 예금 계좌로 입금할 수도 있어요. 다만 퇴직금 300만원 초과는 IRP로 받는 게 원칙이에요. IRP로 받으면 세금 납부를 나중으로 미룰 수 있어서 유리해요.",
  },
  {
    q: "하나은행 IRP 개설 수수료가 있나요?",
    a: "계좌 개설 자체는 무료예요. 다만 IRP 내 운용 상품(펀드, ETF 등)에 따라 운용 수수료가 발생할 수 있어요. 원금보장형 상품(정기예금)을 선택하면 수수료가 낮아요.",
  },
  {
    q: "퇴직금을 IRP 말고 일반 통장으로 받으면 어떻게 되나요?",
    a: "퇴직금 300만원 초과는 원칙적으로 IRP로 받아야 해요. 일반 통장으로 받으면 회사가 퇴직소득세를 즉시 원천징수하고 나머지를 입금해요. IRP로 받으면 수령 시점까지 세금 납부를 미룰 수 있어요.",
  },
  {
    q: "하나은행 IRP에서 일시금 인출이 가능한가요?",
    a: "가능해요. IRP 해지 신청을 하면 퇴직소득세 납부 후 잔액을 받을 수 있어요. 단, 중도 해지 시 세액 감면 혜택은 사라져요. 55세 이후 연금 수령 시 세금이 줄어드는 점을 고려해보세요.",
  },
  {
    q: "다른 은행 IRP로 이전할 수 있나요?",
    a: "가능해요. IRP 계좌는 금융기관 간 이전이 자유롭게 돼요. 하나은행 IRP에서 다른 금융기관 IRP로 이전하거나, 다른 금융기관 IRP를 하나은행으로 통합할 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여 보장법 제9조: 퇴직급여 지급 기한 및 IRP 이전 의무", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부: 퇴직급여 IRP 의무 이전 안내", url: "https://www.moel.go.kr" },
      { label: "하나은행: IRP 퇴직연금 안내", url: "https://www.kebhana.com" },
      { label: "금융감독원: IRP 제도 안내", url: "https://www.fss.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-IRP-계좌", title: "IRP 계좌 개설 방법", description: "은행·증권사별 IRP 개설 절차와 비교." },
  { slug: "퇴직금-수령방법", title: "퇴직금 수령 방법 전체 흐름", description: "일시금·연금·IRP 이전 선택 기준." },
  { slug: "퇴직금-irp-의무", title: "퇴직금 IRP 이전 의무 대상", description: "300만원 초과 퇴직금 IRP 의무 규정." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="하나은행-퇴직금-수령방법" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · IRP · 하나은행</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        하나은행에서 퇴직금 받으려면 뭘 해야 하나요?<br />
        IRP 개설부터 수령 방식 선택까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        하나은행 IRP 계좌를 개설하고 회사에 계좌번호만 알려주면 퇴직금을 받을 수 있어요.
        퇴직금 300만원 초과는 <a href="/w/퇴직금-irp-의무" style={{ color: "#1D9E75", textDecoration: "underline" }}>IRP 계좌로 받는 게 원칙</a>이에요.
        IRP로 받으면 퇴직소득세 납부를 나중으로 미룰 수 있고, 55세 이후 연금으로 받으면 세금이 30~40% 줄어요.
        하나원큐 앱에서 10분이면 IRP 계좌 개설이 완료돼요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>하나은행 IRP로 퇴직금 받을 수 있나요?</H2>
      <p style={body}>
        퇴직금 300만원 초과는 <a href="/w/퇴직금-IRP-계좌" style={{ color: "#1D9E75", textDecoration: "underline" }}>IRP 계좌</a>로만 받을 수 있어요.
        하나은행 IRP는 하나원큐 앱 또는 영업점에서 신분증만 있으면 개설할 수 있어요.
        계좌 개설 후 회사 담당자에게 계좌번호를 전달하면 퇴직일로부터 14일 이내에 입금돼요.
      </p>
      <p style={body}>
        IRP 계좌에 퇴직금이 입금되면 일시금으로 바로 받거나, 55세 이후 연금으로 나눠 받는 방식을 고를 수 있어요.
        연금 방식을 선택하면 퇴직소득세의 30~40%를 감면받아요.
        하나은행 외에 다른 금융기관 IRP로 이전도 자유롭게 할 수 있어요.
      </p>

      <GreenBox title="하나은행 IRP 퇴직금 수령 핵심">
        퇴직금 300만원 초과 → IRP 계좌 필수<br />
        IRP 수령 시 퇴직소득세 납부 이연 (나중에 납부)<br />
        55세 이후 연금 수령 시 세금 30~40% 감면
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="하나은행 IRP로 퇴직금을 받을 준비가 됐어요. 아래 계산기로 예상 수령액을 확인해보세요."
        partialMatchText="일부 조건을 아직 갖추지 못했어요. 하나은행 고객센터(1588-1111)에서 안내받을 수 있어요."
      />

      <Divider />

      <H2>세후 수령액이 얼마나 되나요?</H2>
      <p style={body}>
        퇴직금은 월 평균 임금 × 근속연수로 계산해요.
        실제 퇴직소득세는 근속연수 공제, 환산 배수 등으로 계산이 복잡하지만, 일반적으로 5~10% 수준이에요.
        슬라이더로 월급과 근속연수를 조정하면 예상 금액을 바로 볼 수 있어요.
      </p>

      <SectionBadge>세후 수령액 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 퇴직소득세율 5.5% 적용 추정치. 실제 세율은 근속연수·퇴직금 규모에 따라 달라져요. IRP 연금 수령 시 세율이 더 낮아져요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>IRP 개설과 수령에 필요한 서류</H2>
      <p style={body}>
        하나은행 IRP 개설은 신분증 하나만 있으면 돼요.
        앱에서 비대면으로도 바로 개설할 수 있어서 별도 서류 준비가 거의 필요 없어요.
        회사에 제출하는 계좌번호는 IRP 계좌 개설 즉시 확인할 수 있어요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>하나은행 IRP 퇴직금 수령 4단계</H2>
      <p style={body}>
        IRP 개설부터 수령까지 전체 흐름은 4단계예요.
        대부분 하나원큐 앱에서 해결되고, 회사에 계좌번호만 전달하면 회사가 알아서 입금해줘요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>수령 전 꼭 챙겨야 할 것들</H2>
      <p style={body}>
        IRP 계좌 개설을 퇴직 직전에 해도 되지만, 미리 개설해두는 게 안전해요.
        회사가 14일을 넘기면 <a href="/w/퇴직금-지연이자" style={{ color: "#1D9E75", textDecoration: "underline" }}>연 20% 지연이자</a>가 발생해요.
        운용 중인 펀드가 있으면 환매 시간이 있으니 미리 확인해두세요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="55세 이후라면 연금 수령을 고려해보세요">
        IRP에서 연금으로 받으면 퇴직소득세의 30%(10년 이상 수령 시 40%)를 감면받아요.
        세금을 줄이고 싶다면 55세 이후 연금 수령 방식을 선택하세요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        하나은행 IRP 퇴직금 수령에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여 보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350) 또는 하나은행(1588-1111)에서 확인하세요." />
    </ArticleLayout>
  );
}
