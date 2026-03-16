"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직 후 14일 이내에 퇴직금이 지급돼야 해요" },
  { id: "c2", label: "2022년 4월부터 퇴직금은 원칙적으로 IRP 계좌로 입금돼요" },
  { id: "c3", label: "55세 이상이거나 소액(300만 원 이하)이면 일반 계좌로 받을 수 있어요" },
  { id: "c4", label: "IRP에 넣으면 세금이 유예되고, 연금 수령 시 세금이 30~40% 줄어요" },
];

const CHECKLIST = [
  "IRP 계좌 개설 여부 확인 — 퇴직 전에 미리 만들어두면 수령이 빨라요",
  "퇴직소득원천징수영수증 — 세금 계산 내역 확인용",
  "퇴직연금 적립금 확인 — DB형은 회사, DC형은 운용사에 문의",
  "일시금 수령 예외 해당 여부 — 55세 이상, 300만 원 이하 등",
  "수령 후 세금 신고 일정 — 연금 전환 시 종합소득세 신고 필요 여부 확인",
];

const FAQS = [
  {
    q: "퇴직금을 꼭 IRP로 받아야 하나요?",
    a: "2022년 4월부터 원칙적으로 IRP 계좌로 지급하도록 바뀌었어요. 다만 55세 이상이거나 퇴직금이 300만 원 이하면 일반 계좌로 받을 수 있죠.",
  },
  {
    q: "IRP로 받으면 바로 꺼낼 수 있나요?",
    a: "퇴직 사유로 입금된 금액은 전액 인출이 가능해요. IRP 해지 신청을 하면 보통 2~3영업일 내에 일반 계좌로 이체되죠.",
  },
  {
    q: "일시금과 연금, 세금 차이가 얼마나 되나요?",
    a: "일시금은 퇴직소득세를 전액 내지만, 연금으로 받으면 퇴직소득세의 60~70%만 부담해요. 수령 기간이 10년을 넘으면 더 줄어들죠.",
  },
  {
    q: "퇴직금 수령 방법을 나중에 바꿀 수 있나요?",
    a: "IRP에 넣은 뒤 연금 수령으로 전환하거나, 반대로 해지해서 일시금으로 받는 것 모두 가능해요. 단, 해지 시점에 세금 정산이 이뤄지죠.",
  },
  {
    q: "회사가 퇴직금을 안 줘요. 어떻게 하나요?",
    a: "퇴직 후 14일이 지나도 지급되지 않으면 고용노동부(1350)에 임금체불 신고를 하세요. 지연이자 연 20%도 청구할 수 있죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여 보장법 — 퇴직금 지급 방법 및 IRP 의무", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "소득세법 — 퇴직소득세 계산 및 세율", url: "https://www.law.go.kr/법령/소득세법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 — 퇴직급여 제도 안내", url: "https://www.moel.go.kr" },
      { label: "금융감독원 — IRP 계좌 비교 서비스", url: "https://www.fss.or.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-일시금-수령-방법",
    title: "퇴직금 일시금 수령 방법과 신청 절차",
    description: "IRP 의무 예외에 해당하면 일시금으로 바로 받을 수 있어요.",
  },
  {
    slug: "퇴직금-IRP-수령방법",
    title: "퇴직금 IRP 수령 방법과 인출 절차",
    description: "IRP에 들어온 퇴직금을 꺼내는 구체적인 방법을 정리했어요.",
  },
  {
    slug: "퇴직금-세금",
    title: "퇴직금 세금, 얼마나 떼이나요?",
    description: "퇴직소득세 계산 구조와 절세 방법을 알아보세요.",
  },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={
        <Sidebar
          heading="퇴직금 가이드"
          items={퇴직금_SIDEBAR}
          currentSlug="퇴직금-수령방법"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 수령방법 · IRP</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 수령 방법,<br />
        어떤 선택이 유리할까?
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;퇴직금을 일시금으로 받을까, IRP에 넣을까?&rdquo; 막상 퇴직하려니 수령 방법부터 고민이죠.
        2022년 4월부터 <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여 보장법</a>이 바뀌면서 퇴직금은 원칙적으로 IRP 계좌로 입금돼요.
        일시금으로 바로 쓸 수도 있고, 연금으로 나눠 받으면 세금이 줄어들기도 하죠.
        지금부터 수령 방법별 차이, 세금, 절차를 순서대로 정리해드릴게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 */}
      <H2>퇴직금을 받는 방법에는 어떤 게 있나요?</H2>
      <p style={body}>
        크게 두 가지예요. <strong>IRP(개인형퇴직연금) 계좌</strong>로 받는 방법과, 예외 조건에 해당할 때 <strong>일반 계좌</strong>로 직접 받는 방법이죠. 2022년 4월 이후 퇴직하는 근로자는 퇴직금 전액이 IRP로 입금되는 게 원칙이에요.
      </p>
      <p style={body}>
        IRP로 받은 뒤에는 두 가지 선택지가 생겨요. 바로 해지해서 일시금으로 꺼내거나, 55세 이후까지 유지했다가 연금으로 나눠 받는 거죠. 일시금은 퇴직소득세 전액을 내야 하고, 연금은 세금이 30~40% 줄어드는 구조예요.
      </p>
      <p style={body}>
        예외적으로 IRP 없이 일반 계좌로 받을 수 있는 경우가 있어요. <strong>55세 이상</strong>이거나, 퇴직금이 <strong>300만 원 이하</strong>인 경우죠. 이때는 회사가 근로자의 일반 계좌로 직접 송금해요.
      </p>

      <GreenBox title="수령 방법 비교">
        IRP 수령 후 일시금 인출 → 퇴직소득세 전액 부담<br />
        IRP 유지 후 연금 수령 → 퇴직소득세 60~70%만 부담<br />
        일반 계좌 직접 수령 → 55세 이상 또는 300만 원 이하만 가능
      </GreenBox>

      <Divider />

      {/* 섹션 2 */}
      <H2>일시금 수령과 IRP 수령, 뭐가 다른가요?</H2>
      <p style={body}>
        가장 큰 차이는 <strong>세금</strong>이에요. 일시금으로 한 번에 꺼내면 퇴직소득세를 그 자리에서 전부 내야 하죠. 반면 IRP에 넣어두고 55세 이후 연금으로 받으면 퇴직소득세의 60~70%만 내면 돼요. 수령 기간이 10년을 넘기면 세금이 더 줄어들죠.
      </p>
      <p style={body}>
        두 번째 차이는 <strong>운용 수익</strong>이에요. IRP에 넣어두면 예금, 펀드, ETF 등으로 운용할 수 있어서 추가 수익을 기대할 수 있죠. 물론 원금 손실 가능성이 있는 상품도 있으니 안정형 상품 위주로 선택하는 분이 많아요.
      </p>
      <p style={body}>
        당장 목돈이 필요한 상황이라면 일시금이 맞고, 노후 자금으로 굴리고 싶다면 IRP 유지가 유리하죠. 선택은 본인의 재정 상황에 따라 달라지니까, 세금 차이를 먼저 계산해보는 게 좋아요.
      </p>

      <BorderBox title="IRP 해지는 간단해요">
        퇴직 사유로 IRP에 입금된 금액은 전액 인출이 가능해요.<br />
        은행이나 증권사 앱에서 해지 신청하면 2~3영업일 내로 일반 계좌에 들어오죠.
      </BorderBox>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 */}
      <H2>퇴직금 수령 시 세금은 어떻게 처리되나요?</H2>
      <p style={body}>
        퇴직금에는 <strong>퇴직소득세</strong>가 붙어요. <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법</a>에 따라 근속연수, 퇴직금 총액을 기준으로 계산하죠. 근속연수가 길수록 공제 금액이 커져서 세금이 줄어드는 구조예요.
      </p>
      <p style={body}>
        IRP로 받으면 세금이 바로 빠지지 않아요. 퇴직소득세가 &ldquo;유예&rdquo;되는 거죠. 나중에 인출할 때 비로소 세금이 정산돼요. 연금으로 나눠 받으면 유예된 세금의 60~70%만 내면 되니까 실질적으로 절세 효과가 크죠.
      </p>
      <p style={body}>
        일반 계좌로 직접 받는 경우에는 회사가 퇴직소득세를 원천징수한 뒤 나머지 금액을 송금해요. 별도로 세금 신고를 할 필요는 없고, 퇴직소득원천징수영수증으로 내역을 확인하면 되죠.
      </p>

      <SectionBadge>수령 전 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* 섹션 4 */}
      <H2>IRP 계좌를 미리 만들어야 하나요?</H2>
      <p style={body}>
        퇴직 전에 IRP 계좌를 미리 개설해두면 수령이 빨라져요. 회사가 퇴직금을 지급할 때 IRP 계좌 정보가 필요하거든요. 퇴직 후에 급하게 만들면 지급이 며칠 늦어질 수 있죠.
      </p>
      <p style={body}>
        IRP는 은행, 증권사, 보험사 어디서든 개설할 수 있어요. 수수료가 무료인 곳이 많으니 비교해보고 고르면 되죠. 모바일 앱으로 10분이면 개설이 끝나요.
      </p>
      <p style={body}>
        이미 IRP를 가지고 있다면 새로 만들 필요 없이 기존 계좌 정보를 회사에 알려주면 돼요. 다만 DC형 퇴직연금 가입자라면 운용 중인 IRP와 퇴직금 수령용 IRP가 같은 계좌인지 확인해보세요.
      </p>

      <Divider />

      {/* 섹션 5 */}
      <H2>수령 방법 선택 시 주의할 점은?</H2>
      <p style={body}>
        첫째, <strong>당장 쓸 돈이 필요한지</strong>부터 따져보세요. 주택 구입이나 의료비 같은 급한 지출이 있다면 일시금이 현실적이에요. 여유가 있다면 IRP에 넣어두고 절세 혜택을 받는 게 유리하죠.
      </p>
      <p style={body}>
        둘째, <strong>퇴직소득세를 미리 계산</strong>해보세요. <a href="https://www.fss.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>금융감독원</a> 퇴직연금 비교 사이트나 국세청 홈택스에서 예상 세금을 확인할 수 있어요. 일시금과 연금의 세금 차이를 숫자로 비교하면 선택이 훨씬 쉬워지죠.
      </p>
      <p style={body}>
        셋째, <strong>퇴직금 지급 기한</strong>을 기억하세요. 퇴사일로부터 14일 이내에 지급되는 게 원칙이에요. 기한을 넘기면 회사는 <a href="/w/퇴직금-지연이자" style={{ color: "#1D9E75", textDecoration: "underline" }}>연 20% 지연이자</a>를 물어야 하죠. 14일이 지나도 입금이 안 되면 <a href="https://www.moel.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부</a>(1350)에 신고하세요.
      </p>

      <SectionBadge>체크 포인트</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="퇴직금 수령 준비가 잘 되어 있네요. IRP 계좌를 확인하고 회사에 수령 절차를 문의하세요."
        partialMatchText="일부 항목을 더 확인해보세요. 수령 방법에 따라 세금이 달라지니 미리 계산해보는 게 좋아요."
      />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 수령 방법에 관해 실제로 자주 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여 보장법과 소득세법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니, 최신 기준은 고용노동부(moel.go.kr)나 금융감독원(fss.or.kr)에서 확인하세요." />
    </ArticleLayout>
  );
}
