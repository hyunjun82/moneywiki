"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR, 퇴직금_HIGHLIGHT } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직금을 개인형 IRP로 받을 예정이에요" },
  { id: "c2", label: "연금으로 나눠 받고 싶어요" },
  { id: "c3", label: "세액공제 혜택도 받고 싶어요" },
  { id: "c4", label: "중도인출 없이 노후까지 운용할 계획이에요" },
];

const CALC_SLIDERS = [
  {
    id: "amount",
    label: "퇴직금",
    min: 300,
    max: 10000,
    step: 100,
    defaultValue: 3000,
    format: (v: number) => `${v.toLocaleString()}만원`,
  },
  {
    id: "years",
    label: "연금 수령 기간",
    min: 10,
    max: 30,
    step: 1,
    defaultValue: 20,
    format: (v: number) => `${v}년`,
  },
];

const CALC_RESULTS = [
  {
    label: "연간 연금 수령액",
    highlight: true,
    getValue: (v: Record<string, number>) =>
      Math.round((v.amount * 10000) / v.years),
    format: (v: number) =>
      `약 ${Math.round(v / 10000).toLocaleString()}만원/년`,
  },
  {
    key: "result2",
    label: "세액공제 (연 300만원 납입 기준, 16.5%)",
    highlight: false,
    getValue: (v: Record<string, number>) =>
      Math.round(Math.min(v.amount * 10000, 9000000) * 0.165),
    format: (v: number) =>
      `최대 약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "신분증", required: true, where: "본인 지참" },
  { name: "퇴직 확인서", required: true, where: "회사 인사팀" },
  { name: "IRP 계좌 개설 서류", required: true, where: "금융기관 앱 또는 방문" },
  { name: "수익자 지정 서류", required: false, where: "금융기관: 선택 사항" },
];

const STEPS = [
  {
    title: "개인형 IRP 개설",
    desc: "증권사·은행 앱으로 신분증+인증서로 10분",
    tip: "수수료 낮은 증권사 권장",
  },
  {
    title: "납입금 이체",
    desc: "회사에서 이체하거나 본인이 추가 납입 가능",
    tip: "본인 추가 납입 시 세액공제 혜택",
  },
  {
    title: "운용 지시",
    desc: "ETF, 펀드, 예금 중 선택해서 운용",
    tip: "장기 운용이라면 분산 투자 권장",
  },
  {
    title: "55세 이후 연금 수령",
    desc: "10년 이상 분산 수령 시 퇴직소득세 30% 감면",
    tip: "연금 수령 방법은 수령 직전에 금융기관에 신청",
  },
];

const CHECKLIST = [
  "개인형 IRP 개설 — 퇴직 전에 미리",
  "추가 납입 — 연 1,800만원 한도, 세액공제 900만원 한도",
  "운용 지시 — 방치하면 원리금보장형 자동 배정",
  "55세 이후 연금 전환 — 퇴직소득세 30% 감면",
  "수수료 비교 — 증권사 0.2% vs 은행 0.5%",
];

const FAQS = [
  {
    q: "개인형 IRP와 기업형 IRP가 어떻게 달라요?",
    a: "개인형은 본인이 직접 가입하는 계좌, 기업형(DC·DB형)은 회사가 운용해요. 퇴직 시 개인형 IRP로 이전돼요.",
  },
  {
    q: "55세 이전에 연금을 받을 수 있나요?",
    a: "원칙적으로 불가해요. 부득이한 사유(요양, 파산 등)에 한해 중도인출이 가능하고, 이 경우 세금 16.5%가 부과돼요.",
  },
  {
    q: "추가 납입하면 세액공제가 얼마나 되나요?",
    a: "IRP+연금저축 합산 연 900만원까지 세액공제를 받을 수 있어요. 소득 5,500만원 이하면 16.5%, 초과면 13.2%예요.",
  },
  {
    q: "운용 중 손실이 나면 퇴직금이 줄어드나요?",
    a: "실적배당형(ETF·펀드)을 선택하면 손실이 날 수 있어요. 안전하게 원리금보장형을 선택하는 방법도 있어요.",
  },
  {
    q: "퇴직 후 연금 수령 전까지 IRP 관리를 안 해도 되나요?",
    a: "운용 지시를 따로 안 하면 원리금보장형으로 자동 운용돼요. 수수료는 계속 부과되니 주기적으로 내역은 살펴보는 게 좋아요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법: 개인형 IRP", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "금융감독원: 퇴직연금 비교공시", url: "https://www.fss.or.kr" },
      { label: "고용노동부: 퇴직연금 제도 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-IRP-계좌",
    title: "퇴직금 IRP 계좌 개설",
    description: "수수료 비교부터 개설까지",
  },
  {
    slug: "퇴직금-IRP-수령방법",
    title: "퇴직금 IRP 수령 방법",
    description: "이체부터 연금 전환까지",
  },
  {
    slug: "퇴직금-세금",
    title: "퇴직금 세금, 얼마나 떼나요?",
    description: "IRP 절세 효과 계산",
  },
];

export default function Page() {
  const sidebar = (
    <Sidebar
      heading="퇴직금 가이드"
      items={퇴직금_SIDEBAR} highlightSlugs={퇴직금_HIGHLIGHT}
      currentSlug="개인형-irp-퇴직금-수령방법"
    />
  );

  return (
    <ArticleLayout sidebar={sidebar}>
      {/* 브레드크럼 */}
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>
        개인형IRP · 퇴직금 · 수령
      </p>

      {/* 타이틀 */}
      <h1 style={{ fontSize: 26, fontWeight: 800, lineHeight: 1.35, marginBottom: 4 }}>
        개인형 IRP로 퇴직금 수령하는 방법은?
      </h1>
      <p style={{ fontSize: 17, color: "#374151", marginBottom: 24 }}>
        가입부터 수령 방식 선택까지 한 번에
      </p>

      {/* 체크리스트: 이 글이 맞는지 확인 */}
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="모두 해당된다면, 이 글이 딱 맞아요."
        partialMatchText="일부 해당된다면 아래 내용을 참고해보세요."
      />

      <Divider />

      {/* 섹션 1: 개인형 IRP란 */}
      <SectionBadge>개요</SectionBadge>
      <H2>개인형 IRP, 퇴직금을 담는 그릇이에요</H2>

      <p style={body}>
        퇴직금을 받는 방법은 크게 두 가지예요. 그냥 일시불로 받거나, 개인형 IRP 계좌에 넣어서 연금으로 나눠 받거나요. 그냥 받으면 퇴직소득세를 한꺼번에 내야 하는데, IRP를 거치면 세금 납부를 미루면서 운용 수익까지 노릴 수 있어요.
      </p>
      <p style={body}>
        개인형 IRP(Individual Retirement Pension)는 근로자가 직접 개설하는 퇴직연금 계좌예요. 회사가 운용하는 DB형·DC형과 달리 내가 직접 금융기관을 골라서 만들고, 운용 방법도 내가 정해요. 퇴직할 때 회사에서 퇴직금을 이 계좌로 이체해주는 방식이고요.
      </p>
      <p style={body}>
        55세 이후에 연금으로 10년 이상 나눠 받으면 퇴직소득세의 30%를 깎아줘요. 퇴직금이 클수록 이 절세 효과가 커지기 때문에, 퇴직금이 3,000만원을 넘는다면 IRP를 거치는 게 유리한 경우가 많아요.
      </p>

      <GreenBox>
        IRP 계좌는 퇴직 전에 미리 만들어두는 게 좋아요. 퇴직 후에 회사가 퇴직금을 이체할 때 계좌가 없으면 지연될 수 있거든요. 증권사 앱으로 10분이면 개설 가능해요.
      </GreenBox>

      <Divider />

      {/* 섹션 2: 수령 절차 */}
      <SectionBadge>절차</SectionBadge>
      <H2>IRP 퇴직금 수령 절차, 4단계예요</H2>

      <p style={body}>
        복잡해 보여도 실제로는 4단계예요. 계좌 개설 → 퇴직금 입금 → 운용 → 연금 수령 순서로 진행돼요. 각 단계에서 놓치기 쉬운 포인트들만 잘 챙기면 돼요.
      </p>
      <p style={body}>
        특히 3단계 '운용 지시'를 많이들 놓쳐요. 아무것도 안 하면 원리금보장형(예금 수준)으로 자동 배정되는데, 10~20년 장기로 굴리는 돈이라면 ETF나 펀드로 분산해두는 게 더 유리할 수 있어요. 물론 원금 손실 가능성도 있으니 본인의 성향에 맞게 골라야 해요.
      </p>

      <Steps steps={STEPS} />

      <CategoryButton
        label="퇴직금 IRP 계좌 개설 방법"
        href="/w/퇴직금-IRP-계좌"
      />

      <RelatedArticles items={RELATED} />

      <Divider />

      {/* 섹션 3: 연금 수령 시뮬레이터 */}
      <SectionBadge>계산기</SectionBadge>
      <H2>연금 수령액, 미리 계산해 보세요</H2>

      <p style={body}>
        퇴직금 규모와 수령 기간을 바꿔가며 연간 수령액을 미리 확인해 볼 수 있어요. 운용 수익은 포함되지 않은 단순 분할 기준이에요.
      </p>
      <p style={body}>
        세액공제는 본인이 IRP에 추가로 납입한 금액에 대해 적용돼요. 퇴직금 자체가 아니라 '추가 납입분'에 한해서 돌려받는 거라서, 납입 금액에 따라 실제 혜택이 달라질 수 있어요.
      </p>

      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 연금 수령 시 퇴직소득세 30% 감면. 세액공제는 IRP+연금저축 합산 연 900만원 한도."
      />

      <Divider />

      {/* 섹션 4: 필요 서류 */}
      <SectionBadge>서류</SectionBadge>
      <H2>IRP 계좌 개설에 필요한 서류예요</H2>

      <p style={body}>
        개인형 IRP 계좌 개설은 앱으로도 할 수 있어요. 신분증과 인증서(공동인증서 또는 금융인증서)만 있으면 대부분 비대면으로 처리돼요. 퇴직 확인서는 회사에서 받아야 하니 퇴직 처리 전에 미리 챙겨두세요.
      </p>

      <DocTable docs={DOCS} />

      <BorderBox>
        수익자 지정은 선택이지만, 사망 시 IRP 잔액이 상속인에게 돌아가는 방식을 미리 정해두는 거예요. 나중에 추가로 지정해도 되니 급하게 챙기지 않아도 괜찮아요.
      </BorderBox>

      <Divider />

      {/* 섹션 5: 체크리스트 */}
      <SectionBadge>체크리스트</SectionBadge>
      <H2>IRP 수령 전 꼭 챙겨야 할 5가지예요</H2>

      <p style={body}>
        IRP는 장기 계좌라서 처음 설정을 잘못하면 수십 년 후에 손해가 생겨요. 아래 5가지는 빠뜨리지 말고 챙겨두세요.
      </p>

      <Checklist items={CHECKLIST} />

      <p style={body}>
        수수료는 생각보다 크게 차이 나요. 증권사는 연 0.2% 수준인데, 은행은 0.5%까지 올라가는 경우도 있어요. 퇴직금 5,000만원을 20년 운용한다면 수수료 차이만으로 수백만원이 갈릴 수 있어요. 금융감독원의 <a href="https://www.fss.or.kr" style={{ color: "#1D9E75" }}>퇴직연금 비교공시</a>에서 금융기관별로 비교해볼 수 있어요.
      </p>

      <ArticleAd position="mid" />

      <Divider />

      {/* FAQ */}
      <SectionBadge>자주 묻는 것들</SectionBadge>
      <FAQ items={FAQS} />

      <Divider />

      {/* 출처 */}
      <References groups={REFERENCES} />

      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법을 바탕으로 작성됐어요. 최신 기준은 금융감독원(1332)에서 확인하세요." />
    </ArticleLayout>
  );
}
