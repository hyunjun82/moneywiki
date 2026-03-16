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
  { id: "c1", label: "육아휴직을 사용한 이력이 있어요" },
  { id: "c2", label: "복귀 후 비자발적으로 퇴직했어요 (권고사직, 근로조건 변경, 복귀 거부 등)" },
  { id: "c3", label: "퇴직 전 18개월(+육아휴직 기간) 중 피보험단위기간이 180일 이상이에요" },
  { id: "c4", label: "재취업 의사가 있고 적극적 구직활동이 가능해요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "퇴직 전 월 평균임금", min: 150, max: 700, step: 10, defaultValue: 300, format: (v: number) => `${v}만원` },
  { id: "age", label: "퇴직 시 나이", min: 20, max: 68, step: 1, defaultValue: 35, format: (v: number) => `만 ${v}세` },
  { id: "years", label: "고용보험 가입기간", min: 0, max: 20, step: 1, defaultValue: 5, format: (v: number) => v === 0 ? "1년 미만" : `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "1일 수급액",
    getValue: (v: Record<string, number>) => getDaily(v.salary),
    format: (v: number) => `${v.toLocaleString()}원`,
  },
  {
    label: "수급기간",
    getValue: (v: Record<string, number>) => getDays(v.age, v.years),
    format: (v: number) => `${v}일 (약 ${Math.round(v / 30)}개월)`,
  },
  {
    label: "월 수령액 (30일 기준)",
    getValue: (v: Record<string, number>) => getDaily(v.salary) * 30,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
  {
    label: "예상 총 수령액",
    getValue: (v: Record<string, number>) => getDaily(v.salary) * getDays(v.age, v.years),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
];

const CHECKLIST = [
  "육아휴직 기간 중 고용보험 피보험자격 유지 여부 확인 (고용24 피보험자격 이력 조회)",
  "복귀 후 퇴직 사유가 비자발적인지 확인 (이직확인서 기재 내용 점검)",
  "퇴직 전 18개월(+휴직 연장분) 내 피보험단위기간 180일 이상인지 확인",
  "육아휴직급여 수급 이력과 실업급여 수급은 별개 — 이중 수급 아님",
  "퇴직일로부터 12개월 이내에 고용24 또는 관할 고용센터에서 신청",
];

const FAQS = [
  {
    q: "육아휴직 중에는 피보험단위기간이 쌓이나요?",
    a: "피보험자격은 유지되지만 피보험단위기간(유급일수)은 쌓이지 않아요. 대신 고용보험법 제41조에서 산정 기준 기간(18개월)을 육아휴직 기간만큼 연장해주죠. 1년 휴직하면 30개월까지 소급해서 180일을 계산해요.",
  },
  {
    q: "육아휴직급여를 받았는데 실업급여도 따로 받을 수 있나요?",
    a: "받을 수 있어요. 육아휴직급여는 고용보험법 제70조, 실업급여는 제40조에 따른 별도 급여예요. 지급 시점과 목적이 다르니까 이중 수급이 아니에요.",
  },
  {
    q: "복귀하지 않고 바로 퇴직하면 무조건 실업급여를 못 받나요?",
    a: "무조건 못 받는 건 아니에요. 회사가 복귀 자체를 거부했거나, 복귀 후 근로조건이 현저히 불리해진 경우는 비자발적 퇴직으로 인정될 수 있죠. 핵심은 퇴직 사유가 자발적인지 비자발적인지예요.",
  },
  {
    q: "육아휴직 기간이 길면 180일 채우기 어렵지 않나요?",
    a: "고용보험법이 특례를 두고 있어요. 기준 기간(원래 18개월)에 육아휴직 기간만큼 더하죠. 1년 휴직했으면 30개월 전까지 소급해서 계산하니까 대부분 180일은 넉넉해요.",
  },
  {
    q: "실업급여 신청 기한은 언제까지인가요?",
    a: "퇴직일로부터 12개월 이내에 신청해야 해요. 기한을 넘기면 수급자격 자체가 사라지죠. 워크넷 구직등록 → 수급자격 신청자 온라인 교육 → 고용센터 방문 순서로 빨리 움직이세요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법 제40조 — 구직급여 수급요건", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용보험법 제41조 — 피보험단위기간 산정 특례 (휴직기간 연장)", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용보험법 제70조 — 육아휴직급여", url: "https://www.law.go.kr/법령/고용보험법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24 — 실업급여 신청·조회", url: "https://www.ei.go.kr" },
      { label: "고용노동부 — 육아휴직 제도 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "육아휴직후-퇴사-실업급여",
    title: "육아휴직 복귀 후 퇴사 시 실업급여",
    description: "복귀한 뒤 퇴사하면 자발적·비자발적 구분이 핵심이에요. 이직확인서 사유별 판단 기준을 정리했어요.",
  },
  {
    slug: "실업급여-임신",
    title: "임신 중 실업급여 수급 조건",
    description: "임신 상태에서 퇴직한 경우 수급기간 연장과 출산 후 신청 방법을 정리했어요.",
  },
  {
    slug: "실업급여-출산",
    title: "출산 후 실업급여 신청 방법",
    description: "출산 전후에 퇴직한 경우 실업급여 수급기간 연장 특례를 정리했어요.",
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
          currentSlug="육아휴직-후-실업급여"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 육아휴직</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        육아휴직 끝나고 퇴직하면?<br />
        실업급여 수급 조건과 금액
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        육아휴직을 마치고 복귀할지, 퇴직할지 고민 중이라면 실업급여부터 따져봐야 해요.
        결론부터 말하면, 복귀 후 비자발적으로 퇴직한 경우에는 실업급여를 받을 수 있죠.{" "}
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 제40조</a>가 정한
        수급요건(피보험단위기간 <strong>180일</strong>, 비자발적 이직, 재취업 의사)을 충족하면 돼요.
        2026년 기준 1일 상한액 <strong>68,100원</strong>, 하한액 <strong>66,048원</strong>이 적용되고요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 — 육아휴직 후 실업급여 자격 */}
      <H2>실업급여 수급 조건, 핵심은 퇴직 사유인가요?</H2>
      <SectionBadge>수급 자격 체크</SectionBadge>

      <p style={body}>
        육아휴직 자체가 실업급여 수급을 막거나 보장하지 않아요.
        실업급여 수급 여부를 결정하는 건 <strong>퇴직 사유</strong>예요.
        육아휴직을 1년 쓰든 2년 쓰든, 복귀 후 비자발적으로 퇴직했다면{" "}
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>상 구직급여 수급요건을 충족할 수 있죠.
      </p>
      <p style={body}>
        비자발적 퇴직이란 권고사직, 계약만료, 근로조건의 현저한 변경, 회사의 복귀 거부 등을 말해요.
        육아휴직 복귀 후 부서가 사라졌거나, 직급이 강등됐거나, 업무 내용이 완전히 달라진 경우도 비자발적으로 인정되죠.
        이직확인서에 퇴직 사유가 어떻게 적히느냐가 실질적인 판단 기준이에요.
      </p>
      <p style={body}>
        반대로 본인이 육아에 전념하고 싶어서 자발적으로 그만둔 경우는 어려워요.
        다만{" "}
        <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 확인할 수 있는 정당한 퇴사 사유(통근 곤란, 직장 내 괴롭힘, 가족 돌봄 등)에 해당하면 예외적으로 인정받을 수 있죠.
        사유가 애매하면 고용센터(1350)에 사전 상담을 받아보는 게 안전해요.
      </p>

      <GreenBox title="육아휴직 후 실업급여 가능한 경우">
        회사가 복귀를 거부했거나 배치 전환이 불합리한 경우<br />
        복귀 후 근로조건이 현저히 불리하게 변경된 경우<br />
        복귀 후 권고사직, 계약만료, 정리해고 등 비자발적 퇴직<br />
        → 이직확인서에 비자발적 사유로 기재되어야 해요
      </GreenBox>

      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="육아휴직 후 실업급여 수급 조건을 모두 충족해요. 퇴직 후 바로 신청하세요."
        partialMatchText="일부 조건이 맞지 않아요. 해당 항목을 다시 확인해보세요."
      />

      <Divider />

      {/* 섹션 2 — 180일 산정과 수급액 */}
      <H2>육아휴직 기간이 실업급여 금액 산정에 어떻게 반영되나요?</H2>

      <p style={body}>
        이 부분이 가장 헷갈리는 포인트예요.
        육아휴직 중에는 실제 급여를 받지 않으니까 <strong>피보험단위기간</strong>(유급일수)이 쌓이지 않아요.
        그런데{" "}
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 제41조</a>에서 특례를 두고 있죠.
        피보험단위기간 산정 기준인 18개월에서 육아휴직 기간만큼 더해줘요.
      </p>
      <p style={body}>
        예를 들어 육아휴직을 12개월 썼다면, 기준 기간이 18개월에서 30개월로 늘어나요.
        30개월 전까지 소급해서 유급일수가 180일 이상이면 요건 충족이죠.
        육아휴직 전에 3년 이상 근무했다면 대부분 180일은 넘어요.
        고용24에서 피보험자격 이력을 조회하면 정확한 기간을 확인할 수 있어요.
      </p>
      <p style={body}>
        수급액은 퇴직 전 3개월 평균임금의 <strong>60%</strong>로 산정돼요.
        2026년 기준 1일 상한 <strong>68,100원</strong>, 하한 <strong>66,048원</strong>이 적용되죠.
        육아휴직 전 급여가 아니라 복귀 후 실제 받은 급여를 기준으로 계산해요.
        복귀 기간이 짧아 3개월 급여가 안 되면, 그 직전 기간까지 소급해서 산정하죠.
      </p>

      <BorderBox title="육아휴직 기간의 180일 산정 특례">
        원칙: 퇴직 전 18개월간 피보험단위기간 180일 이상<br />
        특례: 육아휴직 기간만큼 18개월에 추가 (고용보험법 제41조)<br />
        예시: 12개월 휴직 → 기준기간 18+12 = 30개월로 연장<br />
        평균임금: 복귀 후 실제 급여 기준 (휴직급여 아님)
      </BorderBox>

      <Calculator
        title="육아휴직 후 실업급여 예상 수급액"
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 2026년 기준 상한 68,100원, 하한 66,048원 적용. 복귀 후 급여 기준으로 입력하세요."
      />

      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 — 이직확인서와 복귀 여부 */}
      <H2>수급 조건에 따라 이직확인서 기재 내용이 달라져요</H2>
      <SectionBadge>퇴직 전 체크리스트</SectionBadge>

      <p style={body}>
        실업급여 수급의 관건은 이직확인서예요.
        육아휴직 후 복귀했다가 퇴직한 경우, 회사가 이직확인서에 기재하는 퇴직 사유가 전부를 결정하죠.
        '권고사직', '근로조건 변경', '계약만료' 등 비자발적 사유로 적혀 있어야 해요.
      </p>
      <p style={body}>
        복귀하지 않고 바로 퇴직한 경우는 조금 복잡해요.
        회사가 복귀를 거부한 증거(메일, 문자, 녹취 등)가 있으면 비자발적 퇴직으로 인정받을 수 있죠.
        하지만 단순히 "복귀하기 싫어서"라면 자발적 퇴사로 분류돼요.
        고용센터에서는 형식보다 실질적인 퇴직 경위를 따져서 판단해요.
      </p>
      <p style={body}>
        이직확인서가 잘못 기재된 경우에는 고용센터(1350)에 이의를 제기할 수 있어요.
        회사의 복귀 거부 통보서, 근로조건 변경 고지서, 부당 배치전환 증빙 등을 제출하면 정정이 가능하죠.
        퇴직 전에 이런 자료를 미리 확보해두세요.
      </p>

      <Checklist items={CHECKLIST} />

      <Divider />

      {/* 섹션 4 — 육아휴직급여와 실업급여 관계 */}
      <H2>육아휴직급여와 실업급여 금액은 별개예요</H2>

      <p style={body}>
        "육아휴직급여를 받았으니까 실업급여는 못 받는 거 아닌가요?"라고 물어보는 분이 많아요.
        결론부터 말하면, 둘은 완전히 다른 급여예요.
        육아휴직급여는{" "}
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 제70조</a>에 따라 재직 중 육아 지원 목적으로 지급하는 거고,
        실업급여(구직급여)는 제40조에 따라 실직 후 재취업 지원 목적으로 지급하는 거예요.
      </p>
      <p style={body}>
        재원은 둘 다 고용보험 기금이지만, 지급 시점과 목적이 완전히 달라요.
        육아휴직급여는 재직 중에, 실업급여는 퇴직 후에 받는 거죠.
        출산전후휴가 급여도 마찬가지로 별개예요.
        육아휴직급여를 받은 이력이 실업급여 수급자격에 영향을 주지 않아요.
      </p>
      <p style={body}>
        여기에 법정 퇴직금까지 합치면 세 가지를 모두 받을 수 있어요.
        퇴직금은 1년 이상 근무 시 발생하고, 지급기한은 퇴직일로부터 <strong>14일</strong>이에요.
        미지급 시 지연이자는 <strong>연 20%</strong>가 적용되죠.
        육아휴직급여, 퇴직금, 실업급여 — 하나도 빠뜨리지 말고 챙기세요.
      </p>

      <GreenBox title="육아휴직 퇴직 시 받을 수 있는 급여 3가지">
        육아휴직급여 — 재직 중 지급 완료 (고용보험법 제70조)<br />
        법정 퇴직금 — 1년 이상 근무 시 발생, 퇴직일로부터 14일 내 지급<br />
        실업급여 — 퇴직 후 비자발적 사유 충족 시 별도 신청
      </GreenBox>

      <Divider />

      {/* 섹션 5 — 신청 절차 */}
      <H2>육아휴직 후 실업급여 수급, 이렇게 신청하세요</H2>

      <p style={body}>
        첫 번째로{" "}
        <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 이직확인서 처리 상태를 확인하세요.
        회사가 이직확인서를 제출했는지, 퇴직 사유가 비자발적으로 기재됐는지 확인하는 게 선행 조건이에요.
        미제출이면 회사에 요청하고, 사유가 잘못됐으면 정정을 요구해야 하죠.
      </p>
      <p style={body}>
        이직확인서 확인이 끝났으면 워크넷에 구직등록을 하고, 수급자격 신청자 온라인 교육을 이수하세요.
        그 다음 관할 고용센터에 방문하거나 고용24에서 온라인으로 수급자격 인정을 신청해요.
        대기기간 7일이 지나면 첫 실업급여가 입금되기 시작하죠.
      </p>
      <p style={body}>
        임신 중이거나 출산 직후라면 수급기간 연장 특례도 확인해보세요.
        출산일 전후 45일 동안은 실업급여 수급기간이 정지되고, 그만큼 뒤로 연장돼요.
        퇴직일로부터 <strong>12개월 이내</strong> 신청 기한은 동일하니까 미루지 말고 빨리 움직이는 게 좋아요.
        고용센터 상담 전화번호는 <strong>1350</strong>이에요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        육아휴직과 실업급여에 대해 실제로 자주 나오는 질문만 모았어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법을 바탕으로 작성됐어요. 개별 사유의 인정 여부는 고용센터 심사에 따라 다르니, 사전 상담(1350)을 받아보세요." />
    </ArticleLayout>
  );
}
