"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body, Calculator,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR, 실업급여_HIGHLIGHT } from "@/data/실업급여-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직 전 3개월 평균임금을 알고 있어요" },
  { id: "c2", label: "고용보험 가입기간이 180일 이상이에요" },
  { id: "c3", label: "비자발적 퇴직이에요 (권고사직, 계약만료 등)" },
  { id: "c4", label: "수급기간(퇴직 후 12개월)이 남아 있어요" },
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

function getDaily(salary: number): number {
  const raw = Math.round((salary * 10000 * 0.6) / 30);
  return Math.max(66048, Math.min(68100, raw));
}

const CALC_SLIDERS = [
  { id: "salary", label: "퇴직 전 월 평균임금", min: 150, max: 700, step: 10, defaultValue: 250, format: (v: number) => `${v}만원` },
  { id: "years", label: "고용보험 가입기간", min: 1, max: 20, step: 1, defaultValue: 2, format: (v: number) => `${v}년` },
  { id: "age", label: "퇴직 시 나이", min: 25, max: 68, step: 1, defaultValue: 35, format: (v: number) => `${v}세` },
];

const CALC_RESULTS = [
  {
    label: "1일 수급액 (하한 66,048원)",
    getValue: (v: Record<string, number>) => getDaily(v.salary),
    format: (v: number) => `${v.toLocaleString()}원`,
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
    highlight: true,
  },
];

const CHECKLIST = [
  "고용24(ei.go.kr)에서 피보험자격 이력 조회로 가입기간 확인",
  "퇴직 전 3개월 급여명세서에서 평균임금 산출",
  "이직확인서 퇴직 사유가 비자발적으로 기재됐는지 확인",
  "퇴직 후 12개월 이내에 고용센터 방문 (기한 엄수)",
  "수급자격 신청자 온라인 교육 이수 (고용24)",
];

