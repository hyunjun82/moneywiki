"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "주 15시간 이상 근무했어요" },
  { id: "c2", label: "1년 미만이지만 회사 규정에 퇴직금 조항이 있어요" },
  { id: "c3", label: "계약서에 퇴직금 비례 지급 문구가 있어요" },
  { id: "c4", label: "퇴직 전 3개월 급여명세서를 확보했어요" },
];

const CHECKLIST = [
  "근로계약서 — 퇴직금 관련 조항 확인",
  "급여명세서 3개월분 — 평균임금 산정 근거",
  "취업규칙 또는 단체협약 — 1년 미만 지급 규정 여부",
  "출퇴근 기록 — 실제 근무일수 증빙",
  "회사 인사 안내문 — 퇴직금 정책 명시 문서",
];

const FAQS = [
  {
    q: "법적으로 1년 미만 근무자는 퇴직금을 못 받나요?",
    a: "근로자퇴직급여보장법상 1년 미만 근무자는 법정 퇴직금 대상이 아니에요. 다만 취업규칙이나 근로계약서에 별도 규정이 있으면 받을 수 있죠.",
  },
  {
    q: "11개월 29일 일하고 퇴직하면 정말 0원인가요?",
    a: "법정 기준으로는 그래요. 하지만 회사 규정에 비례 지급 조항이 있다면 근무 일수만큼 계산해서 받을 수 있죠.",
  },
  {
    q: "수습 기간이 끝나고 바로 퇴직하면 퇴직금은?",
    a: "수습 포함 총 근무 기간이 1년 이상이면 받을 수 있어요. 수습도 근속기간에 포함되니까요.",
  },
  {
    q: "계약직 11개월 근무 후 재계약 없이 종료되면?",
    a: "1년 미만이면 법정 퇴직금 대상은 아니에요. 그런데 이전에 같은 회사에서 근무한 기간이 이어진다면 합산할 수 있죠.",
  },
  {
    q: "1년 미만 퇴직금을 주겠다던 회사가 안 주면?",
    a: "근로계약서나 취업규칙에 명시되어 있다면 계약 위반이에요. 고용노동부(1350)에 진정을 넣을 수 있죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 제4조 — 퇴직급여 지급 의무", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "근로기준법 제2조 — 평균임금의 정의", url: "https://www.law.go.kr/법령/근로기준법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 — 퇴직금 FAQ", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-1년미만",
    title: "1년 미만 퇴직금, 받을 수 있는 경우는?",
    description: "법정 기준은 1년이지만, 회사 규정에 따라 받을 수 있는 예외가 있어요.",
  },
  {
    slug: "퇴직금-계산-방법",
    title: "퇴직금 계산 방법, 공식과 실제 사례",
    description: "1일 평균임금 x 30일 x 근속연수 공식을 사례로 풀어드려요.",
  },
  {
    slug: "퇴직금-미지급-신고",
    title: "퇴직금 미지급 신고 방법과 절차",
    description: "14일 이내 미지급 시 연 20% 지연이자가 붙어요.",
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
          currentSlug="퇴직금-계산-방법-1년-미만-기준"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 근로기준법 · 계산법</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        1년 미만 퇴직금 계산,<br />
        정확한 방법은?
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;11개월 일했는데 퇴직금이 0원이라고요?&rdquo; 법적으로는 맞아요.
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법</a>은 <strong>1년 이상</strong> 근무한 근로자에게만 퇴직금 지급 의무를 두고 있죠.
        그런데 회사 취업규칙이나 근로계약서에 &ldquo;1년 미만도 비례 지급&rdquo; 조항이 있다면 이야기가 달라져요.
        지금부터 1년 미만 퇴직금 계산법, 0원이 되는 경우, 그리고 청구 방법까지 차근차근 정리해드릴게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 */}
      <H2>1년 미만 퇴직금 계산 공식이 따로 있나요?</H2>
      <p style={body}>
        별도 공식은 없어요. 1년 이상이든 미만이든 퇴직금 계산 공식은 동일하죠. <strong>1일 평균임금 x 30일 x (재직일수 / 365)</strong>예요. 다만 법정 퇴직금은 1년 이상 근무자에게만 의무 지급이고, 1년 미만은 회사 자체 규정이 있을 때만 적용돼요.
      </p>
      <p style={body}>
        예를 들어 8개월(240일) 근무하고 1일 평균임금이 13만 원이라면, 130,000 x 30 x (240/365) = 약 256만 원이 나오죠. 이 금액을 회사 규정에 따라 지급하는 거예요. 법이 강제하는 건 아니지만, 계약서에 적혀 있으면 지급 의무가 생기죠.
      </p>
      <p style={body}>
        취업규칙에 &ldquo;근무 기간에 비례하여 퇴직금을 지급한다&rdquo;는 문구가 있다면 해당 조항이 법적 구속력을 가져요. 회사가 이를 무시하면 계약 위반이니, 고용노동부에 진정을 넣을 수 있죠. 입사할 때 받은 근로계약서와 취업규칙을 꼭 확인해보세요.
      </p>

      <GreenBox title="1년 미만 퇴직금 핵심">
        법정 의무: 1년 이상 근무자만 해당<br />
        회사 규정에 비례 지급 조항이 있으면 1년 미만도 받을 수 있어요<br />
        계산 공식: 1일 평균임금 x 30일 x (재직일수 / 365)
      </GreenBox>

      <SectionBadge>내 상황 체크</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="4가지 모두 해당돼요. 회사 규정을 근거로 퇴직금을 청구할 수 있어요."
        partialMatchText="일부만 해당되네요. 근로계약서와 취업규칙을 먼저 확인해보세요."
      />

      <Divider />

      {/* 섹션 2 */}
      <H2>근무 일수로 계산하는 방법은?</H2>
      <p style={body}>
        비례 계산의 핵심은 <strong>실제 재직일수</strong>예요. 입사일부터 퇴직일까지의 달력상 일수를 세면 되죠. 주말, 공휴일도 전부 포함돼요. 출근한 날만 세는 게 아니라 재직한 전체 기간이 기준이니까요.
      </p>
      <p style={body}>
        구체적으로 계산해볼게요. 월급 300만 원(세전), 재직 6개월(183일)인 경우예요. 3개월 임금 총액 900만 원 / 91일 = 1일 평균임금 약 98,901원. 여기에 30일을 곱하고 183/365를 곱하면 약 148만 원이 나오죠.
      </p>
      <p style={body}>
        상여금이나 연차수당이 있다면 3개월 총액에 합산해야 해요. <a href="/w/퇴직금-계산-방법" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 계산 방법</a> 글에서 상여금 포함 기준을 자세히 다루고 있으니 참고하세요. 빠뜨리면 금액이 상당히 줄어들 수 있거든요.
      </p>

      <BorderBox title="재직일수 계산 팁">
        입사일: 2025년 3월 1일, 퇴직일: 2025년 9월 1일이면<br />
        재직일수 = 184일 (달력상 일수, 주말·공휴일 포함)<br />
        퇴직일 당일은 포함하지 않는 게 일반적이에요.
      </BorderBox>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 */}
      <H2>1년 미만도 평균임금이 기준인가요?</H2>
      <p style={body}>
        네, 기준은 똑같아요. 1년 이상이든 미만이든 퇴직금의 기초가 되는 건 <strong>1일 평균임금</strong>이죠. 퇴직 전 3개월간 받은 임금 총액을 그 기간의 총 일수로 나눈 금액이에요. 이건 법에서 정한 유일한 산정 방식이고, 회사가 임의로 바꿀 수 없어요.
      </p>
      <p style={body}>
        다만 근무 기간이 3개월 미만이면 계산이 좀 달라져요. 입사일부터 퇴직일까지의 임금 총액을 그 기간의 총 일수로 나누면 되죠. 2개월 근무자라면 2개월 총액 / 해당 일수로 계산하는 거예요.
      </p>
      <p style={body}>
        평균임금이 <a href="/w/퇴직금-통상임금-계산" style={{ color: "#1D9E75", textDecoration: "underline" }}>통상임금</a>보다 낮게 나오면 통상임금을 적용해요. 이건 1년 미만이라고 예외가 아니에요. 두 금액을 비교해서 근로자에게 유리한 쪽을 쓰는 게 원칙이죠.
      </p>

      <Divider />

      {/* 섹션 4 */}
      <H2>계산 결과가 0원이 나오는 경우는?</H2>
      <p style={body}>
        0원이 나오는 건 크게 두 가지 상황이에요. 첫째, <strong>법정 퇴직금 대상이 아닌 경우</strong>죠. 근무 기간 1년 미만이고 회사 규정에도 비례 지급 조항이 없으면 법적으로 퇴직금 지급 의무가 없어요. 이때 계산 결과는 0원이 맞아요.
      </p>
      <p style={body}>
        둘째, <strong>주 15시간 미만 근무자</strong>예요. 주 15시간 미만(이른바 초단시간 근로자)은 근로자퇴직급여보장법 적용 대상에서 제외되죠. 아무리 오래 일해도 퇴직금이 발생하지 않아요.
      </p>
      <p style={body}>
        다만 &ldquo;0원이라고 들었는데 정말 맞나?&rdquo; 의문이 든다면, 근로계약서와 취업규칙을 다시 살펴보세요. 회사 내규에 비례 지급 규정이 숨어 있는 경우가 꽤 있거든요. 모르고 넘어가면 받을 수 있는 돈을 놓치는 셈이죠.
      </p>

      <Divider />

      {/* 섹션 5 */}
      <H2>계산 후 청구하는 방법은?</H2>
      <p style={body}>
        회사 규정에 비례 지급 조항이 있다면, 퇴직 시 인사팀에 퇴직금 지급을 서면으로 요청하세요. 구두 요청만으로는 나중에 증거가 남지 않으니 이메일이나 내용증명을 활용하는 게 좋죠. 요청 후 <strong>14일 이내</strong>에 지급받아야 해요.
      </p>
      <p style={body}>
        14일이 지나도 지급이 안 되면 <strong>연 20%</strong> 지연이자가 붙어요. <a href="/w/퇴직금-미지급-신고" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부에 진정</a>을 넣으면 근로감독관이 사실 조사를 진행하죠. 소멸시효는 퇴직일로부터 <strong>3년</strong>이니 기한 내에 움직여야 해요.
      </p>
      <p style={body}>
        법정 퇴직금 대상이 아닌데 회사가 &ldquo;줄 수 없다&rdquo;고 한다면, 법적 강제 수단은 없어요. 다만 계약서에 명시된 조항이 있다면 민사소송으로 청구할 수 있죠. 금액이 크지 않다면 소액사건심판(3,000만 원 이하)을 이용하면 비용과 시간을 아낄 수 있어요.
      </p>

      <GreenBox title="1년 미만 퇴직금 청구 절차">
        1. 근로계약서·취업규칙에서 비례 지급 조항 확인<br />
        2. 회사에 서면(이메일·내용증명)으로 퇴직금 지급 요청<br />
        3. 14일 이내 미지급 시 → 고용노동부(1350) 진정<br />
        4. 소멸시효 <strong>3년</strong> 이내 행사 필수
      </GreenBox>

      <SectionBadge>준비 서류 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        1년 미만 퇴직금 계산과 관련해서 자주 나오는 질문이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니, 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
