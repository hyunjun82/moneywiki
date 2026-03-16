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
  { id: "c1", label: "기간제(계약직) 근로계약서를 체결했어요" },
  { id: "c2", label: "계약기간 만료로 퇴직했어요 (재계약 거절 포함)" },
  { id: "c3", label: "퇴직 전 18개월간 고용보험 가입기간이 180일 이상이에요" },
  { id: "c4", label: "재취업 의사가 있고 구직활동을 할 수 있어요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "퇴직 전 월 평균임금", min: 150, max: 700, step: 10, defaultValue: 250, format: (v: number) => `${v}만원` },
  { id: "age", label: "퇴직 시 나이", min: 20, max: 68, step: 1, defaultValue: 35, format: (v: number) => `만 ${v}세` },
  { id: "years", label: "고용보험 가입기간", min: 0, max: 20, step: 1, defaultValue: 2, format: (v: number) => v === 0 ? "1년 미만" : `${v}년` },
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
  "고용24에서 고용보험 가입 이력과 피보험 단위기간 조회",
  "이직확인서 퇴직 사유가 '계약기간 만료'로 기재됐는지 확인",
  "근로계약서·계약 만료 통보서 등 증빙자료 보관",
  "수급자격 신청자 온라인 교육 이수 (고용24)",
  "퇴직일로부터 12개월 이내에 고용센터 방문 또는 온라인 신청",
];

