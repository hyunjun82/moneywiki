"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "중간정산으로 받는 금액이 확정됐어요" },
  { id: "c2", label: "정산 시점까지의 근속연수를 알고 있어요" },
  { id: "c3", label: "퇴직소득세 계산 구조(환산급여·세율)를 이해하고 싶어요" },
  { id: "c4", label: "IRP 이체를 통한 절세 방법을 알고 싶어요" },
];

const CHECKLIST = [
  "정산 금액 확인 — 회사에서 산정한 중간정산 금액",
  "근속연수 확인 — 입사일~중간정산일까지의 기간",
  "퇴직소득세 계산 — 환산급여 기준 세율 적용",
  "IRP 이체 여부 — 세금 이연을 원하면 IRP 계좌 준비",
  "원천징수영수증 — 정산 후 회사에서 발급 (보관 필수)",
];

const FAQS = [
  {
    q: "중간정산하면 세금이 더 많이 나오나요?",
    a: "경우에 따라 달라요. 근속연수가 짧아지면 근속연수 공제가 줄어들어 세금이 늘어날 수 있죠. 한꺼번에 퇴직할 때보다 분할 정산이 합산 세금에서 불리한 경우가 많아요.",
  },
  {
    q: "중간정산금을 IRP에 넣으면 세금을 안 내도 되나요?",
    a: "당장은 안 내도 돼요. IRP에 이체하면 퇴직소득세가 이연(뒤로 미뤄짐)되죠. 나중에 인출할 때 세금을 내는데, 연금으로 받으면 세율이 30~40% 낮아져요.",
  },
  {
    q: "세금은 자동으로 떼이나요?",
    a: "네, 회사가 원천징수해요. 정산 금액에서 퇴직소득세를 뺀 나머지가 입금되죠. 원천징수영수증을 반드시 받아두세요.",
  },
  {
    q: "중간정산 세금을 나중에 환급받을 수 있나요?",
    a: "중간정산금을 IRP에 넣으면 이미 납부한 세금을 환급받을 수 있어요. 정산 후 60일 이내에 IRP로 이체하면 원천징수된 세금이 돌아오죠.",
  },
  {
    q: "만기 수령과 중간정산, 세금 차이가 크나요?",
    a: "금액과 근속연수에 따라 달라요. 근속연수가 길수록 공제 혜택이 크기 때문에, 동일 금액이면 한꺼번에 받는 게 보통 세금이 적죠. 미리 시뮬레이션해보는 걸 추천해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "소득세법 제48조 — 퇴직소득공제", url: "https://www.law.go.kr/법령/소득세법" },
      { label: "근로자퇴직급여 보장법 제8조 — 중간정산", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "국세청 — 퇴직소득세 안내", url: "https://www.nts.go.kr" },
      { label: "홈택스 — 퇴직소득세 계산", url: "https://www.hometax.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-세금",
    title: "퇴직금 세금 전체 안내",
    description: "퇴직금에 붙는 세금의 종류와 계산 방법을 정리했어요.",
  },
  {
    slug: "퇴직금-중간정산",
    title: "퇴직금 중간정산 안내",
    description: "중간정산의 개념, 사유, 절차를 한번에 정리했어요.",
  },
  {
    slug: "퇴직금-중간정산-후-퇴직금-계산",
    title: "중간정산 후 퇴직금 계산",
    description: "중간정산 이후 최종 퇴직금이 어떻게 바뀌는지 안내해요.",
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
          currentSlug="퇴직금-중간정산-세금"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 중간정산 · 세금</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 중간정산 시 세금,<br />
        얼마나 내야 하나요?
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;중간정산 받으면 세금이 더 나온다던데, 진짜예요?&rdquo;<br />
        경우에 따라 그래요.
        퇴직소득세는 <strong>근속연수가 길수록 공제가 커지는 구조</strong>인데, 중간정산하면 근속연수가 리셋되니까 공제 혜택이 줄어들 수 있죠.
        얼마나 차이 나는지, 어떻게 하면 세금을 줄일 수 있는지 구체적으로 정리해드릴게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 */}
      <H2>중간정산 시 세금이 바로 붙나요?</H2>
      <p style={body}>
        네, 중간정산금을 받을 때 <strong>퇴직소득세</strong>가 원천징수돼요. 회사가 정산 금액에서 세금을 빼고 나머지를 입금하죠. 세금 계산 방식은 일반 퇴직금과 동일해요.
      </p>
      <p style={body}>
        퇴직소득세 계산 구조를 간단히 보면 이래요. 정산 금액에서 근속연수 공제를 빼고, 환산급여를 구한 뒤, 환산급여에 해당하는 세율을 적용하죠. <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법 제48조</a>가 근거예요.
      </p>
      <p style={body}>
        핵심은 <strong>근속연수 공제</strong>예요. 근속연수가 길수록 공제 금액이 커지고 세금이 줄어드는 구조인데, 중간정산을 하면 그 시점까지의 근속연수만 반영되니까 공제가 적어질 수 있죠.
      </p>

      <GreenBox title="퇴직소득세 계산 흐름">
        정산 금액 → <strong>근속연수 공제</strong> → 환산급여 산출 → 세율 적용 → 세액 확정<br />
        근속연수가 짧아지면 → 공제가 줄고 → 세금이 늘어날 수 있어요
      </GreenBox>

      <SectionBadge>내 상황 체크</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="세금 계산에 필요한 정보가 갖춰졌네요. 아래 계산법을 참고해서 예상 세액을 확인하세요."
        partialMatchText="일부 정보가 부족해요. 정산 금액과 근속연수를 먼저 확인하세요."
      />

      <Divider />

      {/* 섹션 2 */}
      <H2>중간정산 세금 계산 방법은?</H2>
      <p style={body}>
        계산 순서를 따라가 볼게요. 먼저 중간정산 금액에서 <strong>근속연수 공제</strong>를 빼요. 근속연수가 5년이면 공제가 500만 원 수준이고, 10년이면 1,500만 원 수준으로 늘어나죠 (정확한 공제 금액은 소득세법 별표에 따라요).
      </p>
      <p style={body}>
        공제 후 남은 금액을 근속연수로 나눠 <strong>환산급여</strong>를 구해요. 이 환산급여에 누진세율(6~45%)을 적용한 뒤, 다시 근속연수를 곱하면 최종 세액이 나오죠. 근속연수가 짧으면 환산급여가 커져서 높은 세율이 적용될 수 있어요.
      </p>
      <p style={body}>
        직접 계산하기 어렵다면 <a href="https://www.hometax.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>홈택스</a>에서 퇴직소득세 모의계산을 해볼 수 있어요. 정산 금액과 근속연수만 입력하면 예상 세액이 바로 나오죠. <a href="/w/퇴직금-세금" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 세금</a> 글에서 계산 과정을 더 자세히 다루고 있어요.
      </p>

      <BorderBox title="세금 계산이 어렵다면">
        홈택스(hometax.go.kr) → &ldquo;퇴직소득세 모의계산&rdquo;에서<br />
        정산 금액과 근속연수만 입력하면 예상 세액이 나와요.<br />
        무료이고 로그인 없이도 사용할 수 있어요.
      </BorderBox>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 */}
      <H2>만기 수령과 비교하면 세금이 더 많나요?</H2>
      <p style={body}>
        보통은 더 많아요. 10년 근무하고 한꺼번에 퇴직금을 받으면 10년치 근속연수 공제를 적용받죠. 그런데 5년 차에 중간정산하고 나머지 5년 후 퇴직하면, 각각 5년치 공제만 받게 돼요.
      </p>
      <p style={body}>
        근속연수 공제는 기간이 길수록 <strong>누적적으로 커지는 구조</strong>예요. 5년+5년 공제 합계가 10년 공제보다 작죠. 그래서 같은 총 퇴직금이라도 나눠 받으면 합산 세금이 더 나오는 게 일반적이에요.
      </p>
      <p style={body}>
        다만 예외도 있어요. 중간정산 시점의 급여가 낮고 퇴직 시점의 급여가 크게 올랐다면, 전체를 한꺼번에 받을 때 환산급여가 더 높아져서 오히려 세금이 커질 수도 있죠. 금액 차이가 크다면 두 시나리오를 모두 계산해보세요.
      </p>

      <Divider />

      {/* 섹션 4 */}
      <H2>중간정산 후 절세 방법이 있나요?</H2>
      <p style={body}>
        <strong>IRP 계좌</strong>를 활용하는 게 가장 효과적이에요. 중간정산금을 IRP에 이체하면 퇴직소득세가 이연(뒤로 미뤄짐)되죠. 이미 원천징수된 세금이 있다면, 정산 후 60일 이내에 IRP로 이체하면 환급받을 수 있어요.
      </p>
      <p style={body}>
        IRP에 넣어둔 뒤 55세 이후에 연금으로 수령하면 퇴직소득세의 60~70%만 내면 돼요. 일시금으로 인출하면 세금이 100% 부과되니까, 연금 수령이 절세 핵심이죠. <a href="/w/퇴직금-세금-절세-방법-IRP-연말정산" style={{ color: "#1D9E75", textDecoration: "underline" }}>IRP 절세 방법</a>에서 더 자세히 다루고 있어요.
      </p>
      <p style={body}>
        IRP 이체 없이 바로 현금으로 받으면 절세 기회가 사라져요. 목돈이 당장 필요한 게 아니라면 IRP 이체를 꼭 검토하세요. 당장 세금 부담을 줄이면서 노후 자금도 쌓을 수 있으니까요.
      </p>

      <SectionBadge>세금 관련 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* 섹션 5 */}
      <H2>세금 계산 실수를 피하는 방법은?</H2>
      <p style={body}>
        가장 흔한 실수는 <strong>근속연수를 잘못 세는 거</strong>예요. 입사일부터 중간정산일까지의 기간인데, 1년 미만은 올림 처리하는 경우가 있어요. 예를 들어 4년 8개월이면 근속연수는 5년으로 계산하죠.
      </p>
      <p style={body}>
        두 번째 실수는 <strong>공제 항목 누락</strong>이에요. 퇴직소득세에는 근속연수 공제 외에 환산급여 공제도 있어서, 하나라도 빠뜨리면 세금이 과다 산출될 수 있죠. 홈택스 모의계산기를 쓰면 이런 실수를 방지할 수 있어요.
      </p>
      <p style={body}>
        원천징수영수증을 반드시 받아두세요. 회사가 세금을 정확히 계산했는지 확인할 수 있는 유일한 서류예요. 나중에 종합소득세 신고나 세금 환급 시에도 필요하니까 분실하지 않도록 보관하세요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        중간정산 세금에 대해 자주 나오는 질문이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 소득세법을 바탕으로 작성됐어요. 세율 변동이 있을 수 있으니, 최신 기준은 국세청(nts.go.kr)에서 확인하세요." />
    </ArticleLayout>
  );
}
