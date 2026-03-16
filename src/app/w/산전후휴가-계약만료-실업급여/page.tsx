"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body, Calculator,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR } from "@/data/실업급여-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "산전후휴가 중 계약기간이 만료됐어요" },
  { id: "c2", label: "퇴직 전 18개월 이내 고용보험 180일 이상 가입했어요" },
  { id: "c3", label: "이직확인서에 퇴직 사유가 '계약기간 만료'로 기재됐어요" },
  { id: "c4", label: "출산 후 재취업 의사가 있어요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "퇴직 전 월 평균임금", min: 150, max: 700, step: 10, defaultValue: 250, format: (v: number) => `${v}만원` },
  { id: "age", label: "퇴직 시 나이", min: 25, max: 55, step: 1, defaultValue: 32, format: (v: number) => `${v}세` },
  { id: "years", label: "고용보험 가입기간", min: 1, max: 15, step: 1, defaultValue: 2, format: (v: number) => `${v}년` },
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
  "산전후휴가급여 수급이 끝났는지 확인 (중복 수급 불가)",
  "이직확인서에 퇴직 사유 '계약기간 만료' 기재 여부 확인",
  "출산증명서, 가족관계증명서 준비",
  "고용센터 방문 또는 고용24에서 실업급여 신청",
  "수급기간 연장이 필요하면 연장 신청서 별도 제출",
];

