"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body, Calculator,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR } from "@/data/실업급여-guide";

// ─── 계산 로직 ──────────────────────────────────────────

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

function getDaily(totalPay: number, workDays: number): number {
  const raw = Math.round((totalPay * 10000 / workDays) * 0.6);
  return Math.max(66048, Math.min(68100, raw));
}

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "고용보험에 가입된 상태에서 일했어요 (고용24에서 확인 가능)" },
  { id: "c2", label: "최근 18개월 동안 실제 일한 날(피보험단위기간)이 180일 이상이에요" },
  { id: "c3", label: "마지막 근무 후 비자발적으로 일이 끊겼어요 (공사 종료, 계약 만료 등)" },
  { id: "c4", label: "재취업 의사가 있고 적극적 구직활동이 가능해요" },
];

const CALC_SLIDERS = [
  { id: "totalPay", label: "최근 1개월 총 임금", min: 100, max: 500, step: 10, defaultValue: 250, format: (v: number) => `${v}만원` },
  { id: "workDays", label: "그 달 근무일수", min: 10, max: 25, step: 1, defaultValue: 20, format: (v: number) => `${v}일` },
  { id: "age", label: "나이", min: 20, max: 68, step: 1, defaultValue: 40, format: (v: number) => `만 ${v}세` },
  { id: "years", label: "고용보험 가입기간", min: 0, max: 20, step: 1, defaultValue: 3, format: (v: number) => v === 0 ? "1년 미만" : `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "1일 평균임금",
    getValue: (v: Record<string, number>) => Math.round(v.totalPay * 10000 / v.workDays),
    format: (v: number) => `${v.toLocaleString()}원`,
  },
  {
    label: "1일 수급액",
    getValue: (v: Record<string, number>) => getDaily(v.totalPay, v.workDays),
    format: (v: number) => `${v.toLocaleString()}원`,
  },
  {
    label: "수급기간",
    getValue: (v: Record<string, number>) => getDays(v.age, v.years),
    format: (v: number) => `${v}일 (약 ${Math.round(v / 30)}개월)`,
  },
  {
    label: "예상 총 수령액",
    getValue: (v: Record<string, number>) => getDaily(v.totalPay, v.workDays) * getDays(v.age, v.years),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
];

const CHECKLIST = [
  "고용24(ei.go.kr) 로그인 후 피보험자격 이력내역서 조회: 가입 여부 확인",
  "피보험단위기간이 실제 근무일 기준 180일 이상인지 확인",
  "수급자격 신청자 온라인 교육 이수 (고용24)",
  "거주지 관할 고용센터 방문 후 수급자격 인정 신청",
  "실업인정 받으면 대기기간 없이 다음 날부터 지급 시작",
];

const FAQS = [
  {
    q: "일용직이 고용보험에 가입이 안 되어 있으면 어떻게 하죠?",
    a: "고용주가 신고를 안 한 거예요. 고용센터(1350)에 신고하면 소급 가입이 가능하죠. 급여이체 내역이나 출근부 등 일한 증거를 함께 제출하면 돼요. 건설현장이라면 건설근로자공제회 퇴직공제금도 별도로 확인해보세요.",
  },
  {
    q: "실업급여 받으면서 다른 현장에서 일해도 되나요?",
    a: "돼요. 다만 일한 날은 반드시 실업인정 때 신고해야 하죠. 일한 날에는 구직급여가 안 나오고, 그만큼 수급기간이 뒤로 밀려요. 미신고 시 부정수급으로 최대 5배 추징이 가능하니까 빠짐없이 신고하세요.",
  },
  {
    q: "여러 현장에서 일한 기간을 합산할 수 있나요?",
    a: "합산돼요. 현장이 달라도 각각 고용보험 신고가 돼 있으면 피보험단위기간을 다 더할 수 있죠. A현장 80일 + B현장 60일 + C현장 50일 = 190일, 이런 식이에요. 고용24에서 전체 이력을 조회해보세요.",
  },
  {
    q: "일용직은 이직확인서가 필요 없나요?",
    a: "맞아요. 일반 직장인과 달리 일용직은 이직확인서 없이 고용보험 피보험 이력만으로 수급자격을 확인해요. 별도로 회사에 서류를 요청할 필요가 없죠.",
  },
  {
    q: "일용직 실업급여는 대기기간이 정말 없나요?",
    a: "네, 없어요. 일반 직장인은 수급자격 인정 후 7일 대기기간이 있지만, 일용직은 실업인정을 받으면 바로 다음 날부터 지급이 시작돼요. 고용보험법에서 일용직의 불안정한 고용 상태를 고려해서 특례를 두고 있죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법 제43조: 일용근로자 수급자격 특례", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용보험법 제46조: 구직급여일액 산정 기준", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용보험법 시행령: 일용근로자 피보험단위기간 산정", url: "https://www.law.go.kr/법령/고용보험법시행령" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24: 일용근로자 실업급여 안내", url: "https://www.ei.go.kr" },
      { label: "고용노동부: 일용직 고용보험 가입 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "단시간-근로자-실업급여",
    title: "단시간 근로자 실업급여 수급 조건",
    description: "주 15시간 미만 단시간 근로자의 실업급여 수급 조건을 정리했어요.",
  },
  {
    slug: "실업급여-피보험단위기간",
    title: "피보험단위기간 계산법",
    description: "실업급여 수급의 핵심 조건인 피보험단위기간 180일을 계산하는 법이에요.",
  },
  {
    slug: "실업급여-고용보험-미가입",
    title: "고용보험 미가입이면 실업급여는?",
    description: "사업주가 고용보험을 안 넣어줬을 때 소급 가입으로 실업급여 받는 방법이에요.",
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
          currentSlug="일용직-실업급여"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 일용근로자</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        일용직 실업급여, 며칠 일해야 받을까?<br />
        자격과 금액
      </h1>

      <p style={{ ...body, fontSize: 16, lineHeight: 2.1 }}>
        &quot;일용직은 실업급여 못 받는 거 아니에요?&quot;
      </p>
      <p style={body}>
        아니에요. 하루 단위로 일하는 일용직도 고용보험에 가입돼 있으면 실업급여를 받을 수 있죠.{" "}
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 제43조</a>가
        일용근로자 수급자격 특례를 별도로 정해뒀죠.
        <a href="/w/실업급여-피보험단위기간" style={{ color: "#1D9E75", textDecoration: "underline" }}>피보험단위기간</a> <strong>180일</strong>을 채우면 대상이 되고, 일반 직장인과 달리 <strong>대기기간 없이</strong> 바로 지급이 시작돼요.
      </p>
      <p style={body}>
        2026년 기준 1일 상한액은 <strong>68,100원</strong>, 하한액은 <strong>66,048원</strong>이에요.
        몇 달치가 쌓이면 수백만원이 되는 돈이니까, 모르고 넘어가면 그만큼 손해죠.
        자격 조건부터 금액 계산, 신청 방법까지 한 번에 정리해뒀어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1: 고용보험 가입 확인 + 자격 체크 */}
      <H2>자격을 갖추려면 며칠 일해야 하나요?</H2>
      <SectionBadge>수급 자격 체크</SectionBadge>

      <p style={body}>
        실업급여를 받으려면 먼저 <strong>고용보험에 가입</strong>돼 있어야 해요.
        건설현장이든 공장이든 물류센터든, 하루만 일해도 고용주가 일용근로자 취득 신고를 하면 자동으로 가입되죠.
        내가 가입돼 있는지 모르겠다면{" "}
        <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 피보험자격 이력내역서를 조회해보세요.
        현장별 취득일과 상실일이 전부 나와요.
      </p>
      <p style={body}>
        가입이 확인됐으면 다음 관문은 <strong>피보험단위기간 180일</strong>이에요.
        여기서 주의할 점이 하나 있죠. 일용직은 달력 기준이 아니라 &quot;실제로 일한 날&quot;만 세요.
        한 달에 15일 일했으면 15일로 계산하는 거예요.
        그래서 일반 직장인보다 180일을 채우는 데 시간이 더 걸리죠.
      </p>
      <p style={body}>
        여러 현장에서 일한 기간을 합산할 수 있다는 게 핵심이에요.
        A현장 80일, B현장 60일, C현장 50일: 이렇게 다 합쳐서 190일이 되면 조건을 충족하죠.
        소규모 현장에서 고용주가 신고를 안 했다면? 고용센터(1350)에 신고하면 소급 가입이 가능해요.
      </p>

      <GreenBox>
        <p style={{ margin: "0 0 4px" }}>고용24(ei.go.kr) 로그인 → 피보험자격 이력내역서 조회</p>
        <p style={{ margin: "0 0 4px" }}>현장별로 취득일·상실일 확인하고 실제 근무일수 합산</p>
        <p style={{ margin: 0 }}>누락된 현장은 고용센터(1350) 신고 → 소급 가입 처리</p>
      </GreenBox>

      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="일용직 실업급여 수급 조건을 모두 충족해요. 고용센터에 바로 신청하세요."
        partialMatchText="일부 조건이 미충족이에요. 해당 항목을 확인하고 고용센터(1350)에 상담받아 보세요."
      />

      <Divider />

      {/* 섹션 2: 수급 조건과 금액 계산 */}
      <H2>금액은 어떻게 계산되나요?</H2>

      <p style={body}>
        일용직 수급액은 <strong>최근 1개월 총 임금 ÷ 실제 근무일수 = 1일 평균임금</strong>에서 시작해요.
        일반 직장인이 퇴직 전 3개월 평균임금을 쓰는 것과 다르죠.
        이 1일 평균임금에 60%를 곱한 게 하루 수급액이에요.
      </p>
      <p style={body}>
        예를 들어볼게요.
        한 달 총 임금 300만원에 20일 일했다면 1일 평균임금은 15만원이에요.
        15만원의 60%는 9만원이지만, 2026년 기준 상한액이 68,100원이라 하루 68,100원을 받게 되죠.
        반대로 일당이 낮더라도 하한액 66,048원(월 약 198만원)이 보장돼요.
      </p>
      <p style={body}>
        수급기간은 나이와 고용보험 가입기간에 따라 120일에서 최대 270일이에요.
        일용직의 가장 큰 장점은 <strong>대기기간이 0일</strong>이라는 거죠.
        일반 직장인은 수급자격 인정 후 7일을 기다려야 하는데, 일용직은 실업인정 다음 날부터 바로 지급이 시작돼요.
      </p>

      <BorderBox>
        <p style={{ margin: "0 0 6px", lineHeight: 1.9 }}>
          <strong>피보험단위기간</strong> 일반 = 재직일수 포함 / 일용직 = 실제 근무일만
        </p>
        <p style={{ margin: "0 0 6px", lineHeight: 1.9 }}>
          <strong>평균임금 기준</strong> 일반 = 퇴직 전 3개월 / 일용직 = 최종 1개월
        </p>
        <p style={{ margin: "0 0 6px", lineHeight: 1.9 }}>
          <strong>대기기간</strong> 일반 = 7일 / 일용직 = 없음 (바로 지급)
        </p>
        <p style={{ margin: 0, lineHeight: 1.9 }}>
          <strong>이직확인서</strong> 일반 = 필수 / 일용직 = 불필요
        </p>
      </BorderBox>

      <Calculator
        title="일용직 실업급여 예상 수급액"
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 2026년 기준 상한 68,100원, 하한 66,048원 적용. 최근 1개월 총 임금과 실제 근무일수를 입력하세요."
      />

      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3: 신청 절차 */}
      <H2>자격 확인 후 신청 절차</H2>
      <SectionBadge>신청 절차 체크리스트</SectionBadge>

      <p style={body}>
        일용직 실업급여 신청은 일반 직장인보다 간단한 편이에요.
        가장 큰 차이는 <strong>이직확인서가 필요 없다</strong>는 거죠.
        일반 직장인은 회사에 이직확인서를 요청해야 하지만, 일용직은 고용보험 피보험 이력만으로 수급자격을 판단해요.
        회사에 서류를 달라고 부탁할 필요가 없으니 그만큼 빨리 시작할 수 있죠.
      </p>
      <p style={body}>
        절차는 이래요.{" "}
        <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 피보험단위기간부터 확인하고,
        수급자격 신청자 온라인 교육을 이수하세요.
        그 다음 관할 고용센터에 방문해서 수급자격 인정을 신청하면 돼요.
        실업인정을 받으면 대기기간 없이 바로 다음 날부터 지급이 시작되죠.
      </p>
      <p style={body}>
        이후에는 1~4주 단위로 고용센터에 출석해서 구직활동을 보고하면 계속 받을 수 있고요.
        한 가지 꼭 기억할 게 있죠.
        퇴직일(마지막 근무일)로부터 <strong>12개월 이내</strong>에 신청해야 해요.
        이 기한을 넘기면 아무리 조건을 충족해도 수급 자체가 안 되니까 미루지 마세요.
      </p>

      <Checklist items={CHECKLIST} />

      <Divider />

      {/* 섹션 4: 일하면서 수급 + 부정수급 */}
      <H2>금액을 받으면서 일할 때 주의할 점</H2>

      <p style={body}>
        일용직은 일이 불규칙하니까, 실업급여를 받는 도중에 간간이 현장 일감이 들어오는 경우가 많죠.
        이건 허용돼요. 다만 반드시 지켜야 할 규칙이 하나 있죠.
        <strong>일한 날은 실업인정 때 빠짐없이 신고</strong>해야 해요.
        일한 날에는 구직급여가 나오지 않고, 그만큼 수급기간이 뒤로 밀려요.
      </p>
      <p style={body}>
        &quot;며칠 일한 건데 안 말해도 되겠지?&quot; 이 생각이 위험해요.
        고용보험 전산에 일용근로 취득 신고가 올라가면 교차 대조로 바로 잡히죠.
        <a href="/w/실업급여-부정수급" style={{ color: "#1D9E75", textDecoration: "underline" }}>부정수급</a>으로 적발되면 받은 금액의 최대 5배를 추징당하죠.
        한 번 적발되면 향후 실업급여 신청에서도 불이익이 따르니까, 하루라도 일했으면 꼭 신고하세요.
      </p>
      <p style={body}>
        수급 중에 <strong>월 60시간(주 15시간) 이상</strong> 일하면 아예 &quot;취업&quot;으로 간주돼요. <a href="/w/실업급여-받으면서-알바" style={{ color: "#1D9E75", textDecoration: "underline" }}>실업급여 받으면서 알바</a>하는 기준이 따로 있으니 꼭 읽어보세요.
        이 기준을 넘기면 수급 자체가 중단될 수 있죠.
        단기 일감을 여러 개 잡다 보면 본인도 모르게 60시간을 넘기는 경우가 생기니까, 근무시간을 미리 계산해두는 게 안전해요.
      </p>

      <GreenBox>
        <p style={{ margin: "0 0 4px" }}>일한 날은 실업인정 때 빠짐없이 신고할 것</p>
        <p style={{ margin: "0 0 4px" }}>미신고 적발 시 받은 금액의 최대 5배 추징</p>
        <p style={{ margin: 0 }}>월 60시간(주 15시간) 이상 근무하면 수급 중단 가능</p>
      </GreenBox>

      <Divider />

      {/* 섹션 5: 고용보험 미가입 대응 */}
      <H2>고용보험 미가입 시 자격을 확보하세요</H2>

      <p style={body}>
        &quot;고용24에서 조회했는데 이력이 하나도 안 나와요.&quot;
        이 경우는 사업주가 고용보험 신고를 안 한 거예요.
        소규모 건설현장이나 개인 사업장에서 흔히 벌어지는 일이죠.
        실업급여를 포기해야 하는 건 아니에요.
      </p>
      <p style={body}>
        고용센터(1350)에 사업주 미신고를 신고하면 <strong>소급 가입</strong>이 돼요.
        급여이체 내역, 출근부, 작업일지, 카카오톡 대화 내역 등 일한 증거를 함께 제출하세요.
        고용센터에서 사실관계를 확인하고 가입 처리를 해주죠.
        소급 가입된 기간은 피보험단위기간에 그대로 합산돼요.
      </p>
      <p style={body}>
        &quot;사업주가 보험료를 안 냈으면 나도 못 받는 거 아니에요?&quot;
        걱정할 필요 없어요.{" "}
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>은
        사업주의 보험료 체납과 근로자의 수급자격을 분리해서 규정하고 있죠.
        사업주가 보험료를 한 푼도 안 냈더라도 내 수급자격은 유지돼요.
        건설 일용직이라면{" "}
        <a href="https://www.cwma.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>건설근로자공제회</a> 퇴직공제금도 별도로 챙기세요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        일용직 실업급여에 대해 실제로 많이 궁금해하는 내용만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법을 바탕으로 작성됐어요. 개별 사안의 수급자격 여부는 고용센터 심사에 따라 다르니, 사전 상담(1350)을 받아보세요." />
    </ArticleLayout>
  );
}