const FAQS = [
  {
    q: "기간제랑 계약직이랑 뭐가 다른가요?",
    a: "거의 같은 말이에요. 기간제는 기간제법에서 쓰는 법률 용어이고, 계약직은 일상에서 쓰는 표현이죠. 둘 다 일하는 기간이 정해진 근로계약을 뜻해요.",
  },
  {
    q: "2년 일했는데 무기계약 전환 안 해주면 실업급여 받을 수 있나요?",
    a: "받을 수 있죠. 2년 넘게 일하면 무기계약 전환 대상인데, 회사가 전환 안 하고 내보내면 비자발적 퇴사로 인정돼요. 부당해고 구제 신청도 검토해볼 만하고요.",
  },
  {
    q: "6개월짜리 계약이 반복됐는데 가입기간은 합산되나요?",
    a: "합산돼요. 여러 사업장에서의 고용보험 가입기간을 모두 더해서 피보험 단위기간을 계산하죠. 다만 이전 직장에서 이미 실업급여를 받았다면 그 기간은 빠져요.",
  },
  {
    q: "회사가 이직확인서에 '자진퇴사'로 적었으면 어떡하죠?",
    a: "고용센터에 이의 제기를 하면 돼요. 근로계약서와 계약 만료 통보서를 증빙으로 제출하면 '계약기간 만료'로 정정이 가능하죠.",
  },
  {
    q: "동일 조건으로 재계약 제안했는데 거부하면 실업급여 받을 수 있나요?",
    a: "어려워요. 회사가 동일 조건으로 연장을 제안했는데 본인이 거절한 경우는 자발적 퇴사로 볼 수 있죠. 임금 삭감이나 근무지 변경 등 조건이 나빠진 제안이라면 거절해도 비자발적 퇴사로 인정돼요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법 — 실업급여 수급자격 및 이직 사유", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "기간제법 — 기간제 근로자 보호 및 2년 사용 제한", url: "https://www.law.go.kr/법령/기간제및단시간근로자보호등에관한법률" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24 — 실업급여 신청 및 이직확인서 조회", url: "https://www.ei.go.kr" },
      { label: "고용노동부 — 기간제 근로자 권리 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "계약만료-실업급여",
    title: "계약만료 실업급여 신청 방법",
    description: "계약기간이 끝나서 퇴직하면 비자발적 퇴사로 실업급여를 받을 수 있죠.",
  },
  {
    slug: "단시간-근로자-실업급여",
    title: "단시간 근로자 실업급여 조건",
    description: "주 15시간 미만이라도 조건을 충족하면 실업급여를 받을 수 있어요.",
  },
  {
    slug: "실업급여-피보험기간",
    title: "실업급여 피보험기간 계산 방법",
    description: "실업급여를 받으려면 피보험기간 180일이 필요하죠. 계산법을 정리했어요.",
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
          currentSlug="기간제-실업급여"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 기간제근로자</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        기간제 근로자 실업급여, 얼마 받을까?<br />
        수급액 계산법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;기간제라서 실업급여 안 되는 거 아닌가요?&rdquo;
      </p>
      <p style={body}>
        되죠. 오히려 기간제야말로 실업급여를 가장 많이 받는 유형이에요.{" "}
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>에서
        계약기간 만료를 비자발적 퇴사로 보고 있으니까요. 퇴직 전 평균임금의 60%, 1일 상한액 68,100원·하한액 66,048원(2026년 기준)이에요.
        수급 조건, 계산법, 2년 무기계약 전환까지 한 번에 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 — 기간제 근로자와 실업급여 자격 */}
      <H2>수급액을 받으려면 어떤 조건이 필요한가요?</H2>
      <SectionBadge>수급 자격 체크</SectionBadge>

      <p style={body}>
        기간제 근로자는 계약서에 시작일과 종료일이 적혀 있는 사람이에요.{" "}
        <a href="https://www.law.go.kr/법령/기간제및단시간근로자보호등에관한법률" style={{ color: "#1D9E75", textDecoration: "underline" }}>기간제법</a>에서 쓰는 법률 용어이고, 일상에서는 &ldquo;계약직&rdquo;이라고 부르죠. 1년이든 6개월이든 기간이 정해져 있으면 여기에 해당해요.
      </p>
      <p style={body}>
        수급 조건은 세 가지예요. 퇴직 전 18개월 이내에 <strong>고용보험 180일 이상</strong> 가입, 비자발적 퇴사, 재취업 의사와 능력. 계약기간 만료는 내 의지와 무관하게 발생하는 거라 비자발적 퇴사로 인정돼요. 회사가 재계약을 안 해줬다면 더 말할 것도 없죠.
      </p>
      <p style={body}>
        주의해야 할 경우가 하나 있어요. 회사가 <strong>동일 조건으로 연장을 제안</strong>했는데 본인이 거절한 경우예요. 이건 자발적 퇴사로 볼 수 있어서 수급이 어려워지죠. 반면 임금이 깎이거나 근무지가 바뀌는 등 조건이 나빠진 제안이었다면, 거절해도 비자발적 퇴사로 인정돼요.
      </p>

      <GreenBox title="계약만료 = 비자발적 퇴사 기준">
        회사가 재계약을 안 해줌 → 비자발적 (실업급여 대상)<br />
        나빠진 조건으로 연장 제안 → 거절해도 비자발적<br />
        동일 조건 연장 제안을 내가 거절 → 자발적 (수급 어려움)
      </GreenBox>

      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="기간제 실업급여 수급 조건을 모두 충족해요. 퇴직 후 고용센터에 신청하세요."
        partialMatchText="일부 조건이 맞지 않아요. 해당 항목을 다시 확인해보세요."
      />

      <Divider />

      {/* 섹션 2 — 수급액 계산 */}
      <H2>수급액 계산법은 어떻게 되나요?</H2>

      <p style={body}>
        기간제라고 금액이 깎이진 않아요. 정규직과 동일하게 퇴직 전 3개월 평균임금의 <strong>60%</strong>예요. 2026년 기준 1일 상한액 <strong>68,100원</strong>, 하한액 <strong>66,048원</strong>이고요. 월 환산하면 약 198만~204만원 사이가 되죠.
      </p>
      <p style={body}>
        얼마나 오래 받느냐는 고용보험 가입기간과 나이가 결정해요. 2년 기간제로 일했던 50세 미만이라면 150일(약 5개월), 50세 이상이면 180일(약 6개월)이에요. 6개월 계약을 4번 반복했어도 합쳐서 2년이면 동일하게 적용되니까 짧은 계약이 불리하진 않아요.
      </p>
      <p style={body}>
        한 가지 주의할 점이 있어요. 이전 직장에서 이미 실업급여를 받았으면 그 기간은 합산에서 빠져요. 고용보험 미가입 기간도 당연히 포함되지 않죠.{" "}
        <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 본인 피보험 이력을 조회하면 합산 가능한 기간이 정확하게 나오니까 신청 전에 꼭 조회해보세요. <a href="/w/실업급여-피보험기간" style={{ color: "#1D9E75", textDecoration: "underline" }}>피보험기간 계산법</a>도 함께 참고하면 좋아요.
      </p>

      <Calculator
        title="기간제 실업급여 예상 수급액"
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="실제 수급액은 고용센터 심사에 따라 달라질 수 있어요."
      />

      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 — 신청 절차와 체크리스트 */}
      <H2>수급액 신청 절차와 체크리스트</H2>
      <SectionBadge>신청 전 체크리스트</SectionBadge>

      <p style={body}>
        신청 전에 가장 먼저 확인할 건 <strong>이직확인서</strong>예요.{" "}
        <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에 접속해서 회사가 이직확인서를 제출했는지, 퇴직 사유가 &lsquo;계약기간 만료&rsquo;로 적혀 있는지 살펴보세요. &ldquo;자진퇴사&rdquo;로 잘못 기재된 경우가 종종 있는데, 이때는 고용센터에 이의를 제기하면 돼요.
      </p>
      <p style={body}>
        이직확인서가 정상이면 워크넷에 구직등록 후 수급자격 신청자 온라인 교육을 이수해요. 그 뒤 관할 고용센터에 방문하거나 고용24에서 온라인 신청을 하면 되죠. 담당자가 퇴직 사유와 피보험기간을 심사한 뒤 수급자격 인정 여부를 알려줘요.
      </p>
      <p style={body}>
        수급이 인정되면 1~4주 간격으로 실업인정일에 <a href="/w/실업급여-구직활동-횟수" style={{ color: "#1D9E75", textDecoration: "underline" }}>구직활동</a> 내역을 보고해야 해요. 보고가 완료되면 실업급여가 통장에 입금되는 구조예요. 퇴직일로부터 <strong>12개월</strong>이 넘으면 아무리 조건을 충족해도 수급 자격이 사라지니까, 퇴직 직후 바로 절차를 시작하세요.
      </p>

      <Checklist items={CHECKLIST} />

      <Divider />

      {/* 섹션 4 — 2년 무기계약 전환 */}
      <H2>2년 초과 근무 시 수급액과 무기계약 전환</H2>

      <p style={body}>
        같은 사업장에서 기간제로 <strong>2년을 넘기면</strong> 법적 지위가 바뀌어요.{" "}
        <a href="https://www.law.go.kr/법령/기간제및단시간근로자보호등에관한법률" style={{ color: "#1D9E75", textDecoration: "underline" }}>기간제법 제4조</a>에 따라 무기계약(기간의 정함이 없는 계약)을 체결한 것으로 간주하죠. 정규직에 준하는 고용 안정성을 갖게 되는 거예요.
      </p>
      <p style={body}>
        현실은 좀 다르죠. 회사 입장에서는 무기계약 전환 의무가 부담스러우니까, 2년 직전에 재계약을 거부하고 내보내는 경우가 많아요. 이런 상황이라면 비자발적 퇴사에 해당하고, 당연히 실업급여 대상이에요. 가입기간도 2년 가까이 쌓여 있으니 수급기간이 150일(50세 미만) 이상 나오죠.
      </p>
      <p style={body}>
        2년을 넘겼는데도 회사가 무기계약 전환 없이 내보냈다면, 실업급여 신청과 별도로 <strong>부당해고 구제 신청</strong>도 검토해보세요. 무기계약 근로자를 정당한 사유 없이 해고하면 부당해고에 해당하거든요.{" "}
        <a href="https://www.moel.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부</a>(1350)에 상담하면 구제 가능 여부를 안내받을 수 있어요.
      </p>

      <BorderBox title="2년 기준 정리">
        2년 미만 계약만료 → 비자발적 퇴사, 실업급여 대상<br />
        2년 직전 재계약 거부 → 비자발적 퇴사, 실업급여 대상<br />
        2년 초과 사용 → 무기계약 전환 대상 (미전환 시 부당해고 가능)
      </BorderBox>

      <Divider />

      {/* 섹션 5 — 퇴직금 */}
      <H2>퇴직금과 수급액을 함께 챙기세요</H2>

      <p style={body}>
        &ldquo;기간제라서 퇴직금은 안 나오죠?&rdquo; 아니에요. <strong>1년 이상 근속</strong>했으면 기간제든 정규직이든 퇴직금을 받을 권리가 있어요. 근로기준법이 고용 형태를 가리지 않거든요. 계속근로기간 1년에 대해 30일분 이상의 평균임금이 퇴직금 산정 기준이에요.
      </p>
      <p style={body}>
        2년 기간제로 일했다면 약 2개월분 급여에 해당하는 금액이 나와요. 회사가 안 주겠다고 하면{" "}
        <a href="https://www.moel.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부</a>에 진정을 넣으세요. 퇴직일로부터 <strong>14일</strong> 안에 지급해야 하고, 이 기한을 넘기면 연 20%의 지연이자가 붙어요.
      </p>
      <p style={body}>
        실업급여와 퇴직금은 돈이 나오는 곳 자체가 달라요. <a href="/w/실업급여-계산기" style={{ color: "#1D9E75", textDecoration: "underline" }}>실업급여 계산기</a>로 예상 수급액을 미리 뽑아보면 자금 계획이 수월해지죠. 실업급여는 고용보험 기금에서, 퇴직금은 회사 재원에서 지급하죠. 둘 중 하나만 받는 게 아니라 동시에 받는 거예요. 퇴직 후에 바빠서 하나를 놓치면 그만큼 손해이니까, 실업급여 신청하면서 퇴직금 지급 여부도 함께 따져보세요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        기간제 실업급여에 대해 실제로 많이 물어보는 내용만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법과 기간제법을 바탕으로 작성됐어요. 개별 사안은 고용센터 심사에 따라 달라질 수 있으니, 사전 상담(1350)을 받아보세요." />
    </ArticleLayout>
  );
}
