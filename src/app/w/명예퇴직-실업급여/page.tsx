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
  { id: "c1", label: "회사가 구조조정·경영 악화로 명예퇴직을 권유했어요" },
  { id: "c2", label: "이직확인서에 '권고사직' 또는 '조기퇴직 프로그램'으로 기재돼요" },
  { id: "c3", label: "퇴직 전 18개월간 고용보험 가입기간이 180일 이상이에요" },
  { id: "c4", label: "재취업 의사가 있고 구직활동을 할 수 있어요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "퇴직 전 월 평균임금", min: 150, max: 700, step: 10, defaultValue: 400, format: (v: number) => `${v}만원` },
  { id: "age", label: "퇴직 시 나이", min: 20, max: 68, step: 1, defaultValue: 52, format: (v: number) => `만 ${v}세` },
  { id: "years", label: "고용보험 가입기간", min: 0, max: 20, step: 1, defaultValue: 15, format: (v: number) => v === 0 ? "1년 미만" : `${v}년` },
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
  "이직확인서에 퇴직 사유가 '권고사직' 또는 '조기퇴직 프로그램'으로 기재됐는지 확인",
  "퇴직 전 18개월 내 고용보험 가입기간 180일 이상인지 확인",
  "명예퇴직 권유 공문·메일·안내문 등 증빙자료 보관",
  "퇴직 후 워크넷에 구직등록 + 수급자격 신청자 교육 이수",
  "퇴직일로부터 12개월 이내에 반드시 신청",
];

