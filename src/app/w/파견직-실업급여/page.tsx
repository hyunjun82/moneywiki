"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body, Calculator,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR } from "@/data/실업급여-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "파견회사(파견사업주)에서 고용보험에 가입돼 있어요" },
  { id: "c2", label: "파견계약 만료 또는 비자발적 퇴직이에요" },
  { id: "c3", label: "퇴직 전 18개월 내 피보험단위기간 180일 이상이에요" },
  { id: "c4", label: "재취업 의사가 있고 구직활동을 할 수 있어요" },
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
    label: "예상 총 수령액",
    getValue: (v: Record<string, number>) => getDaily(v.salary) * getDays(v.age, v.years),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
];

const CHECKLIST = [
  "파견회사(파견사업주)에 이직확인서 발급 요청",
  "고용24에서 이직확인서 처리 여부 확인",
  "수급자격 신청자 온라인 교육 이수 (약 1시간)",
  "관할 고용센터 방문 또는 온라인 신청",
  "4주마다 실업인정 출석 (구직활동 증빙 필수)",
];

const FAQS = [
  {
    q: "파견계약 만료되면 바로 실업급여 신청할 수 있나요?",
    a: "파견회사가 이직확인서를 보내야 신청이 가능해요. 만료 즉시 파견회사 인사팀에 이직확인서 발급을 요청하세요. 보통 퇴직 후 10일 이내에 처리되죠.",
  },
  {
    q: "파견회사가 연락이 안 돼요. 어떻게 하나요?",
    a: "근로복지공단(1588-0075)에 직접 피보험자격 상실 확인을 신청할 수 있어요. 근로계약서, 급여명세서, 통장 입금내역 등 재직 증빙을 준비하세요.",
  },
  {
    q: "같은 파견회사에서 다른 사업체로 옮기면 퇴직인가요?",
    a: "퇴직이 아니에요. 파견회사가 동일하면 A사업체에서 B사업체로 옮겨도 고용보험이 끊기지 않죠. 계속 근무로 처리돼요.",
  },
  {
    q: "사용사업체에서 파견을 안 받겠다고 했는데 실업급여 되나요?",
    a: "파견회사와 근로관계가 끝나야 퇴직이에요. 사용사업체가 파견을 종료해도 파견회사가 다른 곳에 배치할 수 있죠. 배치 없이 근로관계가 종료되면 그때 신청이 가능해요.",
  },
  {
    q: "여러 파견회사에서 일한 기간을 합산할 수 있나요?",
    a: "가능해요. A파견회사 3개월, B파견회사 4개월 일했다면 합산해서 7개월로 180일 요건을 충족하죠. 다만 중간에 실업급여를 이미 받은 기간은 제외돼요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법 — 실업급여 수급자격 요건", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "파견근로자보호법 — 파견근로 관계 정의", url: "https://www.law.go.kr/법령/파견근로자보호등에관한법률" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24 — 실업급여 인터넷 신청", url: "https://www.ei.go.kr" },
      { label: "고용노동부 — 파견근로자 권익보호", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "기간제-실업급여",
    title: "기간제 근로자 실업급여 조건",
    description: "기간제 계약이 끝나면 비자발적 퇴사로 인정돼요.",
  },
  {
    slug: "계약만료-실업급여",
    title: "계약만료 실업급여 신청방법",
    description: "계약 만료로 퇴직하면 실업급여 대상이에요.",
  },
  {
    slug: "실업급여-피보험단위기간",
    title: "실업급여 피보험단위기간 계산",
    description: "180일 요건을 충족하는지 확인하는 방법이에요.",
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
          currentSlug="파견직-실업급여"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 파견근로</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        파견직 계약 끝나면 실업급여?<br />
        수급 조건과 신청 절차
      </h1>

      <p style={{ ...body, fontSize: 16, lineHeight: 2.1 }}>
        &quot;파견이라 실업급여가 안 될 줄 알았어요.&quot;
      </p>
      <p style={body}>
        파견직도 받을 수 있죠.{" "}
        <a href="https://www.law.go.kr/법령/파견근로자보호등에관한법률" style={{ color: "#1D9E75", textDecoration: "underline" }}>파견근로자보호법</a>에 따라
        파견회사(파견사업주)가 4대보험을 가입하고, 파견계약 만료로 퇴직하면 비자발적 퇴사로 인정되죠.{" "}
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a> 기준으로
        퇴직 전 18개월 내 피보험단위기간 <strong>180일 이상</strong>이면 실업급여 대상이에요.
      </p>
      <p style={body}>
        다만 파견직은 &quot;누가 내 사업주인지&quot;부터 헷갈리는 경우가 많아요.
        이직확인서를 어디에 요청해야 하는지, 사용사업체가 바뀌면 어떻게 되는지 — 이런 부분을 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 — 파견직 고용 구조 + 자격 체크 */}
      <H2>수급 조건을 알려면 파견 구조부터 알아야 하나요?</H2>
      <SectionBadge>핵심 개념</SectionBadge>
      <p style={body}>
        파견직은 고용 관계가 일반 직장과 좀 달라요.
        나를 고용한 곳은 <strong>파견회사(파견사업주)</strong>이고, 실제로 출근해서 지시를 받는 곳은 <strong>사용사업체</strong>예요.
        월급도 파견회사에서 나오고, 4대보험도 파견회사 이름으로 가입돼 있죠.
        그래서 퇴직할 때 이직확인서를 요청할 곳도 파견회사예요.
      </p>
      <p style={body}>
        이 구조를 모르면 퇴직 시 혼란이 생겨요.
        &quot;실제로 출근한 공장이 내 회사 아닌가요?&quot; 하고 사용사업체에 연락하는 분이 많죠.
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>상 사업주는 파견회사예요.
        고용보험 상실 신고, 이직확인서 발급, 퇴직금 정산 — 전부 파견회사가 처리하는 거예요.
      </p>
      <p style={body}>
        파견회사가 동일하면 사용사업체가 바뀌어도 고용보험이 끊기지 않아요.
        A공장에서 B공장으로 배치가 바뀌어도 파견회사가 같으면 계속 근무로 처리되죠.
        피보험기간이 이어진다는 뜻이에요. 이 점을 알아두면 수급 조건을 판단할 때 유리해요.
      </p>

      <GreenBox title="나의 수급자격을 체크해보세요">
        <p style={{ margin: 0 }}>아래 4가지 항목을 모두 충족하면 파견직 실업급여 대상이에요.</p>
      </GreenBox>
      <EligibilityChecker items={CHECK_ITEMS} />

      <Divider />

      {/* 섹션 2 — 수급 조건 + 계산기 */}
      <H2>신청 절차에 필요한 조건은 무엇인가요?</H2>
      <p style={body}>
        조건 자체는 일반 근로자와 같아요.{" "}
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a> 기준으로
        퇴직 전 18개월 내에 <strong>피보험단위기간 180일 이상</strong>이면 돼요.
        파견 기간이 6개월을 넘겼다면 대부분 충족하죠.
        여러 파견회사에서 일한 경력도 합산할 수 있고요.
      </p>
      <p style={body}>
        파견계약 만료는 <strong>비자발적 퇴사</strong>로 인정돼요.
        내가 나가고 싶어서 그만둔 게 아니라 계약이 끝난 거니까요.
        다만 주의할 점이 하나 있죠.
        파견회사가 계약 연장을 제안했는데 본인이 거부했다면 자발적 퇴사로 볼 수 있죠.
        연장 제안의 근로조건이 기존과 현저히 달랐다면 예외를 주장할 수 있지만, 입증 부담은 본인에게 있죠.
      </p>
      <p style={body}>
        A파견회사에서 3개월, B파견회사에서 4개월 일한 경우 합산해서 7개월로 180일을 넘기죠.
        다만 중간에 실업급여를 이미 받은 기간은 제외되죠.
        <a href="/w/실업급여-피보험단위기간" style={{ color: "#1D9E75", textDecoration: "underline" }}>피보험단위기간</a> 합산이 헷갈리면{" "}
        <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서
        피보험 이력을 조회하면 한눈에 볼 수 있죠.
      </p>

      <BorderBox title="파견직 실업급여 3가지 핵심 조건">
        <p style={{ margin: "0 0 6px", lineHeight: 1.9 }}>
          <strong>180일</strong> 퇴직 전 18개월 내 고용보험 가입기간 180일 이상
        </p>
        <p style={{ margin: "0 0 6px", lineHeight: 1.9 }}>
          <strong>비자발적</strong> 파견계약 만료, 권고사직 등 비자발적 퇴사
        </p>
        <p style={{ margin: 0, lineHeight: 1.9 }}>
          <strong>구직활동</strong> 재취업 의사가 있고 적극적으로 구직할 것
        </p>
      </BorderBox>

      <Calculator
        title="파견직 실업급여 예상 수급액 계산기"
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 2026년 기준 1일 하한액 66,048원, 상한액 68,100원 적용. 실제 금액은 고용센터 심사 후 확정돼요."
      />

      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 — 신청 절차 + 체크리스트 */}
      <H2>파견직 신청 절차와 이직확인서</H2>
      <SectionBadge>신청 가이드</SectionBadge>
      <p style={body}>
        파견계약이 끝나면 가장 먼저 할 일은 <strong>파견회사 인사팀에 이직확인서 발급을 요청</strong>하는 거예요.
        사용사업체가 아니라 파견회사에 요청해야 해요. 이걸 헷갈리면 시간만 낭비되죠.
        파견회사가 고용센터에 이직확인서를 전송해야 신청 절차가 시작돼요.
        보통 퇴직 후 10일 이내에 처리되죠.
      </p>
      <p style={body}>
        이직확인서가 처리됐는지{" "}
        <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 확인한 뒤,
        수급자격 신청자 온라인 교육(약 1시간)을 이수하세요.
        교육을 마치면 관할 고용센터에 방문하거나 온라인으로 수급자격을 신청하면 돼요.
        심사가 끝나면 4주마다 실업인정을 받으면서 급여가 지급되죠.
      </p>
      <p style={body}>
        가장 난감한 상황은 파견회사가 폐업하거나 연락이 안 될 때예요.
        이 경우에는 <strong>근로복지공단(1588-0075)</strong>에 직접 피보험자격 상실 확인을 신청할 수 있죠.
        근로계약서, 급여명세서, 통장 입금내역 등 파견회사에서 일한 증빙을 평소에 챙겨두면 이런 상황에서 큰 도움이 되죠.
      </p>

      <Checklist items={CHECKLIST} />

      <Divider />

      {/* 섹션 4 — 복잡한 상황 */}
      <H2>사용사업체 종료 시 수급 조건 변화</H2>
      <p style={body}>
        &quot;출근하던 공장에서 파견을 안 받겠다고 했어요. 퇴직인가요?&quot;
        바로 퇴직은 아니에요.
        파견회사와 근로계약이 살아있는 한, 파견회사가 다른 사용사업체에 배치를 해줄 수 있죠.
        사용사업체가 파견을 종료하는 것과 내 근로관계가 끝나는 것은 별개의 문제예요.
      </p>
      <p style={body}>
        진짜 문제는 파견회사가 새 배치를 해주지 않을 때예요.
        &quot;대기 발령&quot; 상태로 두면서 급여도 안 주고, 새 일감도 안 준다면 사실상 퇴직이나 마찬가지죠.
        이런 상황이 되면 파견회사 인사팀에 서면으로 확인을 요청하세요.
        &quot;근로관계가 종료된 건지, 대기 상태인 건지&quot;를 명확히 해야 이후 절차가 진행돼요.
      </p>
      <p style={body}>
        근로관계가 공식 종료되면 이직확인서를 발급받고 실업급여를 신청하면 돼요.
        대기 상태에서 급여를 못 받는 기간이 한 달 이상 길어지면,{" "}
        <a href="https://www.moel.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부</a>(1350)에 상담해서 처리 방향을 잡으세요.
        <a href="/w/임금체불-실업급여" style={{ color: "#1D9E75", textDecoration: "underline" }}>임금체불</a>에 해당할 수 있으니 체불 진정도 함께 검토하는 게 좋아요.
      </p>

      <BorderBox title="파견회사가 바뀌는 3가지 경우">
        <p style={{ margin: "0 0 6px", lineHeight: 1.9 }}>
          <strong>사업체만 이동</strong> 같은 파견회사 내에서 A→B공장 배치 변경 → 계속 근무 (가입기간 유지)
        </p>
        <p style={{ margin: "0 0 6px", lineHeight: 1.9 }}>
          <strong>파견회사 변경</strong> 이전 파견회사 퇴직 + 새 파견회사 입사 → 별개의 근로관계
        </p>
        <p style={{ margin: 0, lineHeight: 1.9 }}>
          <strong>가입기간 합산</strong> 이전 파견회사에서 실업급여를 안 받았다면 가입기간 합산 가능
        </p>
      </BorderBox>

      <Divider />

      {/* 섹션 5 — 수급기간과 금액 */}
      <H2>수급 조건별 기간과 금액을 정리하세요</H2>
      <p style={body}>
        수급기간은 고용보험 가입기간과 나이로 결정돼요.
        <strong>120일에서 최대 270일</strong>까지 받을 수 있죠.
        여러 파견회사에서 일한 기간이 합산되니까, 본인이 생각하는 것보다 가입기간이 길 수 있죠.
        고용24에서 전체 이력을 먼저 조회해보세요.
      </p>
      <p style={body}>
        금액은 퇴직 전 3개월 평균임금의 60%로 계산돼요.
        2026년 기준 하한액 1일 66,048원, 상한액 68,100원이죠.
        파견직 급여가 상대적으로 낮은 편이라 하한액에 해당하는 경우가 많아요.
        하한액이라도 월 약 198만원 수준이니까, 구직활동 기간 동안 생활비로 쓰기에 적지 않은 금액이에요.
      </p>
      <p style={body}>
        수급 중에는 4주에 한 번 실업인정일에 구직활동을 보고해야 해요.
        고용센터에 직접 방문하거나 온라인으로 처리할 수 있죠.
        <a href="/w/실업급여-구직활동-횟수" style={{ color: "#1D9E75", textDecoration: "underline" }}>실업인정</a>을 빠뜨리면 해당 기간 급여가 지급되지 않으니까, 달력에 실업인정일을 미리 표시해두는 게 좋아요.
      </p>

      <GreenBox title="수급기간 — 가입기간별 정리">
        <p style={{ margin: "0 0 4px" }}>1년 미만 → 120일</p>
        <p style={{ margin: "0 0 4px" }}>1~3년 → 150일 (50세 이상 180일)</p>
        <p style={{ margin: "0 0 4px" }}>3~5년 → 180일 (50세 이상 210일)</p>
        <p style={{ margin: "0 0 4px" }}>5~10년 → 210일 (50세 이상 240일)</p>
        <p style={{ margin: 0 }}>10년 이상 → 240일 (50세 이상 270일)</p>
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        파견직 실업급여에 대해 실제로 많이 궁금해하는 내용이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법과 파견근로자보호법을 바탕으로 작성됐어요. 개별 수급자격은 고용센터 심사에 따라 다르니, 사전 상담(1350)을 받아보세요." />
    </ArticleLayout>
  );
}
