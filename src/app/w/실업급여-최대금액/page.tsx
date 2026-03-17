"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR } from "@/data/실업급여-guide";

// ─── 수급일수 계산 함수 ──────────────────────────────

function getDays(years: number, ageOver50: boolean): number {
  if (years < 1) return 120;
  if (ageOver50) {
    if (years < 3) return 180;
    if (years < 5) return 210;
    if (years < 10) return 240;
    return 270;
  }
  // 50세 미만
  if (years < 3) return 150;
  if (years < 5) return 180;
  if (years < 10) return 210;
  return 240;
}

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직 전 평균임금(월급)을 확인했어요" },
  { id: "c2", label: "고용보험 피보험기간 180일 이상 충족했어요" },
  { id: "c3", label: "비자발적 퇴직이에요 (해고, 권고사직, 계약만료 등)" },
  { id: "c4", label: "내 나이와 가입기간에 따른 수급기간을 확인했어요" },
];

const CHECKLIST = [
  "고용24(ei.go.kr)에서 피보험기간 조회",
  "퇴직 전 3개월 평균임금 확인 (급여명세서 기준)",
  "1일 수급액 계산: 평균임금의 60% (상한 68,100원, 하한 66,048원)",
  "나이·가입기간으로 수급일수 확인",
  "총 수령액 = 1일 수급액 x 수급일수",
];