const FAQS = [
  {
    q: "2026년 실업급여 하한액 66,048원은 어떻게 계산되나요?",
    a: "최저임금 시급 10,030원을 기준으로 1일 8시간 x 10,030원 = 80,240원의 80%가 하한액이에요. 고용보험법에서 최저임금의 80%를 하한으로 정하고 있죠.",
  },
  {
    q: "월급이 200만원도 안 됐는데 실업급여가 198만원이나 나온다고요?",
    a: "맞아요. 하한액 제도 덕분이에요. 계산상 적게 나와도 1일 66,048원이 보장되니까 월 환산 약 198만원은 받게 돼요. 최저임금 근로자를 보호하려는 취지의 제도죠.",
  },
  {
    q: "고용보험 180일은 달력 기준인가요, 근무일 기준인가요?",
    a: "유급일 기준이에요. 주말도 유급이면 포함되죠. 정확히는 '피보험단위기간'이라고 해서, 보수 지급의 기초가 된 날을 합산해요. 고용24에서 정확한 일수를 조회할 수 있어요.",
  },
  {
    q: "가입기간 1년 미만이면 최소 120일만 받는 건가요?",
    a: "50세 미만이라면 120일이에요. 50세 이상이거나 장애인이면 같은 가입기간이라도 120일이 아니라 더 길게 나올 수 있죠. 나이에 따라 수급일수 기준이 달라져요.",
  },
  {
    q: "하한액보다 높은 금액을 받으려면 월급이 얼마여야 하나요?",
    a: "월 약 330만원 이상이면 평균임금 60%가 하한액을 넘어요. 330만원 x 60% / 30일 = 약 66,000원이니까 이 부근이 분기점이죠. 그 이하면 하한액이 적용돼요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법 제46조: 구직급여 하한액 산정 기준 (최저임금의 80%)", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용보험법 제50조: 수급기간 (가입기간·연령별 소정급여일수)", url: "https://www.law.go.kr/법령/고용보험법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24: 실업급여 모의계산 및 피보험자격 조회", url: "https://www.ei.go.kr" },
      { label: "고용노동부: 2026년 최저임금 고시 (시급 10,030원)", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "실업급여-최대금액",
    title: "실업급여 최대금액 상한액 기준",
    description: "2026년 상한액 68,100원 기준으로 받을 수 있는 최대 총액을 정리했어요.",
  },
  {
    slug: "실업급여-한달-얼마-받나요",
    title: "실업급여 한달 얼마 받나요",
    description: "월급별로 매달 통장에 찍히는 실제 금액을 비교해볼 수 있어요.",
  },
  {
    slug: "실업급여-평균임금-계산",
    title: "실업급여 평균임금 계산 방법",
    description: "내 평균임금이 정확히 얼마인지, 어떤 항목이 포함되는지 정리했어요.",
  },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={
        <Sidebar
          heading="실업급여 가이드"
          items={실업급여_SIDEBAR} highlightSlugs={실업급여_HIGHLIGHT}
          currentSlug="실업급여-최소금액"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 하한액</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        실업급여 최소 금액, 하한액이 유리할 때?<br />
        총액 계산법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;월급이 적었으니까 실업급여도 쥐꼬리 아닐까?&rdquo;<br />
        많이들 이렇게 생각하죠. 그런데 아니에요.<br /><br />
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 제46조</a>가
        하한선을 딱 정해놨어요. 2026년 기준 <strong>1일 최소 66,048원</strong>이 보장되죠.
        최저임금 시급 10,030원의 80%를 곱한 금액이에요.
        가입기간 1년 미만 · 50세 미만이면 120일을 받으니까,
        최소 총액은 <strong>7,925,760원</strong>(66,048원 x 120일)이고요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1: 하한액 원리 + EligibilityChecker */}
      <H2>하한액 66,048원은 어떤 계산법으로 정해질까?</H2>
      <p style={body}>
        실업급여 1일 금액은 원래 퇴직 전 3개월 평균임금의 60%예요. 이 금액이 너무 낮으면 구직 기간에 밥값도 안 나오잖아요. 그래서 <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>이 안전장치를 걸어뒀어요: <strong>최저임금의 80%</strong>를 하한선으로 정한 거예요.
      </p>
      <p style={body}>
        2026년 최저임금 시급이 10,030원이에요. 여기에 8시간을 곱하면 일당 80,240원이 나오고, 80%를 적용하면 <strong>66,048원</strong>이 되죠. 아무리 월급이 적었던 사람이라도 하루에 이 금액 이하로는 내려가지 않아요.
      </p>
      <p style={body}>
        상한선도 같이 알아둬야 해요. 1일 최대 금액은 <strong>68,100원</strong>이에요. 상한과 하한 사이 폭이 고작 2,052원이라서, 결국 대부분의 수급자가 66,048~68,100원 사이에서 정해지는 구조죠. 월 환산으로 보면 약 198만~204만원 범위이고요.
      </p>

      <GreenBox>
        최저임금 시급 10,030원 x 8시간 = 일당 80,240원<br />
        80,240원 x 80% = <strong>하한액 66,048원</strong> (소수점 절사)<br />
        월 환산: 66,048원 x 30일 = 약 <strong>198만원</strong>
      </GreenBox>

      <SectionBadge>내 상황에 해당되는지 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="4가지 다 충족이네요. 최소 66,048원 x 수급일수만큼 받을 수 있어요. 아래 계산기로 정확한 금액을 확인해보세요."
        partialMatchText="일부 조건이 미충족이에요. 특히 180일 가입 여부와 퇴직 사유를 고용센터(1350)에서 확인해보세요."
      />

      <Divider />

      {/* 섹션 2: 계산기 + 수급기간 테이블 */}
      <H2>내 월급으로 총액을 계산하면 얼마가 나올까?</H2>
      <p style={body}>
        실업급여 총액은 세 가지가 결정해요: 퇴직 전 <a href="/w/실업급여-평균임금-계산" style={{ color: "#1D9E75", textDecoration: "underline" }}>월 평균임금</a>, 고용보험 가입기간, 퇴직 시 나이. 평균임금으로 1일 수급액이 나오고, 가입기간과 나이가 수급일수를 정하죠. 1일 수급액 x 수급일수 = 총 수령액이에요.
      </p>
      <p style={body}>
        여기서 포인트가 하나 있죠. 월급이 약 330만원 이하면 거의 전부 하한액이 적용돼요. 330만원 x 60% / 30일 = 약 66,000원이니까 하한액(66,048원)에 걸리죠. 저임금 근로자일수록 &ldquo;평균임금의 60%&rdquo;보다 하한액이 더 유리하게 작동하는 구조예요.
      </p>
      <p style={body}>
        아래 계산기에서 본인 상황을 넣어보세요. 월급을 150만원으로 넣든 250만원으로 넣든 1일 수급액은 66,048원으로 동일하게 나올 거예요. 차이를 만드는 건 가입기간과 나이: 즉 수급일수예요.
      </p>

      <Calculator
        title="실업급여 최소금액 계산기"
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 2026년 기준 1일 하한액 66,048원, 상한액 68,100원 적용. 실제 금액은 고용센터 심사 후 확정돼요."
      />

      <BorderBox>
        <strong>[50세 미만]</strong><br />
        1년 미만 → 120일 / 1~3년 → 150일 / 3~5년 → 180일 / 5~10년 → 210일 / 10년 이상 → 240일<br /><br />
        <strong>[50세 이상 또는 장애인]</strong><br />
        1년 미만 → 120일 / 1~3년 → 180일 / 3~5년 → 210일 / 5~10년 → 240일 / 10년 이상 → 270일
      </BorderBox>

      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3: 하한액 기준 총액 비교 + Checklist */}
      <H2>수급기간별 총액 계산법과 차이</H2>
      <p style={body}>
        하한액이 같아도 수급기간에 따라 총액이 2배 넘게 벌어져요. 가장 짧은 120일(50세 미만, 가입 1년 미만)이면 약 793만원인데, 가장 긴 270일(50세 이상, 가입 10년 이상)이면 약 1,783만원이에요. 같은 66,048원인데 <strong>약 990만원</strong> 차이가 나는 거죠.
      </p>
      <p style={body}>
        숫자로 직접 보면 체감이 돼요. 120일 → 약 793만원, 150일 → 약 991만원, 180일 → 약 1,189만원, 240일 → 약 1,585만원이에요. 가입기간 구간이 하나만 올라가도 수백만원이 달라지죠. 이 차이를 모르고 퇴직하면 손해를 보는 거예요.
      </p>
      <p style={body}>
        퇴직을 앞두고 있다면 내 <a href="/w/실업급여-피보험기간" style={{ color: "#1D9E75", textDecoration: "underline" }}>피보험기간</a>이 다음 구간까지 얼마나 남았는지 꼭 따져보세요. 가입기간이 2년 11개월이라면 한 달만 더 버티면 3년 구간(180일)으로 올라가요. 150일에서 180일로 바뀌면 <strong>약 198만원</strong>을 더 받는 셈이니까요.
      </p>

      <BorderBox>
        120일 → <strong>7,925,760원</strong> (약 793만원)<br />
        150일 → <strong>9,907,200원</strong> (약 991만원)<br />
        180일 → <strong>11,888,640원</strong> (약 1,189만원)<br />
        210일 → <strong>13,870,080원</strong> (약 1,387만원)<br />
        240일 → <strong>15,851,520원</strong> (약 1,585만원)<br />
        270일 → <strong>17,832,960원</strong> (약 1,783만원)
      </BorderBox>

      <SectionBadge>신청 전 반드시 확인하세요</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* 섹션 4: 하한액이 유리한 사람 */}
      <H2>하한액 계산법이 특히 유리한 사람</H2>
      <p style={body}>
        월급 330만원 이하였던 근로자라면 거의 전원이 하한액 적용 대상이에요. 평균임금의 60%를 계산해봤자 하한액보다 적게 나오니까요. &ldquo;내 월급 대비&rdquo; 실업급여 비율이 80% 이상으로 올라가는 셈이에요. 소득대체율이 높다는 건, 퇴직 전 생활 수준을 상당 부분 유지할 수 있다는 뜻이죠.
      </p>
      <p style={body}>
        <a href="/w/단시간-근로자-실업급여" style={{ color: "#1D9E75", textDecoration: "underline" }}>단시간 근로자</a>(주 15~40시간)에게 특히 유리한 구조예요. 주 20시간 파트타임으로 월 100만원을 받던 분이 실업급여를 신청하면 월 198만원이 나와요. 일할 때보다 실업급여가 2배 가까운 거죠. 고용보험 가입기간 180일만 충족하면 되니까 파트타임이라도 절대 포기하지 마세요.
      </p>
      <p style={body}>
        월급 340만원 이상이었던 분에게는 하한액이 의미가 달라요. 이 구간은 오히려 <strong>상한액 68,100원</strong>에 걸리죠. 월급이 500만원이든 700만원이든 1일 68,100원으로 동일해요. 연봉이 높을수록 체감 소득대체율이 떨어지는 구조예요.
      </p>

      <Divider />

      {/* 섹션 5: 실전 행동 */}
      <H2>총액이 적더라도 반드시 신청하세요</H2>
      <p style={body}>
        &ldquo;793만원밖에 안 되는데 굳이?&rdquo; 이런 생각이 들 수 있죠. 그런데 793만원이면 4개월치 생활비예요. 재취업 준비 기간에 이 돈이 없으면 선택지가 급격히 좁아지죠. 급한 마음에 나한테 안 맞는 직장에 뛰어드는 분들을 정말 많이 봐요.
      </p>
      <p style={body}>
        기한이 중요해요. 퇴직 후 <strong>12개월 이내</strong>에 신청하지 않으면 수급 자격이 아예 사라져요. &ldquo;다음 달에 해야지&rdquo; 하다가 1년이 지나면 한 푼도 못 받죠. 퇴직하면 바로 <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 온라인 교육부터 이수하는 게 첫걸음이에요.
      </p>
      <p style={body}>
        직장을 여러 곳 다녔다면 이전 직장 가입기간이 합산되는지 꼭 따져보세요. A회사 5개월 + B회사 7개월이면 합산 12개월로, 120일이 아니라 <strong>150일</strong> 구간에 해당돼요. 가입기간 합산 하나로 약 200만원을 더 받게 되니까 놓치면 손해가 커요.
      </p>

      <GreenBox>
        1. <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 피보험자격 이력 조회: 가입기간 정확히 확인<br />
        2. 퇴직 전 3개월 급여명세서 확보: 평균임금 계산용<br />
        3. 수급자격 신청자 온라인 교육 이수: 이수 후 고용센터 방문
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        실업급여 최소금액과 하한액에 대해 실제로 자주 나오는 질문이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법과 최저임금 고시를 바탕으로 작성됐어요. 실제 수급액은 퇴직 전 평균임금과 가입기간에 따라 달라지니, 고용24(ei.go.kr) 모의계산으로 정확한 금액을 확인하세요." />
    </ArticleLayout>
  );
}
