"use client";
import { H2, SectionBadge, GreenBox, BorderBox, Divider, body, EligibilityChecker, Checklist, FAQ, References, Disclaimer, ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "같은 사업장에서 1년 이상 일했어요" },
  { id: "c2", label: "주 평균 15시간 이상 근무했어요" },
  { id: "c3", label: "일당 지급 기록이나 출근 기록이 남아 있어요" },
  { id: "c4", label: "퇴직 후 3년이 지나지 않았어요" },
];
const CHECKLIST = ["일당 지급 기록(이체 내역, 수기 장부) — 평균임금 산정용","출근 기록(사진, 카톡, 출입카드) — 계속 근로 증빙","근로계약서(있다면) — 근무 조건 확인","4대보험 가입 이력 — 근로 기간 증빙","건설근로자공제회 가입 내역(건설직) — 퇴직공제금 확인"];
const FAQS = [
  { q: "매일 다른 현장에서 일하면 퇴직금이 안 되나요?", a: "현장이 달라도 같은 사업주(회사)에 소속돼 일했다면 계속 근로로 인정돼요. 핵심은 사업장이 아니라 사업주예요." },
  { q: "일당을 현금으로 받았는데 퇴직금 청구가 되나요?", a: "돼요. 현금 수령이어도 근로 사실을 증명할 수 있으면 되죠. 동료 증언, 현장 사진, 문자 기록 등을 모아두세요." },
  { q: "일용직인데 4대보험에 가입 안 돼 있어요.", a: "4대보험 가입 여부와 퇴직금 지급 의무는 별개예요. 실제 근로 사실이 확인되면 퇴직금을 청구할 수 있죠." },
  { q: "건설근로자공제회 퇴직공제금과 퇴직금을 둘 다 받나요?", a: "네, 두 제도는 별개예요. 공제회 적립금은 공제회에서, 일반 퇴직금은 사업주에게 따로 청구하면 되죠." },
  { q: "일용직 퇴직금 소멸시효는 몇 년인가요?", a: "퇴직일로부터 3년이에요. 3년이 지나면 법적으로 청구할 수 없으니, 퇴직 후 빠르게 움직이세요." },
];
const REFERENCES = [
  { category: "법령", items: [{ label: "근로자퇴직급여 보장법 — 퇴직금 지급 의무", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },{ label: "건설근로자의 고용개선 등에 관한 법률", url: "https://www.law.go.kr/법령/건설근로자의고용개선등에관한법률" }] },
  { category: "공식 자료", items: [{ label: "고용노동부 — 일용직 퇴직금 안내", url: "https://www.moel.go.kr" },{ label: "건설근로자공제회 — 퇴직공제금 조회", url: "https://www.cwma.or.kr" }] },
];
const RELATED = [
  { slug: "일용직-퇴직금-지급기준", title: "일용직 퇴직금 지급 기준 판단법", description: "계속 근로 여부 판단 방법과 지급 기준을 정리했어요." },
  { slug: "건설근로자-퇴직금", title: "건설 근로자 퇴직금 받는 방법", description: "건설근로자공제회 제도와 퇴직공제금 수령법을 안내해요." },
  { slug: "퇴직금-조건", title: "퇴직금 받을 수 있는 조건", description: "퇴직금 발생 조건을 한눈에 정리했어요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="일용직-퇴직금" />}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 일용직 · 고용유형</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>일용직 퇴직금, 일당 받는 사람도<br />받을 수 있나요?</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        일당으로 급여를 받는 일용직 근로자도 퇴직금을 받을 수 있어요.
        핵심은 &ldquo;같은 사업장에서 1년 이상 계속 근로했느냐&rdquo;죠.
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여 보장법</a>은 일용직이라고 예외를 두지 않아요.
        건설 일용직이라면 <a href="/w/건설근로자-퇴직금" style={{ color: "#1D9E75", textDecoration: "underline" }}>건설근로자공제회</a> 제도도 함께 활용할 수 있죠.
        조건, 계산법, 지급 거부 시 대응법까지 정리해드릴게요.
      </p>
      <Divider /><ArticleAd position="intro" />

      <H2>일용직도 퇴직금을 받을 수 있나요?</H2>
      <p style={body}>받을 수 있어요. 근로자퇴직급여 보장법은 &ldquo;근로자&rdquo;에게 적용되는 법이지, &ldquo;정규직&rdquo;에게만 적용되는 법이 아니에요. 일용직이든 월급제이든 1년 이상 같은 사업장에서 주 15시간 이상 일했으면 퇴직금 지급 의무가 생기죠.</p>
      <p style={body}>일용직의 특성상 &ldquo;계속 근로&rdquo; 판단이 까다로울 수 있어요. 매일 출근하지 않더라도 같은 사업주 아래에서 반복적으로 일했다면 계속 근로로 인정될 가능성이 높죠. 대법원 판례도 &ldquo;고용관계의 실질&rdquo;을 기준으로 본다고 일관되게 판시하고 있어요.</p>
      <p style={body}>건설 현장에서 일하는 일용직이라면 별도로 <a href="/w/건설근로자-퇴직금" style={{ color: "#1D9E75", textDecoration: "underline" }}>건설근로자공제회 퇴직공제금</a>을 받을 수 있어요. 사업주가 공제회에 적립한 금액을 퇴직 시 수령하는 구조죠. 일반 퇴직금과 별개 제도이니 둘 다 해당되는지 확인해보세요.</p>
      <GreenBox title="일용직 퇴직금 핵심">1. <strong>1년 이상</strong> 같은 사업장에서 계속 근로<br />2. 주 평균 <strong>15시간 이상</strong> 근무<br />3. 건설 일용직은 <strong>공제회 퇴직공제금</strong>도 별도 수령 가능</GreenBox>
      <SectionBadge>내 상황에 해당되는지 체크해보세요</SectionBadge>
      <EligibilityChecker items={CHECK_ITEMS} allMatchText="4가지 다 해당돼요. 퇴직금을 받을 수 있는 조건이에요." partialMatchText="일부만 해당돼요. 고용노동부(1350)에 상담부터 받아보세요." />
      <Divider />

      <H2>일용직 퇴직금 계산 방법은?</H2>
      <p style={body}>계산 공식은 정규직과 같아요. 퇴직 전 3개월 평균임금 x 근속연수가 기본이죠. 일용직은 일당으로 급여를 받으니까, 3개월간 받은 총 일당을 총 일수(달력 기준)로 나누면 일 평균임금이 나와요.</p>
      <p style={body}>예를 들어 일당 15만 원을 받고 3개월간 60일 일했다면, 총 급여 900만 원 / 90일(3개월) = 일 평균임금 10만 원이에요. 이걸 30일로 곱하면 월 평균임금 300만 원, 여기에 근속연수를 곱하면 퇴직금이 나오죠.</p>
      <p style={body}>주의할 점은 실제 근무하지 않은 날도 달력 일수에 포함된다는 거예요. 쉬는 날이 많을수록 평균임금이 낮아지기 때문에, 근무 일수 기록을 정확히 남겨두는 게 중요하죠.</p>
      <BorderBox title="통상임금이 유리한 경우">평균임금이 통상임금보다 낮으면 통상임금으로 계산할 수 있어요.<br />일용직은 비수기에 근무일이 줄어서 평균임금이 낮아지는 경우가 많으니, 이 부분을 꼭 비교해보세요.</BorderBox>
      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />
      <Divider />

      <H2>건설 일용직은 따로 적용되나요?</H2>
      <p style={body}>건설 현장에서 일하는 일용직에게는 <strong>건설근로자공제회 퇴직공제금</strong> 제도가 별도로 적용돼요. 사업주가 근로자 1인당 하루 일정 금액을 공제회에 적립하고, 근로자가 건설업을 떠날 때 적립금 + 이자를 한꺼번에 받는 구조죠.</p>
      <p style={body}>이 제도는 일반 퇴직금과 <strong>별개</strong>예요. 같은 사업장에서 1년 이상 일했다면 일반 퇴직금도 따로 청구할 수 있죠. 두 제도 모두 해당된다면 둘 다 받을 수 있는 거예요.</p>
      <p style={body}>건설근로자공제회 가입 여부는 <a href="https://www.cwma.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>건설근로자공제회 홈페이지</a>에서 본인 이름과 주민번호로 조회할 수 있어요. 적립 내역까지 확인되니 퇴직 전에 한번 살펴보세요.</p>
      <Divider />

      <H2>일용직 퇴직금 지급을 거부하면?</H2>
      <p style={body}>먼저 사업주에게 퇴직금 지급을 서면으로 요청하세요. 구두보다 내용증명이 효과적이죠. 내용증명은 &ldquo;법적 조치를 하겠다&rdquo;는 의사 표현이라 대부분 이 단계에서 해결돼요.</p>
      <p style={body}>안 주면 <a href="/w/퇴직금-미지급-신고" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부 민원마당</a>에서 온라인 진정을 접수하세요. 일용직은 근로 기록이 부실한 경우가 많아서, 일당 지급 기록, 출근 사진, 카톡 대화 등 간접 증거를 최대한 모아두는 게 핵심이에요.</p>
      <p style={body}>소멸시효는 퇴직일로부터 <strong>3년</strong>이에요. 현장을 옮기면서 이전 사업장 퇴직금을 놓치는 경우가 많으니, 현장이 끝날 때마다 퇴직금 정산 여부를 꼭 확인하세요.</p>
      <SectionBadge>준비 서류</SectionBadge>
      <Checklist items={CHECKLIST} />
      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>일용직 퇴직금에 대해 자주 나오는 질문이에요.</p>
      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 관련 법령을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니, 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
