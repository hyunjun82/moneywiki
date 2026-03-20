"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR, 실업급여_HIGHLIGHT } from "@/data/실업급여-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "이전에 실업급여를 수급한 이력이 있어요" },
  { id: "c2", label: "새 직장에서 고용보험 180일 이상 가입했어요" },
  { id: "c3", label: "비자발적으로 재퇴직했어요 (권고사직, 계약만료 등)" },
  { id: "c4", label: "퇴직일로부터 12개월이 지나지 않았어요" },
];

const CALC_SLIDERS = [
  {
    id: "salary",
    label: "월 평균 급여",
    min: 150,
    max: 600,
    step: 10,
    defaultValue: 280,
    format: (v: number) => `${v}만원`,
  },
  {
    id: "months",
    label: "새 직장 고용보험 가입기간",
    min: 6,
    max: 120,
    step: 6,
    defaultValue: 24,
    format: (v: number) => `${v}개월`,
  },
  {
    id: "age",
    label: "나이",
    min: 20,
    max: 65,
    step: 1,
    defaultValue: 35,
    format: (v: number) => `${v}세`,
  },
];

function getDailyPay(monthlySalary: number): number {
  const daily = Math.round((monthlySalary * 10000) / 30);
  const cap60 = daily * 0.6;
  const upper = 66000;
  const lower = 63104;
  const result = Math.min(Math.max(cap60, lower), upper);
  return result;
}

function getPayDays(months: number, age: number): number {
  const years = months / 12;
  if (age < 50) {
    if (years < 1) return 120;
    if (years < 3) return 150;
    if (years < 5) return 180;
    if (years < 10) return 210;
    return 240;
  }
  if (years < 1) return 120;
  if (years < 3) return 180;
  if (years < 5) return 210;
  if (years < 10) return 240;
  return 270;
}

