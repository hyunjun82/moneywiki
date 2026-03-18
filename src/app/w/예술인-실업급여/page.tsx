"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR } from "@/data/실업급여-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "예술활동증명을 보유하고 있어요 (또는 신청 가능)" },
  { id: "c2", label: "예술인 고용보험에 9개월 이상 가입돼 있어요" },
  { id: "c3", label: "계약 종료 또는 비자발적으로 일이 끊겼어요" },
  { id: "c4", label: "적극적으로 구직활동을 할 의사가 있어요" },
];

const CHECKLIST = [
  "문화예술용역 계약서 보관 (구두 계약이면 보수 지급 증빙이라도 확보)",
  "이직일 전 24개월 중 9개월 이상 보험료 납부 여부 확인",
  "계약 만료 또는 해지 사유가 비자발적인지 확인",
  "고용24에서 수급자격 신청자 온라인 교육 이수",
  "고용센터 방문 시 계약서, 보수 지급 증빙 지참",
];

/** 예술인 기준보수등급 월액 (원): 2026년 기준 */
const GRADE_MONTHLY = [
  800_000, 1_000_000, 1_200_000, 1_400_000, 1_600_000,
  1_800_000, 2_000_000, 2_400_000, 2_800_000, 3_200_000, 3_600_000,
];

function getArtistPayDays(months: number): number {
  const years = months / 12;
  if (years < 1) return 120;
  if (years < 3) return 120;
  if (years < 5) return 150;
  if (years < 10) return 180;
  return 210;
}

const CALC_SLIDERS = [
  {
    id: "grade",
    label: "기준보수등급",
    min: 1,
    max: 11,
    step: 1,
    defaultValue: 5,
    format: (v: number) => `${v}등급 (월 ${Math.round(GRADE_MONTHLY[v - 1] / 10000)}만원)`,
  },
  {
    id: "months",
    label: "고용보험 가입기간",
    min: 9,
    max: 120,
    step: 3,
    defaultValue: 24,
    format: (v: number) => `${v}개월`,
  },
];

function getArtistDailyPay(grade: number): number {
  const monthly = GRADE_MONTHLY[grade - 1];
  const daily = Math.round(monthly / 30);
  const cap60 = Math.round(daily * 0.6);
  const upper = 66000;
  const lower = 16000;
  return Math.min(Math.max(cap60, lower), upper);
}

