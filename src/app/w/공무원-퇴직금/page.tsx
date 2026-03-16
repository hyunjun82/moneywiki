"use client";
import { H2, SectionBadge, GreenBox, BorderBox, Divider, body, EligibilityChecker, Checklist, FAQ, References, Disclaimer, ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [{ id: "c1", label: "국가·지방 공무원으로 재직 중이거나 퇴직했어요" },{ id: "c2", label: "재직 기간이 1년 이상이에요" },{ id: "c3", label: "공무원연금 가입 이력이 있어요" },{ id: "c4", label: "퇴직수당 수령 여부를 확인하고 싶어요" }];
const CHECKLIST = ["재직증명서 — 재직 기간·직급 확인","공무원연금공단 가입 내역 — 연금·퇴직수당 확인","퇴직 통지서 — 퇴직 사유·일자 확인","급여명세서(최근 3개월) — 퇴직수당 산정 근거","신분증·통장사본 — 수령 신청용"];
const FAQS = [{ q: "공무원도 퇴직금이라는 게 있나요?", a: "일반적인 퇴직금은 아니에요. 공무원은 퇴직급여(퇴직수당 + 퇴직연금)를 받는데, 이게 민간 기업의 퇴직금에 해당하죠." },{ q: "공무원 퇴직수당은 얼마나 되나요?", a: "재직 기간과 퇴직 시 보수월액에 따라 달라져요. 20년 재직 시 보수월액의 약 6.5배를 받을 수 있죠." },{ q: "공무원 퇴직연금과 퇴직수당을 동시에 받나요?", a: "네, 둘 다 받아요. 퇴직수당은 일시금이고, 퇴직연금은 매달 분할 수령하는 거예요." },{ q: "계약직 공무원도 퇴직급여를 받나요?", a: "계약직 공무원은 공무원연금이 아닌 일반 근로자 퇴직금 규정이 적용돼요. 1년 이상 근무하면 퇴직금을 받을 수 있죠." },{ q: "일반 직장인 퇴직금이랑 비교하면 뭐가 유리한가요?", a: "장기 재직 시 공무원 퇴직급여가 유리한 경우가 많아요. 연금이 매달 나오니까 안정적이죠. 단기 재직이면 민간 퇴직금이 나을 수 있어요." }];
const REFERENCES = [{ category: "법령", items: [{ label: "공무원연금법 — 퇴직급여", url: "https://www.law.go.kr/법령/공무원연금법" },{ label: "공무원보수규정", url: "https://www.law.go.kr/법령/공무원보수규정" }] },{ category: "공식 자료", items: [{ label: "공무원연금공단 — 퇴직급여 안내", url: "https://www.geps.or.kr" },{ label: "인사혁신처 — 공무원 보수 안내", url: "https://www.mpm.go.kr" }] }];
const RELATED = [{ slug: "퇴직금-제도-종류", title: "퇴직금 제도 종류 DB DC IRP", description: "퇴직금 제도의 종류와 차이점을 정리했어요." },{ slug: "퇴직금-연금-전환", title: "퇴직금 연금 전환", description: "퇴직금을 연금으로 전환하는 방법을 안내해요." },{ slug: "임원-퇴직금-지급규정", title: "임원 퇴직금 지급 규정", description: "임원의 퇴직금 규정은 일반 직원과 다른 점이 있어요." }];

export default function Page() {
  return (
    <ArticleLayout sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="공무원-퇴직금" />}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 공무원 · 퇴직급여</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>공무원 퇴직금,<br />일반 직장인이랑 어떻게 다른가요?</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>공무원은 일반 직장인처럼 &ldquo;퇴직금&rdquo;을 받는 게 아니에요. 대신 <a href="https://www.law.go.kr/법령/공무원연금법" style={{ color: "#1D9E75", textDecoration: "underline" }}>공무원연금법</a>에 따라 <strong>퇴직수당</strong>(일시금)과 <strong>퇴직연금</strong>(매달 수령)을 받죠. 이 두 가지를 합친 게 공무원의 퇴직급여예요. 일반 퇴직금과 어떻게 다른지, 계산법과 수령 방법까지 정리해드릴게요.</p>
      <Divider /><ArticleAd position="intro" />

      <H2>공무원도 퇴직금을 받나요?</H2>
      <p style={body}>&ldquo;퇴직금&rdquo;이라는 명칭은 아니지만, 실질적으로 같은 역할을 하는 퇴직급여를 받아요. 공무원연금법은 퇴직수당과 퇴직연금(또는 퇴직일시금)을 규정하고 있죠.</p>
      <p style={body}>퇴직수당은 재직 기간에 비례해서 일시금으로 받는 돈이에요. 퇴직연금은 20년 이상 재직한 공무원이 매달 받는 연금이고요. 20년 미만이면 퇴직일시금(적립금 환급)을 받게 되죠.</p>
      <p style={body}>민간 기업의 퇴직금과 가장 큰 차이는 &ldquo;연금&rdquo;이에요. 일반 직장인은 퇴직금을 한 번에 받지만, 공무원은 퇴직 후에도 매달 연금을 받을 수 있어서 노후 안정성이 높은 편이죠.</p>
      <GreenBox title="공무원 퇴직급여 구성">1. <strong>퇴직수당</strong> — 재직 기간에 비례한 일시금<br />2. <strong>퇴직연금</strong> — 20년 이상 재직 시 매달 수령<br />3. <strong>퇴직일시금</strong> — 20년 미만 재직 시 적립금 환급</GreenBox>
      <SectionBadge>내 상황 체크</SectionBadge>
      <EligibilityChecker items={CHECK_ITEMS} allMatchText="공무원 퇴직급여 대상이에요." partialMatchText="일부만 해당돼요. 공무원연금공단(1588-4321)에 상담해보세요." />
      <Divider />

      <H2>공무원 퇴직금과 연금의 차이는?</H2>
      <p style={body}>퇴직수당은 퇴직할 때 한 번에 받는 돈이에요. 재직 기간 1년당 보수월액의 일정 비율을 곱해서 계산하죠. 5년 미만은 보수월액의 0.5배, 20년 이상이면 6.5배까지 올라가요.</p>
      <p style={body}>퇴직연금은 20년 이상 재직한 공무원이 매달 받는 연금이에요. 재직 기간과 기준소득월액에 따라 금액이 정해지죠. 65세부터 수급을 시작하는 게 원칙이지만, 조기 수급도 가능해요.</p>
      <p style={body}>퇴직수당과 퇴직연금은 <strong>동시에 받을 수 있어요</strong>. 퇴직할 때 퇴직수당을 일시금으로 받고, 이후 매달 퇴직연금을 받는 구조죠. 이 점이 민간 퇴직금과의 가장 큰 차이예요.</p>
      <BorderBox title="계약직 공무원은 다른 규정 적용">계약직·임기제 공무원은 공무원연금이 아닌 근로자퇴직급여 보장법이 적용돼요.<br />1년 이상 근무 시 일반 퇴직금을 받게 되죠.</BorderBox>
      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} /><ArticleAd position="mid" />
      <Divider />

      <H2>공무원 퇴직금 계산 방법은?</H2>
      <p style={body}>퇴직수당은 &ldquo;퇴직 당시 보수월액 x 재직 기간별 지급률&rdquo;로 계산해요. 지급률은 재직 기간에 따라 0.5배(5년 미만)에서 6.5배(20년 이상)까지 차등 적용되죠.</p>
      <p style={body}>퇴직연금은 &ldquo;기준소득월액 x 재직 기간 x 지급률(1.7%)&rdquo;로 산정돼요. 30년 재직하면 기준소득월액의 약 51%를 매달 연금으로 받는 거죠. 상한이 있어서 기준소득월액의 62%를 넘을 수 없어요.</p>
      <p style={body}>정확한 금액은 <a href="https://www.geps.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>공무원연금공단 홈페이지</a>에서 모의 계산을 할 수 있어요. 재직 기간, 보수월액, 기준소득월액을 입력하면 예상 퇴직급여가 나오죠.</p>
      <Divider />

      <H2>퇴직 후 수령 방법은?</H2>
      <p style={body}>퇴직수당은 퇴직일로부터 보통 1~2개월 내에 지정한 계좌로 입금돼요. 공무원연금공단에서 자동 처리하죠.</p>
      <p style={body}>퇴직연금은 수급 개시 연령(65세)부터 매달 지급돼요. 다만 &ldquo;조기퇴직연금&rdquo;을 신청하면 60세부터 받을 수 있어요. 대신 감액(연 5%)이 적용되니 신중하게 결정해야 하죠.</p>
      <p style={body}>퇴직 후 수령 관련 문의는 공무원연금공단(1588-4321)으로 하면 돼요. 온라인으로도 연금 조회, 수령 계좌 변경 등이 가능하죠.</p>
      <SectionBadge>준비 서류</SectionBadge><Checklist items={CHECKLIST} />
      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>공무원 퇴직금에 대해 자주 나오는 질문이에요.</p>
      <FAQ items={FAQS} /><Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 공무원연금법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니, 최신 기준은 공무원연금공단(1588-4321)에서 확인하세요." />
    </ArticleLayout>
  );
}
