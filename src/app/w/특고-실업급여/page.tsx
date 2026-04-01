"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR, 실업급여_HIGHLIGHT } from "@/data/실업급여-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "고용보험 적용 대상 특수고용직(14개 직종)에 해당" },
  { id: "c2", label: "이직일 전 24개월 중 12개월 이상 고용보험료 납부" },
  { id: "c3", label: "비자발적 계약해지 (업체 폐업, 계약 종료, 소득 급감 등)" },
  { id: "c4", label: "적극적인 구직활동 의사가 있음" },
];

const CHECKLIST = [
  "고용보험 가입 여부 확인 (고용24 또는 사업주에게 문의)",
  "이직일 전 24개월 중 12개월 이상 보험료를 납부했는지 확인",
  "비자발적 이직인지 확인 (계약 해지, 업체 폐업, 소득 급감 등)",
  "고용24에서 수급자격 신청자 온라인 교육 이수",
  "계약서, 소득 증빙, 플랫폼 활동 내역서 준비",
];

const FAQS = [
  {
    q: "배달 라이더인데 일감이 갑자기 줄었어요. 실업급여 대상인가요?",
    a: "고용보험에 가입돼 있고, 24개월 중 12개월 이상 보험료를 냈다면 대상이 될 수 있어요. 소득이 전년 대비 30% 이상 줄었으면 비자발적 이직으로 인정받을 수 있죠.",
  },
  {
    q: "고용보험 가입 제외 신청을 했는데 뒤늦게 후회하면요?",
    a: "가입 제외 기간에는 피보험기간이 쌓이지 않아요. 다시 가입할 수는 있지만, 제외 기간은 소급 적용이 안 되죠. 월 보험료가 크지 않으니까 가입 유지가 훨씬 유리해요.",
  },
  {
    q: "보험료를 사업주가 안 내주면 어떻게 하나요?",
    a: "근로복지공단에 신고하면 돼요. 사업주는 고용보험료의 절반을 부담할 의무가 있죠. 미납 시 사업주에게 과태료가 부과돼요.",
  },
  {
    q: "특고와 예술인 실업급여는 뭐가 다른가요?",
    a: "수급 조건 구조는 비슷한데 적용 대상이 달라요. 예술인은 문화예술용역 계약을 체결한 분이고, 특고는 배달·운전·교육 등 14개 직종에 해당하는 분이에요. 피보험기간 기준도 조금 달라요.",
  },
  {
    q: "플랫폼 2개에서 동시에 일했는데, 보험기간은 합산되나요?",
    a: "합산돼요. 여러 플랫폼에서 동시에 고용보험에 가입돼 있었다면, 중복 기간이 아닌 한 합산해서 피보험기간을 계산하죠. 고용24에서 본인의 피보험기간을 확인할 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법 제77조의6: 특수형태근로종사자 실업급여", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용보험법 시행령: 특고 적용 직종 범위", url: "https://www.law.go.kr/법령/고용보험법시행령" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24: 특고·플랫폼 종사자 실업급여 신청", url: "https://www.ei.go.kr" },
      { label: "고용노동부: 특수형태근로종사자 고용보험 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "프리랜서-실업급여",
    title: "프리랜서 실업급여 받을 수 있을까",
    description: "프리랜서도 고용보험 가입 대상이면 실업급여 수급이 가능해요.",
  },
  {
    slug: "예술인-실업급여",
    title: "예술인 실업급여 수급 조건",
    description: "문화예술용역 계약을 맺고 일하는 예술인도 고용보험으로 실업급여를 받을 수 있죠.",
  },
  {
    slug: "자영업자-실업급여",
    title: "자영업자 실업급여 조건과 금액",
    description: "자영업자도 고용보험에 임의 가입하면 폐업 시 실업급여를 받을 수 있어요.",
  },
];

// ─── 계산기 설정 ──────────────────────────────────────

const CALC_SLIDERS = [
  {
    id: "grade",
    label: "월 평균 보수 (만원)",
    min: 100,
    max: 500,
    step: 10,
    defaultValue: 200,
    format: (v: number) => `${v}만원`,
  },
  {
    id: "months",
    label: "고용보험 가입기간 (개월)",
    min: 12,
    max: 144,
    step: 1,
    defaultValue: 24,
    format: (v: number) => `${v}개월`,
  },
];

const CALC_RESULTS = [
  {
    label: "기초일액",
    getValue: (inputs: Record<string, number>) => {
      const annual = inputs.grade * 10000 * 12;
      return Math.round(annual / 365);
    },
    format: (v: number) => `${v.toLocaleString()}원`,
  },
  {
    label: "1일 구직급여 (60%)",
    getValue: (inputs: Record<string, number>) => {
      const annual = inputs.grade * 10000 * 12;
      const daily = Math.round(annual / 365);
      const benefit = Math.round(daily * 0.6);
      return Math.min(Math.max(benefit, 26600), 68100);
    },
    format: (v: number) => `${v.toLocaleString()}원`,
    highlight: true,
  },
  {
    label: "수급기간",
    getValue: (inputs: Record<string, number>) => {
      const m = inputs.months;
      if (m < 12) return 120;
      if (m < 36) return 120;
      if (m < 60) return 150;
      if (m < 120) return 180;
      return 210;
    },
    format: (v: number) => `${v}일`,
  },
  {
    label: "예상 총 수급액",
    getValue: (inputs: Record<string, number>) => {
      const annual = inputs.grade * 10000 * 12;
      const daily = Math.round(annual / 365);
      const benefit = Math.min(Math.max(Math.round(daily * 0.6), 26600), 68100);
      const m = inputs.months;
      let days = 120;
      if (m >= 120) days = 210;
      else if (m >= 60) days = 180;
      else if (m >= 36) days = 150;
      else days = 120;
      return benefit * days;
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
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
          currentSlug="특고-실업급여"
        />
      }
    >
      {/* breadcrumb */}
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 특수형태근로종사자</p>

      {/* h1: 2줄 */}
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        특고 실업급여, 배달·대리기사도 될까?<br />
        14개 직종 수급 기준
      </h1>

      {/* intro */}
      <p style={{ ...body, fontSize: 16, lineHeight: 2.1 }}>
        &quot;배달 일 1년 했는데 갑자기 일이 끊겼어요. 직원도 아닌데 실업급여가 되나요?&quot;
      </p>
      <p style={body}>
        된다고요. 2021년 7월부터 <strong>특수형태근로종사자(특고)</strong>도 고용보험 의무가입 대상이에요.{" "}
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 제77조의6</a>가
        배달기사, 대리운전, 학습지교사 등 <strong>14개 직종</strong>을 적용 대상으로 정해뒀죠.
        고용보험 가입 후 <strong>12개월 이상</strong> 보험료를 납부했다면, 일반 근로자와 똑같이 실업급여를 신청할 수 있죠.
      </p>
      <p style={body}>
        문제는 본인이 특고인지도 모르는 분이 많다는 거예요.
        플랫폼에서 일하면서 고용보험이 자동으로 빠져나가고 있었는데, 확인조차 안 해본 경우가 대부분이죠.
        지금부터 내 직종이 해당되는지, 얼마를 받을 수 있는지 하나씩 짚어볼게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* ── 섹션 1: 특고란 + 대상 직종 ── */}
      <H2>14개 직종에 내 일이 포함되나요?</H2>
      <p style={body}>
        <strong>특수형태근로종사자(특고)</strong>는 회사에 고용된 직원은 아니지만, 특정 업체에 소속되어 계속 일하는 분들이에요.
        근로자와 자영업자 사이 어딘가에 놓인 형태라고 보면 쉽죠.
        법적으로는 근로자가 아닌데, 실제로는 업체의 지시를 받고 일하는 구조예요.
      </p>
      <p style={body}>
        고용보험법에서 이런 분들을 따로 정의해서 보호 대상에 넣었어요.
        2024년 기준 적용 대상은 <strong>14개 직종</strong>이죠.
        배달 라이더, 퀵서비스기사 같은 배달 직종부터 대리운전·택배기사·화물차주 같은 운전 직종이 대표적이에요.
        학습지교사, 방문판매원, 가사서비스 종사자, 플랫폼 노동자까지 폭넓게 포함되죠.
      </p>
      <p style={body}>
        보험설계사, 카드모집인, 골프장캐디도 빠지지 않아요.
        적용 직종은 계속 확대되는 추세라서, 본인 직종이 해당되는지{" "}
        <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 반드시 조회해보세요.
        목록에 없더라도 2025년 이후 추가된 직종이 있을 수 있으니까요.
      </p>

      <GreenBox>
        <p style={{ margin: "0 0 4px" }}>배달: 배달 라이더, 퀵서비스기사</p>
        <p style={{ margin: "0 0 4px" }}>운전: 대리운전, 택배기사, 화물차주</p>
        <p style={{ margin: "0 0 4px" }}>교육: 학습지교사, 방문판매원</p>
        <p style={{ margin: "0 0 4px" }}>돌봄: 가사서비스 종사자</p>
        <p style={{ margin: "0 0 4px" }}>플랫폼: 플랫폼 노동자</p>
        <p style={{ margin: 0 }}>기타: 보험설계사, 카드모집인, 골프장캐디 등</p>
      </GreenBox>

      <SectionBadge>내 수급 자격을 확인해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="모든 조건에 해당되네요. 특고 실업급여 수급 자격이 있을 가능성이 높아요. 고용24에서 온라인 교육을 이수한 뒤 신청하세요."
        partialMatchText="일부 조건만 충족된 상태예요. 피보험기간 12개월이 핵심이니까, 고용센터(1350)에 상담부터 받아보세요."
      />

      <Divider />

      {/* ── 섹션 2: 수급자격 조건 + 계산기 ── */}
      <H2>수급 기준을 갖추려면 뭐가 필요하나요?</H2>
      <p style={body}>
        특고 실업급여 수급 조건은 일반 근로자와 좀 달라요.
        첫 번째 조건은 <strong>피보험기간</strong>이에요.
        이직일 전 24개월 중 <strong>12개월 이상</strong> 보험료를 납부해야 하죠.
        일반 근로자는 18개월 중 180일이 기준인데, 특고는 기준 자체가 다르니까 헷갈리지 마세요.
      </p>
      <p style={body}>
        두 번째는 <strong>비자발적 이직</strong>이에요.
        계약 해지, 업체 폐업 같은 본인 의사와 무관한 사유로 일을 그만둬야 하죠.
        그런데 내가 먼저 그만둔 경우에도 인정되는 예외가 있죠.
        최근 3개월 소득이 전년 대비 30% 이상 줄었거나, 계약과 전혀 다른 업무를 지시받았거나, 업무 때문에 건강 문제가 생긴 경우가 그래요.
      </p>
      <p style={body}>
        세 번째는 <strong>재취업 의사</strong>예요.
        새 일을 찾겠다는 적극적인 의지가 있어야 하죠.
        이 세 가지를 모두 갖춰야 수급자격이 생겨요.
        아래 계산기에서 본인의 예상 수급액과 수급기간을 직접 계산해보세요.
      </p>

      <BorderBox>
        <p style={{ margin: "0 0 4px", lineHeight: 1.9 }}>특고: 이직일 전 24개월 중 <strong>12개월 이상</strong> 보험료 납부</p>
        <p style={{ margin: "0 0 4px", lineHeight: 1.9 }}>일반 근로자: 이직일 전 18개월 중 <strong>180일 이상</strong> 피보험 단위기간</p>
        <p style={{ margin: 0, lineHeight: 1.9 }}>공통: 비자발적 이직 + 재취업 의사 필요</p>
      </BorderBox>

      <Calculator
        title="특고 실업급여 예상 수급액 계산기"
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="기초일액 = 연간보수 / 365일. 1일 구직급여 = 기초일액 x 60% (상한 68,100원, 하한 26,600원). 수급기간은 가입기간 기준: 1~3년 120일, 3~5년 150일, 5~10년 180일, 10년+ 210일."
      />

      {/* ── 관련 글 + 광고 ── */}
      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* ── 섹션 3: 보험료와 가입 제외 ── */}
      <H2>14개 직종의 보험료와 가입 기준</H2>

      <SectionBadge>가입 유지가 유리한 이유</SectionBadge>

      <p style={body}>
        특고 고용보험료는 <strong>보수의 1.6%</strong>예요.
        본인과 사업주가 반반씩 0.8%를 부담하죠.
        월 소득 200만원 기준이면 보험료 총액이 32,000원, 내 주머니에서 나가는 건 <strong>16,000원</strong>이에요.
        커피 세 잔 값이죠.
      </p>
      <p style={body}>
        원칙은 <strong>의무가입</strong>이에요.
        그런데 일부 직종에서는 본인이 원하면 <strong>가입 제외 신청</strong>을 할 수 있죠.
        소득이 적어서 보험료가 아깝다고 느끼는 분들이 신청하곤 해요.
        솔직히 말하면, 이 선택은 거의 항상 손해예요.
      </p>
      <p style={body}>
        제외하면 실업급여를 못 받죠. <a href="/w/실업급여-부정수급" style={{ color: "#1D9E75", textDecoration: "underline" }}>부정수급</a> 추징도 무섭지만, 애초에 수급자격 자체가 없어지는 게 더 큰 손해예요.
        제외 기간은 피보험기간에도 포함되지 않아요.
        나중에 다시 가입해도 제외했던 기간을 소급 적용해주지 않고요.
        한 달 16,000원으로 실업 시 수백만 원을 받을 수 있다고 생각하면, 가입 유지가 압도적으로 이득이에요.
      </p>

      <Checklist items={CHECKLIST} />

      <Divider />

      {/* ── 섹션 4: 신청 방법 ── */}
      <H2>수급 신청 절차와 필요 서류</H2>
      <p style={body}>
        가장 먼저 할 일은{" "}
        <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 수급자격 신청자 온라인 교육을 듣는 거예요.
        약 1시간 정도 걸리죠.
        이 교육을 마쳐야 고용센터에 방문하거나 온라인으로 수급자격을 신청할 수 있죠.
        교육 없이는 신청 자체가 안 되니까 순서를 꼭 지키세요.
      </p>
      <p style={body}>
        신청할 때 준비 서류가 필요해요.
        계약서와 소득 증빙이 기본이고, 플랫폼 종사자라면 플랫폼에서 발급하는 <strong>활동 내역서</strong>까지 챙겨야 하죠.
        배달의민족, 쿠팡이츠, 카카오T 같은 주요 플랫폼 앱 안에서 발급받을 수 있죠.
        사업주(플랫폼 업체)가 피보험자격 상실 신고를 먼저 해주면 절차가 훨씬 수월해지고요.
      </p>
      <p style={body}>
        수급자격이 인정되면 그때부터 <strong>실업인정</strong>을 받으면서 구직급여를 수령하게 돼요.
        실업인정은 1~4주 단위로 진행되는데, 고용센터를 직접 방문하거나 온라인으로 처리할 수 있죠.
        입사지원, 면접, 직업훈련 같은 적극적인 <a href="/w/실업급여-구직활동-횟수" style={{ color: "#1D9E75", textDecoration: "underline" }}>구직활동</a>을 증명해야 계속 급여가 나와요.
        신청부터 첫 입금까지는 대략 3~4주 걸린다고 보면 돼요.
      </p>

      <GreenBox>
        <p style={{ margin: "0 0 4px" }}>1단계: 고용24에서 온라인 교육 이수 (약 1시간)</p>
        <p style={{ margin: "0 0 4px" }}>2단계: 고용센터 방문 또는 온라인 수급자격 신청</p>
        <p style={{ margin: "0 0 4px" }}>3단계: 계약서·소득 증빙·활동 내역서 제출</p>
        <p style={{ margin: 0 }}>4단계: 수급자격 인정 후 실업인정 + 구직급여 수령</p>
      </GreenBox>

      <Divider />

      {/* ── 섹션 5: 수급기간과 금액 정리 ── */}
      <H2>수급기간 확인하고 기준에 맞춰 준비하세요</H2>
      <p style={body}>
        수급기간은 고용보험 가입기간(피보험기간)에 따라 결정돼요.
        <strong>1년 이상~3년 미만</strong>이면 120일, <strong>3년 이상~5년 미만</strong>이면 150일이죠.
        5년 이상~10년 미만은 180일, 10년 이상이면 최대 <strong>210일</strong>까지 받을 수 있죠.
        기간이 길수록 안전망이 두꺼워지는 구조예요.
      </p>
      <p style={body}>
        일반 근로자와 다른 점이 하나 있죠.
        일반 근로자는 나이에 따라 수급일수가 추가로 늘어나는데, 특고는 <strong>가입기간만으로</strong> 결정돼요.
        50세 이상이라고 해서 수급일수가 더 늘어나지 않아요.
        이 구조 때문에 가입기간을 얼마나 채웠느냐가 결정적인 차이를 만들죠.
      </p>
      <p style={body}>
        금액으로 따져보면, 월 200만 원 소득에 가입기간 2년이면 1일 약 39,452원씩 120일간 총 약 <strong>473만 원</strong>이에요.
        월 300만 원 소득에 가입기간 5년이면 1일 약 59,178원씩 180일간 총 약 <strong>1,065만 원</strong>이죠.
        매달 16,000원 내던 보험료가 수백만 원으로 돌아오는 거예요. 가입 유지가 왜 중요한지 숫자가 말해주고 있죠.
      </p>

      <Divider />

      {/* ── FAQ 5개 ── */}
      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        특고 실업급여에 대해 실제로 많이 물어보는 내용만 모았어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법을 바탕으로 작성됐어요. 직종별 적용 여부와 수급 조건은 변경될 수 있으니, 고용센터(1350) 또는 고용24에서 최신 정보를 확인하세요." />
    </ArticleLayout>
  );
}