const FAQS = [
  {
    q: "2026년 실업급여 1일 상한액이 68,100원으로 올랐나요?",
    a: "네, 맞아요. 2026년 최저임금 인상에 따라 1일 상한액이 68,100원으로 조정됐어요. 하한액은 66,048원(최저임금의 80%)이죠.",
  },
  {
    q: "50세 미만이면 최대금액이 다른가요?",
    a: "달라요. 50세 미만은 아무리 오래 일해도 수급일수가 240일까지예요. 그래서 최대 16,344,000원이 한도이죠. 50세 이상은 270일까지라 18,387,000원이에요.",
  },
  {
    q: "여러 직장 가입기간이 합산되나요?",
    a: "네, 합산돼요. 중간에 끊겨도 다음 직장에서 다시 가입하면 이전 기간과 합쳐져요. 다만 이전 직장에서 실업급여를 이미 받았다면 그 기간은 제외되죠.",
  },
  {
    q: "월급이 300만원인데 상한액에 걸리나요?",
    a: "걸려요. 300만원의 60%는 180만원이고 일급으로 환산하면 60,000원이에요. 상한액 68,100원보다 낮으니까 실제 수급액은 60,000원이 되죠. 상한액을 받으려면 월급 약 341만원 이상이어야 해요.",
  },
  {
    q: "중간에 취업하면 남은 금액은 어떻게 되나요?",
    a: "남은 금액은 소멸돼요. 대신 수급일수의 절반 이상 남기고 취업하면 조기재취업수당을 받을 수 있죠. 남은 수급일수의 절반을 일시금으로 지급해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법 제45조~50조: 구직급여 수급일수 및 상한액 기준", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용보험법 시행령: 소정급여일수 산정 기준", url: "https://www.law.go.kr/법령/고용보험법시행령" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24: 실업급여 상한액·하한액 안내", url: "https://www.ei.go.kr" },
      { label: "고용노동부: 2026년 실업급여 기준", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "실업급여-최소금액",
    title: "실업급여 최소금액은 얼마일까",
    description: "하한액 기준으로 최소 얼마를 보장받는지 정리했어요.",
  },
  {
    slug: "실업급여-한달-얼마-받나요",
    title: "실업급여 한 달에 얼마 받나요",
    description: "월 수령액 계산법과 실수령액 예시를 정리했어요.",
  },
  {
    slug: "실업급여-모의계산",
    title: "실업급여 모의계산",
    description: "가입기간과 나이를 넣으면 예상 수령액을 바로 확인할 수 있어요.",
  },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={
        <Sidebar
          heading="실업급여 가이드"
          items={실업급여_SIDEBAR}
          currentSlug="실업급여-최대금액"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 수급액</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        실업급여 최대 금액, 하루 얼마까지?<br />
        2026년 상한액 기준
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &quot;최대로 받으면 도대체 총 얼마예요?&quot;
      </p>
      <p style={body}>
        2026년 기준 <strong>1일 상한액 68,100원</strong>이에요. 월로 환산하면 약 204만원이죠.
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>이 정한 이 상한액에 최대 수급일수 270일을 곱하면 총 <strong>18,387,000원</strong>이 나와요.
      </p>
      <p style={body}>
        다만 이 금액을 전부 받으려면 나이, 가입기간, 퇴직 사유 세 가지 조건을 모두 충족해야 해요. 아래에서 내 조건으로 계산해보세요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1: 최대금액 계산법 + 자격 체크 */}
      <H2>2026년 상한액 기준으로 최대 총액은 얼마일까?</H2>
      <p style={body}>
        공식은 단순해요. <strong>1일 수급액 x 수급일수</strong>가 곧 최대 수령 총액이죠. 2026년 1일 상한액은 68,100원인데, <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 매년 초에 고시하는 금액이에요. 퇴직 전 평균임금의 60%가 이 금액을 넘으면 상한액으로 잘려요.
      </p>
      <p style={body}>
        수급일수가 관건이에요. 나이와 <a href="/w/실업급여-피보험기간" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험 가입기간</a>에 따라 120일부터 최대 270일까지 차이가 나죠. 270일을 적용받으면 68,100원 x 270일 = <strong>18,387,000원</strong>이에요. 약 9개월 동안 매달 204만원씩 받는 셈이니까, 적지 않은 금액이죠.
      </p>
      <p style={body}>
        반대로 가장 짧은 120일만 인정받으면 68,100원 x 120일 = 8,172,000원이에요. <a href="/w/실업급여-최소금액" style={{ color: "#1D9E75", textDecoration: "underline" }}>하한액 기준 최소금액</a>과 비교해보면 총액 차이가 확연하죠. 같은 상한액인데 수급일수 하나로 총액이 1,000만원 이상 벌어지는 거예요. 그래서 &quot;내가 며칠 동안 받을 수 있는지&quot;를 먼저 파악하는 게 핵심이죠.
      </p>

      <GreenBox title="2026년 최대금액 공식">
        1일 상한액 68,100원 x 최대 수급일수 270일<br />
        = <strong>18,387,000원</strong> (약 1,839만원)<br />
        월 환산: 약 204만원 x 9개월
      </GreenBox>

      <SectionBadge>내 수급 조건을 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="4가지 모두 확인했어요. 아래 계산기로 예상 수령액을 바로 확인해보세요."
        partialMatchText="아직 확인 안 된 항목이 있어요. 고용24에서 먼저 조회해보세요."
      />

      <Divider />

      {/* 섹션 2: 나이별·가입기간별 최대금액 + 계산기 */}
      <H2>나이와 가입기간에 따라 상한액 기준 총액이 어떻게 달라질까?</H2>
      <p style={body}>
        수급일수를 가르는 변수는 딱 두 가지예요: <strong>퇴직 당시 나이</strong>와 <strong>고용보험 피보험기간</strong>이죠. <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>이 만 50세를 기준선으로 잡고 있어서, 50세 이상이거나 장애인이면 같은 가입기간이라도 수급일수가 더 길어요.
      </p>
      <p style={body}>
        구간별로 정리하면 이래요. 가입기간 <strong>1년 미만</strong>이면 나이 상관없이 120일(상한액 기준 약 817만원)이에요. <strong>1~3년</strong>이면 50세 미만은 150일(약 1,022만원), 50세 이상은 180일(약 1,226만원)이죠. <strong>3~5년</strong> 구간에서는 50세 미만 180일(약 1,226만원), 50세 이상 210일(약 1,430만원)이에요.
      </p>
      <p style={body}>
        <strong>5~10년</strong>이면 50세 미만 210일(약 1,430만원), 50세 이상 240일(약 1,634만원)이죠. <strong>10년 이상</strong>이면 50세 미만은 240일(약 1,634만원)이 천장이고, 50세 이상만 270일(약 <strong>1,839만원</strong>)까지 가능해요. 결국 50세 미만은 아무리 오래 일해도 240일을 넘을 수 없는 구조예요.
      </p>

      <BorderBox title="50세 기준 최대금액 비교">
        50세 미만 + 10년 이상 가입 → 240일 → 약 1,634만원<br />
        50세 이상 + 10년 이상 가입 → 270일 → 약 <strong>1,839만원</strong><br />
        30일 차이 = 약 204만원
      </BorderBox>

      <Calculator
        title="실업급여 예상 수령액 계산기"
        sliders={[
          {
            id: "salary",
            label: "퇴직 전 월급 (세전)",
            min: 150,
            max: 700,
            step: 10,
            defaultValue: 300,
            format: (v: number) => `${v}만원`,
          },
          {
            id: "years",
            label: "고용보험 가입기간",
            min: 0,
            max: 20,
            step: 1,
            defaultValue: 5,
            format: (v: number) => `${v}년`,
          },
          {
            id: "age",
            label: "퇴직 시 나이",
            min: 20,
            max: 64,
            step: 1,
            defaultValue: 40,
            format: (v: number) => `만 ${v}세`,
          },
        ]}
        results={[
          {
            label: "1일 수급액",
            getValue: (inputs: Record<string, number>) => {
              const daily = Math.round(inputs.salary * 10000 * 0.6 / 30);
              return Math.max(66048, Math.min(68100, daily));
            },
            format: (v: number) => `${v.toLocaleString()}원`,
          },
          {
            label: "수급기간",
            getValue: (inputs: Record<string, number>) =>
              getDays(inputs.years, inputs.age >= 50),
            format: (v: number) => `${v}일`,
          },
          {
            label: "예상 총 수령액",
            getValue: (inputs: Record<string, number>) => {
              const daily = Math.max(66048, Math.min(68100, Math.round(inputs.salary * 10000 * 0.6 / 30)));
              const days = getDays(inputs.years, inputs.age >= 50);
              return daily * days;
            },
            format: (v: number) => `${(v / 10000).toFixed(0)}만원 (${v.toLocaleString()}원)`,
            highlight: true,
          },
        ]}
        note="* 2026년 기준 상한액 68,100원 · 하한액 66,048원 적용. 실제 금액은 평균임금 산정 방식에 따라 다를 수 있어요."
      />

      {/* ── 관련 글 + 광고 ── */}
      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3: 최대금액 받으려면 + 체크리스트 */}
      <H2>상한액 기준 최대금액을 받기 위한 세 가지 조건</H2>
      <p style={body}>
        세 가지를 전부 갖춰야 해요. 첫째, <strong>고용보험 가입기간 10년 이상</strong>이죠. 여러 직장에서 일한 기간을 합산할 수 있어요. 중간에 1년쯤 쉬었다고 기간이 리셋되진 않지만, 이전 직장에서 실업급여를 이미 수급했다면 그 시점 이전 기간은 합산에서 빠지니까 주의하세요.
      </p>
      <p style={body}>
        둘째, <strong>퇴직 시점에 만 50세 이상</strong>이어야 해요. 49세 마지막 날에 퇴직하면 240일이 최대이고, 50세 생일 이후에 퇴직해야 270일을 적용받죠. 단 하루 차이로 약 204만원이 갈리는 셈이에요. 퇴직 시점을 조절할 여지가 있다면 꼭 따져보세요.
      </p>
      <p style={body}>
        셋째, <strong>비자발적 퇴직</strong>이어야 해요. 해고, 권고사직, 계약만료, 폐업이 대표적이죠. 내가 먼저 그만뒀더라도 임금체불이나 직장 내 괴롭힘 같은 정당한 사유가 인정되면 비자발적으로 처리돼요. 애매한 경우엔 퇴직 전에 고용센터(1350)에 미리 상담하는 게 안전하죠.
      </p>

      <SectionBadge>최대금액 수급 조건 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* 섹션 4: 중간에 취업하면 */}
      <H2>2026년 기준 중간에 취업하면 남은 금액의 처리</H2>
      <p style={body}>
        재취업하는 순간 남은 수급일수의 실업급여는 소멸돼요. 270일을 인정받았는데 150일째에 취업했다면 나머지 120일분은 받을 수 없죠. 68,100원 x 120일 = 약 817만원이 그대로 사라지는 구조예요.
      </p>
      <p style={body}>
        대신 <a href="/w/실업급여-취업촉진수당" style={{ color: "#1D9E75", textDecoration: "underline" }}>조기재취업수당</a>이라는 제도로 일부를 돌려받을 수 있어요. 수급일수의 절반 이상을 남기고 안정적인 직장에 취업하면, 남은 수급일수의 절반을 일시금으로 지급하죠. 위 예시라면 120일의 절반인 60일분, 약 409만원을 한꺼번에 받는 거예요.
      </p>
      <p style={body}>
        조건이 몇 가지 붙어요. 12개월 이상 고용이 보장되는 직장이어야 하고, 실업급여 신청 전에 이미 채용이 확정된 곳이면 안 돼요. 자영업을 시작하는 경우에도 일정 요건을 충족하면 수당을 받을 수 있죠. 빨리 재취업할수록 남은 일수가 많아서 돌려받는 금액이 커지니까, 구직활동을 미루지 않는 게 유리해요.
      </p>

      <Divider />

      {/* 섹션 5: 실전 정리 */}
      <H2>내 상한액 기준 최대금액을 지금 계산해보세요</H2>
      <p style={body}>
        나이와 고용보험 가입기간만 알면 바로 계산이 돼요. 가입기간을 정확히 모르겠다면 <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에 로그인해서 &quot;피보험기간 조회&quot;를 해보세요. 여러 직장 기간이 자동으로 합산돼서 나오니까 따로 더할 필요가 없죠.
      </p>
      <p style={body}>
        한 가지 주의할 게 있어요. 상한액을 받는다고 해서 모든 사람의 1일 수급액이 68,100원은 아니라는 점이죠. 실업급여 1일 지급액은 퇴직 전 평균임금의 60%인데, 이 값이 상한액보다 높으면 상한액으로 잘리고, 하한액보다 낮으면 하한액(66,048원)으로 올라가요. 월 평균임금이 약 341만원 이상이었다면 상한액에 해당될 가능성이 높죠.
      </p>
      <p style={body}>
        정리하면, <strong>50세 이상 + 10년 이상 가입 + 비자발적 퇴직</strong>일 때 최대 18,387,000원이에요. 50세 미만이면 아무리 오래 일해도 최대 16,344,000원이 한도이고요. 정확한 예상 수령액은 위 계산기를 돌리거나, <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a> 모의계산 서비스에서 한 번 더 조회해보세요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        실업급여 최대금액과 관련해서 실제로 많이 물어보는 내용만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법과 고용24 공시 자료를 바탕으로 작성됐어요. 실제 수급액은 퇴직 전 평균임금, 가입기간, 나이에 따라 달라지니 고용센터(1350) 상담을 받아보세요." />
    </ArticleLayout>
  );
}