const CALC_RESULTS = [
  {
    label: "1일 수급액",
    getValue: (inputs: Record<string, number>) => getArtistDailyPay(inputs.grade),
    format: (v: number) => `${v.toLocaleString()}원`,
  },
  {
    label: "수급기간",
    getValue: (inputs: Record<string, number>) => getArtistPayDays(inputs.months),
    format: (v: number) => `${v}일`,
  },
  {
    label: "예상 총 수급액",
    getValue: (inputs: Record<string, number>) =>
      getArtistDailyPay(inputs.grade) * getArtistPayDays(inputs.months),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
];

const FAQS = [
  {
    q: "예술인인데 계약서 없이 일했으면 실업급여 못 받나요?",
    a: "계약서가 없어도 보수 지급 증빙(통장 내역, 세금계산서 등)으로 계약 사실을 증명할 수 있죠. 사업자가 가입을 안 해줬다면 본인이 직접 피보험자격 취득 신청도 가능해요.",
  },
  {
    q: "보험료를 9개월 못 채웠으면 방법이 없나요?",
    a: "이직일 전 24개월 안에 9개월을 못 채우면 수급자격이 안 돼요. 여러 계약의 피보험기간은 합산이 가능하니까, 과거 계약 이력을 전부 확인해보세요.",
  },
  {
    q: "예술인 실업급여랑 일반 실업급여를 동시에 받을 수 있나요?",
    a: "동시에는 불가능해요. 다만 예술인과 일반 근로자를 병행하는 경우, 각각의 피보험기간이 따로 관리되니까 어느 쪽으로 신청할지 고용센터에서 상담받아보세요.",
  },
  {
    q: "사업자가 고용보험 가입을 안 해주면 어떡하죠?",
    a: "사업자에게 가입 의무가 법으로 정해져 있죠. 가입을 거부하면 근로복지공단이나 예술인복지재단에 신고할 수 있고, 본인이 직접 피보험자격 취득 신청을 하는 방법도 있어요.",
  },
  {
    q: "예술활동증명은 어디서 받나요? 꼭 필요한가요?",
    a: "예술인복지재단(kawf.kr)에서 온라인으로 신청할 수 있어요. 고용보험 가입 자체에 필수는 아니지만, 각종 복지 혜택이나 분쟁 시 예술인 지위를 증명하는 데 큰 도움이 되죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법: 예술인 피보험자격 및 구직급여", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "예술인 복지법: 예술인 정의 및 복지 지원", url: "https://www.law.go.kr/법령/예술인복지법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24: 예술인 실업급여 신청", url: "https://www.ei.go.kr" },
      { label: "예술인복지재단: 고용보험 가입 안내", url: "https://www.kawf.kr" },
      { label: "근로복지공단: 피보험자격 확인", url: "https://www.comwel.or.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "특고-실업급여",
    title: "특수고용직 실업급여 조건과 신청 방법",
    description: "특수고용직도 2021년부터 고용보험에 가입할 수 있게 됐어요.",
  },
  {
    slug: "프리랜서-실업급여",
    title: "프리랜서 실업급여 받을 수 있는 조건",
    description: "프리랜서라도 고용보험 가입 이력이 있으면 실업급여 대상이 될 수 있죠.",
  },
  {
    slug: "자영업자-실업급여",
    title: "자영업자 실업급여 가입 조건과 수급 방법",
    description: "자영업자도 임의가입으로 고용보험에 들어갈 수 있어요.",
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
          currentSlug="예술인-실업급여"
        />
      }
    >
      {/* ── 브레드크럼 ── */}
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 예술인</p>

      {/* ── h1 (2줄) ── */}
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        예술인 실업급여, 얼마 받을까?<br />
        기준보수와 계산 방법
      </h1>

      {/* ── intro ── */}
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &quot;배우인데 작품이 끝났어요. 다음 계약까지 수입이 없는데, 실업급여 받을 수 있나요?&quot;
      </p>
      <p style={body}>
        받을 수 있죠. 2020년 12월부터 <strong>예술인 고용보험</strong>이 시행됐으니까요.
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>이
        배우, 음악인, 작가, 화가 등 문화예술 종사자도 고용보험에 가입할 수 있도록 별도 제도를 만들었어요.
        이직일 전 24개월 중 <strong>9개월</strong> 이상 보험료를 냈다면 대상이 되죠.
      </p>
      <p style={body}>
        일반 근로자와 다른 점은 &quot;기준보수등급&quot;으로 수급액을 계산한다는 거예요.
        등급에 따라 받는 금액이 달라지니까, 내 등급이 몇 등급인지 아는 게 출발점이에요.
        아래에서 등급 기준부터 계산 방법까지 바로 짚어볼게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* ── 섹션 1: 기준보수 등급 ── */}
      <H2>기준보수 등급은 어떻게 정해지나요?</H2>
      <p style={body}>
        예술인 고용보험은 월급이 아니라 <strong>기준보수등급</strong>을 기반으로 보험료와 수급액을 산정해요.
        1등급(월 80만원)부터 11등급(월 360만원)까지 나뉘어 있고, 본인이 받는 보수 수준에 따라 등급이 결정되죠.
        드라마 출연료가 월 160만원이면 5등급, 300만원이면 10등급에 해당해요.
      </p>
      <p style={body}>
        등급을 정하는 기준은 <strong>문화예술용역 계약상 보수</strong>예요.
        일반 근로자는 회사가 자동으로 고용보험에 넣어주지만, 예술인은 프로젝트 단위로 계약하잖아요.
        계약서에 적힌 보수를 기준으로 등급이 매겨지고, 그 등급에 맞춰 보험료를 내는 구조예요.
      </p>
      <p style={body}>
        가입 대상은 문화예술 전반에 걸쳐 폭넓어요.
        배우, 가수, 연주자 같은 공연 분야부터 작가, 화가, 영화 스태프까지 다 포함되죠.
        본인이 가입 대상인지 잘 모르겠다면 <a href="https://www.kawf.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>예술인복지재단</a>에 문의하세요.
        예술활동증명을 받아두면 이후 절차가 한결 수월해져요.
      </p>

      <GreenBox title="기준보수등급 구간 예시">
        1등급: 월 80만원 / 5등급: 월 160만원<br />
        7등급: 월 200만원 / 11등급: 월 360만원<br />
        계약 보수에 따라 자동 산정, 총 11개 등급<br />
        보험료 = 기준보수의 1.6% (본인 0.8% + 사업자 0.8%)
      </GreenBox>

      <SectionBadge>수급자격 체크</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="예술인 실업급여 수급 가능성이 높아요. 고용센터(1350)에 상담받아보세요."
        partialMatchText="충족하지 못한 조건이 있으면 수급이 어려울 수 있어요."
      />

      <Divider />

      {/* ── 섹션 2: 기준보수 기반 수급액 계산 ── */}
      <H2>기준보수로 수급액을 어떻게 계산하나요?</H2>
      <p style={body}>
        계산 공식은 간단해요. <strong>1일 구직급여 = 기초일액 x 60%</strong>예요.
        기초일액은 기준보수등급의 월액을 30일로 나눈 금액이에요.
        예를 들어 5등급(월 160만원)이면 기초일액이 약 53,333원이고, 여기에 60%를 곱하면 1일 수급액은 약 32,000원이 되죠.
      </p>
      <p style={body}>
        상한액과 하한액이 정해져 있죠. 1일 상한액은 <strong>66,000원</strong>, 하한액은 <strong>16,000원</strong>이에요.
        등급이 아무리 높아도 66,000원을 넘길 수 없고, 아무리 낮아도 16,000원은 보장되죠.
        이건 일반 실업급여의 상·하한 구조와 같은 방식이에요.
      </p>
      <p style={body}>
        수급 기간은 가입기간에 따라 달라져요. 1년 미만이면 120일, 3~5년 미만은 150일, 10년 이상이면 최대 <strong>210일</strong>까지 받을 수 있죠.
        아래 계산기에 본인 등급과 가입기간을 넣어보면 예상 총 수급액이 바로 나와요.
      </p>

      <BorderBox title="일반 실업급여와 뭐가 다를까?">
        일반 근로자: 18개월 중 <strong>180일</strong> 이상 가입<br />
        예술인: 24개월 중 <strong>9개월</strong> 이상 가입<br />
        예술인 보험료율: 보수의 <strong>1.6%</strong> (본인 0.8% + 사업자 0.8%)<br />
        최대 수급일수: 일반 270일 / 예술인 210일
      </BorderBox>

      <Calculator
        title="예술인 실업급여 예상 수급액"
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="기준보수등급별 월액 기준으로 계산한 예상 금액이에요. 실제 수급액은 고용센터 심사에 따라 달라질 수 있어요."
      />

      {/* ── 섹션 2 끝 → CategoryButton + RelatedArticles + ArticleAd(mid) ── */}
      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* ── 섹션 3: 가입기간별 수급기간 ── */}
      <H2>가입기간별 수급기간과 계산 방법</H2>
      <p style={body}>
        수급기간은 고용보험에 가입한 기간에 따라 달라져요.
        1년 미만이라도 9개월만 넘으면 120일(약 4개월)을 받을 수 있고, 3~5년 미만은 150일, 5~10년 미만은 180일이에요.
        10년 이상이면 최대 <strong>210일</strong>까지 늘어나죠.
      </p>
      <p style={body}>
        일반 근로자 실업급여의 최대 수급기간은 270일인데, 예술인은 210일로 좀 더 짧아요.
        이 차이를 모르고 일반 기준으로 기대하면 나중에 당황할 수 있으니 미리 알아두세요.
        수급기간이 짧은 만큼, 기간 내에 다음 계약을 빨리 찾는 게 중요하죠. <a href="/w/실업급여-구직활동-횟수" style={{ color: "#1D9E75", textDecoration: "underline" }}>구직활동 횟수</a> 기준도 미리 파악해두면 유리해요.
      </p>
      <p style={body}>
        여러 계약의 피보험기간은 합산이 가능해요.
        3개월짜리 드라마 출연 후 6개월짜리 영화 촬영에 참여했다면, 피보험기간이 9개월로 합산되니까 수급자격을 충족하죠.
        짧은 계약이 여러 개라도 포기하지 마세요. 전부 합치면 되니까요.
      </p>

      <SectionBadge>신청 전 준비사항</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* ── 섹션 4: 기준보수 기반 신청 방법·보험료 ── */}
      <H2>기준보수 기반 신청 방법과 보험료 구조</H2>
      <p style={body}>
        신청은 네 단계예요.
        먼저 <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 수급자격 신청자 온라인 교육을 이수하세요.
        그다음 관할 고용센터에 방문하거나 온라인으로 수급자격을 신청하면 돼요.
        계약서와 보수 지급 증빙을 함께 제출해야 하죠.
      </p>
      <p style={body}>
        계약서가 없다고 포기할 필요는 없어요.
        세금계산서, 통장 입금 내역 등 계약 사실을 증명할 수 있는 다른 서류로 대체할 수 있으니까요.
        수급자격이 인정되면 이후 실업인정일마다 구직활동을 증명하면서 급여를 받는 구조예요.
      </p>
      <p style={body}>
        보험료 구조도 알아두면 좋아요.
        예술인 고용보험료는 <strong>보수의 1.6%</strong>이고, 예술인과 사업자가 0.8%씩 반반 부담해요.
        100만원 계약이면 보험료 총액은 16,000원, 본인 부담은 8,000원이죠.
        사업자가 가입을 안 해주면 <a href="https://www.comwel.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로복지공단</a>이나 예술인복지재단에 신고하거나, 본인이 직접 피보험자격 취득 신청을 할 수 있죠.
      </p>

      <Divider />

      {/* ── 섹션 5: 기준보수 확인·실전 팁 ── */}
      <H2>기준보수 확인하고 계산해보세요</H2>
      <p style={body}>
        내 기준보수등급은 <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 피보험 이력을 조회하면 나와요.
        계약서에 적힌 보수 금액이 기준이 되니까, 최근 계약서를 꺼내서 금액을 살펴보세요.
        위의 계산기에 등급과 가입기간을 넣으면 예상 수급액이 바로 계산되죠.
      </p>
      <p style={body}>
        <strong>예술활동증명</strong>을 미리 받아두면 절차가 수월해져요.
        <a href="https://www.kawf.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>예술인복지재단</a>에서 온라인으로 신청할 수 있고, 이걸 받아두면 고용보험 가입이나 복지 혜택 신청이 빨라지죠.
        무료 법률상담도 이용할 수 있으니까 한 번 챙겨두면 여러모로 유리해요.
      </p>
      <p style={body}>
        마지막으로 <strong>퇴직 후 12개월 이내에 신청</strong>해야 해요. <a href="/w/퇴사후-실업급여-신청-기간" style={{ color: "#1D9E75", textDecoration: "underline" }}>신청 기한</a>을 넘기면 수급자격 자체가 사라지니까, 계약이 끝나면 미루지 말고 바로 고용센터에 연락하세요.
        전화 상담은 고용센터 대표번호 1350으로 가능해요. 무료이고 부담 없이 물어보면 되죠.
      </p>

      <GreenBox title="핵심 정리">
        기준보수등급 = 1~11등급, 계약 보수 기준으로 산정<br />
        수급자격 = 24개월 중 9개월 이상 가입 + 비자발적 이직 + 재취업 의사<br />
        수급기간 = 가입기간에 따라 120~210일, 상한 66,000원/일
      </GreenBox>

      <Divider />

      {/* ── FAQ (5개) ── */}
      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        예술인 실업급여에 대해 자주 나오는 질문이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      {/* ── References + Disclaimer ── */}
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법을 바탕으로 작성됐어요. 예술인 고용보험 가입 대상과 수급 조건은 개별 상황에 따라 다를 수 있으니, 고용센터(1350) 또는 예술인복지재단에 상담받아보세요." />
    </ArticleLayout>
  );
}
