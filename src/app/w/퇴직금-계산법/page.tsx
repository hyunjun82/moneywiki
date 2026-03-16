"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "1년 이상 같은 사업장에서 일했어요" },
  { id: "c2", label: "주 15시간 이상 근무하고 있어요" },
  { id: "c3", label: "최근 3개월 급여명세서를 갖고 있어요" },
  { id: "c4", label: "상여금·성과급 지급 이력을 알고 있어요" },
];

const CHECKLIST = [
  "최근 3개월 급여명세서 — 세전 총액 기준",
  "연간 상여금·성과급 내역 — 3/12 합산 필요",
  "근로계약서 — 기본급, 수당 구성 확인",
  "미사용 연차수당 내역 — 퇴직 전 1년간 발생분",
  "육아휴직 기간 증빙 — 근속연수 포함 여부 확인용",
];

const FAQS = [
  {
    q: "퇴직금은 세전 기준으로 계산하나요?",
    a: "네, 세전(총지급액) 기준이에요. 4대 보험·소득세 공제 전 금액으로 평균임금을 산정하죠.",
  },
  {
    q: "성과급이 매년 다른데 어떤 금액을 쓰나요?",
    a: "퇴직 전 1년간 받은 성과급 총액의 3/12를 3개월 임금 총액에 합산해요. 매년 금액이 달라도 직전 1년 기준이면 되죠.",
  },
  {
    q: "기본급만 넣고 계산하면 정확한가요?",
    a: "상당히 부정확해요. 상여금, 식대, 직책수당, 연차수당까지 포함해야 실제 퇴직금에 가까운 금액이 나오죠.",
  },
  {
    q: "퇴직금 계산기 결과를 신뢰해도 되나요?",
    a: "기본적인 구조는 맞지만, 상여금·연차수당 같은 변동 항목을 직접 입력해야 정확해요. 계산기 결과는 참고용으로 쓰고, 급여명세서 기반으로 검증하세요.",
  },
  {
    q: "퇴직금을 14일 안에 안 주면 어떻게 되나요?",
    a: "퇴직일로부터 14일 이내 미지급 시 연 20% 지연이자가 붙어요. 고용노동부(1350)에 진정을 넣으면 근로감독관이 조사에 착수하죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 — 퇴직급여 산정 기준", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "근로기준법 제2조 — 평균임금 정의", url: "https://www.law.go.kr/법령/근로기준법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 — 퇴직금 산정 가이드", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-계산-방법",
    title: "퇴직금 계산 방법, 공식과 실제 사례",
    description: "평균임금 산정부터 최종 금액 도출까지 실제 사례로 풀어드려요.",
  },
  {
    slug: "퇴직금-상여금-포함",
    title: "퇴직금에 상여금 포함되는 기준",
    description: "정기 상여금은 연간 총액의 3/12를 합산하는 게 원칙이에요.",
  },
  {
    slug: "퇴직금-육아휴직",
    title: "육아휴직 기간 퇴직금 포함 여부",
    description: "육아휴직 기간은 근속연수에 포함되지만 평균임금 산정에서는 제외돼요.",
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
          currentSlug="퇴직금-계산법"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 근로기준법 · 계산법</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 계산법,<br />
        월급쟁이가 알아야 할 핵심
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;퇴직금이 기본급의 몇 배 정도 되나요?&rdquo; 이렇게 물어보는 분이 많은데, 기본급만으로는 계산할 수 없어요.
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법</a>이 정한 기준은 <strong>평균임금</strong>이고, 여기에는 상여금, 식대, 연차수당까지 들어가죠.
        공식 하나만 알면 누구나 직접 계산할 수 있어요. 지금부터 핵심 공식, 항목별 포함 기준, 그리고 결과가 예상보다 적을 때 대처법까지 순서대로 정리해드릴게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 */}
      <H2>퇴직금 계산의 핵심 공식은 뭔가요?</H2>
      <p style={body}>
        공식은 딱 하나예요. <strong>1일 평균임금 x 30일 x (재직일수 / 365)</strong>. 이게 법이 정한 퇴직금 계산의 전부죠. 여기서 &ldquo;1일 평균임금&rdquo;만 정확히 구하면 나머지는 자동으로 따라와요.
      </p>
      <p style={body}>
        1일 평균임금은 퇴직 전 3개월간 받은 <strong>임금 총액</strong>을 그 기간의 <strong>총 일수</strong>로 나눈 거예요. 여기서 &ldquo;임금 총액&rdquo;에는 기본급뿐 아니라 정기 상여금(연간 총액의 3/12), 미사용 연차수당(연간의 3/12), 고정 수당(식대·교통비 등)이 모두 포함되죠.
      </p>
      <p style={body}>
        재직일수는 입사일부터 퇴직일 전날까지의 달력상 일수예요. 주말이나 공휴일도 포함되고, 수습 기간도 당연히 들어가요. 3년 근무(1,095일)에 1일 평균임금이 13만 원이라면, 130,000 x 30 x 3 = 약 1,170만 원이 퇴직금이 되죠.
      </p>

      <GreenBox title="퇴직금 계산법 요약">
        퇴직금 = 1일 평균임금 x 30일 x (재직일수 / 365)<br />
        1일 평균임금 = (3개월 기본급 + 고정수당 + 상여금 3/12 + 연차수당 3/12) / 3개월 총 일수<br />
        지급 기한: 퇴직일로부터 <strong>14일</strong>, 미지급 시 <strong>연 20%</strong> 이자
      </GreenBox>

      <SectionBadge>내 상황 체크</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="4가지 모두 해당돼요. 아래 내용을 참고해서 직접 계산해보세요."
        partialMatchText="일부 항목이 빠져 있네요. 급여명세서부터 확보하고 시작하세요."
      />

      <Divider />

      {/* 섹션 2 */}
      <H2>내 퇴직금은 얼마나 될까요?</H2>
      <p style={body}>
        실제 사례로 계산해볼게요. 월급 350만 원(세전), 정기 상여금 연 400만 원, 식대 월 10만 원, 근속 5년인 직장인이에요. 3개월 기본급+식대 = (350만+10만) x 3 = 1,080만 원. 여기에 상여금 3/12인 100만 원을 더하면 3개월 총액이 1,180만 원이죠.
      </p>
      <p style={body}>
        3개월 총 일수가 91일이라면 1일 평균임금은 1,180만 / 91 = 약 129,670원이에요. 퇴직금은 129,670 x 30 x 5 = 약 1,945만 원. 기본급만으로 계산했을 때(약 1,726만 원)보다 200만 원 넘게 차이 나죠. 상여금과 식대를 빠뜨리면 이만큼 손해를 보는 거예요.
      </p>
      <p style={body}>
        고용노동부에서 제공하는 <a href="https://www.moel.go.kr/retirementPay.do" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 계산기</a>를 이용하면 좀 더 편하게 확인할 수 있어요. 다만 상여금이나 연차수당은 직접 입력해야 정확한 결과가 나오니, 급여명세서를 옆에 두고 입력하세요.
      </p>

      <BorderBox title="간편 계산 기준">
        상여금·수당이 없는 단순한 경우라면<br />
        <strong>월급(세전) x 근속연수</strong>가 대략적인 퇴직금이에요.<br />
        정확한 금액은 반드시 평균임금 공식으로 계산해야 하죠.
      </BorderBox>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 */}
      <H2>성과급·상여금은 계산에 포함되나요?</H2>
      <p style={body}>
        <strong>정기적으로 지급되는 상여금</strong>은 포함돼요. 설·추석 상여금, 분기별 정기 상여금처럼 지급 시기와 금액이 미리 정해져 있으면 퇴직금 계산에 넣어야 하죠. 연간 상여금 총액의 3/12를 3개월 임금 총액에 합산하는 방식이에요.
      </p>
      <p style={body}>
        반면 <strong>성과급(인센티브)</strong>은 사안마다 달라요. 매년 고정 금액이 나오면 정기 상여금과 같은 취급을 받죠. 그런데 업적 평가에 따라 금액이 0원이 될 수도 있는 구조라면 &ldquo;고정성&rdquo;이 인정되기 어려워요. 대법원 판례는 &ldquo;전 근로자에게 일률적으로 지급되는지&rdquo;를 핵심 기준으로 보고 있죠.
      </p>
      <p style={body}>
        <a href="/w/퇴직금-상여금-포함" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 상여금 포함 기준</a>은 회사마다 다르고, 분쟁이 많은 영역이에요. 본인이 받는 성과급이 정기 상여금인지 변동 인센티브인지 구분이 안 되면, 근로계약서와 취업규칙을 먼저 살펴보세요. 그래도 모호하면 고용노동부(1350)에 문의하는 게 가장 빠르죠.
      </p>

      <Divider />

      {/* 섹션 4 */}
      <H2>육아휴직 기간도 근속연수에 포함되나요?</H2>
      <p style={body}>
        <strong>근속연수에는 포함</strong>돼요. <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법</a>은 육아휴직 기간을 재직기간에서 빼지 않죠. 그래서 5년 근무 중 1년 육아휴직을 했어도 근속연수는 5년 그대로예요.
      </p>
      <p style={body}>
        다만 <strong>평균임금 산정에서는 제외</strong>되는 구간이에요. 육아휴직 중에는 급여가 없거나 줄어드니까, 이 기간을 그대로 넣으면 평균임금이 왜곡되죠. 그래서 퇴직 전 3개월이 육아휴직과 겹치면, 휴직 전 3개월 임금으로 산정해요.
      </p>
      <p style={body}>
        복직 후 3개월 이상 일하고 퇴직했다면 일반적인 방법대로 퇴직 직전 3개월 기준이에요. <a href="/w/퇴직금-육아휴직" style={{ color: "#1D9E75", textDecoration: "underline" }}>육아휴직과 퇴직금</a> 관계가 좀 복잡하니, 본인 상황에 정확히 맞는 기간을 확인한 뒤 계산하세요.
      </p>

      <Divider />

      {/* 섹션 5 */}
      <H2>계산 결과보다 적게 받았다면?</H2>
      <p style={body}>
        회사에서 지급한 퇴직금이 본인 계산보다 적다면, 먼저 <strong>퇴직금 산정 내역서</strong>를 서면으로 요청하세요. 어떤 항목을 포함하고 어떤 항목을 빼서 계산했는지 한눈에 보이죠. 상여금이나 고정 수당이 빠져 있는 경우가 가장 흔해요.
      </p>
      <p style={body}>
        차이가 확인되면 인사팀에 재계산을 요청하고, 그래도 해결이 안 되면 <a href="/w/퇴직금-미지급-신고" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부에 진정</a>을 넣을 수 있어요. 퇴직일로부터 <strong>14일 이내</strong> 미지급(또는 차액 미지급) 시 <strong>연 20%</strong> 지연이자가 발생하니, 회사 입장에서도 빨리 바로잡는 게 유리하죠.
      </p>
      <p style={body}>
        퇴직금 청구 소멸시효는 퇴직일로부터 <strong>3년</strong>이에요. 시간은 있지만 급여명세서, 근로계약서, 상여금 지급 내역 같은 증빙은 시간이 지날수록 확보하기 어려워지죠. 퇴직 직후에 자료를 모아두는 게 나중에 큰 도움이 돼요.
      </p>

      <GreenBox title="퇴직금 차액 발생 시 대응">
        1. 회사에 퇴직금 산정 내역서 서면 요청<br />
        2. 항목별 포함·제외 대조 후 재계산 요청<br />
        3. 미해결 시 고용노동부(1350) 진정<br />
        미지급 14일 초과 → <strong>연 20%</strong> 지연이자, 소멸시효 <strong>3년</strong>
      </GreenBox>

      <SectionBadge>준비 서류 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 계산법에 대해 실제로 자주 나오는 질문만 모았어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법과 근로자퇴직급여보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니, 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