const CALC_RESULTS = [
  {
    label: "1일 수급액",
    getValue: (v: Record<string, number>) => getDailyPay(v.salary),
    format: (v: number) => `${v.toLocaleString()}원`,
  },
  {
    label: "수급일수",
    getValue: (v: Record<string, number>) => getPayDays(v.months, v.age),
    format: (v: number) => `${v}일`,
  },
  {
    label: "총 예상 수급액",
    getValue: (v: Record<string, number>) =>
      getDailyPay(v.salary) * getPayDays(v.months, v.age),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
];

const FAQS = [
  {
    q: "실업급여를 여러 번 받을 수 있나요?",
    a: "횟수 제한은 없어요. 매번 고용보험 180일 이상 새로 가입하고, 비자발적으로 퇴직하면 몇 번이든 수급 자격이 생기죠.",
  },
  {
    q: "이전 직장 가입기간이 합산되나요?",
    a: "안 돼요. 실업급여를 수급하면 그때까지의 피보험기간은 전부 리셋되죠. 이후 새 직장에서 쌓은 기간만 인정돼요.",
  },
  {
    q: "수급 중 취업해서 남은 금액은 돌려받을 수 있나요?",
    a: "남은 수급일수는 소멸돼요. 다만 수급기간의 절반 이상을 남기고 취업하면 조기재취업수당을 받을 수 있죠. 남은 급여의 절반을 일시금으로 지급해요.",
  },
  {
    q: "재신청하면 첫 번째보다 금액이 줄어드나요?",
    a: "꼭 그렇지는 않아요. 수급액은 새 직장 기준 퇴직 전 3개월 평균임금으로 재계산해요. 새 직장 월급이 이전보다 높았다면 수급액도 올라갈 수 있죠.",
  },
  {
    q: "자주 받으면 불이익이 생기나요?",
    a: "법적 횟수 제한은 없지만 실질적 영향은 있어요. 가입기간 리셋 때문에 수급일수가 짧아질 수 있고, 단기 퇴사가 반복되면 고용센터 심사가 깐깐해지기도 하죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법: 수급자격 및 피보험기간 산정", url: "https://www.law.go.kr/법령/고용보험법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24: 실업급여 인터넷 신청", url: "https://www.ei.go.kr" },
      { label: "고용노동부: 고용보험 상담(1350)", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "재취업후-재퇴직-실업급여",
    title: "재취업 후 재퇴직해도 실업급여 받는 법",
    description: "재취업했다가 다시 퇴직한 경우 실업급여 수급 조건을 정리했어요.",
  },
  {
    slug: "실업급여-조기재취업수당",
    title: "실업급여 조기재취업수당 조건과 금액",
    description: "수급 중 빨리 취업하면 받을 수 있는 조기재취업수당을 알려드릴게요.",
  },
  {
    slug: "실업급여-피보험기간",
    title: "실업급여 피보험기간 180일 계산법",
    description: "고용보험 가입기간 180일이 어떻게 계산되는지 알려드릴게요.",
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
          currentSlug="실업급여-재신청"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 재신청</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        실업급여 재신청, 또 받을 수 있을까?<br />
        재수급 자격과 기간
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &quot;예전에 실업급여를 받은 적이 있는데, 또 받을 수 있나요?&quot;<br /><br />
        횟수 제한은 없어요.{" "}
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>이
        실업급여 수급 횟수를 딱히 제한하지 않거든요.
        핵심은 이전에 받고 난 뒤 새로 쌓은 <strong>고용보험 가입기간 180일</strong>이에요.
        이 조건만 채우고, 비자발적으로 퇴직했으면 몇 번이든 다시 신청할 수 있죠.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1: 핵심 조건 + GreenBox + EligibilityChecker */}
      <H2>재수급 자격은 어떤 조건이 필요한가요?</H2>
      <p style={body}>
        처음 받을 때와 기본 구조가 같아요.
        핵심 조건은 딱 하나, <strong>이전 수급 종료 후 새로 고용보험 180일 이상을 채우는 것</strong>이죠.
        여기서 &quot;180일&quot;은 달력상 날짜가 아니라 실제 근무일(유급일) 기준이에요. <a href="/w/실업급여-피보험단위기간" style={{ color: "#1D9E75", textDecoration: "underline" }}>피보험단위기간 계산법</a>을 참고하면 이해가 빨라요.
        주 5일제 회사라면 대략 8~9개월 정도 다녀야 채울 수 있죠.
      </p>
      <p style={body}>
        퇴직 사유도 다시 따져요. 비자발적 퇴사(권고사직, 계약만료, 정당한 사유 등)여야 하죠.
        본인이 그냥 &quot;다른 데 가고 싶어서&quot; 나온 단순 자발적 퇴사라면 이번에도 대상이 아니에요.
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>에 따르면
        한 번 수급하면 그때까지의 피보험기간은 전부 소진되거든요.
        이전 가입기간이 합산되지 않는다는 뜻이에요.
      </p>
      <p style={body}>
        두 번째 신청 때는 이전 수급 이후 새로 쌓은 기간만 인정돼요.
        그래서 재취업 후 오래 다닐수록 수급일수가 길어지고, 단기 근무 후 나오면 수급일수가 확 줄어들죠.
        마지막으로 퇴직 후 <strong>12개월 이내</strong>에 신청해야 한다는 것도 잊으면 안 돼요.
      </p>

      <GreenBox>
        1. 이전 수급 이후 고용보험 180일 이상 새로 가입<br />
        2. 비자발적 퇴사 (권고사직, 계약만료, 정당한 사유 등)<br />
        3. 적극적 구직 의사 + 근로 능력 보유<br />
        4. 퇴직 후 12개월 이내 신청
      </GreenBox>

      <SectionBadge>내 상황이 해당되는지 체크해 보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="4가지 조건을 모두 충족하네요. 실업급여 재신청이 가능해요. 관할 고용센터에 방문하거나 고용24에서 온라인 신청하세요."
        partialMatchText="일부 조건이 빠져 있어요. 해당 조건을 확인한 뒤 고용센터(1350)에 사전 상담을 받아보세요."
      />

      <Divider />

      {/* 섹션 2: 가입기간 리셋과 수급기간 변화 + 계산기 */}
      <H2>재수급 기간은 이전과 왜 달라지나요?</H2>
      <p style={body}>
        이게 재신청에서 가장 중요한 부분이에요.
        수급기간(받을 수 있는 날수)은 <strong>나이</strong>와 <strong>고용보험 가입기간</strong>으로 정해지죠.
        이전에 10년 가입해서 240일을 받았더라도, 두 번째 신청 때 가입기간이 2년이면 150일(50세 미만 기준)밖에 안 돼요.
        가입기간 리셋은 피할 수 없는 구조예요.
      </p>
      <p style={body}>
        구체적으로 볼게요. 첫 직장에서 7년 근무 후 퇴직해서 실업급여 210일을 받았어요.
        재취업해서 새 직장에서 3년 일하다 다시 퇴직하면? 이번 가입기간은 3년이니까 수급일수는 180일로 줄어드는 거죠.
        짧게 다니고 나올수록 수급일수가 확 줄어든다는 걸 기억해야 해요.
      </p>
      <p style={body}>
        수급액도 새 직장 기준으로 재계산돼요.
        퇴직 전 3개월 평균임금의 60%가 1일 수급액이 되고, 2026년 기준 상한액은 1일 66,000원, 하한액은 63,104원이죠.
        아래 계산기에서 본인 조건을 넣어보면 대략적인 금액이 나와요.
      </p>

      <Calculator
        title="실업급여 재신청 예상 수급액"
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="* 실제 수급액은 퇴직 전 3개월 평균임금 기준으로 산정돼요. 이 계산기는 참고용이며, 정확한 금액은 고용센터에서 확인하세요."
      />

      <BorderBox>
        첫 번째: 가입 7년 → 수급 210일<br />
        두 번째: 가입 3년(리셋 후) → 수급 180일<br />
        두 번째: 가입 1년(리셋 후) → 수급 150일
      </BorderBox>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3: 중간 취업 후 조기퇴사한 경우 + Checklist */}
      <H2>재수급 자격과 조기재취업수당의 관계</H2>
      <p style={body}>
        수급 도중에 취업해서 남은 급여가 있었다면, 그 <strong>남은 일수는 소멸</strong>돼요.
        180일 받을 수 있었는데 60일만 쓰고 취업하면, 나머지 120일은 그냥 사라져요.
        &quot;나중에 이어서 받겠다&quot;는 건 안 되는 구조예요.
      </p>
      <p style={body}>
        대신 <strong><a href="/w/실업급여-조기재취업수당" style={{ color: "#1D9E75", textDecoration: "underline" }}>조기재취업수당</a></strong>이라는 제도를 활용할 수 있죠.
        수급기간의 절반 이상을 남기고 재취업하면, 남은 급여의 절반을 일시금으로 받을 수 있죠.
        180일 중 60일만 쓰고 취업했다면 120일의 절반인 60일분을 한꺼번에 받는 거예요.
        놓치면 아까운 돈이니까 해당되는지 반드시 체크하세요.
      </p>
      <p style={body}>
        재취업한 직장에서 또 퇴직했다면? 새 직장의 고용보험 가입기간이 180일 이상이고, 비자발적 퇴사라면 실업급여를 다시 신청할 수 있죠.
        매번 같은 조건을 새로 충족해야 하는 거죠.
        가입기간이 모자라면 이전 직장에서 수급받지 않은 잔여 피보험기간이 남아 있는지도 따져봐야 해요.
      </p>

      <SectionBadge>재신청 전 반드시 체크하세요</SectionBadge>
      <Checklist items={[
        "이전 수급 이력 확인: 고용24에서 수급 이력 조회 가능",
        "새 직장 고용보험 180일 가입 여부: 피보험단위기간 확인",
        "퇴직 사유 확인: 이직확인서에 비자발적 퇴사로 기재됐는지",
        "12개월 이내 신청 기한: 퇴직일 기준 1년 넘기면 수급 불가",
        "조기재취업수당 해당 여부: 이전 수급 시 절반 이상 남겼는지",
      ]} />

      <Divider />

      {/* 섹션 4: 재신청 절차 */}
      <H2>재수급 기간에 맞춰 신청 절차 진행하기</H2>
      <p style={body}>
        절차 자체는 처음 받을 때와 같아요.
        <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}> 고용24</a>에서 온라인 교육을 이수하고, 관할 고용센터에 방문해서 수급자격 인정을 받고, 정기적으로 실업인정(구직활동 보고)을 하면 되죠.
        한 번 받아본 경험이 있으니 낯설지는 않을 거예요.
      </p>
      <p style={body}>
        금액과 기간은 이전과 다를 수 있죠.
        새 직장 기준의 퇴직 전 3개월 평균임금과 가입기간으로 다시 계산하기 때문이에요.
        이전보다 월급이 높았다면 수급액이 올라갈 수 있고, 반대 경우도 있죠.
        기대했던 금액과 차이가 날 수 있으니 계산기로 미리 확인해보는 게 좋아요.
      </p>
      <p style={body}>
        한 가지만 더 기억하세요. 퇴직 후 <strong>12개월 이내</strong>에 신청해야 해요.
        이 기한이 지나면 수급 자격 자체가 사라지니까, 퇴직하면 미루지 말고 바로 움직이세요.
        이전에 받았던 경험을 살려서 서류도 미리 챙겨두면 훨씬 수월하죠.
      </p>

      <Divider />

      {/* 섹션 5: 핵심 정리 */}
      <H2>재수급 자격을 미리 조회하세요</H2>
      <p style={body}>
        재신청에서 가장 흔한 실수는 &quot;이전 가입기간이 합산되겠지&quot;라는 오해예요.
        한 번 수급하면 피보험기간은 완전히 리셋되니까, 새 직장에서 쌓은 기간만으로 수급일수가 결정되죠.
        짧게 다니고 나오면 수급일수도 짧아지는 구조예요.
      </p>
      <p style={body}>
        그래서 재취업 후에는 <strong>가능하면 오래 다니는 게 유리</strong>해요.
        가입기간이 길수록 수급일수가 늘어나고, 퇴직 전 평균임금이 높을수록 1일 수급액도 올라가니까요.
        물론 비자발적 퇴사 요건을 갖춰야 하는 건 매번 같아요.
      </p>
      <p style={body}>
        <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 본인의 피보험기간과 수급 이력을 미리 조회해보세요.
        관할 고용센터(1350)에 전화 상담을 받으면 재신청 가능 여부를 바로 확인할 수 있죠.
        퇴직 전에 미리 준비해두면 수급까지 걸리는 시간을 확 줄일 수 있죠.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        실업급여 재신청에 대해 실제로 많이 궁금해하시는 내용을 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법을 바탕으로 작성됐어요. 개별 수급 요건은 고용센터 심사에 따라 달라질 수 있으니, 사전 상담(1350)을 받아보세요." />
    </ArticleLayout>
  );
}
