"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR } from "@/data/실업급여-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "현재 실업급여(구직급여)를 수급 중이에요" },
  { id: "c2", label: "고용센터 소장이 지시한 직업훈련 과정을 수강하고 있어요" },
  { id: "c3", label: "해당 월 훈련기관 출석률이 80% 이상이에요" },
  { id: "c4", label: "고용센터에서 훈련 수강을 승인받았어요" },
];

const CHECKLIST = [
  "고용센터 상담 시 '지시 훈련' 여부를 반드시 확인하기",
  "훈련기관 출석 체크를 빠짐없이 하기 (80% 미만이면 그달 수당 없음)",
  "수당이 안 들어왔다면 훈련기관에 출석 데이터 전송 여부 확인",
  "내일배움카드 훈련비와 직업능력개발수당은 별도이니 둘 다 챙기기",
  "훈련연장급여 기간에도 직업능력개발수당 지급 여부 확인하기",
];

const CALC_SLIDERS = [
  {
    id: "days",
    label: "월 훈련 출석 일수",
    min: 10,
    max: 25,
    step: 1,
    defaultValue: 20,
    format: (v: number) => `${v}일`,
  },
  {
    id: "months",
    label: "총 훈련 기간",
    min: 1,
    max: 6,
    step: 1,
    defaultValue: 3,
    format: (v: number) => `${v}개월`,
  },
];

const CALC_RESULTS = [
  {
    label: "1일 수당",
    getValue: () => 5800,
    format: (v: number) => `${v.toLocaleString()}원`,
  },
  {
    label: "월 예상 수당",
    getValue: (inputs: Record<string, number>) => inputs.days * 5800,
    format: (v: number) => `${v.toLocaleString()}원`,
  },
  {
    label: "총 예상 수당",
    getValue: (inputs: Record<string, number>) => inputs.days * 5800 * inputs.months,
    format: (v: number) => `약 ${v.toLocaleString()}원`,
    highlight: true,
  },
];

