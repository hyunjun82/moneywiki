// Q1. 아이 때문에 휴직하려는데 급여를 얼마나 받을 수 있는지, 신청 조건이 궁금한 상황
// Q2. 육아휴직급여 금액 확인 → 6+6 부모육아휴직제 혜택 파악 → 신청 절차 완료
// Q3. 통상임금 80%(상한 250만원), 6+6 최대 450만원, 고용보험 180일, 만 8세 이하, 1년6개월
// Q4. Calculator(급여 계산) + EligibilityChecker(자격) + Steps(신청절차) + FAQ

"use client";
export const dynamic = "force-static";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, EligibilityChecker, Calculator, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

// ─── 데이터 ──────────────────────────────────────────

const CALC_SLIDERS = [
  { id: "wage", label: "월 통상임금 (만원)", min: 100, max: 500, step: 10, defaultValue: 250, format: (v: number) => `${v.toLocaleString()}만원` },
];

const CALC_RESULTS = [
  {
    label: "월 육아휴직급여 (80%)",
    getValue: (inputs: Record<string, number>) => Math.max(70, Math.min(inputs.wage * 0.8, 250)),
    format: (v: number) => `${v.toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "상한/하한 적용",
    getValue: (inputs: Record<string, number>) => {
      const calc = inputs.wage * 0.8;
      if (calc >= 250) return 250;
      if (calc <= 70) return 70;
      return calc;
    },
    format: (v: number) => v >= 250 ? "상한 250만원 적용" : v <= 70 ? "하한 70만원 적용" : "통상임금 80% 그대로",
  },
];

const ELIGIBILITY = [
  { id: "child", label: "만 8세 이하(초등학교 2학년 이하) 자녀가 있어요" },
  { id: "insurance", label: "고용보험 가입 기간이 180일 이상이에요" },
  { id: "employed", label: "현재 근로자 신분(정규직·계약직)이에요" },
  { id: "request", label: "사업주에게 육아휴직을 신청했어요" },
];

const STEPS_DATA = [
  {
    title: "사업주에게 육아휴직 신청",
    desc: "휴직 시작 예정일 30일 전에 사업주에게 서면으로 신청해요. 사업주는 거부할 수 없어요. 갑작스러운 사정이면 최대한 빨리 알려주세요.",
  },
  {
    title: "고용센터에 급여 신청",
    desc: "휴직 시작 후 1개월부터 신청 가능해요. 고용24(work24.go.kr)에서 온라인 신청하거나 관할 고용센터를 방문하세요.",
    tip: "매월 신청해야 급여가 나와요. 첫 달에 바로 신청하는 게 좋아요",
    link: { label: "고용24 바로가기", href: "https://www.work24.go.kr" },
  },
  {
    title: "급여 수령 및 복직",
    desc: "매월 급여가 지급돼요. 2026년부터 사후지급금 제도가 폐지되어 급여 전액이 휴직 중에 지급돼요. 복직 후 6개월 근무 의무도 없어졌어요.",
  },
];

const FAQS = [
  { q: "2026년부터 사후지급금이 없어졌다는 게 무슨 뜻이에요?", a: "이전에는 급여의 25%를 복직 후 6개월 근무해야 받았어요. 2026년부터는 그 제도가 폐지돼서 휴직 중에 급여 100%를 바로 받아요." },
  { q: "6+6 부모육아휴직제는 뭐예요?", a: "부모가 동시에 또는 순차적으로 육아휴직을 쓸 때 첫 6개월 급여 상한이 올라가는 제도예요. 1~2개월째 250만원, 3개월째 300만원, 4개월째 350만원, 5개월째 400만원, 6개월째 450만원까지 받을 수 있어요." },
  { q: "육아휴직 중에 일해도 되나요?", a: "안 돼요. 주 10시간을 초과하면 급여가 50% 감액되고, 다른 회사에 취업하면 급여가 완전히 중지돼요." },
  { q: "한부모 가정은 급여가 다른가요?", a: "한부모(미혼모·부, 사별, 이혼 등)는 통상임금의 100%, 상한 250만원을 받아요. 배우자가 없어 육아 부담이 더 크기 때문이에요." },
  { q: "육아휴직 기간이 1년 6개월로 늘었나요?", a: "네, 2026년부터 부모 각각 최대 1년 6개월까지 사용 가능해요. 기존 1년에서 6개월 확대됐어요." },
  { q: "계약직도 육아휴직급여를 받을 수 있나요?", a: "네, 고용보험 가입 180일 이상이면 정규직·계약직 구분 없이 받을 수 있어요. 다만 자영업자나 프리랜서는 대상이 아니에요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "고용24 육아휴직급여 안내", url: "https://m.work24.go.kr/cm/c/f/1100/selecSystInfo.do?systClId=SC00000251&systId=SI00000402" },
      { label: "고용보험법 (육아휴직 급여)", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용보험 홈페이지", url: "https://www.ei.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "육아기-근로시간-단축-연차-사용", title: "육아기 단축근무와 연차", description: "단축근무 쓰면 연차가 줄어드는지 확인하세요." },
  { slug: "육아휴직-후-연차-발생-여부", title: "육아휴직 후 연차 발생 여부", description: "복직하면 연차가 생기는지 정리했어요." },
  { slug: "출산휴가-급여-지급", title: "출산휴가 급여", description: "출산 전후 받을 수 있는 급여를 안내해요." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>고용 · 육아 · 급여</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        육아휴직급여, 매달 얼마 받을까?<br />
        2026년 금액과 신청 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        아이를 키우면서 일을 쉬어야 하는데 돈 걱정이 앞서죠. 육아휴직급여는 통상임금의 80%, 최대 <strong>월 250만원</strong>까지 받을 수 있어요.
        부부가 함께 쓰면 <a href="https://www.work24.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>6+6 부모육아휴직제</a>로 첫 6개월 최대 450만원까지 올라가요.
        2026년부터는 사후지급금도 없어져서 휴직 중에 급여 전액을 바로 받고, 기간도 <strong>최대 1년 6개월</strong>로 늘었어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>내 육아휴직급여는 얼마일까?</H2>
      <p style={body}>
        통상임금의 80%가 기본이에요. 상한 250만원, 하한 70만원이 적용돼요.
        월급이 312만원 이상이면 무조건 250만원을 받고, 87.5만원 이하면 70만원을 받아요.
      </p>

      <Calculator title="육아휴직급여 계산기" sliders={CALC_SLIDERS} results={CALC_RESULTS} note="2026년 기준, 사후지급금 폐지 반영" />

      <GreenBox title="6+6 부모육아휴직제 상한액">
        1~2개월: 250만원 → 3개월: 300만원 → 4개월: 350만원<br />
        5개월: 400만원 → 6개월: 450만원 (부부 동시/순차 사용 시)
      </GreenBox>

      <Divider />

      <H2>급여를 받으려면 어떤 조건이 필요한가요?</H2>
      <p style={body}>
        만 8세 이하 자녀가 있고, 고용보험에 180일 이상 가입돼 있으면 남녀 구분 없이 신청 가능해요.
        정규직, 계약직 모두 해당되지만 자영업자나 프리랜서는 안 돼요.
      </p>

      <SectionBadge>자격 확인</SectionBadge>
      <EligibilityChecker
        items={ELIGIBILITY}
        allMatchText="육아휴직급여를 받을 수 있어요. 아래 절차를 따라 신청하세요."
        partialMatchText="일부 조건이 맞지 않아요. 해당 항목을 확인해 보세요."
      />

      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>신청은 어떻게 하나요?</H2>
      <p style={body}>
        사업주에게 먼저 알리고, 휴직이 시작되면 고용센터에 급여를 신청하면 돼요. 온라인으로도 할 수 있어요.
      </p>

      <Steps steps={STEPS_DATA} />

      <BorderBox>
        2026년부터 사후지급금(25%)이 폐지됐어요. 복직 후 6개월 근무 안 해도 급여 전액을 휴직 중에 바로 받아요.
        기존에 복직 후 6개월을 못 채워서 25%를 못 받았던 분들에겐 큰 변화예요.
      </BorderBox>

      <Divider />

      <H2>궁금한 점들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 육아휴직급여 안내예요. 급여 상한액, 제도 내용은 법령 개정에 따라 변경될 수 있으니 고용24 또는 고용센터에서 최신 기준을 확인하세요." />
    </ArticleLayout>
  );
}