const FAQS = [
  {
    q: "명예퇴직하면 실업급여 무조건 받을 수 있나요?",
    a: "회사가 구조조정·인력감축으로 명예퇴직을 권유했고, 이직확인서에 권고사직으로 기재됐다면 받을 수 있죠. 본인이 먼저 요청한 경우는 자발적 퇴사로 분류돼서 어렵고요.",
  },
  {
    q: "명예퇴직금 받았는데 실업급여도 받을 수 있나요?",
    a: "둘 다 받을 수 있어요. 명예퇴직금은 회사가 퇴직 유도 대가로 주는 돈이고, 실업급여는 고용보험에서 나오는 돈이죠. 재원이 완전히 다르니까 중복 수급이 아니에요.",
  },
  {
    q: "공무원 명예퇴직도 실업급여 대상인가요?",
    a: "공무원은 고용보험 비가입 대상이라 실업급여를 받을 수 없어요. 대신 명예퇴직수당과 퇴직연금 등 별도 지원 제도가 마련돼 있죠.",
  },
  {
    q: "이직확인서에 '자진퇴사'로 적혀 있으면 어떻게 하나요?",
    a: "인사팀에 정정을 요청하세요. 회사가 거부하면 고용센터(1350)에 이의를 제기할 수 있죠. 명예퇴직 권유 공문이나 안내문이 증거가 돼요.",
  },
  {
    q: "명예퇴직 후 실업급여 신청 기한이 있나요?",
    a: "퇴직일로부터 12개월 이내에 신청해야 해요. 기한을 넘기면 수급자격 자체가 사라지니까 퇴직 직후 바로 움직이는 게 좋죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법 — 구직급여 수급자격 및 제한 사유", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용보험법 시행규칙 — 이직 사유 분류 기준", url: "https://www.law.go.kr/법령/고용보험법시행규칙" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24 — 실업급여 신청·조회 안내", url: "https://www.ei.go.kr" },
      { label: "고용노동부 — 고용보험 제도 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "희망퇴직-실업급여",
    title: "희망퇴직해도 실업급여 받는 방법",
    description: "희망퇴직과 명예퇴직은 비슷하지만 세부 조건이 달라요.",
  },
  {
    slug: "권고사직-실업급여-신청-방법",
    title: "권고사직 실업급여 신청 방법",
    description: "권고사직은 비자발적 퇴사로 실업급여 수급이 가장 쉬운 경우예요.",
  },
  {
    slug: "정리해고-실업급여",
    title: "정리해고 실업급여 신청 방법",
    description: "정리해고는 대표적인 비자발적 퇴사로 실업급여 대상이에요.",
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
          currentSlug="명예퇴직-실업급여"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 명예퇴직</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        명예퇴직 후 실업급여, 얼마 받을까?<br />
        수급 조건과 금액
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &quot;명예퇴직하면 실업급여도 나오나요?&quot;
      </p>
      <p style={body}>
        나올 수 있어요. 회사가 구조조정이나 인력 감축 때문에 퇴직을 권유한 거라면{" "}
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>상{" "}
        <strong>권고사직</strong>으로 인정되죠.
        명예퇴직금은 회사 재원에서 나오고, 실업급여는 고용보험 기금에서 나오니까 둘 다 받을 수 있는 구조예요.
      </p>
      <p style={body}>
        50세 이상 장기근속자라면 최대 270일, 약 9개월간 수급이 가능하죠.
        퇴직금까지 합치면 세 가지를 한꺼번에 챙길 수 있어요.
        아래에서 내가 해당되는지, 얼마나 받을 수 있는지 바로 확인해 보세요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 — 명예퇴직과 실업급여 자격 */}
      <H2>명예퇴직하면 수급 조건에 해당하나요?</H2>
      <SectionBadge>수급 자격 체크</SectionBadge>

      <p style={body}>
        핵심은 <strong>누가 먼저 퇴직을 제안했느냐</strong>예요.
        회사가 구조조정, 경영 악화, 인력 감축 등의 이유로 퇴직 대상자를 선정하고 &quot;명예퇴직금 줄 테니 나가달라&quot;고 권유했다면, 이건{" "}
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>상 <strong>권고사직</strong>에 해당하죠.
        비자발적 이직이니까 실업급여 수급 자격이 생기는 거예요.
      </p>
      <p style={body}>
        명예퇴직, 희망퇴직, 조기퇴직 — 명칭은 회사마다 달라요.
        이름이 뭐든 실질적으로 회사 주도의 퇴직 권유라면 전부 같은 취급을 받죠.{" "}
        <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 이직확인서를 볼 때도 퇴직 명칭이 아니라 실질적 사유가 판단 기준이에요.
      </p>
      <p style={body}>
        반대 상황도 짚어둬야 해요.
        회사 권유 없이 본인이 먼저 &quot;명예퇴직 신청할게요&quot;라고 했다면 자발적 퇴사로 분류될 수 있죠.
        이 경우엔 실업급여가 어려워져요.
        다만 회사 공고나 권유가 먼저 나온 뒤에 신청한 거라면 문제없고요.
      </p>

      <GreenBox title="명예퇴직 = 실업급여 가능한 경우">
        회사가 구조조정·경영 악화·인력감축으로 퇴직을 권유했고,<br />
        이직확인서에 '권고사직' 또는 '조기퇴직 프로그램'으로 기재된 경우<br />
        → 비자발적 이직으로 실업급여 수급 자격이 생겨요
      </GreenBox>

      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="명예퇴직 실업급여 수급 조건을 모두 충족해요. 퇴직 후 바로 신청하세요."
        partialMatchText="일부 조건이 맞지 않아요. 해당 항목을 다시 확인해보세요."
      />

      <Divider />

      {/* 섹션 2 — 수급액 계산 */}
      <H2>수급 금액은 얼마나 나올까요?</H2>

      <p style={body}>
        퇴직 전 3개월 평균임금의 <strong>60%</strong>가 기준이에요.
        2026년 기준으로 1일 상한액은 <strong>68,100원</strong>, 하한액은 <strong>66,048원</strong>이죠.
        월로 환산하면 최대 약 204만 원 수준이에요.
        명예퇴직 대상은 보통 장기근속자라서 수급기간이 꽤 길게 나와요.
      </p>
      <p style={body}>
        수급기간은 나이와 고용보험 가입기간에 따라 달라지죠.
        50세 미만이면서 10년 이상 가입했다면 최대 240일이에요.
        50세 이상이라면 최대 270일까지 받을 수 있고요.
        20년 넘게 다닌 50대라면 270일, 약 9개월 동안 실업급여가 나오는 거예요.
      </p>
      <p style={body}>
        여기에 명예퇴직금은 별도로 받는 거죠.
        회사가 퇴직 유도 대가로 자체 재원에서 지급하는 위로금이라, 고용보험 기금에서 나오는 실업급여와는 재원 자체가 달라요.
        법정 퇴직금까지 합치면 세 가지를 전부 챙길 수 있으니 하나도 놓치지 마세요.
      </p>

      <Calculator
        title="명예퇴직 실업급여 예상 수급액"
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="실제 수급액은 고용센터 심사에 따라 달라질 수 있어요."
      />

      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 — 이직확인서 */}
      <H2>수급 자격을 가르는 이직확인서 기재 내용</H2>
      <SectionBadge>퇴직 전 체크리스트</SectionBadge>

      <p style={body}>
        수급 여부를 가르는 가장 중요한 서류가 <strong>이직확인서</strong>예요.
        회사가 고용센터에 제출하는 이 서류에 퇴직 사유가 어떻게 적혀 있느냐가 갈림길이죠.
        &lsquo;권고사직&rsquo;, &lsquo;경영상 필요에 의한 퇴직&rsquo;, &lsquo;조기퇴직 프로그램&rsquo; 중 하나로 기재돼야 해요.
      </p>
      <p style={body}>
        문제는 일부 회사에서 명예퇴직인데도 이직확인서에 &lsquo;자진퇴사&rsquo;로 적는 경우가 있다는 점이에요.
        고용센터에서는 서류에 적힌 대로 분류하니까, 자발적 이직으로 처리되면 실업급여가 막히죠.
        퇴직 전에 반드시 인사팀에 &quot;이직확인서 기재 사유&quot;를 확인하세요.
      </p>
      <p style={body}>
        이미 잘못 기재됐다면 고용센터(1350)에 이의를 제기할 수 있어요.
        명예퇴직 권유 공문, 사내 공지, 이메일 등을 증거로 제출하면 정정이 되죠.
        이런 증빙자료는 퇴직 전에 미리 확보해두는 게 훨씬 안전해요.
      </p>

      <BorderBox title="이직확인서 퇴직 사유별 실업급여 가능 여부">
        권고사직 → 가능<br />
        경영상 필요에 의한 퇴직 → 가능<br />
        조기퇴직 프로그램 → 가능<br />
        자진퇴사 / 본인 사유 → 불가 (정정 요청 필요)
      </BorderBox>

      <Checklist items={CHECKLIST} />

      <Divider />

      {/* 섹션 4 — 명예퇴직금과 실업급여 관계 */}
      <H2>명예퇴직금과 수급 금액은 별개 재원이에요</H2>

      <p style={body}>
        &quot;명예퇴직금을 받았는데 실업급여도 받으면 이중 수급 아닌가요?&quot;
        가장 많이 나오는 질문이에요. 답은 &quot;아니오&quot;죠.
        명예퇴직금은 회사가 퇴직 유도 대가로 자체 재원에서 지급하는 위로금이에요.
      </p>
      <p style={body}>
        실업급여는 <strong>고용보험 기금</strong>에서 나오죠.
        근로자가 재직 중에 낸 고용보험료가 재원이라, 회사가 별도로 준 명예퇴직금과는 재원 자체가 달라요.
        법정 퇴직금 + 명예퇴직금(위로금) + 실업급여, 이 세 가지를 모두 받을 수 있는 거예요.
      </p>
      <p style={body}>
        법정 퇴직금은 1년 이상 근무하면 발생하죠.
        명예퇴직 대상자는 대부분 장기 근속자이니까 퇴직금 규모도 상당해요.
        세 가지를 합치면 퇴직 후 경제적 공백을 메꾸는 데 큰 힘이 돼요.
        참고로 퇴직금 지급기한은 퇴직일로부터 <strong>14일</strong>이고, 미지급 시 지연이자는 <strong>연 20%</strong>예요.
      </p>

      <GreenBox title="명예퇴직 시 받을 수 있는 돈 3가지">
        법정 퇴직금 — 1년 이상 근무 시 발생 (근로기준법)<br />
        명예퇴직금(위로금) — 회사 자체 재원에서 지급<br />
        실업급여 — 고용보험 기금에서 지급 (별도 신청 필요)
      </GreenBox>

      <Divider />

      {/* 섹션 5 — 신청 절차 */}
      <H2>퇴직 후 수급 조건 충족하면 바로 신청하세요</H2>

      <p style={body}>
        첫 단계는{" "}
        <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 이직확인서 처리 상태를 보는 거예요.
        회사가 제출했는지, 퇴직 사유가 &lsquo;권고사직&rsquo;으로 기재돼 있는지 먼저 확인하세요.
        미제출이거나 사유가 잘못돼 있으면 인사팀에 연락해서 정정을 요청해야 하죠.
      </p>
      <p style={body}>
        이직확인서가 정상이면 <strong>워크넷</strong>에 구직등록을 하고, 수급자격 신청자 온라인 교육을 이수하세요.
        그 다음 관할 고용센터에 방문하거나 고용24에서 온라인으로 수급자격 인정 신청을 넣으면 돼요.
        담당자가 퇴직 사유를 심사한 뒤 수급자격을 인정해주죠.
      </p>
      <p style={body}>
        인정을 받은 뒤에는 1~4주마다 실업인정일에 구직활동 내역을 보고해야 해요.
        구직활동이 인정되면 실업급여가 통장으로 들어오죠.
        명예퇴직처럼 퇴직 사유가 명확한 경우는 심사가 빨리 끝나는 편이에요.
        다만 퇴직일로부터 <strong>12개월 이내</strong>에 반드시 신청해야 하니까, 미루지 말고 바로 움직이세요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        명예퇴직과 실업급여에 대해 실제로 많이 물어보는 내용만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법을 바탕으로 작성됐어요. 개별 사유의 인정 여부는 고용센터 심사에 따라 다르니, 사전 상담(1350)을 받아보세요." />
    </ArticleLayout>
  );
}
