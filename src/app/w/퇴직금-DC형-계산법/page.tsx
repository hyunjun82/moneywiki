"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "우리 회사가 DC형(확정기여형) 퇴직연금을 운영해요" },
  { id: "c2", label: "매년 연봉의 1/12가 퇴직연금 계좌에 적립되고 있어요" },
  { id: "c3", label: "적립금 운용 상품(예금, 펀드 등)을 직접 선택하고 있어요" },
  { id: "c4", label: "퇴직연금 사업자(은행·증권사) 앱에서 잔액을 확인할 수 있어요" },
];

const CHECKLIST = [
  "퇴직연금 사업자 앱/웹 — 적립금 잔액과 운용 수익률 확인",
  "매년 적립 내역 — 회사가 1/12를 제때 넣었는지 확인",
  "운용 상품 목록 — 예금, 채권형, 주식형 등 현재 배분 비율",
  "근로계약서 — DC형 가입 사실과 부담금 기준 확인",
  "IRP 계좌 — 퇴직 시 적립금 이전받을 계좌 준비",
];

const FAQS = [
  {
    q: "DC형은 퇴직금이 정해져 있지 않나요?",
    a: "맞아요. 회사가 넣어주는 금액(연봉의 1/12)은 정해져 있지만, 운용 수익에 따라 최종 수령액이 달라지죠. 수익이 나면 더 받고, 손실이 나면 덜 받아요.",
  },
  {
    q: "DC형에서 원금 손실이 나면 회사가 보전해주나요?",
    a: "안 해줘요. 운용 책임은 근로자에게 있어요. 그래서 원금 보장형 상품(예금, ELB 등)을 선택하는 분이 많죠.",
  },
  {
    q: "DB형에서 DC형으로 전환하면 유리한가요?",
    a: "임금 인상률이 낮고 본인이 투자에 자신 있다면 DC형이 유리할 수 있어요. 반대로 매년 급여가 많이 오르는 직장이라면 DB형이 낫죠.",
  },
  {
    q: "DC형 적립금은 중도 인출이 되나요?",
    a: "법정 사유(주택 구입, 6개월 이상 요양 등)에 해당하면 중도 인출이 가능해요. 단순 생활비 용도로는 안 되죠.",
  },
  {
    q: "퇴직 시 DC형 적립금은 어떻게 받나요?",
    a: "IRP 계좌로 이전한 뒤 인출하는 게 원칙이에요. 55세 이상이면 연금으로 받을 수도 있고, 일시금 수령도 가능하죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 제20조 — 확정기여형 부담금", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "근로자퇴직급여보장법 제17조 — 퇴직연금 운용", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 — 퇴직연금제도 안내", url: "https://www.moel.go.kr" },
      { label: "금융감독원 — 퇴직연금 비교공시", url: "https://www.fss.or.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-제도-종류",
    title: "퇴직금 제도 종류, DB형 DC형 IRP 비교",
    description: "DB형·DC형·IRP의 구조와 특징을 한눈에 비교해요.",
  },
  {
    slug: "dc형-퇴직금-수령방법",
    title: "DC형 퇴직금 수령 방법과 절차",
    description: "퇴직 후 IRP 이전부터 인출까지의 절차를 정리했어요.",
  },
  {
    slug: "퇴직금-계산-방법",
    title: "퇴직금 계산 방법, 공식과 실제 사례",
    description: "DB형 기준 퇴직금 계산 공식을 사례로 풀어드려요.",
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
          currentSlug="퇴직금-DC형-계산법"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 근로기준법 · 계산법</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        DC형 퇴직금 계산법,<br />
        DB형이랑 뭐가 다른가요?
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;DC형이라 퇴직금을 얼마 받을지 모르겠어요.&rdquo; DC형(확정기여형)은 회사가 매년 <strong>연봉의 1/12</strong>를 적립하고, 근로자가 직접 운용하는 방식이에요.
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법</a>이 정한 이 구조에서는 운용 수익에 따라 퇴직금이 늘어나기도, 줄어들기도 하죠.
        DB형(확정급여형)과 어떻게 다르고, 내 적립금은 어떻게 확인하는지, 유불리 판단 기준은 뭔지 지금부터 정리해드릴게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 */}
      <H2>DC형 퇴직금 계산 방식은 어떻게 되나요?</H2>
      <p style={body}>
        DC형의 계산은 사실 &ldquo;계산&rdquo;이라기보다 &ldquo;적립 + 운용 결과&rdquo;에 가까워요. 회사가 매년 <strong>연간 임금 총액의 1/12 이상</strong>을 퇴직연금 사업자(은행·증권사)에 넣어주고, 근로자가 그 돈으로 예금, 펀드, 채권 등을 골라 운용하죠.
      </p>
      <p style={body}>
        퇴직 시 받는 금액은 <strong>적립금 원금 + 운용 수익(또는 - 운용 손실)</strong>이에요. 예를 들어 연봉 4,800만 원인 직장인이 5년 근무했다면, 회사가 넣은 원금은 400만 x 5 = 2,000만 원이죠. 여기에 연평균 3% 수익이 났다면 약 2,185만 원을 받게 돼요.
      </p>
      <p style={body}>
        DB형처럼 &ldquo;평균임금 x 30일 x 근속연수&rdquo; 공식이 아니라, 적립된 금액 자체가 곧 퇴직금이에요. 그래서 DC형은 매년 얼마가 적립되고 있는지, 수익률은 어떤지를 꾸준히 확인하는 게 중요하죠.
      </p>

      <GreenBox title="DC형 퇴직금 구조">
        회사 부담금: 매년 연간 임금 총액의 <strong>1/12 이상</strong><br />
        퇴직 시 수령액: 적립금 원금 + 운용 수익(또는 - 손실)<br />
        운용 책임: <strong>근로자 본인</strong>
      </GreenBox>

      <SectionBadge>내 상황 체크</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="4가지 모두 해당돼요. 아래 내용을 참고해서 적립금을 점검해보세요."
        partialMatchText="일부 항목이 빠져 있네요. 회사 인사팀이나 퇴직연금 사업자에 문의해보세요."
      />

      <Divider />

      {/* 섹션 2 */}
      <H2>DB형과 DC형, 계산 결과가 왜 다른가요?</H2>
      <p style={body}>
        가장 큰 차이는 <strong>기준 시점</strong>이에요. DB형은 퇴직 시점의 평균임금으로 계산하니까, 재직 중 급여가 올랐다면 그 인상분이 전부 반영되죠. 입사 때 월급 250만 원이었는데 퇴직 때 400만 원이면, 400만 원 기준으로 퇴직금을 받아요.
      </p>
      <p style={body}>
        DC형은 <strong>매년 그해 임금 기준</strong>으로 적립하니까, 입사 초기 낮은 급여로 적립된 금액은 그대로 남아요. 같은 조건이라면 임금 인상률이 높을수록 DB형이 유리하고, 임금 인상이 거의 없다면 DC형이 운용 수익만큼 유리해질 수 있죠.
      </p>
      <p style={body}>
        숫자로 비교해볼게요. 연봉 3,600만 원으로 시작해서 매년 5%씩 10년 올랐다면, DB형 퇴직금은 마지막 평균임금 기준으로 약 5,860만 원이에요. DC형은 매년 적립한 원금 합계가 약 4,530만 원이고, 여기에 운용 수익이 붙어야 DB형을 따라잡을 수 있죠.
      </p>

      <BorderBox title="DB형 vs DC형 간단 비교">
        <strong>DB형</strong>: 퇴직 시 평균임금 기준 → 임금 인상률이 높으면 유리<br />
        <strong>DC형</strong>: 매년 적립 + 운용 수익 → 투자 수익이 좋으면 유리<br />
        임금 인상률 &gt; 운용 수익률이면 DB형, 반대면 DC형이 유리해요.
      </BorderBox>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 */}
      <H2>DC형에서 운용 손실이 나면 퇴직금이 줄어드나요?</H2>
      <p style={body}>
        네, 줄어들 수 있어요. DC형의 운용 책임은 온전히 근로자에게 있으니까요. 주식형 펀드에 투자했다가 시장이 하락하면 적립금 원금보다 적은 금액을 받게 되죠. 이 부분이 DC형의 가장 큰 리스크예요.
      </p>
      <p style={body}>
        그래서 원금 보장을 원하는 분은 <strong>예금, 원금보장형 ELB(주가연계파생결합사채), GIC(이율보증보험)</strong> 같은 상품을 선택해요. 수익률은 낮지만 적어도 회사가 넣어준 원금은 지켜지죠. 실제로 DC형 가입자의 약 80%가 원금 보장형 상품에 자금을 배분하고 있어요.
      </p>
      <p style={body}>
        반대로 적극적으로 운용해서 수익을 내면 DB형보다 훨씬 많이 받을 수 있어요. 연평균 5% 수익을 10년 유지했다면, 원금 대비 약 63%가 더 붙죠. 다만 이건 시장 상황에 달려 있으니 보장은 안 돼요.
      </p>

      <Divider />

      {/* 섹션 4 */}
      <H2>DC형 적립금은 어떻게 확인하나요?</H2>
      <p style={body}>
        퇴직연금 사업자(은행·증권사)의 <strong>앱이나 웹사이트</strong>에서 확인할 수 있어요. 로그인 후 &ldquo;퇴직연금&rdquo; 또는 &ldquo;DC형 계좌&rdquo; 메뉴에 들어가면 적립금 잔액, 운용 수익률, 상품별 배분 비율이 전부 보이죠.
      </p>
      <p style={body}>
        매년 회사가 부담금을 제때 넣었는지도 같이 살펴보세요. <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법 제20조</a>는 사용자가 매년 1회 이상 부담금을 납입하도록 규정하고 있어요. 밀린 부담금이 있다면 회사에 즉시 납입을 요구할 수 있죠.
      </p>
      <p style={body}>
        <a href="https://www.fss.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>금융감독원 퇴직연금 비교공시</a>에서 다른 사업자의 수익률과 수수료를 비교해볼 수 있어요. 수수료 차이가 장기적으로 수백만 원 차이를 만들 수 있으니, 한 번쯤 비교해보는 게 좋죠.
      </p>

      <Divider />

      {/* 섹션 5 */}
      <H2>DC형이 유리한 경우는 언제인가요?</H2>
      <p style={body}>
        첫째, <strong>임금 인상률이 낮은 경우</strong>예요. DB형은 퇴직 시점 평균임금이 기준이니, 급여가 거의 안 오르면 DB형의 이점이 사라지죠. 이때 DC형에서 운용 수익을 내면 DB형보다 유리해질 수 있어요.
      </p>
      <p style={body}>
        둘째, <strong>이직이 잦은 경우</strong>예요. DB형은 퇴직할 때마다 그 시점의 평균임금으로 정산되니, 이직 후 새 회사에서 처음부터 다시 시작하죠. DC형은 적립금이 본인 계좌에 쌓이니 이직해도 그대로 가져갈 수 있어요.
      </p>
      <p style={body}>
        셋째, <strong>투자 경험이 있는 경우</strong>죠. DC형의 핵심은 운용이에요. 장기 투자에 대한 이해가 있고 적절한 분산 투자를 할 수 있다면, 예금 이자보다 높은 수익을 기대할 수 있어요. 반대로 투자에 관심이 없다면 DB형이 편하고 안전하죠.
      </p>

      <GreenBox title="DC형 유리 조건 정리">
        임금 인상률이 낮거나 동결된 직장<br />
        이직이 잦아서 한 회사에 오래 머물지 않는 경우<br />
        장기 투자 경험이 있고 적극 운용할 의향이 있는 경우
      </GreenBox>

      <SectionBadge>DC형 점검 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        DC형 퇴직금에 대해 실제로 자주 나오는 질문을 모았어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니, 최신 기준은 고용노동부(1350)나 금융감독원(1332)에서 확인하세요." />
    </ArticleLayout>
  );
}
