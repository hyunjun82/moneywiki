"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "회사에서 퇴직연금(DB형 또는 DC형) 제도를 운영하고 있어요" },
  { id: "c2", label: "급여명세서에 퇴직연금 적립금이 표시돼요" },
  { id: "c3", label: "DC형이라면 내 퇴직연금 계좌에서 운용 현황을 확인할 수 있어요" },
  { id: "c4", label: "회사로부터 퇴직연금 규약 안내를 받은 적이 있어요" },
];

const CHECKLIST = [
  "퇴직연금 규약 — 회사가 어떤 제도를 운영하는지 확인 (인사팀에 요청)",
  "퇴직연금 적립금 현황 — DC형이면 금융기관 앱에서 직접 조회 가능",
  "IRP 계좌 개설 — 퇴직 시 퇴직금을 이체받을 계좌 (은행·증권사)",
  "운용 수익률 확인 — DC형이면 어떤 상품에 투자 중인지 점검",
  "제도 전환 동의서 — DB→DC 또는 DC→DB 전환 시 근로자 동의 필요",
];

const FAQS = [
  {
    q: "회사가 DB형인데 DC형으로 바꾸겠다고 하면 거부할 수 있나요?",
    a: "거부할 수 있어요. 퇴직연금 제도 전환은 근로자 과반수의 동의가 필요하죠. 개별 근로자 본인의 동의 없이 강제 전환은 불가능해요.",
  },
  {
    q: "DC형에서 투자를 안 하면 어떻게 되나요?",
    a: "적립금이 예금이나 원리금보장상품에 자동으로 들어가요. 원금 손실 위험은 없지만, 금리가 낮아서 물가 상승률을 못 따라갈 수 있죠. DB형이었으면 받았을 퇴직금보다 적어질 수도 있어요.",
  },
  {
    q: "IRP에 돈을 추가로 넣을 수 있나요?",
    a: "넣을 수 있어요. 퇴직금과 별개로 개인이 연간 1,800만 원까지 추가 납입할 수 있죠. 이 중 최대 900만 원까지 세액공제(총급여 5,500만 원 이하 16.5%, 초과 13.2%)를 받을 수 있어요.",
  },
  {
    q: "퇴직연금이 없는 회사는 어떻게 되나요?",
    a: "퇴직연금을 도입하지 않은 회사는 기존 퇴직금 제도를 유지하는 거예요. 퇴직 시 회사가 직접 계산해서 일시금으로 지급하죠. 법적으로 문제가 되는 건 아니에요.",
  },
  {
    q: "퇴직연금을 중간에 인출할 수 있나요?",
    a: "DC형은 법정 사유(무주택자 주택 구입, 6개월 이상 요양, 천재지변 등)에 해당하면 중도 인출이 가능해요. DB형은 중도 인출이 안 되고, 중간정산 형태로만 받을 수 있죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 제12조~제25조 — 퇴직연금제도", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "근로자퇴직급여보장법 제24조 — 개인형퇴직연금(IRP)", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 — 퇴직연금 제도 안내", url: "https://www.moel.go.kr" },
      { label: "금융감독원 — 퇴직연금 비교공시", url: "https://www.fss.or.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-DC형-계산법",
    title: "DC형 퇴직금 계산법",
    description: "DC형 퇴직연금의 적립금 계산 방식과 운용 수익 반영 방법을 정리했어요.",
  },
  {
    slug: "퇴직금-IRP-계좌",
    title: "퇴직금 IRP 계좌 개설과 수령",
    description: "IRP 계좌 개설 방법, 퇴직금 이체 절차, 세액공제 혜택을 다뤘어요.",
  },
  {
    slug: "db형-퇴직금-수령방법",
    title: "DB형 퇴직금 수령 방법",
    description: "DB형 퇴직연금의 수령 절차와 IRP 이체 방법을 정리했어요.",
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
          currentSlug="퇴직금-제도-종류"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 근로기준법 · 제도비교</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 제도 종류,<br />
        DB형·DC형·IRP 뭐가 다를까?
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;회사에서 DB형이니 DC형이니 하는데 뭐가 뭔지 모르겠어요.&rdquo;<br />
        당연히 헷갈리죠. 이름부터 영어 약자라 직관적이지 않으니까요.
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법</a>이 정한 퇴직급여 제도는 크게 세 가지예요 — <strong>퇴직금(DB형)</strong>, <strong>확정기여형(DC형)</strong>, <strong>개인형퇴직연금(IRP)</strong>.
        각 제도가 어떻게 다르고, 나한테 뭐가 유리한지, 중간에 바꿀 수 있는지까지 정리해드릴게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 */}
      <H2>퇴직금 제도에는 어떤 종류가 있나요?</H2>
      <p style={body}>
        법이 정한 퇴직급여 제도는 세 가지예요. 첫째, <strong>확정급여형(DB형, Defined Benefit)</strong>이에요. 전통적인 퇴직금 제도와 같은 구조로, 퇴직 시 받을 금액이 미리 정해져 있죠. 퇴직 전 3개월 평균임금 x 근속연수로 계산해요.
      </p>
      <p style={body}>
        둘째, <strong>확정기여형(DC형, Defined Contribution)</strong>이에요. 회사가 매년 연봉의 1/12 이상을 근로자 개인 계좌에 적립하고, 근로자가 그 돈을 직접 투자 운용하는 방식이죠. 운용 결과에 따라 퇴직 시 받는 금액이 달라져요.
      </p>
      <p style={body}>
        셋째, <strong>개인형퇴직연금(IRP, Individual Retirement Pension)</strong>이에요. 이건 회사가 운영하는 제도가 아니라 개인이 직접 개설하는 계좌예요. 퇴직금을 이체받는 통로이면서, 개인이 추가 납입해서 세액공제 혜택을 받을 수도 있죠.
      </p>

      <GreenBox title="3가지 제도 한눈에">
        <strong>DB형</strong> — 회사가 운용, 퇴직 시 평균임금 x 근속연수 (금액 확정)<br />
        <strong>DC형</strong> — 회사가 적립, 근로자가 투자 운용 (운용 결과에 따라 금액 변동)<br />
        <strong>IRP</strong> — 개인 계좌, 퇴직금 수령 + 추가 납입으로 세액공제
      </GreenBox>

      <SectionBadge>우리 회사 제도가 뭔지 확인해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="4가지 다 해당되면 우리 회사가 퇴직연금 제도를 운영하고 있다는 뜻이에요. 인사팀에 DB형인지 DC형인지 확인해보세요."
        partialMatchText="일부만 해당돼요. 회사 인사팀에 퇴직급여 제도가 어떻게 되어 있는지 직접 문의하는 게 가장 정확해요."
      />

      <Divider />

      {/* 섹션 2 */}
      <H2>DB형과 DC형, 어떤 차이가 있나요?</H2>
      <p style={body}>
        가장 큰 차이는 <strong>&ldquo;누가 투자 위험을 부담하느냐&rdquo;</strong>예요. DB형은 회사가 운용하니까 투자 결과와 관계없이 근로자는 정해진 퇴직금을 받아요. 회사가 투자에서 손해를 봐도 근로자 퇴직금은 줄어들지 않죠. 반면 DC형은 근로자 본인이 투자하니까, 잘하면 퇴직금이 늘고 못하면 줄어요.
      </p>
      <p style={body}>
        계산 방식도 달라요. DB형은 <strong>퇴직 시점의 평균임금 x 근속연수</strong>로 산정하죠. 연봉이 매년 오르는 직장이라면 퇴직 직전 가장 높은 급여 기준으로 계산되니까 유리해요. DC형은 <strong>매년 적립된 금액 + 운용 수익</strong>의 합이에요. 적립 시점의 급여 기준이라 나중에 연봉이 올라도 과거 적립분에는 반영이 안 되죠.
      </p>
      <p style={body}>
        퇴직금 지급 안정성에서도 차이가 나요. DB형은 회사가 도산하면 적립금이 부족할 위험이 있어요(법적으로 최소 적립 의무가 있긴 하지만). DC형은 이미 금융기관에 분리 보관돼 있어서 회사가 망해도 근로자 적립금은 안전하죠. 회사 재정 상태가 불안하다면 DC형이 오히려 안전한 측면이 있어요.
      </p>

      <BorderBox title="DB형 vs DC형 핵심 비교">
        <strong>운용 주체</strong> — DB형: 회사 | DC형: 근로자 본인<br />
        <strong>투자 위험</strong> — DB형: 회사가 부담 | DC형: 근로자가 부담<br />
        <strong>퇴직금 계산</strong> — DB형: 퇴직 시 평균임금 기준 | DC형: 매년 적립금 + 운용 수익<br />
        <strong>연봉 인상 반영</strong> — DB형: 퇴직 시점 급여 기준 (유리) | DC형: 적립 시점 급여 기준<br />
        <strong>회사 도산 시</strong> — DB형: 적립 부족 위험 | DC형: 금융기관 분리 보관 (안전)
      </BorderBox>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/퇴직금" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 */}
      <H2>어떤 제도가 나에게 유리한가요?</H2>
      <p style={body}>
        <strong>연봉이 꾸준히 오르는 직장</strong>이라면 DB형이 유리해요. 퇴직 직전의 높은 급여를 기준으로 퇴직금을 계산하니까, 근속연수가 길수록 DB형의 이점이 커지죠. 대기업이나 공공기관처럼 호봉제가 있는 곳이라면 DB형이 거의 대부분 유리해요.
      </p>
      <p style={body}>
        <strong>연봉 인상이 크지 않거나 투자에 자신 있는 경우</strong>라면 DC형이 나을 수 있어요. DC형은 적립금을 직접 운용할 수 있으니까, 주식형 펀드나 TDF(타깃데이트펀드) 같은 상품에 투자해서 시장 수익률을 따라갈 수 있죠. 장기 투자로 연평균 7~8% 수익률을 올리면 DB형보다 더 많이 받을 수도 있어요.
      </p>
      <p style={body}>
        <strong>회사 재정이 불안한 곳</strong>이라면 DC형이 안전해요. DB형은 회사가 부도나면 적립금이 부족할 수 있지만, DC형은 금융기관에 분리 보관돼 있어서 회사가 망해도 내 퇴직금은 무사하거든요. 중소기업이나 스타트업에 다니는 분이라면 이 점을 꼭 따져보세요.
      </p>

      <SectionBadge>서류 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* 섹션 4 */}
      <H2>제도를 중간에 바꿀 수 있나요?</H2>
      <p style={body}>
        바꿀 수 있어요. 근로자퇴직급여보장법 제21조에 따라 사용자는 근로자 과반수의 동의를 받아 퇴직연금 제도를 다른 종류로 전환할 수 있죠. DB형에서 DC형으로, 또는 DC형에서 DB형으로 전환이 가능해요.
      </p>
      <p style={body}>
        다만 회사가 일방적으로 바꿀 수는 없어요. 반드시 <strong>근로자 과반수의 동의</strong>가 필요하죠. 그리고 전환 시 기존 적립금은 어떻게 처리할지도 합의해야 해요. DB형에서 DC형으로 전환하면 기존 퇴직금 상당액을 DC형 계좌에 이체하는 방식이 일반적이에요.
      </p>
      <p style={body}>
        개별 근로자가 본인만 DB에서 DC로(또는 반대로) 전환할 수도 있어요. 회사가 복수의 퇴직연금 제도를 운영하고 있다면 가능하죠. 단, 이건 회사 규약에 따라 다르니까 인사팀에 직접 물어보는 게 확실해요. 전환 시점의 적립금 정산, 운용 상품 변경 등 세부 사항도 함께 확인하세요.
      </p>

      <GreenBox title="제도 전환 핵심">
        DB ↔ DC 전환 가능 (근로자 과반수 동의 필요)<br />
        개별 전환도 가능 (회사가 복수 제도 운영 시)<br />
        전환 시 기존 적립금 정산 방식을 반드시 확인
      </GreenBox>

      <Divider />

      {/* 섹션 5 */}
      <H2>IRP는 퇴직금 제도와 어떤 관계인가요?</H2>
      <p style={body}>
        IRP(개인형퇴직연금)는 DB형이나 DC형과는 성격이 좀 달라요. 회사가 운영하는 퇴직연금 제도가 아니라 <strong>개인이 직접 개설하는 계좌</strong>예요. 두 가지 역할을 하죠 — 퇴직금을 이체받는 통로, 그리고 추가 납입으로 세액공제를 받는 절세 수단.
      </p>
      <p style={body}>
        퇴직금 300만 원 이상이면 <a href="/w/퇴직금-IRP-계좌" style={{ color: "#1D9E75", textDecoration: "underline" }}>IRP 계좌</a>로 받아야 해요. 이건 2022년부터 의무화됐죠. 일반 통장으로 바로 받을 수 있는 건 300만 원 이하일 때뿐이에요. 그래서 퇴직 전에 IRP 계좌를 미리 만들어두는 게 좋아요. 은행이나 증권사 앱에서 10분이면 개설할 수 있죠.
      </p>
      <p style={body}>
        IRP의 가장 큰 장점은 <strong>세액공제</strong>예요. 퇴직금과 별개로 연간 최대 1,800만 원까지 추가 납입할 수 있고, 이 중 900만 원까지 세액공제를 받을 수 있죠. 총급여 5,500만 원 이하라면 16.5%, 초과라면 13.2% 공제율이 적용돼요. 매년 꾸준히 넣으면 수십만 원의 세금을 돌려받을 수 있어요.
      </p>
      <p style={body}>
        IRP에 들어간 퇴직금은 바로 찾을 수도 있고, 연금으로 나눠 받을 수도 있어요. 55세 이후에 연금으로 수령하면 퇴직소득세의 60~70%만 내면 되니까 세금이 훨씬 줄어들죠. 당장 돈이 급하지 않다면 IRP에 넣어두고 연금으로 받는 게 세금 면에서 유리해요.
      </p>

      <BorderBox title="IRP 핵심 정리">
        <strong>퇴직금 수령 통로</strong> — 300만 원 이상이면 IRP로 받아야 해요<br />
        <strong>세액공제</strong> — 연간 900만 원까지 공제 (16.5% 또는 13.2%)<br />
        <strong>연금 수령 시 절세</strong> — 55세 이후 연금 수령 시 퇴직소득세 30~40% 감면<br />
        <strong>개설</strong> — 은행·증권사 앱에서 10분이면 완료
      </BorderBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 제도 종류에 대해 자주 나오는 질문을 모았어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니, 최신 기준은 고용노동부(1350)나 금융감독원(1332)에서 확인하세요." />
    </ArticleLayout>
  );
}
