"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "연금저축계좌(연금저축펀드·연금저축보험 등)를 가지고 있어요" },
  { id: "c2", label: "퇴직금을 IRP에서 연금저축계좌로 이전하고 싶어요" },
  { id: "c3", label: "IRP와 연금저축계좌의 세금 차이가 궁금해요" },
  { id: "c4", label: "55세 이후 연금 수령을 계획하고 있어요" },
];

const CHECKLIST = [
  "연금저축계좌 가입 여부 확인 — 은행·증권사·보험사",
  "IRP 퇴직금 이체 확인 — 회사에서 IRP로 입금됐는지",
  "IRP → 연금저축 이전 가능 여부 — 금융기관에 문의",
  "세금 비교 — IRP 연금 수령 vs 연금저축계좌 수령 세율 차이",
  "수령 계획 수립 — 55세 이후 수령 기간·금액 설정",
];

const FAQS = [
  {
    q: "퇴직금을 직접 연금저축계좌로 받을 수 있나요?",
    a: "원칙적으로 퇴직금은 IRP로 먼저 받아야 해요. 연금저축계좌로 직접 이체는 안 되고, IRP에 입금된 뒤 연금저축으로 이전하는 절차를 밟아야 하죠.",
  },
  {
    q: "IRP에서 연금저축으로 이전하면 세금이 달라지나요?",
    a: "퇴직금 부분은 어디서 수령하든 퇴직소득세가 적용돼요. 다만 연금저축계좌의 자체 납입분(세액공제 받은 부분)은 연금소득세가 따로 붙으니, 계좌 내 자금 구분이 중요하죠.",
  },
  {
    q: "연금저축계좌가 IRP보다 유리한 점이 있나요?",
    a: "운용 자유도가 더 높을 수 있어요. 연금저축펀드는 주식 비중 100%까지 가능하지만, IRP는 위험자산 비중이 70%로 제한되죠. 적극적 투자를 원하면 연금저축이 유리할 수 있어요.",
  },
  {
    q: "연금저축계좌와 IRP를 둘 다 가지고 있으면 어떻게 하나요?",
    a: "퇴직금은 IRP로 받고, 개인 납입은 연금저축으로 하는 식으로 나눠 관리하면 돼요. 세액공제 한도(합산 연 900만 원)를 최대한 활용할 수 있죠.",
  },
  {
    q: "연금저축계좌로 수령하면 세금 혜택이 더 큰가요?",
    a: "퇴직금 수령 시 세율 자체는 IRP와 동일해요. 차이가 나는 건 운용 수익에 대한 세율과 투자 가능 상품 범위이니, 본인의 투자 성향에 맞춰 선택하세요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "소득세법 — 연금소득세 및 퇴직소득세", url: "https://www.law.go.kr/법령/소득세법" },
      { label: "근로자퇴직급여 보장법 — IRP 및 연금 수령", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "금융감독원 — 연금저축·IRP 비교 안내", url: "https://www.fss.or.kr" },
      { label: "국세청 — 연금소득 과세 안내", url: "https://www.nts.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-연금-전환",
    title: "퇴직금 연금 전환",
    description: "연금으로 전환하는 방법과 세금 혜택을 정리했어요.",
  },
  {
    slug: "퇴직금-IRP-계좌",
    title: "퇴직금 IRP 계좌",
    description: "IRP 계좌 개설 방법과 수수료를 안내해요.",
  },
  {
    slug: "퇴직금-세금-절세-방법-IRP-연말정산",
    title: "퇴직금 절세 IRP 활용",
    description: "IRP와 연말정산을 활용한 절세 방법을 안내해요.",
  },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={
        <Sidebar
          heading="퇴직금 가이드"
          items={퇴직금_SIDEBAR}
          currentSlug="퇴직금-연금저축계좌-수령"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 연금저축 · IRP 비교</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 연금저축계좌 수령,<br />
        IRP와 어떻게 다른가요?
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;연금저축계좌로 퇴직금을 받을 수 있나요? IRP와 뭐가 다른 거예요?&rdquo;<br />
        퇴직금은 원칙적으로 IRP로 먼저 받아야 해요. 연금저축계좌로 직접 이체는 안 되고, IRP에서 연금저축으로 이전하는 방식이죠.
        두 계좌의 차이, 세금, 어떤 게 유리한지 비교해드릴게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>연금저축계좌로 퇴직금을 받을 수 있나요?</H2>
      <p style={body}>
        직접은 안 돼요. <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여 보장법</a>에 따라 퇴직금은 <strong>IRP 계좌</strong>로 이체하는 게 원칙이에요. 회사가 퇴직금을 지급할 때 근로자의 IRP 계좌로 보내죠.
      </p>
      <p style={body}>
        IRP에 입금된 퇴직금을 연금저축계좌로 이전하는 건 가능해요. 다만 금융기관마다 이전 절차와 조건이 다르니, 가입한 곳에 먼저 문의하세요. 이전 시 퇴직소득세 이연 혜택은 유지되죠.
      </p>
      <p style={body}>
        예외적으로 IRP 의무 이체가 면제되는 경우(55세 이상 퇴직, 300만 원 이하 소액 등)에는 일반 계좌로 받을 수 있지만, 이때도 연금저축계좌로 직접 이체되는 건 아니에요.
      </p>

      <GreenBox title="퇴직금 수령 경로">
        회사 → <strong>IRP 계좌</strong> (의무) → 연금저축계좌 (이전 가능)<br />
        회사 → 연금저축계좌 (직접 이체 불가)
      </GreenBox>

      <SectionBadge>내 상황 체크</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="IRP에서 연금저축으로 이전을 검토해보세요. 가입 금융기관에 이전 절차를 문의하세요."
        partialMatchText="먼저 IRP 개설과 퇴직금 이체를 확인한 뒤 이전 여부를 결정하세요."
      />

      <Divider />

      <H2>IRP와 연금저축계좌의 차이는?</H2>
      <p style={body}>
        가장 큰 차이는 <strong>투자 제한</strong>이에요. IRP는 위험자산(주식형 펀드 등) 비중이 <strong>70%까지</strong>로 제한되지만, 연금저축펀드는 <strong>100%까지</strong> 가능하죠. 적극적으로 투자하고 싶다면 연금저축이 자유로워요.
      </p>
      <p style={body}>
        <strong>세액공제 한도</strong>는 IRP와 연금저축 합산 연 900만 원(총급여 5,500만 원 이하: 16.5% 공제, 초과: 13.2%)이에요. 연금저축 단독으로는 600만 원까지만 공제받을 수 있고, IRP에 추가 납입해야 900만 원 한도를 채울 수 있죠.
      </p>
      <p style={body}>
        수수료 구조도 다를 수 있어요. IRP는 은행·증권사·보험사 모두 개설 가능한데, 기관마다 수수료와 운용 상품이 달라요. 연금저축도 마찬가지니까 두 계좌 모두 수수료를 비교해보세요.
      </p>

      <BorderBox title="IRP vs 연금저축 핵심 비교">
        <strong>위험자산 한도</strong>: IRP 70% / 연금저축 100%<br />
        <strong>세액공제</strong>: 합산 900만 원 (연금저축 단독 600만 원)<br />
        <strong>퇴직금 직접 수령</strong>: IRP 가능 / 연금저축 불가
      </BorderBox>

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>연금저축계좌 수령 시 세금은?</H2>
      <p style={body}>
        퇴직금 부분을 연금으로 수령할 때는 <strong>퇴직소득세의 60~70%</strong>만 내면 돼요. 이건 IRP에서 수령하든 연금저축에서 수령하든 동일하죠. 10년 이상 수령하면 60%, 10년 미만이면 70%예요.
      </p>
      <p style={body}>
        차이가 나는 건 <strong>개인 납입분</strong>이에요. 연금저축에 본인이 추가로 납입한 금액(세액공제 받은 부분)은 연금 수령 시 연금소득세(3.3~5.5%)가 붙죠. IRP 추가 납입분도 마찬가지예요.
      </p>
      <p style={body}>
        퇴직금 부분과 개인 납입분이 섞여 있으면 세금 처리가 복잡해질 수 있어요. 금융기관에서 자동으로 구분 관리해주지만, 수령 시 세금 구조를 미리 파악해두면 혼란을 줄일 수 있죠.
      </p>

      <Divider />

      <H2>어떤 계좌가 더 유리한가요?</H2>
      <p style={body}>
        투자를 적극적으로 하고 싶다면 <strong>연금저축</strong>이 유리해요. 주식형 비중을 100%까지 가져갈 수 있으니, 장기적으로 높은 수익을 기대할 수 있죠. 다만 손실 위험도 크다는 점을 감안해야 해요.
      </p>
      <p style={body}>
        안정적 운용을 원하면 <strong>IRP</strong>가 나을 수 있어요. 위험자산 한도(70%)가 있어서 강제로 안전자산 비중을 30% 이상 유지하게 되니까요. 예금·채권형 상품으로 원금 보전에 집중할 수도 있죠.
      </p>
      <p style={body}>
        두 계좌를 병행하는 게 가장 효율적이에요. 퇴직금은 IRP에 두고, 개인 추가 납입은 연금저축으로 나눠서 세액공제 한도(900만 원)를 최대한 채우는 전략이죠. <a href="/w/퇴직금-세금-절세-방법-IRP-연말정산" style={{ color: "#1D9E75", textDecoration: "underline" }}>IRP 절세 방법</a>에서 더 자세히 다루고 있어요.
      </p>

      <Divider />

      <H2>수령 후 계좌 관리 방법은?</H2>
      <p style={body}>
        연금 수령을 시작한 뒤에도 나머지 잔액은 계속 운용돼요. 수익률에 따라 수령액이 달라질 수 있으니, 운용 상품을 주기적으로 점검하세요. 수령 기간이 길수록 안정적 상품 비중을 높이는 게 일반적이죠.
      </p>
      <p style={body}>
        계좌를 아예 해지하면 퇴직소득세가 100% 부과되니 주의하세요. 급하게 목돈이 필요해도 전액 해지보다는 일부 인출(법정 사유 해당 시)을 먼저 검토하는 게 세금 면에서 유리해요.
      </p>
      <p style={body}>
        금융기관 변경(계좌 이전)도 가능해요. 수수료가 비싸거나 운용 상품이 마음에 안 들면 다른 금융기관으로 이전하면 되죠. 이전 시 세금 이연 혜택은 유지되니 부담 없이 비교해보세요.
      </p>

      <SectionBadge>수령 준비 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 연금저축계좌 수령에 대해 자주 나오는 질문이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 소득세법을 바탕으로 작성됐어요. 금융 상품과 세율은 변동될 수 있으니, 가입 금융기관에 확인하세요." />
    </ArticleLayout>
  );
}
