"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body, Calculator,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR } from "@/data/실업급여-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "기간제 교사(비정규직)로 근무했어요" },
  { id: "c2", label: "급여명세서에서 고용보험료가 공제되고 있어요" },
  { id: "c3", label: "계약 만료 또는 비자발적으로 퇴직했어요" },
  { id: "c4", label: "퇴직 전 18개월 중 피보험기간 180일 이상이에요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "퇴직 전 월 평균임금", min: 150, max: 500, step: 10, defaultValue: 250, format: (v: number) => `${v}만원` },
  { id: "age", label: "퇴직 시 나이", min: 25, max: 65, step: 1, defaultValue: 35, format: (v: number) => `${v}세` },
  { id: "years", label: "고용보험 가입기간", min: 1, max: 15, step: 1, defaultValue: 3, format: (v: number) => `${v}년` },
];

function getDays(age: number, years: number): number {
  if (age >= 50) {
    if (years < 1) return 120;
    if (years < 3) return 180;
    if (years < 5) return 210;
    if (years < 10) return 240;
    return 270;
  }
  if (years < 1) return 120;
  if (years < 3) return 150;
  if (years < 5) return 180;
  if (years < 10) return 210;
  return 240;
}

const CALC_RESULTS = [
  {
    label: "1일 수급액",
    getValue: (v: Record<string, number>) => {
      const daily = Math.round((v.salary * 10000 * 0.6) / 30);
      return Math.max(66048, Math.min(68100, daily));
    },
    format: (v: number) => `${v.toLocaleString()}원`,
  },
  {
    label: "수급기간",
    getValue: (v: Record<string, number>) => getDays(v.age, v.years),
    format: (v: number) => `${v}일 (약 ${Math.round(v / 30)}개월)`,
  },
  {
    label: "예상 총 수령액",
    getValue: (v: Record<string, number>) => {
      const daily = Math.max(66048, Math.min(68100, Math.round((v.salary * 10000 * 0.6) / 30)));
      return daily * getDays(v.age, v.years);
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
];

const CHECKLIST = [
  "고용보험 가입 여부 확인 (급여명세서에서 고용보험료 공제 확인)",
  "고용24(ei.go.kr)에서 피보험 이력 조회",
  "이직확인서에 퇴직 사유가 정확히 기재되었는지 확인",
  "퇴직 후 고용24에서 온라인 교육 수강",
  "수급자격 인정 신청서 제출",
];

const FAQS = [
  {
    q: "공립학교 기간제 교사도 실업급여를 받을 수 있나요?",
    a: "받을 수 있죠. 기간제 교사는 공립이든 사립이든 공무원이 아니에요. 고용보험에 가입되고 피보험기간 180일 이상이면 계약 만료 시 실업급여 대상이에요.",
  },
  {
    q: "사립학교 교사가 본인이 먼저 퇴사하면요?",
    a: "자발적 퇴사는 원칙적으로 실업급여 대상이 아니에요. 다만 임금체불이나 괴롭힘 같은 정당한 사유가 있으면 인정받을 수 있죠.",
  },
  {
    q: "방학 기간에 무급이었으면 피보험기간에 포함되나요?",
    a: "무급 기간은 피보험기간에 산입되지 않아요. 기간제 교사로 1년 계약했더라도 방학 기간이 무급이면 180일이 안 될 수 있으니 고용24에서 꼭 조회해보세요.",
  },
  {
    q: "학원 강사도 실업급여 대상이에요?",
    a: "고용보험에 가입돼 있으면 대상이에요. 주 15시간 이상 근무하거나 3개월 이상 계속 근무했으면 고용보험 가입 대상이죠. 급여명세서에서 고용보험료 공제 여부를 먼저 살펴보세요.",
  },
  {
    q: "기간제 교사인데 학교에서 재계약을 제의했어요. 거절하면 실업급여를 못 받나요?",
    a: "거절하면 자발적 퇴사로 볼 수 있어서 실업급여가 어려워요. 다만 재계약 조건이 기존보다 현저히 불리하면(임금 삭감, 근무지 변경 등) 정당한 사유로 인정될 수 있죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법: 피보험자격 및 수급자격", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "교육공무원법: 교육공무원의 신분", url: "https://www.law.go.kr/법령/교육공무원법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24: 실업급여 신청 안내", url: "https://www.ei.go.kr" },
      { label: "고용노동부: 고용보험 가입 대상 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "공무원-실업급여",
    title: "공무원 실업급여 받을 수 있을까?",
    description: "공무원은 고용보험 대상이 아니지만, 예외적으로 받을 수 있는 경우가 있죠.",
  },
  {
    slug: "계약만료-실업급여",
    title: "계약만료 퇴직 시 실업급여",
    description: "계약 만료는 비자발적 퇴사로 인정돼요. 기간제 교사에게 가장 흔한 경우예요.",
  },
  {
    slug: "기간제-실업급여",
    title: "기간제 근로자 실업급여 조건",
    description: "기간제 근로자의 실업급여 수급 조건과 신청 방법을 정리했어요.",
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
          currentSlug="교사-실업급여"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 교사</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        기간제 교사 실업급여, 받을 수 있을까?<br />
        유형별 수급 조건
      </h1>

      <p style={{ ...body, fontSize: 16, lineHeight: 2.1 }}>
        &quot;선생님도 실업급여를 받을 수 있나요?&quot;
      </p>
      <p style={body}>
        교사 유형에 따라 결론이 완전히 달라요.
        <strong>공무원 신분</strong>인 정교사는 고용보험 가입 대상이 아니라 실업급여를 못 받죠.
        반면 기간제 교사, 사립학교 교사, 강사는{" "}
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>에 따라
        고용보험에 가입돼 있으면 수급 대상이에요.
      </p>
      <p style={body}>
        기간제 교사라면 계약 만료 자체가 비자발적 퇴사로 인정되니까 조건이 맞으면 바로 신청할 수 있죠.
        2026년 기준 1일 하한액 <strong>66,048원</strong>이고, 내 유형이 어디에 해당하는지부터 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1: 교사 유형별 실업급여 대상 여부 */}
      <H2>유형별로 수급 조건이 어떻게 다른가요?</H2>
      <p style={body}>
        &quot;교사&quot;라는 직함은 같아도 법적 신분은 전부 달라요.
        <strong>공립학교 정교사</strong>는 임용시험을 거쳐 임용된{" "}
        <a href="https://www.law.go.kr/법령/교육공무원법" style={{ color: "#1D9E75", textDecoration: "underline" }}>교육공무원</a>이에요.
        공무원은 고용보험에 가입하지 않고 고용보험료도 내지 않죠.
        그래서 실업급여 자체가 적용되지 않아요. 대신 공무원연금이 적용되고요.
      </p>
      <p style={body}>
        <strong>사립학교 교사</strong>는 학교법인에 소속된 민간 근로자예요.
        급여명세서를 보면 고용보험료가 빠져나가고 있을 거예요: 이미 가입된 상태라는 뜻이죠.
        비자발적으로 퇴직하면 실업급여를 신청할 수 있죠.
        본인이 먼저 사직서를 냈다면 원칙적으로 대상이 아니지만, <a href="/w/임금체불-실업급여" style={{ color: "#1D9E75", textDecoration: "underline" }}>임금체불</a>이나 괴롭힘 같은 정당한 사유가 있으면 예외적으로 인정받을 수 있죠.
      </p>
      <p style={body}>
        <strong>기간제 교사</strong>는 공립이든 사립이든 고용보험 가입 대상이에요.
        공무원이 아닌 계약직 신분이니까요.
        계약 기간이 끝나면 비자발적 퇴사로 인정돼서 실업급여를 받을 수 있고요.
        시간강사나 학원 강사도 고용보험에 가입돼 있다면 마찬가지 조건이에요.
      </p>

      <GreenBox>
        <p style={{ margin: "0 0 4px" }}>공립학교 정교사 (공무원) → 실업급여 대상 아님, 공무원연금 수급</p>
        <p style={{ margin: "0 0 4px" }}>사립학교 교사 → 고용보험 가입 대상, 비자발적 퇴직 시 수급 가능</p>
        <p style={{ margin: "0 0 4px" }}>기간제 교사 (공립/사립) → 고용보험 가입 대상, 계약 만료 시 수급 가능</p>
        <p style={{ margin: 0 }}>시간강사·학원 강사 → 고용보험 가입 시 수급 가능</p>
      </GreenBox>

      <SectionBadge>내 상황에 해당되는지 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="4가지 다 해당되네요. 기간제 교사 실업급여 수급 자격을 갖췄어요. 고용센터에서 바로 신청하세요."
        partialMatchText="일부만 해당돼요. 나머지 조건도 확인해보고 고용센터(1350)에 상담해보세요."
      />

      <Divider />

      {/* 섹션 2: 기간제 교사 실업급여 핵심 + 계산기 */}
      <H2>기간제 교사의 수급 조건은 무엇인가요?</H2>
      <p style={body}>
        기간제 교사에게 가장 중요한 숫자는 <a href="/w/실업급여-피보험기간" style={{ color: "#1D9E75", textDecoration: "underline" }}>피보험기간</a> <strong>180일</strong>이에요.
        퇴직일 기준으로 최근 18개월 동안 고용보험에 가입된 기간이 180일 이상이어야 하죠.
        1년 계약이면 보통 넘기지만, 방학 기간이 무급이었다면 빠질 수 있죠.
        이게 함정이에요.
      </p>
      <p style={body}>
        예를 들어 3월부터 이듬해 2월까지 1년 계약을 했는데, 7~8월 여름방학이 무급이었다면 그 기간은 피보험기간에서 빠져요.
        실제 가입일수가 180일에 못 미칠 수 있죠.{" "}
        <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서
        피보험 이력을 조회하면 정확한 일수를 알 수 있으니까, 계약 종료 전에 미리 확인해두세요.
      </p>
      <p style={body}>
        계약 만료는 <strong>비자발적 퇴사</strong>로 인정돼요.
        학교에서 재계약을 안 해주면 본인 의사와 무관하게 나가야 하니까요.
        다만 학교에서 재계약을 제의했는데 본인이 거절한 경우라면 자발적 퇴사로 볼 수 있죠.
        이 부분은 이직확인서에 퇴직 사유가 어떻게 기재되는지가 관건이에요.
      </p>

      <SectionBadge>내 월급과 가입기간으로 계산해보세요</SectionBadge>
      <Calculator
        title="기간제 교사 실업급여 예상 수령액"
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 2026년 기준 1일 상한액 68,100원, 하한액 66,048원 적용. 실제 금액은 고용센터 심사에 따라 달라질 수 있어요."
      />

      <BorderBox>
        <p style={{ margin: "0 0 6px", lineHeight: 1.9 }}>
          <strong>피보험기간</strong> 180일 이상인지 고용24에서 조회
        </p>
        <p style={{ margin: "0 0 6px", lineHeight: 1.9 }}>
          <strong>계약 만료</strong> 비자발적 퇴사로 인정 → 수급 대상
        </p>
        <p style={{ margin: "0 0 6px", lineHeight: 1.9 }}>
          <strong>재계약 거부</strong> 본인이 거절하면 자발적 퇴사 → 수급 어려움
        </p>
        <p style={{ margin: 0, lineHeight: 1.9 }}>
          <strong>방학 무급</strong> 무급 기간은 피보험기간에서 제외
        </p>
      </BorderBox>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3: 사립학교 교사·강사 */}
      <H2>사립학교 교사와 강사의 수급 조건</H2>
      <p style={body}>
        사립학교 교사는 고용보험 가입 대상이지만, 실업급여를 받으려면 <strong>퇴직 사유</strong>가 갈림길이에요.
        학교가 계약을 해지하거나 경영상 이유로 권고사직한 경우는 비자발적 퇴사로 인정되죠.
        이런 경우는 피보험기간 180일만 충족하면 바로 신청하면 돼요.
      </p>
      <p style={body}>
        본인이 먼저 사직서를 쓴 경우는 원칙적으로 대상이 아니에요.
        다만 임금체불, 직장 내 괴롭힘, 근로조건 일방 변경 같은 정당한 사유가 있으면 자발적 퇴사여도 인정받을 수 있죠.
        이때 증빙이 핵심이에요: 문자 기록, 녹음 파일, 급여명세서 등을 퇴직 전에 미리 확보해두세요.
      </p>
      <p style={body}>
        <strong>시간강사나 학원 강사</strong>도 같은 기준이에요.
        주 15시간 이상 근무하거나 3개월 이상 계속 근무했다면{" "}
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>상 가입 대상이죠.
        급여명세서에서 고용보험료가 빠져나가고 있는지만 확인하면 돼요.
        공제가 안 되고 있다면 사업주가 신고를 안 한 거니까 고용센터(1350)에 문의하세요.
      </p>

      <Divider />

      {/* 섹션 4: 신청 방법 */}
      <H2>유형별 수급 조건 확인 후 신청 절차</H2>
      <p style={body}>
        신청 절차 자체는 일반 근로자와 동일해요.
        퇴직 후{" "}
        <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서
        수급자격 신청자 온라인 교육을 먼저 수강하세요.
        교육을 마치면 관할 고용센터에 방문해서 수급자격 인정 신청서를 제출하면 돼요.
        이후 4주마다 실업인정을 받으면서 구직급여가 지급되죠. <a href="/w/실업급여-구직활동-횟수" style={{ color: "#1D9E75", textDecoration: "underline" }}>구직활동 횟수</a> 기준도 미리 파악해두면 좋아요.
      </p>
      <p style={body}>
        이직확인서는 학교 행정실에서{" "}
        <a href="https://www.moel.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부</a>에 전자적으로 제출해요.
        기간제 교사라면 퇴직 사유가 &quot;계약 만료&quot;로 적히죠.
        권고사직이면 &quot;경영상 이유에 의한 퇴직&quot;으로 기재되고요.
        이직확인서 내용이 실제와 다르면 고용센터에 정정을 요청할 수 있으니까 꼭 살펴보세요.
      </p>
      <p style={body}>
        기간제 교사는 대부분 2월 말에 계약이 끝나죠.
        그러면 3월부터 바로 신청할 수 있죠.
        여름방학 전에 계약이 종료되는 경우도 마찬가지로 계약 종료 시점부터 신청 가능하고요.
        퇴직 후 <strong>12개월 이내</strong>에 신청해야 하니까, 방학 동안 미루다가 기한을 놓치지 않도록 주의하세요.
      </p>

      <SectionBadge>신청 전 준비사항</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* 섹션 5: 공무원 교사의 대안 */}
      <H2>공무원 교사는 연금으로 갈아타세요</H2>
      <p style={body}>
        공립학교 정교사는 실업급여 대신 <strong>공무원연금</strong>이 적용돼요.
        고용보험이 아니라 공무원연금에 가입돼 있죠.
        재직 기간이 10년 이상이면 퇴직 후 연금을 수급할 수 있고, 10년 미만이면 퇴직일시금으로 받게 돼요.
      </p>
      <p style={body}>
        공무원연금 퇴직급여는 실업급여보다 금액이 큰 경우가 많아요.
        재직 기간에 비례해서 금액이 올라가기 때문이죠.
        20년 이상 재직하면 매월 연금 형태로 수급할 수 있어서, 실업급여의 한시적 지급과는 성격이 완전히 달라요.
      </p>
      <p style={body}>
        다만 퇴직 후 재취업하면 소득 수준에 따라 연금이 <strong>감액</strong>될 수 있죠.
        연금 수급 중에 일정 금액 이상의 소득이 발생하면 연금 일부가 정지되죠.
        이 부분은{" "}
        <a href="https://www.geps.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>공무원연금공단</a>에서
        본인 상황에 맞게 상세 안내를 받을 수 있고요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        교사 실업급여에 대해 실제로 많이 물어보시는 내용만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법을 바탕으로 작성됐어요. 개별 사안의 인정 여부는 고용센터 심사에 따라 다르니, 사전 상담(1350)을 받아보세요." />
    </ArticleLayout>
  );
}
