"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직금을 IRP 계좌로 받았거나 받을 예정이에요" },
  { id: "c2", label: "55세 이후에 연금으로 수령할 계획이 있어요" },
  { id: "c3", label: "세금을 줄이고 싶어요" },
  { id: "c4", label: "당장 목돈이 필요한 상황은 아니에요" },
];

const CHECKLIST = [
  "IRP 계좌 개설 — 퇴직금 수령 전에 개설 필요",
  "퇴직금 이체 확인 — 회사에서 IRP로 입금됐는지 확인",
  "연금 수령 개시 — 55세 이후 금융기관에 연금 전환 신청",
  "수령 기간 설정 — 최소 10년 이상 (세금 혜택 극대화)",
  "수령 후 세금 확인 — 연금소득세 원천징수 확인",
];

const FAQS = [
  {
    q: "연금으로 받으면 세금이 얼마나 줄어드나요?",
    a: "퇴직소득세의 60~70%만 내면 돼요. 연금 수령 기간이 길수록 세율이 더 낮아지죠. 10년 이상 나눠 받으면 절세 효과가 극대화돼요.",
  },
  {
    q: "연금 전환 후에 일시금으로 바꿀 수 있나요?",
    a: "가능하지만, 일시금으로 인출하면 퇴직소득세가 100% 부과돼요. 연금 전환의 세금 혜택이 사라지니까 신중하게 결정하세요.",
  },
  {
    q: "연금은 매달 얼마씩 받나요?",
    a: "IRP에 쌓인 금액을 수령 기간으로 나눈 금액이에요. 예를 들어 5,000만 원을 10년간 받으면 월 약 42만 원이죠. 운용 수익이 붙으면 금액이 달라질 수 있어요.",
  },
  {
    q: "IRP 없이 연금저축계좌로도 가능한가요?",
    a: "가능하지만 조건이 달라요. 퇴직금은 IRP로 받는 게 원칙이고, 연금저축계좌로 이전하려면 별도 절차가 필요하죠. 세금 혜택도 차이가 있어요.",
  },
  {
    q: "55세 전에 퇴직하면 연금 전환이 안 되나요?",
    a: "IRP에 넣어두고 55세까지 기다리면 돼요. 55세가 될 때까지 운용하면서 수익도 쌓을 수 있죠. 다만 급하게 필요하면 중도 인출(법정 사유만)도 가능해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여 보장법 — IRP 및 연금 수령", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "소득세법 — 퇴직소득세 및 연금소득세", url: "https://www.law.go.kr/법령/소득세법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "금융감독원 — 퇴직연금 안내", url: "https://www.fss.or.kr" },
      { label: "국세청 — 연금소득세 안내", url: "https://www.nts.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-연금저축계좌-수령",
    title: "연금저축계좌 수령 방법",
    description: "연금저축계좌와 IRP의 차이, 수령 시 세금을 비교해요.",
  },
  {
    slug: "irp-퇴직금-인출",
    title: "IRP 퇴직금 인출",
    description: "IRP에서 퇴직금을 인출하는 방법과 세금 절감법을 안내해요.",
  },
  {
    slug: "퇴직금-일시금-세금",
    title: "퇴직금 일시금 세금",
    description: "일시금으로 받을 때 세금이 얼마나 되는지 안내해요.",
  },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={
        <Sidebar
          heading="퇴직금 가이드"
          items={퇴직금_SIDEBAR}
          currentSlug="퇴직금-연금-전환"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 연금 전환 · 절세</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 연금 전환,<br />
        일시금보다 유리한가요?
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;퇴직금을 한꺼번에 받을까, 연금으로 나눠 받을까?&rdquo;<br />
        세금만 놓고 보면 연금이 유리해요.
        퇴직소득세의 60~70%만 내면 되니까요.
        연금 전환 방법, 수령 기간, 일시금과의 세금 차이를 비교해서 정리해드릴게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>퇴직금을 연금으로 전환하는 방법은?</H2>
      <p style={body}>
        퇴직할 때 퇴직금을 <strong>IRP 계좌</strong>로 받으면 연금 전환 준비가 끝나요. 이후 55세가 되면 금융기관에 연금 수령을 신청하면 되죠. 매달 또는 매분기 일정 금액을 나눠 받는 구조예요.
      </p>
      <p style={body}>
        IRP에 입금된 퇴직금은 운용 기간 동안 예금, 펀드, ETF 등에 투자할 수 있어요. 운용 수익에 대해서는 퇴직소득세가 이연(뒤로 미뤄짐)되기 때문에 복리 효과를 누릴 수 있죠. 수수료와 운용 상품은 가입한 금융기관에 따라 달라요.
      </p>
      <p style={body}>
        연금 수령 개시 후에는 <strong>최소 10년 이상</strong> 나눠 받아야 세금 혜택이 극대화돼요. 10년 미만으로 받으면 세율이 좀 더 높아지니까, 수령 기간을 설정할 때 이 점을 꼭 고려하세요.
      </p>

      <GreenBox title="연금 전환 핵심 요약">
        1. 퇴직금 → <strong>IRP 계좌</strong>로 수령<br />
        2. <strong>55세 이후</strong> 연금 수령 개시 신청<br />
        3. <strong>10년 이상</strong> 나눠 받으면 세금 혜택 극대화
      </GreenBox>

      <SectionBadge>내 상황 체크</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="연금 전환이 유리할 수 있어요. IRP 계좌를 확인하고 수령 계획을 세워보세요."
        partialMatchText="일부 조건이 부족해요. 당장 목돈이 필요하다면 일시금 수령도 검토하세요."
      />

      <Divider />

      <H2>연금 전환 시 세금이 줄어드나요?</H2>
      <p style={body}>
        줄어들어요. 일시금으로 받으면 퇴직소득세 100%를 내지만, 연금으로 나눠 받으면 <strong>60~70%만</strong> 내면 되죠. <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법</a>에서 연금 수령 시 퇴직소득세의 일정 비율만 부과하도록 정하고 있어요.
      </p>
      <p style={body}>
        수령 기간이 길수록 세율이 낮아져요. 10년까지는 퇴직소득세의 70%를 내고, 10년을 넘기면 60%만 내죠. 예를 들어 퇴직소득세가 500만 원이면, 10년 이상 연금 수령 시 300만 원만 내는 셈이에요.
      </p>
      <p style={body}>
        IRP에서 추가 운용한 수익(이자·배당)에 대해서도 세금이 낮아져요. 일반 금융소득세(15.4%)가 아닌 연금소득세(3.3~5.5%)가 적용되니까, 장기 운용할수록 세금 차이가 커지죠.
      </p>

      <BorderBox title="일시금 vs 연금 세금 비교 예시">
        퇴직소득세 500만 원 기준:<br />
        <strong>일시금</strong>: 500만 원 전액 납부<br />
        <strong>연금 (10년 이상)</strong>: 약 300만 원 (60%)<br />
        → 차이: <strong>약 200만 원 절세</strong>
      </BorderBox>

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>연금 수령 기간과 금액은 어떻게 되나요?</H2>
      <p style={body}>
        수령 기간은 본인이 설정할 수 있어요. 다만 세금 혜택을 최대로 받으려면 <strong>10년 이상</strong>으로 설정하는 게 좋죠. 기간을 짧게 하면 매달 받는 금액은 커지지만 세율이 높아져요.
      </p>
      <p style={body}>
        월 수령액은 IRP 잔액을 수령 기간(개월 수)으로 나눈 금액이에요. 잔액 5,000만 원을 10년(120개월)간 받으면 월 약 42만 원이죠. 운용 수익이 붙으면 실제 수령액이 달라질 수 있고요.
      </p>
      <p style={body}>
        연금 수령 중에도 IRP의 나머지 잔액은 계속 운용돼요. 수익률에 따라 총 수령액이 처음 예상보다 많아질 수 있죠. 반대로 손실이 나면 줄어들 수도 있으니 안정적인 운용 상품을 선택하는 게 중요해요.
      </p>

      <Divider />

      <H2>연금 전환 후 취소할 수 있나요?</H2>
      <p style={body}>
        취소라기보다 <strong>일시금 인출</strong>로 전환할 수 있어요. 연금 수령 중에 급하게 목돈이 필요하면 남은 잔액을 한꺼번에 인출할 수 있죠. 다만 이때 퇴직소득세가 100%로 다시 부과돼요.
      </p>
      <p style={body}>
        이미 연금으로 받은 부분은 돌이킬 수 없고, 앞으로 받을 부분만 일시금으로 전환하는 거예요. 그래서 연금 전환을 결정할 때 &ldquo;당분간 목돈이 필요한 일은 없을까?&rdquo;를 충분히 고민해보세요.
      </p>
      <p style={body}>
        법정 사유(6개월 이상 요양, 파산 등)에 해당하면 중도 인출도 가능하긴 해요. 이 경우에도 인출 금액에 대해 세금이 부과되니까, IRP 계좌 운영사에 미리 세금 시뮬레이션을 요청하는 게 좋죠.
      </p>

      <Divider />

      <H2>연금 전환이 유리한 경우는?</H2>
      <p style={body}>
        <strong>당장 목돈이 필요하지 않고</strong>, 노후 생활비를 꾸준히 받고 싶은 사람에게 유리해요. 세금을 30~40% 절감하면서 안정적인 소득 흐름을 만들 수 있으니까요.
      </p>
      <p style={body}>
        반대로 부채 상환, 주택 구입 등 <strong>급하게 써야 할 곳</strong>이 있다면 일시금이 현실적이에요. 세금이 조금 더 나오더라도 자금 운용의 자유도가 높으니까요. 상황에 맞게 비교하고 결정하세요.
      </p>
      <p style={body}>
        일부만 일시금으로 받고 나머지를 연금으로 전환하는 방법도 있어요. IRP에서 필요한 금액만 인출하고 나머지는 연금으로 돌리면 절세와 유동성을 동시에 챙길 수 있죠.
      </p>

      <SectionBadge>연금 전환 준비 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 연금 전환에 대해 자주 나오는 질문이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 소득세법과 근로자퇴직급여 보장법을 바탕으로 작성됐어요. 세율 변동이 있을 수 있으니, 최신 기준은 국세청(nts.go.kr)에서 확인하세요." />
    </ArticleLayout>
  );
}
