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

function getDaily(salary: number): number {
  const raw = Math.round((salary * 10000 * 0.6) / 30);
  return Math.max(66048, Math.min(68100, raw));
}

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직 전 3개월 평균임금을 알고 있어요" },
  { id: "c2", label: "퇴직 전 18개월 내 고용보험 가입기간이 180일 이상이에요" },
  { id: "c3", label: "비자발적 퇴직이에요 (권고사직, 계약만료, 정당한 사유 등)" },
  { id: "c4", label: "피보험기간과 나이에 따른 수급기간을 확인했어요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "퇴직 전 월 평균임금", min: 150, max: 700, step: 10, defaultValue: 300, format: (v: number) => `${v}만원` },
  { id: "years", label: "고용보험 가입기간", min: 0, max: 20, step: 1, defaultValue: 5, format: (v: number) => v === 0 ? "1년 미만" : `${v}년` },
  { id: "age", label: "퇴직 시 나이", min: 25, max: 68, step: 1, defaultValue: 38, format: (v: number) => `만 ${v}세` },
];

const CALC_RESULTS = [
  {
    label: "1일 수급액",
    getValue: (v: Record<string, number>) => getDaily(v.salary),
    format: (v: number) => `${v.toLocaleString()}원`,
  },
  {
    label: "월 수령액 (30일 기준)",
    getValue: (v: Record<string, number>) => getDaily(v.salary) * 30,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "수급기간",
    getValue: (v: Record<string, number>) => getDays(v.age, v.years),
    format: (v: number) => `${v}일 (약 ${Math.round(v / 30)}개월)`,
  },
  {
    label: "예상 총 수령액",
    getValue: (v: Record<string, number>) => getDaily(v.salary) * getDays(v.age, v.years),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const CHECKLIST = [
  "퇴직 전 3개월 급여명세서에서 평균임금 확인 (세전 기준)",
  "고용24(ei.go.kr)에서 피보험단위기간 180일 이상 확인",
  "이직확인서에 비자발적 퇴직 사유가 정확히 기재됐는지 확인",
  "수급기간 표에서 내 나이·가입기간에 해당하는 소정급여일수 확인",
  "퇴직일로부터 12개월 이내에 실업급여 신청 (기한 초과 시 수급 불가)",
];

const FAQS = [
  {
    q: "실업급여 한달에 최대 얼마까지 받나요?",
    a: "2026년 기준 1일 상한액이 68,100원이에요. 30일 기준으로 계산하면 월 약 204만원이 최대 금액이죠. 월급이 아무리 높았어도 이 금액을 넘을 수 없어요.",
  },
  {
    q: "월급 300만원이었는데 실업급여 얼마 받나요?",
    a: "300만원의 60%면 일 6만원 정도인데, 하한액(66,048원)보다 낮아요. 그래서 하한액이 적용돼서 월 약 198만원을 받게 되죠.",
  },
  {
    q: "첫 달은 왜 금액이 적나요?",
    a: "실업급여 신청 후 대기기간 7일이 있어서예요. 그 7일 동안은 급여가 나오지 않으니까 첫 달 수령액은 23일분인 약 152만~156만원 정도가 되죠.",
  },
  {
    q: "실업급여를 몇 개월이나 받을 수 있나요?",
    a: "피보험기간과 나이에 따라 달라요. 50세 미만은 최대 240일(약 8개월), 50세 이상은 최대 270일(약 9개월)까지 받을 수 있죠.",
  },
  {
    q: "실업급여에서 세금이 빠지나요?",
    a: "아니에요. 실업급여는 비과세 소득이라 소득세·건강보험료가 공제되지 않아요. 계산된 금액 그대로 통장에 입금되죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법 — 구직급여 지급 기준 (상한액·하한액)", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용보험법 시행령 — 소정급여일수 산정표", url: "https://www.law.go.kr/법령/고용보험법시행령" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24 — 실업급여 모의계산", url: "https://www.ei.go.kr" },
      { label: "고용노동부 — 고용보험 제도 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "실업급여-최대금액",
    title: "실업급여 최대금액 2026년 기준",
    description: "1일 상한액과 총 수급 가능 금액을 정리했어요.",
  },
  {
    slug: "실업급여-최소금액",
    title: "실업급여 최소금액과 하한액 기준",
    description: "하한액 기준과 최저임금 연동 방식을 알기 쉽게 풀어놨어요.",
  },
  {
    slug: "실업급여-평균임금-계산",
    title: "실업급여 평균임금 계산 방법",
    description: "퇴직 전 3개월 평균임금 산정 방법과 포함·제외 항목을 정리했어요.",
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
          currentSlug="실업급여-한달-얼마-받나요"
        />
      }
    >
      {/* breadcrumb */}
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 월수급액</p>

      {/* h1 — 2줄 */}
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        실업급여 한 달에 얼마 받을까?<br />
        2026년 월 수령액과 상·하한
      </h1>

      {/* intro — 숫자 + 법령 */}
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;퇴사하면 한달에 얼마나 나올까?&rdquo; 이게 제일 궁금하죠.<br />
        2026년 기준 실업급여는 <strong>한달 최대 약 204만원</strong>이에요.<br /><br />
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>에 따라
        퇴직 전 3개월 평균임금의 60%를 지급하되, 1일 상한액 <strong>68,100원</strong>·하한액 <strong>66,048원</strong>이 걸려요.
        결국 대부분의 수급자가 <strong>월 198만~204만원 사이</strong>를 받게 되는 구조예요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 — 한달 금액 핵심 + GreenBox + SectionBadge + EligibilityChecker */}
      <H2>2026년 월 수령액, 상·하한 핵심은 얼마일까?</H2>
      <p style={body}>
        바로 답부터 드릴게요. <strong>월 198만~204만원</strong>이에요. 실업급여는 1일 단위로 계산하는데, 2026년 기준 <strong>1일 상한액이 68,100원</strong>이에요. 30일을 곱하면 68,100원 x 30일 = <strong>월 2,043,000원</strong>이 나오죠.
      </p>
      <p style={body}>
        하한은 어떨까요? <strong>1일 하한액 66,048원</strong>에 30일을 곱하면 <strong>월 1,981,440원</strong>이에요. 상한과 하한 차이가 하루 2,052원밖에 안 되니까, 월급이 200만원이었든 500만원이었든 실업급여는 비슷한 범위로 떨어지는 거예요.
      </p>
      <p style={body}>
        하한액은 최저임금 시급의 80%에 1일 8시간을 곱해서 매년 새로 정해져요. <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>이 이 최저 보장선을 두고 있죠. 최저임금이 오르면 하한액도 같이 올라가는 구조라서, 저소득 근로자도 일정 수준 이상은 보장받게 되죠.
      </p>

      <GreenBox title="2026년 실업급여 월 금액 요약">
        상한: 1일 68,100원 x 30일 = 월 약 <strong>204만원</strong><br />
        하한: 1일 66,048원 x 30일 = 월 약 <strong>198만원</strong><br />
        대부분의 수급자 → <strong>198만~204만원</strong> 범위
      </GreenBox>

      <SectionBadge>실업급여 수급 조건 체크</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="수급 조건을 충족했을 가능성이 높아요!"
        partialMatchText="일부 조건이 미충족이에요. 해당 항목을 확인해 보세요."
      />

      <Divider />

      {/* 섹션 2 — 월급별 예상 금액 + BorderBox + Calculator */}
      <H2>내 월급 기준 월 수령액은 얼마가 될까?</H2>
      <p style={body}>
        실업급여 기본 공식은 퇴직 전 3개월 <strong>평균임금의 60%</strong>예요. 그런데 여기에 상한액·하한액이라는 천장과 바닥이 걸리면서 실제 금액이 정해지죠. 월급이 낮아도 하한액이 받쳐주고, 월급이 높아도 상한액이 잘라내요.
      </p>
      <p style={body}>
        퇴직 전 월급이 <strong>200만~330만원</strong>이었다면 60%를 적용한 금액이 하한액 아래로 내려가요. 이 경우 하한액이 적용돼서 <strong>월 약 198만원</strong>을 받게 되죠. 월급이 250만원이었든 300만원이었든 실업급여는 동일하게 198만원이에요.
      </p>
      <p style={body}>
        월급이 <strong>340만원 이상</strong>이었다면 반대 상황이에요. 60%를 계산하면 상한액을 넘기거든요. 월급 400만원의 60%는 240만원인데, 상한액(204만원)이 적용돼서 실제로는 <strong>월 약 204만원</strong>만 받게 돼요. 월급 1,000만원이었어도 결과는 같죠.
      </p>

      <BorderBox title="월급별 실업급여 예상 금액">
        월급 200만원 → 하한액 적용 → <strong>월 약 198만원</strong><br />
        월급 300만원 → 하한액 적용 → <strong>월 약 198만원</strong><br />
        월급 340만원 → 상한액 근처 → <strong>월 약 204만원</strong><br />
        월급 500만원 → 상한액 적용 → <strong>월 약 204만원</strong><br />
        월급 1,000만원 → 상한액 적용 → <strong>월 약 204만원</strong>
      </BorderBox>

      <Calculator
        title="내 실업급여 월 수급액 계산기"
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="평균임금의 60%에 상한액(68,100원)·하한액(66,048원)이 적용돼요. 정확한 금액은 고용24(ei.go.kr) 모의계산을 이용하세요."
      />

      {/* 섹션 2 끝 → 버튼 + 관련 글 */}
      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 — 실제 수령액이 다른 이유 + SectionBadge + Checklist */}
      <H2>실제 통장에 찍히는 월 수령액이 달라지는 이유</H2>
      <p style={body}>
        위에서 말한 월 198만~204만원은 <strong>30일 기준 이론치</strong>예요. 실제로 통장에 찍히는 금액은 조금 다를 수 있죠. 이유를 알아야 당황하지 않아요.
      </p>
      <p style={body}>
        첫 번째 이유는 <strong>대기기간 7일</strong>이에요. 실업급여를 처음 신청하면 7일 동안은 급여가 안 나와요. 첫 달 수령액은 23일분만 계산되니까, 상한액 기준으로 68,100원 x 23일 = 약 <strong>156만원</strong> 정도가 첫 달 금액이에요. 두 번째 달부터 정상 금액이 나오죠.
      </p>
      <p style={body}>
        두 번째 이유는 <strong>실업인정</strong> 제도예요. 1~4주마다 고용센터에 출석하거나 온라인으로 실업인정을 받아야 해요. 구직활동을 빠뜨려서 실업인정이 안 되면 그 기간만큼 급여가 줄어들죠. 대신 좋은 소식도 있죠 — 실업급여는 <strong>비과세</strong>예요. 소득세, 건강보험료 같은 공제 항목이 없어서 지급액 그대로 입금돼요.
      </p>

      <SectionBadge>실업급여 신청 전 확인사항</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* 섹션 4 — 총 수급 금액 */}
      <H2>상·하한 적용 후 총 수령액 비교</H2>
      <p style={body}>
        한달 금액도 중요하지만 <strong>총 수급 기간</strong>이 진짜 변수예요. 같은 204만원이라도 4개월 받느냐 8개월 받느냐에 따라 총액이 두 배로 달라지니까요. <a href="https://www.law.go.kr/법령/고용보험법시행령" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 시행령</a>에 따라 피보험기간과 나이에 따라 120일~270일까지 받을 수 있죠.
      </p>
      <p style={body}>
        <strong>50세 미만, 피보험기간 5~10년</strong>이면 210일(약 7개월)이에요. 상한액 기준으로 68,100원 x 210일 = <strong>약 1,430만원</strong>이 나오죠. 피보험기간 10년 이상이면 240일로 늘어나서 68,100원 x 240일 = <strong>약 1,634만원</strong>까지 올라가고요.
      </p>
      <p style={body}>
        <strong>50세 이상이거나 장애인</strong>이면 수급일수가 더 많아요. 피보험기간 10년 이상일 때 최대 270일(약 9개월)까지 받을 수 있죠. 270일 기준 68,100원 x 270일 = <strong>약 1,839만원</strong>이에요. 나이와 가입기간이 수급일수를 바꾸니까, 이 표를 미리 보고 본인 구간을 파악해두는 게 좋아요.
      </p>

      <BorderBox title="총 수급 가능 금액 (상한액 기준)">
        120일(약 4개월) → 약 <strong>817만원</strong><br />
        180일(약 6개월) → 약 <strong>1,226만원</strong><br />
        240일(약 8개월) → 약 <strong>1,634만원</strong><br />
        270일(약 9개월) → 약 <strong>1,839만원</strong>
      </BorderBox>

      <Divider />

      {/* 섹션 5 — 더 많이 받는 방법 */}
      <H2>월 수령액을 최대한 오래 받으려면 이렇게 하세요</H2>
      <p style={body}>
        실업급여 금액 자체는 상한액·하한액에 막혀 있어서 늘리기가 어려워요. 진짜 전략은 <strong>수급 기간을 최대한 확보</strong>하는 거예요. 같은 204만원이라도 4개월 받으면 약 817만원, 8개월 받으면 약 1,634만원이에요. 기간 하나로 두 배 차이가 나죠.
      </p>
      <p style={body}>
        수급 기간을 늘리는 핵심은 <strong>고용보험 가입 기간</strong>을 오래 유지하는 거예요. 이직할 때 고용보험 가입 이력이 끊기지 않도록 신경 써야 하죠. 퇴직 후에는 <strong>12개월 이내</strong>에 반드시 신청해야 해요. 이 기한을 넘기면 수급 자격 자체가 사라지니까요.
      </p>
      <p style={body}>
        실업인정 일정도 놓치지 마세요. <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 온라인 실업인정이 가능해요. 출석 날짜를 빠뜨리면 그 기간만큼 급여가 빠지니까, 달력에 표시해두는 게 좋죠. 재취업이 빨리 되면 <a href="/w/실업급여-취업촉진수당" style={{ color: "#1D9E75", textDecoration: "underline" }}>조기재취업수당</a>이라는 제도가 있죠. 남은 수급일수의 절반을 일시금으로 받을 수 있는 거예요.
      </p>

      <Divider />

      {/* FAQ — 5개 */}
      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        실업급여 월 수급액에 대해 실제로 많이 물어보시는 내용만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      {/* References + Disclaimer */}
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법을 바탕으로 작성됐어요. 개인별 정확한 수급액은 퇴직 전 평균임금에 따라 달라지니, 고용24(ei.go.kr)에서 모의계산을 해보세요." />
    </ArticleLayout>
  );
}