const FAQS = [
  {
    q: "직업능력개발수당은 실업급여랑 별개로 받는 건가요?",
    a: "맞아요. 실업급여(구직급여)와 별도로 추가 지급되는 수당이에요. 훈련에 출석하면 교통비와 식비 명목으로 나오죠. 두 가지를 동시에 수령하게 돼요.",
  },
  {
    q: "내일배움카드로 직접 등록한 훈련도 해당되나요?",
    a: "안 돼요. 고용센터 소장이 지시한 훈련만 해당되죠. 본인이 직접 골라서 등록한 훈련은 직업능력개발수당 대상이 아니에요. 같은 과정이라도 지시 여부가 핵심이에요.",
  },
  {
    q: "출석률이 80% 미만이면 아예 못 받나요?",
    a: "그 달은 못 받아요. 정당한 사유(병원 진료, 경조사 등) 없이 결석이 많으면 해당 월 수당이 지급되지 않죠. 다음 달에 80% 이상 채우면 다시 받게 돼요.",
  },
  {
    q: "훈련연장급여를 받는 중에도 직업능력개발수당이 나오나요?",
    a: "나와요. 훈련연장급여를 받는 기간에도 훈련에 출석하면 직업능력개발수당이 함께 지급돼요. 두 급여를 동시에 수령할 수 있죠.",
  },
  {
    q: "직업능력개발수당은 따로 신청해야 하나요?",
    a: "별도 신청이 필요 없어요. 훈련기관에서 매달 출석 데이터를 고용센터에 전송하고, 조건 충족이 확인되면 자동으로 지급되죠. 안 들어왔다면 출석 데이터 전송 여부를 확인해보세요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법 — 직업능력개발수당 지급 근거", url: "https://www.law.go.kr/법령/고용보험법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24 — 실업급여 부가급여 안내", url: "https://www.ei.go.kr" },
      { label: "고용노동부 — 직업훈련 지원 정책 (상담 1350)", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "실업급여-직업훈련",
    title: "실업급여 받으면서 직업훈련 받는 방법",
    description: "내일배움카드와 훈련연장급여를 활용하는 방법을 정리했어요.",
  },
  {
    slug: "실업급여-훈련연장급여",
    title: "훈련연장급여로 실업급여 기간 늘리기",
    description: "훈련이 안 끝났다면 최대 2년까지 급여 연장이 가능해요.",
  },
  {
    slug: "실업급여-구직활동-횟수",
    title: "실업급여 구직활동 횟수와 인정 방법",
    description: "실업인정일마다 필요한 구직활동 횟수와 인정 방법을 정리했어요.",
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
          currentSlug="실업급여-직업능력개발수당"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 직업훈련</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        훈련받으면 수당 따로 나온다고?<br />
        직업능력개발수당 금액과 신청 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &quot;직업훈련 다니기로 했는데, 교통비랑 점심값은 누가 내주나요?&quot;
      </p>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>에서 정해놨어요.
        고용센터 지시 훈련에 출석하면 교통비와 식비 명목으로 <strong>월 최대 11만6천원</strong>을 추가로 지급하죠.
        실업급여와 별개이기 때문에 둘 다 수령할 수 있고요.
        어떤 조건을 갖춰야 하고, 실제로 얼마나 받는지 계산해볼게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 — 직업능력개발수당이란 + 자격 */}
      <H2>직업능력개발수당, 정확히 어떤 수당인가요?</H2>
      <SectionBadge>수급 자격 체크</SectionBadge>

      <p style={body}>
        <strong>훈련 참여 수당</strong>이에요.
        실업급여를 받는 사람이 고용센터에서 지시한 직업훈련에 출석하면, 교통비와 식비 명목으로 별도 수당을 지급하는 제도죠.
        구직급여와는 완전히 별개 항목이라 두 가지를 동시에 수령하게 돼요.
      </p>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>에서 규정한 정식 명칭이에요.
        현장에서는 &quot;훈련장려금&quot;이라고 부르기도 하는데, 같은 제도를 가리키는 거죠.
        실업급여 수급자가 받을 수 있는 부가급여 중 하나이고, <a href="/w/실업급여-취업촉진수당" style={{ color: "#1D9E75", textDecoration: "underline" }}>조기재취업수당이나 광역구직활동비</a>와 같은 카테고리에 속해요.
      </p>
      <p style={body}>
        두 가지 조건을 모두 충족해야 받을 수 있죠.
        첫째, <strong>고용센터 소장이 지시한 훈련</strong>이어야 해요. 본인이 직접 선택한 내일배움카드 훈련은 해당이 안 돼요.
        둘째, <strong>훈련 출석률 80% 이상</strong>을 유지해야 하죠. 한 달에 20일 훈련이면 최소 16일은 출석해야 해요.
      </p>

      <GreenBox title="직업능력개발수당 핵심 조건">
        대상: 실업급여 수급 중 + 고용센터 지시 훈련 수강자<br />
        출석 조건: 해당 월 출석률 80% 이상<br />
        금액: 1일 약 5,800원 x 출석 일수 (월 최대 11만6천원)<br />
        지급 방식: 별도 신청 없이 자동 지급
      </GreenBox>

      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="직업능력개발수당을 받을 수 있는 조건을 갖췄어요. 출석률만 유지하면 자동 지급돼요."
        partialMatchText="일부 조건이 맞지 않아요. 고용센터에서 '지시 훈련' 해당 여부를 먼저 확인해보세요."
      />

      <Divider />

      {/* 섹션 2 — 금액 계산 + Calculator */}
      <H2>금액은 얼마나 되고 어떻게 계산하나요?</H2>

      <p style={body}>
        <strong>1일 약 5,800원</strong>이에요. 한 달에 20일 훈련을 받으면 5,800원 x 20일 = <strong>11만6천원</strong>이 되는 구조죠.
        실제 훈련 일수에 비례해서 달라지니까, 월마다 금액이 조금씩 차이가 나요.
      </p>
      <p style={body}>
        금액 자체는 크지 않아 보이지만, 실업급여에 더해서 받는 추가 수당이에요.
        3개월 훈련이면 약 35만원, 6개월이면 약 70만원이 쌓이죠.
        훈련비 자체는 내일배움카드에서 별도로 지원되니까, 직업능력개발수당은 순수하게 교통비와 식비를 보전해주는 역할이에요.
      </p>
      <p style={body}>
        아래 계산기에서 본인의 월 출석 일수와 훈련 기간을 입력하면 예상 수당을 바로 확인할 수 있죠.
        주말과 공휴일은 훈련이 없으니까, 보통 월 18~22일 정도를 기준으로 잡으면 돼요.
      </p>

      <Calculator
        title="직업능력개발수당 예상 금액"
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="1일 수당 약 5,800원 기준. 실제 지급액은 고용노동부 고시에 따라 달라질 수 있어요."
      />

      <BorderBox title="금액 요약">
        1일 약 5,800원 x 실제 훈련 출석 일수<br />
        월 20일 출석 기준 → 약 11만6천원<br />
        실업급여(구직급여)와 별도 지급, 중복 수령 가능
      </BorderBox>

      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 — 신청 방법과 지급 절차 */}
      <H2>직업능력개발수당 신청 방법과 지급 절차</H2>
      <SectionBadge>신청·지급 체크리스트</SectionBadge>

      <p style={body}>
        <strong>별도 신청이 필요 없어요.</strong>
        고용센터 지시 훈련을 받고 출석률 80% 이상이면 자동으로 지급되죠.
        훈련기관에서 매달 출석 정보를 고용센터에 전송하고, 고용센터에서 조건 충족 여부를 확인한 뒤 지급하는 구조예요.
      </p>
      <p style={body}>
        지급 시기는 <strong>훈련 월 종료 후</strong>예요.
        1월에 훈련을 받았으면 2월에 입금되는 식이죠.
        실업급여 지급일과는 다를 수 있으니, 통장에 별도 항목으로 들어오는지 꼭 살펴보세요.
      </p>
      <p style={body}>
        수당이 안 들어왔다면 훈련기관에 출석 데이터가 제대로 전송됐는지 확인하는 게 먼저예요.
        출석 인정에 문제가 생겼을 수도 있으니까요.
        <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 수급 내역을 조회하거나, 관할 고용센터(1350)에 문의하면 바로 확인할 수 있죠.
      </p>

      <Checklist items={CHECKLIST} />

      <Divider />

      {/* 섹션 4 — 훈련비 지원과 구분 */}
      <H2>훈련비 지원과 직업능력개발수당의 차이</H2>

      <p style={body}>
        직업능력개발수당은 <strong>교통비와 식비</strong> 명목이에요.
        훈련 수강료 자체는 내일배움카드에서 별도로 지원되죠.
        두 가지가 성격이 다르기 때문에 동시에 수령하게 돼요. 내일배움카드로 훈련비를 지원받으면서 직업능력개발수당도 함께 받는 구조이죠.
      </p>
      <p style={body}>
        <a href="/w/실업급여-훈련연장급여" style={{ color: "#1D9E75", textDecoration: "underline" }}>훈련연장급여</a>와도 구분해야 해요.
        훈련연장급여는 실업급여 수급 기간이 끝난 뒤에도 훈련 중이면 급여를 연장해주는 제도이고, 직업능력개발수당은 훈련 기간 내내 교통비와 식비를 보전해주는 제도예요.
        훈련연장급여를 받는 기간에도 직업능력개발수당은 함께 나오죠.
      </p>
      <p style={body}>
        정리하면, 직업훈련 기간에 받을 수 있는 지원금은 세 가지예요.
        <strong>실업급여(또는 훈련연장급여) + 직업능력개발수당 + 내일배움카드 훈련비 지원</strong>.
        세 가지 모두 중복 수령이 가능하니까, 훈련받기로 결정했다면 빠짐없이 챙기세요.
      </p>

      <Divider />

      {/* 섹션 5 — 주의사항 */}
      <H2>직업능력개발수당 받을 때 이것만 주의하세요</H2>

      <p style={body}>
        가장 많이 하는 실수가 <strong>&quot;내일배움카드 훈련 = 지시 훈련&quot;</strong>이라고 착각하는 거예요.
        내일배움카드로 등록한 훈련이라도, 고용센터 소장이 &quot;이 과정을 수강하세요&quot;라고 지시한 게 아니면 직업능력개발수당 대상이 아니에요.
        고용센터 상담 시 지시 훈련 해당 여부를 반드시 따져보세요.
      </p>
      <p style={body}>
        출석률 관리도 중요하죠. 80%는 생각보다 빡빡한 기준이에요.
        20일 훈련 중 5일만 빠져도 75%로 떨어져서 그 달 수당을 못 받아요.
        정당한 사유(병원 진료, 경조사)가 있다면 훈련기관에 사전 신고하고 증빙을 제출하세요.
      </p>
      <p style={body}>
        수당이 자동 지급이라고 해서 아무것도 안 해도 되는 건 아니에요.
        훈련기관의 출석 데이터 전송이 지연되거나 누락되면 수당이 안 나올 수 있죠.
        <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 수급 내역을 주기적으로 조회하는 습관을 들이세요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        직업능력개발수당에 대해 실제로 많이 궁금해하는 내용을 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법을 바탕으로 작성됐어요. 1일 수당 금액은 고용노동부 고시에 따라 변경될 수 있으니, 관할 고용센터(1350)에 확인하세요." />
    </ArticleLayout>
  );
}