const FAQS = [
  {
    q: "산전후휴가 중에 계약만료되면 바로 실업급여를 신청해야 하나요?",
    a: "바로 신청할 수는 없어요. 출산전후휴가급여를 먼저 받고, 휴가가 끝나면 그때 실업급여를 신청하면 되죠. 두 급여는 중복 수급이 안 되니까 순서를 지켜야 해요.",
  },
  {
    q: "출산휴가급여를 받는 동안 실업급여 수급기한이 지나버리면요?",
    a: "수급기간은 퇴직일로부터 1년이에요. 산전후휴가 90일을 빼도 9개월이 남으니까 시간적 여유는 있죠. 그래도 불안하면 수급기간 연장 제도를 활용하세요.",
  },
  {
    q: "임신 중에 퇴직하면 실업급여 대상이 아닌가요?",
    a: "비자발적 퇴직이면 대상이에요. 계약만료, 권고사직, 임신으로 인한 근로 불가 등이 해당되죠. 재취업 의사만 있으면 수급자격이 인정돼요.",
  },
  {
    q: "육아휴직 끝났는데 복직이 안 되면 실업급여를 받을 수 있나요?",
    a: "받을 수 있죠. 복직 거부는 사실상 해고에 해당하니까 비자발적 퇴사로 인정돼요. 육아휴직급여와 실업급여는 중복 수급이 안 되니 순서대로 받으면 되고요.",
  },
  {
    q: "출산 후 구직활동이 어려우면 수급기간을 늘릴 수 있나요?",
    a: "임신, 출산, 만 8세 이하 육아로 취업이 어려운 경우 최대 1년까지 연장이 가능해요. 고용센터에 출산증명서와 연장 신청서를 제출하면 되죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법 — 수급자격 및 비자발적 이직 기준", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "근로기준법 제74조 — 산전후휴가 규정", url: "https://www.law.go.kr/법령/근로기준법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24 — 실업급여 신청 안내", url: "https://www.ei.go.kr" },
      { label: "고용노동부 — 모성보호 제도 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "실업급여-임신",
    title: "임신 중 퇴직해도 실업급여 받을 수 있을까",
    description: "임신 중 비자발적 퇴직이면 실업급여 수급자격이 인정돼요.",
  },
  {
    slug: "실업급여-출산",
    title: "출산 후 실업급여 신청 방법과 수급 조건",
    description: "출산 후 실업급여를 받으려면 순서와 시기를 알아야 해요.",
  },
  {
    slug: "계약만료-실업급여",
    title: "계약만료 실업급여 조건과 신청 방법",
    description: "계약기간 만료로 퇴직하면 비자발적 퇴사로 실업급여를 받을 수 있죠.",
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
          currentSlug="산전후휴가-계약만료-실업급여"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 산전후휴가</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        출산휴가 중 계약만료, 실업급여?<br />
        수급 자격과 신청 절차
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;산전후휴가를 쓰고 있는데 계약이 끝나요. 실업급여는요?&rdquo;<br />
        받을 수 있죠. 계약만료는 <strong>비자발적 퇴사</strong>니까요.<br /><br />
        다만 출산전후휴가급여와 실업급여를 <strong>동시에 받을 수는 없어요</strong>.
        휴가급여를 먼저 받고, 휴가가 끝난 뒤에 실업급여를 신청하면 되죠.
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}> 고용보험법</a>에서 이 수급 순서를 정하고 있어요.
        2026년 기준 1일 상한액은 68,100원, 하한액은 66,048원이에요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 — 계약만료 = 비자발적 퇴사 */}
      <H2>출산휴가 중 계약만료, 수급 자격이 되나요?</H2>
      <p style={body}>
        계약직이 계약기간 만료로 퇴직하면 <strong>비자발적 퇴사</strong>로 분류돼요. 본인이 더 일하고 싶었는데 회사가 계약을 연장하지 않은 거니까요. 산전후휴가 중이든 아니든 이 원칙은 똑같이 적용되죠.
      </p>
      <p style={body}>
        그런데 한 가지 주의할 점이 있어요. 본인이 먼저 &ldquo;계약 연장 안 하겠다&rdquo;고 한 경우에는 자발적 퇴사로 볼 수 있죠. 회사가 연장을 제안했는데 거부한 거라면, 고용센터에서 비자발적 퇴사로 인정하지 않을 수도 있어요.
      </p>
      <p style={body}>
        이직확인서에 퇴직 사유가 <strong>&ldquo;계약기간 만료&rdquo;</strong>로 기재되는지 꼭 살펴봐야 해요. 회사가 &ldquo;자발적 퇴사&rdquo;로 기재하면 문제가 생기죠. 기재가 잘못된 경우 고용센터(1350)에 정정을 요청할 수 있어요.
      </p>

      <GreenBox title="핵심 정리">
        계약만료 = 비자발적 퇴사 = 실업급여 대상<br />
        산전후휴가 중이라도 동일하게 적용돼요<br />
        이직확인서 퇴직 사유 &ldquo;계약기간 만료&rdquo; 기재 필수
      </GreenBox>

      <SectionBadge>자격 체크</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="4가지 모두 해당돼요. 산전후휴가 중 계약만료 실업급여 수급 자격을 갖췄어요."
        partialMatchText="일부만 해당돼요. 나머지 조건도 확인해보고 고용센터(1350)에 상담하세요."
      />

      <Divider />

      {/* 섹션 2 — 출산휴가급여와 실업급여 수급 순서 */}
      <H2>출산휴가급여와 실업급여 신청 절차는 어떤 순서인가요?</H2>
      <p style={body}>
        산전후휴가 중이라면 <strong>출산전후휴가급여</strong>를 먼저 받고 있을 거예요. 이 급여는 고용보험에서 90일 동안 지급되죠. 여기서 핵심은, 출산전후휴가급여와 실업급여는 <strong>중복 수급이 안 된다</strong>는 거예요.
      </p>
      <p style={body}>
        그래서 순서가 정해져 있죠. 먼저 산전후휴가 90일 동안 <strong>출산전후휴가급여</strong>를 받아요. 휴가가 끝나면 그때 <strong>실업급여를 신청</strong>하면 돼요. 계약만료로 퇴직한 거니까 수급자격은 이미 확보된 상태이고요.
      </p>
      <p style={body}>
        실업급여 수급기간은 <strong>퇴직일(계약만료일)로부터 1년</strong>이에요. 산전후휴가가 90일이니까 약 3개월이죠. 1년 중 3개월을 쓴 셈이라 남은 9개월 동안 실업급여를 받을 수 있어요. 시간적 여유는 충분하니 서두를 필요 없죠.
      </p>

      <BorderBox title="수급 순서 정리">
        1단계: 산전후휴가 90일 → 출산전후휴가급여 수급<br />
        2단계: 휴가 종료 후 → 실업급여 신청<br />
        수급기간: 퇴직일로부터 1년 (휴가 기간 포함)
      </BorderBox>

      <SectionBadge>내 조건으로 수급액을 계산해보세요</SectionBadge>
      <Calculator
        title="산전후휴가 계약만료 실업급여 예상 수령액"
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 2026년 기준 1일 상한액 68,100원, 하한액 66,048원 적용. 실제 금액은 고용센터 심사에 따라 달라질 수 있어요."
      />

      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 — 수급기간 연장 */}
      <H2>출산·육아 사유로 수급 자격 유지하며 기간 연장 가능</H2>
      <p style={body}>
        아기가 어려서 당장 구직활동을 하기 힘들 수 있죠. 이런 경우를 위해 <strong>수급기간 연장 제도</strong>가 있어요. 임신, 출산, 육아로 취업이 어려운 경우 <strong>최대 1년</strong>까지 수급기간을 연장할 수 있죠.
      </p>
      <p style={body}>
        신청 방법은 고용센터에 <strong>수급기간 연장 신청서</strong>를 제출하는 거예요. 출산증명서, 가족관계증명서 등 증빙서류가 필요하죠. 연장이 승인되면 원래 수급기간 1년에 최대 1년이 더 추가돼요.
      </p>
      <p style={body}>
        예를 들어볼게요. 2026년 3월에 계약만료됐다면 원래 수급기간은 2027년 3월까지예요. 여기서 연장이 승인되면 <strong>2028년 3월까지</strong> 실업급여를 받을 수 있죠. 출산 후 몸을 추스르고 아이 돌봄을 안정시킨 뒤에 구직활동을 시작해도 되는 거예요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* 섹션 4 — 임신 중 퇴직과 육아휴직 */}
      <H2>임신 중 퇴직이나 육아휴직 만료도 수급 자격 인정</H2>
      <p style={body}>
        임신 중에 퇴직해도 <strong>비자발적 퇴직</strong>이면 실업급여를 받을 수 있어요. 계약만료, 권고사직, 회사 사정에 의한 퇴직이 여기에 해당되죠. 임신 때문에 근로가 어려워서 퇴직한 경우도 의사 소견서가 있으면 <strong>정당한 이직 사유</strong>로 인정될 수 있고요.
      </p>
      <p style={body}>
        육아휴직 중에 계약이 만료되는 경우도 마찬가지예요. 육아휴직급여와 실업급여는 중복 수급이 안 되니까, 육아휴직이 끝나고 신청하면 되죠. 육아휴직 끝난 뒤 회사에서 복직을 안 시켜주면 사실상 해고에 해당해서 비자발적 퇴사로 인정돼요.
      </p>
      <p style={body}>
        여기서 놓치기 쉬운 게 <strong>재취업 의사</strong>예요. 실업급여를 받으려면 &ldquo;일할 의사와 능력&rdquo;이 있어야 하죠.
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}> 고용보험법</a>에서 이 조건을 명시하고 있어요. 임신 중이라도 출산 후 취업하겠다는 의사가 있으면 충분히 인정되죠.
      </p>

      <GreenBox title="수급기간 연장 조건">
        사유: 임신, 출산, 만 8세 이하 육아<br />
        연장 기간: 최대 1년<br />
        필요 서류: 출산증명서, 가족관계증명서 등<br />
        신청처: 관할 고용센터
      </GreenBox>

      <Divider />

      {/* 섹션 5 — 실업급여 금액과 실전 정리 */}
      <H2>계약만료 후 신청 절차, 이 금액부터 계산하세요</H2>
      <p style={body}>
        실업급여는 퇴직 전 평균임금의 <strong>60%</strong>를 받아요. 2026년 기준으로 <strong>1일 상한액은 68,100원</strong>, <strong>1일 하한액은 66,048원</strong>이에요. 월 기준으로 환산하면 최대 약 <strong>204만 원</strong>이죠.
      </p>
      <p style={body}>
        수급 기간은 나이와 고용보험 가입기간에 따라 120일~270일까지 달라져요. 30세 미만이면서 가입기간 1년 이상 3년 미만이라면 150일, 50세 이상이면서 10년 이상 가입했다면 270일이죠. 본인 조건에 맞는 수급일수를 <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 조회해보세요.
      </p>
      <p style={body}>
        정리하면 이래요. 산전후휴가 중 계약만료 → 출산전후휴가급여 먼저 수급 → 휴가 끝나면 실업급여 신청 → 구직 어려우면 수급기간 연장. 이 순서만 기억하면 돼요. 궁금한 점은 고용센터(1350)에 전화하면 바로 안내받을 수 있죠.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        산전후휴가와 계약만료 실업급여에 대해 실제로 많이 물어보는 내용만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법을 바탕으로 작성됐어요. 개별 수급자격 인정 여부는 고용센터 심사에 따라 다르니, 사전 상담(1350)을 받아보세요." />
    </ArticleLayout>
  );
}
