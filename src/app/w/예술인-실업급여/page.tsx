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

/** 예술인 기준보수등급 월액 (원) — 2026년 기준 */
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
      { label: "고용보험법 — 예술인 피보험자격 및 구직급여", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "예술인 복지법 — 예술인 정의 및 복지 지원", url: "https://www.law.go.kr/법령/예술인복지법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24 — 예술인 실업급여 신청", url: "https://www.ei.go.kr" },
      { label: "예술인복지재단 — 고용보험 가입 안내", url: "https://www.kawf.kr" },
      { label: "근로복지공단 — 피보험자격 확인", url: "https://www.comwel.or.kr" },
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

      {/* ── intro (숫자+법률 포함) ── */}
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &quot;배우인데 작품이 끝났어요. 다음 작품까지 수입이 없는데, 저도 실업급여 받을 수 있나요?&quot;<br />
        받을 수 있죠. 2020년 12월부터 <strong>예술인 고용보험</strong>이 시행됐어요.<br /><br />
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>에서
        배우, 음악인, 작가, 화가 등 문화예술 종사자도 고용보험에 가입하고
        실업급여를 수급할 수 있도록 별도 제도를 마련했어요.
        이직일 전 24개월 중 <strong>9개월</strong> 이상 보험료를 냈다면 대상이 되죠.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* ── 섹션 1 — 가입 대상 + GreenBox + SectionBadge + EligibilityChecker ── */}
      <H2>기준보수 등급은 어떻게 정해지나요?</H2>
      <p style={body}>
        <strong>문화예술용역 관련 계약</strong>을 맺은 예술인이 가입 대상이에요. 배우, 가수, 연주자, 무용수처럼 공연 분야뿐 아니라 작가, 작곡가, 안무가 등 창작 분야도 포함되죠. 화가, 조각가, 사진작가, 영화·방송 스태프까지 문화예술 전반에 걸쳐 폭넓게 적용돼요.
      </p>
      <p style={body}>
        가입 기준이 되는 건 <strong>근로계약이 아니라 문화예술용역 계약</strong>이에요. 일반 근로자는 회사가 자동으로 고용보험에 넣어주지만, 예술인은 프로젝트 단위로 계약하는 경우가 대부분이잖아요. 그래서 예술인 전용 제도가 따로 만들어진 거예요.
      </p>
      <p style={body}>
        출판, 공연, 방송, 영화, 전시 등 문화예술 분야에서 일하고 있다면 본인이 가입 대상인지 <a href="https://www.kawf.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>예술인복지재단</a>에 확인해보세요. 예술활동증명을 받아두면 이후 절차가 수월해지죠.
      </p>

      <GreenBox title="가입 대상 분야">
        공연 — 배우, 가수, 연주자, 무용수, 스태프<br />
        창작 — 작가, 작곡가, 안무가, 화가, 조각가<br />
        영상 — 영화·방송 감독, 촬영, 편집, 미술<br />
        기타 — 사진작가, 전시 기획자 등 문화예술 종사자
      </GreenBox>

      <SectionBadge>수급자격 체크</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="예술인 실업급여 수급 가능성이 높아요. 고용센터(1350)에 상담받아보세요."
        partialMatchText="충족하지 못한 조건이 있으면 수급이 어려울 수 있어요."
      />

      <Divider />

      {/* ── 섹션 2 — 수급자격 조건 + BorderBox + Calculator ── */}
      <H2>기준보수로 수급액을 어떻게 계산하나요?</H2>
      <p style={body}>
        예술인 실업급여 수급자격은 세 가지 조건을 모두 충족해야 해요. 첫째, <strong>피보험기간</strong>이에요. 이직일 전 24개월 중 9개월 이상 보험료를 납부한 이력이 있어야 하죠. 일반 근로자(18개월 중 180일)와 기준이 다르니까 헷갈리지 마세요.
      </p>
      <p style={body}>
        둘째, <strong>비자발적 이직</strong>이에요. 계약 기간이 만료됐거나 사업자가 일방적으로 계약을 해지한 경우처럼, 본인 의사와 무관하게 일이 끊긴 상황이어야 해요. 스스로 계약을 포기한 경우에는 인정이 어렵죠.
      </p>
      <p style={body}>
        셋째, <strong>재취업 의사</strong>가 있어야 해요. 적극적으로 구직활동을 할 의지가 있어야 하고, 실업인정일에 구직활동을 증명해야 하죠. 이 세 가지를 모두 갖춰야 수급자격이 생겨요.
      </p>

      <BorderBox title="일반 실업급여와 뭐가 다를까?">
        일반 근로자 — 18개월 중 <strong>180일</strong> 이상 가입<br />
        예술인 — 24개월 중 <strong>9개월</strong> 이상 가입<br />
        예술인 보험료율 — 보수의 <strong>1.6%</strong> (본인 0.8% + 사업자 0.8%)<br />
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

      {/* ── 섹션 3 — 급여 금액과 수급기간 + SectionBadge + Checklist ── */}
      <H2>가입기간별 수급기간과 계산 방법</H2>
      <p style={body}>
        예술인 실업급여 계산 공식은 <strong>1일 구직급여 = 기초일액 x 60%</strong>예요. 기초일액은 기준보수등급에 따라 정해지는데, 1등급(월 80만원)부터 11등급(월 360만원)까지 나뉘어 있죠. 1일 상한액은 <strong>66,000원</strong>, 하한액은 <strong>16,000원</strong>이에요.
      </p>
      <p style={body}>
        수급기간은 피보험기간에 따라 달라져요. 1년~3년 미만이면 120일, 3년~5년 미만은 150일, 5년~10년 미만은 180일, 10년 이상이면 최대 <strong>210일</strong>까지 받을 수 있죠. 일반 근로자의 최대 270일보다 짧다는 점은 알아두세요.
      </p>
      <p style={body}>
        예를 들어 5등급(월 160만원) 기준으로 3년간 가입했다면, 기초일액은 약 53,333원이고 1일 수급액은 약 32,000원이에요. 수급기간 150일을 곱하면 총 약 480만원을 받게 되죠. 위의 계산기로 본인 상황을 넣어보세요.
      </p>

      <SectionBadge>신청 전 준비사항</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* ── 섹션 4 — 신청 방법과 보험료 ── */}
      <H2>기준보수 기반 신청 방법과 보험료 구조</H2>
      <p style={body}>
        신청 절차는 네 단계예요. 먼저 <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 수급자격 신청자 온라인 교육을 이수하세요. 그다음 관할 고용센터에 방문하거나 온라인으로 수급자격을 신청하면 돼요.
      </p>
      <p style={body}>
        이때 계약서와 보수 지급 증빙서류를 함께 제출해야 해요. 계약서가 없다면 세금계산서, 통장 입금 내역 등 계약 사실을 증명할 수 있는 다른 서류로 대체할 수 있죠. 수급자격이 인정되면 이후 실업인정일마다 구직활동을 증명하면서 급여를 받게 돼요.
      </p>
      <p style={body}>
        보험료도 알아둘 필요가 있죠. 예술인 고용보험료는 <strong>보수의 1.6%</strong>이고, 예술인과 사업자가 0.8%씩 반반 부담해요. 100만원 계약이면 보험료 총액은 16,000원, 본인 부담은 8,000원이에요. 사업자가 가입을 안 해주면 <a href="https://www.comwel.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로복지공단</a>이나 예술인복지재단에 신고하거나, 본인이 직접 피보험자격 취득 신청을 할 수 있어요.
      </p>

      <Divider />

      {/* ── 섹션 5 — 실전 팁 ── */}
      <H2>기준보수 확인하고 계산해보세요</H2>
      <p style={body}>
        첫째, <strong>여러 계약의 피보험기간은 합산</strong>이 가능해요. 3개월짜리 드라마 출연 후 6개월짜리 영화 촬영에 참여했다면, 피보험기간이 9개월로 합산되니까 수급자격 조건을 충족하죠. 짧은 계약이 여러 개라도 포기하지 마세요.
      </p>
      <p style={body}>
        둘째, <strong>예술활동증명</strong>을 미리 받아두면 절차가 수월해요. <a href="https://www.kawf.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>예술인복지재단</a>에서 온라인으로 신청할 수 있고, 이걸 받아두면 고용보험 가입이나 각종 복지 혜택 신청이 빨라지죠. 무료 법률상담도 이용할 수 있어요.
      </p>
      <p style={body}>
        셋째, <strong>퇴직 후 12개월 이내에 신청</strong>해야 해요. 마감 기한을 넘기면 수급자격 자체가 사라지니까, 계약이 끝나면 미루지 말고 바로 고용센터에 문의하세요. 전화 상담은 고용센터 대표번호 1350으로 가능해요.
      </p>

      <GreenBox title="핵심 정리">
        예술인 고용보험 = 2020년 12월 시행, 문화예술용역 계약 기반<br />
        수급자격 = 24개월 중 9개월 이상 가입 + 비자발적 이직 + 재취업 의사<br />
        수급기간 = 가입기간에 따라 120~210일
      </GreenBox>

      <Divider />

      {/* ── FAQ (5개) ── */}
      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        예술인 실업급여에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      {/* ── References + Disclaimer ── */}
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법을 바탕으로 작성됐어요. 예술인 고용보험 가입 대상과 수급 조건은 개별 상황에 따라 다를 수 있으니, 고용센터(1350) 또는 예술인복지재단에 상담받아보세요." />
    </ArticleLayout>
  );
}
