"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직금을 받을 예정이거나 이미 IRP에 이체했어요" },
  { id: "c2", label: "퇴직소득세를 줄이고 싶어요" },
  { id: "c3", label: "연말정산에서 세액공제를 받을 수 있는지 궁금해요" },
  { id: "c4", label: "55세 이후 연금 수령을 고려하고 있어요" },
];

const FAQS = [
  {
    q: "IRP에 넣기만 하면 세금이 줄어드나요?",
    a: "넣는 것만으로는 안 돼요. 55세 이후에 10년 이상 나눠서 연금으로 받아야 퇴직소득세의 30~40% 감면을 받을 수 있죠.",
  },
  {
    q: "IRP 세액공제 한도가 얼마인가요?",
    a: "IRP에 추가 납입하는 금액에 대해 연 최대 900만 원까지 세액공제 대상이에요. 총급여 5,500만 원 이하면 16.5%, 초과면 13.2% 공제율이 적용되죠.",
  },
  {
    q: "퇴직금을 IRP에 넣은 후 바로 빼면?",
    a: "퇴직소득세가 전액 부과되고, 추가로 기타소득세(16.5%)까지 붙을 수 있어요. 절세 효과가 완전히 사라지죠.",
  },
  {
    q: "연말정산에서 퇴직금 관련 공제를 받으려면?",
    a: "퇴직금 자체는 분류과세라 연말정산과 무관하지만, IRP에 추가 납입한 금액은 세액공제 대상이에요. 퇴직 후 재취업했다면 다음 해 연말정산에 반영하세요.",
  },
  {
    q: "IRP 운용 수익에도 세금이 붙나요?",
    a: "연금으로 받으면 연금소득세(3.3~5.5%)만 내면 돼요. 일시금으로 빼면 기타소득세(16.5%)가 부과되죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "소득세법 제59조의3 — 연금계좌 세액공제", url: "https://www.law.go.kr/법령/소득세법" },
      { label: "근로자퇴직급여보장법 — IRP 제도", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "국세청 — IRP 세액공제 안내", url: "https://www.nts.go.kr" },
      { label: "금융감독원 — IRP 가입·운용 안내", url: "https://www.fss.or.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-IRP-이전-의무가입-세액공제-혜택",
    title: "IRP 세액공제 혜택과 의무가입 기준",
    description: "IRP 의무가입 대상과 세액공제 혜택을 정리했어요.",
  },
  {
    slug: "퇴직금-세금-환급",
    title: "퇴직금 세금 환급, 받을 수 있는 경우는?",
    description: "IRP 연금 수령이나 과다 원천징수 시 환급받는 방법이에요.",
  },
  {
    slug: "퇴직금-세금",
    title: "퇴직금 세금, 얼마나 떼이나요?",
    description: "퇴직소득세의 기본 구조와 계산법을 정리했어요.",
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
          currentSlug="퇴직금-세금-절세-방법-IRP-연말정산"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 절세 · IRP · 연말정산</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 세금 줄이는 방법<br />
        IRP와 연말정산 활용법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;퇴직금에서 세금을 떼간다는데, 줄일 방법이 없나요?&rdquo;<br />
        있죠. <strong>IRP(개인형 퇴직연금)</strong>를 활용하면 퇴직소득세의 <strong>30~40%</strong>를 절감할 수 있어요.
        거기에 IRP 추가 납입으로 <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법 제59조의3</a>에 따른 세액공제까지 받으면 이중 절세가 가능하죠.
        IRP 절세 구조, 연말정산 활용법, 주의할 점까지 정리해드릴게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 */}
      <H2>퇴직금 세금을 줄일 수 있는 방법이 있나요?</H2>
      <p style={body}>
        가장 확실한 방법은 퇴직금을 <strong>IRP에 이체하고 연금으로 수령</strong>하는 거예요. 일시금으로 받으면 퇴직소득세 100%를 내지만, IRP에서 55세 이후 10년 이상 나눠 받으면 60~70%만 내면 되거든요.
      </p>
      <p style={body}>
        두 번째 방법은 IRP에 <strong>추가 납입</strong>을 해서 세액공제를 받는 거예요. 퇴직금과 별개로 본인이 추가로 넣는 금액에 대해 연 최대 900만 원까지 세액공제가 적용되죠. 총급여 5,500만 원 이하면 <strong>16.5%</strong>, 초과면 <strong>13.2%</strong> 공제율이에요.
      </p>
      <p style={body}>
        세 번째는 <strong>근속연수를 늘리는 것</strong>이에요. 근속연수가 길수록 퇴직소득공제가 커지고 실효세율이 낮아지거든요. 퇴직 시기를 조절할 수 있다면 1년이라도 채우는 게 좋죠.
      </p>

      <GreenBox title="절세 방법 3가지">
        1. IRP에 넣고 <strong>연금 수령</strong> → 퇴직소득세 30~40% 절감<br />
        2. IRP <strong>추가 납입</strong> → 세액공제 (최대 연 900만 원)<br />
        3. <strong>근속연수</strong> 1년 더 채우기 → 퇴직소득공제 증가
      </GreenBox>

      <Divider />

      {/* 섹션 2 */}
      <H2>IRP로 세금을 어떻게 절세하나요?</H2>
      <p style={body}>
        퇴직금이 IRP에 이체되면 퇴직소득세가 바로 원천징수되지 않아요. 나중에 인출할 때 비로소 세금이 부과되는 &ldquo;과세이연&rdquo; 구조이죠. 그 사이에 운용수익이 생기면 세금 없이 복리로 불어나요.
      </p>
      <p style={body}>
        55세 이후 <strong>10년 이상 나눠</strong> 연금으로 받으면 퇴직소득세의 60~70%만 부과돼요. 수령 기간이 길수록 감면율이 커지죠. 10년까지는 70%, 10년 초과분부터는 60%를 적용받을 수 있어요.
      </p>
      <p style={body}>
        핵심은 &ldquo;오래 나눠 받을수록 유리하다&rdquo;는 거예요. 퇴직금이 5,000만 원이고 퇴직소득세가 200만 원이라면, 연금 수령 시 약 120~140만 원만 내면 되니까 60~80만 원을 아끼는 셈이죠.
      </p>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/퇴직금" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 */}
      <H2>연말정산에서 퇴직금 세금을 환급받을 수 있나요?</H2>
      <p style={body}>
        퇴직소득은 <strong>분류과세</strong>라서 근로소득과 합산되지 않아요. 연말정산에서 퇴직금 자체에 대한 세금 환급은 안 되죠. 하지만 <strong>IRP 추가 납입액</strong>에 대한 세액공제는 연말정산에 반영할 수 있어요.
      </p>
      <p style={body}>
        IRP에 추가 납입한 금액(연금저축 포함 최대 900만 원)은 연말정산 시 세액공제 대상이에요. 총급여 5,500만 원 이하면 <strong>16.5%</strong>(900만 원 x 16.5% = 148만 5,000원), 초과면 <strong>13.2%</strong>(900만 원 x 13.2% = 118만 8,000원)까지 공제받을 수 있죠.
      </p>
      <p style={body}>
        퇴직 후 같은 해에 재취업했다면, 새 직장에서 연말정산을 할 때 IRP 추가 납입 내역을 포함시킬 수 있어요. 퇴직 후 재취업하지 않았다면 다음 해 5월 종합소득세 신고를 통해 세액공제를 받을 수 있죠.
      </p>

      <Divider />

      {/* 섹션 4 */}
      <H2>IRP 운용 중 추가 절세 방법은?</H2>
      <p style={body}>
        IRP 안에서 발생하는 <strong>운용수익</strong>은 인출하지 않는 한 세금이 유예돼요. 예금·펀드·ETF 등으로 운용하면서 수익이 쌓여도 인출 전까지는 세금을 내지 않죠. 복리 효과를 극대화할 수 있어요.
      </p>
      <p style={body}>
        연금으로 수령할 때 운용수익에 대해서는 <strong>연금소득세(3.3~5.5%)</strong>만 내면 돼요. 일반 금융상품의 이자·배당소득세(15.4%)보다 훨씬 낮죠. 이것도 절세 효과의 일부예요.
      </p>
      <p style={body}>
        매년 IRP에 추가 납입(연 최대 1,800만 원, 세액공제 한도는 900만 원)을 꾸준히 하면 연말정산 세액공제 + 운용수익 과세이연 + 연금 수령 시 저율 과세까지 <strong>3중 절세</strong>가 가능해요. 장기적으로 보면 상당한 금액이 절약되죠.
      </p>

      <Divider />

      {/* 섹션 5 */}
      <H2>절세 방법 선택 시 주의할 점은?</H2>
      <p style={body}>
        IRP에 넣었다가 55세 이전에 인출하면 절세 효과가 <strong>사라져요</strong>. 퇴직소득세 전액이 부과되고, 운용수익에 대해서는 기타소득세(16.5%)까지 추가되죠. 급하게 쓸 돈이라면 IRP에 넣지 않는 게 나을 수 있어요.
      </p>
      <p style={body}>
        IRP 계좌의 <strong>운용 상품 선택</strong>도 중요해요. 원금 보장을 원하면 예금·RP(환매조건부채권)를, 수익을 추구하면 펀드·ETF를 선택할 수 있죠. 투자 성향에 맞지 않는 상품을 고르면 오히려 손실이 날 수 있으니 신중하게 결정하세요.
      </p>
      <p style={body}>
        세금 계산이 복잡하면 <a href="https://www.nts.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>국세청</a>(126)이나 <a href="https://www.fss.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>금융감독원</a>(1332)에서 무료 상담을 받으세요. &ldquo;내 상황에서 IRP가 유리한지, 일시금이 나은지&rdquo;를 구체적으로 안내해줘요. 세무사 상담도 한 번 받아두면 장기적으로 수백만 원 이상의 절세 효과를 볼 수 있죠.
      </p>

      <SectionBadge>내 상황에 해당되는지 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="IRP를 통한 절세를 검토할 수 있는 상황이에요. 연금 수령 조건(55세, 10년 이상)을 확인하고 계획을 세워보세요."
        partialMatchText="아직 정보가 부족해요. 국세청(126)에 상담을 받아 본인에게 맞는 절세 방법을 찾아보세요."
      />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 절세와 IRP 활용에 대해 자주 나오는 질문이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 소득세법을 바탕으로 작성됐어요. 세법 개정이 있을 수 있으니, 최신 기준은 국세청(126) 또는 홈택스에서 확인하세요." />
    </ArticleLayout>
  );
}
